// import React, { useEffect, useMemo, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import {
//   LuClock3,
//   LuPlus,
//   LuSearch,
//   LuTrash2,
//   LuPencil,
//   LuRefreshCw,
//   LuCalendarDays,
//   LuSchool,
//   LuBookOpen,
// } from "react-icons/lu";
// import { MdManageSearch, MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";

// const DAYS = [
//   "SUNDAY",
//   "MONDAY",
//   "TUESDAY",
//   "WEDNESDAY",
//   "THURSDAY",
//   "FRIDAY",
//   "SATURDAY",
// ];

// const DAY_ORDER = {
//   SUNDAY: 0,
//   MONDAY: 1,
//   TUESDAY: 2,
//   WEDNESDAY: 3,
//   THURSDAY: 4,
//   FRIDAY: 5,
//   SATURDAY: 6,
// };

// const PeriodManagement = () => {
//   const [schools, setSchools] = useState([]);
//   const {sessions} = useMasters();
//   const [periods, setPeriods] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const [editingId, setEditingId] = useState(null);

//   const [search, setSearch] = useState("");
//   const [schoolFilter, setSchoolFilter] = useState("");
//   const [sessionFilter, setSessionFilter] = useState("");
//   const [dayFilter, setDayFilter] = useState("");

//   const [formData, setFormData] = useState({
//     schoolId: "",
//     academicYear: "",
//     dayOfWeek: "",
//     periodName: "",
//     startTime: "",
//     endTime: "",
//     description: "",
//     active: true,
//   });

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     fetchSchools();
    
//     fetchPeriods();
//   }, []);

//   // =========================================================
//   // FETCH SCHOOLS
//   // =========================================================

//   const fetchSchools = async () => {
//     try {
//       const response = await axiosInstance.get(
//         "/api/school/all"
//       );

//       setSchools(response.data || []);
//     } catch (error) {
//       console.error("School fetch error:", error);
//     }
//   };

 
//   // =========================================================
//   // FETCH PERIODS
//   // =========================================================

//   const fetchPeriods = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         "/api/periods/all"
//       );

//       setPeriods(response.data || []);
//     } catch (error) {
//       console.error("Period fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // HANDLE CHANGE
//   // =========================================================

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };

//   // =========================================================
//   // SUBMIT
//   // =========================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.schoolId ||
//       !formData.academicYear ||
//       !formData.dayOfWeek ||
//       !formData.periodName ||
//       !formData.startTime ||
//       !formData.endTime
//     ) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     if (
//       formData.startTime >=
//       formData.endTime
//     ) {
//       alert(
//         "End time must be greater than start time."
//       );
//       return;
//     }

//     const payload = {
//       schoolId: Number(formData.schoolId),
//       academicYear: formData.academicYear,
//       dayOfWeek: formData.dayOfWeek,
//       periodName: formData.periodName.trim(),
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//       description:
//         formData.description?.trim() || null,
//       active: formData.active,
//     };

//     try {
//       setSaving(true);

//       if (editingId) {
//         await axiosInstance.put(
//           `/api/periods/${editingId}`,
//           payload
//         );

//         alert(
//           "Period updated successfully."
//         );
//       } else {
//         await axiosInstance.post(
//           "/api/periods",
//           payload
//         );

//         alert(
//           "Period created successfully."
//         );
//       }

//       resetForm();
//       fetchPeriods();
//     } catch (error) {
//       console.error(
//         "Period save error:",
//         error
//       );

//       if (error.response?.status === 409) {
//         alert(
//           error.response?.data?.message ||
//             "This period already exists for this school, session and day."
//         );
//       } else {
//         alert(
//           error.response?.data?.message ||
//             "Failed to save period."
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================

//   const handleEdit = (period) => {
//     setEditingId(period.id);

//     setFormData({
//       schoolId:
//         period.schoolId || "",

//       academicYear:
//         period.academicYear ||
//         period.session ||
//         "",

//       dayOfWeek:
//         period.dayOfWeek || "",

//       periodName:
//         period.periodName ||
//         period.name ||
//         "",

//       startTime:
//         period.startTime || "",

//       endTime:
//         period.endTime || "",

//       description:
//         period.description || "",

//       active:
//         period.active === undefined
//           ? true
//           : period.active,
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // =========================================================
//   // DELETE
//   // =========================================================

//   const handleDelete = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this period?"
//       )
//     ) {
//       return;
//     }

//     try {
//       setDeletingId(id);

//       await axiosInstance.delete(
//         `/api/periods/${id}`
//       );

//       setPeriods((prev) =>
//         prev.filter(
//           (item) => item.id !== id
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Delete period error:",
//         error
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete period."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // =========================================================
//   // RESET
//   // =========================================================

//   const resetForm = () => {
//     setEditingId(null);

//     setFormData({
//       schoolId: "",
//       academicYear: "",
//       dayOfWeek: "",
//       periodName: "",
//       startTime: "",
//       endTime: "",
//       description: "",
//       active: true,
//     });
//   };

//   // =========================================================
//   // GET SCHOOL NAME
//   // =========================================================

//   const getSchoolName = (schoolId) => {
//     const school = schools.find(
//       (item) =>
//         Number(item.id) ===
//         Number(schoolId)
//     );

//     return (
//       school?.schoolName ||
//       school?.name ||
//       school?.school_name ||
//       "-"
//     );
//   };


  

//   // =========================================================
//   // FILTER
//   // =========================================================

//   const filteredPeriods = useMemo(() => {
//     const keyword =
//       search.trim().toLowerCase();

//     return [...periods]
//       .filter((item) => {
//         const schoolName =
//           getSchoolName(
//             item.schoolId
//           );

//         const sessionName =
          
//             item.academicYear 
//           ;

//         const searchableText = `
//           ${schoolName}
//           ${sessionName}
//           ${item.dayOfWeek || ""}
//           ${item.periodName || ""}
//           ${item.name || ""}
//           ${item.startTime || ""}
//           ${item.endTime || ""}
//           ${item.description || ""}
//         `.toLowerCase();

//         const searchMatch =
//           !keyword ||
//           searchableText.includes(
//             keyword
//           );

//         const schoolMatch =
//           !schoolFilter ||
//           String(item.schoolId) ===
//             String(schoolFilter);

//         const sessionValue =
//           item.academicYear ||
//           item.session ||
//           "";

//         const sessionMatch =
//           !sessionFilter ||
//           String(sessionValue) ===
//             String(sessionFilter);

//         const dayMatch =
//           !dayFilter ||
//           item.dayOfWeek ===
//             dayFilter;

//         return (
//           searchMatch &&
//           schoolMatch &&
//           sessionMatch &&
//           dayMatch
//         );
//       })
//       .sort((a, b) => {
//         const dayA =
//           DAY_ORDER[
//             a.dayOfWeek
//           ] ?? 99;

//         const dayB =
//           DAY_ORDER[
//             b.dayOfWeek
//           ] ?? 99;

//         if (dayA !== dayB) {
//           return dayA - dayB;
//         }

//         return String(
//           a.startTime || ""
//         ).localeCompare(
//           String(b.startTime || "")
//         );
//       });
//   }, [
//     periods,
//     schools,
//     sessions,
//     search,
//     schoolFilter,
//     sessionFilter,
//     dayFilter,
//   ]);

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <>
//       <style>{`

//         .period-page {
//           background: #f8fbff;
//           min-height: 100vh;
//         }

//         .premium-header {
//           background: linear-gradient(
//             135deg,
//             #ffffff 0%,
//             #f5f9ff 60%,
//             #eaf3ff 100%
//           );

//           border: 1px solid #dbeafe;

//           box-shadow:
//             0 6px 22px
//             rgba(15, 23, 42, 0.07);
//         }

//         .page-title-icon {
//           width: 52px;
//           height: 52px;
//           border-radius: 12px;

//           display: flex;
//           align-items: center;
//           justify-content: center;

//           background: linear-gradient(
//             135deg,
//             #2563eb,
//             #3b82f6
//           );

//           color: white;

//           box-shadow:
//             0 8px 20px
//             rgba(37, 99, 235, .22);
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

//           background: linear-gradient(
//             135deg,
//             #2563eb,
//             #3b82f6
//           );

//           color: white;

//           font-weight: 600;

//           box-shadow:
//             0 6px 15px
//             rgba(37, 99, 235, .20);
//         }

//         .primary-button:hover {
//           color: white;

//           background: linear-gradient(
//             135deg,
//             #1d4ed8,
//             #2563eb
//           );
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .period-table {
//           min-width: 1050px;
//         }

//         .period-table thead th {
//           background: #eff6ff;
//           color: #1e3a8a;

//           font-size: 12px;
//           font-weight: 700;

//           border-bottom:
//             1px solid #dbeafe;

//           padding: 13px 12px;

//           white-space: nowrap;
//         }

//         .period-table tbody td {
//           font-size: 13px;

//           padding: 13px 12px;

//           color: #475569;

//           border-bottom:
//             1px solid #eef4fc;

//           vertical-align: middle;

//           white-space: nowrap;
//         }

//         .period-table tbody tr:hover {
//           background: #f8fbff;
//         }

//         .day-badge {
//           display: inline-flex;

//           align-items: center;
//           gap: 5px;

//           padding: 6px 10px;

//           border-radius: 8px;

//           background: #eff6ff;

//           color: #2563eb;

//           border: 1px solid #bfdbfe;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .session-badge {
//           display: inline-flex;

//           align-items: center;

//           padding: 6px 10px;

//           border-radius: 8px;

//           background: #f8fafc;

//           color: #334155;

//           border: 1px solid #e2e8f0;

//           font-size: 11px;

//           font-weight: 600;
//         }

//         .status-active {
//           display: inline-flex;

//           align-items: center;

//           padding: 5px 9px;

//           border-radius: 8px;

//           background: #ecfdf5;

//           color: #059669;

//           border: 1px solid #a7f3d0;

//           font-size: 11px;

//           font-weight: 700;
//         }

//         .status-inactive {
//           display: inline-flex;

//           align-items: center;

//           padding: 5px 9px;

//           border-radius: 8px;

//           background: #f8fafc;

//           color: #64748b;

//           border: 1px solid #e2e8f0;

//           font-size: 11px;

//           font-weight: 700;
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

//         .action-button {
//           width: 34px;
//           height: 34px;

//           border-radius: 9px;

//           display: inline-flex;

//           align-items: center;
//           justify-content: center;
//         }

//         @media (max-width: 767px) {

//           .search-box {
//             width: 100%;
//           }

//         }

//       `}</style>

     

//         {/* =====================================================
//             PAGE HEADER
//         ====================================================== */}

       

//         <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <MdManageSearch size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">Period Management</h5>

//                   <div className="text-muted small">
//                     Setup &nbsp;/ &nbsp; Period Management
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   Setup
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Period Management
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//         {/* =====================================================
//             FORM
//         ====================================================== */}

//         <div className="mx-2 mb-3">

//           <div className="section-card shadow">

//             <div className="p-3 p-md-4">

//               <div className="d-flex align-items-center gap-3 mb-4">

//                 <div className="section-icon">
//                   <LuPlus size={21} />
//                 </div>

//                 <div>

//                   <h6 className="mb-1 fw-bold">
//                     {editingId
//                       ? "Update Period"
//                       : "Create Period"}
//                   </h6>

//                   <small className="text-muted">
//                     Configure period according
//                     to school, session and day
//                   </small>

//                 </div>

//               </div>

//               <form onSubmit={handleSubmit}>

//                 <div className="row g-3">

//                   {/* SCHOOL */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       School{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <div className="input-group">

//                       <span
//                         className="input-group-text"
//                         style={{
//                           border:
//                             "1px solid #dbeafe",
//                           borderRight: 0,
//                           background:
//                             "#f8fbff",
//                           borderRadius:
//                             "12px 0 0 12px",
//                         }}
//                       >
//                         <LuSchool
//                           size={16}
//                           color="#2563eb"
//                         />
//                       </span>

//                       <select
//                         name="schoolId"
//                         value={
//                           formData.schoolId
//                         }
//                         onChange={
//                           handleChange
//                         }
//                         className="form-select custom-control"
//                         style={{
//                           borderRadius:
//                             "0 12px 12px 0",
//                         }}
//                       >

//                         <option value="">
//                           Select School
//                         </option>

//                         {schools.map(
//                           (school) => (
//                             <option
//                               key={school.id}
//                               value={
//                                 school.id
//                               }
//                             >
//                               {school.schoolName ||
//                                 school.name ||
//                                 school.school_name}
//                             </option>
//                           )
//                         )}

//                       </select>

//                     </div>

//                   </div>

//                   {/* SESSION */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       Academic Session{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <div className="input-group">

//                       <span
//                         className="input-group-text"
//                         style={{
//                           border:
//                             "1px solid #dbeafe",
//                           borderRight: 0,
//                           background:
//                             "#f8fbff",
//                           borderRadius:
//                             "12px 0 0 12px",
//                         }}
//                       >
//                         <LuBookOpen
//                           size={16}
//                           color="#2563eb"
//                         />
//                       </span>

//                       <select
//                         name="academicYear"
//                         value={
//                           formData.academicYear
//                         }
//                         onChange={
//                           handleChange
//                         }
//                         className="form-select custom-control"
//                         style={{
//                           borderRadius:
//                             "0 12px 12px 0",
//                         }}
//                       >

//                         <option value="">
//                           Select Session
//                         </option>

//                         {sessions.map((item)=>(
//                             <option key={item} value={item}>
//                               {item}
//                             </option>
//                         ))}

//                       </select>

//                     </div>

//                   </div>

//                   {/* DAY */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       Day{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <div className="input-group">

//                       <span
//                         className="input-group-text"
//                         style={{
//                           border:
//                             "1px solid #dbeafe",
//                           borderRight: 0,
//                           background:
//                             "#f8fbff",
//                           borderRadius:
//                             "12px 0 0 12px",
//                         }}
//                       >
//                         <LuCalendarDays
//                           size={16}
//                           color="#2563eb"
//                         />
//                       </span>

//                       <select
//                         name="dayOfWeek"
//                         value={
//                           formData.dayOfWeek
//                         }
//                         onChange={
//                           handleChange
//                         }
//                         className="form-select custom-control"
//                         style={{
//                           borderRadius:
//                             "0 12px 12px 0",
//                         }}
//                       >

//                         <option value="">
//                           Select Day
//                         </option>

//                         {DAYS.map(
//                           (day) => (
//                             <option
//                               key={day}
//                               value={day}
//                             >
//                               {day}
//                             </option>
//                           )
//                         )}

//                       </select>

//                     </div>

//                   </div>

//                   {/* PERIOD NAME */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       Period Name{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="text"
//                       name="periodName"
//                       value={
//                         formData.periodName
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control custom-control"
//                       placeholder="e.g. Period 1"
//                     />

//                   </div>

//                   {/* START */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       Start Time{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="time"
//                       name="startTime"
//                       value={
//                         formData.startTime
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control custom-control"
//                     />

//                   </div>

//                   {/* END */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       End Time{" "}
//                       <span className="text-danger">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       type="time"
//                       name="endTime"
//                       value={
//                         formData.endTime
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control custom-control"
//                     />

//                   </div>

//                   {/* DESCRIPTION */}

//                   <div className="col-12 col-md-6 col-lg-4">

//                     <label className="custom-label">
//                       Description
//                     </label>

//                     <input
//                       type="text"
//                       name="description"
//                       value={
//                         formData.description
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className="form-control custom-control"
//                       placeholder="Optional"
//                     />

//                   </div>

//                   {/* ACTIVE */}

//                   <div className="col-12">

//                     <div className="form-check">

//                       <input
//                         type="checkbox"
//                         id="periodActive"
//                         name="active"
//                         checked={
//                           formData.active
//                         }
//                         onChange={
//                           handleChange
//                         }
//                         className="form-check-input"
//                       />

//                       <label
//                         htmlFor="periodActive"
//                         className="form-check-label"
//                       >
//                         Active
//                       </label>

//                     </div>

//                   </div>

//                   {/* BUTTON */}

//                   <div className="col-12 d-flex justify-content-end gap-2 mt-2">

//                     {editingId && (
//                       <button
//                         type="button"
//                         className="btn btn-outline-secondary rounded-3 px-3"
//                         onClick={
//                           resetForm
//                         }
//                       >
//                         Cancel
//                       </button>
//                     )}

//                     <button
//                       type="submit"
//                       className="primary-button"
//                       disabled={saving}
//                     >

//                       {saving ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <LuPlus
//                             size={17}
//                             className="me-1"
//                           />

//                           {editingId
//                             ? "Update Period"
//                             : "Create Period"}
//                         </>
//                       )}

//                     </button>

//                   </div>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             PERIOD LIST
//         ====================================================== */}

//         <div className="mx-2">

//           <div className="section-card shadow">

//             <div className="p-3 p-md-4">

//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="section-icon">
//                     <LuClock3 size={21} />
//                   </div>

//                   <div>

//                     <h6 className="mb-1 fw-bold">
//                       Period List
//                     </h6>

//                     <small className="text-muted">
//                       School and session wise
//                       weekly periods
//                     </small>

//                   </div>

//                 </div>

//                 <div className="d-flex gap-2 flex-wrap">

//                   {/* SEARCH */}

//                   <div className="search-box">

//                     <LuSearch size={17} />

//                     <input
//                       type="text"
//                       className="form-control custom-control"
//                       placeholder="Search period..."
//                       value={search}
//                       onChange={(e) =>
//                         setSearch(
//                           e.target.value
//                         )
//                       }
//                     />

//                   </div>

//                   {/* SCHOOL */}

//                   <select
//                     className="form-select custom-control"
//                     style={{
//                       width: "190px",
//                     }}
//                     value={
//                       schoolFilter
//                     }
//                     onChange={(e) =>
//                       setSchoolFilter(
//                         e.target.value
//                       )
//                     }
//                   >

//                     <option value="">
//                       All Schools
//                     </option>

//                     {schools.map(
//                       (school) => (
//                         <option
//                           key={school.id}
//                           value={
//                             school.id
//                           }
//                         >
//                           {school.schoolName ||
//                             school.name ||
//                             school.school_name}
//                         </option>
//                       )
//                     )}

//                   </select>

//                   {/* SESSION */}

//                   <select
//                     className="form-select custom-control"
//                     style={{
//                       width: "170px",
//                     }}
//                     value={
//                       sessionFilter
//                     }
//                     onChange={(e) =>
//                       setSessionFilter(
//                         e.target.value
//                       )
//                     }
//                   >

//                     <option value="">
//                       All Sessions
//                     </option>

//                     {sessions.map(
//                       (session) => {

//                         const value =
//                           session.academicYear ||
//                           session.sessionName ||
//                           session.name ||
//                           session.session ||
//                           session.year;

//                         return (
//                           <option
//                             key={
//                               session.id ||
//                               value
//                             }
//                             value={value}
//                           >
//                             {value}
//                           </option>
//                         );
//                       }
//                     )}

//                   </select>

//                   {/* DAY */}

//                   <select
//                     className="form-select custom-control"
//                     style={{
//                       width: "160px",
//                     }}
//                     value={
//                       dayFilter
//                     }
//                     onChange={(e) =>
//                       setDayFilter(
//                         e.target.value
//                       )
//                     }
//                   >

//                     <option value="">
//                       All Days
//                     </option>

//                     {DAYS.map(
//                       (day) => (
//                         <option
//                           key={day}
//                           value={day}
//                         >
//                           {day}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>

//               </div>

//               {/* TABLE */}

//               {loading ? (

//                 <div className="text-center py-5">

//                   <span className="spinner-border spinner-border-sm text-primary me-2" />

//                   <span className="text-muted">
//                     Loading periods...
//                   </span>

//                 </div>

//               ) : (

//                 <div className="table-wrapper">

//                   <table className="table period-table align-middle">

//                     <thead>

//                       <tr>

//                         <th>School</th>
//                         <th>Session</th>
//                         <th>Day</th>
//                         <th>Period</th>
//                         <th>Start Time</th>
//                         <th>End Time</th>
//                         <th>Description</th>
//                         <th>Status</th>
//                         <th>Action</th>

//                       </tr>

//                     </thead>

//                     <tbody>

//                       {filteredPeriods.length === 0 ? (

//                         <tr>

//                           <td
//                             colSpan="9"
//                             className="text-center py-5 text-muted"
//                           >
//                             No periods found.
//                           </td>

//                         </tr>

//                       ) : (

//                         filteredPeriods.map(
//                           (period) => (

//                             <tr
//                               key={
//                                 period.id
//                               }
//                             >

//                               <td>

//                                 <span className="fw-semibold text-dark">

//                                   {getSchoolName(
//                                     period.schoolId
//                                   )}

//                                 </span>

//                               </td>

//                               <td>

//                                 <span className="session-badge">

//                                   {
//                                     period.academicYear 
//                                   }

//                                 </span>

//                               </td>

//                               <td>

//                                 <span className="day-badge">

//                                   <LuCalendarDays
//                                     size={13}
//                                   />

//                                   {
//                                     period.dayOfWeek
//                                   }

//                                 </span>

//                               </td>

//                               <td>

//                                 <span className="fw-semibold text-dark">

//                                   {period.periodName ||
//                                     period.name ||
//                                     "-"}

//                                 </span>

//                               </td>

//                               <td>
//                                 {
//                                   period.startTime ||
//                                   "-"
//                                 }
//                               </td>

//                               <td>
//                                 {
//                                   period.endTime ||
//                                   "-"
//                                 }
//                               </td>

//                               <td>
//                                 {
//                                   period.description ||
//                                   "-"
//                                 }
//                               </td>

//                               <td>

//                                 {period.active ===
//                                 false ? (

//                                   <span className="status-inactive">
//                                     INACTIVE
//                                   </span>

//                                 ) : (

//                                   <span className="status-active">
//                                     ACTIVE
//                                   </span>

//                                 )}

//                               </td>

//                               <td>

//                                 <div className="d-flex gap-2">

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-primary action-button"
//                                     title="Edit"
//                                     onClick={() =>
//                                       handleEdit(
//                                         period
//                                       )
//                                     }
//                                   >
//                                     <LuPencil
//                                       size={15}
//                                     />
//                                   </button>

//                                   <button
//                                     type="button"
//                                     className="btn btn-sm btn-outline-danger action-button"
//                                     title="Delete"
//                                     disabled={
//                                       deletingId ===
//                                       period.id
//                                     }
//                                     onClick={() =>
//                                       handleDelete(
//                                         period.id
//                                       )
//                                     }
//                                   >

//                                     {deletingId ===
//                                     period.id ? (

//                                       <span className="spinner-border spinner-border-sm" />

//                                     ) : (

//                                       <LuTrash2
//                                         size={15}
//                                       />

//                                     )}

//                                   </button>

//                                 </div>

//                               </td>

//                             </tr>

//                           )
//                         )

//                       )}

//                     </tbody>

//                   </table>

//                 </div>

//               )}

//             </div>

//           </div>

//         </div>

     
//     </>
//   );
// };

// export default PeriodManagement;

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axiosInstance from "../../api/axiosInstance";

import {
  LuClock3,
  LuPlus,
  LuSearch,
  LuTrash2,
  LuRefreshCw,
  LuCalendarDays,
  LuSchool,
  LuBookOpen,
  LuCircleCheck,
} from "react-icons/lu";

import {
  MdManageSearch,
  MdOutlineSchool,
} from "react-icons/md";

import useMasters from "../../hooks/useMasters";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const DAY_ORDER = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const createEmptyPeriod = () => ({
  id: null,
  periodName: "",
  startTime: "",
  endTime: "",
  description: "",
  active: true,
});

const PeriodManagement = () => {

  const [schools, setSchools] = useState([]);

  const { sessions } = useMasters();

  const [periods, setPeriods] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [loadingDay, setLoadingDay] = useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [search, setSearch] = useState("");

  const [schoolFilter, setSchoolFilter] =
    useState("");

  const [sessionFilter, setSessionFilter] =
    useState("");

  const [dayFilter, setDayFilter] =
    useState("");

  const [formData, setFormData] = useState({
    schoolId: "",
    academicYear: "",
    dayOfWeek: "",
  });

  const [periodRows, setPeriodRows] =
    useState([
      createEmptyPeriod(),
    ]);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    fetchSchools();

    fetchPeriods();

  }, []);

  // =========================================================
  // FETCH SCHOOLS
  // =========================================================

  const fetchSchools = async () => {

    try {

      const response =
        await axiosInstance.get(
          "/api/school/all"
        );

      setSchools(
        response.data || []
      );

    } catch (error) {

      console.error(
        "School fetch error:",
        error
      );

      alert(
        "Failed to load schools."
      );
    }
  };

  // =========================================================
  // FETCH ALL PERIODS
  // =========================================================

  const fetchPeriods = async () => {

    try {

      setLoading(true);

      const response =
        await axiosInstance.get(
          "/api/periods/all"
        );

      setPeriods(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Period fetch error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  // =========================================================
  // PERIOD ROW CHANGE
  // =========================================================

  const handlePeriodChange = (
    index,
    field,
    value
  ) => {

    setPeriodRows(
      (prev) =>
        prev.map(
          (row, rowIndex) =>
            rowIndex === index
              ? {
                  ...row,
                  [field]: value,
                }
              : row
        )
    );
  };

  // =========================================================
  // ADD PERIOD ROW
  // =========================================================

  const addPeriodRow = () => {

    setPeriodRows(
      (prev) => [
        ...prev,
        createEmptyPeriod(),
      ]
    );
  };

  // =========================================================
  // REMOVE PERIOD ROW
  // =========================================================

  const removePeriodRow = (
    index
  ) => {

    if (periodRows.length === 1) {

      alert(
        "At least one period is required."
      );

      return;
    }

    setPeriodRows(
      (prev) =>
        prev.filter(
          (_, rowIndex) =>
            rowIndex !== index
        )
    );
  };

  // =========================================================
  // LOAD SELECTED DAY
  // =========================================================

  const loadSelectedDayPeriods =
    async (
      schoolId =
        formData.schoolId,
      academicYear =
        formData.academicYear,
      dayOfWeek =
        formData.dayOfWeek
    ) => {

      if (
        !schoolId ||
        !academicYear ||
        !dayOfWeek
      ) {

        setPeriodRows([
          createEmptyPeriod(),
        ]);

        return;
      }

      try {

        setLoadingDay(true);

        const response =
          await axiosInstance.get(
            `/api/periods/school/${schoolId}/session/day`,
            {
              params: {
                academicYear,
                dayOfWeek,
              },
            }
          );

        const existing =
          response.data || [];

        if (existing.length === 0) {

          setPeriodRows([
            createEmptyPeriod(),
          ]);

        } else {

          setPeriodRows(
            existing.map(
              (period) => ({
                id:
                  period.id ||
                  null,

                periodName:
                  period.periodName ||
                  "",

                startTime:
                  period.startTime
                    ? String(
                        period.startTime
                      ).substring(0, 5)
                    : "",

                endTime:
                  period.endTime
                    ? String(
                        period.endTime
                      ).substring(0, 5)
                    : "",

                description:
                  period.description ||
                  "",

                active:
                  period.active ===
                  undefined
                    ? true
                    : period.active,
              })
            )
          );
        }

      } catch (error) {

        console.error(
          "Load day periods error:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to load periods for selected day."
        );

        setPeriodRows([
          createEmptyPeriod(),
        ]);

      } finally {

        setLoadingDay(false);
      }
    };

  // =========================================================
  // SCHOOL / SESSION / DAY CHANGE
  // =========================================================

  useEffect(() => {

    if (
      formData.schoolId &&
      formData.academicYear &&
      formData.dayOfWeek
    ) {

      loadSelectedDayPeriods();

    }

  }, [
    formData.schoolId,
    formData.academicYear,
    formData.dayOfWeek,
  ]);

  // =========================================================
  // VALIDATE FRONTEND
  // =========================================================

  const validateRows = () => {

    const names = new Set();

    for (
      let i = 0;
      i < periodRows.length;
      i++
    ) {

      const row =
        periodRows[i];

      if (
        !row.periodName.trim()
      ) {

        alert(
          `Please enter period name for row ${
            i + 1
          }.`
        );

        return false;
      }

      if (!row.startTime) {

        alert(
          `Please select start time for ${
            row.periodName ||
            `row ${i + 1}`
          }.`
        );

        return false;
      }

      if (!row.endTime) {

        alert(
          `Please select end time for ${
            row.periodName ||
            `row ${i + 1}`
          }.`
        );

        return false;
      }

      if (
        row.startTime >=
        row.endTime
      ) {

        alert(
          `End time must be greater than start time for ${row.periodName}.`
        );

        return false;
      }

      const normalizedName =
        row.periodName
          .trim()
          .toLowerCase();

      if (
        names.has(
          normalizedName
        )
      ) {

        alert(
          `Duplicate period name: ${row.periodName}`
        );

        return false;
      }

      names.add(
        normalizedName
      );
    }

    // =======================================================
    // OVERLAP CHECK
    // =======================================================

    const sorted =
      [...periodRows].sort(
        (a, b) =>
          a.startTime.localeCompare(
            b.startTime
          )
      );

    for (
      let i = 0;
      i < sorted.length - 1;
      i++
    ) {

      const current =
        sorted[i];

      const next =
        sorted[i + 1];

      if (
        current.endTime >
        next.startTime
      ) {

        alert(
          `Time overlap between ${current.periodName} and ${next.periodName}.`
        );

        return false;
      }
    }

    return true;
  };

  // =========================================================
  // SAVE DAY PERIODS
  // =========================================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !formData.schoolId ||
      !formData.academicYear ||
      !formData.dayOfWeek
    ) {

      alert(
        "Please select School, Academic Session and Day."
      );

      return;
    }

    if (!validateRows()) {

      return;
    }

    const payload = {

      schoolId:
        Number(
          formData.schoolId
        ),

      academicYear:
        formData.academicYear,

      dayOfWeek:
        formData.dayOfWeek,

      periods:
        periodRows.map(
          (row) => ({
            id:
              row.id || null,

            periodName:
              row.periodName.trim(),

            startTime:
              row.startTime,

            endTime:
              row.endTime,

            description:
              row.description?.trim() ||
              null,

            active:
              row.active !== false,
          })
        ),
    };

    try {

      setSaving(true);

      await axiosInstance.post(
        "/api/periods/day-bulk",
        payload
      );

      alert(
        `${formData.dayOfWeek} periods saved successfully.`
      );

      await loadSelectedDayPeriods();

      await fetchPeriods();

    } catch (error) {

      console.error(
        "Bulk period save error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save day periods."
      );

    } finally {

      setSaving(false);
    }
  };

  // =========================================================
  // DELETE FROM TABLE
  // =========================================================

  const handleDelete = async (
    id
  ) => {

    if (!id) {

      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this period?"
      )
    ) {

      return;
    }

    try {

      setDeletingId(id);

      await axiosInstance.delete(
        `/api/periods/${id}`
      );

      setPeriods(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

      // If deleted period belongs
      // to current selected day,
      // reload form rows.

      if (
        formData.schoolId &&
        formData.academicYear &&
        formData.dayOfWeek
      ) {

        await loadSelectedDayPeriods();
      }

    } catch (error) {

      console.error(
        "Delete period error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete period."
      );

    } finally {

      setDeletingId(null);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {

    setFormData({
      schoolId: "",
      academicYear: "",
      dayOfWeek: "",
    });

    setPeriodRows([
      createEmptyPeriod(),
    ]);
  };

  // =========================================================
  // SCHOOL NAME
  // =========================================================

  const getSchoolName = (
    schoolId
  ) => {

    const school =
      schools.find(
        (item) =>
          Number(item.id) ===
          Number(schoolId)
      );

    return (
      school?.schoolName ||
      school?.name ||
      school?.school_name ||
      "-"
    );
  };

  // =========================================================
  // FILTERED PERIODS
  // =========================================================

  const filteredPeriods =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();

      return [...periods]
        .filter((item) => {

          const schoolName =
            getSchoolName(
              item.schoolId
            );

          const sessionName =
            item.academicYear ||
            item.session ||
            "";

          const searchableText = `
            ${schoolName}
            ${sessionName}
            ${item.dayOfWeek || ""}
            ${item.periodName || ""}
            ${item.startTime || ""}
            ${item.endTime || ""}
            ${item.description || ""}
          `.toLowerCase();

          const searchMatch =
            !keyword ||
            searchableText.includes(
              keyword
            );

          const schoolMatch =
            !schoolFilter ||
            String(
              item.schoolId
            ) ===
              String(
                schoolFilter
              );

          const sessionValue =
            item.academicYear ||
            item.session ||
            "";

          const sessionMatch =
            !sessionFilter ||
            String(
              sessionValue
            ) ===
              String(
                sessionFilter
              );

          const dayMatch =
            !dayFilter ||
            item.dayOfWeek ===
              dayFilter;

          return (
            searchMatch &&
            schoolMatch &&
            sessionMatch &&
            dayMatch
          );
        })
        .sort((a, b) => {

          const dayA =
            DAY_ORDER[
              a.dayOfWeek
            ] ?? 99;

          const dayB =
            DAY_ORDER[
              b.dayOfWeek
            ] ?? 99;

          if (
            dayA !== dayB
          ) {

            return (
              dayA - dayB
            );
          }

          return String(
            a.startTime || ""
          ).localeCompare(
            String(
              b.startTime || ""
            )
          );
        });

    }, [
      periods,
      schools,
      sessions,
      search,
      schoolFilter,
      sessionFilter,
      dayFilter,
    ]);

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <style>{`

        .period-page {
          background: #f8fbff;
          min-height: 100vh;
        }

        .premium-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );

          border: 1px solid #dbeafe;

          box-shadow:
            0 6px 22px
            rgba(15, 23, 42, 0.07);
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

          background: linear-gradient(
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

          background: linear-gradient(
            135deg,
            #1d4ed8,
            #2563eb
          );
        }

        .primary-button:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .add-period-button {
          width: 40px;
          height: 40px;

          border: 0;
          border-radius: 11px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );

          color: #fff;

          box-shadow:
            0 5px 14px
            rgba(37,99,235,.20);
        }

        .add-period-button:hover {
          background: linear-gradient(
            135deg,
            #1d4ed8,
            #2563eb
          );

          color: #fff;
        }

        .remove-period-button {
          width: 40px;
          height: 40px;

          border-radius: 11px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .period-row {
          padding: 14px;

          border: 1px solid #e5effc;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #fafdff
            );

          transition: .2s ease;
        }

        .period-row:hover {
          border-color: #bfdbfe;

          box-shadow:
            0 5px 18px
            rgba(37,99,235,.06);
        }

        .row-number {
          width: 30px;
          height: 30px;

          border-radius: 9px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          background: #eff6ff;

          color: #2563eb;

          border: 1px solid #bfdbfe;

          font-size: 12px;
          font-weight: 700;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .period-table {
          min-width: 1050px;
        }

        .period-table thead th {
          background: #eff6ff;
          color: #1e3a8a;

          font-size: 12px;
          font-weight: 700;

          border-bottom:
            1px solid #dbeafe;

          padding: 13px 12px;

          white-space: nowrap;
        }

        .period-table tbody td {
          font-size: 13px;

          padding: 13px 12px;

          color: #475569;

          border-bottom:
            1px solid #eef4fc;

          vertical-align: middle;

          white-space: nowrap;
        }

        .period-table tbody tr:hover {
          background: #f8fbff;
        }

        .day-badge {
          display: inline-flex;

          align-items: center;
          gap: 5px;

          padding: 6px 10px;

          border-radius: 8px;

          background: #eff6ff;

          color: #2563eb;

          border: 1px solid #bfdbfe;

          font-size: 11px;

          font-weight: 700;
        }

        .session-badge {
          display: inline-flex;

          align-items: center;

          padding: 6px 10px;

          border-radius: 8px;

          background: #f8fafc;

          color: #334155;

          border: 1px solid #e2e8f0;

          font-size: 11px;

          font-weight: 600;
        }

        .status-active {
          display: inline-flex;

          align-items: center;

          padding: 5px 9px;

          border-radius: 8px;

          background: #ecfdf5;

          color: #059669;

          border: 1px solid #a7f3d0;

          font-size: 11px;

          font-weight: 700;
        }

        .status-inactive {
          display: inline-flex;

          align-items: center;

          padding: 5px 9px;

          border-radius: 8px;

          background: #f8fafc;

          color: #64748b;

          border: 1px solid #e2e8f0;

          font-size: 11px;

          font-weight: 700;
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

        .action-button {
          width: 34px;
          height: 34px;

          border-radius: 9px;

          display: inline-flex;

          align-items: center;
          justify-content: center;
        }

        .selected-day-info {
          padding: 12px 14px;

          border-radius: 12px;

          background: #eff6ff;

          border: 1px solid #bfdbfe;

          color: #1e3a8a;

          font-size: 13px;
        }

        @media (max-width: 767px) {

          .search-box {
            width: 100%;
          }

          .period-row {
            padding: 12px;
          }

        }

      `}</style>

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
                    Period Management
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; Period Management
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
                Period Management
              </span>

            </small>
          </div>

        </div>

      </div>

      {/* =====================================================
          BULK DAY SETUP
      ====================================================== */}

      <div className="mx-2 mb-3">

        <div className="section-card">

          <div className="p-3 p-md-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">

                  <LuPlus
                    size={21}
                  />

                </div>

                <div>

                  <h6 className="mb-1 fw-bold">
                    Day-wise Period Setup
                  </h6>

                  <small className="text-muted">
                    Add multiple periods and save the complete day in one click
                  </small>

                </div>

              </div>

              {loadingDay && (

                <span className="text-primary small">

                  <span className="spinner-border spinner-border-sm me-2" />

                  Loading day periods...

                </span>

              )}

            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* SCHOOL / SESSION / DAY */}

              <div className="row g-3 mb-4">

                {/* SCHOOL */}

                <div className="col-12 col-md-6 col-lg-4">

                  <label className="custom-label">

                    School{" "}

                    <span className="text-danger">
                      *
                    </span>

                  </label>

                  <div className="input-group">

                    <span
                      className="input-group-text"
                      style={{
                        border:
                          "1px solid #dbeafe",
                        borderRight: 0,
                        background:
                          "#f8fbff",
                        borderRadius:
                          "12px 0 0 12px",
                      }}
                    >
                      <LuSchool
                        size={16}
                        color="#2563eb"
                      />
                    </span>

                    <select
                      name="schoolId"
                      value={
                        formData.schoolId
                      }
                      onChange={
                        handleFormChange
                      }
                      className="form-select custom-control"
                      style={{
                        borderRadius:
                          "0 12px 12px 0",
                      }}
                    >

                      <option value="">
                        Select School
                      </option>

                      {schools.map(
                        (school) => (

                          <option
                            key={
                              school.id
                            }
                            value={
                              school.id
                            }
                          >

                            {
                              school.schoolName ||
                              school.name ||
                              school.school_name
                            }

                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* SESSION */}

                <div className="col-12 col-md-6 col-lg-4">

                  <label className="custom-label">

                    Academic Session{" "}

                    <span className="text-danger">
                      *
                    </span>

                  </label>

                  <div className="input-group">

                    <span
                      className="input-group-text"
                      style={{
                        border:
                          "1px solid #dbeafe",
                        borderRight: 0,
                        background:
                          "#f8fbff",
                        borderRadius:
                          "12px 0 0 12px",
                      }}
                    >

                      <LuBookOpen
                        size={16}
                        color="#2563eb"
                      />

                    </span>

                    <select
                      name="academicYear"
                      value={
                        formData.academicYear
                      }
                      onChange={
                        handleFormChange
                      }
                      className="form-select custom-control"
                      style={{
                        borderRadius:
                          "0 12px 12px 0",
                      }}
                    >

                      <option value="">
                        Select Session
                      </option>

                      {sessions.map(
                        (item) => {

                          const value =
                            typeof item ===
                            "string"
                              ? item
                              : item.academicYear ||
                                item.sessionName ||
                                item.name ||
                                item.session ||
                                item.year ||
                                "";

                          if (!value) {
                            return null;
                          }

                          return (
                            <option
                              key={
                                typeof item ===
                                "string"
                                  ? item
                                  : item.id ||
                                    value
                              }
                              value={value}
                            >
                              {value}
                            </option>
                          );
                        }
                      )}

                    </select>

                  </div>

                </div>

                {/* DAY */}

                <div className="col-12 col-md-6 col-lg-4">

                  <label className="custom-label">

                    Day{" "}

                    <span className="text-danger">
                      *
                    </span>

                  </label>

                  <div className="input-group">

                    <span
                      className="input-group-text"
                      style={{
                        border:
                          "1px solid #dbeafe",
                        borderRight: 0,
                        background:
                          "#f8fbff",
                        borderRadius:
                          "12px 0 0 12px",
                      }}
                    >

                      <LuCalendarDays
                        size={16}
                        color="#2563eb"
                      />

                    </span>

                    <select
                      name="dayOfWeek"
                      value={
                        formData.dayOfWeek
                      }
                      onChange={
                        handleFormChange
                      }
                      className="form-select custom-control"
                      style={{
                        borderRadius:
                          "0 12px 12px 0",
                      }}
                    >

                      <option value="">
                        Select Day
                      </option>

                      {DAYS.map(
                        (day) => (

                          <option
                            key={day}
                            value={day}
                          >
                            {day}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

              {/* SELECTED DAY INFO */}

              {formData.dayOfWeek && (

                <div className="selected-day-info mb-3">

                  <LuCalendarDays
                    size={16}
                    className="me-2"
                  />

                  Configuring periods for{" "}

                  <strong>
                    {formData.dayOfWeek}
                  </strong>

                  {" "} — {formData.academicYear}

                </div>

              )}

              {/* PERIOD ROWS */}

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                  <h6 className="mb-1 fw-bold">
                    Periods
                  </h6>

                  <small className="text-muted">
                    Add as many periods as required
                  </small>

                </div>

                <button
                  type="button"
                  className="add-period-button"
                  onClick={
                    addPeriodRow
                  }
                  title="Add Period"
                >

                  <LuPlus
                    size={20}
                  />

                </button>

              </div>

              <div className="d-flex flex-column gap-3">

                {periodRows.map(
                  (
                    row,
                    index
                  ) => (

                    <div
                      className="period-row"
                      key={
                        row.id ||
                        `new-${index}`
                      }
                    >

                      <div className="row g-3 align-items-end">

                        {/* NUMBER */}

                        <div className="col-auto">

                          <div className="custom-label">
                            #
                          </div>

                          <span className="row-number">
                            {index + 1}
                          </span>

                        </div>

                        {/* NAME */}

                        <div className="col-12 col-md-6 col-lg">

                          <label className="custom-label">
                            Period Name{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            value={
                              row.periodName
                            }
                            onChange={(e) =>
                              handlePeriodChange(
                                index,
                                "periodName",
                                e.target.value
                              )
                            }
                            className="form-control custom-control"
                            placeholder="e.g. Period 1"
                          />

                        </div>

                        {/* START */}

                        <div className="col-12 col-md-6 col-lg">

                          <label className="custom-label">
                            Start Time{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

                          <input
                            type="time"
                            value={
                              row.startTime
                            }
                            onChange={(e) =>
                              handlePeriodChange(
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="form-control custom-control"
                          />

                        </div>

                        {/* END */}

                        <div className="col-12 col-md-6 col-lg">

                          <label className="custom-label">
                            End Time{" "}
                            <span className="text-danger">
                              *
                            </span>
                          </label>

                          <input
                            type="time"
                            value={
                              row.endTime
                            }
                            onChange={(e) =>
                              handlePeriodChange(
                                index,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="form-control custom-control"
                          />

                        </div>

                        {/* DESCRIPTION */}

                        <div className="col-12 col-md-6 col-lg">

                          <label className="custom-label">
                            Description
                          </label>

                          <input
                            type="text"
                            value={
                              row.description
                            }
                            onChange={(e) =>
                              handlePeriodChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="form-control custom-control"
                            placeholder="Optional"
                          />

                        </div>

                        {/* ACTIVE */}

                        <div className="col-auto">

                          <label className="custom-label">
                            Status
                          </label>

                          <div className="form-check pt-2">

                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                row.active
                              }
                              onChange={(e) =>
                                handlePeriodChange(
                                  index,
                                  "active",
                                  e.target.checked
                                )
                              }
                              id={`active-${index}`}
                            />

                            <label
                              className="form-check-label small"
                              htmlFor={`active-${index}`}
                            >
                              Active
                            </label>

                          </div>

                        </div>

                        {/* REMOVE */}

                        <div className="col-auto">

                          <label className="custom-label">
                            Action
                          </label>

                          <button
                            type="button"
                            className="btn btn-outline-danger remove-period-button"
                            onClick={() =>
                              removePeriodRow(
                                index
                              )
                            }
                            title="Remove Period"
                          >

                            <LuTrash2
                              size={16}
                            />

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* BOTTOM ACTION */}

              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">

                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-3"
                  onClick={
                    resetForm
                  }
                  disabled={saving}
                >

                  Reset

                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    saving ||
                    loadingDay
                  }
                >

                  {saving ? (

                    <>
                      <span className="spinner-border spinner-border-sm me-2" />

                      Saving Day Periods...
                    </>

                  ) : (

                    <>
                      <LuCircleCheck
                        size={17}
                        className="me-1"
                      />

                      Save Day Periods
                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

      {/* =====================================================
          PERIOD LIST
      ====================================================== */}

      <div className="mx-2 mb-3">

        <div className="section-card">

          <div className="p-3 p-md-4">

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">

              <div className="d-flex align-items-center gap-3">

                <div className="section-icon">

                  <LuClock3
                    size={21}
                  />

                </div>

                <div>

                  <h6 className="mb-1 fw-bold">
                    Period List
                  </h6>

                  <small className="text-muted">
                    School and session wise weekly periods
                  </small>

                </div>

              </div>

              <button
                type="button"
                className="btn btn-outline-primary rounded-3"
                onClick={
                  fetchPeriods
                }
              >

                <LuRefreshCw
                  size={15}
                  className="me-1"
                />

                Refresh

              </button>

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
                  placeholder="Search period..."
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

              {/* SCHOOL */}

              <select
                className="form-select custom-control"
                style={{
                  width: "190px",
                }}
                value={
                  schoolFilter
                }
                onChange={(e) =>
                  setSchoolFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Schools
                </option>

                {schools.map(
                  (school) => (

                    <option
                      key={
                        school.id
                      }
                      value={
                        school.id
                      }
                    >

                      {
                        school.schoolName ||
                        school.name ||
                        school.school_name
                      }

                    </option>

                  )
                )}

              </select>

              {/* SESSION */}

              <select
                className="form-select custom-control"
                style={{
                  width: "170px",
                }}
                value={
                  sessionFilter
                }
                onChange={(e) =>
                  setSessionFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Sessions
                </option>

                {sessions.map(
                  (item) => {

                    const value =
                      typeof item ===
                      "string"
                        ? item
                        : item.academicYear ||
                          item.sessionName ||
                          item.name ||
                          item.session ||
                          item.year ||
                          "";

                    if (!value) {
                      return null;
                    }

                    return (
                      <option
                        key={
                          typeof item ===
                          "string"
                            ? item
                            : item.id ||
                              value
                        }
                        value={value}
                      >
                        {value}
                      </option>
                    );
                  }
                )}

              </select>

              {/* DAY */}

              <select
                className="form-select custom-control"
                style={{
                  width: "160px",
                }}
                value={
                  dayFilter
                }
                onChange={(e) =>
                  setDayFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Days
                </option>

                {DAYS.map(
                  (day) => (

                    <option
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* TABLE */}

            {loading ? (

              <div className="text-center py-5">

                <span className="spinner-border spinner-border-sm text-primary me-2" />

                <span className="text-muted">
                  Loading periods...
                </span>

              </div>

            ) : (

              <div className="table-wrapper">

                <table className="table period-table align-middle">

                  <thead>

                    <tr>

                      <th>
                        School
                      </th>

                      <th>
                        Session
                      </th>

                      <th>
                        Day
                      </th>

                      <th>
                        Period
                      </th>

                      <th>
                        Start Time
                      </th>

                      <th>
                        End Time
                      </th>

                      <th>
                        Description
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredPeriods.length ===
                    0 ? (

                      <tr>

                        <td
                          colSpan="9"
                          className="text-center py-5 text-muted"
                        >

                          No periods found.

                        </td>

                      </tr>

                    ) : (

                      filteredPeriods.map(
                        (period) => (

                          <tr
                            key={
                              period.id
                            }
                          >

                            <td>

                              <span className="fw-semibold text-dark">

                                {
                                  getSchoolName(
                                    period.schoolId
                                  )
                                }

                              </span>

                            </td>

                            <td>

                              <span className="session-badge">

                                {
                                  period.academicYear ||
                                  "-"
                                }

                              </span>

                            </td>

                            <td>

                              <span className="day-badge">

                                <LuCalendarDays
                                  size={13}
                                />

                                {
                                  period.dayOfWeek
                                }

                              </span>

                            </td>

                            <td>

                              <span className="fw-semibold text-dark">

                                {
                                  period.periodName ||
                                  "-"
                                }

                              </span>

                            </td>

                            <td>

                              {
                                period.startTime ||
                                "-"
                              }

                            </td>

                            <td>

                              {
                                period.endTime ||
                                "-"
                              }

                            </td>

                            <td>

                              {
                                period.description ||
                                "-"
                              }

                            </td>

                            <td>

                              {period.active ===
                              false ? (

                                <span className="status-inactive">
                                  INACTIVE
                                </span>

                              ) : (

                                <span className="status-active">
                                  ACTIVE
                                </span>

                              )}

                            </td>

                            <td>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger action-button"
                                title="Delete"
                                disabled={
                                  deletingId ===
                                  period.id
                                }
                                onClick={() =>
                                  handleDelete(
                                    period.id
                                  )
                                }
                              >

                                {deletingId ===
                                period.id ? (

                                  <span className="spinner-border spinner-border-sm" />

                                ) : (

                                  <LuTrash2
                                    size={15}
                                  />

                                )}

                              </button>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default PeriodManagement;