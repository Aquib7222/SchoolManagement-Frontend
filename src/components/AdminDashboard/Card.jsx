
// import React from "react";
// import {
//   FaListUl,
//   FaSchool,
//   FaUserTie,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaUsers,
//   FaUserPlus,
//   FaMoneyBillWave,
//   FaCalendarCheck,
//   FaFileInvoiceDollar,
// } from "react-icons/fa";

// import { MdViewInAr } from "react-icons/md";
// import { RiShieldUserFill } from "react-icons/ri";

// import useDashboardData from "../../hooks/UserDashBoardData";

// const Card = () => {
//   const {
//     schools = [],
//     superadmins = [],
//     modules = [],
//     mappings = [],
//     totalStudents = 0,

//     // Future/API data
//     teacherCount = 0,
//     totalStaff = 0,
//     admissions = [],
//     feeCollected = 0,
//     attendancePercentage = 0,
//     pendingFee = 0,

//     loading,
//   } = useDashboardData();

//   /* ===============================
//      MAPPING COUNTS
//   =============================== */

//   const totalMenuMapping = mappings.reduce(
//     (total, item) => total + (item.menuMappings?.length || 0),
//     0,
//   );

//   const totalSubMenuMapping = mappings.reduce(
//     (total, item) => total + (item.subMenuMappings?.length || 0),
//     0,
//   );

//   /* ===============================
//      SCHOOL STATUS
//   =============================== */

//   const activeSchools = schools.filter(
//     (school) => school.status === "Active",
//   ).length;

//   const inactiveSchools = schools.filter(
//     (school) => school.status === "Inactive",
//   ).length;

//   /* ===============================
//      SUPER ADMIN STATUS
//   =============================== */

//   const activeSuperadmins = superadmins.filter(
//     (admin) => admin.status === "Active",
//   ).length;

//   const inactiveSuperadmins = superadmins.filter(
//     (admin) => admin.status === "Inactive",
//   ).length;

//   /* ===============================
//      MODULE STATUS
//   =============================== */

//   const activeModules = modules.filter(
//     (module) => module.status === "Active",
//   ).length;

//   const inactiveModules = modules.filter(
//     (module) => module.status === "Inactive",
//   ).length;

//   /* ===============================
//      CURRENCY FORMAT
//   =============================== */

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid px-2 mt-3">
//         <div className="row g-3">
//           {[1, 2, 3, 4].map((item) => (
//             <div
//               className="col-12 col-sm-6 col-md-4 col-lg-3"
//               key={item}
//             >
//               <div
//                 className="card shadow border-0"
//                 style={{ minHeight: "125px" }}
//               >
//                 <div className="card-body d-flex align-items-center">
//                   <div
//                     className="placeholder rounded-circle"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                     }}
//                   />

//                   <div className="ms-3 flex-grow-1">
//                     <div className="placeholder col-7 mb-2"></div>
//                     <div className="placeholder col-4"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-2 mt-3">
//       <div className="row g-3">

//         {/* =====================================================
//             1. TOTAL SCHOOLS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//           <div className="card h-100 shadow border-0">
//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#f8d9fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaSchool color="purple" size={30} />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Schools
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {schools.length}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">

//                   <small className="text-success">
//                     Active: {activeSchools}
//                   </small>

//                   <small className="text-danger">
//                     Inactive: {inactiveSchools}
//                   </small>

//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>


//         {/* =====================================================
//             2. TOTAL STUDENTS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9e8fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaUserGraduate
//                   color="#0d6efd"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Students
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {Number(totalStudents).toLocaleString("en-IN")}
//                 </strong>

//                 <small className="text-muted">
//                   All Schools
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             3. TOTAL TEACHERS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9fce5",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaChalkboardTeacher
//                   color="green"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Teachers
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {Number(teacherCount).toLocaleString("en-IN")}
//                 </strong>

//                 <small className="text-muted">
//                   All Schools
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             4. TOTAL STAFF
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#fce9d9",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaUsers
//                   color="orange"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Staff
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {Number(totalStaff).toLocaleString("en-IN")}
//                 </strong>

//                 <small className="text-muted">
//                   All Schools
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             5. ADMISSIONS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#eee0fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaUserPlus
//                   color="#8e44ad"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Admissions
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {/* {Number(totalAdmissions).toLocaleString("en-IN")} */}
//                   {admissions.length} 
//                 </strong>

//                 <small className="text-muted">
//                   Total Admissions
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             6. FEE COLLECTED
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9f9fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaMoneyBillWave
//                   color="#0dcaf0"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Fee Collected
//                 </h6>

//                 <strong
//                   className="fs-5 d-block"
//                   style={{
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {formatCurrency(feeCollected)}
//                 </strong>

//                 <small className="text-success">
//                   Collected
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             7. ATTENDANCE
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#e0f8e7",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaCalendarCheck
//                   color="#198754"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Attendance
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {Number(attendancePercentage).toFixed(1)}%
//                 </strong>

//                 <small className="text-success">
//                   Overall Attendance
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             8. PENDING FEES
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#fce0e0",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaFileInvoiceDollar
//                   color="#dc3545"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Pending Fees
//                 </h6>

//                 <strong
//                   className="fs-5 d-block"
//                   style={{
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {formatCurrency(pendingFee)}
//                 </strong>

//                 <small className="text-danger">
//                   Outstanding
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             9. SUPER ADMINS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9e0fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <RiShieldUserFill
//                   color="blue"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Super Admins
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {superadmins.length}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">

//                   <small className="text-success">
//                     Active: {activeSuperadmins}
//                   </small>

//                   <small className="text-danger">
//                     Inactive: {inactiveSuperadmins}
//                   </small>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             10. MODULES
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9fce5",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <MdViewInAr
//                   color="green"
//                   size={32}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Modules
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {modules.length}
//                 </strong>

//                 <div className="d-flex gap-2 flex-wrap">

//                   <small className="text-success">
//                     Active: {activeModules}
//                   </small>

//                   <small className="text-danger">
//                     Inactive: {inactiveModules}
//                   </small>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             11. MENUS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#fce9d9",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaListUl
//                   color="orange"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Menus
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {totalMenuMapping}
//                 </strong>

//                 <small className="text-muted">
//                   Submenus: {totalSubMenuMapping}
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             12. TOTAL USERS
//         ===================================================== */}

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">

//           <div className="card h-100 shadow border-0">

//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex justify-content-center align-items-center me-3"
//                 style={{
//                   backgroundColor: "#d9f9fc",
//                   minWidth: "60px",
//                   height: "60px",
//                 }}
//               >
//                 <FaUserTie
//                   color="skyblue"
//                   size={30}
//                 />
//               </div>

//               <div className="flex-grow-1">

//                 <h6 className="mb-1 text-muted">
//                   Total Users
//                 </h6>

//                 <strong className="fs-4 d-block">
//                   {(
//                     Number(superadmins.length) +
//                     Number(totalStudents) +
//                     Number(teacherCount) +
//                     Number(totalStaff)
//                   ).toLocaleString("en-IN")}
//                 </strong>

//                 <small className="text-muted">
//                   All System Users
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Card;



import React from "react";

import {
  FaSchool,
  FaUserTie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaUserPlus,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaListUl,
} from "react-icons/fa";

import { MdViewInAr } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";

import useDashboardData from "../../hooks/UserDashBoardData";

const Card = () => {
  const {
    schools = [],
    superadmins = [],
    modules = [],
    mappings = [],
    totalStudents = 0,

    teacherCount = 0,
    totalStaff = 0,
    admissions = [],
    feeCollected = 0,
    attendancePercentage = 0,
    pendingFee = 0,

    loading,
  } = useDashboardData();

  // =====================================================
  // MAPPING COUNTS
  // =====================================================

  const totalMenuMapping = mappings.reduce(
    (total, item) =>
      total + (item.menuMappings?.length || 0),
    0
  );

  const totalSubMenuMapping = mappings.reduce(
    (total, item) =>
      total + (item.subMenuMappings?.length || 0),
    0
  );

  // =====================================================
  // SCHOOL STATUS
  // =====================================================

  const activeSchools = schools.filter(
    (school) => school.status === "Active"
  ).length;

  const inactiveSchools = schools.filter(
    (school) => school.status === "Inactive"
  ).length;

  // =====================================================
  // SUPER ADMIN STATUS
  // =====================================================

  const activeSuperadmins = superadmins.filter(
    (admin) => admin.status === "Active"
  ).length;

  const inactiveSuperadmins = superadmins.filter(
    (admin) => admin.status === "Inactive"
  ).length;

  // =====================================================
  // MODULE STATUS
  // =====================================================

  const activeModules = modules.filter(
    (module) => module.status === "Active"
  ).length;

  const inactiveModules = modules.filter(
    (module) => module.status === "Inactive"
  ).length;

  // =====================================================
  // CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-xl-3"
              key={item}
            >
              <div className="premium-stat-card loading-card">
                <div className="loading-icon"></div>

                <div className="loading-content">
                  <div className="loading-line loading-small"></div>
                  <div className="loading-line loading-large"></div>
                  <div className="loading-line loading-medium"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid px-2 mt-3">
        <div className="row g-3">

          {/* =====================================================
              1. TOTAL SCHOOLS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-blue h-100">

              <div className="stat-icon">
                <FaSchool />
              </div>

              <div className="stat-content">

                <span>Total Schools</span>

                <h3>
                  {schools.length.toLocaleString("en-IN")}
                </h3>

                <div className="stat-status">
                  <small className="status-success">
                    Active: {activeSchools}
                  </small>

                  <small className="status-danger">
                    Inactive: {inactiveSchools}
                  </small>
                </div>

              </div>

            </div>
          </div>

          {/* =====================================================
              2. TOTAL STUDENTS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-green h-100">

              <div className="stat-icon">
                <FaUserGraduate />
              </div>

              <div className="stat-content">

                <span>Total Students</span>

                <h3>
                  {Number(totalStudents).toLocaleString("en-IN")}
                </h3>

                <small>
                  All Schools
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              3. TOTAL TEACHERS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-purple h-100">

              <div className="stat-icon">
                <FaChalkboardTeacher />
              </div>

              <div className="stat-content">

                <span>Total Teachers</span>

                <h3>
                  {Number(teacherCount).toLocaleString("en-IN")}
                </h3>

                <small>
                  All Schools
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              4. TOTAL STAFF
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-orange h-100">

              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">

                <span>Total Staff</span>

                <h3>
                  {Number(totalStaff).toLocaleString("en-IN")}
                </h3>

                <small>
                  All Schools
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              5. ADMISSIONS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-red h-100">

              <div className="stat-icon">
                <FaUserPlus />
              </div>

              <div className="stat-content">

                <span>Admissions</span>

                <h3>
                  {admissions.length.toLocaleString("en-IN")}
                </h3>

                <small>
                  Total Admissions
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              6. FEE COLLECTED
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-cyan h-100">

              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>

              <div className="stat-content">

                <span>Fee Collected</span>

                <h3 className="amount-text">
                  {formatCurrency(feeCollected)}
                </h3>

                <small className="text-success">
                  Collected
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              7. ATTENDANCE
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-green h-100">

              <div className="stat-icon">
                <FaCalendarCheck />
              </div>

              <div className="stat-content">

                <span>Attendance</span>

                <h3>
                  {Number(attendancePercentage).toFixed(1)}%
                </h3>

                <small>
                  Overall Attendance
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              8. PENDING FEES
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-red h-100">

              <div className="stat-icon">
                <FaFileInvoiceDollar />
              </div>

              <div className="stat-content">

                <span>Pending Fees</span>

                <h3 className="amount-text">
                  {formatCurrency(pendingFee)}
                </h3>

                <small className="text-danger">
                  Outstanding
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              9. SUPER ADMINS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-purple h-100">

              <div className="stat-icon">
                <RiShieldUserFill />
              </div>

              <div className="stat-content">

                <span>Super Admins</span>

                <h3>
                  {superadmins.length.toLocaleString("en-IN")}
                </h3>

                <div className="stat-status">

                  <small className="status-success">
                    Active: {activeSuperadmins}
                  </small>

                  <small className="status-danger">
                    Inactive: {inactiveSuperadmins}
                  </small>

                </div>

              </div>

            </div>
          </div>

          {/* =====================================================
              10. TOTAL MODULES
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-green h-100">

              <div className="stat-icon">
                <MdViewInAr />
              </div>

              <div className="stat-content">

                <span>Total Modules</span>

                <h3>
                  {modules.length.toLocaleString("en-IN")}
                </h3>

                <div className="stat-status">

                  <small className="status-success">
                    Active: {activeModules}
                  </small>

                  <small className="status-danger">
                    Inactive: {inactiveModules}
                  </small>

                </div>

              </div>

            </div>
          </div>

          {/* =====================================================
              11. TOTAL MENUS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-orange h-100">

              <div className="stat-icon">
                <FaListUl />
              </div>

              <div className="stat-content">

                <span>Total Menus</span>

                <h3>
                  {totalMenuMapping.toLocaleString("en-IN")}
                </h3>

                <small>
                  Submenus: {totalSubMenuMapping}
                </small>

              </div>

            </div>
          </div>

          {/* =====================================================
              12. TOTAL USERS
          ===================================================== */}

          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="premium-stat-card shadow stat-blue h-100">

              <div className="stat-icon">
                <FaUserTie />
              </div>

              <div className="stat-content">

                <span>Total Users</span>

                <h3>
                  {(
                    Number(superadmins.length) +
                    Number(totalStudents) +
                    Number(teacherCount) +
                    Number(totalStaff)
                  ).toLocaleString("en-IN")}
                </h3>

                <small>
                  All System Users
                </small>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          PREMIUM THEME CSS
      ===================================================== */}

      <style>
        {`
          .premium-stat-card {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            padding: 20px;
            min-height: 120px;

            display: flex;
            align-items: center;
            gap: 16px;

            background: #ffffff;
            border: 1px solid #edf0f5;

            transition: all .25s ease;
          }

          .premium-stat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,.08) !important;
          }

          .premium-stat-card::after {
            content: "";
            position: absolute;
            right: -35px;
            top: -35px;

            width: 100px;
            height: 100px;

            border-radius: 50%;
            opacity: .08;
          }

          /* ===============================
             CARD COLORS
          =============================== */

          .stat-blue::after {
            background: #0d6efd;
          }

          .stat-green::after {
            background: #198754;
          }

          .stat-orange::after {
            background: #ffc107;
          }

          .stat-red::after {
            background: #dc3545;
          }

          .stat-purple::after {
            background: #8e44ad;
          }

          .stat-cyan::after {
            background: #0dcaf0;
          }

          /* ===============================
             ICON
          =============================== */

          .stat-icon {
            min-width: 52px;
            width: 52px;
            height: 52px;

            border-radius: 13px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;

            position: relative;
            z-index: 2;
          }

          .stat-blue .stat-icon {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .stat-green .stat-icon {
            background: #eaf8f0;
            color: #198754;
          }

          .stat-orange .stat-icon {
            background: #fff8df;
            color: #d99a00;
          }

          .stat-red .stat-icon {
            background: #ffeded;
            color: #dc3545;
          }

          .stat-purple .stat-icon {
            background: #f3eafd;
            color: #8e44ad;
          }

          .stat-cyan .stat-icon {
            background: #e6faff;
            color: #0aa9ca;
          }

          /* ===============================
             CONTENT
          =============================== */

          .stat-content {
            min-width: 0;
            position: relative;
            z-index: 2;
          }

          .stat-content span {
            display: block;

            color: #6c757d;

            font-size: 13px;
            font-weight: 600;
          }

          .stat-content h3 {
            margin: 5px 0 2px;

            font-size: 24px;
            font-weight: 750;

            color: #212529;

            white-space: nowrap;
          }

          .stat-content small {
            color: #9aa1aa;
            font-size: 11px;
          }

          .amount-text {
            font-size: 20px !important;
          }

          /* ===============================
             STATUS
          =============================== */

          .stat-status {
            display: flex;
            gap: 9px;
            flex-wrap: wrap;
          }

          .status-success {
            color: #198754 !important;
          }

          .status-danger {
            color: #dc3545 !important;
          }

          /* ===============================
             LOADING
          =============================== */

          .loading-card {
            min-height: 120px;
          }

          .loading-icon {
            min-width: 52px;
            width: 52px;
            height: 52px;

            border-radius: 13px;

            background: #eef1f5;
          }

          .loading-content {
            flex: 1;
          }

          .loading-line {
            height: 10px;
            border-radius: 5px;
            background: #eef1f5;
            margin-bottom: 8px;
          }

          .loading-small {
            width: 45%;
          }

          .loading-large {
            width: 70%;
            height: 18px;
          }

          .loading-medium {
            width: 40%;
          }

          /* ===============================
             TABLET
          =============================== */

          @media (max-width: 992px) {
            .premium-stat-card {
              min-height: 115px;
            }
          }

          /* ===============================
             MOBILE
          =============================== */

          @media (max-width: 576px) {

            .premium-stat-card {
              padding: 16px;
              min-height: 105px;
              gap: 12px;
            }

            .stat-icon {
              min-width: 46px;
              width: 46px;
              height: 46px;
              font-size: 18px;
            }

            .stat-content h3 {
              font-size: 21px;
            }

            .amount-text {
              font-size: 18px !important;
            }

            .stat-content span {
              font-size: 12px;
            }

            .stat-content small {
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Card;

