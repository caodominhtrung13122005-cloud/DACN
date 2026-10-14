import { type ReactNode } from 'react'
import {
  AlertOctagon,
  CheckCircle2,
  Clock,
  Hourglass,
  Lock,
  PieChart,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import type { BadgeVariant } from './Badge'
import type {
  AgreementStatus,
  ListingStatus,
  ProposalStatus,
} from '../../types/status'

export interface StatusConfig {
  label: string
  variant: BadgeVariant
  icon: ReactNode
}

export const LISTING_STATUS_CONFIG: Record<ListingStatus, StatusConfig> = {
  AVAILABLE: {
    label: 'Đang mở tiếp nhận',
    variant: 'success',
    icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  PARTIALLY_COMMITTED: {
    label: 'Đã cam kết một phần',
    variant: 'info',
    icon: <PieChart className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  FULLY_COMMITTED: {
    label: 'Đã cam kết 100%',
    variant: 'neutral',
    icon: <Lock className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  CLOSED: {
    label: 'Đã đóng bài đăng',
    variant: 'neutral',
    icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  CANCELLED: {
    label: 'Đã hủy',
    variant: 'error',
    icon: <AlertOctagon className="h-3.5 w-3.5" aria-hidden="true" />,
  },
}

export const PROPOSAL_STATUS_CONFIG: Record<ProposalStatus, StatusConfig> = {
  PENDING: {
    label: 'Chờ nhà vườn phản hồi',
    variant: 'warning',
    icon: <Clock className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  ACCEPTED: {
    label: 'Đã chấp thuận nguyên tắc',
    variant: 'success',
    icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  REJECTED: {
    label: 'Nhà vườn từ chối',
    variant: 'error',
    icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  WITHDRAWN: {
    label: 'Đã rút đề nghị',
    variant: 'neutral',
    icon: <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  EXPIRED: {
    label: 'Đề nghị hết hạn',
    variant: 'neutral',
    icon: <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />,
  },
}

export const AGREEMENT_STATUS_CONFIG: Record<AgreementStatus, StatusConfig> = {
  PENDING_CONFIRMATION: {
    label: 'Chờ hai bên cùng xác nhận',
    variant: 'warning',
    icon: <Clock className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  CONFIRMED: {
    label: 'Thỏa thuận đã xác nhận trên hệ thống',
    variant: 'success',
    icon: <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />,
  },
  CANCELLED: {
    label: 'Thỏa thuận đã bị hủy',
    variant: 'error',
    icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" />,
  },
}
