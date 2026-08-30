
import React, { useMemo, useState } from "react";
import {
  LuCalendarDays,
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuClock3,
  LuCircleCheck,
  LuBriefcaseBusiness,
  LuSchool,
} from "react-icons/lu";

const LeaveYearCalendar = () => {
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /*
   * Example leave / holiday data.
   * Later this can be loaded from:
   * GET /api/leave/calendar?schoolId=...&academicYear=...
   */
  const leaveData = {
    "2026-01-26": {
      title: "Republic Day",
      type: "HOLIDAY",
    },
    "2026-03-04": {
      title: "Holi",
      type: "HOLIDAY",
    },
    "2026-04-14": {
      title: "Ambedkar Jayanti",
      type: "HOLIDAY",
    },
    "2026-05-01": {
      title: "Labour Day",
      type: "HOLIDAY",
    },
    "2026-08-15": {
      title: "Independence Day",
      type: "HOLIDAY",
    },
    "2026-08-28": {
      title: "School Holiday",
      type: "HOLIDAY",
    },
    "2026-10-02": {
      title: "Gandhi Jayanti",
      type: "HOLIDAY",
    },
    "2026-10-20": {
      title: "Dussehra",
      type: "HOLIDAY",
    },
    "2026-11-09": {
      title: "Diwali Holiday",
      type: "HOLIDAY",
    },
    "2026-11-10": {
      title: "Diwali Holiday",
      type: "HOLIDAY",
    },
    "2026-12-25": {
      title: "Christmas",
      type: "HOLIDAY",
    },
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const year = Number(academicYear.split("-")[0]);

    const days = [];
    const totalDays = getDaysInMonth(year, selectedMonth);
    const firstDay = getFirstDay(year, selectedMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return {
      year,
      days,
    };
  }, [academicYear, selectedMonth]);

  const getDateKey = (day) => {
    if (!day) return "";

    const month = String(selectedMonth + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${calendarDays.year}-${month}-${date}`;
  };

  const isSunday = (day) => {
    if (!day) return false;

    const date = new Date(
      calendarDays.year,
      selectedMonth,
      day
    );

    return date.getDay() === 0;
  };

  const monthHolidayCount = calendarDays.days.filter((day) => {
    if (!day) return false;

    return !!leaveData[getDateKey(day)];
  }).length;

  const workingDays = calendarDays.days.filter((day) => {
    if (!day) return false;

    const holiday = leaveData[getDateKey(day)];

    return !isSunday(day) && !holiday;
  }).length;

  const goPreviousMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) return 11;
      return prev - 1;
    });
  };

  const goNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) return 0;
      return prev + 1;
    });
  };

  const today = new Date();

  const isToday = (day) => {
    if (!day) return false;

    return (
      today.getFullYear() === calendarDays.year &&
      today.getMonth() === selectedMonth &&
      today.getDate() === day
    );
  };

  return (
    <div className="mx-2 mt-2 mb-4">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="rounded-4 shadow overflow-hidden mb-3"
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
                  width: "54px",
                  height: "54px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(37,99,235,.22)",
                  flexShrink: 0,
                }}
              >
                <LuCalendarDays size={28} />
              </div>

              <div>
                <h5 className="mb-1 fw-bold text-dark">
                  Leave Year Calendar
                </h5>

                <div className="text-muted small">
                  Leave Management&nbsp; / &nbsp;Year Calendar
                </div>
              </div>

            </div>

            <button
              type="button"
              className="btn d-flex align-items-center gap-2 text-white"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                border: "none",
                borderRadius: "10px",
                padding: "9px 16px",
                boxShadow:
                  "0 5px 14px rgba(37,99,235,.18)",
              }}
            >
              <LuPlus size={17} />
              Add Holiday
            </button>

          </div>
        </div>

        {/* BREADCRUMB */}

        <div
          className="px-4 py-2"
          style={{
            backgroundColor: "rgba(239,246,255,.75)",
            borderTop: "1px solid #e0ecff",
          }}
        >
          <small className="text-muted">
            Home&nbsp; › &nbsp;Leave Management&nbsp; › &nbsp;
            <span className="text-primary fw-semibold">
              Year Calendar
            </span>
          </small>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div
        className="bg-white rounded-4 shadow p-3 p-md-4"
        style={{
          border: "1px solid #edf2f7",
        }}
      >

        {/* TOP FILTER */}

        <div className="row g-3 align-items-end mb-4">

          <div className="col-xl-4 col-md-6">

            <label className="form-label fw-semibold text-dark">
              Academic Year
            </label>

            <select
              className="form-select"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                setSelectedMonth(0);
              }}
              style={{
                borderRadius: "10px",
                border: "1px solid #dbe3ef",
                minHeight: "43px",
              }}
            >
              <option value="2025-2026">
                2025-2026
              </option>

              <option value="2026-2027">
                2026-2027
              </option>

              <option value="2027-2028">
                2027-2028
              </option>
            </select>

          </div>

          <div className="col-xl-8 col-md-6">

            <div className="d-flex justify-content-md-end">

              <div
                className="d-flex align-items-center gap-2 p-1 rounded-3"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >

                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={goPreviousMonth}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <LuChevronLeft size={18} />
                </button>

                <div
                  className="px-3 fw-bold text-dark"
                  style={{
                    minWidth: "125px",
                    textAlign: "center",
                  }}
                >
                  {months[selectedMonth]}
                </div>

                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={goNextMonth}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <LuChevronRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="row g-3 mb-4">

          {/* WORKING DAYS */}

          <div className="col-xl-4 col-md-6">

            <div
              className="rounded-4 p-3 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#eff6ff,#dbeafe)",
                border: "1px solid #bfdbfe",
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    Working Days
                  </small>

                  <h3
                    className="fw-bold mb-0 mt-1"
                    style={{ color: "#1d4ed8" }}
                  >
                    {workingDays}
                  </h3>

                  <small className="text-muted">
                    This month
                  </small>
                </div>

                <div
                  className="rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                >
                  <LuBriefcaseBusiness size={23} />
                </div>

              </div>

            </div>

          </div>

          {/* HOLIDAYS */}

          <div className="col-xl-4 col-md-6">

            <div
              className="rounded-4 p-3 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#fff7ed,#ffedd5)",
                border: "1px solid #fed7aa",
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    Holidays / Leave
                  </small>

                  <h3
                    className="fw-bold mb-0 mt-1"
                    style={{ color: "#c2410c" }}
                  >
                    {monthHolidayCount}
                  </h3>

                  <small className="text-muted">
                    This month
                  </small>
                </div>

                <div
                  className="rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#fff",
                    color: "#ea580c",
                  }}
                >
                  <LuClock3 size={23} />
                </div>

              </div>

            </div>

          </div>

          {/* ACADEMIC YEAR */}

          <div className="col-xl-4 col-md-12">

            <div
              className="rounded-4 p-3 h-100"
              style={{
                background:
                  "linear-gradient(135deg,#ecfdf5,#d1fae5)",
                border: "1px solid #a7f3d0",
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    Academic Year
                  </small>

                  <h4
                    className="fw-bold mb-0 mt-2"
                    style={{ color: "#047857" }}
                  >
                    {academicYear}
                  </h4>

                  <small className="text-muted">
                    Current calendar
                  </small>
                </div>

                <div
                  className="rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#fff",
                    color: "#059669",
                  }}
                >
                  <LuSchool size={23} />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            LEGEND
        ===================================================== */}

        <div className="d-flex flex-wrap gap-3 mb-3">

          <div className="d-flex align-items-center gap-2 small text-muted">
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#2563eb",
              }}
            />
            Today
          </div>

          <div className="d-flex align-items-center gap-2 small text-muted">
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#f97316",
              }}
            />
            Holiday / Leave
          </div>

          <div className="d-flex align-items-center gap-2 small text-muted">
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#94a3b8",
              }}
            />
            Sunday
          </div>

        </div>

        {/* =====================================================
            CALENDAR
        ===================================================== */}

        <div
          className="rounded-4 overflow-hidden"
          style={{
            border: "1px solid #e2e8f0",
          }}
        >

          {/* MONTH HEADER */}

          <div
            className="p-3 d-flex justify-content-between align-items-center"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#eef5ff)",
              borderBottom: "1px solid #dbeafe",
            }}
          >

            <div>
              <h5
                className="fw-bold mb-1"
                style={{ color: "#1e3a8a" }}
              >
                {months[selectedMonth]} {calendarDays.year}
              </h5>

              <small className="text-muted">
                Leave and working day calendar
              </small>
            </div>

            <div
              className="badge rounded-pill px-3 py-2"
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
              }}
            >
              {calendarDays.days.filter(Boolean).length} Days
            </div>

          </div>

          <div className="p-2 p-md-3">

            {/* WEEK DAYS */}

            <div className="row g-1 mb-1">

              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <div
                  key={day}
                  className="col"
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    className="text-center fw-bold py-2 rounded-2"
                    style={{
                      background:
                        index === 0
                          ? "#fff7ed"
                          : "#f8fafc",
                      color:
                        index === 0
                          ? "#c2410c"
                          : "#475569",
                      fontSize: "12px",
                    }}
                  >
                    <span className="d-none d-md-inline">
                      {day}
                    </span>

                    <span className="d-md-none">
                      {day.substring(0, 3)}
                    </span>
                  </div>
                </div>
              ))}

            </div>

            {/* CALENDAR DAYS */}

            <div className="row g-1">

              {calendarDays.days.map((day, index) => {

                const dateKey = getDateKey(day);
                const leave = day
                  ? leaveData[dateKey]
                  : null;

                const sunday = isSunday(day);
                const todayDate = isToday(day);

                return (
                  <div
                    className="col"
                    key={`${dateKey}-${index}`}
                    style={{
                      flex: "0 0 14.2857%",
                      maxWidth: "14.2857%",
                    }}
                  >

                    <div
                      className="position-relative"
                      style={{
                        minHeight: "100px",
                        borderRadius: "10px",
                        border: todayDate
                          ? "2px solid #2563eb"
                          : leave
                          ? "1px solid #fed7aa"
                          : "1px solid #edf2f7",
                        background: !day
                          ? "#fafafa"
                          : leave
                          ? "#fff7ed"
                          : sunday
                          ? "#f8fafc"
                          : "#fff",
                        padding: "9px",
                        transition:
                          "all .2s ease",
                      }}
                    >

                      {day && (
                        <>

                          {/* DATE */}

                          <div
                            className="d-flex justify-content-between align-items-start"
                          >

                            <span
                              className="fw-bold"
                              style={{
                                fontSize: "14px",
                                color: todayDate
                                  ? "#2563eb"
                                  : sunday
                                  ? "#94a3b8"
                                  : "#334155",
                              }}
                            >
                              {day}
                            </span>

                            {todayDate && (
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#2563eb",
                                  color: "#fff",
                                  fontSize: "9px",
                                }}
                              >
                                TODAY
                              </span>
                            )}

                          </div>

                          {/* LEAVE */}

                          {leave && (
                            <div className="mt-3">

                              <div
                                className="d-flex align-items-center gap-1"
                                style={{
                                  color: "#c2410c",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                }}
                              >
                                <LuCircleCheck size={13} />

                                {leave.title}
                              </div>

                              <span
                                className="badge rounded-pill mt-1"
                                style={{
                                  background:
                                    "#ffedd5",
                                  color: "#c2410c",
                                  fontSize: "9px",
                                  border:
                                    "1px solid #fed7aa",
                                }}
                              >
                                HOLIDAY
                              </span>

                            </div>
                          )}

                          {/* SUNDAY */}

                          {sunday && !leave && (
                            <div
                              className="mt-3"
                              style={{
                                fontSize: "11px",
                                color: "#94a3b8",
                                fontWeight: 600,
                              }}
                            >
                              Weekly Off
                            </div>
                          )}

                        </>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LeaveYearCalendar;

