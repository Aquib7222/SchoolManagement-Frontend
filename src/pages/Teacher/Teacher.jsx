

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaPlus,
//   FaSearch,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaUserTie,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import axios from "../../api/axiosInstance";

// const Teacher = () => {
//   const navigate = useNavigate();

//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [status, setStatus] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id;
//   const token = localStorage.getItem("token");

//   // =========================================================
//   // FETCH TEACHERS
//   // =========================================================

//   useEffect(() => {
//     if (!schoolId || !token) {
//       setError("School and token not found");
//       setLoading(false);
//       return;
//     }

//     const fetchTeachers = async () => {
//       try {
//         setLoading(true);

//         const response = await axios.get(
//           `/api/teachers?schoolId=${schoolId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setTeachers(response.data || []);
//       } catch (err) {
//         console.error("Error fetching teachers:", err);
//         setError("Failed to fetch teachers");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, [schoolId, token]);

//   // =========================================================
//   // FILTER
//   // =========================================================

//   useEffect(() => {
//     let filtered = [...teachers];

//     if (searchId.trim()) {
//       filtered = filtered.filter((teacher) =>
//         String(teacher.employeeId || "")
//           .toLowerCase()
//           .includes(searchId.trim().toLowerCase())
//       );
//     }

//     if (searchName.trim()) {
//       filtered = filtered.filter((teacher) =>
//         `${teacher.firstName || ""} ${teacher.middleName || ""} ${
//           teacher.lastName || ""
//         }`
//           .toLowerCase()
//           .includes(searchName.trim().toLowerCase())
//       );
//     }

//     if (status) {
//       filtered = filtered.filter(
//         (teacher) =>
//           String(teacher.status || "").toLowerCase() ===
//           status.toLowerCase()
//       );
//     }

//     setFilteredTeachers(filtered);
//     setCurrentPage(1);
//   }, [teachers, searchId, searchName, status]);

//   // =========================================================
//   // HANDLERS
//   // =========================================================

//   const handleAddTeacher = () => {
//     navigate("/teacher/add");
//   };

//   const handleEdit = (employeeId) => {
//     navigate(`/teacher/edit/${employeeId}`);
//   };

//   const handleView = (teacher) => {
//     navigate(`/teacher/profile/${teacher.employeeId}`, {
//       state: teacher,
//     });
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this teacher?"
//     );

//     if (!confirmDelete) return;

//     try {
//       // Agar backend delete API available hai to yahan use karo.
//       // await axios.delete(`/api/teachers/${id}`, {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });

//       setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));

//       alert("Teacher deleted successfully.");
//     } catch (error) {
//       console.error("Delete teacher error:", error);
//       alert("Failed to delete teacher.");
//     }
//   };

//   const clearFilters = () => {
//     setSearchId("");
//     setSearchName("");
//     setStatus("");
//   };

//   // =========================================================
//   // PAGINATION
//   // =========================================================

//   const totalPages = Math.ceil(
//     filteredTeachers.length / itemsPerPage
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;

//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const currentItems = filteredTeachers.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   // =========================================================
//   // STATUS BADGE
//   // =========================================================

//   const getStatusBadge = (status) => {
//     const value = String(status || "").toLowerCase();

//     if (value === "working" || value === "active") {
//       return (
//         <span className="badge bg-success px-3 py-2">
//           {status}
//         </span>
//       );
//     }

//     if (value === "resign" || value === "inactive") {
//       return (
//         <span className="badge bg-danger px-3 py-2">
//           {status}
//         </span>
//       );
//     }

//     return (
//       <span className="badge bg-secondary px-3 py-2">
//         {status || "N/A"}
//       </span>
//     );
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading) {
//     return (
//       <div className="container-fluid px-2 mt-3">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-body text-center py-5">
//             <div
//               className="spinner-border text-primary"
//               role="status"
//             />

//             <p className="mt-3 mb-0 text-muted">
//               Loading teachers...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================================================
//   // ERROR
//   // =========================================================

//   if (error) {
//     return (
//       <div className="container-fluid px-2 mt-3">
//         <div className="alert alert-danger shadow-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-3">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-body py-3">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <div>
//                 <div className="d-flex align-items-center gap-2">
//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                     }}
//                   >
//                     <FaUserTie size={18} />
//                   </div>

//                   <div>
//                     <h5 className="mb-0 fw-bold">
//                       Teacher
//                     </h5>

//                     <small className="text-muted">
//                       Manage all teachers
//                     </small>
//                   </div>
//                 </div>
//               </div>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item">
//                     <a
//                       href="/"
//                       className="text-decoration-none text-dark"
//                     >
//                       Home
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item active">
//                     Teacher
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SEARCH / FILTER CARD
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-3">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-header bg-white border-0 pt-3 px-3">
//             <div className="d-flex justify-content-between align-items-center">
//               <h6 className="fw-bold mb-0">
//                 <FaSearch className="text-primary me-2" />
//                 Search Teacher
//               </h6>

//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={clearFilters}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           <div className="card-body">
//             <div className="row g-3 align-items-end">
//               {/* Employee ID */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Employee ID
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter employee ID"
//                   value={searchId}
//                   onChange={(e) =>
//                     setSearchId(e.target.value)
//                   }
//                 />
//               </div>

//               {/* Teacher Name */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Teacher Name
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter teacher name"
//                   value={searchName}
//                   onChange={(e) =>
//                     setSearchName(e.target.value)
//                   }
//                 />
//               </div>

//               {/* Status */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Status
//                 </label>

//                 <select
//                   className="form-select"
//                   value={status}
//                   onChange={(e) =>
//                     setStatus(e.target.value)
//                   }
//                 >
//                   <option value="">All Status</option>
//                   <option value="Working">
//                     Working
//                   </option>
//                   <option value="Resign">
//                     Resign
//                   </option>
//                 </select>
//               </div>

//               {/* Add Button */}

//               <div className="col-xl-3 col-md-6">
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={handleAddTeacher}
//                 >
//                   <FaPlus className="me-2" />
//                   Add Teacher
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           TEACHER TABLE
//       ===================================================== */}

//       <div className="container-fluid px-2 mt-3 mb-4">
//         <div className="card border-0 shadow rounded-4">
//           {/* Table Header */}

//           <div className="card-header bg-white border-0 pt-3 px-3">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <div>
//                 <h6 className="fw-bold mb-1">
//                   Teacher List
//                 </h6>

//                 <small className="text-muted">
//                   Total Teachers: {filteredTeachers.length}
//                 </small>
//               </div>

//               <span className="badge bg-primary px-3 py-2">
//                 {filteredTeachers.length} Records
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table
//                 className="table table-hover table-bordered align-middle mb-0"
//                 style={{ minWidth: "1200px" }}
//               >
//                 <thead>
//                   <tr>
//                     <th
//                       className="bg-primary text-white text-center"
//                       style={{ width: "70px" }}
//                     >
//                       S.No
//                     </th>

//                     <th className="bg-primary text-white text-center">
//                       Photo
//                     </th>

//                     <th className="bg-primary text-white">
//                       Employee ID
//                     </th>

//                     <th className="bg-primary text-white">
//                       Teacher Name
//                     </th>

//                     <th className="bg-primary text-white">
//                       DOB
//                     </th>

//                     <th className="bg-primary text-white">
//                       Gender
//                     </th>

//                     <th className="bg-primary text-white">
//                       Address
//                     </th>

//                     <th className="bg-primary text-white">
//                       Contact
//                     </th>

//                     <th className="bg-primary text-white text-center">
//                       Status
//                     </th>

//                     <th
//                       className="bg-primary text-white text-center"
//                       style={{ width: "180px" }}
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {currentItems.length > 0 ? (
//                     currentItems.map((teacher, index) => (
//                       <tr key={teacher.id}>
//                         {/* S.No */}

//                         <td className="text-center fw-semibold">
//                           {indexOfFirstItem + index + 1}
//                         </td>

//                         {/* Photo */}

//                         <td className="text-center">
//                           {teacher.photo ? (
//                             <img
//                               src={teacher.photo}
//                               alt="Teacher"
//                               className="rounded-circle border"
//                               style={{
//                                 width: "55px",
//                                 height: "55px",
//                                 objectFit: "cover",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               className="rounded-circle bg-light border d-flex align-items-center justify-content-center mx-auto text-primary"
//                               style={{
//                                 width: "55px",
//                                 height: "55px",
//                               }}
//                             >
//                               <FaUserTie />
//                             </div>
//                           )}
//                         </td>

//                         {/* Employee ID */}

//                         <td>
//                           <span className="fw-semibold">
//                             {teacher.employeeId || "-"}
//                           </span>
//                         </td>

//                         {/* Name */}

//                         <td>
//                           <div className="fw-semibold text-primary">
//                             {teacher.firstName || ""}{" "}
//                             {teacher.middleName || ""}{" "}
//                             {teacher.lastName || ""}
//                           </div>
//                         </td>

//                         {/* DOB */}

//                         <td>
//                           {teacher.dob || "-"}
//                         </td>

//                         {/* Gender */}

//                         <td>
//                           {teacher.gender || "-"}
//                         </td>

//                         {/* Address */}

//                         <td>
//                           <span className="text-muted">
//                             {teacher.addressLine1 || ""}
//                             {teacher.addressLine2
//                               ? `, ${teacher.addressLine2}`
//                               : ""}
//                             {teacher.city
//                               ? `, ${teacher.city}`
//                               : ""}
//                           </span>
//                         </td>

//                         {/* Contact */}

//                         <td>
//                           {teacher.phoneNumber || "-"}
//                         </td>

//                         {/* Status */}

//                         <td className="text-center">
//                           {getStatusBadge(
//                             teacher.status
//                           )}
//                         </td>

//                         {/* Actions */}

//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <button
//                               className="btn btn-sm btn-outline-primary"
//                               title="View"
//                               onClick={() =>
//                                 handleView(teacher)
//                               }
//                             >
//                               <FaEye />
//                             </button>

//                             <button
//                               className="btn btn-sm btn-outline-warning"
//                               title="Edit"
//                               onClick={() =>
//                                 handleEdit(
//                                   teacher.employeeId
//                                 )
//                               }
//                             >
//                               <FaEdit />
//                             </button>

//                             <button
//                               className="btn btn-sm btn-outline-danger"
//                               title="Delete"
//                               onClick={() =>
//                                 handleDelete(
//                                   teacher.id
//                                 )
//                               }
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="10"
//                         className="text-center py-5"
//                       >
//                         <div className="text-muted">
//                           <FaUserTie
//                             size={35}
//                             className="mb-2 opacity-50"
//                           />

//                           <div className="fw-semibold">
//                             No Teachers Found
//                           </div>

//                           <small>
//                             Try changing your search
//                             filters.
//                           </small>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               PAGINATION
//           ================================================= */}

//           {filteredTeachers.length > 0 && (
//             <div className="card-footer bg-white border-0 py-3">
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//                 <small className="text-muted">
//                   Showing{" "}
//                   <strong>
//                     {indexOfFirstItem + 1}
//                   </strong>{" "}
//                   to{" "}
//                   <strong>
//                     {Math.min(
//                       indexOfLastItem,
//                       filteredTeachers.length
//                     )}
//                   </strong>{" "}
//                   of{" "}
//                   <strong>
//                     {filteredTeachers.length}
//                   </strong>{" "}
//                   teachers
//                 </small>

//                 <div className="d-flex align-items-center gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-primary"
//                     disabled={currentPage === 1}
//                     onClick={() =>
//                       setCurrentPage((prev) =>
//                         Math.max(prev - 1, 1)
//                       )
//                     }
//                   >
//                     <FaChevronLeft />
//                   </button>

//                   <span className="fw-semibold px-2">
//                     Page {currentPage} of{" "}
//                     {totalPages || 1}
//                   </span>

//                   <button
//                     className="btn btn-sm btn-outline-primary"
//                     disabled={
//                       currentPage === totalPages ||
//                       totalPages === 0
//                     }
//                     onClick={() =>
//                       setCurrentPage((prev) =>
//                         Math.min(
//                           prev + 1,
//                           totalPages
//                         )
//                       )
//                     }
//                   >
//                     <FaChevronRight />
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

// export default Teacher;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUserTie,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaCheckCircle,
  FaUserClock,
} from "react-icons/fa";

import {
  MdOutlineSchool,
  MdPeopleAlt,
} from "react-icons/md";

import axios from "../../api/axiosInstance";

const Teacher = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;
  const token = localStorage.getItem("token");

  // =========================================================
  // FETCH TEACHERS
  // =========================================================

  useEffect(() => {
    if (!schoolId || !token) {
      setError("School and token not found");
      setLoading(false);
      return;
    }

    const fetchTeachers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/teachers?schoolId=${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTeachers(response.data || []);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError("Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [schoolId, token]);

  // =========================================================
  // FILTER
  // =========================================================

  useEffect(() => {
    let filtered = [...teachers];

    if (searchId.trim()) {
      filtered = filtered.filter((teacher) =>
        String(teacher.employeeId || "")
          .toLowerCase()
          .includes(searchId.trim().toLowerCase())
      );
    }

    if (searchName.trim()) {
      filtered = filtered.filter((teacher) =>
        `${teacher.firstName || ""} ${
          teacher.middleName || ""
        } ${teacher.lastName || ""}`
          .toLowerCase()
          .includes(searchName.trim().toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(
        (teacher) =>
          String(teacher.status || "").toLowerCase() ===
          status.toLowerCase()
      );
    }

    setFilteredTeachers(filtered);
    setCurrentPage(1);
  }, [teachers, searchId, searchName, status]);

  // =========================================================
  // HANDLERS
  // =========================================================

  const handleAddTeacher = () => {
    navigate("/teacher/add");
  };

  const handleEdit = (employeeId) => {
    navigate(`/teacher/edit/${employeeId}`);
  };

  const handleView = (teacher) => {
    navigate(`/teacher/profile/${teacher.employeeId}`, {
      state: teacher,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      // Backend delete API available ho to uncomment:
      //
      // await axios.delete(`/api/teachers/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      setTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== id)
      );

      alert("Teacher deleted successfully.");
    } catch (error) {
      console.error("Delete teacher error:", error);
      alert("Failed to delete teacher.");
    }
  };

  const clearFilters = () => {
    setSearchId("");
    setSearchName("");
    setStatus("");
  };

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredTeachers.length / itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalTeachers = teachers.length;

  const workingTeachers = teachers.filter((teacher) => {
    const value = String(
      teacher.status || ""
    ).toLowerCase();

    return value === "working" || value === "active";
  }).length;

  const resignTeachers = teachers.filter((teacher) => {
    const value = String(
      teacher.status || ""
    ).toLowerCase();

    return value === "resign" || value === "inactive";
  }).length;

  const filteredCount = filteredTeachers.length;

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const getStatusBadge = (teacherStatus) => {
    const value = String(
      teacherStatus || ""
    ).toLowerCase();

    if (
      value === "working" ||
      value === "active"
    ) {
      return (
        <span
          className="badge rounded-pill px-3 py-2"
          style={{
            backgroundColor: "#dcfce7",
            color: "#15803d",
            border: "1px solid #bbf7d0",
          }}
        >
          <FaCheckCircle className="me-1" />
          {teacherStatus}
        </span>
      );
    }

    if (
      value === "resign" ||
      value === "inactive"
    ) {
      return (
        <span
          className="badge rounded-pill px-3 py-2"
          style={{
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          }}
        >
          {teacherStatus}
        </span>
      );
    }

    return (
      <span
        className="badge rounded-pill px-3 py-2"
        style={{
          backgroundColor: "#f1f5f9",
          color: "#475569",
          border: "1px solid #cbd5e1",
        }}
      >
        {teacherStatus || "N/A"}
      </span>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-2 mt-2">
        <div
          className="card border-0 shadow rounded-4"
          style={{
            border: "1px solid #dbeafe",
          }}
        >
          <div className="card-body text-center py-5">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 mx-auto mb-3"
              style={{
                width: "58px",
                height: "58px",
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "#fff",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,.22)",
              }}
            >
              <FaUserTie size={26} />
            </div>

            <div
              className="spinner-border text-primary"
              role="status"
            />

            <p className="mt-3 mb-0 text-muted">
              Loading teachers...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="mx-2 mt-3">
        <div
          className="card border-0 shadow rounded-4"
          style={{
            border: "1px solid #fecaca",
          }}
        >
          <div className="card-body">
            <div className="alert alert-danger mb-0 rounded-3">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

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
                  }}
                >
                  <FaUserTie size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Teacher Management
                  </h5>

                  <div className="text-muted small">
                    Staff &nbsp;/&nbsp; Teacher List
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool
                    className="me-1"
                  />
                  Teachers
                </span>
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
              Home &nbsp;›&nbsp; Staff &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Teacher
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow h-100">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>
                {totalTeachers.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Total registered teachers
              </small>
            </div>
          </div>
        </div>

        {/* WORKING */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow h-100">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Working Teachers</span>

              <h3>
                {workingTeachers.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Currently working
              </small>
            </div>
          </div>
        </div>

        {/* RESIGN */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow h-100">
            <div className="stat-icon">
              <FaUserClock />
            </div>

            <div className="stat-content">
              <span>Resigned Teachers</span>

              <h3>
                {resignTeachers.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Resigned / inactive
              </small>
            </div>
          </div>
        </div>

        {/* FILTERED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow h-100">
            <div className="stat-icon">
              <MdPeopleAlt />
            </div>

            <div className="stat-content">
              <span>Filtered Records</span>

              <h3>
                {filteredCount.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Matching current filters
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">
          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Teacher Filter
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Search and filter teacher records
                  </small>
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
                <FaUserTie className="me-1" />
                Teacher Search
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              {/* EMPLOYEE ID */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Employee ID
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter employee ID"
                    value={searchId}
                    onChange={(e) =>
                      setSearchId(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* TEACHER NAME */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Teacher Name
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaUserTie className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter teacher name"
                    value={searchName}
                    onChange={(e) =>
                      setSearchName(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* STATUS */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="">
                    All Status
                  </option>

                  <option value="Working">
                    Working
                  </option>

                  <option value="Resign">
                    Resign
                  </option>
                </select>
              </div>

              {/* ADD */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold d-md-block d-none">
                  &nbsp;
                </label>

                <button
                  className="btn w-100 rounded-3 px-3"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    border: "none",
                    boxShadow:
                      "0 6px 16px rgba(37,99,235,.18)",
                  }}
                  onClick={handleAddTeacher}
                >
                  <FaPlus className="me-2" />
                  Add Teacher
                </button>
              </div>
            </div>

            {/* FILTER ACTIONS */}

            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TEACHER TABLE
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-5">
          {/* TABLE HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUsers size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Teacher List
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Manage all teacher records
                  </small>
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
                {filteredTeachers.length} Records
              </span>
            </div>
          </div>

          {/* TABLE */}

          <div className="card-body px-0">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1250px",
                }}
              >
                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        minWidth: "70px",
                      }}
                    >
                      #
                    </th>

                    <th
                      style={{
                        minWidth: "100px",
                      }}
                    >
                      Photo
                    </th>

                    <th
                      style={{
                        minWidth: "140px",
                      }}
                    >
                      Employee ID
                    </th>

                    <th
                      className="text-start"
                      style={{
                        minWidth: "210px",
                      }}
                    >
                      Teacher Name
                    </th>

                    <th
                      style={{
                        minWidth: "120px",
                      }}
                    >
                      DOB
                    </th>

                    <th
                      style={{
                        minWidth: "100px",
                      }}
                    >
                      Gender
                    </th>

                    <th
                      className="text-start"
                      style={{
                        minWidth: "250px",
                      }}
                    >
                      Address
                    </th>

                    <th
                      style={{
                        minWidth: "150px",
                      }}
                    >
                      Contact
                    </th>

                    <th
                      style={{
                        minWidth: "130px",
                      }}
                    >
                      Status
                    </th>

                    <th
                      style={{
                        minWidth: "150px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="small">
                  {currentItems.length > 0 ? (
                    currentItems.map(
                      (teacher, index) => (
                        <tr key={teacher.id}>
                          {/* S.NO */}

                          <td className="text-center fw-semibold">
                            {indexOfFirstItem +
                              index +
                              1}
                          </td>

                          {/* PHOTO */}

                          <td className="text-center">
                            {teacher.photo ? (
                              <img
                                src={teacher.photo}
                                alt="Teacher"
                                className="rounded-circle border"
                                style={{
                                  width: "52px",
                                  height: "52px",
                                  objectFit:
                                    "cover",
                                  borderColor:
                                    "#bfdbfe",
                                }}
                              />
                            ) : (
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                style={{
                                  width: "52px",
                                  height: "52px",
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                <FaUserTie
                                  size={20}
                                />
                              </div>
                            )}
                          </td>

                          {/* EMPLOYEE ID */}

                          <td className="text-center">
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
                              {teacher.employeeId ||
                                "-"}
                            </span>
                          </td>

                          {/* NAME */}

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  flexShrink: 0,
                                }}
                              >
                                {teacher.firstName
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() ||
                                  "T"}
                              </div>

                              <div>
                                <div className="fw-semibold text-dark">
                                  {teacher.firstName ||
                                    ""}{" "}
                                  {teacher.middleName ||
                                    ""}{" "}
                                  {teacher.lastName ||
                                    ""}
                                </div>

                                <small className="text-muted">
                                  Teacher
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* DOB */}

                          <td className="text-center">
                            {teacher.dob || "-"}
                          </td>

                          {/* GENDER */}

                          <td className="text-center">
                            {teacher.gender || "-"}
                          </td>

                          {/* ADDRESS */}

                          <td>
                            <span className="text-muted">
                              {teacher.addressLine1 ||
                                ""}

                              {teacher.addressLine2
                                ? `, ${teacher.addressLine2}`
                                : ""}

                              {teacher.city
                                ? `, ${teacher.city}`
                                : ""}
                            </span>
                          </td>

                          {/* CONTACT */}

                          <td className="text-center">
                            {teacher.phoneNumber ||
                              "-"}
                          </td>

                          {/* STATUS */}

                          <td className="text-center">
                            {getStatusBadge(
                              teacher.status
                            )}
                          </td>

                          {/* ACTION */}

                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type="button"
                                className="btn btn-sm rounded-3"
                                title="View"
                                onClick={() =>
                                  handleView(
                                    teacher
                                  )
                                }
                                style={{
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                <FaEye />
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm rounded-3"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    teacher.employeeId
                                  )
                                }
                                style={{
                                  backgroundColor:
                                    "#fff7ed",
                                  color:
                                    "#ea580c",
                                  border:
                                    "1px solid #fed7aa",
                                }}
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm rounded-3"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    teacher.id
                                  )
                                }
                                style={{
                                  backgroundColor:
                                    "#fef2f2",
                                  color:
                                    "#dc2626",
                                  border:
                                    "1px solid #fecaca",
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "62px",
                            height: "62px",
                            backgroundColor:
                              "#eff6ff",
                            color:
                              "#2563eb",
                          }}
                        >
                          <FaUserTie
                            size={28}
                          />
                        </div>

                        <h6 className="fw-bold text-dark">
                          No Teachers Found
                        </h6>

                        <small className="text-muted">
                          Try changing your
                          search filters.
                        </small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          {filteredTeachers.length > 0 && (
            <div
              className="card-footer bg-white py-3"
              style={{
                borderTop:
                  "1px solid #e5e7eb",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-muted">
                  Showing{" "}
                  <strong>
                    {indexOfFirstItem + 1}
                  </strong>{" "}
                  to{" "}
                  <strong>
                    {Math.min(
                      indexOfLastItem,
                      filteredTeachers.length
                    )}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {filteredTeachers.length}
                  </strong>{" "}
                  teachers
                </small>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm rounded-3"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(
                          prev - 1,
                          1
                        )
                      )
                    }
                    style={{
                      backgroundColor:
                        currentPage === 1
                          ? "#f8fafc"
                          : "#eff6ff",
                      color:
                        currentPage === 1
                          ? "#94a3b8"
                          : "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    <FaChevronLeft />
                  </button>

                  <span
                    className="fw-semibold px-3 py-1 rounded-3"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#1e40af",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    Page {currentPage} of{" "}
                    {totalPages || 1}
                  </span>

                  <button
                    className="btn btn-sm rounded-3"
                    disabled={
                      currentPage ===
                        totalPages ||
                      totalPages === 0
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                      )
                    }
                    style={{
                      backgroundColor:
                        currentPage ===
                          totalPages ||
                        totalPages === 0
                          ? "#f8fafc"
                          : "#eff6ff",
                      color:
                        currentPage ===
                          totalPages ||
                        totalPages === 0
                          ? "#94a3b8"
                          : "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          THEME SUPPORT
      ===================================================== */}

      <style>
        {`
          .premium-stat-card {
            border-radius: 16px;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            min-height: 120px;
          }

          .premium-stat-card .stat-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23px;
          }

          .premium-stat-card .stat-content {
            min-width: 0;
          }

          .premium-stat-card .stat-content span {
            display: block;
            font-size: 13px;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 3px;
          }

          .premium-stat-card .stat-content h3 {
            margin: 0;
            font-size: 25px;
            font-weight: 700;
            color: #111827;
          }

          .premium-stat-card .stat-content small {
            color: #94a3b8;
            font-size: 11px;
          }

          .stat-blue .stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-green .stat-icon {
            background: #ecfdf5;
            color: #16a34a;
          }

          .stat-orange .stat-icon {
            background: #fff7ed;
            color: #ea580c;
          }

          .stat-red .stat-icon {
            background: #fef2f2;
            color: #dc2626;
          }

          .form-control,
          .form-select {
            min-height: 42px;
            border-color: #dbe2ea;
            border-radius: 10px;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #93c5fd;
            box-shadow: 0 0 0 0.2rem rgba(37,99,235,.08);
          }

          .input-group .form-control {
            border-radius: 0 10px 10px 0;
          }

          .input-group-text {
            border-color: #dbe2ea;
            border-radius: 10px 0 0 10px;
          }

          table thead th {
            font-weight: 700;
            padding: 13px 10px !important;
            white-space: nowrap;
            border-bottom: 1px solid #dbeafe !important;
          }

          table tbody td {
            padding: 12px 10px !important;
            border-color: #eef2f7 !important;
          }

          table tbody tr:hover {
            background-color: #f8fbff !important;
          }

          @media (max-width: 767px) {
            .premium-stat-card {
              min-height: 105px;
              padding: 14px;
            }

            .premium-stat-card .stat-icon {
              width: 45px;
              height: 45px;
              min-width: 45px;
              font-size: 19px;
            }

            .premium-stat-card .stat-content h3 {
              font-size: 21px;
            }
          }

          @media print {
            body {
              background: #fff !important;
            }

            button,
            .btn {
              display: none !important;
            }

            .shadow {
              box-shadow: none !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            .premium-stat-card {
              box-shadow: none !important;
            }

            @page {
              size: landscape;
              margin: 8mm;
            }
          }
        `}
      </style>
    </>
  );
};

export default Teacher;

