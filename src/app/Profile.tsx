import { useQuery } from "@tanstack/react-query"

import { useAuth } from "../context/AuthContext"
import axiosInstance from "../utils/axiosInstance"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Badge, BadgeCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import OrderInfo from "../components/OrderInfo"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const { getUser, signOut } = useAuth()

  const query = useQuery({
    queryKey: ["users", "profile"],
    queryFn: getUser,
    retry: 3,
  })

  const orders = useQuery({
    queryKey: ["users", "orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/orders", {
        withCredentials: true,
      })

      return data
    },
  })

  console.log(orders)

  const data = query.data
  const ordersData = orders.data

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="my-4">
      <div className="flex justify-between font-montzerrat gap-3 border-b-2 pb-6">
        <div>
          <Avatar className="w-36 h-36 rounded-full">
            <AvatarImage
              src={data?.profilePicture}
              alt="Profile Picture"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-3">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-semibold">{data?.username}</h1>
            {data?.isVerified && (
              <BadgeCheck
                style={{
                  color: "green",
                }}
              />
            )}
          </div>
          <p className="text-xl font-medium">{data?.email}</p>
          <div className="mt-2">
            <Button className="mr-3">Edit Profile</Button>
            <Button
              onClick={() => {
                signOut()
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="my-2">
        <Tabs defaultValue="order" className="w-[400px]">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2 text-base" value="order">
              Order:{" "}
              <span className="text-red-400 pl-2"> {ordersData?.length} </span>
            </TabsTrigger>
            <TabsTrigger className="w-1/2 text-base" value="wishlist">
              Whishlist
            </TabsTrigger>
          </TabsList>
          <TabsContent value="order">
            {ordersData?.length === 0 ? (
              <div className="flex justify-center items-center h-52">
                <p className="text-2xl font-medium">No Orders Yet</p>
              </div>
            ) : (
              ordersData?.map((order) => (
                <OrderInfo
                  key={order._id}
                  _id={order._id}
                  address={order.shippingAddress.address}
                  city={order.shippingAddress.city}
                  postalCode={order.shippingAddress.postalCode}
                  createdAt={order.createdAt}
                  orderStatus={order.orderStatus}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
