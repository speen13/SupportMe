'use client'

import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const data = [
    {name: 'Jan',office: 82, wfn: 44},
    {name: 'Feb',office: 80, wfn: 40},
    {name: 'Mar',office: 83, wfn: 42},
    {name: 'Apr',office: 50, wfn: 50},
    {name: 'May',office: 49, wfn: 43},
    {name: 'Jun',office: 60, wfn: 40},
    {name: 'Jul',office: 55, wfn: 55},
    {name: 'Aug',office: 49, wfn: 51},
    {name: 'Sep',office: 44, wfn: 70},
    {name: 'Oct',office: 40, wfn: 40},
    {name: 'Nov',office: 50, wfn: 50},
    {name: 'Dec',office: 50, wfn: 50},
]
export default function WorkLocationTrends() {
    return (
       <ResponsiveContainer height={350} width='100%'>
<BarChart data={data} className='[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800'>
    <XAxis dataKey='name' stroke='#888888' fontSize={12}/>
    <YAxis  stroke='#888888' fontSize={12}/>
    <Tooltip formatter={(value, name) => {
        if(name === 'wfn') {
            return [value, 'Work from home']
        }else if(name === 'office') {
            return [value, 'Work from office']
        }
    }} separator=':' labelClassName='font-bold' wrapperClassName='!text-sm dark:!bg-black rounded-md dark:!border-border'/>
    <Legend iconType='circle' formatter={(value) => {
        if(value === 'wfn') {
            return <div className='text-sm'>Work from home</div>
        }else if(value === 'office') {
            return <div className='text-sm'>Work from office</div>
        }
    }}/>
    <Bar dataKey='office' stackId={1} fill='#ec4899'/>
    <Bar dataKey='wfn' stackId={1} fill='#6b7280' radius={[4,4,0,0]}/>
</BarChart>
       </ResponsiveContainer>
    )
}