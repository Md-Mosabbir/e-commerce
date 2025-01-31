import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

// Import images
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
    return null // Prevent rendering on the server side
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full my-3 rounded-3xl border 2xl:h-[80vh]"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative w-full h-0 pb-[56.25%]">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className="absolute top-0 left-0 w-full h-full object-contain rounded-3xl"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
