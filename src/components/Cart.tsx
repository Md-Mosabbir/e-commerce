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
  })

  const updateItem = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      await axiosInstance.post("/cart", data, {
        withCredentials: true,
      })
    },
  })

  function onAddItem(id: string, quantity: number) {
    updateItem.mutate(
      { productId: id, quantity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] })
          toast({
            title: "Item Added",
            description: "Item added successfully",
          })
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          })
        },
      },
    )
  }

  function onRemoveItem(id: string) {
    removeItem.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] })
        toast({
          title: "Item Removed",
          description: "Item removed successfully",
        })
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response.data.errors[0].message
            ? error.response.data.errors[0].message
            : "An error occured",
        })
      },
    })
  }

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
                        onClick={() => {
                          onAddItem(_id, 1)
                        }}
                        variant="outline"
                      >
                        <Plus size={15} />
                      </Button>
                      <span className="mx-2 text-base">{quantity}</span>
                      <Button
                        className="  rounded-full"
                        onClick={() => {
                          if (quantity === 1) {
                            onRemoveItem(_id)
                          } else {
                            onAddItem(_id, -1)
                          }
                        }}
                        variant="outline"
                      >
                        <Minus size={15} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex">
                    <Button onClick={() => onRemoveItem(_id)}>Remove</Button>
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
  const { user } = useAuth()

  const navigate = useNavigate()

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
  })

  const data = query.data?.data

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
        <div className="grid grid-rows-2">
          <div className="h-[80vh]">
            {!user ? (
              <div className="flex items-center gap-2 flex-col h-screen mt-64">
                <p>Please Sign-in to check your cart</p>
                <SheetClose asChild>
                  <Link to={"/auth"}>
                    <Button> Sign-In</Button>
                  </Link>
                </SheetClose>
              </div>
            ) : data === undefined ? (
              <p className="text-center mt-64">An error occured</p>
            ) : data.length === 0 ? (
              <p className="text-center mt-64">Your cart is empty</p>
            ) : (
              data.map((item) => (
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
              ))
            )}
          </div>
          <div>
            <div>
              <SheetClose asChild>
                <Button
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
