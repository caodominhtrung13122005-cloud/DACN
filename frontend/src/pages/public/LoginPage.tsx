import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Lock, Shield, Sprout, User } from 'lucide-react'
import { Alert, Button, Input } from '../../components/ui'

export function LoginPage() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Số điện thoại/Email và Mật khẩu.')
      return
    }

    // Visual demo simulation (No real backend API yet)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Visual feedback: navigate to marketplace or show success
      navigate('/marketplace')
    }, 700)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-stretch">
      {/* Left Brand Panel (Desktop only) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[var(--color-brand-dark,#1B5E20)] text-[#E2E8F0] p-12 flex-col justify-between relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[var(--radius-md,8px)] bg-white text-[var(--color-brand-dark)] flex items-center justify-center font-bold shadow-sm">
              <Sprout className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
            </div>
            <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
              MEKAGREEN
            </span>
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="font-heading font-bold text-2xl !text-white leading-snug">
              Nền tảng kết nối nguồn cung nông sản Nam Bộ
            </h2>
            <p className="text-sm !text-emerald-100 leading-relaxed font-normal">
              Đồng hành cùng hàng ngàn nhà vườn, hợp tác xã và thương lái khu vực Đông Nam Bộ & Đồng bằng sông Cửu Long.
            </p>
          </div>

          <div className="space-y-4 pt-6 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="!text-emerald-100">Theo dõi mùa vụ & nhật ký canh tác thực tế trước thu hoạch</span>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="!text-emerald-100">Bảo vệ quyền riêng tư vị trí chính xác của nhà vườn</span>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="!text-emerald-100">Xác nhận thỏa thuận thu mua song phương minh bạch</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-emerald-800/60 text-xs !text-emerald-200/90">
          © 2026 MEKAGREEN — Dự án Chuyên ngành Nông nghiệp Số Nam Bộ.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 bg-[var(--color-bg-page)]">
        <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-[var(--radius-lg,12px)] border border-[var(--color-border-default)] shadow-[var(--shadow-subtle)]">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl text-[var(--color-text-primary)]">
              Đăng nhập tài khoản
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Dành cho Nhà vườn, Hợp tác xã hoặc Đơn vị thu mua
            </p>
          </div>

          {/* Inline Error Alert */}
          {errorMessage && (
            <Alert variant="error" title="Đăng nhập không thành công">
              {errorMessage}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Số điện thoại hoặc Email"
              required
              id="identifier-input"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="vd: 0901234567 hoặc garden@mekagreen.vn"
              icon={<User className="w-4 h-4 text-slate-400" />}
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password-input"
                  className="block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Mật khẩu <span className="text-red-600 font-semibold" aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Chức năng khôi phục mật khẩu sẽ được hỗ trợ qua SMS/Email.')}
                  className="text-xs text-[var(--color-brand-primary)] hover:underline font-medium"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <input
                id="password-input"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full rounded-[var(--radius-md,8px)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors text-base md:text-sm px-3.5 py-2 min-h-[44px] md:min-h-[40px] border border-[var(--color-border-control)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-sm text-[var(--color-text-secondary)] select-none cursor-pointer">
                Ghi nhớ đăng nhập trên thiết bị này
              </label>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              loadingText="Đang xác thực..."
              className="w-full justify-center text-base font-semibold shadow-xs"
            >
              Đăng nhập vào hệ thống
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="pt-4 border-t border-[var(--color-border-subtle)] text-center text-sm text-[var(--color-text-secondary)]">
            <span>Chưa có tài khoản? </span>
            <Link to="/register" className="font-semibold text-[var(--color-brand-primary)] hover:underline">
              Đăng ký làm Nhà vườn hoặc Bên mua
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
