import { Button } from "./ui/button"

import CartImage from "/cart.svg"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { Minus, Plus } from "lucide-react"
import { toast } from "./ui/use-toast"
import { useNavigate } from "react-router-dom"

import { OrderItem } from "../types/OrderTypes"
import { AxiosError } from "axios"

type CartItemType = {
  _id: string
  name: string
  description: string
  imageUrl: string
  price: number
  tier: string
  quantity: number
}

export const CartItem = ({
  _id,
  name,
  description,
  imageUrl,
  price,
  tier,
  quantity,
}: CartItemType) => {
  const queryClient = useQueryClient()

  const removeItem = useMutation({
    mutationFn: async (_id: string) => {
      await axiosInstance.delete(
        "/cart", // URL
        {
          data: { productId: _id },
          withCredentials: true,
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Item Removed",
        description: "Item removed successfully",
      })
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          (error.response?.data as { message: string })?.message ||
          "An error occurred",
      })
    },
  })

  const addItem = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      await axiosInstance.post("/cart", data, {
        withCredentials: true,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Item Added",
        description: "Item added successfully",
      })
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          (error.response?.data as { message: string })?.message ||
          "An error occurred",
      })
    },
  })

  return (
    <>
      <div className="mt-8 font-montzerrat">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6" id={_id}>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={imageUrl}
                  alt={description}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/shop/${_id}`}>{name}</Link>
                    </h3>
                    <p className="ml-4">${price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{tier}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-2">
                  <div>
                    <p className="mb-2">Quantity: </p>
                    <div className="flex gap-2 items-center">
                      <Button
                        className="  rounded-full"
                        onClick={() =>
                          addItem.mutate({ productId: _id, quantity: 1 })
                        }
                        variant="outline"
                      >
                        <Plus size={15} />
                      </Button>
                      <span className="mx-2 text-base">{quantity}</span>
                      <Button
                        className="  rounded-full"
                        onClick={() => {
                          quantity > 1
                            ? addItem.mutate({ productId: _id, quantity: -1 })
                            : removeItem.mutate(_id)
                        }}
                        variant="outline"
                      >
                        <Minus size={15} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex">
                    <Button onClick={() => removeItem.mutate(_id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild className="font-montzerrat">
        <button>
          <img src={CartImage} alt="The cart" className="w-8 aspect-square" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/* Cart Items  */}
        <CartContent />
      </SheetContent>
    </Sheet>
  )
}

const CartContent = () => {
  const { user } = useAuth()

  const queryKey = ["cart"]

  const query = useQuery({
    queryKey,
    queryFn: () => {
      return axiosInstance.get("/cart", {
        withCredentials: true,
      })
    },
    retry: 4,
    retryDelay: 3000,
    enabled: user !== null,
  })

  const data = query.data?.data

  const navigate = useNavigate()

  if (query.isLoading) {
    return <p>Loading...</p>
  }

  if (query.isError) {
    return (
      <p>
        {(query.error instanceof AxiosError &&
          query.error.response?.data.message) ||
          "An error occurred"}
      </p>
    )
  }

  if (user === null) {
    return (
      <div className="flex items-center gap-2 flex-col h-screen mt-64">
        <p>Please Sign-in to check your cart</p>
        <SheetClose asChild>
          <Link to={"/auth"}>
            <Button> Sign-In</Button>
          </Link>
        </SheetClose>
      </div>
    )
  }

  return (
    <div className="grid grid-rows-2">
      <div className="h-[80vh]">
        {data.map((item: OrderItem) => (
          <CartItem
            key={item.productId._id}
            _id={item.productId._id}
            description={item.productId.description}
            name={item.productId.name}
            imageUrl={item.productId.imageUrl}
            tier={item.productId.tier}
            price={item.subtotal}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div>
        <div>
          <SheetClose asChild>
            <Button
              className="w-full"
              onClick={() => navigate("/checkout")}
              disabled={data.length === 0 || query.isLoading || query.isError}
            >
              Checkout
            </Button>
          </SheetClose>
        </div>
      </div>
    </div>
  )
}
