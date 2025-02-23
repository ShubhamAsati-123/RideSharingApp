"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Map from "@/components/map";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState<"economy" | "premium">("economy");
  const [isSharedRide, setIsSharedRide] = useState(false);
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [distance, setDistance] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const lastRide = localStorage.getItem("lastRide");
    if (lastRide && !localStorage.getItem("lastRideRated")) {
      toast({
        title: "Rate your last ride",
        description: "Don't forget to rate your previous ride!",
        action: (
          <Button onClick={() => router.push("/rate-ride")}>Rate Now</Button>
        ),
      });
    }
  }, [router, toast]);

  const handleRouteCalculated = (calculatedDistance: number) => {
    setDistance(calculatedDistance);

    const FARE_CONFIG = {
      economy: { baseFare: 5, costPerKm: 2 },
      premium: { baseFare: 10, costPerKm: 3 },
    };

    const { baseFare, costPerKm } = FARE_CONFIG[rideType];
    const SHARED_DISCOUNT = isSharedRide ? 0.7 : 1; // 30% discount if shared

    const totalFare =
      (baseFare + calculatedDistance * costPerKm) * SHARED_DISCOUNT;

    setEstimatedFare(Number.parseFloat(totalFare.toFixed(2)));
  };

  const handleLocationSelected = (
    type: "pickup" | "destination",
    location: string
  ) => {
    if (type === "pickup") {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  const handleBookRide = () => {
    const rideDetails = {
      pickup,
      destination,
      rideType,
      isSharedRide,
      estimatedFare,
      distance,
    };
    localStorage.setItem("currentRide", JSON.stringify(rideDetails));
    router.push("/payment");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto"
      >
        <Card className="w-full order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>Enter your ride details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <Map
                pickup={pickup}
                destination={destination}
                onRouteCalculated={handleRouteCalculated}
                onLocationSelected={handleLocationSelected}
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rideType">Ride Type</Label>
                <Select
                  onValueChange={(value) =>
                    setRideType(value as "economy" | "premium")
                  }
                >
                  <SelectTrigger id="rideType">
                    <SelectValue placeholder="Select ride type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy ($2/km)</SelectItem>
                    <SelectItem value="premium">
                      Premium ($3/km, Higher Comfort)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="shared-ride"
                  checked={isSharedRide}
                  onCheckedChange={setIsSharedRide}
                />
                <Label htmlFor="shared-ride">
                  Shared Ride (Save up to 30%)
                </Label>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Looking for a cheaper option?
              </p>
              <Link href="/shared-rides">
                <Button variant="outline" className="w-full">
                  Browse Shared Rides
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            {estimatedFare > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full mb-4"
              >
                <p className="font-medium text-lg">
                  Estimated Fare:{" "}
                  <span className="text-primary">${estimatedFare}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Distance: {distance.toFixed(2)} km
                </p>
              </motion.div>
            )}
            <Button onClick={handleBookRide} className="w-full">
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
