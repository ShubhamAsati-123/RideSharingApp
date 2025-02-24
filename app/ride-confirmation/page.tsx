import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LiveChat } from "@/components/live-chat";

export default function RideConfirmation() {
  const rideId = "123"; // This would typically come from the booking process

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-md mx-auto mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ride Booked!</CardTitle>
            <CardDescription>
              Your ride has been successfully booked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Your driver will arrive shortly. Please be ready at the pickup
              location.
            </p>
            <p className="text-sm text-muted-foreground">Ride ID: {rideId}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Back to Dashboard</Button>
            </Link>
            <Link href={`/ride-feedback/${rideId}`} className="w-full">
              <Button variant="outline" className="w-full">
                Rate this Ride
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chat with Your Driver</h2>
        <LiveChat />
      </div>
    </div>
  );
}
