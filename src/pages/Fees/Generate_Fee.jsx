import axios from "axios";
import { useState, useEffect } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Generate_Fee = () => {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

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

  const standards = [
    "Nursery",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/students/search", {
        params: {
          academicYear: filters.session || null,
          studentClass: filters.standard || null,
          section: filters.section || null,
          search:
            filters.admissionNumber ||
            filters.studentName ||
            filters.fatherName ||
            filters.motherName ||
            filters.phone ||
            null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleView = (admissionNumber) => {
    navigate(`/fee/generate_fee/${admissionNumber}`);
  };

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

    loadStudents();
  };

  return (
    <div className="container-fluid px-2 px-md-3 pb-4 mt-3">
      <div
        className="bg-white shadow rounded-3 p-3 p-md-4 mb-3"
        style={{
          borderLeft: "5px solid #0d6efd",
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <h4 className="mb-1 fw-bold text-dark">
              Generate Fee - Student Wise
            </h4>

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

                <li className="breadcrumb-item active text-primary">
                  Generate Fee
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-3 mt-md-0">
            <span className="badge bg-primary-subtle text-primary px-3 py-2">
              Student Wise Fee
            </span>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow rounded-3 mb-4">
        <div className="card-header bg-white  border-0 rounded-top-3 py-3">
          <div className="d-flex align-items-center">
            <LuSearch size={20} className="me-2" />
            <strong>Search Student</strong>
          </div>
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row g-3 align-items-end">
            <div className="col-lg-4 col-md-6">
              <label className="form-label fw-semibold">
                Academic Year
              </label>

              <select
                name="session"
                value={filters.session}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Academic Year</option>

                {[
                  "2026-27",
                  "2025-26",
                  "2024-25",
                  "2023-24",
                  "2022-23",
                ].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label fw-semibold">
                Admission Number
              </label>

              <input
                type="text"
                name="admissionNumber"
                value={filters.admissionNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter admission number"
              />
            </div>

            <div className="col-lg-2 col-md-6">
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={() => setShowInput((prev) => !prev)}
              >
                <LuSlidersHorizontal className="me-2" />

                {showInput ? "Hide Filters" : "More Filters"}

                {showInput ? (
                  <FaAngleDoubleUp className="ms-2" />
                ) : (
                  <FaAngleDoubleDown className="ms-2" />
                )}
              </button>
            </div>

            <div className="col-lg-2 col-md-6">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleFilter}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Searching
                  </>
                ) : (
                  <>
                    <LuSearch className="me-2" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {showInput && (
            <div className="mt-4 pt-4 border-top">
              <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Student Name
                  </label>

                  <input
                    type="text"
                    name="studentName"
                    value={filters.studentName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Student name"
                  />
                </div>

                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Father's Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={filters.fatherName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Father's name"
                  />
                </div>

                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={filters.motherName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Mother's name"
                  />
                </div>

                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={filters.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Mobile number"
                  />
                </div>

                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Standard
                  </label>

                  <select
                    name="standard"
                    value={filters.standard}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Standard</option>

                    {standards.map((std) => (
                      <option key={std} value={std}>
                        {std}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-semibold">
                    Section
                  </label>

                  <select
                    name="section"
                    value={filters.section}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Section</option>

                    {sections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-3 col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={handleReset}
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="col-lg-3 col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleFilter}
                    disabled={loading}
                  >
                    <LuSearch className="me-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow rounded-3">
        <div className="card-header bg-white  border-0 rounded-top-3 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <strong>Student List</strong>
            </div>

            <span className="badge bg-white text-primary px-3 py-2">
              {students.length} Students
            </span>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive p-2">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center">#</th>
                  <th>Admission No</th>
                  <th>Student Name</th>
                  <th>Phone No</th>
                  <th>Email</th>
                  <th>Standard</th>
                  <th>Section</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      />

                      <div className="mt-2 text-muted">
                        Loading students...
                      </div>
                    </td>
                  </tr>
                ) : students.length > 0 ? (
                  students.map((stu, index) => (
                    <tr key={stu.id || stu.admissionNumber || index}>
                      <td className="text-center fw-semibold">
                        {index + 1}
                      </td>

                      <td>
                        <span className="fw-semibold text-primary">
                          {stu.admissionNumber || "N/A"}
                        </span>
                      </td>

                      <td>
                        {`${stu.firstName || ""} ${
                          stu.middleName || ""
                        } ${stu.lastName || ""}`.trim() || "N/A"}
                      </td>

                      <td>
                        {stu.fatherMobile ||
                          stu.motherMobile ||
                          "N/A"}
                      </td>

                      <td>
                        {stu.email ||
                          stu.fatherEmail ||
                          stu.motherEmail ||
                          "N/A"}
                      </td>

                      <td>
                        {stu.class || stu.studentClass || "N/A"}
                      </td>

                      <td>
                        {stu.section || "N/A"}
                      </td>

                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-success btn-sm px-3"
                          onClick={() =>
                            handleView(stu.admissionNumber)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <div className="text-danger fw-semibold">
                        No Student Found
                      </div>

                      <small className="text-muted">
                        No student found for the selected filters.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate_Fee;