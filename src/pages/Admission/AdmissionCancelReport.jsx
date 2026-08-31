import React, { useEffect, useMemo, useState } from "react";
import {
  FaBan,
  FaRedo,
  FaSearch,
  FaUsers,
  FaUserGraduate,
  FaPhone,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";

const AdmissionCancelReport = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const schoolId = user?.schoolId;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
  });

  /* =========================================================
     LOAD CANCELLED ADMISSIONS
  ========================================================= */

  useEffect(() => {
    if (schoolId && token) {
      loadCancelledAdmissions();
    }
  }, [schoolId, token]);

  const loadCancelledAdmissions = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/api/admissions/school?schoolId=${schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const cancelledAdmissions = (response.data || []).filter(
        (item) => item.status?.toUpperCase() === "CANCELLED",
      );

      setStudents(cancelledAdmissions);
    } catch (error) {
      console.error("Cancelled admission fetch error:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReApprove = async (admissionNumber) => {
    if (
      !window.confirm("Are you sure you want to re-approve this admission?")
    ) {
      return;
    }

    try {
      await axiosInstance.put("/api/admissions/reapprove", null, {
        params: {
          schoolId,
          admissionNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Admission re-approved successfully");

      loadAdmissions();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to re-approve admission");
    }
  };
  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      const studentName = [
        student.firstName,
        student.middleName,
        student.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const admissionNo = student.admissionNumber?.toLowerCase() || "";

      const fatherName = student.fatherName?.toLowerCase() || "";

      const motherName = student.motherName?.toLowerCase() || "";

      const mobile =
        student.fatherMobile?.toLowerCase() ||
        student.motherMobile?.toLowerCase() ||
        student.preferredNo?.toLowerCase() ||
        "";

      const matchSearch =
        !search ||
        studentName.includes(search) ||
        admissionNo.includes(search) ||
        fatherName.includes(search) ||
        motherName.includes(search) ||
        mobile.includes(search);

      const matchSession =
        !filters.session || student.academicYear === filters.session;

      const matchStandard =
        !filters.standard || student.studentClass === filters.standard;

      return matchSearch && matchSession && matchStandard;
    });
  }, [students, searchTerm, filters]);

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSearchTerm("");

    setFilters({
      session: "",
      standard: "",
    });
  };

  /* =========================================================
     UNIQUE SESSIONS
  ========================================================= */

  const sessions = useMemo(() => {
    return [
      ...new Set(students.map((item) => item.academicYear).filter(Boolean)),
    ];
  }, [students]);

  /* =========================================================
     UNIQUE STANDARDS
  ========================================================= */

  const standards = useMemo(() => {
    return [
      ...new Set(students.map((item) => item.studentClass).filter(Boolean)),
    ];
  }, [students]);

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
     SUMMARY
  ========================================================= */

  const totalCancelled = students.length;

  const filteredCancelled = filteredStudents.length;

  /* =========================================================
     JSX
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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaBan size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Admission Cancel Report
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Cancel Admission Report
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#fff0f0",
                    color: "#dc3545",
                    border: "1px solid #ffd6d6",
                  }}
                >
                  <FaBan className="me-1" />
                  Cancel Report
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
              Home &nbsp;›&nbsp; Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Cancel Admission</span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        {/* TOTAL CANCELLED */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaBan />
            </div>

            <div className="stat-content">
              <span>Total Cancelled</span>

              <h3>{totalCancelled}</h3>

              <small>All cancelled admissions</small>
            </div>
          </div>
        </div>

        {/* FILTERED */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Filtered Records</span>

              <h3>{filteredCancelled}</h3>

              <small>Matching current filters</small>
            </div>
          </div>
        </div>

        {/* STATUS */}

        <div className="col-xl-4 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Report Status</span>

              <h3
                style={{
                  fontSize: "24px",
                }}
              >
                CANCELLED
              </h3>

              <small>Cancelled admissions only</small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="ms-2 me-2 mt-4">
        <div className="card border-0 shadow rounded-4">
          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1 fw-bold">
                  <FaFilter className="text-danger me-2" size={14} />
                  Cancel Admission Search
                </h6>

                <small className="text-muted">
                  Search and filter cancelled admissions
                </small>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#fff0f0",
                  color: "#dc3545",
                }}
              >
                {filteredCancelled} Records
              </span>
            </div>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-12 col-xl-8">
                <label className="form-label fw-semibold small">
                  Search Student
                </label>

                <div className="position-relative">
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6c757d",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, admission no, father name, mother name, mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      paddingLeft: "38px",
                    }}
                  />
                </div>
              </div>

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">Session</label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Sessions</option>

                  {sessions.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">Standard</label>

                <select
                  name="standard"
                  value={filters.standard}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Standards</option>

                  {standards.map((standard) => (
                    <option key={standard} value={standard}>
                      {standard}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >
                <FaRedo className="me-2" size={13} />
                Reset
              </button>

              <button type="button" className="btn btn-danger px-4">
                <FaSearch className="me-2" size={13} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="ms-2 me-2 mt-4 mb-4">
        <div className="card border-0 shadow rounded-4 overflow-hidden">
          {/* TABLE HEADER */}

          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-2 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#fff0f0",
                    color: "#dc3545",
                  }}
                >
                  <FaBan size={16} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">Cancelled Admission List</h6>

                  <small className="text-muted">
                    Admission records with CANCELLED status
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
                  Showing <strong>{filteredCancelled}</strong>
                </span>

                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={loadCancelledAdmissions}
                  disabled={loading}
                >
                  <FaRedo size={12} className={loading ? "spin" : ""} />
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
                  minWidth: "1450px",
                }}
              >
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
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    <th
                      className="text-center"
                      style={{
                        width: "70px",
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
                        minWidth: "230px",
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
                        minWidth: "140px",
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
                        minWidth: "220px",
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
                        minWidth: "150px",
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
                      SESSION
                    </th>

                    <th
                      style={{
                        minWidth: "120px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      STANDARD
                    </th>

                    <th
                      style={{
                        minWidth: "150px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      CANCELLED DATE
                    </th>

                    <th
                      className="text-center"
                      style={{
                        minWidth: "150px",
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
                        minWidth: "150px",
                        padding: "14px 12px",
                        fontSize: "12px",
                        color: "#6c757d",
                        fontWeight: "700",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* LOADING */}

                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <div
                          className="spinner-border text-danger"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading cancelled admission records...
                        </div>
                      </td>
                    </tr>
                  ) : filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaBan size={23} />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Cancelled Admissions
                        </h6>

                        <small className="text-muted">
                          No cancelled admission records match the selected
                          filters.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, index) => {
                      const studentName = [
                        student.firstName,
                        student.middleName,
                        student.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ");

                      const mobile =
                        student.fatherMobile ||
                        student.motherMobile ||
                        student.preferredNo ||
                        "N/A";

                      /*
                       * Supports common possible
                       * cancelled-date field names.
                       */
                      const cancelledDate =
                        student.cancelDate ||
                        student.cancellationDate ||
                        student.updatedAt ||
                        student.modifiedAt;

                      return (
                        <tr
                          key={student.id || student.admissionNumber}
                          style={{
                            borderBottom: "1px solid #f0f1f2",
                          }}
                        >
                          {/* NUMBER */}

                          <td className="text-center">
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "#f4f6f8",
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
                                className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  minWidth: "40px",
                                  background: "#fff0f0",
                                  color: "#dc3545",
                                  fontWeight: "700",
                                  fontSize: "14px",
                                }}
                              >
                                {studentName
                                  ? studentName.charAt(0).toUpperCase()
                                  : "S"}
                              </div>

                              <div>
                                <div
                                  className="fw-semibold"
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  {studentName || "N/A"}
                                </div>

                                <small className="text-muted">Student</small>
                              </div>
                            </div>
                          </td>

                          {/* ADMISSION NUMBER */}

                          <td>
                            <span
                              className="fw-bold text-primary"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {student.admissionNumber || "N/A"}
                            </span>
                          </td>

                          {/* PARENT DETAILS */}

                          <td>
                            <div
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              <div className="mb-1">
                                <span className="text-muted">Father:</span>{" "}
                                <strong>{student.fatherName || "N/A"}</strong>
                              </div>

                              <div>
                                <span className="text-muted">Mother:</span>{" "}
                                <strong>{student.motherName || "N/A"}</strong>
                              </div>
                            </div>
                          </td>

                          {/* MOBILE */}

                          <td>
                            <div
                              className="fw-semibold"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              <FaPhone size={10} className="me-1 text-muted" />

                              {mobile}
                            </div>
                          </td>

                          {/* SESSION */}

                          <td>
                            <span
                              className="badge rounded-pill text-primary"
                              style={{
                                background: "#eef5ff",
                                border: "1px solid #d9e8ff",
                                fontWeight: "600",
                                padding: "6px 10px",
                              }}
                            >
                              {student.academicYear || "N/A"}
                            </span>
                          </td>

                          {/* STANDARD */}

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                background: "#f4f6f8",
                                color: "#495057",
                                border: "1px solid #e1e5e8",
                                fontWeight: "600",
                                padding: "6px 10px",
                              }}
                            >
                              {student.studentClass || "N/A"}
                            </span>
                          </td>

                          {/* CANCELLED DATE */}

                          <td>
                            <span
                              className="d-inline-flex align-items-center gap-1"
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              <FaCalendarAlt size={11} className="text-muted" />

                              {formatDate(cancelledDate)}
                            </span>
                          </td>

                          {/* STATUS */}

                          <td className="text-center">
                            <span
                              className="d-inline-flex align-items-center rounded-pill"
                              style={{
                                background: "#fff0f0",
                                color: "#dc3545",
                                border: "1px solid #ffd6d6",
                                padding: "6px 12px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              <span
                                className="rounded-circle me-2"
                                style={{
                                  width: "7px",
                                  height: "7px",
                                  background: "#dc3545",
                                }}
                              />
                              CANCELLED
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className="d-inline-flex align-items-center rounded-pill"
                              style={{
                                background: "#a6ffac",
                                color: "#dc3545",
                                border: "1px solid #ffd6d6",
                                padding: "6px 12px",
                                fontWeight: "600",
                                fontSize: "12px",
                              }}
                            >
                              
                              <button
                                className="btn btn-sm p-0 "
                                onClick={() =>
                                  handleReApprove(student.admissionNumber)
                                }
                              >
                                <FaCheck className="me-1" />
                                Re-Approve
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <small className="text-muted">
                Showing{" "}
                <strong className="text-danger">{filteredCancelled}</strong>{" "}
                cancelled admission(s)
              </small>

              <small className="text-muted">
                Report contains only{" "}
                <strong className="text-danger">CANCELLED</strong> admissions
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #fffafa;
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
            border-color: #dc3545;
            box-shadow:
              0 0 0 0.15rem
              rgba(220, 53, 69, 0.10);
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .spin {
            animation:
              spin 0.8s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {

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

export default AdmissionCancelReport;
