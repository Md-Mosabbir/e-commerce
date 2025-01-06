import { Link } from "react-router-dom"
import { Button } from "./ui/button"

type OrderInfoProps = {
  _id: string
  orderStatus: string
  address: string
  city: string
  postalCode: string
  createdAt: string
}

const OrderInfo = ({
  _id,
  orderStatus,
  address,
  city,
  postalCode,
  createdAt,
}: OrderInfoProps) => {
  return (
    <article className="border rounded-2xl py-4 px-2 font-montzerrat [&>*]:mb-2">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex items-center text-xs sm:text-base md:text-lg gap-2 py-1 px-2 rounded-3xl bg-accent text-background font-medium ">
          <p className="font-medium">ID: </p>
          <span>{_id}</span>
        </div>

        <Button>
          <Link to={`/order/${_id}`}>View Order</Link>
        </Button>
      </div>
      <div className="flex gap-2 font-medium w-fit">
        <p className="font-medium">Status: </p>
        <span className="font-bold">{orderStatus}</span>
      </div>

      <p>Address: {address}</p>
      <div className="flex gap-3">
        <p className="border-r pr-2 ">City: {city}</p>
        <p>Postal Code: {postalCode}</p>
      </div>
      <p>
        Created:{" "}
        {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </article>
  )
}

export default OrderInfo
