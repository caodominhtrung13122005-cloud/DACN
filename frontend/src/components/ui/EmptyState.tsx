import { type HTMLAttributes, type ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-md,8px)] bg-slate-50/50 ${className}`}
      {...props}
    >
      <div className="mb-3.5 p-3 rounded-full bg-slate-100 text-[var(--color-text-muted)] flex items-center justify-center">
        {icon || <Inbox className="h-6 w-6 stroke-[1.5]" aria-hidden="true" />}
      </div>
      <h4 className="font-heading font-semibold text-[var(--color-text-primary)] text-base sm:text-lg">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-[var(--color-text-muted)] mt-1.5 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
