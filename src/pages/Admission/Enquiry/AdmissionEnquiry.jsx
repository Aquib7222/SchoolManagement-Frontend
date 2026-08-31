import React, { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaRedo,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserGraduate,
  FaPhone,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const AdmissionEnquiry = () => {
  const navigate = useNavigate();
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const [searchTerm, setSearchTerm] = useState("");
  const [enquiries, setEnquiries] = useState([]);

  const [filters, setFilters] = useState({
    session: "",
    standard: "",
    status: "",
  });

  const [enquiryStatus, setEnquiryStatus] = useState([]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchEnquiries = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/admission-enquiry/school",
          {
            params: {
              schoolId,
            },
          },
        );

        setEnquiries(response.data);
      } catch (error) {
        console.error("Failed to fetch admission enquiries:", error);
      }
    };

    fetchEnquiries();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchEnquiriesStatus = async () => {
      try {
        const response = await axiosInstance.get("/api/master/enquiry-status");

        setEnquiryStatus(response.data);
      } catch (error) {
        console.error("Failed to fetch admission enquiries:", error);
      }
    };

    fetchEnquiriesStatus();
  }, [schoolId]);

  console.log("enquiryStatus", enquiryStatus);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setSearchTerm("");

    setFilters({
      session: "",
      standard: "",
      status: "",
    });
  };

  const filteredEnquiries = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return enquiries.filter((item) => {
      const matchSearch =
        !search ||
        item.studentName?.toLowerCase().includes(search) ||
        item.enquiryNo?.toLowerCase().includes(search) ||
        item.fatherName?.toLowerCase().includes(search) ||
        item.mobile?.includes(search);

      const matchSession = !filters.session || item.session === filters.session;

      const matchStandard =
        !filters.standard || item.standard === filters.standard;

      const matchStatus = !filters.status || item.status === filters.status;

      return matchSearch && matchSession && matchStandard && matchStatus;
    });
  }, [enquiries, searchTerm, filters]);

  const totalEnquiries = enquiries.length;

  const pendingEnquiries = enquiries.filter(
    (item) => item.status === "PENDING",
  ).length;

  const followUpEnquiries = enquiries.filter(
    (item) => item.status === "FOLLOW_UP",
  ).length;

  const admittedEnquiries = enquiries.filter(
    (item) => item.status === "ADMITTED",
  ).length;

  const sessions = [
    ...new Set(enquiries.map((item) => item.session).filter(Boolean)),
  ];

  const standards = [
    ...new Set(enquiries.map((item) => item.standard).filter(Boolean)),
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "ADMITTED":
        return {
          bg: "#e8f7ee",
          color: "#198754",
          dot: "#198754",
          icon: <FaCheckCircle />,
        };

      case "FOLLOW_UP":
        return {
          bg: "#fff4d6",
          color: "#997404",
          dot: "#ffc107",
          icon: <FaClock />,
        };

      case "CANCELLED":
        return {
          bg: "#fff0f0",
          color: "#dc3545",
          dot: "#dc3545",
          icon: <FaTimesCircle />,
        };

      default:
        return {
          bg: "#eef5ff",
          color: "#0d6efd",
          dot: "#0d6efd",
          icon: <FaClock />,
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const handleView = (id) => {
    navigate(`/admission/enquiry/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admission/enquiry/edit/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    const previousEnquiries = [...enquiries];

    // UI immediately update
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );

    try {
      await axiosInstance.patch(`/api/admission-enquiry/${id}/status`, null, {
        params: {
          schoolId,
          status: newStatus,
        },
      });
    } catch (error) {
      console.error("Failed to update enquiry status:", error);

      // rollback if API fails
      setEnquiries(previousEnquiries);

      alert("Failed to update enquiry status.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleNewEnquiry = () => {
    navigate("/admission/enquiry/new");
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
                  className="d-flex align-items-center justify-content-center rounded-4"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUserGraduate size={26} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Admission Enquiry</h5>

                  <div className="text-muted small">
                    Admission &nbsp;/&nbsp; Admission Enquiry
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary d-flex align-items-center gap-2 px-3"
                onClick={handleNewEnquiry}
              >
                <FaPlus size={12} />
                New Enquiry
              </button>
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
                Admission Enquiry
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUserGraduate />
            </div>

            <div className="stat-content">
              <span>Total Enquiries</span>
              <h3>{totalEnquiries}</h3>
              <small>All admission enquiries</small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Pending</span>
              <h3>{pendingEnquiries}</h3>
              <small>Enquiry pending</small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaPhone />
            </div>

            <div className="stat-content">
              <span>Follow Up</span>
              <h3>{followUpEnquiries}</h3>
              <small>Follow-up required</small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Admitted</span>
              <h3>{admittedEnquiries}</h3>
              <small>Converted to admission</small>
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
                  <FaFilter className="text-primary me-2" size={14} />
                  Enquiry Search
                </h6>

                <small className="text-muted">
                  Search and filter admission enquiries
                </small>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#eef5ff",
                  color: "#0d6efd",
                }}
              >
                {filteredEnquiries.length} Records
              </span>
            </div>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-12 col-xl-5">
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
                    placeholder="Name, enquiry no, father name, mobile..."
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

              {/* STATUS */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold small">Status</label>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Status</option>

                  {enquiryStatus.map((item) => (
                    <option key={item} value={item}>
                      {item.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={handleReset}
              >
                <FaRedo className="me-2" size={12} />
                Reset
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
                    background: "#eef5ff",
                    color: "#0d6efd",
                  }}
                >
                  <FaUserGraduate size={16} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">Admission Enquiry List</h6>

                  <small className="text-muted">
                    Manage admission enquiries
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
                  Showing <strong>{filteredEnquiries.length}</strong>
                </span>

                <button
                  className="btn btn-sm btn-light border"
                  onClick={() => setEnquiries([...enquiries])}
                >
                  <FaRedo size={12} className="me-1" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

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
                  <tr>
                    <th className="text-center table-heading">#</th>

                    <th className="table-heading">ENQUIRY NO</th>

                    <th className="table-heading">STUDENT</th>

                    <th className="table-heading">PARENT DETAILS</th>

                    <th className="table-heading">MOBILE</th>

                    <th className="table-heading">STANDARD</th>

                    <th className="table-heading">SESSION</th>

                    <th className="table-heading">ENQUIRY DATE</th>

                    <th className="text-center table-heading">STATUS</th>

                    <th className="text-center table-heading">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-5">
                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#f1f3f5",
                            color: "#868e96",
                          }}
                        >
                          <FaUserGraduate size={23} />
                        </div>

                        <h6 className="fw-semibold text-muted">
                          No Enquiries Found
                        </h6>

                        <small className="text-muted">
                          No admission enquiry matches the selected filters.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((item, index) => {
                      const statusConfig = getStatusConfig(item.status);

                      return (
                        <tr
                          key={item.id}
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

                          {/* ENQUIRY NO */}

                          <td>
                            <span
                              className="fw-bold text-primary"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {item.enquiryNumber}
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
                                  background: "#eef5ff",
                                  color: "#0d6efd",
                                  fontWeight: "700",
                                  fontSize: "13px",
                                }}
                              >
                                {item.studentName?.charAt(0)?.toUpperCase()}
                              </div>

                              <div>
                                <div
                                  className="fw-semibold"
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  {item.studentName}
                                </div>

                                <small className="text-muted">Student</small>
                              </div>
                            </div>
                          </td>

                          {/* PARENT */}

                          <td>
                            <div
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              <div className="mb-1">
                                <span className="text-muted">Father:</span>{" "}
                                <strong>{item.fatherName}</strong>
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
                              {item.phone}
                            </div>
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
                              {item.studentClass}
                            </span>
                          </td>

                          {/* SESSION */}

                          <td>
                            <span
                              className="badge rounded-pill text-primary"
                              style={{
                                background: "#eef5ff",
                                border: "1px solid #dbeafe",
                                fontWeight: "600",
                                padding: "6px 10px",
                              }}
                            >
                              {item.academicYear}
                            </span>
                          </td>

                          {/* DATE */}

                          <td>
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              <FaCalendarDays className="text-muted" />

                              {formatDate(item.enquiryDate)}
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="text-center">
                            <div
                              className="d-inline-flex align-items-center gap-2 rounded-pill px-2"
                              style={{
                                background: statusConfig.bg,
                                border: `1px solid ${statusConfig.color}20`,
                              }}
                            >
                              <span
                                style={{
                                  color: statusConfig.color,
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {statusConfig.icon}
                              </span>

                              <select
                                value={item.status || ""}
                                onChange={(e) =>
                                  handleStatusChange(item.id, e.target.value)
                                }
                                className="border-0 bg-transparent fw-semibold"
                                style={{
                                  color: statusConfig.color,
                                  fontSize: "11px",
                                  padding: "5px 20px 5px 2px",
                                  outline: "none",
                                  cursor: "pointer",
                                  minWidth: "105px",
                                }}
                              >
                                <option value="">Select Status</option>

                                {enquiryStatus.map((status) => (
                                  <option key={status} value={status}>
                                    {status.replaceAll("_", " ")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-1">
                              <button
                                type="button"
                                className="btn btn-sm"
                                title="View"
                                style={{
                                  background: "#eef5ff",
                                  color: "#0d6efd",
                                }}
                                onClick={() => handleView(item.id)}
                              >
                                <FaEye size={12} />
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm"
                                title="Edit"
                                style={{
                                  background: "#fff4d6",
                                  color: "#997404",
                                }}
                                onClick={() => handleEdit(item.id)}
                              >
                                <FaEdit size={12} />
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm"
                                title="Delete"
                                style={{
                                  background: "#fff0f0",
                                  color: "#dc3545",
                                }}
                                onClick={() => handleDelete(item.id)}
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
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
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Showing{" "}
                <strong className="text-primary">
                  {filteredEnquiries.length}
                </strong>{" "}
                enquiry(s)
              </small>

              <small className="text-muted">
                Total Enquiries:{" "}
                <strong className="text-primary">{totalEnquiries}</strong>
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
            background-color: #f8fbff;
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
            box-shadow:
              0 0 0 0.15rem
              rgba(37, 99, 235, 0.10);
          }

          .btn {
            border-radius: 7px;
            font-size: 13px;
            font-weight: 500;
          }

          .table-heading {
            padding: 14px 12px !important;
            font-size: 12px !important;
            color: #6c757d !important;
            font-weight: 700 !important;
            white-space: nowrap;
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

export default AdmissionEnquiry;
