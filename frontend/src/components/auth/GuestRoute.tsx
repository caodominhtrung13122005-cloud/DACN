import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../features/auth'
import type { UserRole } from '../../types/auth'

export function GuestRoute({ children }: { children?: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    const roleRedirectMap: Record<UserRole, string> = {
      FARMER: '/farmer',
      BUYER: '/buyer',
      ADMIN: '/admin',
    }
    return <Navigate to={roleRedirectMap[user.role] || '/marketplace'} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default GuestRoute
