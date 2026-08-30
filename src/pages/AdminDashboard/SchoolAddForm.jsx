
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import { IoReturnDownBackOutline } from "react-icons/io5";
// import {
//   MdErrorOutline,
//   MdOutlineMedicalInformation,
// } from "react-icons/md";
// import { BiSolidSchool } from "react-icons/bi";
// import { FaPhone } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi2";
// import { IoMdSettings } from "react-icons/io";

// import useMasters from "../../hooks/useMasters";

// const SchoolAddForm = () => {
//   const {
//     schoolType = [],
//     schoolCategory = [],
//     affiliationBoard = [],
//   } = useMasters();

//   const { schoolId } = useParams();
//   const navigate = useNavigate();

//   // =========================================================
//   // CREATE / EDIT MODE
//   // =========================================================

//   const isEditMode = Boolean(schoolId);

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [selectedFile, setSelectedFile] = useState(null);

//   const [existingLogo, setExistingLogo] = useState(null);

//   const [loadingSchool, setLoadingSchool] = useState(false);

//   const [saving, setSaving] = useState(false);

//   // =========================================================
//   // FORM DATA
//   // =========================================================

//   const initialFormData = {
//     // Basic Information
//     schoolName: "",
//     schoolCode: "",
//     organizationName: "",

//     // Address
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",

//     // Contact
//     contactPersonName: "",
//     designation: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhone: "",

//     // Academic
//     academicSessionStartMonth: "",
//     academicSessionFormat: "",
//     defaultLanguage: "",
//     currency: "",

//     // Other
//     schoolType: "",
//     schoolCategory: "",
//     affiliationBoard: "",
//     establishedYear: "",
//     totalClasses: "",
//     totalStudents: "",
//     description: "",

//     // Settings
//     status: true,
//     allowParentLogin: true,
//     allowStudentLogin: true,

//     // Localization
//     timeZone: "Asia/Kolkata",
//     dateFormat: "dd-MM-yyyy",
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // =========================================================
//   // COUNTRIES
//   // =========================================================

//   const countries = [
//     "India",
//     "China",
//     "Japan",
//     "South Korea",
//     "Indonesia",
//     "Malaysia",
//     "Singapore",
//     "Thailand",
//     "Vietnam",
//     "Philippines",
//   ];

//   // =========================================================
//   // INDIAN STATES + UT
//   // =========================================================

//   const indianStates = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal",

//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli and Daman and Diu",
//     "Delhi",
//     "Jammu and Kashmir",
//     "Ladakh",
//     "Lakshadweep",
//     "Puducherry",
//   ];

//   // =========================================================
//   // FETCH SCHOOL FOR EDIT
//   // =========================================================

//   useEffect(() => {
//     if (!schoolId) {
//       return;
//     }

//     const fetchSchool = async () => {
//       try {
//         setLoadingSchool(true);

//         const token = localStorage.getItem("token");

//         if (!token) {
//           alert("Authentication token not found.");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8080/api/school/${schoolId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const school = response.data;

//         console.log("School data for edit:", school);

//         // =====================================================
//         // EXISTING LOGO
//         // =====================================================

//         setExistingLogo(
//           school.logoUrl ||
//             school.logo ||
//             school.logoPath ||
//             null
//         );

//         // =====================================================
//         // SET FORM DATA
//         // =====================================================

//         setFormData({
//           schoolName: school.schoolName || "",

//           schoolCode: school.schoolCode || "",

//           organizationName:
//             school.organizationName || "",

//           addressLine1:
//             school.addressLine1 || "",

//           addressLine2:
//             school.addressLine2 || "",

//           city:
//             school.city || "",

//           state:
//             school.state || "",

//           country:
//             school.country || "India",

//           pincode:
//             school.pincode || "",

//           contactPersonName:
//             school.contactPerson ||
//             school.contactPersonName ||
//             "",

//           designation:
//             school.designation || "",

//           email:
//             school.email || "",

//           phoneNumber:
//             school.phoneNumber || "",

//           alternatePhone:
//             school.alternatePhone || "",

//           academicSessionStartMonth:
//             school.academicSessionStartMonth || "",

//           academicSessionFormat:
//             school.academicSessionFormat || "",

//           defaultLanguage:
//             school.defaultLanguage || "",

//           currency:
//             school.currency || "",

//           schoolType:
//             school.schoolType || "",

//           schoolCategory:
//             school.schoolCategory || "",

//           affiliationBoard:
//             school.affiliationBoard || "",

//           establishedYear:
//             school.establishedYear || "",

//           totalClasses:
//             school.totalClasses ?? "",

//           totalStudents:
//             school.totalStudents ?? "",

//           description:
//             school.description || "",

//           status:
//             school.active ??
//             school.status ??
//             true,

//           allowParentLogin:
//             school.allowParentLogin ?? true,

//           allowStudentLogin:
//             school.allowStudentLogin ?? true,

//           timeZone:
//             school.timeZone || "Asia/Kolkata",

//           dateFormat:
//             school.dateFormat || "dd-MM-yyyy",
//         });
//       } catch (error) {
//         console.error(
//           "Fetch school error:",
//           error
//         );

//         alert(
//           error.response?.data?.message ||
//             "Failed to load school details."
//         );
//       } finally {
//         setLoadingSchool(false);
//       }
//     };

//     fetchSchool();
//   }, [schoolId]);

//   // =========================================================
//   // HANDLE INPUT
//   // =========================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================================================
//   // HANDLE SWITCH
//   // =========================================================

//   const handleSwitchChange = (e) => {
//     const { name, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   // =========================================================
//   // FILE CHANGE
//   // =========================================================

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // 2MB validation
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Logo size must be less than 2MB.");
//       return;
//     }

//     // Image validation
//     const allowedTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/svg+xml",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert(
//         "Only JPG, PNG or SVG files are allowed."
//       );
//       return;
//     }

//     setSelectedFile(file);
//   };

//   // =========================================================
//   // RESET
//   // =========================================================

//   const handleReset = () => {
//     // Edit mode me reload karke original data
//     // dobara load karenge
//     if (isEditMode) {
//       window.location.reload();
//       return;
//     }

//     setFormData(initialFormData);

//     setSelectedFile(null);

//     setExistingLogo(null);
//   };

//   // =========================================================
//   // VALIDATION
//   // =========================================================

//   const validateForm = () => {
//     if (!formData.schoolName.trim()) {
//       alert("School name is required.");
//       return false;
//     }

//     if (!formData.schoolCode.trim()) {
//       alert("School code is required.");
//       return false;
//     }

//     if (!formData.addressLine1.trim()) {
//       alert("Address Line 1 is required.");
//       return false;
//     }

//     if (!formData.city.trim()) {
//       alert("City is required.");
//       return false;
//     }

//     if (!formData.state) {
//       alert("Please select state.");
//       return false;
//     }

//     if (!formData.pincode.trim()) {
//       alert("Pincode is required.");
//       return false;
//     }

//     if (!formData.contactPersonName.trim()) {
//       alert(
//         "Contact person name is required."
//       );
//       return false;
//     }

//     if (!formData.designation.trim()) {
//       alert("Designation is required.");
//       return false;
//     }

//     if (!formData.email.trim()) {
//       alert("Email is required.");
//       return false;
//     }

//     if (!formData.phoneNumber.trim()) {
//       alert("Phone number is required.");
//       return false;
//     }

//     if (!formData.academicSessionStartMonth) {
//       alert(
//         "Please select academic session start month."
//       );
//       return false;
//     }

//     if (!formData.academicSessionFormat) {
//       alert(
//         "Please select academic session format."
//       );
//       return false;
//     }

//     if (!formData.defaultLanguage) {
//       alert(
//         "Please select default language."
//       );
//       return false;
//     }

//     if (!formData.currency) {
//       alert("Please select currency.");
//       return false;
//     }

//     if (!formData.schoolType) {
//       alert("Please select school type.");
//       return false;
//     }

//     if (!formData.schoolCategory) {
//       alert(
//         "Please select school category."
//       );
//       return false;
//     }

//     if (!formData.affiliationBoard) {
//       alert(
//         "Please select affiliation board."
//       );
//       return false;
//     }

//     if (!formData.establishedYear) {
//       alert(
//         "Please select established year."
//       );
//       return false;
//     }

//     return true;
//   };

//   // =========================================================
//   // CREATE / UPDATE SCHOOL
//   // =========================================================

//   const handleSaveSchool = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Authentication token not found.");
//         return;
//       }

//       // =====================================================
//       // VALIDATION
//       // =====================================================

//       if (!validateForm()) {
//         return;
//       }

//       setSaving(true);

//       // =====================================================
//       // SCHOOL OBJECT
//       // =====================================================

//       const schoolData = {
//         schoolName:
//           formData.schoolName.trim(),

//         schoolCode:
//           formData.schoolCode.trim(),

//         organizationName:
//           formData.organizationName || null,

//         addressLine1:
//           formData.addressLine1.trim(),

//         addressLine2:
//           formData.addressLine2 || null,

//         city:
//           formData.city.trim(),

//         state:
//           formData.state,

//         country:
//           formData.country,

//         pincode:
//           formData.pincode.trim(),

//         contactPerson:
//           formData.contactPersonName.trim(),

//         designation:
//           formData.designation.trim(),

//         email:
//           formData.email.trim(),

//         phoneNumber:
//           formData.phoneNumber.trim(),

//         alternatePhone:
//           formData.alternatePhone || null,

//         academicSessionStartMonth:
//           formData.academicSessionStartMonth,

//         academicSessionFormat:
//           formData.academicSessionFormat,

//         defaultLanguage:
//           formData.defaultLanguage,

//         currency:
//           formData.currency,

//         schoolType:
//           formData.schoolType,

//         schoolCategory:
//           formData.schoolCategory,

//         affiliationBoard:
//           formData.affiliationBoard,

//         establishedYear:
//           formData.establishedYear,

//         totalClasses:
//           formData.totalClasses
//             ? Number(formData.totalClasses)
//             : null,

//         totalStudents:
//           formData.totalStudents
//             ? Number(formData.totalStudents)
//             : null,

//         description:
//           formData.description || null,

//         active:
//           Boolean(formData.status),

//         allowParentLogin:
//           Boolean(
//             formData.allowParentLogin
//           ),

//         allowStudentLogin:
//           Boolean(
//             formData.allowStudentLogin
//           ),

//         timeZone:
//           formData.timeZone,

//         dateFormat:
//           formData.dateFormat,
//       };

//       console.log(
//         "School Data:",
//         schoolData
//       );

//       // =====================================================
//       // MULTIPART DATA
//       // =====================================================

//       const data = new FormData();

//       data.append(
//         "school",
//         new Blob(
//           [JSON.stringify(schoolData)],
//           {
//             type: "application/json",
//           }
//         )
//       );

//       // =====================================================
//       // LOGO
//       // =====================================================

//       if (selectedFile) {
//         data.append(
//           "attachment",
//           selectedFile
//         );
//       }

//       console.log(
//         "Selected Logo:",
//         selectedFile
//       );

//       // =====================================================
//       // API CALL
//       // =====================================================

//       let response;

//       if (isEditMode) {
//         // ===================================================
//         // UPDATE
//         // ===================================================

//         response = await axios.put(
//           `http://localhost:8080/api/school/update/${schoolId}`,
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       } else {
//         // ===================================================
//         // CREATE
//         // ===================================================

//         response = await axios.post(
//           "http://localhost:8080/api/school/add",
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       }

//       console.log(
//         isEditMode
//           ? "School Updated Successfully:"
//           : "School Created Successfully:",
//         response.data
//       );

//       // =====================================================
//       // SUCCESS
//       // =====================================================

//       alert(
//         isEditMode
//           ? "School updated successfully!"
//           : "School created successfully!"
//       );

//       // School list par redirect
//       navigate("/school-list");
//     } catch (error) {
//       console.error(
//         isEditMode
//           ? "Update School Error:"
//           : "Create School Error:",
//         error
//       );

//       console.error(
//         "Backend Response:",
//         error.response?.data
//       );

//       alert(
//         error.response?.data?.message ||
//           (isEditMode
//             ? "Failed to update school."
//             : "Failed to create school.")
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================================================
//   // LOADING SCREEN
//   // =========================================================

//   if (isEditMode && loadingSchool) {
//     return (
//       <div className="container-fluid">
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ minHeight: "500px" }}
//         >
//           <div className="text-center">
//             <div
//               className="spinner-border text-primary"
//               role="status"
//             ></div>

//             <div className="mt-3 text-muted">
//               Loading school details...
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <div
//         className="row shadow align-items-center p-3"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           color: "black",
//         }}
//       >
//         {/* LEFT */}

//         <div className="col">
//           <h6 className="mb-1">
//             {isEditMode
//               ? "Update School"
//               : "Create New School"}
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
//                   <small>
//                     Dashboard
//                   </small>
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>
//                   Organization Management
//                 </small>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>
//                   School List
//                 </small>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>
//                   {isEditMode
//                     ? "Update School"
//                     : "Create New School"}
//                 </small>
//               </li>
//             </ol>
//           </nav>
//         </div>

//         {/* RIGHT */}

//         <div className="col-auto">
//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={() =>
//               navigate("/school-list")
//             }
//           >
//             <IoReturnDownBackOutline
//               size={20}
//             />

//             {" "}Back to School List
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           BASIC INFORMATION + LOGO
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-4 p-1">
//         <div className="row g-3 align-items-stretch">

//           {/* BASIC INFORMATION */}

//           <div className="col-12 col-md-8 col-lg-8">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">
//                 <strong>

//                   <span className="p-1 rounded-5 bg-primary me-2">
//                     <MdOutlineMedicalInformation
//                       size={20}
//                       className="text-white"
//                     />
//                   </span>

//                   Basic Information
//                 </strong>
//               </div>

//               <div className="card-body">

//                 {/* ROW 1 */}

//                 <div className="row">

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         School Name{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="schoolName"
//                       value={
//                         formData.schoolName
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter school name"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         School Code{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="schoolCode"
//                       value={
//                         formData.schoolCode
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter School Code"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         Organization Name{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="organizationName"
//                       value={
//                         formData.organizationName
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Organization
//                       </option>
//                     </select>
//                   </div>

//                 </div>

//                 {/* ROW 2 */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         Address Line 1{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="addressLine1"
//                       value={
//                         formData.addressLine1
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter address line 1"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         Address Line 2
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="addressLine2"
//                       value={
//                         formData.addressLine2
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter address line 2"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         City{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="city"
//                       value={
//                         formData.city
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter city"
//                     />
//                   </div>

//                 </div>

//                 {/* ROW 3 */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         State{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="state"
//                       value={
//                         formData.state
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select State
//                       </option>

//                       {indianStates.map(
//                         (state) => (
//                           <option
//                             key={state}
//                             value={state}
//                           >
//                             {state}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         Country
//                       </h6>
//                     </label>

//                     <select
//                       name="country"
//                       value={
//                         formData.country
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Country
//                       </option>

//                       {countries.map(
//                         (country) => (
//                           <option
//                             key={country}
//                             value={country}
//                           >
//                             {country}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">
//                       <h6>
//                         Pincode{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="pincode"
//                       value={
//                         formData.pincode
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter pincode"
//                     />
//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* SCHOOL LOGO */}

//           <div className="col-12 col-md-4 col-lg-4">

//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">

//                 <strong>
//                   School Logo
//                 </strong>

//                 <p className="mt-2 text-muted">
//                   {isEditMode
//                     ? "Update school logo (optional)"
//                     : "Upload school logo (JPG, PNG, SVG - Max 2MB)"}
//                 </p>
//               </div>

//               <div className="card-body">

//                 {/* EXISTING LOGO */}

//                 {existingLogo &&
//                   !selectedFile && (
//                     <div className="text-center mb-3">

//                       <img
//                         src={existingLogo}
//                         alt="School Logo"
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           objectFit: "contain",
//                           border: "1px solid #dee2e6",
//                           borderRadius: "10px",
//                           padding: "5px",
//                         }}
//                       />

//                       <div className="small text-muted mt-2">
//                         Current Logo
//                       </div>

//                     </div>
//                   )}

//                 {/* UPLOAD */}

//                 <div className="custom-upload-box">

//                   <div className="upload-icon">
//                     <BiSolidSchool />
//                   </div>

//                   <div className="fw-semibold">

//                     <span className="text-primary">
//                       Click to upload{" "}
//                     </span>

//                     <span className="text-muted small">
//                       or drag and drop
//                     </span>

//                   </div>

//                   <div className="text-muted small">
//                     Recommended size:
//                     {" "}200 × 200 px
//                   </div>

//                   <input
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/svg+xml"
//                     className="custom-file-input"
//                     onChange={
//                       handleFileChange
//                     }
//                   />

//                 </div>

//                 {selectedFile && (
//                   <div className="mt-2 small text-success">
//                     ✓ {selectedFile.name}
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           CONTACT + ACADEMIC
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-2 p-1">

//         <div className="row g-3 align-items-stretch">

//           {/* CONTACT */}

//           <div className="col-12 col-md-7 col-lg-7">

//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">

//                 <strong>

//                   <span className="p-1 rounded-5 bg-primary me-2">

//                     <FaPhone
//                       size={20}
//                       className="text-white"
//                     />

//                   </span>

//                   Contact Information

//                 </strong>

//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Contact Person Name{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <input
//                       type="text"
//                       name="contactPersonName"
//                       value={
//                         formData.contactPersonName
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter contact person name"
//                     />

//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Designation{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <input
//                       type="text"
//                       name="designation"
//                       value={
//                         formData.designation
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter Designation"
//                     />

//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Email{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       value={
//                         formData.email
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter Email"
//                     />

//                   </div>

//                 </div>

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Phone Number{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <input
//                       type="text"
//                       name="phoneNumber"
//                       value={
//                         formData.phoneNumber
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter phone number"
//                     />

//                   </div>

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Alternate Phone
//                       </h6>

//                     </label>

//                     <input
//                       type="text"
//                       name="alternatePhone"
//                       value={
//                         formData.alternatePhone
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter alternate phone"
//                     />

//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* ACADEMIC */}

//           <div className="col-12 col-md-5 col-lg-5">

//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">

//                 <span className="p-1 rounded-5 bg-primary me-2">

//                   <HiAcademicCap
//                     size={20}
//                     className="text-white"
//                   />

//                 </span>

//                 <strong>
//                   Academic Information
//                 </strong>

//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Academic Sess Start Month{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="academicSessionStartMonth"
//                       value={
//                         formData.academicSessionStartMonth
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select start month
//                       </option>

//                       <option value="JANUARY">
//                         January
//                       </option>

//                       <option value="APRIL">
//                         April
//                       </option>

//                       <option value="JUNE">
//                         June
//                       </option>

//                       <option value="JULY">
//                         July
//                       </option>

//                     </select>

//                   </div>

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Academic Session Format{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="academicSessionFormat"
//                       value={
//                         formData.academicSessionFormat
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select format
//                       </option>

//                       <option value="YYYY-YYYY">
//                         2026-2027
//                       </option>

//                       <option value="YYYY-YY">
//                         2026-27
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Default Language{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="defaultLanguage"
//                       value={
//                         formData.defaultLanguage
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select language
//                       </option>

//                       <option value="ENGLISH">
//                         English
//                       </option>

//                       <option value="HINDI">
//                         Hindi
//                       </option>

//                     </select>

//                   </div>

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Currency{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="currency"
//                       value={
//                         formData.currency
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select currency
//                       </option>

//                       <option value="INR">
//                         Indian Rupee (₹)
//                       </option>

//                       <option value="USD">
//                         US Dollar ($)
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           OTHER INFORMATION + SETTINGS
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-2 p-1">

//         <div className="row g-3 align-items-stretch">

//           {/* OTHER INFORMATION */}

//           <div className="col-12 col-md-7 col-lg-7">

//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">

//                 <strong>

//                   <span className="p-1 rounded-5 bg-primary me-2">

//                     <MdErrorOutline
//                       size={20}
//                       className="text-white"
//                     />

//                   </span>

//                   Other Information

//                 </strong>

//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   {/* SCHOOL TYPE */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         School Type{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="schoolType"
//                       value={
//                         formData.schoolType
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select Type
//                       </option>

//                       {schoolType.map(
//                         (item) => (
//                           <option
//                             key={item}
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* CATEGORY */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         School Category{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="schoolCategory"
//                       value={
//                         formData.schoolCategory
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select Category
//                       </option>

//                       {schoolCategory.map(
//                         (item) => (
//                           <option
//                             key={item}
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* BOARD */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Affiliation Board{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="affiliationBoard"
//                       value={
//                         formData.affiliationBoard
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select Affiliation
//                       </option>

//                       {affiliationBoard.map(
//                         (item) => (
//                           <option
//                             key={item}
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                 </div>

//                 {/* ROW 2 */}

//                 <div className="row mt-3">

//                   {/* YEAR */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Established Year{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <select
//                       name="establishedYear"
//                       value={
//                         formData.establishedYear
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="">
//                         Select Established Year
//                       </option>

//                       {Array.from(
//                         {
//                           length:
//                             new Date().getFullYear() -
//                             1980 +
//                             1,
//                         },
//                         (_, i) =>
//                           new Date().getFullYear() -
//                           i
//                       ).map((year) => (
//                         <option
//                           key={year}
//                           value={year}
//                         >
//                           {year}
//                         </option>
//                       ))}

//                     </select>

//                   </div>

//                   {/* TOTAL CLASSES */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Total Classes (approx)
//                       </h6>

//                     </label>

//                     <input
//                       type="number"
//                       name="totalClasses"
//                       value={
//                         formData.totalClasses
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter total classes"
//                     />

//                   </div>

//                   {/* TOTAL STUDENTS */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label">

//                       <h6>
//                         Total Students (approx)
//                       </h6>

//                     </label>

//                     <input
//                       type="number"
//                       name="totalStudents"
//                       value={
//                         formData.totalStudents
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter total students"
//                     />

//                   </div>

//                 </div>

//                 {/* DESCRIPTION */}

//                 <div className="row mt-3">

//                   <div className="col-12">

//                     <label className="form-label">

//                       <h6>
//                         Description
//                       </h6>

//                     </label>

//                     <textarea
//                       name="description"
//                       value={
//                         formData.description
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control"
//                       placeholder="Enter school description"
//                       rows="4"
//                     />

//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* SETTINGS */}

//           <div className="col-12 col-md-5 col-lg-5">

//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">

//                 <span className="p-1 rounded-5 bg-primary me-2">

//                   <IoMdSettings
//                     size={20}
//                     className="text-white"
//                   />

//                 </span>

//                 <strong>
//                   Status & Settings
//                 </strong>

//               </div>

//               <div className="card-body">

//                 {/* STATUS */}

//                 <div className="row">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Status{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="schoolStatus"
//                           name="status"
//                           checked={
//                             formData.status
//                           }
//                           onChange={
//                             handleSwitchChange
//                           }
//                         />

//                       </div>

//                       <label
//                         htmlFor="schoolStatus"
//                         className="mb-0"
//                       >
//                         {formData.status
//                           ? "Active"
//                           : "Inactive"}
//                       </label>

//                     </div>

//                   </div>

//                   {/* PARENT */}

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Allow Parent Login{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowParent"
//                           name="allowParentLogin"
//                           checked={
//                             formData.allowParentLogin
//                           }
//                           onChange={
//                             handleSwitchChange
//                           }
//                         />

//                       </div>

//                       <label
//                         htmlFor="allowParent"
//                         className="mb-0"
//                       >
//                         {formData.allowParentLogin
//                           ? "Yes"
//                           : "No"}
//                       </label>

//                     </div>

//                   </div>

//                 </div>

//                 {/* STUDENT */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       <h6>
//                         Allow Student Login{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </h6>

//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowStudent"
//                           name="allowStudentLogin"
//                           checked={
//                             formData.allowStudentLogin
//                           }
//                           onChange={
//                             handleSwitchChange
//                           }
//                         />

//                       </div>

//                       <label
//                         htmlFor="allowStudent"
//                         className="mb-0"
//                       >
//                         {formData.allowStudentLogin
//                           ? "Yes"
//                           : "No"}
//                       </label>

//                     </div>

//                   </div>

//                 </div>

//                 {/* TIMEZONE + DATE */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">

//                       Time Zone{" "}

//                       <span className="text-danger">
//                         *
//                       </span>

//                     </label>

//                     <select
//                       name="timeZone"
//                       value={
//                         formData.timeZone
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="Asia/Kolkata">
//                         India Standard Time (IST) — UTC +05:30
//                       </option>

//                       <option value="Asia/Dubai">
//                         Gulf Standard Time (GST) — UTC +04:00
//                       </option>

//                       <option value="Asia/Dhaka">
//                         Bangladesh Standard Time — UTC +06:00
//                       </option>

//                       <option value="Asia/Kathmandu">
//                         Nepal Time — UTC +05:45
//                       </option>

//                       <option value="Asia/Singapore">
//                         Singapore Time — UTC +08:00
//                       </option>

//                       <option value="Asia/Tokyo">
//                         Japan Standard Time — UTC +09:00
//                       </option>

//                     </select>

//                   </div>

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       Date Format
//                     </label>

//                     <select
//                       name="dateFormat"
//                       value={
//                         formData.dateFormat
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-select"
//                     >

//                       <option value="dd-MM-yyyy">
//                         DD-MM-YYYY (23-08-2026)
//                       </option>

//                       <option value="dd/MM/yyyy">
//                         DD/MM/YYYY (23/08/2026)
//                       </option>

//                       <option value="yyyy-MM-dd">
//                         YYYY-MM-DD (2026-08-23)
//                       </option>

//                       <option value="MM/dd/yyyy">
//                         MM/DD/YYYY (08/23/2026)
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           ACTION BUTTONS
//       ====================================================== */}

//       <div className="row mt-3 mx-2 mb-4">

//         <div className="col-12 d-flex gap-3 justify-content-end">

//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={handleReset}
//             disabled={saving}
//           >
//             Reset
//           </button>

//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={handleSaveSchool}
//             disabled={
//               saving || loadingSchool
//             }
//           >

//             {saving
//               ? "Saving..."
//               : isEditMode
//                 ? "Update School"
//                 : "Create School"}

//           </button>

//         </div>
//       </div>

//       {/* =====================================================
//           CSS
//       ====================================================== */}

//       <style>
//         {`
//           .custom-upload-box {
//             position: relative;
//             border: 2px dashed #ced4da;
//             border-radius: 10px;
//             min-height: 170px;
//             padding: 25px;
//             text-align: center;
//             background-color: #f8f9fa;
//             cursor: pointer;

//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;

//             transition: all 0.2s ease;
//           }

//           .custom-upload-box:hover {
//             border-color: #0d6efd;
//             background-color: #f1f6ff;
//           }

//           .upload-icon {
//             font-size: 32px;
//             margin-bottom: 8px;
//           }

//           .custom-file-input {
//             position: absolute;
//             inset: 0;
//             width: 100%;
//             height: 100%;
//             opacity: 0;
//             cursor: pointer;
//           }

//           .green-switch:checked {
//             background-color: #198754;
//             border-color: #198754;
//           }

//           .green-switch {
//             width: 35px !important;
//             height: 20px !important;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default SchoolAddForm;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  
  IoMdSettings,
} from "react-icons/io";
import {
  MdOutlineMedicalInformation,
  MdErrorOutline,
} from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";
import { FaPhone, FaSave, FaCheckCircle } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";

import useMasters from "../../hooks/useMasters";
import { IoReturnDownBackOutline } from "react-icons/io5";

const SchoolAddForm = () => {
  const {
    schoolType = [],
    schoolCategory = [],
    affiliationBoard = [],
  } = useMasters();

  const { schoolId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(schoolId);

  // =========================================================
  // STATES
  // =========================================================

  const [selectedFile, setSelectedFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // INITIAL FORM
  // =========================================================

  const initialFormData = {
    schoolName: "",
    schoolCode: "",
    organizationName: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",

    contactPersonName: "",
    designation: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",

    academicSessionStartMonth: "",
    academicSessionFormat: "",
    defaultLanguage: "",
    currency: "",

    schoolType: "",
    schoolCategory: "",
    affiliationBoard: "",
    establishedYear: "",
    totalClasses: "",
    totalStudents: "",
    description: "",

    status: true,
    allowParentLogin: true,
    allowStudentLogin: true,

    timeZone: "Asia/Kolkata",
    dateFormat: "dd-MM-yyyy",
  };

  const [formData, setFormData] = useState(initialFormData);

  // =========================================================
  // COUNTRIES
  // =========================================================

  const countries = [
    "India",
    "China",
    "Japan",
    "South Korea",
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Thailand",
    "Vietnam",
    "Philippines",
  ];

  // =========================================================
  // STATES
  // =========================================================

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // =========================================================
  // FETCH SCHOOL
  // =========================================================

  useEffect(() => {
    if (!schoolId) return;

    const fetchSchool = async () => {
      try {
        setLoadingSchool(true);

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authentication token not found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/school/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const school = response.data;

        console.log("School data:", school);

        setExistingLogo(
          school.logoUrl ||
            school.logo ||
            school.logoPath ||
            null
        );

        setFormData({
          schoolName: school.schoolName || "",
          schoolCode: school.schoolCode || "",
          organizationName: school.organizationName || "",

          addressLine1: school.addressLine1 || "",
          addressLine2: school.addressLine2 || "",
          city: school.city || "",
          state: school.state || "",
          country: school.country || "India",
          pincode: school.pincode || "",

          contactPersonName:
            school.contactPerson ||
            school.contactPersonName ||
            "",

          designation: school.designation || "",
          email: school.email || "",
          phoneNumber: school.phoneNumber || "",
          alternatePhone: school.alternatePhone || "",

          academicSessionStartMonth:
            school.academicSessionStartMonth || "",

          academicSessionFormat:
            school.academicSessionFormat || "",

          defaultLanguage:
            school.defaultLanguage || "",

          currency: school.currency || "",

          schoolType: school.schoolType || "",
          schoolCategory: school.schoolCategory || "",
          affiliationBoard: school.affiliationBoard || "",

          establishedYear:
            school.establishedYear || "",

          totalClasses:
            school.totalClasses ?? "",

          totalStudents:
            school.totalStudents ?? "",

          description:
            school.description || "",

          status:
            school.active ??
            school.status ??
            true,

          allowParentLogin:
            school.allowParentLogin ?? true,

          allowStudentLogin:
            school.allowStudentLogin ?? true,

          timeZone:
            school.timeZone || "Asia/Kolkata",

          dateFormat:
            school.dateFormat || "dd-MM-yyyy",
        });
      } catch (error) {
        console.error("Fetch school error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load school details."
        );
      } finally {
        setLoadingSchool(false);
      }
    };

    fetchSchool();
  }, [schoolId]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SWITCH
  // =========================================================

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // =========================================================
  // FILE
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size must be less than 2MB.");
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or SVG files are allowed.");
      return;
    }

    setSelectedFile(file);
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    if (isEditMode) {
      window.location.reload();
      return;
    }

    setFormData(initialFormData);
    setSelectedFile(null);
    setExistingLogo(null);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!formData.schoolName.trim()) {
      alert("School name is required.");
      return false;
    }

    if (!formData.schoolCode.trim()) {
      alert("School code is required.");
      return false;
    }

    if (!formData.addressLine1.trim()) {
      alert("Address Line 1 is required.");
      return false;
    }

    if (!formData.city.trim()) {
      alert("City is required.");
      return false;
    }

    if (!formData.state) {
      alert("Please select state.");
      return false;
    }

    if (!formData.pincode.trim()) {
      alert("Pincode is required.");
      return false;
    }

    if (!formData.contactPersonName.trim()) {
      alert("Contact person name is required.");
      return false;
    }

    if (!formData.designation.trim()) {
      alert("Designation is required.");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      alert("Phone number is required.");
      return false;
    }

    if (!formData.academicSessionStartMonth) {
      alert("Please select academic session start month.");
      return false;
    }

    if (!formData.academicSessionFormat) {
      alert("Please select academic session format.");
      return false;
    }

    if (!formData.defaultLanguage) {
      alert("Please select default language.");
      return false;
    }

    if (!formData.currency) {
      alert("Please select currency.");
      return false;
    }

    if (!formData.schoolType) {
      alert("Please select school type.");
      return false;
    }

    if (!formData.schoolCategory) {
      alert("Please select school category.");
      return false;
    }

    if (!formData.affiliationBoard) {
      alert("Please select affiliation board.");
      return false;
    }

    if (!formData.establishedYear) {
      alert("Please select established year.");
      return false;
    }

    return true;
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSaveSchool = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      if (!validateForm()) return;

      setSaving(true);

      const schoolData = {
        schoolName: formData.schoolName.trim(),
        schoolCode: formData.schoolCode.trim(),
        organizationName: formData.organizationName || null,

        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2 || null,
        city: formData.city.trim(),
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode.trim(),

        contactPerson: formData.contactPersonName.trim(),
        designation: formData.designation.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        alternatePhone: formData.alternatePhone || null,

        academicSessionStartMonth:
          formData.academicSessionStartMonth,

        academicSessionFormat:
          formData.academicSessionFormat,

        defaultLanguage:
          formData.defaultLanguage,

        currency: formData.currency,

        schoolType: formData.schoolType,
        schoolCategory: formData.schoolCategory,
        affiliationBoard: formData.affiliationBoard,

        establishedYear: formData.establishedYear,

        totalClasses: formData.totalClasses
          ? Number(formData.totalClasses)
          : null,

        totalStudents: formData.totalStudents
          ? Number(formData.totalStudents)
          : null,

        description: formData.description || null,

        active: Boolean(formData.status),

        allowParentLogin:
          Boolean(formData.allowParentLogin),

        allowStudentLogin:
          Boolean(formData.allowStudentLogin),

        timeZone: formData.timeZone,
        dateFormat: formData.dateFormat,
      };

      const data = new FormData();

      data.append(
        "school",
        new Blob(
          [JSON.stringify(schoolData)],
          {
            type: "application/json",
          }
        )
      );

      if (selectedFile) {
        data.append("attachment", selectedFile);
      }

      let response;

      if (isEditMode) {
        response = await axios.put(
          `http://localhost:8080/api/school/update/${schoolId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/school/add",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("School response:", response.data);

      alert(
        isEditMode
          ? "School updated successfully!"
          : "School created successfully!"
      );

      navigate("/school-list");
    } catch (error) {
      console.error("School save error:", error);

      alert(
        error.response?.data?.message ||
          (isEditMode
            ? "Failed to update school."
            : "Failed to create school.")
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (isEditMode && loadingSchool) {
    return (
      <div className="school-page">
        <div className="school-loading">
          <div className="spinner-border text-primary" />
          <p className="mt-3 text-muted">
            Loading school details...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // SMALL COMPONENT
  // =========================================================

  const SectionHeader = ({
    icon,
    title,
    description,
  }) => (
    <div className="section-header">
      <div className="section-icon">
        {icon}
      </div>

      <div>
        <h6 className="section-title">
          {title}
        </h6>

        {description && (
          <small className="section-description">
            {description}
          </small>
        )}
      </div>
    </div>
  );

  return (
    <div className="school-page ">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      {/* =====================================================
    MODERN PAGE HEADER
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

        {/* LEFT SIDE */}
        <div className="d-flex align-items-center gap-3">

          {/* ICON */}
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
              flexShrink: 0,
            }}
          >
            <BiSolidSchool size={27} />
          </div>

          {/* TITLE */}
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              {isEditMode
                ? "Update School"
                : "Create New School"}
            </h5>

            <div className="text-muted small">
              Organization Management &nbsp;/&nbsp; School
            </div>
          </div>
        </div>

        {/* RIGHT BADGE */}
        <div className="d-flex align-items-center gap-2">

          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              fontSize: "13px",
            }}
          >
            <BiSolidSchool className="me-1" />

            {isEditMode
              ? "Update School"
              : "New School"}
          </span>

        </div>
      </div>
    </div>

    {/* BOTTOM BREADCRUMB */}
    <div
      className="px-4 py-2"
      style={{
        backgroundColor: "rgba(239,246,255,.75)",
        borderTop: "1px solid #e0ecff",
      }}
    >
      <small className="text-muted">

        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        &nbsp;›&nbsp;

        <span>
          Organization Management
        </span>

        &nbsp;›&nbsp;

        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/school-list")}
        >
          School List
        </span>

        &nbsp;›&nbsp;

        <span className="text-primary fw-semibold">
          {isEditMode
            ? "Update School"
            : "Create New School"}
        </span>

      </small>
    </div>
  </div>
</div>

      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <div className="form-card shadow">

        <SectionHeader
          icon={
            <MdOutlineMedicalInformation
              size={20}
            />
          }
          title="Basic Information"
          description="Enter basic details of the school"
        />

        <div className="form-card-body">

          <div className="row g-3">

            <div className="col-12 col-md-4">
              <label className="field-label">
                School Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter school name"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                School Code
                <span>*</span>
              </label>

              <input
                type="text"
                name="schoolCode"
                value={formData.schoolCode}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter school code"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Organization Name
              </label>

              <select
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select Organization
                </option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Address Line 1
                <span>*</span>
              </label>

              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter address line 1"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Address Line 2
              </label>

              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter address line 2"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                City
                <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter city"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                State
                <span>*</span>
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select State
                </option>

                {indianStates.map((state) => (
                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Country
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-select theme-input"
              >
                {countries.map((country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Pincode
                <span>*</span>
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter pincode"
              />
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          LOGO + CONTACT
      ====================================================== */}

      <div className="row g-3 mt-0">

        {/* LOGO */}

        <div className="col-12 col-lg-4">

          <div className="form-card h-100">

            <div className="form-card-inner">

              <SectionHeader
                icon={
                  <BiSolidSchool size={20} />
                }
                title="School Logo"
                description="Upload school logo"
              />

              <div className="logo-upload-wrapper">

                {existingLogo &&
                  !selectedFile && (
                    <div className="current-logo">
                      <img
                        src={existingLogo}
                        alt="School Logo"
                      />

                      <span>
                        Current Logo
                      </span>
                    </div>
                  )}

                <div className="upload-box">

                  <div className="upload-circle">
                    <BiSolidSchool size={28} />
                  </div>

                  <h6>
                    <span className="upload-primary">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </h6>

                  <small>
                    JPG, PNG or SVG
                  </small>

                  <small>
                    Maximum size: 2MB
                  </small>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleFileChange}
                  />
                </div>

                {selectedFile && (
                  <div className="selected-file">
                    <FaCheckCircle />
                    <span>
                      {selectedFile.name}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* CONTACT */}

        <div className="col-12 col-lg-8">

          <div className="form-card h-100">

            <SectionHeader
              icon={
                <FaPhone size={18} />
              }
              title="Contact Information"
              description="School contact details"
            />

            <div className="form-card-body">

              <div className="row g-3">

                <div className="col-12 col-md-4">
                  <label className="field-label">
                    Contact Person Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="contactPersonName"
                    value={
                      formData.contactPersonName
                    }
                    onChange={handleChange}
                    className="form-control theme-input"
                    placeholder="Enter contact person"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="field-label">
                    Designation
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="form-control theme-input"
                    placeholder="Enter designation"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="field-label">
                    Email
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control theme-input"
                    placeholder="Enter email"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="field-label">
                    Phone Number
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-control theme-input"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="field-label">
                    Alternate Phone
                  </label>

                  <input
                    type="text"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className="form-control theme-input"
                    placeholder="Enter alternate phone"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          ACADEMIC INFORMATION
      ====================================================== */}

      <div className="form-card mt-3">

        <SectionHeader
          icon={
            <HiAcademicCap size={21} />
          }
          title="Academic Information"
          description="Configure academic session and localization"
        />

        <div className="form-card-body">

          <div className="row g-3">

            <div className="col-12 col-md-3">
              <label className="field-label">
                Academic Session Start Month
                <span>*</span>
              </label>

              <select
                name="academicSessionStartMonth"
                value={
                  formData.academicSessionStartMonth
                }
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select month
                </option>

                <option value="JANUARY">
                  January
                </option>

                <option value="APRIL">
                  April
                </option>

                <option value="JUNE">
                  June
                </option>

                <option value="JULY">
                  July
                </option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="field-label">
                Academic Session Format
                <span>*</span>
              </label>

              <select
                name="academicSessionFormat"
                value={
                  formData.academicSessionFormat
                }
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select format
                </option>

                <option value="YYYY-YYYY">
                  2026-2027
                </option>

                <option value="YYYY-YY">
                  2026-27
                </option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="field-label">
                Default Language
                <span>*</span>
              </label>

              <select
                name="defaultLanguage"
                value={formData.defaultLanguage}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select language
                </option>

                <option value="ENGLISH">
                  English
                </option>

                <option value="HINDI">
                  Hindi
                </option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="field-label">
                Currency
                <span>*</span>
              </label>

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select currency
                </option>

                <option value="INR">
                  Indian Rupee (₹)
                </option>

                <option value="USD">
                  US Dollar ($)
                </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          OTHER INFORMATION
      ====================================================== */}

      <div className="form-card mt-3">

        <SectionHeader
          icon={
            <MdErrorOutline size={21} />
          }
          title="Other Information"
          description="Additional school information"
        />

        <div className="form-card-body">

          <div className="row g-3">

            <div className="col-12 col-md-4">
              <label className="field-label">
                School Type
                <span>*</span>
              </label>

              <select
                name="schoolType"
                value={formData.schoolType}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select type
                </option>

                {schoolType.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                School Category
                <span>*</span>
              </label>

              <select
                name="schoolCategory"
                value={formData.schoolCategory}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select category
                </option>

                {schoolCategory.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Affiliation Board
                <span>*</span>
              </label>

              <select
                name="affiliationBoard"
                value={
                  formData.affiliationBoard
                }
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select affiliation
                </option>

                {affiliationBoard.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Established Year
                <span>*</span>
              </label>

              <select
                name="establishedYear"
                value={
                  formData.establishedYear
                }
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="">
                  Select year
                </option>

                {Array.from(
                  {
                    length:
                      new Date().getFullYear() -
                      1980 +
                      1,
                  },
                  (_, i) =>
                    new Date().getFullYear() - i
                ).map((year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Total Classes
              </label>

              <input
                type="number"
                name="totalClasses"
                value={formData.totalClasses}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter total classes"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="field-label">
                Total Students
              </label>

              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                className="form-control theme-input"
                placeholder="Enter total students"
              />
            </div>

            <div className="col-12">
              <label className="field-label">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control theme-input"
                rows="4"
                placeholder="Enter school description"
              />
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SETTINGS
      ====================================================== */}

      <div className="form-card mt-3">

        <SectionHeader
          icon={
            <IoMdSettings size={21} />
          }
          title="Status & Settings"
          description="Manage school access and preferences"
        />

        <div className="form-card-body">

          <div className="row g-4">

            <div className="col-12 col-md-4">
              <div className="setting-item">

                <div>
                  <h6>
                    School Status
                  </h6>

                  <small>
                    Enable or disable school
                  </small>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input custom-switch"
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={
                      handleSwitchChange
                    }
                  />
                </div>

                <span
                  className={
                    formData.status
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {formData.status
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="setting-item">

                <div>
                  <h6>
                    Parent Login
                  </h6>

                  <small>
                    Allow parents to login
                  </small>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input custom-switch"
                    type="checkbox"
                    name="allowParentLogin"
                    checked={
                      formData.allowParentLogin
                    }
                    onChange={
                      handleSwitchChange
                    }
                  />
                </div>

                <span className="setting-value">
                  {formData.allowParentLogin
                    ? "Enabled"
                    : "Disabled"}
                </span>

              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="setting-item">

                <div>
                  <h6>
                    Student Login
                  </h6>

                  <small>
                    Allow students to login
                  </small>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input custom-switch"
                    type="checkbox"
                    name="allowStudentLogin"
                    checked={
                      formData.allowStudentLogin
                    }
                    onChange={
                      handleSwitchChange
                    }
                  />
                </div>

                <span className="setting-value">
                  {formData.allowStudentLogin
                    ? "Enabled"
                    : "Disabled"}
                </span>

              </div>
            </div>

          </div>

          <hr className="my-4" />

          <div className="row g-3">

            <div className="col-12 col-md-6">
              <label className="field-label">
                Time Zone
                <span>*</span>
              </label>

              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="Asia/Kolkata">
                  India Standard Time (IST) — UTC +05:30
                </option>

                <option value="Asia/Dubai">
                  Gulf Standard Time (GST) — UTC +04:00
                </option>

                <option value="Asia/Dhaka">
                  Bangladesh Standard Time — UTC +06:00
                </option>

                <option value="Asia/Kathmandu">
                  Nepal Time — UTC +05:45
                </option>

                <option value="Asia/Singapore">
                  Singapore Time — UTC +08:00
                </option>

                <option value="Asia/Tokyo">
                  Japan Standard Time — UTC +09:00
                </option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="field-label">
                Date Format
              </label>

              <select
                name="dateFormat"
                value={formData.dateFormat}
                onChange={handleChange}
                className="form-select theme-input"
              >
                <option value="dd-MM-yyyy">
                  DD-MM-YYYY (23-08-2026)
                </option>

                <option value="dd/MM/yyyy">
                  DD/MM/YYYY (23/08/2026)
                </option>

                <option value="yyyy-MM-dd">
                  YYYY-MM-DD (2026-08-23)
                </option>

                <option value="MM/dd/yyyy">
                  MM/DD/YYYY (08/23/2026)
                </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="action-card">

        <button
          type="button"
          className="btn btn-light cancel-btn"
          onClick={handleReset}
          disabled={saving}
        >
          Reset
        </button>

        <button
          type="button"
          className="btn btn-primary save-btn"
          onClick={handleSaveSchool}
          disabled={
            saving || loadingSchool
          }
        >
          {saving ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
              />
              Saving...
            </>
          ) : (
            <>
              <FaSave size={15} />
              {isEditMode
                ? "Update School"
                : "Create School"}
            </>
          )}
        </button>

      </div>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style>{`

        .school-page {
          padding: 10px;
          // background: #f5f7fb;
          min-height: 100vh;
        }

        /* PAGE HEADER */

        .page-header-card {
          background: #ffffff;
          border: 1px solid #edf0f5;
          border-radius: 10px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .page-title {
          margin: 0 0 6px;
          font-size: 18px;
          font-weight: 600;
          color: #212529;
        }

        .breadcrumb-wrapper {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          font-size: 12px;
          color: #8a94a6;
        }

        .breadcrumb-link {
          color: #0d6efd;
          cursor: pointer;
        }

        .breadcrumb-link:hover {
          text-decoration: underline;
        }

        .breadcrumb-separator {
          color: #adb5bd;
        }

        .breadcrumb-active {
          color: #495057;
        }

        .back-btn {
          border: 1px solid #dbe2ea;
          background: #fff;
          color: #495057;
          border-radius: 7px;
          padding: 8px 13px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: 0.2s;
        }

        .back-btn:hover {
          background: #f8f9fa;
          border-color: #0d6efd;
          color: #0d6efd;
        }

        /* CARD */

        .form-card {
          background: #fff;
          border: 1px solid #edf0f5;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .form-card-inner {
          padding: 18px;
        }

        .form-card-body {
          padding: 0 18px 20px;
        }

        /* SECTION HEADER */

        .section-header {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 16px 18px;
          margin-bottom: 2px;
        }

        .section-icon {
          width: 35px;
          height: 35px;
          min-width: 35px;
          border-radius: 8px;
          background: #eef5ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title {
          margin: 0;
          color: #252b33;
          font-size: 14px;
          font-weight: 600;
        }

        .section-description {
          display: block;
          margin-top: 2px;
          color: #98a2b3;
          font-size: 11px;
        }

        /* LABEL */

        .field-label {
          display: block;
          margin-bottom: 7px;
          color: #495057;
          font-size: 12px;
          font-weight: 600;
        }

        .field-label span {
          color: #dc3545;
          margin-left: 3px;
        }

        /* INPUT */

        .theme-input {
          min-height: 39px;
          border: 1px solid #dfe4ea;
          border-radius: 7px;
          font-size: 13px;
          color: #343a40;
          box-shadow: none !important;
          transition: 0.2s;
        }

        .theme-input:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.15rem rgba(13,110,253,.08) !important;
        }

        .theme-input::placeholder {
          color: #adb5bd;
          font-size: 12px;
        }

        textarea.theme-input {
          resize: vertical;
        }

        /* LOGO */

        .logo-upload-wrapper {
          padding: 0 2px 2px;
        }

        .current-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
        }

        .current-logo img {
          width: 85px;
          height: 85px;
          object-fit: contain;
          border: 1px solid #e4e8ed;
          border-radius: 8px;
          padding: 5px;
        }

        .current-logo span {
          margin-top: 6px;
          color: #8a94a6;
          font-size: 11px;
        }

        .upload-box {
          position: relative;
          min-height: 155px;
          border: 1.5px dashed #cfd6df;
          border-radius: 9px;
          background: #fafbfc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          cursor: pointer;
          transition: 0.2s;
        }

        .upload-box:hover {
          border-color: #0d6efd;
          background: #f7faff;
        }

        .upload-box input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .upload-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #eef5ff;
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 9px;
        }

        .upload-box h6 {
          font-size: 12px;
          margin: 0 0 5px;
          font-weight: 500;
          color: #59636e;
        }

        .upload-primary {
          color: #0d6efd;
          font-weight: 600;
        }

        .upload-box small {
          display: block;
          color: #98a2b3;
          font-size: 10px;
          line-height: 17px;
        }

        .selected-file {
          margin-top: 8px;
          padding: 7px 10px;
          border-radius: 6px;
          background: #f0fff5;
          color: #198754;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;
        }

        .selected-file span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* SETTINGS */

        .setting-item {
          min-height: 75px;
          border: 1px solid #edf0f4;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fbfcfe;
        }

        .setting-item > div:first-child {
          flex: 1;
        }

        .setting-item h6 {
          margin: 0;
          font-size: 12px;
          color: #343a40;
          font-weight: 600;
        }

        .setting-item small {
          display: block;
          color: #98a2b3;
          font-size: 10px;
          margin-top: 3px;
        }

        .custom-switch {
          width: 34px !important;
          height: 18px !important;
          cursor: pointer;
        }

        .custom-switch:checked {
          background-color: #198754;
          border-color: #198754;
        }

        .status-active {
          color: #198754;
          background: #eaf8f0;
          padding: 3px 7px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 600;
        }

        .status-inactive {
          color: #dc3545;
          background: #fff0f1;
          padding: 3px 7px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 600;
        }

        .setting-value {
          color: #6c757d;
          font-size: 10px;
          white-space: nowrap;
        }

        /* ACTION */

        .action-card {
          margin-top: 15px;
          margin-bottom: 25px;
          background: #fff;
          border: 1px solid #edf0f5;
          border-radius: 10px;
          padding: 14px 18px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .cancel-btn {
          min-width: 90px;
          border: 1px solid #dfe4ea;
          color: #59636e;
          font-size: 13px;
          border-radius: 7px;
        }

        .save-btn {
          min-width: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 13px;
          border-radius: 7px;
        }

        /* LOADING */

        .school-loading {
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 10px;
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {

          .school-page {
            padding: 7px;
          }

          .page-header-card {
            padding: 14px;
            align-items: flex-start;
            flex-direction: column;
          }

          .back-btn {
            width: 100%;
            justify-content: center;
          }

          .section-header {
            padding: 14px;
          }

          .form-card-body {
            padding: 0 14px 16px;
          }

          .setting-item {
            min-height: 65px;
          }

          .action-card {
            position: sticky;
            bottom: 8px;
            z-index: 20;
          }
        }

        @media (max-width: 576px) {

          .breadcrumb-wrapper {
            line-height: 20px;
          }

          .action-card {
            flex-direction: column-reverse;
          }

          .cancel-btn,
          .save-btn {
            width: 100%;
          }

        }

      `}</style>
    </div>
  );
};

export default SchoolAddForm;
