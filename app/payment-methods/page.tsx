"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentMethod {
  id: string
  last4: string
  brand: string
  expMonth: number
  expYear: number
}

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    // Fetch payment methods (simulated here)
    const fetchedMethods = [
      {
        id: "1",
        last4: "4242",
        brand: "visa",
        expMonth: 12,
        expYear: 2024,
      },
      {
        id: "2",
        last4: "5555",
        brand: "mastercard",
        expMonth: 8,
        expYear: 2025,
      },
    ]
    setPaymentMethods(fetchedMethods)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleAddCard = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 100 paise
      currency: "INR",
      name: "RideShare",
      description: "Add new payment method",
      handler: (response: any) => {
        console.log(response)
        // Here you would typically make an API call to your backend to save the new payment method
        const newMethod = {
          id: response.razorpay_payment_id,
          last4: "1234", // This should come from your backend after tokenizing the card
          brand: "visa", // This should come from your backend
          expMonth: 12, // This should come from your backend
          expYear: 2025, // This should come from your backend
        }
        setPaymentMethods([...paymentMethods, newMethod])
        toast({
          title: "Payment method added",
          description: "Your new payment method has been successfully added.",
        })
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

  const handleRemoveCard = (id: string) => {
    // Here you would typically make an API call to remove the payment method
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast({
      title: "Payment method removed",
      description: "The selected payment method has been removed.",
    })
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Payment Methods</h1>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ending in {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveCard(method.id)} className="ml-auto">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddCard} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add New Card
          </Button>
        </div>
      </div>
    </div>
  )
}

