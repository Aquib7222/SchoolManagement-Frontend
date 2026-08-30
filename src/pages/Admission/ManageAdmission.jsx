
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaEye,
//   FaUserEdit,
//   FaSearch,
//   FaHistory,
//   FaFilter,
// } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import axios from "../../api/axiosInstance";

// const ManageAdmission = () => {
//   const [admissions, setAdmissions] = useState([]);
//   const [openHistoryId, setOpenHistoryId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   /* =====================================================
//      FETCH ADMISSIONS
//   ===================================================== */

//   const fetchAdmissions = async () => {
//     if (!user?.schoolId) return;

//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `/api/admissions/school?schoolId=${user.schoolId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setAdmissions(response.data || []);
//     } catch (error) {
//       console.error("Error fetching admissions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdmissions();
//   }, [user?.schoolId]);

//   /* =====================================================
//      STATUS UPDATE
//   ===================================================== */

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `/api/admissions/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       await fetchAdmissions();
//     } catch (error) {
//       console.error("Status update failed:", error);

//       alert(
//         error.response?.data?.message ||
//           "Unable to update admission status."
//       );
//     }
//   };

//   /* =====================================================
//      DELETE ADMISSION
//   ===================================================== */

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this admission?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/admissions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAdmissions((prev) =>
//         prev.filter((item) => item.id !== id)
//       );

//       alert("Admission deleted successfully.");
//     } catch (error) {
//       console.error("Delete failed:", error);

//       alert(
//         error.response?.data?.message ||
//           "Unable to delete admission."
//       );
//     }
//   };

//   /* =====================================================
//      EDIT
//   ===================================================== */

//   const handleEdit = (id) => {
//     navigate(`/admission/edit/${id}`);
//   };

//   /* =====================================================
//      VIEW
//   ===================================================== */

//   const handleView = (id) => {
//     navigate(`/admission/view/${id}`);
//   };

//   /* =====================================================
//      STATUS COLOR
//   ===================================================== */

//   const getStatusStyle = (status) => {
//     switch ((status || "APPLIED").toUpperCase()) {
//       case "APPROVED":
//         return {
//           backgroundColor: "#198754",
//           color: "white",
//         };

//       case "REJECTED":
//         return {
//           backgroundColor: "#dc3545",
//           color: "white",
//         };

//       case "ENROLLED":
//         return {
//           backgroundColor: "#0dcaf0",
//           color: "#000",
//         };

//       case "FEE_PAID":
//         return {
//           backgroundColor: "#212529",
//           color: "white",
//         };

//       case "APPLIED":
//       default:
//         return {
//           backgroundColor: "#0d6efd",
//           color: "white",
//         };
//     }
//   };

//   /* =====================================================
//      FILTER
//   ===================================================== */

//   const filteredAdmissions = admissions.filter((a) => {
//     const fullName = `${a.firstName || ""} ${
//       a.middleName || ""
//     } ${a.lastName || ""}`.toLowerCase();

//     const admissionNumber = (
//       a.admissionNumber || ""
//     ).toLowerCase();

//     const fatherMobile = (
//       a.fatherMobile || ""
//     ).toLowerCase();

//     const search = searchTerm.toLowerCase();

//     const searchMatch =
//       fullName.includes(search) ||
//       admissionNumber.includes(search) ||
//       fatherMobile.includes(search);

//     const statusMatch =
//       filterStatus === "all" ||
//       (a.status || "APPLIED").toUpperCase() ===
//         filterStatus.toUpperCase();

//     return searchMatch && statusMatch;
//   });

//   /* =====================================================
//      COUNTS
//   ===================================================== */

//   const totalAdmissions = admissions.length;

//   const appliedCount = admissions.filter(
//     (a) => (a.status || "APPLIED").toUpperCase() === "APPLIED"
//   ).length;

//   const approvedCount = admissions.filter(
//     (a) => (a.status || "").toUpperCase() === "APPROVED"
//   ).length;

//   const enrolledCount = admissions.filter(
//     (a) => (a.status || "").toUpperCase() === "ENROLLED"
//   ).length;

//   /* =====================================================
//      RENDER
//   ===================================================== */

//   return (
//     <div className="container-fluid px-0">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div
//         className="shadow"
//         style={{
//           backgroundColor: "#ffffff",
//           margin: "10px",
//           borderRadius: "6px",
//           padding: "12px 15px",
//           color: "#1e3a8a",
//           borderLeft: "4px solid rgb(30, 58, 138)",
//         }}
//       >
//         <h6 className="mb-1">
//           <strong>Manage Admission</strong>
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "#555",
//                 }}
//               >
//                 Home
//               </a>
//             </li>

//             <li className="breadcrumb-item active">
//               Manage Admission
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =====================================================
//           SUMMARY CARDS
//       ===================================================== */}

//       <div className="row g-3 mx-1 mt-2">

//         <div className="col-xl-3 col-md-6">
//           <div
//             className="card border-0 shadow h-100"
//             style={{ borderRadius: "8px" }}
//           >
//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   backgroundColor: "#e8f1ff",
//                   color: "#0d6efd",
//                   fontSize: "20px",
//                 }}
//               >
//                 <FaUserEdit />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Total Admissions
//                 </small>

//                 <h5 className="mb-0 fw-bold">
//                   {totalAdmissions}
//                 </h5>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div
//             className="card border-0 shadow h-100"
//             style={{ borderRadius: "8px" }}
//           >
//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   backgroundColor: "#e7f1ff",
//                   color: "#0d6efd",
//                   fontSize: "20px",
//                 }}
//               >
//                 <FaHistory />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Applied
//                 </small>

//                 <h5 className="mb-0 fw-bold">
//                   {appliedCount}
//                 </h5>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div
//             className="card border-0 shadow h-100"
//             style={{ borderRadius: "8px" }}
//           >
//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   backgroundColor: "#e8f7ee",
//                   color: "#198754",
//                   fontSize: "20px",
//                 }}
//               >
//                 ✓
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Approved
//                 </small>

//                 <h5 className="mb-0 fw-bold">
//                   {approvedCount}
//                 </h5>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div
//             className="card border-0 shadow h-100"
//             style={{ borderRadius: "8px" }}
//           >
//             <div className="card-body d-flex align-items-center">

//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   backgroundColor: "#e4f8fb",
//                   color: "#0dcaf0",
//                   fontSize: "20px",
//                 }}
//               >
//                 ✓
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Enrolled
//                 </small>

//                 <h5 className="mb-0 fw-bold">
//                   {enrolledCount}
//                 </h5>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>

//       {/* =====================================================
//           TABLE CARD
//       ===================================================== */}

//       <div
//         className="mt-3 ms-2 me-2 bg-white rounded shadow"
//         style={{
//           padding: "15px",
//         }}
//       >

//         {/* =====================================================
//             FILTER HEADER
//         ===================================================== */}

//         <div
//           className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3"
//           style={{
//             borderBottom: "1px solid #e9ecef",
//           }}
//         >

//           <div className="d-flex align-items-center gap-2">
//             <div
//               style={{
//                 backgroundColor: "#1e3a8a",
//                 color: "white",
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "6px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <FaFilter />
//             </div>

//             <div>
//               <h6 className="mb-0 fw-bold">
//                 Admission List
//               </h6>

//               <small className="text-muted">
//                 Manage and track student admissions
//               </small>
//             </div>
//           </div>

//           <button
//             className="btn text-white"
//             style={{
//               backgroundColor: "rgb(30, 58, 138)",
//             }}
//             onClick={() =>
//               navigate("/admission/new_admission/add")
//             }
//           >
//             + Add Admission
//           </button>

//         </div>

//         {/* =====================================================
//             SEARCH FILTER
//         ===================================================== */}

//         <div className="row g-2 mb-3">

//           <div className="col-lg-5 col-md-6">
//             <div className="input-group">

//               <span
//                 className="input-group-text bg-white"
//                 style={{
//                   borderRight: "0",
//                 }}
//               >
//                 <FaSearch className="text-muted" />
//               </span>

//               <input
//                 type="search"
//                 className="form-control"
//                 placeholder="Search by name, admission no or mobile..."
//                 value={searchTerm}
//                 onChange={(e) =>
//                   setSearchTerm(e.target.value)
//                 }
//                 style={{
//                   borderLeft: "0",
//                 }}
//               />

//             </div>
//           </div>

//           <div className="col-lg-3 col-md-4">

//             <select
//               className="form-select"
//               value={filterStatus}
//               onChange={(e) =>
//                 setFilterStatus(e.target.value)
//               }
//             >
//               <option value="all">
//                 All Status
//               </option>

//               <option value="APPLIED">
//                 Applied
//               </option>

//               <option value="APPROVED">
//                 Approved
//               </option>

//               <option value="REJECTED">
//                 Rejected
//               </option>

//               <option value="ENROLLED">
//                 Enrolled
//               </option>

//               <option value="FEE_PAID">
//                 Fee Paid
//               </option>
//             </select>

//           </div>

//           <div className="col-lg-4 col-md-2 d-flex align-items-center">

//             <span className="text-muted small">
//               Showing{" "}
//               <strong className="text-dark">
//                 {filteredAdmissions.length}
//               </strong>{" "}
//               of{" "}
//               <strong className="text-dark">
//                 {admissions.length}
//               </strong>{" "}
//               admissions
//             </span>

//           </div>

//         </div>

//         {/* =====================================================
//             TABLE
//         ===================================================== */}

//         <div className="table-responsive">

//           <table
//             className="table table-hover align-middle mb-0"
//             style={{
//               minWidth: "1250px",
//             }}
//           >

//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#1e3a8a",
//                   color: "white",
//                 }}
//               >
//                 <th className="text-center">
//                   S.No
//                 </th>

//                 <th>
//                   Student
//                 </th>

//                 <th>
//                   Admission No
//                 </th>

//                 <th>
//                   Class
//                 </th>

//                 <th>
//                   Session
//                 </th>

//                 <th>
//                   Father Name
//                 </th>

//                 <th>
//                   Mother Name
//                 </th>

//                 <th>
//                   Mobile
//                 </th>

//                 <th>
//                   Applied Date
//                 </th>

//                 <th className="text-center">
//                   Status
//                 </th>

//                 <th className="text-center">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>

//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan="11"
//                     className="text-center py-5"
//                   >
//                     <div
//                       className="spinner-border text-primary"
//                       role="status"
//                     >
//                       <span className="visually-hidden">
//                         Loading...
//                       </span>
//                     </div>

//                     <div className="mt-2 text-muted">
//                       Loading admissions...
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredAdmissions.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="11"
//                     className="text-center py-5"
//                   >
//                     <div
//                       className="text-danger fw-semibold"
//                     >
//                       No admission data found
//                     </div>

//                     <small className="text-muted">
//                       Try changing your search or status
//                       filter.
//                     </small>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredAdmissions.map((a, i) => {

//                   const status =
//                     (a.status || "APPLIED").toUpperCase();

//                   const isLocked = [
//                     "APPROVED",
//                     "ENROLLED",
//                     "FEE_PAID",
//                   ].includes(status);

//                   return (
//                     <>

//                       {/* ================= MAIN ROW ================= */}

//                       <tr key={a.id}>

//                         <td className="text-center fw-semibold">
//                           {i + 1}
//                         </td>

//                         <td>
//                           <div className="d-flex align-items-center">

//                             <div
//                               className="rounded-circle d-flex align-items-center justify-content-center me-2"
//                               style={{
//                                 width: "38px",
//                                 height: "38px",
//                                 backgroundColor: "#e8eefc",
//                                 color: "#1e3a8a",
//                                 fontWeight: "600",
//                               }}
//                             >
//                               {(
//                                 a.firstName?.charAt(0) ||
//                                 "S"
//                               ).toUpperCase()}
//                             </div>

//                             <div>

//                               <div className="fw-semibold">
//                                 {[
//                                   a.firstName,
//                                   a.middleName,
//                                   a.lastName,
//                                 ]
//                                   .filter(Boolean)
//                                   .join(" ") || "-"}
//                               </div>

//                               <small className="text-muted">
//                                 {a.email || "No email"}
//                               </small>

//                             </div>

//                           </div>
//                         </td>

//                         <td>
//                           <span
//                             className="fw-semibold"
//                             style={{
//                               color: "#1e3a8a",
//                             }}
//                           >
//                             {a.admissionNumber || "-"}
//                           </span>
//                         </td>

//                         <td>
//                           {a.studentClass ||
//                             a.class ||
//                             "-"}
//                         </td>

//                         <td>
//                           {a.academicYear || "-"}
//                         </td>

//                         <td>
//                           {a.fatherName || "-"}
//                         </td>

//                         <td>
//                           {a.motherName || "-"}
//                         </td>

//                         <td>
//                           {a.fatherMobile ||
//                             a.preferredNo ||
//                             "-"}
//                         </td>

//                         <td>
//                           {a.today ||
//                             a.appliedDate ||
//                             "-"}
//                         </td>

//                         {/* ================= STATUS ================= */}

//                         <td className="text-center">

//                           <select
//                             className="form-select form-select-sm fw-semibold"
//                             value={status}
//                             disabled={isLocked}
//                             onChange={(e) =>
//                               updateStatus(
//                                 a.id,
//                                 e.target.value
//                               )
//                             }
//                             style={{
//                               ...getStatusStyle(status),
//                               border: "none",
//                               minWidth: "115px",
//                               cursor: isLocked
//                                 ? "not-allowed"
//                                 : "pointer",
//                             }}
//                           >

//                             <option value="APPLIED">
//                               Applied
//                             </option>

//                             <option value="APPROVED">
//                               Approved
//                             </option>

//                             <option value="ENROLLED">
//                               Enrolled
//                             </option>

//                             <option value="FEE_PAID">
//                               Fee Paid
//                             </option>

//                             <option value="REJECTED">
//                               Rejected
//                             </option>

//                           </select>

//                         </td>

//                         {/* ================= ACTIONS ================= */}

//                         <td>

//                           <div className="d-flex justify-content-center gap-1">

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-primary"
//                               title="View"
//                               onClick={() =>
//                                 handleView(a.id)
//                               }
//                             >
//                               <FaEye />
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-success"
//                               title="Edit"
//                               onClick={() =>
//                                 handleEdit(a.id)
//                               }
//                             >
//                               <FaUserEdit />
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-danger"
//                               title="Delete"
//                               onClick={() =>
//                                 handleDelete(a.id)
//                               }
//                             >
//                               <RiDeleteBin6Fill />
//                             </button>

//                             {a.statusHistory?.length > 0 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-secondary"
//                                 title="Status History"
//                                 onClick={() =>
//                                   setOpenHistoryId(
//                                     openHistoryId === a.id
//                                       ? null
//                                       : a.id
//                                   )
//                                 }
//                               >
//                                 <FaHistory />
//                               </button>
//                             )}

//                           </div>

//                         </td>

//                       </tr>

//                       {/* ================= HISTORY ================= */}

//                       {openHistoryId === a.id && (
//                         <tr key={`${a.id}-history`}>
//                           <td colSpan="11">

//                             <div
//                               className="p-3 rounded"
//                               style={{
//                                 backgroundColor:
//                                   "#f8f9fa",
//                                 borderLeft:
//                                   "4px solid #1e3a8a",
//                               }}
//                             >

//                               <div className="fw-bold mb-2">
//                                 <FaHistory className="me-2" />
//                                 Status History
//                               </div>

//                               {a.statusHistory?.length > 0 ? (
//                                 <div>

//                                   {a.statusHistory.map(
//                                     (h, idx) => (
//                                       <div
//                                         key={idx}
//                                         className="d-flex align-items-center gap-2 mb-2"
//                                       >

//                                         <span
//                                           className="badge"
//                                           style={getStatusStyle(
//                                             h.status?.name
//                                           )}
//                                         >
//                                           {h.status?.name ||
//                                             "-"}
//                                         </span>

//                                         <span>
//                                           Updated by{" "}
//                                           <strong>
//                                             {h.updatedBy ||
//                                               "System"}
//                                           </strong>
//                                         </span>

//                                         <span className="text-muted">
//                                           {h.updatedAt
//                                             ?.replace(
//                                               "T",
//                                               " "
//                                             ) || ""}
//                                         </span>

//                                       </div>
//                                     )
//                                   )}

//                                 </div>
//                               ) : (
//                                 <span className="text-muted">
//                                   No status history available.
//                                 </span>
//                               )}

//                             </div>

//                           </td>
//                         </tr>
//                       )}

//                     </>
//                   );
//                 })
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ManageAdmission;



import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaUserEdit,
  FaSearch,
  FaHistory,
  FaFilter,
  FaUsers,
  FaGraduationCap,
  FaRedo,
  FaUserGraduate,
  
  FaCheckCircle,
} from "react-icons/fa";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoChevronDownOutline } from "react-icons/io5";

import axiosInstance from "../../api/axiosInstance";
import { FaCalendarDays } from "react-icons/fa6";

const ManageAdmission = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [admissions, setAdmissions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);

  const [openHistoryId, setOpenHistoryId] = useState(null);

  /* =========================================================
     FETCH ADMISSIONS
  ========================================================= */

  const loadAdmissions = async () => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/admissions/school?schoolId=${schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissions(response.data || []);
    } catch (error) {
      console.error("Admission Error:", error);

      setAdmissions([]);

      alert(
        error?.response?.data?.message ||
          "Unable to load admission records."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (schoolId) {
      loadAdmissions();
    }
  }, [schoolId]);

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateStatus = async (id, status) => {
    try {
      setStatusUpdating(id);

      await axiosInstance.put(
        `/api/admissions/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissions((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Status Update Error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to update admission status."
      );
    } finally {
      setStatusUpdating(null);
    }
  };

  /* =========================================================
     DELETE ADMISSION
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/admissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmissions((prev) =>
        prev.filter((item) => item.id !== id)
      );

      if (openHistoryId === id) {
        setOpenHistoryId(null);
      }

      alert("Admission deleted successfully.");
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to delete admission."
      );
    }
  };

  /* =========================================================
     VIEW
  ========================================================= */

  const handleView = (id) => {
    navigate(`/admission/view/${id}`);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (id) => {
    navigate(`/admission/edit/${id}`);
  };

  /* =========================================================
     STATUS CONFIG
  ========================================================= */

  const getStatusConfig = (status) => {
    switch ((status || "APPLIED").toUpperCase()) {
      case "APPROVED":
        return {
          bg: "#e8f7ee",
          color: "#198754",
          dot: "#198754",
        };

      case "REJECTED":
        return {
          bg: "#fdeaea",
          color: "#dc3545",
          dot: "#dc3545",
        };

      case "ENROLLED":
        return {
          bg: "#e7f5ff",
          color: "#087990",
          dot: "#0dcaf0",
        };

      case "FEE_PAID":
        return {
          bg: "#eef0f2",
          color: "#343a40",
          dot: "#343a40",
        };

      case "APPLIED":
      default:
        return {
          bg: "#e8f1ff",
          color: "#0d6efd",
          dot: "#0d6efd",
        };
    }
  };

  /* =========================================================
     STATUS LABEL
  ========================================================= */

  const getStatusLabel = (status) => {
    switch ((status || "APPLIED").toUpperCase()) {
      case "FEE_PAID":
        return "Fee Paid";

      case "APPROVED":
        return "Approved";

      case "REJECTED":
        return "Rejected";

      case "ENROLLED":
        return "Enrolled";

      case "APPLIED":
      default:
        return "Applied";
    }
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = String(date).substring(0, 10);

    const parts = value.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((item) => {
      const studentName = [
        item.firstName,
        item.middleName,
        item.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const admissionNumber = String(
        item.admissionNumber || ""
      ).toLowerCase();

      const fatherMobile = String(
        item.fatherMobile || ""
      ).toLowerCase();

      const motherMobile = String(
        item.motherMobile || ""
      ).toLowerCase();

      const search = searchTerm.trim().toLowerCase();

      const searchMatch =
        !search ||
        studentName.includes(search) ||
        admissionNumber.includes(search) ||
        fatherMobile.includes(search) ||
        motherMobile.includes(search);

      const itemStatus = (
        item.status || "APPLIED"
      ).toUpperCase();

      const statusMatch =
        filterStatus === "all" ||
        itemStatus === filterStatus.toUpperCase();

      return searchMatch && statusMatch;
    });
  }, [admissions, searchTerm, filterStatus]);

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalAdmissions = admissions.length;

  const appliedCount = admissions.filter(
    (item) =>
      (item.status || "APPLIED").toUpperCase() ===
      "APPLIED"
  ).length;

  const approvedCount = admissions.filter(
    (item) =>
      (item.status || "").toUpperCase() ===
      "APPROVED"
  ).length;

  const enrolledCount = admissions.filter(
    (item) =>
      (item.status || "").toUpperCase() ===
      "ENROLLED"
  ).length;

  /* =========================================================
     RENDER
  ========================================================= */

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
                  <FaGraduationCap size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Manage Admissions
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Manage Admissions
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2 rounded-4 px-3"
                  onClick={() =>
                    navigate(
                      "/admission/new_admission/add"
                    )
                  }
                >
                  <span style={{ fontSize: "18px" }}>
                    +
                  </span>
                  Add Admission
                </button>
              </div>
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
              Home &nbsp;›&nbsp; Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Manage Admissions
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Admissions</span>

              <h3>{totalAdmissions}</h3>

              <small>
                Total admission applications
              </small>
            </div>
          </div>
        </div>

        {/* APPLIED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaFilter />
            </div>

            <div className="stat-content">
              <span>Applied</span>

              <h3>{appliedCount}</h3>

              <small>
                Applications awaiting processing
              </small>
            </div>
          </div>
        </div>

        {/* APPROVED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Approved</span>

              <h3>{approvedCount}</h3>

              <small>
                Approved admission applications
              </small>
            </div>
          </div>
        </div>

        {/* ENROLLED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Enrolled</span>

              <h3>{enrolledCount}</h3>

              <small>
                Successfully enrolled students
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER CARD
      ===================================================== */}

      <div className="ms-2 me-2 mt-4">
        <div className="card border-0 shadow rounded-4">

          {/* FILTER HEADER */}

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

              <div>
                <h6 className="mb-1 fw-bold">
                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />
                  Admission Search
                </h6>

                <small className="text-muted">
                  Search and filter admission records
                </small>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#e9f7ef",
                  color: "#198754",
                }}
              >
                {filteredAdmissions.length} Records
              </span>
            </div>
          </div>

          {/* FILTER BODY */}

          <div className="card-body p-3">

            <div className="row g-3">

              {/* SEARCH */}

              <div className="col-12 col-md-7 col-xl-7">
                <label className="form-label fw-semibold small">
                  Search Admission
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <FaSearch
                      className="text-primary"
                      size={14}
                    />
                  </span>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by student name, admission no or mobile..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* STATUS */}

              <div className="col-12 col-md-5 col-xl-3">
                <label className="form-label fw-semibold small">
                  Admission Status
                </label>

                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value)
                  }
                >
                  <option value="all">
                    All Status
                  </option>

                  <option value="APPLIED">
                    Applied
                  </option>

                  <option value="APPROVED">
                    Approved
                  </option>

                  <option value="REJECTED">
                    Rejected
                  </option>

                  <option value="ENROLLED">
                    Enrolled
                  </option>

                  <option value="FEE_PAID">
                    Fee Paid
                  </option>
                </select>
              </div>

              {/* RESET */}

              <div className="col-12 col-xl-2 d-flex align-items-end">

                <button
                  type="button"
                  className="btn btn-light border w-100"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                >
                  <FaRedo
                    className="me-2"
                    size={12}
                  />
                  Reset
                </button>

              </div>
            </div>

            {/* SEARCH INFO */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">

              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {filteredAdmissions.length}
                </strong>{" "}
                of{" "}
                <strong className="text-dark">
                  {admissions.length}
                </strong>{" "}
                admissions
              </small>

              {(searchTerm ||
                filterStatus !== "all") && (
                <small className="text-primary">
                  Filter applied
                </small>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADMISSION LIST
      ===================================================== */}

      <div className="ms-2 me-2 mt-4 mb-4">

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          {/* TABLE HEADER */}

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom:
                "1px solid #eef0f2",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#e9f7ef",
                    color: "#198754",
                  }}
                >
                  <FaUsers
                    size={16}
                    className="text-primary"
                  />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Manage Admissions
                  </h6>

                  <small className="text-muted">
                    Manage all student admission applications
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#f4f6f8",
                    color: "#495057",
                  }}
                >
                  Showing{" "}
                  <strong>
                    {filteredAdmissions.length}
                  </strong>
                </span>

                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={loadAdmissions}
                  disabled={loading}
                >
                  <FaRedo
                    size={12}
                    className={
                      loading ? "spin" : ""
                    }
                  />

                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body p-0">

            <div
              className="table-responsive"
              style={{
                maxHeight: "650px",
                overflowY: "auto",
              }}
            >

              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1400px",
                }}
              >

                {/* TABLE HEAD */}

                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "#f8f9fa",
                  }}
                >
                  <tr
                    style={{
                      borderBottom:
                        "1px solid #dee2e6",
                    }}
                  >

                    <th
                      className="text-center"
                      style={{
                        width: "65px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        minWidth: "210px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      STUDENT
                    </th>

                    <th
                      style={{
                        minWidth: "145px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      ADMISSION NO
                    </th>

                    <th
                      style={{
                        minWidth: "240px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      PARENT DETAILS
                    </th>

                    <th
                      style={{
                        minWidth: "145px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      MOBILE
                    </th>

                    <th
                      style={{
                        minWidth: "130px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      CLASS
                    </th>

                    <th
                      style={{
                        minWidth: "135px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      SESSION
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "210px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      STATUS
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "130px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      APPLIED DATE
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "175px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      ACTION
                    </th>

                  </tr>
                </thead>

                {/* TABLE BODY */}

                <tbody>

                  {/* LOADING */}

                  {loading ? (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading admission records...
                        </div>

                      </td>
                    </tr>
                  ) : filteredAdmissions.length ===
                    0 ? (

                    /* EMPTY */

                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "58px",
                            height: "58px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaUserGraduate
                            size={24}
                            className="text-primary"
                          />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Admission Records
                        </h6>

                        <small className="text-muted">
                          No admission record matches
                          your search or selected status.
                        </small>

                      </td>
                    </tr>

                  ) : (

                    /* DATA */

                    filteredAdmissions.map(
                      (item, index) => {

                        const status =
                          (
                            item.status ||
                            "APPLIED"
                          ).toUpperCase();

                        const statusConfig =
                          getStatusConfig(status);

                        const studentName = [
                          item.firstName,
                          item.middleName,
                          item.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <>

                            {/* =================================
                                MAIN ROW
                            ================================= */}

                            <tr
                              key={item.id}
                              style={{
                                borderBottom:
                                  "1px solid #f0f1f2",
                              }}
                            >

                              {/* NUMBER */}

                              <td className="text-center">

                                <span
                                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    background:
                                      "#f4f6f8",
                                    color: "#6c757d",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {index + 1}
                                </span>

                              </td>

                              {/* STUDENT */}

                              <td>

                                <div className="d-flex align-items-center">

                                  <div
                                    className="d-flex align-items-center justify-content-center rounded-circle me-2 text-primary"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      minWidth: "40px",
                                      background:
                                        "#e9f7ef",
                                      fontWeight: "700",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {studentName
                                      ? studentName
                                          .charAt(0)
                                          .toUpperCase()
                                      : "S"}
                                  </div>

                                  <div>

                                    <div
                                      className="fw-semibold"
                                      style={{
                                        fontSize:
                                          "13px",
                                      }}
                                    >
                                      {studentName ||
                                        "N/A"}
                                    </div>

                                    <small className="text-muted">
                                      Student Applicant
                                    </small>

                                  </div>
                                </div>

                              </td>

                              {/* ADMISSION NUMBER */}

                              <td>

                                <span
                                  className="fw-bold text-primary"
                                  style={{
                                    fontSize:
                                      "13px",
                                  }}
                                >
                                  {item.admissionNumber ||
                                    "N/A"}
                                </span>

                              </td>

                              {/* PARENTS */}

                              <td>

                                <div
                                  style={{
                                    fontSize:
                                      "12px",
                                  }}
                                >

                                  <div className="mb-1">

                                    <span className="text-muted">
                                      Father:
                                    </span>{" "}

                                    <strong>
                                      {item.fatherName ||
                                        "N/A"}
                                    </strong>

                                  </div>

                                  <div>

                                    <span className="text-muted">
                                      Mother:
                                    </span>{" "}

                                    <strong>
                                      {item.motherName ||
                                        "N/A"}
                                    </strong>

                                  </div>

                                  {(item.fatherEmail ||
                                    item.motherEmail) && (
                                    <small className="text-muted d-block mt-1">
                                      {item.fatherEmail ||
                                        item.motherEmail}
                                    </small>
                                  )}

                                </div>

                              </td>

                              {/* MOBILE */}

                              <td>

                                <div
                                  className="fw-semibold"
                                  style={{
                                    fontSize:
                                      "13px",
                                  }}
                                >
                                  {item.fatherMobile ||
                                    item.motherMobile ||
                                    "N/A"}
                                </div>

                              </td>

                              {/* CLASS */}

                              <td>

                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    background:
                                      "#f4f6f8",
                                    color: "#495057",
                                    border:
                                      "1px solid #e1e5e8",
                                    fontWeight: "600",
                                    padding:
                                      "6px 10px",
                                  }}
                                >
                                  {item.studentClass ||
                                    item.class ||
                                    "N/A"}
                                </span>

                              </td>

                              {/* SESSION */}

                              <td>

                                <span
                                  className="badge rounded-pill text-primary"
                                  style={{
                                    background:
                                      "#f1f8f4",
                                    border:
                                      "1px solid #d9eee1",
                                    fontWeight: "600",
                                    padding:
                                      "6px 10px",
                                  }}
                                >
                                  {item.academicYear ||
                                    "N/A"}
                                </span>

                              </td>

                              {/* STATUS */}

                              <td className="text-center">

                                <div
                                  className="d-flex align-items-center rounded-pill mx-auto"
                                  style={{
                                    background:
                                      statusConfig.bg,
                                    color:
                                      statusConfig.color,
                                    padding:
                                      "4px 9px 4px 10px",
                                    minWidth:
                                      "195px",
                                    maxWidth:
                                      "210px",
                                  }}
                                >

                                  <span
                                    className="rounded-circle me-2"
                                    style={{
                                      width: "7px",
                                      height: "7px",
                                      minWidth: "7px",
                                      background:
                                        statusConfig.dot,
                                    }}
                                  />

                                  <select
                                    value={status}
                                    disabled={
                                      statusUpdating ===
                                      item.id
                                    }
                                    onChange={(e) =>
                                      updateStatus(
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                    className="border-0 bg-transparent p-0 w-100"
                                    style={{
                                      color:
                                        statusConfig.color,
                                      fontWeight:
                                        "600",
                                      fontSize:
                                        "12px",
                                      outline:
                                        "none",
                                      cursor:
                                        statusUpdating ===
                                        item.id
                                          ? "wait"
                                          : "pointer",
                                    }}
                                  >

                                    <option value="APPLIED">
                                      Applied
                                    </option>

                                    <option value="APPROVED">
                                      Approved
                                    </option>

                                    <option value="ENROLLED">
                                      Enrolled
                                    </option>

                                    <option value="FEE_PAID">
                                      Fee Paid
                                    </option>

                                    <option value="REJECTED">
                                      Rejected
                                    </option>

                                  </select>

                                  {statusUpdating ===
                                  item.id ? (
                                    <span
                                      className="spinner-border spinner-border-sm ms-2"
                                      style={{
                                        width:
                                          "12px",
                                        height:
                                          "12px",
                                      }}
                                    />
                                  ) : (
                                    <IoChevronDownOutline
                                      size={13}
                                    />
                                  )}

                                </div>

                              </td>

                              {/* DATE */}

                              <td className="text-center">

                                <div
                                  className="d-flex align-items-center justify-content-center gap-1"
                                  style={{
                                    fontSize:
                                      "12px",
                                    color:
                                      "#495057",
                                    fontWeight:
                                      "500",
                                  }}
                                >

                                  <FaCalendarDays
                                    size={12}
                                    className="text-muted"
                                  />

                                  {formatDate(
                                    item.today ||
                                      item.appliedDate
                                  )}

                                </div>

                              </td>

                              {/* ACTIONS */}

                              <td className="text-center">

                                <div className="d-flex justify-content-center align-items-center gap-1">

                                  {/* VIEW */}

                                  <button
                                    type="button"
                                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      background:
                                        "#e8f1ff",
                                      color:
                                        "#0d6efd",
                                      border:
                                        "1px solid #cfe0ff",
                                    }}
                                    title="View Admission"
                                    onClick={() =>
                                      handleView(
                                        item.id
                                      )
                                    }
                                  >
                                    <FaEye size={12} />
                                  </button>

                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      background:
                                        "#e9f7ef",
                                      color:
                                        "#198754",
                                      border:
                                        "1px solid #cfe8d8",
                                    }}
                                    title="Edit Admission"
                                    onClick={() =>
                                      handleEdit(
                                        item.id
                                      )
                                    }
                                  >
                                    <FaUserEdit
                                      size={12}
                                    />
                                  </button>

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      background:
                                        "#fdeaea",
                                      color:
                                        "#dc3545",
                                      border:
                                        "1px solid #f5c2c7",
                                    }}
                                    title="Delete Admission"
                                    onClick={() =>
                                      handleDelete(
                                        item.id
                                      )
                                    }
                                  >
                                    <RiDeleteBin6Fill
                                      size={13}
                                    />
                                  </button>

                                  {/* HISTORY */}

                                  {item.statusHistory
                                    ?.length >
                                    0 && (
                                    <button
                                      type="button"
                                      className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                                      style={{
                                        width:
                                          "32px",
                                        height:
                                          "32px",
                                        background:
                                          "#f4f6f8",
                                        color:
                                          "#6c757d",
                                        border:
                                          "1px solid #dee2e6",
                                      }}
                                      title="Status History"
                                      onClick={() =>
                                        setOpenHistoryId(
                                          openHistoryId ===
                                            item.id
                                            ? null
                                            : item.id
                                        )
                                      }
                                    >
                                      <FaHistory
                                        size={12}
                                      />
                                    </button>
                                  )}

                                </div>

                              </td>

                            </tr>

                            {/* =================================
                                STATUS HISTORY
                            ================================= */}

                            {openHistoryId ===
                              item.id && (
                              <tr
                                key={`${item.id}-history`}
                              >
                                <td colSpan="10">

                                  <div
                                    className="p-3 rounded-3"
                                    style={{
                                      background:
                                        "#f8fafc",
                                      borderLeft:
                                        "4px solid #2563eb",
                                    }}
                                  >

                                    <div className="d-flex align-items-center mb-3">

                                      <div
                                        className="d-flex align-items-center justify-content-center rounded-2 me-2"
                                        style={{
                                          width:
                                            "32px",
                                          height:
                                            "32px",
                                          background:
                                            "#e8f1ff",
                                          color:
                                            "#0d6efd",
                                        }}
                                      >
                                        <FaHistory
                                          size={14}
                                        />
                                      </div>

                                      <div>

                                        <div className="fw-bold">
                                          Status History
                                        </div>

                                        <small className="text-muted">
                                          {studentName ||
                                            "Student"}{" "}
                                          —{" "}
                                          {item.admissionNumber ||
                                            "N/A"}
                                        </small>

                                      </div>

                                    </div>

                                    {item.statusHistory
                                      ?.length >
                                    0 ? (
                                      <div>

                                        {item.statusHistory.map(
                                          (
                                            history,
                                            historyIndex
                                          ) => {

                                            const historyStatus =
                                              history
                                                ?.status
                                                ?.name ||
                                              history?.status ||
                                              "APPLIED";

                                            const historyConfig =
                                              getStatusConfig(
                                                historyStatus
                                              );

                                            return (
                                              <div
                                                key={
                                                  history.id ||
                                                  historyIndex
                                                }
                                                className="d-flex align-items-center flex-wrap gap-2 mb-2 p-2 rounded-2 bg-white border"
                                              >

                                                <span
                                                  className="badge rounded-pill"
                                                  style={{
                                                    background:
                                                      historyConfig.bg,
                                                    color:
                                                      historyConfig.color,
                                                  }}
                                                >
                                                  <span
                                                    className="d-inline-block rounded-circle me-1"
                                                    style={{
                                                      width:
                                                        "6px",
                                                      height:
                                                        "6px",
                                                      background:
                                                        historyConfig.dot,
                                                    }}
                                                  />

                                                  {getStatusLabel(
                                                    historyStatus
                                                  )}
                                                </span>

                                                <span
                                                  className="text-muted small"
                                                >
                                                  Updated by
                                                </span>

                                                <strong className="small">
                                                  {history.updatedBy ||
                                                    "System"}
                                                </strong>

                                                {history.updatedAt && (
                                                  <>
                                                    <span className="text-muted">
                                                      •
                                                    </span>

                                                    <span className="text-muted small">
                                                      {String(
                                                        history.updatedAt
                                                      ).replace(
                                                        "T",
                                                        " "
                                                      )}
                                                    </span>
                                                  </>
                                                )}

                                              </div>
                                            );
                                          }
                                        )}

                                      </div>
                                    ) : (
                                      <small className="text-muted">
                                        No status history available.
                                      </small>
                                    )}

                                  </div>

                                </td>
                              </tr>
                            )}

                          </>
                        );
                      }
                    )
                  )}

                </tbody>

              </table>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {filteredAdmissions.length}
                </strong>{" "}
                admission(s)
              </small>

              <small className="text-muted">
                Total Admissions:{" "}
                <strong className="text-dark">
                  {admissions.length}
                </strong>
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          PAGE CSS
      ===================================================== */}

      <style>
        {`
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fbfdfc;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 7px;
            min-height: 40px;
            font-size: 13px;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.10);
          }

          .input-group-text {
            border-color: #dee2e6;
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .spin {
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .premium-stat-card {
            min-height: 125px;
            border-radius: 14px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: #fff;
            position: relative;
            overflow: hidden;
          }

          .premium-stat-card::after {
            content: "";
            position: absolute;
            right: -25px;
            top: -25px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            opacity: 0.07;
          }

          .premium-stat-card .stat-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 21px;
          }

          .premium-stat-card .stat-content {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .premium-stat-card .stat-content span {
            font-size: 12px;
            font-weight: 600;
            color: #6c757d;
            margin-bottom: 3px;
          }

          .premium-stat-card .stat-content h3 {
            margin: 0;
            font-size: 25px;
            font-weight: 700;
            color: #212529;
            line-height: 1.2;
          }

          .premium-stat-card .stat-content small {
            margin-top: 4px;
            color: #8a939b;
            font-size: 11px;
          }

          .stat-blue {
            border-left: 4px solid #2563eb;
          }

          .stat-blue .stat-icon {
            background: #e8f1ff;
            color: #2563eb;
          }

          .stat-green {
            border-left: 4px solid #198754;
          }

          .stat-green .stat-icon {
            background: #e8f7ee;
            color: #198754;
          }

          .stat-orange {
            border-left: 4px solid #f59f00;
          }

          .stat-orange .stat-icon {
            background: #fff4d6;
            color: #d97706;
          }

          .stat-red {
            border-left: 4px solid #dc3545;
          }

          .stat-red .stat-icon {
            background: #fdeaea;
            color: #dc3545;
          }

          @media (max-width: 768px) {

            .premium-stat-card {
              padding: 16px;
            }

            .premium-stat-card .stat-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
            }

            .premium-stat-card .stat-content h3 {
              font-size: 22px;
            }

            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ManageAdmission;

