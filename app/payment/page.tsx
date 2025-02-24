"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import PaymentForm from "@/components/payment-form";
import { Loader2, MapPin } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment() {
  const [rideDetails, setRideDetails] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedRideDetails = localStorage.getItem("currentRide");
    if (storedRideDetails) {
      setRideDetails(JSON.parse(storedRideDetails));
    } else {
      router.push("/book-ride");
    }
  }, [router]);

  if (!rideDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col md:flex-row gap-8"
    >
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
          <CardDescription>Review your ride information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 mt-1 text-primary" />
              <div>
                <p className="font-medium">Pickup</p>
                <p className="text-sm text-muted-foreground">
                  {rideDetails.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 mt-1 text-primary" />
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-sm text-muted-foreground">
                  {rideDetails.destination}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="font-medium">Distance</p>
                <p className="text-sm text-muted-foreground">
                  {rideDetails.distance.toFixed(2)} km
                </p>
              </div>
              <div>
                <p className="font-medium">Ride Type</p>
                <p className="text-sm text-muted-foreground">
                  {rideDetails.rideType}
                </p>
              </div>
              {rideDetails.isSharedRide && (
                <div>
                  <p className="font-medium">Shared Ride</p>
                  <p className="text-sm text-muted-foreground">Yes</p>
                </div>
              )}
            </div>
            <div className="pt-4 border-t">
              <p className="text-xl font-semibold">
                Total Amount: ${rideDetails.estimatedFare}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Complete your ride payment</CardDescription>
        </CardHeader>
        <CardContent>
          <Elements stripe={stripePromise}>
            <PaymentForm amount={rideDetails.estimatedFare} />
          </Elements>
        </CardContent>
      </Card>
    </motion.div>
  );
}
