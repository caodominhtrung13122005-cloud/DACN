import { forwardRef, type HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ bordered = true, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white rounded-[var(--radius-md,8px)] ${
          bordered ? 'border border-[var(--color-border-default)]' : ''
        } shadow-[var(--shadow-subtle)] ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-4 sm:p-5 border-b border-[var(--color-border-subtle)] ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`font-heading font-semibold text-[var(--color-text-primary)] text-base sm:text-lg leading-snug ${className}`}
        {...props}
      >
        {children}
      </h3>
    )
  },
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-[var(--color-text-muted)] mt-1 leading-normal ${className}`}
      {...props}
    >
      {children}
    </p>
  )
})
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`p-4 sm:p-5 ${className}`} {...props}>
        {children}
      </div>
    )
  },
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-4 sm:p-5 border-t border-[var(--color-border-subtle)] flex items-center ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CardFooter.displayName = 'CardFooter'

export default Card
