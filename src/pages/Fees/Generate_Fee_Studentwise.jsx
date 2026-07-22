// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { TbArrowBackUp } from "react-icons/tb";
// // import { TiTick } from "react-icons/ti";
// // import { useNavigate, useParams } from "react-router-dom";

// // const Generate_Fee_Studentwise = () => {
// //   const { admissionNumber } = useParams();
// //   const [student, setStudent] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedMonths, setSelectedMonths] = useState([]);
// //   const [undoMonths, setUndoMonths] = useState([]);

// //   const [FeeCategories, setFeeCategories] = useState([]);
// //   const [FeeBatches, setFeeBatches] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [selectedBatch, setSelectedBatch] = useState("");
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     loadStudent();
// //   }, []);
// //   useEffect(() => {
// //     loadFeeCategories();
// //     loadFeeBatches();
// //   }, []);
// //   useEffect(() => {
// //     if (student) {
// //       setSelectedCategory(student.feeCategory || "");
// //       setSelectedBatch(student.feeBatch || "");
// //     }
// //   }, [student]);

// //   const loadFeeCategories = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8080/api/master/fee-category",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setFeeCategories(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const loadFeeBatches = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8080/api/master/fee-batch",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setFeeBatches(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const loadStudent = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:8080/api/students/${admissionNumber}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setStudent(res.data);
// //       setSelectedCategory(res.data.feeCategory || "");
// //       setSelectedBatch(res.data.feeBatch || "");
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   if (loading) {
// //     return <h3 className="text-center mt-5">Loading...</h3>;
// //   }

// //   if (!student) {
// //     return <h3 className="text-center mt-5">Student Not Found</h3>;
// //   }

// //   //   const students = allStudents.find(
// //   //     (stu) => stu.admissionNumber === admissionNumber,
// //   //   );
// //   console.log("student:", student);

// //   //   const [selectedCategory, setSelectedCategory] = useState(
// //   //     student.feeCategory || ""
// //   //   );
// //   //   const [selectedBatch, setSelectedBatch] = useState(student.feeBatch || "");

// //   const FeeData = JSON.parse(localStorage.getItem("FeeSetupClasswise")) || [];
// //   console.log("fee Data", FeeData);
// //   const FeeClasswise = FeeData.find(
// //     (Fee) =>
// //       Fee.session === student.academicYear && Fee.standard === student.class,
// //   );
// //   console.log("fee class wise", FeeClasswise);

// //   const months = [
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //     "January",
// //     "February",
// //     "March",
// //   ];

// //   const toggleMonthSelection = (month) => {
// //     if (selectedMonths.includes(month)) {
// //       setSelectedMonths(selectedMonths.filter((m) => m !== month));
// //     } else {
// //       setSelectedMonths([...selectedMonths, month]);
// //     }
// //   };

// //   const toggleUndoMonth = (month) => {
// //     if (undoMonths.includes(month)) {
// //       setUndoMonths(undoMonths.filter((m) => m !== month));
// //     } else {
// //       setUndoMonths([...undoMonths, month]);
// //     }
// //   };

// //   const handleGenerateFee = () => {
// //     const updatedStudents = allStudents.map((stu) => {
// //       if (stu.id === id) {
// //         const newFees = selectedMonths.flatMap((month) => {
// //           return (
// //             FeeClasswise?.fees?.map((feeObj) => {
// //               const amount = feeObj.amount || 0;
// //               return {
// //                 month,
// //                 type: feeObj.type,
// //                 amount,
// //                 paid: 0,
// //                 due: amount,
// //                 status: "Unpaid",
// //                 today: new Date().toLocaleDateString(),
// //                 time: new Date().toLocaleTimeString(),
// //                 createdAt: new Date().toISOString(),
// //                 dueDate: getDueDate(month),
// //               };
// //             }) || []
// //           );
// //         });

// //         return {
// //           ...stu,
// //           monthlyFees: [...(stu.monthlyFees || []), ...newFees],
// //         };
// //       }
// //       return stu;
// //     });

// //     localStorage.setItem("StudentFormData", JSON.stringify(updatedStudents));
// //     alert("Fee Generated Successfully!");
// //     setSelectedMonths([]);
// //   };

// //   const handleUndoFee = () => {
// //     const updatedStudents = allStudents.map((stu) => {
// //       if (stu.id === id) {
// //         const updatedMonthlyFees = (stu.monthlyFees || []).filter(
// //           (fee) => !undoMonths.includes(fee.month),
// //         );

// //         const updatedReceipts = (stu.feeReceipts || []).filter((receipt) => {
// //           const receiptMonths = receipt.month.split(",").map((m) => m.trim());
// //           return !receiptMonths.some((month) => undoMonths.includes(month));
// //         });

// //         const totalGenerated = updatedMonthlyFees.reduce(
// //           (sum, fee) => sum + (Number(fee.amount) || 0),
// //           0,
// //         );

// //         const totalPaid = updatedMonthlyFees.reduce(
// //           (sum, fee) =>
// //             sum + (fee.status === "Paid" ? Number(fee.paidAmount || 0) : 0),
// //           0,
// //         );

// //         return {
// //           ...stu,
// //           monthlyFees: updatedMonthlyFees,
// //           feeReceipts: updatedReceipts,
// //           totalGeneratedFee: totalGenerated,
// //           totalPaidAmount: totalPaid,
// //         };
// //       }
// //       return stu;
// //     });

// //     localStorage.setItem("StudentFormData", JSON.stringify(updatedStudents));
// //     alert("Selected fee entries and receipts undone.");
// //     setUndoMonths([]);
// //   };

// //   //   const generatedMonths = [...new Set((student.monthlyFees || []).map((fee) => fee.month))];

// //   const handleCollection = (admissionNumber) => {
// //     navigate(`/fee/fee_collection/${admissionNumber}`);
// //   };
// //   const handleLedger = (admissionNumber) => {
// //     navigate(`/fee/feeledger`);
// //   };

// //   const getDueDate = (month) => {
// //     const year = student.academicYear?.split("-")[0]; // e.g. "2024" from "2024-25"
// //     const monthMap = {
// //       April: "04",
// //       May: "05",
// //       June: "06",
// //       July: "07",
// //       August: "08",
// //       September: "09",
// //       October: "10",
// //       November: "11",
// //       December: "12",
// //       January: "01",
// //       February: "02",
// //       March: "03",
// //     };

// //     const actualYear = ["January", "February", "March"].includes(month)
// //       ? (parseInt(year) + 1).toString()
// //       : year;

// //     return `10-${monthMap[month]}-${actualYear}`;
// //   };

// //   console.log("FeeCategories:", FeeCategories);
// //   console.log("FeeBatches:", FeeBatches);
// //   return (
// //     <>
// //       {/* Header Section */}
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
// //           <strong>Generate Fee - Student wise</strong>
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
// //                 Generate Fee
// //               </a>
// //             </li>
// //           </ol>
// //         </nav>
// //       </div>

// //       {/* Student Info Section */}
// //       <div className="ms-2 me-2 p-3 mt-4 bg-white rounded shadow">
// //         <div className="row">
// //           <div className="col-md-2">
// //             <h6>Student Details</h6>
// //             <img
// //               //   src={student.studentImage}
// //               alt=""
// //               style={{ height: "100px", width: "100px", marginLeft: "10px" }}
// //             />
// //           </div>
// //           <div className="col-md-2 mt-3">
// //             <h6>
// //               {student.firstName} {student.lastName}
// //             </h6>
// //             <h6>{student.admissionNumber}</h6>
// //             <h6>
// //               {student.studentClass}/{student.section}
// //             </h6>
// //           </div>
// //           <div className="col-md-4">
// //             <label>
// //               <h6>Fee Category:</h6>
// //             </label>
// //             <select
// //               className="w-100 rounded p-2"
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //             >
// //               <option value="">Select Fee Category</option>

// //               {FeeCategories.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="col-md-3">
// //             <label>
// //               <h6>Fee Batch:</h6>
// //             </label>
// //             <select
// //               className="w-100 rounded p-2"
// //               value={selectedBatch}
// //               onChange={(e) => setSelectedBatch(e.target.value)}
// //             >
// //               <option value="">Select Batch</option>

// //               {FeeBatches.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>

// //         <div className="row mt-3">
// //           <div className="col-md-3">
// //             <button
// //               className="btn btn-success"
// //               onClick={() => handleLedger(student.admissionNumber)}
// //             >
// //               Go To Fee Ledger
// //             </button>
// //           </div>
// //           <div className="col-md-3">
// //             <button className="btn btn-success">
// //               Go To Partial Amount Undo
// //             </button>
// //           </div>
// //           <div className="col-md-3">
// //             <button
// //               className="btn btn-success"
// //               onClick={() => handleCollection(student.admissionNumber)}
// //             >
// //               Go To Collection
// //             </button>
// //           </div>
// //           <div className="col-md-3">
// //             <button className="btn btn-success">Update Batch & Category</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Current Schedule */}
// //       <div className="ms-2 me-2 p-3 mt-4 bg-white rounded shadow">
// //         <h5 className="text-primary">Fee Schedule</h5>
// //         <h6 className="text-danger">Current Schedule</h6>
// //         <div className="row m-2">
// //           <table className="table table-bordered  table-striped">
// //             <thead>
// //               <tr>
// //                 <th className="bg-info">#</th>
// //                 <th className="bg-info">Due Date</th>
// //                 <th className="bg-info">Month</th>
// //                 <th className="bg-info">Fee Type</th>
// //                 <th className="bg-info">Amount</th>
// //                 <th className="bg-info">Paid</th>
// //                 <th className="bg-info">Due</th>
// //                 <th className="bg-info">Status</th>
// //                 <th className="bg-info">Undo</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {(student.monthlyFees || []).map((fee, idx) => (
// //                 <tr key={idx}>
// //                   <td>{idx + 1}</td>
// //                   <td>{fee.dueDate}</td>
// //                   <td>{fee.month}</td>
// //                   <td>{fee.type}</td>
// //                   <td>{fee.amount}</td>
// //                   <td>{fee.status === "Paid" ? fee.amount : 0}</td>
// //                   <td>{fee.status === "Paid" ? 0 : fee.amount}</td>
// //                   <td>{fee.status}</td>
// //                   <td>
// //                     <input
// //                       type="checkbox"
// //                       checked={undoMonths.includes(fee.month)}
// //                       onChange={() => toggleUndoMonth(fee.month)}
// //                     />
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="text-end me-2">
// //           <button className="btn btn-danger" onClick={handleUndoFee}>
// //             <TbArrowBackUp /> Undo
// //           </button>
// //         </div>
// //       </div>

// //       {/* New Schedule */}
// //       <div className="ms-2 me-2 p-3 mt-4 bg-white rounded shadow">
// //         <h6 className="text-danger">New Schedule</h6>
// //         <div className="row m-2">
// //           <table className="table table-bordered  table-striped">
// //             <thead>
// //               <tr>
// //                 <th className="bg-info">#</th>
// //                 <th className="bg-info w-50">Fee Code</th>
// //                 <th className="bg-info">Status</th>
// //                 <th className="bg-info">Amount</th>
// //                 <th className="bg-info">Select?</th>
// //               </tr>
// //             </thead>
// //             <tbody>

// //   </tbody>
// //           </table>
// //         </div>
// //         <div className="text-end me-2">
// //           <button className="btn btn-success" onClick={handleGenerateFee}>
// //             <TiTick /> Generate Fee
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Generate_Fee_Studentwise;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { TbArrowBackUp } from "react-icons/tb";
// import { TiTick } from "react-icons/ti";
// import { useNavigate, useParams } from "react-router-dom";

// const months = [
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
//   "January",
//   "February",
//   "March",
// ];

// const Generate_Fee_Studentwise = () => {
//   const { admissionNumber } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   // ===============================
//   // Loading
//   // ===============================

//   const [loading, setLoading] = useState(true);

//   // ===============================
//   // Student
//   // ===============================

//   const [student, setStudent] = useState(null);

//   // ===============================
//   // Masters
//   // ===============================

//   const [feeCategories, setFeeCategories] = useState([]);
//   const [feeBatches, setFeeBatches] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");

//   // ===============================
//   // Assigned Fee Structure
//   // ===============================

//   const [feeStructureDetails, setFeeStructureDetails] = useState([]);

//   // ===============================
//   // Current Schedule
//   // ===============================

//   const [currentSchedule, setCurrentSchedule] = useState([]);
//   const [newSchedule, setNewSchedule] = useState([]);

//   // ===============================
//   // Selected Schedule
//   // ===============================

//   const [selectedSchedule, setSelectedSchedule] = useState([]);

//   // ===============================
//   // Undo Schedule
//   // ===============================

//   const [undoSchedule, setUndoSchedule] = useState([]);

//   // ===============================
//   // Initial Load
//   // ===============================

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       await Promise.all([loadFeeCategories(), loadFeeBatches()]);

//       await loadStudent();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   // =====================================
//   // Load Student
//   // =====================================

//   const loadStudent = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `http://localhost:8080/api/students/${admissionNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const stu = res.data;

//       setStudent(stu);

//       setSelectedCategory(stu.feeCategory || "");

//       setSelectedBatch(stu.feeBatch || "");

//       await Promise.all([
//         loadFeeStructure(
//           stu.academicYear,
//           stu.studentClass,
//           stu.feeCategory,
//           stu.feeBatch,
//         ),

//         loadCurrentSchedule(stu.admissionNumber),
//       ]);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================
//   // Fee Categories
//   // =====================================

//   const loadFeeCategories = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/master/fee-category",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setFeeCategories(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =====================================
//   // Fee Batches
//   // =====================================

//   const loadFeeBatches = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/master/fee-batch",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setFeeBatches(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =====================================
//   // Fee Structure
//   // =====================================

//   const loadFeeStructure = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/fee-structure",
//        {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data && res.data.length > 0) {
//         setFeeStructureDetails(res.data[0].feeDetails);
//       } else {
//         setFeeStructureDetails([]);
//       }
//     } catch (err) {
//       console.log(err);
//       setFeeStructureDetails([]);
//     }
//   };
//   console.log("Fee Structure Details",feeStructureDetails);

//   // =====================================
//   // Current Schedule
//   // =====================================

//   const loadCurrentSchedule = async (admissionNo) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/student-fee/${admissionNo}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setCurrentSchedule(res.data);
//     } catch (err) {
//       console.log(err);
//       setCurrentSchedule([]);
//     }
//   };

  
 
//   // =====================================
//   // Select Schedule
//   // =====================================

//   const handleScheduleSelection = (month, fee) => {
//     const exists = selectedSchedule.find(
//       (item) => item.month === month && item.feeMasterId === fee.feeMaster.id,
//     );

//     if (exists) {
//       setSelectedSchedule((prev) =>
//         prev.filter(
//           (item) =>
//             !(item.month === month && item.feeMasterId === fee.feeMaster.id),
//         ),
//       );
//     } else {
//       setSelectedSchedule((prev) => [
//         ...prev,
//         {
//           month,
//           feeMasterId: fee.feeMaster.id,
//           feeCode: fee.feeMaster.feeCode,
//           feeName: fee.feeMaster.feeName,
//           amount: fee.amount,
//         },
//       ]);
//     }
//   };

//   // =====================================
//   // Undo Selection
//   // =====================================

//   const handleUndoSelection = (id) => {
//     if (undoSchedule.includes(id)) {
//       setUndoSchedule((prev) => prev.filter((item) => item !== id));
//     } else {
//       setUndoSchedule((prev) => [...prev, id]);
//     }
//   };

//   // =====================================
//   // Generate Fee
//   // =====================================

//   const handleGenerateFee = async () => {
//     if (selectedSchedule.length === 0) {
//       alert("Please select schedule.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/api/student-fee/generate",
//         {
//           admissionNumber: student.admissionNumber,
//           schedules: selectedSchedule,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Fee Generated Successfully");

//       setSelectedSchedule([]);

//       loadCurrentSchedule(student.admissionNumber);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to generate fee");
//     }
//   };

//   // =====================================
//   // Undo Fee
//   // =====================================

//   const handleUndoFee = async () => {
//     if (undoSchedule.length === 0) {
//       alert("Please select schedule.");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/api/student-fee/undo",
//         undoSchedule,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Undo Successful");

//       setUndoSchedule([]);

//       loadCurrentSchedule(student.admissionNumber);
//     } catch (err) {
//       console.log(err);
//       alert("Undo Failed");
//     }
//   };

//   // =====================================
//   // Navigation
//   // =====================================

//   const handleLedger = () => {
//     navigate(`/fee/feeledger/${student.admissionNumber}`);
//   };

//   const handleCollection = () => {
//     navigate(`/fee/fee_collection/${student.admissionNumber}`);
//   };

//   // =====================================
//   // Loading
//   // =====================================

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border text-primary"></div>

//         <h5 className="mt-3">Loading...</h5>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="text-center mt-5">
//         <h4>Student Not Found</h4>
//       </div>
//     );
//   }
//   return (
//     <>
//       {/* ===========================
//           Header
//       ============================ */}

//       <div
//         className="row shadow"
//         style={{
//           background: "#fff",
//           margin: "10px",
//           borderRadius: "5px",
//           padding: "12px",
//         }}
//       >
//         <h5>
//           <strong>Generate Fee - Student Wise</strong>
//         </h5>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">Home</li>

//             <li className="breadcrumb-item active">Generate Fee</li>
//           </ol>
//         </nav>
//       </div>

//       {/* ===========================
//           Student Details
//       ============================ */}

//       <div className="container-fluid mt-3 bg-white shadow rounded p-3">
//         <div className="row">
//           <div className="col-md-2 text-center">
//             <img
//               src={student.studentImage}
//               alt=""
//               className="img-thumbnail"
//               style={{
//                 width: "120px",
//                 height: "120px",
//                 objectFit: "cover",
//               }}
//             />
//           </div>

//           <div className="col-md-3">
//             <h5>
//               {student.firstName} {student.lastName}
//             </h5>

//             <h6>Admission No : {student.admissionNumber}</h6>

//             <h6>
//               Class : {student.studentClass} / {student.section}
//             </h6>

//             <h6>Mobile : {student.mobile}</h6>

//             <h6>Session : {student.academicYear}</h6>
//           </div>

//           <div className="col-md-3">
//             <label className="form-label">Fee Category</label>

//             <select
//               className="form-select"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">Select Category</option>

//               {feeCategories.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3">
//             <label className="form-label">Fee Batch</label>

//             <select
//               className="form-select"
//               value={selectedBatch}
//               onChange={(e) => setSelectedBatch(e.target.value)}
//             >
//               <option value="">Select Batch</option>

//               {feeBatches.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row mt-4">
//           <div className="col-md-4">
//             <button className="btn btn-success w-100" onClick={handleLedger}>
//               Fee Ledger
//             </button>
//           </div>

//           <div className="col-md-4">
//             <button
//               className="btn btn-primary w-100"
//               onClick={handleCollection}
//             >
//               Fee Collection
//             </button>
//           </div>

//           <div className="col-md-4">
//             <button className="btn btn-warning w-100">
//               Update Batch / Category
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ===========================
//           Current Schedule
//       ============================ */}

//       <div className="container-fluid mt-4 bg-white shadow rounded p-3">
//         <h5 className="text-primary">Current Schedule</h5>

//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th width="60">Undo</th>

//               <th>Month</th>

//               <th>Fee Code</th>

//               <th>Fee Name</th>

//               <th>Amount</th>

//               <th>Paid</th>

//               <th>Due</th>

//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentSchedule.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center text-danger">
//                   No Fee Generated
//                 </td>
//               </tr>
//             ) : (
//               currentSchedule.map((fee) => (
//                 <tr key={fee.id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={undoSchedule.includes(fee.id)}
//                       onChange={() => handleUndoSelection(fee.id)}
//                     />
//                   </td>

//                   <td>{fee.month}</td>

//                   <td>{fee.feeCode}</td>

//                   <td>{fee.feeName}</td>

//                   <td>₹ {fee.amount}</td>

//                   <td>₹ {fee.paidAmount}</td>

//                   <td>₹ {fee.dueAmount}</td>

//                   <td>
//                     <span
//                       className={`badge ${
//                         fee.status === "PAID"
//                           ? "bg-success"
//                           : fee.status === "PARTIAL"
//                             ? "bg-warning text-dark"
//                             : "bg-danger"
//                       }`}
//                     >
//                       {fee.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         <div className="text-end">
//           <button
//             className="btn btn-danger"
//             disabled={undoSchedule.length === 0}
//             onClick={handleUndoFee}
//           >
//             <TbArrowBackUp className="me-2" />
//             Undo Selected
//           </button>
//         </div>
//       </div>

//       {/* ======================================
//               NEW SCHEDULE
//       ======================================= */}

//       <div className="container-fluid mt-4 bg-white shadow rounded p-3">
//         <h5 className="text-success">New Schedule</h5>

//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th width="60">Select</th>

//               <th>Month</th>

//               <th>Fee Code</th>

//               <th>Fee Name</th>

//               <th>Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {months.flatMap((month) =>
//               feeStructureDetails.map((fee) => (
//                 <tr key={`${month}-${fee.id}`}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedSchedule.some(
//                         (item) =>
//                           item.month === month &&
//                           item.feeMasterId === fee.feeMaster.id,
//                       )}
//                       onChange={() => handleScheduleSelection(month, fee)}
//                     />
//                   </td>

//                   <td>{month}</td>

//                   <td>{fee.feeMaster.feeCode}</td>

//                   <td>{fee.feeMaster.feeName}</td>

//                   <td>₹ {fee.amount}</td>
//                 </tr>
//               )),
//             )}
//           </tbody>
//         </table>

//         <div className="text-end">
//           <button
//             className="btn btn-success btn-lg"
//             disabled={selectedSchedule.length === 0}
//             onClick={handleGenerateFee}
//           >
//             <TiTick className="me-2" />
//             Generate Fee
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Generate_Fee_Studentwise;

import axios from "axios";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const Generate_Fee_Studentwise = () => {
  const { admissionNumber } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ===============================
  // Loading
  // ===============================

  const [loading, setLoading] = useState(true);

  // ===============================
  // Student
  // ===============================

  const [student, setStudent] = useState(null);

  // ===============================
  // Masters
  // ===============================

  const [feeCategories, setFeeCategories] = useState([]);
  const [feeBatches, setFeeBatches] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // ===============================
  // Assigned Fee (student_fee table)
  // ===============================

  const [assignedFees, setAssignedFees] = useState([]);

  // ===============================
  // Generated Schedule
  // (student_fee_schedule table)
  // ===============================

  const [currentSchedule, setCurrentSchedule] = useState([]);

  // ===============================
  // Checkbox
  // ===============================

  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [undoSchedule, setUndoSchedule] = useState([]);

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        loadFeeCategories(),
        loadFeeBatches(),
      ]);

      await loadStudent();

    } catch (err) {
      console.log(err);
    }
  };
  console.log("Student",student);
  // =====================================
// Load Student
// =====================================

const loadStudent = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:8080/api/students/${admissionNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const stu = res.data;

    setStudent(stu);

    setSelectedCategory(stu.feeCategory || "");
    setSelectedBatch(stu.feeBatch || "");

    await Promise.all([
      loadAssignedFees(stu.admissionNumber),
      loadCurrentSchedule(stu.admissionNumber),
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// =====================================
// Fee Categories
// =====================================

const loadFeeCategories = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/master/fee-category",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFeeCategories(res.data);
  } catch (err) {
    console.log(err);
  }
};

// =====================================
// Fee Batches
// =====================================

const loadFeeBatches = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/master/fee-batch",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFeeBatches(res.data);
  } catch (err) {
    console.log(err);
  }
};

// =====================================
// Assigned Fee (student_fee table)
// =====================================

const loadAssignedFees = async (admissionNo) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/student-fee/${admissionNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAssignedFees(res.data);
  } catch (err) {
    console.log(err);
    setAssignedFees([]);
  }
};

// =====================================
// Current Schedule
// (student_fee_schedule table)
// =====================================

const loadCurrentSchedule = async (admissionNo) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/student-fee/schedule/${admissionNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCurrentSchedule(res.data);
  } catch (err) {
    console.log(err);
    setCurrentSchedule([]);
  }
};

// =====================================
// Loading Screen
// =====================================

if (loading) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary"></div>
      <h5 className="mt-3">Loading...</h5>
    </div>
  );
}

if (!student) {
  return (
    <div className="text-center mt-5">
      <h4>Student Not Found</h4>
    </div>
  );
}
// =====================================
// Already Generated Months
// =====================================

const generatedMonths = [
  ...new Set(currentSchedule.map((item) => item.month)),
];

// =====================================
// Available Months
// =====================================

const availableMonths = months.filter(
  (month) => !generatedMonths.includes(month)
);

// =====================================
// Select Schedule
// =====================================

const handleScheduleSelection = (month, fee) => {
  const exists = selectedSchedule.find(
    (item) =>
      item.month === month &&
      item.feeMasterId === fee.feeMasterId
  );

  if (exists) {
    setSelectedSchedule((prev) =>
      prev.filter(
        (item) =>
          !(
            item.month === month &&
            item.feeMasterId === fee.feeMasterId
          )
      )
    );
  } else {
    setSelectedSchedule((prev) => [
      ...prev,
      {
        month: month,

        feeMasterId: fee.feeMasterId,

        feeCode: fee.feeCode,

        feeName: fee.feeName,

        amount: fee.amount,
      },
    ]);
  }
};

// =====================================
// Undo Selection
// =====================================

const handleUndoSelection = (id) => {
  if (undoSchedule.includes(id)) {
    setUndoSchedule((prev) =>
      prev.filter((item) => item !== id)
    );
  } else {
    setUndoSchedule((prev) => [...prev, id]);
  }
};

// =====================================
// Generate Fee
// =====================================

const handleGenerateFee = async () => {
  if (selectedSchedule.length === 0) {
    alert("Please select fee schedule.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:8080/api/student-fee/generate",
      {
        admissionNumber: student.admissionNumber,
        schedules: selectedSchedule,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Fee Generated Successfully");

    setSelectedSchedule([]);

    await loadCurrentSchedule(student.admissionNumber);
  } catch (err) {
    console.log(err);
    alert("Failed to generate fee.");
  }
};

// =====================================
// Undo Fee
// =====================================

const handleUndoFee = async () => {
  if (undoSchedule.length === 0) {
    alert("Please select schedule.");
    return;
  }

  try {
    await axios.delete(
      "http://localhost:8080/api/student-fee/undo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: undoSchedule,
      }
    );

    alert("Undo Successfully");

    setUndoSchedule([]);

    await loadCurrentSchedule(student.admissionNumber);
  } catch (err) {
    console.log(err);
    alert("Undo Failed");
  }
};

// =====================================
// Navigation
// =====================================

const handleLedger = () => {
  navigate(`/fee/feeledger/${student.admissionNumber}`);
};

const handleCollection = () => {
  navigate(`/fee/feeCollection/${student.admissionNumber}`);
};
return (
  <>
    {/* ===========================
        Header
    ============================ */}

    <div
      className="row shadow"
      style={{
        background: "#fff",
        margin: "10px",
        borderRadius: "5px",
        padding: "12px",
      }}
    >
      <h5>
        <strong>Generate Fee - Student Wise</strong>
      </h5>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item active">
            Generate Fee
          </li>
        </ol>
      </nav>
    </div>

    {/* ===========================
        Student Details
    ============================ */}

    <div className="container-fluid mt-3 bg-white shadow rounded p-3">
      <div className="row">

        <div className="col-md-2 text-center">
          <img
            src={student.studentImage || ""}
            alt=""
            className="img-thumbnail"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-3">
          <h5>
            {student.firstName} {student.lastName}
          </h5>

          <h6>Admission No : {student.admissionNumber}</h6>

          <h6>
            Class : {student.studentClass} / {student.section}
          </h6>

          <h6>Mobile : {student.mobile}</h6>

          <h6>Session : {student.academicYear}</h6>
        </div>

        <div className="col-md-3">

          <label className="form-label">
            Fee Category
          </label>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="">
              Select Category
            </option>

            {feeCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        <div className="col-md-3">

          <label className="form-label">
            Fee Batch
          </label>

          <select
            className="form-select"
            value={selectedBatch}
            onChange={(e) =>
              setSelectedBatch(e.target.value)
            }
          >
            <option value="">
              Select Batch
            </option>

            {feeBatches.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-4">
          <button
            className="btn btn-success w-100"
            onClick={handleLedger}
          >
            Fee Ledger
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={handleCollection}
          >
            Fee Collection
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-warning w-100"
          >
            Update Batch / Category
          </button>
        </div>

      </div>
    </div>

    {/* ===========================
        Current Schedule
    ============================ */}

    <div className="container-fluid mt-4 bg-white shadow rounded p-3">

      <h5 className="text-primary">
        Current Schedule
      </h5>

      <table className="table table-bordered table-striped">

        <thead>

          <tr>

            <th width="60">Undo</th>

            <th>Month</th>

            <th>Fee Code</th>

            <th>Fee Name</th>

            <th>Amount</th>

            <th>Paid</th>

            <th>Due</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {currentSchedule.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center text-danger"
              >
                No Fee Generated
              </td>

            </tr>

          ) : (

            currentSchedule.map((fee) => (

              <tr key={fee.id}>

                <td>

                  <input
                    type="checkbox"
                    checked={undoSchedule.includes(fee.id)}
                    onChange={() =>
                      handleUndoSelection(fee.id)
                    }
                  />

                </td>

                <td>{fee.month}</td>

                <td>{fee.feeCode}</td>

                <td>{fee.feeName}</td>

                <td>₹ {fee.amount}</td>

                <td>₹ {fee.paidAmount}</td>

                <td>₹ {fee.dueAmount}</td>

                <td>

                  <span
                    className={`badge ${
                      fee.status === "PAID"
                        ? "bg-success"
                        : fee.status === "PARTIAL"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {fee.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="text-end">

        <button
          className="btn btn-danger"
          disabled={undoSchedule.length === 0}
          onClick={handleUndoFee}
        >
          <TbArrowBackUp className="me-2" />
          Undo Selected
        </button>

      </div>

    </div>
        {/* ======================================
            NEW SCHEDULE
    ======================================= */}

    <div className="container-fluid mt-4 bg-white shadow rounded p-3">

      <h5 className="text-success">
        New Schedule
      </h5>

      <table className="table table-bordered table-striped">

        <thead>

          <tr>

            <th width="60">Select</th>

            <th>Month</th>

            <th>Fee Code</th>

            <th>Fee Name</th>

            <th>Amount</th>

          </tr>

        </thead>

        <tbody>

          {availableMonths.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                className="text-center text-success"
              >
                All Months Fee Already Generated
              </td>
            </tr>

          ) : (

            availableMonths.flatMap((month) =>

              assignedFees.map((fee) => (

                <tr key={`${month}-${fee.id}`}>

                  <td>

                    <input
                      type="checkbox"
                      checked={selectedSchedule.some(
                        (item) =>
                          item.month === month &&
                          item.feeMasterId === fee.feeMasterId
                      )}
                      onChange={() =>
                        handleScheduleSelection(month, fee)
                      }
                    />

                  </td>

                  <td>{month}</td>

                  <td>{fee.feeCode}</td>

                  <td>{fee.feeName}</td>

                  <td>₹ {fee.amount}</td>

                </tr>

              ))

            )

          )}

        </tbody>

      </table>

      <div className="text-end">

        <button
          className="btn btn-success btn-lg"
          disabled={selectedSchedule.length === 0}
          onClick={handleGenerateFee}
        >
          <TiTick className="me-2" />
          Generate Fee
        </button>

      </div>

    </div>

  </>
);

};

export default Generate_Fee_Studentwise;