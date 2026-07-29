import React from "react";
import {
PieChart,
Pie,
Cell,
ResponsiveContainer,
Tooltip,
Legend
} from "recharts";

const data=[
{
name:"Paid",
value:580000
},
{
name:"Due",
value:120000
}
];

const COLORS=["#22c55e","#ef4444"];

export default function FeeCollectionDonut(){

return(

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

{
data.map((e,i)=>

<Cell
key={i}
fill={COLORS[i]}
/>

)
}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

);

}