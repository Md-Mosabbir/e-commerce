import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Toggle } from "../ui/toggle"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ListFilter, Search, SlidersHorizontal } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const ShopFilter = ({
  updateParams,
  filter,
}: {
  updateParams: (params: string, value: string) => void
  filter: Record<string, string | string[]>
}) => {
  const tiers = ["Gold", "Platinum", "Diamond"]
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
            const filteredTiers = value.filter((tier) => tier !== "")
            updateParams("tiers", filteredTiers.join(","))
          }}
          value={filter.tiers}
        >
          {tiers.map((type) => (
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
    </>
  )
}

export default ShopFilter
