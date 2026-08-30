



import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaRedo,
  FaSearch,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import {
  FaGraduationCap,
  FaFilter,
  FaCalendarDays,
} from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const NewAdmission = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  const [admissions, setAdmissions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
    status: "",
    appliedDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);

  /* =========================================================
     STATUS OPTIONS
  ========================================================= */

  const STATUS_OPTIONS = [
    "APPLIED",
    "APPROVED",
    "ENROLLED",
    "FEE PAID",
  ];

  /* =========================================================
     LOAD MASTERS
  ========================================================= */

  useEffect(() => {
    loadSessions();
    loadStandards();
  }, []);

  /* =========================================================
     LOAD ADMISSIONS
  ========================================================= */

  useEffect(() => {
    if (schoolId) {
      loadAdmissions();
    }
  }, [schoolId]);

  /* =========================================================
     LOAD SESSIONS
  ========================================================= */

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data || []);
    } catch (error) {
      console.error("Session Error:", error);
    }
  };

  /* =========================================================
     LOAD STANDARDS
  ========================================================= */

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data || []);
    } catch (error) {
      console.error("Standard Error:", error);
    }
  };

  /* =========================================================
     LOAD ADMISSIONS
  ========================================================= */

  const loadAdmissions = async () => {
    if (!schoolId) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/admissions/school?schoolId=${schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissions(res.data || []);
    } catch (error) {
      console.error("Admission Error:", error);
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((item) => {
      const matchSession =
        !filters.session ||
        item.academicYear === filters.session;

      const matchStandard =
        !filters.standard ||
        item.studentClass === filters.standard;

      const matchStatus =
        !filters.status ||
        item.status === filters.status;

      const itemDate = item.today
        ? String(item.today).substring(0, 10)
        : "";

      const matchDate =
        !filters.appliedDate ||
        itemDate === filters.appliedDate;

      return (
        matchSession &&
        matchStandard &&
        matchStatus &&
        matchDate
      );
    });
  }, [admissions, filters]);

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setFilters({
      session: "",
      standard: "",
      status: "",
      appliedDate: "",
    });
  };

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
          "Failed to update admission status"
      );
    } finally {
      setStatusUpdating(null);
    }
  };

  /* =========================================================
     STATUS CONFIG
  ========================================================= */

  const getStatusConfig = (status) => {
    switch (status) {
      case "APPLIED":
        return {
          bg: "#e7f5ff",
          color: "#087990",
          dot: "#0dcaf0",
        };

      case "APPROVED":
        return {
          bg: "#e8f7ee",
          color: "#198754",
          dot: "#198754",
        };

      case "ENROLLED":
        return {
          bg: "#eee9ff",
          color: "#6f42c1",
          dot: "#6f42c1",
        };

      case "FEE PAID":
        return {
          bg: "#fff4d6",
          color: "#997404",
          dot: "#ffc107",
        };

      default:
        return {
          bg: "#eef0f2",
          color: "#6c757d",
          dot: "#6c757d",
        };
    }
  };

  /* =========================================================
     STATUS DISABLE LOGIC
     
     APPLIED  -> Editable
     APPROVED -> Disabled
     ENROLLED -> Disabled
     FEE PAID -> Disabled
  ========================================================= */

  const isStatusDisabled = (status) => {
    return (
      status === "APPROVED" ||
      status === "ENROLLED" ||
      status === "FEE PAID"
    );
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = String(date).substring(0, 10);
    const parts = value.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalAdmissions = admissions.length;

  const newAdmissions = admissions.filter(
    (item) => item.status === "APPLIED"
  ).length;

  const approvedAdmissions = admissions.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const enrolledAdmissions = admissions.filter(
    (item) => item.status === "ENROLLED"
  ).length;

  const feePaidAdmissions = admissions.filter(
    (item) => item.status === "FEE PAID"
  ).length;

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
                    New Admissions
                  </h5>

                  <div className="text-muted small">
                    Admission &nbsp;/ &nbsp; New Admissions
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-primary d-flex w-100 align-items-center justify-content-center gap-2 rounded-4"
                  onClick={() =>
                    navigate("/admission/new_admission/add")
                  }
                >
                  <FaPlus size={13} />
                  Add Admission
                </button>
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
              <span className="text-primary fw-semibold">
                New Admissions
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
              <span>Total Applications</span>

              <h3>{totalAdmissions}</h3>

              <small>Total Admissions</small>
            </div>
          </div>
        </div>

        {/* APPLIED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">
              <span>Applied</span>

              <h3>{newAdmissions}</h3>

              <small>New Applications</small>
            </div>
          </div>
        </div>

        {/* APPROVED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaFilter />
            </div>

            <div className="stat-content">
              <span>Approved</span>

              <h3>{approvedAdmissions}</h3>

              <small>Approved Applications</small>
            </div>
          </div>
        </div>

        {/* ENROLLED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <MdOutlinePeopleAlt />
            </div>

            <div className="stat-content">
              <span>Enrolled</span>

              <h3>{enrolledAdmissions}</h3>

              <small>Enrolled Students</small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FEE PAID MINI SUMMARY
      ===================================================== */}

      <div className="px-2 mb-4">
        <div
          className="card border-0 shadow rounded-4"
          style={{
            background:
              "linear-gradient(135deg,#fffdf5,#fff9e6)",
          }}
        >
          <div className="card-body py-3 px-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#fff3cd",
                    color: "#997404",
                  }}
                >
                  <FaGraduationCap size={18} />
                </div>

                <div>
                  <div className="fw-bold">
                    Fee Paid Admissions
                  </div>

                  <small className="text-muted">
                    Applications with completed admission fee
                  </small>
                </div>
              </div>

              <div
                className="fw-bold"
                style={{
                  fontSize: "24px",
                  color: "#997404",
                }}
              >
                {feePaidAdmissions}
              </div>
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
                  <FaFilter
                    className="text-primary me-2"
                    size={14}
                  />
                  Admission Search
                </h6>

                <small className="text-muted">
                  Filter admission records using the options below
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

          <div className="card-body p-3">

            <div className="row g-3">

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Session
                </label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Sessions
                  </option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* STANDARD */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Applied Standard
                </label>

                <select
                  name="standard"
                  value={filters.standard}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Standards
                  </option>

                  {standards.map((std) => (
                    <option key={std} value={std}>
                      {std}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Status
                </label>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">
                    All Status
                  </option>

                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Applied Date
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaCalendarDays
                      className="text-primary"
                      size={14}
                    />
                  </span>

                  <input
                    type="date"
                    name="appliedDate"
                    value={filters.appliedDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
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
          ADMISSION TABLE
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
                    Admission List
                  </h6>

                  <small className="text-muted">
                    Manage all new admission applications
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
                  minWidth: "1250px",
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
                        minWidth: "190px",
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
                      className="text-center"
                      style={{
                        minWidth: "220px",
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
                        minWidth: "125px",
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
                        minWidth: "100px",
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
                          Loading admission records...
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
                          <FaUserGraduate
                            size={23}
                            className="text-primary"
                          />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Admission Records
                        </h6>

                        <small className="text-muted">
                          No admission record matches the
                          selected filters.
                        </small>

                      </td>
                    </tr>

                  ) : (

                    filteredAdmissions.map(
                      (item, index) => {

                        const statusConfig =
                          getStatusConfig(
                            item.status
                          );

                        const studentName = [
                          item.firstName,
                          item.middleName,
                          item.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ");

                        const statusDisabled =
                          isStatusDisabled(
                            item.status
                          );

                        return (
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
                                    width: "38px",
                                    height: "38px",
                                    minWidth: "38px",
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
                                  fontSize: "13px",
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
                                  fontSize: "12px",
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
                                  fontSize: "13px",
                                }}
                              >
                                {item.fatherMobile ||
                                  item.motherMobile ||
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
                                  fontWeight: "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {item.academicYear ||
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
                                  color: "#495057",
                                  border:
                                    "1px solid #e1e5e8",
                                  fontWeight: "600",
                                  padding:
                                    "6px 10px",
                                }}
                              >
                                {item.studentClass ||
                                  "N/A"}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="text-center">

                              <div className="d-flex align-items-center justify-content-center">

                                <div
                                  className="d-flex align-items-center rounded-pill"
                                  style={{
                                    background:
                                      statusConfig.bg,
                                    color:
                                      statusConfig.color,
                                    padding:
                                      "5px 9px",
                                    minWidth:
                                      "205px",
                                    opacity:
                                      statusDisabled
                                        ? 0.85
                                        : 1,
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
                                    value={
                                      item.status ||
                                      "APPLIED"
                                    }
                                    disabled={
                                      statusDisabled ||
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
                                      fontWeight: "600",
                                      fontSize:
                                        "12px",
                                      outline: "none",
                                      cursor:
                                        statusDisabled
                                          ? "not-allowed"
                                          : "pointer",
                                      appearance:
                                        "none",
                                    }}
                                  >

                                    {STATUS_OPTIONS.map(
                                      (status) => (
                                        <option
                                          key={status}
                                          value={status}
                                        >
                                          {status}
                                        </option>
                                      )
                                    )}

                                  </select>

                                  <IoChevronDownOutline
                                    size={13}
                                    style={{
                                      flexShrink: 0,
                                    }}
                                  />

                                </div>

                              </div>

                            </td>

                            {/* DATE */}

                            <td className="text-center">

                              <div
                                className="d-flex align-items-center justify-content-center gap-1"
                                style={{
                                  fontSize: "12px",
                                  color: "#495057",
                                  fontWeight: "500",
                                }}
                              >

                                <FaCalendarDays
                                  size={12}
                                  className="text-muted"
                                />

                                {formatDate(
                                  item.today
                                )}

                              </div>

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
                                  fontWeight: "600",
                                  padding:
                                    "6px 12px",
                                }}
                                title="Edit Admission"
                                onClick={() =>
                                  navigate(
                                    `/admission/new_admission/edit/${item.id}`
                                  )
                                }
                              >

                                <FaEdit size={12} />

                                Edit

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

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="card-footer bg-white p-3"
            style={{
              borderTop: "1px solid #eef0f2",
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
          SMALL CSS
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
            border-color: #198754;
            box-shadow: 0 0 0 0.15rem rgba(25, 135, 84, 0.10);
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

export default NewAdmission;

