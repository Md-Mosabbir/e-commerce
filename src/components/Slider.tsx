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

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="my-3 rounded-3xl h-96 bg-primary"
    >
      {[dummy1, dummy2, dummy3, dummy4].map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`dummy${index + 1}`}
            className="w-full h-full object-scale-down rounded-3xl" // Adjust the height and make the image responsive
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
