"use client"

import { SetStateAction, useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock data
const initialServices = [
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
    {
      id: "6",
      name: "Sauna & Steam Room",
      category: "Wellness",
      description: "Unwind in our fully-equipped sauna and steam facilities.",
      pointValue: 100,
      createdAt: "2023-06-01",
    },
    {
      id: "7",
      name: "Yoga Session",
      category: "Wellness",
      description: "Daily group yoga sessions with experienced instructors.",
      pointValue: 80,
      createdAt: "2023-06-10",
    },
    {
      id: "8",
      name: "Nature Hike",
      category: "Activities",
      description: "Scenic guided hikes in the nearby forest trails.",
      pointValue: 90,
      createdAt: "2023-07-01",
    },
    {
      id: "9",
      name: "Cooking Class",
      category: "Activities",
      description: "Learn to cook local dishes with our expert chefs.",
      pointValue: 130,
      createdAt: "2023-07-15",
    },
    {
      id: "10",
      name: "Breakfast Buffet",
      category: "Dining",
      description: "Unlimited access to our morning buffet with continental and local options.",
      pointValue: 70,
      createdAt: "2023-07-20",
    },
    {
      id: "11",
      name: "Private Dining",
      category: "Dining",
      description: "Enjoy a romantic dinner setup by the lake.",
      pointValue: 160,
      createdAt: "2023-08-01",
    },
    {
      id: "12",
      name: "Daily Housekeeping",
      category: "Accommodation",
      description: "Room cleaning and towel replacement every day.",
      pointValue: 60,
      createdAt: "2023-08-10",
    },
    {
      id: "13",
      name: "Laundry Service",
      category: "Accommodation",
      description: "Same-day laundry and ironing service.",
      pointValue: 90,
      createdAt: "2023-08-20",
    },
    {
      id: "14",
      name: "Car Rental",
      category: "Transportation",
      description: "Rent vehicles for personal use or guided tours.",
      pointValue: 140,
      createdAt: "2023-09-01",
    },
    {
      id: "15",
      name: "Valet Parking",
      category: "Transportation",
      description: "Professional valet service for all guests.",
      pointValue: 60,
      createdAt: "2023-09-10",
    },
    {
      id: "16",
      name: "Live Music Nights",
      category: "Entertainment",
      description: "Evening performances by local bands and artists.",
      pointValue: 110,
      createdAt: "2023-09-20",
    },
    {
      id: "17",
      name: "Movie Night",
      category: "Entertainment",
      description: "Outdoor screening of popular and classic films.",
      pointValue: 70,
      createdAt: "2023-10-01",
    },
    {
      id: "18",
      name: "Kids Play Zone",
      category: "Entertainment",
      description: "Indoor and outdoor play area with supervision.",
      pointValue: 60,
      createdAt: "2023-10-10",
    },
    {
      id: "19",
      name: "Game Room Access",
      category: "Entertainment",
      description: "Arcade games, billiards, and board games.",
      pointValue: 80,
      createdAt: "2023-10-15",
    },
    {
      id: "20",
      name: "Personal Fitness Trainer",
      category: "Wellness",
      description: "One-on-one fitness sessions with a certified trainer.",
      pointValue: 150,
      createdAt: "2023-10-20",
    }
]

const categories = ["Wellness", "Activities", "Dining", "Accommodation", "Transportation", "Entertainment", "Other"]
type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  pointValue: number;
  createdAt: string;
};
export default function ServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [newService, setNewService] = useState({
    name: "",
    category: "Wellness",
    description: "",
    pointValue: 0,
  })
  const { toast } = useToast()

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddService = () => {
    const id = (services.length + 1).toString()
    const service = {
      id,
      ...newService,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setServices([...services, service])
    setNewService({
      name: "",
      category: "Wellness",
      description: "",
      pointValue: 0,
    })
    setIsAddServiceOpen(false)

    toast({
      title: "Service Added",
      description: `${service.name} has been added successfully.`,
    })
  }

  const handleEditService = (service: Service | null) => {
    setCurrentService(service)
    setIsEditServiceOpen(true)
  }

  const handleUpdateService = () => {
    if(!currentService){
      return ;
    }
    const updatedServices = services.map((service) => (service.id === currentService.id ? currentService : service))

    setServices(updatedServices)
    setIsEditServiceOpen(false)

    toast({
      title: "Service Updated",
      description: `${currentService.name} has been updated successfully.`,
    })
  }

  const handleDeleteService = (id: string) => {
    const updatedServices = services.filter((service) => service.id !== id)
    setServices(updatedServices)

    toast({
      title: "Service Deleted",
      description: "The service has been deleted successfully.",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wellness":
        return "bg-blue-500 hover:bg-blue-500"
      case "Activities":
        return "bg-green-500 hover:bg-green-500"
      case "Dining":
        return "bg-amber-500 hover:bg-amber-500"
      case "Accommodation":
        return "bg-purple-500 hover:bg-purple-500"
      case "Transportation":
        return "bg-gray-500 hover:bg-gray-500"
      case "Entertainment":
        return "bg-pink-500 hover:bg-pink-500"
      default:
        return "bg-slate-500 hover:bg-slate-500"
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service for the loyalty program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-m uted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pointValue">Point Value</Label>
                <Input
                  id="pointValue"
                  type="number"
                  value={newService.pointValue}
                  onChange={(e) => setNewService({ ...newService, pointValue: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Services Management</CardTitle>
          <CardDescription>Manage your resort services, categorize them, and set point values.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
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
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(service.category)}>{service.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>{service.pointValue}</TableCell>
                    <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditService(service)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteService(service.id)}
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

      {/* Edit Service Dialog */}
      {currentService && (
        <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>Update service information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentService.category}
                  onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentService.description}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pointValue">Point Value</Label>
                <Input
                  id="edit-pointValue"
                  type="number"
                  value={currentService.pointValue}
                  onChange={(e) =>
                    setCurrentService({ ...currentService, pointValue: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditServiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateService}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
