import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion"
import { useRef, useState } from "react"

import dummy1 from "../../assets/jpg/dummy1.jpg"
import dummy2 from "../../assets/jpg/dummy2.jpg"
import dummy3 from "../../assets/jpg/dummy3.jpg"

const PinInfo = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const spanText = [
    "Each creation undergoes meticulous checks to ensure perfection.",
    "Our trusted distribution network ensures access worldwide.",
    "We embrace eco-friendly practices for a better tomorrow.",
  ]

  const imageSrc = [
    { img: dummy1, bg: "bg-red-500" },
    { img: dummy2, bg: "bg-blue-500" },
    { img: dummy3, bg: "bg-green-500" },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const handleScrollChange = (latest: number) => {
    if (latest < 0.3) setActiveIndex(0)
    else if (latest < 0.6) setActiveIndex(1)
    else setActiveIndex(2)
  }

  useMotionValueEvent(scrollYProgress, "change", handleScrollChange)

  return (
    <div>
      <div ref={ref} className="relative h-[600vh] mt-[70vh] overflow-clip">
        <div className="sticky top-0 scroll-text-animation flex flex-col ">
          <div>
            <h3 className="font-extrabold text-xl font-cinzel xl:text-2xl leading-9 xl:w-1/2 pt-2 xl:mx-auto">
              {spanText.map((text, index) => (
                <motion.span
                  key={index}
                  className={`span-animate  mr-3  ${index === activeIndex ? "opacity-100" : "opacity-50"}`}
                >
                  {text}
                </motion.span>
              ))}
            </h3>
          </div>

          <div className="mx-2 mt-[10vh]  relative flex justify-center">
            <AnimatePresence>
              {imageSrc.map(
                (m, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={index}
                      className="absolute w-10/12 md:w-3/4 lg:w-2/5 aspect-square rounded-2xl "
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                    >
                      <motion.div
                        className="w-full h-full"
                        animate={{
                          scale: [1, 1.05, 1],
                          transition: {
                            duration: 0.2,
                            ease: "easeInOut",
                            times: [0, 0.5, 1],
                          },
                        }}
                      >
                        <img
                          src={m.img || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          className="object-cover rounded-2xl w-full h-full"
                        />
                      </motion.div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinInfo
