import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../utils/axiosInstance"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

const AddingToCart = ({
  quantity = 1,
  id,
}: {
  quantity?: number
  id: string
}) => {
  const queryClient = useQueryClient()

  const addtoCartMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        "/cart",
        {
          quantity,
          productId: id,
        },
        {
          withCredentials: true,
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })

      toast({
        title: "Item Added",
        description: "Item added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      })
    },
  })

  return (
    <div className="flex flex-col">
      <Button
        className="bg-textColour font-montzerrat text-base  w-32 h-10 px-1 py-2 text-background rounded-3xl"
        disabled={addtoCartMutation.isPending}
        onClick={() => {
          addtoCartMutation.mutate()
        }}
      >
        {addtoCartMutation.isPending ? (
          <>
            <Loader2 size={20} className="animate-spin mx-auto" />
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  )
}

export default AddingToCart
