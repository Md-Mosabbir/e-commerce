import Slider from "../components/Slider"

import FeaturedBlock from "../components/FeaturedBlock"
import DisplayCard from "../components/Home Elements/DisplayCard"

import dummy1 from "../assets/jpg/dummy1.jpg"
import dummy2 from "../assets/jpg/dummy2.jpg"
import dummy3 from "../assets/jpg/dummy3.jpg"

const cards = [
  {
    id: 1,
    title: "Symbol of Love",
    question: "Why Jewelry Matters?",
    answer:
      "Every piece tells a story. Celebrate your love and commitment with timeless designs crafted to perfection.",
    image: dummy1, // Update with the actual image path
    cta: "Explore",
  },
  {
    id: 2,
    title: "Crafted for Forever",
    question: "What Makes Sedera-Vow Special?",
    answer:
      "Handcrafted with care, our jewelry blends tradition with modern elegance. Designed to last a lifetime, just like your vows.",
    image: dummy2, // Update with the actual image path
    cta: "About Us",
  },
  {
    id: 3,
    title: "Find Your Perfect Match",
    question: "How Do I Choose the Right Piece?",
    answer:
      "Discover curated collections for engagements, weddings, and anniversaries. Let us help you find the piece that matches your love story.",
    image: dummy3, // Update with the actual image path
    cta: "Shop Now",
  },
]

const Home = () => {
  return (
    <>
      <Slider />

      <FeaturedBlock />
      <div className="my-72">
        {cards.map((card) => (
          <DisplayCard
            key={card.id}
            id={card.id.toString()}
            title={card.title}
            question={card.question}
            answer={card.answer}
            image={card.image}
            cta={card.cta}
          />
        ))}
        <div className="my-80"></div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Home
