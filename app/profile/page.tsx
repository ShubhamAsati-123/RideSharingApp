"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Profile {
  name: string
  email: string
  phone: string
  avatar: string
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
    avatar: "/placeholder.svg?height=100&width=100",
  })
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }
    const userData = JSON.parse(user)
    setProfile({
      ...userData,
      phone: userData.phone || "",
      avatar: userData.avatar || "/placeholder.svg?height=100&width=100",
    })
  }, [router])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify(profile))
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl">{profile.name || "Your Profile"}</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Update Profile
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="preferences">
              <div className="space-y-4 mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Button variant="outline" size="sm">
                    English
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

