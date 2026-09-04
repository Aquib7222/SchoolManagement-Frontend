import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";

import axiosInstance from "../../api/axiosInstance";

const CardHead = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const schoolId = user?.schoolId;
  const teacherId = user?.teacherId;

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingTodayAttendance, setLoadingTodayAttendance] = useState(false);

  const [error, setError] = useState("");

  const getCurrentAcademicYear = () => {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;

    return `${startYear}-${startYear + 1}`;
  };

  const getTodayDay = () => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    return days[new Date().getDay()];
  };

  const academicYear = getCurrentAcademicYear();
  const selectedDay = getTodayDay();
  const [todayattendance, setTodayAttendance] = useState([]);
  const [yesterdayattendance, setYesterdayAttendance] = useState([]);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!schoolId || !teacherId) {
        setAssignments([]);
        return;
      }

      try {
        setLoadingAssignments(true);
        setError("");

        const response = await axiosInstance.get(
          "/api/teacher-class-assignment/teacher/day",
          {
            params: {
              schoolId: Number(schoolId),
              academicYear,
              teacherId: Number(teacherId),
              dayOfWeek: selectedDay,
            },
          },
        );

        console.log("Teacher Day Assignments:", response.data);

        const data = Array.isArray(response.data) ? response.data : [];

        // Only active assignments
        setAssignments(data.filter((item) => item.active !== false));
      } catch (err) {
        console.error("Teacher assignment error:", err.response?.data || err);

        setAssignments([]);

        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Unable to load teacher classes.",
        );
      } finally {
        setLoadingAssignments(false);
      }
    };

    loadAssignments();
  }, [schoolId, teacherId, academicYear, selectedDay]);

  const todayDate = new Date();
  const formattedDate = todayDate.toISOString().split("T")[0];

  console.log(formattedDate);
  console.log("Today's Date:", todayDate);
  useEffect(() => {
    const loadAttendance = async () => {
      if (!schoolId) {
        setTodayAttendance([]);
        return;
      }
      try {
        setLoadingTodayAttendance(true);
        const response = await axiosInstance.get(
          "/api/student/attendance/school",
          {
            params: {
              schoolId: Number(schoolId),
            },
          },
        );
        const data = response.data.filter(
          (item) =>
            item.attendanceDate === formattedDate && item.status === "PRESENT",
        );
        const yesterdayData = response.data.filter((item) => {
          const attendanceDate = new Date(item.attendanceDate);
          const yesterday = new Date(todayDate);
          yesterday.setDate(yesterday.getDate() - 1);
          return (
            attendanceDate.toISOString().split("T")[0] ===
              yesterday.toISOString().split("T")[0] && item.status === "PRESENT"
          );
        });
        setTodayAttendance(data);
        setYesterdayAttendance(yesterdayData);
      } catch (error) {
        console.error(
          "Attendance loading error:",
          error.response?.data || error,
        );
      }
    };

    loadAttendance();
  }, [schoolId]);
  console.log("Today's Attendance Data:", todayattendance);
  console.log("Yesterday's Attendance Data:", yesterdayattendance);

  const attendanceChange =
    yesterdayattendance.length > 0
      ? ((todayattendance.length - yesterdayattendance.length) /
          yesterdayattendance.length) *
        100
      : null;

  useEffect(() => {
    const loadStudents = async () => {
      if (!schoolId) {
        setStudents([]);
        return;
      }

      try {
        setLoadingStudents(true);

        const response = await axiosInstance.get("/api/students/school", {
          params: {
            schoolId: Number(schoolId),
          },
        });

        console.log("School Students:", response.data);

        const data = Array.isArray(response.data) ? response.data : [];

        setStudents(data);
      } catch (err) {
        console.error("Students loading error:", err.response?.data || err);

        setStudents([]);
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, [schoolId]);

  const myClasses = useMemo(() => {
    if (!assignments.length) {
      return [];
    }

    const uniqueMap = new Map();

    assignments.forEach((assignment) => {
      const studentClass = assignment.studentClass?.toString().trim() || "";

      const section = assignment.section?.toString().trim() || "";

      if (!studentClass) {
        return;
      }

      const key = `${studentClass}-${section}`;

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          studentClass,
          section,
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [assignments]);

  const myClassNames = useMemo(() => {
    return myClasses
      .map((item) => {
        return item.section
          ? `${item.studentClass}-${item.section}`
          : item.studentClass;
      })
      .join(", ");
  }, [myClasses]);

  const totalStudents = students.length;

  return (
    <>
      <div className="container-fluid px-0">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-blue h-100">
              <div className="stat-icon">
                <FaGraduationCap />
              </div>

              <div className="stat-content">
                <span>My Classes</span>

                <h3>{loadingAssignments ? "..." : myClasses.length}</h3>

                <small>
                  {loadingAssignments
                    ? "Loading classes..."
                    : error
                      ? "Unable to load classes"
                      : myClassNames
                        ? `| ${myClassNames}`
                        : "| No classes today"}
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              2. TOTAL STUDENTS
          ================================================= */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-green h-100">
              <div className="stat-icon">
                <FaChalkboardTeacher />
              </div>

              <div className="stat-content">
                <span>Total Students</span>

                <h3>{loadingStudents ? "..." : totalStudents}</h3>

                <small>All students</small>
              </div>
            </div>
          </div>

          {/* =================================================
              3. TODAY'S ATTENDANCE
          ================================================= */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-orange h-100">
              <div className="stat-icon">
                <FaCalendarCheck />
              </div>

              <div className="stat-content">
                <span>Today's Attendance</span>

                <h3>
                  {todayattendance.length}
                </h3>

                <small
                  className={
                    attendanceChange === null
                      ? "text-muted"
                      : attendanceChange >= 0
                        ? "text-success"
                        : "text-danger"
                  }
                >
                  {attendanceChange === null
                    ? "No data available"
                    : attendanceChange >= 0
                      ? `↑ ${Math.abs(attendanceChange).toFixed(1)}% more than yesterday`
                      : `↓ ${Math.abs(attendanceChange).toFixed(1)}% less than yesterday`}
                </small>
              </div>
            </div>
          </div>

          {/* =================================================
              4. PENDING WORK
          ================================================= */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-red h-100">
              <div className="stat-icon">
                <MdMessage />
              </div>

              <div className="stat-content">
                <span>Pending Work</span>

                <h3>3</h3>

                <small>| 3 Classes</small>
              </div>
            </div>
          </div>

          {/* =================================================
              5. PENDING EVALUATION
          ================================================= */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="premium-stat-card shadow stat-blue h-100">
              <div className="stat-icon">
                <RiDraftFill />
              </div>

              <div className="stat-content">
                <span>Pending Evaluation</span>

                <h3>2</h3>

                <small>| 3 Evaluations</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHead;
