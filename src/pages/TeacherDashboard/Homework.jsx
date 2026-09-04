import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  LuBookOpen,
  LuCalendarDays,
  LuClock3,
  LuImagePlus,
  LuSend,
  LuSchool,
  LuUpload,
  LuX,
  LuRefreshCw,
} from "react-icons/lu";
import { FaChalkboardTeacher } from "react-icons/fa";
import useMasters from "../../hooks/useMasters";
import { TbCrystalBall } from "react-icons/tb";

const Homework = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const schoolId = localStorage.getItem("schoolId") || user?.schoolId;

  const teacherId = user?.teacherId;
  const { sessions, standards } = useMasters();

  const [academicYear, setAcademicYear] = useState("");

  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    studentClass: "",
    section: "",
    subject: "",
    homeworkDate: "",
    submissionDate: "",
    homeworkType: "TEXT",
    homeworkText: "",
    image: null,
  });

  // =========================================================
  // CURRENT ACADEMIC YEAR
  // =========================================================

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startYear = month >= 4 ? year : year - 1;

    setAcademicYear(`${startYear}-${startYear + 1}`);
  }, []);

  // =========================================================
  // TODAY DATE
  // =========================================================

  useEffect(() => {
    const today = new Date();

    const date = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    setForm((prev) => ({
      ...prev,
      homeworkDate: date,
    }));
  }, []);

  // =========================================================
  // LOAD TEACHER ASSIGNMENTS
  // =========================================================

  const loadAssignments = async () => {
    if (!schoolId || !teacherId || !academicYear) {
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
            teacherId: Number(teacherId),
            academicYear,
          },
        },
      );

      const data = Array.isArray(response.data) ? response.data : [];

      setAssignments(data.filter((item) => item.active !== false));
    } catch (err) {
      console.error("Assignment loading error:", err.response?.data || err);

      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
    loadHomeworkList();
  }, [schoolId, teacherId, academicYear]);

  console.log("assignments", assignments);
  // =========================================================
  // SECTIONS
  // =========================================================

  const sections = [
    ...new Set(
      assignments
        .filter(
          (item) => String(item.studentClass) === String(form.studentClass),
        )
        .map((item) => item.section)
        .filter(Boolean),
    ),
  ];

  // =========================================================
  // SUBJECTS
  // =========================================================

  const subjects = [
    ...new Map(
      assignments
        .filter(
          (item) =>
            String(item.studentClass) === String(form.studentClass) &&
            (!form.section || String(item.section) === String(form.section)) &&
            item.subject,
        )
        .map((item) => [String(item.subject), item.subject]),
    ).values(),
  ];

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =========================================================
  // CLASS CHANGE
  // =========================================================

  const handleClassChange = (e) => {
    setForm((prev) => ({
      ...prev,
      studentClass: e.target.value,
      section: "",
      subject: "",
    }));

    setMessage("");
    setError("");
  };

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5 MB.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setError("");
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // =========================================================
  // SUBJECT FORMAT
  // =========================================================

  const formatSubject = (subject) => {
    if (!subject) return "-";

    return String(subject)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    const today = new Date();

    const date = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    setForm({
      studentClass: "",
      section: "",
      subject: "",
      homeworkDate: date,
      submissionDate: "",
      homeworkType: "TEXT",
      homeworkText: "",
      image: null,
    });

    setMessage("");
    setError("");
  };

  // =========================================================
  // SAVE HOMEWORK
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.studentClass) {
      setError("Please select class.");
      return;
    }

    if (!form.section) {
      setError("Please select section.");
      return;
    }

    if (!form.subject) {
      setError("Please select subject.");
      return;
    }

    if (!form.homeworkDate) {
      setError("Please select homework date.");
      return;
    }

    if (!form.submissionDate) {
      setError("Please select submission date.");
      return;
    }

    if (form.homeworkType === "TEXT" && !form.homeworkText.trim()) {
      setError("Please enter homework.");
      return;
    }

    if (form.homeworkType === "IMAGE" && !form.image) {
      setError("Please upload homework image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("schoolId", Number(schoolId));

      formData.append("teacherId", Number(teacherId));

      formData.append("academicYear", academicYear);

      formData.append("studentClass", form.studentClass);

      formData.append("section", form.section);

      formData.append("subject", form.subject);

      formData.append("homeworkDate", form.homeworkDate);

      formData.append("submissionDate", form.submissionDate);

      formData.append("homeworkType", form.homeworkType);

      if (form.homeworkText.trim()) {
        formData.append("homeworkText", form.homeworkText.trim());
      }

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await axiosInstance.post("/api/homework/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Homework saved:", response.data);

      setMessage("Homework added successfully.");

      resetForm();
    } catch (err) {
      console.error("Homework save error:", err.response?.data || err);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to add homework.",
      );
    } finally {
      setSaving(false);
    }
  };

  const [homework, setHomework] = useState([]);

  const loadHomeworkList = async () => {
    if (!schoolId && !teacherId) return;

    try {
      const res = await axiosInstance.get("/api/homework/teacher", {
        params: {
          schoolId,
          teacherId,
          academicYear,
        },
      });
      setHomework(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  console.log("homework list", homework);
  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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
                  <LuBookOpen size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">Add Homework</h5>

                  <div className="text-muted small">
                    Dashboard &nbsp;/&nbsp; Homework &nbsp;/&nbsp; Add Homework
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
                  <FaChalkboardTeacher className="me-1" />
                  Teacher Dashboard
                </span>

                <button
                  type="button"
                  onClick={loadAssignments}
                  className="btn btn-sm"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: "1px solid #bfdbfe",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                  title="Refresh"
                >
                  <LuRefreshCw size={17} />
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
              Home &nbsp;›&nbsp; Dashboard &nbsp;›&nbsp; Homework &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">Add Homework</span>
            </small>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-2 mb-3">
        {/* ================================================= */}
        {/* ALERT */}
        {/* ================================================= */}

        {message && (
          <div
            className="alert mb-3"
            style={{
              borderRadius: 12,
              border: "1px solid #a7f3d0",
              background: "#ecfdf5",
              color: "#047857",
            }}
          >
            {message}
          </div>
        )}

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
        {/* FORM */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow mb-3"
          style={{
            boxShadow: "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex align-items-center gap-2 mb-4">
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
                  Homework Details
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  Add homework for a specific class and section
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-3">
                  <label className="form-label small fw-semibold">
                    Sessions
                  </label>

                  <select
                    name="academicYear"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    disabled
                    className="form-control"
                    style={{
                      minHeight: 44,
                      border: "1px solid #dbeafe",
                      borderRadius: 12,
                    }}
                  >
                    <option value="">Select Sessions</option>

                    {sessions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CLASS */}

                <div className="col-12 col-md-3">
                  <label className="form-label small fw-semibold">Class</label>

                  <select
                    name="studentClass"
                    value={form.studentClass}
                    onChange={handleClassChange}
                    className="form-control"
                    style={{
                      minHeight: 44,
                      border: "1px solid #dbeafe",
                      borderRadius: 12,
                    }}
                  >
                    <option value="">Select Class</option>

                    {standards.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SECTION */}

                <div className="col-12 col-md-3">
                  <label className="form-label small fw-semibold">
                    Section
                  </label>

                  <select
                    name="section"
                    value={form.section}
                    onChange={handleChange}
                    disabled={!form.studentClass}
                    className="form-control"
                    style={{
                      minHeight: 44,
                      border: "1px solid #dbeafe",
                      borderRadius: 12,
                    }}
                  >
                    <option value="">Select Section</option>

                    {sections.map((section) => (
                      <option key={section} value={section}>
                        Section {section}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SUBJECT */}

                <div className="col-12 col-md-3">
                  <label className="form-label small fw-semibold">
                    Subject
                  </label>

                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={!form.studentClass || !form.section}
                    className="form-control"
                    style={{
                      minHeight: 44,
                      border: "1px solid #dbeafe",
                      borderRadius: 12,
                    }}
                  >
                    <option value="">Select Subject</option>

                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {formatSubject(subject)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* HOMEWORK DATE */}

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">
                    Homework Date
                  </label>

                  <div className="position-relative">
                    <LuCalendarDays
                      size={18}
                      style={{
                        position: "absolute",
                        left: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#2563eb",
                      }}
                    />

                    <input
                      type="date"
                      name="homeworkDate"
                      value={form.homeworkDate}
                      onChange={handleChange}
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

                {/* SUBMISSION DATE */}

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">
                    Submission Date
                  </label>

                  <div className="position-relative">
                    <LuClock3
                      size={18}
                      style={{
                        position: "absolute",
                        left: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#2563eb",
                      }}
                    />

                    <input
                      type="date"
                      name="submissionDate"
                      value={form.submissionDate}
                      min={form.homeworkDate}
                      onChange={handleChange}
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

                {/* TYPE */}

                <div className="col-12">
                  <label className="form-label small fw-semibold">
                    Homework Type
                  </label>

                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            homeworkType: "TEXT",
                          }))
                        }
                        className="w-100 text-start"
                        style={{
                          background:
                            form.homeworkType === "TEXT"
                              ? "#eff6ff"
                              : "#f8fbff",
                          border:
                            form.homeworkType === "TEXT"
                              ? "1px solid #2563eb"
                              : "1px solid #dbeafe",
                          borderRadius: 14,
                          padding: 14,
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
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
                            <LuBookOpen size={20} />
                          </div>

                          <div>
                            <div
                              className="fw-bold"
                              style={{
                                color: "#334155",
                              }}
                            >
                              Text Homework
                            </div>

                            <div
                              style={{
                                fontSize: 12,
                                color: "#64748b",
                              }}
                            >
                              Write homework directly
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            homeworkType: "IMAGE",
                          }))
                        }
                        className="w-100 text-start"
                        style={{
                          background:
                            form.homeworkType === "IMAGE"
                              ? "#eff6ff"
                              : "#f8fbff",
                          border:
                            form.homeworkType === "IMAGE"
                              ? "1px solid #2563eb"
                              : "1px solid #dbeafe",
                          borderRadius: 14,
                          padding: 14,
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
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
                            <LuImagePlus size={20} />
                          </div>

                          <div>
                            <div
                              className="fw-bold"
                              style={{
                                color: "#334155",
                              }}
                            >
                              Image Homework
                            </div>

                            <div
                              style={{
                                fontSize: 12,
                                color: "#64748b",
                              }}
                            >
                              Upload homework image
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* TEXT HOMEWORK */}

                {form.homeworkType === "TEXT" && (
                  <div className="col-12">
                    <label className="form-label small fw-semibold">
                      Homework
                    </label>

                    <textarea
                      name="homeworkText"
                      value={form.homeworkText}
                      onChange={handleChange}
                      rows={7}
                      placeholder="Write homework here..."
                      className="form-control"
                      style={{
                        border: "1px solid #dbeafe",
                        borderRadius: 12,
                        resize: "vertical",
                      }}
                    />

                    <small className="text-muted">
                      You can write questions, instructions, exercises, etc.
                    </small>
                  </div>
                )}

                {/* IMAGE HOMEWORK */}

                {form.homeworkType === "IMAGE" && (
                  <div className="col-12">
                    <label className="form-label small fw-semibold">
                      Homework Image
                    </label>

                    {!form.image ? (
                      <label
                        htmlFor="homeworkImage"
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{
                          minHeight: 180,
                          background: "#f8fbff",
                          border: "2px dashed #bfdbfe",
                          borderRadius: 14,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mb-2"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 13,
                            background: "#eff6ff",
                            color: "#2563eb",
                          }}
                        >
                          <LuUpload size={23} />
                        </div>

                        <div
                          className="fw-semibold"
                          style={{
                            color: "#334155",
                          }}
                        >
                          Click to upload
                        </div>

                        <small className="text-muted mt-1">
                          JPG, PNG or WEBP • Maximum 5 MB
                        </small>

                        <input
                          id="homeworkImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                    ) : (
                      <div
                        className="p-3"
                        style={{
                          background: "#f8fbff",
                          border: "1px solid #dbeafe",
                          borderRadius: 14,
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <LuImagePlus color="#2563eb" />

                            <span
                              className="small fw-semibold"
                              style={{
                                color: "#334155",
                              }}
                            >
                              {form.image.name}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={removeImage}
                            className="btn btn-sm"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca",
                            }}
                          >
                            <LuX size={16} />
                          </button>
                        </div>

                        <img
                          src={URL.createObjectURL(form.image)}
                          alt="Homework preview"
                          style={{
                            width: "100%",
                            maxHeight: 350,
                            objectFit: "contain",
                            borderRadius: 10,
                            background: "#fff",
                            border: "1px solid #dbeafe",
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* BUTTONS */}

                <div className="col-12">
                  <div className="d-flex flex-wrap justify-content-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn"
                      style={{
                        minHeight: 42,
                        borderRadius: 11,
                        border: "1px solid #dbeafe",
                        background: "#fff",
                        color: "#475569",
                        padding: "8px 18px",
                      }}
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="btn"
                      style={{
                        minHeight: 42,
                        borderRadius: 11,
                        background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                        color: "#fff",
                        border: "none",
                        padding: "8px 20px",
                        boxShadow: "0 6px 16px rgba(37,99,235,.20)",
                      }}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <LuSend size={17} className="me-2" />
                          Add Homework
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ================================================= */}
        {/* INFO */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow"
          style={{
            boxShadow: "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3">
            <div className="d-flex align-items-start gap-3">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
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

              <div>
                <div
                  className="fw-bold mb-1"
                  style={{
                    color: "#334155",
                  }}
                >
                  Homework Assignment
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  Homework will be assigned only to the selected class and
                  section. Students can view the homework along with the subject
                  and submission date.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border rounded-4 shadow mt-3">
          <div className="card-body p-3">
            <div className="d-flex align-items-start gap-3">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
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
              <div>
                <div
                  className="fw-bold mb-1"
                  style={{
                    color: "#334155",
                  }}
                >
                  Homework List
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  Daily Homework list
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr className="small text-center">
                    <th>#</th>
                    <th>Academic Year</th>
                    <th>Class / section</th>
                    <th>Subject</th>
                    <th>Homework</th>
                    <th>Homework type</th>
                    <th>Homework date</th>
                    <th>Submission Date</th>
                    <th>Image</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {homework.map((work, idx) => (
                    <tr key={idx + 1} className="text-center small">
                      <td>{idx + 1}</td>
                      <td>{work.academicYear}</td>
                      <td>
                        {work.studentClass} / {work.section}
                      </td>
                      <td>
                        <span className="badge bg-primary rounded-pill">
                          {work.subject}
                        </span>
                      </td>
                      <td>{work.homeworkText}</td>
                      <td>{work.homeworkType}</td>
                      <td>{work.homeworkDate}</td>
                      <td>{work.submissionDate}</td>
                      <td>{work.image}</td>
                      <td>
                        <span
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: work.active
                              ? "#dcfce7"
                              : "#f1f5f9",
                            color: work.active ? "#15803d" : "#64748b",
                            padding: "7px 12px",
                          }}
                        >
                          {work.active ? "true" : "false"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .form-control:focus {
            border-color: #60a5fa !important;
            box-shadow: 0 0 0 3px rgba(96,165,250,.12) !important;
          }

          textarea.form-control {
            min-height: 150px;
          }

          @media (max-width: 767px) {
            .card-body {
              padding: 12px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Homework;
