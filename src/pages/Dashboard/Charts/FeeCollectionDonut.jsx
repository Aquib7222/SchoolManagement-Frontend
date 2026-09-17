// // import React from "react";
// // import {
// // PieChart,
// // Pie,
// // Cell,
// // ResponsiveContainer,
// // Tooltip,
// // Legend
// // } from "recharts";

// // const data=[
// // {
// // name:"Paid",
// // value:580000
// // },
// // {
// // name:"Due",
// // value:120000
// // }
// // ];

// // const COLORS=["#22c55e","#ef4444"];

// // export default function FeeCollectionDonut(){

// // return(

// // <ResponsiveContainer
// // width="100%"
// // height={220}
// // >

// // <PieChart>

// // <Pie
// // data={data}
// // innerRadius={50}
// // outerRadius={75}
// // paddingAngle={4}
// // dataKey="value"
// // >

// // {
// // data.map((e,i)=>

// // <Cell
// // key={i}
// // fill={COLORS[i]}
// // />

// // )
// // }

// // </Pie>

// // <Tooltip/>

// // <Legend/>

// // </PieChart>

// // </ResponsiveContainer>

// // );

// // }

// import React, { useMemo } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";

// const COLORS = [
//   "#22c55e",
//   "#ef4444",
// ];

// export default function FeeCollectionDonut({
//   paid = 0,
//   due = 0,
// }) {

//   const data = useMemo(() => {
//     return [
//       {
//         name: "Paid",
//         value: Number(paid) || 0,
//       },
//       {
//         name: "Due",
//         value: Number(due) || 0,
//       },
//     ];
//   }, [paid, due]);

//   return (
//     <ResponsiveContainer
//       width="100%"
//       height={220}
//     >

//       <PieChart>

//         <Pie
//           data={data}
//           innerRadius={50}
//           outerRadius={75}
//           paddingAngle={4}
//           dataKey="value"
//         >

//           {data.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`}
//               fill={COLORS[index]}
//             />
//           ))}

//         </Pie>

//         <Tooltip
//           formatter={(value) =>
//             `₹${Number(value).toLocaleString("en-IN")}`
//           }
//         />

//         <Legend />

//       </PieChart>

//     </ResponsiveContainer>
//   );
// }


import React, { useMemo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#10b981",
  "#f43f5e",
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

  return `₹${number.toLocaleString("en-IN")}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  return (
    <div
      style={{
        background: "rgba(255,255,255,.98)",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "9px 12px",
        boxShadow: "0 10px 25px rgba(15,23,42,.12)",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#475569",
        }}
      >
        {item?.name}
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color:
            item?.name === "Paid"
              ? "#059669"
              : "#e11d48",
          marginTop: "2px",
        }}
      >
        ₹{Number(item?.value || 0).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

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

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const paidPercentage =
    total > 0
      ? Math.round((Number(paid) / total) * 100)
      : 0;

  const duePercentage =
    total > 0
      ? Math.round((Number(due) / total) * 100)
      : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <ResponsiveContainer width="100%" height={175}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={53}
            outerRadius={76}
            paddingAngle={5}
            cornerRadius={7}
            dataKey="value"
            stroke="none"
            animationDuration={900}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            content={<CustomTooltip />}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER CONTENT */}
      <div
        style={{
          position: "absolute",
          top: "49%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            color: "#94a3b8",
            fontWeight: 600,
            marginBottom: "2px",
          }}
        >
          Total
        </div>

        <div
          style={{
            fontSize: "15px",
            fontWeight: 800,
            color: "#0f172a",
            whiteSpace: "nowrap",
          }}
        >
          {formatAmount(total)}
        </div>
      </div>

      {/* SUMMARY */}
      <div
        className="d-flex justify-content-center gap-3"
        style={{
          marginTop: "-2px",
        }}
      >
        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
              }}
            />

            <span
              style={{
                fontSize: "9px",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              Paid
            </span>
          </div>

          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#059669",
              marginTop: "2px",
            }}
          >
            {paidPercentage}%
          </div>
        </div>

        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#f43f5e",
              }}
            />

            <span
              style={{
                fontSize: "9px",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              Due
            </span>
          </div>

          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#e11d48",
              marginTop: "2px",
            }}
          >
            {duePercentage}%
          </div>
        </div>
      </div>
    </div>
  );
}

