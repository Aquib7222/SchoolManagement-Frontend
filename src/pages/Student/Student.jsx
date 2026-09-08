

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaUsers,
  FaFilter,
  FaRedo,
  FaUserGraduate,
  FaIdCard,
  FaSchool,
  FaVenusMars,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";

import useMasters from "../../hooks/useMasters";
import axios from "../../api/axiosInstance";

const Students = () => {
  const { sessions, standards, sections } = useMasters();
  const navigate = useNavigate();

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const token = localStorage.getItem("token");

  // =========================================================
  // SEARCH
  // =========================================================

  const handleFilter = async () => {
    try {
      setSearchLoading(true);

      const res = await axios.get("/api/students/search", {
        params: {
          academicYear: selectedSession || null,
          studentClass: selectedStandard || null,
          section: selectedSection || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Student Search Error:", error);
      setStudents([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setStudents([]);
  };

  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (admissionNumber) => {
    navigate(`/student/view/${admissionNumber}`);
  };

  // =========================================================
  // SECTION LIST
  // =========================================================

  const sectionList = Array.isArray(sections)
    ? sections
    : ["A", "B", "C", "D"];

  return (
    <>
      <div className="container-fluid px-0">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

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

                {/* LEFT */}

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
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
                    <FaUserGraduate size={27} />
                  </div>

                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Students
                    </h5>

                    <div className="text-muted small">
                      Student Management&nbsp; / &nbsp;Student List
                    </div>

                  </div>

                </div>

                {/* RIGHT */}

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
                    Students
                  </span>

                </div>

              </div>

            </div>

            {/* BREADCRUMB */}

            <div
              className="px-4 py-2"
              style={{
                backgroundColor:
                  "rgba(239,246,255,.75)",
                borderTop: "1px solid #e0ecff",
              }}
            >

              <small className="text-muted">

                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </span>

                &nbsp;›&nbsp; Student Management &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Students
                </span>

              </small>

            </div>

          </div>

        </div>


        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="row g-3 mb-4 px-2">

          {/* TOTAL STUDENTS */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-blue shadow">

              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">

                <span>Total Students</span>

                <h3>
                  {students.length.toLocaleString("en-IN")}
                </h3>

                <small>
                  Students found
                </small>

              </div>

            </div>

          </div>


          {/* MALE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-green shadow">

              <div className="stat-icon">
                <FaUserGraduate />
              </div>

              <div className="stat-content">

                <span>Male Students</span>

                <h3>
                  {students.filter(
                    (s) => s.gender === "MALE"
                  ).length.toLocaleString("en-IN")}
                </h3>

                <small>
                  Male students
                </small>

              </div>

            </div>

          </div>


          {/* FEMALE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-orange shadow">

              <div className="stat-icon">
                <FaVenusMars />
              </div>

              <div className="stat-content">

                <span>Female Students</span>

                <h3>
                  {students.filter(
                    (s) => s.gender === "FEMALE"
                  ).length.toLocaleString("en-IN")}
                </h3>

                <small>
                  Female students
                </small>

              </div>

            </div>

          </div>


          {/* FILTERED */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-red shadow">

              <div className="stat-icon">
                <FaFilter />
              </div>

              <div className="stat-content">

                <span>Filtered Records</span>

                <h3>
                  {students.length.toLocaleString("en-IN")}
                </h3>

                <small>
                  Current search result
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            FILTER CARD
        ====================================================== */}

        <div className="px-2">

          <div className="card shadow border-0 mb-4 rounded-4">

            {/* HEADER */}

            <div
              className="card-header bg-white py-3"
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >

              <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "42px",
                      height: "42px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <FaSearch size={20} />
                  </div>

                  <div className="d-flex flex-column ms-2">

                    <h6 className="mb-0 lh-1">
                      Student Filter
                    </h6>

                    <small className="lh-1 text-muted mt-1">
                      Filter students by academic year, class and section
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <FaUsers className="me-1" />
                  Student Search
                </span>

              </div>

            </div>


            {/* BODY */}

            <div className="card-body p-4">

              <div className="row g-3">

                {/* ACADEMIC YEAR */}

                <div className="col-xl-3 col-md-6">

                  <label className="form-label fw-semibold">
                    Academic Year
                  </label>

                  <select
                    className="form-select"
                    value={selectedSession}
                    onChange={(e) =>
                      setSelectedSession(e.target.value)
                    }
                  >

                    <option value="">
                      All Academic Years
                    </option>

                    {sessions.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>


                {/* STANDARD */}

                <div className="col-xl-3 col-md-6">

                  <label className="form-label fw-semibold">
                    Standard
                  </label>

                  <select
                    className="form-select"
                    value={selectedStandard}
                    onChange={(e) =>
                      setSelectedStandard(e.target.value)
                    }
                  >

                    <option value="">
                      All Standards
                    </option>

                    {standards.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item === "NURSERY"
                          ? "Nursery"
                          : item}
                      </option>
                    ))}

                  </select>

                </div>


                {/* SECTION */}

                <div className="col-xl-3 col-md-6">

                  <label className="form-label fw-semibold">
                    Section
                  </label>

                  <select
                    className="form-select"
                    value={selectedSection}
                    onChange={(e) =>
                      setSelectedSection(e.target.value)
                    }
                  >

                    <option value="">
                      All Sections
                    </option>

                    {sectionList.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        Section {item}
                      </option>
                    ))}

                  </select>

                </div>


                {/* BUTTONS */}

                <div className="col-xl-3 col-md-6 d-flex align-items-end">

                  <div className="d-flex gap-2 w-100">

                    <button
                      className="btn btn-primary rounded-3 flex-grow-1"
                      onClick={handleFilter}
                      disabled={searchLoading}
                    >

                      {searchLoading ? (
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
                          Search
                        </>
                      )}

                    </button>

                    <button
                      className="btn btn-outline-secondary rounded-3 px-3"
                      onClick={handleReset}
                      title="Reset Filters"
                    >
                      <FaRedo />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            STUDENT TABLE
        ====================================================== */}

        <div className="px-2">

          <div className="card shadow border-0 rounded-4 mb-4">

            {/* TABLE HEADER */}

            <div
              className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaUsers size={22} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Student Records
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Student details and academic information
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                {students.length} Records
              </span>

            </div>


            {/* TABLE */}

            <div className="card-body px-0">

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead
                    className="small text-center"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >

                    <tr>

                      <th>#</th>

                      <th className="text-start">
                        Student
                      </th>

                      <th>
                        Admission No
                      </th>

                      <th>
                        Standard
                      </th>

                      <th>
                        Address
                      </th>

                      <th>
                        Gender
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody className="text-center small">

                    {/* LOADING */}

                    {searchLoading ? (

                      <tr>

                        <td
                          colSpan="7"
                          className="text-center py-5"
                        >

                          <div
                            className="spinner-border text-primary"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                            }}
                          />

                          <div className="mt-2 text-muted">
                            Loading students...
                          </div>

                        </td>

                      </tr>

                    ) : students.length > 0 ? (

                      students.map((s, index) => (

                        <tr
                          key={
                            s.id ||
                            s.admissionNumber ||
                            index
                          }
                        >

                          {/* SERIAL */}

                          <td className="fw-semibold">
                            {index + 1}
                          </td>


                          {/* STUDENT */}

                          <td className="text-start">

                            <div className="d-flex align-items-center">

                              <img
                                src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                                  `${s.firstName || ""} ${
                                    s.lastName || ""
                                  }`
                                )}`}
                                alt="student"
                                width="42"
                                height="42"
                                className="rounded-circle me-3"
                              />

                              <div>

                                <div className="fw-semibold text-dark">
                                  {s.firstName} {s.lastName}
                                </div>

                                <small className="text-muted">
                                  Student
                                </small>

                              </div>

                            </div>

                          </td>


                          {/* ADMISSION */}

                          <td>

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                border:
                                  "1px solid #bfdbfe",
                                fontWeight: 600,
                              }}
                            >
                              <FaIdCard className="me-1" />
                              {s.admissionNumber}
                            </span>

                          </td>


                          {/* STANDARD */}

                          <td>

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                backgroundColor: "#f1f5f9",
                                color: "#334155",
                                border:
                                  "1px solid #cbd5e1",
                              }}
                            >
                              <FaSchool className="me-1" />

                              {s.studentClass === "NURSERY"
                                ? "Nursery"
                                : s.studentClass}

                              {s.section && (
                                <>
                                  {" / "}
                                  {s.section}
                                </>
                              )}

                            </span>

                          </td>


                          {/* ADDRESS */}

                          <td
                            className="text-start"
                            style={{
                              minWidth: "230px",
                            }}
                          >

                            <small className="text-muted">

                              {[
                                s.houseNo,
                                s.street,
                                s.town,
                                s.state,
                              ]
                                .filter(Boolean)
                                .join(", ")}

                              {s.zip &&
                                ` - ${s.zip}`}

                            </small>

                          </td>


                          {/* GENDER */}

                          <td>

                            <span
                              className={`badge rounded-pill px-3 py-2 ${
                                s.gender === "MALE"
                                  ? "bg-primary"
                                  : s.gender === "FEMALE"
                                  ? "bg-danger"
                                  : "bg-secondary"
                              }`}
                            >
                              <FaVenusMars className="me-1" />
                              {s.gender || "N/A"}
                            </span>

                          </td>


                          {/* ACTION */}

                          <td>

                            <button
                              className="btn btn-outline-primary btn-sm rounded-3 px-3"
                              onClick={() =>
                                handleView(
                                  s.admissionNumber
                                )
                              }
                              title="View Student"
                            >

                              <FaEye className="me-1" />

                              View

                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      /* EMPTY */

                      <tr>

                        <td
                          colSpan="7"
                          className="text-center py-5"
                        >

                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                            style={{
                              width: "65px",
                              height: "65px",
                              backgroundColor:
                                "#f1f5f9",
                              color: "#94a3b8",
                            }}
                          >
                            <FaUsers size={27} />
                          </div>

                          <h6 className="fw-bold text-secondary">
                            No Students Found
                          </h6>

                          <small className="text-muted">
                            Select filters and click
                            Search to load students.
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


        {/* =====================================================
            REPORT FOOTER
        ====================================================== */}

        <div className="px-2">

          <div className="card shadow border-0 rounded-4 mb-5">

            <div className="card-body p-4">

              <div className="row align-items-center">

                <div className="col-md-6">

                  <div className="d-flex align-items-center">

                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        background:
                          "linear-gradient(135deg,#2563eb,#3b82f6)",
                        color: "#fff",
                      }}
                    >
                      <FaUsers size={22} />
                    </div>

                    <div>

                      <h6 className="mb-1 fw-bold">
                        Student Summary
                      </h6>

                      <small className="text-muted">

                        Showing{" "}

                        <span className="text-primary fw-bold">
                          {students.length}
                        </span>{" "}

                        record(s)

                      </small>

                    </div>

                  </div>

                </div>


                <div className="col-md-6 text-md-end mt-3 mt-md-0">

                  <button
                    className="btn btn-outline-primary rounded-3"
                    onClick={handleFilter}
                    disabled={searchLoading}
                  >

                    <FaRedo className="me-2" />

                    Refresh

                  </button>

                </div>

              </div>


              <hr className="my-4" />


              <div className="row text-center">

                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Total Students
                  </small>

                  <h4 className="text-primary fw-bold mt-1">
                    {students.length}
                  </h4>

                </div>


                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Male Students
                  </small>

                  <h4 className="text-success fw-bold mt-1">

                    {
                      students.filter(
                        (s) =>
                          s.gender === "MALE"
                      ).length
                    }

                  </h4>

                </div>


                <div className="col-md-3 border-end">

                  <small className="text-muted">
                    Female Students
                  </small>

                  <h4 className="text-danger fw-bold mt-1">

                    {
                      students.filter(
                        (s) =>
                          s.gender === "FEMALE"
                      ).length
                    }

                  </h4>

                </div>


                <div className="col-md-3">

                  <small className="text-muted">
                    Other / N/A
                  </small>

                  <h4 className="text-warning fw-bold mt-1">

                    {
                      students.filter(
                        (s) =>
                          s.gender !== "MALE" &&
                          s.gender !== "FEMALE"
                      ).length
                    }

                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          RESPONSIVE / TABLE CSS
      ====================================================== */}

      <style>
        {`

          .table th,
          .table td {
            vertical-align: middle;
            white-space: nowrap;
          }

          .table td:nth-child(5) {
            white-space: normal;
          }

          @media (max-width: 767px) {

            .card-body {
              padding: 1rem !important;
            }

            .premium-stat-card {
              min-height: 110px;
            }

            .table {
              min-width: 1050px;
            }

          }

        `}
      </style>
    </>
  );
};

export default Students;

