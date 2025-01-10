import { useQuery } from "@tanstack/react-query"

import { useAuth } from "../context/AuthContext"
import axiosInstance from "../utils/axiosInstance"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { BadgeCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import OrderInfo from "../components/OrderInfo"

import PaginationComponent from "../components/FilteringAndSorting/PaginationComponent"
import useShopParams from "../hooks/useShopParams"
import Filter from "../components/FilteringAndSorting/Filter"
import OrderFilter from "../components/FilteringAndSorting/OrderFilter"
import ShopCards from "../components/CardsElements/ShopCards"
import { WishListItemType } from "../types/ProductType"
import { User } from "../types/User"
import { OrderItem } from "../types/OrderTypes"
import Loading from "../components/Loading"

const ProfileSection = () => {
  const { getUser, signOut } = useAuth()

  const query = useQuery({
    queryKey: ["users", "profile"],
    queryFn: getUser,
    retry: 3,
  })

  const data = query.data as User | undefined

  if (query.isLoading) {
    return <Loading />
  }

  return (
    <div className="flex my-3 font-montzerrat gap-6 md:gap-20 border-b-2 pb-6">
      <div>
        <Avatar className="w-28 h-28 rounded-full">
          <AvatarImage
            src={data?.profilePicture}
            alt="Profile Picture"
            className="h-full w-full object-cover"
          />
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-3">
        <div className="flex gap-3 items-center">
          <h1 className="text-base md:text-lg lg:text-2xl font-semibold">
            {data?.username}
          </h1>
          {data?.isVerified && (
            <BadgeCheck
              style={{
                color: "green",
              }}
            />
          )}
        </div>
        <p className=" text-base md:text-lg lg:text-2xl font-medium">
          {data?.email}
        </p>
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
  )
}

const Orders = () => {
  const paramsArgs = {
    types: "",
  }
  const filterArgs = {
    types: [],
  }
  const { params, updatedParams, deleteAllFilters, setLimit, filter, page } =
    useShopParams(paramsArgs, filterArgs)
  const orders = useQuery({
    queryKey: ["users", "orders", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/orders", {
        params,
        withCredentials: true,
      })

      return data
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholderData: (previousData, _previousQuery) => previousData,
  })

  // console.log("Orders", orders.data)

  if (orders.isLoading) {
    return <Loading />
  }

  const ordersData = orders.data
  const orderItems = orders.data.orders

  return (
    <div>
      <PaginationComponent
        currentPage={page}
        totalPages={ordersData.totalPages}
        setLimits={setLimit}
        updateParams={updatedParams}
      />
      <Filter
        deleteAllFilters={deleteAllFilters}
        children={<OrderFilter updateParams={updatedParams} filter={filter} />}
      />
      {orderItems?.length === 0 ? (
        <div className="flex justify-center items-center h-52">
          <p className="text-2xl font-medium">No Orders Yet</p>
        </div>
      ) : (
        <div className="my-5">
          {orderItems?.map((order: OrderItem) => (
            <OrderInfo
              key={order._id}
              _id={order._id}
              address={order.shippingAddress.address}
              city={order.shippingAddress.city}
              postalCode={order.shippingAddress.postalCode}
              createdAt={order.createdAt}
              orderStatus={order.orderStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const WishList = () => {
  const { params, updatedParams, setLimit, page } = useShopParams({}, {})

  const wish = useQuery({
    queryKey: ["users", "wishlist"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/wishlist", {
        params,
        withCredentials: true,
      })

      return data
    },
  })

  if (wish.isLoading) {
    return <Loading />
  }

  const wishData = wish.data

  // console.log("WishList", wishData)

  return (
    <div>
      <PaginationComponent
        currentPage={page}
        totalPages={wishData.totalPages}
        setLimits={setLimit}
        updateParams={updatedParams}
      />
      {wishData?.length === 0 ? (
        <div className="flex justify-center items-center h-52">
          <p className="text-2xl font-medium">WishList is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-9">
          {wishData?.wishlist.map((order: WishListItemType) => (
            <ShopCards
              key={order._id}
              _id={order._id}
              name={order.name}
              price={order.price}
              imageUrl={order.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const InfoSection = () => {
  return (
    <div className="my-2">
      <Tabs defaultValue="order">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2 text-base" value="order">
            Orders
          </TabsTrigger>
          <TabsTrigger className="w-1/2 text-base" value="wishlist">
            Whishlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          {/* <ScrollArea className="p-4 border border-gray-300 rounded-lg"> */}{" "}
          {/* You can adjust the height */}
          <Orders />
          {/* </ScrollArea> */}
        </TabsContent>
        <TabsContent value="wishlist">
          <WishList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const Profile = () => {
  return (
    <>
      <ProfileSection />
      <InfoSection />
    </>
  )
}

export default Profile
