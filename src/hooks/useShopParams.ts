import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "./debouncer"

const NUM_OF_PAGES = 10
const SEARCH_DELAY = 500

export const useShopParams = () => {
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

  const [limit, setLimit] = useState<number>(NUM_OF_PAGES)

  const [debounceSearch] = useDebounce(search, SEARCH_DELAY)

  const updatedParams = (params: string, value: string): void => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        if (params !== "page") {
          newParams.set("page", "1")
        }
        newParams.set(params, value)
        return newParams
      },
      { replace: true },
    )
  }

  const deleteAllFilters = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.delete("search")
        newParams.delete("tiers")
        newParams.delete("inStock")
        newParams.delete("minPrice")
        newParams.delete("maxPrice")
        newParams.delete("sort")
        newParams.delete("order")

        return newParams
      },
      { replace: true },
    )
  }

  const params = {
    page,
    limit,
    search: debounceSearch,
    tier: tiers.join(","),
    inStock,
    minPrice,
    maxPrice,
    sort,
    order,
  }

  return { params, updatedParams, deleteAllFilters, setLimit, filter, page }
}

export default useShopParams
