
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUsers,
  FaFilter,
  FaRedo,
  FaUserGraduate,
  FaVenusMars,
  FaMale,
  FaFemale,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSchool,
  FaIdCard,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";

import useMasters from "../../../hooks/useMasters";
import axios from "../../../api/axiosInstance";

const StudentStrengthReport = () => {
  const { sessions, standards, sections } = useMasters();
  const navigate = useNavigate();

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const token = localStorage.getItem("token");

  // =========================================================
  // SECTION LIST
  // =========================================================

  const sectionList = Array.isArray(sections)
    ? sections
    : ["A", "B", "C", "D"];

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

      setStudents(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(
        "Student Strength Report Error:",
        error
      );

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
  // HELPERS
  // =========================================================

  const getStudentName = (student) => {
    return [
      student?.firstName,
      student?.middleName,
      student?.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim() || "-";
  };

  const getSection = (student) => {
    if (!student?.section) {
      return "-";
    }

    if (typeof student.section === "object") {
      return (
        student.section.name ||
        student.section.value ||
        student.section.code ||
        "-"
      );
    }

    return student.section;
  };

  const getGender = (student) => {
    return String(
      student?.gender || ""
    ).toUpperCase();
  };

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalStudents = students.length;

  const maleStudents = students.filter(
    (student) =>
      getGender(student) === "MALE"
  ).length;

  const femaleStudents = students.filter(
    (student) =>
      getGender(student) === "FEMALE"
  ).length;

  const otherStudents =
    totalStudents -
    maleStudents -
    femaleStudents;

  const malePercentage =
    totalStudents > 0
      ? (
          (maleStudents /
            totalStudents) *
          100
        ).toFixed(1)
      : 0;

  const femalePercentage =
    totalStudents > 0
      ? (
          (femaleStudents /
            totalStudents) *
          100
        ).toFixed(1)
      : 0;

  // =========================================================
  // CLASS-WISE SUMMARY
  // =========================================================

  const classWiseData = useMemo(() => {
    const result = {};

    students.forEach((student) => {
      const className =
        student?.studentClass ||
        "Unknown";

      if (!result[className]) {
        result[className] = {
          total: 0,
          male: 0,
          female: 0,
          other: 0,
        };
      }

      result[className].total++;

      if (getGender(student) === "MALE") {
        result[className].male++;
      } else if (
        getGender(student) === "FEMALE"
      ) {
        result[className].female++;
      } else {
        result[className].other++;
      }
    });

    return Object.entries(result).sort(
      ([a], [b]) =>
        a.localeCompare(
          b,
          undefined,
          { numeric: true }
        )
    );
  }, [students]);

  // =========================================================
  // SECTION-WISE SUMMARY
  // =========================================================

  const sectionWiseData = useMemo(() => {
    const result = {};

    students.forEach((student) => {
      const sectionName =
        getSection(student);

      if (!result[sectionName]) {
        result[sectionName] = {
          total: 0,
          male: 0,
          female: 0,
          other: 0,
        };
      }

      result[sectionName].total++;

      if (getGender(student) === "MALE") {
        result[sectionName].male++;
      } else if (
        getGender(student) === "FEMALE"
      ) {
        result[sectionName].female++;
      } else {
        result[sectionName].other++;
      }
    });

    return Object.entries(result).sort(
      ([a], [b]) =>
        a.localeCompare(
          b,
          undefined,
          { numeric: true }
        )
    );
  }, [students]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const studentsPerPage = 10;

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  const totalPages = Math.ceil(
    students.length /
      studentsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    studentsPerPage;

  const currentStudents =
    students.slice(
      startIndex,
      startIndex +
        studentsPerPage
    );

  // =========================================================
  // EXCEL EXPORT
  // =========================================================

  const exportExcel = () => {
    if (!students.length) {
      alert(
        "No student data available."
      );
      return;
    }

    const headers = [
      "S.No",
      "Admission Number",
      "Student Name",
      "Class",
      "Section",
      "Gender",
      "Roll Number",
      "Father Name",
      "Mobile",
      "Academic Year",
      "Status",
    ];

    const rows = students.map(
      (student, index) => [
        index + 1,
        student.admissionNumber || "-",
        getStudentName(student),
        student.studentClass || "-",
        getSection(student),
        student.gender || "-",
        student.rollNumber ?? "-",
        student.fatherName || "-",
        student.mobile || "-",
        student.academicYear || "-",
        student.status || "-",
      ]
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text =
              String(value ?? "")
                .replace(/"/g, '""');

            return `"${text}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      ["\ufeff" + csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Student-Strength-Report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // PRINT / PDF
  // =========================================================

  const printReport = () => {
    if (!students.length) {
      alert(
        "No student data available."
      );
      return;
    }

    const classRows =
      classWiseData
        .map(
          ([className, data]) => `
            <tr>
              <td>${className}</td>
              <td>${data.total}</td>
              <td>${data.male}</td>
              <td>${data.female}</td>
              <td>${data.other}</td>
            </tr>
          `
        )
        .join("");

    const sectionRows =
      sectionWiseData
        .map(
          ([sectionName, data]) => `
            <tr>
              <td>${sectionName}</td>
              <td>${data.total}</td>
              <td>${data.male}</td>
              <td>${data.female}</td>
              <td>${data.other}</td>
            </tr>
          `
        )
        .join("");

    const studentRows =
      students
        .map(
          (student, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${student.admissionNumber || "-"}</td>
              <td>${getStudentName(student)}</td>
              <td>${student.studentClass || "-"}</td>
              <td>${getSection(student)}</td>
              <td>${student.gender || "-"}</td>
              <td>${student.rollNumber ?? "-"}</td>
              <td>${student.fatherName || "-"}</td>
              <td>${student.mobile || "-"}</td>
            </tr>
          `
        )
        .join("");

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=1400,height=900"
      );

    if (!printWindow) {
      alert(
        "Please allow pop-ups to print the report."
      );
      return;
    }

    printWindow.document.write(`
      <html>
        <head>

          <title>
            Student Strength Report
          </title>

          <style>

            body {
              font-family:
                Arial, sans-serif;
              padding: 25px;
              color: #222;
            }

            h1 {
              text-align: center;
              margin-bottom: 5px;
              font-size: 22px;
            }

            .subtitle {
              text-align: center;
              color: #666;
              font-size: 13px;
              margin-bottom: 20px;
            }

            .summary {
              display: flex;
              gap: 12px;
              margin-bottom: 20px;
            }

            .summary-box {
              flex: 1;
              border: 1px solid #ddd;
              border-radius: 7px;
              padding: 12px;
              text-align: center;
            }

            .summary-box strong {
              display: block;
              font-size: 20px;
              margin-bottom: 5px;
            }

            table {
              width: 100%;
              border-collapse:
                collapse;
              margin-bottom: 25px;
            }

            th,
            td {
              border:
                1px solid #ccc;
              padding: 7px;
              font-size: 10px;
              text-align: center;
            }

            th {
              background: #eff6ff;
            }

            .title {
              font-size: 15px;
              font-weight: bold;
              margin:
                20px 0 8px;
            }

          </style>

        </head>

        <body>

          <h1>
            Student Strength Report
          </h1>

          <div class="subtitle">
            Academic Year:
            ${selectedSession || "All"}
            &nbsp; | &nbsp;
            Class:
            ${selectedStandard || "All"}
            ${
              selectedSection
                ? `&nbsp; | &nbsp; Section: ${selectedSection}`
                : ""
            }
          </div>

          <div class="summary">

            <div class="summary-box">
              <strong>
                ${totalStudents}
              </strong>
              Total Students
            </div>

            <div class="summary-box">
              <strong>
                ${maleStudents}
              </strong>
              Male
            </div>

            <div class="summary-box">
              <strong>
                ${femaleStudents}
              </strong>
              Female
            </div>

            <div class="summary-box">
              <strong>
                ${otherStudents}
              </strong>
              Other
            </div>

          </div>

          <div class="title">
            Class-wise Strength
          </div>

          <table>

            <thead>
              <tr>
                <th>Class</th>
                <th>Total</th>
                <th>Male</th>
                <th>Female</th>
                <th>Other</th>
              </tr>
            </thead>

            <tbody>
              ${classRows}
            </tbody>

          </table>

          <div class="title">
            Section-wise Strength
          </div>

          <table>

            <thead>
              <tr>
                <th>Section</th>
                <th>Total</th>
                <th>Male</th>
                <th>Female</th>
                <th>Other</th>
              </tr>
            </thead>

            <tbody>
              ${sectionRows}
            </tbody>

          </table>

          <div class="title">
            Student Details
          </div>

          <table>

            <thead>
              <tr>
                <th>S.No</th>
                <th>Admission No.</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Gender</th>
                <th>Roll No.</th>
                <th>Father Name</th>
                <th>Mobile</th>
              </tr>
            </thead>

            <tbody>
              ${studentRows}
            </tbody>

          </table>

        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };

  // =========================================================
  // VIEW STUDENT
  // =========================================================

  const handleView = (
    admissionNumber
  ) => {
    navigate(
      `/student/view/${admissionNumber}`
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

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
              border:
                "1px solid #dbeafe",
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
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <FaUsers size={27} />
                  </div>

                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Student Strength Report
                    </h5>

                    <div className="text-muted small">
                      Reports&nbsp; / &nbsp;
                      Student Reports&nbsp; / &nbsp;
                      Student Strength
                    </div>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Strength Report
                </span>

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

                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/")
                  }
                >
                  Home
                </span>

                &nbsp;›&nbsp;
                Reports
                &nbsp;›&nbsp;
                Student Reports
                &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Student Strength
                </span>

              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div className="row g-3 mb-4 px-2">

          {/* TOTAL */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-blue shadow">

              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">

                <span>Total Students</span>

                <h3>
                  {totalStudents.toLocaleString(
                    "en-IN"
                  )}
                </h3>

                <small>
                  Current report strength
                </small>

              </div>

            </div>

          </div>

          {/* MALE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-green shadow">

              <div className="stat-icon">
                <FaMale />
              </div>

              <div className="stat-content">

                <span>Male Students</span>

                <h3>
                  {maleStudents.toLocaleString(
                    "en-IN"
                  )}
                </h3>

                <small>
                  {malePercentage}% of total
                </small>

              </div>

            </div>

          </div>

          {/* FEMALE */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-orange shadow">

              <div className="stat-icon">
                <FaFemale />
              </div>

              <div className="stat-content">

                <span>Female Students</span>

                <h3>
                  {femaleStudents.toLocaleString(
                    "en-IN"
                  )}
                </h3>

                <small>
                  {femalePercentage}% of total
                </small>

              </div>

            </div>

          </div>

          {/* CLASSES */}

          <div className="col-xl-3 col-md-6">

            <div className="premium-stat-card stat-red shadow">

              <div className="stat-icon">
                <FaSchool />
              </div>

              <div className="stat-content">

                <span>Classes</span>

                <h3>
                  {classWiseData.length.toLocaleString(
                    "en-IN"
                  )}
                </h3>

                <small>
                  Classes in report
                </small>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            FILTER
        ====================================================== */}

        <div className="px-2">

          <div className="card shadow border-0 mb-4 rounded-4">

            <div
              className="card-header bg-white py-3"
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
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
                    <FaFilter size={20} />
                  </div>

                  <div className="d-flex flex-column ms-2">

                    <h6 className="mb-0 lh-1">
                      Strength Filter
                    </h6>

                    <small className="lh-1 text-muted mt-1">
                      Filter student strength by academic year, class and section
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <FaUsers className="me-1" />
                  Report Filter
                </span>

              </div>

            </div>

            <div className="card-body p-4">

              <div className="row g-3">

                {/* SESSION */}

                <div className="col-xl-3 col-md-6">

                  <label className="form-label fw-semibold">
                    Academic Year
                  </label>

                  <select
                    className="form-select"
                    value={selectedSession}
                    onChange={(e) =>
                      setSelectedSession(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      All Academic Years
                    </option>

                    {sessions.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* CLASS */}

                <div className="col-xl-3 col-md-6">

                  <label className="form-label fw-semibold">
                    Standard
                  </label>

                  <select
                    className="form-select"
                    value={selectedStandard}
                    onChange={(e) =>
                      setSelectedStandard(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      All Standards
                    </option>

                    {standards.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item ===
                          "NURSERY"
                            ? "Nursery"
                            : item}
                        </option>
                      )
                    )}

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
                      setSelectedSection(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      All Sections
                    </option>

                    {sectionList.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          Section {item}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* BUTTONS */}

                <div className="col-xl-3 col-md-6 d-flex align-items-end">

                  <div className="d-flex gap-2 w-100">

                    <button
                      className="btn btn-primary rounded-3 flex-grow-1"
                      onClick={
                        handleFilter
                      }
                      disabled={
                        searchLoading
                      }
                    >

                      {searchLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />

                          Generating...
                        </>
                      ) : (
                        <>
                          <FaSearch className="me-2" />
                          Generate Report
                        </>
                      )}

                    </button>

                    <button
                      className="btn btn-outline-secondary rounded-3 px-3"
                      onClick={
                        handleReset
                      }
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
            REPORT CONTENT
        ====================================================== */}

        {students.length > 0 && (
          <>

            {/* =================================================
                GENDER DISTRIBUTION
            ================================================== */}

            <div className="px-2 mb-4">

              <div className="card shadow border-0 rounded-4">

                <div
                  className="card-header bg-white py-3"
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
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
                      }}
                    >
                      <FaVenusMars size={21} />
                    </div>

                    <div className="ms-2">

                      <h6 className="mb-0">
                        Gender Distribution
                      </h6>

                      <small className="text-muted">
                        Overall student gender strength
                      </small>

                    </div>

                  </div>

                </div>

                <div className="card-body p-4">

                  <div className="row g-4">

                    {/* MALE */}

                    <div className="col-md-4">

                      <div className="gender-box">

                        <div className="gender-icon male">
                          <FaMale />
                        </div>

                        <div className="flex-grow-1">

                          <div className="d-flex justify-content-between">

                            <span className="fw-semibold">
                              Male
                            </span>

                            <span className="fw-bold text-primary">
                              {maleStudents}
                            </span>

                          </div>

                          <div className="progress mt-2">

                            <div
                              className="progress-bar bg-primary"
                              style={{
                                width: `${malePercentage}%`,
                              }}
                            />

                          </div>

                          <small className="text-muted">
                            {malePercentage}% of students
                          </small>

                        </div>

                      </div>

                    </div>

                    {/* FEMALE */}

                    <div className="col-md-4">

                      <div className="gender-box">

                        <div className="gender-icon female">
                          <FaFemale />
                        </div>

                        <div className="flex-grow-1">

                          <div className="d-flex justify-content-between">

                            <span className="fw-semibold">
                              Female
                            </span>

                            <span className="fw-bold text-danger">
                              {femaleStudents}
                            </span>

                          </div>

                          <div className="progress mt-2">

                            <div
                              className="progress-bar bg-danger"
                              style={{
                                width: `${femalePercentage}%`,
                              }}
                            />

                          </div>

                          <small className="text-muted">
                            {femalePercentage}% of students
                          </small>

                        </div>

                      </div>

                    </div>

                    {/* OTHER */}

                    <div className="col-md-4">

                      <div className="gender-box">

                        <div className="gender-icon other">
                          <FaVenusMars />
                        </div>

                        <div className="flex-grow-1">

                          <div className="d-flex justify-content-between">

                            <span className="fw-semibold">
                              Other / N/A
                            </span>

                            <span className="fw-bold text-secondary">
                              {otherStudents}
                            </span>

                          </div>

                          <div className="progress mt-2">

                            <div
                              className="progress-bar bg-secondary"
                              style={{
                                width:
                                  totalStudents > 0
                                    ? `${(
                                        (otherStudents /
                                          totalStudents) *
                                        100
                                      ).toFixed(1)}%`
                                    : "0%",
                              }}
                            />

                          </div>

                          <small className="text-muted">
                            Other / Not specified
                          </small>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                CLASS WISE
            ================================================== */}

            <div className="px-2 mb-4">

              <div className="card shadow border-0 rounded-4">

                <div
                  className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
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
                      }}
                    >
                      <FaSchool size={20} />
                    </div>

                    <div className="ms-2">

                      <h6 className="mb-0">
                        Class-wise Strength
                      </h6>

                      <small className="text-muted">
                        Student strength by standard
                      </small>

                    </div>

                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    {classWiseData.length} Classes
                  </span>

                </div>

                <div className="card-body px-0">

                  <div className="table-responsive">

                    <table className="table align-middle mb-0">

                      <thead
                        className="small text-center"
                        style={{
                          backgroundColor:
                            "#eff6ff",
                          color:
                            "#1e3a8a",
                        }}
                      >

                        <tr>
                          <th>#</th>
                          <th className="text-start">
                            Standard
                          </th>
                          <th>
                            Total
                          </th>
                          <th>
                            Male
                          </th>
                          <th>
                            Female
                          </th>
                          <th>
                            Other
                          </th>
                          <th>
                            Male %
                          </th>
                          <th>
                            Female %
                          </th>
                        </tr>

                      </thead>

                      <tbody className="text-center small">

                        {classWiseData.map(
                          (
                            [
                              className,
                              data,
                            ],
                            index
                          ) => {

                            const malePercent =
                              data.total >
                              0
                                ? (
                                    (data.male /
                                      data.total) *
                                    100
                                  ).toFixed(
                                    1
                                  )
                                : 0;

                            const femalePercent =
                              data.total >
                              0
                                ? (
                                    (data.female /
                                      data.total) *
                                    100
                                  ).toFixed(
                                    1
                                  )
                                : 0;

                            return (
                              <tr
                                key={
                                  className
                                }
                              >

                                <td className="fw-semibold">
                                  {index +
                                    1}
                                </td>

                                <td className="text-start">

                                  <span
                                    className="badge rounded-pill px-3 py-2"
                                    style={{
                                      backgroundColor:
                                        "#f1f5f9",
                                      color:
                                        "#334155",
                                      border:
                                        "1px solid #cbd5e1",
                                    }}
                                  >

                                    <FaSchool className="me-1" />

                                    {className ===
                                    "NURSERY"
                                      ? "Nursery"
                                      : className}

                                  </span>

                                </td>

                                <td className="fw-bold text-primary">
                                  {data.total}
                                </td>

                                <td className="text-primary fw-semibold">
                                  {data.male}
                                </td>

                                <td className="text-danger fw-semibold">
                                  {data.female}
                                </td>

                                <td className="text-secondary fw-semibold">
                                  {data.other}
                                </td>

                                <td>
                                  {malePercent}%
                                </td>

                                <td>
                                  {femalePercent}%
                                </td>

                              </tr>
                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SECTION WISE
            ================================================== */}

            <div className="px-2 mb-4">

              <div className="card shadow border-0 rounded-4">

                <div
                  className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
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
                      }}
                    >
                      <FaUsers size={20} />
                    </div>

                    <div className="ms-2">

                      <h6 className="mb-0">
                        Section-wise Strength
                      </h6>

                      <small className="text-muted">
                        Student strength by section
                      </small>

                    </div>

                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    {sectionWiseData.length} Sections
                  </span>

                </div>

                <div className="card-body px-0">

                  <div className="table-responsive">

                    <table className="table align-middle mb-0">

                      <thead
                        className="small text-center"
                        style={{
                          backgroundColor:
                            "#eff6ff",
                          color:
                            "#1e3a8a",
                        }}
                      >

                        <tr>

                          <th>#</th>

                          <th>
                            Section
                          </th>

                          <th>
                            Total
                          </th>

                          <th>
                            Male
                          </th>

                          <th>
                            Female
                          </th>

                          <th>
                            Other
                          </th>

                        </tr>

                      </thead>

                      <tbody className="text-center small">

                        {sectionWiseData.map(
                          (
                            [
                              sectionName,
                              data,
                            ],
                            index
                          ) => (
                            <tr
                              key={
                                sectionName
                              }
                            >

                              <td className="fw-semibold">
                                {index +
                                  1}
                              </td>

                              <td>

                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={{
                                    backgroundColor:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                    border:
                                      "1px solid #bfdbfe",
                                  }}
                                >
                                  Section{" "}
                                  {
                                    sectionName
                                  }
                                </span>

                              </td>

                              <td className="fw-bold text-primary">
                                {data.total}
                              </td>

                              <td className="text-primary fw-semibold">
                                {data.male}
                              </td>

                              <td className="text-danger fw-semibold">
                                {data.female}
                              </td>

                              <td className="text-secondary fw-semibold">
                                {data.other}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                STUDENT DETAILS
            ================================================== */}

            <div className="px-2">

              <div className="card shadow border-0 rounded-4 mb-4">

                <div
                  className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
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
                      }}
                    >
                      <FaUserGraduate size={21} />
                    </div>

                    <div className="ms-2">

                      <h6 className="mb-0">
                        Student Details
                      </h6>

                      <small className="text-muted">
                        Detailed student strength records
                      </small>

                    </div>

                  </div>

                  <div className="d-flex gap-2 flex-wrap">

                    <button
                      className="btn btn-outline-success btn-sm rounded-3"
                      onClick={
                        exportExcel
                      }
                    >
                      <FaFileExcel className="me-1" />
                      Excel
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm rounded-3"
                      onClick={
                        printReport
                      }
                    >
                      <FaFilePdf className="me-1" />
                      PDF
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm rounded-3"
                      onClick={
                        printReport
                      }
                    >
                      <FaPrint className="me-1" />
                      Print
                    </button>

                  </div>

                </div>

                <div className="card-body px-0">

                  <div className="table-responsive">

                    <table className="table align-middle mb-0">

                      <thead
                        className="small text-center"
                        style={{
                          backgroundColor:
                            "#eff6ff",
                          color:
                            "#1e3a8a",
                        }}
                      >

                        <tr>

                          <th>#</th>

                          <th className="text-start">
                            Student
                          </th>

                          <th>
                            Admission No.
                          </th>

                          <th>
                            Class
                          </th>

                          <th>
                            Section
                          </th>

                          <th>
                            Gender
                          </th>

                          <th>
                            Roll No.
                          </th>

                          <th>
                            Father Name
                          </th>

                          <th>
                            Mobile
                          </th>

                          <th>
                            Action
                          </th>

                        </tr>

                      </thead>

                      <tbody className="text-center small">

                        {currentStudents.map(
                          (
                            student,
                            index
                          ) => (

                            <tr
                              key={
                                student.id ||
                                student.admissionNumber ||
                                index
                              }
                            >

                              <td className="fw-semibold">

                                {startIndex +
                                  index +
                                  1}

                              </td>

                              <td className="text-start">

                                <div className="d-flex align-items-center">

                                  <img
                                    src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
                                      getStudentName(
                                        student
                                      )
                                    )}`}
                                    alt="student"
                                    width="42"
                                    height="42"
                                    className="rounded-circle me-3"
                                  />

                                  <div>

                                    <div className="fw-semibold text-dark">
                                      {getStudentName(
                                        student
                                      )}
                                    </div>

                                    <small className="text-muted">
                                      Student
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>

                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={{
                                    backgroundColor:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                    border:
                                      "1px solid #bfdbfe",
                                    fontWeight: 600,
                                  }}
                                >

                                  <FaIdCard className="me-1" />

                                  {student.admissionNumber ||
                                    "-"}

                                </span>

                              </td>

                              <td>

                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={{
                                    backgroundColor:
                                      "#f1f5f9",
                                    color:
                                      "#334155",
                                    border:
                                      "1px solid #cbd5e1",
                                  }}
                                >

                                  <FaSchool className="me-1" />

                                  {student.studentClass ===
                                  "NURSERY"
                                    ? "Nursery"
                                    : student.studentClass ||
                                      "-"}

                                </span>

                              </td>

                              <td>

                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={{
                                    backgroundColor:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                    border:
                                      "1px solid #bfdbfe",
                                  }}
                                >

                                  {getSection(
                                    student
                                  )}

                                </span>

                              </td>

                              <td>

                                <span
                                  className={`badge rounded-pill px-3 py-2 ${
                                    getGender(
                                      student
                                    ) ===
                                    "MALE"
                                      ? "bg-primary"
                                      : getGender(
                                          student
                                        ) ===
                                        "FEMALE"
                                      ? "bg-danger"
                                      : "bg-secondary"
                                  }`}
                                >

                                  <FaVenusMars className="me-1" />

                                  {student.gender ||
                                    "N/A"}

                                </span>

                              </td>

                              <td>
                                {student.rollNumber ??
                                  "-"}
                              </td>

                              <td className="text-start">
                                {student.fatherName ||
                                  "-"}
                              </td>

                              <td>
                                {student.mobile ||
                                  "-"}
                              </td>

                              <td>

                                <button
                                  className="btn btn-outline-primary btn-sm rounded-3 px-3"
                                  onClick={() =>
                                    handleView(
                                      student.admissionNumber
                                    )
                                  }
                                >
                                  View
                                </button>

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                  {/* PAGINATION */}

                  {totalPages > 1 && (

                    <div className="d-flex justify-content-between align-items-center px-3 pt-3">

                      <small className="text-muted">

                        Showing{" "}
                        <strong>
                          {startIndex + 1}
                        </strong>{" "}
                        to{" "}
                        <strong>
                          {Math.min(
                            startIndex +
                              studentsPerPage,
                            students.length
                          )}
                        </strong>{" "}
                        of{" "}
                        <strong>
                          {students.length}
                        </strong>{" "}
                        students

                      </small>

                      <div className="d-flex gap-1">

                        <button
                          className="btn btn-outline-secondary btn-sm rounded-3"
                          disabled={
                            currentPage ===
                            1
                          }
                          onClick={() =>
                            setCurrentPage(
                              (prev) =>
                                prev - 1
                            )
                          }
                        >
                          Previous
                        </button>

                        {Array.from(
                          {
                            length:
                              totalPages,
                          },
                          (_, index) =>
                            index + 1
                        ).map(
                          (page) => (
                            <button
                              key={page}
                              className={`btn btn-sm rounded-3 ${
                                currentPage ===
                                page
                                  ? "btn-primary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() =>
                                setCurrentPage(
                                  page
                                )
                              }
                            >
                              {page}
                            </button>
                          )
                        )}

                        <button
                          className="btn btn-outline-secondary btn-sm rounded-3"
                          disabled={
                            currentPage ===
                            totalPages
                          }
                          onClick={() =>
                            setCurrentPage(
                              (prev) =>
                                prev + 1
                            )
                          }
                        >
                          Next
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!searchLoading &&
          students.length === 0 && (

            <div className="px-2">

              <div className="card shadow border-0 rounded-4 mb-5">

                <div className="card-body text-center py-5">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor:
                        "#eff6ff",
                      color:
                        "#93c5fd",
                    }}
                  >
                    <FaUsers size={30} />
                  </div>

                  <h6 className="fw-bold text-secondary">
                    No Strength Data
                  </h6>

                  <small className="text-muted">
                    Select Academic Year,
                    Class or Section and
                    click Generate Report.
                  </small>

                </div>

              </div>

            </div>

          )}

      </div>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style>
        {`

          .premium-stat-card {
            position: relative;
            overflow: hidden;
            border-radius: 18px;
            padding: 20px;
            min-height: 125px;
            display: flex;
            align-items: center;
            gap: 15px;
            background: #fff;
          }

          .premium-stat-card .stat-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
          }

          .premium-stat-card .stat-content {
            display: flex;
            flex-direction: column;
          }

          .premium-stat-card .stat-content span {
            font-size: 13px;
            color: #64748b;
            font-weight: 600;
          }

          .premium-stat-card .stat-content h3 {
            margin: 3px 0;
            font-size: 27px;
            font-weight: 800;
          }

          .premium-stat-card .stat-content small {
            color: #94a3b8;
            font-size: 11px;
          }

          .stat-blue {
            border-left: 4px solid #2563eb;
          }

          .stat-blue .stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-blue h3 {
            color: #2563eb;
          }

          .stat-green {
            border-left: 4px solid #16a34a;
          }

          .stat-green .stat-icon {
            background: #f0fdf4;
            color: #16a34a;
          }

          .stat-green h3 {
            color: #16a34a;
          }

          .stat-orange {
            border-left: 4px solid #f97316;
          }

          .stat-orange .stat-icon {
            background: #fff7ed;
            color: #f97316;
          }

          .stat-orange h3 {
            color: #f97316;
          }

          .stat-red {
            border-left: 4px solid #dc2626;
          }

          .stat-red .stat-icon {
            background: #fef2f2;
            color: #dc2626;
          }

          .stat-red h3 {
            color: #dc2626;
          }

          .gender-box {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: #fff;
          }

          .gender-icon {
            width: 45px;
            height: 45px;
            min-width: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
          }

          .gender-icon.male {
            background: #eff6ff;
            color: #2563eb;
          }

          .gender-icon.female {
            background: #fff1f2;
            color: #e11d48;
          }

          .gender-icon.other {
            background: #f1f5f9;
            color: #64748b;
          }

          .progress {
            height: 7px;
            border-radius: 10px;
            background: #f1f5f9;
          }

          .progress-bar {
            border-radius: 10px;
          }

          .table th,
          .table td {
            vertical-align: middle;
            white-space: nowrap;
          }

          .table tbody tr {
            border-bottom: 1px dotted #d9e2ec;
          }

          .table tbody tr:hover {
            background-color: #f8fbff;
          }

          @media (max-width: 767px) {

            .premium-stat-card {
              min-height: 110px;
            }

            .card-body {
              padding: 1rem !important;
            }

            .table {
              min-width: 1100px;
            }

            .gender-box {
              padding: 12px;
            }

          }

        `}
      </style>
    </>
  );
};

export default StudentStrengthReport;

