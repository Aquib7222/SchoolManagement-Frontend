

// import React, { useEffect, useMemo, useState } from "react";
// import * as XLSX from "xlsx";
// import {
//   LuDownload,
//   LuUserPlus,
//   LuChevronLeft,
//   LuChevronRight,
//   LuUsers,
//   LuCircleCheck,
//   LuClock3,
//   LuSearch,
// } from "react-icons/lu";
// import { MdOutlineSchool } from "react-icons/md";
// import axios from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// const ITEMS_PER_PAGE = 5;

// const CreateAccounts = () => {
//   const { standards } = useMasters();

//   const [loading, setLoading] = useState(false);
//   const [students, setStudents] = useState([]);

//   const [searchAdmission, setSearchAdmission] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [sortBy, setSortBy] = useState("NAME");
//   const [currentPage, setCurrentPage] = useState(1);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   /* ================= FETCH DATA ================= */

//   useEffect(() => {
//     if (!user?.schoolId || !token) return;

//     setLoading(true);

//     axios
//       .get(`/api/admissions/school?schoolId=${user.schoolId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setStudents(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching students:", err);
//       })
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   /* ================= FILTER + SORT ================= */

//   const filteredStudents = useMemo(() => {
//     let data = [...students];

//     data = data.filter(
//       (s) => s.status === "FEE_PAID" || s.status === "ENROLLED"
//     );

//     if (searchAdmission.trim()) {
//       data = data.filter((s) =>
//         s.admissionNumber
//           ?.toLowerCase()
//           .includes(searchAdmission.toLowerCase())
//       );
//     }

//     if (selectedClass) {
//       data = data.filter(
//         (s) => s.studentClass === selectedClass
//       );
//     }

//     if (sortBy === "NAME") {
//       data.sort((a, b) =>
//         `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(
//           `${b.firstName || ""} ${b.lastName || ""}`
//         )
//       );
//     } else {
//       data.sort((a, b) =>
//         (a.admissionNumber || "").localeCompare(
//           b.admissionNumber || ""
//         )
//       );
//     }

//     return data;
//   }, [
//     students,
//     searchAdmission,
//     selectedClass,
//     sortBy,
//   ]);

//   /* ================= PAGINATION ================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(
//       filteredStudents.length / ITEMS_PER_PAGE
//     )
//   );

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   /* ================= SUMMARY ================= */

//   const totalStudents = filteredStudents.length;

//   const accountCreated = filteredStudents.filter(
//     (s) => s.status === "ENROLLED"
//   ).length;

//   const pendingAccounts = filteredStudents.filter(
//     (s) => s.status === "FEE_PAID"
//   ).length;

//   /* ================= CREATE STUDENT ================= */

//   const handleCreateStudent = async (student) => {
//     if (!window.confirm("Create student account?")) return;

//     const payload = {
//       admissionId: student.id,
//       username:
//         student.email ||
//         `${student.admissionNumber}@school.com`,
//     };

//     try {
//       await axios.post(
//         "/api/students/create",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Student account created successfully.");

//       setStudents((prev) =>
//         prev.map((s) =>
//           s.id === student.id
//             ? { ...s, status: "ENROLLED" }
//             : s
//         )
//       );
//     } catch (err) {
//       alert(
//         err?.response?.data?.message ||
//           "Error creating student account"
//       );
//     }
//   };

//   /* ================= EXPORT EXCEL ================= */

//   const exportToExcel = () => {
//     if (!filteredStudents.length) {
//       alert("No student data available to export.");
//       return;
//     }

//     const data = filteredStudents.map((s, index) => ({
//       "S.No": index + 1,
//       "Admission No": s.admissionNumber || "-",
//       "Student Name":
//         `${s.firstName || ""} ${s.middleName || ""} ${
//           s.lastName || ""
//         }`
//           .replace(/\s+/g, " ")
//           .trim(),
//       Class: s.studentClass || "-",
//       "Father Mobile": s.preferredNo || "-",
//       Status: s.status || "-",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Student Accounts"
//     );

//     XLSX.writeFile(
//       workbook,
//       "Student_Accounts.xlsx"
//     );
//   };

//   /* ================= FILTER HANDLERS ================= */

//   const handleSearchChange = (e) => {
//     setSearchAdmission(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleClassChange = (e) => {
//     setSelectedClass(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       {/* =====================================================
//           PREMIUM PAGE HEADER
//       ===================================================== */}

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
              
//               <div className="d-flex align-items-center gap-3">
//                 {/* ICON */}

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
//                   <LuUserPlus size={27} />
//                 </div>

//                 {/* TITLE */}

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Create Accounts
//                   </h5>

//                   <div className="text-muted small">
//                     Student Management &nbsp;/&nbsp; Create Accounts
//                   </div>
//                 </div>
//               </div>

//               {/* BADGE */}

//               <div className="d-flex align-items-center gap-2">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   Student Accounts
//                 </span>
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
//               Home &nbsp;›&nbsp; Student Management &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Create Accounts
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <div className="mx-2 mb-4">
//         <div
//           className="bg-white rounded-4 shadow p-3 p-md-4"
//           style={{
//             border: "1px solid #edf2f7",
//           }}
//         >
//           {/* =================================================
//               TITLE + EXPORT
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
//             <div>
//               <h5
//                 className="mb-1 fw-bold"
//                 style={{ color: "#1e3a8a" }}
//               >
//                 Student Account Creation
//               </h5>

//               <small className="text-muted">
//                 Create login accounts for enrolled students
//               </small>
//             </div>

//             <button
//               type="button"
//               className="btn d-flex align-items-center gap-2 text-white"
//               onClick={exportToExcel}
//               style={{
//                 background:
//                   "linear-gradient(135deg,#198754,#20a878)",
//                 border: "none",
//                 borderRadius: "10px",
//                 padding: "9px 16px",
//                 boxShadow:
//                   "0 5px 14px rgba(25,135,84,.18)",
//               }}
//             >
//               <LuDownload size={17} />
//               Export Excel
//             </button>
//           </div>

//           {/* =================================================
//               PREMIUM SUMMARY CARDS
//           ================================================= */}

//           <div className="row g-3 mb-4">

//             {/* TOTAL STUDENTS */}

//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="h-100 rounded-4 p-3 position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#2563eb 0%,#3b82f6 55%,#60a5fa 100%)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 25px rgba(37,99,235,.20)",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "120px",
//                     height: "120px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.08)",
//                     right: "-35px",
//                     top: "-45px",
//                   }}
//                 />

//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.06)",
//                     right: "35px",
//                     bottom: "-35px",
//                   }}
//                 />

//                 <div className="d-flex justify-content-between align-items-center position-relative">
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.85,
//                         fontSize: "13px",
//                       }}
//                     >
//                       Total Students
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {totalStudents}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.75,
//                       }}
//                     >
//                       Eligible for account
//                     </small>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-4"
//                     style={{
//                       width: "54px",
//                       height: "54px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                       border:
//                         "1px solid rgba(255,255,255,.20)",
//                       backdropFilter: "blur(5px)",
//                     }}
//                   >
//                     <LuUsers size={25} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ACCOUNT CREATED */}

//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="h-100 rounded-4 p-3 position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#059669 0%,#10b981 55%,#34d399 100%)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 25px rgba(5,150,105,.20)",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "120px",
//                     height: "120px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.08)",
//                     right: "-35px",
//                     top: "-45px",
//                   }}
//                 />

//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.06)",
//                     right: "35px",
//                     bottom: "-35px",
//                   }}
//                 />

//                 <div className="d-flex justify-content-between align-items-center position-relative">
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.85,
//                         fontSize: "13px",
//                       }}
//                     >
//                       Accounts Created
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {accountCreated}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.75,
//                       }}
//                     >
//                       Active student accounts
//                     </small>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-4"
//                     style={{
//                       width: "54px",
//                       height: "54px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                       border:
//                         "1px solid rgba(255,255,255,.20)",
//                       backdropFilter: "blur(5px)",
//                     }}
//                   >
//                     <LuCircleCheck size={25} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* PENDING */}

//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="h-100 rounded-4 p-3 position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#d97706 0%,#f59e0b 55%,#fbbf24 100%)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 25px rgba(245,158,11,.20)",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "120px",
//                     height: "120px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.10)",
//                     right: "-35px",
//                     top: "-45px",
//                   }}
//                 />

//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,.07)",
//                     right: "35px",
//                     bottom: "-35px",
//                   }}
//                 />

//                 <div className="d-flex justify-content-between align-items-center position-relative">
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.9,
//                         fontSize: "13px",
//                       }}
//                     >
//                       Pending Accounts
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {pendingAccounts}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.8,
//                       }}
//                     >
//                       Awaiting creation
//                     </small>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-4"
//                     style={{
//                       width: "54px",
//                       height: "54px",
//                       background:
//                         "rgba(255,255,255,.17)",
//                       border:
//                         "1px solid rgba(255,255,255,.20)",
//                       backdropFilter: "blur(5px)",
//                     }}
//                   >
//                     <LuClock3 size={25} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               FILTER SECTION
//           ================================================= */}

//           <div
//             className="rounded-4 p-3 p-md-4 mb-4"
//             style={{
//               background:
//                 "linear-gradient(135deg,#f8fbff,#f3f7fc)",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <div className="d-flex align-items-center gap-2 mb-3">
//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3"
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                   background: "#eff6ff",
//                   color: "#2563eb",
//                   border:
//                     "1px solid #dbeafe",
//                 }}
//               >
//                 <LuSearch size={18} />
//               </div>

//               <div>
//                 <h6 className="mb-0 fw-bold text-dark">
//                   Search & Filter
//                 </h6>

//                 <small className="text-muted">
//                   Find students quickly
//                 </small>
//               </div>
//             </div>

//             <div className="row g-3">

//               {/* ADMISSION NO */}

//               <div className="col-xl-4 col-md-6">
//                 <label className="form-label fw-semibold text-dark">
//                   Admission No
//                 </label>

//                 <div className="position-relative">
//                   <LuSearch
//                     size={17}
//                     style={{
//                       position: "absolute",
//                       left: "13px",
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                       color: "#94a3b8",
//                     }}
//                   />

//                   <input
//                     type="search"
//                     className="form-control"
//                     placeholder="Search admission number..."
//                     value={searchAdmission}
//                     onChange={handleSearchChange}
//                     style={{
//                       paddingLeft: "38px",
//                       borderRadius: "9px",
//                       border:
//                         "1px solid #dbe3ef",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* CLASS */}

//               <div className="col-xl-4 col-md-6">
//                 <label className="form-label fw-semibold text-dark">
//                   Class
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedClass}
//                   onChange={handleClassChange}
//                   style={{
//                     borderRadius: "9px",
//                     border:
//                       "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="">
//                     All Classes
//                   </option>

//                   {standards?.length > 0
//                     ? standards.map(
//                         (standard) => (
//                           <option
//                             key={
//                               standard.id ||
//                               standard.value ||
//                               standard
//                             }
//                             value={
//                               standard.name ||
//                               standard.value ||
//                               standard
//                             }
//                           >
//                             {standard.name ||
//                               standard.label ||
//                               standard.value ||
//                               standard}
//                           </option>
//                         )
//                       )
//                     : [
//                         "I",
//                         "II",
//                         "III",
//                         "IV",
//                         "V",
//                         "VI",
//                         "VII",
//                         "VIII",
//                         "IX",
//                         "X",
//                         "XI",
//                         "XII",
//                       ].map((c) => (
//                         <option
//                           key={c}
//                           value={c}
//                         >
//                           {c}
//                         </option>
//                       ))}
//                 </select>
//               </div>

//               {/* SORT */}

//               <div className="col-xl-4 col-md-6">
//                 <label className="form-label fw-semibold text-dark">
//                   Sort By
//                 </label>

//                 <select
//                   className="form-select"
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   style={{
//                     borderRadius: "9px",
//                     border:
//                       "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="NAME">
//                     Student Name
//                   </option>

//                   <option value="ADMISSION">
//                     Admission No
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               TABLE TITLE
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//             <div>
//               <h6
//                 className="fw-bold mb-1"
//                 style={{
//                   color: "#1e293b",
//                 }}
//               >
//                 Student Accounts
//               </h6>

//               <small className="text-muted">
//                 Showing{" "}
//                 <strong>
//                   {filteredStudents.length}
//                 </strong>{" "}
//                 student
//                 {filteredStudents.length !== 1
//                   ? "s"
//                   : ""}
//               </small>
//             </div>

//             <span
//               className="badge rounded-pill px-3 py-2"
//               style={{
//                 backgroundColor: "#eff6ff",
//                 color: "#2563eb",
//                 border:
//                   "1px solid #bfdbfe",
//               }}
//             >
//               {filteredStudents.length} Records
//             </span>
//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div
//             className="table-responsive rounded-3"
//             style={{
//               border:
//                 "1px solid #e2e8f0",
//             }}
//           >
//             <table
//               className="table table-hover align-middle mb-0"
//               style={{
//                 minWidth: "850px",
//               }}
//             >
//               <thead
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#f1f5f9,#eaf2ff)",
//                 }}
//               >
//                 <tr>
//                   <th
//                     className="px-3 py-3"
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     #
//                   </th>

//                   <th
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Admission No
//                   </th>

//                   <th
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Student Name
//                   </th>

//                   <th
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Class
//                   </th>

//                   <th
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Father Mobile
//                   </th>

//                   <th
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Status
//                   </th>

//                   <th
//                     className="text-center"
//                     style={{
//                       color: "#475569",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="text-center py-5"
//                     >
//                       <div
//                         className="spinner-border"
//                         role="status"
//                         style={{
//                           color: "#2563eb",
//                           width: "28px",
//                           height: "28px",
//                         }}
//                       />

//                       <div className="text-muted mt-2">
//                         Loading students...
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedStudents.length > 0 ? (
//                   paginatedStudents.map(
//                     (s, i) => (
//                       <tr key={s.id}>
//                         <td className="px-3 fw-semibold text-muted">
//                           {(currentPage - 1) *
//                             ITEMS_PER_PAGE +
//                             i +
//                             1}
//                         </td>

//                         <td>
//                           <span
//                             className="fw-bold"
//                             style={{
//                               color: "#2563eb",
//                             }}
//                           >
//                             {s.admissionNumber ||
//                               "-"}
//                           </span>
//                         </td>

//                         <td>
//                           <div className="fw-semibold text-dark">
//                             {`${s.firstName || ""} ${
//                               s.middleName || ""
//                             } ${
//                               s.lastName || ""
//                             }`
//                               .replace(
//                                 /\s+/g,
//                                 " "
//                               )
//                               .trim() || "-"}
//                           </div>
//                         </td>

//                         <td>
//                           <span
//                             className="badge rounded-pill"
//                             style={{
//                               background:
//                                 "#f1f5f9",
//                               color:
//                                 "#475569",
//                               border:
//                                 "1px solid #e2e8f0",
//                             }}
//                           >
//                             {s.studentClass ||
//                               "-"}
//                           </span>
//                         </td>

//                         <td>
//                           <span className="text-muted">
//                             {s.preferredNo ||
//                               "-"}
//                           </span>
//                         </td>

//                         <td>
//                           {s.status ===
//                           "FEE_PAID" ? (
//                             <span
//                               className="badge rounded-pill px-3 py-2"
//                               style={{
//                                 backgroundColor:
//                                   "#fff7ed",
//                                 color:
//                                   "#c2410c",
//                                 border:
//                                   "1px solid #fed7aa",
//                               }}
//                             >
//                               FEE PAID
//                             </span>
//                           ) : (
//                             <span
//                               className="badge rounded-pill px-3 py-2"
//                               style={{
//                                 backgroundColor:
//                                   "#ecfdf5",
//                                 color:
//                                   "#047857",
//                                 border:
//                                   "1px solid #a7f3d0",
//                               }}
//                             >
//                               ACCOUNT CREATED
//                             </span>
//                           )}
//                         </td>

//                         <td className="text-center">
//                           <button
//                             type="button"
//                             className="btn btn-sm d-inline-flex align-items-center gap-1"
//                             disabled={
//                               s.status ===
//                               "ENROLLED"
//                             }
//                             onClick={() =>
//                               handleCreateStudent(
//                                 s
//                               )
//                             }
//                             style={
//                               s.status ===
//                               "ENROLLED"
//                                 ? {
//                                     background:
//                                       "#f8fafc",
//                                     color:
//                                       "#94a3b8",
//                                     border:
//                                       "1px solid #e2e8f0",
//                                     borderRadius:
//                                       "8px",
//                                   }
//                                 : {
//                                     background:
//                                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                                     color:
//                                       "#fff",
//                                     border:
//                                       "none",
//                                     borderRadius:
//                                       "8px",
//                                     boxShadow:
//                                       "0 5px 12px rgba(37,99,235,.18)",
//                                   }
//                             }
//                           >
//                             <LuUserPlus
//                               size={15}
//                             />

//                             {s.status ===
//                             "ENROLLED"
//                               ? "Created"
//                               : "Create Account"}
//                           </button>
//                         </td>
//                       </tr>
//                     )
//                   )
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="text-center py-5"
//                     >
//                       <div
//                         className="d-flex align-items-center justify-content-center mx-auto mb-2 rounded-circle"
//                         style={{
//                           width: "55px",
//                           height: "55px",
//                           background:
//                             "#f1f5f9",
//                           color:
//                             "#94a3b8",
//                         }}
//                       >
//                         <LuUsers
//                           size={25}
//                         />
//                       </div>

//                       <h6 className="text-muted mb-1">
//                         No student records found
//                       </h6>

//                       <small className="text-secondary">
//                         Try changing your search or filter.
//                       </small>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* =================================================
//               PAGINATION
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">
//             <div>
//               <small className="text-muted">
//                 Page{" "}
//                 <strong>
//                   {currentPage}
//                 </strong>{" "}
//                 of{" "}
//                 <strong>
//                   {totalPages}
//                 </strong>
//               </small>
//             </div>

//             <div className="d-flex gap-2 align-items-center">

//               {/* PREVIOUS */}

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={
//                   currentPage === 1
//                 }
//                 onClick={() =>
//                   setCurrentPage(
//                     (p) => p - 1
//                   )
//                 }
//                 style={{
//                   border:
//                     "1px solid #dbe3ef",
//                   color:
//                     currentPage === 1
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   borderRadius: "8px",
//                   background:
//                     "#fff",
//                 }}
//               >
//                 <LuChevronLeft
//                   size={16}
//                 />
//                 Previous
//               </button>

//               {/* PAGE NUMBERS */}

//               <div className="d-flex gap-1">
//                 {Array.from(
//                   {
//                     length: totalPages,
//                   },
//                   (_, i) => i + 1
//                 ).map((page) => (
//                   <button
//                     type="button"
//                     key={page}
//                     className="btn btn-sm"
//                     onClick={() =>
//                       setCurrentPage(
//                         page
//                       )
//                     }
//                     style={
//                       currentPage === page
//                         ? {
//                             background:
//                               "linear-gradient(135deg,#2563eb,#3b82f6)",
//                             color: "#fff",
//                             border:
//                               "none",
//                             borderRadius:
//                               "8px",
//                             minWidth:
//                               "34px",
//                             boxShadow:
//                               "0 4px 10px rgba(37,99,235,.18)",
//                           }
//                         : {
//                             background:
//                               "#fff",
//                             color:
//                               "#475569",
//                             border:
//                               "1px solid #dbe3ef",
//                             borderRadius:
//                               "8px",
//                             minWidth:
//                               "34px",
//                           }
//                     }
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               {/* NEXT */}

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={
//                   currentPage ===
//                   totalPages
//                 }
//                 onClick={() =>
//                   setCurrentPage(
//                     (p) => p + 1
//                   )
//                 }
//                 style={{
//                   border:
//                     "1px solid #dbe3ef",
//                   color:
//                     currentPage ===
//                     totalPages
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   borderRadius: "8px",
//                   background:
//                     "#fff",
//                 }}
//               >
//                 Next
//                 <LuChevronRight
//                   size={16}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateAccounts;


import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

import {
  LuDownload,
  LuUserPlus,
  LuChevronLeft,
  LuChevronRight,
  LuUsers,
  LuCircleCheck,
  LuClock3,
  LuSearch,
  LuGraduationCap,
  LuRefreshCw,
} from "react-icons/lu";

import { MdOutlineSchool } from "react-icons/md";

import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 10;

const CreateAccounts = () => {
  const { standards } = useMasters();

  /* =====================================================
     STATE
  ===================================================== */

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const [searchAdmission, setSearchAdmission] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortBy, setSortBy] = useState("NAME");

  const [currentPage, setCurrentPage] = useState(1);

  /* =====================================================
     USER
  ===================================================== */

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* =====================================================
     FETCH STUDENTS
  ===================================================== */

  const fetchStudents = async () => {
    if (!user?.schoolId || !token) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [user?.schoolId, token]);

  /* =====================================================
     STUDENT NAME
  ===================================================== */

  const getStudentName = (student) => {
    return (
      `${student?.firstName || ""} ${
        student?.middleName || ""
      } ${student?.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim() || "-"
    );
  };

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredStudents = useMemo(() => {
    let data = [...students];

    /*
      Only students eligible for account creation
      or already having an account.
    */

    data = data.filter(
      (student) =>
        student.status === "FEE_PAID" ||
        student.status === "ENROLLED"
    );

    /* SEARCH BY ADMISSION NUMBER */

    if (searchAdmission.trim()) {
      const search = searchAdmission
        .trim()
        .toLowerCase();

      data = data.filter((student) =>
        student.admissionNumber
          ?.toLowerCase()
          .includes(search)
      );
    }

    /* CLASS FILTER */

    if (selectedClass) {
      data = data.filter(
        (student) =>
          student.studentClass === selectedClass
      );
    }

    /* SORT */

    if (sortBy === "NAME") {
      data.sort((a, b) =>
        getStudentName(a).localeCompare(
          getStudentName(b)
        )
      );
    } else {
      data.sort((a, b) =>
        (a.admissionNumber || "").localeCompare(
          b.admissionNumber || ""
        )
      );
    }

    return data;
  }, [
    students,
    searchAdmission,
    selectedClass,
    sortBy,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents =
    filteredStudents.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  /* =====================================================
     SUMMARY
  ===================================================== */

  const totalStudents = filteredStudents.length;

  const accountCreated =
    filteredStudents.filter(
      (student) =>
        student.status === "ENROLLED"
    ).length;

  const pendingAccounts =
    filteredStudents.filter(
      (student) =>
        student.status === "FEE_PAID"
    ).length;

  /* =====================================================
     CREATE ACCOUNT
  ===================================================== */

 const handleCreateStudent = async (student) => {
  if (!student?.id) {
    alert("Invalid student record.");
    return;
  }

  const username =
    student.email?.trim() ||
    `${student.admissionNumber}@school.com`;

  if (!username) {
    alert("Student email is required to create account.");
    return;
  }

  if (
    !window.confirm(
      `Create account for ${
        `${student.firstName || ""} ${
          student.lastName || ""
        }`
          .replace(/\s+/g, " ")
          .trim()
      }?`
    )
  ) {
    return;
  }

  const payload = {
    admissionId: student.id,
    username: username,
  };

  console.log("Create Student Account Payload:", payload);

  try {
    setLoading(true);

    const response = await axios.post(
      "/api/students/create",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "Student account response:",
      response.data
    );

    alert(
      response?.data?.message ||
        "Student account created successfully."
    );

    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              status: "ENROLLED",
            }
          : s
      )
    );
  } catch (err) {
    console.error(
      "Error creating student account:",
      err
    );

    console.error(
      "Backend error:",
      err?.response?.data
    );

    alert(
      err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error creating student account."
    );
  } finally {
    setLoading(false);
  }
};

  /* =====================================================
     EXPORT EXCEL
  ===================================================== */

  const exportToExcel = () => {
    if (!filteredStudents.length) {
      alert(
        "No student data available to export."
      );
      return;
    }

    const data = filteredStudents.map(
      (student, index) => ({
        "S.No": index + 1,

        "Admission No":
          student.admissionNumber || "-",

        "Student Name":
          getStudentName(student),

        Class:
          student.studentClass || "-",

        "Father Mobile":
          student.preferredNo || "-",

        Status:
          student.status === "FEE_PAID"
            ? "FEE PAID"
            : "ACCOUNT CREATED",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Student Accounts"
    );

    XLSX.writeFile(
      workbook,
      "Student_Accounts.xlsx"
    );
  };

  /* =====================================================
     FILTER HANDLERS
  ===================================================== */

  const handleSearchChange = (event) => {
    setSearchAdmission(event.target.value);
    setCurrentPage(1);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearchAdmission("");
    setSelectedClass("");
    setSortBy("NAME");
    setCurrentPage(1);
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <>
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
            <div
              className="d-flex flex-wrap justify-content-between align-items-center gap-3"
            >
              {/* LEFT */}

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "54px",
                    height: "54px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.20)",
                    flexShrink: 0,
                  }}
                >
                  <LuUserPlus size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Create Accounts
                  </h5>

                  <div className="text-muted small">
                    Student Management
                    &nbsp;/&nbsp;
                    Create Accounts
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
                    border:
                      "1px solid #bfdbfe",
                    fontSize: "12px",
                  }}
                >
                  <MdOutlineSchool
                    className="me-1"
                    size={15}
                  />
                  Student Accounts
                </span>
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
              Home
              &nbsp;›&nbsp;
              Student Management
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Create Accounts
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >
          {/* =================================================
              SECTION TITLE
          ================================================= */}

          <div
            className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"
          >
            <div>
              <h5
                className="mb-1 fw-bold"
                style={{
                  color: "#1e3a8a",
                }}
              >
                Student Account Creation
              </h5>

              <small className="text-muted">
                Create login accounts for
                eligible students
              </small>
            </div>

            <div className="d-flex gap-2">
              {/* REFRESH */}

              <button
                type="button"
                className="btn d-flex align-items-center gap-2"
                onClick={fetchStudents}
                disabled={loading}
                title="Refresh students"
                style={{
                  background: "#f8fafc",
                  color: "#475569",
                  border:
                    "1px solid #dbe3ef",
                  borderRadius: "10px",
                  padding: "9px 13px",
                }}
              >
                <LuRefreshCw
                  size={16}
                  className={
                    loading
                      ? "spin-icon"
                      : ""
                  }
                />

                <span className="d-none d-sm-inline">
                  Refresh
                </span>
              </button>

              {/* EXPORT */}

              <button
                type="button"
                className="btn d-flex align-items-center gap-2 text-white"
                onClick={exportToExcel}
                style={{
                  background:
                    "linear-gradient(135deg,#198754,#20a878)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "9px 16px",
                  boxShadow:
                    "0 5px 14px rgba(25,135,84,.18)",
                }}
              >
                <LuDownload size={17} />

                <span>
                  Export Excel
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="row g-3 mb-4">
            {/* TOTAL */}

            <div className="col-xl-4 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb 0%,#3b82f6 55%,#60a5fa 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,.18)",
                }}
              >
                <div
                  className="summary-circle summary-circle-one"
                />

                <div
                  className="summary-circle summary-circle-two"
                />

                <div
                  className="d-flex justify-content-between align-items-center position-relative"
                >
                  <div>
                    <small
                      style={{
                        opacity: 0.85,
                        fontSize: "13px",
                      }}
                    >
                      Total Students
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalStudents}
                    </h3>

                    <small
                      style={{
                        opacity: 0.75,
                      }}
                    >
                      Eligible for account
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "54px",
                      height: "54px",
                      background:
                        "rgba(255,255,255,.16)",
                      border:
                        "1px solid rgba(255,255,255,.20)",
                      backdropFilter:
                        "blur(5px)",
                    }}
                  >
                    <LuUsers size={25} />
                  </div>
                </div>
              </div>
            </div>

            {/* CREATED */}

            <div className="col-xl-4 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#059669 0%,#10b981 55%,#34d399 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(5,150,105,.18)",
                }}
              >
                <div
                  className="summary-circle summary-circle-one"
                />

                <div
                  className="summary-circle summary-circle-two"
                />

                <div
                  className="d-flex justify-content-between align-items-center position-relative"
                >
                  <div>
                    <small
                      style={{
                        opacity: 0.85,
                        fontSize: "13px",
                      }}
                    >
                      Accounts Created
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {accountCreated}
                    </h3>

                    <small
                      style={{
                        opacity: 0.75,
                      }}
                    >
                      Active student accounts
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "54px",
                      height: "54px",
                      background:
                        "rgba(255,255,255,.16)",
                      border:
                        "1px solid rgba(255,255,255,.20)",
                      backdropFilter:
                        "blur(5px)",
                    }}
                  >
                    <LuCircleCheck
                      size={25}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PENDING */}

            <div className="col-xl-4 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#d97706 0%,#f59e0b 55%,#fbbf24 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(245,158,11,.18)",
                }}
              >
                <div
                  className="summary-circle summary-circle-one"
                />

                <div
                  className="summary-circle summary-circle-two"
                />

                <div
                  className="d-flex justify-content-between align-items-center position-relative"
                >
                  <div>
                    <small
                      style={{
                        opacity: 0.9,
                        fontSize: "13px",
                      }}
                    >
                      Pending Accounts
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {pendingAccounts}
                    </h3>

                    <small
                      style={{
                        opacity: 0.8,
                      }}
                    >
                      Awaiting creation
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "54px",
                      height: "54px",
                      background:
                        "rgba(255,255,255,.17)",
                      border:
                        "1px solid rgba(255,255,255,.20)",
                      backdropFilter:
                        "blur(5px)",
                    }}
                  >
                    <LuClock3 size={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FILTER CARD
          ================================================= */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border:
                "1px solid #e2e8f0",
            }}
          >
            {/* FILTER HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #dbeafe",
                  }}
                >
                  <LuSearch size={18} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold text-dark">
                    Search & Filter
                  </h6>

                  <small className="text-muted">
                    Find students quickly
                  </small>
                </div>
              </div>

              {(searchAdmission ||
                selectedClass ||
                sortBy !== "NAME") && (
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={clearFilters}
                  style={{
                    color: "#2563eb",
                    background:
                      "#ffffff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: "8px",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="row g-3">
              {/* ADMISSION */}

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold text-dark">
                  Admission No
                </label>

                <div className="position-relative">
                  <LuSearch
                    size={17}
                    style={{
                      position:
                        "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#94a3b8",
                      pointerEvents:
                        "none",
                    }}
                  />

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search admission number..."
                    value={
                      searchAdmission
                    }
                    onChange={
                      handleSearchChange
                    }
                    style={{
                      paddingLeft:
                        "40px",
                      borderRadius:
                        "9px",
                      border:
                        "1px solid #dbe3ef",
                      height: "42px",
                    }}
                  />
                </div>
              </div>

              {/* CLASS */}

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold text-dark">
                  Class
                </label>

                <select
                  className="form-select"
                  value={
                    selectedClass
                  }
                  onChange={
                    handleClassChange
                  }
                  style={{
                    borderRadius:
                      "9px",
                    border:
                      "1px solid #dbe3ef",
                    height: "42px",
                  }}
                >
                  <option value="">
                    All Classes
                  </option>

                  {standards?.length >
                  0 ? (
                    standards.map(
                      (standard) => (
                        <option
                          key={
                            standard.id ||
                            standard.value ||
                            standard.name ||
                            standard
                          }
                          value={
                            standard.name ||
                            standard.value ||
                            standard
                          }
                        >
                          {standard.name ||
                            standard.label ||
                            standard.value ||
                            standard}
                        </option>
                      )
                    )
                  ) : (
                    [
                      "NURSERY",
                      "LKG",
                      "UKG",
                      "I",
                      "II",
                      "III",
                      "IV",
                      "V",
                      "VI",
                      "VII",
                      "VIII",
                      "IX",
                      "X",
                      "XI",
                      "XII",
                    ].map(
                      (className) => (
                        <option
                          key={
                            className
                          }
                          value={
                            className
                          }
                        >
                          {className}
                        </option>
                      )
                    )
                  )}
                </select>
              </div>

              {/* SORT */}

              <div className="col-xl-4 col-md-6">
                <label className="form-label fw-semibold text-dark">
                  Sort By
                </label>

                <select
                  className="form-select"
                  value={sortBy}
                  onChange={
                    handleSortChange
                  }
                  style={{
                    borderRadius:
                      "9px",
                    border:
                      "1px solid #dbe3ef",
                    height: "42px",
                  }}
                >
                  <option value="NAME">
                    Student Name
                  </option>

                  <option value="ADMISSION">
                    Admission No
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#1e293b",
                }}
              >
                Student Accounts
              </h6>

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredStudents.length}
                </strong>{" "}
                student
                {filteredStudents.length !==
                1
                  ? "s"
                  : ""}
              </small>
            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                backgroundColor:
                  "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {filteredStudents.length}{" "}
              Records
            </span>
          </div>

          {/* =================================================
              TABLE
          ================================================= */}

         {/* =================================================
    PREMIUM STUDENT ACCOUNTS TABLE
================================================= */}

<div
  className="rounded-4 overflow-hidden"
  style={{
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    boxShadow: "0 8px 25px rgba(15,23,42,.06)",
  }}
>
  <div className="table-responsive">
    <table
      className="table align-middle mb-0"
      style={{
        minWidth: "900px",
        borderCollapse: "separate",
        borderSpacing: 0,
      }}
    >
      {/* ================= TABLE HEADER ================= */}

      <thead>
        <tr
          style={{
            background:
              "linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%)",
          }}
        >
          <th
            className="px-4 py-3"
            style={{
              width: "65px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            #
          </th>

          <th
            className="py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Admission No
          </th>

          <th
            className="py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Student
          </th>

          <th
            className="py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Class
          </th>

          <th
            className="py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Father Mobile
          </th>

          <th
            className="py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Account Status
          </th>

          <th
            className="text-center py-3"
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: ".6px",
              borderBottom: "1px solid #dbeafe",
            }}
          >
            Action
          </th>
        </tr>
      </thead>

      {/* ================= TABLE BODY ================= */}

      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan="7"
              className="text-center py-5"
              style={{
                borderBottom: "none",
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <div
                  className="spinner-border spinner-border-sm"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>

              <div
                className="mt-3 fw-semibold"
                style={{
                  color: "#475569",
                  fontSize: "13px",
                }}
              >
                Loading students...
              </div>

              <small className="text-muted">
                Please wait while we fetch student accounts
              </small>
            </td>
          </tr>
        ) : paginatedStudents.length > 0 ? (
          paginatedStudents.map((s, i) => {
            const fullName =
              `${s.firstName || ""} ${
                s.middleName || ""
              } ${s.lastName || ""}`
                .replace(/\s+/g, " ")
                .trim();

            const isCreated = s.status === "ENROLLED";

            return (
              <tr
                key={s.id}
                style={{
                  transition:
                    "all .2s ease",
                  background: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "#f8fbff";
                  e.currentTarget.style.boxShadow =
                    "inset 3px 0 0 #2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "#fff";
                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                {/* ================= S.NO ================= */}

                <td
                  className="px-4"
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "#f8fafc",
                      color: "#64748b",
                      border:
                        "1px solid #e2e8f0",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {(currentPage - 1) *
                      ITEMS_PER_PAGE +
                      i +
                      1}
                  </div>
                </td>

                {/* ================= ADMISSION ================= */}

                <td
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #dbeafe",
                      borderRadius: "8px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      fontWeight: "800",
                    }}
                  >
                    {s.admissionNumber || "-"}
                  </div>
                </td>

                {/* ================= STUDENT ================= */}

                <td
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        flexShrink: 0,
                        background:
                          "linear-gradient(135deg,#dbeafe,#eff6ff)",
                        color: "#2563eb",
                        border:
                          "1px solid #bfdbfe",
                        fontSize: "14px",
                        fontWeight: "800",
                      }}
                    >
                      {(
                        s.firstName ||
                        "S"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <div
                        className="fw-bold"
                        style={{
                          color: "#1e293b",
                          fontSize: "13px",
                        }}
                      >
                        {fullName || "-"}
                      </div>

                      <small
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                        }}
                      >
                        Student
                      </small>
                    </div>
                  </div>
                </td>

                {/* ================= CLASS ================= */}

                <td
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <span
                    className="d-inline-flex align-items-center"
                    style={{
                      padding: "6px 11px",
                      borderRadius: "20px",
                      background: "#f8fafc",
                      color: "#475569",
                      border:
                        "1px solid #e2e8f0",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    <MdOutlineSchool
                      size={14}
                      className="me-1"
                    />

                    {s.studentClass || "-"}
                  </span>
                </td>

                {/* ================= MOBILE ================= */}

                <td
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <div
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {s.preferredNo || "-"}
                  </div>
                </td>

                {/* ================= STATUS ================= */}

                <td
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  {isCreated ? (
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      style={{
                        padding:
                          "6px 11px",
                        borderRadius: "20px",
                        background:
                          "#ecfdf5",
                        color: "#047857",
                        border:
                          "1px solid #a7f3d0",
                        fontSize: "10px",
                        fontWeight: "800",
                        letterSpacing: ".3px",
                      }}
                    >
                      <LuCircleCheck
                        size={13}
                      />
                      ACCOUNT CREATED
                    </span>
                  ) : (
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      style={{
                        padding:
                          "6px 11px",
                        borderRadius: "20px",
                        background:
                          "#fff7ed",
                        color: "#c2410c",
                        border:
                          "1px solid #fed7aa",
                        fontSize: "10px",
                        fontWeight: "800",
                        letterSpacing: ".3px",
                      }}
                    >
                      <LuClock3
                        size={13}
                      />
                      FEE PAID
                    </span>
                  )}
                </td>

                {/* ================= ACTION ================= */}

                <td
                  className="text-center"
                  style={{
                    borderBottom:
                      "1px solid #f1f5f9",
                  }}
                >
                  <button
                    type="button"
                    disabled={isCreated}
                    onClick={() =>
                      handleCreateStudent(s)
                    }
                    className="btn d-inline-flex align-items-center justify-content-center gap-2"
                    style={
                      isCreated
                        ? {
                            minWidth: "125px",
                            padding:
                              "7px 12px",
                            background:
                              "#f8fafc",
                            color: "#94a3b8",
                            border:
                              "1px solid #e2e8f0",
                            borderRadius:
                              "9px",
                            fontSize: "11px",
                            fontWeight: "700",
                          }
                        : {
                            minWidth: "125px",
                            padding:
                              "7px 12px",
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius:
                              "9px",
                            fontSize: "11px",
                            fontWeight: "700",
                            boxShadow:
                              "0 5px 14px rgba(37,99,235,.20)",
                          }
                    }
                  >
                    {isCreated ? (
                      <>
                        <LuCircleCheck
                          size={14}
                        />
                        Created
                      </>
                    ) : (
                      <>
                        <LuUserPlus
                          size={14}
                        />
                        Create Account
                      </>
                    )}
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan="7"
              className="text-center py-5"
              style={{
                borderBottom: "none",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                style={{
                  width: "64px",
                  height: "64px",
                  background:
                    "linear-gradient(135deg,#f1f5f9,#f8fafc)",
                  color: "#94a3b8",
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <LuUsers size={28} />
              </div>

              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#475569",
                }}
              >
                No student records found
              </h6>

              <small
                style={{
                  color: "#94a3b8",
                }}
              >
                Try changing your search or
                class filter.
              </small>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3"
          >
            {/* INFO */}

            <div>
              <small className="text-muted">
                Page{" "}
                <strong>
                  {currentPage}
                </strong>{" "}
                of{" "}
                <strong>
                  {totalPages}
                </strong>
              </small>
            </div>

            {/* CONTROLS */}

            <div className="d-flex gap-2 align-items-center">
              {/* PREVIOUS */}

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      page - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === 1
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background:
                    "#fff",
                  padding:
                    "7px 12px",
                }}
              >
                <LuChevronLeft
                  size={16}
                />

                <span className="d-none d-sm-inline">
                  Previous
                </span>
              </button>

              {/* PAGE NUMBERS */}

              <div className="d-flex gap-1">
                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className="btn btn-sm"
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    style={
                      currentPage ===
                      page
                        ? {
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color:
                              "#fff",
                            border:
                              "none",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                            height:
                              "34px",
                            boxShadow:
                              "0 4px 10px rgba(37,99,235,.18)",
                          }
                        : {
                            background:
                              "#fff",
                            color:
                              "#475569",
                            border:
                              "1px solid #dbe3ef",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                            height:
                              "34px",
                          }
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* NEXT */}

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      page + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage ===
                    totalPages
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background:
                    "#fff",
                  padding:
                    "7px 12px",
                }}
              >
                <span className="d-none d-sm-inline">
                  Next
                </span>

                <LuChevronRight
                  size={16}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAGE STYLES
      ===================================================== */}

      <style>
        {`
          .summary-circle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }

          .summary-circle-one {
            width: 120px;
            height: 120px;
            background: rgba(255,255,255,.08);
            right: -35px;
            top: -45px;
          }

          .summary-circle-two {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,.06);
            right: 35px;
            bottom: -35px;
          }

          .spin-icon {
            animation: createAccountsSpin 1s linear infinite;
          }

          @keyframes createAccountsSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .table-hover tbody tr {
            transition: all .15s ease;
          }

          .table-hover tbody tr:hover {
            background-color: #f8fbff !important;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #93c5fd !important;
            box-shadow: 0 0 0 .2rem rgba(37,99,235,.10) !important;
          }

          button {
            transition: all .15s ease;
          }

          button:not(:disabled):hover {
            transform: translateY(-1px);
          }

          button:disabled {
            cursor: not-allowed;
          }

          @media (max-width: 767px) {
            .summary-circle-one {
              right: -45px;
            }

            .summary-circle-two {
              right: 15px;
            }
          }
        `}
      </style>
    </>
  );
};

export default CreateAccounts;