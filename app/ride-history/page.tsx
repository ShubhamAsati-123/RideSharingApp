"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Ride {
  id: string
  date: string
  driver: {
    name: string
    avatar: string
  }
  pickup: string
  destination: string
  fare: number
  status: "completed" | "cancelled"
}

export default function RideHistory() {
  const [rides, setRides] = useState<Ride[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const dummyRides: Ride[] = [
      {
        id: "1",
        date: "2024-02-20",
        driver: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        pickup: "123 Main St",
        destination: "456 Park Ave",
        fare: 25.5,
        status: "completed",
      },
      {
        id: "2",
        date: "2024-02-19",
        driver: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        pickup: "789 Broadway",
        destination: "321 Fifth Ave",
        fare: 18.75,
        status: "completed",
      },
      {
        id: "3",
        date: "2024-02-18",
        driver: {
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        pickup: "555 Madison Ave",
        destination: "777 Lexington Ave",
        fare: 15.0,
        status: "cancelled",
      },
    ]
    setRides(dummyRides)
  }, [])

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ride History</h1>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {rides.map((ride) => (
          <Card key={ride.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={ride.driver.avatar} />
                    <AvatarFallback>{ride.driver.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{ride.driver.name}</CardTitle>
                    <CardDescription>{new Date(ride.date).toLocaleDateString()}</CardDescription>
                  </div>
                </div>
                <Badge variant={ride.status === "completed" ? "default" : "destructive"}>{ride.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">Pickup:</span>
                  <span className="sm:text-right">{ride.pickup}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="sm:text-right">{ride.destination}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 font-semibold">
                  <span>Fare:</span>
                  <span className="sm:text-right">${ride.fare.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

