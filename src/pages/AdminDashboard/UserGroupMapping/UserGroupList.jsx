// import React, { useEffect, useMemo, useState } from "react";
// import {
//   LuSearch,
//   LuRefreshCw,
//   LuUsers,
//   LuCircleCheck,
//   LuCircleX,
//   LuLayers3,
//   LuChevronLeft,
//   LuChevronRight,
//   LuPencil,
//   LuTrash2,
//   LuEye,
// } from "react-icons/lu";
// import axiosInstance from "../../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const UserGroupList = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

 

//   const [groups, setGroups] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const [page, setPage] = useState(1);
//   const groupsPerPage = 10;

//   // =====================================================
//   // FETCH USER GROUPS
//   // =====================================================

//   const fetchGroups = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get(
//         "/api/user-group/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("User Group Response:", res.data);

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data ||
//           res.data?.content ||
//           [];

//       setGroups(data);
//     } catch (error) {
//       console.error(
//         "User Group Load Error:",
//         error
//       );

//       setGroups([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // INITIAL LOAD
//   // =====================================================

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   // =====================================================
//   // STATUS CHECK
//   // =====================================================

//   const isActive = (status) => {
//     if (!status) return false;

//     const value = String(status).toUpperCase();

//     return (
//       value === "ACTIVE" ||
//       value === "TRUE" ||
//       value === "ENABLED"
//     );
//   };

//   // =====================================================
//   // SUMMARY COUNTS
//   // =====================================================

//   const totalGroups = groups.length;

//   const activeGroups = useMemo(() => {
//     return groups.filter((group) =>
//       isActive(group?.status)
//     ).length;
//   }, [groups]);

//   const inactiveGroups = useMemo(() => {
//     return groups.filter(
//       (group) => !isActive(group?.status)
//     ).length;
//   }, [groups]);

//   const uniqueCodes = useMemo(() => {
//     return new Set(
//       groups
//         .map((group) => group?.groupCode)
//         .filter(Boolean)
//     ).size;
//   }, [groups]);

//   // =====================================================
//   // FILTER
//   // =====================================================

//   const filteredGroups = useMemo(() => {
//     const value = search
//       .toLowerCase()
//       .trim();

//     return groups.filter((group) => {
//       const groupName =
//         group?.groupName || "";

//       const groupCode =
//         group?.groupCode || "";

//       const status =
//         group?.status || "";

//       const matchesSearch =
//         !value ||
//         groupName
//           .toLowerCase()
//           .includes(value) ||
//         groupCode
//           .toLowerCase()
//           .includes(value) ||
//         status
//           .toLowerCase()
//           .includes(value);

//       const matchesStatus =
//         !statusFilter ||
//         String(status).toUpperCase() ===
//           String(statusFilter).toUpperCase();

//       return (
//         matchesSearch &&
//         matchesStatus
//       );
//     });
//   }, [
//     groups,
//     search,
//     statusFilter,
//   ]);

//   // =====================================================
//   // PAGINATION
//   // =====================================================

//   const totalPages = Math.ceil(
//     filteredGroups.length /
//       groupsPerPage
//   );

//   const currentPageGroups =
//     filteredGroups.slice(
//       (page - 1) * groupsPerPage,
//       page * groupsPerPage
//     );

//   useEffect(() => {
//     if (
//       totalPages > 0 &&
//       page > totalPages
//     ) {
//       setPage(totalPages);
//     }

//     if (
//       totalPages === 0 &&
//       page !== 1
//     ) {
//       setPage(1);
//     }
//   }, [totalPages, page]);

//   const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this user group?")) {
//     return;
//   }

//   try {
//     await axiosInstance.delete(
//       `/api/user-group/delete/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     alert("User Group deleted successfully");

//     fetchGroups();

//   } catch (error) {
//     console.error("Delete Error:", error);

//     alert(
//       error?.response?.data?.message ||
//       "Unable to delete user group"
//     );
//   }
// };

//   // =====================================================
//   // RESET FILTER
//   // =====================================================

//   const resetFilters = () => {
//     setSearch("");
//     setStatusFilter("");
//     setPage(1);
//   };

 

//   const StatusBadge = ({ status }) => {
//     const active = isActive(status);

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



//   const SummaryCard = ({
//     title,
//     value,
//     icon,
//     background,
//     color,
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
//                 background,
//                 color,
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
//             User Group List
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
//                 User Management
//               </li>

//               <li className="breadcrumb-item active text-primary">
//                 User Group List
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
//             title="Total User Groups"
//             value={totalGroups}
//             icon={<LuUsers size={23} />}
//             background="#f1edff"
//             color="#6f2cff"
//           />

//           <SummaryCard
//             title="Active Groups"
//             value={activeGroups}
//             icon={
//               <LuCircleCheck size={23} />
//             }
//             background="#dcfce7"
//             color="#16a34a"
//           />

//           <SummaryCard
//             title="Inactive Groups"
//             value={inactiveGroups}
//             icon={
//               <LuCircleX size={23} />
//             }
//             background="#fee2e2"
//             color="#dc2626"
//           />

//           <SummaryCard
//             title="Unique Group Codes"
//             value={uniqueCodes}
//             icon={
//               <LuLayers3 size={23} />
//             }
//             background="#eaf4ff"
//             color="#2563eb"
//           />
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* SEARCH / FILTER */}
//       {/* ================================================= */}

//       <div className="container-fluid px-2">
//         <div className="card shadow border-0 rounded-3">
//           <div className="card-header bg-white">
//             <h6 className="fw-bold mb-0">
//               Search User Groups
//             </h6>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">
//               {/* SEARCH */}

//               <div className="col-lg-5 col-md-6">
//                 <label className="form-label">
//                   <h6>Search</h6>
//                 </label>

//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search group name or code..."
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(
//                         e.target.value
//                       );
//                       setPage(1);
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

//               {/* STATUS */}

//               <div className="col-lg-3 col-md-6">
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
//                     setPage(1);
//                   }}
//                 >
//                   <option value="">
//                     All Status
//                   </option>

//                   <option value="ACTIVE">
//                     Active
//                   </option>

//                   <option value="INACTIVE">
//                     Inactive
//                   </option>
//                 </select>
//               </div>

//               {/* RESET */}

//               <div className="col-lg-2 col-md-6 d-flex align-items-end">
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary w-100"
//                   onClick={resetFilters}
//                 >
//                   Reset
//                 </button>
//               </div>

//               {/* REFRESH */}

//               <div className="col-lg-2 col-md-6 d-flex align-items-end">
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100"
//                   onClick={fetchGroups}
//                   disabled={loading}
//                 >
//                   <LuRefreshCw
//                     size={16}
//                     className="me-1"
//                   />

//                   {loading
//                     ? "Loading..."
//                     : "Refresh"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* LIST */}
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
//                   <LuUsers
//                     size={18}
//                     style={{
//                       color: "#6f2cff",
//                     }}
//                   />
//                 </span>

//                 <div>
//                   <h6 className="mb-0 fw-bold">
//                     User Groups
//                   </h6>

//                   <small className="text-muted">
//                     Manage system user groups
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* TABLE */}

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "800px",
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
//                         width: "7%",
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
//                         width: "30%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Group Name
//                     </th>

//                     <th
//                       style={{
//                         width: "22%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Group Code
//                     </th>

//                     <th
//                       style={{
//                         width: "20%",
//                         fontSize: "12px",
//                         color: "#555",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "21%",
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
//                         colSpan="5"
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
//                           Loading user groups...
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* EMPTY */}

//                   {!loading &&
//                     currentPageGroups.length ===
//                       0 && (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="text-center py-5"
//                         >
//                           <LuUsers
//                             size={38}
//                             className="text-muted mb-2"
//                           />

//                           <div className="fw-semibold">
//                             No user groups found
//                           </div>

//                           <small className="text-muted">
//                             Try changing your search
//                             or filter.
//                           </small>
//                         </td>
//                       </tr>
//                     )}

//                   {/* DATA */}

//                   {!loading &&
//                     currentPageGroups.map(
//                       (group, index) => (
//                         <tr
//                           key={
//                             group?.id ||
//                             index
//                           }
//                           style={{
//                             borderBottom:
//                               "1px solid #f3f3f3",
//                           }}
//                         >
//                           {/* NUMBER */}

//                           <td className="text-center">
//                             <span
//                               style={{
//                                 fontSize:
//                                   "11px",
//                                 fontWeight:
//                                   "600",
//                                 color:
//                                   "#666",
//                               }}
//                             >
//                               {(page - 1) *
//                                 groupsPerPage +
//                                 index +
//                                 1}
//                             </span>
//                           </td>

//                           {/* GROUP NAME */}

//                           <td>
//                             <div className="d-flex align-items-center">
//                               <span
//                                 className="d-inline-flex align-items-center justify-content-center rounded-2 me-2"
//                                 style={{
//                                   width: "36px",
//                                   height: "36px",
//                                   background:
//                                     "#f1edff",
//                                   color:
//                                     "#6f2cff",
//                                 }}
//                               >
//                                 <LuUsers
//                                   size={17}
//                                 />
//                               </span>

//                               <div>
//                                 <div
//                                   className="fw-semibold"
//                                   style={{
//                                     fontSize:
//                                       "12px",
//                                   }}
//                                 >
//                                   {group?.groupName ||
//                                     "-"}
//                                 </div>

//                                 <small
//                                   className="text-muted"
//                                   style={{
//                                     fontSize:
//                                       "9px",
//                                   }}
//                                 >
//                                   Group ID:{" "}
//                                   {group?.id ??
//                                     "-"}
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           {/* CODE */}

//                           <td>
//                             <span
//                               className="px-2 py-1 rounded-2"
//                               style={{
//                                 background:
//                                   "#eef5ff",
//                                 color:
//                                   "#2563eb",
//                                 fontSize:
//                                   "10px",
//                                 fontWeight:
//                                   "600",
//                               }}
//                             >
//                               {group?.groupCode ||
//                                 "-"}
//                             </span>
//                           </td>

//                           {/* STATUS */}

//                           <td>
//                             <StatusBadge
//                               status={
//                                 group?.status
//                               }
//                             />
//                           </td>

//                           {/* ACTION */}

//                           <td>
//                             <div className="d-flex justify-content-center gap-2">
//                               {/* VIEW */}

//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light"
//                                 title="View"
//                                 onClick={() =>
//                                   console.log(
//                                     "View Group:",
//                                     group
//                                   )
//                                 }
//                               >
//                                 <LuEye
//                                   size={15}
//                                   style={{
//                                     color:
//                                       "#2563eb",
//                                   }}
//                                 />
//                               </button>

//                               {/* EDIT */}

//                              <button
//   type="button"
//   className="btn btn-sm btn-outline-primary"
//   onClick={() =>
//     navigate("/admin/user-group/create", {
//       state: {
//         groupId: group.id,
//       },
//     })
//   }
// >
//                                 <LuPencil
//                                   size={15}
//                                   style={{
//                                     color:
//                                       "#6f2cff",
//                                   }}
//                                 />
//                               </button>

//                               {/* DELETE */}

//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light"
//                                 title="Delete"
//                                 onClick={() =>
//                                   handleDelete(group.id)
//                                 }
//                               >
//                                 <LuTrash2
//                                   size={15}
//                                   style={{
//                                     color:
//                                       "#dc2626",
//                                   }}
//                                 />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       )
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* ================================================= */}
//           {/* FOOTER */}
//           {/* ================================================= */}

//           {!loading && (
//             <div className="card-footer bg-white border-0">
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//                 <small className="text-muted">
//                   Showing{" "}
//                   <strong>
//                     {currentPageGroups.length}
//                   </strong>{" "}
//                   of{" "}
//                   <strong>
//                     {filteredGroups.length}
//                   </strong>{" "}
//                   groups
//                 </small>

//                 <div className="d-flex align-items-center gap-2">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-light"
//                     disabled={page === 1}
//                     onClick={() =>
//                       setPage((prev) =>
//                         Math.max(
//                           1,
//                           prev - 1
//                         )
//                       )
//                     }
//                   >
//                     <LuChevronLeft
//                       size={16}
//                     />
//                   </button>

//                   <span
//                     style={{
//                       fontSize: "11px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Page{" "}
//                     {totalPages === 0
//                       ? 0
//                       : page}{" "}
//                     of {totalPages}
//                   </span>

//                   <button
//                     type="button"
//                     className="btn btn-sm btn-light"
//                     disabled={
//                       page >= totalPages ||
//                       totalPages === 0
//                     }
//                     onClick={() =>
//                       setPage((prev) =>
//                         Math.min(
//                           totalPages,
//                           prev + 1
//                         )
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

// export default UserGroupList;


import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuRefreshCw,
  LuUsers,
  LuCircleCheck,
  LuCircleX,
  LuLayers3,
  LuChevronLeft,
  LuChevronRight,
  LuPencil,
  LuTrash2,
  LuEye,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserGroupList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);
  const groupsPerPage = 10;

  // =====================================================
  // FETCH USER GROUPS
  // =====================================================

  const fetchGroups = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/user-group/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Group Response:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.content ||
          [];

      setGroups(data);
    } catch (error) {
      console.error(
        "User Group Load Error:",
        error
      );

      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchGroups();
  }, []);

  // =====================================================
  // STATUS CHECK
  // =====================================================

  const isActive = (status) => {
    if (!status) return false;

    const value = String(status).toUpperCase();

    return (
      value === "ACTIVE" ||
      value === "TRUE" ||
      value === "ENABLED"
    );
  };

  // =====================================================
  // SUMMARY COUNTS
  // =====================================================

  const totalGroups = groups.length;

  const activeGroups = useMemo(() => {
    return groups.filter((group) =>
      isActive(group?.status)
    ).length;
  }, [groups]);

  const inactiveGroups = useMemo(() => {
    return groups.filter(
      (group) => !isActive(group?.status)
    ).length;
  }, [groups]);

  const uniqueCodes = useMemo(() => {
    return new Set(
      groups
        .map((group) => group?.groupCode)
        .filter(Boolean)
    ).size;
  }, [groups]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredGroups = useMemo(() => {
    const value = search.toLowerCase().trim();

    return groups.filter((group) => {
      const groupName =
        group?.groupName || "";

      const groupCode =
        group?.groupCode || "";

      const status =
        group?.status || "";

      const matchesSearch =
        !value ||
        groupName
          .toLowerCase()
          .includes(value) ||
        groupCode
          .toLowerCase()
          .includes(value) ||
        status
          .toLowerCase()
          .includes(value);

      const matchesStatus =
        !statusFilter ||
        String(status).toUpperCase() ===
          String(statusFilter).toUpperCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    groups,
    search,
    statusFilter,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredGroups.length /
      groupsPerPage
  );

  const currentPageGroups =
    filteredGroups.slice(
      (page - 1) * groupsPerPage,
      page * groupsPerPage
    );

  useEffect(() => {
    if (
      totalPages > 0 &&
      page > totalPages
    ) {
      setPage(totalPages);
    }

    if (
      totalPages === 0 &&
      page !== 1
    ) {
      setPage(1);
    }
  }, [totalPages, page]);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user group?"
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(
        `/api/user-group/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "User Group deleted successfully"
      );

      fetchGroups();
    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to delete user group"
      );
    }
  };

  // =====================================================
  // RESET FILTER
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const StatusBadge = ({ status }) => {
    const active = isActive(status);

    return active ? (
      <span className="ugl-status ugl-status-active">
        <LuCircleCheck size={13} />
        Active
      </span>
    ) : (
      <span className="ugl-status ugl-status-inactive">
        <LuCircleX size={13} />
        Inactive
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
    background,
    color,
  }) => {
    return (
      <div className="col-xl-3 col-md-6">
        <div className="card shadow border-0 rounded-4 h-100 ugl-summary-card">
          <div className="card-body d-flex align-items-center p-3">
            <div
              className="ugl-summary-icon me-3"
              style={{
                background,
                color,
              }}
            >
              {icon}
            </div>

            <div>
              <div className="ugl-summary-title">
                {title}
              </div>

              <h4 className="fw-bold mb-0 ugl-summary-value">
                {value}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>
        {`
          /* =================================================
             PAGE HEADER
          ================================================= */

          .ugl-page-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          .ugl-title-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
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
              0 8px 20px rgba(37, 99, 235, 0.22);
          }

          .ugl-breadcrumb-strip {
            background: rgba(239, 246, 255, 0.75);
            border-top: 1px solid #e0ecff;
          }

          /* =================================================
             SUMMARY CARDS
          ================================================= */

          .ugl-summary-card {
            min-height: 105px;
            border: 1px solid #e2e8f0 !important;
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .ugl-summary-card:hover {
            transform: translateY(-2px);
            box-shadow:
              0 8px 24px rgba(15, 23, 42, 0.08) !important;
          }

          .ugl-summary-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 13px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .ugl-summary-title {
            font-size: 11px;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 3px;
          }

          .ugl-summary-value {
            font-size: 23px;
            color: #0f172a;
          }

          /* =================================================
             FILTER CARD
          ================================================= */

          .ugl-filter-card,
          .ugl-list-card {
            border: 1px solid #e2e8f0 !important;
          }

          .ugl-card-header {
            border-bottom: 1px solid #edf2f7 !important;
          }

          .ugl-section-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #2563eb;
            background:
              linear-gradient(
                135deg,
                #eff6ff,
                #eaf3ff
              );
            border: 1px solid #bfdbfe;
          }

          /* =================================================
             FORM CONTROLS
          ================================================= */

          .ugl-form-control,
          .ugl-form-select {
            min-height: 43px;
            border-radius: 11px !important;
            border: 1px solid #dbe3ef;
            transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .ugl-form-control:focus,
          .ugl-form-select:focus {
            border-color: #60a5fa;
            box-shadow:
              0 0 0 0.2rem rgba(37, 99, 235, 0.10);
          }

          .ugl-form-label {
            font-size: 13px;
            font-weight: 600;
            color: #334155;
            margin-bottom: 7px;
          }

          .ugl-search-icon {
            right: 13px;
            top: 12px;
            color: #94a3b8;
            pointer-events: none;
          }

          /* =================================================
             BUTTONS
          ================================================= */

          .ugl-btn {
            min-height: 41px;
            border-radius: 10px !important;
            font-weight: 500;
          }

          .ugl-reset-btn {
            border-color: #dbe3ef;
            color: #475569;
            background: #ffffff;
          }

          .ugl-reset-btn:hover {
            background: #f8fafc;
          }

          .ugl-refresh-btn {
            box-shadow:
              0 5px 12px rgba(37, 99, 235, 0.16);
          }

          /* =================================================
             TABLE
          ================================================= */

          .ugl-table {
            min-width: 800px;
          }

          .ugl-table thead tr {
            background: #eff6ff;
            border-top: 1px solid #dbeafe;
            border-bottom: 1px solid #dbeafe;
          }

          .ugl-table thead th {
            padding: 13px 10px;
            font-size: 12px;
            font-weight: 600;
            color: #1e3a8a;
            white-space: nowrap;
          }

          .ugl-table tbody tr {
            border-bottom: 1px solid #edf2f7;
            transition: background 0.15s ease;
          }

          .ugl-table tbody tr:hover {
            background: #f8fbff;
          }

          .ugl-table td {
            padding: 12px 10px;
          }

          .ugl-number {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 11px;
            font-weight: 600;
          }

          /* =================================================
             GROUP ICON
          ================================================= */

          .ugl-group-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
            border-radius: 11px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #dbeafe;
          }

          .ugl-group-name {
            font-size: 12px;
            font-weight: 600;
            color: #1e293b;
          }

          .ugl-group-id {
            font-size: 9px;
            color: #94a3b8;
          }

          /* =================================================
             CODE BADGE
          ================================================= */

          .ugl-code-badge {
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
             STATUS
          ================================================= */

          .ugl-status {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
          }

          .ugl-status-active {
            background: #ecfdf5;
            color: #15803d;
            border: 1px solid #bbf7d0;
          }

          .ugl-status-inactive {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          /* =================================================
             ACTION BUTTONS
          ================================================= */

          .ugl-action-btn {
            width: 34px;
            height: 34px;
            border-radius: 10px !important;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            transition:
              transform 0.15s ease,
              background 0.15s ease;
          }

          .ugl-action-btn:hover {
            transform: translateY(-1px);
          }

          .ugl-view-btn {
            color: #2563eb;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
          }

          .ugl-view-btn:hover {
            background: #dbeafe;
            color: #1d4ed8;
          }

          .ugl-edit-btn {
            color: #4f46e5;
            background: #eef2ff;
            border: 1px solid #c7d2fe;
          }

          .ugl-edit-btn:hover {
            background: #e0e7ff;
            color: #4338ca;
          }

          .ugl-delete-btn {
            color: #dc2626;
            background: #fef2f2;
            border: 1px solid #fecaca;
          }

          .ugl-delete-btn:hover {
            background: #fee2e2;
            color: #b91c1c;
          }

          /* =================================================
             PAGINATION
          ================================================= */

          .ugl-pagination-btn {
            width: 35px;
            height: 35px;
            border-radius: 10px !important;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            border: 1px solid #dbeafe;
            background: #ffffff;
            color: #475569;
          }

          .ugl-pagination-btn:hover:not(:disabled) {
            background: #eff6ff;
            color: #2563eb;
          }

          .ugl-pagination-btn:disabled {
            opacity: 0.45;
          }

          .ugl-page-info {
            min-width: 85px;
            text-align: center;
            font-size: 11px;
            font-weight: 600;
            color: #475569;
          }

          /* =================================================
             EMPTY STATE
          ================================================= */

          .ugl-empty-icon {
            width: 54px;
            height: 54px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #dbeafe;
          }

          /* =================================================
             RESPONSIVE
          ================================================= */

          @media (max-width: 768px) {
            .ugl-page-title-row {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .ugl-header-back {
              width: 100%;
            }

            .ugl-header-back button {
              width: 100%;
            }

            .ugl-filter-actions {
              margin-top: 0;
            }

            .ugl-filter-actions button {
              width: 100%;
            }

            .ugl-footer {
              flex-direction: column;
              align-items: flex-start !important;
            }
          }

          @media (max-width: 576px) {
            .ugl-title-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
            }

            .ugl-summary-icon {
              width: 44px;
              height: 44px;
              min-width: 44px;
            }

            .ugl-table {
              min-width: 820px;
            }
          }
        `}
      </style>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="mx-0 mt-2 mb-3">
          <div className="rounded-4 shadow overflow-hidden ugl-page-header">
            <div className="p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center gap-3 ugl-page-title-row">
                {/* TITLE */}

                <div className="d-flex align-items-center gap-3">
                  <div className="ugl-title-icon">
                    <LuUsers size={27} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      User Group List
                    </h5>

                    <div className="text-muted small">
                      Manage and monitor system user groups.
                    </div>
                  </div>
                </div>

                {/* BACK */}

                <div className="ugl-header-back">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-3 px-3"
                    onClick={() =>
                      navigate("/user-management")
                    }
                  >
                    <LuArrowLeftIcon
                      size={17}
                      className="me-1"
                    />
                    Back
                  </button>
                </div>
              </div>
            </div>

            {/* BREADCRUMB */}

            <div className="px-3 px-md-4 py-2 ugl-breadcrumb-strip">
              <small className="text-muted">
                Dashboard
                <span className="mx-2">›</span>

                User Management
                <span className="mx-2">›</span>

                <span className="text-primary fw-semibold">
                  User Group List
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="row g-3 mb-3">
          <SummaryCard
            title="Total User Groups"
            value={totalGroups}
            icon={<LuUsers size={23} />}
            background="#eff6ff"
            color="#2563eb"
          />

          <SummaryCard
            title="Active Groups"
            value={activeGroups}
            icon={
              <LuCircleCheck size={23} />
            }
            background="#ecfdf5"
            color="#16a34a"
          />

          <SummaryCard
            title="Inactive Groups"
            value={inactiveGroups}
            icon={
              <LuCircleX size={23} />
            }
            background="#fef2f2"
            color="#dc2626"
          />

          <SummaryCard
            title="Unique Group Codes"
            value={uniqueCodes}
            icon={
              <LuLayers3 size={23} />
            }
            background="#eef6ff"
            color="#2563eb"
          />
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-4 ugl-filter-card">
          <div className="card-header bg-white border-0 p-3 p-md-4 ugl-card-header">
            <div className="d-flex align-items-center gap-3">
              <div className="ugl-section-icon">
                <LuSearch size={20} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Search User Groups
                </h6>

                <small className="text-muted">
                  Search and filter user groups by name,
                  code or status.
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-3 p-md-4">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-lg-5 col-md-6">
                <label className="ugl-form-label">
                  Search
                </label>

                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ugl-form-control"
                    placeholder="Search group name or code..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    style={{
                      paddingRight: "42px",
                    }}
                  />

                  <LuSearch
                    size={17}
                    className="position-absolute ugl-search-icon"
                  />
                </div>
              </div>

              {/* STATUS */}

              <div className="col-lg-3 col-md-6">
                <label className="ugl-form-label">
                  Status
                </label>

                <select
                  className="form-select ugl-form-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );
                    setPage(1);
                  }}
                >
                  <option value="">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>
              </div>

              {/* RESET */}

              <div className="col-lg-2 col-md-6 d-flex align-items-end ugl-filter-actions">
                <button
                  type="button"
                  className="btn ugl-btn ugl-reset-btn w-100"
                  onClick={resetFilters}
                >
                  <LuRefreshCw
                    size={15}
                    className="me-1"
                  />
                  Reset
                </button>
              </div>

              {/* REFRESH */}

              <div className="col-lg-2 col-md-6 d-flex align-items-end ugl-filter-actions">
                <button
                  type="button"
                  className="btn btn-primary ugl-btn ugl-refresh-btn w-100"
                  onClick={fetchGroups}
                  disabled={loading}
                >
                  <LuRefreshCw
                    size={16}
                    className={`me-1 ${
                      loading
                        ? "spin-animation"
                        : ""
                    }`}
                  />

                  {loading
                    ? "Loading..."
                    : "Refresh"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          USER GROUP LIST
      ===================================================== */}

      <div className="container-fluid px-2">
        <div className="card shadow border-0 rounded-4 mt-3 ugl-list-card overflow-hidden">
          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3 p-md-4 ugl-card-header">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="ugl-section-icon">
                  <LuUsers size={20} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    User Groups
                  </h6>

                  <small className="text-muted">
                    Manage system user groups
                  </small>
                </div>
              </div>

              {/* RESULT COUNT */}

              {!loading && (
                <span className="ugl-code-badge">
                  {filteredGroups.length} Groups
                </span>
              )}
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 ugl-table">
                <thead>
                  <tr>
                    <th
                      className="text-center"
                      style={{ width: "7%" }}
                    >
                      #
                    </th>

                    <th style={{ width: "30%" }}>
                      Group Name
                    </th>

                    <th style={{ width: "22%" }}>
                      Group Code
                    </th>

                    <th style={{ width: "20%" }}>
                      Status
                    </th>

                    <th
                      className="text-center"
                      style={{ width: "21%" }}
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
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "28px",
                            height: "28px",
                          }}
                        />

                        <div className="text-muted small mt-2">
                          Loading user groups...
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* EMPTY */}

                  {!loading &&
                    currentPageGroups.length ===
                      0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-5"
                        >
                          <div className="ugl-empty-icon mb-3">
                            <LuUsers size={25} />
                          </div>

                          <div className="fw-semibold text-dark">
                            No user groups found
                          </div>

                          <small className="text-muted">
                            Try changing your search
                            or filter.
                          </small>
                        </td>
                      </tr>
                    )}

                  {/* DATA */}

                  {!loading &&
                    currentPageGroups.map(
                      (group, index) => (
                        <tr
                          key={
                            group?.id ||
                            index
                          }
                        >
                          {/* NUMBER */}

                          <td className="text-center">
                            <span className="ugl-number">
                              {(page - 1) *
                                groupsPerPage +
                                index +
                                1}
                            </span>
                          </td>

                          {/* GROUP NAME */}

                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ugl-group-icon me-3">
                                <LuUsers
                                  size={17}
                                />
                              </div>

                              <div>
                                <div className="ugl-group-name">
                                  {group?.groupName ||
                                    "-"}
                                </div>

                                <div className="ugl-group-id mt-1">
                                  Group ID:{" "}
                                  {group?.id ??
                                    "-"}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* CODE */}

                          <td>
                            <span className="ugl-code-badge">
                              {group?.groupCode ||
                                "-"}
                            </span>
                          </td>

                          {/* STATUS */}

                          <td>
                            <StatusBadge
                              status={
                                group?.status
                              }
                            />
                          </td>

                          {/* ACTION */}

                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              {/* VIEW */}

                              <button
                                type="button"
                                className="btn ugl-action-btn ugl-view-btn"
                                title="View"
                                onClick={() =>
                                  console.log(
                                    "View Group:",
                                    group
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
                                className="btn ugl-action-btn ugl-edit-btn"
                                title="Edit"
                                onClick={() =>
                                  navigate(
                                    "/admin/user-group/create",
                                    {
                                      state: {
                                        groupId:
                                          group.id,
                                      },
                                    }
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
                                className="btn ugl-action-btn ugl-delete-btn"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    group.id
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
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              FOOTER / PAGINATION
          ================================================= */}

          {!loading && (
            <div className="card-footer bg-white border-0 p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center gap-3 ugl-footer">
                {/* SHOWING */}

                <small className="text-muted">
                  Showing{" "}
                  <strong className="text-dark">
                    {currentPageGroups.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-dark">
                    {filteredGroups.length}
                  </strong>{" "}
                  groups
                </small>

                {/* PAGINATION */}

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn ugl-pagination-btn"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(
                          1,
                          prev - 1
                        )
                      )
                    }
                  >
                    <LuChevronLeft
                      size={17}
                    />
                  </button>

                  <span className="ugl-page-info">
                    Page{" "}
                    {totalPages === 0
                      ? 0
                      : page}{" "}
                    of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn ugl-pagination-btn"
                    disabled={
                      page >= totalPages ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(
                          totalPages,
                          prev + 1
                        )
                      )
                    }
                  >
                    <LuChevronRight
                      size={17}
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

/* =========================================================
   BACK ICON
========================================================= */

const LuArrowLeftIcon = ({
  size = 17,
  className = "",
}) => {
  return (
    <LuChevronLeft
      size={size}
      className={className}
    />
  );
};

export default UserGroupList;