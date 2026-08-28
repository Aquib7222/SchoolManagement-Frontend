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
          tick={{ fontSize: 16 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          allowDecimals={false}
          domain={[0, 70]}
          ticks={[0, 10, 20, 30, 40, 50, 60,70]}
          tick={{ fontSize: 16 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip />

        <Bar dataKey="totalStudents" radius={[8, 8, 0, 0]} barSize={22}>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ClassWiseStudentCharts;
