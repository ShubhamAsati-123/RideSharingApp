"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loader2, MapPin } from "lucide-react"
import { motion } from "framer-motion"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

interface MapProps {
  pickup: string
  destination: string
  onRouteCalculated: (distance: number) => void
  onLocationSelected: (type: "pickup" | "destination", location: string) => void
}

interface Location {
  place_name: string
  center: [number, number]
}

export default function Map({ pickup, destination, onRouteCalculated, onLocationSelected }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<Location[]>([])
  const [openPickup, setOpenPickup] = useState(false)
  const [openDestination, setOpenDestination] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null)
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937], 
      zoom: 4,
    })

    map.current.on("load", () => {
      map.current!.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      })

      map.current!.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      })
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      getRoute()
    }
  }, [pickupCoords, destinationCoords])

  const getRoute = async () => {
    if (!pickupCoords || !destinationCoords) return

    try {
      setLoading(true)
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      )
      const json = await query.json()
      const data = json.routes[0]
      const route = data.geometry.coordinates
      const geojson = {
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: route,
        },
      }
      map.current!.getSource("route")?.setData(geojson)
      map.current!.fitBounds([pickupCoords, destinationCoords], {
        padding: 50,
      })
      onRouteCalculated(data.distance / 1000) // Convert to km
    } catch (error) {
      console.error("Error fetching route:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAutocomplete = async (query: string, type: "pickup" | "destination") => {
    if (!query) return

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&country=in`,
      )
      const data = await response.json()
      const suggestions = data.features.map((feature: any) => ({
        place_name: feature.place_name,
        center: feature.center,
      }))

      if (type === "pickup") {
        setPickupSuggestions(suggestions)
      } else {
        setDestinationSuggestions(suggestions)
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error)
    }
  }

  const handleLocationSelect = (location: Location, type: "pickup" | "destination") => {
    onLocationSelected(type, location.place_name)

    if (map.current) {
      const marker = new mapboxgl.Marker().setLngLat(location.center).addTo(map.current)

      map.current.flyTo({
        center: location.center,
        zoom: 14,
      })

      if (type === "pickup") {
        setPickupCoords(location.center)
        setOpenPickup(false)
      } else {
        setDestinationCoords(location.center)
        setOpenDestination(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-6"
    >
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Popover open={openPickup} onOpenChange={setOpenPickup}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between">
                <MapPin className="mr-2 h-4 w-4" />
                {pickup || "Select pickup location"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
              <Command>
                <CommandInput
                  placeholder="Search pickup location..."
                  onValueChange={(value) => getAutocomplete(value, "pickup")}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {pickupSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.place_name}
                        onSelect={() => handleLocationSelect(suggestion, "pickup")}
                      >
                        {suggestion.place_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openDestination} onOpenChange={setOpenDestination}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between">
                <MapPin className="mr-2 h-4 w-4" />
                {destination || "Select destination"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
              <Command>
                <CommandInput
                  placeholder="Search destination..."
                  onValueChange={(value) => getAutocomplete(value, "destination")}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {destinationSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.place_name}
                        onSelect={() => handleLocationSelect(suggestion, "destination")}
                      >
                        {suggestion.place_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="relative">
        <div ref={mapContainer} className="h-[400px] rounded-lg overflow-hidden" />
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

