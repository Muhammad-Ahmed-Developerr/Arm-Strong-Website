"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react"
import { useState } from "react"
import { NewsletterModal } from "@/components/modals/newsletter-modal"

export function Footer() {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)

  return (
    <>
      <footer className="bg-background border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">
                  Arm <span className="text-primary">Strong</span>
                </span>
              </Link>
              <p className="text-muted-foreground mb-6">
                Transform your body, transform your life. Join us and unlock your full potential.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <Button
                    key={index}
                    size="icon"
                    variant="outline"
                    className="rounded-full border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "About", "Services", "Trainers", "Schedule", "Membership"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-3">
                {[
                  "Strength Training",
                  "Cardio Fitness",
                  "CrossFit",
                  "Personal Training",
                  "Nutrition Coaching",
                  "Group Classes",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">Subscribe for fitness tips, special offers, and gym updates.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-card"
                  onFocus={() => setShowNewsletterModal(true)}
                />
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                  onClick={() => setShowNewsletterModal(true)}
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2026 Arm Strong. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <NewsletterModal isOpen={showNewsletterModal} onClose={() => setShowNewsletterModal(false)} />
    </>
  )
}
