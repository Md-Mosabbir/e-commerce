import { useParams } from "react-router-dom"

import axiosInstance from "../utils/axiosInstance"
import { Minus, Plus } from "lucide-react"

import { Button } from "../components/ui/button"
import { useState } from "react"
import AddingToCart from "../components/CardsElements/AddToCart"
import StarRating from "../components/CardsElements/StarRating"
import { Product } from "../types/ProductType"
import Loading from "../components/Loading"
import { useQuery } from "@tanstack/react-query"
import { Comments } from "../components/CardsElements/Comments"
import Rating from "../components/CardsElements/Rating"

const ViewProduct = () => {
  const [quantity, setQuantity] = useState(1)

  const params = useParams()

  // Queries
  const query = useQuery({
    queryKey: ["shop", params.id],
    queryFn: () => axiosInstance.get(`/shop/${params.id}`),
  })

  if (query.isLoading) {
    return <Loading />
  }

  if (query.isError) {
    return (
      <div className="text-center flex justify-center items-center h-screen">
        <h2 className="text-lg font-montzerrat font-medium -mt-20">
          Error: {query.error.message}
        </h2>
      </div>
    )
  }
  const data: Product = query.data?.data

  return (
    <div className="py-9 font-montzerrat">
      <section>
        <div>
          <h1 className="text-2xl  font-bold">{data.name}</h1>
          <div>
            <div className="flex justify-center">
              <img
                src={data.imageUrl}
                alt={data.name}
                className="w-full  object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 my-4">
          <div className="flex flex-col gap-2 justify-between">
            <Rating
              averageRating={data.averageRating}
              numberOfReviews={data.reviews.length}
            />
            <div>
              <StarRating id={data._id} />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end">
            <div>
              <div className="flex gap-2 items-center">
                <Button className="rounded-full" variant="outline">
                  <Plus
                    size={15}
                    onClick={() => {
                      setQuantity(quantity + 1)
                    }}
                  />
                </Button>
                <span className="mx-2 text-base">{quantity}</span>
                <Button
                  className="  rounded-full"
                  variant="outline"
                  disabled={quantity === 1}
                >
                  <Minus
                    size={15}
                    onClick={() => {
                      if (quantity === 1) {
                        setQuantity(1)
                      } else {
                        setQuantity(quantity - 1)
                      }
                    }}
                  />
                </Button>
              </div>
            </div>
            <div>
              <AddingToCart id={data._id} quantity={quantity} />
              <p className="mt-1 text-end">Available: {data.numberInStock}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h2 className="font-bold ">Description: </h2>
          <p className="text-base">{data.description}</p>
        </div>
      </section>
      <section>
        <Comments reviews={data.reviews} id={params.id} />
      </section>
    </div>
  )
}

export default ViewProduct
