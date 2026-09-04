

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaPaperPlane,
//   FaRegUser,
  
  
// } from "react-icons/fa";
// import { FaArrowsRotate, FaArrowUpFromBracket } from "react-icons/fa6";
// import { IoMdSettings } from "react-icons/io";
// import { MdOutlineGridView } from "react-icons/md";
// import { SiAdguard } from "react-icons/si";

// const SuperAdminCreation = () => {
//   const token = localStorage.getItem("token");

//   const [selectedFile, setSelectedFile] = useState(null);

//   const [userGroup, setUserGroup] = useState([]);
//   const [schools, setSchools] = useState([]);

//   const [showPhoneOtp, setShowPhoneOtp] = useState(false);
//   const [showEmailOtp, setShowEmailOtp] = useState(false);

//   const [phoneOtp, setPhoneOtp] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");

//   const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
//   const [sendingEmailOtp, setSendingEmailOtp] = useState(false);

//   const [verifyingPhoneOtp, setVerifyingPhoneOtp] = useState(false);
//   const [verifyingEmailOtp, setVerifyingEmailOtp] = useState(false);

//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);

//   const [creatingUser, setCreatingUser] = useState(false);

//   const initialForm = {
//     schoolId: "",
//     fullName: "",
//     username: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhone: "",
//     dateOfBirth: "",
//     gender: "",
//     password: "",
//     confirmPassword: "",
//     securityQuestion: "",
//     securityAnswer: "",
//     address: "",
//     languagePreference: "",
//     timeZone: "",
//     note: "",
//     role: "",
//     accountStatus: true,
//     twoFactorAuthentication: false,
//     loginNotification: true,
//     userGroupId: "",
//   };

//   const [formData, setFormData] = useState(initialForm);

//   const securityQuestions = [
//     "What is your mother's maiden name?",
//     "What was the name of your first school?",
//     "What is your favorite place?",
//     "What was your childhood nickname?",
//   ];

//   const languages = [
//     { value: "ENGLISH", label: "English" },
//     { value: "HINDI", label: "Hindi" },
//   ];

//   const timeZones = [
//     {
//       value: "Asia/Kolkata",
//       label: "India Standard Time (IST) — UTC +05:30",
//     },
//     {
//       value: "Asia/Dubai",
//       label: "Gulf Standard Time (GST) — UTC +04:00",
//     },
//     {
//       value: "Asia/Dhaka",
//       label: "Bangladesh Standard Time — UTC +06:00",
//     },
//     {
//       value: "Asia/Singapore",
//       label: "Singapore Time — UTC +08:00",
//     },
//     {
//       value: "Asia/Tokyo",
//       label: "Japan Standard Time — UTC +09:00",
//     },
//   ];

//   const permissions = [
//     "All Modules Access",
//     "User & Role Management",
//     "System Settings",
//     "School Management",
//     "Reports & Analytics",
//     "System Configuration",
//   ];

//   useEffect(() => {
//     loadUserGroup();
//     loadSchools();
//   }, []);

//   const loadUserGroup = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/user-group/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUserGroup(res.data || []);
//     } catch (error) {
//       console.error("User group loading failed:", error);
//     }
//   };

//   const loadSchools = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/school/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSchools(res.data || []);
//     } catch (error) {
//       console.error("School loading failed:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "userGroupId") {
//       const selectedGroup = userGroup.find(
//         (group) => String(group.id) === String(value)
//       );

//       const selectedRole =
//         selectedGroup?.groupName ||
//         selectedGroup?.name ||
//         selectedGroup?.role ||
//         "";

//       setFormData((prev) => ({
//         ...prev,
//         userGroupId: value,
//         role: selectedRole,
//       }));

//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSwitchChange = (e) => {
//     const { name, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Profile picture must be less than 2MB.");
//       return;
//     }

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

//   const sendPhoneOtp = async () => {
//     if (formData.phoneNumber.length !== 10) {
//       alert("Please enter valid 10 digit phone number.");
//       return;
//     }

//     try {
//       setSendingPhoneOtp(true);

//       await axios.post(
//         "http://localhost:8080/api/otp/send-phone",
//         {
//           phone: formData.phoneNumber,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setShowPhoneOtp(true);
//       setPhoneOtp("");

//       alert(
//         "Phone OTP generated successfully.\nCheck your Spring Boot console."
//       );
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to generate phone OTP."
//       );
//     } finally {
//       setSendingPhoneOtp(false);
//     }
//   };

//   const verifyPhoneOtp = async () => {
//     if (phoneOtp.length !== 6) {
//       alert("Please enter 6 digit OTP.");
//       return;
//     }

//     try {
//       setVerifyingPhoneOtp(true);

//       await axios.post(
//         "http://localhost:8080/api/otp/verify-phone",
//         {
//           phone: formData.phoneNumber,
//           otp: phoneOtp,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setPhoneVerified(true);
//       setShowPhoneOtp(false);
//       setPhoneOtp("");

//       alert("Phone number verified successfully.");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Invalid phone OTP."
//       );
//     } finally {
//       setVerifyingPhoneOtp(false);
//     }
//   };

//   const sendEmailOtp = async () => {
//     if (!formData.email.trim()) {
//       alert("Please enter email address.");
//       return;
//     }

//     try {
//       setSendingEmailOtp(true);

//       await axios.post(
//         "http://localhost:8080/api/otp/send-email",
//         {
//           email: formData.email.trim(),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setShowEmailOtp(true);
//       setEmailOtp("");

//       alert(
//         "Email OTP generated successfully.\nCheck your Spring Boot console."
//       );
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to generate email OTP."
//       );
//     } finally {
//       setSendingEmailOtp(false);
//     }
//   };

//   const verifyEmailOtp = async () => {
//     if (emailOtp.length !== 6) {
//       alert("Please enter 6 digit OTP.");
//       return;
//     }

//     try {
//       setVerifyingEmailOtp(true);

//       await axios.post(
//         "http://localhost:8080/api/otp/verify-email",
//         {
//           email: formData.email.trim(),
//           otp: emailOtp,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setEmailVerified(true);
//       setShowEmailOtp(false);
//       setEmailOtp("");

//       alert("Email address verified successfully.");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Invalid email OTP."
//       );
//     } finally {
//       setVerifyingEmailOtp(false);
//     }
//   };

//   const createSuperAdmin = async () => {
//     if (!formData.schoolId) {
//       alert("Please select school.");
//       return;
//     }

//     if (!formData.fullName.trim()) {
//       alert("Please enter full name.");
//       return;
//     }

//     if (!formData.email.trim()) {
//       alert("Please enter email address.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     if (formData.phoneNumber.length !== 10) {
//       alert("Please enter valid 10 digit phone number.");
//       return;
//     }

//     if (!phoneVerified) {
//       alert("Please verify phone number first.");
//       return;
//     }

//     if (!emailVerified) {
//       alert("Please verify email address first.");
//       return;
//     }

//     if (!formData.dateOfBirth) {
//       alert("Please select date of birth.");
//       return;
//     }

//     if (!formData.gender) {
//       alert("Please select gender.");
//       return;
//     }

//     if (!formData.userGroupId) {
//       alert("Please select role.");
//       return;
//     }

//     if (!formData.password) {
//       alert("Please enter password.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       alert("Password must be at least 8 characters long.");
//       return;
//     }

//     if (!formData.confirmPassword) {
//       alert("Please confirm password.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("Password and confirm password do not match.");
//       return;
//     }

//     if (!formData.securityQuestion) {
//       alert("Please select security question.");
//       return;
//     }

//     if (!formData.securityAnswer.trim()) {
//       alert("Please enter security answer.");
//       return;
//     }

//     const selectedUserGroup = userGroup.find(
//       (group) =>
//         String(group.id) === String(formData.userGroupId)
//     );

//     if (!selectedUserGroup) {
//       alert("Selected role not found.");
//       return;
//     }

//     const selectedRole =
//       selectedUserGroup.groupName ||
//       selectedUserGroup.name ||
//       selectedUserGroup.role ||
//       "";

//     const payload = {
//       name: formData.fullName.trim(),
//       fullName: formData.fullName.trim(),

//       email: formData.email.trim(),

//       phone: formData.phoneNumber,
//       phoneNumber: formData.phoneNumber,

//       alternatePhone: formData.alternatePhone.trim(),

//       dateOfBirth: formData.dateOfBirth,
//       gender: formData.gender,

//       password: formData.password,
//       confirmPassword: formData.confirmPassword,

//       securityQuestion: formData.securityQuestion,
//       securityAnswer: formData.securityAnswer.trim(),

//       address: formData.address.trim(),

//       languagePreference:
//         formData.languagePreference || null,

//       timeZone: formData.timeZone || null,

//       note: formData.note.trim() || null,

//       role: selectedRole,

//       userGroupId: Number(formData.userGroupId),

//       status: formData.accountStatus
//         ? "Active"
//         : "Inactive",

//       accountStatus: formData.accountStatus,

//       twoFactorAuthentication:
//         formData.twoFactorAuthentication,

//       loginNotification:
//         formData.loginNotification,

//       phoneVerified,
//       emailVerified,
//     };

//     try {
//       setCreatingUser(true);

//       const response = await axios.post(
//         `http://localhost:8080/api/superadmin/create?schoolId=${formData.schoolId}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const generatedUsername =
//         response.data?.username ||
//         response.data?.user?.username ||
//         response.data?.data?.username;

//       if (generatedUsername) {
//         alert(
//           `Super Admin created successfully!\n\nUsername: ${generatedUsername}`
//         );
//       } else {
//         alert("Super Admin created successfully.");
//       }

//       resetForm();
//     } catch (error) {
//       console.error("Create Super Admin Error:", error);

//       const backendMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.response?.data;

//       alert(
//         backendMessage ||
//           "Failed to create Super Admin."
//       );
//     } finally {
//       setCreatingUser(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData(initialForm);

//     setPhoneOtp("");
//     setEmailOtp("");

//     setShowPhoneOtp(false);
//     setShowEmailOtp(false);

//     setPhoneVerified(false);
//     setEmailVerified(false);

//     setSelectedFile(null);
//   };

//   const SectionHeader = ({ icon, title, subtitle }) => (
//     <div className="admission-section-header">
//       <div className="admission-section-icon">
//         {icon}
//       </div>

//       <div>
//         <h5 className="mb-0 fw-bold">{title}</h5>

//         {subtitle && (
//           <small className="text-muted">
//             {subtitle}
//           </small>
//         )}
//       </div>
//     </div>
//   );

//   const Field = ({
//     label,
//     required = false,
//     children,
//   }) => (
//     <div className="mb-3">
//       <label className="form-label fw-semibold">
//         {label}
//         {required && (
//           <span className="text-danger ms-1">*</span>
//         )}
//       </label>

//       {children}
//     </div>
//   );

//   return (
//     <>
//       {/* PAGE HEADER */}
//       <div className="container-fluid px-2">
//         <div className="new-admission-header shadow">
//           <div>
//             <h4 className="fw-bold mb-1">
//               Create Super Admin
//             </h4>

//             <p className="text-muted mb-2">
//               Create a new super administrator account
//               for school management.
//             </p>

//             <nav>
//               <ol className="breadcrumb mb-0 small">
//                 <li className="breadcrumb-item">
//                   <a
//                     href="/"
//                     className="text-decoration-none text-dark"
//                   >
//                     Dashboard
//                   </a>
//                 </li>

//                 <li className="breadcrumb-item">
//                   Super Admin Management
//                 </li>

//                 <li className="breadcrumb-item active text-primary">
//                   Create Super Admin
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={() => window.history.back()}
//           >
//             <FaArrowLeft className="me-2" />
//             Back to List
//           </button>
//         </div>
//       </div>

//       {/* MAIN FORM */}
//       <div className="container-fluid px-2 mt-3 mb-4">
//         <div className="admission-form-wrapper">

//           {/* PERSONAL INFORMATION */}
//           <div className="admission-card">
//             <SectionHeader
//               icon={<FaRegUser />}
//               title="Personal Information"
//               subtitle="Enter basic administrator details"
//             />

//             <div className="admission-card-body">

//               <div className="row g-3">
//                 <div className="col-lg-4 col-md-6">
//                   <Field label="School" required>
//                     <select
//                       name="schoolId"
//                       className="form-select"
//                       value={formData.schoolId}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">
//                         Select School
//                       </option>

//                       {schools.map((school) => (
//                         <option
//                           key={school.id}
//                           value={school.id}
//                         >
//                           {school.schoolName ||
//                             school.name ||
//                             school.schoolCode}

//                           {school.schoolCode
//                             ? ` (${school.schoolCode})`
//                             : ""}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>

//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Full Name" required>
//                     <input
//                       type="text"
//                       name="fullName"
//                       className="form-control"
//                       placeholder="Enter full name"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>

//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Gender" required>
//                     <select
//                       name="gender"
//                       className="form-select"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">
//                         Select Gender
//                       </option>
//                       <option value="MALE">Male</option>
//                       <option value="FEMALE">
//                         Female
//                       </option>
//                       <option value="OTHER">
//                         Other
//                       </option>
//                     </select>
//                   </Field>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Date of Birth" required>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       className="form-control"
//                       value={formData.dateOfBirth}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>

//                 {/* EMAIL */}
//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Email Address" required>

//                     <div className="otp-wrapper">
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         placeholder="Enter email address"
//                         value={formData.email}
//                         disabled={emailVerified}
//                         onChange={(e) => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             email: e.target.value,
//                           }));

//                           setEmailVerified(false);
//                           setShowEmailOtp(false);
//                           setEmailOtp("");
//                         }}
//                       />

//                       <button
//                         type="button"
//                         className={`btn ${
//                           emailVerified
//                             ? "btn-success"
//                             : "btn-outline-primary"
//                         }`}
//                         disabled={
//                           sendingEmailOtp ||
//                           emailVerified ||
//                           !formData.email.trim()
//                         }
//                         onClick={sendEmailOtp}
//                       >
//                         {sendingEmailOtp ? (
//                           <span className="spinner-border spinner-border-sm" />
//                         ) : emailVerified ? (
//                           "Verified"
//                         ) : (
//                           <>
//                             <FaPaperPlane
//                               size={13}
//                               className="me-1"
//                             />
//                             OTP
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {showEmailOtp &&
//                       !emailVerified && (
//                         <div className="otp-verify-box mt-2">
//                           <div className="input-group">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter 6-digit OTP"
//                               maxLength={6}
//                               value={emailOtp}
//                               onChange={(e) =>
//                                 setEmailOtp(
//                                   e.target.value.replace(
//                                     /\D/g,
//                                     ""
//                                   )
//                                 )
//                               }
//                             />

//                             <button
//                               type="button"
//                               className="btn btn-outline-success"
//                               disabled={
//                                 verifyingEmailOtp ||
//                                 emailOtp.length !== 6
//                               }
//                               onClick={
//                                 verifyEmailOtp
//                               }
//                             >
//                               {verifyingEmailOtp ? (
//                                 <span className="spinner-border spinner-border-sm" />
//                               ) : (
//                                 "Verify"
//                               )}
//                             </button>
//                           </div>

//                           <small className="text-muted">
//                             OTP expires in 5 minutes.
//                           </small>
//                         </div>
//                       )}

//                     {emailVerified && (
//                       <small className="text-success fw-semibold">
//                         ✓ Email address verified
//                       </small>
//                     )}
//                   </Field>
//                 </div>

//                 {/* PHONE */}
//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Phone Number" required>

//                     <div className="otp-wrapper">
//                       <input
//                         type="text"
//                         name="phoneNumber"
//                         className="form-control"
//                         placeholder="Enter 10 digit phone no"
//                         maxLength={10}
//                         value={formData.phoneNumber}
//                         disabled={phoneVerified}
//                         onChange={(e) => {
//                           const value =
//                             e.target.value.replace(
//                               /\D/g,
//                               ""
//                             );

//                           setFormData((prev) => ({
//                             ...prev,
//                             phoneNumber: value,
//                           }));

//                           setPhoneVerified(false);
//                           setShowPhoneOtp(false);
//                           setPhoneOtp("");
//                         }}
//                       />

//                       <button
//                         type="button"
//                         className={`btn ${
//                           phoneVerified
//                             ? "btn-success"
//                             : "btn-outline-primary"
//                         }`}
//                         disabled={
//                           sendingPhoneOtp ||
//                           phoneVerified ||
//                           formData.phoneNumber.length !==
//                             10
//                         }
//                         onClick={sendPhoneOtp}
//                       >
//                         {sendingPhoneOtp ? (
//                           <span className="spinner-border spinner-border-sm" />
//                         ) : phoneVerified ? (
//                           "Verified"
//                         ) : (
//                           <>
//                             <FaPaperPlane
//                               size={13}
//                               className="me-1"
//                             />
//                             OTP
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {showPhoneOtp &&
//                       !phoneVerified && (
//                         <div className="otp-verify-box mt-2">
//                           <div className="input-group">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter 6-digit OTP"
//                               maxLength={6}
//                               value={phoneOtp}
//                               onChange={(e) =>
//                                 setPhoneOtp(
//                                   e.target.value.replace(
//                                     /\D/g,
//                                     ""
//                                   )
//                                 )
//                               }
//                             />

//                             <button
//                               type="button"
//                               className="btn btn-outline-success"
//                               disabled={
//                                 verifyingPhoneOtp ||
//                                 phoneOtp.length !== 6
//                               }
//                               onClick={
//                                 verifyPhoneOtp
//                               }
//                             >
//                               {verifyingPhoneOtp ? (
//                                 <span className="spinner-border spinner-border-sm" />
//                               ) : (
//                                 "Verify"
//                               )}
//                             </button>
//                           </div>

//                           <small className="text-muted">
//                             OTP expires in 5 minutes.
//                           </small>
//                         </div>
//                       )}

//                     {phoneVerified && (
//                       <small className="text-success fw-semibold">
//                         ✓ Phone number verified
//                       </small>
//                     )}
//                   </Field>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 <div className="col-lg-4 col-md-6">
//                   <Field label="Alternate Phone">
//                     <input
//                       type="text"
//                       name="alternatePhone"
//                       className="form-control"
//                       placeholder="Enter alternate phone"
//                       value={formData.alternatePhone}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>

//                 <div className="col-lg-8">
//                   <Field label="Profile Picture">
//                     <div className="upload-area">
//                       <FaArrowUpFromBracket
//                         size={28}
//                         className="text-primary mb-2"
//                       />

//                       <div className="fw-semibold">
//                         <span className="text-primary">
//                           Click to upload
//                         </span>{" "}
//                         <span className="text-muted">
//                           or drag and drop
//                         </span>
//                       </div>

//                       <small className="text-muted">
//                         JPG, PNG or SVG · Maximum 2MB ·
//                         Recommended 200 × 200 px
//                       </small>

//                       <input
//                         type="file"
//                         accept="image/png,image/jpeg,image/jpg,image/svg+xml"
//                         onChange={handleFileChange}
//                       />
//                     </div>

//                     {selectedFile && (
//                       <small className="text-success fw-semibold">
//                         ✓ {selectedFile.name}
//                       </small>
//                     )}
//                   </Field>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ROLE & PERMISSIONS */}
//           <div className="admission-card">
//             <SectionHeader
//               icon={<SiAdguard />}
//               title="Role & Permissions"
//               subtitle="Assign access level to the administrator"
//             />

//             <div className="admission-card-body">

//               <Field label="Assign Role" required>
//                 <select
//                   name="userGroupId"
//                   className="form-select"
//                   value={formData.userGroupId}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">
//                     Select Role
//                   </option>

//                   {userGroup.map((group) => (
//                     <option
//                       key={group.id}
//                       value={group.id}
//                     >
//                       {group.groupName ||
//                         group.name ||
//                         group.role}
//                     </option>
//                   ))}
//                 </select>
//               </Field>

//               <div className="permission-info">
//                 <strong>
//                   Super Admin Access
//                 </strong>

//                 <p className="mb-0 mt-1">
//                   Super admin will have full access to
//                   modules, menus, users and system
//                   settings.
//                 </p>
//               </div>

//               <div className="permission-grid">
//                 {permissions.map((permission) => (
//                   <div
//                     key={permission}
//                     className="permission-item"
//                   >
//                     <span>✓</span>
//                     {permission}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ACCOUNT INFORMATION */}
//           <div className="admission-card">
//             <SectionHeader
//               icon={<FaRegUser />}
//               title="Account Information"
//               subtitle="Configure login credentials and recovery"
//             />

//             <div className="admission-card-body">

//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <Field label="Password" required>
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       placeholder="Enter password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                     />

//                     <small className="text-muted">
//                       Minimum 8 characters.
//                     </small>
//                   </Field>
//                 </div>

//                 <div className="col-md-6">
//                   <Field
//                     label="Confirm Password"
//                     required
//                   >
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       className="form-control"
//                       placeholder="Confirm password"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <Field
//                     label="Security Question"
//                     required
//                   >
//                     <select
//                       name="securityQuestion"
//                       className="form-select"
//                       value={
//                         formData.securityQuestion
//                       }
//                       onChange={handleInputChange}
//                     >
//                       <option value="">
//                         Select security question
//                       </option>

//                       {securityQuestions.map(
//                         (question) => (
//                           <option
//                             key={question}
//                             value={question}
//                           >
//                             {question}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </Field>
//                 </div>

//                 <div className="col-md-6">
//                   <Field
//                     label="Security Answer"
//                     required
//                   >
//                     <input
//                       type="text"
//                       name="securityAnswer"
//                       className="form-control"
//                       placeholder="Enter security answer"
//                       value={
//                         formData.securityAnswer
//                       }
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* STATUS SETTINGS */}
//           <div className="admission-card">
//             <SectionHeader
//               icon={<IoMdSettings />}
//               title="Status & Settings"
//               subtitle="Configure account behaviour"
//             />

//             <div className="admission-card-body">

//               <ToggleRow
//                 label="Account Status"
//                 checked={formData.accountStatus}
//                 name="accountStatus"
//                 onChange={handleSwitchChange}
//                 activeText="Active"
//                 helper="Inactive accounts cannot login to the system."
//               />

//               <hr />

//               <ToggleRow
//                 label="Two Factor Authentication"
//                 checked={
//                   formData.twoFactorAuthentication
//                 }
//                 name="twoFactorAuthentication"
//                 onChange={handleSwitchChange}
//                 activeText="Enable Two Factor Authentication"
//                 helper="User will need verification codes at login."
//               />

//               <hr />

//               <ToggleRow
//                 label="Login Notification"
//                 checked={
//                   formData.loginNotification
//                 }
//                 name="loginNotification"
//                 onChange={handleSwitchChange}
//                 activeText="Send email notification on login"
//                 helper="Email notification will be sent when this admin logs in."
//               />
//             </div>
//           </div>

//           {/* ADDITIONAL INFORMATION */}
//           <div className="admission-card">
//             <SectionHeader
//               icon={<FaRegUser />}
//               title="Additional Information"
//               subtitle="Optional administrator information"
//             />

//             <div className="admission-card-body">

//               <div className="row g-3">
//                 <div className="col-lg-8">
//                   <Field label="Address">
//                     <textarea
//                       name="address"
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>

//                 <div className="col-lg-4">
//                   <Field label="Language Preference">
//                     <select
//                       name="languagePreference"
//                       className="form-select"
//                       value={
//                         formData.languagePreference
//                       }
//                       onChange={handleInputChange}
//                     >
//                       <option value="">
//                         Select Language
//                       </option>

//                       {languages.map((item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>
//               </div>

//               <div className="row g-3">
//                 <div className="col-lg-7">
//                   <Field label="Time Zone">
//                     <select
//                       name="timeZone"
//                       className="form-select"
//                       value={formData.timeZone}
//                       onChange={handleInputChange}
//                     >
//                       <option value="">
//                         Select Time Zone
//                       </option>

//                       {timeZones.map((item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>

//                 <div className="col-lg-5">
//                   <Field label="Note">
//                     <textarea
//                       name="note"
//                       className="form-control"
//                       rows="2"
//                       placeholder="Enter additional note"
//                       value={formData.note}
//                       onChange={handleInputChange}
//                     />
//                   </Field>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="form-footer">
//           <button
//             type="button"
//             className="btn btn-outline-secondary px-4"
//             onClick={resetForm}
//             disabled={creatingUser}
//           >
//             <FaArrowsRotate
//               size={14}
//               className="me-2"
//             />
//             Reset
//           </button>

//           <button
//             type="button"
//             className="btn btn-success px-4"
//             onClick={createSuperAdmin}
//             disabled={
//               creatingUser ||
//               !phoneVerified ||
//               !emailVerified
//             }
//           >
//             {creatingUser ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" />
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <MdOutlineGridView
//                   size={16}
//                   className="me-2"
//                 />
//                 Create Super Admin
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* CSS */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }

//         .new-admission-header {
//           background: #fff;
//           border-radius: 10px;
//           padding: 18px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 20px;
//           border: 1px solid #edf0f5;
//         }

//         .admission-form-wrapper {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .admission-card {
//           background: #fff;
//           border: 1px solid #e8ebf0;
//           border-radius: 10px;
//           overflow: hidden;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
//         }

//         .admission-section-header {
//           min-height: 68px;
//           padding: 14px 18px;
//           background: #fff;
//           border-bottom: 1px solid #edf0f4;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .admission-section-icon {
//           width: 38px;
//           height: 38px;
//           border-radius: 8px;
//           background: #0d6efd;
//           color: #fff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//           flex-shrink: 0;
//         }

//         .admission-card-body {
//           padding: 20px;
//         }

//         .form-label {
//           margin-bottom: 7px;
//           font-size: 14px;
//           color: #30343b;
//         }

//         .form-control,
//         .form-select {
//           min-height: 42px;
//           border-color: #dfe3e8;
//           border-radius: 7px;
//           font-size: 14px;
//           box-shadow: none !important;
//         }

//         textarea.form-control {
//           min-height: 90px;
//           resize: vertical;
//         }

//         .form-control:focus,
//         .form-select:focus {
//           border-color: #86b7fe;
//         }

//         .otp-wrapper {
//           display: flex;
//           width: 100%;
//         }

//         .otp-wrapper .form-control {
//           border-top-right-radius: 0;
//           border-bottom-right-radius: 0;
//         }

//         .otp-wrapper .btn {
//           min-width: 76px;
//           border-top-left-radius: 0;
//           border-bottom-left-radius: 0;
//         }

//         .otp-verify-box {
//           padding: 10px;
//           background: #f8fafc;
//           border: 1px solid #e8ebef;
//           border-radius: 7px;
//         }

//         .upload-area {
//           position: relative;
//           min-height: 130px;
//           border: 2px dashed #d7dce2;
//           border-radius: 9px;
//           background: #fafbfc;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           padding: 20px;
//           cursor: pointer;
//           overflow: hidden;
//           transition: 0.2s ease;
//         }

//         .upload-area:hover {
//           border-color: #0d6efd;
//           background: #f5f9ff;
//         }

//         .upload-area input {
//           position: absolute;
//           inset: 0;
//           opacity: 0;
//           width: 100%;
//           height: 100%;
//           cursor: pointer;
//         }

//         .permission-info {
//           padding: 14px 16px;
//           margin-top: 10px;
//           border-radius: 8px;
//           background: #f1f7ff;
//           border: 1px solid #d8e8ff;
//           color: #174a8b;
//           font-size: 14px;
//         }

//         .permission-grid {
//           margin-top: 15px;
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//         }

//         .permission-item {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           padding: 11px 12px;
//           border: 1px solid #e7eaf0;
//           border-radius: 7px;
//           font-size: 14px;
//           background: #fff;
//         }

//         .permission-item span {
//           width: 18px;
//           height: 18px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 4px;
//           background: #198754;
//           color: #fff;
//           font-size: 11px;
//           font-weight: bold;
//           flex-shrink: 0;
//         }

//         .form-footer {
//           margin-top: 18px;
//           padding: 15px 0;
//           display: flex;
//           justify-content: flex-end;
//           align-items: center;
//           gap: 10px;
//         }

//         .form-footer .btn {
//           min-height: 42px;
//           border-radius: 7px;
//         }

//         .form-switch .form-check-input {
//           width: 40px;
//           height: 21px;
//           cursor: pointer;
//         }

//         @media (max-width: 767px) {
//           .new-admission-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .new-admission-header .btn {
//             width: 100%;
//           }

//           .admission-card-body {
//             padding: 15px;
//           }

//           .permission-grid {
//             grid-template-columns: 1fr;
//           }

//           .otp-wrapper {
//             flex-direction: column;
//           }

//           .otp-wrapper .form-control {
//             border-radius: 7px;
//           }

//           .otp-wrapper .btn {
//             margin-top: 7px;
//             width: 100%;
//             border-radius: 7px;
//           }

//           .form-footer {
//             flex-direction: column-reverse;
//           }

//           .form-footer .btn {
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .new-admission-header {
//             padding: 15px;
//           }

//           .new-admission-header h4 {
//             font-size: 19px;
//           }

//           .admission-section-header {
//             padding: 12px;
//           }

//           .admission-card-body {
//             padding: 12px;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// const ToggleRow = ({
//   label,
//   checked,
//   name,
//   onChange,
//   activeText,
//   helper,
// }) => {
//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center gap-3">
//         <div>
//           <div className="fw-semibold">
//             {label}
//           </div>

//           <small className="text-muted">
//             {helper}
//           </small>
//         </div>

//         <div className="d-flex align-items-center gap-2 flex-shrink-0">
//           <div className="form-check form-switch mb-0">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               role="switch"
//               name={name}
//               checked={checked}
//               onChange={onChange}
//             />
//           </div>

//           <span className="small fw-semibold">
//             {checked ? activeText : "Disabled"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminCreation;




import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaPaperPlane,
  FaRegUser,
  
 
  FaUserShield,
  FaCheckCircle,
  FaLock,
  FaCog,
  FaInfoCircle,
} from "react-icons/fa";
import { FaArrowsRotate, FaArrowUpFromBracket } from "react-icons/fa6";

import {
  MdOutlineGridView,
  MdOutlineSchool,
  MdAdminPanelSettings,
} from "react-icons/md";

const SuperAdminCreation = () => {
  const token = localStorage.getItem("token");

  const [selectedFile, setSelectedFile] = useState(null);

  const [userGroup, setUserGroup] = useState([]);
  const [schools, setSchools] = useState([]);

  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);

  const [verifyingPhoneOtp, setVerifyingPhoneOtp] = useState(false);
  const [verifyingEmailOtp, setVerifyingEmailOtp] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [creatingUser, setCreatingUser] = useState(false);

  const initialForm = {
    schoolId: "",
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    address: "",
    languagePreference: "",
    timeZone: "",
    note: "",
    role: "",
    accountStatus: true,
    twoFactorAuthentication: false,
    loginNotification: true,
    userGroupId: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite place?",
    "What was your childhood nickname?",
  ];

  const languages = [
    { value: "ENGLISH", label: "English" },
    { value: "HINDI", label: "Hindi" },
  ];

  const timeZones = [
    {
      value: "Asia/Kolkata",
      label: "India Standard Time (IST) — UTC +05:30",
    },
    {
      value: "Asia/Dubai",
      label: "Gulf Standard Time (GST) — UTC +04:00",
    },
    {
      value: "Asia/Dhaka",
      label: "Bangladesh Standard Time — UTC +06:00",
    },
    {
      value: "Asia/Singapore",
      label: "Singapore Time — UTC +08:00",
    },
    {
      value: "Asia/Tokyo",
      label: "Japan Standard Time — UTC +09:00",
    },
  ];

  const permissions = [
    "All Modules Access",
    "User & Role Management",
    "System Settings",
    "School Management",
    "Reports & Analytics",
    "System Configuration",
  ];

  useEffect(() => {
    loadUserGroup();
    loadSchools();
  }, []);

  const loadUserGroup = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user-group/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserGroup(res.data || []);
    } catch (error) {
      console.error("User group loading failed:", error);
    }
  };

  const loadSchools = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/school/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(res.data || []);
    } catch (error) {
      console.error("School loading failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "userGroupId") {
      const selectedGroup = userGroup.find(
        (group) => String(group.id) === String(value)
      );

      const selectedRole =
        selectedGroup?.groupName ||
        selectedGroup?.name ||
        selectedGroup?.role ||
        "";

      setFormData((prev) => ({
        ...prev,
        userGroupId: value,
        role: selectedRole,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Profile picture must be less than 2MB.");
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or SVG files are allowed.");
      return;
    }

    setSelectedFile(file);
  };

  const sendPhoneOtp = async () => {
    if (formData.phoneNumber.length !== 10) {
      alert("Please enter valid 10 digit phone number.");
      return;
    }

    try {
      setSendingPhoneOtp(true);

      await axios.post(
        "http://localhost:8080/api/otp/send-phone",
        {
          phone: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowPhoneOtp(true);
      setPhoneOtp("");

      alert(
        "Phone OTP generated successfully.\nCheck your Spring Boot console."
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to generate phone OTP."
      );
    } finally {
      setSendingPhoneOtp(false);
    }
  };

  const verifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      alert("Please enter 6 digit OTP.");
      return;
    }

    try {
      setVerifyingPhoneOtp(true);

      await axios.post(
        "http://localhost:8080/api/otp/verify-phone",
        {
          phone: formData.phoneNumber,
          otp: phoneOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPhoneVerified(true);
      setShowPhoneOtp(false);
      setPhoneOtp("");

      alert("Phone number verified successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Invalid phone OTP."
      );
    } finally {
      setVerifyingPhoneOtp(false);
    }
  };

  const sendEmailOtp = async () => {
    if (!formData.email.trim()) {
      alert("Please enter email address.");
      return;
    }

    try {
      setSendingEmailOtp(true);

      await axios.post(
        "http://localhost:8080/api/otp/send-email",
        {
          email: formData.email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowEmailOtp(true);
      setEmailOtp("");

      alert(
        "Email OTP generated successfully.\nCheck your Spring Boot console."
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to generate email OTP."
      );
    } finally {
      setSendingEmailOtp(false);
    }
  };

  const verifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      alert("Please enter 6 digit OTP.");
      return;
    }

    try {
      setVerifyingEmailOtp(true);

      await axios.post(
        "http://localhost:8080/api/otp/verify-email",
        {
          email: formData.email.trim(),
          otp: emailOtp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEmailVerified(true);
      setShowEmailOtp(false);
      setEmailOtp("");

      alert("Email address verified successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Invalid email OTP."
      );
    } finally {
      setVerifyingEmailOtp(false);
    }
  };

  const createSuperAdmin = async () => {
    if (!formData.schoolId) {
      alert("Please select school.");
      return;
    }

    if (!formData.fullName.trim()) {
      alert("Please enter full name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      alert("Please enter valid 10 digit phone number.");
      return;
    }

    if (!phoneVerified) {
      alert("Please verify phone number first.");
      return;
    }

    if (!emailVerified) {
      alert("Please verify email address first.");
      return;
    }

    if (!formData.dateOfBirth) {
      alert("Please select date of birth.");
      return;
    }

    if (!formData.gender) {
      alert("Please select gender.");
      return;
    }

    if (!formData.userGroupId) {
      alert("Please select role.");
      return;
    }

    if (!formData.password) {
      alert("Please enter password.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!formData.confirmPassword) {
      alert("Please confirm password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    if (!formData.securityQuestion) {
      alert("Please select security question.");
      return;
    }

    if (!formData.securityAnswer.trim()) {
      alert("Please enter security answer.");
      return;
    }

    const selectedUserGroup = userGroup.find(
      (group) =>
        String(group.id) === String(formData.userGroupId)
    );

    if (!selectedUserGroup) {
      alert("Selected role not found.");
      return;
    }

    const selectedRole =
      selectedUserGroup.groupName ||
      selectedUserGroup.name ||
      selectedUserGroup.role ||
      "";

    const payload = {
      name: formData.fullName.trim(),
      fullName: formData.fullName.trim(),

      email: formData.email.trim(),

      phone: formData.phoneNumber,
      phoneNumber: formData.phoneNumber,

      alternatePhone: formData.alternatePhone.trim(),

      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,

      password: formData.password,
      confirmPassword: formData.confirmPassword,

      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer.trim(),

      address: formData.address.trim(),

      languagePreference:
        formData.languagePreference || null,

      timeZone: formData.timeZone || null,

      note: formData.note.trim() || null,

      role: selectedRole,

      userGroupId: Number(formData.userGroupId),

      status: formData.accountStatus
        ? "Active"
        : "Inactive",

      accountStatus: formData.accountStatus,

      twoFactorAuthentication:
        formData.twoFactorAuthentication,

      loginNotification:
        formData.loginNotification,

      phoneVerified,
      emailVerified,
    };

    try {
      setCreatingUser(true);

      const response = await axios.post(
        `http://localhost:8080/api/superadmin/create?schoolId=${formData.schoolId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedUsername =
        response.data?.username ||
        response.data?.user?.username ||
        response.data?.data?.username;

      if (generatedUsername) {
        alert(
          `Super Admin created successfully!\n\nUsername: ${generatedUsername}`
        );
      } else {
        alert("Super Admin created successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Create Super Admin Error:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data;

      alert(
        backendMessage ||
          "Failed to create Super Admin."
      );
    } finally {
      setCreatingUser(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);

    setPhoneOtp("");
    setEmailOtp("");

    setShowPhoneOtp(false);
    setShowEmailOtp(false);

    setPhoneVerified(false);
    setEmailVerified(false);

    setSelectedFile(null);
  };

  const SectionHeader = ({
    icon,
    title,
    subtitle,
  }) => (
    <div className="sa-section-header">
      <div className="sa-section-icon">
        {icon}
      </div>

      <div>
        <h6 className="mb-1 fw-bold text-dark">
          {title}
        </h6>

        <small className="text-muted">
          {subtitle}
        </small>
      </div>
    </div>
  );

  const Field = ({
    label,
    required = false,
    children,
  }) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}

        {required && (
          <span className="text-danger ms-1">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );

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
                  <MdAdminPanelSettings size={29} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Create Super Admin
                  </h5>

                  <div className="text-muted small">
                    Super Admin Management
                    &nbsp;/&nbsp;
                    Create Account
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Administration
                </span>

                <button
                  type="button"
                  className="btn btn-outline-primary rounded-3"
                  onClick={() =>
                    window.history.back()
                  }
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
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home
              &nbsp;›&nbsp;
              Super Admin Management
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Create Super Admin
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div className="px-2 mb-5">

        <div className="sa-form-wrapper">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="sa-card shadow">

            <SectionHeader
              icon={<FaRegUser />}
              title="Personal Information"
              subtitle="Enter basic administrator details"
            />

            <div className="sa-card-body">

              <div className="row g-3">

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="School"
                    required
                  >
                    <select
                      name="schoolId"
                      className="form-select"
                      value={formData.schoolId}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select School
                      </option>

                      {schools.map(
                        (school) => (
                          <option
                            key={school.id}
                            value={school.id}
                          >
                            {school.schoolName ||
                              school.name ||
                              school.schoolCode}

                            {school.schoolCode
                              ? ` (${school.schoolCode})`
                              : ""}
                          </option>
                        )
                      )}
                    </select>
                  </Field>
                </div>

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="Full Name"
                    required
                  >
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </Field>
                </div>

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="Gender"
                    required
                  >
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option value="MALE">
                        Male
                      </option>

                      <option value="FEMALE">
                        Female
                      </option>

                      <option value="OTHER">
                        Other
                      </option>
                    </select>
                  </Field>
                </div>

              </div>

              <div className="row g-3">

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="Date of Birth"
                    required
                  >
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </Field>
                </div>

                {/* EMAIL */}

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="Email Address"
                    required
                  >

                    <div className="otp-wrapper">

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
                        value={formData.email}
                        disabled={emailVerified}
                        onChange={(e) => {
                          setFormData(
                            (prev) => ({
                              ...prev,
                              email:
                                e.target.value,
                            })
                          );

                          setEmailVerified(false);
                          setShowEmailOtp(false);
                          setEmailOtp("");
                        }}
                      />

                      <button
                        type="button"
                        className={`btn ${
                          emailVerified
                            ? "btn-success"
                            : "btn-outline-primary"
                        }`}
                        disabled={
                          sendingEmailOtp ||
                          emailVerified ||
                          !formData.email.trim()
                        }
                        onClick={sendEmailOtp}
                      >
                        {sendingEmailOtp ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : emailVerified ? (
                          <>
                            <FaCheckCircle className="me-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <FaPaperPlane
                              size={13}
                              className="me-1"
                            />
                            OTP
                          </>
                        )}
                      </button>

                    </div>

                    {showEmailOtp &&
                      !emailVerified && (
                        <div className="otp-box mt-2">

                          <div className="input-group">

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              value={emailOtp}
                              onChange={(e) =>
                                setEmailOtp(
                                  e.target.value.replace(
                                    /\D/g,
                                    ""
                                  )
                                )
                              }
                            />

                            <button
                              type="button"
                              className="btn btn-outline-success"
                              disabled={
                                verifyingEmailOtp ||
                                emailOtp.length !== 6
                              }
                              onClick={
                                verifyEmailOtp
                              }
                            >
                              {verifyingEmailOtp ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <>
                                  <FaCheckCircle className="me-1" />
                                  Verify
                                </>
                              )}
                            </button>

                          </div>

                          <small className="text-muted">
                            OTP expires in 5 minutes.
                          </small>

                        </div>
                      )}

                    {emailVerified && (
                      <small className="text-success fw-semibold">
                        ✓ Email address verified
                      </small>
                    )}

                  </Field>
                </div>

                {/* PHONE */}

                <div className="col-xl-4 col-md-6">
                  <Field
                    label="Phone Number"
                    required
                  >

                    <div className="otp-wrapper">

                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Enter 10 digit phone no"
                        maxLength={10}
                        value={formData.phoneNumber}
                        disabled={phoneVerified}
                        onChange={(e) => {

                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setFormData(
                            (prev) => ({
                              ...prev,
                              phoneNumber:
                                value,
                            })
                          );

                          setPhoneVerified(false);
                          setShowPhoneOtp(false);
                          setPhoneOtp("");
                        }}
                      />

                      <button
                        type="button"
                        className={`btn ${
                          phoneVerified
                            ? "btn-success"
                            : "btn-outline-primary"
                        }`}
                        disabled={
                          sendingPhoneOtp ||
                          phoneVerified ||
                          formData.phoneNumber
                            .length !== 10
                        }
                        onClick={sendPhoneOtp}
                      >
                        {sendingPhoneOtp ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : phoneVerified ? (
                          <>
                            <FaCheckCircle className="me-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <FaPaperPlane
                              size={13}
                              className="me-1"
                            />
                            OTP
                          </>
                        )}
                      </button>

                    </div>

                    {showPhoneOtp &&
                      !phoneVerified && (
                        <div className="otp-box mt-2">

                          <div className="input-group">

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              value={phoneOtp}
                              onChange={(e) =>
                                setPhoneOtp(
                                  e.target.value.replace(
                                    /\D/g,
                                    ""
                                  )
                                )
                              }
                            />

                            <button
                              type="button"
                              className="btn btn-outline-success"
                              disabled={
                                verifyingPhoneOtp ||
                                phoneOtp.length !== 6
                              }
                              onClick={
                                verifyPhoneOtp
                              }
                            >
                              {verifyingPhoneOtp ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <>
                                  <FaCheckCircle className="me-1" />
                                  Verify
                                </>
                              )}
                            </button>

                          </div>

                          <small className="text-muted">
                            OTP expires in 5 minutes.
                          </small>

                        </div>
                      )}

                    {phoneVerified && (
                      <small className="text-success fw-semibold">
                        ✓ Phone number verified
                      </small>
                    )}

                  </Field>
                </div>

              </div>

              <div className="row g-3">

                <div className="col-xl-4 col-md-6">
                  <Field label="Alternate Phone">
                    <input
                      type="text"
                      name="alternatePhone"
                      className="form-control"
                      placeholder="Enter alternate phone"
                      value={
                        formData.alternatePhone
                      }
                      onChange={handleInputChange}
                    />
                  </Field>
                </div>

                <div className="col-xl-8">
                  <Field label="Profile Picture">

                    <div className="upload-area">

                      <FaArrowUpFromBracket
                        size={27}
                        className="text-primary mb-2"
                      />

                      <div className="fw-semibold">
                        <span className="text-primary">
                          Click to upload
                        </span>

                        {" "}

                        <span className="text-muted">
                          or drag and drop
                        </span>
                      </div>

                      <small className="text-muted">
                        JPG, PNG or SVG · Maximum 2MB
                        · Recommended 200 × 200 px
                      </small>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                        onChange={
                          handleFileChange
                        }
                      />

                    </div>

                    {selectedFile && (
                      <small className="text-success fw-semibold">
                        ✓ {selectedFile.name}
                      </small>
                    )}

                  </Field>
                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              ROLE & PERMISSIONS
          ================================================= */}

          <div className="sa-card shadow">

            <SectionHeader
              icon={<FaUserShield />}
              title="Role & Permissions"
              subtitle="Assign access level to the administrator"
            />

            <div className="sa-card-body">

              <Field
                label="Assign Role"
                required
              >
                <select
                  name="userGroupId"
                  className="form-select"
                  value={
                    formData.userGroupId
                  }
                  onChange={
                    handleInputChange
                  }
                >
                  <option value="">
                    Select Role
                  </option>

                  {userGroup.map(
                    (group) => (
                      <option
                        key={group.id}
                        value={group.id}
                      >
                        {group.groupName ||
                          group.name ||
                          group.role}
                      </option>
                    )
                  )}
                </select>
              </Field>

              <div className="permission-info">

                <div className="d-flex align-items-start gap-3">

                  <div className="info-icon">
                    <FaUserShield />
                  </div>

                  <div>
                    <strong>
                      Super Admin Access
                    </strong>

                    <p className="mb-0 mt-1">
                      Super admin will have full
                      access to modules, menus,
                      users and system settings.
                    </p>
                  </div>

                </div>

              </div>

              <div className="permission-grid">

                {permissions.map(
                  (permission) => (
                    <div
                      key={permission}
                      className="permission-item"
                    >
                      <span>
                        <FaCheckCircle />
                      </span>

                      {permission}
                    </div>
                  )
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <div className="sa-card shadow">

            <SectionHeader
              icon={<FaLock />}
              title="Account Information"
              subtitle="Configure login credentials and recovery"
            />

            <div className="sa-card-body">

              <div className="row g-3">

                <div className="col-md-6">

                  <Field
                    label="Password"
                    required
                  >
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={
                        handleInputChange
                      }
                    />

                    <small className="text-muted">
                      Minimum 8 characters.
                    </small>
                  </Field>

                </div>

                <div className="col-md-6">

                  <Field
                    label="Confirm Password"
                    required
                  >
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={
                        handleInputChange
                      }
                    />
                  </Field>

                </div>

              </div>

              <div className="row g-3">

                <div className="col-md-6">

                  <Field
                    label="Security Question"
                    required
                  >
                    <select
                      name="securityQuestion"
                      className="form-select"
                      value={
                        formData.securityQuestion
                      }
                      onChange={
                        handleInputChange
                      }
                    >
                      <option value="">
                        Select security question
                      </option>

                      {securityQuestions.map(
                        (question) => (
                          <option
                            key={question}
                            value={question}
                          >
                            {question}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                </div>

                <div className="col-md-6">

                  <Field
                    label="Security Answer"
                    required
                  >
                    <input
                      type="text"
                      name="securityAnswer"
                      className="form-control"
                      placeholder="Enter security answer"
                      value={
                        formData.securityAnswer
                      }
                      onChange={
                        handleInputChange
                      }
                    />
                  </Field>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              STATUS & SETTINGS
          ================================================= */}

          <div className="sa-card shadow">

            <SectionHeader
              icon={<FaCog />}
              title="Status & Settings"
              subtitle="Configure account behaviour"
            />

            <div className="sa-card-body">

              <ToggleRow
                label="Account Status"
                checked={
                  formData.accountStatus
                }
                name="accountStatus"
                onChange={
                  handleSwitchChange
                }
                activeText="Active"
                helper="Inactive accounts cannot login to the system."
              />

              <hr />

              <ToggleRow
                label="Two Factor Authentication"
                checked={
                  formData.twoFactorAuthentication
                }
                name="twoFactorAuthentication"
                onChange={
                  handleSwitchChange
                }
                activeText="Enabled"
                helper="User will need verification codes at login."
              />

              <hr />

              <ToggleRow
                label="Login Notification"
                checked={
                  formData.loginNotification
                }
                name="loginNotification"
                onChange={
                  handleSwitchChange
                }
                activeText="Enabled"
                helper="Email notification will be sent when this admin logs in."
              />

            </div>
          </div>

          {/* =================================================
              ADDITIONAL INFORMATION
          ================================================= */}

          <div className="sa-card shadow">

            <SectionHeader
              icon={<FaInfoCircle />}
              title="Additional Information"
              subtitle="Optional administrator information"
            />

            <div className="sa-card-body">

              <div className="row g-3">

                <div className="col-lg-8">

                  <Field label="Address">

                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      placeholder="Enter address"
                      value={
                        formData.address
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </Field>

                </div>

                <div className="col-lg-4">

                  <Field label="Language Preference">

                    <select
                      name="languagePreference"
                      className="form-select"
                      value={
                        formData.languagePreference
                      }
                      onChange={
                        handleInputChange
                      }
                    >
                      <option value="">
                        Select Language
                      </option>

                      {languages.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}

                    </select>

                  </Field>

                </div>

              </div>

              <div className="row g-3">

                <div className="col-lg-7">

                  <Field label="Time Zone">

                    <select
                      name="timeZone"
                      className="form-select"
                      value={
                        formData.timeZone
                      }
                      onChange={
                        handleInputChange
                      }
                    >
                      <option value="">
                        Select Time Zone
                      </option>

                      {timeZones.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}

                    </select>

                  </Field>

                </div>

                <div className="col-lg-5">

                  <Field label="Note">

                    <textarea
                      name="note"
                      className="form-control"
                      rows="2"
                      placeholder="Enter additional note"
                      value={formData.note}
                      onChange={
                        handleInputChange
                      }
                    />

                  </Field>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* =====================================================
            FOOTER BUTTONS
        ===================================================== */}

        <div className="sa-footer">

          <button
            type="button"
            className="btn btn-outline-secondary rounded-3 px-4"
            onClick={resetForm}
            disabled={creatingUser}
          >
            <FaArrowsRotate
              size={14}
              className="me-2"
            />

            Reset
          </button>

          <button
            type="button"
            className="btn btn-primary rounded-3 px-4"
            onClick={createSuperAdmin}
            disabled={
              creatingUser ||
              !phoneVerified ||
              !emailVerified
            }
          >
            {creatingUser ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Creating...
              </>
            ) : (
              <>
                <MdOutlineGridView
                  size={17}
                  className="me-2"
                />
                Create Super Admin
              </>
            )}
          </button>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* ===============================
           FORM WRAPPER
        =============================== */

        .sa-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ===============================
           CARD
        =============================== */

        .sa-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
        }

        .sa-card-body {
          padding: 22px;
        }

        /* ===============================
           SECTION HEADER
        =============================== */

        .sa-section-header {
          min-height: 68px;
          padding: 13px 20px;
          display: flex;
          align-items: center;
          gap: 13px;

          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f8fbff 70%,
              #eff6ff 100%
            );

          border-bottom: 1px solid #e5e7eb;
        }

        .sa-section-icon {
          width: 43px;
          height: 43px;
          border-radius: 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );

          color: #fff;

          box-shadow:
            0 8px 20px
            rgba(37,99,235,.20);

          font-size: 18px;
          flex-shrink: 0;
        }

        /* ===============================
           FORM ELEMENTS
        =============================== */

        .form-label {
          margin-bottom: 7px;
          font-size: 14px;
          color: #1f2937;
        }

        .form-control,
        .form-select {
          min-height: 43px;
          border: 1px solid #dfe3e8;
          border-radius: 8px;
          font-size: 14px;
          box-shadow: none !important;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #86b7fe;
          box-shadow:
            0 0 0 3px
            rgba(37,99,235,.08) !important;
        }

        textarea.form-control {
          min-height: 90px;
          resize: vertical;
        }

        /* ===============================
           OTP
        =============================== */

        .otp-wrapper {
          display: flex;
          width: 100%;
        }

        .otp-wrapper .form-control {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .otp-wrapper .btn {
          min-width: 82px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .otp-box {
          padding: 11px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
        }

        /* ===============================
           UPLOAD
        =============================== */

        .upload-area {
          position: relative;

          min-height: 132px;

          border: 2px dashed #cbd5e1;
          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f8fbff
            );

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          text-align: center;

          padding: 20px;

          cursor: pointer;

          overflow: hidden;

          transition: all .2s ease;
        }

        .upload-area:hover {
          border-color: #2563eb;

          background: #f5f9ff;

          box-shadow:
            0 5px 15px
            rgba(37,99,235,.08);
        }

        .upload-area input {
          position: absolute;
          inset: 0;

          opacity: 0;

          width: 100%;
          height: 100%;

          cursor: pointer;
        }

        /* ===============================
           PERMISSION INFO
        =============================== */

        .permission-info {
          margin-top: 12px;
          padding: 15px 16px;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #eff6ff,
              #f8fbff
            );

          border: 1px solid #bfdbfe;

          color: #174a8b;

          font-size: 14px;
        }

        .info-icon {
          width: 35px;
          height: 35px;

          border-radius: 9px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #2563eb;
          color: white;

          flex-shrink: 0;
        }

        /* ===============================
           PERMISSIONS
        =============================== */

        .permission-grid {
          margin-top: 16px;

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 10px;
        }

        .permission-item {
          display: flex;
          align-items: center;

          gap: 9px;

          padding: 12px 13px;

          border: 1px solid #e5e7eb;

          border-radius: 9px;

          font-size: 14px;

          background: #fff;

          transition: .2s ease;
        }

        .permission-item:hover {
          border-color: #bfdbfe;
          background: #f8fbff;
        }

        .permission-item span {
          width: 20px;
          height: 20px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #198754;
          color: #fff;

          font-size: 10px;

          flex-shrink: 0;
        }

        /* ===============================
           FOOTER
        =============================== */

        .sa-footer {
          margin-top: 18px;

          padding: 15px 0;

          display: flex;

          justify-content: flex-end;

          align-items: center;

          gap: 10px;
        }

        .sa-footer .btn {
          min-height: 43px;
        }

        /* ===============================
           SWITCH
        =============================== */

        .form-switch .form-check-input {
          width: 42px;
          height: 22px;

          cursor: pointer;
        }

        /* ===============================
           BUTTON
        =============================== */

        .btn {
          transition: all .2s ease;
        }

        .btn-primary {
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );

          border-color: #2563eb;
        }

        .btn-primary:hover {
          transform: translateY(-1px);

          box-shadow:
            0 7px 18px
            rgba(37,99,235,.20);
        }

        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 767px) {

          .sa-card-body {
            padding: 15px;
          }

          .sa-section-header {
            padding: 12px 15px;
          }

          .permission-grid {
            grid-template-columns: 1fr;
          }

          .otp-wrapper {
            flex-direction: column;
          }

          .otp-wrapper .form-control {
            border-radius: 8px;
          }

          .otp-wrapper .btn {
            margin-top: 7px;
            width: 100%;
            border-radius: 8px;
          }

          .sa-footer {
            flex-direction: column-reverse;
          }

          .sa-footer .btn {
            width: 100%;
          }

        }

        @media (max-width: 480px) {

          .sa-section-header {
            min-height: 62px;
          }

          .sa-section-icon {
            width: 38px;
            height: 38px;
            font-size: 16px;
          }

          .sa-card-body {
            padding: 12px;
          }

        }

        /* ===============================
           PRINT
        =============================== */

        @media print {

          body {
            background: white !important;
          }

          button,
          .btn {
            display: none !important;
          }

          .sa-card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
          }

          .sa-section-header {
            background: white !important;
          }

        }

      `}</style>
    </>
  );
};

/* =========================================================
   TOGGLE ROW
========================================================= */

const ToggleRow = ({
  label,
  checked,
  name,
  onChange,
  activeText,
  helper,
}) => {
  return (
    <div>

      <div className="d-flex justify-content-between align-items-center gap-3">

        <div>
          <div className="fw-semibold text-dark">
            {label}
          </div>

          <small className="text-muted">
            {helper}
          </small>
        </div>

        <div className="d-flex align-items-center gap-2 flex-shrink-0">

          <div className="form-check form-switch mb-0">

            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              name={name}
              checked={checked}
              onChange={onChange}
            />

          </div>

          <span
            className={`small fw-semibold ${
              checked
                ? "text-success"
                : "text-muted"
            }`}
          >
            {checked
              ? activeText
              : "Disabled"}
          </span>

        </div>

      </div>

    </div>
  );
};

export default SuperAdminCreation;

