// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const ClassWiseStudentCharts = ({ data }) => {
//   const chartData = Array.isArray(data) ? data : [];

//   if (chartData.length === 0) {
//     return <p className="text-center">No data available</p>;
//   }

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="className" />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Bar dataKey="totalStudents" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ClassWiseStudentCharts;

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6",
  "#6366f1",
  "#eab308",
];

const ClassWiseStudentCharts = ({ data }) => {
  const chartData = Array.isArray(data) ? data : [];

  if (chartData.length === 0) {
    return <p className="text-center mt-4">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          left: -15,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis
          dataKey="className"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

       <YAxis
  allowDecimals={false}
  domain={[0, 180]}
  ticks={[0, 30, 60, 90, 120, 150, 180]}
  tick={{ fontSize: 11 }}
  axisLine={false}
  tickLine={false}
/>

        <Tooltip />

        <Bar
          dataKey="totalStudents"
          radius={[8, 8, 0, 0]}
          barSize={22}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ClassWiseStudentCharts;

// import React from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Cell,
//   LabelList,
// } from "recharts";

// const COLORS = [
//   ["#4F8EF7", "#2563EB"], // Nur
//   ["#67D58A", "#22C55E"], // LKG
//   ["#5FD1C9", "#0EA5A4"], // UKG
//   ["#FF8A65", "#F97316"], // I
//   ["#FF5C75", "#EF4444"], // II
//   ["#FFA726", "#F59E0B"], // III
//   ["#9B8AFB", "#8B5CF6"], // IV
//   ["#7367F0", "#5B50D6"], // V
//   ["#FFB74D", "#FB923C"], // VI
//   ["#FFD54F", "#FBBF24"], // VII
//   ["#D7A7FF", "#C084FC"], // VIII
//   ["#5AA8FF", "#3B82F6"], // IX
//   ["#43D3C5", "#14B8A6"], // X
//   ["#F5B041", "#E89A28"], // XI
// ];

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const item = payload[0].payload;

//     return (
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: 12,
//           padding: "10px 15px",
//           boxShadow: "0 6px 20px rgba(0,0,0,.12)",
//         }}
//       >
//         <div style={{ fontWeight: 600 }}>{item.className}</div>
//         <div>{item.totalStudents} Students</div>
//       </div>
//     );
//   }

//   return null;
// };

// const ClassWiseStudentCharts = ({ data }) => {
//   const chartData = Array.isArray(data) ? data : [];

//   return (
//     <ResponsiveContainer width="100%" height={320}>
//       <BarChart
//         data={chartData}
//         margin={{
//           top: 35,
//           right: 15,
//           left: 5,
//           bottom: 10,
//         }}
//       >
//         <defs>
//           {COLORS.map((color, index) => (
//             <linearGradient
//               key={index}
//               id={`gradient-${index}`}
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="1"
//             >
//               <stop offset="0%" stopColor={color[0]} />
//               <stop offset="100%" stopColor={color[1]} />
//             </linearGradient>
//           ))}
//         </defs>

//         <CartesianGrid
//           vertical={false}
//           stroke="#edf2f7"
//           strokeDasharray="4 4"
//         />

//         <XAxis
//           dataKey="className"
//           axisLine={false}
//           tickLine={false}
//           tick={{
//             fontSize: 12,
//             fill: "#6b7280",
//             fontWeight: 500,
//           }}
//         />

//         <YAxis
//           axisLine={false}
//           tickLine={false}
//           domain={[0, 180]}
//           ticks={[0, 30, 60, 90, 120, 150, 180]}
//           tick={{
//             fontSize: 12,
//             fill: "#6b7280",
//           }}
//         />

//         <Tooltip
//           cursor={{ fill: "rgba(0,0,0,.03)" }}
//           content={<CustomTooltip />}
//         />

//         <Bar
//           dataKey="totalStudents"
//           radius={[8, 8, 0, 0]}
//           barSize={22}
//         >
//           <LabelList
//             dataKey="totalStudents"
//             position="top"
//             style={{
//               fill: "#555",
//               fontWeight: 600,
//               fontSize: 13,
//             }}
//           />

//           {chartData.map((entry, index) => (
//             <Cell
//               key={index}
//               fill={`url(#gradient-${index})`}
//             />
//           ))}
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ClassWiseStudentCharts;