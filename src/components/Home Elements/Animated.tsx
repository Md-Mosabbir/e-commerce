import { useScroll, useTransform, motion } from "motion/react"
import { useRef } from "react"
import peekVideo from "/videos/peek_video.mp4"
import PinInfo from "./PinInfo"

const Animated = () => {
  const windowRef = useRef<HTMLDivElement | null>(null)

  // const spanContainer = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start start", "end end"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 28])
  const x = useTransform(scrollYProgress, [0, 0.3], [-150, 0])

  return (
    <motion.section
      className="relative min-h-[1200vh]  bg-gradient-to-b from-blue-400 via-sky-300 to-blue-100  overflow-clip"
      ref={windowRef}
    >
      {/* Stacked Section */}
      <div className="min-h-[1200vh] bg-fuchsia-400  bg-transparent absolute w-full top-0 z-0">
        <div className=" sticky top-0 flex flex-col items-center justify-center pt-48 px-2">
          <motion.div
            style={{
              x,
            }}
            className=" w-full aspect-square px-3 "
          >
            <video
              className="w-full h-full object-cover rounded-3xl"
              autoPlay
              loop
              muted
              src={peekVideo}
            />
          </motion.div>

          <motion.div
            className="mt-[80vh] h-fit "
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "auto" }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-cinzel font-bold text-2xl text-center">
              A Sparkle as Timeless as Your Love
            </h2>
            <p className="text-center text-2xl leading-10 mt-16 font-medium ">
              Crafted for love that lasts a lifetime our diamond rings symbolize
              devotion, purity, and timeless elegance. Celebrate your journey
              from ‘I do’ to forever.
            </p>
          </motion.div>

          <PinInfo />
        </div>
      </div>

      {/* Top Section with Circular Mask */}
      <motion.div
        style={{
          scale,
        }}
        className="h-[100vh] origin-[center_20%] sticky top-0 window-mask  bg-white z-10 "
      >
        <div>
          <h2 className="text-3xl text-center font-bold pt-20">
            Discover Our Craftsmanship
          </h2>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Animated
