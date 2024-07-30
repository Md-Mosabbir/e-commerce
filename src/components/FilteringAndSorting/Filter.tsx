import { Button } from "../ui/button"
import { FilterX, ListFilter, Search, SlidersHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input"

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Toggle } from "../ui/toggle"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

type FilterProps = {
  updateParams: (params: string, value: string) => void
  deleteAllFilters: () => void
  filter: {
    search: string
    tiers: string[]
    inStock: string
    minPrice: string
    maxPrice: string
    sort: string
    order: string
  }
}

const Filter = ({ updateParams, filter, deleteAllFilters }: FilterProps) => {
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
            const filteredTiers = value.filter((tier) => tier !== "")
            updateParams("tiers", filteredTiers.join(","))
          }}
          value={filter.tiers}
        >
          <ToggleGroupItem
            value="Gold"
            aria-label="Toggle Gold"
            className=" hover:bg-transparent"
          >
            Gold
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Platinum"
            aria-label="Toggle Platinum"
            className=" hover:bg-transparent"
          >
            Platinum
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Diamond"
            aria-label="Toggle Diamond"
            className=" hover:bg-transparent"
          >
            Diamond
          </ToggleGroupItem>
        </ToggleGroup>

        <Toggle
          variant="outline"
          aria-label="Toggle bold"
          value={filter.inStock}
          onPressedChange={(value) => {
            updateParams("inStock", value ? "true" : "")
          }}
          pressed={filter.inStock === "true"}
          className=" hover:bg-transparent"
        >
          Stock
        </Toggle>

        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <SlidersHorizontal className="mr-2" />
              Price
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="minPrice">Minimum Price</Label>
              <Input
                type="number"
                id="minPrice"
                placeholder="$1000"
                min={0}
                onChange={(e) => updateParams("minPrice", e.target.value)}
                value={filter.minPrice}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="maxPrice">Maximum Price</Label>
              <Input
                type="number"
                id="maxPrice"
                placeholder="$5000"
                max={6000}
                onChange={(e) => updateParams("maxPrice", e.target.value)}
                value={filter.maxPrice}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-1 border-l pl-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <ListFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <RadioGroup
              defaultValue="createdAt"
              className="border-b py-4"
              value={filter.sort}
              onValueChange={(value) => {
                updateParams("sort", value)
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price" id="r1" />
                <Label htmlFor="r1">Price</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="createdAt" id="r2" />
                <Label htmlFor="r2">Newest</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="r3" />
                <Label htmlFor="r3">Rating</Label>
              </div>
            </RadioGroup>

            <RadioGroup
              defaultValue="desc"
              className="py-4"
              value={filter.order}
              onValueChange={(value) => {
                updateParams("order", value)
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="r5" />
                <Label htmlFor="r5">Lowest to Highest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="desc" id="r6" />
                <Label htmlFor="r6">Highest to Lowest</Label>
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default Filter
