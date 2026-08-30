// import React, { useEffect, useState } from "react";
// import { FaUsers, FaUserShield } from "react-icons/fa";
// import Man from "../../assets/icon/SchoolMan.png";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SchoolDetailsView = () => {
//   const { id } = useParams(); // 👈 school ID
//   const token = localStorage.getItem("token");
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [status, setStatus] = useState("");
//   const [superAdmins, setSuperAdmins] = useState([]);

//   useEffect(() => {
//     fetchStudents();
//     fetchSuperAdmins();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get("http://localhost:8080/api/students", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("Students:", response.data);
//       setStudents(response.data);
//     } catch (error) {
//       console.error("Error:", error.response?.data || error);
//     }
//   };

//   console.log("Students in SchoolDetailsView:", students[0]?.school?.id);
//   students.forEach((student) => {
//     console.log(student.school?.id);
//   });
//   const [school, setSchool] = useState(null);
//   useEffect(() => {
//     fetchSchoolById();
//   }, [id]);

//   const fetchSchoolById = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/school/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSchool(res.data);
//     } catch (err) {
//       console.error("Failed to load school details", err);
//     }
//   };
//   console.log("school by id", school);

//   const schoolStudents = students.filter(
//     (student) => student.school?.id === Number(id),
//   );

//   console.log("School Students:", schoolStudents);

//   // filter students
//   const filteredStudents = schoolStudents.filter((student) => {
//     const fullName =
//       `${student.firstName || ""} ${student.middleName || ""} ${student.lastName || ""}`.toLowerCase();

//     const matchesSearch =
//       search === "" ||
//       fullName.includes(search.toLowerCase()) ||
//       String(student.mobile || "").includes(search);

//     const matchesClass =
//       studentClass === "" || student.studentClass === studentClass;

//     const matchesStatus = status === "" || student.status === status;

//     return matchesSearch && matchesClass && matchesStatus;
//   });

//   // fetch superadmins

//   // 🔹 Fetch super admins
//   const fetchSuperAdmins = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/superadmin/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("res", res);
//       setSuperAdmins(res.data);
//     } catch (err) {
//       console.error("Failed to load super admins", err);
//     }
//   };
//   console.log("superAdmins", superAdmins);

//   const schoolSuperAdmins = superAdmins.filter(
//     (admin) => admin.school?.id === Number(id),
//   );
//   console.log("School Super Admins:", schoolSuperAdmins);

//   return (
//     <>
//       <div className="row g-3 align-items-stretch mt-1">
//         {/* Total Students */}
//         <div className="col-md-3">
//           <div className="card stat-card blue-card h-100">
//             <div className="card-body d-flex align-items-center">
//               <div className="icon-circle me-3">🎓</div>
//               <div>
//                 <h4 className="mb-0">{schoolStudents.length}</h4>
//                 <small>Total Students</small>
//               </div>
//             </div>
//             <div className="card-footer text-muted small ">
//               {school?.address}
//             </div>
//           </div>
//         </div>

//         {/* Super Admin */}
//         <div className="col-md-3">
//           <div className="card stat-card green-card h-100">
//             <div className="card-body">
//               <div className="d-flex align-items-center mb-2">
//                 <img
//                   src="https://i.pravatar.cc/50"
//                   className="rounded-circle me-2"
//                   alt="admin"
//                 />
//                 <div>
//                   <h6 className="mb-0">{schoolSuperAdmins[0]?.fullName}</h6>
//                   <small>Super Admin</small>
//                 </div>
//               </div>
//             </div>
//             <div className="card-footer d-flex justify-content-between align-items-center">
//               <small>{schoolSuperAdmins[0]?.email}</small>
//               {/* <span className="badge bg-success">📞 +1 123 456 7890</span> */}
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card stat-card white-card h-100">
//             <div className="card-body d-flex justify-content-between align-items-center text-center">
//               {/* Parents */}
//               <div className="flex-fill">
//                 <h5 className="mb-0">
//                   <FaUsers className="me-2" size={35} />
//                   380
//                 </h5>
//                 <small className="text-muted">Parents</small>
//               </div>

//               {/* Divider */}
//               <div className="vr mx-2"></div>

//               {/* Staff */}
//               <div className="flex-fill">
//                 <h5 className="mb-0">
//                   <FaUserShield className="me-2" size={35} />
//                   16
//                 </h5>
//                 <small className="text-muted">Staff</small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="col-md-3">
//           <div className="d-flex flex-column gap-3 h-100">
//             <button className="btn btn-success w-100 h-100">+ Add User</button>
//             <button className="btn btn-outline-secondary w-100 h-100">
//               🔑 Reset Password
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* school information  */}

//       <div className="row mt-3">
//         {/* LEFT SIDE */}
//         <div className="col-md-9 d-flex flex-column">
//           {/* TOP LEFT (300px) – SCHOOL INFO */}
//           <div className="flex-fill mb-2">
//             <div className="card school-info-card h-100 ">
//               {/* Header */}
//               <div className="card-header d-flex justify-content-between align-items-center bg-light">
//                 <h6 className="mb-0">School Information</h6>
//                 <div>
//                   <button className="btn btn-primary btn-sm me-2">
//                     ✏️ Edit
//                   </button>
//                   <button className="btn btn-danger btn-sm">🗑 Delete</button>
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="card-body">
//                 <div className="row h-100">
//                   {/* LEFT INFO */}
//                   <div className="col-md-9">
//                     <table className="table table-borderless mb-0 info-table">
//                       <tbody>
//                         <tr>
//                           <td className="label">School Name</td>
//                           <td>
//                             <h6>{school?.schoolName}</h6>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="label">Address</td>
//                           <td>{school?.address}</td>
//                         </tr>
//                         <tr>
//                           <td className="label">Academic Year</td>
//                           <td>{school?.academicYear}</td>
//                         </tr>
//                         <tr>
//                           <td className="label">Created Date</td>
//                           <td>{school?.createdAt}</td>
//                         </tr>
//                         <tr>
//                           <td className="label">{school?.status}</td>
//                           <td>
//                             <h6 className="text-success mb-1">Active</h6>
//                             <select className="form-select form-select-sm status-select">
//                               <option>Active</option>
//                               <option>Inactive</option>
//                             </select>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* RIGHT LOGO */}
//                   <div className="col-md-3 d-flex justify-content-center">
//                     <div className="logo-box text-center">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/167/167707.png"
//                         alt="School Logo"
//                       />
//                       <small className="d-block mt-2">School Logo</small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* BOTTOM LEFT (200px) – EMPTY / USER TABLE LATER */}
//           <div className="flex-fill mt-2">
//             {/* You can add User Account Table here later */}

          
//             <div className="card mt-3">
//               <div className="card-header">
//                 <h6 className="mb-0">
//                   SuperAdmins ({schoolSuperAdmins.length})
//                 </h6>
//               </div>

//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover">
//                   <thead className="table-success">
//                     <tr>
//                       <th>#</th>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Phone No</th>
//                       <th>Status</th>
//                       <th>Role</th>
//                       <th>Created At</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {schoolSuperAdmins.length > 0 ? (
//                       schoolSuperAdmins.map((superAdmin, index) => (
//                         <tr key={superAdmin.id}>
//                           <td>{index + 1}</td>
//                           <td>{superAdmin.id}</td>
//                           <td>{superAdmin.fullName}</td>
//                           <td>{superAdmin.email}</td>
//                           <td>{superAdmin.phone}</td>
//                           <td>{superAdmin.status}</td>
//                           <td>{superAdmin.role}</td>
//                            <td>{superAdmin.createdAt}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center">
//                           No SuperAdmins Created Yet
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="card mt-3">
//               <div className="card-header">
//                 <div className="row g-2">
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search Name / Mobile"
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <select
//                       className="form-select"
//                       value={studentClass}
//                       onChange={(e) => setStudentClass(e.target.value)}
//                     >
//                       <option value="">All Classes</option>
//                       <option value="I">I</option>
//                       <option value="II">II</option>
//                       <option value="III">III</option>
//                       <option value="IV">IV</option>
//                       <option value="V">V</option>
//                       <option value="VI">VI</option>
//                       <option value="VII">VII</option>
//                       <option value="VIII">VIII</option>
//                       <option value="IX">IX</option>
//                       <option value="X">X</option>
//                     </select>
//                   </div>

//                   <div className="col-md-3">
//                     <select
//                       className="form-select"
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                     >
//                       <option value="">All Status</option>
//                       <option value="ACTIVE">ACTIVE</option>
//                       <option value="INACTIVE">INACTIVE</option>
//                     </select>
//                   </div>

//                   <div className="col-md-2">
//                     <button
//                       className="btn btn-secondary w-100"
//                       onClick={() => {
//                         setSearch("");
//                         setStudentClass("");
//                         setStatus("");
//                       }}
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card mt-3">
//               <div className="card-header">
//                 <h6 className="mb-0">
//                   Total Students ({filteredStudents.length})
//                 </h6>
//               </div>

//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover">
//                   <thead className="table-success">
//                     <tr>
//                       <th>#</th>
//                       <th>Admission No</th>
//                       <th>Name</th>
//                       <th>Class</th>
//                       <th>Academic Year</th>
//                       <th>Email</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {filteredStudents.length > 0 ? (
//                       filteredStudents.map((student, index) => (
//                         <tr key={student.id}>
//                           <td>{index + 1}</td>
//                           <td>{student.admissionNumber}</td>
//                           <td>
//                             {student.firstName} {student.middleName}{" "}
//                             {student.lastName}
//                           </td>
//                           <td>{student.studentClass}</td>
//                           <td>{student.academicYear}</td>
//                           <td>{student.email}</td>
//                           <td>{student.status}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center">
//                           No students found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE (600px) */}
//         <div className="col-md-3 d-flex">
//           <div className="card fixed-card w-100 h-100">
//             {/* Header */}
//             <div
//               className="card"
//               style={{
//                 height: "150px",
//                 background: "linear-gradient(135deg, #dff0fd, #e4edf8)",
//               }}
//             >
//               <div className="card-body">
//                 <div className="d-flex align-items-center mb-2">
//                   <img
//                     src="https://i.pravatar.cc/50"
//                     className="rounded-circle me-2"
//                     alt="admin"
//                   />
//                   <div>
//                     <h6 className="mb-0">Ramesh Sharma</h6>
//                     <small>Super Admin</small>
//                   </div>
//                 </div>

//                 <div className="card-footer">
//                   <span>ramesh@gyschool.com</span>
//                   <span>+91 9876543210</span>
//                 </div>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="card-body d-flex justify-content-center align-items-center">
//               <img src={Man} alt="illustration" className="img-fluid fit-img" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SchoolDetailsView;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   FaSchool,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaUsers,
//   FaUserShield,
//   FaSearch,
//   FaPlus,
//   FaUserGraduate,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// import {
//   MdOutlineSchool,
//   MdOutlineMedicalInformation,
// } from "react-icons/md";

// import { LuBuilding2 } from "react-icons/lu";
// import { HiAcademicCap } from "react-icons/hi2";

// import Man from "../../assets/icon/SchoolMan.png";

// const SchoolDetailsView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const token =
//     localStorage.getItem("AdminToken") ||
//     localStorage.getItem("token");

//   const [school, setSchool] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [superAdmins, setSuperAdmins] = useState([]);

//   const [search, setSearch] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [status, setStatus] = useState("");

//   const [loadingSchool, setLoadingSchool] = useState(true);
//   const [loadingStudents, setLoadingStudents] = useState(true);
//   const [loadingAdmins, setLoadingAdmins] = useState(true);

//   // =========================================================
//   // FETCH DATA
//   // =========================================================

//   useEffect(() => {
//     fetchSchoolById();
//     fetchStudents();
//     fetchSuperAdmins();
//   }, [id]);

//   // =========================================================
//   // FETCH SCHOOL
//   // =========================================================

//   const fetchSchoolById = async () => {
//     try {
//       setLoadingSchool(true);

//       const response = await axios.get(
//         `http://localhost:8080/api/school/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSchool(response.data);
//     } catch (error) {
//       console.error(
//         "Failed to load school details:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoadingSchool(false);
//     }
//   };

//   // =========================================================
//   // FETCH STUDENTS
//   // =========================================================

//   const fetchStudents = async () => {
//     try {
//       setLoadingStudents(true);

//       const response = await axios.get(
//         "http://localhost:8080/api/students",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudents(response.data || []);
//     } catch (error) {
//       console.error(
//         "Failed to load students:",
//         error.response?.data || error
//       );

//       setStudents([]);
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   // =========================================================
//   // FETCH SUPER ADMINS
//   // =========================================================

//   const fetchSuperAdmins = async () => {
//     try {
//       setLoadingAdmins(true);

//       const response = await axios.get(
//         "http://localhost:8080/api/superadmin/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSuperAdmins(response.data || []);
//     } catch (error) {
//       console.error(
//         "Failed to load super admins:",
//         error.response?.data || error
//       );

//       setSuperAdmins([]);
//     } finally {
//       setLoadingAdmins(false);
//     }
//   };

//   // =========================================================
//   // SCHOOL STUDENTS
//   // =========================================================

//   const schoolStudents = students.filter(
//     (student) =>
//       student.school?.id === Number(id)
//   );

//   // =========================================================
//   // SCHOOL SUPER ADMINS
//   // =========================================================

//   const schoolSuperAdmins = superAdmins.filter(
//     (admin) =>
//       admin.school?.id === Number(id)
//   );

//   const primarySuperAdmin =
//     schoolSuperAdmins[0];

//   // =========================================================
//   // FILTER STUDENTS
//   // =========================================================

//   const filteredStudents =
//     schoolStudents.filter((student) => {
//       const fullName =
//         `${student.firstName || ""} ${
//           student.middleName || ""
//         } ${student.lastName || ""}`.toLowerCase();

//       const searchValue =
//         search.toLowerCase().trim();

//       const matchesSearch =
//         !searchValue ||
//         fullName.includes(searchValue) ||
//         String(student.mobile || "").includes(
//           searchValue
//         ) ||
//         String(
//           student.admissionNumber || ""
//         )
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesClass =
//         !studentClass ||
//         student.studentClass ===
//           studentClass;

//       const matchesStatus =
//         !status ||
//         student.status === status;

//       return (
//         matchesSearch &&
//         matchesClass &&
//         matchesStatus
//       );
//     });

//   // =========================================================
//   // HELPERS
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString(
//       "en-GB",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   const getLogoUrl = (logoUrl) => {
//     if (!logoUrl) {
//       return "/images/default-school.png";
//     }

//     if (logoUrl.startsWith("http")) {
//       return logoUrl;
//     }

//     return `http://localhost:8080${logoUrl}`;
//   };

//   const resetFilters = () => {
//     setSearch("");
//     setStudentClass("");
//     setStatus("");
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loadingSchool) {
//     return (
//       <div className="container-fluid px-2 py-3">
//         <div
//           className="rounded-4 shadow d-flex flex-column justify-content-center align-items-center"
//           style={{
//             minHeight: "400px",
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div
//             className="spinner-border text-primary"
//             role="status"
//           />

//           <div className="mt-3 text-muted">
//             Loading school details...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================================================
//   // MAIN UI
//   // =========================================================

//   return (
//     <div className="container-fluid px-2 py-2">

//       {/* =====================================================
//           HEADER - SAME NEW ADMISSION / SECTION SHUFFLING THEME
//       ====================================================== */}

//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//               {/* LEFT */}

//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <MdOutlineSchool size={29} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     {school?.schoolName ||
//                       "School Details"}
//                   </h5>

//                   <div className="text-muted small">
//                     View &nbsp;/&nbsp; School Details
//                   </div>
//                 </div>

//               </div>

//               {/* RIGHT */}

//               <div className="d-flex align-items-center gap-2 flex-wrap">

//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border:
//                       "1px solid #bfdbfe",
//                   }}
//                 >
//                   <LuBuilding2 className="me-1" />
//                   School
//                 </span>

//                 <button
//                   className="btn btn-outline-primary rounded-3"
//                   onClick={() =>
//                     navigate("/school-list")
//                   }
//                 >
//                   ← Back
//                 </button>

//               </div>
//             </div>
//           </div>

//           {/* BREADCRUMB */}

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor:
//                 "rgba(239,246,255,.75)",
//               borderTop:
//                 "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Organization Management
//               &nbsp;›&nbsp; School List &nbsp;›&nbsp;

//               <span className="text-primary fw-semibold">
//                 {school?.schoolName ||
//                   "School Details"}
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STAT CARDS
//       ====================================================== */}

//       <div className="row g-3 mx-0 mb-3">

//         {/* TOTAL STUDENTS */}

//         <div className="col-12 col-sm-6 col-xl-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#eff6ff)",
//               border:
//                 "1px solid #dbeafe",
//             }}
//           >
//             <div className="card-body">

//               <div className="d-flex justify-content-between align-items-start">

//                 <div>
//                   <small className="text-muted">
//                     Total Students
//                   </small>

//                   <h3 className="fw-bold mt-1 mb-1">
//                     {schoolStudents.length}
//                   </h3>

//                   <span
//                     className="badge rounded-pill"
//                     style={{
//                       background: "#eff6ff",
//                       color: "#2563eb",
//                     }}
//                   >
//                     Enrolled Students
//                   </span>
//                 </div>

//                 <div
//                   className="rounded-3 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     background: "#dbeafe",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaUserGraduate size={24} />
//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* SUPER ADMINS */}

//         <div className="col-12 col-sm-6 col-xl-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#f0fdf4)",
//               border:
//                 "1px solid #dcfce7",
//             }}
//           >
//             <div className="card-body">

//               <div className="d-flex justify-content-between align-items-start">

//                 <div>
//                   <small className="text-muted">
//                     Super Admins
//                   </small>

//                   <h3 className="fw-bold mt-1 mb-1">
//                     {schoolSuperAdmins.length}
//                   </h3>

//                   <span className="badge rounded-pill bg-success-subtle text-success">
//                     School Administrators
//                   </span>
//                 </div>

//                 <div
//                   className="rounded-3 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     background: "#dcfce7",
//                     color: "#16a34a",
//                   }}
//                 >
//                   <FaUserShield size={24} />
//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* PARENTS */}

//         <div className="col-12 col-sm-6 col-xl-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#fff7ed)",
//               border:
//                 "1px solid #fed7aa",
//             }}
//           >
//             <div className="card-body">

//               <div className="d-flex justify-content-between align-items-start">

//                 <div>
//                   <small className="text-muted">
//                     Parents
//                   </small>

//                   <h3 className="fw-bold mt-1 mb-1">
//                     380
//                   </h3>

//                   <span className="badge rounded-pill bg-warning-subtle text-warning">
//                     Parent Accounts
//                   </span>
//                 </div>

//                 <div
//                   className="rounded-3 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     background: "#ffedd5",
//                     color: "#ea580c",
//                   }}
//                 >
//                   <FaUsers size={24} />
//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* STAFF */}

//         <div className="col-12 col-sm-6 col-xl-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#f5f3ff)",
//               border:
//                 "1px solid #ddd6fe",
//             }}
//           >
//             <div className="card-body">

//               <div className="d-flex justify-content-between align-items-start">

//                 <div>
//                   <small className="text-muted">
//                     Staff
//                   </small>

//                   <h3 className="fw-bold mt-1 mb-1">
//                     16
//                   </h3>

//                   <span
//                     className="badge rounded-pill"
//                     style={{
//                       background: "#ede9fe",
//                       color: "#7c3aed",
//                     }}
//                   >
//                     Staff Accounts
//                   </span>
//                 </div>

//                 <div
//                   className="rounded-3 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     background: "#ede9fe",
//                     color: "#7c3aed",
//                   }}
//                 >
//                   <FaUserShield size={24} />
//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//       </div>

//       {/* =====================================================
//           SCHOOL INFORMATION + ADMIN
//       ====================================================== */}

//       <div className="row g-3 mx-0 mb-3">

//         {/* SCHOOL INFORMATION */}

//         <div className="col-12 col-xl-8">

//           <div className="card border-0 shadow rounded-4 h-100">

//             <div
//               className="card-header bg-white border-0 p-3"
//               style={{
//                 borderBottom:
//                   "1px solid #eef2f7",
//               }}
//             >
//               <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

//                 <div className="d-flex align-items-center gap-2">

//                   <span
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       background: "#eff6ff",
//                       color: "#2563eb",
//                     }}
//                   >
//                     <MdOutlineMedicalInformation
//                       size={22}
//                     />
//                   </span>

//                   <div>
//                     <h6 className="mb-0 fw-bold">
//                       School Information
//                     </h6>

//                     <small className="text-muted">
//                       Basic school details
//                     </small>
//                   </div>

//                 </div>

//                 <div className="d-flex gap-2">

//                   <button
//                     className="btn btn-sm btn-outline-primary rounded-3"
//                     onClick={() =>
//                       navigate(
//                         `/school-edit/${school?.id}`
//                       )
//                     }
//                   >
//                     <FaEdit className="me-1" />
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-danger rounded-3"
//                   >
//                     <FaTrash className="me-1" />
//                     Delete
//                   </button>

//                 </div>

//               </div>
//             </div>

//             <div className="card-body p-3">

//               <div className="row g-3">

//                 {/* DETAILS */}

//                 <div className="col-12 col-md-8">

//                   <div className="row g-3">

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           School Name
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {school?.schoolName || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           School Code
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {school?.schoolCode || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           Address
//                         </small>

//                         <div className="fw-semibold mt-1">
//                           <FaMapMarkerAlt
//                             className="text-primary me-2"
//                           />

//                           {school?.addressLine1 ||
//                             school?.address ||
//                             "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           City
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {school?.city || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           State
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {school?.state || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           Phone
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           <FaPhone
//                             className="text-primary me-2"
//                           />
//                           {school?.phoneNumber || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           Email
//                         </small>
//                         <div className="fw-semibold mt-1 text-break">
//                           <FaEnvelope
//                             className="text-primary me-2"
//                           />
//                           {school?.email || "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           Affiliation Board
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {school?.affiliationBoard ||
//                             "-"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-md-6">
//                       <div className="detail-box">
//                         <small className="text-muted">
//                           Created Date
//                         </small>
//                         <div className="fw-semibold mt-1">
//                           {formatDate(
//                             school?.createdAt
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                   </div>

//                 </div>

//                 {/* LOGO */}

//                 <div className="col-12 col-md-4">

//                   <div
//                     className="h-100 rounded-4 d-flex flex-column align-items-center justify-content-center p-3"
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#f8fbff,#eef5ff)",
//                       border:
//                         "1px solid #dbeafe",
//                     }}
//                   >

//                     <img
//                       src={getLogoUrl(
//                         school?.logoUrl
//                       )}
//                       alt="School Logo"
//                       style={{
//                         width: "130px",
//                         height: "130px",
//                         objectFit: "contain",
//                         borderRadius: "16px",
//                         background: "#fff",
//                         padding: "10px",
//                         border:
//                           "1px solid #dbeafe",
//                       }}
//                     />

//                     <div className="fw-semibold mt-3">
//                       School Logo
//                     </div>

//                     <small className="text-muted">
//                       {school?.schoolName}
//                     </small>

//                   </div>

//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* SUPER ADMIN CARD */}

//         <div className="col-12 col-xl-4">

//           <div className="card border-0 shadow rounded-4 h-100 overflow-hidden">

//             <div
//               className="p-3"
//               style={{
//                 background:
//                   "linear-gradient(135deg,#eff6ff,#dbeafe)",
//                 borderBottom:
//                   "1px solid #bfdbfe",
//               }}
//             >

//               <div className="d-flex justify-content-between align-items-center">

//                 <div>
//                   <h6 className="fw-bold mb-1">
//                     School Administrator
//                   </h6>

//                   <small className="text-muted">
//                     Primary Super Admin
//                   </small>
//                 </div>

//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     background: "#ffffff",
//                     color: "#2563eb",
//                     border:
//                       "1px solid #bfdbfe",
//                   }}
//                 >
//                   Admin
//                 </span>

//               </div>

//             </div>

//             <div className="card-body">

//               {primarySuperAdmin ? (
//                 <>
//                   <div className="d-flex align-items-center mb-3">

//                     <div
//                       className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                       style={{
//                         width: "58px",
//                         height: "58px",
//                         background: "#eff6ff",
//                         color: "#2563eb",
//                       }}
//                     >
//                       <FaUserShield size={25} />
//                     </div>

//                     <div>
//                       <h6 className="mb-1 fw-bold">
//                         {primarySuperAdmin.fullName ||
//                           "-"}
//                       </h6>

//                       <span className="badge bg-success">
//                         {primarySuperAdmin.status ||
//                           "ACTIVE"}
//                       </span>
//                     </div>

//                   </div>

//                   <div className="border-top pt-3">

//                     <div className="d-flex align-items-center mb-3">
//                       <FaEnvelope
//                         className="text-primary me-3"
//                       />

//                       <div>
//                         <small className="text-muted d-block">
//                           Email
//                         </small>

//                         <span className="fw-semibold text-break">
//                           {primarySuperAdmin.email ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="d-flex align-items-center">
//                       <FaPhone
//                         className="text-primary me-3"
//                       />

//                       <div>
//                         <small className="text-muted d-block">
//                           Phone
//                         </small>

//                         <span className="fw-semibold">
//                           {primarySuperAdmin.phone ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>

//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-4">

//                   <FaUserShield
//                     size={40}
//                     className="text-muted mb-2"
//                   />

//                   <div className="fw-semibold">
//                     No Super Admin
//                   </div>

//                   <small className="text-muted">
//                     No administrator has been
//                     assigned to this school.
//                   </small>

//                 </div>
//               )}

//             </div>

//             <div className="card-footer bg-white border-0 p-3">

//               <button
//                 className="btn btn-primary w-100 rounded-3"
//               >
//                 <FaPlus className="me-2" />
//                 Add User
//               </button>

//             </div>

//           </div>
//         </div>

//       </div>

//       {/* =====================================================
//           SUPER ADMIN TABLE
//       ====================================================== */}

//       <div className="card border-0 shadow rounded-4 mb-3">

//         <div className="card-header bg-white border-0 p-3">

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

//             <div>
//               <h6 className="mb-1 fw-bold">
//                 Super Administrators
//               </h6>

//               <small className="text-muted">
//                 {schoolSuperAdmins.length} administrator
//                 {schoolSuperAdmins.length !== 1
//                   ? "s"
//                   : ""}
//               </small>
//             </div>

//             <button
//               className="btn btn-primary btn-sm rounded-3"
//             >
//               <FaPlus className="me-1" />
//               Add Super Admin
//             </button>

//           </div>

//         </div>

//         <div className="table-responsive">

//           <table className="table table-hover align-middle mb-0">

//             <thead
//               style={{
//                 background: "#eff6ff",
//                 color: "#1e3a8a",
//               }}
//             >
//               <tr>
//                 <th className="px-3">#</th>
//                 <th>Id</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Status</th>
//                 <th>Role</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>

//             <tbody>

//               {loadingAdmins ? (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="text-center py-4"
//                   >
//                     <div className="spinner-border spinner-border-sm text-primary me-2" />
//                     Loading administrators...
//                   </td>
//                 </tr>
//               ) : schoolSuperAdmins.length > 0 ? (
//                 schoolSuperAdmins.map(
//                   (admin, index) => (
//                     <tr key={admin.id}>

//                       <td className="px-3">
//                         {index + 1}
//                       </td>

//                       <td>{admin.id}</td>

//                       <td className="fw-semibold">
//                         {admin.fullName || "-"}
//                       </td>

//                       <td>
//                         {admin.email || "-"}
//                       </td>

//                       <td>
//                         {admin.phone || "-"}
//                       </td>

//                       <td>
//                         <span
//                           className={`badge rounded-pill ${
//                             admin.status ===
//                               "ACTIVE"
//                               ? "bg-success"
//                               : "bg-danger"
//                           }`}
//                         >
//                           {admin.status || "-"}
//                         </span>
//                       </td>

//                       <td>
//                         <span
//                           className="badge rounded-pill"
//                           style={{
//                             background: "#eff6ff",
//                             color: "#2563eb",
//                           }}
//                         >
//                           {admin.role || "SUPER_ADMIN"}
//                         </span>
//                       </td>

//                       <td>
//                         {formatDate(
//                           admin.createdAt
//                         )}
//                       </td>

//                     </tr>
//                   )
//                 )
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="text-center py-5 text-muted"
//                   >
//                     <FaUserShield
//                       size={32}
//                       className="mb-2"
//                     />

//                     <div>
//                       No SuperAdmins Created Yet
//                     </div>
//                   </td>
//                 </tr>
//               )}

//             </tbody>

//           </table>

//         </div>
//       </div>

//       {/* =====================================================
//           STUDENT FILTER
//       ====================================================== */}

//       <div className="card border-0 shadow rounded-4 mb-3">

//         <div className="card-body p-3">

//           <div className="row g-2 align-items-center">

//             {/* SEARCH */}

//             <div className="col-12 col-md-4">

//               <div className="input-group">

//                 <span className="input-group-text bg-white">
//                   <FaSearch className="text-muted" />
//                 </span>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search Name / Admission No / Mobile"
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                 />

//               </div>

//             </div>

//             {/* CLASS */}

//             <div className="col-12 col-sm-6 col-md-3">

//               <select
//                 className="form-select"
//                 value={studentClass}
//                 onChange={(e) =>
//                   setStudentClass(
//                     e.target.value
//                   )
//                 }
//               >
//                 <option value="">
//                   All Classes
//                 </option>

//                 <option value="NURSERY">
//                   Nursery
//                 </option>

//                 <option value="LKG">
//                   LKG
//                 </option>

//                 <option value="UKG">
//                   UKG
//                 </option>

//                 <option value="I">I</option>
//                 <option value="II">II</option>
//                 <option value="III">III</option>
//                 <option value="IV">IV</option>
//                 <option value="V">V</option>
//                 <option value="VI">VI</option>
//                 <option value="VII">VII</option>
//                 <option value="VIII">VIII</option>
//                 <option value="IX">IX</option>
//                 <option value="X">X</option>
//                 <option value="XI">XI</option>
//                 <option value="XII">XII</option>

//               </select>

//             </div>

//             {/* STATUS */}

//             <div className="col-12 col-sm-6 col-md-3">

//               <select
//                 className="form-select"
//                 value={status}
//                 onChange={(e) =>
//                   setStatus(e.target.value)
//                 }
//               >
//                 <option value="">
//                   All Status
//                 </option>

//                 <option value="ACTIVE">
//                   ACTIVE
//                 </option>

//                 <option value="INACTIVE">
//                   INACTIVE
//                 </option>
//               </select>

//             </div>

//             {/* RESET */}

//             <div className="col-12 col-md-2">

//               <button
//                 className="btn btn-outline-secondary w-100 rounded-3"
//                 onClick={resetFilters}
//               >
//                 Reset
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           STUDENT TABLE
//       ====================================================== */}

//       <div className="card border-0 shadow rounded-4 mb-4">

//         <div className="card-header bg-white border-0 p-3">

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

//             <div>

//               <h6 className="mb-1 fw-bold">
//                 Students
//               </h6>

//               <small className="text-muted">
//                 Showing {filteredStudents.length} of{" "}
//                 {schoolStudents.length} students
//               </small>

//             </div>

//             <span
//               className="badge rounded-pill px-3 py-2"
//               style={{
//                 background: "#eff6ff",
//                 color: "#2563eb",
//                 border:
//                   "1px solid #bfdbfe",
//               }}
//             >
//               <FaUsers className="me-1" />
//               {filteredStudents.length}
//             </span>

//           </div>

//         </div>

//         <div className="table-responsive">

//           <table className="table table-hover align-middle mb-0">

//             <thead
//               style={{
//                 background: "#eff6ff",
//                 color: "#1e3a8a",
//               }}
//             >
//               <tr>
//                 <th className="px-3">#</th>
//                 <th>Admission No</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Academic Year</th>
//                 <th>Email</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>

//               {loadingStudents ? (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="text-center py-5"
//                   >
//                     <div className="spinner-border text-primary" />

//                     <div className="mt-2 text-muted">
//                       Loading students...
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredStudents.length > 0 ? (
//                 filteredStudents.map(
//                   (student, index) => (
//                     <tr key={student.id}>

//                       <td className="px-3">
//                         {index + 1}
//                       </td>

//                       <td>
//                         <span
//                           className="badge rounded-pill"
//                           style={{
//                             background: "#f8fafc",
//                             color: "#334155",
//                             border:
//                               "1px solid #e2e8f0",
//                           }}
//                         >
//                           {student.admissionNumber ||
//                             "-"}
//                         </span>
//                       </td>

//                       <td className="fw-semibold">
//                         {student.firstName || ""}{" "}
//                         {student.middleName || ""}{" "}
//                         {student.lastName || ""}
//                       </td>

//                       <td>
//                         {student.studentClass ||
//                           "-"}
//                       </td>

//                       <td>
//                         {student.academicYear ||
//                           "-"}
//                       </td>

//                       <td>
//                         {student.email || "-"}
//                       </td>

//                       <td>
//                         <span
//                           className={`badge rounded-pill ${
//                             student.status ===
//                               "ACTIVE"
//                               ? "bg-success"
//                               : "bg-danger"
//                           }`}
//                         >
//                           {student.status || "-"}
//                         </span>
//                       </td>

//                     </tr>
//                   )
//                 )
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="text-center py-5 text-muted"
//                   >
//                     <FaUserGraduate
//                       size={35}
//                       className="mb-2"
//                     />

//                     <div>
//                       No students found
//                     </div>
//                   </td>
//                 </tr>
//               )}

//             </tbody>

//           </table>

//         </div>
//       </div>

//       {/* =====================================================
//           CUSTOM CSS
//       ====================================================== */}

//       <style>{`

//         .detail-box {
//           background: #f8fafc;
//           border: 1px solid #eef2f7;
//           border-radius: 12px;
//           padding: 12px 14px;
//           height: 100%;
//           transition: all .2s ease;
//         }

//         .detail-box:hover {
//           border-color: #bfdbfe;
//           background: #f8fbff;
//         }

//         .table > :not(caption) > * > * {
//           padding-top: 12px;
//           padding-bottom: 12px;
//           border-bottom-color: #eef2f7;
//         }

//         .table thead th {
//           white-space: nowrap;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .table tbody td {
//           font-size: 13px;
//         }

//         .form-control,
//         .form-select {
//           border-radius: 10px;
//           border-color: #dbe3ee;
//         }

//         .form-control:focus,
//         .form-select:focus {
//           border-color: #93c5fd;
//           box-shadow: 0 0 0 .2rem rgba(37,99,235,.10);
//         }

//         .btn {
//           transition: all .2s ease;
//         }

//         .card {
//           overflow: hidden;
//         }

//         @media (max-width: 767.98px) {

//           .table-responsive {
//             font-size: 12px;
//           }

//           .detail-box {
//             padding: 10px;
//           }

//         }

//       `}</style>

//     </div>
//   );
// };

// export default SchoolDetailsView;



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaSchool,
  FaEdit,
  FaTrash,
  FaUsers,
  FaUserShield,
  FaSearch,
  FaPlus,
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaIdCard,
  FaGlobe,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import {
  MdOutlineSchool,
  MdOutlineMedicalInformation,
} from "react-icons/md";

import {
  LuBuilding2,
  LuGraduationCap,
  LuShieldCheck,
} from "react-icons/lu";

const SchoolDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token =
    localStorage.getItem("AdminToken") ||
    localStorage.getItem("token");

  const [school, setSchool] = useState(null);
  const [students, setStudents] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);

  const [search, setSearch] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [status, setStatus] = useState("");

  const [loadingSchool, setLoadingSchool] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  // =========================================================
  // FETCH DATA
  // =========================================================

  useEffect(() => {
    if (!id) return;

    fetchSchoolById();
    fetchStudents();
    fetchSuperAdmins();
  }, [id]);

  // =========================================================
  // FETCH SCHOOL
  // =========================================================

  const fetchSchoolById = async () => {
    try {
      setLoadingSchool(true);

      const response = await axios.get(
        `http://localhost:8080/api/school/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchool(response.data);
    } catch (error) {
      console.error(
        "Failed to load school details:",
        error.response?.data || error
      );
      setSchool(null);
    } finally {
      setLoadingSchool(false);
    }
  };

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);

      const response = await axios.get(
        "http://localhost:8080/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load students:",
        error.response?.data || error
      );

      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  // =========================================================
  // FETCH SUPER ADMINS
  // =========================================================

  const fetchSuperAdmins = async () => {
    try {
      setLoadingAdmins(true);

      const response = await axios.get(
        "http://localhost:8080/api/superadmin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuperAdmins(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load super admins:",
        error.response?.data || error
      );

      setSuperAdmins([]);
    } finally {
      setLoadingAdmins(false);
    }
  };

  // =========================================================
  // SCHOOL STUDENTS
  // =========================================================

  const schoolStudents = useMemo(() => {
    return students.filter(
      (student) =>
        Number(student.school?.id) === Number(id) ||
        Number(student.schoolId) === Number(id)
    );
  }, [students, id]);

  // =========================================================
  // SCHOOL SUPER ADMINS
  // =========================================================

  const schoolSuperAdmins = useMemo(() => {
    return superAdmins.filter(
      (admin) =>
        Number(admin.school?.id) === Number(id) ||
        Number(admin.schoolId) === Number(id)
    );
  }, [superAdmins, id]);

  const primarySuperAdmin = schoolSuperAdmins[0];

  // =========================================================
  // FILTER STUDENTS
  // =========================================================

  const filteredStudents = useMemo(() => {
    return schoolStudents.filter((student) => {
      const fullName =
        `${student.firstName || ""} ${
          student.middleName || ""
        } ${student.lastName || ""}`.toLowerCase();

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        String(student.mobile || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(student.phone || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(student.admissionNumber || "")
          .toLowerCase()
          .includes(searchValue);

      const matchesClass =
        !studentClass ||
        student.studentClass === studentClass;

      const matchesStatus =
        !status ||
        student.status === status;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    schoolStudents,
    search,
    studentClass,
    status,
  ]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) {
      return "/images/default-school.png";
    }

    if (logoUrl.startsWith("http")) {
      return logoUrl;
    }

    return `http://localhost:8080${logoUrl}`;
  };

  const getStudentName = (student) => {
    return [
      student.firstName,
      student.middleName,
      student.lastName,
    ]
      .filter(Boolean)
      .join(" ") || "-";
  };

  const resetFilters = () => {
    setSearch("");
    setStudentClass("");
    setStatus("");
  };

  const handleDeleteSchool = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        school?.schoolName || "this school"
      }?`
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/school/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/school-list");
    } catch (error) {
      console.error(
        "Failed to delete school:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete school."
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loadingSchool) {
    return (
      <div className="school-details-page">
        <div className="page-loader">
          <div className="spinner-border text-primary" />
          <div className="mt-3 text-muted">
            Loading school details...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // SCHOOL NOT FOUND
  // =========================================================

  if (!school) {
    return (
      <div className="school-details-page">
        <div className="empty-page">
          <div className="empty-icon">
            <FaSchool />
          </div>

          <h5 className="fw-bold mb-1">
            School Not Found
          </h5>

          <p className="text-muted mb-3">
            The requested school details could not be
            loaded.
          </p>

          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/school-list")}
          >
            <FaArrowLeft className="me-2" />
            Back to School List
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="school-details-page">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-header">

        <div className="page-header-left">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/school-list")}
            title="Back"
          >
            <FaArrowLeft size={15} />
          </button>

          <div className="page-title-icon">
            <MdOutlineSchool size={25} />
          </div>

          <div>
            <h5 className="page-title mb-1">
              {school.schoolName || "School Details"}
            </h5>

            <div className="page-subtitle">
              Organization Management / School Details
            </div>
          </div>

        </div>

        <div className="page-header-actions">

          <span className="status-badge active">
            <span className="status-dot" />
            {school.status || "ACTIVE"}
          </span>

          <button
            type="button"
            className="btn btn-outline-primary page-action-btn"
            onClick={() =>
              navigate(`/school-edit/${school.id}`)
            }
          >
            <FaEdit className="me-2" />
            Edit School
          </button>

        </div>

      </div>

      {/* =====================================================
          SCHOOL OVERVIEW
      ====================================================== */}

      <div className="overview-card">

        <div className="school-overview-left">

          <div className="school-logo-wrapper">
            <img
              src={getLogoUrl(school.logoUrl)}
              alt="School Logo"
              className="school-logo"
              onError={(e) => {
                e.currentTarget.src =
                  "/images/default-school.png";
              }}
            />
          </div>

          <div className="school-overview-info">

            <div className="school-name-row">
              <h4>
                {school.schoolName || "-"}
              </h4>

              <span className="soft-badge blue">
                <LuBuilding2 size={14} />
                School
              </span>
            </div>

            <div className="school-code">
              <FaIdCard />
              School Code:
              <strong>
                {school.schoolCode || "-"}
              </strong>
            </div>

            <div className="school-location">
              <FaMapMarkerAlt />
              {[
                school.addressLine1 ||
                  school.address,
                school.city,
                school.state,
              ]
                .filter(Boolean)
                .join(", ") || "Address not available"}
            </div>

          </div>

        </div>

        <div className="overview-divider" />

        <div className="overview-meta">

          <div className="meta-item">
            <span className="meta-label">
              Created On
            </span>
            <span className="meta-value">
              <FaCalendarAlt />
              {formatDate(school.createdAt)}
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label">
              Affiliation
            </span>
            <span className="meta-value">
              <FaSchool />
              {school.affiliationBoard || "-"}
            </span>
          </div>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="stats-grid">

        {/* STUDENTS */}

        <div className="stat-card">

          <div className="stat-icon blue">
            <LuGraduationCap size={23} />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Total Students
            </span>

            <h4>
              {schoolStudents.length}
            </h4>

            <span className="stat-description">
              Enrolled students
            </span>
          </div>

        </div>

        {/* ADMINS */}

        <div className="stat-card">

          <div className="stat-icon green">
            <LuShieldCheck size={23} />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Super Admins
            </span>

            <h4>
              {schoolSuperAdmins.length}
            </h4>

            <span className="stat-description">
              School administrators
            </span>
          </div>

        </div>

        {/* PARENTS */}

        <div className="stat-card">

          <div className="stat-icon orange">
            <FaUsers size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Parent Accounts
            </span>

            <h4>
              —
            </h4>

            <span className="stat-description">
              Data not available
            </span>
          </div>

        </div>

        {/* STAFF */}

        <div className="stat-card">

          <div className="stat-icon purple">
            <FaUserShield size={21} />
          </div>

          <div className="stat-content">
            <span className="stat-label">
              Staff Accounts
            </span>

            <h4>
              —
            </h4>

            <span className="stat-description">
              Data not available
            </span>
          </div>

        </div>

      </div>

      {/* =====================================================
          INFORMATION + ADMIN
      ====================================================== */}

      <div className="content-grid">

        {/* ===================================================
            SCHOOL INFORMATION
        ==================================================== */}

        <div className="section-card">

          <div className="section-card-header">

            <div className="section-title-wrapper">

              <div className="section-icon blue">
                <MdOutlineMedicalInformation
                  size={21}
                />
              </div>

              <div>
                <h6>
                  School Information
                </h6>

                <span>
                  Basic information about this school
                </span>
              </div>

            </div>

            <button
              type="button"
              className="btn btn-sm btn-light-primary"
              onClick={() =>
                navigate(`/school-edit/${school.id}`)
              }
            >
              <FaEdit className="me-1" />
              Edit
            </button>

          </div>

          <div className="section-card-body">

            <div className="details-grid">

              {/* SCHOOL NAME */}

              <div className="info-field">
                <span className="info-label">
                  School Name
                </span>

                <span className="info-value">
                  {school.schoolName || "-"}
                </span>
              </div>

              {/* SCHOOL CODE */}

              <div className="info-field">
                <span className="info-label">
                  School Code
                </span>

                <span className="info-value">
                  {school.schoolCode || "-"}
                </span>
              </div>

              {/* SCHOOL TYPE */}

              <div className="info-field">
                <span className="info-label">
                  School Type
                </span>

                <span className="info-value">
                  {school.schoolType || "-"}
                </span>
              </div>

              {/* SCHOOL CATEGORY */}

              <div className="info-field">
                <span className="info-label">
                  School Category
                </span>

                <span className="info-value">
                  {school.schoolCategory || "-"}
                </span>
              </div>

              {/* BOARD */}

              <div className="info-field">
                <span className="info-label">
                  Affiliation Board
                </span>

                <span className="info-value">
                  {school.affiliationBoard || "-"}
                </span>
              </div>

              {/* PHONE */}

              <div className="info-field">
                <span className="info-label">
                  Phone Number
                </span>

                <span className="info-value">
                  {school.phoneNumber ||
                    school.phone ||
                    "-"}
                </span>
              </div>

              {/* EMAIL */}

              <div className="info-field">
                <span className="info-label">
                  Email
                </span>

                <span className="info-value text-break">
                  {school.email || "-"}
                </span>
              </div>

              {/* WEBSITE */}

              <div className="info-field">
                <span className="info-label">
                  Website
                </span>

                <span className="info-value text-break">
                  {school.website || "-"}
                </span>
              </div>

              {/* COUNTRY */}

              <div className="info-field">
                <span className="info-label">
                  Country
                </span>

                <span className="info-value">
                  {school.country || "-"}
                </span>
              </div>

              {/* STATE */}

              <div className="info-field">
                <span className="info-label">
                  State
                </span>

                <span className="info-value">
                  {school.state || "-"}
                </span>
              </div>

              {/* CITY */}

              <div className="info-field">
                <span className="info-label">
                  City
                </span>

                <span className="info-value">
                  {school.city || "-"}
                </span>
              </div>

              {/* PINCODE */}

              <div className="info-field">
                <span className="info-label">
                  PIN Code
                </span>

                <span className="info-value">
                  {school.pinCode ||
                    school.pincode ||
                    school.postalCode ||
                    "-"}
                </span>
              </div>

              {/* ADDRESS */}

              <div className="info-field full">
                <span className="info-label">
                  Address
                </span>

                <span className="info-value address-value">
                  <FaMapMarkerAlt />
                  {[
                    school.addressLine1 ||
                      school.address,
                    school.addressLine2,
                    school.city,
                    school.state,
                    school.pinCode ||
                      school.pincode ||
                      school.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </span>
              </div>

              {/* CREATED */}

              <div className="info-field">
                <span className="info-label">
                  Created Date
                </span>

                <span className="info-value">
                  {formatDate(school.createdAt)}
                </span>
              </div>

              {/* UPDATED */}

              <div className="info-field">
                <span className="info-label">
                  Last Updated
                </span>

                <span className="info-value">
                  {formatDate(school.updatedAt)}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            SCHOOL ADMINISTRATOR
        ==================================================== */}

        <div className="section-card admin-card">

          <div className="section-card-header">

            <div className="section-title-wrapper">

              <div className="section-icon green">
                <FaUserShield size={20} />
              </div>

              <div>
                <h6>
                  School Administrator
                </h6>

                <span>
                  Primary administrator
                </span>
              </div>

            </div>

            <span className="soft-badge green">
              Administrator
            </span>

          </div>

          <div className="section-card-body">

            {loadingAdmins ? (
              <div className="admin-loading">
                <div className="spinner-border spinner-border-sm text-primary" />
                <span>
                  Loading administrator...
                </span>
              </div>
            ) : primarySuperAdmin ? (
              <>

                <div className="admin-profile">

                  <div className="admin-avatar">
                    <FaUserShield size={25} />
                  </div>

                  <div className="admin-profile-info">

                    <h6>
                      {primarySuperAdmin.fullName ||
                        [
                          primarySuperAdmin.firstName,
                          primarySuperAdmin.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ") ||
                        "-"}
                    </h6>

                    <span className="status-badge active small">
                      <span className="status-dot" />
                      {primarySuperAdmin.status ||
                        "ACTIVE"}
                    </span>

                  </div>

                </div>

                <div className="admin-info-list">

                  <div className="admin-info-item">

                    <div className="admin-info-icon">
                      <FaEnvelope />
                    </div>

                    <div>
                      <span>
                        Email
                      </span>

                      <strong className="text-break">
                        {primarySuperAdmin.email ||
                          "-"}
                      </strong>
                    </div>

                  </div>

                  <div className="admin-info-item">

                    <div className="admin-info-icon">
                      <FaPhone />
                    </div>

                    <div>
                      <span>
                        Phone
                      </span>

                      <strong>
                        {primarySuperAdmin.phone ||
                          primarySuperAdmin.phoneNumber ||
                          "-"}
                      </strong>
                    </div>

                  </div>

                  <div className="admin-info-item">

                    <div className="admin-info-icon">
                      <FaIdCard />
                    </div>

                    <div>
                      <span>
                        Admin ID
                      </span>

                      <strong>
                        {primarySuperAdmin.id ||
                          "-"}
                      </strong>
                    </div>

                  </div>

                </div>

              </>
            ) : (
              <div className="admin-empty">

                <div className="admin-empty-icon">
                  <FaUserShield size={25} />
                </div>

                <h6>
                  No Super Admin
                </h6>

                <p>
                  No administrator has been assigned
                  to this school yet.
                </p>

                <button
                  type="button"
                  className="btn btn-primary btn-sm px-3"
                >
                  <FaPlus className="me-1" />
                  Add Administrator
                </button>

              </div>
            )}

          </div>

          {primarySuperAdmin && (
            <div className="section-card-footer">

              <button
                type="button"
                className="btn btn-light-primary w-100"
              >
                <FaPlus className="me-2" />
                Add Another Administrator
              </button>

            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          SUPER ADMIN LIST
      ====================================================== */}

      <div className="section-card mb-3">

        <div className="section-card-header">

          <div className="section-title-wrapper">

            <div className="section-icon green">
              <FaUserShield size={20} />
            </div>

            <div>
              <h6>
                Super Administrators
              </h6>

              <span>
                Administrators assigned to this school
              </span>
            </div>

          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
          >
            <FaPlus className="me-1" />
            Add Super Admin
          </button>

        </div>

        <div className="table-responsive">

          <table className="table custom-table align-middle mb-0">

            <thead>
              <tr>
                <th>#</th>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>

              {loadingAdmins ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-5"
                  >
                    <div className="spinner-border spinner-border-sm text-primary me-2" />
                    <span className="text-muted">
                      Loading administrators...
                    </span>
                  </td>
                </tr>
              ) : schoolSuperAdmins.length > 0 ? (
                schoolSuperAdmins.map(
                  (admin, index) => (
                    <tr key={admin.id || index}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <span className="id-badge">
                          {admin.id || "-"}
                        </span>
                      </td>

                      <td>
                        <div className="table-user">

                          <div className="table-avatar">
                            <FaUserShield />
                          </div>

                          <span>
                            {admin.fullName ||
                              [
                                admin.firstName,
                                admin.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") ||
                              "-"}
                          </span>

                        </div>
                      </td>

                      <td>
                        {admin.email || "-"}
                      </td>

                      <td>
                        {admin.phone ||
                          admin.phoneNumber ||
                          "-"}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            admin.status ===
                            "ACTIVE"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot" />
                          {admin.status || "-"}
                        </span>

                      </td>

                      <td>

                        <span className="role-badge">
                          {admin.role ||
                            "SUPER_ADMIN"}
                        </span>

                      </td>

                      <td>
                        {formatDate(
                          admin.createdAt
                        )}
                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="8"
                    className="empty-table"
                  >

                    <div className="table-empty-icon">
                      <FaUserShield />
                    </div>

                    <div className="fw-semibold">
                      No Super Administrators
                    </div>

                    <small>
                      No administrators have been
                      created for this school.
                    </small>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          STUDENT SECTION
      ====================================================== */}

      <div className="section-card">

        <div className="section-card-header">

          <div className="section-title-wrapper">

            <div className="section-icon blue">
              <FaUserGraduate size={20} />
            </div>

            <div>
              <h6>
                Students
              </h6>

              <span>
                Students enrolled in this school
              </span>
            </div>

          </div>

          <div className="student-count-badge">
            <FaUsers />
            {filteredStudents.length}
          </div>

        </div>

        {/* =================================================
            FILTERS
        ================================================== */}

        <div className="filter-area">

          <div className="filter-grid">

            {/* SEARCH */}

            <div className="search-wrapper">

              <FaSearch className="search-icon" />

              <input
                type="text"
                className="form-control custom-input search-input"
                placeholder="Search name, admission no. or mobile..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* CLASS */}

            <select
              className="form-select custom-input"
              value={studentClass}
              onChange={(e) =>
                setStudentClass(e.target.value)
              }
            >
              <option value="">
                All Classes
              </option>

              <option value="NURSERY">
                Nursery
              </option>

              <option value="LKG">
                LKG
              </option>

              <option value="UKG">
                UKG
              </option>

              <option value="I">Class I</option>
              <option value="II">Class II</option>
              <option value="III">Class III</option>
              <option value="IV">Class IV</option>
              <option value="V">Class V</option>
              <option value="VI">Class VI</option>
              <option value="VII">Class VII</option>
              <option value="VIII">Class VIII</option>
              <option value="IX">Class IX</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>

            {/* STATUS */}

            <select
              className="form-select custom-input"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>

            {/* RESET */}

            <button
              type="button"
              className="btn btn-light-secondary reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

        </div>

        {/* =================================================
            STUDENT TABLE
        ================================================== */}

        <div className="table-responsive">

          <table className="table custom-table align-middle mb-0">

            <thead>
              <tr>
                <th>#</th>
                <th>Admission No.</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Academic Year</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {loadingStudents ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5"
                  >

                    <div className="spinner-border spinner-border-sm text-primary me-2" />

                    <span className="text-muted">
                      Loading students...
                    </span>

                  </td>

                </tr>

              ) : filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student, index) => (

                    <tr key={student.id || index}>

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <span className="admission-badge">
                          {student.admissionNumber ||
                            "-"}
                        </span>

                      </td>

                      <td>

                        <div className="table-user">

                          <div className="student-avatar">
                            <FaUserGraduate />
                          </div>

                          <span className="fw-semibold">
                            {getStudentName(student)}
                          </span>

                        </div>

                      </td>

                      <td>
                        {student.studentClass ||
                          "-"}
                      </td>

                      <td>
                        {student.section || "-"}
                      </td>

                      <td>
                        {student.academicYear ||
                          "-"}
                      </td>

                      <td className="text-break">
                        {student.email || "-"}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            student.status ===
                            "ACTIVE"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot" />
                          {student.status || "-"}
                        </span>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-table"
                  >

                    <div className="table-empty-icon">
                      <FaUserGraduate />
                    </div>

                    <div className="fw-semibold">
                      No Students Found
                    </div>

                    <small>
                      Try changing your search or
                      filters.
                    </small>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            TABLE FOOTER
        ================================================== */}

        {!loadingStudents &&
          filteredStudents.length > 0 && (
            <div className="table-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredStudents.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {schoolStudents.length}
                </strong>{" "}
                students
              </span>

              {(search ||
                studentClass ||
                status) && (
                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
              )}

            </div>
          )}

      </div>

      {/* =====================================================
          DANGER / DELETE AREA
      ====================================================== */}

      <div className="danger-section">

        <div>

          <div className="danger-title">
            <FaTrash />
            Delete School
          </div>

          <div className="danger-description">
            Deleting a school may permanently remove
            associated data. Please proceed carefully.
          </div>

        </div>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDeleteSchool}
        >
          <FaTrash className="me-2" />
          Delete School
        </button>

      </div>

      {/* =====================================================
          CUSTOM CSS
      ====================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .school-details-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 16px;
          color: #1e293b;
        }

        /* ===================================================
           PAGE HEADER
        =================================================== */

        .page-header {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .page-header-left {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .back-button {
          width: 34px;
          height: 34px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease;
          flex-shrink: 0;
        }

        .back-button:hover {
          background: #f8fafc;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .page-title-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .page-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 12px;
        }

        .page-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .page-action-btn {
          height: 36px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
        }

        /* ===================================================
           STATUS
        =================================================== */

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-badge.small {
          padding: 4px 8px;
          font-size: 10px;
        }

        .status-badge.active {
          color: #15803d;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }

        .status-badge.inactive {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* ===================================================
           OVERVIEW
        =================================================== */

        .overview-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .school-overview-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .school-logo-wrapper {
          width: 74px;
          height: 74px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px;
          flex-shrink: 0;
        }

        .school-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .school-overview-info {
          min-width: 0;
        }

        .school-name-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 7px;
        }

        .school-name-row h4 {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          color: #0f172a;
        }

        .soft-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 600;
        }

        .soft-badge.blue {
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #dbeafe;
        }

        .soft-badge.green {
          color: #15803d;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
        }

        .school-code {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .school-code svg {
          color: #2563eb;
          font-size: 11px;
        }

        .school-code strong {
          color: #334155;
          font-weight: 600;
        }

        .school-location {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }

        .school-location svg {
          color: #2563eb;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .overview-divider {
          width: 1px;
          align-self: stretch;
          background: #e2e8f0;
        }

        .overview-meta {
          min-width: 190px;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 500;
        }

        .meta-value {
          color: #334155;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .meta-value svg {
          color: #2563eb;
          font-size: 11px;
        }

        /* ===================================================
           STAT CARDS
        =================================================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 11px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon.blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .stat-icon.green {
          background: #f0fdf4;
          color: #16a34a;
        }

        .stat-icon.orange {
          background: #fff7ed;
          color: #ea580c;
        }

        .stat-icon.purple {
          background: #f5f3ff;
          color: #7c3aed;
        }

        .stat-content {
          min-width: 0;
        }

        .stat-label {
          display: block;
          font-size: 11px;
          color: #64748b;
          margin-bottom: 2px;
        }

        .stat-content h4 {
          margin: 0;
          font-size: 21px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.25;
        }

        .stat-description {
          display: block;
          font-size: 10px;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* ===================================================
           CONTENT GRID
        =================================================== */

        .content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(300px, .8fr);
          gap: 14px;
          margin-bottom: 14px;
          align-items: stretch;
        }

        .section-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .section-card-header {
          min-height: 66px;
          padding: 12px 15px;
          border-bottom: 1px solid #eef2f7;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .section-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-icon.blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .section-icon.green {
          background: #f0fdf4;
          color: #16a34a;
        }

        .section-title-wrapper h6 {
          margin: 0 0 2px;
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
        }

        .section-title-wrapper span {
          font-size: 10px;
          color: #94a3b8;
        }

        .section-card-body {
          padding: 14px;
        }

        .section-card-footer {
          padding: 0 14px 14px;
        }

        /* ===================================================
           DETAILS
        =================================================== */

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        .info-field {
          background: #f8fafc;
          border: 1px solid #eef2f7;
          border-radius: 8px;
          padding: 9px 11px;
          min-width: 0;
        }

        .info-field.full {
          grid-column: 1 / -1;
        }

        .info-label {
          display: block;
          font-size: 10px;
          color: #94a3b8;
          margin-bottom: 3px;
          font-weight: 500;
        }

        .info-value {
          display: block;
          color: #334155;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.5;
        }

        .address-value {
          display: flex;
          align-items: flex-start;
          gap: 7px;
        }

        .address-value svg {
          color: #2563eb;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .info-field:hover {
          border-color: #dbeafe;
          background: #fafdff;
        }

        /* ===================================================
           BUTTONS
        =================================================== */

        .btn {
          transition: all .18s ease;
        }

        .btn-light-primary {
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          font-weight: 600;
        }

        .btn-light-primary:hover {
          color: #1d4ed8;
          background: #dbeafe;
          border-color: #bfdbfe;
        }

        .btn-light-secondary {
          color: #475569;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          font-weight: 500;
        }

        .btn-light-secondary:hover {
          color: #1e293b;
          background: #f1f5f9;
        }

        /* ===================================================
           ADMIN
        =================================================== */

        .admin-card {
          display: flex;
          flex-direction: column;
        }

        .admin-card .section-card-body {
          flex: 1;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 11px;
          padding-bottom: 14px;
          border-bottom: 1px solid #eef2f7;
        }

        .admin-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-profile-info h6 {
          margin: 0 0 6px;
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
        }

        .admin-info-list {
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .admin-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-info-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f8fafc;
          color: #2563eb;
          border: 1px solid #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
        }

        .admin-info-item div:last-child {
          min-width: 0;
        }

        .admin-info-item span {
          display: block;
          color: #94a3b8;
          font-size: 10px;
          margin-bottom: 2px;
        }

        .admin-info-item strong {
          display: block;
          color: #334155;
          font-size: 11px;
          font-weight: 600;
        }

        .admin-loading {
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #64748b;
          font-size: 12px;
        }

        .admin-empty {
          min-height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .admin-empty-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f8fafc;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 9px;
        }

        .admin-empty h6 {
          font-size: 13px;
          margin: 0 0 4px;
        }

        .admin-empty p {
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.5;
          max-width: 230px;
          margin: 0 0 12px;
        }

        /* ===================================================
           TABLE
        =================================================== */

        .custom-table {
          min-width: 900px;
        }

        .custom-table thead th {
          background: #f8fafc;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .2px;
          padding: 11px 13px;
          white-space: nowrap;
        }

        .custom-table tbody td {
          border-bottom: 1px solid #f1f5f9;
          color: #475569;
          font-size: 11px;
          padding: 10px 13px;
          vertical-align: middle;
        }

        .custom-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .custom-table tbody tr:hover {
          background: #fafcff;
        }

        .id-badge,
        .admission-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 10px;
          font-weight: 600;
        }

        .admission-badge {
          background: #eff6ff;
          border-color: #dbeafe;
          color: #2563eb;
        }

        .role-badge {
          display: inline-flex;
          padding: 4px 8px;
          border-radius: 6px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          font-size: 10px;
          font-weight: 600;
        }

        .table-user {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 150px;
        }

        .table-user > span {
          color: #334155;
          font-size: 11px;
        }

        .table-avatar,
        .student-avatar {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 11px;
        }

        .student-avatar {
          background: #f0fdf4;
          color: #16a34a;
        }

        .empty-table {
          text-align: center;
          padding: 38px 15px !important;
          color: #94a3b8 !important;
        }

        .table-empty-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f8fafc;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
        }

        .empty-table .fw-semibold {
          color: #64748b;
          font-size: 12px;
        }

        .empty-table small {
          display: block;
          margin-top: 3px;
          font-size: 10px;
        }

        /* ===================================================
           FILTER
        =================================================== */

        .filter-area {
          padding: 12px 14px;
          border-bottom: 1px solid #eef2f7;
          background: #ffffff;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: minmax(260px, 1.5fr) minmax(140px, .7fr) minmax(140px, .7fr) 90px;
          gap: 8px;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 12px;
          z-index: 2;
        }

        .search-input {
          padding-left: 32px !important;
        }

        .custom-input {
          height: 36px;
          border: 1px solid #dbe3ee;
          border-radius: 8px;
          font-size: 11px;
          color: #334155;
          box-shadow: none !important;
        }

        .custom-input::placeholder {
          color: #a0aec0;
        }

        .custom-input:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, .08) !important;
        }

        .reset-btn {
          height: 36px;
          border-radius: 8px;
          font-size: 11px;
        }

        .student-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 7px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          font-size: 11px;
          font-weight: 600;
        }

        .table-footer {
          min-height: 45px;
          padding: 10px 14px;
          border-top: 1px solid #eef2f7;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #94a3b8;
          font-size: 10px;
        }

        .table-footer strong {
          color: #64748b;
        }

        .clear-filter-btn {
          border: 0;
          background: transparent;
          color: #2563eb;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 5px;
        }

        /* ===================================================
           DANGER
        =================================================== */

        .danger-section {
          margin-top: 14px;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #fecaca;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .danger-title {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #b91c1c;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 3px;
        }

        .danger-title svg {
          font-size: 11px;
        }

        .danger-description {
          color: #94a3b8;
          font-size: 10px;
        }

        .danger-section .btn {
          font-size: 11px;
          border-radius: 7px;
          white-space: nowrap;
        }

        /* ===================================================
           LOADING / EMPTY
        =================================================== */

        .page-loader {
          min-height: 420px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .empty-page {
          min-height: 400px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty-icon {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          margin-bottom: 12px;
        }

        /* ===================================================
           RESPONSIVE
        =================================================== */

        @media (max-width: 1199.98px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .filter-grid {
            grid-template-columns: 1.5fr 1fr 1fr 90px;
          }

        }

        @media (max-width: 991.98px) {

          .overview-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .overview-divider {
            width: 100%;
            height: 1px;
          }

          .overview-meta {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-grid {
            grid-template-columns: 1fr 1fr;
          }

          .search-wrapper {
            grid-column: 1 / -1;
          }

        }

        @media (max-width: 767.98px) {

          .school-details-page {
            padding: 10px;
          }

          .page-header {
            padding: 12px;
            align-items: flex-start;
            flex-direction: column;
          }

          .page-header-actions {
            width: 100%;
          }

          .page-action-btn {
            flex: 1;
          }

          .overview-card {
            padding: 13px;
          }

          .school-logo-wrapper {
            width: 60px;
            height: 60px;
          }

          .school-name-row h4 {
            font-size: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .info-field.full {
            grid-column: auto;
          }

          .overview-meta {
            grid-template-columns: 1fr;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .search-wrapper {
            grid-column: auto;
          }

          .section-card-header {
            align-items: flex-start;
          }

          .section-card-header > .btn,
          .section-card-header > .student-count-badge {
            flex-shrink: 0;
          }

          .danger-section {
            flex-direction: column;
            align-items: stretch;
          }

          .danger-section .btn {
            width: 100%;
          }

        }

        @media (max-width: 575.98px) {

          .page-header-left {
            width: 100%;
          }

          .page-title {
            font-size: 15px;
          }

          .page-subtitle {
            font-size: 10px;
          }

          .page-title-icon {
            width: 38px;
            height: 38px;
          }

          .back-button {
            width: 32px;
            height: 32px;
          }

          .school-overview-left {
            align-items: flex-start;
          }

          .school-location {
            font-size: 11px;
          }

          .section-card-header {
            padding: 11px;
          }

          .section-card-body {
            padding: 11px;
          }

          .section-title-wrapper span {
            display: none;
          }

          .section-title-wrapper h6 {
            font-size: 12px;
          }

          .section-icon {
            width: 34px;
            height: 34px;
          }

          .admin-info-item strong {
            max-width: 180px;
          }

        }

      `}</style>

    </div>
  );
};

export default SchoolDetailsView;