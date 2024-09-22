import { useParams } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { Loader2, Minus, Plus } from "lucide-react"

import { Button } from "../components/ui/button"
import { useState } from "react"
import AddingToCart from "../components/CardsElements/AddingToCart"
import StarRating from "../components/StarRating"
import { Product } from "../types/ProductType"

const ViewProduct = () => {
  const [quantity, setQuantity] = useState(1)

  const params = useParams()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: ["shop", params.id],
    queryFn: () => axiosInstance.get(`/shop/${params.id}`),
  })

  if (query.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loader2 size={64} className="animate-spin -mt-28" />
      </div>
    )
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
            <div className="flex items-center text-base font-montzerrat">
              <svg
                className="w-5 h-5 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-base font-bold text-gray-900 dark:text-white">
                {data.averageRating}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <p className="text-sm font-medium text-gray-900  hover:opacity-80 dark:text-white">
                {data.numberOfReviews} reviews
              </p>
            </div>
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
    </div>
  )
}

export default ViewProduct
