import { motion, useInView } from "framer-motion" // Fixed import path
import { useRef } from "react"
import { cn } from "../../lib/utils"

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: {
    id: number
    name: string
    product: string
    testimonial: string
    image: string
  }
  className?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "w-80 h-96 bg-gray-900 rounded-lg shadow-xl overflow-hidden transform border border-amber-500",
        className,
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-8 flex flex-col justify-between h-full">
        <p className="text-amber-300 text-lg italic mb-6 flex-grow">
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>
        <div className="flex items-center">
          <img
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-amber-400">
              {testimonial.name}
            </h2>
            <p className="text-sm text-amber-500">{testimonial.product}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emily & James",
      product: "Diamond Eternity Band",
      testimonial:
        "The ring we chose is absolutely stunning! It sparkles beautifully and symbolizes our eternal love perfectly. The attention to detail and craftsmanship are truly remarkable.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Michael",
      product: "Custom Engagement Ring",
      testimonial:
        "The custom ring I designed with your help left my fiancée speechless. Your craftsmanship is unparalleled! The process was enjoyable, and the result exceeded all expectations.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Sophia & Alex",
      product: "Matching Wedding Bands",
      testimonial:
        "Our matching bands are not just beautiful, but also comfortable for everyday wear. We couldn't be happier! The engraving adds a personal touch that makes them even more special.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section className="h-[800vh] relative bg-gray-800 bleed-testimonial clip-inset-expand">
      {/* Sticky header */}
      <div className="sticky top-0 flex items-center justify-center h-[100vh]  z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-400 z-10">
          Our Testimonials
        </h1>
      </div>

      {/* Testimonial cards */}
      <div className="absolute w-full h-full z-20">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            className={cn(
              index === 0 && "ml-auto mb-[200vh]", // First card: aligned right
              index === 2 && "mx-auto mt-[200vh]", // Third card: centered
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
