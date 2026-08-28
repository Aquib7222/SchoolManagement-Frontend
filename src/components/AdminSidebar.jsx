// import React from "react";
// import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import banner from "../assets/icon/Login_Banner.png";
// import { IoSchoolOutline } from "react-icons/io5";
// import { FaRegListAlt, FaUserFriends, FaUserPlus } from "react-icons/fa";
// import { SiFreelancermap } from "react-icons/si";
// import { MdDashboard, MdViewModule } from "react-icons/md";
// import { PiListBulletsFill } from "react-icons/pi";
// import {
//   LuBell,
//   LuFileClock,
//   LuLink,
//   LuLink2,
//   LuList,
//   LuMenu,
//   LuPackage,
//   LuPackagePlus,
//   LuSchool,
//   LuSettings2,
//   LuShieldCheck,
//   LuUsersRound,
// } from "react-icons/lu";
// import { TfiMenuAlt } from "react-icons/tfi";

// const AdminSidebar = () => {
//   return (
//     <div
//   className="admin-sidebar"
//   style={{
//     padding: "15px 15px",
//     display: "flex",
//     flexDirection: "column",
//     height: "90vh",
//     width: "100%",
//     fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//     overflowY: "auto",
//     overflowX: "hidden",
//   }}
// >
//       <ul
//         style={{
//           listStyle: "none",
//           padding: 0,
//           margin: 0,
//           marginBottom: "20px",
//           marginLeft: "20px",
//         }}
//       >
//         {/* Dashboard */}
//         <NavLink to="/" end>
//           {({ isActive }) => (
//             <li className={`py-2 sidebar-item ${isActive ? "active" : ""}`}>
//               {/* <i className="bi bi-speedometer2 sidebar-icon"></i> */}
//               <strong className="ms-2">
//                 <MdDashboard size={25} /> Dashboard
//               </strong>
//             </li>
//           )}
//         </NavLink>

//         {/* Organization Management */}
//         <li className="">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">
//               <LuSchool size={25} className="me-2" /> Organization Management
//             </strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/add/schools" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <LuSchool size={20} /> Schools Creation
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink to="/school-list" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <FaRegListAlt size={20} /> School List
//                   </small>
//                 </li>
//               )}
//             </NavLink>

//              <NavLink to="/admin/student-list" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <FaRegListAlt size={20} />Student List
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>

//         {/* Super Admin Management */}
//         <li className="">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">
//               <FaUserPlus size={26} className="me-2" />
//               Super Admin Management
//             </strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/add/superadmins" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <FaUserPlus size={20} /> Create Super Admins
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink to="/superadmin-list" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <FaUserFriends size={20} /> Super Admin List
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>

//         {/* Module Management */}
//         <li className=" ">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">
//               <LuPackage size={25} className="me-2" /> Module Management
//             </strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/admin/add-modules" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <LuPackagePlus size={20} /> Module Creations
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink to="/admin/moduleList" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuPackage size={20} /> Module List
//                   </small>
//                 </li>
//               )}
//             </NavLink>

//             <NavLink
//               to="/admin/menus/creation"
//               className="text-decoration-none"
//             >
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <TfiMenuAlt size={20} /> Menu Creation
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//             <NavLink to="/admin/menus/all" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuMenu size={20} /> Menu List
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>

//         {/* User Group Management */}
//         <li className=" ">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">User Group Management</strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/admin/user-group/create" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <LuUsersRound size={20} /> User Group Creation
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink to="/admin/user-group/list" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuUsersRound size={20} /> User Group List
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//             <NavLink
//               to="/admin/userGroupmapping"
//               className="text-decoration-none"
//             >
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuLink size={20} /> User Group Mapping
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>

//         {/* User Group Management */}
//         <li className=" ">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">School Group Mapping</strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/admin/schoolMapping" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <LuLink2 size={20} /> School Module Mapping
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink
//               to="/admin/module-mapping/list"
//               className="text-decoration-none"
//             >
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuList size={20} /> School Module Mapping List
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>

//         {/* User Group Management */}
//         <li className=" ">
//           <div className="py-2 d-flex align-items-center">
//             <strong className="ms-3">System Settings</strong>
//           </div>

//           <ul className="list-unstyled ms-4">
//             <NavLink to="/admin/modules" className="text-decoration-none">
//               {({ isActive }) => (
//                 <>
//                   <li
//                     className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                   >
//                     <small>
//                       <LuSettings2 size={20} /> General Settings
//                     </small>
//                   </li>
//                 </>
//               )}
//             </NavLink>

//             <NavLink to="/admin/moduleList" className="text-decoration-none">
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuShieldCheck size={20} /> Role & Permission
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//             <NavLink
//               to="/admin/userGroupmapping"
//               className="text-decoration-none"
//             >
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuBell size={20} /> Notification Settings
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//             <NavLink
//               to="/settings/system-log/"
//               className="text-decoration-none"
//             >
//               {({ isActive }) => (
//                 <li
//                   className={`py-2 px-0 sidebar-item ${isActive ? "active" : ""}`}
//                 >
//                   <small>
//                     <LuFileClock size={20} /> System Log
//                   </small>
//                 </li>
//               )}
//             </NavLink>
//           </ul>
//         </li>
//       </ul>

//       {/* STYLES */}
//       <style>{`
//       .admin-sidebar {
//   scrollbar-width: thin;
//   scrollbar-color: rgba(13, 110, 253, 0.45) transparent;
// }

// /* Chrome / Edge / Safari */
// .admin-sidebar::-webkit-scrollbar {
//   width: 5px;
// }

// .admin-sidebar::-webkit-scrollbar-track {
//   background: transparent;
// }

// .admin-sidebar::-webkit-scrollbar-thumb {
//   background: rgba(13, 110, 253, 0.45);
//   border-radius: 10px;
// }

// .admin-sidebar::-webkit-scrollbar-thumb:hover {
//   background: rgba(13, 110, 253, 0.8);
// }
//         a {
//           text-decoration: none;
//           color: inherit;
//         }

//         .sidebar-item {
//           cursor: pointer;
//           padding: 12px;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           transition: background-color 0.3s ease;
//         }

//         /* HOVER BACKGROUND */
//         .sidebar-item:hover {
//           background: rgba(13, 110, 253, 0.12);
//         }

//         /* ACTIVE BACKGROUND */
//         .sidebar-item.active {
//           background: rgba(13, 110, 253, 0.2);
//           font-weight: 600;
//         }

//         .sidebar-icon {
//           font-size: 25px;
//           transition: all 0.3s ease;
//         }

//         /* ICON HOVER GLOW */
//         .sidebar-item:hover .sidebar-icon {
//           color: #0d6efd;
//           text-shadow: 0 0 8px rgba(13, 110, 253, 0.8);
//           transform: scale(1.15);
//         }

//         /* ICON ACTIVE GLOW */
//         .sidebar-item.active .sidebar-icon {
//           color: #0d6efd;
//           text-shadow:
//             0 0 6px rgba(13, 110, 253, 0.9),
//             0 0 14px rgba(13, 110, 253, 0.7);
//           transform: scale(1.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminSidebar;


import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaSchool,
  FaRegListAlt,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

import {
  MdDashboard,
  MdViewModule,
  MdOutlineSettings,
} from "react-icons/md";

import {
  LuBell,
  LuFileClock,
  LuLink,
  LuLink2,
  LuList,
  LuMenu,
  LuPackage,
  LuPackagePlus,
  LuSchool,
  LuSettings2,
  LuShieldCheck,
  LuUsersRound,
  LuChevronRight,
} from "react-icons/lu";

import { TfiMenuAlt } from "react-icons/tfi";

const AdminSidebar = () => {
  const menuItem = (to, icon, label) => (
    <NavLink to={to} className="admin-nav-link">
      {({ isActive }) => (
        <div className={`admin-menu-item ${isActive ? "active" : ""}`}>
          <div className="admin-menu-icon">{icon}</div>

          <span>{label}</span>

          {isActive && <div className="active-indicator" />}
        </div>
      )}
    </NavLink>
  );

  return (
    <aside className="premium-admin-sidebar mt-2">
      {/* TOP BRAND AREA */}
      

      {/* NAVIGATION */}
      <div className="sidebar-scroll">
        <ul className="sidebar-menu">

          {/* ================= DASHBOARD ================= */}
          <li className="dashboard-wrapper">
            <NavLink to="/" end className="admin-nav-link">
              {({ isActive }) => (
                <div
                  className={`dashboard-item ${
                    isActive ? "dashboard-active" : ""
                  }`}
                >
                  <div className="dashboard-icon">
                    <MdDashboard size={23} />
                  </div>

                  <span>Dashboard</span>

                  {isActive && (
                    <div className="dashboard-active-dot"></div>
                  )}
                </div>
              )}
            </NavLink>
          </li>

          {/* ================= ORGANIZATION ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>Organization</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/add/schools",
                <LuSchool size={20} />,
                "Schools Creation",
              )}

              {menuItem(
                "/school-list",
                <FaRegListAlt size={19} />,
                "School List",
              )}

              {menuItem(
                "/admin/student-list",
                <FaRegListAlt size={19} />,
                "Student List",
              )}
              {menuItem(
                "/admin/school-details",
                <FaRegListAlt size={19} />,
                "School Details",
              )}
            </div>
          </li>

          {/* ================= SUPER ADMIN ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>Super Admin</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/add/superadmins",
                <FaUserPlus size={20} />,
                "Create Super Admin",
              )}

              {menuItem(
                "/superadmin-list",
                <FaUserFriends size={20} />,
                "Super Admin List",
              )}
            </div>
          </li>

          {/* ================= MODULE MANAGEMENT ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>Module Management</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/admin/add-modules",
                <LuPackagePlus size={20} />,
                "Module Creation",
              )}

              {menuItem(
                "/admin/moduleList",
                <LuPackage size={20} />,
                "Module List",
              )}

              {menuItem(
                "/admin/menus/creation",
                <TfiMenuAlt size={19} />,
                "Menu Creation",
              )}

              {menuItem(
                "/admin/menus/all",
                <LuMenu size={20} />,
                "Menu List",
              )}
            </div>
          </li>

          {/* ================= USER GROUP ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>User & Access</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/admin/user-group/create",
                <LuUsersRound size={20} />,
                "User Group Creation",
              )}

              {menuItem(
                "/admin/user-group/list",
                <LuUsersRound size={20} />,
                "User Group List",
              )}

              {menuItem(
                "/admin/userGroupmapping",
                <LuLink size={20} />,
                "User Group Mapping",
              )}
            </div>
          </li>

          {/* ================= SCHOOL MAPPING ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>School Configuration</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/admin/schoolMapping",
                <LuLink2 size={20} />,
                "School Module Mapping",
              )}

              {menuItem(
                "/admin/module-mapping/list",
                <LuList size={20} />,
                "Mapping List",
              )}
            </div>
          </li>

          {/* ================= SYSTEM ================= */}
          <li className="sidebar-section">
            <div className="section-title">
              <span>System</span>
            </div>

            <div className="section-menu">

              {menuItem(
                "/admin/modules",
                <LuSettings2 size={20} />,
                "General Settings",
              )}

              {menuItem(
                "/admin/moduleList",
                <LuShieldCheck size={20} />,
                "Role & Permission",
              )}

              {menuItem(
                "/admin/userGroupmapping",
                <LuBell size={20} />,
                "Notification Settings",
              )}

              {menuItem(
                "/settings/system-log/",
                <LuFileClock size={20} />,
                "System Logs",
              )}
            </div>
          </li>

        </ul>
      </div>

      {/* BOTTOM PROFILE / SYSTEM STATUS */}
      <div className="sidebar-footer">

        <div className="admin-status-card">

          <div className="status-icon">
            <MdOutlineSettings size={19} />
          </div>

          <div className="status-content">
            <div className="status-title">
              System Status
            </div>

            <div className="status-online">
              <span></span>
              All systems operational
            </div>
          </div>

        </div>

      </div>

      {/* ================= STYLES ================= */}
      <style>{`

        /* =========================================
           MAIN SIDEBAR
        ========================================= */

        .premium-admin-sidebar {
          width: 100%;
          height: 90vh;

          display: flex;
          flex-direction: column;

          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fbfcff 55%,
              #f7f9fd 100%
            );

          border-right: 1px solid #e9edf5;

          font-family:
            "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;

          color: #263248;

          position: relative;

          overflow: hidden;
        }


        /* =========================================
           BRAND
        ========================================= */

        .sidebar-brand {

          display: flex;
          align-items: center;

          gap: 12px;

          padding: 20px 20px 18px;

          border-bottom: 1px solid #edf0f5;

          background: rgba(255,255,255,0.8);

        }

        .brand-logo {

          width: 44px;
          height: 44px;

          border-radius: 13px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #0d6efd,
              #4f8cff
            );

          box-shadow:
            0 7px 18px rgba(13,110,253,0.25);

        }

        .brand-content {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-title {

          font-size: 19px;

          font-weight: 750;

          letter-spacing: -0.3px;

          color: #172033;

        }

        .brand-subtitle {

          margin-top: 4px;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 1.8px;

          color: #8a94a6;

        }


        /* =========================================
           SCROLL AREA
        ========================================= */

        .sidebar-scroll {

          flex: 1;

          overflow-y: auto;
          overflow-x: hidden;

          padding: 12px 12px 20px;

        }

        .sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb {

          background: #d8dfeb;

          border-radius: 20px;

        }

        .sidebar-scroll::-webkit-scrollbar-thumb:hover {

          background: #b8c4d7;

        }

        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d8dfeb transparent;
        }


        /* =========================================
           MENU
        ========================================= */

        .sidebar-menu {

          list-style: none;

          margin: 0;
          padding: 0;

        }

        .admin-nav-link {

          text-decoration: none;

          color: inherit;

          display: block;

        }


        /* =========================================
           DASHBOARD
        ========================================= */

        .dashboard-wrapper {

          margin-bottom: 14px;

        }

        .dashboard-item {

          min-height: 48px;

          padding: 8px 13px;

          border-radius: 12px;

          display: flex;
          align-items: center;

          gap: 11px;

          font-size: 14px;

          font-weight: 600;

          color: #566176;

          position: relative;

          transition:
            all .25s ease;

        }

        .dashboard-item:hover {

          background: #f0f5ff;

          color: #0d6efd;

          transform: translateX(2px);

        }

        .dashboard-active {

          color: #0d6efd;

          background:
            linear-gradient(
              90deg,
              #eaf2ff,
              #f4f7ff
            );

          box-shadow:
            inset 0 0 0 1px #e2ebff;

        }

        .dashboard-icon {

          width: 35px;
          height: 35px;

          border-radius: 9px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f0f4fa;

          color: #69768a;

          transition: all .25s ease;

        }

        .dashboard-active .dashboard-icon {

          background: #0d6efd;

          color: white;

          box-shadow:
            0 5px 13px rgba(13,110,253,.25);

        }

        .dashboard-active-dot {

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #0d6efd;

          margin-left: auto;

          box-shadow:
            0 0 0 4px rgba(13,110,253,.1);

        }


        /* =========================================
           SECTION
        ========================================= */

        .sidebar-section {

          margin-top: 17px;

        }

        .section-title {

          padding: 0 12px 8px;

          font-size: 10px;

          font-weight: 750;

          text-transform: uppercase;

          letter-spacing: 1.15px;

          color: #9aa4b5;

        }

        .section-menu {

          position: relative;

          padding-left: 7px;

        }

        /* Vertical connector */

        .section-menu::before {

          content: "";

          position: absolute;

          left: 10px;

          top: 5px;

          bottom: 5px;

          width: 1px;

          background: #edf0f5;

        }


        /* =========================================
           MENU ITEM
        ========================================= */

        .admin-menu-item {

          min-height: 43px;

          margin-bottom: 3px;

          padding: 5px 10px 5px 7px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-radius: 10px;

          font-size: 13.5px;

          font-weight: 500;

          color: #667085;

          position: relative;

          transition:
            background .25s ease,
            color .25s ease,
            transform .25s ease,
            box-shadow .25s ease;

        }

        .admin-menu-item:hover {

          color: #0d6efd;

          background: #f4f7fc;

          transform: translateX(3px);

        }

        .admin-menu-icon {

          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;

          background: #f6f8fb;

          color: #7a8799;

          position: relative;

          z-index: 2;

          transition: all .25s ease;

        }

        .admin-menu-item:hover .admin-menu-icon {

          background: #eaf2ff;

          color: #0d6efd;

        }

        /* ACTIVE */

        .admin-menu-item.active {

          color: #0d6efd;

          font-weight: 650;

          background:
            linear-gradient(
              90deg,
              #eaf2ff,
              #f5f8ff
            );

          box-shadow:
            inset 0 0 0 1px #e3ebfb;

        }

        .admin-menu-item.active .admin-menu-icon {

          color: #0d6efd;

          background: #ffffff;

          box-shadow:
            0 3px 10px rgba(13,110,253,.12);

        }

        .active-indicator {

          position: absolute;

          right: 7px;

          width: 4px;
          height: 22px;

          border-radius: 10px;

          background: #0d6efd;

          box-shadow:
            0 0 8px rgba(13,110,253,.25);

        }


        /* =========================================
           FOOTER
        ========================================= */

        .sidebar-footer {

          padding: 10px 14px 15px;

          border-top: 1px solid #edf0f5;

          background: rgba(255,255,255,.85);

        }

        .admin-status-card {

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 10px;

          border-radius: 12px;

          background: #f7f9fc;

          border: 1px solid #edf0f5;

        }

        .status-icon {

          width: 34px;
          height: 34px;

          border-radius: 9px;

          display: flex;

          align-items: center;
          justify-content: center;

          background: #eaf8ef;

          color: #198754;

        }

        .status-content {

          min-width: 0;

        }

        .status-title {

          font-size: 11px;

          font-weight: 700;

          color: #4c5668;

        }

        .status-online {

          margin-top: 3px;

          display: flex;

          align-items: center;

          gap: 5px;

          font-size: 9px;

          color: #8a94a6;

          white-space: nowrap;

        }

        .status-online span {

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #20c997;

          box-shadow:
            0 0 0 3px rgba(32,201,151,.12);

        }


        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 768px) {

          .sidebar-brand {
            padding: 15px;
          }

          .brand-title {
            font-size: 17px;
          }

          .sidebar-scroll {
            padding-left: 9px;
            padding-right: 9px;
          }

        }

      `}</style>
    </aside>
  );
};

export default AdminSidebar;