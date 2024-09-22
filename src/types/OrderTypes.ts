import { Product } from "./ProductType"

export type OrderItem = {
  _id: string
  productId: Product
  price: number

  quantity: number
  subtotal: number
  tier: string
  addedAt: string
}

export enum OrderStatus {
  processing = "Processing",
  shipped = "Shipped",
  delivered = "Delivered",
  cancelled = "Cancelled",
}
