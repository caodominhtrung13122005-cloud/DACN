import { Link } from 'react-router-dom'
import { Sprout, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button, Card, CardContent } from '../../components/ui'

export function ProductionAreasPage() {
  return (
    <div className="bg-[var(--color-bg-page,#FAFAF7)] min-h-[calc(100vh-64px)] py-8 sm:py-12 text-[var(--color-text-primary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[var(--color-brand-primary)]">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Vùng sản xuất</span>
        </nav>

        {/* Page Header Band */}
        <div className="space-y-2 border-b border-[var(--color-border-subtle)] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300/80">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Cơ sở dữ liệu vùng trồng Nam Bộ</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight">
            Vùng Sản Xuất Nông Sản Nam Bộ
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Hồ sơ số hóa các vùng chuyên canh cây ăn trái và nông sản chủ lực tại Đồng bằng sông Cửu Long và Đông Nam Bộ.
          </p>
        </div>

        {/* Placeholder Content Container */}
        <Card className="border-[var(--color-border-default)] bg-white overflow-hidden shadow-xs">
          <CardContent className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                Hồ sơ số hóa vùng sản xuất
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Trang tổng quan hồ sơ vùng sản xuất, liên kết hợp tác xã và chuỗi cung ứng đang trong lộ trình hoàn thiện dữ liệu số hóa.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/marketplace">
                <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Xem nguồn cung thu hoạch tại các vùng trồng
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductionAreasPage
