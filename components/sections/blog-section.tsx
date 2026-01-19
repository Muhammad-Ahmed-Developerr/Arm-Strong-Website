"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const articles = [
    {
      title: "10 Essential Tips for Building Muscle Mass",
      excerpt: "Discover the scientifically-proven strategies for maximizing muscle growth and strength gains.",
      image: "/bodybuilding-muscle-growth.jpg",
      date: "Dec 15, 2024",
      category: "Training",
      content:
        "Building muscle mass requires a combination of progressive overload, proper nutrition, adequate recovery, and consistency. Learn the key principles that top athletes use to maximize their gains.",
    },
    {
      title: "Nutrition Guide: Fueling Your Fitness Journey",
      excerpt: "Learn how to optimize your diet for performance, recovery, and body composition goals.",
      image: "/healthy-nutrition-meal-prep.jpg",
      date: "Dec 12, 2024",
      category: "Nutrition",
      content:
        "Proper nutrition is the foundation of any successful fitness program. Discover how to balance macronutrients, time your meals, and fuel your workouts for optimal results.",
    },
    {
      title: "The Science of Recovery: Why Rest Days Matter",
      excerpt: "Understanding the importance of recovery for long-term fitness success and injury prevention.",
      image: "/athlete-recovery-rest.jpg",
      date: "Dec 10, 2024",
      category: "Recovery",
      content:
        "Recovery is when your body adapts and grows stronger. Learn why rest days are crucial for progress and how to optimize your recovery for better performance.",
    },
    {
      title: "HIIT vs Steady State: Which Cardio is Right for You?",
      excerpt: "Compare different cardio training methods and find the best approach for your goals.",
      image: "/hiit-cardio-training.jpg",
      date: "Dec 8, 2024",
      category: "Cardio",
      content:
        "Both HIIT and steady-state cardio have their place in a well-rounded fitness program. Discover which method aligns best with your fitness goals and lifestyle.",
    },
    {
      title: "Mental Strength: The Overlooked Key to Fitness",
      excerpt: "How developing mental toughness can transform your training and results.",
      image: "/mental-strength-motivation.jpg",
      date: "Dec 5, 2024",
      category: "Mindset",
      content:
        "Your mind is your most powerful tool in the gym. Learn techniques to develop mental toughness, stay motivated, and push through barriers to achieve your fitness goals.",
    },
    {
      title: "Beginner's Guide to Starting Your Fitness Journey",
      excerpt: "Everything you need to know to start working out safely and effectively.",
      image: "/beginner-fitness-workout.jpg",
      date: "Dec 1, 2024",
      category: "Beginner",
      content:
        "Starting your fitness journey can be overwhelming. This comprehensive guide covers everything from proper form to building sustainable habits for long-term success.",
    },
  ]

  const handleReadMore = (article: any) => {
    setSelectedArticle(article)
    setShowArticleModal(true)
  }

  return (
    <>
      <section id="blog" ref={ref} className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Fitness <span className="text-primary">Tips & Articles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Expert advice, workout tips, and nutrition guides to help you succeed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 overflow-hidden flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`${article.image}?query=${encodeURIComponent(article.category + " fitness")}`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full group/btn text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleReadMore(article)}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedArticle.category}
                  </span>
                </div>
                <DialogTitle className="text-3xl mb-2">{selectedArticle.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  {selectedArticle.date}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={`${selectedArticle.image}?query=${encodeURIComponent(selectedArticle.category + " fitness")}`}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-lg leading-relaxed mb-6">{selectedArticle.content}</p>
                <p className="text-muted-foreground leading-relaxed">
                  For personalized guidance on implementing these strategies, book a consultation with one of our expert
                  trainers. We're here to help you achieve your fitness goals!
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
