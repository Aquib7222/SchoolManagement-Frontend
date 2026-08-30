import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaUserGraduate,
  FaCalendarAlt,
  FaGraduationCap,
  FaFilter,
  FaUserSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdOutlineSchool, MdPersonRemove } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";

const DiscontinueStudent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);
  

  const [filters, setFilters] = useState({
    admissionNumber: "",
    session: "",
    studentClass: "",
    section: "",
  });

  const [loading, setLoading] = useState(false);
  const [discontinuingId, setDiscontinuingId] = useState(null);

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    loadSessions();
    loadStandards();
    loadSections();
  }, []);

  useEffect(() => {
    if (schoolId) {
      loadStudents();
    }
  }, [schoolId]);

  /* =========================================================
     LOAD SESSIONS
  ========================================================= */

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions");
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
      const res = await axiosInstance.get("/api/master/standard");
      setStandards(res.data || []);
    } catch (error) {
      console.error("Standard Error:", error);
    }
  };

  /* =========================================================
     LOAD SECTIONS
  ========================================================= */

  const loadSections = async () => {
    try {
      const res = await axiosInstance.get("/api/master/section");
      setSections(res.data || []);
    } catch (error) {
      console.error("Section Error:", error);
    }
  };

 
 const loadStudents = async () => {
  if (!schoolId) return;

  try {
    setLoading(true);

    const res = await axiosInstance.get(
      `/api/students/school?schoolId=${schoolId}`
    );

    setStudents(res.data || []);
  } catch (error) {
    console.error("Student Error:", error);
    setStudents([]);
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

  /* =========================================================
     FILTER STUDENTS
  ========================================================= */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const admissionNumber =
        student.admissionNumber || student.admissionNo || "";

      const studentSession = student.academicYear || student.session || "";

      const studentClass =
        student.studentClass || student.className || student.standard || "";

      const studentSection = student.section || "";

      const matchAdmission =
        !filters.admissionNumber ||
        admissionNumber
          .toLowerCase()
          .includes(filters.admissionNumber.toLowerCase());

      const matchSession =
        !filters.session || studentSession === filters.session;

      const matchClass =
        !filters.studentClass || studentClass === filters.studentClass;

      const matchSection =
        !filters.section || studentSection === filters.section;

      return matchAdmission && matchSession && matchClass && matchSection;
    });
  }, [students, filters]);

   const activeStudents = useMemo(() => {
  return filteredStudents.filter(
    (student) => student.status === "ACTIVE"
  );
}, [filteredStudents]);

const inactiveStudents = useMemo(() => {
  return filteredStudents.filter(
    (student) => student.status === "INACTIVE"
  );
}, [filteredStudents]);

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setFilters({
      admissionNumber: "",
      session: "",
      studentClass: "",
      section: "",
    });
  };

  /* =========================================================
     DISCONTINUE STUDENT
  ========================================================= */

 const handleDiscontinue = async (student) => {
  if (!student?.admissionNumber) {
    alert("Admission Number not found");
    return;
  }

  if (!schoolId) {
    alert("School ID not found");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to discontinue ${[
      student.firstName,
      student.middleName,
      student.lastName,
    ]
      .filter(Boolean)
      .join(" ")}?`
  );

  if (!confirmed) return;

  try {
    setDiscontinuingId(student.admissionNumber);

    const response = await axiosInstance.put(
      "/api/students/discontinue",
      null,
      {
        params: {
          admissionNumber: student.admissionNumber,
          schoolId: schoolId,
        },
      }
    );

    alert(
      response?.data?.message ||
        response?.data ||
        "Student discontinued successfully"
    );

    // UI se status update
    setStudents((prev) =>
      prev.map((item) =>
        item.admissionNumber === student.admissionNumber
          ? {
              ...item,
              status: "DISCONTINUED",
              discontinueDate:
                new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
  } catch (error) {
    console.error("Discontinue Student Error:", error);

    alert(
      error?.response?.data?.message ||
        "Failed to discontinue student"
    );
  } finally {
    setDiscontinuingId(null);
  }
};

  /* =========================================================
     STUDENT NAME
  ========================================================= */

  const getStudentName = (student) => {
    return [student.firstName, student.middleName, student.lastName]
      .filter(Boolean)
      .join(" ");
  };

 

  const totalStudents = students.length;

const totalActiveStudents = students.filter(
  (student) => student.status === "ACTIVE"
).length;

const totalInactiveStudents = students.filter(
  (student) => student.status === "INACTIVE"
).length;

const filteredCount = filteredStudents.length;

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
                  <MdPersonRemove size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Discontinue Student
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; Discontinue Student
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
                  Setup
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
              Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Discontinue Student
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        <div className="col-xl-4 col-md-6">
  <div className="premium-stat-card stat-blue shadow">
    <div className="stat-icon">
      <FaUserGraduate />
    </div>

    <div className="stat-content">
      <span>Active Students</span>
      <h3>{totalActiveStudents}</h3>
      <small>Currently active students</small>
    </div>
  </div>
</div>

<div className="col-xl-4 col-md-6">
  <div className="premium-stat-card stat-orange shadow">
    <div className="stat-icon">
      <FaFilter />
    </div>

    <div className="stat-content">
      <span>Search Results</span>
      <h3>{filteredCount}</h3>
      <small>Students matching filters</small>
    </div>
  </div>
</div>

<div className="col-xl-4 col-md-12">
  <div className="premium-stat-card stat-red shadow">
    <div className="stat-icon">
      <FaUserSlash />
    </div>

    <div className="stat-content">
      <span>Inactive Students</span>
      <h3>{totalInactiveStudents}</h3>
      <small>Discontinued students</small>
    </div>
  </div>
</div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="mx-2 mt-4">
        <div className="card border-0 shadow rounded-4">
          <div
            className="card-header bg-white p-3"
            style={{
              borderBottom: "1px solid #eef0f2",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <h6 className="mb-1 fw-bold">
                  <FaFilter className="text-primary me-2" size={14} />
                  Student Search
                </h6>

                <small className="text-muted">
                  Search student by admission number, session, class or section
                </small>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                {filteredCount} Records
              </span>
            </div>
          </div>

          <div className="card-body p-3">
            <div className="row g-3">
              {/* ADMISSION NUMBER */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">
                  Admission Number
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-primary" size={13} />
                  </span>

                  <input
                    type="text"
                    name="admissionNumber"
                    value={filters.admissionNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter admission no."
                  />
                </div>
              </div>

              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">Session</label>

                <select
                  name="session"
                  value={filters.session}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">All Sessions</option>

                  {sessions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* CLASS */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">Class</label>

                <select
                  name="studentClass"
                  value={filters.studentClass}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">All Classes</option>

                  {standards.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-12 col-sm-6 col-xl-3">
                <label className="form-label fw-semibold small">Section</label>

                <select
                  name="section"
                  value={filters.section}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">All Sections</option>

                  {sections.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
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
                <FaRedo className="me-2" size={13} />
                Reset
              </button>

              <button type="button" className="btn btn-primary px-4">
                <FaSearch className="me-2" size={13} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENT TABLE
      ===================================================== */}

      <div className="mx-2 mt-4 mb-4">
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
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <FaGraduationCap size={16} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">Student List</h6>

                  <small className="text-muted">
                    Select a student to discontinue
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  Showing <strong>{filteredCount}</strong>
                </span>

                <button
                  className="btn btn-sm btn-light border d-flex align-items-center gap-1"
                  onClick={loadStudents}
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
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "1000px",
                }}
              >
                <thead
                  style={{
                    background: "#f8faff",
                  }}
                >
                  <tr
                    style={{
                      borderBottom: "1px solid #dbeafe",
                    }}
                  >
                    <th className="text-center table-head">#</th>

                    <th className="table-head">STUDENT</th>

                    <th className="table-head">ADMISSION NO</th>

                    <th className="table-head">SESSION</th>

                    <th className="table-head">CLASS</th>

                    <th className="table-head">SECTION</th>

                    <th className="table-head text-center">MOBILE</th>

                    <th className="table-head text-center">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-3 text-muted small">
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  ) : activeStudents.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div
                          className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            background: "#eff6ff",
                            color: "#2563eb",
                          }}
                        >
                          <FaUserGraduate size={23} />
                        </div>

                        <h6 className="fw-semibold text-muted mb-1">
                          No Students Found
                        </h6>

                        <small className="text-muted">
                          No student matches the selected search criteria.
                        </small>
                      </td>
                    </tr>
                  ) : (
                    activeStudents.map((student, index) => {
                      const studentName = getStudentName(student);

                      return (
                        <tr
                          key={student.id}
                          style={{
                            borderBottom: "1px solid #f0f4f8",
                          }}
                        >
                          {/* NUMBER */}

                          <td className="text-center">
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "#eff6ff",
                                color: "#2563eb",
                                fontSize: "12px",
                                fontWeight: "700",
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
                                  background: "#eff6ff",
                                  color: "#2563eb",
                                  fontWeight: "700",
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

                          {/* ADMISSION */}

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                background: "#eff6ff",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                padding: "7px 11px",
                                fontWeight: "600",
                              }}
                            >
                              {student.admissionNumber ||
                                student.admissionNo ||
                                "N/A"}
                            </span>
                          </td>

                          {/* SESSION */}

                          <td>
                            <div className="d-flex align-items-center gap-1">
                              <FaCalendarAlt
                                size={12}
                                className="text-primary"
                              />

                              <span
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {student.academicYear ||
                                  student.session ||
                                  "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* CLASS */}

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                background: "#f4f6f8",
                                color: "#495057",
                                border: "1px solid #e1e5e8",
                                padding: "6px 10px",
                              }}
                            >
                              {student.studentClass ||
                                student.className ||
                                student.standard ||
                                "N/A"}
                            </span>
                          </td>

                          {/* SECTION */}

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                background: "#f4f6f8",
                                color: "#495057",
                                border: "1px solid #e1e5e8",
                                padding: "6px 10px",
                              }}
                            >
                              {student.section || "N/A"}
                            </span>
                          </td>

                          {/* MOBILE */}

                          <td className="text-center">
                            <span
                              className="fw-semibold"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {student.mobile ||
                                student.phoneNumber ||
                                student.fatherMobile ||
                                "N/A"}
                            </span>
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm d-inline-flex align-items-center justify-content-center gap-2"
                              style={{
                                background: "#fff1f2",
                                color: "#dc3545",
                                border: "1px solid #fecdd3",
                                fontWeight: "600",
                                padding: "7px 14px",
                                borderRadius: "8px",
                              }}
                              disabled={discontinuingId === student.id}
                              onClick={() => handleDiscontinue(student)}
                            >
                              {discontinuingId === student.id ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    style={{
                                      width: "13px",
                                      height: "13px",
                                    }}
                                  />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <MdPersonRemove size={15} />
                                  Discontinue
                                </>
                              )}
                            </button>
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
                <strong className="text-primary">{filteredCount}</strong>{" "}
                student(s)
              </small>

              <small className="text-muted">
                Total Students:{" "}
                <strong className="text-dark">{totalStudents}</strong>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
    INACTIVE / DISCONTINUED STUDENT TABLE
===================================================== */}

<div className="mx-2 mt-4 mb-4">
  <div className="card border-0 shadow rounded-4 overflow-hidden">

    {/* HEADER */}

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
              background: "#fff1f2",
              color: "#dc3545",
            }}
          >
            <FaUserSlash size={16} />
          </div>

          <div>
            <h6 className="mb-0 fw-bold">
              Discontinued Students
            </h6>

            <small className="text-muted">
              Students whose status is inactive
            </small>
          </div>

        </div>

        <span
          className="badge rounded-pill px-3 py-2"
          style={{
            background: "#fff1f2",
            color: "#dc3545",
            border: "1px solid #fecdd3",
          }}
        >
          Showing <strong>{inactiveStudents.length}</strong>
        </span>

      </div>
    </div>

    {/* TABLE */}

    <div className="card-body p-0">

      <div className="table-responsive">

        <table
          className="table align-middle mb-0"
          style={{
            minWidth: "1050px",
          }}
        >

          <thead
            style={{
              background: "#fff8f8",
            }}
          >
            <tr
              style={{
                borderBottom: "1px solid #fecdd3",
              }}
            >

              <th className="text-center table-head">
                #
              </th>

              <th className="table-head">
                STUDENT
              </th>

              <th className="table-head">
                ADMISSION NO
              </th>

              <th className="table-head">
                SESSION
              </th>

              <th className="table-head">
                CLASS
              </th>

              <th className="table-head">
                SECTION
              </th>

              <th className="table-head text-center">
                STATUS
              </th>

              <th className="table-head text-center">
                DISCONTINUE DATE
              </th>

            </tr>
          </thead>

          <tbody>

            {inactiveStudents.length === 0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="text-center py-5"
                >

                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "#fff1f2",
                      color: "#dc3545",
                    }}
                  >
                    <FaUserSlash size={23} />
                  </div>

                  <h6 className="fw-semibold text-muted mb-1">
                    No Discontinued Students
                  </h6>

                  <small className="text-muted">
                    No inactive student records found.
                  </small>

                </td>
              </tr>

            ) : (

              inactiveStudents.map((student, index) => {

                const studentName =
                  getStudentName(student);

                return (
                  <tr
                    key={student.id}
                    style={{
                      borderBottom:
                        "1px solid #f0f4f8",
                    }}
                  >

                    {/* NUMBER */}

                    <td className="text-center">

                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "28px",
                          height: "28px",
                          background: "#fff1f2",
                          color: "#dc3545",
                          fontSize: "12px",
                          fontWeight: "700",
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
                            background: "#fff1f2",
                            color: "#dc3545",
                            fontWeight: "700",
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
                              fontSize: "13px",
                            }}
                          >
                            {studentName || "N/A"}
                          </div>

                          <small className="text-muted">
                            Student
                          </small>

                        </div>

                      </div>

                    </td>

                    {/* ADMISSION NUMBER */}

                    <td>

                      <span
                        className="badge rounded-pill"
                        style={{
                          background: "#eff6ff",
                          color: "#2563eb",
                          border:
                            "1px solid #bfdbfe",
                          padding: "7px 11px",
                          fontWeight: "600",
                        }}
                      >
                        {student.admissionNumber ||
                          student.admissionNo ||
                          "N/A"}
                      </span>

                    </td>

                    {/* SESSION */}

                    <td>

                      <div className="d-flex align-items-center gap-1">

                        <FaCalendarAlt
                          size={12}
                          className="text-primary"
                        />

                        <span
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          {student.academicYear ||
                            student.session ||
                            "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* CLASS */}

                    <td>

                      <span
                        className="badge rounded-pill"
                        style={{
                          background: "#f4f6f8",
                          color: "#495057",
                          border:
                            "1px solid #e1e5e8",
                          padding: "6px 10px",
                        }}
                      >
                        {student.studentClass ||
                          student.className ||
                          student.standard ||
                          "N/A"}
                      </span>

                    </td>

                    {/* SECTION */}

                    <td>

                      <span
                        className="badge rounded-pill"
                        style={{
                          background: "#f4f6f8",
                          color: "#495057",
                          border:
                            "1px solid #e1e5e8",
                          padding: "6px 10px",
                        }}
                      >
                        {student.section || "N/A"}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="text-center">

                      <span
                        className="badge rounded-pill"
                        style={{
                          background: "#fff1f2",
                          color: "#dc3545",
                          border:
                            "1px solid #fecdd3",
                          padding: "7px 14px",
                          fontWeight: "600",
                        }}
                      >
                        <FaUserSlash
                          size={11}
                          className="me-1"
                        />

                        INACTIVE
                      </span>

                    </td>

                    {/* DISCONTINUE DATE */}

                    <td className="text-center">

                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#495057",
                        }}
                      >

                        <FaCalendarAlt
                          size={12}
                          className="text-danger"
                        />

                        {student.discontinueDate
                          ? String(
                              student.discontinueDate
                            ).substring(0, 10)
                          : "N/A"}

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

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

        <small className="text-muted">
          Showing{" "}
          <strong className="text-danger">
            {inactiveStudents.length}
          </strong>{" "}
          discontinued student(s)
        </small>

        <small className="text-muted">
          Total Inactive:{" "}
          <strong className="text-dark">
            {totalInactiveStudents}
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
            background-color: #f8fbff;
          }

          .table-head {
            padding: 14px 12px !important;
            font-size: 12px;
            color: #64748b;
            font-weight: 700;
            letter-spacing: .3px;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 8px;
            min-height: 40px;
            font-size: 13px;
          }

          .input-group-text {
            border-color: #dee2e6;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow:
              0 0 0 0.15rem
              rgba(37, 99, 235, 0.10);
          }

          .btn {
            border-radius: 8px;
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

export default DiscontinueStudent;
