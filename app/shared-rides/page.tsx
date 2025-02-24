"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface SharedRide {
  id: string
  driver: {
    name: string
    avatar: string
  }
  pickup: string
  destination: string
  departureTime: string
  availableSeats: number
  price: number
  distance: number
}

const locationSuggestions = [
  { value: "location1", label: "Central Park" },
  { value: "location2", label: "Times Square" },
  { value: "location3", label: "Grand Central Terminal" },
  { value: "location4", label: "Empire State Building" },
]

export default function SharedRides() {
  const [sharedRides, setSharedRides] = useState<SharedRide[]>([])
  const [selectedRide, setSelectedRide] = useState<SharedRide | null>(null)
  const [passengerCount, setPassengerCount] = useState("1")
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [openPickup, setOpenPickup] = useState(false)
  const [openDestination, setOpenDestination] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (pickup && destination) {
      const distance = Math.random() * 20
      const dummyRides: SharedRide[] = [
        {
          id: "1",
          driver: {
            name: "John Doe",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          pickup,
          destination,
          departureTime: "10:00 AM",
          availableSeats: 3,
          price: distance * 2,
          distance,
        },
        {
          id: "2",
          driver: {
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          pickup,
          destination,
          departureTime: "11:30 AM",
          availableSeats: 4,
          price: distance * 2,
          distance,
        },
      ]
      setSharedRides(dummyRides)
    }
  }, [pickup, destination])

  const handleJoinRide = (ride: SharedRide) => {
    setSelectedRide(ride)
  }

  const confirmBooking = () => {
    if (!selectedRide) return

    const passengers = Number.parseInt(passengerCount)
    const totalPrice = selectedRide.price * passengers

    const rideDetails = {
      ...selectedRide,
      passengerCount: passengers,
      totalPrice,
    }

    localStorage.setItem("currentRide", JSON.stringify(rideDetails))
    router.push("/payment")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Available Shared Rides</h1>

      {/* Location Selection */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Popover open={openPickup} onOpenChange={setOpenPickup}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={openPickup} className="w-full justify-between">
                  {pickup ? pickup : "Select pickup location..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search pickup location..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locationSuggestions.map((location) => (
                        <CommandItem
                          key={location.value}
                          onSelect={() => {
                            setPickup(location.label)
                            setOpenPickup(false)
                          }}
                        >
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={openDestination} onOpenChange={setOpenDestination}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDestination}
                  className="w-full justify-between"
                >
                  {destination ? destination : "Select destination..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search destination..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locationSuggestions.map((location) => (
                        <CommandItem
                          key={location.value}
                          onSelect={() => {
                            setDestination(location.label)
                            setOpenDestination(false)
                          }}
                        >
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Rides List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid gap-4 max-w-3xl mx-auto"
      >
        {sharedRides.map((ride) => (
          <Card key={ride.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={ride.driver.avatar} />
                    <AvatarFallback>{ride.driver.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{ride.driver.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{ride.departureTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${ride.price.toFixed(2)}/person</p>
                  <p className="text-sm text-muted-foreground">{ride.availableSeats} seats left</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <span>{ride.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span>{ride.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{ride.distance.toFixed(1)} km</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleJoinRide(ride)}
                      disabled={ride.availableSeats === 0}
                    >
                      {ride.availableSeats > 0 ? "Join Ride" : "Fully Booked"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Join Shared Ride</DialogTitle>
                      <DialogDescription>Select the number of passengers for this ride</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Select value={passengerCount} onValueChange={setPassengerCount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: ride.availableSeats }, (_, i) => i + 1).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "passenger" : "passengers"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Price:</span>
                        <span>${(ride.price * Number.parseInt(passengerCount)).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button onClick={confirmBooking}>Proceed to Payment</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}

