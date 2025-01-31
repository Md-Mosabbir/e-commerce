import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const SvgInfo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const circle1Scale = useTransform(scrollYProgress, [0.151, 0.154], [0, 1])
  const circle2Scale = useTransform(scrollYProgress, [0.297, 0.305], [0, 1])
  const circle3Scale = useTransform(scrollYProgress, [0.419, 0.437], [0, 1])
  const circle4Scale = useTransform(scrollYProgress, [0.55, 0.56], [0, 1])
  const circle5Scale = useTransform(scrollYProgress, [0.739, 0.748], [0, 1])

  const [svgSize, setSvgSize] = useState({ width: 600, height: 2500 })
  const [containerStyle, setContainerStyle] = useState({
    height: "300vh",
    width: "100%",
  })

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        containerRef.current?.offsetWidth || window.innerWidth
      const aspectRatio = 2500 / 600 // Original SVG aspect ratio
      const svgHeight = containerWidth * aspectRatio

      setSvgSize({ width: containerWidth, height: svgHeight })
      setContainerStyle({
        height: `${svgHeight}px`,
        width: "100%",
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-900 clip-inset-expand bleed-svg"
      style={containerStyle}
    >
      <motion.svg
        ref={svgRef}
        viewBox={`0 0 600 2500`}
        className="w-full h-full absolute top-0 left-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
        <motion.path
          className="theGoldenLine"
          d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1400 Q -150 1600 250 2000 T 0 2500"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="4px"
          style={{ pathLength }}
        />
        {[
          { cx: 337, cy: 340, text: "Exquisite Collections", x: 375, y: 345 },
          { cx: 126, cy: 775, text: "Custom Designs", x: 160, y: 782 },
          { cx: 372, cy: 1117, text: "Expert Craftsmanship", x: 405, y: 1122 },
          { cx: 117, cy: 1425, text: "Ethical Sourcing", x: 155, y: 1435 },
          { cx: 213, cy: 1962, text: "Lifetime Care", x: 250, y: 1965 },
        ].map((item, index) => (
          <g key={index}>
            <motion.circle
              cx={item.cx}
              cy={item.cy}
              r="20"
              fill="#FFD700"
              style={{
                scale: [
                  circle1Scale,
                  circle2Scale,
                  circle3Scale,
                  circle4Scale,
                  circle5Scale,
                ][index],
              }}
            />
            <motion.text
              x={item.x}
              y={item.y}
              fill="#FFD700"
              style={{
                opacity: [
                  circle1Scale,
                  circle2Scale,
                  circle3Scale,
                  circle4Scale,
                  circle5Scale,
                ][index],
                fontSize: "18px",
                fontWeight: "bold",
              }}
              transition={{ duration: 0.3 }}
            >
              {item.text}
            </motion.text>
          </g>
        ))}
      </motion.svg>
    </div>
  )
}

export default SvgInfo
