

// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import {
//   LuPencil,
//   LuTrash2,
//   LuSearch,
//   LuRefreshCw,
//   LuSave,
//   LuUsers,
//   LuBox,
//   LuMenu,
//   LuChevronDown,
// } from "react-icons/lu";

// const UserGroupMapping = () => {
//   const [modules, setModules] = useState([]);
//   const [userGroups, setUserGroups] = useState([]);
//   const [menus, setMenus] = useState([]);
//   const [mappings, setMappings] = useState([]);

//   const [search, setSearch] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [isMapped, setIsMapped] = useState(false);
// const [mappedId, setMappedId] = useState(null);

//   const [form, setForm] = useState({
//     userGroupId: "",
//     moduleId: "",
//   });

//   const [selectedMenus, setSelectedMenus] = useState([]);
//   const [selectedSubMenus, setSelectedSubMenus] = useState([]);

//   // =========================================================
//   // LOAD INITIAL DATA
//   // =========================================================

//   useEffect(() => {
//     loadModules();
//     loadUserGroups();
//     loadMappings();
//   }, []);

//   // =========================================================
//   // LOAD MAPPINGS
//   // =========================================================

//   const loadMappings = async () => {
//     try {
//       const res = await axiosInstance.get(
//         "/api/user-group-mapping/all"
//       );

//       setMappings(res.data || []);
//     } catch (err) {
//       console.error("Error loading mappings:", err);
//     }
//   };

//   // =========================================================
//   // LOAD MODULES
//   // =========================================================

//   const loadModules = async () => {
//     try {
//       const res = await axiosInstance.get("/api/module/all");

//       setModules(res.data || []);
//     } catch (err) {
//       console.error("Error loading modules:", err);
//     }
//   };

//   // =========================================================
//   // LOAD USER GROUPS
//   // =========================================================

//   const loadUserGroups = async () => {
//     try {
//       const res = await axiosInstance.get("/api/user-group/all");

//       setUserGroups(res.data || []);
//     } catch (err) {
//       console.error("Error loading user groups:", err);
//     }
//   };

//   const checkExistingMapping = (userGroupId, moduleId) => {
//   if (!userGroupId || !moduleId) {
//     setIsMapped(false);
//     setMappedId(null);
//     setEditingId(null);
//     setSelectedMenus([]);
//     setSelectedSubMenus([]);
//     return;
//   }

//   const existingMapping = mappings.find(
//     (item) =>
//       Number(item.userGroup?.id) === Number(userGroupId) &&
//       Number(item.module?.id) === Number(moduleId)
//   );

//   if (existingMapping) {
//     console.log("Already Mapped =", existingMapping);

//     setIsMapped(true);
//     setMappedId(existingMapping.id);
//     setEditingId(existingMapping.id);

//     setSelectedMenus(
//       (existingMapping.menuMappings || []).map(
//         (m) => m.menu.id
//       )
//     );

//     setSelectedSubMenus(
//       (existingMapping.subMenuMappings || []).map(
//         (s) => s.subMenu.id
//       )
//     );
//   } else {
//     console.log("Mapping Not Found");

//     setIsMapped(false);
//     setMappedId(null);
//     setEditingId(null);
//     setSelectedMenus([]);
//     setSelectedSubMenus([]);
//   }
// };

//   // =========================================================
//   // FORM CHANGE
//   // =========================================================

//  const handleChange = async (e) => {
//   const { name, value } = e.target;

//   const updatedForm = {
//     ...form,
//     [name]: value,
//   };

//   setForm(updatedForm);

//   if (name === "moduleId") {
//     if (!value) {
//       setMenus([]);
//       setSelectedMenus([]);
//       setSelectedSubMenus([]);
//       setIsMapped(false);
//       setMappedId(null);
//       setEditingId(null);
//       return;
//     }

//     try {
//       const res = await axiosInstance.get(
//         `/api/menu/module/${value}`
//       );

//       setMenus(res.data);

//       // Check existing mapping
//       checkExistingMapping(
//         form.userGroupId,
//         value
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   if (name === "userGroupId") {
//     if (!value) {
//       setMenus([]);
//       setSelectedMenus([]);
//       setSelectedSubMenus([]);
//       setIsMapped(false);
//       setMappedId(null);
//       setEditingId(null);
//       return;
//     }

//     // Agar module already selected hai
//     if (form.moduleId) {
//       checkExistingMapping(
//         value,
//         form.moduleId
//       );
//     }
//   }
// };

// useEffect(() => {
//   if (form.userGroupId && form.moduleId && mappings.length > 0) {
//     checkExistingMapping(
//       form.userGroupId,
//       form.moduleId
//     );
//   }
// }, [mappings]);

//   // =========================================================
//   // MENU CHECK
//   // =========================================================

//   const handleMenuChange = (menu, checked) => {
//     let selected = [...selectedMenus];
//     let subSelected = [...selectedSubMenus];

//     if (checked) {
//       if (!selected.includes(menu.id)) {
//         selected.push(menu.id);
//       }

//       (menu.subMenus || []).forEach((sub) => {
//         if (!subSelected.includes(sub.id)) {
//           subSelected.push(sub.id);
//         }
//       });
//     } else {
//       selected = selected.filter((id) => id !== menu.id);

//       (menu.subMenus || []).forEach((sub) => {
//         subSelected = subSelected.filter(
//           (id) => id !== sub.id
//         );
//       });
//     }

//     setSelectedMenus(selected);
//     setSelectedSubMenus(subSelected);
//   };

//   // =========================================================
//   // SUB MENU CHECK
//   // =========================================================

//   const handleSubMenuChange = (menu, sub, checked) => {
//     let selectedSub = [...selectedSubMenus];
//     let selectedMenu = [...selectedMenus];

//     if (checked) {
//       if (!selectedSub.includes(sub.id)) {
//         selectedSub.push(sub.id);
//       }

//       if (!selectedMenu.includes(menu.id)) {
//         selectedMenu.push(menu.id);
//       }
//     } else {
//       selectedSub = selectedSub.filter(
//         (id) => id !== sub.id
//       );

//       const anySubSelected = (menu.subMenus || []).some(
//         (item) => selectedSub.includes(item.id)
//       );

//       if (!anySubSelected) {
//         selectedMenu = selectedMenu.filter(
//           (id) => id !== menu.id
//         );
//       }
//     }

//     setSelectedMenus(selectedMenu);
//     setSelectedSubMenus(selectedSub);
//   };

//   // =========================================================
//   // SELECT ALL MENUS
//   // =========================================================

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       const menuIds = menus.map((menu) => menu.id);

//       const subMenuIds = menus.flatMap((menu) =>
//         (menu.subMenus || []).map((sub) => sub.id)
//       );

//       setSelectedMenus(menuIds);
//       setSelectedSubMenus(subMenuIds);
//     } else {
//       setSelectedMenus([]);
//       setSelectedSubMenus([]);
//     }
//   };

//   // =========================================================
//   // SAVE / UPDATE
//   // =========================================================

//   const handleSave = async () => {
//   if (!form.userGroupId) {
//     alert("Please Select User Group");
//     return;
//   }

//   if (!form.moduleId) {
//     alert("Please Select Module");
//     return;
//   }

//   const payload = {
//     userGroupId: Number(form.userGroupId),
//     moduleId: Number(form.moduleId),
//     menuIds: selectedMenus,
//     subMenuIds: selectedSubMenus,
//   };

//   console.log("Mapping Payload =", payload);

//   try {
//     let res;

//     if (isMapped && mappedId) {
//       res = await axiosInstance.put(
//         `/api/user-group-mapping/update/${mappedId}`,
//         payload
//       );

//       alert("Mapping Updated Successfully");
//     } else {
//       res = await axiosInstance.post(
//         "/api/user-group-mapping/save",
//         payload
//       );

//       alert("Mapping Saved Successfully");
//     }

//     await loadMappings();

//     setIsMapped(false);
//     setMappedId(null);
//     setEditingId(null);

//     setForm({
//       userGroupId: "",
//       moduleId: "",
//     });

//     setMenus([]);
//     setSelectedMenus([]);
//     setSelectedSubMenus([]);

//   } catch (error) {
//     console.log(error);

//     alert(
//       error.response?.data ||
//       "Failed To Save Mapping"
//     );
//   }
// };

//   // =========================================================
//   // DELETE
//   // =========================================================

//   const deleteMapping = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this mapping?"
//       )
//     ) {
//       return;
//     }

//     try {
//       await axiosInstance.delete(
//         `/api/user-group-mapping/${id}`
//       );

//       alert("Mapping Deleted Successfully");

//       loadMappings();
//     } catch (err) {
//       console.error("Delete error:", err);

//       alert("Unable to Delete Mapping");
//     }
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================

//   const editMapping = async (id) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/user-group-mapping/${id}`
//       );

//       const data = res.data;

//       setEditingId(id);

//       setForm({
//         userGroupId: data.userGroup?.id || "",
//         moduleId: data.module?.id || "",
//       });

//       const menuRes = await axiosInstance.get(
//         `/api/menu/module/${data.module?.id}`
//       );

//       setMenus(menuRes.data || []);

//       setSelectedMenus(
//         (data.menuMappings || []).map(
//           (m) => m.menu.id
//         )
//       );

//       setSelectedSubMenus(
//         (data.subMenuMappings || []).map(
//           (s) => s.subMenu.id
//         )
//       );

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } catch (err) {
//       console.error("Edit mapping error:", err);

//       alert("Unable to load mapping");
//     }
//   };

//   // =========================================================
//   // RESET
//   // =========================================================

//   const resetForm = () => {
//     setEditingId(null);

//     setForm({
//       userGroupId: "",
//       moduleId: "",
//     });

//     setMenus([]);
//     setSelectedMenus([]);
//     setSelectedSubMenus([]);
//   };

//   // =========================================================
//   // SEARCH
//   // =========================================================

//   const filteredMappings = mappings.filter((item) => {
//     const group =
//       item.userGroup?.groupName?.toLowerCase() || "";

//     const module =
//       item.module?.moduleName?.toLowerCase() || "";

//     return (
//       group.includes(search.toLowerCase()) ||
//       module.includes(search.toLowerCase())
//     );
//   });

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{ minHeight: "70px" }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">
//                 User Group Mapping
//               </h4>

//               <p className="text-muted mb-2">
//                 Manage modules, menus and submenu permissions
//                 for user groups.
//               </p>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a
//                       href="/"
//                       className="text-decoration-none text-dark"
//                     >
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">
//                     Module Management
//                   </li>

//                   <li className="breadcrumb-item active text-primary">
//                     User Group Mapping
//                   </li>
//                 </ol>
//               </nav>
//             </div>

//             {editingId && (
//               <span className="badge bg-warning text-dark px-3 py-2">
//                 Editing Mapping
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAPPING FORM
//       ===================================================== */}

//       <div className="container-fluid px-2">
//         <div className="bg-white shadow rounded-2 p-3 mb-3">
//           <h5 className="fw-bold mb-4 d-flex align-items-center">
//             <span
//               className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
//               style={{
//                 width: "34px",
//                 height: "34px",
//               }}
//             >
//               <LuUsers
//                 size={18}
//                 className="text-white"
//               />
//             </span>

//             {editingId
//               ? "Update User Group Mapping"
//               : "Create User Group Mapping"}
//           </h5>

//           <div className="row">
//             {/* USER GROUP */}

//             <div className="col-md-6 mb-3">
//               <label className="form-label">
//                 <h6>
//                   User Group{" "}
//                   <span className="text-danger">
//                     *
//                   </span>
//                 </h6>
//               </label>

//               <select
//                 className="form-select"
//                 name="userGroupId"
//                 value={form.userGroupId}
//                 onChange={handleChange}
//               >
//                 <option value="">
//                   Select User Group
//                 </option>

//                 {userGroups.map((group) => (
//                   <option
//                     key={group.id}
//                     value={group.id}
//                   >
//                     {group.groupName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* MODULE */}

//             <div className="col-md-6 mb-3">
//               <label className="form-label">
//                 <h6>
//                   Module{" "}
//                   <span className="text-danger">
//                     *
//                   </span>
//                 </h6>
//               </label>

//               <select
//                 className="form-select"
//                 name="moduleId"
//                 value={form.moduleId}
//                 onChange={handleChange}
//               >
//                 <option value="">
//                   Select Module
//                 </option>

//                 {modules.map((module) => (
//                   <option
//                     key={module.id}
//                     value={module.id}
//                   >
//                     {module.moduleName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* =================================================
//               PERMISSION TREE
//           ================================================= */}

//           {menus.length > 0 && (
//             <div className="mt-3">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <h5 className="fw-bold mb-1">
//                     Module Permissions
//                   </h5>

//                   <p className="text-muted small mb-0">
//                     Select menus and submenus for this
//                     user group.
//                   </p>
//                 </div>

//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="selectAllMenus"
//                     checked={
//                       menus.length > 0 &&
//                       menus.every((menu) =>
//                         selectedMenus.includes(
//                           menu.id
//                         )
//                       )
//                     }
//                     onChange={(e) =>
//                       handleSelectAll(
//                         e.target.checked
//                       )
//                     }
//                   />

//                   <label
//                     htmlFor="selectAllMenus"
//                     className="form-check-label fw-bold"
//                   >
//                     Select All
//                   </label>
//                 </div>
//               </div>

//               {menus.map((menu) => {
//                 const subMenus =
//                   menu.subMenus || [];

//                 const menuChecked =
//                   selectedMenus.includes(
//                     menu.id
//                   );

//                 const allSubSelected =
//                   subMenus.length > 0 &&
//                   subMenus.every((sub) =>
//                     selectedSubMenus.includes(
//                       sub.id
//                     )
//                   );

//                 return (
//                   <div
//                     key={menu.id}
//                     className="border rounded-3 mb-3 overflow-hidden"
//                   >
//                     {/* MENU HEADER */}

//                     <div
//                       className="p-3"
//                       style={{
//                         background:
//                           "linear-gradient(135deg, rgba(61,87,236,0.08) 0%, rgba(97,150,248,0.08) 50%, rgba(135,221,247,0.08) 100%)",
//                       }}
//                     >
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div className="form-check">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id={`menu_${menu.id}`}
//                             checked={menuChecked}
//                             onChange={(e) =>
//                               handleMenuChange(
//                                 menu,
//                                 e.target.checked
//                               )
//                             }
//                           />

//                           <label
//                             htmlFor={`menu_${menu.id}`}
//                             className="form-check-label fw-bold"
//                           >
//                             <LuMenu
//                               size={16}
//                               className="me-2 text-primary"
//                             />

//                             {menu.menuName}
//                           </label>
//                         </div>

//                         <span className="badge bg-primary-subtle text-primary">
//                           {subMenus.length} Sub Menu
//                           {subMenus.length !== 1
//                             ? "s"
//                             : ""}
//                         </span>
//                       </div>
//                     </div>

//                     {/* SUBMENUS */}

//                     <div className="p-3">
//                       {subMenus.length > 0 ? (
//                         <div className="row">
//                           {subMenus.map((sub) => (
//                             <div
//                               className="col-xl-4 col-md-6 mb-3"
//                               key={sub.id}
//                             >
//                               <div
//                                 className={`border rounded-3 p-3 h-100 ${
//                                   selectedSubMenus.includes(
//                                     sub.id
//                                   )
//                                     ? "border-primary bg-light"
//                                     : ""
//                                 }`}
//                               >
//                                 <div className="form-check">
//                                   <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     id={`sub_${sub.id}`}
//                                     checked={selectedSubMenus.includes(
//                                       sub.id
//                                     )}
//                                     onChange={(e) =>
//                                       handleSubMenuChange(
//                                         menu,
//                                         sub,
//                                         e.target.checked
//                                       )
//                                     }
//                                   />

//                                   <label
//                                     htmlFor={`sub_${sub.id}`}
//                                     className="form-check-label fw-semibold"
//                                   >
//                                     {
//                                       sub.subMenuName
//                                     }
//                                   </label>
//                                 </div>

//                                 <div className="small text-muted mt-2 ms-4">
//                                   {sub.subMenuUrl ||
//                                     "No Path"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="text-muted small">
//                           No Sub Menu Available
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {menus.length === 0 &&
//             form.moduleId && (
//               <div className="alert alert-warning mt-3">
//                 No Menus Found For This Module.
//               </div>
//             )}

//           {/* BUTTONS */}

//           <div className="text-end mt-4">
//             {editingId && (
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary me-2 px-4"
//                 onClick={resetForm}
//               >
//                 <LuRefreshCw
//                   size={17}
//                   className="me-2"
//                 />
//                 Cancel
//               </button>
//             )}

//             <button
//   className={`btn ${
//     isMapped ? "btn-warning" : "btn-primary"
//   } px-5`}
//   onClick={handleSave}
// >
//   {isMapped ? "Update Mapping" : "Save Mapping"}
// </button>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SEARCH HEADER
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-4">
//         <div className="bg-white shadow rounded-2 p-3">
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h5 className="fw-bold mb-1">
//                 User Group Mapping List
//               </h5>

//               <p className="text-muted small mb-0">
//                 View and manage all user group module
//                 permissions.
//               </p>
//             </div>

//             <div
//               className="position-relative"
//               style={{ width: "300px" }}
//             >
//               <LuSearch
//                 size={18}
//                 className="position-absolute text-muted"
//                 style={{
//                   left: "12px",
//                   top: "50%",
//                   transform:
//                     "translateY(-50%)",
//                 }}
//               />

//               <input
//                 type="text"
//                 className="form-control ps-5"
//                 placeholder="Search user group or module..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAPPING LIST
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-3 mb-4">
//         <div className="card border-0 shadow rounded-3 overflow-hidden">
//           {/* HEADER */}

//           <div className="card-header bg-white border-0 p-3">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h5 className="fw-bold mb-1">
//                   Mapping Details
//                 </h5>

//                 <p className="text-muted small mb-0">
//                   User Group → Module → Menu → Sub Menu
//                 </p>
//               </div>

//               <span className="badge bg-primary px-3 py-2">
//                 {filteredMappings.length} Mapping
//                 {filteredMappings.length !== 1
//                   ? "s"
//                   : ""}
//               </span>
//             </div>
//           </div>

//           {/* TABLE */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table  table-bordered align-middle mb-0">
//                 <thead>
//                   <tr
//                     style={{
//                       background:
//                         "linear-gradient(135deg, rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
//                       color: "white",
//                     }}
//                   >
//                     <th
//                       className="text-center"
//                       style={{ width: "7%" }}
//                     >
//                       S.No
//                     </th>

//                     <th style={{ width: "18%" }}>
//                       User Group
//                     </th>

//                     <th style={{ width: "20%" }}>
//                       Module
//                     </th>

//                     <th style={{ width: "22%" }}>
//                       Menu
//                     </th>

//                     <th style={{ width: "23%" }}>
//                       Sub Menu
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{ width: "10%" }}
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredMappings.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="6"
//                         className="text-center py-5 text-muted"
//                       >
//                         <LuBox
//                           size={35}
//                           className="mb-2"
//                         />

//                         <div>
//                           No Mapping Found
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredMappings.map(
//                       (item, index) => {
//                         const menuMappings =
//                           item.menuMappings || [];

//                         const subMenuMappings =
//                           item.subMenuMappings || [];

//                         // =====================================
//                         // GROUP MENUS + SUBMENUS
//                         // =====================================

//                         const groupedMenus =
//                           menuMappings.map(
//                             (menuMap) => {
//                               const menu =
//                                 menuMap.menu;

//                               const menuSubMenus =
//                                 subMenuMappings.filter(
//                                   (subMap) =>
//                                     subMap.subMenu?.menu
//                                       ?.id === menu?.id
//                                 );

//                               return {
//                                 menu,
//                                 subMenus:
//                                   menuSubMenus,
//                               };
//                             }
//                           );

//                         // =====================================
//                         // NO MENU
//                         // =====================================

//                         if (
//                           groupedMenus.length ===
//                           0
//                         ) {
//                           return (
//                             <tr key={item.id}>
//                               <td className="text-center">
//                                 {index + 1}
//                               </td>

//                               <td className="fw-semibold">
//                                 {
//                                   item.userGroup
//                                     ?.groupName
//                                 }
//                               </td>

//                               <td>
//                                 <span className="badge bg-primary-subtle text-primary px-3 py-2">
//                                   {
//                                     item.module
//                                       ?.moduleName
//                                   }
//                                 </span>
//                               </td>

//                               <td>
//                                 <span className="text-muted">
//                                   No Menu
//                                 </span>
//                               </td>

//                               <td>
//                                 <span className="text-muted">
//                                   No Sub Menu
//                                 </span>
//                               </td>

//                               <td className="text-center">
//                                 <div className="d-flex justify-content-center gap-2">
//                                   <button
//                                     className="btn btn-outline-primary btn-sm"
//                                     title="Edit"
//                                     onClick={() =>
//                                       editMapping(
//                                         item.id
//                                       )
//                                     }
//                                   >
//                                     <LuPencil
//                                       size={16}
//                                     />
//                                   </button>

//                                   <button
//                                     className="btn btn-outline-danger btn-sm"
//                                     title="Delete"
//                                     onClick={() =>
//                                       deleteMapping(
//                                         item.id
//                                       )
//                                     }
//                                   >
//                                     <LuTrash2
//                                       size={16}
//                                     />
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           );
//                         }

//                         // =====================================
//                         // TOTAL ROWS
//                         // =====================================

//                         const totalRows =
//                           groupedMenus.reduce(
//                             (total, group) =>
//                               total +
//                               Math.max(
//                                 group.subMenus
//                                   .length,
//                                 1
//                               ),
//                             0
//                           );

//                         let currentRow = 0;

//                         // =====================================
//                         // TABLE ROWS
//                         // =====================================

//                         return groupedMenus.flatMap(
//                           (group) => {
//                             const rows =
//                               group.subMenus
//                                 .length > 0
//                                 ? group.subMenus
//                                 : [null];

//                             return rows.map(
//                               (
//                                 subMenu,
//                                 subIndex
//                               ) => {
//                                 const firstOverall =
//                                   currentRow ===
//                                   0;

//                                 const firstMenu =
//                                   subIndex === 0;

//                                 const row = (
//                                   <tr
//                                     key={`${item.id}-${group.menu?.id}-${subMenu?.subMenu?.id || "no-sub"}`}
//                                   >
//                                     {/* S.NO */}

//                                     {firstOverall && (
//                                       <td
//                                         rowSpan={
//                                           totalRows
//                                         }
//                                         className="text-center fw-semibold"
//                                       >
//                                         {index + 1}
//                                       </td>
//                                     )}

//                                     {/* USER GROUP */}

//                                     {firstOverall && (
//                                       <td
//                                         rowSpan={
//                                           totalRows
//                                         }
//                                         className="fw-semibold"
//                                       >
//                                         {
//                                           item
//                                             .userGroup
//                                             ?.groupName
//                                         }
//                                       </td>
//                                     )}

//                                     {/* MODULE */}

//                                     {firstOverall && (
//                                       <td
//                                         rowSpan={
//                                           totalRows
//                                         }
//                                       >
//                                         <span className="badge bg-primary-subtle text-primary px-3 py-2">
//                                           {
//                                             item
//                                               .module
//                                               ?.moduleName
//                                           }
//                                         </span>
//                                       </td>
//                                     )}

//                                     {/* MENU */}

//                                     {firstMenu && (
//                                       <td
//                                         rowSpan={
//                                           rows.length
//                                         }
//                                       >
//                                         <div className="fw-semibold">
//                                           {
//                                             group.menu
//                                               ?.menuName
//                                           }
//                                         </div>

//                                         <div className="small text-muted mt-1">
//                                           {
//                                             group.menu
//                                               ?.menuUrl
//                                           }
//                                         </div>
//                                       </td>
//                                     )}

//                                     {/* SUB MENU */}

//                                     <td>
//                                       {subMenu ? (
//                                         <div>
//                                           <div className="fw-medium">
//                                             {
//                                               subMenu
//                                                 .subMenu
//                                                 ?.subMenuName
//                                             }
//                                           </div>

//                                           <div className="small text-muted mt-1">
//                                             {
//                                               subMenu
//                                                 .subMenu
//                                                 ?.subMenuUrl
//                                             }
//                                           </div>
//                                         </div>
//                                       ) : (
//                                         <span className="text-muted">
//                                           No Sub Menu
//                                         </span>
//                                       )}
//                                     </td>

//                                     {/* ACTION */}

//                                     {firstOverall && (
//                                       <td
//                                         rowSpan={
//                                           totalRows
//                                         }
//                                         className="text-center"
//                                       >
//                                         <div className="d-flex justify-content-center gap-2">
//                                           <button
//                                             className="btn btn-outline-primary btn-sm"
//                                             title="Edit"
//                                             onClick={() =>
//                                               editMapping(
//                                                 item.id
//                                               )
//                                             }
//                                           >
//                                             <LuPencil
//                                               size={
//                                                 16
//                                               }
//                                             />
//                                           </button>

//                                           <button
//                                             className="btn btn-outline-danger btn-sm"
//                                             title="Delete"
//                                             onClick={() =>
//                                               deleteMapping(
//                                                 item.id
//                                               )
//                                             }
//                                           >
//                                             <LuTrash2
//                                               size={
//                                                 16
//                                               }
//                                             />
//                                           </button>
//                                         </div>
//                                       </td>
//                                     )}
//                                   </tr>
//                                 );

//                                 currentRow++;

//                                 return row;
//                               }
//                             );
//                           }
//                         );
//                       }
//                     )
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserGroupMapping;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import {
  LuPencil,
  LuTrash2,
  LuSearch,
  LuRefreshCw,
  LuSave,
  LuUsers,
  LuBox,
  LuMenu,
  LuShieldCheck,
  LuLayers3,
  LuCheck,
  LuCircleCheck,
} from "react-icons/lu";

const UserGroupMapping = () => {
  const [modules, setModules] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [menus, setMenus] = useState([]);
  const [mappings, setMappings] = useState([]);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isMapped, setIsMapped] = useState(false);
  const [mappedId, setMappedId] = useState(null);

  const [form, setForm] = useState({
    userGroupId: "",
    moduleId: "",
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedSubMenus, setSelectedSubMenus] = useState([]);

  // =========================================================
  // LOAD INITIAL DATA
  // =========================================================

  useEffect(() => {
    loadModules();
    loadUserGroups();
    loadMappings();
  }, []);

  // =========================================================
  // LOAD MAPPINGS
  // =========================================================

  const loadMappings = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/user-group-mapping/all"
      );

      setMappings(res.data || []);
    } catch (err) {
      console.error("Error loading mappings:", err);
    }
  };

  // =========================================================
  // LOAD MODULES
  // =========================================================

  const loadModules = async () => {
    try {
      const res = await axiosInstance.get("/api/module/all");

      setModules(res.data || []);
    } catch (err) {
      console.error("Error loading modules:", err);
    }
  };

  // =========================================================
  // LOAD USER GROUPS
  // =========================================================

  const loadUserGroups = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group/all");

      setUserGroups(res.data || []);
    } catch (err) {
      console.error("Error loading user groups:", err);
    }
  };

  // =========================================================
  // CHECK EXISTING MAPPING
  // =========================================================

  const checkExistingMapping = (userGroupId, moduleId) => {
    if (!userGroupId || !moduleId) {
      setIsMapped(false);
      setMappedId(null);
      setEditingId(null);
      setSelectedMenus([]);
      setSelectedSubMenus([]);
      return;
    }

    const existingMapping = mappings.find(
      (item) =>
        Number(item.userGroup?.id) === Number(userGroupId) &&
        Number(item.module?.id) === Number(moduleId)
    );

    if (existingMapping) {
      setIsMapped(true);
      setMappedId(existingMapping.id);
      setEditingId(existingMapping.id);

      setSelectedMenus(
        (existingMapping.menuMappings || []).map(
          (m) => m.menu.id
        )
      );

      setSelectedSubMenus(
        (existingMapping.subMenuMappings || []).map(
          (s) => s.subMenu.id
        )
      );
    } else {
      setIsMapped(false);
      setMappedId(null);
      setEditingId(null);
      setSelectedMenus([]);
      setSelectedSubMenus([]);
    }
  };

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = async (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    if (name === "moduleId") {
      if (!value) {
        setMenus([]);
        setSelectedMenus([]);
        setSelectedSubMenus([]);
        setIsMapped(false);
        setMappedId(null);
        setEditingId(null);
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/api/menu/module/${value}`
        );

        setMenus(res.data || []);

        checkExistingMapping(
          form.userGroupId,
          value
        );
      } catch (err) {
        console.error(err);
        setMenus([]);
      }
    }

    if (name === "userGroupId") {
      if (!value) {
        setSelectedMenus([]);
        setSelectedSubMenus([]);
        setIsMapped(false);
        setMappedId(null);
        setEditingId(null);
        return;
      }

      if (form.moduleId) {
        checkExistingMapping(
          value,
          form.moduleId
        );
      }
    }
  };

  useEffect(() => {
    if (
      form.userGroupId &&
      form.moduleId &&
      mappings.length > 0
    ) {
      checkExistingMapping(
        form.userGroupId,
        form.moduleId
      );
    }
  }, [mappings]);

  // =========================================================
  // MENU CHECK
  // =========================================================

  const handleMenuChange = (menu, checked) => {
    let selected = [...selectedMenus];
    let subSelected = [...selectedSubMenus];

    if (checked) {
      if (!selected.includes(menu.id)) {
        selected.push(menu.id);
      }

      (menu.subMenus || []).forEach((sub) => {
        if (!subSelected.includes(sub.id)) {
          subSelected.push(sub.id);
        }
      });
    } else {
      selected = selected.filter(
        (id) => id !== menu.id
      );

      (menu.subMenus || []).forEach((sub) => {
        subSelected = subSelected.filter(
          (id) => id !== sub.id
        );
      });
    }

    setSelectedMenus(selected);
    setSelectedSubMenus(subSelected);
  };

  // =========================================================
  // SUB MENU CHECK
  // =========================================================

  const handleSubMenuChange = (
    menu,
    sub,
    checked
  ) => {
    let selectedSub = [...selectedSubMenus];
    let selectedMenu = [...selectedMenus];

    if (checked) {
      if (!selectedSub.includes(sub.id)) {
        selectedSub.push(sub.id);
      }

      if (!selectedMenu.includes(menu.id)) {
        selectedMenu.push(menu.id);
      }
    } else {
      selectedSub = selectedSub.filter(
        (id) => id !== sub.id
      );

      const anySubSelected = (
        menu.subMenus || []
      ).some((item) =>
        selectedSub.includes(item.id)
      );

      if (!anySubSelected) {
        selectedMenu = selectedMenu.filter(
          (id) => id !== menu.id
        );
      }
    }

    setSelectedMenus(selectedMenu);
    setSelectedSubMenus(selectedSub);
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const handleSelectAll = (checked) => {
    if (checked) {
      const menuIds = menus.map(
        (menu) => menu.id
      );

      const subMenuIds = menus.flatMap(
        (menu) =>
          (menu.subMenus || []).map(
            (sub) => sub.id
          )
      );

      setSelectedMenus(menuIds);
      setSelectedSubMenus(subMenuIds);
    } else {
      setSelectedMenus([]);
      setSelectedSubMenus([]);
    }
  };

  // =========================================================
  // SAVE / UPDATE
  // =========================================================

  const handleSave = async () => {
    if (!form.userGroupId) {
      alert("Please Select User Group");
      return;
    }

    if (!form.moduleId) {
      alert("Please Select Module");
      return;
    }

    const payload = {
      userGroupId: Number(form.userGroupId),
      moduleId: Number(form.moduleId),
      menuIds: selectedMenus,
      subMenuIds: selectedSubMenus,
    };

    try {
      if (isMapped && mappedId) {
        await axiosInstance.put(
          `/api/user-group-mapping/update/${mappedId}`,
          payload
        );

        alert("Mapping Updated Successfully");
      } else {
        await axiosInstance.post(
          "/api/user-group-mapping/save",
          payload
        );

        alert("Mapping Saved Successfully");
      }

      await loadMappings();

      setIsMapped(false);
      setMappedId(null);
      setEditingId(null);

      setForm({
        userGroupId: "",
        moduleId: "",
      });

      setMenus([]);
      setSelectedMenus([]);
      setSelectedSubMenus([]);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data ||
          "Failed To Save Mapping"
      );
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const deleteMapping = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this mapping?"
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/user-group-mapping/${id}`
      );

      alert("Mapping Deleted Successfully");

      loadMappings();
    } catch (err) {
      console.error("Delete error:", err);

      alert("Unable to Delete Mapping");
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const editMapping = async (id) => {
    try {
      const res = await axiosInstance.get(
        `/api/user-group-mapping/${id}`
      );

      const data = res.data;

      setEditingId(id);
      setMappedId(id);
      setIsMapped(true);

      setForm({
        userGroupId:
          data.userGroup?.id || "",
        moduleId:
          data.module?.id || "",
      });

      const menuRes = await axiosInstance.get(
        `/api/menu/module/${data.module?.id}`
      );

      setMenus(menuRes.data || []);

      setSelectedMenus(
        (data.menuMappings || []).map(
          (m) => m.menu.id
        )
      );

      setSelectedSubMenus(
        (data.subMenuMappings || []).map(
          (s) => s.subMenu.id
        )
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(
        "Edit mapping error:",
        err
      );

      alert("Unable to load mapping");
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setEditingId(null);
    setIsMapped(false);
    setMappedId(null);

    setForm({
      userGroupId: "",
      moduleId: "",
    });

    setMenus([]);
    setSelectedMenus([]);
    setSelectedSubMenus([]);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredMappings = mappings.filter(
    (item) => {
      const group =
        item.userGroup?.groupName?.toLowerCase() ||
        "";

      const module =
        item.module?.moduleName?.toLowerCase() ||
        "";

      return (
        group.includes(
          search.toLowerCase()
        ) ||
        module.includes(
          search.toLowerCase()
        )
      );
    }
  );

  const totalSelected =
    selectedMenus.length +
    selectedSubMenus.length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <style>{`
        .ugm-page-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );
          border: 1px solid #dbeafe;
        }

        .ugm-title-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: white;
          box-shadow:
            0 8px 20px rgba(
              37,
              99,
              235,
              0.22
            );
        }

        .ugm-section-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: white;
          box-shadow:
            0 6px 16px rgba(
              37,
              99,
              235,
              0.18
            );
        }

        .ugm-breadcrumb {
          background: rgba(
            239,
            246,
            255,
            0.75
          );
          border-top: 1px solid #e0ecff;
        }

        .ugm-input,
        .ugm-select {
          min-height: 42px;
          border-radius: 10px !important;
          border-color: #dbeafe !important;
        }

        .ugm-input:focus,
        .ugm-select:focus {
          border-color: #60a5fa !important;
          box-shadow:
            0 0 0 0.2rem
            rgba(37, 99, 235, 0.1) !important;
        }

        .ugm-permission-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 100%
          );
          border: 1px solid #dbeafe;
        }

        .ugm-menu-card {
          border: 1px solid #dbeafe !important;
          transition: all 0.2s ease;
        }

        .ugm-menu-card:hover {
          box-shadow:
            0 6px 18px
            rgba(37, 99, 235, 0.08);
        }

        .ugm-menu-header {
          background: #eff6ff;
          border-bottom: 1px solid #dbeafe;
        }

        .ugm-menu-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: white;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .ugm-sub-card {
          border: 1px solid #e2e8f0 !important;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .ugm-sub-card:hover {
          border-color: #bfdbfe !important;
          background: #f8fbff;
        }

        .ugm-sub-card.selected {
          border-color: #93c5fd !important;
          background: #eff6ff;
        }

        .ugm-url {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          padding: 4px 7px;
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ugm-code-badge {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .ugm-count-badge {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .ugm-edit-badge {
          background: #fff7ed;
          color: #c2410c;
          border: 1px solid #fed7aa;
        }

        .ugm-action {
          width: 34px;
          height: 34px;
          border-radius: 10px !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 !important;
        }

        .ugm-action-edit {
          color: #2563eb !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
        }

        .ugm-action-delete {
          color: #dc2626 !important;
          background: #fef2f2 !important;
          border: 1px solid #fecaca !important;
        }

        .ugm-table thead th {
          background: #eff6ff !important;
          color: #1e3a8a !important;
          border-color: #dbeafe !important;
          font-size: 12px;
          font-weight: 700;
          padding: 13px 12px;
          white-space: nowrap;
        }

        .ugm-table tbody td {
          border-color: #edf2f7 !important;
          padding: 13px 12px;
          font-size: 12px;
        }

        .ugm-table tbody tr:hover {
          background: #f8fbff;
        }

        .ugm-module-badge {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          font-weight: 600;
        }

        .ugm-submenu-badge {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .ugm-search-box {
          max-width: 330px;
        }

        @media (max-width: 768px) {
          .ugm-title-row {
            align-items: flex-start !important;
          }

          .ugm-header-action {
            width: 100%;
          }

          .ugm-search-box {
            width: 100%;
            max-width: none;
          }

          .ugm-permission-top {
            align-items: flex-start !important;
            flex-direction: column;
          }
        }

        @media (max-width: 576px) {
          .ugm-table {
            min-width: 950px;
          }

          .ugm-action-group {
            justify-content: flex-start !important;
          }
        }
      `}</style>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="ugm-page-header rounded-4 shadow overflow-hidden">

          <div className="p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 ugm-title-row">

              <div className="d-flex align-items-center gap-3">

                <div className="ugm-title-icon d-flex align-items-center justify-content-center">
                  <LuShieldCheck size={27} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1 text-dark">
                    User Group Mapping
                  </h5>

                  <div className="text-muted small">
                    Manage modules, menus and
                    submenu permissions for user groups.
                  </div>
                </div>

              </div>

              {editingId && (
                <span className="ugm-edit-badge rounded-3 px-3 py-2 small fw-semibold">
                  Editing Mapping
                </span>
              )}

            </div>
          </div>

          <div className="ugm-breadcrumb px-4 py-2">
            <small className="text-muted">
              Dashboard › Module Management ›{" "}
              <span className="text-primary fw-semibold">
                User Group Mapping
              </span>
            </small>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAPPING FORM
      ===================================================== */}

      <div className="mx-2 mb-3">
        <div className="card shadow border-0 rounded-4 overflow-hidden">

          <div className="card-header bg-white border-0 p-3 p-md-4">

            <div className="d-flex align-items-center gap-3">

              <div className="ugm-section-icon d-flex align-items-center justify-content-center">
                <LuUsers size={21} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  {editingId
                    ? "Update User Group Mapping"
                    : "Create User Group Mapping"}
                </h6>

                <small className="text-muted">
                  Select a user group and module
                  to configure permissions.
                </small>
              </div>

            </div>

          </div>

          <div className="card-body p-3 p-md-4">

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="row g-3">

              {/* USER GROUP */}

              <div className="col-md-6">

                <label className="form-label fw-semibold small">
                  User Group{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select ugm-select"
                  name="userGroupId"
                  value={form.userGroupId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select User Group
                  </option>

                  {userGroups.map((group) => (
                    <option
                      key={group.id}
                      value={group.id}
                    >
                      {group.groupName}
                    </option>
                  ))}
                </select>

              </div>

              {/* MODULE */}

              <div className="col-md-6">

                <label className="form-label fw-semibold small">
                  Module{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select ugm-select"
                  name="moduleId"
                  value={form.moduleId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Module
                  </option>

                  {modules.map((module) => (
                    <option
                      key={module.id}
                      value={module.id}
                    >
                      {module.moduleName}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* =================================================
                PERMISSION TREE
            ================================================= */}

            {menus.length > 0 && (
              <div className="mt-4">

                <div className="ugm-permission-header rounded-4 p-3 mb-3">

                  <div className="d-flex justify-content-between align-items-center gap-3 ugm-permission-top">

                    <div className="d-flex align-items-center gap-3">

                      <div className="ugm-menu-icon d-flex align-items-center justify-content-center">
                        <LuMenu size={19} />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Module Permissions
                        </h6>

                        <small className="text-muted">
                          Select menus and submenus
                          available to this user group.
                        </small>
                      </div>

                    </div>

                    <div className="d-flex align-items-center gap-3">

                      <span className="ugm-count-badge rounded-3 px-3 py-2 small fw-semibold">
                        {selectedMenus.length} Menus
                        {" • "}
                        {selectedSubMenus.length} Submenus
                      </span>

                      <div className="form-check mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="selectAllMenus"
                          checked={
                            menus.length > 0 &&
                            menus.every((menu) =>
                              selectedMenus.includes(
                                menu.id
                              )
                            )
                          }
                          onChange={(e) =>
                            handleSelectAll(
                              e.target.checked
                            )
                          }
                        />

                        <label
                          htmlFor="selectAllMenus"
                          className="form-check-label fw-semibold small"
                        >
                          Select All
                        </label>
                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    MENUS
                ================================================= */}

                {menus.map((menu) => {

                  const subMenus =
                    menu.subMenus || [];

                  const menuChecked =
                    selectedMenus.includes(
                      menu.id
                    );

                  return (
                    <div
                      key={menu.id}
                      className="ugm-menu-card rounded-4 mb-3 overflow-hidden"
                    >

                      {/* MENU HEADER */}

                      <div className="ugm-menu-header p-3">

                        <div className="d-flex justify-content-between align-items-center gap-3">

                          <div className="form-check mb-0">

                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`menu_${menu.id}`}
                              checked={menuChecked}
                              onChange={(e) =>
                                handleMenuChange(
                                  menu,
                                  e.target.checked
                                )
                              }
                            />

                            <label
                              htmlFor={`menu_${menu.id}`}
                              className="form-check-label fw-bold d-flex align-items-center"
                            >
                              <span className="ugm-menu-icon d-inline-flex align-items-center justify-content-center me-2">
                                <LuMenu size={16} />
                              </span>

                              {menu.menuName}
                            </label>

                          </div>

                          <span className="ugm-count-badge rounded-3 px-2 py-1 small fw-semibold">
                            {subMenus.length} Sub Menu
                            {subMenus.length !== 1
                              ? "s"
                              : ""}
                          </span>

                        </div>

                      </div>

                      {/* SUBMENUS */}

                      <div className="p-3">

                        {subMenus.length > 0 ? (

                          <div className="row g-3">

                            {subMenus.map((sub) => {

                              const selected =
                                selectedSubMenus.includes(
                                  sub.id
                                );

                              return (
                                <div
                                  className="col-xl-4 col-lg-6 col-md-6"
                                  key={sub.id}
                                >

                                  <div
                                    className={`ugm-sub-card rounded-3 p-3 h-100 ${
                                      selected
                                        ? "selected"
                                        : ""
                                    }`}
                                  >

                                    <div className="d-flex align-items-start gap-2">

                                      <div className="form-check pt-1">

                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={`sub_${sub.id}`}
                                          checked={
                                            selected
                                          }
                                          onChange={(e) =>
                                            handleSubMenuChange(
                                              menu,
                                              sub,
                                              e.target.checked
                                            )
                                          }
                                        />

                                      </div>

                                      <div className="flex-grow-1">

                                        <label
                                          htmlFor={`sub_${sub.id}`}
                                          className="form-check-label fw-semibold small"
                                          style={{
                                            cursor:
                                              "pointer",
                                          }}
                                        >
                                          {sub.subMenuName}
                                        </label>

                                        <div className="mt-2">

                                          <span className="ugm-url text-muted small">
                                            {sub.subMenuUrl ||
                                              "No Path"}
                                          </span>

                                        </div>

                                      </div>

                                      {selected && (
                                        <LuCircleCheck
                                          size={17}
                                          className="text-primary mt-1"
                                        />
                                      )}

                                    </div>

                                  </div>

                                </div>
                              );
                            })}

                          </div>

                        ) : (

                          <div className="text-muted small d-flex align-items-center gap-2">
                            <LuBox size={16} />
                            No Sub Menu Available
                          </div>

                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

            {/* NO MENUS */}

            {menus.length === 0 &&
              form.moduleId && (
                <div className="alert alert-warning border-0 rounded-3 mt-4 mb-0">
                  <strong>No Menus Found.</strong>{" "}
                  No menus are available for this
                  module.
                </div>
              )}

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="d-flex justify-content-end align-items-center gap-2 mt-4 pt-3 border-top flex-wrap">

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={resetForm}
                >
                  <LuRefreshCw
                    size={16}
                    className="me-1"
                  />
                  Cancel
                </button>
              )}

              <button
                type="button"
                className="btn btn-light border rounded-3 px-4"
                onClick={resetForm}
              >
                Reset
              </button>

              <button
                type="button"
                className="btn btn-primary rounded-3 px-4"
                onClick={handleSave}
              >
                {isMapped ? (
                  <>
                    <LuSave
                      size={17}
                      className="me-1"
                    />
                    Update Mapping
                  </>
                ) : (
                  <>
                    <LuSave
                      size={17}
                      className="me-1"
                    />
                    Save Mapping
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mx-2 mt-4">

        <div className="card shadow border-0 rounded-4">

          <div className="card-body p-3 p-md-4">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

              <div className="d-flex align-items-center gap-3">

                <div className="ugm-section-icon d-flex align-items-center justify-content-center">
                  <LuSearch size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Search User Group Mappings
                  </h6>

                  <small className="text-muted">
                    Search by user group or module.
                  </small>
                </div>

              </div>

              <div
                className="position-relative ugm-search-box"
                style={{ width: "330px" }}
              >

                <LuSearch
                  size={17}
                  className="position-absolute text-muted"
                  style={{
                    left: "13px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                  }}
                />

                <input
                  type="text"
                  className="form-control ugm-input ps-5"
                  placeholder="Search user group or module..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAPPING LIST
      ===================================================== */}

      <div className="mx-2 mt-3 mb-4">

        <div className="card shadow border-0 rounded-4 overflow-hidden">

          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3 p-md-4">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

              <div className="d-flex align-items-center gap-3">

                <div className="ugm-section-icon d-flex align-items-center justify-content-center">
                  <LuLayers3 size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Mapping Details
                  </h6>

                  <small className="text-muted">
                    User Group → Module → Menu → Sub Menu
                  </small>
                </div>

              </div>

              <span className="ugm-count-badge rounded-3 px-3 py-2 small fw-semibold">
                {filteredMappings.length} Mapping
                {filteredMappings.length !== 1
                  ? "s"
                  : ""}
              </span>

            </div>

          </div>

          {/* TABLE */}

          <div className="card-body p-0">

            <div className="table-responsive">

              <table className="table ugm-table align-middle mb-0">

                <thead>
                  <tr>

                    <th
                      className="text-center"
                      style={{
                        width: "7%",
                      }}
                    >
                      S.No
                    </th>

                    <th
                      style={{
                        width: "18%",
                      }}
                    >
                      User Group
                    </th>

                    <th
                      style={{
                        width: "20%",
                      }}
                    >
                      Module
                    </th>

                    <th
                      style={{
                        width: "22%",
                      }}
                    >
                      Menu
                    </th>

                    <th
                      style={{
                        width: "23%",
                      }}
                    >
                      Sub Menu
                    </th>

                    <th
                      className="text-center"
                      style={{
                        width: "10%",
                      }}
                    >
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredMappings.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >

                        <div
                          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-4"
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            border:
                              "1px solid #dbeafe",
                          }}
                        >
                          <LuBox size={28} />
                        </div>

                        <div className="fw-semibold">
                          No Mapping Found
                        </div>

                        <small className="text-muted">
                          Try changing your search
                          criteria.
                        </small>

                      </td>

                    </tr>

                  ) : (

                    filteredMappings.map(
                      (item, index) => {

                        const menuMappings =
                          item.menuMappings || [];

                        const subMenuMappings =
                          item.subMenuMappings || [];

                        // =================================
                        // GROUP MENUS
                        // =================================

                        const groupedMenus =
                          menuMappings.map(
                            (menuMap) => {

                              const menu =
                                menuMap.menu;

                              const menuSubMenus =
                                subMenuMappings.filter(
                                  (subMap) =>
                                    subMap.subMenu
                                      ?.menu
                                      ?.id ===
                                    menu?.id
                                );

                              return {
                                menu,
                                subMenus:
                                  menuSubMenus,
                              };
                            }
                          );

                        // =================================
                        // NO MENU
                        // =================================

                        if (
                          groupedMenus.length === 0
                        ) {

                          return (
                            <tr
                              key={item.id}
                            >

                              <td className="text-center fw-semibold">
                                {index + 1}
                              </td>

                              <td className="fw-semibold">
                                {
                                  item.userGroup
                                    ?.groupName
                                }
                              </td>

                              <td>

                                <span className="ugm-module-badge rounded-3 px-3 py-2">
                                  {
                                    item.module
                                      ?.moduleName
                                  }
                                </span>

                              </td>

                              <td>
                                <span className="text-muted">
                                  No Menu
                                </span>
                              </td>

                              <td>
                                <span className="text-muted">
                                  No Sub Menu
                                </span>
                              </td>

                              <td className="text-center">

                                <div className="d-flex justify-content-center gap-2 ugm-action-group">

                                  <button
                                    type="button"
                                    className="btn ugm-action ugm-action-edit"
                                    title="Edit"
                                    onClick={() =>
                                      editMapping(
                                        item.id
                                      )
                                    }
                                  >
                                    <LuPencil
                                      size={15}
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    className="btn ugm-action ugm-action-delete"
                                    title="Delete"
                                    onClick={() =>
                                      deleteMapping(
                                        item.id
                                      )
                                    }
                                  >
                                    <LuTrash2
                                      size={15}
                                    />
                                  </button>

                                </div>

                              </td>

                            </tr>
                          );
                        }

                        // =================================
                        // TOTAL ROWS
                        // =================================

                        const totalRows =
                          groupedMenus.reduce(
                            (total, group) =>
                              total +
                              Math.max(
                                group.subMenus
                                  .length,
                                1
                              ),
                            0
                          );

                        let currentRow = 0;

                        // =================================
                        // TABLE ROWS
                        // =================================

                        return groupedMenus.flatMap(
                          (group) => {

                            const rows =
                              group.subMenus
                                .length > 0
                                ? group.subMenus
                                : [null];

                            return rows.map(
                              (
                                subMenu,
                                subIndex
                              ) => {

                                const firstOverall =
                                  currentRow === 0;

                                const firstMenu =
                                  subIndex === 0;

                                const row = (
                                  <tr
                                    key={`${item.id}-${group.menu?.id}-${subMenu?.subMenu?.id || "no-sub"}`}
                                  >

                                    {/* S.NO */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="text-center fw-semibold text-muted"
                                      >
                                        {index + 1}
                                      </td>
                                    )}

                                    {/* USER GROUP */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="fw-semibold"
                                      >
                                        <div className="d-flex align-items-center gap-2">

                                          <span
                                            className="d-inline-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                              width: "34px",
                                              height: "34px",
                                              background:
                                                "#eff6ff",
                                              color:
                                                "#2563eb",
                                              border:
                                                "1px solid #dbeafe",
                                            }}
                                          >
                                            <LuUsers
                                              size={16}
                                            />
                                          </span>

                                          <span>
                                            {
                                              item
                                                .userGroup
                                                ?.groupName
                                            }
                                          </span>

                                        </div>
                                      </td>
                                    )}

                                    {/* MODULE */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                      >
                                        <span className="ugm-module-badge rounded-3 px-3 py-2">
                                          {
                                            item
                                              .module
                                              ?.moduleName
                                          }
                                        </span>
                                      </td>
                                    )}

                                    {/* MENU */}

                                    {firstMenu && (
                                      <td
                                        rowSpan={
                                          rows.length
                                        }
                                      >

                                        <div className="d-flex align-items-start gap-2">

                                          <span
                                            className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                                            style={{
                                              width:
                                                "32px",
                                              height:
                                                "32px",
                                              background:
                                                "#eff6ff",
                                              color:
                                                "#2563eb",
                                              border:
                                                "1px solid #dbeafe",
                                            }}
                                          >
                                            <LuMenu
                                              size={15}
                                            />
                                          </span>

                                          <div>

                                            <div className="fw-semibold">
                                              {
                                                group
                                                  .menu
                                                  ?.menuName
                                              }
                                            </div>

                                            <div className="small text-muted mt-1">
                                              {
                                                group
                                                  .menu
                                                  ?.menuUrl
                                              }
                                            </div>

                                          </div>

                                        </div>

                                      </td>
                                    )}

                                    {/* SUB MENU */}

                                    <td>

                                      {subMenu ? (

                                        <div>

                                          <div className="d-flex align-items-center gap-2">

                                            <span
                                              style={{
                                                width:
                                                  "7px",
                                                height:
                                                  "7px",
                                                borderRadius:
                                                  "50%",
                                                background:
                                                  "#2563eb",
                                                display:
                                                  "inline-block",
                                              }}
                                            />

                                            <span className="fw-semibold">
                                              {
                                                subMenu
                                                  .subMenu
                                                  ?.subMenuName
                                              }
                                            </span>

                                          </div>

                                          <div className="small text-muted mt-1 ms-3">
                                            {
                                              subMenu
                                                .subMenu
                                                ?.subMenuUrl
                                            }
                                          </div>

                                        </div>

                                      ) : (

                                        <span className="text-muted">
                                          No Sub Menu
                                        </span>

                                      )}

                                    </td>

                                    {/* ACTION */}

                                    {firstOverall && (
                                      <td
                                        rowSpan={
                                          totalRows
                                        }
                                        className="text-center"
                                      >

                                        <div className="d-flex justify-content-center gap-2 ugm-action-group">

                                          <button
                                            type="button"
                                            className="btn ugm-action ugm-action-edit"
                                            title="Edit"
                                            onClick={() =>
                                              editMapping(
                                                item.id
                                              )
                                            }
                                          >
                                            <LuPencil
                                              size={15}
                                            />
                                          </button>

                                          <button
                                            type="button"
                                            className="btn ugm-action ugm-action-delete"
                                            title="Delete"
                                            onClick={() =>
                                              deleteMapping(
                                                item.id
                                              )
                                            }
                                          >
                                            <LuTrash2
                                              size={15}
                                            />
                                          </button>

                                        </div>

                                      </td>
                                    )}

                                  </tr>
                                );

                                currentRow++;

                                return row;
                              }
                            );
                          }
                        );
                      }
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

          {filteredMappings.length > 0 && (
            <div className="card-footer bg-white border-0 px-3 py-3">

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {filteredMappings.length}
                  </strong>{" "}
                  mapping
                  {filteredMappings.length !== 1
                    ? "s"
                    : ""}
                </small>

                <div className="d-flex align-items-center gap-2">

                  <span
                    className="d-inline-flex align-items-center gap-1 rounded-3 px-3 py-2"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    <LuCircleCheck size={14} />
                    Permissions Managed
                  </span>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default UserGroupMapping;