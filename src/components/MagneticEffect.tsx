import { motion } from "framer-motion"
import { useRef, useState } from "react"

type MagneticEffectProps = {
  children: React.ReactNode
}

const MagneticEffect = ({ children }: MagneticEffectProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { left, top, height, width } = ref.current.getBoundingClientRect()
      const x = (e.clientX - (left + width / 2)) * 0.5
      const y = (e.clientY - (top + height / 2)) * 0.5
      setPosition({ x, y })
      console.log(width, height, left, top)
    }
  }

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
    >
      <div>{children}</div>
    </motion.div>
  )
}

export default MagneticEffect
