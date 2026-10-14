import { type HTMLAttributes } from 'react'
import { AlertTriangle, CheckCircle2, Clock, Lock } from 'lucide-react'
import { Badge, type BadgeVariant } from './Badge'
import type { QuantityDisplayState } from '../../types/status'

export interface QuantityStatusProps extends HTMLAttributes<HTMLDivElement> {
  state: QuantityDisplayState
  remainingText?: string
  totalText?: string
  compact?: boolean
  showExplanation?: boolean
}

interface StateConfig {
  label: string
  badgeVariant: BadgeVariant
  icon: typeof CheckCircle2
  explanation?: string
}

const STATE_CONFIG: Record<QuantityDisplayState, StateConfig> = {
  available: {
    label: 'Sản lượng sẵn sàng',
    badgeVariant: 'success',
    icon: CheckCircle2,
  },
  partially_committed: {
    label: 'Đã cam kết một phần',
    badgeVariant: 'info',
    icon: Clock,
  },
  temporarily_unavailable: {
    label: 'Tạm hết sản lượng khả dụng (Chờ xác nhận)',
    badgeVariant: 'warning',
    icon: AlertTriangle,
    explanation:
      'Toàn bộ sản lượng hiện đang được giữ chỗ trong các thỏa thuận chờ xác nhận. Sản lượng có thể mở lại nếu thỏa thuận bị hủy.',
  },
  fully_committed: {
    label: 'Đã chốt toàn bộ sản lượng',
    badgeVariant: 'neutral',
    icon: Lock,
  },
}

export function QuantityStatus({
  state,
  remainingText,
  totalText,
  compact = false,
  showExplanation = true,
  className = '',
  ...props
}: QuantityStatusProps) {
  const config = STATE_CONFIG[state]
  const Icon = config.icon

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 text-xs ${className}`} {...props}>
        <Badge
          variant={config.badgeVariant}
          size="sm"
          icon={<Icon className="h-3 w-3" aria-hidden="true" />}
        >
          {config.label}
        </Badge>
        {remainingText && (
          <span className="font-medium text-[var(--color-text-primary)]">
            {remainingText}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge
          variant={config.badgeVariant}
          size="md"
          icon={<Icon className="h-3.5 w-3.5" aria-hidden="true" />}
        >
          {config.label}
        </Badge>
        {remainingText && (
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            {remainingText}
          </span>
        )}
        {totalText && (
          <span className="text-xs text-[var(--color-text-muted)]">
            ({totalText})
          </span>
        )}
      </div>

      {showExplanation && config.explanation && (
        <p className="text-xs text-[var(--color-warning-text)] bg-[var(--color-warning-bg)] border border-[var(--color-warning-border)] rounded-[var(--radius-sm,4px)] p-2 leading-relaxed">
          ℹ️ {config.explanation}
        </p>
      )}
    </div>
  )
}

export default QuantityStatus
