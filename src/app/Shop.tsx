import axiosInstance from "../utils/axiosInstance"
import ShopCards from "../components/CardsElements/ShopCards"
import { ShopCardTypes } from "../types/ShopCardTypes"
import Filters from "../components/FilteringAndSorting/Filter"

import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "../components/FilteringAndSorting/PaginationComponent"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Skeleton } from "../components/ui/skeleton"

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    search: "",
    tiers: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    order: "",
  })
  const page = parseInt(searchParams.get("page") || "1", 10)
  const filter = {
    search: searchParams.get("search") || "",
    tiers: searchParams.get("tiers")?.split(",") || [],
    inStock: searchParams.get("inStock") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "createdAt",
    order: searchParams.get("order") || "desc",
  }

  const { search, tiers, inStock, minPrice, maxPrice, sort, order } = filter

  const [limit, setLimit] = useState<number>(10)

  const updatedParams = (params: string, value: string): void => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      //Always set page to 1 when updating any other filter
      if (params !== "page") {
        newParams.set("page", "1")
      }
      newParams.set(params, value)
      return newParams
    })
  }

  const deleteAllFilters = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete("search")
      newParams.delete("tiers")
      newParams.delete("inStock")
      newParams.delete("minPrice")
      newParams.delete("maxPrice")
      newParams.delete("sort")
      newParams.delete("order")

      return newParams
    })
  }

  const params = {
    page,
    limit,
    search,
    tier: tiers.join(","),
    inStock,
    minPrice,
    maxPrice,
    sort,
    order,
  }

  const queryKey = ["shop", params]

  // Queries
  const query = useQuery({
    queryKey,
    queryFn: () => {
      return axiosInstance.get("/shop", {
        params,
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholderData: (previousData, _previousQuery) => previousData,
  })

  const data = query.data?.data

  if (query.isLoading) {
    return (
      <div className="my-4 grid grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <article className="flex flex-col  space-y-3 " key={index}>
            <Skeleton className="h-[125px]  rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 " />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </article>
        ))}
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

  if (data.products.length === 0) {
    return (
      <div className="text-center flex justify-center items-center h-screen font-montzerrat text-lg">
        <h2 className="text-lg font-montzerrat font-medium -mt-72">
          {data.message}
        </h2>
      </div>
    )
  }

  return (
    <>
      <PaginationComponent
        currentPage={page}
        totalPages={data.totalPages}
        setLimits={setLimit}
        updateParams={updatedParams}
      />
      <Filters
        updateParams={updatedParams}
        deleteAllFilters={deleteAllFilters}
        filter={filter}
      />
      <div className="grid grid-cols-2 gap-4 my-6">
        {data.products.map((product: ShopCardTypes) => (
          <ShopCards
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            alt={product.name}
          />
        ))}
      </div>
    </>
  )
}

export default Shop
