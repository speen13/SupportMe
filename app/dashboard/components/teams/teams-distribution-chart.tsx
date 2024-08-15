'use client'

import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const data = [
    {name: 'Delta', value: 55, color: '#84cc16'},
    {name: 'Alpha', value: 40, color: '#f9c23c'},
    {name: 'Beta', value: 25, color: '#e83e8c'},
    {name: 'Gamma', value: 15, color: '#2989d8'},
    {name: 'Epsilon', value: 10, color: '#007bff'},

]
export default function TeamDistributionChart() {
    return (
        <ResponsiveContainer width='100%' height={150}>
<PieChart>
    <Tooltip labelClassName='font-bold' wrapperClassName='dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black  !text-sm dark:!bg-black rounded-md dark:!border-border'/>
    <Pie data={data} dataKey='value' nameKey='name'>
        {data.map((dataItem, i) => (
            <Cell key={i} fill={dataItem.color}/>
        ))}
    </Pie>
</PieChart>
        </ResponsiveContainer>
    )
}