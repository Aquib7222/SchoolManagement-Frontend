
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuSearch,
//   LuRefreshCw,
//   LuLayers3,
//   LuMenu,
//   LuCircleCheck,
//   LuCircleX,
//   LuChevronDown,
//   LuChevronRight,
//   LuExternalLink,
//   LuBox,
// } from "react-icons/lu";
// import axiosInstance from "../../../api/axiosInstance";

// const images = import.meta.glob("/src/assets/icon/*", {
//   eager: true,
//   import: "default",
// });

// const imageMap = {};

// Object.keys(images).forEach((path) => {
//   const fileName = path.split("/").pop();
//   imageMap[fileName] = images[path];
// });

// const SchoolModuleMappingList = () => {
//   const token = localStorage.getItem("token");


//   const [schools, setSchools] = useState([]);
//   const [userGroups, setUserGroups] = useState([]);

//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedGroup, setSelectedGroup] = useState("");

//   const [mappings, setMappings] = useState({
//     moduleIds: [],
//     menuIds: [],
//     subMenuIds: [],
//   });

//   const [modules, setModules] = useState([]);
//   const [moduleGroups, setModuleGroups] = useState([]);

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [isLoaded, setIsLoaded] = useState(false);

//   const [expandedModules, setExpandedModules] = useState({});

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   // =====================================================
//   // FETCH SCHOOL + GROUP
//   // =====================================================

//   const fetchInitialData = async () => {
//     try {
//       setInitialLoading(true);

//       const [schoolRes, groupRes] = await Promise.allSettled([
//         axiosInstance.get("/api/school/all", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),

//         axiosInstance.get("/api/user-group/all", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);

//       // ---------------- SCHOOL ----------------

//       if (schoolRes.status === "fulfilled") {
//         const data = Array.isArray(schoolRes.value.data)
//           ? schoolRes.value.data
//           : schoolRes.value.data?.data ||
//             schoolRes.value.data?.content ||
//             [];

//         setSchools(data);
//       } else {
//         console.error(
//           "Error fetching schools:",
//           schoolRes.reason
//         );
//         setSchools([]);
//       }

//       // ---------------- USER GROUP ----------------

//       if (groupRes.status === "fulfilled") {
//         const data = Array.isArray(groupRes.value.data)
//           ? groupRes.value.data
//           : groupRes.value.data?.data ||
//             groupRes.value.data?.content ||
//             [];

//         setUserGroups(data);
//       } else {
//         console.error(
//           "Error fetching user groups:",
//           groupRes.reason
//         );
//         setUserGroups([]);
//       }
//     } catch (error) {
//       console.error("Initial data error:", error);
//     } finally {
//       setInitialLoading(false);
//     }
//   };

 

//   const fetchAllModules = async () => {
//     try {
//       const res = await axiosInstance.get("/api/module/all");

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data ||
//           res.data?.content ||
//           [];

//       return data;
//     } catch (error) {
//       console.error("Module Load Error:", error);
//       return [];
//     }
//   };

  
//   const getMenuName = (menu) => {
//     return (
//       menu?.menuName ||
//       menu?.name ||
//       menu?.label ||
//       "-"
//     );
//   };

 
//   const getSubMenuName = (subMenu) => {
//     return (
//       subMenu?.subMenuName ||
//       subMenu?.name ||
//       subMenu?.label ||
//       "-"
//     );
//   };

 

//   const getMenuCode = (menu) => {
//     return (
//       menu?.menuCode ||
//       menu?.code ||
//       "-"
//     );
//   };


//   const getSubMenuCode = (subMenu) => {
//     return (
//       subMenu?.subMenuCode ||
//       subMenu?.code ||
//       "-"
//     );
//   };

  

//   const getMenuRoute = (menu) => {
//     return (
//       menu?.menuUrl ||
//       menu?.route ||
//       menu?.routeUrl ||
//       menu?.url ||
//       menu?.path ||
//       "-"
//     );
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

  

//   const isActive = (item) => {
//     if (typeof item?.status === "boolean") {
//       return item.status;
//     }

//     if (typeof item?.status === "string") {
//       const status = item.status.toUpperCase();

//       return (
//         status === "ACTIVE" ||
//         status === "TRUE" ||
//         status === "ENABLED"
//       );
//     }

//     return true;
//   };

  

//   const getMenuId = (menu) => {
//     return menu?.id || menu?.menuId;
//   };

 

//   const getModuleId = (module) => {
//     return module?.id || module?.moduleId;
//   };

  

//   const getModuleMenus = async (moduleId) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/menu/module/${moduleId}`
//       );

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data ||
//           res.data?.content ||
//           [];

//       return data;
//     } catch (error) {
//       console.error(
//         `Menu error for module ${moduleId}:`,
//         error
//       );

//       return [];
//     }
//   };

 

//   const loadSchoolMapping = async () => {
//     if (!selectedSchool) {
//       alert("Please select School");
//       return;
//     }

//     if (!selectedGroup) {
//       alert("Please select User Group");
//       return;
//     }

//     try {
//       setLoading(true);
//       setIsLoaded(false);

//       setModuleGroups([]);

      

//       const res = await axiosInstance.get(
//         "/api/school-mapping/load",
//         {
//           params: {
//             schoolId: selectedSchool,
//             groupId: selectedGroup,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(
//         "School Mapping Response:",
//         res.data
//       );

//       const data = res.data || {};

//       const mappingData = {
//         moduleIds: Array.isArray(data.moduleIds)
//           ? data.moduleIds.map(Number)
//           : [],

//         menuIds: Array.isArray(data.menuIds)
//           ? data.menuIds.map(Number)
//           : [],

//         subMenuIds: Array.isArray(data.subMenuIds)
//           ? data.subMenuIds.map(Number)
//           : [],
//       };

//       setMappings(mappingData);

     

//       const allModules = await fetchAllModules();

//       setModules(allModules);

      

//       const mappedModules = allModules.filter(
//         (module) =>
//           mappingData.moduleIds.includes(
//             Number(getModuleId(module))
//           )
//       );

      
//       const groups = [];

//       for (const module of mappedModules) {
//         const moduleId = getModuleId(module);

//         const allMenus = await getModuleMenus(
//           moduleId
//         );

       

//         const mappedMenus = allMenus.filter(
//           (menu) =>
//             mappingData.menuIds.includes(
//               Number(getMenuId(menu))
//             )
//         );

      

//         const menusWithSubMenus =
//           mappedMenus.map((menu) => {
//             const subMenus = Array.isArray(
//               menu?.subMenus
//             )
//               ? menu.subMenus
//               : [];

//             const mappedSubMenus =
//               subMenus.filter((subMenu) =>
//                 mappingData.subMenuIds.includes(
//                   Number(subMenu?.id)
//                 )
//               );

//             return {
//               ...menu,
//               subMenus: mappedSubMenus,
//             };
//           });

//         groups.push({
//           module,
//           moduleId,
//           menus: menusWithSubMenus,
//         });
//       }

//       console.log(
//         "FINAL MODULE TREE:",
//         groups
//       );

//       setModuleGroups(groups);

//       // Expand all initially
//       const expanded = {};

//       groups.forEach((group) => {
//         expanded[group.moduleId] = true;
//       });

//       setExpandedModules(expanded);

//       setIsLoaded(true);
//     } catch (error) {
//       console.error(
//         "Mapping Load Error:",
//         error
//       );

//       setMappings({
//         moduleIds: [],
//         menuIds: [],
//         subMenuIds: [],
//       });

//       setModuleGroups([]);

//       setIsLoaded(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getModuleImage = (module) => {
//   const imageName = module?.image;

//   if (!imageName) return null;

//   return imageMap[imageName] || null;
// };


//   // =====================================================
//   // SEARCH
//   // =====================================================

//   const filteredGroups = useMemo(() => {
//     const value = search
//       .toLowerCase()
//       .trim();

//     if (!value) {
//       return moduleGroups;
//     }

//     return moduleGroups
//       .map((group) => {
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

//         const moduleMatch =
//           moduleName.includes(value) ||
//           moduleCode.includes(value);

//         const menus = group.menus
//           .map((menu) => {
//             const menuMatch =
//               getMenuName(menu)
//                 .toLowerCase()
//                 .includes(value) ||
//               getMenuCode(menu)
//                 .toLowerCase()
//                 .includes(value) ||
//               getMenuRoute(menu)
//                 .toLowerCase()
//                 .includes(value);

//             const subMenus = (
//               menu.subMenus || []
//             ).filter((subMenu) => {
//               return (
//                 getSubMenuName(subMenu)
//                   .toLowerCase()
//                   .includes(value) ||
//                 getSubMenuCode(subMenu)
//                   .toLowerCase()
//                   .includes(value) ||
//                 getSubMenuRoute(subMenu)
//                   .toLowerCase()
//                   .includes(value)
//               );
//             });

//             if (
//               menuMatch ||
//               subMenus.length > 0
//             ) {
//               return {
//                 ...menu,
//                 subMenus: menuMatch
//                   ? menu.subMenus || []
//                   : subMenus,
//               };
//             }

//             return null;
//           })
//           .filter(Boolean);

//         if (
//           moduleMatch ||
//           menus.length > 0
//         ) {
//           return {
//             ...group,
//             menus: moduleMatch
//               ? group.menus
//               : menus,
//           };
//         }

//         return null;
//       })
//       .filter(Boolean);
//   }, [moduleGroups, search]);

//   // =====================================================
//   // TOGGLE MODULE
//   // =====================================================

//   const toggleModule = (moduleId) => {
//     setExpandedModules((prev) => ({
//       ...prev,
//       [moduleId]: !prev[moduleId],
//     }));
//   };

//   // =====================================================
//   // EXPAND ALL
//   // =====================================================

//   const expandAll = () => {
//     const state = {};

//     filteredGroups.forEach((group) => {
//       state[group.moduleId] = true;
//     });

//     setExpandedModules(state);
//   };

//   // =====================================================
//   // COLLAPSE ALL
//   // =====================================================

//   const collapseAll = () => {
//     setExpandedModules({});
//   };

//   // =====================================================
//   // RESET
//   // =====================================================

//   const handleReset = () => {
//     setSelectedSchool("");
//     setSelectedGroup("");

//     setMappings({
//       moduleIds: [],
//       menuIds: [],
//       subMenuIds: [],
//     });

//     setModules([]);
//     setModuleGroups([]);

//     setSearch("");
//     setExpandedModules({});
//     setIsLoaded(false);
//   };

//   // =====================================================
//   // RENDER STATUS
//   // =====================================================

//   const StatusBadge = ({ active }) => {
//     return active ? (
//       <span
//         className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
//         style={{
//           background: "#dcfce7",
//           color: "#16a34a",
//           fontSize: "10px",
//           fontWeight: "600",
//         }}
//       >
//         <LuCircleCheck
//           size={13}
//           className="me-1"
//         />
//         Active
//       </span>
//     ) : (
//       <span
//         className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
//         style={{
//           background: "#fee2e2",
//           color: "#dc2626",
//           fontSize: "10px",
//           fontWeight: "600",
//         }}
//       >
//         <LuCircleX
//           size={13}
//           className="me-1"
//         />
//         Inactive
//       </span>
//     );
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <>
//       {/* ================================================= */}
//       {/* HEADER */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{
//             minHeight: "70px",
//           }}
//         >
//           <h4 className="fw-bold mb-1">
//             School Module Mapping List
//           </h4>

//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0 small">
//               <li className="breadcrumb-item">
//                 <a
//                   href="/"
//                   className="text-decoration-none text-dark"
//                 >
//                   Dashboard
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 Module Management
//               </li>

//               <li className="breadcrumb-item active text-primary">
//                 School Module Mapping List
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FILTER */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3">
//           <div className="card-header bg-white">
//             <h6 className="fw-bold mb-0">
//               Search School Mapping
//             </h6>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">

//               {/* SCHOOL */}

//               <div className="col-md-4">
//                 <label className="form-label">
//                   <h6>
//                     School{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSchool}
//                   onChange={(e) => {
//                     setSelectedSchool(
//                       e.target.value
//                     );

//                     setSelectedGroup("");
//                     setModuleGroups([]);
//                     setSearch("");
//                     setIsLoaded(false);
//                   }}
//                   disabled={initialLoading}
//                 >
//                   <option value="">
//                     Select School
//                   </option>

//                   {schools.map((school) => (
//                     <option
//                       key={school.id}
//                       value={school.id}
//                     >
//                       {school.schoolName ||
//                         school.name ||
//                         school.organizationName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* USER GROUP */}

//               <div className="col-md-4">
//                 <label className="form-label">
//                   <h6>
//                     User Group{" "}
//                     <span className="text-danger">
//                       *
//                     </span>
//                   </h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedGroup}
//                   disabled={
//                     !selectedSchool ||
//                     initialLoading
//                   }
//                   onChange={(e) => {
//                     setSelectedGroup(
//                       e.target.value
//                     );

//                     setModuleGroups([]);
//                     setSearch("");
//                     setIsLoaded(false);
//                   }}
//                 >
//                   <option value="">
//                     Select User Group
//                   </option>

//                   {userGroups.map((group) => (
//                     <option
//                       key={group.id}
//                       value={group.id}
//                     >
//                       {group.groupName ||
//                         group.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* BUTTON */}

//               <div className="col-md-4 d-flex align-items-end gap-2">
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={loadSchoolMapping}
//                   disabled={
//                     !selectedSchool ||
//                     !selectedGroup ||
//                     loading
//                   }
//                 >
//                   <LuLayers3
//                     size={18}
//                     className="me-2"
//                   />

//                   {loading
//                     ? "Loading..."
//                     : "Load Modules"}
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={handleReset}
//                 >
//                   <LuRefreshCw
//                     size={18}
//                     className="me-2"
//                   />

//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================================================= */}
//         {/* LIST */}
//         {/* ================================================= */}

//         {isLoaded && (
//           <div className="card shadow border-0 rounded-3 mt-3">

//             {/* HEADER */}

//             <div
//               className="card-header bg-white border-0"
//               style={{
//                 padding: "16px 18px",
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//                 <div className="d-flex align-items-center">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                     style={{
//                       width: "32px",
//                       height: "32px",
//                       background: "#f0eaff",
//                     }}
//                   >
//                     <LuLayers3
//                       size={17}
//                       style={{
//                         color: "#6f2cff",
//                       }}
//                     />
//                   </span>

//                   <div>
//                     <h6 className="mb-0 fw-bold">
//                       Module & Menu List
//                     </h6>

//                     <small className="text-muted">
//                       School mapped modules,
//                       menus and submenus
//                     </small>
//                   </div>
//                 </div>

//                 {/* SEARCH */}

//                 <div
//                   className="position-relative"
//                   style={{
//                     width: "250px",
//                   }}
//                 >
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search module, menu..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
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

//               {/* EXPAND COLLAPSE */}

//               {!loading &&
//                 filteredGroups.length > 0 && (
//                   <div className="d-flex justify-content-end gap-2 mt-3">
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-light"
//                       onClick={expandAll}
//                       style={{
//                         fontSize: "11px",
//                       }}
//                     >
//                       Expand All
//                     </button>

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-light"
//                       onClick={collapseAll}
//                       style={{
//                         fontSize: "11px",
//                       }}
//                     >
//                       Collapse All
//                     </button>
//                   </div>
//                 )}
//             </div>

//             {/* ================================================= */}
//             {/* TABLE */}
//             {/* ================================================= */}

//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table
//                   className="table align-middle mb-0"
//                   style={{
//                     minWidth: "1100px",
//                   }}
//                 >
//                   <thead>
//                     <tr
//                       style={{
//                         background: "#fafbff",
//                         borderTop:
//                           "1px solid #f0f0f0",
//                         borderBottom:
//                           "1px solid #eeeeee",
//                       }}
//                     >
//                       <th
//                         className="text-center"
//                         style={{
//                           width: "5%",
//                           fontSize: "12px",
//                           color: "#555",
//                           padding:
//                             "13px 10px",
//                         }}
//                       >
//                         #
//                       </th>

//                       <th
//                         style={{
//                           width: "24%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Name
//                       </th>

//                       <th
//                         style={{
//                           width: "14%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Code
//                       </th>

//                       <th
//                         style={{
//                           width: "11%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Type
//                       </th>

//                       <th
//                         style={{
//                           width: "20%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Route
//                       </th>

//                       <th
//                         className="text-center"
//                         style={{
//                           width: "8%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Order
//                       </th>

//                       <th
//                         style={{
//                           width: "10%",
//                           fontSize: "12px",
//                           color: "#555",
//                         }}
//                       >
//                         Status
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     {/* LOADING */}

//                     {loading && (
//                       <tr>
//                         <td
//                           colSpan="7"
//                           className="text-center py-5"
//                         >
//                           <div
//                             className="spinner-border text-primary"
//                             style={{
//                               width: "25px",
//                               height: "25px",
//                             }}
//                           />

//                           <div className="text-muted mt-2">
//                             Loading mapping...
//                           </div>
//                         </td>
//                       </tr>
//                     )}

//                     {/* EMPTY */}

//                     {!loading &&
//                       filteredGroups.length ===
//                         0 && (
//                         <tr>
//                           <td
//                             colSpan="7"
//                             className="text-center py-5"
//                           >
//                             <LuMenu
//                               size={35}
//                               className="text-muted mb-2"
//                             />

//                             <div className="fw-semibold">
//                               No mapped modules found
//                             </div>

//                             <small className="text-muted">
//                               No module, menu or
//                               submenu is mapped
//                               for this selection.
//                             </small>
//                           </td>
//                         </tr>
//                       )}

//                     {/* ================================================= */}
//                     {/* MODULE */}
//                     {/* ================================================= */}

//                     {!loading &&
//                       filteredGroups.map(
//                         (
//                           group,
//                           groupIndex
//                         ) => {
//                           const module =
//                             group.module ||
//                             {};

//                           const moduleId =
//                             group.moduleId;

//                           const moduleName =
//                             module?.moduleName ||
//                             module?.name ||
//                             "-";

//                           const moduleCode =
//                             module?.moduleCode ||
//                             module?.code ||
//                             "-";
                             
//     const moduleImage =
//       getModuleImage(module);

//                           const expanded =
//                             expandedModules[
//                               moduleId
//                             ] ?? true;

//                           const moduleActive =
//                             isActive(module);

//                           return (
//                             <React.Fragment
//                               key={moduleId}
//                             >

//                               {/* ============================= */}
//                               {/* MODULE ROW */}
//                               {/* ============================= */}

//                               <tr
//                                 style={{
//                                   background:
//                                     "#fcfbff",
//                                   borderBottom:
//                                     "1px solid #eeeeee",
//                                 }}
//                               >
//                                 <td className="text-center">
//                                   <span
//                                     style={{
//                                       fontSize:
//                                         "12px",
//                                       fontWeight:
//                                         "600",
//                                       color:
//                                         "#555",
//                                     }}
//                                   >
//                                     {groupIndex +
//                                       1}
//                                     .
//                                   </span>
//                                 </td>

//                                 <td>
//                                   <div className="d-flex align-items-center">

//                                     {/* EXPAND */}

//                                     <button
//                                       type="button"
//                                       className="border-0 bg-transparent p-0 me-2 d-flex align-items-center justify-content-center"
//                                       onClick={() =>
//                                         toggleModule(
//                                           moduleId
//                                         )
//                                       }
//                                       style={{
//                                         width:
//                                           "20px",
//                                         height:
//                                           "20px",
//                                       }}
//                                     >
//                                       {expanded ? (
//                                         <LuChevronDown
//                                           size={
//                                             15
//                                           }
//                                         />
//                                       ) : (
//                                         <LuChevronRight
//                                           size={
//                                             15
//                                           }
//                                         />
//                                       )}
//                                     </button>

//                                     {/* ICON */}

//                                     <span
//                                       className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
//                                       style={{
//                                         width:
//                                           "38px",
//                                         height:
//                                           "38px",
//                                         background:
//                                           "#f1edff",
//                                       }}
//                                     >
//                                       {moduleImage ? (
//   <img
//     src={moduleImage}
//     alt={module.moduleName}
//     style={{
//       width: "23px",
//       height: "23px",
//       objectFit: "contain",
//     }}
//   />
// ) : (
//   <LuBox size={19} color="#6f2cff" />
// )}
//                                     </span>

//                                     <div>
//                                       <div
//                                         className="fw-semibold"
//                                         style={{
//                                           fontSize:
//                                             "13px",
//                                         }}
//                                       >
//                                         {
//                                           moduleName
//                                         }
//                                       </div>

//                                       <small
//                                         className="text-muted"
//                                         style={{
//                                           fontSize:
//                                             "10px",
//                                         }}
//                                       >
//                                         {
//                                           group
//                                             .menus
//                                             .length
//                                         }{" "}
//                                         {group
//                                           .menus
//                                           .length ===
//                                         1
//                                           ? "menu"
//                                           : "menus"}
//                                       </small>
//                                     </div>
//                                   </div>
//                                 </td>

//                                 <td>
//                                   <span
//                                     className="px-2 py-1 rounded-2"
//                                     style={{
//                                       background:
//                                         "#f1edff",
//                                       color:
//                                         "#6f2cff",
//                                       fontSize:
//                                         "10px",
//                                       fontWeight:
//                                         "600",
//                                     }}
//                                   >
//                                     {
//                                       moduleCode
//                                     }
//                                   </span>
//                                 </td>

//                                 <td>
//                                   <span
//                                     className="px-2 py-1 rounded-2"
//                                     style={{
//                                       background:
//                                         "#f3e8ff",
//                                       color:
//                                         "#7e22ce",
//                                       fontSize:
//                                         "10px",
//                                       fontWeight:
//                                         "600",
//                                     }}
//                                   >
//                                     Module
//                                   </span>
//                                 </td>

//                                 <td>
//                                   <span className="text-muted">
//                                     -
//                                   </span>
//                                 </td>

//                                 <td className="text-center">
//                                   -
//                                 </td>

//                                 <td>
//                                   <StatusBadge
//                                     active={
//                                       moduleActive
//                                     }
//                                   />
//                                 </td>
//                               </tr>

                           

//                               {expanded &&
//                                 group.menus.map(
//                                   (
//                                     menu,
//                                     menuIndex
//                                   ) => {
//                                     const menuActive =
//                                       isActive(
//                                         menu
//                                       );

//                                     return (
//                                       <React.Fragment
//                                         key={
//                                           getMenuId(
//                                             menu
//                                           ) ||
//                                           menuIndex
//                                         }
//                                       >

//                                         {/* MENU */}

//                                         <tr
//                                           style={{
//                                             borderBottom:
//                                               "1px solid #f4f4f4",
//                                           }}
//                                         >
//                                           <td></td>

//                                           <td>
//                                             <div
//                                               className="d-flex align-items-center"
//                                               style={{
//                                                 paddingLeft:
//                                                   "32px",
//                                               }}
//                                             >

//                                               {/* TREE */}

//                                               <div
//                                                 style={{
//                                                   width:
//                                                     "18px",
//                                                   height:
//                                                     "30px",
//                                                   borderLeft:
//                                                     "1px solid #d9d9d9",
//                                                   borderBottom:
//                                                     "1px solid #d9d9d9",
//                                                   borderBottomLeftRadius:
//                                                     "5px",
//                                                   marginRight:
//                                                     "10px",
//                                                   marginTop:
//                                                     "-15px",
//                                                 }}
//                                               />

                                              

//                                               <div>
//                                                 <div
//                                                   className="fw-semibold"
//                                                   style={{
//                                                     fontSize:
//                                                       "12px",
//                                                   }}
//                                                 >
//                                                   {getMenuName(
//                                                     menu
//                                                   )}
//                                                 </div>

//                                                 <small
//                                                   className="text-muted"
//                                                   style={{
//                                                     fontSize:
//                                                       "10px",
//                                                   }}
//                                                 >
//                                                   {getMenuCode(
//                                                     menu
//                                                   )}
//                                                 </small>
//                                               </div>
//                                             </div>
//                                           </td>

//                                           <td>
//                                             <span
//                                               className="px-2 py-1 rounded-2"
//                                               style={{
//                                                 background:
//                                                   "#f1edff",
//                                                 color:
//                                                   "#6f2cff",
//                                                 fontSize:
//                                                   "9px",
//                                                 fontWeight:
//                                                   "600",
//                                               }}
//                                             >
//                                               {
//                                                 moduleCode
//                                               }
//                                             </span>
//                                           </td>

//                                           <td>
//                                             <span
//                                               className="px-2 py-1 rounded-2"
//                                               style={{
//                                                 background:
//                                                   "#f3e8ff",
//                                                 color:
//                                                   "#7e22ce",
//                                                 fontSize:
//                                                   "9px",
//                                                 fontWeight:
//                                                   "600",
//                                               }}
//                                             >
//                                               Main
//                                             </span>
//                                           </td>

//                                           <td>
//                                             <div className="d-flex align-items-center gap-2">
//                                               <code
//                                                 style={{
//                                                   fontSize:
//                                                     "11px",
//                                                 }}
//                                               >
//                                                 {getMenuRoute(
//                                                   menu
//                                                 )}
//                                               </code>

//                                               {getMenuRoute(
//                                                 menu
//                                               ) !==
//                                                 "-" && (
//                                                 <LuExternalLink
//                                                   size={
//                                                     14
//                                                   }
//                                                   className="text-muted"
//                                                 />
//                                               )}
//                                             </div>
//                                           </td>

//                                           <td className="text-center">
//                                             {menu?.displayOrder ??
//                                               menu?.order ??
//                                               menuIndex +
//                                                 1}
//                                           </td>

//                                           <td>
//                                             <StatusBadge
//                                               active={
//                                                 menuActive
//                                               }
//                                             />
//                                           </td>
//                                         </tr>

//                                         {/* ================================================= */}
//                                         {/* SUB MENUS */}
//                                         {/* ================================================= */}

//                                         {Array.isArray(
//                                           menu.subMenus
//                                         ) &&
//                                           menu.subMenus.length >
//                                             0 &&
//                                           menu.subMenus.map(
//                                             (
//                                               subMenu,
//                                               subIndex
//                                             ) => (
//                                               <tr
//                                                 key={
//                                                   subMenu?.id ||
//                                                   `${getMenuId(
//                                                     menu
//                                                   )}-${subIndex}`
//                                                 }
//                                                 style={{
//                                                   borderBottom:
//                                                     "1px solid #f7f7f7",
//                                                   background:
//                                                     "#fff",
//                                                 }}
//                                               >
//                                                 <td></td>

//                                                 <td>
//                                                   <div
//                                                     className="d-flex align-items-center"
//                                                     style={{
//                                                       paddingLeft:
//                                                         "67px",
//                                                     }}
//                                                   >

//                                                     {/* TREE */}

//                                                     <div
//                                                       style={{
//                                                         position:
//                                                           "relative",
//                                                         width:
//                                                           "28px",
//                                                         height:
//                                                           "28px",
//                                                         marginRight:
//                                                           "8px",
//                                                         flexShrink: 0,
//                                                       }}
//                                                     >
//                                                       <div
//                                                         style={{
//                                                           position:
//                                                             "absolute",
//                                                           left: 0,
//                                                           top:
//                                                             "-14px",
//                                                           width:
//                                                             "18px",
//                                                           height:
//                                                             "27px",
//                                                           borderLeft:
//                                                             "1px solid #d9d9d9",
//                                                           borderBottom:
//                                                             "1px solid #d9d9d9",
//                                                           borderBottomLeftRadius:
//                                                             "5px",
//                                                         }}
//                                                       />

//                                                       <div
//                                                         style={{
//                                                           position:
//                                                             "absolute",
//                                                           left:
//                                                             "14px",
//                                                           top:
//                                                             "13px",
//                                                           width:
//                                                             "5px",
//                                                           height:
//                                                             "5px",
//                                                           borderRadius:
//                                                             "50%",
//                                                           background:
//                                                             "#6f2cff",
//                                                         }}
//                                                       />
//                                                     </div>

//                                                     <div>
//                                                       <div
//                                                         style={{
//                                                           fontSize:
//                                                             "12px",
//                                                           fontWeight:
//                                                             "500",
//                                                           color:
//                                                             "#444",
//                                                         }}
//                                                       >
//                                                         {getSubMenuName(
//                                                           subMenu
//                                                         )}
//                                                       </div>

//                                                       <small
//                                                         className="text-muted"
//                                                         style={{
//                                                           fontSize:
//                                                             "9px",
//                                                         }}
//                                                       >
//                                                         {getSubMenuCode(
//                                                           subMenu
//                                                         )}
//                                                       </small>
//                                                     </div>
//                                                   </div>
//                                                 </td>

//                                                 <td>
//                                                   <span
//                                                     className="px-2 py-1 rounded-2"
//                                                     style={{
//                                                       background:
//                                                         "#f1edff",
//                                                       color:
//                                                         "#6f2cff",
//                                                       fontSize:
//                                                         "9px",
//                                                       fontWeight:
//                                                         "600",
//                                                     }}
//                                                   >
//                                                     {
//                                                       moduleCode
//                                                     }
//                                                   </span>
//                                                 </td>

//                                                 <td>
//                                                   <span
//                                                     className="px-2 py-1 rounded-2"
//                                                     style={{
//                                                       background:
//                                                         "#f3e8ff",
//                                                       color:
//                                                         "#7e22ce",
//                                                       fontSize:
//                                                         "9px",
//                                                       fontWeight:
//                                                         "600",
//                                                     }}
//                                                   >
//                                                     Sub
//                                                   </span>
//                                                 </td>

//                                                 <td>
//                                                   <div className="d-flex align-items-center gap-2">
//                                                     <code
//                                                       style={{
//                                                         fontSize:
//                                                           "11px",
//                                                       }}
//                                                     >
//                                                       {getSubMenuRoute(
//                                                         subMenu
//                                                       )}
//                                                     </code>

//                                                     {getSubMenuRoute(
//                                                       subMenu
//                                                     ) !==
//                                                       "-" && (
//                                                       <LuExternalLink
//                                                         size={
//                                                           14
//                                                         }
//                                                         className="text-muted"
//                                                       />
//                                                     )}
//                                                   </div>
//                                                 </td>

//                                                 <td className="text-center">
//                                                   {subMenu?.displayOrder ??
//                                                     subIndex +
//                                                       1}
//                                                 </td>

//                                                 <td>
//                                                   <StatusBadge
//                                                     active={isActive(
//                                                       subMenu
//                                                     )}
//                                                   />
//                                                 </td>
//                                               </tr>
//                                             )
//                                           )}
//                                       </React.Fragment>
//                                     )
//                                   }
//                                 )}
//                             </React.Fragment>
//                           );
//                         }
//                       )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* FOOTER */}

//             {!loading &&
//               filteredGroups.length > 0 && (
//                 <div className="card-footer bg-white border-0">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <small className="text-muted">
//                       Showing{" "}
//                       <strong>
//                         {filteredGroups.length}
//                       </strong>{" "}
//                       mapped modules
//                     </small>

//                     <small className="text-muted">
//                       Modules:{" "}
//                       <strong>
//                         {
//                           mappings.moduleIds
//                             .length
//                         }
//                       </strong>{" "}
//                       | Menus:{" "}
//                       <strong>
//                         {
//                           mappings.menuIds
//                             .length
//                         }
//                       </strong>{" "}
//                       | Sub Menus:{" "}
//                       <strong>
//                         {
//                           mappings.subMenuIds
//                             .length
//                         }
//                       </strong>
//                     </small>
//                   </div>
//                 </div>
//               )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SchoolModuleMappingList;

import React, { useEffect, useMemo, useState } from "react";

import {
  LuSearch,
  LuRefreshCw,
  LuLayers3,
  LuMenu,
  LuCircleCheck,
  LuCircleX,
  LuChevronDown,
  LuChevronRight,
  LuExternalLink,
  LuBox,
  LuSchool,
  LuUsers,
} from "react-icons/lu";

import axiosInstance from "../../../api/axiosInstance";

const images = import.meta.glob("/src/assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

const SchoolModuleMappingList = () => {
  const token = localStorage.getItem("token");

  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const [mappings, setMappings] = useState({
    moduleIds: [],
    menuIds: [],
    subMenuIds: [],
  });

  const [modules, setModules] = useState([]);
  const [moduleGroups, setModuleGroups] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [expandedModules, setExpandedModules] = useState({});

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchInitialData();
  }, []);

  // =====================================================
  // FETCH SCHOOL + GROUP
  // =====================================================

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);

      const [schoolRes, groupRes] = await Promise.allSettled([
        axiosInstance.get("/api/school/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axiosInstance.get("/api/user-group/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // ---------------- SCHOOL ----------------

      if (schoolRes.status === "fulfilled") {
        const data = Array.isArray(schoolRes.value.data)
          ? schoolRes.value.data
          : schoolRes.value.data?.data ||
            schoolRes.value.data?.content ||
            [];

        setSchools(data);
      } else {
        console.error(
          "Error fetching schools:",
          schoolRes.reason
        );

        setSchools([]);
      }

      // ---------------- USER GROUP ----------------

      if (groupRes.status === "fulfilled") {
        const data = Array.isArray(groupRes.value.data)
          ? groupRes.value.data
          : groupRes.value.data?.data ||
            groupRes.value.data?.content ||
            [];

        setUserGroups(data);
      } else {
        console.error(
          "Error fetching user groups:",
          groupRes.reason
        );

        setUserGroups([]);
      }
    } catch (error) {
      console.error("Initial data error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  // =====================================================
  // FETCH MODULES
  // =====================================================

  const fetchAllModules = async () => {
    try {
      const res = await axiosInstance.get("/api/module/all");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      return data;
    } catch (error) {
      console.error("Module Load Error:", error);
      return [];
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const getMenuName = (menu) => {
    return (
      menu?.menuName ||
      menu?.name ||
      menu?.label ||
      "-"
    );
  };

  const getSubMenuName = (subMenu) => {
    return (
      subMenu?.subMenuName ||
      subMenu?.name ||
      subMenu?.label ||
      "-"
    );
  };

  const getMenuCode = (menu) => {
    return (
      menu?.menuCode ||
      menu?.code ||
      "-"
    );
  };

  const getSubMenuCode = (subMenu) => {
    return (
      subMenu?.subMenuCode ||
      subMenu?.code ||
      "-"
    );
  };

  const getMenuRoute = (menu) => {
    return (
      menu?.menuUrl ||
      menu?.route ||
      menu?.routeUrl ||
      menu?.url ||
      menu?.path ||
      "-"
    );
  };

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

  const getMenuId = (menu) => {
    return menu?.id || menu?.menuId;
  };

  const getModuleId = (module) => {
    return module?.id || module?.moduleId;
  };

  const getModuleImage = (module) => {
    const imageName = module?.image;

    if (!imageName) return null;

    return imageMap[imageName] || null;
  };

  // =====================================================
  // GET MENUS
  // =====================================================

  const getModuleMenus = async (moduleId) => {
    try {
      const res = await axiosInstance.get(
        `/api/menu/module/${moduleId}`
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      return data;
    } catch (error) {
      console.error(
        `Menu error for module ${moduleId}:`,
        error
      );

      return [];
    }
  };

  // =====================================================
  // LOAD SCHOOL MAPPING
  // =====================================================

  const loadSchoolMapping = async () => {
    if (!selectedSchool) {
      alert("Please select School");
      return;
    }

    if (!selectedGroup) {
      alert("Please select User Group");
      return;
    }

    try {
      setLoading(true);
      setIsLoaded(false);
      setModuleGroups([]);

      const res = await axiosInstance.get(
        "/api/school-mapping/load",
        {
          params: {
            schoolId: selectedSchool,
            groupId: selectedGroup,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "School Mapping Response:",
        res.data
      );

      const data = res.data || {};

      const mappingData = {
        moduleIds: Array.isArray(data.moduleIds)
          ? data.moduleIds.map(Number)
          : [],

        menuIds: Array.isArray(data.menuIds)
          ? data.menuIds.map(Number)
          : [],

        subMenuIds: Array.isArray(data.subMenuIds)
          ? data.subMenuIds.map(Number)
          : [],
      };

      setMappings(mappingData);

      const allModules = await fetchAllModules();

      setModules(allModules);

      const mappedModules = allModules.filter(
        (module) =>
          mappingData.moduleIds.includes(
            Number(getModuleId(module))
          )
      );

      const groups = [];

      for (const module of mappedModules) {
        const moduleId = getModuleId(module);

        const allMenus = await getModuleMenus(
          moduleId
        );

        const mappedMenus = allMenus.filter(
          (menu) =>
            mappingData.menuIds.includes(
              Number(getMenuId(menu))
            )
        );

        const menusWithSubMenus =
          mappedMenus.map((menu) => {
            const subMenus = Array.isArray(
              menu?.subMenus
            )
              ? menu.subMenus
              : [];

            const mappedSubMenus =
              subMenus.filter((subMenu) =>
                mappingData.subMenuIds.includes(
                  Number(subMenu?.id)
                )
              );

            return {
              ...menu,
              subMenus: mappedSubMenus,
            };
          });

        groups.push({
          module,
          moduleId,
          menus: menusWithSubMenus,
        });
      }

      console.log(
        "FINAL MODULE TREE:",
        groups
      );

      setModuleGroups(groups);

      const expanded = {};

      groups.forEach((group) => {
        expanded[group.moduleId] = true;
      });

      setExpandedModules(expanded);

      setIsLoaded(true);
    } catch (error) {
      console.error(
        "Mapping Load Error:",
        error
      );

      setMappings({
        moduleIds: [],
        menuIds: [],
        subMenuIds: [],
      });

      setModuleGroups([]);
      setIsLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredGroups = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return moduleGroups;
    }

    return moduleGroups
      .map((group) => {
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

        const moduleMatch =
          moduleName.includes(value) ||
          moduleCode.includes(value);

        const menus = group.menus
          .map((menu) => {
            const menuMatch =
              getMenuName(menu)
                .toLowerCase()
                .includes(value) ||
              getMenuCode(menu)
                .toLowerCase()
                .includes(value) ||
              getMenuRoute(menu)
                .toLowerCase()
                .includes(value);

            const subMenus = (
              menu.subMenus || []
            ).filter((subMenu) => {
              return (
                getSubMenuName(subMenu)
                  .toLowerCase()
                  .includes(value) ||
                getSubMenuCode(subMenu)
                  .toLowerCase()
                  .includes(value) ||
                getSubMenuRoute(subMenu)
                  .toLowerCase()
                  .includes(value)
              );
            });

            if (
              menuMatch ||
              subMenus.length > 0
            ) {
              return {
                ...menu,
                subMenus: menuMatch
                  ? menu.subMenus || []
                  : subMenus,
              };
            }

            return null;
          })
          .filter(Boolean);

        if (
          moduleMatch ||
          menus.length > 0
        ) {
          return {
            ...group,
            menus: moduleMatch
              ? group.menus
              : menus,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [moduleGroups, search]);

  // =====================================================
  // TOGGLE MODULE
  // =====================================================

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // =====================================================
  // EXPAND ALL
  // =====================================================

  const expandAll = () => {
    const state = {};

    filteredGroups.forEach((group) => {
      state[group.moduleId] = true;
    });

    setExpandedModules(state);
  };

  // =====================================================
  // COLLAPSE ALL
  // =====================================================

  const collapseAll = () => {
    setExpandedModules({});
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSelectedSchool("");
    setSelectedGroup("");

    setMappings({
      moduleIds: [],
      menuIds: [],
      subMenuIds: [],
    });

    setModules([]);
    setModuleGroups([]);

    setSearch("");
    setExpandedModules({});
    setIsLoaded(false);
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const StatusBadge = ({ active }) => {
    return active ? (
      <span className="school-map-status school-map-status-active">
        <LuCircleCheck
          size={13}
          className="me-1"
        />
        Active
      </span>
    ) : (
      <span className="school-map-status school-map-status-inactive">
        <LuCircleX
          size={13}
          className="me-1"
        />
        Inactive
      </span>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <style>
        {`
          /* =========================================
             PAGE HEADER
          ========================================= */

          .school-map-page-header {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #f5f9ff 60%,
              #eaf3ff 100%
            );
            border: 1px solid #dbeafe;
          }

          .school-map-title-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            background: linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
            color: #ffffff;
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22);
          }

          .school-map-section-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
            color: #ffffff;
            box-shadow: 0 7px 17px rgba(37, 99, 235, 0.18);
          }

          .school-map-breadcrumb {
            background: rgba(239, 246, 255, 0.75);
            border-top: 1px solid #e0ecff;
          }

          /* =========================================
             CARDS
          ========================================= */

          .school-map-card {
            border: 0 !important;
            border-radius: 16px !important;
            box-shadow:
              0 6px 22px rgba(15, 23, 42, 0.07) !important;
          }

          /* =========================================
             FORM
          ========================================= */

          .school-map-select-box {
            height: 100%;
            padding: 15px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
          }

          .school-map-label {
            display: block;
            margin-bottom: 8px;
            color: #334155;
            font-size: 13px;
            font-weight: 600;
          }

          .school-map-required {
            color: #dc2626;
          }

          .school-map-control {
            min-height: 43px;
            border-radius: 12px !important;
            border: 1px solid #dbeafe !important;
            transition: all 0.2s ease;
          }

          .school-map-control:focus {
            border-color: #93c5fd !important;
            box-shadow:
              0 0 0 0.2rem rgba(37, 99, 235, 0.10) !important;
          }

          .school-map-control:disabled {
            background: #f8fafc !important;
            cursor: not-allowed;
          }

          .school-map-btn {
            min-height: 43px;
            border-radius: 11px !important;
            font-weight: 600;
          }

          .school-map-btn-primary {
            box-shadow:
              0 6px 14px rgba(37, 99, 235, 0.16);
          }

          .school-map-info {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            color: #1e40af;
            border-radius: 12px;
          }

          /* =========================================
             LIST HEADER
          ========================================= */

          .school-map-list-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
          }

          .school-map-count {
            background: #eff6ff !important;
            color: #2563eb !important;
            border: 1px solid #bfdbfe;
            border-radius: 9px;
            font-size: 11px;
            font-weight: 600;
          }

          /* =========================================
             SEARCH
          ========================================= */

          .school-map-search {
            width: 280px;
          }

          .school-map-search-input {
            min-height: 40px;
            border-radius: 11px !important;
            border: 1px solid #dbeafe !important;
            padding-left: 14px;
            padding-right: 40px;
            font-size: 13px;
          }

          .school-map-search-input:focus {
            border-color: #93c5fd !important;
            box-shadow:
              0 0 0 0.2rem rgba(37, 99, 235, 0.10) !important;
          }

          .school-map-expand-btn {
            border: 1px solid #dbeafe !important;
            background: #f8fbff !important;
            color: #2563eb !important;
            border-radius: 9px !important;
            font-size: 11px !important;
            font-weight: 600;
          }

          .school-map-expand-btn:hover {
            background: #eff6ff !important;
            border-color: #93c5fd !important;
          }

          /* =========================================
             TABLE
          ========================================= */

          .school-map-table-wrapper {
            border-top: 1px solid #dbeafe;
          }

          .school-map-table thead th {
            background: #eff6ff !important;
            color: #1e3a8a !important;
            border-bottom: 1px solid #dbeafe !important;
            font-size: 12px;
            font-weight: 700;
            padding: 13px 12px;
            white-space: nowrap;
          }

          .school-map-table tbody td {
            border-color: #edf2f7 !important;
            padding: 12px;
          }

          .school-map-table tbody tr {
            transition: background 0.15s ease;
          }

          .school-map-table tbody tr:hover {
            background: #f8fbff !important;
          }

          /* =========================================
             MODULE
          ========================================= */

          .school-map-module-row {
            background: #f8fbff !important;
          }

          .school-map-module-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 11px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
          }

          .school-map-code-badge {
            display: inline-flex;
            align-items: center;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            font-size: 10px;
            font-weight: 600;
            border-radius: 8px;
            padding: 5px 8px;
          }

          .school-map-type-module {
            display: inline-flex;
            align-items: center;
            background: #eef2ff;
            color: #4f46e5;
            border: 1px solid #c7d2fe;
            font-size: 9px;
            font-weight: 600;
            border-radius: 8px;
            padding: 5px 8px;
          }

          .school-map-type-main {
            display: inline-flex;
            align-items: center;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            font-size: 9px;
            font-weight: 600;
            border-radius: 8px;
            padding: 5px 8px;
          }

          .school-map-type-sub {
            display: inline-flex;
            align-items: center;
            background: #f0f9ff;
            color: #0369a1;
            border: 1px solid #bae6fd;
            font-size: 9px;
            font-weight: 600;
            border-radius: 8px;
            padding: 5px 8px;
          }

          /* =========================================
             TREE
          ========================================= */

          .school-map-tree-menu {
            width: 18px;
            height: 30px;
            border-left: 1px solid #bfdbfe;
            border-bottom: 1px solid #bfdbfe;
            border-bottom-left-radius: 5px;
            margin-right: 10px;
            margin-top: -15px;
          }

          .school-map-tree-sub {
            position: relative;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            flex-shrink: 0;
          }

          .school-map-tree-sub-line {
            position: absolute;
            left: 0;
            top: -14px;
            width: 18px;
            height: 27px;
            border-left: 1px solid #bfdbfe;
            border-bottom: 1px solid #bfdbfe;
            border-bottom-left-radius: 5px;
          }

          .school-map-tree-dot {
            position: absolute;
            left: 14px;
            top: 13px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #2563eb;
          }

          /* =========================================
             STATUS
          ========================================= */

          .school-map-status {
            padding: 5px 8px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            font-size: 10px;
            font-weight: 600;
            white-space: nowrap;
          }

          .school-map-status-active {
            background: #dcfce7;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }

          .school-map-status-inactive {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          /* =========================================
             EMPTY / LOADING
          ========================================= */

          .school-map-empty-icon {
            width: 58px;
            height: 58px;
            margin: 0 auto 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #dbeafe;
          }

          .school-map-footer {
            background: #f8fbff !important;
            border-top: 1px solid #dbeafe !important;
          }

          /* =========================================
             RESPONSIVE
          ========================================= */

          @media (max-width: 992px) {
            .school-map-search {
              width: 100%;
            }
          }

          @media (max-width: 768px) {
            .school-map-title-row {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .school-map-search {
              width: 100%;
            }

            .school-map-header-actions {
              width: 100%;
            }

            .school-map-header-actions button {
              flex: 1;
            }

            .school-map-list-header {
              align-items: flex-start !important;
              flex-direction: column;
            }
          }

          @media (max-width: 576px) {
            .school-map-title-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
            }

            .school-map-table {
              min-width: 1100px;
            }

            .school-map-footer-row {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 6px;
            }
          }
        `}
      </style>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="rounded-4 shadow overflow-hidden school-map-page-header">

          <div className="p-3 p-md-4">

            <div className="d-flex justify-content-between align-items-center gap-3 school-map-title-row">

              <div className="d-flex align-items-center gap-3">

                <div className="school-map-title-icon">
                  <LuLayers3 size={27} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    School Module Mapping List
                  </h5>

                  <div className="text-muted small">
                    View mapped modules, menus and submenu permissions
                    for schools and user groups.
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div className="px-4 py-2 school-map-breadcrumb">

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">

                <li className="breadcrumb-item">
                  <a
                    href="/"
                    className="text-decoration-none text-muted"
                  >
                    Dashboard
                  </a>
                </li>

                <li className="breadcrumb-item text-muted">
                  Module Management
                </li>

                <li className="breadcrumb-item active text-primary fw-semibold">
                  School Module Mapping List
                </li>

              </ol>
            </nav>

          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="mx-2">
        <div className="card school-map-card">

          <div className="card-body p-3 p-md-4">

            <div className="d-flex align-items-center gap-3 mb-4">

              <div className="school-map-section-icon">
                <LuSchool size={22} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Search School Mapping
                </h6>

                <p className="text-muted small mb-0">
                  Select a school and user group to view assigned
                  permissions.
                </p>
              </div>

            </div>

            <div className="row g-3">

              {/* SCHOOL */}

              <div className="col-lg-4 col-md-6">

                <div className="school-map-select-box">

                  <label className="school-map-label">
                    School{" "}
                    <span className="school-map-required">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select school-map-control"
                    value={selectedSchool}
                    onChange={(e) => {
                      setSelectedSchool(e.target.value);
                      setSelectedGroup("");
                      setModuleGroups([]);
                      setSearch("");
                      setIsLoaded(false);
                    }}
                    disabled={initialLoading}
                  >
                    <option value="">
                      {initialLoading
                        ? "Loading schools..."
                        : "Select School"}
                    </option>

                    {schools.map((school) => (
                      <option
                        key={school.id}
                        value={school.id}
                      >
                        {school.schoolName ||
                          school.name ||
                          school.organizationName}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {/* USER GROUP */}

              <div className="col-lg-4 col-md-6">

                <div className="school-map-select-box">

                  <label className="school-map-label">
                    User Group{" "}
                    <span className="school-map-required">
                      *
                    </span>
                  </label>

                  <select
                    className="form-select school-map-control"
                    value={selectedGroup}
                    disabled={
                      !selectedSchool ||
                      initialLoading
                    }
                    onChange={(e) => {
                      setSelectedGroup(e.target.value);
                      setModuleGroups([]);
                      setSearch("");
                      setIsLoaded(false);
                    }}
                  >
                    <option value="">
                      Select User Group
                    </option>

                    {userGroups.map((group) => (
                      <option
                        key={group.id}
                        value={group.id}
                      >
                        {group.groupName ||
                          group.name}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="col-lg-4 col-md-12">

                <div className="school-map-select-box">

                  <label className="school-map-label">
                    Actions
                  </label>

                  <div className="d-flex gap-2 school-map-header-actions">

                    <button
                      type="button"
                      className="btn btn-primary school-map-btn school-map-btn-primary"
                      onClick={loadSchoolMapping}
                      disabled={
                        !selectedSchool ||
                        !selectedGroup ||
                        loading
                      }
                    >
                      <LuLayers3
                        size={18}
                        className="me-2"
                      />

                      {loading
                        ? "Loading..."
                        : "Load Modules"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary school-map-btn"
                      onClick={handleReset}
                    >
                      <LuRefreshCw
                        size={18}
                        className="me-2"
                      />

                      Reset
                    </button>

                  </div>

                </div>

              </div>

            </div>

            {selectedSchool && selectedGroup && (
              <div className="school-map-info mt-3 p-3">

                <div className="d-flex align-items-center gap-2">

                  <LuUsers size={18} />

                  <span className="small">
                    Showing mapped permissions for the selected
                    <strong className="mx-1">
                      school
                    </strong>
                    and
                    <strong className="mx-1">
                      user group
                    </strong>.
                  </span>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          LIST
      ===================================================== */}

      {isLoaded && (
        <div className="mx-2 mt-3 mb-4">

          <div className="card school-map-card overflow-hidden">

            {/* LIST HEADER */}

            <div className="card-header bg-white border-0 p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center gap-3 school-map-list-header">

                <div className="d-flex align-items-center gap-3">

                  <div className="school-map-list-icon">
                    <LuLayers3 size={21} />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold">
                      Module & Menu List
                    </h6>

                    <small className="text-muted">
                      School mapped modules, menus and submenus
                    </small>
                  </div>

                </div>

                {!loading &&
                  filteredGroups.length > 0 && (
                    <span className="badge school-map-count px-3 py-2">
                      {filteredGroups.length} Mapped Modules
                    </span>
                  )}

              </div>

              {/* SEARCH + EXPAND */}

              {!loading && (
                <div className="row g-2 mt-3">

                  <div className="col-lg-8">
                    <div className="position-relative school-map-search">

                      <input
                        type="text"
                        className="form-control school-map-search-input"
                        placeholder="Search module, menu, code or route..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />

                      <LuSearch
                        size={17}
                        className="position-absolute text-muted"
                        style={{
                          right: "13px",
                          top: "11px",
                        }}
                      />

                    </div>
                  </div>

                  {filteredGroups.length > 0 && (
                    <div className="col-lg-4 d-flex justify-content-lg-end gap-2">

                      <button
                        type="button"
                        className="btn btn-sm school-map-expand-btn"
                        onClick={expandAll}
                      >
                        <LuChevronDown
                          size={15}
                          className="me-1"
                        />
                        Expand All
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm school-map-expand-btn"
                        onClick={collapseAll}
                      >
                        <LuChevronRight
                          size={15}
                          className="me-1"
                        />
                        Collapse All
                      </button>

                    </div>
                  )}

                </div>
              )}

            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="card-body p-0">

              <div className="table-responsive school-map-table-wrapper">

                <table
                  className="table align-middle school-map-table"
                  style={{
                    minWidth: "1100px",
                  }}
                >

                  <thead>
                    <tr>

                      <th
                        className="text-center"
                        style={{ width: "5%" }}
                      >
                        #
                      </th>

                      <th style={{ width: "24%" }}>
                        Name
                      </th>

                      <th style={{ width: "14%" }}>
                        Code
                      </th>

                      <th style={{ width: "11%" }}>
                        Type
                      </th>

                      <th style={{ width: "20%" }}>
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

                    </tr>
                  </thead>

                  <tbody>

                    {/* LOADING */}

                    {loading && (
                      <tr>

                        <td
                          colSpan="7"
                          className="text-center py-5"
                        >

                          <div
                            className="spinner-border text-primary"
                            style={{
                              width: "27px",
                              height: "27px",
                            }}
                          />

                          <div className="text-muted small mt-3">
                            Loading school mapping...
                          </div>

                        </td>

                      </tr>
                    )}

                    {/* EMPTY */}

                    {!loading &&
                      filteredGroups.length === 0 && (
                        <tr>

                          <td
                            colSpan="7"
                            className="text-center py-5"
                          >

                            <div className="school-map-empty-icon">
                              <LuMenu size={28} />
                            </div>

                            <div className="fw-semibold text-dark">
                              No Mapped Modules Found
                            </div>

                            <small className="text-muted">
                              No module, menu or submenu is mapped
                              for this selection.
                            </small>

                          </td>

                        </tr>
                      )}

                    {/* =================================================
                        MODULE GROUP
                    ================================================= */}

                    {!loading &&
                      filteredGroups.map(
                        (
                          group,
                          groupIndex
                        ) => {
                          const module =
                            group.module || {};

                          const moduleId =
                            group.moduleId;

                          const moduleName =
                            module?.moduleName ||
                            module?.name ||
                            "-";

                          const moduleCode =
                            module?.moduleCode ||
                            module?.code ||
                            "-";

                          const moduleImage =
                            getModuleImage(module);

                          const expanded =
                            expandedModules[
                              moduleId
                            ] ?? true;

                          const moduleActive =
                            isActive(module);

                          return (
                            <React.Fragment
                              key={moduleId}
                            >

                              {/* =========================
                                  MODULE ROW
                              ========================= */}

                              <tr className="school-map-module-row">

                                <td className="text-center">

                                  <span
                                    className="fw-semibold text-muted"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    {groupIndex + 1}.
                                  </span>

                                </td>

                                <td>

                                  <div className="d-flex align-items-center">

                                    {/* EXPAND */}

                                    <button
                                      type="button"
                                      className="border-0 bg-transparent p-0 me-2 d-flex align-items-center justify-content-center"
                                      onClick={() =>
                                        toggleModule(
                                          moduleId
                                        )
                                      }
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      {expanded ? (
                                        <LuChevronDown
                                          size={15}
                                          color="#2563eb"
                                        />
                                      ) : (
                                        <LuChevronRight
                                          size={15}
                                          color="#2563eb"
                                        />
                                      )}
                                    </button>

                                    {/* ICON */}

                                    <span className="school-map-module-icon me-2">

                                      {moduleImage ? (
                                        <img
                                          src={moduleImage}
                                          alt={
                                            module.moduleName ||
                                            "Module"
                                          }
                                          style={{
                                            width: "23px",
                                            height: "23px",
                                            objectFit:
                                              "contain",
                                          }}
                                        />
                                      ) : (
                                        <LuBox
                                          size={19}
                                          color="#2563eb"
                                        />
                                      )}

                                    </span>

                                    <div>

                                      <div
                                        className="fw-semibold"
                                        style={{
                                          fontSize: "13px",
                                        }}
                                      >
                                        {moduleName}
                                      </div>

                                      <small
                                        className="text-muted"
                                        style={{
                                          fontSize: "10px",
                                        }}
                                      >
                                        {group.menus.length}{" "}
                                        {group.menus.length === 1
                                          ? "menu"
                                          : "menus"}
                                      </small>

                                    </div>

                                  </div>

                                </td>

                                <td>

                                  <span className="school-map-code-badge">
                                    {moduleCode}
                                  </span>

                                </td>

                                <td>

                                  <span className="school-map-type-module">
                                    Module
                                  </span>

                                </td>

                                <td>
                                  <span className="text-muted">
                                    -
                                  </span>
                                </td>

                                <td className="text-center">
                                  -
                                </td>

                                <td>
                                  <StatusBadge
                                    active={
                                      moduleActive
                                    }
                                  />
                                </td>

                              </tr>

                              {/* =================================================
                                  MENUS
                              ================================================= */}

                              {expanded &&
                                group.menus.map(
                                  (
                                    menu,
                                    menuIndex
                                  ) => {
                                    const menuActive =
                                      isActive(menu);

                                    return (
                                      <React.Fragment
                                        key={
                                          getMenuId(
                                            menu
                                          ) ||
                                          menuIndex
                                        }
                                      >

                                        {/* MENU */}

                                        <tr>

                                          <td></td>

                                          <td>

                                            <div
                                              className="d-flex align-items-center"
                                              style={{
                                                paddingLeft:
                                                  "32px",
                                              }}
                                            >

                                              <div className="school-map-tree-menu" />

                                              <div>

                                                <div
                                                  className="fw-semibold"
                                                  style={{
                                                    fontSize:
                                                      "12px",
                                                  }}
                                                >
                                                  {getMenuName(
                                                    menu
                                                  )}
                                                </div>

                                                <small
                                                  className="text-muted"
                                                  style={{
                                                    fontSize:
                                                      "10px",
                                                  }}
                                                >
                                                  {getMenuCode(
                                                    menu
                                                  )}
                                                </small>

                                              </div>

                                            </div>

                                          </td>

                                          <td>

                                            <span className="school-map-code-badge">
                                              {moduleCode}
                                            </span>

                                          </td>

                                          <td>

                                            <span className="school-map-type-main">
                                              Main
                                            </span>

                                          </td>

                                          <td>

                                            <div className="d-flex align-items-center gap-2">

                                              <code
                                                style={{
                                                  fontSize:
                                                    "11px",
                                                  color:
                                                    "#475569",
                                                }}
                                              >
                                                {getMenuRoute(
                                                  menu
                                                )}
                                              </code>

                                              {getMenuRoute(
                                                menu
                                              ) !== "-" && (
                                                <LuExternalLink
                                                  size={14}
                                                  className="text-muted"
                                                />
                                              )}

                                            </div>

                                          </td>

                                          <td className="text-center">
                                            {menu?.displayOrder ??
                                              menu?.order ??
                                              menuIndex + 1}
                                          </td>

                                          <td>

                                            <StatusBadge
                                              active={
                                                menuActive
                                              }
                                            />

                                          </td>

                                        </tr>

                                        {/* =================================================
                                            SUB MENUS
                                        ================================================= */}

                                        {Array.isArray(
                                          menu.subMenus
                                        ) &&
                                          menu.subMenus.length >
                                            0 &&
                                          menu.subMenus.map(
                                            (
                                              subMenu,
                                              subIndex
                                            ) => (
                                              <tr
                                                key={
                                                  subMenu?.id ||
                                                  `${getMenuId(
                                                    menu
                                                  )}-${subIndex}`
                                                }
                                              >

                                                <td></td>

                                                <td>

                                                  <div
                                                    className="d-flex align-items-center"
                                                    style={{
                                                      paddingLeft:
                                                        "67px",
                                                    }}
                                                  >

                                                    <div className="school-map-tree-sub">

                                                      <div className="school-map-tree-sub-line" />

                                                      <div className="school-map-tree-dot" />

                                                    </div>

                                                    <div>

                                                      <div
                                                        style={{
                                                          fontSize:
                                                            "12px",
                                                          fontWeight:
                                                            "500",
                                                          color:
                                                            "#334155",
                                                        }}
                                                      >
                                                        {getSubMenuName(
                                                          subMenu
                                                        )}
                                                      </div>

                                                      <small
                                                        className="text-muted"
                                                        style={{
                                                          fontSize:
                                                            "9px",
                                                        }}
                                                      >
                                                        {getSubMenuCode(
                                                          subMenu
                                                        )}
                                                      </small>

                                                    </div>

                                                  </div>

                                                </td>

                                                <td>

                                                  <span className="school-map-code-badge">
                                                    {moduleCode}
                                                  </span>

                                                </td>

                                                <td>

                                                  <span className="school-map-type-sub">
                                                    Sub
                                                  </span>

                                                </td>

                                                <td>

                                                  <div className="d-flex align-items-center gap-2">

                                                    <code
                                                      style={{
                                                        fontSize:
                                                          "11px",
                                                        color:
                                                          "#475569",
                                                      }}
                                                    >
                                                      {getSubMenuRoute(
                                                        subMenu
                                                      )}
                                                    </code>

                                                    {getSubMenuRoute(
                                                      subMenu
                                                    ) !==
                                                      "-" && (
                                                      <LuExternalLink
                                                        size={14}
                                                        className="text-muted"
                                                      />
                                                    )}

                                                  </div>

                                                </td>

                                                <td className="text-center">
                                                  {subMenu?.displayOrder ??
                                                    subIndex + 1}
                                                </td>

                                                <td>

                                                  <StatusBadge
                                                    active={isActive(
                                                      subMenu
                                                    )}
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
                FOOTER
            ================================================= */}

            {!loading &&
              filteredGroups.length > 0 && (
                <div className="card-footer school-map-footer border-0 p-3">

                  <div className="d-flex justify-content-between align-items-center school-map-footer-row">

                    <small className="text-muted">
                      Showing{" "}
                      <strong className="text-dark">
                        {filteredGroups.length}
                      </strong>{" "}
                      mapped modules
                    </small>

                    <small className="text-muted">

                      Modules:{" "}
                      <strong className="text-dark">
                        {
                          mappings.moduleIds
                            .length
                        }
                      </strong>

                      {" | "}

                      Menus:{" "}
                      <strong className="text-dark">
                        {
                          mappings.menuIds
                            .length
                        }
                      </strong>

                      {" | "}

                      Sub Menus:{" "}
                      <strong className="text-dark">
                        {
                          mappings.subMenuIds
                            .length
                        }
                      </strong>

                    </small>

                  </div>

                </div>
              )}

          </div>

        </div>
      )}
    </>
  );
};

export default SchoolModuleMappingList;