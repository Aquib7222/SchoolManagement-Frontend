


// import React, { useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
// } from "recharts";

// import axiosInstance from "../../../api/axiosInstance";

// const COLORS = {
//   PRESENT: "#22c55e",
//   ABSENT: "#ef4444",
//   LEAVE: "#f59e0b",
//   HALF_DAY: "#8b5cf6",
// };

// const AttendanceChart = ({
//   schoolId,
//   studentClass = "",
// }) => {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [summary, setSummary] = useState({
//     present: 0,
//     absent: 0,
//     leave: 0,
//     halfDay: 0,
//     total: 0,
//   });

//   // =========================================================
//   // FETCH TODAY'S ATTENDANCE
//   // =========================================================

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);

//         const user = JSON.parse(localStorage.getItem("user"));
//         const token = localStorage.getItem("token");

//         const currentSchoolId = schoolId || user?.schoolId;

//         if (!currentSchoolId) {
//           console.error("School ID not found");
//           setLoading(false);
//           return;
//         }

//         // ---------------------------------------------------
//         // Attendance API
//         // ---------------------------------------------------

//         const response = await axiosInstance.get(
//           "/api/student/attendance/school",
//           {
//             params: {
//               schoolId: currentSchoolId,
//             },
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("Attendance API:", response.data);

//         const list = Array.isArray(response.data)
//           ? response.data
//           : [];

//         setAttendance(list);

//         // ===================================================
//         // TODAY
//         // ===================================================

//         const today = new Date()
//           .toISOString()
//           .split("T")[0];

//         console.log("Today:", today);

//         // ===================================================
//         // TODAY'S ATTENDANCE
//         // ===================================================

//         let todayAttendance = list.filter(
//           (item) => item.attendanceDate === today
//         );

//         // ===================================================
//         // CLASS FILTER
//         // ===================================================

//         if (studentClass) {
//           todayAttendance = todayAttendance.filter(
//             (item) =>
//               item.studentClass === studentClass
//           );
//         }

//         console.log(
//           "Filtered Today's Attendance:",
//           todayAttendance
//         );

//         // ===================================================
//         // SUMMARY
//         // ===================================================

//         const present = todayAttendance.filter(
//           (item) => item.status === "PRESENT"
//         ).length;

//         const absent = todayAttendance.filter(
//           (item) => item.status === "ABSENT"
//         ).length;

//         const leave = todayAttendance.filter(
//           (item) => item.status === "LEAVE"
//         ).length;

//         const halfDay = todayAttendance.filter(
//           (item) => item.status === "HALF_DAY"
//         ).length;

//         const total = todayAttendance.length;

//         setSummary({
//           present,
//           absent,
//           leave,
//           halfDay,
//           total,
//         });

//       } catch (error) {
//         console.error(
//           "Attendance API Error:",
//           error.response?.data ||
//             error.message
//         );

//         setAttendance([]);

//         setSummary({
//           present: 0,
//           absent: 0,
//           leave: 0,
//           halfDay: 0,
//           total: 0,
//         });

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [schoolId, studentClass]);

//   // =========================================================
//   // PERCENTAGE
//   // =========================================================

//   const getPercentage = (count) => {
//     if (!summary.total) return "0.0";

//     return (
//       (count / summary.total) *
//       100
//     ).toFixed(1);
//   };

//   const presentPercentage =
//     getPercentage(summary.present);

//   const absentPercentage =
//     getPercentage(summary.absent);

//   const leavePercentage =
//     getPercentage(summary.leave);

//   const halfDayPercentage =
//     getPercentage(summary.halfDay);

//   // =========================================================
//   // CHART DATA
//   // =========================================================

//   const chartData = [
//     {
//       name: "Present",
//       value: summary.present,
//       percentage: presentPercentage,
//       color: COLORS.PRESENT,
//     },
//     {
//       name: "Absent",
//       value: summary.absent,
//       percentage: absentPercentage,
//       color: COLORS.ABSENT,
//     },
//     {
//       name: "Leave",
//       value: summary.leave,
//       percentage: leavePercentage,
//       color: COLORS.LEAVE,
//     },
//     {
//       name: "Half Day",
//       value: summary.halfDay,
//       percentage: halfDayPercentage,
//       color: COLORS.HALF_DAY,
//     },
//   ].filter(
//     (item) => item.value > 0
//   );

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: 230 }}
//       >
//         <div
//           className="spinner-border spinner-border-sm text-primary"
//           role="status"
//         />
//       </div>
//     );
//   }

//   // =========================================================
//   // NO ATTENDANCE
//   // =========================================================

//   if (summary.total === 0) {
//     return (
//       <div
//         className="d-flex flex-column justify-content-center align-items-center text-center"
//         style={{ height: 230 }}
//       >
//         <div
//           className="rounded-circle d-flex align-items-center justify-content-center mb-2"
//           style={{
//             width: 55,
//             height: 55,
//             background: "#f3f4f6",
//             fontSize: 24,
//           }}
//         >
//           📅
//         </div>

//         <h6 className="fw-semibold mb-1">
//           No Attendance Today
//         </h6>

//         <small className="text-muted">
//           {studentClass
//             ? `No attendance marked for ${studentClass} today.`
//             : "Attendance has not been marked for today."}
//         </small>
//       </div>
//     );
//   }

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <div className="row align-items-center h-100">

//       {/* =====================================================
//           DONUT
//       ===================================================== */}

//       <div className="col-6">

//         <ResponsiveContainer
//           width="100%"
//           height={230}
//         >
//           <PieChart>

//             <Pie
//               data={chartData}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={58}
//               outerRadius={84}
//               paddingAngle={3}
//               stroke="#fff"
//               strokeWidth={3}
//             >

//               {chartData.map(
//                 (item, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={item.color}
//                   />
//                 )
//               )}

//             </Pie>

//             <Tooltip
//               formatter={(
//                 value,
//                 name
//               ) => [
//                 `${value} students`,
//                 name,
//               ]}
//             />

//             {/* CENTER PERCENTAGE */}

//             <text
//               x="50%"
//               y="47%"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               style={{
//                 fontSize: 23,
//                 fontWeight: 700,
//                 fill: "#111827",
//               }}
//             >
//               {presentPercentage}%
//             </text>

//             <text
//               x="50%"
//               y="60%"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               style={{
//                 fontSize: 12,
//                 fill: "#6b7280",
//               }}
//             >
//               Present
//             </text>

//           </PieChart>
//         </ResponsiveContainer>

//       </div>

//       {/* =====================================================
//           LEGEND
//       ===================================================== */}

//       <div className="col-6">

//         {/* PRESENT */}

//         <div className="d-flex justify-content-between align-items-center mb-3 alert alert-success p-1">

//           <div className="d-flex align-items-center">

//             <span
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: "50%",
//                 background:
//                   COLORS.PRESENT,
//                 marginRight: 8,
//               }}
//             />

//             <span className="small">
//               Present
//             </span>

//           </div>

//           <div className="text-end">

//             <div className="fw-semibold">
//               {presentPercentage}%
//             </div>

//             <small className="text-muted">
//               {summary.present}
//             </small>

//           </div>

//         </div>

//         {/* ABSENT */}

//         <div className="d-flex justify-content-between align-items-center mb-3 alert alert-danger p-1">

//           <div className="d-flex align-items-center">

//             <span
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: "50%",
//                 background:
//                   COLORS.ABSENT,
//                 marginRight: 8,
//               }}
//             />

//             <span className="small">
//               Absent
//             </span>

//           </div>

//           <div className="text-end">

//             <div className="fw-semibold">
//               {absentPercentage}%
//             </div>

//             <small className="text-muted">
//               {summary.absent}
//             </small>

//           </div>

//         </div>

//         {/* LEAVE */}

//         <div className="d-flex justify-content-between align-items-center mb-3 alert alert-warning p-1">

//           <div className="d-flex align-items-center">

//             <span
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: "50%",
//                 background:
//                   COLORS.LEAVE,
//                 marginRight: 8,
//               }}
//             />

//             <span className="small">
//               Leave
//             </span>

//           </div>

//           <div className="text-end">

//             <div className="fw-semibold">
//               {leavePercentage}%
//             </div>

//             <small className="text-muted">
//               {summary.leave}
//             </small>

//           </div>

//         </div>

//         {/* HALF DAY */}

//         {summary.halfDay > 0 && (
//           <div className="d-flex justify-content-between align-items-center">

//             <div className="d-flex align-items-center">

//               <span
//                 style={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: "50%",
//                   background:
//                     COLORS.HALF_DAY,
//                   marginRight: 8,
//                 }}
//               />

//               <span className="small">
//                 Half Day
//               </span>

//             </div>

//             <div className="text-end">

//               <div className="fw-semibold">
//                 {halfDayPercentage}%
//               </div>

//               <small className="text-muted">
//                 {summary.halfDay}
//               </small>

//             </div>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default AttendanceChart;



import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  LuCalendarCheck,
  LuCircleCheck,
  LuCircleX,
  LuClock3,
  LuUsers,
} from "react-icons/lu";
import axiosInstance from "../../../api/axiosInstance";

const COLORS = {
  PRESENT: "#16a34a",
  ABSENT: "#ef4444",
  LEAVE: "#f59e0b",
  HALF_DAY: "#7c3aed",
};

const AttendanceChart = ({ schoolId, studentClass = "" }) => {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    halfDay: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const token = localStorage.getItem("token");

        const currentSchoolId = schoolId || user?.schoolId;

        if (!currentSchoolId) {
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(
          "/api/student/attendance/school",
          {
            params: {
              schoolId: currentSchoolId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = Array.isArray(response.data)
          ? response.data
          : [];

        const now = new Date();

        const today =
          `${now.getFullYear()}-${String(
            now.getMonth() + 1
          ).padStart(2, "0")}-${String(
            now.getDate()
          ).padStart(2, "0")}`;

        let todayAttendance = list.filter(
          (item) => item.attendanceDate === today
        );

        if (studentClass) {
          todayAttendance = todayAttendance.filter(
            (item) => item.studentClass === studentClass
          );
        }

        const present = todayAttendance.filter(
          (item) => item.status === "PRESENT"
        ).length;

        const absent = todayAttendance.filter(
          (item) => item.status === "ABSENT"
        ).length;

        const leave = todayAttendance.filter(
          (item) => item.status === "LEAVE"
        ).length;

        const halfDay = todayAttendance.filter(
          (item) => item.status === "HALF_DAY"
        ).length;

        setSummary({
          present,
          absent,
          leave,
          halfDay,
          total: todayAttendance.length,
        });
      } catch (error) {
        console.error(
          "Attendance API Error:",
          error?.response?.data || error?.message
        );

        setSummary({
          present: 0,
          absent: 0,
          leave: 0,
          halfDay: 0,
          total: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [schoolId, studentClass]);

  const percentage = (value) => {
    if (!summary.total) return 0;

    return Number(
      ((value / summary.total) * 100).toFixed(1)
    );
  };

  const presentPercentage = percentage(summary.present);
  const absentPercentage = percentage(summary.absent);
  const leavePercentage = percentage(summary.leave);
  const halfDayPercentage = percentage(summary.halfDay);

  const chartData = useMemo(
    () =>
      [
        {
          name: "Present",
          value: summary.present,
          percentage: presentPercentage,
          color: COLORS.PRESENT,
        },
        {
          name: "Absent",
          value: summary.absent,
          percentage: absentPercentage,
          color: COLORS.ABSENT,
        },
        {
          name: "Leave",
          value: summary.leave,
          percentage: leavePercentage,
          color: COLORS.LEAVE,
        },
        {
          name: "Half Day",
          value: summary.halfDay,
          percentage: halfDayPercentage,
          color: COLORS.HALF_DAY,
        },
      ].filter((item) => item.value > 0),
    [
      summary,
      presentPercentage,
      absentPercentage,
      leavePercentage,
      halfDayPercentage,
    ]
  );

  const attendanceRate = presentPercentage;

  const statusCards = [
    {
      title: "Present",
      value: summary.present,
      percentage: presentPercentage,
      icon: <LuCircleCheck />,
      color: COLORS.PRESENT,
      light: "#f0fdf4",
    },
    {
      title: "Absent",
      value: summary.absent,
      percentage: absentPercentage,
      icon: <LuCircleX />,
      color: COLORS.ABSENT,
      light: "#fef2f2",
    },
    {
      title: "Leave",
      value: summary.leave,
      percentage: leavePercentage,
      icon: <LuClock3 />,
      color: COLORS.LEAVE,
      light: "#fffbeb",
    },
    {
      title: "Half Day",
      value: summary.halfDay,
      percentage: halfDayPercentage,
      icon: <LuCalendarCheck />,
      color: COLORS.HALF_DAY,
      light: "#f5f3ff",
    },
  ];

  if (loading) {
    return (
      <>
        <style>{`
          .attendance-loading-box {
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 12px;
            color: #64748b;
          }

          .attendance-loader {
            width: 34px;
            height: 34px;
            border: 3px solid #e2e8f0;
            border-top-color: #2563eb;
            border-radius: 50%;
            animation: attendanceSpin .8s linear infinite;
          }

          @keyframes attendanceSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="attendance-loading-box">
          <div className="attendance-loader" />
          <span>Loading attendance...</span>
        </div>
      </>
    );
  }

  if (!summary.total) {
    return (
      <>
        <style>{`
          .attendance-empty {
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            color: #64748b;
          }

          .attendance-empty-icon {
            width: 64px;
            height: 64px;
            border-radius: 20px;
            background: #eff6ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 14px;
          }

          .attendance-empty h6 {
            margin: 0;
            color: #1e293b;
            font-size: 14px;
            font-weight: 700;
          }

          .attendance-empty p {
            margin: 6px 0 0;
            font-size: 12px;
          }
        `}</style>

        <div className="attendance-empty">
          <div className="attendance-empty-icon">
            <LuCalendarCheck />
          </div>

          <h6>No Attendance Recorded</h6>
          <p>
            No attendance data found for today's selected class.
          </p>
        </div>
      </>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "10px 13px",
          boxShadow: "0 10px 30px rgba(15,23,42,.12)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#334155",
            marginBottom: 3,
          }}
        >
          {item.name}
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: item.color,
          }}
        >
          {item.value} Students
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          {item.percentage}%
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .modern-attendance {
          width: 100%;
          height: 100%;
          padding: 4px 2px;
        }

        .attendance-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .attendance-date {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
        }

        .attendance-date svg {
          color: #2563eb;
          font-size: 15px;
        }

        .attendance-class-badge {
          padding: 5px 10px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
        }

        .attendance-main {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 10px;
          align-items: center;
        }

        .attendance-ring-box {
          position: relative;
          height: 185px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .attendance-ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          pointer-events: none;
        }

        .attendance-rate {
          font-size: 28px;
          line-height: 1;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1px;
        }

        .attendance-rate-label {
          margin-top: 6px;
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: .6px;
        }

        .attendance-total {
          margin-top: 4px;
          font-size: 10px;
          color: #64748b;
        }

        .attendance-status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          
        }

        .attendance-status-card {
          min-height: 72px;
          border: 1px solid #eef2f7;
          border-radius: 14px;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
          transition: .2s ease;
        }

        .attendance-status-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15,23,42,.07);
        }

        .attendance-status-icon {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .attendance-status-info {
          min-width: 0;
        }

        .attendance-status-title {
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 2px;
        }

        .attendance-status-value {
          font-size: 18px;
          line-height: 1;
          font-weight: 800;
          color: #0f172a;
        }

        .attendance-status-percent {
          margin-top: 3px;
          font-size: 9px;
          font-weight: 700;
        }

        .attendance-bottom {
          margin-top: 13px;
          padding: 9px 11px;
          background: #f8fafc;
          border: 1px solid #eef2f7;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .attendance-bottom-left {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
        }

        .attendance-bottom-left svg {
          color: #2563eb;
          font-size: 14px;
        }

        .attendance-bottom-value {
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
        }

        @media (max-width: 575px) {
          .attendance-main {
            grid-template-columns: 1fr;
          }

          .attendance-ring-box {
            height: 165px;
          }

          .attendance-status-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="modern-attendance">

        <div className="attendance-top">
          <div className="attendance-date">
            <LuCalendarCheck />
            Today's Attendance
          </div>

          <div className="attendance-class-badge">
            {studentClass || "All Classes"}
          </div>
        </div>

        <div className="attendance-main ">

          {/* CENTER RING */}
          <div className="attendance-ring-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    {
                      value: 100,
                      color: "#f1f5f9",
                    },
                  ]}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={63}
                  outerRadius={78}
                  stroke="none"
                >
                  <Cell fill="#f1f5f9" />
                </Pie>

                <Pie
                  data={chartData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={63}
                  outerRadius={78}
                  paddingAngle={3}
                  cornerRadius={8}
                  stroke="none"
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={<CustomTooltip />}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="attendance-ring-center">
              <div className="attendance-rate">
                {attendanceRate}%
              </div>

              <div className="attendance-rate-label">
                Attendance
              </div>

              <div className="attendance-total">
                {summary.total} students
              </div>
            </div>
          </div>

          {/* STATUS CARDS */}
          <div className="attendance-status-grid">
            {statusCards.map((item) => (
              <div
                className="attendance-status-card"
                key={item.title}
                style={{
                  background: item.light,
                }}
              >
                <div
                  className="attendance-status-icon"
                  style={{
                    background: "#ffffff",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <div className="attendance-status-info">
                  <div className="attendance-status-title">
                    {item.title}
                  </div>

                  <div className="attendance-status-value">
                    {item.value}
                  </div>

                  <div
                    className="attendance-status-percent"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="attendance-bottom">
          <div className="attendance-bottom-left">
            <LuUsers />
            Total Students Marked
          </div>

          <div className="attendance-bottom-value">
            {summary.total}
          </div>
        </div>

      </div>
    </>
  );
};

export default AttendanceChart;