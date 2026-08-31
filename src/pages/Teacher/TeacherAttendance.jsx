
// import React, { useEffect, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSave,
//   FaHistory,
//   FaUserTie,
// } from "react-icons/fa";
// import axiosInstance from "../../api/axiosInstance";

// const TeacherAttendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id;

//   const [teachers, setTeachers] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0],
//   );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [teacherHistory, setTeacherHistory] = useState([]);

//   /* =========================
//       FETCH TEACHERS
//   ========================== */
//   useEffect(() => {
//     if (!schoolId) return;

//     axiosInstance
//       .get("/api/teachers", {
//         params: {
//           schoolId: schoolId,
//           status: "Working",
//         },
//       })
//       .then((res) => setTeachers(res.data))
//       .catch((err) => console.error(err));
//   }, [schoolId]);

//   /* =========================
//       FETCH ATTENDANCE BY DATE
//   ========================== */
//   useEffect(() => {
//     if (!teachers.length || !schoolId) return;

//     axiosInstance
//       .get("/api/teacher-attendance", {
//         params: {
//           schoolId,
//           date: selectedDate,
//         },
//       })
//       .then((res) => {
//         if (res.data.length > 0) {
//           setAttendanceData(
//             res.data.map((a) => ({
//               teacherId: a.teacher.id,
//               name: `${a.teacher.firstName} ${a.teacher.lastName}`,
//               status: a.status,
//             })),
//           );
//         } else {
//           setAttendanceData(
//             teachers.map((t) => ({
//               teacherId: t.id,
//               name: `${t.firstName} ${t.lastName}`,
//               status: "",
//             })),
//           );
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [selectedDate, teachers, schoolId]);

//   /* =========================
//       STATUS CHANGE
//   ========================== */
//   const handleStatusChange = (teacherId, status) => {
//     setAttendanceData((prev) =>
//       prev.map((t) =>
//         t.teacherId === teacherId ? { ...t, status } : t,
//       ),
//     );
//   };

//   /* =========================
//       MARK ALL
//   ========================== */
//   const handleMarkAll = (status) => {
//     setAttendanceData((prev) =>
//       prev.map((t) => ({
//         ...t,
//         status,
//       })),
//     );
//   };

//   /* =========================
//       SAVE ATTENDANCE
//   ========================== */
//   const handleSave = async () => {
//     const payload = attendanceData
//       .filter((t) => t.status)
//       .map((t) => ({
//         teacherId: t.teacherId,
//         status: t.status,
//       }));

//     if (!payload.length) {
//       alert("Please mark attendance first");
//       return;
//     }

//     try {
//       await axiosInstance.post(
//         "/api/teacher-attendance",
//         payload,
//         {
//           params: {
//             schoolId,
//             date: selectedDate,
//           },
//         },
//       );

//       alert("Attendance saved successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to save attendance");
//     }
//   };

//   /* =========================
//       INDIVIDUAL TEACHER HISTORY
//   ========================== */
//   useEffect(() => {
//     if (!selectedTeacherId) {
//       setTeacherHistory([]);
//       return;
//     }

//     axiosInstance
//       .get(
//         `/api/teacher-attendance/teacher/${selectedTeacherId}`,
//       )
//       .then((res) => setTeacherHistory(res.data))
//       .catch((err) => console.error(err));
//   }, [selectedTeacherId]);

//   /* =========================
//       FILTER
//   ========================== */
//   const filteredData = attendanceData.filter((t) =>
//     t.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   /* =========================
//       COUNTS
//   ========================== */
//   const countStatus = (status) =>
//     attendanceData.filter((t) => t.status === status).length;

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <div
//         className="row shadow-lg ms-2 me-2"
//         style={{
//           backgroundColor: "white",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-1">
//           <strong>Teacher Attendance</strong>
//         </h6>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 Home
//               </a>
//             </li>

//             <li className="breadcrumb-item active">
//               Teacher Attendance
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* ================= DAILY ATTENDANCE ================= */}
//       <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
//         <div className="card border-0">
//           {/* Section Header */}
//           <div className="card-header bg-primary text-white d-flex align-items-center">
//             <FaUserTie className="me-2" />
//             <strong>Daily Teacher Attendance</strong>
//           </div>

//           <div className="card-body">
//             {/* ================= FILTER AREA ================= */}
//             <div className="row g-3 align-items-end mb-4">
//               {/* Date */}
//               <div className="col-12 col-md-4 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   <FaCalendarAlt className="me-1" />
//                   Attendance Date
//                 </label>

//                 <input
//                   type="date"
//                   className="form-control"
//                   value={selectedDate}
//                   onChange={(e) =>
//                     setSelectedDate(e.target.value)
//                   }
//                 />
//               </div>

//               {/* Search */}
//               <div className="col-12 col-md-4 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   <FaSearch className="me-1" />
//                   Search Teacher
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search by teacher name..."
//                   value={searchTerm}
//                   onChange={(e) =>
//                     setSearchTerm(e.target.value)
//                   }
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="col-12 col-md-4 col-lg-6">
//                 <div className="d-flex flex-wrap gap-2 justify-content-md-end">
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() =>
//                       handleMarkAll("PRESENT")
//                     }
//                   >
//                     <FaCheckCircle className="me-1" />
//                     Mark All Present
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={() =>
//                       handleMarkAll("ABSENT")
//                     }
//                   >
//                     <FaTimesCircle className="me-1" />
//                     Mark All Absent
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleSave}
//                   >
//                     <FaSave className="me-1" />
//                     Save Attendance
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ================= SUMMARY ================= */}
//             <div className="row g-3 mb-4">
//               <div className="col-6 col-md-3">
//                 <div className="border rounded p-3 text-center h-100">
//                   <h6 className="text-muted mb-1">
//                     Total Teachers
//                   </h6>
//                   <h4 className="fw-bold mb-0">
//                     {attendanceData.length}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div className="border rounded p-3 text-center h-100">
//                   <h6 className="text-success mb-1">
//                     Present
//                   </h6>
//                   <h4 className="fw-bold text-success mb-0">
//                     {countStatus("PRESENT")}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div className="border rounded p-3 text-center h-100">
//                   <h6 className="text-danger mb-1">
//                     Absent
//                   </h6>
//                   <h4 className="fw-bold text-danger mb-0">
//                     {countStatus("ABSENT")}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div className="border rounded p-3 text-center h-100">
//                   <h6 className="text-warning mb-1">
//                     Leave
//                   </h6>
//                   <h4 className="fw-bold text-warning mb-0">
//                     {countStatus("LEAVE")}
//                   </h4>
//                 </div>
//               </div>
//             </div>

//             {/* ================= TABLE ================= */}
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th style={{ width: "70px" }}>#</th>
//                     <th className="text-start">
//                       Teacher Name
//                     </th>
//                     <th style={{ width: "250px" }}>
//                       Attendance Status
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredData.length > 0 ? (
//                     filteredData.map((teacher, i) => (
//                       <tr key={teacher.teacherId}>
//                         <td>{i + 1}</td>

//                         <td className="text-start fw-semibold">
//                           {teacher.name}
//                         </td>

//                         <td>
//                           <select
//                             className={`form-select ${
//                               teacher.status === "PRESENT"
//                                 ? "border-success"
//                                 : teacher.status === "ABSENT"
//                                   ? "border-danger"
//                                   : teacher.status === "LEAVE"
//                                     ? "border-warning"
//                                     : teacher.status ===
//                                         "HALF_DAY"
//                                       ? "border-primary"
//                                       : ""
//                             }`}
//                             value={teacher.status}
//                             onChange={(e) =>
//                               handleStatusChange(
//                                 teacher.teacherId,
//                                 e.target.value,
//                               )
//                             }
//                           >
//                             <option value="">
//                               -- Select Status --
//                             </option>

//                             <option value="PRESENT">
//                               Present
//                             </option>

//                             <option value="ABSENT">
//                               Absent
//                             </option>

//                             <option value="LEAVE">
//                               Leave
//                             </option>

//                             <option value="HALF_DAY">
//                               Half Day
//                             </option>
//                           </select>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="py-4">
//                         <span className="text-muted">
//                           No teacher found
//                         </span>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= TEACHER HISTORY ================= */}
//       <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
//         <div className="card border-0">
//           {/* Section Header */}
//           <div className="card-header bg-primary text-white d-flex align-items-center">
//             <FaHistory className="me-2" />
//             <strong>Teacher Attendance History</strong>
//           </div>

//           <div className="card-body">
//             {/* Teacher Select */}
//             <div className="row mb-4">
//               <div className="col-12 col-md-5 col-lg-4">
//                 <label className="form-label fw-semibold">
//                   Select Teacher
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedTeacherId}
//                   onChange={(e) =>
//                     setSelectedTeacherId(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     -- Select Teacher --
//                   </option>

//                   {teachers.map((teacher) => (
//                     <option
//                       key={teacher.id}
//                       value={teacher.id}
//                     >
//                       {teacher.firstName} {teacher.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* History Table */}
//             {selectedTeacherId && (
//               <div className="table-responsive">
//                 {teacherHistory.length > 0 ? (
//                   <table className="table table-bordered table-hover text-center align-middle">
//                     <thead className="table-light">
//                       <tr>
//                         <th>#</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {teacherHistory.map((attendance, i) => (
//                         <tr key={i}>
//                           <td>{i + 1}</td>

//                           <td>
//                             {attendance.attendanceDate}
//                           </td>

//                           <td>
//                             <span
//                               className={`badge ${
//                                 attendance.status ===
//                                 "PRESENT"
//                                   ? "bg-success"
//                                   : attendance.status ===
//                                       "ABSENT"
//                                     ? "bg-danger"
//                                     : attendance.status ===
//                                         "LEAVE"
//                                       ? "bg-warning text-dark"
//                                       : attendance.status ===
//                                           "HALF_DAY"
//                                         ? "bg-primary"
//                                         : "bg-secondary"
//                               }`}
//                             >
//                               {attendance.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="text-center py-4 border rounded">
//                     <p className="text-muted mb-0">
//                       No attendance found for this teacher.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {!selectedTeacherId && (
//               <div className="text-center py-4 border rounded">
//                 <FaUserTie
//                   size={30}
//                   className="text-muted mb-2"
//                 />

//                 <p className="text-muted mb-0">
//                   Select a teacher to view attendance history.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherAttendance;



import React, { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaHistory,
  FaUserTie,
  FaSyncAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";

import { MdOutlineSchool, MdHowToReg } from "react-icons/md";

import axiosInstance from "../../api/axiosInstance";

const TeacherAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id || user?.schoolId;

  const [teachers, setTeachers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherHistory, setTeacherHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  /* =========================================================
     FETCH TEACHERS
  ========================================================= */

  useEffect(() => {
    if (!schoolId) return;

    setLoading(true);

    axiosInstance
      .get("/api/teachers", {
        params: {
          schoolId,
          status: "Working",
        },
      })
      .then((res) => {
        setTeachers(res.data || []);
      })
      .catch((err) => {
        console.error("Teacher fetch error:", err);
        setTeachers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [schoolId]);

  /* =========================================================
     FETCH ATTENDANCE BY DATE
  ========================================================= */

  useEffect(() => {
    if (!teachers.length || !schoolId) return;

    setLoading(true);

    axiosInstance
      .get("/api/teacher-attendance", {
        params: {
          schoolId,
          date: selectedDate,
        },
      })
      .then((res) => {
        if (res.data?.length > 0) {
          setAttendanceData(
            res.data.map((a) => ({
              teacherId: a.teacher.id,
              name: `${a.teacher.firstName || ""} ${
                a.teacher.lastName || ""
              }`.trim(),
              status: a.status,
            }))
          );
        } else {
          setAttendanceData(
            teachers.map((t) => ({
              teacherId: t.id,
              name: `${t.firstName || ""} ${
                t.lastName || ""
              }`.trim(),
              status: "",
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Attendance fetch error:", err);

        setAttendanceData(
          teachers.map((t) => ({
            teacherId: t.id,
            name: `${t.firstName || ""} ${
              t.lastName || ""
            }`.trim(),
            status: "",
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate, teachers, schoolId]);

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (teacherId, status) => {
    setAttendanceData((prev) =>
      prev.map((teacher) =>
        teacher.teacherId === teacherId
          ? {
              ...teacher,
              status,
            }
          : teacher
      )
    );
  };

  /* =========================================================
     MARK ALL
  ========================================================= */

  const handleMarkAll = (status) => {
    setAttendanceData((prev) =>
      prev.map((teacher) => ({
        ...teacher,
        status,
      }))
    );
  };

  /* =========================================================
     SAVE ATTENDANCE
  ========================================================= */

  const handleSave = async () => {
    const payload = attendanceData
      .filter((teacher) => teacher.status)
      .map((teacher) => ({
        teacherId: teacher.teacherId,
        status: teacher.status,
      }));

    if (!payload.length) {
      alert("Please mark attendance first");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/api/teacher-attendance", payload, {
        params: {
          schoolId,
          date: selectedDate,
        },
      });

      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Save attendance error:", error);
      alert("Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    if (!teachers.length || !schoolId) return;

    setLoading(true);

    axiosInstance
      .get("/api/teacher-attendance", {
        params: {
          schoolId,
          date: selectedDate,
        },
      })
      .then((res) => {
        if (res.data?.length > 0) {
          setAttendanceData(
            res.data.map((a) => ({
              teacherId: a.teacher.id,
              name: `${a.teacher.firstName || ""} ${
                a.teacher.lastName || ""
              }`.trim(),
              status: a.status,
            }))
          );
        } else {
          setAttendanceData(
            teachers.map((t) => ({
              teacherId: t.id,
              name: `${t.firstName || ""} ${
                t.lastName || ""
              }`.trim(),
              status: "",
            }))
          );
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  /* =========================================================
     TEACHER HISTORY
  ========================================================= */

  useEffect(() => {
    if (!selectedTeacherId) {
      setTeacherHistory([]);
      return;
    }

    setHistoryLoading(true);

    axiosInstance
      .get(
        `/api/teacher-attendance/teacher/${selectedTeacherId}`
      )
      .then((res) => {
        setTeacherHistory(res.data || []);
      })
      .catch((err) => {
        console.error("History error:", err);
        setTeacherHistory([]);
      })
      .finally(() => {
        setHistoryLoading(false);
      });
  }, [selectedTeacherId]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return attendanceData;

    return attendanceData.filter((teacher) =>
      teacher.name.toLowerCase().includes(search)
    );
  }, [attendanceData, searchTerm]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const countStatus = (status) =>
    attendanceData.filter(
      (teacher) => teacher.status === status
    ).length;

  const totalTeachers = attendanceData.length;

  const presentCount = countStatus("PRESENT");
  const absentCount = countStatus("ABSENT");
  const leaveCount = countStatus("LEAVE");
  const halfDayCount = countStatus("HALF_DAY");

  const markedCount =
    presentCount +
    absentCount +
    leaveCount +
    halfDayCount;

  /* =========================================================
     STATUS STYLE
  ========================================================= */

  const getStatusBadge = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1px solid #bbf7d0",
        };

      case "ABSENT":
        return {
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        };

      case "LEAVE":
        return {
          backgroundColor: "#fef3c7",
          color: "#b45309",
          border: "1px solid #fde68a",
        };

      case "HALF_DAY":
        return {
          backgroundColor: "#dbeafe",
          color: "#1d4ed8",
          border: "1px solid #bfdbfe",
        };

      default:
        return {
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          border: "1px solid #cbd5e1",
        };
    }
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
                  }}
                >
                  <FaUserTie size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Teacher Attendance
                  </h5>

                  <div className="text-muted small">
                    Attendance&nbsp; / &nbsp;Teacher Attendance
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
                  <MdOutlineSchool className="me-1" />
                  Attendance
                </span>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home&nbsp;›&nbsp; Attendance&nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Teacher Attendance
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
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>
                {totalTeachers.toLocaleString("en-IN")}
              </h3>

              <small>Working teachers</small>
            </div>
          </div>
        </div>

        {/* PRESENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Present</span>

              <h3>
                {presentCount.toLocaleString("en-IN")}
              </h3>

              <small>Teachers present today</small>
            </div>
          </div>
        </div>

        {/* ABSENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div className="stat-content">
              <span>Absent</span>

              <h3>
                {absentCount.toLocaleString("en-IN")}
              </h3>

              <small>Teachers absent today</small>
            </div>
          </div>
        </div>

        {/* LEAVE */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Leave</span>

              <h3>
                {leaveCount.toLocaleString("en-IN")}
              </h3>

              <small>
                Leave &nbsp;•&nbsp; Half Day{" "}
                {halfDayCount}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DAILY ATTENDANCE CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">
          {/* HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
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
                  <MdHowToReg size={22} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Daily Teacher Attendance
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Manage teacher attendance for selected date
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
                <FaCalendarAlt className="me-1" />
                {selectedDate}
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            {/* FILTER */}

            <div className="row g-3 align-items-end mb-4">
              {/* DATE */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-1 text-primary" />
                  Attendance Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) =>
                    setSelectedDate(e.target.value)
                  }
                />
              </div>

              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  <FaSearch className="me-1 text-primary" />
                  Search Teacher
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search teacher name..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* MARK BUTTONS */}

              <div className="col-xl-6 col-md-12">
                <div className="d-flex flex-wrap gap-2 justify-content-xl-end">
                  <button
                    type="button"
                    className="btn btn-success rounded-3"
                    onClick={() =>
                      handleMarkAll("PRESENT")
                    }
                  >
                    <FaCheckCircle className="me-1" />
                    Mark All Present
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger rounded-3"
                    onClick={() =>
                      handleMarkAll("ABSENT")
                    }
                  >
                    <FaTimesCircle className="me-1" />
                    Mark All Absent
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary rounded-3"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-1" />
                        Save Attendance
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK SUMMARY */}

            <div className="row g-3 mb-4">
              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <div className="small text-muted">
                    Total Teachers
                  </div>

                  <h4 className="fw-bold text-primary mb-0 mt-1">
                    {totalTeachers}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <div className="small text-muted">
                    Marked
                  </div>

                  <h4 className="fw-bold text-success mb-0 mt-1">
                    {markedCount}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                  }}
                >
                  <div className="small text-muted">
                    Not Marked
                  </div>

                  <h4 className="fw-bold text-danger mb-0 mt-1">
                    {Math.max(
                      totalTeachers - markedCount,
                      0
                    )}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor: "#fff7ed",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <div className="small text-muted">
                    Half Day
                  </div>

                  <h4 className="fw-bold text-warning mb-0 mt-1">
                    {halfDayCount}
                  </h4>
                </div>
              </div>
            </div>

            {/* TABLE */}

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th style={{ width: "70px" }}>#</th>

                    <th className="text-start">
                      Teacher Name
                    </th>

                    <th style={{ width: "280px" }}>
                      Attendance Status
                    </th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-5"
                      >
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-2 text-muted">
                          Loading attendance records...
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((teacher, index) => (
                      <tr key={teacher.teacherId}>
                        <td className="fw-semibold">
                          {index + 1}
                        </td>

                        <td className="text-start">
                          <div className="d-flex align-items-center">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle me-2"
                              style={{
                                width: "38px",
                                height: "38px",
                                backgroundColor:
                                  "#eff6ff",
                                color: "#2563eb",
                              }}
                            >
                              <FaUserTie />
                            </div>

                            <div>
                              <div className="fw-semibold">
                                {teacher.name}
                              </div>

                              <small className="text-muted">
                                Teacher
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <select
                            className="form-select rounded-3"
                            style={{
                              border:
                                getStatusBadge(
                                  teacher.status
                                ).border,
                              backgroundColor:
                                teacher.status
                                  ? getStatusBadge(
                                      teacher.status
                                    ).backgroundColor
                                  : "#fff",
                              color:
                                teacher.status
                                  ? getStatusBadge(
                                      teacher.status
                                    ).color
                                  : "#495057",
                              fontWeight: "600",
                            }}
                            value={teacher.status}
                            onChange={(e) =>
                              handleStatusChange(
                                teacher.teacherId,
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              -- Select Status --
                            </option>

                            <option value="PRESENT">
                              Present
                            </option>

                            <option value="ABSENT">
                              Absent
                            </option>

                            <option value="LEAVE">
                              Leave
                            </option>

                            <option value="HALF_DAY">
                              Half Day
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-5"
                      >
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                          }}
                        >
                          <FaUserTie size={28} />
                        </div>

                        <h6 className="text-danger fw-bold">
                          No Teacher Found
                        </h6>

                        <small className="text-muted">
                          No teacher matches your search.
                        </small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top">
              <div className="text-muted small">
                Showing{" "}
                <span className="fw-bold text-primary">
                  {filteredData.length}
                </span>{" "}
                of{" "}
                <span className="fw-bold">
                  {totalTeachers}
                </span>{" "}
                teachers
              </div>

              <button
                className="btn btn-outline-primary rounded-3"
                onClick={handleRefresh}
                disabled={loading}
              >
                <FaSyncAlt className="me-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TEACHER HISTORY
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-5">
          {/* HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
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
                  <FaHistory size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Teacher Attendance History
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    View individual teacher attendance records
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
                <FaHistory className="me-1" />
                History
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            {/* SELECT TEACHER */}

            <div className="row mb-4">
              <div className="col-12 col-md-6 col-lg-4">
                <label className="form-label fw-semibold">
                  <FaUserTie className="me-1 text-primary" />
                  Select Teacher
                </label>

                <select
                  className="form-select rounded-3"
                  value={selectedTeacherId}
                  onChange={(e) =>
                    setSelectedTeacherId(e.target.value)
                  }
                >
                  <option value="">
                    -- Select Teacher --
                  </option>

                  {teachers.map((teacher) => (
                    <option
                      key={teacher.id}
                      value={teacher.id}
                    >
                      {teacher.firstName}{" "}
                      {teacher.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* HISTORY */}

            {selectedTeacherId && (
              <>
                {historyLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" />

                    <div className="mt-2 text-muted">
                      Loading attendance history...
                    </div>
                  </div>
                ) : teacherHistory.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead
                        className="small text-center"
                        style={{
                          backgroundColor: "#eff6ff",
                          color: "#1e3a8a",
                        }}
                      >
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody className="text-center">
                        {teacherHistory.map(
                          (attendance, index) => (
                            <tr key={index}>
                              <td className="fw-semibold">
                                {index + 1}
                              </td>

                              <td>
                                {attendance.attendanceDate ||
                                  "-"}
                              </td>

                              <td>
                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={getStatusBadge(
                                    attendance.status
                                  )}
                                >
                                  {attendance.status ||
                                    "N/A"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 border rounded-4">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#fef2f2",
                        color: "#dc2626",
                      }}
                    >
                      <FaHistory size={27} />
                    </div>

                    <h6 className="fw-bold text-danger">
                      No Attendance Found
                    </h6>

                    <p className="text-muted mb-0">
                      No attendance history is available
                      for this teacher.
                    </p>
                  </div>
                )}
              </>
            )}

            {!selectedTeacherId && (
              <div className="text-center py-5 border rounded-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <FaUserTie size={27} />
                </div>

                <h6 className="fw-bold text-primary">
                  Select a Teacher
                </h6>

                <p className="text-muted mb-0">
                  Select a teacher above to view attendance
                  history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
            }

            button,
            .btn,
            input,
            select {
              display: none !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            .card-header {
              color: black !important;
              background: white !important;
            }

            .shadow {
              box-shadow: none !important;
            }

            .premium-stat-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            table {
              font-size: 10px !important;
            }

            @page {
              size: portrait;
              margin: 8mm;
            }
          }
        `}
      </style>
    </>
  );
};

export default TeacherAttendance;

