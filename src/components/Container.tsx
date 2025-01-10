import { cn } from "../lib/utils"
import { motion } from "framer-motion"
type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const anim = (variants, val) => {
  return {
    intial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
    val,
  }
}

const expand = {
  intial: {
    top: 0,
  },
  enter: (i) => ({
    top: "100%",
    transition: {
      duration: 0.4,

      delay: i * 0.05,
    },
    transitionEnd: {
      height: 0,
      top: 0,
    },
  }),
  exit: (i) => ({
    height: "100%",
    transition: {
      duration: 0.4,

      delay: i * 0.05,
    },
  }),
}

const columns = 5

const Container = ({ children, className }: ContainerProps) => {
  return (
    <motion.div className={cn("mx-3 px-5 md:mx-16 lg:mx-32", className)}>
      <motion.div className="w-screen h-screen fixed top-0 left-0 flex pointer-events-none z-30">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            {...anim(expand, columns - i)}
            key={i}
            className="w-full h-full bg-black  relative"
            custom={i}
          />
        ))}
      </motion.div>

      {children}
    </motion.div>
  )
}

export default Container
