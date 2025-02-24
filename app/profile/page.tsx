"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";

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

export default function Profile() {
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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl">{`${user.firstName} ${user.lastName}`}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input value={user.username} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={user.email} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={user.phone} readOnly />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Street Address</Label>
                  <Input value={user.address.address} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>City</Label>
                    <Input value={user.address.city} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>State</Label>
                    <Input value={user.address.state} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Postal Code</Label>
                    <Input value={user.address.postalCode} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>Country</Label>
                    <Input value={user.address.country} readOnly />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="work" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Company</Label>
                  <Input value={user.company.name} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input value={user.company.title} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Input value={user.company.department} readOnly />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
