import clsx from "clsx"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../utils/axiosInstance"
import { toast } from "../ui/use-toast"
const StarRating = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  const ratingData = useQuery({
    queryKey: [id, "user-rating"],
    queryFn: () =>
      axiosInstance.get(`/shop/${id}/user-rating`, {
        withCredentials: true,
      }),
  })

  const mutateRating = useMutation({
    mutationFn: (rating: number) => {
      return axiosInstance.post(
        `/shop/${id}/rate-product`,
        {
          rating,
        },
        {
          withCredentials: true,
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [id, "user-rating"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not update rating",
      })
    },
    retry: 2,
  })

  const handleClick = (index: number) => {
    mutateRating.mutate(index + 1)
  }

  const rating = ratingData.data?.data || 0

  return (
    <div>
      <div className="flex justify-start">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="relative bg-transparent border-0 outline-0"
          >
            <span
              className={clsx(
                "block text-3xl cursor-pointer transition-all duration-300 border-primary",
                {
                  "text-yellow-300": rating.rating > index,
                  "text-gray-300": rating.rating <= index,
                },
              )}
            >
              ★
            </span>
          </button>
        ))}
      </div>
      <p>{rating.rating} out of 5</p>
    </div>
  )
}

export default StarRating
