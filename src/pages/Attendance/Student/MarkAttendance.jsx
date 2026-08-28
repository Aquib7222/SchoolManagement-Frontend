
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaSave,
  FaFileExcel,
  FaFilePdf,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const MarkAttendance = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    attendanceStatus,
  } = useMasters();

  const token = localStorage.getItem("token");

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [students, setStudents] = useState([]);

  /* =========================
     SEARCH STUDENTS
  ========================== */
  const handleSearch = async () => {
    if (!selectedSession || !selectedDate || !selectedStandard) {
      alert("Please select Session, Date and Class");
      return;
    }

    try {
      setSearchLoading(true);

      const studentRes = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: selectedSession,
          studentClass: selectedStandard,
          section: selectedSection || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/class",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection || null,
            attendanceDate: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const attendanceMap = {};

      attendanceRes.data.forEach((item) => {
        attendanceMap[item.studentId] = item.status;
      });

      const finalStudents = studentRes.data.map((student) => ({
        ...student,
        status: attendanceMap[student.id] || "",
      }));

      setStudents(finalStudents);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students");
    } finally {
      setSearchLoading(false);
    }
  };

  /* =========================
     STATUS CHANGE
  ========================== */
  const handleStatusChange = (studentId, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, status }
          : student
      )
    );
  };

  /* =========================
     MARK ALL
  ========================== */
  const markAll = (status) => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status,
      }))
    );
  };

  /* =========================
     SAVE ATTENDANCE
  ========================== */
  const handleSaveAttendance = async () => {
    if (!students.length) {
      alert("Please search students first");
      return;
    }

    const notMarked = students.filter(
      (student) => !student.status
    ).length;

    if (notMarked > 0) {
      alert(`Please mark attendance for all students. ${notMarked} student(s) are not marked.`);
      return;
    }

    try {
      setSaveLoading(true);

      const attendancePayload = students.map((student) => ({
        studentId: student.id,
        admissionNumber: student.admissionNumber,
        status: student.status,
      }));

      const payload = {
        attendanceDate: selectedDate,
        academicYear: selectedSession,
        studentClass: selectedStandard,
        section: selectedSection,
        attendance: attendancePayload,
      };

      await axiosInstance.post(
        "/api/student/attendance/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance");
    } finally {
      setSaveLoading(false);
    }
  };

  /* =========================
     COUNTS
  ========================== */
  const totalStudents = students.length;

  const presentCount = students.filter(
    (student) => student.status === "PRESENT"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "ABSENT"
  ).length;

  const halfDayCount = students.filter(
    (student) => student.status === "HALF_DAY"
  ).length;

  const leaveCount = students.filter(
    (student) => student.status === "LEAVE"
  ).length;

  const notMarkedCount = students.filter(
    (student) => !student.status
  ).length;

  /* =========================
     STATUS BADGE
  ========================== */
  const getStatusBadge = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-success";

      case "ABSENT":
        return "bg-danger";

      case "HALF_DAY":
        return "bg-warning text-dark";

      case "LEAVE":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div
        className="bg-white shadow rounded-3 p-3 mb-3 mx-2 mt-3"
        style={{ borderLeft: "4px solid #0d6efd" }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              Student Attendance
            </h5>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    className="text-decoration-none text-secondary"
                  >
                    Home
                  </a>
                </li>

                <li className="breadcrumb-item active">
                  Mark Attendance
                </li>
              </ol>
            </nav>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
              <FaUsers size={18} />
            </div>

            <div>
              <small className="text-muted d-block">
                Attendance Date
              </small>

              <strong>
                {selectedDate || "Not Selected"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          SEARCH CARD
      ========================== */}
      <div className="mx-2 mb-3">
        <div className="card border-0 shadow rounded-3">
          <div className="card-header bg-white border-bottom p-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-primary text-white rounded-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                }}
              >
                <FaSearch />
              </div>

              <div>
                <h6 className="mb-0 fw-bold">
                  Search Student Class Wise
                </h6>

                <small className="text-muted">
                  Select class, section and date
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">

              {/* Session */}
              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">
                  Session <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Session</option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">
                  Attendance Date{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaCalendarAlt />
                  </span>

                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Class */}
              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">
                  Class <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">Select Class</option>

                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">All Sections</option>

                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-primary px-4 d-flex align-items-center gap-2"
                onClick={handleSearch}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>

                    Loading...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Search Students
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ATTENDANCE SUMMARY
      ========================== */}
      <div className="mx-2 mb-3">
        <div className="card border-0 shadow rounded-3">
          <div className="card-header bg-white border-bottom p-3">
            <h6 className="mb-0 fw-bold">
              Attendance Summary
            </h6>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">

              {/* Total */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border rounded-3 p-3 h-100 bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        Total Students
                      </small>

                      <h4 className="mb-0 fw-bold">
                        {totalStudents}
                      </h4>
                    </div>

                    <FaUsers className="text-secondary fs-4" />
                  </div>
                </div>
              </div>

              {/* Present */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border border-success rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-success">
                        Present
                      </small>

                      <h4 className="mb-0 fw-bold text-success">
                        {presentCount}
                      </h4>
                    </div>

                    <FaCheckCircle className="text-success fs-4" />
                  </div>
                </div>
              </div>

              {/* Absent */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border border-danger rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-danger">
                        Absent
                      </small>

                      <h4 className="mb-0 fw-bold text-danger">
                        {absentCount}
                      </h4>
                    </div>

                    <FaTimesCircle className="text-danger fs-4" />
                  </div>
                </div>
              </div>

              {/* Half Day */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border border-warning rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-warning">
                        Half Day
                      </small>

                      <h4 className="mb-0 fw-bold text-warning">
                        {halfDayCount}
                      </h4>
                    </div>

                    <FaClock className="text-warning fs-4" />
                  </div>
                </div>
              </div>

              {/* Leave */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border border-info rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-info">
                        Leave
                      </small>

                      <h4 className="mb-0 fw-bold text-info">
                        {leaveCount}
                      </h4>
                    </div>

                    <FaSignOutAlt className="text-info fs-4" />
                  </div>
                </div>
              </div>

              {/* Not Marked */}
              <div className="col-6 col-md-4 col-xl-2">
                <div className="border rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        Not Marked
                      </small>

                      <h4 className="mb-0 fw-bold">
                        {notMarkedCount}
                      </h4>
                    </div>

                    <FaClock className="text-secondary fs-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                QUICK ACTIONS
            ========================== */}
            <div className="border-top mt-4 pt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h6 className="mb-0 fw-bold">
                  Quick Attendance
                </h6>

                <small className="text-muted">
                  Apply status to all students
                </small>
              </div>

              <div className="row g-2">
                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => markAll("PRESENT")}
                    disabled={!students.length}
                  >
                    <FaCheckCircle className="me-2" />
                    Mark All Present
                  </button>
                </div>

                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => markAll("ABSENT")}
                    disabled={!students.length}
                  >
                    <FaTimesCircle className="me-2" />
                    Mark All Absent
                  </button>
                </div>

                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => markAll("HALF_DAY")}
                    disabled={!students.length}
                  >
                    <FaClock className="me-2" />
                    Mark All Half Day
                  </button>
                </div>

                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-info w-100"
                    onClick={() => markAll("LEAVE")}
                    disabled={!students.length}
                  >
                    <FaSignOutAlt className="me-2" />
                    Mark All Leave
                  </button>
                </div>
              </div>
            </div>

            {/* =========================
                EXPORT + SAVE
            ========================== */}
            <div className="border-top mt-4 pt-3">
              <div className="row g-2 justify-content-end">
                <div className="col-6 col-md-3 col-xl-2">
                  <button
                    className="btn btn-outline-success w-100"
                    disabled={!students.length}
                  >
                    <FaFileExcel className="me-2" />
                    Excel
                  </button>
                </div>

                <div className="col-6 col-md-3 col-xl-2">
                  <button
                    className="btn btn-outline-danger w-100"
                    disabled={!students.length}
                  >
                    <FaFilePdf className="me-2" />
                    PDF
                  </button>
                </div>

                <div className="col-12 col-md-4 col-xl-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleSaveAttendance}
                    disabled={
                      !students.length || saveLoading
                    }
                  >
                    {saveLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>

                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Attendance
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          STUDENT LIST
      ========================== */}
      <div className="mx-2 mb-3">
        <div className="card border-0 shadow rounded-3">

          <div className="card-header bg-white border-bottom p-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

              <div>
                <h6 className="mb-1 fw-bold">
                  Student Attendance List
                </h6>

                <small className="text-muted">
                  Date:{" "}
                  <strong className="text-dark">
                    {selectedDate || "Not Selected"}
                  </strong>

                  {selectedStandard && (
                    <>
                      {" | "}
                      Class:{" "}
                      <strong className="text-dark">
                        {selectedStandard}
                      </strong>
                    </>
                  )}

                  {selectedSection && (
                    <>
                      {" | "}
                      Section:{" "}
                      <strong className="text-dark">
                        {selectedSection}
                      </strong>
                    </>
                  )}
                </small>
              </div>

              <span className="badge bg-primary rounded-pill px-3 py-2">
                Total: {students.length}
              </span>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th
                      className="text-center"
                      style={{ width: "70px" }}
                    >
                      S.No
                    </th>

                    <th>Student Name</th>

                    <th>Admission Number</th>

                    <th>Roll No</th>

                    <th
                      className="text-center"
                      style={{ width: "280px" }}
                    >
                      Attendance Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {searchLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <div className="spinner-border text-primary"></div>

                        <div className="mt-2 text-muted">
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <div className="text-muted">
                          <FaUsers
                            size={35}
                            className="mb-2"
                          />

                          <p className="mb-0 text-danger fw-semibold">
                            No Student Found
                          </p>

                          <small>
                            Select filters and click Search Students
                          </small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td className="text-center fw-semibold">
                          {index + 1}
                        </td>

                        <td>
                          <div className="fw-semibold">
                            {student.firstName}{" "}
                            {student.lastName}
                          </div>
                        </td>

                        <td>
                          <span className="badge bg-light text-dark border">
                            {student.admissionNumber}
                          </span>
                        </td>

                        <td>
                          {student.rollNumber || "-"}
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              className="form-select"
                              value={student.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  student.id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                Select Status
                              </option>

                              {attendanceStatus.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status.replace(
                                      "_",
                                      " "
                                    )}
                                  </option>
                                )
                              )}
                            </select>

                            {student.status && (
                              <span
                                className={`badge ${getStatusBadge(
                                  student.status
                                )}`}
                                style={{
                                  minWidth: "75px",
                                }}
                              >
                                {student.status.replace(
                                  "_",
                                  " "
                                )}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          {students.length > 0 && (
            <div className="card-footer bg-white border-top">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-muted">
                  Showing{" "}
                  <strong>{students.length}</strong>{" "}
                  students
                </small>

                <div>
                  {notMarkedCount > 0 ? (
                    <span className="text-danger fw-semibold">
                      {notMarkedCount} student(s) not marked
                    </span>
                  ) : (
                    <span className="text-success fw-semibold">
                      <FaCheckCircle className="me-1" />
                      All students marked
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
