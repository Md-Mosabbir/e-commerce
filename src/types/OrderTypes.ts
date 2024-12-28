export type OrderItem<> = {
  _id: string

  shippingAddress: ShippingAddress

  createdAt: string
  orderStatus: OrderStatus
}

type ShippingAddress = {
  address: string
  city: string
  postalCode: string
}

export enum OrderStatus {
  processing = "Processing",
  shipped = "Shipped",
  delivered = "Delivered",
  cancelled = "Cancelled",
}
