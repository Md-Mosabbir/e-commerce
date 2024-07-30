import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type PaginationComponentProps = {
  currentPage: number
  totalPages: number
  setLimits: (x: number) => void
  updateParams: (params: string, value: string) => void
}

// Inside the PaginationComponent
const PaginationComponent = ({
  currentPage,
  totalPages,
  setLimits,
  updateParams,
}: PaginationComponentProps) => {
  const handleChangeLimits = (e: string) => {
    const limit = parseInt(e, 10)
    setLimits(limit)
    updateParams("page", "1")
  }

  const handlePageChange = (page: number) => {
    updateParams("page", page.toString())
  }

  return (
    <header className="flex justify-between flex-row-reverse items-center mb-2 border-b-2 border-accent">
      <Select onValueChange={handleChangeLimits}>
        <SelectTrigger>
          <SelectValue placeholder="10" defaultValue="10" />
        </SelectTrigger>
        <SelectContent className="mb-3 z-50">
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="25">25</SelectItem>
        </SelectContent>
      </Select>

      <Pagination className="my-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) handlePageChange(currentPage - 1)
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) handlePageChange(currentPage + 1)
              }}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </header>
  )
}

export default PaginationComponent
