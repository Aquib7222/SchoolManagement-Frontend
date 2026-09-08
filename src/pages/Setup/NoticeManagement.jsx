// import React, {
//   useMemo,
//   useState,
// } from "react";

// import {
//   LuBell,
//   LuPlus,
//   LuSearch,
//   LuPencil,
//   LuTrash2,
//   LuEye,
//   LuMegaphone,
//   LuCalendarDays,
//   LuUsers,
//   LuPin,
//   LuX,
//   LuCircleCheck,
// } from "react-icons/lu";

// import {
//   MdManageSearch,
//   MdOutlineSchool,
// } from "react-icons/md";

// const NoticeManagement = () => {

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [showModal, setShowModal] =
//     useState(false);

//   const [editingNotice, setEditingNotice] =
//     useState(null);

//   const [search, setSearch] =
//     useState("");

//   const [filterAudience, setFilterAudience] =
//     useState("ALL");

//   const [filterStatus, setFilterStatus] =
//     useState("ALL");

//   const [notices, setNotices] = useState([
//     {
//       id: 1,
//       title: "Fee Payment Reminder",
//       category: "FEE_REMINDER",
//       audience: "STUDENT",
//       priority: "HIGH",
//       description:
//         "All students are requested to clear their pending school fees before the due date.",
//       startDate: "2026-09-05",
//       endDate: "2026-09-15",
//       status: "PUBLISHED",
//       pinned: true,
//     },

//     {
//       id: 2,
//       title: "PTM - Parent Teacher Meeting",
//       category: "PTM",
//       audience: "EVERYONE",
//       priority: "HIGH",
//       description:
//         "Parent Teacher Meeting will be conducted on Saturday. Parents are requested to attend the meeting.",
//       startDate: "2026-09-08",
//       endDate: "2026-09-12",
//       status: "PUBLISHED",
//       pinned: true,
//     },

//     {
//       id: 3,
//       title: "School Holiday",
//       category: "HOLIDAY",
//       audience: "EVERYONE",
//       priority: "NORMAL",
//       description:
//         "The school will remain closed on the occasion of the upcoming holiday.",
//       startDate: "2026-09-10",
//       endDate: "2026-09-10",
//       status: "PUBLISHED",
//       pinned: false,
//     },

//     {
//       id: 4,
//       title: "Teachers Staff Meeting",
//       category: "MEETING",
//       audience: "TEACHER",
//       priority: "NORMAL",
//       description:
//         "All teachers are requested to attend the staff meeting after school hours.",
//       startDate: "2026-09-06",
//       endDate: "2026-09-06",
//       status: "DRAFT",
//       pinned: false,
//     },
//   ]);

//   const emptyForm = {
//     title: "",
//     category: "GENERAL",
//     audience: "EVERYONE",
//     priority: "NORMAL",
//     description: "",
//     startDate: "",
//     endDate: "",
//     status: "DRAFT",
//     pinned: false,
//   };

//   const [form, setForm] =
//     useState(emptyForm);

//   // =========================================================
//   // CATEGORIES
//   // =========================================================

//   const categories = [
//     {
//       value: "GENERAL",
//       label: "General Notice",
//       icon: "📢",
//     },
//     {
//       value: "FEE_REMINDER",
//       label: "Fee Reminder",
//       icon: "💰",
//     },
//     {
//       value: "PTM",
//       label: "PTM",
//       icon: "👨‍👩‍👧",
//     },
//     {
//       value: "HOLIDAY",
//       label: "School Holiday",
//       icon: "🏖️",
//     },
//     {
//       value: "EXAM",
//       label: "Exam / Test",
//       icon: "📝",
//     },
//     {
//       value: "EVENT",
//       label: "School Event",
//       icon: "🎉",
//     },
//     {
//       value: "MEETING",
//       label: "Meeting",
//       icon: "👥",
//     },
//     {
//       value: "ATTENDANCE",
//       label: "Attendance",
//       icon: "📋",
//     },
//   ];

//   // =========================================================
//   // FILTER
//   // =========================================================

//   const filteredNotices = useMemo(() => {

//     return notices.filter((notice) => {

//       const keyword =
//         search.trim().toLowerCase();

//       const searchMatch =
//         !keyword ||
//         notice.title
//           .toLowerCase()
//           .includes(keyword) ||
//         notice.description
//           .toLowerCase()
//           .includes(keyword);

//       const audienceMatch =
//         filterAudience === "ALL" ||
//         notice.audience ===
//           filterAudience;

//       const statusMatch =
//         filterStatus === "ALL" ||
//         notice.status ===
//           filterStatus;

//       return (
//         searchMatch &&
//         audienceMatch &&
//         statusMatch
//       );
//     });

//   }, [
//     notices,
//     search,
//     filterAudience,
//     filterStatus,
//   ]);

//   // =========================================================
//   // FORM CHANGE
//   // =========================================================

//   const handleChange = (e) => {

//     const {
//       name,
//       value,
//       type,
//       checked,
//     } = e.target;

//     setForm((prev) => ({
//       ...prev,

//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };

//   // =========================================================
//   // ADD
//   // =========================================================

//   const handleAdd = () => {

//     setEditingNotice(null);

//     setForm({
//       ...emptyForm,
//     });

//     setShowModal(true);
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================

//   const handleEdit = (notice) => {

//     setEditingNotice(notice);

//     setForm({
//       title: notice.title,
//       category: notice.category,
//       audience: notice.audience,
//       priority: notice.priority,
//       description: notice.description,
//       startDate: notice.startDate,
//       endDate: notice.endDate,
//       status: notice.status,
//       pinned: notice.pinned,
//     });

//     setShowModal(true);
//   };

//   // =========================================================
//   // SAVE
//   // =========================================================

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     if (!form.title.trim()) {

//       alert(
//         "Please enter notice title."
//       );

//       return;
//     }

//     if (!form.description.trim()) {

//       alert(
//         "Please enter notice description."
//       );

//       return;
//     }

//     if (
//       form.startDate &&
//       form.endDate &&
//       form.endDate <
//         form.startDate
//     ) {

//       alert(
//         "End date cannot be before start date."
//       );

//       return;
//     }

//     if (editingNotice) {

//       setNotices((prev) =>
//         prev.map((notice) =>
//           notice.id ===
//           editingNotice.id
//             ? {
//                 ...notice,
//                 ...form,
//               }
//             : notice
//         )
//       );

//     } else {

//       const newNotice = {
//         id: Date.now(),
//         ...form,
//       };

//       setNotices((prev) => [
//         newNotice,
//         ...prev,
//       ]);
//     }

//     closeModal();
//   };

//   // =========================================================
//   // CLOSE MODAL
//   // =========================================================

//   const closeModal = () => {

//     setShowModal(false);

//     setEditingNotice(null);

//     setForm({
//       ...emptyForm,
//     });
//   };

//   // =========================================================
//   // DELETE
//   // =========================================================

//   const handleDelete = (id) => {

//     if (
//       !window.confirm(
//         "Are you sure you want to delete this notice?"
//       )
//     ) {
//       return;
//     }

//     setNotices((prev) =>
//       prev.filter(
//         (notice) =>
//           notice.id !== id
//       )
//     );
//   };

//   // =========================================================
//   // PIN
//   // =========================================================

//   const togglePin = (id) => {

//     setNotices((prev) =>
//       prev.map((notice) =>
//         notice.id === id
//           ? {
//               ...notice,
//               pinned:
//                 !notice.pinned,
//             }
//           : notice
//       )
//     );
//   };

//   // =========================================================
//   // CATEGORY
//   // =========================================================

//   const getCategory = (value) => {

//     return (
//       categories.find(
//         (item) =>
//           item.value === value
//       ) ||
//       categories[0]
//     );
//   };

//   // =========================================================
//   // AUDIENCE
//   // =========================================================

//   const getAudienceLabel = (
//     audience
//   ) => {

//     if (
//       audience === "STUDENT"
//     ) {
//       return "Students";
//     }

//     if (
//       audience === "TEACHER"
//     ) {
//       return "Teachers";
//     }

//     return "Everyone";
//   };

//   // =========================================================
//   // DATE
//   // =========================================================

//   const formatDate = (date) => {

//     if (!date) {
//       return "-";
//     }

//     return new Date(
//       `${date}T00:00:00`
//     ).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   // =========================================================
//   // STATS
//   // =========================================================

//   const totalNotices =
//     notices.length;

//   const publishedNotices =
//     notices.filter(
//       (notice) =>
//         notice.status ===
//         "PUBLISHED"
//     ).length;

//   const draftNotices =
//     notices.filter(
//       (notice) =>
//         notice.status ===
//         "DRAFT"
//     ).length;

//   const pinnedNotices =
//     notices.filter(
//       (notice) =>
//         notice.pinned
//     ).length;

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <>
//       <style>{`

//         .notice-page {
//           background: #f8fbff;
//           min-height: 100vh;
//         }

//         .section-card {
//           background: #ffffff;
//           border: 0;
//           border-radius: 16px;

//           box-shadow:
//             0 6px 22px
//             rgba(15, 23, 42, .07);
//         }

//         .section-icon {
//           width: 42px;
//           height: 42px;

//           border-radius: 12px;

//           display: flex;
//           align-items: center;
//           justify-content: center;

//           background: #eff6ff;
//           color: #2563eb;
//         }

//         .custom-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: #334155;
//           margin-bottom: 7px;
//         }

//         .custom-control {
//           min-height: 42px;

//           border-radius: 12px !important;

//           border: 1px solid #dbeafe !important;

//           font-size: 14px;

//           box-shadow: none !important;
//         }

//         .custom-control:focus {
//           border-color: #60a5fa !important;

//           box-shadow:
//             0 0 0 3px
//             rgba(37, 99, 235, .10)
//             !important;
//         }

//         .primary-button {
//           min-height: 42px;

//           border: 0;
//           border-radius: 12px;

//           padding: 0 18px;

//           background:
//             linear-gradient(
//               135deg,
//               #2563eb,
//               #3b82f6
//             );

//           color: white;

//           font-weight: 600;

//           box-shadow:
//             0 6px 15px
//             rgba(37, 99, 235, .20);
//         }

//         .primary-button:hover {
//           color: white;

//           background:
//             linear-gradient(
//               135deg,
//               #1d4ed8,
//               #2563eb
//             );
//         }

//         .primary-button:disabled {
//           opacity: .7;
//           cursor: not-allowed;
//         }

//         .search-box {
//           position: relative;
//           width: 280px;
//         }

//         .search-box svg {
//           position: absolute;

//           left: 12px;
//           top: 50%;

//           transform:
//             translateY(-50%);

//           color: #64748b;

//           z-index: 2;
//         }

//         .search-box input {
//           padding-left: 38px;
//         }

//         .notice-table-wrapper {
//           overflow-x: auto;
//         }

//         .notice-table {
//           min-width: 1100px;
//         }

//         .notice-table thead th {
//           background: #eff6ff;

//           color: #1e3a8a;

//           font-size: 12px;

//           font-weight: 700;

//           border-bottom:
//             1px solid #dbeafe;

//           padding:
//             13px 12px;

//           white-space: nowrap;
//         }

//         .notice-table tbody td {
//           font-size: 13px;

//           padding:
//             14px 12px;

//           color: #475569;

//           border-bottom:
//             1px solid #eef4fc;

//           vertical-align: middle;

//           white-space: nowrap;
//         }

//         .notice-table tbody tr {
//           transition: .2s ease;
//         }

//         .notice-table tbody tr:hover {
//           background: #f8fbff;
//         }

//         .notice-icon {
//           width: 42px;
//           height: 42px;

//           border-radius: 11px;

//           display: flex;
//           align-items: center;
//           justify-content: center;

//           background: #eff6ff;

//           border:
//             1px solid #dbeafe;

//           font-size: 18px;

//           flex-shrink: 0;
//         }

//         .category-badge {
//           display: inline-flex;

//           align-items: center;

//           padding:
//             6px 10px;

//           border-radius: 8px;

//           background: #f8fafc;

//           color: #334155;

//           border:
//             1px solid #e2e8f0;

//           font-size: 11px;

//           font-weight: 600;
//         }

//         .audience-badge {
//           display: inline-flex;

//           align-items: center;

//           gap: 5px;

//           padding:
//             6px 10px;

//           border-radius: 8px;

//           background: #eff6ff;

//           color: #2563eb;

//           border:
//             1px solid #bfdbfe;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .date-badge {
//           display: inline-flex;

//           align-items: center;

//           gap: 5px;

//           color: #475569;

//           font-size: 12px;

//           font-weight: 600;
//         }

//         .priority-high {
//           display: inline-flex;

//           align-items: center;

//           padding:
//             5px 9px;

//           border-radius: 8px;

//           background: #fef2f2;

//           color: #dc2626;

//           border:
//             1px solid #fecaca;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .priority-normal {
//           display: inline-flex;

//           align-items: center;

//           padding:
//             5px 9px;

//           border-radius: 8px;

//           background: #eff6ff;

//           color: #2563eb;

//           border:
//             1px solid #bfdbfe;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .status-published {
//           display: inline-flex;

//           align-items: center;

//           gap: 4px;

//           padding:
//             5px 9px;

//           border-radius: 8px;

//           background: #ecfdf5;

//           color: #059669;

//           border:
//             1px solid #a7f3d0;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .status-draft {
//           display: inline-flex;

//           align-items: center;

//           gap: 4px;

//           padding:
//             5px 9px;

//           border-radius: 8px;

//           background: #fffbeb;

//           color: #d97706;

//           border:
//             1px solid #fde68a;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .action-button {
//           width: 34px;
//           height: 34px;

//           border-radius: 9px;

//           display: inline-flex;

//           align-items: center;
//           justify-content: center;

//           padding: 0;
//         }

//         .stat-card {
//           background: #ffffff;

//           border: 0;

//           border-radius: 16px;

//           box-shadow:
//             0 6px 22px
//             rgba(15, 23, 42, .07);
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;

//           border-radius: 12px;

//           display: flex;

//           align-items: center;

//           justify-content: center;
//         }

//         .modal-overlay {
//           position: fixed;

//           inset: 0;

//           background:
//             rgba(15, 23, 42, .48);

//           z-index: 1055;

//           overflow-y: auto;

//           padding:
//             20px;
//         }

//         .notice-modal {
//           max-width: 850px;

//           margin:
//             40px auto;

//           background: #ffffff;

//           border-radius: 18px;

//           box-shadow:
//             0 20px 60px
//             rgba(15, 23, 42, .20);

//           overflow: hidden;
//         }

//         .modal-top {
//           background:
//             linear-gradient(
//               135deg,
//               #ffffff 0%,
//               #f5f9ff 60%,
//               #eaf3ff 100%
//             );

//           border-bottom:
//             1px solid #e0ecff;
//         }

//         .modal-close {
//           width: 36px;
//           height: 36px;

//           border: 0;

//           border-radius: 10px;

//           display: inline-flex;

//           align-items: center;
//           justify-content: center;

//           background: #eff6ff;

//           color: #2563eb;
//         }

//         .modal-close:hover {
//           background: #dbeafe;
//         }

//         .description-control {
//           min-height: 120px;

//           resize: vertical;
//         }

//         .pin-box {
//           padding:
//             12px 14px;

//           border-radius: 12px;

//           background: #f8fbff;

//           border:
//             1px solid #dbeafe;
//         }

//         @media (max-width: 767px) {

//           .search-box {
//             width: 100%;
//           }

//           .notice-modal {
//             margin:
//               10px auto;
//           }

//           .modal-overlay {
//             padding: 10px;
//           }

//         }

//       `}</style>

//       <div className="notice-page">

//         {/* =====================================================
//             PAGE HEADER
//         ====================================================== */}

//         <div className="mx-2 mt-2 mb-3">

//           <div
//             className="rounded-4 shadow overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//               border:
//                 "1px solid #dbeafe",
//             }}
//           >

//             <div className="p-3 p-md-4">

//               <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "linear-gradient(135deg,#2563eb,#3b82f6)",
//                       color: "#fff",
//                       boxShadow:
//                         "0 8px 20px rgba(37,99,235,.22)",
//                     }}
//                   >
//                     <MdManageSearch
//                       size={27}
//                     />
//                   </div>

//                   <div>

//                     <h5 className="mb-1 fw-bold text-dark">
//                       Notice Management
//                     </h5>

//                     <div className="text-muted small">
//                       Setup &nbsp;/&nbsp;
//                       Notice Management
//                     </div>

//                   </div>

//                 </div>

//                 <div>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       backgroundColor:
//                         "#eff6ff",
//                       color:
//                         "#2563eb",
//                       border:
//                         "1px solid #bfdbfe",
//                     }}
//                   >

//                     <MdOutlineSchool
//                       className="me-1"
//                     />

//                     Setup

//                   </span>

//                 </div>

//               </div>

//             </div>

//             <div
//               className="px-4 py-2"
//               style={{
//                 backgroundColor:
//                   "rgba(239,246,255,.75)",
//                 borderTop:
//                   "1px solid #e0ecff",
//               }}
//             >

//               <small className="text-muted">

//                 Home &nbsp;›&nbsp;
//                 Setup &nbsp;›&nbsp;

//                 <span className="text-primary fw-semibold">
//                   Notice Management
//                 </span>

//               </small>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             STAT CARDS
//         ====================================================== */}

//         <div className="mx-2 mb-3">

//           <div className="row g-3">

//             {/* TOTAL */}

//             <div className="col-xl-3 col-md-6">

//               <div className="stat-card h-100">

//                 <div className="p-3">

//                   <div className="d-flex align-items-center">

//                     <div
//                       className="stat-icon me-3"
//                       style={{
//                         background:
//                           "#eff6ff",
//                         color:
//                           "#2563eb",
//                       }}
//                     >
//                       <LuBell
//                         size={22}
//                       />
//                     </div>

//                     <div>

//                       <small className="text-muted">
//                         Total Notices
//                       </small>

//                       <h4 className="fw-bold mb-0">
//                         {totalNotices}
//                       </h4>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* PUBLISHED */}

//             <div className="col-xl-3 col-md-6">

//               <div className="stat-card h-100">

//                 <div className="p-3">

//                   <div className="d-flex align-items-center">

//                     <div
//                       className="stat-icon me-3"
//                       style={{
//                         background:
//                           "#ecfdf5",
//                         color:
//                           "#059669",
//                       }}
//                     >
//                       <LuMegaphone
//                         size={22}
//                       />
//                     </div>

//                     <div>

//                       <small className="text-muted">
//                         Published
//                       </small>

//                       <h4 className="fw-bold mb-0">
//                         {publishedNotices}
//                       </h4>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* DRAFT */}

//             <div className="col-xl-3 col-md-6">

//               <div className="stat-card h-100">

//                 <div className="p-3">

//                   <div className="d-flex align-items-center">

//                     <div
//                       className="stat-icon me-3"
//                       style={{
//                         background:
//                           "#fffbeb",
//                         color:
//                           "#d97706",
//                       }}
//                     >
//                       <LuPencil
//                         size={22}
//                       />
//                     </div>

//                     <div>

//                       <small className="text-muted">
//                         Draft Notices
//                       </small>

//                       <h4 className="fw-bold mb-0">
//                         {draftNotices}
//                       </h4>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* PINNED */}

//             <div className="col-xl-3 col-md-6">

//               <div className="stat-card h-100">

//                 <div className="p-3">

//                   <div className="d-flex align-items-center">

//                     <div
//                       className="stat-icon me-3"
//                       style={{
//                         background:
//                           "#f5f3ff",
//                         color:
//                           "#7c3aed",
//                       }}
//                     >
//                       <LuPin
//                         size={22}
//                       />
//                     </div>

//                     <div>

//                       <small className="text-muted">
//                         Pinned Notices
//                       </small>

//                       <h4 className="fw-bold mb-0">
//                         {pinnedNotices}
//                       </h4>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             NOTICE LIST
//         ====================================================== */}

//         <div className="mx-2 mb-3">

//           <div className="section-card">

//             <div className="p-3 p-md-4">

//               {/* LIST HEADER */}

//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="section-icon">

//                     <LuBell
//                       size={21}
//                     />

//                   </div>

//                   <div>

//                     <h6 className="mb-1 fw-bold">
//                       Notice List
//                     </h6>

//                     <small className="text-muted">
//                       Manage school notices for students and teachers
//                     </small>

//                   </div>

//                 </div>

//                 <button
//                   type="button"
//                   className="primary-button d-flex align-items-center"
//                   onClick={handleAdd}
//                 >

//                   <LuPlus
//                     size={17}
//                     className="me-1"
//                   />

//                   Create Notice

//                 </button>

//               </div>

//               {/* FILTERS */}

//               <div className="d-flex gap-2 flex-wrap mb-4">

//                 {/* SEARCH */}

//                 <div className="search-box">

//                   <LuSearch
//                     size={17}
//                   />

//                   <input
//                     type="text"
//                     className="form-control custom-control"
//                     placeholder="Search notice..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                   />

//                 </div>

//                 {/* AUDIENCE */}

//                 <select
//                   className="form-select custom-control"
//                   style={{
//                     width: "180px",
//                   }}
//                   value={
//                     filterAudience
//                   }
//                   onChange={(e) =>
//                     setFilterAudience(
//                       e.target.value
//                     )
//                   }
//                 >

//                   <option value="ALL">
//                     All Audience
//                   </option>

//                   <option value="EVERYONE">
//                     Everyone
//                   </option>

//                   <option value="STUDENT">
//                     Students
//                   </option>

//                   <option value="TEACHER">
//                     Teachers
//                   </option>

//                 </select>

//                 {/* STATUS */}

//                 <select
//                   className="form-select custom-control"
//                   style={{
//                     width: "160px",
//                   }}
//                   value={
//                     filterStatus
//                   }
//                   onChange={(e) =>
//                     setFilterStatus(
//                       e.target.value
//                     )
//                   }
//                 >

//                   <option value="ALL">
//                     All Status
//                   </option>

//                   <option value="PUBLISHED">
//                     Published
//                   </option>

//                   <option value="DRAFT">
//                     Draft
//                   </option>

//                 </select>

//               </div>

//               {/* TABLE */}

//               <div className="notice-table-wrapper">

//                 <table className="table notice-table align-middle">

//                   <thead>

//                     <tr>

//                       <th>
//                         Notice
//                       </th>

//                       <th>
//                         Category
//                       </th>

//                       <th>
//                         Audience
//                       </th>

//                       <th>
//                         Date
//                       </th>

//                       <th>
//                         Priority
//                       </th>

//                       <th>
//                         Status
//                       </th>

//                       <th className="text-center">
//                         Action
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody>

//                     {filteredNotices.length ===
//                     0 ? (

//                       <tr>

//                         <td
//                           colSpan="7"
//                           className="text-center py-5"
//                         >

//                           <LuBell
//                             size={40}
//                             className="text-muted mb-2"
//                           />

//                           <div className="fw-semibold text-dark">
//                             No notices found
//                           </div>

//                           <small className="text-muted">
//                             Create a new notice to display it here.
//                           </small>

//                         </td>

//                       </tr>

//                     ) : (

//                       filteredNotices.map(
//                         (notice) => {

//                           const category =
//                             getCategory(
//                               notice.category
//                             );

//                           return (

//                             <tr
//                               key={
//                                 notice.id
//                               }
//                             >

//                               {/* NOTICE */}

//                               <td>

//                                 <div className="d-flex align-items-center">

//                                   <div className="notice-icon me-3">
//                                     {
//                                       category.icon
//                                     }
//                                   </div>

//                                   <div
//                                     style={{
//                                       minWidth:
//                                         "260px",
//                                     }}
//                                   >

//                                     <div className="fw-semibold text-dark">

//                                       {
//                                         notice.title
//                                       }

//                                       {notice.pinned && (

//                                         <LuPin
//                                           size={13}
//                                           className="ms-2 text-primary"
//                                         />

//                                       )}

//                                     </div>

//                                     <small
//                                       className="text-muted d-block"
//                                       style={{
//                                         maxWidth:
//                                           "360px",
//                                         overflow:
//                                           "hidden",
//                                         textOverflow:
//                                           "ellipsis",
//                                       }}
//                                     >

//                                       {
//                                         notice.description
//                                       }

//                                     </small>

//                                   </div>

//                                 </div>

//                               </td>

//                               {/* CATEGORY */}

//                               <td>

//                                 <span className="category-badge">

//                                   {
//                                     category.label
//                                   }

//                                 </span>

//                               </td>

//                               {/* AUDIENCE */}

//                               <td>

//                                 <span className="audience-badge">

//                                   <LuUsers
//                                     size={13}
//                                   />

//                                   {
//                                     getAudienceLabel(
//                                       notice.audience
//                                     )
//                                   }

//                                 </span>

//                               </td>

//                               {/* DATE */}

//                               <td>

//                                 <div className="date-badge">

//                                   <LuCalendarDays
//                                     size={14}
//                                   />

//                                   {
//                                     formatDate(
//                                       notice.startDate
//                                     )
//                                   }

//                                 </div>

//                                 {notice.endDate &&
//                                   notice.endDate !==
//                                     notice.startDate && (

//                                   <small className="text-muted ms-1">

//                                     to{" "}

//                                     {
//                                       formatDate(
//                                         notice.endDate
//                                       )
//                                     }

//                                   </small>

//                                 )}

//                               </td>

//                               {/* PRIORITY */}

//                               <td>

//                                 {notice.priority ===
//                                 "HIGH" ? (

//                                   <span className="priority-high">
//                                     High
//                                   </span>

//                                 ) : (

//                                   <span className="priority-normal">
//                                     Normal
//                                   </span>

//                                 )}

//                               </td>

//                               {/* STATUS */}

//                               <td>

//                                 {notice.status ===
//                                 "PUBLISHED" ? (

//                                   <span className="status-published">

//                                     <LuCircleCheck
//                                       size={13}
//                                     />

//                                     Published

//                                   </span>

//                                 ) : (

//                                   <span className="status-draft">

//                                     Draft

//                                   </span>

//                                 )}

//                               </td>

//                               {/* ACTION */}

//                               <td>

//                                 <div className="d-flex justify-content-center gap-1">

//                                   {/* PIN */}

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-primary action-button"
//                                     title="Pin / Unpin"
//                                     onClick={() =>
//                                       togglePin(
//                                         notice.id
//                                       )
//                                     }
//                                   >

//                                     <LuPin
//                                       size={15}
//                                       className={
//                                         notice.pinned
//                                           ? "text-primary"
//                                           : "text-muted"
//                                       }
//                                     />

//                                   </button>

//                                   {/* VIEW */}

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-secondary action-button"
//                                     title="View"
//                                   >

//                                     <LuEye
//                                       size={15}
//                                     />

//                                   </button>

//                                   {/* EDIT */}

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-primary action-button"
//                                     title="Edit"
//                                     onClick={() =>
//                                       handleEdit(
//                                         notice
//                                       )
//                                     }
//                                   >

//                                     <LuPencil
//                                       size={15}
//                                     />

//                                   </button>

//                                   {/* DELETE */}

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-danger action-button"
//                                     title="Delete"
//                                     onClick={() =>
//                                       handleDelete(
//                                         notice.id
//                                       )
//                                     }
//                                   >

//                                     <LuTrash2
//                                       size={15}
//                                     />

//                                   </button>

//                                 </div>

//                               </td>

//                             </tr>

//                           );
//                         }
//                       )

//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             CREATE / EDIT MODAL
//         ====================================================== */}

//         {showModal && (

//           <div className="modal-overlay">

//             <div className="notice-modal">

//               {/* MODAL HEADER */}

//               <div className="modal-top">

//                 <div className="p-3 p-md-4">

//                   <div className="d-flex justify-content-between align-items-center gap-3">

//                     <div className="d-flex align-items-center gap-3">

//                       <div className="section-icon">

//                         {editingNotice ? (
//                           <LuPencil
//                             size={21}
//                           />
//                         ) : (
//                           <LuPlus
//                             size={21}
//                           />
//                         )}

//                       </div>

//                       <div>

//                         <h5 className="fw-bold mb-1">

//                           {editingNotice
//                             ? "Edit Notice"
//                             : "Create New Notice"}

//                         </h5>

//                         <small className="text-muted">

//                           Create a notice and select who should receive it.

//                         </small>

//                       </div>

//                     </div>

//                     <button
//                       type="button"
//                       className="modal-close"
//                       onClick={
//                         closeModal
//                       }
//                     >

//                       <LuX
//                         size={18}
//                       />

//                     </button>

//                   </div>

//                 </div>

//               </div>

//               {/* FORM */}

//               <form
//                 onSubmit={
//                   handleSubmit
//                 }
//               >

//                 <div className="p-3 p-md-4">

//                   <div className="row g-3">

//                     {/* TITLE */}

//                     <div className="col-12">

//                       <label className="custom-label">

//                         Notice Title{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </label>

//                       <input
//                         type="text"
//                         name="title"
//                         className="form-control custom-control"
//                         placeholder="Enter notice title"
//                         value={
//                           form.title
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />

//                     </div>

//                     {/* CATEGORY */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">
//                         Category
//                       </label>

//                       <select
//                         name="category"
//                         className="form-select custom-control"
//                         value={
//                           form.category
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       >

//                         {categories.map(
//                           (category) => (

//                             <option
//                               key={
//                                 category.value
//                               }
//                               value={
//                                 category.value
//                               }
//                             >

//                               {
//                                 category.icon
//                               }{" "}

//                               {
//                                 category.label
//                               }

//                             </option>

//                           )
//                         )}

//                       </select>

//                     </div>

//                     {/* AUDIENCE */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">
//                         Show To
//                       </label>

//                       <select
//                         name="audience"
//                         className="form-select custom-control"
//                         value={
//                           form.audience
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       >

//                         <option value="EVERYONE">
//                           Everyone
//                         </option>

//                         <option value="STUDENT">
//                           Students Only
//                         </option>

//                         <option value="TEACHER">
//                           Teachers Only
//                         </option>

//                       </select>

//                     </div>

//                     {/* PRIORITY */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">
//                         Priority
//                       </label>

//                       <select
//                         name="priority"
//                         className="form-select custom-control"
//                         value={
//                           form.priority
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       >

//                         <option value="NORMAL">
//                           Normal
//                         </option>

//                         <option value="HIGH">
//                           High
//                         </option>

//                       </select>

//                     </div>

//                     {/* START DATE */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">

//                         Start Date{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </label>

//                       <input
//                         type="date"
//                         name="startDate"
//                         className="form-control custom-control"
//                         value={
//                           form.startDate
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />

//                     </div>

//                     {/* END DATE */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">

//                         End Date{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </label>

//                       <input
//                         type="date"
//                         name="endDate"
//                         className="form-control custom-control"
//                         value={
//                           form.endDate
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />

//                     </div>

//                     {/* STATUS */}

//                     <div className="col-12 col-md-4">

//                       <label className="custom-label">
//                         Status
//                       </label>

//                       <select
//                         name="status"
//                         className="form-select custom-control"
//                         value={
//                           form.status
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       >

//                         <option value="DRAFT">
//                           Save as Draft
//                         </option>

//                         <option value="PUBLISHED">
//                           Publish Now
//                         </option>

//                       </select>

//                     </div>

//                     {/* DESCRIPTION */}

//                     <div className="col-12">

//                       <label className="custom-label">

//                         Notice Description{" "}

//                         <span className="text-danger">
//                           *
//                         </span>

//                       </label>

//                       <textarea
//                         name="description"
//                         rows="5"
//                         className="form-control custom-control description-control"
//                         placeholder="Write your notice here..."
//                         value={
//                           form.description
//                         }
//                         onChange={
//                           handleChange
//                         }
//                       />

//                     </div>

//                     {/* PIN */}

//                     <div className="col-12">

//                       <div className="pin-box">

//                         <div className="form-check">

//                           <input
//                             type="checkbox"
//                             name="pinned"
//                             className="form-check-input"
//                             id="pinNotice"
//                             checked={
//                               form.pinned
//                             }
//                             onChange={
//                               handleChange
//                             }
//                           />

//                           <label
//                             htmlFor="pinNotice"
//                             className="form-check-label"
//                           >

//                             <LuPin
//                               size={14}
//                               className="me-1 text-primary"
//                             />

//                             <span className="fw-semibold">
//                               Pin this notice on dashboard
//                             </span>

//                             <small className="text-muted d-block ms-4 mt-1">
//                               Pinned notices can be displayed prominently on the dashboard.
//                             </small>

//                           </label>

//                         </div>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//                 {/* MODAL FOOTER */}

//                 <div
//                   className="px-3 px-md-4 py-3 d-flex justify-content-end gap-2"
//                   style={{
//                     borderTop:
//                       "1px solid #eef4fc",
//                     background:
//                       "#fbfdff",
//                   }}
//                 >

//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary rounded-3 px-4"
//                     onClick={
//                       closeModal
//                     }
//                   >

//                     Cancel

//                   </button>

//                   <button
//                     type="submit"
//                     className="primary-button d-flex align-items-center"
//                   >

//                     <LuCircleCheck
//                       size={17}
//                       className="me-1"
//                     />

//                     {editingNotice
//                       ? "Update Notice"
//                       : "Create Notice"}

//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         )}

//       </div>
//     </>
//   );
// };

// export default NoticeManagement;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LuBell,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuEye,
  LuMegaphone,
  LuCalendarDays,
  LuUsers,
  LuPin,
  LuX,
  LuCircleCheck,
  LuRefreshCw,
} from "react-icons/lu";

import {
  MdManageSearch,
  MdOutlineSchool,
} from "react-icons/md";

import axios from "../../api/axiosInstance";

const NoticeManagement = () => {
  // =========================================================
  // USER / SCHOOL
  // =========================================================

  const user = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  }, []);

  const schoolId = user?.schoolId;

  // =========================================================
  // STATES
  // =========================================================

  const [showModal, setShowModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [editingNotice, setEditingNotice] =
    useState(null);

  const [viewingNotice, setViewingNotice] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filterAudience, setFilterAudience] =
    useState("ALL");

  const [filterStatus, setFilterStatus] =
    useState("ALL");

  const [notices, setNotices] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const emptyForm = {
    title: "",
    category: "GENERAL",
    audience: "EVERYONE",
    priority: "NORMAL",
    description: "",
    startDate: "",
    endDate: "",
    status: "DRAFT",
    pinned: false,
  };

  const [form, setForm] =
    useState(emptyForm);

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = [
    {
      value: "GENERAL",
      label: "General Notice",
      icon: "📢",
    },
    {
      value: "FEE_REMINDER",
      label: "Fee Reminder",
      icon: "💰",
    },
    {
      value: "PTM",
      label: "PTM",
      icon: "👨‍👩‍👧",
    },
    {
      value: "HOLIDAY",
      label: "School Holiday",
      icon: "🏖️",
    },
    {
      value: "EXAM",
      label: "Exam / Test",
      icon: "📝",
    },
    {
      value: "EVENT",
      label: "School Event",
      icon: "🎉",
    },
    {
      value: "MEETING",
      label: "Meeting",
      icon: "👥",
    },
    {
      value: "ATTENDANCE",
      label: "Attendance",
      icon: "📋",
    },
  ];

  // =========================================================
  // GET ALL NOTICES
  // =========================================================

  const fetchNotices = useCallback(async () => {
    if (!schoolId) {
      setError(
        "School ID not found. Please login again."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "/api/notices/school",
        {
          params: {
            schoolId,
          },
        }
      );

      setNotices(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(
        "Failed to fetch notices:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load notices."
      );
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const keyword =
        search.trim().toLowerCase();

      const searchMatch =
        !keyword ||
        notice.title
          ?.toLowerCase()
          .includes(keyword) ||
        notice.description
          ?.toLowerCase()
          .includes(keyword);

      const audienceMatch =
        filterAudience === "ALL" ||
        notice.audience ===
          filterAudience;

      const statusMatch =
        filterStatus === "ALL" ||
        notice.status ===
          filterStatus;

      return (
        searchMatch &&
        audienceMatch &&
        statusMatch
      );
    });
  }, [
    notices,
    search,
    filterAudience,
    filterStatus,
  ]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // ADD
  // =========================================================

  const handleAdd = () => {
    setEditingNotice(null);

    setForm({
      ...emptyForm,
    });

    setError("");

    setShowModal(true);
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (notice) => {
    setEditingNotice(notice);

    setForm({
      title: notice.title || "",
      category:
        notice.category || "GENERAL",
      audience:
        notice.audience || "EVERYONE",
      priority:
        notice.priority || "NORMAL",
      description:
        notice.description || "",
      startDate:
        notice.startDate || "",
      endDate:
        notice.endDate || "",
      status:
        notice.status || "DRAFT",
      pinned:
        notice.pinned || false,
    });

    setError("");

    setShowModal(true);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!form.title.trim()) {
      alert(
        "Please enter notice title."
      );
      return false;
    }

    if (!form.description.trim()) {
      alert(
        "Please enter notice description."
      );
      return false;
    }

    if (!form.startDate) {
      alert(
        "Please select start date."
      );
      return false;
    }

    if (!form.endDate) {
      alert(
        "Please select end date."
      );
      return false;
    }

    if (
      form.endDate <
      form.startDate
    ) {
      alert(
        "End date cannot be before start date."
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert(
        "School ID not found. Please login again."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        category: form.category,
        audience: form.audience,
        priority: form.priority,
        description:
          form.description.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        status: form.status,
        pinned: form.pinned,
      };

      // =====================================================
      // UPDATE
      // =====================================================

      if (editingNotice) {
        const response =
          await axios.put(
            `/api/notices/${editingNotice.id}`,
            payload,
            {
              params: {
                schoolId,
              },
            }
          );

        setNotices((prev) =>
          prev.map((notice) =>
            notice.id ===
            editingNotice.id
              ? response.data
              : notice
          )
        );

        alert(
          "Notice updated successfully."
        );
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        const response =
          await axios.post(
            "/api/notices",
            payload,
            {
              params: {
                schoolId,
              },
            }
          );

        setNotices((prev) => [
          response.data,
          ...prev,
        ]);

        alert(
          "Notice created successfully."
        );
      }

      closeModal();
    } catch (err) {
      console.error(
        "Notice save error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Failed to save notice.";

      setError(
        typeof message === "string"
          ? message
          : "Failed to save notice."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setShowModal(false);

    setEditingNotice(null);

    setForm({
      ...emptyForm,
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this notice?"
      );

    if (!confirmed) {
      return;
    }

    if (!schoolId) {
      alert(
        "School ID not found. Please login again."
      );
      return;
    }

    try {
      setError("");

      await axios.delete(
        `/api/notices/${id}`,
        {
          params: {
            schoolId,
          },
        }
      );

      setNotices((prev) =>
        prev.filter(
          (notice) =>
            notice.id !== id
        )
      );

      alert(
        "Notice deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete notice error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to delete notice."
      );
    }
  };

  // =========================================================
  // PIN / UNPIN
  // =========================================================

  const togglePin = async (id) => {
    if (!schoolId) {
      alert(
        "School ID not found. Please login again."
      );
      return;
    }

    try {
      setError("");

      const response =
        await axios.patch(
          `/api/notices/${id}/toggle-pin`,
          {},
          {
            params: {
              schoolId,
            },
          }
        );

      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === id
            ? response.data
            : notice
        )
      );
    } catch (err) {
      console.error(
        "Toggle pin error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to update pin status."
      );
    }
  };

  // =========================================================
  // VIEW
  // =========================================================

  const handleView = async (notice) => {
    if (!schoolId) {
      alert(
        "School ID not found. Please login again."
      );
      return;
    }

    try {
      setError("");

      const response =
        await axios.get(
          `/api/notices/${notice.id}`,
          {
            params: {
              schoolId,
            },
          }
        );

      setViewingNotice(
        response.data
      );

      setShowViewModal(true);
    } catch (err) {
      console.error(
        "View notice error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to load notice."
      );
    }
  };

  // =========================================================
  // CLOSE VIEW MODAL
  // =========================================================

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingNotice(null);
  };

  // =========================================================
  // CATEGORY
  // =========================================================

  const getCategory = (value) => {
    return (
      categories.find(
        (item) =>
          item.value === value
      ) ||
      categories[0]
    );
  };

  // =========================================================
  // AUDIENCE
  // =========================================================

  const getAudienceLabel = (
    audience
  ) => {
    if (
      audience === "STUDENT"
    ) {
      return "Students";
    }

    if (
      audience === "TEACHER"
    ) {
      return "Teachers";
    }

    return "Everyone";
  };

  // =========================================================
  // DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalNotices =
    notices.length;

  const publishedNotices =
    notices.filter(
      (notice) =>
        notice.status ===
        "PUBLISHED"
    ).length;

  const draftNotices =
    notices.filter(
      (notice) =>
        notice.status ===
        "DRAFT"
    ).length;

  const pinnedNotices =
    notices.filter(
      (notice) =>
        notice.pinned
    ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <style>{`

        .notice-page {
          background: #f8fbff;
          min-height: 100vh;
        }

        .section-card {
          background: #ffffff;
          border: 0;
          border-radius: 16px;
          box-shadow:
            0 6px 22px
            rgba(15, 23, 42, .07);
        }

        .section-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
          flex-shrink: 0;
        }

        .custom-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 7px;
        }

        .custom-control {
          min-height: 42px;
          border-radius: 12px !important;
          border: 1px solid #dbeafe !important;
          font-size: 14px;
          box-shadow: none !important;
        }

        .custom-control:focus {
          border-color: #60a5fa !important;
          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, .10)
            !important;
        }

        .primary-button {
          min-height: 42px;
          border: 0;
          border-radius: 12px;
          padding: 0 18px;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
          color: white;
          font-weight: 600;
          box-shadow:
            0 6px 15px
            rgba(37, 99, 235, .20);
        }

        .primary-button:hover {
          color: white;
          background:
            linear-gradient(
              135deg,
              #1d4ed8,
              #2563eb
            );
        }

        .primary-button:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .search-box {
          position: relative;
          width: 280px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform:
            translateY(-50%);
          color: #64748b;
          z-index: 2;
        }

        .search-box input {
          padding-left: 38px;
        }

        .notice-table-wrapper {
          overflow-x: auto;
        }

        .notice-table {
          min-width: 1100px;
        }

        .notice-table thead th {
          background: #eff6ff;
          color: #1e3a8a;
          font-size: 12px;
          font-weight: 700;
          border-bottom:
            1px solid #dbeafe;
          padding:
            13px 12px;
          white-space: nowrap;
        }

        .notice-table tbody td {
          font-size: 13px;
          padding:
            14px 12px;
          color: #475569;
          border-bottom:
            1px solid #eef4fc;
          vertical-align: middle;
          white-space: nowrap;
        }

        .notice-table tbody tr {
          transition: .2s ease;
        }

        .notice-table tbody tr:hover {
          background: #f8fbff;
        }

        .notice-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          border:
            1px solid #dbeafe;
          font-size: 18px;
          flex-shrink: 0;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          padding:
            6px 10px;
          border-radius: 8px;
          background: #f8fafc;
          color: #334155;
          border:
            1px solid #e2e8f0;
          font-size: 11px;
          font-weight: 600;
        }

        .audience-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding:
            6px 10px;
          border-radius: 8px;
          background: #eff6ff;
          color: #2563eb;
          border:
            1px solid #bfdbfe;
          font-size: 11px;
          font-weight: 700;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #475569;
          font-size: 12px;
          font-weight: 600;
        }

        .priority-high {
          display: inline-flex;
          align-items: center;
          padding:
            5px 9px;
          border-radius: 8px;
          background: #fef2f2;
          color: #dc2626;
          border:
            1px solid #fecaca;
          font-size: 11px;
          font-weight: 700;
        }

        .priority-normal {
          display: inline-flex;
          align-items: center;
          padding:
            5px 9px;
          border-radius: 8px;
          background: #eff6ff;
          color: #2563eb;
          border:
            1px solid #bfdbfe;
          font-size: 11px;
          font-weight: 700;
        }

        .status-published {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding:
            5px 9px;
          border-radius: 8px;
          background: #ecfdf5;
          color: #059669;
          border:
            1px solid #a7f3d0;
          font-size: 11px;
          font-weight: 700;
        }

        .status-draft {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding:
            5px 9px;
          border-radius: 8px;
          background: #fffbeb;
          color: #d97706;
          border:
            1px solid #fde68a;
          font-size: 11px;
          font-weight: 700;
        }

        .action-button {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .stat-card {
          background: #ffffff;
          border: 0;
          border-radius: 16px;
          box-shadow:
            0 6px 22px
            rgba(15, 23, 42, .07);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background:
            rgba(15, 23, 42, .48);
          z-index: 1055;
          overflow-y: auto;
          padding: 20px;
        }

        .notice-modal {
          max-width: 850px;
          margin:
            40px auto;
          background: #ffffff;
          border-radius: 18px;
          box-shadow:
            0 20px 60px
            rgba(15, 23, 42, .20);
          overflow: hidden;
        }

        .view-modal {
          max-width: 700px;
        }

        .modal-top {
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f5f9ff 60%,
              #eaf3ff 100%
            );
          border-bottom:
            1px solid #e0ecff;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
        }

        .modal-close:hover {
          background: #dbeafe;
        }

        .description-control {
          min-height: 120px;
          resize: vertical;
        }

        .pin-box {
          padding:
            12px 14px;
          border-radius: 12px;
          background: #f8fbff;
          border:
            1px solid #dbeafe;
        }

        .view-description {
          background: #f8fbff;
          border: 1px solid #e0ecff;
          border-radius: 12px;
          padding: 16px;
          color: #475569;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .notice-info-box {
          background: #f8fbff;
          border: 1px solid #e0ecff;
          border-radius: 12px;
          padding: 12px;
        }

        .error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          border-radius: 12px;
          padding: 10px 13px;
          font-size: 13px;
        }

        .loading-box {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #64748b;
        }

        .spin-icon {
          animation: noticeSpin 1s linear infinite;
        }

        @keyframes noticeSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 767px) {

          .search-box {
            width: 100%;
          }

          .notice-modal {
            margin:
              10px auto;
          }

          .modal-overlay {
            padding: 10px;
          }

        }

      `}</style>

      <div className="notice-page">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mx-2 mt-2 mb-3">

          <div
            className="rounded-4 shadow overflow-hidden"
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
                    className="d-flex align-items-center justify-content-center rounded-3"
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
                    <MdManageSearch
                      size={27}
                    />
                  </div>

                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Notice Management
                    </h5>

                    <div className="text-muted small">
                      Setup &nbsp;/&nbsp;
                      Notice Management
                    </div>

                  </div>

                </div>

                <div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color:
                        "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >

                    <MdOutlineSchool
                      className="me-1"
                    />

                    Setup

                  </span>

                </div>

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
                Setup &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Notice Management
                </span>

              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mx-2 mb-3">
            <div className="error-box d-flex justify-content-between align-items-center gap-2">

              <span>
                {error}
              </span>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger rounded-3"
                onClick={() =>
                  setError("")
                }
              >
                <LuX size={15} />
              </button>

            </div>
          </div>
        )}

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="mx-2 mb-3">

          <div className="row g-3">

            {/* TOTAL */}

            <div className="col-xl-3 col-md-6">

              <div className="stat-card h-100">

                <div className="p-3">

                  <div className="d-flex align-items-center">

                    <div
                      className="stat-icon me-3"
                      style={{
                        background:
                          "#eff6ff",
                        color:
                          "#2563eb",
                      }}
                    >
                      <LuBell
                        size={22}
                      />
                    </div>

                    <div>

                      <small className="text-muted">
                        Total Notices
                      </small>

                      <h4 className="fw-bold mb-0">
                        {totalNotices}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* PUBLISHED */}

            <div className="col-xl-3 col-md-6">

              <div className="stat-card h-100">

                <div className="p-3">

                  <div className="d-flex align-items-center">

                    <div
                      className="stat-icon me-3"
                      style={{
                        background:
                          "#ecfdf5",
                        color:
                          "#059669",
                      }}
                    >
                      <LuMegaphone
                        size={22}
                      />
                    </div>

                    <div>

                      <small className="text-muted">
                        Published
                      </small>

                      <h4 className="fw-bold mb-0">
                        {publishedNotices}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* DRAFT */}

            <div className="col-xl-3 col-md-6">

              <div className="stat-card h-100">

                <div className="p-3">

                  <div className="d-flex align-items-center">

                    <div
                      className="stat-icon me-3"
                      style={{
                        background:
                          "#fffbeb",
                        color:
                          "#d97706",
                      }}
                    >
                      <LuPencil
                        size={22}
                      />
                    </div>

                    <div>

                      <small className="text-muted">
                        Draft Notices
                      </small>

                      <h4 className="fw-bold mb-0">
                        {draftNotices}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* PINNED */}

            <div className="col-xl-3 col-md-6">

              <div className="stat-card h-100">

                <div className="p-3">

                  <div className="d-flex align-items-center">

                    <div
                      className="stat-icon me-3"
                      style={{
                        background:
                          "#f5f3ff",
                        color:
                          "#7c3aed",
                      }}
                    >
                      <LuPin
                        size={22}
                      />
                    </div>

                    <div>

                      <small className="text-muted">
                        Pinned Notices
                      </small>

                      <h4 className="fw-bold mb-0">
                        {pinnedNotices}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NOTICE LIST
        ====================================================== */}

        <div className="mx-2 mb-3">

          <div className="section-card">

            <div className="p-3 p-md-4">

              {/* LIST HEADER */}

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">

                <div className="d-flex align-items-center gap-3">

                  <div className="section-icon">

                    <LuBell
                      size={21}
                    />

                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Notice List
                    </h6>

                    <small className="text-muted">
                      Manage school notices for students and teachers
                    </small>

                  </div>

                </div>

                <div className="d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-3 d-flex align-items-center"
                    onClick={
                      fetchNotices
                    }
                    disabled={
                      loading
                    }
                    title="Refresh"
                  >
                    <LuRefreshCw
                      size={16}
                      className={
                        loading
                          ? "spin-icon me-1"
                          : "me-1"
                      }
                    />
                    Refresh
                  </button>

                  <button
                    type="button"
                    className="primary-button d-flex align-items-center"
                    onClick={
                      handleAdd
                    }
                  >

                    <LuPlus
                      size={17}
                      className="me-1"
                    />

                    Create Notice

                  </button>

                </div>

              </div>

              {/* FILTERS */}

              <div className="d-flex gap-2 flex-wrap mb-4">

                {/* SEARCH */}

                <div className="search-box">

                  <LuSearch
                    size={17}
                  />

                  <input
                    type="text"
                    className="form-control custom-control"
                    placeholder="Search notice..."
                    value={
                      search
                    }
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* AUDIENCE */}

                <select
                  className="form-select custom-control"
                  style={{
                    width: "180px",
                  }}
                  value={
                    filterAudience
                  }
                  onChange={(e) =>
                    setFilterAudience(
                      e.target.value
                    )
                  }
                >

                  <option value="ALL">
                    All Audience
                  </option>

                  <option value="EVERYONE">
                    Everyone
                  </option>

                  <option value="STUDENT">
                    Students
                  </option>

                  <option value="TEACHER">
                    Teachers
                  </option>

                </select>

                {/* STATUS */}

                <select
                  className="form-select custom-control"
                  style={{
                    width: "160px",
                  }}
                  value={
                    filterStatus
                  }
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="ALL">
                    All Status
                  </option>

                  <option value="PUBLISHED">
                    Published
                  </option>

                  <option value="DRAFT">
                    Draft
                  </option>

                </select>

              </div>

              {/* TABLE */}

              <div className="notice-table-wrapper">

                {loading ? (

                  <div className="loading-box">

                    <LuRefreshCw
                      size={32}
                      className="spin-icon text-primary mb-2"
                    />

                    <div className="fw-semibold">
                      Loading notices...
                    </div>

                    <small className="text-muted">
                      Please wait
                    </small>

                  </div>

                ) : (

                  <table className="table notice-table align-middle">

                    <thead>

                      <tr>

                        <th>
                          Notice
                        </th>

                        <th>
                          Category
                        </th>

                        <th>
                          Audience
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Priority
                        </th>

                        <th>
                          Status
                        </th>

                        <th className="text-center">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredNotices.length ===
                      0 ? (

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center py-5"
                          >

                            <LuBell
                              size={40}
                              className="text-muted mb-2"
                            />

                            <div className="fw-semibold text-dark">
                              No notices found
                            </div>

                            <small className="text-muted">
                              Create a new notice to display it here.
                            </small>

                          </td>

                        </tr>

                      ) : (

                        filteredNotices.map(
                          (notice) => {

                            const category =
                              getCategory(
                                notice.category
                              );

                            return (

                              <tr
                                key={
                                  notice.id
                                }
                              >

                                {/* NOTICE */}

                                <td>

                                  <div className="d-flex align-items-center">

                                    <div className="notice-icon me-3">
                                      {
                                        category.icon
                                      }
                                    </div>

                                    <div
                                      style={{
                                        minWidth:
                                          "260px",
                                      }}
                                    >

                                      <div className="fw-semibold text-dark">

                                        {
                                          notice.title
                                        }

                                        {notice.pinned && (

                                          <LuPin
                                            size={13}
                                            className="ms-2 text-primary"
                                          />

                                        )}

                                      </div>

                                      <small
                                        className="text-muted d-block"
                                        style={{
                                          maxWidth:
                                            "360px",
                                          overflow:
                                            "hidden",
                                          textOverflow:
                                            "ellipsis",
                                        }}
                                      >

                                        {
                                          notice.description
                                        }

                                      </small>

                                    </div>

                                  </div>

                                </td>

                                {/* CATEGORY */}

                                <td>

                                  <span className="category-badge">

                                    {
                                      category.label
                                    }

                                  </span>

                                </td>

                                {/* AUDIENCE */}

                                <td>

                                  <span className="audience-badge">

                                    <LuUsers
                                      size={13}
                                    />

                                    {
                                      getAudienceLabel(
                                        notice.audience
                                      )
                                    }

                                  </span>

                                </td>

                                {/* DATE */}

                                <td>

                                  <div className="date-badge">

                                    <LuCalendarDays
                                      size={14}
                                    />

                                    {
                                      formatDate(
                                        notice.startDate
                                      )
                                    }

                                  </div>

                                  {notice.endDate &&
                                    notice.endDate !==
                                      notice.startDate && (

                                    <small className="text-muted ms-1">

                                      to{" "}

                                      {
                                        formatDate(
                                          notice.endDate
                                        )
                                      }

                                    </small>

                                  )}

                                </td>

                                {/* PRIORITY */}

                                <td>

                                  {notice.priority ===
                                  "HIGH" ? (

                                    <span className="priority-high">
                                      High
                                    </span>

                                  ) : (

                                    <span className="priority-normal">
                                      Normal
                                    </span>

                                  )}

                                </td>

                                {/* STATUS */}

                                <td>

                                  {notice.status ===
                                  "PUBLISHED" ? (

                                    <span className="status-published">

                                      <LuCircleCheck
                                        size={13}
                                      />

                                      Published

                                    </span>

                                  ) : (

                                    <span className="status-draft">

                                      Draft

                                    </span>

                                  )}

                                </td>

                                {/* ACTION */}

                                <td>

                                  <div className="d-flex justify-content-center gap-1">

                                    {/* PIN */}

                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary action-button"
                                      title="Pin / Unpin"
                                      onClick={() =>
                                        togglePin(
                                          notice.id
                                        )
                                      }
                                    >

                                      <LuPin
                                        size={15}
                                        className={
                                          notice.pinned
                                            ? "text-primary"
                                            : "text-muted"
                                        }
                                      />

                                    </button>

                                    {/* VIEW */}

                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-secondary action-button"
                                      title="View"
                                      onClick={() =>
                                        handleView(
                                          notice
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
                                      className="btn btn-sm btn-outline-primary action-button"
                                      title="Edit"
                                      onClick={() =>
                                        handleEdit(
                                          notice
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
                                      className="btn btn-sm btn-outline-danger action-button"
                                      title="Delete"
                                      onClick={() =>
                                        handleDelete(
                                          notice.id
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
                        )

                      )}

                    </tbody>

                  </table>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            CREATE / EDIT MODAL
        ====================================================== */}

        {showModal && (

          <div className="modal-overlay">

            <div className="notice-modal">

              {/* MODAL HEADER */}

              <div className="modal-top">

                <div className="p-3 p-md-4">

                  <div className="d-flex justify-content-between align-items-center gap-3">

                    <div className="d-flex align-items-center gap-3">

                      <div className="section-icon">

                        {editingNotice ? (
                          <LuPencil
                            size={21}
                          />
                        ) : (
                          <LuPlus
                            size={21}
                          />
                        )}

                      </div>

                      <div>

                        <h5 className="fw-bold mb-1">

                          {editingNotice
                            ? "Edit Notice"
                            : "Create New Notice"}

                        </h5>

                        <small className="text-muted">

                          Create a notice and select who should receive it.

                        </small>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="modal-close"
                      onClick={
                        closeModal
                      }
                    >

                      <LuX
                        size={18}
                      />

                    </button>

                  </div>

                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="p-3 p-md-4">

                  <div className="row g-3">

                    {/* TITLE */}

                    <div className="col-12">

                      <label className="custom-label">

                        Notice Title{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="text"
                        name="title"
                        className="form-control custom-control"
                        placeholder="Enter notice title"
                        value={
                          form.title
                        }
                        onChange={
                          handleChange
                        }
                        maxLength={200}
                      />

                    </div>

                    {/* CATEGORY */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">
                        Category
                      </label>

                      <select
                        name="category"
                        className="form-select custom-control"
                        value={
                          form.category
                        }
                        onChange={
                          handleChange
                        }
                      >

                        {categories.map(
                          (category) => (

                            <option
                              key={
                                category.value
                              }
                              value={
                                category.value
                              }
                            >

                              {
                                category.icon
                              }{" "}

                              {
                                category.label
                              }

                            </option>

                          )
                        )}

                      </select>

                    </div>

                    {/* AUDIENCE */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">
                        Show To
                      </label>

                      <select
                        name="audience"
                        className="form-select custom-control"
                        value={
                          form.audience
                        }
                        onChange={
                          handleChange
                        }
                      >

                        <option value="EVERYONE">
                          Everyone
                        </option>

                        <option value="STUDENT">
                          Students Only
                        </option>

                        <option value="TEACHER">
                          Teachers Only
                        </option>

                      </select>

                    </div>

                    {/* PRIORITY */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">
                        Priority
                      </label>

                      <select
                        name="priority"
                        className="form-select custom-control"
                        value={
                          form.priority
                        }
                        onChange={
                          handleChange
                        }
                      >

                        <option value="NORMAL">
                          Normal
                        </option>

                        <option value="HIGH">
                          High
                        </option>

                      </select>

                    </div>

                    {/* START DATE */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">

                        Start Date{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="date"
                        name="startDate"
                        className="form-control custom-control"
                        value={
                          form.startDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    {/* END DATE */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">

                        End Date{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <input
                        type="date"
                        name="endDate"
                        className="form-control custom-control"
                        value={
                          form.endDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    {/* STATUS */}

                    <div className="col-12 col-md-4">

                      <label className="custom-label">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select custom-control"
                        value={
                          form.status
                        }
                        onChange={
                          handleChange
                        }
                      >

                        <option value="DRAFT">
                          Save as Draft
                        </option>

                        <option value="PUBLISHED">
                          Publish Now
                        </option>

                      </select>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="col-12">

                      <label className="custom-label">

                        Notice Description{" "}

                        <span className="text-danger">
                          *
                        </span>

                      </label>

                      <textarea
                        name="description"
                        rows="5"
                        className="form-control custom-control description-control"
                        placeholder="Write your notice here..."
                        value={
                          form.description
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    {/* PIN */}

                    <div className="col-12">

                      <div className="pin-box">

                        <div className="form-check">

                          <input
                            type="checkbox"
                            name="pinned"
                            className="form-check-input"
                            id="pinNotice"
                            checked={
                              form.pinned
                            }
                            onChange={
                              handleChange
                            }
                          />

                          <label
                            htmlFor="pinNotice"
                            className="form-check-label"
                          >

                            <LuPin
                              size={14}
                              className="me-1 text-primary"
                            />

                            <span className="fw-semibold">
                              Pin this notice on dashboard
                            </span>

                            <small className="text-muted d-block ms-4 mt-1">
                              Pinned notices can be displayed prominently on the dashboard.
                            </small>

                          </label>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* MODAL FOOTER */}

                <div
                  className="px-3 px-md-4 py-3 d-flex justify-content-end gap-2"
                  style={{
                    borderTop:
                      "1px solid #eef4fc",
                    background:
                      "#fbfdff",
                  }}
                >

                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-3 px-4"
                    onClick={
                      closeModal
                    }
                    disabled={
                      saving
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button d-flex align-items-center"
                    disabled={
                      saving
                    }
                  >

                    {saving ? (

                      <LuRefreshCw
                        size={17}
                        className="me-1 spin-icon"
                      />

                    ) : (

                      <LuCircleCheck
                        size={17}
                        className="me-1"
                      />

                    )}

                    {saving
                      ? "Saving..."
                      : editingNotice
                      ? "Update Notice"
                      : "Create Notice"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =====================================================
            VIEW MODAL
        ====================================================== */}

        {showViewModal &&
          viewingNotice && (

            <div className="modal-overlay">

              <div className="notice-modal view-modal">

                {/* HEADER */}

                <div className="modal-top">

                  <div className="p-3 p-md-4">

                    <div className="d-flex justify-content-between align-items-center gap-3">

                      <div className="d-flex align-items-center gap-3">

                        <div className="section-icon">

                          <LuEye
                            size={21}
                          />

                        </div>

                        <div>

                          <h5 className="fw-bold mb-1">
                            Notice Details
                          </h5>

                          <small className="text-muted">
                            View complete notice information
                          </small>

                        </div>

                      </div>

                      <button
                        type="button"
                        className="modal-close"
                        onClick={
                          closeViewModal
                        }
                      >

                        <LuX
                          size={18}
                        />

                      </button>

                    </div>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-3 p-md-4">

                  <div className="d-flex align-items-center gap-3 mb-3">

                    <div className="notice-icon">

                      {
                        getCategory(
                          viewingNotice.category
                        ).icon
                      }

                    </div>

                    <div>

                      <h5 className="fw-bold mb-1 text-dark">
                        {
                          viewingNotice.title
                        }

                        {viewingNotice.pinned && (

                          <LuPin
                            size={15}
                            className="ms-2 text-primary"
                          />

                        )}

                      </h5>

                      <small className="text-muted">

                        {
                          getCategory(
                            viewingNotice.category
                          ).label
                        }

                      </small>

                    </div>

                  </div>

                  <div className="row g-3 mb-3">

                    <div className="col-12 col-md-6">

                      <div className="notice-info-box">

                        <small className="text-muted d-block mb-1">
                          Audience
                        </small>

                        <span className="audience-badge">

                          <LuUsers
                            size={13}
                          />

                          {
                            getAudienceLabel(
                              viewingNotice.audience
                            )
                          }

                        </span>

                      </div>

                    </div>

                    <div className="col-12 col-md-6">

                      <div className="notice-info-box">

                        <small className="text-muted d-block mb-1">
                          Priority
                        </small>

                        {viewingNotice.priority ===
                        "HIGH" ? (

                          <span className="priority-high">
                            High
                          </span>

                        ) : (

                          <span className="priority-normal">
                            Normal
                          </span>

                        )}

                      </div>

                    </div>

                    <div className="col-12 col-md-6">

                      <div className="notice-info-box">

                        <small className="text-muted d-block mb-1">
                          Start Date
                        </small>

                        <div className="date-badge">

                          <LuCalendarDays
                            size={14}
                          />

                          {
                            formatDate(
                              viewingNotice.startDate
                            )
                          }

                        </div>

                      </div>

                    </div>

                    <div className="col-12 col-md-6">

                      <div className="notice-info-box">

                        <small className="text-muted d-block mb-1">
                          End Date
                        </small>

                        <div className="date-badge">

                          <LuCalendarDays
                            size={14}
                          />

                          {
                            formatDate(
                              viewingNotice.endDate
                            )
                          }

                        </div>

                      </div>

                    </div>

                    <div className="col-12">

                      <div className="notice-info-box">

                        <small className="text-muted d-block mb-1">
                          Status
                        </small>

                        {viewingNotice.status ===
                        "PUBLISHED" ? (

                          <span className="status-published">

                            <LuCircleCheck
                              size={13}
                            />

                            Published

                          </span>

                        ) : (

                          <span className="status-draft">
                            Draft
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                  <div>

                    <label className="custom-label">
                      Notice Description
                    </label>

                    <div className="view-description">
                      {
                        viewingNotice.description
                      }
                    </div>

                  </div>

                </div>

                {/* FOOTER */}

                <div
                  className="px-3 px-md-4 py-3 d-flex justify-content-end gap-2"
                  style={{
                    borderTop:
                      "1px solid #eef4fc",
                    background:
                      "#fbfdff",
                  }}
                >

                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-3 px-4"
                    onClick={
                      closeViewModal
                    }
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="primary-button d-flex align-items-center"
                    onClick={() => {
                      closeViewModal();
                      handleEdit(
                        viewingNotice
                      );
                    }}
                  >

                    <LuPencil
                      size={16}
                      className="me-1"
                    />

                    Edit Notice

                  </button>

                </div>

              </div>

            </div>

          )}

      </div>
    </>
  );
};

export default NoticeManagement;