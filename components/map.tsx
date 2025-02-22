"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, MapPin } from "lucide-react";

interface MapProps {
  pickup: string;
  destination: string;
  onRouteCalculated: (distance: number) => void;
  onLocationSelected: (
    type: "pickup" | "destination",
    location: string
  ) => void;
}

interface Location {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export default function Map({
  pickup,
  destination,
  onRouteCalculated,
  onLocationSelected,
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [map, setMap] = useState<L.Map | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Location[]
  >([]);
  const [openPickup, setOpenPickup] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickupCoords, setPickupCoords] = useState<{
    lat: string;
    lon: string;
  } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: string;
    lon: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !mapRef.current) {
      const newMap = L.map("map").setView([20.5937, 78.9629], 4); // Center on India
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      mapRef.current = newMap;
      setMap(newMap);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map && pickupCoords && destinationCoords) {
      console.log("Pickup Coordinates:", pickupCoords);
      console.log("Destination Coordinates:", destinationCoords);
      getRoute();
    }
  }, [map, pickupCoords, destinationCoords]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      if (map) map.removeLayer(marker);
    });
    markersRef.current = [];
  };

  const getRoute = async () => {
    if (!pickupCoords || !destinationCoords) return;

    try {
      setLoading(true);
      console.log("Getting route between:", {
        pickup: `${pickupCoords.lat},${pickupCoords.lon}`,
        destination: `${destinationCoords.lat},${destinationCoords.lon}`,
      });

      const coordinates = `${pickupCoords.lat},${pickupCoords.lon};${destinationCoords.lat},${destinationCoords.lon}`;
      const options = {
        method: "GET",
        url: `https://us1.locationiq.com/v1/directions/driving/${coordinates}`,
        params: {
          steps: true,
          geometries: "polyline",
          overview: "simplified",
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
        },
        headers: { accept: "application/json" },
      };

      const response = await axios.request(options);
      const data = response.data;

      if (data && data.routes && data.routes[0]) {
        const route = {
          coordinates: decodePolyline(data.routes[0].geometry),
          distance: data.routes[0].distance,
        };
        drawRoute(route);
        onRouteCalculated(route.distance / 1000);
        console.log(`Distance: ${route.distance / 1000} km`);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAutocomplete = async (
    query: string,
    type: "pickup" | "destination"
  ) => {
    if (!query) return;

    try {
      const options = {
        method: "GET",
        url: "https://us1.locationiq.com/v1/autocomplete",
        params: {
          q: query,
          limit: 5,
          dedupe: 1,
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
        },
        headers: { accept: "application/json" },
      };

      const response = await axios.request(options);
      const suggestions = response.data.map((item: any) => ({
        place_id: item.place_id,
        display_name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));

      if (type === "pickup") {
        setPickupSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  const handleLocationSelect = (
    location: Location,
    type: "pickup" | "destination"
  ) => {
    console.log(`Selected ${type} location:`, {
      name: location.display_name,
      coordinates: {
        lat: location.lat,
        lon: location.lon,
      },
    });

    onLocationSelected(type, location.display_name);

    if (map) {
      clearMarkers();
      const coords = [
        Number.parseFloat(location.lat),
        Number.parseFloat(location.lon),
      ];
      const marker = L.marker(coords);
      marker.addTo(map);
      markersRef.current.push(marker);
      map.setView(coords, 13);

      if (type === "pickup") {
        setPickupCoords({ lat: location.lat, lon: location.lon });
      } else {
        setDestinationCoords({ lat: location.lat, lon: location.lon });
      }
    }

    if (type === "pickup") {
      setOpenPickup(false);
    } else {
      setOpenDestination(false);
    }
  };

  const decodePolyline = (encoded: string) => {
    const poly = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      poly.push([lat / 1e5, lng / 1e5]);
    }
    return poly;
  };

  const drawRoute = (route: { coordinates: number[][] }) => {
    if (map) {
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
      }
      routeLayerRef.current = L.polyline(route.coordinates, {
        color: "blue",
        weight: 4,
        opacity: 0.7,
      }).addTo(map);
      map.fitBounds(route.coordinates);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
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
                        key={suggestion.place_id}
                        onSelect={() =>
                          handleLocationSelect(suggestion, "pickup")
                        }
                      >
                        {suggestion.display_name}
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
                  onValueChange={(value) =>
                    getAutocomplete(value, "destination")
                  }
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {destinationSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.place_id}
                        onSelect={() =>
                          handleLocationSelect(suggestion, "destination")
                        }
                      >
                        {suggestion.display_name}
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
        <div id="map" className="h-[400px] rounded-lg overflow-hidden" />
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
