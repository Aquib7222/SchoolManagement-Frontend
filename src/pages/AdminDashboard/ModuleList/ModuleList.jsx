// import React, { useEffect, useState } from "react";
// import {
//   LuBox,
//   LuEye,
//   LuPencil,
//   LuTrash2,
//   LuSearch,
//   LuChevronLeft,
//   LuChevronRight,
// } from "react-icons/lu";
// import axiosInstance from "../../../api/axiosInstance";
// import { FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const images = import.meta.glob("../../../assets/icon/*", {
//   eager: true,
//   import: "default",
// });

// const imageMap = {};

// Object.keys(images).forEach((path) => {
//   const fileName = path.split("/").pop();
//   imageMap[fileName] = images[path];
// });
// const ModuleList = () => {
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const navigate = useNavigate();

//   // =====================================================
//   // STATUS
//   // =====================================================
//   const isActive = (module) => {
//     if (typeof module.status === "boolean") {
//       return module.status;
//     }

//     if (typeof module.status === "string") {
//       return module.status.toUpperCase() === "ACTIVE";
//     }

//     return true;
//   };

//   // =====================================================
//   // FETCH MODULES
//   // =====================================================
//   const fetchModules = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get("/api/user-group-mapping/all");

//       setModules(res.data || []);
//     } catch (err) {
//       console.log("Error fetching modules:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   console.log("modules",modules);
//   // =====================================================
//   // FILTER
//   // =====================================================
//   const filteredModules = modules.filter((item) => {
//     const module = item.module || {};

//     const moduleName = module.moduleName || "";
//     const moduleCode = module.moduleCode || module.code || "";

//     const matchesSearch =
//       moduleName.toLowerCase().includes(search.toLowerCase()) ||
//       moduleCode.toLowerCase().includes(search.toLowerCase());

//     const active = isActive(module);

//     const matchesStatus =
//       statusFilter === "ALL" ||
//       (statusFilter === "ACTIVE" && active) ||
//       (statusFilter === "INACTIVE" && !active);

//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentModules = filteredModules.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

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

//   const handleView = (item) => {
//     console.log("View module:", item);
//   };

//   const handleEdit = (module) => {
//   const moduleId =
//     module?.id || module?.moduleId;

//   if (!moduleId) {
//     alert("Module ID not found");
//     return;
//   }

//   navigate(`/admin/modules/edit/${moduleId}`);
// };

//   const handleDelete = async (module) => {

//   const moduleId =
//     module?.id || module?.moduleId;

//   if (!moduleId) {
//     alert("Module ID not found");
//     return;
//   }

//   const moduleName =
//     module?.moduleName ||
//     module?.name ||
//     "this module";

//   const confirmed = window.confirm(
//     `Are you sure you want to delete "${moduleName}"?`
//   );

//   if (!confirmed) {
//     return;
//   }

//   try {

//     await axiosInstance.delete(
//       `/api/module/delete/${moduleId}`
//     );

//     alert("Module Deleted Successfully");

//     // Refresh list
//     fetchModules();

//   } catch (error) {

//     console.error(
//       "Delete module error:",
//       error
//     );

//     console.error(
//       "Backend:",
//       error?.response?.data
//     );

//     alert(
//       error?.response?.data ||
//         "Unable to delete module"
//     );
//   }
// };

//   return (
//     <>
//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{ minHeight: "70px" }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">Module List</h4>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-dark">
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">Module Management</li>

//                   <li className="breadcrumb-item active text-primary">
//                     Module List
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
//               Back to Module
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid  mt-4 mb-4">
//         <div
//           className="card border-0 shadow"
//           style={{
//             borderRadius: "8px",
//           }}
//         >
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
//                   <LuBox
//                     size={17}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-bold">Module List</h6>

//                   <small className="text-muted">Manage system modules</small>
//                 </div>
//               </div>

//               {/* SEARCH */}
//               <div className="d-flex align-items-center gap-2 flex-wrap">
//                 {/* STATUS FILTER */}
//                 <select
//                   className="form-select form-select-sm"
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     width: "130px",
//                     height: "36px",
//                     fontSize: "13px",
//                     cursor: "pointer",
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
//                     width: "230px",
//                   }}
//                 >
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search module..."
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
//           </div>

         
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "850px",
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
//                         width: "6%",
//                         fontSize: "12px",
//                         color: "#555",
//                         padding: "13px 10px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       style={{
//                         width: "10%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Icon
//                     </th>

//                     <th
//                       style={{
//                         width: "25%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Module Name
//                     </th>

//                     <th
//                       style={{
//                         width: "18%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Description
//                     </th>

//                      <th
//                       style={{
//                         width: "13%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Path
//                     </th>

//                     <th
//                       style={{
//                         width: "13%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       style={{
//                         width: "15%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Created On
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "13%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loading && (
//                     <tr>
//                       <td colSpan="7" className="text-center py-5">
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
//                           Loading modules...
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {!loading && currentModules.length === 0 && (
//                     <tr>
//                       <td colSpan="7" className="text-center py-5">
//                         <LuBox size={35} className="text-muted mb-2" />

//                         <div className="fw-semibold">No modules found</div>

//                         <small className="text-muted">
//                           Try changing your search.
//                         </small>
//                       </td>
//                     </tr>
//                   )}

//                   {!loading &&
//                     currentModules.map((item, index) => {
//                       const module = item.module || {};

//                       console.log("module baby",module);

//                       const active = isActive(module);

//                       return (
//                         <tr
//                           key={item.id || module.id || index}
//                           style={{
//                             borderBottom: "1px solid #f1f1f1",
//                           }}
//                         >
//                           {/* # */}
//                           <td className="text-center">
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: "600",
//                                 color: "#555",
//                               }}
//                             >
//                               {startIndex + index + 1}
//                             </span>
//                           </td>

//                           {/* ICON */}
//                           <td>
//                             <div
//                               className="d-inline-flex align-items-center justify-content-center rounded-circle"
//                               style={{
//                                 width: "38px",
//                                 height: "38px",
//                                 background: "#f1edff",
//                                 flexShrink: 0,
//                               }}
//                             >
//                               {module.image && imageMap[module.image] ? (
//                                 <img
//                                   src={imageMap[module.image]}
//                                   alt={module.moduleName || "Module"}
//                                   style={{
//                                     width: "30px",
//                                     height: "30px",
//                                     objectFit: "contain",
//                                   }}
//                                 />
//                               ) : (
//                                 <LuBox
//                                   size={20}
//                                   style={{
//                                     color: "#6f2cff",
//                                   }}
//                                 />
//                               )}
//                             </div>
//                           </td>

//                           {/* MODULE NAME */}
//                           <td>
//                             <span
//                               className="fw-semibold"
//                               style={{
//                                 fontSize: "13px",
//                               }}
//                             >
//                               {module.moduleName || "N/A"}
//                             </span>
//                           </td>

//                           <td>
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: "600",
//                                 color: "#555",
//                               }}
//                             >
//                               {module?.description || "-"}
//                             </span>
//                           </td>

//                           <td>
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: "600",
//                                 color: "#555",
//                               }}
//                             >
//                               {module?.path || "has menu"}
//                             </span>
//                           </td>

//                           {/* STATUS */}
//                           <td>
//                             <span
//                               className="px-2 py-1 rounded-2"
//                               style={{
//                                 background: active ? "#dcfce7" : "#fee2e2",
//                                 color: active ? "#16a34a" : "#dc2626",
//                                 fontSize: "11px",
//                                 fontWeight: "600",
//                               }}
//                             >
//                               {active ? "Active" : "Inactive"}
//                             </span>
//                           </td>

//                           {/* CREATED */}
//                           <td>
//                             <span
//                               style={{
//                                 fontSize: "12px",
//                                 color: "#555",
//                               }}
//                             >
//                               {formatDate(module.createdAt)}
//                             </span>
//                           </td>

//                           {/* ACTION */}
//                           <td>
//                             <div className="d-flex justify-content-center gap-2">
//                               {/* VIEW */}
//                               <button
//                                 type="button"
//                                 className="border-0 d-flex align-items-center justify-content-center"
//                                 title="View"
//                                 onClick={() => handleView(item)}
//                                 style={{
//                                   width: "30px",
//                                   height: "30px",
//                                   borderRadius: "6px",
//                                   background: "#f1edff",
//                                   color: "#6f2cff",
//                                 }}
//                               >
//                                 <LuEye size={15} />
//                               </button>

//                               {/* EDIT */}
//                              <button
//   type="button"
//   className="border-0 d-flex align-items-center justify-content-center"
//   title="Edit"
//   onClick={() => handleEdit(module)}
//   style={{
//     width: "29px",
//     height: "29px",
//     borderRadius: "6px",
//     background: "#eaf3ff",
//     color: "#2878e8",
//   }}
// >
//   <LuPencil size={14} />
// </button>

//                               {/* DELETE */}
//                              <button
//   type="button"
//   className="border-0 d-flex align-items-center justify-content-center"
//   title="Delete"
//   onClick={() => handleDelete(module)}
//   style={{
//     width: "29px",
//     height: "29px",
//     borderRadius: "6px",
//     background: "#fff0f0",
//     color: "#ef4444",
//   }}
// >
//   <LuTrash2 size={14} />
// </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               FOOTER / PAGINATION
//           ================================================= */}
//           {!loading && filteredModules.length > 0 && (
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
//                     {Math.min(
//                       startIndex + itemsPerPage,
//                       filteredModules.length,
//                     )}
//                   </strong>{" "}
//                   of <strong>{filteredModules.length}</strong> entries
//                 </div>

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

// export default ModuleList;


import React, { useEffect, useState } from "react";
import {
  LuBox,
  LuEye,
  LuPencil,
  LuTrash2,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuSettings2,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const images = import.meta.glob("../../../assets/icon/*", {
  eager: true,
  import: "default",
});

const imageMap = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop();
  imageMap[fileName] = images[path];
});

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const navigate = useNavigate();

  // =====================================================
  // STATUS
  // =====================================================

  const isActive = (module) => {
    if (typeof module?.status === "boolean") {
      return module.status;
    }

    if (typeof module?.status === "string") {
      return module.status.toUpperCase() === "ACTIVE";
    }

    return true;
  };

  // =====================================================
  // FETCH MODULES
  // =====================================================

  const fetchModules = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/user-group-mapping/all"
      );

      setModules(res.data || []);
    } catch (err) {
      console.error("Error fetching modules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredModules = modules.filter((item) => {
    const module = item?.module || {};

    const moduleName = module?.moduleName || "";
    const moduleCode =
      module?.moduleCode || module?.code || "";

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      moduleName.toLowerCase().includes(searchValue) ||
      moduleCode.toLowerCase().includes(searchValue);

    const active = isActive(module);

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && active) ||
      (statusFilter === "INACTIVE" && !active);

    return matchesSearch && matchesStatus;
  });

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredModules.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentModules = filteredModules.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "-";
    }
  };

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (item) => {
    console.log("View module:", item);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (module) => {
    const moduleId =
      module?.id || module?.moduleId;

    if (!moduleId) {
      alert("Module ID not found");
      return;
    }

    navigate(
      `/admin/modules/edit/${moduleId}`
    );
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (module) => {
    const moduleId =
      module?.id || module?.moduleId;

    if (!moduleId) {
      alert("Module ID not found");
      return;
    }

    const moduleName =
      module?.moduleName ||
      module?.name ||
      "this module";

    const confirmed = window.confirm(
      `Are you sure you want to delete "${moduleName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/module/delete/${moduleId}`
      );

      alert("Module Deleted Successfully");

      fetchModules();
    } catch (error) {
      console.error(
        "Delete module error:",
        error
      );

      console.error(
        "Backend:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Unable to delete module"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div className="rounded-4 shadow overflow-hidden ml-page-header">
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="ml-title-icon">
                  <LuBox size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Module List
                  </h5>

                  <div className="text-muted small">
                    Manage system modules, access,
                    status and configuration.
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-3 px-3"
                onClick={() =>
                  window.history.back()
                }
              >
                <FaArrowLeft className="me-2" />
                Back to Module
              </button>
            </div>
          </div>

          {/* BREADCRUMB */}

          <div className="px-4 py-2 ml-breadcrumb-strip">
            <small className="text-muted">
              Dashboard
              <span className="mx-1">›</span>
              Module Management
              <span className="mx-1">›</span>
              <span className="text-primary fw-semibold">
                Module List
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div className="card border-0 shadow rounded-4 overflow-hidden">
          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div className="card-header bg-white border-0 border-bottom p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              {/* TITLE */}

              <div className="d-flex align-items-center gap-3">
                <div className="ml-section-icon">
                  <LuSettings2 size={20} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    Module Management
                  </h6>

                  <small className="text-muted">
                    Search and manage available
                    system modules.
                  </small>
                </div>
              </div>

              {/* FILTERS */}

              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* STATUS */}

                <select
                  className="form-select ml-filter-input"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );
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

                <div className="position-relative ml-search">
                  <input
                    type="text"
                    className="form-control ml-filter-input"
                    placeholder="Search module..."
                    value={search}
                    onChange={handleSearch}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "12px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0 ml-table"
                style={{
                  minWidth: "900px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      className="text-center"
                      style={{ width: "6%" }}
                    >
                      #
                    </th>

                    <th style={{ width: "10%" }}>
                      Icon
                    </th>

                    <th style={{ width: "20%" }}>
                      Module Name
                    </th>

                    <th style={{ width: "20%" }}>
                      Description
                    </th>

                    <th style={{ width: "13%" }}>
                      Path
                    </th>

                    <th style={{ width: "11%" }}>
                      Status
                    </th>

                    <th style={{ width: "12%" }}>
                      Created On
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
                  {/* =================================================
                      LOADING
                  ================================================= */}

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
                          Loading modules...
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* =================================================
                      EMPTY
                  ================================================= */}

                  {!loading &&
                    currentModules.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-5"
                        >
                          <div className="ml-empty-icon mx-auto mb-3">
                            <LuBox size={27} />
                          </div>

                          <div className="fw-semibold text-dark">
                            No modules found
                          </div>

                          <small className="text-muted">
                            Try changing your search
                            or status filter.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* =================================================
                      MODULE ROWS
                  ================================================= */}

                  {!loading &&
                    currentModules.map(
                      (item, index) => {
                        const module =
                          item?.module || {};

                        const active =
                          isActive(module);

                        return (
                          <tr
                            key={
                              item?.id ||
                              module?.id ||
                              index
                            }
                          >
                            {/* # */}

                            <td className="text-center">
                              <span className="ml-index">
                                {startIndex +
                                  index +
                                  1}
                              </span>
                            </td>

                            {/* ICON */}

                            <td>
                              <div className="ml-module-icon">
                                {module?.image &&
                                imageMap[
                                  module.image
                                ] ? (
                                  <img
                                    src={
                                      imageMap[
                                        module.image
                                      ]
                                    }
                                    alt={
                                      module?.moduleName ||
                                      "Module"
                                    }
                                  />
                                ) : (
                                  <LuBox
                                    size={20}
                                  />
                                )}
                              </div>
                            </td>

                            {/* MODULE NAME */}

                            <td>
                              <div className="fw-semibold text-dark ml-module-name">
                                {module?.moduleName ||
                                  "N/A"}
                              </div>

                              {module?.moduleCode && (
                                <span className="ml-code-badge">
                                  {module.moduleCode}
                                </span>
                              )}
                            </td>

                            {/* DESCRIPTION */}

                            <td>
                              <span className="ml-description">
                                {module?.description ||
                                  "-"}
                              </span>
                            </td>

                            {/* PATH */}

                            <td>
                              {module?.path ? (
                                <span className="ml-path">
                                  {module.path}
                                </span>
                              ) : (
                                <span className="ml-menu-badge">
                                  Has Menu
                                </span>
                              )}
                            </td>

                            {/* STATUS */}

                            <td>
                              <span
                                className={`ml-status ${
                                  active
                                    ? "active"
                                    : "inactive"
                                }`}
                              >
                                <span className="ml-status-dot" />

                                {active
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>

                            {/* CREATED */}

                            <td>
                              <span className="ml-created">
                                {formatDate(
                                  module?.createdAt
                                )}
                              </span>
                            </td>

                            {/* ACTION */}

                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                {/* VIEW */}

                                <button
                                  type="button"
                                  className="ml-action view"
                                  title="View"
                                  onClick={() =>
                                    handleView(
                                      item
                                    )
                                  }
                                >
                                  <LuEye
                                    size={15}
                                  />
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  className="ml-action edit"
                                  title="Edit"
                                  onClick={() =>
                                    handleEdit(
                                      module
                                    )
                                  }
                                >
                                  <LuPencil
                                    size={15}
                                  />
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  className="ml-action delete"
                                  title="Delete"
                                  onClick={() =>
                                    handleDelete(
                                      module
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
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              FOOTER / PAGINATION
          ================================================= */}

          {!loading &&
            filteredModules.length > 0 && (
              <div className="card-footer bg-white border-0 p-3">
                <div className="ml-pagination-wrapper">
                  {/* SHOWING */}

                  <div className="text-muted ml-showing">
                    Showing{" "}
                    <strong>
                      {startIndex + 1}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {Math.min(
                        startIndex +
                          itemsPerPage,
                        filteredModules.length
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {filteredModules.length}
                    </strong>{" "}
                    entries
                  </div>

                  {/* PAGINATION */}

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      className="ml-page-btn"
                      disabled={currentPage === 1}
                      onClick={() =>
                        goToPage(
                          currentPage - 1
                        )
                      }
                    >
                      <LuChevronLeft
                        size={16}
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
                          className={`ml-page-btn ${
                            currentPage ===
                            index + 1
                              ? "active"
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
                      className="ml-page-btn"
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
                        size={16}
                      />
                    </button>

                    {/* PER PAGE */}

                    <select
                      className="form-select ml-per-page"
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
          STYLES
      ===================================================== */}

      <style>{`
        .ml-page-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );
          border: 1px solid #dbeafe;
        }

        .ml-title-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(
            37,
            99,
            235,
            0.22
          );
        }

        .ml-breadcrumb-strip {
          background: rgba(
            239,
            246,
            255,
            0.75
          );
          border-top: 1px solid #e0ecff;
        }

        .ml-section-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(
            37,
            99,
            235,
            0.18
          );
        }

        .ml-filter-input {
          min-height: 42px;
          border-radius: 10px;
          border: 1px solid #dbe3ef;
          font-size: 13px;
        }

        .ml-filter-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 0.2rem rgba(
            37,
            99,
            235,
            0.1
          );
        }

        .ml-search {
          width: 240px;
        }

        .ml-table {
          font-size: 13px;
        }

        .ml-table thead tr {
          background: #eff6ff;
          border-top: 1px solid #dbeafe;
          border-bottom: 1px solid #dbeafe;
        }

        .ml-table thead th {
          color: #1e3a8a;
          font-size: 12px;
          font-weight: 700;
          padding: 13px 12px;
          white-space: nowrap;
        }

        .ml-table tbody tr {
          border-bottom: 1px solid #edf2f7;
          transition: background 0.2s ease;
        }

        .ml-table tbody tr:hover {
          background: #f8fbff;
        }

        .ml-table tbody td {
          padding: 13px 12px;
        }

        .ml-index {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
        }

        .ml-module-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          overflow: hidden;
        }

        .ml-module-icon img {
          width: 31px;
          height: 31px;
          object-fit: contain;
        }

        .ml-module-name {
          font-size: 13px;
        }

        .ml-code-badge {
          display: inline-block;
          margin-top: 4px;
          padding: 3px 8px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          font-size: 10px;
          font-weight: 700;
        }

        .ml-description {
          display: block;
          max-width: 220px;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ml-path {
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 8px;
          border-radius: 7px;
        }

        .ml-menu-badge {
          display: inline-block;
          padding: 4px 9px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          font-size: 10px;
          font-weight: 700;
        }

        .ml-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
        }

        .ml-status.active {
          background: #ecfdf3;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .ml-status.inactive {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .ml-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .ml-created {
          color: #64748b;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }

        .ml-action {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ml-action:hover {
          transform: translateY(-1px);
        }

        .ml-action.view {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .ml-action.view:hover {
          background: #dbeafe;
        }

        .ml-action.edit {
          background: #eef2ff;
          color: #4f46e5;
          border-color: #c7d2fe;
        }

        .ml-action.edit:hover {
          background: #e0e7ff;
        }

        .ml-action.delete {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .ml-action.delete:hover {
          background: #fee2e2;
        }

        .ml-empty-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }

        .ml-pagination-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .ml-showing {
          font-size: 12px;
        }

        .ml-page-btn {
          width: 34px;
          height: 34px;
          padding: 0;
          border-radius: 9px;
          border: 1px solid #dbe3ef;
          background: #ffffff;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .ml-page-btn:hover:not(:disabled) {
          border-color: #93c5fd;
          background: #eff6ff;
          color: #2563eb;
        }

        .ml-page-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(
            37,
            99,
            235,
            0.18
          );
        }

        .ml-page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .ml-per-page {
          width: 95px;
          min-height: 34px;
          border-radius: 9px;
          font-size: 12px;
          border-color: #dbe3ef;
        }

        @media (max-width: 768px) {
          .ml-title-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
          }

          .ml-search {
            width: 100%;
          }

          .ml-filter-input {
            width: 100%;
          }

          .ml-pagination-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .ml-pagination-wrapper
            > div:last-child {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .ml-title-icon {
            width: 44px;
            height: 44px;
            min-width: 44px;
          }

          .ml-section-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
          }

          .ml-table tbody td {
            padding: 11px 10px;
          }

          .ml-action {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
};

export default ModuleList;