import { NextResponse } from "next/server"

// Mock data
const rewards = [
  {
    id: "1",
    name: "Free Night Stay",
    description: "Enjoy a complimentary night stay at any Kuriftu Resort location.",
    pointValue: 5000,
    isActive: true,
    createdAt: "2023-01-10",
  },
  {
    id: "2",
    name: "Spa Treatment",
    description: "Relax with a 60-minute spa treatment of your choice.",
    pointValue: 2500,
    isActive: true,
    createdAt: "2023-02-15",
  },
  {
    id: "3",
    name: "Dinner for Two",
    description: "Romantic dinner for two at our lakeside restaurant.",
    pointValue: 1800,
    isActive: true,
    createdAt: "2023-03-20",
  },
  {
    id: "4",
    name: "Lake Tour",
    description: "Guided boat tour of the lake with refreshments.",
    pointValue: 1200,
    isActive: false,
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    name: "Airport Transfer",
    description: "Complimentary airport transfer to/from the resort.",
    pointValue: 1000,
    isActive: true,
    createdAt: "2023-05-12",
  },
]

export async function GET() {
  return NextResponse.json(rewards)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description || body.pointValue === undefined) {
      return NextResponse.json({ error: "Name, description, and pointValue are required" }, { status: 400 })
    }

    // Create new reward
    const newReward = {
      id: (rewards.length + 1).toString(),
      name: body.name,
      description: body.description,
      pointValue: body.pointValue,
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: body.createdAt || new Date().toISOString().split("T")[0],
    }

    rewards.push(newReward)

    return NextResponse.json(newReward, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reward" }, { status: 500 })
  }
}
