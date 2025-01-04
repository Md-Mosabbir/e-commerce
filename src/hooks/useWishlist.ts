import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../services/wishlistService"

export const useWishlist = () => {
  const queryClient = useQueryClient()

  const wishlist = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  })

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] })
    },
  })

  const toggleWishlist = (productId: string, isInWishlist: boolean) => {
    if (isInWishlist) {
      removeMutation.mutate(productId)
    } else {
      addMutation.mutate(productId)
    }
  }

  return { wishlist, addMutation, removeMutation, toggleWishlist }
}
