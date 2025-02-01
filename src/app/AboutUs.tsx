import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function AboutUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-8 text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-600 tracking-widest drop-shadow-md">
          Sedera-Vow
        </h1>
        <p className="mt-2 text-xl text-yellow-500 italic">
          Crafting Eternal Elegance
        </p>
      </motion.header>

      {/* About Section */}
      <motion.section
        ref={ref}
        style={{ opacity, scale }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-yellow-600">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At Sedera-Vow, we believe that every love story deserves a symbol
              as unique and enduring as the bond it represents. Founded on the
              principles of craftsmanship, innovation, and timeless elegance, we
              specialize in creating exquisite marriage rings and premium
              jewelry that capture the essence of your most precious moments.
            </p>
            <p className="text-gray-700">
              Our passion for exotic materials and intricate designs sets us
              apart, allowing us to offer truly one-of-a-kind pieces that
              reflect the individuality of each couple we serve.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-lg shadow-yellow-500/30"
          >
            <img
              src="/placeholder.svg"
              alt="Elegant jewelry craftsmanship"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-yellow-50 py-16 rounded-3xl"
      >
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-semibold mb-8 text-center text-yellow-700 ">
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description:
                  "We use only the finest materials, ensuring each piece meets our exacting standards.",
              },
              {
                title: "Innovation",
                description:
                  "Our designs blend traditional craftsmanship with cutting-edge techniques.",
              },
              {
                title: "Personalization",
                description:
                  "Every piece can be customized to tell your unique love story.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md border border-yellow-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-yellow-700">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
