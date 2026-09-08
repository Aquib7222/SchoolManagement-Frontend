
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
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const MonthlyAttendanceReportPage = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const [academicYear, setAcademicYear] = useState("");
  const [month, setMonth] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // ----------------------------------------------------
  // MONTHS
  // ----------------------------------------------------

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  // ----------------------------------------------------
  // INITIAL STUDENT DATA
  // ----------------------------------------------------

  const fetchInitialStudents = async () => {
    try {
      setInitialLoading(true);

      const response = await axiosInstance.get("/api/students");

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

      // Current month
      const currentMonth =
        new Date().getMonth();

      setMonth(months[currentMonth]);
    } catch (error) {
      console.error(
        "Initial Student API Error:",
        error
      );
    } finally {
      setInitialLoading(false);
    }
  };

  // ----------------------------------------------------
  // SEARCH MONTHLY ATTENDANCE
  // ----------------------------------------------------

  const searchAttendance = async () => {
    if (!academicYear) {
      alert("Please select Academic Session");
      return;
    }

    if (!month) {
      alert("Please select Month");
      return;
    }

    try {
      setLoading(true);
      setCurrentPage(1);

      const response =
        await axiosInstance.get(
          "/api/student/attendance/monthly",
          {
            params: {
              academicYear,
              studentClass:
                studentClass || undefined,
              section:
                section || undefined,
              month,
            },
          }
        );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setStudents(
        normalizeAttendanceData(data)
      );
    } catch (error) {
      console.error(
        "Monthly Attendance API Error:",
        error
      );

      setStudents([]);

      alert(
        error?.response?.data?.message ||
          "Failed to load monthly attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // NORMALIZE API DATA
  // ----------------------------------------------------

  const normalizeAttendanceData = (data) => {
    return data.map((item) => {
      return {
        ...item,

        studentName:
          item?.studentName ||
          [
            item?.firstName,
            item?.middleName,
            item?.lastName,
          ]
            .filter(Boolean)
            .join(" ")
            .trim() ||
          "-",

        admissionNumber:
          item?.admissionNumber ||
          item?.student?.admissionNumber ||
          "-",

        studentClass:
          item?.studentClass ||
          item?.student?.studentClass ||
          "-",

        section:
          getSectionValue(
            item?.section ||
              item?.student?.section
          ),

        rollNumber:
          item?.rollNumber ??
          item?.student?.rollNumber ??
          "-",

        present:
          Number(
            item?.present ??
              item?.presentDays ??
              item?.totalPresent ??
              0
          ),

        absent:
          Number(
            item?.absent ??
              item?.absentDays ??
              item?.totalAbsent ??
              0
          ),

        leave:
          Number(
            item?.leave ??
              item?.leaveDays ??
              item?.totalLeave ??
              0
          ),

        halfDay:
          Number(
            item?.halfDay ??
              item?.halfDays ??
              item?.totalHalfDay ??
              0
          ),

        totalDays:
          Number(
            item?.totalDays ??
              item?.workingDays ??
              0
          ),

        attendancePercentage:
          Number(
            item?.attendancePercentage ??
              item?.percentage ??
              0
          ),
      };
    });
  };

  // ----------------------------------------------------
  // SECTION HELPER
  // ----------------------------------------------------

  const getSectionValue = (value) => {
    if (!value) return "-";

    if (typeof value === "object") {
      return (
        value?.name ||
        value?.value ||
        value?.code ||
        "-"
      );
    }

    return value;
  };

  // ----------------------------------------------------
  // RESET
  // ----------------------------------------------------

  const resetFilters = () => {
    setStudentClass("");
    setSection("");
    setStudents([]);
    setCurrentPage(1);

    if (academicYear && month) {
      setTimeout(() => {
        searchAttendance();
      }, 0);
    }
  };

  // ----------------------------------------------------
  // INITIAL LOAD
  // ----------------------------------------------------

  useEffect(() => {
    fetchInitialStudents();
  }, []);

  // ----------------------------------------------------
  // ACADEMIC YEARS
  // ----------------------------------------------------

  const academicYears = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .map(
            (student) =>
              student?.academicYear
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents]);

  // ----------------------------------------------------
  // CLASSES
  // ----------------------------------------------------

  const classes = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              !academicYear ||
              student?.academicYear ===
                academicYear
          )
          .map(
            (student) =>
              student?.studentClass
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [
    allStudents,
    academicYear,
  ]);

  // ----------------------------------------------------
  // SECTIONS
  // ----------------------------------------------------

  const sections = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              (!academicYear ||
                student?.academicYear ===
                  academicYear) &&
              (!studentClass ||
                student?.studentClass ===
                  studentClass)
          )
          .map((student) =>
            getSectionValue(
              student?.section
            )
          )
          .filter(
            (section) =>
              section && section !== "-"
          )
      ),
    ].sort();
  }, [
    allStudents,
    academicYear,
    studentClass,
  ]);

  // ----------------------------------------------------
  // STATISTICS
  // ----------------------------------------------------

  const statistics = useMemo(() => {
    const total = students.length;

    const present = students.reduce(
      (sum, student) =>
        sum + Number(student.present || 0),
      0
    );

    const absent = students.reduce(
      (sum, student) =>
        sum + Number(student.absent || 0),
      0
    );

    const leave = students.reduce(
      (sum, student) =>
        sum + Number(student.leave || 0),
      0
    );

    const halfDay = students.reduce(
      (sum, student) =>
        sum + Number(student.halfDay || 0),
      0
    );

    const totalAttendance =
      students.reduce(
        (sum, student) =>
          sum +
          Number(
            student.totalDays || 0
          ),
        0
      );

    const averagePercentage =
      total > 0
        ? students.reduce(
            (sum, student) =>
              sum +
              Number(
                student.attendancePercentage ||
                  0
              ),
            0
          ) / total
        : 0;

    return {
      total,
      present,
      absent,
      leave,
      halfDay,
      totalAttendance,
      averagePercentage,
    };
  }, [students]);

  // ----------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent -
    studentsPerPage;

  const currentStudents =
    students.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  // ----------------------------------------------------
  // FORMAT PERCENTAGE
  // ----------------------------------------------------

  const formatPercentage = (value) => {
    const number = Number(value || 0);

    return `${number.toFixed(1)}%`;
  };

  // ----------------------------------------------------
  // PERCENTAGE CLASS
  // ----------------------------------------------------

  const getPercentageClass = (value) => {
    const number = Number(value || 0);

    if (number >= 75) {
      return "percentage-badge good";
    }

    if (number >= 50) {
      return "percentage-badge average";
    }

    return "percentage-badge poor";
  };

  // ----------------------------------------------------
  // CSV / EXCEL
  // ----------------------------------------------------

  const exportExcel = () => {
    if (!students.length) {
      alert("No attendance data available");
      return;
    }

    const headers = [
      "Admission No",
      "Student Name",
      "Class",
      "Section",
      "Roll No",
      "Present",
      "Absent",
      "Half Day",
      "Leave",
      "Working Days",
      "Attendance %",
    ];

    const rows = students.map(
      (student) => [
        student?.admissionNumber || "",
        student?.studentName || "",
        student?.studentClass || "",
        student?.section || "",
        student?.rollNumber ?? "",
        student?.present ?? 0,
        student?.absent ?? 0,
        student?.halfDay ?? 0,
        student?.leave ?? 0,
        student?.totalDays ?? 0,
        formatPercentage(
          student?.attendancePercentage
        ),
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
              String(value ?? "");

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
      `Monthly-Attendance-${academicYear}-${month}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ----------------------------------------------------
  // PDF / PRINT
  // ----------------------------------------------------

  const exportPDF = () => {
    if (!students.length) {
      alert("No attendance data available");
      return;
    }

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=1200,height=800"
      );

    if (!printWindow) return;

    const tableRows = students
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student?.admissionNumber || "-"}</td>
            <td>${student?.studentName || "-"}</td>
            <td>${student?.studentClass || "-"}</td>
            <td>${student?.section || "-"}</td>
            <td>${student?.rollNumber ?? "-"}</td>
            <td>${student?.present ?? 0}</td>
            <td>${student?.absent ?? 0}</td>
            <td>${student?.halfDay ?? 0}</td>
            <td>${student?.leave ?? 0}</td>
            <td>${student?.totalDays ?? 0}</td>
            <td>${formatPercentage(
              student?.attendancePercentage
            )}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Monthly Attendance Report
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 25px;
            color: #222;
          }

          h1 {
            text-align: center;
            margin-bottom: 5px;
            color: #1e3a8a;
          }

          .session {
            text-align: center;
            margin-bottom: 20px;
            color: #555;
            font-size: 13px;
          }

          .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 12px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }

          th,
          td {
            border: 1px solid #ccc;
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
            font-size: 12px;
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
          Monthly Attendance Report
        </h1>

        <div class="session">

          Academic Session:
          ${academicYear}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Month:
          ${month}

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

          <strong>
            Total Students:
            ${statistics.total}
          </strong>

          <strong>
            Average Attendance:
            ${formatPercentage(
              statistics.averagePercentage
            )}
          </strong>

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
              <th>Present</th>
              <th>Absent</th>
              <th>Half Day</th>
              <th>Leave</th>
              <th>Working Days</th>
              <th>Attendance %</th>
            </tr>

          </thead>

          <tbody>

            ${tableRows}

          </tbody>

        </table>

        <div class="footer">

          Total Students:
          ${statistics.total}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Present:
          ${statistics.present}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Absent:
          ${statistics.absent}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Leave:
          ${statistics.leave}

          &nbsp;&nbsp; | &nbsp;&nbsp;

          Half Day:
          ${statistics.halfDay}

        </div>

      </body>

      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // ----------------------------------------------------
  // PRINT
  // ----------------------------------------------------

  const handlePrint = () => {
    if (!students.length) {
      alert("No attendance data available");
      return;
    }

    exportPDF();
  };

  return (
    <div className="monthly-attendance-page">

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
              Monthly Attendance Report
            </h4>

            <p>
              View student attendance summary
              for the selected month
            </p>

          </div>

        </div>

        <div className="header-right">

          <div className="total-pill">

            <span>
              Total Students
            </span>

            <strong>
              {statistics.total}
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="stats-grid">

        <div className="stat-card blue">

          <div className="stat-icon">
            <FaUserGraduate />
          </div>

          <div>
            <span>
              Total Students
            </span>

            <strong>
              {statistics.total}
            </strong>
          </div>

        </div>

        <div className="stat-card green">

          <div className="stat-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>
              Present
            </span>

            <strong>
              {statistics.present}
            </strong>
          </div>

        </div>

        <div className="stat-card red">

          <div className="stat-icon">
            <FaTimesCircle />
          </div>

          <div>
            <span>
              Absent
            </span>

            <strong>
              {statistics.absent}
            </strong>
          </div>

        </div>

        <div className="stat-card orange">

          <div className="stat-icon">
            <FaClipboardList />
          </div>

          <div>
            <span>
              Avg. Attendance
            </span>

            <strong>
              {formatPercentage(
                statistics.averagePercentage
              )}
            </strong>
          </div>

        </div>

      </div>

      {/* =================================================
          FILTER CARD
      ================================================= */}

      <div className="filter-card">

        <div className="filter-title">

          <div>

            <FaFilter />

            <span>
              Attendance Filters
            </span>

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

          {/* Academic Session */}

          <div className="filter-group">

            <label>
              Academic Session
              <span>*</span>
            </label>

            <select
              className="form-select"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(
                  e.target.value
                );

                setStudentClass("");
                setSection("");
              }}
            >

              <option value="">
                Select Session
              </option>

              {academicYears.map(
                (year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                )
              )}

            </select>

          </div>

          {/* Month */}

          <div className="filter-group">

            <label>
              Month
              <span>*</span>
            </label>

            <select
              className="form-select"
              value={month}
              onChange={(e) =>
                setMonth(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Month
              </option>

              {months.map(
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

          {/* Class */}

          <div className="filter-group">

            <label>
              Class
            </label>

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

              {classes.map(
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

          {/* Section */}

          <div className="filter-group">

            <label>
              Section
            </label>

            <select
              className="form-select"
              value={section}
              onChange={(e) =>
                setSection(
                  e.target.value
                )
              }
            >

              <option value="">
                All Sections
              </option>

              {sections.map(
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

        </div>

        <div className="search-row">

          <button
            type="button"
            className="search-btn"
            onClick={
              searchAttendance
            }
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
          SUMMARY STRIP
      ================================================= */}

      <div className="summary-strip">

        <div className="summary-item">

          <FaCalendarAlt />

          <div>

            <span>
              Session
            </span>

            <strong>
              {academicYear || "-"}
            </strong>

          </div>

        </div>

        <div className="summary-item">

          <FaClock />

          <div>

            <span>
              Month
            </span>

            <strong>
              {month || "-"}
            </strong>

          </div>

        </div>

        <div className="summary-item">

          <FaUserGraduate />

          <div>

            <span>
              Students
            </span>

            <strong>
              {statistics.total}
            </strong>

          </div>

        </div>

        <div className="summary-item">

          <FaCheckCircle />

          <div>

            <span>
              Average
            </span>

            <strong>
              {formatPercentage(
                statistics.averagePercentage
              )}
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="report-toolbar">

        <div className="result-info">

          <strong>
            Monthly Attendance
          </strong>

          <span>
            {students.length} records found
          </span>

        </div>

        <div className="export-buttons">

          <button
            type="button"
            className="export-btn excel"
            onClick={exportExcel}
          >

            <FaFileExcel />

            Excel

          </button>

          <button
            type="button"
            className="export-btn pdf"
            onClick={exportPDF}
          >

            <FaFilePdf />

            PDF

          </button>

          <button
            type="button"
            className="export-btn print"
            onClick={handlePrint}
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
              Searching monthly attendance...
            </p>

          </div>

        ) : students.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">

              <FaCalendarAlt />

            </div>

            <h5>
              No Attendance Records
            </h5>

            <p>
              Select session, month and
              optional filters to view
              monthly attendance.
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
                    Present
                  </th>

                  <th>
                    Absent
                  </th>

                  <th>
                    Half Day
                  </th>

                  <th>
                    Leave
                  </th>

                  <th>
                    Working Days
                  </th>

                  <th>
                    Attendance %
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentStudents.map(
                  (student, index) => (

                    <tr
                      key={
                        student?.id ||
                        student?.admissionNumber ||
                        index
                      }
                    >

                      <td>
                        {indexOfFirstStudent +
                          index +
                          1}
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

                            {String(
                              student?.studentName ||
                                "-"
                            )
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <strong>
                              {student?.studentName ||
                                "-"}
                            </strong>

                            <small>
                              Monthly Attendance
                            </small>

                          </div>

                        </div>

                      </td>

                      <td>
                        {student?.studentClass ||
                          "-"}
                      </td>

                      <td>

                        <span className="section-badge">
                          {student?.section ||
                            "-"}
                        </span>

                      </td>

                      <td>
                        {student?.rollNumber ??
                          "-"}
                      </td>

                      <td>

                        <span className="number-badge present">
                          {student?.present ?? 0}
                        </span>

                      </td>

                      <td>

                        <span className="number-badge absent">
                          {student?.absent ?? 0}
                        </span>

                      </td>

                      <td>

                        <span className="number-badge halfday">
                          {student?.halfDay ?? 0}
                        </span>

                      </td>

                      <td>

                        <span className="number-badge leave">
                          {student?.leave ?? 0}
                        </span>

                      </td>

                      <td>

                        <span className="working-days">
                          {student?.totalDays ?? 0}
                        </span>

                      </td>

                      <td>

                        <div className="percentage-cell">

                          <span
                            className={getPercentageClass(
                              student?.attendancePercentage
                            )}
                          >
                            {formatPercentage(
                              student?.attendancePercentage
                            )}
                          </span>

                          <div className="progress-track">

                            <div
                              className="progress-fill"
                              style={{
                                width: `${Math.min(
                                  Number(
                                    student?.attendancePercentage ||
                                      0
                                  ),
                                  100
                                )}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

              <tfoot>

                <tr>

                  <td
                    colSpan="6"
                    className="total-label"
                  >
                    TOTAL
                  </td>

                  <td>
                    <span className="number-badge present">
                      {statistics.present}
                    </span>
                  </td>

                  <td>
                    <span className="number-badge absent">
                      {statistics.absent}
                    </span>
                  </td>

                  <td>
                    <span className="number-badge halfday">
                      {statistics.halfDay}
                    </span>
                  </td>

                  <td>
                    <span className="number-badge leave">
                      {statistics.leave}
                    </span>
                  </td>

                  <td>
                    {statistics.totalAttendance}
                  </td>

                  <td>
                    <span className="percentage-badge good">
                      {formatPercentage(
                        statistics.averagePercentage
                      )}
                    </span>
                  </td>

                </tr>

              </tfoot>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      {students.length > 0 && (

        <div className="pagination-card">

          <div className="pagination-info">

            Showing{" "}

            <strong>
              {indexOfFirstStudent + 1}
            </strong>{" "}

            to{" "}

            <strong>
              {Math.min(
                indexOfLastStudent,
                students.length
              )}
            </strong>{" "}

            of{" "}

            <strong>
              {students.length}
            </strong>{" "}

            students

          </div>

          <div className="pagination-buttons">

            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
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
                (
                  page,
                  index,
                  array
                ) => {

                  const previous =
                    array[index - 1];

                  const showDots =
                    previous &&
                    page - previous > 1;

                  return (

                    <React.Fragment
                      key={page}
                    >

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
                          setCurrentPage(
                            page
                          )
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
                currentPage ===
                totalPages
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

        .monthly-attendance-page {
          padding: 18px 10px 30px;
          background: #f7faff;
          min-height: calc(100vh - 70px);
        }

        /* HEADER */

        .report-header {
          background: #ffffff;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e7eef7;
          box-shadow: 0 4px 16px rgba(
            30,
            70,
            110,
            0.06
          );
          margin-bottom: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .report-icon {
          width: 48px;
          height: 48px;
          border-radius: 13px;
          background: linear-gradient(
            135deg,
            #0d6efd,
            #2563eb
          );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 6px 14px rgba(
            13,
            110,
            253,
            0.20
          );
        }

        .report-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #172b4d;
        }

        .report-header p {
          margin: 3px 0 0;
          color: #8190a5;
          font-size: 12px;
        }

        .total-pill {
          background: #f1f6ff;
          border: 1px solid #dce9ff;
          border-radius: 12px;
          padding: 8px 15px;
          text-align: right;
        }

        .total-pill span {
          display: block;
          color: #7b8aa0;
          font-size: 11px;
        }

        .total-pill strong {
          color: #0d6efd;
          font-size: 19px;
        }

        /* STAT CARDS */

        .stats-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 13px;
          margin-bottom: 16px;
        }

        .stat-card {
          background: #fff;
          border-radius: 14px;
          padding: 13px 15px;
          border: 1px solid #e7eef7;
          box-shadow: 0 4px 14px rgba(
            30,
            70,
            110,
            0.05
          );
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .stat-icon {
          width: 39px;
          height: 39px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .stat-card.blue .stat-icon {
          background: #eaf2ff;
          color: #2563eb;
        }

        .stat-card.green .stat-icon {
          background: #eaf8f0;
          color: #198754;
        }

        .stat-card.red .stat-icon {
          background: #fff0f1;
          color: #dc3545;
        }

        .stat-card.orange .stat-icon {
          background: #fff7e8;
          color: #f59e0b;
        }

        .stat-card span {
          display: block;
          font-size: 10px;
          color: #8190a5;
          margin-bottom: 2px;
        }

        .stat-card strong {
          font-size: 18px;
          color: #243b5a;
        }

        /* FILTER */

        .filter-card {
          background: #ffffff;
          border: 1px solid #e7eef7;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(
            30,
            70,
            110,
            0.05
          );
          margin-bottom: 16px;
          overflow: hidden;
        }

        .filter-title {
          padding: 13px 17px;
          border-bottom: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .filter-title > div {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #1d4ed8;
          font-size: 14px;
          font-weight: 700;
        }

        .reset-btn {
          border: 1px solid #dce5ef;
          background: #fff;
          color: #64748b;
          border-radius: 8px;
          padding: 6px 11px;
          font-size: 12px;
          display: flex;
          gap: 6px;
          align-items: center;
          cursor: pointer;
        }

        .reset-btn:hover {
          background: #f5f8fc;
          color: #0d6efd;
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
          font-size: 11px;
          color: #526276;
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
          border-radius: 8px;
          border: 1px solid #dce4ed;
          font-size: 12px;
          color: #334155;
          box-shadow: none;
        }

        .filter-group .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 3px rgba(
            13,
            110,
            253,
            0.08
          );
        }

        .search-row {
          padding: 0 17px 17px;
          display: flex;
          justify-content: flex-end;
        }

        .search-btn {
          border: none;
          background: linear-gradient(
            135deg,
            #0d6efd,
            #2563eb
          );
          color: #fff;
          border-radius: 9px;
          padding: 9px 18px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 155px;
          justify-content: center;
          box-shadow: 0 5px 12px rgba(
            13,
            110,
            253,
            0.16
          );
          cursor: pointer;
        }

        .search-btn:hover {
          transform: translateY(-1px);
        }

        .search-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        /* SUMMARY STRIP */

        .summary-strip {
          background: #fff;
          border: 1px solid #e7eef7;
          border-radius: 14px;
          padding: 11px 15px;
          margin-bottom: 12px;
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 10px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 4px 8px;
          border-right: 1px dotted #dbe4ef;
        }

        .summary-item:last-child {
          border-right: none;
        }

        .summary-item > svg {
          color: #2563eb;
          font-size: 14px;
        }

        .summary-item span {
          display: block;
          font-size: 9px;
          color: #94a3b8;
        }

        .summary-item strong {
          display: block;
          color: #334155;
          font-size: 11px;
        }

        /* TOOLBAR */

        .report-toolbar {
          background: #ffffff;
          border: 1px solid #e7eef7;
          border-radius: 14px;
          padding: 11px 14px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .result-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .result-info strong {
          font-size: 14px;
          color: #243b5a;
        }

        .result-info span {
          background: #eef5ff;
          color: #2563eb;
          border-radius: 20px;
          padding: 4px 9px;
          font-size: 10px;
          font-weight: 600;
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
          gap: 6px;
          cursor: pointer;
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
          color: #0d6efd;
          border: 1px solid #bdd5fb;
          background: #f4f8ff;
        }

        /* TABLE */

        .table-card {
          background: #fff;
          border: 1px solid #e7eef7;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(
            30,
            70,
            110,
            0.05
          );
          overflow: hidden;
        }

        .attendance-table {
          width: 100%;
          min-width: 1200px;
          border-collapse: separate;
          border-spacing: 0;
        }

        .attendance-table thead th {
          background: #f4f7fb;
          color: #56677d;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .25px;
          padding: 12px 9px;
          border-bottom: 1px solid #e3eaf2;
          white-space: nowrap;
          text-align: center;
        }

        .attendance-table tbody td {
          padding: 10px 9px;
          border-bottom: 1px dotted #dce4ed;
          color: #475569;
          font-size: 11px;
          text-align: center;
          vertical-align: middle;
          white-space: nowrap;
        }

        .attendance-table tbody tr:hover {
          background: #f8fbff;
        }

        .attendance-table tfoot td {
          padding: 11px 9px;
          background: #f4f8ff;
          color: #334155;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
          border-top: 1px solid #dbe7f7;
        }

        .total-label {
          color: #1e3a8a !important;
          text-align: right !important;
        }

        .admission-badge {
          display: inline-block;
          padding: 4px 7px;
          border-radius: 6px;
          background: #eef5ff;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
        }

        .section-badge {
          display: inline-block;
          min-width: 25px;
          padding: 4px 7px;
          border-radius: 6px;
          background: #f1f5f9;
          color: #475569;
          font-size: 10px;
          font-weight: 700;
        }

        .student-name-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
          min-width: 165px;
        }

        .student-avatar {
          width: 29px;
          height: 29px;
          min-width: 29px;
          border-radius: 50%;
          background: #eaf2ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
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

        /* NUMBER BADGES */

        .number-badge {
          display: inline-flex;
          min-width: 27px;
          height: 25px;
          padding: 0 7px;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
        }

        .number-badge.present {
          background: #eaf8f0;
          color: #198754;
        }

        .number-badge.absent {
          background: #fff0f1;
          color: #dc3545;
        }

        .number-badge.halfday {
          background: #fff7e8;
          color: #d97706;
        }

        .number-badge.leave {
          background: #eef5ff;
          color: #2563eb;
        }

        .working-days {
          font-weight: 700;
          color: #475569;
        }

        /* PERCENTAGE */

        .percentage-cell {
          min-width: 90px;
        }

        .percentage-badge {
          display: inline-block;
          padding: 4px 7px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 700;
        }

        .percentage-badge.good {
          background: #eaf8f0;
          color: #198754;
        }

        .percentage-badge.average {
          background: #fff7e8;
          color: #d97706;
        }

        .percentage-badge.poor {
          background: #fff0f1;
          color: #dc3545;
        }

        .progress-track {
          height: 4px;
          background: #e9eef5;
          border-radius: 10px;
          margin-top: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #2563eb;
          border-radius: 10px;
        }

        /* EMPTY */

        .empty-state {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-align: center;
        }

        .empty-state .spinner-border {
          width: 28px;
          height: 28px;
          margin-bottom: 10px;
          color: #0d6efd;
        }

        .empty-icon {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #eef5ff;
          color: #4c8df6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 10px;
        }

        .empty-state h5 {
          color: #475569;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .empty-state p {
          margin: 0;
          font-size: 11px;
        }

        /* PAGINATION */

        .pagination-card {
          margin-top: 12px;
          background: #fff;
          border: 1px solid #e7eef7;
          border-radius: 13px;
          padding: 10px 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          border: 1px solid #dce5ef;
          background: #fff;
          color: #526276;
          border-radius: 7px;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pagination-buttons button:hover:not(:disabled) {
          border-color: #86b7fe;
          color: #0d6efd;
          background: #f4f8ff;
        }

        .pagination-buttons button.active {
          background: #0d6efd;
          color: #fff;
          border-color: #0d6efd;
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

        /* TABLET */

        @media (max-width: 992px) {

          .stats-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .filter-body {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .summary-strip {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .summary-item:nth-child(2) {
            border-right: none;
          }

          .summary-item {
            border-bottom: 1px dotted #dbe4ef;
            padding-bottom: 8px;
          }

          .summary-item:nth-child(3),
          .summary-item:nth-child(4) {
            border-bottom: none;
          }

        }

        /* MOBILE */

        @media (max-width: 576px) {

          .monthly-attendance-page {
            padding: 10px 6px 20px;
          }

          .report-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .header-right {
            width: 100%;
          }

          .total-pill {
            text-align: left;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .filter-body {
            grid-template-columns: 1fr;
          }

          .search-row {
            justify-content: stretch;
          }

          .search-btn {
            width: 100%;
          }

          .summary-strip {
            grid-template-columns: 1fr;
          }

          .summary-item,
          .summary-item:nth-child(2),
          .summary-item:nth-child(3) {
            border-right: none;
            border-bottom: 1px dotted #dbe4ef;
            padding-bottom: 8px;
          }

          .summary-item:last-child {
            border-bottom: none;
          }

          .report-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .export-buttons {
            width: 100%;
          }

          .export-btn {
            flex: 1;
            justify-content: center;
          }

          .pagination-card {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }

          .pagination-buttons {
            justify-content: center;
          }

        }

      `}</style>

    </div>
  );
};

export default MonthlyAttendanceReportPage;

