import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext, type ToastItem, type ToastVariant } from './useToast'

const variantStyles: Record<
  ToastVariant,
  { container: string; iconColor: string; icon: ReactNode }
> = {
  success: {
    container: 'bg-white border-l-4 border-l-green-600 border border-[var(--color-border-default)]',
    iconColor: 'text-green-600',
    icon: <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  info: {
    container: 'bg-white border-l-4 border-l-sky-600 border border-[var(--color-border-default)]',
    iconColor: 'text-sky-600',
    icon: <Info className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  warning: {
    container: 'bg-white border-l-4 border-l-amber-600 border border-[var(--color-border-default)]',
    iconColor: 'text-amber-600',
    icon: <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  error: {
    container: 'bg-white border-l-4 border-l-red-600 border border-[var(--color-border-default)]',
    iconColor: 'text-red-600',
    icon: <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
}

export function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem
  onDismiss: (id: string) => void
}) {
  const { id, title, message, variant = 'info', duration = 4000 } = item
  const config = variantStyles[variant]

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => {
      onDismiss(id)
    }, duration)
    return () => clearTimeout(timer)
  }, [id, duration, onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-[var(--radius-md,8px)] shadow-[var(--shadow-elevated)] max-w-sm w-full transition-all ${config.container}`}
    >
      <div className={`mt-0.5 shrink-0 ${config.iconColor}`}>{config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className="font-semibold text-sm text-[var(--color-text-primary)] leading-snug">
            {title}
          </h5>
        )}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Đóng thông báo"
        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-100 p-1 rounded transition-colors"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((options: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const newToast: ToastItem = { ...options, id }
    setToasts((prev) => [...prev, newToast])
    return id
  }, [])

  const success = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: 'success' }),
    [addToast],
  )
  const error = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: 'error' }),
    [addToast],
  )
  const warning = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: 'warning' }),
    [addToast],
  )
  const info = useCallback(
    (message: string, title?: string) => addToast({ message, title, variant: 'info' }),
    [addToast],
  )

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info, dismiss }}>
      {children}
      <div
        aria-label="Thông báo hệ thống"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
