// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
// import axiosInstance from "../../../api/axiosInstance";
// import { IoIosListBox } from "react-icons/io";
// import { MdGridView } from "react-icons/md";

// const MenuCreation = () => {
//   const [modules, setModules] = useState([]);
//   console.log("Modules:", modules);
//   const [userGroups, setUserGroups] = useState([]);
//   console.log("User Groups:", userGroups);

//   const loadUserGroups = async () => {
//     try {
//       const res = await axiosInstance.get("/api/user-group/all");

//       setUserGroups(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadModules();
//     loadUserGroups();
//   }, []);

//   const loadModules = async () => {
//     try {
//       const res = await axiosInstance.get("/api/module/all");

//       const filteredModules = res.data.filter(
//         (module) => module.hasMenu === true,
//       );

//       setModules(filteredModules);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const [form, setForm] = useState({
//     moduleId: "",
//     menuName: "",
//     menuUrl: "",

//     displayOrder: 1,
//     status: "Active",
//     hasSubMenu: false,
//   });

//   const [subMenus, setSubMenus] = useState([
//     {
//       subMenuName: "",
//       subMenuUrl: "",

//       displayOrder: 1,
//     },
//   ]);

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;

//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubMenuChange = (index, e) => {
//     const values = [...subMenus];
//     values[index][e.target.name] = e.target.value;
//     setSubMenus(values);
//   };

//   const addSubMenu = () => {
//     setSubMenus([
//       ...subMenus,
//       {
//         subMenuName: "",
//         subMenuUrl: "",

//         displayOrder: subMenus.length + 1,
//       },
//     ]);
//   };

//   const removeSubMenu = (index) => {
//     const values = [...subMenus];
//     values.splice(index, 1);
//     setSubMenus(values);
//   };

//   const handleSave = async () => {
//     if (!form.moduleId) {
//       alert("Please Select Module");
//       return;
//     }

//     if (!form.menuName.trim()) {
//       alert("Enter Menu Name");
//       return;
//     }

//     if (!form.menuUrl.trim()) {
//       alert("Enter Menu URL");
//       return;
//     }

//     const payload = {
//       moduleId: Number(form.moduleId),
//       menuName: form.menuName,
//       menuUrl: form.menuUrl,
//       displayOrder: Number(form.displayOrder),
//       status: form.status,
//       hasSubMenu: form.hasSubMenu,
//       subMenus: form.hasSubMenu ? subMenus : [],
//     };

//     console.log(payload);

//     try {
//       const response = await axiosInstance.post("/api/menu/create", payload);

//       alert(response.data);

//       // Reset Form
//       setForm({
//         moduleId: "",
//         menuName: "",
//         menuUrl: "",
//         displayOrder: 1,
//         status: "Active",
//         hasSubMenu: false,
//       });

//       setSubMenus([
//         {
//           subMenuName: "",
//           subMenuUrl: "",
//           displayOrder: 1,
//         },
//       ]);
//     } catch (error) {
//       console.log(error);

//       alert("Failed to Save Menu");
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{ minHeight: "70px" }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">Menu Creation</h4>

//               <p className="text-muted mb-2">
//                 Create menus and submenus under modules.
//               </p>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-dark">
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">Menu Management</li>

//                   <li className="breadcrumb-item active text-primary">
//                     Menu Creation
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
//               Back to Menu List
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="container-fluid mt-3 px-2">
//         <div className="bg-white shadow rounded-2 p-3 mt-2 mb-3">
//           <h4 className="mb-4 d-flex align-items-center">
//             <span
//               className="rounded-circle bg-primary me-2 d-inline-flex align-items-center justify-content-center"
//               style={{
//                 width: "32px",
//                 height: "32px",
//               }}
//             >
//               <IoIosListBox size={20} className="text-white" />
//             </span>
//             Create New Menu
//           </h4>

//           <div className="card-body">
//             <div className="row g-3">
//               {/* Module */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   <h6>
//                     Module <span className="text-danger">*</span>
//                   </h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   name="moduleId"
//                   value={form.moduleId}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Module</option>

//                   {modules.map((module) => (
//                     <option key={module.id} value={module.id}>
//                       {module.moduleName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Menu Name */}

//               <div className="col-md-4">
//                 <label htmlFor="" className="form-label">
//                   <h6>
//                     Menu Name <span className="text-danger">*</span>
//                   </h6>
//                 </label>

//                 <input
//                   className="form-control"
//                   name="menuName"
//                   value={form.menuName}
//                   onChange={handleChange}
//                   placeholder="Enter menu name (e.g.New Admission"
//                 />
//               </div>

//               {/* URL */}
//                   {!form.hasSubMenu && (
//                        <div className="col-md-4">
//                 <label className="form-label">
//                   {" "}
//                   <h6>
//                     Route/URL <span className="text-danger">*</span>
//                   </h6>
//                 </label>

//                 <input
//                   className="form-control"
//                   placeholder="/students"
//                   name="menuUrl"
//                   value={form.menuUrl}
//                   onChange={handleChange}
//                 />
//                 <small className="text-muted">Frontend route path</small>
//               </div>
//                   )}
             

//               {/* Order */}

//               <div className="col-md-4">
//                 <label className="form-label">Display Order</label>

//                 <input
//                   type="number"
//                   className="form-control"
//                   name="displayOrder"
//                   value={form.displayOrder}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Status */}

//               <div className="col-md-4">
//                 <label className="form-label">Status</label>

//                 <select
//                   className="form-select"
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                 >
//                   <option>Active</option>

//                   <option>Inactive</option>
//                 </select>
//               </div>

//               {/* Has Sub Menu */}

//               <div className="col-md-12">
//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name="hasSubMenu"
//                     checked={form.hasSubMenu}
//                     onChange={handleChange}
//                   />

//                   <label className="form-check-label">Has Sub Menu</label>
//                 </div>
//               </div>
//             </div>

//             {/* SubMenus */}
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid px-2 mt-3">
//         {form.hasSubMenu && (
//           <div className="card shadow">
//             <div className="card-header bg-white">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">Sub Menus</h5>

//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={addSubMenu}
//                   type="button"
//                 >
//                   <FaPlus /> Add More
//                 </button>
//               </div>
//             </div>

//             <div className="card-body">
//               {subMenus.map((sub, index) => (
//                 <div className=" rounded p-2 mb-3" key={index}>
//                   <div className="d-flex justify-content-between mb-3">
//                     <h6>Sub Menu {index + 1}</h6>

//                     {subMenus.length > 1 && (
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => removeSubMenu(index)}
//                       >
//                         <FaTrash />
//                       </button>
//                     )}
//                   </div>

//                   <div className="row g-3">
//                     <div className="col-md-4">
//                       <label className="form-label">
//                         <h6>
//                           Sub Menu Name <span className="text-danger">*</span>
//                         </h6>
//                       </label>

//                       <input
//                         className="form-control"
//                         name="subMenuName"
//                         value={sub.subMenuName}
//                         onChange={(e) => handleSubMenuChange(index, e)}
//                         placeholder="Enter sub menu name"
//                       />
//                     </div>

//                     <div className="col-md-4">
//                       <label className="form-label">
//                         <h6>
//                           Route/URL <span className="text-danger">*</span>
//                         </h6>
//                       </label>

//                       <input
//                         className="form-control"
//                         placeholder="/new-admission"
//                         name="subMenuUrl"
//                         value={sub.subMenuUrl}
//                         onChange={(e) => handleSubMenuChange(index, e)}
//                       />
//                     </div>

//                     <div className="col-md-2">
//                       <label className="form-label"><h6>Sequence Order<span className="text-danger">*</span></h6></label>

//                       <input
//                         type="number"
//                         className="form-control"
//                         name="displayOrder"
//                         value={sub.displayOrder}
//                         onChange={(e) => handleSubMenuChange(index, e)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="text-end mt-4">
//         <button
//           type="button"
//           className="btn btn-primary px-4"
//           onClick={handleSave}
//         >
//           <MdGridView size={20} className="me-2" />
//           Create Menu
//         </button>
//       </div>
//     </>
//   );
// };

// export default MenuCreation;



// // import React, { useEffect, useState } from "react";
// // import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
// // import { IoIosListBox } from "react-icons/io";
// // import { MdGridView } from "react-icons/md";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axiosInstance from "../../../api/axiosInstance";

// // const MenuCreation = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams();

// //   const [modules, setModules] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   const [form, setForm] = useState({
// //     moduleId: "",
// //     menuName: "",
// //     menuUrl: "",
// //     displayOrder: 1,
// //     status: "Active",
// //     hasSubMenu: false,
// //   });

// //   const [subMenus, setSubMenus] = useState([
// //     {
// //       subMenuName: "",
// //       subMenuUrl: "",
// //       displayOrder: 1,
// //     },
// //   ]);

// //   // ============================================================
// //   // LOAD MODULES
// //   // ============================================================

// //   const loadModules = async () => {
// //     try {
// //       const res = await axiosInstance.get("/api/module/all");

// //       const filteredModules = (res.data || []).filter(
// //         (module) => module.hasMenu === true
// //       );

// //       setModules(filteredModules);
// //     } catch (error) {
// //       console.error("Module Error:", error);
// //     }
// //   };

// //   // ============================================================
// //   // LOAD MENU BY ID
// //   // ============================================================

// //   const loadMenu = async () => {
// //     if (!id) return;

// //     try {
// //       setLoading(true);

// //       const res = await axiosInstance.get(`/api/menu/${id}`);

// //       const menu = res.data;

// //       console.log("Menu Details:", menu);

// //       setForm({
// //         moduleId: menu.module?.id || menu.moduleId || "",
// //         menuName: menu.menuName || "",
// //         menuUrl: menu.menuUrl || "",
// //         displayOrder: menu.displayOrder || 1,
// //         status: menu.status || "Active",
// //         hasSubMenu: Boolean(menu.hasSubMenu),
// //       });

// //       // ========================================================
// //       // LOAD SUB MENUS
// //       // ========================================================

// //       if (
// //         Boolean(menu.hasSubMenu) &&
// //         Array.isArray(menu.subMenus) &&
// //         menu.subMenus.length > 0
// //       ) {
// //         setSubMenus(
// //           menu.subMenus.map((sub, index) => ({
// //             subMenuName: sub.subMenuName || "",
// //             subMenuUrl: sub.subMenuUrl || "",
// //             displayOrder: sub.displayOrder || index + 1,
// //           }))
// //         );
// //       } else {
// //         setSubMenus([
// //           {
// //             subMenuName: "",
// //             subMenuUrl: "",
// //             displayOrder: 1,
// //           },
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error("Menu Load Error:", error);

// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to load menu details"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ============================================================
// //   // INITIAL LOAD
// //   // ============================================================

// //   useEffect(() => {
// //     loadModules();

// //     if (id) {
// //       loadMenu();
// //     }
// //   }, [id]);

// //   // ============================================================
// //   // FORM CHANGE
// //   // ============================================================

// //   const handleChange = (e) => {
// //     const { name, value, checked, type } = e.target;

// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));

// //     // If submenu disabled, clear URL
// //     if (name === "hasSubMenu" && checked) {
// //       setForm((prev) => ({
// //         ...prev,
// //         hasSubMenu: true,
// //         menuUrl: "",
// //       }));
// //     }
// //   };

// //   // ============================================================
// //   // SUB MENU CHANGE
// //   // ============================================================

// //   const handleSubMenuChange = (index, e) => {
// //     const values = [...subMenus];

// //     values[index] = {
// //       ...values[index],
// //       [e.target.name]: e.target.value,
// //     };

// //     setSubMenus(values);
// //   };

// //   // ============================================================
// //   // ADD SUB MENU
// //   // ============================================================

// //   const addSubMenu = () => {
// //     setSubMenus((prev) => [
// //       ...prev,
// //       {
// //         subMenuName: "",
// //         subMenuUrl: "",
// //         displayOrder: prev.length + 1,
// //       },
// //     ]);
// //   };

// //   // ============================================================
// //   // REMOVE SUB MENU
// //   // ============================================================

// //   const removeSubMenu = (index) => {
// //     const values = [...subMenus];

// //     values.splice(index, 1);

// //     // Re-sequence
// //     const updatedValues = values.map((item, i) => ({
// //       ...item,
// //       displayOrder: i + 1,
// //     }));

// //     setSubMenus(updatedValues);
// //   };

// //   // ============================================================
// //   // VALIDATION
// //   // ============================================================

// //   const validateForm = () => {
// //     if (!form.moduleId) {
// //       alert("Please Select Module");
// //       return false;
// //     }

// //     if (!form.menuName.trim()) {
// //       alert("Enter Menu Name");
// //       return false;
// //     }

// //     // Menu URL required only when there is no submenu
// //     if (!form.hasSubMenu && !form.menuUrl.trim()) {
// //       alert("Enter Menu URL");
// //       return false;
// //     }

// //     // Validate submenus
// //     if (form.hasSubMenu) {
// //       if (!subMenus.length) {
// //         alert("Please add at least one submenu");
// //         return false;
// //       }

// //       for (let i = 0; i < subMenus.length; i++) {
// //         if (!subMenus[i].subMenuName.trim()) {
// //           alert(`Enter Sub Menu Name for Sub Menu ${i + 1}`);
// //           return false;
// //         }

// //         if (!subMenus[i].subMenuUrl.trim()) {
// //           alert(`Enter Sub Menu URL for Sub Menu ${i + 1}`);
// //           return false;
// //         }
// //       }
// //     }

// //     return true;
// //   };

// //   // ============================================================
// //   // UPDATE MENU
// //   // ============================================================

// //   const handleUpdate = async () => {
// //     if (!validateForm()) return;

// //     const payload = {
// //       moduleId: Number(form.moduleId),
// //       menuName: form.menuName.trim(),
// //       menuUrl: form.hasSubMenu ? "" : form.menuUrl.trim(),
// //       displayOrder: Number(form.displayOrder),
// //       status: form.status,
// //       hasSubMenu: form.hasSubMenu,

// //       subMenus: form.hasSubMenu
// //         ? subMenus.map((sub, index) => ({
// //             subMenuName: sub.subMenuName.trim(),
// //             subMenuUrl: sub.subMenuUrl.trim(),
// //             displayOrder: Number(sub.displayOrder) || index + 1,
// //           }))
// //         : [],
// //     };

// //     console.log("Update Payload:", payload);

// //     try {
// //       setSaving(true);

// //       const response = await axiosInstance.put(
// //         `/api/menu/${id}`,
// //         payload
// //       );

// //       alert(
// //         response.data || "Menu Updated Successfully"
// //       );

// //       navigate(-1);
// //     } catch (error) {
     
// //   console.log("Update Menu Error:", error);
// //   console.log("Backend Response:", error?.response?.data);
// //   console.log("Backend Status:", error?.response?.status);

// //   alert(
// //     error?.response?.data?.message ||
// //     error?.response?.data?.error ||
// //     "Failed to update menu"
// //   );

// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // ============================================================
// //   // LOADING
// //   // ============================================================

// //   if (loading) {
// //     return (
// //       <div className="container-fluid px-2">
// //         <div className="bg-white shadow rounded-2 p-5 mt-2 text-center">
// //           <div
// //             className="spinner-border text-primary"
// //             role="status"
// //           />

// //           <div className="mt-3 text-muted">
// //             Loading menu details...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ============================================================
// //   // JSX
// //   // ============================================================

// //   return (
// //     <>
// //       {/* ======================================================
// //           PAGE HEADER
// //       ====================================================== */}

// //       <div className="container-fluid px-2">
// //         <div
// //           className="rounded-4 shadow overflow-hidden mt-2 mb-3"
// //           style={{
// //             background:
// //               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
// //             border: "1px solid #dbeafe",
// //           }}
// //         >
// //           <div className="p-3 p-md-4">
// //             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
// //               <div className="d-flex align-items-center gap-3">
// //                 <div
// //                   className="d-flex align-items-center justify-content-center rounded-4"
// //                   style={{
// //                     width: "52px",
// //                     height: "52px",
// //                     background:
// //                       "linear-gradient(135deg,#2563eb,#3b82f6)",
// //                     color: "#fff",
// //                     boxShadow:
// //                       "0 8px 20px rgba(37,99,235,.22)",
// //                   }}
// //                 >
// //                   <IoIosListBox size={27} />
// //                 </div>

// //                 <div>
// //                   <h5 className="mb-1 fw-bold text-dark">
// //                     Edit Menu
// //                   </h5>

// //                   <div className="text-muted small">
// //                     Menu Management &nbsp;/&nbsp; Edit Menu
// //                   </div>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 className="btn btn-outline-primary rounded-3"
// //                 onClick={() => navigate(-1)}
// //               >
// //                 <FaArrowLeft className="me-2" />
// //                 Back to Menu List
// //               </button>
// //             </div>
// //           </div>

// //           <div
// //             className="px-4 py-2"
// //             style={{
// //               backgroundColor: "rgba(239,246,255,.75)",
// //               borderTop: "1px solid #e0ecff",
// //             }}
// //           >
// //             <small className="text-muted">
// //               Home &nbsp;›&nbsp; Menu Management &nbsp;›&nbsp;
// //               <span className="text-primary fw-semibold">
// //                 Edit Menu
// //               </span>
// //             </small>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ======================================================
// //           MENU FORM
// //       ====================================================== */}

// //       <div className="container-fluid mt-3 px-2">
// //         <div className="bg-white shadow rounded-4 p-3 mb-3">
// //           <h5 className="mb-4 d-flex align-items-center fw-bold">
// //             <span
// //               className="rounded-circle me-2 d-inline-flex align-items-center justify-content-center"
// //               style={{
// //                 width: "34px",
// //                 height: "34px",
// //                 background: "#2563eb",
// //               }}
// //             >
// //               <IoIosListBox
// //                 size={19}
// //                 className="text-white"
// //               />
// //             </span>

// //             Edit Menu Details
// //           </h5>

// //           <div className="row g-3">
// //             {/* MODULE */}

// //             <div className="col-md-4">
// //               <label className="form-label fw-semibold">
// //                 Module <span className="text-danger">*</span>
// //               </label>

// //               <select
// //                 className="form-select"
// //                 name="moduleId"
// //                 value={form.moduleId}
// //                 onChange={handleChange}
// //               >
// //                 <option value="">Select Module</option>

// //                 {modules.map((module) => (
// //                   <option
// //                     key={module.id}
// //                     value={module.id}
// //                   >
// //                     {module.moduleName}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* MENU NAME */}

// //             <div className="col-md-4">
// //               <label className="form-label fw-semibold">
// //                 Menu Name{" "}
// //                 <span className="text-danger">*</span>
// //               </label>

// //               <input
// //                 className="form-control"
// //                 name="menuName"
// //                 value={form.menuName}
// //                 onChange={handleChange}
// //                 placeholder="Enter menu name"
// //               />
// //             </div>

// //             {/* MENU URL */}

// //             {!form.hasSubMenu && (
// //               <div className="col-md-4">
// //                 <label className="form-label fw-semibold">
// //                   Route/URL{" "}
// //                   <span className="text-danger">*</span>
// //                 </label>

// //                 <input
// //                   className="form-control"
// //                   placeholder="/students"
// //                   name="menuUrl"
// //                   value={form.menuUrl}
// //                   onChange={handleChange}
// //                 />

// //                 <small className="text-muted">
// //                   Frontend route path
// //                 </small>
// //               </div>
// //             )}

// //             {/* DISPLAY ORDER */}

// //             <div className="col-md-4">
// //               <label className="form-label fw-semibold">
// //                 Display Order
// //               </label>

// //               <input
// //                 type="number"
// //                 min="1"
// //                 className="form-control"
// //                 name="displayOrder"
// //                 value={form.displayOrder}
// //                 onChange={handleChange}
// //               />
// //             </div>

// //             {/* STATUS */}

// //             <div className="col-md-4">
// //               <label className="form-label fw-semibold">
// //                 Status
// //               </label>

// //               <select
// //                 className="form-select"
// //                 name="status"
// //                 value={form.status}
// //                 onChange={handleChange}
// //               >
// //                 <option value="Active">
// //                   Active
// //                 </option>

// //                 <option value="Inactive">
// //                   Inactive
// //                 </option>
// //               </select>
// //             </div>

// //             {/* HAS SUBMENU */}

// //             <div className="col-md-12">
// //               <div className="form-check mt-2">
// //                 <input
// //                   type="checkbox"
// //                   className="form-check-input"
// //                   id="hasSubMenu"
// //                   name="hasSubMenu"
// //                   checked={form.hasSubMenu}
// //                   onChange={handleChange}
// //                 />

// //                 <label
// //                   className="form-check-label fw-semibold"
// //                   htmlFor="hasSubMenu"
// //                 >
// //                   Has Sub Menu
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ======================================================
// //           SUB MENUS
// //       ====================================================== */}

// //       <div className="container-fluid px-2 mt-3">
// //         {form.hasSubMenu && (
// //           <div className="card border-0 shadow rounded-4 overflow-hidden">
// //             <div
// //               className="card-header bg-white p-3"
// //               style={{
// //                 borderBottom: "1px solid #e5e7eb",
// //               }}
// //             >
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <div>
// //                   <h5 className="mb-1 fw-bold">
// //                     Sub Menus
// //                   </h5>

// //                   <small className="text-muted">
// //                     Manage menu sub-items
// //                   </small>
// //                 </div>

// //                 <button
// //                   className="btn btn-primary btn-sm rounded-3"
// //                   onClick={addSubMenu}
// //                   type="button"
// //                 >
// //                   <FaPlus className="me-1" />
// //                   Add More
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="card-body p-3">
// //               {subMenus.map((sub, index) => (
// //                 <div
// //                   className="border rounded-3 p-3 mb-3"
// //                   key={index}
// //                   style={{
// //                     background: "#f8fbff",
// //                     borderColor: "#dbeafe",
// //                   }}
// //                 >
// //                   <div className="d-flex justify-content-between align-items-center mb-3">
// //                     <div className="d-flex align-items-center gap-2">
// //                       <span
// //                         className="d-flex align-items-center justify-content-center rounded-circle text-white"
// //                         style={{
// //                           width: "28px",
// //                           height: "28px",
// //                           background: "#2563eb",
// //                           fontSize: "12px",
// //                           fontWeight: "600",
// //                         }}
// //                       >
// //                         {index + 1}
// //                       </span>

// //                       <h6 className="mb-0 fw-bold">
// //                         Sub Menu {index + 1}
// //                       </h6>
// //                     </div>

// //                     {subMenus.length > 1 && (
// //                       <button
// //                         type="button"
// //                         className="btn btn-outline-danger btn-sm rounded-3"
// //                         onClick={() =>
// //                           removeSubMenu(index)
// //                         }
// //                       >
// //                         <FaTrash />
// //                       </button>
// //                     )}
// //                   </div>

// //                   <div className="row g-3">
// //                     {/* SUB MENU NAME */}

// //                     <div className="col-md-4">
// //                       <label className="form-label fw-semibold">
// //                         Sub Menu Name{" "}
// //                         <span className="text-danger">
// //                           *
// //                         </span>
// //                       </label>

// //                       <input
// //                         className="form-control"
// //                         name="subMenuName"
// //                         value={sub.subMenuName}
// //                         onChange={(e) =>
// //                           handleSubMenuChange(
// //                             index,
// //                             e
// //                           )
// //                         }
// //                         placeholder="Enter sub menu name"
// //                       />
// //                     </div>

// //                     {/* SUB MENU URL */}

// //                     <div className="col-md-4">
// //                       <label className="form-label fw-semibold">
// //                         Route/URL{" "}
// //                         <span className="text-danger">
// //                           *
// //                         </span>
// //                       </label>

// //                       <input
// //                         className="form-control"
// //                         placeholder="/new-admission"
// //                         name="subMenuUrl"
// //                         value={sub.subMenuUrl}
// //                         onChange={(e) =>
// //                           handleSubMenuChange(
// //                             index,
// //                             e
// //                           )
// //                         }
// //                       />
// //                     </div>

// //                     {/* ORDER */}

// //                     <div className="col-md-2">
// //                       <label className="form-label fw-semibold">
// //                         Sequence Order{" "}
// //                         <span className="text-danger">
// //                           *
// //                         </span>
// //                       </label>

// //                       <input
// //                         type="number"
// //                         min="1"
// //                         className="form-control"
// //                         name="displayOrder"
// //                         value={sub.displayOrder}
// //                         onChange={(e) =>
// //                           handleSubMenuChange(
// //                             index,
// //                             e
// //                           )
// //                         }
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* ======================================================
// //           ACTION BUTTON
// //       ====================================================== */}

// //       <div className="container-fluid px-2">
// //         <div className="d-flex justify-content-end gap-2 mt-4 mb-4">
// //           <button
// //             type="button"
// //             className="btn btn-light border px-4 rounded-3"
// //             onClick={() => navigate(-1)}
// //             disabled={saving}
// //           >
// //             Cancel
// //           </button>

// //           <button
// //             type="button"
// //             className="btn btn-primary px-4 rounded-3"
// //             onClick={handleUpdate}
// //             disabled={saving}
// //           >
// //             {saving ? (
// //               <>
// //                 <span
// //                   className="spinner-border spinner-border-sm me-2"
// //                   role="status"
// //                 />
// //                 Updating...
// //               </>
// //             ) : (
// //               <>
// //                 <MdGridView
// //                   size={20}
// //                   className="me-2"
// //                 />
// //                 Update Menu
// //               </>
// //             )}
// //           </button>
// //         </div>
// //       </div>

// //       {/* ======================================================
// //           CSS
// //       ====================================================== */}

// //       <style>
// //         {`
// //           .form-select,
// //           .form-control {
// //             border-color: #dee2e6;
// //             border-radius: 8px;
// //             min-height: 40px;
// //             font-size: 13px;
// //           }

// //           .form-select:focus,
// //           .form-control:focus {
// //             border-color: #2563eb;
// //             box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
// //           }

// //           .btn {
// //             font-size: 13px;
// //             font-weight: 500;
// //           }

// //           .form-check-input:checked {
// //             background-color: #2563eb;
// //             border-color: #2563eb;
// //           }

// //           .form-check-input:focus {
// //             border-color: #2563eb;
// //             box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
// //           }
// //         `}
// //       </style>
// //     </>
// //   );
// // };

// // export default MenuCreation;



import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const MenuCreation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ============================================================
  // MODE
  // ============================================================

  const isEditMode = Boolean(id);

  console.log("Menu ID:", id);
  console.log("Edit Mode:", isEditMode);

  // ============================================================
  // STATES
  // ============================================================

  const [modules, setModules] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    moduleId: "",
    menuName: "",
    menuUrl: "",
    displayOrder: 1,
    status: "Active",
    hasSubMenu: false,
  });

  const [subMenus, setSubMenus] = useState([
    {
      subMenuName: "",
      subMenuUrl: "",
      displayOrder: 1,
    },
  ]);

  // ============================================================
  // DEFAULT SUB MENU
  // ============================================================

  const getDefaultSubMenu = () => ({
    subMenuName: "",
    subMenuUrl: "",
    displayOrder: 1,
  });

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    setForm({
      moduleId: "",
      menuName: "",
      menuUrl: "",
      displayOrder: 1,
      status: "Active",
      hasSubMenu: false,
    });

    setSubMenus([getDefaultSubMenu()]);
  };

  // ============================================================
  // LOAD MODULES
  // ============================================================

  const loadModules = async () => {
    try {
      const response = await axiosInstance.get("/api/module/all");

      const data = response.data || [];

      const filteredModules = data.filter(
        (module) => module.hasMenu === true
      );

      setModules(filteredModules);
    } catch (error) {
      console.error("Module Load Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load modules"
      );
    }
  };

  // ============================================================
  // LOAD MENU FOR EDIT
  // ============================================================

  const loadMenu = async () => {
    if (!id) return;

    try {
      setLoading(true);

      console.log("Loading menu:", id);

      const response = await axiosInstance.get(
        `/api/menu/${id}`
      );

      const menu = response.data;

      console.log("Menu Details:", menu);

      // --------------------------------------------------------
      // FORM
      // --------------------------------------------------------

      const hasSubMenu = Boolean(menu.hasSubMenu);

      setForm({
        moduleId:
          menu.module?.id ??
          menu.moduleId ??
          "",

        menuName:
          menu.menuName ??
          "",

        menuUrl:
          menu.menuUrl ??
          "",

        displayOrder:
          menu.displayOrder ??
          1,

        status:
          menu.status ??
          "Active",

        hasSubMenu,
      });

      // --------------------------------------------------------
      // SUB MENUS
      // --------------------------------------------------------

      if (
        hasSubMenu &&
        Array.isArray(menu.subMenus) &&
        menu.subMenus.length > 0
      ) {
        setSubMenus(
          menu.subMenus.map((sub, index) => ({
            id: sub.id,

            subMenuName:
              sub.subMenuName ??
              "",

            subMenuUrl:
              sub.subMenuUrl ??
              "",

            displayOrder:
              sub.displayOrder ??
              index + 1,
          }))
        );
      } else {
        setSubMenus([getDefaultSubMenu()]);
      }
    } catch (error) {
      console.error("Menu Load Error:", error);

      console.log(
        "Backend Response:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to load menu details"
      );

      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadModules();

    if (isEditMode) {
      loadMenu();
    } else {
      resetForm();
    }
  }, [id]);

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    if (name === "hasSubMenu") {
      setForm((prev) => ({
        ...prev,
        hasSubMenu: checked,
        menuUrl: checked ? "" : prev.menuUrl,
      }));

      if (checked) {
        setSubMenus((prev) =>
          prev.length > 0
            ? prev
            : [getDefaultSubMenu()]
        );
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ============================================================
  // SUB MENU CHANGE
  // ============================================================

  const handleSubMenuChange = (index, e) => {
    const {
      name,
      value,
    } = e.target;

    setSubMenus((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: value,
            }
          : item
      )
    );
  };

  // ============================================================
  // ADD SUB MENU
  // ============================================================

  const addSubMenu = () => {
    setSubMenus((prev) => [
      ...prev,
      {
        ...getDefaultSubMenu(),
        displayOrder:
          prev.length + 1,
      },
    ]);
  };

  // ============================================================
  // REMOVE SUB MENU
  // ============================================================

  const removeSubMenu = (index) => {
    setSubMenus((prev) => {
      const filtered = prev.filter(
        (_, i) => i !== index
      );

      return filtered.map(
        (item, i) => ({
          ...item,
          displayOrder: i + 1,
        })
      );
    });
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    if (!form.moduleId) {
      alert("Please Select Module");
      return false;
    }

    if (!form.menuName.trim()) {
      alert("Enter Menu Name");
      return false;
    }

    // --------------------------------------------------------
    // NORMAL MENU
    // --------------------------------------------------------

    if (
      !form.hasSubMenu &&
      !form.menuUrl.trim()
    ) {
      alert("Enter Menu URL");
      return false;
    }

    // --------------------------------------------------------
    // SUB MENU
    // --------------------------------------------------------

    if (form.hasSubMenu) {
      if (subMenus.length === 0) {
        alert(
          "Please add at least one submenu"
        );
        return false;
      }

      for (
        let i = 0;
        i < subMenus.length;
        i++
      ) {
        if (
          !subMenus[i].subMenuName.trim()
        ) {
          alert(
            `Enter Sub Menu Name for Sub Menu ${
              i + 1
            }`
          );

          return false;
        }

        if (
          !subMenus[i].subMenuUrl.trim()
        ) {
          alert(
            `Enter Sub Menu URL for Sub Menu ${
              i + 1
            }`
          );

          return false;
        }
      }
    }

    return true;
  };

  // ============================================================
  // CREATE MENU
  // ============================================================

  const handleCreate = async () => {
    if (!validateForm()) return;

    const payload = {
      moduleId: Number(form.moduleId),

      menuName:
        form.menuName.trim(),

      menuUrl:
        form.hasSubMenu
          ? ""
          : form.menuUrl.trim(),

      displayOrder:
        Number(form.displayOrder),

      status: form.status,

      hasSubMenu:
        form.hasSubMenu,

      subMenus: form.hasSubMenu
        ? subMenus.map(
            (sub, index) => ({
              subMenuName:
                sub.subMenuName.trim(),

              subMenuUrl:
                sub.subMenuUrl.trim(),

              displayOrder:
                Number(
                  sub.displayOrder
                ) || index + 1,
            })
          )
        : [],
    };

    console.log(
      "CREATE PAYLOAD:",
      payload
    );

    try {
      setSaving(true);

      const response =
        await axiosInstance.post(
          "/api/menu/create",
          payload
        );

      console.log(
        "Create Response:",
        response.data
      );

      alert(
        response.data ||
          "Menu Created Successfully"
      );

      resetForm();

      // Back to menu list
      navigate(-1);
    } catch (error) {
      console.error(
        "Create Menu Error:",
        error
      );

      console.log(
        "Backend Response:",
        error?.response?.data
      );

      console.log(
        "Backend Status:",
        error?.response?.status
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create menu"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // UPDATE MENU
  // ============================================================

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const payload = {
      moduleId: Number(form.moduleId),

      menuName:
        form.menuName.trim(),

      menuUrl:
        form.hasSubMenu
          ? ""
          : form.menuUrl.trim(),

      displayOrder:
        Number(form.displayOrder),

      status: form.status,

      hasSubMenu:
        form.hasSubMenu,

      subMenus: form.hasSubMenu
        ? subMenus.map(
            (sub, index) => ({
              ...(sub.id
                ? { id: sub.id }
                : {}),

              subMenuName:
                sub.subMenuName.trim(),

              subMenuUrl:
                sub.subMenuUrl.trim(),

              displayOrder:
                Number(
                  sub.displayOrder
                ) || index + 1,
            })
          )
        : [],
    };

    console.log(
      "UPDATE PAYLOAD:",
      payload
    );

    try {
      setSaving(true);

      const response =
        await axiosInstance.put(
          `/api/menu/${id}`,
          payload
        );

      console.log(
        "Update Response:",
        response.data
      );

      alert(
        response.data ||
          "Menu Updated Successfully"
      );

      navigate(-1);
    } catch (error) {
      console.error(
        "Update Menu Error:",
        error
      );

      console.log(
        "Backend Response:",
        error?.response?.data
      );

      console.log(
        "Backend Status:",
        error?.response?.status
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update menu"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // SAVE
  // ============================================================

  const handleSave = () => {
    if (isEditMode) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="container-fluid px-2">
        <div className="bg-white shadow rounded-4 p-5 mt-2 text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          />

          <div className="mt-3 text-muted">
            Loading menu details...
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // JSX
  // ============================================================

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="container-fluid px-2">
        <div
          className="rounded-4 shadow overflow-hidden mt-2 mb-3"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border:
              "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <IoIosListBox size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    {isEditMode
                      ? "Edit Menu"
                      : "Menu Creation"}
                  </h5>

                  <div className="text-muted small">
                    Menu Management
                    &nbsp;/&nbsp;
                    {isEditMode
                      ? "Edit Menu"
                      : "Menu Creation"}
                  </div>
                </div>

              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-3"
                onClick={() =>
                  navigate(-1)
                }
              >
                <FaArrowLeft className="me-2" />
                Back to Menu List
              </button>

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
              Home &nbsp;›&nbsp;
              Menu Management
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                {isEditMode
                  ? "Edit Menu"
                  : "Menu Creation"}
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* ======================================================
          MENU FORM
      ====================================================== */}

      <div className="container-fluid mt-3 px-2">
        <div className="bg-white shadow rounded-4 p-3 mb-3">

          <h5 className="mb-4 d-flex align-items-center fw-bold">

            <span
              className="rounded-circle me-2 d-inline-flex align-items-center justify-content-center"
              style={{
                width: "34px",
                height: "34px",
                background: "#2563eb",
              }}
            >
              <IoIosListBox
                size={19}
                className="text-white"
              />
            </span>

            {isEditMode
              ? "Edit Menu Details"
              : "Create New Menu"}

          </h5>

          <div className="row g-3">

            {/* MODULE */}

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Module{" "}
                <span className="text-danger">
                  *
                </span>
              </label>

              <select
                className="form-select"
                name="moduleId"
                value={
                  form.moduleId
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select Module
                </option>

                {modules.map(
                  (module) => (
                    <option
                      key={module.id}
                      value={
                        module.id
                      }
                    >
                      {
                        module.moduleName
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* MENU NAME */}

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Menu Name{" "}
                <span className="text-danger">
                  *
                </span>
              </label>

              <input
                className="form-control"
                name="menuName"
                value={
                  form.menuName
                }
                onChange={
                  handleChange
                }
                placeholder="Enter menu name"
              />
            </div>

            {/* MENU URL */}

            {!form.hasSubMenu && (
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Route/URL{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <input
                  className="form-control"
                  placeholder="/students"
                  name="menuUrl"
                  value={
                    form.menuUrl
                  }
                  onChange={
                    handleChange
                  }
                />

                <small className="text-muted">
                  Frontend route path
                </small>
              </div>
            )}

            {/* DISPLAY ORDER */}

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Display Order
              </label>

              <input
                type="number"
                min="1"
                className="form-control"
                name="displayOrder"
                value={
                  form.displayOrder
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {/* STATUS */}

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Status
              </label>

              <select
                className="form-select"
                name="status"
                value={
                  form.status
                }
                onChange={
                  handleChange
                }
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            {/* HAS SUBMENU */}

            <div className="col-md-12">
              <div className="form-check mt-2">

                <input
                  type="checkbox"
                  className="form-check-input"
                  id="hasSubMenu"
                  name="hasSubMenu"
                  checked={
                    form.hasSubMenu
                  }
                  onChange={
                    handleChange
                  }
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="hasSubMenu"
                >
                  Has Sub Menu
                </label>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          SUB MENUS
      ====================================================== */}

      <div className="container-fluid px-2 mt-3">

        {form.hasSubMenu && (
          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <div
              className="card-header bg-white p-3"
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="mb-1 fw-bold">
                    Sub Menus
                  </h5>

                  <small className="text-muted">
                    Manage menu sub-items
                  </small>
                </div>

                <button
                  className="btn btn-primary btn-sm rounded-3"
                  onClick={
                    addSubMenu
                  }
                  type="button"
                  disabled={saving}
                >
                  <FaPlus className="me-1" />
                  Add More
                </button>

              </div>
            </div>

            <div className="card-body p-3">

              {subMenus.map(
                (sub, index) => (
                  <div
                    className="border rounded-3 p-3 mb-3"
                    key={
                      sub.id ||
                      `new-${index}`
                    }
                    style={{
                      background:
                        "#f8fbff",
                      borderColor:
                        "#dbeafe",
                    }}
                  >

                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <div className="d-flex align-items-center gap-2">

                        <span
                          className="d-flex align-items-center justify-content-center rounded-circle text-white"
                          style={{
                            width:
                              "28px",
                            height:
                              "28px",
                            background:
                              "#2563eb",
                            fontSize:
                              "12px",
                            fontWeight:
                              "600",
                          }}
                        >
                          {index + 1}
                        </span>

                        <h6 className="mb-0 fw-bold">
                          Sub Menu{" "}
                          {index + 1}
                        </h6>

                      </div>

                      {subMenus.length >
                        1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm rounded-3"
                          onClick={() =>
                            removeSubMenu(
                              index
                            )
                          }
                          disabled={
                            saving
                          }
                        >
                          <FaTrash />
                        </button>
                      )}

                    </div>

                    <div className="row g-3">

                      {/* SUB MENU NAME */}

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Sub Menu Name{" "}
                          <span className="text-danger">
                            *
                          </span>
                        </label>

                        <input
                          className="form-control"
                          name="subMenuName"
                          value={
                            sub.subMenuName
                          }
                          onChange={(e) =>
                            handleSubMenuChange(
                              index,
                              e
                            )
                          }
                          placeholder="Enter sub menu name"
                        />
                      </div>

                      {/* SUB MENU URL */}

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Route/URL{" "}
                          <span className="text-danger">
                            *
                          </span>
                        </label>

                        <input
                          className="form-control"
                          placeholder="/new-admission"
                          name="subMenuUrl"
                          value={
                            sub.subMenuUrl
                          }
                          onChange={(e) =>
                            handleSubMenuChange(
                              index,
                              e
                            )
                          }
                        />
                      </div>

                      {/* ORDER */}

                      <div className="col-md-2">
                        <label className="form-label fw-semibold">
                          Sequence Order{" "}
                          <span className="text-danger">
                            *
                          </span>
                        </label>

                        <input
                          type="number"
                          min="1"
                          className="form-control"
                          name="displayOrder"
                          value={
                            sub.displayOrder
                          }
                          onChange={(e) =>
                            handleSubMenuChange(
                              index,
                              e
                            )
                          }
                        />
                      </div>

                    </div>
                  </div>
                )
              )}

            </div>
          </div>
        )}

      </div>

      {/* ======================================================
          ACTION BUTTON
      ====================================================== */}

      <div className="container-fluid px-2">

        <div className="d-flex justify-content-end gap-2 mt-4 mb-4">

          <button
            type="button"
            className="btn btn-light border px-4 rounded-3"
            onClick={() =>
              navigate(-1)
            }
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary px-4 rounded-3"
            onClick={handleSave}
            disabled={saving}
          >

            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />

                {isEditMode
                  ? "Updating..."
                  : "Creating..."}
              </>
            ) : (
              <>
                <MdGridView
                  size={20}
                  className="me-2"
                />

                {isEditMode
                  ? "Update Menu"
                  : "Create Menu"}
              </>
            )}

          </button>

        </div>

      </div>

      {/* ======================================================
          CSS
      ====================================================== */}

      <style>
        {`
          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 8px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          .btn {
            font-size: 13px;
            font-weight: 500;
          }

          .form-check-input:checked {
            background-color: #2563eb;
            border-color: #2563eb;
          }

          .form-check-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }
        `}
      </style>
    </>
  );
};

export default MenuCreation;