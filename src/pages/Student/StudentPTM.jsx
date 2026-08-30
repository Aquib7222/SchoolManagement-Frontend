// import React, { useMemo, useState } from "react";
// import * as XLSX from "xlsx";
// import {
//   LuCalendarDays,
//   LuUsers,
//   LuCircleCheck,
//   LuClock3,
//   LuSearch,
//   LuDownload,
//   LuEye,
//   LuPencil,
//   LuPlus,
//   LuChevronLeft,
//   LuChevronRight,
//   LuVideo,
//   LuMapPin,
//   LuPhone,
//   LuMail,
//   LuUser,
//   LuMessageSquare,
//   LuX,
// } from "react-icons/lu";
// import { MdOutlineSchool } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";

// const ITEMS_PER_PAGE = 5;

// const StudentPTM = () => {
//   const { standards, sections, sessions } = useMasters();

//   const [search, setSearch] = useState("");
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState("view");
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   /*
//    * Demo data
//    * Replace this with your API response later.
//    */
//   const [ptmStudents, setPtmStudents] = useState([
//     {
//       id: 1,
//       admissionNumber: "ADM00001",
//       studentName: "Aarav Kumar",
//       firstName: "Aarav",
//       lastName: "Kumar",
//       studentClass: "V",
//       section: "A",
//       session: "2026-2027",
//       parentName: "Rajesh Kumar",
//       parentMobile: "9876543210",
//       parentEmail: "rajesh@gmail.com",
//       ptmDate: "2026-08-30",
//       ptmTime: "10:00 AM",
//       mode: "OFFLINE",
//       status: "SCHEDULED",
//       teacherName: "Mr. Rahul Sharma",
//       remarks: "Discuss academic performance and attendance.",
//     },
//     {
//       id: 2,
//       admissionNumber: "ADM00002",
//       studentName: "Ayesha Khan",
//       firstName: "Ayesha",
//       lastName: "Khan",
//       studentClass: "VI",
//       section: "B",
//       session: "2026-2027",
//       parentName: "Imran Khan",
//       parentMobile: "9876501234",
//       parentEmail: "imran@gmail.com",
//       ptmDate: "2026-08-30",
//       ptmTime: "11:00 AM",
//       mode: "ONLINE",
//       status: "SCHEDULED",
//       teacherName: "Ms. Neha Singh",
//       remarks: "Good academic progress. Discuss co-curricular activities.",
//     },
//     {
//       id: 3,
//       admissionNumber: "ADM00003",
//       studentName: "Aditya Raj",
//       firstName: "Aditya",
//       lastName: "Raj",
//       studentClass: "VII",
//       section: "A",
//       session: "2026-2027",
//       parentName: "Sanjay Raj",
//       parentMobile: "9123456780",
//       parentEmail: "sanjay@gmail.com",
//       ptmDate: "2026-08-29",
//       ptmTime: "09:30 AM",
//       mode: "OFFLINE",
//       status: "COMPLETED",
//       teacherName: "Mr. Amit Kumar",
//       remarks: "Parent meeting completed successfully.",
//     },
//     {
//       id: 4,
//       admissionNumber: "ADM00004",
//       studentName: "Ananya Singh",
//       firstName: "Ananya",
//       lastName: "Singh",
//       studentClass: "VIII",
//       section: "A",
//       session: "2026-2027",
//       parentName: "Vikash Singh",
//       parentMobile: "9988776655",
//       parentEmail: "vikash@gmail.com",
//       ptmDate: "2026-08-31",
//       ptmTime: "12:00 PM",
//       mode: "OFFLINE",
//       status: "PENDING",
//       teacherName: "Ms. Priya Verma",
//       remarks: "",
//     },
//     {
//       id: 5,
//       admissionNumber: "ADM00005",
//       studentName: "Mohammad Zaid",
//       firstName: "Mohammad",
//       lastName: "Zaid",
//       studentClass: "IX",
//       section: "B",
//       session: "2026-2027",
//       parentName: "Mohammad Asif",
//       parentMobile: "9876123456",
//       parentEmail: "asif@gmail.com",
//       ptmDate: "2026-09-01",
//       ptmTime: "10:30 AM",
//       mode: "ONLINE",
//       status: "SCHEDULED",
//       teacherName: "Mr. Rohit Kumar",
//       remarks: "Discuss subject-wise performance.",
//     },
//     {
//       id: 6,
//       admissionNumber: "ADM00006",
//       studentName: "Riya Kumari",
//       firstName: "Riya",
//       lastName: "Kumari",
//       studentClass: "X",
//       section: "A",
//       session: "2026-2027",
//       parentName: "Manoj Kumar",
//       parentMobile: "9876543211",
//       parentEmail: "manoj@gmail.com",
//       ptmDate: "2026-09-01",
//       ptmTime: "11:30 AM",
//       mode: "OFFLINE",
//       status: "PENDING",
//       teacherName: "Ms. Pooja Singh",
//       remarks: "",
//     },
//     {
//       id: 7,
//       admissionNumber: "ADM00007",
//       studentName: "Arjun Verma",
//       firstName: "Arjun",
//       lastName: "Verma",
//       studentClass: "V",
//       section: "B",
//       session: "2026-2027",
//       parentName: "Deepak Verma",
//       parentMobile: "9876543212",
//       parentEmail: "deepak@gmail.com",
//       ptmDate: "2026-08-28",
//       ptmTime: "01:00 PM",
//       mode: "OFFLINE",
//       status: "COMPLETED",
//       teacherName: "Mr. Suresh Kumar",
//       remarks: "Discussed attendance and discipline.",
//     },
//     {
//       id: 8,
//       admissionNumber: "ADM00008",
//       studentName: "Simran Kumari",
//       firstName: "Simran",
//       lastName: "Kumari",
//       studentClass: "VI",
//       section: "A",
//       session: "2026-2027",
//       parentName: "Ramesh Kumar",
//       parentMobile: "9876543213",
//       parentEmail: "ramesh@gmail.com",
//       ptmDate: "2026-09-02",
//       ptmTime: "09:00 AM",
//       mode: "ONLINE",
//       status: "SCHEDULED",
//       teacherName: "Ms. Kavita Sharma",
//       remarks: "Discuss overall development.",
//     },
//     {
//       id: 9,
//       admissionNumber: "ADM00009",
//       studentName: "Kabir Ahmad",
//       firstName: "Kabir",
//       lastName: "Ahmad",
//       studentClass: "VII",
//       section: "B",
//       session: "2026-2027",
//       parentName: "Sameer Ahmad",
//       parentMobile: "9876543214",
//       parentEmail: "sameer@gmail.com",
//       ptmDate: "2026-08-27",
//       ptmTime: "10:00 AM",
//       mode: "OFFLINE",
//       status: "COMPLETED",
//       teacherName: "Mr. Danish Ali",
//       remarks: "Meeting completed.",
//     },
//     {
//       id: 10,
//       admissionNumber: "ADM00010",
//       studentName: "Priya Kumari",
//       firstName: "Priya",
//       lastName: "Kumari",
//       studentClass: "VIII",
//       section: "B",
//       session: "2026-2027",
//       parentName: "Raj Kumar",
//       parentMobile: "9876543215",
//       parentEmail: "raj@gmail.com",
//       ptmDate: "2026-09-03",
//       ptmTime: "12:30 PM",
//       mode: "OFFLINE",
//       status: "PENDING",
//       teacherName: "Ms. Sunita Devi",
//       remarks: "",
//     },
//   ]);

//   const [form, setForm] = useState({
//     ptmDate: "",
//     ptmTime: "",
//     mode: "OFFLINE",
//     teacherName: "",
//     status: "SCHEDULED",
//     remarks: "",
//   });

//   /* ================= FILTER ================= */

//   const filteredStudents = useMemo(() => {
//     let data = [...ptmStudents];

//     if (search.trim()) {
//       const value = search.toLowerCase();

//       data = data.filter(
//         (student) =>
//           student.studentName?.toLowerCase().includes(value) ||
//           student.admissionNumber?.toLowerCase().includes(value) ||
//           student.parentName?.toLowerCase().includes(value)
//       );
//     }

//     if (selectedSession) {
//       data = data.filter(
//         (student) => student.session === selectedSession
//       );
//     }

//     if (selectedClass) {
//       data = data.filter(
//         (student) => student.studentClass === selectedClass
//       );
//     }

//     if (selectedSection) {
//       data = data.filter(
//         (student) => student.section === selectedSection
//       );
//     }

//     if (selectedStatus) {
//       data = data.filter(
//         (student) => student.status === selectedStatus
//       );
//     }

//     return data.sort((a, b) =>
//       a.studentName.localeCompare(b.studentName)
//     );
//   }, [
//     ptmStudents,
//     search,
//     selectedSession,
//     selectedClass,
//     selectedSection,
//     selectedStatus,
//   ]);

//   /* ================= PAGINATION ================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
//   );

//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   /* ================= SUMMARY ================= */

//   const totalPTM = ptmStudents.length;

//   const scheduledPTM = ptmStudents.filter(
//     (student) => student.status === "SCHEDULED"
//   ).length;

//   const completedPTM = ptmStudents.filter(
//     (student) => student.status === "COMPLETED"
//   ).length;

//   const pendingPTM = ptmStudents.filter(
//     (student) => student.status === "PENDING"
//   ).length;

//   /* ================= HANDLERS ================= */

//   const resetPage = () => {
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     resetPage();
//   };

//   const handleFilter = (setter) => (e) => {
//     setter(e.target.value);
//     resetPage();
//   };

//   const openViewModal = (student) => {
//     setSelectedStudent(student);
//     setModalMode("view");
//     setShowModal(true);
//   };

//   const openEditModal = (student) => {
//     setSelectedStudent(student);

//     setForm({
//       ptmDate: student.ptmDate || "",
//       ptmTime: student.ptmTime || "",
//       mode: student.mode || "OFFLINE",
//       teacherName: student.teacherName || "",
//       status: student.status || "SCHEDULED",
//       remarks: student.remarks || "",
//     });

//     setModalMode("edit");
//     setShowModal(true);
//   };

//   const openScheduleModal = (student) => {
//     setSelectedStudent(student);

//     setForm({
//       ptmDate: student.ptmDate || "",
//       ptmTime: "",
//       mode: "OFFLINE",
//       teacherName: "",
//       status: "SCHEDULED",
//       remarks: "",
//     });

//     setModalMode("schedule");
//     setShowModal(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSavePTM = () => {
//     if (!selectedStudent) return;

//     setPtmStudents((prev) =>
//       prev.map((student) =>
//         student.id === selectedStudent.id
//           ? {
//               ...student,
//               ...form,
//             }
//           : student
//       )
//     );

//     setShowModal(false);
//     alert(
//       modalMode === "edit"
//         ? "PTM updated successfully."
//         : "PTM scheduled successfully."
//     );
//   };

//   /* ================= EXPORT ================= */

//   const exportToExcel = () => {
//     if (!filteredStudents.length) {
//       alert("No PTM data available to export.");
//       return;
//     }

//     const data = filteredStudents.map((student, index) => ({
//       "S.No": index + 1,
//       "Admission No": student.admissionNumber,
//       "Student Name": student.studentName,
//       Class: student.studentClass,
//       Section: student.section,
//       Session: student.session,
//       "Parent Name": student.parentName,
//       "Parent Mobile": student.parentMobile,
//       "PTM Date": student.ptmDate,
//       "PTM Time": student.ptmTime,
//       Mode: student.mode,
//       Status: student.status,
//       Teacher: student.teacherName,
//       Remarks: student.remarks || "-",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Student PTM"
//     );

//     XLSX.writeFile(workbook, "Student_PTM.xlsx");
//   };

//   /* ================= HELPERS ================= */

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "COMPLETED":
//         return {
//           background: "#ecfdf5",
//           color: "#047857",
//           border: "1px solid #a7f3d0",
//         };

//       case "SCHEDULED":
//         return {
//           background: "#eff6ff",
//           color: "#2563eb",
//           border: "1px solid #bfdbfe",
//         };

//       case "PENDING":
//         return {
//           background: "#fff7ed",
//           color: "#c2410c",
//           border: "1px solid #fed7aa",
//         };

//       default:
//         return {
//           background: "#f8fafc",
//           color: "#64748b",
//           border: "1px solid #e2e8f0",
//         };
//     }
//   };

//   const formatStatus = (status) => {
//     if (!status) return "-";

//     return status
//       .replaceAll("_", " ")
//       .toLowerCase()
//       .replace(/\b\w/g, (letter) => letter.toUpperCase());
//   };

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow-sm overflow-hidden"
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
//                     width: "54px",
//                     height: "54px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <LuCalendarDays size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Student PTM
//                   </h5>

//                   <div className="text-muted small">
//                     Student Management&nbsp; / &nbsp;PTM
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex gap-2 flex-wrap">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     background: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   Parent Teacher Meeting
//                 </span>

//                 <button
//                   type="button"
//                   className="btn d-flex align-items-center gap-2 text-white"
//                   onClick={exportToExcel}
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#198754,#20a878)",
//                     border: "none",
//                     borderRadius: "9px",
//                     padding: "8px 14px",
//                   }}
//                 >
//                   <LuDownload size={16} />
//                   Export
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               background: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home&nbsp; › &nbsp;Student Management&nbsp; › &nbsp;
//               <span className="text-primary fw-semibold">
//                 Student PTM
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAIN
//       ===================================================== */}

//       <div className="mx-2 mb-4">
//         <div
//           className="bg-white rounded-4 shadow-sm p-3 p-md-4"
//           style={{
//             border: "1px solid #edf2f7",
//           }}
//         >
//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
//             <div>
//               <h5
//                 className="mb-1 fw-bold"
//                 style={{ color: "#1e3a8a" }}
//               >
//                 Parent Teacher Meetings
//               </h5>

//               <small className="text-muted">
//                 Schedule and manage student-parent meetings
//               </small>
//             </div>

//             <div
//               className="px-3 py-2 rounded-3"
//               style={{
//                 background: "#f8fafc",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <small className="text-muted">
//                 Total Records
//               </small>

//               <div className="fw-bold text-primary">
//                 {filteredStudents.length}
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               SUMMARY CARDS
//           ================================================= */}

//           <div className="row g-3 mb-4">
//             <div className="col-xl-3 col-md-6">
//               <div
//                 className="rounded-4 p-3 h-100"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 24px rgba(37,99,235,.18)",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <small style={{ opacity: ".82" }}>
//                       Total PTM
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {totalPTM}
//                     </h3>

//                     <small style={{ opacity: ".72" }}>
//                       All meetings
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                     }}
//                   >
//                     <LuUsers size={24} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-md-6">
//               <div
//                 className="rounded-4 p-3 h-100"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#059669,#10b981)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 24px rgba(5,150,105,.18)",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <small style={{ opacity: ".82" }}>
//                       Completed
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {completedPTM}
//                     </h3>

//                     <small style={{ opacity: ".72" }}>
//                       Meetings completed
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                     }}
//                   >
//                     <LuCircleCheck size={24} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-md-6">
//               <div
//                 className="rounded-4 p-3 h-100"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#7c3aed,#8b5cf6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 24px rgba(124,58,237,.18)",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <small style={{ opacity: ".82" }}>
//                       Scheduled
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {scheduledPTM}
//                     </h3>

//                     <small style={{ opacity: ".72" }}>
//                       Upcoming meetings
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                     }}
//                   >
//                     <LuCalendarDays size={24} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-md-6">
//               <div
//                 className="rounded-4 p-3 h-100"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#d97706,#f59e0b)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 10px 24px rgba(245,158,11,.18)",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <small style={{ opacity: ".85" }}>
//                       Pending
//                     </small>

//                     <h3 className="fw-bold mb-0 mt-1">
//                       {pendingPTM}
//                     </h3>

//                     <small style={{ opacity: ".74" }}>
//                       Awaiting schedule
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "rgba(255,255,255,.16)",
//                     }}
//                   >
//                     <LuClock3 size={24} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               FILTER
//           ================================================= */}

//           <div
//             className="rounded-4 p-3 p-md-4 mb-4"
//             style={{
//               background:
//                 "linear-gradient(135deg,#f8fbff,#f3f7fc)",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <div className="d-flex align-items-center gap-2 mb-3">
//               <div
//                 className="rounded-3 d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                   background: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #dbeafe",
//                 }}
//               >
//                 <LuSearch size={18} />
//               </div>

//               <div>
//                 <h6 className="mb-0 fw-bold">
//                   Search & Filter
//                 </h6>

//                 <small className="text-muted">
//                   Filter PTM records by student and class
//                 </small>
//               </div>
//             </div>

//             <div className="row g-3">
//               {/* SEARCH */}

//               <div className="col-xl-4 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Search Student
//                 </label>

//                 <div className="position-relative">
//                   <LuSearch
//                     size={17}
//                     style={{
//                       position: "absolute",
//                       left: "13px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       color: "#94a3b8",
//                     }}
//                   />

//                   <input
//                     type="search"
//                     className="form-control"
//                     placeholder="Name, admission no or parent..."
//                     value={search}
//                     onChange={handleSearch}
//                     style={{
//                       paddingLeft: "38px",
//                       borderRadius: "9px",
//                       border: "1px solid #dbe3ef",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* SESSION */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Session
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={handleFilter(setSelectedSession)}
//                   style={{
//                     borderRadius: "9px",
//                     border: "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="">
//                     All Sessions
//                   </option>

//                   {sessions?.map((session, index) => {
//                     const value =
//                       session?.name ||
//                       session?.value ||
//                       session?.session ||
//                       session;

//                     return (
//                       <option key={index} value={value}>
//                         {session?.label ||
//                           session?.name ||
//                           session?.value ||
//                           session?.session ||
//                           session}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               {/* CLASS */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Class
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedClass}
//                   onChange={handleFilter(setSelectedClass)}
//                   style={{
//                     borderRadius: "9px",
//                     border: "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="">
//                     All Classes
//                   </option>

//                   {standards?.map((standard, index) => {
//                     const value =
//                       standard?.name ||
//                       standard?.value ||
//                       standard;

//                     return (
//                       <option key={index} value={value}>
//                         {standard?.label ||
//                           standard?.name ||
//                           standard?.value ||
//                           standard}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               {/* SECTION */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Section
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={handleFilter(setSelectedSection)}
//                   style={{
//                     borderRadius: "9px",
//                     border: "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="">
//                     All Sections
//                   </option>

//                   {sections?.map((section, index) => {
//                     const value =
//                       section?.name ||
//                       section?.value ||
//                       section;

//                     return (
//                       <option key={index} value={value}>
//                         {section?.label ||
//                           section?.name ||
//                           section?.value ||
//                           section}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               {/* STATUS */}

//               <div className="col-xl-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Status
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedStatus}
//                   onChange={handleFilter(setSelectedStatus)}
//                   style={{
//                     borderRadius: "9px",
//                     border: "1px solid #dbe3ef",
//                   }}
//                 >
//                   <option value="">
//                     All Status
//                   </option>

//                   <option value="SCHEDULED">
//                     Scheduled
//                   </option>

//                   <option value="COMPLETED">
//                     Completed
//                   </option>

//                   <option value="PENDING">
//                     Pending
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               TABLE HEADER
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//             <div>
//               <h6
//                 className="fw-bold mb-1"
//                 style={{ color: "#1e293b" }}
//               >
//                 PTM Records
//               </h6>

//               <small className="text-muted">
//                 Showing{" "}
//                 <strong>{filteredStudents.length}</strong>{" "}
//                 record
//                 {filteredStudents.length !== 1 ? "s" : ""}
//               </small>
//             </div>

//             <span
//               className="badge rounded-pill px-3 py-2"
//               style={{
//                 background: "#eff6ff",
//                 color: "#2563eb",
//                 border: "1px solid #bfdbfe",
//               }}
//             >
//               {filteredStudents.length} Records
//             </span>
//           </div>

//           {/* =================================================
//               PREMIUM TABLE
//           ================================================= */}

//           <div
//             className="table-responsive rounded-4"
//             style={{
//               border: "1px solid #dbe3ef",
//               boxShadow:
//                 "0 8px 25px rgba(15,23,42,.06)",
//             }}
//           >
//             <table
//               className="table align-middle mb-0"
//               style={{
//                 minWidth: "1250px",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#eef4ff,#f8fafc)",
//                     borderBottom:
//                       "1px solid #dbe3ef",
//                   }}
//                 >
//                   <th
//                     className="px-3 py-3"
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     #
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     STUDENT
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     CLASS
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     PARENT
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     PTM DATE
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     MODE
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     STATUS
//                   </th>

//                   <th
//                     className="text-center"
//                     style={{
//                       color: "#334155",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                     }}
//                   >
//                     ACTION
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedStudents.length > 0 ? (
//                   paginatedStudents.map((student, index) => (
//                     <tr
//                       key={student.id}
//                       style={{
//                         borderBottom:
//                           "1px solid #eef2f7",
//                       }}
//                     >
//                       {/* NUMBER */}

//                       <td className="px-3 fw-semibold text-muted">
//                         {(currentPage - 1) *
//                           ITEMS_PER_PAGE +
//                           index +
//                           1}
//                       </td>

//                       {/* STUDENT */}

//                       <td>
//                         <div className="d-flex align-items-center gap-3">
//                           <div
//                             className="rounded-3 d-flex align-items-center justify-content-center"
//                             style={{
//                               width: "42px",
//                               height: "42px",
//                               background:
//                                 "linear-gradient(135deg,#eff6ff,#dbeafe)",
//                               color: "#2563eb",
//                               border:
//                                 "1px solid #bfdbfe",
//                               flexShrink: 0,
//                             }}
//                           >
//                             <LuUser size={19} />
//                           </div>

//                           <div>
//                             <div
//                               className="fw-bold"
//                               style={{
//                                 color: "#1e293b",
//                               }}
//                             >
//                               {student.studentName}
//                             </div>

//                             <small
//                               style={{
//                                 color: "#2563eb",
//                                 fontWeight: 600,
//                               }}
//                             >
//                               {student.admissionNumber}
//                             </small>
//                           </div>
//                         </div>
//                       </td>

//                       {/* CLASS */}

//                       <td>
//                         <div className="d-flex align-items-center gap-2">
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={{
//                               background: "#f1f5f9",
//                               color: "#475569",
//                               border:
//                                 "1px solid #e2e8f0",
//                             }}
//                           >
//                             {student.studentClass}
//                           </span>

//                           <span
//                             className="fw-semibold"
//                             style={{
//                               color: "#64748b",
//                             }}
//                           >
//                             {student.section}
//                           </span>
//                         </div>
//                       </td>

//                       {/* PARENT */}

//                       <td>
//                         <div
//                           className="fw-semibold"
//                           style={{
//                             color: "#334155",
//                           }}
//                         >
//                           {student.parentName}
//                         </div>

//                         <small className="text-muted d-flex align-items-center gap-1">
//                           <LuPhone size={12} />
//                           {student.parentMobile}
//                         </small>
//                       </td>

//                       {/* DATE */}

//                       <td>
//                         <div
//                           className="fw-semibold"
//                           style={{
//                             color: "#334155",
//                           }}
//                         >
//                           {student.ptmDate}
//                         </div>

//                         <small className="text-muted">
//                           {student.ptmTime || "Time not set"}
//                         </small>
//                       </td>

//                       {/* MODE */}

//                       <td>
//                         {student.mode === "ONLINE" ? (
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={{
//                               background: "#f5f3ff",
//                               color: "#6d28d9",
//                               border:
//                                 "1px solid #ddd6fe",
//                             }}
//                           >
//                             <LuVideo
//                               size={13}
//                               className="me-1"
//                             />
//                             Online
//                           </span>
//                         ) : (
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={{
//                               background: "#f0fdf4",
//                               color: "#15803d",
//                               border:
//                                 "1px solid #bbf7d0",
//                             }}
//                           >
//                             <LuMapPin
//                               size={13}
//                               className="me-1"
//                             />
//                             Offline
//                           </span>
//                         )}
//                       </td>

//                       {/* STATUS */}

//                       <td>
//                         <span
//                           className="badge rounded-pill px-3 py-2"
//                           style={getStatusStyle(
//                             student.status
//                           )}
//                         >
//                           {formatStatus(student.status)}
//                         </span>
//                       </td>

//                       {/* ACTION */}

//                       <td className="text-center">
//                         <div className="d-flex justify-content-center gap-2">
//                           <button
//                             type="button"
//                             title="View PTM"
//                             className="btn btn-sm d-flex align-items-center justify-content-center"
//                             onClick={() =>
//                               openViewModal(student)
//                             }
//                             style={{
//                               width: "34px",
//                               height: "34px",
//                               borderRadius: "8px",
//                               background: "#eff6ff",
//                               color: "#2563eb",
//                               border:
//                                 "1px solid #bfdbfe",
//                             }}
//                           >
//                             <LuEye size={16} />
//                           </button>

//                           {student.status ===
//                           "PENDING" ? (
//                             <button
//                               type="button"
//                               title="Schedule PTM"
//                               className="btn btn-sm d-flex align-items-center justify-content-center"
//                               onClick={() =>
//                                 openScheduleModal(
//                                   student
//                                 )
//                               }
//                               style={{
//                                 width: "34px",
//                                 height: "34px",
//                                 borderRadius: "8px",
//                                 background:
//                                   "linear-gradient(135deg,#2563eb,#3b82f6)",
//                                 color: "#fff",
//                                 border: "none",
//                               }}
//                             >
//                               <LuPlus size={16} />
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               title="Edit PTM"
//                               className="btn btn-sm d-flex align-items-center justify-content-center"
//                               onClick={() =>
//                                 openEditModal(student)
//                               }
//                               style={{
//                                 width: "34px",
//                                 height: "34px",
//                                 borderRadius: "8px",
//                                 background: "#f8fafc",
//                                 color: "#475569",
//                                 border:
//                                   "1px solid #dbe3ef",
//                               }}
//                             >
//                               <LuPencil size={15} />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="8"
//                       className="text-center py-5"
//                     >
//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           background: "#f1f5f9",
//                           color: "#94a3b8",
//                         }}
//                       >
//                         <LuCalendarDays size={27} />
//                       </div>

//                       <h6 className="fw-semibold text-muted">
//                         No PTM records found
//                       </h6>

//                       <small className="text-secondary">
//                         Try changing your filters or search.
//                       </small>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* =================================================
//               PAGINATION
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">
//             <small className="text-muted">
//               Page{" "}
//               <strong>{currentPage}</strong> of{" "}
//               <strong>{totalPages}</strong>
//             </small>

//             <div className="d-flex align-items-center gap-2">
//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={currentPage === 1}
//                 onClick={() =>
//                   setCurrentPage((page) => page - 1)
//                 }
//                 style={{
//                   border: "1px solid #dbe3ef",
//                   color:
//                     currentPage === 1
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   background: "#fff",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <LuChevronLeft size={16} />
//                 Previous
//               </button>

//               <div className="d-flex gap-1">
//                 {Array.from(
//                   { length: totalPages },
//                   (_, index) => index + 1
//                 ).map((page) => (
//                   <button
//                     type="button"
//                     key={page}
//                     onClick={() =>
//                       setCurrentPage(page)
//                     }
//                     className="btn btn-sm"
//                     style={
//                       currentPage === page
//                         ? {
//                             background:
//                               "linear-gradient(135deg,#2563eb,#3b82f6)",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "8px",
//                             minWidth: "34px",
//                           }
//                         : {
//                             background: "#fff",
//                             color: "#475569",
//                             border:
//                               "1px solid #dbe3ef",
//                             borderRadius: "8px",
//                             minWidth: "34px",
//                           }
//                     }
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={
//                   currentPage === totalPages
//                 }
//                 onClick={() =>
//                   setCurrentPage((page) => page + 1)
//                 }
//                 style={{
//                   border: "1px solid #dbe3ef",
//                   color:
//                     currentPage === totalPages
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   background: "#fff",
//                   borderRadius: "8px",
//                 }}
//               >
//                 Next
//                 <LuChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           VIEW / EDIT / SCHEDULE MODAL
//       ===================================================== */}

//       {showModal && selectedStudent && (
//         <div
//           className="modal d-block"
//           style={{
//             background: "rgba(15,23,42,.55)",
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-lg"
//             style={{
//               maxWidth: "850px",
//             }}
//           >
//             <div
//               className="modal-content border-0 rounded-4 overflow-hidden"
//               style={{
//                 boxShadow:
//                   "0 25px 70px rgba(15,23,42,.25)",
//               }}
//             >
//               {/* MODAL HEADER */}

//               <div
//                 className="p-3 p-md-4"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#f8fbff,#eef5ff)",
//                   borderBottom:
//                     "1px solid #dbeafe",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center gap-3">
//                     <div
//                       className="rounded-3 d-flex align-items-center justify-content-center"
//                       style={{
//                         width: "46px",
//                         height: "46px",
//                         background:
//                           "linear-gradient(135deg,#2563eb,#3b82f6)",
//                         color: "#fff",
//                       }}
//                     >
//                       <LuCalendarDays size={22} />
//                     </div>

//                     <div>
//                       <h5 className="mb-1 fw-bold">
//                         {modalMode === "view"
//                           ? "PTM Details"
//                           : modalMode === "edit"
//                           ? "Edit PTM"
//                           : "Schedule PTM"}
//                       </h5>

//                       <small className="text-muted">
//                         {selectedStudent.studentName}{" "}
//                         ·{" "}
//                         {selectedStudent.admissionNumber}
//                       </small>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     className="btn btn-sm d-flex align-items-center justify-content-center"
//                     onClick={() =>
//                       setShowModal(false)
//                     }
//                     style={{
//                       width: "36px",
//                       height: "36px",
//                       borderRadius: "9px",
//                       background: "#fff",
//                       border:
//                         "1px solid #dbe3ef",
//                     }}
//                   >
//                     <LuX size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* VIEW */}

//               {modalMode === "view" ? (
//                 <div className="p-3 p-md-4">
//                   {/* STUDENT CARD */}

//                   <div
//                     className="rounded-4 p-3 mb-4"
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#f8fbff,#f1f5f9)",
//                       border:
//                         "1px solid #e2e8f0",
//                     }}
//                   >
//                     <div className="row g-3">
//                       <div className="col-md-6">
//                         <small className="text-muted">
//                           Student
//                         </small>

//                         <div className="fw-bold text-dark mt-1">
//                           {selectedStudent.studentName}
//                         </div>
//                       </div>

//                       <div className="col-md-3">
//                         <small className="text-muted">
//                           Class
//                         </small>

//                         <div className="fw-bold text-dark mt-1">
//                           {selectedStudent.studentClass} -{" "}
//                           {selectedStudent.section}
//                         </div>
//                       </div>

//                       <div className="col-md-3">
//                         <small className="text-muted">
//                           Session
//                         </small>

//                         <div className="fw-bold text-dark mt-1">
//                           {selectedStudent.session}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row g-3">
//                     {/* DATE */}

//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           background: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted">
//                           PTM Date
//                         </small>

//                         <div className="fw-bold mt-1">
//                           {selectedStudent.ptmDate ||
//                             "-"}
//                         </div>
//                       </div>
//                     </div>

//                     {/* TIME */}

//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           background: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted">
//                           PTM Time
//                         </small>

//                         <div className="fw-bold mt-1">
//                           {selectedStudent.ptmTime ||
//                             "-"}
//                         </div>
//                       </div>
//                     </div>

//                     {/* STATUS */}

//                     <div className="col-md-4">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           background: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <small className="text-muted">
//                           Status
//                         </small>

//                         <div className="mt-2">
//                           <span
//                             className="badge rounded-pill px-3 py-2"
//                             style={getStatusStyle(
//                               selectedStudent.status
//                             )}
//                           >
//                             {formatStatus(
//                               selectedStudent.status
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* PARENT */}

//                     <div className="col-md-6">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <div className="d-flex align-items-center gap-2 mb-3">
//                           <LuUser
//                             size={17}
//                             className="text-primary"
//                           />

//                           <strong>
//                             Parent Details
//                           </strong>
//                         </div>

//                         <div className="fw-semibold">
//                           {selectedStudent.parentName}
//                         </div>

//                         <small className="text-muted d-flex align-items-center gap-2 mt-2">
//                           <LuPhone size={14} />
//                           {selectedStudent.parentMobile}
//                         </small>

//                         <small className="text-muted d-flex align-items-center gap-2 mt-1">
//                           <LuMail size={14} />
//                           {selectedStudent.parentEmail ||
//                             "-"}
//                         </small>
//                       </div>
//                     </div>

//                     {/* TEACHER */}

//                     <div className="col-md-6">
//                       <div
//                         className="p-3 rounded-3 h-100"
//                         style={{
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <div className="d-flex align-items-center gap-2 mb-3">
//                           <MdOutlineSchool
//                             size={18}
//                             className="text-primary"
//                           />

//                           <strong>
//                             Meeting Details
//                           </strong>
//                         </div>

//                         <div>
//                           <small className="text-muted">
//                             Teacher
//                           </small>

//                           <div className="fw-semibold mt-1">
//                             {selectedStudent.teacherName ||
//                               "-"}
//                           </div>
//                         </div>

//                         <div className="mt-2">
//                           <small className="text-muted">
//                             Mode
//                           </small>

//                           <div className="mt-1">
//                             {selectedStudent.mode ===
//                             "ONLINE" ? (
//                               <span className="text-primary fw-semibold">
//                                 <LuVideo
//                                   size={14}
//                                   className="me-1"
//                                 />
//                                 Online Meeting
//                               </span>
//                             ) : (
//                               <span className="text-success fw-semibold">
//                                 <LuMapPin
//                                   size={14}
//                                   className="me-1"
//                                 />
//                                 School / Offline
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* REMARKS */}

//                     <div className="col-12">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           background: "#f8fafc",
//                           border:
//                             "1px solid #e2e8f0",
//                         }}
//                       >
//                         <div className="d-flex align-items-center gap-2 mb-2">
//                           <LuMessageSquare
//                             size={16}
//                             className="text-primary"
//                           />

//                           <strong>
//                             Teacher Remarks
//                           </strong>
//                         </div>

//                         <div className="text-muted">
//                           {selectedStudent.remarks ||
//                             "No remarks available."}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* =================================================
//                    EDIT / SCHEDULE
//                 ================================================= */

//                 <div className="p-3 p-md-4">
//                   <div
//                     className="rounded-4 p-3 mb-4"
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#f8fbff,#f1f5f9)",
//                       border:
//                         "1px solid #e2e8f0",
//                     }}
//                   >
//                     <div className="row g-3">
//                       <div className="col-md-6">
//                         <small className="text-muted">
//                           Student
//                         </small>

//                         <div className="fw-bold mt-1">
//                           {selectedStudent.studentName}
//                         </div>
//                       </div>

//                       <div className="col-md-3">
//                         <small className="text-muted">
//                           Class
//                         </small>

//                         <div className="fw-bold mt-1">
//                           {selectedStudent.studentClass} -{" "}
//                           {selectedStudent.section}
//                         </div>
//                       </div>

//                       <div className="col-md-3">
//                         <small className="text-muted">
//                           Admission No
//                         </small>

//                         <div className="fw-bold mt-1 text-primary">
//                           {selectedStudent.admissionNumber}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row g-3">
//                     {/* DATE */}

//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">
//                         PTM Date
//                       </label>

//                       <input
//                         type="date"
//                         name="ptmDate"
//                         className="form-control"
//                         value={form.ptmDate}
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                         }}
//                       />
//                     </div>

//                     {/* TIME */}

//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">
//                         PTM Time
//                       </label>

//                       <input
//                         type="time"
//                         name="ptmTime"
//                         className="form-control"
//                         value={
//                           form.ptmTime?.includes(":")
//                             ? form.ptmTime
//                             : ""
//                         }
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                         }}
//                       />
//                     </div>

//                     {/* MODE */}

//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">
//                         Meeting Mode
//                       </label>

//                       <select
//                         name="mode"
//                         className="form-select"
//                         value={form.mode}
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                         }}
//                       >
//                         <option value="OFFLINE">
//                           Offline
//                         </option>

//                         <option value="ONLINE">
//                           Online
//                         </option>
//                       </select>
//                     </div>

//                     {/* TEACHER */}

//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">
//                         Teacher
//                       </label>

//                       <input
//                         type="text"
//                         name="teacherName"
//                         className="form-control"
//                         placeholder="Enter teacher name"
//                         value={form.teacherName}
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                         }}
//                       />
//                     </div>

//                     {/* STATUS */}

//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">
//                         Status
//                       </label>

//                       <select
//                         name="status"
//                         className="form-select"
//                         value={form.status}
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                         }}
//                       >
//                         <option value="PENDING">
//                           Pending
//                         </option>

//                         <option value="SCHEDULED">
//                           Scheduled
//                         </option>

//                         <option value="COMPLETED">
//                           Completed
//                         </option>
//                       </select>
//                     </div>

//                     {/* REMARKS */}

//                     <div className="col-12">
//                       <label className="form-label fw-semibold">
//                         Remarks
//                       </label>

//                       <textarea
//                         name="remarks"
//                         rows="4"
//                         className="form-control"
//                         placeholder="Enter teacher remarks..."
//                         value={form.remarks}
//                         onChange={handleFormChange}
//                         style={{
//                           borderRadius: "9px",
//                           border:
//                             "1px solid #dbe3ef",
//                           resize: "vertical",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* MODAL FOOTER */}

//               <div
//                 className="px-3 px-md-4 py-3 d-flex justify-content-end gap-2"
//                 style={{
//                   borderTop: "1px solid #e2e8f0",
//                   background: "#fafcff",
//                 }}
//               >
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() =>
//                     setShowModal(false)
//                   }
//                   style={{
//                     border:
//                       "1px solid #dbe3ef",
//                     background: "#fff",
//                     borderRadius: "9px",
//                     padding: "8px 18px",
//                   }}
//                 >
//                   Close
//                 </button>

//                 {modalMode !== "view" && (
//                   <button
//                     type="button"
//                     className="btn text-white d-flex align-items-center gap-2"
//                     onClick={handleSavePTM}
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#2563eb,#3b82f6)",
//                       border: "none",
//                       borderRadius: "9px",
//                       padding: "8px 18px",
//                       boxShadow:
//                         "0 5px 14px rgba(37,99,235,.18)",
//                     }}
//                   >
//                     {modalMode === "edit" ? (
//                       <>
//                         <LuPencil size={16} />
//                         Update PTM
//                       </>
//                     ) : (
//                       <>
//                         <LuCalendarDays size={16} />
//                         Schedule PTM
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StudentPTM;



import React, { useEffect, useMemo, useState } from "react";
import {
  LuCalendarDays,
  LuClock3,
  LuEye,
  LuMapPin,
  LuSearch,
  LuUsers,
  LuVideo,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 5;

const StudentPTM = () => {
  const { standards, sections, sessions } = useMasters();

  const [ptms, setPtms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPTM, setSelectedPTM] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  /* =========================================================
     FETCH PTM
  ========================================================= */

  useEffect(() => {
    if (!user?.schoolId || !token) return;

    const fetchPTM = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/ptm/school?schoolId=${user.schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPtms(response.data || []);
      } catch (error) {
        console.error("Error fetching PTM:", error);
        setPtms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPTM();
  }, [user?.schoolId, token]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getName = (value) => {
    if (!value) return "";

    if (typeof value === "string") return value;

    return (
      value.name ||
      value.label ||
      value.value ||
      value.displayName ||
      ""
    );
  };

  const getClassName = (ptm) => {
    return (
      ptm.studentClass ||
      ptm.className ||
      ptm.standard ||
      getName(ptm.class) ||
      "-"
    );
  };

  const getSectionName = (ptm) => {
    return (
      ptm.section ||
      ptm.sectionName ||
      getName(ptm.sectionObj) ||
      "-"
    );
  };

  const getSessionName = (ptm) => {
    return (
      ptm.academicYear ||
      ptm.session ||
      ptm.sessionName ||
      getName(ptm.sessionObj) ||
      "-"
    );
  };

  const getTeacherName = (ptm) => {
    return (
      ptm.teacherName ||
      ptm.teacher?.name ||
      ptm.teacher?.fullName ||
      "-"
    );
  };

  const getMeetingType = (ptm) => {
    return (
      ptm.meetingType ||
      ptm.type ||
      "SCHOOL"
    );
  };

  const getStatus = (ptm) => {
    return (
      ptm.status ||
      "SCHEDULED"
    );
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredPTMs = useMemo(() => {
    let data = [...ptms];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((ptm) => {
        const title = (
          ptm.title ||
          ptm.ptmTitle ||
          ptm.name ||
          ""
        ).toLowerCase();

        const teacher = getTeacherName(ptm).toLowerCase();

        const venue = (
          ptm.venue ||
          ptm.location ||
          ""
        ).toLowerCase();

        return (
          title.includes(keyword) ||
          teacher.includes(keyword) ||
          venue.includes(keyword)
        );
      });
    }

    if (selectedClass) {
      data = data.filter(
        (ptm) => getClassName(ptm) === selectedClass
      );
    }

    if (selectedSection) {
      data = data.filter(
        (ptm) => getSectionName(ptm) === selectedSection
      );
    }

    if (selectedSession) {
      data = data.filter(
        (ptm) => getSessionName(ptm) === selectedSession
      );
    }

    data.sort((a, b) => {
      const dateA = new Date(
        a.date ||
          a.ptmDate ||
          a.meetingDate ||
          "9999-12-31"
      );

      const dateB = new Date(
        b.date ||
          b.ptmDate ||
          b.meetingDate ||
          "9999-12-31"
      );

      return dateA - dateB;
    });

    return data;
  }, [
    ptms,
    search,
    selectedClass,
    selectedSection,
    selectedSession,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPTMs.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPTMs = filteredPTMs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalPTMs = filteredPTMs.length;

  const upcomingPTMs = filteredPTMs.filter((ptm) => {
    const date = new Date(
      ptm.date ||
        ptm.ptmDate ||
        ptm.meetingDate
    );

    return date >= new Date();
  }).length;

  const completedPTMs = filteredPTMs.filter(
    (ptm) =>
      String(getStatus(ptm)).toUpperCase() ===
      "COMPLETED"
  ).length;

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSession("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
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
                    flexShrink: 0,
                  }}
                >
                  <LuCalendarDays size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Parent Teacher Meeting
                  </h5>

                  <div className="text-muted small">
                    Student Management&nbsp; / &nbsp;PTM
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <MdOutlineSchool className="me-1" />
                Student PTM
              </span>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home&nbsp; › &nbsp;Student Management&nbsp; › &nbsp;
              <span className="text-primary fw-semibold">
                PTM
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h5
                className="mb-1 fw-bold"
                style={{ color: "#1e3a8a" }}
              >
                PTM Schedule
              </h5>

              <small className="text-muted">
                View your scheduled parent teacher meetings
              </small>
            </div>

            <div
              className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <LuCalendarDays
                size={17}
                style={{ color: "#2563eb" }}
              />

              <span
                className="fw-semibold"
                style={{ color: "#475569" }}
              >
                {totalPTMs} PTM
                {totalPTMs !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="row g-3 mb-4">
            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-4 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Total PTM
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalPTMs}
                    </h3>

                    <small style={{ opacity: 0.75 }}>
                      Available meetings
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuCalendarDays size={25} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-4 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#059669,#10b981)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(5,150,105,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Upcoming
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {upcomingPTMs}
                    </h3>

                    <small style={{ opacity: 0.75 }}>
                      Upcoming meetings
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuClock3 size={25} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div
                className="rounded-4 p-3 h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(124,58,237,.18)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Completed
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {completedPTMs}
                    </h3>

                    <small style={{ opacity: 0.75 }}>
                      Previous meetings
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuUsers size={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #dbeafe",
                  }}
                >
                  <LuSearch size={18} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Search & Filter
                  </h6>

                  <small className="text-muted">
                    Find your PTM quickly
                  </small>
                </div>
              </div>

              {(search ||
                selectedClass ||
                selectedSection ||
                selectedSession) && (
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={clearFilters}
                  style={{
                    color: "#dc2626",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Search
                </label>

                <div className="position-relative">
                  <LuSearch
                    size={17}
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search PTM..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      paddingLeft: "38px",
                      borderRadius: "9px",
                      border:
                        "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Classes
                  </option>

                  {standards?.map((standard) => {
                    const value =
                      standard.name ||
                      standard.value ||
                      standard;

                    return (
                      <option
                        key={
                          standard.id ||
                          value
                        }
                        value={value}
                      >
                        {standard.label ||
                          standard.name ||
                          standard.value ||
                          standard}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections?.map((section) => {
                    const value =
                      section.name ||
                      section.value ||
                      section;

                    return (
                      <option
                        key={
                          section.id ||
                          value
                        }
                        value={value}
                      >
                        {section.label ||
                          section.name ||
                          section.value ||
                          section}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Academic Session
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions?.map((session) => {
                    const value =
                      session.name ||
                      session.value ||
                      session;

                    return (
                      <option
                        key={
                          session.id ||
                          value
                        }
                        value={value}
                      >
                        {session.label ||
                          session.name ||
                          session.value ||
                          session}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h6
                className="fw-bold mb-1"
                style={{ color: "#1e293b" }}
              >
                PTM Records
              </h6>

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredPTMs.length}
                </strong>{" "}
                meeting
                {filteredPTMs.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {filteredPTMs.length} Records
            </span>
          </div>

          {/* =================================================
              PREMIUM TABLE
          ================================================= */}

          <div
            className="table-responsive rounded-4"
            style={{
              border: "1px solid #dbe3ef",
              boxShadow:
                "0 8px 24px rgba(15,23,42,.06)",
              overflow: "hidden",
            }}
          >
            <table
              className="table align-middle mb-0"
              style={{
                minWidth: "1050px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg,#172554,#1e3a8a,#2563eb)",
                    color: "#fff",
                  }}
                >
                  <th
                    className="px-3 py-3"
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    PTM
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Date
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Time
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Class
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Section
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Teacher
                  </th>

                  <th
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="text-center"
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".3px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5"
                    >
                      <div
                        className="spinner-border"
                        style={{
                          color: "#2563eb",
                          width: "28px",
                          height: "28px",
                        }}
                      />

                      <div className="text-muted mt-2">
                        Loading PTM...
                      </div>
                    </td>
                  </tr>
                ) : paginatedPTMs.length > 0 ? (
                  paginatedPTMs.map(
                    (ptm, index) => {
                      const title =
                        ptm.title ||
                        ptm.ptmTitle ||
                        ptm.name ||
                        "Parent Teacher Meeting";

                      const date =
                        ptm.date ||
                        ptm.ptmDate ||
                        ptm.meetingDate;

                      const startTime =
                        ptm.startTime ||
                        ptm.fromTime ||
                        ptm.time ||
                        "-";

                      const endTime =
                        ptm.endTime ||
                        ptm.toTime ||
                        "";

                      const status =
                        String(
                          getStatus(ptm)
                        ).toUpperCase();

                      return (
                        <tr
                          key={
                            ptm.id ||
                            `${title}-${index}`
                          }
                          style={{
                            borderBottom:
                              "1px solid #eef2f7",
                          }}
                        >
                          <td className="px-3">
                            <span
                              className="fw-bold"
                              style={{
                                color: "#64748b",
                              }}
                            >
                              {(currentPage - 1) *
                                ITEMS_PER_PAGE +
                                index +
                                1}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                }}
                              >
                                <LuCalendarDays
                                  size={19}
                                />
                              </div>

                              <div>
                                <div className="fw-bold text-dark">
                                  {title}
                                </div>

                                <small className="text-muted">
                                  {getMeetingType(
                                    ptm
                                  )}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="fw-semibold text-dark">
                              {formatDate(date)}
                            </div>
                          </td>

                          <td>
                            <div
                              className="d-flex align-items-center gap-1"
                              style={{
                                color:
                                  "#475569",
                              }}
                            >
                              <LuClock3
                                size={15}
                              />

                              <span>
                                {startTime}

                                {endTime &&
                                  endTime !==
                                    "-" &&
                                  ` - ${endTime}`}
                              </span>
                            </div>
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#f1f5f9",
                                color:
                                  "#334155",
                                border:
                                  "1px solid #e2e8f0",
                              }}
                            >
                              {getClassName(
                                ptm
                              )}
                            </span>
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  "#f5f3ff",
                                color:
                                  "#6d28d9",
                                border:
                                  "1px solid #ddd6fe",
                              }}
                            >
                              {getSectionName(
                                ptm
                              )}
                            </span>
                          </td>

                          <td>
                            <div className="fw-semibold text-dark">
                              {getTeacherName(
                                ptm
                              )}
                            </div>
                          </td>

                          <td>
                            {status ===
                            "COMPLETED" ? (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#ecfdf5",
                                  color:
                                    "#047857",
                                  border:
                                    "1px solid #a7f3d0",
                                }}
                              >
                                Completed
                              </span>
                            ) : status ===
                              "CANCELLED" ? (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#fef2f2",
                                  color:
                                    "#dc2626",
                                  border:
                                    "1px solid #fecaca",
                                }}
                              >
                                Cancelled
                              </span>
                            ) : (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                Scheduled
                              </span>
                            )}
                          </td>

                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm d-inline-flex align-items-center gap-1"
                              onClick={() =>
                                setSelectedPTM(
                                  ptm
                                )
                              }
                              style={{
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                border:
                                  "1px solid #bfdbfe",
                                borderRadius:
                                  "8px",
                                padding:
                                  "7px 12px",
                              }}
                            >
                              <LuEye size={15} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5"
                    >
                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "#f1f5f9",
                          color:
                            "#94a3b8",
                        }}
                      >
                        <LuCalendarDays
                          size={27}
                        />
                      </div>

                      <h6 className="text-muted">
                        No PTM records found
                      </h6>

                      <small className="text-secondary">
                        Try changing your filters.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">
            <small className="text-muted">
              Page{" "}
              <strong>{currentPage}</strong>{" "}
              of{" "}
              <strong>{totalPages}</strong>
            </small>

            <div className="d-flex gap-2 align-items-center">
              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (p) => p - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === 1
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <LuChevronLeft size={16} />
                Previous
              </button>

              <div className="d-flex gap-1">
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    style={
                      currentPage === page
                        ? {
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            minWidth: "34px",
                          }
                        : {
                            background: "#fff",
                            color: "#475569",
                            border:
                              "1px solid #dbe3ef",
                            borderRadius: "8px",
                            minWidth: "34px",
                          }
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (p) => p + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === totalPages
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                Next
                <LuChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PTM DETAIL MODAL
      ===================================================== */}

      {selectedPTM && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background:
              "rgba(15,23,42,.55)",
            zIndex: 1055,
            backdropFilter: "blur(4px)",
            padding: "15px",
          }}
          onClick={() =>
            setSelectedPTM(null)
          }
        >
          <div
            className="bg-white rounded-4 shadow-lg"
            style={{
              width: "100%",
              maxWidth: "620px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div
              className="p-4"
              style={{
                background:
                  "linear-gradient(135deg,#172554,#2563eb)",
                color: "#fff",
              }}
            >
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div
                    className="d-flex align-items-center gap-2 mb-2"
                    style={{ opacity: 0.85 }}
                  >
                    <LuCalendarDays
                      size={18}
                    />

                    <small>
                      Parent Teacher Meeting
                    </small>
                  </div>

                  <h5 className="fw-bold mb-1">
                    {selectedPTM.title ||
                      selectedPTM.ptmTitle ||
                      selectedPTM.name ||
                      "Parent Teacher Meeting"}
                  </h5>

                  <small style={{ opacity: 0.8 }}>
                    {getSessionName(
                      selectedPTM
                    )}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-sm d-flex align-items-center justify-content-center"
                  onClick={() =>
                    setSelectedPTM(null)
                  }
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9px",
                    border:
                      "1px solid rgba(255,255,255,.3)",
                    color: "#fff",
                    background:
                      "rgba(255,255,255,.12)",
                  }}
                >
                  <LuX size={18} />
                </button>
              </div>
            </div>

            {/* MODAL BODY */}

            <div className="p-4">
              <div className="row g-3">
                {/* DATE */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Date
                    </small>

                    <div className="d-flex align-items-center gap-2 fw-semibold">
                      <LuCalendarDays
                        size={17}
                        style={{
                          color: "#2563eb",
                        }}
                      />

                      {formatDate(
                        selectedPTM.date ||
                          selectedPTM.ptmDate ||
                          selectedPTM.meetingDate
                      )}
                    </div>
                  </div>
                </div>

                {/* TIME */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Time
                    </small>

                    <div className="d-flex align-items-center gap-2 fw-semibold">
                      <LuClock3
                        size={17}
                        style={{
                          color: "#2563eb",
                        }}
                      />

                      {selectedPTM.startTime ||
                        selectedPTM.fromTime ||
                        selectedPTM.time ||
                        "-"}

                      {(selectedPTM.endTime ||
                        selectedPTM.toTime) &&
                        ` - ${
                          selectedPTM.endTime ||
                          selectedPTM.toTime
                        }`}
                    </div>
                  </div>
                </div>

                {/* CLASS */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Class
                    </small>

                    <strong>
                      {getClassName(
                        selectedPTM
                      )}
                    </strong>
                  </div>
                </div>

                {/* SECTION */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Section
                    </small>

                    <strong>
                      {getSectionName(
                        selectedPTM
                      )}
                    </strong>
                  </div>
                </div>

                {/* TEACHER */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Teacher
                    </small>

                    <strong>
                      {getTeacherName(
                        selectedPTM
                      )}
                    </strong>
                  </div>
                </div>

                {/* MEETING TYPE */}

                <div className="col-md-6">
                  <div
                    className="rounded-3 p-3 h-100"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Meeting Type
                    </small>

                    <div className="d-flex align-items-center gap-2">
                      {String(
                        getMeetingType(
                          selectedPTM
                        )
                      ).toUpperCase() ===
                      "ONLINE" ? (
                        <LuVideo
                          size={17}
                          style={{
                            color:
                              "#2563eb",
                          }}
                        />
                      ) : (
                        <LuMapPin
                          size={17}
                          style={{
                            color:
                              "#2563eb",
                          }}
                        />
                      )}

                      <strong>
                        {getMeetingType(
                          selectedPTM
                        )}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* VENUE */}

                <div className="col-12">
                  <div
                    className="rounded-3 p-3"
                    style={{
                      background: "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <small className="text-muted d-block mb-1">
                      Venue / Meeting Link
                    </small>

                    <div className="fw-semibold">
                      {selectedPTM.venue ||
                        selectedPTM.location ||
                        selectedPTM.meetingLink ||
                        "-"}
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}

                {(selectedPTM.description ||
                  selectedPTM.instructions) && (
                  <div className="col-12">
                    <div
                      className="rounded-3 p-3"
                      style={{
                        background:
                          "#eff6ff",
                        border:
                          "1px solid #dbeafe",
                      }}
                    >
                      <small
                        className="d-block mb-1 fw-semibold"
                        style={{
                          color: "#2563eb",
                        }}
                      >
                        Instructions
                      </small>

                      <div className="text-muted">
                        {selectedPTM.description ||
                          selectedPTM.instructions}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div
              className="px-4 py-3 d-flex justify-content-end"
              style={{
                borderTop:
                  "1px solid #e2e8f0",
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={() =>
                  setSelectedPTM(null)
                }
                style={{
                  background:
                    "#f1f5f9",
                  color: "#475569",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: "9px",
                  padding:
                    "8px 18px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentPTM;
