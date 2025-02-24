"use client";

import type React from "react";
import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Wallet,
  Phone,
  Lock,
  Shield,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentFormProps {
  amount: number;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "var(--foreground)",
      fontFamily: "system-ui, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "var(--muted-foreground)",
      },
      backgroundColor: "var(--background)",
    },
    invalid: {
      color: "var(--destructive)",
      iconColor: "var(--destructive)",
    },
  },
};

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
    description: "Pay with credit or debit card",
  },
  { id: "upi", label: "UPI", icon: Phone, description: "Pay using UPI" },
  {
    id: "netbanking",
    label: "NetBanking",
    icon: Wallet,
    description: "Pay using your bank account",
  },
] as const;

export default function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "upi" | "netbanking"
  >("card");
  const [savedCard, setSavedCard] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod: stripePaymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Payment successful",
        description: "Your ride has been booked!",
      });
      localStorage.setItem("lastRide", localStorage.getItem("currentRide")!);
      localStorage.removeItem("currentRide");
      localStorage.setItem("lastRideRated", "false");
      router.push("/ride-confirmation");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const popularBanks = [
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
    "Axis Bank",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </div>
            <Badge variant="outline" className="flex gap-1">
              <Lock className="h-3 w-3" /> Secure
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="card"
            className="w-full"
            onValueChange={(value) =>
              setPaymentMethod(value as typeof paymentMethod)
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="card" asChild>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mt-4 p-4 border rounded-lg bg-card">
                      <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={savedCard}
                        onChange={(e) => setSavedCard(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-muted-foreground">
                        Save card for future payments
                      </span>
                    </label>
                  </form>
                </motion.div>
              </TabsContent>

              <TabsContent value="upi" asChild>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="p-4 border rounded-lg space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@bank"
                        className="w-full p-2 border rounded bg-background text-foreground"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a payment request on your UPI app
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="netbanking" asChild>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {popularBanks.map((bank) => (
                      <Button
                        key={bank}
                        variant="outline"
                        className="h-auto py-4 flex flex-col items-center justify-center"
                      >
                        <Wallet className="h-4 w-4 mb-2" />
                        <span className="text-sm">{bank}</span>
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Other Banks
                  </Button>
                </motion.div>
              </TabsContent>
            </AnimatePresence>

            <div className="mt-6 space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Amount to pay</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
              <Button
                type="submit"
                disabled={!stripe || loading}
                className="w-full"
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Pay $${amount.toFixed(2)}`
                )}
              </Button>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your payment is protected with SSL encryption</span>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            {["visa.svg", "mastercard.svg", "rupay.svg"].map((card) => (
              <div key={card} className="h-6 bg-muted rounded-md" />
            ))}
          </div>
        </CardFooter>
      </Card>

      <div className="mt-6 max-w-md mx-auto">
        <div className="flex items-start gap-2 p-4 border rounded-lg bg-muted">
          <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Please ensure you have sufficient balance in your account. The
            amount will be deducted immediately upon successful payment.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
