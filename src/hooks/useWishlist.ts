import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../services/wishlistService"
import { useAuth } from "../context/AuthContext"

export const useWishlist = () => {
  const queryClient = useQueryClient()

  const { user } = useAuth()

  const wishlist = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    enabled: user !== null,
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
