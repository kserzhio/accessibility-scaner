'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface LineChartProps {
    data: {
        url: string
        date: string
        compliance: number
    }[]
}

export function ProjectLineChart({ data }: LineChartProps) {
    const formatted = data.map(d => ({
        name: new Date(d.date).toLocaleDateString(),
        compliance: d.compliance,
    }))

    return (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-semibold mb-4">Compliance Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={formatted}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="compliance" stroke="#16a34a" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}