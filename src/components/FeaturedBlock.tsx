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

const FeaturedBlock = () => {
  const queryKey = ["products"]

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get("/shop/featured")
      return response
    },
    retry: 5,
  })

  return (
    <section className="w-full relative">
      <div className="w-full border-b text-center font-cinzel text-lg mb-4">
        <h2>Featured Product</h2>
      </div>
      <Carousel className="w-full ">
        <CarouselContent className="-ml-2 md:-ml-4">
          {query.isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </article>
                </CarouselItem>
              ))
            : query.data?.data.map((product: Product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ShopCards
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    alt={product.name}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <CarouselPrevious className="relative  top-0 left-2 pointer-events-auto" />
          <CarouselNext className="relative top-0 right-2 pointer-events-auto" />
        </div>
      </Carousel>
    </section>
  )
}

export default FeaturedBlock
