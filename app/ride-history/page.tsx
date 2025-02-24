"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Clock, Search, CalendarRange, Navigation2, Star, Filter } from "lucide-react"

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
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredRides = rides.filter(ride => {
    const matchesFilter = filter === "all" || ride.status === filter
    const matchesSearch = searchTerm === "" || 
      ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalSpent = rides
    .filter(ride => ride.status === "completed")
    .reduce((sum, ride) => sum + ride.fare, 0)

  return (
    <div className="container mx-auto p-4 space-y-6 lg:px-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ride History</h1>
          <p className="text-muted-foreground mt-1">View and manage your past rides</p>
        </div>
        <Card className="md:w-auto">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search rides..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rides</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredRides.map((ride) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src={ride.driver.avatar} />
                      <AvatarFallback className="text-lg">{ride.driver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {ride.driver.name}
                        <Badge 
                          variant="outline" 
                          className={`${
                            ride.status === "completed" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {ride.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {new Date(ride.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${ride.fare.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Fare</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="relative pl-6 space-y-4">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                  <div className="relative">
                    <div className="absolute left-[-1.35rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Pickup</div>
                      <div className="font-medium">{ride.pickup}</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-[-1.35rem] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Destination</div>
                      <div className="font-medium">{ride.destination}</div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end pt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation2 className="h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        {filteredRides.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <Search className="h-8 w-8" />
              <h3 className="font-semibold">No rides found</h3>
              <p>Try adjusting your search or filter settings</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}