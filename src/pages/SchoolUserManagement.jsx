// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FaSearch,
//   FaRedo,
//   FaKey,
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaSchool,
//   FaUsers,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaUserShield,
//   FaTimes,
//   FaArrowRight,
//   FaArrowLeft,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import axiosInstance from "../api/axiosInstance";

// const SchoolUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const [showResetModal, setShowResetModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const [resetStep, setResetStep] = useState(1);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [resetLoading, setResetLoading] = useState(false);
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // =========================================================
//  const schoolId = localStorage.getItem("schoolId");

// console.log("SCHOOL ID FROM LOCAL STORAGE:", schoolId);

// useEffect(() => {
//   if (!schoolId) {
//     console.log("School ID nahi mila");
//     return;
//   }

//   const fetchUsers = async () => {
//     try {
//       console.log("Calling:", `/api/user/school/${schoolId}`);

//       const response = await axiosInstance.get(
//   `/api/user/school/${schoolId}`
// );

// console.log("USER RESPONSE:", response.data);

// setUsers(
//   Array.isArray(response.data)
//     ? response.data
//     : response.data.users || response.data.data || []
// );
//     } catch (error) {
//       console.error("USER API ERROR:", error);
//     }
//   };

//   fetchUsers();
// }, [schoolId]);

//   // =========================================================
//   // FILTER USERS
//   // =========================================================
//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const search = searchTerm.toLowerCase().trim();

//       const matchesSearch =
//         !search ||
//         user.name?.toLowerCase().includes(search) ||
//         user.username?.toLowerCase().includes(search) ||
//         user.email?.toLowerCase().includes(search) ||
//         user.phone?.toLowerCase().includes(search) ||
//         user.role?.toLowerCase().includes(search);

//       const matchesRole =
//         !roleFilter ||
//         user.role?.toLowerCase() === roleFilter.toLowerCase();

//       const normalizedStatus = user.status?.toUpperCase();

//       const matchesStatus =
//         !statusFilter ||
//         normalizedStatus === statusFilter.toUpperCase();

//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, searchTerm, roleFilter, statusFilter]);

//   // =========================================================
//   // STATS
//   // =========================================================
//   const totalUsers = users.length;

//   const activeUsers = users.filter(
//     (user) => user.status?.toUpperCase() === "ACTIVE"
//   ).length;

//   const inactiveUsers = users.filter(
//     (user) => user.status?.toUpperCase() === "INACTIVE"
//   ).length;

//   const adminUsers = users.filter((user) =>
//     user.role?.toLowerCase().includes("admin")
//   ).length;

//   // =========================================================
//   // CLEAR FILTERS
//   // =========================================================
//   const clearFilters = () => {
//     setSearchTerm("");
//     setRoleFilter("");
//     setStatusFilter("");
//   };

//   // =========================================================
//   // OPEN PASSWORD RESET
//   // =========================================================
//   const openResetModal = (user) => {
//     setSelectedUser(user);

//     setResetStep(1);
//     setOtp("");
//     setNewPassword("");
//     setConfirmPassword("");

//     setResetError("");
//     setResetSuccess("");

//     setShowPassword(false);
//     setShowConfirmPassword(false);

//     setShowResetModal(true);
//   };

//   // =========================================================
//   // CLOSE PASSWORD RESET
//   // =========================================================
//   const closeResetModal = () => {
//     if (resetLoading) return;

//     setShowResetModal(false);
//     setSelectedUser(null);

//     setResetStep(1);
//     setOtp("");
//     setNewPassword("");
//     setConfirmPassword("");

//     setResetError("");
//     setResetSuccess("");
//   };

//   // =========================================================
//   // STEP 1 - SEND OTP
//   // =========================================================
//   const sendOtp = async () => {
//     if (!selectedUser?.email) {
//       setResetError("User email not found.");
//       return;
//     }

//     try {
//       setResetLoading(true);
//       setResetError("");

//       await axiosInstance.post(
//         `/api/password-reset/send-otp?email=${encodeURIComponent(
//           selectedUser.email
//         )}`
//       );

//       setResetStep(2);
//     } catch (err) {
//       console.error("Send OTP error:", err);

//       setResetError(
//         err?.response?.data ||
//           "Failed to send OTP. Please try again."
//       );
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   // =========================================================
//   // STEP 2 - VERIFY OTP
//   // =========================================================
//   const verifyOtp = async () => {
//     if (!otp || otp.length < 4) {
//       setResetError("Please enter a valid OTP.");
//       return;
//     }

//     try {
//       setResetLoading(true);
//       setResetError("");

//       await axiosInstance.post(
//         `/api/password-reset/verify-otp?email=${encodeURIComponent(
//           selectedUser.email
//         )}&otp=${encodeURIComponent(otp)}`
//       );

//       setResetStep(3);
//     } catch (err) {
//       console.error("Verify OTP error:", err);

//       setResetError(
//         err?.response?.data ||
//           "Invalid or expired OTP."
//       );
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   // =========================================================
//   // STEP 3 - CHANGE PASSWORD
//   // =========================================================
//   const changePassword = async () => {
//     setResetError("");

//     if (!newPassword) {
//       setResetError("Please enter a new password.");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setResetError("Password must be at least 6 characters.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setResetError("Passwords do not match.");
//       return;
//     }

//     try {
//       setResetLoading(true);

//       await axiosInstance.post(
//         "/api/password-reset/change-password",
//         {
//           email: selectedUser.email,
//           newPassword: newPassword,
//         }
//       );

//       setResetSuccess("Password reset successfully.");
//       setResetStep(4);
//     } catch (err) {
//       console.error("Change password error:", err);

//       setResetError(
//         err?.response?.data ||
//           "Failed to reset password. Please try again."
//       );
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   // =========================================================
//   // ROLE CLASS
//   // =========================================================
//   const getRoleClass = (role) => {
//     const value = role?.toLowerCase() || "";

//     if (value.includes("admin")) return "um-role-admin";
//     if (value.includes("teacher")) return "um-role-teacher";
//     if (value.includes("student")) return "um-role-student";

//     return "um-role-default";
//   };

//   return (
//     <div className="container-fluid px-0">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}
//       <div
//         className="d-flex justify-content-between align-items-center mb-4"
//         style={{ gap: "15px" }}
//       >
//         <div>
//           <h3
//             className="fw-bold mb-1"
//             style={{
//               color: "#1e3a8a",
//               fontSize: "24px",
//             }}
//           >
//             School User Management
//           </h3>

//           <p
//             className="mb-0"
//             style={{
//               color: "#64748b",
//               fontSize: "14px",
//             }}
//           >
//             Manage users and reset passwords for your school
//           </p>
//         </div>

//         <button
//           type="button"
//           className="um-refresh-btn"
//           // onClick={fetchUsers}
//           disabled={loading}
//         >
//           <FaRedo className={loading ? "um-spin" : ""} />
//           <span>Refresh</span>
//         </button>
//       </div>

//       {/* =====================================================
//           SCHOOL INFO
//       ===================================================== */}
//       {users.length > 0 && (
//         <div
//           className="mb-4"
//           style={{
//             background:
//               "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
//             border: "1px solid #dbeafe",
//             borderRadius: "14px",
//             padding: "16px 20px",
//             display: "flex",
//             alignItems: "center",
//             gap: "14px",
//           }}
//         >
//           <div
//             style={{
//               width: "44px",
//               height: "44px",
//               borderRadius: "12px",
//               background: "#dbeafe",
//               color: "#2563eb",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "19px",
//             }}
//           >
//             <FaSchool />
//           </div>

//           <div>
//             <div
//               style={{
//                 fontSize: "12px",
//                 color: "#64748b",
//                 marginBottom: "2px",
//               }}
//             >
//               Current School
//             </div>

//             <div
//               style={{
//                 fontWeight: "700",
//                 color: "#1e3a8a",
//                 fontSize: "15px",
//               }}
//             >
//               {users[0]?.schoolName || "Your School"}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           STATS
//       ===================================================== */}
//       <div className="row g-3 mb-4">

//         {/* TOTAL */}
//         <div className="col-xl-3 col-lg-6 col-md-6">
//           <div className="premium-stat-card stat-blue">
//             <div className="stat-icon">
//               <FaUsers />
//             </div>

//             <div className="stat-content">
//               <span>Total Users</span>
//               <strong>{totalUsers}</strong>
//             </div>
//           </div>
//         </div>

//         {/* ACTIVE */}
//         <div className="col-xl-3 col-lg-6 col-md-6">
//           <div className="premium-stat-card stat-green">
//             <div className="stat-icon">
//               <FaCheckCircle />
//             </div>

//             <div className="stat-content">
//               <span>Active Users</span>
//               <strong>{activeUsers}</strong>
//             </div>
//           </div>
//         </div>

//         {/* INACTIVE */}
//         <div className="col-xl-3 col-lg-6 col-md-6">
//           <div className="premium-stat-card stat-orange">
//             <div className="stat-icon">
//               <FaTimesCircle />
//             </div>

//             <div className="stat-content">
//               <span>Inactive Users</span>
//               <strong>{inactiveUsers}</strong>
//             </div>
//           </div>
//         </div>

//         {/* ADMIN */}
//         <div className="col-xl-3 col-lg-6 col-md-6">
//           <div className="premium-stat-card stat-red">
//             <div className="stat-icon">
//               <FaUserShield />
//             </div>

//             <div className="stat-content">
//               <span>Admin Users</span>
//               <strong>{adminUsers}</strong>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SEARCH + FILTER
//       ===================================================== */}
//       <div className="um-toolbar-wrapper mb-4">

//         {/* SEARCH */}
//         <div className="um-search-box">
//           <FaSearch />

//           <input
//             type="text"
//             placeholder="Search by name, username, email, phone or role..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="um-filters-container">

//           {/* ROLE */}
//           <div className="um-filter-box">
//             <select
//               value={roleFilter}
//               onChange={(e) => setRoleFilter(e.target.value)}
//             >
//               <option value="">All Roles</option>

//               {[...new Set(users.map((user) => user.role).filter(Boolean))]
//                 .sort()
//                 .map((role) => (
//                   <option key={role} value={role}>
//                     {role}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* STATUS - ONLY FILTER, NO STATUS CHANGE */}
//           <div className="um-filter-box">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="">All Status</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//             </select>
//           </div>

//           {(searchTerm || roleFilter || statusFilter) && (
//             <button
//               type="button"
//               className="um-clear-filter-btn"
//               onClick={clearFilters}
//             >
//               <FaTimes />
//               Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           ERROR
//       ===================================================== */}
//       {error && (
//         <div
//           className="alert alert-danger mb-4"
//           style={{
//             borderRadius: "12px",
//             border: "none",
//           }}
//         >
//           {error}
//         </div>
//       )}

//       {/* =====================================================
//           TABLE
//       ===================================================== */}
//       <div className="um-table-card">

//         <div className="um-table-header">
//           <div>
//             <h5 className="mb-1 fw-bold">
//               School Users
//             </h5>

//             <small>
//               Showing {filteredUsers.length} of {totalUsers} users
//             </small>
//           </div>
//         </div>

//         {loading ? (
//           <div className="um-loading">
//             <div className="spinner-border text-primary" />
//             <p className="mt-3 mb-0">
//               Loading users...
//             </p>
//           </div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="um-empty-state">
//             <FaUsers />

//             <h5>No users found</h5>

//             <p>
//               No users match your current search or filters.
//             </p>
//           </div>
//         ) : (
//           <div className="um-table-wrapper">

//             <table className="um-table">

//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>User</th>
//                   <th>Username</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Role</th>
//                   <th>School</th>
//                   <th>User Group</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredUsers.map((user, index) => {

//                   const status =
//                     user.status?.toUpperCase() === "ACTIVE"
//                       ? "ACTIVE"
//                       : "INACTIVE";

//                   return (
//                     <tr key={user.id}>

//                       {/* INDEX */}
//                       <td>
//                         <div className="um-index">
//                           {index + 1}
//                         </div>
//                       </td>

//                       {/* USER */}
//                       <td>
//                         <div className="um-user-cell">

//                           <div className="um-avatar">
//                             {user.name
//                               ? user.name.charAt(0).toUpperCase()
//                               : <FaUser />
//                             }
//                           </div>

//                           <div>
//                             <div className="fw-bold">
//                               {user.name || "N/A"}
//                             </div>

//                             <small>
//                               ID: {user.id}
//                             </small>
//                           </div>

//                         </div>
//                       </td>

//                       {/* USERNAME */}
//                       <td>
//                         <span
//                           style={{
//                             fontWeight: "600",
//                             color: "#334155",
//                           }}
//                         >
//                           {user.username || "—"}
//                         </span>
//                       </td>

//                       {/* EMAIL */}
//                       <td>
//                         <div className="um-contact-cell">
//                           <FaEnvelope />
//                           <span>
//                             {user.email || "—"}
//                           </span>
//                         </div>
//                       </td>

//                       {/* PHONE */}
//                       <td>
//                         <div className="um-contact-cell">
//                           <FaPhone />
//                           <span>
//                             {user.phone || "—"}
//                           </span>
//                         </div>
//                       </td>

//                       {/* ROLE */}
//                       <td>
//                         <span
//                           className={`um-role ${getRoleClass(
//                             user.role
//                           )}`}
//                         >
//                           {user.role || "—"}
//                         </span>
//                       </td>

//                       {/* SCHOOL */}
//                       <td>
//                         <div className="um-school-cell">
//                           <FaSchool />

//                           <div>
//                             <strong>
//                               {user.schoolName || "—"}
//                             </strong>

//                             {user.schoolCode && (
//                               <small>
//                                 {user.schoolCode}
//                               </small>
//                             )}
//                           </div>
//                         </div>
//                       </td>

//                       {/* USER GROUP */}
//                       <td>
//                         <div className="um-group-cell">

//                           <strong>
//                             {user.userGroupName || "—"}
//                           </strong>

//                           {user.userGroupCode && (
//                             <small>
//                               {user.userGroupCode}
//                             </small>
//                           )}

//                         </div>
//                       </td>

//                       {/* STATUS */}
//                       <td>
//                         <span
//                           className={`um-status ${
//                             status === "ACTIVE"
//                               ? "um-status-active"
//                               : "um-status-inactive"
//                           }`}
//                         >
//                           <span className="um-status-dot" />
//                           {status}
//                         </span>
//                       </td>

//                       {/* ACTION */}
//                       <td>
//                         <button
//                           type="button"
//                           className="um-forgot-btn"
//                           onClick={() => openResetModal(user)}
//                         >
//                           <FaKey />
//                           Reset Password
//                         </button>
//                       </td>

//                     </tr>
//                   );
//                 })}
//               </tbody>

//             </table>
//           </div>
//         )}
//       </div>

//       {/* =====================================================
//           RESET PASSWORD MODAL
//       ===================================================== */}
//       {showResetModal && selectedUser && (
//         <div className="um-modal-overlay">

//           <div className="um-modal">

//             {/* HEADER */}
//             <div className="um-modal-header">

//               <div>
//                 <h5>
//                   Reset User Password
//                 </h5>

//                 <p>
//                   Reset password for{" "}
//                   <strong>
//                     {selectedUser.name}
//                   </strong>
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeResetModal}
//                 disabled={resetLoading}
//               >
//                 <FaTimes />
//               </button>

//             </div>

//             {/* PROGRESS */}
//             {resetStep < 4 && (
//               <div className="um-progress">

//                 <div
//                   className={`um-progress-step ${
//                     resetStep >= 1 ? "active" : ""
//                   }`}
//                 >
//                   <span>1</span>
//                   <small>Send OTP</small>
//                 </div>

//                 <div
//                   className={`um-progress-line ${
//                     resetStep >= 2 ? "active" : ""
//                   }`}
//                 />

//                 <div
//                   className={`um-progress-step ${
//                     resetStep >= 2 ? "active" : ""
//                   }`}
//                 >
//                   <span>2</span>
//                   <small>Verify OTP</small>
//                 </div>

//                 <div
//                   className={`um-progress-line ${
//                     resetStep >= 3 ? "active" : ""
//                   }`}
//                 />

//                 <div
//                   className={`um-progress-step ${
//                     resetStep >= 3 ? "active" : ""
//                   }`}
//                 >
//                   <span>3</span>
//                   <small>New Password</small>
//                 </div>

//               </div>
//             )}

//             {/* BODY */}
//             <div className="um-modal-body">

//               {/* SELECTED USER */}
//               <div className="um-selected-user">

//                 <div className="um-avatar">
//                   {selectedUser.name
//                     ? selectedUser.name.charAt(0).toUpperCase()
//                     : <FaUser />
//                   }
//                 </div>

//                 <div>
//                   <strong>
//                     {selectedUser.name}
//                   </strong>

//                   <span>
//                     {selectedUser.email}
//                   </span>
//                 </div>

//               </div>

//               {/* ERROR */}
//               {resetError && (
//                 <div className="um-reset-error">
//                   {resetError}
//                 </div>
//               )}

//               {/* =================================================
//                   STEP 1
//               ================================================= */}
//               {resetStep === 1 && (
//                 <div className="um-step-content">

//                   <div className="um-step-icon">
//                     <FaEnvelope />
//                   </div>

//                   <h5>
//                     Send OTP
//                   </h5>

//                   <p>
//                     An OTP will be sent to the registered email
//                     address of this user.
//                   </p>

//                   <div className="um-email-box">
//                     <FaEnvelope />
//                     <span>
//                       {selectedUser.email}
//                     </span>
//                   </div>

//                 </div>
//               )}

//               {/* =================================================
//                   STEP 2
//               ================================================= */}
//               {resetStep === 2 && (
//                 <div className="um-step-content">

//                   <div className="um-step-icon">
//                     <FaLock />
//                   </div>

//                   <h5>
//                     Verify OTP
//                   </h5>

//                   <p>
//                     Enter the OTP sent to the user's registered
//                     email address.
//                   </p>

//                   <input
//                     type="text"
//                     className="um-otp-input"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     maxLength={6}
//                     onChange={(e) =>
//                       setOtp(
//                         e.target.value.replace(/\D/g, "")
//                       )
//                     }
//                   />

//                 </div>
//               )}

//               {/* =================================================
//                   STEP 3
//               ================================================= */}
//               {resetStep === 3 && (
//                 <div className="um-step-content">

//                   <div className="um-step-icon">
//                     <FaKey />
//                   </div>

//                   <h5>
//                     Create New Password
//                   </h5>

//                   <p>
//                     Enter a new password for this user.
//                   </p>

//                   {/* NEW PASSWORD */}
//                   <div className="um-password-box">

//                     <FaLock />

//                     <input
//                       type={
//                         showPassword
//                           ? "text"
//                           : "password"
//                       }
//                       placeholder="New password"
//                       value={newPassword}
//                       onChange={(e) =>
//                         setNewPassword(e.target.value)
//                       }
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPassword(!showPassword)
//                       }
//                     >
//                       {showPassword ? (
//                         <FaEyeSlash />
//                       ) : (
//                         <FaEye />
//                       )}
//                     </button>

//                   </div>

//                   {/* CONFIRM PASSWORD */}
//                   <div className="um-password-box">

//                     <FaLock />

//                     <input
//                       type={
//                         showConfirmPassword
//                           ? "text"
//                           : "password"
//                       }
//                       placeholder="Confirm new password"
//                       value={confirmPassword}
//                       onChange={(e) =>
//                         setConfirmPassword(e.target.value)
//                       }
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowConfirmPassword(
//                           !showConfirmPassword
//                         )
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <FaEyeSlash />
//                       ) : (
//                         <FaEye />
//                       )}
//                     </button>

//                   </div>

//                 </div>
//               )}

//               {/* =================================================
//                   SUCCESS
//               ================================================= */}
//               {resetStep === 4 && (
//                 <div className="um-success-message">

//                   <div className="um-success-icon">
//                     <FaCheckCircle />
//                   </div>

//                   <h5>
//                     Password Reset Successful
//                   </h5>

//                   <p>
//                     The password for{" "}
//                     <strong>
//                       {selectedUser.name}
//                     </strong>{" "}
//                     has been changed successfully.
//                   </p>

//                 </div>
//               )}

//             </div>

//             {/* FOOTER */}
//             <div className="um-modal-footer">

//               {resetStep === 1 && (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-light"
//                     onClick={closeResetModal}
//                     disabled={resetLoading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={sendOtp}
//                     disabled={resetLoading}
//                   >
//                     {resetLoading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         Send OTP
//                         <FaArrowRight />
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {resetStep === 2 && (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-light"
//                     onClick={() => setResetStep(1)}
//                     disabled={resetLoading}
//                   >
//                     <FaArrowLeft />
//                     Back
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={verifyOtp}
//                     disabled={resetLoading}
//                   >
//                     {resetLoading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Verifying...
//                       </>
//                     ) : (
//                       <>
//                         Verify OTP
//                         <FaArrowRight />
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {resetStep === 3 && (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-light"
//                     onClick={() => setResetStep(2)}
//                     disabled={resetLoading}
//                   >
//                     <FaArrowLeft />
//                     Back
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={changePassword}
//                     disabled={resetLoading}
//                   >
//                     {resetLoading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Resetting...
//                       </>
//                     ) : (
//                       <>
//                         Reset Password
//                         <FaKey />
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {resetStep === 4 && (
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={closeResetModal}
//                 >
//                   Done
//                 </button>
//               )}

//             </div>

//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           SAME EXISTING THEME CSS
//       ===================================================== */}
//       <style>{`

//         .um-refresh-btn {
//           border: none;
//           background: linear-gradient(135deg, #2563eb, #1d4ed8);
//           color: white;
//           padding: 10px 18px;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           box-shadow: 0 4px 12px rgba(37, 99, 235, 0.18);
//         }

//         .um-refresh-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .um-spin {
//           animation: umSpin 1s linear infinite;
//         }

//         @keyframes umSpin {
//           from {
//             transform: rotate(0deg);
//           }

//           to {
//             transform: rotate(360deg);
//           }
//         }

//         /* ============================================
//            STAT CARDS
//         ============================================ */

//         .premium-stat-card {
//           min-height: 105px;
//           border-radius: 16px;
//           padding: 20px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           background: white;
//           border: 1px solid #e5e7eb;
//           box-shadow: 0 5px 18px rgba(15, 23, 42, 0.06);
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;
//           min-width: 48px;
//           border-radius: 13px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//         }

//         .stat-content {
//           display: flex;
//           flex-direction: column;
//           gap: 3px;
//         }

//         .stat-content span {
//           color: #64748b;
//           font-size: 13px;
//         }

//         .stat-content strong {
//           color: #0f172a;
//           font-size: 24px;
//           line-height: 1;
//         }

//         .stat-blue {
//           border-left: 4px solid #2563eb;
//         }

//         .stat-blue .stat-icon {
//           background: #dbeafe;
//           color: #2563eb;
//         }

//         .stat-green {
//           border-left: 4px solid #16a34a;
//         }

//         .stat-green .stat-icon {
//           background: #dcfce7;
//           color: #16a34a;
//         }

//         .stat-orange {
//           border-left: 4px solid #f59e0b;
//         }

//         .stat-orange .stat-icon {
//           background: #fef3c7;
//           color: #f59e0b;
//         }

//         .stat-red {
//           border-left: 4px solid #ef4444;
//         }

//         .stat-red .stat-icon {
//           background: #fee2e2;
//           color: #ef4444;
//         }

//         /* ============================================
//            TOOLBAR
//         ============================================ */

//         .um-toolbar-wrapper {
//           background: white;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           padding: 16px;
//           box-shadow: 0 5px 18px rgba(15, 23, 42, 0.05);
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           flex-wrap: wrap;
//         }

//         .um-search-box {
//           flex: 1;
//           min-width: 280px;
//           height: 44px;
//           border: 1px solid #dbe2ea;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           padding: 0 13px;
//           gap: 10px;
//           background: #f8fafc;
//         }

//         .um-search-box svg {
//           color: #64748b;
//         }

//         .um-search-box input {
//           border: none;
//           outline: none;
//           width: 100%;
//           background: transparent;
//           font-size: 14px;
//           color: #334155;
//         }

//         .um-filters-container {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           flex-wrap: wrap;
//         }

//         .um-filter-box select {
//           height: 44px;
//           min-width: 130px;
//           border: 1px solid #dbe2ea;
//           border-radius: 10px;
//           padding: 0 12px;
//           outline: none;
//           background: white;
//           color: #334155;
//           font-size: 14px;
//         }

//         .um-clear-filter-btn {
//           height: 44px;
//           border: none;
//           border-radius: 10px;
//           background: #f1f5f9;
//           color: #475569;
//           padding: 0 14px;
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         /* ============================================
//            TABLE
//         ============================================ */

//         .um-table-card {
//           background: white;
//           border-radius: 16px;
//           border: 1px solid #e5e7eb;
//           overflow: hidden;
//           box-shadow: 0 5px 18px rgba(15, 23, 42, 0.05);
//         }

//         .um-table-header {
//           padding: 18px 20px;
//           border-bottom: 1px solid #e5e7eb;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .um-table-header h5 {
//           color: #1e3a8a;
//         }

//         .um-table-header small {
//           color: #64748b;
//         }

//         .um-table-wrapper {
//           overflow-x: auto;
//         }

//         .um-table {
//           width: 100%;
//           border-collapse: collapse;
//           min-width: 1250px;
//         }

//         .um-table th {
//           background: #f8fafc;
//           color: #475569;
//           font-size: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.4px;
//           font-weight: 700;
//           padding: 14px 12px;
//           border-bottom: 1px solid #e2e8f0;
//           white-space: nowrap;
//         }

//         .um-table td {
//           padding: 14px 12px;
//           border-bottom: 1px dotted #e2e8f0;
//           color: #334155;
//           font-size: 13px;
//           vertical-align: middle;
//         }

//         .um-table tbody tr:hover {
//           background: #f8fbff;
//         }

//         .um-index {
//           width: 30px;
//           height: 30px;
//           border-radius: 8px;
//           background: #eff6ff;
//           color: #2563eb;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//         }

//         .um-user-cell {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           min-width: 170px;
//         }

//         .um-avatar {
//           width: 38px;
//           height: 38px;
//           min-width: 38px;
//           border-radius: 11px;
//           background: linear-gradient(
//             135deg,
//             #dbeafe,
//             #bfdbfe
//           );
//           color: #1d4ed8;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 800;
//         }

//         .um-user-cell small {
//           color: #94a3b8;
//           font-size: 11px;
//         }

//         .um-contact-cell {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           white-space: nowrap;
//         }

//         .um-contact-cell svg {
//           color: #64748b;
//           font-size: 12px;
//         }

//         .um-role {
//           display: inline-flex;
//           padding: 5px 10px;
//           border-radius: 20px;
//           font-size: 11px;
//           font-weight: 700;
//           white-space: nowrap;
//         }

//         .um-role-admin {
//           background: #ede9fe;
//           color: #7c3aed;
//         }

//         .um-role-teacher {
//           background: #dbeafe;
//           color: #2563eb;
//         }

//         .um-role-student {
//           background: #dcfce7;
//           color: #15803d;
//         }

//         .um-role-default {
//           background: #f1f5f9;
//           color: #475569;
//         }

//         .um-school-cell {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           min-width: 130px;
//         }

//         .um-school-cell > svg {
//           color: #2563eb;
//         }

//         .um-school-cell div {
//           display: flex;
//           flex-direction: column;
//         }

//         .um-school-cell strong {
//           font-size: 12px;
//         }

//         .um-school-cell small {
//           color: #94a3b8;
//           font-size: 10px;
//         }

//         .um-group-cell {
//           display: flex;
//           flex-direction: column;
//           min-width: 100px;
//         }

//         .um-group-cell strong {
//           font-size: 12px;
//         }

//         .um-group-cell small {
//           color: #94a3b8;
//           font-size: 10px;
//         }

//         .um-status {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 5px 10px;
//           border-radius: 20px;
//           font-size: 11px;
//           font-weight: 700;
//           white-space: nowrap;
//         }

//         .um-status-dot {
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           display: inline-block;
//         }

//         .um-status-active {
//           background: #dcfce7;
//           color: #15803d;
//         }

//         .um-status-active .um-status-dot {
//           background: #16a34a;
//         }

//         .um-status-inactive {
//           background: #fee2e2;
//           color: #dc2626;
//         }

//         .um-status-inactive .um-status-dot {
//           background: #ef4444;
//         }

//         .um-forgot-btn {
//           border: none;
//           background: #eff6ff;
//           color: #2563eb;
//           border-radius: 9px;
//           padding: 8px 11px;
//           display: inline-flex;
//           align-items: center;
//           gap: 7px;
//           font-size: 12px;
//           font-weight: 700;
//           white-space: nowrap;
//           cursor: pointer;
//         }

//         .um-forgot-btn:hover {
//           background: #dbeafe;
//         }

//         /* ============================================
//            LOADING / EMPTY
//         ============================================ */

//         .um-loading {
//           min-height: 250px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           color: #64748b;
//         }

//         .um-empty-state {
//           min-height: 250px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           color: #64748b;
//           text-align: center;
//         }

//         .um-empty-state svg {
//           font-size: 40px;
//           color: #cbd5e1;
//           margin-bottom: 12px;
//         }

//         .um-empty-state h5 {
//           color: #334155;
//           margin-bottom: 5px;
//         }

//         /* ============================================
//            MODAL
//         ============================================ */

//         .um-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(15, 23, 42, 0.55);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           padding: 20px;
//         }

//         .um-modal {
//           width: 100%;
//           max-width: 550px;
//           background: white;
//           border-radius: 18px;
//           overflow: hidden;
//           box-shadow: 0 25px 70px rgba(15, 23, 42, 0.25);
//         }

//         .um-modal-header {
//           padding: 18px 20px;
//           display: flex;
//           align-items: flex-start;
//           justify-content: space-between;
//           border-bottom: 1px solid #e5e7eb;
//         }

//         .um-modal-header h5 {
//           color: #1e3a8a;
//           margin-bottom: 4px;
//           font-weight: 700;
//         }

//         .um-modal-header p {
//           margin: 0;
//           color: #64748b;
//           font-size: 12px;
//         }

//         .um-modal-header > button {
//           border: none;
//           background: #f1f5f9;
//           color: #64748b;
//           width: 34px;
//           height: 34px;
//           border-radius: 9px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//         }

//         .um-progress {
//           display: flex;
//           align-items: center;
//           padding: 18px 25px;
//           background: #f8fafc;
//         }

//         .um-progress-step {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 5px;
//           min-width: 70px;
//           color: #94a3b8;
//         }

//         .um-progress-step span {
//           width: 30px;
//           height: 30px;
//           border-radius: 50%;
//           background: #e2e8f0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 12px;
//           font-weight: 700;
//         }

//         .um-progress-step small {
//           font-size: 10px;
//           white-space: nowrap;
//         }

//         .um-progress-step.active {
//           color: #2563eb;
//         }

//         .um-progress-step.active span {
//           background: #2563eb;
//           color: white;
//         }

//         .um-progress-line {
//           flex: 1;
//           height: 2px;
//           background: #e2e8f0;
//           margin: 0 5px;
//           margin-bottom: 17px;
//         }

//         .um-progress-line.active {
//           background: #2563eb;
//         }

//         .um-modal-body {
//           padding: 22px;
//         }

//         .um-selected-user {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px;
//           border-radius: 12px;
//           background: #f8fafc;
//           border: 1px solid #e2e8f0;
//           margin-bottom: 20px;
//         }

//         .um-selected-user > div:last-child {
//           display: flex;
//           flex-direction: column;
//         }

//         .um-selected-user strong {
//           color: #334155;
//         }

//         .um-selected-user span {
//           color: #64748b;
//           font-size: 12px;
//         }

//         .um-step-content {
//           text-align: center;
//           padding: 5px 10px 10px;
//         }

//         .um-step-icon {
//           width: 55px;
//           height: 55px;
//           border-radius: 15px;
//           background: #eff6ff;
//           color: #2563eb;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 12px;
//           font-size: 21px;
//         }

//         .um-step-content h5 {
//           color: #1e3a8a;
//           font-weight: 700;
//           margin-bottom: 6px;
//         }

//         .um-step-content p {
//           color: #64748b;
//           font-size: 13px;
//           line-height: 1.6;
//           margin-bottom: 18px;
//         }

//         .um-email-box {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           background: #f8fafc;
//           border: 1px solid #e2e8f0;
//           border-radius: 10px;
//           padding: 12px;
//           color: #334155;
//           font-size: 13px;
//           text-align: left;
//         }

//         .um-email-box svg {
//           color: #2563eb;
//         }

//         .um-otp-input {
//           width: 100%;
//           height: 52px;
//           border: 1px solid #cbd5e1;
//           border-radius: 10px;
//           text-align: center;
//           font-size: 22px;
//           letter-spacing: 7px;
//           font-weight: 700;
//           outline: none;
//         }

//         .um-otp-input:focus {
//           border-color: #2563eb;
//           box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
//         }

//         .um-password-box {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           height: 48px;
//           border: 1px solid #cbd5e1;
//           border-radius: 10px;
//           padding: 0 12px;
//           margin-bottom: 12px;
//         }

//         .um-password-box > svg {
//           color: #64748b;
//         }

//         .um-password-box input {
//           flex: 1;
//           border: none;
//           outline: none;
//           height: 100%;
//           font-size: 13px;
//         }

//         .um-password-box button {
//           border: none;
//           background: transparent;
//           color: #64748b;
//           cursor: pointer;
//         }

//         .um-reset-error {
//           background: #fef2f2;
//           color: #dc2626;
//           border: 1px solid #fecaca;
//           border-radius: 9px;
//           padding: 10px 12px;
//           font-size: 12px;
//           margin-bottom: 15px;
//         }

//         .um-success-message {
//           text-align: center;
//           padding: 20px 10px;
//         }

//         .um-success-icon {
//           width: 65px;
//           height: 65px;
//           border-radius: 50%;
//           background: #dcfce7;
//           color: #16a34a;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 15px;
//           font-size: 28px;
//         }

//         .um-success-message h5 {
//           color: #166534;
//           font-weight: 700;
//         }

//         .um-success-message p {
//           color: #64748b;
//           font-size: 13px;
//           margin-bottom: 0;
//         }

//         .um-modal-footer {
//           padding: 15px 20px;
//           border-top: 1px solid #e5e7eb;
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//         }

//         .um-modal-footer button {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           border-radius: 9px;
//           padding: 9px 15px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         @media (max-width: 768px) {

//           .um-toolbar-wrapper {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .um-search-box {
//             min-width: 100%;
//           }

//           .um-filters-container {
//             width: 100%;
//           }

//           .um-filter-box {
//             flex: 1;
//           }

//           .um-filter-box select {
//             width: 100%;
//           }

//           .um-clear-filter-btn {
//             justify-content: center;
//           }

//           .um-modal {
//             max-height: 95vh;
//             overflow-y: auto;
//           }

//         }

//       `}</style>
//     </div>
//   );
// };

// export default SchoolUserManagement;

import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaSyncAlt,
  FaKey,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaUserShield,
  FaTimes,
  FaArrowRight,
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { MdOutlineSchool, MdPeople } from "react-icons/md";

import axiosInstance from "../api/axiosInstance";

const SchoolUserManagement = () => {
  const schoolId = localStorage.getItem("schoolId");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [resetStep, setResetStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================================================
  // FETCH SCHOOL USERS
  // =========================================================

  const fetchUsers = async () => {
    if (!schoolId) {
      setUsers([]);
      setError("School ID not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Calling:", `/api/user/school/${schoolId}`);

      const response = await axiosInstance.get(`/api/user/school/${schoolId}`);

      console.log("USER API RESPONSE:", response.data);
      console.log("DATA TYPE:", typeof response.data);
      console.log("IS ARRAY:", Array.isArray(response.data));

      // IMPORTANT:
      // Backend should return UserResponseDTO[]
      // DO NOT use JSON.parse() here.
      const rawUsers = Array.isArray(response.data) ? response.data : [];

      const normalizedUsers = rawUsers.map((user) => ({
        ...user,

        schoolId: user.schoolId ?? null,
        schoolName: user.schoolName ?? "",
        schoolCode: user.schoolCode ?? "",

        userGroupId: user.userGroupId ?? null,
        userGroupName: user.userGroupName ?? "",
        userGroupCode: user.userGroupCode ?? "",

        name: user.name ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? "",
        status: user.status ?? "INACTIVE",
      }));

      console.log("FINAL USERS ARRAY:", normalizedUsers);

      setUsers(normalizedUsers);
    } catch (err) {
      console.error("USER API ERROR:", err);

      setUsers([]);

      setError(
        err?.response?.data?.message ||
          (typeof err?.response?.data === "string"
            ? err.response.data
            : "Failed to fetch school users."),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [schoolId]);

  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        user.name?.toLowerCase().includes(search) ||
        user.username?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phone?.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search);

      const matchesRole =
        !roleFilter || user.role?.toLowerCase() === roleFilter.toLowerCase();

      const normalizedStatus = String(user.status || "").toUpperCase();

      const matchesStatus =
        !statusFilter || normalizedStatus === statusFilter.toUpperCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // =========================================================
  // STATS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => String(user.status || "").toUpperCase() === "ACTIVE",
  ).length;

  const inactiveUsers = users.filter(
    (user) => String(user.status || "").toUpperCase() === "INACTIVE",
  ).length;

  const adminUsers = users.filter((user) =>
    user.role?.toLowerCase().includes("admin"),
  ).length;

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
  };

  // =========================================================
  // OPEN RESET MODAL
  // =========================================================

  const openResetModal = (user) => {
    setSelectedUser(user);

    setResetStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");

    setResetError("");
    setResetSuccess("");

    setShowPassword(false);
    setShowConfirmPassword(false);

    setShowResetModal(true);
  };

  // =========================================================
  // CLOSE RESET MODAL
  // =========================================================

  const closeResetModal = () => {
    if (resetLoading) return;

    setShowResetModal(false);
    setSelectedUser(null);

    setResetStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");

    setResetError("");
    setResetSuccess("");

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // =========================================================
  // STEP 1 - SEND OTP
  // =========================================================

  const sendOtp = async () => {
    if (!selectedUser?.email) {
      setResetError("User email not found.");
      return;
    }

    try {
      setResetLoading(true);
      setResetError("");
      setResetSuccess("");

      await axiosInstance.post(
        `/api/password-reset/send-otp?email=${encodeURIComponent(
          selectedUser.email,
        )}`,
      );

      setResetStep(2);
    } catch (err) {
      console.error("Send OTP error:", err);

      setResetError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message ||
              "Failed to send OTP. Please try again.",
      );
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // STEP 2 - VERIFY OTP
  // =========================================================

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setResetError("Please enter a valid OTP.");
      return;
    }

    try {
      setResetLoading(true);
      setResetError("");
      setResetSuccess("");

      await axiosInstance.post(
        `/api/password-reset/verify-otp?email=${encodeURIComponent(
          selectedUser.email,
        )}&otp=${encodeURIComponent(otp)}`,
      );

      setResetStep(3);
    } catch (err) {
      console.error("Verify OTP error:", err);

      setResetError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Invalid or expired OTP.",
      );
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // STEP 3 - CHANGE PASSWORD
  // =========================================================

  const changePassword = async () => {
    setResetError("");
    setResetSuccess("");

    if (!newPassword) {
      setResetError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    try {
      setResetLoading(true);

      await axiosInstance.post("/api/password-reset/change-password", {
        email: selectedUser.email,
        newPassword: newPassword,
      });

      setResetSuccess("Password reset successfully.");

      setResetStep(4);
    } catch (err) {
      console.error("Change password error:", err);

      setResetError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message ||
              "Failed to reset password. Please try again.",
      );
    } finally {
      setResetLoading(false);
    }
  };

  // =========================================================
  // ROLE BADGE
  // =========================================================

  const getRoleBadge = (role) => {
    const value = role?.toLowerCase() || "";

    if (value.includes("admin")) {
      return {
        backgroundColor: "#ede9fe",
        color: "#7c3aed",
      };
    }

    if (value.includes("teacher")) {
      return {
        backgroundColor: "#dbeafe",
        color: "#2563eb",
      };
    }

    if (value.includes("student")) {
      return {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      };
    }

    return {
      backgroundColor: "#f1f5f9",
      color: "#475569",
    };
  };

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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUsers size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    School User Management
                  </h5>

                  <div className="text-muted small">
                    Users &nbsp;/&nbsp; School User Management
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
                  School Users
                </span>
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
              Home &nbsp;›&nbsp; Users &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                School User Management
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Users</span>

              <h3>{totalUsers.toLocaleString("en-IN")}</h3>

              <small>Total school users</small>
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Active Users</span>

              <h3>{activeUsers.toLocaleString("en-IN")}</h3>

              <small>Currently active</small>
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div className="stat-content">
              <span>Inactive Users</span>

              <h3>{inactiveUsers.toLocaleString("en-IN")}</h3>

              <small>Currently inactive</small>
            </div>
          </div>
        </div>

        {/* ADMIN */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaUserShield />
            </div>

            <div className="stat-content">
              <span>Admin Users</span>

              <h3>{adminUsers.toLocaleString("en-IN")}</h3>

              <small>Administrative users</small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">
          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">User Filter</h6>

                  <small className="lh-1 text-muted mt-1">
                    Search and filter school users
                  </small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <FaUsers className="me-1" />
                Users
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-xl-6 col-md-6">
                <label className="form-label fw-semibold">Search User</label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name / Username / Email / Phone / Role"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* ROLE */}

              <div className="col-xl-3 col-md-3">
                <label className="form-label fw-semibold">Role</label>

                <select
                  className="form-select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>

                  {[...new Set(users.map((user) => user.role).filter(Boolean))]
                    .sort()
                    .map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                </select>
              </div>

              {/* STATUS */}

              <div className="col-xl-3 col-md-3">
                <label className="form-label fw-semibold">Status</label>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>

                  <option value="ACTIVE">Active</option>

                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="d-flex justify-content-end flex-wrap gap-2 mt-4">
              {(searchTerm || roleFilter || statusFilter) && (
                <button
                  className="btn btn-outline-secondary rounded-3 px-3"
                  onClick={clearFilters}
                >
                  <FaTimes className="me-2" />
                  Clear Filter
                </button>
              )}

              <button
                className="btn btn-outline-primary rounded-3 px-3"
                onClick={fetchUsers}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FaSyncAlt className="me-2" />
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2">
        {" "}
        <div className="card shadow border-0 rounded-4 mb-4 overflow-hidden">
          {" "}
          {/* TABLE HEADER */}{" "}
          <div
            className="card-header bg-white px-4 py-3"
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            {" "}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              {" "}
              <div className="d-flex align-items-center">
                {" "}
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 7px 18px rgba(37,99,235,.20)",
                  }}
                >
                  {" "}
                  <FaUsers size={21} />{" "}
                </div>{" "}
                <div className="ms-3">
                  {" "}
                  <h6 className="mb-1 fw-bold text-dark">
                    {" "}
                    School Users{" "}
                  </h6>{" "}
                  <small className="text-muted">
                    {" "}
                    Manage and reset passwords for school users{" "}
                  </small>{" "}
                </div>{" "}
              </div>{" "}
              <div className="d-flex align-items-center gap-2">
                {" "}
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {" "}
                  <FaUsers className="me-1" /> {filteredUsers.length} Users{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* TABLE */}{" "}
          <div className="table-responsive">
            {" "}
            <table className="table mb-0 align-middle school-users-table">
              {" "}
              {/* HEADER */}{" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th className="text-center" style={{ width: "60px" }}>
                    {" "}
                    #{" "}
                  </th>{" "}
                  <th style={{ minWidth: "220px" }}> USER </th>{" "}
                  <th style={{ minWidth: "150px" }}> USERNAME </th>{" "}
                  <th style={{ minWidth: "250px" }}> CONTACT </th>{" "}
                  <th className="text-center" style={{ minWidth: "130px" }}>
                    {" "}
                    ROLE{" "}
                  </th>{" "}
                  <th style={{ minWidth: "170px" }}> USER GROUP </th>{" "}
                  <th className="text-center" style={{ minWidth: "120px" }}>
                    {" "}
                    STATUS{" "}
                  </th>{" "}
                  <th className="text-center" style={{ minWidth: "160px" }}>
                    {" "}
                    ACTION{" "}
                  </th>{" "}
                </tr>{" "}
              </thead>{" "}
              {/* BODY */}{" "}
              <tbody>
                {" "}
                {loading ? (
                  <tr>
                    {" "}
                    <td colSpan="8" className="text-center py-5">
                      {" "}
                      <div
                        className="spinner-border text-primary"
                        style={{ width: "2.3rem", height: "2.3rem" }}
                      />{" "}
                      <div className="mt-3 text-muted">
                        {" "}
                        Loading school users...{" "}
                      </div>{" "}
                    </td>{" "}
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => {
                    const status = String(user.status || "").toUpperCase();
                    const isActive = status === "ACTIVE";
                    const role = user.role || "—";
                    const roleValue = role.toLowerCase();
                    let roleStyle = {
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      border: "1px solid #e2e8f0",
                    };
                    if (roleValue.includes("admin")) {
                      roleStyle = {
                        backgroundColor: "#ede9fe",
                        color: "#7c3aed",
                        border: "1px solid #ddd6fe",
                      };
                    } else if (roleValue.includes("teacher")) {
                      roleStyle = {
                        backgroundColor: "#dbeafe",
                        color: "#2563eb",
                        border: "1px solid #bfdbfe",
                      };
                    } else if (roleValue.includes("student")) {
                      roleStyle = {
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                        border: "1px solid #bbf7d0",
                      };
                    }
                    return (
                      <tr key={user.id || index}>
                        {" "}
                        {/* ===================== SERIAL NUMBER ====================== */}{" "}
                        <td className="text-center">
                          {" "}
                          <span className="user-index"> {index + 1} </span>{" "}
                        </td>{" "}
                        {/* ===================== USER ====================== */}{" "}
                        <td>
                          {" "}
                          <div className="d-flex align-items-center">
                            {" "}
                            <div className="user-avatar">
                              {" "}
                              {user.name ? (
                                user.name.charAt(0).toUpperCase()
                              ) : (
                                <FaUser />
                              )}{" "}
                            </div>{" "}
                            <div className="ms-3">
                              {" "}
                              <div className="fw-bold text-dark user-name">
                                {" "}
                                {user.name || "N/A"}{" "}
                              </div>{" "}
                              <div className="user-id">
                                {" "}
                                User ID: <span> {user.id || "—"} </span>{" "}
                              </div>{" "}
                            </div>{" "}
                          </div>{" "}
                        </td>{" "}
                        {/* ===================== USERNAME ====================== */}{" "}
                        <td>
                          {" "}
                          <div className="username-box">
                            {" "}
                            <span className="username-icon"> @ </span>{" "}
                            <span className="fw-semibold">
                              {" "}
                              {user.username || "—"}{" "}
                            </span>{" "}
                          </div>{" "}
                        </td>{" "}
                        {/* ===================== CONTACT ====================== */}{" "}
                        <td>
                          {" "}
                          <div className="contact-wrapper">
                            {" "}
                            {/* EMAIL */}{" "}
                            <div className="contact-row">
                              {" "}
                              <div className="contact-icon email-icon">
                                {" "}
                                <FaEnvelope size={11} />{" "}
                              </div>{" "}
                              <span className="contact-text" title={user.email}>
                                {" "}
                                {user.email || "—"}{" "}
                              </span>{" "}
                            </div>{" "}
                            {/* PHONE */}{" "}
                            <div className="contact-row mt-1">
                              {" "}
                              <div className="contact-icon phone-icon">
                                {" "}
                                <FaPhone size={10} />{" "}
                              </div>{" "}
                              <span className="contact-text">
                                {" "}
                                {user.phone || "—"}{" "}
                              </span>{" "}
                            </div>{" "}
                          </div>{" "}
                        </td>{" "}
                        {/* ===================== ROLE ====================== */}{" "}
                        <td className="text-center">
                          {" "}
                          <span className="role-badge" style={roleStyle}>
                            {" "}
                            {role}{" "}
                          </span>{" "}
                        </td>{" "}
                        {/* ===================== USER GROUP ====================== */}{" "}
                        <td>
                          {" "}
                          {user.userGroupName ? (
                            <div className="user-group-box">
                              {" "}
                              <div className="d-flex align-items-center">
                                {" "}
                                <div className="group-icon">
                                  {" "}
                                  <FaUsers size={12} />{" "}
                                </div>{" "}
                                <div className="ms-2">
                                  {" "}
                                  <div className="group-name">
                                    {" "}
                                    {user.userGroupName}{" "}
                                  </div>{" "}
                                  {user.userGroupCode && (
                                    <div className="group-code">
                                      {" "}
                                      {user.userGroupCode}{" "}
                                    </div>
                                  )}{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>
                          ) : (
                            <span className="text-muted"> — </span>
                          )}{" "}
                        </td>{" "}
                        {/* ===================== STATUS ====================== */}{" "}
                        <td className="text-center">
                          {" "}
                          <span
                            className={
                              isActive
                                ? "status-badge status-active"
                                : "status-badge status-inactive"
                            }
                          >
                            {" "}
                            <span className="status-dot"></span>{" "}
                            {isActive ? "Active" : "Inactive"}{" "}
                          </span>{" "}
                        </td>{" "}
                        {/* ===================== ACTION ====================== */}{" "}
                        <td className="text-center">
                          {" "}
                          <button
                            type="button"
                            className="reset-password-btn"
                            onClick={() => openResetModal(user)}
                            title="Reset Password"
                          >
                            {" "}
                            <FaKey size={12} />{" "}
                            <span> Reset Password </span>{" "}
                          </button>{" "}
                        </td>{" "}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    {" "}
                    <td colSpan="8" className="text-center py-5">
                      {" "}
                      <div className="empty-user-icon mx-auto mb-3">
                        {" "}
                        <FaUsers size={27} />{" "}
                      </div>{" "}
                      <h6 className="fw-bold text-dark mb-1">
                        {" "}
                        No Users Found{" "}
                      </h6>{" "}
                      <small className="text-muted">
                        {" "}
                        No users match your selected search or filters.{" "}
                      </small>{" "}
                    </td>{" "}
                  </tr>
                )}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>

      {/* =====================================================
          REPORT / SUMMARY FOOTER
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-5">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                    }}
                  >
                    <FaUsers size={23} />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold">User Summary</h6>

                    <small className="text-muted">
                      Showing{" "}
                      <span className="text-primary fw-bold">
                        {filteredUsers.length}
                      </span>{" "}
                      user(s)
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <button
                  className="btn btn-outline-primary rounded-3 me-2"
                  onClick={fetchUsers}
                  disabled={loading}
                >
                  <FaSyncAlt className="me-2" />
                  Refresh
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <div className="row text-center">
              <div className="col-md-3 border-end">
                <small className="text-muted">Total Users</small>

                <h4 className="text-primary fw-bold mt-1">{totalUsers}</h4>
              </div>

              <div className="col-md-3 border-end">
                <small className="text-muted">Active Users</small>

                <h4 className="text-success fw-bold mt-1">{activeUsers}</h4>
              </div>

              <div className="col-md-3 border-end">
                <small className="text-muted">Inactive Users</small>

                <h4 className="text-danger fw-bold mt-1">{inactiveUsers}</h4>
              </div>

              <div className="col-md-3">
                <small className="text-muted">Admin Users</small>

                <h4 className="text-warning fw-bold mt-1">{adminUsers}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESET PASSWORD MODAL
      ===================================================== */}

      {showResetModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(15,23,42,.55)",
            zIndex: 9999,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              {/* HEADER */}

              <div
                className="modal-header"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <div>
                  <h5 className="modal-title fw-bold text-dark">
                    Reset User Password
                  </h5>

                  <small className="text-muted">
                    Reset password for <strong>{selectedUser.name}</strong>
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={closeResetModal}
                  disabled={resetLoading}
                >
                  <FaTimes />
                </button>
              </div>

              {/* PROGRESS */}

              {resetStep < 4 && (
                <div
                  className="px-4 py-3"
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#2563eb",
                          color: "#fff",
                          fontWeight: "700",
                        }}
                      >
                        1
                      </div>

                      <small className="text-primary">Send OTP</small>
                    </div>

                    <div
                      style={{
                        width: "70px",
                        height: "2px",
                        background: resetStep >= 2 ? "#2563eb" : "#e2e8f0",
                        margin: "0 8px 20px",
                      }}
                    />

                    <div className="text-center">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: resetStep >= 2 ? "#2563eb" : "#e2e8f0",
                          color: resetStep >= 2 ? "#fff" : "#64748b",
                          fontWeight: "700",
                        }}
                      >
                        2
                      </div>

                      <small
                        className={
                          resetStep >= 2 ? "text-primary" : "text-muted"
                        }
                      >
                        Verify OTP
                      </small>
                    </div>

                    <div
                      style={{
                        width: "70px",
                        height: "2px",
                        background: resetStep >= 3 ? "#2563eb" : "#e2e8f0",
                        margin: "0 8px 20px",
                      }}
                    />

                    <div className="text-center">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: resetStep >= 3 ? "#2563eb" : "#e2e8f0",
                          color: resetStep >= 3 ? "#fff" : "#64748b",
                          fontWeight: "700",
                        }}
                      >
                        3
                      </div>

                      <small
                        className={
                          resetStep >= 3 ? "text-primary" : "text-muted"
                        }
                      >
                        New Password
                      </small>
                    </div>
                  </div>
                </div>
              )}

              {/* BODY */}

              <div className="modal-body p-4">
                {/* SELECTED USER */}

                <div
                  className="d-flex align-items-center p-3 rounded-3 mb-4"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 me-3"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                      color: "#1d4ed8",
                      fontWeight: "800",
                    }}
                  >
                    {selectedUser.name ? (
                      selectedUser.name.charAt(0).toUpperCase()
                    ) : (
                      <FaUser />
                    )}
                  </div>

                  <div>
                    <div className="fw-bold">{selectedUser.name}</div>

                    <small className="text-muted">{selectedUser.email}</small>
                  </div>
                </div>

                {/* ERROR */}

                {resetError && (
                  <div className="alert alert-danger py-2 small rounded-3">
                    {resetError}
                  </div>
                )}

                {/* STEP 1 */}

                {resetStep === 1 && (
                  <div className="text-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mx-auto mb-3"
                      style={{
                        width: "55px",
                        height: "55px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaEnvelope size={22} />
                    </div>

                    <h5 className="fw-bold text-dark">Send OTP</h5>

                    <p className="text-muted small">
                      An OTP will be sent to the registered email address of
                      this user.
                    </p>

                    <div
                      className="d-flex align-items-center gap-2 p-3 rounded-3 text-start"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <FaEnvelope className="text-primary" />

                      <span className="small">{selectedUser.email}</span>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}

                {resetStep === 2 && (
                  <div className="text-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 mx-auto mb-3"
                      style={{
                        width: "55px",
                        height: "55px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaLock size={22} />
                    </div>

                    <h5 className="fw-bold text-dark">Verify OTP</h5>

                    <p className="text-muted small">
                      Enter the OTP sent to the user's registered email address.
                    </p>

                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Enter OTP"
                      value={otp}
                      maxLength={6}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      style={{
                        height: "52px",
                        fontSize: "22px",
                        letterSpacing: "7px",
                        fontWeight: "700",
                      }}
                    />
                  </div>
                )}

                {/* STEP 3 */}

                {resetStep === 3 && (
                  <div>
                    <div className="text-center">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 mx-auto mb-3"
                        style={{
                          width: "55px",
                          height: "55px",
                          background: "#eff6ff",
                          color: "#2563eb",
                        }}
                      >
                        <FaKey size={22} />
                      </div>

                      <h5 className="fw-bold text-dark">Create New Password</h5>

                      <p className="text-muted small">
                        Enter a new password for this user.
                      </p>
                    </div>

                    {/* NEW PASSWORD */}

                    <div className="input-group mb-3">
                      <span className="input-group-text bg-light">
                        <FaLock className="text-muted" />
                      </span>

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaLock className="text-muted" />
                      </span>

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}

                {/* SUCCESS */}

                {resetStep === 4 && (
                  <div className="text-center py-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                      style={{
                        width: "65px",
                        height: "65px",
                        background: "#dcfce7",
                        color: "#16a34a",
                      }}
                    >
                      <FaCheckCircle size={30} />
                    </div>

                    <h5 className="fw-bold text-success">
                      Password Reset Successful
                    </h5>

                    <p className="text-muted small">
                      The password for <strong>{selectedUser.name}</strong> has
                      been changed successfully.
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER */}

              <div
                className="modal-footer"
                style={{
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                {/* STEP 1 */}

                {resetStep === 1 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-light rounded-3"
                      onClick={closeResetModal}
                      disabled={resetLoading}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary rounded-3"
                      onClick={sendOtp}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send OTP
                          <FaArrowRight className="ms-2" />
                        </>
                      )}
                    </button>
                  </>
                )}

                {/* STEP 2 */}

                {resetStep === 2 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-light rounded-3"
                      onClick={() => setResetStep(1)}
                      disabled={resetLoading}
                    >
                      <FaArrowLeft className="me-2" />
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary rounded-3"
                      onClick={verifyOtp}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify OTP
                          <FaArrowRight className="ms-2" />
                        </>
                      )}
                    </button>
                  </>
                )}

                {/* STEP 3 */}

                {resetStep === 3 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-light rounded-3"
                      onClick={() => setResetStep(2)}
                      disabled={resetLoading}
                    >
                      <FaArrowLeft className="me-2" />
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary rounded-3"
                      onClick={changePassword}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Resetting...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <FaKey className="ms-2" />
                        </>
                      )}
                    </button>
                  </>
                )}

                {/* STEP 4 */}

                {resetStep === 4 && (
                  <button
                    type="button"
                    className="btn btn-primary rounded-3"
                    onClick={closeResetModal}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SAME THEME CSS
      ===================================================== */}

      <style>
        {`
          .premium-stat-card {
            min-height: 125px;
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: white;
            border: 1px solid #e5e7eb;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }

          .stat-content {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .stat-content span {
            color: #64748b;
            font-size: 13px;
          }

          .stat-content h3 {
            color: #0f172a;
            font-size: 24px;
            line-height: 1;
            margin: 3px 0;
            font-weight: 700;
          }

          .stat-content small {
            color: #94a3b8;
            font-size: 11px;
          }

          .stat-blue {
            border-left: 4px solid #2563eb;
          }

          .stat-blue .stat-icon {
            background: #dbeafe;
            color: #2563eb;
          }

          .stat-green {
            border-left: 4px solid #16a34a;
          }

          .stat-green .stat-icon {
            background: #dcfce7;
            color: #16a34a;
          }

          .stat-orange {
            border-left: 4px solid #f59e0b;
          }

          .stat-orange .stat-icon {
            background: #fef3c7;
            color: #f59e0b;
          }

          .stat-red {
            border-left: 4px solid #ef4444;
          }

          .stat-red .stat-icon {
            background: #fee2e2;
            color: #ef4444;
          }

          .table {
            min-width: 1250px;
          }

          .table th,
          .table td {
            white-space: nowrap;
            vertical-align: middle;
          }

          .table tbody tr:hover {
            background-color: #f8fbff;
          }

          @media (max-width: 768px) {
            .premium-stat-card {
              min-height: 110px;
            }

            .modal-dialog {
              margin: 10px;
            }
          }

          .school-users-table { min-width: 1120px; } .school-users-table thead th { background-color: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 700; letter-spacing: .5px; padding: 14px 16px; border-bottom: 1px solid #dbeafe; white-space: nowrap; } .school-users-table tbody td { padding: 15px 16px; border-bottom: 1px solid #eef2f7; font-size: 13px; color: #334155; } .school-users-table tbody tr { transition: all .18s ease; } .school-users-table tbody tr:hover { background-color: #f8fbff; } .school-users-table tbody tr:last-child td { border-bottom: 0; } /* ================================ INDEX ================================ */ .user-index { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: #f1f5f9; color: #64748b; font-size: 12px; font-weight: 700; } /* ================================ USER AVATAR ================================ */ .user-avatar { width: 43px; height: 43px; min-width: 43px; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: linear-gradient( 135deg, #dbeafe, #bfdbfe ); color: #1d4ed8; font-size: 16px; font-weight: 800; border: 1px solid #bfdbfe; } .user-name { font-size: 13px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .user-id { margin-top: 3px; color: #94a3b8; font-size: 10px; } .user-id span { color: #64748b; font-weight: 600; } /* ================================ USERNAME ================================ */ .username-box { display: inline-flex; align-items: center; gap: 7px; color: #334155; } .username-icon { width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center; border-radius: 7px; background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 800; } /* ================================ CONTACT ================================ */ .contact-wrapper { min-width: 210px; } .contact-row { display: flex; align-items: center; gap: 8px; } .contact-icon { width: 24px; height: 24px; min-width: 24px; display: flex; align-items: center; justify-content: center; border-radius: 7px; } .email-icon { background: #eff6ff; color: #2563eb; } .phone-icon { background: #f0fdf4; color: #16a34a; } .contact-text { max-width: 205px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; color: #475569; } /* ================================ ROLE ================================ */ .role-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 85px; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; } /* ================================ USER GROUP ================================ */ .user-group-box { display: flex; align-items: center; } .group-icon { width: 31px; height: 31px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: #f1f5f9; color: #64748b; } .group-name { color: #334155; font-size: 12px; font-weight: 700; max-width: 125px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .group-code { margin-top: 2px; color: #94a3b8; font-size: 10px; } /* ================================ STATUS ================================ */ .status-badge { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; } .status-active { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; } .status-inactive { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; } .status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; } /* ================================ RESET PASSWORD BUTTON ================================ */ .reset-password-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 7px 12px; border-radius: 9px; border: 1px solid #bfdbfe; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; transition: all .18s ease; } .reset-password-btn:hover { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 5px 12px rgba(37,99,235,.18); } /* ================================ EMPTY STATE ================================ */ .empty-user-icon { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 16px; background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; } /* ================================ MOBILE ================================ */ @media (max-width: 768px) { .school-users-table { min-width: 1050px; } .school-users-table tbody td { padding: 12px; } }
        `}
      </style>
    </>
  );
};

export default SchoolUserManagement;
