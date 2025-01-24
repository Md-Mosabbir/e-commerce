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
        "w-72 h-96 bg-white rounded-lg shadow-xl overflow-hidden transform",
        className,
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <img
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.name}
          width={240}
          height={240}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-amber-900 mb-1">
          {testimonial.name}
        </h2>
        <p className="text-sm text-amber-700 mb-2">{testimonial.product}</p>
        <p className="text-amber-800 text-base italic">
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>
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
        "The ring we chose is absolutely stunning! It sparkles beautifully and symbolizes our eternal love perfectly.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Michael",
      product: "Custom Engagement Ring",
      testimonial:
        "The custom ring I designed with your help left my fiancée speechless. Your craftsmanship is unparalleled!",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Sophia & Alex",
      product: "Matching Wedding Bands",
      testimonial:
        "Our matching bands are not just beautiful, but also comfortable for everyday wear. We couldn't be happier!",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section className="h-[800vh] relative">
      {/* Sticky header */}
      <div className="sticky top-0 flex items-center justify-center h-[100vh] bg-gradient-to-b from-amber-50 to-amber-100 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-800 z-10">
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
              index === 0 && "ml-auto mb-[200vh]", // First card: aligned right with 12-degree rotation
              index === 2 && "mx-auto mt-[200vh]", // Third card: centered with -12-degree rotation
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
