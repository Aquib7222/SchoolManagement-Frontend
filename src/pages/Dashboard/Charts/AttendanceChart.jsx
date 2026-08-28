// // import React from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// //   Tooltip,
// // } from "recharts";

// // const data = [
// //   { name: "Present", value: 85 },
// //   { name: "Absent", value: 15 },
// // ];

// // const COLORS = ["#16a34a", "#ef4444"];

// // export default function AttendanceChart() {
// //   return (
// //     <ResponsiveContainer width="100%" height={220}>
// //       <PieChart>
// //         <Pie
// //           data={data}
// //           dataKey="value"
// //           innerRadius={55}
// //           outerRadius={75}
// //           label
// //         >
// //           {data.map((entry, index) => (
// //             <Cell
// //               key={index}
// //               fill={COLORS[index]}
// //             />
// //           ))}
// //         </Pie>

// //         <Tooltip />
// //       </PieChart>
// //     </ResponsiveContainer>
// //   );
// // }

// import axios from "axios";
// import React, { useEffect } from "react";
// import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
// import axiosInstance from "../../../api/axiosInstance";

// const data = [
//   { name: "Present", value: 92.6, count: 1155, color: "#22c55e" },
//   { name: "Absent", value: 5.1, count: 64, color: "#ef4444" },
//   { name: "Leave", value: 2.3, count: 29, color: "#f59e0b" },
// ];

// export default function AttendanceChart() {
//   const schoolId = localStorage.getItem("schoolId");
// const token = localStorage.getItem("token");

// useEffect(() => {
//   const fetchAttendance = async () => {
//     if (!schoolId) return;

//     try {
//       const response = await axiosInstance.get(
//         "/api/student/attendance/school",
//         {
//           params: {
//             schoolId: schoolId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Attendance:", response.data);

//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   fetchAttendance();
// }, [schoolId, token]);

//   return (
//     <div className="row align-items-center h-100">
//       {/* Donut */}
//       <div className="col-6">
//         <ResponsiveContainer width="100%" height={230}>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               innerRadius={55}
//               outerRadius={85}
//               paddingAngle={2}
//               stroke="#fff"
//             >
//               {data.map((item, index) => (
//                 <Cell key={index} fill={item.color} />
//               ))}
//             </Pie>

//             <Tooltip />

//             <text
//               x="50%"
//               y="47%"
//               textAnchor="middle"
//               style={{
//                 fontSize: 24,
//                 fontWeight: 700,
//                 fill: "#111827",
//               }}
//             >
//               92.6%
//             </text>

//             <text
//               x="50%"
//               y="60%"
//               textAnchor="middle"
//               style={{
//                 fontSize: 15,
//                 fill: "#6b7280",
//               }}
//             >
//               Present
//             </text>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend */}
//       <div className="col-6">
//         {data.map((item) => (
//           <div
//             key={item.name}
//             className={`d-flex justify-content-between align-items-center mb-4 p-1 alert ${
//               item.name === "Present"
//                 ? "alert-success"
//                 : item.name === "Absent"
//                   ? "alert-danger"
//                   : item.name === "Leave"
//                     ? "alert-warning"
//                     : "alert-info"
//             }`}
//           >
//             <div className="d-flex align-items-center ">
//               <span
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: "50%",
//                   background: item.color,
//                   marginRight: 10,
//                 }}
//               ></span>

//               <span>{item.name}</span>
//             </div>

//             <div className="text-end">
//               <div className="fw-semibold">{item.value}%</div>

//               <small className="text-muted">
//                 {item.count.toLocaleString()}
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import axiosInstance from "../../../api/axiosInstance";

const COLORS = {
  PRESENT: "#22c55e",
  ABSENT: "#ef4444",
  LEAVE: "#f59e0b",
  HALF_DAY: "#8b5cf6",
};

const AttendanceChart = () => {
  const [attendance, setAttendance] = useState([]);
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
        const user = JSON.parse(localStorage.getItem("user"));
        const schoolId = user?.schoolId;
        const token = localStorage.getItem("token");

        if (!schoolId) {
          console.error("School ID not found");
          return;
        }

        const response = await axiosInstance.get(
          "/api/student/attendance/school",
          {
            params: {
              schoolId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Attendance:", response.data);

        const list = Array.isArray(response.data)
          ? response.data
          : [];

        setAttendance(list);

        // Today's date
        const today = new Date().toISOString().split("T")[0];

        console.log("Today:", today);

        // Only today's attendance
        const todayAttendance = list.filter(
          (item) => item.attendanceDate === today
        );

        console.log("Today's Attendance:", todayAttendance);

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

        const total = todayAttendance.length;

        setSummary({
          present,
          absent,
          leave,
          halfDay,
          total,
        });
      } catch (error) {
        console.error(
          "Attendance API Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // ---------------- Percentage ----------------

  const getPercentage = (count) => {
    if (!summary.total) return 0;

    return ((count / summary.total) * 100).toFixed(1);
  };

  const presentPercentage = getPercentage(summary.present);
  const absentPercentage = getPercentage(summary.absent);
  const leavePercentage = getPercentage(summary.leave);
  const halfDayPercentage = getPercentage(summary.halfDay);

  // ---------------- Chart Data ----------------

  const chartData = [
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
  ].filter((item) => item.value > 0);

  // ---------------- Loading ----------------

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: 230 }}
      >
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        />
      </div>
    );
  }

  // ---------------- No Attendance ----------------

  if (summary.total === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: 230 }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mb-2"
          style={{
            width: 55,
            height: 55,
            background: "#f3f4f6",
            fontSize: 24,
          }}
        >
          📅
        </div>

        <h6 className="fw-semibold mb-1">
          No Attendance Today
        </h6>

        <small className="text-muted">
          Attendance has not been marked for today.
        </small>
      </div>
    );
  }

  return (
    <div className="row align-items-center h-100">

      {/* ================= DONUT ================= */}

      <div className="col-6">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={84}
              paddingAngle={3}
              stroke="#fff"
              strokeWidth={3}
            >
              {chartData.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={item.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${value} students`,
                name,
              ]}
            />

            {/* Center Percentage */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: 23,
                fontWeight: 700,
                fill: "#111827",
              }}
            >
              {presentPercentage}%
            </text>

            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            >
              Present
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================= LEGEND ================= */}

      <div className="col-6">

        {/* Present */}
        <div className="d-flex justify-content-between align-items-center mb-3 alert alert-success p-1">
          <div className="d-flex align-items-center">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.PRESENT,
                marginRight: 8,
              }}
            />

            <span className="small">
              Present
            </span>
          </div>

          <div className="text-end">
            <div className="fw-semibold">
              {presentPercentage}%
            </div>

            <small className="text-muted">
              {summary.present}
            </small>
          </div>
        </div>

        {/* Absent */}
        <div className="d-flex justify-content-between align-items-center mb-3 alert alert-danger p-1">
          <div className="d-flex align-items-center">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.ABSENT,
                marginRight: 8,
              }}
            />

            <span className="small">
              Absent
            </span>
          </div>

          <div className="text-end">
            <div className="fw-semibold">
              {absentPercentage}%
            </div>

            <small className="text-muted">
              {summary.absent}
            </small>
          </div>
        </div>

        {/* Leave */}
        <div className="d-flex justify-content-between align-items-center mb-3 alert alert-warning p-1">
          <div className="d-flex align-items-center">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.LEAVE,
                marginRight: 8,
              }}
            />

            <span className="small">
              Leave
            </span>
          </div>

          <div className="text-end">
            <div className="fw-semibold">
              {leavePercentage}%
            </div>

            <small className="text-muted">
              {summary.leave}
            </small>
          </div>
        </div>

        {/* Half Day */}
        {summary.halfDay > 0 && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: COLORS.HALF_DAY,
                  marginRight: 8,
                }}
              />

              <span className="small">
                Half Day
              </span>
            </div>

            <div className="text-end">
              <div className="fw-semibold">
                {halfDayPercentage}%
              </div>

              <small className="text-muted">
                {summary.halfDay}
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceChart;