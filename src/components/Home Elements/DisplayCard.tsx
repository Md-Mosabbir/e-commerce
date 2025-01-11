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
    <div className="w-full h-[60vh] my-3    flex items-start justify-center sticky top-0">
      <article
        id={id}
        className=" mx-auto   bg-textColour rounded-3xl  w-full h-full my-2 sticky lg:flex  lg:h-auto shadow-sm"
      >
        <div>
          <div className=" w-full aspect-video lg:aspect-square relative overflow-hidden lg:w-80 ">
            <img
              src={image}
              alt={title + " Image of a jewellary"}
              className="object-cover w-full h-full rounded-3xl"
            />
            <span className="text-2xl md:hidden  absolute px-3 bottom-0  font-medium text-textColour mb-1">
              {title}
            </span>
          </div>
        </div>
        <div className="mx-3">
          <h2 className="text-2xl font-bold my-3 text-slate-50 w-full">
            {question}
          </h2>

          <div className=" pt-4">
            <p className="text-slate-100 text-lg">{answer}</p>
          </div>
          <div className="my-5">
            <Button className="bg-primary rounded-3xl"> {cta}</Button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default DisplayCard
