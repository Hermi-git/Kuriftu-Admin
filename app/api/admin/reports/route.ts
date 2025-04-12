import { NextResponse } from "next/server"

// Mock report data
const reportData = {
  // User statistics
  userStats: {
    total: 1248,
    growth: 12,
    tierDistribution: [
      { name: "Bronze", value: 450 },
      { name: "Silver", value: 350 },
      { name: "Gold", value: 280 },
      { name: "Platinum", value: 168 },
    ],
    monthlyPoints: [
      { name: "Jan", total: 12500 },
      { name: "Feb", total: 18200 },
      { name: "Mar", total: 23400 },
      { name: "Apr", total: 29800 },
      { name: "May", total: 34500 },
      { name: "Jun", total: 42000 },
    ],
  },

  // Reward statistics
  rewardStats: {
    total: 24,
    newThisMonth: 2,
    redemptions: [
      { name: "Jan", total: 45 },
      { name: "Feb", total: 38 },
      { name: "Mar", total: 52 },
      { name: "Apr", total: 63 },
      { name: "May", total: 71 },
      { name: "Jun", total: 85 },
    ],
    topRedeemed: [
      { name: "Free Night Stay", value: 120 },
      { name: "Spa Treatment", value: 95 },
      { name: "Dinner for Two", value: 78 },
      { name: "Lake Tour", value: 65 },
      { name: "Airport Transfer", value: 42 },
    ],
  },

  // Service statistics
  serviceStats: {
    total: 36,
    newThisMonth: 4,
    categoryDistribution: [
      { name: "Wellness", value: 8 },
      { name: "Activities", value: 12 },
      { name: "Dining", value: 6 },
      { name: "Accommodation", value: 4 },
      { name: "Transportation", value: 3 },
      { name: "Entertainment", value: 3 },
    ],
    popularServices: [
      { name: "Spa Treatment", value: 35 },
      { name: "Restaurant", value: 25 },
      { name: "Lake Tour", value: 20 },
      { name: "Room Service", value: 15 },
      { name: "Other", value: 5 },
    ],
    monthlyBookings: [
      { name: "Jan", total: 1200 },
      { name: "Feb", total: 1900 },
      { name: "Mar", total: 2300 },
      { name: "Apr", total: 2800 },
      { name: "May", total: 3500 },
      { name: "Jun", total: 4200 },
    ],
  },

  // Revenue statistics
  revenueStats: {
    total: 45231.89,
    growth: 20.1,
  },
}

export async function GET() {
  return NextResponse.json(reportData)
}
