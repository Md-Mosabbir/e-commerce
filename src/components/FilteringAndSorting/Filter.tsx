import { Button } from "../ui/button"
import { FilterX } from "lucide-react"

type FilterProps = {
  deleteAllFilters: () => void

  children?: React.ReactNode
}

const Filter = ({ deleteAllFilters, children }: FilterProps) => {
  return (
    <header className="flex">
      <div>
        <div className="flex gap-1 items-center border-r pr-2">
          <Button onClick={deleteAllFilters}>
            <FilterX />
          </Button>
        </div>
      </div>
      {children}
    </header>
  )
}

export default Filter
