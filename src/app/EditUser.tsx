import { useNavigate } from "react-router-dom"
import Container from "../components/Container"
import { useAuth } from "../context/AuthContext"
import { editUserSchema } from "../types/signUpSchema"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../components/ui/use-toast"
import { AxiosError } from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"
const EditUser = () => {
  const auth = useAuth()

  const navigation = useNavigate()
  const editForm = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
  })

  const editMutation = useMutation({
    mutationFn: async (data: z.infer<typeof editUserSchema>) => {
      await auth.editUser(data)
      return data
    },
    onSuccess: (data) => {
      toast({
        title: "User Updated",
        description: "User edited successfully",
      })

      //redirect to /verify/:username
      navigation("/profile")
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
    <Container>
      <Form {...editForm}>
        <form
          onSubmit={editForm.handleSubmit((data) => editMutation.mutate(data))}
          className="space-y-8"
        >
          <FormField
            control={editForm.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>This is your profile picture.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
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
            {editMutation.isPending ? (
              <div className="flex justify-center items-center animate-spin">
                <Loader2 />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </Container>
  )
}

export default EditUser
