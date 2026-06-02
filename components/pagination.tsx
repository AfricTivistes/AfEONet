import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, "...", total]
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total]
  return [1, "...", current - 1, current, current + 1, "...", total]
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Button variant="outline" size="sm" asChild className="border-primary/20 text-primary hover:bg-primary/10">
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="border-primary/20 text-primary/40">
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
      )}

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">…</span>
          ) : p === currentPage ? (
            <Button key={p} size="sm" className="bg-primary text-white w-9 h-9 pointer-events-none">
              {p}
            </Button>
          ) : (
            <Button key={p} variant="outline" size="sm" asChild className="border-primary/20 text-primary hover:bg-primary/10 w-9 h-9">
              <Link href={`?page=${p}`}>{p}</Link>
            </Button>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Button variant="outline" size="sm" asChild className="border-primary/20 text-primary hover:bg-primary/10">
          <Link href={`?page=${currentPage + 1}`}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="border-primary/20 text-primary/40">
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
