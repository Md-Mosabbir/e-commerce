import { Button } from "../ui/button"
import { FilterX, ListFilter, Search, SlidersHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input"

import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

type FilterProps = {
  deleteAllFilters: () => void

  children?: React.ReactNode
}

const Filter = ({ deleteAllFilters, children }: FilterProps) => {
  return (
    <header className="flex">
      <div>
        <div className="flex gap-1 items-center border-r pr-2">
          Filter:
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
