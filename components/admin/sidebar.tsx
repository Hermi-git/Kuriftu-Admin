"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Gift, Home, Menu, PalmtreeIcon, Settings, ShoppingBag, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const routes = [
    {
      href: "/admin",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: Users,
      title: "Users",
    },
    {
      href: "/admin/rewards",
      icon: Gift,
      title: "Rewards",
    },
    {
      href: "/admin/services",
      icon: ShoppingBag,
      title: "Services",
    },
    {
      href: "/admin/reports",
      icon: BarChart3,
      title: "Reports",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full">
            <div className="px-3 py-4 border-b">
              <div className="flex items-center gap-2 px-2">
                <PalmtreeIcon className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Kuriftu Resort</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen border-r transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          className,
        )}
      >
        <div className="px-3 py-4 border-b">
          <div className="flex items-center gap-2 px-2">
            <PalmtreeIcon className="h-6 w-6 text-primary" />
            {isOpen && <span className="text-lg font-bold">Kuriftu Resort</span>}
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <route.icon className="h-5 w-5" />
                {isOpen && route.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-3 border-t">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-center"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </div>
    </>
  )
}
