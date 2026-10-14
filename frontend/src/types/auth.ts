export type UserRole = 'FARMER' | 'BUYER' | 'ADMIN'

export type FarmerAccountType = 'INDIVIDUAL' | 'COOPERATIVE'

export const USER_ROLES: Record<UserRole, UserRole> = {
  FARMER: 'FARMER',
  BUYER: 'BUYER',
  ADMIN: 'ADMIN',
} as const

export const FARMER_ACCOUNT_TYPES: Record<FarmerAccountType, FarmerAccountType> = {
  INDIVIDUAL: 'INDIVIDUAL',
  COOPERATIVE: 'COOPERATIVE',
} as const
