import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Loader2 size={64} className="animate-spin -mt-28" />
    </div>
  )
}

export default Loading
