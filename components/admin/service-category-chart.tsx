"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Wellness", value: 8 },
  { name: "Activities", value: 12 },
  { name: "Dining", value: 6 },
  { name: "Accommodation", value: 4 },
  { name: "Transportation", value: 3 },
  { name: "Entertainment", value: 3 },
]

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#A855F7", "#6B7280", "#EC4899"]

export function ServiceCategoryChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} services`, "Count"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
