
import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaUserClock,
  FaUsers,
  FaUserGraduate,
  FaEye,
  FaFilter,
  
  FaPhone,
  FaUser,
  FaMoneyBill,
} from "react-icons/fa";
import { FaCalendarDays, FaGraduationCap } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const PendingAdmission = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const schoolId = user?.schoolId;

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
  });

  /* =========================================================
     LOAD APPROVED ADMISSIONS
  ========================================================= */

  useEffect(() => {
    if (schoolId && token) {
      loadPendingAdmissions();
    }
  }, [schoolId, token]);

  const loadPendingAdmissions = async () => {
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

      /*
       * ONLY APPROVED ADMISSIONS
       */
      const approvedAdmissions = (response.data || []).filter(
        (item) => item.status?.toUpperCase() === "APPROVED"
      );

      setAdmissions(approvedAdmissions);
    } catch (error) {
      console.error("Pending admission fetch error:", error);
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("Pending Admissions:", admissions);

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

  const filteredAdmissions = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return admissions.filter((admission) => {
      const studentName = [
        admission.firstName,
        admission.middleName,
        admission.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const admissionNo =
        admission.admissionNumber?.toLowerCase() || "";

      const fatherName =
        admission.fatherName?.toLowerCase() || "";

      const motherName =
        admission.motherName?.toLowerCase() || "";

      const mobile =
        admission.fatherMobile?.toLowerCase() ||
        admission.motherMobile?.toLowerCase() ||
        admission.preferredNo?.toLowerCase() ||
        "";

      const matchSearch =
        !search ||
        studentName.includes(search) ||
        admissionNo.includes(search) ||
        fatherName.includes(search) ||
        motherName.includes(search) ||
        mobile.includes(search);

      const matchSession =
        !filters.session ||
        admission.academicYear === filters.session;

      const matchStandard =
        !filters.standard ||
        admission.studentClass === filters.standard;

      return (
        matchSearch &&
        matchSession &&
        matchStandard
      );
    });
  }, [admissions, searchTerm, filters]);

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
     SUMMARY
  ========================================================= */

  const totalPending = admissions.length;

  const maleStudents = admissions.filter(
    (item) =>
      item.gender?.toUpperCase() === "MALE" ||
      item.gender?.toUpperCase() === "BOY"
  ).length;

  const femaleStudents = admissions.filter(
    (item) =>
      item.gender?.toUpperCase() === "FEMALE" ||
      item.gender?.toUpperCase() === "GIRL"
  ).length;

  /* =========================================================
     UNIQUE SESSIONS
  ========================================================= */

  const sessions = useMemo(() => {
    return [
      ...new Set(
        admissions
          .map((item) => item.academicYear)
          .filter(Boolean)
      ),
    ];
  }, [admissions]);

  /* =========================================================
     UNIQUE STANDARDS
  ========================================================= */

  const standards = useMemo(() => {
    return [
      ...new Set(
        admissions
          .map((item) => item.studentClass)
          .filter(Boolean)
      ),
    ];
  }, [admissions]);

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
     VIEW / PROCESS ADMISSION
  ========================================================= */

  const handleFeePay = (id) => {
    navigate(`/admission/fee/${id}`);
  };

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
                    background:
                      "linear-gradient(135deg,#f59e0b,#fbbf24)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(245,158,11,.22)",
                  }}
                >
                  <FaUserClock size={27} />
                </div>

                <div>

                  <h5 className="mb-1 fw-bold text-dark">
                    Pending Admission
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Pending Admission
                  </div>

                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#fff4d6",
                    color: "#997404",
                    border: "1px solid #ffe69c",
                  }}
                >
                  <FaUserClock className="me-1" />
                  Approved Admissions
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
              Admission &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Pending Admission
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

        <div className="col-xl-4 col-md-6">

          <div className="premium-stat-card stat-blue shadow">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">

              <span>
                Pending Admissions
              </span>

              <h3>
                {totalPending}
              </h3>

              <small>
                Approved admission records
              </small>

            </div>

          </div>

        </div>

        {/* MALE */}

        <div className="col-xl-4 col-md-6">

          <div className="premium-stat-card stat-green shadow">

            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">

              <span>
                Male Students
              </span>

              <h3>
                {maleStudents}
              </h3>

              <small>
                Pending admission
              </small>

            </div>

          </div>

        </div>

        {/* FEMALE */}

        <div className="col-xl-4 col-md-6">

          <div className="premium-stat-card stat-red shadow">

            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">

              <span>
                Female Students
              </span>

              <h3>
                {femaleStudents}
              </h3>

              <small>
                Pending admission
              </small>

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
              borderBottom:
                "1px solid #eef0f2",
            }}
          >

            <div className="d-flex align-items-center justify-content-between">

              <div>

                <h6 className="mb-1 fw-bold">

                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />

                  Pending Admission Search

                </h6>

                <small className="text-muted">
                  Search and filter approved admission records
                </small>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#fff4d6",
                  color: "#997404",
                }}
              >
                {filteredAdmissions.length} Records
              </span>

            </div>

          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              {/* SEARCH */}

              <div className="col-12 col-xl-6">

                <label className="form-label fw-semibold small">
                  Search Student
                </label>

                <div className="position-relative">

                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#6c757d",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, admission no, father name, mobile..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    style={{
                      paddingLeft: "38px",
                    }}
                  />

                </div>

              </div>

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-3">

                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={handleFilterChange}
                  className="form-select"
                >

                  <option value="">
                    All Sessions
                  </option>

                  {sessions.map((session) => (
                    <option
                      key={session}
                      value={session}
                    >
                      {session}
                    </option>
                  ))}

                </select>

              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-3">

                <label className="form-label fw-semibold small">
                  Standard
                </label>

                <select
                  name="standard"
                  value={filters.standard}
                  onChange={handleFilterChange}
                  className="form-select"
                >

                  <option value="">
                    All Standards
                  </option>

                  {standards.map((standard) => (
                    <option
                      key={standard}
                      value={standard}
                    >
                      {standard}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="d-flex justify-content-end gap-2 mt-4 flex-wrap">

              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >

                <FaRedo
                  className="me-2"
                  size={13}
                />

                Reset

              </button>

              <button
                type="button"
                className="btn btn-primary px-4"
              >

                <FaSearch
                  className="me-2"
                  size={13}
                />

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
                    background: "#fff4d6",
                    color: "#997404",
                  }}
                >
                  <FaUserClock size={16} />
                </div>

                <div>

                  <h6 className="mb-0 fw-bold">
                    Pending Admission List
                  </h6>

                  <small className="text-muted">
                    Approved admissions waiting for further processing
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
                  onClick={loadPendingAdmissions}
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
                      borderBottom:
                        "1px solid #dee2e6",
                    }}
                  >

                    <th
                      className="text-center"
                      style={headerStyle}
                    >
                      #
                    </th>

                    <th style={headerStyle}>
                      STUDENT
                    </th>

                    <th style={headerStyle}>
                      ADMISSION NO
                    </th>

                    <th style={headerStyle}>
                      PARENT DETAILS
                    </th>

                    <th style={headerStyle}>
                      MOBILE
                    </th>

                    <th style={headerStyle}>
                      SESSION
                    </th>

                    <th style={headerStyle}>
                      STANDARD
                    </th>

                    <th style={headerStyle}>
                      ADMISSION DATE
                    </th>

                    <th
                      className="text-center"
                      style={headerStyle}
                    >
                      STATUS
                    </th>

                    <th
                      className="text-center"
                      style={headerStyle}
                    >
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

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
                          Loading pending admissions...
                        </div>

                      </td>

                    </tr>

                  ) : filteredAdmissions.length === 0 ? (

                    <tr>

                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaUserClock size={23} />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Pending Admissions
                        </h6>

                        <small className="text-muted">
                          No approved admission matches the selected filters.
                        </small>

                      </td>

                    </tr>

                  ) : (

                    filteredAdmissions.map(
                      (admission, index) => {

                        const studentName = [
                          admission.firstName,
                          admission.middleName,
                          admission.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (

                          <tr
                            key={
                              admission.id ||
                              admission.admissionNumber
                            }
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
                                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    minWidth: "38px",
                                    background:
                                      "#fff4d6",
                                    color: "#997404",
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
                                    Student
                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* ADMISSION NO */}

                            <td>

                              <span
                                className="fw-bold text-primary"
                                style={{
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {admission.admissionNumber ||
                                  "N/A"}
                              </span>

                            </td>

                            {/* PARENT */}

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
                                    {admission.fatherName ||
                                      "N/A"}
                                  </strong>

                                </div>

                                <div>

                                  <span className="text-muted">
                                    Mother:
                                  </span>{" "}

                                  <strong>
                                    {admission.motherName ||
                                      "N/A"}
                                  </strong>

                                </div>

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

                                {admission.fatherMobile ||
                                  admission.motherMobile ||
                                  admission.preferredNo ||
                                  "N/A"}

                              </div>

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
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >

                                {admission.academicYear ||
                                  "N/A"}

                              </span>

                            </td>

                            {/* STANDARD */}

                            <td>

                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#f4f6f8",
                                  color:
                                    "#495057",
                                  border:
                                    "1px solid #e1e5e8",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >

                                {admission.studentClass ||
                                  "N/A"}

                              </span>

                            </td>

                            {/* ADMISSION DATE */}

                            <td>

                              <div
                                className="d-flex align-items-center gap-2"
                                style={{
                                  fontSize: "12px",
                                }}
                              >

                                <FaCalendarDays
                                  className="text-primary"
                                  size={13}
                                />

                                <span>
                                  {formatDate(
                                    admission.admissionDate ||
                                      admission.createdAt
                                  )}
                                </span>

                              </div>

                            </td>

                            {/* STATUS */}

                            <td className="text-center">

                              <span
                                className="d-inline-flex align-items-center rounded-pill"
                                style={{
                                  background:
                                    "#fff4d6",
                                  color:
                                    "#997404",
                                  padding:
                                    "6px 12px",
                                  minWidth:
                                    "105px",
                                  justifyContent:
                                    "center",
                                  fontWeight:
                                    "600",
                                  fontSize:
                                    "12px",
                                  border:
                                    "1px solid #ffe69c",
                                }}
                              >

                                <span
                                  className="rounded-circle me-2"
                                  style={{
                                    width: "7px",
                                    height: "7px",
                                    background:
                                      "#f59e0b",
                                  }}
                                />

                                APPROVED

                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="text-center">

                              <button
                                className="btn btn-sm d-inline-flex align-items-center gap-1 text-primary"
                                style={{
                                  background:
                                    "#e9f7ef",
                                  border:
                                    "1px solid #cfe8d8",
                                  fontWeight:
                                    "600",
                                  padding:
                                    "6px 12px",
                                }}
                                onClick={() =>
                                  handleFeePay(
                                    admission.id
                                  )
                                }
                              >

                                <FaMoneyBill  size={12} />

                                Fee Pay

                              </button>

                            </td>

                          </tr>

                        );
                      }
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

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

                pending admission(s)

              </small>

              <small className="text-muted">

                Status:{" "}

                <strong
                  style={{
                    color: "#997404",
                  }}
                >
                  APPROVED
                </strong>

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
            background-color: #fffdf7;
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
            border-color: #198754;
            box-shadow:
              0 0 0 0.15rem
              rgba(25, 135, 84, 0.10);
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

/* =========================================================
   TABLE HEADER STYLE
========================================================= */

const headerStyle = {
  minWidth: "140px",
  padding: "14px 12px",
  fontSize: "12px",
  color: "#6c757d",
  fontWeight: "700",
};

export default PendingAdmission;
