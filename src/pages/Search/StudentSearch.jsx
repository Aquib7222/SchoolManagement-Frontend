import React, { useState } from "react";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaSearch,
  FaRedo,
  FaEye,
  FaUsers,
  FaFilter,
} from "react-icons/fa";
import useMasters from "../../hooks/useMasters";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentSearch = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const {
    sessions,
    standards,
    sections,
  } = useMasters();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    session: "",
    admissionNumber: "",
    studentName: "",
    standard: "",
    section: "",
    fatherName: "",
    motherName: "",
    phone: "",
  });

  /* =========================
     RESET FILTERS
  ========================== */
  const handleReset = () => {
    setFilters({
      session: "",
      admissionNumber: "",
      studentName: "",
      standard: "",
      section: "",
      fatherName: "",
      motherName: "",
      phone: "",
    });

    setStudents([]);
    setShowInput(false);
  };

  /* =========================
     SEARCH STUDENT
  ========================== */
  const handleSearch = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/students/all", {
        params: {
          academicYear: filters.session,
          admissionNumber: filters.admissionNumber,
          studentName: filters.studentName,
          fatherName: filters.fatherName,
          motherName: filters.motherName,
          mobile: filters.phone,
          studentClass: filters.standard,
          section: filters.section || null,
        },
      });

      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(
        "Student search error:",
        error.response?.data || error.message
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INPUT CHANGE
  ========================== */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div
        className="bg-white shadow rounded-3 p-3 mb-3 mx-2 mt-3"
        style={{
          borderLeft: "4px solid #0d6efd",
        }}
      >
        <h5 className="mb-1 fw-bold">
          Student Search
        </h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                className="text-decoration-none text-muted"
              >
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">
              Student Search
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          SEARCH CARD
      ====================================================== */}
      <div className="bg-white shadow rounded-3 mx-2 mb-3">

        {/* Section Header */}
        <div
          className="d-flex justify-content-between align-items-center p-3 border-bottom"
          style={{
            borderLeft: "4px solid #0d6efd",
          }}
        >
          <div>
            <h6 className="mb-1 fw-bold">
              <FaSearch className="text-primary me-2" />
              Search Students
            </h6>

            <small className="text-muted">
              Search students using admission, session and personal details
            </small>
          </div>

          <span className="badge bg-primary px-3 py-2">
            <FaUsers className="me-1" />
            {students.length} Students
          </span>
        </div>

        <div className="p-3">

          {/* =================================================
              PRIMARY FILTERS
          ================================================== */}
          <div className="row g-3">

            {/* Session */}
            <div className="col-xl-4 col-md-6">
              <label className="form-label fw-semibold">
                Session
              </label>

              <select
                name="session"
                className="form-select"
                value={filters.session}
                onChange={handleFilterChange}
              >
                <option value="">
                  Select Session
                </option>

                {sessions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Admission Number */}
            <div className="col-xl-4 col-md-6">
              <label className="form-label fw-semibold">
                Admission Number
              </label>

              <input
                type="text"
                name="admissionNumber"
                className="form-control"
                placeholder="Enter admission number"
                value={filters.admissionNumber}
                onChange={handleFilterChange}
              />
            </div>

            {/* Actions */}
            <div className="col-xl-4 col-md-12">
              <label className="form-label fw-semibold d-block">
                &nbsp;
              </label>

              <div className="d-flex gap-2">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  <FaSearch className="me-1" />
                  Search
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowInput((prev) => !prev)
                  }
                >
                  <FaFilter className="me-1" />

                  {showInput ? (
                    <>
                      Hide Filters{" "}
                      <FaAngleDoubleUp />
                    </>
                  ) : (
                    <>
                      More Filters{" "}
                      <FaAngleDoubleDown />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleReset}
                  title="Reset Filters"
                >
                  <FaRedo />
                </button>

              </div>
            </div>
          </div>

          {/* =================================================
              ADVANCED FILTERS
          ================================================== */}
          {showInput && (
            <div
              className="mt-4 pt-3 border-top"
            >
              <div className="mb-3">
                <h6 className="fw-bold mb-1">
                  Advanced Search
                </h6>

                <small className="text-muted">
                  Use additional details to narrow down the student list
                </small>
              </div>

              {/* Row 1 */}
              <div className="row g-3">

                {/* Student Name */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="studentName"
                    className="form-control"
                    placeholder="Enter student name"
                    value={filters.studentName}
                    onChange={handleFilterChange}
                  />
                </div>

                {/* Father Name */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Father Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    className="form-control"
                    placeholder="Enter father name"
                    value={filters.fatherName}
                    onChange={handleFilterChange}
                  />
                </div>

                {/* Mother Name */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Mother Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    className="form-control"
                    placeholder="Enter mother name"
                    value={filters.motherName}
                    onChange={handleFilterChange}
                  />
                </div>

                {/* Mobile */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={filters.phone}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="row g-3 mt-1">

                {/* Standard */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Standard
                  </label>

                  <select
                    name="standard"
                    className="form-select"
                    value={filters.standard}
                    onChange={handleFilterChange}
                  >
                    <option value="">
                      Select Standard
                    </option>

                    {standards.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section */}
                <div className="col-xl-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Section
                  </label>

                  <select
                    name="section"
                    className="form-select"
                    value={filters.section}
                    onChange={handleFilterChange}
                  >
                    <option value="">
                      Select Section
                    </option>

                    {sections.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div className="col-xl-3 col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleSearch}
                  >
                    <FaSearch className="me-2" />
                    Search Students
                  </button>
                </div>

                {/* Reset */}
                <div className="col-xl-3 col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={handleReset}
                  >
                    <FaRedo className="me-2" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          STUDENT LIST
      ====================================================== */}
      <div className="bg-white shadow rounded-3 mx-2 mb-4">

        {/* List Header */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-3 border-bottom"
        >
          <div>
            <h6 className="mb-1 fw-bold">
              <FaUsers className="text-primary me-2" />
              Student List
            </h6>

            <small className="text-muted">
              Search result of students
            </small>
          </div>

          <div>
            <span className="badge bg-primary px-3 py-2">
              Total : {students.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive p-3">
          <table className="table table-bordered table-hover align-middle text-center mb-0">

            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>
                  S.No
                </th>

                <th>
                  Admission No
                </th>

                <th className="text-start">
                  Student Name
                </th>

                <th>
                  Class
                </th>

                <th className="text-start">
                  Father Name
                </th>

                <th className="text-start">
                  Mother Name
                </th>

                <th>
                  Mobile
                </th>

                <th className="text-start">
                  Address
                </th>

                <th style={{ width: "90px" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="py-5"
                  >
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />

                    <div className="mt-2 text-muted">
                      Searching students...
                    </div>
                  </td>
                </tr>
              ) : students.length > 0 ? (

                /* Students */
                students.map((student, index) => (
                  <tr key={student.id}>

                    <td className="fw-semibold">
                      {index + 1}
                    </td>

                    <td>
                      <span className="badge bg-primary-subtle text-primary">
                        {student.admissionNumber}
                      </span>
                    </td>

                    <td className="text-start fw-semibold">
                      {student.firstName}{" "}
                      {student.middleName || ""}{" "}
                      {student.lastName || ""}
                    </td>

                    <td>
                      <span className="badge bg-light text-dark border">
                        {student.studentClass}
                        {student.section
                          ? ` (${student.section})`
                          : ""}
                      </span>
                    </td>

                    <td className="text-start">
                      {student.fatherName || "-"}
                    </td>

                    <td className="text-start">
                      {student.motherName || "-"}
                    </td>

                    <td>
                      {student.mobile || "-"}
                    </td>

                    <td className="text-start">
                      {[
                        student.houseNo,
                        student.street,
                        student.town,
                        student.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}

                      {student.zip && (
                        <> - {student.zip}</>
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="View Student"
                        onClick={() =>
                          navigate(
                            `/student/view/${student.admissionNumber}`
                          )
                        }
                      >
                        <FaEye className="me-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))

              ) : (

                /* No Data */
                <tr>
                  <td
                    colSpan="9"
                    className="py-5"
                  >
                    <div className="text-muted">
                      <FaUsers
                        size={35}
                        className="mb-2 opacity-50"
                      />

                      <div className="fw-semibold">
                        No Student Found
                      </div>

                      <small>
                        Try changing your search filters.
                      </small>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentSearch;