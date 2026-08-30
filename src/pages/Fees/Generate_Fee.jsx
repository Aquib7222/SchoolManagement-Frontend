import axios from "axios";
import { useState, useEffect } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  MdFilterListAlt,
  MdMoney,
  MdOutlineFormatListBulleted,
  MdOutlineSchool,
} from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";

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
   <>
      <div className="mx-2 mt-2 mb-3 ">
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
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdMoney size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Generate Fee
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/ &nbsp; Generate Fee
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Fees
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
              Home &nbsp;›&nbsp; Fees &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Genereate Fee 
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="card border-0 shadow rounded-4 mb-4 ">
          <div className="card-header bg-white border-bottom-2  rounded-top-3 py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-2"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <MdFilterListAlt size={20} className="" />
              </div>

              <div className="d-flex flex-column">
                <h6 className="mb-0 lh-1">Search Student</h6>
                <small className="lh-1 text-muted">
                  Search student to generate fee
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-3 p-md-4 ">
            <div className="row g-3 align-items-end">
              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold small">
                  Academic Year
                </label>

                <div className="position-relative">
                  <FaCalendarDays
                    className="position-absolute text-primary"
                    size={14}
                    style={{
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  <select
                    name="session"
                    value={filters.session}
                    onChange={handleChange}
                    className="form-select ps-5"
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
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold small">
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

              <div className="col-lg-1 col-md-3">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 rounded-3"
                  onClick={() => setShowInput((prev) => !prev)}
                >
                  {/* {showInput ? "Hide Filters" : "More Filters"} */}

                  {showInput ? (
                    <FaAngleDoubleUp className="ms-2" />
                  ) : (
                    <FaAngleDoubleDown className="ms-2" />
                  )}
                </button>
              </div>

              <div className="col-lg-2 col-md-3">
                <button
                  type="button"
                  className="btn btn-primary w-100 rounded-3"
                  onClick={handleFilter}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Searching Students
                    </>
                  ) : (
                    <>
                      <RiSearchLine className="me-2" />
                      Load Students
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
                    <label className="form-label fw-semibold">Standard</label>

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
                    <label className="form-label fw-semibold">Section</label>

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
      </div>
      <div className="px-2">
        <div className="card border-0  shadow rounded-4">
          <div className="card-header bg-white  border-0 rounded-top-3 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-2"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdOutlineFormatListBulleted size={20} className="" />
                </div>
                <h6>Student List</h6>
              </div>

              <span className="badge  text-primary px-3 py-2" style={{background:"#e3f4fc"}}>
                {students.length} Students
              </span>
            </div>
          </div>

          <div className="card-body p-1 rounded-4 shadow">
            <div className="table-responsive ">
              <table className="table  align-middle mb-0 fw-medium small">
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
                        <td className="text-center fw-semibold">{index + 1}</td>

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

                        <td>{stu.fatherMobile || stu.motherMobile || "N/A"}</td>

                        <td>
                          {stu.email ||
                            stu.fatherEmail ||
                            stu.motherEmail ||
                            "N/A"}
                        </td>

                        <td >{ stu.studentClass || "N/A"}</td>

                        <td>{stu.section || "N/A"}</td>

                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm px-3 rounded-3"
                            onClick={() => handleView(stu.admissionNumber)}
                          >
                            View 
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
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
    </>
  );
};

export default Generate_Fee;
