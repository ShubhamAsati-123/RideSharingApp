"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Users, CreditCard, Star, PhoneCall } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="text-center space-y-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Your Journey, Our Priority
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Experience seamless ride-sharing with real-time tracking, secure
            payments, and friendly drivers.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
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
            },
            {
              icon: Car,
              title: "Multiple Car Options",
              description:
                "Choose from a variety of vehicles to suit your needs and budget.",
            },
            {
              icon: Users,
              title: "Ride Sharing",
              description:
                "Share your ride with others heading the same way and save money.",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              description:
                "Pay securely through our integrated payment system.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24 bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-muted-foreground">Daily Rides</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfied Customers</div>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Book Your Ride",
                description:
                  "Choose your pickup and drop-off locations, and select your preferred ride option.",
              },
              {
                step: 2,
                title: "Get Matched",
                description:
                  "We'll match you with a nearby driver who's heading your way.",
              },
              {
                step: 3,
                title: "Enjoy Your Trip",
                description:
                  "Hop in, relax, and enjoy your ride to your destination.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                comment:
                  "The best ride-sharing experience I've had. Always on time and great drivers!",
              },
              {
                name: "Bob Smith",
                comment:
                  "I love the ride-sharing feature. It's eco-friendly and I've met some great people!",
              },
              {
                name: "Carol Davis",
                comment:
                  "The app is so easy to use, and the prices are very reasonable. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <Star className="h-6 w-6 text-yellow-400 mb-4" />
                <p className="text-muted-foreground mb-4">
                  "{testimonial.comment}"
                </p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied users and experience hassle-free rides
            today!
          </p>
          <Button size="lg" className="text-lg px-8">
            Download the App
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-muted-foreground">
                We're committed to providing safe, reliable, and affordable
                rides to our community.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/cookies">Cookie Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <p className="flex items-center mb-2">
                <PhoneCall className="h-4 w-4 mr-2" /> +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> 123 Main St, City, Country
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            © 2023 RideShare App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
