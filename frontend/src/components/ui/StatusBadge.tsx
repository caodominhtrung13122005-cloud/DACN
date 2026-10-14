import { Badge, type BadgeSize } from './Badge'
import {
  AGREEMENT_STATUS_CONFIG,
  LISTING_STATUS_CONFIG,
  PROPOSAL_STATUS_CONFIG,
  type StatusConfig,
} from './statusConfig'
import type {
  AgreementStatus,
  ListingStatus,
  ProposalStatus,
} from '../../types/status'

export type StatusBadgeProps =
  | {
      type: 'listing'
      status: ListingStatus
      size?: BadgeSize
      className?: string
    }
  | {
      type: 'proposal'
      status: ProposalStatus
      size?: BadgeSize
      className?: string
    }
  | {
      type: 'agreement'
      status: AgreementStatus
      size?: BadgeSize
      className?: string
    }

export function StatusBadge(props: StatusBadgeProps) {
  const { type, status, size = 'md', className = '' } = props

  let config: StatusConfig
  if (type === 'listing') {
    config = LISTING_STATUS_CONFIG[status as ListingStatus]
  } else if (type === 'proposal') {
    config = PROPOSAL_STATUS_CONFIG[status as ProposalStatus]
  } else {
    config = AGREEMENT_STATUS_CONFIG[status as AgreementStatus]
  }

  return (
    <Badge
      variant={config.variant}
      size={size}
      icon={config.icon}
      className={className}
    >
      {config.label}
    </Badge>
  )
}

export function ListingStatusBadge({
  status,
  size,
  className,
}: {
  status: ListingStatus
  size?: BadgeSize
  className?: string
}) {
  return <StatusBadge type="listing" status={status} size={size} className={className} />
}

export function ProposalStatusBadge({
  status,
  size,
  className,
}: {
  status: ProposalStatus
  size?: BadgeSize
  className?: string
}) {
  return <StatusBadge type="proposal" status={status} size={size} className={className} />
}

export function AgreementStatusBadge({
  status,
  size,
  className,
}: {
  status: AgreementStatus
  size?: BadgeSize
  className?: string
}) {
  return <StatusBadge type="agreement" status={status} size={size} className={className} />
}

export default StatusBadge
