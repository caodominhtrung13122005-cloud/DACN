import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  helperText?: ReactNode
  error?: string
  required?: boolean
  icon?: ReactNode
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      icon,
      id,
      disabled,
      className = '',
      containerClassName = '',
      'aria-describedby': ariaDescribedByProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
      ariaDescribedByProp,
    ]
      .filter(Boolean)
      .join(' ') || undefined

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          >
            {label}
            {required && (
              <span className="text-red-600 ml-1 font-semibold" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--color-text-muted)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`w-full rounded-[var(--radius-md,8px)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors text-base md:text-sm ${
              icon ? 'pl-10 pr-3.5' : 'px-3.5'
            } py-2 min-h-[44px] md:min-h-[40px] ${
              error
                ? 'border-2 border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100'
                : 'border border-[var(--color-border-control)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-green-100'
            } disabled:bg-[var(--color-surface-muted)] disabled:border-[var(--color-border-default)] disabled:text-[var(--color-text-disabled)] disabled:cursor-not-allowed ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs text-[var(--color-error-text)] flex items-center gap-1 font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-xs text-[var(--color-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
