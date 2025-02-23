"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface PaymentFormProps {
  amount: number
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    })

    if (error) {
      console.error(error)
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      })
    } else {
      // Here you would typically make an API call to your backend to process the payment
      console.log("PaymentMethod", paymentMethod)
      toast({
        title: "Payment successful",
        description: "Your ride has been booked!",
      })
      localStorage.setItem("lastRide", localStorage.getItem("currentRide")!)
      localStorage.removeItem("currentRide")
      localStorage.setItem("lastRideRated", "false")
      router.push("/ride-confirmation")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded">
        <CardElement />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        Pay ${amount}
      </Button>
    </form>
  )
}

