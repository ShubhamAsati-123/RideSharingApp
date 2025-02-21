"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { StarIcon } from "lucide-react"

export default function RideFeedback({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the feedback
    console.log("Submitting feedback:", { rideId: params.id, rating, comment })
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Rate Your Ride</CardTitle>
          <CardDescription>Your feedback helps us improve our service</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {rating > 0 ? `You've rated this ride ${rating} stars` : "Click to rate"}
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
              Submit Feedback
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

