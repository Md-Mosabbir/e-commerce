import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

const OrderFilter = ({
  updateParams,
  filter,
}: {
  updateParams: (params: string, value: string) => void
  filter: Record<string, string | string[]>
}) => {
  const types = ["Processing", "Shipped", "Delivered", "Cancelled"]
  return (
    <>
      <div className="w-full flex gap-3 overflow-scroll no-scrollbar">
        <Popover>
          <PopoverTrigger asChild>
            <Button className={`${filter.search ? "bg-accent" : ""}`}>
              <Search />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input
              placeholder="Search"
              onChange={(e) => updateParams("search", e.target.value)}
              value={filter.search}
            />
          </PopoverContent>
        </Popover>
        <ToggleGroup
          variant="outline"
          type="multiple"
          onValueChange={(value) => {
            const filteredTypes = value.filter((type) => type !== "")
            updateParams("types", filteredTypes.join(","))
          }}
          value={filter.types}
        >
          {types.map((type) => (
            <ToggleGroupItem
              key={type}
              value={type}
              aria-label={`Toggle ${type}`}
              className=" hover:bg-transparent"
            >
              {type}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  )
}

export default OrderFilter
