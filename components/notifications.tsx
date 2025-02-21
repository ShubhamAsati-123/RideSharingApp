"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Notification {
  id: string
  message: string
  time: string
  read: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Your shared ride match has been found!",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      message: "Rate your last ride with John",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      message: "Your ride is arriving in 5 minutes",
      time: "2 hours ago",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`flex flex-col items-start p-3 ${!notification.read ? "bg-muted/50" : ""}`}
          >
            <p className="text-sm">{notification.message}</p>
            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

