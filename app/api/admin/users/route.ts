import { NextResponse } from "next/server"

// Mock data
const users = [
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


export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name: body.name,
      email: body.email,
      status: body.status || "active",
      tier: body.tier || "Bronze",
      points: body.points || 0,
      joinDate: body.joinDate || new Date().toISOString().split("T")[0],
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
