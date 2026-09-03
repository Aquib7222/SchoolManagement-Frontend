import React, { useEffect, useState } from "react";
import {
  LuCalendarDays,
  LuClock3,
  LuLogIn,
  LuLogOut,
  LuCircleCheck,
  LuUser,
} from "react-icons/lu";
import axiosInstance from "../../api/axiosInstance";

const TeacherSelfAttendanceCard = () => {
  const [teacher, setTeacher] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("User from localStorage:", user);

  const teacherId =
    user?.teacherId;

  const schoolId =
    user?.schoolId;

  useEffect(() => {
    if (!teacherId) return;

    fetchTodayAttendance();
  }, [teacherId]);

  console.log("Teacher ID:", teacherId);
  console.log("School ID:", schoolId);
 const fetchTodayAttendance = async () => {
  if (!teacherId || !schoolId) return;

  try {
   const response = await axiosInstance.get(
    `/api/teacher-attendance/today/${teacherId}`,
    {
        params: {
            schoolId
        }
    }
);

setAttendance(response.data);

    if (response.data?.teacher) {
      setTeacher(response.data.teacher);
    }
  } catch (error) {
    console.error(
      "Today's attendance error:",
      error
    );

    setAttendance(null);
  }
};
  console.log("teacher attendance",attendance);

  const handleCheckIn = async () => {
    if (!teacherId || !schoolId) {
      alert("Teacher or school information not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/teacher-attendance/check-in",
        null,
        {
          params: {
            teacherId,
            schoolId,
          },
        }
      );

      setAttendance(response.data);

      if (response.data?.teacher) {
        setTeacher(response.data.teacher);
      }

      alert("Check-in successful.");
    } catch (error) {
      console.error("Check-in error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to check in."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);

      const response = await axiosInstance.post(
  "/api/teacher-attendance/check-out",
  null,
  {
    params: {
      teacherId,
      schoolId,
    },
  }
);

      setAttendance(response.data);

      alert("Check-out successful.");
    } catch (error) {
      console.error("Check-out error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to check out."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateTime) => {
    if (!dateTime) return "--:--";

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return dateTime;
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTeacherName = () => {
    if (teacher) {
      return (
        `${teacher.firstName || ""} ${
          teacher.lastName || ""
        }`.trim() ||
        teacher.name ||
        "Teacher"
      );
    }

    return (
      user?.teacherName ||
      user?.name ||
      user?.username ||
      "Teacher"
    );
  };

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hasCheckedIn = !!attendance?.checkInTime;
  const hasCheckedOut = !!attendance?.checkOutTime;

  return (
    <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">
  <div
    style={{
      background:
        "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
    }}
  >
    <div className="p-4 p-lg-4">
      <div className="row align-items-center g-4">

        {/* LEFT */}
        <div className="col-lg-5">
          <div className="d-flex align-items-center gap-3">

            {/* ICON */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{
                width: "64px",
                height: "64px",
                background:
                  "linear-gradient(135deg,#dbeafe,#eff6ff)",
                border: "1px solid #bfdbfe",
                color: "#2563eb",
              }}
            >
              <LuUser size={30} />
            </div>

            <div>
              <div
                className="small mb-1 fw-semibold"
                style={{
                  color: "#64748b",
                  letterSpacing: "0.2px",
                }}
              >
                Teacher Self Attendance
              </div>

              <h4
                className="fw-bold mb-1"
                style={{
                  color: "#0f172a",
                }}
              >
                {getTeacherName()}
              </h4>

              <div
                className="d-flex align-items-center gap-2 small"
                style={{
                  color: "#64748b",
                }}
              >
                <LuCalendarDays
                  size={15}
                  style={{ color: "#2563eb" }}
                />
                {formattedDate}
              </div>
            </div>

          </div>
        </div>

        {/* TIME */}
        <div className="col-lg-3">
          <div className="row g-2">

            {/* CHECK IN */}
            <div className="col-6">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  background: "#eff6ff",
                  border: "1px solid #dbeafe",
                }}
              >
                <div
                  className="small mb-1 fw-medium"
                  style={{
                    color: "#64748b",
                  }}
                >
                  Check In
                </div>

                <div
                  className="fw-bold fs-5"
                  style={{
                    color: "#1d4ed8",
                  }}
                >
                  {formatTime(attendance?.checkInTime)}
                </div>
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="col-6">
              <div
                className="rounded-3 p-3 h-100"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="small mb-1 fw-medium"
                  style={{
                    color: "#64748b",
                  }}
                >
                  Check Out
                </div>

                <div
                  className="fw-bold fs-5"
                  style={{
                    color: "#334155",
                  }}
                >
                  {formatTime(attendance?.checkOutTime)}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="col-lg-4">
          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-lg-end">

            {/* CHECK IN BUTTON */}
            <button
              type="button"
              onClick={handleCheckIn}
              disabled={loading || hasCheckedIn}
              className="btn rounded-3 fw-semibold px-4 py-3"
              style={{
                background: hasCheckedIn
                  ? "#e2e8f0"
                  : "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: hasCheckedIn
                  ? "#64748b"
                  : "#ffffff",
                border: "none",
                boxShadow: hasCheckedIn
                  ? "none"
                  : "0 4px 12px rgba(37,99,235,0.20)",
                opacity: 1,
              }}
            >
              <LuLogIn
                size={19}
                className="me-2"
              />

              {hasCheckedIn
                ? "Checked In"
                : "Check In"}
            </button>

            {/* CHECK OUT BUTTON */}
            <button
              type="button"
              onClick={handleCheckOut}
              disabled={
                loading ||
                !hasCheckedIn ||
                hasCheckedOut
              }
              className="btn rounded-3 fw-semibold px-4 py-3"
              style={{
                background: hasCheckedOut
                  ? "#ecfdf5"
                  : "#ffffff",
                color: hasCheckedOut
                  ? "#16a34a"
                  : !hasCheckedIn
                  ? "#94a3b8"
                  : "#334155",
                border: hasCheckedOut
                  ? "1px solid #bbf7d0"
                  : "1px solid #dbe3ef",
                boxShadow: !hasCheckedIn
                  ? "none"
                  : "0 2px 8px rgba(15,23,42,0.05)",
                opacity: !hasCheckedIn ? 0.7 : 1,
              }}
            >
              <LuLogOut
                size={19}
                className="me-2"
              />

              {hasCheckedOut
                ? "Checked Out"
                : "Check Out"}
            </button>

          </div>

          {/* STATUS */}
          <div className="text-lg-end mt-3">

            {hasCheckedOut ? (
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#ecfdf5",
                  color: "#15803d",
                  border: "1px solid #bbf7d0",
                  fontWeight: 600,
                }}
              >
                <LuCircleCheck
                  size={14}
                  className="me-1"
                />
                Attendance Completed
              </span>

            ) : hasCheckedIn ? (
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  fontWeight: 600,
                }}
              >
                <LuClock3
                  size={14}
                  className="me-1"
                />
                Currently Checked In
              </span>

            ) : (
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                  fontWeight: 600,
                }}
              >
                Mark your attendance
              </span>
            )}

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default TeacherSelfAttendanceCard;