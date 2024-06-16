import { useRef } from "react"
import Hero from "./pages/Hero"
import jewelryArray from "./utils/bestSellers"
import { useScroll, useTransform, motion, useSpring } from "framer-motion"
import Arrow from "./assets/svgs/arrow-up-right-svgrepo-com.svg"

export default function App() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref })
  const spring = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    mass: 0.3,
  })

  //! Horizontal Scroll
  const x = useTransform(spring, [0, 1], ["0", "-79%"])

  //* Width animation on scroll for different cards

  const width = useTransform(spring, [0.35, 0.5], ["20vw", "60vw"])
  const widthOfSecondCard = useTransform(spring, [0.3, 0.72], ["10vw", "60vw"])
  const widthOfThirdCard = useTransform(spring, [0.3, 1], ["4vw", "60vw"])

  //Scale animation on scroll
  const scaleFirst = useTransform(spring, [0.35, 0.56], [0.4, 1])
  const scaleSecond = useTransform(spring, [0.35, 0.73], ["40%", "100%"])
  const scaleThird = useTransform(spring, [0.35, 1], ["40%", "100%"])

  // y displacement on scroll
  const yOfSecond = useTransform(spring, [0.35, 0.78], ["30%", "0%"])
  const yOfThird = useTransform(spring, [0.35, 1], ["60%", "0%"])

  return (
    <div ref={ref} className="h-[400vh] relative">
      <div className="sticky top-0 overflow-hidden">
        <motion.div className="inline-flex h-screen" style={{ x }}>
          <Hero />

          <motion.section
            className="h-screen bg-text-800 overflow-hidden  "
            style={{ width, transformOrigin: "639px 455px" }}
          >
            <motion.div
              className=" h-[35rem]"
              style={{ transformOrigin: "50% 50%", scaleY: scaleFirst }}
            >
              <div className="w-[60vw] h-[35rem] ">
                <img
                  src={jewelryArray[0].image}
                  alt={jewelryArray[0].name}
                  className="w-[60vw] h-[35rem] object-cover"
                />
              </div>
            </motion.div>
            <p className="mx-2 my-2 px-4 py-1 rounded-3xl border border-background-50 max-w-fit">
              {jewelryArray[0].releaseDate}
            </p>

            <div className="px-2 w-[60vw] flex justify-around items-center ">
              <p className="text-center text-5xl ">{jewelryArray[0].name}</p>
              <div className=" w-16 h-16 rounded-full bg-text-950 ">
                <img src={Arrow} alt="arrow-icon" className="w-full h-full" />
              </div>
            </div>
          </motion.section>

          <motion.section
            className="h-screen bg-primary-600 overflow-hidden "
            style={{ width: widthOfSecondCard, transformOrigin: "0 50%" }}
          >
            <motion.div
              className=" h-[35rem]"
              style={{
                transformOrigin: "50% 50%",
                scaleY: scaleSecond,
                y: yOfSecond,
              }}
            >
              <div className="w-[60vw] h-[35rem] ">
                <img
                  src={jewelryArray[1].image}
                  alt={jewelryArray[1].name}
                  className="w-[60vw] h-[35rem]"
                />
              </div>
            </motion.div>
            <p className="mx-2 my-2 px-4 py-1 rounded-3xl border border-background-50 max-w-fit">
              {jewelryArray[1].releaseDate}
            </p>

            <div className="px-2 w-[60vw] flex justify-around items-center">
              <p className="text-center text-5xl ">{jewelryArray[1].name}</p>
              <div className=" w-16 h-16 rounded-full bg-text-950">
                <img src={Arrow} alt="arrow-icon" className="w-full h-full" />
              </div>
            </div>
          </motion.section>

          <motion.section
            className="h-screen bg-accent-700 overflow-hidden "
            style={{ width: widthOfThirdCard, transformOrigin: "0 50%" }}
          >
            <motion.div
              className=" h-[35rem] "
              style={{
                transformOrigin: "50% 50%",
                scaleY: scaleThird,
                y: yOfThird,
              }}
            >
              <div className="w-[60vw] h-[35rem] ">
                <img
                  src={jewelryArray[2].image}
                  alt={jewelryArray[2].name}
                  className="w-[60vw] h-[35rem]"
                />
              </div>
            </motion.div>
            <p className="mx-2 my-2 px-4 py-1 rounded-3xl border border-background-50 max-w-fit">
              {jewelryArray[2].releaseDate}
            </p>

            <div className="px-2 w-[60vw] flex justify-around items-center">
              <p className="text-center text-5xl ">{jewelryArray[2].name}</p>
              <div className=" w-16 h-16 rounded-full bg-text-950">
                <img src={Arrow} alt="arrow-icon" className="w-full h-full" />
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}
