import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaPlus, FaRedo, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const NewAdmission = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [admissions, setAdmissions] = useState([]);

  // =========================
  // Masters
  // =========================
  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);

  // =========================
  // Filters
  // =========================
  const [filters, setFilters] = useState({
    session: "",
    standard: "",
    status: "",
    appliedDate: "",
  });

  // =========================
  // Loading
  // =========================
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);

  // =========================
  // Load Masters
  // =========================
  useEffect(() => {
    loadSessions();
    loadStandards();
  }, []);

  // =========================
  // Load Admissions
  // =========================
  useEffect(() => {
    if (user?.schoolId) {
      loadAdmissions();
    }
  }, [user?.schoolId]);

  // =========================
  // Sessions
  // =========================
  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data || []);
    } catch (error) {
      console.log("Session Error:", error);
    }
  };

  // =========================
  // Standards
  // =========================
  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStandards(res.data || []);
    } catch (error) {
      console.log("Standard Error:", error);
    }
  };

  // =========================
  // Load Admissions
  // =========================
  const loadAdmissions = async () => {
    if (!user?.schoolId) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/admissions/school?schoolId=${user.schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissions(res.data || []);
    } catch (error) {
      console.log("Admission Error:", error);
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Filter Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Filter Admissions
  // =========================
  const filteredAdmissions = useMemo(() => {
    return admissions.filter((item) => {
      const matchSession =
        !filters.session || item.academicYear === filters.session;

      const matchStandard =
        !filters.standard || item.studentClass === filters.standard;

      const matchStatus =
        !filters.status || item.status === filters.status;

      const itemDate = item.today
        ? String(item.today).substring(0, 10)
        : "";

      const matchDate =
        !filters.appliedDate || itemDate === filters.appliedDate;

      return (
        matchSession &&
        matchStandard &&
        matchStatus &&
        matchDate
      );
    });
  }, [admissions, filters]);

  // =========================
  // Reset
  // =========================
  const handleReset = () => {
    setFilters({
      session: "",
      standard: "",
      status: "",
      appliedDate: "",
    });
  };

  // =========================
  // Update Status
  // =========================
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

      // Update locally instead of unnecessary API call
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
      console.log("Status Update Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update admission status"
      );
    } finally {
      setStatusUpdating(null);
    }
  };

  // =========================
  // Status Badge
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-success text-white";

      case "Call for Test":
        return "bg-info text-dark";

      case "Call for Interview":
        return "bg-warning text-dark";

      case "On Hold":
        return "bg-secondary";

      case "Rejected":
        return "bg-danger";

      case "Waiting for Confirmation":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";
    }
  };

  // =========================
  // Format Date
  // =========================
  const formatDate = (date) => {
    if (!date) return "N/A";

    const value = String(date).substring(0, 10);

    const parts = value.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}
        <div
        className="bg-white shadow rounded-3 p-3 mb-3 mt-3"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <h4 className="mb-1 fw-bold text-dark">
          New Admission
        </h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              Home
            </li>

            <li className="breadcrumb-item">
              Admission
            </li>

            <li className="breadcrumb-item active text-primary">
              New Admissions
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}
      <div className="card shadow border-0 rounded-3  mt-3">
        <div className="card-header bg-white p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <strong>Admission Search</strong>
            </h5>

            <span className="badge bg-primary">
              Total : {filteredAdmissions.length}
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-3">

            {/* Session */}
            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Session
              </label>

              <select
                name="session"
                value={filters.session}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">All Sessions</option>

                {sessions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Standard */}
            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Applied Standard
              </label>

              <select
                name="standard"
                value={filters.standard}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">All Standards</option>

                {standards.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Status
              </label>

              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Call for Test">
                  Call for Test
                </option>
                <option value="Call for Interview">
                  Call for Interview
                </option>
                <option value="On Hold">On Hold</option>
                <option value="Rejected">Rejected</option>
                <option value="Waiting for Confirmation">
                  Waiting for Confirmation
                </option>
              </select>
            </div>

            {/* Applied Date */}
            <div className="col-xl-3 col-md-6">
              <label className="form-label fw-semibold">
                Applied Date
              </label>

              <input
                type="date"
                name="appliedDate"
                value={filters.appliedDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {}}
            >
              <FaSearch className="me-1" />
              Search
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <FaRedo className="me-1" />
              Reset
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                navigate("/admission/new_admission/add")
              }
            >
              <FaPlus className="me-1" />
              Add Admission
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADMISSION TABLE
      ===================================================== */}
      <div className="card shadow border-0 rounded-3  mt-3">

        <div className="card-header bg-white d-flex justify-content-between align-items-center p-3">
          <h5 className="mb-0">
            <strong>Admission List</strong>
          </h5>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={loadAdmissions}
            disabled={loading}
          >
            <FaRedo className={loading ? "me-1 spin" : "me-1"} />
            Refresh
          </button>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive p-3">

            <table className="table table-bordered table-striped table-hover align-middle mb-0">

              <thead className="table-primary">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Admission No</th>
                  <th>Parents Details</th>
                  <th>Mobile No</th>
                  <th>Session</th>
                  <th>Standard</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">
                          Loading...
                        </span>
                      </div>

                      <div className="mt-2">
                        Loading admissions...
                      </div>
                    </td>
                  </tr>
                ) : filteredAdmissions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center text-danger fw-semibold py-4"
                    >
                      No admission record found
                    </td>
                  </tr>
                ) : (
                  filteredAdmissions.map((item, index) => (
                    <tr key={item.id}>

                      {/* S.No */}
                      <td>{index + 1}</td>

                      {/* Name */}
                      <td>
                        <strong>
                          {item.firstName || ""}
                          {item.middleName
                            ? ` ${item.middleName}`
                            : ""}
                          {item.lastName
                            ? ` ${item.lastName}`
                            : ""}
                        </strong>
                      </td>

                      {/* Admission Number */}
                      <td>
                        <span className="fw-bold text-primary">
                          {item.admissionNumber || "N/A"}
                        </span>
                      </td>

                      {/* Parents */}
                      <td>
                        <div>
                          <strong>Father:</strong>{" "}
                          {item.fatherName || "N/A"}
                        </div>

                        <div>
                          <strong>Mother:</strong>{" "}
                          {item.motherName || "N/A"}
                        </div>

                        {(item.fatherEmail ||
                          item.motherEmail) && (
                          <small className="text-muted">
                            {item.fatherEmail ||
                              item.motherEmail}
                          </small>
                        )}
                      </td>

                      {/* Mobile */}
                      <td>
                        {item.fatherMobile ||
                          item.motherMobile ||
                          "N/A"}
                      </td>

                      {/* Session */}
                      <td>
                        {item.academicYear || "N/A"}
                      </td>

                      {/* Standard */}
                      <td>
                        {item.studentClass || "N/A"}
                      </td>

                      {/* Status */}
                      <td>
                        <select
                          className={`form-select form-select-sm ${getStatusClass(
                            item.status
                          )}`}
                          value={item.status || ""}
                          disabled={
                            statusUpdating === item.id
                          }
                          onChange={(e) =>
                            updateStatus(
                              item.id,
                              e.target.value
                            )
                          }
                          style={{
                            minWidth: "180px",
                            fontWeight: "600",
                            
                          }}
                        >
                          <option value="New">New</option>

                          <option value="Call for Test">
                            Call for Test
                          </option>

                          <option value="Call for Interview">
                            Call for Interview
                          </option>

                          <option value="On Hold">
                            On Hold
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                          <option value="Waiting for Confirmation">
                            Waiting for Confirmation
                          </option>
                        </select>
                      </td>

                      {/* Applied Date */}
                      <td>
                        {formatDate(item.today)}
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          title="Edit Admission"
                          onClick={() =>
                            navigate(
                              `/admission/new_admission/edit/${item.id}`
                            )
                          }
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
        </div>

        {/* Footer */}
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between align-items-center">

            <small className="text-muted">
              Showing{" "}
              <strong className="text-primary">
                {filteredAdmissions.length}
              </strong>{" "}
              admission(s)
            </small>

            <small className="text-muted">
              Total Admissions:{" "}
              <strong>{admissions.length}</strong>
            </small>

          </div>
        </div>

      </div>
    </>
  );
};

export default NewAdmission;