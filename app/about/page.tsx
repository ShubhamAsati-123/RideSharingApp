import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About RideShare</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At RideShare, we're committed to revolutionizing urban
            transportation. Our mission is to provide safe, reliable, and
            sustainable mobility solutions that connect communities and make
            cities more livable.
          </p>
          <p className="text-lg text-muted-foreground">
            We believe in creating a future where transportation is accessible
            to everyone, while reducing our environmental impact and building
            stronger communities.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://res.cloudinary.com/jerrick/image/upload/v1587385623/5e9d951716ba7e001c154a49.jpg"
            alt="Urban mobility"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Leveraging cutting-edge technology to create seamless mobility
              solutions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              Committed to reducing carbon emissions through shared mobility.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Building connections and fostering a sense of belonging.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Join Us on Our Journey</h2>
        <p className="text-lg text-muted-foreground">
          Whether you're a rider or a driver, you're part of our mission to
          transform urban mobility. Together, we're building a more connected
          and sustainable future.
        </p>
      </div>
    </div>
  );
}
