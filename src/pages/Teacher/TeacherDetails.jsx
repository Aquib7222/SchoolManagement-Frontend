
// import React, { useEffect, useState } from "react";
// import {
//   FaLongArrowAltLeft,
//   FaUserTie,
//   FaPhone,
//   FaEnvelope,
//   FaIdBadge,
//   FaBriefcase,
//   FaEdit,
//   FaPrint,
//   FaFilePdf,
//   FaTrash,
//   FaBuilding,
//   FaUserTag,
//   FaGraduationCap,
//   FaMapMarkerAlt,
//   FaFileAlt,
// } from "react-icons/fa";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// const TeacherDetails = () => {
//   const { employeeId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const {
//     teacherCategory = [],
//     teacherDepartment = [],
//     teacherDesignation = [],
//   } = useMasters();

//   const [teacher, setTeacher] = useState(state || null);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedDesignation, setSelectedDesignation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(!state);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id || user?.schoolId;

//   const normalize = (value) =>
//     (value || "")
//       .toString()
//       .toLowerCase()
//       .replace(/[_\s-]+/g, "")
//       .trim();

//   const formatName = (value) => {
//     if (!value) return "";
//     return value
//       .toString()
//       .replaceAll("_", " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const getFullName = () => {
//     if (!teacher) return "";

//     return [teacher.firstName, teacher.middleName, teacher.lastName]
//       .filter(Boolean)
//       .join(" ");
//   };

//   const getPhotoUrl = () => {
//     if (!teacher?.photo) return null;

//     if (
//       teacher.photo.startsWith("http://") ||
//       teacher.photo.startsWith("https://")
//     ) {
//       return teacher.photo;
//     }

//     return `http://localhost:8080/uploads/${teacher.photo}`;
//   };

//   useEffect(() => {
//     if (teacher) {
//       const department = teacherDepartment.find(
//         (item) => normalize(item) === normalize(teacher.department)
//       );

//       const designation = teacherDesignation.find(
//         (item) => normalize(item) === normalize(teacher.designation)
//       );

//       const category = teacherCategory.find(
//         (item) => normalize(item) === normalize(teacher.category)
//       );

//       setSelectedDepartment(department || teacher.department || "");
//       setSelectedDesignation(designation || teacher.designation || "");
//       setSelectedCategory(category || teacher.category || "");
//     }
//   }, [
//     teacher,
//     teacherDepartment,
//     teacherDesignation,
//     teacherCategory,
//   ]);

//   useEffect(() => {
//     if (!state && employeeId) {
//       const fetchTeacher = async () => {
//         try {
//           setLoading(true);

//           const response = await axiosInstance.get(
//             `/api/teachers/${employeeId}`,
//             {
//               params: {
//                 schoolId,
//               },
//             }
//           );

//           setTeacher(response.data);
//         } catch (error) {
//           console.error("Error fetching teacher:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchTeacher();
//     }
//   }, [state, employeeId, schoolId]);

//   const handleUpdateField = async (field, value) => {
//     if (!teacher?.employeeId || !value) {
//       alert("Please select a value");
//       return;
//     }

//     try {
//       await axiosInstance.patch(
//         `/api/teachers/field/${teacher.employeeId}`,
//         {
//           [field]: value,
//         },
//         {
//           params: {
//             schoolId,
//           },
//         }
//       );

//       setTeacher((prev) => ({
//         ...prev,
//         [field]: value,
//       }));

//       alert(`${formatName(field)} updated successfully`);
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Update failed");
//     }
//   };

//   const downloadTeacherPdf = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/api/teachers/download/${teacher.employeeId}`,
//         {
//           params: {
//             schoolId,
//           },
//           responseType: "blob",
//         }
//       );

//       const file = new Blob([response.data], {
//         type: "application/pdf",
//       });

//       const fileURL = window.URL.createObjectURL(file);

//       const link = document.createElement("a");
//       link.href = fileURL;
//       link.download = `Teacher_${teacher.employeeId}.pdf`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(fileURL);
//     } catch (error) {
//       console.error(error);
//       alert("PDF Download Failed");
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDelete = () => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${getFullName()}?`
//       )
//     ) {
//       // Add your delete API here
//       alert("Delete API can be connected here.");
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Working":
//         return "bg-success";

//       case "Resign":
//         return "bg-danger";

//       case "Maternity Leave":
//         return "bg-warning text-dark";

//       case "Long Leave":
//         return "bg-info text-dark";

//       default:
//         return "bg-secondary";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border text-primary" />
//         <p className="mt-2">Loading teacher details...</p>
//       </div>
//     );
//   }

//   if (!teacher) {
//     return (
//       <div className="alert alert-danger m-3">
//         Teacher details not found.
//       </div>
//     );
//   }

//   const photoUrl = getPhotoUrl();

//   return (
//     <div className="teacher-details-page pb-4">

//       {/* ================= HEADER ================= */}
//       <div
//         className="row shadow-lg ms-2 me-2"
//         style={{
//           backgroundColor: "white",
//           minHeight: "70px",
//           borderRadius: "6px",
//           padding: "10px 15px",
//           color: "black",
//         }}
//       >
//         <div className="col-12">
//           <h6 className="mb-1">
//             <strong>Teacher</strong>
//           </h6>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">
//                 <a
//                   href="/"
//                   style={{
//                     textDecoration: "none",
//                     color: "black",
//                   }}
//                 >
//                   Home
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 <span>Teacher</span>
//               </li>

//               <li className="breadcrumb-item active">
//                 Teacher Details
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* ================= PROFILE CARD ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3 overflow-hidden">

//           {/* Profile Header */}
//           <div
//             className="card-header text-white border-0"
//             style={{
//               background:
//                 "linear-gradient(135deg, #0d6efd, #0dcaf0)",
//               padding: "14px 18px",
//             }}
//           >
//             <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">

//               <button
//                 className="btn btn-light btn-sm"
//                 onClick={() => navigate(-1)}
//               >
//                 <FaLongArrowAltLeft className="me-1" />
//                 Back
//               </button>

//               <h5 className="mb-0 fw-bold">
//                 <FaUserTie className="me-2" />
//                 Teacher Profile
//               </h5>

//               <span className="badge bg-light text-dark px-3 py-2">
//                 {teacher.employeeId}
//               </span>
//             </div>
//           </div>

//           {/* Profile Body */}
//           <div className="card-body p-4">
//             <div className="row g-4 align-items-center">

//               {/* Photo */}
//               <div className="col-12 col-md-2 text-center">
//                 <div
//                   className="mx-auto rounded-circle overflow-hidden shadow-sm"
//                   style={{
//                     width: "145px",
//                     height: "145px",
//                     border: "4px solid #f1f1f1",
//                   }}
//                 >
//                   {photoUrl ? (
//                     <img
//                       src={photoUrl}
//                       alt={getFullName()}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       className="d-flex align-items-center justify-content-center h-100 bg-light text-primary"
//                       style={{ fontSize: "55px" }}
//                     >
//                       <FaUserTie />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Basic Information */}
//               <div className="col-12 col-md-4">
//                 <h3 className="fw-bold mb-2">
//                   {getFullName()}
//                 </h3>

//                 <div className="text-muted mb-2">
//                   <FaIdBadge className="me-2 text-primary" />
//                   Employee ID:{" "}
//                   <strong className="text-dark">
//                     {teacher.employeeId}
//                   </strong>
//                 </div>

//                 <div className="text-muted mb-2">
//                   <FaPhone className="me-2 text-success" />
//                   {teacher.phoneNumber || "N/A"}
//                 </div>

//                 <div className="text-muted mb-2">
//                   <FaEnvelope className="me-2 text-danger" />
//                   {teacher.email || "N/A"}
//                 </div>

//                 <div className="text-muted mb-2">
//                   <FaBriefcase className="me-2 text-warning" />
//                   {formatName(teacher.employeeType) || "N/A"}
//                 </div>

//                 <div className="mt-3">
//                   <span className="fw-semibold me-2">
//                     Status:
//                   </span>

//                   <span
//                     className={`badge ${getStatusClass(
//                       teacher.status
//                     )}`}
//                   >
//                     {teacher.status || "N/A"}
//                   </span>
//                 </div>
//               </div>

//               {/* Department */}
//               <div className="col-12 col-md-3">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">
//                     <FaBuilding className="me-2 text-primary" />
//                     Department
//                   </label>

//                   <select
//                     className="form-select"
//                     value={selectedDepartment}
//                     onChange={(e) =>
//                       setSelectedDepartment(e.target.value)
//                     }
//                   >
//                     <option value="">
//                       Select Department
//                     </option>

//                     {teacherDepartment.map((item) => (
//                       <option key={item} value={item}>
//                         {formatName(item)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="form-label fw-semibold">
//                     <FaUserTag className="me-2 text-warning" />
//                     Category
//                   </label>

//                   <select
//                     className="form-select"
//                     value={selectedCategory}
//                     onChange={(e) =>
//                       setSelectedCategory(e.target.value)
//                     }
//                   >
//                     <option value="">
//                       Select Category
//                     </option>

//                     {teacherCategory.map((item) => (
//                       <option key={item} value={item}>
//                         {formatName(item)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Designation */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   <FaBriefcase className="me-2 text-info" />
//                   Designation
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedDesignation}
//                   onChange={(e) =>
//                     setSelectedDesignation(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     Select Designation
//                   </option>

//                   {teacherDesignation.map((item) => (
//                     <option key={item} value={item}>
//                       {formatName(item)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Update Buttons */}
//             <div className="row g-2 mt-4 pt-3 border-top">

//               <div className="col-12 col-md-4">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={() =>
//                     handleUpdateField(
//                       "department",
//                       selectedDepartment
//                     )
//                   }
//                 >
//                   <FaBuilding className="me-2" />
//                   Update Department
//                 </button>
//               </div>

//               <div className="col-12 col-md-4">
//                 <button
//                   className="btn btn-info text-white w-100"
//                   onClick={() =>
//                     handleUpdateField(
//                       "designation",
//                       selectedDesignation
//                     )
//                   }
//                 >
//                   <FaBriefcase className="me-2" />
//                   Update Designation
//                 </button>
//               </div>

//               <div className="col-12 col-md-4">
//                 <button
//                   className="btn btn-warning w-100"
//                   onClick={() =>
//                     handleUpdateField(
//                       "category",
//                       selectedCategory
//                     )
//                   }
//                 >
//                   <FaUserTag className="me-2" />
//                   Update Category
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= PERSONAL INFORMATION ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom text-center py-3">
//             <h5 className="mb-0 fw-bold">
//               <FaUserTie className="text-primary me-2" />
//               Personal Information
//             </h5>
//           </div>

//           <div className="card-body p-4">

//             <div className="row g-4">

//               <InfoItem
//                 label="Gender"
//                 value={teacher.gender}
//               />

//               <InfoItem
//                 label="Date of Birth"
//                 value={teacher.dob}
//               />

//               <InfoItem
//                 label="Phone"
//                 value={teacher.phoneNumber}
//               />

//               <InfoItem
//                 label="Email"
//                 value={teacher.email}
//               />

//               <InfoItem
//                 label="Blood Group"
//                 value={teacher.bloodGroup}
//               />

//               <InfoItem
//                 label="Employee Type"
//                 value={formatName(teacher.employeeType)}
//               />

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= PROFESSIONAL DETAILS ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom text-center py-3">
//             <h5 className="mb-0 fw-bold">
//               <FaBriefcase className="text-success me-2" />
//               Professional Details
//             </h5>
//           </div>

//           <div className="card-body p-4">

//             <div className="row g-4">

//               <InfoItem
//                 label="Department"
//                 value={formatName(teacher.department)}
//               />

//               <InfoItem
//                 label="Designation"
//                 value={formatName(teacher.designation)}
//               />

//               <InfoItem
//                 label="Joining Date"
//                 value={teacher.doj}
//               />

//               <InfoItem
//                 label="Teaching Level"
//                 value={formatName(teacher.teachingLevel)}
//               />

//               <InfoItem
//                 label="Category"
//                 value={formatName(teacher.category)}
//               />

//               <InfoItem
//                 label="Status"
//                 value={teacher.status}
//               />

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= ADDRESS ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom text-center py-3">
//             <h5 className="mb-0 fw-bold">
//               <FaMapMarkerAlt className="text-danger me-2" />
//               Address Information
//             </h5>
//           </div>

//           <div className="card-body p-4">

//             <div className="row g-4">

//               <div className="col-12 col-md-6">
//                 <div className="p-3 rounded bg-light h-100">
//                   <h6 className="fw-bold text-primary mb-3">
//                     Permanent Address
//                   </h6>

//                   <p className="mb-1 fw-semibold">
//                     {teacher.addressLine1 || "N/A"}
//                   </p>

//                   {teacher.addressLine2 && (
//                     <p className="mb-1">
//                       {teacher.addressLine2}
//                     </p>
//                   )}

//                   <p className="mb-1">
//                     {teacher.city || ""}
//                     {teacher.city && teacher.state ? ", " : ""}
//                     {teacher.state || ""}
//                   </p>

//                   <p className="mb-0">
//                     {teacher.pincode || ""}
//                     {teacher.pincode && teacher.country
//                       ? ", "
//                       : ""}
//                     {teacher.country || ""}
//                   </p>
//                 </div>
//               </div>

//               <div className="col-12 col-md-6">
//                 <div className="p-3 rounded bg-light h-100">
//                   <h6 className="fw-bold text-success mb-3">
//                     Current Address
//                   </h6>

//                   <p className="mb-1 fw-semibold">
//                     {teacher.currentAddressLine1 ||
//                       teacher.addressLine1 ||
//                       "N/A"}
//                   </p>

//                   <p className="mb-1">
//                     {teacher.currentAddressLine2 ||
//                       teacher.addressLine2 ||
//                       ""}
//                   </p>

//                   <p className="mb-1">
//                     {teacher.currentCity ||
//                       teacher.city ||
//                       ""}
//                     {(teacher.currentCity || teacher.city) &&
//                     (teacher.currentState || teacher.state)
//                       ? ", "
//                       : ""}
//                     {teacher.currentState ||
//                       teacher.state ||
//                       ""}
//                   </p>

//                   <p className="mb-0">
//                     {teacher.currentPincode ||
//                       teacher.pincode ||
//                       ""}
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= QUALIFICATION ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom text-center py-3">
//             <h5 className="mb-0 fw-bold">
//               <FaGraduationCap className="text-info me-2" />
//               Qualification Details
//             </h5>
//           </div>

//           <div className="card-body p-4">

//             {teacher.qualifications?.length > 0 ? (
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover align-middle mb-0">

//                   <thead>
//                     <tr>
//                       <th className="bg-info text-white">
//                         S.No
//                       </th>
//                       <th className="bg-info text-white">
//                         Degree
//                       </th>
//                       <th className="bg-info text-white">
//                         University
//                       </th>
//                       <th className="bg-info text-white">
//                         Year
//                       </th>
//                       <th className="bg-info text-white">
//                         Percentage
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {teacher.qualifications.map(
//                       (qualification, index) => (
//                         <tr key={index}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {qualification.degree || "-"}
//                           </td>
//                           <td>
//                             {qualification.university || "-"}
//                           </td>
//                           <td>
//                             {qualification.year || "-"}
//                           </td>
//                           <td>
//                             {qualification.percentage
//                               ? `${qualification.percentage}%`
//                               : "-"}
//                           </td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>

//                 </table>
//               </div>
//             ) : (
//               <div className="text-center text-muted py-4">
//                 <FaGraduationCap
//                   className="mb-2"
//                   style={{ fontSize: "35px" }}
//                 />
//                 <p className="mb-0">
//                   No qualification details available.
//                 </p>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* ================= DOCUMENTS ================= */}
//       <div className="ms-2 me-2 mt-4">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom text-center py-3">
//             <h5 className="mb-0 fw-bold">
//               <FaFileAlt className="text-warning me-2" />
//               Documents
//             </h5>
//           </div>

//           <div className="card-body p-4">

//             <div className="row g-3">

//               <DocumentCard
//                 title="Aadhar Card"
//                 value={teacher.aadharCard}
//               />

//               <DocumentCard
//                 title="PAN Card"
//                 value={teacher.panCard}
//               />

//               <DocumentCard
//                 title="Resume"
//                 value={teacher.resume}
//               />

//               <DocumentCard
//                 title="Certificates"
//                 value={teacher.certificates}
//               />

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= ACTION BUTTONS ================= */}
//       <div className="ms-2 me-2 mt-4">

//         <div className="card border-0 shadow rounded-3">
//           <div className="card-body p-3">

//             <div className="row g-2">

//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-warning w-100"
//                   onClick={() =>
//                     navigate(
//                       `/teacher/edit-teacher/${teacher.employeeId}`
//                     )
//                   }
//                 >
//                   <FaEdit className="me-2" />
//                   Edit
//                 </button>
//               </div>

//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-info text-white w-100"
//                   onClick={handlePrint}
//                 >
//                   <FaPrint className="me-2" />
//                   Print
//                 </button>
//               </div>

//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-danger w-100"
//                   onClick={downloadTeacherPdf}
//                 >
//                   <FaFilePdf className="me-2" />
//                   PDF
//                 </button>
//               </div>

//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-dark w-100"
//                   onClick={handleDelete}
//                 >
//                   <FaTrash className="me-2" />
//                   Delete
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// /* ================= INFO ITEM ================= */

// const InfoItem = ({ label, value }) => {
//   return (
//     <div className="col-12 col-md-6">
//       <div
//         className="p-3 rounded border-start border-4 bg-light"
//         style={{
//           borderColor: "#0d6efd",
//         }}
//       >
//         <h6 className="text-muted mb-1">
//           {label}
//         </h6>

//         <p className="fw-semibold mb-0">
//           {value || "N/A"}
//         </p>
//       </div>
//     </div>
//   );
// };

// /* ================= DOCUMENT CARD ================= */

// const DocumentCard = ({ title, value }) => {
//   return (
//     <div className="col-12 col-md-6 col-xl-3">
//       <div className="border rounded p-3 h-100 bg-light">

//         <div className="d-flex align-items-center gap-2 mb-2">
//           <FaFileAlt className="text-primary" />

//           <h6 className="fw-bold mb-0">
//             {title}
//           </h6>
//         </div>

//         {value ? (
//           <span className="badge bg-success">
//             Available
//           </span>
//         ) : (
//           <span className="badge bg-secondary">
//             Not Available
//           </span>
//         )}

//       </div>
//     </div>
//   );
// };

// export default TeacherDetails;



import React, { useEffect, useState } from "react";
import {
  FaLongArrowAltLeft,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaIdBadge,
  FaBriefcase,
  FaEdit,
  FaPrint,
  FaFilePdf,
  FaTrash,
  FaBuilding,
  FaUserTag,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
} from "react-icons/fa";

import { MdOutlineSchool } from "react-icons/md";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const TeacherDetails = () => {
  const { employeeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    teacherCategory = [],
    teacherDepartment = [],
    teacherDesignation = [],
  } = useMasters();

  const [teacher, setTeacher] = useState(state || null);

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [selectedDesignation, setSelectedDesignation] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [loading, setLoading] = useState(!state);

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id || user?.schoolId;

  // =========================================================
  // HELPERS
  // =========================================================

  const normalize = (value) =>
    (value || "")
      .toString()
      .toLowerCase()
      .replace(/[_\s-]+/g, "")
      .trim();

  const formatName = (value) => {
    if (!value) return "";

    return value
      .toString()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getFullName = () => {
    if (!teacher) return "";

    return [
      teacher.firstName,
      teacher.middleName,
      teacher.lastName,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getPhotoUrl = () => {
    if (!teacher?.photo) return null;

    if (
      teacher.photo.startsWith("http://") ||
      teacher.photo.startsWith("https://")
    ) {
      return teacher.photo;
    }

    return `http://localhost:8080/uploads/${teacher.photo}`;
  };

  // =========================================================
  // LOAD MASTER VALUES
  // =========================================================

  useEffect(() => {
    if (teacher) {
      const department = teacherDepartment.find(
        (item) =>
          normalize(item) ===
          normalize(teacher.department)
      );

      const designation = teacherDesignation.find(
        (item) =>
          normalize(item) ===
          normalize(teacher.designation)
      );

      const category = teacherCategory.find(
        (item) =>
          normalize(item) ===
          normalize(teacher.category)
      );

      setSelectedDepartment(
        department || teacher.department || ""
      );

      setSelectedDesignation(
        designation || teacher.designation || ""
      );

      setSelectedCategory(
        category || teacher.category || ""
      );
    }
  }, [
    teacher,
    teacherDepartment,
    teacherDesignation,
    teacherCategory,
  ]);

  // =========================================================
  // LOAD TEACHER
  // =========================================================

  useEffect(() => {
    if (!state && employeeId) {
      const fetchTeacher = async () => {
        try {
          setLoading(true);

          const response = await axiosInstance.get(
            `/api/teachers/${employeeId}`,
            {
              params: {
                schoolId,
              },
            }
          );

          setTeacher(response.data);
        } catch (error) {
          console.error(
            "Error fetching teacher:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

      fetchTeacher();
    }
  }, [state, employeeId, schoolId]);

  // =========================================================
  // UPDATE FIELD
  // =========================================================

  const handleUpdateField = async (field, value) => {
    if (!teacher?.employeeId || !value) {
      alert("Please select a value");
      return;
    }

    try {
      await axiosInstance.patch(
        `/api/teachers/field/${teacher.employeeId}`,
        {
          [field]: value,
        },
        {
          params: {
            schoolId,
          },
        }
      );

      setTeacher((prev) => ({
        ...prev,
        [field]: value,
      }));

      alert(
        `${formatName(field)} updated successfully`
      );
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  // =========================================================
  // PDF
  // =========================================================

  const downloadTeacherPdf = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/teachers/download/${teacher.employeeId}`,
        {
          params: {
            schoolId,
          },
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL =
        window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = fileURL;
      link.download = `Teacher_${teacher.employeeId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error(error);
      alert("PDF Download Failed");
    }
  };

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {
    window.print();
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${getFullName()}?`
      )
    ) {
      // Connect delete API here
      alert("Delete API can be connected here.");
    }
  };

  // =========================================================
  // STATUS
  // =========================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Working":
        return "bg-success";

      case "Resign":
        return "bg-danger";

      case "Maternity Leave":
        return "bg-warning text-dark";

      case "Long Leave":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />

        <p className="mt-2 text-muted">
          Loading teacher details...
        </p>
      </div>
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!teacher) {
    return (
      <div className="alert alert-danger m-3">
        Teacher details not found.
      </div>
    );
  }

  const photoUrl = getPhotoUrl();

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <div className="teacher-details-page">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mx-2 mt-2 mb-3">
          <div
            className="rounded-4 shadow overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
              border: "1px solid #dbeafe",
            }}
          >
            <div className="p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <FaUserTie size={27} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      Teacher Details
                    </h5>

                    <div className="text-muted small">
                      Teachers&nbsp; / &nbsp;Profile Details
                    </div>
                  </div>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <MdOutlineSchool className="me-1" />
                    Teacher
                  </span>

                </div>

              </div>
            </div>

            <div
              className="px-4 py-2"
              style={{
                backgroundColor:
                  "rgba(239,246,255,.75)",
                borderTop:
                  "1px solid #e0ecff",
              }}
            >
              <small className="text-muted">
                Home&nbsp;›&nbsp; Teachers&nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  Teacher Details
                </span>
              </small>
            </div>
          </div>
        </div>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <div className="px-2 mb-4">
          <div className="card border-0 shadow rounded-4 overflow-hidden">

            {/* PROFILE HEADER */}

            <div
              className="card-header text-white border-0"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
              }}
            >
              <div className="p-3">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

                  <button
                    className="btn btn-light btn-sm rounded-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaLongArrowAltLeft className="me-1" />
                    Back
                  </button>

                  <h5 className="mb-0 fw-bold">
                    <FaUserTie className="me-2" />
                    Teacher Profile
                  </h5>

                  <span className="badge bg-light text-primary px-3 py-2 rounded-pill">
                    {teacher.employeeId}
                  </span>

                </div>
              </div>
            </div>

            {/* PROFILE BODY */}

            <div className="card-body p-3 p-md-4">

              <div className="row g-4 align-items-center">

                {/* PHOTO */}

                <div className="col-12 col-md-2 text-center">

                  <div
                    className="mx-auto rounded-circle overflow-hidden shadow"
                    style={{
                      width: "145px",
                      height: "145px",
                      border: "4px solid #eaf3ff",
                    }}
                  >

                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={getFullName()}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center h-100"
                        style={{
                          background:
                            "linear-gradient(135deg,#eff6ff,#dbeafe)",
                          color: "#2563eb",
                          fontSize: "55px",
                        }}
                      >
                        <FaUserTie />
                      </div>
                    )}

                  </div>

                </div>

                {/* BASIC INFO */}

                <div className="col-12 col-md-4">

                  <h3 className="fw-bold text-dark mb-3">
                    {getFullName()}
                  </h3>

                  <div className="mb-2 text-muted">
                    <FaIdBadge className="me-2 text-primary" />
                    Employee ID:
                    <strong className="text-dark ms-1">
                      {teacher.employeeId || "N/A"}
                    </strong>
                  </div>

                  <div className="mb-2 text-muted">
                    <FaPhone className="me-2 text-success" />
                    {teacher.phoneNumber || "N/A"}
                  </div>

                  <div className="mb-2 text-muted">
                    <FaEnvelope className="me-2 text-danger" />
                    {teacher.email || "N/A"}
                  </div>

                  <div className="mb-2 text-muted">
                    <FaBriefcase className="me-2 text-warning" />
                    {formatName(
                      teacher.employeeType
                    ) || "N/A"}
                  </div>

                  <div className="mt-3">

                    <span className="fw-semibold me-2">
                      Status:
                    </span>

                    <span
                      className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                        teacher.status
                      )}`}
                    >
                      {teacher.status || "N/A"}
                    </span>

                  </div>

                </div>

                {/* DEPARTMENT + CATEGORY */}

                <div className="col-12 col-md-3">

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      <FaBuilding className="me-2 text-primary" />
                      Department
                    </label>

                    <select
                      className="form-select rounded-3"
                      value={selectedDepartment}
                      onChange={(e) =>
                        setSelectedDepartment(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        Select Department
                      </option>

                      {teacherDepartment.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {formatName(item)}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div>

                    <label className="form-label fw-semibold">
                      <FaUserTag className="me-2 text-warning" />
                      Category
                    </label>

                    <select
                      className="form-select rounded-3"
                      value={selectedCategory}
                      onChange={(e) =>
                        setSelectedCategory(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        Select Category
                      </option>

                      {teacherCategory.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {formatName(item)}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* DESIGNATION */}

                <div className="col-12 col-md-3">

                  <label className="form-label fw-semibold">
                    <FaBriefcase className="me-2 text-info" />
                    Designation
                  </label>

                  <select
                    className="form-select rounded-3"
                    value={selectedDesignation}
                    onChange={(e) =>
                      setSelectedDesignation(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Designation
                    </option>

                    {teacherDesignation.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {formatName(item)}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>

              {/* UPDATE BUTTONS */}

              <div className="row g-2 mt-4 pt-3 border-top">

                <div className="col-12 col-md-4">
                  <button
                    className="btn btn-success w-100 rounded-3"
                    onClick={() =>
                      handleUpdateField(
                        "department",
                        selectedDepartment
                      )
                    }
                  >
                    <FaBuilding className="me-2" />
                    Update Department
                  </button>
                </div>

                <div className="col-12 col-md-4">
                  <button
                    className="btn btn-info text-white w-100 rounded-3"
                    onClick={() =>
                      handleUpdateField(
                        "designation",
                        selectedDesignation
                      )
                    }
                  >
                    <FaBriefcase className="me-2" />
                    Update Designation
                  </button>
                </div>

                <div className="col-12 col-md-4">
                  <button
                    className="btn btn-warning w-100 rounded-3"
                    onClick={() =>
                      handleUpdateField(
                        "category",
                        selectedCategory
                      )
                    }
                  >
                    <FaUserTag className="me-2" />
                    Update Category
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            PERSONAL INFORMATION
        ===================================================== */}

        <SectionCard
          icon={<FaUserTie />}
          iconClass="text-primary"
          title="Personal Information"
          subtitle="Teacher personal and contact information"
        >

          <div className="row g-3">

            <InfoItem
              icon={<FaVenusMars />}
              label="Gender"
              value={formatName(teacher.gender)}
            />

            <InfoItem
              icon={<FaCalendarAlt />}
              label="Date of Birth"
              value={teacher.dob}
            />

            <InfoItem
              icon={<FaPhone />}
              label="Phone"
              value={teacher.phoneNumber}
            />

            <InfoItem
              icon={<FaEnvelope />}
              label="Email"
              value={teacher.email}
            />

            <InfoItem
              icon={<FaTint />}
              label="Blood Group"
              value={teacher.bloodGroup}
            />

            <InfoItem
              icon={<FaBriefcase />}
              label="Employee Type"
              value={formatName(
                teacher.employeeType
              )}
            />

          </div>

        </SectionCard>

        {/* =====================================================
            PROFESSIONAL DETAILS
        ===================================================== */}

        <SectionCard
          icon={<FaBriefcase />}
          iconClass="text-success"
          title="Professional Details"
          subtitle="Teacher employment and professional information"
        >

          <div className="row g-3">

            <InfoItem
              icon={<FaBuilding />}
              label="Department"
              value={formatName(
                teacher.department
              )}
            />

            <InfoItem
              icon={<FaBriefcase />}
              label="Designation"
              value={formatName(
                teacher.designation
              )}
            />

            <InfoItem
              icon={<FaCalendarAlt />}
              label="Joining Date"
              value={teacher.doj}
            />

            <InfoItem
              icon={<FaGraduationCap />}
              label="Teaching Level"
              value={formatName(
                teacher.teachingLevel
              )}
            />

            <InfoItem
              icon={<FaUserTag />}
              label="Category"
              value={formatName(
                teacher.category
              )}
            />

            <InfoItem
              icon={<FaCheckBadge />}
              label="Status"
              value={teacher.status}
            />

          </div>

        </SectionCard>

        {/* =====================================================
            ADDRESS INFORMATION
        ===================================================== */}

        <SectionCard
          icon={<FaMapMarkerAlt />}
          iconClass="text-danger"
          title="Address Information"
          subtitle="Permanent and current residential address"
        >

          <div className="row g-3">

            {/* PERMANENT */}

            <div className="col-12 col-md-6">

              <div
                className="h-100 p-4 rounded-3"
                style={{
                  background:
                    "linear-gradient(135deg,#f8fbff,#eef6ff)",
                  border: "1px solid #dbeafe",
                }}
              >

                <div className="d-flex align-items-center gap-2 mb-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                    }}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <h6 className="fw-bold mb-0 text-primary">
                    Permanent Address
                  </h6>

                </div>

                <p className="mb-1 fw-semibold">
                  {teacher.addressLine1 || "N/A"}
                </p>

                {teacher.addressLine2 && (
                  <p className="mb-1">
                    {teacher.addressLine2}
                  </p>
                )}

                <p className="mb-1 text-muted">
                  {teacher.city || ""}
                  {teacher.city &&
                  teacher.state
                    ? ", "
                    : ""}
                  {teacher.state || ""}
                </p>

                <p className="mb-0 text-muted">
                  {teacher.pincode || ""}
                  {teacher.pincode &&
                  teacher.country
                    ? ", "
                    : ""}
                  {teacher.country || ""}
                </p>

              </div>

            </div>

            {/* CURRENT */}

            <div className="col-12 col-md-6">

              <div
                className="h-100 p-4 rounded-3"
                style={{
                  background:
                    "linear-gradient(135deg,#f7fff9,#edfff3)",
                  border: "1px solid #d1fae5",
                }}
              >

                <div className="d-flex align-items-center gap-2 mb-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      background:
                        "linear-gradient(135deg,#16a34a,#22c55e)",
                      color: "#fff",
                    }}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <h6 className="fw-bold mb-0 text-success">
                    Current Address
                  </h6>

                </div>

                <p className="mb-1 fw-semibold">
                  {teacher.currentAddressLine1 ||
                    teacher.addressLine1 ||
                    "N/A"}
                </p>

                {(teacher.currentAddressLine2 ||
                  teacher.addressLine2) && (
                  <p className="mb-1">
                    {teacher.currentAddressLine2 ||
                      teacher.addressLine2}
                  </p>
                )}

                <p className="mb-1 text-muted">

                  {teacher.currentCity ||
                    teacher.city ||
                    ""}

                  {(teacher.currentCity ||
                    teacher.city) &&
                  (teacher.currentState ||
                    teacher.state)
                    ? ", "
                    : ""}

                  {teacher.currentState ||
                    teacher.state ||
                    ""}

                </p>

                <p className="mb-0 text-muted">
                  {teacher.currentPincode ||
                    teacher.pincode ||
                    ""}
                </p>

              </div>

            </div>

          </div>

        </SectionCard>

        {/* =====================================================
            QUALIFICATION
        ===================================================== */}

        <SectionCard
          icon={<FaGraduationCap />}
          iconClass="text-info"
          title="Qualification Details"
          subtitle="Academic qualification records"
        >

          {teacher.qualifications?.length > 0 ? (
            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >

                  <tr>
                    <th>#</th>
                    <th>Degree</th>
                    <th>University</th>
                    <th>Year</th>
                    <th>Percentage</th>
                  </tr>

                </thead>

                <tbody className="text-center small">

                  {teacher.qualifications.map(
                    (qualification, index) => (
                      <tr key={index}>

                        <td className="fw-semibold">
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {qualification.degree ||
                            "-"}
                        </td>

                        <td>
                          {qualification.university ||
                            "-"}
                        </td>

                        <td>
                          {qualification.year ||
                            "-"}
                        </td>

                        <td>

                          {qualification.percentage ? (
                            <span
                              className="badge rounded-pill"
                              style={{
                                backgroundColor:
                                  "#eff6ff",
                                color: "#2563eb",
                                border:
                                  "1px solid #bfdbfe",
                              }}
                            >
                              {
                                qualification.percentage
                              }
                              %
                            </span>
                          ) : (
                            "-"
                          )}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          ) : (
            <div className="text-center text-muted py-4">

              <div
                className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <FaGraduationCap size={28} />
              </div>

              <h6 className="fw-bold">
                No Qualification Details
              </h6>

              <small>
                No qualification records are available.
              </small>

            </div>
          )}

        </SectionCard>

        {/* =====================================================
            DOCUMENTS
        ===================================================== */}

        <SectionCard
          icon={<FaFileAlt />}
          iconClass="text-warning"
          title="Documents"
          subtitle="Teacher document availability"
        >

          <div className="row g-3">

            <DocumentCard
              title="Aadhar Card"
              value={teacher.aadharCard}
            />

            <DocumentCard
              title="PAN Card"
              value={teacher.panCard}
            />

            <DocumentCard
              title="Resume"
              value={teacher.resume}
            />

            <DocumentCard
              title="Certificates"
              value={teacher.certificates}
            />

          </div>

        </SectionCard>

        {/* =====================================================
            ACTION BUTTONS
        ===================================================== */}

        <div className="px-2 mt-4 mb-5">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-3">

              <div className="row g-2">

                <div className="col-12 col-md-3">

                  <button
                    className="btn btn-warning w-100 rounded-3"
                    onClick={() =>
                      navigate(
                        `/teacher/edit-teacher/${teacher.employeeId}`
                      )
                    }
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>

                </div>

                <div className="col-12 col-md-3">

                  <button
                    className="btn btn-info text-white w-100 rounded-3"
                    onClick={handlePrint}
                  >
                    <FaPrint className="me-2" />
                    Print
                  </button>

                </div>

                <div className="col-12 col-md-3">

                  <button
                    className="btn btn-danger w-100 rounded-3"
                    onClick={downloadTeacherPdf}
                  >
                    <FaFilePdf className="me-2" />
                    PDF
                  </button>

                </div>

                <div className="col-12 col-md-3">

                  <button
                    className="btn btn-dark w-100 rounded-3"
                    onClick={handleDelete}
                  >
                    <FaTrash className="me-2" />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
            }

            button,
            .btn {
              display: none !important;
            }

            .teacher-details-page {
              padding: 0 !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
              break-inside: avoid;
            }

            .card-header {
              color: black !important;
              background: white !important;
            }

            table {
              font-size: 9px !important;
            }

            .rounded-4 {
              border-radius: 0 !important;
            }

            @page {
              size: A4 portrait;
              margin: 8mm;
            }
          }
        `}
      </style>
    </>
  );
};

/* =========================================================
   SECTION CARD
========================================================= */

const SectionCard = ({
  icon,
  iconClass,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="px-2 mt-4">

      <div className="card shadow border-0 rounded-4">

        <div
          className="card-header bg-white py-3"
          style={{
            borderBottom:
              "1px solid #e5e7eb",
          }}
        >

          <div className="d-flex align-items-center">

            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "#fff",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,.22)",
              }}
            >
              {icon}
            </div>

            <div className="d-flex flex-column ms-2">

              <h6 className="mb-0 lh-1 fw-bold">
                {title}
              </h6>

              <small className="lh-1 text-muted mt-1">
                {subtitle}
              </small>

            </div>

          </div>

        </div>

        <div className="card-body p-3 p-md-4">
          {children}
        </div>

      </div>

    </div>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="col-12 col-md-6 col-xl-4">

      <div
        className="p-3 rounded-3 h-100"
        style={{
          background:
            "linear-gradient(135deg,#f8fbff,#f1f6ff)",
          border: "1px solid #dbeafe",
        }}
      >

        <div className="d-flex align-items-center gap-2 mb-2">

          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "34px",
              height: "34px",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
            }}
          >
            {icon}
          </div>

          <small className="text-muted fw-semibold">
            {label}
          </small>

        </div>

        <div className="fw-bold text-dark ms-1">
          {value || "N/A"}
        </div>

      </div>

    </div>
  );
};

/* =========================================================
   DOCUMENT CARD
========================================================= */

const DocumentCard = ({
  title,
  value,
}) => {
  return (
    <div className="col-12 col-md-6 col-xl-3">

      <div
        className="border rounded-3 p-3 h-100"
        style={{
          background:
            "linear-gradient(135deg,#ffffff,#f8fbff)",
        }}
      >

        <div className="d-flex align-items-center gap-2 mb-3">

          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
            }}
          >
            <FaFileAlt />
          </div>

          <h6 className="fw-bold mb-0">
            {title}
          </h6>

        </div>

        {value ? (
          <span className="badge bg-success rounded-pill px-3 py-2">
            Available
          </span>
        ) : (
          <span className="badge bg-secondary rounded-pill px-3 py-2">
            Not Available
          </span>
        )}

      </div>

    </div>
  );
};

/* =========================================================
   FALLBACK ICON
========================================================= */

const FaCheckBadge = ({ className }) => {
  return (
    <span className={className}>
      ✓
    </span>
  );
};

export default TeacherDetails;
