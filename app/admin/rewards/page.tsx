"use client"

import { useState } from "react"
import { ChevronDown, Download, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Mock data
const initialRewards = [
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

export default function RewardsPage() {
  const [rewards, setRewards] = useState(initialRewards)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false)
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false)
  const [currentReward, setCurrentReward] = useState(null)
  const [newReward, setNewReward] = useState({
    name: "",
    description: "",
    pointValue: 0,
    isActive: true,
  })
  const { toast } = useToast()

  const filteredRewards = rewards.filter(
    (reward) =>
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddReward = () => {
    const id = (rewards.length + 1).toString()
    const reward = {
      id,
      ...newReward,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setRewards([...rewards, reward])
    setNewReward({
      name: "",
      description: "",
      pointValue: 0,
      isActive: true,
    })
    setIsAddRewardOpen(false)

    toast({
      title: "Reward Added",
      description: `${reward.name} has been added successfully.`,
    })
  }

  const handleEditReward = (reward) => {
    setCurrentReward(reward)
    setIsEditRewardOpen(true)
  }

  const handleUpdateReward = () => {
    const updatedRewards = rewards.map((reward) => (reward.id === currentReward.id ? currentReward : reward))

    setRewards(updatedRewards)
    setIsEditRewardOpen(false)

    toast({
      title: "Reward Updated",
      description: `${currentReward.name} has been updated successfully.`,
    })
  }

  const handleDeleteReward = (id) => {
    const updatedRewards = rewards.filter((reward) => reward.id !== id)
    setRewards(updatedRewards)

    toast({
      title: "Reward Deleted",
      description: "The reward has been deleted successfully.",
    })
  }

  const handleToggleStatus = (id) => {
    const updatedRewards = rewards.map((reward) => {
      if (reward.id === id) {
        return { ...reward, isActive: !reward.isActive }
      }
      return reward
    })

    setRewards(updatedRewards)

    const reward = rewards.find((r) => r.id === id)
    toast({
      title: reward.isActive ? "Reward Deactivated" : "Reward Activated",
      description: `${reward.name} has been ${reward.isActive ? "deactivated" : "activated"}.`,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
        <Dialog open={isAddRewardOpen} onOpenChange={setIsAddRewardOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Reward
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reward</DialogTitle>
              <DialogDescription>Create a new reward for the loyalty program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newReward.name}
                  onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newReward.description}
                  onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pointValue">Point Value</Label>
                <Input
                  id="pointValue"
                  type="number"
                  value={newReward.pointValue}
                  onChange={(e) => setNewReward({ ...newReward, pointValue: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="isActive" className="flex-grow">
                  Active Status
                </Label>
                <Switch
                  id="isActive"
                  checked={newReward.isActive}
                  onCheckedChange={(checked) => setNewReward({ ...newReward, isActive: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRewardOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReward}>Add Reward</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Rewards Management</CardTitle>
          <CardDescription>
            Manage your loyalty program rewards, set point values, and control availability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rewards..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRewards.map((reward) => (
                  <TableRow key={reward.id}>
                    <TableCell className="font-medium">{reward.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{reward.description}</TableCell>
                    <TableCell>{reward.pointValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${reward.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                        <span>{reward.isActive ? "Active" : "Inactive"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(reward.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditReward(reward)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(reward.id)}>
                            {reward.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteReward(reward.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Reward Dialog */}
      {currentReward && (
        <Dialog open={isEditRewardOpen} onOpenChange={setIsEditRewardOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Reward</DialogTitle>
              <DialogDescription>Update reward information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={currentReward.name}
                  onChange={(e) => setCurrentReward({ ...currentReward, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentReward.description}
                  onChange={(e) => setCurrentReward({ ...currentReward, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pointValue">Point Value</Label>
                <Input
                  id="edit-pointValue"
                  type="number"
                  value={currentReward.pointValue}
                  onChange={(e) =>
                    setCurrentReward({ ...currentReward, pointValue: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-isActive" className="flex-grow">
                  Active Status
                </Label>
                <Switch
                  id="edit-isActive"
                  checked={currentReward.isActive}
                  onCheckedChange={(checked) => setCurrentReward({ ...currentReward, isActive: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditRewardOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateReward}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
