'use client'


import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {name: 'Jan', delta: 40, alpha: 24, canary:24},
    {name: 'Feb', delta: 30, alpha: 18, canary:26},
    {name: 'Mar', delta: 25, alpha: 14, canary:28},
    {name: 'Apr', delta: 35, alpha: 20, canary:22},
    {name: 'May', delta: 20, alpha: 15, canary:24},
    {name: 'Jun', delta: 28, alpha: 22, canary:20},
    {name: 'Jul', delta: 22, alpha: 16, canary:26},
    {name: 'Aug', delta: 32, alpha: 28, canary:24},
    {name: 'Sep', delta: 38, alpha: 32, canary:22},
    {name: 'Oct', delta: 30, alpha: 26, canary:20},
    {name: 'Nov', delta: 26, alpha: 20, canary:28},
    {name: 'Dec', delta: 24, alpha: 18, canary:26},
]
export default function SupportTicketsResolved() {
    return (
        <ResponsiveContainer height={350} width='100%'>
            <LineChart data={data}>
                <Tooltip labelClassName='font-bold' wrapperClassName='!text-sm dark:!bg-black rounded-md dark:!border-border'/>
                <XAxis fontSize={12} dataKey='name' stroke='#888888' />
                <YAxis fontSize={12} stroke='#888888'/>
                <CartesianGrid strokeDasharray='3'/>
            <Line type='monotone' dataKey='alpha' stroke='#84cc16'/>
                <Line type='monotone' dataKey='delta'  stroke='#3b82f6'/>
                <Line type='monotone' dataKey='canary'  stroke='#f97316'/>
                <Legend formatter={(value) => <span className='capitalize'>{value}</span>}/>
            </LineChart>
        </ResponsiveContainer>
    )
}