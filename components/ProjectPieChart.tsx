'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface PieChartProps {
  data: Record<string, number>
}

const COLORS: Record<string, string> = {
  CRITICAL: '#dc2626', // red-600
  SERIOUS: '#eab308',  // yellow-500
  MODERATE: '#3b82f6', // blue-500
  MINOR: '#6b7280',    // gray-500
}

export function ProjectPieChart({ data }: PieChartProps) {
  const chartData = Object.entries(data).map(([impact, value]) => ({ name: impact, value }))

  return (
    <div className=" dark:bg-gray-950 p-4 ">
      <h3 className="text-sm font-semibold mb-4">Violations by Impact</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
