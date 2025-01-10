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
    <div className="w-full h-[80vh] bg-black pt-[1px] full-bleed-black flex items-start justify-center sticky top-0">
      <article
        id={id}
        className=" mx-auto py-4 bg-amber-100 rounded-lg space-y-4  w-full h-full  sticky full-bleed  "
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 w-full">
          {question}
        </h2>

        <div className=" ">
          <div className=" w-56 aspect-[5/7]  relative overflow-hidden ">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h3 className="text-lg  font-medium text-gray-800 mb-1">{title}</h3>

            <Button> {cta}</Button>
          </div>
        </div>

        <div className="border-t border-amber-200 pt-4">
          <p className="text-gray-700 text-lg">{answer}</p>
        </div>
      </article>
    </div>
  )
}

export default DisplayCard
