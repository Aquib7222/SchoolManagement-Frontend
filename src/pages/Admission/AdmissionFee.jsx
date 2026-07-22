// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const Admission_Fee = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [showPaymentMode, setShowPayment] = useState(false);

//   const [formData, setFormData] = useState({
//     session: "",
//     standard: "",
//     annualCharges: "",
//     examCharges: "",
//     tuitionFee: {},
//     sportsFee: "",
//     photoCardFee: "",
//     libraryLabFee: "",
//     transportFee: "",
//     miscCharges: "",
//     registrationFee: "",
//     securityMoney: "",
//   });

//   const [student, setStudent] = useState(null);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [totalAmount, setTotalAmount] = useState();
//   const [paymentMode, setPaymentMode] = useState("");

//     const [receiptNo] = useState(Math.floor(1000 + Math.random() * 9000));

//   useEffect(() => {
//     const fixedFields = [
//       "annualCharges",
//       "examCharges",
//       "sportsFee",
//       "photoCardFee",
//       "libraryLabFee",
//       "transportFee",
//       "miscCharges",
//       "registrationFee",
//       "securityMoney",
//     ];

//     let total = 0;

//     // Add fixed charges
//     fixedFields.forEach((field) => {
//       const val = parseFloat(formData[field]) || 0;
//       total += val;
//     });

//     // Add tuition fee for selected months
//     selectedMonths.forEach((month) => {
//       const monthlyFee = parseFloat(formData.tuitionFee[month]) || 0;
//       total += monthlyFee;
//     });

//     setTotalAmount(total);
//   }, [formData, selectedMonths]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("StudentFormData")) || [];
//     const found = data.find((stu) => stu.id === id);
//     setStudent(found);
//   }, [id]);

//   const handlePaymentMode = () => {
//     setShowPayment(true);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowPayment(true);
//   };
//   const handleSessionClassChange = (e) => {
//     const { name, value } = e.target;
//     const updatedForm = { ...formData, [name]: value };
//     setFormData(updatedForm);

//     const saved =
//       JSON.parse(localStorage.getItem("AdmissionFeeSetupData")) || [];
//     const match = saved.find(
//       (item) =>
//         item.session === updatedForm.session &&
//         item.standard === updatedForm.standard
//     );

//     if (match) {
//       const months = [
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//         "January",
//         "February",
//         "March",
//       ];
//       const monthlyFee = parseFloat(match.tuitionFee || 0);
//       const tuitionObj = {};
//       months.forEach((month) => {
//         tuitionObj[month] = monthlyFee;
//       });
//       setFormData({
//         ...match,
//         tuitionFee: tuitionObj,
//       });
//       setSelectedMonths([]);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//         annualCharges: "",
//         examCharges: "",
//         tuitionFee: {},
//         sportsFee: "",
//         photoCardFee: "",
//         libraryLabFee: "",
//         transportFee: "",
//         miscCharges: "",
//         registrationFee: "",
//         securityMoney: "",
//       });
//       setSelectedMonths([]);
//     }
//   };

//   const handleMonthToggle = (month) => {
//     setSelectedMonths((prev) =>
//       prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
//     );
//   };
//   const handleFinalPayment = () => {
//   const updatedData = JSON.parse(localStorage.getItem("StudentFormData")) || [];

//   const updatedStudents = updatedData.map((stu) => {
//     if (stu.id === id) {
//       return {
//         ...stu,
//         status: "admissionConfirmed",
//         admissionFeePayment: {
//           session: formData.session,
//           standard: formData.standard,
//           selectedMonths,
//           tuitionFee: formData.tuitionFee,
//           annualCharges: formData.annualCharges,
//           examCharges: formData.examCharges,
//           sportsFee: formData.sportsFee,
//           photoCardFee: formData.photoCardFee,
//           libraryLabFee: formData.libraryLabFee,
//           transportFee: formData.transportFee,
//           miscCharges: formData.miscCharges,
//           registrationFee: formData.registrationFee,
//           securityMoney: formData.securityMoney,
//           totalAmount,
//           receiptNo,
//           paymentMode: paymentMode,
//           paymentDate: new Date().toLocaleString(),
//         },
//       };
//     }
//     return stu;
//   });

//   localStorage.setItem("StudentFormData", JSON.stringify(updatedStudents));
//   alert("Payment Successful!");

//   // Redirect to receipt preview page
//   navigate(`/admission/receipt/${id}`);
// };

//   if (!student) return <div>Loading...</div>;
//   const fullName = `${student.firstName} ${student.middleName || ""} ${
//     student.lastName || ""
//   }`;

//   return (
//     <>
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Admission Fee Payment</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Admission Fee Payment
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 mt-4 me-2 bg-white rounded p-3">
//         <h6>Fee Pay For Admission</h6>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-4">
//               <label>Student Name</label>
//               <input
//                 value={fullName}
//                 className="w-100 p-2 rounded mt-1"
//                 disabled
//               />
//             </div>
//             <div className="col-md-4">
//               <label>Class</label>
//               <input
//                 value={student.class}
//                 className="w-100 p-2 rounded mt-1"
//                 disabled
//               />
//             </div>
//             <div className="col-md-4">
//               <label>Admission Number</label>
//               <input
//                 value={student.admissionNumber}
//                 className="w-100 p-2 rounded mt-1"
//                 disabled
//               />
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Academic Session:</label>
//               <select
//                 name="session"
//                 value={formData.session}
//                 onChange={handleSessionClassChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="2025-26">2025-26</option>
//                 <option value="2024-25">2024-25</option>
//                 <option value="2023-24">2023-24</option>
//               </select>
//             </div>
//             <div className="col-md-4">
//               <label>Standard:</label>
//               <select
//                 name="standard"
//                 value={formData.standard}
//                 onChange={handleSessionClassChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               >
//                 <option value="">Select</option>
//                 {[
//                   "Nursery",
//                   "LKG",
//                   "UKG",
//                   "I",
//                   "II",
//                   "III",
//                   "IV",
//                   "V",
//                   "VI",
//                   "VII",
//                   "VIII",
//                   "IX",
//                   "X",
//                   "XI",
//                   "XII",
//                 ].map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Fee Inputs in 3-column layout */}
//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Annual Charges</label>
//               <input
//                 name="annualCharges"
//                 value={formData.annualCharges}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label>Examination Charges</label>
//               <input
//                 name="examCharges"
//                 value={formData.examCharges}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label>Games & Sports Fee</label>
//               <input
//                 name="sportsFee"
//                 value={formData.sportsFee}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Group Photo & I-Card</label>
//               <input
//                 name="photoCardFee"
//                 value={formData.photoCardFee}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Library & Lab Charges</label>
//               <input
//                 name="libraryLabFee"
//                 value={formData.libraryLabFee}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Transport Fee</label>
//               <input
//                 name="transportFee"
//                 value={formData.transportFee}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Miscellaneous Charges</label>
//               <input
//                 name="miscCharges"
//                 value={formData.miscCharges}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Registration Charges</label>
//               <input
//                 name="registrationFee"
//                 value={formData.registrationFee}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//             <div className="col-md-4 mt-3">
//               <label>Security Money (Refundable)</label>
//               <input
//                 name="securityMoney"
//                 value={formData.securityMoney}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label>Select Month(s) to Pay Tuition Fee:</label>
//             <div className="row">
//               {Object.keys(formData.tuitionFee || {}).map((month) => (
//                 <div key={month} className="col-md-3">
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id={`month-${month}`}
//                       checked={selectedMonths.includes(month)}
//                       onChange={() => handleMonthToggle(month)}
//                     />
//                     <label
//                       className="form-check-label"
//                       htmlFor={`month-${month}`}
//                     >
//                       {month} (₹{formData.tuitionFee[month]})
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="col-md-4 mt-4">
//             <button
//               className="btn btn-success mt-2"
//               onClick={handlePaymentMode}
//             >
//               Pay
//             </button>
//           </div>
//         </form>

//         {showPaymentMode && (
//           <div className="d-flex justify-content-start mt-4">
//             <div className="row mt-2 w-100">
//               <div className="col-md-6 d-flex align-items-center">
//                 <label className="me-2">
//                   <strong>Payment Mode:</strong>
//                 </label>
//                 <select
//                   className="form-select w-50"
//                   value={paymentMode}
//                   onChange={(e) => setPaymentMode(e.target.value)}
//                 >
//                   <option value="">Select Payment Mode</option>
//                   <option value="Cash">Cash</option>
//                   <option value="UPI">UPI</option>
//                   <option value="Net Banking">Net Banking</option>
//                   <option value="Cheque">Cheque</option>
//                 </select>
//               </div>
//               <div className="col-md-3 d-flex align-items-center">
//                 <h5 className="m-0">Total Amount: ₹{totalAmount || 0}</h5>
//               </div>
//               <div className="col-md-3 d-flex align-items-center">
//                 <button
//                   className="btn btn-success"
//                   onClick={handleFinalPayment}
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Admission_Fee;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

// const MONTHS = [
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

// const Admission_Fee = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   console.log("id", id);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   // visible tuition inputs
//   const [visibleMonths, setVisibleMonths] = useState(["April"]);

//   // already paid months (from backend history)
//   const [paidMonths, setPaidMonths] = useState([]);

//   const [student, setStudent] = useState(null);
//   const [showPaymentMode, setShowPaymentMode] = useState(false);

//   const [formData, setFormData] = useState({
//     session: "",
//     standard: "",
//     annualCharges: "",
//     examCharges: "",
//     tuitionFee: {},
//     sportsFee: "",
//     photoCardFee: "",
//     libraryLabFee: "",
//     transportFee: "",
//     miscCharges: "",
//     registrationFee: "",
//     securityMoney: "",
//   });

//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [paymentMode, setPaymentMode] = useState("");

//   const receiptNo = Math.floor(100000 + Math.random() * 900000);

//   const [admissionStudent, setadmissionStudent] = useState([]);

//   useEffect(() => {
//     if (!user?.schoolId || !token) return;

//     // setLoading(true);

//     axios
//       .get(
//         `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         const approved = (res.data || []).filter(
//           (item) => item.status?.id === 2
//         );
//         setadmissionStudent(approved);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [user?.schoolId, token]);

//   console.log("admission", admissionStudent);

//   const selectedAdmission = admissionStudent?.find(
//     (item) => Number(item.id) === Number(id)
//   );

//   console.log("selectedAdmission", selectedAdmission);

//   /* -------- ADD NEXT MONTH INPUT -------- */
//   const addNextMonth = () => {
//     const nextIndex = visibleMonths.length;
//     if (nextIndex >= MONTHS.length) return;

//     const nextMonth = MONTHS[nextIndex];
//     setVisibleMonths([...visibleMonths, nextMonth]);
//   };
//   /* ------------------------------------
//      CALCULATE TOTAL
//   ------------------------------------ */
//   //   useEffect(() => {
//   //     let total = 0;

//   //     const fixedFields = [
//   //       "annualCharges",
//   //       "examCharges",
//   //       "sportsFee",
//   //       "photoCardFee",
//   //       "libraryLabFee",
//   //       "transportFee",
//   //       "miscCharges",
//   //       "registrationFee",
//   //       "securityMoney",
//   //     ];

//   //     fixedFields.forEach((f) => {
//   //       total += Number(formData[f]) || 0;
//   //     });

//   //     selectedMonths.forEach((m) => {
//   //       total += Number(formData.tuitionFee[m]) || 0;
//   //     });

//   //     setTotalAmount(total);
//   //   }, [formData, selectedMonths]);

//   useEffect(() => {
//     let total = 0;

//     Object.values(formData).forEach((v) => {
//       if (typeof v === "number") total += v;
//     });

//     visibleMonths.forEach((m) => {
//       if (!paidMonths.includes(m)) {
//         total += Number(formData.tuitionFee[m]) || 0;
//       }
//     });

//     setTotalAmount(total);
//   }, [formData, visibleMonths, paidMonths]);
//   /* ------------------------------------
//      HANDLE SESSION + CLASS CHANGE
//      🔥 BACKEND BASED
//   ------------------------------------ */
//   const handleSessionClassChange = async (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value };
//     setFormData(updated);

//     if (!updated.session || !updated.standard) return;

//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/admission-fee/get",
//         {
//           params: {
//             schoolId,
//             session: updated.session,
//             standard: updated.standard,
//           },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const fee = res.data;
//       console.log("fee Data", fee);
//       const months = [
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//         "January",
//         "February",
//         "March",
//       ];

//       const tuitionObj = {};
//       months.forEach((m) => (tuitionObj[m] = fee.tuitionFee));

//       setFormData({ ...fee, tuitionFee: tuitionObj });
//       setSelectedMonths([]);
//     } catch (err) {
//       alert("Fee setup not found for selected Session & Class");
//       setFormData({
//         session: updated.session,
//         standard: updated.standard,
//         annualCharges: "",
//         examCharges: "",
//         tuitionFee: {},
//         sportsFee: "",
//         photoCardFee: "",
//         libraryLabFee: "",
//         transportFee: "",
//         miscCharges: "",
//         registrationFee: "",
//         securityMoney: "",
//       });
//       setSelectedMonths([]);
//     }
//   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((p) => ({ ...p, [name]: value }));
// //   };

// //   const toggleMonth = (m) => {
// //     setSelectedMonths((p) =>
// //       p.includes(m) ? p.filter((x) => x !== m) : [...p, m]
// //     );
// //   };

//   const handleFinalPayment = () => {
//     alert("Payment Successful!");
//     navigate(`/admission/receipt/${id}`);
//   };

//   useEffect(() => {
//     if (selectedAdmission) {
//       setStudent(selectedAdmission);
//     }
//   }, [selectedAdmission]);

//   const removeMonth = (monthToRemove) => {
//     setVisibleMonths((prev) => prev.filter((m) => m !== monthToRemove));

//     setFormData((prev) => {
//       const updatedFees = { ...prev.tuitionFee };
//       // delete updatedFees[monthToRemove];

//       return {
//         ...prev,
//         tuitionFee: updatedFees,
//       };
//     });
//   };

//   if (!student) return <div>Loading...</div>;

//   const fullName = `${student.firstName} ${student.lastName || ""}`;

//   /* ------------------------------------
//      JSX
//   ------------------------------------ */
//   return (
//     <>
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Admission Fee </strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Admission Fee Payment
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div className="ms-2 mt-4 me-2 bg-white p-3 rounded shadow">
//         <h5 className="mb-3">Admission Fee Payment</h5>

//         <div className="row mb-3 ">
//           <div className="col-md-4">
//             <label>Student Name</label>
//             <input value={fullName} className="form-control" disabled />
//           </div>
//           <div className="col-md-4">
//             <label>Class</label>
//             <input
//               value={student.studentClass}
//               className="form-control"
//               disabled
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Admission No</label>
//             <input
//               value={student.admissionNumber}
//               className="form-control"
//               disabled
//             />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label>Session</label>
//             <select
//               name="session"
//               value={formData.session}
//               onChange={handleSessionClassChange}
//               className="form-select"
//             >
//               <option value="">Select</option>
//               <option value="2025-26">2025-26</option>
//               <option value="2024-25">2024-25</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label>Class</label>
//             <select
//               name="standard"
//               value={formData.standard}
//               onChange={handleSessionClassChange}
//               className="form-select"
//             >
//               <option value="">Select</option>
//               {[
//                 "Nursery",
//                 "LKG",
//                 "UKG",
//                 "I",
//                 "II",
//                 "III",
//                 "IV",
//                 "V",
//                 "VI",
//                 "VII",
//                 "VIII",
//                 "IX",
//                 "X",
//                 "XI",
//                 "XII",
//               ].map((c) => (
//                 <option key={c}>{c}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row">
//           <div className="row mb-3">
//             <div className="col-md-4">
//               {/* <div className="d-flex">
//                  <input
//                 type="number"
//                 value={formData.tuitionFee?.April || ""}
//                 className="form-control"
//               />
//               <CiSquarePlus className="" size={20}/>
//              </div> */}
//               {visibleMonths.map((month, i) => (
//                 <div key={month} className=" mb-2">
//                   <div className="d-flex">
//                     <label htmlFor="">Tuition Fee {month}</label>
//                     {i === visibleMonths.length - 1 && (
//                       <CiSquarePlus
//                         className="ms-2"
//                         size={22}
//                         onClick={addNextMonth}
//                       />
//                     )}
//                     {/* ➖ Remove Month */}
//                     {visibleMonths.length > 1 &&
//                       !paidMonths.includes(month) && (
//                         <CiSquareMinus
//                           className="ms-2 text-danger cursor-pointer"
//                           size={22}
//                           onClick={() => removeMonth(month)}
//                         />
//                       )}
//                   </div>
//                   <input
//                     className="form-control"
//                     value={formData.tuitionFee[month] || ""}
//                     disabled={paidMonths.includes(month)}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Annual Charge</label>
//               <input
//                 type="number"
//                 value={formData.annualCharges || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Exam Charges</label>
//               <input
//                 type="number"
//                 value={formData.examCharges || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//           </div>
//           {/* second row  */}

//           <div className="row mb-3">
//             <div className="col-md-4">
//               <label htmlFor="">Sports Fee</label>
//               <input
//                 type="number"
//                 value={formData.sportsFee || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Library Charge</label>
//               <input
//                 type="number"
//                 value={formData.libraryLabFee || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Photo/Id Charges</label>
//               <input
//                 type="number"
//                 value={formData.photoCardFee || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//           </div>

//           {/* third row  */}
//           <div className="row mb-3">
//             <div className="col-md-4">
//               <label htmlFor="">Transport Fee</label>
//               <input
//                 type="number"
//                 value={formData.transportFee || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Registration Fee</label>
//               <input
//                 type="number"
//                 value={formData.registrationFee || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//             <div className="col-md-4">
//               <label htmlFor="">Securtiy Money</label>
//               <input
//                 type="number"
//                 value={formData.securityMoney || ""}
//                 className="form-control"
//               />
//               <input type="number" className="form-control" />
//             </div>
//           </div>
//           {/* {Object.keys(formData.tuitionFee).map((m) => (
//             <div key={m} className="col-md-3">
//               <input
//                 type="checkbox"
//                 checked={selectedMonths.includes(m)}
//                 onChange={() => toggleMonth(m)}
//               />{" "}
//               {m} (₹{formData.tuitionFee[m]})
//             </div>
//           ))} */}
//         </div>

//         <div className="mt-4 d-flex justify-content-between">
//           <h5>Total: ₹{totalAmount}</h5>
//           <button
//             className="btn btn-success"
//             onClick={() => setShowPaymentMode(true)}
//           >
//             Pay
//           </button>
//         </div>

//         {showPaymentMode && (
//           <div className="mt-3">
//             <select
//               className="form-select w-25"
//               onChange={(e) => setPaymentMode(e.target.value)}
//             >
//               <option value="">Payment Mode</option>
//               <option>Cash</option>
//               <option>UPI</option>
//               <option>Net Banking</option>
//             </select>

//             <button
//               className="btn btn-primary mt-3"
//               onClick={handleFinalPayment}
//               disabled={!paymentMode}
//             >
//               Pay Now
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Admission_Fee;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

// const MONTHS = [
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

// const Admission_Fee = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   const [visibleMonths, setVisibleMonths] = useState(["April"]);
//   const [paidMonths, setPaidMonths] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [showPaymentMode, setShowPaymentMode] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [admissionStudent, setAdmissionStudent] = useState([]);
//   const [feeAlreadyPaid, setFeeAlreadyPaid] = useState(false); // ✅ top level

//   const [formData, setFormData] = useState({
//     session: "",
//     standard: "",
//     tuitionFee: {},

//     annualCharges: { amount: 0, discount: 0 },
//     examCharges: { amount: 0, discount: 0 },
//     sportsFee: { amount: 0, discount: 0 },
//     photoCardFee: { amount: 0, discount: 0 },
//     libraryLabFee: { amount: 0, discount: 0 },
//     transportFee: { amount: 0, discount: 0 },
//     miscCharges: { amount: 0, discount: 0 },
//     registrationFee: { amount: 0, discount: 0 },
//     securityMoney: { amount: 0, discount: 0 },
//   });

//   /* ---------------- LOAD ADMISSION STUDENTS ---------------- */
//   useEffect(() => {
//     if (!schoolId || !token) return;

//     axios
//       .get(`http://localhost:8080/api/admissions/school?schoolId=${schoolId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const approved = res.data.filter((i) => i.status?.id === 2);
//         setAdmissionStudent(approved);
//       })
//       .catch(console.error);
//   }, [schoolId, token]);

//   const selectedAdmission = admissionStudent.find(
//     (i) => Number(i.id) === Number(id),
//   );
//   console.log("selectedAdmission", selectedAdmission);

//   useEffect(() => {
//     if (selectedAdmission) setStudent(selectedAdmission);
//   }, [selectedAdmission]);

//   /* ---------------- SESSION + CLASS CHANGE (BACKEND) ---------------- */
//   const handleSessionClassChange = async (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value };
//     setFormData(updated);

//     if (!updated.session || !updated.standard) return;

//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/admission-fee/get",
//         {
//           params: {
//             schoolId,
//             session: updated.session,
//             standard: updated.standard,
//           },
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       const fee = res.data;

//       const tuitionObj = {};
//       MONTHS.forEach((m) => (tuitionObj[m] = fee.tuitionFee));

//       setFormData((prev) => ({
//         ...prev,
//         session: updated.session,
//         standard: updated.standard,
//         tuitionFee: tuitionObj,

//         annualCharges: { amount: fee.annualCharges || 0, discount: 0 },
//         examCharges: { amount: fee.examCharges || 0, discount: 0 },
//         sportsFee: { amount: fee.sportsFee || 0, discount: 0 },
//         photoCardFee: { amount: fee.photoCardFee || 0, discount: 0 },
//         libraryLabFee: { amount: fee.libraryLabFee || 0, discount: 0 },
//         transportFee: { amount: fee.transportFee || 0, discount: 0 },
//         miscCharges: { amount: fee.miscCharges || 0, discount: 0 },
//         registrationFee: { amount: fee.registrationFee || 0, discount: 0 },
//         securityMoney: { amount: fee.securityMoney || 0, discount: 0 },
//       }));
//     } catch (err) {
//       alert("Fee setup not found for selected Session & Class");
//     }
//   };

//   /* ---------------- MONTH LOGIC ---------------- */
//   const addNextMonth = () => {
//     const next = MONTHS[visibleMonths.length];
//     if (next) setVisibleMonths([...visibleMonths, next]);
//   };

//   const removeMonth = (month) => {
//     setVisibleMonths((prev) => prev.filter((m) => m !== month));
//   };

//   /* ---------------- AMOUNT / DISCOUNT CHANGE ---------------- */
//   const handleFeeChange = (fee, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fee]: { ...prev[fee], [field]: Number(value) || 0 },
//     }));
//   };

//   /* ---------------- TOTAL CALCULATION ---------------- */
//   useEffect(() => {
//     let total = 0;

//     [
//       "annualCharges",
//       "examCharges",
//       "sportsFee",
//       "photoCardFee",
//       "libraryLabFee",
//       "transportFee",
//       "miscCharges",
//       "registrationFee",
//       "securityMoney",
//     ].forEach((f) => {
//       const { amount, discount } = formData[f];
//       total += Math.max(amount - discount, 0);
//     });

//     visibleMonths.forEach((m) => {
//       if (!paidMonths.includes(m)) {
//         total += Number(formData.tuitionFee[m]) || 0;
//       }
//     });

//     setTotalAmount(total);
//   }, [formData, visibleMonths, paidMonths]);

//   if (!student) return <div>Loading...</div>;

//   const fullName = `${student.firstName} ${student.lastName || ""}`;
//  const handlePayFee = async () => {
//   if (!paymentMode) {
//     alert("Please select a payment mode");
//     return;
//   }

//   try {
//     const payload = {
//       admission: student.admissionNumber, // match DTO field name
//       schoolId: Number(schoolId),
//       session: formData.session,
//       standard: formData.standard,
//       tuitionFee: formData.tuitionFee, // object: { April: 1000, May: 1000, ... }
//       paidMonths: visibleMonths,       // array of selected months
//       fixedFees: {
//         annualCharges: {
//           amount: Number(formData.annualCharges.amount),
//           discount: Number(formData.annualCharges.discount),
//         },
//         examCharges: {
//           amount: Number(formData.examCharges.amount),
//           discount: Number(formData.examCharges.discount),
//         },
//         sportsFee: {
//           amount: Number(formData.sportsFee.amount),
//           discount: Number(formData.sportsFee.discount),
//         },
//         photoCardFee: {
//           amount: Number(formData.photoCardFee.amount),
//           discount: Number(formData.photoCardFee.discount),
//         },
//         libraryLabFee: {
//           amount: Number(formData.libraryLabFee.amount),
//           discount: Number(formData.libraryLabFee.discount),
//         },
//         transportFee: {
//           amount: Number(formData.transportFee.amount),
//           discount: Number(formData.transportFee.discount),
//         },
//         miscCharges: {
//           amount: Number(formData.miscCharges.amount),
//           discount: Number(formData.miscCharges.discount),
//         },
//         registrationFee: {
//           amount: Number(formData.registrationFee.amount),
//           discount: Number(formData.registrationFee.discount),
//         },
//         securityMoney: {
//           amount: Number(formData.securityMoney.amount),
//           discount: Number(formData.securityMoney.discount),
//         },
//       },
//       totalAmount: totalAmount,
//       paymentMode: paymentMode,
//     };

//     console.log("PAYLOAD 👉", payload);

//     const res = await axios.post(
//       "http://localhost:8080/api/admission-fee/pay",
//       payload,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     console.log("school name",res.data);
//     const receiptData = {
//       receiptNo: res.data.id, // use saved payment id
//       schoolName: selectedAdmission.school?.schoolName,
//       studentName: fullName,
//       admissionNumber: student.admissionNumber,
//       standard: formData.standard,
//       session: formData.session,
//       paymentDate: new Date(),
//       paymentMode,
//       fees: {
//         annualCharges: formData.annualCharges,
//         examCharges: formData.examCharges,
//         sportsFee: formData.sportsFee,
//         photoCardFee: formData.photoCardFee,
//         libraryLabFee: formData.libraryLabFee,
//         transportFee: formData.transportFee,
//         miscCharges: formData.miscCharges,
//         registrationFee: formData.registrationFee,
//         securityMoney: formData.securityMoney,
//       },
//       tuitionMonths: visibleMonths,
//       tuitionFee: formData.tuitionFee,
//       totalAmount,
//     };

//     alert("Fee paid successfully ✅");
//     // Redirect to receipt page with data
//     // navigate("/admission/fee/receipt", { state: { payment: {
//     //   ...payload,
//     //   studentName: `${student.firstName} ${student.lastName || ""}`,
//     //   paymentDate: new Date().toISOString()
//     // }}});
//     navigate("/admission/fee/receipt", { state: { receiptData } });
//   } catch (error) {
//     console.error("Payment error:", error.response?.data || error);
//     alert("Fee payment failed ❌");
//   }
// };

// useEffect(() => {
//   if (!student || !schoolId || !token) return;

//   axios
//     .get(`http://localhost:8080/api/admission-fee/check`, {
//       params: {
//         admissionNumber: student.admissionNumber,
//         session: formData.session,
//         standard: formData.standard,
//         schoolId: Number(schoolId)
//       },
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       setFeeAlreadyPaid(res.data.alreadyPaid); // boolean
//     })
//     .catch(console.error);
// }, [student, formData.session, formData.standard, schoolId, token]);

//   /* ---------------- JSX ---------------- */
//   return (
//     <>
//       <div
//         className="row shadow"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Admission Fee </strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Admission Fee Payment
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 mt-4 me-2 bg-white p-3 rounded shadow">
//         <h5 className="mb-3 mt-1 bg-primary text-white p-2 rounded">
//           Admission Fee Payment
//         </h5>

//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label>Student Name</label>
//             <input value={fullName} className="form-control" disabled />
//           </div>
//           <div className="col-md-4">
//             <label>Class</label>
//             <input
//               value={student.studentClass}
//               className="form-control"
//               disabled
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Admission No</label>
//             <input
//               value={student.admissionNumber}
//               className="form-control"
//               disabled
//             />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label>Session</label>
//             <select
//               name="session"
//               value={formData.session}
//               onChange={handleSessionClassChange}
//               className="form-select"
//             >
//               <option value="">Select</option>
//               <option value="2025-26">2025-26</option>
//               <option value="2024-25">2024-25</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label>Class</label>
//             <select
//               name="standard"
//               value={formData.standard}
//               onChange={handleSessionClassChange}
//               className="form-select"
//             >
//               <option value="">Select</option>
//               {[
//                 "Nursery",
//                 "LKG",
//                 "UKG",
//                 "I",
//                 "II",
//                 "III",
//                 "IV",
//                 "V",
//                 "VI",
//                 "VII",
//                 "VIII",
//                 "IX",
//                 "X",
//                 "XI",
//                 "XII",
//               ].map((c) => (
//                 <option key={c}>{c}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-4">
//             {visibleMonths.map((month, i) => (
//               <div key={month} className="mb-2">
//                 <div className="d-flex">
//                   <label>Tuition Fee {month}</label>
//                   {i === visibleMonths.length - 1 && (
//                     <CiSquarePlus
//                       size={22}
//                       className="ms-2"
//                       onClick={addNextMonth}
//                     />
//                   )}
//                   {visibleMonths.length > 1 && (
//                     <CiSquareMinus
//                       size={22}
//                       className="ms-2 text-danger"
//                       onClick={() => removeMonth(month)}
//                     />
//                   )}
//                 </div>
//                 <input
//                   className="form-control"
//                   value={formData.tuitionFee[month] || ""}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       tuitionFee: { ...p.tuitionFee, [month]: e.target.value },
//                     }))
//                   }
//                 />
//               </div>
//             ))}
//           </div>

//           {[
//             ["annualCharges", "Annual Charge"],
//             ["examCharges", "Exam Charges"],
//             ["sportsFee", "Sports Fee"],
//             ["libraryLabFee", "Library Charge"],
//             ["photoCardFee", "Photo/Id Charges"],
//             ["transportFee", "Transport Fee"],
//             ["registrationFee", "Registration Fee"],
//             ["securityMoney", "Security Money"],
//           ].map(([key, label]) => (
//             <div className="col-md-4" key={key}>
//               <label>{label}</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={formData[key].amount}
//                 onChange={(e) => handleFeeChange(key, "amount", e.target.value)}
//               />
//               <input
//                 type="number"
//                 className="form-control"
//                 value={formData[key].discount}
//                 onChange={(e) =>
//                   handleFeeChange(key, "discount", e.target.value)
//                 }
//                 placeholder="Discount"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="d-flex justify-content-between mt-4">
//           <h5>Total: ₹{totalAmount}</h5>
//           <button
//             className="btn btn-success"
//             onClick={() => setShowPaymentMode(true)}
//           >
//             Pay
//           </button>
//         </div>

//         {showPaymentMode && (
//           <div className="mt-3">
//             <select
//               className="form-select w-25"
//               onChange={(e) => setPaymentMode(e.target.value)}
//             >
//               <option value="">Payment Mode</option>
//               <option>Cash</option>
//               <option>UPI</option>
//               <option>Net Banking</option>
//             </select>

//             {/* <button
//               className="btn btn-primary mt-3"
//               disabled={!paymentMode}
//               onClick={handlePayFee}
//             >
//               Pay Now
//             </button> */}
//             <button
//   className="btn btn-success"
//   onClick={() => setShowPaymentMode(true)}
//   disabled={feeAlreadyPaid}
// >
//   {feeAlreadyPaid ? "Fee Already Paid" : "Pay"}
// </button>

//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Admission_Fee;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

const MONTHS = [
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

const Admission_Fee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [visibleMonths, setVisibleMonths] = useState(["April"]);
  const [student, setStudent] = useState(null);
  const [admissionStudent, setAdmissionStudent] = useState([]);

  useEffect(() => {
  if (!student) return;

  setFormData((prev) => ({
    ...prev,
    session: student.academicYear || prev.session,
    standard: student.studentClass || prev.standard,
  }));
}, [student]);
console.log("student",student);

  const [formData, setFormData] = useState({
    session: "",
    standard: "",
    tuitionFee: {},
    annualCharges: { amount: 0, discount: 0 },
    examCharges: { amount: 0, discount: 0 },
    sportsFee: { amount: 0, discount: 0 },
    photoCardFee: { amount: 0, discount: 0 },
    libraryLabFee: { amount: 0, discount: 0 },
    transportFee: { amount: 0, discount: 0 },
    miscCharges: { amount: 0, discount: 0 },
    registrationFee: { amount: 0, discount: 0 },
    securityMoney: { amount: 0, discount: 0 },
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPaymentMode, setShowPaymentMode] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [feeAlreadyPaid, setFeeAlreadyPaid] = useState(false); // top-level hook

  /* ---------------- LOAD ADMISSION STUDENTS ---------------- */
  useEffect(() => {
    if (!schoolId || !token) return;

    axios
      .get(`http://localhost:8080/api/admissions/school?schoolId=${schoolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const approved = res.data.filter((i) => i.status === "APPROVED");
        setAdmissionStudent(approved);
      })
      .catch(console.error);
  }, [schoolId, token]);

  // Set selected student
  useEffect(() => {
    const selected = admissionStudent.find((i) => Number(i.id) === Number(id));
    if (selected) setStudent(selected);
  }, [admissionStudent, id]);

  const hasTransport = student?.transportRequired === "yes";

  console.log("selected ",student);
  /* ---------------- SESSION + CLASS CHANGE (BACKEND) ---------------- */
  const handleSessionClassChange = async (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (!updated.session || !updated.standard) return;

    try {
      const res = await axios.get(
        "http://localhost:8080/api/admission-fee/get",
        {
          params: {
            schoolId,
            session: updated.session,
            standard: updated.standard,
          },
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const fee = res.data;
      const tuitionObj = {};
      MONTHS.forEach((m) => (tuitionObj[m] = fee.tuitionFee || 0));

      setFormData((prev) => ({
        ...prev,
        session: updated.session,
        standard: updated.standard,
        tuitionFee: tuitionObj,
        annualCharges: { amount: fee.annualCharges || 0, discount: 0 },
        examCharges: { amount: fee.examCharges || 0, discount: 0 },
        sportsFee: { amount: fee.sportsFee || 0, discount: 0 },
        photoCardFee: { amount: fee.photoCardFee || 0, discount: 0 },
        libraryLabFee: { amount: fee.libraryLabFee || 0, discount: 0 },
        transportFee: { amount: hasTransport ? fee.transportFee || 0 : 0, discount: 0 },
        miscCharges: { amount: fee.miscCharges || 0, discount: 0 },
        registrationFee: { amount: fee.registrationFee || 0, discount: 0 },
        securityMoney: { amount: fee.securityMoney || 0, discount: 0 },
      }));
    } catch {
      alert("Fee setup not found for selected Session & Class");
    }
  };

  /* ---------------- MONTH LOGIC ---------------- */
  const addNextMonth = () => {
    const next = MONTHS[visibleMonths.length];
    if (next) setVisibleMonths([...visibleMonths, next]);
  };
  const removeMonth = (month) =>
    setVisibleMonths((prev) => prev.filter((m) => m !== month));

  /* ---------------- AMOUNT / DISCOUNT CHANGE ---------------- */
  const handleFeeChange = (fee, field, value) =>
    setFormData((prev) => ({
      ...prev,
      [fee]: { ...prev[fee], [field]: Number(value) || 0 },
    }));

  /* ---------------- TOTAL CALCULATION ---------------- */
  useEffect(() => {
    let total = 0;
    const FixedFees=[
      "annualCharges",
      "examCharges",
      "sportsFee",
      "photoCardFee",
      "libraryLabFee",
      "transportFee",
      "miscCharges",
      "registrationFee",
      "securityMoney",
    ]
    if (hasTransport) FixedFees.push("transportFee");
    
    FixedFees.forEach((f) => {
      const { amount, discount } = formData[f];
      total += Math.max(amount - discount, 0);
    });
    visibleMonths.forEach((m) => {
      total += Number(formData.tuitionFee[m]) || 0;
    });
    setTotalAmount(total);
  }, [formData, visibleMonths]);
  /* ---------------- RESET TRANSPORT IF NOT REQUIRED ---------------- */
useEffect(() => {
if (!hasTransport) {
setFormData((prev) => ({
...prev,
transportFee: { amount: 0, discount: 0 },
}));
}
}, [hasTransport]);

  /* ---------------- CHECK IF FEE ALREADY PAID ---------------- */
  useEffect(() => {
    if (!student || !formData.session || !formData.standard) return;

    axios
      .get("http://localhost:8080/api/admission-fee/check", {
        params: {
          admissionNumber: student.admissionNumber,
          session: formData.session,
          standard: formData.standard,
          schoolId,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeeAlreadyPaid(res.data.alreadyPaid))
      .catch(console.error);
  }, [student, formData.session, formData.standard, schoolId, token]);

  /* ---------------- PAY FEE ---------------- */
  const handlePayFee = async () => {
    if (!paymentMode) return alert("Please select a payment mode");

    const payload = {
      admission: student.admissionNumber,
      schoolId: Number(schoolId),
      session: formData.session,
      standard: formData.standard,
      tuitionFee: formData.tuitionFee,
      paidMonths: visibleMonths,
      fixedFees: {
        annualCharges: formData.annualCharges,
        examCharges: formData.examCharges,
        sportsFee: formData.sportsFee,
        photoCardFee: formData.photoCardFee,
        libraryLabFee: formData.libraryLabFee,
        ...(hasTransport && { transportFee: formData.transportFee }),
        miscCharges: formData.miscCharges,
        registrationFee: formData.registrationFee,
        securityMoney: formData.securityMoney,
      },
      totalAmount,
      paymentMode,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admission-fee/pay",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const receiptData = {
        receiptNo: res.data.id,
        schoolName: student.school?.schoolName,
        studentName: `${student.firstName} ${student.lastName || ""}`,
        admissionNumber: student.admissionNumber,
        standard: formData.standard,
        session: formData.session,
        paymentDate: new Date(),
        paymentMode,
        fees: payload.fixedFees,
        tuitionMonths: visibleMonths,
        tuitionFee: formData.tuitionFee,
        totalAmount,
      };

      alert("Fee paid successfully ✅");
      navigate("/admission/fee/receipt", { state: { receiptData } });
    } catch (error) {
      console.error("Payment error:", error.response?.data || error);
      alert("Fee payment failed ❌");
    }
  };

  if (!student) return <div>Loading...</div>;
  const fullName = `${student.firstName} ${student.lastName || ""}`;

  /* ---------------- JSX ---------------- */
  return (
    <>
      <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Admission Fee </strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Admission Fee Payment
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="ms-2 mt-4 me-2 bg-white p-3 rounded shadow">
        <h5 className="mb-3 mt-1 bg-primary text-white p-2 rounded">
          Admission Fee Payment
        </h5>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Student Name</label>
            <input value={fullName} className="form-control" disabled />
          </div>
          <div className="col-md-4">
            <label>Class</label>
            <input
              value={student.studentClass}
              className="form-control"
              disabled
            />
          </div>
          <div className="col-md-4">
            <label>Admission No</label>
            <input
              value={student.admissionNumber}
              className="form-control"
              disabled
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Session</label>
            <select
              name="session"
              value={formData.session}
              onChange={handleSessionClassChange}
              className="form-select"
              // disabled
            >
              <option value="">Select</option>
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Class</label>
            <select
              name="standard"
              value={formData.standard}
              onChange={handleSessionClassChange}
              className="form-select"
              // disabled
            >
              <option value="">Select</option>
              {[
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
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            {visibleMonths.map((month, i) => (
              <div key={month} className="mb-2">
                <div className="d-flex align-items-center">
                  <label>Tuition Fee {month}</label>
                  {i === visibleMonths.length - 1 && (
                    <CiSquarePlus
                      size={22}
                      className="ms-2"
                      onClick={addNextMonth}
                    />
                  )}
                  {visibleMonths.length > 1 && (
                    <CiSquareMinus
                      size={22}
                      className="ms-2 text-danger"
                      onClick={() => removeMonth(month)}
                    />
                  )}
                </div>
                <input
                  className="form-control"
                  value={formData.tuitionFee[month] || ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      tuitionFee: { ...p.tuitionFee, [month]: e.target.value },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          {[
            "annualCharges",
            "examCharges",
            "sportsFee",
            "libraryLabFee",
            "photoCardFee",
            "transportFee",
            "registrationFee",
            "securityMoney",
          ].map((key) => (
            <div className="col-md-4" key={key}>
              <label>{key}</label>
              <input
                type="number"
                className="form-control"
                value={formData[key].amount}
                onChange={(e) => handleFeeChange(key, "amount", e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={formData[key].discount}
                onChange={(e) =>
                  handleFeeChange(key, "discount", e.target.value)
                }
                placeholder="Discount"
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <h5>Total: ₹{totalAmount}</h5>
          <button
            className="btn btn-success"
            onClick={() => setShowPaymentMode(true)}
            disabled={feeAlreadyPaid}
          >
            {feeAlreadyPaid ? "Fee Already Paid" : "Pay"}
          </button>
        </div>

        {showPaymentMode && !feeAlreadyPaid && (
          <div className="mt-3">
            <select
              className="form-select w-25"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="">Payment Mode</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Net Banking</option>
            </select>
            <button
              className="btn btn-primary mt-3"
              disabled={!paymentMode}
              onClick={handlePayFee}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Admission_Fee;
