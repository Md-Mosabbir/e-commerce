import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "./debouncer"

const NUM_OF_PAGES = 10
const SEARCH_DELAY = 500

export const useShopParams = (SearchParamsArgs = {}, filterArgs = {}) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    search: "",
    ...SearchParamsArgs,

    sort: "",
    order: "",
  })

  const page = parseInt(searchParams.get("page") || "1", 10)

  const splitFilterArgs = Object.fromEntries(
    Object.entries(filterArgs).map(([key, value]) => {
      // First, get the value from searchParams or from filterArgs
      const paramValue = searchParams.get(key) || value

      // Convert comma-separated strings to arrays
      if (Array.isArray(value) && typeof paramValue === "string") {
        return [key, paramValue.split(",")] // Split the string into an array
      }

      // Otherwise, return the value as is
      return [key, paramValue]
    }),
  )

  const filter = {
    search: searchParams.get("search") || "",
    ...splitFilterArgs,
    sort: searchParams.get("sort") || "createdAt",
    order: searchParams.get("order") || "desc",
  }
  const [limit, setLimit] = useState<number>(NUM_OF_PAGES)

  const [debounceSearch] = useDebounce(filter.search, SEARCH_DELAY)

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
      (prev: URLSearchParams) => {
        const newParams = new URLSearchParams(prev)

        // Collect all keys into an array
        const keys: string[] = []
        newParams.forEach((_, key) => {
          keys.push(key)
        })

        // Delete keys from newParams
        keys.forEach((key) => {
          newParams.delete(key)
        })

        return newParams
      },
      { replace: true },
    )
  }

  // Check for array values in filterArgs and join them if needed
  const joinFilterArgs = Object.fromEntries(
    Object.entries(filter).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(",")] // Join the array values with ", "
      }
      return [key, value] // Leave other values as is
    }),
  )

  const params = {
    page,
    limit,
    search: debounceSearch,
    ...joinFilterArgs,
    sort: filter.sort,
    order: filter.order,
  }

  return { params, updatedParams, deleteAllFilters, setLimit, filter, page }
}

export default useShopParams
