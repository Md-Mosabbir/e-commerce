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
