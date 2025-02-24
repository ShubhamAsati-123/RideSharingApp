"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { getCurrentUser, logout } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const rideData = [
  { name: "Mon", rides: 4 },
  { name: "Tue", rides: 3 },
  { name: "Wed", rides: 5 },
  { name: "Thu", rides: 2 },
  { name: "Fri", rides: 6 },
  { name: "Sat", rides: 8 },
  { name: "Sun", rides: 7 },
];

const spendingData = [
  { name: "Mon", amount: 25 },
  { name: "Tue", amount: 15 },
  { name: "Wed", amount: 30 },
  { name: "Thu", amount: 12 },
  { name: "Fri", amount: 35 },
  { name: "Sat", amount: 45 },
  { name: "Sun", amount: 40 },
];

interface DummyJSONUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<DummyJSONUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData) {
          router.push("/login");
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8 lg:p-24">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 text-center">
        Welcome, {user.firstName || user.email}!
      </h1>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Rides</CardTitle>
            <CardDescription>
              Your ride activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rides" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Spending</CardTitle>
            <CardDescription>
              Your ride expenses over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8 max-w-6xl mx-auto w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>Find and book your next ride</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/book-ride" className="w-full">
              <Button className="w-full">Book Now</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Shared Rides</CardTitle>
            <CardDescription>Join a shared ride and save money</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/shared-rides" className="w-full">
              <Button className="w-full">Browse Shared Rides</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Ride History</CardTitle>
            <CardDescription>View your past rides</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ride-history" className="w-full">
              <Button className="w-full">View History</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/payment-methods" className="w-full">
              <Button className="w-full">Manage Payments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => {
            logout();
            toast("You have been logged out", {
              description: "Redirecting to login page...",
            });
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
