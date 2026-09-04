
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuSearch,
//   LuRefreshCw,
//   LuFileText,
//   LuCalendarDays,
//   LuCircleCheck,
//   LuCircleX,
//   LuActivity,
//   LuChevronLeft,
//   LuChevronRight,
//   LuFilter,
//   LuX,
// } from "react-icons/lu";
// import axiosInstance from "../../../api/axiosInstance";

// const AuditLogList = () => {
//   const token = localStorage.getItem("token");

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [logs, setLogs] = useState([]);
//   const [schools, setSchools] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [schoolLoading, setSchoolLoading] = useState(false);

//   const [search, setSearch] = useState("");

//   const [dateFilter, setDateFilter] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const [actionFilter, setActionFilter] = useState("");
//   const [moduleFilter, setModuleFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const [showFilter, setShowFilter] = useState(false);

//   const [page, setPage] = useState(0);
//   const [size] = useState(10);

//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   // =====================================================
//   // FETCH AUDIT LOGS
//   // =====================================================

//   const fetchLogs = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get("/api/audit-logs", {
//         params: {
//           page,
//           size,
//           sort: "createdAt,desc",
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("Audit Logs Response:", res.data);

//       const data = res.data || {};

//       setLogs(Array.isArray(data.content) ? data.content : []);
//       setTotalPages(data.totalPages || 0);
//       setTotalElements(data.totalElements || 0);
//     } catch (error) {
//       console.error("Audit Log Load Error:", error);
//       setLogs([]);
//       setTotalPages(0);
//       setTotalElements(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // FETCH SCHOOLS
//   // =====================================================

//   const fetchSchools = async () => {
//     try {
//       setSchoolLoading(true);

//       const res = await axiosInstance.get("/api/school/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data ||
//           res.data?.content ||
//           [];

//       setSchools(data);
//     } catch (error) {
//       console.error("School Load Error:", error);
//       setSchools([]);
//     } finally {
//       setSchoolLoading(false);
//     }
//   };

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   useEffect(() => {
//     fetchLogs();
//   }, [page]);

//   // =====================================================
//   // SCHOOL NAME FROM TARGET ID
//   // =====================================================

//   const getSchoolName = (schoolId) => {
//     if (!schoolId) return "-";

//     const school = schools.find(
//       (item) =>
//         String(item?.id) === String(schoolId)
//     );

//     if (!school) {
//       return `School #${schoolId}`;
//     }

//     return (
//       school.schoolName ||
//       school.name ||
//       school.organizationName ||
//       `School #${schoolId}`
//     );
//   };

//   // =====================================================
//   // TARGET DISPLAY
//   // =====================================================

//   const getTarget = (log) => {
//     const targetType =
//       log?.targetType ||
//       log?.target_type ||
//       "";

//     const targetId =
//       log?.targetId ??
//       log?.target_id ??
//       "";

//     if (!targetType && !targetId) {
//       return "-";
//     }

//     if (
//       targetType.toUpperCase() === "SCHOOL"
//     ) {
//       return getSchoolName(targetId);
//     }

//     if (targetType && targetId) {
//       return `${targetType} #${targetId}`;
//     }

//     return targetId || targetType || "-";
//   };

//   // =====================================================
//   // STATUS
//   // =====================================================

//   const normalizeStatus = (status) => {
//     if (!status) return "";

//     return String(status).toUpperCase();
//   };

//   const isSuccess = (log) => {
//     const status = normalizeStatus(log?.status);

//     return (
//       status === "SUCCESS" ||
//       status === "SUCCESSFUL" ||
//       status === "COMPLETED"
//     );
//   };

//   const isFailed = (log) => {
//     const status = normalizeStatus(log?.status);

//     return (
//       status === "FAILED" ||
//       status === "FAILURE" ||
//       status === "ERROR"
//     );
//   };

//   // =====================================================
//   // DATE FORMAT
//   // =====================================================

//   const formatDateTime = (value) => {
//     if (!value) return "-";

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return value;
//     }

//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDate = (value) => {
//     if (!value) return "-";

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return value;
//     }

//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =====================================================
//   // ACTION LIST
//   // =====================================================

//   const actionOptions = useMemo(() => {
//     return [
//       ...new Set(
//         logs
//           .map((log) => log?.action)
//           .filter(Boolean)
//       ),
//     ];
//   }, [logs]);

//   // =====================================================
//   // MODULE LIST
//   // =====================================================

//   const moduleOptions = useMemo(() => {
//     return [
//       ...new Set(
//         logs
//           .map((log) => log?.module)
//           .filter(Boolean)
//       ),
//     ];
//   }, [logs]);

//   // =====================================================
//   // TODAY CHECK
//   // =====================================================

//   const isToday = (value) => {
//     if (!value) return false;

//     const date = new Date(value);
//     const today = new Date();

//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   // =====================================================
//   // CARD COUNTS
//   // =====================================================

//   const todayLogs = useMemo(() => {
//     return logs.filter((log) =>
//       isToday(log?.createdAt)
//     ).length;
//   }, [logs]);

//   const successfulActions = useMemo(() => {
//     return logs.filter((log) =>
//       isSuccess(log)
//     ).length;
//   }, [logs]);

//   const failedActions = useMemo(() => {
//     return logs.filter((log) =>
//       isFailed(log)
//     ).length;
//   }, [logs]);

//   // =====================================================
//   // DATE FILTER
//   // =====================================================

//   const applyDateFilter = (log) => {
//     if (!log?.createdAt) return false;

//     const logDate = new Date(log.createdAt);

//     if (Number.isNaN(logDate.getTime())) {
//       return false;
//     }

//     // Specific date
//     if (dateFilter) {
//       const selected = new Date(
//         `${dateFilter}T00:00:00`
//       );

//       return (
//         logDate.getFullYear() ===
//           selected.getFullYear() &&
//         logDate.getMonth() ===
//           selected.getMonth() &&
//         logDate.getDate() ===
//           selected.getDate()
//       );
//     }

//     // From date
//     if (fromDate) {
//       const from = new Date(
//         `${fromDate}T00:00:00`
//       );

//       if (logDate < from) {
//         return false;
//       }
//     }

//     // To date
//     if (toDate) {
//       const to = new Date(
//         `${toDate}T23:59:59`
//       );

//       if (logDate > to) {
//         return false;
//       }
//     }

//     return true;
//   };

//   // =====================================================
//   // FILTERED LOGS
//   // =====================================================

//   const filteredLogs = useMemo(() => {
//     const value = search
//       .toLowerCase()
//       .trim();

//     return logs.filter((log) => {
//       // Search
//       const searchText = [
//         log?.username,
//         log?.role,
//         log?.action,
//         log?.module,
//         log?.targetType,
//         log?.targetId,
//         log?.description,
//         log?.requestMethod,
//         log?.requestUrl,
//         log?.ipAddress,
//         getTarget(log),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       if (
//         value &&
//         !searchText.includes(value)
//       ) {
//         return false;
//       }

//       // Action
//       if (
//         actionFilter &&
//         String(log?.action || "").toUpperCase() !==
//           String(actionFilter).toUpperCase()
//       ) {
//         return false;
//       }

//       // Module
//       if (
//         moduleFilter &&
//         String(log?.module || "").toUpperCase() !==
//           String(moduleFilter).toUpperCase()
//       ) {
//         return false;
//       }

//       // Status
//       if (
//         statusFilter &&
//         normalizeStatus(log?.status) !==
//           statusFilter
//       ) {
//         return false;
//       }

//       // Date
//       if (!applyDateFilter(log)) {
//         return false;
//       }

//       return true;
//     });
//   }, [
//     logs,
//     search,
//     actionFilter,
//     moduleFilter,
//     statusFilter,
//     dateFilter,
//     fromDate,
//     toDate,
//     schools,
//   ]);

//   // =====================================================
//   // RESET FILTER
//   // =====================================================

//   const resetFilters = () => {
//     setSearch("");
//     setDateFilter("");
//     setFromDate("");
//     setToDate("");
//     setActionFilter("");
//     setModuleFilter("");
//     setStatusFilter("");
//     setPage(0);
//   };

//   // =====================================================
//   // REFRESH
//   // =====================================================

//   const handleRefresh = () => {
//     fetchLogs();
//     fetchSchools();
//   };

//   // =====================================================
//   // STATUS BADGE
//   // =====================================================

//   const StatusBadge = ({ status }) => {
//     const value = normalizeStatus(status);

//     const success =
//       value === "SUCCESS" ||
//       value === "SUCCESSFUL" ||
//       value === "COMPLETED";

//     const failed =
//       value === "FAILED" ||
//       value === "FAILURE" ||
//       value === "ERROR";

//     if (success) {
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
//           Success
//         </span>
//       );
//     }

//     if (failed) {
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
//           Failed
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
//         {value || "Unknown"}
//       </span>
//     );
//   };

//   // =====================================================
//   // METHOD BADGE
//   // =====================================================

//   const MethodBadge = ({ method }) => {
//     const value =
//       String(method || "-").toUpperCase();

//     return (
//       <span
//         className="px-2 py-1 rounded-2"
//         style={{
//           background: "#f1edff",
//           color: "#6f2cff",
//           fontSize: "9px",
//           fontWeight: "600",
//         }}
//       >
//         {value}
//       </span>
//     );
//   };

//   // =====================================================
//   // CARD
//   // =====================================================

//   const SummaryCard = ({
//     title,
//     value,
//     icon,
//     iconBg,
//     iconColor,
//   }) => {
//     return (
//       <div className="col-xl-3 col-md-6">
//         <div
//           className="card shadow border-0 rounded-3 h-100"
//           style={{
//             minHeight: "105px",
//           }}
//         >
//           <div className="card-body d-flex align-items-center">
//             <div
//               className="d-flex align-items-center justify-content-center rounded-3 me-3"
//               style={{
//                 width: "48px",
//                 height: "48px",
//                 background: iconBg,
//                 color: iconColor,
//                 flexShrink: 0,
//               }}
//             >
//               {icon}
//             </div>

//             <div>
//               <div
//                 className="text-muted mb-1"
//                 style={{
//                   fontSize: "11px",
//                   fontWeight: "500",
//                 }}
//               >
//                 {title}
//               </div>

//               <h4
//                 className="fw-bold mb-0"
//                 style={{
//                   fontSize: "23px",
//                 }}
//               >
//                 {value}
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <>
//       {/* ================================================= */}
//       {/* PAGE HEADER */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{
//             minHeight: "70px",
//           }}
//         >
//           <h4 className="fw-bold mb-1">
//             Audit Log List
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
//                 General Settings
//               </li>

//               <li className="breadcrumb-item active text-primary">
//                 Audit Log
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* SUMMARY CARDS */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="row g-3 mb-3">
//           <SummaryCard
//             title="Total Logs"
//             value={totalElements}
//             icon={<LuFileText size={23} />}
//             iconBg="#f1edff"
//             iconColor="#6f2cff"
//           />

//           <SummaryCard
//             title="Today Logs"
//             value={todayLogs}
//             icon={<LuCalendarDays size={23} />}
//             iconBg="#eaf4ff"
//             iconColor="#2563eb"
//           />

//           <SummaryCard
//             title="Successful Actions"
//             value={successfulActions}
//             icon={<LuCircleCheck size={23} />}
//             iconBg="#dcfce7"
//             iconColor="#16a34a"
//           />

//           <SummaryCard
//             title="Failed Actions"
//             value={failedActions}
//             icon={<LuCircleX size={23} />}
//             iconBg="#fee2e2"
//             iconColor="#dc2626"
//           />
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FILTER CARD */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3">
//           <div className="card-header bg-white">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h6 className="fw-bold mb-1">
//                   Search Audit Logs
//                 </h6>

//                 <small className="text-muted">
//                   Search and filter system activity
//                 </small>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm btn-light"
//                 onClick={() =>
//                   setShowFilter((prev) => !prev)
//                 }
//               >
//                 <LuFilter
//                   size={15}
//                   className="me-1"
//                 />
//                 {showFilter
//                   ? "Hide Filters"
//                   : "More Filters"}
//               </button>
//             </div>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">
//               {/* SEARCH */}

//               <div className="col-lg-4 col-md-6">
//                 <label className="form-label">
//                   <h6>Search</h6>
//                 </label>

//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search user, action, module, target..."
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(e.target.value);
//                       setPage(0);
//                     }}
//                     style={{
//                       paddingRight: "40px",
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

//               {/* DATE */}

//               <div className="col-lg-3 col-md-6">
//                 <label className="form-label">
//                   <h6>Date</h6>
//                 </label>

//                 <input
//                   type="date"
//                   className="form-control"
//                   value={dateFilter}
//                   onChange={(e) => {
//                     setDateFilter(
//                       e.target.value
//                     );

//                     if (e.target.value) {
//                       setFromDate("");
//                       setToDate("");
//                     }

//                     setPage(0);
//                   }}
//                 />
//               </div>

//               {/* STATUS */}

//               <div className="col-lg-2 col-md-6">
//                 <label className="form-label">
//                   <h6>Status</h6>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(
//                       e.target.value
//                     );
//                     setPage(0);
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
//                 </select>
//               </div>

//               {/* RESET */}

//               <div className="col-lg-3 col-md-6 d-flex align-items-end">
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary w-100"
//                   onClick={resetFilters}
//                 >
//                   <LuX
//                     size={16}
//                     className="me-1"
//                   />
//                   Clear Filters
//                 </button>
//               </div>
//             </div>

//             {/* ================================================= */}
//             {/* MORE FILTERS */}
//             {/* ================================================= */}

//             {showFilter && (
//               <div className="row g-3 mt-1 pt-3 border-top">
//                 {/* FROM DATE */}

//                 <div className="col-lg-3 col-md-6">
//                   <label className="form-label">
//                     <h6>From Date</h6>
//                   </label>

//                   <input
//                     type="date"
//                     className="form-control"
//                     value={fromDate}
//                     onChange={(e) => {
//                       setFromDate(
//                         e.target.value
//                       );

//                       setDateFilter("");
//                       setPage(0);
//                     }}
//                   />
//                 </div>

//                 {/* TO DATE */}

//                 <div className="col-lg-3 col-md-6">
//                   <label className="form-label">
//                     <h6>To Date</h6>
//                   </label>

//                   <input
//                     type="date"
//                     className="form-control"
//                     value={toDate}
//                     min={fromDate || undefined}
//                     onChange={(e) => {
//                       setToDate(
//                         e.target.value
//                       );

//                       setDateFilter("");
//                       setPage(0);
//                     }}
//                   />
//                 </div>

//                 {/* ACTION */}

//                 <div className="col-lg-3 col-md-6">
//                   <label className="form-label">
//                     <h6>Action</h6>
//                   </label>

//                   <select
//                     className="form-select"
//                     value={actionFilter}
//                     onChange={(e) => {
//                       setActionFilter(
//                         e.target.value
//                       );
//                       setPage(0);
//                     }}
//                   >
//                     <option value="">
//                       All Actions
//                     </option>

//                     {actionOptions.map(
//                       (action) => (
//                         <option
//                           key={action}
//                           value={action}
//                         >
//                           {action}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </div>

//                 {/* MODULE */}

//                 <div className="col-lg-3 col-md-6">
//                   <label className="form-label">
//                     <h6>Module</h6>
//                   </label>

//                   <select
//                     className="form-select"
//                     value={moduleFilter}
//                     onChange={(e) => {
//                       setModuleFilter(
//                         e.target.value
//                       );
//                       setPage(0);
//                     }}
//                   >
//                     <option value="">
//                       All Modules
//                     </option>

//                     {moduleOptions.map(
//                       (module) => (
//                         <option
//                           key={module}
//                           value={module}
//                         >
//                           {module}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* TABLE */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3 mt-3">
//           {/* HEADER */}

//           <div className="card-header bg-white border-0 p-3">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <span
//                   className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                   style={{
//                     width: "34px",
//                     height: "34px",
//                     background: "#f0eaff",
//                   }}
//                 >
//                   <LuActivity
//                     size={18}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-bold">
//                     System Activity Logs
//                   </h6>

//                   <small className="text-muted">
//                     Complete audit trail of system activities
//                   </small>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={handleRefresh}
//                 disabled={loading}
//               >
//                 <LuRefreshCw
//                   size={15}
//                   className={`me-1 ${
//                     loading
//                       ? "spinner-border"
//                       : ""
//                   }`}
//                 />
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {/* TABLE */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "1500px",
//                 }}
//               >
//                 <thead>
//                   <tr
//                     style={{
//                       background: "#fafbff",
//                       borderTop:
//                         "1px solid #f0f0f0",
//                       borderBottom:
//                         "1px solid #eeeeee",
//                     }}
//                   >
//                     <th
//                       className="text-center"
//                       style={{
//                         width: "50px",
//                         fontSize: "12px",
//                         color: "#555",
//                         padding: "13px 10px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       style={{
//                         width: "150px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       User
//                     </th>

//                     <th
//                       style={{
//                         width: "100px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Role
//                     </th>

//                     <th
//                       style={{
//                         width: "110px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Action
//                     </th>

//                     <th
//                       style={{
//                         width: "130px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Module
//                     </th>

//                     <th
//                       style={{
//                         width: "190px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Target
//                     </th>

//                     <th
//                       style={{
//                         width: "330px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Description
//                     </th>

//                     <th
//                       style={{
//                         width: "80px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Method
//                     </th>

//                     <th
//                       style={{
//                         width: "110px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       style={{
//                         width: "160px",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Date & Time
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {/* LOADING */}

//                   {loading && (
//                     <tr>
//                       <td
//                         colSpan="10"
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
//                           colSpan="10"
//                           className="text-center py-5"
//                         >
//                           <LuFileText
//                             size={38}
//                             className="text-muted mb-2"
//                           />

//                           <div className="fw-semibold">
//                             No audit logs found
//                           </div>

//                           <small className="text-muted">
//                             Try changing your search
//                             or filter criteria.
//                           </small>
//                         </td>
//                       </tr>
//                     )}

//                   {/* DATA */}

//                   {!loading &&
//                     filteredLogs.map(
//                       (log, index) => {
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
//                             {/* # */}

//                             <td className="text-center">
//                               <span
//                                 style={{
//                                   fontSize: "11px",
//                                   fontWeight: "600",
//                                   color: "#666",
//                                 }}
//                               >
//                                 {page * size +
//                                   index +
//                                   1}
//                               </span>
//                             </td>

//                             {/* USER */}

//                             <td>
//                               <div className="fw-semibold">
//                                 {log?.username ||
//                                   "-"}
//                               </div>

//                               {log?.userId && (
//                                 <small className="text-muted">
//                                   ID: {log.userId}
//                                 </small>
//                               )}
//                             </td>

//                             {/* ROLE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background:
//                                     "#f8f5ff",
//                                   color:
//                                     "#6f2cff",
//                                   fontSize:
//                                     "9px",
//                                   fontWeight:
//                                     "600",
//                                 }}
//                               >
//                                 {log?.role ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* ACTION */}

//                             <td>
//                               <span
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                   fontWeight:
//                                     "600",
//                                   color:
//                                     "#333",
//                                 }}
//                               >
//                                 {log?.action ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* MODULE */}

//                             <td>
//                               <span
//                                 className="px-2 py-1 rounded-2"
//                                 style={{
//                                   background:
//                                     "#eef5ff",
//                                   color:
//                                     "#2563eb",
//                                   fontSize:
//                                     "9px",
//                                   fontWeight:
//                                     "600",
//                                 }}
//                               >
//                                 {log?.module ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* TARGET */}

//                             <td>
//                               <div
//                                 className="fw-semibold"
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                   color:
//                                     "#333",
//                                 }}
//                               >
//                                 {getTarget(log)}
//                               </div>

//                               {log?.targetType && (
//                                 <small
//                                   className="text-muted"
//                                   style={{
//                                     fontSize:
//                                       "9px",
//                                   }}
//                                 >
//                                   {log.targetType}
//                                   {log?.targetId
//                                     ? ` • ID: ${log.targetId}`
//                                     : ""}
//                                 </small>
//                               )}
//                             </td>

//                             {/* DESCRIPTION */}

//                             <td>
//                               <div
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                   color:
//                                     "#444",
//                                   lineHeight:
//                                     "1.5",
//                                   maxWidth:
//                                     "320px",
//                                 }}
//                                 title={
//                                   log?.description ||
//                                   ""
//                                 }
//                               >
//                                 {log?.description ||
//                                   "-"}
//                               </div>
//                             </td>

//                             {/* METHOD */}

//                             <td>
//                               <MethodBadge
//                                 method={
//                                   log?.requestMethod
//                                 }
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
//                               <div
//                                 style={{
//                                   fontSize:
//                                     "11px",
//                                   fontWeight:
//                                     "500",
//                                 }}
//                               >
//                                 {formatDateTime(
//                                   log?.createdAt
//                                 )}
//                               </div>
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

//           {!loading && (
//             <div className="card-footer bg-white border-0">
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//                 <small className="text-muted">
//                   Showing{" "}
//                   <strong>
//                     {filteredLogs.length}
//                   </strong>{" "}
//                   logs on this page
//                 </small>

//                 <div className="d-flex align-items-center gap-2">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-light"
//                     disabled={page === 0}
//                     onClick={() =>
//                       setPage((prev) =>
//                         Math.max(0, prev - 1)
//                       )
//                     }
//                   >
//                     <LuChevronLeft size={16} />
//                   </button>

//                   <span
//                     style={{
//                       fontSize: "11px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Page {totalPages === 0
//                       ? 0
//                       : page + 1}{" "}
//                     of {totalPages}
//                   </span>

//                   <button
//                     type="button"
//                     className="btn btn-sm btn-light"
//                     disabled={
//                       page >= totalPages - 1 ||
//                       totalPages === 0
//                     }
//                     onClick={() =>
//                       setPage((prev) =>
//                         prev + 1
//                       )
//                     }
//                   >
//                     <LuChevronRight
//                       size={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
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
  // ALLOWED METHODS
  // ONLY THESE AUDIT LOGS WILL BE SHOWN
  // =====================================================

  const allowedMethods = ["POST", "PUT", "DELETE","GET"];

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

      const content = Array.isArray(data.content)
        ? data.content
        : [];

      // =================================================
      // ONLY POST / PUT / DELETE
      // =================================================

      const filteredByMethod = content.filter((log) => {
        const method = String(
          log?.requestMethod ||
            log?.request_method ||
            ""
        ).toUpperCase();

        return allowedMethods.includes(method);
      });

      setLogs(filteredByMethod);

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
  // SCHOOL NAME
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
      // =================================================
      // STRICT METHOD FILTER
      // =================================================

      const method = String(
        log?.requestMethod ||
          log?.request_method ||
          ""
      ).toUpperCase();

      if (!allowedMethods.includes(method)) {
        return false;
      }

      // =================================================
      // SEARCH
      // =================================================

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

      // =================================================
      // ACTION
      // =================================================

      if (
        actionFilter &&
        String(log?.action || "").toUpperCase() !==
          String(actionFilter).toUpperCase()
      ) {
        return false;
      }

      // =================================================
      // MODULE
      // =================================================

      if (
        moduleFilter &&
        String(log?.module || "").toUpperCase() !==
          String(moduleFilter).toUpperCase()
      ) {
        return false;
      }

      // =================================================
      // STATUS
      // =================================================

      if (
        statusFilter &&
        normalizeStatus(log?.status) !==
          statusFilter
      ) {
        return false;
      }

      // =================================================
      // DATE
      // =================================================

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
        <span className="audit-status audit-status-success">
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
        <span className="audit-status audit-status-failed">
          <LuCircleX
            size={13}
            className="me-1"
          />
          Failed
        </span>
      );
    }

    return (
      <span className="audit-status audit-status-other">
        {value || "Unknown"}
      </span>
    );
  };

  // =====================================================
  // METHOD BADGE
  // =====================================================

  const MethodBadge = ({ method }) => {
    const value = String(
      method || "-"
    ).toUpperCase();

    let className = "audit-method";

    if (value === "POST") {
      className += " audit-method-post";
    } else if (value === "PUT") {
      className += " audit-method-put";
    } else if (value === "DELETE") {
      className += " audit-method-delete";
    }

    return (
      <span className={className}>
        {value}
      </span>
    );
  };

  // =====================================================
  // SUMMARY CARD
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
        <div className="card audit-card h-100">
          <div className="card-body d-flex align-items-center">
            <div
              className="audit-summary-icon me-3"
              style={{
                background: iconBg,
                color: iconColor,
              }}
            >
              {icon}
            </div>

            <div>
              <div className="audit-summary-title">
                {title}
              </div>

              <h4 className="fw-bold mb-0">
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
      <style>
        {`
          /* =================================================
             PAGE
          ================================================= */

          .audit-page-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          .audit-title-icon {
            width: 52px;
            height: 52px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #ffffff;
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #3b82f6
              );
            box-shadow:
              0 8px 20px
              rgba(37, 99, 235, 0.22);
          }

          .audit-breadcrumb {
            background:
              rgba(239, 246, 255, 0.75);
            border-top:
              1px solid #e0ecff;
          }

          /* =================================================
             CARDS
          ================================================= */

          .audit-card {
            border: 0 !important;
            border-radius: 16px !important;
            box-shadow:
              0 6px 22px
              rgba(15, 23, 42, 0.07) !important;
          }

          .audit-summary-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .audit-summary-title {
            font-size: 11px;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 3px;
          }

          .audit-section-icon {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #3b82f6
              );
            box-shadow:
              0 7px 16px
              rgba(37, 99, 235, 0.18);
          }

          /* =================================================
             FORM CONTROLS
          ================================================= */

          .audit-control {
            min-height: 42px;
            border-radius: 12px !important;
            border: 1px solid #dbeafe !important;
            font-size: 13px;
          }

          .audit-control:focus {
            border-color: #93c5fd !important;
            box-shadow:
              0 0 0 0.2rem
              rgba(37, 99, 235, 0.10) !important;
          }

          .audit-filter-btn {
            min-height: 40px;
            border-radius: 10px !important;
            background: #eff6ff !important;
            color: #2563eb !important;
            border: 1px solid #bfdbfe !important;
            font-size: 12px;
            font-weight: 600;
          }

          .audit-filter-btn:hover {
            background: #dbeafe !important;
          }

          .audit-clear-btn {
            min-height: 42px;
            border-radius: 10px !important;
            border: 1px solid #dbeafe !important;
            color: #475569 !important;
            background: #ffffff !important;
            font-size: 12px;
            font-weight: 600;
          }

          .audit-clear-btn:hover {
            background: #f8fbff !important;
            border-color: #93c5fd !important;
            color: #2563eb !important;
          }

          /* =================================================
             TABLE
          ================================================= */

          .audit-table {
            min-width: 1500px;
          }

          .audit-table thead th {
            background: #eff6ff !important;
            color: #1e3a8a !important;
            border-bottom: 1px solid #dbeafe !important;
            font-size: 12px;
            font-weight: 600;
            padding: 13px 10px;
            white-space: nowrap;
          }

          .audit-table tbody tr {
            border-bottom: 1px solid #edf2f7;
            transition: background 0.15s ease;
          }

          .audit-table tbody tr:hover {
            background: #f8fbff;
          }

          .audit-user {
            font-size: 12px;
            font-weight: 600;
            color: #1e293b;
          }

          .audit-user-id {
            font-size: 9px;
            color: #94a3b8;
          }

          /* =================================================
             ROLE / MODULE
          ================================================= */

          .audit-role-badge,
          .audit-module-badge {
            display: inline-flex;
            align-items: center;
            padding: 5px 8px;
            border-radius: 8px;
            font-size: 9px;
            font-weight: 600;
          }

          .audit-role-badge {
            background: #eef2ff;
            color: #4f46e5;
            border: 1px solid #c7d2fe;
          }

          .audit-module-badge {
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
          }

          .audit-action {
            font-size: 11px;
            font-weight: 600;
            color: #334155;
          }

          .audit-target {
            font-size: 11px;
            font-weight: 600;
            color: #334155;
          }

          .audit-target-type {
            font-size: 9px;
            color: #94a3b8;
          }

          .audit-description {
            font-size: 11px;
            color: #475569;
            line-height: 1.5;
            max-width: 320px;
          }

          /* =================================================
             METHOD
          ================================================= */

          .audit-method {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 58px;
            padding: 5px 8px;
            border-radius: 8px;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.3px;
          }

          .audit-method-post {
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
          }

          .audit-method-put {
            background: #eef2ff;
            color: #4f46e5;
            border: 1px solid #c7d2fe;
          }

          .audit-method-delete {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          /* =================================================
             STATUS
          ================================================= */

          .audit-status {
            display: inline-flex;
            align-items: center;
            padding: 5px 8px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
          }

          .audit-status-success {
            background: #dcfce7;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }

          .audit-status-failed {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          .audit-status-other {
            background: #f1f5f9;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }

          /* =================================================
             DATE
          ================================================= */

          .audit-date {
            font-size: 11px;
            font-weight: 500;
            color: #334155;
          }

          /* =================================================
             SEARCH
          ================================================= */

          .audit-search-wrapper {
            position: relative;
            width: 300px;
          }

          .audit-search-input {
            height: 40px !important;
            padding-right: 40px !important;
            border-radius: 10px !important;
            border: 1px solid #dbeafe !important;
            font-size: 12px;
          }

          .audit-search-input:focus {
            border-color: #93c5fd !important;
            box-shadow:
              0 0 0 0.2rem
              rgba(37, 99, 235, 0.10) !important;
          }

          /* =================================================
             PAGINATION
          ================================================= */

          .audit-page-btn {
            width: 34px;
            height: 34px;
            padding: 0 !important;
            border-radius: 9px !important;
            border: 1px solid #dbeafe !important;
            background: #ffffff !important;
            color: #2563eb !important;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .audit-page-btn:hover:not(:disabled) {
            background: #eff6ff !important;
            border-color: #93c5fd !important;
          }

          .audit-page-btn:disabled {
            opacity: 0.45;
          }

          .audit-page-number {
            font-size: 11px;
            font-weight: 600;
            color: #475569;
          }

          /* =================================================
             EMPTY STATE
          ================================================= */

          .audit-empty-icon {
            width: 58px;
            height: 58px;
            border-radius: 16px;
            background: #eff6ff;
            color: #2563eb;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
          }

          /* =================================================
             FOOTER
          ================================================= */

          .audit-footer {
            border-top: 1px solid #edf2f7 !important;
          }

          .audit-count-badge {
            display: inline-flex;
            align-items: center;
            padding: 5px 9px;
            border-radius: 8px;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            font-size: 10px;
            font-weight: 600;
          }

          /* =================================================
             RESPONSIVE
          ================================================= */

          @media (max-width: 768px) {
            .audit-search-wrapper {
              width: 100%;
            }

            .audit-title-row {
              align-items: flex-start !important;
            }
          }

          @media (max-width: 576px) {
            .audit-title-row {
              flex-direction: column;
            }

            .audit-search-wrapper {
              width: 100%;
            }

            .audit-footer-row {
              flex-direction: column !important;
              align-items: flex-start !important;
            }

            .audit-table {
              min-width: 1500px;
            }
          }
        `}
      </style>

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="mx-2 mt-2 mb-3">
        <div className="audit-page-header rounded-4 shadow overflow-hidden">
          <div className="p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center gap-3 audit-title-row">
              <div className="d-flex align-items-center gap-3">
                <div className="audit-title-icon">
                  <LuActivity size={27} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Audit Log List
                  </h5>

                  <div className="text-muted small">
                    Track POST, PUT and DELETE activities
                    across the system.
                  </div>
                </div>
              </div>

              <span className="audit-count-badge">
                POST • PUT • DELETE
              </span>
            </div>
          </div>

          <div className="audit-breadcrumb px-4 py-2">
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
            iconBg="#eff6ff"
            iconColor="#2563eb"
          />

          <SummaryCard
            title="Today Logs"
            value={todayLogs}
            icon={<LuCalendarDays size={23} />}
            iconBg="#eff6ff"
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
        <div className="card audit-card">
          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center">
                <div className="audit-section-icon me-3">
                  <LuFilter size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Search Audit Logs
                  </h6>

                  <small className="text-muted">
                    Search and filter POST, PUT and DELETE
                    activities
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="btn audit-filter-btn"
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
                <label className="form-label fw-semibold small">
                  Search
                </label>

                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control audit-control"
                    placeholder="Search user, action, module, target..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(0);
                    }}
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

              {/* DATE */}

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold small">
                  Date
                </label>

                <input
                  type="date"
                  className="form-control audit-control"
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
                <label className="form-label fw-semibold small">
                  Status
                </label>

                <select
                  className="form-select audit-control"
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
                  className="btn audit-clear-btn w-100"
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
                  <label className="form-label fw-semibold small">
                    From Date
                  </label>

                  <input
                    type="date"
                    className="form-control audit-control"
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
                  <label className="form-label fw-semibold small">
                    To Date
                  </label>

                  <input
                    type="date"
                    className="form-control audit-control"
                    value={toDate}
                    min={
                      fromDate || undefined
                    }
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
                  <label className="form-label fw-semibold small">
                    Action
                  </label>

                  <select
                    className="form-select audit-control"
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
                  <label className="form-label fw-semibold small">
                    Module
                  </label>

                  <select
                    className="form-select audit-control"
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
        <div className="card audit-card mt-3">
          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center">
                <div className="audit-section-icon me-3">
                  <LuActivity size={20} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    System Activity Logs
                  </h6>

                  <small className="text-muted">
                    Only POST, PUT and DELETE activities
                    are displayed
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="audit-search-wrapper">
                  <input
                    type="text"
                    className="form-control audit-search-input"
                    placeholder="Search current logs..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(0);
                    }}
                  />

                  <LuSearch
                    size={16}
                    className="position-absolute text-muted"
                    style={{
                      right: "12px",
                      top: "12px",
                    }}
                  />
                </div>

                <button
                  type="button"
                  className="btn audit-clear-btn"
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
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 audit-table">
                <thead>
                  <tr>
                    <th
                      className="text-center"
                      style={{
                        width: "50px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        width: "150px",
                      }}
                    >
                      User
                    </th>

                    <th
                      style={{
                        width: "100px",
                      }}
                    >
                      Role
                    </th>

                    <th
                      style={{
                        width: "110px",
                      }}
                    >
                      Action
                    </th>

                    <th
                      style={{
                        width: "130px",
                      }}
                    >
                      Module
                    </th>

                    <th
                      style={{
                        width: "190px",
                      }}
                    >
                      Target
                    </th>

                    <th
                      style={{
                        width: "330px",
                      }}
                    >
                      Description
                    </th>

                    <th
                      style={{
                        width: "80px",
                      }}
                    >
                      Method
                    </th>

                    <th
                      style={{
                        width: "110px",
                      }}
                    >
                      Status
                    </th>

                    <th
                      style={{
                        width: "160px",
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
                    filteredLogs.length === 0 && (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >
                          <div className="audit-empty-icon">
                            <LuFileText size={30} />
                          </div>

                          <div className="fw-semibold">
                            No audit logs found
                          </div>

                          <small className="text-muted">
                            No POST, PUT or DELETE
                            activities match your
                            filters.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* DATA */}

                  {!loading &&
                    filteredLogs.map(
                      (log, index) => {
                        const method =
                          String(
                            log?.requestMethod ||
                              log?.request_method ||
                              "-"
                          ).toUpperCase();

                        return (
                          <tr
                            key={
                              log?.id ||
                              `${page}-${index}`
                            }
                          >
                            {/* # */}

                            <td className="text-center">
                              <span className="text-muted small fw-semibold">
                                {page * size +
                                  index +
                                  1}
                              </span>
                            </td>

                            {/* USER */}

                            <td>
                              <div className="audit-user">
                                {log?.username ||
                                  "-"}
                              </div>

                              {log?.userId && (
                                <div className="audit-user-id">
                                  ID: {log.userId}
                                </div>
                              )}
                            </td>

                            {/* ROLE */}

                            <td>
                              <span className="audit-role-badge">
                                {log?.role || "-"}
                              </span>
                            </td>

                            {/* ACTION */}

                            <td>
                              <span className="audit-action">
                                {log?.action || "-"}
                              </span>
                            </td>

                            {/* MODULE */}

                            <td>
                              <span className="audit-module-badge">
                                {log?.module || "-"}
                              </span>
                            </td>

                            {/* TARGET */}

                            <td>
                              <div className="audit-target">
                                {getTarget(log)}
                              </div>

                              {log?.targetType && (
                                <div className="audit-target-type">
                                  {log.targetType}

                                  {log?.targetId
                                    ? ` • ID: ${log.targetId}`
                                    : ""}
                                </div>
                              )}
                            </td>

                            {/* DESCRIPTION */}

                            <td>
                              <div
                                className="audit-description"
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
                                method={method}
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
                              <div className="audit-date">
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
            <div className="card-footer bg-white border-0 audit-footer">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 audit-footer-row">
                <div>
                  <small className="text-muted">
                    Showing{" "}
                    <strong>
                      {filteredLogs.length}
                    </strong>{" "}
                    POST / PUT / DELETE logs
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn audit-page-btn"
                    disabled={page === 0}
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(
                          0,
                          prev - 1
                        )
                      )
                    }
                  >
                    <LuChevronLeft size={16} />
                  </button>

                  <span className="audit-page-number">
                    Page{" "}
                    {totalPages === 0
                      ? 0
                      : page + 1}{" "}
                    of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn audit-page-btn"
                    disabled={
                      page >=
                        totalPages - 1 ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setPage(
                        (prev) =>
                          prev + 1
                      )
                    }
                  >
                    <LuChevronRight size={16} />
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