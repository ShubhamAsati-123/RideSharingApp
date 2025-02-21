"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

interface MapProps {
  pickup: string
  destination: string
}

export default function Map({ pickup, destination }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([0, 0], 2)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current)
      }

      const map = mapRef.current

      if (pickup && destination) {
        // Clear existing routes
        map.eachLayer((layer) => {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer)
          }
        })

        // Add new route
        L.Routing.control({
          waypoints: [
            L.latLng(0, 0), // Placeholder, will be replaced by geocoding
            L.latLng(0, 0), // Placeholder, will be replaced by geocoding
          ],
          routeWhileDragging: true,
          geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map)

        // Geocode pickup and destination
        L.Control.Geocoder.nominatim().geocode(pickup, (results) => {
          if (results && results.length > 0) {
            const latlng = results[0].center
            map.setView(latlng, 13)
          }
        })
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [pickup, destination])

  return <div id="map" style={{ width: "100%", height: "400px" }} />
}

