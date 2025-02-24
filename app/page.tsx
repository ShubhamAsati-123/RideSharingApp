"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Car,
  Users,
  CreditCard,
  Star,
  PhoneCall,

} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Carousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function Home() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <main className="container mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="text-center space-y-8 relative"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="/placeholder.svg?height=600&width=1200&text=Hero+Image"
              alt="Hero background"
              layout="fill"
              objectFit="cover"
              className="opacity-20 dark:opacity-10"
            />
          </div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-400"
          >
            Your Journey, Our Priority
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Experience seamless ride-sharing with real-time tracking, secure
            payments, and friendly drivers.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="text-lg px-8 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-blue-500 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
              >
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-16"
        >
          <Carousel />
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: MapPin,
              title: "Real-time Tracking",
              description:
                "Track your ride in real-time and share your journey with loved ones.",
              color:
                "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
            },
            {
              icon: Car,
              title: "Multiple Car Options",
              description:
                "Choose from a variety of vehicles to suit your needs and budget.",
              color:
                "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
            },
            {
              icon: Users,
              title: "Ride Sharing",
              description:
                "Share your ride with others heading the same way and save money.",
              color:
                "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              description:
                "Pay securely through our integrated payment system.",
              color:
                "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={cn(
                "p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300",
                feature.color
              )}
            >
              <feature.icon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div>Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div>Daily Rides</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div>Satisfied Customers</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Book Your Ride",
                description:
                  "Choose your pickup and drop-off locations, and select your preferred ride option.",
                image: "/images/BookYourRide.webp?height=200&width=200",
              },
              {
                step: 2,
                title: "Get Matched",
                description:
                  "We'll match you with a nearby driver who's heading your way.",
                image: "/images/GetMatched.webp?height=200&width=200",
              },
              {
                step: 3,
                title: "Enjoy Your Trip",
                description:
                  "Hop in, relax, and enjoy your ride to your destination.",
                image: "/images/EnjoyYourTrip.webp?height=200&width=200",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-500 dark:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                comment:
                  "The best ride-sharing experience I've had. Always on time and great drivers!",
                avatar: "/placeholder.svg?height=64&width=64",
              },
              {
                name: "Bob Smith",
                comment:
                  "I love the ride-sharing feature. It's eco-friendly and I've met some great people!",
                avatar: "/placeholder.svg?height=64&width=64",
              },
              {
                name: "Carol Davis",
                comment:
                  "The app is so easy to use, and the prices are very reasonable. Highly recommended!",
                avatar: "/placeholder.svg?height=64&width=64",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                      {testimonial.name}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of satisfied users and experience hassle-free rides
            today!
          </p>
          <Button
            size="lg"
            className="text-lg px-8 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Download the App
          </Button>
        </motion.div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-blue-600 dark:text-blue-400">
                About Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to providing safe, reliable, and affordable
                rides to our community.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-600 dark:text-blue-400">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-600 dark:text-blue-400">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-600 dark:text-blue-400">
                Contact Us
              </h3>
              <p className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                <PhoneCall className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />{" "}
                +1 (555) 123-4567
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />{" "}
                123 Main St, City, Country
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600 dark:text-gray-300">
            © 2023 RideShare App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
