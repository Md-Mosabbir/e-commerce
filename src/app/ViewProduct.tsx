import { useParams } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { Loader2 } from "lucide-react"

import ShopCards from "../components/CardsElements/ShopCards"

const ViewProduct = () => {
  const params = useParams()

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
  const data = query.data?.data

  return (
    <div className="py-9">
      {/* !TODO */}
      <ShopCards
        name={data.name}
        alt={data.name}
        imageUrl={data.imageUrl}
        price={data.price}
        _id={data.id}
      />
    </div>
  )
}

export default ViewProduct
