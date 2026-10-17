import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, ShieldAlert, Store } from 'lucide-react'
import { Button } from '../components/ui'
import { useAuth } from '../features/auth'

export function AdminLayout() {
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
            <div className="w-8 h-8 rounded-[var(--radius-md,8px)] bg-red-700 text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800">MEKAGREEN Quản trị</div>
              <div className="text-[11px] text-slate-500">Khu vực Kiểm duyệt</div>
            </div>
          </div>

          {user && (
            <div className="p-3 bg-red-50 rounded-[var(--radius-md,8px)] border border-red-100 text-xs">
              <div className="font-semibold text-red-900">{user.full_name}</div>
              <div className="text-[11px] text-red-700 font-mono">{user.phone}</div>
              <div className="text-[10px] text-red-600 mt-1 uppercase font-bold">
                Quyền: {user.role}
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

export default AdminLayout
