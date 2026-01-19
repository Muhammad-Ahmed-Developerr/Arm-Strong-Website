"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    description: string
    features: string[]
  } | null
  onBookSession: () => void
}

export function ServiceModal({ isOpen, onClose, service, onBookSession }: ServiceModalProps) {
  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{service.title}</DialogTitle>
          <DialogDescription className="text-base">{service.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="font-bold text-lg mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-bold text-lg mb-2">Ready to Get Started?</h4>
            <p className="text-muted-foreground mb-4">
              Book a session with our expert trainers and begin your fitness transformation today.
            </p>
            <Button
              onClick={() => {
                onClose()
                onBookSession()
              }}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              Book a Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
