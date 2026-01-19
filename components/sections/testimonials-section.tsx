"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Jennifer Smith",
      role: "Lost 40 lbs in 6 months",
      image: "/fitness-success-female-happy.jpg",
      rating: 5,
      text: "Arm Strong changed my life! The trainers are incredibly supportive and knowledgeable. I've never felt stronger or more confident. The community here is amazing - everyone encourages each other to be their best.",
    },
    {
      name: "Michael Roberts",
      role: "Marathon Runner",
      image: "/male-runner-athlete-fit.jpg",
      rating: 5,
      text: "As a marathon runner, I needed a gym that understood my specific training needs. The coaches here developed a custom program that improved my performance dramatically. Knocked 20 minutes off my time!",
    },
    {
      name: "Lisa Anderson",
      role: "Busy Mom of 3",
      image: "/mom-fitness-female-healthy.jpg",
      rating: 5,
      text: "Finding time to workout with three kids was impossible until I joined Arm Strong. The flexible class schedule and childcare options mean I can finally prioritize my health. I feel like a new person!",
    },
    {
      name: "James Wilson",
      role: "Strength Competitor",
      image: "/male-bodybuilder-muscular.jpg",
      rating: 5,
      text: "The equipment and expertise here is second to none. I've competed in several strength competitions and the coaching I received at Arm Strong was instrumental in my success. Highly recommend for serious athletes!",
    },
    {
      name: "Rachel Martinez",
      role: "Yoga Enthusiast",
      image: "/yoga-woman-peaceful-fit.jpg",
      rating: 5,
      text: "The variety of yoga classes is incredible. From power yoga to gentle flows, there's something for every mood and level. Sarah is an amazing instructor who really understands the mind-body connection.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Real results from real people. See how Arm Strong has transformed lives.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Cards */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-border hover:border-primary transition-all duration-300">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />

                <div className="flex mb-4">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-primary">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <Button
            size="icon"
            variant="outline"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
