import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const jobs = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "San Francisco",
    type: "Full-time",
  },
  {
    title: "Operations Manager",
    department: "Operations",
    location: "London",
    type: "Full-time",
  },
];

export default function Careers() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground">
          Help us revolutionize urban mobility and create positive change in
          communities around the world.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://sjc.microlink.io/Cc5JK52kUcSQMITxuqqC7uOeSNHF1IqkjSVDU4U1q2QvdbnIDTv533NYOSIV53AhcKgRbuvkQOHdMjVFtkn-zg.jpeg"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why RideShare?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Impactful Work</h3>
                <p className="text-muted-foreground">
                  Make a real difference in how people move and connect in
                  cities.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  Work with cutting-edge technology and shape the future of
                  transportation.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Great Culture</h3>
                <p className="text-muted-foreground">
                  Join a diverse team of passionate individuals who support each
                  other.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {jobs.map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Department: {job.department}
                </p>
                <p className="text-sm text-muted-foreground">
                  Location: {job.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  Type: {job.type}
                </p>
                <Button className="mt-4">Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-4">
          Don't see a position that matches your skills?
        </p>
        <Link href="/contact">
          <Button variant="outline">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
