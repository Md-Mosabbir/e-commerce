// Import Swiper React components
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
      className="my-3"
    >
      <SwiperSlide>
        <img src={dummy1} alt="dummy1" className="w-full rounded-3xl" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={dummy2} alt="dummy2" className="w-full rounded-3xl" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={dummy3} alt="dummy3" className="w-full rounded-3xl" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={dummy4} alt="dummy4" className="w-full rounded-xl" />
      </SwiperSlide>
    </Swiper>
  )
}

export default Slider
