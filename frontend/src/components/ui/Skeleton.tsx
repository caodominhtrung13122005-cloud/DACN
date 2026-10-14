import { type HTMLAttributes } from 'react'

export type SkeletonVariant = 'text' | 'rectangular' | 'circular'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  rectangular: 'h-24 w-full rounded-[var(--radius-md,8px)]',
  circular: 'h-10 w-10 rounded-full',
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const customStyle = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...style,
  }

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200 ${variantStyles[variant]} ${className}`}
      style={customStyle}
      {...props}
    />
  )
}

export default Skeleton
