import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  LuCalendarDays,
  LuClock3,
  LuBookOpen,
  LuSchool,
  LuMapPin,
  LuRefreshCw,
  LuUserRound,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import useMasters from "../../hooks/useMasters";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const TimeTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [teacher, setTeacher] = useState(null);

  const [schoolId, setSchoolId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [academicYear, setAcademicYear] = useState();

  const { sessions } = useMasters();

  const [selectedDay, setSelectedDay] = useState(() => {
    const day = new Date().getDay();

    const map = {
      0: "SUNDAY",
      1: "MONDAY",
      2: "TUESDAY",
      3: "WEDNESDAY",
      4: "THURSDAY",
      5: "FRIDAY",
      6: "SATURDAY",
    };

    return map[day];
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // GET SCHOOL + TEACHER ID
  // --------------------------------------------------

  useEffect(() => {
    const schoolId = localStorage.getItem("schoolId");
    const user = JSON.parse(localStorage.getItem("user"));

    const teacherId = user?.teacherId;

    if (schoolId) {
      setSchoolId(schoolId);
    }

    if (teacherId) {
      setTeacherId(teacherId);
    }
  }, []);

  // --------------------------------------------------
  // LOAD TEACHER
  // --------------------------------------------------

  useEffect(() => {
    if (!schoolId || !teacherId) return;

    const loadTeacher = async () => {
      try {
        setTeacherLoading(true);

        const response = await axiosInstance.get(
          `/api/teachers/id/${Number(teacherId)}`,
          {
            params: {
              schoolId: Number(schoolId),
            },
          },
        );

        setTeacher(response.data);
      } catch (err) {
        console.error("Teacher load error:", err);
      } finally {
        setTeacherLoading(false);
      }
    };

    loadTeacher();
  }, [schoolId, teacherId]);

  console.log("Teacher Data:", teacher);
  // --------------------------------------------------
  // LOAD ASSIGNMENTS
  // --------------------------------------------------

  const loadAssignments = async () => {
    if (!schoolId || !teacherId || !academicYear || !selectedDay) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get(
        "/api/teacher-class-assignment/teacher/day",
        {
          params: {
            schoolId: Number(schoolId),
            academicYear: academicYear,
            teacherId: Number(teacherId),
            dayOfWeek: selectedDay,
          },
        },
      );

      console.log("Teacher Day Assignments:", response.data);

      setAssignments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Teacher assignment error:", err.response?.data || err);

      setError(
        err.response?.data?.message || "Unable to load teacher classes.",
      );

      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [schoolId, teacherId, academicYear, selectedDay]);

  // --------------------------------------------------
  // TEACHER NAME
  // --------------------------------------------------

  const teacherName = useMemo(() => {
    if (!teacher) return "Teacher";

    return (
      [teacher.firstName, teacher.middleName, teacher.lastName]
        .filter(Boolean)
        .join(" ") ||
      teacher.name ||
      teacher.teacherName ||
      teacher.fullName ||
      teacher.employeeId ||
      "Teacher"
    );
  }, [teacher]);

  // --------------------------------------------------
  // DAY ASSIGNMENTS
  // --------------------------------------------------

  const dayAssignments = useMemo(() => {
    return assignments
      .filter(
        (item) => String(item.dayOfWeek || "").toUpperCase() === selectedDay,
      )
      .filter((item) => item.active !== false)
      .filter((item) => {
        if (!search.trim()) return true;

        const keyword = search.toLowerCase();

        return [
          item.subject,
          item.studentClass,
          item.section,
          item.room,
          item.periodName,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword));
      })
      .sort((a, b) => {
        const periodA = Number(a.periodId || 0);
        const periodB = Number(b.periodId || 0);

        return periodA - periodB;
      });
  }, [assignments, selectedDay, search]);

  // --------------------------------------------------
  // WEEKLY SUMMARY
  // --------------------------------------------------

  const dayCount = useMemo(() => {
    const result = {};

    DAYS.forEach((day) => {
      result[day] = assignments.filter(
        (item) =>
          String(item.dayOfWeek || "").toUpperCase() === day &&
          item.active !== false,
      ).length;
    });

    return result;
  }, [assignments]);

  // --------------------------------------------------
  // DISPLAY HELPERS
  // --------------------------------------------------

  const formatDay = (day) => {
    if (!day) return "-";

    return day.charAt(0) + day.slice(1).toLowerCase();
  };

  const formatSubject = (subject) => {
    if (!subject) return "-";

    return String(subject)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getClassName = (item) => {
    if (!item.studentClass) return "-";

    return `${item.studentClass}${item.section ? ` - ${item.section}` : ""}`;
  };

  // --------------------------------------------------
  // DAY NAVIGATION
  // --------------------------------------------------

  const currentDayIndex = DAYS.indexOf(selectedDay);

  const previousDay = () => {
    const index = currentDayIndex <= 0 ? DAYS.length - 1 : currentDayIndex - 1;

    setSelectedDay(DAYS[index]);
  };

  const nextDay = () => {
    const index = currentDayIndex >= DAYS.length - 1 ? 0 : currentDayIndex + 1;

    setSelectedDay(DAYS[index]);
  };

  return (
    <>
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
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaChalkboardTeacher size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Time Table</h5>

                  <div className="text-muted small">
                    Dashboard &nbsp;/ &nbsp; Time Table
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
                  Teacher Dashboard
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
              Home &nbsp;›&nbsp; Dashboard &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Time Table</span>
            </small>
          </div>
        </div>
      </div>
      <div className="mx-2 mt-2 mb-3">
        {/* ================================================= */}
        {/* TEACHER INFO */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow mb-3 "
          style={{
            boxShadow: "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3">
            <div className="row g-3">
              {/* Teacher */}

              <div className="col-12 col-md-3">
                <div
                  className="d-flex align-items-center gap-3 p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border: "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuUserRound size={21} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Teacher
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        color: "#0f172a",
                      }}
                    >
                      {teacherLoading ? "Loading..." : teacherName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Year */}

              <div className="col-12 col-md-3">
                <div
                  className="d-flex align-items-center gap-3 p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border: "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuSchool size={21} />
                  </div>

                  <div className="flex-grow-1">
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Academic Session <span className="text-danger">*</span>
                    </div>
                    <select
                      name=""
                      id=""
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="form-control mt-1"
                    >
                      {sessions.map((session) => (
                        <option key={session} value={session}>
                          {session}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Total Classes */}

              <div className="col-12 col-md-3">
                <div
                  className="d-flex align-items-center gap-3 p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border: "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <LuBookOpen size={21} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Weekly Classes
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        fontSize: 20,
                        color: "#2563eb",
                      }}
                    >
                      {
                        assignments.filter((item) => item.active !== false)
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3">
                <div
                  className="d-flex align-items-center gap-3 p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border: "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div className="card-body p-3">
                    <div className="position-relative">
                      <LuSearch
                        size={18}
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#64748b",
                        }}
                      />

                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search subject, class, section, room..."
                        className="form-control"
                        style={{
                          minHeight: 44,
                          paddingLeft: 42,
                          border: "1px solid #dbeafe",
                          borderRadius: 12,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card border-0 rounded-4 shadow mb-3"
          style={{
            boxShadow: "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <LuCalendarDays size={21} />
                </div>

                <div>
                  <div className="fw-bold" style={{ color: "#0f172a" }}>
                    Weekly Timetable
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                    }}
                  >
                    Select a day to view your classes
                  </div>
                </div>
              </div>

              {/* Mobile navigation */}

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={previousDay}
                  className="btn btn-sm"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid #dbeafe",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                >
                  <LuChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextDay}
                  className="btn btn-sm"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid #dbeafe",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                >
                  <LuChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              className="d-flex gap-2"
              style={{
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {DAYS.map((day) => {
                const active = selectedDay === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className="btn flex-shrink-0"
                    style={{
                      minWidth: 105,
                      minHeight: 58,
                      borderRadius: 12,
                      border: active
                        ? "1px solid #2563eb"
                        : "1px solid #dbeafe",
                      background: active
                        ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                        : "#fff",
                      color: active ? "#fff" : "#334155",
                      boxShadow: active
                        ? "0 6px 15px rgba(37,99,235,.20)"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {formatDay(day)}
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        marginTop: 3,
                        opacity: active ? 0.9 : 0.65,
                      }}
                    >
                      {dayCount[day] || 0} Classes
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

       

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div
            className="alert mb-3"
            style={{
              borderRadius: 12,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>
        )}

        {/* ================================================= */}
        {/* DAY HEADER */}
        {/* ================================================= */}

        

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div
            className="card border-0 rounded-4 shadow-sm"
            style={{
              boxShadow: "0 6px 22px rgba(15,23,42,.07)",
            }}
          >
            <div className="card-body text-center py-5">
              <div className="spinner-border" style={{ color: "#2563eb" }} />

              <div
                className="mt-3"
                style={{
                  color: "#64748b",
                  fontSize: 14,
                }}
              >
                Loading your classes...
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* NO CLASSES */}
        {/* ================================================= */}

        {!loading && dayAssignments.length === 0 && (
          <div
            className="card border-0 rounded-4 shadow"
            style={{
              boxShadow: "0 6px 22px rgba(15,23,42,.07)",
            }}
          >
            <div className="card-body text-center py-5">
              <div
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <LuCalendarDays size={30} />
              </div>

              <h5 className="mt-3 mb-1 fw-bold" style={{ color: "#0f172a" }}>
                No Classes Scheduled
              </h5>

              <p
                className="mb-0"
                style={{
                  color: "#64748b",
                  fontSize: 14,
                }}
              >
                You don't have any class assigned on {formatDay(selectedDay)}.
              </p>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* CLASS CARDS */}
        {/* ================================================= */}

        {!loading && dayAssignments.length > 0 && (
          <div className="row g-3">
            {dayAssignments.map((item, index) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={
                  item.id ||
                  `${item.periodId}-${item.studentClass}-${item.section}-${index}`
                }
              >
                <div
                  className="card border-0 h-100 rounded-4"
                  style={{
                    background: "#fff",
                    boxShadow: "0 6px 22px rgba(15,23,42,.07)",
                    border: "1px solid #eef2ff",
                  }}
                >
                  <div className="card-body p-3">
                    {/* Period */}

                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                          }}
                        >
                          <LuClock3 size={20} />
                        </div>

                        <div>
                          <div
                            className="fw-bold"
                            style={{
                              color: "#0f172a",
                              fontSize: 15,
                            }}
                          >
                            {item.periodName || `Period ${index + 1}`}
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                              color: "#64748b",
                            }}
                          >
                            {item.startTime && item.endTime
                              ? `${item.startTime} - ${item.endTime}`
                              : "Time not available"}
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 9,
                          background: "#eff6ff",
                          color: "#2563eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* Subject */}

                    <div
                      className="p-3 mb-2"
                      style={{
                        background: "#f8fbff",
                        border: "1px solid #dbeafe",
                        borderRadius: 12,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "#64748b",
                          fontWeight: 600,
                          marginBottom: 3,
                        }}
                      >
                        SUBJECT
                      </div>

                      <div
                        className="fw-bold"
                        style={{
                          color: "#2563eb",
                          fontSize: 16,
                        }}
                      >
                        {formatSubject(item.subject)}
                      </div>
                    </div>

                    {/* Class + Section */}

                    <div className="row g-2 mb-2">
                      <div className="col-7">
                        <div
                          className="p-2"
                          style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 10,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              color: "#64748b",
                              fontWeight: 600,
                            }}
                          >
                            CLASS
                          </div>

                          <div
                            className="fw-semibold"
                            style={{
                              color: "#334155",
                              fontSize: 14,
                            }}
                          >
                            {item.studentClass || "-"}
                          </div>
                        </div>
                      </div>

                      <div className="col-5">
                        <div
                          className="p-2"
                          style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 10,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              color: "#64748b",
                              fontWeight: 600,
                            }}
                          >
                            SECTION
                          </div>

                          <div
                            className="fw-semibold"
                            style={{
                              color: "#334155",
                              fontSize: 14,
                            }}
                          >
                            {item.section || "-"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room */}

                    <div
                      className="d-flex align-items-center gap-2"
                      style={{
                        color: "#64748b",
                        fontSize: 13,
                      }}
                    >
                      <LuMapPin size={16} style={{ color: "#2563eb" }} />

                      <span>
                        Room:{" "}
                        <strong
                          style={{
                            color: "#334155",
                          }}
                        >
                          {item.room || "Not Assigned"}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================= */}
        {/* WEEKLY OVERVIEW */}
        {/* ================================================= */}

        {!loading && assignments.length > 0 && (
          <div
            className="card border-0 rounded-4 shadow mt-3"
            style={{
              boxShadow: "0 6px 22px rgba(15,23,42,.07)",
            }}
          >
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <LuBookOpen size={21} />
                </div>

                <div>
                  <div
                    className="fw-bold"
                    style={{
                      color: "#0f172a",
                    }}
                  >
                    Weekly Overview
                  </div>

                  <div
                    style={{
                      color: "#64748b",
                      fontSize: 12,
                    }}
                  >
                    Your classes for the complete week
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table
                  className="table align-middle mb-0"
                  style={{ minWidth: 650 }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#eff6ff",
                        color: "#1e3a8a",
                      }}
                    >
                      <th
                        style={{
                          borderColor: "#dbeafe",
                          fontSize: 13,
                        }}
                      >
                        Day
                      </th>

                      <th
                        style={{
                          borderColor: "#dbeafe",
                          fontSize: 13,
                        }}
                      >
                        Classes
                      </th>

                      <th
                        style={{
                          borderColor: "#dbeafe",
                          fontSize: 13,
                        }}
                      >
                        Subjects
                      </th>

                      <th
                        style={{
                          borderColor: "#dbeafe",
                          fontSize: 13,
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {DAYS.map((day) => {
                      const dayItems = assignments.filter(
                        (item) =>
                          String(item.dayOfWeek || "").toUpperCase() === day &&
                          item.active !== false,
                      );

                      const subjects = [
                        ...new Set(
                          dayItems
                            .map((item) => formatSubject(item.subject))
                            .filter(Boolean),
                        ),
                      ];

                      return (
                        <tr
                          key={day}
                          style={{
                            cursor: "pointer",
                            background:
                              selectedDay === day ? "#f8fbff" : "#fff",
                          }}
                          onClick={() => setSelectedDay(day)}
                        >
                          <td
                            style={{
                              borderColor: "#eef2ff",
                              fontWeight: selectedDay === day ? 700 : 600,
                              color:
                                selectedDay === day ? "#2563eb" : "#334155",
                            }}
                          >
                            {formatDay(day)}
                          </td>

                          <td
                            style={{
                              borderColor: "#eef2ff",
                            }}
                          >
                            <span
                              style={{
                                background: "#eff6ff",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                borderRadius: 10,
                                padding: "5px 10px",
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            >
                              {dayItems.length}
                            </span>
                          </td>

                          <td
                            style={{
                              borderColor: "#eef2ff",
                              color: "#475569",
                              fontSize: 13,
                            }}
                          >
                            {subjects.length > 0 ? subjects.join(", ") : "-"}
                          </td>

                          <td
                            style={{
                              borderColor: "#eef2ff",
                            }}
                          >
                            {dayItems.length > 0 ? (
                              <span
                                style={{
                                  background: "#ecfdf5",
                                  color: "#047857",
                                  border: "1px solid #a7f3d0",
                                  borderRadius: 10,
                                  padding: "5px 10px",
                                  fontSize: 11,
                                  fontWeight: 700,
                                }}
                              >
                                Scheduled
                              </span>
                            ) : (
                              <span
                                style={{
                                  background: "#f8fafc",
                                  color: "#64748b",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: 10,
                                  padding: "5px 10px",
                                  fontSize: 11,
                                  fontWeight: 700,
                                }}
                              >
                                Free
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* CSS */}
        {/* ================================================= */}

        <style>
          {`
          .spin {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .form-control:focus {
            border-color: #60a5fa !important;
            box-shadow: 0 0 0 3px rgba(96,165,250,.12) !important;
          }

          .table > :not(caption) > * > * {
            padding: 12px;
          }

          @media (max-width: 767px) {
            .card-body {
              padding: 12px !important;
            }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default TimeTable;
