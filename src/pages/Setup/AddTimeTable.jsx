
import React, { useEffect, useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuClock3,
  LuGraduationCap,
  LuMapPin,
  LuSave,
  LuRotateCcw,
  LuBookOpen,
  LuUserRound,
  LuHash,
  LuCircleCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

/* =========================================================
   API CONFIG
========================================================= */

const API = {
  CREATE: "/api/timetable",
  SUBJECTS: "/api/subjects/school",
  TEACHERS: "/api/employees/school",
};

/* =========================================================
   DAYS
========================================================= */

const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
];

/* =========================================================
   DEFAULT FORM
========================================================= */

const initialForm = {
  academicYear: "",
  studentClass: "",
  section: "",
  day: "",
  periodNumber: "",
  subjectId: "",
  teacherId: "",
  roomNo: "",
  startTime: "",
  endTime: "",
  status: "ACTIVE",
};

/* =========================================================
   COMPONENT
========================================================= */

const AddTimeTable = () => {
  const navigate = useNavigate();

  const {
    standards = [],
    sections = [],
    sessions = [],
  } = useMasters();

  const [form, setForm] = useState(initialForm);

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  const [errors, setErrors] = useState({});

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const token = localStorage.getItem("token");
  const schoolId = user?.schoolId;

  /* =========================================================
     HELPERS
  ========================================================= */

  const getMasterValue = (item) => {
    if (!item) return "";

    if (typeof item === "string") {
      return item;
    }

    return (
      item.value ??
      item.name ??
      item.label ??
      item.code ??
      ""
    );
  };

  const getMasterLabel = (item) => {
    if (!item) return "";

    if (typeof item === "string") {
      return item;
    }

    return (
      item.name ??
      item.label ??
      item.value ??
      item.code ??
      ""
    );
  };

  /* =========================================================
     FETCH SUBJECTS
  ========================================================= */

  const fetchSubjects = async () => {
    if (!schoolId || !token) return;

    setLoadingSubjects(true);

    try {
      const response = await axios.get(API.SUBJECTS, {
        params: {
          schoolId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(response.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);

      /*
       * If your subject API is not ready yet, the form
       * will simply show an empty subject list.
       */
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  /* =========================================================
     FETCH TEACHERS / EMPLOYEES
  ========================================================= */

  const fetchTeachers = async () => {
    if (!schoolId || !token) return;

    setLoadingTeachers(true);

    try {
      const response = await axios.get(API.TEACHERS, {
        params: {
          schoolId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data || [];

      /*
       * If API returns employees with different roles,
       * only teaching staff can be selected.
       */
      const teachingStaff = data.filter((employee) => {
        const role =
          employee.role ||
          employee.designation ||
          employee.employeeType ||
          "";

        return (
          String(role).toUpperCase().includes("TEACH") ||
          String(role).toUpperCase().includes("FACULTY") ||
          !role
        );
      });

      setTeachers(teachingStaff);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
    } finally {
      setLoadingTeachers(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, [schoolId, token]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {
    const newErrors = {};

    if (!form.academicYear) {
      newErrors.academicYear = "Academic year is required.";
    }

    if (!form.studentClass) {
      newErrors.studentClass = "Class is required.";
    }

    if (!form.section) {
      newErrors.section = "Section is required.";
    }

    if (!form.day) {
      newErrors.day = "Day is required.";
    }

    if (!form.periodNumber) {
      newErrors.periodNumber = "Period number is required.";
    }

    if (!form.subjectId) {
      newErrors.subjectId = "Subject is required.";
    }

    if (!form.teacherId) {
      newErrors.teacherId = "Teacher is required.";
    }

    if (!form.startTime) {
      newErrors.startTime = "Start time is required.";
    }

    if (!form.endTime) {
      newErrors.endTime = "End time is required.";
    }

    if (
      form.startTime &&
      form.endTime &&
      form.startTime >= form.endTime
    ) {
      newErrors.endTime =
        "End time must be after start time.";
    }

    if (form.periodNumber) {
      const period = Number(form.periodNumber);

      if (
        !Number.isInteger(period) ||
        period < 1 ||
        period > 20
      ) {
        newErrors.periodNumber =
          "Period number must be between 1 and 20.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      alert("School information not found.");
      return;
    }

    if (!validate()) {
      return;
    }

    const payload = {
      schoolId: Number(schoolId),
      academicYear: form.academicYear,
      studentClass: form.studentClass,
      section: form.section,

      day: form.day,

      periodNumber: Number(form.periodNumber),

      subjectId: Number(form.subjectId),
      teacherId: Number(form.teacherId),

      roomNo: form.roomNo?.trim() || null,

      startTime: form.startTime,
      endTime: form.endTime,

      status: form.status,
    };

    try {
      setLoading(true);

      await axios.post(API.CREATE, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Timetable created successfully.");

      navigate("/setup/time_table_show");
    } catch (error) {
      console.error(
        "Error creating timetable:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to create timetable.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SELECT STYLE
  ========================================================= */

  const inputStyle = (field) => ({
    borderRadius: "10px",
    border: errors[field]
      ? "1px solid #ef4444"
      : "1px solid #dbe3ef",
    minHeight: "43px",
    boxShadow: "none",
  });

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          PAGE HEADER
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

              {/* LEFT */}

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
                    flexShrink: 0,
                  }}
                >
                  <LuCalendarDays size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Add Timetable
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; Timetable
                    &nbsp;/&nbsp; Add Timetable
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm d-flex align-items-center gap-2"
                  onClick={() =>
                    navigate("/setup/time_table_show")
                  }
                  style={{
                    background: "#fff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                    borderRadius: "9px",
                    padding: "8px 13px",
                  }}
                >
                  <LuArrowLeft size={16} />
                  Timetable List
                </button>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <LuCalendarDays className="me-1" />
                  Timetable Setup
                </span>
              </div>
            </div>
          </div>

          {/* BREADCRUMB */}

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
              Timetable &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Add Timetable
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="mx-2 mb-4">
        <form onSubmit={handleSubmit}>
          <div
            className="bg-white rounded-4 shadow"
            style={{
              border: "1px solid #edf2f7",
              overflow: "hidden",
            }}
          >

            {/* =================================================
                CARD HEADER
            ================================================= */}

            <div
              className="p-3 p-md-4"
              style={{
                borderBottom:
                  "1px solid #edf2f7",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #dbeafe",
                  }}
                >
                  <LuBookOpen size={21} />
                </div>

                <div>
                  <h6 className="mb-1 fw-bold">
                    Timetable Information
                  </h6>

                  <small className="text-muted">
                    Configure a class timetable period
                  </small>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM BODY
            ================================================= */}

            <div className="p-3 p-md-4">

              {/* =================================================
                  ACADEMIC INFORMATION
              ================================================= */}

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background:
                        "linear-gradient(#2563eb,#60a5fa)",
                      borderRadius: "10px",
                    }}
                  />

                  <h6 className="fw-bold mb-0">
                    Academic Information
                  </h6>
                </div>

                <div className="row g-3">

                  {/* ACADEMIC YEAR */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Academic Year
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="academicYear"
                      value={form.academicYear}
                      onChange={handleChange}
                      className="form-select"
                      style={inputStyle(
                        "academicYear"
                      )}
                    >
                      <option value="">
                        Select academic year
                      </option>

                      {sessions?.map(
                        (session, index) => {
                          const value =
                            getMasterValue(
                              session
                            );

                          return (
                            <option
                              key={
                                session?.id ??
                                value ??
                                index
                              }
                              value={value}
                            >
                              {getMasterLabel(
                                session
                              )}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {errors.academicYear && (
                      <small className="text-danger">
                        {errors.academicYear}
                      </small>
                    )}
                  </div>

                  {/* CLASS */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Class
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="studentClass"
                      value={form.studentClass}
                      onChange={handleChange}
                      className="form-select"
                      style={inputStyle(
                        "studentClass"
                      )}
                    >
                      <option value="">
                        Select class
                      </option>

                      {standards?.map(
                        (standard, index) => {
                          const value =
                            getMasterValue(
                              standard
                            );

                          return (
                            <option
                              key={
                                standard?.id ??
                                value ??
                                index
                              }
                              value={value}
                            >
                              {getMasterLabel(
                                standard
                              )}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {errors.studentClass && (
                      <small className="text-danger">
                        {errors.studentClass}
                      </small>
                    )}
                  </div>

                  {/* SECTION */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Section
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                      className="form-select"
                      style={inputStyle(
                        "section"
                      )}
                    >
                      <option value="">
                        Select section
                      </option>

                      {sections?.map(
                        (section, index) => {
                          const value =
                            getMasterValue(
                              section
                            );

                          return (
                            <option
                              key={
                                section?.id ??
                                value ??
                                index
                              }
                              value={value}
                            >
                              {getMasterLabel(
                                section
                              )}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {errors.section && (
                      <small className="text-danger">
                        {errors.section}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
                  PERIOD INFORMATION
              ================================================= */}

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background:
                        "linear-gradient(#10b981,#34d399)",
                      borderRadius: "10px",
                    }}
                  />

                  <h6 className="fw-bold mb-0">
                    Period Information
                  </h6>
                </div>

                <div className="row g-3">

                  {/* DAY */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Day
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="day"
                      value={form.day}
                      onChange={handleChange}
                      className="form-select"
                      style={inputStyle("day")}
                    >
                      <option value="">
                        Select day
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

                    {errors.day && (
                      <small className="text-danger">
                        {errors.day}
                      </small>
                    )}
                  </div>

                  {/* PERIOD */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Period Number
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuHash
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <input
                        type="number"
                        min="1"
                        max="20"
                        name="periodNumber"
                        value={
                          form.periodNumber
                        }
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. 1"
                        style={{
                          ...inputStyle(
                            "periodNumber"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      />
                    </div>

                    {errors.periodNumber && (
                      <small className="text-danger">
                        {errors.periodNumber}
                      </small>
                    )}
                  </div>

                  {/* ROOM */}

                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Room No
                      <span className="text-muted fw-normal">
                        {" "}(Optional)
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuMapPin
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <input
                        type="text"
                        name="roomNo"
                        value={form.roomNo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Room 101"
                        style={{
                          ...inputStyle(
                            "roomNo"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SUBJECT & TEACHER
              ================================================= */}

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background:
                        "linear-gradient(#8b5cf6,#a78bfa)",
                      borderRadius: "10px",
                    }}
                  />

                  <h6 className="fw-bold mb-0">
                    Subject & Teacher
                  </h6>
                </div>

                <div className="row g-3">

                  {/* SUBJECT */}

                  <div className="col-xl-6 col-md-6">
                    <label className="form-label fw-semibold">
                      Subject
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuBookOpen
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <select
                        name="subjectId"
                        value={
                          form.subjectId
                        }
                        onChange={handleChange}
                        className="form-select"
                        style={{
                          ...inputStyle(
                            "subjectId"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      >
                        <option value="">
                          {loadingSubjects
                            ? "Loading subjects..."
                            : "Select subject"}
                        </option>

                        {subjects.map(
                          (
                            subject,
                            index
                          ) => (
                            <option
                              key={
                                subject.id ??
                                index
                              }
                              value={
                                subject.id
                              }
                            >
                              {subject.name ||
                                subject.subjectName ||
                                subject.title ||
                                "-"}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {errors.subjectId && (
                      <small className="text-danger">
                        {errors.subjectId}
                      </small>
                    )}
                  </div>

                  {/* TEACHER */}

                  <div className="col-xl-6 col-md-6">
                    <label className="form-label fw-semibold">
                      Teacher
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuUserRound
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <select
                        name="teacherId"
                        value={
                          form.teacherId
                        }
                        onChange={handleChange}
                        className="form-select"
                        style={{
                          ...inputStyle(
                            "teacherId"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      >
                        <option value="">
                          {loadingTeachers
                            ? "Loading teachers..."
                            : "Select teacher"}
                        </option>

                        {teachers.map(
                          (
                            teacher,
                            index
                          ) => (
                            <option
                              key={
                                teacher.id ??
                                index
                              }
                              value={
                                teacher.id
                              }
                            >
                              {teacher.name ||
                                teacher.employeeName ||
                                `${teacher.firstName || ""} ${teacher.lastName || ""}`
                                  .replace(
                                    /\s+/g,
                                    " "
                                  )
                                  .trim() ||
                                "-"}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {errors.teacherId && (
                      <small className="text-danger">
                        {errors.teacherId}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
                  TIME INFORMATION
              ================================================= */}

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background:
                        "linear-gradient(#f59e0b,#fbbf24)",
                      borderRadius: "10px",
                    }}
                  />

                  <h6 className="fw-bold mb-0">
                    Period Timing
                  </h6>
                </div>

                <div className="row g-3">

                  {/* START */}

                  <div className="col-xl-6 col-md-6">
                    <label className="form-label fw-semibold">
                      Start Time
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuClock3
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <input
                        type="time"
                        name="startTime"
                        value={
                          form.startTime
                        }
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          ...inputStyle(
                            "startTime"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      />
                    </div>

                    {errors.startTime && (
                      <small className="text-danger">
                        {errors.startTime}
                      </small>
                    )}
                  </div>

                  {/* END */}

                  <div className="col-xl-6 col-md-6">
                    <label className="form-label fw-semibold">
                      End Time
                      <span className="text-danger">
                        {" "}*
                      </span>
                    </label>

                    <div className="position-relative">
                      <LuClock3
                        size={17}
                        style={{
                          position:
                            "absolute",
                          left: "13px",
                          top: "50%",
                          transform:
                            "translateY(-50%)",
                          color: "#94a3b8",
                          zIndex: 2,
                        }}
                      />

                      <input
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="form-control"
                        style={{
                          ...inputStyle(
                            "endTime"
                          ),
                          paddingLeft:
                            "38px",
                        }}
                      />
                    </div>

                    {errors.endTime && (
                      <small className="text-danger">
                        {errors.endTime}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div className="mb-2">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "4px",
                      height: "22px",
                      background:
                        "linear-gradient(#059669,#34d399)",
                      borderRadius: "10px",
                    }}
                  />

                  <h6 className="fw-bold mb-0">
                    Status
                  </h6>
                </div>

                <div className="row g-3">
                  <div className="col-xl-4 col-md-6">
                    <label className="form-label fw-semibold">
                      Timetable Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="form-select"
                      style={inputStyle(
                        "status"
                      )}
                    >
                      <option value="ACTIVE">
                        Active
                      </option>

                      <option value="INACTIVE">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM FOOTER
            ================================================= */}

            <div
              className="p-3 p-md-4 d-flex flex-wrap justify-content-end gap-2"
              style={{
                background:
                  "linear-gradient(135deg,#f8fafc,#f8fbff)",
                borderTop:
                  "1px solid #edf2f7",
              }}
            >
              <button
                type="button"
                className="btn d-flex align-items-center gap-2"
                onClick={handleReset}
                disabled={loading}
                style={{
                  background: "#fff",
                  color: "#475569",
                  border:
                    "1px solid #dbe3ef",
                  borderRadius: "9px",
                  padding: "9px 17px",
                }}
              >
                <LuRotateCcw size={17} />
                Reset
              </button>

              <button
                type="button"
                className="btn d-flex align-items-center gap-2"
                onClick={() =>
                  navigate("/setup/timetable")
                }
                disabled={loading}
                style={{
                  background: "#fff",
                  color: "#64748b",
                  border:
                    "1px solid #dbe3ef",
                  borderRadius: "9px",
                  padding: "9px 17px",
                }}
              >
                <LuArrowLeft size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="btn d-flex align-items-center gap-2 text-white"
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  border: "none",
                  borderRadius: "9px",
                  padding: "9px 19px",
                  boxShadow:
                    "0 6px 15px rgba(37,99,235,.20)",
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <LuSave size={17} />
                    Save Timetable
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTimeTable;

