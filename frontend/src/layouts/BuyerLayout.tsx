import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Store, Truck } from 'lucide-react'
import { Button } from '../components/ui'
import { useAuth } from '../features/auth'

export function BuyerLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-page)]">
      <header className="p-4 border-b border-[var(--color-border-subtle)] bg-white shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-md,8px)] bg-sky-700 text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-800">MEKAGREEN Bên mua</span>
              <span className="text-[11px] text-slate-500 block">Thương nhân / Đơn vị thu mua</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {user && (
              <span className="text-slate-600 font-medium hidden sm:inline">
                Xin chào, <strong>{user.full_name}</strong> ({user.phone})
              </span>
            )}
            <Link to="/marketplace">
              <Button variant="ghost" size="sm" className="text-xs">
                <Store className="w-3.5 h-3.5 mr-1" />
                Chợ nguồn cung
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default BuyerLayout
