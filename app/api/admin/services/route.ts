import { NextResponse } from "next/server"

// Mock data
const services = [
  {
    id: "1",
    name: "Spa Treatment",
    category: "Wellness",
    description: "Relaxing spa treatments including massage, facials, and body scrubs.",
    pointValue: 200,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Lake Tour",
    category: "Activities",
    description: "Guided boat tour of the lake with refreshments.",
    pointValue: 150,
    createdAt: "2023-02-10",
  },
  {
    id: "3",
    name: "Fine Dining",
    category: "Dining",
    description: "Gourmet dining experience at our lakeside restaurant.",
    pointValue: 180,
    createdAt: "2023-03-05",
  },
  {
    id: "4",
    name: "Room Service",
    category: "Accommodation",
    description: "In-room dining and services.",
    pointValue: 100,
    createdAt: "2023-04-20",
  },
  {
    id: "5",
    name: "Airport Transfer",
    category: "Transportation",
    description: "Luxury transportation between airport and resort.",
    pointValue: 120,
    createdAt: "2023-05-15",
  },
]

export async function GET() {
  return NextResponse.json(services)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.category || !body.description || body.pointValue === undefined) {
      return NextResponse.json({ error: "Name, category, description, and pointValue are required" }, { status: 400 })
    }

    // Create new service
    const newService = {
      id: (services.length + 1).toString(),
      name: body.name,
      category: body.category,
      description: body.description,
      pointValue: body.pointValue,
      createdAt: body.createdAt || new Date().toISOString().split("T")[0],
    }

    services.push(newService)

    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
