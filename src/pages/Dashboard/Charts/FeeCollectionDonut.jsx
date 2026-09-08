// import React from "react";
// import {
// PieChart,
// Pie,
// Cell,
// ResponsiveContainer,
// Tooltip,
// Legend
// } from "recharts";

// const data=[
// {
// name:"Paid",
// value:580000
// },
// {
// name:"Due",
// value:120000
// }
// ];

// const COLORS=["#22c55e","#ef4444"];

// export default function FeeCollectionDonut(){

// return(

// <ResponsiveContainer
// width="100%"
// height={220}
// >

// <PieChart>

// <Pie
// data={data}
// innerRadius={50}
// outerRadius={75}
// paddingAngle={4}
// dataKey="value"
// >

// {
// data.map((e,i)=>

// <Cell
// key={i}
// fill={COLORS[i]}
// />

// )
// }

// </Pie>

// <Tooltip/>

// <Legend/>

// </PieChart>

// </ResponsiveContainer>

// );

// }

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
];

export default function FeeCollectionDonut({
  paid = 0,
  due = 0,
}) {

  const data = useMemo(() => {
    return [
      {
        name: "Paid",
        value: Number(paid) || 0,
      },
      {
        name: "Due",
        value: Number(due) || 0,
      },
    ];
  }, [paid, due]);

  return (
    <ResponsiveContainer
      width="100%"
      height={220}
    >

      <PieChart>

        <Pie
          data={data}
          innerRadius={50}
          outerRadius={75}
          paddingAngle={4}
          dataKey="value"
        >

          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
            />
          ))}

        </Pie>

        <Tooltip
          formatter={(value) =>
            `₹${Number(value).toLocaleString("en-IN")}`
          }
        />

        <Legend />

      </PieChart>

    </ResponsiveContainer>
  );
}