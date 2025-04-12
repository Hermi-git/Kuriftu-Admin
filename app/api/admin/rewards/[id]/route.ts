import { NextResponse } from "next/server"

// Mock data - this would be imported from a shared data store in a real app
let rewards = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const reward = rewards.find((reward) => reward.id === id)

  if (!reward) {
    return NextResponse.json({ error: "Reward not found" }, { status: 404 })
  }

  return NextResponse.json(reward)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find reward index
    const rewardIndex = rewards.findIndex((reward) => reward.id === id)

    if (rewardIndex === -1) {
      return NextResponse.json({ error: "Reward not found" }, { status: 404 })
    }

    // Update reward
    const updatedReward = {
      ...rewards[rewardIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    rewards[rewardIndex] = updatedReward

    return NextResponse.json(updatedReward)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update reward" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find reward index
  const rewardIndex = rewards.findIndex((reward) => reward.id === id)

  if (rewardIndex === -1) {
    return NextResponse.json({ error: "Reward not found" }, { status: 404 })
  }

  // Remove reward
  rewards = rewards.filter((reward) => reward.id !== id)

  return NextResponse.json({ success: true })
}
