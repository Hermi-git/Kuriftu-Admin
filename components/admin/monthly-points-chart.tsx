"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12500,
  },
  {
    name: "Feb",
    total: 18200,
  },
  {
    name: "Mar",
    total: 23400,
  },
  {
    name: "Apr",
    total: 29800,
  },
  {
    name: "May",
    total: 34500,
  },
  {
    name: "Jun",
    total: 42000,
  },
]

export function MonthlyPointsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
        <Tooltip formatter={(value) => [`${value.toLocaleString()} points`, "Total"]} />
        <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
