

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaFileExcel,
//   FaSearch,
//   FaMoneyBillWave,
// } from "react-icons/fa";
// import { MdOutlineSchool } from "react-icons/md";
// import * as XLSX from "xlsx";
// import axios from "../../api/axiosInstance";

// const AdmissionFeePayment = () => {
//   const navigate = useNavigate();

//   const [payments, setPayments] = useState({});
//   const [selectedReceipt, setSelectedReceipt] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [studentData, setStudentData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const receiptRef = useRef(null);

//   const PRIMARY = "#2563eb";

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   /* ================= NAVIGATION ================= */

//   const handleNavigate = (id) => {
//     navigate(`/admission/fee/${id}`);
//   };

//   /* ================= LOAD LOCAL PAYMENTS ================= */

//   useEffect(() => {
//     const stored =
//       JSON.parse(localStorage.getItem("AdmissionFeePayments")) || {};

//     setPayments(stored);
//   }, []);

//   /* ================= FETCH APPROVED STUDENTS ================= */

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
//         console.log("Approved admission:", res.data);

//         const approved = (res.data || []).filter(
//           (item) =>
//             item.status?.toUpperCase() === "APPROVED"
//         );

//         setStudentData(approved);
//       })
//       .catch((error) => {
//         console.error("Admission fetch error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [user?.schoolId, token]);

//   /* ================= PRINT RECEIPT ================= */

//   useEffect(() => {
//     if (selectedReceipt) {
//       setTimeout(() => {
//         handlePrintReceipt();
//         setSelectedReceipt(null);
//       }, 100);
//     }
//   }, [selectedReceipt]);

//   const handlePrintReceipt = () => {
//     if (!receiptRef.current) return;

//     const printWindow = window.open(
//       "",
//       "PRINT",
//       "height=650,width=900"
//     );

//     if (!printWindow) return;

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Fee Receipt</title>

//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 30px;
//               color: #222;
//             }

//             h2,
//             h4 {
//               margin: 5px 0;
//             }

//             .line {
//               border-top: 1px dashed #000;
//               margin: 15px 0;
//             }
//           </style>
//         </head>

//         <body>
//           ${receiptRef.current.innerHTML}
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   /* ================= HANDLE PAYMENT FIELD ================= */

//   const handleChange = (e, admissionNo, field) => {
//     const value = e.target.value;

//     setPayments((prev) => ({
//       ...prev,
//       [admissionNo]: {
//         ...prev[admissionNo],
//         [field]: value,
//       },
//     }));
//   };

//   /* ================= EXPORT EXCEL ================= */

//   const handleExportToExcel = () => {
//     if (filteredStudents.length === 0) {
//       alert("No student data available for export.");
//       return;
//     }

//     const exportData = filteredStudents.map((student, index) => {
//       const admNo =
//         student.admissionNumber || `ADM${index + 1}`;

//       const payment = payments[admNo] || {};

//       return {
//         "S.No": index + 1,
//         "Student Name": `${student.firstName || ""} ${
//           student.middleName || ""
//         } ${student.lastName || ""}`.trim(),
//         "Admission No": admNo,
//         Class: student.studentClass || "-",
//         Session: student.academicYear || "-",
//         "Father Name": student.fatherName || "-",
//         "Mobile No":
//           student.preferredNo ||
//           student.fatherMobile ||
//           "-",
//         Amount: payment.amount || 0,
//         Mode: payment.mode || "-",
//         Date: payment.date || "-",
//         Status: payment.status || "Unpaid",
//       };
//     });

//     const worksheet =
//       XLSX.utils.json_to_sheet(exportData);

//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Admission Fee Payments"
//     );

//     XLSX.writeFile(
//       workbook,
//       "Admission_Fee_Payment_List.xlsx"
//     );
//   };

//   /* ================= SUMMARY ================= */

//   const summary = studentData.reduce(
//     (acc, student, idx) => {
//       const admNo =
//         student.admissionNumber || `ADM${idx + 1}`;

//       const data = payments[admNo] || {};

//       if (data.status === "Paid") {
//         acc.paidCount += 1;
//         acc.totalPaid += parseFloat(
//           data.amount || 0
//         );
//       } else {
//         acc.unpaidCount += 1;
//       }

//       return acc;
//     },
//     {
//       paidCount: 0,
//       unpaidCount: 0,
//       totalPaid: 0,
//     }
//   );

//   /* ================= SEARCH ================= */

//   const filteredStudents = studentData.filter(
//     (student) => {
//       const fullName = `
//         ${student.firstName || ""}
//         ${student.middleName || ""}
//         ${student.lastName || ""}
//       `.toLowerCase();

//       const admissionNo =
//         student.admissionNumber?.toLowerCase() || "";

//       const fatherName =
//         student.fatherName?.toLowerCase() || "";

//       const mobile =
//         student.preferredNo?.toLowerCase() ||
//         student.fatherMobile?.toLowerCase() ||
//         "";

//       const search = searchTerm.toLowerCase();

//       return (
//         fullName.includes(search) ||
//         admissionNo.includes(search) ||
//         fatherName.includes(search) ||
//         mobile.includes(search)
//       );
//     }
//   );

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER - NEW PREMIUM BLUE THEME
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
//                   <FaMoneyBillWave size={25} />
//                 </div>

//                 {/* TITLE */}

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Admission Fee Payment
//                   </h5>

//                   <div className="text-muted small">
//                     Admission &nbsp;/&nbsp; Fee Payment
//                   </div>
//                 </div>
//               </div>

//               {/* MODULE BADGE */}

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
//                   Admission
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
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Admission &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Admission Fee Payment
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAIN CARD
//       ====================================================== */}

//       <div
//         className="mx-2 mb-4 rounded-4 shadow overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(135deg,#ffffff 0%,#fbfdff 100%)",
//           border: "1px solid #dbeafe",
//         }}
//       >
//         {/* =====================================================
//             CARD HEADER
//         ====================================================== */}

//         <div
//           className="p-3 p-md-4"
//           style={{
//             borderBottom: "1px solid #e5efff",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//             <div>
//               <div className="d-flex align-items-center gap-2">
//                 <div
//                   style={{
//                     width: "5px",
//                     height: "25px",
//                     borderRadius: "10px",
//                     background:
//                       "linear-gradient(180deg,#2563eb,#60a5fa)",
//                   }}
//                 />

//                 <h5
//                   className="mb-0 fw-bold"
//                   style={{
//                     color: "#172554",
//                   }}
//                 >
//                   Admission Fee Payment
//                 </h5>
//               </div>

//               <small className="text-muted ms-3">
//                 Manage admission fee payments for
//                 approved students
//               </small>
//             </div>

//             {/* TOTAL BADGE */}

//             <span
//               className="badge rounded-pill px-3 py-2"
//               style={{
//                 backgroundColor: "#eff6ff",
//                 color: "#2563eb",
//                 border: "1px solid #bfdbfe",
//                 fontSize: "13px",
//               }}
//             >
//               <FaMoneyBillWave className="me-1" />
//               Approved Students:{" "}
//               {studentData.length}
//             </span>
//           </div>
//         </div>

//         {/* =====================================================
//             SEARCH + EXPORT
//         ====================================================== */}

//         <div className="p-3 p-md-4">
//           <div
//             className="p-3 rounded-4"
//             style={{
//               background:
//                 "linear-gradient(135deg,#f8fbff,#f1f6ff)",
//               border: "1px solid #dbeafe",
//             }}
//           >
//             <div className="row align-items-center g-3">
//               {/* SEARCH */}

//               <div className="col-lg-7 col-md-7">
//                 <div className="position-relative">
//                   <FaSearch
//                     style={{
//                       position: "absolute",
//                       left: "14px",
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                       color: "#64748b",
//                       zIndex: 2,
//                     }}
//                   />

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search by name, admission no, father name or mobile..."
//                     value={searchTerm}
//                     onChange={(e) =>
//                       setSearchTerm(e.target.value)
//                     }
//                     style={{
//                       paddingLeft: "40px",
//                       height: "44px",
//                       borderRadius: "10px",
//                       border:
//                         "1px solid #cbdcf8",
//                       boxShadow:
//                         "0 2px 8px rgba(37,99,235,.04)",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* EXPORT */}

//               <div className="col-lg-5 col-md-5">
//                 <div className="d-flex justify-content-md-end">
//                   <button
//                     type="button"
//                     className="btn text-white px-4"
//                     onClick={
//                       handleExportToExcel
//                     }
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#198754,#20c997)",
//                       border: "none",
//                       borderRadius: "9px",
//                       height: "44px",
//                       boxShadow:
//                         "0 5px 14px rgba(25,135,84,.18)",
//                     }}
//                   >
//                     <FaFileExcel className="me-2" />
//                     Export Excel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               PREMIUM SUMMARY CARDS
//           ====================================================== */}

//           <div className="row g-3 mt-1 mb-4">

//             {/* PAID */}

//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="h-100 p-3 rounded-4 shadow position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#198754 0%,#20c997 100%)",
//                   color: "white",
//                   minHeight: "115px",
//                 }}
//               >
//                 {/* Decorative circle */}

//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "110px",
//                     height: "110px",
//                     borderRadius: "50%",
//                     right: "-35px",
//                     top: "-45px",
//                     background:
//                       "rgba(255,255,255,.08)",
//                   }}
//                 />

//                 <div
//                   className="d-flex justify-content-between align-items-center position-relative"
//                   style={{ zIndex: 2 }}
//                 >
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.9,
//                         fontWeight: "500",
//                       }}
//                     >
//                       Total Paid Students
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {summary.paidCount}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.8,
//                         fontSize: "11px",
//                       }}
//                     >
//                       Fee payment completed
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       backgroundColor:
//                         "rgba(255,255,255,.18)",
//                       border:
//                         "1px solid rgba(255,255,255,.18)",
//                     }}
//                   >
//                     <FaMoneyBillWave size={22} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* UNPAID */}

//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="h-100 p-3 rounded-4 shadow position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#dc3545 0%,#e35d6a 100%)",
//                   color: "white",
//                   minHeight: "115px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "110px",
//                     height: "110px",
//                     borderRadius: "50%",
//                     right: "-35px",
//                     top: "-45px",
//                     background:
//                       "rgba(255,255,255,.08)",
//                   }}
//                 />

//                 <div
//                   className="d-flex justify-content-between align-items-center position-relative"
//                   style={{ zIndex: 2 }}
//                 >
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.9,
//                         fontWeight: "500",
//                       }}
//                     >
//                       Unpaid Students
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {summary.unpaidCount}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.8,
//                         fontSize: "11px",
//                       }}
//                     >
//                       Payment pending
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       backgroundColor:
//                         "rgba(255,255,255,.18)",
//                       border:
//                         "1px solid rgba(255,255,255,.18)",
//                     }}
//                   >
//                     <FaMoneyBillWave size={22} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* TOTAL COLLECTION */}

//             <div className="col-xl-4 col-md-12">
//               <div
//                 className="h-100 p-3 rounded-4 shadow position-relative overflow-hidden"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#0dcaf0 0%,#0d6efd 100%)",
//                   color: "white",
//                   minHeight: "115px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "110px",
//                     height: "110px",
//                     borderRadius: "50%",
//                     right: "-35px",
//                     top: "-45px",
//                     background:
//                       "rgba(255,255,255,.08)",
//                   }}
//                 />

//                 <div
//                   className="d-flex justify-content-between align-items-center position-relative"
//                   style={{ zIndex: 2 }}
//                 >
//                   <div>
//                     <small
//                       style={{
//                         opacity: 0.9,
//                         fontWeight: "500",
//                       }}
//                     >
//                       Total Fee Collected
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       ₹{" "}
//                       {summary.totalPaid.toFixed(
//                         2
//                       )}
//                     </h3>

//                     <small
//                       style={{
//                         opacity: 0.8,
//                         fontSize: "11px",
//                       }}
//                     >
//                       Total collection amount
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       backgroundColor:
//                         "rgba(255,255,255,.18)",
//                       border:
//                         "1px solid rgba(255,255,255,.18)",
//                     }}
//                   >
//                     <FaMoneyBillWave size={22} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               TABLE
//           ====================================================== */}

//           <div
//             className="rounded-4 overflow-hidden"
//             style={{
//               border: "1px solid #dbeafe",
//             }}
//           >
//             <div className="table-responsive">
//               <table
//                 className="table table-hover align-middle mb-0"
//                 style={{
//                   minWidth: "950px",
//                 }}
//               >
//                 <thead
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "white",
//                   }}
//                 >
//                   <tr>
//                     <th className="text-center py-3">
//                       S.No
//                     </th>

//                     <th>Student Name</th>

//                     <th>Admission No</th>

//                     <th>Class</th>

//                     <th>Session</th>

//                     <th>Father Name</th>

//                     <th>Mobile No</th>

//                     <th>Payment Status</th>

//                     <th className="text-center">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan="9"
//                         className="text-center py-5"
//                       >
//                         <div
//                           className="spinner-border"
//                           role="status"
//                           style={{
//                             color: PRIMARY,
//                             width: "28px",
//                             height: "28px",
//                           }}
//                         >
//                           <span className="visually-hidden">
//                             Loading...
//                           </span>
//                         </div>

//                         <div className="mt-2 text-muted">
//                           Loading approved students...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredStudents.length >
//                     0 ? (
//                     filteredStudents.map(
//                       (student, idx) => {
//                         const admNo =
//                           student.admissionNumber ||
//                           `ADM${idx + 1}`;

//                         const feeData =
//                           payments[admNo] || {};

//                         const isPaid =
//                           feeData.status ===
//                           "Paid";

//                         return (
//                           <tr key={admNo}>
//                             {/* S.NO */}

//                             <td className="text-center fw-semibold">
//                               {idx + 1}
//                             </td>

//                             {/* NAME */}

//                             <td>
//                               <div className="fw-semibold text-dark">
//                                 {[
//                                   student.firstName,
//                                   student.middleName,
//                                   student.lastName,
//                                 ]
//                                   .filter(Boolean)
//                                   .join(" ") ||
//                                   "-"}
//                               </div>
//                             </td>

//                             {/* ADMISSION */}

//                             <td>
//                               <span
//                                 className="fw-semibold"
//                                 style={{
//                                   color: PRIMARY,
//                                 }}
//                               >
//                                 {admNo}
//                               </span>
//                             </td>

//                             {/* CLASS */}

//                             <td>
//                               {student.studentClass ||
//                                 "-"}
//                             </td>

//                             {/* SESSION */}

//                             <td>
//                               {student.academicYear ||
//                                 "-"}
//                             </td>

//                             {/* FATHER */}

//                             <td>
//                               {student.fatherName ||
//                                 "-"}
//                             </td>

//                             {/* MOBILE */}

//                             <td>
//                               {student.preferredNo ||
//                                 student.fatherMobile ||
//                                 "-"}
//                             </td>

//                             {/* STATUS */}

//                             <td>
//                               {isPaid ? (
//                                 <span
//                                   className="badge rounded-pill px-3 py-2"
//                                   style={{
//                                     backgroundColor:
//                                       "#d1fae5",
//                                     color:
//                                       "#047857",
//                                     border:
//                                       "1px solid #a7f3d0",
//                                   }}
//                                 >
//                                   PAID
//                                 </span>
//                               ) : (
//                                 <span
//                                   className="badge rounded-pill px-3 py-2"
//                                   style={{
//                                     backgroundColor:
//                                       "#fee2e2",
//                                     color:
//                                       "#b91c1c",
//                                     border:
//                                       "1px solid #fecaca",
//                                   }}
//                                 >
//                                   UNPAID
//                                 </span>
//                               )}
//                             </td>

//                             {/* ACTION */}

//                             <td className="text-center">
//                               <button
//                                 type="button"
//                                 className="btn btn-sm text-white px-3"
//                                 onClick={() =>
//                                   handleNavigate(
//                                     student.id
//                                   )
//                                 }
//                                 style={{
//                                   background:
//                                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                                   border: "none",
//                                   borderRadius:
//                                     "8px",
//                                   whiteSpace:
//                                     "nowrap",
//                                   boxShadow:
//                                     "0 4px 10px rgba(37,99,235,.18)",
//                                 }}
//                               >
//                                 <FaMoneyBillWave className="me-2" />
//                                 Pay Admission Fee
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       }
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="9"
//                         className="text-center py-5"
//                       >
//                         <div
//                           className="d-flex align-items-center justify-content-center mx-auto mb-3"
//                           style={{
//                             width: "55px",
//                             height: "55px",
//                             borderRadius: "50%",
//                             background:
//                               "#eff6ff",
//                             color: "#60a5fa",
//                             fontSize: "24px",
//                           }}
//                         >
//                           ₹
//                         </div>

//                         <h6 className="text-muted mb-1">
//                           No approved students
//                           found
//                         </h6>

//                         <small className="text-secondary">
//                           No student matches your
//                           search.
//                         </small>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =====================================================
//               FOOTER
//           ====================================================== */}

//           {!loading &&
//             filteredStudents.length > 0 && (
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 px-1">
//                 <small className="text-muted">
//                   Showing{" "}
//                   <strong>
//                     {filteredStudents.length}
//                   </strong>{" "}
//                   approved student
//                   {filteredStudents.length !==
//                   1
//                     ? "s"
//                     : ""}
//                 </small>

//                 <small
//                   style={{
//                     color: PRIMARY,
//                     fontWeight: "600",
//                   }}
//                 >
//                   Total Collected: ₹{" "}
//                   {summary.totalPaid.toFixed(2)}
//                 </small>
//               </div>
//             )}
//         </div>
//       </div>

//       {/* =====================================================
//           HIDDEN RECEIPT
//       ====================================================== */}

//       {selectedReceipt && (
//         <div style={{ display: "none" }}>
//           <div ref={receiptRef}>
//             <h2>Jamia Public School</h2>

//             <div
//               style={{
//                 borderTop: "1px dashed #000",
//                 margin: "15px 0",
//               }}
//             />

//             <h4>Fee Payment Receipt</h4>

//             <p>
//               <strong>Receipt No:</strong>{" "}
//               {selectedReceipt.receiptNo}
//             </p>

//             <p>
//               <strong>Name:</strong>{" "}
//               {selectedReceipt.firstName}{" "}
//               {selectedReceipt.middleName}{" "}
//               {selectedReceipt.lastName}
//             </p>

//             <p>
//               <strong>Admission No:</strong>{" "}
//               {selectedReceipt.admissionNumber}
//             </p>

//             <p>
//               <strong>Class:</strong>{" "}
//               {selectedReceipt.studentClass}
//             </p>

//             <p>
//               <strong>Amount Paid:</strong> ₹{" "}
//               {selectedReceipt.amount}
//             </p>

//             <p>
//               <strong>Payment Date:</strong>{" "}
//               {selectedReceipt.date}
//             </p>

//             <p>
//               <strong>Mode:</strong>{" "}
//               {selectedReceipt.mode}
//             </p>

//             <div
//               style={{
//                 borderTop: "1px dashed #000",
//                 margin: "15px 0",
//               }}
//             />

//             <p>
//               Signature: ___________________
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdmissionFeePayment;



import React, { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaRedo,
  FaSearch,
  FaMoneyBillWave,
  FaUsers,
  FaUserGraduate,
} from "react-icons/fa";
import {
  FaGraduationCap,
  FaFilter,
  FaCalendarDays,
} from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AdmissionFeePayment = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
    month: "",
    paymentStatus: "",
  });

  const [payments, setPayments] = useState({});

  /* =========================================================
     MONTH OPTIONS
  ========================================================= */

  const MONTHS = [
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
    "JANUARY",
    "FEBRUARY",
    "MARCH",
  ];

  /* =========================================================
     PAYMENT STATUS
  ========================================================= */

  const PAYMENT_STATUS = [
    "PAID",
    "UNPAID",
  ];

  /* =========================================================
     LOAD STUDENTS
  ========================================================= */

  useEffect(() => {
    if (schoolId && token) {
      loadStudents();
    }
  }, [schoolId, token]);

  /* =========================================================
     LOAD APPROVED STUDENTS
  ========================================================= */

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/admissions/school?schoolId=${schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const approvedStudents = (response.data || []).filter((item) => {
  const status = item.status?.toUpperCase();

  return (
    status === "APPROVED" ||
    status === "ENROLLED" ||
    status === "FEE_PAID"
  );
});

      setStudents(approvedStudents);
    } catch (error) {
      console.error("Admission fetch error:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("students data",students);
  /* =========================================================
     LOAD LOCAL PAYMENT DATA
     
     Later this can be replaced with backend API
  ========================================================= */

  useEffect(() => {
    const stored =
      JSON.parse(
        localStorage.getItem("AdmissionFeePayments")
      ) || {};

    setPayments(stored);
  }, []);

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
 const getPaymentData = (student) => {
  const studentStatus = student.status?.toUpperCase();

  const isFeePaid =
    studentStatus === "ENROLLED" ||
    studentStatus === "FEE_PAID";

  const storedPayment =
    payments[student.admissionNumber] || {};

  return {
    ...storedPayment,
    status: isFeePaid ? "PAID" : "UNPAID",
  };
};

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      const studentName = [
        student.firstName,
        student.middleName,
        student.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const admissionNo =
        student.admissionNumber?.toLowerCase() || "";

      const fatherName =
        student.fatherName?.toLowerCase() || "";

      const mobile =
        student.fatherMobile?.toLowerCase() ||
        student.motherMobile?.toLowerCase() ||
        student.preferredNo?.toLowerCase() ||
        "";

      const payment = getPaymentData(student);

      const matchSearch =
        !search ||
        studentName.includes(search) ||
        admissionNo.includes(search) ||
        fatherName.includes(search) ||
        mobile.includes(search);

      const matchSession =
        !filters.session ||
        student.academicYear === filters.session;

      const matchStandard =
        !filters.standard ||
        student.studentClass === filters.standard;

      const matchMonth =
        !filters.month ||
        payment.month === filters.month;

      const matchPaymentStatus =
  !filters.paymentStatus ||
  payment.status === filters.paymentStatus;
      return (
        matchSearch &&
        matchSession &&
        matchStandard &&
        matchMonth &&
        matchPaymentStatus
      );
    });
  }, [
    students,
    payments,
    searchTerm,
    filters,
  ]);

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSearchTerm("");

    setFilters({
      session: "",
      standard: "",
      month: "",
      paymentStatus: "",
    });
  };

  /* =========================================================
     PAYMENT PAGE
  ========================================================= */

  const handlePayment = (id) => {
    navigate(`/admission/fee/${id}`);
  };

  /* =========================================================
     GET PAYMENT
  ========================================================= */


  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalStudents = students.length;

  console.log("students admission",students);

  const paidStudents = students.filter((student) => {
  const status = student.status?.toUpperCase();

  return (
    status === "ENROLLED" ||
    status === "FEE_PAID"
  );
}).length;

  const unpaidStudents =
    totalStudents - paidStudents;

  const totalCollection = students.reduce(
    (total, student) => {
      const payment =
        payments[student.admissionNumber];

      if (payment?.status === "PAID") {
        return (
          total +
          Number(payment.amount || 0)
        );
      }

      return total;
    },
    0
  );

  /* =========================================================
     UNIQUE SESSIONS
  ========================================================= */

  const sessions = useMemo(() => {
    return [
      ...new Set(
        students
          .map((item) => item.academicYear)
          .filter(Boolean)
      ),
    ];
  }, [students]);

  /* =========================================================
     UNIQUE STANDARDS
  ========================================================= */

  const standards = useMemo(() => {
    return [
      ...new Set(
        students
          .map((item) => item.studentClass)
          .filter(Boolean)
      ),
    ];
  }, [students]);

  /* =========================================================
     STATUS CONFIG
  ========================================================= */

  const getStatusConfig = (status) => {
    if (status === "PAID") {
      return {
        bg: "#e8f7ee",
        color: "#198754",
        dot: "#198754",
      };
    }

    return {
      bg: "#fff0f0",
      color: "#dc3545",
      dot: "#dc3545",
    };
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = String(date).substring(0, 10);
    const parts = value.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  /* =========================================================
     JSX
  ========================================================= */

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
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <FaMoneyBillWave size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission Fee Payment
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/ &nbsp;
                    Fee Payment
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#e9f7ef",
                    color: "#198754",
                    border:
                      "1px solid #cfe8d8",
                  }}
                >
                  <FaMoneyBillWave
                    className="me-1"
                  />
                  Fee Collection
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
              Home &nbsp;›&nbsp;
              Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Admission Fee Payment
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        {/* TOTAL */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-blue shadow">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>
                Total Students
              </span>

              <h3>
                {totalStudents}
              </h3>

              <small>
                Approved / Enrolled
              </small>
            </div>

          </div>
        </div>

        {/* PAID */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-green shadow">

            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>
                Fee Paid
              </span>

              <h3>
                {paidStudents}
              </h3>

              <small>
                Payment completed
              </small>
            </div>

          </div>
        </div>

        {/* UNPAID */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-red shadow">

            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">
              <span>
                Unpaid
              </span>

              <h3>
                {unpaidStudents}
              </h3>

              <small>
                Payment pending
              </small>
            </div>

          </div>
        </div>

      

      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="ms-2 me-2 mt-4">

        <div className="card border-0 shadow rounded-4">

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">

              <div>

                <h6 className="mb-1 fw-bold">

                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />

                  Fee Payment Search

                </h6>

                <small className="text-muted">
                  Search students and filter
                  admission fee payments
                </small>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#e9f7ef",
                  color: "#198754",
                }}
              >
                {filteredStudents.length} Records
              </span>

            </div>
          </div>

          <div className="card-body p-3">

            {/* SEARCH */}

            <div className="row g-3">

              <div className="col-12 col-xl-4">

                <label className="form-label fw-semibold small">
                  Search Student
                </label>

                <div className="position-relative">

                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#6c757d",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, admission no, father name, mobile..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                    style={{
                      paddingLeft: "38px",
                    }}
                  />

                </div>
              </div>

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions.map(
                    (session) => (
                      <option
                        key={session}
                        value={session}
                      >
                        {session}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Standard
                </label>

                <select
                  name="standard"
                  value={filters.standard}
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >
                  <option value="">
                    All Standards
                  </option>

                  {standards.map(
                    (standard) => (
                      <option
                        key={standard}
                        value={standard}
                      >
                        {standard}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* MONTH */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Tuition Fee Month
                </label>

                <select
                  name="month"
                  value={filters.month}
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >
                  <option value="">
                    All Months
                  </option>

                  {MONTHS.map(
                    (month) => (
                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* STATUS */}

              <div className="col-12 col-sm-6 col-xl-2">

                <label className="form-label fw-semibold small">
                  Payment Status
                </label>

                <select
                  name="paymentStatus"
                  value={
                    filters.paymentStatus
                  }
                  onChange={
                    handleFilterChange
                  }
                  className="form-select"
                >
                  <option value="">
                    All Status
                  </option>

                  {PAYMENT_STATUS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="d-flex justify-content-end gap-2 mt-4 flex-wrap">

              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >
                <FaRedo
                  className="me-2"
                  size={13}
                />
                Reset
              </button>

              <button
                type="button"
                className="btn btn-primary px-4"
              >
                <FaSearch
                  className="me-2"
                  size={13}
                />
                Search
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="ms-2 me-2 mt-4 mb-4">

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          {/* TABLE HEADER */}

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#e9f7ef",
                    color: "#198754",
                  }}
                >
                  <FaMoneyBillWave
                    size={16}
                    className="text-primary"
                  />
                </div>

                <div>

                  <h6 className="mb-0 fw-bold">
                    Admission Fee Payment List
                  </h6>

                  <small className="text-muted">
                    Manage admission and
                    tuition fee payments
                  </small>

                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#f4f6f8",
                    color: "#495057",
                  }}
                >
                  Showing{" "}
                  <strong>
                    {filteredStudents.length}
                  </strong>
                </span>

                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={loadStudents}
                  disabled={loading}
                >
                  <FaRedo
                    size={12}
                    className={
                      loading ? "spin" : ""
                    }
                  />

                  Refresh
                </button>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body p-0">

            <div
              className="table-responsive"
              style={{
                maxHeight: "650px",
                overflowY: "auto",
              }}
            >

              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1450px",
                }}
              >

                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "#f8f9fa",
                  }}
                >

                  <tr
                    style={{
                      borderBottom:
                        "1px solid #dee2e6",
                    }}
                  >

                    <th
                      className="text-center"
                      style={{
                        width: "70px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        minWidth: "200px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      STUDENT
                    </th>

                    <th
                      style={{
                        minWidth: "140px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      ADMISSION NO
                    </th>

                    <th
                      style={{
                        minWidth: "220px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      PARENT DETAILS
                    </th>

                    <th
                      style={{
                        minWidth: "140px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      MOBILE
                    </th>

                    <th
                      style={{
                        minWidth: "130px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      SESSION
                    </th>

                    <th
                      style={{
                        minWidth: "120px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      STANDARD
                    </th>

                    <th
                      style={{
                        minWidth: "150px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      TUITION MONTH
                    </th>

                   

                    <th
                      className="text-center"
                      style={{
                        minWidth: "180px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      PAYMENT STATUS
                    </th>

                    

                    <th
                      className="text-center"
                      style={{
                        minWidth: "150px",
                        padding:
                          "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="12"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading fee payment records...
                        </div>

                      </td>

                    </tr>

                  ) : filteredStudents.length === 0 ? (

                    <tr>

                      <td
                        colSpan="12"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaMoneyBillWave
                            size={23}
                            className="text-primary"
                          />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Fee Payment Records
                        </h6>

                        <small className="text-muted">
                          No student matches the
                          selected filters.
                        </small>

                      </td>

                    </tr>

                  ) : (

                    filteredStudents.map(
                      (student, index) => {

                        const payment =
                          getPaymentData(
                            student
                          );

                        const statusConfig =
                          getStatusConfig(
                            payment.status
                          );

                        const studentName = [
                          student.firstName,
                          student.middleName,
                          student.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <tr
                            key={
                              student.id ||
                              student.admissionNumber
                            }
                            style={{
                              borderBottom:
                                "1px solid #f0f1f2",
                            }}
                          >

                            {/* NUMBER */}

                            <td className="text-center">

                              <span
                                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  background:
                                    "#f4f6f8",
                                  color: "#6c757d",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                {index + 1}
                              </span>

                            </td>

                            {/* STUDENT */}

                            <td>

                              <div className="d-flex align-items-center">

                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle me-2 text-primary"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    minWidth: "38px",
                                    background:
                                      "#e9f7ef",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                  }}
                                >
                                  {studentName
                                    ? studentName
                                        .charAt(0)
                                        .toUpperCase()
                                    : "S"}
                                </div>

                                <div>

                                  <div
                                    className="fw-semibold"
                                    style={{
                                      fontSize:
                                        "13px",
                                    }}
                                  >
                                    {studentName ||
                                      "N/A"}
                                  </div>

                                  <small className="text-muted">
                                    Student
                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* ADMISSION NO */}

                            <td>

                              <span
                                className="fw-bold text-primary"
                                style={{
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {student.admissionNumber ||
                                  "N/A"}
                              </span>

                            </td>

                            {/* PARENT */}

                            <td>

                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                }}
                              >

                                <div className="mb-1">

                                  <span className="text-muted">
                                    Father:
                                  </span>{" "}

                                  <strong>
                                    {student.fatherName ||
                                      "N/A"}
                                  </strong>

                                </div>

                                <div>

                                  <span className="text-muted">
                                    Mother:
                                  </span>{" "}

                                  <strong>
                                    {student.motherName ||
                                      "N/A"}
                                  </strong>

                                </div>

                              </div>

                            </td>

                            {/* MOBILE */}

                            <td>

                              <div
                                className="fw-semibold"
                                style={{
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {student.fatherMobile ||
                                  student.motherMobile ||
                                  student.preferredNo ||
                                  "N/A"}
                              </div>

                            </td>

                            {/* SESSION */}

                            <td>

                              <span
                                className="badge rounded-pill text-primary"
                                style={{
                                  background:
                                    "#f1f8f4",
                                  border:
                                    "1px solid #d9eee1",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {student.academicYear ||
                                  "N/A"}
                              </span>

                            </td>

                            {/* STANDARD */}

                            <td>

                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#f4f6f8",
                                  color:
                                    "#495057",
                                  border:
                                    "1px solid #e1e5e8",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {student.studentClass ||
                                  "N/A"}
                              </span>

                            </td>

                            {/* TUITION MONTH */}

                            <td>

                              {payment.month ? (
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    background:
                                      "#fff4d6",
                                    color:
                                      "#997404",
                                    border:
                                      "1px solid #ffe69c",
                                    fontWeight:
                                      "600",
                                    padding:
                                      "6px 10px",
                                  }}
                                >
                                  <FaCalendarDays
                                    size={11}
                                    className="me-1"
                                  />

                                  {payment.month}
                                </span>
                              ) : (
                                <span className="text-muted small">
                                  Not Selected
                                </span>
                              )}

                            </td>

                           
                            {/* PAYMENT STATUS */}

                            <td className="text-center">

                              <div className="d-flex align-items-center justify-content-center">

                                <div
                                  className="d-flex align-items-center rounded-pill"
                                  style={{
                                    background:
                                      statusConfig.bg,
                                    color:
                                      statusConfig.color,
                                    padding:
                                      "6px 10px",
                                    minWidth:
                                      "145px",
                                  }}
                                >

                                  <span
                                    className="rounded-circle me-2"
                                    style={{
                                      width: "7px",
                                      height: "7px",
                                      background:
                                        statusConfig.dot,
                                    }}
                                  />

                                  <span
                                    style={{
                                      fontWeight:
                                        "600",
                                      fontSize:
                                        "12px",
                                    }}
                                  >
                                    {payment.status ||
                                      "UNPAID"}
                                  </span>

                                </div>

                              </div>

                            </td>

                            {/* DATE */}

                           

                            {/* ACTION */}

                            <td className="text-center">

                              <button
                                className="btn btn-sm d-inline-flex align-items-center gap-1 text-primary"
                                style={{
                                  background:
                                    "#e9f7ef",
                                  border:
                                    "1px solid #cfe8d8",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 12px",
                                }}
                                onClick={() =>
                                  handlePayment(
                                    student.id
                                  )
                                }
                              >

                                <FaMoneyBillWave
                                  size={12}
                                />

                                {payment.status ===
                                "PAID"
                                  ? "View Payment"
                                  : "Pay Fee"}

                              </button>

                            </td>

                          </tr>
                        );
                      }
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <small className="text-muted">

                Showing{" "}

                <strong className="text-primary">
                  {filteredStudents.length}
                </strong>{" "}

                student(s)

              </small>

              <small className="text-muted">

                Total Collection:{" "}

                <strong
                  style={{
                    color: "#198754",
                  }}
                >
                  ₹{" "}
                  {totalCollection.toFixed(
                    2
                  )}
                </strong>

              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdfc;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 7px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #198754;
            box-shadow:
              0 0 0 0.15rem
              rgba(25, 135, 84, 0.10);
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .spin {
            animation:
              spin 0.8s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {

            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }

          }
        `}
      </style>
    </>
  );
};

export default AdmissionFeePayment;
