"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Spa Treatment", value: 35 },
  { name: "Restaurant", value: 25 },
  { name: "Lake Tour", value: 20 },
  { name: "Room Service", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["hsl(var(--primary))", "#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"]

export function PopularServicesChart() {
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
          <Tooltip formatter={(value) => [`${value} bookings`, "Count"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
