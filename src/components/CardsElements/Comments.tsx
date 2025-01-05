import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // Import zodResolver
import { z } from "zod" // Import zod
import { Comment } from "../../types/ProductType"
import axiosInstance from "../../utils/axiosInstance"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

// Zod schema for form validation
const commentFormSchema = z.object({
  comment: z.string().min(1, "Comment is required"), // Content is required
})

type CommentFormData = z.infer<typeof commentFormSchema>

export function Comments({ reviews, id }) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  })

  const filteredReviews = reviews.filter(
    (review) => review.comment.trim() !== "",
  )

  const mutation = useMutation({
    mutationFn: (data: CommentFormData) => {
      return axiosInstance.post(`/shop/${id}/rate-product`, data, {
        withCredentials: true,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop", id] })
    },
  })

  const onSubmit = (data: CommentFormData) => {
    mutation.mutate(data)
    reset()
  }

  return (
    <Card className="w-full shadow-none  my-8 border-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl  font-bold">Comments</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <Textarea
              id="comment"
              placeholder="Write your comment here..."
              {...register("comment")}
              className="min-h-[100px]"
            />
            {errors.comment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full sm:w-auto"
          >
            {mutation.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </form>

        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <CommentCard
                key={review._id}
                comment={{
                  _id: review._id,
                  user: {
                    username: review.user.username,
                    _id: review.user._id,
                    profilePicture: review.user.profilePicture,
                  },
                  comment: review.comment,
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage
              src={comment.user.profilePicture}
              alt={comment.user.username}
            />
            <AvatarFallback>
              {comment.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {comment.user.username}
            </p>
            <p className="text-sm text-gray-500 break-words">
              {comment.comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
