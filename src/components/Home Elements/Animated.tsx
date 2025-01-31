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
  // Sun animation values
  const sunY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["110%", "50%", "-10%"],
  )
  const sunScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.4, 2])
  const skyHue = useTransform(scrollYProgress, [0, 0.5, 1], [80, 35, 40])
  const skySaturation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100, 100, 40],
  )
  const skyLightness = useTransform(scrollYProgress, [0, 0.5, 1], [0, 70, 50])

  return (
    <motion.section
      className="relative min-h-[1200vh]  overflow-clip"
      ref={windowRef}
    >
      {/* Dynamic Sky Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: useTransform(
            [skyHue, skySaturation, skyLightness],
            ([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`,
          ),
        }}
      >
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-yellow-500 shadow-2xl"
          style={{
            bottom: sunY,
            left: "50%",
            x: "-50%",
            scale: sunScale,
            boxShadow: "0 0 100px 20px rgba(255, 255, 0, 0.5)",
          }}
        />
      </motion.div>
      {/* Stacked Section */}
      <div className="min-h-[1200vh]  absolute w-full top-0 z-0">
        <div className=" sticky top-0 flex flex-col items-center justify-center pt-48 px-2">
          <motion.div
            style={{ x }}
            className="w-full max-w-4xl aspect-square md:aspect-video "
          >
            <video
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
              autoPlay
              loop
              muted
              playsInline
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
            <h2 className="font-cinzel font-bold text-2xl md:text-4xl text-center max-w-3xl mx-auto">
              A Sparkle as Timeless as Your Love
            </h2>
            <p className="text-center text-2xl md:text-3xl leading-7 sm:leading-8 md:leading-10 mt-8 sm:mt-12 md:mt-16 font-medium max-w-3xl mx-auto">
              Crafted for love that lasts a lifetime, our diamond rings
              symbolize devotion, purity, and timeless elegance. Celebrate your
              journey from ‘I do’ to forever.
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
          <h2 className="text-3xl text-center font-bold pt-20 ">
            Discover Our Craftsmanship
          </h2>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Animated
