"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 45,
  },
  {
    name: "Feb",
    total: 38,
  },
  {
    name: "Mar",
    total: 52,
  },
  {
    name: "Apr",
    total: 63,
  },
  {
    name: "May",
    total: 71,
  },
  {
    name: "Jun",
    total: 85,
  },
]

export function RedemptionsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
