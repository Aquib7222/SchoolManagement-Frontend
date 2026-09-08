
// import React, { useState } from "react";
// import { FaList, FaRedo, FaSearch, FaUsers } from "react-icons/fa";
// import { FaBookAtlas } from "react-icons/fa6";
// import { MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const TransferCertificates = () => {
//   const token = localStorage.getItem("token");
//   const { sessions, standards, sections } = useMasters();
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [showTCModal, setShowTCModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const [tcForm, setTcForm] = useState({
//     dateOfLeaving: "",
//     reasonForLeaving: "",
//     conduct: "Good",
//     remarks: "",
//   });

//   const handleSearch = async () => {
//     try {
//       setSearchLoading(true);

//       const res = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: selectedSession || null,
//           studentClass: selectedStandard || null,
//           section: selectedSection || null,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("API RESPONSE:", res);
//       console.log("API DATA:", res.data);

//       const list = res.data.filter((item) => item.status === "INACTIVE");

//       setStudents(list);
//     } catch (error) {
//       console.error("Student Search Error:", error);
//       setStudents([]);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   console.log("students", students);

//   const handleReset = () => {
//     setSearchLoading(false);
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedSection("");
//   };

//   return (
//     <>
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
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaBookAtlas size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Transfer Certificate
//                   </h5>

//                   <div className="text-muted small">
//                     Dashboard &nbsp;/ &nbsp; Transfer Certificate
//                   </div>
//                 </div>
//               </div>

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
//                   TC
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; TC &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Transfer Certificate
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       <div className="mx-2 mt-2 mb-3">
//         <div className="card shadow rounded-4 p-2 border-0 overflow-hidden">
//           <div
//             className="card-header bg-white border-0 p-3"
//             style={{
//               borderBottom: "1px solid #eef0f2",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaSearch size={20} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">Student Filter</h6>

//                   <small className="lh-1 text-muted mt-1">
//                     Filter students by academic year, class and section
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaUsers className="me-1" />
//                 Student Search
//               </span>
//             </div>
//           </div>
//           <div className="card-body p-4">
//             <div className="row g-3">
//               {/* ACADEMIC YEAR */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">Academic Year</label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) => setSelectedSession(e.target.value)}
//                 >
//                   <option value="">All Academic Years</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">Standard</label>

//                 <select
//                   className="form-select"
//                   value={selectedStandard}
//                   onChange={(e) => setSelectedStandard(e.target.value)}
//                 >
//                   <option value="">All Standards</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item === "NURSERY" ? "Nursery" : item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">Section</label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) => setSelectedSection(e.target.value)}
//                 >
//                   <option value="">All Sections</option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* BUTTONS */}

//               <div className="col-xl-3 col-md-6 d-flex align-items-end">
//                 <div className="d-flex gap-2 w-100">
//                   <button
//                     className="btn btn-primary rounded-3 flex-grow-1"
//                     onClick={handleSearch}
//                     disabled={searchLoading}
//                   >
//                     {searchLoading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                         />
//                         Searching...
//                       </>
//                     ) : (
//                       <>
//                         <FaSearch className="me-2" />
//                         Search
//                       </>
//                     )}
//                   </button>

//                   <button
//                     className="btn btn-outline-secondary rounded-3 px-3"
//                     onClick={handleReset}
//                     title="Reset Filters"
//                   >
//                     <FaRedo />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mx-2 mt-2 mb-3">
//         <div className="card shadow rounded-4 p-2 border-0 overflow-hidden">
//           <div
//             className="card-header bg-white border-0 p-3"
//             style={{
//               borderBottom: "1px solid #eef0f2",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaList size={20} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">Student Filter</h6>

//                   <small className="lh-1 text-muted mt-1">
//                     Discontinued students and their transfer certificate status
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaUsers className="me-1" />
//                 Transfer Certificate
//               </span>
//             </div>
//           </div>
//           <div className="card-body p-4">
//             <div className="table-responsive">
//               <table className="table tc-premium-table align-middle mb-0">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Admission No.</th>
//                     <th>Student</th>
//                     <th>Class</th>
//                     <th>Section</th>
//                     <th>Date of Leaving</th>
//                     <th>Status</th>
//                     <th className="text-center">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {students.length > 0 ? (
//                     students.map((student, index) => (
//                       <tr key={student.id || student.admissionNumber}>
//                         <td>
//                           <span className="serial-no">{index + 1}</span>
//                         </td>

//                         <td>
//                           <span className="admission-no">
//                             {student.admissionNumber || "-"}
//                           </span>
//                         </td>

//                         <td>
//                           <div className="student-info">
//                             <div className="student-avatar">
//                               {student.firstName?.charAt(0)?.toUpperCase() ||
//                                 "S"}
//                             </div>

//                             <div>
//                               <div className="student-name">
//                                 {[
//                                   student.firstName,
//                                   student.middleName,
//                                   student.lastName,
//                                 ]
//                                   .filter(Boolean)
//                                   .join(" ")}
//                               </div>

//                               <div className="student-email">
//                                 {student.email || "No email"}
//                               </div>
//                             </div>
//                           </div>
//                         </td>

//                         <td>
//                           <span className="class-badge">
//                             {student.studentClass || "-"}
//                           </span>
//                         </td>

//                         <td>
//                           <span className="section-text">
//                             {student.section || "-"}
//                           </span>
//                         </td>

//                         <td>
//                           <div className="leaving-date">
//                             <i className="fa-regular fa-calendar"></i>
//                             {student.discontinueDate || "-"}
//                           </div>
//                         </td>

//                         <td>
//                           <span className="inactive-badge">
//                             <span className="status-dot"></span>
//                             Discontinued
//                           </span>
//                         </td>

//                         <td className="text-center">
//                           {student.tcGenerated ? (
//                             <button
//                               type="button"
//                               className="tc-action-btn view-btn"
//                               onClick={() => handleViewTC(student)}
//                             >
//                               <i className="fa-regular fa-eye"></i>
//                               View TC
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               className="tc-action-btn generate-btn"
//                               onClick={() => {
//                                 setSelectedStudent(student);

//                                 setTcForm({
//                                   dateOfLeaving: student.discontinueDate || "",
//                                   reasonForLeaving: "",
//                                   conduct: "Good",
//                                   remarks: "",
//                                 });

//                                 setShowTCModal(true);
//                               }}
//                             >
//                               <i className="fa-solid fa-file-circle-plus"></i>
//                               Generate TC
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="8">
//                         <div className="empty-tc-state">
//                           <div className="empty-icon">
//                             <i className="fa-regular fa-folder-open"></i>
//                           </div>

//                           <h6>No discontinued students found</h6>
//                           <p>
//                             Students discontinued from the school will appear
//                             here.
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {showTCModal && selectedStudent && (
//   <div
//     className="tc-modal-overlay"
//     onClick={() => setShowTCModal(false)}
//   >
//     <div
//       className="tc-modal"
//       onClick={(e) => e.stopPropagation()}
//     >

//       {/* Header */}
//       <div className="tc-modal-header">
//         <div className="tc-modal-title-area">
//           <div className="tc-modal-icon">
//             <i className="fa-solid fa-file-certificate"></i>
//           </div>

//           <div>
//             <h5>Generate Transfer Certificate</h5>
//             <p>
//               Create TC for discontinued student
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           className="tc-modal-close"
//           onClick={() => setShowTCModal(false)}
//         >
//           <i className="fa-solid fa-xmark"></i>
//         </button>
//       </div>

//       {/* Student Information */}
//       <div className="tc-student-preview">

//         <div className="tc-preview-avatar">
//           {selectedStudent.firstName
//             ?.charAt(0)
//             ?.toUpperCase() || "S"}
//         </div>

//         <div className="tc-preview-info">
//           <h6>
//             {[
//               selectedStudent.firstName,
//               selectedStudent.middleName,
//               selectedStudent.lastName,
//             ]
//               .filter(Boolean)
//               .join(" ")}
//           </h6>

//           <div className="tc-preview-details">
//             <span>
//               <strong>Admission:</strong>{" "}
//               {selectedStudent.admissionNumber || "-"}
//             </span>

//             <span>
//               <strong>Class:</strong>{" "}
//               {selectedStudent.studentClass || "-"}
//             </span>

//             <span>
//               <strong>Section:</strong>{" "}
//               {selectedStudent.section || "-"}
//             </span>
//           </div>
//         </div>

//         <span className="tc-discontinued-label">
//           Discontinued
//         </span>
//       </div>

//       {/* Form */}
//       <div className="tc-modal-body">

//         <div className="tc-form-row">

//           <div className="tc-form-group">
//             <label>
//               Date of Leaving
//               <span>*</span>
//             </label>

//             <input
//               type="date"
//               value={tcForm.dateOfLeaving}
//               onChange={(e) =>
//                 setTcForm({
//                   ...tcForm,
//                   dateOfLeaving: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div className="tc-form-group">
//             <label>
//               Reason for Leaving
//               <span>*</span>
//             </label>

//             <select
//               value={tcForm.reasonForLeaving}
//               onChange={(e) =>
//                 setTcForm({
//                   ...tcForm,
//                   reasonForLeaving: e.target.value,
//                 })
//               }
//             >
//               <option value="">
//                 Select reason
//               </option>
//               <option value="Parent Request">
//                 Parent Request
//               </option>
//               <option value="Transfer to Another School">
//                 Transfer to Another School
//               </option>
//               <option value="Family Relocation">
//                 Family Relocation
//               </option>
//               <option value="Completed Schooling">
//                 Completed Schooling
//               </option>
//               <option value="Other">
//                 Other
//               </option>
//             </select>
//           </div>

//         </div>

//         <div className="tc-form-row">

//           <div className="tc-form-group">
//             <label>Conduct</label>

//             <select
//               value={tcForm.conduct}
//               onChange={(e) =>
//                 setTcForm({
//                   ...tcForm,
//                   conduct: e.target.value,
//                 })
//               }
//             >
//               <option value="Excellent">
//                 Excellent
//               </option>
//               <option value="Very Good">
//                 Very Good
//               </option>
//               <option value="Good">
//                 Good
//               </option>
//               <option value="Satisfactory">
//                 Satisfactory
//               </option>
//             </select>
//           </div>

//           <div className="tc-form-group">
//             <label>Last Class Attended</label>

//             <input
//               type="text"
//               value={selectedStudent.studentClass || ""}
//               readOnly
//             />
//           </div>

//         </div>

//         <div className="tc-form-group">
//           <label>Remarks</label>

//           <textarea
//             rows="3"
//             placeholder="Enter any additional remarks..."
//             value={tcForm.remarks}
//             onChange={(e) =>
//               setTcForm({
//                 ...tcForm,
//                 remarks: e.target.value,
//               })
//             }
//           />
//         </div>

//       </div>

//       {/* Footer */}
//       <div className="tc-modal-footer">

//         <button
//           type="button"
//           className="tc-cancel-btn"
//           onClick={() => setShowTCModal(false)}
//         >
//           Cancel
//         </button>

//         <button
//           type="button"
//           className="tc-confirm-btn"
//           onClick={() => handleGenerateTC(selectedStudent)}
//         >
//           <i className="fa-solid fa-file-circle-check"></i>
//           Generate TC
//         </button>

//       </div>

//     </div>
//   </div>
// )}
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//     .tc-table-card {
//       background: #ffffff;
//       border: 1px solid #e9edf5;
//       border-radius: 18px;
//       overflow: hidden;
//       box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
//     }

//     .tc-table-header {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 22px 24px;
//       border-bottom: 1px solid #edf0f5;
//     }

//     .tc-table-header h5 {
//       margin: 0;
//       font-size: 18px;
//       font-weight: 700;
//       color: #172033;
//     }

//     .tc-table-header p {
//       margin: 5px 0 0;
//       font-size: 13px;
//       color: #8a94a6;
//     }

//     .student-count {
//       padding: 7px 13px;
//       border-radius: 20px;
//       background: #f0f6ff;
//       color: #2563eb;
//       font-size: 12px;
//       font-weight: 700;
//     }

//     .tc-premium-table {
//       min-width: 1050px;
//     }

//     .tc-premium-table thead th {
//       background: #f8fafc;
//       color: #64748b;
//       font-size: 11px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: .5px;
//       padding: 15px 18px;
//       border-bottom: 1px solid #e9edf5;
//       white-space: nowrap;
//     }

//     .tc-premium-table tbody td {
//       padding: 17px 18px;
//       border-bottom: 1px solid #f0f2f6;
//       color: #334155;
//       font-size: 13px;
//     }

//     .tc-premium-table tbody tr {
//       transition: all .2s ease;
//     }

//     .tc-premium-table tbody tr:hover {
//       background: #f8fbff;
//     }

//     .tc-premium-table tbody tr:last-child td {
//       border-bottom: none;
//     }

//     .serial-no {
//       color: #94a3b8;
//       font-weight: 600;
//     }

//     .admission-no {
//       color: #2563eb;
//       font-weight: 700;
//       font-size: 13px;
//     }

//     .student-info {
//       display: flex;
//       align-items: center;
//       gap: 11px;
//     }

//     .student-avatar {
//       width: 38px;
//       height: 38px;
//       min-width: 38px;
//       border-radius: 11px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: linear-gradient(135deg, #e8f1ff, #dbeafe);
//       color: #2563eb;
//       font-size: 14px;
//       font-weight: 700;
//     }

//     .student-name {
//       font-size: 13px;
//       font-weight: 700;
//       color: #1e293b;
//     }

//     .student-email {
//       margin-top: 3px;
//       font-size: 11px;
//       color: #94a3b8;
//     }

//     .class-badge {
//       display: inline-flex;
//       padding: 5px 10px;
//       border-radius: 7px;
//       background: #f1f5f9;
//       color: #475569;
//       font-size: 11px;
//       font-weight: 700;
//     }

//     .section-text {
//       font-weight: 600;
//       color: #475569;
//     }

//     .leaving-date {
//       display: flex;
//       align-items: center;
//       gap: 7px;
//       color: #64748b;
//       white-space: nowrap;
//     }

//     .leaving-date i {
//       color: #94a3b8;
//     }

//     .inactive-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//       padding: 6px 10px;
//       border-radius: 20px;
//       background: #fff7ed;
//       color: #c2410c;
//       font-size: 11px;
//       font-weight: 700;
//     }

//     .status-dot {
//       width: 6px;
//       height: 6px;
//       border-radius: 50%;
//       background: #f97316;
//     }

//     .tc-action-btn {
//       border: none;
//       border-radius: 9px;
//       padding: 8px 13px;
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//       gap: 7px;
//       font-size: 12px;
//       font-weight: 700;
//       cursor: pointer;
//       transition: all .2s ease;
//     }

//     .generate-btn {
//       background: #2563eb;
//       color: #fff;
//       box-shadow: 0 4px 12px rgba(37, 99, 235, .20);
//     }

//     .generate-btn:hover {
//       background: #1d4ed8;
//       transform: translateY(-1px);
//     }

//     .view-btn {
//       background: #ecfdf5;
//       color: #059669;
//       border: 1px solid #d1fae5;
//     }

//     .view-btn:hover {
//       background: #d1fae5;
//       transform: translateY(-1px);
//     }

//     .empty-tc-state {
//       text-align: center;
//       padding: 65px 20px;
//     }

//     .empty-icon {
//       width: 58px;
//       height: 58px;
//       margin: 0 auto 15px;
//       border-radius: 15px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f1f5f9;
//       color: #94a3b8;
//       font-size: 23px;
//     }

//     .empty-tc-state h6 {
//       margin-bottom: 5px;
//       color: #334155;
//       font-weight: 700;
//     }

//     .empty-tc-state p {
//       margin: 0;
//       color: #94a3b8;
//       font-size: 12px;
//     }
//       .tc-modal-overlay {
//       position: fixed;
//       inset: 0;
//       background: rgba(15, 23, 42, 0.55);
//       backdrop-filter: blur(5px);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 20px;
//       z-index: 9999;
//       animation: tcFadeIn .2s ease;
//     }

//     @keyframes tcFadeIn {
//       from {
//         opacity: 0;
//       }

//       to {
//         opacity: 1;
//       }
//     }

//     .tc-modal {
//       width: 100%;
//       max-width: 720px;
//       background: #ffffff;
//       border-radius: 20px;
//       overflow: hidden;
//       box-shadow: 0 25px 70px rgba(15, 23, 42, 0.20);
//       animation: tcModalIn .25s ease;
//     }

//     @keyframes tcModalIn {
//       from {
//         opacity: 0;
//         transform: translateY(15px) scale(.98);
//       }

//       to {
//         opacity: 1;
//         transform: translateY(0) scale(1);
//       }
//     }

//     .tc-modal-header {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 22px 24px;
//       border-bottom: 1px solid #edf0f5;
//     }

//     .tc-modal-title-area {
//       display: flex;
//       align-items: center;
//       gap: 13px;
//     }

//     .tc-modal-icon {
//       width: 44px;
//       height: 44px;
//       border-radius: 12px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #eff6ff;
//       color: #2563eb;
//       font-size: 18px;
//     }

//     .tc-modal-header h5 {
//       margin: 0;
//       color: #172033;
//       font-size: 17px;
//       font-weight: 700;
//     }

//     .tc-modal-header p {
//       margin: 4px 0 0;
//       color: #94a3b8;
//       font-size: 12px;
//     }

//     .tc-modal-close {
//       width: 34px;
//       height: 34px;
//       border: none;
//       border-radius: 9px;
//       background: #f8fafc;
//       color: #64748b;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//       transition: .2s;
//     }

//     .tc-modal-close:hover {
//       background: #fee2e2;
//       color: #dc2626;
//     }

//     .tc-student-preview {
//       margin: 20px 24px 5px;
//       padding: 15px;
//       border: 1px solid #e8edf5;
//       background: #f8fbff;
//       border-radius: 13px;
//       display: flex;
//       align-items: center;
//       gap: 12px;
//     }

//     .tc-preview-avatar {
//       width: 43px;
//       height: 43px;
//       min-width: 43px;
//       border-radius: 12px;
//       background: linear-gradient(
//         135deg,
//         #dbeafe,
//         #eff6ff
//       );
//       color: #2563eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-weight: 700;
//     }

//     .tc-preview-info {
//       flex: 1;
//     }

//     .tc-preview-info h6 {
//       margin: 0 0 5px;
//       color: #1e293b;
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .tc-preview-details {
//       display: flex;
//       gap: 15px;
//       flex-wrap: wrap;
//       color: #64748b;
//       font-size: 11px;
//     }

//     .tc-preview-details strong {
//       color: #475569;
//     }

//     .tc-discontinued-label {
//       padding: 6px 9px;
//       border-radius: 20px;
//       background: #fff7ed;
//       color: #c2410c;
//       font-size: 10px;
//       font-weight: 700;
//       white-space: nowrap;
//     }

//     .tc-modal-body {
//       padding: 20px 24px;
//     }

//     .tc-form-row {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 16px;
//       margin-bottom: 16px;
//     }

//     .tc-form-group {
//       margin-bottom: 16px;
//     }

//     .tc-form-row .tc-form-group {
//       margin-bottom: 0;
//     }

//     .tc-form-group label {
//       display: block;
//       margin-bottom: 7px;
//       color: #334155;
//       font-size: 12px;
//       font-weight: 700;
//     }

//     .tc-form-group label span {
//       color: #ef4444;
//       margin-left: 3px;
//     }

//     .tc-form-group input,
//     .tc-form-group select,
//     .tc-form-group textarea {
//       width: 100%;
//       border: 1px solid #dfe5ee;
//       border-radius: 9px;
//       padding: 10px 12px;
//       color: #334155;
//       background: #ffffff;
//       font-size: 12px;
//       outline: none;
//       transition: .2s;
//       box-sizing: border-box;
//     }

//     .tc-form-group input:focus,
//     .tc-form-group select:focus,
//     .tc-form-group textarea:focus {
//       border-color: #60a5fa;
//       box-shadow: 0 0 0 3px rgba(37, 99, 235, .08);
//     }

//     .tc-form-group input[readonly] {
//       background: #f8fafc;
//       color: #64748b;
//     }

//     .tc-form-group textarea {
//       resize: vertical;
//       min-height: 75px;
//     }

//     .tc-modal-footer {
//       padding: 16px 24px;
//       border-top: 1px solid #edf0f5;
//       display: flex;
//       align-items: center;
//       justify-content: flex-end;
//       gap: 10px;
//       background: #fafbfc;
//     }

//     .tc-cancel-btn,
//     .tc-confirm-btn {
//       border: none;
//       border-radius: 9px;
//       padding: 10px 16px;
//       font-size: 12px;
//       font-weight: 700;
//       cursor: pointer;
//       transition: .2s;
//     }

//     .tc-cancel-btn {
//       background: #f1f5f9;
//       color: #475569;
//     }

//     .tc-cancel-btn:hover {
//       background: #e2e8f0;
//     }

//     .tc-confirm-btn {
//       background: #2563eb;
//       color: #ffffff;
//       box-shadow: 0 4px 12px rgba(37, 99, 235, .20);
//       display: inline-flex;
//       align-items: center;
//       gap: 8px;
//     }

//     .tc-confirm-btn:hover {
//       background: #1d4ed8;
//       transform: translateY(-1px);
//     }

//     @media (max-width: 600px) {

//       .tc-modal-overlay {
//         padding: 10px;
//       }

//       .tc-modal {
//         max-height: 95vh;
//         overflow-y: auto;
//       }

//       .tc-form-row {
//         grid-template-columns: 1fr;
//         gap: 0;
//       }

//       .tc-student-preview {
//         align-items: flex-start;
//       }

//       .tc-discontinued-label {
//         display: none;
//       }

//       .tc-preview-details {
//         flex-direction: column;
//         gap: 3px;
//       }
//         }

//     @media (max-width: 768px) {
//       .tc-table-header {
//         padding: 18px;
//       }

//       .tc-table-header h5 {
//         font-size: 16px;
//       }

//       .student-count {
//         font-size: 11px;
//       }
//     }

//   `}
//       </style>
//     </>
//   );
// };

// export default TransferCertificates;


import React, { useEffect, useState } from "react";
import {
  FaList,
  FaRedo,
  FaSearch,
  FaUsers,
  FaFilePdf,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { MdOutlineSchool } from "react-icons/md";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const TransferCertificates = () => {
  const token = localStorage.getItem("token");

  const { sessions, standards, sections } = useMasters();

  // =========================================================
  // FILTER STATES
  // =========================================================

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // =========================================================
  // STUDENT STATES
  // =========================================================

  const [students, setStudents] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // =========================================================
  // TC STATES
  // =========================================================

  const [generatedTCs, setGeneratedTCs] = useState([]);
  const [tcLoading, setTcLoading] = useState(false);
  const [tcSaving, setTcSaving] = useState(false);

  // =========================================================
  // MODAL STATES
  // =========================================================

  const [showTCModal, setShowTCModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingTC, setEditingTC] = useState(null);

  // =========================================================
  // TC FORM
  // =========================================================

  const [tcForm, setTcForm] = useState({
    dateOfLeaving: "",
    reasonForLeaving: "",
    conduct: "Good",
    remarks: "",
  });

  // =========================================================
  // LOAD GENERATED TCs
  // =========================================================

  const loadGeneratedTCs = async () => {
    try {
      setTcLoading(true);

      const res = await axiosInstance.get(
        "/api/transfer-certificates/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(res)
        ? res
        : Array.isArray(res.data)
        ? res.data
        : [];

      setGeneratedTCs(data);
    } catch (error) {
      console.error("TC Load Error:", error);
      setGeneratedTCs([]);
    } finally {
      setTcLoading(false);
    }
  };

  // =========================================================
  // LOAD TC ON PAGE OPEN
  // =========================================================

  useEffect(() => {
    loadGeneratedTCs();
  }, []);

  // =========================================================
  // GET TC OF STUDENT
  // =========================================================

  const getStudentTC = (student) => {
    if (!student?.admissionNumber) {
      return null;
    }

    return generatedTCs.find(
      (tc) => tc.admissionNumber === student.admissionNumber
    );
  };

  // =========================================================
  // SEARCH STUDENTS
  // =========================================================

  const handleSearch = async () => {
    try {
      setSearchLoading(true);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession || null,
          studentClass: selectedStandard || null,
          section: selectedSection || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STUDENT SEARCH RESPONSE:", res);
      console.log("STUDENT SEARCH DATA:", res.data);

      const data = Array.isArray(res)
        ? res
        : Array.isArray(res.data)
        ? res.data
        : [];

      // Only discontinued / inactive students
      const inactiveStudents = data.filter(
        (student) => student.status === "INACTIVE"
      );

      setStudents(inactiveStudents);
    } catch (error) {
      console.error("Student Search Error:", error);
      setStudents([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const handleReset = () => {
    setSearchLoading(false);
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setStudents([]);
  };

  // =========================================================
  // OPEN GENERATE MODAL
  // =========================================================

  const openGenerateModal = (student) => {
    setSelectedStudent(student);
    setEditingTC(null);

    setTcForm({
      dateOfLeaving: student?.discontinueDate || "",
      reasonForLeaving: "",
      conduct: "Good",
      remarks: "",
    });

    setShowTCModal(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEditTC = (tc) => {
    const student = students.find(
      (item) => item.admissionNumber === tc.admissionNumber
    );

    setEditingTC(tc);

    setSelectedStudent(
      student || {
        admissionNumber: tc.admissionNumber,
        firstName: tc.studentName,
        middleName: "",
        lastName: "",
        studentClass: tc.studentClass,
        section: tc.section,
        discontinueDate: tc.dateOfLeaving,
        email: "",
      }
    );

    setTcForm({
      dateOfLeaving: tc.dateOfLeaving || "",
      reasonForLeaving: tc.reasonForLeaving || "",
      conduct: tc.conduct || "Good",
      remarks: tc.remarks || "",
    });

    setShowTCModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeTCModal = () => {
    if (tcSaving) return;

    setShowTCModal(false);
    setSelectedStudent(null);
    setEditingTC(null);

    setTcForm({
      dateOfLeaving: "",
      reasonForLeaving: "",
      conduct: "Good",
      remarks: "",
    });
  };

  // =========================================================
  // GENERATE TC
  // =========================================================

  const handleGenerateTC = async (student) => {
    if (!student) return;

    if (!tcForm.dateOfLeaving) {
      alert("Please select date of leaving.");
      return;
    }

    if (!tcForm.reasonForLeaving) {
      alert("Please select reason for leaving.");
      return;
    }

    try {
      setTcSaving(true);

      const payload = {
        admissionNumber: student.admissionNumber,
        dateOfLeaving: tcForm.dateOfLeaving,
        reasonForLeaving: tcForm.reasonForLeaving,
        conduct: tcForm.conduct,
        remarks: tcForm.remarks,
      };

      console.log("GENERATE TC PAYLOAD:", payload);

      const res = await axiosInstance.post(
        "/api/transfer-certificates/generate",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("GENERATED TC:", res.data);

      closeTCModal();

      await loadGeneratedTCs();

      alert("Transfer Certificate generated successfully.");
    } catch (error) {
      console.error("Generate TC Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to generate Transfer Certificate.";

      alert(message);
    } finally {
      setTcSaving(false);
    }
  };

  // =========================================================
  // UPDATE TC
  // =========================================================

  const handleUpdateTC = async (tcId) => {
    if (!tcId) return;

    if (!tcForm.dateOfLeaving) {
      alert("Please select date of leaving.");
      return;
    }

    if (!tcForm.reasonForLeaving) {
      alert("Please select reason for leaving.");
      return;
    }

    try {
      setTcSaving(true);

      const payload = {
        dateOfLeaving: tcForm.dateOfLeaving,
        reasonForLeaving: tcForm.reasonForLeaving,
        conduct: tcForm.conduct,
        remarks: tcForm.remarks,
      };

      console.log("UPDATE TC PAYLOAD:", payload);

      await axiosInstance.put(
        `/api/transfer-certificates/${tcId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeTCModal();

      await loadGeneratedTCs();

      alert("Transfer Certificate updated successfully.");
    } catch (error) {
      console.error("Update TC Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to update Transfer Certificate.";

      alert(message);
    } finally {
      setTcSaving(false);
    }
  };

  // =========================================================
  // SUBMIT TC
  // =========================================================

  const handleSubmitTC = async () => {
    if (editingTC) {
      await handleUpdateTC(editingTC.id);
    } else {
      await handleGenerateTC(selectedStudent);
    }
  };

  // =========================================================
  // VIEW TC PDF
  // =========================================================

 const handleViewTC = async (tcId) => {
  try {
    const res = await axiosInstance.get(
      `/api/transfer-certificates/${tcId}/pdf`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const blob = new Blob(
      [res.data],
      { type: "application/pdf" }
    );

    const url =
      window.URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);

  } catch (error) {

    console.error(
      "View TC Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to open Transfer Certificate PDF"
    );
  }
};

  // =========================================================
  // STUDENT NAME
  // =========================================================

  const getStudentName = (student) => {
    return [
      student?.firstName,
      student?.middleName,
      student?.lastName,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

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
                  <FaBookAtlas size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Transfer Certificate
                  </h5>

                  <div className="text-muted small">
                    Dashboard &nbsp;/&nbsp; Transfer Certificate
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
                  TC
                </span>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; TC &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Transfer Certificate
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENT FILTER
      ====================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="card shadow rounded-4 p-2 border-0 overflow-hidden">
          <div
            className="card-header bg-white border-0 p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
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
                  <FaSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Student Filter
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Filter discontinued students by academic year,
                    class and section
                  </small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <FaUsers className="me-1" />
                Student Search
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">

              {/* ACADEMIC YEAR */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Academic Year
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(e.target.value)
                  }
                >
                  <option value="">
                    All Academic Years
                  </option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Standard
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(e.target.value)
                  }
                >
                  <option value="">
                    All Standards
                  </option>

                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item === "NURSERY"
                        ? "Nursery"
                        : item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUTTONS */}

              <div className="col-xl-3 col-md-6 d-flex align-items-end">
                <div className="d-flex gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-primary rounded-3 flex-grow-1"
                    onClick={handleSearch}
                    disabled={searchLoading}
                  >
                    {searchLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Searching...
                      </>
                    ) : (
                      <>
                        <FaSearch className="me-2" />
                        Search
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-3 px-3"
                    onClick={handleReset}
                    title="Reset Filters"
                  >
                    <FaRedo />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DISCONTINUED STUDENTS TABLE
      ====================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="card shadow rounded-4 p-2 border-0 overflow-hidden">

          <div
            className="card-header bg-white border-0 p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">

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
                  <FaList size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Discontinued Students
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Discontinued students and their transfer
                    certificate status
                  </small>
                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <FaUsers className="me-1" />
                {students.length} Students
              </span>

            </div>
          </div>

          <div className="card-body p-4">

            <div className="table-responsive">

              <table className="table tc-premium-table align-middle mb-0">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Admission No.</th>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Date of Leaving</th>
                    <th>Status</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {students.length > 0 ? (
                    students.map((student, index) => {

                      const studentTC =
                        getStudentTC(student);

                      return (
                        <tr
                          key={
                            student.id ||
                            student.admissionNumber
                          }
                        >

                          {/* SERIAL */}

                          <td>
                            <span className="serial-no">
                              {index + 1}
                            </span>
                          </td>

                          {/* ADMISSION */}

                          <td>
                            <span className="admission-no">
                              {student.admissionNumber ||
                                "-"}
                            </span>
                          </td>

                          {/* STUDENT */}

                          <td>
                            <div className="student-info">

                              <div className="student-avatar">
                                {student.firstName
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "S"}
                              </div>

                              <div>

                                <div className="student-name">
                                  {getStudentName(
                                    student
                                  ) || "-"}
                                </div>

                                <div className="student-email">
                                  {student.email ||
                                    "No email"}
                                </div>

                              </div>

                            </div>
                          </td>

                          {/* CLASS */}

                          <td>
                            <span className="class-badge">
                              {student.studentClass ||
                                "-"}
                            </span>
                          </td>

                          {/* SECTION */}

                          <td>
                            <span className="section-text">
                              {student.section || "-"}
                            </span>
                          </td>

                          {/* LEAVING DATE */}

                          <td>
                            <div className="leaving-date">

                              <i className="fa-regular fa-calendar"></i>

                              {student.discontinueDate ||
                                "-"}
                            </div>
                          </td>

                          {/* STATUS */}

                          <td>
                            <span className="inactive-badge">
                              <span className="status-dot"></span>
                              Discontinued
                            </span>
                          </td>

                          {/* ACTION */}

                          <td className="text-center">

                            {studentTC ? (
                              <button
                                type="button"
                                className="tc-action-btn view-btn"
                                onClick={() =>
                                  handleViewTC(
                                    studentTC.id
                                  )
                                }
                              >
                                <FaEye />
                                View TC
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="tc-action-btn generate-btn"
                                onClick={() =>
                                  openGenerateModal(
                                    student
                                  )
                                }
                              >
                                <i className="fa-solid fa-file-circle-plus"></i>
                                Generate TC
                              </button>
                            )}

                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8">

                        <div className="empty-tc-state">

                          <div className="empty-icon">
                            <i className="fa-regular fa-folder-open"></i>
                          </div>

                          <h6>
                            No discontinued students
                            found
                          </h6>

                          <p>
                            Students discontinued from
                            the school will appear here.
                          </p>

                        </div>

                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          GENERATED TC LIST
      ====================================================== */}

      <div className="mx-2 mt-3 mb-4">
        <div className="card shadow rounded-4 p-2 border-0 overflow-hidden">

          <div
            className="card-header bg-white border-0 p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#dc2626,#ef4444)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(220,38,38,.20)",
                  }}
                >
                  <FaFilePdf size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Generated Transfer Certificates
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    View and manage generated transfer
                    certificates
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                }}
              >
                <FaFilePdf className="me-1" />
                {generatedTCs.length} TCs
              </span>

            </div>
          </div>

          <div className="card-body p-4">

            {tcLoading ? (

              <div className="text-center py-5">

                <span className="spinner-border text-primary" />

                <div className="small text-muted mt-2">
                  Loading generated certificates...
                </div>

              </div>

            ) : generatedTCs.length === 0 ? (

              <div className="empty-tc-state">

                <div className="empty-icon">
                  <FaFilePdf />
                </div>

                <h6>
                  No transfer certificates generated
                </h6>

                <p>
                  Generated transfer certificates
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table tc-premium-table align-middle mb-0">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>TC Number</th>
                      <th>Admission No.</th>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Date of Leaving</th>
                      <th>Generated On</th>
                      <th className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {generatedTCs.map(
                      (tc, index) => (

                        <tr key={tc.id}>

                          <td>
                            <span className="serial-no">
                              {index + 1}
                            </span>
                          </td>

                          <td>
                            <span className="admission-no">
                              {tc.tcNumber || "-"}
                            </span>
                          </td>

                          <td>
                            <span className="admission-no">
                              {tc.admissionNumber ||
                                "-"}
                            </span>
                          </td>

                          <td>

                            <div className="student-info">

                              <div className="student-avatar">
                                {tc.studentName
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "S"}
                              </div>

                              <div>

                                <div className="student-name">
                                  {tc.studentName ||
                                    "-"}
                                </div>

                                <div className="student-email">
                                  TC Generated
                                </div>

                              </div>

                            </div>

                          </td>

                          <td>

                            <span className="class-badge">
                              {tc.studentClass || "-"}

                              {tc.section
                                ? ` - ${tc.section}`
                                : ""}
                            </span>

                          </td>

                          <td>

                            <div className="leaving-date">

                              <i className="fa-regular fa-calendar"></i>

                              {tc.dateOfLeaving ||
                                "-"}

                            </div>

                          </td>

                          <td>

                            <span className="section-text">
                              {tc.generatedAt
                                ? new Date(
                                    tc.generatedAt
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "-"}
                            </span>

                          </td>

                          <td className="text-center">

                            <div className="d-flex justify-content-center gap-2">

                              <button
                                type="button"
                                className="tc-action-btn view-btn"
                                onClick={() =>
                                  handleViewTC(
                                    tc.id
                                  )
                                }
                                title="View PDF"
                              >
                                <FaFilePdf />
                                PDF
                              </button>

                              <button
                                type="button"
                                className="tc-edit-btn"
                                onClick={() =>
                                  handleEditTC(tc)
                                }
                                title="Edit TC"
                              >
                                <FaEdit />
                                Edit
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          TC MODAL
      ====================================================== */}

      {showTCModal && selectedStudent && (

        <div
          className="tc-modal-overlay"
          onClick={closeTCModal}
        >

          <div
            className="tc-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="tc-modal-header">

              <div className="tc-modal-title-area">

                <div className="tc-modal-icon">
                  <i className="fa-solid fa-file-certificate"></i>
                </div>

                <div>

                  <h5>
                    {editingTC
                      ? "Edit Transfer Certificate"
                      : "Generate Transfer Certificate"}
                  </h5>

                  <p>
                    {editingTC
                      ? "Update transfer certificate details"
                      : "Create TC for discontinued student"}
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="tc-modal-close"
                onClick={closeTCModal}
                disabled={tcSaving}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>

            {/* STUDENT PREVIEW */}

            <div className="tc-student-preview">

              <div className="tc-preview-avatar">

                {selectedStudent.firstName
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}

              </div>

              <div className="tc-preview-info">

                <h6>
                  {getStudentName(
                    selectedStudent
                  ) || "-"}
                </h6>

                <div className="tc-preview-details">

                  <span>
                    <strong>
                      Admission:
                    </strong>{" "}
                    {selectedStudent.admissionNumber ||
                      "-"}
                  </span>

                  <span>
                    <strong>
                      Class:
                    </strong>{" "}
                    {selectedStudent.studentClass ||
                      "-"}
                  </span>

                  <span>
                    <strong>
                      Section:
                    </strong>{" "}
                    {selectedStudent.section ||
                      "-"}
                  </span>

                </div>

              </div>

              <span className="tc-discontinued-label">
                Discontinued
              </span>

            </div>

            {/* FORM */}

            <div className="tc-modal-body">

              {/* ROW 1 */}

              <div className="tc-form-row">

                <div className="tc-form-group">

                  <label>
                    Date of Leaving
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    value={
                      tcForm.dateOfLeaving
                    }
                    onChange={(e) =>
                      setTcForm({
                        ...tcForm,
                        dateOfLeaving:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="tc-form-group">

                  <label>
                    Reason for Leaving
                    <span>*</span>
                  </label>

                  <select
                    value={
                      tcForm.reasonForLeaving
                    }
                    onChange={(e) =>
                      setTcForm({
                        ...tcForm,
                        reasonForLeaving:
                          e.target.value,
                      })
                    }
                  >

                    <option value="">
                      Select reason
                    </option>

                    <option value="Parent Request">
                      Parent Request
                    </option>

                    <option value="Transfer to Another School">
                      Transfer to Another School
                    </option>

                    <option value="Family Relocation">
                      Family Relocation
                    </option>

                    <option value="Completed Schooling">
                      Completed Schooling
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              {/* ROW 2 */}

              <div className="tc-form-row">

                <div className="tc-form-group">

                  <label>
                    Conduct
                  </label>

                  <select
                    value={tcForm.conduct}
                    onChange={(e) =>
                      setTcForm({
                        ...tcForm,
                        conduct:
                          e.target.value,
                      })
                    }
                  >

                    <option value="Excellent">
                      Excellent
                    </option>

                    <option value="Very Good">
                      Very Good
                    </option>

                    <option value="Good">
                      Good
                    </option>

                    <option value="Satisfactory">
                      Satisfactory
                    </option>

                  </select>

                </div>

                <div className="tc-form-group">

                  <label>
                    Last Class Attended
                  </label>

                  <input
                    type="text"
                    value={
                      selectedStudent.studentClass ||
                      ""
                    }
                    readOnly
                  />

                </div>

              </div>

              {/* REMARKS */}

              <div className="tc-form-group">

                <label>
                  Remarks
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter any additional remarks..."
                  value={tcForm.remarks}
                  onChange={(e) =>
                    setTcForm({
                      ...tcForm,
                      remarks:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* FOOTER */}

            <div className="tc-modal-footer">

              <button
                type="button"
                className="tc-cancel-btn"
                onClick={closeTCModal}
                disabled={tcSaving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="tc-confirm-btn"
                onClick={handleSubmitTC}
                disabled={tcSaving}
              >

                {tcSaving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />

                    {editingTC
                      ? "Updating..."
                      : "Generating..."}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-file-circle-check"></i>

                    {editingTC
                      ? "Update TC"
                      : "Generate TC"}
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          CSS
      ====================================================== */}

      <style>
        {`

        .tc-table-card {
          background: #ffffff;
          border: 1px solid #e9edf5;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
        }

        .tc-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          border-bottom: 1px solid #edf0f5;
        }

        .tc-table-header h5 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #172033;
        }

        .tc-table-header p {
          margin: 5px 0 0;
          font-size: 13px;
          color: #8a94a6;
        }

        .student-count {
          padding: 7px 13px;
          border-radius: 20px;
          background: #f0f6ff;
          color: #2563eb;
          font-size: 12px;
          font-weight: 700;
        }

        .tc-premium-table {
          min-width: 1050px;
        }

        .tc-premium-table thead th {
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
          padding: 15px 18px;
          border-bottom: 1px solid #e9edf5;
          white-space: nowrap;
        }

        .tc-premium-table tbody td {
          padding: 17px 18px;
          border-bottom: 1px solid #f0f2f6;
          color: #334155;
          font-size: 13px;
        }

        .tc-premium-table tbody tr {
          transition: all .2s ease;
        }

        .tc-premium-table tbody tr:hover {
          background: #f8fbff;
        }

        .tc-premium-table tbody tr:last-child td {
          border-bottom: none;
        }

        .serial-no {
          color: #94a3b8;
          font-weight: 600;
        }

        .admission-no {
          color: #2563eb;
          font-weight: 700;
          font-size: 13px;
        }

        .student-info {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .student-avatar {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e8f1ff, #dbeafe);
          color: #2563eb;
          font-size: 14px;
          font-weight: 700;
        }

        .student-name {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
        }

        .student-email {
          margin-top: 3px;
          font-size: 11px;
          color: #94a3b8;
        }

        .class-badge {
          display: inline-flex;
          padding: 5px 10px;
          border-radius: 7px;
          background: #f1f5f9;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
        }

        .section-text {
          font-weight: 600;
          color: #475569;
        }

        .leaving-date {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #64748b;
          white-space: nowrap;
        }

        .leaving-date i {
          color: #94a3b8;
        }

        .inactive-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 20px;
          background: #fff7ed;
          color: #c2410c;
          font-size: 11px;
          font-weight: 700;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
        }

        .tc-action-btn {
          border: none;
          border-radius: 9px;
          padding: 8px 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s ease;
        }

        .generate-btn {
          background: #2563eb;
          color: #fff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, .20);
        }

        .generate-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .view-btn {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #d1fae5;
        }

        .view-btn:hover {
          background: #d1fae5;
          transform: translateY(-1px);
        }

        .tc-edit-btn {
          border: 1px solid #dbeafe;
          background: #eff6ff;
          color: #2563eb;
          border-radius: 9px;
          padding: 8px 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s ease;
        }

        .tc-edit-btn:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .empty-tc-state {
          text-align: center;
          padding: 65px 20px;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 15px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #94a3b8;
          font-size: 23px;
        }

        .empty-tc-state h6 {
          margin-bottom: 5px;
          color: #334155;
          font-weight: 700;
        }

        .empty-tc-state p {
          margin: 0;
          color: #94a3b8;
          font-size: 12px;
        }

        /* =====================================================
           MODAL
        ====================================================== */

        .tc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
          animation: tcFadeIn .2s ease;
        }

        @keyframes tcFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .tc-modal {
          width: 100%;
          max-width: 720px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(15, 23, 42, 0.20);
          animation: tcModalIn .25s ease;
        }

        @keyframes tcModalIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tc-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          border-bottom: 1px solid #edf0f5;
        }

        .tc-modal-title-area {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .tc-modal-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
          font-size: 18px;
        }

        .tc-modal-header h5 {
          margin: 0;
          color: #172033;
          font-size: 17px;
          font-weight: 700;
        }

        .tc-modal-header p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-size: 12px;
        }

        .tc-modal-close {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 9px;
          background: #f8fafc;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .2s;
        }

        .tc-modal-close:hover {
          background: #fee2e2;
          color: #dc2626;
        }

        .tc-modal-close:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .tc-student-preview {
          margin: 20px 24px 5px;
          padding: 15px;
          border: 1px solid #e8edf5;
          background: #f8fbff;
          border-radius: 13px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tc-preview-avatar {
          width: 43px;
          height: 43px;
          min-width: 43px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #dbeafe,
            #eff6ff
          );
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .tc-preview-info {
          flex: 1;
        }

        .tc-preview-info h6 {
          margin: 0 0 5px;
          color: #1e293b;
          font-size: 13px;
          font-weight: 700;
        }

        .tc-preview-details {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          color: #64748b;
          font-size: 11px;
        }

        .tc-preview-details strong {
          color: #475569;
        }

        .tc-discontinued-label {
          padding: 6px 9px;
          border-radius: 20px;
          background: #fff7ed;
          color: #c2410c;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .tc-modal-body {
          padding: 20px 24px;
        }

        .tc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .tc-form-group {
          margin-bottom: 16px;
        }

        .tc-form-row .tc-form-group {
          margin-bottom: 0;
        }

        .tc-form-group label {
          display: block;
          margin-bottom: 7px;
          color: #334155;
          font-size: 12px;
          font-weight: 700;
        }

        .tc-form-group label span {
          color: #ef4444;
          margin-left: 3px;
        }

        .tc-form-group input,
        .tc-form-group select,
        .tc-form-group textarea {
          width: 100%;
          border: 1px solid #dfe5ee;
          border-radius: 9px;
          padding: 10px 12px;
          color: #334155;
          background: #ffffff;
          font-size: 12px;
          outline: none;
          transition: .2s;
          box-sizing: border-box;
        }

        .tc-form-group input:focus,
        .tc-form-group select:focus,
        .tc-form-group textarea:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, .08);
        }

        .tc-form-group input[readonly] {
          background: #f8fafc;
          color: #64748b;
        }

        .tc-form-group textarea {
          resize: vertical;
          min-height: 75px;
        }

        .tc-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #edf0f5;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          background: #fafbfc;
        }

        .tc-cancel-btn,
        .tc-confirm-btn {
          border: none;
          border-radius: 9px;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .tc-cancel-btn {
          background: #f1f5f9;
          color: #475569;
        }

        .tc-cancel-btn:hover {
          background: #e2e8f0;
        }

        .tc-cancel-btn:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .tc-confirm-btn {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, .20);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .tc-confirm-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .tc-confirm-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
          transform: none !important;
        }

        @media (max-width: 600px) {

          .tc-modal-overlay {
            padding: 10px;
          }

          .tc-modal {
            max-height: 95vh;
            overflow-y: auto;
          }

          .tc-form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .tc-student-preview {
            align-items: flex-start;
          }

          .tc-discontinued-label {
            display: none;
          }

          .tc-preview-details {
            flex-direction: column;
            gap: 3px;
          }

          .tc-modal-footer {
            position: sticky;
            bottom: 0;
          }

        }

        @media (max-width: 768px) {

          .tc-table-header {
            padding: 18px;
          }

          .tc-table-header h5 {
            font-size: 16px;
          }

          .student-count {
            font-size: 11px;
          }

        }

        `}
      </style>
    </>
  );
};

export default TransferCertificates;