"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Map from "@/components/map"
import Link from "next/link"

export default function BookRide() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [rideType, setRideType] = useState("economy")
  const [isSharedRide, setIsSharedRide] = useState(false)
  const [estimatedFare, setEstimatedFare] = useState(0)
  const router = useRouter()

  const handleBookRide = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to book the ride
    console.log("Booking ride:", { pickup, destination, rideType, isSharedRide, estimatedFare })
    router.push("/ride-confirmation")
  }

  const calculateFare = () => {
    const baseFare = 5
    const distanceFare = Math.random() * 10
    const typeFare = rideType === "premium" ? 5 : 0
    const sharedDiscount = isSharedRide ? 0.7 : 1 // 30% discount for shared rides
    return ((baseFare + distanceFare + typeFare) * sharedDiscount).toFixed(2)
  }

  const handleLocationChange = () => {
    if (pickup && destination) {
      setEstimatedFare(Number.parseFloat(calculateFare()))
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card className="w-full order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>Enter your ride details</CardDescription>
          </CardHeader>
          <form onSubmit={handleBookRide}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value)
                      handleLocationChange()
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      handleLocationChange()
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="rideType">Ride Type</Label>
                  <Select onValueChange={(value) => setRideType(value)}>
                    <SelectTrigger id="rideType">
                      <SelectValue placeholder="Select ride type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="shared-ride" checked={isSharedRide} onCheckedChange={setIsSharedRide} />
                  <Label htmlFor="shared-ride">Shared Ride (Save up to 30%)</Label>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Looking for a cheaper option?</p>
                <Link href="/shared-rides">
                  <Button variant="outline" className="w-full">
                    Browse Shared Rides
                  </Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              {estimatedFare > 0 && <p className="mb-4">Estimated Fare: ${estimatedFare}</p>}
              <Button type="submit" className="w-full">
                Book Ride
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="w-full h-[300px] sm:h-[400px] lg:h-full order-1 lg:order-2">
          <Card className="h-full">
            <Map pickup={pickup} destination={destination} />
          </Card>
        </div>
      </div>
    </div>
  )
}

