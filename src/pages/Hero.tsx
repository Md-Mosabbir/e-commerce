import MagneticEffect from "../components/MagneticEffect"
import Navigation from "../components/Navigation"

import Arrow from "../assets/svgs/arrow-up-right-svgrepo-com.svg"

const Hero = () => {
  return (
    <div className="relative w-[100vw]  h-screen bg-cover bg-center bg-[url('/images/bg-images/hero-bg.png')] before:content-[''] before:absolute before:h-screen before:w-full  before:bg-gradient-to-r from-background-50 to-background-300 before:opacity-40">
      <section className="relative z-10 max-w-[95%] mx-auto py-4 h-full">
        <Navigation />

        <p className="text-background-900 w-96 font-body text-base pt-24">
          Welcome to Sedera Vow, where love's brilliance meets timeless
          elegance. Explore our curated collection, crafted to embody the sacred
          bond of marriage. Discover the perfect symbol for your everlasting
          vow. Let every shimmering gem tell your unique love story.
        </p>

        <h1 className="text-background-950 font-heading text-[7rem] absolute bottom-0 right-0 tracking-wider">
          SEDERA VOW
        </h1>

        <div className="absolute mt-3 top-1/4 right-10  flex">
          <MagneticEffect>
            <button className="bg-background-950 text-background-50 p-10   rounded-full font-body text-xl aspect-square">
              <div className="flex flex-col justify-center items-center pt-4 ">
                <p>Our Best Sellers</p>
                <div className=" w-16 aspect-square">
                  <img src={Arrow} alt="arrow-icon" className="w-full h-full" />
                </div>
              </div>
            </button>
          </MagneticEffect>
        </div>
      </section>
    </div>
  )
}

export default Hero
