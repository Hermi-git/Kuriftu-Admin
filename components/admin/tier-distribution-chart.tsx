"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Bronze", value: 450 },
  { name: "Silver", value: 350 },
  { name: "Gold", value: 280 },
  { name: "Platinum", value: 168 },
]

const COLORS = ["#A77B4F", "#C0C0C0", "#FFD700", "#E5E4E2"]

export function TierDistributionChart() {
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
          <Tooltip formatter={(value) => [`${value} members`, "Count"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
