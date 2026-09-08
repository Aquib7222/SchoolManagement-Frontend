
import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaUserGraduate,
  FaUserSlash,
  FaCalendarAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const InactiveStudentsReport = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);

  const [academicYear, setAcademicYear] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");

  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

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
    if (!student?.section) return "-";

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

  const getStatus = (student) => {
    return String(student?.status || "").toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      const d = new Date(date);

      if (Number.isNaN(d.getTime())) {
        return date;
      }

      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // --------------------------------------------------
  // Initial Students
  // --------------------------------------------------

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setInitialLoading(true);

      const response = await axiosInstance.get("/api/students");

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAllStudents(data);

      // Academic Sessions
      const years = [
        ...new Set(
          data
            .map((student) => student.academicYear)
            .filter(Boolean)
        ),
      ].sort();

      // Classes
      const classList = [
        ...new Set(
          data
            .map((student) => student.studentClass)
            .filter(Boolean)
        ),
      ].sort();

      // Sections
      const sectionList = [
        ...new Set(
          data
            .map((student) => getSection(student))
            .filter(
              (value) =>
                value && value !== "-"
            )
        ),
      ].sort();

      setAcademicYears(years);
      setClasses(classList);
      setSections(sectionList);

      // Latest session as default
      if (years.length > 0) {
        setAcademicYear(years[years.length - 1]);
      }
    } catch (error) {
      console.error(
        "Failed to load students:",
        error
      );
    } finally {
      setInitialLoading(false);
    }
  };

  // --------------------------------------------------
  // Class-wise sections
  // --------------------------------------------------

  const classSections = useMemo(() => {
    if (!studentClass) {
      return sections;
    }

    const list = [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              student.studentClass ===
              studentClass
          )
          .map((student) =>
            getSection(student)
          )
          .filter(
            (value) =>
              value && value !== "-"
          )
      ),
    ];

    return list.sort();
  }, [
    studentClass,
    allStudents,
    sections,
  ]);

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const handleSearch = async () => {
    if (!academicYear) {
      alert("Please select Academic Session.");
      return;
    }

    try {
      setLoading(true);
      setCurrentPage(1);

      const response = await axiosInstance.get(
        "/api/students/all",
        {
          params: {
            academicYear,
            admissionNumber:
              admissionNumber.trim() || undefined,
            studentName:
              studentName.trim() || undefined,
            fatherName:
              fatherName.trim() || undefined,
            studentClass:
              studentClass || undefined,
            section:
              section || undefined,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      // Only inactive/discontinued students
      const inactiveStudents = data.filter(
        (student) =>
          getStatus(student) === "INACTIVE"
      );

      setStudents(inactiveStudents);
    } catch (error) {
      console.error(
        "Inactive student report error:",
        error
      );

      setStudents([]);

      alert(
        error?.response?.data?.message ||
          "Failed to load inactive student report."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  const handleReset = () => {
    setStudentClass("");
    setSection("");
    setAdmissionNumber("");
    setStudentName("");
    setFatherName("");
    setStudents([]);
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Summary
  // --------------------------------------------------

  const totalInactive = students.length;

  const discontinuedWithDate =
    students.filter(
      (student) =>
        Boolean(student.discontinueDate)
    ).length;

  const classSummary = useMemo(() => {
    const result = {};

    students.forEach((student) => {
      const cls =
        student.studentClass || "Unknown";

      if (!result[cls]) {
        result[cls] = 0;
      }

      result[cls]++;
    });

    return Object.entries(result).sort(
      ([a], [b]) =>
        a.localeCompare(b, undefined, {
          numeric: true,
        })
    );
  }, [students]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    studentsPerPage;

  const currentStudents =
    students.slice(
      startIndex,
      startIndex + studentsPerPage
    );

  const goToPage = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  // --------------------------------------------------
  // Excel Export
  // --------------------------------------------------

  const exportExcel = () => {
    if (!students.length) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "S.No",
      "Admission No.",
      "Student Name",
      "Roll No.",
      "Class",
      "Section",
      "Gender",
      "Date of Birth",
      "Father Name",
      "Father Mobile",
      "Student Mobile",
      "Academic Session",
      "Discontinue Date",
      "Status",
    ];

    const rows = students.map(
      (student, index) => [
        index + 1,
        student.admissionNumber || "-",
        getStudentName(student),
        student.rollNumber ?? "-",
        student.studentClass || "-",
        getSection(student),
        student.gender || "-",
        student.dob || "-",
        student.fatherName || "-",
        student.fatherMobile || "-",
        student.mobile || "-",
        student.academicYear || "-",
        student.discontinueDate || "-",
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
            const text = String(
              value ?? ""
            ).replace(/"/g, '""');

            return `"${text}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      ["\ufeff" + csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `Inactive-Students-Report-${academicYear}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // --------------------------------------------------
  // Print / PDF
  // --------------------------------------------------

  const printReport = () => {
    if (!students.length) {
      alert("No data available to print.");
      return;
    }

    const rows = students
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student.admissionNumber || "-"}</td>
            <td>${getStudentName(student)}</td>
            <td>${student.rollNumber ?? "-"}</td>
            <td>${student.studentClass || "-"}</td>
            <td>${getSection(student)}</td>
            <td>${student.gender || "-"}</td>
            <td>${student.fatherName || "-"}</td>
            <td>${student.fatherMobile || "-"}</td>
            <td>${student.mobile || "-"}</td>
            <td>${formatDate(student.discontinueDate)}</td>
          </tr>
        `
      )
      .join("");

    const classRows = classSummary
      .map(
        ([cls, count]) => `
          <tr>
            <td>${cls}</td>
            <td>${count}</td>
          </tr>
        `
      )
      .join("");

    const printWindow = window.open(
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
          <title>Inactive Student Report</title>

          <style>
            body {
              font-family: Arial, sans-serif;
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
              margin-bottom: 20px;
              font-size: 13px;
              color: #555;
            }

            .summary {
              display: flex;
              gap: 12px;
              margin-bottom: 20px;
            }

            .box {
              border: 1px solid #ddd;
              padding: 12px;
              flex: 1;
              text-align: center;
              border-radius: 6px;
            }

            .box strong {
              display: block;
              font-size: 20px;
              margin-bottom: 4px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 25px;
            }

            th,
            td {
              border: 1px solid #ccc;
              padding: 7px;
              font-size: 10px;
              text-align: center;
            }

            th {
              background: #f2f5f9;
              font-weight: bold;
            }

            .section-title {
              font-size: 15px;
              font-weight: bold;
              margin: 20px 0 8px;
            }

            @media print {
              body {
                padding: 10px;
              }
            }
          </style>
        </head>

        <body>

          <h1>Inactive / Discontinued Student Report</h1>

          <div class="subtitle">
            Academic Session: ${academicYear}
            ${
              studentClass
                ? `&nbsp; | &nbsp; Class: ${studentClass}`
                : ""
            }
            ${
              section
                ? `&nbsp; | &nbsp; Section: ${section}`
                : ""
            }
          </div>

          <div class="summary">

            <div class="box">
              <strong>${totalInactive}</strong>
              Total Inactive
            </div>

            <div class="box">
              <strong>${discontinuedWithDate}</strong>
              Discontinued
            </div>

            <div class="box">
              <strong>${classSummary.length}</strong>
              Classes
            </div>

          </div>

          <div class="section-title">
            Class-wise Inactive Strength
          </div>

          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Inactive Students</th>
              </tr>
            </thead>

            <tbody>
              ${classRows}
            </tbody>
          </table>

          <div class="section-title">
            Student Details
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Admission No.</th>
                <th>Student Name</th>
                <th>Roll No.</th>
                <th>Class</th>
                <th>Section</th>
                <th>Gender</th>
                <th>Father Name</th>
                <th>Father Mobile</th>
                <th>Student Mobile</th>
                <th>Discontinue Date</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
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

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="container-fluid py-3 inactive-report-page">

      {/* Header */}
      <div className="report-header mb-3">

        <div>
          <h4>
            <FaUserSlash className="me-2" />
            Inactive / Discontinued Students
          </h4>

          <p>
            View students who are inactive or
            discontinued from the school.
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="report-card mb-3">

        <div className="card-title-row">
          <FaSearch className="me-2" />
          Report Filters
        </div>

        <div className="row g-3 mt-1">

          {/* Academic Session */}
          <div className="col-lg-3 col-md-6">

            <label>
              Academic Session
              <span>*</span>
            </label>

            <select
              className="form-select"
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(e.target.value)
              }
            >
              <option value="">
                Select Academic Session
              </option>

              {academicYears.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>

          </div>

          {/* Class */}
          <div className="col-lg-3 col-md-6">

            <label>Class</label>

            <select
              className="form-select"
              value={studentClass}
              onChange={(e) => {
                setStudentClass(
                  e.target.value
                );
                setSection("");
              }}
            >
              <option value="">
                All Classes
              </option>

              {classes.map((cls) => (
                <option
                  key={cls}
                  value={cls}
                >
                  {cls}
                </option>
              ))}
            </select>

          </div>

          {/* Section */}
          <div className="col-lg-3 col-md-6">

            <label>Section</label>

            <select
              className="form-select"
              value={section}
              onChange={(e) =>
                setSection(e.target.value)
              }
            >
              <option value="">
                All Sections
              </option>

              {classSections.map((sec) => (
                <option
                  key={sec}
                  value={sec}
                >
                  {sec}
                </option>
              ))}
            </select>

          </div>

          {/* Admission */}
          <div className="col-lg-3 col-md-6">

            <label>Admission Number</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter admission no."
              value={admissionNumber}
              onChange={(e) =>
                setAdmissionNumber(
                  e.target.value
                )
              }
            />

          </div>

          {/* Student Name */}
          <div className="col-lg-4 col-md-6">

            <label>Student Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) =>
                setStudentName(
                  e.target.value
                )
              }
            />

          </div>

          {/* Father Name */}
          <div className="col-lg-4 col-md-6">

            <label>Father Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter father name"
              value={fatherName}
              onChange={(e) =>
                setFatherName(
                  e.target.value
                )
              }
            />

          </div>

          {/* Buttons */}
          <div className="col-lg-4 col-md-12 filter-buttons">

            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={
                loading ||
                initialLoading
              }
            >
              <FaSearch className="me-2" />

              {loading
                ? "Loading..."
                : "Generate Report"}
            </button>

            <button
              className="btn btn-light"
              onClick={handleReset}
            >
              <FaRedo className="me-2" />
              Reset
            </button>

          </div>

        </div>
      </div>

      {/* Summary */}
      {students.length > 0 && (
        <>

          <div className="row g-3 mb-3">

            <div className="col-lg-4 col-md-6">

              <div className="summary-card">

                <div className="summary-icon">
                  <FaUserSlash />
                </div>

                <div>
                  <small>
                    Total Inactive
                  </small>

                  <h3>
                    {totalInactive}
                  </h3>
                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="summary-card">

                <div className="summary-icon">
                  <FaCalendarAlt />
                </div>

                <div>
                  <small>
                    Discontinued
                  </small>

                  <h3>
                    {discontinuedWithDate}
                  </h3>
                </div>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="summary-card">

                <div className="summary-icon">
                  <FaUsers />
                </div>

                <div>
                  <small>
                    Classes Affected
                  </small>

                  <h3>
                    {classSummary.length}
                  </h3>
                </div>

              </div>

            </div>

          </div>

          {/* Class Summary */}
          {classSummary.length > 0 && (
            <div className="report-card mb-3">

              <div className="card-title-row">
                <FaUsers className="me-2" />
                Class-wise Inactive Strength
              </div>

              <div className="table-responsive mt-3">

                <table className="table report-table mb-0">

                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Inactive Students</th>
                    </tr>
                  </thead>

                  <tbody>
                    {classSummary.map(
                      ([cls, count]) => (
                        <tr key={cls}>
                          <td>
                            <strong>
                              {cls}
                            </strong>
                          </td>

                          <td>
                            {count}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* Student Details */}
          <div className="report-card">

            <div className="table-header">

              <div>
                <h6>
                  <FaUserGraduate className="me-2" />
                  Inactive Student Details
                </h6>

                <small>
                  Showing{" "}
                  {startIndex + 1}–
                  {Math.min(
                    startIndex +
                      studentsPerPage,
                    students.length
                  )}{" "}
                  of {students.length}
                </small>
              </div>

              <div className="export-buttons">

                <button
                  className="btn btn-outline-success"
                  onClick={exportExcel}
                >
                  <FaFileExcel className="me-1" />
                  Excel
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={printReport}
                >
                  <FaFilePdf className="me-1" />
                  PDF
                </button>

                <button
                  className="btn btn-outline-primary"
                  onClick={printReport}
                >
                  <FaPrint className="me-1" />
                  Print
                </button>

              </div>

            </div>

            <div className="table-responsive mt-3">

              <table className="table report-table">

                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Admission No.</th>
                    <th>Student Name</th>
                    <th>Roll No.</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Gender</th>
                    <th>Father Name</th>
                    <th>Father Mobile</th>
                    <th>Student Mobile</th>
                    <th>Discontinue Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {currentStudents.map(
                    (student, index) => (
                      <tr
                        key={
                          student.id ||
                          student.admissionNumber ||
                          index
                        }
                      >

                        <td>
                          {startIndex +
                            index +
                            1}
                        </td>

                        <td>
                          {student.admissionNumber ||
                            "-"}
                        </td>

                        <td className="student-name">
                          {getStudentName(
                            student
                          )}
                        </td>

                        <td>
                          {student.rollNumber ??
                            "-"}
                        </td>

                        <td>
                          {student.studentClass ||
                            "-"}
                        </td>

                        <td>
                          {getSection(student)}
                        </td>

                        <td>
                          {student.gender ||
                            "-"}
                        </td>

                        <td>
                          {student.fatherName ||
                            "-"}
                        </td>

                        <td>
                          {student.fatherMobile ||
                            "-"}
                        </td>

                        <td>
                          {student.mobile ||
                            "-"}
                        </td>

                        <td>
                          <span className="date-badge">
                            <FaCalendarAlt className="me-1" />
                            {formatDate(
                              student.discontinueDate
                            )}
                          </span>
                        </td>

                        <td>
                          <span className="inactive-badge">
                            INACTIVE
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-row">

                <button
                  className="page-btn"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    goToPage(
                      currentPage - 1
                    )
                  }
                >
                  <FaChevronLeft />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      goToPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    goToPage(
                      currentPage + 1
                    )
                  }
                >
                  <FaChevronRight />
                </button>

              </div>
            )}

          </div>

        </>
      )}

      {/* Empty */}
      {!loading &&
        students.length === 0 &&
        academicYear && (
          <div className="empty-card">

            <FaUserSlash />

            <h5>
              No Inactive Students Found
            </h5>

            <p>
              No inactive or discontinued
              students match the selected
              filters.
            </p>

          </div>
        )}

      {/* CSS */}
      <style>{`

        .inactive-report-page {
          background: #f6f9fc;
          min-height: 100vh;
        }

        .report-header {
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 22px;
          border: 1px solid #e7eef7;
          box-shadow:
            0 3px 12px
            rgba(20, 70, 120, 0.06);
        }

        .report-header h4 {
          margin: 0;
          color: #1769aa;
          font-weight: 700;
        }

        .report-header p {
          margin: 5px 0 0;
          color: #7a8795;
          font-size: 13px;
        }

        .report-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 18px;
          border: 1px solid #e5edf6;
          box-shadow:
            0 3px 12px
            rgba(20, 70, 120, 0.06);
        }

        .card-title-row {
          color: #1769aa;
          font-weight: 700;
          font-size: 15px;
          border-bottom: 1px dotted #cdd8e5;
          padding-bottom: 12px;
        }

        label {
          font-size: 13px;
          font-weight: 600;
          color: #425466;
          margin-bottom: 6px;
        }

        label span {
          color: #dc3545;
          margin-left: 3px;
        }

        .form-select,
        .form-control {
          border-radius: 9px;
          border: 1px solid #d8e2ed;
          min-height: 42px;
          font-size: 13px;
        }

        .form-select:focus,
        .form-control:focus {
          border-color: #4c9bd8;
          box-shadow:
            0 0 0 0.15rem
            rgba(23, 105, 170, 0.1);
        }

        .filter-buttons {
          display: flex;
          align-items: end;
          gap: 10px;
        }

        .filter-buttons button {
          border-radius: 8px;
          font-size: 13px;
          padding: 9px 14px;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #e5edf6;
          border-radius: 14px;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow:
            0 3px 12px
            rgba(20, 70, 120, 0.06);
        }

        .summary-icon {
          width: 45px;
          height: 45px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef6ff;
          color: #1769aa;
          font-size: 19px;
        }

        .summary-card small {
          color: #7c8996;
          font-size: 12px;
        }

        .summary-card h3 {
          margin: 2px 0 0;
          color: #1769aa;
          font-size: 23px;
          font-weight: 700;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .table-header h6 {
          color: #1769aa;
          margin: 0;
          font-weight: 700;
        }

        .table-header small {
          color: #8996a3;
          font-size: 12px;
        }

        .export-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .export-buttons button {
          border-radius: 8px;
          font-size: 13px;
          padding: 8px 13px;
        }

        .report-table {
          margin-bottom: 0;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 1250px;
        }

        .report-table thead th {
          background: #f1f7fd;
          color: #31546f;
          font-size: 12px;
          font-weight: 700;
          padding: 11px 9px;
          text-align: center;
          white-space: nowrap;
          border-top: 1px solid #dce7f2;
          border-bottom: 1px solid #dce7f2;
        }

        .report-table tbody td {
          padding: 10px 9px;
          font-size: 12px;
          text-align: center;
          color: #4e5d6c;
          vertical-align: middle;
          border-bottom: 1px dotted #d6e0ea;
        }

        .report-table tbody tr:hover {
          background: #fffafa;
        }

        .student-name {
          font-weight: 600;
          color: #1769aa !important;
        }

        .inactive-badge {
          display: inline-block;
          padding: 4px 9px;
          border-radius: 20px;
          background: #fff0f0;
          color: #dc3545;
          font-size: 10px;
          font-weight: 700;
        }

        .date-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 7px;
          background: #f4f8fc;
          color: #506b82;
          font-size: 10px;
          white-space: nowrap;
        }

        .pagination-row {
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 18px;
        }

        .page-btn {
          width: 34px;
          height: 34px;
          border: 1px solid #d7e2ed;
          background: #ffffff;
          color: #1769aa;
          border-radius: 7px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-btn.active {
          background: #1769aa;
          color: #ffffff;
          border-color: #1769aa;
        }

        .page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .empty-card {
          background: #ffffff;
          border: 1px solid #e5edf6;
          border-radius: 14px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #8a98a6;
          box-shadow:
            0 3px 12px
            rgba(20, 70, 120, 0.05);
        }

        .empty-card svg {
          font-size: 38px;
          color: #efb2b2;
          margin-bottom: 12px;
        }

        .empty-card h5 {
          color: #506070;
          margin-bottom: 4px;
        }

        .empty-card p {
          font-size: 13px;
          margin: 0;
        }

        @media (max-width: 768px) {

          .table-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .export-buttons {
            width: 100%;
          }

          .filter-buttons {
            align-items: stretch;
            flex-direction: column;
          }

          .filter-buttons button {
            width: 100%;
          }

        }

      `}</style>

    </div>
  );
};

export default InactiveStudentsReport;

