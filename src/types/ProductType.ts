export type Product = {
  _id: string
  name: string
  description: string
  price: number
  numberInStock: number
  imageUrl: string
  tier: string
  category: string
  featured: boolean
  inStock: boolean
  updatedAt: string
  numberOfReviews: number
  reviews: Reviews[]
  averageRating: number
}

export type Reviews = {
  _id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

export type CartItemType = Pick<
  Product,
  "_id" | "name" | "description" | "imageUrl" | "tier"
> & {
  _id: string // To ensure the cart item itself has its own _id
  product: Product // The Product object itself
  quantity: number
  subtotal?: number
}

export type WishListItemType = Pick<
  Product,
  "_id" | "name" | "imageUrl" | "price"
>

export type ShopItemType = Pick<Product, "_id" | "name" | "price" | "imageUrl">
