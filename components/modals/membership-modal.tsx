"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
  planData?: {
    name: string
    plan: string
    billingCycle: string
  }
}

export function MembershipModal({ isOpen, onClose, planData }: MembershipModalProps) {
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

    // Frontend-only simulation
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({ name: "", email: "", phone: "" })
        onClose()
      }, 2500)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Started with {planData?.name}</DialogTitle>
          <DialogDescription>Complete your membership registration</DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Welcome to Arm Strong!</h3>
            <p className="text-muted-foreground">Your membership is now active.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-medium">Plan:</span> {planData?.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Billing:</span> {planData?.billingCycle}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-name">Full Name</Label>
              <Input
                id="membership-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-email">Email</Label>
              <Input
                id="membership-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membership-phone">Phone Number</Label>
              <Input
                id="membership-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={isLoading}>
              {isLoading ? "Processing..." : "Complete Registration"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
