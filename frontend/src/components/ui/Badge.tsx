import { type HTMLAttributes, type ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral:
    'bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]',
  success:
    'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)]',
  warning:
    'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]',
  error:
    'bg-[var(--color-error-bg)] text-[var(--color-error-text)] border-[var(--color-error-border)]',
  info:
    'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium border rounded-[var(--radius-full,9999px)] leading-none select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge
