import React, { useEffect, useState } from "react";
import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";

import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

import axiosInstance from "../../api/axiosInstance";

const TimeTableAttendanceNotice = () => {
  const schoolId = localStorage.getItem("schoolId");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const teacherId = user?.teacherId;

  const getCurrentAcademicYear = () => {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    let startYear;

    if (currentMonth >= 4) {
      startYear = currentYear;
    } else {
      startYear = currentYear - 1;
    }

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



  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [academicYear] = useState(getCurrentAcademicYear());

  const [selectedDay] = useState(getTodayDay());


  const loadAssignments = async () => {
    if (!schoolId || !teacherId || !academicYear || !selectedDay) {
      console.log("Missing required values:", {
        schoolId,
        teacherId,
        academicYear,
        selectedDay,
      });

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
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to load teacher classes.",
      );

      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("Assignments:", assignments);


  useEffect(() => {
    loadAssignments();
  }, [schoolId, teacherId, academicYear, selectedDay]);

  

  const quickActions = [
    {
      title: "Mark Attendance",
      icon: <BsFillCalendar2CheckFill size={21} />,
      className: "alert-success",
    },

    {
      title: "Add Homework",
      icon: <IoBookOutline size={21} />,
      className: "alert-info",
    },

    {
      title: "Create Assignment",
      icon: <MdOutlineAssignment size={21} />,
      className: "alert-primary",
    },

    {
      title: "Enter Marks",
      icon: <BiEdit size={21} />,
      className: "alert-warning",
    },

    {
      title: "Notice To Class",
      icon: <FaBullhorn size={21} />,
      className: "alert-danger",
    },

    {
      title: "View Reports",
      icon: <HiOutlineDocumentReport size={21} />,
      className: "alert-secondary",
    },
  ];

 

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    const [hours, minutes] = time.split(":");

    let hour = Number(hours);

    const amPm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${String(hour).padStart(2, "0")}:${minutes} ${amPm}`;
  };

  

  return (
    <div className="container-fluid px-0 mt-3">
      <div className="row g-3">
     

        <div className="col-12 col-xl-8">
          <div className="row g-3">
           

            <div className="col-12 col-lg-6">
              <div
                className="card border-0 shadow rounded-4 h-100"
                style={{
                  overflow: "hidden",
                }}
              >
                {/* HEADER */}

                <div className="card-header bg-white border-0 pt-3 px-3">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">
                        📊 Today's Timetable
                      </h6>

                      <small className="text-muted">
                        {academicYear} •{" "}
                        {selectedDay.charAt(0) +
                          selectedDay.slice(1).toLowerCase()}
                      </small>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                    >
                      View Full
                    </button>
                  </div>
                </div>

                {/* BODY */}

                <div className="card-body px-3 pt-2">
                  {/* LOADING */}

                  {loading && (
                    <div className="text-center py-4">
                      <div
                        className="spinner-border spinner-border-sm text-primary"
                        role="status"
                      />

                      <div className="small text-muted mt-2">
                        Loading timetable...
                      </div>
                    </div>
                  )}

                  {/* ERROR */}

                  {!loading && error && (
                    <div className="alert alert-danger small mb-0">{error}</div>
                  )}

                  {/* NO DATA */}

                  {!loading && !error && assignments.length === 0 && (
                    <div className="text-center py-4">
                      <div
                        className="text-muted"
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        No classes assigned for today.
                      </div>
                    </div>
                  )}

                  {/* TABLE */}

                  {!loading && assignments.length > 0 && (
                    <div
                      className="table-responsive"
                      style={{
                        maxHeight: "280px",
                        overflowY: "auto",
                        overflowX: "auto",
                      }}
                    >
                      <table
                        className="table table-bordered table-hover align-middle mb-0"
                        style={{
                          minWidth: "600px",
                          fontSize: "13px",
                        }}
                      >
                        <thead
                          className="table-primary"
                          style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                          }}
                        >
                          <tr className="text-center">
                            <th>Period</th>

                            <th>Time</th>

                            <th>Class</th>

                            <th>Subject</th>

                            <th>Room</th>
                          </tr>
                        </thead>

                        <tbody>
                          {assignments.map((item, index) => (
                            <tr key={item.id || `${item.periodId}-${index}`}>
                              {/* PERIOD */}

                              <td className="text-center fw-semibold">
                                {item.periodName}
                              </td>

                              {/* TIME */}

                              <td className="text-center text-nowrap">
                                {formatTime(item.startTime)}

                                {" - "}

                                {formatTime(item.endTime)}
                              </td>

                              {/* CLASS */}

<td className="text-center">
  {item.studentClass}
  {item.section ? ` - ${item.section}` : ""}
</td>

                              {/* SUBJECT */}

                              <td className="text-center fw-medium">
                                {item.subject}
                              </td>

                              {/* ROOM */}

                              <td className="text-center">
                                {item.room || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                ATTENDANCE
            ================================================== */}

            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow rounded-4 h-100">
                <div className="card-header bg-white border-0 pt-3 px-3">
                  <h6 className="fw-bold mb-0 text-dark">
                    📅 Attendance Overview
                  </h6>
                </div>

                <div
                  className="card-body px-3"
                  style={{
                    minHeight: "300px",
                  }}
                >
                  <AttendanceChart />
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-3 px-3">
              <h6 className="fw-bold text-primary mb-0">📢 Quick Actions</h6>
            </div>

            <div className="card-body px-3">
              <div className="row g-4">
                {quickActions.map((action, index) => (
                  <div
                    className="col-12 col-sm-4"
                    key={`${action.title}-${index}`}
                  >
                    <button
                      type="button"
                      className={`alert ${action.className} border-0 shadow w-100 mb-0 h-100 d-flex flex-column justify-content-center align-items-center gap-2`}
                      style={{
                        minHeight: "105px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {action.icon}

                      <span
                        className="fw-semibold text-center"
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {action.title}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableAttendanceNotice;
