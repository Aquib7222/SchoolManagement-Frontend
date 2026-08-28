// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FaAngleDown } from "react-icons/fa";
// // import { GoArrowRight, GoDot } from "react-icons/go";
// // import { allMenuItems } from "./MenusData";

// // const images = import.meta.glob("../../assets/icon/*", {
// //   eager: true,
// //   import: "default",
// // });

// // const imageMap = {};

// // Object.keys(images).forEach((path) => {
// //   const fileName = path.split("/").pop();
// //   imageMap[fileName] = images[path];
// // });


// // import {
// //   FaUsers,
// //   FaUserGraduate,
// //   FaSchool,
// //   FaMoneyBill,
// //   FaBook,
// // } from "react-icons/fa";

// // const iconMap = {
// //   FaUsers,
// //   FaUserGraduate,
// //   FaSchool,
// //   FaMoneyBill,
// //   FaBook,
 
// // };


// // import axios from "../../api/axiosInstance";

// // const Sidebar_menu = () => {
// //   const storedUser = localStorage.getItem("role");
// //   const token = localStorage.getItem("token");
// //   const schoolId = localStorage.getItem("schoolId");
// //   const groupId = localStorage.getItem("userGroupId");
// //   const [allmenus, setAllMenus] = useState([]);
// //   const [expandedMenu, setExpandedMenu] = useState(null);
// //   const [expandedSubSubMenu, setExpandedSubSubMenu] = useState({});
// //   const [hoveredMenu, setHoveredMenu] = useState(null);
// //   const [hoveredSubmenu, setHoveredSubmenu] = useState(null);

  

// //   useEffect(() => {
   
// //     loadSidebar();
// //   }, []);

// //   const loadSidebar = async () => {
// //     try {
// //       const res = await axios.get(
// //         "api/school-mapping/sidebar",
// //         {
// //           params: {
// //             schoolId,
// //             groupId,
// //           },
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );
      

// //       setAllMenus(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

  
  

// //   // const allmenus = allMenuItems || {};
  
// //   const toggleMenu = (menuKey) => {
// //     setExpandedMenu((prev) => (prev === menuKey ? null : menuKey));
// //   };

// //   const toggleSubSubMenu = (subLabel) => {
// //     setExpandedSubSubMenu((prev) => ({
// //       ...prev,
// //       [subLabel]: !prev[subLabel],
// //     }));
// //   };


// //   const allowedItems = [...allmenus].sort(
// //   (a, b) => Number(a.sequenceNumber) - Number(b.sequenceNumber)
// // );

// //   return (
// //     <div 
// //       style={{
// //         padding: "15px 0",
// //         display: "flex",
// //         flexDirection: "column",
// //         height: "100vh",
// //         width: "100%",
// //         fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
       
// //         backgroundRepeat: "no-repeat",
// //         // backgroundColor: "#ecf1f7",
// //       }}
// //     >
// //       <ul
// //         style={{
// //           listStyle: "none",
// //           padding: 0,
// //           margin: 0,
// //           marginBottom: "20px",
          
// //         }}
// //       >
// //         {allowedItems.map((item, index) => {
// //           const Icon = iconMap[item.icon];
// //           const hasSubmenu =
// //             Array.isArray(item.subMenus) && item.subMenus.length > 0;
// //           const isExpanded = expandedMenu === item.id;
// //           const isHovered = hoveredMenu === item.id;

// //           return (
// //             <li
// //               key={item.id}
// //               style={{ marginBottom: "4px", backgroundColor: "#ffffff" }}
// //             >
// //               <div
// //                 onMouseEnter={() => setHoveredMenu(item.id)}
// //                 onMouseLeave={() => setHoveredMenu(null)}
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "space-between",
// //                   padding: "10px 20px",
// //                   cursor: "pointer",
// //                   // backgroundColor:"blue",
// //                   backgroundColor:
// //                     isExpanded || isHovered ? "#a5c0f0" : "transparent",
// //                   color: isExpanded || isHovered ? "#0b57d0" : "#333",
// //                   borderRadius: "8px",
// //                   fontWeight: 600,
// //                   userSelect: "none",
// //                   transition: "background-color 0.3s, color 0.3s",
// //                 }}
// //               >
// //                 <img
// //                       src={imageMap[item.image]}
// //                       alt={item.label}
// //                       style={{
// //                         width: 25,
// //                         height: 25,
// //                         objectFit: "contain",
// //                         marginRight: 10,
// //                       }}
// //                     />
// //                 {!hasSubmenu ? (
// //                   <Link
// //                     to={item.path}
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "10px",
// //                       textDecoration: "none",
// //                       color: "inherit",
// //                       flexGrow: 1,
// //                       padding: "5px 0",
// //                     }}
// //                   >
// //                     {/* <span style={{ fontSize: "18px" }}>{Icon && <Icon />}</span> */}
                   
// //                     <span>{item.label}</span>
// //                   </Link>
// //                 ) : (
// //                   <span
// //                     onClick={() => toggleMenu(item.id)}
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "10px",
// //                       flexGrow: 1,
// //                       userSelect: "none",
// //                       padding: "5px 0",
// //                     }}
// //                   >
// //                     {/* <span style={{ fontSize: "18px" }}>{Icon && <Icon />}</span> */}
                    
// //                     <span>{item.label}</span>
// //                   </span>
// //                 )}

// //                 {hasSubmenu && (
// //                   <span
// //                     onClick={() => toggleMenu(item.id)}
// //                     style={{
// //                       cursor: "pointer",
// //                       userSelect: "none",
// //                       fontSize: "15px",
// //                       transition: "transform 0.3s",
// //                       transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
// //                     }}
// //                     title={isExpanded ? "Collapse" : "Expand"}
// //                   >
// //                     <FaAngleDown />
// //                   </span>
// //                 )}
// //               </div>

// //               {hasSubmenu && (
// //                 <ul
// //                   style={{
// //                     listStyle: "none",
// //                     padding: 0,
// //                     margin: 0,
// //                     maxHeight: isExpanded ? "500px" : "0",
// //                     overflowY: "auto",
// //                     transition: "max-height 0.4s ease",
// //                     borderRadius: "0 0 8px 8px",
// //                   }}
// //                 >
 
// //                   {item.subMenus.map((subItem) => {
// //                     const isSubHovered = hoveredSubmenu === subItem.path;

// //                     const hasSubSub =
// //                       Array.isArray(subItem.subSubMenu) &&
// //                       subItem.subSubMenu.length > 0;

// //                     return (
// //                       <li
// //                         key={subItem.id || subItem.label}
// //                         style={{ marginBottom: "6px" }}
// //                       >
// //                         {hasSubSub ? (
// //                           <>
// //                             <div
// //                               onClick={() => toggleSubSubMenu(subItem.label)}
// //                               style={{
// //                                 display: "flex",
// //                                 justifyContent: "space-between",
// //                                 alignItems: "center",
// //                                 padding: "10px 15px 10px 30px",
// //                                 borderRadius: "6px",
// //                                 cursor: "pointer",
// //                                 color: isSubHovered ? "#0b57d0" : "#555",
// //                                 fontWeight: 400,
// //                               }}
// //                               onMouseEnter={() =>
// //                                 setHoveredSubmenu(subItem.path)
// //                               }
// //                               onMouseLeave={() => setHoveredSubmenu(null)}
// //                             >
// //                               <span>
// //                                 <GoArrowRight /> {subItem.label}
// //                               </span>

// //                               <FaAngleDown
// //                                 style={{
// //                                   transform: expandedSubSubMenu[subItem.label]
// //                                     ? "rotate(180deg)"
// //                                     : "rotate(0deg)",
// //                                   transition: "0.3s",
// //                                 }}
// //                               />
// //                             </div>

// //                             <ul
// //                               style={{
// //                                 listStyle: "none",
// //                                 paddingLeft: "45px",
// //                                 marginTop: "5px",
// //                                 display: expandedSubSubMenu[subItem.label]
// //                                   ? "block"
// //                                   : "none",
// //                               }}
// //                             >
// //                               {subItem.subSubMenu.map((subSub) => (
// //                                 <li key={subSub.id || subSub.path}>
// //                                   <Link
// //                                     to={subSub.path}
// //                                     style={{
// //                                       display: "block",
// //                                       padding: "8px 0",
// //                                       textDecoration: "none",
// //                                       color:
// //                                         hoveredSubmenu === subSub.path
// //                                           ? "#0b57d0"
// //                                           : "#555",
// //                                     }}
// //                                     onMouseEnter={() =>
// //                                       setHoveredSubmenu(subSub.path)
// //                                     }
// //                                     onMouseLeave={() => setHoveredSubmenu(null)}
// //                                   >
// //                                     <GoDot /> {subSub.label}
// //                                   </Link>
// //                                 </li>
// //                               ))}
// //                             </ul>
// //                           </>
// //                         ) : (
// //                           <Link
// //                             to={subItem.path}
// //                             style={{
// //                               display: "block",
// //                               padding: "10px 0 10px 30px",
// //                               borderRadius: "6px",
// //                               color: isSubHovered ? "#0b57d0" : "#555",
// //                               textDecoration: "none",
// //                               fontWeight: 400,
// //                             }}
// //                             onMouseEnter={() => setHoveredSubmenu(subItem.path)}
// //                             onMouseLeave={() => setHoveredSubmenu(null)}
// //                           >
// //                             <GoArrowRight /> {subItem.label}
// //                           </Link>
// //                         )}
// //                       </li>
// //                     );
// //                   })}
// //                 </ul>
// //               )}
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Sidebar_menu;


// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaAngleDown } from "react-icons/fa";
// import { GoArrowRight, GoDot } from "react-icons/go";

// import {
//   FaUsers,
//   FaUserGraduate,
//   FaSchool,
//   FaMoneyBill,
//   FaBook,
// } from "react-icons/fa";

// import axios from "../../api/axiosInstance";

// const images = import.meta.glob("../../assets/icon/*", {
//   eager: true,
//   import: "default",
// });

// const imageMap = {};

// Object.keys(images).forEach((path) => {
//   const fileName = path.split("/").pop();
//   imageMap[fileName] = images[path];
// });

// const iconMap = {
//   FaUsers,
//   FaUserGraduate,
//   FaSchool,
//   FaMoneyBill,
//   FaBook,
// };

// const Sidebar_menu = () => {
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   const schoolId = localStorage.getItem("schoolId");
//   const groupId = localStorage.getItem("userGroupId");

//   const [allmenus, setAllMenus] = useState([]);

//   const [expandedMenu, setExpandedMenu] = useState(null);

//   const [expandedSubSubMenu, setExpandedSubSubMenu] = useState({});

//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredSubmenu, setHoveredSubmenu] = useState(null);

//   const [loading, setLoading] = useState(true);

//   // ============================
//   // LOAD SIDEBAR
//   // ============================

//   useEffect(() => {
//     loadSidebar();
//   }, []);

//   const loadSidebar = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get("api/school-mapping/sidebar", {
//         params: {
//           schoolId,
//           groupId,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAllMenus(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Sidebar loading error:", err);
//       setAllMenus([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================
//   // SORT MENU
//   // ============================

//   const allowedItems = [...allmenus].sort(
//     (a, b) =>
//       Number(a.sequenceNumber || 0) -
//       Number(b.sequenceNumber || 0),
//   );

//   // ============================
//   // CHECK ACTIVE ROUTE
//   // ============================

//   const isPathActive = (path) => {
//     if (!path) return false;

//     return (
//       location.pathname === path ||
//       location.pathname.startsWith(`${path}/`)
//     );
//   };

//   const isMenuActive = (item) => {
//     if (isPathActive(item.path)) {
//       return true;
//     }

//     if (Array.isArray(item.subMenus)) {
//       return item.subMenus.some((subItem) => {
//         if (isPathActive(subItem.path)) {
//           return true;
//         }

//         if (Array.isArray(subItem.subSubMenu)) {
//           return subItem.subSubMenu.some((subSub) =>
//             isPathActive(subSub.path),
//           );
//         }

//         return false;
//       });
//     }

//     return false;
//   };

//   // ============================
//   // AUTO OPEN ACTIVE MENU
//   // ============================

//   useEffect(() => {
//     const activeParent = allowedItems.find((item) =>
//       isMenuActive(item),
//     );

//     if (activeParent) {
//       setExpandedMenu(activeParent.id);

//       const activeSub = activeParent.subMenus?.find((subItem) => {
//         if (isPathActive(subItem.path)) {
//           return true;
//         }

//         return subItem.subSubMenu?.some((subSub) =>
//           isPathActive(subSub.path),
//         );
//       });

//       if (
//         activeSub &&
//         Array.isArray(activeSub.subSubMenu) &&
//         activeSub.subSubMenu.length > 0
//       ) {
//         setExpandedSubSubMenu((prev) => ({
//           ...prev,
//           [activeSub.label]: true,
//         }));
//       }
//     }
//   }, [location.pathname, allmenus]);

//   // ============================
//   // TOGGLE MENU
//   // ============================

//   const toggleMenu = (menuKey) => {
//     setExpandedMenu((prev) =>
//       prev === menuKey ? null : menuKey,
//     );
//   };

//   // ============================
//   // TOGGLE SUB SUB MENU
//   // ============================

//   const toggleSubSubMenu = (subLabel) => {
//     setExpandedSubSubMenu((prev) => ({
//       ...prev,
//       [subLabel]: !prev[subLabel],
//     }));
//   };

//   // ============================
//   // LOADING
//   // ============================

//   if (loading) {
//     return (
//       <div className="sidebar-loading">
//         <div className="spinner-border spinner-border-sm text-primary" />
//         <span>Loading menu...</span>

//         <style>{`
//           .sidebar-loading {
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 10px;
//             color: #64748b;
//             font-size: 13px;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="premium-sidebar">
//       <div className="sidebar-menu-wrapper">
//         <ul className="sidebar-menu-list">
//           {allowedItems.map((item) => {
//             const Icon = iconMap[item.icon];

//             const hasSubmenu =
//               Array.isArray(item.subMenus) &&
//               item.subMenus.length > 0;

//             const isExpanded = expandedMenu === item.id;

//             const isHovered = hoveredMenu === item.id;

//             const menuActive = isMenuActive(item);

//             return (
//               <li
//                 key={item.id}
//                 className="sidebar-menu-item"
//               >
//                 {/* ============================
//                     MAIN MENU
//                 ============================ */}

//                 {!hasSubmenu ? (
//                   <Link
//                     to={item.path}
//                     className={`
//                       sidebar-main-link
//                       ${menuActive ? "active" : ""}
//                       ${isHovered ? "hovered" : ""}
//                     `}
//                     onMouseEnter={() =>
//                       setHoveredMenu(item.id)
//                     }
//                     onMouseLeave={() =>
//                       setHoveredMenu(null)
//                     }
//                   >
//                     <div className="sidebar-icon-box">
//                       {item.image &&
//                       imageMap[item.image] ? (
//                         <img
//                           src={imageMap[item.image]}
//                           alt={item.label}
//                           className="sidebar-menu-image"
//                         />
//                       ) : Icon ? (
//                         <Icon size={20} />
//                       ) : (
//                         <FaUsers size={18} />
//                       )}
//                     </div>

//                     <span className="sidebar-menu-label">
//                       {item.label}
//                     </span>
//                   </Link>
//                 ) : (
//                   <div
//                     className={`
//                       sidebar-main-link
//                       ${isExpanded || menuActive ? "active" : ""}
//                       ${isHovered ? "hovered" : ""}
//                     `}
//                     onMouseEnter={() =>
//                       setHoveredMenu(item.id)
//                     }
//                     onMouseLeave={() =>
//                       setHoveredMenu(null)
//                     }
//                     onClick={() => toggleMenu(item.id)}
//                   >
//                     <div className="sidebar-main-content">
//                       <div className="sidebar-icon-box">
//                         {item.image &&
//                         imageMap[item.image] ? (
//                           <img
//                             src={imageMap[item.image]}
//                             alt={item.label}
//                             className="sidebar-menu-image"
//                           />
//                         ) : Icon ? (
//                           <Icon size={20} />
//                         ) : (
//                           <FaUsers size={18} />
//                         )}
//                       </div>

//                       <span className="sidebar-menu-label">
//                         {item.label}
//                       </span>
//                     </div>

//                     <FaAngleDown
//                       className={`menu-arrow ${
//                         isExpanded ? "rotate" : ""
//                       }`}
//                     />
//                   </div>
//                 )}

//                 {/* ============================
//                     SUB MENUS
//                 ============================ */}

//                 {hasSubmenu && (
//                   <div
//                     className={`submenu-wrapper ${
//                       isExpanded ? "open" : ""
//                     }`}
//                   >
//                     <ul className="sidebar-submenu">
//                       {item.subMenus.map((subItem) => {
//                         const hasSubSub =
//                           Array.isArray(
//                             subItem.subSubMenu,
//                           ) &&
//                           subItem.subSubMenu.length > 0;

//                         const subActive =
//                           isPathActive(subItem.path) ||
//                           subItem.subSubMenu?.some(
//                             (subSub) =>
//                               isPathActive(
//                                 subSub.path,
//                               ),
//                           );

//                         const subExpanded =
//                           expandedSubSubMenu[
//                             subItem.label
//                           ];

//                         return (
//                           <li
//                             key={
//                               subItem.id ||
//                               subItem.label
//                             }
//                             className="sidebar-submenu-item"
//                           >
//                             {/* ============================
//                                 SUBMENU WITH CHILDREN
//                             ============================ */}

//                             {hasSubSub ? (
//                               <>
//                                 <div
//                                   className={`
//                                     sidebar-sub-link
//                                     ${
//                                       subActive ||
//                                       subExpanded
//                                         ? "active"
//                                         : ""
//                                     }
//                                   `}
//                                   onClick={() =>
//                                     toggleSubSubMenu(
//                                       subItem.label,
//                                     )
//                                   }
//                                   onMouseEnter={() =>
//                                     setHoveredSubmenu(
//                                       subItem.label,
//                                     )
//                                   }
//                                   onMouseLeave={() =>
//                                     setHoveredSubmenu(
//                                       null,
//                                     )
//                                   }
//                                 >
//                                   <span className="submenu-left">
//                                     <span className="submenu-arrow">
//                                       <GoArrowRight />
//                                     </span>

//                                     <span>
//                                       {subItem.label}
//                                     </span>
//                                   </span>

//                                   <FaAngleDown
//                                     className={`submenu-dropdown-arrow ${
//                                       subExpanded
//                                         ? "rotate"
//                                         : ""
//                                     }`}
//                                   />
//                                 </div>

//                                 {/* SUB-SUB MENU */}

//                                 <div
//                                   className={`subsubmenu-wrapper ${
//                                     subExpanded
//                                       ? "open"
//                                       : ""
//                                   }`}
//                                 >
//                                   <ul className="sidebar-subsubmenu">
//                                     {subItem.subSubMenu.map(
//                                       (subSub) => {
//                                         const childActive =
//                                           isPathActive(
//                                             subSub.path,
//                                           );

//                                         return (
//                                           <li
//                                             key={
//                                               subSub.id ||
//                                               subSub.path
//                                             }
//                                           >
//                                             <Link
//                                               to={
//                                                 subSub.path
//                                               }
//                                               className={`sidebar-subsubmenu-link ${
//                                                 childActive
//                                                   ? "active"
//                                                   : ""
//                                               }`}
//                                               onMouseEnter={() =>
//                                                 setHoveredSubmenu(
//                                                   subSub.path,
//                                                 )
//                                               }
//                                               onMouseLeave={() =>
//                                                 setHoveredSubmenu(
//                                                   null,
//                                                 )
//                                               }
//                                             >
//                                               <GoDot />

//                                               <span>
//                                                 {
//                                                   subSub.label
//                                                 }
//                                               </span>
//                                             </Link>
//                                           </li>
//                                         );
//                                       },
//                                     )}
//                                   </ul>
//                                 </div>
//                               </>
//                             ) : (
//                               /* ============================
//                                  NORMAL SUBMENU
//                               ============================ */

//                               <Link
//                                 to={subItem.path}
//                                 className={`sidebar-sub-link ${
//                                   subActive
//                                     ? "active"
//                                     : ""
//                                 }`}
//                                 onMouseEnter={() =>
//                                   setHoveredSubmenu(
//                                     subItem.path,
//                                   )
//                                 }
//                                 onMouseLeave={() =>
//                                   setHoveredSubmenu(
//                                     null,
//                                   )
//                                 }
//                               >
//                                 <span className="submenu-arrow">
//                                   <GoArrowRight />
//                                 </span>

//                                 <span>
//                                   {subItem.label}
//                                 </span>
//                               </Link>
//                             )}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* ============================
//           PREMIUM SIDEBAR CSS
//       ============================ */}

//       <style>{`
//         /* =========================================
//            MAIN SIDEBAR
//         ========================================= */

//         .premium-sidebar {
//           width: 100%;
//           height: 90vh;
//           background: #ffffff;
//           font-family:
//             "Segoe UI",
//             Tahoma,
//             Geneva,
//             Verdana,
//             sans-serif;
//           overflow: hidden;
//         }

//         .sidebar-menu-wrapper {
//           height: 100%;
//           overflow-y: auto;
//           overflow-x: hidden;
//           padding: 14px 10px 30px 10px;
//         }

//         /* =========================================
//            SCROLLBAR
//         ========================================= */

//         .sidebar-menu-wrapper {
//           scrollbar-width: thin;
//           scrollbar-color:
//             rgba(13, 110, 253, 0.35)
//             transparent;
//         }

//         .sidebar-menu-wrapper::-webkit-scrollbar {
//           width: 5px;
//         }

//         .sidebar-menu-wrapper::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .sidebar-menu-wrapper::-webkit-scrollbar-thumb {
//           background: rgba(13, 110, 253, 0.35);
//           border-radius: 20px;
//         }

//         .sidebar-menu-wrapper::-webkit-scrollbar-thumb:hover {
//           background: rgba(13, 110, 253, 0.7);
//         }

//         /* =========================================
//            MENU LIST
//         ========================================= */

//         .sidebar-menu-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .sidebar-menu-item {
//           list-style: none;
//           margin-bottom: 5px;
//         }

//         /* =========================================
//            MAIN MENU
//         ========================================= */

//         .sidebar-main-link {
//           min-height: 48px;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 10px;

//           padding: 8px 12px;

//           border-radius: 10px;

//           text-decoration: none;
//           color: #475569;

//           cursor: pointer;
//           user-select: none;

//           font-size: 14px;
//           font-weight: 600;

//           transition:
//             background 0.25s ease,
//             color 0.25s ease,
//             transform 0.2s ease,
//             box-shadow 0.25s ease;
//         }

//         .sidebar-main-link:hover {
//           background: rgba(13, 110, 253, 0.08);
//           color: #0d6efd;
//         }

//         .sidebar-main-link.hovered {
//           background: rgba(13, 110, 253, 0.09);
//           color: #0d6efd;
//         }

//         .sidebar-main-link.active {
//           background:
//             linear-gradient(
//               90deg,
//               rgba(13, 110, 253, 0.16),
//               rgba(13, 110, 253, 0.06)
//             );

//           color: #0b57d0;

//           box-shadow:
//             inset 3px 0 0 #0d6efd;
//         }

//         /* =========================================
//            MAIN MENU CONTENT
//         ========================================= */

//         .sidebar-main-content {
//           display: flex;
//           align-items: center;
//           gap: 11px;
//           min-width: 0;
//           flex: 1;
//         }

//         .sidebar-menu-label {
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         /* =========================================
//            ICON BOX
//         ========================================= */

//         .sidebar-icon-box {
//           width: 36px;
//           height: 36px;

//           min-width: 36px;

//           display: flex;
//           align-items: center;
//           justify-content: center;

//           border-radius: 9px;

//           background: #f1f5f9;

//           color: #64748b;

//           transition:
//             background 0.25s ease,
//             color 0.25s ease,
//             transform 0.25s ease;
//         }

//         .sidebar-main-link:hover
//         .sidebar-icon-box,
//         .sidebar-main-link.hovered
//         .sidebar-icon-box {
//           background: rgba(13, 110, 253, 0.13);
//           color: #0d6efd;
//           transform: translateX(1px);
//         }

//         .sidebar-main-link.active
//         .sidebar-icon-box {
//           background: #0d6efd;
//           color: white;
//           box-shadow:
//             0 4px 10px
//             rgba(13, 110, 253, 0.25);
//         }

//         .sidebar-menu-image {
//           width: 23px;
//           height: 23px;
//           object-fit: contain;
//         }

//         /* =========================================
//            MAIN ARROW
//         ========================================= */

//         .menu-arrow {
//           font-size: 12px;
//           color: #94a3b8;

//           transition:
//             transform 0.3s ease,
//             color 0.2s ease;
//         }

//         .sidebar-main-link.active
//         .menu-arrow {
//           color: #0d6efd;
//         }

//         .menu-arrow.rotate {
//           transform: rotate(180deg);
//         }

//         /* =========================================
//            SUBMENU WRAPPER
//         ========================================= */

//         .submenu-wrapper {
//           display: grid;
//           grid-template-rows: 0fr;

//           transition:
//             grid-template-rows 0.3s ease,
//             opacity 0.3s ease;

//           opacity: 0;
//         }

//         .submenu-wrapper.open {
//           grid-template-rows: 1fr;
//           opacity: 1;
//         }

//         .sidebar-submenu {
//           overflow: hidden;
//           list-style: none;

//           padding: 4px 0 4px 20px;
//           margin: 0 0 2px 17px;

//           border-left:
//             1px solid
//             rgba(13, 110, 253, 0.13);
//         }

//         .sidebar-submenu-item {
//           list-style: none;
//           margin: 2px 0;
//         }

//         /* =========================================
//            SUBMENU LINK
//         ========================================= */

//         .sidebar-sub-link {
//           min-height: 38px;

//           display: flex;
//           align-items: center;
//           justify-content: space-between;

//           gap: 8px;

//           padding: 7px 10px;

//           border-radius: 8px;

//           color: #64748b;
//           text-decoration: none;

//           font-size: 13px;
//           font-weight: 500;

//           cursor: pointer;

//           transition:
//             background 0.25s ease,
//             color 0.25s ease,
//             padding-left 0.25s ease;
//         }

//         .sidebar-sub-link:hover {
//           background: rgba(13, 110, 253, 0.07);
//           color: #0d6efd;
//           padding-left: 13px;
//         }

//         .sidebar-sub-link.active {
//           background: rgba(13, 110, 253, 0.11);
//           color: #0d6efd;
//           font-weight: 600;
//         }

//         .submenu-left {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .submenu-arrow {
//           display: flex;
//           align-items: center;
//           color: #94a3b8;
//           font-size: 14px;
//         }

//         .sidebar-sub-link:hover
//         .submenu-arrow,
//         .sidebar-sub-link.active
//         .submenu-arrow {
//           color: #0d6efd;
//         }

//         /* =========================================
//            SUB-SUB MENU
//         ========================================= */

//         .subsubmenu-wrapper {
//           display: grid;
//           grid-template-rows: 0fr;

//           opacity: 0;

//           transition:
//             grid-template-rows 0.3s ease,
//             opacity 0.25s ease;
//         }

//         .subsubmenu-wrapper.open {
//           grid-template-rows: 1fr;
//           opacity: 1;
//         }

//         .sidebar-subsubmenu {
//           overflow: hidden;

//           list-style: none;

//           padding: 3px 0 5px 18px;
//           margin: 0 0 0 8px;

//           border-left:
//             1px dashed
//             rgba(13, 110, 253, 0.2);
//         }

//         .sidebar-subsubmenu li {
//           list-style: none;
//         }

//         .sidebar-subsubmenu-link {
//           display: flex;
//           align-items: center;
//           gap: 8px;

//           padding: 7px 8px;

//           border-radius: 7px;

//           text-decoration: none;

//           color: #64748b;

//           font-size: 12.5px;
//           font-weight: 500;

//           transition:
//             background 0.2s ease,
//             color 0.2s ease,
//             padding-left 0.2s ease;
//         }

//         .sidebar-subsubmenu-link:hover {
//           background: rgba(13, 110, 253, 0.07);
//           color: #0d6efd;
//           padding-left: 11px;
//         }

//         .sidebar-subsubmenu-link.active {
//           background: rgba(13, 110, 253, 0.11);
//           color: #0d6efd;
//           font-weight: 600;
//         }

//         .sidebar-subsubmenu-link svg {
//           font-size: 11px;
//         }

//         /* =========================================
//            RESPONSIVE
//         ========================================= */

//         @media (max-width: 768px) {
//           .sidebar-menu-wrapper {
//             padding-left: 7px;
//             padding-right: 7px;
//           }

//           .sidebar-main-link {
//             padding: 8px 10px;
//           }

//           .sidebar-menu-label {
//             font-size: 13px;
//           }

//           .sidebar-submenu {
//             padding-left: 14px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Sidebar_menu;

import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FaAngleDown,
  FaUsers,
  FaUserGraduate,
  FaSchool,
  FaMoneyBill,
  FaBook,
} from "react-icons/fa";

import { GoArrowRight, GoDot } from "react-icons/go";

import {
  LuChevronRight,
  LuPackage,
  LuMenu,
  LuLayoutDashboard,
} from "react-icons/lu";

import axios from "../../api/axiosInstance";

/* =========================================================
   IMAGE MAPPING
========================================================= */

const images = import.meta.glob("../../assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

/* =========================================================
   FALLBACK ICONS
========================================================= */

const iconMap = {
  FaUsers,
  FaUserGraduate,
  FaSchool,
  FaMoneyBill,
  FaBook,
};

/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar_menu = () => {
  const token = localStorage.getItem("token");
  const schoolId = localStorage.getItem("schoolId");
  const groupId = localStorage.getItem("userGroupId");

  const [allmenus, setAllMenus] = useState([]);

  const [expandedMenu, setExpandedMenu] = useState(null);

  const [expandedSubMenu, setExpandedSubMenu] = useState({});

  const [hoveredMenu, setHoveredMenu] = useState(null);

  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD SIDEBAR
  ========================================================= */

  useEffect(() => {
    loadSidebar();
  }, []);

  const loadSidebar = async () => {
    try {
      setLoading(true);

      const res = await axios.get("api/school-mapping/sidebar", {
        params: {
          schoolId,
          groupId,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Sidebar response:", res.data);

      setAllMenus(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Sidebar loading failed:", error);

      setAllMenus([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SORT MODULES
     
     IMPORTANT:
     Menu-less modules are NOT removed.
     They remain according to sequenceNumber.
  ========================================================= */

  const allowedItems = useMemo(() => {
    return [...allmenus]
      .map((item, index) => ({
        ...item,
        __originalIndex: index,
      }))
      .sort((a, b) => {
        const sequenceA = Number(a.sequenceNumber);
        const sequenceB = Number(b.sequenceNumber);

        const validA = Number.isFinite(sequenceA);
        const validB = Number.isFinite(sequenceB);

        if (validA && validB) {
          return sequenceA - sequenceB;
        }

        if (validA && !validB) {
          return -1;
        }

        if (!validA && validB) {
          return 1;
        }

        return a.__originalIndex - b.__originalIndex;
      });
  }, [allmenus]);

  /* =========================================================
     MODULE TOGGLE
  ========================================================= */

  const toggleMenu = (menuId) => {
    setExpandedMenu((prev) => (prev === menuId ? null : menuId));
  };

  /* =========================================================
     SUBMENU TOGGLE
  ========================================================= */

  const toggleSubMenu = (key) => {
    setExpandedSubMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* =========================================================
     CHECK SUBMENU
  ========================================================= */

  const hasSubMenus = (item) => {
    return Array.isArray(item?.subMenus) && item.subMenus.length > 0;
  };

  const hasSubSubMenus = (item) => {
    return (
      Array.isArray(item?.subSubMenu) && item.subSubMenu.length > 0
    );
  };

  /* =========================================================
     FALLBACK ICON
  ========================================================= */

  const getFallbackIcon = (item) => {
    const Icon = iconMap[item?.icon];

    if (Icon) {
      return <Icon size={19} />;
    }

    return <LuPackage size={19} />;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <aside className="premium-school-sidebar">
        <div className="sidebar-scroll">
          <div className="sidebar-loading">
            <div className="spinner-border spinner-border-sm text-primary" />
            <span>Loading menu...</span>
          </div>
        </div>

        <SidebarStyles />
      </aside>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <aside className="premium-school-sidebar">
        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="sidebar-scroll">
          <ul className="sidebar-menu">

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <li className="dashboard-wrapper">
              <NavLink
                to="/"
                end
                className="sidebar-nav-link"
              >
                {({ isActive }) => (
                  <div
                    className={`dashboard-item ${
                      isActive ? "dashboard-active" : ""
                    }`}
                  >
                    <div className="dashboard-icon">
                      <LuLayoutDashboard size={21} />
                    </div>

                    <span>Dashboard</span>

                    {isActive && (
                      <div className="dashboard-active-dot" />
                    )}
                  </div>
                )}
              </NavLink>
            </li>

            {/* =================================================
                MODULES
            ================================================= */}

            {allowedItems.map((item, index) => {
              const moduleHasMenus = hasSubMenus(item);

              const isExpanded =
                expandedMenu === item.id;

              const isHovered =
                hoveredMenu === item.id;

              const imageSrc =
                item?.image && imageMap[item.image]
                  ? imageMap[item.image]
                  : null;

              return (
                <li
                  key={item.id || `module-${index}`}
                  className="sidebar-module"
                >
                  {/* =================================================
                      MODULE HEADER
                  ================================================= */}

                  <div
                    className={`module-header ${
                      isExpanded || isHovered
                        ? "module-header-hover"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setHoveredMenu(item.id)
                    }
                    onMouseLeave={() =>
                      setHoveredMenu(null)
                    }
                  >
                    {/* LEFT SIDE */}

                    <div
                      className="module-main"
                      onClick={() =>
                        moduleHasMenus &&
                        toggleMenu(item.id)
                      }
                    >
                      {/* ICON */}

                      <div className="module-icon">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={item.label || "Module"}
                          />
                        ) : (
                          getFallbackIcon(item)
                        )}
                      </div>

                      {/* LABEL */}

                      {moduleHasMenus ? (
                        <span className="module-label">
                          {item.label}
                        </span>
                      ) : (
                        <Link
                          to={item.path || "#"}
                          className="module-label module-link"
                          onClick={(e) => {
                            if (!item.path) {
                              e.preventDefault();
                            }
                          }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>

                    {/* =================================================
                        ARROW ONLY IF MENU EXISTS
                    ================================================= */}

                    {moduleHasMenus && (
                      <button
                        type="button"
                        className={`module-arrow ${
                          isExpanded ? "rotate" : ""
                        }`}
                        onClick={() =>
                          toggleMenu(item.id)
                        }
                        aria-label={
                          isExpanded
                            ? "Collapse menu"
                            : "Expand menu"
                        }
                      >
                        <FaAngleDown size={14} />
                      </button>
                    )}
                  </div>

                  {/* =================================================
                      MENUS
                  ================================================= */}

                  {moduleHasMenus && (
                    <div
                      className={`submenu-wrapper ${
                        isExpanded ? "submenu-open" : ""
                      }`}
                    >
                      <ul className="submenu-list">
                        {item.subMenus.map(
                          (subItem, subIndex) => {
                            const hasNested =
                              hasSubSubMenus(subItem);

                            const subKey =
                              subItem.id ||
                              subItem.path ||
                              subItem.label ||
                              `${item.id}-${subIndex}`;

                            const isSubExpanded =
                              !!expandedSubMenu[subKey];

                            const isSubHovered =
                              hoveredSubMenu === subKey;

                            return (
                              <li
                                key={subKey}
                                className="submenu-item"
                              >
                                {/* =================================================
                                    MENU WITH SUBMENU
                                ================================================= */}

                                {hasNested ? (
                                  <>
                                    <div
                                      className={`submenu-parent ${
                                        isSubHovered
                                          ? "submenu-parent-hover"
                                          : ""
                                      } ${
                                        isSubExpanded
                                          ? "submenu-parent-open"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        toggleSubMenu(
                                          subKey,
                                        )
                                      }
                                      onMouseEnter={() =>
                                        setHoveredSubMenu(
                                          subKey,
                                        )
                                      }
                                      onMouseLeave={() =>
                                        setHoveredSubMenu(
                                          null,
                                        )
                                      }
                                    >
                                      <div className="submenu-label-wrap">
                                        <span className="submenu-arrow-icon">
                                          <GoArrowRight
                                            size={15}
                                          />
                                        </span>

                                        <span>
                                          {subItem.label}
                                        </span>
                                      </div>

                                      <FaAngleDown
                                        size={12}
                                        className={
                                          isSubExpanded
                                            ? "nested-arrow rotate"
                                            : "nested-arrow"
                                        }
                                      />
                                    </div>

                                    {/* =================================================
                                        SUB-SUB MENU
                                    ================================================= */}

                                    <div
                                      className={`nested-submenu-wrapper ${
                                        isSubExpanded
                                          ? "nested-open"
                                          : ""
                                      }`}
                                    >
                                      <ul className="nested-submenu">
                                        {subItem.subSubMenu.map(
                                          (
                                            subSub,
                                            nestedIndex,
                                          ) => {
                                            const nestedKey =
                                              subSub.id ||
                                              subSub.path ||
                                              `${subKey}-${nestedIndex}`;

                                            return (
                                              <li
                                                key={
                                                  nestedKey
                                                }
                                              >
                                                <NavLink
                                                  to={
                                                    subSub.path ||
                                                    "#"
                                                  }
                                                  className="nested-link"
                                                  onMouseEnter={() =>
                                                    setHoveredSubMenu(
                                                      nestedKey,
                                                    )
                                                  }
                                                  onMouseLeave={() =>
                                                    setHoveredSubMenu(
                                                      null,
                                                    )
                                                  }
                                                >
                                                  <GoDot
                                                    size={11}
                                                  />

                                                  <span>
                                                    {
                                                      subSub.label
                                                    }
                                                  </span>
                                                </NavLink>
                                              </li>
                                            );
                                          },
                                        )}
                                      </ul>
                                    </div>
                                  </>
                                ) : (
                                  /* =================================================
                                      NORMAL MENU
                                  ================================================= */

                                  <NavLink
                                    to={
                                      subItem.path || "#"
                                    }
                                    className="submenu-link"
                                    onMouseEnter={() =>
                                      setHoveredSubMenu(
                                        subKey,
                                      )
                                    }
                                    onMouseLeave={() =>
                                      setHoveredSubMenu(
                                        null,
                                      )
                                    }
                                    onClick={(e) => {
                                      if (
                                        !subItem.path
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  >
                                    {({
                                      isActive,
                                    }) => (
                                      <>
                                        <span
                                          className={`submenu-arrow ${
                                            isActive
                                              ? "submenu-arrow-active"
                                              : ""
                                          }`}
                                        >
                                          <GoArrowRight
                                            size={15}
                                          />
                                        </span>

                                        <span
                                          className={
                                            isActive
                                              ? "submenu-text-active"
                                              : ""
                                          }
                                        >
                                          {
                                            subItem.label
                                          }
                                        </span>

                                        {isActive && (
                                          <span className="submenu-active-dot" />
                                        )}
                                      </>
                                    )}
                                  </NavLink>
                                )}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="sidebar-footer">
          <div className="school-system-card">
            <div className="system-status-icon">
              <LuPackage size={17} />
            </div>

            <div className="system-status-content">
              <div className="system-status-title">
                School Portal
              </div>

              <div className="system-status-online">
                <span></span>
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </aside>

      <SidebarStyles />
    </>
  );
};

/* =========================================================
   STYLES
========================================================= */

const SidebarStyles = () => (
  <style>{`

    /* =====================================================
       MAIN SIDEBAR
    ===================================================== */

   .premium-school-sidebar {

  width: 100%;
  height: 92vh;

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

  /* Right Side Premium Shadow */
  box-shadow:
  8px 0 24px rgba(15, 23, 42, 0.10),
  3px 0 8px rgba(15, 23, 42, 0.100);

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


    /* =====================================================
       SCROLL
    ===================================================== */

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

      scrollbar-color:
        #d8dfeb
        transparent;

    }


    /* =====================================================
       MENU
    ===================================================== */

    .sidebar-menu {

      list-style: none;

      padding: 0;
      margin: 0;

    }

    .sidebar-nav-link {

      text-decoration: none;

      color: inherit;

      display: block;

    }


    /* =====================================================
       LOADING
    ===================================================== */

    .sidebar-loading {

      min-height: 150px;

      display: flex;

      align-items: center;

      justify-content: center;

      gap: 9px;

      color: #8a94a6;

      font-size: 12px;

    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

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

      flex-shrink: 0;

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


    /* =====================================================
       MODULE
    ===================================================== */

    .sidebar-module {

      margin-top: 5px;

    }


    /* =====================================================
       MODULE HEADER
    ===================================================== */

    .module-header {

      min-height: 46px;

      padding: 6px 8px;

      border-radius: 11px;

      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 7px;

      color: #667085;

      transition:
        background .25s ease,
        color .25s ease,
        transform .25s ease;

    }

    .module-header:hover,
    .module-header-hover {

      background: #f4f7fc;

      color: #0d6efd;

      transform: translateX(2px);

    }


    /* =====================================================
       MODULE MAIN
    ===================================================== */

    .module-main {

      flex: 1;

      min-width: 0;

      display: flex;

      align-items: center;

      gap: 10px;

      cursor: pointer;

    }


    /* =====================================================
       MODULE ICON
    ===================================================== */

    .module-icon {

      width: 34px;
      height: 34px;

      min-width: 34px;

      border-radius: 9px;

      display: flex;

      align-items: center;
      justify-content: center;

      background: #f6f8fb;

      color: #7a8799;

      overflow: hidden;

      transition:
        all .25s ease;

    }

    .module-icon img {

      width: 23px;
      height: 23px;

      object-fit: contain;

      display: block;

    }

    .module-header:hover .module-icon {

      background: #eaf2ff;

      color: #0d6efd;

    }


    /* =====================================================
       MODULE LABEL
    ===================================================== */

    .module-label {

      font-size: 13.5px;

      font-weight: 600;

      color: inherit;

      white-space: nowrap;

      overflow: hidden;

      text-overflow: ellipsis;

    }

    .module-link {

      text-decoration: none;

    }

    .module-link:hover {

      color: #0d6efd;

    }


    /* =====================================================
       MODULE ARROW
    ===================================================== */

    .module-arrow {

      border: none;

      outline: none;

      background: transparent;

      width: 30px;
      height: 30px;

      display: flex;

      align-items: center;
      justify-content: center;

      border-radius: 8px;

      color: #98a2b3;

      cursor: pointer;

      transition:
        all .25s ease;

    }

    .module-arrow:hover {

      background: #eaf2ff;

      color: #0d6efd;

    }

    .module-arrow.rotate {

      transform: rotate(180deg);

      color: #0d6efd;

    }


    /* =====================================================
       SUBMENU WRAPPER
    ===================================================== */

    .submenu-wrapper {

      display: grid;

      grid-template-rows: 0fr;

      transition:
        grid-template-rows .3s ease,
        opacity .25s ease;

      opacity: 0;

    }

    .submenu-wrapper.submenu-open {

      grid-template-rows: 1fr;

      opacity: 1;

    }

    .submenu-wrapper > .submenu-list {

      min-height: 0;

      overflow: hidden;

    }


    /* =====================================================
       SUBMENU
    ===================================================== */

    .submenu-list {

      list-style: none;

      padding: 4px 0 5px 46px;

      margin: 0;

      position: relative;

    }

    /* Vertical connector */

    .submenu-list::before {

      content: "";

      position: absolute;

      left: 26px;

      top: 7px;

      bottom: 8px;

      width: 1px;

      background: #e8edf4;

    }


    /* =====================================================
       SUBMENU ITEM
    ===================================================== */

    .submenu-item {

      position: relative;

      margin-bottom: 2px;

    }


    /* =====================================================
       NORMAL SUBMENU LINK
    ===================================================== */

    .submenu-link {

      min-height: 38px;

      padding: 5px 9px;

      border-radius: 9px;

      display: flex;

      align-items: center;

      gap: 8px;

      position: relative;

      color: #7a8496;

      text-decoration: none;

      font-size: 12.5px;

      font-weight: 500;

      transition:
        background .2s ease,
        color .2s ease,
        transform .2s ease;

    }

    .submenu-link:hover {

      color: #0d6efd;

      background: #f4f7fc;

      transform: translateX(2px);

    }

    .submenu-arrow {

      width: 24px;
      height: 24px;

      border-radius: 7px;

      display: flex;

      align-items: center;
      justify-content: center;

      color: #98a2b3;

      background: #f8f9fb;

      flex-shrink: 0;

    }

    .submenu-link:hover .submenu-arrow {

      color: #0d6efd;

      background: #eaf2ff;

    }

    .submenu-arrow-active {

      color: #0d6efd;

      background: #eaf2ff;

    }

    .submenu-text-active {

      color: #0d6efd;

      font-weight: 650;

    }

    .submenu-active-dot {

      width: 5px;
      height: 5px;

      border-radius: 50%;

      background: #0d6efd;

      margin-left: auto;

      margin-right: 4px;

      box-shadow:
        0 0 0 3px rgba(13,110,253,.1);

    }


    /* =====================================================
       SUBMENU WITH NESTED MENU
    ===================================================== */

    .submenu-parent {

      min-height: 38px;

      padding: 5px 9px;

      border-radius: 9px;

      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 8px;

      cursor: pointer;

      color: #7a8496;

      font-size: 12.5px;

      font-weight: 500;

      transition:
        background .2s ease,
        color .2s ease,
        transform .2s ease;

    }

    .submenu-parent:hover,
    .submenu-parent-hover {

      color: #0d6efd;

      background: #f4f7fc;

      transform: translateX(2px);

    }

    .submenu-parent-open {

      color: #0d6efd;

      background: #f4f7fc;

    }

    .submenu-label-wrap {

      display: flex;

      align-items: center;

      gap: 8px;

      min-width: 0;

    }

    .submenu-arrow-icon {

      width: 24px;
      height: 24px;

      border-radius: 7px;

      display: flex;

      align-items: center;
      justify-content: center;

      color: #98a2b3;

      background: #f8f9fb;

      flex-shrink: 0;

    }

    .submenu-parent:hover
    .submenu-arrow-icon {

      color: #0d6efd;

      background: #eaf2ff;

    }

    .nested-arrow {

      color: #98a2b3;

      transition:
        transform .25s ease,
        color .25s ease;

      flex-shrink: 0;

    }

    .nested-arrow.rotate {

      transform: rotate(180deg);

      color: #0d6efd;

    }


    /* =====================================================
       NESTED SUBMENU
    ===================================================== */

    .nested-submenu-wrapper {

      display: grid;

      grid-template-rows: 0fr;

      opacity: 0;

      transition:
        grid-template-rows .3s ease,
        opacity .25s ease;

    }

    .nested-submenu-wrapper.nested-open {

      grid-template-rows: 1fr;

      opacity: 1;

    }

    .nested-submenu {

      min-height: 0;

      overflow: hidden;

      list-style: none;

      padding: 2px 0 3px 32px;

      margin: 0;

      position: relative;

    }

    .nested-submenu::before {

      content: "";

      position: absolute;

      left: 20px;

      top: 4px;

      bottom: 6px;

      width: 1px;

      background: #edf0f5;

    }

    .nested-link {

      min-height: 34px;

      display: flex;

      align-items: center;

      gap: 7px;

      padding: 5px 7px;

      border-radius: 8px;

      text-decoration: none;

      color: #8a94a6;

      font-size: 11.5px;

      font-weight: 500;

      transition:
        background .2s ease,
        color .2s ease,
        transform .2s ease;

    }

    .nested-link:hover {

      color: #0d6efd;

      background: #f4f7fc;

      transform: translateX(2px);

    }

    .nested-link.active {

      color: #0d6efd;

      font-weight: 650;

      background: #eaf2ff;

    }


    /* =====================================================
       FOOTER
    ===================================================== */

    .sidebar-footer {

      padding: 10px 14px 15px;

      border-top: 1px solid #edf0f5;

      background:
        rgba(255,255,255,.88);

    }

    .school-system-card {

      display: flex;

      align-items: center;

      gap: 10px;

      padding: 10px;

      border-radius: 12px;

      background: #f7f9fc;

      border: 1px solid #edf0f5;

    }

    .system-status-icon {

      width: 34px;
      height: 34px;

      border-radius: 9px;

      display: flex;

      align-items: center;
      justify-content: center;

      background: #eaf2ff;

      color: #0d6efd;

      flex-shrink: 0;

    }

    .system-status-content {

      min-width: 0;

    }

    .system-status-title {

      font-size: 11px;

      font-weight: 700;

      color: #4c5668;

    }

    .system-status-online {

      margin-top: 3px;

      display: flex;

      align-items: center;

      gap: 5px;

      font-size: 9px;

      color: #8a94a6;

      white-space: nowrap;

    }

    .system-status-online span {

      width: 6px;
      height: 6px;

      border-radius: 50%;

      background: #20c997;

      box-shadow:
        0 0 0 3px rgba(32,201,151,.12);

    }


    /* =====================================================
       RESPONSIVE
    ===================================================== */

    @media (max-width: 768px) {

      .sidebar-scroll {

        padding-left: 9px;

        padding-right: 9px;

      }

      .module-label {

        font-size: 13px;

      }

      .submenu-list {

        padding-left: 43px;

      }

    }

  `}</style>
);

export default Sidebar_menu;