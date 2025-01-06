import axiosInstance from "../utils/axiosInstance"
import ShopCards from "../components/CardsElements/ShopCards"

import Filters from "../components/FilteringAndSorting/Filter"

import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "../components/FilteringAndSorting/PaginationComponent"

import { Skeleton } from "../components/ui/skeleton"

import { Product } from "../types/ProductType"
import useShopParams from "../hooks/useShopParams"
import ShopFilter from "../components/FilteringAndSorting/ShopFilter"

const Shop = () => {
  const paramsArgs = {
    tiers: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
  }

  const filterArgs = {
    // tiers: searchParams.get("tiers")?.split(",") || [],
    // inStock: searchParams.get("inStock") || "",
    // minPrice: searchParams.get("minPrice") || "",
    // maxPrice: searchParams.get("maxPrice") || "",

    tiers: [],
    inStock: "",
    minPrice: "",
    maxPrice: "",
  }

  const { params, updatedParams, deleteAllFilters, setLimit, filter, page } =
    useShopParams(paramsArgs, filterArgs)

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

  return (
    <>
      <PaginationComponent
        currentPage={page}
        totalPages={data.totalPages}
        setLimits={setLimit}
        updateParams={updatedParams}
      />
      <Filters
        deleteAllFilters={deleteAllFilters}
        children={<ShopFilter updateParams={updatedParams} filter={filter} />}
      />
      {data.products.length === 0 ? (
        <div className="text-center flex justify-center items-center h-screen font-montzerrat text-lg">
          <h2 className="text-lg font-montzerrat font-medium -mt-72">
            {data.message}
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-9">
          {data.products.map((product: Product) => (
            <ShopCards
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Shop
