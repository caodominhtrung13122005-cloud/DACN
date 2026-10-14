import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] active:bg-[var(--color-brand-primary-active)] focus-visible:outline-[var(--color-brand-primary)] shadow-[var(--shadow-subtle)] border border-transparent',
  secondary:
    'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border-default)] hover:bg-slate-50 hover:text-[var(--color-text-primary)] focus-visible:outline-[var(--color-brand-primary)] shadow-[var(--shadow-subtle)]',
  ghost:
    'bg-transparent text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-subtle)] active:bg-green-100 focus-visible:outline-[var(--color-brand-primary)] border border-transparent',
  destructive:
    'bg-[var(--color-error-bg)] text-[var(--color-error-text)] border border-[var(--color-error-border)] hover:bg-red-100 hover:text-red-900 active:bg-red-200 focus-visible:outline-[var(--color-error-text)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm,4px)]',
  md: 'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md,8px)]',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md,8px)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      icon,
      iconPosition = 'left',
      disabled,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={`inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{loading && loadingText ? loadingText : children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
