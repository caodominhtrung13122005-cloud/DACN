export type UserRole = 'FARMER' | 'BUYER' | 'ADMIN'

export type FarmerAccountType = 'INDIVIDUAL' | 'COOPERATIVE'

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_REVIEW'

export interface User {
  id: number
  phone: string
  email: string | null
  role: UserRole
  account_type: FarmerAccountType | null
  full_name: string
  status: UserStatus
  created_at?: string
  updated_at?: string
}

export interface RegisterPayload {
  phone: string
  password: string
  full_name: string
  role: 'FARMER' | 'BUYER'
  account_type?: FarmerAccountType | null
  email?: string | null
}

export interface LoginPayload {
  phone: string
  password: string
  remember?: boolean
}

export interface AuthResponse {
  message: string
  user: User
}

export const USER_ROLES: Record<UserRole, UserRole> = {
  FARMER: 'FARMER',
  BUYER: 'BUYER',
  ADMIN: 'ADMIN',
} as const

export const FARMER_ACCOUNT_TYPES: Record<FarmerAccountType, FarmerAccountType> = {
  INDIVIDUAL: 'INDIVIDUAL',
  COOPERATIVE: 'COOPERATIVE',
} as const
