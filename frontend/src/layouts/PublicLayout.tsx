import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Sprout } from 'lucide-react'
import { Button, Drawer } from '../components/ui'
import { useAuth } from '../features/auth'
import type { UserRole } from '../types/auth'

export function PublicLayout() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const rolePortalMap: Record<UserRole, { path: string; label: string }> = {
    FARMER: { path: '/farmer', label: 'Cổng Nông dân' },
    BUYER: { path: '/buyer', label: 'Cổng Thu mua' },
    ADMIN: { path: '/admin', label: 'Quản trị' },
  }

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const navLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Chợ nguồn cung', path: '/marketplace' },
    { label: 'Bản đồ nông sản', path: '/map' },
    { label: 'Vùng sản xuất', path: '/production-areas' },
    { label: 'Truy xuất nguồn gốc', path: '/trace' },
    { label: 'Dành cho nhà vườn', path: '/for-farmers' },
  ]

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-page)] text-[var(--color-text-primary)]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[var(--color-border-subtle)] shadow-[var(--shadow-subtle)]">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 select-none focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] rounded shrink-0"
          >
            <div className="w-9 h-9 rounded-[var(--radius-md,8px)] bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-[var(--color-brand-dark)] leading-tight">
                MEKAGREEN
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-medium tracking-wide uppercase leading-none hidden xl:inline">
                Nông sản Nam Bộ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-medium rounded-[var(--radius-sm,4px)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] ${
                    isActive
                      ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-primary-subtle)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          {isAuthenticated && user ? (
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <Link to={rolePortalMap[user.role]?.path || '/'}>
                <Button variant="secondary" size="sm" className="font-semibold text-xs text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100">
                  {rolePortalMap[user.role]?.label || 'Tài khoản'}: {user.full_name}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-xs text-slate-600 hover:text-red-600"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Đăng ký tài khoản
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && user ? (
              <Link to={rolePortalMap[user.role]?.path || '/'}>
                <Button variant="secondary" size="sm" className="px-2.5 text-xs text-emerald-800 bg-emerald-50">
                  {user.full_name}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="px-2.5 text-xs">
                  Đăng nhập
                </Button>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Mở danh mục điều hướng"
              className="p-2 rounded-[var(--radius-sm,4px)] text-[var(--color-text-secondary)] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (No bottom navigation per UI Lock) */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        title="Danh mục MEKAGREEN"
        position="right"
        size="sm"
      >
        <div className="flex flex-col gap-5 py-2">
          {isAuthenticated && user && (
            <div className="p-3 bg-emerald-50 rounded-[var(--radius-md,8px)] border border-emerald-100">
              <div className="text-xs font-bold text-emerald-800">
                {user.full_name}
              </div>
              <div className="text-[11px] text-emerald-600">
                Vai trò: {rolePortalMap[user.role]?.label || user.role} • {user.phone}
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1.5" aria-label="Điều hướng di động">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-[var(--radius-md,8px)] text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--color-brand-primary-subtle)] text-[var(--color-brand-primary)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <hr className="border-[var(--color-border-subtle)]" />

          <div className="flex flex-col gap-2.5">
            {isAuthenticated && user ? (
              <>
                <Link to={rolePortalMap[user.role]?.path || '/'} onClick={closeMobileMenu} className="w-full">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Truy cập {rolePortalMap[user.role]?.label || 'Bảng điều khiển'}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    handleLogout()
                    closeMobileMenu()
                  }}
                  className="w-full justify-center text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Đăng xuất tài khoản
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="w-full">
                  <Button variant="secondary" size="md" className="w-full justify-center">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="w-full">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Đăng ký tài khoản
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Main Page Content */}
      <main className="flex-1 w-full" id="main-content">
        <Outlet />
      </main>

      {/* Public Footer — Dark Green per DESIGN_SYSTEM.md */}
      <footer className="bg-[var(--color-brand-dark,#1B5E20)] text-[#E2E8F0] border-t border-emerald-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Platform Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-white text-[var(--color-brand-dark)] flex items-center justify-center font-bold">
                  <Sprout className="w-4 h-4 stroke-[2.4]" aria-hidden="true" />
                </div>
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                  MEKAGREEN
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Nền tảng số kết nối nguồn cung nông sản Nam Bộ (Đông Nam Bộ & Đồng bằng sông Cửu Long) trước mùa thu hoạch 15–30 ngày.
              </p>
              <div className="text-xs text-emerald-200/80 space-y-1">
                <p>📍 Địa bàn hoạt động: Khu vực Nam Bộ (Đông Nam Bộ & ĐBSCL)</p>
                <p>🕒 Giờ làm việc: 07:00 – 18:00 (Thứ 2 – Thứ 7)</p>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
                Khám phá nguồn cung
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/90">
                <li>
                  <Link to="/marketplace" className="hover:text-white hover:underline transition-colors">
                    Chợ nông sản sắp thu hoạch
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="hover:text-white hover:underline transition-colors">
                    Bản đồ nông sản Nam Bộ
                  </Link>
                </li>
                <li>
                  <Link to="/production-areas" className="hover:text-white hover:underline transition-colors">
                    Vùng sản xuất nông sản
                  </Link>
                </li>
                <li>
                  <Link to="/trace" className="hover:text-white hover:underline transition-colors">
                    Tra cứu hồ sơ truy xuất nguồn gốc
                  </Link>
                </li>
                <li>
                  <Link to="/for-farmers" className="hover:text-white hover:underline transition-colors">
                    Dành cho nhà vườn & Hợp tác xã
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white hover:underline transition-colors">
                    Đăng ký tài khoản hệ thống
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Operational Guidance */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
                Quy trình vận hành
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/90">
                <li>Số hóa Vùng sản xuất & Mùa vụ</li>
                <li>Nhật ký canh tác điện tử minh bạch</li>
                <li>Đề nghị thu mua & Thỏa thuận 2 bên</li>
                <li>Nguyên tắc bảo vệ tọa độ chính xác</li>
              </ul>
            </div>

            {/* Column 4: Trust & Transparency Disclaimer */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
                Cam kết minh bạch
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Dữ liệu vùng trồng, mùa vụ và nhật ký canh tác do nông hộ và hợp tác xã tự kê khai. MEKAGREEN cung cấp hạ tầng công nghệ lưu trữ số hóa, không đóng vai trò cơ quan cấp chứng nhận thay cơ quan nhà nước và không thu phí trung gian.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
            <p>© 2026 MEKAGREEN — Dự án Chuyên ngành Nông nghiệp Số Nam Bộ. Approved & Locked.</p>
            <div className="flex items-center gap-4">
              <span>Chuẩn WCAG 2.1 AA</span>
              <span>•</span>
              <span>Bảo vệ quyền riêng tư GPS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
