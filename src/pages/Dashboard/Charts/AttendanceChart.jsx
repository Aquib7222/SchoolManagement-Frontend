// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const data = [
//   { name: "Present", value: 85 },
//   { name: "Absent", value: 15 },
// ];

// const COLORS = ["#16a34a", "#ef4444"];

// export default function AttendanceChart() {
//   return (
//     <ResponsiveContainer width="100%" height={220}>
//       <PieChart>
//         <Pie
//           data={data}
//           dataKey="value"
//           innerRadius={55}
//           outerRadius={75}
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell
//               key={index}
//               fill={COLORS[index]}
//             />
//           ))}
//         </Pie>

//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Present", value: 92.6, count: 1155, color: "#22c55e" },
  { name: "Absent", value: 5.1, count: 64, color: "#ef4444" },
  { name: "Leave", value: 2.3, count: 29, color: "#f59e0b" },
];

export default function AttendanceChart() {
  return (
    <div className="row align-items-center h-100">

      {/* Donut */}
      <div className="col-6">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart >
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="#fff"
            >
              {data.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>

            <Tooltip />

            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              style={{
                fontSize: 24,
                fontWeight: 700,
                fill: "#111827",
              }}
            >
              92.6%
            </text>

            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              style={{
                fontSize: 15,
                fill: "#6b7280",
              }}
            >
              Present
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="col-6">

        {data.map((item) => (
          <div
            key={item.name}
            className="d-flex justify-content-between align-items-center mb-4"
          >
            <div className="d-flex align-items-center">

              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: item.color,
                  marginRight: 10,
                }}
              ></span>

              <span>{item.name}</span>

            </div>

            <div className="text-end">
              <div className="fw-semibold">
                {item.value}%
              </div>

              <small className="text-muted">
                {item.count.toLocaleString()}
              </small>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}