import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import dummy1 from "../assets/jpg/dummy1.jpg"
import dummy2 from "../assets/jpg/dummy2.jpg"
import dummy3 from "../assets/jpg/dummy3.jpg"
import dummy4 from "../assets/jpg/dummy4.jpg"
import { useEffect, useState } from "react"

const images = [
  { src: dummy1, alt: "Dummy Image 1" },
  { src: dummy2, alt: "Dummy Image 2" },
  { src: dummy3, alt: "Dummy Image 3" },
  { src: dummy4, alt: "Dummy Image 4" },
]

const Slider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full my-3"
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-3xl border 2xl:h-[80vh]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative w-full h-0 pb-[56.25%]">
            <motion.img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-3xl"
              loading={index === 0 ? "eager" : "lazy"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export default Slider
