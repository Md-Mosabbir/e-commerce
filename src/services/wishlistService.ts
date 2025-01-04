import axiosInstance from "../utils/axiosInstance"

export const fetchWishlist = async () => {
  const { data } = await axiosInstance.get("/users/wishlist", {
    withCredentials: true,
  })

  return data
}

export const addToWishlist = async (productId: string) => {
  const { data } = await axiosInstance.post(
    `/users/wishlist/${productId}`,
    { productId },
    { withCredentials: true },
  )

  return data
}

export const removeFromWishlist = async (productId: string) => {
  await axiosInstance.delete(`/users/wishlist/${productId}`, {
    withCredentials: true,
  })
}
