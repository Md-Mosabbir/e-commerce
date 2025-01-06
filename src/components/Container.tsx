import { cn } from "../lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-3 px-5 md:mx-16 lg:mx-32", className)}>
      {children}
    </div>
  )
}

export default Container
