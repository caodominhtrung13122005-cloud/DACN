import { type HTMLAttributes, type ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant
  title?: ReactNode
  icon?: ReactNode
  hideIcon?: boolean
}

const variantStyles: Record<AlertVariant, { container: string; iconColor: string }> = {
  info: {
    container:
      'bg-[var(--color-info-bg)] border-[var(--color-info-border)] text-[var(--color-info-text)]',
    iconColor: 'text-[var(--color-info-text)]',
  },
  success: {
    container:
      'bg-[var(--color-success-bg)] border-[var(--color-success-border)] text-[var(--color-success-text)]',
    iconColor: 'text-[var(--color-success-text)]',
  },
  warning: {
    container:
      'bg-[var(--color-warning-bg)] border-[var(--color-warning-border)] text-[var(--color-warning-text)]',
    iconColor: 'text-[var(--color-warning-text)]',
  },
  error: {
    container:
      'bg-[var(--color-error-bg)] border-[var(--color-error-border)] text-[var(--color-error-text)]',
    iconColor: 'text-[var(--color-error-text)]',
  },
}

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: <Info className="h-5 w-5 shrink-0" aria-hidden="true" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />,
}

export function Alert({
  variant = 'info',
  title,
  icon,
  hideIcon = false,
  className = '',
  children,
  ...props
}: AlertProps) {
  const currentVariant = variantStyles[variant]
  const renderedIcon = !hideIcon ? (icon ?? defaultIcons[variant]) : null

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 border rounded-[var(--radius-md,8px)] text-sm ${currentVariant.container} ${className}`}
      {...props}
    >
      {renderedIcon && (
        <span className={`mt-0.5 shrink-0 ${currentVariant.iconColor}`}>{renderedIcon}</span>
      )}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-semibold mb-1 leading-snug">{title}</h5>}
        {children && <div className="leading-relaxed opacity-95">{children}</div>}
      </div>
    </div>
  )
}

export default Alert
