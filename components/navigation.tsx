"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LoginModal } from "@/components/modals/login-modal"
import { JoinModal } from "@/components/modals/join-modal"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#trainers", label: "Trainers" },
    { href: "#schedule", label: "Schedule" },
    { href: "#membership", label: "Membership" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl overflow-hidden">
                <Image
                  src="/gym-logo.png"
                  alt="Arm Strong Gym Logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform rounded-xl"
                  priority
                />
              </div>

              <span className="text-lg md:text-2xl font-bold text-foreground whitespace-nowrap">
                Arm <span className="text-primary">Strong</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>

              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setShowJoinModal(true)}
              >
                Join Now
              </Button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2 rounded-lg hover:bg-primary/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary bg-transparent"
                    onClick={() => {
                      setShowLoginModal(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      setShowJoinModal(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </>
  )
}
