import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth'
import type { UserRole } from '../../types/auth'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  children?: React.ReactNode
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleRedirectMap: Record<UserRole, string> = {
      FARMER: '/farmer',
      BUYER: '/buyer',
      ADMIN: '/admin',
    }
    return <Navigate to={roleRedirectMap[user.role] || '/'} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
