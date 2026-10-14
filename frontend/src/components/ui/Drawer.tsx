import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'

export type DrawerPosition = 'right' | 'left'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  position?: DrawerPosition
  size?: DrawerSize
  closeOnBackdropClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  className?: string
}

const sizeStyles: Record<DrawerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = 'right',
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}: DrawerProps) {
  const generatedId = useId()
  const titleId = `${generatedId}-title`
  const descriptionId = `${generatedId}-description`
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      drawerRef.current?.focus()
    }, 50)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, closeOnEsc, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab' && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  const positionStyles =
    position === 'right'
      ? 'right-0 border-l border-[var(--color-border-default)]'
      : 'left-0 border-r border-[var(--color-border-default)]'

  return (
    <div
      role="presentation"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-900/40"
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`fixed inset-y-0 ${positionStyles} w-full bg-white shadow-[var(--shadow-modal)] flex flex-col focus:outline-none ${sizeStyles[size]} ${className}`}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-[var(--color-border-subtle)]">
            <div className="flex-1 min-w-0 pr-4">
              {title && (
                <h3
                  id={titleId}
                  className="font-heading font-semibold text-[var(--color-text-primary)] text-lg leading-snug"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p id={descriptionId} className="text-sm text-[var(--color-text-muted)] mt-1">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng ngăn trượt"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-100 rounded-md p-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <div className="p-4 sm:p-5 overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div className="p-4 sm:p-5 border-t border-[var(--color-border-subtle)] bg-slate-50/50 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
