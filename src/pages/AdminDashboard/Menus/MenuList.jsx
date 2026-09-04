// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuList,
//   LuEye,
//   LuPencil,
//   LuTrash2,
//   LuSearch,
//   LuChevronLeft,
//   LuChevronRight,
//   LuChevronDown,
//   LuChevronRight as LuExpandRight,
//   LuMenu,
// } from "react-icons/lu";
// import { FaArrowLeft } from "react-icons/fa";
// import axiosInstance from "../../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// // =====================================================
// // MODULE ICONS
// // =====================================================

// const images = import.meta.glob("/src/assets/icon/*", {
//   eager: true,
//   import: "default",
// });

// const imageMap = {};

// Object.keys(images).forEach((path) => {
//   const fileName = path.split("/").pop();
//   imageMap[fileName] = images[path];
// });

// // =====================================================
// // COMPONENT
// // =====================================================

// const MenuList = () => {
//   const navigate = useNavigate();
//   const [menus, setMenus] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [modules, setModules] = useState([]);

//   const [search, setSearch] = useState("");

//   const [moduleFilter, setModuleFilter] = useState("ALL");

//   const [statusFilter, setStatusFilter] = useState("ALL");

//   const [currentPage, setCurrentPage] = useState(1);

//   const [itemsPerPage, setItemsPerPage] = useState(20);

//   // Stores expanded module IDs
//   const [expandedModules, setExpandedModules] = useState({});

//   // =====================================================
//   // FETCH MENUS
//   // =====================================================

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const [menuRes, moduleRes] = await Promise.all([
//         axiosInstance.get("/api/menu/all"),
//         axiosInstance.get("/api/module/all"),
//       ]);

//       const menuData = Array.isArray(menuRes.data)
//         ? menuRes.data
//         : menuRes.data?.data || menuRes.data?.content || [];

//       const moduleData = Array.isArray(moduleRes.data)
//         ? moduleRes.data
//         : moduleRes.data?.data || moduleRes.data?.content || [];

//       setMenus(menuData);
//       setModules(moduleData);

//       console.log("ALL MODULES:", moduleData);
//       console.log("ALL MENUS:", menuData);
//     } catch (err) {
//       console.error("Error fetching module/menu:", err);
//       setMenus([]);
//       setModules([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // =====================================================
//   // STATUS
//   // =====================================================

//   const isActive = (menu) => {
//     if (typeof menu?.status === "boolean") {
//       return menu.status;
//     }

//     if (typeof menu?.status === "string") {
//       const status = menu.status.toUpperCase();

//       return status === "ACTIVE" || status === "TRUE" || status === "ENABLED";
//     }

//     return true;
//   };

//   // =====================================================
//   // GET MODULE
//   // =====================================================

//   const getModule = (menu) => {
//     return menu?.module || {};
//   };

//   // =====================================================
//   // GET MENU TYPE
//   // =====================================================

//   const getMenuType = (menu) => {
//     if (
//       menu?.hasSubMenu === true ||
//       (Array.isArray(menu?.subMenus) && menu.subMenus.length > 0)
//     ) {
//       return "MAIN";
//     }

//     return "MAIN";
//   };

//   const buildMenuTree = (menuList) => {
//     if (!Array.isArray(menuList)) return [];

//     return menuList.map((menu) => ({
//       ...menu,
//       children: Array.isArray(menu.subMenus) ? menu.subMenus : [],
//     }));
//   };

//   // =====================================================
//   // GET PARENT ID
//   // =====================================================

//   const getParentId = (menu) => {
//     return (
//       menu?.parentMenuId ||
//       menu?.parentId ||
//       menu?.parentMenu?.id ||
//       menu?.parent?.id ||
//       null
//     );
//   };

//   // =====================================================
//   // GET MENU ID
//   // =====================================================

//   const getMenuId = (menu) => {
//     return menu?.id || menu?.menuId;
//   };

//   // =====================================================
//   // GET MENU NAME
//   // =====================================================

//   const getMenuName = (menu) => {
//     return menu?.menuName || menu?.name || menu?.label || "-";
//   };

//   const getSubMenuName = (subMenu) => {
//     return subMenu?.subMenuName || subMenu?.name || subMenu?.label || "-";
//   };

//   const getSubMenuRoute = (subMenu) => {
//     return (
//       subMenu?.subMenuUrl ||
//       subMenu?.route ||
//       subMenu?.routeUrl ||
//       subMenu?.url ||
//       subMenu?.path ||
//       "-"
//     );
//   };

//   const getSubMenuCode = (subMenu) => {
//     return subMenu?.subMenuCode || subMenu?.code || "-";
//   };

//   // =====================================================
//   // GET MENU CODE
//   // =====================================================

//   const getMenuCode = (menu) => {
//     return menu?.menuCode || menu?.code || "-";
//   };
//   console.log("getMenuCode", getMenuCode);

//   // =====================================================
//   // GET ROUTE
//   // =====================================================

//   const getRoute = (menu) => {
//     return (
//       menu?.menuUrl ||
//       menu?.route ||
//       menu?.routeUrl ||
//       menu?.url ||
//       menu?.path ||
//       "-"
//     );
//   };
//   // =====================================================
//   // FORMAT DATE
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     try {
//       return new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return "-";
//     }
//   };

//   // =====================================================
//   // MODULE LIST
//   // =====================================================

//   const moduleList = useMemo(() => {
//     return modules.map((module) => ({
//       id: module.id || module.moduleId,
//       name: module.moduleName || module.name || "Unknown Module",
//       code: module.moduleCode || module.code || "",
//       image: module.image,
//     }));
//   }, [modules]);

//   // =====================================================
//   // FILTER MENUS
//   // =====================================================

//   const filteredMenus = useMemo(() => {
//     return menus.filter((menu) => {
//       const module = getModule(menu);

//       const menuName = getMenuName(menu).toLowerCase();

//       const menuCode = getMenuCode(menu).toLowerCase();

//       const moduleName = (
//         module?.moduleName ||
//         module?.name ||
//         menu?.moduleName ||
//         ""
//       ).toLowerCase();

//       const moduleId = module?.id || module?.moduleId || menu?.moduleId;

//       const matchesSearch =
//         menuName.includes(search.toLowerCase()) ||
//         menuCode.includes(search.toLowerCase()) ||
//         moduleName.includes(search.toLowerCase());

//       const matchesModule =
//         moduleFilter === "ALL" || String(moduleId) === String(moduleFilter);

//       const active = isActive(menu);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         (statusFilter === "ACTIVE" && active) ||
//         (statusFilter === "INACTIVE" && !active);

//       return matchesSearch && matchesModule && matchesStatus;
//     });
//   }, [menus, search, moduleFilter, statusFilter]);

//   // =====================================================
//   // CREATE MODULE TREE
//   // =====================================================

//   const moduleGroups = useMemo(() => {
//     return modules
//       .map((module) => {
//         const moduleId = module?.id || module?.moduleId;

//         const moduleMenus = filteredMenus.filter((menu) => {
//           const menuModule = getModule(menu);

//           const menuModuleId =
//             menuModule?.id || menuModule?.moduleId || menu?.moduleId;

//           return String(menuModuleId) === String(moduleId);
//         });

//         return {
//           module,
//           moduleId,
//           menus: moduleMenus,
//         };
//       })
//       .filter((group) => {
//         // Search/filter ke time module hide karna hai
//         // jab usme matching menu/module na ho

//         const module = group.module || {};

//         const moduleName = (
//           module?.moduleName ||
//           module?.name ||
//           ""
//         ).toLowerCase();

//         const moduleCode = (
//           module?.moduleCode ||
//           module?.code ||
//           ""
//         ).toLowerCase();

//         const searchText = search.toLowerCase();

//         const moduleMatchesSearch =
//           !searchText ||
//           moduleName.includes(searchText) ||
//           moduleCode.includes(searchText) ||
//           group.menus.some((menu) => {
//             return (
//               getMenuName(menu).toLowerCase().includes(searchText) ||
//               getMenuCode(menu).toLowerCase().includes(searchText)
//             );
//           });

//         return moduleMatchesSearch;
//       });
//   }, [modules, filteredMenus, search]);

//   // =====================================================
//   // BUILD HIERARCHY
//   // =====================================================

//   // =====================================================
//   // PAGINATION
//   // =====================================================

//   const totalPages = Math.ceil(moduleGroups.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentGroups = moduleGroups.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   console.log("moduleGroups", moduleGroups);

//   // =====================================================
//   // PAGE CHANGE
//   // =====================================================

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // =====================================================
//   // SEARCH
//   // =====================================================

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   // =====================================================
//   // EXPAND / COLLAPSE
//   // =====================================================

//   const toggleModule = (moduleId) => {
//     setExpandedModules((prev) => ({
//       ...prev,
//       [moduleId]: !prev[moduleId],
//     }));
//   };

//   const expandAll = () => {
//     const state = {};

//     moduleGroups.forEach((group) => {
//       state[group.moduleId] = true;
//     });

//     setExpandedModules(state);
//   };

//   const collapseAll = () => {
//     setExpandedModules({});
//   };

//   // =====================================================
//   // ACTIONS
//   // =====================================================

//   const handleView = (menu) => {
//     console.log("View menu:", menu);
//   };

//   const handleEdit = (menu) => {
//     navigate(`/admin/menus/edit/${menu.id}`);
//   };

//   const handleDelete = (menu) => {
//     console.log("Delete menu:", menu);
//   };

//   // =====================================================
//   // MODULE IMAGE
//   // =====================================================

//   const getModuleImage = (module) => {
//     const imageName = module?.image;

//     if (!imageName) {
//       return null;
//     }

//     return imageMap[imageName] || null;
//   };

//   // =====================================================
//   // RENDER ACTION BUTTONS
//   // =====================================================

//   const ActionButtons = ({ menu }) => {
//     return (
//       <div className="d-flex justify-content-center gap-2">
//         {/* VIEW */}
//         <button
//           type="button"
//           className="border-0 d-flex align-items-center justify-content-center"
//           title="View"
//           onClick={() => handleView(menu)}
//           style={{
//             width: "29px",
//             height: "29px",
//             borderRadius: "6px",
//             background: "#f1edff",
//             color: "#6f2cff",
//           }}
//         >
//           <LuEye size={14} />
//         </button>

//         {/* EDIT */}
//         <button
//           type="button"
//           className="border-0 d-flex align-items-center justify-content-center"
//           title="Edit"
//           onClick={() => handleEdit(menu)}
//           style={{
//             width: "29px",
//             height: "29px",
//             borderRadius: "6px",
//             background: "#eaf3ff",
//             color: "#2878e8",
//           }}
//         >
//           <LuPencil size={14} />
//         </button>

//         {/* DELETE */}
//         <button
//           type="button"
//           className="border-0 d-flex align-items-center justify-content-center"
//           title="Delete"
//           onClick={() => handleDelete(menu)}
//           style={{
//             width: "29px",
//             height: "29px",
//             borderRadius: "6px",
//             background: "#fff0f0",
//             color: "#ef4444",
//           }}
//         >
//           <LuTrash2 size={14} />
//         </button>
//       </div>
//     );
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <>
//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{
//             minHeight: "70px",
//           }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">Menu List</h4>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-dark">
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">Menu Management</li>

//                   <li className="breadcrumb-item active text-primary">
//                     Menu List
//                   </li>
//                 </ol>
//               </nav>
//             </div>

//             <button
//               type="button"
//               className="btn btn-outline-primary"
//               onClick={() => window.history.back()}
//             >
//               <FaArrowLeft className="me-2" />
//               Back to Menu
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAIN CARD
//       ===================================================== */}

//       <div className="container-fluid mt-4 mb-4">
//         <div
//           className="card border-0 shadow"
//           style={{
//             borderRadius: "8px",
//           }}
//         >
//           {/* =================================================
//               CARD HEADER
//           ================================================= */}

//           <div
//             className="card-header bg-white border-0"
//             style={{
//               padding: "16px 18px",
//             }}
//           >
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//               {/* TITLE */}

//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     background: "#f0eaff",
//                   }}
//                 >
//                   <LuList
//                     size={17}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-bold">Menu List</h6>

//                   <small className="text-muted">
//                     Manage modules, menus and submenus
//                   </small>
//                 </div>
//               </div>

//               {/* FILTERS */}

//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 {/* MODULE FILTER */}

//                 <select
//                   className="form-select form-select-sm"
//                   value={moduleFilter}
//                   onChange={(e) => {
//                     setModuleFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     width: "145px",
//                     height: "36px",
//                     fontSize: "12px",
//                   }}
//                 >
//                   <option value="ALL">All Modules</option>

//                   {moduleList.map((module) => (
//                     <option key={module.id} value={module.id}>
//                       {module.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* STATUS */}

//                 <select
//                   className="form-select form-select-sm"
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     width: "125px",
//                     height: "36px",
//                     fontSize: "12px",
//                   }}
//                 >
//                   <option value="ALL">All Status</option>

//                   <option value="ACTIVE">Active</option>

//                   <option value="INACTIVE">Inactive</option>
//                 </select>

//                 {/* SEARCH */}

//                 <div
//                   className="position-relative"
//                   style={{
//                     width: "220px",
//                   }}
//                 >
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search menu..."
//                     value={search}
//                     onChange={handleSearch}
//                     style={{
//                       paddingRight: "38px",
//                       fontSize: "13px",
//                       height: "36px",
//                     }}
//                   />

//                   <LuSearch
//                     size={17}
//                     className="position-absolute text-muted"
//                     style={{
//                       right: "12px",
//                       top: "9px",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* EXPAND COLLAPSE */}

//             {!loading && moduleGroups.length > 0 && (
//               <div className="d-flex justify-content-end gap-2 mt-3">
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light"
//                   onClick={expandAll}
//                   style={{
//                     fontSize: "11px",
//                   }}
//                 >
//                   Expand All
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light"
//                   onClick={collapseAll}
//                   style={{
//                     fontSize: "11px",
//                   }}
//                 >
//                   Collapse All
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "1050px",
//                 }}
//               >
//                 <thead>
//                   <tr
//                     style={{
//                       background: "#fafbff",
//                       borderTop: "1px solid #f0f0f0",
//                       borderBottom: "1px solid #eeeeee",
//                     }}
//                   >
//                     <th
//                       className="text-center"
//                       style={{
//                         width: "5%",
//                         fontSize: "12px",
//                         color: "#555",
//                         padding: "13px 10px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       style={{
//                         width: "23%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Menu Name
//                     </th>

//                     <th
//                       style={{
//                         width: "14%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Module
//                     </th>

//                     <th
//                       style={{
//                         width: "10%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Type
//                     </th>

//                     <th
//                       style={{
//                         width: "18%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Route
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "8%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Order
//                     </th>

//                     <th
//                       style={{
//                         width: "10%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "12%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {/* LOADING */}

//                   {loading && (
//                     <tr>
//                       <td colSpan="8" className="text-center py-5">
//                         <div
//                           className="spinner-border text-primary"
//                           style={{
//                             width: "25px",
//                             height: "25px",
//                           }}
//                         />

//                         <div
//                           className="text-muted mt-2"
//                           style={{
//                             fontSize: "13px",
//                           }}
//                         >
//                           Loading menus...
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* EMPTY */}

//                   {!loading && currentGroups.length === 0 && (
//                     <tr>
//                       <td colSpan="8" className="text-center py-5">
//                         <LuMenu size={35} className="text-muted mb-2" />

//                         <div className="fw-semibold">No menus found</div>

//                         <small className="text-muted">
//                           Try changing your search or filters.
//                         </small>
//                       </td>
//                     </tr>
//                   )}

//                   {/* =================================================
//                       MODULE GROUPS
//                   ================================================= */}

//                   {!loading &&
//                     currentGroups.map((group, groupIndex) => {
//                       const module = group.module || {};

//                       console.log("module data", module);

//                       const moduleId = group.moduleId;

//                       const moduleName = module?.moduleName;

//                       const moduleCode =
//                         module?.moduleCode ||
//                         module?.code ||
//                         group?.menus?.[0]?.moduleCode ||
//                         "-";

//                       const moduleImage = getModuleImage(module);

//                       const menuTree = buildMenuTree(group.menus);

//                       const isExpanded = expandedModules[moduleId] ?? true;

//                       const totalMenus = group.menus.length;

//                       const moduleActive = isActive(module);

//                       return (
//                         <React.Fragment key={moduleId}>
//                           {/* =================================================
//                                 MODULE ROW
//                             ================================================= */}

//                           <tr
//                             style={{
//                               background: "#fcfbff",
//                               borderBottom: "1px solid #eeeeee",
//                             }}
//                           >
//                             {/* NUMBER */}

//                             <td className="text-center">
//                               <span
//                                 style={{
//                                   fontSize: "12px",
//                                   fontWeight: "600",
//                                   color: "#555",
//                                 }}
//                               >
//                                 {startIndex + groupIndex + 1}.
//                               </span>
//                             </td>

//                             {/* MODULE NAME */}

//                             <td>
//                               <div className="d-flex align-items-center">
//                                 {/* EXPAND */}

//                                 <button
//                                   type="button"
//                                   className="border-0 bg-transparent p-0 me-2 d-flex align-items-center justify-content-center"
//                                   onClick={() => toggleModule(moduleId)}
//                                   style={{
//                                     width: "20px",
//                                     height: "20px",
//                                   }}
//                                 >
//                                   {isExpanded ? (
//                                     <LuChevronDown size={15} color="#666" />
//                                   ) : (
//                                     <LuExpandRight size={15} color="#666" />
//                                   )}
//                                 </button>

//                                 {/* ICON */}

//                                 <span
//                                   className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
//                                   style={{
//                                     width: "38px",
//                                     height: "38px",
//                                     background: "#f1edff",
//                                   }}
//                                 >
//                                   {moduleImage ? (
//                                     <img
//                                       src={moduleImage}
//                                       alt={moduleName}
//                                       style={{
//                                         width: "23px",
//                                         height: "23px",
//                                         objectFit: "contain",
//                                       }}
//                                     />
//                                   ) : (
//                                     <LuBox size={19} color="#6f2cff" />
//                                   )}
//                                 </span>

//                                 <div>
//                                   <div
//                                     className="fw-semibold"
//                                     style={{
//                                       fontSize: "13px",
//                                     }}
//                                   >
//                                     {moduleName}
//                                   </div>

//                                   <small
//                                     className="text-muted"
//                                     style={{
//                                       fontSize: "10px",
//                                     }}
//                                   >
//                                     {totalMenus}{" "}
//                                     {totalMenus === 1 ? "menu" : "menus"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </td>

//                             {/* MODULE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background: "#f1edff",
//                                   color: "#6f2cff",
//                                   fontSize: "10px",
//                                   fontWeight: "600",
//                                 }}
//                               >
//                                 {moduleCode}
//                               </span>
//                             </td>

//                             {/* TYPE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background: "#f3e8ff",
//                                   color: "#7e22ce",
//                                   fontSize: "10px",
//                                   fontWeight: "600",
//                                 }}
//                               >
//                                 Module
//                               </span>
//                             </td>

//                             {/* ROUTE */}

//                             <td>
//                               <span
//                                 style={{
//                                   fontSize: "11px",
//                                   color: "#777",
//                                 }}
//                               >
//                                 -
//                               </span>
//                             </td>

//                             {/* ORDER */}

//                             <td className="text-center">
//                               <span
//                                 style={{
//                                   fontSize: "11px",
//                                   color: "#555",
//                                 }}
//                               >
//                                 -
//                               </span>
//                             </td>

//                             {/* STATUS */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background: moduleActive
//                                     ? "#dcfce7"
//                                     : "#fee2e2",
//                                   color: moduleActive ? "#16a34a" : "#dc2626",
//                                   fontSize: "10px",
//                                   fontWeight: "600",
//                                 }}
//                               >
//                                 {moduleActive ? "Active" : "Inactive"}
//                               </span>
//                             </td>

//                             {/* ACTION */}

//                             <td className="text-center">
//                               <div
//                                 style={{
//                                   opacity: 0.6,
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     fontSize: "10px",
//                                     color: "#999",
//                                   }}
//                                 >
//                                   Module
//                                 </span>
//                               </div>
//                             </td>
//                           </tr>

//                           {/* =================================================
//                                 MENU + SUBMENU
//                             ================================================= */}

//                           {isExpanded &&
//                             menuTree.map((mainMenu, menuIndex) => {
//                               const mainActive = isActive(mainMenu);

//                               return (
//                                 <React.Fragment
//                                   key={getMenuId(mainMenu) || menuIndex}
//                                 >
//                                   {/* MAIN MENU */}

//                                   <tr
//                                     style={{
//                                       borderBottom: "1px solid #f4f4f4",
//                                     }}
//                                   >
//                                     <td></td>

//                                     <td>
//                                       <div
//                                         className="d-flex align-items-center"
//                                         style={{
//                                           paddingLeft: "32px",
//                                         }}
//                                       >
//                                         {/* TREE LINE */}

//                                         <div
//                                           style={{
//                                             width: "18px",
//                                             height: "30px",
//                                             borderLeft: "1px solid #d9d9d9",
//                                             borderBottom: "1px solid #d9d9d9",
//                                             borderBottomLeftRadius: "5px",
//                                             marginRight: "10px",
//                                             marginTop: "-15px",
//                                           }}
//                                         />

//                                         <div>
//                                           <div
//                                             className="fw-semibold"
//                                             style={{
//                                               fontSize: "12px",
//                                               color: "#333",
//                                             }}
//                                           >
//                                             {getMenuName(mainMenu)}
//                                           </div>

//                                           <small
//                                             className="text-muted"
//                                             style={{
//                                               fontSize: "10px",
//                                             }}
//                                           >
//                                             {getMenuCode(mainMenu)}
//                                           </small>
//                                         </div>
//                                       </div>
//                                     </td>

//                                     {/* MODULE */}

//                                     <td>
//                                       <span
//                                         className="px-2 py-1 rounded-2"
//                                         style={{
//                                           background: "#f1edff",
//                                           color: "#6f2cff",
//                                           fontSize: "9px",
//                                           fontWeight: "600",
//                                         }}
//                                       >
//                                         {moduleCode}
//                                       </span>
//                                     </td>

//                                     {/* TYPE */}

//                                     <td>
//                                       <span
//                                         className="px-2 py-1 rounded-2"
//                                         style={{
//                                           background: "#f3e8ff",
//                                           color: "#7e22ce",
//                                           fontSize: "9px",
//                                           fontWeight: "600",
//                                         }}
//                                       >
//                                         Main
//                                       </span>
//                                     </td>

//                                     {/* ROUTE */}

//                                     <td>
//                                       <span
//                                         style={{
//                                           fontSize: "11px",
//                                           color: "#666",
//                                         }}
//                                       >
//                                         {getRoute(mainMenu)}
//                                       </span>
//                                     </td>

//                                     {/* ORDER */}

//                                     <td className="text-center">
//                                       <span
//                                         style={{
//                                           fontSize: "11px",
//                                           color: "#555",
//                                         }}
//                                       >
//                                         {mainMenu?.displayOrder ??
//                                           mainMenu?.order ??
//                                           menuIndex + 1}
//                                       </span>
//                                     </td>

//                                     {/* STATUS */}

//                                     <td>
//                                       <span
//                                         className="px-2 py-1 rounded-2"
//                                         style={{
//                                           background: mainActive
//                                             ? "#dcfce7"
//                                             : "#fee2e2",
//                                           color: mainActive
//                                             ? "#16a34a"
//                                             : "#dc2626",
//                                           fontSize: "9px",
//                                           fontWeight: "600",
//                                         }}
//                                       >
//                                         {mainActive ? "Active" : "Inactive"}
//                                       </span>
//                                     </td>

//                                     {/* ACTION */}

//                                     <td>
//                                       <ActionButtons menu={mainMenu} />
//                                     </td>
//                                   </tr>

//                                   {/* =================================================
//                                           SUBMENUS
//                                       ================================================= */}

//                                   {Array.isArray(mainMenu.subMenus) &&
//                                     mainMenu.subMenus.length > 0 &&
//                                     mainMenu.subMenus.map(
//                                       (subMenu, subIndex) => {
//                                         return (
//                                           <tr
//                                             key={
//                                               subMenu?.id ||
//                                               `${getMenuId(mainMenu)}-${subIndex}`
//                                             }
//                                             style={{
//                                               borderBottom: "1px solid #f7f7f7",
//                                               background: "#fff",
//                                             }}
//                                           >
//                                             {/* NUMBER */}
//                                             <td></td>

//                                             {/* SUBMENU NAME */}
//                                             <td>
//                                               <div
//                                                 className="d-flex align-items-center"
//                                                 style={{
//                                                   paddingLeft: "67px",
//                                                 }}
//                                               >
//                                                 {/* TREE LINE */}
//                                                 <div
//                                                   style={{
//                                                     position: "relative",
//                                                     width: "28px",
//                                                     height: "28px",
//                                                     marginRight: "8px",
//                                                     flexShrink: 0,
//                                                   }}
//                                                 >
//                                                   <div
//                                                     style={{
//                                                       position: "absolute",
//                                                       left: "0",
//                                                       top: "-14px",
//                                                       width: "18px",
//                                                       height: "27px",
//                                                       borderLeft:
//                                                         "1px solid #d9d9d9",
//                                                       borderBottom:
//                                                         "1px solid #d9d9d9",
//                                                       borderBottomLeftRadius:
//                                                         "5px",
//                                                     }}
//                                                   />

//                                                   <div
//                                                     style={{
//                                                       position: "absolute",
//                                                       left: "14px",
//                                                       top: "13px",
//                                                       width: "5px",
//                                                       height: "5px",
//                                                       borderRadius: "50%",
//                                                       background: "#6f2cff",
//                                                     }}
//                                                   />
//                                                 </div>

//                                                 {/* SUBMENU NAME */}
//                                                 <div>
//                                                   <div
//                                                     style={{
//                                                       fontSize: "12px",
//                                                       fontWeight: "500",
//                                                       color: "#444",
//                                                     }}
//                                                   >
//                                                     {getSubMenuName(subMenu)}
//                                                   </div>

//                                                   <small
//                                                     className="text-muted"
//                                                     style={{
//                                                       fontSize: "9px",
//                                                     }}
//                                                   >
//                                                     {getSubMenuCode(subMenu)}
//                                                   </small>
//                                                 </div>
//                                               </div>
//                                             </td>

//                                             {/* MODULE */}
//                                             <td>
//                                               <span
//                                                 className="px-2 py-1 rounded-2"
//                                                 style={{
//                                                   background: "#f1edff",
//                                                   color: "#6f2cff",
//                                                   fontSize: "9px",
//                                                   fontWeight: "600",
//                                                 }}
//                                               >
//                                                 {moduleCode}
//                                               </span>
//                                             </td>

//                                             {/* TYPE */}
//                                             <td>
//                                               <span
//                                                 className="px-2 py-1 rounded-2"
//                                                 style={{
//                                                   background: "#f3e8ff",
//                                                   color: "#7e22ce",
//                                                   fontSize: "9px",
//                                                   fontWeight: "600",
//                                                 }}
//                                               >
//                                                 Sub
//                                               </span>
//                                             </td>

//                                             {/* PATH */}
//                                             <td>
//                                               <span
//                                                 style={{
//                                                   fontSize: "11px",
//                                                   color: "#666",
//                                                 }}
//                                               >
//                                                 {getSubMenuRoute(subMenu)}
//                                               </span>
//                                             </td>

//                                             {/* ORDER */}
//                                             <td className="text-center">
//                                               <span
//                                                 style={{
//                                                   fontSize: "11px",
//                                                   color: "#555",
//                                                 }}
//                                               >
//                                                 {subMenu?.displayOrder ??
//                                                   subIndex + 1}
//                                               </span>
//                                             </td>

//                                             {/* STATUS */}
//                                             <td>
//                                               <span
//                                                 className="px-2 py-1 rounded-2"
//                                                 style={{
//                                                   background: "#dcfce7",
//                                                   color: "#16a34a",
//                                                   fontSize: "9px",
//                                                   fontWeight: "600",
//                                                 }}
//                                               >
//                                                 Active
//                                               </span>
//                                             </td>

//                                             {/* ACTION */}
//                                             <td>
//                                               <ActionButtons menu={subMenu} />
//                                             </td>
//                                           </tr>
//                                         );
//                                       },
//                                     )}
//                                 </React.Fragment>
//                               );
//                             })}
//                         </React.Fragment>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           {!loading && moduleGroups.length > 0 && (
//             <div
//               className="card-footer bg-white border-0"
//               style={{
//                 padding: "12px 18px",
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//                 {/* SHOWING */}

//                 <div
//                   className="text-muted"
//                   style={{
//                     fontSize: "12px",
//                   }}
//                 >
//                   Showing <strong>{startIndex + 1}</strong> to{" "}
//                   <strong>
//                     {Math.min(startIndex + itemsPerPage, moduleGroups.length)}
//                   </strong>{" "}
//                   of <strong>{moduleGroups.length}</strong> modules
//                 </div>

//                 {/* PAGINATION */}

//                 <div className="d-flex align-items-center gap-2">
//                   {/* PREVIOUS */}

//                   <button
//                     type="button"
//                     className="btn btn-sm"
//                     disabled={currentPage === 1}
//                     onClick={() => goToPage(currentPage - 1)}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       padding: 0,
//                       border: "1px solid #e4e4e4",
//                     }}
//                   >
//                     <LuChevronLeft size={15} />
//                   </button>

//                   {/* PAGES */}

//                   {Array.from(
//                     {
//                       length: totalPages,
//                     },
//                     (_, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         className="btn btn-sm"
//                         onClick={() => goToPage(index + 1)}
//                         style={{
//                           width: "30px",
//                           height: "30px",
//                           padding: 0,
//                           border: "1px solid #e4e4e4",
//                           background:
//                             currentPage === index + 1 ? "#6f2cff" : "white",
//                           color: currentPage === index + 1 ? "white" : "#555",
//                         }}
//                       >
//                         {index + 1}
//                       </button>
//                     ),
//                   )}

//                   {/* NEXT */}

//                   <button
//                     type="button"
//                     className="btn btn-sm"
//                     disabled={currentPage === totalPages}
//                     onClick={() => goToPage(currentPage + 1)}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       padding: 0,
//                       border: "1px solid #e4e4e4",
//                     }}
//                   >
//                     <LuChevronRight size={15} />
//                   </button>

//                   {/* PER PAGE */}

//                   <select
//                     className="form-select form-select-sm"
//                     value={itemsPerPage}
//                     onChange={(e) => {
//                       setItemsPerPage(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                     style={{
//                       width: "90px",
//                       fontSize: "12px",
//                     }}
//                   >
//                     <option value={5}>5 / page</option>

//                     <option value={10}>10 / page</option>

//                     <option value={20}>20 / page</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenuList;


import React, { useEffect, useMemo, useState } from "react";
import {
  LuBox,
  LuEye,
  LuPencil,
  LuTrash2,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown,
  LuChevronRight as LuExpandRight,
  LuMenu,
  LuList,
  LuLayers3,
} from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

// =====================================================
// MODULE ICONS
// =====================================================

const images = import.meta.glob("/src/assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

// =====================================================
// COMPONENT
// =====================================================

const MenuList = () => {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [expandedModules, setExpandedModules] = useState({});

  // =====================================================
  // FETCH MENUS + MODULES
  // =====================================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const [menuRes, moduleRes] = await Promise.all([
        axiosInstance.get("/api/menu/all"),
        axiosInstance.get("/api/module/all"),
      ]);

      const menuData = Array.isArray(menuRes.data)
        ? menuRes.data
        : menuRes.data?.data || menuRes.data?.content || [];

      const moduleData = Array.isArray(moduleRes.data)
        ? moduleRes.data
        : moduleRes.data?.data || moduleRes.data?.content || [];

      setMenus(menuData);
      setModules(moduleData);
    } catch (err) {
      console.error("Error fetching module/menu:", err);

      setMenus([]);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =====================================================
  // STATUS
  // =====================================================

  const isActive = (item) => {
    if (typeof item?.status === "boolean") {
      return item.status;
    }

    if (typeof item?.status === "string") {
      const status = item.status.toUpperCase();

      return (
        status === "ACTIVE" ||
        status === "TRUE" ||
        status === "ENABLED"
      );
    }

    return true;
  };

  // =====================================================
  // GET MODULE
  // =====================================================

  const getModule = (menu) => {
    return menu?.module || {};
  };

  // =====================================================
  // GET MENU TYPE
  // =====================================================

  const getMenuType = (menu) => {
    if (
      menu?.hasSubMenu === true ||
      (Array.isArray(menu?.subMenus) && menu.subMenus.length > 0)
    ) {
      return "MAIN";
    }

    return "MAIN";
  };

  // =====================================================
  // BUILD MENU TREE
  // =====================================================

  const buildMenuTree = (menuList) => {
    if (!Array.isArray(menuList)) {
      return [];
    }

    return menuList.map((menu) => ({
      ...menu,
      children: Array.isArray(menu.subMenus)
        ? menu.subMenus
        : [],
    }));
  };

  // =====================================================
  // GET MENU ID
  // =====================================================

  const getMenuId = (menu) => {
    return menu?.id || menu?.menuId;
  };

  // =====================================================
  // GET MENU NAME
  // =====================================================

  const getMenuName = (menu) => {
    return (
      menu?.menuName ||
      menu?.name ||
      menu?.label ||
      "-"
    );
  };

  // =====================================================
  // GET SUBMENU NAME
  // =====================================================

  const getSubMenuName = (subMenu) => {
    return (
      subMenu?.subMenuName ||
      subMenu?.name ||
      subMenu?.label ||
      "-"
    );
  };

  // =====================================================
  // GET SUBMENU ROUTE
  // =====================================================

  const getSubMenuRoute = (subMenu) => {
    return (
      subMenu?.subMenuUrl ||
      subMenu?.route ||
      subMenu?.routeUrl ||
      subMenu?.url ||
      subMenu?.path ||
      "-"
    );
  };

  // =====================================================
  // GET SUBMENU CODE
  // =====================================================

  const getSubMenuCode = (subMenu) => {
    return (
      subMenu?.subMenuCode ||
      subMenu?.code ||
      "-"
    );
  };

  // =====================================================
  // GET MENU CODE
  // =====================================================

  const getMenuCode = (menu) => {
    return (
      menu?.menuCode ||
      menu?.code ||
      "-"
    );
  };

  // =====================================================
  // GET ROUTE
  // =====================================================

  const getRoute = (menu) => {
    return (
      menu?.menuUrl ||
      menu?.route ||
      menu?.routeUrl ||
      menu?.url ||
      menu?.path ||
      "-"
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // =====================================================
  // MODULE LIST
  // =====================================================

  const moduleList = useMemo(() => {
    return modules.map((module) => ({
      id: module?.id || module?.moduleId,
      name:
        module?.moduleName ||
        module?.name ||
        "Unknown Module",
      code:
        module?.moduleCode ||
        module?.code ||
        "",
      image: module?.image,
    }));
  }, [modules]);

  // =====================================================
  // FILTER MENUS
  // =====================================================

  const filteredMenus = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return menus.filter((menu) => {
      const module = getModule(menu);

      const menuName = getMenuName(menu).toLowerCase();
      const menuCode = getMenuCode(menu).toLowerCase();

      const moduleName = (
        module?.moduleName ||
        module?.name ||
        menu?.moduleName ||
        ""
      ).toLowerCase();

      const moduleId =
        module?.id ||
        module?.moduleId ||
        menu?.moduleId;

      const matchesSearch =
        menuName.includes(searchText) ||
        menuCode.includes(searchText) ||
        moduleName.includes(searchText);

      const matchesModule =
        moduleFilter === "ALL" ||
        String(moduleId) === String(moduleFilter);

      const active = isActive(menu);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && active) ||
        (statusFilter === "INACTIVE" && !active);

      return (
        matchesSearch &&
        matchesModule &&
        matchesStatus
      );
    });
  }, [
    menus,
    search,
    moduleFilter,
    statusFilter,
  ]);

  // =====================================================
  // MODULE GROUPS
  // =====================================================

  const moduleGroups = useMemo(() => {
    return modules
      .map((module) => {
        const moduleId =
          module?.id ||
          module?.moduleId;

        const moduleMenus = filteredMenus.filter((menu) => {
          const menuModule = getModule(menu);

          const menuModuleId =
            menuModule?.id ||
            menuModule?.moduleId ||
            menu?.moduleId;

          return (
            String(menuModuleId) ===
            String(moduleId)
          );
        });

        return {
          module,
          moduleId,
          menus: moduleMenus,
        };
      })
      .filter((group) => {
        const module = group.module || {};

        const moduleName = (
          module?.moduleName ||
          module?.name ||
          ""
        ).toLowerCase();

        const moduleCode = (
          module?.moduleCode ||
          module?.code ||
          ""
        ).toLowerCase();

        const searchText =
          search.toLowerCase().trim();

        const moduleMatchesSearch =
          !searchText ||
          moduleName.includes(searchText) ||
          moduleCode.includes(searchText) ||
          group.menus.some((menu) => {
            return (
              getMenuName(menu)
                .toLowerCase()
                .includes(searchText) ||
              getMenuCode(menu)
                .toLowerCase()
                .includes(searchText)
            );
          });

        return moduleMatchesSearch;
      });
  }, [
    modules,
    filteredMenus,
    search,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    moduleGroups.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentGroups = moduleGroups.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =====================================================
  // EXPAND / COLLAPSE
  // =====================================================

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const expandAll = () => {
    const state = {};

    moduleGroups.forEach((group) => {
      state[group.moduleId] = true;
    });

    setExpandedModules(state);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleView = (menu) => {
    console.log("View menu:", menu);
  };

  const handleEdit = (menu) => {
    const menuId =
      menu?.id ||
      menu?.menuId;

    if (!menuId) {
      alert("Menu ID not found");
      return;
    }

    navigate(`/admin/menus/edit/${menuId}`);
  };

  const handleDelete = (menu) => {
    console.log("Delete menu:", menu);
  };

  // =====================================================
  // MODULE IMAGE
  // =====================================================

  const getModuleImage = (module) => {
    const imageName = module?.image;

    if (!imageName) {
      return null;
    }

    return imageMap[imageName] || null;
  };

  // =====================================================
  // ACTION BUTTONS
  // =====================================================

  const ActionButtons = ({ menu }) => {
    return (
      <div className="d-flex justify-content-center gap-2">
        {/* VIEW */}
        <button
          type="button"
          className="sa-action-btn sa-view-btn"
          title="View"
          onClick={() => handleView(menu)}
        >
          <LuEye size={14} />
        </button>

        {/* EDIT */}
        <button
          type="button"
          className="sa-action-btn sa-edit-btn"
          title="Edit"
          onClick={() => handleEdit(menu)}
        >
          <LuPencil size={14} />
        </button>

        {/* DELETE */}
        <button
          type="button"
          className="sa-action-btn sa-delete-btn"
          title="Delete"
          onClick={() => handleDelete(menu)}
        >
          <LuTrash2 size={14} />
        </button>
      </div>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="sa-page-header rounded-4 shadow overflow-hidden">
          <div className="p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="sa-title-icon">
                  <LuList size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Menu Management
                  </h5>

                  <div className="text-muted small">
                    Manage modules, menus and submenus.
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-3 px-3"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="me-2" />
                Back to Menu
              </button>
            </div>
          </div>

          {/* BREADCRUMB */}
          <div className="sa-breadcrumb-strip px-4 py-2">
            <small className="text-muted">
              Dashboard
              <span className="mx-2">›</span>
              Menu Management
              <span className="mx-2">›</span>
              <span className="text-primary fw-semibold">
                Menu List
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="container-fluid px-2 mt-3 mb-4">
        <div className="card border-0 shadow rounded-4 overflow-hidden">

          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div className="card-header bg-white border-0 p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

              {/* TITLE */}
              <div className="d-flex align-items-center gap-3">
                <div className="sa-section-icon">
                  <LuLayers3 size={20} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    Menu List
                  </h6>

                  <small className="text-muted">
                    Manage modules, menus and submenus
                  </small>
                </div>
              </div>

              {/* FILTERS */}
              <div className="d-flex align-items-center gap-2 flex-wrap">

                {/* MODULE FILTER */}
                <select
                  className="form-select rounded-3 sa-filter-select"
                  value={moduleFilter}
                  onChange={(e) => {
                    setModuleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="ALL">
                    All Modules
                  </option>

                  {moduleList.map((module) => (
                    <option
                      key={module.id}
                      value={module.id}
                    >
                      {module.name}
                    </option>
                  ))}
                </select>

                {/* STATUS */}
                <select
                  className="form-select rounded-3 sa-filter-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>

                {/* SEARCH */}
                <div className="sa-search-box">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Search menu..."
                    value={search}
                    onChange={handleSearch}
                  />

                  <LuSearch
                    size={17}
                    className="sa-search-icon"
                  />
                </div>
              </div>
            </div>

            {/* EXPAND / COLLAPSE */}
            {!loading &&
              moduleGroups.length > 0 && (
                <div className="d-flex justify-content-end gap-2 mt-3 pt-3 sa-toolbar-border">

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-3 px-3"
                    onClick={expandAll}
                  >
                    <LuChevronDown
                      size={14}
                      className="me-1"
                    />
                    Expand All
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-3 px-3"
                    onClick={collapseAll}
                  >
                    <LuExpandRight
                      size={14}
                      className="me-1"
                    />
                    Collapse All
                  </button>
                </div>
              )}
          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1050px",
                }}
              >
                <thead>
                  <tr className="sa-table-head">
                    <th
                      className="text-center"
                      style={{ width: "5%" }}
                    >
                      #
                    </th>

                    <th style={{ width: "23%" }}>
                      Menu Name
                    </th>

                    <th style={{ width: "14%" }}>
                      Module
                    </th>

                    <th style={{ width: "10%" }}>
                      Type
                    </th>

                    <th style={{ width: "18%" }}>
                      Route
                    </th>

                    <th
                      className="text-center"
                      style={{ width: "8%" }}
                    >
                      Order
                    </th>

                    <th style={{ width: "10%" }}>
                      Status
                    </th>

                    <th
                      className="text-center"
                      style={{ width: "12%" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {/* LOADING */}
                  {loading && (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "28px",
                            height: "28px",
                          }}
                        />

                        <div className="text-muted mt-2 small">
                          Loading menus...
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* EMPTY */}
                  {!loading &&
                    currentGroups.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-5"
                        >
                          <div className="sa-empty-icon mx-auto mb-3">
                            <LuMenu size={27} />
                          </div>

                          <div className="fw-semibold">
                            No menus found
                          </div>

                          <small className="text-muted">
                            Try changing your search or filters.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* =================================================
                      MODULE GROUPS
                  ================================================= */}

                  {!loading &&
                    currentGroups.map(
                      (group, groupIndex) => {
                        const module =
                          group.module || {};

                        const moduleId =
                          group.moduleId;

                        const moduleName =
                          module?.moduleName ||
                          module?.name ||
                          "Unknown Module";

                        const moduleCode =
                          module?.moduleCode ||
                          module?.code ||
                          group?.menus?.[0]?.moduleCode ||
                          "-";

                        const moduleImage =
                          getModuleImage(module);

                        const menuTree =
                          buildMenuTree(
                            group.menus
                          );

                        const isExpanded =
                          expandedModules[
                            moduleId
                          ] ?? true;

                        const totalMenus =
                          group.menus.length;

                        const moduleActive =
                          isActive(module);

                        return (
                          <React.Fragment
                            key={moduleId}
                          >
                            {/* =================================================
                                MODULE ROW
                            ================================================= */}

                            <tr className="sa-module-row">

                              {/* NUMBER */}
                              <td className="text-center">
                                <span className="sa-index">
                                  {startIndex +
                                    groupIndex +
                                    1}
                                </span>
                              </td>

                              {/* MODULE NAME */}
                              <td>
                                <div className="d-flex align-items-center">

                                  {/* EXPAND */}
                                  <button
                                    type="button"
                                    className="sa-expand-btn me-2"
                                    onClick={() =>
                                      toggleModule(
                                        moduleId
                                      )
                                    }
                                  >
                                    {isExpanded ? (
                                      <LuChevronDown
                                        size={15}
                                      />
                                    ) : (
                                      <LuExpandRight
                                        size={15}
                                      />
                                    )}
                                  </button>

                                  {/* ICON */}
                                  <span className="sa-module-icon me-2">
                                    {moduleImage ? (
                                      <img
                                        src={moduleImage}
                                        alt={moduleName}
                                      />
                                    ) : (
                                      <LuBox
                                        size={19}
                                      />
                                    )}
                                  </span>

                                  <div>
                                    <div className="sa-module-name">
                                      {moduleName}
                                    </div>

                                    <small className="sa-sub-text">
                                      {totalMenus}{" "}
                                      {totalMenus === 1
                                        ? "menu"
                                        : "menus"}
                                    </small>
                                  </div>
                                </div>
                              </td>

                              {/* MODULE CODE */}
                              <td>
                                <span className="sa-blue-badge">
                                  {moduleCode}
                                </span>
                              </td>

                              {/* TYPE */}
                              <td>
                                <span className="sa-type-badge">
                                  Module
                                </span>
                              </td>

                              {/* ROUTE */}
                              <td>
                                <span className="sa-route">
                                  -
                                </span>
                              </td>

                              {/* ORDER */}
                              <td className="text-center">
                                <span className="sa-order">
                                  -
                                </span>
                              </td>

                              {/* STATUS */}
                              <td>
                                <span
                                  className={
                                    moduleActive
                                      ? "sa-status-badge sa-status-active"
                                      : "sa-status-badge sa-status-inactive"
                                  }
                                >
                                  <span className="sa-status-dot" />
                                  {moduleActive
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </td>

                              {/* ACTION */}
                              <td className="text-center">
                                <span className="sa-module-label">
                                  Module
                                </span>
                              </td>
                            </tr>

                            {/* =================================================
                                MENU + SUBMENU
                            ================================================= */}

                            {isExpanded &&
                              menuTree.map(
                                (
                                  mainMenu,
                                  menuIndex
                                ) => {
                                  const mainActive =
                                    isActive(
                                      mainMenu
                                    );

                                  return (
                                    <React.Fragment
                                      key={
                                        getMenuId(
                                          mainMenu
                                        ) ||
                                        menuIndex
                                      }
                                    >
                                      {/* MAIN MENU */}
                                      <tr className="sa-menu-row">

                                        <td></td>

                                        <td>
                                          <div className="d-flex align-items-center sa-main-menu-indent">

                                            {/* TREE LINE */}
                                            <div className="sa-tree-main" />

                                            <div>
                                              <div className="sa-menu-name">
                                                {getMenuName(
                                                  mainMenu
                                                )}
                                              </div>

                                              <small className="sa-menu-code">
                                                {getMenuCode(
                                                  mainMenu
                                                )}
                                              </small>
                                            </div>
                                          </div>
                                        </td>

                                        {/* MODULE */}
                                        <td>
                                          <span className="sa-blue-badge sa-small-badge">
                                            {moduleCode}
                                          </span>
                                        </td>

                                        {/* TYPE */}
                                        <td>
                                          <span className="sa-main-badge">
                                            Main
                                          </span>
                                        </td>

                                        {/* ROUTE */}
                                        <td>
                                          <span className="sa-route">
                                            {getRoute(
                                              mainMenu
                                            )}
                                          </span>
                                        </td>

                                        {/* ORDER */}
                                        <td className="text-center">
                                          <span className="sa-order">
                                            {mainMenu?.displayOrder ??
                                              mainMenu?.order ??
                                              menuIndex + 1}
                                          </span>
                                        </td>

                                        {/* STATUS */}
                                        <td>
                                          <span
                                            className={
                                              mainActive
                                                ? "sa-status-badge sa-status-active"
                                                : "sa-status-badge sa-status-inactive"
                                            }
                                          >
                                            <span className="sa-status-dot" />
                                            {mainActive
                                              ? "Active"
                                              : "Inactive"}
                                          </span>
                                        </td>

                                        {/* ACTION */}
                                        <td>
                                          <ActionButtons
                                            menu={
                                              mainMenu
                                            }
                                          />
                                        </td>
                                      </tr>

                                      {/* =================================================
                                          SUBMENUS
                                      ================================================= */}

                                      {Array.isArray(
                                        mainMenu.subMenus
                                      ) &&
                                        mainMenu.subMenus
                                          .length >
                                          0 &&
                                        mainMenu.subMenus.map(
                                          (
                                            subMenu,
                                            subIndex
                                          ) => (
                                            <tr
                                              key={
                                                subMenu?.id ||
                                                `${getMenuId(
                                                  mainMenu
                                                )}-${subIndex}`
                                              }
                                              className="sa-submenu-row"
                                            >

                                              {/* NUMBER */}
                                              <td></td>

                                              {/* NAME */}
                                              <td>
                                                <div className="d-flex align-items-center sa-submenu-indent">

                                                  <div className="sa-tree-sub">
                                                    <div className="sa-tree-sub-line" />
                                                    <div className="sa-tree-dot" />
                                                  </div>

                                                  <div>
                                                    <div className="sa-submenu-name">
                                                      {getSubMenuName(
                                                        subMenu
                                                      )}
                                                    </div>

                                                    <small className="sa-menu-code">
                                                      {getSubMenuCode(
                                                        subMenu
                                                      )}
                                                    </small>
                                                  </div>
                                                </div>
                                              </td>

                                              {/* MODULE */}
                                              <td>
                                                <span className="sa-blue-badge sa-small-badge">
                                                  {moduleCode}
                                                </span>
                                              </td>

                                              {/* TYPE */}
                                              <td>
                                                <span className="sa-sub-badge">
                                                  Sub
                                                </span>
                                              </td>

                                              {/* ROUTE */}
                                              <td>
                                                <span className="sa-route">
                                                  {getSubMenuRoute(
                                                    subMenu
                                                  )}
                                                </span>
                                              </td>

                                              {/* ORDER */}
                                              <td className="text-center">
                                                <span className="sa-order">
                                                  {subMenu?.displayOrder ??
                                                    subIndex +
                                                      1}
                                                </span>
                                              </td>

                                              {/* STATUS */}
                                              <td>
                                                <span className="sa-status-badge sa-status-active">
                                                  <span className="sa-status-dot" />
                                                  Active
                                                </span>
                                              </td>

                                              {/* ACTION */}
                                              <td>
                                                <ActionButtons
                                                  menu={
                                                    subMenu
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </React.Fragment>
                                  );
                                }
                              )}
                          </React.Fragment>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              FOOTER / PAGINATION
          ================================================= */}

          {!loading &&
            moduleGroups.length > 0 && (
              <div className="card-footer bg-white border-0 p-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                  {/* SHOWING */}
                  <div className="text-muted small">
                    Showing{" "}
                    <strong>
                      {startIndex + 1}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {Math.min(
                        startIndex +
                          itemsPerPage,
                        moduleGroups.length
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {moduleGroups.length}
                    </strong>{" "}
                    modules
                  </div>

                  {/* PAGINATION */}
                  <div className="d-flex align-items-center gap-2 flex-wrap">

                    {/* PREVIOUS */}
                    <button
                      type="button"
                      className="sa-page-btn"
                      disabled={
                        currentPage === 1
                      }
                      onClick={() =>
                        goToPage(
                          currentPage - 1
                        )
                      }
                    >
                      <LuChevronLeft
                        size={15}
                      />
                    </button>

                    {/* PAGES */}
                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`sa-page-btn ${
                            currentPage ===
                            index + 1
                              ? "sa-page-active"
                              : ""
                          }`}
                          onClick={() =>
                            goToPage(
                              index + 1
                            )
                          }
                        >
                          {index + 1}
                        </button>
                      )
                    )}

                    {/* NEXT */}
                    <button
                      type="button"
                      className="sa-page-btn"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        goToPage(
                          currentPage + 1
                        )
                      }
                    >
                      <LuChevronRight
                        size={15}
                      />
                    </button>

                    {/* PER PAGE */}
                    <select
                      className="form-select rounded-3 sa-per-page"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(
                          Number(
                            e.target.value
                          )
                        );
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>
                        5 / page
                      </option>

                      <option value={10}>
                        10 / page
                      </option>

                      <option value={20}>
                        20 / page
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* =====================================================
          THEME CSS
      ===================================================== */}

      <style>{`
        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .sa-page-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );
          border: 1px solid #dbeafe;
        }

        .sa-title-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: white;
          box-shadow:
            0 8px 20px
            rgba(37, 99, 235, 0.22);
        }

        .sa-breadcrumb-strip {
          background: rgba(239, 246, 255, 0.75);
          border-top: 1px solid #e0ecff;
        }

        /* =====================================================
           SECTION
        ===================================================== */

        .sa-section-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: white;
          box-shadow:
            0 6px 16px
            rgba(37, 99, 235, 0.18);
        }

        .sa-toolbar-border {
          border-top: 1px solid #eef4ff;
        }

        /* =====================================================
           FILTERS
        ===================================================== */

        .sa-filter-select {
          width: 145px;
          min-height: 42px;
          font-size: 13px;
          border-color: #dbeafe;
          color: #334155;
        }

        .sa-filter-select:focus,
        .sa-search-box .form-control:focus,
        .sa-per-page:focus {
          border-color: #93c5fd;
          box-shadow:
            0 0 0 0.2rem
            rgba(37, 99, 235, 0.08);
        }

        .sa-search-box {
          position: relative;
          width: 230px;
        }

        .sa-search-box .form-control {
          min-height: 42px;
          padding-right: 42px;
          font-size: 13px;
          border-color: #dbeafe;
        }

        .sa-search-icon {
          position: absolute;
          right: 13px;
          top: 13px;
          color: #64748b;
          pointer-events: none;
        }

        /* =====================================================
           TABLE
        ===================================================== */

        .sa-table-head {
          background: #eff6ff;
          border-top: 1px solid #dbeafe;
          border-bottom: 1px solid #dbeafe;
        }

        .sa-table-head th {
          color: #1e3a8a;
          font-size: 12px;
          font-weight: 700;
          padding: 13px 10px;
          white-space: nowrap;
        }

        .sa-module-row {
          background: #f8fbff;
          border-bottom: 1px solid #e0ecff;
        }

        .sa-menu-row {
          background: #ffffff;
          border-bottom: 1px solid #eef4ff;
        }

        .sa-submenu-row {
          background: #fcfdff;
          border-bottom: 1px solid #f1f5f9;
        }

        .sa-module-row:hover,
        .sa-menu-row:hover,
        .sa-submenu-row:hover {
          background: #f8fbff;
        }

        .sa-index {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
        }

        /* =====================================================
           MODULE ICON
        ===================================================== */

        .sa-module-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }

        .sa-module-icon img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .sa-module-name {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
        }

        .sa-sub-text {
          font-size: 10px;
          color: #64748b;
        }

        /* =====================================================
           TREE
        ===================================================== */

        .sa-expand-btn {
          width: 26px;
          height: 26px;
          padding: 0;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          background: white;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .sa-expand-btn:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

        .sa-main-menu-indent {
          padding-left: 34px;
        }

        .sa-submenu-indent {
          padding-left: 68px;
        }

        .sa-tree-main {
          width: 18px;
          height: 30px;
          border-left: 1px solid #bfdbfe;
          border-bottom: 1px solid #bfdbfe;
          border-bottom-left-radius: 6px;
          margin-right: 10px;
          margin-top: -15px;
          flex-shrink: 0;
        }

        .sa-tree-sub {
          position: relative;
          width: 28px;
          height: 28px;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .sa-tree-sub-line {
          position: absolute;
          left: 0;
          top: -14px;
          width: 18px;
          height: 27px;
          border-left: 1px solid #bfdbfe;
          border-bottom: 1px solid #bfdbfe;
          border-bottom-left-radius: 6px;
        }

        .sa-tree-dot {
          position: absolute;
          left: 14px;
          top: 13px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
        }

        /* =====================================================
           TEXT
        ===================================================== */

        .sa-menu-name {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
        }

        .sa-submenu-name {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .sa-menu-code {
          font-size: 9px;
          color: #94a3b8;
        }

        .sa-route {
          font-size: 11px;
          color: #64748b;
          word-break: break-word;
        }

        .sa-order {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        /* =====================================================
           BADGES
        ===================================================== */

        .sa-blue-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: 8px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          font-size: 10px;
          font-weight: 700;
        }

        .sa-small-badge {
          font-size: 9px;
          padding: 4px 8px;
        }

        .sa-type-badge,
        .sa-main-badge,
        .sa-sub-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 700;
        }

        .sa-type-badge {
          background: #eaf3ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .sa-main-badge {
          background: #f0f7ff;
          color: #1d4ed8;
          border: 1px solid #c7ddff;
        }

        .sa-sub-badge {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .sa-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
        }

        .sa-status-active {
          background: #ecfdf3;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .sa-status-inactive {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .sa-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .sa-module-label {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
        }

        /* =====================================================
           ACTION BUTTONS
        ===================================================== */

        .sa-action-btn {
          width: 31px;
          height: 31px;
          padding: 0;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .sa-view-btn {
          background: #eff6ff;
          color: #2563eb;
          border-color: #dbeafe;
        }

        .sa-view-btn:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .sa-edit-btn {
          background: #eef2ff;
          color: #4f46e5;
          border-color: #e0e7ff;
        }

        .sa-edit-btn:hover {
          background: #e0e7ff;
          transform: translateY(-1px);
        }

        .sa-delete-btn {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fee2e2;
        }

        .sa-delete-btn:hover {
          background: #fee2e2;
          transform: translateY(-1px);
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .sa-empty-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }

        /* =====================================================
           PAGINATION
        ===================================================== */

        .sa-page-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          border-radius: 9px;
          border: 1px solid #dbeafe;
          background: white;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .sa-page-btn:hover:not(:disabled) {
          background: #eff6ff;
          color: #2563eb;
          border-color: #93c5fd;
        }

        .sa-page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .sa-page-active {
          background: #2563eb !important;
          border-color: #2563eb !important;
          color: white !important;
          box-shadow:
            0 5px 12px
            rgba(37, 99, 235, 0.2);
        }

        .sa-per-page {
          width: 95px;
          min-height: 34px;
          font-size: 12px;
          border-color: #dbeafe;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 992px) {
          .sa-filter-select {
            width: 135px;
          }

          .sa-search-box {
            width: 210px;
          }
        }

        @media (max-width: 768px) {
          .sa-title-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
          }

          .sa-filter-select,
          .sa-search-box {
            width: 100%;
          }

          .sa-search-box .form-control {
            width: 100%;
          }

          .sa-main-menu-indent {
            padding-left: 20px;
          }

          .sa-submenu-indent {
            padding-left: 40px;
          }

          .sa-card-footer {
            align-items: flex-start;
          }
        }

        @media (max-width: 576px) {
          .sa-page-header .btn {
            width: 100%;
          }

          .sa-title-icon {
            width: 44px;
            height: 44px;
            min-width: 44px;
          }

          .sa-section-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
          }

          .sa-action-btn {
            width: 29px;
            height: 29px;
          }

          .sa-page-btn {
            width: 30px;
            height: 30px;
          }

          .sa-per-page {
            width: 88px;
          }
        }
      `}</style>
    </>
  );
};

export default MenuList;