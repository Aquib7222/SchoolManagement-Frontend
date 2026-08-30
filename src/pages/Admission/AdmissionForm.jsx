// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axiosInstance";

// const AdmissionForm = () => {
//   const currentYear = new Date().getFullYear();
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const navigate = useNavigate();

//   const generateAdmissionNumber = () => {
//     const stored = JSON.parse(localStorage.getItem("StudentFormData")) || [];

//     // Extract admission numbers like ADM001 -> 001
//     const nums = stored
//       .map((s) => s.admissionNumber?.replace("ADM", ""))
//       .map((n) => parseInt(n))
//       .filter((n) => !isNaN(n));

//     // Get the next number
//     const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 1;

//     // Format as ADM001, ADM002...
//     return `ADM-${currentYear}-${day}-${String(nextNum).padStart(4, "0")}`;
//   };
//   const [formData, setFormData] = useState({
//     id: uuidv4(),
//     academicYear: "",
//     academicType: "",
//     invoice: "",
//     today: "",
//     firstName: "",
//     lastName: "",
//     middleName: "",
//     dob: "",
//     gender: "",
//     aadharNo: "",
//     nationality: "",
//     motherTongue: "",
//     religion: "",
//     category: "",
//     caste: "",
//     bloodGroup: "",
//     transportRequired: "",
//     class: "",
//     age: "",
//     alternateNo: "",
//     email: "",
//     feeCategory: "",
//     feeBatch: "",
//     preferredNo: "",
//     siblingAdm: "",
//     siblingPresent: "",
//     siblingClass: "",
//     fatherName: "",
//     fatherAadhar: "",
//     fatherEducation: "",
//     fatherEducationType: "",
//     fatherEmail: "",
//     // fatherImage:"",
//     fatherJobType: "",
//     fatherLandline: "",
//     fatherMobile: "",
//     fatherOccupation: "",
//     fatherOrganization: "",
//     fatherOrganizationAddress: "",
//     fatherSpecialisation: "",
//     motherName: "",
//     motherAadhar: "",
//     motherEducation: "",
//     motherEducationType: "",
//     motherEmail: "",
//     // motherImage:"",
//     motherJobType: "",
//     motherLandline: "",
//     motherMobile: "",
//     motherOccupation: "",
//     motherOrganization: "",
//     motherOrganizationAddress: "",
//     motherSpecialisation: "",
//     houseNo: "",
//     street: "",
//     area: "",
//     town: "",
//     zip: "",
//     state: "",
//     city: "",
//     country: "",
//     // studentImage:"",
//     // guardianImage:"",
//     admissionNumber: generateAdmissionNumber(),
//   });

//   const [siblings, setSiblings] = useState([
//     {
//       siblingPresent: false,
//       siblingAdm: "",
//       siblingName: "",
//       siblingClass: "",
//     },
//   ]);

//   const handleAddMoreSiblings = () => {
//     setSiblings([
//       ...siblings,
//       {
//         siblingAdm: "",
//         siblingName: "",
//         siblingClass: "",
//       },
//     ]);
//   };
//   const batches = [
//     "Common/Private",
//     "Common/Upto 5Km",
//     "Common/Upto 10Km",
//     "Common/Upto 10km Staff Child",
//   ];

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setFormData((prev) => ({
//           ...prev,
//           [name]: base64String,
//         }));
//         // Optional: save to localStorage
//         localStorage.setItem(name, base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData((prev) => ({ ...prev, [name]: value }));
//   //   const updatedSiblings = [...siblings];
//   //   updatedSiblings[name] = type === "checkbox" ? checked : value;
//   //   setSiblings(updatedSiblings);
//   // };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   // Get existing data or initialize with an empty array
//   //   const existingData =
//   //     JSON.parse(localStorage.getItem("StudentFormData")) || [];

//   //   // Append the new form data
//   //   const updatedData = [...existingData, formData];

//   //   console.log("admission Create", updatedData);
//   //   // Store back in localStorage
//   //   localStorage.setItem("StudentFormData", JSON.stringify(updatedData));

//   //   // Reset form fields
//   //   setFormData({
//   //     academicYear: "",
//   //     academicType: "",
//   //     invoice: "",
//   //     today: "",
//   //     firstName: "",
//   //     lastName: "",
//   //     middleName: "",
//   //     dob: "",
//   //     gender: "",
//   //     aadharNo: "",
//   //     nationality: "",
//   //     motherTongue: "",
//   //     religion: "",
//   //     category: "",
//   //     caste: "",
//   //     bloodGroup: "",
//   //     transportRequired: "",
//   //     class: "",
//   //     age: "",
//   //     alternateNo: "",
//   //     email: "",
//   //     feeCategory: "",
//   //     preferredNo: "",
//   //     siblingAdm: "",
//   //     siblingPresent: "",
//   //     siblingClass: "",
//   //     fatherName: "",
//   //     fatherAadhar: "",
//   //     fatherEducation: "",
//   //     fatherEducationType: "",
//   //     fatherEmail: "",
//   //     feeBatch: "",
//   //     // fatherImage:"",
//   //     fatherJobType: "",
//   //     fatherLandline: "",
//   //     fatherMobile: "",
//   //     fatherOccupation: "",
//   //     fatherOrganization: "",
//   //     fatherOrganizationAddress: "",
//   //     fatherSpecialisation: "",
//   //     motherName: "",
//   //     motherAadhar: "",
//   //     motherEducation: "",
//   //     motherEducationType: "",
//   //     motherEmail: "",
//   //     // motherImage:"",
//   //     motherJobType: "",
//   //     motherLandline: "",
//   //     motherMobile: "",
//   //     motherOccupation: "",
//   //     motherOrganization: "",
//   //     motherOrganizationAddress: "",
//   //     motherSpecialisation: "",
//   //     houseNo: "",
//   //     street: "",
//   //     area: "",
//   //     town: "",
//   //     zip: "",
//   //     state: "",
//   //     city: "",
//   //     country: "",
//   //   });
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,

//         // backend mapping
//         studentClass: formData.class,
//         preferredNo: formData.preferredNo,
//       };

//       const token = localStorage.getItem("token"); // ✅ must exist

//       const response = await axios.post(
//         "/api/admissions",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       alert("Admission Applied 🎉");
//       console.log("Saved:", response.data);

//       // reset form
//       setFormData({
//         academicYear: "",
//         academicType: "",
//         invoice: "",
//         today: "",
//         firstName: "",
//         lastName: "",
//         middleName: "",
//         dob: "",
//         gender: "",
//         aadharNo: "",
//         nationality: "",
//         motherTongue: "",
//         religion: "",
//         category: "",
//         caste: "",
//         bloodGroup: "",
//         transportRequired: "",
//         class: "",
//         age: "",
//         alternateNo: "",
//         email: "",
//         feeCategory: "",
//         feeBatch: "",
//         preferredNo: "",
//         fatherName: "",
//         fatherMobile: "",
//         motherName: "",
//         houseNo: "",
//         street: "",
//         area: "",
//         town: "",
//         zip: "",
//         state: "",
//         city: "",
//         country: "",
//       });
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Admission failed ❌");
//     }
//     navigate(-1);
//   };

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
//           <strong>Add New Admission</strong>
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
//                 Add New Admission
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div
//           className=" mt-4 shadow rounded ms-2 p-4 mb-3 me-2"
//           style={{ backgroundColor: "white" }}
//         >
//           <div className="row d-flex justify-content-center">
//             <div className="col-md-4 ">
//               <label>Joining Academic Year</label>
//               <select
//                 name="academicYear"
//                 value={formData.academicYear}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="2026-27">2026-2027</option>
//                 <option value="2025-26">2025-2026</option>
//                 <option value="2024-23">2024-2023</option>
//                 <option value="2023-22">2023-2022</option>
//                 <option value="2022-21">2022-2021</option>
//                 <option value="2021-20">2021-2020</option>
//               </select>
//             </div>
//           </div>
//           {/* second row */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Enter Date</label>
//               <input
//                 type="date"
//                 name="today"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.today}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Invoice No</label>
//               <input
//                 type="text"
//                 name="invoice"
//                 className="w-100 p-2 rounded"
//                 value={formData.invoice}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Admission Type</label>
//               <select
//                 name="academicType"
//                 value={formData.academicType}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="newAdmission">New Admission</option>
//               </select>
//             </div>
//           </div>
//           {/* third row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Middle Name</label>
//               <input
//                 type="text"
//                 name="middleName"
//                 className="w-100 p-2 rounded"
//                 value={formData.middleName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 className="w-100 p-2 rounded"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* fourth row */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Gender</label>
//               <select
//                 name="gender"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="NA">Not Applicable</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Date Of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.dob}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Adhar Card No</label>
//               <input
//                 type="text"
//                 name="aadharNo"
//                 className="w-100 p-2 rounded"
//                 value={formData.aadharNo}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* fifth row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Nationality</label>
//               <input
//                 type="text"
//                 name="nationality"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.nationality}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Mother Tongue</label>
//               <input
//                 type="text"
//                 className="w-100 p-2 rounded"
//                 name="motherTongue"
//                 value={formData.motherTongue}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Religion</label>
//               <input
//                 type="text"
//                 name="religion"
//                 className="w-100 p-2 rounded"
//                 value={formData.religion}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* sixth row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Category</label>
//               <select
//                 name="category"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.category}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="obc">OBC</option>
//                 <option value="general">General</option>
//                 <option value="ebc">EBC</option>
//                 <option value="sc">SC</option>
//                 <option value="st">ST</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Caste</label>

//               <input
//                 type="text"
//                 name="caste"
//                 className="w-100 p-2 rounded"
//                 value={formData.caste}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Blood Group</label>
//               <select
//                 name="bloodGroup"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.bloodGroup}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//               </select>
//             </div>
//           </div>

//           {/* seventh row */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Transport Required</label>
//               {/* <select name="transportRequired" value={formData.transportRequired} id="" className="w-100 p-2 rounded">
//                 <option value="">Select</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select> */}
//               <input
//                 type="checkbox"
//                 name="transportRequired"
//                 checked={formData.transportRequired === "yes"}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     transportRequired: e.target.checked ? "yes" : "no",
//                   })
//                 }
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Class to which admission is sought</label>
//               <select
//                 name="class"
//                 value={formData.class}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="NURSERY">Nursery</option>
//                 <option value="LKG">LKG</option>
//                 <option value="UKG">UKG</option>
//                 <option value="I">I</option>
//                 <option value="II">II</option>
//                 <option value="III">III</option>
//                 <option value="IV">IV</option>
//                 <option value="V">V</option>
//                 <option value="VI">VI</option>
//                 <option value="VII">VII</option>
//                 <option value="VIII">VIII</option>
//                 <option value="IX">IX</option>
//                 <option value="X">X</option>
//                 <option value="XI">XI</option>
//                 <option value="XII">XII</option>
//               </select>
//             </div>

//             <div className="col-md-4 ">
//               <label>Age as on 1st June, 2025</label>
//               <input
//                 type="text"
//                 name="age"
//                 className="w-100 p-2 rounded"
//                 value={formData.age}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* eighth row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Email For Correspondence</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Preferred Mobile No. for SMS: </label>
//               <input
//                 type="text"
//                 name="preferredNo"
//                 value={formData.preferredNo}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Alternate Mobile No. for SMS: </label>
//               <input
//                 type="text"
//                 name="alternateNo"
//                 value={formData.alternateNo}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* ninth row  */}

//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Fee Category</label>
//               <select
//                 name="feeCategory"
//                 value={formData.feeCategory}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="General">General</option>
//                 <option value="Concession">Concession</option>
//                 <option value="Ex-Student">Ex-Student</option>
//                 <option value="Staff Child">Staff Child</option>
//               </select>
//             </div>

//             {formData.feeCategory && (
//               <div className="col-md-4">
//                 <label>
//                   <h6>Fee Batch:</h6>
//                 </label>
//                 <select
//                   name="feeBatch"
//                   value={formData.feeBatch}
//                   onChange={handleChange}
//                   className="w-100 rounded p-2"
//                 >
//                   <option value="">Select Batch</option>
//                   {batches.map((batch) => (
//                     <option key={batch} value={batch}>
//                       {batch}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Conditionally show Fee Batch */}

//           {/* 10th row sibling details  */}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Sibling Detail</h5>
//           </div>

//           {/* 11th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Sibling In School</label>
//               <input
//                 type="checkbox"
//                 name="siblingPresent"
//                 id=""
//                 className="w-100 p-2 rounded"
//                 value={formData.siblingPresent}
//                 onChange={handleChange}
//                 checked={siblings.siblingPresent}
//               />
//             </div>
//           </div>

//           {/* 12th row  */}
//           <div className="row mt-2">
//             <div className="col-md-3 ">
//               <label>Sibling Admission No</label>
//               <input
//                 type="text"
//                 name="siblingAdm"
//                 value={formData.siblingAdm}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//                 disabled={!siblings.siblingPresent}
//               />
//             </div>
//             <div className="col-md-3 ">
//               <label>Sibling Name</label>
//               <input
//                 type="text"
//                 name="siblingName"
//                 value={formData.siblingName}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//                 disabled={!siblings.siblingPresent}
//               />
//             </div>

//             <div className="col-md-3 ">
//               <label>Sibling Class</label>
//               <input
//                 type="text"
//                 name="siblingClass"
//                 value={formData.siblingClass}
//                 className="w-100 p-2 rounded"
//                 disabled={!siblings.siblingPresent}
//               />
//             </div>
//             <div className="col-md-3">
//               <button
//                 className="w-50 mt-4 p-2 rounded btn btn-info"
//                 onClick={handleAddMoreSiblings}
//               >
//                 + Add More
//               </button>
//             </div>
//           </div>

//           {/* 14th row  Corresponse Address*/}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Correspondence Address</h5>
//           </div>

//           {/* 15th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>House No</label>
//               <input
//                 type="text"
//                 name="houseNo"
//                 value={formData.houseNo}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Street</label>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Post/Zip Code</label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Area</label>
//               <input
//                 type="text"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Town</label>
//               <input
//                 type="text"
//                 name="town"
//                 value={formData.town}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* 14th row Permanent Address */}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Permanent Address</h5>
//           </div>

//           {/* 15th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>As Above ?</label>
//               <input
//                 type="checkbox"
//                 name=""
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>House No</label>
//               <input
//                 type="text"
//                 name="houseNo"
//                 value={formData.houseNo}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Street</label>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Post/Zip Code</label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Area</label>
//               <input
//                 type="text"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Town</label>
//               <input
//                 type="text"
//                 name="town"
//                 value={formData.town}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 id=""
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* 14th row Father details */}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Father Details</h5>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Father Name</label>
//               <input
//                 type="text"
//                 name="fatherName"
//                 value={formData.fatherName}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Landline</label>
//               <input
//                 type="text"
//                 name="fatherLandline"
//                 value={formData.fatherLandline}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Mobile</label>
//               <input
//                 type="text"
//                 name="fatherMobile"
//                 value={formData.fatherMobile}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Email</label>
//               <input
//                 type="text"
//                 name="fatherEmail"
//                 value={formData.fatherEmail}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Father Adhar Card No</label>
//               <input
//                 type="text"
//                 name="fatherAadhar"
//                 value={formData.fatherAadhar}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Education</label>
//               <input
//                 type="text"
//                 name="fatherEducation"
//                 value={formData.fatherEducation}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Education Type</label>
//               <select
//                 name="fatherEducationType"
//                 value={formData.fatherEducationType}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="business">Business</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Specialisation</label>
//               <input
//                 type="text"
//                 name="fatherSpecialisation"
//                 value={formData.fatherSpecialisation}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Job Type</label>
//               <input
//                 type="text"
//                 name="fatherJobType"
//                 value={formData.fatherJobType}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Occupation</label>
//               <select
//                 name="fatherOccupation"
//                 value={formData.fatherOccupation}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="engineer">Engineer</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="Businessman">Businessman</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="governmentJob">Government Job</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Organization Name</label>
//               <input
//                 type="text"
//                 name="fatherOrganization"
//                 value={formData.fatherOrganization}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Organization Address</label>
//               <input
//                 type="text"
//                 name="fatherOrganizationAddress"
//                 value={formData.fatherOrganizationAddress}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* 14th row Father details */}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Mother Details</h5>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Mother Name</label>
//               <input
//                 type="text"
//                 name="motherName"
//                 value={formData.motherName}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Landline</label>
//               <input
//                 type="text"
//                 name="motherLandline"
//                 value={formData.motherLandline}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Mobile</label>
//               <input
//                 type="text"
//                 name="motherMobile"
//                 value={formData.motherMobile}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Email</label>
//               <input
//                 type="text"
//                 name="motherEmail"
//                 value={formData.motherEmail}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4 ">
//               <label>Mother Adhar Card No</label>
//               <input
//                 type="text"
//                 name="motherAadhar"
//                 value={formData.motherAadhar}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Education</label>
//               <input
//                 type="text"
//                 name="motherEducation"
//                 value={formData.motherEducation}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Education Type</label>
//               <select
//                 name="motherEducationType"
//                 value={formData.motherEducationType}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="business">Business</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Specialisation</label>
//               <input
//                 type="text"
//                 name="motherSpecialisation"
//                 value={formData.motherSpecialisation}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Job Type</label>
//               <input
//                 type="text"
//                 name="motherJobType"
//                 value={formData.motherJobType}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Occupation</label>
//               <select
//                 name="motherOccupation"
//                 value={formData.motherOccupation}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="engineer">Engineer</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="businessman">Businessman</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="governamentJob">Government Job</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Organization Name</label>
//               <input
//                 type="text"
//                 name="motherOrganization"
//                 value={formData.motherOrganization}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 ">
//               <label>Organization Address</label>
//               <input
//                 type="text"
//                 name="motherOrganizationAddress"
//                 value={formData.motherOrganizationAddress}
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* 14th row Father details */}
//           <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Guardian Details</h5>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Name</label>
//               <input type="text" name="" id="" className="w-100 p-2 rounded" />
//             </div>
//             <div className="col-md-4 ">
//               <label>Landline</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>

//             <div className="col-md-4 ">
//               <label>Mobile</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Email</label>
//               <input type="text" name="" id="" className="w-100 p-2 rounded" />
//             </div>
//             <div className="col-md-4 ">
//               <label>Guardian Adhar Card No</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>

//             <div className="col-md-4 ">
//               <label>Education</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Education Type</label>
//               <select name="" id="" className="w-100 p-2 rounded">
//                 <option value="">Select</option>
//                 <option value="">Private</option>
//                 <option value="">Public</option>
//                 <option value="">Business</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Specialisation</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>

//             <div className="col-md-4 ">
//               <label>Job Type</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>
//           </div>
//           {/* 13th row  */}
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>Occupation</label>
//               <select name="" id="" className="w-100 p-2 rounded">
//                 <option value="">Select</option>
//                 <option value="">Engineer</option>
//                 <option value="">Doctor</option>
//                 <option value="">Businessman</option>
//                 <option value="">Teacher</option>
//                 <option value="">Government Job</option>
//                 <option value="">Other</option>
//               </select>
//             </div>
//             <div className="col-md-4 ">
//               <label>Organization Name</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>

//             <div className="col-md-4 ">
//               <label>Organization Address</label>
//               <input type="text" className="w-100 p-2 rounded" />
//             </div>
//           </div>

//           {/* 14th row Father details */}
//           {/* <div
//             className="row mt-3 text-center mx-1 text-white"
//             style={{ backgroundColor: "rgb(30, 58, 138)" }}
//           >
//             <h5>Photographs</h5>
//           </div>
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>
//                 <strong>Student</strong>
//               </label>
//               <input
//                 type="file"
//                 name="studentImage"
//                 id=""
//                 // value={formData.studentImage}
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-100 p-2 rounded border"
//               />
//             </div>
//           </div>
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>
//                 <strong>Father</strong>
//               </label>
//               <input
//                 type="file"
//                 name="fatherImage"
//                 id=""
//                 // value={formData.fatherImage}
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-100 p-2 rounded border"
//               />
//             </div>
//           </div>
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>
//                 <strong>Mother</strong>
//               </label>
//               <input
//                 type="file"
//                 name="motherImage"
//                 id=""
//                 // value={formData.motherImage}
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-100 p-2 rounded border"
//               />
//             </div>
//           </div>
//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <label>
//                 <strong>Guardian</strong>
//               </label>
//               <input
//                 type="file"
//                 name="guardianImage"
                
//                 id=""
//                 // value={formData.guardianImage}
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-100 p-2 rounded border"
//               />
//             </div>
//           </div> */}

//           <div className="row mt-2">
//             <div className="col-md-4 ">
//               <button
//                 className="w-50 p-2 rounded border text-white"
//                 style={{ backgroundColor: "rgb(30, 58, 138)" }}
//                 type="submit"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default AdmissionForm;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axiosInstance";

// const getInitialFormData = () => ({
//   academicYear: "",
//   academicType: "",
//   invoice: "",
//   today: new Date().toISOString().split("T")[0],

//   firstName: "",
//   middleName: "",
//   lastName: "",
//   dob: "",
//   gender: "",
//   aadharNo: "",
//   nationality: "",
//   motherTongue: "",
//   religion: "",
//   category: "",
//   caste: "",
//   bloodGroup: "",
//   transportRequired: "no",

//   class: "",
//   age: "",

//   email: "",
//   alternateNo: "",
//   preferredNo: "",

//   feeCategory: "",
//   feeBatch: "",

//   fatherName: "",
//   fatherAadhar: "",
//   fatherEducation: "",
//   fatherEducationType: "",
//   fatherEmail: "",
//   fatherJobType: "",
//   fatherLandline: "",
//   fatherMobile: "",
//   fatherOccupation: "",
//   fatherOrganization: "",
//   fatherOrganizationAddress: "",
//   fatherSpecialisation: "",

//   motherName: "",
//   motherAadhar: "",
//   motherEducation: "",
//   motherEducationType: "",
//   motherEmail: "",
//   motherJobType: "",
//   motherLandline: "",
//   motherMobile: "",
//   motherOccupation: "",
//   motherOrganization: "",
//   motherOrganizationAddress: "",
//   motherSpecialisation: "",

//   guardianName: "",
//   guardianAadhar: "",
//   guardianEducation: "",
//   guardianEducationType: "",
//   guardianEmail: "",
//   guardianJobType: "",
//   guardianLandline: "",
//   guardianMobile: "",
//   guardianOccupation: "",
//   guardianOrganization: "",
//   guardianOrganizationAddress: "",
//   guardianSpecialisation: "",

//   /* Correspondence Address */
//   houseNo: "",
//   street: "",
//   area: "",
//   town: "",
//   zip: "",
//   state: "",
//   city: "",
//   country: "",

//   /* Permanent Address */
//   permanentHouseNo: "",
//   permanentStreet: "",
//   permanentArea: "",
//   permanentTown: "",
//   permanentZip: "",
//   permanentState: "",
//   permanentCity: "",
//   permanentCountry: "",
// });

// const AdmissionForm = () => {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");

//   const schoolId = user?.schoolId;

//   const [formData, setFormData] = useState(getInitialFormData());

//   const [siblings, setSiblings] = useState([
//     {
//       siblingPresent: false,
//       siblingAdm: "",
//       siblingName: "",
//       siblingClass: "",
//     },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [sameAddress, setSameAddress] = useState(false);

//   const batches = [
//     "Common/Private",
//     "Common/Upto 5Km",
//     "Common/Upto 10Km",
//     "Common/Upto 10km Staff Child",
//   ];

//   const standards = [
//     { value: "NURSERY", label: "Nursery" },
//     { value: "LKG", label: "LKG" },
//     { value: "UKG", label: "UKG" },
//     { value: "I", label: "I" },
//     { value: "II", label: "II" },
//     { value: "III", label: "III" },
//     { value: "IV", label: "IV" },
//     { value: "V", label: "V" },
//     { value: "VI", label: "VI" },
//     { value: "VII", label: "VII" },
//     { value: "VIII", label: "VIII" },
//     { value: "IX", label: "IX" },
//     { value: "X", label: "X" },
//     { value: "XI", label: "XI" },
//     { value: "XII", label: "XII" },
//   ];

//   /* =========================
//      HANDLE FORM CHANGE
//   ========================= */

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
//     }));
//   };

//   /* =========================
//      SIBLING HANDLERS
//   ========================= */

//   const handleSiblingChange = (index, e) => {
//     const { name, value, type, checked } = e.target;

//     setSiblings((prev) =>
//       prev.map((sibling, i) =>
//         i === index
//           ? {
//               ...sibling,
//               [name]: type === "checkbox" ? checked : value,
//             }
//           : sibling,
//       ),
//     );
//   };

//   const handleAddMoreSiblings = (e) => {
//     e.preventDefault();

//     setSiblings((prev) => [
//       ...prev,
//       {
//         siblingPresent: false,
//         siblingAdm: "",
//         siblingName: "",
//         siblingClass: "",
//       },
//     ]);
//   };

//   const handleRemoveSibling = (index) => {
//     setSiblings((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* =========================
//      SAME ADDRESS
//   ========================= */

//   useEffect(() => {
//     if (!sameAddress) return;

//     setFormData((prev) => ({
//       ...prev,
//       permanentHouseNo: prev.houseNo,
//       permanentStreet: prev.street,
//       permanentArea: prev.area,
//       permanentTown: prev.town,
//       permanentZip: prev.zip,
//       permanentState: prev.state,
//       permanentCity: prev.city,
//       permanentCountry: prev.country,
//     }));
//   }, [
//     sameAddress,
//     formData.houseNo,
//     formData.street,
//     formData.area,
//     formData.town,
//     formData.zip,
//     formData.state,
//     formData.city,
//     formData.country,
//   ]);

//   const handleSameAddress = (e) => {
//     const checked = e.target.checked;

//     setSameAddress(checked);

//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         permanentHouseNo: prev.houseNo,
//         permanentStreet: prev.street,
//         permanentArea: prev.area,
//         permanentTown: prev.town,
//         permanentZip: prev.zip,
//         permanentState: prev.state,
//         permanentCity: prev.city,
//         permanentCountry: prev.country,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         permanentHouseNo: "",
//         permanentStreet: "",
//         permanentArea: "",
//         permanentTown: "",
//         permanentZip: "",
//         permanentState: "",
//         permanentCity: "",
//         permanentCountry: "",
//       }));
//     }
//   };

//   /* =========================
//      SUBMIT
//   ========================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!schoolId) {
//       alert("School information not found. Please login again.");
//       return;
//     }

//     if (!token) {
//       alert("Authentication token not found. Please login again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         ...formData,

//         schoolId: schoolId,

//         // Backend field
//         studentClass: formData.class,

//         // Sibling details
//         siblings: siblings.filter(
//           (sibling) =>
//             sibling.siblingPresent ||
//             sibling.siblingAdm ||
//             sibling.siblingName ||
//             sibling.siblingClass,
//         ),
//       };

//       // Remove frontend-only field
//       delete payload.class;

//       console.log("Admission Payload:", payload);

//       const response = await axios.post("/api/admissions", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Admission Saved:", response.data);

//       alert("Admission Applied 🎉");

//       setFormData(getInitialFormData());

//       setSiblings([
//         {
//           siblingPresent: false,
//           siblingAdm: "",
//           siblingName: "",
//           siblingClass: "",
//         },
//       ]);

//       setSameAddress(false);

//       navigate("/admission/new_admission");
//     } catch (error) {
//       console.error("Admission Error:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         "Admission failed ❌";

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      COMMON INPUT
//   ========================= */

//   const inputClass = "w-100 p-2 rounded border";

//   const sectionStyle = {
//     backgroundColor: "rgb(30, 58, 138)",
//   };

//   return (
//     <>
//       {/* HEADER */}

//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Add New Admission</strong>
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
//                 Home
//               </a>
//             </li>

//             <li className="breadcrumb-item active">
//               Add New Admission
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div
//           className="mt-4 shadow rounded ms-2 p-4 mb-3 me-2"
//           style={{ backgroundColor: "white" }}
//         >
//           {/* =========================
//               ADMISSION DETAILS
//           ========================= */}

//           <div
//             className="row text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Admission Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Joining Academic Year</label>

//               <select
//                 name="academicYear"
//                 value={formData.academicYear}
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="2026-27">2026-2027</option>
//                 <option value="2025-26">2025-2026</option>
//                 <option value="2024-25">2024-2025</option>
//                 <option value="2023-24">2023-2024</option>
//                 <option value="2022-23">2022-2023</option>
//                 <option value="2021-22">2021-2022</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Enter Date</label>

//               <input
//                 type="date"
//                 name="today"
//                 value={formData.today}
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Invoice No</label>

//               <input
//                 type="text"
//                 name="invoice"
//                 value={formData.invoice}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Admission Type</label>

//               <select
//                 name="academicType"
//                 value={formData.academicType}
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="newAdmission">New Admission</option>
//               </select>
//             </div>
//           </div>

//           {/* =========================
//               STUDENT DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Student Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Middle Name</label>
//               <input
//                 type="text"
//                 name="middleName"
//                 value={formData.middleName}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Gender</label>

//               <select
//                 name="gender"
//                 value={formData.gender}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="NA">Not Applicable</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Date Of Birth</label>

//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Aadhar Card No</label>

//               <input
//                 type="text"
//                 name="aadharNo"
//                 value={formData.aadharNo}
//                 className={inputClass}
//                 onChange={handleChange}
//                 maxLength={12}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Nationality</label>

//               <input
//                 type="text"
//                 name="nationality"
//                 value={formData.nationality}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Mother Tongue</label>

//               <input
//                 type="text"
//                 name="motherTongue"
//                 value={formData.motherTongue}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Religion</label>

//               <input
//                 type="text"
//                 name="religion"
//                 value={formData.religion}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Category</label>

//               <select
//                 name="category"
//                 value={formData.category}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="obc">OBC</option>
//                 <option value="general">General</option>
//                 <option value="ebc">EBC</option>
//                 <option value="sc">SC</option>
//                 <option value="st">ST</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Caste</label>

//               <input
//                 type="text"
//                 name="caste"
//                 value={formData.caste}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Blood Group</label>

//               <select
//                 name="bloodGroup"
//                 value={formData.bloodGroup}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//               </select>
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Transport Required</label>

//               <div className="mt-2">
//                 <input
//                   type="checkbox"
//                   name="transportRequired"
//                   checked={formData.transportRequired === "yes"}
//                   onChange={handleChange}
//                   style={{
//                     width: "20px",
//                     height: "20px",
//                   }}
//                 />

//                 <span className="ms-2">
//                   {formData.transportRequired === "yes"
//                     ? "Yes"
//                     : "No"}
//                 </span>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <label>Class to which admission is sought</label>

//               <select
//                 name="class"
//                 value={formData.class}
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>

//                 {standards.map((std) => (
//                   <option key={std.value} value={std.value}>
//                     {std.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Age as on 1st June</label>

//               <input
//                 type="text"
//                 name="age"
//                 value={formData.age}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =========================
//               CONTACT DETAILS
//           ========================= */}

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Email For Correspondence</label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Preferred Mobile No. for SMS</label>

//               <input
//                 type="text"
//                 name="preferredNo"
//                 value={formData.preferredNo}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Alternate Mobile No. for SMS</label>

//               <input
//                 type="text"
//                 name="alternateNo"
//                 value={formData.alternateNo}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =========================
//               FEE DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Fee Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Fee Category</label>

//               <select
//                 name="feeCategory"
//                 value={formData.feeCategory}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="General">General</option>
//                 <option value="Concession">Concession</option>
//                 <option value="Ex-Student">Ex-Student</option>
//                 <option value="Staff Child">Staff Child</option>
//               </select>
//             </div>

//             {formData.feeCategory && (
//               <div className="col-md-4">
//                 <label>Fee Batch</label>

//                 <select
//                   name="feeBatch"
//                   value={formData.feeBatch}
//                   onChange={handleChange}
//                   className={inputClass}
//                 >
//                   <option value="">Select Batch</option>

//                   {batches.map((batch) => (
//                     <option key={batch} value={batch}>
//                       {batch}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* =========================
//               SIBLING DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Sibling Details</h5>
//           </div>

//           {siblings.map((sibling, index) => (
//             <div
//               className="row mt-3 align-items-end"
//               key={index}
//             >
//               <div className="col-md-3">
//                 <label>Sibling In School</label>

//                 <div className="mt-2">
//                   <input
//                     type="checkbox"
//                     name="siblingPresent"
//                     checked={sibling.siblingPresent}
//                     onChange={(e) =>
//                       handleSiblingChange(index, e)
//                     }
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-3">
//                 <label>Sibling Admission No</label>

//                 <input
//                   type="text"
//                   name="siblingAdm"
//                   value={sibling.siblingAdm}
//                   className={inputClass}
//                   onChange={(e) =>
//                     handleSiblingChange(index, e)
//                   }
//                   disabled={!sibling.siblingPresent}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label>Sibling Name</label>

//                 <input
//                   type="text"
//                   name="siblingName"
//                   value={sibling.siblingName}
//                   className={inputClass}
//                   onChange={(e) =>
//                     handleSiblingChange(index, e)
//                   }
//                   disabled={!sibling.siblingPresent}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label>Sibling Class</label>

//                 <input
//                   type="text"
//                   name="siblingClass"
//                   value={sibling.siblingClass}
//                   className={inputClass}
//                   onChange={(e) =>
//                     handleSiblingChange(index, e)
//                   }
//                   disabled={!sibling.siblingPresent}
//                 />

//                 {siblings.length > 1 && (
//                   <button
//                     type="button"
//                     className="btn btn-danger btn-sm mt-2"
//                     onClick={() => handleRemoveSibling(index)}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             className="btn btn-info mt-3 text-white"
//             onClick={handleAddMoreSiblings}
//           >
//             + Add More
//           </button>

//           {/* =========================
//               CORRESPONDENCE ADDRESS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Correspondence Address</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>House No</label>

//               <input
//                 type="text"
//                 name="houseNo"
//                 value={formData.houseNo}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Street</label>

//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Post/Zip Code</label>

//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Area</label>

//               <input
//                 type="text"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Town</label>

//               <input
//                 type="text"
//                 name="town"
//                 value={formData.town}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>City</label>

//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>State</label>

//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Country</label>

//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* =========================
//               PERMANENT ADDRESS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Permanent Address</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Same as Correspondence Address?</label>

//               <div className="mt-2">
//                 <input
//                   type="checkbox"
//                   checked={sameAddress}
//                   onChange={handleSameAddress}
//                   style={{
//                     width: "20px",
//                     height: "20px",
//                   }}
//                 />

//                 <span className="ms-2">
//                   Yes, same address
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>House No</label>

//               <input
//                 type="text"
//                 name="permanentHouseNo"
//                 value={formData.permanentHouseNo}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Street</label>

//               <input
//                 type="text"
//                 name="permanentStreet"
//                 value={formData.permanentStreet}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Post/Zip Code</label>

//               <input
//                 type="text"
//                 name="permanentZip"
//                 value={formData.permanentZip}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Area</label>

//               <input
//                 type="text"
//                 name="permanentArea"
//                 value={formData.permanentArea}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Town</label>

//               <input
//                 type="text"
//                 name="permanentTown"
//                 value={formData.permanentTown}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>City</label>

//               <input
//                 type="text"
//                 name="permanentCity"
//                 value={formData.permanentCity}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>State</label>

//               <input
//                 type="text"
//                 name="permanentState"
//                 value={formData.permanentState}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Country</label>

//               <input
//                 type="text"
//                 name="permanentCountry"
//                 value={formData.permanentCountry}
//                 onChange={handleChange}
//                 className={inputClass}
//                 disabled={sameAddress}
//               />
//             </div>
//           </div>

//           {/* =========================
//               FATHER DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Father Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Father Name</label>
//               <input
//                 type="text"
//                 name="fatherName"
//                 value={formData.fatherName}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Landline</label>
//               <input
//                 type="text"
//                 name="fatherLandline"
//                 value={formData.fatherLandline}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Mobile</label>
//               <input
//                 type="text"
//                 name="fatherMobile"
//                 value={formData.fatherMobile}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="fatherEmail"
//                 value={formData.fatherEmail}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Father Aadhar Card No</label>
//               <input
//                 type="text"
//                 name="fatherAadhar"
//                 value={formData.fatherAadhar}
//                 className={inputClass}
//                 onChange={handleChange}
//                 maxLength={12}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Education</label>
//               <input
//                 type="text"
//                 name="fatherEducation"
//                 value={formData.fatherEducation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Education Type</label>

//               <select
//                 name="fatherEducationType"
//                 value={formData.fatherEducationType}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="business">Business</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Specialisation</label>

//               <input
//                 type="text"
//                 name="fatherSpecialisation"
//                 value={formData.fatherSpecialisation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Job Type</label>

//               <input
//                 type="text"
//                 name="fatherJobType"
//                 value={formData.fatherJobType}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Occupation</label>

//               <select
//                 name="fatherOccupation"
//                 value={formData.fatherOccupation}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="engineer">Engineer</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="businessman">
//                   Businessman
//                 </option>
//                 <option value="teacher">Teacher</option>
//                 <option value="governmentJob">
//                   Government Job
//                 </option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Organization Name</label>

//               <input
//                 type="text"
//                 name="fatherOrganization"
//                 value={formData.fatherOrganization}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Organization Address</label>

//               <input
//                 type="text"
//                 name="fatherOrganizationAddress"
//                 value={formData.fatherOrganizationAddress}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =========================
//               MOTHER DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Mother Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Mother Name</label>

//               <input
//                 type="text"
//                 name="motherName"
//                 value={formData.motherName}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Landline</label>

//               <input
//                 type="text"
//                 name="motherLandline"
//                 value={formData.motherLandline}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Mobile</label>

//               <input
//                 type="text"
//                 name="motherMobile"
//                 value={formData.motherMobile}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Email</label>

//               <input
//                 type="email"
//                 name="motherEmail"
//                 value={formData.motherEmail}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Mother Aadhar Card No</label>

//               <input
//                 type="text"
//                 name="motherAadhar"
//                 value={formData.motherAadhar}
//                 className={inputClass}
//                 onChange={handleChange}
//                 maxLength={12}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Education</label>

//               <input
//                 type="text"
//                 name="motherEducation"
//                 value={formData.motherEducation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Education Type</label>

//               <select
//                 name="motherEducationType"
//                 value={formData.motherEducationType}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="business">Business</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Specialisation</label>

//               <input
//                 type="text"
//                 name="motherSpecialisation"
//                 value={formData.motherSpecialisation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Job Type</label>

//               <input
//                 type="text"
//                 name="motherJobType"
//                 value={formData.motherJobType}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Occupation</label>

//               <select
//                 name="motherOccupation"
//                 value={formData.motherOccupation}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="engineer">Engineer</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="businessman">
//                   Businessman
//                 </option>
//                 <option value="teacher">Teacher</option>
//                 <option value="governmentJob">
//                   Government Job
//                 </option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Organization Name</label>

//               <input
//                 type="text"
//                 name="motherOrganization"
//                 value={formData.motherOrganization}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Organization Address</label>

//               <input
//                 type="text"
//                 name="motherOrganizationAddress"
//                 value={formData.motherOrganizationAddress}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =========================
//               GUARDIAN DETAILS
//           ========================= */}

//           <div
//             className="row mt-4 text-center mx-1 text-white p-2 rounded"
//             style={sectionStyle}
//           >
//             <h5 className="mb-0">Guardian Details</h5>
//           </div>

//           <div className="row mt-3">
//             <div className="col-md-4">
//               <label>Name</label>

//               <input
//                 type="text"
//                 name="guardianName"
//                 value={formData.guardianName}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Landline</label>

//               <input
//                 type="text"
//                 name="guardianLandline"
//                 value={formData.guardianLandline}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Mobile</label>

//               <input
//                 type="text"
//                 name="guardianMobile"
//                 value={formData.guardianMobile}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Email</label>

//               <input
//                 type="email"
//                 name="guardianEmail"
//                 value={formData.guardianEmail}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Guardian Aadhar Card No</label>

//               <input
//                 type="text"
//                 name="guardianAadhar"
//                 value={formData.guardianAadhar}
//                 className={inputClass}
//                 onChange={handleChange}
//                 maxLength={12}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Education</label>

//               <input
//                 type="text"
//                 name="guardianEducation"
//                 value={formData.guardianEducation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Education Type</label>

//               <select
//                 name="guardianEducationType"
//                 value={formData.guardianEducationType}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="business">Business</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Specialisation</label>

//               <input
//                 type="text"
//                 name="guardianSpecialisation"
//                 value={formData.guardianSpecialisation}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Job Type</label>

//               <input
//                 type="text"
//                 name="guardianJobType"
//                 value={formData.guardianJobType}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-md-4">
//               <label>Occupation</label>

//               <select
//                 name="guardianOccupation"
//                 value={formData.guardianOccupation}
//                 className={inputClass}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="engineer">Engineer</option>
//                 <option value="doctor">Doctor</option>
//                 <option value="businessman">
//                   Businessman
//                 </option>
//                 <option value="teacher">Teacher</option>
//                 <option value="governmentJob">
//                   Government Job
//                 </option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Organization Name</label>

//               <input
//                 type="text"
//                 name="guardianOrganization"
//                 value={formData.guardianOrganization}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Organization Address</label>

//               <input
//                 type="text"
//                 name="guardianOrganizationAddress"
//                 value={formData.guardianOrganizationAddress}
//                 className={inputClass}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* =========================
//               SUBMIT
//           ========================= */}

//           <div className="row mt-4">
//             <div className="col-md-12 d-flex justify-content-end gap-2">
//               <button
//                 type="button"
//                 className="btn btn-secondary px-4"
//                 onClick={() => navigate(-1)}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="btn px-5 text-white"
//                 style={sectionStyle}
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default AdmissionForm;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCheck,
//   FaPlus,
//   FaSave,
//   FaTrash,
//   FaUser,
//   FaUsers,
//   FaMapMarkerAlt,
//   FaGraduationCap,
//   FaMoneyBillWave,
//   FaFileAlt,
//   FaBus,
// } from "react-icons/fa";
// import axios from "../../api/axiosInstance";
// import { MdOutlineSchool } from "react-icons/md";
// import { LuBook } from "react-icons/lu";

// const getInitialFormData = () => ({
//   academicYear: "",
//   academicType: "",
//   invoice: "",
//   today: new Date().toISOString().split("T")[0],

//   firstName: "",
//   middleName: "",
//   lastName: "",
//   dob: "",
//   gender: "",
//   aadharNo: "",
//   nationality: "",
//   motherTongue: "",
//   religion: "",
//   category: "",
//   caste: "",
//   bloodGroup: "",
//   transportRequired: "no",

//   class: "",
//   age: "",

//   email: "",
//   alternateNo: "",
//   preferredNo: "",

//   feeCategory: "",
//   feeBatch: "",

//   fatherName: "",
//   fatherAadhar: "",
//   fatherEducation: "",
//   fatherEducationType: "",
//   fatherEmail: "",
//   fatherJobType: "",
//   fatherLandline: "",
//   fatherMobile: "",
//   fatherOccupation: "",
//   fatherOrganization: "",
//   fatherOrganizationAddress: "",
//   fatherSpecialisation: "",

//   motherName: "",
//   motherAadhar: "",
//   motherEducation: "",
//   motherEducationType: "",
//   motherEmail: "",
//   motherJobType: "",
//   motherLandline: "",
//   motherMobile: "",
//   motherOccupation: "",
//   motherOrganization: "",
//   motherOrganizationAddress: "",
//   motherSpecialisation: "",

//   guardianName: "",
//   guardianAadhar: "",
//   guardianEducation: "",
//   guardianEducationType: "",
//   guardianEmail: "",
//   guardianJobType: "",
//   guardianLandline: "",
//   guardianMobile: "",
//   guardianOccupation: "",
//   guardianOrganization: "",
//   guardianOrganizationAddress: "",
//   guardianSpecialisation: "",

//   houseNo: "",
//   street: "",
//   area: "",
//   town: "",
//   zip: "",
//   state: "",
//   city: "",
//   country: "",

//   permanentHouseNo: "",
//   permanentStreet: "",
//   permanentArea: "",
//   permanentTown: "",
//   permanentZip: "",
//   permanentState: "",
//   permanentCity: "",
//   permanentCountry: "",
// });

// const AdmissionForm = () => {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const token = localStorage.getItem("token");
//   const schoolId = user?.schoolId;

//   const [formData, setFormData] = useState(getInitialFormData());

//   const [siblings, setSiblings] = useState([
//     {
//       siblingPresent: false,
//       siblingAdm: "",
//       siblingName: "",
//       siblingClass: "",
//     },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [sameAddress, setSameAddress] = useState(false);

//   const batches = [
//     "Common/Private",
//     "Common/Upto 5Km",
//     "Common/Upto 10Km",
//     "Common/Upto 10km Staff Child",
//   ];

//   const standards = [
//     { value: "NURSERY", label: "Nursery" },
//     { value: "LKG", label: "LKG" },
//     { value: "UKG", label: "UKG" },
//     { value: "I", label: "I" },
//     { value: "II", label: "II" },
//     { value: "III", label: "III" },
//     { value: "IV", label: "IV" },
//     { value: "V", label: "V" },
//     { value: "VI", label: "VI" },
//     { value: "VII", label: "VII" },
//     { value: "VIII", label: "VIII" },
//     { value: "IX", label: "IX" },
//     { value: "X", label: "X" },
//     { value: "XI", label: "XI" },
//     { value: "XII", label: "XII" },
//   ];

//   /* =====================================================
//      HANDLE FORM CHANGE
//   ===================================================== */

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
//     }));
//   };

//   /* =====================================================
//      SIBLING
//   ===================================================== */

//   const handleSiblingChange = (index, e) => {
//     const { name, value, type, checked } = e.target;

//     setSiblings((prev) =>
//       prev.map((sibling, i) =>
//         i === index
//           ? {
//               ...sibling,
//               [name]: type === "checkbox" ? checked : value,
//             }
//           : sibling
//       )
//     );
//   };

//   const handleAddMoreSiblings = () => {
//     setSiblings((prev) => [
//       ...prev,
//       {
//         siblingPresent: false,
//         siblingAdm: "",
//         siblingName: "",
//         siblingClass: "",
//       },
//     ]);
//   };

//   const handleRemoveSibling = (index) => {
//     setSiblings((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* =====================================================
//      SAME ADDRESS
//   ===================================================== */

//   useEffect(() => {
//     if (!sameAddress) return;

//     setFormData((prev) => ({
//       ...prev,
//       permanentHouseNo: prev.houseNo,
//       permanentStreet: prev.street,
//       permanentArea: prev.area,
//       permanentTown: prev.town,
//       permanentZip: prev.zip,
//       permanentState: prev.state,
//       permanentCity: prev.city,
//       permanentCountry: prev.country,
//     }));
//   }, [
//     sameAddress,
//     formData.houseNo,
//     formData.street,
//     formData.area,
//     formData.town,
//     formData.zip,
//     formData.state,
//     formData.city,
//     formData.country,
//   ]);

//   const handleSameAddress = (e) => {
//     const checked = e.target.checked;

//     setSameAddress(checked);

//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         permanentHouseNo: prev.houseNo,
//         permanentStreet: prev.street,
//         permanentArea: prev.area,
//         permanentTown: prev.town,
//         permanentZip: prev.zip,
//         permanentState: prev.state,
//         permanentCity: prev.city,
//         permanentCountry: prev.country,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         permanentHouseNo: "",
//         permanentStreet: "",
//         permanentArea: "",
//         permanentTown: "",
//         permanentZip: "",
//         permanentState: "",
//         permanentCity: "",
//         permanentCountry: "",
//       }));
//     }
//   };

//   /* =====================================================
//      SUBMIT
//   ===================================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!schoolId) {
//       alert("School information not found. Please login again.");
//       return;
//     }

//     if (!token) {
//       alert("Authentication token not found. Please login again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         ...formData,
//         schoolId: schoolId,
//         studentClass: formData.class,

//         siblings: siblings.filter(
//           (sibling) =>
//             sibling.siblingPresent ||
//             sibling.siblingAdm ||
//             sibling.siblingName ||
//             sibling.siblingClass
//         ),
//       };

//       delete payload.class;

//       console.log("Admission Payload:", payload);

//       const response = await axios.post("/api/admissions", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Admission Saved:", response.data);

//       alert("Admission Applied 🎉");

//       setFormData(getInitialFormData());

//       setSiblings([
//         {
//           siblingPresent: false,
//           siblingAdm: "",
//           siblingName: "",
//           siblingClass: "",
//         },
//       ]);

//       setSameAddress(false);

//       navigate("/admission/new_admission");
//     } catch (error) {
//       console.error("Admission Error:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         "Admission failed ❌";

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//      UI HELPERS
//   ===================================================== */

//   const inputClass =
//     "form-control premium-input";

//   const selectClass =
//     "form-select premium-input";

//   const SectionHeader = ({ icon, title, subtitle }) => (
//     <div className="premium-section-header">
//       <div className="section-icon">
//         {icon}
//       </div>

//       <div>
//         <h5>{title}</h5>
//         {subtitle && <small>{subtitle}</small>}
//       </div>
//     </div>
//   );

//   const Field = ({
//     label,
//     name,
//     type = "text",
//     required = false,
//     children,
//     disabled = false,
//     placeholder = "",
//     ...props
//   }) => (
//     <div className="col-xl-4 col-md-6 mb-3">
//       <label className="premium-label">
//         {label}
//         {required && <span className="text-danger ms-1">*</span>}
//       </label>

//       {children ? (
//         children
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           className={inputClass}
//           required={required}
//           disabled={disabled}
//           placeholder={placeholder}
//           {...props}
//         />
//       )}
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         .admission-page {
//           // background: #f5f8fc;
//           min-height: 100vh;
//           padding-bottom: 30px;
//         }

//         .premium-breadcrumb {
//           background: #ffffff;
//           border-radius: 14px;
//           padding: 18px 22px;
//           margin-bottom: 18px;
//           border: 1px solid #e8eef7;
//           box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
//           border-left: 5px solid #2563eb;
//         }

//         .premium-breadcrumb h4 {
//           margin: 0;
//           font-weight: 700;
//           color: #172033;
//         }

//         .premium-breadcrumb p {
//           margin: 5px 0 0;
//           color: #64748b;
//           font-size: 13px;
//         }

//         .premium-form-card {
//           background: #ffffff;
//           border: 1px solid #e5ebf4;
//           border-radius: 18px;
//           box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
//           overflow: hidden;
//         }

//         .premium-topbar {
//           padding: 20px 24px;
//           border-bottom: 1px solid #edf1f7;
//           background: linear-gradient(135deg, #ffffff, #f8fbff);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 15px;
//         }

//         .premium-topbar-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .top-icon {
//           width: 42px;
//           height: 42px;
//           border-radius: 12px;
//           background: #eff6ff;
//           color: #2563eb;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//         }

//         .premium-topbar h5 {
//           margin: 0;
//           font-weight: 700;
//           color: #172033;
//         }

//         .premium-topbar small {
//           color: #64748b;
//         }

//         .premium-section {
//           padding: 24px;
//           border-bottom: 1px solid #edf1f7;
//         }

//         .premium-section:last-child {
//           border-bottom: 0;
//         }

//         .premium-section-header {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 13px 16px;
//           border-radius: 12px;
//           margin-bottom: 22px;
//           background: linear-gradient(
//             135deg,
//             #eff6ff,
//             #f8fbff
//           );
//           border: 1px solid #dbeafe;
//         }

//         .section-icon {
//           width: 38px;
//           height: 38px;
//           min-width: 38px;
//           border-radius: 10px;
//           background: #2563eb;
//           color: #ffffff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .premium-section-header h5 {
//           margin: 0;
//           color: #1e3a8a;
//           font-weight: 700;
//           font-size: 16px;
//         }

//         .premium-section-header small {
//           color: #64748b;
//           font-size: 12px;
//         }

//         .premium-label {
//           display: block;
//           color: #334155;
//           font-size: 13px;
//           font-weight: 600;
//           margin-bottom: 7px;
//         }

//         .premium-input {
//           min-height: 43px;
//           border: 1px solid #d8e0eb;
//           border-radius: 9px;
//           background: #ffffff;
//           color: #1e293b;
//           font-size: 14px;
//           padding: 9px 12px;
//           transition: all 0.2s ease;
//           box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);
//         }

//         .premium-input:hover {
//           border-color: #b9c8dc;
//         }

//         .premium-input:focus {
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.10);
//           outline: none;
//         }

//         .premium-input:disabled {
//           background: #f1f5f9;
//           color: #94a3b8;
//           cursor: not-allowed;
//         }

//         .premium-textarea {
//           min-height: 80px;
//           resize: vertical;
//         }

//         .switch-box {
//           min-height: 43px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 7px 12px;
//           border: 1px solid #d8e0eb;
//           border-radius: 9px;
//           background: #ffffff;
//         }

//         .switch-box input {
//           width: 19px;
//           height: 19px;
//           accent-color: #2563eb;
//           cursor: pointer;
//         }

//         .switch-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: #475569;
//         }

//         .sibling-card {
//           border: 1px solid #e1e8f2;
//           border-radius: 14px;
//           padding: 18px;
//           background: #fbfdff;
//           margin-bottom: 15px;
//         }

//         .sibling-number {
//           display: inline-flex;
//           width: 30px;
//           height: 30px;
//           border-radius: 9px;
//           background: #eff6ff;
//           color: #2563eb;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 13px;
//           margin-bottom: 12px;
//         }

//         .address-note {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 13px;
//           border-radius: 9px;
//           background: #f0fdf4;
//           color: #166534;
//           border: 1px solid #bbf7d0;
//           font-size: 13px;
//           font-weight: 600;
//           margin-bottom: 18px;
//         }

//         .premium-footer {
//           padding: 20px 24px;
//           background: #f8fafc;
//           border-top: 1px solid #e7edf5;
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//         }

//         .premium-btn {
//           border-radius: 9px;
//           padding: 10px 19px;
//           font-weight: 600;
//           font-size: 13px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           transition: all 0.2s ease;
//         }

//         .premium-btn-primary {
//           background: #2563eb;
//           color: white;
//           border: 1px solid #2563eb;
//           box-shadow: 0 4px 12px rgba(37, 99, 235, 0.20);
//         }

//         .premium-btn-primary:hover {
//           background: #1d4ed8;
//           border-color: #1d4ed8;
//           color: white;
//           transform: translateY(-1px);
//         }

//         .premium-btn-secondary {
//           background: #ffffff;
//           color: #475569;
//           border: 1px solid #cbd5e1;
//         }

//         .premium-btn-secondary:hover {
//           background: #f8fafc;
//           color: #1e293b;
//         }

//         .premium-btn-danger {
//           background: #fff1f2;
//           color: #dc2626;
//           border: 1px solid #fecdd3;
//         }

//         .premium-btn-danger:hover {
//           background: #fee2e2;
//           color: #b91c1c;
//         }

//         .premium-btn-add {
//           background: #eff6ff;
//           color: #2563eb;
//           border: 1px solid #bfdbfe;
//         }

//         .premium-btn-add:hover {
//           background: #dbeafe;
//         }

//         .required-info {
//           font-size: 12px;
//           color: #64748b;
//         }

//         @media (max-width: 767px) {
//           .admission-page {
//             padding: 0 5px 20px;
//           }

//           .premium-section {
//             padding: 16px;
//           }

//           .premium-topbar {
//             padding: 16px;
//           }

//           .premium-footer {
//             padding: 16px;
//             flex-direction: column-reverse;
//           }

//           .premium-footer button {
//             width: 100%;
//           }

//           .premium-breadcrumb {
//             margin: 8px 0 15px;
//           }
//         }
//       `}</style>

//       <div className="admission-page">

      


//           <div className="mx-2 mt-2 mb-3 ">
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
//                   <LuBook size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">Add New Admissions</h5>

//                   <div className="text-muted small">
//                     New Admissions &nbsp;/ &nbsp; Add New Admissions
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <button
//               type="button"
//               className="premium-btn premium-btn-secondary rounded-4"
//               onClick={() => navigate(-1)}
//             >
//               <FaArrowLeft />
//               Back
//             </button>
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
//               Home &nbsp;›&nbsp; New Admissions &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Add Student
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>
//         {/* =====================================================
//             MAIN FORM
//         ===================================================== */}

//         <form onSubmit={handleSubmit} className="px-2">

//           <div className="premium-form-card shadow rounded-4 ">

//             {/* TOP BAR */}

//             <div className="premium-topbar">

//               <div className="premium-topbar-title">

//                 <div className="top-icon">
//                   <FaUser />
//                 </div>

//                 <div>
//                   <h5>Student Admission Form</h5>
//                   <small>
//                     Enter complete student and parent information
//                   </small>
//                 </div>

//               </div>

//               <span className="required-info">
//                 <span className="text-danger">*</span>{" "}
//                 Required fields
//               </span>

//             </div>

//             {/* =================================================
//                 ADMISSION DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaFileAlt />}
//                 title="Admission Details"
//                 subtitle="Basic admission and academic information"
//               />

//               <div className="row">

//                 <Field
//                   label="Joining Academic Year"
//                   name="academicYear"
//                   required
//                 >
//                   <select
//                     name="academicYear"
//                     value={formData.academicYear}
//                     className={selectClass}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Academic Year</option>
//                     <option value="2026-27">2026-2027</option>
//                     <option value="2025-26">2025-2026</option>
//                     <option value="2024-25">2024-2025</option>
//                     <option value="2023-24">2023-2024</option>
//                     <option value="2022-23">2022-2023</option>
//                     <option value="2021-22">2021-2022</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Enter Date"
//                   name="today"
//                   type="date"
//                   required
//                 />

//                 <Field
//                   label="Invoice No"
//                   name="invoice"
//                   placeholder="Enter invoice number"
//                 />

//                 <Field
//                   label="Admission Type"
//                   name="academicType"
//                   required
//                 >
//                   <select
//                     name="academicType"
//                     value={formData.academicType}
//                     className={selectClass}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Admission Type</option>
//                     <option value="newAdmission">
//                       New Admission
//                     </option>
//                   </select>
//                 </Field>

//               </div>

//             </div>

//             {/* =================================================
//                 STUDENT DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUser />}
//                 title="Student Details"
//                 subtitle="Personal information of the student"
//               />

//               <div className="row">

//                 <Field
//                   label="First Name"
//                   name="firstName"
//                   required
//                   placeholder="Enter first name"
//                 />

//                 <Field
//                   label="Middle Name"
//                   name="middleName"
//                   placeholder="Enter middle name"
//                 />

//                 <Field
//                   label="Last Name"
//                   name="lastName"
//                   placeholder="Enter last name"
//                 />

//                 <Field
//                   label="Gender"
//                   name="gender"
//                 >
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="NA">Not Applicable</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Date Of Birth"
//                   name="dob"
//                   type="date"
//                 />

//                 <Field
//                   label="Aadhar Card No"
//                   name="aadharNo"
//                   maxLength={12}
//                   placeholder="12 digit Aadhar number"
//                 />

//                 <Field
//                   label="Nationality"
//                   name="nationality"
//                   placeholder="Indian"
//                 />

//                 <Field
//                   label="Mother Tongue"
//                   name="motherTongue"
//                 />

//                 <Field
//                   label="Religion"
//                   name="religion"
//                 />

//                 <Field
//                   label="Category"
//                   name="category"
//                 >
//                   <select
//                     name="category"
//                     value={formData.category}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="obc">OBC</option>
//                     <option value="general">General</option>
//                     <option value="ebc">EBC</option>
//                     <option value="sc">SC</option>
//                     <option value="st">ST</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Caste"
//                   name="caste"
//                 />

//                 <Field
//                   label="Blood Group"
//                   name="bloodGroup"
//                 >
//                   <select
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Class to which admission is sought"
//                   name="class"
//                   required
//                 >
//                   <select
//                     name="class"
//                     value={formData.class}
//                     className={selectClass}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Class</option>

//                     {standards.map((std) => (
//                       <option
//                         key={std.value}
//                         value={std.value}
//                       >
//                         {std.label}
//                       </option>
//                     ))}
//                   </select>
//                 </Field>

//                 <Field
//                   label="Age as on 1st June"
//                   name="age"
//                   placeholder="e.g. 5 Years"
//                 />

//                 <div className="col-xl-4 col-md-6 mb-3">

//                   <label className="premium-label">
//                     Transport Required
//                   </label>

//                   <div className="switch-box">

//                     <input
//                       type="checkbox"
//                       name="transportRequired"
//                       checked={
//                         formData.transportRequired === "yes"
//                       }
//                       onChange={handleChange}
//                     />

//                     <span className="switch-label">
//                       {formData.transportRequired === "yes"
//                         ? "Yes, transport required"
//                         : "No, transport not required"}
//                     </span>

//                     <FaBus
//                       className="ms-auto"
//                       style={{
//                         color:
//                           formData.transportRequired === "yes"
//                             ? "#2563eb"
//                             : "#94a3b8",
//                       }}
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* =================================================
//                 CONTACT DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUsers />}
//                 title="Contact Details"
//                 subtitle="Student communication information"
//               />

//               <div className="row">

//                 <Field
//                   label="Email For Correspondence"
//                   name="email"
//                   type="email"
//                   placeholder="student@example.com"
//                 />

//                 <Field
//                   label="Preferred Mobile No. for SMS"
//                   name="preferredNo"
//                   placeholder="10 digit mobile number"
//                 />

//                 <Field
//                   label="Alternate Mobile No. for SMS"
//                   name="alternateNo"
//                   placeholder="10 digit mobile number"
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 FEE DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaMoneyBillWave />}
//                 title="Fee Details"
//                 subtitle="Fee category and batch information"
//               />

//               <div className="row">

//                 <Field
//                   label="Fee Category"
//                   name="feeCategory"
//                 >
//                   <select
//                     name="feeCategory"
//                     value={formData.feeCategory}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Fee Category</option>
//                     <option value="General">General</option>
//                     <option value="Concession">Concession</option>
//                     <option value="Ex-Student">Ex-Student</option>
//                     <option value="Staff Child">
//                       Staff Child
//                     </option>
//                   </select>
//                 </Field>

//                 {formData.feeCategory && (
//                   <Field
//                     label="Fee Batch"
//                     name="feeBatch"
//                   >
//                     <select
//                       name="feeBatch"
//                       value={formData.feeBatch}
//                       onChange={handleChange}
//                       className={selectClass}
//                     >
//                       <option value="">
//                         Select Fee Batch
//                       </option>

//                       {batches.map((batch) => (
//                         <option
//                           key={batch}
//                           value={batch}
//                         >
//                           {batch}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>
//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 SIBLING DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUsers />}
//                 title="Sibling Details"
//                 subtitle="Add siblings currently studying in the school"
//               />

//               {siblings.map((sibling, index) => (

//                 <div
//                   className="sibling-card"
//                   key={index}
//                 >

//                   <span className="sibling-number">
//                     {index + 1}
//                   </span>

//                   <div className="row">

//                     <div className="col-xl-3 col-md-6 mb-3">

//                       <label className="premium-label">
//                         Sibling In School
//                       </label>

//                       <div className="switch-box">

//                         <input
//                           type="checkbox"
//                           name="siblingPresent"
//                           checked={sibling.siblingPresent}
//                           onChange={(e) =>
//                             handleSiblingChange(
//                               index,
//                               e
//                             )
//                           }
//                         />

//                         <span className="switch-label">
//                           {sibling.siblingPresent
//                             ? "Yes"
//                             : "No"}
//                         </span>

//                       </div>

//                     </div>

//                     <div className="col-xl-3 col-md-6 mb-3">

//                       <label className="premium-label">
//                         Sibling Admission No
//                       </label>

//                       <input
//                         type="text"
//                         name="siblingAdm"
//                         value={sibling.siblingAdm}
//                         className={inputClass}
//                         onChange={(e) =>
//                           handleSiblingChange(
//                             index,
//                             e
//                           )
//                         }
//                         disabled={
//                           !sibling.siblingPresent
//                         }
//                         placeholder="Admission number"
//                       />

//                     </div>

//                     <div className="col-xl-3 col-md-6 mb-3">

//                       <label className="premium-label">
//                         Sibling Name
//                       </label>

//                       <input
//                         type="text"
//                         name="siblingName"
//                         value={sibling.siblingName}
//                         className={inputClass}
//                         onChange={(e) =>
//                           handleSiblingChange(
//                             index,
//                             e
//                           )
//                         }
//                         disabled={
//                           !sibling.siblingPresent
//                         }
//                         placeholder="Sibling name"
//                       />

//                     </div>

//                     <div className="col-xl-3 col-md-6 mb-3">

//                       <label className="premium-label">
//                         Sibling Class
//                       </label>

//                       <input
//                         type="text"
//                         name="siblingClass"
//                         value={sibling.siblingClass}
//                         className={inputClass}
//                         onChange={(e) =>
//                           handleSiblingChange(
//                             index,
//                             e
//                           )
//                         }
//                         disabled={
//                           !sibling.siblingPresent
//                         }
//                         placeholder="Class"
//                       />

//                     </div>

//                   </div>

//                   {siblings.length > 1 && (
//                     <button
//                       type="button"
//                       className="premium-btn premium-btn-danger"
//                       onClick={() =>
//                         handleRemoveSibling(index)
//                       }
//                     >
//                       <FaTrash />
//                       Remove Sibling
//                     </button>
//                   )}

//                 </div>

//               ))}

//               <button
//                 type="button"
//                 className="premium-btn premium-btn-add"
//                 onClick={handleAddMoreSiblings}
//               >
//                 <FaPlus />
//                 Add More Sibling
//               </button>

//             </div>

//             {/* =================================================
//                 CORRESPONDENCE ADDRESS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaMapMarkerAlt />}
//                 title="Correspondence Address"
//                 subtitle="Current residential address of the student"
//               />

//               <div className="row">

//                 <Field
//                   label="House No"
//                   name="houseNo"
//                 />

//                 <Field
//                   label="Street"
//                   name="street"
//                 />

//                 <Field
//                   label="Post / Zip Code"
//                   name="zip"
//                 />

//                 <Field
//                   label="Area"
//                   name="area"
//                 />

//                 <Field
//                   label="Town"
//                   name="town"
//                 />

//                 <Field
//                   label="City"
//                   name="city"
//                 />

//                 <Field
//                   label="State"
//                   name="state"
//                 />

//                 <Field
//                   label="Country"
//                   name="country"
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 PERMANENT ADDRESS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaMapMarkerAlt />}
//                 title="Permanent Address"
//                 subtitle="Permanent residential address"
//               />

//               <div className="address-note">
//                 <FaCheck />

//                 <span>
//                   Check the option below if permanent address
//                   is same as correspondence address.
//                 </span>
//               </div>

//               <div className="row">

//                 <div className="col-12 mb-3">

//                   <div className="switch-box">

//                     <input
//                       type="checkbox"
//                       checked={sameAddress}
//                       onChange={handleSameAddress}
//                     />

//                     <span className="switch-label">
//                       Yes, permanent address is same as
//                       correspondence address
//                     </span>

//                   </div>

//                 </div>

//                 <Field
//                   label="House No"
//                   name="permanentHouseNo"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="Street"
//                   name="permanentStreet"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="Post / Zip Code"
//                   name="permanentZip"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="Area"
//                   name="permanentArea"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="Town"
//                   name="permanentTown"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="City"
//                   name="permanentCity"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="State"
//                   name="permanentState"
//                   disabled={sameAddress}
//                 />

//                 <Field
//                   label="Country"
//                   name="permanentCountry"
//                   disabled={sameAddress}
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 FATHER DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUser />}
//                 title="Father Details"
//                 subtitle="Father / primary parent information"
//               />

//               <div className="row">

//                 <Field
//                   label="Father Name"
//                   name="fatherName"
//                 />

//                 <Field
//                   label="Landline"
//                   name="fatherLandline"
//                 />

//                 <Field
//                   label="Mobile"
//                   name="fatherMobile"
//                 />

//                 <Field
//                   label="Email"
//                   name="fatherEmail"
//                   type="email"
//                 />

//                 <Field
//                   label="Father Aadhar Card No"
//                   name="fatherAadhar"
//                   maxLength={12}
//                 />

//                 <Field
//                   label="Education"
//                   name="fatherEducation"
//                 />

//                 <Field
//                   label="Education Type"
//                   name="fatherEducationType"
//                 >
//                   <select
//                     name="fatherEducationType"
//                     value={formData.fatherEducationType}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select</option>
//                     <option value="private">Private</option>
//                     <option value="public">Public</option>
//                     <option value="business">Business</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Specialisation"
//                   name="fatherSpecialisation"
//                 />

//                 <Field
//                   label="Job Type"
//                   name="fatherJobType"
//                 />

//                 <Field
//                   label="Occupation"
//                   name="fatherOccupation"
//                 >
//                   <select
//                     name="fatherOccupation"
//                     value={formData.fatherOccupation}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Occupation</option>
//                     <option value="engineer">
//                       Engineer
//                     </option>
//                     <option value="doctor">
//                       Doctor
//                     </option>
//                     <option value="businessman">
//                       Businessman
//                     </option>
//                     <option value="teacher">
//                       Teacher
//                     </option>
//                     <option value="governmentJob">
//                       Government Job
//                     </option>
//                     <option value="other">
//                       Other
//                     </option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Organization Name"
//                   name="fatherOrganization"
//                 />

//                 <Field
//                   label="Organization Address"
//                   name="fatherOrganizationAddress"
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 MOTHER DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUser />}
//                 title="Mother Details"
//                 subtitle="Mother / secondary parent information"
//               />

//               <div className="row">

//                 <Field
//                   label="Mother Name"
//                   name="motherName"
//                 />

//                 <Field
//                   label="Landline"
//                   name="motherLandline"
//                 />

//                 <Field
//                   label="Mobile"
//                   name="motherMobile"
//                 />

//                 <Field
//                   label="Email"
//                   name="motherEmail"
//                   type="email"
//                 />

//                 <Field
//                   label="Mother Aadhar Card No"
//                   name="motherAadhar"
//                   maxLength={12}
//                 />

//                 <Field
//                   label="Education"
//                   name="motherEducation"
//                 />

//                 <Field
//                   label="Education Type"
//                   name="motherEducationType"
//                 >
//                   <select
//                     name="motherEducationType"
//                     value={formData.motherEducationType}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select</option>
//                     <option value="private">Private</option>
//                     <option value="public">Public</option>
//                     <option value="business">Business</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Specialisation"
//                   name="motherSpecialisation"
//                 />

//                 <Field
//                   label="Job Type"
//                   name="motherJobType"
//                 />

//                 <Field
//                   label="Occupation"
//                   name="motherOccupation"
//                 >
//                   <select
//                     name="motherOccupation"
//                     value={formData.motherOccupation}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Occupation</option>
//                     <option value="engineer">
//                       Engineer
//                     </option>
//                     <option value="doctor">
//                       Doctor
//                     </option>
//                     <option value="businessman">
//                       Businessman
//                     </option>
//                     <option value="teacher">
//                       Teacher
//                     </option>
//                     <option value="governmentJob">
//                       Government Job
//                     </option>
//                     <option value="other">
//                       Other
//                     </option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Organization Name"
//                   name="motherOrganization"
//                 />

//                 <Field
//                   label="Organization Address"
//                   name="motherOrganizationAddress"
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 GUARDIAN DETAILS
//             ================================================= */}

//             <div className="premium-section">

//               <SectionHeader
//                 icon={<FaUser />}
//                 title="Guardian Details"
//                 subtitle="Guardian information, if applicable"
//               />

//               <div className="row">

//                 <Field
//                   label="Guardian Name"
//                   name="guardianName"
//                 />

//                 <Field
//                   label="Landline"
//                   name="guardianLandline"
//                 />

//                 <Field
//                   label="Mobile"
//                   name="guardianMobile"
//                 />

//                 <Field
//                   label="Email"
//                   name="guardianEmail"
//                   type="email"
//                 />

//                 <Field
//                   label="Guardian Aadhar Card No"
//                   name="guardianAadhar"
//                   maxLength={12}
//                 />

//                 <Field
//                   label="Education"
//                   name="guardianEducation"
//                 />

//                 <Field
//                   label="Education Type"
//                   name="guardianEducationType"
//                 >
//                   <select
//                     name="guardianEducationType"
//                     value={formData.guardianEducationType}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select</option>
//                     <option value="private">Private</option>
//                     <option value="public">Public</option>
//                     <option value="business">Business</option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Specialisation"
//                   name="guardianSpecialisation"
//                 />

//                 <Field
//                   label="Job Type"
//                   name="guardianJobType"
//                 />

//                 <Field
//                   label="Occupation"
//                   name="guardianOccupation"
//                 >
//                   <select
//                     name="guardianOccupation"
//                     value={formData.guardianOccupation}
//                     className={selectClass}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Occupation</option>
//                     <option value="engineer">
//                       Engineer
//                     </option>
//                     <option value="doctor">
//                       Doctor
//                     </option>
//                     <option value="businessman">
//                       Businessman
//                     </option>
//                     <option value="teacher">
//                       Teacher
//                     </option>
//                     <option value="governmentJob">
//                       Government Job
//                     </option>
//                     <option value="other">
//                       Other
//                     </option>
//                   </select>
//                 </Field>

//                 <Field
//                   label="Organization Name"
//                   name="guardianOrganization"
//                 />

//                 <Field
//                   label="Organization Address"
//                   name="guardianOrganizationAddress"
//                 />

//               </div>

//             </div>

//             {/* =================================================
//                 FOOTER
//             ================================================= */}

//             <div className="premium-footer">

//               <button
//                 type="button"
//                 className="premium-btn premium-btn-secondary"
//                 onClick={() => navigate(-1)}
//                 disabled={loading}
//               >
//                 <FaArrowLeft />
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="premium-btn premium-btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm"
//                     />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <FaSave />
//                     Submit Admission
//                   </>
//                 )}
//               </button>

//             </div>

//           </div>

//         </form>
//       </div>
//     </>
//   );
// };

// export default AdmissionForm;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaPlus,
  FaSave,
  FaTrash,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaBus,
} from "react-icons/fa";
import axios from "../../api/axiosInstance";
import { LuBook } from "react-icons/lu";

/* =====================================================
   INITIAL FORM DATA
===================================================== */

const getInitialFormData = () => ({
  academicYear: "",
  academicType: "",
  invoice: "",
  today: new Date().toISOString().split("T")[0],

  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  aadharNo: "",
  nationality: "",
  motherTongue: "",
  religion: "",
  category: "",
  caste: "",
  bloodGroup: "",
  transportRequired: "no",

  class: "",
  age: "",

  email: "",
  alternateNo: "",
  preferredNo: "",

  feeCategory: "",
  feeBatch: "",

  fatherName: "",
  fatherAadhar: "",
  fatherEducation: "",
  fatherEducationType: "",
  fatherEmail: "",
  fatherJobType: "",
  fatherLandline: "",
  fatherMobile: "",
  fatherOccupation: "",
  fatherOrganization: "",
  fatherOrganizationAddress: "",
  fatherSpecialisation: "",

  motherName: "",
  motherAadhar: "",
  motherEducation: "",
  motherEducationType: "",
  motherEmail: "",
  motherJobType: "",
  motherLandline: "",
  motherMobile: "",
  motherOccupation: "",
  motherOrganization: "",
  motherOrganizationAddress: "",
  motherSpecialisation: "",

  guardianName: "",
  guardianAadhar: "",
  guardianEducation: "",
  guardianEducationType: "",
  guardianEmail: "",
  guardianJobType: "",
  guardianLandline: "",
  guardianMobile: "",
  guardianOccupation: "",
  guardianOrganization: "",
  guardianOrganizationAddress: "",
  guardianSpecialisation: "",

  houseNo: "",
  street: "",
  area: "",
  town: "",
  zip: "",
  state: "",
  city: "",
  country: "",

  permanentHouseNo: "",
  permanentStreet: "",
  permanentArea: "",
  permanentTown: "",
  permanentZip: "",
  permanentState: "",
  permanentCity: "",
  permanentCountry: "",
});

/* =====================================================
   SECTION HEADER
   IMPORTANT:
   Keep this OUTSIDE AdmissionForm
===================================================== */

const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="premium-section-header">
    <div className="section-icon">
      {icon}
    </div>

    <div>
      <h5>{title}</h5>

      {subtitle && (
        <small>{subtitle}</small>
      )}
    </div>
  </div>
);

/* =====================================================
   FIELD COMPONENT
   IMPORTANT:
   Keep this OUTSIDE AdmissionForm
   This fixes input focus issue.
===================================================== */

const Field = ({
  label,
  name,
  type = "text",
  required = false,
  children,
  disabled = false,
  placeholder = "",
  formData,
  handleChange,
  ...props
}) => (
  <div className="col-xl-4 col-md-6 mb-3">

    <label className="premium-label">
      {label}

      {required && (
        <span className="text-danger ms-1">
          *
        </span>
      )}
    </label>

    {children ? (
      children
    ) : (
      <input
        type={type}
        name={name}
        value={formData[name] ?? ""}
        onChange={handleChange}
        className="form-control premium-input"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    )}

  </div>
);

/* =====================================================
   MAIN COMPONENT
===================================================== */

const AdmissionForm = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [formData, setFormData] = useState(
    getInitialFormData()
  );

  const [siblings, setSiblings] = useState([
    {
      siblingPresent: false,
      siblingAdm: "",
      siblingName: "",
      siblingClass: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [sameAddress, setSameAddress] =
    useState(false);

  /* =====================================================
     BATCHES
  ===================================================== */

  const batches = [
    "Common/Private",
    "Common/Upto 5Km",
    "Common/Upto 10Km",
    "Common/Upto 10km Staff Child",
  ];

  /* =====================================================
     STANDARDS
  ===================================================== */

  const standards = [
    { value: "NURSERY", label: "Nursery" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
    { value: "V", label: "V" },
    { value: "VI", label: "VI" },
    { value: "VII", label: "VII" },
    { value: "VIII", label: "VIII" },
    { value: "IX", label: "IX" },
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },
  ];

  /* =====================================================
     HANDLE FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
            ? "yes"
            : "no"
          : value,
    }));
  };

  /* =====================================================
     SIBLING CHANGE
  ===================================================== */

  const handleSiblingChange = (index, e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSiblings((prev) =>
      prev.map((sibling, i) =>
        i === index
          ? {
              ...sibling,

              [name]:
                type === "checkbox"
                  ? checked
                  : value,
            }
          : sibling
      )
    );
  };

  /* =====================================================
     ADD SIBLING
  ===================================================== */

  const handleAddMoreSiblings = () => {

    setSiblings((prev) => [
      ...prev,

      {
        siblingPresent: false,
        siblingAdm: "",
        siblingName: "",
        siblingClass: "",
      },
    ]);
  };

  /* =====================================================
     REMOVE SIBLING
  ===================================================== */

  const handleRemoveSibling = (index) => {

    setSiblings((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =====================================================
     SAME ADDRESS
  ===================================================== */

  useEffect(() => {

    if (!sameAddress) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      permanentHouseNo: prev.houseNo,
      permanentStreet: prev.street,
      permanentArea: prev.area,
      permanentTown: prev.town,
      permanentZip: prev.zip,
      permanentState: prev.state,
      permanentCity: prev.city,
      permanentCountry: prev.country,
    }));

  }, [
    sameAddress,
    formData.houseNo,
    formData.street,
    formData.area,
    formData.town,
    formData.zip,
    formData.state,
    formData.city,
    formData.country,
  ]);

  /* =====================================================
     SAME ADDRESS CHECKBOX
  ===================================================== */

  const handleSameAddress = (e) => {

    const checked = e.target.checked;

    setSameAddress(checked);

    if (checked) {

      setFormData((prev) => ({
        ...prev,

        permanentHouseNo: prev.houseNo,
        permanentStreet: prev.street,
        permanentArea: prev.area,
        permanentTown: prev.town,
        permanentZip: prev.zip,
        permanentState: prev.state,
        permanentCity: prev.city,
        permanentCountry: prev.country,
      }));

    } else {

      setFormData((prev) => ({
        ...prev,

        permanentHouseNo: "",
        permanentStreet: "",
        permanentArea: "",
        permanentTown: "",
        permanentZip: "",
        permanentState: "",
        permanentCity: "",
        permanentCountry: "",
      }));

    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!schoolId) {

      alert(
        "School information not found. Please login again."
      );

      return;
    }

    if (!token) {

      alert(
        "Authentication token not found. Please login again."
      );

      return;
    }

    setLoading(true);

    try {

      const payload = {
        ...formData,

        schoolId: schoolId,

        studentClass: formData.class,

        siblings: siblings.filter(
          (sibling) =>
            sibling.siblingPresent ||
            sibling.siblingAdm ||
            sibling.siblingName ||
            sibling.siblingClass
        ),
      };

      delete payload.class;

      console.log(
        "Admission Payload:",
        payload
      );

      const response = await axios.post(
        "/api/admissions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Admission Saved:",
        response.data
      );

      alert("Admission Applied 🎉");

      setFormData(
        getInitialFormData()
      );

      setSiblings([
        {
          siblingPresent: false,
          siblingAdm: "",
          siblingName: "",
          siblingClass: "",
        },
      ]);

      setSameAddress(false);

      navigate("/admission/new_admission");

    } catch (error) {

      console.error(
        "Admission Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Admission failed ❌";

      alert(message);

    } finally {

      setLoading(false);

    }
  };

  /* =====================================================
     COMMON CLASSES
  ===================================================== */

  const inputClass =
    "form-control premium-input";

  const selectClass =
    "form-select premium-input";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <style>{`

        .admission-page {
          min-height: 100vh;
          padding-bottom: 30px;
        }

        .premium-breadcrumb {
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 22px;
          margin-bottom: 18px;
          border: 1px solid #e8eef7;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
          border-left: 5px solid #2563eb;
        }

        .premium-breadcrumb h4 {
          margin: 0;
          font-weight: 700;
          color: #172033;
        }

        .premium-breadcrumb p {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .premium-form-card {
          background: #ffffff;
          border: 1px solid #e5ebf4;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
          overflow: hidden;
        }

        .premium-topbar {
          padding: 20px 24px;
          border-bottom: 1px solid #edf1f7;
          background: linear-gradient(
            135deg,
            #ffffff,
            #f8fbff
          );

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .premium-topbar-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }

        .premium-topbar h5 {
          margin: 0;
          font-weight: 700;
          color: #172033;
        }

        .premium-topbar small {
          color: #64748b;
        }

        .premium-section {
          padding: 24px;
          border-bottom: 1px solid #edf1f7;
        }

        .premium-section:last-child {
          border-bottom: 0;
        }

        .premium-section-header {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 13px 16px;

          border-radius: 12px;
          margin-bottom: 22px;

          background: linear-gradient(
            135deg,
            #eff6ff,
            #f8fbff
          );

          border: 1px solid #dbeafe;
        }

        .section-icon {
          width: 38px;
          height: 38px;
          min-width: 38px;

          border-radius: 10px;

          background: #2563eb;
          color: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-section-header h5 {
          margin: 0;
          color: #1e3a8a;
          font-weight: 700;
          font-size: 16px;
        }

        .premium-section-header small {
          color: #64748b;
          font-size: 12px;
        }

        .premium-label {
          display: block;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .premium-input {
          min-height: 43px;

          border: 1px solid #d8e0eb;
          border-radius: 9px;

          background: #ffffff;
          color: #1e293b;

          font-size: 14px;
          padding: 9px 12px;

          transition: all 0.2s ease;

          box-shadow:
            0 1px 2px rgba(15, 23, 42, 0.02);
        }

        .premium-input:hover {
          border-color: #b9c8dc;
        }

        .premium-input:focus {
          border-color: #3b82f6;

          box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.10);

          outline: none;
        }

        .premium-input:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .premium-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .switch-box {
          min-height: 43px;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 7px 12px;

          border: 1px solid #d8e0eb;
          border-radius: 9px;

          background: #ffffff;
        }

        .switch-box input {
          width: 19px;
          height: 19px;

          accent-color: #2563eb;
          cursor: pointer;
        }

        .switch-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .sibling-card {
          border: 1px solid #e1e8f2;
          border-radius: 14px;

          padding: 18px;

          background: #fbfdff;

          margin-bottom: 15px;
        }

        .sibling-number {
          display: inline-flex;

          width: 30px;
          height: 30px;

          border-radius: 9px;

          background: #eff6ff;
          color: #2563eb;

          align-items: center;
          justify-content: center;

          font-weight: 700;
          font-size: 13px;

          margin-bottom: 12px;
        }

        .address-note {
          display: flex;
          align-items: center;
          gap: 8px;

          padding: 10px 13px;

          border-radius: 9px;

          background: #f0fdf4;
          color: #166534;

          border: 1px solid #bbf7d0;

          font-size: 13px;
          font-weight: 600;

          margin-bottom: 18px;
        }

        .premium-footer {
          padding: 20px 24px;

          background: #f8fafc;

          border-top: 1px solid #e7edf5;

          display: flex;
          justify-content: flex-end;

          gap: 10px;
        }

        .premium-btn {
          border-radius: 9px;

          padding: 10px 19px;

          font-weight: 600;
          font-size: 13px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          transition: all 0.2s ease;
        }

        .premium-btn-primary {
          background: #2563eb;
          color: white;

          border: 1px solid #2563eb;

          box-shadow:
            0 4px 12px rgba(37, 99, 235, 0.20);
        }

        .premium-btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: white;

          transform: translateY(-1px);
        }

        .premium-btn-secondary {
          background: #ffffff;
          color: #475569;

          border: 1px solid #cbd5e1;
        }

        .premium-btn-secondary:hover {
          background: #f8fafc;
          color: #1e293b;
        }

        .premium-btn-danger {
          background: #fff1f2;
          color: #dc2626;

          border: 1px solid #fecdd3;
        }

        .premium-btn-danger:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        .premium-btn-add {
          background: #eff6ff;
          color: #2563eb;

          border: 1px solid #bfdbfe;
        }

        .premium-btn-add:hover {
          background: #dbeafe;
        }

        .required-info {
          font-size: 12px;
          color: #64748b;
        }

        @media (max-width: 767px) {

          .admission-page {
            padding: 0 5px 20px;
          }

          .premium-section {
            padding: 16px;
          }

          .premium-topbar {
            padding: 16px;
          }

          .premium-footer {
            padding: 16px;

            flex-direction: column-reverse;
          }

          .premium-footer button {
            width: 100%;
          }

          .premium-breadcrumb {
            margin: 8px 0 15px;
          }

        }

      `}</style>

      <div className="admission-page">

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
                    <LuBook size={27} />
                  </div>

                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Add New Admissions
                    </h5>

                    <div className="text-muted small">
                      New Admissions
                      &nbsp;/&nbsp;
                      Add New Admissions
                    </div>

                  </div>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <button
                    type="button"
                    className="premium-btn premium-btn-secondary rounded-4"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
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

                borderTop:
                  "1px solid #e0ecff",
              }}
            >

              <small className="text-muted">

                Home
                &nbsp;›&nbsp;
                New Admissions
                &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Add Student
                </span>

              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            MAIN FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="px-2"
        >

          <div className="premium-form-card shadow rounded-4">

            {/* =====================================================
                TOP BAR
            ===================================================== */}

            <div className="premium-topbar">

              <div className="premium-topbar-title">

                <div className="top-icon">
                  <FaUser />
                </div>

                <div>

                  <h5>
                    Student Admission Form
                  </h5>

                  <small>
                    Enter complete student and parent information
                  </small>

                </div>

              </div>

              <span className="required-info">

                <span className="text-danger">
                  *
                </span>

                {" "}Required fields

              </span>

            </div>

            {/* =====================================================
                ADMISSION DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaFileAlt />}
                title="Admission Details"
                subtitle="Basic admission and academic information"
              />

              <div className="row">

                <Field
                  label="Joining Academic Year"
                  name="academicYear"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Academic Year
                    </option>

                    <option value="2026-27">
                      2026-2027
                    </option>

                    <option value="2025-26">
                      2025-2026
                    </option>

                    <option value="2024-25">
                      2024-2025
                    </option>

                    <option value="2023-24">
                      2023-2024
                    </option>

                    <option value="2022-23">
                      2022-2023
                    </option>

                    <option value="2021-22">
                      2021-2022
                    </option>

                  </select>

                </Field>

                <Field
                  label="Enter Date"
                  name="today"
                  type="date"
                  required
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Invoice No"
                  name="invoice"
                  placeholder="Enter invoice number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Admission Type"
                  name="academicType"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="academicType"
                    value={formData.academicType}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Admission Type
                    </option>

                    <option value="newAdmission">
                      New Admission
                    </option>

                  </select>

                </Field>

              </div>

            </div>

            {/* =====================================================
                STUDENT DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Student Details"
                subtitle="Personal information of the student"
              />

              <div className="row">

                <Field
                  label="First Name"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Middle Name"
                  name="middleName"
                  placeholder="Enter middle name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Gender"
                  name="gender"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="gender"
                    value={formData.gender}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="NA">
                      Not Applicable
                    </option>

                  </select>

                </Field>

                <Field
                  label="Date Of Birth"
                  name="dob"
                  type="date"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Aadhar Card No"
                  name="aadharNo"
                  maxLength={12}
                  placeholder="12 digit Aadhar number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Nationality"
                  name="nationality"
                  placeholder="Indian"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mother Tongue"
                  name="motherTongue"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Religion"
                  name="religion"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Category"
                  name="category"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="category"
                    value={formData.category}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="obc">
                      OBC
                    </option>

                    <option value="general">
                      General
                    </option>

                    <option value="ebc">
                      EBC
                    </option>

                    <option value="sc">
                      SC
                    </option>

                    <option value="st">
                      ST
                    </option>

                  </select>

                </Field>

                <Field
                  label="Caste"
                  name="caste"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Blood Group"
                  name="bloodGroup"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Blood Group
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>

                  </select>

                </Field>

                <Field
                  label="Class to which admission is sought"
                  name="class"
                  required
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="class"
                    value={formData.class}
                    className={selectClass}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Class
                    </option>

                    {standards.map((std) => (

                      <option
                        key={std.value}
                        value={std.value}
                      >
                        {std.label}
                      </option>

                    ))}

                  </select>

                </Field>

                <Field
                  label="Age as on 1st June"
                  name="age"
                  placeholder="e.g. 5 Years"
                  formData={formData}
                  handleChange={handleChange}
                />

                <div className="col-xl-4 col-md-6 mb-3">

                  <label className="premium-label">
                    Transport Required
                  </label>

                  <div className="switch-box">

                    <input
                      type="checkbox"
                      name="transportRequired"
                      checked={
                        formData.transportRequired ===
                        "yes"
                      }
                      onChange={handleChange}
                    />

                    <span className="switch-label">

                      {formData.transportRequired ===
                      "yes"
                        ? "Yes, transport required"
                        : "No, transport not required"}

                    </span>

                    <FaBus
                      className="ms-auto"
                      style={{
                        color:
                          formData.transportRequired ===
                          "yes"
                            ? "#2563eb"
                            : "#94a3b8",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                CONTACT DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUsers />}
                title="Contact Details"
                subtitle="Student communication information"
              />

              <div className="row">

                <Field
                  label="Email For Correspondence"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Preferred Mobile No. for SMS"
                  name="preferredNo"
                  placeholder="10 digit mobile number"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Alternate Mobile No. for SMS"
                  name="alternateNo"
                  placeholder="10 digit mobile number"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FEE DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMoneyBillWave />}
                title="Fee Details"
                subtitle="Fee category and batch information"
              />

              <div className="row">

                <Field
                  label="Fee Category"
                  name="feeCategory"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="feeCategory"
                    value={formData.feeCategory}
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Fee Category
                    </option>

                    <option value="General">
                      General
                    </option>

                    <option value="Concession">
                      Concession
                    </option>

                    <option value="Ex-Student">
                      Ex-Student
                    </option>

                    <option value="Staff Child">
                      Staff Child
                    </option>

                  </select>

                </Field>

                {formData.feeCategory && (

                  <Field
                    label="Fee Batch"
                    name="feeBatch"
                    formData={formData}
                    handleChange={handleChange}
                  >

                    <select
                      name="feeBatch"
                      value={formData.feeBatch}
                      onChange={handleChange}
                      className={selectClass}
                    >

                      <option value="">
                        Select Fee Batch
                      </option>

                      {batches.map((batch) => (

                        <option
                          key={batch}
                          value={batch}
                        >
                          {batch}
                        </option>

                      ))}

                    </select>

                  </Field>

                )}

              </div>

            </div>

            {/* =====================================================
                SIBLING DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUsers />}
                title="Sibling Details"
                subtitle="Add siblings currently studying in the school"
              />

              {siblings.map(
                (sibling, index) => (

                  <div
                    className="sibling-card"
                    key={index}
                  >

                    <span className="sibling-number">
                      {index + 1}
                    </span>

                    <div className="row">

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling In School
                        </label>

                        <div className="switch-box">

                          <input
                            type="checkbox"
                            name="siblingPresent"
                            checked={
                              sibling.siblingPresent
                            }
                            onChange={(e) =>
                              handleSiblingChange(
                                index,
                                e
                              )
                            }
                          />

                          <span className="switch-label">

                            {sibling.siblingPresent
                              ? "Yes"
                              : "No"}

                          </span>

                        </div>

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Admission No
                        </label>

                        <input
                          type="text"
                          name="siblingAdm"
                          value={
                            sibling.siblingAdm
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Admission number"
                        />

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Name
                        </label>

                        <input
                          type="text"
                          name="siblingName"
                          value={
                            sibling.siblingName
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Sibling name"
                        />

                      </div>

                      <div className="col-xl-3 col-md-6 mb-3">

                        <label className="premium-label">
                          Sibling Class
                        </label>

                        <input
                          type="text"
                          name="siblingClass"
                          value={
                            sibling.siblingClass
                          }
                          className={inputClass}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              e
                            )
                          }
                          disabled={
                            !sibling.siblingPresent
                          }
                          placeholder="Class"
                        />

                      </div>

                    </div>

                    {siblings.length > 1 && (

                      <button
                        type="button"
                        className="premium-btn premium-btn-danger"
                        onClick={() =>
                          handleRemoveSibling(
                            index
                          )
                        }
                      >

                        <FaTrash />
                        Remove Sibling

                      </button>

                    )}

                  </div>

                )
              )}

              <button
                type="button"
                className="premium-btn premium-btn-add"
                onClick={
                  handleAddMoreSiblings
                }
              >

                <FaPlus />
                Add More Sibling

              </button>

            </div>

            {/* =====================================================
                CORRESPONDENCE ADDRESS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMapMarkerAlt />}
                title="Correspondence Address"
                subtitle="Current residential address of the student"
              />

              <div className="row">

                <Field
                  label="House No"
                  name="houseNo"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Street"
                  name="street"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Post / Zip Code"
                  name="zip"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Area"
                  name="area"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Town"
                  name="town"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="City"
                  name="city"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="State"
                  name="state"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Country"
                  name="country"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                PERMANENT ADDRESS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaMapMarkerAlt />}
                title="Permanent Address"
                subtitle="Permanent residential address"
              />

              <div className="address-note">

                <FaCheck />

                <span>
                  Check the option below if permanent
                  address is same as correspondence address.
                </span>

              </div>

              <div className="row">

                <div className="col-12 mb-3">

                  <div className="switch-box">

                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={
                        handleSameAddress
                      }
                    />

                    <span className="switch-label">
                      Yes, permanent address is same as
                      correspondence address
                    </span>

                  </div>

                </div>

                <Field
                  label="House No"
                  name="permanentHouseNo"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Street"
                  name="permanentStreet"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Post / Zip Code"
                  name="permanentZip"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Area"
                  name="permanentArea"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Town"
                  name="permanentTown"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="City"
                  name="permanentCity"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="State"
                  name="permanentState"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Country"
                  name="permanentCountry"
                  disabled={sameAddress}
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FATHER DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Father Details"
                subtitle="Father / primary parent information"
              />

              <div className="row">

                <Field
                  label="Father Name"
                  name="fatherName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="fatherLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="fatherMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="fatherEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Father Aadhar Card No"
                  name="fatherAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="fatherEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="fatherEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="fatherEducationType"
                    value={
                      formData.fatherEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="fatherSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="fatherJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="fatherOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="fatherOccupation"
                    value={
                      formData.fatherOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="fatherOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="fatherOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                MOTHER DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Mother Details"
                subtitle="Mother / secondary parent information"
              />

              <div className="row">

                <Field
                  label="Mother Name"
                  name="motherName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="motherLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="motherMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="motherEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mother Aadhar Card No"
                  name="motherAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="motherEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="motherEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="motherEducationType"
                    value={
                      formData.motherEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="motherSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="motherJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="motherOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="motherOccupation"
                    value={
                      formData.motherOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="motherOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="motherOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                GUARDIAN DETAILS
            ===================================================== */}

            <div className="premium-section">

              <SectionHeader
                icon={<FaUser />}
                title="Guardian Details"
                subtitle="Guardian information, if applicable"
              />

              <div className="row">

                <Field
                  label="Guardian Name"
                  name="guardianName"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Landline"
                  name="guardianLandline"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Mobile"
                  name="guardianMobile"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Email"
                  name="guardianEmail"
                  type="email"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Guardian Aadhar Card No"
                  name="guardianAadhar"
                  maxLength={12}
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education"
                  name="guardianEducation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Education Type"
                  name="guardianEducationType"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="guardianEducationType"
                    value={
                      formData.guardianEducationType
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="private">
                      Private
                    </option>

                    <option value="public">
                      Public
                    </option>

                    <option value="business">
                      Business
                    </option>

                  </select>

                </Field>

                <Field
                  label="Specialisation"
                  name="guardianSpecialisation"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Job Type"
                  name="guardianJobType"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Occupation"
                  name="guardianOccupation"
                  formData={formData}
                  handleChange={handleChange}
                >

                  <select
                    name="guardianOccupation"
                    value={
                      formData.guardianOccupation
                    }
                    className={selectClass}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="engineer">
                      Engineer
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="businessman">
                      Businessman
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="governmentJob">
                      Government Job
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </Field>

                <Field
                  label="Organization Name"
                  name="guardianOrganization"
                  formData={formData}
                  handleChange={handleChange}
                />

                <Field
                  label="Organization Address"
                  name="guardianOrganizationAddress"
                  formData={formData}
                  handleChange={handleChange}
                />

              </div>

            </div>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <div className="premium-footer">

              <button
                type="button"
                className="premium-btn premium-btn-secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >

                <FaArrowLeft />

                Cancel

              </button>

              <button
                type="submit"
                className="premium-btn premium-btn-primary"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="spinner-border spinner-border-sm" />

                    Submitting...
                  </>

                ) : (

                  <>
                    <FaSave />

                    Submit Admission
                  </>

                )}

              </button>

            </div>

          </div>

        </form>

      </div>
    </>
  );
};

export default AdmissionForm;

