// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaPrint,
//   FaMoneyBillWave,
//   FaFileInvoiceDollar,
//   FaExclamationCircle,
//   FaPercentage,
//   FaReceipt,
//   FaEye,
//   FaFilePdf,
//   FaUserGraduate,
// } from "react-icons/fa";
// import axiosInstance from "../../api/axiosInstance";

// const Fee_LedgerDetails = () => {
//   const { admissionNumber } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   // ==========================================
//   // States
//   // ==========================================

//   const [loading, setLoading] = useState(true);
//   const [student, setStudent] = useState(null);
//   const [ledger, setLedger] = useState([]);
//   const [receipts, setReceipts] = useState([]);

//   const [summary, setSummary] = useState({
//     totalFee: 0,
//     paidAmount: 0,
//     dueAmount: 0,
//     fineAmount: 0,
//     discountAmount: 0,
//   });

//   // ==========================================
//   // Load All Data
//   // ==========================================

//   useEffect(() => {
//     if (!admissionNumber) return;

//     loadData();
//   }, [admissionNumber]);

//   const loadData = async () => {
//     setLoading(true);

//     try {
//       await Promise.all([
//         loadStudent(),
//         loadLedger(),
//         loadReceipts(),
//       ]);
//     } catch (error) {
//       console.log("Fee Ledger Load Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // Load Student
//   // ==========================================

//   const loadStudent = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/students/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudent(res.data);
//     } catch (error) {
//       console.log("Student Error:", error);
//       setStudent(null);
//     }
//   };

//   // ==========================================
//   // Load Fee Ledger
//   // ==========================================

//   const loadLedger = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/student-fee/schedule/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = Array.isArray(res.data) ? res.data : [];

//       setLedger(data);
//       calculateSummary(data);
//     } catch (error) {
//       console.log("Ledger Error:", error);

//       setLedger([]);
//       calculateSummary([]);
//     }
//   };

//   // ==========================================
//   // Load Receipt History
//   // ==========================================

//   const loadReceipts = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/student-fee/payment/history/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = Array.isArray(res.data) ? res.data : [];

//       const successReceipts = data.filter(
//         (item) => item.status === "SUCCESS"
//       );

//       setReceipts(successReceipts);
//     } catch (error) {
//       console.log("Receipt Error:", error);
//       setReceipts([]);
//     }
//   };

//   // ==========================================
//   // Summary Calculation
//   // ==========================================

//   const calculateSummary = (data) => {
//     const totalFee = data.reduce(
//       (sum, item) => sum + Number(item.amount || 0),
//       0
//     );

//     const paidAmount = data.reduce(
//       (sum, item) => sum + Number(item.paidAmount || 0),
//       0
//     );

//     const dueAmount = data.reduce(
//       (sum, item) => sum + Number(item.dueAmount || 0),
//       0
//     );

//     const fineAmount = data.reduce(
//       (sum, item) => sum + Number(item.fineAmount || 0),
//       0
//     );

//     const discountAmount = data.reduce(
//       (sum, item) => sum + Number(item.discountAmount || 0),
//       0
//     );

//     setSummary({
//       totalFee,
//       paidAmount,
//       dueAmount,
//       fineAmount,
//       discountAmount,
//     });
//   };

//   // ==========================================
//   // Currency
//   // ==========================================

//   const currency = (value) => {
//     return `₹ ${Number(value || 0).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   // ==========================================
//   // Print
//   // ==========================================

//   const handlePrint = () => {
//     window.print();
//   };

//   // ==========================================
//   // Loading
//   // ==========================================

//   if (loading) {
//     return (
//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{ minHeight: "60vh" }}
//       >
//         <div className="spinner-border text-primary" role="status"></div>

//         <h6 className="mt-3 text-muted">
//           Loading Fee Ledger...
//         </h6>
//       </div>
//     );
//   }

//   // ==========================================
//   // Student Not Found
//   // ==========================================

//   if (!student) {
//     return (
//       <div className="container-fluid mt-4">
//         <div className="card shadow border-0">
//           <div className="card-body text-center py-5">
//             <FaUserGraduate
//               size={45}
//               className="text-muted mb-3"
//             />

//             <h5>Student Not Found</h5>

//             <p className="text-muted mb-3">
//               No student record found for admission number{" "}
//               <strong>{admissionNumber}</strong>.
//             </p>

//             <button
//               className="btn btn-secondary"
//               onClick={() => navigate(-1)}
//             >
//               <FaArrowLeft className="me-2" />
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ==========================================
//           Print CSS
//       ========================================== */}

//       <style>
//         {`
//           @media print {
//             body {
//               background: #fff !important;
//             }

//             .no-print {
//               display: none !important;
//             }

//             .print-card {
//               box-shadow: none !important;
//               border: 1px solid #ddd !important;
//             }

//             .container-fluid {
//               width: 100% !important;
//               max-width: 100% !important;
//             }

//             .table {
//               font-size: 11px !important;
//             }

//             .student-image {
//               width: 80px !important;
//               height: 80px !important;
//             }
//           }
//         `}
//       </style>

//       {/* ==========================================
//           Header
//       ========================================== */}

//       <div className="container-fluid">
//         <div className="card shadow border-0 mb-3 no-print">
//           <div className="card-body p-3">
//             <div className="row align-items-center">
//               <div className="col-md-7">
//                 <h5 className="mb-1 fw-semibold">
//                   Fee Ledger Details
//                 </h5>

//                 <nav aria-label="breadcrumb">
//                   <ol className="breadcrumb mb-0">
//                     <li className="breadcrumb-item">
//                       Home
//                     </li>

//                     <li className="breadcrumb-item">
//                       Fee
//                     </li>

//                     <li className="breadcrumb-item active">
//                       Fee Ledger
//                     </li>
//                   </ol>
//                 </nav>
//               </div>

//               <div className="col-md-5 text-md-end mt-3 mt-md-0">
//                 <button
//                   className="btn btn-secondary btn-sm me-2"
//                   onClick={() => navigate(-1)}
//                 >
//                   <FaArrowLeft className="me-1" />
//                   Back
//                 </button>

//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={handlePrint}
//                 >
//                   <FaPrint className="me-1" />
//                   Print Ledger
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//             Student Information
//         ========================================== */}

//         <div className="card shadow border-0 mb-4 print-card">
//           <div className="card-header bg-primary text-white">
//             <div className="d-flex align-items-center">
//               <FaUserGraduate className="me-2" />

//               <h6 className="mb-0">
//                 Student Information
//               </h6>
//             </div>
//           </div>

//           <div className="card-body">
//             <div className="row align-items-center">
//               {/* Image */}

//               <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
//                 <img
//                   src={
//                     student.studentImage ||
//                     "/images/default-avatar.png"
//                   }
//                   alt="Student"
//                   className="img-thumbnail student-image"
//                   style={{
//                     width: "125px",
//                     height: "125px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </div>

//               {/* Basic Details */}

//               <div className="col-lg-5 col-md-5">
//                 <table className="table table-borderless table-sm mb-0">
//                   <tbody>
//                     <tr>
//                       <th style={{ width: "140px" }}>
//                         Name
//                       </th>

//                       <td>
//                         {student.firstName}{" "}
//                         {student.lastName}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Admission No</th>

//                       <td className="fw-semibold">
//                         {student.admissionNumber}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Class</th>

//                       <td>
//                         {student.studentClass || "-"}
//                         {" / "}
//                         {student.section || "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Session</th>

//                       <td>
//                         {student.academicYear || "-"}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* Fee Details */}

//               <div className="col-lg-5 col-md-4">
//                 <table className="table table-borderless table-sm mb-0">
//                   <tbody>
//                     <tr>
//                       <th style={{ width: "140px" }}>
//                         Mobile
//                       </th>

//                       <td>
//                         {student.mobile || "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Fee Category</th>

//                       <td>
//                         {student.feeCategory || "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Fee Batch</th>

//                       <td>
//                         {student.feeBatch || "-"}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Status</th>

//                       <td>
//                         <span className="badge bg-success">
//                           ACTIVE
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//             Summary Cards
//         ========================================== */}

//         <div className="row g-3 mb-4">
//           {/* Total */}

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <small className="text-muted">
//                       Total Fee
//                     </small>

//                     <h5 className="fw-bold mt-2 mb-0">
//                       {currency(summary.totalFee)}
//                     </h5>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaFileInvoiceDollar />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Paid */}

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <small className="text-muted">
//                       Paid Amount
//                     </small>

//                     <h5 className="fw-bold text-success mt-2 mb-0">
//                       {currency(summary.paidAmount)}
//                     </h5>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaMoneyBillWave />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Due */}

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <small className="text-muted">
//                       Due Amount
//                     </small>

//                     <h5 className="fw-bold text-danger mt-2 mb-0">
//                       {currency(summary.dueAmount)}
//                     </h5>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaExclamationCircle />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Fine */}

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <small className="text-muted">
//                       Fine
//                     </small>

//                     <h5 className="fw-bold text-warning mt-2 mb-0">
//                       {currency(summary.fineAmount)}
//                     </h5>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-warning text-dark"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaExclamationCircle />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Discount */}

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div>
//                     <small className="text-muted">
//                       Discount
//                     </small>

//                     <h5 className="fw-bold text-info mt-2 mb-0">
//                       {currency(summary.discountAmount)}
//                     </h5>
//                   </div>

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-circle bg-info text-white"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                     }}
//                   >
//                     <FaPercentage />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//             Fee Ledger
//         ========================================== */}

//         <div className="card shadow border-0 mb-4 print-card">
//           <div className="card-header bg-dark text-white">
//             <div className="d-flex align-items-center">
//               <FaFileInvoiceDollar className="me-2" />

//               <h6 className="mb-0">
//                 Fee Ledger
//               </h6>
//             </div>
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle text-center mb-0">
//                 <thead className="table-primary">
//                   <tr>
//                     <th>#</th>
//                     <th>Month</th>
//                     <th>Fee Code</th>
//                     <th>Fee Name</th>
//                     <th>Amount</th>
//                     <th>Paid</th>
//                     <th>Due</th>
//                     <th>Status</th>
//                     <th>Generate Date</th>
//                     <th>Due Date</th>
//                     <th>Payment Date</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {ledger.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="11"
//                         className="text-center py-4 text-danger"
//                       >
//                         <FaExclamationCircle className="me-2" />
//                         No Fee Generated
//                       </td>
//                     </tr>
//                   ) : (
//                     ledger.map((fee, index) => (
//                       <tr key={fee.id || index}>
//                         <td>{index + 1}</td>

//                         <td>
//                           {fee.month || "-"}
//                         </td>

//                         <td>
//                           {fee.feeCode || "-"}
//                         </td>

//                         <td className="text-start">
//                           {fee.feeName || "-"}
//                         </td>

//                         <td className="fw-semibold">
//                           {currency(fee.amount)}
//                         </td>

//                         <td className="text-success fw-bold">
//                           {currency(fee.paidAmount)}
//                         </td>

//                         <td className="text-danger fw-bold">
//                           {currency(fee.dueAmount)}
//                         </td>

//                         <td>
//                           <span
//                             className={`badge ${
//                               fee.status === "PAID"
//                                 ? "bg-success"
//                                 : fee.status === "PARTIAL"
//                                   ? "bg-warning text-dark"
//                                   : "bg-danger"
//                             }`}
//                           >
//                             {fee.status || "DUE"}
//                           </span>
//                         </td>

//                         <td>
//                           {fee.generateDate || "-"}
//                         </td>

//                         <td>
//                           {fee.dueDate || "-"}
//                         </td>

//                         <td>
//                           {fee.paymentDate || "-"}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>

//                 {ledger.length > 0 && (
//                   <tfoot className="table-secondary">
//                     <tr>
//                       <th
//                         colSpan="4"
//                         className="text-end"
//                       >
//                         Grand Total
//                       </th>

//                       <th>
//                         {currency(summary.totalFee)}
//                       </th>

//                       <th className="text-success">
//                         {currency(summary.paidAmount)}
//                       </th>

//                       <th className="text-danger">
//                         {currency(summary.dueAmount)}
//                       </th>

//                       <th colSpan="4"></th>
//                     </tr>
//                   </tfoot>
//                 )}
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//             Receipt History
//         ========================================== */}

//         <div className="card shadow border-0 mb-4 print-card">
//           <div className="card-header bg-success text-white">
//             <div className="d-flex align-items-center">
//               <FaReceipt className="me-2" />

//               <h6 className="mb-0">
//                 Receipt History
//               </h6>
//             </div>
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle text-center mb-0">
//                 <thead className="table-success">
//                   <tr>
//                     <th>#</th>
//                     <th>Receipt No</th>
//                     <th>Paid Month</th>
//                     <th>Payment Mode</th>
//                     <th>Transaction Id</th>
//                     <th>Collected By</th>
//                     <th>Paid Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th className="no-print">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {receipts.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="10"
//                         className="text-center py-4 text-danger"
//                       >
//                         <FaReceipt className="me-2" />
//                         No Receipt Found
//                       </td>
//                     </tr>
//                   ) : (
//                     receipts.map((receipt, index) => (
//                       <tr key={receipt.id || index}>
//                         <td>{index + 1}</td>

//                         <td className="fw-semibold">
//                           {receipt.receiptNo || "-"}
//                         </td>

//                         <td>
//                           {receipt.month || "-"}
//                         </td>

//                         <td>
//                           {receipt.paymentMode || "-"}
//                         </td>

//                         <td>
//                           {receipt.transactionId || "-"}
//                         </td>

//                         <td>
//                           {receipt.collectedBy || "-"}
//                         </td>

//                         <td>
//                           {receipt.paymentDate || "-"}
//                         </td>

//                         <td className="fw-bold text-success">
//                           {currency(receipt.amount)}
//                         </td>

//                         <td>
//                           <span className="badge bg-success">
//                             PAID
//                           </span>
//                         </td>

//                         <td className="no-print">
//                           <button
//                             className="btn btn-sm btn-primary me-2"
//                             title="View Receipt"
//                             onClick={() =>
//                               navigate(
//                                 `/fee/receipt/${receipt.receiptNo}`
//                               )
//                             }
//                           >
//                             <FaEye className="me-1" />
//                             View
//                           </button>

//                           <button
//                             className="btn btn-sm btn-success"
//                             title="Print Receipt"
//                             onClick={() =>
//                               window.open(
//                                 `/fee/receipt/print/${receipt.id}`,
//                                 "_blank"
//                               )
//                             }
//                           >
//                             <FaPrint className="me-1" />
//                             Print
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//             Bottom Actions
//         ========================================== */}

//         <div className="card shadow border-0 mb-5 no-print">
//           <div className="card-body">
//             <div className="row g-2">
//               <div className="col-lg-3 col-md-6">
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() =>
//                     navigate(
//                       `/fee/feecollection/${student.admissionNumber}`
//                     )
//                   }
//                 >
//                   <FaMoneyBillWave className="me-2" />
//                   Fee Collection
//                 </button>
//               </div>

//               <div className="col-lg-3 col-md-6">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={handlePrint}
//                 >
//                   <FaPrint className="me-2" />
//                   Print Ledger
//                 </button>
//               </div>

//               <div className="col-lg-3 col-md-6">
//                 <button
//                   className="btn btn-warning w-100"
//                   onClick={() => navigate(-1)}
//                 >
//                   <FaArrowLeft className="me-2" />
//                   Back
//                 </button>
//               </div>

//               <div className="col-lg-3 col-md-6">
//                 <button
//                   className="btn btn-danger w-100"
//                   onClick={() => navigate("/")}
//                 >
//                   <FaFilePdf className="me-2" />
//                   Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Fee_LedgerDetails;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrint,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaExclamationCircle,
  FaPercentage,
  FaReceipt,
  FaEye,
  FaFilePdf,
  FaUserGraduate,
} from "react-icons/fa";
import { MdOutlineSchool, MdOutlineFormatListBulleted } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";

const Fee_LedgerDetails = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [receipts, setReceipts] = useState([]);

  const [summary, setSummary] = useState({
    totalFee: 0,
    paidAmount: 0,
    dueAmount: 0,
    fineAmount: 0,
    discountAmount: 0,
  });

  // ==========================================
  // Load All Data
  // ==========================================

  useEffect(() => {
    if (!admissionNumber) return;

    loadData();
  }, [admissionNumber]);

  const loadData = async () => {
    setLoading(true);

    try {
      await Promise.all([loadStudent(), loadLedger(), loadReceipts()]);
    } catch (error) {
      console.log("Fee Ledger Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Load Student
  // ==========================================

  const loadStudent = async () => {
    try {
      const res = await axiosInstance.get(`/api/students/${admissionNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudent(res.data);
    } catch (error) {
      console.log("Student Error:", error);
      setStudent(null);
    }
  };

  // ==========================================
  // Load Ledger
  // ==========================================

  const loadLedger = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/schedule/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = Array.isArray(res.data) ? res.data : [];

      setLedger(data);
      calculateSummary(data);
    } catch (error) {
      console.log("Ledger Error:", error);

      setLedger([]);
      calculateSummary([]);
    }
  };

  // ==========================================
  // Load Receipts
  // ==========================================

  const loadReceipts = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/payment/history/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = Array.isArray(res.data) ? res.data : [];

      const successReceipts = data.filter((item) => item.status === "SUCCESS");

      setReceipts(successReceipts);
    } catch (error) {
      console.log("Receipt Error:", error);
      setReceipts([]);
    }
  };

  // ==========================================
  // Calculate Summary
  // ==========================================

  const calculateSummary = (data) => {
    const totalFee = data.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const paidAmount = data.reduce(
      (sum, item) => sum + Number(item.paidAmount || 0),
      0,
    );

    const dueAmount = data.reduce(
      (sum, item) => sum + Number(item.dueAmount || 0),
      0,
    );

    const fineAmount = data.reduce(
      (sum, item) => sum + Number(item.fineAmount || 0),
      0,
    );

    const discountAmount = data.reduce(
      (sum, item) => sum + Number(item.discountAmount || 0),
      0,
    );

    setSummary({
      totalFee,
      paidAmount,
      dueAmount,
      fineAmount,
      discountAmount,
    });
  };

  // ==========================================
  // Currency
  // ==========================================

  const currency = (value) => {
    return `₹ ${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ==========================================
  // Print
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />

        <h6 className="mt-3 text-muted">Loading Fee Ledger...</h6>
      </div>
    );
  }

  // ==========================================
  // Student Not Found
  // ==========================================

  if (!student) {
    return (
      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div className="card-body text-center py-5">
            <FaUserGraduate size={45} className="text-muted mb-3" />

            <h5 className="fw-bold">Student Not Found</h5>

            <p className="text-muted mb-3">
              No student record found for admission number{" "}
              <strong>{admissionNumber}</strong>.
            </p>

            <button
              className="btn btn-secondary rounded-3 px-4"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================
          PRINT CSS
      ========================================== */}

      <style>
        {`
          @media print {
            body {
              background: #fff !important;
            }

            .no-print {
              display: none !important;
            }

            .print-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            .container-fluid {
              width: 100% !important;
              max-width: 100% !important;
            }

            .table {
              font-size: 10px !important;
            }

            .student-image {
              width: 80px !important;
              height: 80px !important;
            }

            .summary-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }
          }
        `}
      </style>

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

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
              {/* Left */}

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaFileInvoiceDollar size={25} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Fee Ledger Details</h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Fee Ledger &nbsp;/&nbsp; Details
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="d-flex align-items-center gap-2 no-print">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fees
                </span>

                <button
                  className="btn btn-outline-secondary btn-sm rounded-3"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-1" />
                  Back
                </button>

                <button
                  className="btn btn-primary btn-sm rounded-3"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-1" />
                  Print
                </button>
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
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp; Fee Ledger &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Details</span>
            </small>
          </div>
        </div>
      </div>

      {/* ==========================================
          STUDENT INFORMATION
      ========================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4 print-card">
          <div className="card-header bg-white border-0 rounded-top-4 py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-2"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <FaUserGraduate size={19} />
              </div>

              <div className="d-flex flex-column">
                <h6 className="mb-0 fw-semibold">Student Information</h6>

                <small className="text-muted">
                  Student basic and fee details
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-3 p-md-4">
            <div className="row align-items-center">
              {/* Student Image */}

              <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
                <img
                  src={student.studentImage || "/images/default-avatar.png"}
                  alt="Student"
                  className="img-thumbnail student-image"
                  style={{
                    width: "125px",
                    height: "125px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>

              {/* Basic Details */}

              <div className="col-lg-5 col-md-5">
                <table className="table table-borderless table-sm mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "140px" }}>Name</th>

                      <td className="fw-medium">
                        {student.firstName || ""} {student.middleName || ""}{" "}
                        {student.lastName || ""}
                      </td>
                    </tr>

                    <tr>
                      <th>Admission No</th>

                      <td className="fw-semibold text-primary">
                        {student.admissionNumber || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Class</th>

                      <td>
                        {student.studentClass || "-"} / {student.section || "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Session</th>

                      <td>{student.academicYear || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fee Details */}

              <div className="col-lg-5 col-md-4">
                <table className="table table-borderless table-sm mb-0">
                  <tbody>
                    <tr>
                      <th style={{ width: "140px" }}>Mobile</th>

                      <td>
                        {student.mobile ||
                          student.fatherMobile ||
                          student.motherMobile ||
                          "-"}
                      </td>
                    </tr>

                    <tr>
                      <th>Fee Category</th>

                      <td>{student.feeCategory || "-"}</td>
                    </tr>

                    <tr>
                      <th>Fee Batch</th>

                      <td>{student.feeBatch || "-"}</td>
                    </tr>

                    <tr>
                      <th>Status</th>

                      <td>
                        <span className="badge bg-success">ACTIVE</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SUMMARY CARDS
      ========================================== */}
      {/* ==========================================
    Summary Cards
========================================== */}

      <div className="row g-3 mb-4 px-2">
        {/* Total Fee */}
        <div className="col-xl col-lg-4 col-md-6 ">
          <div className="premium-stat-card stat-blue h-100 shadow">
            <div className="stat-icon">
              <FaFileInvoiceDollar />
            </div>

            <div className="stat-content">
              <span>Total Fee</span>

              <h3>{currency(summary.totalFee)}</h3>

              <small>Total generated fee</small>
            </div>
          </div>
        </div>

        {/* Paid Amount */}
        <div className="col-xl col-lg-4 col-md-6">
          <div className="premium-stat-card stat-green h-100 shadow">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div className="stat-content">
              <span>Paid Amount</span>

              <h3>{currency(summary.paidAmount)}</h3>

              <small>Total amount received</small>
            </div>
          </div>
        </div>

        {/* Due Amount */}
        <div className="col-xl col-lg-4 col-md-6">
          <div className="premium-stat-card stat-red h-100 shadow">
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>

            <div className="stat-content">
              <span>Due Amount</span>

              <h3>{currency(summary.dueAmount)}</h3>

              <small>Outstanding amount</small>
            </div>
          </div>
        </div>

        {/* Fine */}
        <div className="col-xl col-lg-4 col-md-6">
          <div className="premium-stat-card stat-orange h-100 shadow">
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>

            <div className="stat-content">
              <span>Fine</span>

              <h3>{currency(summary.fineAmount)}</h3>

              <small>Total fine amount</small>
            </div>
          </div>
        </div>

        {/* Discount */}
        <div className="col-xl col-lg-4 col-md-6">
          <div className="premium-stat-card stat-blue h-100 shadow">
            <div className="stat-icon">
              <FaPercentage />
            </div>

            <div className="stat-content">
              <span>Discount</span>

              <h3>{currency(summary.discountAmount)}</h3>

              <small>Total discount</small>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          FEE LEDGER
      ========================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4 print-card">
          <div className="card-header bg-white border-0 rounded-top-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-2"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdOutlineFormatListBulleted size={20} />
                </div>

                <div className="d-flex flex-column">
                  <h6 className="mb-0 fw-semibold">Fee Ledger</h6>

                  <small className="text-muted">Complete fee schedule</small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                {ledger.length} Records
              </span>
            </div>
          </div>

          <div className="card-body p-1 rounded-bottom-4">
            <div className="table-responsive">
              <table className="table align-middle mb-0 fw-medium small">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Month</th>
                    <th>Fee Code</th>
                    <th>Fee Name</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end">Paid</th>
                    <th className="text-end">Due</th>
                    <th className="text-center">Status</th>
                    <th>Generate Date</th>
                    <th>Due Date</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>

                <tbody>
                  {ledger.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-5">
                        <FaExclamationCircle
                          className="text-danger mb-2"
                          size={25}
                        />

                        <div className="text-danger fw-semibold">
                          No Fee Generated
                        </div>

                        <small className="text-muted">
                          No fee schedule found for this student.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    ledger.map((fee, index) => (
                      <tr key={fee.id || index}>
                        <td className="text-center fw-semibold">{index + 1}</td>

                        <td>{fee.month || "-"}</td>

                        <td>
                          <span className="fw-semibold text-primary">
                            {fee.feeCode || "-"}
                          </span>
                        </td>

                        <td>{fee.feeName || "-"}</td>

                        <td className="text-end fw-semibold">
                          {currency(fee.amount)}
                        </td>

                        <td className="text-end">
                          <span
                            className="fw-semibold px-2 py-1 rounded-2"
                            style={{
                              background: "#ecfdf5",
                              color: "#15803d",
                            }}
                          >
                            {currency(fee.paidAmount)}
                          </span>
                        </td>

                        <td className="text-end">
                          <span
                            className="fw-semibold px-2 py-1 rounded-2"
                            style={{
                              background: "#fef2f2",
                              color: "#dc2626",
                            }}
                          >
                            {currency(fee.dueAmount)}
                          </span>
                        </td>

                        <td className="text-center">
                          <span
                            className={`badge ${
                              fee.status === "PAID"
                                ? "bg-success"
                                : fee.status === "PARTIAL"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                            }`}
                          >
                            {fee.status || "DUE"}
                          </span>
                        </td>

                        <td>{fee.generateDate || "-"}</td>

                        <td>{fee.dueDate || "-"}</td>

                        <td>{fee.paymentDate || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>

                {ledger.length > 0 && (
                  <tfoot className="table-light">
                    <tr>
                      <th colSpan="4" className="text-end">
                        Grand Total
                      </th>

                      <th className="text-end fw-bold">
                        {currency(summary.totalFee)}
                      </th>

                      <th className="text-end text-success fw-bold">
                        {currency(summary.paidAmount)}
                      </th>

                      <th className="text-end text-danger fw-bold">
                        {currency(summary.dueAmount)}
                      </th>

                      <th colSpan="4"></th>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          RECEIPT HISTORY
      ========================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4 print-card">
          <div className="card-header bg-white border-0 rounded-top-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-2"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaReceipt size={19} />
                </div>

                <div className="d-flex flex-column">
                  <h6 className="mb-0 fw-semibold">Receipt History</h6>

                  <small className="text-muted">
                    Successful payment records
                  </small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#ecfdf5",
                  color: "#15803d",
                  border: "1px solid #bbf7d0",
                }}
              >
                {receipts.length} Receipts
              </span>
            </div>
          </div>

          <div className="card-body p-1 rounded-bottom-4">
            <div className="table-responsive">
              <table className="table align-middle mb-0 fw-medium small">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Receipt No</th>
                    <th>Paid Month</th>
                    <th>Payment Mode</th>
                    <th>Transaction Id</th>
                    <th>Collected By</th>
                    <th>Paid Date</th>
                    <th className="text-end">Amount</th>
                    <th className="text-center">Status</th>
                    <th className="text-center no-print">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {receipts.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-5">
                        <FaReceipt className="text-danger mb-2" size={25} />

                        <div className="text-danger fw-semibold">
                          No Receipt Found
                        </div>

                        <small className="text-muted">
                          No successful payment receipt found.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    receipts.map((receipt, index) => (
                      <tr key={receipt.id || index}>
                        <td className="text-center fw-semibold">{index + 1}</td>

                        <td>
                          <span className="fw-semibold text-primary">
                            {receipt.receiptNo || "-"}
                          </span>
                        </td>

                        <td>{receipt.month || "-"}</td>

                        <td>{receipt.paymentMode || "-"}</td>

                        <td>{receipt.transactionId || "-"}</td>

                        <td>{receipt.collectedBy || "-"}</td>

                        <td>{receipt.paymentDate || "-"}</td>

                        <td className="text-end text-success fw-bold">
                          {currency(receipt.amount)}
                        </td>

                        <td className="text-center">
                          <span className="badge bg-success">PAID</span>
                        </td>

                        <td className="text-center no-print">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-3 me-2"
                            title="View Receipt"
                            onClick={() =>
                              navigate(`/fee/receipt/${receipt.receiptNo}`)
                            }
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          <button
                            className="btn btn-sm btn-outline-success rounded-3"
                            title="Print Receipt"
                            onClick={() =>
                              window.open(
                                `/fee/receipt/print/${receipt.id}`,
                                "_blank",
                              )
                            }
                          >
                            <FaPrint className="me-1" />
                            Print
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM ACTIONS
      ========================================== */}

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-5 no-print">
          <div className="card-body p-3">
            <div className="row g-2">
              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-primary w-100 rounded-3"
                  onClick={() =>
                    navigate(`/fee/feecollection/${student.admissionNumber}`)
                  }
                >
                  <FaMoneyBillWave className="me-2" />
                  Fee Collection
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-success w-100 rounded-3"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-2" />
                  Print Ledger
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-outline-secondary w-100 rounded-3"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>
              </div>

              <div className="col-lg-3 col-md-6">
                <button
                  className="btn btn-outline-danger w-100 rounded-3"
                  onClick={() => navigate("/")}
                >
                  <FaFilePdf className="me-2" />
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fee_LedgerDetails;
