// // import React from 'react'

// // const SectionAssign = () => {
// //   return (
// //     <>
    
// //        {/* Header */}
// //       <div
// //         className="row shadow-lg"
// //         style={{
// //           backgroundColor: "white",
// //           margin: "10px",
// //           height: "70px",
// //           borderRadius: "5px",
// //           padding: "10px",
// //           color: "black",
// //         }}
// //       >
// //         <h6>
// //           <strong>Section Assign</strong>
// //         </h6>
// //         <nav aria-label="breadcrumb py-2">
// //           <ol className="breadcrumb">
// //             <li className="breadcrumb-item">
// //               <a href="/" style={{ textDecoration: "none", color: "black" }}>
// //                 Home
// //               </a>
// //             </li>
// //             <li className="breadcrumb-item">
// //               <a href="#" style={{ textDecoration: "none", color: "black" }}>
// //                 Students Section Assign
// //               </a>
// //             </li>
// //           </ol>
// //         </nav>
// //       </div>
    
    
// //     </>
// //   )
// // }

// // export default SectionAssign

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const AssignSection = () => {

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const token = localStorage.getItem("token");

// //   const [students, setStudents] = useState([]);
// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState("");
// //   const [section, setSection] = useState("");

// //   /* FETCH STUDENTS */
// //   useEffect(() => {
// //     axios.get("http://localhost:8080/api/sections/students", {
// //       params: { schoolId: user.schoolId, studentClass: selectedClass },
// //       headers: { Authorization: `Bearer ${token}` }
// //     }).then(res => setStudents(res.data));
// //   }, [selectedClass]);

// //   /* SELECT STUDENT */
// //   const toggleStudent = (id) => {
// //     setSelectedIds(prev =>
// //       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
// //     );
// //   };

// //   /* ASSIGN SECTION */
// //   const assignSection = () => {
// //     if (!section || selectedIds.length === 0) {
// //       alert("Select students and section");
// //       return;
// //     }

// //     axios.post(
// //       `http://localhost:8080/api/sections/assign?schoolId=${user.schoolId}`,
// //       { studentIds: selectedIds, section },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     ).then(() => {
// //       alert("Section assigned successfully");
// //       setSelectedIds([]);
// //     });
// //   };

// //   return (
// //     <div className="bg-white p-3 m-2 rounded shadow">
// //       <h6><strong>Assign Section</strong></h6>

// //       {/* FILTER */}
// //       <div className="row mt-3">
// //         <div className="col-md-3">
// //           <label>Class</label>
// //           <select
// //             className="form-select"
// //             value={selectedClass}
// //             onChange={e => setSelectedClass(e.target.value)}
// //           >
// //             <option value="">All</option>
// //             {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
// //               .map(c => <option key={c}>{c}</option>)}
// //           </select>
// //         </div>

// //         <div className="col-md-3">
// //           <label>Section</label>
// //           <select
// //             className="form-select"
// //             value={section}
// //             onChange={e => setSection(e.target.value)}
// //           >
// //             <option value="">Select</option>
// //             {["A","B","C","D","E"].map(s => (
// //               <option key={s}>{s}</option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <table className="table table-bordered mt-3">
// //         <thead>
// //           <tr>
// //             <th></th>
// //             <th>Admission No</th>
// //             <th>Name</th>
// //             <th>Class</th>
// //             <th>Section</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {students.map(s => (
// //             <tr key={s.id}>
// //               <td>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedIds.includes(s.id)}
// //                   onChange={() => toggleStudent(s.id)}
// //                 />
// //               </td>
// //               <td>{s.admissionNumber}</td>
// //               <td>{s.firstName} {s.lastName}</td>
// //               <td>{s.studentClass}</td>
// //               <td>{s.section || "-"}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <button className="btn btn-primary" onClick={assignSection}>
// //         Assign Section
// //       </button>
// //     </div>
// //   );
// // };

// // export default AssignSection;



// import React, { useEffect, useState } from "react";
// import {
//   FaUsers,
//   FaCheck,
//   FaArrowRight,
//   FaUserCheck,
// } from "react-icons/fa";
// import {
//   IoSearchOutline,
//   IoPrintOutline,
// } from "react-icons/io5";
// import {
//   TbRepeat,
// } from "react-icons/tb";
// import {
//   PiMicrosoftExcelLogoBold,
// } from "react-icons/pi";
// import {
//   MdOutlinePictureAsPdf,
// } from "react-icons/md";
// import {
//   RiErrorWarningFill,
// } from "react-icons/ri";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const AssignSection = () => {
//   const { sessions, standards, sections } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const schoolId = user?.schoolId;

//   const [students, setStudents] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 10;

//   /* --------------------------------
//      FETCH STUDENTS
//   -------------------------------- */
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         "/api/sections/students",
//         {
//           params: {
//             schoolId,
//             academicYear: selectedSession || undefined,
//             studentClass: selectedClass || undefined,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudents(response.data || []);
//       setSelectedIds([]);
//       setCurrentPage(1);
//     } catch (error) {
//       console.error("Failed to fetch students:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to load students."
//       );
//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* --------------------------------
//      SEARCH
//   -------------------------------- */
//   const handleSearch = () => {
//     fetchStudents();
//   };

//   /* --------------------------------
//      RESET
//   -------------------------------- */
//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedClass("");
//     setSelectedSection("");
//     setSearchText("");
//     setSelectedIds([]);
//     setStudents([]);
//     setCurrentPage(1);
//   };

//   /* --------------------------------
//      FILTER STUDENTS
//   -------------------------------- */
//   const filteredStudents = students.filter((student) => {
//     const search = searchText.toLowerCase().trim();

//     if (!search) return true;

//     const name =
//       `${student.firstName || ""} ${student.lastName || ""}`
//         .toLowerCase();

//     const admissionNumber =
//       String(student.admissionNumber || "").toLowerCase();

//     return (
//       name.includes(search) ||
//       admissionNumber.includes(search)
//     );
//   });

//   /* --------------------------------
//      PAGINATION
//   -------------------------------- */
//   const totalPages = Math.ceil(
//     filteredStudents.length / studentsPerPage
//   );

//   const indexOfLastStudent =
//     currentPage * studentsPerPage;

//   const indexOfFirstStudent =
//     indexOfLastStudent - studentsPerPage;

//   const currentStudents = filteredStudents.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );

//   /* --------------------------------
//      SELECT STUDENT
//   -------------------------------- */
//   const toggleStudent = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((item) => item !== id)
//         : [...prev, id]
//     );
//   };

//   /* --------------------------------
//      SELECT ALL
//   -------------------------------- */
//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const ids = currentStudents.map(
//         (student) => student.id
//       );

//       setSelectedIds((prev) => [
//         ...new Set([...prev, ...ids]),
//       ]);
//     } else {
//       const currentIds = currentStudents.map(
//         (student) => student.id
//       );

//       setSelectedIds((prev) =>
//         prev.filter(
//           (id) => !currentIds.includes(id)
//         )
//       );
//     }
//   };

//   const isAllCurrentSelected =
//     currentStudents.length > 0 &&
//     currentStudents.every((student) =>
//       selectedIds.includes(student.id)
//     );

//   /* --------------------------------
//      ASSIGN SECTION
//   -------------------------------- */
//   const assignSection = async () => {
//     if (!selectedSection) {
//       alert("Please select a section.");
//       return;
//     }

//     if (selectedIds.length === 0) {
//       alert("Please select at least one student.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.post(
//         `/api/sections/assign?schoolId=${schoolId}`,
//         {
//           studentIds: selectedIds,
//           section: selectedSection,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Section assigned successfully ✅");

//       setSelectedIds([]);

//       fetchStudents();
//     } catch (error) {
//       console.error("Assign section error:", error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to assign section."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* --------------------------------
//      EXPORT EXCEL
//   -------------------------------- */
//   const exportExcel = () => {
//     if (filteredStudents.length === 0) {
//       alert("No students available to export.");
//       return;
//     }

//     const data = filteredStudents.map(
//       (student, index) => ({
//         "Sl No": index + 1,
//         "Admission No": student.admissionNumber,
//         "Student Name":
//           `${student.firstName || ""} ${
//             student.lastName || ""
//           }`.trim(),
//         Class: student.studentClass,
//         Section: student.section || "-",
//         Gender: student.gender || "-",
//         "Date of Birth": student.dob || "-",
//         Status: student.status || "-",
//       })
//     );

//     const worksheet =
//       XLSX.utils.json_to_sheet(data);

//     worksheet["!cols"] = [
//       { wch: 8 },
//       { wch: 18 },
//       { wch: 28 },
//       { wch: 15 },
//       { wch: 12 },
//       { wch: 12 },
//       { wch: 18 },
//       { wch: 15 },
//     ];

//     const workbook =
//       XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Students"
//     );

//     const buffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     saveAs(
//       new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       }),
//       "Assign_Section_Students.xlsx"
//     );
//   };

//   /* --------------------------------
//      PRINT
//   -------------------------------- */
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <strong>
//             <FaUserCheck className="me-2 text-success" />
//             Assign Section
//           </strong>
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 <small>Home</small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>School Management</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Assign Section</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* ================= FILTER CARD ================= */}
//       <div className="ms-2 me-2 mt-3 bg-white rounded shadow">
//         <div className="card border-0">
//           <div className="card-header bg-white">
//             <strong>Assign Section</strong>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">

//               {/* SESSION */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label">
//                   Session
//                   <span className="text-danger"> *</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) =>
//                     setSelectedSession(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     Select Session
//                   </option>

//                   {sessions.map((session) => (
//                     <option
//                       key={session}
//                       value={session}
//                     >
//                       {session}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* CLASS */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label">
//                   Class
//                   <span className="text-danger"> *</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedClass}
//                   onChange={(e) =>
//                     setSelectedClass(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     Select Class
//                   </option>

//                   {standards.map((standard) => (
//                     <option
//                       key={standard}
//                       value={standard}
//                     >
//                       {standard}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label">
//                   Assign Section
//                   <span className="text-danger"> *</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) =>
//                     setSelectedSection(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     Select Section
//                   </option>

//                   {sections.map((section) => (
//                     <option
//                       key={section}
//                       value={section}
//                     >
//                       {section}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SEARCH BUTTON */}
//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn btn-success w-100 mt-md-4"
//                   onClick={handleSearch}
//                   disabled={loading}
//                 >
//                   <IoSearchOutline className="me-1" />
//                   {loading
//                     ? "Loading..."
//                     : "Search Students"}
//                 </button>
//               </div>
//             </div>

//             {/* SECOND ROW */}
//             <div className="row mt-3 g-3">

//               <div className="col-12 col-md-5">
//                 <label className="form-label">
//                   Search Student
//                 </label>

//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <IoSearchOutline />
//                   </span>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search by Adm No. or Name..."
//                     value={searchText}
//                     onChange={(e) => {
//                       setSearchText(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="col-12 col-md-3">
//                 <button
//                   className="btn border w-100 mt-md-4"
//                   onClick={handleReset}
//                 >
//                   <TbRepeat className="me-1" />
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTENT ================= */}
//       {students.length > 0 && (
//         <div className="container-fluid mt-3 px-2">
//           <div className="row g-3">

//             {/* ================= STUDENT LIST ================= */}
//             <div className="col-12 col-lg-9">
//               <div className="card shadow h-100 border-0">

//                 <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                   <strong>
//                     <FaUsers className="me-2 text-success" />
//                     Student List
//                   </strong>

//                   {/* EXPORT */}
//                   <div className="dropdown">
//                     <button
//                       className="btn border dropdown-toggle d-flex align-items-center gap-2"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                     >
//                       <PiMicrosoftExcelLogoBold
//                         color="green"
//                         size={18}
//                       />
//                       Export
//                     </button>

//                     <ul className="dropdown-menu dropdown-menu-end">

//                       <li>
//                         <button
//                           className="dropdown-item d-flex align-items-center gap-2"
//                           onClick={exportExcel}
//                         >
//                           <PiMicrosoftExcelLogoBold
//                             color="green"
//                             size={18}
//                           />
//                           Export Excel
//                         </button>
//                       </li>

//                       <li>
//                         <button
//                           className="dropdown-item d-flex align-items-center gap-2"
//                           onClick={() =>
//                             alert(
//                               "PDF export can be added here."
//                             )
//                           }
//                         >
//                           <MdOutlinePictureAsPdf
//                             color="red"
//                             size={18}
//                           />
//                           Export PDF
//                         </button>
//                       </li>

//                       <li>
//                         <button
//                           className="dropdown-item d-flex align-items-center gap-2"
//                           onClick={handlePrint}
//                         >
//                           <IoPrintOutline
//                             color="#0d6efd"
//                             size={18}
//                           />
//                           Print
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="card-body">

//                   {/* SELECT ALL */}
//                   <div className="d-flex justify-content-between align-items-center mb-3">

//                     <div className="form-check ms-2">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={isAllCurrentSelected}
//                         onChange={handleSelectAll}
//                       />

//                       <label className="form-check-label ms-2">
//                         Select All
//                       </label>
//                     </div>

//                     <span className="badge bg-success">
//                       {filteredStudents.length} Students
//                     </span>
//                   </div>

//                   {/* TABLE */}
//                   <div className="table-responsive">
//                     <table className="table table-hover align-middle border">
//                       <thead className="table-success">
//                         <tr>
//                           <th>
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               checked={
//                                 isAllCurrentSelected
//                               }
//                               onChange={handleSelectAll}
//                             />
//                           </th>

//                           <th>Adm No.</th>
//                           <th>Student Name</th>
//                           <th>Gender</th>
//                           <th>Class</th>
//                           <th>Current Section</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {currentStudents.length > 0 ? (
//                           currentStudents.map(
//                             (student) => (
//                               <tr key={student.id}>
//                                 <td>
//                                   <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     checked={selectedIds.includes(
//                                       student.id
//                                     )}
//                                     onChange={() =>
//                                       toggleStudent(
//                                         student.id
//                                       )
//                                     }
//                                   />
//                                 </td>

//                                 <td>
//                                   <strong>
//                                     {
//                                       student.admissionNumber
//                                     }
//                                   </strong>
//                                 </td>

//                                 <td>
//                                   {student.firstName}{" "}
//                                   {student.lastName || ""}
//                                 </td>

//                                 <td>
//                                   {student.gender || "-"}
//                                 </td>

//                                 <td>
//                                   {student.studentClass ||
//                                     "-"}
//                                 </td>

//                                 <td>
//                                   <span className="badge bg-light text-dark border">
//                                     {student.section ||
//                                       "-"}
//                                   </span>
//                                 </td>

//                                 <td>
//                                   <span className="badge bg-success">
//                                     {student.status ||
//                                       "ACTIVE"}
//                                   </span>
//                                 </td>
//                               </tr>
//                             )
//                           )
//                         ) : (
//                           <tr>
//                             <td
//                               colSpan="7"
//                               className="text-center py-4"
//                             >
//                               No students found.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* PAGINATION */}
//                   {totalPages > 1 && (
//                     <div className="d-flex justify-content-end mt-3">
//                       {[...Array(totalPages)].map(
//                         (_, index) => (
//                           <button
//                             key={index}
//                             className={`btn mx-1 ${
//                               currentPage === index + 1
//                                 ? "btn-primary"
//                                 : "btn-outline-primary"
//                             }`}
//                             onClick={() =>
//                               setCurrentPage(index + 1)
//                             }
//                           >
//                             {index + 1}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   )}

//                   {/* SUMMARY */}
//                   <div className="alert bg-white border mt-3 d-flex justify-content-between py-2 mb-0">
//                     <span>
//                       Total Students:{" "}
//                       <strong>
//                         {filteredStudents.length}
//                       </strong>
//                     </span>

//                     <span>
//                       Selected Students:{" "}
//                       <strong className="text-success">
//                         {selectedIds.length}
//                       </strong>
//                     </span>
//                   </div>

//                   {/* NOTE */}
//                   <div
//                     className="alert border mt-3 d-flex py-2 mb-0"
//                     style={{
//                       backgroundColor: "#FFF3CD",
//                       color: "#664D03",
//                     }}
//                   >
//                     <small>
//                       <RiErrorWarningFill
//                         size={17}
//                         className="me-1"
//                       />
//                       Select students from the list and
//                       choose the section from the right
//                       panel to assign them.
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= SUMMARY ================= */}
//             <div className="col-12 col-lg-3">
//               <div className="card shadow h-100 border-0">

//                 <div className="card-header bg-white">
//                   <FaUserCheck
//                     className="text-success me-2"
//                   />
//                   <strong>
//                     Assign Section Summary
//                   </strong>
//                 </div>

//                 <div className="card-body">

//                   {/* SESSION */}
//                   <div>
//                     <small className="text-muted">
//                       Session
//                     </small>

//                     <h6 className="text-success mt-1">
//                       {selectedSession || "-"}
//                     </h6>
//                   </div>

//                   {/* CLASS */}
//                   <div className="mt-3">
//                     <small className="text-muted">
//                       Class
//                     </small>

//                     <h6 className="text-success mt-1">
//                       {selectedClass || "-"}
//                     </h6>
//                   </div>

//                   {/* ARROW */}
//                   <div className="text-center my-4">
//                     <span
//                       className="bg-info px-3 py-2 rounded-circle d-inline-flex"
//                     >
//                       <FaArrowRight
//                         className="text-white"
//                       />
//                     </span>
//                   </div>

//                   {/* NEW SECTION */}
//                   <div>
//                     <small className="text-muted">
//                       Assign Section
//                     </small>

//                     <h5 className="text-success mt-1">
//                       {selectedSection || "-"}
//                     </h5>
//                   </div>

//                   {/* SELECTED */}
//                   <div
//                     className="alert text-center mt-4 mb-3"
//                     style={{
//                       backgroundColor: "#FFF3CD",
//                       color: "#664D03",
//                     }}
//                   >
//                     <small>
//                       Selected Students
//                     </small>

//                     <h4 className="mb-0">
//                       {selectedIds.length}
//                     </h4>
//                   </div>

//                   {/* ASSIGN BUTTON */}
//                   <button
//                     className="btn btn-success w-100"
//                     onClick={assignSection}
//                     disabled={
//                       loading ||
//                       selectedIds.length === 0 ||
//                       !selectedSection
//                     }
//                   >
//                     <FaCheck className="me-2" />

//                     {loading
//                       ? "Assigning..."
//                       : "Assign Section"}
//                   </button>

//                   {/* INFO */}
//                   <div
//                     className="alert mt-3 mb-0"
//                     style={{
//                       backgroundColor: "#def0ff",
//                     }}
//                   >
//                     <small>
//                       Selected students will be assigned
//                       to{" "}
//                       <strong>
//                         {selectedClass || "-"}-
//                         {selectedSection || "-"}
//                       </strong>
//                       .
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AssignSection;



import React, { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaUsers,
} from "react-icons/fa6";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { TbRepeat } from "react-icons/tb";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import {
  MdOutlinePictureAsPdf,
  MdOutlineSchool,
} from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { LuUsersRound } from "react-icons/lu";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AssignSection = () => {
  const {
    sessions = [],
    standards = [],
    sections = [],
  } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  /* =========================================================
     STATES
  ========================================================= */

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  /* =========================================================
     STUDENT NAME
  ========================================================= */

  const getStudentName = (student) => {
    const name = `${student?.firstName || ""} ${
      student?.lastName || ""
    }`.trim();

    return name || "-";
  };

  /* =========================================================
     FETCH STUDENTS
     
     Only:
     schoolId + academicYear + studentClass
     
     NO SECTION FILTER
  ========================================================= */

  const fetchStudents = async () => {
    if (!schoolId) {
      alert("School information not found. Please login again.");
      return;
    }

    if (!selectedSession) {
      alert("Please select Academic Year.");
      return;
    }

    if (!selectedClass) {
      alert("Please select Class.");
      return;
    }

    try {
      setLoadingStudents(true);
      setHasSearched(true);

      setSelectedIds([]);
      setCurrentPage(1);

      const response = await axiosInstance.get(
        "/api/sections/students",
        {
          params: {
            schoolId: schoolId,
            academicYear: selectedSession,
            studentClass: selectedClass,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response?.data;

      let studentList = [];

      if (Array.isArray(data)) {
        studentList = data;
      } else if (Array.isArray(data?.students)) {
        studentList = data.students;
      } else if (Array.isArray(data?.content)) {
        studentList = data.content;
      }

      setStudents(studentList);
    } catch (error) {
      console.error("Fetch students error:", error);

      setStudents([]);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to load students.";

      alert(
        typeof message === "string"
          ? message
          : "Failed to load students."
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedClass("");
    setSelectedSection("");

    setSearchText("");

    setStudents([]);
    setSelectedIds([]);

    setCurrentPage(1);
    setHasSearched(false);
  };

  /* =========================================================
     SEARCH FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return students;
    }

    return students.filter((student) => {
      const name = getStudentName(student).toLowerCase();

      const admissionNumber = String(
        student?.admissionNumber || ""
      ).toLowerCase();

      const mobile = String(
        student?.mobile || ""
      ).toLowerCase();

      return (
        name.includes(search) ||
        admissionNumber.includes(search) ||
        mobile.includes(search)
      );
    });
  }, [students, searchText]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  /* =========================================================
     PAGE CORRECTION
  ========================================================= */

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  /* =========================================================
     SELECT / UNSELECT STUDENT
  ========================================================= */

  const toggleStudent = (studentId) => {
    if (!studentId) return;

    setSelectedIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }

      return [...prev, studentId];
    });
  };

  /* =========================================================
     SELECT ALL CURRENT PAGE
  ========================================================= */

  const currentPageIds = currentStudents
    .map((student) => student?.id)
    .filter(Boolean);

  const isCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
      selectedIds.includes(id)
    );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...currentPageIds,
        ]),
      ]);
    } else {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !currentPageIds.includes(id)
        )
      );
    }
  };

  /* =========================================================
     ASSIGN SECTION
  ========================================================= */

  const assignSection = async () => {
    if (!schoolId) {
      alert("School information not found.");
      return;
    }

    if (!selectedSession) {
      alert("Please select Academic Year.");
      return;
    }

    if (!selectedClass) {
      alert("Please select Class.");
      return;
    }

    if (!selectedSection) {
      alert("Please select Assign Section.");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    const selectedStudents = students.filter((student) =>
      selectedIds.includes(student?.id)
    );

    const alreadyInSection = selectedStudents.filter(
      (student) =>
        String(student?.section || "").toUpperCase() ===
        String(selectedSection).toUpperCase()
    );

    if (
      alreadyInSection.length === selectedIds.length
    ) {
      alert(
        `All selected students are already in Section ${selectedSection}.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to assign ${selectedIds.length} selected student(s) to Section ${selectedSection}?`
    );

    if (!confirmed) return;

    try {
      setAssigning(true);

      const payload = {
        studentIds: selectedIds,
        section: selectedSection,
      };

      console.log("Assign Section Payload:", payload);

      const response = await axiosInstance.post(
        `/api/sections/assign?schoolId=${schoolId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response?.data ||
          "Section assigned successfully."
      );

      setSelectedIds([]);

      // Reload students after assignment
      await fetchStudents();
    } catch (error) {
      console.error("Assign section error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to assign section.";

      alert(
        typeof message === "string"
          ? message
          : "Failed to assign section."
      );
    } finally {
      setAssigning(false);
    }
  };

  /* =========================================================
     EXPORT EXCEL
  ========================================================= */

  const exportExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const excelData = filteredStudents.map(
      (student, index) => ({
        "Sl No": index + 1,

        "Admission No":
          student?.admissionNumber || "",

        "Student Name":
          getStudentName(student),

        Gender:
          student?.gender || "",

        "Academic Year":
          student?.academicYear ||
          selectedSession,

        Class:
          student?.studentClass ||
          selectedClass,

        "Current Section":
          student?.section || "-",

        "Assign Section":
          selectedSection || "-",

        Mobile:
          student?.mobile || "",

        Status:
          student?.status || "",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 18 },
      { wch: 28 },
      { wch: 12 },
      { wch: 18 },
      { wch: 15 },
      { wch: 18 },
      { wch: 18 },
      { wch: 16 },
      { wch: 15 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Assign Section"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const fileData = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      fileData,
      "Assign_Section_Report.xlsx"
    );
  };

  /* =========================================================
     EXPORT PDF
  ========================================================= */

  const exportPDF = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to export.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth =
      doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);

    doc.text(
      "School Management System",
      pageWidth / 2,
      15,
      {
        align: "center",
      }
    );

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text(
      "Assign Section Report",
      pageWidth / 2,
      23,
      {
        align: "center",
      }
    );

    doc.setFontSize(9);

    doc.text(
      `Academic Year: ${selectedSession}`,
      14,
      33
    );

    doc.text(
      `Class: ${selectedClass}`,
      90,
      33
    );

    doc.text(
      `Assign Section: ${selectedSection}`,
      165,
      33
    );

    autoTable(doc, {
      startY: 40,

      head: [
        [
          "#",
          "Admission No",
          "Student Name",
          "Gender",
          "Class",
          "Current Section",
          "Assign Section",
          "Mobile",
          "Status",
        ],
      ],

      body: filteredStudents.map(
        (student, index) => [
          index + 1,

          student?.admissionNumber || "",

          getStudentName(student),

          student?.gender || "",

          student?.studentClass ||
            selectedClass ||
            "",

          student?.section || "-",

          selectedSection || "-",

          student?.mobile || "",

          student?.status || "",
        ]
      ),

      theme: "grid",

      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: "center",
        valign: "middle",
      },

      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 249, 255],
      },
    });

    doc.save(
      "Assign_Section_Report.pdf"
    );
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    if (filteredStudents.length === 0) {
      alert("No students available to print.");
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800"
    );

    if (!printWindow) {
      alert("Please allow popups to print.");
      return;
    }

    const rows = filteredStudents
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>

            <td>
              ${student?.admissionNumber || ""}
            </td>

            <td>
              ${getStudentName(student)}
            </td>

            <td>
              ${student?.gender || ""}
            </td>

            <td>
              ${
                student?.studentClass ||
                selectedClass ||
                ""
              }
            </td>

            <td>
              ${student?.section || "-"}
            </td>

            <td>
              ${selectedSection || "-"}
            </td>

            <td>
              ${student?.mobile || ""}
            </td>

            <td>
              ${student?.status || ""}
            </td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <html>

        <head>

          <title>
            Assign Section Report
          </title>

          <style>

            body {
              font-family: Arial, sans-serif;
              padding: 25px;
              color: #000;
            }

            h2,
            h4 {
              text-align: center;
              margin: 5px;
            }

            .filters {
              display: flex;
              justify-content: space-between;
              margin: 25px 0 10px;
              font-size: 14px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }

            th,
            td {
              border: 1px solid #999;
              padding: 8px;
              text-align: center;
              font-size: 12px;
            }

            th {
              background: #2563eb;
              color: white;
            }

            @media print {

              body {
                padding: 10px;
              }

            }

          </style>

        </head>

        <body>

          <h2>
            School Management System
          </h2>

          <h4>
            Assign Section Report
          </h4>

          <div class="filters">

            <span>
              <strong>Academic Year:</strong>
              ${selectedSession}
            </span>

            <span>
              <strong>Class:</strong>
              ${selectedClass}
            </span>

            <span>
              <strong>Assign Section:</strong>
              ${selectedSection}
            </span>

          </div>

          <table>

            <thead>

              <tr>
                <th>#</th>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Current Section</th>
                <th>Assign Section</th>
                <th>Mobile</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>
              ${rows}
            </tbody>

          </table>

          <script>

            window.onload = function () {
              window.print();
              window.close();
            };

          </script>

        </body>

      </html>
    `);

    printWindow.document.close();
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
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
                  <FaUsers size={27} />
                </div>

                <div>

                  <h5 className="mb-1 fw-bold text-dark">
                    Assign Section
                  </h5>

                  <div className="text-muted small">
                    Assign students to a section
                  </div>

                </div>

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
                <MdOutlineSchool className="me-1" />
                Setup
              </span>

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
              Home › Setup ›{" "}
              <span className="text-primary fw-semibold">
                Assign Section
              </span>
            </small>
          </div>

        </div>

      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="ms-2 me-2 mt-3">

        <div className="bg-white rounded-4 shadow p-3">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">

            <div>

              <h6 className="mb-1 fw-semibold">
                <FaUsers
                  className="text-primary me-2"
                  size={15}
                />

                Student Selection
              </h6>

              <small className="text-muted">
                Load students by Academic Year
                and Class
              </small>

            </div>

            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
              Assign Section
            </span>

          </div>

          {/* FIRST ROW */}

          <div className="row g-3">

            {/* ACADEMIC YEAR */}

            <div className="col-12 col-md-4">

              <label className="form-label fw-semibold">
                Academic Year{" "}
                <span className="text-danger">
                  *
                </span>
              </label>

              <select
                className="form-select"
                value={selectedSession}
                onChange={(e) => {

                  setSelectedSession(
                    e.target.value
                  );

                  setSelectedClass("");
                  setSelectedSection("");

                  setStudents([]);
                  setSelectedIds([]);

                  setHasSearched(false);
                  setCurrentPage(1);

                }}
              >

                <option value="">
                  Select Academic Year
                </option>

                {sessions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* CLASS */}

            <div className="col-12 col-md-4">

              <label className="form-label fw-semibold">
                Class{" "}
                <span className="text-danger">
                  *
                </span>
              </label>

              <select
                className="form-select"
                disabled={!selectedSession}
                value={selectedClass}
                onChange={(e) => {

                  setSelectedClass(
                    e.target.value
                  );

                  setSelectedSection("");

                  setStudents([]);
                  setSelectedIds([]);

                  setHasSearched(false);
                  setCurrentPage(1);

                }}
              >

                <option value="">
                  Select Class
                </option>

                {standards.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* LOAD */}

            <div className="col-12 col-md-4 d-flex align-items-end">

              <button
                className="btn btn-primary w-100"
                onClick={fetchStudents}
                disabled={
                  loadingStudents ||
                  !selectedSession ||
                  !selectedClass
                }
              >

                {loadingStudents ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                    />
                    Loading Students...
                  </>
                ) : (
                  <>
                    <IoSearchOutline
                      size={18}
                      className="me-1"
                    />
                    Load Students
                  </>
                )}

              </button>

            </div>

          </div>

          {/* SECOND ROW */}

          <div className="row g-3 mt-1">

            {/* ASSIGN SECTION */}

            <div className="col-12 col-md-4">

              <label className="form-label fw-semibold">
                Assign Section{" "}
                <span className="text-danger">
                  *
                </span>
              </label>

              <select
                className="form-select"
                disabled={
                  !selectedClass ||
                  !hasSearched
                }
                value={selectedSection}
                onChange={(e) =>
                  setSelectedSection(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Section
                </option>

                {sections.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* SEARCH */}

            <div className="col-12 col-md-5">

              <label className="form-label fw-semibold">
                Search Student
              </label>

              <div className="input-group">

                <span className="input-group-text bg-white">
                  <IoSearchOutline className="text-muted" />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by admission no., name or mobile..."
                  value={searchText}
                  onChange={(e) => {

                    setSearchText(
                      e.target.value
                    );

                    setCurrentPage(1);

                  }}
                />

              </div>

            </div>

            {/* RESET */}

            <div className="col-12 col-md-3 d-flex align-items-end">

              <button
                className="btn btn-outline-dark w-100"
                onClick={handleReset}
              >
                <TbRepeat
                  size={18}
                  className="me-1"
                />
                Reset
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loadingStudents && (

        <div className="ms-2 me-2 mt-4 bg-white rounded-4 shadow p-5 text-center">

          <div
            className="spinner-border text-primary"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />

          <div className="mt-3 text-muted">
            Loading students...
          </div>

        </div>

      )}

      {/* =====================================================
          BEFORE SEARCH
      ===================================================== */}

      {!loadingStudents &&
        !hasSearched && (

          <div className="ms-2 me-2 mt-4 bg-white rounded-4 shadow p-5 text-center">

            <div
              className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
              style={{
                width: "64px",
                height: "64px",
                backgroundColor:
                  "#eff6ff",
              }}
            >

              <LuUsersRound
                size={30}
                className="text-primary"
              />

            </div>

            <h6 className="fw-semibold">
              Load Student Data
            </h6>

            <small className="text-muted">
              Select Academic Year and Class,
              then click{" "}
              <strong className="text-primary">
                Load Students
              </strong>
              .
            </small>

          </div>

        )}

      {/* =====================================================
          STUDENT DATA
      ===================================================== */}

      {!loadingStudents &&
        hasSearched && (

          <div className="container-fluid mt-4 px-2">

            <div className="row g-3">

              {/* =================================================
                  TABLE
              ================================================= */}

              <div className="col-12 col-xl-9">

                <div className="bg-white rounded-4 shadow p-3 h-100">

                  {/* TABLE HEADER */}

                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">

                    <div>

                      <h6 className="mb-1 fw-semibold">

                        <LuUsersRound
                          className="text-primary me-2"
                          size={18}
                        />

                        Student List

                      </h6>

                      <small className="text-muted">

                        {selectedSession}
                        {" | "}
                        {selectedClass}

                      </small>

                    </div>

                    <div className="d-flex gap-2">

                      <span className="badge bg-primary-subtle text-primary">
                        {filteredStudents.length} Students
                      </span>

                      <span className="badge bg-primary">
                        {selectedIds.length} Selected
                      </span>

                    </div>

                  </div>

                  {/* ACTION BAR */}

                  <div
                    className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-2 rounded border"
                    style={{
                      backgroundColor:
                        "#f8f9fa",
                    }}
                  >

                    <div className="form-check mb-0 ms-1">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAllStudents"
                        checked={
                          isCurrentPageSelected
                        }
                        onChange={
                          handleSelectAll
                        }
                        disabled={
                          currentStudents.length ===
                          0
                        }
                      />

                      <label
                        htmlFor="selectAllStudents"
                        className="form-check-label fw-semibold"
                      >
                        Select All
                      </label>

                    </div>

                    <div className="d-flex align-items-center gap-2 flex-wrap">

                      <small className="text-muted">

                        Showing{" "}

                        <strong>
                          {filteredStudents.length
                            ? indexOfFirstStudent +
                              1
                            : 0}
                        </strong>

                        {" - "}

                        <strong>
                          {Math.min(
                            indexOfLastStudent,
                            filteredStudents.length
                          )}
                        </strong>

                        {" of "}

                        <strong>
                          {
                            filteredStudents.length
                          }
                        </strong>

                      </small>

                      {/* EXPORT */}

                      <div className="dropdown">

                        <button
                          className="btn btn-sm btn-light border dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          Export
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end shadow">

                          <li>

                            <button
                              className="dropdown-item"
                              onClick={
                                exportExcel
                              }
                            >

                              <PiMicrosoftExcelLogoBold
                                className="me-2 text-primary"
                                size={18}
                              />

                              Export Excel

                            </button>

                          </li>

                          <li>

                            <button
                              className="dropdown-item"
                              onClick={
                                exportPDF
                              }
                            >

                              <MdOutlinePictureAsPdf
                                className="me-2 text-danger"
                                size={18}
                              />

                              Export PDF

                            </button>

                          </li>

                          <li>

                            <button
                              className="dropdown-item"
                              onClick={
                                handlePrint
                              }
                            >

                              <IoPrintOutline
                                className="me-2 text-primary"
                                size={18}
                              />

                              Print

                            </button>

                          </li>

                        </ul>

                      </div>

                    </div>

                  </div>

                  {/* TABLE */}

                  <div className="table-responsive mt-3">

                    <table className="table table-bordered table-hover align-middle mb-0">

                      <thead className="table-light">

                        <tr>

                          <th
                            className="text-center"
                            style={{
                              width: "55px",
                            }}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                isCurrentPageSelected
                              }
                              onChange={
                                handleSelectAll
                              }
                            />
                          </th>

                          <th className="text-center">
                            #
                          </th>

                          <th>
                            Admission No
                          </th>

                          <th>
                            Student Name
                          </th>

                          <th className="text-center">
                            Gender
                          </th>

                          <th className="text-center">
                            Class
                          </th>

                          <th className="text-center">
                            Current Section
                          </th>

                          <th className="text-center">
                            Status
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {currentStudents.length >
                        0 ? (

                          currentStudents.map(
                            (
                              student,
                              index
                            ) => {

                              const isSelected =
                                selectedIds.includes(
                                  student?.id
                                );

                              return (

                                <tr
                                  key={
                                    student?.id ||
                                    student?.admissionNumber
                                  }
                                  style={{
                                    backgroundColor:
                                      isSelected
                                        ? "#eff6ff"
                                        : undefined,
                                  }}
                                >

                                  <td className="text-center">

                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      checked={
                                        isSelected
                                      }
                                      onChange={() =>
                                        toggleStudent(
                                          student?.id
                                        )
                                      }
                                    />

                                  </td>

                                  <td className="text-center text-muted">

                                    {indexOfFirstStudent +
                                      index +
                                      1}

                                  </td>

                                  <td>

                                    <span className="fw-semibold">

                                      {
                                        student?.admissionNumber
                                      }

                                    </span>

                                  </td>

                                  <td>

                                    <div className="fw-semibold">
                                      {getStudentName(
                                        student
                                      )}
                                    </div>

                                    {isSelected && (
                                      <small className="text-primary">
                                        Selected
                                      </small>
                                    )}

                                  </td>

                                  <td className="text-center">

                                    {student?.gender ||
                                      "-"}

                                  </td>

                                  <td className="text-center">

                                    <span className="badge bg-light text-dark border">

                                      {student?.studentClass ||
                                        selectedClass}

                                    </span>

                                  </td>

                                  <td className="text-center">

                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">

                                      {student?.section ||
                                        "Not Assigned"}

                                    </span>

                                  </td>

                                  <td className="text-center">

                                    <span
                                      className={`badge ${
                                        String(
                                          student?.status ||
                                            "ACTIVE"
                                        ).toUpperCase() ===
                                        "ACTIVE"
                                          ? "bg-primary"
                                          : "bg-secondary"
                                      }`}
                                    >

                                      {student?.status ||
                                        "ACTIVE"}

                                    </span>

                                  </td>

                                </tr>

                              );
                            }
                          )

                        ) : (

                          <tr>

                            <td
                              colSpan="8"
                              className="text-center py-5"
                            >

                              <LuUsersRound
                                size={40}
                                className="text-muted mb-2"
                              />

                              <div className="fw-semibold text-muted">
                                No students found
                              </div>

                              <small className="text-muted">
                                No students found for
                                the selected Academic
                                Year and Class.
                              </small>

                            </td>

                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>

                  {/* PAGINATION */}

                  {totalPages > 1 && (

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">

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

                      <div className="d-flex gap-1 flex-wrap">

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          disabled={
                            currentPage === 1
                          }
                          onClick={() =>
                            setCurrentPage(
                              (prev) =>
                                prev - 1
                            )
                          }
                        >
                          Previous
                        </button>

                        {Array.from(
                          {
                            length: totalPages,
                          },
                          (_, index) => (
                            <button
                              key={index}
                              className={`btn btn-sm ${
                                currentPage ===
                                index + 1
                                  ? "btn-primary"
                                  : "btn-outline-primary"
                              }`}
                              onClick={() =>
                                setCurrentPage(
                                  index + 1
                                )
                              }
                            >
                              {index + 1}
                            </button>
                          )
                        )}

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          disabled={
                            currentPage ===
                            totalPages
                          }
                          onClick={() =>
                            setCurrentPage(
                              (prev) =>
                                prev + 1
                            )
                          }
                        >
                          Next
                        </button>

                      </div>

                    </div>

                  )}

                  {/* WARNING */}

                  <div
                    className="alert border mt-3 mb-0 d-flex align-items-start py-2"
                    style={{
                      backgroundColor:
                        "#fff9e6",
                      color: "#664d03",
                    }}
                  >

                    <RiErrorWarningFill
                      size={18}
                      className="me-2 mt-1"
                    />

                    <small>

                      Select the students whose
                      section you want to change.
                      Then select the target section
                      from{" "}
                      <strong>
                        Assign Section
                      </strong>
                      {" "}above.

                    </small>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="col-12 col-xl-3">

                <div className="bg-white rounded-4 shadow p-3 h-100">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <div>

                      <h6 className="mb-1 fw-semibold">

                        <FaUsers
                          className="text-primary me-2"
                        />

                        Assignment Summary

                      </h6>

                      <small className="text-muted">
                        Review before assigning
                      </small>

                    </div>

                  </div>

                  {/* SESSION */}

                  <div
                    className="rounded border p-3"
                    style={{
                      backgroundColor:
                        "#f8f9fa",
                    }}
                  >

                    <small className="text-muted">
                      Academic Year
                    </small>

                    <div className="fw-semibold mt-1">
                      {selectedSession || "-"}
                    </div>

                  </div>

                  {/* CLASS */}

                  <div
                    className="rounded border p-3 mt-2"
                    style={{
                      backgroundColor:
                        "#f8f9fa",
                    }}
                  >

                    <small className="text-muted">
                      Class
                    </small>

                    <div className="fw-semibold mt-1">
                      {selectedClass || "-"}
                    </div>

                  </div>

                  {/* ARROW */}

                  <div className="text-center py-3">

                    <div className="d-flex align-items-center gap-2">

                      <div
                        style={{
                          height: "1px",
                          background:
                            "#dee2e6",
                          flex: 1,
                        }}
                      />

                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "38px",
                          height: "38px",
                          background:
                            "#2563eb",
                        }}
                      >

                        <FaArrowRight
                          size={15}
                          className="text-white"
                        />

                      </div>

                      <div
                        style={{
                          height: "1px",
                          background:
                            "#dee2e6",
                          flex: 1,
                        }}
                      />

                    </div>

                  </div>

                  {/* TARGET SECTION */}

                  <div
                    className="rounded border p-3"
                    style={{
                      background:
                        "linear-gradient(135deg,#eff6ff,#ffffff)",
                      borderColor:
                        "#bfdbfe",
                    }}
                  >

                    <small className="text-muted">
                      Assign To Section
                    </small>

                    <div className="fw-bold text-primary mt-1 fs-5">

                      {selectedSection ||
                        "Not Selected"}

                    </div>

                  </div>

                  {/* SELECTED */}

                  <div
                    className="mt-3 p-3 rounded text-center"
                    style={{
                      background:
                        "linear-gradient(135deg,#eff6ff,#ffffff)",
                      border:
                        "1px solid #dbeafe",
                    }}
                  >

                    <small className="text-muted">
                      Selected Students
                    </small>

                    <div
                      className="fw-bold text-primary mt-1"
                      style={{
                        fontSize: "30px",
                        lineHeight: "1",
                      }}
                    >
                      {selectedIds.length}
                    </div>

                    <small className="text-muted">
                      students
                    </small>

                  </div>

                  {/* ASSIGN */}

                  <button
                    className="btn btn-primary w-100 mt-3 py-2"
                    onClick={assignSection}
                    disabled={
                      assigning ||
                      selectedIds.length ===
                        0 ||
                      !selectedSection
                    }
                  >

                    {assigning ? (

                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                        />

                        Assigning...

                      </>

                    ) : (

                      <>
                        <FaCheck className="me-2" />

                        Assign Section

                      </>

                    )}

                  </button>

                  {/* INFO */}

                  <div
                    className="mt-3 rounded border p-3"
                    style={{
                      backgroundColor:
                        "#f8f9fa",
                    }}
                  >

                    <div className="d-flex align-items-start">

                      <RiErrorWarningFill
                        className="text-primary me-2 mt-1"
                        size={17}
                      />

                      <small className="text-muted">

                        <strong>
                          {selectedIds.length}
                        </strong>{" "}
                        student(s) will be assigned
                        to Section{" "}

                        <strong className="text-primary">
                          {selectedSection ||
                            "-"}
                        </strong>
                        .

                      </small>

                    </div>

                  </div>

                  {/* STATS */}

                  <div className="row g-2 mt-2">

                    <div className="col-6">

                      <div className="border rounded p-2 text-center">

                        <small className="text-muted d-block">
                          Available
                        </small>

                        <strong>
                          {
                            filteredStudents.length
                          }
                        </strong>

                      </div>

                    </div>

                    <div className="col-6">

                      <div className="border rounded p-2 text-center">

                        <small className="text-muted d-block">
                          Selected
                        </small>

                        <strong className="text-primary">
                          {
                            selectedIds.length
                          }
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

    </>
  );
};

export default AssignSection;