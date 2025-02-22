"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function Payment() {
  const [rideDetails, setRideDetails] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedRideDetails = localStorage.getItem("currentRide")
    if (storedRideDetails) {
      setRideDetails(JSON.parse(storedRideDetails))
    } else {
      router.push("/book-ride")
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [router])

  const handlePayment = () => {
    if (!rideDetails) return

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: rideDetails.estimatedFare * 100, // Amount in paise
      currency: "INR",
      name: "RideShare",
      description: "Ride Payment",
      handler: (response: any) => {
        console.log(response)
        // Here you would typically make an API call to your backend to verify the payment
        toast({
          title: "Payment Successful",
          description: "Your ride has been booked successfully!",
        })
        localStorage.setItem("lastRide", JSON.stringify(rideDetails))
        localStorage.removeItem("currentRide")
        localStorage.setItem("lastRideRated", "false")
        router.push("/ride-confirmation")
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (!rideDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Complete your ride payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>From:</strong> {rideDetails.pickup}
            </p>
            <p>
              <strong>To:</strong> {rideDetails.destination}
            </p>
            <p>
              <strong>Distance:</strong> {rideDetails.distance.toFixed(2)} km
            </p>
            <p>
              <strong>Ride Type:</strong> {rideDetails.rideType}
            </p>
            {rideDetails.isSharedRide && (
              <p>
                <strong>Shared Ride:</strong> Yes
              </p>
            )}
            <p className="text-lg font-semibold">Total Amount: ${rideDetails.estimatedFare}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePayment} className="w-full">
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

