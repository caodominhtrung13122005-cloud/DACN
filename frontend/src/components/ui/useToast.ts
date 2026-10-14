import { createContext, useContext, type ReactNode } from 'react'

export type ToastVariant = 'success' | 'info' | 'warning' | 'error'

export interface ToastItem {
  id: string
  title?: string
  message: string
  variant?: ToastVariant
  duration?: number
}

export interface ToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => string
  success: (message: string, title?: string) => string
  error: (message: string, title?: string) => string
  warning: (message: string, title?: string) => string
  info: (message: string, title?: string) => string
  dismiss: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export type { ReactNode }
