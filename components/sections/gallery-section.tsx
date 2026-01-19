"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryItems = [
    { type: "image", src: "/gym-workout-group-class.jpg", alt: "Group Training" },
    { type: "image", src: "/gym-equipment-weights-modern.jpg", alt: "Modern Equipment" },
    {
      type: "image",
      src: "/personal-trainer-coaching-client-in-modern-gym.jpg",
      alt: "Personal Training",
    },
    {
      type: "image",
      src: "/yoga-studio-with-people-doing-yoga-poses.jpg",
      alt: "Yoga Studio",
    },
    {
      type: "image",
      src: "/crossfit-box-area-with-equipment-and-ropes.jpg",
      alt: "CrossFit Area",
    },
    {
      type: "image",
      src: "/cardio-zone-with-treadmills-and-exercise-bikes.jpg",
      alt: "Cardio Zone",
    },
    {
      type: "image",
      src: "/happy-gym-member-celebrating-fitness-success.jpg",
      alt: "Member Success",
    },
    {
      type: "image",
      src: "/modern-gym-facilities-locker-room-and-amenities.jpg",
      alt: "Facilities",
    },
    {
      type: "image",
      src: "/gym-community-event-with-people-socializing.jpg",
      alt: "Community Event",
    },
  ]

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Take a tour of our facilities and see our community in action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
              onClick={() => setSelectedImage(item.src)}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-foreground">{item.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          {selectedImage && (
            <img src={selectedImage || "/placeholder.svg"} alt="Gallery item" className="w-full h-auto rounded-xl" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
