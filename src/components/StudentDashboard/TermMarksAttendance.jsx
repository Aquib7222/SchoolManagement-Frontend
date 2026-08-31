// // TermMarksAttendance.jsx

// import React, { useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";

// const TermMarksAttendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [attendance, setAttendance] = useState(null);

//   const loadAttendance = async () => {
//     try {
//       const attendanceRes = await axiosInstance.get(
//         "/api/student/attendance/current",
//         {
//           params: {
//             admissionNumber: user?.admissionNumber,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setAttendance(attendanceRes.data);
//     } catch (error) {
//       console.log("Attendance Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (user?.admissionNumber) {
//       loadAttendance();
//     }
//   }, [user?.admissionNumber]);
//   const marksData = [
//     {
//       subject: "English",
//       marks: 78,
//     },
//     {
//       subject: "Hindi",
//       marks: 85,
//     },
//     {
//       subject: "Math",
//       marks: 92,
//     },
//     {
//       subject: "Science",
//       marks: 74,
//     },
//     {
//       subject: "Social Science",
//       marks: 88,
//     },
//     {
//       subject: "Computer",
//       marks: 95,
//     },
//   ];

//   // ================= ATTENDANCE =================
//   const attendanceData = {
//     present: {attendance?.present},
//     absent: {attendance?.absent},
//     leave: {attendance?.leave},
//   };

//   return (
//     <div className="container-fluid px-0 mt-3">
//       <div className="row g-3">
//         {/* =====================================================
//             TERM 1 SUBJECT WISE MARKS
//         ====================================================== */}
//         <div className="col-lg-6">
//           <div className="card border-0 shadow rounded-4 h-100">
//             <div className="card-header bg-white border-0 pt-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="fw-bold mb-1">📊 Subject Wise Marks</h6>

//                   <small className="text-muted">Term 1 Performance</small>
//                 </div>

//                 <span className="badge bg-primary">Term 1</span>
//               </div>
//             </div>

//             <div className="card-body">
//               <div style={{ width: "100%", height: "300px" }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={marksData}
//                     margin={{
//                       top: 10,
//                       right: 10,
//                       left: -15,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />

//                     <XAxis
//                       dataKey="subject"
//                       tick={{ fontSize: 11 }}
//                       interval={0}
//                     />

//                     <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />

//                     <Tooltip />

//                     <Bar
//                       dataKey="marks"
//                       name="Marks"
//                       radius={[8, 8, 0, 0]}
//                       barSize={32}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =====================================================
//             ATTENDANCE OVERVIEW
//         ====================================================== */}
//         <div className="col-lg-6">
//           <div className="card border-0 shadow rounded-4 h-100">
//             <div className="card-header bg-white border-0 pt-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="fw-bold mb-1">📅 Attendance Overview</h6>

//                   <small className="text-muted">Current Academic Session</small>
//                 </div>

//                 <span className="badge bg-success">82% Present</span>
//               </div>
//             </div>

//             <div className="card-body">
//               {/* ================= PRESENT ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Present</span>

//                   <span className="fw-bold text-success">
//                     {attendanceData.present}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-success"
//                     style={{
//                       width: `${attendanceData.present}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= ABSENT ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Absent</span>

//                   <span className="fw-bold text-danger">
//                     {attendanceData.absent}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-danger"
//                     style={{
//                       width: `${attendanceData.absent}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= LEAVE ================= */}
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="fw-semibold">Leave</span>

//                   <span className="fw-bold text-warning">
//                     {attendanceData.leave}%
//                   </span>
//                 </div>

//                 <div
//                   className="progress"
//                   style={{
//                     height: "12px",
//                     borderRadius: "20px",
//                     backgroundColor: "#e9ecef",
//                   }}
//                 >
//                   <div
//                     className="progress-bar bg-warning"
//                     style={{
//                       width: `${attendanceData.leave}%`,
//                       borderRadius: "20px",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* ================= SUMMARY ================= */}
//               <div className="row g-2 mt-4">
//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-success mb-1">
//                       {attendanceData.present}%
//                     </h5>

//                     <small className="text-muted">Present</small>
//                   </div>
//                 </div>

//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-danger mb-1">
//                       {attendanceData.absent}%
//                     </h5>

//                     <small className="text-muted">Absent</small>
//                   </div>
//                 </div>

//                 <div className="col-4">
//                   <div className="text-center p-3 bg-light rounded-3">
//                     <h5 className="fw-bold text-warning mb-1">
//                       {attendanceData.leave}%
//                     </h5>

//                     <small className="text-muted">Leave</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermMarksAttendance;

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  FaChartColumn,
  FaCalendarCheck,

  FaCircleXmark,
  FaUmbrellaBeach,
  FaClock,
} from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import { FaCheckCircle } from "react-icons/fa";

const TermMarksAttendance = () => {
  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ================= ATTENDANCE STATE =================
  const [attendance, setAttendance] = useState(null);

  // ================= LOAD ATTENDANCE =================
  const loadAttendance = async () => {
    try {
      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/current",
        {
          params: {
            admissionNumber: user?.admissionNumber,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(attendanceRes.data);
    } catch (error) {
      console.log("Attendance Error:", error);
    }
  };

  useEffect(() => {
    if (user?.admissionNumber && token) {
      loadAttendance();
    }
  }, [user?.admissionNumber, token]);

  // =====================================================
  // TERM 1 MARKS
  // =====================================================

  const marksData = [
    {
      subject: "English",
      marks: 78,
    },
    {
      subject: "Hindi",
      marks: 85,
    },
    {
      subject: "Math",
      marks: 92,
    },
    {
      subject: "Science",
      marks: 74,
    },
    {
      subject: "Social Science",
      marks: 88,
    },
    {
      subject: "Computer",
      marks: 95,
    },
  ];

  // =====================================================
  // ATTENDANCE CALCULATION
  // =====================================================

  const present = attendance?.present || 0;
  const absent = attendance?.absent || 0;
  const leave = attendance?.leave || 0;
  const halfDay = attendance?.halfDay || 0;

  const totalDays =
    present +
    absent +
    leave +
    halfDay;

  const attendancePercentage =
    attendance?.attendancePercentage || 0;

  const presentPercentage =
    totalDays > 0
      ? ((present + halfDay * 0.5) / totalDays) * 100
      : 0;

  const absentPercentage =
    totalDays > 0
      ? (absent / totalDays) * 100
      : 0;

  const leavePercentage =
    totalDays > 0
      ? (leave / totalDays) * 100
      : 0;

  const halfDayPercentage =
    totalDays > 0
      ? (halfDay / totalDays) * 100
      : 0;

  return (
    <>
      <div className="container-fluid px-0 mt-3 mb-4">
        <div className="row g-3">

          {/* =====================================================
              SUBJECT WISE MARKS
          ===================================================== */}

          <div className="col-12 col-lg-6">
            <div className="premium-panel-card h-100">

              {/* HEADER */}
              <div className="premium-panel-header">
                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-blue">
                    <FaChartColumn />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold text-dark">
                      Subject Wise Marks
                    </h6>

                    <small className="text-muted">
                      Term 1 academic performance
                    </small>
                  </div>

                </div>

                <span className="premium-badge badge-blue">
                  Term 1
                </span>
              </div>

              {/* BODY */}
              <div className="premium-panel-body">

                <div
                  className="marks-summary mb-3"
                >
                  <div>
                    <span className="summary-label">
                      Average Marks
                    </span>

                    <strong>
                      {(
                        marksData.reduce(
                          (sum, item) =>
                            sum + item.marks,
                          0
                        ) / marksData.length
                      ).toFixed(1)}
                      %
                    </strong>
                  </div>

                  <div className="summary-divider"></div>

                  <div>
                    <span className="summary-label">
                      Highest
                    </span>

                    <strong className="text-success">
                      {Math.max(
                        ...marksData.map(
                          (item) => item.marks
                        )
                      )}
                    </strong>
                  </div>

                  <div className="summary-divider"></div>

                  <div>
                    <span className="summary-label">
                      Subjects
                    </span>

                    <strong>
                      {marksData.length}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "290px",
                  }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={marksData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -15,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="subject"
                        tick={{
                          fontSize: 10,
                          fill: "#6c757d",
                        }}
                        interval={0}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[0, 100]}
                        tick={{
                          fontSize: 10,
                          fill: "#6c757d",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "10px",
                          border: "1px solid #edf0f5",
                          boxShadow:
                            "0 5px 18px rgba(0,0,0,.08)",
                          fontSize: "12px",
                        }}
                        cursor={{
                          fill: "rgba(13,110,253,.04)",
                        }}
                      />

                      <Bar
                        dataKey="marks"
                        name="Marks"
                        fill="#0d6efd"
                        radius={[
                          7,
                          7,
                          0,
                          0,
                        ]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* FOOTER */}
              <div className="premium-panel-footer">
                <small className="text-muted">
                  Performance for{" "}
                  <strong className="text-primary">
                    Term 1
                  </strong>
                </small>

                <span className="small text-muted">
                  Out of 100
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              ATTENDANCE OVERVIEW
          ===================================================== */}

          <div className="col-12 col-lg-6">
            <div className="premium-panel-card h-100">

              {/* HEADER */}
              <div className="premium-panel-header">
                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-green">
                    <FaCalendarCheck />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold text-dark">
                      Attendance Overview
                    </h6>

                    <small className="text-muted">
                      {attendance?.studentName ||
                        "Student"}

                      {" • "}

                      {attendance?.month ||
                        "Current Month"}
                    </small>
                  </div>

                </div>

                <span className="attendance-percentage">
                  {attendancePercentage}%
                </span>
              </div>

              {/* BODY */}
              <div className="premium-panel-body">

                {/* PRESENT */}
                <AttendanceProgress
                  label="Present"
                  value={present}
                  percentage={presentPercentage}
                  colorClass="attendance-success"
                  icon={<FaCheckCircle />}
                />

                {/* ABSENT */}
                <AttendanceProgress
                  label="Absent"
                  value={absent}
                  percentage={absentPercentage}
                  colorClass="attendance-danger"
                  icon={<FaCircleXmark />}
                />

                {/* LEAVE */}
                <AttendanceProgress
                  label="Leave"
                  value={leave}
                  percentage={leavePercentage}
                  colorClass="attendance-warning"
                  icon={<FaUmbrellaBeach />}
                />

                {/* HALF DAY */}
                <AttendanceProgress
                  label="Half Day"
                  value={halfDay}
                  percentage={halfDayPercentage}
                  colorClass="attendance-info"
                  icon={<FaClock />}
                />

                {/* ================= SUMMARY ================= */}

                <div className="attendance-summary-grid">

                  <AttendanceSummary
                    value={present}
                    label="Present"
                    className="summary-success"
                  />

                  <AttendanceSummary
                    value={absent}
                    label="Absent"
                    className="summary-danger"
                  />

                  <AttendanceSummary
                    value={leave}
                    label="Leave"
                    className="summary-warning"
                  />

                  <AttendanceSummary
                    value={halfDay}
                    label="Half Day"
                    className="summary-info"
                  />

                </div>

                {/* TOTAL DAYS */}

                <div className="attendance-total">
                  <span>
                    Total Working Days
                  </span>

                  <strong>
                    {attendance?.totalDays ||
                      totalDays}
                  </strong>
                </div>

              </div>

              {/* FOOTER */}
              <div className="premium-panel-footer">

                <small className="text-muted">
                  Monthly Attendance
                </small>

                <span className="attendance-status">
                  {Number(attendancePercentage) >= 75
                    ? "Good Attendance"
                    : "Needs Improvement"}
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          /* =====================================================
             PREMIUM PANEL
          ===================================================== */

          .premium-panel-card {
            position: relative;
            overflow: hidden;
            background: #ffffff;
            border: 1px solid #edf0f5;
            border-radius: 16px;
            box-shadow: 0 5px 18px rgba(0,0,0,.05);
            transition: all .25s ease;
          }

          .premium-panel-card:hover {
            box-shadow: 0 10px 25px rgba(0,0,0,.08);
            transform: translateY(-2px);
          }

          .premium-panel-header {
            min-height: 76px;
            padding: 15px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid #edf0f5;
            background: #ffffff;
          }

          .premium-panel-body {
            padding: 16px 18px;
          }

          .premium-panel-footer {
            min-height: 48px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            border-top: 1px solid #edf0f5;
            background: #ffffff;
          }

          /* =====================================================
             PANEL ICON
          ===================================================== */

          .panel-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
          }

          .panel-blue {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .panel-green {
            background: #eaf8f0;
            color: #198754;
          }

          /* =====================================================
             BADGES
          ===================================================== */

          .premium-badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
          }

          .badge-blue {
            color: #0d6efd;
            background: #eaf2ff;
            border: 1px solid #d9e8ff;
          }

          /* =====================================================
             MARKS SUMMARY
          ===================================================== */

          .marks-summary {
            min-height: 62px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 12px;
            padding: 10px 8px;
            background: #f8faff;
            border: 1px solid #edf3ff;
            border-radius: 12px;
          }

          .marks-summary > div:not(.summary-divider) {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .summary-label {
            color: #8b9299;
            font-size: 10px;
            font-weight: 600;
          }

          .marks-summary strong {
            color: #212529;
            font-size: 16px;
            font-weight: 750;
          }

          .summary-divider {
            width: 1px;
            height: 30px;
            background: #e2e7ed;
          }

          /* =====================================================
             ATTENDANCE HEADER
          ===================================================== */

          .attendance-percentage {
            min-width: 55px;
            text-align: center;
            padding: 7px 10px;
            border-radius: 50px;
            background: #eaf8f0;
            color: #198754;
            border: 1px solid #d7f0e1;
            font-size: 12px;
            font-weight: 750;
          }

          /* =====================================================
             ATTENDANCE PROGRESS
          ===================================================== */

          .attendance-progress {
            margin-bottom: 18px;
          }

          .attendance-progress:last-of-type {
            margin-bottom: 20px;
          }

          .attendance-progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 7px;
          }

          .attendance-label {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #495057;
            font-size: 12px;
            font-weight: 600;
          }

          .attendance-icon {
            width: 25px;
            height: 25px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 7px;
            font-size: 11px;
          }

          .attendance-value {
            font-size: 11px;
            font-weight: 700;
          }

          .attendance-track {
            width: 100%;
            height: 8px;
            border-radius: 20px;
            background: #eef1f4;
            overflow: hidden;
          }

          .attendance-bar {
            height: 100%;
            border-radius: 20px;
            transition: width .5s ease;
          }

          /* GREEN */

          .attendance-success .attendance-icon {
            background: #eaf8f0;
            color: #198754;
          }

          .attendance-success .attendance-value {
            color: #198754;
          }

          .attendance-success .attendance-bar {
            background: #198754;
          }

          /* RED */

          .attendance-danger .attendance-icon {
            background: #ffeded;
            color: #dc3545;
          }

          .attendance-danger .attendance-value {
            color: #dc3545;
          }

          .attendance-danger .attendance-bar {
            background: #dc3545;
          }

          /* ORANGE */

          .attendance-warning .attendance-icon {
            background: #fff8df;
            color: #d99a00;
          }

          .attendance-warning .attendance-value {
            color: #d99a00;
          }

          .attendance-warning .attendance-bar {
            background: #ffc107;
          }

          /* BLUE */

          .attendance-info .attendance-icon {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .attendance-info .attendance-value {
            color: #0d6efd;
          }

          .attendance-info .attendance-bar {
            background: #0d6efd;
          }

          /* =====================================================
             ATTENDANCE SUMMARY
          ===================================================== */

          .attendance-summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }

          .attendance-summary-item {
            padding: 10px 5px;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #edf0f5;
            background: #f8f9fa;
          }

          .attendance-summary-item strong {
            display: block;
            font-size: 17px;
            font-weight: 750;
            margin-bottom: 2px;
          }

          .attendance-summary-item span {
            display: block;
            color: #8b9299;
            font-size: 9px;
            font-weight: 600;
          }

          .summary-success strong {
            color: #198754;
          }

          .summary-danger strong {
            color: #dc3545;
          }

          .summary-warning strong {
            color: #d99a00;
          }

          .summary-info strong {
            color: #0d6efd;
          }

          /* =====================================================
             TOTAL
          ===================================================== */

          .attendance-total {
            margin-top: 12px;
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            background: #f8f9fa;
            border: 1px solid #edf0f5;
          }

          .attendance-total span {
            color: #6c757d;
            font-size: 11px;
            font-weight: 600;
          }

          .attendance-total strong {
            color: #212529;
            font-size: 13px;
          }

          .attendance-status {
            color: #198754;
            font-size: 10px;
            font-weight: 700;
          }

          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 576px) {

            .premium-panel-header {
              min-height: 70px;
              padding: 12px;
            }

            .premium-panel-body {
              padding: 13px;
            }

            .premium-panel-footer {
              padding: 10px 13px;
            }

            .marks-summary {
              gap: 5px;
            }

            .marks-summary strong {
              font-size: 14px;
            }

            .attendance-summary-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .attendance-percentage {
              min-width: 50px;
            }
          }
        `}
      </style>
    </>
  );
};


/* =====================================================
   ATTENDANCE PROGRESS COMPONENT
===================================================== */

const AttendanceProgress = ({
  label,
  value,
  percentage,
  colorClass,
  icon,
}) => {
  return (
    <div
      className={`attendance-progress ${colorClass}`}
    >
      <div className="attendance-progress-header">

        <div className="attendance-label">
          <span className="attendance-icon">
            {icon}
          </span>

          {label}
        </div>

        <span className="attendance-value">
          {value}{" "}
          <small>
            ({percentage.toFixed(1)}%)
          </small>
        </span>

      </div>

      <div className="attendance-track">
        <div
          className="attendance-bar"
          style={{
            width: `${Math.min(
              percentage,
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
};


/* =====================================================
   ATTENDANCE SUMMARY COMPONENT
===================================================== */

const AttendanceSummary = ({
  value,
  label,
  className,
}) => {
  return (
    <div
      className={`attendance-summary-item ${className}`}
    >
      <strong>{value}</strong>

      <span>{label}</span>
    </div>
  );
};

export default TermMarksAttendance;