"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Notifications from "@/components/notifications"

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/book-ride", label: "Book Ride" },
    { href: "/ride-history", label: "History" },
    { href: "/profile", label: "Profile" },
    { href: "/payment-methods", label: "Payments" },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="font-bold text-xl">
            RideShare
          </Link>

          <div className="flex items-center gap-4">


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === link.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sm font-medium transition-colors",
                          pathname === link.href ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Notifications />
          </div>
        </div>
      </div>
    </nav>
  )
}

