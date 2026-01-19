"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ClassBookingModalProps {
  isOpen: boolean
  onClose: () => void
  classData?: {
    name: string
    day: string
    time: string
    trainer: string
  }
}

export function ClassBookingModal({ isOpen, onClose, classData }: ClassBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Fake delay to simulate booking
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        setFormData({ name: "", email: "", phone: "" })
      }, 2500)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Your Spot</DialogTitle>
          <DialogDescription>
            Reserve your spot for {classData?.name} on {classData?.day}
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Spot Reserved!</h3>
            <p className="text-muted-foreground">See you at the class!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-medium">Class:</span> {classData?.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Time:</span> {classData?.day} at {classData?.time}
              </p>
              <p className="text-sm">
                <span className="font-medium">Trainer:</span> {classData?.trainer}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class-name">Full Name</Label>
              <Input
                id="class-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class-email">Email</Label>
              <Input
                id="class-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class-phone">Phone Number</Label>
              <Input
                id="class-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Spot"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
