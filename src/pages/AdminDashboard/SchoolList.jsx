// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaSchool,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaSearch,
//   FaPlus,
//   FaRegPauseCircle,
//   FaPauseCircle,
//   FaUserGraduate,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { SiAdguard } from "react-icons/si";
// import { LuBuilding2 } from "react-icons/lu";

// const SchoolList = () => {
//   const navigate = useNavigate();

//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
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

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       setLoading(true);

//       const token =
//         localStorage.getItem("AdminToken") || localStorage.getItem("token");

//       const response = await axios.get("http://localhost:8080/api/school/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSchools(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch schools:", error);
//       setSchools([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredSchools = schools.filter((school) => {
//     const searchText = search.toLowerCase();

//     return (
//       school.schoolName?.toLowerCase().includes(searchText) ||
//       school.schoolCode?.toLowerCase().includes(searchText) ||
//       school.city?.toLowerCase().includes(searchText) ||
//       school.state?.toLowerCase().includes(searchText) ||
//       school.email?.toLowerCase().includes(searchText)
//     );
//   });

//   console.log("filteredSchools", filteredSchools);

//   const getStatus = (school) => {
//     return school.active === true ? "Active" : "Inactive";
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this school?",
//     );

//     if (!confirmDelete) return;

//     try {
//       const token =
//         localStorage.getItem("AdminToken") || localStorage.getItem("token");

//       await axios.delete(`http://localhost:8080/api/school/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSchools((prev) => prev.filter((school) => school.id !== id));
//     } catch (error) {
//       console.error("Delete school failed:", error);

//       alert("Unable to delete school.");
//     }
//   };

//   return (
//     <div className="container-fluid px-2 py-3">
//       <div className="card border-0 shadow mb-3">
//         <div className="card-body">
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div className="d-flex align-items-center">
//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   background: "#e7f0ff",
//                 }}
//               >
//                 <FaSchool size={23} className="text-primary" />
//               </div>

//               <div>
//                 <h4 className="mb-1 fw-semibold">School List</h4>

//                 <small className="text-muted">
//                   Manage and view all registered schools
//                 </small>
//               </div>
//             </div>

//             <button
//               className="btn btn-primary d-flex align-items-center gap-2"
//               onClick={() => navigate("/add/schools")}
//             >
//               <FaPlus />
//               Add School
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="row g-3 mb-3">
//         <div className="col-12 col-sm-6 col-md-4 col-lg">
//           <div
//             className="card h-100 border shadow"
//             style={{ backgroundColor: "#fdf2ff" }}
//           >
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                 style={{
//                   backgroundColor: "#f8d9fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaSchool color="purple" size={32} />
//               </div>

//               <div className="flex-grow-1">
//                 <h6 className="mb-1">Total Schools</h6>

//                 <strong className="fs-4 d-block">{schools.length}</strong>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <small>
//                     Active:{" "}
//                     {schools.filter((school) => school.active === true).length}
//                   </small>
//                   <small>
//                     Inactive:{" "}
//                     {schools.filter((school) => school.active !== true).length}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-6 col-md-3">
//           <div
//             className="card border shadow h-100 "
//             style={{ backgroundColor: "#f2fbff" }}
//           >
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2 "
//                 style={{
//                   backgroundColor: "#caecfc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <SiAdguard className="text-info" size={32} />
//               </div>

//               <div className="flex-grow-1">
//                 <h6 className="mb-1">Active Schools</h6>

//                 <strong className="fs-4 d-block">
//                   {schools.filter((school) => school.active === true).length}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <small>
//                     This Month:{" "}
//                     {schools.filter((school) => school.active === true).length}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-6 col-md-3">
//           <div
//             className="card border shadow h-100"
//             style={{ backgroundColor: "#f2fffb" }}
//           >
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                 style={{
//                   backgroundColor: "#d9faef",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaPauseCircle color="green" size={32} />
//               </div>

//               <div className="flex-grow-1">
//                 <h6 className="mb-1">InActive Schools</h6>

//                 <strong className="fs-4 d-block">
//                   {schools.filter((school) => school.active !== true).length}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <small>
//                     This Month:{" "}
//                     {schools.filter((school) => school.active !== true).length}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-6 col-md-3">
//           <div
//             className="card border shadow h-100"
//             style={{ backgroundColor: "#fcf8e6" }}
//           >
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                 style={{
//                   backgroundColor: "#fcf5d4",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaUserGraduate color="orange" size={32} />
//               </div>

//               <div className="flex-grow-1">
//                 <h6 className="mb-1">Total Students</h6>

//                 <strong className="fs-4 d-block">
//                   {schools.reduce(
//                     (total, school) => total + (school.totalStudents || 0),
//                     0,
//                   )}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">
//                   {/* <small>
//                     This Month:{" "}
//                     {schools.filter((school) => school.active !== true).length}
//                   </small> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SCHOOL TABLE
//       ===================================================== */}

//       <div className="card border-0 shadow">
//         <div className="card-header bg-white py-3">
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <h5 className="mb-0 fw-semibold">All Schools</h5>

//             {/* SEARCH */}

//             <div className="input-group" style={{ maxWidth: "350px" }}>
//               <span className="input-group-text bg-white">
//                 <FaSearch />
//               </span>

//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search school..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="card-body p-3">
//           <div
//             className="table-responsive"
//             style={{
//               maxHeight: "600px",
//               overflowY: "auto",
//             }}
//           >
//             <table className="table table-hover align-middle mb-0">
//               <thead
//                 className="table-primary"
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 1,
//                 }}
//               >
//                 <tr>
//                   <th>#</th>

//                   <th>School Name</th>

//                   <th>Code</th>

//                   <th>Contact Person</th>

//                   <th>Phone </th>

//                   <th>Email</th>
//                   <th>City</th>
//                   <th>State</th>

//                   <th>Students</th>

//                   <th>Board</th>
//                   <th>Created On</th>

//                   <th>Status</th>

//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {/* LOADING */}

//                 {loading && (
//                   <tr>
//                     <td colSpan="9" className="text-center py-5">
//                       <div
//                         className="spinner-border text-primary"
//                         role="status"
//                       />

//                       <div className="mt-2 text-muted">Loading schools...</div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* NO DATA */}

//                 {!loading && filteredSchools.length === 0 && (
//                   <tr>
//                     <td colSpan="9" className="text-center py-5 text-muted">
//                       <FaSchool size={35} className="mb-2" />

//                       <div>No schools found</div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* DATA */}

//                 {!loading &&
//                   filteredSchools.map((school, index) => (
//                     <tr key={school.id}>
//                       {/* NUMBER */}

//                       <td>{index + 1}</td>

//                       {/* SCHOOL */}

//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div
//                             className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center me-2"
//                             style={{
//                               width: "45px",
//                               height: "45px",
//                               background: "#f1f5f9",
//                             }}
//                           >
//                             {/* {school.logoUrl ? (
//                               <img
//                                 src={school.logoUrl}
//                                 alt={school.schoolName}
//                                 style={{
//                                   width: "100%",
//                                   height: "100%",
//                                   objectFit: "cover",
//                                 }}
//                               />
//                             ) : (
//                               <FaSchool className="text-primary" size={20} />
//                             )} */}
//                             <img
//                               src={getLogoUrl(school.logoUrl)}
//                               alt={school.schoolName}
//                               style={{
//                                 width: "70px",
//                                 height: "50px",
//                                 objectFit: "cover",
//                                 borderRadius: "8px",
//                                 border: "1px solid #dee2e6",
//                                 padding: "8px",
//                               }}
//                             />
//                           </div>

//                           <div>
//                             <div className="fw-semibold">
//                               {school.schoolName}
//                             </div>

//                             {/* <small className="text-muted">
//                               {school.organizationName || "—"}
//                             </small> */}
//                           </div>
//                         </div>
//                       </td>

//                       {/* CODE */}

//                       <td>
//                         <span className="badge bg-light text-dark border">
//                           {school.schoolCode || "—"}
//                         </span>
//                       </td>

//                       {/* CONTACT */}

//                       <td>
//                         <div className="small">
//                           <div>{school.contactPerson}</div>
//                         </div>
//                       </td>

//                       {/* LOCATION */}

//                       <td>{school.phoneNumber}</td>
//                       <td>{school.email}</td>
//                       <td>{school.city}</td>
//                       <td>{school.state}</td>

//                       {/* STUDENTS */}

//                       <td>
//                         <div className="d-flex align-items-center gap-1">
//                           <FaUsers className="text-primary" />

//                           <span>{school.totalStudents || 0}</span>
//                         </div>
//                       </td>

//                       {/* BOARD */}

//                       <td>{school.affiliationBoard || "—"}</td>

//                       <td>{formatDate(school.createdAt)}</td>

//                       {/* STATUS */}

//                       <td>
//                         <span
//                           className={`badge ${
//                             school.active ? "bg-success" : "bg-danger"
//                           }`}
//                         >
//                           {getStatus(school)}
//                         </span>
//                       </td>

//                       {/* ACTION */}

//                       <td>
//                         <div className="d-flex gap-1">
//                           <button
//                             className="btn btn-sm btn-outline-primary"
//                             title="View"
//                             onClick={() =>
//                               navigate(`/school/view/${school.id}`)
//                             }
//                           >
//                             <FaEye />
//                           </button>
                          
//                           <button
//                             className="btn btn-sm btn-outline-primary"
//                             title="School View"
//                             onClick={() =>
//                               navigate(`/admin/school-details/${school.id}`)
//                             }
//                           >
//                             <LuBuilding2 />
//                           </button>

//                           {/* <button
//                               className="btn btn-sm btn-outline-warning"
//                               title="Edit"
//                               onClick={() =>
//                                 navigate(
//                                   `/school/edit/${school.id}`
//                                 )
//                               }
//                             >
                              
//                             </button> */}

//                           <button
//                             className="btn btn-sm btn-outline-primary"
//                             onClick={() =>
//                               navigate(`/school-edit/${school.id}`)
//                             }
//                           >
//                             <FaEdit />
//                           </button>

//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             title="Delete"
//                             onClick={() => handleDelete(school.id)}
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchoolList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaSchool,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaSearch,
//   FaPlus,
//   FaPauseCircle,
//   FaUserGraduate,
//   FaUsers,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { SiAdguard } from "react-icons/si";
// import { LuBuilding2 } from "react-icons/lu";

// const SchoolList = () => {
//   const navigate = useNavigate();

//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // LOGO URL
//   // =========================================================

//   const getLogoUrl = (logoUrl) => {
//     if (!logoUrl) {
//       return "/images/default-school.png";
//     }

//     if (logoUrl.startsWith("http")) {
//       return logoUrl;
//     }

//     return `http://localhost:8080${logoUrl}`;
//   };

//   // =========================================================
//   // FETCH SCHOOLS
//   // =========================================================

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       setLoading(true);

//       const token =
//         localStorage.getItem("AdminToken") ||
//         localStorage.getItem("token");

//       const response = await axios.get(
//         "http://localhost:8080/api/school/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSchools(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch schools:", error);
//       setSchools([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // SEARCH
//   // =========================================================

//   const filteredSchools = schools.filter((school) => {
//     const searchText = search.toLowerCase().trim();

//     return (
//       school.schoolName?.toLowerCase().includes(searchText) ||
//       school.schoolCode?.toLowerCase().includes(searchText) ||
//       school.city?.toLowerCase().includes(searchText) ||
//       school.state?.toLowerCase().includes(searchText) ||
//       school.email?.toLowerCase().includes(searchText) ||
//       school.contactPerson?.toLowerCase().includes(searchText) ||
//       school.affiliationBoard?.toLowerCase().includes(searchText)
//     );
//   });

//   // =========================================================
//   // COUNTS
//   // =========================================================

//   const totalSchools = schools.length;

//   const activeSchools = schools.filter(
//     (school) => school.active === true
//   ).length;

//   const inactiveSchools = schools.filter(
//     (school) => school.active !== true
//   ).length;

//   const totalStudents = schools.reduce(
//     (total, school) =>
//       total + (Number(school.totalStudents) || 0),
//     0
//   );

//   // =========================================================
//   // STATUS
//   // =========================================================

//   const getStatus = (school) => {
//     return school.active === true ? "Active" : "Inactive";
//   };

//   // =========================================================
//   // DELETE
//   // =========================================================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this school?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const token =
//         localStorage.getItem("AdminToken") ||
//         localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:8080/api/school/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSchools((prev) =>
//         prev.filter((school) => school.id !== id)
//       );
//     } catch (error) {
//       console.error("Delete school failed:", error);

//       alert(
//         error.response?.data?.message ||
//           "Unable to delete school."
//       );
//     }
//   };

//   // =========================================================
//   // RETURN
//   // =========================================================

//   return (
//     <div
//       className="container-fluid px-2 py-2"
//       style={{
//         backgroundColor: "#f8fafc",
//         minHeight: "100vh",
//       }}
//     >
//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}

//       <div className="mx-0 mt-1 mb-3">
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
//                     flexShrink: 0,
//                   }}
//                 >
//                   <FaSchool size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     School List
//                   </h5>

//                   <div className="text-muted small">
//                     Organization Management &nbsp;/&nbsp; School List
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
//                     border: "1px solid #bfdbfe",
//                     fontSize: "13px",
//                   }}
//                 >
//                   <FaSchool className="me-1" />
//                   School Management
//                 </span>

//                 <button
//                   type="button"
//                   className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3"
//                   onClick={() =>
//                     navigate("/add/schools")
//                   }
//                 >
//                   <FaPlus size={13} />
//                   Add School
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
//               <span
//                 style={{ cursor: "pointer" }}
//                 onClick={() => navigate("/")}
//               >
//                 Home
//               </span>

//               &nbsp;›&nbsp;

//               <span>
//                 Organization Management
//               </span>

//               &nbsp;›&nbsp;

//               <span className="text-primary fw-semibold">
//                 School List
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STAT CARDS
//       ====================================================== */}

//       <div className="row g-3 mb-3">

//         {/* TOTAL */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#f8f5ff)",
//               border:
//                 "1px solid #ede9fe",
//             }}
//           >
//             <div className="card-body p-3">
//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#7c3aed,#a855f7)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 6px 16px rgba(124,58,237,.18)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <FaSchool size={23} />
//                 </div>

//                 <div>
//                   <small className="text-muted">
//                     Total Schools
//                   </small>

//                   <h4 className="mb-0 mt-1 fw-bold">
//                     {totalSchools}
//                   </h4>
//                 </div>
//               </div>

//               <div className="mt-3 d-flex gap-2">
//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     backgroundColor: "#ecfdf5",
//                     color: "#15803d",
//                   }}
//                 >
//                   Active: {activeSchools}
//                 </span>

//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     backgroundColor: "#fef2f2",
//                     color: "#dc2626",
//                   }}
//                 >
//                   Inactive: {inactiveSchools}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ACTIVE */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#effcff)",
//               border:
//                 "1px solid #cffafe",
//             }}
//           >
//             <div className="card-body p-3">
//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#0891b2,#06b6d4)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 6px 16px rgba(8,145,178,.18)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <SiAdguard size={24} />
//                 </div>

//                 <div>
//                   <small className="text-muted">
//                     Active Schools
//                   </small>

//                   <h4 className="mb-0 mt-1 fw-bold">
//                     {activeSchools}
//                   </h4>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     backgroundColor: "#ecfeff",
//                     color: "#0891b2",
//                   }}
//                 >
//                   Currently Active
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* INACTIVE */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#fff7f7)",
//               border:
//                 "1px solid #fee2e2",
//             }}
//           >
//             <div className="card-body p-3">
//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#dc2626,#ef4444)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 6px 16px rgba(220,38,38,.18)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <FaPauseCircle size={24} />
//                 </div>

//                 <div>
//                   <small className="text-muted">
//                     Inactive Schools
//                   </small>

//                   <h4 className="mb-0 mt-1 fw-bold">
//                     {inactiveSchools}
//                   </h4>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     backgroundColor: "#fef2f2",
//                     color: "#dc2626",
//                   }}
//                 >
//                   Currently Inactive
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* STUDENTS */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div
//             className="card border-0 shadow rounded-4 h-100"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff,#fffbeb)",
//               border:
//                 "1px solid #fef3c7",
//             }}
//           >
//             <div className="card-body p-3">
//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#d97706,#f59e0b)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 6px 16px rgba(217,119,6,.18)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <FaUserGraduate size={24} />
//                 </div>

//                 <div>
//                   <small className="text-muted">
//                     Total Students
//                   </small>

//                   <h4 className="mb-0 mt-1 fw-bold">
//                     {totalStudents}
//                   </h4>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <span
//                   className="badge rounded-pill"
//                   style={{
//                     backgroundColor: "#fffbeb",
//                     color: "#b45309",
//                   }}
//                 >
//                   Across All Schools
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SCHOOL TABLE CARD
//       ====================================================== */}

//       <div
//         className="card border-0 shadow rounded-4 overflow-hidden"
//         style={{
//           border: "1px solid #e5e7eb",
//         }}
//       >

//         {/* TABLE HEADER */}
//         <div
//           className="card-header border-0 p-3 p-md-4"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f8fbff 100%)",
//             borderBottom:
//               "1px solid #e5e7eb",
//           }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//             <div className="d-flex align-items-center gap-2">

//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3"
//                 style={{
//                   width: "38px",
//                   height: "38px",
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                 }}
//               >
//                 <FaSchool size={18} />
//               </div>

//               <div>
//                 <h6 className="mb-0 fw-bold text-dark">
//                   All Schools
//                 </h6>

//                 <small className="text-muted">
//                   Manage registered schools
//                 </small>
//               </div>
//             </div>

//             {/* SEARCH */}
//             <div
//               className="input-group"
//               style={{
//                 maxWidth: "350px",
//                 minWidth: "250px",
//               }}
//             >
//               <span
//                 className="input-group-text border-end-0"
//                 style={{
//                   backgroundColor: "#fff",
//                   borderColor: "#dbeafe",
//                   color: "#2563eb",
//                 }}
//               >
//                 <FaSearch size={14} />
//               </span>

//               <input
//                 type="text"
//                 className="form-control border-start-0"
//                 placeholder="Search school..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//                 style={{
//                   borderColor: "#dbeafe",
//                   boxShadow: "none",
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="card-body p-0">

//           <div
//             className="table-responsive"
//             style={{
//               maxHeight: "600px",
//               overflowY: "auto",
//             }}
//           >
//             <table className="table table-hover align-middle mb-0">

//               <thead
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 2,
//                   background:
//                     "linear-gradient(135deg,#eff6ff,#dbeafe)",
//                 }}
//               >
//                 <tr>
//                   <th className="px-3 py-3">#</th>
//                   <th className="py-3">School Name</th>
//                   <th className="py-3">Code</th>
//                   <th className="py-3">Contact Person</th>
//                   <th className="py-3">Phone</th>
//                   <th className="py-3">Email</th>
//                   <th className="py-3">City</th>
//                   <th className="py-3">State</th>
//                   <th className="py-3">Students</th>
//                   <th className="py-3">Board</th>
//                   <th className="py-3">Created On</th>
//                   <th className="py-3">Status</th>
//                   <th className="py-3">Action</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {/* LOADING */}
//                 {loading && (
//                   <tr>
//                     <td
//                       colSpan="13"
//                       className="text-center py-5"
//                     >
//                       <div
//                         className="spinner-border text-primary"
//                         role="status"
//                       />

//                       <div className="mt-2 text-muted">
//                         Loading schools...
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* NO DATA */}
//                 {!loading &&
//                   filteredSchools.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="13"
//                         className="text-center py-5 text-muted"
//                       >
//                         <FaSchool
//                           size={35}
//                           className="mb-2"
//                         />

//                         <div>
//                           {search
//                             ? "No schools match your search."
//                             : "No schools found."}
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                 {/* DATA */}
//                 {!loading &&
//                   filteredSchools.map(
//                     (school, index) => (
//                       <tr key={school.id}>

//                         {/* NUMBER */}
//                         <td className="px-3 fw-semibold text-muted">
//                           {index + 1}
//                         </td>

//                         {/* SCHOOL */}
//                         <td>
//                           <div className="d-flex align-items-center">

//                             <div
//                               className="d-flex align-items-center justify-content-center me-2"
//                               style={{
//                                 width: "48px",
//                                 height: "48px",
//                                 backgroundColor:
//                                   "#f8fafc",
//                                 border:
//                                   "1px solid #e2e8f0",
//                                 borderRadius: "10px",
//                                 overflow: "hidden",
//                                 flexShrink: 0,
//                               }}
//                             >
//                               <img
//                                 src={getLogoUrl(
//                                   school.logoUrl
//                                 )}
//                                 alt={
//                                   school.schoolName
//                                 }
//                                 style={{
//                                   width: "100%",
//                                   height: "100%",
//                                   objectFit:
//                                     "contain",
//                                   padding: "5px",
//                                 }}
//                                 onError={(e) => {
//                                   e.currentTarget.src =
//                                     "/images/default-school.png";
//                                 }}
//                               />
//                             </div>

//                             <div>
//                               <div className="fw-semibold text-dark">
//                                 {school.schoolName ||
//                                   "—"}
//                               </div>
//                             </div>
//                           </div>
//                         </td>

//                         {/* CODE */}
//                         <td>
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={{
//                               backgroundColor:
//                                 "#f8fafc",
//                               color: "#334155",
//                               border:
//                                 "1px solid #e2e8f0",
//                             }}
//                           >
//                             {school.schoolCode ||
//                               "—"}
//                           </span>
//                         </td>

//                         {/* CONTACT */}
//                         <td>
//                           <span className="small">
//                             {school.contactPerson ||
//                               "—"}
//                           </span>
//                         </td>

//                         {/* PHONE */}
//                         <td>
//                           <span className="small">
//                             {school.phoneNumber ||
//                               "—"}
//                           </span>
//                         </td>

//                         {/* EMAIL */}
//                         <td>
//                           <span className="small">
//                             {school.email || "—"}
//                           </span>
//                         </td>

//                         {/* CITY */}
//                         <td>
//                           {school.city || "—"}
//                         </td>

//                         {/* STATE */}
//                         <td>
//                           {school.state || "—"}
//                         </td>

//                         {/* STUDENTS */}
//                         <td>
//                           <div className="d-flex align-items-center gap-2">
//                             <span
//                               className="d-flex align-items-center justify-content-center rounded-2"
//                               style={{
//                                 width: "30px",
//                                 height: "30px",
//                                 backgroundColor:
//                                   "#eff6ff",
//                                 color: "#2563eb",
//                               }}
//                             >
//                               <FaUsers size={14} />
//                             </span>

//                             <span className="fw-semibold">
//                               {school.totalStudents ||
//                                 0}
//                             </span>
//                           </div>
//                         </td>

//                         {/* BOARD */}
//                         <td>
//                           {school.affiliationBoard ||
//                             "—"}
//                         </td>

//                         {/* CREATED */}
//                         <td>
//                           <span className="small text-muted">
//                             {formatDate(
//                               school.createdAt
//                             )}
//                           </span>
//                         </td>

//                         {/* STATUS */}
//                         <td>
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={{
//                               backgroundColor:
//                                 school.active
//                                   ? "#ecfdf5"
//                                   : "#fef2f2",
//                               color:
//                                 school.active
//                                   ? "#15803d"
//                                   : "#dc2626",
//                               border: `1px solid ${
//                                 school.active
//                                   ? "#bbf7d0"
//                                   : "#fecaca"
//                               }`,
//                             }}
//                           >
//                             {getStatus(school)}
//                           </span>
//                         </td>

//                         {/* ACTION */}
//                         <td>
//                           <div className="d-flex gap-1">

//                             {/* VIEW */}
//                             <button
//                               className="btn btn-sm rounded-2"
//                               title="View"
//                               style={{
//                                 color: "#2563eb",
//                                 backgroundColor:
//                                   "#eff6ff",
//                                 border:
//                                   "1px solid #bfdbfe",
//                               }}
//                               onClick={() =>
//                                 navigate(
//                                   `/school/view/${school.id}`
//                                 )
//                               }
//                             >
//                               <FaEye />
//                             </button>

//                             {/* SCHOOL DETAILS */}
//                             <button
//                               className="btn btn-sm rounded-2"
//                               title="School View"
//                               style={{
//                                 color: "#0891b2",
//                                 backgroundColor:
//                                   "#ecfeff",
//                                 border:
//                                   "1px solid #a5f3fc",
//                               }}
//                               onClick={() =>
//                                 navigate(
//                                   `/admin/school-details/${school.id}`
//                                 )
//                               }
//                             >
//                               <LuBuilding2 />
//                             </button>

//                             {/* EDIT */}
//                             <button
//                               className="btn btn-sm rounded-2"
//                               title="Edit"
//                               style={{
//                                 color: "#2563eb",
//                                 backgroundColor:
//                                   "#eff6ff",
//                                 border:
//                                   "1px solid #bfdbfe",
//                               }}
//                               onClick={() =>
//                                 navigate(
//                                   `/school-edit/${school.id}`
//                                 )
//                               }
//                             >
//                               <FaEdit />
//                             </button>

//                             {/* DELETE */}
//                             <button
//                               className="btn btn-sm rounded-2"
//                               title="Delete"
//                               style={{
//                                 color: "#dc2626",
//                                 backgroundColor:
//                                   "#fef2f2",
//                                 border:
//                                   "1px solid #fecaca",
//                               }}
//                               onClick={() =>
//                                 handleDelete(
//                                   school.id
//                                 )
//                               }
//                             >
//                               <FaTrash />
//                             </button>

//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* FOOTER */}
//         {!loading &&
//           filteredSchools.length > 0 && (
//             <div
//               className="px-3 py-2"
//               style={{
//                 backgroundColor: "#f8fafc",
//                 borderTop:
//                   "1px solid #e5e7eb",
//               }}
//             >
//               <small className="text-muted">
//                 Showing{" "}
//                 <span className="fw-semibold text-dark">
//                   {filteredSchools.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="fw-semibold text-dark">
//                   {schools.length}
//                 </span>{" "}
//                 schools
//               </small>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default SchoolList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSchool,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaPauseCircle,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SiAdguard } from "react-icons/si";
import { LuBuilding2 } from "react-icons/lu";

const SchoolList = () => {
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // LOGO URL
  // =========================================================

  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) {
      return "/images/default-school.png";
    }

    if (logoUrl.startsWith("http")) {
      return logoUrl;
    }

    return `http://localhost:8080${logoUrl}`;
  };

  // =========================================================
  // FETCH SCHOOLS
  // =========================================================

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("AdminToken") ||
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/school/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(response.data || []);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredSchools = schools.filter((school) => {
    const searchText = search.toLowerCase().trim();

    return (
      school.schoolName?.toLowerCase().includes(searchText) ||
      school.schoolCode?.toLowerCase().includes(searchText) ||
      school.city?.toLowerCase().includes(searchText) ||
      school.state?.toLowerCase().includes(searchText) ||
      school.email?.toLowerCase().includes(searchText) ||
      school.contactPerson?.toLowerCase().includes(searchText) ||
      school.affiliationBoard?.toLowerCase().includes(searchText)
    );
  });

  // =========================================================
  // COUNTS
  // =========================================================

  const totalSchools = schools.length;

  const activeSchools = schools.filter(
    (school) => school.active === true
  ).length;

  const inactiveSchools = schools.filter(
    (school) => school.active !== true
  ).length;

  const totalStudents = schools.reduce(
    (total, school) =>
      total + (Number(school.totalStudents) || 0),
    0
  );

  // =========================================================
  // STATUS
  // =========================================================

  const getStatus = (school) => {
    return school.active === true ? "Active" : "Inactive";
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this school?"
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("AdminToken") ||
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/school/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools((prev) =>
        prev.filter((school) => school.id !== id)
      );
    } catch (error) {
      console.error("Delete school failed:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete school."
      );
    }
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <>
      <div
        className="container-fluid px-2 py-2"
        style={{
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mx-0 mt-1 mb-3">
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

                {/* LEFT */}

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
                      flexShrink: 0,
                    }}
                  >
                    <FaSchool size={27} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      School List
                    </h5>

                    <div className="text-muted small">
                      Organization Management
                      &nbsp;/&nbsp;
                      School List
                    </div>
                  </div>

                </div>

                {/* RIGHT */}

                <div className="d-flex align-items-center gap-2 flex-wrap">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      fontSize: "13px",
                    }}
                  >
                    <FaSchool className="me-1" />
                    School Management
                  </span>

                  <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3"
                    onClick={() =>
                      navigate("/add/schools")
                    }
                  >
                    <FaPlus size={13} />
                    Add School
                  </button>

                </div>

              </div>

            </div>

            {/* BREADCRUMB */}

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

                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </span>

                &nbsp;›&nbsp;

                <span>
                  Organization Management
                </span>

                &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  School List
                </span>

              </small>
            </div>

          </div>
        </div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="row g-3 mb-4">

          {/* TOTAL SCHOOLS */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-blue shadow h-100">

              <div className="stat-icon">
                <FaSchool />
              </div>

              <div className="stat-content">

                <span>Total Schools</span>

                <h3>
                  {totalSchools.toLocaleString("en-IN")}
                </h3>

                <small>
                  All registered schools
                </small>

              </div>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-green shadow h-100">

              <div className="stat-icon">
                <SiAdguard />
              </div>

              <div className="stat-content">

                <span>Active Schools</span>

                <h3>
                  {activeSchools.toLocaleString("en-IN")}
                </h3>

                <small>
                  Currently active
                </small>

              </div>

            </div>

          </div>

          {/* INACTIVE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-red shadow h-100">

              <div className="stat-icon">
                <FaPauseCircle />
              </div>

              <div className="stat-content">

                <span>Inactive Schools</span>

                <h3>
                  {inactiveSchools.toLocaleString("en-IN")}
                </h3>

                <small>
                  Currently inactive
                </small>

              </div>

            </div>

          </div>

          {/* STUDENTS */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-orange shadow h-100">

              <div className="stat-icon">
                <FaUserGraduate />
              </div>

              <div className="stat-content">

                <span>Total Students</span>

                <h3>
                  {totalStudents.toLocaleString("en-IN")}
                </h3>

                <small>
                  Across all schools
                </small>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SCHOOL TABLE CARD
        ====================================================== */}

        <div className="card shadow border-0 rounded-4 mb-4">

          {/* TABLE HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              {/* TITLE */}

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
                  <FaSchool size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    School Records
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Manage registered schools
                  </small>

                </div>

              </div>

              {/* SEARCH + COUNT */}

              <div className="d-flex align-items-center gap-2 flex-wrap">

                <div
                  className="input-group"
                  style={{
                    maxWidth: "350px",
                    minWidth: "250px",
                  }}
                >

                  <span
                    className="input-group-text bg-light"
                    style={{
                      borderColor: "#dbeafe",
                    }}
                  >
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search school..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    style={{
                      borderColor: "#dbeafe",
                      boxShadow: "none",
                    }}
                  />

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  {filteredSchools.length} Records
                </span>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body px-0">

            <div
              className="table-responsive"
              style={{
                maxHeight: "600px",
                overflowY: "auto",
              }}
            >

              <table className="table align-middle mb-0">

                <thead
                  className="small text-center"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >

                  <tr>

                    <th className="py-3">#</th>
                    <th className="py-3">School Name</th>
                    <th className="py-3">Code</th>
                    <th className="py-3">Contact Person</th>
                    <th className="py-3">Phone</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">City</th>
                    <th className="py-3">State</th>
                    <th className="py-3">Students</th>
                    <th className="py-3">Board</th>
                    <th className="py-3">Created On</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Action</th>

                  </tr>

                </thead>

                <tbody className="text-center small">

                  {/* LOADING */}

                  {loading ? (

                    <tr>

                      <td
                        colSpan="13"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-2 text-muted">
                          Loading schools...
                        </div>

                      </td>

                    </tr>

                  ) : filteredSchools.length > 0 ? (

                    filteredSchools.map(
                      (school, index) => (

                        <tr key={school.id}>

                          {/* NUMBER */}

                          <td className="fw-semibold">
                            {index + 1}
                          </td>

                          {/* SCHOOL */}

                          <td className="text-start">

                            <div className="d-flex align-items-center">

                              <div
                                className="d-flex align-items-center justify-content-center me-2"
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  backgroundColor:
                                    "#f8fafc",
                                  border:
                                    "1px solid #e2e8f0",
                                  borderRadius:
                                    "10px",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >

                                <img
                                  src={getLogoUrl(
                                    school.logoUrl
                                  )}
                                  alt={
                                    school.schoolName
                                  }
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit:
                                      "contain",
                                    padding: "5px",
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/images/default-school.png";
                                  }}
                                />

                              </div>

                              <div>

                                <div className="fw-semibold text-dark">
                                  {school.schoolName ||
                                    "—"}
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* CODE */}

                          <td>

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  "#f1f5f9",
                                color: "#334155",
                                border:
                                  "1px solid #cbd5e1",
                              }}
                            >
                              {school.schoolCode ||
                                "—"}
                            </span>

                          </td>

                          {/* CONTACT */}

                          <td>
                            {school.contactPerson ||
                              "—"}
                          </td>

                          {/* PHONE */}

                          <td>
                            {school.phoneNumber ||
                              "—"}
                          </td>

                          {/* EMAIL */}

                          <td>
                            {school.email || "—"}
                          </td>

                          {/* CITY */}

                          <td>
                            {school.city || "—"}
                          </td>

                          {/* STATE */}

                          <td>
                            {school.state || "—"}
                          </td>

                          {/* STUDENTS */}

                          <td>

                            <div className="d-flex align-items-center justify-content-center gap-2">

                              <span
                                className="d-flex align-items-center justify-content-center rounded-2"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  backgroundColor:
                                    "#eff6ff",
                                  color: "#2563eb",
                                }}
                              >
                                <FaUsers size={14} />
                              </span>

                              <span className="fw-semibold">
                                {school.totalStudents ||
                                  0}
                              </span>

                            </div>

                          </td>

                          {/* BOARD */}

                          <td>
                            {school.affiliationBoard ||
                              "—"}
                          </td>

                          {/* CREATED */}

                          <td>
                            <span className="text-muted">
                              {formatDate(
                                school.createdAt
                              )}
                            </span>
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor:
                                  school.active
                                    ? "#ecfdf5"
                                    : "#fef2f2",

                                color:
                                  school.active
                                    ? "#15803d"
                                    : "#dc2626",

                                border: `1px solid ${
                                  school.active
                                    ? "#bbf7d0"
                                    : "#fecaca"
                                }`,
                              }}
                            >
                              {getStatus(school)}
                            </span>

                          </td>

                          {/* ACTION */}

                          <td>

                            <div className="d-flex gap-1 justify-content-center">

                              {/* VIEW */}

                              <button
                                className="btn btn-sm rounded-2"
                                title="View"
                                style={{
                                  color: "#2563eb",
                                  backgroundColor:
                                    "#eff6ff",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/school/view/${school.id}`
                                  )
                                }
                              >
                                <FaEye />
                              </button>

                              {/* SCHOOL DETAILS */}

                              <button
                                className="btn btn-sm rounded-2"
                                title="School Details"
                                style={{
                                  color: "#0891b2",
                                  backgroundColor:
                                    "#ecfeff",
                                  border:
                                    "1px solid #a5f3fc",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/admin/school-details/${school.id}`
                                  )
                                }
                              >
                                <LuBuilding2 />
                              </button>

                              {/* EDIT */}

                              <button
                                className="btn btn-sm rounded-2"
                                title="Edit"
                                style={{
                                  color: "#2563eb",
                                  backgroundColor:
                                    "#eff6ff",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/school-edit/${school.id}`
                                  )
                                }
                              >
                                <FaEdit />
                              </button>

                              {/* DELETE */}

                              <button
                                className="btn btn-sm rounded-2"
                                title="Delete"
                                style={{
                                  color: "#dc2626",
                                  backgroundColor:
                                    "#fef2f2",
                                  border:
                                    "1px solid #fecaca",
                                }}
                                onClick={() =>
                                  handleDelete(
                                    school.id
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    /* NO DATA */

                    <tr>

                      <td
                        colSpan="13"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              "#eff6ff",
                            color: "#2563eb",
                          }}
                        >
                          <FaSchool size={28} />
                        </div>

                        <h6 className="text-primary fw-bold">
                          No School Found
                        </h6>

                        <small className="text-muted">
                          {search
                            ? "No schools match your search."
                            : "No schools are registered yet."}
                        </small>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

          {!loading &&
            filteredSchools.length > 0 && (

              <div
                className="px-4 py-3"
                style={{
                  backgroundColor:
                    "#f8fafc",
                  borderTop:
                    "1px solid #e5e7eb",
                }}
              >

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                  <small className="text-muted">

                    Showing{" "}

                    <span className="fw-semibold text-dark">
                      {filteredSchools.length}
                    </span>

                    {" "}of{" "}

                    <span className="fw-semibold text-dark">
                      {schools.length}
                    </span>

                    {" "}schools

                  </small>

                  <button
                    className="btn btn-outline-primary btn-sm rounded-3"
                    onClick={fetchSchools}
                    disabled={loading}
                  >
                    Refresh
                  </button>

                </div>

              </div>

            )}

        </div>

      </div>

      {/* =====================================================
          PREMIUM STAT CARD CSS
      ====================================================== */}

      <style>
        {`
          .premium-stat-card {
            position: relative;
            overflow: hidden;
            min-height: 145px;
            border-radius: 16px;
            padding: 22px;
            display: flex;
            align-items: center;
            gap: 18px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
          }

          .premium-stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(0,0,0,.08) !important;
          }

          .premium-stat-card::after {
            content: "";
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            right: -35px;
            top: -35px;
            opacity: .35;
          }

          .stat-icon {
            width: 58px;
            height: 58px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 25px;
            flex-shrink: 0;
          }

          .stat-content {
            position: relative;
            z-index: 2;
          }

          .stat-content span {
            display: block;
            color: #64748b;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .stat-content h3 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: #0f172a;
          }

          .stat-content small {
            display: block;
            margin-top: 5px;
            color: #94a3b8;
            font-size: 12px;
          }

          .stat-blue {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #f5f9ff 60%,
              #eaf3ff 100%
            );
            border-color: #dbeafe;
          }

          .stat-blue .stat-icon {
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #3b82f6
              );
            box-shadow:
              0 8px 20px
              rgba(37,99,235,.22);
          }

          .stat-green {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #f2fff8 60%,
              #e8f7ef 100%
            );
            border-color: #d1fae5;
          }

          .stat-green .stat-icon {
            background:
              linear-gradient(
                135deg,
                #198754,
                #22c55e
              );
            box-shadow:
              0 8px 20px
              rgba(25,135,84,.18);
          }

          .stat-red {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #fff7f7 60%,
              #fde8ea 100%
            );
            border-color: #fecaca;
          }

          .stat-red .stat-icon {
            background:
              linear-gradient(
                135deg,
                #dc3545,
                #ef4444
              );
            box-shadow:
              0 8px 20px
              rgba(220,53,69,.18);
          }

          .stat-orange {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #fffaf0 60%,
              #fff3d6 100%
            );
            border-color: #fed7aa;
          }

          .stat-orange .stat-icon {
            background:
              linear-gradient(
                135deg,
                #d97706,
                #f59e0b
              );
            box-shadow:
              0 8px 20px
              rgba(217,119,6,.18);
          }

          .table > :not(caption) > * > * {
            padding-top: 13px;
            padding-bottom: 13px;
            border-bottom-color: #eef2f7;
          }

          .table tbody tr:hover {
            background-color: #f8fbff;
          }

          .table thead th {
            white-space: nowrap;
            font-weight: 700;
          }

          @media (max-width: 768px) {

            .premium-stat-card {
              min-height: 125px;
              padding: 17px;
            }

            .stat-icon {
              width: 50px;
              height: 50px;
              font-size: 21px;
            }

            .stat-content h3 {
              font-size: 24px;
            }

          }
        `}
      </style>
    </>
  );
};

export default SchoolList;

