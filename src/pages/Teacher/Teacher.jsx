

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
} from "react-icons/fa";

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
        `${teacher.firstName || ""} ${teacher.middleName || ""} ${
          teacher.lastName || ""
        }`
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
      // Agar backend delete API available hai to yahan use karo.
      // await axios.delete(`/api/teachers/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));

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

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const getStatusBadge = (status) => {
    const value = String(status || "").toLowerCase();

    if (value === "working" || value === "active") {
      return (
        <span className="badge bg-success px-3 py-2">
          {status}
        </span>
      );
    }

    if (value === "resign" || value === "inactive") {
      return (
        <span className="badge bg-danger px-3 py-2">
          {status}
        </span>
      );
    }

    return (
      <span className="badge bg-secondary px-3 py-2">
        {status || "N/A"}
      </span>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="container-fluid px-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div className="card-body text-center py-5">
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
      <div className="container-fluid px-2 mt-3">
        <div className="alert alert-danger shadow-sm">
          {error}
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

      <div className="container-fluid px-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div className="card-body py-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FaUserTie size={18} />
                  </div>

                  <div>
                    <h5 className="mb-0 fw-bold">
                      Teacher
                    </h5>

                    <small className="text-muted">
                      Manage all teachers
                    </small>
                  </div>
                </div>
              </div>

              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      className="text-decoration-none text-dark"
                    >
                      Home
                    </a>
                  </li>

                  <li className="breadcrumb-item active">
                    Teacher
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH / FILTER CARD
      ===================================================== */}

      <div className="container-fluid px-2 mt-3">
        <div className="card border-0 shadow rounded-4">
          <div className="card-header bg-white border-0 pt-3 px-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">
                <FaSearch className="text-primary me-2" />
                Search Teacher
              </h6>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-3 align-items-end">
              {/* Employee ID */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Employee ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter employee ID"
                  value={searchId}
                  onChange={(e) =>
                    setSearchId(e.target.value)
                  }
                />
              </div>

              {/* Teacher Name */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Teacher Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter teacher name"
                  value={searchName}
                  onChange={(e) =>
                    setSearchName(e.target.value)
                  }
                />
              </div>

              {/* Status */}

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
                  <option value="">All Status</option>
                  <option value="Working">
                    Working
                  </option>
                  <option value="Resign">
                    Resign
                  </option>
                </select>
              </div>

              {/* Add Button */}

              <div className="col-xl-3 col-md-6">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleAddTeacher}
                >
                  <FaPlus className="me-2" />
                  Add Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TEACHER TABLE
      ===================================================== */}

      <div className="container-fluid px-2 mt-3 mb-4">
        <div className="card border-0 shadow rounded-4">
          {/* Table Header */}

          <div className="card-header bg-white border-0 pt-3 px-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h6 className="fw-bold mb-1">
                  Teacher List
                </h6>

                <small className="text-muted">
                  Total Teachers: {filteredTeachers.length}
                </small>
              </div>

              <span className="badge bg-primary px-3 py-2">
                {filteredTeachers.length} Records
              </span>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table table-hover table-bordered align-middle mb-0"
                style={{ minWidth: "1200px" }}
              >
                <thead>
                  <tr>
                    <th
                      className="bg-primary text-white text-center"
                      style={{ width: "70px" }}
                    >
                      S.No
                    </th>

                    <th className="bg-primary text-white text-center">
                      Photo
                    </th>

                    <th className="bg-primary text-white">
                      Employee ID
                    </th>

                    <th className="bg-primary text-white">
                      Teacher Name
                    </th>

                    <th className="bg-primary text-white">
                      DOB
                    </th>

                    <th className="bg-primary text-white">
                      Gender
                    </th>

                    <th className="bg-primary text-white">
                      Address
                    </th>

                    <th className="bg-primary text-white">
                      Contact
                    </th>

                    <th className="bg-primary text-white text-center">
                      Status
                    </th>

                    <th
                      className="bg-primary text-white text-center"
                      style={{ width: "180px" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((teacher, index) => (
                      <tr key={teacher.id}>
                        {/* S.No */}

                        <td className="text-center fw-semibold">
                          {indexOfFirstItem + index + 1}
                        </td>

                        {/* Photo */}

                        <td className="text-center">
                          {teacher.photo ? (
                            <img
                              src={teacher.photo}
                              alt="Teacher"
                              className="rounded-circle border"
                              style={{
                                width: "55px",
                                height: "55px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-light border d-flex align-items-center justify-content-center mx-auto text-primary"
                              style={{
                                width: "55px",
                                height: "55px",
                              }}
                            >
                              <FaUserTie />
                            </div>
                          )}
                        </td>

                        {/* Employee ID */}

                        <td>
                          <span className="fw-semibold">
                            {teacher.employeeId || "-"}
                          </span>
                        </td>

                        {/* Name */}

                        <td>
                          <div className="fw-semibold text-primary">
                            {teacher.firstName || ""}{" "}
                            {teacher.middleName || ""}{" "}
                            {teacher.lastName || ""}
                          </div>
                        </td>

                        {/* DOB */}

                        <td>
                          {teacher.dob || "-"}
                        </td>

                        {/* Gender */}

                        <td>
                          {teacher.gender || "-"}
                        </td>

                        {/* Address */}

                        <td>
                          <span className="text-muted">
                            {teacher.addressLine1 || ""}
                            {teacher.addressLine2
                              ? `, ${teacher.addressLine2}`
                              : ""}
                            {teacher.city
                              ? `, ${teacher.city}`
                              : ""}
                          </span>
                        </td>

                        {/* Contact */}

                        <td>
                          {teacher.phoneNumber || "-"}
                        </td>

                        {/* Status */}

                        <td className="text-center">
                          {getStatusBadge(
                            teacher.status
                          )}
                        </td>

                        {/* Actions */}

                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                              onClick={() =>
                                handleView(teacher)
                              }
                            >
                              <FaEye />
                            </button>

                            <button
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                              onClick={() =>
                                handleEdit(
                                  teacher.employeeId
                                )
                              }
                            >
                              <FaEdit />
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() =>
                                handleDelete(
                                  teacher.id
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-5"
                      >
                        <div className="text-muted">
                          <FaUserTie
                            size={35}
                            className="mb-2 opacity-50"
                          />

                          <div className="fw-semibold">
                            No Teachers Found
                          </div>

                          <small>
                            Try changing your search
                            filters.
                          </small>
                        </div>
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
            <div className="card-footer bg-white border-0 py-3">
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
                    className="btn btn-sm btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                  >
                    <FaChevronLeft />
                  </button>

                  <span className="fw-semibold px-2">
                    Page {currentPage} of{" "}
                    {totalPages || 1}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    disabled={
                      currentPage === totalPages ||
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
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Teacher;

