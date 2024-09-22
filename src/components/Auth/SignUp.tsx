import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"

import { Input } from "../ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useMutation } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { signUpSchema } from "../../types/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../ui/use-toast"
const SignUp = () => {
  const auth = useAuth()

  const navigation = useNavigate()
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const signUpMutation = useMutation({
    mutationFn: async (data: z.infer<typeof signUpSchema>) => {
      await auth.signUp(data)
    },
  })

  function onSignUpSubmit(data: z.infer<typeof signUpSchema>) {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Sign-up",
          description: "User signed up successfully",
        })

        //redirect to /verify/:username
        navigation(`/verify/${data.username}`)
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
      },
    })
  }

  return (
    <>
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
          className="space-y-8"
        >
          <FormField
            control={signUpForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  A verification email will be sent to this address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {signUpMutation.isPending ? (
              <div className="flex justify-center items-center animate-spin">
                {" "}
                <Loader2 />{" "}
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

export default SignUp