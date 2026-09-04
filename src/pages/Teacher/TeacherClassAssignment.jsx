import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  LuCalendarDays,
  LuClock3,
  LuPlus,
  LuRefreshCw,
  LuSave,
  LuSearch,
  LuSchool,
  LuTrash2,
  LuUserRound,
  LuUsersRound,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import useMasters from "../../hooks/useMasters";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

const getSessionValue = (item) => {
  if (typeof item === "string") return item;

  return (
    item?.sessionName ||
    item?.academicYear ||
    item?.name ||
    item?.value ||
    item?.label ||
    ""
  );
};

const getStandardValue = (item) => {
  if (typeof item === "string") return item;

  return (
    item?.standardName ||
    item?.className ||
    item?.name ||
    item?.value ||
    item?.label ||
    ""
  );
};

const getSectionValue = (item) => {
  if (typeof item === "string") return item;

  return item?.sectionName || item?.name || item?.value || item?.label || "";
};

const getTeacherName = (teacher) => {
  return (
    [teacher?.firstName, teacher?.middleName, teacher?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    teacher?.name ||
    teacher?.teacherName ||
    teacher?.fullName ||
    teacher?.employeeId ||
    "-"
  );
};

const getSchoolId = (school) => {
  return school?.id ?? school?.schoolId;
};

const getSchoolName = (school) => {
  return school?.schoolName || school?.name || school?.school_name || "-";
};

const getPeriodId = (period) => {
  return period?.id ?? period?.periodId;
};

const getPeriodName = (period) => {
  return (
    period?.periodName ||
    period?.name ||
    period?.period ||
    `Period ${getPeriodId(period) || ""}`
  );
};

const formatTime = (time) => {
  if (!time) return "-";
  return String(time).substring(0, 5);
};

const createEmptyMapping = () => ({
  id: null,
  subject: "",
  studentClass: "",
  section: "",
  room: "",
  active: true,
});

const sortPeriods = (list = []) => {
  return [...list].sort((a, b) =>
    String(a?.startTime || "").localeCompare(String(b?.startTime || "")),
  );
};

export default function TeacherClassAssignment() {
  // ---------------------------------------------------------
  // MASTER DATA
  // ---------------------------------------------------------

  const {
    sessions = [],
    standards = [],
    sections = [],
    subjects = [],
  } = useMasters();

  console.log("Master Data:", { sessions, standards, sections, subjects });
  // ---------------------------------------------------------
  // STATES
  // ---------------------------------------------------------
  const schoolId = localStorage.getItem("schoolId");

  const [school, setSchool] = useState(null);
  const [teachers, setTeachers] = useState([]);

  const [selectedSchoolId, setSelectedSchoolId] = useState("");

  const [selectedSession, setSelectedSession] = useState("");

  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const [selectedDay, setSelectedDay] = useState("");

  const [periods, setPeriods] = useState([]);

  const [periodMappings, setPeriodMappings] = useState({});

  const [loadingSchools, setLoadingSchools] = useState(false);

  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const [loadingPeriods, setLoadingPeriods] = useState(false);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // ---------------------------------------------------------
  // LOAD SCHOOLS
  // ---------------------------------------------------------

  useEffect(() => {
    loadSchool();
  }, []);

  const loadSchool = async () => {
    try {
      const schoolId = localStorage.getItem("schoolId");

      if (!schoolId) {
        console.error("School ID not found in localStorage");
        return;
      }

      const response = await axiosInstance.get(`/api/school/${schoolId}`);

      setSchool(response.data);
      setSelectedSchoolId(response.data.id);
    } catch (error) {
      console.error("School loading error:", error);
    }
  };

  console.log("Loaded School:", school);

  useEffect(() => {
    if (!selectedSchoolId) {
      setTeachers([]);
      return;
    }

    loadTeachers(selectedSchoolId);
  }, [selectedSchoolId]);

  const loadTeachers = async (schoolId) => {
    try {
      setLoadingTeachers(true);

      const response = await axiosInstance.get(
        `/api/teachers/all?schoolId=${Number(schoolId)}`,
      );

      setTeachers(response.data || []);
    } catch (error) {
      console.error("Teacher loading error:", error);

      setTeachers([]);

      setMessage({
        type: "error",
        text: "Unable to load teachers.",
      });
    } finally {
      setLoadingTeachers(false);
    }
  };

  // ---------------------------------------------------------
  // SESSION CHANGE
  // ---------------------------------------------------------

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);

    setSelectedTeacherId("");
    setSelectedDay("");

    setPeriods([]);
    setPeriodMappings({});

    setMessage({
      type: "",
      text: "",
    });
  };

  // ---------------------------------------------------------
  // TEACHER CHANGE
  // ---------------------------------------------------------

  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);

    setSelectedDay("");

    setPeriods([]);
    setPeriodMappings({});

    setMessage({
      type: "",
      text: "",
    });
  };

  // ---------------------------------------------------------
  // DAY CHANGE
  // ---------------------------------------------------------

  const handleDayChange = (e) => {
    const day = e.target.value;

    setSelectedDay(day);

    setPeriods([]);
    setPeriodMappings({});

    if (day) {
      loadDayPeriods(day);
    }
  };

  // ---------------------------------------------------------
  // LOAD PERIODS FOR SELECTED DAY
  // ---------------------------------------------------------

  const loadDayPeriods = async (day = selectedDay) => {
    if (!selectedSchoolId || !selectedSession || !selectedTeacherId || !day) {
      return;
    }

    try {
      setLoadingPeriods(true);

      setMessage({
        type: "",
        text: "",
      });

      const response = await axiosInstance.get(
        `/api/periods/school/${Number(selectedSchoolId)}/session/day`,
        {
          params: {
            academicYear: selectedSession,
            dayOfWeek: day,
          },
        },
      );

      const loadedPeriods = sortPeriods(
        (response.data || []).filter((period) => {
          const periodName = String(
            period?.periodName || period?.name || period?.period || "",
          )
            .trim()
            .toLowerCase();

          return !periodName.includes("lunch");
        }),
      );

      setPeriods(loadedPeriods);

      const initialMappings = {};

      loadedPeriods.forEach((period) => {
        const periodId = String(getPeriodId(period));

        initialMappings[periodId] = [createEmptyMapping()];
      });

      setPeriodMappings(initialMappings);

      await loadExistingMappings(day, loadedPeriods, initialMappings);
    } catch (error) {
      console.error("Period loading error:", error);

      setPeriods([]);
      setPeriodMappings({});

      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Unable to load periods.",
      });
    } finally {
      setLoadingPeriods(false);
    }
  };


  console.log("Loaded Periods:", periods);

  // ---------------------------------------------------------
  // LOAD EXISTING TEACHER MAPPINGS
  // ---------------------------------------------------------

  const loadExistingMappings = async (day, loadedPeriods, initialMappings) => {
    try {
      /*
       * Backend can return all assignments
       * for school + session + day.
       */
      const response = await axiosInstance.get(
        `/api/teacher-class-assignment/day?schoolId=${Number(
          selectedSchoolId,
        )}&academicYear=${encodeURIComponent(
          selectedSession,
        )}&dayOfWeek=${day}`,
      );

      const assignments = response.data || [];

      const grouped = {
        ...initialMappings,
      };

      /*
       * We only show assignments belonging
       * to currently selected teacher.
       */
      const teacherAssignments = assignments.filter(
        (item) =>
          String(item.teacherId ?? item.teacher?.id) ===
          String(selectedTeacherId),
      );

      teacherAssignments.forEach((item) => {
        const periodId = String(item.periodId ?? item.period?.id);

        if (!periodId) return;

        if (!grouped[periodId]) {
          grouped[periodId] = [];
        }

        /*
         * Remove default empty row
         * when first actual assignment arrives.
         */
        const onlyEmpty =
          grouped[periodId].length === 1 &&
          !grouped[periodId][0].id &&
          !grouped[periodId][0].subject &&
          !grouped[periodId][0].studentClass &&
          !grouped[periodId][0].section;

        if (onlyEmpty) {
          grouped[periodId] = [];
        }

        grouped[periodId].push({
          id: item.id ?? null,

          subject: item.subject ?? "",

          studentClass: item.studentClass ?? item.className ?? "",

          section: item.section ?? item.sectionName ?? "",

          room: item.room ?? "",

          active: item.active !== false,
        });
      });

      setPeriodMappings(grouped);
    } catch (error) {
      /*
       * Existing assignments load fail hone par
       * blank rows remain usable.
       */
      console.error("Existing mapping loading error:", error);
    }
  };

  // ---------------------------------------------------------
  // UPDATE MAPPING
  // ---------------------------------------------------------

  const updateMapping = (periodId, mappingIndex, field, value) => {
    setPeriodMappings((previous) => {
      const rows = [...(previous[periodId] || [])];

      rows[mappingIndex] = {
        ...rows[mappingIndex],
        [field]: value,
      };

      return {
        ...previous,
        [periodId]: rows,
      };
    });
  };

  // ---------------------------------------------------------
  // ADD MAPPING
  // ---------------------------------------------------------

  const addMapping = (periodId) => {
    setPeriodMappings((previous) => ({
      ...previous,

      [periodId]: [...(previous[periodId] || []), createEmptyMapping()],
    }));
  };

  // ---------------------------------------------------------
  // REMOVE MAPPING
  // ---------------------------------------------------------

  const removeMapping = (periodId, mappingIndex) => {
    setPeriodMappings((previous) => {
      const rows = [...(previous[periodId] || [])];

      /*
       * At least one row should remain.
       */
      if (rows.length <= 1) {
        rows[0] = createEmptyMapping();

        return {
          ...previous,
          [periodId]: rows,
        };
      }

      rows.splice(mappingIndex, 1);

      return {
        ...previous,
        [periodId]: rows,
      };
    });
  };

  // ---------------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------------

  const validateMappings = () => {
    for (const period of periods) {
      const periodId = String(getPeriodId(period));

      const rows = periodMappings[periodId] || [];

      for (let index = 0; index < rows.length; index++) {
        const row = rows[index];

        /*
         * Completely empty additional row
         * is allowed.
         */
        const isEmpty =
          !row.subject && !row.studentClass && !row.section && !row.room;

        if (isEmpty) {
          continue;
        }

        if (!row.subject) {
          return `Please select subject for ${getPeriodName(
            period,
          )}, row ${index + 1}.`;
        }

        if (!row.studentClass) {
          return `Please select class for ${getPeriodName(
            period,
          )}, row ${index + 1}.`;
        }

        if (!row.section) {
          return `Please select section for ${getPeriodName(
            period,
          )}, row ${index + 1}.`;
        }
      }
    }

    return null;
  };

  // ---------------------------------------------------------
  // SAVE CURRENT TEACHER + DAY
  // ---------------------------------------------------------

  const handleSave = async () => {
    if (!selectedSchoolId) {
      setMessage({
        type: "error",
        text: "Please select school.",
      });
      return;
    }

    if (!selectedSession) {
      setMessage({
        type: "error",
        text: "Please select academic session.",
      });
      return;
    }

    if (!selectedTeacherId) {
      setMessage({
        type: "error",
        text: "Please select teacher.",
      });
      return;
    }

    if (!selectedDay) {
      setMessage({
        type: "error",
        text: "Please select day.",
      });
      return;
    }

    if (!periods.length) {
      setMessage({
        type: "error",
        text: "No periods found for selected day.",
      });
      return;
    }

    const validationError = validateMappings();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    try {
      setSaving(true);

      const assignments = [];

      periods.forEach((period) => {
        const periodId = getPeriodId(period);

        const rows = periodMappings[String(periodId)] || [];

        rows.forEach((row) => {
          /*
           * Don't send completely empty rows.
           */
          const isEmpty =
            !row.subject && !row.studentClass && !row.section && !row.room;

          if (isEmpty) {
            return;
          }

          assignments.push({
            id: row.id ? Number(row.id) : null,

            periodId: Number(periodId),

            startTime: period.startTime,
            periodName: period.periodName,

  endTime: period.endTime,

            teacherId: Number(selectedTeacherId),

            subject: row.subject,

            studentClass: row.studentClass,

            section: row.section,

            room: row.room?.trim() || null,

            active: row.active !== false,
          });
        });
      });

      const payload = {
        schoolId: Number(selectedSchoolId),

        academicYear: selectedSession,

        dayOfWeek: selectedDay,

        assignments,
      };

      console.log("Teacher Assignment Payload:", payload);

      await axiosInstance.post(
        "/api/teacher-class-assignment/day-bulk",
        payload,
      );

      setMessage({
        type: "success",
        text: `${selectedDay} assignments saved successfully.`,
      });

      /*
       * Reload after save.
       */
      await loadDayPeriods();
    } catch (error) {
      console.error("Assignment save error:", error);

      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          error?.response?.data ||
          "Unable to save assignments.",
      });
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------
  // SEARCH PERIOD
  // ---------------------------------------------------------

  const filteredPeriods = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return periods;
    }

    return periods.filter((period) => {
      return (
        getPeriodName(period).toLowerCase().includes(keyword) ||
        String(period?.startTime || "")
          .toLowerCase()
          .includes(keyword) ||
        String(period?.endTime || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [periods, search]);

  // ---------------------------------------------------------
  // TOTAL MAPPINGS
  // ---------------------------------------------------------

  const totalMappings = Object.values(periodMappings).reduce(
    (total, rows) =>
      total +
      rows.filter((row) => row.subject && row.studentClass && row.section)
        .length,
    0,
  );

  // ---------------------------------------------------------
  // SELECTED TEACHER
  // ---------------------------------------------------------

  const selectedTeacher = teachers.find(
    (teacher) => String(teacher.id) === String(selectedTeacherId),
  );

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <>
      <style>{`
        .teacher-assignment-page {
          min-height: 100vh;
          padding-bottom: 30px;
        }

        .teacher-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f9ff 60%,
            #eaf3ff 100%
          );
          border: 1px solid #dbeafe;
          border-radius: 16px;
          box-shadow: 0 6px 22px rgba(15,23,42,.07);
          overflow: hidden;
        }

        .teacher-header-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 8px 20px rgba(37,99,235,.22);
        }

        .section-card {
          background: #fff;
          border: 1px solid #e5edf8;
          border-radius: 16px;
          box-shadow: 0 6px 22px rgba(15,23,42,.07);
        }

        .section-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
        }

        .form-control,
        .form-select {
          min-height: 42px;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          font-size: 14px;
          color: #1e293b;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #60a5fa;
          box-shadow:
            0 0 0 3px rgba(96,165,250,.12);
        }

        .btn-blue {
          min-height: 42px;
          border: 0;
          border-radius: 12px;
          padding: 0 18px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #fff;
          font-weight: 600;
          box-shadow:
            0 7px 16px rgba(37,99,235,.18);
        }

        .btn-blue:hover {
          color: #fff;
          opacity: .94;
        }

        .btn-light-blue {
          min-height: 38px;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          font-weight: 600;
        }

        .period-card {
          border: 1px solid #dbeafe;
          border-radius: 15px;
          background: #fff;
          overflow: hidden;
          margin-bottom: 18px;
        }

        .period-card-header {
          background: #eff6ff;
          border-bottom: 1px solid #dbeafe;
          padding: 14px 16px;
        }

        .period-number {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .period-title {
          font-size: 15px;
          font-weight: 700;
          color: #1e3a8a;
        }

        .period-time {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }

        .mapping-row {
          padding: 15px;
          border-bottom: 1px dashed #dbeafe;
        }

        .mapping-row:last-child {
          border-bottom: 0;
        }

        .mapping-number {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 9px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dbeafe;
          background: #fff;
        }

        .icon-btn-primary {
          color: #2563eb;
          border-color: #bfdbfe;
          background: #eff6ff;
        }

        .icon-btn-danger {
          color: #dc2626;
          border-color: #fecaca;
          background: #fff;
        }

        .stat-card {
          background: #fff;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          padding: 14px;
        }

        .stat-label {
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
        }

        .stat-value {
          color: #1e3a8a;
          font-size: 20px;
          font-weight: 700;
        }

        .teacher-selected-card {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          padding: 10px 13px;
        }

        .alert-custom {
          border-radius: 12px;
          border: 1px solid;
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 500;
        }

        .alert-success-custom {
          background: #f0fdf4;
          color: #166534;
          border-color: #bbf7d0;
        }

        .alert-error-custom {
          background: #fef2f2;
          color: #991b1b;
          border-color: #fecaca;
        }

        .empty-state {
          padding: 45px 20px;
          text-align: center;
          color: #64748b;
        }

        .step-badge {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          margin-right: 7px;
        }

        @media (max-width: 991px) {
          .mapping-grid {
            grid-template-columns:
              repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 767px) {
          .mapping-grid {
            grid-template-columns:
              1fr !important;
          }
        }
      `}</style>

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
                  <LuUsersRound size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Teacher Class Assignment
                  </h5>

                  <div className="text-muted small">
                    Teacher &nbsp;/ &nbsp; Teacher Class Assignment
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
                  Teacher
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
              Home &nbsp;›&nbsp; Teacher &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Teacher Class Assignment
              </span>
            </small>
          </div>
        </div>
      </div>

      {message.text && (
        <div
          className={`alert-custom mb-3 ${
            message.type === "success"
              ? "alert-success-custom"
              : "alert-error-custom"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="px-2">
        <div className="section-card p-3 mb-3">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="section-icon">
              <LuUserRound size={21} />
            </div>

            <div>
              <h6
                className="mb-1"
                style={{
                  color: "#1e3a8a",
                  fontWeight: 700,
                }}
              >
                Teacher Selection
              </h6>

              <small
                style={{
                  color: "#64748b",
                }}
              >
                Select school, session and teacher first.
              </small>
            </div>
          </div>

          <div className="row g-3">
            {/* SCHOOL */}

            <div className="col-lg-4 col-md-6 col-12">
              <label className="field-label">
                School <span className="text-danger">*</span>
              </label>

              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    borderColor: "#dbeafe",
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: "12px 0 0 12px",
                  }}
                >
                  <LuSchool size={17} />
                </span>

                <select
                  className="form-select"
                  value={selectedSchoolId}
                  disabled
                >
                  <option value="">
                    {school ? "Select School" : "Loading School..."}
                  </option>

                  {school && (
                    <option value={school.id}>{school.schoolName}</option>
                  )}
                </select>
              </div>
            </div>

            {/* SESSION */}

            <div className="col-lg-4 col-md-6 col-12">
              <label className="field-label">
                Academic Session <span className="text-danger">*</span>
              </label>

              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    borderColor: "#dbeafe",
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: "12px 0 0 12px",
                  }}
                >
                  <LuCalendarDays size={17} />
                </span>

                <select
                  className="form-select"
                  value={selectedSession}
                  disabled={!selectedSchoolId}
                  onChange={handleSessionChange}
                  style={{
                    borderRadius: "0 12px 12px 0",
                  }}
                >
                  <option value="">Select Session</option>

                  {sessions.map((session, index) => {
                    const value = getSessionValue(session);

                    return (
                      <option key={`${value}-${index}`} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* TEACHER */}

            <div className="col-lg-4 col-md-6 col-12">
              <label className="field-label">
                Teacher <span className="text-danger">*</span>
              </label>

              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    borderColor: "#dbeafe",
                    background: "#eff6ff",
                    color: "#2563eb",
                    borderRadius: "12px 0 0 12px",
                  }}
                >
                  <LuUserRound size={17} />
                </span>

                <select
                  className="form-select"
                  value={selectedTeacherId}
                  disabled={!selectedSession || loadingTeachers}
                  onChange={handleTeacherChange}
                  style={{
                    borderRadius: "0 12px 12px 0",
                  }}
                >
                  <option value="">
                    {loadingTeachers ? "Loading Teachers..." : "Select Teacher"}
                  </option>

                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {getTeacherName(teacher)}

                      {teacher.employeeId ? ` (${teacher.employeeId})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SELECTED TEACHER */}

          {selectedTeacherId && selectedTeacher && (
            <div className="teacher-selected-card mt-3">
              <div className="d-flex align-items-center gap-2">
                <LuUserRound size={18} color="#2563eb" />

                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1e3a8a",
                    }}
                  >
                    Selected Teacher
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      color: "#334155",
                    }}
                  >
                    {getTeacherName(selectedTeacher)}

                    {selectedTeacher.employeeId
                      ? ` • ${selectedTeacher.employeeId}`
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* DAY SELECT */}
      {/* ================================================= */}
      <div className="px-2">
        {selectedSchoolId && selectedSession && selectedTeacherId && (
          <div className="section-card p-3 mb-3">
            <div className="row g-3 align-items-end">
              <div className="col-lg-5 col-md-7 col-12">
                <label className="field-label">
                  Select Day <span className="text-danger">*</span>
                </label>

                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      borderColor: "#dbeafe",
                      background: "#eff6ff",
                      color: "#2563eb",
                      borderRadius: "12px 0 0 12px",
                    }}
                  >
                    <LuCalendarDays size={17} />
                  </span>

                  <select
                    className="form-select"
                    value={selectedDay}
                    onChange={handleDayChange}
                    style={{
                      borderRadius: "0 12px 12px 0",
                    }}
                  >
                    <option value="">Select Day</option>

                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedDay && (
                <div className="col-lg-7 col-md-5 col-12">
                  <div className="d-flex justify-content-md-end">
                    <button
                      type="button"
                      className="icon-btn icon-btn-primary"
                      title="Refresh"
                      onClick={() => loadDayPeriods()}
                      disabled={loadingPeriods}
                    >
                      <LuRefreshCw size={17} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* PERIODS */}
      {/* ================================================= */}

      <div className="px-2">
        {selectedSchoolId &&
          selectedSession &&
          selectedTeacherId &&
          selectedDay && (
            <div className="section-card p-3">
              {/* TOP */}

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="section-icon">
                    <LuClock3 size={21} />
                  </div>

                  <div>
                    <h6
                      className="mb-1"
                      style={{
                        color: "#1e3a8a",
                        fontWeight: 700,
                      }}
                    >
                      {selectedDay} - Teacher Mapping
                    </h6>

                    <small
                      style={{
                        color: "#64748b",
                      }}
                    >
                      Assign subject, class and section for every period.
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-center">
                  <div className="stat-card py-2 px-3">
                    <div className="stat-label">Periods</div>

                    <div className="stat-value">{periods.length}</div>
                  </div>

                  <div className="stat-card py-2 px-3">
                    <div className="stat-label">Mapped</div>

                    <div className="stat-value">{totalMappings}</div>
                  </div>
                </div>
              </div>

              {/* SEARCH */}

              {periods.length > 0 && (
                <div className="mb-3">
                  <div
                    className="input-group"
                    style={{
                      maxWidth: 320,
                    }}
                  >
                    <span
                      className="input-group-text"
                      style={{
                        background: "#eff6ff",
                        borderColor: "#dbeafe",
                        color: "#2563eb",
                      }}
                    >
                      <LuSearch size={16} />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search period..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* LOADING */}

              {loadingPeriods ? (
                <div className="empty-state">
                  <div
                    className="spinner-border text-primary mb-2"
                    role="status"
                  />

                  <div>Loading periods...</div>
                </div>
              ) : filteredPeriods.length === 0 ? (
                <div className="empty-state">
                  <LuClock3
                    size={42}
                    style={{
                      color: "#93c5fd",
                    }}
                  />

                  <h6
                    className="mt-3"
                    style={{
                      color: "#334155",
                    }}
                  >
                    No periods found
                  </h6>

                  <p className="mb-0">
                    No periods are configured for <strong>{selectedDay}</strong>{" "}
                    for this school and session.
                  </p>
                </div>
              ) : (
                <>
                  {/* ======================================= */}
                  {/* EACH PERIOD */}
                  {/* ======================================= */}

                  {filteredPeriods.map((period, periodIndex) => {
                    const periodId = String(getPeriodId(period));

                    const mappings = periodMappings[periodId] || [];

                    return (
                      <div className="period-card" key={periodId}>
                        {/* PERIOD HEADER */}

                        <div className="period-card-header">
                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <div className="d-flex align-items-center gap-3">
                              <div className="period-number">
                                {periodIndex + 1}
                              </div>

                              <div>
                                <div className="period-title">
                                  {getPeriodName(period)}
                                </div>

                                <div className="period-time">
                                  <LuClock3 size={13} className="me-1" />

                                  {formatTime(period.startTime)}

                                  {" - "}

                                  {formatTime(period.endTime)}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="btn-light-blue px-3"
                              onClick={() => addMapping(periodId)}
                            >
                              <LuPlus size={16} className="me-1" />
                              Add Mapping
                            </button>
                          </div>
                        </div>

                        {/* ================================= */}
                        {/* MAPPING ROWS */}
                        {/* ================================= */}

                        {mappings.map((mapping, mappingIndex) => (
                          <div
                            className="mapping-row"
                            key={mapping.id || `${periodId}-${mappingIndex}`}
                          >
                            <div className="d-flex gap-2">
                              {/* NUMBER */}

                              <div className="mapping-number mt-1">
                                {mappingIndex + 1}
                              </div>

                              {/* FIELDS */}

                              <div
                                className="mapping-grid flex-grow-1"
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(4, 1fr)",
                                  gap: "12px",
                                }}
                              >
                                {/* SUBJECT */}
                                <div>
                                  <label className="field-label">Subject</label>

                                  <select
                                    className="form-select"
                                    value={mapping.subject || ""}
                                    onChange={(e) =>
                                      updateMapping(
                                        periodId,
                                        mappingIndex,
                                        "subject",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">Select Subject</option>

                                    {subjects.map((subject) => (
                                      <option key={subject} value={subject}>
                                        {subject.replaceAll("_", " ")}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {/* CLASS */}

                                <div>
                                  <label className="field-label">
                                    Class / Standard
                                  </label>

                                  <select
                                    className="form-select"
                                    value={mapping.studentClass}
                                    onChange={(e) =>
                                      updateMapping(
                                        periodId,
                                        mappingIndex,
                                        "studentClass",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">Select Class</option>

                                    {standards.map((standard, index) => {
                                      const value = getStandardValue(standard);

                                      return (
                                        <option
                                          key={`${value}-${index}`}
                                          value={value}
                                        >
                                          {value}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                {/* SECTION */}

                                <div>
                                  <label className="field-label">Section</label>

                                  <select
                                    className="form-select"
                                    value={mapping.section}
                                    onChange={(e) =>
                                      updateMapping(
                                        periodId,
                                        mappingIndex,
                                        "section",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">Select Section</option>

                                    {sections.map((section, index) => {
                                      const value = getSectionValue(section);

                                      return (
                                        <option
                                          key={`${value}-${index}`}
                                          value={value}
                                        >
                                          {value}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                {/* ROOM */}

                                <div>
                                  <label className="field-label">Room</label>

                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. 101"
                                    value={mapping.room}
                                    onChange={(e) =>
                                      updateMapping(
                                        periodId,
                                        mappingIndex,
                                        "room",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>

                                {/* ACTIONS */}

                                <div className="d-flex align-items-end gap-2">
                                  <button
                                    type="button"
                                    className="icon-btn icon-btn-primary"
                                    title="Add Mapping"
                                    onClick={() => addMapping(periodId)}
                                  >
                                    <LuPlus size={17} />
                                  </button>

                                  <button
                                    type="button"
                                    className="icon-btn icon-btn-danger"
                                    title="Remove Mapping"
                                    onClick={() =>
                                      removeMapping(periodId, mappingIndex)
                                    }
                                  >
                                    <LuTrash2 size={17} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* ======================================= */}
                  {/* SAVE */}
                  {/* ======================================= */}

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn-blue"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <LuSave size={17} className="me-2" />
                          Save {selectedDay} Assignments
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
      </div>
    </>
  );
}
