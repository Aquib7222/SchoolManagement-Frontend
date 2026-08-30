
import React, { useEffect, useMemo, useState } from "react";
import {
  LuCalendarDays,
  LuClock3,
  LuSearch,
  LuFilter,
  LuPencil,
  LuTrash2,
  LuEye,
  LuPlus,
  LuRefreshCw,
  LuBookOpen,
  LuUsers,
  LuMapPin,
  LuUserRound,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 8;

const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
];

const TimeTableList = () => {
  const navigate = useNavigate();

  const { standards, sections } = useMasters();

  const [timeTables, setTimeTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const schoolId = user?.schoolId;

  /* =========================================================
     FETCH TIMETABLE
  ========================================================= */

  const fetchTimeTables = async () => {
    if (!schoolId || !token) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `/api/timetable/school?schoolId=${schoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeTables(response.data || []);
    } catch (error) {
      console.error("Error fetching timetable:", error);

      /*
       * If your backend uses another endpoint,
       * change only the URL above.
       */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeTables();
  }, [schoolId, token]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getFullName = (item) => {
    const name =
      item?.studentClass ||
      item?.className ||
      item?.standard ||
      item?.class ||
      "";

    return name;
  };

  const getTeacherName = (item) => {
    if (item?.teacherName) return item.teacherName;

    if (item?.teacher) {
      if (typeof item.teacher === "string") {
        return item.teacher;
      }

      return `${item.teacher.firstName || ""} ${
        item.teacher.lastName || ""
      }`
        .replace(/\s+/g, " ")
        .trim();
    }

    return "-";
  };

  const getSubjectName = (item) => {
    if (item?.subjectName) return item.subjectName;

    if (item?.subject) {
      if (typeof item.subject === "string") {
        return item.subject;
      }

      return (
        item.subject.name ||
        item.subject.subjectName ||
        "-"
      );
    }

    return "-";
  };

  const getSectionName = (item) => {
    if (item?.section) {
      if (typeof item.section === "string") {
        return item.section;
      }

      return (
        item.section.name ||
        item.section.sectionName ||
        item.section.value ||
        "-"
      );
    }

    return item?.sectionName || "-";
  };

  const getDayName = (day) => {
    if (!day) return "-";

    const found = DAYS.find(
      (d) => d.value === String(day).toUpperCase()
    );

    return found?.label || day;
  };

  const getTime = (item) => {
    const start =
      item?.startTime ||
      item?.fromTime ||
      item?.start ||
      "";

    const end =
      item?.endTime ||
      item?.toTime ||
      item?.end ||
      "";

    if (start && end) {
      return `${start} - ${end}`;
    }

    if (item?.time) return item.time;

    return "-";
  };

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredTimeTables = useMemo(() => {
    let data = [...timeTables];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((item) => {
        const subject = getSubjectName(item).toLowerCase();
        const teacher = getTeacherName(item).toLowerCase();
        const studentClass = getFullName(item).toLowerCase();
        const section = getSectionName(item).toLowerCase();
        const room = String(
          item?.roomNumber ||
            item?.room ||
            item?.classRoom ||
            ""
        ).toLowerCase();

        return (
          subject.includes(keyword) ||
          teacher.includes(keyword) ||
          studentClass.includes(keyword) ||
          section.includes(keyword) ||
          room.includes(keyword)
        );
      });
    }

    if (selectedClass) {
      data = data.filter(
        (item) =>
          String(
            item?.studentClass ||
              item?.className ||
              item?.standard ||
              item?.class ||
              ""
          ) === String(selectedClass)
      );
    }

    if (selectedSection) {
      data = data.filter(
        (item) =>
          String(getSectionName(item)) ===
          String(selectedSection)
      );
    }

    if (selectedDay) {
      data = data.filter(
        (item) =>
          String(item?.day || item?.dayOfWeek || "")
            .toUpperCase() ===
          String(selectedDay).toUpperCase()
      );
    }

    data.sort((a, b) => {
      const dayA = DAYS.findIndex(
        (d) =>
          d.value ===
          String(a?.day || a?.dayOfWeek || "").toUpperCase()
      );

      const dayB = DAYS.findIndex(
        (d) =>
          d.value ===
          String(b?.day || b?.dayOfWeek || "").toUpperCase()
      );

      if (dayA !== dayB) {
        return dayA - dayB;
      }

      return String(getTime(a)).localeCompare(
        String(getTime(b))
      );
    });

    return data;
  }, [
    timeTables,
    search,
    selectedClass,
    selectedSection,
    selectedDay,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTimeTables.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedTimeTables =
    filteredTimeTables.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalEntries = filteredTimeTables.length;

  const uniqueClasses = new Set(
    filteredTimeTables.map((item) =>
      getFullName(item)
    )
  ).size;

  const uniqueTeachers = new Set(
    filteredTimeTables
      .map((item) => getTeacherName(item))
      .filter((name) => name !== "-")
  ).size;

  const uniqueSubjects = new Set(
    filteredTimeTables
      .map((item) => getSubjectName(item))
      .filter((name) => name !== "-")
  ).size;

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this timetable entry?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(
        `/api/timetable/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeTables((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Timetable deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting timetable:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to delete timetable."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setSelectedClass("");
    setSelectedSection("");
    setSelectedDay("");
    setCurrentPage(1);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
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
                  <LuCalendarDays size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Time Table
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; Time Table
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn d-flex align-items-center gap-2 text-white"
                onClick={() =>
                  navigate("/setup/time_table_add")
                }
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 17px",
                  boxShadow:
                    "0 6px 15px rgba(37,99,235,.18)",
                }}
              >
                <LuPlus size={18} />
                Add Time Table
              </button>
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
              Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp;
              Time Table
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h5
                className="mb-1 fw-bold"
                style={{ color: "#1e3a8a" }}
              >
                Weekly Time Table
              </h5>

              <small className="text-muted">
                Manage class-wise subject, teacher and
                period schedules
              </small>
            </div>

            <button
              type="button"
              className="btn btn-sm d-flex align-items-center gap-2"
              onClick={fetchTimeTables}
              disabled={loading}
              style={{
                background: "#f8fafc",
                color: "#475569",
                border: "1px solid #dbe3ef",
                borderRadius: "9px",
              }}
            >
              <LuRefreshCw
                size={15}
                className={
                  loading ? "spinner-border" : ""
                }
              />

              Refresh
            </button>
          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="row g-3 mb-4">
            {/* TOTAL */}
            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,.16)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background:
                      "rgba(255,255,255,.08)",
                    right: "-35px",
                    top: "-40px",
                  }}
                />

                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Total Periods
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {totalEntries}
                    </h3>

                    <small style={{ opacity: 0.72 }}>
                      Scheduled periods
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuClock3 size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* CLASSES */}
            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#059669,#10b981)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(5,150,105,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Classes
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {uniqueClasses}
                    </h3>

                    <small style={{ opacity: 0.72 }}>
                      With timetable
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuUsers size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* SUBJECTS */}
            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(124,58,237,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.8 }}>
                      Subjects
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {uniqueSubjects}
                    </h3>

                    <small style={{ opacity: 0.72 }}>
                      Scheduled subjects
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.16)",
                    }}
                  >
                    <LuBookOpen size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* TEACHERS */}
            <div className="col-xl-3 col-md-6">
              <div
                className="h-100 rounded-4 p-3 position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#d97706,#f59e0b)",
                  color: "#fff",
                  boxShadow:
                    "0 10px 25px rgba(245,158,11,.16)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small style={{ opacity: 0.85 }}>
                      Teachers
                    </small>

                    <h3 className="fw-bold mb-0 mt-1">
                      {uniqueTeachers}
                    </h3>

                    <small style={{ opacity: 0.75 }}>
                      Assigned teachers
                    </small>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "rgba(255,255,255,.17)",
                    }}
                  >
                    <LuUserRound size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FILTER
          ================================================= */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #dbeafe",
                  }}
                >
                  <LuFilter size={18} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">
                    Search & Filter
                  </h6>

                  <small className="text-muted">
                    Find timetable entries quickly
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm"
                onClick={resetFilters}
                style={{
                  color: "#2563eb",
                  background: "#fff",
                  border: "1px solid #dbeafe",
                  borderRadius: "8px",
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="row g-3">
              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Search
                </label>

                <div className="position-relative">
                  <LuSearch
                    size={17}
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Subject, teacher..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      paddingLeft: "38px",
                      borderRadius: "9px",
                      border:
                        "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Classes
                  </option>

                  {standards?.length > 0
                    ? standards.map((standard) => {
                        const value =
                          standard.name ||
                          standard.value ||
                          standard;

                        const label =
                          standard.label ||
                          standard.name ||
                          standard.value ||
                          standard;

                        return (
                          <option
                            key={
                              standard.id ||
                              value
                            }
                            value={value}
                          >
                            {label}
                          </option>
                        );
                      })
                    : null}
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
                  onChange={(e) => {
                    setSelectedSection(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections?.length > 0
                    ? sections.map((section) => {
                        const value =
                          section.name ||
                          section.value ||
                          section;

                        const label =
                          section.label ||
                          section.name ||
                          section.value ||
                          section;

                        return (
                          <option
                            key={
                              section.id ||
                              value
                            }
                            value={value}
                          >
                            {label}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>

              {/* DAY */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Day
                </label>

                <select
                  className="form-select"
                  value={selectedDay}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >
                  <option value="">
                    All Days
                  </option>

                  {DAYS.map((day) => (
                    <option
                      key={day.value}
                      value={day.value}
                    >
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#1e293b",
                }}
              >
                Time Table Entries
              </h6>

              <small className="text-muted">
                Showing{" "}
                <strong>
                  {filteredTimeTables.length}
                </strong>{" "}
                schedule
                {filteredTimeTables.length !== 1
                  ? "s"
                  : ""}
              </small>
            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #bfdbfe",
              }}
            >
              {filteredTimeTables.length} Records
            </span>
          </div>

          {/* =================================================
              PREMIUM TABLE
          ================================================= */}

          <div
            className="table-responsive rounded-4"
            style={{
              border: "1px solid #dfe7f1",
              boxShadow:
                "0 5px 18px rgba(15,23,42,.05)",
              overflow: "hidden",
            }}
          >
            <table
              className="table align-middle mb-0"
              style={{
                minWidth: "1050px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg,#eff6ff,#f8fafc)",
                    borderBottom:
                      "2px solid #dbeafe",
                  }}
                >
                  <th
                    className="px-3 py-3"
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: ".3px",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    DAY
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    TIME
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    CLASS
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    SECTION
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    SUBJECT
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    TEACHER
                  </th>

                  <th
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    ROOM
                  </th>

                  <th
                    className="text-center"
                    style={{
                      color: "#334155",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5"
                    >
                      <div
                        className="spinner-border"
                        style={{
                          color: "#2563eb",
                          width: "28px",
                          height: "28px",
                        }}
                      />

                      <div className="text-muted mt-2 small">
                        Loading timetable...
                      </div>
                    </td>
                  </tr>
                ) : paginatedTimeTables.length >
                  0 ? (
                  paginatedTimeTables.map(
                    (item, index) => {
                      const day =
                        item?.day ||
                        item?.dayOfWeek;

                      const room =
                        item?.roomNumber ||
                        item?.room ||
                        item?.classRoom ||
                        "-";

                      return (
                        <tr
                          key={
                            item.id ||
                            `${day}-${index}`
                          }
                          style={{
                            borderBottom:
                              "1px solid #eef2f7",
                          }}
                        >
                          {/* SERIAL */}

                          <td className="px-3">
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-circle"
                              style={{
                                width: "30px",
                                height: "30px",
                                background:
                                  "#f8fafc",
                                color: "#64748b",
                                fontSize: "12px",
                                fontWeight: 700,
                                border:
                                  "1px solid #e2e8f0",
                              }}
                            >
                              {(currentPage - 1) *
                                ITEMS_PER_PAGE +
                                index +
                                1}
                            </span>
                          </td>

                          {/* DAY */}

                          <td>
                            <div
                              className="d-flex align-items-center gap-2"
                            >
                              <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                }}
                              >
                                <LuCalendarDays
                                  size={16}
                                />
                              </div>

                              <span className="fw-semibold text-dark">
                                {getDayName(day)}
                              </span>
                            </div>
                          </td>

                          {/* TIME */}

                          <td>
                            <span
                              className="badge rounded-3 px-3 py-2"
                              style={{
                                background:
                                  "#f0fdf4",
                                color:
                                  "#15803d",
                                border:
                                  "1px solid #bbf7d0",
                                fontWeight: 600,
                              }}
                            >
                              <LuClock3
                                size={13}
                                className="me-1"
                              />

                              {getTime(item)}
                            </span>
                          </td>

                          {/* CLASS */}

                          <td>
                            <span
                              className="fw-bold"
                              style={{
                                color: "#1e3a8a",
                              }}
                            >
                              {getFullName(item) ||
                                "-"}
                            </span>
                          </td>

                          {/* SECTION */}

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                background:
                                  "#f1f5f9",
                                color:
                                  "#475569",
                                border:
                                  "1px solid #e2e8f0",
                              }}
                            >
                              {getSectionName(
                                item
                              )}
                            </span>
                          </td>

                          {/* SUBJECT */}

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#f5f3ff",
                                  color:
                                    "#7c3aed",
                                }}
                              >
                                <LuBookOpen
                                  size={16}
                                />
                              </div>

                              <span className="fw-semibold text-dark">
                                {getSubjectName(
                                  item
                                )}
                              </span>
                            </div>
                          </td>

                          {/* TEACHER */}

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#fff7ed",
                                  color:
                                    "#c2410c",
                                }}
                              >
                                <LuUserRound
                                  size={16}
                                />
                              </div>

                              <span className="text-dark">
                                {getTeacherName(
                                  item
                                )}
                              </span>
                            </div>
                          </td>

                          {/* ROOM */}

                          <td>
                            <span className="text-muted">
                              <LuMapPin
                                size={14}
                                className="me-1"
                              />
                              {room}
                            </span>
                          </td>

                          {/* ACTION */}

                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-1">
                              {/* VIEW */}

                              <button
                                type="button"
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                title="View"
                                onClick={() =>
                                  navigate(
                                    `/setup/timetable/view/${item.id}`
                                  )
                                }
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #dbeafe",
                                  borderRadius:
                                    "8px",
                                }}
                              >
                                <LuEye
                                  size={15}
                                />
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                title="Edit"
                                onClick={() =>
                                  navigate(
                                    `/setup/timetable/edit/${item.id}`
                                  )
                                }
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#f8fafc",
                                  color:
                                    "#475569",
                                  border:
                                    "1px solid #e2e8f0",
                                  borderRadius:
                                    "8px",
                                }}
                              >
                                <LuPencil
                                  size={15}
                                />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                className="btn btn-sm d-flex align-items-center justify-content-center"
                                title="Delete"
                                disabled={
                                  deletingId ===
                                  item.id
                                }
                                onClick={() =>
                                  handleDelete(
                                    item.id
                                  )
                                }
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  background:
                                    "#fff1f2",
                                  color:
                                    "#e11d48",
                                  border:
                                    "1px solid #fecdd3",
                                  borderRadius:
                                    "8px",
                                }}
                              >
                                {deletingId ===
                                item.id ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    style={{
                                      width:
                                        "14px",
                                      height:
                                        "14px",
                                    }}
                                  />
                                ) : (
                                  <LuTrash2
                                    size={15}
                                  />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5"
                    >
                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "65px",
                          height: "65px",
                          background:
                            "#f1f5f9",
                          color: "#94a3b8",
                        }}
                      >
                        <LuCalendarDays
                          size={29}
                        />
                      </div>

                      <h6 className="fw-semibold text-muted mb-1">
                        No timetable found
                      </h6>

                      <small className="text-secondary">
                        Try changing your filters or
                        create a new timetable.
                      </small>

                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-sm text-white"
                          onClick={() =>
                            navigate(
                              "/setup/timetable/add"
                            )
                          }
                          style={{
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        >
                          <LuPlus
                            size={15}
                            className="me-1"
                          />
                          Add Time Table
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">
            <div>
              <small className="text-muted">
                Page{" "}
                <strong>{currentPage}</strong>{" "}
                of{" "}
                <strong>{totalPages}</strong>
              </small>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === 1
                      ? "#94a3b8"
                      : "#2563eb",
                  background: "#fff",
                  borderRadius: "8px",
                }}
              >
                <LuChevronLeft size={16} />
                Previous
              </button>

              <div className="d-flex gap-1">
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className="btn btn-sm"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    style={
                      currentPage === page
                        ? {
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            minWidth: "34px",
                            boxShadow:
                              "0 4px 10px rgba(37,99,235,.18)",
                          }
                        : {
                            background: "#fff",
                            color: "#475569",
                            border:
                              "1px solid #dbe3ef",
                            borderRadius: "8px",
                            minWidth: "34px",
                          }
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === totalPages
                      ? "#94a3b8"
                      : "#2563eb",
                  background: "#fff",
                  borderRadius: "8px",
                }}
              >
                Next
                <LuChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTableList;

