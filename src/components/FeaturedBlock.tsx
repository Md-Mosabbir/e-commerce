import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import ShopCards from "./CardsElements/ShopCards"
import { Skeleton } from "./ui/skeleton"
import { Product } from "../types/ProductType"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react"

const FeaturedBlock = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/shop/featured")
      return response.data as Product[]
    },
    retry: 3,
  })

  const renderCarouselItems = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <CarouselItem
          key={`skeleton-${index}`}
          className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
        >
          <SkeletonCard />
        </CarouselItem>
      ))
    }

    if (error) {
      return (
        <CarouselItem className="pl-2 md:pl-4 col-span-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load featured products.
            </AlertDescription>
          </Alert>
        </CarouselItem>
      )
    }

    return data?.map((product) => (
      <CarouselItem
        key={product._id}
        className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
      >
        <ShopCards
          _id={product._id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          averageRating={product.averageRating}
          numberOfReviews={product.reviews.length}
        />
      </CarouselItem>
    ))
  }

  return (
    <section className="w-full relative my-8">
      <h2 className="text-center font-cinzel text-2xl mb-6 pb-2 border-b">
        Featured Products
      </h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {renderCarouselItems()}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  )
}

const SkeletonCard = () => (
  <article className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </article>
)

export default FeaturedBlock
