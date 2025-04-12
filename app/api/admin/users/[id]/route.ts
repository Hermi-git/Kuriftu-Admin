import { NextResponse } from "next/server"

// Mock data - this would be imported from a shared data store in a real app
let users = [
  {
    id: "1",
    name: "Amanuel Tesfaye",
    email: "amanuel@example.com",
    status: "active",
    tier: "Gold",
    points: 1250,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Meseret Alemu",
    email: "meseret@example.com",
    status: "active",
    tier: "Silver",
    points: 750,
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Bekele Tadesse",
    email: "bekele@example.com",
    status: "inactive",
    tier: "Bronze",
    points: 350,
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Saba Desta",
    email: "saba@example.com",
    status: "active",
    tier: "Platinum",
    points: 2500,
    joinDate: "2022-11-05",
  },
  {
    id: "5",
    name: "Tesfaye Abebe",
    email: "tesfaye@example.com",
    status: "active",
    tier: "Gold",
    points: 1100,
    joinDate: "2023-01-30",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find user index
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    users[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find user index
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  users = users.filter((user) => user.id !== id)

  return NextResponse.json({ success: true })
}
