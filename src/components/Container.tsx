import { cn } from "../lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn("px-5", className)}>{children}</div>
}

export default Container
