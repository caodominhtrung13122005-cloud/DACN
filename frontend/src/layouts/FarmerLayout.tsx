import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Sprout, Store } from 'lucide-react'
import { Button } from '../components/ui'
import { useAuth } from '../features/auth'

export function FarmerLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg-page)]">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)] bg-white p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-md,8px)] bg-[var(--color-brand-primary)] text-white flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--color-brand-dark)]">Cổng Nông dân</div>
              <div className="text-[11px] text-[var(--color-text-muted)]">MEKAGREEN Nam Bộ</div>
            </div>
          </div>

          {user && (
            <div className="p-3 bg-emerald-50 rounded-[var(--radius-md,8px)] border border-emerald-100 text-xs">
              <div className="font-semibold text-emerald-900">{user.full_name}</div>
              <div className="text-[11px] text-emerald-700 font-mono">{user.phone}</div>
              <div className="text-[10px] text-emerald-600 mt-1 uppercase font-bold">
                {user.account_type || 'INDIVIDUAL'}
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1 text-sm">
            <Link
              to="/marketplace"
              className="flex items-center gap-2 px-3 py-2 rounded text-slate-700 hover:bg-slate-100 text-xs font-medium"
            >
              <Store className="w-4 h-4 text-slate-500" />
              Xem Chợ nguồn cung
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 md:mt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default FarmerLayout
