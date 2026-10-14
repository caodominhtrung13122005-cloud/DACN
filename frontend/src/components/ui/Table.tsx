import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'

/**
 * Responsive Note:
 * On desktop (>=768px), use this semantic Table system.
 * On mobile (<768px), records should adapt to stacked Cards / Lists per docs/DESIGN_SYSTEM.md.
 */

export const TableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full overflow-x-auto rounded-[var(--radius-md,8px)] border border-[var(--color-border-default)] bg-white shadow-[var(--shadow-subtle)] ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
TableContainer.displayName = 'TableContainer'

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <table ref={ref} className={`w-full text-left text-sm border-collapse ${className}`} {...props}>
        {children}
      </table>
    )
  },
)
Table.displayName = 'Table'

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={`bg-slate-50/90 border-b border-[var(--color-border-subtle)] ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
})
TableHeader.displayName = 'TableHeader'

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        scope="col"
        className={`px-4 py-3.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider ${className}`}
        {...props}
      >
        {children}
      </th>
    )
  },
)
TableHead.displayName = 'TableHead'

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={`divide-y divide-[var(--color-border-subtle)] ${className}`} {...props}>
      {children}
    </tbody>
  )
})
TableBody.displayName = 'TableBody'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, className = '', children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        aria-selected={selected}
        className={`transition-colors ${
          selected
            ? 'bg-green-50/60 hover:bg-green-50/80'
            : 'hover:bg-slate-50/75'
        } ${className}`}
        {...props}
      >
        {children}
      </tr>
    )
  },
)
TableRow.displayName = 'TableRow'

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={`px-4 py-3.5 text-sm text-[var(--color-text-primary)] align-middle ${className}`}
        {...props}
      >
        {children}
      </td>
    )
  },
)
TableCell.displayName = 'TableCell'

export interface TableEmptyProps extends TdHTMLAttributes<HTMLTableCellElement> {
  colSpan: number
  message?: string
}

export const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(
  ({ colSpan, message = 'Không có dữ liệu hiển thị.', className = '', children, ...props }, ref) => {
    return (
      <tr>
        <td
          ref={ref}
          colSpan={colSpan}
          className={`px-4 py-12 text-center text-sm text-[var(--color-text-muted)] ${className}`}
          {...props}
        >
          {children || message}
        </td>
      </tr>
    )
  },
)
TableEmpty.displayName = 'TableEmpty'

export default Table
