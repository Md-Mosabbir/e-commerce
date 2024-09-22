import { useMutation, useQuery } from "@tanstack/react-query"
import { ScrollArea } from "../components/ui/scroll-area"
import axiosInstance from "../utils/axiosInstance"
import { CartItem } from "../components/Cart"
import Container from "../components/Container"
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { toast } from "../components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { OrderItem } from "../types/OrderTypes"

const formSchema = z.object({
  postalCode: z.string({
    message: "Postal code is required",
  }),
  address: z.string({
    message: "Address is required",
  }),
  city: z.string({
    message: "City is required",
  }),
  phoneNumber: z.string({
    message: "Phone number is required",
  }),
  paymentMethod: z.string({
    message: "Payment method is required",
  }),
})

const Checkout = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

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

  const mutateCheckout = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axiosInstance.post("/cart/order", data, {
        withCredentials: true,
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
    onSuccess: () => {
      navigate("/profile")
      toast({
        title: "Order Placed",
        description: "Order placed successfully",
      })
    },
  })

  return (
    <div className="my-7 font-montzerrat">
      <div className="mb-4">
        <h1 className="text-xl font-semibold pb-2">Cart</h1>
        <ScrollArea className="rounded-md border">
          <Container className="my-2">
            {query.isLoading ? (
              <div>Loading...</div>
            ) : (
              data.map((item: OrderItem) => (
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
          </Container>
        </ScrollArea>
      </div>

      <div>
        <p className="font-montzerrat text-red-500 bg-gray-100 rounded-md my-2 p-2 border">
          Note: We are currently implementing online payment gateway, so please
          use Cash on Delivery as a temporary solution.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutateCheckout.mutate(data))}
          className="space-y-8 font-montzerrat"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your current address for delivery
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormDescription>Enter your city</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal Code" {...field} />
                </FormControl>
                <FormDescription>Enter your postal code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormDescription>Enter your phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cash on Delivery">
                      Cash on Delivery
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Checkout
