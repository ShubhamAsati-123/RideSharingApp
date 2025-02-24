"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "https://media.istockphoto.com/id/1033774404/photo/ride-share-driver-in-car-using-the-rideshare-app-in-mobile-phone-new-taxi-ride-request-from.jpg?s=612x612&w=0&k=20&c=htlxTsuBq0Hc4_FFMbMnoETKfEQLWgKINg14CGFnZX8=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZr3g6zvUEbZV7d_sQtu6d6_mJw9ATuDahw&s",
  "https://media.istockphoto.com/id/1033774404/photo/ride-share-driver-in-car-using-the-rideshare-app-in-mobile-phone-new-taxi-ride-request-from.jpg?s=612x612&w=0&k=20&c=htlxTsuBq0Hc4_FFMbMnoETKfEQLWgKINg14CGFnZX8=",
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="dark:opacity-80"
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } dark:bg-gray-300 dark:bg-opacity-${index === currentIndex ? "100" : "50"}`}
          />
        ))}
      </div>
    </div>
  )
}

