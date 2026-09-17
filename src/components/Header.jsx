// // // // import { useEffect, useRef, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   FaBell,
// // // //   FaSearch,
// // // //   FaCog,
// // // //   FaUserCircle,
// // // //   FaChevronDown,
// // // //   FaUser,
// // // //   FaRegBell,
// // // //   FaUserShield,
// // // //   FaSlidersH,
// // // // } from "react-icons/fa";
// // // // import {
// // // //   MdLogout,
// // // //   MdOutlineSettings,
// // // //   MdKeyboardArrowRight,
// // // // } from "react-icons/md";
// // // // import { VscThreeBars } from "react-icons/vsc";
// // // // import logo from "../assets/icon/zyntaks.png";
// // // // import ThemeToggle from "./ThemeToggle";
// // // // import "./Header.css";
// // // // const Header = ({ toggleSidebar }) => {
// // // //   const navigate = useNavigate();
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [time, setTime] = useState("");
// // // //   const [greeting, setGreeting] = useState("");
// // // //   const dropdownRef = useRef(null);
// // // //   const user = JSON.parse(localStorage.getItem("user") || "null") || {};
// // // //   const profilePic =
// // // //     localStorage.getItem("profilePic") || "https://i.pravatar.cc/150?img=12";
// // // //   /* ===================================================== USER DATA ===================================================== */ const userName =
// // // //     user?.name || user?.username || user?.firstName || "Administrator";
// // // //   const userRole = user?.role || localStorage.getItem("role") || "ADMIN";
// // // //   const schoolName =
// // // //     user?.school?.schoolName || user?.schoolName || "ZYNTaks Administration";
// // // //   const userEmail = user?.email || "admin@zyntaks.com";
// // // //   /* ===================================================== LIVE CLOCK + GREETING ===================================================== */ useEffect(() => {
// // // //     const updateClock = () => {
// // // //       const now = new Date();
// // // //       setTime(
// // // //         now.toLocaleTimeString("en-IN", {
// // // //           hour: "2-digit",
// // // //           minute: "2-digit",
// // // //           hour12: true,
// // // //         }),
// // // //       );
// // // //       const hour = now.getHours();
// // // //       if (hour < 12) {
// // // //         setGreeting("Good Morning");
// // // //       } else if (hour < 17) {
// // // //         setGreeting("Good Afternoon");
// // // //       } else if (hour < 21) {
// // // //         setGreeting("Good Evening");
// // // //       } else {
// // // //         setGreeting("Good Night");
// // // //       }
// // // //     };
// // // //     updateClock();
// // // //     const interval = setInterval(updateClock, 1000);
// // // //     return () => clearInterval(interval);
// // // //   }, []);
// // // //   /* ===================================================== OUTSIDE CLICK ===================================================== */ useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // //         setShowDropdown(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => {
// // // //       document.removeEventListener("mousedown", handleClickOutside);
// // // //     };
// // // //   }, []);
// // // //   /* ===================================================== ESC CLOSE ===================================================== */ useEffect(() => {
// // // //     const handleEscape = (event) => {
// // // //       if (event.key === "Escape") {
// // // //         setShowDropdown(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("keydown", handleEscape);
// // // //     return () => {
// // // //       document.removeEventListener("keydown", handleEscape);
// // // //     };
// // // //   }, []);
// // // //   /* ===================================================== DATE ===================================================== */ const formattedDate =
// // // //     new Date().toLocaleDateString("en-IN", {
// // // //       day: "2-digit",
// // // //       month: "short",
// // // //       year: "numeric",
// // // //     });
// // // //   /* ===================================================== NAVIGATION HELPER ===================================================== */ const handleNavigate =
// // // //     (path) => {
// // // //       setShowDropdown(false);
// // // //       navigate(path);
// // // //     };
// // // //   /* ===================================================== LOGOUT ===================================================== */ const handleLogout =
// // // //     () => {
// // // //       localStorage.removeItem("token");
// // // //       localStorage.removeItem("AdminToken");
// // // //       localStorage.removeItem("role");
// // // //       localStorage.removeItem("user");
// // // //       navigate("/login");
// // // //     };
// // // //   return (
// // // //     <header className="premium-header">
// // // //       {" "}
// // // //       {/* ================================================= LEFT SECTION ================================================= */}{" "}
// // // //       <div className="header-left-section">
// // // //         {" "}
// // // //         {/* LOGO */}{" "}
// // // //         <div
// // // //           className="header-logo-box"
// // // //           onClick={() => navigate("/")}
// // // //           title="Dashboard"
// // // //         >
// // // //           {" "}
// // // //           <img src={logo} alt="ZYNTaks" className="header-logo" />{" "}
// // // //         </div>{" "}
// // // //         <div className="header-divider"></div> {/* SIDEBAR */}{" "}
// // // //         <button
// // // //           type="button"
// // // //           className="sidebar-toggle-btn"
// // // //           onClick={toggleSidebar}
// // // //           title="Toggle Sidebar"
// // // //         >
// // // //           {" "}
// // // //           <VscThreeBars size={22} />{" "}
// // // //         </button>{" "}
// // // //         {/* GREETING */}{" "}
// // // //         <div className="header-greeting">
// // // //           {" "}
// // // //           <div className="greeting-text">
// // // //             {" "}
// // // //             {greeting}, <strong>{userName}</strong>{" "}
// // // //           </div>{" "}
// // // //           <div className="greeting-date"> {formattedDate} </div>{" "}
// // // //         </div>{" "}
// // // //       </div>{" "}
// // // //       {/* ================================================= CENTER ORGANIZATION ================================================= */}{" "}
// // // //       <div className="header-center">
// // // //         {" "}
// // // //         <div className="school-info">
// // // //           {" "}
// // // //           <div className="school-icon">
// // // //             {" "}
// // // //             <FaUserCircle size={18} />{" "}
// // // //           </div>{" "}
// // // //           <div className="school-details">
// // // //             {" "}
// // // //             <span className="school-label"> ORGANIZATION </span>{" "}
// // // //             <span className="school-name" title={schoolName}>
// // // //               {" "}
// // // //               {schoolName}{" "}
// // // //             </span>{" "}
// // // //           </div>{" "}
// // // //         </div>{" "}
// // // //       </div>{" "}
// // // //       {/* ================================================= RIGHT SECTION ================================================= */}{" "}
// // // //       <div className="header-right-section">
// // // //         {" "}
// // // //         {/* SEARCH */}{" "}
// // // //         {/* <div className="header-search">
// // // //           {" "}
// // // //           <FaSearch size={13} /> <input type="text" placeholder="Search..." />{" "}
// // // //           <span className="search-shortcut"> Ctrl K </span>{" "}
// // // //         </div>{" "} */}
// // // //         {/* TIME */}{" "}
// // // //         <div className="header-time me-3">
// // // //           {" "}
// // // //           <div className="time-value"> {time} </div>{" "}
// // // //           <div className="time-label"> Local Time </div>{" "}
// // // //         </div>{" "}
// // // //          {/* <ThemeToggle />  */}
// // // //         <button
// // // //           type="button"
// // // //           className="header-action-btn notification-btn"
// // // //           title="Notifications"
// // // //           onClick={() => handleNavigate("/admin/notifications")}
// // // //         >
// // // //           {" "}
// // // //           <FaBell size={16} /> <span className="notification-dot"></span>{" "}
// // // //         </button>{" "}
// // // //         {/* SETTINGS */}{" "}
// // // //         <button
// // // //           type="button"
// // // //           className="header-action-btn"
// // // //           title="Settings"
// // // //           onClick={() => handleNavigate("/user-management")}
// // // //         >
// // // //           {" "}
// // // //           <FaCog size={16} />{" "}
// // // //         </button>{" "}
// // // //         {/* ================================================= PROFILE ================================================= */}{" "}
// // // //         <div className="profile-wrapper" ref={dropdownRef}>
// // // //           {" "}
// // // //           <button
// // // //             type="button"
// // // //             className={`profile-trigger ${showDropdown ? "active" : ""}`}
// // // //             onClick={() => setShowDropdown((prev) => !prev)}
// // // //           >
// // // //             {" "}
// // // //             <img
// // // //               src={profilePic}
// // // //               alt="Profile"
// // // //               className="profile-image"
// // // //             />{" "}
// // // //             <div className="profile-info">
// // // //               {" "}
// // // //               <span className="profile-name"> {userName} </span>{" "}
// // // //               <span className="profile-role"> {userRole} </span>{" "}
// // // //             </div>{" "}
// // // //             <FaChevronDown
// // // //               size={10}
// // // //               className={`profile-chevron ${showDropdown ? "rotate" : ""}`}
// // // //             />{" "}
// // // //           </button>{" "}
// // // //           {/* ================================================= PROFILE DROPDOWN ================================================= */}{" "}
// // // //           {showDropdown && (
// // // //             <div className="profile-dropdown">
// // // //               {" "}
// // // //               {/* PROFILE HEADER */}{" "}
// // // //               <div className="dropdown-profile">
// // // //                 {" "}
// // // //                 <div className="dropdown-avatar-wrapper">
// // // //                   {" "}
// // // //                   <img
// // // //                     src={profilePic}
// // // //                     alt="Profile"
// // // //                     className="dropdown-avatar"
// // // //                   />{" "}
// // // //                   <span className="online-status"></span>{" "}
// // // //                 </div>{" "}
// // // //                 <div className="dropdown-profile-details">
// // // //                   {" "}
// // // //                   <div className="dropdown-name"> {userName} </div>{" "}
// // // //                   <div className="dropdown-role-row">
// // // //                     {" "}
// // // //                     <span className="role-badge">
// // // //                       {" "}
// // // //                       <FaUserShield size={9} /> {userRole}{" "}
// // // //                     </span>{" "}
// // // //                   </div>{" "}
// // // //                   <div className="dropdown-email" title={userEmail}>
// // // //                     {" "}
// // // //                     {userEmail}{" "}
// // // //                   </div>{" "}
// // // //                 </div>{" "}
// // // //               </div>{" "}
// // // //               <div className="dropdown-divider"></div> {/* ACCOUNT SETTINGS */}{" "}
// // // //               <button
// // // //                 type="button"
// // // //                 className="dropdown-menu-item"
// // // //                 onClick={() => handleNavigate("/admin/account-settings")}
// // // //               >
// // // //                 {" "}
// // // //                 <span className="dropdown-menu-left">
// // // //                   {" "}
// // // //                   <span className="dropdown-menu-icon">
// // // //                     {" "}
// // // //                     <MdOutlineSettings size={17} />{" "}
// // // //                   </span>{" "}
// // // //                   <span className="dropdown-menu-text">
// // // //                     {" "}
// // // //                     Account Settings{" "}
// // // //                   </span>{" "}
// // // //                 </span>{" "}
// // // //                 <MdKeyboardArrowRight
// // // //                   className="dropdown-arrow"
// // // //                   size={18}
// // // //                 />{" "}
// // // //               </button>{" "}
// // // //               {/* MY PROFILE */}{" "}
// // // //               <button
// // // //                 type="button"
// // // //                 className="dropdown-menu-item"
// // // //                 onClick={() => handleNavigate("/admin/profile")}
// // // //               >
// // // //                 {" "}
// // // //                 <span className="dropdown-menu-left">
// // // //                   {" "}
// // // //                   <span className="dropdown-menu-icon">
// // // //                     {" "}
// // // //                     <FaUser size={14} />{" "}
// // // //                   </span>{" "}
// // // //                   <span className="dropdown-menu-text"> My Profile </span>{" "}
// // // //                 </span>{" "}
// // // //                 <MdKeyboardArrowRight
// // // //                   className="dropdown-arrow"
// // // //                   size={18}
// // // //                 />{" "}
// // // //               </button>{" "}
// // // //               {/* NOTIFICATIONS */}{" "}
// // // //               <button
// // // //                 type="button"
// // // //                 className="dropdown-menu-item"
// // // //                 onClick={() => handleNavigate("/admin/notifications")}
// // // //               >
// // // //                 {" "}
// // // //                 <span className="dropdown-menu-left">
// // // //                   {" "}
// // // //                   <span className="dropdown-menu-icon">
// // // //                     {" "}
// // // //                     <FaRegBell size={14} />{" "}
// // // //                   </span>{" "}
// // // //                   <span className="dropdown-menu-text">
// // // //                     {" "}
// // // //                     Notifications{" "}
// // // //                   </span>{" "}
// // // //                 </span>{" "}
// // // //                 <MdKeyboardArrowRight
// // // //                   className="dropdown-arrow"
// // // //                   size={18}
// // // //                 />{" "}
// // // //               </button>{" "}
// // // //               {/* PREFERENCES */}{" "}
// // // //               <button
// // // //                 type="button"
// // // //                 className="dropdown-menu-item"
// // // //                 onClick={() => handleNavigate("/admin/settings")}
// // // //               >
// // // //                 {" "}
// // // //                 <span className="dropdown-menu-left">
// // // //                   {" "}
// // // //                   <span className="dropdown-menu-icon">
// // // //                     {" "}
// // // //                     <FaSlidersH size={14} />{" "}
// // // //                   </span>{" "}
// // // //                   <span className="dropdown-menu-text"> Preferences </span>{" "}
// // // //                 </span>{" "}
// // // //                 <MdKeyboardArrowRight
// // // //                   className="dropdown-arrow"
// // // //                   size={18}
// // // //                 />{" "}
// // // //               </button>{" "}
// // // //               <div className="dropdown-divider"></div> {/* LOGOUT */}{" "}
// // // //               <button
// // // //                 type="button"
// // // //                 className="dropdown-menu-item logout-menu-item"
// // // //                 onClick={handleLogout}
// // // //               >
// // // //                 {" "}
// // // //                 <span className="dropdown-menu-left">
// // // //                   {" "}
// // // //                   <span className="dropdown-menu-icon logout-icon">
// // // //                     {" "}
// // // //                     <MdLogout size={17} />{" "}
// // // //                   </span>{" "}
// // // //                   <span className="dropdown-menu-text"> Logout </span>{" "}
// // // //                 </span>{" "}
// // // //                 <MdKeyboardArrowRight
// // // //                   className="dropdown-arrow"
// // // //                   size={18}
// // // //                 />{" "}
// // // //               </button>{" "}
// // // //             </div>
// // // //           )}{" "}
// // // //         </div>{" "}
// // // //       </div>{" "}
// // // //     </header>
// // // //   );
// // // // };
// // // // export default Header;

// // // import { useEffect, useRef, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // import {
// // //   FaBell,
// // //   FaCog,
// // //   FaUserCircle,
// // //   FaChevronDown,
// // //   FaUser,
// // //   FaRegBell,
// // //   FaUserShield,
// // //   FaSlidersH,
// // //   FaCube,
// // //   FaGraduationCap,
// // //   FaUserGraduate,
// // //   FaChalkboardTeacher,
// // //   FaCalendarCheck,
// // //   FaMoneyBillWave,
// // //   FaClipboardCheck,
// // //   FaUserPlus,
// // //   FaBus,
// // //   FaChartBar,
// // //   FaCogs,
// // //   FaBook,
// // //   FaUsers,
// // //   FaFileAlt,
// // //   FaUniversity,
// // // } from "react-icons/fa";

// // // import {
// // //   MdLogout,
// // //   MdOutlineSettings,
// // //   MdKeyboardArrowRight,
// // //   MdMenu,
// // // } from "react-icons/md";

// // // import { VscThreeBars } from "react-icons/vsc";

// // // import logo from "../assets/icon/zyntaks.png";
// // // import axiosInstance from "../api/axiosInstance";

// // // import "./Header.css";

// // // const Header = ({ toggleSidebar }) => {
// // //   const navigate = useNavigate();

// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [showModuleDropdown, setShowModuleDropdown] = useState(false);

// // //   const [time, setTime] = useState("");
// // //   const [greeting, setGreeting] = useState("");

// // //   const [sidebarModules, setSidebarModules] = useState([]);
// // //   const [moduleLoading, setModuleLoading] = useState(false);

// // //   const dropdownRef = useRef(null);
// // //   const moduleDropdownRef = useRef(null);

// // //   const user =
// // //     JSON.parse(localStorage.getItem("user") || "null") || {};

// // //   const profilePic =
// // //     localStorage.getItem("profilePic") ||
// // //     "https://i.pravatar.cc/150?img=12";

// // //   /* =====================================================
// // //      USER DATA
// // //   ===================================================== */

// // //   const userName =
// // //     user?.name ||
// // //     user?.username ||
// // //     user?.firstName ||
// // //     "Administrator";

// // //   const userRole =
// // //     user?.role ||
// // //     localStorage.getItem("role") ||
// // //     "ADMIN";

// // //   const schoolName =
// // //     user?.school?.schoolName ||
// // //     user?.schoolName ||
// // //     "ZYNTaks Administration";

// // //   const userEmail =
// // //     user?.email ||
// // //     "admin@zyntaks.com";

// // //   const schoolId =
// // //     user?.schoolId ||
// // //     user?.school?.id ||
// // //     localStorage.getItem("schoolId");

// // //   const groupId =
// // //     user?.groupId ||
// // //     user?.userGroupId ||
// // //     localStorage.getItem("groupId");

// // //   /* =====================================================
// // //      MODULE ICONS
// // //   ===================================================== */

// // //   const getModuleIcon = (moduleName = "") => {
// // //     const name = moduleName.toLowerCase();

// // //     if (
// // //       name.includes("admission") ||
// // //       name.includes("enquiry")
// // //     ) {
// // //       return FaUserPlus;
// // //     }

// // //     if (
// // //       name.includes("student") ||
// // //       name.includes("profile")
// // //     ) {
// // //       return FaUserGraduate;
// // //     }

// // //     if (
// // //       name.includes("teacher") ||
// // //       name.includes("staff")
// // //     ) {
// // //       return FaChalkboardTeacher;
// // //     }

// // //     if (
// // //       name.includes("attendance")
// // //     ) {
// // //       return FaCalendarCheck;
// // //     }

// // //     if (
// // //       name.includes("fee") ||
// // //       name.includes("payment")
// // //     ) {
// // //       return FaMoneyBillWave;
// // //     }

// // //     if (
// // //       name.includes("assessment") ||
// // //       name.includes("exam") ||
// // //       name.includes("result")
// // //     ) {
// // //       return FaClipboardCheck;
// // //     }

// // //     if (
// // //       name.includes("transport") ||
// // //       name.includes("vehicle")
// // //     ) {
// // //       return FaBus;
// // //     }

// // //     if (
// // //       name.includes("report")
// // //     ) {
// // //       return FaChartBar;
// // //     }

// // //     if (
// // //       name.includes("academic") ||
// // //       name.includes("subject")
// // //     ) {
// // //       return FaGraduationCap;
// // //     }

// // //     if (
// // //       name.includes("class") ||
// // //       name.includes("section")
// // //     ) {
// // //       return FaUniversity;
// // //     }

// // //     if (
// // //       name.includes("user")
// // //     ) {
// // //       return FaUsers;
// // //     }

// // //     if (
// // //       name.includes("setting") ||
// // //       name.includes("configuration")
// // //     ) {
// // //       return FaCogs;
// // //     }

// // //     if (
// // //       name.includes("book") ||
// // //       name.includes("library")
// // //     ) {
// // //       return FaBook;
// // //     }

// // //     if (
// // //       name.includes("document")
// // //     ) {
// // //       return FaFileAlt;
// // //     }

// // //     return FaCube;
// // //   };

// // //   /* =====================================================
// // //      MODULE COLORS
// // //   ===================================================== */

// // //   const moduleColors = [
// // //     {
// // //       color: "#2563eb",
// // //       background: "#eff6ff",
// // //       border: "#bfdbfe",
// // //     },
// // //     {
// // //       color: "#7c3aed",
// // //       background: "#f5f3ff",
// // //       border: "#ddd6fe",
// // //     },
// // //     {
// // //       color: "#059669",
// // //       background: "#ecfdf5",
// // //       border: "#a7f3d0",
// // //     },
// // //     {
// // //       color: "#ea580c",
// // //       background: "#fff7ed",
// // //       border: "#fed7aa",
// // //     },
// // //     {
// // //       color: "#db2777",
// // //       background: "#fdf2f8",
// // //       border: "#fbcfe8",
// // //     },
// // //     {
// // //       color: "#0891b2",
// // //       background: "#ecfeff",
// // //       border: "#a5f3fc",
// // //     },
// // //     {
// // //       color: "#ca8a04",
// // //       background: "#fefce8",
// // //       border: "#fde68a",
// // //     },
// // //     {
// // //       color: "#4f46e5",
// // //       background: "#eef2ff",
// // //       border: "#c7d2fe",
// // //     },
// // //   ];

// // //   /* =====================================================
// // //      FETCH USER SIDEBAR MODULES
// // //   ===================================================== */

// // //   useEffect(() => {
// // //     const fetchSidebarModules = async () => {
// // //       try {
// // //         const token =
// // //           localStorage.getItem("token") ||
// // //           localStorage.getItem("AdminToken");

// // //         if (!token) {
// // //           return;
// // //         }

// // //         /*
// // //          * ADMIN normally has its own AdminSidebar.
// // //          * School users use the school mapping sidebar.
// // //          */
// // //         if (String(userRole).toUpperCase() === "ADMIN") {
// // //           return;
// // //         }

// // //         if (!schoolId || !groupId) {
// // //           console.log(
// // //             "Module dropdown: schoolId or groupId missing",
// // //           );
// // //           return;
// // //         }

// // //         setModuleLoading(true);

// // //         const response = await axiosInstance.get(
// // //           `/api/school-mapping/sidebar?schoolId=${schoolId}&groupId=${groupId}`,
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           },
// // //         );

// // //         const data =
// // //           Array.isArray(response?.data)
// // //             ? response.data
// // //             : response?.data?.data ||
// // //               response?.data?.content ||
// // //               [];

// // //         /*
// // //          * Each sidebar item represents a module.
// // //          * Keep only unique modules.
// // //          */
// // //         const uniqueModules = [];
// // //         const moduleIds = new Set();

// // //         data.forEach((item) => {
// // //           const module =
// // //             item?.module ||
// // //             item?.moduleMapping ||
// // //             item;

// // //           const moduleId =
// // //             module?.id ||
// // //             item?.moduleId ||
// // //             module?.moduleId;

// // //           const moduleName =
// // //             module?.moduleName ||
// // //             module?.name ||
// // //             item?.moduleName ||
// // //             item?.name;

// // //           const path =
// // //             item?.path ||
// // //             item?.url ||
// // //             module?.path ||
// // //             "/";

// // //           if (!moduleName) {
// // //             return;
// // //           }

// // //           const uniqueKey =
// // //             moduleId || moduleName.toLowerCase();

// // //           if (moduleIds.has(uniqueKey)) {
// // //             return;
// // //           }

// // //           moduleIds.add(uniqueKey);

// // //           uniqueModules.push({
// // //             id: moduleId || uniqueKey,
// // //             name: moduleName,
// // //             path,
// // //           });
// // //         });

// // //         /*
// // //          * Sort according to sidebar sequence when available.
// // //          */
// // //         const sortedModules = [...uniqueModules].sort(
// // //           (a, b) => {
// // //             const originalA = data.find(
// // //               (item) =>
// // //                 (item?.module?.id ||
// // //                   item?.moduleId ||
// // //                   item?.id) === a.id,
// // //             );

// // //             const originalB = data.find(
// // //               (item) =>
// // //                 (item?.module?.id ||
// // //                   item?.moduleId ||
// // //                   item?.id) === b.id,
// // //             );

// // //             return (
// // //               (originalA?.sequenceNumber || 999) -
// // //               (originalB?.sequenceNumber || 999)
// // //             );
// // //           },
// // //         );

// // //         setSidebarModules(sortedModules);
// // //       } catch (error) {
// // //         console.error(
// // //           "Failed to load module dropdown:",
// // //           error,
// // //         );

// // //         setSidebarModules([]);
// // //       } finally {
// // //         setModuleLoading(false);
// // //       }
// // //     };

// // //     fetchSidebarModules();
// // //   }, [schoolId, groupId, userRole]);

// // //   /* =====================================================
// // //      LIVE CLOCK + GREETING
// // //   ===================================================== */

// // //   useEffect(() => {
// // //     const updateClock = () => {
// // //       const now = new Date();

// // //       setTime(
// // //         now.toLocaleTimeString("en-IN", {
// // //           hour: "2-digit",
// // //           minute: "2-digit",
// // //           hour12: true,
// // //         }),
// // //       );

// // //       const hour = now.getHours();

// // //       if (hour < 12) {
// // //         setGreeting("Good Morning");
// // //       } else if (hour < 17) {
// // //         setGreeting("Good Afternoon");
// // //       } else if (hour < 21) {
// // //         setGreeting("Good Evening");
// // //       } else {
// // //         setGreeting("Good Night");
// // //       }
// // //     };

// // //     updateClock();

// // //     const interval = setInterval(
// // //       updateClock,
// // //       1000,
// // //     );

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   /* =====================================================
// // //      OUTSIDE CLICK
// // //   ===================================================== */

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (
// // //         dropdownRef.current &&
// // //         !dropdownRef.current.contains(event.target)
// // //       ) {
// // //         setShowDropdown(false);
// // //       }

// // //       if (
// // //         moduleDropdownRef.current &&
// // //         !moduleDropdownRef.current.contains(event.target)
// // //       ) {
// // //         setShowModuleDropdown(false);
// // //       }
// // //     };

// // //     document.addEventListener(
// // //       "mousedown",
// // //       handleClickOutside,
// // //     );

// // //     return () => {
// // //       document.removeEventListener(
// // //         "mousedown",
// // //         handleClickOutside,
// // //       );
// // //     };
// // //   }, []);

// // //   /* =====================================================
// // //      ESC CLOSE
// // //   ===================================================== */

// // //   useEffect(() => {
// // //     const handleEscape = (event) => {
// // //       if (event.key === "Escape") {
// // //         setShowDropdown(false);
// // //         setShowModuleDropdown(false);
// // //       }
// // //     };

// // //     document.addEventListener(
// // //       "keydown",
// // //       handleEscape,
// // //     );

// // //     return () => {
// // //       document.removeEventListener(
// // //         "keydown",
// // //         handleEscape,
// // //       );
// // //     };
// // //   }, []);

// // //   /* =====================================================
// // //      DATE
// // //   ===================================================== */

// // //   const formattedDate =
// // //     new Date().toLocaleDateString("en-IN", {
// // //       day: "2-digit",
// // //       month: "short",
// // //       year: "numeric",
// // //     });

// // //   /* =====================================================
// // //      NAVIGATION
// // //   ===================================================== */

// // //   const handleNavigate = (path) => {
// // //     setShowDropdown(false);
// // //     setShowModuleDropdown(false);

// // //     if (path && path !== "/") {
// // //       navigate(path);
// // //     }
// // //   };

// // //   /* =====================================================
// // //      MODULE CLICK
// // //   ===================================================== */

// // //   const handleModuleClick = (module) => {
// // //     if (!module?.path || module.path === "/") {
// // //       setShowModuleDropdown(false);
// // //       return;
// // //     }

// // //     setShowModuleDropdown(false);
// // //     navigate(module.path);
// // //   };

// // //   /* =====================================================
// // //      LOGOUT
// // //   ===================================================== */

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("AdminToken");
// // //     localStorage.removeItem("role");
// // //     localStorage.removeItem("user");

// // //     navigate("/login");
// // //   };

// // //   /* =====================================================
// // //      RENDER
// // //   ===================================================== */

// // //   return (
// // //     <header className="premium-header">

// // //       {/* =================================================
// // //           LEFT SECTION
// // //       ================================================= */}

// // //       <div className="header-left-section">

// // //         {/* LOGO */}

// // //         <div
// // //           className="header-logo-box"
// // //           onClick={() => navigate("/")}
// // //           title="Dashboard"
// // //         >
// // //           <img
// // //             src={logo}
// // //             alt="ZYNTaks"
// // //             className="header-logo"
// // //           />
// // //         </div>

// // //         <div className="header-divider" />

// // //         {/* SIDEBAR */}

// // //         <button
// // //           type="button"
// // //           className="sidebar-toggle-btn"
// // //           onClick={toggleSidebar}
// // //           title="Toggle Sidebar"
// // //         >
// // //           <VscThreeBars size={22} />
// // //         </button>

// // //         {/* GREETING */}

// // //         <div className="header-greeting">
// // //           <div className="greeting-text">
// // //             {greeting},{" "}
// // //             <strong>{userName}</strong>
// // //           </div>

// // //           <div className="greeting-date">
// // //             {formattedDate}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =================================================
// // //           CENTER ORGANIZATION
// // //       ================================================= */}

// // //       <div className="header-center">

// // //         <div className="school-info">

// // //           <div className="school-icon">
// // //             <FaUserCircle size={18} />
// // //           </div>

// // //           <div className="school-details">

// // //             <span className="school-label">
// // //               ORGANIZATION
// // //             </span>

// // //             <span
// // //               className="school-name"
// // //               title={schoolName}
// // //             >
// // //               {schoolName}
// // //             </span>

// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =================================================
// // //           RIGHT SECTION
// // //       ================================================= */}

// // //       <div className="header-right-section">

// // //         {/* TIME */}

// // //         <div className="header-time me-3">

// // //           <div className="time-value">
// // //             {time}
// // //           </div>

// // //           <div className="time-label">
// // //             Local Time
// // //           </div>

// // //         </div>

// // //         {/* NOTIFICATIONS */}

// // //         <button
// // //           type="button"
// // //           className="header-action-btn notification-btn"
// // //           title="Notifications"
// // //           onClick={() =>
// // //             handleNavigate(
// // //               "/admin/notifications",
// // //             )
// // //           }
// // //         >
// // //           <FaBell size={16} />

// // //           <span className="notification-dot" />
// // //         </button>

// // //         {/* SETTINGS */}

// // //         <button
// // //           type="button"
// // //           className="header-action-btn"
// // //           title="Settings"
// // //           onClick={() =>
// // //             handleNavigate("/user-management")
// // //           }
// // //         >
// // //           <FaCog size={16} />
// // //         </button>

// // //         {/* =================================================
// // //             MODULE BUTTON
// // //         ================================================= */}

// // //         <div
// // //           className="module-header-wrapper"
// // //           ref={moduleDropdownRef}
// // //         >

// // //           <button
// // //             type="button"
// // //             className={`header-action-btn module-header-btn ${
// // //               showModuleDropdown
// // //                 ? "module-btn-active"
// // //                 : ""
// // //             }`}
// // //             title="Modules"
// // //             onClick={() =>
// // //               setShowModuleDropdown(
// // //                 (prev) => !prev,
// // //               )
// // //             }
// // //           >
// // //             <MdMenu size={19} />

// // //             {sidebarModules.length > 0 && (
// // //               <span className="module-count-dot">
// // //                 {sidebarModules.length > 9
// // //                   ? "9+"
// // //                   : sidebarModules.length}
// // //               </span>
// // //             )}
// // //           </button>

// // //           {/* =================================================
// // //               MODULE DROPDOWN
// // //           ================================================= */}

// // //           {showModuleDropdown && (
// // //             <div className="module-dropdown">

// // //               {/* HEADER */}

// // //               <div className="module-dropdown-header">

// // //                 <div>
// // //                   <span className="module-dropdown-eyebrow">
// // //                     ZYNTAKS EDUCATION
// // //                   </span>

// // //                   <h6>
// // //                     Modules
// // //                   </h6>

// // //                   <p>
// // //                     Your available modules
// // //                   </p>
// // //                 </div>

// // //                 <div className="module-dropdown-total">
// // //                   {sidebarModules.length}
// // //                 </div>

// // //               </div>

// // //               {/* MODULE LIST */}

// // //               <div className="module-dropdown-list">

// // //                 {moduleLoading ? (
// // //                   <div className="module-dropdown-loading">

// // //                     <div className="module-spinner" />

// // //                     <span>
// // //                       Loading modules...
// // //                     </span>

// // //                   </div>
// // //                 ) : sidebarModules.length === 0 ? (
// // //                   <div className="module-empty">

// // //                     <div className="module-empty-icon">
// // //                       <FaCube />
// // //                     </div>

// // //                     <strong>
// // //                       No modules available
// // //                     </strong>

// // //                     <span>
// // //                       No modules are assigned
// // //                       to your account.
// // //                     </span>

// // //                   </div>
// // //                 ) : (
// // //                   sidebarModules.map(
// // //                     (module, index) => {

// // //                       const Icon =
// // //                         getModuleIcon(
// // //                           module.name,
// // //                         );

// // //                       const color =
// // //                         moduleColors[
// // //                           index %
// // //                             moduleColors.length
// // //                         ];

// // //                       return (
// // //                         <button
// // //                           type="button"
// // //                           key={module.id}
// // //                           className="module-dropdown-item"
// // //                           style={{
// // //                             "--module-color":
// // //                               color.color,
// // //                             "--module-bg":
// // //                               color.background,
// // //                             "--module-border":
// // //                               color.border,
// // //                           }}
// // //                           onClick={() =>
// // //                             handleModuleClick(
// // //                               module,
// // //                             )
// // //                           }
// // //                         >

// // //                           <span className="module-glow" />

// // //                           <span className="module-item-icon">
// // //                             <Icon size={17} />
// // //                           </span>

// // //                           <span className="module-item-content">

// // //                             <span className="module-item-name">
// // //                               {module.name}
// // //                             </span>

// // //                             <span className="module-item-label">
// // //                               Open module
// // //                             </span>

// // //                           </span>

// // //                           <MdKeyboardArrowRight
// // //                             className="module-item-arrow"
// // //                             size={18}
// // //                           />

// // //                         </button>
// // //                       );
// // //                     }
// // //                   )
// // //                 )}

// // //               </div>

// // //               {/* FOOTER */}

// // //               {sidebarModules.length > 0 && (
// // //                 <div className="module-dropdown-footer">
// // //                   <FaCube size={10} />
// // //                   <span>
// // //                     Showing modules assigned
// // //                     to your account
// // //                   </span>
// // //                 </div>
// // //               )}

// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* =================================================
// // //             PROFILE
// // //         ================================================= */}

// // //         <div
// // //           className="profile-wrapper"
// // //           ref={dropdownRef}
// // //         >

// // //           <button
// // //             type="button"
// // //             className={`profile-trigger ${
// // //               showDropdown ? "active" : ""
// // //             }`}
// // //             onClick={() =>
// // //               setShowDropdown(
// // //                 (prev) => !prev,
// // //               )
// // //             }
// // //           >

// // //             <img
// // //               src={profilePic}
// // //               alt="Profile"
// // //               className="profile-image"
// // //             />

// // //             <div className="profile-info">

// // //               <span className="profile-name">
// // //                 {userName}
// // //               </span>

// // //               <span className="profile-role">
// // //                 {userRole}
// // //               </span>

// // //             </div>

// // //             <FaChevronDown
// // //               size={10}
// // //               className={`profile-chevron ${
// // //                 showDropdown
// // //                   ? "rotate"
// // //                   : ""
// // //               }`}
// // //             />

// // //           </button>

// // //           {/* =================================================
// // //               PROFILE DROPDOWN
// // //           ================================================= */}

// // //           {showDropdown && (
// // //             <div className="profile-dropdown">

// // //               {/* PROFILE HEADER */}

// // //               <div className="dropdown-profile">

// // //                 <div className="dropdown-avatar-wrapper">

// // //                   <img
// // //                     src={profilePic}
// // //                     alt="Profile"
// // //                     className="dropdown-avatar"
// // //                   />

// // //                   <span className="online-status" />

// // //                 </div>

// // //                 <div className="dropdown-profile-details">

// // //                   <div className="dropdown-name">
// // //                     {userName}
// // //                   </div>

// // //                   <div className="dropdown-role-row">

// // //                     <span className="role-badge">
// // //                       <FaUserShield size={9} />
// // //                       {userRole}
// // //                     </span>

// // //                   </div>

// // //                   <div
// // //                     className="dropdown-email"
// // //                     title={userEmail}
// // //                   >
// // //                     {userEmail}
// // //                   </div>

// // //                 </div>
// // //               </div>

// // //               <div className="dropdown-divider" />

// // //               {/* ACCOUNT SETTINGS */}

// // //               <button
// // //                 type="button"
// // //                 className="dropdown-menu-item"
// // //                 onClick={() =>
// // //                   handleNavigate(
// // //                     "/admin/account-settings",
// // //                   )
// // //                 }
// // //               >

// // //                 <span className="dropdown-menu-left">

// // //                   <span className="dropdown-menu-icon">
// // //                     <MdOutlineSettings
// // //                       size={17}
// // //                     />
// // //                   </span>

// // //                   <span className="dropdown-menu-text">
// // //                     Account Settings
// // //                   </span>

// // //                 </span>

// // //                 <MdKeyboardArrowRight
// // //                   className="dropdown-arrow"
// // //                   size={18}
// // //                 />

// // //               </button>

// // //               {/* MY PROFILE */}

// // //               <button
// // //                 type="button"
// // //                 className="dropdown-menu-item"
// // //                 onClick={() =>
// // //                   handleNavigate(
// // //                     "/admin/profile",
// // //                   )
// // //                 }
// // //               >

// // //                 <span className="dropdown-menu-left">

// // //                   <span className="dropdown-menu-icon">
// // //                     <FaUser size={14} />
// // //                   </span>

// // //                   <span className="dropdown-menu-text">
// // //                     My Profile
// // //                   </span>

// // //                 </span>

// // //                 <MdKeyboardArrowRight
// // //                   className="dropdown-arrow"
// // //                   size={18}
// // //                 />

// // //               </button>

// // //               {/* NOTIFICATIONS */}

// // //               <button
// // //                 type="button"
// // //                 className="dropdown-menu-item"
// // //                 onClick={() =>
// // //                   handleNavigate(
// // //                     "/admin/notifications",
// // //                   )
// // //                 }
// // //               >

// // //                 <span className="dropdown-menu-left">

// // //                   <span className="dropdown-menu-icon">
// // //                     <FaRegBell size={14} />
// // //                   </span>

// // //                   <span className="dropdown-menu-text">
// // //                     Notifications
// // //                   </span>

// // //                 </span>

// // //                 <MdKeyboardArrowRight
// // //                   className="dropdown-arrow"
// // //                   size={18}
// // //                 />

// // //               </button>

// // //               {/* PREFERENCES */}

// // //               <button
// // //                 type="button"
// // //                 className="dropdown-menu-item"
// // //                 onClick={() =>
// // //                   handleNavigate(
// // //                     "/admin/settings",
// // //                   )
// // //                 }
// // //               >

// // //                 <span className="dropdown-menu-left">

// // //                   <span className="dropdown-menu-icon">
// // //                     <FaSlidersH size={14} />
// // //                   </span>

// // //                   <span className="dropdown-menu-text">
// // //                     Preferences
// // //                   </span>

// // //                 </span>

// // //                 <MdKeyboardArrowRight
// // //                   className="dropdown-arrow"
// // //                   size={18}
// // //                 />

// // //               </button>

// // //               <div className="dropdown-divider" />

// // //               {/* LOGOUT */}

// // //               <button
// // //                 type="button"
// // //                 className="dropdown-menu-item logout-menu-item"
// // //                 onClick={handleLogout}
// // //               >

// // //                 <span className="dropdown-menu-left">

// // //                   <span className="dropdown-menu-icon logout-icon">
// // //                     <MdLogout size={17} />
// // //                   </span>

// // //                   <span className="dropdown-menu-text">
// // //                     Logout
// // //                   </span>

// // //                 </span>

// // //                 <MdKeyboardArrowRight
// // //                   className="dropdown-arrow"
// // //                   size={18}
// // //                 />

// // //               </button>

// // //             </div>
// // //           )}

// // //         </div>

// // //       </div>
// // //     </header>
// // //   );
// // // };

// // // export default Header;

// // import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // import {
// //   FaBell,
// //   FaCog,
// //   FaUserCircle,
// //   FaChevronDown,
// //   FaUser,
// //   FaRegBell,
// //   FaUserShield,
// //   FaSlidersH,
// //   FaCube,
// //   FaGraduationCap,
// //   FaUserGraduate,
// //   FaChalkboardTeacher,
// //   FaCalendarCheck,
// //   FaMoneyBillWave,
// //   FaClipboardCheck,
// //   FaUserPlus,
// //   FaBus,
// //   FaChartBar,
// //   FaCogs,
// //   FaBook,
// //   FaUsers,
// //   FaFileAlt,
// //   FaUniversity,
// //   FaSearch,
// // } from "react-icons/fa";

// // import {
// //   MdLogout,
// //   MdOutlineSettings,
// //   MdKeyboardArrowRight,
// //   MdMenu,
// // } from "react-icons/md";

// // import logo from "../assets/icon/zyntaks.png";
// // import axiosInstance from "../api/axiosInstance";

// // import "./Header.css";

// // const Header = ({ toggleSidebar }) => {
// //   const navigate = useNavigate();

// //   /* =========================================================
// //      STATES
// //   ========================================================= */

// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [showModuleDropdown, setShowModuleDropdown] =
// //     useState(false);

// //   const [time, setTime] = useState("");
// //   const [greeting, setGreeting] = useState("");

// //   const [sidebarModules, setSidebarModules] = useState([]);
// //   const [moduleLoading, setModuleLoading] = useState(false);

// //   const dropdownRef = useRef(null);
// //   const moduleDropdownRef = useRef(null);

// //   /* =========================================================
// //      USER DATA
// //   ========================================================= */

// //   const user =
// //     JSON.parse(localStorage.getItem("user") || "null") || {};

// //   const profilePic =
// //     localStorage.getItem("profilePic") ||
// //     "https://i.pravatar.cc/150?img=12";

// //   const userName =
// //     user?.name ||
// //     user?.username ||
// //     user?.firstName ||
// //     "Administrator";

// //   const userRole =
// //     user?.role ||
// //     localStorage.getItem("role") ||
// //     "ADMIN";

// //   const schoolName =
// //     user?.school?.schoolName ||
// //     user?.schoolName ||
// //     "ZYNTaks Administration";

// //   const userEmail =
// //     user?.email ||
// //     "admin@zyntaks.com";

// //   const schoolId =
// //     user?.schoolId ||
// //     user?.school?.id ||
// //     localStorage.getItem("schoolId");

// //   const groupId =
// //     user?.groupId ||
// //     user?.userGroupId ||
// //     localStorage.getItem("groupId");

// //   /* =========================================================
// //      MODULE ICON
// //   ========================================================= */

// //   const getModuleIcon = (moduleName) => {
// //     const name = String(moduleName || "").toLowerCase();

// //     if (name.includes("admission")) {
// //       return FaUserPlus;
// //     }

// //     if (
// //       name.includes("student") ||
// //       name.includes("profile")
// //     ) {
// //       return FaUserGraduate;
// //     }

// //     if (
// //       name.includes("teacher") ||
// //       name.includes("staff")
// //     ) {
// //       return FaChalkboardTeacher;
// //     }

// //     if (
// //       name.includes("attendance") ||
// //       name.includes("present")
// //     ) {
// //       return FaCalendarCheck;
// //     }

// //     if (
// //       name.includes("fee") ||
// //       name.includes("payment") ||
// //       name.includes("fees")
// //     ) {
// //       return FaMoneyBillWave;
// //     }

// //     if (
// //       name.includes("assessment") ||
// //       name.includes("exam") ||
// //       name.includes("result")
// //     ) {
// //       return FaClipboardCheck;
// //     }

// //     if (
// //       name.includes("transport") ||
// //       name.includes("vehicle")
// //     ) {
// //       return FaBus;
// //     }

// //     if (
// //       name.includes("report") ||
// //       name.includes("reports")
// //     ) {
// //       return FaChartBar;
// //     }

// //     if (
// //       name.includes("library") ||
// //       name.includes("book")
// //     ) {
// //       return FaBook;
// //     }

// //     if (
// //       name.includes("user") ||
// //       name.includes("management")
// //     ) {
// //       return FaUsers;
// //     }

// //     if (
// //       name.includes("setup") ||
// //       name.includes("setting") ||
// //       name.includes("configuration")
// //     ) {
// //       return FaCogs;
// //     }

// //     if (
// //       name.includes("search")
// //     ) {
// //       return FaSearch;
// //     }

// //     if (
// //       name.includes("tc") ||
// //       name.includes("certificate")
// //     ) {
// //       return FaFileAlt;
// //     }

// //     if (
// //       name.includes("school") ||
// //       name.includes("organization")
// //     ) {
// //       return FaUniversity;
// //     }

// //     return FaCube;
// //   };

// //   /* =========================================================
// //      MODULE COLORS
// //   ========================================================= */

// //   const moduleColors = [
// //     {
// //       color: "#2563eb",
// //       bg: "#eff6ff",
// //       border: "#bfdbfe",
// //     },
// //     {
// //       color: "#7c3aed",
// //       bg: "#f5f3ff",
// //       border: "#ddd6fe",
// //     },
// //     {
// //       color: "#059669",
// //       bg: "#ecfdf5",
// //       border: "#a7f3d0",
// //     },
// //     {
// //       color: "#ea580c",
// //       bg: "#fff7ed",
// //       border: "#fed7aa",
// //     },
// //     {
// //       color: "#db2777",
// //       bg: "#fdf2f8",
// //       border: "#fbcfe8",
// //     },
// //     {
// //       color: "#0891b2",
// //       bg: "#ecfeff",
// //       border: "#a5f3fc",
// //     },
// //     {
// //       color: "#ca8a04",
// //       bg: "#fefce8",
// //       border: "#fde68a",
// //     },
// //     {
// //       color: "#4f46e5",
// //       bg: "#eef2ff",
// //       border: "#c7d2fe",
// //     },
// //   ];

// //   /* =========================================================
// //      LIVE CLOCK + GREETING
// //   ========================================================= */

// //   useEffect(() => {
// //     const updateClock = () => {
// //       const now = new Date();

// //       setTime(
// //         now.toLocaleTimeString("en-IN", {
// //           hour: "2-digit",
// //           minute: "2-digit",
// //           hour12: true,
// //         })
// //       );

// //       const hour = now.getHours();

// //       if (hour < 12) {
// //         setGreeting("Good Morning");
// //       } else if (hour < 17) {
// //         setGreeting("Good Afternoon");
// //       } else if (hour < 21) {
// //         setGreeting("Good Evening");
// //       } else {
// //         setGreeting("Good Night");
// //       }
// //     };

// //     updateClock();

// //     const interval = setInterval(
// //       updateClock,
// //       1000
// //     );

// //     return () => clearInterval(interval);
// //   }, []);

// //   /* =========================================================
// //      DATE
// //   ========================================================= */

// //   const formattedDate =
// //     new Date().toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });

// //   /* =========================================================
// //      LOAD SIDEBAR MODULES
// //      SAME API STRUCTURE AS SIDEBAR
// //   ========================================================= */

// //   useEffect(() => {
// //     const loadModules = async () => {
// //       /*
// //        * ADMIN ka sidebar alag hai.
// //        * School mapping sirf school users ke liye.
// //        */
// //       if (
// //         String(userRole).toUpperCase() === "ADMIN"
// //       ) {
// //         setSidebarModules([]);
// //         return;
// //       }

// //       if (!schoolId || !groupId) {
// //         setSidebarModules([]);
// //         return;
// //       }

// //       try {
// //         setModuleLoading(true);

// //         const token =
// //           localStorage.getItem("token") ||
// //           localStorage.getItem("AdminToken");

// //         const res =
// //           await axiosInstance.get(
// //             "/api/school-mapping/sidebar",
// //             {
// //               params: {
// //                 schoolId,
// //                 groupId,
// //               },

// //               headers: {
// //                 Authorization: `Bearer ${token}`,
// //               },
// //             }
// //           );

// //         console.log(
// //           "Header Sidebar response:",
// //           res.data
// //         );

// //         const sidebarData =
// //           Array.isArray(res.data)
// //             ? res.data
// //             : [];

// //         /*
// //          * API response ka top-level item hi MODULE hai.
// //          *
// //          * Example:
// //          *
// //          * {
// //          *   id: 1,
// //          *   label: "Admission",
// //          *   image: "add.png",
// //          *   path: "",
// //          *   sequenceNumber: "2",
// //          *   subMenus: [...]
// //          * }
// //          */

// //         const modules = sidebarData
// //           .map((item) => ({
// //             id: item.id,

// //             name:
// //               item.label ||
// //               "Module",

// //             image:
// //               item.image ||
// //               null,

// //             path:
// //               item.path ||
// //               "",

// //             sequenceNumber:
// //               Number(
// //                 item.sequenceNumber
// //               ) || 0,

// //             subMenus:
// //               Array.isArray(
// //                 item.subMenus
// //               )
// //                 ? item.subMenus
// //                 : [],
// //           }))
// //           .filter(
// //             (item) => item.id
// //           );

// //         /*
// //          * Sequence ke according sort
// //          */

// //         modules.sort(
// //           (a, b) =>
// //             a.sequenceNumber -
// //             b.sequenceNumber
// //         );

// //         /*
// //          * Duplicate module names remove.
// //          *
// //          * Example:
// //          * Transport id 5
// //          * Transport id 17
// //          *
// //          * Header me Transport ek hi baar.
// //          */

// //         const uniqueModules = [];

// //         const moduleNames =
// //           new Set();

// //         modules.forEach((module) => {
// //           const normalizedName =
// //             String(
// //               module.name || ""
// //             )
// //               .trim()
// //               .toLowerCase();

// //           if (
// //             !moduleNames.has(
// //               normalizedName
// //             )
// //           ) {
// //             moduleNames.add(
// //               normalizedName
// //             );

// //             uniqueModules.push(
// //               module
// //             );
// //           }
// //         });

// //         setSidebarModules(
// //           uniqueModules
// //         );
// //       } catch (error) {
// //         console.error(
// //           "Header module loading failed:",
// //           error
// //         );

// //         console.error(
// //           "Response:",
// //           error?.response?.data
// //         );

// //         setSidebarModules([]);
// //       } finally {
// //         setModuleLoading(false);
// //       }
// //     };

// //     loadModules();
// //   }, [
// //     schoolId,
// //     groupId,
// //     userRole,
// //   ]);

// //   /* =========================================================
// //      OUTSIDE CLICK
// //   ========================================================= */

// //   useEffect(() => {
// //     const handleClickOutside = (
// //       event
// //     ) => {
// //       if (
// //         dropdownRef.current &&
// //         !dropdownRef.current.contains(
// //           event.target
// //         )
// //       ) {
// //         setShowDropdown(false);
// //       }

// //       if (
// //         moduleDropdownRef.current &&
// //         !moduleDropdownRef.current.contains(
// //           event.target
// //         )
// //       ) {
// //         setShowModuleDropdown(false);
// //       }
// //     };

// //     document.addEventListener(
// //       "mousedown",
// //       handleClickOutside
// //     );

// //     return () => {
// //       document.removeEventListener(
// //         "mousedown",
// //         handleClickOutside
// //       );
// //     };
// //   }, []);

// //   /* =========================================================
// //      ESC CLOSE
// //   ========================================================= */

// //   useEffect(() => {
// //     const handleEscape = (
// //       event
// //     ) => {
// //       if (event.key === "Escape") {
// //         setShowDropdown(false);
// //         setShowModuleDropdown(false);
// //       }
// //     };

// //     document.addEventListener(
// //       "keydown",
// //       handleEscape
// //     );

// //     return () => {
// //       document.removeEventListener(
// //         "keydown",
// //         handleEscape
// //       );
// //     };
// //   }, []);

// //   /* =========================================================
// //      NAVIGATION HELPER
// //   ========================================================= */

// //   const handleNavigate = (
// //     path
// //   ) => {
// //     if (!path) return;

// //     setShowDropdown(false);
// //     setShowModuleDropdown(false);

// //     navigate(path);
// //   };

// //   /* =========================================================
// //      MODULE CLICK
// //   ========================================================= */

// //   const handleModuleClick = (
// //     module
// //   ) => {
// //     /*
// //      * Agar module ka direct path available hai
// //      */
// //     if (module?.path) {
// //       handleNavigate(
// //         module.path
// //       );

// //       return;
// //     }

// //     /*
// //      * Module path empty hai.
// //      * Isliye first valid submenu open karo.
// //      */

// //     const firstSubMenu =
// //       Array.isArray(
// //         module?.subMenus
// //       )
// //         ? module.subMenus.find(
// //             (subMenu) =>
// //               subMenu?.path
// //           )
// //         : null;

// //     if (
// //       firstSubMenu?.path
// //     ) {
// //       handleNavigate(
// //         firstSubMenu.path
// //       );

// //       return;
// //     }

// //     /*
// //      * Agar submenu bhi nahi hai
// //      */
// //     console.log(
// //       "No navigation path available for module:",
// //       module?.name
// //     );
// //   };

// //   /* =========================================================
// //      LOGOUT
// //   ========================================================= */

// //   const handleLogout = () => {
// //     localStorage.removeItem(
// //       "token"
// //     );

// //     localStorage.removeItem(
// //       "AdminToken"
// //     );

// //     localStorage.removeItem(
// //       "role"
// //     );

// //     localStorage.removeItem(
// //       "user"
// //     );

// //     localStorage.removeItem(
// //       "schoolId"
// //     );

// //     localStorage.removeItem(
// //       "groupId"
// //     );

// //     navigate("/login");
// //   };

// //   /* =========================================================
// //      RENDER
// //   ========================================================= */

// //   return (
// //     <header className="premium-header">

// //       {/* =====================================================
// //           LEFT SECTION
// //       ===================================================== */}

// //       <div className="header-left-section">

// //         <div
// //           className="header-logo-box"
// //           onClick={() =>
// //             navigate("/")
// //           }
// //           title="Dashboard"
// //         >
// //           <img
// //             src={logo}
// //             alt="ZYNTaks"
// //             className="header-logo"
// //           />
// //         </div>

// //         <div className="header-divider"></div>

// //         <button
// //           type="button"
// //           className="sidebar-toggle-btn"
// //           onClick={
// //             toggleSidebar
// //           }
// //           title="Toggle Sidebar"
// //         >
// //           <MdMenu size={22} />
// //         </button>

// //         <div className="header-greeting">
// //           <div className="greeting-text">
// //             {greeting},{" "}
// //             <strong>
// //               {userName}
// //             </strong>
// //           </div>

// //           <div className="greeting-date">
// //             {formattedDate}
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           CENTER SECTION
// //       ===================================================== */}

// //       <div className="header-center">

// //         <div className="school-info">

// //           <div className="school-icon">
// //             <FaUserCircle size={18} />
// //           </div>

// //           <div className="school-details">

// //             <span className="school-label">
// //               ORGANIZATION
// //             </span>

// //             <span
// //               className="school-name"
// //               title={schoolName}
// //             >
// //               {schoolName}
// //             </span>

// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           RIGHT SECTION
// //       ===================================================== */}

// //       <div className="header-right-section">

// //         {/* TIME */}

// //         <div className="header-time me-3">

// //           <div className="time-value">
// //             {time}
// //           </div>

// //           <div className="time-label">
// //             Local Time
// //           </div>

// //         </div>

// //         {/* =================================================
// //             NOTIFICATIONS
// //         ================================================= */}

// //         <button
// //           type="button"
// //           className="header-action-btn notification-btn"
// //           title="Notifications"
// //           onClick={() =>
// //             handleNavigate(
// //               "/admin/notifications"
// //             )
// //           }
// //         >
// //           <FaBell size={16} />

// //           <span className="notification-dot"></span>
// //         </button>

// //         {/* =================================================
// //             SETTINGS
// //         ================================================= */}

// //         <button
// //           type="button"
// //           className="header-action-btn"
// //           title="Settings"
// //           onClick={() =>
// //             handleNavigate(
// //               "/user-management"
// //             )
// //           }
// //         >
// //           <FaCog size={16} />
// //         </button>

// //         {/* =================================================
// //             MODULE BUTTON
// //         ================================================= */}

// //         {String(
// //           userRole
// //         ).toUpperCase() !==
// //           "ADMIN" && (
// //           <div
// //             className="module-header-wrapper"
// //             ref={
// //               moduleDropdownRef
// //             }
// //           >

// //             <button
// //               type="button"
// //               className={`header-action-btn module-header-btn ${
// //                 showModuleDropdown
// //                   ? "module-btn-active"
// //                   : ""
// //               }`}
// //               title="Modules"
// //               onClick={() =>
// //                 setShowModuleDropdown(
// //                   (prev) =>
// //                     !prev
// //                 )
// //               }
// //             >
// //               <FaCube size={17} />

// //               {sidebarModules.length >
// //                 0 && (
// //                 <span className="module-count-dot">
// //                   {sidebarModules.length >
// //                   9
// //                     ? "9+"
// //                     : sidebarModules.length}
// //                 </span>
// //               )}
// //             </button>

// //             {/* =================================================
// //                 MODULE DROPDOWN
// //             ================================================= */}

// //             {showModuleDropdown && (
// //               <div className="module-dropdown">

// //                 {/* DROPDOWN HEADER */}

// //                 <div className="module-dropdown-header">

// //                   <div className="module-dropdown-title-row">

// //                     <div className="module-dropdown-main-icon">
// //                       <FaCube size={15} />
// //                     </div>

// //                     <div>
// //                       <div className="module-dropdown-title">
// //                         Modules
// //                       </div>

// //                       <div className="module-dropdown-subtitle">
// //                         Your available modules
// //                       </div>
// //                     </div>

// //                   </div>

// //                   <div className="module-total-badge">
// //                     {
// //                       sidebarModules.length
// //                     }
// //                   </div>

// //                 </div>

// //                 {/* DIVIDER */}

// //                 <div className="module-dropdown-divider"></div>

// //                 {/* MODULE LIST */}

// //                 <div className="module-dropdown-list">

// //                   {moduleLoading ? (
// //                     <div className="module-loading">
// //                       <span className="module-spinner"></span>

// //                       <span>
// //                         Loading modules...
// //                       </span>
// //                     </div>
// //                   ) : sidebarModules.length ===
// //                     0 ? (
// //                     <div className="module-empty">

// //                       <div className="module-empty-icon">
// //                         <FaCube size={20} />
// //                       </div>

// //                       <div className="module-empty-title">
// //                         No modules available
// //                       </div>

// //                       <div className="module-empty-text">
// //                         No modules are assigned
// //                         to your account.
// //                       </div>

// //                     </div>
// //                   ) : (
// //                     sidebarModules.map(
// //                       (
// //                         module,
// //                         index
// //                       ) => {
// //                         const Icon =
// //                           getModuleIcon(
// //                             module.name
// //                           );

// //                         const theme =
// //                           moduleColors[
// //                             index %
// //                               moduleColors.length
// //                           ];

// //                         return (
// //                           <button
// //                             type="button"
// //                             key={
// //                               module.id
// //                             }
// //                             className="module-dropdown-item"
// //                             style={{
// //                               "--module-color":
// //                                 theme.color,

// //                               "--module-bg":
// //                                 theme.bg,

// //                               "--module-border":
// //                                 theme.border,
// //                             }}
// //                             onClick={() =>
// //                               handleModuleClick(
// //                                 module
// //                               )
// //                             }
// //                           >

// //                             {/* GLOSSY SHINE */}

// //                             <span className="module-gloss"></span>

// //                             {/* ICON */}

// //                             <span className="module-item-icon">
// //                               {module.image ? (
// //                                 <img
// //                                   src={`/images/${module.image}`}
// //                                   alt={
// //                                     module.name
// //                                   }
// //                                   onError={(
// //                                     event
// //                                   ) => {
// //                                     event.currentTarget.style.display =
// //                                       "none";

// //                                     const icon =
// //                                       event.currentTarget.nextElementSibling;

// //                                     if (
// //                                       icon
// //                                     ) {
// //                                       icon.style.display =
// //                                         "block";
// //                                     }
// //                                   }}
// //                                 />
// //                               ) : null}

// //                               <Icon
// //                                 size={18}
// //                                 style={{
// //                                   display:
// //                                     module.image
// //                                       ? "none"
// //                                       : "block",
// //                                 }}
// //                               />
// //                             </span>

// //                             {/* TEXT */}

// //                             <span className="module-item-content">

// //                               <span className="module-item-name">
// //                                 {
// //                                   module.name
// //                                 }
// //                               </span>

// //                               <span className="module-item-label">
// //                                 Open module
// //                               </span>

// //                             </span>

// //                             {/* ARROW */}

// //                             <span className="module-item-arrow">
// //                               <MdKeyboardArrowRight
// //                                 size={19}
// //                               />
// //                             </span>

// //                             {/* GLOW */}

// //                             <span className="module-glow"></span>

// //                           </button>
// //                         );
// //                       }
// //                     )
// //                   )}

// //                 </div>

// //                 {/* FOOTER */}

// //                 {sidebarModules.length >
// //                   0 && (
// //                   <div className="module-dropdown-footer">
// //                     <FaCube size={11} />

// //                     <span>
// //                       Showing modules assigned
// //                       to your account
// //                     </span>
// //                   </div>
// //                 )}

// //               </div>
// //             )}

// //           </div>
// //         )}

// //         {/* =================================================
// //             PROFILE
// //         ================================================= */}

// //         <div
// //           className="profile-wrapper"
// //           ref={dropdownRef}
// //         >

// //           <button
// //             type="button"
// //             className={`profile-trigger ${
// //               showDropdown
// //                 ? "active"
// //                 : ""
// //             }`}
// //             onClick={() =>
// //               setShowDropdown(
// //                 (prev) =>
// //                   !prev
// //               )
// //             }
// //           >

// //             <img
// //               src={profilePic}
// //               alt="Profile"
// //               className="profile-image"
// //             />

// //             <div className="profile-info">

// //               <span className="profile-name">
// //                 {userName}
// //               </span>

// //               <span className="profile-role">
// //                 {userRole}
// //               </span>

// //             </div>

// //             <FaChevronDown
// //               size={10}
// //               className={`profile-chevron ${
// //                 showDropdown
// //                   ? "rotate"
// //                   : ""
// //               }`}
// //             />

// //           </button>

// //           {/* =================================================
// //               PROFILE DROPDOWN
// //           ================================================= */}

// //           {showDropdown && (
// //             <div className="profile-dropdown">

// //               {/* PROFILE */}

// //               <div className="dropdown-profile">

// //                 <div className="dropdown-avatar-wrapper">

// //                   <img
// //                     src={profilePic}
// //                     alt="Profile"
// //                     className="dropdown-avatar"
// //                   />

// //                   <span className="online-status"></span>

// //                 </div>

// //                 <div className="dropdown-profile-details">

// //                   <div className="dropdown-name">
// //                     {userName}
// //                   </div>

// //                   <div className="dropdown-role-row">

// //                     <span className="role-badge">
// //                       <FaUserShield
// //                         size={9}
// //                       />

// //                       {userRole}
// //                     </span>

// //                   </div>

// //                   <div
// //                     className="dropdown-email"
// //                     title={userEmail}
// //                   >
// //                     {userEmail}
// //                   </div>

// //                 </div>

// //               </div>

// //               <div className="dropdown-divider"></div>

// //               {/* ACCOUNT SETTINGS */}

// //               <button
// //                 type="button"
// //                 className="dropdown-menu-item"
// //                 onClick={() =>
// //                   handleNavigate(
// //                     "/admin/account-settings"
// //                   )
// //                 }
// //               >

// //                 <span className="dropdown-menu-left">

// //                   <span className="dropdown-menu-icon">
// //                     <MdOutlineSettings
// //                       size={17}
// //                     />
// //                   </span>

// //                   <span className="dropdown-menu-text">
// //                     Account Settings
// //                   </span>

// //                 </span>

// //                 <MdKeyboardArrowRight
// //                   className="dropdown-arrow"
// //                   size={18}
// //                 />

// //               </button>

// //               {/* MY PROFILE */}

// //               <button
// //                 type="button"
// //                 className="dropdown-menu-item"
// //                 onClick={() =>
// //                   handleNavigate(
// //                     "/admin/profile"
// //                   )
// //                 }
// //               >

// //                 <span className="dropdown-menu-left">

// //                   <span className="dropdown-menu-icon">
// //                     <FaUser size={14} />
// //                   </span>

// //                   <span className="dropdown-menu-text">
// //                     My Profile
// //                   </span>

// //                 </span>

// //                 <MdKeyboardArrowRight
// //                   className="dropdown-arrow"
// //                   size={18}
// //                 />

// //               </button>

// //               {/* NOTIFICATIONS */}

// //               <button
// //                 type="button"
// //                 className="dropdown-menu-item"
// //                 onClick={() =>
// //                   handleNavigate(
// //                     "/admin/notifications"
// //                   )
// //                 }
// //               >

// //                 <span className="dropdown-menu-left">

// //                   <span className="dropdown-menu-icon">
// //                     <FaRegBell size={14} />
// //                   </span>

// //                   <span className="dropdown-menu-text">
// //                     Notifications
// //                   </span>

// //                 </span>

// //                 <MdKeyboardArrowRight
// //                   className="dropdown-arrow"
// //                   size={18}
// //                 />

// //               </button>

// //               {/* PREFERENCES */}

// //               <button
// //                 type="button"
// //                 className="dropdown-menu-item"
// //                 onClick={() =>
// //                   handleNavigate(
// //                     "/admin/settings"
// //                   )
// //                 }
// //               >

// //                 <span className="dropdown-menu-left">

// //                   <span className="dropdown-menu-icon">
// //                     <FaSlidersH
// //                       size={14}
// //                     />
// //                   </span>

// //                   <span className="dropdown-menu-text">
// //                     Preferences
// //                   </span>

// //                 </span>

// //                 <MdKeyboardArrowRight
// //                   className="dropdown-arrow"
// //                   size={18}
// //                 />

// //               </button>

// //               <div className="dropdown-divider"></div>

// //               {/* LOGOUT */}

// //               <button
// //                 type="button"
// //                 className="dropdown-menu-item logout-menu-item"
// //                 onClick={
// //                   handleLogout
// //                 }
// //               >

// //                 <span className="dropdown-menu-left">

// //                   <span className="dropdown-menu-icon logout-icon">
// //                     <MdLogout
// //                       size={17}
// //                     />
// //                   </span>

// //                   <span className="dropdown-menu-text">
// //                     Logout
// //                   </span>

// //                 </span>

// //                 <MdKeyboardArrowRight
// //                   className="dropdown-arrow"
// //                   size={18}
// //                 />

// //               </button>

// //             </div>
// //           )}

// //         </div>

// //       </div>

// //     </header>
// //   );
// // };

// // export default Header;

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaBell,
//   FaCog,
//   FaUserCircle,
//   FaChevronDown,
//   FaUser,
//   FaRegBell,
//   FaUserShield,
//   FaSlidersH,
//   FaCube,
//   FaUserPlus,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaCalendarCheck,
//   FaMoneyBillWave,
//   FaClipboardCheck,
//   FaBus,
//   FaChartBar,
//   FaCogs,
//   FaBook,
//   FaUsers,
//   FaFileAlt,
//   FaUniversity,
//   FaSearch,
// } from "react-icons/fa";

// import {
//   MdLogout,
//   MdOutlineSettings,
//   MdKeyboardArrowRight,
//   MdMenu,
// } from "react-icons/md";

// import logo from "../assets/icon/zyntaks.png";
// import axiosInstance from "../api/axiosInstance";

// import "./Header.css";

// const Header = ({ toggleSidebar }) => {
//   const navigate = useNavigate();

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModuleDropdown, setShowModuleDropdown] =
//     useState(false);

//   const [time, setTime] = useState("");
//   const [greeting, setGreeting] = useState("");

//   const [sidebarModules, setSidebarModules] = useState([]);
//   const [moduleLoading, setModuleLoading] = useState(false);

//   const dropdownRef = useRef(null);
//   const moduleDropdownRef = useRef(null);

//   /* =========================================================
//      USER DATA
//   ========================================================= */

//   const user =
//     JSON.parse(localStorage.getItem("user") || "null") || {};

//   const profilePic =
//     localStorage.getItem("profilePic") ||
//     "https://i.pravatar.cc/150?img=12";

//   const userName =
//     user?.name ||
//     user?.username ||
//     user?.firstName ||
//     "Administrator";

//   const userRole =
//     user?.role ||
//     localStorage.getItem("role") ||
//     "ADMIN";

//   const schoolName =
//     user?.school?.schoolName ||
//     user?.schoolName ||
//     "ZYNTaks Administration";

//   const userEmail =
//     user?.email ||
//     "admin@zyntaks.com";

//   const schoolId =
//     user?.schoolId ||
//     user?.school?.id ||
//     localStorage.getItem("schoolId");

//   const groupId =
//     user?.groupId ||
//     user?.userGroupId ||
//     localStorage.getItem("groupId");

//   /* =========================================================
//      MODULE ICON
//   ========================================================= */

//   const getModuleIcon = (moduleName) => {
//     const name = String(moduleName || "").toLowerCase();

//     if (name.includes("admission")) {
//       return FaUserPlus;
//     }

//     if (
//       name.includes("student") ||
//       name.includes("profile")
//     ) {
//       return FaUserGraduate;
//     }

//     if (
//       name.includes("teacher") ||
//       name.includes("staff")
//     ) {
//       return FaChalkboardTeacher;
//     }

//     if (
//       name.includes("attendance") ||
//       name.includes("present")
//     ) {
//       return FaCalendarCheck;
//     }

//     if (
//       name.includes("fee") ||
//       name.includes("payment")
//     ) {
//       return FaMoneyBillWave;
//     }

//     if (
//       name.includes("assessment") ||
//       name.includes("exam") ||
//       name.includes("result")
//     ) {
//       return FaClipboardCheck;
//     }

//     if (
//       name.includes("transport") ||
//       name.includes("vehicle")
//     ) {
//       return FaBus;
//     }

//     if (
//       name.includes("report")
//     ) {
//       return FaChartBar;
//     }

//     if (
//       name.includes("library") ||
//       name.includes("book")
//     ) {
//       return FaBook;
//     }

//     if (
//       name.includes("user") ||
//       name.includes("management")
//     ) {
//       return FaUsers;
//     }

//     if (
//       name.includes("setup") ||
//       name.includes("setting") ||
//       name.includes("configuration")
//     ) {
//       return FaCogs;
//     }

//     if (name.includes("search")) {
//       return FaSearch;
//     }

//     if (
//       name.includes("tc") ||
//       name.includes("certificate")
//     ) {
//       return FaFileAlt;
//     }

//     if (
//       name.includes("school") ||
//       name.includes("organization")
//     ) {
//       return FaUniversity;
//     }

//     return FaCube;
//   };

//   /* =========================================================
//      MODULE COLORS
//   ========================================================= */

//   const moduleColors = [
//     {
//       color: "#2563eb",
//       bg: "#eff6ff",
//       border: "#bfdbfe",
//     },
//     {
//       color: "#7c3aed",
//       bg: "#f5f3ff",
//       border: "#ddd6fe",
//     },
//     {
//       color: "#059669",
//       bg: "#ecfdf5",
//       border: "#a7f3d0",
//     },
//     {
//       color: "#ea580c",
//       bg: "#fff7ed",
//       border: "#fed7aa",
//     },
//     {
//       color: "#db2777",
//       bg: "#fdf2f8",
//       border: "#fbcfe8",
//     },
//     {
//       color: "#0891b2",
//       bg: "#ecfeff",
//       border: "#a5f3fc",
//     },
//     {
//       color: "#ca8a04",
//       bg: "#fefce8",
//       border: "#fde68a",
//     },
//     {
//       color: "#4f46e5",
//       bg: "#eef2ff",
//       border: "#c7d2fe",
//     },
//   ];

//   /* =========================================================
//      LIVE CLOCK + GREETING
//   ========================================================= */

//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();

//       setTime(
//         now.toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })
//       );

//       const hour = now.getHours();

//       if (hour < 12) {
//         setGreeting("Good Morning");
//       } else if (hour < 17) {
//         setGreeting("Good Afternoon");
//       } else if (hour < 21) {
//         setGreeting("Good Evening");
//       } else {
//         setGreeting("Good Night");
//       }
//     };

//     updateClock();

//     const interval = setInterval(
//       updateClock,
//       1000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   /* =========================================================
//      LOAD MODULES
//   ========================================================= */

//   useEffect(() => {
//     const loadModules = async () => {
//       if (
//         String(userRole).toUpperCase() === "ADMIN"
//       ) {
//         setSidebarModules([]);
//         return;
//       }

//       if (!schoolId || !groupId) {
//         setSidebarModules([]);
//         return;
//       }

//       try {
//         setModuleLoading(true);

//         const token =
//           localStorage.getItem("token") ||
//           localStorage.getItem("AdminToken");

//         const res = await axiosInstance.get(
//           "/api/school-mapping/sidebar",
//           {
//             params: {
//               schoolId,
//               groupId,
//             },

//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log(
//           "Header Sidebar response:",
//           res.data
//         );

//         const sidebarData =
//           Array.isArray(res.data)
//             ? res.data
//             : [];

//         /*
//          * Top-level sidebar items = modules
//          */

//         const modules = sidebarData
//           .map((item) => ({
//             id: item.id,

//             name:
//               item.label ||
//               "Module",

//             image:
//               item.image ||
//               null,

//             path:
//               item.path ||
//               "",

//             sequenceNumber:
//               Number(
//                 item.sequenceNumber
//               ) || 0,

//             subMenus:
//               Array.isArray(
//                 item.subMenus
//               )
//                 ? item.subMenus
//                 : [],
//           }))
//           .filter(
//             (item) => item.id
//           );

//         /*
//          * Sequence order
//          */

//         modules.sort(
//           (a, b) =>
//             a.sequenceNumber -
//             b.sequenceNumber
//         );

//         /*
//          * Remove duplicate labels
//          */

//         const uniqueModules = [];
//         const moduleNames = new Set();

//         modules.forEach((module) => {
//           const normalizedName =
//             String(
//               module.name || ""
//             )
//               .trim()
//               .toLowerCase();

//           if (
//             !moduleNames.has(
//               normalizedName
//             )
//           ) {
//             moduleNames.add(
//               normalizedName
//             );

//             uniqueModules.push(
//               module
//             );
//           }
//         });

//         setSidebarModules(
//           uniqueModules
//         );
//       } catch (error) {
//         console.error(
//           "Header module loading failed:",
//           error
//         );

//         console.error(
//           "Response:",
//           error?.response?.data
//         );

//         setSidebarModules([]);
//       } finally {
//         setModuleLoading(false);
//       }
//     };

//     loadModules();
//   }, [
//     schoolId,
//     groupId,
//     userRole,
//   ]);

//   /* =========================================================
//      DATE
//   ========================================================= */

//   const formattedDate =
//     new Date().toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//   /* =========================================================
//      OUTSIDE CLICK
//   ========================================================= */

//   useEffect(() => {
//     const handleClickOutside = (
//       event
//     ) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(
//           event.target
//         )
//       ) {
//         setShowDropdown(false);
//       }

//       if (
//         moduleDropdownRef.current &&
//         !moduleDropdownRef.current.contains(
//           event.target
//         )
//       ) {
//         setShowModuleDropdown(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   /* =========================================================
//      ESC CLOSE
//   ========================================================= */

//   useEffect(() => {
//     const handleEscape = (
//       event
//     ) => {
//       if (event.key === "Escape") {
//         setShowDropdown(false);
//         setShowModuleDropdown(false);
//       }
//     };

//     document.addEventListener(
//       "keydown",
//       handleEscape
//     );

//     return () => {
//       document.removeEventListener(
//         "keydown",
//         handleEscape
//       );
//     };
//   }, []);

//   /* =========================================================
//      NAVIGATION
//   ========================================================= */

//   const handleNavigate = (
//     path
//   ) => {
//     if (!path) return;

//     setShowDropdown(false);
//     setShowModuleDropdown(false);

//     navigate(path);
//   };

//   /* =========================================================
//      MODULE CLICK
//   ========================================================= */

//   const handleModuleClick = (
//     module
//   ) => {
//     /*
//      * Direct module path
//      */

//     if (module?.path) {
//       handleNavigate(
//         module.path
//       );

//       return;
//     }

//     /*
//      * Module path empty hai.
//      * First valid submenu open hoga.
//      */

//     const firstSubMenu =
//       Array.isArray(
//         module?.subMenus
//       )
//         ? module.subMenus.find(
//             (subMenu) =>
//               subMenu?.path
//           )
//         : null;

//     if (
//       firstSubMenu?.path
//     ) {
//       handleNavigate(
//         firstSubMenu.path
//       );

//       return;
//     }

//     console.log(
//       "No navigation path available for:",
//       module?.name
//     );
//   };

//   /* =========================================================
//      LOGOUT
//   ========================================================= */

//   const handleLogout = () => {
//     localStorage.removeItem(
//       "token"
//     );

//     localStorage.removeItem(
//       "AdminToken"
//     );

//     localStorage.removeItem(
//       "role"
//     );

//     localStorage.removeItem(
//       "user"
//     );

//     localStorage.removeItem(
//       "schoolId"
//     );

//     localStorage.removeItem(
//       "groupId"
//     );

//     navigate("/login");
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <header className="premium-header">

//       {/* =====================================================
//           LEFT
//       ===================================================== */}

//       <div className="header-left-section">

//         <div
//           className="header-logo-box"
//           onClick={() =>
//             navigate("/")
//           }
//           title="Dashboard"
//         >
//           <img
//             src={logo}
//             alt="ZYNTaks"
//             className="header-logo"
//           />
//         </div>

//         <div className="header-divider"></div>

//         <button
//           type="button"
//           className="sidebar-toggle-btn"
//           onClick={
//             toggleSidebar
//           }
//           title="Toggle Sidebar"
//         >
//           <MdMenu size={22} />
//         </button>

//         <div className="header-greeting">

//           <div className="greeting-text">
//             {greeting},{" "}
//             <strong>
//               {userName}
//             </strong>
//           </div>

//           <div className="greeting-date">
//             {formattedDate}
//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           CENTER
//       ===================================================== */}

//       <div className="header-center">

//         <div className="school-info">

//           <div className="school-icon">
//             <FaUserCircle size={18} />
//           </div>

//           <div className="school-details">

//             <span className="school-label">
//               ORGANIZATION
//             </span>

//             <span
//               className="school-name"
//               title={schoolName}
//             >
//               {schoolName}
//             </span>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           RIGHT
//       ===================================================== */}

//       <div className="header-right-section">

//         {/* TIME */}

//         <div className="header-time me-3">

//           <div className="time-value">
//             {time}
//           </div>

//           <div className="time-label">
//             Local Time
//           </div>

//         </div>

//         {/* =================================================
//             NOTIFICATION
//         ================================================= */}

//         <button
//           type="button"
//           className="header-action-btn notification-btn"
//           title="Notifications"
//           onClick={() =>
//             handleNavigate(
//               "/admin/notifications"
//             )
//           }
//         >
//           <FaBell size={16} />

//           <span className="notification-dot"></span>
//         </button>

//         {/* =================================================
//             SETTINGS
//         ================================================= */}

//         <button
//           type="button"
//           className="header-action-btn"
//           title="Settings"
//           onClick={() =>
//             handleNavigate(
//               "/user-management"
//             )
//           }
//         >
//           <FaCog size={16} />
//         </button>

//         {/* =================================================
//             MODULE BUTTON
//         ================================================= */}

//         {String(
//           userRole
//         ).toUpperCase() !==
//           "ADMIN" && (
//           <div
//             className="module-header-wrapper"
//             ref={
//               moduleDropdownRef
//             }
//           >

//             <button
//               type="button"
//               className={`header-action-btn module-header-btn ${
//                 showModuleDropdown
//                   ? "module-btn-active"
//                   : ""
//               }`}
//               title="Modules"
//               onClick={() =>
//                 setShowModuleDropdown(
//                   (prev) =>
//                     !prev
//                 )
//               }
//             >
//               <FaCube size={17} />

//               {sidebarModules.length >
//                 0 && (
//                 <span className="module-count-dot">
//                   {sidebarModules.length >
//                   9
//                     ? "9+"
//                     : sidebarModules.length}
//                 </span>
//               )}
//             </button>

//             {/* =================================================
//                 MODULE DROPDOWN
//             ================================================= */}

//             {showModuleDropdown && (
//               <div className="module-dropdown">

//                 {/* HEADER */}

//                 <div className="module-dropdown-header">

//                   <div className="module-dropdown-title-row">

//                     <div className="module-dropdown-main-icon">
//                       <FaCube size={14} />
//                     </div>

//                     <div>

//                       <div className="module-dropdown-title">
//                         Modules
//                       </div>

//                       <div className="module-dropdown-subtitle">
//                         Available modules
//                       </div>

//                     </div>

//                   </div>

//                   <div className="module-total-badge">
//                     {
//                       sidebarModules.length
//                     }
//                   </div>

//                 </div>

//                 <div className="module-dropdown-divider"></div>

//                 {/* ICON GRID */}

//                 <div className="module-icon-grid">

//                   {moduleLoading ? (
//                     <div className="module-loading">

//                       <span className="module-spinner"></span>

//                       <span>
//                         Loading modules...
//                       </span>

//                     </div>
//                   ) : sidebarModules.length ===
//                     0 ? (
//                     <div className="module-empty">

//                       <div className="module-empty-icon">
//                         <FaCube size={20} />
//                       </div>

//                       <div className="module-empty-title">
//                         No modules available
//                       </div>

//                     </div>
//                   ) : (
//                     sidebarModules.map(
//                       (
//                         module,
//                         index
//                       ) => {

//                         const Icon =
//                           getModuleIcon(
//                             module.name
//                           );

//                         const theme =
//                           moduleColors[
//                             index %
//                               moduleColors.length
//                           ];

//                         return (
//                           <button
//                             type="button"
//                             key={
//                               module.id
//                             }
//                             className="module-icon-item"
//                             title={
//                               module.name
//                             }
//                             style={{
//                               "--module-color":
//                                 theme.color,

//                               "--module-bg":
//                                 theme.bg,

//                               "--module-border":
//                                 theme.border,
//                             }}
//                             onClick={() =>
//                               handleModuleClick(
//                                 module
//                               )
//                             }
//                           >

//                             {/* GLOSS */}

//                             <span className="module-icon-shine"></span>

//                             {/* ICON */}

//                             <span className="module-only-icon">

//                               {module.image ? (
//                                 <img
//                                   src={`/images/${module.image}`}
//                                   alt=""
//                                   onError={(
//                                     event
//                                   ) => {

//                                     event.currentTarget.style.display =
//                                       "none";

//                                     const fallback =
//                                       event
//                                         .currentTarget
//                                         .nextElementSibling;

//                                     if (
//                                       fallback
//                                     ) {
//                                       fallback.style.display =
//                                         "block";
//                                     }

//                                   }}
//                                 />
//                               ) : null}

//                               <Icon
//                                 size={23}
//                                 style={{
//                                   display:
//                                     module.image
//                                       ? "none"
//                                       : "block",
//                                 }}
//                               />

//                             </span>

//                           </button>
//                         );
//                       }
//                     )
//                   )}

//                 </div>

//                 {/* FOOTER */}

//                 {sidebarModules.length >
//                   0 && (
//                   <div className="module-dropdown-footer">

//                     <FaCube size={10} />

//                     <span>
//                       Click an icon to open module
//                     </span>

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>
//         )}

//         {/* =================================================
//             PROFILE
//         ================================================= */}

//         <div
//           className="profile-wrapper"
//           ref={dropdownRef}
//         >

//           <button
//             type="button"
//             className={`profile-trigger ${
//               showDropdown
//                 ? "active"
//                 : ""
//             }`}
//             onClick={() =>
//               setShowDropdown(
//                 (prev) =>
//                   !prev
//               )
//             }
//           >

//             <img
//               src={profilePic}
//               alt="Profile"
//               className="profile-image"
//             />

//             <div className="profile-info">

//               <span className="profile-name">
//                 {userName}
//               </span>

//               <span className="profile-role">
//                 {userRole}
//               </span>

//             </div>

//             <FaChevronDown
//               size={10}
//               className={`profile-chevron ${
//                 showDropdown
//                   ? "rotate"
//                   : ""
//               }`}
//             />

//           </button>

//           {/* PROFILE DROPDOWN */}

//           {showDropdown && (
//             <div className="profile-dropdown">

//               <div className="dropdown-profile">

//                 <div className="dropdown-avatar-wrapper">

//                   <img
//                     src={profilePic}
//                     alt="Profile"
//                     className="dropdown-avatar"
//                   />

//                   <span className="online-status"></span>

//                 </div>

//                 <div className="dropdown-profile-details">

//                   <div className="dropdown-name">
//                     {userName}
//                   </div>

//                   <div className="dropdown-role-row">

//                     <span className="role-badge">

//                       <FaUserShield size={9} />

//                       {userRole}

//                     </span>

//                   </div>

//                   <div
//                     className="dropdown-email"
//                     title={userEmail}
//                   >
//                     {userEmail}
//                   </div>

//                 </div>

//               </div>

//               <div className="dropdown-divider"></div>

//               {/* ACCOUNT SETTINGS */}

//               <button
//                 type="button"
//                 className="dropdown-menu-item"
//                 onClick={() =>
//                   handleNavigate(
//                     "/admin/account-settings"
//                   )
//                 }
//               >

//                 <span className="dropdown-menu-left">

//                   <span className="dropdown-menu-icon">
//                     <MdOutlineSettings
//                       size={17}
//                     />
//                   </span>

//                   <span className="dropdown-menu-text">
//                     Account Settings
//                   </span>

//                 </span>

//                 <MdKeyboardArrowRight
//                   className="dropdown-arrow"
//                   size={18}
//                 />

//               </button>

//               {/* PROFILE */}

//               <button
//                 type="button"
//                 className="dropdown-menu-item"
//                 onClick={() =>
//                   handleNavigate(
//                     "/admin/profile"
//                   )
//                 }
//               >

//                 <span className="dropdown-menu-left">

//                   <span className="dropdown-menu-icon">
//                     <FaUser size={14} />
//                   </span>

//                   <span className="dropdown-menu-text">
//                     My Profile
//                   </span>

//                 </span>

//                 <MdKeyboardArrowRight
//                   className="dropdown-arrow"
//                   size={18}
//                 />

//               </button>

//               {/* NOTIFICATIONS */}

//               <button
//                 type="button"
//                 className="dropdown-menu-item"
//                 onClick={() =>
//                   handleNavigate(
//                     "/admin/notifications"
//                   )
//                 }
//               >

//                 <span className="dropdown-menu-left">

//                   <span className="dropdown-menu-icon">
//                     <FaRegBell size={14} />
//                   </span>

//                   <span className="dropdown-menu-text">
//                     Notifications
//                   </span>

//                 </span>

//                 <MdKeyboardArrowRight
//                   className="dropdown-arrow"
//                   size={18}
//                 />

//               </button>

//               {/* PREFERENCES */}

//               <button
//                 type="button"
//                 className="dropdown-menu-item"
//                 onClick={() =>
//                   handleNavigate(
//                     "/admin/settings"
//                   )
//                 }
//               >

//                 <span className="dropdown-menu-left">

//                   <span className="dropdown-menu-icon">
//                     <FaSlidersH size={14} />
//                   </span>

//                   <span className="dropdown-menu-text">
//                     Preferences
//                   </span>

//                 </span>

//                 <MdKeyboardArrowRight
//                   className="dropdown-arrow"
//                   size={18}
//                 />

//               </button>

//               <div className="dropdown-divider"></div>

//               {/* LOGOUT */}

//               <button
//                 type="button"
//                 className="dropdown-menu-item logout-menu-item"
//                 onClick={
//                   handleLogout
//                 }
//               >

//                 <span className="dropdown-menu-left">

//                   <span className="dropdown-menu-icon logout-icon">
//                     <MdLogout size={17} />
//                   </span>

//                   <span className="dropdown-menu-text">
//                     Logout
//                   </span>

//                 </span>

//                 <MdKeyboardArrowRight
//                   className="dropdown-arrow"
//                   size={18}
//                 />

//               </button>

//             </div>
//           )}

//         </div>

//       </div>

//     </header>
//   );
// };

// export default Header;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCog,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaRegBell,
  FaUserShield,
  FaSlidersH,
  FaCube,
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaBus,
  FaChartBar,
  FaCogs,
  FaBook,
  FaUsers,
  FaFileAlt,
  FaUniversity,
  FaSearch,
} from "react-icons/fa";
import {
  MdLogout,
  MdOutlineSettings,
  MdKeyboardArrowRight,
  MdMenu,
} from "react-icons/md";
import logo from "../assets/icon/zyntaks.png";
import axiosInstance from "../api/axiosInstance";
import "./Header.css";
/* ========================================================= SAME AS SIDEBAR LOAD ALL ICON ASSETS FROM FRONTEND ========================================================= */ const images =
  import.meta.glob("../assets/icon/*", { eager: true, import: "default" });
const imageMap = {};
Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});
 const Header =
  ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);
    const [time, setTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [sidebarModules, setSidebarModules] = useState([]);
    const [moduleLoading, setModuleLoading] = useState(false);
    const dropdownRef = useRef(null);
    const moduleDropdownRef = useRef(null);
    /* ========================================================= USER ========================================================= */ const user =
      JSON.parse(localStorage.getItem("user") || "null") || {};
    const profilePic =
      localStorage.getItem("profilePic") || "https://i.pravatar.cc/150?img=12";
    const userName =
      user?.name || user?.username || user?.firstName || "Administrator";
    const userRole = user?.role || localStorage.getItem("role") || "ADMIN";
    const schoolName =
      user?.school?.schoolName || user?.schoolName || "ZYNTaks Administration";
    const userEmail = user?.email || "admin@zyntaks.com";
    const schoolId =
      user?.schoolId || user?.school?.id || localStorage.getItem("schoolId");
    const groupId =
      user?.groupId || user?.userGroupId || localStorage.getItem("groupId");
    /* ========================================================= FALLBACK ICON Only used if asset is missing. ========================================================= */ const getModuleIcon =
      (moduleName) => {
        const name = String(moduleName || "").toLowerCase();
        if (name.includes("admission")) return FaUserPlus;
        if (name.includes("student") || name.includes("profile")) {
          return FaUserGraduate;
        }
        if (name.includes("teacher") || name.includes("staff")) {
          return FaChalkboardTeacher;
        }
        if (name.includes("attendance") || name.includes("present")) {
          return FaCalendarCheck;
        }
        if (name.includes("fee") || name.includes("payment")) {
          return FaMoneyBillWave;
        }
        if (
          name.includes("assessment") ||
          name.includes("exam") ||
          name.includes("result")
        ) {
          return FaClipboardCheck;
        }
        if (name.includes("transport") || name.includes("vehicle")) {
          return FaBus;
        }
        if (name.includes("report")) return FaChartBar;
        if (name.includes("library") || name.includes("book")) {
          return FaBook;
        }
        if (name.includes("user") || name.includes("management")) {
          return FaUsers;
        }
        if (
          name.includes("setup") ||
          name.includes("setting") ||
          name.includes("configuration")
        ) {
          return FaCogs;
        }
        if (name.includes("search")) return FaSearch;
        if (name.includes("tc") || name.includes("certificate")) {
          return FaFileAlt;
        }
        if (name.includes("school") || name.includes("organization")) {
          return FaUniversity;
        }
        return FaCube;
      };
    
    /* ========================================================= CLOCK ========================================================= */ useEffect(() => {
      const updateClock = () => {
        const now = new Date();
        setTime(
          now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        );
        const hour = now.getHours();
        if (hour < 12) {
          setGreeting("Good Morning");
        } else if (hour < 17) {
          setGreeting("Good Afternoon");
        } else if (hour < 21) {
          setGreeting("Good Evening");
        } else {
          setGreeting("Good Night");
        }
      };
      updateClock();
      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    }, []);
    /* ========================================================= LOAD MODULES SAME API AS SIDEBAR ========================================================= */ useEffect(() => {
      const loadModules = async () => {
        /* ADMIN uses separate AdminSidebar. Module dropdown is for school users. */ if (
          String(userRole).toUpperCase() === "ADMIN"
        ) {
          setSidebarModules([]);
          return;
        }
        if (!schoolId || !groupId) {
          setSidebarModules([]);
          return;
        }
        try {
          setModuleLoading(true);
          const token =
            localStorage.getItem("token") || localStorage.getItem("AdminToken");
          const res = await axiosInstance.get("/api/school-mapping/sidebar", {
            params: { schoolId, groupId },
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Header Sidebar response:", res.data);
          const sidebarData = Array.isArray(res.data) ? res.data : [];
          /* ===================================================== SAME MODULE STRUCTURE AS SIDEBAR ===================================================== */ const modules =
            sidebarData
              .map((item) => ({
                id: item.id,
                name: item.label || "Module",
                image: item.image || null,
                path: item.path || "",
                sequenceNumber: Number(item.sequenceNumber) || 0,
                subMenus: Array.isArray(item.subMenus) ? item.subMenus : [],
              }))
              .filter((item) => item.id);
          /* ===================================================== SORT BY SEQUENCE NUMBER ===================================================== */ modules.sort(
            (a, b) => a.sequenceNumber - b.sequenceNumber,
          );
          /* ===================================================== REMOVE DUPLICATE MODULE LABELS ===================================================== */ const uniqueModules =
            [];
          const moduleNames = new Set();
          modules.forEach((module) => {
            const normalizedName = String(module.name || "")
              .trim()
              .toLowerCase();
            if (!moduleNames.has(normalizedName)) {
              moduleNames.add(normalizedName);
              uniqueModules.push(module);
            }
          });
          setSidebarModules(uniqueModules);
        } catch (error) {
          console.error("Header module loading failed:", error);
          console.error("Response:", error?.response?.data);
          setSidebarModules([]);
        } finally {
          setModuleLoading(false);
        }
      };
      loadModules();
    }, [schoolId, groupId, userRole]);
    /* ========================================================= DATE ========================================================= */ const formattedDate =
      new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    /* ========================================================= OUTSIDE CLICK ========================================================= */ useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setShowDropdown(false);
        }
        if (
          moduleDropdownRef.current &&
          !moduleDropdownRef.current.contains(event.target)
        ) {
          setShowModuleDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    /* ========================================================= ESCAPE ========================================================= */ useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setShowDropdown(false);
          setShowModuleDropdown(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);
    /* ========================================================= NAVIGATION ========================================================= */ const handleNavigate =
      (path) => {
        if (!path) return;
        setShowDropdown(false);
        setShowModuleDropdown(false);
        navigate(path);
      };
    /* ========================================================= MODULE CLICK ========================================================= */ const handleModuleClick =
      (module) => {
        /* If module itself has a path, use it first. */ if (module?.path) {
          handleNavigate(module.path);
          return;
        }
        /* Most modules have path="" so open first available submenu. */ const firstSubMenu =
          Array.isArray(module?.subMenus)
            ? module.subMenus.find((subMenu) => subMenu?.path)
            : null;
        if (firstSubMenu?.path) {
          handleNavigate(firstSubMenu.path);
          return;
        }
        console.log("No navigation path available for:", module?.name);
      };
    /* ========================================================= LOGOUT ========================================================= */ const handleLogout =
      () => {
        localStorage.removeItem("token");
        localStorage.removeItem("AdminToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("schoolId");
        localStorage.removeItem("groupId");
        localStorage.removeItem("userGroupId");
        navigate("/login");
      };
    /* ========================================================= RENDER ========================================================= */ return (
      <header className="premium-header">
        {" "}
        {/* ===================================================== LEFT ===================================================== */}{" "}
        <div className="header-left-section">
          {" "}
          {/* LOGO */}{" "}
          <div className="header-logo-box" onClick={() => navigate("/")}>
            {" "}
            <img
              src={logo}
              alt="ZYNTaks Education"
              className="header-logo"
            />{" "}
          </div>{" "}
          <div className="header-divider" /> {/* SIDEBAR BUTTON */}{" "}
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {" "}
            <MdMenu size={23} />{" "}
          </button>{" "}
          {/* GREETING */}{" "}
          <div className="header-greeting">
            {" "}
            <div className="greeting-text">
              {" "}
              {greeting}, <strong>{userName}</strong>{" "}
            </div>{" "}
            <div className="greeting-date"> {formattedDate} </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ===================================================== CENTER ===================================================== */}{" "}
        <div className="header-center">
          {" "}
          <div className="school-info">
            {" "}
            <div className="school-icon">
              {" "}
              <FaUniversity size={16} />{" "}
            </div>{" "}
            <div className="school-details">
              {" "}
              <span className="school-label"> SCHOOL MANAGEMENT </span>{" "}
              <span className="school-name"> {schoolName} </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ===================================================== RIGHT ===================================================== */}{" "}
        <div className="header-right-section">
          {" "}
          {/* SEARCH */}{" "}
          <div className="header-search">
            {" "}
            <FaSearch size={12} /> <input type="text" placeholder="Search..." />{" "}
            <span className="search-shortcut"> / </span>{" "}
          </div>{" "}
          {/* TIME */}{" "}
          <div className="header-time">
            {" "}
            <div className="time-value"> {time} </div>{" "}
            <div className="time-label"> Local Time </div>{" "}
          </div>{" "}
          {/* NOTIFICATION */}{" "}
          <button
            type="button"
            className="header-action-btn"
            aria-label="Notifications"
          >
            {" "}
            <FaRegBell size={17} /> <span className="notification-dot" />{" "}
          </button>{" "}
          {/* SETTINGS */}{" "}
          <button
            type="button"
            className="header-action-btn"
            aria-label="Settings"
            onClick={() => navigate("/settings")}
          >
            {" "}
            <MdOutlineSettings size={19} />{" "}
          </button>{" "}
          {/* ================================================= MODULE BUTTON ================================================= */}{" "}
          {String(userRole).toUpperCase() !== "ADMIN" && (
            <div className="module-header-wrapper" ref={moduleDropdownRef}>
              {" "}
              <button
                type="button"
                className={`header-action-btn module-header-btn ${showModuleDropdown ? "module-btn-active" : ""}`}
                onClick={() => setShowModuleDropdown((prev) => !prev)}
                aria-label="Modules"
              >
                {" "}
                <FaCube size={17} />{" "}
                {sidebarModules.length > 0 && (
                  <span className="module-count-dot">
                    {" "}
                    {sidebarModules.length}{" "}
                  </span>
                )}{" "}
              </button>{" "}
              {/* ================================================= MODULE DROPDOWN ================================================= */}{" "}
              {showModuleDropdown && (
                <div className="module-dropdown">
                  {" "}
                  {/* HEADER */}{" "}
                  <div className="module-dropdown-header">
                    {" "}
                    <div className="module-dropdown-title-row">
                      {" "}
                      <div className="module-dropdown-main-icon">
                        {" "}
                        <FaCube size={15} />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <div className="module-dropdown-title">
                          {" "}
                          Modules{" "}
                        </div>{" "}
                        <div className="module-dropdown-subtitle">
                          {" "}
                          Available modules{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="module-total-badge">
                      {" "}
                      {sidebarModules.length}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="module-dropdown-divider" />{" "}
                  {/* ================================================= ICON GRID ================================================= */}{" "}
                  <div className="module-icon-grid">
                    {" "}
                    {moduleLoading ? (
                      <div className="module-loading">
                        {" "}
                        <div className="module-spinner" />{" "}
                        <span> Loading modules... </span>{" "}
                      </div>
                    ) : sidebarModules.length === 0 ? (
                      <div className="module-empty">
                        {" "}
                        <div className="module-empty-icon">
                          {" "}
                          <FaCube size={18} />{" "}
                        </div>{" "}
                        <div className="module-empty-title">
                          {" "}
                          No modules available{" "}
                        </div>{" "}
                      </div>
                    ) : (
                      sidebarModules.map((module, index) => {
                        const Icon = getModuleIcon(module.name);
                        // const theme = moduleColors[index % moduleColors.length];
                        const imageSrc =
                          module?.image && imageMap[module.image]
                            ? imageMap[module.image]
                            : null;
                        return (
                          <button
                            type="button"
                            key={module.id}
                            className="module-icon-item"
                            title={module.name}
                            // style={{
                            //   "--module-color": theme.color,
                            //   "--module-bg": theme.bg,
                            //   "--module-border": theme.border,
                            // }}
                            onClick={() => handleModuleClick(module)}
                          >
                            {" "}
                            {/* SHINE */} <span className="module-icon-shine" />{" "}
                            {/* ICON */}{" "}
                            <span className="module-only-icon">
                              {" "}
                              {imageSrc ? (
                                <img src={imageSrc} alt="" />
                              ) : (
                                <Icon size={21} />
                              )}{" "}
                            </span>{" "}
                            {/* GLOW */}{" "}
                            <span className="module-icon-glow" />{" "}
                          </button>
                        );
                      })
                    )}{" "}
                  </div>{" "}
                  {/* FOOTER */}{" "}
                  {sidebarModules.length > 0 && (
                    <div className="module-dropdown-footer">
                      {" "}
                      <FaCube size={10} />{" "}
                      <span> Click an icon to open module </span>{" "}
                    </div>
                  )}{" "}
                </div>
              )}{" "}
            </div>
          )}{" "}
          {/* ================================================= PROFILE ================================================= */}{" "}
          <div className="profile-wrapper" ref={dropdownRef}>
            {" "}
            <button
              type="button"
              className={`profile-trigger ${showDropdown ? "active" : ""}`}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {" "}
              <img
                src={profilePic}
                alt={userName}
                className="profile-image"
              />{" "}
              <div className="profile-info">
                {" "}
                <div className="profile-name"> {userName} </div>{" "}
                <div className="profile-role"> {userRole} </div>{" "}
              </div>{" "}
              <FaChevronDown
                size={11}
                className={`profile-chevron ${showDropdown ? "rotate" : ""}`}
              />{" "}
            </button>{" "}
            {/* ================================================= PROFILE DROPDOWN ================================================= */}{" "}
            {showDropdown && (
              <div className="profile-dropdown">
                {" "}
                <div className="dropdown-profile">
                  {" "}
                  <div className="dropdown-avatar-wrapper">
                    {" "}
                    <img
                      src={profilePic}
                      alt={userName}
                      className="dropdown-avatar"
                    />{" "}
                    <span className="online-status" />{" "}
                  </div>{" "}
                  <div className="dropdown-profile-details">
                    {" "}
                    <div className="dropdown-name"> {userName} </div>{" "}
                    <div className="dropdown-role-row">
                      {" "}
                      <span className="role-badge">
                        {" "}
                        <FaUserShield size={8} /> {userRole}{" "}
                      </span>{" "}
                    </div>{" "}
                    <div className="dropdown-email"> {userEmail} </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="dropdown-divider" />{" "}
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => handleNavigate("/profile")}
                >
                  {" "}
                  <div className="dropdown-menu-left">
                    {" "}
                    <div className="dropdown-menu-icon">
                      {" "}
                      <FaUser size={13} />{" "}
                    </div>{" "}
                    <span className="dropdown-menu-text">
                      {" "}
                      My Profile{" "}
                    </span>{" "}
                  </div>{" "}
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />{" "}
                </button>{" "}
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => handleNavigate("/settings")}
                >
                  {" "}
                  <div className="dropdown-menu-left">
                    {" "}
                    <div className="dropdown-menu-icon">
                      {" "}
                      <FaSlidersH size={13} />{" "}
                    </div>{" "}
                    <span className="dropdown-menu-text"> Settings </span>{" "}
                  </div>{" "}
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />{" "}
                </button>{" "}
                <div className="dropdown-divider" />{" "}
                <button
                  type="button"
                  className="dropdown-menu-item logout-menu-item"
                  onClick={handleLogout}
                >
                  {" "}
                  <div className="dropdown-menu-left">
                    {" "}
                    <div className="dropdown-menu-icon">
                      {" "}
                      <MdLogout size={16} />{" "}
                    </div>{" "}
                    <span className="dropdown-menu-text"> Logout </span>{" "}
                  </div>{" "}
                  <MdKeyboardArrowRight
                    size={18}
                    className="dropdown-arrow"
                  />{" "}
                </button>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </header>
    );
  };
export default Header;
