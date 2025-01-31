import { Button } from "../ui/button"

const DisplayCard = ({
  id,
  title,
  question,
  answer,
  image,
  cta,
}: {
  id: string
  title: string
  question: string
  answer: string
  image: string
  cta: string
}) => {
  return (
    <div className="w-full my-3 flex items-start justify-center sticky top-4">
      <article
        id={id}
        className="mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl w-full max-w-6xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
      >
        <div className="lg:flex">
          <div className="lg:w-2/5 relative overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - Wedding jewelry`}
              className="object-cover w-full h-full lg:h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            <span className="lg:hidden absolute bottom-4 left-4 text-2xl font-medium text-amber-50">
              {title}
            </span>
          </div>
          <div className="p-6 lg:w-3/5">
            <h2 className="hidden lg:block text-3xl font-bold mb-4 text-amber-800">
              {title}
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-amber-900">
              {question}
            </h3>
            <p className="text-amber-800 text-base sm:text-lg mb-6 leading-relaxed">
              {answer}
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-amber-50 rounded-full px-6 py-2 text-lg transition-colors duration-300">
              {cta}
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default DisplayCard
