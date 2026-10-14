import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  Lock,
  MapPin,
  Phone,
  Send,
  Shield,
  ShieldAlert,
  Sprout,
  Truck,
  User,
} from 'lucide-react'
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Drawer,
  EmptyState,
  Input,
  ListingStatusBadge,
  QuantityStatus,
  Textarea,
  useToast,
} from '../../components/ui'
import {
  MOCK_HARVEST_LISTINGS,
  type HarvestListing,
} from '../../features/marketplace/mockData'

type ViewerRole = 'GUEST' | 'BUYER'

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const toast = useToast()

  // Viewer demo role switcher (Guest vs Authenticated Buyer)
  const [viewerRole, setViewerRole] = useState<ViewerRole>('GUEST')

  // Proposal Drawer state
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false)
  const [proposalQuantity, setProposalQuantity] = useState('')
  const [proposalPrice, setProposalPrice] = useState('')
  const [proposalPickupDate, setProposalPickupDate] = useState('')
  const [proposalPickupMethod, setProposalPickupMethod] = useState<'AT_FARM' | 'AT_COLLECTION_POINT'>('AT_FARM')
  const [proposalNote, setProposalNote] = useState('')
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false)
  const [proposalError, setProposalError] = useState<string | null>(null)

  // Find listing by ID or code, fallback to first item
  const listing: HarvestListing | undefined = useMemo(() => {
    return MOCK_HARVEST_LISTINGS.find(
      (item) => item.id === id || item.code === id
    ) || MOCK_HARVEST_LISTINGS[0]
  }, [id])

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Không tìm thấy bài đăng nguồn cung"
          description="Nguồn cung nông sản bạn đang tìm kiếm không tồn tại hoặc đã hết hạn hiển thị."
          action={
            <Link to="/marketplace">
              <Button variant="primary">Quay lại Chợ nguồn cung</Button>
            </Link>
          }
        />
      </div>
    )
  }

  const maxAvailableTons = listing.availableQuantityKg / 1000

  // Calculate percentage breakdown for quantity allocation bar
  const committedPercent = Math.round((listing.committedQuantityKg / listing.totalQuantityKg) * 100)
  const softReservePercent = Math.round((listing.softReserveQuantityKg / listing.totalQuantityKg) * 100)
  const availablePercent = Math.max(0, 100 - committedPercent - softReservePercent)

  const handleOpenProposalDrawer = () => {
    // Prefill defaults
    setProposalQuantity('')
    setProposalPrice('')
    setProposalPickupDate(listing.expectedHarvestDate)
    setProposalPickupMethod('AT_FARM')
    setProposalNote('')
    setProposalError(null)
    setIsProposalDrawerOpen(true)
  }

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault()
    setProposalError(null)

    const qtyNum = parseFloat(proposalQuantity)
    if (isNaN(qtyNum) || qtyNum <= 0) {
      setProposalError('Vui lòng nhập sản lượng đề xuất hợp lệ (lớn hơn 0 tấn).')
      return
    }

    if (qtyNum > maxAvailableTons) {
      setProposalError(`Sản lượng đề xuất (${qtyNum} tấn) không được vượt quá sản lượng còn khả dụng (${maxAvailableTons} tấn).`)
      return
    }

    setIsSubmittingProposal(true)
    setTimeout(() => {
      setIsSubmittingProposal(false)
      setIsProposalDrawerOpen(false)
      toast.success(
        `Đã gửi đề nghị thu mua ${qtyNum} tấn ${listing.cropName} đến ${listing.farmerName} thành công! Nhà vườn sẽ xem xét và phản hồi trong thời gian sớm nhất.`,
        'Gửi đề nghị thành công'
      )
    }, 600)
  }

  return (
    <div className="bg-[var(--color-bg-page,#FAFAF7)] min-h-screen py-6 sm:py-8 pb-28 lg:pb-16 text-[var(--color-text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* TOP DEMO SWITCHER & BREADCRUMBS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-[var(--color-brand-primary)]">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-text-disabled)]" />
            <Link to="/marketplace" className="hover:text-[var(--color-brand-primary)]">
              Chợ nguồn cung
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-text-disabled)]" />
            <span className="text-[var(--color-text-primary)] font-semibold truncate max-w-[200px] sm:max-w-none">
              {listing.cropName} ({listing.provinceName})
            </span>
          </nav>

          {/* Visual Role Switcher (Guest vs Buyer demo) */}
          <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-stone-100 p-1 rounded-[var(--radius-md,8px)] border border-[var(--color-border-subtle)] text-xs">
            <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] px-1.5">
              Chế độ xem mẫu:
            </span>
            <button
              type="button"
              onClick={() => setViewerRole('GUEST')}
              className={`px-2.5 py-1 rounded-[var(--radius-sm,4px)] font-medium transition-colors ${
                viewerRole === 'GUEST'
                  ? 'bg-white text-[var(--color-brand-primary)] shadow-xs font-semibold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Khách vãng lai
            </button>
            <button
              type="button"
              onClick={() => setViewerRole('BUYER')}
              className={`px-2.5 py-1 rounded-[var(--radius-sm,4px)] font-medium transition-colors ${
                viewerRole === 'BUYER'
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-xs font-semibold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Bên mua (Buyer)
            </button>
          </div>
        </div>

        {/* PRODUCT HEADER */}
        <div className="bg-white rounded-[var(--radius-lg,12px)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-[var(--color-text-secondary)] border border-stone-200">
                  #{listing.code}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">•</span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {listing.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">•</span>
                <span className="text-xs text-stone-500">
                  {listing.season}
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] leading-tight">
                {listing.cropName} — {listing.variety}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[var(--color-text-secondary)] pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                  <span>{listing.locationText}</span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    🛡️ Vị trí gần đúng
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                  <span>
                    Thu hoạch dự kiến: <strong className="text-[var(--color-text-primary)]">{listing.harvestDateText}</strong> (còn {listing.daysUntilHarvest} ngày)
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 self-start">
              <ListingStatusBadge status={listing.status} size="md" />
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN LAYOUT (8 Cols Main + 4 Cols Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* MAIN CONTENT COLUMN (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. VISUAL GALLERY PLACEHOLDER (Restrained Neutral, No Emojis) */}
            <Card className="border-[var(--color-border-default)] overflow-hidden">
              <div className="p-4 sm:p-6 bg-stone-50 border-b border-[var(--color-border-subtle)]">
                {/* Main Image Frame */}
                <div className="w-full aspect-video sm:aspect-2/1 bg-gradient-to-br from-stone-100 via-emerald-50/40 to-stone-200 rounded-[var(--radius-md,8px)] border border-[var(--color-border-default)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-white/80 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3 shadow-xs">
                    <Sprout className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300 mb-1">
                    Ảnh thực địa nhà vườn cung cấp
                  </span>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] max-w-md">
                    Khu vườn chuyên canh {listing.cropName} ({listing.variety})
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Thông tin & hình ảnh do nhà vườn tự cung cấp
                  </p>
                </div>

                {/* Sub Thumbnails (3 items) */}
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="bg-white border border-[var(--color-border-subtle)] rounded-[var(--radius-sm,4px)] p-2.5 text-center">
                    <div className="h-12 bg-stone-100 rounded flex items-center justify-center text-stone-500 mb-1">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-text-secondary)] block truncate">
                      Vườn cây thực tế
                    </span>
                  </div>
                  <div className="bg-white border border-[var(--color-border-subtle)] rounded-[var(--radius-sm,4px)] p-2.5 text-center">
                    <div className="h-12 bg-stone-100 rounded flex items-center justify-center text-stone-500 mb-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-text-secondary)] block truncate">
                      Giai đoạn chuẩn bị cắt
                    </span>
                  </div>
                  <div className="bg-white border border-[var(--color-border-subtle)] rounded-[var(--radius-sm,4px)] p-2.5 text-center">
                    <div className="h-12 bg-stone-100 rounded flex items-center justify-center text-stone-500 mb-1">
                      <Truck className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-text-secondary)] block truncate">
                      Quy cách thu gom
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[var(--color-text-muted)] text-center mt-3">
                  * Hình ảnh thực địa do nhà vườn tự chụp và tải lên trong quá trình cập nhật mùa vụ.
                </p>
              </div>
            </Card>

            {/* 2. HARVEST SPECIFICATIONS */}
            <Card className="border-[var(--color-border-default)]">
              <CardHeader className="border-b border-[var(--color-border-subtle)] pb-3">
                <CardTitle className="text-base font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <span>Thông số & Thời gian thu hoạch dự kiến</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-stone-50/70 rounded-[var(--radius-md,8px)] border border-[var(--color-border-subtle)]">
                    <span className="text-xs text-[var(--color-text-muted)] block">Ngày bắt đầu thu hoạch:</span>
                    <span className="font-semibold text-base text-[var(--color-text-primary)] mt-0.5 block">
                      {listing.harvestDateText}
                    </span>
                    <span className="text-xs text-emerald-700 font-medium">
                      (Dự kiến còn {listing.daysUntilHarvest} ngày)
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50/70 rounded-[var(--radius-md,8px)] border border-[var(--color-border-subtle)]">
                    <span className="text-xs text-[var(--color-text-muted)] block">Khung thời gian thu hoạch:</span>
                    <span className="font-semibold text-base text-[var(--color-text-primary)] mt-0.5 block">
                      {listing.harvestWindowDays} ngày
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      Thu hoạch cuốn chiếu theo độ chín
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50/70 rounded-[var(--radius-md,8px)] border border-[var(--color-border-subtle)] sm:col-span-2">
                    <span className="text-xs text-[var(--color-text-muted)] block">Quy cách đóng gói dự kiến:</span>
                    <span className="font-semibold text-sm text-[var(--color-text-primary)] mt-0.5 block">
                      {listing.packagingSpec}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. QUANTITY ALLOCATION BREAKDOWN (Approved Quantity UX) */}
            <Card className="border-[var(--color-border-default)]">
              <CardHeader className="border-b border-[var(--color-border-subtle)] pb-3">
                <CardTitle className="text-base font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <span>Phân bổ sản lượng thu hoạch dự kiến</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {/* Visual Multi-Color Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Tổng sản lượng vụ này: {listing.totalQuantityText}</span>
                    <span className="text-emerald-800">
                      Khả dụng: {listing.availableQuantityKg / 1000} tấn ({availablePercent}%)
                    </span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden flex" title="Tiến độ phân bổ sản lượng">
                    {/* Committed (Slate-400) */}
                    {committedPercent > 0 && (
                      <div
                        style={{ width: `${committedPercent}%` }}
                        className="bg-slate-400 h-full"
                        title={`Đã chốt: ${listing.committedQuantityText} (${committedPercent}%)`}
                      />
                    )}
                    {/* Soft Reserve (Amber-400) */}
                    {softReservePercent > 0 && (
                      <div
                        style={{ width: `${softReservePercent}%` }}
                        className="bg-amber-400 h-full"
                        title={`Giữ chỗ tạm: ${listing.softReserveQuantityKg / 1000} tấn (${softReservePercent}%)`}
                      />
                    )}
                    {/* Available (Emerald-600) */}
                    {availablePercent > 0 && (
                      <div
                        style={{ width: `${availablePercent}%` }}
                        className="bg-emerald-600 h-full"
                        title={`Còn lại khả dụng: ${listing.availableQuantityKg / 1000} tấn (${availablePercent}%)`}
                      />
                    )}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>Còn lại khả dụng: <strong>{listing.availableQuantityKg / 1000} tấn</strong> ({availablePercent}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                      <span>Đã chốt thỏa thuận: <strong>{listing.committedQuantityText}</strong> ({committedPercent}%)</span>
                    </div>
                    {softReservePercent > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                        <span>Giữ chỗ tạm: <strong>{listing.softReserveQuantityKg / 1000} tấn</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reusable QuantityStatus Component */}
                <div className="pt-2 border-t border-[var(--color-border-subtle)]">
                  <QuantityStatus
                    state={listing.quantityState}
                    remainingText={listing.remainingQuantityText}
                    totalText={`Tổng dự kiến: ${listing.totalQuantityText}`}
                    showExplanation={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 4. PRODUCTION AREA & APPROXIMATE LOCATION */}
            <Card className="border-[var(--color-border-default)]">
              <CardHeader className="border-b border-[var(--color-border-subtle)] pb-3">
                <CardTitle className="text-base font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <span>Vùng sản xuất & Thông tin mùa vụ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Tên vùng sản xuất:</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{listing.areaName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Địa bàn hành chính:</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{listing.locationText}</span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Quy mô diện tích vườn:</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{listing.areaHa} hecta</span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] block">Mã vùng trồng (nếu có):</span>
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">
                      {listing.productionUnitCode || 'Chưa cung cấp'}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      (Thông tin do nhà vườn tự khai báo)
                    </span>
                  </div>
                </div>

                {/* Privacy Warning on GPS */}
                <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-[var(--radius-md,8px)] flex items-start gap-3 text-xs text-sky-900">
                  <Shield className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Chính sách bảo vệ vị trí chính xác:</strong>
                    <span>
                      Vị trí hiển thị trên hệ thống là <strong>vị trí gần đúng</strong> cấp xã/phường để hỗ trợ ước tính cự ly vận chuyển. Tọa độ GPS chính xác của vườn được bảo mật mặc định và <strong>không tự động công khai sau khi ký thỏa thuận</strong>. Nhà vườn và bên mua có thể chủ động liên hệ trao đổi chi tiết điểm lấy hàng qua điện thoại/Zalo khi cần thiết.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5. RECENT FARMING LOGS SUMMARY */}
            <Card className="border-[var(--color-border-default)]">
              <CardHeader className="border-b border-[var(--color-border-subtle)] pb-3">
                <CardTitle className="text-base font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <span>Trích lục nhật ký canh tác gần đây</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                {listing.farmingLogs.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-muted)] italic">
                    Chưa có nhật ký ghi chép công khai cho bài đăng này.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                      {listing.farmingLogs.map((log, index) => (
                        <div key={index} className="relative">
                          {/* Timeline node */}
                          <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {log.date}
                              </span>
                              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                                {log.title}
                              </h4>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                              {log.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        Nhật ký số điện tử do nhà vườn tự ghi nhận trong suốt mùa vụ canh tác.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 6. DOCUMENTS & STANDARDS DISCLAIMER */}
            <Card className="border-[var(--color-border-default)]">
              <CardHeader className="border-b border-[var(--color-border-subtle)] pb-3">
                <CardTitle className="text-base font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[var(--color-brand-primary)]" />
                  <span>Hồ sơ canh tác & Cam kết chất lượng</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3 text-xs text-[var(--color-text-secondary)]">
                <div className="p-3 bg-stone-50 rounded border border-[var(--color-border-subtle)] space-y-1">
                  <span className="font-semibold text-[var(--color-text-primary)] block">
                    Tiêu chuẩn canh tác công bố:
                  </span>
                  <p>{listing.farmingStandard}</p>
                </div>

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded text-amber-900 leading-relaxed">
                  <strong>Khuyến cáo của MEKAGREEN:</strong> Hồ sơ và nhật ký canh tác do nhà vườn tự cung cấp và chịu trách nhiệm về tính trung thực. MEKAGREEN đóng vai trò cung cấp giải pháp số hóa lưu trữ và kết nối thị trường, không đóng vai trò cơ quan cấp văn bằng hoặc chứng chỉ pháp lý nhà nước. Bên mua nên kiểm tra thực địa trước khi hoàn tất thu hoạch.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* STICKY SIDEBAR (lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* PRICE & ACTION CARD */}
            <Card className="border-[var(--color-border-default)] shadow-sm bg-white overflow-hidden">
              {/* Reference Price Header */}
              <div className="p-5 bg-stone-50 border-b border-[var(--color-border-subtle)]">
                <span className="text-xs text-[var(--color-text-muted)] font-medium block">
                  Giá tham khảo tại vườn:
                </span>
                <div className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-brand-primary)] mt-1">
                  {listing.referencePrice.replace('Giá tham khảo: ', '')}
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1 leading-snug">
                  * Mức giá mang tính tham khảo. Hai bên trực tiếp thương lượng theo phẩm cấp và phương thức giao nhận.
                </p>
              </div>

              {/* Farmer Profile Box */}
              <div className="p-5 border-b border-[var(--color-border-subtle)] space-y-3">
                <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider block">
                  Thông tin nhà vườn
                </span>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-[var(--color-text-primary)] truncate">
                      {listing.farmerName}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      {listing.farmerTypeText}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      Đại diện: {listing.contactPerson}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 bg-stone-50 px-2 py-1 rounded border border-stone-200">
                  <CheckCircle2 className="w-3 h-3 text-stone-500 shrink-0" />
                  <span>Đã cung cấp thông tin liên hệ</span>
                </div>
              </div>

              {/* BUYER ACTION CONTROLS */}
              <div className="p-5 space-y-4">
                {viewerRole === 'GUEST' ? (
                  /* GUEST STATE: Contact masked + Login requirement */
                  <div className="space-y-3.5">
                    <div className="p-3 bg-stone-50 rounded-[var(--radius-md,8px)] border border-stone-200 text-center space-y-1">
                      <span className="text-xs text-[var(--color-text-muted)] block">
                        Số điện thoại / Zalo nhà vườn:
                      </span>
                      <span className="font-mono font-bold text-sm text-stone-400 tracking-wider">
                        {listing.phoneHidden}
                      </span>
                    </div>

                    <Link to={`/login?returnUrl=/marketplace/${listing.id}`} className="block w-full">
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full justify-center text-xs font-semibold border-stone-300"
                        icon={<Lock className="w-3.5 h-3.5 text-stone-500" />}
                      >
                        Đăng nhập để xem SĐT / Zalo
                      </Button>
                    </Link>

                    <Link to={`/login?returnUrl=/marketplace/${listing.id}`} className="block w-full">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full justify-center text-xs font-semibold"
                        icon={<Send className="w-3.5 h-3.5" />}
                      >
                        Đăng nhập để gửi đề nghị thu mua
                      </Button>
                    </Link>

                    <p className="text-[11px] text-[var(--color-text-muted)] text-center leading-relaxed">
                      Bên mua cần đăng nhập tài khoản để mở khóa thông tin liên lạc trực tiếp và gửi đề xuất thu mua chính thức.
                    </p>
                  </div>
                ) : (
                  /* AUTHENTICATED BUYER STATE: Direct Call/Zalo + Submit Proposal */
                  <div className="space-y-3.5">
                    {/* Action 1: Direct Contact (Off-platform) */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
                        Liên hệ trực tiếp với nhà vườn:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${listing.phoneDisplay.replace(/\s+/g, '')}`}
                          className="w-full"
                          title={`Gọi điện thoại ${listing.phoneDisplay}`}
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full justify-center text-xs font-semibold border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                            icon={<Phone className="w-3.5 h-3.5" />}
                          >
                            Gọi {listing.phoneDisplay}
                          </Button>
                        </a>
                        <a
                          href={`https://zalo.me/${listing.zaloPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full"
                          title="Nhắn tin qua ứng dụng Zalo"
                        >
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full justify-center text-xs font-semibold border-sky-300 text-sky-800 hover:bg-sky-50"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            Nhắn Zalo
                          </Button>
                        </a>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-tight pt-0.5">
                        * Bên mua có thể chủ động liên hệ trực tiếp ngoài sàn bất cứ lúc nào mà không bắt buộc phải gửi đề nghị trước.
                      </p>
                    </div>

                    <div className="border-t border-[var(--color-border-subtle)] pt-3.5 space-y-2">
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)] block">
                        Đề xuất thu mua trên sàn:
                      </span>
                      
                      {listing.status === 'FULLY_COMMITTED' ? (
                        <Button
                          variant="secondary"
                          size="lg"
                          disabled
                          className="w-full justify-center text-xs font-semibold opacity-60 cursor-not-allowed"
                        >
                          Đã chốt toàn bộ sản lượng
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleOpenProposalDrawer}
                          className="w-full justify-center text-sm font-semibold shadow-xs"
                          icon={<Send className="w-4 h-4" />}
                        >
                          Gửi đề nghị thu mua →
                        </Button>
                      )}

                      <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                        Gửi đề xuất khối lượng, giá mua và ngày cắt trái để tiến tới Thỏa thuận thu mua chính thức.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Support notice */}
              <div className="p-3 bg-stone-50 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-muted)] text-center">
                Cần hỗ trợ thêm thông tin kết nối? Vui lòng gửi yêu cầu qua kênh Trợ giúp của nền tảng.
              </div>
            </Card>

            {/* QUICK SAFETY NOTICE */}
            <Card className="border-[var(--color-border-subtle)] bg-stone-50/50">
              <CardContent className="p-4 space-y-2 text-xs text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)]">
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Quy trình kết nối minh bạch</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                  MEKAGREEN hỗ trợ kết nối trực tiếp giữa thương lái và nhà vườn Nam Bộ, không thu phí trung gian ép giá, bảo vệ quyền lợi hai bên.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (64px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border-default)] shadow-lg px-4 py-2.5 flex items-center justify-between gap-3 min-h-[64px]">
        {viewerRole === 'GUEST' ? (
          <div className="flex items-center justify-between w-full gap-3">
            <div className="min-w-0">
              <span className="text-[11px] text-[var(--color-text-muted)] block truncate">
                {listing.cropName} • {listing.variety}
              </span>
              <span className="text-xs font-semibold text-emerald-800 truncate block">
                {listing.remainingQuantityText}
              </span>
            </div>
            <Link to={`/login?returnUrl=/marketplace/${listing.id}`} className="shrink-0">
              <Button variant="primary" size="sm" className="text-xs font-semibold">
                🔒 Đăng nhập liên hệ
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`tel:${listing.phoneDisplay.replace(/\s+/g, '')}`}
                className="inline-block"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs px-2.5 border-emerald-300 text-emerald-800"
                  icon={<Phone className="w-3.5 h-3.5" />}
                >
                  Gọi / Zalo
                </Button>
              </a>
            </div>

            <div className="flex-1 min-w-0">
              {listing.status === 'FULLY_COMMITTED' ? (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="w-full text-xs font-semibold opacity-60"
                >
                  Đã chốt hết
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleOpenProposalDrawer}
                  className="w-full text-xs font-semibold"
                  icon={<Send className="w-3 h-3" />}
                >
                  Gửi đề nghị thu mua
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* T-03-DRAWER: SUBMIT PURCHASE PROPOSAL DRAWER */}
      <Drawer
        isOpen={isProposalDrawerOpen}
        onClose={() => !isSubmittingProposal && setIsProposalDrawerOpen(false)}
        title="Gửi đề nghị thu mua nông sản"
        description="Đề xuất khối lượng và mức giá mua trực tiếp đến nhà vườn trên MEKAGREEN"
        size="lg"
      >
        <form onSubmit={handleSubmitProposal} className="space-y-5 text-sm">
          
          {/* Listing Summary Card */}
          <div className="p-3.5 bg-stone-50 rounded-[var(--radius-md,8px)] border border-[var(--color-border-subtle)] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-stone-500">Mã #{listing.code}</span>
              <span className="font-semibold text-emerald-800">
                Còn khả dụng: {maxAvailableTons} Tấn
              </span>
            </div>
            <div className="font-bold text-[var(--color-text-primary)] text-sm">
              {listing.cropName} — {listing.variety}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">
              Nhà vườn: <strong>{listing.farmerName}</strong> ({listing.locationText})
            </div>
            <div className="text-xs text-[var(--color-text-muted)] pt-0.5">
              {listing.referencePrice}
            </div>
          </div>

          {/* Error alert if validation fails */}
          {proposalError && (
            <Alert variant="error" title="Lỗi nhập liệu">
              {proposalError}
            </Alert>
          )}

          {/* Field 1: Proposed Quantity */}
          <div className="space-y-1.5">
            <label htmlFor="proposal-quantity" className="text-xs font-semibold text-[var(--color-text-primary)] block">
              Sản lượng đề xuất mua (Tấn) <span className="text-red-500">*</span>
            </label>
            <Input
              id="proposal-quantity"
              type="number"
              step="0.1"
              min="0.1"
              max={maxAvailableTons}
              required
              placeholder={`Tối đa ${maxAvailableTons} tấn`}
              value={proposalQuantity}
              onChange={(e) => setProposalQuantity(e.target.value)}
              className="w-full text-sm"
            />
            <span className="text-[11px] text-[var(--color-text-muted)] block">
              Sản lượng đề xuất không được vượt quá <strong>{maxAvailableTons} tấn</strong> còn khả dụng.
            </span>
          </div>

          {/* Field 2: Proposed Price */}
          <div className="space-y-1.5">
            <label htmlFor="proposal-price" className="text-xs font-semibold text-[var(--color-text-primary)] block">
              Mức giá đề xuất mua (VNĐ / kg) <span className="text-red-500">*</span>
            </label>
            <Input
              id="proposal-price"
              type="text"
              required
              placeholder="Ví dụ: 75.000 hoặc Thỏa thuận khi xem vườn"
              value={proposalPrice}
              onChange={(e) => setProposalPrice(e.target.value)}
              className="w-full text-sm"
            />
            <span className="text-[11px] text-[var(--color-text-muted)] block">
              Gợi ý: {listing.referencePrice}
            </span>
          </div>

          {/* Field 3: Expected Pickup Date */}
          <div className="space-y-1.5">
            <label htmlFor="proposal-pickup-date" className="text-xs font-semibold text-[var(--color-text-primary)] block">
              Ngày dự kiến đến lấy hàng <span className="text-red-500">*</span>
            </label>
            <Input
              id="proposal-pickup-date"
              type="date"
              required
              value={proposalPickupDate}
              onChange={(e) => setProposalPickupDate(e.target.value)}
              className="w-full text-sm"
            />
            <span className="text-[11px] text-[var(--color-text-muted)] block">
              Khung thời gian thu hoạch của nhà vườn: từ <strong>{listing.harvestDateText}</strong> ({listing.harvestWindowDays} ngày).
            </span>
          </div>

          {/* Field 4: Pickup Method */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--color-text-primary)] block">
              Phương thức nhận hàng dự kiến:
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded border border-[var(--color-border-subtle)] bg-stone-50 cursor-pointer hover:bg-stone-100/70">
                <input
                  type="radio"
                  name="pickup-method"
                  checked={proposalPickupMethod === 'AT_FARM'}
                  onChange={() => setProposalPickupMethod('AT_FARM')}
                  className="text-emerald-700 focus:ring-emerald-600"
                />
                <span className="font-medium text-[var(--color-text-primary)]">
                  Đến tận vườn cắt trái / tự vận chuyển
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded border border-[var(--color-border-subtle)] bg-stone-50 cursor-pointer hover:bg-stone-100/70">
                <input
                  type="radio"
                  name="pickup-method"
                  checked={proposalPickupMethod === 'AT_COLLECTION_POINT'}
                  onChange={() => setProposalPickupMethod('AT_COLLECTION_POINT')}
                  className="text-emerald-700 focus:ring-emerald-600"
                />
                <span className="font-medium text-[var(--color-text-primary)]">
                  Nhận tại điểm tập kết xã / trung tâm thu gom
                </span>
              </label>
            </div>
          </div>

          {/* Field 5: Notes & Conditions */}
          <div className="space-y-1.5">
            <label htmlFor="proposal-notes" className="text-xs font-semibold text-[var(--color-text-primary)] block">
              Ghi chú & Điều khoản thương lượng thêm (Tùy chọn)
            </label>
            <Textarea
              id="proposal-notes"
              rows={3}
              placeholder="Yêu cầu về tiêu chuẩn phân loại trái, cọc trước, cung cấp sọt đóng gói, lịch khảo sát vườn..."
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              className="w-full text-xs"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              disabled={isSubmittingProposal}
              onClick={() => setIsProposalDrawerOpen(false)}
            >
              Hủy / Đóng
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmittingProposal}
              icon={isSubmittingProposal ? undefined : <Send className="w-3.5 h-3.5" />}
            >
              {isSubmittingProposal ? 'Đang gửi đề nghị...' : 'Gửi đề nghị thu mua'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  )
}

export default ListingDetailPage
