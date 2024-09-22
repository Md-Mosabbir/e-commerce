import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ScrollArea } from "../components/ui/scroll-area"
import { Button } from "../components/ui/button"
import { toast } from "../components/ui/use-toast"

import { AxiosError } from "axios"
import { OrderItem, OrderStatus } from "../types/OrderTypes"

const ViewOrder = () => {
  const params = useParams()

  const query = useQuery({
    queryKey: ["users", "order"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users/order/${params.id}`, {
        withCredentials: true,
      })

      return data
    },
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  const data = query.data

  return (
    <div className="my-3">
      <ScrollArea className="rounded-md border h-64 ">
        {data.orderItems.map((item: OrderItem) => (
          <div
            className="mt-8 font-montzerrat border p-2 mx-1 "
            key={item.productId._id}
          >
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                <li className="flex py-6" id={item.productId._id}>
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/shop/${item.productId._id}`}>
                            {item.productId.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.productId.tier}
                      </p>
                      <p>
                        Category:{" "}
                        <span className="font-medium">
                          {item.productId.category}{" "}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-base mt-2">
                      <div>
                        <p className="mb-2">Quantity: {item.quantity} </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex justify-between gap-3">
                <p className="ml-4">
                  Price: <span className="font-bold">${item.price}</span>
                </p>
                <p>
                  Subtotal: <span className="font-bold">${item.subtotal}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border rounded-md px-1 py-2 my-3">
        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">Status: </p>
          <span className="font-bold">{data.orderStatus}</span>
        </div>

        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">Address: </p>
          <span className="font-bold">{data.shippingAddress.address}</span>
        </div>

        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">City: </p>
          <span className="font-bold">{data.shippingAddress.city}</span>
        </div>

        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">Postal Code: </p>
          <span className="font-bold">{data.shippingAddress.postalCode}</span>
        </div>

        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">Created: </p>
          <span className="font-bold">
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex gap-2 font-medium w-fit my-2 text-lg ">
          <p className="font-medium">Payment Method: </p>
          <span className="font-bold">{data.paymentMethod}</span>
        </div>

        <div>
          <p className="font-montzerrat text-red-500 bg-gray-100 rounded-md my-2 p-2 border">
            Note: We are currently implementing online payment gateway, so
            please use Cash on Delivery as a temporary solution.
          </p>
        </div>
      </div>
      <div>
        <CancelOrder id={params.id || ""} orderStatus={data.orderStatus} />
      </div>
    </div>
  )
}

const CancelOrder = ({
  id,
  orderStatus,
}: {
  id: string
  orderStatus: OrderStatus
}) => {
  const navigate = useNavigate()

  const cancel = useMutation({
    mutationFn: async () => {
      await axiosInstance.put(
        `/users/order/${id}/cancel`,
        {},
        {
          withCredentials: true,
        },
      )
    },

    onSuccess: () => {
      toast({
        title: "Order Cancelled",
        description: "Order has been cancelled successfully",
      })

      navigate("/profile")
    },

    onError: (error: AxiosError) => {
      toast({
        title: "Error",

        description:
          (error.response?.data as { message: string })?.message ||
          "An error occurred",
        variant: "destructive",
      })
    },
  })

  return (
    <Button
      disabled={orderStatus === "Delivered" || orderStatus === "Cancelled"}
      className="bg-red-700"
      onClick={() => cancel.mutate()}
    >
      Cancel Order
    </Button>
  )
}

export default ViewOrder
