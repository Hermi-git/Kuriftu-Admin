import { NextResponse } from "next/server"

// Mock data - this would be imported from a shared data store in a real app
let services = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const service = services.find((service) => service.id === id)

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 })
  }

  return NextResponse.json(service)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find service index
    const serviceIndex = services.findIndex((service) => service.id === id)

    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Update service
    const updatedService = {
      ...services[serviceIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    services[serviceIndex] = updatedService

    return NextResponse.json(updatedService)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find service index
  const serviceIndex = services.findIndex((service) => service.id === id)

  if (serviceIndex === -1) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 })
  }

  // Remove service
  services = services.filter((service) => service.id !== id)

  return NextResponse.json({ success: true })
}
