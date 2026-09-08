// import React from "react";

// import{

// ResponsiveContainer,

// BarChart,

// Bar,

// XAxis,

// YAxis,

// Tooltip,

// Cell

// }from"recharts";

// const data=[

// {

// class:"I",

// fee:35000

// },

// {

// class:"II",

// fee:42000

// },

// {

// class:"III",

// fee:52000

// },

// {

// class:"IV",

// fee:28000

// },

// {

// class:"V",

// fee:61000

// }

// ];

// const colors=[

// "#2563eb",

// "#22c55e",

// "#f59e0b",

// "#ec4899",

// "#8b5cf6"

// ];

// export default function FeeCollectionBarChart(){

// return(

// <ResponsiveContainer
// width="100%"
// height={220}
// >

// <BarChart
// data={data}
// >

// <XAxis
// dataKey="class"
// />

// <YAxis/>

// <Tooltip/>

// <Bar
// dataKey="fee"
// radius={[10,10,0,0]}
// >

// {

// data.map((e,i)=>

// <Cell
// key={i}
// fill={colors[i]}
// />

// )

// }

// </Bar>

// </BarChart>

// </ResponsiveContainer>

// );

// }

import React, { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
];

export default function FeeCollectionBarChart({
  data = [],
}) {

  const chartData = useMemo(() => {

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      class: item?.class || "Other",
      fee: Number(item?.fee) || 0,
    }));

  }, [data]);

  return (
    <ResponsiveContainer
      width="100%"
      height={220}
    >

      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >

        <XAxis
          dataKey="class"
          tick={{
            fontSize: 11,
          }}
        />

        <YAxis
          tick={{
            fontSize: 10,
          }}
        />

        <Tooltip
          formatter={(value) =>
            `₹${Number(value).toLocaleString("en-IN")}`
          }
        />

        <Bar
          dataKey="fee"
          radius={[10, 10, 0, 0]}
        >

          {chartData.map(
            (entry, index) => (

              <Cell
                key={`bar-cell-${index}`}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            )
          )}

        </Bar>

      </BarChart>

    </ResponsiveContainer>
  );
}