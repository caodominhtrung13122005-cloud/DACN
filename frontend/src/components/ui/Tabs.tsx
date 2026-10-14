import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  className = '',
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : uncontrolledValue
  const baseId = useId()

  const handleValueChange = (nextValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, baseId }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const container = listRef.current
      if (!container) return

      const triggers = Array.from(
        container.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
      )
      if (triggers.length === 0) return

      const currentIndex = triggers.findIndex((el) => el === document.activeElement)
      if (currentIndex === -1) return

      let nextIndex = currentIndex

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % triggers.length
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = triggers.length - 1
      }

      if (nextIndex !== currentIndex) {
        triggers[nextIndex].focus()
        triggers[nextIndex].click()
      }
    }

    return (
      <div
        ref={(node) => {
          // Sync internal ref and forwarded ref
          ;(listRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-1 border-b border-[var(--color-border-subtle)] ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
TabsList.displayName = 'TabsList'

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  badge?: ReactNode
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, badge, disabled = false, className = '', children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error('TabsTrigger must be used within Tabs')

    const isSelected = context.value === value
    const tabId = `${context.baseId}-tab-${value}`
    const panelId = `${context.baseId}-panel-${value}`

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={tabId}
        disabled={disabled}
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => !disabled && context.onValueChange(value)}
        className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] ${
          isSelected
            ? 'border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold'
            : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-slate-300'
        } ${className}`}
        {...props}
      >
        <span>{children}</span>
        {badge && <span className="ml-1 text-xs">{badge}</span>}
      </button>
    )
  },
)
TabsTrigger.displayName = 'TabsTrigger'

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className = '', children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error('TabsContent must be used within Tabs')

    const isSelected = context.value === value
    const tabId = `${context.baseId}-tab-${value}`
    const panelId = `${context.baseId}-panel-${value}`

    if (!isSelected) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        tabIndex={0}
        className={`pt-4 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
TabsContent.displayName = 'TabsContent'

export default Tabs
