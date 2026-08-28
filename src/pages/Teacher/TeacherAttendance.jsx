
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaHistory,
  FaUserTie,
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const TeacherAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;

  const [teachers, setTeachers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherHistory, setTeacherHistory] = useState([]);

  /* =========================
      FETCH TEACHERS
  ========================== */
  useEffect(() => {
    if (!schoolId) return;

    axiosInstance
      .get("/api/teachers", {
        params: {
          schoolId: schoolId,
          status: "Working",
        },
      })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, [schoolId]);

  /* =========================
      FETCH ATTENDANCE BY DATE
  ========================== */
  useEffect(() => {
    if (!teachers.length || !schoolId) return;

    axiosInstance
      .get("/api/teacher-attendance", {
        params: {
          schoolId,
          date: selectedDate,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setAttendanceData(
            res.data.map((a) => ({
              teacherId: a.teacher.id,
              name: `${a.teacher.firstName} ${a.teacher.lastName}`,
              status: a.status,
            })),
          );
        } else {
          setAttendanceData(
            teachers.map((t) => ({
              teacherId: t.id,
              name: `${t.firstName} ${t.lastName}`,
              status: "",
            })),
          );
        }
      })
      .catch((err) => console.error(err));
  }, [selectedDate, teachers, schoolId]);

  /* =========================
      STATUS CHANGE
  ========================== */
  const handleStatusChange = (teacherId, status) => {
    setAttendanceData((prev) =>
      prev.map((t) =>
        t.teacherId === teacherId ? { ...t, status } : t,
      ),
    );
  };

  /* =========================
      MARK ALL
  ========================== */
  const handleMarkAll = (status) => {
    setAttendanceData((prev) =>
      prev.map((t) => ({
        ...t,
        status,
      })),
    );
  };

  /* =========================
      SAVE ATTENDANCE
  ========================== */
  const handleSave = async () => {
    const payload = attendanceData
      .filter((t) => t.status)
      .map((t) => ({
        teacherId: t.teacherId,
        status: t.status,
      }));

    if (!payload.length) {
      alert("Please mark attendance first");
      return;
    }

    try {
      await axiosInstance.post(
        "/api/teacher-attendance",
        payload,
        {
          params: {
            schoolId,
            date: selectedDate,
          },
        },
      );

      alert("Attendance saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance");
    }
  };

  /* =========================
      INDIVIDUAL TEACHER HISTORY
  ========================== */
  useEffect(() => {
    if (!selectedTeacherId) {
      setTeacherHistory([]);
      return;
    }

    axiosInstance
      .get(
        `/api/teacher-attendance/teacher/${selectedTeacherId}`,
      )
      .then((res) => setTeacherHistory(res.data))
      .catch((err) => console.error(err));
  }, [selectedTeacherId]);

  /* =========================
      FILTER
  ========================== */
  const filteredData = attendanceData.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* =========================
      COUNTS
  ========================== */
  const countStatus = (status) =>
    attendanceData.filter((t) => t.status === status).length;

  return (
    <>
      {/* ================= HEADER ================= */}
      <div
        className="row shadow-lg ms-2 me-2"
        style={{
          backgroundColor: "white",
          minHeight: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <strong>Teacher Attendance</strong>
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">
              Teacher Attendance
            </li>
          </ol>
        </nav>
      </div>

      {/* ================= DAILY ATTENDANCE ================= */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          {/* Section Header */}
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <FaUserTie className="me-2" />
            <strong>Daily Teacher Attendance</strong>
          </div>

          <div className="card-body">
            {/* ================= FILTER AREA ================= */}
            <div className="row g-3 align-items-end mb-4">
              {/* Date */}
              <div className="col-12 col-md-4 col-lg-3">
                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-1" />
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

              {/* Search */}
              <div className="col-12 col-md-4 col-lg-3">
                <label className="form-label fw-semibold">
                  <FaSearch className="me-1" />
                  Search Teacher
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by teacher name..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>

              {/* Buttons */}
              <div className="col-12 col-md-4 col-lg-6">
                <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      handleMarkAll("PRESENT")
                    }
                  >
                    <FaCheckCircle className="me-1" />
                    Mark All Present
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleMarkAll("ABSENT")
                    }
                  >
                    <FaTimesCircle className="me-1" />
                    Mark All Absent
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    <FaSave className="me-1" />
                    Save Attendance
                  </button>
                </div>
              </div>
            </div>

            {/* ================= SUMMARY ================= */}
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-3">
                <div className="border rounded p-3 text-center h-100">
                  <h6 className="text-muted mb-1">
                    Total Teachers
                  </h6>
                  <h4 className="fw-bold mb-0">
                    {attendanceData.length}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="border rounded p-3 text-center h-100">
                  <h6 className="text-success mb-1">
                    Present
                  </h6>
                  <h4 className="fw-bold text-success mb-0">
                    {countStatus("PRESENT")}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="border rounded p-3 text-center h-100">
                  <h6 className="text-danger mb-1">
                    Absent
                  </h6>
                  <h4 className="fw-bold text-danger mb-0">
                    {countStatus("ABSENT")}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="border rounded p-3 text-center h-100">
                  <h6 className="text-warning mb-1">
                    Leave
                  </h6>
                  <h4 className="fw-bold text-warning mb-0">
                    {countStatus("LEAVE")}
                  </h4>
                </div>
              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "70px" }}>#</th>
                    <th className="text-start">
                      Teacher Name
                    </th>
                    <th style={{ width: "250px" }}>
                      Attendance Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((teacher, i) => (
                      <tr key={teacher.teacherId}>
                        <td>{i + 1}</td>

                        <td className="text-start fw-semibold">
                          {teacher.name}
                        </td>

                        <td>
                          <select
                            className={`form-select ${
                              teacher.status === "PRESENT"
                                ? "border-success"
                                : teacher.status === "ABSENT"
                                  ? "border-danger"
                                  : teacher.status === "LEAVE"
                                    ? "border-warning"
                                    : teacher.status ===
                                        "HALF_DAY"
                                      ? "border-primary"
                                      : ""
                            }`}
                            value={teacher.status}
                            onChange={(e) =>
                              handleStatusChange(
                                teacher.teacherId,
                                e.target.value,
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
                      <td colSpan="3" className="py-4">
                        <span className="text-muted">
                          No teacher found
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TEACHER HISTORY ================= */}
      <div className="ms-2 me-2 shadow rounded mt-4 bg-white">
        <div className="card border-0">
          {/* Section Header */}
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <FaHistory className="me-2" />
            <strong>Teacher Attendance History</strong>
          </div>

          <div className="card-body">
            {/* Teacher Select */}
            <div className="row mb-4">
              <div className="col-12 col-md-5 col-lg-4">
                <label className="form-label fw-semibold">
                  Select Teacher
                </label>

                <select
                  className="form-select"
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
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* History Table */}
            {selectedTeacherId && (
              <div className="table-responsive">
                {teacherHistory.length > 0 ? (
                  <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {teacherHistory.map((attendance, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>

                          <td>
                            {attendance.attendanceDate}
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                attendance.status ===
                                "PRESENT"
                                  ? "bg-success"
                                  : attendance.status ===
                                      "ABSENT"
                                    ? "bg-danger"
                                    : attendance.status ===
                                        "LEAVE"
                                      ? "bg-warning text-dark"
                                      : attendance.status ===
                                          "HALF_DAY"
                                        ? "bg-primary"
                                        : "bg-secondary"
                              }`}
                            >
                              {attendance.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4 border rounded">
                    <p className="text-muted mb-0">
                      No attendance found for this teacher.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!selectedTeacherId && (
              <div className="text-center py-4 border rounded">
                <FaUserTie
                  size={30}
                  className="text-muted mb-2"
                />

                <p className="text-muted mb-0">
                  Select a teacher to view attendance history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherAttendance;
