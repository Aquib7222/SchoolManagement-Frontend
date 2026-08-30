// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdmissionEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     studentClass: "",
//     academicYear: "",
//     academicType: "",
//     gender: "",
//     mobile: "",
//   });

//   // 🔁 Fetch admission
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/admissions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setFormData(res.data))
//       .catch(() => alert("Failed to load admission"));
//   }, [id]);

//   // ✏️ Handle input
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔄 Update admission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(
//         `http://localhost:8080/api/admissions/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Admission updated successfully");
//       navigate("/admissions");
//     } catch (err) {
//       alert(err.response?.data || "Update failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Edit Admission</h3>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="form-control mb-2"
//         />

//         <input
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="form-control mb-2"
//         />

//         <input
//           name="studentClass"
//           value={formData.studentClass}
//           onChange={handleChange}
//           placeholder="Class"
//           className="form-control mb-2"
//         />

//         <input
//           name="academicYear"
//           value={formData.academicYear}
//           onChange={handleChange}
//           placeholder="Academic Year"
//           className="form-control mb-2"
//         />

//         <select
//           name="academicType"
//           value={formData.academicType}
//           onChange={handleChange}
//           className="form-control mb-2"
//         >
//           <option value="">Select Type</option>
//           <option value="CBSE">CBSE</option>
//           <option value="ICSE">ICSE</option>
//           <option value="STATE">STATE</option>
//         </select>

//         <input
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="form-control mb-2"
//         />

//         <button className="btn btn-primary">Update Admission</button>
//       </form>
//     </div>
//   );
// };

// export default AdmissionEdit;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const EditAdmissionForm = () => {
//   const { id } = useParams();
//   console.log("ID",id);
//   const navigate = useNavigate();
//   const token =localStorage.getItem("token");

//   const [formData, setFormData] = useState({
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
//     section: "",
//     age: "",
//     alternateNo: "",
//     email: "",
//     feeCategory: "",
//     preferredNo: "",
//     siblingAdm: "",
//     siblingPresent: "",
//     siblingClass: "",
//     fatherName: "",
//     fatherAadhar: "",
//     fatherEducation: "",
//     fatherEducationType: "",
//     fatherEmail: "",
//     fatherImage: "",
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
//     motherImage: "",
//     motherJobType: "",
//     motherLandline: "",
//     motherMobile: "",
//     motherOccupation: "",
//     motherOrganization: "",
//     motherOrganizationAddress: "",
//     motherSpecialisation: "",
//     studentImage: "",
//     guardianImage: "",
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
//   // 🔁 Fetch admission
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/admissions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setFormData(res.data))
//       .catch(() => alert("Failed to load admission"));
//   });

//   console.log("Form",formData);
//   // ✏️ Handle input
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🔄 Update admission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(
//         `http://localhost:8080/api/admissions/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Admission updated successfully");
//       navigate("/admissions");
//     } catch (err) {
//       alert(err.response?.data || "Update failed");
//     }
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
//           <strong>Edit Admission Details</strong>
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
//                 Edit Admission Details
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div
//           className=" mt-4 rounded ms-2 p-4 mb-3 me-2"
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
//                 <option value="Nursery">Nursery</option>
//                 <option value="Lkg">LKG</option>
//                 <option value="Ukg">UKG</option>
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

//             {/* section assign  */}
//             <div className="col-md-4 ">
//               <label>Section</label>
//               <select
//                 name="section"
//                 value={formData.section}
//                 id=""
//                 className="w-100 p-2 rounded"
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//                 <option value="D">C</option>
//                 <option value="E">D</option>
//                 <option value="F">E</option>
//               </select>
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
//               <label>Alternate Mobile No. for SMS: </label>
//               <input
//                 type="text"
//                 name="alternateNo"
//                 value={formData.alternateNo}
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
//               <label>Post/Zip Code</label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
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
//               <label>Post/Zip Code</label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
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
//           <div
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
//           </div>

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

// export default EditAdmissionForm;







import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaUserTie,
  FaFemale,
  FaImage,
  FaPlus,
  FaTrash,
  FaIdCard,
} from "react-icons/fa";

const EditAdmissionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    academicYear: "",
    academicType: "",
    invoice: "",
    today: "",

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
    section: "",
    age: "",

    alternateNo: "",
    email: "",
    feeCategory: "",
    preferredNo: "",

    siblingAdm: "",
    siblingPresent: false,
    siblingClass: "",
    siblingName: "",

    fatherName: "",
    fatherAadhar: "",
    fatherEducation: "",
    fatherEducationType: "",
    fatherEmail: "",
    fatherImage: "",
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
    motherImage: "",
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
    guardianImage: "",
    guardianJobType: "",
    guardianLandline: "",
    guardianMobile: "",
    guardianOccupation: "",
    guardianOrganization: "",
    guardianOrganizationAddress: "",
    guardianSpecialisation: "",

    studentImage: "",

    correspondenceHouseNo: "",
    correspondenceZip: "",
    correspondenceStreet: "",
    correspondenceArea: "",
    correspondenceTown: "",
    correspondenceCity: "",
    correspondenceState: "",
    correspondenceCountry: "",

    permanentHouseNo: "",
    permanentZip: "",
    permanentStreet: "",
    permanentArea: "",
    permanentTown: "",
    permanentCity: "",
    permanentState: "",
    permanentCountry: "",
  });

  const [siblings, setSiblings] = useState([
    {
      siblingPresent: false,
      siblingAdm: "",
      siblingName: "",
      siblingClass: "",
    },
  ]);

  // =========================================================
  // FETCH ADMISSION
  // =========================================================
  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:8080/api/admissions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        setFormData((prev) => ({
          ...prev,
          ...data,

          // Handle possible backend naming
          siblingPresent:
            data.siblingPresent === true ||
            data.siblingPresent === "true" ||
            data.siblingPresent === "yes",

          transportRequired:
            data.transportRequired === true ||
            data.transportRequired === "true"
              ? "yes"
              : data.transportRequired || "no",
        }));

        // If backend sends siblings array
        if (Array.isArray(data.siblings) && data.siblings.length > 0) {
          setSiblings(data.siblings);
        } else if (
          data.siblingAdm ||
          data.siblingName ||
          data.siblingClass
        ) {
          setSiblings([
            {
              siblingPresent:
                data.siblingPresent === true ||
                data.siblingPresent === "true" ||
                data.siblingPresent === "yes",
              siblingAdm: data.siblingAdm || "",
              siblingName: data.siblingName || "",
              siblingClass: data.siblingClass || "",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load admission:", error);
        alert("Failed to load admission details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAdmission();
    }
  }, [id, token]);

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
  // CHECKBOX
  // =========================================================
  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // =========================================================
  // IMAGE
  // =========================================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    const name = e.target.name;

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // ADD SIBLING
  // =========================================================
  const handleAddMoreSiblings = () => {
    setSiblings((prev) => [
      ...prev,
      {
        siblingPresent: true,
        siblingAdm: "",
        siblingName: "",
        siblingClass: "",
      },
    ]);
  };

  // =========================================================
  // UPDATE SIBLING
  // =========================================================
  const handleSiblingChange = (index, field, value) => {
    setSiblings((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // =========================================================
  // DELETE SIBLING
  // =========================================================
  const handleDeleteSibling = (index) => {
    setSiblings((prev) => {
      if (prev.length === 1) {
        return [
          {
            siblingPresent: false,
            siblingAdm: "",
            siblingName: "",
            siblingClass: "",
          },
        ];
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // UPDATE ADMISSION
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        siblings: siblings.filter(
          (item) =>
            item.siblingAdm ||
            item.siblingName ||
            item.siblingClass
        ),
      };

      await axios.put(
        `http://localhost:8080/api/admissions/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Admission updated successfully.");
      navigate("/admissions");
    } catch (error) {
      console.error("Update error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Admission update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{ color: "#1e3a8a" }}
          ></div>
          <p className="mt-3 text-muted">
            Loading admission details...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // REUSABLE STYLES
  // =========================================================
  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #dbe3ef",
    minHeight: "42px",
    fontSize: "14px",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "6px",
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "15px",
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
            padding: "20px 24px",
            color: "#fff",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="d-flex align-items-center gap-2">
                <FaUser size={18} />
                <h5 className="mb-0 fw-bold">
                  Edit Admission Details
                </h5>
              </div>

              <div className="mt-2">
                <span
                  style={{
                    fontSize: "13px",
                    opacity: 0.9,
                  }}
                >
                  Home / Admissions / Edit Admission
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admissions")}
              className="btn btn-light d-flex align-items-center gap-2"
              style={{
                borderRadius: "8px",
                fontWeight: "600",
                color: "#1e3a8a",
              }}
            >
              <FaArrowLeft />
              Back
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* =====================================================
            ADMISSION INFORMATION
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaIdCard />
            </div>
            <div>
              <h6>Admission Information</h6>
              <small>Basic admission and academic details</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Joining Academic Year
                </label>

                <select
                  name="academicYear"
                  value={formData.academicYear || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Academic Year</option>
                  <option value="2026-27">2026-2027</option>
                  <option value="2025-26">2025-2026</option>
                  <option value="2024-25">2024-2025</option>
                  <option value="2023-24">2023-2024</option>
                  <option value="2022-23">2022-2023</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Enter Date</label>
                <input
                  type="date"
                  name="today"
                  value={formData.today || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Invoice No</label>
                <input
                  type="text"
                  name="invoice"
                  value={formData.invoice || ""}
                  className="form-control"
                  style={inputStyle}
                  placeholder="Enter invoice number"
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Admission Type</label>
                <select
                  name="academicType"
                  value={formData.academicType || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Admission Type</option>
                  <option value="newAdmission">
                    New Admission
                  </option>
                  <option value="transfer">
                    Transfer Admission
                  </option>
                  <option value="reAdmission">
                    Re-Admission
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            STUDENT DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaUser />
            </div>
            <div>
              <h6>Student Details</h6>
              <small>Personal information of the student</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                  placeholder="Enter middle name"
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="NA">Not Applicable</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Aadhar Card No</label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo || ""}
                  className="form-control"
                  style={inputStyle}
                  maxLength={12}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Mother Tongue</label>
                <input
                  type="text"
                  name="motherTongue"
                  value={formData.motherTongue || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Category</label>
                <select
                  name="category"
                  value={formData.category || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="obc">OBC</option>
                  <option value="general">General</option>
                  <option value="ebc">EBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Caste</label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            ACADEMIC DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaUser />
            </div>
            <div>
              <h6>Academic & Contact Details</h6>
              <small>Class, section and communication details</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Transport Required
                </label>

                <div
                  className="form-control d-flex align-items-center"
                  style={inputStyle}
                >
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        formData.transportRequired === "yes" ||
                        formData.transportRequired === true
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          "transportRequired",
                          e.target.checked ? "yes" : "no"
                        )
                      }
                    />
                    <label className="form-check-label ms-2">
                      {formData.transportRequired === "yes"
                        ? "Yes"
                        : "No"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Class to which admission is sought
                </label>

                <select
                  name="class"
                  value={formData.class || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="Lkg">LKG</option>
                  <option value="Ukg">UKG</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="V">V</option>
                  <option value="VI">VI</option>
                  <option value="VII">VII</option>
                  <option value="VIII">VIII</option>
                  <option value="IX">IX</option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Section</label>

                <select
                  name="section"
                  value={formData.section || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Email for Correspondence
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Alternate Mobile No.
                </label>

                <input
                  type="text"
                  name="alternateNo"
                  value={formData.alternateNo || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Preferred Mobile No.
                </label>

                <input
                  type="text"
                  name="preferredNo"
                  value={formData.preferredNo || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Fee Category</label>

                <select
                  name="feeCategory"
                  value={formData.feeCategory || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Fee Category</option>
                  <option value="General">General</option>
                  <option value="Concession">Concession</option>
                  <option value="Ex-Student">
                    Ex-Student
                  </option>
                  <option value="Staff Child">
                    Staff Child
                  </option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Age as on 1st June
                </label>

                <input
                  type="text"
                  name="age"
                  value={formData.age || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SIBLING DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaUsers />
            </div>
            <div>
              <h6>Sibling Details</h6>
              <small>Sibling information in the school</small>
            </div>
          </div>

          <div className="card-body">
            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                checked={Boolean(formData.siblingPresent)}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setFormData((prev) => ({
                    ...prev,
                    siblingPresent: checked,
                  }));

                  setSiblings((prev) =>
                    prev.map((item) => ({
                      ...item,
                      siblingPresent: checked,
                    }))
                  );
                }}
              />

              <label className="form-check-label fw-semibold">
                Sibling studying in this school
              </label>
            </div>

            {formData.siblingPresent && (
              <>
                {siblings.map((sibling, index) => (
                  <div
                    className="sibling-box mb-3"
                    key={index}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong>
                        Sibling {index + 1}
                      </strong>

                      {siblings.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDeleteSibling(index)
                          }
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-lg-4 col-md-6">
                        <label style={labelStyle}>
                          Admission No
                        </label>

                        <input
                          type="text"
                          value={sibling.siblingAdm || ""}
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              "siblingAdm",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <label style={labelStyle}>
                          Sibling Name
                        </label>

                        <input
                          type="text"
                          value={sibling.siblingName || ""}
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              "siblingName",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <label style={labelStyle}>
                          Sibling Class
                        </label>

                        <input
                          type="text"
                          value={sibling.siblingClass || ""}
                          className="form-control"
                          style={inputStyle}
                          onChange={(e) =>
                            handleSiblingChange(
                              index,
                              "siblingClass",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={handleAddMoreSiblings}
                >
                  <FaPlus />
                  Add More Sibling
                </button>
              </>
            )}
          </div>
        </div>

        {/* =====================================================
            ADDRESS COMPONENT
        ====================================================== */}

        {/* CORRESPONDENCE */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h6>Correspondence Address</h6>
              <small>Current communication address</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>House No</label>
                <input
                  type="text"
                  name="correspondenceHouseNo"
                  value={
                    formData.correspondenceHouseNo || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Post / Zip Code
                </label>
                <input
                  type="text"
                  name="correspondenceZip"
                  value={formData.correspondenceZip || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Street</label>
                <input
                  type="text"
                  name="correspondenceStreet"
                  value={
                    formData.correspondenceStreet || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Area</label>
                <input
                  type="text"
                  name="correspondenceArea"
                  value={formData.correspondenceArea || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Town</label>
                <input
                  type="text"
                  name="correspondenceTown"
                  value={formData.correspondenceTown || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  name="correspondenceCity"
                  value={formData.correspondenceCity || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  name="correspondenceState"
                  value={formData.correspondenceState || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Country</label>
                <input
                  type="text"
                  name="correspondenceCountry"
                  value={
                    formData.correspondenceCountry || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* PERMANENT */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h6>Permanent Address</h6>
              <small>Permanent residential address</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>House No</label>
                <input
                  type="text"
                  name="permanentHouseNo"
                  value={formData.permanentHouseNo || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Post / Zip Code
                </label>
                <input
                  type="text"
                  name="permanentZip"
                  value={formData.permanentZip || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Street</label>
                <input
                  type="text"
                  name="permanentStreet"
                  value={formData.permanentStreet || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Area</label>
                <input
                  type="text"
                  name="permanentArea"
                  value={formData.permanentArea || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Town</label>
                <input
                  type="text"
                  name="permanentTown"
                  value={formData.permanentTown || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  name="permanentCity"
                  value={formData.permanentCity || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  name="permanentState"
                  value={formData.permanentState || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Country</label>
                <input
                  type="text"
                  name="permanentCountry"
                  value={formData.permanentCountry || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FATHER DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaUserTie />
            </div>
            <div>
              <h6>Father Details</h6>
              <small>Father / parent information</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Landline</label>
                <input
                  type="text"
                  name="fatherLandline"
                  value={formData.fatherLandline || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Mobile</label>
                <input
                  type="text"
                  name="fatherMobile"
                  value={formData.fatherMobile || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="fatherEmail"
                  value={formData.fatherEmail || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Father Aadhar Card
                </label>
                <input
                  type="text"
                  name="fatherAadhar"
                  value={formData.fatherAadhar || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Education</label>
                <input
                  type="text"
                  name="fatherEducation"
                  value={formData.fatherEducation || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Education Type
                </label>
                <select
                  name="fatherEducationType"
                  value={formData.fatherEducationType || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Specialisation
                </label>
                <input
                  type="text"
                  name="fatherSpecialisation"
                  value={
                    formData.fatherSpecialisation || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Job Type</label>
                <input
                  type="text"
                  name="fatherJobType"
                  value={formData.fatherJobType || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Occupation</label>
                <select
                  name="fatherOccupation"
                  value={formData.fatherOccupation || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="engineer">Engineer</option>
                  <option value="doctor">Doctor</option>
                  <option value="Businessman">
                    Businessman
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="governmentJob">
                    Government Job
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Name
                </label>
                <input
                  type="text"
                  name="fatherOrganization"
                  value={formData.fatherOrganization || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Address
                </label>
                <input
                  type="text"
                  name="fatherOrganizationAddress"
                  value={
                    formData.fatherOrganizationAddress || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOTHER DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaFemale />
            </div>
            <div>
              <h6>Mother Details</h6>
              <small>Mother / parent information</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Mother Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Landline</label>
                <input
                  type="text"
                  name="motherLandline"
                  value={formData.motherLandline || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Mobile</label>
                <input
                  type="text"
                  name="motherMobile"
                  value={formData.motherMobile || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="motherEmail"
                  value={formData.motherEmail || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Mother Aadhar Card
                </label>
                <input
                  type="text"
                  name="motherAadhar"
                  value={formData.motherAadhar || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Education</label>
                <input
                  type="text"
                  name="motherEducation"
                  value={formData.motherEducation || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Education Type
                </label>
                <select
                  name="motherEducationType"
                  value={formData.motherEducationType || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Specialisation
                </label>
                <input
                  type="text"
                  name="motherSpecialisation"
                  value={
                    formData.motherSpecialisation || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Job Type</label>
                <input
                  type="text"
                  name="motherJobType"
                  value={formData.motherJobType || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Occupation</label>
                <select
                  name="motherOccupation"
                  value={formData.motherOccupation || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="engineer">Engineer</option>
                  <option value="doctor">Doctor</option>
                  <option value="businessman">
                    Businessman
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="governmentJob">
                    Government Job
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Name
                </label>
                <input
                  type="text"
                  name="motherOrganization"
                  value={formData.motherOrganization || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Address
                </label>
                <input
                  type="text"
                  name="motherOrganizationAddress"
                  value={
                    formData.motherOrganizationAddress || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            GUARDIAN DETAILS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaUsers />
            </div>
            <div>
              <h6>Guardian Details</h6>
              <small>Guardian information</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Guardian Name</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Landline</label>
                <input
                  type="text"
                  name="guardianLandline"
                  value={formData.guardianLandline || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Mobile</label>
                <input
                  type="text"
                  name="guardianMobile"
                  value={formData.guardianMobile || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Guardian Aadhar
                </label>
                <input
                  type="text"
                  name="guardianAadhar"
                  value={formData.guardianAadhar || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Education</label>
                <input
                  type="text"
                  name="guardianEducation"
                  value={formData.guardianEducation || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Education Type
                </label>
                <select
                  name="guardianEducationType"
                  value={
                    formData.guardianEducationType || ""
                  }
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Specialisation
                </label>
                <input
                  type="text"
                  name="guardianSpecialisation"
                  value={
                    formData.guardianSpecialisation || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Job Type</label>
                <input
                  type="text"
                  name="guardianJobType"
                  value={formData.guardianJobType || ""}
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>Occupation</label>
                <select
                  name="guardianOccupation"
                  value={formData.guardianOccupation || ""}
                  className="form-select"
                  style={inputStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="engineer">Engineer</option>
                  <option value="doctor">Doctor</option>
                  <option value="businessman">
                    Businessman
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="governmentJob">
                    Government Job
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Name
                </label>
                <input
                  type="text"
                  name="guardianOrganization"
                  value={
                    formData.guardianOrganization || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label style={labelStyle}>
                  Organization Address
                </label>
                <input
                  type="text"
                  name="guardianOrganizationAddress"
                  value={
                    formData.guardianOrganizationAddress || ""
                  }
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PHOTOGRAPHS
        ====================================================== */}
        <div className="card border-0 shadow-sm mb-4 form-card">
          <div className="section-header">
            <div className="section-icon">
              <FaImage />
            </div>
            <div>
              <h6>Photographs</h6>
              <small>Upload student and parent photographs</small>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-4">
              {[
                {
                  name: "studentImage",
                  title: "Student",
                },
                {
                  name: "fatherImage",
                  title: "Father",
                },
                {
                  name: "motherImage",
                  title: "Mother",
                },
                {
                  name: "guardianImage",
                  title: "Guardian",
                },
              ].map((item) => (
                <div
                  className="col-xl-3 col-lg-6 col-md-6"
                  key={item.name}
                >
                  <div className="image-upload-card">
                    <div className="image-preview">
                      {formData[item.name] ? (
                        <img
                          src={formData[item.name]}
                          alt={item.title}
                        />
                      ) : (
                        <FaImage size={35} />
                      )}
                    </div>

                    <h6>{item.title}</h6>

                    <label className="upload-btn">
                      <FaImage />
                      Choose Image

                      <input
                        type="file"
                        name={item.name}
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            ACTION BUTTONS
        ====================================================== */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-end gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-light px-4"
                onClick={() => navigate("/admissions")}
                disabled={saving}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #dbe3ef",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn text-white px-4 d-flex align-items-center gap-2"
                disabled={saving}
                style={{
                  background:
                    "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  borderRadius: "8px",
                  minWidth: "160px",
                  justifyContent: "center",
                }}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Update Admission
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* =====================================================
          PAGE CSS
      ====================================================== */}
      <style>
        {`
          .form-card {
            border-radius: 12px;
            overflow: hidden;
          }

          .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px 20px;
            background: linear-gradient(
              135deg,
              #1e3a8a 0%,
              #2563eb 100%
            );
            color: white;
          }

          .section-header h6 {
            margin: 0;
            font-weight: 700;
            font-size: 15px;
          }

          .section-header small {
            opacity: 0.85;
            font-size: 12px;
          }

          .section-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
            border-radius: 9px;
            background: rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.12) !important;
          }

          .sibling-box {
            border: 1px solid #dbe3ef;
            border-radius: 10px;
            padding: 18px;
            background: #f8fafc;
          }

          .image-upload-card {
            border: 1px dashed #cbd5e1;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            background: #f8fafc;
            transition: 0.2s ease;
          }

          .image-upload-card:hover {
            border-color: #2563eb;
            background: #f1f5ff;
          }

          .image-preview {
            width: 105px;
            height: 105px;
            border-radius: 12px;
            margin: 0 auto 12px;
            background: #eaf0ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .image-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .image-upload-card h6 {
            font-weight: 700;
            color: #334155;
            margin-bottom: 12px;
          }

          .upload-btn {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 8px 14px;
            border-radius: 7px;
            background: #e8efff;
            color: #1e3a8a;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          }

          .upload-btn:hover {
            background: #dbe7ff;
          }

          @media (max-width: 768px) {
            .container-fluid {
              padding: 8px !important;
            }

            .section-header {
              padding: 13px 15px;
            }

            .card-body {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditAdmissionForm;