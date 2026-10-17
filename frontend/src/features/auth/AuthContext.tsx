import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authService } from '../../services/api/authService'
import type { LoginPayload, RegisterPayload, User } from '../../types/auth'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<User>
  register: (payload: RegisterPayload) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<User | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const refreshUser = async (): Promise<User | null> => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch {
      setUser(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (payload: LoginPayload): Promise<User> => {
    const res = await authService.login(payload)
    setUser(res.user)
    return res.user
  }

  const register = async (payload: RegisterPayload): Promise<User> => {
    const res = await authService.register(payload)
    setUser(res.user)
    return res.user
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
