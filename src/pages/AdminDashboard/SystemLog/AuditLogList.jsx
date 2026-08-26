// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuSearch,
//   LuRefreshCw,
//   LuShieldCheck,
//   LuCircleCheck,
//   LuCircleX,
//   LuEye,
//   LuX,
//   LuChevronLeft,
//   LuChevronRight,
//   LuFileText,
//   LuUser,
//   LuClock3,
//   LuGlobe,
//   LuActivity,
//   LuDatabase,
//   LuFilter,
// } from "react-icons/lu";

// import axiosInstance from "../../../api/axiosInstance";

// const AuditLogList = () => {
//   const token = localStorage.getItem("token");

//   // =====================================================
//   // STATE
//   // =====================================================

//   const [logs, setLogs] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedModule, setSelectedModule] = useState("");
//   const [selectedAction, setSelectedAction] = useState("");

//   const [selectedLog, setSelectedLog] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // =====================================================
//   // PAGINATION
//   // =====================================================

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   // =====================================================
//   // FETCH AUDIT LOGS
//   // =====================================================

//   const fetchAuditLogs = async (
//     currentPage = page,
//     currentSize = pageSize
//   ) => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axiosInstance.get(
//         "/api/audit-logs",
//         {
//           params: {
//             page: currentPage,
//             size: currentSize,
//             sort: "createdAt,desc",
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Audit Log Response:", response.data);

//       const data = response.data || {};

//       const content = Array.isArray(data)
//         ? data
//         : data.content || data.data || [];

//       setLogs(content);

//       setTotalPages(
//         Number(data.totalPages ?? 0)
//       );

//       setTotalElements(
//         Number(data.totalElements ?? content.length)
//       );
//     } catch (err) {
//       console.error("Audit Log Load Error:", err);

//       setLogs([]);
//       setTotalPages(0);
//       setTotalElements(0);

//       setError(
//         err?.response?.data?.message ||
//           "Unable to load audit logs."
//       );
//     } finally {
//       setLoading(false);
//       setInitialLoading(false);
//     }
//   };

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     fetchAuditLogs(0, pageSize);
//   }, []);

//   // =====================================================
//   // HELPERS
//   // =====================================================

//   const getStatus = (status) => {
//     if (!status) return "";

//     if (typeof status === "string") {
//       return status.toUpperCase();
//     }

//     return String(status).toUpperCase();
//   };

//   const getAction = (log) => {
//     return (
//       log?.action ||
//       log?.event ||
//       log?.operation ||
//       "-"
//     );
//   };

//   const getModule = (log) => {
//     return (
//       log?.module ||
//       log?.moduleName ||
//       "-"
//     );
//   };

//   const getUsername = (log) => {
//     return (
//       log?.username ||
//       log?.userName ||
//       "System"
//     );
//   };

//   const getRole = (log) => {
//     return (
//       log?.role ||
//       log?.userRole ||
//       "-"
//     );
//   };

//   const getDescription = (log) => {
//     return (
//       log?.description ||
//       "-"
//     );
//   };

//   const getTargetType = (log) => {
//     return (
//       log?.targetType ||
//       "-"
//     );
//   };

//   const getTargetId = (log) => {
//     return (
//       log?.targetId ||
//       "-"
//     );
//   };

//   const getMethod = (log) => {
//     return (
//       log?.requestMethod ||
//       log?.method ||
//       "-"
//     );
//   };

//   const getUrl = (log) => {
//     return (
//       log?.requestUrl ||
//       log?.url ||
//       "-"
//     );
//   };

//   const getIpAddress = (log) => {
//     return (
//       log?.ipAddress ||
//       "-"
//     );
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return date;
//     }

//     return parsedDate.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatShortDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return date;
//     }

//     return parsedDate.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =====================================================
//   // STATUS BADGE
//   // =====================================================

//   const StatusBadge = ({ status }) => {
//     const value = getStatus(status);

//     const successStatuses = [
//       "SUCCESS",
//       "SUCCESSFUL",
//       "COMPLETED",
//       "PASS",
//       "PASSED",
//     ];

//     const failedStatuses = [
//       "FAILED",
//       "FAILURE",
//       "ERROR",
//       "FAIL",
//       "DENIED",
//     ];

//     if (successStatuses.includes(value)) {
//       return (
//         <span
//           className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
//           style={{
//             background: "#dcfce7",
//             color: "#16a34a",
//             fontSize: "10px",
//             fontWeight: "600",
//           }}
//         >
//           <LuCircleCheck
//             size={13}
//             className="me-1"
//           />
//           {value || "Success"}
//         </span>
//       );
//     }

//     if (failedStatuses.includes(value)) {
//       return (
//         <span
//           className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
//           style={{
//             background: "#fee2e2",
//             color: "#dc2626",
//             fontSize: "10px",
//             fontWeight: "600",
//           }}
//         >
//           <LuCircleX
//             size={13}
//             className="me-1"
//           />
//           {value || "Failed"}
//         </span>
//       );
//     }

//     return (
//       <span
//         className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
//         style={{
//           background: "#f3f4f6",
//           color: "#6b7280",
//           fontSize: "10px",
//           fontWeight: "600",
//         }}
//       >
//         <LuActivity
//           size={13}
//           className="me-1"
//         />
//         {value || "Unknown"}
//       </span>
//     );
//   };

//   // =====================================================
//   // METHOD BADGE
//   // =====================================================

//   const MethodBadge = ({ method }) => {
//     const value = String(method || "-").toUpperCase();

//     let background = "#f3f4f6";
//     let color = "#555";

//     if (value === "GET") {
//       background = "#e0f2fe";
//       color = "#0284c7";
//     }

//     if (value === "POST") {
//       background = "#dcfce7";
//       color = "#16a34a";
//     }

//     if (value === "PUT" || value === "PATCH") {
//       background = "#fef3c7";
//       color = "#d97706";
//     }

//     if (value === "DELETE") {
//       background = "#fee2e2";
//       color = "#dc2626";
//     }

//     return (
//       <span
//         className="px-2 py-1 rounded-2"
//         style={{
//           background,
//           color,
//           fontSize: "9px",
//           fontWeight: "700",
//           letterSpacing: "0.3px",
//         }}
//       >
//         {value}
//       </span>
//     );
//   };

//   // =====================================================
//   // UNIQUE FILTER VALUES
//   // =====================================================

//   const moduleOptions = useMemo(() => {
//     return [
//       ...new Set(
//         logs
//           .map((log) => getModule(log))
//           .filter(
//             (value) =>
//               value &&
//               value !== "-"
//           )
//       ),
//     ].sort();
//   }, [logs]);

//   const actionOptions = useMemo(() => {
//     return [
//       ...new Set(
//         logs
//           .map((log) => getAction(log))
//           .filter(
//             (value) =>
//               value &&
//               value !== "-"
//           )
//       ),
//     ].sort();
//   }, [logs]);

//   // =====================================================
//   // FILTER LOGS
//   // =====================================================

//   const filteredLogs = useMemo(() => {
//     const value = search
//       .toLowerCase()
//       .trim();

//     return logs.filter((log) => {
//       const username = getUsername(log)
//         .toLowerCase();

//       const role = getRole(log)
//         .toLowerCase();

//       const action = getAction(log)
//         .toLowerCase();

//       const module = getModule(log)
//         .toLowerCase();

//       const description =
//         getDescription(log)
//           .toLowerCase();

//       const targetType =
//         getTargetType(log)
//           .toLowerCase();

//       const targetId =
//         getTargetId(log)
//           .toLowerCase();

//       const ipAddress =
//         getIpAddress(log)
//           .toLowerCase();

//       const searchMatch =
//         !value ||
//         username.includes(value) ||
//         role.includes(value) ||
//         action.includes(value) ||
//         module.includes(value) ||
//         description.includes(value) ||
//         targetType.includes(value) ||
//         targetId.includes(value) ||
//         ipAddress.includes(value);

//       const statusMatch =
//         !selectedStatus ||
//         getStatus(log?.status) ===
//           selectedStatus;

//       const moduleMatch =
//         !selectedModule ||
//         getModule(log) ===
//           selectedModule;

//       const actionMatch =
//         !selectedAction ||
//         getAction(log) ===
//           selectedAction;

//       return (
//         searchMatch &&
//         statusMatch &&
//         moduleMatch &&
//         actionMatch
//       );
//     });
//   }, [
//     logs,
//     search,
//     selectedStatus,
//     selectedModule,
//     selectedAction,
//   ]);

//   // =====================================================
//   // CLEAR FILTER
//   // =====================================================

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedStatus("");
//     setSelectedModule("");
//     setSelectedAction("");
//   };

//   // =====================================================
//   // REFRESH
//   // =====================================================

//   const handleRefresh = () => {
//     fetchAuditLogs(page, pageSize);
//   };

//   // =====================================================
//   // PAGINATION
//   // =====================================================

//   const goToPage = (newPage) => {
//     if (
//       newPage < 0 ||
//       newPage >= totalPages
//     ) {
//       return;
//     }

//     setPage(newPage);

//     fetchAuditLogs(
//       newPage,
//       pageSize
//     );
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = Number(
//       e.target.value
//     );

//     setPageSize(newSize);
//     setPage(0);

//     fetchAuditLogs(
//       0,
//       newSize
//     );
//   };

//   // =====================================================
//   // VIEW DETAILS
//   // =====================================================

//   const openDetails = (log) => {
//     setSelectedLog(log);
//     setShowModal(true);
//   };

//   const closeDetails = () => {
//     setSelectedLog(null);
//     setShowModal(false);
//   };

//   // =====================================================
//   // PAGE NUMBERS
//   // =====================================================

//   const pageNumbers = useMemo(() => {
//     if (totalPages <= 0) {
//       return [];
//     }

//     const pages = [];

//     const start = Math.max(
//       0,
//       page - 2
//     );

//     const end = Math.min(
//       totalPages - 1,
//       page + 2
//     );

//     for (
//       let i = start;
//       i <= end;
//       i++
//     ) {
//       pages.push(i);
//     }

//     return pages;
//   }, [page, totalPages]);

//   // =====================================================
//   // INITIAL LOADING
//   // =====================================================

//   if (initialLoading) {
//     return (
//       <>
//         <div className="container-fluid px-2">
//           <div
//             className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//             style={{
//               minHeight: "70px",
//             }}
//           >
//             <h4 className="fw-bold mb-1">
//               Audit Logs
//             </h4>

//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0 small">
//                 <li className="breadcrumb-item">
//                   <a
//                     href="/"
//                     className="text-decoration-none text-dark"
//                   >
//                     Dashboard
//                   </a>
//                 </li>

//                 <li className="breadcrumb-item">
//                   System Management
//                 </li>

//                 <li className="breadcrumb-item active text-primary">
//                   Audit Logs
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <div className="card shadow border-0 rounded-3">
//             <div className="card-body text-center py-5">
//               <div
//                 className="spinner-border text-primary"
//                 style={{
//                   width: "28px",
//                   height: "28px",
//                 }}
//               />

//               <div className="text-muted mt-2">
//                 Loading audit logs...
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

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
//             Audit Logs
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
//                 System Management
//               </li>

//               <li className="breadcrumb-item active text-primary">
//                 Audit Logs
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FILTER CARD */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3">
//           <div className="card-header bg-white">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     background: "#f0eaff",
//                   }}
//                 >
//                   <LuShieldCheck
//                     size={17}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="fw-bold mb-0">
//                     System Activity Logs
//                   </h6>

//                   <small className="text-muted">
//                     Track user activities and system events
//                   </small>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-outline-secondary btn-sm"
//                 onClick={handleRefresh}
//                 disabled={loading}
//               >
//                 <LuRefreshCw
//                   size={15}
//                   className={`me-1 ${
//                     loading
//                       ? "spin-animation"
//                       : ""
//                   }`}
//                 />

//                 Refresh
//               </button>
//             </div>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">

//               {/* SEARCH */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label">
//                   <h6>Search</h6>
//                 </label>

//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search user, action, module..."
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(
//                         e.target.value
//                       );
//                     }}
//                     style={{
//                       paddingRight: "38px",
//                     }}
//                   />

//                   <LuSearch
//                     size={17}
//                     className="position-absolute text-muted"
//                     style={{
//                       right: "12px",
//                       top: "11px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* STATUS */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label">
//                   <h6>Status</h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedStatus}
//                   onChange={(e) => {
//                     setSelectedStatus(
//                       e.target.value
//                     );
//                   }}
//                 >
//                   <option value="">
//                     All Status
//                   </option>

//                   <option value="SUCCESS">
//                     Success
//                   </option>

//                   <option value="FAILED">
//                     Failed
//                   </option>

//                   <option value="ERROR">
//                     Error
//                   </option>
//                 </select>
//               </div>

//               {/* MODULE */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label">
//                   <h6>Module</h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedModule}
//                   onChange={(e) => {
//                     setSelectedModule(
//                       e.target.value
//                     );
//                   }}
//                 >
//                   <option value="">
//                     All Modules
//                   </option>

//                   {moduleOptions.map(
//                     (module) => (
//                       <option
//                         key={module}
//                         value={module}
//                       >
//                         {module}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* ACTION */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label">
//                   <h6>Action</h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedAction}
//                   onChange={(e) => {
//                     setSelectedAction(
//                       e.target.value
//                     );
//                   }}
//                 >
//                   <option value="">
//                     All Actions
//                   </option>

//                   {actionOptions.map(
//                     (action) => (
//                       <option
//                         key={action}
//                         value={action}
//                       >
//                         {action}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* CLEAR */}

//               <div className="col-xl-3 col-md-6 d-flex align-items-end">
//                 <button
//                   type="button"
//                   className="btn btn-light border w-100"
//                   onClick={clearFilters}
//                 >
//                   <LuFilter
//                     size={16}
//                     className="me-2"
//                   />
//                   Clear Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================================================= */}
//         {/* TABLE CARD */}
//         {/* ================================================= */}

//         <div className="card shadow border-0 rounded-3 mt-3">

//           {/* TABLE HEADER */}

//           <div
//             className="card-header bg-white border-0"
//             style={{
//               padding: "16px 18px",
//             }}
//           >
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     background: "#f0eaff",
//                   }}
//                 >
//                   <LuActivity
//                     size={17}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-bold">
//                     Audit Log List
//                   </h6>

//                   <small className="text-muted">
//                     {totalElements} total log
//                     {totalElements === 1
//                       ? ""
//                       : "s"}
//                   </small>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <small className="text-muted">
//                   Rows:
//                 </small>

//                 <select
//                   className="form-select form-select-sm"
//                   value={pageSize}
//                   onChange={
//                     handlePageSizeChange
//                   }
//                   style={{
//                     width: "75px",
//                   }}
//                 >
//                   <option value="5">
//                     5
//                   </option>

//                   <option value="10">
//                     10
//                   </option>

//                   <option value="20">
//                     20
//                   </option>

//                   <option value="50">
//                     50
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* ERROR */}

//           {error && (
//             <div className="px-3 pt-2">
//               <div
//                 className="alert alert-danger d-flex align-items-center justify-content-between"
//                 style={{
//                   fontSize: "13px",
//                 }}
//               >
//                 <span>
//                   {error}
//                 </span>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() =>
//                     fetchAuditLogs(
//                       page,
//                       pageSize
//                     )
//                   }
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* TABLE */}
//           {/* ================================================= */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "1250px",
//                 }}
//               >
//                 <thead>
//                   <tr
//                     style={{
//                       background:
//                         "#fafbff",
//                       borderTop:
//                         "1px solid #f0f0f0",
//                       borderBottom:
//                         "1px solid #eeeeee",
//                     }}
//                   >
//                     <th
//                       className="text-center"
//                       style={{
//                         width: "5%",
//                         fontSize: "12px",
//                         color: "#555",
//                         padding:
//                           "13px 10px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       style={{
//                         width: "15%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       User
//                     </th>

//                     <th
//                       style={{
//                         width: "11%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Role
//                     </th>

//                     <th
//                       style={{
//                         width: "12%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Action
//                     </th>

//                     <th
//                       style={{
//                         width: "12%",
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
//                       Method
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
//                       style={{
//                         width: "15%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Date & Time
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "10%",
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
//                       <td
//                         colSpan="9"
//                         className="text-center py-5"
//                       >
//                         <div
//                           className="spinner-border text-primary"
//                           style={{
//                             width: "25px",
//                             height: "25px",
//                           }}
//                         />

//                         <div className="text-muted mt-2">
//                           Loading audit logs...
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* EMPTY */}

//                   {!loading &&
//                     filteredLogs.length ===
//                       0 && (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           className="text-center py-5"
//                         >
//                           <LuFileText
//                             size={40}
//                             className="text-muted mb-2"
//                           />

//                           <div className="fw-semibold">
//                             No audit logs found
//                           </div>

//                           <small className="text-muted">
//                             Try changing your
//                             search or filters.
//                           </small>
//                         </td>
//                       </tr>
//                     )}

//                   {/* LOGS */}

//                   {!loading &&
//                     filteredLogs.map(
//                       (log, index) => {
//                         const actualIndex =
//                           page *
//                             pageSize +
//                           index +
//                           1;

//                         return (
//                           <tr
//                             key={
//                               log?.id ||
//                               `${page}-${index}`
//                             }
//                             style={{
//                               borderBottom:
//                                 "1px solid #f3f3f3",
//                             }}
//                           >

//                             {/* INDEX */}

//                             <td className="text-center">
//                               <span
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                   fontWeight:
//                                     "600",
//                                   color:
//                                     "#777",
//                                 }}
//                               >
//                                 {actualIndex}
//                               </span>
//                             </td>

//                             {/* USER */}

//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <span
//                                   className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
//                                   style={{
//                                     width:
//                                       "34px",
//                                     height:
//                                       "34px",
//                                     background:
//                                       "#f0eaff",
//                                     color:
//                                       "#6f2cff",
//                                     flexShrink: 0,
//                                   }}
//                                 >
//                                   <LuUser
//                                     size={
//                                       16
//                                     }
//                                   />
//                                 </span>

//                                 <div>
//                                   <div
//                                     className="fw-semibold"
//                                     style={{
//                                       fontSize:
//                                         "12px",
//                                     }}
//                                   >
//                                     {getUsername(
//                                       log
//                                     )}
//                                   </div>

//                                   <small
//                                     className="text-muted"
//                                     style={{
//                                       fontSize:
//                                         "9px",
//                                     }}
//                                   >
//                                     ID:{" "}
//                                     {log?.userId ??
//                                       "-"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </td>

//                             {/* ROLE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background:
//                                     "#f1edff",
//                                   color:
//                                     "#6f2cff",
//                                   fontSize:
//                                     "9px",
//                                   fontWeight:
//                                     "600",
//                                 }}
//                               >
//                                 {getRole(
//                                   log
//                                 )}
//                               </span>
//                             </td>

//                             {/* ACTION */}

//                             <td>
//                               <div
//                                 className="fw-semibold"
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                 }}
//                               >
//                                 {getAction(
//                                   log
//                                 )}
//                               </div>

//                               <small
//                                 className="text-muted"
//                                 style={{
//                                   fontSize:
//                                     "9px",
//                                 }}
//                               >
//                                 {getTargetType(
//                                   log
//                                 )}{" "}
//                                 #{getTargetId(
//                                   log
//                                 )}
//                               </small>
//                             </td>

//                             {/* MODULE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background:
//                                     "#f3e8ff",
//                                   color:
//                                     "#7e22ce",
//                                   fontSize:
//                                     "9px",
//                                   fontWeight:
//                                     "600",
//                                 }}
//                               >
//                                 {getModule(
//                                   log
//                                 )}
//                               </span>
//                             </td>

//                             {/* METHOD */}

//                             <td>
//                               <MethodBadge
//                                 method={getMethod(
//                                   log
//                                 )}
//                               />
//                             </td>

//                             {/* STATUS */}

//                             <td>
//                               <StatusBadge
//                                 status={
//                                   log?.status
//                                 }
//                               />
//                             </td>

//                             {/* DATE */}

//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <LuClock3
//                                   size={14}
//                                   className="text-muted me-1"
//                                 />

//                                 <div>
//                                   <div
//                                     style={{
//                                       fontSize:
//                                         "11px",
//                                       fontWeight:
//                                         "500",
//                                     }}
//                                   >
//                                     {formatShortDate(
//                                       log?.createdAt
//                                     )}
//                                   </div>

//                                   <small
//                                     className="text-muted"
//                                     style={{
//                                       fontSize:
//                                         "9px",
//                                     }}
//                                   >
//                                     {log?.createdAt
//                                       ? new Date(
//                                           log.createdAt
//                                         ).toLocaleTimeString(
//                                           "en-IN",
//                                           {
//                                             hour:
//                                               "2-digit",
//                                             minute:
//                                               "2-digit",
//                                             second:
//                                               "2-digit",
//                                             hour12:
//                                               true,
//                                           }
//                                         )
//                                       : "-"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </td>

//                             {/* VIEW */}

//                             <td className="text-center">
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light border"
//                                 onClick={() =>
//                                   openDetails(
//                                     log
//                                   )
//                                 }
//                                 title="View Details"
//                                 style={{
//                                   width:
//                                     "32px",
//                                   height:
//                                     "32px",
//                                   padding: 0,
//                                 }}
//                               >
//                                 <LuEye
//                                   size={15}
//                                   style={{
//                                     color:
//                                       "#6f2cff",
//                                   }}
//                                 />
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       }
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* ================================================= */}
//           {/* FOOTER / PAGINATION */}
//           {/* ================================================= */}

//           {!loading &&
//             totalElements > 0 && (
//               <div className="card-footer bg-white border-0">
//                 <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//                   <small className="text-muted">
//                     Showing{" "}
//                     <strong>
//                       {page *
//                         pageSize +
//                         1}
//                     </strong>{" "}
//                     to{" "}
//                     <strong>
//                       {Math.min(
//                         (page + 1) *
//                           pageSize,
//                         totalElements
//                       )}
//                     </strong>{" "}
//                     of{" "}
//                     <strong>
//                       {totalElements}
//                     </strong>{" "}
//                     logs
//                   </small>

//                   {/* PAGINATION */}

//                   <div className="d-flex align-items-center gap-1">

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-light border"
//                       disabled={
//                         page === 0
//                       }
//                       onClick={() =>
//                         goToPage(
//                           page - 1
//                         )
//                       }
//                       style={{
//                         width:
//                           "32px",
//                         height:
//                           "32px",
//                         padding: 0,
//                       }}
//                     >
//                       <LuChevronLeft
//                         size={16}
//                       />
//                     </button>

//                     {pageNumbers.map(
//                       (pageNumber) => (
//                         <button
//                           type="button"
//                           key={
//                             pageNumber
//                           }
//                           className={`btn btn-sm ${
//                             pageNumber ===
//                             page
//                               ? "btn-primary"
//                               : "btn-light border"
//                           }`}
//                           onClick={() =>
//                             goToPage(
//                               pageNumber
//                             )
//                           }
//                           style={{
//                             width:
//                               "32px",
//                             height:
//                               "32px",
//                             padding: 0,
//                             fontSize:
//                               "11px",
//                           }}
//                         >
//                           {pageNumber +
//                             1}
//                         </button>
//                       )
//                     )}

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-light border"
//                       disabled={
//                         page >=
//                         totalPages - 1
//                       }
//                       onClick={() =>
//                         goToPage(
//                           page + 1
//                         )
//                       }
//                       style={{
//                         width:
//                           "32px",
//                         height:
//                           "32px",
//                         padding: 0,
//                       }}
//                     >
//                       <LuChevronRight
//                         size={16}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>

//       {/* ===================================================== */}
//       {/* DETAIL MODAL */}
//       {/* ===================================================== */}

//       {showModal &&
//         selectedLog && (
//           <div
//             className="modal fade show d-block"
//             tabIndex="-1"
//             style={{
//               background:
//                 "rgba(0,0,0,0.45)",
//               zIndex: 1055,
//             }}
//           >
//             <div
//               className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
//             >
//               <div className="modal-content border-0 shadow rounded-3">

//                 {/* MODAL HEADER */}

//                 <div className="modal-header bg-white border-0">
//                   <div className="d-flex align-items-center">

//                     <span
//                       className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                       style={{
//                         width: "36px",
//                         height: "36px",
//                         background:
//                           "#f0eaff",
//                       }}
//                     >
//                       <LuFileText
//                         size={18}
//                         style={{
//                           color:
//                             "#6f2cff",
//                         }}
//                       />
//                     </span>

//                     <div>
//                       <h5 className="modal-title fw-bold mb-0">
//                         Audit Log Details
//                       </h5>

//                       <small className="text-muted">
//                         Log ID:{" "}
//                         {selectedLog?.id ??
//                           "-"}
//                       </small>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     className="btn btn-light rounded-circle"
//                     onClick={
//                       closeDetails
//                     }
//                     style={{
//                       width: "34px",
//                       height: "34px",
//                       padding: 0,
//                     }}
//                   >
//                     <LuX size={17} />
//                   </button>
//                 </div>

//                 {/* MODAL BODY */}

//                 <div className="modal-body">

//                   {/* USER INFO */}

//                   <div
//                     className="rounded-3 p-3 mb-3"
//                     style={{
//                       background:
//                         "#faf9ff",
//                       border:
//                         "1px solid #eee9ff",
//                     }}
//                   >
//                     <div className="row g-3">

//                       <div className="col-md-6">
//                         <small className="text-muted d-block mb-1">
//                           User
//                         </small>

//                         <div className="fw-semibold">
//                           {getUsername(
//                             selectedLog
//                           )}
//                         </div>
//                       </div>

//                       <div className="col-md-6">
//                         <small className="text-muted d-block mb-1">
//                           User ID
//                         </small>

//                         <div className="fw-semibold">
//                           {selectedLog?.userId ??
//                             "-"}
//                         </div>
//                       </div>

//                       <div className="col-md-6">
//                         <small className="text-muted d-block mb-1">
//                           Role
//                         </small>

//                         <span
//                           className="px-2 py-1 rounded-2"
//                           style={{
//                             background:
//                               "#f1edff",
//                             color:
//                               "#6f2cff",
//                             fontSize:
//                               "10px",
//                             fontWeight:
//                               "600",
//                           }}
//                         >
//                           {getRole(
//                             selectedLog
//                           )}
//                         </span>
//                       </div>

//                       <div className="col-md-6">
//                         <small className="text-muted d-block mb-1">
//                           Status
//                         </small>

//                         <StatusBadge
//                           status={
//                             selectedLog?.status
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* ACTIVITY */}

//                   <h6 className="fw-bold mb-3">
//                     Activity Information
//                   </h6>

//                   <div className="row g-3 mb-4">

//                     <div className="col-md-4">
//                       <div
//                         className="border rounded-3 p-3 h-100"
//                       >
//                         <small className="text-muted d-block mb-1">
//                           Action
//                         </small>

//                         <div className="fw-semibold">
//                           {getAction(
//                             selectedLog
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <div
//                         className="border rounded-3 p-3 h-100"
//                       >
//                         <small className="text-muted d-block mb-1">
//                           Module
//                         </small>

//                         <div className="fw-semibold">
//                           {getModule(
//                             selectedLog
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <div
//                         className="border rounded-3 p-3 h-100"
//                       >
//                         <small className="text-muted d-block mb-1">
//                           Target
//                         </small>

//                         <div className="fw-semibold">
//                           {getTargetType(
//                             selectedLog
//                           )}{" "}
//                           #{getTargetId(
//                             selectedLog
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* DESCRIPTION */}

//                   <h6 className="fw-bold mb-2">
//                     Description
//                   </h6>

//                   <div
//                     className="border rounded-3 p-3 mb-4"
//                     style={{
//                       background:
//                         "#fafafa",
//                       fontSize: "12px",
//                       lineHeight:
//                         "1.6",
//                     }}
//                   >
//                     {getDescription(
//                       selectedLog
//                     )}
//                   </div>

//                   {/* REQUEST */}

//                   <h6 className="fw-bold mb-3">
//                     Request Information
//                   </h6>

//                   <div className="row g-3 mb-4">

//                     <div className="col-md-3">
//                       <small className="text-muted d-block mb-1">
//                         Method
//                       </small>

//                       <MethodBadge
//                         method={getMethod(
//                           selectedLog
//                         )}
//                       />
//                     </div>

//                     <div className="col-md-9">
//                       <small className="text-muted d-block mb-1">
//                         Request URL
//                       </small>

//                       <code
//                         style={{
//                           fontSize:
//                             "11px",
//                           wordBreak:
//                             "break-all",
//                         }}
//                       >
//                         {getUrl(
//                           selectedLog
//                         )}
//                       </code>
//                     </div>

//                     <div className="col-md-6">
//                       <small className="text-muted d-block mb-1">
//                         IP Address
//                       </small>

//                       <div className="d-flex align-items-center">
//                         <LuGlobe
//                           size={14}
//                           className="text-muted me-2"
//                         />

//                         <span
//                           style={{
//                             fontSize:
//                               "12px",
//                           }}
//                         >
//                           {getIpAddress(
//                             selectedLog
//                           )}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <small className="text-muted d-block mb-1">
//                         Created At
//                       </small>

//                       <div className="d-flex align-items-center">
//                         <LuClock3
//                           size={14}
//                           className="text-muted me-2"
//                         />

//                         <span
//                           style={{
//                             fontSize:
//                               "12px",
//                           }}
//                         >
//                           {formatDateTime(
//                             selectedLog?.createdAt
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* TARGET */}

//                   <h6 className="fw-bold mb-3">
//                     Target Information
//                   </h6>

//                   <div className="row g-3">

//                     <div className="col-md-6">
//                       <div className="border rounded-3 p-3">
//                         <small className="text-muted d-block mb-1">
//                           Target Type
//                         </small>

//                         <div
//                           className="d-flex align-items-center"
//                         >
//                           <LuDatabase
//                             size={15}
//                             className="me-2"
//                             style={{
//                               color:
//                                 "#6f2cff",
//                             }}
//                           />

//                           <span
//                             style={{
//                               fontSize:
//                                 "12px",
//                               fontWeight:
//                                 "600",
//                             }}
//                           >
//                             {getTargetType(
//                               selectedLog
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="border rounded-3 p-3">
//                         <small className="text-muted d-block mb-1">
//                           Target ID
//                         </small>

//                         <div
//                           style={{
//                             fontSize:
//                               "12px",
//                             fontWeight:
//                               "600",
//                           }}
//                         >
//                           {getTargetId(
//                             selectedLog
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* MODAL FOOTER */}

//                 <div className="modal-footer bg-white border-0">
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-sm px-3"
//                     onClick={
//                       closeDetails
//                     }
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//     </>
//   );
// };

// export default AuditLogList;


import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuRefreshCw,
  LuFileText,
  LuCalendarDays,
  LuCircleCheck,
  LuCircleX,
  LuActivity,
  LuChevronLeft,
  LuChevronRight,
  LuFilter,
  LuX,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";

const AuditLogList = () => {
  const token = localStorage.getItem("token");

  // =====================================================
  // STATES
  // =====================================================

  const [logs, setLogs] = useState([]);
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(false);
  const [schoolLoading, setSchoolLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [dateFilter, setDateFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [actionFilter, setActionFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // =====================================================
  // FETCH AUDIT LOGS
  // =====================================================

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/audit-logs", {
        params: {
          page,
          size,
          sort: "createdAt,desc",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Audit Logs Response:", res.data);

      const data = res.data || {};

      setLogs(Array.isArray(data.content) ? data.content : []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Audit Log Load Error:", error);
      setLogs([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH SCHOOLS
  // =====================================================

  const fetchSchools = async () => {
    try {
      setSchoolLoading(true);

      const res = await axiosInstance.get("/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      setSchools(data);
    } catch (error) {
      console.error("School Load Error:", error);
      setSchools([]);
    } finally {
      setSchoolLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [page]);

  // =====================================================
  // SCHOOL NAME FROM TARGET ID
  // =====================================================

  const getSchoolName = (schoolId) => {
    if (!schoolId) return "-";

    const school = schools.find(
      (item) =>
        String(item?.id) === String(schoolId)
    );

    if (!school) {
      return `School #${schoolId}`;
    }

    return (
      school.schoolName ||
      school.name ||
      school.organizationName ||
      `School #${schoolId}`
    );
  };

  // =====================================================
  // TARGET DISPLAY
  // =====================================================

  const getTarget = (log) => {
    const targetType =
      log?.targetType ||
      log?.target_type ||
      "";

    const targetId =
      log?.targetId ??
      log?.target_id ??
      "";

    if (!targetType && !targetId) {
      return "-";
    }

    if (
      targetType.toUpperCase() === "SCHOOL"
    ) {
      return getSchoolName(targetId);
    }

    if (targetType && targetId) {
      return `${targetType} #${targetId}`;
    }

    return targetId || targetType || "-";
  };

  // =====================================================
  // STATUS
  // =====================================================

  const normalizeStatus = (status) => {
    if (!status) return "";

    return String(status).toUpperCase();
  };

  const isSuccess = (log) => {
    const status = normalizeStatus(log?.status);

    return (
      status === "SUCCESS" ||
      status === "SUCCESSFUL" ||
      status === "COMPLETED"
    );
  };

  const isFailed = (log) => {
    const status = normalizeStatus(log?.status);

    return (
      status === "FAILED" ||
      status === "FAILURE" ||
      status === "ERROR"
    );
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDateTime = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // ACTION LIST
  // =====================================================

  const actionOptions = useMemo(() => {
    return [
      ...new Set(
        logs
          .map((log) => log?.action)
          .filter(Boolean)
      ),
    ];
  }, [logs]);

  // =====================================================
  // MODULE LIST
  // =====================================================

  const moduleOptions = useMemo(() => {
    return [
      ...new Set(
        logs
          .map((log) => log?.module)
          .filter(Boolean)
      ),
    ];
  }, [logs]);

  // =====================================================
  // TODAY CHECK
  // =====================================================

  const isToday = (value) => {
    if (!value) return false;

    const date = new Date(value);
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // =====================================================
  // CARD COUNTS
  // =====================================================

  const todayLogs = useMemo(() => {
    return logs.filter((log) =>
      isToday(log?.createdAt)
    ).length;
  }, [logs]);

  const successfulActions = useMemo(() => {
    return logs.filter((log) =>
      isSuccess(log)
    ).length;
  }, [logs]);

  const failedActions = useMemo(() => {
    return logs.filter((log) =>
      isFailed(log)
    ).length;
  }, [logs]);

  // =====================================================
  // DATE FILTER
  // =====================================================

  const applyDateFilter = (log) => {
    if (!log?.createdAt) return false;

    const logDate = new Date(log.createdAt);

    if (Number.isNaN(logDate.getTime())) {
      return false;
    }

    // Specific date
    if (dateFilter) {
      const selected = new Date(
        `${dateFilter}T00:00:00`
      );

      return (
        logDate.getFullYear() ===
          selected.getFullYear() &&
        logDate.getMonth() ===
          selected.getMonth() &&
        logDate.getDate() ===
          selected.getDate()
      );
    }

    // From date
    if (fromDate) {
      const from = new Date(
        `${fromDate}T00:00:00`
      );

      if (logDate < from) {
        return false;
      }
    }

    // To date
    if (toDate) {
      const to = new Date(
        `${toDate}T23:59:59`
      );

      if (logDate > to) {
        return false;
      }
    }

    return true;
  };

  // =====================================================
  // FILTERED LOGS
  // =====================================================

  const filteredLogs = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    return logs.filter((log) => {
      // Search
      const searchText = [
        log?.username,
        log?.role,
        log?.action,
        log?.module,
        log?.targetType,
        log?.targetId,
        log?.description,
        log?.requestMethod,
        log?.requestUrl,
        log?.ipAddress,
        getTarget(log),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (
        value &&
        !searchText.includes(value)
      ) {
        return false;
      }

      // Action
      if (
        actionFilter &&
        String(log?.action || "").toUpperCase() !==
          String(actionFilter).toUpperCase()
      ) {
        return false;
      }

      // Module
      if (
        moduleFilter &&
        String(log?.module || "").toUpperCase() !==
          String(moduleFilter).toUpperCase()
      ) {
        return false;
      }

      // Status
      if (
        statusFilter &&
        normalizeStatus(log?.status) !==
          statusFilter
      ) {
        return false;
      }

      // Date
      if (!applyDateFilter(log)) {
        return false;
      }

      return true;
    });
  }, [
    logs,
    search,
    actionFilter,
    moduleFilter,
    statusFilter,
    dateFilter,
    fromDate,
    toDate,
    schools,
  ]);

  // =====================================================
  // RESET FILTER
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setDateFilter("");
    setFromDate("");
    setToDate("");
    setActionFilter("");
    setModuleFilter("");
    setStatusFilter("");
    setPage(0);
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    fetchLogs();
    fetchSchools();
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const StatusBadge = ({ status }) => {
    const value = normalizeStatus(status);

    const success =
      value === "SUCCESS" ||
      value === "SUCCESSFUL" ||
      value === "COMPLETED";

    const failed =
      value === "FAILED" ||
      value === "FAILURE" ||
      value === "ERROR";

    if (success) {
      return (
        <span
          className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
          style={{
            background: "#dcfce7",
            color: "#16a34a",
            fontSize: "10px",
            fontWeight: "600",
          }}
        >
          <LuCircleCheck
            size={13}
            className="me-1"
          />
          Success
        </span>
      );
    }

    if (failed) {
      return (
        <span
          className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            fontSize: "10px",
            fontWeight: "600",
          }}
        >
          <LuCircleX
            size={13}
            className="me-1"
          />
          Failed
        </span>
      );
    }

    return (
      <span
        className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
        style={{
          background: "#f3f4f6",
          color: "#6b7280",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        {value || "Unknown"}
      </span>
    );
  };

  // =====================================================
  // METHOD BADGE
  // =====================================================

  const MethodBadge = ({ method }) => {
    const value =
      String(method || "-").toUpperCase();

    return (
      <span
        className="px-2 py-1 rounded-2"
        style={{
          background: "#f1edff",
          color: "#6f2cff",
          fontSize: "9px",
          fontWeight: "600",
        }}
      >
        {value}
      </span>
    );
  };

  // =====================================================
  // CARD
  // =====================================================

  const SummaryCard = ({
    title,
    value,
    icon,
    iconBg,
    iconColor,
  }) => {
    return (
      <div className="col-xl-3 col-md-6">
        <div
          className="card shadow border-0 rounded-3 h-100"
          style={{
            minHeight: "105px",
          }}
        >
          <div className="card-body d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 me-3"
              style={{
                width: "48px",
                height: "48px",
                background: iconBg,
                color: iconColor,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            <div>
              <div
                className="text-muted mb-1"
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                {title}
              </div>

              <h4
                className="fw-bold mb-0"
                style={{
                  fontSize: "23px",
                }}
              >
                {value}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div
          className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
          style={{
            minHeight: "70px",
          }}
        >
          <h4 className="fw-bold mb-1">
            Audit Log List
          </h4>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a
                  href="/"
                  className="text-decoration-none text-dark"
                >
                  Dashboard
                </a>
              </li>

              <li className="breadcrumb-item">
                General Settings
              </li>

              <li className="breadcrumb-item active text-primary">
                Audit Log
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="row g-3 mb-3">
          <SummaryCard
            title="Total Logs"
            value={totalElements}
            icon={<LuFileText size={23} />}
            iconBg="#f1edff"
            iconColor="#6f2cff"
          />

          <SummaryCard
            title="Today Logs"
            value={todayLogs}
            icon={<LuCalendarDays size={23} />}
            iconBg="#eaf4ff"
            iconColor="#2563eb"
          />

          <SummaryCard
            title="Successful Actions"
            value={successfulActions}
            icon={<LuCircleCheck size={23} />}
            iconBg="#dcfce7"
            iconColor="#16a34a"
          />

          <SummaryCard
            title="Failed Actions"
            value={failedActions}
            icon={<LuCircleX size={23} />}
            iconBg="#fee2e2"
            iconColor="#dc2626"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* FILTER CARD */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">
                  Search Audit Logs
                </h6>

                <small className="text-muted">
                  Search and filter system activity
                </small>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() =>
                  setShowFilter((prev) => !prev)
                }
              >
                <LuFilter
                  size={15}
                  className="me-1"
                />
                {showFilter
                  ? "Hide Filters"
                  : "More Filters"}
              </button>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label">
                  <h6>Search</h6>
                </label>

                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search user, action, module, target..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(0);
                    }}
                    style={{
                      paddingRight: "40px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "11px",
                    }}
                  />
                </div>
              </div>

              {/* DATE */}

              <div className="col-lg-3 col-md-6">
                <label className="form-label">
                  <h6>Date</h6>
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(
                      e.target.value
                    );

                    if (e.target.value) {
                      setFromDate("");
                      setToDate("");
                    }

                    setPage(0);
                  }}
                />
              </div>

              {/* STATUS */}

              <div className="col-lg-2 col-md-6">
                <label className="form-label">
                  <h6>Status</h6>
                </label>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );
                    setPage(0);
                  }}
                >
                  <option value="">
                    All Status
                  </option>
                  <option value="SUCCESS">
                    Success
                  </option>
                  <option value="FAILED">
                    Failed
                  </option>
                </select>
              </div>

              {/* RESET */}

              <div className="col-lg-3 col-md-6 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  <LuX
                    size={16}
                    className="me-1"
                  />
                  Clear Filters
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* MORE FILTERS */}
            {/* ================================================= */}

            {showFilter && (
              <div className="row g-3 mt-1 pt-3 border-top">
                {/* FROM DATE */}

                <div className="col-lg-3 col-md-6">
                  <label className="form-label">
                    <h6>From Date</h6>
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(
                        e.target.value
                      );

                      setDateFilter("");
                      setPage(0);
                    }}
                  />
                </div>

                {/* TO DATE */}

                <div className="col-lg-3 col-md-6">
                  <label className="form-label">
                    <h6>To Date</h6>
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) => {
                      setToDate(
                        e.target.value
                      );

                      setDateFilter("");
                      setPage(0);
                    }}
                  />
                </div>

                {/* ACTION */}

                <div className="col-lg-3 col-md-6">
                  <label className="form-label">
                    <h6>Action</h6>
                  </label>

                  <select
                    className="form-select"
                    value={actionFilter}
                    onChange={(e) => {
                      setActionFilter(
                        e.target.value
                      );
                      setPage(0);
                    }}
                  >
                    <option value="">
                      All Actions
                    </option>

                    {actionOptions.map(
                      (action) => (
                        <option
                          key={action}
                          value={action}
                        >
                          {action}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* MODULE */}

                <div className="col-lg-3 col-md-6">
                  <label className="form-label">
                    <h6>Module</h6>
                  </label>

                  <select
                    className="form-select"
                    value={moduleFilter}
                    onChange={(e) => {
                      setModuleFilter(
                        e.target.value
                      );
                      setPage(0);
                    }}
                  >
                    <option value="">
                      All Modules
                    </option>

                    {moduleOptions.map(
                      (module) => (
                        <option
                          key={module}
                          value={module}
                        >
                          {module}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-3 mt-3">
          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
                  style={{
                    width: "34px",
                    height: "34px",
                    background: "#f0eaff",
                  }}
                >
                  <LuActivity
                    size={18}
                    style={{
                      color: "#6f2cff",
                    }}
                  />
                </span>

                <div>
                  <h6 className="mb-0 fw-bold">
                    System Activity Logs
                  </h6>

                  <small className="text-muted">
                    Complete audit trail of system activities
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleRefresh}
                disabled={loading}
              >
                <LuRefreshCw
                  size={15}
                  className={`me-1 ${
                    loading
                      ? "spinner-border"
                      : ""
                  }`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1500px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#fafbff",
                      borderTop:
                        "1px solid #f0f0f0",
                      borderBottom:
                        "1px solid #eeeeee",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{
                        width: "50px",
                        fontSize: "12px",
                        color: "#555",
                        padding: "13px 10px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        width: "150px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      User
                    </th>

                    <th
                      style={{
                        width: "100px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Role
                    </th>

                    <th
                      style={{
                        width: "110px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Action
                    </th>

                    <th
                      style={{
                        width: "130px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Module
                    </th>

                    <th
                      style={{
                        width: "190px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Target
                    </th>

                    <th
                      style={{
                        width: "330px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Description
                    </th>

                    <th
                      style={{
                        width: "80px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Method
                    </th>

                    <th
                      style={{
                        width: "110px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Status
                    </th>

                    <th
                      style={{
                        width: "160px",
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      Date & Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* LOADING */}

                  {loading && (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        />

                        <div className="text-muted mt-2">
                          Loading audit logs...
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* EMPTY */}

                  {!loading &&
                    filteredLogs.length ===
                      0 && (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >
                          <LuFileText
                            size={38}
                            className="text-muted mb-2"
                          />

                          <div className="fw-semibold">
                            No audit logs found
                          </div>

                          <small className="text-muted">
                            Try changing your search
                            or filter criteria.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* DATA */}

                  {!loading &&
                    filteredLogs.map(
                      (log, index) => {
                        return (
                          <tr
                            key={
                              log?.id ||
                              `${page}-${index}`
                            }
                            style={{
                              borderBottom:
                                "1px solid #f3f3f3",
                            }}
                          >
                            {/* # */}

                            <td className="text-center">
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  color: "#666",
                                }}
                              >
                                {page * size +
                                  index +
                                  1}
                              </span>
                            </td>

                            {/* USER */}

                            <td>
                              <div className="fw-semibold">
                                {log?.username ||
                                  "-"}
                              </div>

                              {log?.userId && (
                                <small className="text-muted">
                                  ID: {log.userId}
                                </small>
                              )}
                            </td>

                            {/* ROLE */}

                            <td>
                              <span
                                className="px-2 py-1 rounded-2"
                                style={{
                                  background:
                                    "#f8f5ff",
                                  color:
                                    "#6f2cff",
                                  fontSize:
                                    "9px",
                                  fontWeight:
                                    "600",
                                }}
                              >
                                {log?.role ||
                                  "-"}
                              </span>
                            </td>

                            {/* ACTION */}

                            <td>
                              <span
                                style={{
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    "600",
                                  color:
                                    "#333",
                                }}
                              >
                                {log?.action ||
                                  "-"}
                              </span>
                            </td>

                            {/* MODULE */}

                            <td>
                              <span
                                className="px-2 py-1 rounded-2"
                                style={{
                                  background:
                                    "#eef5ff",
                                  color:
                                    "#2563eb",
                                  fontSize:
                                    "9px",
                                  fontWeight:
                                    "600",
                                }}
                              >
                                {log?.module ||
                                  "-"}
                              </span>
                            </td>

                            {/* TARGET */}

                            <td>
                              <div
                                className="fw-semibold"
                                style={{
                                  fontSize:
                                    "11px",
                                  color:
                                    "#333",
                                }}
                              >
                                {getTarget(log)}
                              </div>

                              {log?.targetType && (
                                <small
                                  className="text-muted"
                                  style={{
                                    fontSize:
                                      "9px",
                                  }}
                                >
                                  {log.targetType}
                                  {log?.targetId
                                    ? ` • ID: ${log.targetId}`
                                    : ""}
                                </small>
                              )}
                            </td>

                            {/* DESCRIPTION */}

                            <td>
                              <div
                                style={{
                                  fontSize:
                                    "11px",
                                  color:
                                    "#444",
                                  lineHeight:
                                    "1.5",
                                  maxWidth:
                                    "320px",
                                }}
                                title={
                                  log?.description ||
                                  ""
                                }
                              >
                                {log?.description ||
                                  "-"}
                              </div>
                            </td>

                            {/* METHOD */}

                            <td>
                              <MethodBadge
                                method={
                                  log?.requestMethod
                                }
                              />
                            </td>

                            {/* STATUS */}

                            <td>
                              <StatusBadge
                                status={
                                  log?.status
                                }
                              />
                            </td>

                            {/* DATE */}

                            <td>
                              <div
                                style={{
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    "500",
                                }}
                              >
                                {formatDateTime(
                                  log?.createdAt
                                )}
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

          {/* ================================================= */}
          {/* FOOTER / PAGINATION */}
          {/* ================================================= */}

          {!loading && (
            <div className="card-footer bg-white border-0">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {filteredLogs.length}
                  </strong>{" "}
                  logs on this page
                </small>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={page === 0}
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(0, prev - 1)
                      )
                    }
                  >
                    <LuChevronLeft size={16} />
                  </button>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    Page {totalPages === 0
                      ? 0
                      : page + 1}{" "}
                    of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={
                      page >= totalPages - 1 ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setPage((prev) =>
                        prev + 1
                      )
                    }
                  >
                    <LuChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuditLogList;