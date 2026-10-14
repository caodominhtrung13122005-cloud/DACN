import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode
  helperText?: ReactNode
  error?: string
  required?: boolean
  placeholder?: string
  containerClassName?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      placeholder,
      id,
      disabled,
      className = '',
      containerClassName = '',
      children,
      defaultValue,
      value,
      'aria-describedby': ariaDescribedByProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

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
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`w-full appearance-none rounded-[var(--radius-md,8px)] bg-white text-[var(--color-text-primary)] transition-colors text-base md:text-sm pl-3.5 pr-10 py-2 min-h-[44px] md:min-h-[40px] ${
              error
                ? 'border-2 border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100'
                : 'border border-[var(--color-border-control)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-green-100'
            } disabled:bg-[var(--color-surface-muted)] disabled:border-[var(--color-border-default)] disabled:text-[var(--color-text-disabled)] disabled:cursor-not-allowed ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-text-muted)]">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </div>
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

Select.displayName = 'Select'

export default Select
