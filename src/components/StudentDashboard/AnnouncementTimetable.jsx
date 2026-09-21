


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBullhorn,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaBookOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";

import axios from "../../api/axiosInstance";
import { useStudent } from "../../context/StudentProfileContext";

// =========================================================
// DAYS
// =========================================================

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// =========================================================
// DAY LABEL
// =========================================================

const dayLabel = (day) => {
  if (!day) return "";

  return (
    day.charAt(0) +
    day.slice(1).toLowerCase()
  );
};

// =========================================================
// TODAY
// =========================================================

const getTodayDay = () => {
  const dayIndex = new Date().getDay();

  const dayMap = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const today = dayMap[dayIndex];

  return DAYS.includes(today)
    ? today
    : "MONDAY";
};

// =========================================================
// FORMAT TIME
// =========================================================

const formatTime = (time) => {
  if (!time) return "-";

  const [hour, minute] = String(time)
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return time;
  }

  const date = new Date();

  date.setHours(
    hour,
    minute,
    0,
    0
  );

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// =========================================================
// FORMAT DATE
// =========================================================

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// =========================================================
// NOTICE CATEGORY LABEL
// =========================================================

const getNoticeCategoryLabel = (category) => {
  const categoryMap = {
    GENERAL: "General",
    FEE_REMINDER: "Fee Reminder",
    PTM: "PTM",
    HOLIDAY: "Holiday",
    EXAM: "Exam",
    EVENT: "Event",
    MEETING: "Meeting",
    ATTENDANCE: "Attendance",
  };

  return (
    categoryMap[category] ||
    "Notice"
  );
};

// =========================================================
// NOTICE BADGE CLASS
// =========================================================

const getNoticeBadgeClass = (category) => {
  switch (category) {
    case "HOLIDAY":
      return "badge-orange";

    case "FEE_REMINDER":
    case "ATTENDANCE":
      return "badge-warning";

    case "EXAM":
    case "PTM":
      return "badge-blue";

    case "EVENT":
    case "MEETING":
      return "badge-green";

    default:
      return "badge-blue";
  }
};

// =========================================================
// MAIN COMPONENT
// =========================================================

const AnnouncementTimetable = () => {
  const {
    student,
    loading: studentLoading,
    academicYear,
  } = useStudent();

  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedDay, setSelectedDay] =
    useState(getTodayDay());

  // =======================================================
  // NOTICES
  // =======================================================

  const [notices, setNotices] =
    useState([]);

  const [noticeLoading, setNoticeLoading] =
    useState(false);

  const [noticeError, setNoticeError] =
    useState("");

  // =======================================================
  // SCHOOL ID
  // =======================================================

  const storedSchoolId =
    localStorage.getItem("schoolId");

  const schoolId =
    student?.schoolId ||
    storedSchoolId;

  const studentClass =
    student?.studentClass;

  const section =
    student?.section;

  // =======================================================
  // LOAD STUDENT NOTICES
  // =======================================================

  const loadNotices = async () => {
    if (!schoolId) {
      setNotices([]);
      return;
    }

    try {
      setNoticeLoading(true);
      setNoticeError("");

      /*
       * STUDENT DASHBOARD
       *
       * Backend endpoint:
       *
       * GET /api/notices/dashboard
       *
       * audience = STUDENT
       *
       * Backend will return:
       * 1. EVERYONE notices
       * 2. STUDENT notices
       * 3. Only PUBLISHED notices
       * 4. Only currently active notices
       */
      console.log("schoolId",schoolId);
      const response =
        await axios.get(
          "/api/notices/dashboard",
          {
            params: {
              schoolId,
              audience: "STUDENT",
            },
          }
        );
console.log("NOTICE API RESPONSE:", response?.data);
      const list =
        Array.isArray(response.data)
          ? response.data
          : [];

      setNotices(list);

    } catch (err) {
      console.error(
        "Student Notice API Error:",
        err
      );

      console.error(
        "Response:",
        err?.response?.data
      );

      setNoticeError(
        err?.response?.data?.message ||
        "Unable to load announcements"
      );

      setNotices([]);

    } finally {
      setNoticeLoading(false);
    }
  };
  

  // =======================================================
  // LOAD TIMETABLE
  // =======================================================

  const loadTimetable = async () => {
    if (
      !schoolId ||
      !studentClass ||
      !section ||
      !academicYear
    ) {
      setAssignments([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const allAssignments = [];

      // ---------------------------------------------------
      // API CALL FOR EACH DAY
      // ---------------------------------------------------

      for (const day of DAYS) {
        const response =
          await axios.get(
            "/api/teacher-class-assignment/day",
            {
              params: {
                schoolId,
                academicYear,
                dayOfWeek: day,
              },
            }
          );

        if (
          Array.isArray(
            response.data
          )
        ) {
          allAssignments.push(
            ...response.data
          );
        }
      }

      // ---------------------------------------------------
      // FILTER STUDENT CLASS + SECTION
      // ---------------------------------------------------

      const currentClass =
        String(
          studentClass || ""
        )
          .trim()
          .toUpperCase();

      const currentSection =
        String(
          section || ""
        )
          .trim()
          .toUpperCase();

      const studentTimetable =
        allAssignments.filter(
          (item) => {
            const itemClass =
              String(
                item.studentClass || ""
              )
                .trim()
                .toUpperCase();

            const itemSection =
              String(
                item.section || ""
              )
                .trim()
                .toUpperCase();

            return (
              itemClass ===
                currentClass &&
              itemSection ===
                currentSection &&
              item.active === true
            );
          }
        );

      // ---------------------------------------------------
      // SORT BY START TIME
      // ---------------------------------------------------

      studentTimetable.sort(
        (a, b) =>
          String(
            a.startTime || ""
          ).localeCompare(
            String(
              b.startTime || ""
            )
          )
      );

      setAssignments(
        studentTimetable
      );

    } catch (err) {
      console.error(
        "Timetable API Error:",
        err
      );

      console.error(
        "Response:",
        err?.response?.data
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load timetable"
      );

      setAssignments([]);

    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // EFFECT - STUDENT NOTICES
  // =======================================================

  useEffect(() => {
    if (
      !studentLoading &&
      student &&
      schoolId
    ) {
      loadNotices();
    }
  }, [
    studentLoading,
    student,
    schoolId,
  ]);

  // =======================================================
  // EFFECT - TIMETABLE
  // =======================================================

  useEffect(() => {
    if (
      !studentLoading &&
      student
    ) {
      loadTimetable();
    }
  }, [
    studentLoading,
    student?.studentClass,
    student?.section,
    academicYear,
    student?.schoolId,
  ]);

  // =======================================================
  // GROUP BY DAY
  // =======================================================

  const groupedTimetable =
    useMemo(() => {
      const grouped = {};

      DAYS.forEach((day) => {
        grouped[day] = [];
      });

      assignments.forEach(
        (item) => {
          const day =
            String(
              item.dayOfWeek || ""
            )
              .trim()
              .toUpperCase();

          if (!grouped[day]) {
            grouped[day] = [];
          }

          grouped[day].push(item);
        }
      );

      Object.keys(grouped).forEach(
        (day) => {
          grouped[day].sort(
            (a, b) =>
              String(
                a.startTime || ""
              ).localeCompare(
                String(
                  b.startTime || ""
                )
              )
          );
        }
      );

      return grouped;
    }, [assignments]);

  // =======================================================
  // SELECTED DAY DATA
  // =======================================================

  const todayPeriods =
    groupedTimetable[
      selectedDay
    ] || [];

  // =======================================================
  // LOADING STUDENT
  // =======================================================

  if (studentLoading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
        />

        <div className="mt-2 text-secondary">
          Loading timetable...
        </div>
      </div>
    );
  }

  // =======================================================
  // NO STUDENT
  // =======================================================

  if (!student) {
    return (
      <div className="container-fluid px-0 mt-3 mb-4">
        <div
          className="alert rounded-4"
          style={{
            background: "#fff7ed",
            color: "#c2410c",
            border:
              "1px solid #fed7aa",
          }}
        >
          Student details could not
          be loaded.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid px-0 mt-3 mb-4">

        <div className="row g-3">

          {/* =================================================
              ANNOUNCEMENTS
          ================================================= */}

          <div className="col-12 col-lg-6">

            <div className="premium-panel-card shadow h-100">

              {/* HEADER */}

              <div className="premium-panel-header">

                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-blue">
                    <FaBullhorn />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold text-dark">
                      Announcements
                    </h6>

                    <small className="text-muted">
                      Latest school updates
                    </small>

                  </div>

                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary rounded-3 px-3"
                  onClick={loadNotices}
                  disabled={noticeLoading}
                >
                  {noticeLoading
                    ? "Loading..."
                    : "Refresh"}

                  <FaArrowRight
                    className="ms-2"
                    size={10}
                  />
                </button>

              </div>

              {/* BODY */}

              <div className="premium-panel-body">

                {noticeError && (
                  <div
                    className="alert rounded-3 mb-2"
                    style={{
                      background: "#fff1f2",
                      color: "#be123c",
                      border:
                        "1px solid #fecdd3",
                      fontSize: "12px",
                    }}
                  >
                    {noticeError}
                  </div>
                )}

                {noticeLoading ? (

                  <div className="text-center py-5">

                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    />

                    <div className="small text-muted mt-2">
                      Loading announcements...
                    </div>

                  </div>

                ) : notices.length === 0 ? (

                  <div className="text-center py-5">

                    <div
                      className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: 48,
                        height: 48,
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaBullhorn size={19} />
                    </div>

                    <div
                      className="fw-semibold"
                      style={{
                        color: "#334155",
                      }}
                    >
                      No announcements
                    </div>

                    <div className="small text-muted mt-1">
                      There are no current announcements.
                    </div>

                  </div>

                ) : (

                  notices
                    .slice(0, 3)
                    .map((notice) => (

                      <div
                        className="announcement-item"
                        key={notice.id}
                      >

                        <div className="announcement-content">

                          <div className="announcement-title-row">

                            <h6 className="fw-semibold mb-1">
                              {notice.title}
                            </h6>

                            <span
                              className={`premium-badge ${getNoticeBadgeClass(
                                notice.category
                              )}`}
                            >
                              {getNoticeCategoryLabel(
                                notice.category
                              )}
                            </span>

                          </div>

                          <p className="text-muted small mb-2">
                            {notice.description ||
                              "No description available."}
                          </p>

                          <div className="announcement-date">

                            <FaCalendarAlt
                              size={11}
                            />

                            <span>
                              {formatDate(
                                notice.startDate
                              )}
                            </span>

                            {notice.endDate && (
                              <>
                                <span>
                                  -
                                </span>

                                <span>
                                  {formatDate(
                                    notice.endDate
                                  )}
                                </span>
                              </>
                            )}

                          </div>

                        </div>

                      </div>

                    ))

                )}

              </div>

              {/* FOOTER */}

              <div className="premium-panel-footer">

                <small className="text-muted">

                  Showing{" "}

                  <strong className="text-primary">
                    {Math.min(
                      notices.length,
                      3
                    )}
                  </strong>{" "}

                  latest announcements

                </small>

                <FaArrowRight
                  size={12}
                  className="text-primary"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              TODAY'S TIMETABLE
          ================================================= */}

          <div className="col-12 col-lg-6">

            <div className="premium-panel-card shadow h-100">

              {/* HEADER */}

              <div className="premium-panel-header">

                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-green">
                    <FaClock />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold text-dark">
                      Class Timetable
                    </h6>

                    <small className="text-muted">
                      Class {studentClass} - Section {section}
                    </small>

                  </div>

                </div>

                {/* DAY FILTER */}

                <div className="d-flex align-items-center gap-2">

                  <select
                    value={selectedDay}
                    onChange={(e) =>
                      setSelectedDay(
                        e.target.value
                      )
                    }
                    className="form-select form-select-sm rounded-3 timetable-day-select"
                  >

                    {DAYS.map(
                      (day) => (
                        <option
                          key={day}
                          value={day}
                        >
                          {dayLabel(day)}
                        </option>
                      )
                    )}

                  </select>

                  <button
                    type="button"
                    onClick={loadTimetable}
                    disabled={loading}
                    className="btn btn-sm btn-outline-primary rounded-3 px-3"
                  >
                    {loading
                      ? "Loading..."
                      : "Refresh"}
                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="mx-3 mt-3 alert rounded-3 mb-0"
                  style={{
                    background: "#fff1f2",
                    color: "#be123c",
                    border:
                      "1px solid #fecdd3",
                    fontSize: "12px",
                  }}
                >
                  {error}
                </div>
              )}

              {/* STUDENT INFO */}

              <div className="px-3 pt-3">

                <div
                  className="d-flex flex-wrap align-items-center gap-2 p-2 rounded-3"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #e5efff",
                  }}
                >

                  <span className="small text-muted">
                    Academic Year:
                  </span>

                  <span
                    className="fw-semibold small"
                    style={{
                      color: "#1e3a8a",
                    }}
                  >
                    {academicYear}
                  </span>

                  <span className="text-muted">
                    |
                  </span>

                  <span className="small text-muted">
                    {dayLabel(selectedDay)}
                  </span>

                  <span
                    className="badge rounded-pill"
                    style={{
                      background:
                        "#eaf8f0",
                      color:
                        "#198754",
                      border:
                        "1px solid #d7f0e1",
                    }}
                  >
                    {todayPeriods.length}{" "}
                    {todayPeriods.length ===
                    1
                      ? "Period"
                      : "Periods"}
                  </span>

                </div>

              </div>

              {/* TABLE */}

              <div className="premium-panel-body p-0 mt-2">

                <div
                  className="table-responsive"
                  style={{
                    maxHeight: "320px",
                    overflowY: "auto",
                  }}
                >

                  <table className="table premium-dashboard-table align-middle mb-0">

                    <thead>

                      <tr>

                        <th className="text-center">
                          PERIOD
                        </th>

                        <th>
                          TIME
                        </th>

                        <th>
                          SUBJECT
                        </th>

                        <th>
                          ROOM
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {loading ? (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center py-5"
                          >

                            <div
                              className="spinner-border spinner-border-sm text-primary"
                              role="status"
                            />

                            <div className="small text-muted mt-2">
                              Loading timetable...
                            </div>

                          </td>

                        </tr>

                      ) : todayPeriods.length === 0 ? (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center py-5"
                          >

                            <div
                              className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: 48,
                                height: 48,
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                              }}
                            >
                              <FaClock size={20} />
                            </div>

                            <div
                              className="fw-semibold"
                              style={{
                                color:
                                  "#334155",
                              }}
                            >
                              No class scheduled
                            </div>

                            <div className="small text-muted mt-1">
                              No timetable is available for{" "}
                              {dayLabel(selectedDay)}.
                            </div>

                          </td>

                        </tr>

                      ) : (

                        todayPeriods.map(
                          (item, index) => (

                            <tr
                              key={
                                item.id ??
                                `${selectedDay}-${index}`
                              }
                            >

                              {/* PERIOD */}

                              <td className="text-center">

                                <span className="period-number">
                                  {index + 1}
                                </span>

                                {item.periodName && (
                                  <div
                                    className="small mt-1"
                                    style={{
                                      color:
                                        "#64748b",
                                      fontSize:
                                        "9px",
                                    }}
                                  >
                                    {item.periodName}
                                  </div>
                                )}

                              </td>

                              {/* TIME */}

                              <td>

                                <div className="d-flex align-items-center gap-2">

                                  <span className="time-icon">
                                    <FaClock
                                      size={10}
                                    />
                                  </span>

                                  <span className="time-text">

                                    {formatTime(
                                      item.startTime
                                    )}

                                    {" - "}

                                    {formatTime(
                                      item.endTime
                                    )}

                                  </span>

                                </div>

                              </td>

                              {/* SUBJECT */}

                              <td>

                                <div className="subject-wrapper">

                                  <span className="subject-icon">

                                    <FaBookOpen
                                      size={11}
                                    />

                                  </span>

                                  <span className="fw-semibold">

                                    {item.subject ||
                                      "-"}

                                  </span>

                                </div>

                              </td>

                              {/* ROOM */}

                              <td>

                                {item.room ? (

                                  <div className="d-flex align-items-center gap-2">

                                    <span className="room-icon">

                                      <FaMapMarkerAlt
                                        size={10}
                                      />

                                    </span>

                                    <span className="room-text">
                                      {item.room}
                                    </span>

                                  </div>

                                ) : (

                                  <span className="text-muted">
                                    —
                                  </span>

                                )}

                              </td>

                            </tr>

                          )
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* FOOTER */}

              <div className="premium-panel-footer">

                <small className="text-muted">

                  <strong className="text-primary">
                    {todayPeriods.length}
                  </strong>{" "}

                  {todayPeriods.length ===
                  1
                    ? "period"
                    : "periods"}{" "}
                  scheduled{" "}
                  {dayLabel(selectedDay)}

                </small>

                <div className="d-flex align-items-center gap-2">

                  <span className="live-dot"></span>

                  <small className="text-success fw-semibold">
                    Class Schedule
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`

        .premium-panel-card {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #edf0f5;
          border-radius: 16px;
          box-shadow: 0 5px 18px rgba(0,0,0,.05);
          transition: all .25s ease;
        }

        .premium-panel-card:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,.08);
        }

        .premium-panel-header {
          min-height: 76px;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid #edf0f5;
          background: #ffffff;
        }

        .premium-panel-body {
          padding: 16px 18px;
        }

        .premium-panel-footer {
          min-height: 48px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-top: 1px solid #edf0f5;
          background: #ffffff;
        }

        .panel-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
        }

        .panel-blue {
          background: #eaf2ff;
          color: #0d6efd;
        }

        .panel-green {
          background: #eaf8f0;
          color: #198754;
        }

        /* ================= ANNOUNCEMENT ================= */

        .announcement-item {
          position: relative;
          padding: 13px 0;
          border-bottom: 1px solid #f0f2f5;
        }

        .announcement-item:first-child {
          padding-top: 2px;
        }

        .announcement-item:last-child {
          border-bottom: 0;
          padding-bottom: 2px;
        }

        .announcement-content {
          width: 100%;
        }

        .announcement-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .announcement-title-row h6 {
          font-size: 13px;
          color: #212529;
        }

        .announcement-content p {
          font-size: 12px;
          line-height: 1.5;
        }

        .announcement-date {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8b9299;
          font-size: 11px;
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: 50px;
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
        }

        .badge-blue {
          color: #0d6efd;
          background: #eaf2ff;
          border: 1px solid #d9e8ff;
        }

        .badge-orange {
          color: #b77900;
          background: #fff8df;
          border: 1px solid #ffedb0;
        }

        .badge-warning {
          color: #b77900;
          background: #fff8df;
          border: 1px solid #ffedb0;
        }

        .badge-green {
          color: #198754;
          background: #eaf8f0;
          border: 1px solid #d7f0e1;
        }

        /* ================= TIMETABLE ================= */

        .timetable-day-select {
          min-width: 125px;
          height: 34px;
          border: 1px solid #dbe7f5;
          color: #1e3a8a;
          font-size: 11px;
          font-weight: 600;
          background-color: #ffffff;
          cursor: pointer;
        }

        .timetable-day-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 .15rem rgba(13,110,253,.10);
        }

        .premium-dashboard-table {
          min-width: 600px;
          font-size: 12px;
        }

        .premium-dashboard-table thead th {
          padding: 12px 10px;
          background: #f8f9fb;
          color: #6c757d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .4px;
          border-bottom: 1px solid #e9ecef;
          border-top: 0;
          white-space: nowrap;
        }

        .premium-dashboard-table tbody td {
          padding: 12px 10px;
          border-bottom: 1px solid #f0f2f5;
          color: #495057;
          white-space: nowrap;
        }

        .premium-dashboard-table tbody tr {
          transition: all .18s ease;
        }

        .premium-dashboard-table tbody tr:hover {
          background: #fbfdff;
        }

        .premium-dashboard-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .period-number {
          width: 27px;
          height: 27px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #eaf2ff;
          color: #0d6efd;
          font-size: 11px;
          font-weight: 700;
        }

        .time-icon {
          width: 25px;
          height: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #f0fdf4;
          color: #198754;
        }

        .time-text {
          color: #6c757d;
          font-size: 11px;
          font-weight: 500;
        }

        .subject-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .subject-icon {
          width: 27px;
          height: 27px;
          min-width: 27px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #eaf2ff;
          color: #0d6efd;
        }

        .room-icon {
          width: 25px;
          height: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #fff7ed;
          color: #ea580c;
        }

        .room-text {
          color: #6c757d;
          font-size: 11px;
          font-weight: 600;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #198754;
          display: inline-block;
          box-shadow: 0 0 0 4px rgba(25,135,84,.10);
        }

        .btn {
          font-size: 12px;
          font-weight: 500;
        }

        @media (max-width: 768px) {

          .premium-panel-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .premium-panel-header > .d-flex:last-child {
            width: 100%;
            justify-content: space-between;
          }

          .timetable-day-select {
            flex: 1;
          }

        }

        @media (max-width: 576px) {

          .premium-panel-header > button {
            align-self: flex-end;
          }

          .premium-panel-header > .d-flex:last-child {
            flex-direction: column;
            align-items: stretch !important;
          }

          .timetable-day-select {
            width: 100%;
          }

        }

        `}
      </style>
    </>
  );
};

export default AnnouncementTimetable;