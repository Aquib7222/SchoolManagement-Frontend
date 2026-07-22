import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ClassWiseStudentCharts = ({ data }) => {
  const chartData = Array.isArray(data) ? data : [];

  if (chartData.length === 0) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="className" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="totalStudents" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ClassWiseStudentCharts;
