import { type HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = '',
  ...props
}: PaginationProps) {
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('ellipsis')
      pages.push(totalPages)
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav
      role="navigation"
      aria-label="Phân trang"
      className={`flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)] ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          aria-label="Trang trước"
          icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
        >
          Trước
        </Button>

        {showPageNumbers ? (
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((p, idx) =>
              p === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-[var(--color-text-muted)] select-none">
                  …
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => onPageChange(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`min-w-8 h-8 px-2 rounded-[var(--radius-sm,4px)] text-xs font-medium transition-colors select-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] ${
                    p === currentPage
                      ? 'bg-[var(--color-brand-primary)] text-white font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:bg-slate-100 hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </div>
        ) : (
          <span className="text-xs text-[var(--color-text-muted)] px-2">
            Trang <strong className="text-[var(--color-text-primary)]">{currentPage}</strong> / {totalPages}
          </span>
        )}

        <Button
          variant="secondary"
          size="sm"
          disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          aria-label="Trang tiếp theo"
          icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
          iconPosition="right"
        >
          Sau
        </Button>
      </div>

      <div className="text-xs text-[var(--color-text-muted)] sm:block hidden">
        Tổng số {totalPages} trang
      </div>
    </nav>
  )
}

export default Pagination
