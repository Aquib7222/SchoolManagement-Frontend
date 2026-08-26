// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SchoolAddForm = () => {
//   // const [form, setForm] = useState({
//   //   schoolName: "",
//   //   schoolCode: "",
//   //   address: "",
//   //   email: "",
//   //   academicYear: "",
//   //   phone: "",
//   //   year: "",
//   //   principal: "",
//   //   status: "Active",
//   // });

//   const [form, setForm] = useState({
//   // School Details
//   schoolName: "",
//   schoolCode: "",
//   schoolType: "",
//   registrationNumber: "",
//   affiliationBoard: "",
//   establishedYear: "",
//   academicYear: "",
//   gstNumber: "",
//   schoolLogo: null,

//   // Contact Details
//   principalName: "",
//   contactPerson: "",
//   mobileNo: "",
//   alternateNo: "",
//   email: "",
//   website: "",
//   address: "",
//   city: "",
//   state: "",
//   country: "India",
//   pincode: "",

//   // Subscription Details
//   subscriptionPlan: "",
//   subscriptionType: "",
//   startDate: "",
//   endDate: "",
//   trialStartDate: "",
//   trialEndDate: "",
//   renewalDate: "",
//   subscriptionStatus: "Active",
//   paymentStatus: "Pending",
//   invoiceNumber: "",
//   amount: 0,

//   // Resource Limits
//   maxStudents: 0,
//   maxTeachers: 0,
//   maxAdmins: 0,
//   storageLimit: 0,
//   smsCredits: 0,
//   whatsappCredits: 0,
// });

// const PLAN_PRICES = {
//   Basic: 2000,
//   Standard: 3500,
//   Premium: 5000,
// };

// const PLAN_LIMITS = {
//   Basic: {
//     maxStudents: 500,
//     maxTeachers: 20,
//     maxAdmins: 2,
//     storageLimit: 10,
//     smsCredits: 1000,
//     whatsappCredits: 500,
//   },

//   Standard: {
//     maxStudents: 1500,
//     maxTeachers: 75,
//     maxAdmins: 5,
//     storageLimit: 50,
//     smsCredits: 5000,
//     whatsappCredits: 2500,
//   },

//   Premium: {
//     maxStudents: 5000,
//     maxTeachers: 200,
//     maxAdmins: 10,
//     storageLimit: 200,
//     smsCredits: 20000,
//     whatsappCredits: 10000,
//   },
// };
// const calculateAmount = (plan, type) => {
//   const monthlyPrice = PLAN_PRICES[plan] || 0;

//   switch (type) {
//     case "Monthly":
//       return monthlyPrice;

//     case "Quarterly":
//       return monthlyPrice * 3;

//     case "Annually":
//       return monthlyPrice * 12;

//     default:
//       return 0;
//   }
// };
// const calculateEndDate = (startDate, type) => {
//   if (!startDate) return "";

//   const date = new Date(startDate);

//   switch (type) {
//     case "Monthly":
//       date.setMonth(date.getMonth() + 1);
//       break;

//     case "Quarterly":
//       date.setMonth(date.getMonth() + 3);
//       break;

//     case "Annually":
//       date.setFullYear(date.getFullYear() + 1);
//       break;

//     default:
//       break;
//   }

//   return date.toISOString().split("T")[0];
// };

// const handleChange = (e) => {
//   const { name, value, files } = e.target;

//   let updatedForm = {
//     ...form,
//     [name]: files ? files[0] : value,
//   };

//   const selectedPlan =
//     name === "subscriptionPlan"
//       ? value
//       : updatedForm.subscriptionPlan;

//   const selectedType =
//     name === "subscriptionType"
//       ? value
//       : updatedForm.subscriptionType;

//   if (
//     name === "subscriptionPlan" ||
//     name === "subscriptionType"
//   ) {
//     updatedForm.amount = calculateAmount(
//       selectedPlan,
//       selectedType
//     );

//     if (PLAN_LIMITS[selectedPlan]) {
//       updatedForm = {
//         ...updatedForm,
//         ...PLAN_LIMITS[selectedPlan],
//       };
//     }
//   }

//   if (
//     name === "startDate" ||
//     name === "subscriptionType"
//   ) {
//     const startDate =
//       name === "startDate"
//         ? value
//         : updatedForm.startDate;

//     updatedForm.endDate = calculateEndDate(
//       startDate,
//       selectedType
//     );

//     updatedForm.renewalDate =
//       updatedForm.endDate;
//   }

//   setForm(updatedForm);
// };
// const saveSchool = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const formData = new FormData();

//     Object.keys(form).forEach((key) => {
//       if (form[key] !== null) {
//         formData.append(key, form[key]);
//       }
//     });

//     await axios.post(
//       "http://localhost:8080/api/school/add",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     alert("School Created Successfully");
//     navigate(-1);
//   } catch (error) {
//     console.error(error);
//     alert("Failed to create school");
//   }
// };
//   const navigate = useNavigate();

//   // const handleChange = (e) => {
//   //   setForm({ ...form, [e.target.name]: e.target.value });
//   // };

//   // const saveSchool = async () => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) {
//   //       alert("You are not logged in!");
//   //       return;
//   //     }

//   //     // Create FormData if you are uploading a logo, or send JSON for only text
//   //     const response = await axios.post(
//   //       "http://localhost:8080/api/school/add",
//   //       form, // or formData if you have a file
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json", // or multipart/form-data if file
//   //         },
//   //       },
//   //     );

//   //     alert("School added successfully!");
//   //   } catch (error) {
//   //     console.error("Error adding school:", error.response || error);
//   //     if (error.response && error.response.status === 403) {
//   //       alert("You do not have permission to add a school (Admin only).");
//   //     } else if (error.response && error.response.status === 401) {
//   //       alert("Invalid or expired token. Please login again.");
//   //     } else {
//   //       alert("Failed to add school. Check console for details.");
//   //     }
//   //   }
//   // };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <>
//       {/* ---------- HEADER ---------- */}
//       <div
//         className="row shadow"
//         style={{
//           // backgroundColor: "white",
//           background:
//             "linear-gradient(135deg, rgb(61, 87, 236) 0%, rgb(97, 150, 248) 50%, #87ddf7 100%)",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Create Accounts</strong>
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
//                 School Creation
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="border p-4 rounded shadow mx-2 mt-4">
//         <h5>Add New School</h5>

//         <div
//           className="row mt-3 text-center  text-white rounded"
//           style={{ backgroundColor: "rgb(30, 58, 138)" }}
//         >
//           <h5>School Details</h5>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>School Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="schoolName"
//               value={form.schoolName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>School Code</label>
//             <input
//               type="text"
//               className="form-control"
//               name="schoolCode"
//               value={form.schoolCode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>School Type</label>
//             <input
//               type="text"
//               className="form-control"
//               name="schoolType"
//               value={form.schoolType}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>Registration Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="registrationNumber"
//               value={form.registrationNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Affiliation Board</label>
//             <input
//               type="text"
//               className="form-control"
//               name="affiliationBoard"
//               value={form.affiliationBoard}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Established Year</label>
//             <input
//               type="text"
//               className="form-control"
//               name="establishedYear"
//               value={form.establishedYear}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Contact Details Fields  */}
//         <div
//           className="row mt-3 text-center  text-white rounded"
//           style={{ backgroundColor: "rgb(30, 58, 138)" }}
//         >
//           <h5>Contacts Details</h5>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>Principal Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="principalName"
//               value={form.principalName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Contact Person Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="contactPerson"
//               value={form.contactPerson}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Mobile No</label>
//             <input
//               type="text"
//               className="form-control"
//               name="mobileNo"
//               value={form.mobileNo}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>Alternate Mobile No</label>
//             <input
//               type="text"
//               className="form-control"
//               name="alternateNo"
//               value={form.alternateNo}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Email Address</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Address</label>
//             <input
//               type="text"
//               className="form-control"
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>City</label>
//             <input
//               type="text"
//               className="form-control"
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>State</label>
//             <input
//               type="text"
//               className="form-control"
//               name="State"
//               value={form.State}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label>Country</label>
//             <input
//               type="text"
//               className="form-control"
//               name="Country"
//               value={form.Country}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>Pincode</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Subscription Details  */}
//         <div
//           className="row mt-3 text-center  text-white rounded"
//           style={{ backgroundColor: "rgb(30, 58, 138)" }}
//         >
//           <h5>Subscriptions Details</h5>
//         </div>

//         <div className="row mt-3">
//           {/* <div className="col-md-3">
//             <label>Subscription Plan Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <label>Subscription Type</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-3">
//             <label>Start Date</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-3">
//             <label>End Date</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div> */}
//           <div className="col-md-3">
//   <label>Plan</label>
//   <select
//     className="form-control"
//     name="subscriptionPlan"
//     value={form.subscriptionPlan}
//     onChange={handleChange}
//   >
//     <option value="">Select</option>
//     <option value="Basic">Basic</option>
//     <option value="Standard">Standard</option>
//     <option value="Premium">Premium</option>
//   </select>
// </div>

// <div className="col-md-3">
//   <label>Type</label>
//   <select
//     className="form-control"
//     name="subscriptionType"
//     value={form.subscriptionType}
//     onChange={handleChange}
//   >
//     <option value="">Select</option>
//     <option value="Monthly">Monthly</option>
//     <option value="Quarterly">Quarterly</option>
//     <option value="Annually">Annually</option>
//   </select>
// </div>

// <div className="col-md-3">
//   <label>Amount</label>
//   <input
//     className="form-control"
//     value={form.amount}
//     readOnly
//   />
// </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-3">
//             <label>Trial Start Date</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-3">
//             <label>Trial End Date</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <label>Subscription Status</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <label>Renewal Date</label>
//             <input
//               type="text"
//               className="form-control"
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row mt-3">
//   <div className="col-md-2">
//     <label>Students</label>
//     <input
//       className="form-control"
//       value={form.maxStudents}
//       readOnly
//     />
//   </div>

//   <div className="col-md-2">
//     <label>Teachers</label>
//     <input
//       className="form-control"
//       value={form.maxTeachers}
//       readOnly
//     />
//   </div>

//   <div className="col-md-2">
//     <label>Admins</label>
//     <input
//       className="form-control"
//       value={form.maxAdmins}
//       readOnly
//     />
//   </div>

//   <div className="col-md-2">
//     <label>Storage (GB)</label>
//     <input
//       className="form-control"
//       value={form.storageLimit}
//       readOnly
//     />
//   </div>

//   <div className="col-md-2">
//     <label>SMS</label>
//     <input
//       className="form-control"
//       value={form.smsCredits}
//       readOnly
//     />
//   </div>

//   <div className="col-md-2">
//     <label>WhatsApp</label>
//     <input
//       className="form-control"
//       value={form.whatsappCredits}
//       readOnly
//     />
//   </div>
// </div>

//         <div className="mt-4 d-flex">
//           <button className="btn btn-success me-2" onClick={saveSchool}>
//             Create School
//           </button>
//           <button className="btn btn-danger" onClick={handleBack}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SchoolAddForm;

// import React, { useState } from "react";
// import { IoReturnDownBackOutline } from "react-icons/io5";
// import { MdErrorOutline, MdOutlineMedicalInformation } from "react-icons/md";
// import { BiSolidSchool } from "react-icons/bi";
// import { FaPhone } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi2";
// import useMasters from "../../hooks/useMasters";
// import { IoMdSettings } from "react-icons/io";

// const SchoolAddForm = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const { schoolType, schoolCategory, affiliationBoard } = useMasters();
//   console.log("schoolType", schoolType);
//   console.log("schoolcategory", schoolCategory);
//   console.log("affiliationBoard", affiliationBoard);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setSelectedFile(file);
//     }
//   };
//   const countries = [
//     "India",
//     "China",
//     "Japan",
//     "South Korea",
//     "Indonesia",
//     "Malaysia",
//     "Singapore",
//     "Thailand",
//     "Vietnam",
//     "Philippines",
//   ];

//   const indianStates = [
//     // States
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal",

//     // Union Territories
//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli and Daman and Diu",
//     "Delhi",
//     "Jammu and Kashmir",
//     "Ladakh",
//     "Lakshadweep",
//     "Puducherry",
//   ];
//   return (
//     <>
//       <div
//         className="row shadow align-items-center p-3"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         {/* LEFT SIDE */}
//         <div className="col">
//           <h6 className="mb-1">Create New School</h6>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">
//                 <a
//                   href="/"
//                   style={{
//                     textDecoration: "none",
//                     color: "black",
//                   }}
//                 >
//                   <small>Dashboard</small>
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>Organization Management</small>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>School List</small>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>Create New School</small>
//               </li>
//             </ol>
//           </nav>
//         </div>

//         {/* RIGHT / LAST */}
//         <div className="col-auto">
//           <button className="btn btn-outline-primary">
//             <IoReturnDownBackOutline size={20} /> Back to School List
//           </button>
//         </div>
//       </div>
//       <div className="ms-2 me-2 mt-4 p-1">
//         <div className="row g-3 align-items-stretch">
//           {/* LEFT CARD */}
//           <div className="col-12 col-md-8 col-lg-8">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <strong>
//                   <span className=" p-1 rounded-5 bg-primary me-2">
//                     <MdOutlineMedicalInformation
//                       size={20}
//                       className="text-white"
//                     />
//                   </span>
//                   Basic Information
//                 </strong>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         School Name <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter school name"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4 ">
//                     <label className="form-label ">
//                       <h6>
//                         {" "}
//                         School Code <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter School Code"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Organization Name <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select Organization</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Address Line 1 <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter address line 1"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6> Address Line 2</h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter address line 2"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         City <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter city"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         State <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select State</option>
//                       {indianStates.map((state) => (
//                         <option key={state} value={state}>
//                           {state}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6> Country</h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select Country</option>
//                       {countries.map((country) => (
//                         <option key={country} value={country}>
//                           {country}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Pincode <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter pincode"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-12 col-md-4 col-lg-4">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <strong>School Logo</strong>

//                 <p className="mt-2 text-muted">
//                   Upload school logo (JPG, PNG, SVG-Max-2MB)
//                 </p>
//               </div>

//               <div className="card-body">
//                 <div className="">
//                   <div className="custom-upload-box">
//                     {/* ICON */}
//                     <div className="upload-icon">
//                       <BiSolidSchool />
//                     </div>

//                     {/* TEXT */}
//                     <div className="fw-semibold">
//                       <span className="text-primary">Click to upload </span>
//                       <span className="text-muted small">or drag and drop</span>
//                     </div>

//                     <div className="text-muted small">
//                       Recommended size: 200 × 200 px
//                     </div>

//                     {/* FILE INPUT */}
//                     <input
//                       type="file"
//                       accept="image/png,image/jpeg,image/jpg"
//                       className="custom-file-input"
//                       onChange={handleFileChange}
//                     />
//                   </div>

//                   {/* SELECTED FILE NAME */}
//                   {selectedFile && (
//                     <div className="mt-2 small text-success">
//                       ✓ {selectedFile.name}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="ms-2 me-2 mt-2 p-1">
//         <div className="row g-3 align-items-stretch">
//           {/* LEFT CARD */}
//           <div className="col-12 col-md-7 col-lg-7">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <strong>
//                   <span className=" p-1 rounded-5 bg-primary me-2">
//                     <FaPhone size={20} className="text-white" />
//                   </span>
//                   Contact Information
//                 </strong>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Contact Person Name{" "}
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter contact person name"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4 ">
//                     <label className="form-label ">
//                       <h6>
//                         {" "}
//                         Designation <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Designation"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Email <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Email"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Phone Number <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter phone number"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6> Alternate Phone</h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter alternate phone"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-12 col-md-5 col-lg-5">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <span className=" p-1 rounded-5 bg-primary me-2">
//                   <HiAcademicCap size={20} className="text-white" />
//                 </span>
//                 <strong>Academic Information</strong>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Academic Ses Start Month{" "}
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select start month</option>
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Academic Session Format{" "}
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select format</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Default Language <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select language</option>
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Currency <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select currency</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="ms-2 me-2 mt-2 p-1">
//         <div className="row g-3 align-items-stretch">
//           {/* LEFT CARD */}
//           <div className="col-12 col-md-7 col-lg-7">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <strong>
//                   <span className=" p-1 rounded-5 bg-primary me-2">
//                     <MdErrorOutline size={20} className="text-white" />
//                   </span>
//                   Other Information
//                 </strong>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         School Type <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select Type</option>
//                       {schoolType.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-4 ">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         School Category <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select Category</option>
//                       {schoolCategory.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Affiliation Board <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select name="" id="" className="form-select">
//                       <option value="">Select Affiliation</option>
//                       {affiliationBoard.map((item) => (
//                         <option key={item} value={item}>
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Established Year <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <select
//                       name="establishedYear"
//                       // value={formData.establishedYear}
//                       // onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">Select Established Year</option>

//                       {Array.from(
//                         { length: new Date().getFullYear() - 1980 + 1 },
//                         (_, i) => new Date().getFullYear() - i,
//                       ).map((year) => (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6> Total Classes(approx)</h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter total classes"
//                     />
//                   </div>
//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6> Total Students(approx)</h6>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter total students"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-12">
//                     <label className="form-label">
//                       <h6> Description</h6>
//                     </label>
//                     <textarea
//                       name=""
//                       id=""
//                       className="form-control"
//                       placeholder="Enter school description"
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-12 col-md-5 col-lg-5">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">
//               <div className="card-header bg-white border-0 align-items-center">
//                 <span className=" p-1 rounded-5 bg-primary me-2">
//                   <IoMdSettings size={20} className="text-white" />
//                 </span>
//                 <strong>Status & Settings</strong>
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Status
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <div className="d-flex align-items-center gap-2">
//                       <div className="form-check form-switch mb-0">
//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="schoolStatus"
//                         />
//                       </div>

//                       <label htmlFor="schoolStatus" className="mb-0">
//                         Active
//                       </label>
//                     </div>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Allow Parent Login
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <div className="d-flex align-items-center gap-2">
//                       <div className="form-check form-switch mb-0">
//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowParent"
//                         />
//                       </div>

//                       <label htmlFor="allowParent" className="mb-0">
//                         Yes
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         {" "}
//                         Allow Student Login
//                         <span className="text-danger">*</span>
//                       </h6>
//                     </label>
//                     <div className="d-flex align-items-center gap-2">
//                       <div className="form-check form-switch mb-0">
//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowStudent"
//                         />
//                       </div>

//                       <label htmlFor="allowStudent" className="mb-0">
//                         Yes
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label ">
//                       Time Zone <span className="text-danger">*</span>
//                     </label>

//                     <select className="form-select">
//                       {/* <option value="">Select Time Zone</option> */}

//                       <option value="Asia/Kolkata">
//                         India Standard Time (IST) — UTC +05:30
//                       </option>

//                       <option value="Asia/Dubai">
//                         Gulf Standard Time (GST) — UTC +04:00
//                       </option>

//                       <option value="Asia/Dhaka">
//                         Bangladesh Standard Time — UTC +06:00
//                       </option>

//                       <option value="Asia/Kathmandu">
//                         Nepal Time — UTC +05:45
//                       </option>

//                       <option value="Asia/Singapore">
//                         Singapore Time — UTC +08:00
//                       </option>

//                       <option value="Asia/Tokyo">
//                         Japan Standard Time — UTC +09:00
//                       </option>
//                     </select>
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label className="form-label ">Date Format</label>

//                     <select className="form-select">
//                       <option value="">Select Date Format</option>

//                       <option value="dd-MM-yyyy">
//                         DD-MM-YYYY (23-08-2026)
//                       </option>

//                       <option value="dd/MM/yyyy">
//                         DD/MM/YYYY (23/08/2026)
//                       </option>

//                       <option value="yyyy-MM-dd">
//                         YYYY-MM-DD (2026-08-23)
//                       </option>

//                       <option value="MM/dd/yyyy">
//                         MM/DD/YYYY (08/23/2026)
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row  mt-3 mx-2">
//         <div className="col-12 d-flex gap-3 justify-content-end">
//           <button className="btn btn-outline-primary">Reset</button>
//         <button className="btn btn-success">Create School</button>
//         </div>
//       </div>

//       <style>
//         {`.custom-upload-box {
//   position: relative;
//   border: 2px dashed #ced4da;
//   border-radius: 10px;
//   min-height: 170px;
//   padding: 25px;
//   text-align: center;
//   background-color: #f8f9fa;
//   cursor: pointer;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   transition: all 0.2s ease;
// }

// .custom-upload-box:hover {
//   border-color: #0d6efd;
//   background-color: #f1f6ff;
// }

// .upload-icon {
//   font-size: 32px;
//   margin-bottom: 8px;
// }

// .custom-file-input {
//   position: absolute;
//   inset: 0;
//   width: 100%;
//   height: 100%;
//   opacity: 0;
//   cursor: pointer;
// }
//   .green-switch:checked {
//   background-color: #198754;
//   border-color: #198754;
// }

// .green-switch {
//   width: 35px !important;
//   height: 20px !important;
//   cursor: pointer;
// }
// `}
//       </style>
//     </>
//   );
// };

// export default SchoolAddForm;


// import React, { useState } from "react";
// import axios from "axios";

// import { IoReturnDownBackOutline } from "react-icons/io5";
// import { MdErrorOutline, MdOutlineMedicalInformation } from "react-icons/md";
// import { BiSolidSchool } from "react-icons/bi";
// import { FaPhone } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi2";
// import { IoMdSettings } from "react-icons/io";

// import useMasters from "../../hooks/useMasters";

// const SchoolAddForm = () => {
//   const { schoolType, schoolCategory, affiliationBoard } = useMasters();

//   // =========================================================
//   // FILE
//   // =========================================================

//   const [selectedFile, setSelectedFile] = useState(null);

//   // =========================================================
//   // FORM DATA
//   // =========================================================

//   const [formData, setFormData] = useState({
//     // Basic Information
//     schoolName: "",
//     schoolCode: "",
//     organizationName: "",

//     // Address
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",

//     // Contact
//     contactPersonName: "",
//     designation: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhone: "",

//     // Academic
//     academicSessionStartMonth: "",
//     academicSessionFormat: "",
//     defaultLanguage: "",
//     currency: "",

//     // Other
//     schoolType: "",
//     schoolCategory: "",
//     affiliationBoard: "",
//     establishedYear: "",
//     totalClasses: "",
//     totalStudents: "",
//     description: "",

//     // Settings
//     status: true,
//     allowParentLogin: true,
//     allowStudentLogin: true,

//     // Localization
//     timeZone: "Asia/Kolkata",
//     dateFormat: "dd-MM-yyyy",
//   });

//   // =========================================================
//   // COUNTRIES
//   // =========================================================

//   const countries = [
//     "India",
//     "China",
//     "Japan",
//     "South Korea",
//     "Indonesia",
//     "Malaysia",
//     "Singapore",
//     "Thailand",
//     "Vietnam",
//     "Philippines",
//   ];

//   // =========================================================
//   // INDIAN STATES + UT
//   // =========================================================

//   const indianStates = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal",

//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli and Daman and Diu",
//     "Delhi",
//     "Jammu and Kashmir",
//     "Ladakh",
//     "Lakshadweep",
//     "Puducherry",
//   ];

//   // =========================================================
//   // HANDLE INPUT
//   // =========================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================================================
//   // HANDLE SWITCH
//   // =========================================================

//   const handleSwitchChange = (e) => {
//     const { name, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   // =========================================================
//   // FILE CHANGE
//   // =========================================================

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // 2MB validation
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Logo size must be less than 2MB.");
//       return;
//     }

//     // Image validation
//     const allowedTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/svg+xml",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Only JPG, PNG or SVG files are allowed.");
//       return;
//     }

//     setSelectedFile(file);
//   };

//   // =========================================================
//   // RESET
//   // =========================================================

//   const handleReset = () => {
//     setFormData({
//       schoolName: "",
//       schoolCode: "",
//       organizationName: "",

//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       country: "India",
//       pincode: "",

//       contactPersonName: "",
//       designation: "",
//       email: "",
//       phoneNumber: "",
//       alternatePhone: "",

//       academicSessionStartMonth: "",
//       academicSessionFormat: "",
//       defaultLanguage: "",
//       currency: "",

//       schoolType: "",
//       schoolCategory: "",
//       affiliationBoard: "",
//       establishedYear: "",
//       totalClasses: "",
//       totalStudents: "",
//       description: "",

//       status: true,
//       allowParentLogin: true,
//       allowStudentLogin: true,

//       timeZone: "Asia/Kolkata",
//       dateFormat: "dd-MM-yyyy",
//     });

//     setSelectedFile(null);
//   };

//   // =========================================================
//   // CREATE SCHOOL
//   // =========================================================

//   const handleCreateSchool = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Authentication token not found.");
//       return;
//     }

//     // =====================================================
//     // VALIDATION
//     // =====================================================

//     if (!formData.schoolName.trim()) {
//       alert("School name is required.");
//       return;
//     }

//     if (!formData.schoolCode.trim()) {
//       alert("School code is required.");
//       return;
//     }

//     if (!formData.addressLine1.trim()) {
//       alert("Address Line 1 is required.");
//       return;
//     }

//     if (!formData.city.trim()) {
//       alert("City is required.");
//       return;
//     }

//     if (!formData.state) {
//       alert("Please select state.");
//       return;
//     }

//     if (!formData.pincode.trim()) {
//       alert("Pincode is required.");
//       return;
//     }

//     if (!formData.contactPersonName.trim()) {
//       alert("Contact person name is required.");
//       return;
//     }

//     if (!formData.designation.trim()) {
//       alert("Designation is required.");
//       return;
//     }

//     if (!formData.email.trim()) {
//       alert("Email is required.");
//       return;
//     }

//     if (!formData.phoneNumber.trim()) {
//       alert("Phone number is required.");
//       return;
//     }

//     if (!formData.academicSessionStartMonth) {
//       alert("Please select academic session start month.");
//       return;
//     }

//     if (!formData.academicSessionFormat) {
//       alert("Please select academic session format.");
//       return;
//     }

//     if (!formData.defaultLanguage) {
//       alert("Please select default language.");
//       return;
//     }

//     if (!formData.currency) {
//       alert("Please select currency.");
//       return;
//     }

//     if (!formData.schoolType) {
//       alert("Please select school type.");
//       return;
//     }

//     if (!formData.schoolCategory) {
//       alert("Please select school category.");
//       return;
//     }

//     if (!formData.affiliationBoard) {
//       alert("Please select affiliation board.");
//       return;
//     }

//     if (!formData.establishedYear) {
//       alert("Please select established year.");
//       return;
//     }

//     // =====================================================
//     // SCHOOL OBJECT
//     // =====================================================

//     const schoolData = {
//       schoolName: formData.schoolName.trim(),
//       schoolCode: formData.schoolCode.trim(),
//       organizationName: formData.organizationName || null,

//       addressLine1: formData.addressLine1.trim(),
//       addressLine2: formData.addressLine2 || null,
//       city: formData.city.trim(),
//       state: formData.state,
//       country: formData.country,
//       pincode: formData.pincode.trim(),

//       contactPerson: formData.contactPersonName.trim(),
//       designation: formData.designation.trim(),
//       email: formData.email.trim(),
//       phoneNumber: formData.phoneNumber.trim(),
//       alternatePhone: formData.alternatePhone || null,

//       academicSessionStartMonth:
//         formData.academicSessionStartMonth,

//       academicSessionFormat:
//         formData.academicSessionFormat,

//       defaultLanguage:
//         formData.defaultLanguage,

//       currency:
//         formData.currency,

//       schoolType:
//         formData.schoolType,

//       schoolCategory:
//         formData.schoolCategory,

//       affiliationBoard:
//         formData.affiliationBoard,

//       establishedYear:
//         formData.establishedYear,

//       totalClasses:
//         formData.totalClasses
//           ? Number(formData.totalClasses)
//           : null,

//       totalStudents:
//         formData.totalStudents
//           ? Number(formData.totalStudents)
//           : null,

//       description:
//         formData.description || null,

//       active:
//         Boolean(formData.status),

//       allowParentLogin:
//         Boolean(formData.allowParentLogin),

//       allowStudentLogin:
//         Boolean(formData.allowStudentLogin),

//       timeZone:
//         formData.timeZone,

//       dateFormat:
//         formData.dateFormat,
//     };

//     // =====================================================
//     // MULTIPART DATA
//     // =====================================================

//     const data = new FormData();

//     // School JSON
//     data.append(
//       "school",
//       new Blob(
//         [JSON.stringify(schoolData)],
//         {
//           type: "application/json",
//         }
//       )
//     );

//     // Logo
//     if (selectedFile) {
//       data.append(
//         "attachment",
//         selectedFile
//       );
//     }

//     // =====================================================
//     // DEBUG
//     // =====================================================

//     console.log(
//       "School Data:",
//       schoolData
//     );

//     console.log(
//       "Selected Logo:",
//       selectedFile
//     );

//     // =====================================================
//     // API CALL
//     // =====================================================

//     const response = await axios.post(
//       "http://localhost:8080/api/school/add",
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(
//       "School Created Successfully:",
//       response.data
//     );

//     alert(
//       "School created successfully!"
//     );

//     // =====================================================
//     // RESET
//     // =====================================================

//     handleReset();

//   } catch (error) {

//     console.error(
//       "Create School Error:",
//       error
//     );

//     if (error.response) {

//       console.error(
//         "Backend Response:",
//         error.response.data
//       );

//       alert(
//         error.response.data?.message ||
//         "Failed to create school."
//       );

//     } else {

//       alert(
//         "Unable to connect with server."
//       );
//     }
//   }
// };

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <div
//         className="row shadow align-items-center p-3"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           color: "black",
//         }}
//       >
//         {/* LEFT */}
//         <div className="col">
//           <h6 className="mb-1">
//             Create New School
//           </h6>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">
//                 <a
//                   href="/"
//                   style={{
//                     textDecoration: "none",
//                     color: "black",
//                   }}
//                 >
//                   <small>Dashboard</small>
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>
//                   Organization Management
//                 </small>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>School List</small>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>Create New School</small>
//               </li>
//             </ol>
//           </nav>
//         </div>

//         {/* RIGHT */}
//         <div className="col-auto">
//           <button
//             type="button"
//             className="btn btn-outline-primary"
//           >
//             <IoReturnDownBackOutline size={20} />
//             {" "}Back to School List
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           BASIC INFORMATION + LOGO
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-4 p-1">
//         <div className="row g-3 align-items-stretch">

//           {/* BASIC INFORMATION */}

//           <div className="col-12 col-md-8 col-lg-8">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">
//                 <strong>
//                   <span className="p-1 rounded-5 bg-primary me-2">
//                     <MdOutlineMedicalInformation
//                       size={20}
//                       className="text-white"
//                     />
//                   </span>

//                   Basic Information
//                 </strong>
//               </div>

//               <div className="card-body">

//                 {/* ROW 1 */}

//                 <div className="row">

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         School Name{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="schoolName"
//                       value={formData.schoolName}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter school name"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         School Code{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="schoolCode"
//                       value={formData.schoolCode}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter School Code"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Organization Name{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="organizationName"
//                       value={formData.organizationName}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Organization
//                       </option>
//                     </select>
//                   </div>

//                 </div>

//                 {/* ROW 2 */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Address Line 1{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="addressLine1"
//                       value={formData.addressLine1}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter address line 1"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>Address Line 2</h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="addressLine2"
//                       value={formData.addressLine2}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter address line 2"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         City{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter city"
//                     />
//                   </div>

//                 </div>

//                 {/* ROW 3 */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         State{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select State
//                       </option>

//                       {indianStates.map((state) => (
//                         <option
//                           key={state}
//                           value={state}
//                         >
//                           {state}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>Country</h6>
//                     </label>

//                     <select
//                       name="country"
//                       value={formData.country}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Country
//                       </option>

//                       {countries.map((country) => (
//                         <option
//                           key={country}
//                           value={country}
//                         >
//                           {country}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Pincode{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter pincode"
//                     />
//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* SCHOOL LOGO */}

//           <div className="col-12 col-md-4 col-lg-4">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">
//                 <strong>School Logo</strong>

//                 <p className="mt-2 text-muted">
//                   Upload school logo
//                   (JPG, PNG, SVG - Max 2MB)
//                 </p>
//               </div>

//               <div className="card-body">

//                 <div className="custom-upload-box">

//                   <div className="upload-icon">
//                     <BiSolidSchool />
//                   </div>

//                   <div className="fw-semibold">
//                     <span className="text-primary">
//                       Click to upload{" "}
//                     </span>

//                     <span className="text-muted small">
//                       or drag and drop
//                     </span>
//                   </div>

//                   <div className="text-muted small">
//                     Recommended size: 200 × 200 px
//                   </div>

//                   <input
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/svg+xml"
//                     className="custom-file-input"
//                     onChange={handleFileChange}
//                   />

//                 </div>

//                 {selectedFile && (
//                   <div className="mt-2 small text-success">
//                     ✓ {selectedFile.name}
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           CONTACT + ACADEMIC
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-2 p-1">
//         <div className="row g-3 align-items-stretch">

//           {/* CONTACT */}

//           <div className="col-12 col-md-7 col-lg-7">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">
//                 <strong>
//                   <span className="p-1 rounded-5 bg-primary me-2">
//                     <FaPhone
//                       size={20}
//                       className="text-white"
//                     />
//                   </span>

//                   Contact Information
//                 </strong>
//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Contact Person Name{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="contactPersonName"
//                       value={formData.contactPersonName}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter contact person name"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Designation{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="designation"
//                       value={formData.designation}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter Designation"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Email{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter Email"
//                     />
//                   </div>

//                 </div>

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Phone Number{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter phone number"
//                     />
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>Alternate Phone</h6>
//                     </label>

//                     <input
//                       type="text"
//                       name="alternatePhone"
//                       value={formData.alternatePhone}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter alternate phone"
//                     />
//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* ACADEMIC */}

//           <div className="col-12 col-md-5 col-lg-5">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">
//                 <span className="p-1 rounded-5 bg-primary me-2">
//                   <HiAcademicCap
//                     size={20}
//                     className="text-white"
//                   />
//                 </span>

//                 <strong>Academic Information</strong>
//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         Academic Sess Start Month{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="academicSessionStartMonth"
//                       value={
//                         formData.academicSessionStartMonth
//                       }
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select start month
//                       </option>

//                       <option value="JANUARY">
//                         January
//                       </option>

//                       <option value="APRIL">
//                         April
//                       </option>

//                       <option value="JUNE">
//                         June
//                       </option>

//                       <option value="JULY">
//                         July
//                       </option>
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         Academic Session Format{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="academicSessionFormat"
//                       value={
//                         formData.academicSessionFormat
//                       }
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select format
//                       </option>

//                       <option value="YYYY-YYYY">
//                         2026-2027
//                       </option>

//                       <option value="YYYY-YY">
//                         2026-27
//                       </option>
//                     </select>
//                   </div>

//                 </div>

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         Default Language{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="defaultLanguage"
//                       value={formData.defaultLanguage}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select language
//                       </option>

//                       <option value="ENGLISH">
//                         English
//                       </option>

//                       <option value="HINDI">
//                         Hindi
//                       </option>
//                     </select>
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <label className="form-label">
//                       <h6>
//                         Currency{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="currency"
//                       value={formData.currency}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select currency
//                       </option>

//                       <option value="INR">
//                         Indian Rupee (₹)
//                       </option>

//                       <option value="USD">
//                         US Dollar ($)
//                       </option>
//                     </select>
//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           OTHER INFORMATION + SETTINGS
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-2 p-1">
//         <div className="row g-3 align-items-stretch">

//           {/* OTHER INFORMATION */}

//           <div className="col-12 col-md-7 col-lg-7">
//             <div className="card bg-white shadow rounded-3 p-2 h-100">

//               <div className="card-header bg-white border-0">
//                 <strong>
//                   <span className="p-1 rounded-5 bg-primary me-2">
//                     <MdErrorOutline
//                       size={20}
//                       className="text-white"
//                     />
//                   </span>

//                   Other Information
//                 </strong>
//               </div>

//               <div className="card-body">

//                 <div className="row">

//                   {/* SCHOOL TYPE */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         School Type{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="schoolType"
//                       value={formData.schoolType}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Type
//                       </option>

//                       {schoolType.map((item) => (
//                         <option
//                           key={item}
//                           value={item}
//                         >
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* CATEGORY */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         School Category{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="schoolCategory"
//                       value={formData.schoolCategory}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Category
//                       </option>

//                       {schoolCategory.map((item) => (
//                         <option
//                           key={item}
//                           value={item}
//                         >
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* BOARD */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Affiliation Board{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="affiliationBoard"
//                       value={formData.affiliationBoard}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Affiliation
//                       </option>

//                       {affiliationBoard.map((item) => (
//                         <option
//                           key={item}
//                           value={item}
//                         >
//                           {item}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                 </div>

//                 {/* ROW 2 */}

//                 <div className="row mt-3">

//                   {/* YEAR */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Established Year{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <select
//                       name="establishedYear"
//                       value={formData.establishedYear}
//                       onChange={handleChange}
//                       className="form-select"
//                     >
//                       <option value="">
//                         Select Established Year
//                       </option>

//                       {Array.from(
//                         {
//                           length:
//                             new Date().getFullYear() -
//                             1980 +
//                             1,
//                         },
//                         (_, i) =>
//                           new Date().getFullYear() - i
//                       ).map((year) => (
//                         <option
//                           key={year}
//                           value={year}
//                         >
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* TOTAL CLASSES */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Total Classes (approx)
//                       </h6>
//                     </label>

//                     <input
//                       type="number"
//                       name="totalClasses"
//                       value={formData.totalClasses}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter total classes"
//                     />
//                   </div>

//                   {/* TOTAL STUDENTS */}

//                   <div className="col-12 col-md-4">
//                     <label className="form-label">
//                       <h6>
//                         Total Students (approx)
//                       </h6>
//                     </label>

//                     <input
//                       type="number"
//                       name="totalStudents"
//                       value={formData.totalStudents}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter total students"
//                     />
//                   </div>

//                 </div>

//                 {/* DESCRIPTION */}

//                 <div className="row mt-3">

//                   <div className="col-12">
//                     <label className="form-label">
//                       <h6>Description</h6>
//                     </label>

//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Enter school description"
//                       rows="4"
//                     />
//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* SETTINGS */}

//           <div className="col-12 col-md-5 col-lg-5">
//             <div className="card bg-white shadow rounded-3 p-3 h-100">

//               <div className="card-header bg-white border-0">
//                 <span className="p-1 rounded-5 bg-primary me-2">
//                   <IoMdSettings
//                     size={20}
//                     className="text-white"
//                   />
//                 </span>

//                 <strong>
//                   Status & Settings
//                 </strong>
//               </div>

//               <div className="card-body">

//                 {/* STATUS */}

//                 <div className="row">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       <h6>
//                         Status{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="schoolStatus"
//                           name="status"
//                           checked={formData.status}
//                           onChange={handleSwitchChange}
//                         />

//                       </div>

//                       <label
//                         htmlFor="schoolStatus"
//                         className="mb-0"
//                       >
//                         {formData.status
//                           ? "Active"
//                           : "Inactive"}
//                       </label>

//                     </div>

//                   </div>

//                   {/* PARENT */}

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       <h6>
//                         Allow Parent Login{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowParent"
//                           name="allowParentLogin"
//                           checked={
//                             formData.allowParentLogin
//                           }
//                           onChange={
//                             handleSwitchChange
//                           }
//                         />

//                       </div>

//                       <label
//                         htmlFor="allowParent"
//                         className="mb-0"
//                       >
//                         {formData.allowParentLogin
//                           ? "Yes"
//                           : "No"}
//                       </label>

//                     </div>

//                   </div>

//                 </div>

//                 {/* STUDENT */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       <h6>
//                         Allow Student Login{" "}
//                         <span className="text-danger">
//                           *
//                         </span>
//                       </h6>
//                     </label>

//                     <div className="d-flex align-items-center gap-2">

//                       <div className="form-check form-switch mb-0">

//                         <input
//                           className="form-check-input green-switch"
//                           type="checkbox"
//                           role="switch"
//                           id="allowStudent"
//                           name="allowStudentLogin"
//                           checked={
//                             formData.allowStudentLogin
//                           }
//                           onChange={
//                             handleSwitchChange
//                           }
//                         />

//                       </div>

//                       <label
//                         htmlFor="allowStudent"
//                         className="mb-0"
//                       >
//                         {formData.allowStudentLogin
//                           ? "Yes"
//                           : "No"}
//                       </label>

//                     </div>

//                   </div>

//                 </div>

//                 {/* TIMEZONE + DATE */}

//                 <div className="row mt-3">

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       Time Zone{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <select
//                       name="timeZone"
//                       value={formData.timeZone}
//                       onChange={handleChange}
//                       className="form-select"
//                     >

//                       <option value="Asia/Kolkata">
//                         India Standard Time (IST) — UTC +05:30
//                       </option>

//                       <option value="Asia/Dubai">
//                         Gulf Standard Time (GST) — UTC +04:00
//                       </option>

//                       <option value="Asia/Dhaka">
//                         Bangladesh Standard Time — UTC +06:00
//                       </option>

//                       <option value="Asia/Kathmandu">
//                         Nepal Time — UTC +05:45
//                       </option>

//                       <option value="Asia/Singapore">
//                         Singapore Time — UTC +08:00
//                       </option>

//                       <option value="Asia/Tokyo">
//                         Japan Standard Time — UTC +09:00
//                       </option>

//                     </select>

//                   </div>

//                   <div className="col-12 col-md-6">

//                     <label className="form-label">
//                       Date Format
//                     </label>

//                     <select
//                       name="dateFormat"
//                       value={formData.dateFormat}
//                       onChange={handleChange}
//                       className="form-select"
//                     >

//                       <option value="dd-MM-yyyy">
//                         DD-MM-YYYY (23-08-2026)
//                       </option>

//                       <option value="dd/MM/yyyy">
//                         DD/MM/YYYY (23/08/2026)
//                       </option>

//                       <option value="yyyy-MM-dd">
//                         YYYY-MM-DD (2026-08-23)
//                       </option>

//                       <option value="MM/dd/yyyy">
//                         MM/DD/YYYY (08/23/2026)
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           ACTION BUTTONS
//       ====================================================== */}

//       <div className="row mt-3 mx-2 mb-4">

//         <div className="col-12 d-flex gap-3 justify-content-end">

//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={handleReset}
//           >
//             Reset
//           </button>

//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={handleCreateSchool}
//           >
//             Create School
//           </button>

//         </div>

//       </div>

//       {/* =====================================================
//           CSS
//       ====================================================== */}

//       <style>
//         {`
//           .custom-upload-box {
//             position: relative;
//             border: 2px dashed #ced4da;
//             border-radius: 10px;
//             min-height: 170px;
//             padding: 25px;
//             text-align: center;
//             background-color: #f8f9fa;
//             cursor: pointer;

//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;

//             transition: all 0.2s ease;
//           }

//           .custom-upload-box:hover {
//             border-color: #0d6efd;
//             background-color: #f1f6ff;
//           }

//           .upload-icon {
//             font-size: 32px;
//             margin-bottom: 8px;
//           }

//           .custom-file-input {
//             position: absolute;
//             inset: 0;
//             width: 100%;
//             height: 100%;
//             opacity: 0;
//             cursor: pointer;
//           }

//           .green-switch:checked {
//             background-color: #198754;
//             border-color: #198754;
//           }

//           .green-switch {
//             width: 35px !important;
//             height: 20px !important;
//             cursor: pointer;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default SchoolAddForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { IoReturnDownBackOutline } from "react-icons/io5";
import {
  MdErrorOutline,
  MdOutlineMedicalInformation,
} from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";

import useMasters from "../../hooks/useMasters";

const SchoolAddForm = () => {
  const {
    schoolType = [],
    schoolCategory = [],
    affiliationBoard = [],
  } = useMasters();

  const { schoolId } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // CREATE / EDIT MODE
  // =========================================================

  const isEditMode = Boolean(schoolId);

  // =========================================================
  // STATES
  // =========================================================

  const [selectedFile, setSelectedFile] = useState(null);

  const [existingLogo, setExistingLogo] = useState(null);

  const [loadingSchool, setLoadingSchool] = useState(false);

  const [saving, setSaving] = useState(false);

  // =========================================================
  // FORM DATA
  // =========================================================

  const initialFormData = {
    // Basic Information
    schoolName: "",
    schoolCode: "",
    organizationName: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",

    // Contact
    contactPersonName: "",
    designation: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",

    // Academic
    academicSessionStartMonth: "",
    academicSessionFormat: "",
    defaultLanguage: "",
    currency: "",

    // Other
    schoolType: "",
    schoolCategory: "",
    affiliationBoard: "",
    establishedYear: "",
    totalClasses: "",
    totalStudents: "",
    description: "",

    // Settings
    status: true,
    allowParentLogin: true,
    allowStudentLogin: true,

    // Localization
    timeZone: "Asia/Kolkata",
    dateFormat: "dd-MM-yyyy",
  };

  const [formData, setFormData] = useState(initialFormData);

  // =========================================================
  // COUNTRIES
  // =========================================================

  const countries = [
    "India",
    "China",
    "Japan",
    "South Korea",
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Thailand",
    "Vietnam",
    "Philippines",
  ];

  // =========================================================
  // INDIAN STATES + UT
  // =========================================================

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // =========================================================
  // FETCH SCHOOL FOR EDIT
  // =========================================================

  useEffect(() => {
    if (!schoolId) {
      return;
    }

    const fetchSchool = async () => {
      try {
        setLoadingSchool(true);

        const token = localStorage.getItem("token");

        if (!token) {
          alert("Authentication token not found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/school/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const school = response.data;

        console.log("School data for edit:", school);

        // =====================================================
        // EXISTING LOGO
        // =====================================================

        setExistingLogo(
          school.logoUrl ||
            school.logo ||
            school.logoPath ||
            null
        );

        // =====================================================
        // SET FORM DATA
        // =====================================================

        setFormData({
          schoolName: school.schoolName || "",

          schoolCode: school.schoolCode || "",

          organizationName:
            school.organizationName || "",

          addressLine1:
            school.addressLine1 || "",

          addressLine2:
            school.addressLine2 || "",

          city:
            school.city || "",

          state:
            school.state || "",

          country:
            school.country || "India",

          pincode:
            school.pincode || "",

          contactPersonName:
            school.contactPerson ||
            school.contactPersonName ||
            "",

          designation:
            school.designation || "",

          email:
            school.email || "",

          phoneNumber:
            school.phoneNumber || "",

          alternatePhone:
            school.alternatePhone || "",

          academicSessionStartMonth:
            school.academicSessionStartMonth || "",

          academicSessionFormat:
            school.academicSessionFormat || "",

          defaultLanguage:
            school.defaultLanguage || "",

          currency:
            school.currency || "",

          schoolType:
            school.schoolType || "",

          schoolCategory:
            school.schoolCategory || "",

          affiliationBoard:
            school.affiliationBoard || "",

          establishedYear:
            school.establishedYear || "",

          totalClasses:
            school.totalClasses ?? "",

          totalStudents:
            school.totalStudents ?? "",

          description:
            school.description || "",

          status:
            school.active ??
            school.status ??
            true,

          allowParentLogin:
            school.allowParentLogin ?? true,

          allowStudentLogin:
            school.allowStudentLogin ?? true,

          timeZone:
            school.timeZone || "Asia/Kolkata",

          dateFormat:
            school.dateFormat || "dd-MM-yyyy",
        });
      } catch (error) {
        console.error(
          "Fetch school error:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to load school details."
        );
      } finally {
        setLoadingSchool(false);
      }
    };

    fetchSchool();
  }, [schoolId]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE SWITCH
  // =========================================================

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // =========================================================
  // FILE CHANGE
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 2MB validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size must be less than 2MB.");
      return;
    }

    // Image validation
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, PNG or SVG files are allowed."
      );
      return;
    }

    setSelectedFile(file);
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    // Edit mode me reload karke original data
    // dobara load karenge
    if (isEditMode) {
      window.location.reload();
      return;
    }

    setFormData(initialFormData);

    setSelectedFile(null);

    setExistingLogo(null);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!formData.schoolName.trim()) {
      alert("School name is required.");
      return false;
    }

    if (!formData.schoolCode.trim()) {
      alert("School code is required.");
      return false;
    }

    if (!formData.addressLine1.trim()) {
      alert("Address Line 1 is required.");
      return false;
    }

    if (!formData.city.trim()) {
      alert("City is required.");
      return false;
    }

    if (!formData.state) {
      alert("Please select state.");
      return false;
    }

    if (!formData.pincode.trim()) {
      alert("Pincode is required.");
      return false;
    }

    if (!formData.contactPersonName.trim()) {
      alert(
        "Contact person name is required."
      );
      return false;
    }

    if (!formData.designation.trim()) {
      alert("Designation is required.");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      alert("Phone number is required.");
      return false;
    }

    if (!formData.academicSessionStartMonth) {
      alert(
        "Please select academic session start month."
      );
      return false;
    }

    if (!formData.academicSessionFormat) {
      alert(
        "Please select academic session format."
      );
      return false;
    }

    if (!formData.defaultLanguage) {
      alert(
        "Please select default language."
      );
      return false;
    }

    if (!formData.currency) {
      alert("Please select currency.");
      return false;
    }

    if (!formData.schoolType) {
      alert("Please select school type.");
      return false;
    }

    if (!formData.schoolCategory) {
      alert(
        "Please select school category."
      );
      return false;
    }

    if (!formData.affiliationBoard) {
      alert(
        "Please select affiliation board."
      );
      return false;
    }

    if (!formData.establishedYear) {
      alert(
        "Please select established year."
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // CREATE / UPDATE SCHOOL
  // =========================================================

  const handleSaveSchool = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      // =====================================================
      // VALIDATION
      // =====================================================

      if (!validateForm()) {
        return;
      }

      setSaving(true);

      // =====================================================
      // SCHOOL OBJECT
      // =====================================================

      const schoolData = {
        schoolName:
          formData.schoolName.trim(),

        schoolCode:
          formData.schoolCode.trim(),

        organizationName:
          formData.organizationName || null,

        addressLine1:
          formData.addressLine1.trim(),

        addressLine2:
          formData.addressLine2 || null,

        city:
          formData.city.trim(),

        state:
          formData.state,

        country:
          formData.country,

        pincode:
          formData.pincode.trim(),

        contactPerson:
          formData.contactPersonName.trim(),

        designation:
          formData.designation.trim(),

        email:
          formData.email.trim(),

        phoneNumber:
          formData.phoneNumber.trim(),

        alternatePhone:
          formData.alternatePhone || null,

        academicSessionStartMonth:
          formData.academicSessionStartMonth,

        academicSessionFormat:
          formData.academicSessionFormat,

        defaultLanguage:
          formData.defaultLanguage,

        currency:
          formData.currency,

        schoolType:
          formData.schoolType,

        schoolCategory:
          formData.schoolCategory,

        affiliationBoard:
          formData.affiliationBoard,

        establishedYear:
          formData.establishedYear,

        totalClasses:
          formData.totalClasses
            ? Number(formData.totalClasses)
            : null,

        totalStudents:
          formData.totalStudents
            ? Number(formData.totalStudents)
            : null,

        description:
          formData.description || null,

        active:
          Boolean(formData.status),

        allowParentLogin:
          Boolean(
            formData.allowParentLogin
          ),

        allowStudentLogin:
          Boolean(
            formData.allowStudentLogin
          ),

        timeZone:
          formData.timeZone,

        dateFormat:
          formData.dateFormat,
      };

      console.log(
        "School Data:",
        schoolData
      );

      // =====================================================
      // MULTIPART DATA
      // =====================================================

      const data = new FormData();

      data.append(
        "school",
        new Blob(
          [JSON.stringify(schoolData)],
          {
            type: "application/json",
          }
        )
      );

      // =====================================================
      // LOGO
      // =====================================================

      if (selectedFile) {
        data.append(
          "attachment",
          selectedFile
        );
      }

      console.log(
        "Selected Logo:",
        selectedFile
      );

      // =====================================================
      // API CALL
      // =====================================================

      let response;

      if (isEditMode) {
        // ===================================================
        // UPDATE
        // ===================================================

        response = await axios.put(
          `http://localhost:8080/api/school/update/${schoolId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // ===================================================
        // CREATE
        // ===================================================

        response = await axios.post(
          "http://localhost:8080/api/school/add",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(
        isEditMode
          ? "School Updated Successfully:"
          : "School Created Successfully:",
        response.data
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      alert(
        isEditMode
          ? "School updated successfully!"
          : "School created successfully!"
      );

      // School list par redirect
      navigate("/school-list");
    } catch (error) {
      console.error(
        isEditMode
          ? "Update School Error:"
          : "Create School Error:",
        error
      );

      console.error(
        "Backend Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          (isEditMode
            ? "Failed to update school."
            : "Failed to create school.")
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (isEditMode && loadingSchool) {
    return (
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <div className="mt-3 text-muted">
              Loading school details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="row shadow align-items-center p-3"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "5px",
          color: "black",
        }}
      >
        {/* LEFT */}

        <div className="col">
          <h6 className="mb-1">
            {isEditMode
              ? "Update School"
              : "Create New School"}
          </h6>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a
                  href="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <small>
                    Dashboard
                  </small>
                </a>
              </li>

              <li className="breadcrumb-item">
                <small>
                  Organization Management
                </small>
              </li>

              <li className="breadcrumb-item">
                <small>
                  School List
                </small>
              </li>

              <li className="breadcrumb-item active">
                <small>
                  {isEditMode
                    ? "Update School"
                    : "Create New School"}
                </small>
              </li>
            </ol>
          </nav>
        </div>

        {/* RIGHT */}

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              navigate("/school-list")
            }
          >
            <IoReturnDownBackOutline
              size={20}
            />

            {" "}Back to School List
          </button>
        </div>
      </div>

      {/* =====================================================
          BASIC INFORMATION + LOGO
      ====================================================== */}

      <div className="ms-2 me-2 mt-4 p-1">
        <div className="row g-3 align-items-stretch">

          {/* BASIC INFORMATION */}

          <div className="col-12 col-md-8 col-lg-8">
            <div className="card bg-white shadow rounded-3 p-2 h-100">

              <div className="card-header bg-white border-0">
                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">
                    <MdOutlineMedicalInformation
                      size={20}
                      className="text-white"
                    />
                  </span>

                  Basic Information
                </strong>
              </div>

              <div className="card-body">

                {/* ROW 1 */}

                <div className="row">

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        School Name{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="schoolName"
                      value={
                        formData.schoolName
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter school name"
                    />
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        School Code{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="schoolCode"
                      value={
                        formData.schoolCode
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter School Code"
                    />
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        Organization Name{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <select
                      name="organizationName"
                      value={
                        formData.organizationName
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >
                      <option value="">
                        Select Organization
                      </option>
                    </select>
                  </div>

                </div>

                {/* ROW 2 */}

                <div className="row mt-3">

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        Address Line 1{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="addressLine1"
                      value={
                        formData.addressLine1
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter address line 1"
                    />
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        Address Line 2
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="addressLine2"
                      value={
                        formData.addressLine2
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter address line 2"
                    />
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        City{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter city"
                    />
                  </div>

                </div>

                {/* ROW 3 */}

                <div className="row mt-3">

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        State{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <select
                      name="state"
                      value={
                        formData.state
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >
                      <option value="">
                        Select State
                      </option>

                      {indianStates.map(
                        (state) => (
                          <option
                            key={state}
                            value={state}
                          >
                            {state}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        Country
                      </h6>
                    </label>

                    <select
                      name="country"
                      value={
                        formData.country
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >
                      <option value="">
                        Select Country
                      </option>

                      {countries.map(
                        (country) => (
                          <option
                            key={country}
                            value={country}
                          >
                            {country}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">
                      <h6>
                        Pincode{" "}
                        <span className="text-danger">
                          *
                        </span>
                      </h6>
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={
                        formData.pincode
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter pincode"
                    />
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* SCHOOL LOGO */}

          <div className="col-12 col-md-4 col-lg-4">

            <div className="card bg-white shadow rounded-3 p-3 h-100">

              <div className="card-header bg-white border-0">

                <strong>
                  School Logo
                </strong>

                <p className="mt-2 text-muted">
                  {isEditMode
                    ? "Update school logo (optional)"
                    : "Upload school logo (JPG, PNG, SVG - Max 2MB)"}
                </p>
              </div>

              <div className="card-body">

                {/* EXISTING LOGO */}

                {existingLogo &&
                  !selectedFile && (
                    <div className="text-center mb-3">

                      <img
                        src={existingLogo}
                        alt="School Logo"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          border: "1px solid #dee2e6",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      />

                      <div className="small text-muted mt-2">
                        Current Logo
                      </div>

                    </div>
                  )}

                {/* UPLOAD */}

                <div className="custom-upload-box">

                  <div className="upload-icon">
                    <BiSolidSchool />
                  </div>

                  <div className="fw-semibold">

                    <span className="text-primary">
                      Click to upload{" "}
                    </span>

                    <span className="text-muted small">
                      or drag and drop
                    </span>

                  </div>

                  <div className="text-muted small">
                    Recommended size:
                    {" "}200 × 200 px
                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    className="custom-file-input"
                    onChange={
                      handleFileChange
                    }
                  />

                </div>

                {selectedFile && (
                  <div className="mt-2 small text-success">
                    ✓ {selectedFile.name}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          CONTACT + ACADEMIC
      ====================================================== */}

      <div className="ms-2 me-2 mt-2 p-1">

        <div className="row g-3 align-items-stretch">

          {/* CONTACT */}

          <div className="col-12 col-md-7 col-lg-7">

            <div className="card bg-white shadow rounded-3 p-2 h-100">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">

                    <FaPhone
                      size={20}
                      className="text-white"
                    />

                  </span>

                  Contact Information

                </strong>

              </div>

              <div className="card-body">

                <div className="row">

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Contact Person Name{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <input
                      type="text"
                      name="contactPersonName"
                      value={
                        formData.contactPersonName
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter contact person name"
                    />

                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Designation{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <input
                      type="text"
                      name="designation"
                      value={
                        formData.designation
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter Designation"
                    />

                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Email{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter Email"
                    />

                  </div>

                </div>

                <div className="row mt-3">

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Phone Number{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      value={
                        formData.phoneNumber
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter phone number"
                    />

                  </div>

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Alternate Phone
                      </h6>

                    </label>

                    <input
                      type="text"
                      name="alternatePhone"
                      value={
                        formData.alternatePhone
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter alternate phone"
                    />

                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ACADEMIC */}

          <div className="col-12 col-md-5 col-lg-5">

            <div className="card bg-white shadow rounded-3 p-3 h-100">

              <div className="card-header bg-white border-0">

                <span className="p-1 rounded-5 bg-primary me-2">

                  <HiAcademicCap
                    size={20}
                    className="text-white"
                  />

                </span>

                <strong>
                  Academic Information
                </strong>

              </div>

              <div className="card-body">

                <div className="row">

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Academic Sess Start Month{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="academicSessionStartMonth"
                      value={
                        formData.academicSessionStartMonth
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select start month
                      </option>

                      <option value="JANUARY">
                        January
                      </option>

                      <option value="APRIL">
                        April
                      </option>

                      <option value="JUNE">
                        June
                      </option>

                      <option value="JULY">
                        July
                      </option>

                    </select>

                  </div>

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Academic Session Format{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="academicSessionFormat"
                      value={
                        formData.academicSessionFormat
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select format
                      </option>

                      <option value="YYYY-YYYY">
                        2026-2027
                      </option>

                      <option value="YYYY-YY">
                        2026-27
                      </option>

                    </select>

                  </div>

                </div>

                <div className="row mt-3">

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Default Language{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="defaultLanguage"
                      value={
                        formData.defaultLanguage
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select language
                      </option>

                      <option value="ENGLISH">
                        English
                      </option>

                      <option value="HINDI">
                        Hindi
                      </option>

                    </select>

                  </div>

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Currency{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="currency"
                      value={
                        formData.currency
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select currency
                      </option>

                      <option value="INR">
                        Indian Rupee (₹)
                      </option>

                      <option value="USD">
                        US Dollar ($)
                      </option>

                    </select>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          OTHER INFORMATION + SETTINGS
      ====================================================== */}

      <div className="ms-2 me-2 mt-2 p-1">

        <div className="row g-3 align-items-stretch">

          {/* OTHER INFORMATION */}

          <div className="col-12 col-md-7 col-lg-7">

            <div className="card bg-white shadow rounded-3 p-2 h-100">

              <div className="card-header bg-white border-0">

                <strong>

                  <span className="p-1 rounded-5 bg-primary me-2">

                    <MdErrorOutline
                      size={20}
                      className="text-white"
                    />

                  </span>

                  Other Information

                </strong>

              </div>

              <div className="card-body">

                <div className="row">

                  {/* SCHOOL TYPE */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        School Type{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="schoolType"
                      value={
                        formData.schoolType
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select Type
                      </option>

                      {schoolType.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* CATEGORY */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        School Category{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="schoolCategory"
                      value={
                        formData.schoolCategory
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select Category
                      </option>

                      {schoolCategory.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* BOARD */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Affiliation Board{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="affiliationBoard"
                      value={
                        formData.affiliationBoard
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select Affiliation
                      </option>

                      {affiliationBoard.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* ROW 2 */}

                <div className="row mt-3">

                  {/* YEAR */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Established Year{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <select
                      name="establishedYear"
                      value={
                        formData.establishedYear
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="">
                        Select Established Year
                      </option>

                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() -
                            1980 +
                            1,
                        },
                        (_, i) =>
                          new Date().getFullYear() -
                          i
                      ).map((year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}

                    </select>

                  </div>

                  {/* TOTAL CLASSES */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Total Classes (approx)
                      </h6>

                    </label>

                    <input
                      type="number"
                      name="totalClasses"
                      value={
                        formData.totalClasses
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter total classes"
                    />

                  </div>

                  {/* TOTAL STUDENTS */}

                  <div className="col-12 col-md-4">

                    <label className="form-label">

                      <h6>
                        Total Students (approx)
                      </h6>

                    </label>

                    <input
                      type="number"
                      name="totalStudents"
                      value={
                        formData.totalStudents
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter total students"
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="row mt-3">

                  <div className="col-12">

                    <label className="form-label">

                      <h6>
                        Description
                      </h6>

                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                      className="form-control"
                      placeholder="Enter school description"
                      rows="4"
                    />

                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* SETTINGS */}

          <div className="col-12 col-md-5 col-lg-5">

            <div className="card bg-white shadow rounded-3 p-3 h-100">

              <div className="card-header bg-white border-0">

                <span className="p-1 rounded-5 bg-primary me-2">

                  <IoMdSettings
                    size={20}
                    className="text-white"
                  />

                </span>

                <strong>
                  Status & Settings
                </strong>

              </div>

              <div className="card-body">

                {/* STATUS */}

                <div className="row">

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Status{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <div className="d-flex align-items-center gap-2">

                      <div className="form-check form-switch mb-0">

                        <input
                          className="form-check-input green-switch"
                          type="checkbox"
                          role="switch"
                          id="schoolStatus"
                          name="status"
                          checked={
                            formData.status
                          }
                          onChange={
                            handleSwitchChange
                          }
                        />

                      </div>

                      <label
                        htmlFor="schoolStatus"
                        className="mb-0"
                      >
                        {formData.status
                          ? "Active"
                          : "Inactive"}
                      </label>

                    </div>

                  </div>

                  {/* PARENT */}

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Allow Parent Login{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <div className="d-flex align-items-center gap-2">

                      <div className="form-check form-switch mb-0">

                        <input
                          className="form-check-input green-switch"
                          type="checkbox"
                          role="switch"
                          id="allowParent"
                          name="allowParentLogin"
                          checked={
                            formData.allowParentLogin
                          }
                          onChange={
                            handleSwitchChange
                          }
                        />

                      </div>

                      <label
                        htmlFor="allowParent"
                        className="mb-0"
                      >
                        {formData.allowParentLogin
                          ? "Yes"
                          : "No"}
                      </label>

                    </div>

                  </div>

                </div>

                {/* STUDENT */}

                <div className="row mt-3">

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      <h6>
                        Allow Student Login{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </h6>

                    </label>

                    <div className="d-flex align-items-center gap-2">

                      <div className="form-check form-switch mb-0">

                        <input
                          className="form-check-input green-switch"
                          type="checkbox"
                          role="switch"
                          id="allowStudent"
                          name="allowStudentLogin"
                          checked={
                            formData.allowStudentLogin
                          }
                          onChange={
                            handleSwitchChange
                          }
                        />

                      </div>

                      <label
                        htmlFor="allowStudent"
                        className="mb-0"
                      >
                        {formData.allowStudentLogin
                          ? "Yes"
                          : "No"}
                      </label>

                    </div>

                  </div>

                </div>

                {/* TIMEZONE + DATE */}

                <div className="row mt-3">

                  <div className="col-12 col-md-6">

                    <label className="form-label">

                      Time Zone{" "}

                      <span className="text-danger">
                        *
                      </span>

                    </label>

                    <select
                      name="timeZone"
                      value={
                        formData.timeZone
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="Asia/Kolkata">
                        India Standard Time (IST) — UTC +05:30
                      </option>

                      <option value="Asia/Dubai">
                        Gulf Standard Time (GST) — UTC +04:00
                      </option>

                      <option value="Asia/Dhaka">
                        Bangladesh Standard Time — UTC +06:00
                      </option>

                      <option value="Asia/Kathmandu">
                        Nepal Time — UTC +05:45
                      </option>

                      <option value="Asia/Singapore">
                        Singapore Time — UTC +08:00
                      </option>

                      <option value="Asia/Tokyo">
                        Japan Standard Time — UTC +09:00
                      </option>

                    </select>

                  </div>

                  <div className="col-12 col-md-6">

                    <label className="form-label">
                      Date Format
                    </label>

                    <select
                      name="dateFormat"
                      value={
                        formData.dateFormat
                      }
                      onChange={
                        handleChange
                      }
                      className="form-select"
                    >

                      <option value="dd-MM-yyyy">
                        DD-MM-YYYY (23-08-2026)
                      </option>

                      <option value="dd/MM/yyyy">
                        DD/MM/YYYY (23/08/2026)
                      </option>

                      <option value="yyyy-MM-dd">
                        YYYY-MM-DD (2026-08-23)
                      </option>

                      <option value="MM/dd/yyyy">
                        MM/DD/YYYY (08/23/2026)
                      </option>

                    </select>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="row mt-3 mx-2 mb-4">

        <div className="col-12 d-flex gap-3 justify-content-end">

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleReset}
            disabled={saving}
          >
            Reset
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveSchool}
            disabled={
              saving || loadingSchool
            }
          >

            {saving
              ? "Saving..."
              : isEditMode
                ? "Update School"
                : "Create School"}

          </button>

        </div>
      </div>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style>
        {`
          .custom-upload-box {
            position: relative;
            border: 2px dashed #ced4da;
            border-radius: 10px;
            min-height: 170px;
            padding: 25px;
            text-align: center;
            background-color: #f8f9fa;
            cursor: pointer;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            transition: all 0.2s ease;
          }

          .custom-upload-box:hover {
            border-color: #0d6efd;
            background-color: #f1f6ff;
          }

          .upload-icon {
            font-size: 32px;
            margin-bottom: 8px;
          }

          .custom-file-input {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }

          .green-switch:checked {
            background-color: #198754;
            border-color: #198754;
          }

          .green-switch {
            width: 35px !important;
            height: 20px !important;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default SchoolAddForm;