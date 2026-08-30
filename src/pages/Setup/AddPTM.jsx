
import React, { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuClock3,
  LuUsers,
  LuMapPin,
  LuMessageSquare,
  LuSave,
  LuRotateCcw,
  LuSchool,
  LuCircleCheck,
} from "react-icons/lu";
import { MdOutlineEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const AddPTM = () => {
  const navigate = useNavigate();
  const { standards, sections, sessions } = useMasters();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    academicYear: "",
    title: "Parent Teacher Meeting",
    ptmDate: "",
    startTime: "",
    endTime: "",
    studentClass: "",
    section: "",
    venue: "",
    teacherName: "",
    description: "",
    status: "SCHEDULED",
  });

  /* =====================================================
     DEFAULT ACADEMIC SESSION
  ===================================================== */

  useEffect(() => {
    if (sessions?.length && !formData.academicYear) {
      const firstSession = sessions[0];

      setFormData((prev) => ({
        ...prev,
        academicYear:
          firstSession?.name ||
          firstSession?.value ||
          firstSession ||
          "",
      }));
    }
  }, [sessions]);

  /* =====================================================
     INPUT HANDLER
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setFormData({
      academicYear: "",
      title: "Parent Teacher Meeting",
      ptmDate: "",
      startTime: "",
      endTime: "",
      studentClass: "",
      section: "",
      venue: "",
      teacherName: "",
      description: "",
      status: "SCHEDULED",
    });

    if (sessions?.length) {
      const firstSession = sessions[0];

      setFormData((prev) => ({
        ...prev,
        academicYear:
          firstSession?.name ||
          firstSession?.value ||
          firstSession ||
          "",
      }));
    }
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    if (!formData.academicYear) {
      alert("Please select academic year.");
      return false;
    }

    if (!formData.title.trim()) {
      alert("Please enter PTM title.");
      return false;
    }

    if (!formData.ptmDate) {
      alert("Please select PTM date.");
      return false;
    }

    if (!formData.startTime) {
      alert("Please select start time.");
      return false;
    }

    if (!formData.endTime) {
      alert("Please select end time.");
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      alert("End time must be greater than start time.");
      return false;
    }

    if (!formData.studentClass) {
      alert("Please select class.");
      return false;
    }

    if (!formData.section) {
      alert("Please select section.");
      return false;
    }

    return true;
  };

  /* =====================================================
     CREATE PTM
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.schoolId || !token) {
      alert("School information or authentication token not found.");
      return;
    }

    if (!validateForm()) return;

    const payload = {
      schoolId: user.schoolId,
      academicYear: formData.academicYear,
      title: formData.title.trim(),
      ptmDate: formData.ptmDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      studentClass: formData.studentClass,
      section: formData.section,
      venue: formData.venue.trim(),
      teacherName: formData.teacherName.trim(),
      description: formData.description.trim(),
      status: formData.status,
    };

    try {
      setLoading(true);

      /*
       * Change this endpoint according to your backend.
       */
      await axios.post("/api/ptm/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("PTM created successfully.");

      navigate("/setup/ptm");
    } catch (error) {
      console.error("Error creating PTM:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to create PTM."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     MASTER OPTIONS
  ===================================================== */

  const getValue = (item) => {
    if (typeof item === "string") return item;

    return (
      item?.name ||
      item?.value ||
      item?.label ||
      item?.code ||
      ""
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

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
              <div className="d-flex align-items-center gap-3">
                {/* ICON */}

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
                  <MdOutlineEventAvailable size={28} />
                </div>

                {/* TITLE */}

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Add Parent Teacher Meeting
                  </h5>

                  <div className="text-muted small">
                    Setup &nbsp;/&nbsp; PTM &nbsp;/&nbsp; Add PTM
                  </div>
                </div>
              </div>

              {/* BACK BUTTON */}

              <button
                type="button"
                className="btn btn-light d-flex align-items-center gap-2"
                onClick={() => navigate("/setup/ptm")}
                style={{
                  border: "1px solid #dbe3ef",
                  borderRadius: "10px",
                  padding: "9px 15px",
                  color: "#334155",
                }}
              >
                <LuArrowLeft size={17} />
                Back
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
              Home &nbsp;›&nbsp; Setup &nbsp;›&nbsp; PTM &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Add PTM
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >
          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div className="d-flex align-items-center gap-3 mb-4">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #dbeafe",
              }}
            >
              <LuCalendarDays size={21} />
            </div>

            <div>
              <h5 className="fw-bold mb-1 text-dark">
                PTM Schedule
              </h5>

              <small className="text-muted">
                Create a parent teacher meeting schedule for a class
              </small>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>
            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div
              className="rounded-4 p-3 p-md-4 mb-4"
              style={{
                background:
                  "linear-gradient(135deg,#f8fbff,#f3f7fc)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuSchool
                  size={19}
                  style={{ color: "#2563eb" }}
                />

                <h6 className="fw-bold mb-0">
                  Basic Information
                </h6>
              </div>

              <div className="row g-3">
                {/* ACADEMIC YEAR */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    Academic Year
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="form-select"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  >
                    <option value="">
                      Select Academic Year
                    </option>

                    {sessions?.map((session, index) => {
                      const value = getValue(session);

                      return (
                        <option
                          key={session?.id || value || index}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* TITLE */}

                <div className="col-xl-8 col-md-6">
                  <label className="form-label fw-semibold">
                    PTM Title
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter PTM title"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                CLASS INFORMATION
            ================================================= */}

            <div
              className="rounded-4 p-3 p-md-4 mb-4"
              style={{
                background:
                  "linear-gradient(135deg,#fbfdff,#f8fafc)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuUsers
                  size={19}
                  style={{ color: "#2563eb" }}
                />

                <h6 className="fw-bold mb-0">
                  Class & Teacher
                </h6>
              </div>

              <div className="row g-3">
                {/* CLASS */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    Class
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    className="form-select"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  >
                    <option value="">
                      Select Class
                    </option>

                    {standards?.map((item, index) => {
                      const value = getValue(item);

                      return (
                        <option
                          key={item?.id || value || index}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* SECTION */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    Section
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="form-select"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  >
                    <option value="">
                      Select Section
                    </option>

                    {sections?.map((item, index) => {
                      const value = getValue(item);

                      return (
                        <option
                          key={item?.id || value || index}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* TEACHER */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    Teacher Name
                  </label>

                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter teacher name"
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                DATE & TIME
            ================================================= */}

            <div
              className="rounded-4 p-3 p-md-4 mb-4"
              style={{
                background:
                  "linear-gradient(135deg,#fffdf8,#fffaf0)",
                border: "1px solid #f1e5c7",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuClock3
                  size={19}
                  style={{ color: "#d97706" }}
                />

                <h6 className="fw-bold mb-0">
                  Date & Time
                </h6>
              </div>

              <div className="row g-3">
                {/* DATE */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    PTM Date
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="date"
                    name="ptmDate"
                    value={formData.ptmDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>

                {/* START */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    Start Time
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>

                {/* END */}

                <div className="col-xl-4 col-md-6">
                  <label className="form-label fw-semibold">
                    End Time
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                VENUE & DESCRIPTION
            ================================================= */}

            <div
              className="rounded-4 p-3 p-md-4 mb-4"
              style={{
                background:
                  "linear-gradient(135deg,#f8fbff,#f6f8ff)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuMapPin
                  size={19}
                  style={{ color: "#2563eb" }}
                />

                <h6 className="fw-bold mb-0">
                  Meeting Details
                </h6>
              </div>

              <div className="row g-3">
                {/* VENUE */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Venue
                  </label>

                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. School Auditorium / Class Room"
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  />
                </div>

                {/* STATUS */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    style={{
                      borderRadius: "9px",
                      border: "1px solid #dbe3ef",
                    }}
                  >
                    <option value="SCHEDULED">
                      Scheduled
                    </option>

                    <option value="CANCELLED">
                      Cancelled
                    </option>

                    <option value="COMPLETED">
                      Completed
                    </option>
                  </select>
                </div>

                {/* DESCRIPTION */}

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Description / Instructions
                  </label>

                  <div className="position-relative">
                    <LuMessageSquare
                      size={17}
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "15px",
                        color: "#94a3b8",
                      }}
                    />

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="form-control"
                      placeholder="Enter meeting instructions, agenda or additional information..."
                      style={{
                        paddingLeft: "38px",
                        borderRadius: "9px",
                        border: "1px solid #dbe3ef",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                INFO BOX
            ================================================= */}

            <div
              className="rounded-4 p-3 mb-4 d-flex align-items-start gap-3"
              style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#d1fae5",
                  color: "#047857",
                  flexShrink: 0,
                }}
              >
                <LuCircleCheck size={19} />
              </div>

              <div>
                <div
                  className="fw-semibold"
                  style={{ color: "#065f46" }}
                >
                  PTM will be visible to students
                </div>

                <small style={{ color: "#047857" }}>
                  After creating the meeting, it can be displayed
                  on the Student PTM page for the selected class
                  and section.
                </small>
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="d-flex flex-wrap justify-content-end gap-2 pt-2">
              <button
                type="button"
                className="btn d-flex align-items-center gap-2"
                onClick={handleReset}
                disabled={loading}
                style={{
                  background: "#fff",
                  color: "#475569",
                  border: "1px solid #dbe3ef",
                  borderRadius: "9px",
                  padding: "10px 18px",
                }}
              >
                <LuRotateCcw size={17} />
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn d-flex align-items-center gap-2 text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  border: "none",
                  borderRadius: "9px",
                  padding: "10px 20px",
                  boxShadow:
                    "0 6px 15px rgba(37,99,235,.20)",
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
                    Create PTM
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPTM;
