
import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaFilter,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const DailyAttendanceReportsPage = () => {
  const [attendance, setAttendance] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const [academicYear, setAcademicYear] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // =====================================================
  // INITIAL DATA
  // =====================================================

  const fetchInitialStudents = async () => {
    try {
      setInitialLoading(true);

      const response = await axiosInstance.get(
        "/api/students"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAllStudents(data);

      const years = [
        ...new Set(
          data
            .map((student) => student?.academicYear)
            .filter(Boolean)
        ),
      ];

      if (years.length === 1) {
        setAcademicYear(years[0]);
      } else {
        const currentYear = new Date().getFullYear();

        const currentSession =
          `${currentYear}-${currentYear + 1}`;

        if (years.includes(currentSession)) {
          setAcademicYear(currentSession);
        }
      }
    } catch (error) {
      console.error(
        "Initial Student API Error:",
        error
      );
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialStudents();
  }, []);

  // =====================================================
  // ACADEMIC YEARS
  // =====================================================

  const academicYears = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .map((student) => student?.academicYear)
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents]);

  // =====================================================
  // CLASSES
  // =====================================================

  const classes = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              !academicYear ||
              student?.academicYear === academicYear
          )
          .map((student) => student?.studentClass)
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents, academicYear]);

  // =====================================================
  // SECTIONS
  // =====================================================

  const sections = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              (!academicYear ||
                student?.academicYear === academicYear) &&
              (!studentClass ||
                student?.studentClass === studentClass)
          )
          .map((student) => {
            if (
              typeof student?.section === "object"
            ) {
              return (
                student?.section?.name ||
                student?.section?.value
              );
            }

            return student?.section;
          })
          .filter(Boolean)
      ),
    ].sort();
  }, [
    allStudents,
    academicYear,
    studentClass,
  ]);

  // =====================================================
  // SEARCH ATTENDANCE
  //
  // Existing backend endpoint:
  // /api/student/attendance/class
  // =====================================================

  const searchAttendance = async () => {
    if (!academicYear) {
      alert("Please select Academic Session");
      return;
    }

    if (!attendanceDate) {
      alert("Please select Attendance Date");
      return;
    }

    try {
      setLoading(true);
      setCurrentPage(1);
      setSearched(true);

      const response =
        await axiosInstance.get(
          "/api/student/attendance/class",
          {
            params: {
              academicYear,
              studentClass:
                studentClass || undefined,
              section:
                section || undefined,
              attendanceDate,
            },
          }
        );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAttendance(data);
    } catch (error) {
      console.error(
        "Daily Attendance API Error:",
        error
      );

      setAttendance([]);

      alert(
        error?.response?.data?.message ||
          "Failed to load daily attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetFilters = () => {
    setStudentClass("");
    setSection("");
    setAttendance([]);
    setSearched(false);
    setCurrentPage(1);

    setAttendanceDate(
      new Date().toISOString().split("T")[0]
    );
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const getStudentName = (student) => {
    return (
      [
        student?.firstName,
        student?.middleName,
        student?.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .trim() || "-"
    );
  };

  const getSection = (student) => {
    if (!student?.section) return "-";

    if (typeof student.section === "object") {
      return (
        student.section.name ||
        student.section.value ||
        "-"
      );
    }

    return student.section;
  };

  const getStatus = (item) => {
    const value =
      item?.status ||
      item?.attendanceStatus ||
      item?.attendance ||
      "";

    return String(value).toUpperCase();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PRESENT":
        return "attendance-badge present";

      case "ABSENT":
        return "attendance-badge absent";

      case "HALF_DAY":
      case "HALF-DAY":
        return "attendance-badge half";

      case "LEAVE":
        return "attendance-badge leave";

      default:
        return "attendance-badge";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "PRESENT":
        return "Present";

      case "ABSENT":
        return "Absent";

      case "HALF_DAY":
      case "HALF-DAY":
        return "Half Day";

      case "LEAVE":
        return "Leave";

      default:
        return status || "-";
    }
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const summary = useMemo(() => {
    let present = 0;
    let absent = 0;
    let halfDay = 0;
    let leave = 0;

    attendance.forEach((item) => {
      const status = getStatus(item);

      if (status === "PRESENT") {
        present++;
      } else if (status === "ABSENT") {
        absent++;
      } else if (
        status === "HALF_DAY" ||
        status === "HALF-DAY"
      ) {
        halfDay++;
      } else if (status === "LEAVE") {
        leave++;
      }
    });

    return {
      total: attendance.length,
      present,
      absent,
      halfDay,
      leave,
    };
  }, [attendance]);

  const attendancePercentage =
    summary.total > 0
      ? (
          (summary.present / summary.total) *
          100
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    attendance.length / studentsPerPage
  );

  const indexOfLast =
    currentPage * studentsPerPage;

  const indexOfFirst =
    indexOfLast - studentsPerPage;

  const currentAttendance =
    attendance.slice(
      indexOfFirst,
      indexOfLast
    );

  // =====================================================
  // CSV / EXCEL
  // =====================================================

  const exportExcel = () => {
    if (!attendance.length) {
      alert("No attendance data available");
      return;
    }

    const headers = [
      "S.No.",
      "Admission No",
      "Student Name",
      "Class",
      "Section",
      "Roll No",
      "Attendance Date",
      "Status",
    ];

    const rows = attendance.map(
      (student, index) => [
        index + 1,
        student?.admissionNumber || "",
        getStudentName(student),
        student?.studentClass || "",
        getSection(student),
        student?.rollNumber ?? "",
        attendanceDate,
        getStatus(student),
      ]
    );

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");
            return `"${text.replace(
              /"/g,
              '""'
            )}"`;
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
      `Daily-Attendance-${attendanceDate}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // PDF / PRINT
  // =====================================================

  const exportPDF = () => {
    if (!attendance.length) {
      alert("No attendance data available");
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800"
    );

    if (!printWindow) return;

    const tableRows = attendance
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student?.admissionNumber || "-"}</td>
            <td>${getStudentName(student)}</td>
            <td>${student?.studentClass || "-"}</td>
            <td>${getSection(student)}</td>
            <td>${student?.rollNumber ?? "-"}</td>
            <td>${getStatusLabel(
              getStatus(student)
            )}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>Daily Attendance Report</title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            padding: 25px;
            color: #1e293b;
          }

          h1 {
            text-align: center;
            margin: 0;
            color: #1e3a8a;
            font-size: 22px;
          }

          .subtitle {
            text-align: center;
            color: #64748b;
            margin: 6px 0 20px;
            font-size: 12px;
          }

          .summary {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 18px;
          }

          .summary-box {
            border: 1px solid #dbeafe;
            padding: 8px 15px;
            text-align: center;
            min-width: 100px;
          }

          .summary-box strong {
            display: block;
            font-size: 16px;
            color: #1e3a8a;
          }

          .summary-box span {
            font-size: 10px;
            color: #64748b;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }

          th,
          td {
            border: 1px solid #dbe3ec;
            padding: 7px;
            text-align: center;
          }

          th {
            background: #eff6ff;
            color: #1e3a8a;
            font-weight: 700;
          }

          .footer {
            margin-top: 18px;
            font-size: 11px;
            color: #475569;
          }

          @media print {

            body {
              padding: 10px;
            }

          }

        </style>

      </head>

      <body>

        <h1>
          Daily Attendance Report
        </h1>

        <div class="subtitle">

          Academic Session:
          ${academicYear}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Date:
          ${attendanceDate}

          ${
            studentClass
              ? `&nbsp;&nbsp; | &nbsp;&nbsp; Class: ${studentClass}`
              : ""
          }

          ${
            section
              ? `&nbsp;&nbsp; | &nbsp;&nbsp; Section: ${section}`
              : ""
          }

        </div>

        <div class="summary">

          <div class="summary-box">
            <strong>${summary.total}</strong>
            <span>Total</span>
          </div>

          <div class="summary-box">
            <strong>${summary.present}</strong>
            <span>Present</span>
          </div>

          <div class="summary-box">
            <strong>${summary.absent}</strong>
            <span>Absent</span>
          </div>

          <div class="summary-box">
            <strong>${summary.halfDay}</strong>
            <span>Half Day</span>
          </div>

          <div class="summary-box">
            <strong>${summary.leave}</strong>
            <span>Leave</span>
          </div>

        </div>

        <table>

          <thead>

            <tr>
              <th>#</th>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll No</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>
            ${tableRows}
          </tbody>

        </table>

        <div class="footer">

          Attendance Percentage:
          ${attendancePercentage}%

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Total Students:
          ${summary.total}

        </div>

      </body>

      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handlePrint = () => {
    exportPDF();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="daily-attendance-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="report-header">

        <div className="header-left">

          <div className="report-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <h4>
              Daily Attendance Report
            </h4>

            <p>
              View student attendance for a specific date
            </p>

          </div>

        </div>

        <div className="header-right">

          <div className="date-pill">

            <FaCalendarAlt />

            <div>

              <span>
                Attendance Date
              </span>

              <strong>
                {attendanceDate
                  ? attendanceDate
                      .split("-")
                      .reverse()
                      .join("-")
                  : "-"}
              </strong>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      {searched && !loading && (
        <div className="summary-grid">

          {/* TOTAL */}

          <div className="summary-card blue">

            <div className="summary-icon">
              <FaUserGraduate />
            </div>

            <div>

              <span>
                Total Students
              </span>

              <strong>
                {summary.total}
              </strong>

            </div>

          </div>

          {/* PRESENT */}

          <div className="summary-card green">

            <div className="summary-icon">
              <FaCheckCircle />
            </div>

            <div>

              <span>
                Present
              </span>

              <strong>
                {summary.present}
              </strong>

            </div>

          </div>

          {/* ABSENT */}

          <div className="summary-card red">

            <div className="summary-icon">
              <FaTimesCircle />
            </div>

            <div>

              <span>
                Absent
              </span>

              <strong>
                {summary.absent}
              </strong>

            </div>

          </div>

          {/* HALF DAY */}

          <div className="summary-card orange">

            <div className="summary-icon">
              <FaClock />
            </div>

            <div>

              <span>
                Half Day
              </span>

              <strong>
                {summary.halfDay}
              </strong>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          FILTER CARD
      ================================================= */}

      <div className="filter-card">

        <div className="filter-title">

          <div className="filter-heading">

            <div className="filter-heading-icon">
              <FaFilter />
            </div>

            <div>

              <strong>
                Attendance Filters
              </strong>

              <small>
                Select session, date, class and section
              </small>

            </div>

          </div>

          <button
            type="button"
            className="reset-btn"
            onClick={resetFilters}
          >
            <FaRedo />
            Reset
          </button>

        </div>

        <div className="filter-body">

          {/* SESSION */}

          <div className="filter-group">

            <label>
              Academic Session
              <span>*</span>
            </label>

            <select
              className="form-select"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                setStudentClass("");
                setSection("");
              }}
            >

              <option value="">
                Select Session
              </option>

              {academicYears.map((year) => (
                <option
                  value={year}
                  key={year}
                >
                  {year}
                </option>
              ))}

            </select>

          </div>

          {/* DATE */}

          <div className="filter-group">

            <label>
              Attendance Date
              <span>*</span>
            </label>

            <div className="date-input-wrap">

              <FaCalendarAlt />

              <input
                type="date"
                className="form-control"
                value={attendanceDate}
                onChange={(e) =>
                  setAttendanceDate(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* CLASS */}

          <div className="filter-group">

            <label>
              Class
            </label>

            <select
              className="form-select"
              value={studentClass}
              onChange={(e) => {
                setStudentClass(e.target.value);
                setSection("");
              }}
            >

              <option value="">
                All Classes
              </option>

              {classes.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* SECTION */}

          <div className="filter-group">

            <label>
              Section
            </label>

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

              {sections.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="search-row">

          <button
            type="button"
            className="search-btn"
            onClick={searchAttendance}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Searching...
              </>
            ) : (
              <>
                <FaSearch />
                Search Attendance
              </>
            )}

          </button>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="report-toolbar">

        <div className="result-info">

          <div className="result-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <strong>
              Daily Attendance
            </strong>

            <span>
              {searched
                ? `${attendance.length} records found`
                : "Select filters and search"}
            </span>

          </div>

        </div>

        <div className="export-buttons">

          <button
            type="button"
            className="export-btn excel"
            onClick={exportExcel}
            disabled={!attendance.length}
          >
            <FaFileExcel />
            Excel
          </button>

          <button
            type="button"
            className="export-btn pdf"
            onClick={exportPDF}
            disabled={!attendance.length}
          >
            <FaFilePdf />
            PDF
          </button>

          <button
            type="button"
            className="export-btn print"
            onClick={handlePrint}
            disabled={!attendance.length}
          >
            <FaPrint />
            Print
          </button>

        </div>

      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="table-card">

        {initialLoading ? (

          <div className="empty-state">

            <div className="spinner-border" />

            <p>
              Loading attendance information...
            </p>

          </div>

        ) : loading ? (

          <div className="empty-state">

            <div className="spinner-border" />

            <p>
              Loading daily attendance...
            </p>

          </div>

        ) : !searched ? (

          <div className="empty-state">

            <div className="empty-icon">
              <FaCalendarAlt />
            </div>

            <h5>
              Daily Attendance Report
            </h5>

            <p>
              Select the academic session and date,
              then click Search Attendance.
            </p>

          </div>

        ) : attendance.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              <FaUserGraduate />
            </div>

            <h5>
              No Attendance Records
            </h5>

            <p>
              No attendance was found for the selected
              date and filters.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="attendance-table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>
                    Admission No.
                  </th>

                  <th>
                    Student Name
                  </th>

                  <th>
                    Class
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Roll No.
                  </th>

                  <th>
                    Attendance Date
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentAttendance.map(
                  (student, index) => {

                    const status =
                      getStatus(student);

                    return (
                      <tr
                        key={
                          student?.id ||
                          student?.admissionNumber ||
                          index
                        }
                      >

                        <td className="serial-cell">
                          {indexOfFirst + index + 1}
                        </td>

                        <td>

                          <span className="admission-badge">
                            {student?.admissionNumber ||
                              "-"}
                          </span>

                        </td>

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {getStudentName(
                                student
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <div>

                              <strong>
                                {getStudentName(student)}
                              </strong>

                              <small>
                                {student?.gender ||
                                  "Student"}
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>

                          <span className="class-badge">
                            {student?.studentClass ||
                              "-"}
                          </span>

                        </td>

                        <td>

                          <span className="section-badge">
                            {getSection(student)}
                          </span>

                        </td>

                        <td>
                          {student?.rollNumber ?? "-"}
                        </td>

                        <td>
                          {attendanceDate
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>

                        <td>

                          <span
                            className={getStatusClass(
                              status
                            )}
                          >

                            {status === "PRESENT" && (
                              <FaCheckCircle />
                            )}

                            {status === "ABSENT" && (
                              <FaTimesCircle />
                            )}

                            {(status === "HALF_DAY" ||
                              status === "HALF-DAY") && (
                              <FaClock />
                            )}

                            {getStatusLabel(status)}

                          </span>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          FOOTER SUMMARY
      ================================================= */}

      {attendance.length > 0 && (

        <div className="attendance-footer">

          <div className="footer-item">

            <span>
              Total
            </span>

            <strong>
              {summary.total}
            </strong>

          </div>

          <div className="footer-divider" />

          <div className="footer-item present-text">

            <span>
              Present
            </span>

            <strong>
              {summary.present}
            </strong>

          </div>

          <div className="footer-divider" />

          <div className="footer-item absent-text">

            <span>
              Absent
            </span>

            <strong>
              {summary.absent}
            </strong>

          </div>

          <div className="footer-divider" />

          <div className="footer-item">

            <span>
              Attendance %
            </span>

            <strong>
              {attendancePercentage}%
            </strong>

          </div>

        </div>

      )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {attendance.length > 0 && (

        <div className="pagination-card">

          <div className="pagination-info">

            Showing{" "}
            <strong>
              {indexOfFirst + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                indexOfLast,
                attendance.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {attendance.length}
            </strong>{" "}
            students

          </div>

          <div className="pagination-buttons">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(
                    page - currentPage
                  ) <= 1
                );
              })
              .map(
                (page, index, array) => {

                  const previous =
                    array[index - 1];

                  const showDots =
                    previous &&
                    page - previous > 1;

                  return (
                    <React.Fragment key={page}>

                      {showDots && (
                        <span className="dots">
                          ...
                        </span>
                      )}

                      <button
                        type="button"
                        className={
                          currentPage === page
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>

                    </React.Fragment>
                  );
                }
              )}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
            >
              <FaChevronRight />
            </button>

          </div>

        </div>

      )}

      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

        .daily-attendance-page {
          padding: 18px 10px 30px;
          background: #f7faff;
          min-height: calc(100vh - 70px);
        }

        /* ================= HEADER ================= */

        .report-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f7fbff 100%
          );
          border: 1px solid #dbeafe;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 5px 18px rgba(
              37,
              99,
              235,
              0.07
            );
          margin-bottom: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .report-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          box-shadow:
            0 7px 16px rgba(
              37,
              99,
              235,
              0.20
            );
        }

        .report-header h4 {
          margin: 0;
          color: #172b4d;
          font-size: 18px;
          font-weight: 700;
        }

        .report-header p {
          margin: 4px 0 0;
          color: #8190a5;
          font-size: 12px;
        }

        .date-pill {
          display: flex;
          align-items: center;
          gap: 9px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          padding: 8px 13px;
        }

        .date-pill > svg {
          color: #2563eb;
          font-size: 15px;
        }

        .date-pill span {
          display: block;
          color: #7b8aa0;
          font-size: 9px;
          font-weight: 600;
        }

        .date-pill strong {
          display: block;
          margin-top: 1px;
          color: #2563eb;
          font-size: 13px;
        }

        /* ================= SUMMARY ================= */

        .summary-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }

        .summary-card {
          background: #fff;
          border-radius: 14px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          gap: 11px;
          border: 1px solid #e3ebf5;
          box-shadow:
            0 4px 14px rgba(
              30,
              70,
              110,
              0.05
            );
        }

        .summary-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .summary-card span {
          display: block;
          color: #8190a5;
          font-size: 10px;
          font-weight: 600;
        }

        .summary-card strong {
          display: block;
          color: #243b5a;
          font-size: 19px;
          margin-top: 1px;
        }

        .summary-card.blue {
          border-top: 3px solid #2563eb;
        }

        .summary-card.blue
        .summary-icon {
          background: #eff6ff;
          color: #2563eb;
        }

        .summary-card.green {
          border-top: 3px solid #198754;
        }

        .summary-card.green
        .summary-icon {
          background: #eaf8f0;
          color: #198754;
        }

        .summary-card.red {
          border-top: 3px solid #dc3545;
        }

        .summary-card.red
        .summary-icon {
          background: #fff0f1;
          color: #dc3545;
        }

        .summary-card.orange {
          border-top: 3px solid #f59e0b;
        }

        .summary-card.orange
        .summary-icon {
          background: #fff7e6;
          color: #d97706;
        }

        /* ================= FILTER ================= */

        .filter-card {
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          box-shadow:
            0 4px 16px rgba(
              30,
              70,
              110,
              0.06
            );
          margin-bottom: 16px;
          overflow: hidden;
        }

        .filter-title {
          padding: 12px 17px;
          border-bottom: 1px solid #e5edf7;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .filter-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-heading-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .filter-heading strong {
          display: block;
          color: #1e3a8a;
          font-size: 13px;
        }

        .filter-heading small {
          display: block;
          margin-top: 2px;
          color: #94a3b8;
          font-size: 10px;
        }

        .reset-btn {
          border: 1px solid #dbe5f0;
          background: #fff;
          color: #64748b;
          border-radius: 8px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: .2s;
        }

        .reset-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .filter-body {
          padding: 17px;
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .filter-group label {
          display: block;
          color: #526276;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .filter-group label span {
          color: #dc3545;
          margin-left: 3px;
        }

        .filter-group .form-control,
        .filter-group .form-select {
          height: 38px;
          border: 1px solid #dce4ed;
          border-radius: 8px;
          color: #334155;
          font-size: 12px;
          box-shadow: none;
        }

        .filter-group .form-control:focus,
        .filter-group .form-select:focus {
          border-color: #86b7fe;
          box-shadow:
            0 0 0 3px rgba(
              37,
              99,
              235,
              0.08
            );
        }

        .date-input-wrap {
          position: relative;
        }

        .date-input-wrap > svg {
          position: absolute;
          left: 11px;
          top: 12px;
          color: #64748b;
          font-size: 12px;
          z-index: 2;
        }

        .date-input-wrap .form-control {
          padding-left: 32px;
        }

        .search-row {
          padding: 0 17px 17px;
          display: flex;
          justify-content: flex-end;
        }

        .search-btn {
          border: none;
          border-radius: 9px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #fff;
          padding: 9px 19px;
          min-width: 160px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          box-shadow:
            0 6px 14px rgba(
              37,
              99,
              235,
              0.18
            );
        }

        .search-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .search-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        /* ================= TOOLBAR ================= */

        .report-toolbar {
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          padding: 11px 14px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 3px 12px rgba(
              30,
              70,
              110,
              0.04
            );
        }

        .result-info {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .result-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .result-info strong {
          display: block;
          color: #243b5a;
          font-size: 13px;
        }

        .result-info span {
          display: block;
          color: #64748b;
          font-size: 10px;
          margin-top: 2px;
        }

        .export-buttons {
          display: flex;
          gap: 7px;
        }

        .export-btn {
          border-radius: 8px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }

        .export-btn:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .export-btn.excel {
          color: #198754;
          border: 1px solid #b9e4cc;
          background: #f1fff7;
        }

        .export-btn.pdf {
          color: #dc3545;
          border: 1px solid #f1c2c7;
          background: #fff6f7;
        }

        .export-btn.print {
          color: #2563eb;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
        }

        /* ================= TABLE ================= */

        .table-card {
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 4px 16px rgba(
              30,
              70,
              110,
              0.05
            );
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .attendance-table {
          width: 100%;
          min-width: 950px;
          border-collapse: separate;
          border-spacing: 0;
        }

        .attendance-table thead th {
          background: #eff6ff;
          color: #1e3a8a;
          padding: 12px 9px;
          border-bottom: 1px solid #dbeafe;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .25px;
          text-align: center;
          white-space: nowrap;
        }

        .attendance-table tbody td {
          padding: 10px 9px;
          border-bottom: 1px dotted #dbe4ef;
          color: #475569;
          font-size: 11px;
          text-align: center;
          vertical-align: middle;
          white-space: nowrap;
        }

        .attendance-table tbody tr:hover {
          background: #f8fbff;
        }

        .attendance-table tbody tr:last-child td {
          border-bottom: none;
        }

        .serial-cell {
          color: #94a3b8 !important;
          font-weight: 600;
        }

        .admission-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
        }

        .class-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f1f5ff;
          color: #4f46e5;
          font-size: 10px;
          font-weight: 700;
        }

        .section-badge {
          width: 25px;
          height: 25px;
          border-radius: 7px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
        }

        .student-name-cell {
          min-width: 185px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
        }

        .student-avatar {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #e0edff,
            #eff6ff
          );
          color: #2563eb;
          border: 1px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
        }

        .student-name-cell strong {
          display: block;
          color: #253b59;
          font-size: 11px;
        }

        .student-name-cell small {
          display: block;
          color: #94a3b8;
          font-size: 9px;
          margin-top: 2px;
        }

        /* ================= ATTENDANCE STATUS ================= */

        .attendance-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-width: 78px;
          padding: 5px 9px;
          border-radius: 20px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
        }

        .attendance-badge.present {
          background: #eaf8f0;
          border: 1px solid #c8ecd8;
          color: #198754;
        }

        .attendance-badge.absent {
          background: #fff0f1;
          border: 1px solid #f3c9cd;
          color: #dc3545;
        }

        .attendance-badge.half {
          background: #fff7e6;
          border: 1px solid #f5dfad;
          color: #d97706;
        }

        .attendance-badge.leave {
          background: #f2efff;
          border: 1px solid #ddd5ff;
          color: #6d4fd8;
        }

        /* ================= FOOTER SUMMARY ================= */

        .attendance-footer {
          margin-top: 12px;
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 13px;
          padding: 11px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          box-shadow:
            0 3px 12px rgba(
              30,
              70,
              110,
              0.04
            );
        }

        .footer-item {
          text-align: center;
        }

        .footer-item span {
          display: block;
          color: #94a3b8;
          font-size: 9px;
          font-weight: 600;
        }

        .footer-item strong {
          display: block;
          color: #243b5a;
          font-size: 14px;
          margin-top: 2px;
        }

        .footer-item.present-text strong {
          color: #198754;
        }

        .footer-item.absent-text strong {
          color: #dc3545;
        }

        .footer-divider {
          height: 28px;
          width: 1px;
          background: #e2e8f0;
        }

        /* ================= EMPTY ================= */

        .empty-state {
          min-height: 280px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #94a3b8;
        }

        .empty-state .spinner-border {
          width: 29px;
          height: 29px;
          margin-bottom: 11px;
          color: #2563eb;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          margin-bottom: 11px;
        }

        .empty-state h5 {
          color: #475569;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 5px;
        }

        .empty-state p {
          margin: 0;
          color: #94a3b8;
          font-size: 11px;
        }

        /* ================= PAGINATION ================= */

        .pagination-card {
          margin-top: 12px;
          padding: 10px 13px;
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 3px 12px rgba(
              30,
              70,
              110,
              0.04
            );
        }

        .pagination-info {
          color: #7b8aa0;
          font-size: 11px;
        }

        .pagination-info strong {
          color: #334155;
        }

        .pagination-buttons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pagination-buttons button {
          width: 29px;
          height: 29px;
          border: 1px solid #dbe4ee;
          border-radius: 7px;
          background: #fff;
          color: #526276;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pagination-buttons button:hover:not(:disabled) {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #2563eb;
        }

        .pagination-buttons button.active {
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          border-color: #2563eb;
          color: #fff;
          box-shadow:
            0 4px 9px rgba(
              37,
              99,
              235,
              0.18
            );
        }

        .pagination-buttons button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .dots {
          color: #94a3b8;
          padding: 0 2px;
          font-size: 11px;
        }

        /* ================= TABLET ================= */

        @media (max-width: 992px) {

          .summary-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .filter-body {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        /* ================= MOBILE ================= */

        @media (max-width: 576px) {

          .daily-attendance-page {
            padding: 10px 6px 20px;
          }

          .report-header {
            padding: 15px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .header-right {
            width: 100%;
          }

          .date-pill {
            width: 100%;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .filter-title {
            padding: 11px 13px;
          }

          .filter-heading small {
            display: none;
          }

          .filter-body {
            padding: 14px;
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .search-row {
            padding: 0 14px 14px;
          }

          .search-btn {
            width: 100%;
          }

          .report-toolbar {
            padding: 11px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .export-buttons {
            width: 100%;
          }

          .export-btn {
            flex: 1;
          }

          .attendance-footer {
            gap: 12px;
            justify-content: space-around;
          }

          .footer-divider {
            display: none;
          }

          .pagination-card {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .pagination-info {
            text-align: center;
          }

          .pagination-buttons {
            justify-content: center;
          }

        }

      `}</style>

    </div>
  );
};

export default DailyAttendanceReportsPage;
