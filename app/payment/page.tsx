"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import PaymentForm from "@/components/payment-form"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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
  }, [router])

  if (!rideDetails) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen"
    >
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
          <Elements stripe={stripePromise}>
            <PaymentForm amount={rideDetails.estimatedFare} />
          </Elements>
        </CardContent>
      </Card>
    </motion.div>
  )
}

