import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "../components/ui/use-toast"
import { AxiosError } from "axios"

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function VerifyUser() {
  const params = useParams()
  const navigate = useNavigate()

  const username = params.username
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  })

  const formMutaton = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const response = await axiosInstance.post(
        `/users/${username}/verify/`,
        data,
      )

      return response.data
    },
    onSuccess: () => {
      navigate("/auth")
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          (
            error.response?.data as {
              errors: {
                message: string
              }[]
            }
          )?.errors?.[0]?.message || "An error occurred",
      })
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          formMutaton.mutate(data)
        })}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
