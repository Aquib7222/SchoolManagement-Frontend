
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaClock,
} from "react-icons/fa";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const DailyAttendanceReport = () => {
  const token = localStorage.getItem("token");

  const { sessions, standards, sections } = useMasters();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [classwise, setClassWise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  /* =========================
     SEARCH ATTENDANCE
  ========================== */
  const handleSearch = async () => {
    if (
      !selectedDate ||
      !selectedSession ||
      !selectedStandard ||
      !selectedSection
    ) {
      alert("Please select Date, Session, Standard and Section");
      return;
    }

    try {
      setLoading(true);

      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/class",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection,
            attendanceDate: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClassWise(attendanceRes.data || []);
      setShowTable(true);
    } catch (error) {
      console.error(error);
      setClassWise([]);
      setShowTable(true);
      alert("Student attendance not found");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     COUNTS
  ========================== */
  const counts = classwise.reduce(
    (acc, item) => {
      switch (item.status) {
        case "PRESENT":
          acc.present++;
          break;

        case "ABSENT":
          acc.absent++;
          break;

        case "LEAVE":
          acc.leave++;
          break;

        case "HALF_DAY":
          acc.halfDay++;
          break;

        default:
          break;
      }

      return acc;
    },
    {
      present: 0,
      absent: 0,
      leave: 0,
      halfDay: 0,
    }
  );

  const totalStudents = classwise.length;

  /* =========================
     PRINT
  ========================== */
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div
        className="mx-2 mt-2 px-3 py-3 shadow rounded-3 bg-white"
        style={{
          borderLeft: "4px solid #0d6efd",
        }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              <FaCalendarAlt className="text-primary me-2" />
              Daily Attendance Report
            </h5>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    className="text-decoration-none text-secondary"
                  >
                    Home
                  </a>
                </li>

                <li className="breadcrumb-item active">
                  Daily Attendance Report
                </li>
              </ol>
            </nav>
          </div>

          {showTable && (
            <div className="mt-2 mt-md-0">
              <span className="badge rounded-pill bg-primary px-3 py-2">
                {selectedDate}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ====================================================== */}
      <div className="mx-2 mt-3">
        <div className="card border-0 shadow rounded-3">
          <div
            className="card-header border-0 text-white fw-semibold"
            style={{
              background:
                "linear-gradient(135deg, #0d6efd 0%, #3f8cff 100%)",
            }}
          >
            <FaSearch className="me-2" />
            Search Attendance
          </div>

          <div className="card-body p-3 p-md-4">
            <div className="row g-3">
              {/* DATE */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold">
                  Date <span className="text-danger">*</span>
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaCalendarAlt className="text-primary" />
                  </span>

                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* SESSION */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold">
                  Session <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                >
                  <option value="">Select Session</option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold">
                  Standard <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                >
                  <option value="">Select Standard</option>

                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION */}
              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold">
                  Section <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>

                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-primary px-4 shadow"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Search Attendance
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESULT SECTION
      ====================================================== */}
      {showTable && (
        <>
          {/* =================================================
              SUMMARY HEADER
          ================================================== */}
          <div className="mx-2 mt-3">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">
                      Attendance Summary
                    </h6>

                    <small className="text-muted">
                      {selectedSession} &nbsp;|&nbsp;
                      {selectedStandard} &nbsp;|&nbsp;
                      Section {selectedSection} &nbsp;|&nbsp;
                      {selectedDate}
                    </small>
                  </div>

                  <span className="badge bg-light text-primary border px-3 py-2">
                    Daily Report
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              STAT CARDS
          ================================================== */}
          <div className="mx-2 mt-3">
            <div className="row g-3">
              {/* TOTAL */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <small className="text-muted fw-semibold">
                          Total Students
                        </small>

                        <h4 className="fw-bold mb-0 mt-1">
                          {totalStudents}
                        </h4>
                      </div>

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#e9f2ff",
                        }}
                      >
                        <FaUsers className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRESENT */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <small className="text-muted fw-semibold">
                          Present
                        </small>

                        <h4 className="fw-bold text-success mb-0 mt-1">
                          {counts.present}
                        </h4>
                      </div>

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#e9f8ef",
                        }}
                      >
                        <FaCheckCircle className="text-success" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ABSENT */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <small className="text-muted fw-semibold">
                          Absent
                        </small>

                        <h4 className="fw-bold text-danger mb-0 mt-1">
                          {counts.absent}
                        </h4>
                      </div>

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#fdecec",
                        }}
                      >
                        <FaTimesCircle className="text-danger" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEAVE / HALF DAY */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow rounded-3 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <small className="text-muted fw-semibold">
                          Leave / Half Day
                        </small>

                        <h4 className="fw-bold text-warning mb-0 mt-1">
                          {counts.leave} / {counts.halfDay}
                        </h4>
                      </div>

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#fff7df",
                        }}
                      >
                        <FaClock className="text-warning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CLASS SUMMARY TABLE
          ================================================== */}
          <div className="mx-2 mt-3">
            <div className="card border-0 shadow rounded-3">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-1">
                      Class Wise Summary
                    </h6>

                    <small className="text-muted">
                      Attendance overview for selected class
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle text-center mb-0">
                    <thead
                      style={{
                        background: "#eef5ff",
                      }}
                    >
                      <tr>
                        <th>Session</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>Total</th>
                        <th className="text-success">Present</th>
                        <th className="text-danger">Absent</th>
                        <th className="text-warning">Leave</th>
                        <th className="text-info">Half Day</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{selectedSession}</td>
                        <td>{selectedStandard}</td>
                        <td>
                          <span className="badge bg-primary">
                            {selectedSection}
                          </span>
                        </td>

                        <td className="fw-bold">
                          {totalStudents}
                        </td>

                        <td className="fw-bold text-success">
                          {counts.present}
                        </td>

                        <td className="fw-bold text-danger">
                          {counts.absent}
                        </td>

                        <td className="fw-bold text-warning">
                          {counts.leave}
                        </td>

                        <td className="fw-bold text-info">
                          {counts.halfDay}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              STUDENT LIST
          ================================================== */}
          <div className="mx-2 mt-3 mb-4">
            <div className="card border-0 shadow rounded-3">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">
                      Student Attendance List
                    </h6>

                    <small className="text-muted">
                      Detailed attendance for {selectedDate}
                    </small>
                  </div>

                  {/* EXPORT BUTTONS */}
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-outline-success"
                      type="button"
                    >
                      <FaFileExcel className="me-1" />
                      Excel
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                    >
                      <FaFilePdf className="me-1" />
                      PDF
                    </button>

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                      onClick={handlePrint}
                    >
                      <FaPrint className="me-1" />
                      Print
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead
                      style={{
                        background: "#eef5ff",
                      }}
                    >
                      <tr>
                        <th className="text-center">S.No</th>
                        <th>Admission Number</th>
                        <th>Student Name</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-5">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            />

                            <div className="mt-2 text-muted">
                              Loading attendance...
                            </div>
                          </td>
                        </tr>
                      ) : classwise.length > 0 ? (
                        classwise.map((student, index) => (
                          <tr key={student.id || index}>
                            <td className="text-center fw-semibold">
                              {index + 1}
                            </td>

                            <td className="fw-semibold">
                              {student.admissionNumber}
                            </td>

                            <td>
                              {student.studentName}
                            </td>

                            <td className="text-center">
                              {student.status === "PRESENT" && (
                                <span className="badge rounded-pill bg-success px-3 py-2">
                                  <FaCheckCircle className="me-1" />
                                  Present
                                </span>
                              )}

                              {student.status === "ABSENT" && (
                                <span className="badge rounded-pill bg-danger px-3 py-2">
                                  <FaTimesCircle className="me-1" />
                                  Absent
                                </span>
                              )}

                              {student.status === "LEAVE" && (
                                <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                                  <FaSignOutAlt className="me-1" />
                                  Leave
                                </span>
                              )}

                              {student.status === "HALF_DAY" && (
                                <span className="badge rounded-pill bg-info text-dark px-3 py-2">
                                  <FaClock className="me-1" />
                                  Half Day
                                </span>
                              )}

                              {!student.status && (
                                <span className="badge rounded-pill bg-secondary px-3 py-2">
                                  Not Marked
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-danger fw-semibold py-5"
                          >
                            <FaUsers
                              size={28}
                              className="mb-2 opacity-50"
                            />

                            <div>
                              No Student Attendance Found
                            </div>

                            <small className="text-muted">
                              Try changing the selected filters.
                            </small>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE FOOTER */}
              {classwise.length > 0 && (
                <div className="card-footer bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Showing{" "}
                      <strong>{classwise.length}</strong>{" "}
                      students
                    </small>

                    <small className="text-muted">
                      Date:{" "}
                      <strong>{selectedDate}</strong>
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DailyAttendanceReport;

