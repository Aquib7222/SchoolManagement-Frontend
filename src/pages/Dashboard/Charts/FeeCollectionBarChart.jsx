// // import React from "react";

// // import{

// // ResponsiveContainer,

// // BarChart,

// // Bar,

// // XAxis,

// // YAxis,

// // Tooltip,

// // Cell

// // }from"recharts";

// // const data=[

// // {

// // class:"I",

// // fee:35000

// // },

// // {

// // class:"II",

// // fee:42000

// // },

// // {

// // class:"III",

// // fee:52000

// // },

// // {

// // class:"IV",

// // fee:28000

// // },

// // {

// // class:"V",

// // fee:61000

// // }

// // ];

// // const colors=[

// // "#2563eb",

// // "#22c55e",

// // "#f59e0b",

// // "#ec4899",

// // "#8b5cf6"

// // ];

// // export default function FeeCollectionBarChart(){

// // return(

// // <ResponsiveContainer
// // width="100%"
// // height={220}
// // >

// // <BarChart
// // data={data}
// // >

// // <XAxis
// // dataKey="class"
// // />

// // <YAxis/>

// // <Tooltip/>

// // <Bar
// // dataKey="fee"
// // radius={[10,10,0,0]}
// // >

// // {

// // data.map((e,i)=>

// // <Cell
// // key={i}
// // fill={colors[i]}
// // />

// // )

// // }

// // </Bar>

// // </BarChart>

// // </ResponsiveContainer>

// // );

// // }

// import React, { useMemo } from "react";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Cell,
// } from "recharts";

// const COLORS = [
//   "#2563eb",
//   "#22c55e",
//   "#f59e0b",
//   "#ec4899",
//   "#8b5cf6",
//   "#06b6d4",
//   "#f97316",
//   "#14b8a6",
// ];

// export default function FeeCollectionBarChart({
//   data = [],
// }) {

//   const chartData = useMemo(() => {

//     if (!Array.isArray(data)) {
//       return [];
//     }

//     return data.map((item) => ({
//       class: item?.class || "Other",
//       fee: Number(item?.fee) || 0,
//     }));

//   }, [data]);

//   return (
//     <ResponsiveContainer
//       width="100%"
//       height={220}
//     >

//       <BarChart
//         data={chartData}
//         margin={{
//           top: 5,
//           right: 10,
//           left: 0,
//           bottom: 5,
//         }}
//       >

//         <XAxis
//           dataKey="class"
//           tick={{
//             fontSize: 11,
//           }}
//         />

//         <YAxis
//           tick={{
//             fontSize: 10,
//           }}
//         />

//         <Tooltip
//           formatter={(value) =>
//             `₹${Number(value).toLocaleString("en-IN")}`
//           }
//         />

//         <Bar
//           dataKey="fee"
//           radius={[10, 10, 0, 0]}
//         >

//           {chartData.map(
//             (entry, index) => (

//               <Cell
//                 key={`bar-cell-${index}`}
//                 fill={
//                   COLORS[
//                     index % COLORS.length
//                   ]
//                 }
//               />

//             )
//           )}

//         </Bar>

//       </BarChart>

//     </ResponsiveContainer>
//   );
// }


import React, { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#f97316",
  "#14b8a6",
];

const formatAmount = (value) => {
  const number = Number(value) || 0;

  if (number >= 10000000) {
    return `₹${(number / 10000000).toFixed(1)}Cr`;
  }

  if (number >= 100000) {
    return `₹${(number / 100000).toFixed(1)}L`;
  }

  if (number >= 1000) {
    return `₹${(number / 1000).toFixed(1)}K`;
  }

  return `₹${number}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  return (
    <div
      style={{
        background: "rgba(255,255,255,.97)",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "10px 13px",
        boxShadow: "0 10px 28px rgba(15,23,42,.12)",
        minWidth: "135px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#334155",
          marginBottom: "4px",
        }}
      >
        {item?.class || "Other"}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 800,
          color: "#2563eb",
        }}
      >
        ₹{Number(item?.fee || 0).toLocaleString("en-IN")}
      </div>

      <div
        style={{
          fontSize: "9px",
          color: "#94a3b8",
          marginTop: "2px",
        }}
      >
        Fee collected
      </div>
    </div>
  );
};

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

  if (!chartData.length) {
    return (
      <div
        className="h-100 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          minHeight: "190px",
          color: "#94a3b8",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "21px",
            marginBottom: "8px",
          }}
        >
          📊
        </div>

        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#64748b",
          }}
        >
          No fee data
        </div>

        <small style={{ fontSize: "9px" }}>
          Collection will appear here
        </small>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={chartData}
        margin={{
          top: 12,
          right: 12,
          left: 0,
          bottom: 5,
        }}
        barCategoryGap="22%"
      >
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`feeGradient-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={1}
              />

              <stop
                offset="100%"
                stopColor={color}
                stopOpacity={0.55}
              />
            </linearGradient>
          ))}
        </defs>

        <CartesianGrid
          strokeDasharray="3 4"
          vertical={false}
          stroke="#e9eef5"
        />

        <XAxis
          dataKey="class"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 9,
            fill: "#64748b",
            fontWeight: 600,
          }}
          interval={0}
          height={30}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          width={42}
          tick={{
            fontSize: 8,
            fill: "#94a3b8",
          }}
          tickFormatter={formatAmount}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            fill: "#f8fafc",
          }}
        />

        <Bar
          dataKey="fee"
          radius={[9, 9, 3, 3]}
          maxBarSize={28}
          animationDuration={900}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`bar-cell-${index}`}
              fill={`url(#feeGradient-${
                index % COLORS.length
              })`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

