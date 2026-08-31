// import React from "react";

// const EditStudentModal = ({
//   show,
//   student,
//   setStudent,
//   onClose,
//   onSave,
//   setPhoto,
// }) => {
//   if (!show) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setStudent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         background: "rgba(0,0,0,.5)",
       
//       }}
//     >
//       <div className="modal-dialog modal-xl modal-dialog-scrollable " style={{marginTop:"65px"}}>
//         <div className="modal-content">
//           <div className="modal-header bg-primary text-white">
//             <h5>Edit Student</h5>

//             <button className="btn-close btn-close-white" onClick={onClose} />
//           </div>

//           <div className="modal-body">
//             {/* Student Information */}

//             <div className="card mb-3">
//               <div className="card-header bg-info text-white">
//                 Student Information
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-4 mb-3">
//                     <label>First Name</label>

//                     <input
//                       className="form-control"
//                       name="firstName"
//                       value={student.firstName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Middle Name</label>

//                     <input
//                       className="form-control"
//                       name="middleName"
//                       value={student.middleName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Last Name</label>

//                     <input
//                       className="form-control"
//                       name="lastName"
//                       value={student.lastName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Date Of Birth</label>

//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={student.dob || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Gender</label>

//                     <select
//                       className="form-select"
//                       name="gender"
//                       value={student.gender || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select</option>
//                       <option>Male</option>
//                       <option>Female</option>
//                       <option>Other</option>
//                     </select>
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Age</label>

//                     <input
//                       className="form-control"
//                       name="age"
//                       value={student.age || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Email</label>

//                     <input
//                       className="form-control"
//                       name="email"
//                       value={student.email || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Mobile</label>

//                     <input
//                       className="form-control"
//                       name="mobile"
//                       value={student.mobile || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Photo</label>

//                     <input
//                       type="file"
//                       className="form-control"
//                       onChange={(e) => setPhoto(e.target.files[0])}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Academic Information */}

//             <div className="card">
//               <div className="card-header bg-success text-white">
//                 Academic Information
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-4 mb-3">
//                     <label>Admission Number</label>

//                     <input
//                       className="form-control"
//                       value={student.admissionNumber || ""}
//                       readOnly
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Academic Year</label>

//                     <input
//                       className="form-control"
//                       name="academicYear"
//                       value={student.academicYear || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Class</label>

//                     <input
//                       className="form-control"
//                       name="studentClass"
//                       value={student.studentClass || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Section</label>

//                     <select
//                       className="form-select"
//                       name="section"
//                       value={student.section || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select</option>
//                       <option>A</option>
//                       <option>B</option>
//                       <option>C</option>
//                       <option>D</option>
//                     </select>
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Fee Category</label>

//                     <input
//                       className="form-control"
//                       name="feeCategory"
//                       value={student.feeCategory || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4 mb-3">
//                     <label>Fee Batch</label>

//                     <input
//                       className="form-control"
//                       name="feeBatch"
//                       value={student.feeBatch || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= Father Information ================= */}

//             <div className="card mt-3">
//               <div className="card-header bg-primary text-white">
//                 Father Information
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label>Father Name</label>
//                     <input
//                       className="form-control"
//                       name="fatherName"
//                       value={student.fatherName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Father Mobile</label>
//                     <input
//                       className="form-control"
//                       name="fatherMobile"
//                       value={student.fatherMobile || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Father Email</label>
//                     <input
//                       className="form-control"
//                       name="fatherEmail"
//                       value={student.fatherEmail || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Father Occupation</label>
//                     <input
//                       className="form-control"
//                       name="fatherOccupation"
//                       value={student.fatherOccupation || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= Mother Information ================= */}

//             <div className="card mt-3">
//               <div className="card-header bg-danger text-white">
//                 Mother Information
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label>Mother Name</label>
//                     <input
//                       className="form-control"
//                       name="motherName"
//                       value={student.motherName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Mother Mobile</label>
//                     <input
//                       className="form-control"
//                       name="motherMobile"
//                       value={student.motherMobile || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Mother Email</label>
//                     <input
//                       className="form-control"
//                       name="motherEmail"
//                       value={student.motherEmail || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label>Mother Occupation</label>
//                     <input
//                       className="form-control"
//                       name="motherOccupation"
//                       value={student.motherOccupation || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= Address Information ================= */}

//             <div className="card mt-3">
//               <div className="card-header bg-success text-white">
//                 Address Information
//               </div>

//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-3 mb-3">
//                     <label>House No</label>
//                     <input
//                       className="form-control"
//                       name="houseNo"
//                       value={student.houseNo || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>Street</label>
//                     <input
//                       className="form-control"
//                       name="street"
//                       value={student.street || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>Area</label>
//                     <input
//                       className="form-control"
//                       name="area"
//                       value={student.area || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>Town</label>
//                     <input
//                       className="form-control"
//                       name="town"
//                       value={student.town || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>City</label>
//                     <input
//                       className="form-control"
//                       name="city"
//                       value={student.city || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>State</label>
//                     <input
//                       className="form-control"
//                       name="state"
//                       value={student.state || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>Country</label>
//                     <input
//                       className="form-control"
//                       name="country"
//                       value={student.country || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3 mb-3">
//                     <label>Zip Code</label>
//                     <input
//                       className="form-control"
//                       name="zip"
//                       value={student.zip || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
         

//           {/* ================= Personal Information ================= */}

//           <div className="card mt-3">
//             <div className="card-header bg-warning">Personal Information</div>

//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4 mb-3">
//                   <label>Nationality</label>
//                   <input
//                     className="form-control"
//                     name="nationality"
//                     value={student.nationality || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Religion</label>
//                   <input
//                     className="form-control"
//                     name="religion"
//                     value={student.religion || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Category</label>
//                   <input
//                     className="form-control"
//                     name="category"
//                     value={student.category || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Caste</label>
//                   <input
//                     className="form-control"
//                     name="caste"
//                     value={student.caste || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Blood Group</label>
//                   <input
//                     className="form-control"
//                     name="bloodGroup"
//                     value={student.bloodGroup || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Mother Tongue</label>
//                   <input
//                     className="form-control"
//                     name="motherTongue"
//                     value={student.motherTongue || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Transport Required</label>

//                   <select
//                     className="form-select"
//                     name="transportRequired"
//                     value={student.transportRequired || ""}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select</option>
//                     <option value="YES">YES</option>
//                     <option value="NO">NO</option>
//                   </select>
//                 </div>

//                 <div className="col-md-4 mb-3">
//                   <label>Status</label>

//                   <select
//                     className="form-select"
//                     name="status"
//                     value={student.status || ""}
//                     onChange={handleChange}
//                   >
//                     <option value="CREATED">CREATED</option>
//                     <option value="ACTIVE">ACTIVE</option>
//                     <option value="INACTIVE">INACTIVE</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= Photo Preview ================= */}

//           <div className="card mt-3">
//             <div className="card-header bg-secondary text-white">
//               Student Photo
//             </div>

//             <div className="card-body text-center">
//               {student.photo && (
//                 <img
//                   src={`http://localhost:8080/uploads/${student.photo}`}
//                   alt="Student"
//                   className="img-thumbnail mb-3"
//                   style={{
//                     width: 170,
//                     height: 170,
//                     objectFit: "cover",
//                   }}
//                 />
//               )}

//               <input
//                 type="file"
//                 className="form-control"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//               />
//             </div>
//           </div>

//            </div>

//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Cancel
//             </button>

//             <button className="btn btn-success" onClick={onSave}>
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditStudentModal;


// import React from "react";

// const EditStudentModal = ({
//   show,
//   student,
//   setStudent,
//   onClose,
//   onSave,
//   setPhoto,
// }) => {
//   if (!show) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setStudent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];

//     if (file && setPhoto) {
//       setPhoto(file);
//     }
//   };

//   return (
//     <div
//       className="modal fade show"
//       style={{
//         display: "block",
//         backgroundColor: "rgba(15, 23, 42, 0.65)",
//         backdropFilter: "blur(3px)",
//         zIndex: 1055,
//       }}
//     >
//       <div
//         className="modal-dialog modal-xl modal-dialog-scrollable"
//         style={{
//           marginTop: "60px",
//           marginBottom: "20px",
//         }}
//       >
//         <div
//           className="modal-content border-0 shadow-lg"
//           style={{
//             borderRadius: "18px",
//             overflow: "hidden",
//           }}
//         >
//           {/* =====================================================
//               MODAL HEADER
//           ====================================================== */}
//           <div
//             className="modal-header text-white border-0"
//             style={{
//               background:
//                 "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
//               padding: "18px 22px",
//             }}
//           >
//             <div>
//               <h5 className="modal-title fw-bold mb-1">
//                 Edit Student
//               </h5>

//               <small className="text-white-50">
//                 Update student profile and academic information
//               </small>
//             </div>

//             <button
//               type="button"
//               className="btn-close btn-close-white"
//               onClick={onClose}
//             />
//           </div>

//           {/* =====================================================
//               MODAL BODY
//           ====================================================== */}
//           <div
//             className="modal-body bg-light"
//             style={{
//               padding: "20px",
//             }}
//           >
//             {/* =====================================================
//                 STUDENT INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-white border-0 rounded-top-4"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #2563eb, #1d4ed8)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Student Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   {/* First Name */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       First Name
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="firstName"
//                       value={student?.firstName || ""}
//                       onChange={handleChange}
//                       placeholder="Enter first name"
//                     />
//                   </div>

//                   {/* Middle Name */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Middle Name
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="middleName"
//                       value={student?.middleName || ""}
//                       onChange={handleChange}
//                       placeholder="Enter middle name"
//                     />
//                   </div>

//                   {/* Last Name */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Last Name
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="lastName"
//                       value={student?.lastName || ""}
//                       onChange={handleChange}
//                       placeholder="Enter last name"
//                     />
//                   </div>

//                   {/* DOB */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Date of Birth
//                     </label>

//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={student?.dob || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Gender */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Gender
//                     </label>

//                     <select
//                       className="form-select"
//                       name="gender"
//                       value={student?.gender || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   {/* Age */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Age
//                     </label>

//                     <input
//                       type="number"
//                       className="form-control"
//                       name="age"
//                       value={student?.age || ""}
//                       onChange={handleChange}
//                       placeholder="Enter age"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Email
//                     </label>

//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       value={student?.email || ""}
//                       onChange={handleChange}
//                       placeholder="Enter email"
//                     />
//                   </div>

//                   {/* Mobile */}
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Mobile
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="mobile"
//                       value={student?.mobile || ""}
//                       onChange={handleChange}
//                       placeholder="Enter mobile number"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 ACADEMIC INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-white border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #059669, #047857)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Academic Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   {/* Admission Number */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Admission Number
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control bg-light"
//                       value={student?.admissionNumber || ""}
//                       readOnly
//                     />
//                   </div>

//                   {/* Academic Year */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Academic Year
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="academicYear"
//                       value={student?.academicYear || ""}
//                       onChange={handleChange}
//                       placeholder="2026-2027"
//                     />
//                   </div>

//                   {/* Class */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Class
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="studentClass"
//                       value={student?.studentClass || ""}
//                       onChange={handleChange}
//                       placeholder="Enter class"
//                     />
//                   </div>

//                   {/* Section */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Section
//                     </label>

//                     <select
//                       className="form-select"
//                       name="section"
//                       value={student?.section || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Section</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                       <option value="D">D</option>
//                     </select>
//                   </div>

//                   {/* Fee Category */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Fee Category
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="feeCategory"
//                       value={student?.feeCategory || ""}
//                       onChange={handleChange}
//                       placeholder="Fee category"
//                     />
//                   </div>

//                   {/* Fee Batch */}
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Fee Batch
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="feeBatch"
//                       value={student?.feeBatch || ""}
//                       onChange={handleChange}
//                       placeholder="Fee batch"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 FATHER INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-white border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #7c3aed, #6d28d9)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Father Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Father's Name
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="fatherName"
//                       value={student?.fatherName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Father's Mobile
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="fatherMobile"
//                       value={student?.fatherMobile || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Father's Email
//                     </label>

//                     <input
//                       type="email"
//                       className="form-control"
//                       name="fatherEmail"
//                       value={student?.fatherEmail || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Father's Occupation
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="fatherOccupation"
//                       value={student?.fatherOccupation || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 MOTHER INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-white border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #e11d48, #be123c)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Mother Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Mother's Name
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="motherName"
//                       value={student?.motherName || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Mother's Mobile
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="motherMobile"
//                       value={student?.motherMobile || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Mother's Email
//                     </label>

//                     <input
//                       type="email"
//                       className="form-control"
//                       name="motherEmail"
//                       value={student?.motherEmail || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Mother's Occupation
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       name="motherOccupation"
//                       value={student?.motherOccupation || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 ADDRESS INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-white border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #0891b2, #0e7490)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Address Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       House No
//                     </label>

//                     <input
//                       className="form-control"
//                       name="houseNo"
//                       value={student?.houseNo || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       Street
//                     </label>

//                     <input
//                       className="form-control"
//                       name="street"
//                       value={student?.street || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       Area
//                     </label>

//                     <input
//                       className="form-control"
//                       name="area"
//                       value={student?.area || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       Town
//                     </label>

//                     <input
//                       className="form-control"
//                       name="town"
//                       value={student?.town || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       City
//                     </label>

//                     <input
//                       className="form-control"
//                       name="city"
//                       value={student?.city || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       State
//                     </label>

//                     <input
//                       className="form-control"
//                       name="state"
//                       value={student?.state || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       Country
//                     </label>

//                     <input
//                       className="form-control"
//                       name="country"
//                       value={student?.country || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">
//                       Zip Code
//                     </label>

//                     <input
//                       className="form-control"
//                       name="zip"
//                       value={student?.zip || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 PERSONAL INFORMATION
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4 mb-3">
//               <div
//                 className="card-header text-dark border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #fbbf24, #f59e0b)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Personal Information
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Nationality
//                     </label>

//                     <input
//                       className="form-control"
//                       name="nationality"
//                       value={student?.nationality || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Religion
//                     </label>

//                     <input
//                       className="form-control"
//                       name="religion"
//                       value={student?.religion || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Category
//                     </label>

//                     <input
//                       className="form-control"
//                       name="category"
//                       value={student?.category || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Caste
//                     </label>

//                     <input
//                       className="form-control"
//                       name="caste"
//                       value={student?.caste || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Blood Group
//                     </label>

//                     <input
//                       className="form-control"
//                       name="bloodGroup"
//                       value={student?.bloodGroup || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Mother Tongue
//                     </label>

//                     <input
//                       className="form-control"
//                       name="motherTongue"
//                       value={student?.motherTongue || ""}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Transport Required
//                     </label>

//                     <select
//                       className="form-select"
//                       name="transportRequired"
//                       value={student?.transportRequired || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select</option>
//                       <option value="YES">YES</option>
//                       <option value="NO">NO</option>
//                     </select>
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Status
//                     </label>

//                     <select
//                       className="form-select"
//                       name="status"
//                       value={student?.status || ""}
//                       onChange={handleChange}
//                     >
//                       <option value="CREATED">CREATED</option>
//                       <option value="ACTIVE">ACTIVE</option>
//                       <option value="INACTIVE">INACTIVE</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =====================================================
//                 PHOTO
//             ====================================================== */}
//             <div className="card border-0 shadow-sm rounded-4">
//               <div
//                 className="card-header text-white border-0"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #475569, #334155)",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   Student Photo
//                 </h6>
//               </div>

//               <div className="card-body">
//                 <div className="row align-items-center">
//                   <div className="col-md-4 text-center">
//                     {student?.photo ? (
//                       <img
//                         src={`http://localhost:8080/uploads/${student.photo}`}
//                         alt="Student"
//                         className="img-thumbnail shadow-sm"
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           objectFit: "cover",
//                           borderRadius: "12px",
//                         }}
//                       />
//                     ) : (
//                       <div
//                         className="d-flex justify-content-center align-items-center mx-auto"
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           borderRadius: "12px",
//                           backgroundColor: "#f1f5f9",
//                           color: "#64748b",
//                         }}
//                       >
//                         No Photo
//                       </div>
//                     )}
//                   </div>

//                   <div className="col-md-8">
//                     <label className="form-label fw-semibold">
//                       Change Student Photo
//                     </label>

//                     <input
//                       type="file"
//                       className="form-control"
//                       accept="image/*"
//                       onChange={handlePhotoChange}
//                     />

//                     <small className="text-muted d-block mt-2">
//                       Recommended: JPG, JPEG or PNG image.
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               MODAL FOOTER
//           ====================================================== */}
//           <div
//             className="modal-footer border-0 bg-white"
//             style={{
//               padding: "15px 20px",
//             }}
//           >
//             <button
//               type="button"
//               className="btn btn-outline-secondary px-4"
//               onClick={onClose}
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               className="btn btn-primary px-4"
//               onClick={onSave}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditStudentModal;

import React, { useEffect, useState } from "react";

const EditStudentModal = ({
  show,
  student,
  setStudent,
  onClose,
  onSave,
  setPhoto,
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!show) {
      setPreview(null);
      return;
    }

    setPreview(null);
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5 MB.");
      e.target.value = "";
      return;
    }

    if (setPhoto) {
      setPhoto(file);
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleClose = () => {
    setPreview(null);

    if (setPhoto) {
      setPhoto(null);
    }

    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(3px)",
        zIndex: 1055,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-scrollable"
        style={{
          marginTop: "60px",
          marginBottom: "20px",
        }}
      >
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div
            className="modal-header text-white border-0"
            style={{
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              padding: "18px 22px",
            }}
          >
            <div>
              <h5 className="modal-title fw-bold mb-1">
                Edit Student
              </h5>

              <small className="text-white-50">
                Update student profile and academic information
              </small>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            />
          </div>

          {/* =====================================================
              BODY
          ====================================================== */}

          <div
            className="modal-body bg-light"
            style={{
              padding: "20px",
            }}
          >
            {/* =====================================================
                STUDENT INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-white border-0 rounded-top-4"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Student Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      First Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={student?.firstName || ""}
                      onChange={handleChange}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Middle Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="middleName"
                      value={student?.middleName || ""}
                      onChange={handleChange}
                      placeholder="Enter middle name"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Last Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={student?.lastName || ""}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={student?.dob || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Gender
                    </label>

                    <select
                      className="form-select"
                      name="gender"
                      value={student?.gender || ""}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Gender
                      </option>
                      <option value="Male">
                        Male
                      </option>
                      <option value="Female">
                        Female
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Age
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={student?.age ?? ""}
                      onChange={handleChange}
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={student?.email || ""}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mobile
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={student?.mobile || ""}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                ACADEMIC INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-white border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #059669, #047857)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Academic Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Admission Number
                    </label>

                    <input
                      type="text"
                      className="form-control bg-light"
                      value={student?.admissionNumber || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Academic Year
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="academicYear"
                      value={student?.academicYear || ""}
                      onChange={handleChange}
                      placeholder="2026-2027"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Class
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="studentClass"
                      value={student?.studentClass || ""}
                      onChange={handleChange}
                      placeholder="Enter class"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Section
                    </label>

                    <select
                      className="form-select"
                      name="section"
                      value={student?.section || ""}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Section
                      </option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Fee Category
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="feeCategory"
                      value={student?.feeCategory || ""}
                      onChange={handleChange}
                      placeholder="Fee category"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Fee Batch
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="feeBatch"
                      value={student?.feeBatch || ""}
                      onChange={handleChange}
                      placeholder="Fee batch"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                FATHER INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-white border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed, #6d28d9)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Father Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Father's Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="fatherName"
                      value={student?.fatherName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Father's Mobile
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="fatherMobile"
                      value={student?.fatherMobile || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Father's Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="fatherEmail"
                      value={student?.fatherEmail || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Father's Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="fatherOccupation"
                      value={student?.fatherOccupation || ""}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                MOTHER INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-white border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #e11d48, #be123c)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Mother Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mother's Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="motherName"
                      value={student?.motherName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mother's Mobile
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="motherMobile"
                      value={student?.motherMobile || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mother's Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="motherEmail"
                      value={student?.motherEmail || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mother's Occupation
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="motherOccupation"
                      value={student?.motherOccupation || ""}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                ADDRESS INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-white border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0891b2, #0e7490)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Address Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      House No
                    </label>

                    <input
                      className="form-control"
                      name="houseNo"
                      value={student?.houseNo || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Street
                    </label>

                    <input
                      className="form-control"
                      name="street"
                      value={student?.street || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Area
                    </label>

                    <input
                      className="form-control"
                      name="area"
                      value={student?.area || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Town
                    </label>

                    <input
                      className="form-control"
                      name="town"
                      value={student?.town || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      className="form-control"
                      name="city"
                      value={student?.city || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      className="form-control"
                      name="state"
                      value={student?.state || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Country
                    </label>

                    <input
                      className="form-control"
                      name="country"
                      value={student?.country || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Zip Code
                    </label>

                    <input
                      className="form-control"
                      name="zip"
                      value={student?.zip || ""}
                      onChange={handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                PERSONAL INFORMATION
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div
                className="card-header text-dark border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24, #f59e0b)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Personal Information
                </h6>
              </div>

              <div className="card-body">
                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Nationality
                    </label>

                    <input
                      className="form-control"
                      name="nationality"
                      value={student?.nationality || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Religion
                    </label>

                    <input
                      className="form-control"
                      name="religion"
                      value={student?.religion || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Category
                    </label>

                    <input
                      className="form-control"
                      name="category"
                      value={student?.category || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Caste
                    </label>

                    <input
                      className="form-control"
                      name="caste"
                      value={student?.caste || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Blood Group
                    </label>

                    <input
                      className="form-control"
                      name="bloodGroup"
                      value={student?.bloodGroup || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Mother Tongue
                    </label>

                    <input
                      className="form-control"
                      name="motherTongue"
                      value={student?.motherTongue || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Transport Required
                    </label>

                    <select
                      className="form-select"
                      name="transportRequired"
                      value={student?.transportRequired || ""}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select
                      </option>

                      <option value="YES">
                        YES
                      </option>

                      <option value="NO">
                        NO
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={student?.status || ""}
                      onChange={handleChange}
                    >
                      <option value="CREATED">
                        CREATED
                      </option>

                      <option value="ACTIVE">
                        ACTIVE
                      </option>

                      <option value="INACTIVE">
                        INACTIVE
                      </option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                STUDENT PHOTO
            ====================================================== */}

            <div className="card border-0 shadow-sm rounded-4">
              <div
                className="card-header text-white border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #475569, #334155)",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  Student Photo
                </h6>
              </div>

              <div className="card-body">
                <div className="row align-items-center g-3">

                  {/* PHOTO PREVIEW */}

                  <div className="col-md-4 text-center">

                    {preview ? (
                      <img
                        src={preview}
                        alt="New Student"
                        className="img-thumbnail shadow-sm"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : student?.studentImage ? (
                      <img
                        src={student.studentImage}
                        alt="Student"
                        className="img-thumbnail shadow-sm"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : student?.photo ? (
                      <img
                        src={`http://localhost:8080/uploads/${student.photo}`}
                        alt="Student"
                        className="img-thumbnail shadow-sm"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center mx-auto"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "12px",
                          backgroundColor: "#f1f5f9",
                          color: "#64748b",
                        }}
                      >
                        No Photo
                      </div>
                    )}

                  </div>

                  {/* FILE INPUT */}

                  <div className="col-md-8">

                    <label className="form-label fw-semibold">
                      Change Student Photo
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                    />

                    <small className="text-muted d-block mt-2">
                      Recommended: JPG, JPEG, PNG or WEBP.
                      Maximum size: 5 MB.
                    </small>

                    {preview && (
                      <div className="mt-2">
                        <span className="badge bg-success">
                          New photo selected
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <div
            className="modal-footer border-0 bg-white"
            style={{
              padding: "15px 20px",
            }}
          >
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={onSave}
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;