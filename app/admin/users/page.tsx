"use client";

import { SetStateAction, useState } from "react";
import { ChevronDown, Download, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const initialUsers = [
  {
    id: "1",
    name: "Abebe",
    email: "john@example.com",
    status: "active",
    tier: "Ras/Derwa",
    points: 1250,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    tier: "Mesafint/Mekulla",
    points: 750,
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    status: "inactive",
    tier: "Nigus/Mogassa",
    points: 350,
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "active",
    tier: "Fitawrari / Fullas",
    points: 2500,
    joinDate: "2022-11-05",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    tier: "Ras/Derwa",
    points: 1100,
    joinDate: "2023-01-30",
  },
  { id: "6", name: "Liya Desta", email: "liya@example.com", status: "active", tier: "Mesafint/Mekulla", points: 980, joinDate: "2023-04-12" },
  { id: "7", name: "Tewodros Mekonnen", email: "tewodros@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 430, joinDate: "2022-12-25" },
  { id: "8", name: "Hana Gebre", email: "hana@example.com", status: "active", tier: "Fitawrari / Fullas", points: 2130, joinDate: "2023-06-01" },
  { id: "9", name: "Samuel Fikre", email: "samuel@example.com", status: "inactive", tier: "Ras/Derwa", points: 670, joinDate: "2023-07-18" },
  { id: "10", name: "Meron Abate", email: "meron@example.com", status: "active", tier: "Mesafint/Mekulla", points: 1450, joinDate: "2023-09-09" },
  { id: "11", name: "Yared Alemu", email: "yared@example.com", status: "active", tier: "Nigus/Mogassa", points: 1020, joinDate: "2023-03-14" },
  { id: "12", name: "Selam Mulu", email: "selam@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 250, joinDate: "2022-10-20" },
  { id: "13", name: "Daniel Tesfaye", email: "daniel@example.com", status: "active", tier: "Ras/Derwa", points: 1750, joinDate: "2023-05-06" },
  { id: "14", name: "Betelhem Sileshi", email: "betelhem@example.com", status: "active", tier: "Mesafint/Mekulla", points: 890, joinDate: "2023-01-23" },
  { id: "15", name: "Kaleab Haile", email: "kaleab@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 520, joinDate: "2023-02-11" },
  { id: "16", name: "Elshaday Biru", email: "elshaday@example.com", status: "active", tier: "Fitawrari / Fullas", points: 2300, joinDate: "2022-09-01" },
  { id: "17", name: "Nahom Tadesse", email: "nahom@example.com", status: "inactive", tier: "Ras/Derwa", points: 300, joinDate: "2023-04-28" },
  { id: "18", name: "Eden Kidane", email: "eden@example.com", status: "active", tier: "Mesafint/Mekulla", points: 1600, joinDate: "2023-07-30" },
  { id: "19", name: "Yonatan Gebru", email: "yonatan@example.com", status: "active", tier: "Nigus/Mogassa", points: 720, joinDate: "2022-12-10" },
  { id: "20", name: "Mikias Asfaw", email: "mikias@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 480, joinDate: "2023-03-22" },
  { id: "21", name: "Blen Mebrahtu", email: "blen@example.com", status: "active", tier: "Ras/Derwa", points: 1900, joinDate: "2023-05-14" },
  { id: "22", name: "Sisay Demissie", email: "sisay@example.com", status: "active", tier: "Mesafint/Mekulla", points: 830, joinDate: "2023-06-05" },
  { id: "23", name: "Luwam Desta", email: "luwam@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 610, joinDate: "2023-02-26" },
  { id: "24", name: "Nathan Wondimu", email: "nathan@example.com", status: "active", tier: "Fitawrari / Fullas", points: 2100, joinDate: "2023-01-02" },
  { id: "25", name: "Rahel Worku", email: "rahel@example.com", status: "inactive", tier: "Ras/Derwa", points: 560, joinDate: "2022-11-19" },
  { id: "26", name: "Temesgen Fikadu", email: "temesgen@example.com", status: "active", tier: "Mesafint/Mekulla", points: 1380, joinDate: "2023-04-17" },
  { id: "27", name: "Hermela Tsegaye", email: "hermela@example.com", status: "active", tier: "Nigus/Mogassa", points: 940, joinDate: "2023-06-10" },
  { id: "28", name: "Fitsum Girmay", email: "fitsum@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 370, joinDate: "2023-02-18" },
  { id: "29", name: "Kalkidan Taye", email: "kalkidan@example.com", status: "active", tier: "Ras/Derwa", points: 1550, joinDate: "2022-12-04" },
  { id: "30", name: "Henok Mesfin", email: "henok@example.com", status: "active", tier: "Mesafint/Mekulla", points: 870, joinDate: "2023-05-29" },
  { id: "31", name: "Tsion Meles", email: "tsion@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 420, joinDate: "2023-01-20" },
  { id: "32", name: "Robel Yonas", email: "robel@example.com", status: "active", tier: "Fitawrari / Fullas", points: 2000, joinDate: "2023-07-04" },
  { id: "33", name: "Mahi Berhanu", email: "mahi@example.com", status: "active", tier: "Ras/Derwa", points: 1780, joinDate: "2023-03-08" },
  { id: "34", name: "Saron Gebre", email: "saron@example.com", status: "inactive", tier: "Mesafint/Mekulla", points: 600, joinDate: "2022-10-27" },
  { id: "35", name: "Fiker Addisu", email: "fiker@example.com", status: "active", tier: "Nigus/Mogassa", points: 1330, joinDate: "2023-06-20" },
  { id: "36", name: "Yohannes Belay", email: "yohannes@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 310, joinDate: "2023-02-03" },
  { id: "37", name: "Mahlet Alemayehu", email: "mahlet@example.com", status: "active", tier: "Ras/Derwa", points: 1950, joinDate: "2023-05-01" },
  { id: "38", name: "Eyob Zewdu", email: "eyob@example.com", status: "active", tier: "Mesafint/Mekulla", points: 880, joinDate: "2022-12-30" },
  { id: "39", name: "Tigist Bekele", email: "tigist@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 470, joinDate: "2023-03-15" },
  { id: "40", name: "Bereket Tesema", email: "bereket@example.com", status: "active", tier: "Fitawrari / Fullas", points: 2160, joinDate: "2023-06-07" },
  { id: "41", name: "Hilina Gebremedhin", email: "hilina@example.com", status: "inactive", tier: "Ras/Derwa", points: 350, joinDate: "2023-01-10" },
  { id: "42", name: "Lidya Amanuel", email: "lidya@example.com", status: "active", tier: "Mesafint/Mekulla", points: 1120, joinDate: "2023-04-22" },
  { id: "43", name: "Kidan Tesfom", email: "kidan@example.com", status: "active", tier: "Nigus/Mogassa", points: 970, joinDate: "2023-06-14" },
  { id: "44", name: "Surafel Eyasu", email: "surafel@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 260, joinDate: "2023-02-12" },
  { id: "45", name: "Mikiyas Yifru", email: "mikiyas@example.com", status: "active", tier: "Ras/Derwa", points: 1600, joinDate: "2023-05-18" },
  { id: "46", name: "Sosina Fisseha", email: "sosina@example.com", status: "active", tier: "Mesafint/Mekulla", points: 920, joinDate: "2022-11-11" },
  { id: "47", name: "Yonas Tadele", email: "yonas@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 590, joinDate: "2023-01-28" },
  { id: "48", name: "Hermon Girma", email: "hermon@example.com", status: "active", tier: "Fitawrari / Fullas", points: 1800, joinDate: "2023-07-11" },
  { id: "49", name: "Feven Ermias", email: "feven@example.com", status: "inactive", tier: "Ras/Derwa", points: 410, joinDate: "2023-03-03" },
  { id: "50", name: "Nahom Mekuria", email: "nahommekuria@example.com", status: "active", tier: "Mesafint/Mekulla", points: 1400, joinDate: "2023-06-30" },
  { id: "51", name: "Rediet Molla", email: "rediet@example.com", status: "active", tier: "Nigus/Mogassa", points: 990, joinDate: "2023-02-05" },
  { id: "52", name: "Faven Gidey", email: "faven@example.com", status: "inactive", tier: "Fitawrari / Fullas", points: 470, joinDate: "2023-01-13" },
  { id: "53", name: "Sami Desta", email: "sami@example.com", status: "active", tier: "Ras/Derwa", points: 1500, joinDate: "2023-05-09" },
  { id: "54", name: "Mahi Girum", email: "mahi.girum@example.com", status: "active", tier: "Mesafint/Mekulla", points: 880, joinDate: "2023-03-25" },
  { id: "55", name: "Hiwot Alemayehu", email: "hiwot@example.com", status: "inactive", tier: "Nigus/Mogassa", points: 540, joinDate: "2023-04-04" }, 
];
type User = {
  id:string;
  name:string;
  email:string;
  status:string;
  tier:string;
  points:number;
  joinDate:string;

}
export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    tier: "Nigus/Mogassa",
    points: 0,
  });
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const id = (users.length + 1).toString();
    const user = {
      id,
      ...newUser,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      tier: "Fitawrari/Fullas",
      points: 0,
    });
    setIsAddUserOpen(false);

    toast({
      title: "User Added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleEditUser = (user:User | null) => {
    setCurrentUser(user);
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = () => {
    if(!currentUser){
      return;
    }
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? currentUser : user));

    setUsers(updatedUsers);
    setIsEditUserOpen(false);

    toast({
      title: "User Updated",
      description: `${currentUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-500" : "bg-gray-400";
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Fitawrari / Fullas":
        return "bg-purple-500";
      case "Ras/Derwa":
        return "bg-yellow-500";
      case "Mesafint/Mekulla":
        return "bg-gray-400";
      default:
        return "bg-amber-700";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Add a new user to the loyalty program.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tier">Tier</Label>
                <select
                  id="tier"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newUser.tier}
                  onChange={(e) => setNewUser({ ...newUser, tier: e.target.value })}
                >
                  <option value="Nigus/Mogassa">Nigus/Mogassa</option>
                  <option value="Mesafint/Mekulla">Mesafint/Mekulla</option>
                  <option value="Ras/Derwa">Ras/Derwa</option>
                  <option value="Fitawrari / Fullas">Fitawrari/Fullas</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={newUser.points}
                  onChange={(e) => setNewUser({ ...newUser, points: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage your loyalty program users, view their status, and edit their information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`} />
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTierColor(user.tier)} hover:${getTierColor(user.tier)}`}>
                        {user.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.points.toLocaleString()}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteUser(user.id)}
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

      {/* Edit User Dialog */}
      {currentUser && (
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentUser.status}
                  onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-tier">Tier</Label>
                <select
                  id="edit-tier"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentUser.tier}
                  onChange={(e) => setCurrentUser({ ...currentUser, tier: e.target.value })}
                >
                  <option value="Nigus/Mogassa">Nigus/Mogassa</option>
                  <option value="Mesafint/Mekulla">Mesafint/Mekulla</option>
                  <option value="Ras/Derwa">Ras/Derwa</option>
                  <option value="Fitawrari / Fullas">Fitawrari/Fullas</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-points">Points</Label>
                <Input
                  id="edit-points"
                  type="number"
                  value={currentUser.points}
                  onChange={(e) => setCurrentUser({ ...currentUser, points: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}