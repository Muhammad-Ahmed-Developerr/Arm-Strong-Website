// app/page.tsx
"use client"  // isse ye page client component ban jayega

import { useState, useEffect } from "react"
import { Loader } from "@/components/loader"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TrainersSection } from "@/components/sections/trainers-section"
import { ScheduleSection } from "@/components/sections/schedule-section"
import { MembershipSection } from "@/components/sections/membership-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/sections/footer"
import { Navigation } from "@/components/navigation"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000) // 2 sec loader
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />  // start me loader show

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrainersSection />
      <ScheduleSection />
      <MembershipSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
