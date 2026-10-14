/**
 * Approved Business Status Types — MEKAGREEN (LOCKED in docs/DESIGN_SYSTEM.md & docs/BUSINESS_RULES.md)
 */

export type ListingStatus =
  | 'AVAILABLE'
  | 'PARTIALLY_COMMITTED'
  | 'FULLY_COMMITTED'
  | 'CLOSED'
  | 'CANCELLED'

export type ProposalStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'EXPIRED'

export type AgreementStatus =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'CANCELLED'

export type QuantityDisplayState =
  | 'available'
  | 'partially_committed'
  | 'temporarily_unavailable'
  | 'fully_committed'
