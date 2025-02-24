"use client";

import type React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, StarIcon } from "lucide-react";
import { toast } from "sonner";

export default function RateRide() {
  const [lastRide, setLastRide] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedLastRide = localStorage.getItem("lastRide");
    if (storedLastRide) {
      setLastRide(JSON.parse(storedLastRide));
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the rating
    console.log("Submitting rating:", { rideId: lastRide.id, rating, comment });
    toast("Rating Submitted", {
      description: "Thank you for your feedback!",
    });
    localStorage.setItem("lastRideRated", "true");
    router.push("/dashboard");
  };

  if (!lastRide) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Rate Your Last Ride</CardTitle>
          <CardDescription>
            Your feedback helps us improve our service
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <p>
                <strong>From:</strong> {lastRide.pickup}
              </p>
              <p>
                <strong>To:</strong> {lastRide.destination}
              </p>
              <p>
                <strong>Distance:</strong> {lastRide.distance.toFixed(2)} km
              </p>
            </div>
            <div>
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {rating > 0
                  ? `You've rated this ride ${rating} stars`
                  : "Click to rate"}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Additional Comments
              </label>
              <Textarea
                id="comment"
                placeholder="Tell us about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Rating
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
