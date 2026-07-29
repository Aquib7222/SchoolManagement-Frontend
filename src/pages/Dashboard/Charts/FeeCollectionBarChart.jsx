import React from "react";

import{

ResponsiveContainer,

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

Cell

}from"recharts";

const data=[

{

class:"I",

fee:35000

},

{

class:"II",

fee:42000

},

{

class:"III",

fee:52000

},

{

class:"IV",

fee:28000

},

{

class:"V",

fee:61000

}

];

const colors=[

"#2563eb",

"#22c55e",

"#f59e0b",

"#ec4899",

"#8b5cf6"

];

export default function FeeCollectionBarChart(){

return(

<ResponsiveContainer
width="100%"
height={220}
>

<BarChart
data={data}
>

<XAxis
dataKey="class"
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="fee"
radius={[10,10,0,0]}
>

{

data.map((e,i)=>

<Cell
key={i}
fill={colors[i]}
/>

)

}

</Bar>

</BarChart>

</ResponsiveContainer>

);

}