

import React, { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUmbrellaBeach,
  FaPercentage,
  FaCalendarAlt,
  FaUserGraduate,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  const navigate = useNavigate();

  // =====================================================
  // STUDENT FROM LOCAL STORAGE
  // =====================================================

  const user = JSON.parse(localStorage.getItem("user"));

  const admissionNumber = user?.admissionNumber;
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    currentDate
      .toLocaleString("en-US", {
        month: "long",
      })
      .toUpperCase()
  );

  const [calendarYear, setCalendarYear] = useState(
    currentDate.getFullYear()
  );

  // =====================================================
  // MONTHS
  // =====================================================

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

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  useEffect(() => {
    if (!admissionNumber || !schoolId) {
      setLoading(false);
      return;
    }

    loadAttendance();
  }, [admissionNumber, schoolId]);

  const loadAttendance = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        "/api/student/attendance/school",
        {
          params: {
            schoolId: schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      const studentAttendance = data.filter(
        (item) =>
          String(item.admissionNumber) ===
          String(admissionNumber)
      );

      setAttendance(studentAttendance);
    } catch (error) {
      console.error(
        "Student Attendance Error:",
        error
      );

      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STATUS NORMALIZER
  // =====================================================

  const getStatus = (item) => {
    return String(
      item?.status ||
        item?.attendanceStatus ||
        ""
    ).toUpperCase();
  };

  // =====================================================
  // DATE
  // =====================================================

  const getAttendanceDate = (item) => {
    return (
      item?.attendanceDate ||
      item?.date ||
      item?.attendance_date ||
      null
    );
  };

  // =====================================================
  // DATE KEY
  // =====================================================

  const getDateKey = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    const year = parsedDate.getFullYear();
    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // ALL COUNTS
  // =====================================================

  const summary = useMemo(() => {
    const present = attendance.filter(
      (item) => getStatus(item) === "PRESENT"
    ).length;

    const absent = attendance.filter(
      (item) => getStatus(item) === "ABSENT"
    ).length;

    const halfDay = attendance.filter(
      (item) =>
        getStatus(item) === "HALF_DAY" ||
        getStatus(item) === "HALFDAY"
    ).length;

    const leave = attendance.filter(
      (item) => getStatus(item) === "LEAVE"
    ).length;

    const total = attendance.length;

    const percentage =
      total > 0
        ? ((present + halfDay * 0.5) / total) * 100
        : 0;

    return {
      total,
      present,
      absent,
      halfDay,
      leave,
      percentage,
    };
  }, [attendance]);

  // =====================================================
  // MONTH FILTER
  // =====================================================

  const monthlyAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const date = getAttendanceDate(item);

      if (!date) return false;

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return false;
      }

      const month = parsedDate
        .toLocaleString("en-US", {
          month: "long",
        })
        .toUpperCase();

      return month === selectedMonth;
    });
  }, [attendance, selectedMonth]);

  // =====================================================
  // MONTH SUMMARY
  // =====================================================

  const monthlySummary = useMemo(() => {
    const present = monthlyAttendance.filter(
      (item) => getStatus(item) === "PRESENT"
    ).length;

    const absent = monthlyAttendance.filter(
      (item) => getStatus(item) === "ABSENT"
    ).length;

    const halfDay = monthlyAttendance.filter(
      (item) =>
        getStatus(item) === "HALF_DAY" ||
        getStatus(item) === "HALFDAY"
    ).length;

    const leave = monthlyAttendance.filter(
      (item) => getStatus(item) === "LEAVE"
    ).length;

    const total = monthlyAttendance.length;

    const percentage =
      total > 0
        ? ((present + halfDay * 0.5) / total) * 100
        : 0;

    return {
      total,
      present,
      absent,
      halfDay,
      leave,
      percentage,
    };
  }, [monthlyAttendance]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS UI
  // =====================================================

  const statusConfig = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          text: "PRESENT",
          shortText: "P",
          bg: "#ecfdf5",
          color: "#15803d",
          border: "#bbf7d0",
          icon: <FaCheckCircle />,
        };

      case "ABSENT":
        return {
          text: "ABSENT",
          shortText: "A",
          bg: "#fff1f2",
          color: "#dc2626",
          border: "#fecdd3",
          icon: <FaTimesCircle />,
        };

      case "HALF_DAY":
      case "HALFDAY":
        return {
          text: "HALF DAY",
          shortText: "H",
          bg: "#fff7ed",
          color: "#c2410c",
          border: "#fed7aa",
          icon: <FaClock />,
        };

      case "LEAVE":
        return {
          text: "LEAVE",
          shortText: "L",
          bg: "#eff6ff",
          color: "#2563eb",
          border: "#bfdbfe",
          icon: <FaUmbrellaBeach />,
        };

      default:
        return {
          text: status || "UNKNOWN",
          shortText: "-",
          bg: "#f1f5f9",
          color: "#475569",
          border: "#e2e8f0",
          icon: <FaCalendarCheck />,
        };
    }
  };

  // =====================================================
  // CURRENT MONTH DATE-WISE
  // =====================================================

  const currentMonthDateWise = useMemo(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const result = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        year,
        month,
        day
      );

      const key = getDateKey(date);

      const item = attendance.find(
        (attendanceItem) =>
          getDateKey(
            getAttendanceDate(attendanceItem)
          ) === key
      );

      result.push({
        date,
        item,
        status: item
          ? getStatus(item)
          : "",
      });
    }

    return result;
  }, [attendance]);

  // =====================================================
  // CURRENT MONTH CALENDAR HELPERS
  // =====================================================

  const currentMonthName = new Date()
    .toLocaleString("en-US", {
      month: "long",
    });

  // =====================================================
  // MONTHLY CALENDAR DATA
  // =====================================================

  const selectedMonthCalendar = useMemo(() => {
    const monthIndex = months.indexOf(
      selectedMonth
    );

    const firstDay = new Date(
      calendarYear,
      monthIndex,
      1
    );

    const daysInMonth = new Date(
      calendarYear,
      monthIndex + 1,
      0
    ).getDate();

    const startingDay = firstDay.getDay();

    const cells = [];

    for (
      let i = 0;
      i < startingDay;
      i++
    ) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        calendarYear,
        monthIndex,
        day
      );

      const key = getDateKey(date);

      const item = attendance.find(
        (attendanceItem) =>
          getDateKey(
            getAttendanceDate(attendanceItem)
          ) === key
      );

      cells.push({
        date,
        day,
        item,
        status: item
          ? getStatus(item)
          : "",
      });
    }

    return cells;
  }, [
    attendance,
    selectedMonth,
    calendarYear,
  ]);

  // =====================================================
  // CHANGE MONTH
  // =====================================================

  const changeCalendarMonth = (direction) => {
    const currentIndex =
      months.indexOf(selectedMonth);

    let newIndex =
      currentIndex + direction;
    let newYear = calendarYear;

    if (newIndex < 0) {
      newIndex = 11;
      newYear--;
    }

    if (newIndex > 11) {
      newIndex = 0;
      newYear++;
    }

    setSelectedMonth(months[newIndex]);
    setCalendarYear(newYear);
  };

  // =====================================================
  // GO TO CURRENT MONTH
  // =====================================================

  const goToCurrentMonth = () => {
    const now = new Date();

    setSelectedMonth(
      now
        .toLocaleString("en-US", {
          month: "long",
        })
        .toUpperCase()
    );

    setCalendarYear(
      now.getFullYear()
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "65vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
        />

        <h6 className="mt-3 text-muted">
          Loading Attendance...
        </h6>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>
        {`
          .student-attendance-page {
            padding-bottom: 25px;
          }

          .attendance-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          .attendance-stat {
            position: relative;
            overflow: hidden;
            border-radius: 18px;
            padding: 18px;
            min-height: 125px;
            border: 1px solid;
            background: #fff;
            transition: .2s ease;
          }

          .attendance-stat:hover {
            transform: translateY(-2px);
          }

          .attendance-stat-icon {
            width: 45px;
            height: 45px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            margin-bottom: 12px;
          }

          .attendance-stat span {
            display: block;
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: .3px;
          }

          .attendance-stat h3 {
            font-size: 23px;
            margin: 3px 0 0;
            font-weight: 800;
          }

          .stat-total {
            border-color: #dbeafe;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f5f9ff
            );
          }

          .stat-total .attendance-stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-total h3 {
            color: #2563eb;
          }

          .stat-present {
            border-color: #bbf7d0;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f0fdf4
            );
          }

          .stat-present .attendance-stat-icon {
            background: #dcfce7;
            color: #15803d;
          }

          .stat-present h3 {
            color: #15803d;
          }

          .stat-absent {
            border-color: #fecdd3;
            background: linear-gradient(
              135deg,
              #ffffff,
              #fff5f6
            );
          }

          .stat-absent .attendance-stat-icon {
            background: #ffe4e6;
            color: #dc2626;
          }

          .stat-absent h3 {
            color: #dc2626;
          }

          .stat-half {
            border-color: #fed7aa;
            background: linear-gradient(
              135deg,
              #ffffff,
              #fffaf5
            );
          }

          .stat-half .attendance-stat-icon {
            background: #ffedd5;
            color: #c2410c;
          }

          .stat-half h3 {
            color: #c2410c;
          }

          .stat-leave {
            border-color: #bfdbfe;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f5f9ff
            );
          }

          .stat-leave .attendance-stat-icon {
            background: #dbeafe;
            color: #2563eb;
          }

          .stat-leave h3 {
            color: #2563eb;
          }

          .percentage-card {
            border: 1px solid #ddd6fe;
            background:
              linear-gradient(
                135deg,
                #ffffff,
                #faf7ff
              );
            border-radius: 18px;
            padding: 18px;
            height: 100%;
          }

          .percentage-circle {
            width: 92px;
            height: 92px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background:
              radial-gradient(
                circle,
                #fff 55%,
                #f3e8ff 56%
              );
            border: 7px solid #ddd6fe;
          }

          .percentage-circle strong {
            font-size: 20px;
            color: #7c3aed;
            font-weight: 800;
          }

          .percentage-circle small {
            font-size: 9px;
            color: #64748b;
            font-weight: 700;
          }

          .attendance-table {
            min-width: 850px;
          }

          .attendance-table thead th {
            background:
              linear-gradient(
                90deg,
                #f8fbff,
                #f2f6fc
              );
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .35px;
            padding: 14px 12px;
            white-space: nowrap;
            border-bottom: 1px solid #e5edf7;
          }

          .attendance-table tbody td {
            padding: 14px 12px;
            font-size: 12px;
            color: #475569;
            border-bottom: 1px solid #f0f3f7;
            white-space: nowrap;
          }

          .attendance-table tbody tr {
            transition: .2s ease;
          }

          .attendance-table tbody tr:hover {
            background: #f8fbff;
          }

          .attendance-date {
            width: 40px;
            height: 40px;
            border-radius: 11px;
            background: #eff6ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 11px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 800;
            border: 1px solid;
          }

          .month-select {
            border: 1px solid #dbeafe;
            background: #f8fbff;
            color: #334155;
            font-size: 12px;
            font-weight: 600;
            border-radius: 10px;
            padding: 8px 12px;
            outline: none;
          }

          .empty-attendance {
            padding: 55px 20px;
          }

          .empty-icon {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: #f1f5f9;
            color: #64748b;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
          }

          /* =====================================================
             DATE WISE CALENDAR
          ===================================================== */

          .date-wise-calendar {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
          }

          .calendar-week-day {
            text-align: center;
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            padding: 8px 3px;
          }

          .date-wise-cell {
            min-height: 92px;
            border: 1px solid #e5edf7;
            border-radius: 12px;
            background: #fff;
            padding: 9px;
            transition: .2s ease;
            position: relative;
          }

          .date-wise-cell:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(15, 23, 42, .06);
          }

          .date-wise-day {
            font-size: 13px;
            font-weight: 800;
            color: #334155;
          }

          .date-wise-weekday {
            font-size: 9px;
            color: #94a3b8;
            margin-top: 2px;
          }

          .date-status {
            margin-top: 9px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border-radius: 20px;
            padding: 4px 7px;
            font-size: 8px;
            font-weight: 800;
            border: 1px solid;
          }

          .no-date-status {
            margin-top: 12px;
            font-size: 9px;
            color: #cbd5e1;
            font-weight: 600;
          }

          .today-calendar {
            border: 2px solid #2563eb !important;
            background: #f8fbff;
          }

          /* =====================================================
             MONTHLY CALENDAR
          ===================================================== */

          .monthly-calendar {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
          }

          .monthly-calendar-heading {
            background: #f8fbff;
            border: 1px solid #e5edf7;
            border-radius: 10px;
            padding: 10px 5px;
            text-align: center;
            font-size: 10px;
            color: #64748b;
            font-weight: 800;
            text-transform: uppercase;
          }

          .monthly-calendar-day {
            min-height: 105px;
            border: 1px solid #e5edf7;
            border-radius: 12px;
            background: #fff;
            padding: 9px;
            transition: .2s ease;
          }

          .monthly-calendar-day:hover {
            box-shadow: 0 5px 15px rgba(15, 23, 42, .06);
            transform: translateY(-2px);
          }

          .monthly-calendar-day.empty {
            background: #f8fafc;
            border-color: transparent;
          }

          .calendar-day-number {
            width: 30px;
            height: 30px;
            border-radius: 9px;
            background: #f1f5f9;
            color: #334155;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
          }

          .calendar-day-status {
            margin-top: 10px;
            border-radius: 9px;
            padding: 6px 5px;
            text-align: center;
            font-size: 8px;
            font-weight: 800;
            border: 1px solid;
          }

          .calendar-no-record {
            margin-top: 12px;
            text-align: center;
            font-size: 8px;
            color: #cbd5e1;
            font-weight: 700;
          }

          .calendar-navigation-btn {
            width: 34px;
            height: 34px;
            border: 1px solid #dbeafe;
            background: #f8fbff;
            color: #2563eb;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .2s ease;
          }

          .calendar-navigation-btn:hover {
            background: #eff6ff;
            transform: translateY(-1px);
          }

          .calendar-month-title {
            min-width: 145px;
            text-align: center;
            font-size: 15px;
            font-weight: 800;
            color: #1e293b;
          }

          .calendar-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .calendar-legend-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            color: #64748b;
            font-weight: 700;
          }

          .calendar-legend-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
          }

          @media (max-width: 768px) {
            .attendance-stat {
              min-height: 115px;
            }

            .percentage-card {
              min-height: 140px;
            }

            .date-wise-calendar,
            .monthly-calendar {
              gap: 5px;
            }

            .date-wise-cell {
              min-height: 75px;
              padding: 6px;
            }

            .monthly-calendar-day {
              min-height: 80px;
              padding: 6px;
            }

            .calendar-day-number {
              width: 25px;
              height: 25px;
            }

            .date-status,
            .calendar-day-status {
              font-size: 7px;
              padding: 4px;
            }

            .calendar-month-title {
              min-width: 110px;
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .date-wise-cell {
              min-height: 65px;
            }

            .monthly-calendar-day {
              min-height: 68px;
            }

            .date-wise-weekday {
              display: none;
            }

            .date-status {
              margin-top: 6px;
            }

            .calendar-day-status {
              margin-top: 6px;
            }

            .calendar-legend-item {
              font-size: 8px;
            }
          }

          @media print {
            .no-print {
              display: none !important;
            }

            body {
              background: #fff !important;
            }

            .card,
            .attendance-stat,
            .percentage-card {
              box-shadow: none !important;
            }

            .attendance-table {
              min-width: 100% !important;
            }

            .attendance-table thead th,
            .attendance-table tbody td {
              font-size: 9px !important;
              padding: 7px !important;
            }
          }
        `}
      </style>

      <div className="student-attendance-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-2 mt-2 mb-3">
          <div className="rounded-4 shadow overflow-hidden attendance-header">

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
                    <FaCalendarCheck size={25} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold">
                      My Attendance
                    </h5>

                    <div className="text-muted small">
                      Attendance / My Attendance
                    </div>
                  </div>

                </div>

                <div className="d-flex align-items-center gap-2 no-print">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <MdOutlineSchool className="me-1" />
                    Student Attendance
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm rounded-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft className="me-1" />
                    Back
                  </button>

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
                Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  My Attendance
                </span>
              </small>
            </div>

          </div>
        </div>

        {/* =====================================================
            STUDENT MINI INFO
        ===================================================== */}

        <div className="px-2 mb-3">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-3">

              <div className="row align-items-center g-3">

                <div className="col-md-6">

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaUserGraduate />
                    </div>

                    <div>

                      <small className="text-muted">
                        Student
                      </small>

                      <h6 className="mb-1 fw-bold">
                        {user?.name ||
                          user?.studentName ||
                          admissionNumber ||
                          "Student"}
                      </h6>

                      <span className="text-muted small">
                        Admission No:{" "}
                        <strong className="text-primary">
                          {admissionNumber || "-"}
                        </strong>
                      </span>

                    </div>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="row g-2">

                    <div className="col-6">

                      <div className="p-2 rounded-3 bg-light">
                        <small className="text-muted d-block">
                          Class
                        </small>

                        <strong>
                          {user?.studentClass ||
                            user?.class ||
                            "-"}
                        </strong>
                      </div>

                    </div>

                    <div className="col-6">

                      <div className="p-2 rounded-3 bg-light">
                        <small className="text-muted d-block">
                          Section
                        </small>

                        <strong>
                          {user?.section || "-"}
                        </strong>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="row g-3 px-2 mb-4">

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-total shadow h-100">

              <div className="attendance-stat-icon">
                <FaCalendarCheck />
              </div>

              <span>Total Days</span>

              <h3>{summary.total}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-present shadow h-100">

              <div className="attendance-stat-icon">
                <FaCheckCircle />
              </div>

              <span>Present</span>

              <h3>{summary.present}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-absent shadow h-100">

              <div className="attendance-stat-icon">
                <FaTimesCircle />
              </div>

              <span>Absent</span>

              <h3>{summary.absent}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-half shadow h-100">

              <div className="attendance-stat-icon">
                <FaClock />
              </div>

              <span>Half Day</span>

              <h3>{summary.halfDay}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-leave shadow h-100">

              <div className="attendance-stat-icon">
                <FaUmbrellaBeach />
              </div>

              <span>Leave</span>

              <h3>{summary.leave}</h3>

            </div>
          </div>

        </div>

        {/* =====================================================
            ATTENDANCE PERCENTAGE
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="percentage-card shadow">

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">

              <div>

                <div className="d-flex align-items-center gap-2 mb-2">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#f3e8ff",
                      color: "#7c3aed",
                    }}
                  >
                    <FaPercentage />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold">
                      Overall Attendance
                    </h6>

                    <small className="text-muted">
                      Present + half day attendance
                    </small>
                  </div>

                </div>

                <h3 className="fw-bold mb-1">
                  {summary.percentage.toFixed(1)}%
                </h3>

                <small className="text-muted">
                  Attendance percentage
                </small>

              </div>

              <div className="percentage-circle">

                <strong>
                  {summary.percentage.toFixed(0)}%
                </strong>

                <small>
                  ATTENDANCE
                </small>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NEW CALENDAR 1
            CURRENT MONTH DATE WISE
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarCheck size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Current Month Attendance
                    </h6>

                    <small className="text-muted">
                      Date-wise attendance for{" "}
                      {currentMonthName}{" "}
                      {currentDate.getFullYear()}
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {currentMonthDateWise.filter(
                    (item) => item.item
                  ).length}{" "}
                  Marked Days
                </span>

              </div>

            </div>

            <div className="card-body p-3 p-md-4">

              {/* WEEK DAYS */}

              <div className="date-wise-calendar mb-1">

                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="calendar-week-day"
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}

              </div>

              {/* DATE CELLS */}

              <div className="date-wise-calendar">

                {(() => {
                  const now = new Date();

                  const firstDay = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1
                  ).getDay();

                  const emptyCells = Array.from(
                    {
                      length: firstDay,
                    },
                    (_, index) => (
                      <div
                        key={`empty-${index}`}
                      />
                    )
                  );

                  const dateCells =
                    currentMonthDateWise.map(
                      (dayItem) => {

                        const {
                          date,
                          item,
                          status,
                        } = dayItem;

                        const config =
                          statusConfig(status);

                        const isToday =
                          getDateKey(date) ===
                          getDateKey(
                            new Date()
                          );

                        return (
                          <div
                            key={getDateKey(
                              date
                            )}
                            className={`date-wise-cell ${
                              isToday
                                ? "today-calendar"
                                : ""
                            }`}
                            style={
                              item
                                ? {
                                    background:
                                      config.bg,
                                    borderColor:
                                      config.border,
                                  }
                                : {}
                            }
                          >

                            <div className="date-wise-day">
                              {date.getDate()}
                            </div>

                            <div className="date-wise-weekday">
                              {date.toLocaleDateString(
                                "en-US",
                                {
                                  weekday:
                                    "long",
                                }
                              )}
                            </div>

                            {item ? (
                              <span
                                className="date-status"
                                style={{
                                  background:
                                    config.bg,
                                  color:
                                    config.color,
                                  borderColor:
                                    config.border,
                                }}
                              >
                                {config.icon}
                                {config.text}
                              </span>
                            ) : (
                              <div className="no-date-status">
                                No Record
                              </div>
                            )}

                          </div>
                        );
                      }
                    );

                  return [
                    ...emptyCells,
                    ...dateCells,
                  ];
                })()}

              </div>

              {/* LEGEND */}

              <div className="calendar-legend mt-3">

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#16a34a",
                    }}
                  />
                  Present
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#dc2626",
                    }}
                  />
                  Absent
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#ea580c",
                    }}
                  />
                  Half Day
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#2563eb",
                    }}
                  />
                  Leave
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#94a3b8",
                    }}
                  />
                  No Record
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NEW CALENDAR 2
            MONTHLY CALENDAR
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#7c3aed,#a78bfa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarAlt size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Monthly Calendar
                    </h6>

                    <small className="text-muted">
                      Complete month-wise attendance calendar
                    </small>

                  </div>

                </div>

                {/* MONTH NAVIGATION */}

                <div className="d-flex align-items-center gap-2 no-print">

                  <button
                    className="calendar-navigation-btn"
                    onClick={() =>
                      changeCalendarMonth(-1)
                    }
                    title="Previous Month"
                  >
                    <FaChevronLeft size={11} />
                  </button>

                  <div className="calendar-month-title">
                    {selectedMonth.charAt(0) +
                      selectedMonth
                        .slice(1)
                        .toLowerCase()}{" "}
                    {calendarYear}
                  </div>

                  <button
                    className="calendar-navigation-btn"
                    onClick={() =>
                      changeCalendarMonth(1)
                    }
                    title="Next Month"
                  >
                    <FaChevronRight size={11} />
                  </button>

                  <button
                    className="btn btn-sm btn-outline-primary rounded-3"
                    onClick={goToCurrentMonth}
                  >
                    Today
                  </button>

                </div>

              </div>

            </div>

            <div className="card-body p-3 p-md-4">

              {/* MONTH SELECT */}

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

                <select
                  className="month-select no-print"
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
                >
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                <div className="calendar-legend">

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#16a34a",
                      }}
                    />
                    Present
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#dc2626",
                      }}
                    />
                    Absent
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#ea580c",
                      }}
                    />
                    Half Day
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#2563eb",
                      }}
                    />
                    Leave
                  </div>

                </div>

              </div>

              {/* CALENDAR HEADER */}

              <div className="monthly-calendar mb-2">

                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="monthly-calendar-heading"
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}

              </div>

              {/* CALENDAR BODY */}

              <div className="monthly-calendar">

                {selectedMonthCalendar.map(
                  (cell, index) => {

                    if (!cell) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="monthly-calendar-day empty"
                        />
                      );
                    }

                    const config =
                      statusConfig(
                        cell.status
                      );

                    const isToday =
                      getDateKey(
                        cell.date
                      ) ===
                      getDateKey(
                        new Date()
                      );

                    return (
                      <div
                        key={getDateKey(
                          cell.date
                        )}
                        className="monthly-calendar-day"
                        style={
                          cell.item
                            ? {
                                background:
                                  config.bg,
                                borderColor:
                                  config.border,
                              }
                            : {}
                        }
                      >

                        <div
                          className="d-flex justify-content-between align-items-center"
                        >

                          <div
                            className="calendar-day-number"
                            style={
                              isToday
                                ? {
                                    background:
                                      "#2563eb",
                                    color:
                                      "#fff",
                                  }
                                : {}
                            }
                          >
                            {cell.day}
                          </div>

                          {isToday && (
                            <span
                              style={{
                                fontSize:
                                  "8px",
                                color:
                                  "#2563eb",
                                fontWeight:
                                  800,
                              }}
                            >
                              TODAY
                            </span>
                          )}

                        </div>

                        {cell.item ? (
                          <div
                            className="calendar-day-status"
                            style={{
                              background:
                                config.bg,
                              color:
                                config.color,
                              borderColor:
                                config.border,
                            }}
                          >
                            {config.text}
                          </div>
                        ) : (
                          <div className="calendar-no-record">
                            No Record
                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            EXISTING MONTHLY ATTENDANCE
        ===================================================== */}

        <div className="px-2">

          <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

            {/* HEADER */}

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarAlt size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Monthly Attendance
                    </h6>

                    <small className="text-muted">
                      Month-wise attendance overview
                    </small>

                  </div>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <select
                    className="month-select no-print"
                    value={selectedMonth}
                    onChange={(e) =>
                      setSelectedMonth(
                        e.target.value
                      )
                    }
                  >
                    {months.map((month) => (
                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    {monthlyAttendance.length} Days
                  </span>

                </div>

              </div>

            </div>

            {/* MONTH SUMMARY */}

            <div className="px-3 px-md-4 pb-3">

              <div className="row g-2">

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Present
                    </small>

                    <strong className="text-success">
                      {monthlySummary.present}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Absent
                    </small>

                    <strong className="text-danger">
                      {monthlySummary.absent}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Half Day
                    </small>

                    <strong
                      style={{
                        color: "#c2410c",
                      }}
                    >
                      {monthlySummary.halfDay}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Percentage
                    </small>

                    <strong className="text-primary">
                      {monthlySummary.percentage.toFixed(
                        1
                      )}
                      %
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* TABLE */}

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table attendance-table align-middle mb-0">

                  <thead>

                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Day
                      </th>

                      <th>
                        Academic Year
                      </th>

                      <th>
                        Class
                      </th>

                      <th>
                        Section
                      </th>

                      <th className="text-center">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {monthlyAttendance.length === 0 ? (

                      <tr>

                        <td colSpan="7">

                          <div className="empty-attendance text-center">

                            <div className="empty-icon mb-3">
                              <FaCalendarCheck size={26} />
                            </div>

                            <h6 className="fw-bold">
                              No Attendance Found
                            </h6>

                            <small className="text-muted">
                              No attendance record available
                              for {selectedMonth}.
                            </small>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      [...monthlyAttendance]
                        .sort(
                          (a, b) =>
                            new Date(
                              getAttendanceDate(b)
                            ) -
                            new Date(
                              getAttendanceDate(a)
                            )
                        )
                        .map((item, index) => {

                          const date =
                            getAttendanceDate(item);

                          const parsedDate =
                            date
                              ? new Date(date)
                              : null;

                          const status =
                            getStatus(item);

                          const config =
                            statusConfig(status);

                          return (
                            <tr
                              key={
                                item.id ||
                                `${date}-${index}`
                              }
                            >

                              <td className="text-center fw-semibold text-muted">
                                {index + 1}
                              </td>

                              <td>

                                <div className="d-flex align-items-center gap-2">

                                  <div className="attendance-date">
                                    <FaCalendarAlt />
                                  </div>

                                  <strong className="text-dark">
                                    {formatDate(date)}
                                  </strong>

                                </div>

                              </td>

                              <td className="text-muted">

                                {parsedDate
                                  ? parsedDate.toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday:
                                          "long",
                                      }
                                    )
                                  : "-"}

                              </td>

                              <td>
                                {item.academicYear ||
                                  "-"}
                              </td>

                              <td>
                                {item.studentClass ||
                                  "-"}
                              </td>

                              <td>
                                {item.section || "-"}
                              </td>

                              <td className="text-center">

                                <span
                                  className="status-pill"
                                  style={{
                                    background:
                                      config.bg,
                                    color:
                                      config.color,
                                    borderColor:
                                      config.border,
                                  }}
                                >
                                  {config.icon}
                                  {config.text}
                                </span>

                              </td>

                            </tr>
                          );
                        })

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentAttendance;

