import { Link } from 'react-router-dom'
import { UserCheck, ArrowRight, Shield } from 'lucide-react'
import { Button, Card, CardContent } from '../../components/ui'

export function ForFarmersPage() {
  return (
    <div className="bg-[var(--color-bg-page,#FAFAF7)] min-h-[calc(100vh-64px)] py-8 sm:py-12 text-[var(--color-text-primary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[var(--color-brand-primary)]">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Dành cho nhà vườn</span>
        </nav>

        {/* Page Header Band */}
        <div className="space-y-2 border-b border-[var(--color-border-subtle)] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300/80">
            <Shield className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Đồng hành cùng nông hộ & HTX Nam Bộ</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight">
            Giải Pháp Số Cho Nhà Vườn & Hợp Tác Xã
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Kết nối trực tiếp với thương lái và doanh nghiệp thu mua uy tín, chủ động kế hoạch bao tiêu trước thu hoạch mà không lo bị ép giá.
          </p>
        </div>

        {/* Placeholder Content Container */}
        <Card className="border-[var(--color-border-default)] bg-white overflow-hidden shadow-xs">
          <CardContent className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <UserCheck className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                Cổng thông tin dành cho nhà vườn
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Đăng ký tài khoản Nhà vườn để chủ động đăng tải nguồn cung thu hoạch dự kiến, quản lý nhật ký canh tác và nhận đề nghị thu mua trực tiếp từ thương lái.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/register">
                <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Đăng ký tài khoản Nhà vườn
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="secondary" size="md">
                  Tham quan Chợ nguồn cung
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForFarmersPage
