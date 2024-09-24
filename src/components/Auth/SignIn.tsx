import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useMutation } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"

import { signInSchema } from "../../types/signInSchema"
import { useAuth } from "../../context/AuthContext"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"

const SignIn = () => {
  const { signIn } = useAuth()

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signInMutation = useMutation({
    mutationFn: async (data: z.infer<typeof signInSchema>) => {
      await signIn(data)
    },
    onSuccess: () => {
      toast({
        tilte: "Sign-in",
        description: "User signed in successfully",
      })
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
    <>
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit((data) =>
            signInMutation.mutate(data),
          )}
          className="space-y-8"
        >
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {signInMutation.isPending ? (
              <div className="flex justify-center items-center">
                {" "}
                <Loader2 className="animate-spin" />{" "}
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SignIn
