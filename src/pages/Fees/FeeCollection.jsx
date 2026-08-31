// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCheckCircle,
//   FaMoneyBillWave,
//   FaReceipt,
//   FaUserGraduate,
// } from "react-icons/fa";
// import { MdCurrencyRupee } from "react-icons/md";
// import axiosInstance from "../../api/axiosInstance";

// const FeeCollection = () => {
//   const { admissionNumber } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const [loading, setLoading] = useState(true);
//   const [collecting, setCollecting] = useState(false);

//   const [student, setStudent] = useState(null);
//   const [schedules, setSchedules] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);

//   const [paymentMode, setPaymentMode] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [chequeNo, setChequeNo] = useState("");
//   const [remarks, setRemarks] = useState("");

//   const [fineAmount, setFineAmount] = useState("");
//   const [discountAmount, setDiscountAmount] = useState("");
//   const [paidAmount, setPaidAmount] = useState("");

//   const [receipt, setReceipt] = useState(null);

//   useEffect(() => {
//     loadData();
//   }, [admissionNumber]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       await Promise.all([loadStudent(), loadSchedules()]);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadStudent = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/students/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setStudent(res.data);
//     } catch (error) {
//       console.log(error);
//       setStudent(null);
//     }
//   };

//   const loadSchedules = async () => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/student-fee/schedule/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const dueFees = (res.data || []).filter(
//         (item) => item.status === "UNPAID" || item.status === "PARTIAL",
//       );

//       setSchedules(dueFees);
//     } catch (error) {
//       console.log(error);
//       setSchedules([]);
//     }
//   };

//   const selectedFees = useMemo(
//     () => schedules.filter((item) => selectedIds.includes(item.id)),
//     [schedules, selectedIds],
//   );

//   const totalDue = useMemo(
//     () =>
//       selectedFees.reduce(
//         (sum, item) => sum + Number(item.dueAmount || 0),
//         0,
//       ),
//     [selectedFees],
//   );

//   const fine = Number(fineAmount || 0);
//   const discount = Number(discountAmount || 0);
//   const paying = Number(paidAmount || 0);

//   const netPayable = Math.max(totalDue + fine - discount, 0);
//   const remaining = Math.max(netPayable - paying, 0);

//   const handleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((item) => item !== id)
//         : [...prev, id],
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(schedules.map((item) => item.id));
//     } else {
//       setSelectedIds([]);
//     }
//   };

//   const handlePaymentModeChange = (e) => {
//     const mode = e.target.value;

//     setPaymentMode(mode);

//     if (mode === "Cash") {
//       setTransactionId("");
//       setBankName("");
//       setChequeNo("");
//     }
//   };

//   const handleCollectFee = async () => {
//     if (selectedIds.length === 0) {
//       alert("Please select at least one fee.");
//       return;
//     }

//     if (!paymentMode) {
//       alert("Please select payment mode.");
//       return;
//     }

//     if (fine < 0 || discount < 0) {
//       alert("Fine and discount cannot be negative.");
//       return;
//     }

//     if (discount > totalDue + fine) {
//       alert("Discount cannot exceed payable amount.");
//       return;
//     }

//     if (!paidAmount || paying <= 0) {
//       alert("Please enter paying amount.");
//       return;
//     }

//     if (paying > netPayable) {
//       alert("Paid amount cannot exceed payable amount.");
//       return;
//     }

//     if (paymentMode !== "Cash" && !transactionId.trim()) {
//       alert("Transaction Id is required.");
//       return;
//     }

//     if (
//       (paymentMode === "Online" || paymentMode === "UPI") &&
//       !bankName.trim()
//     ) {
//       alert("Bank Name is required.");
//       return;
//     }

//     if (paymentMode === "Cheque") {
//       if (!bankName.trim()) {
//         alert("Bank Name is required.");
//         return;
//       }

//       if (!chequeNo.trim()) {
//         alert("Cheque Number is required.");
//         return;
//       }
//     }

//     try {
//       setCollecting(true);

//       const payload = {
//         scheduleIds: selectedIds,
//         paymentMode,
//         paidAmount: paying,
//         transactionId: transactionId.trim(),
//         bankName: bankName.trim(),
//         chequeNo: chequeNo.trim(),
//         remarks: remarks.trim(),
//         collectedBy: user?.name || user?.username || "Admin",
//         fineAmount: fine,
//         discountAmount: discount,
//       };

//       const res = await axiosInstance.post(
//         "/api/student-fee/payment",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       setReceipt(res.data);

//       alert("Fee Collected Successfully");

//       navigate(`/fee/receipt/${res.data.receiptNo}`);
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Fee Collection Failed",
//       );
//     } finally {
//       setCollecting(false);
//     }
//   };

//   const resetForm = () => {
//     setSelectedIds([]);
//     setPaymentMode("");
//     setTransactionId("");
//     setBankName("");
//     setChequeNo("");
//     setRemarks("");
//     setFineAmount("");
//     setDiscountAmount("");
//     setPaidAmount("");
//     setReceipt(null);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex flex-column align-items-center justify-content-center py-5">
//         <div className="spinner-border text-primary" />
//         <h6 className="mt-3 text-muted">Loading Fee Collection...</h6>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="card shadow border-0 mt-3">
//         <div className="card-body text-center py-5">
//           <h5 className="text-danger">Student Not Found</h5>
//           <button
//             className="btn btn-secondary mt-3"
//             onClick={() => navigate(-1)}
//           >
//             <FaArrowLeft className="me-2" />
//             Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-4">
//       <div
//         className="g-white shadow rounded p-3 mb-3 mt-3"
//        style={{
//           borderLeft: "5px solid #0d6efd",
//         }}
//       >
//         <div className="row align-items-center">
//           <div className="col-md-8">
//             <h5 className="mb-1">
//               <strong>Fee Collection</strong>
//             </h5>

//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0">
//                 <li className="breadcrumb-item">Home</li>
//                 <li className="breadcrumb-item">Fee</li>
//                 <li className="breadcrumb-item active">
//                   Fee Collection
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <div className="col-md-4 text-md-end mt-3 mt-md-0">
//             <button
//               className="btn btn-secondary btn-sm"
//               onClick={() => navigate(-1)}
//             >
//               <FaArrowLeft className="me-2" />
//               Back
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow border-0 mb-3">
//         <div className="card-header bg-primary text-white py-3">
//           <h6 className="mb-0">
//             <FaUserGraduate className="me-2" />
//             Student Details
//           </h6>
//         </div>

//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
//               <img
//                 src={student.studentImage}
//                 alt="Student"
//                 className="img-thumbnail shadow"
//                 style={{
//                   width: "120px",
//                   height: "120px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//               />
//             </div>

//             <div className="col-lg-5 col-md-9">
//               <div className="table-responsive">
//                 <table className="table table-borderless table-sm mb-0">
//                   <tbody>
//                     <tr>
//                       <th width="150">Student Name</th>
//                       <td>
//                         {student.firstName} {student.lastName}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Admission No</th>
//                       <td>{student.admissionNumber}</td>
//                     </tr>

//                     <tr>
//                       <th>Class</th>
//                       <td>
//                         {student.studentClass} / {student.section}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Session</th>
//                       <td>{student.academicYear || "-"}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="table-responsive">
//                 <table className="table table-borderless table-sm mb-0">
//                   <tbody>
//                     <tr>
//                       <th width="150">Mobile</th>
//                       <td>{student.mobile || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Fee Category</th>
//                       <td>{student.feeCategory || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Fee Batch</th>
//                       <td>{student.feeBatch || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Status</th>
//                       <td>
//                         <span className="badge bg-success">ACTIVE</span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row g-3 mb-3">
//         <div className="col-md-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded"
//                 style={{ width: 50, height: 50 }}
//               >
//                 <FaReceipt size={21} />
//               </div>

//               <div className="ms-3">
//                 <small className="text-muted">Selected Fees</small>
//                 <h5 className="mb-0">{selectedIds.length}</h5>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center rounded"
//                 style={{ width: 50, height: 50 }}
//               >
//                 <MdCurrencyRupee size={25} />
//               </div>

//               <div className="ms-3">
//                 <small className="text-muted">Total Due</small>
//                 <h5 className="mb-0">₹ {totalDue.toFixed(2)}</h5>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body d-flex align-items-center">
//               <div
//                 className="bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center rounded"
//                 style={{ width: 50, height: 50 }}
//               >
//                 <FaMoneyBillWave size={21} />
//               </div>

//               <div className="ms-3">
//                 <small className="text-muted">Payable Amount</small>
//                 <h5 className="mb-0">₹ {netPayable.toFixed(2)}</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow border-0 mb-3">
//         <div className="card-header bg-danger text-white py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <h6 className="mb-0">Select Due Fee</h6>

//             {schedules.length > 0 && (
//               <div className="form-check mb-0">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="selectAll"
//                   checked={
//                     selectedIds.length === schedules.length &&
//                     schedules.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />

//                 <label
//                   className="form-check-label text-white"
//                   htmlFor="selectAll"
//                 >
//                   Select All
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th width="60" className="text-center">
//                     Select
//                   </th>
//                   <th>#</th>
//                   <th>Month</th>
//                   <th>Fee Code</th>
//                   <th>Fee Name</th>
//                   <th>Amount</th>
//                   <th>Paid</th>
//                   <th>Due</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {schedules.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="9"
//                       className="text-center text-danger py-4"
//                     >
//                       No Due Fee Found
//                     </td>
//                   </tr>
//                 ) : (
//                   schedules.map((item, index) => (
//                     <tr
//                       key={item.id}
//                       className={
//                         selectedIds.includes(item.id)
//                           ? "table-primary"
//                           : ""
//                       }
//                     >
//                       <td className="text-center">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           checked={selectedIds.includes(item.id)}
//                           onChange={() => handleSelect(item.id)}
//                         />
//                       </td>

//                       <td>{index + 1}</td>

//                       <td>{item.month}</td>

//                       <td>{item.feeCode}</td>

//                       <td>{item.feeName}</td>

//                       <td>₹ {Number(item.amount || 0).toFixed(2)}</td>

//                       <td className="text-success fw-semibold">
//                         ₹ {Number(item.paidAmount || 0).toFixed(2)}
//                       </td>

//                       <td className="text-danger fw-bold">
//                         ₹ {Number(item.dueAmount || 0).toFixed(2)}
//                       </td>

//                       <td>
//                         <span
//                           className={`badge ${
//                             item.status === "PARTIAL"
//                               ? "bg-warning text-dark"
//                               : "bg-danger"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>

//               {selectedIds.length > 0 && (
//                 <tfoot className="table-secondary">
//                   <tr>
//                     <th colSpan="7" className="text-end">
//                       Selected Total
//                     </th>
//                     <th className="text-danger">
//                       ₹ {totalDue.toFixed(2)}
//                     </th>
//                     <th></th>
//                   </tr>
//                 </tfoot>
//               )}
//             </table>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow border-0 mb-3">
//         <div className="card-header bg-success text-white py-3">
//           <h6 className="mb-0">
//             <FaMoneyBillWave className="me-2" />
//             Payment Details
//           </h6>
//         </div>

//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">
//                 Payment Mode <span className="text-danger">*</span>
//               </label>

//               <select
//                 className="form-select"
//                 value={paymentMode}
//                 onChange={handlePaymentModeChange}
//               >
//                 <option value="">Select Payment Mode</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Online">Online</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Cheque">Cheque</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label fw-semibold">
//                 Fine Amount
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 placeholder="Enter fine amount"
//                 value={fineAmount}
//                 onChange={(e) => setFineAmount(e.target.value)}
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label fw-semibold">
//                 Discount Amount
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 placeholder="Enter discount amount"
//                 value={discountAmount}
//                 onChange={(e) => setDiscountAmount(e.target.value)}
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label fw-semibold">
//                 Paying Amount <span className="text-danger">*</span>
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 className="form-control"
//                 placeholder="Enter paying amount"
//                 value={paidAmount}
//                 onChange={(e) => setPaidAmount(e.target.value)}
//               />
//             </div>

//             {paymentMode !== "Cash" && paymentMode !== "" && (
//               <div className="col-md-4">
//                 <label className="form-label fw-semibold">
//                   Transaction Id <span className="text-danger">*</span>
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter transaction id"
//                   value={transactionId}
//                   onChange={(e) => setTransactionId(e.target.value)}
//                 />
//               </div>
//             )}

//             {paymentMode !== "Cash" && paymentMode !== "" && (
//               <div className="col-md-4">
//                 <label className="form-label fw-semibold">
//                   Bank Name
//                   {(paymentMode === "Online" ||
//                     paymentMode === "UPI" ||
//                     paymentMode === "Cheque") && (
//                     <span className="text-danger"> *</span>
//                   )}
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter bank name"
//                   value={bankName}
//                   onChange={(e) => setBankName(e.target.value)}
//                 />
//               </div>
//             )}

//             {paymentMode === "Cheque" && (
//               <div className="col-md-4">
//                 <label className="form-label fw-semibold">
//                   Cheque No <span className="text-danger">*</span>
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter cheque number"
//                   value={chequeNo}
//                   onChange={(e) => setChequeNo(e.target.value)}
//                 />
//               </div>
//             )}

//             <div className="col-md-12">
//               <label className="form-label fw-semibold">Remarks</label>

//               <textarea
//                 rows="3"
//                 className="form-control"
//                 placeholder="Enter remarks"
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow border-0 mb-3">
//         <div className="card-header bg-dark text-white py-3">
//           <h6 className="mb-0">Payment Summary</h6>
//         </div>

//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-3 col-6">
//               <div className="border rounded p-3 h-100">
//                 <small className="text-muted">Selected Fees</small>
//                 <h5 className="mb-0 text-primary">
//                   {selectedIds.length}
//                 </h5>
//               </div>
//             </div>

//             <div className="col-md-3 col-6">
//               <div className="border rounded p-3 h-100">
//                 <small className="text-muted">Total Due</small>
//                 <h5 className="mb-0 text-danger">
//                   ₹ {totalDue.toFixed(2)}
//                 </h5>
//               </div>
//             </div>

//             <div className="col-md-3 col-6">
//               <div className="border rounded p-3 h-100">
//                 <small className="text-muted">Fine / Discount</small>
//                 <h6 className="mb-0">
//                   <span className="text-warning">
//                     + ₹ {fine.toFixed(2)}
//                   </span>
//                   <span className="mx-1">/</span>
//                   <span className="text-success">
//                     - ₹ {discount.toFixed(2)}
//                   </span>
//                 </h6>
//               </div>
//             </div>

//             <div className="col-md-3 col-6">
//               <div className="border rounded p-3 h-100">
//                 <small className="text-muted">Net Payable</small>
//                 <h5 className="mb-0 text-primary">
//                   ₹ {netPayable.toFixed(2)}
//                 </h5>
//               </div>
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-6">
//               <div className="p-3 rounded bg-success bg-opacity-10">
//                 <small className="text-muted">Paying Amount</small>
//                 <h4 className="text-success mb-0">
//                   ₹ {paying.toFixed(2)}
//                 </h4>
//               </div>
//             </div>

//             <div className="col-md-6 mt-3 mt-md-0">
//               <div className="p-3 rounded bg-warning bg-opacity-10">
//                 <small className="text-muted">Remaining Amount</small>
//                 <h4 className="text-warning mb-0">
//                   ₹ {remaining.toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex flex-wrap justify-content-end gap-2 mb-4">
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={() => navigate(-1)}
//         >
//           <FaArrowLeft className="me-2" />
//           Back
//         </button>

//         <button
//           type="button"
//           className="btn btn-outline-danger"
//           onClick={resetForm}
//           disabled={collecting}
//         >
//           Reset
//         </button>

//         <button
//           type="button"
//           className="btn btn-success px-4"
//           disabled={selectedIds.length === 0 || collecting}
//           onClick={handleCollectFee}
//         >
//           {collecting ? (
//             <>
//               <span className="spinner-border spinner-border-sm me-2" />
//               Processing...
//             </>
//           ) : (
//             <>
//               <FaCheckCircle className="me-2" />
//               Collect Fee
//             </>
//           )}
//         </button>
//       </div>

//       {receipt && (
//         <div className="card shadow border-success mb-5">
//           <div className="card-header bg-success text-white py-3">
//             <h6 className="mb-0">
//               <FaCheckCircle className="me-2" />
//               Fee Collected Successfully
//             </h6>
//           </div>

//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-6">
//                 <table className="table table-borderless table-sm">
//                   <tbody>
//                     <tr>
//                       <th>Receipt No</th>
//                       <td>{receipt.receiptNo || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Admission No</th>
//                       <td>{student.admissionNumber}</td>
//                     </tr>

//                     <tr>
//                       <th>Student</th>
//                       <td>
//                         {student.firstName} {student.lastName}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Payment Mode</th>
//                       <td>{paymentMode || "-"}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="col-md-6">
//                 <table className="table table-borderless table-sm">
//                   <tbody>
//                     <tr>
//                       <th>Total Paid</th>
//                       <td className="text-success fw-bold">
//                         ₹ {paying.toFixed(2)}
//                       </td>
//                     </tr>

//                     <tr>
//                       <th>Transaction Id</th>
//                       <td>{transactionId || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Bank</th>
//                       <td>{bankName || "-"}</td>
//                     </tr>

//                     <tr>
//                       <th>Status</th>
//                       <td>
//                         <span className="badge bg-success">
//                           SUCCESS
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">
//               <button
//                 className="btn btn-primary"
//                 onClick={() =>
//                   navigate(
//                     `/fee/feeledger/${student.admissionNumber}`,
//                   )
//                 }
//               >
//                 <FaReceipt className="me-2" />
//                 Go To Ledger
//               </button>

//               <button
//                 className="btn btn-success"
//                 onClick={() => window.print()}
//               >
//                 Print Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeeCollection;


import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  
  FaReceipt,
  FaUserGraduate,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
  
 
} from "react-icons/fa";
import { MdCurrencyRupee, MdMoney, MdOutlineSchool, MdPayments } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const FeeCollection = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);

  const [student, setStudent] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [paymentMode, setPaymentMode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [bankName, setBankName] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [remarks, setRemarks] = useState("");

  const [fineAmount, setFineAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    loadData();
  }, [admissionNumber]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadStudent(), loadSchedules()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudent = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/students/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStudent(res.data);
    } catch (error) {
      console.log(error);
      setStudent(null);
    }
  };

  const loadSchedules = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/student-fee/schedule/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dueFees = (res.data || []).filter(
        (item) =>
          item.status === "UNPAID" ||
          item.status === "PARTIAL",
      );

      setSchedules(dueFees);
    } catch (error) {
      console.log(error);
      setSchedules([]);
    }
  };

  const selectedFees = useMemo(
    () =>
      schedules.filter((item) =>
        selectedIds.includes(item.id),
      ),
    [schedules, selectedIds],
  );

  const totalDue = useMemo(
    () =>
      selectedFees.reduce(
        (sum, item) =>
          sum + Number(item.dueAmount || 0),
        0,
      ),
    [selectedFees],
  );

  const fine = Number(fineAmount || 0);
  const discount = Number(discountAmount || 0);
  const paying = Number(paidAmount || 0);

  const netPayable = Math.max(
    totalDue + fine - discount,
    0,
  );

  const remaining = Math.max(
    netPayable - paying,
    0,
  );

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(
        schedules.map((item) => item.id),
      );
    } else {
      setSelectedIds([]);
    }
  };

  const handlePaymentModeChange = (e) => {
    const mode = e.target.value;

    setPaymentMode(mode);

    if (mode === "Cash") {
      setTransactionId("");
      setBankName("");
      setChequeNo("");
    }
  };

  const handleCollectFee = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one fee.");
      return;
    }

    if (!paymentMode) {
      alert("Please select payment mode.");
      return;
    }

    if (fine < 0 || discount < 0) {
      alert("Fine and discount cannot be negative.");
      return;
    }

    if (discount > totalDue + fine) {
      alert("Discount cannot exceed payable amount.");
      return;
    }

    if (!paidAmount || paying <= 0) {
      alert("Please enter paying amount.");
      return;
    }

    if (paying > netPayable) {
      alert("Paid amount cannot exceed payable amount.");
      return;
    }

    if (
      paymentMode !== "Cash" &&
      !transactionId.trim()
    ) {
      alert("Transaction Id is required.");
      return;
    }

    if (
      (paymentMode === "Online" ||
        paymentMode === "UPI") &&
      !bankName.trim()
    ) {
      alert("Bank Name is required.");
      return;
    }

    if (paymentMode === "Cheque") {
      if (!bankName.trim()) {
        alert("Bank Name is required.");
        return;
      }

      if (!chequeNo.trim()) {
        alert("Cheque Number is required.");
        return;
      }
    }

    try {
      setCollecting(true);

      const payload = {
        scheduleIds: selectedIds,
        paymentMode,
        paidAmount: paying,
        transactionId: transactionId.trim(),
        bankName: bankName.trim(),
        chequeNo: chequeNo.trim(),
        remarks: remarks.trim(),
        collectedBy:
          user?.name ||
          user?.username ||
          "Admin",
        fineAmount: fine,
        discountAmount: discount,
      };

      const res = await axiosInstance.post(
        "/api/student-fee/payment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setReceipt(res.data);

      alert("Fee Collected Successfully");

      navigate(
        `/fee/receipt/${res.data.receiptNo}`,
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Fee Collection Failed",
      );
    } finally {
      setCollecting(false);
    }
  };

  const resetForm = () => {
    setSelectedIds([]);
    setPaymentMode("");
    setTransactionId("");
    setBankName("");
    setChequeNo("");
    setRemarks("");
    setFineAmount("");
    setDiscountAmount("");
    setPaidAmount("");
    setReceipt(null);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div
          className="spinner-border text-primary"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        ></div>

        <h5 className="mt-3 text-secondary">
          Loading Fee Collection...
        </h5>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container-fluid mt-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body text-center p-5">
            <h4 className="text-danger mb-3">
              Student Not Found
            </h4>

            <button
              className="btn btn-secondary rounded-4"
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
      {/* ================= PAGE HEADER ================= */}

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
                  <MdMoney size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Collection
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp; Fee Collection
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
                  Fees
                </span>

                <button
                  className="btn btn-outline-secondary rounded-4"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>

              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Collection
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="px-2">

        {/* ================= STUDENT DETAILS ================= */}

        <div className="card shadow border-0 mb-4 rounded-4">

          <div className="card-header bg-white py-3">

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
                <FaUserGraduate size={23} />
              </div>

              <div className="d-flex flex-column ms-2">
                <h6 className="mb-0 lh-1">
                  Student Details
                </h6>

                <small className="lh-1 text-muted">
                  Student information
                </small>
              </div>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row align-items-center g-4">

              {/* IMAGE */}

              <div className="col-xl-2 col-md-3 text-center">

                <div
                  className="mx-auto border rounded-3 p-1"
                  style={{
                    width: "135px",
                    height: "135px",
                  }}
                >
                  <img
                    src={student.studentImage || ""}
                    alt="Student"
                    className="img-thumbnail border-0"
                    style={{
                      width: "125px",
                      height: "125px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>

              </div>

              {/* STUDENT INFO */}

              <div className="col-xl-5 col-md-9">

                <h5 className="fw-bold mb-3">
                  {student.firstName}{" "}
                  {student.lastName}
                </h5>

                <div className="row g-2">

                  <div className="col-sm-6">
                    <small className="text-muted d-block">
                      Admission No
                    </small>
                    <strong>
                      {student.admissionNumber}
                    </strong>
                  </div>

                  <div className="col-sm-6">
                    <small className="text-muted d-block">
                      Class
                    </small>
                    <strong>
                      {student.studentClass} /{" "}
                      {student.section}
                    </strong>
                  </div>

                  <div className="col-sm-6">
                    <small className="text-muted d-block">
                      Session
                    </small>
                    <strong>
                      {student.academicYear || "-"}
                    </strong>
                  </div>

                  <div className="col-sm-6">
                    <small className="text-muted d-block">
                      Mobile
                    </small>
                    <strong>
                      {student.mobile || "-"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* FEE INFORMATION */}

              <div className="col-xl-5">

                <div className="row g-3">

                  <div className="col-sm-6">

                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <small className="text-muted">
                        Fee Category
                      </small>

                      <h6 className="mb-0 mt-1">
                        {student.feeCategory || "-"}
                      </h6>
                    </div>

                  </div>

                  <div className="col-sm-6">

                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <small className="text-muted">
                        Fee Batch
                      </small>

                      <h6 className="mb-0 mt-1">
                        {student.feeBatch || "-"}
                      </h6>
                    </div>

                  </div>

                  <div className="col-12">

                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <small className="text-muted">
                        Student Status
                      </small>

                      <div className="mt-1">
                        <span className="badge bg-success rounded-pill px-3">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="row g-3 mb-4">

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-blue shadow">

              <div className="stat-icon">
                <FaReceipt />
              </div>

              <div className="stat-content">
                <span>Selected Fees</span>

                <h3>
                  {selectedIds.length}
                </h3>

                <small>
                  Fees selected for payment
                </small>
              </div>

            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-orange shadow">

              <div className="stat-icon">
                <MdCurrencyRupee />
              </div>

              <div className="stat-content">
                <span>Total Due</span>

                <h3>
                  ₹{totalDue.toFixed(2)}
                </h3>

                <small>
                  Selected fee due amount
                </small>
              </div>

            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-green shadow">

              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>

              <div className="stat-content">
                <span>Net Payable</span>

                <h3>
                  ₹{netPayable.toFixed(2)}
                </h3>

                <small>
                  After fine & discount
                </small>
              </div>

            </div>
          </div>

        </div>


        {/* ================= DUE FEE ================= */}

        <div className="card shadow border-0 mb-4 rounded-4">

          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">

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
                <FaFileInvoiceDollar size={24} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Select Due Fee
                </h6>

                <small className="lh-1 text-muted">
                  Select fee schedule for collection
                </small>

              </div>

            </div>

            {schedules.length > 0 && (
              <div className="form-check mb-0">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                  checked={
                    selectedIds.length ===
                      schedules.length &&
                    schedules.length > 0
                  }
                  onChange={handleSelectAll}
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="selectAll"
                >
                  Select All
                </label>

              </div>
            )}

          </div>

          <div className="card-body px-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="small text-center table-light">

                  <tr>
                    <th width="70">
                      Select
                    </th>
                    <th>#</th>
                    <th>Month</th>
                    <th>Fee Code</th>
                    <th>Fee Name</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody className="text-center small">

                  {schedules.length === 0 ? (

                    <tr>
                      <td
                        colSpan="9"
                        className="text-center text-success py-5"
                      >
                        <FaCheckCircle
                          size={30}
                          className="mb-2"
                        />

                        <div>
                          No Due Fee Found
                        </div>
                      </td>
                    </tr>

                  ) : (

                    schedules.map((item, index) => (

                      <tr
                        key={item.id}
                        className={
                          selectedIds.includes(item.id)
                            ? "table-primary"
                            : ""
                        }
                      >

                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedIds.includes(
                              item.id,
                            )}
                            onChange={() =>
                              handleSelect(item.id)
                            }
                          />
                        </td>

                        <td>{index + 1}</td>

                        <td>
                          <span className="badge bg-light text-dark border">
                            {item.month}
                          </span>
                        </td>

                        <td className="fw-semibold">
                          {item.feeCode}
                        </td>

                        <td>
                          {item.feeName}
                        </td>

                        <td>
                          ₹{" "}
                          {Number(
                            item.amount || 0,
                          ).toFixed(2)}
                        </td>

                        <td>
                          <span
                            className="badge fw-semibold px-2 py-1"
                            style={{
                              backgroundColor:
                                "#b9ffb8",
                              color: "#198754",
                            }}
                          >
                            ₹{" "}
                            {Number(
                              item.paidAmount || 0,
                            ).toFixed(2)}
                          </span>
                        </td>

                        <td>
                          <span
                            className="badge fw-semibold px-2 py-1"
                            style={{
                              backgroundColor:
                                "#ffe5e5",
                              color: "#dc3545",
                            }}
                          >
                            ₹{" "}
                            {Number(
                              item.dueAmount || 0,
                            ).toFixed(2)}
                          </span>
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              item.status ===
                              "PARTIAL"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    ))
                  )}

                </tbody>

                {selectedIds.length > 0 && (

                  <tfoot className="table-light">

                    <tr>

                      <th
                        colSpan="7"
                        className="text-end"
                      >
                        Selected Total
                      </th>

                      <th className="text-danger fw-bold">
                        ₹ {totalDue.toFixed(2)}
                      </th>

                      <th></th>

                    </tr>

                  </tfoot>

                )}

              </table>

            </div>

          </div>
        </div>


        {/* ================= PAYMENT DETAILS ================= */}

        <div className="card shadow border-0 mb-4 rounded-4">

          <div className="card-header bg-white py-3">

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
                <FaMoneyCheckAlt size={23} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Payment Details
                </h6>

                <small className="lh-1 text-muted">
                  Enter payment information
                </small>

              </div>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              {/* PAYMENT MODE */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Payment Mode{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={paymentMode}
                  onChange={
                    handlePaymentModeChange
                  }
                >

                  <option value="">
                    Select Payment Mode
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Online">
                    Online
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Cheque">
                    Cheque
                  </option>

                </select>

              </div>


              {/* FINE */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Fine Amount
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Enter fine amount"
                  value={fineAmount}
                  onChange={(e) =>
                    setFineAmount(
                      e.target.value,
                    )
                  }
                />

              </div>


              {/* DISCOUNT */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Discount Amount
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Enter discount amount"
                  value={discountAmount}
                  onChange={(e) =>
                    setDiscountAmount(
                      e.target.value,
                    )
                  }
                />

              </div>


              {/* PAYING */}

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Paying Amount{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Enter paying amount"
                  value={paidAmount}
                  onChange={(e) =>
                    setPaidAmount(
                      e.target.value,
                    )
                  }
                />

              </div>


              {/* TRANSACTION */}

              {paymentMode !== "Cash" &&
                paymentMode !== "" && (

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">
                      Transaction Id{" "}
                      <span className="text-danger">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter transaction id"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(
                          e.target.value,
                        )
                      }
                    />

                  </div>

                )}


              {/* BANK */}

              {paymentMode !== "Cash" &&
                paymentMode !== "" && (

                  <div className="col-md-4">

                    <label className="form-label fw-semibold">

                      Bank Name

                      {(paymentMode ===
                        "Online" ||
                        paymentMode ===
                          "UPI" ||
                        paymentMode ===
                          "Cheque") && (
                        <span className="text-danger">
                          {" "}
                          *
                        </span>
                      )}

                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter bank name"
                      value={bankName}
                      onChange={(e) =>
                        setBankName(
                          e.target.value,
                        )
                      }
                    />

                  </div>

                )}


              {/* CHEQUE */}

              {paymentMode === "Cheque" && (

                <div className="col-md-4">

                  <label className="form-label fw-semibold">
                    Cheque No{" "}
                    <span className="text-danger">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter cheque number"
                    value={chequeNo}
                    onChange={(e) =>
                      setChequeNo(
                        e.target.value,
                      )
                    }
                  />

                </div>

              )}


              {/* REMARKS */}

              <div className="col-md-12">

                <label className="form-label fw-semibold">
                  Remarks
                </label>

                <textarea
                  rows="3"
                  className="form-control"
                  placeholder="Enter remarks"
                  value={remarks}
                  onChange={(e) =>
                    setRemarks(
                      e.target.value,
                    )
                  }
                />

              </div>

            </div>

          </div>
        </div>


        {/* ================= PAYMENT SUMMARY ================= */}

        <div className="card shadow border-0 mb-4 rounded-4">

          <div className="card-header bg-white py-3">

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
                <FaMoneyBillTrendUp size={23} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Payment Summary
                </h6>

                <small className="lh-1 text-muted">
                  Current payment calculation
                </small>

              </div>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              <div className="col-xl-3 col-md-6">

                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <small className="text-muted">
                    Selected Fees
                  </small>

                  <h4 className="mb-0 mt-1 text-primary">
                    {selectedIds.length}
                  </h4>
                </div>

              </div>


              <div className="col-xl-3 col-md-6">

                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    background: "#fff7ed",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <small className="text-muted">
                    Total Due
                  </small>

                  <h4 className="mb-0 mt-1 text-danger">
                    ₹ {totalDue.toFixed(2)}
                  </h4>
                </div>

              </div>


              <div className="col-xl-3 col-md-6">

                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <small className="text-muted">
                    Fine / Discount
                  </small>

                  <h6 className="mb-0 mt-2">

                    <span className="text-warning">
                      + ₹ {fine.toFixed(2)}
                    </span>

                    <span className="mx-1">
                      /
                    </span>

                    <span className="text-success">
                      - ₹ {discount.toFixed(2)}
                    </span>

                  </h6>

                </div>

              </div>


              <div className="col-xl-3 col-md-6">

                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <small className="text-muted">
                    Net Payable
                  </small>

                  <h4 className="mb-0 mt-1 text-primary">
                    ₹ {netPayable.toFixed(2)}
                  </h4>
                </div>

              </div>

            </div>


            <div className="row g-3 mt-2">

              <div className="col-md-6">

                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                  }}
                >

                  <small className="text-muted">
                    Paying Amount
                  </small>

                  <h3 className="text-success mb-0 mt-1">
                    ₹ {paying.toFixed(2)}
                  </h3>

                </div>

              </div>


              <div className="col-md-6">

                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "#fffbeb",
                    border: "1px solid #fde68a",
                  }}
                >

                  <small className="text-muted">
                    Remaining Amount
                  </small>

                  <h3 className="text-warning mb-0 mt-1">
                    ₹ {remaining.toFixed(2)}
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ACTION BUTTONS ================= */}

        <div className="d-flex flex-wrap justify-content-end gap-2 mb-5">

          <button
            type="button"
            className="btn btn-outline-secondary rounded-4 px-4"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>

          <button
            type="button"
            className="btn btn-outline-danger rounded-4 px-4"
            onClick={resetForm}
            disabled={collecting}
          >
            Reset
          </button>

          <button
            type="button"
            className="btn btn-success rounded-4 px-4"
            disabled={
              selectedIds.length === 0 ||
              collecting
            }
            onClick={handleCollectFee}
          >

            {collecting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Processing...
              </>
            ) : (
              <>
                <FaCheckCircle className="me-2" />
                Collect Fee
              </>
            )}

          </button>

        </div>


        {/* ================= RECEIPT ================= */}

        {receipt && (

          <div className="card shadow border-0 rounded-4 mb-5">

            <div className="card-header bg-white py-3">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#16a34a,#22c55e)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(34,197,94,.22)",
                  }}
                >
                  <FaCheckCircle size={23} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Fee Collected Successfully
                  </h6>

                  <small className="lh-1 text-muted">
                    Payment receipt details
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <div className="row g-4">

                <div className="col-md-6">

                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Receipt No
                      </small>

                      <strong>
                        {receipt.receiptNo || "-"}
                      </strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Admission No
                      </small>

                      <strong>
                        {student.admissionNumber}
                      </strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Student
                      </small>

                      <strong>
                        {student.firstName}{" "}
                        {student.lastName}
                      </strong>
                    </div>

                    <div>
                      <small className="text-muted d-block">
                        Payment Mode
                      </small>

                      <strong>
                        {paymentMode || "-"}
                      </strong>
                    </div>

                  </div>

                </div>


                <div className="col-md-6">

                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "#f0fdf4",
                      border:
                        "1px solid #bbf7d0",
                    }}
                  >

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Total Paid
                      </small>

                      <strong className="text-success fs-5">
                        ₹ {paying.toFixed(2)}
                      </strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Transaction Id
                      </small>

                      <strong>
                        {transactionId || "-"}
                      </strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Bank
                      </small>

                      <strong>
                        {bankName || "-"}
                      </strong>
                    </div>

                    <div>
                      <small className="text-muted d-block">
                        Status
                      </small>

                      <span className="badge bg-success rounded-pill px-3 mt-1">
                        SUCCESS
                      </span>
                    </div>

                  </div>

                </div>

              </div>


              <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">

                <button
                  className="btn btn-outline-primary rounded-4"
                  onClick={() =>
                    navigate(
                      `/fee/feeledger/${student.admissionNumber}`,
                    )
                  }
                >
                  <FaReceipt className="me-2" />
                  Go To Ledger
                </button>

                <button
                  className="btn btn-success rounded-4"
                  onClick={() =>
                    window.print()
                  }
                >
                  Print Receipt
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default FeeCollection;

