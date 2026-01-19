"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User } from "lucide-react"
import { ClassBookingModal } from "@/components/modals/class-booking-modal"

export function ScheduleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeDay, setActiveDay] = useState("Monday")
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<{
    name: string
    day: string
    time: string
    trainer: string
  } | null>(null)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const schedule = {
    Monday: [
      { time: "06:00 AM", class: "CrossFit Fundamentals", trainer: "Marcus Johnson", duration: "60 min" },
      { time: "09:00 AM", class: "Yoga Flow", trainer: "Sarah Mitchell", duration: "45 min" },
      { time: "12:00 PM", class: "Strength Training", trainer: "Alex Rodriguez", duration: "60 min" },
      { time: "05:00 PM", class: "HIIT Cardio", trainer: "Marcus Johnson", duration: "45 min" },
      { time: "07:00 PM", class: "Pilates Core", trainer: "Jessica Williams", duration: "50 min" },
    ],
    Tuesday: [
      { time: "06:00 AM", class: "Spin Class", trainer: "Emily Chen", duration: "45 min" },
      { time: "09:00 AM", class: "Bodybuilding Basics", trainer: "David Thompson", duration: "60 min" },
      { time: "12:00 PM", class: "Yoga Stretch", trainer: "Sarah Mitchell", duration: "45 min" },
      { time: "05:00 PM", class: "CrossFit WOD", trainer: "Marcus Johnson", duration: "60 min" },
      { time: "07:00 PM", class: "Boxing Fundamentals", trainer: "Alex Rodriguez", duration: "60 min" },
    ],
    Wednesday: [
      { time: "06:00 AM", class: "Morning Cardio", trainer: "Emily Chen", duration: "45 min" },
      { time: "09:00 AM", class: "Strength & Conditioning", trainer: "Alex Rodriguez", duration: "60 min" },
      { time: "12:00 PM", class: "Pilates Reformer", trainer: "Jessica Williams", duration: "50 min" },
      { time: "05:00 PM", class: "HIIT Express", trainer: "Marcus Johnson", duration: "30 min" },
      { time: "07:00 PM", class: "Power Yoga", trainer: "Sarah Mitchell", duration: "60 min" },
    ],
    Thursday: [
      { time: "06:00 AM", class: "CrossFit Advanced", trainer: "Marcus Johnson", duration: "60 min" },
      { time: "09:00 AM", class: "Nutrition Workshop", trainer: "Emily Chen", duration: "90 min" },
      { time: "12:00 PM", class: "Bodybuilding Split", trainer: "David Thompson", duration: "60 min" },
      { time: "05:00 PM", class: "Cardio Kickboxing", trainer: "Alex Rodriguez", duration: "45 min" },
      { time: "07:00 PM", class: "Gentle Yoga", trainer: "Sarah Mitchell", duration: "60 min" },
    ],
    Friday: [
      { time: "06:00 AM", class: "HIIT Blast", trainer: "Marcus Johnson", duration: "45 min" },
      { time: "09:00 AM", class: "Total Body Strength", trainer: "Alex Rodriguez", duration: "60 min" },
      { time: "12:00 PM", class: "Yoga & Meditation", trainer: "Sarah Mitchell", duration: "60 min" },
      { time: "05:00 PM", class: "Friday Night Burn", trainer: "Emily Chen", duration: "45 min" },
      { time: "07:00 PM", class: "Weekend Warriors", trainer: "David Thompson", duration: "60 min" },
    ],
    Saturday: [
      { time: "08:00 AM", class: "Saturday Sweat", trainer: "Marcus Johnson", duration: "60 min" },
      { time: "10:00 AM", class: "Yoga for Athletes", trainer: "Sarah Mitchell", duration: "60 min" },
      { time: "12:00 PM", class: "Open Gym", trainer: "All Trainers", duration: "120 min" },
      { time: "03:00 PM", class: "Mobility & Recovery", trainer: "Jessica Williams", duration: "45 min" },
    ],
    Sunday: [
      { time: "09:00 AM", class: "Sunday Stretch", trainer: "Sarah Mitchell", duration: "45 min" },
      { time: "11:00 AM", class: "Community Workout", trainer: "All Trainers", duration: "60 min" },
      { time: "02:00 PM", class: "Open Gym", trainer: "All Trainers", duration: "180 min" },
    ],
  }

  const handleBookSpot = (className: string, time: string, trainer: string) => {
    setSelectedClass({
      name: className,
      day: activeDay,
      time: time,
      trainer: trainer,
    })
    setShowBookModal(true)
  }

  return (
    <>
      <section id="schedule" ref={ref} className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Class <span className="text-primary">Schedule</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Find the perfect class for your schedule and fitness goals.
            </p>
          </motion.div>

          {/* Day Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => setActiveDay(day)}
                variant={activeDay === day ? "default" : "outline"}
                className={`${
                  activeDay === day ? "bg-primary text-primary-foreground" : "border-border hover:border-primary"
                }`}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Schedule Cards */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {schedule[activeDay as keyof typeof schedule].map((item, index) => (
              <Card
                key={index}
                className="hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2 break-words">{item.class}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.trainer}</span>
                      </div>
                    </div>
                    <div className="text-primary font-bold text-lg shrink-0">{item.time}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    {item.duration}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleBookSpot(item.class, item.time, item.trainer)}
                  >
                    Book Your Spot
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <ClassBookingModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        classData={selectedClass || undefined}
      />
    </>
  )
}
