import Slider from "../components/Slider"
import { FAQ } from "../components/FAQ"

import Arrow from "/Arrow.svg"
import Check from "../assets/jpg/check.jpg"

import pendant from "../assets/jpg/pendant.jpg"
import ring from "../assets/jpg/rings.jpg"
import Footer from "../components/Footer"

import FeaturedBlock from "../components/FeaturedBlock"

const Home = () => {
  return (
    <>
      <Slider />

      <FeaturedBlock />

      <article className="w-full my-5 h-60 overflow-clip   relative rounded-t-3xl rounded-bl-3xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-10"></div>
          <h2 className="absolute inset-0 flex px-4 items-center  text-2xl leading-10 -mt-7 font-cinzel text-textColour">
            Checkout our Wedding Collections
          </h2>
          <img
            src={Check}
            alt="Wedding image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 right-0 w-24 rounded-tl-2xl bg-white aspect-square overflow-clip">
          <button className="mt-1 ml-1 bg-accent w-full aspect-square rounded-tl-2xl antialiased flex justify-center items-center">
            <img src={Arrow} alt="Checkout out wedding collection" />
          </button>
        </div>
      </article>

      <section className="min-h-screen px-4 w-full bg-secondary rounded-3xl my-16 py-14">
        <div className="flex flex-col text-textColour">
          <h2 className="font-cinzel text-2xl font-extrabold">
            ABOUT OUR PRODUCTS
          </h2>
          <p className="font-montzerrat w-72 my-1 self-end">
            Extracted from the best Non-sense. I mean is it though so much
            things I got to think about lol
          </p>
          <button className="self-end border px-3 my-2 py-1 rounded-3xl font-cinzel text-sm">
            View All
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 my-8 gap-2 text-[14px] font-montzerrat">
            <img src={pendant} alt="a pendant" className="rounded-3xl" />
            <p>
              I can type but i Love to Know what is true and what is not as I do
              not know what is reality in itself and mew mwe bur phew phew I got
              the thing in my hand and every conner i kjow.
            </p>
            <p className="self-center -mt-5">
              I can type but i Love to Know what is true and what is not as I do
              not know what is reality in itself and mew mwe bur phew phew I got
              the thing in my hand and every conner i kjow.
            </p>
            <img src={ring} alt="Diamond ring" className="rounded-3xl" />
          </div>
        </div>
        <div className="p-4 my-5 -mx-4 bg-textColour rounded-2xl text-background">
          <h2 className="font-cinzel text-2xl font-extrabold py-5 ">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home
