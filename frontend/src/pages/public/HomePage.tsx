import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Handshake,
  MapPin,
  Search,
  Shield,
  Sprout,
  Users2,
} from 'lucide-react'
import heroImg from '../../assets/hero-aerial.jpg'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ListingStatusBadge,
  QuantityStatus,
  Select,
} from '../../components/ui'
import type { ListingStatus } from '../../types/status'

interface FeaturedSupply {
  id: string
  cropName: string
  variety: string
  farmName: string
  locationText: string
  harvestDateText: string
  daysUntilHarvest: number
  expectedQuantity: string
  remainingQuantity: string
  status: ListingStatus
}

export function HomePage() {
  const navigate = useNavigate()
  const [searchCrop, setSearchCrop] = useState('')
  const [searchProvince, setSearchProvince] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/marketplace')
  }

  // Realistic static demo data for Southern Vietnam (approved administrative dataset)
  const featuredSupplies: FeaturedSupply[] = [
    {
      id: 'SPL-2026-001',
      cropName: 'Sầu riêng',
      variety: 'Ri6 cơm vàng hạt lép',
      farmName: 'Nhà vườn Út Được',
      locationText: 'Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Cái Bè, Tiền Giang cũ)',
      harvestDateText: '25/10/2026',
      daysUntilHarvest: 17,
      expectedQuantity: '10.0 tấn',
      remainingQuantity: 'Còn lại: 5.0 tấn (50%)',
      status: 'AVAILABLE',
    },
    {
      id: 'SPL-2026-002',
      cropName: 'Xoài cát',
      variety: 'Xoài cát Hòa Lộc xuất khẩu',
      farmName: 'HTX Nông nghiệp Xanh',
      locationText: 'Xã An Hữu, Tỉnh Đồng Tháp (Hòa Hưng / Cái Bè cũ)',
      harvestDateText: '10/11/2026',
      daysUntilHarvest: 33,
      expectedQuantity: '5.0 tấn',
      remainingQuantity: 'Còn lại: 3.5 tấn (70%)',
      status: 'PARTIALLY_COMMITTED',
    },
    {
      id: 'SPL-2026-003',
      cropName: 'Bưởi da xanh',
      variety: 'Bưởi da xanh ruột hồng',
      farmName: 'HTX Bưởi Da Xanh Chợ Lách',
      locationText: 'Xã Chợ Lách, Tỉnh Vĩnh Long (Bến Tre cũ)',
      harvestDateText: '05/11/2026',
      daysUntilHarvest: 28,
      expectedQuantity: '10.0 tấn',
      remainingQuantity: 'Còn lại: 8.0 tấn (80%)',
      status: 'AVAILABLE',
    },
    {
      id: 'SPL-2026-004',
      cropName: 'Mít ruột đỏ',
      variety: 'Mít ruột đỏ Indo mọng nước',
      farmName: 'HTX Nông nghiệp Chợ Lách',
      locationText: 'Xã Chợ Lách, Tỉnh Vĩnh Long (Bến Tre cũ)',
      harvestDateText: '15/11/2026',
      daysUntilHarvest: 38,
      expectedQuantity: '12.0 tấn',
      remainingQuantity: 'Còn lại: 12.0 tấn (100%)',
      status: 'AVAILABLE',
    },
  ]

  return (
    <div className="pb-16">
      {/* SECTION A: HERO */}
      <section className="relative bg-stone-950 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Toàn cảnh cánh đồng và vùng nguyên liệu nông nghiệp Nam Bộ nhìn từ trên cao"
            className="w-full h-full object-cover object-center"
          />
          {/* Restrained Left-to-Right Dark Overlay:
              Stronger behind text on left, lighter/fading towards right to preserve vivid field scenery */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/45 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-[440px] md:min-h-[480px] lg:min-h-[500px] flex flex-col justify-center">
          <div className="max-w-[660px] space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full,9999px)] bg-emerald-950/80 border border-emerald-400/40 !text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Nông sản Nam Bộ — Kết nối trước thu hoạch 15–30 ngày</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-[1.18] drop-shadow-xs">
              Nền tảng kết nối nguồn cung nông sản khu vực Nam Bộ
            </h1>

            <p className="text-base sm:text-lg !text-stone-100 sm:!text-slate-100 leading-relaxed font-normal">
              Chủ động liên kết giữa thương lái, doanh nghiệp thu mua và nhà vườn trước mùa thu hoạch 15–30 ngày. Minh bạch sản lượng, đồng hành vụ mùa tại Đông Nam Bộ và Đồng bằng sông Cửu Long.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link to="/marketplace">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-semibold shadow-md px-6 justify-center"
                  icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                  iconPosition="right"
                >
                  Khám phá nguồn cung
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-semibold !bg-transparent hover:!bg-white/10 !text-white !border-white/80 hover:!border-white justify-center shadow-none"
                >
                  Dành cho Nhà vườn / HTX
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOURCING SEARCH DOCK (Quick Search) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:-mt-8 relative z-20">
        <Card className="shadow-[var(--shadow-subtle)] border-[var(--color-border-default)] bg-white">
          <CardContent className="p-4 sm:p-5">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
              <div className="md:col-span-5 space-y-1.5">
                <label htmlFor="crop-query" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Nông sản cần tìm
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <input
                    id="crop-query"
                    type="text"
                    value={searchCrop}
                    onChange={(e) => setSearchCrop(e.target.value)}
                    placeholder="vd: Sầu riêng Ri6, Xoài cát Hòa Lộc..."
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[42px] rounded-[var(--radius-md,8px)] border border-[var(--color-border-control)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-2 focus:border-[var(--color-brand-primary)] focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label htmlFor="province-select" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Tỉnh / Thành phố
                </label>
                <Select
                  id="province-select"
                  value={searchProvince}
                  onChange={(e) => setSearchProvince(e.target.value)}
                  className="min-h-[42px] bg-white"
                >
                  <option value="">Tất cả Tỉnh / Thành phố</option>
                  <option value="HCM">Thành phố Hồ Chí Minh</option>
                  <option value="DN">Đồng Nai</option>
                  <option value="TN">Tây Ninh</option>
                  <option value="DT">Đồng Tháp</option>
                  <option value="VL">Vĩnh Long</option>
                  <option value="CT">Thành phố Cần Thơ</option>
                  <option value="AG">An Giang</option>
                  <option value="CM">Cà Mau</option>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full min-h-[42px] justify-center font-semibold text-sm"
                  icon={<Search className="w-4 h-4" aria-hidden="true" />}
                >
                  Tìm kiếm nguồn cung
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* SECTION B: THREE CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-14 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)]">
            Ba Trụ Cột Nền Tảng MEKAGREEN
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
            Giải pháp số hóa thực tế đồng hành cùng chuỗi giá trị nông nghiệp Nam Bộ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {/* Pillar 1 */}
          <Card className="h-full flex flex-col justify-between border-[var(--color-border-subtle)] shadow-xs">
            <div>
              <CardHeader className="space-y-3 pb-2">
                <div className="w-10 h-10 rounded-[var(--radius-md,8px)] bg-[var(--color-brand-primary-subtle)] text-[var(--color-brand-primary)] flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                  1. Hồ sơ sản xuất số hóa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Nhà vườn và HTX số hóa vùng sản xuất, theo dõi mùa vụ và cập nhật nhật ký canh tác có hình ảnh thực tế ngoài đồng ruộng.
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Pillar 2 */}
          <Card className="h-full flex flex-col justify-between border-[var(--color-border-subtle)] shadow-xs">
            <div>
              <CardHeader className="space-y-3 pb-2">
                <div className="w-10 h-10 rounded-[var(--radius-md,8px)] bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                  2. Chợ nguồn cung trước thu hoạch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Công bố sản lượng dự kiến từ 15–30 ngày trước thu hoạch giúp bên mua chủ động kế hoạch gom hàng và nắm bắt dải ngày cắt trái.
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Pillar 3 */}
          <Card className="h-full flex flex-col justify-between border-[var(--color-border-subtle)] shadow-xs">
            <div>
              <CardHeader className="space-y-3 pb-2">
                <div className="w-10 h-10 rounded-[var(--radius-md,8px)] bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Handshake className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                  3. Thỏa thuận thu mua
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Bên mua gửi đề nghị, nhà vườn phản hồi và hai bên độc lập xác nhận thỏa thuận thu mua trên hệ thống. Minh bạch điều khoản sản lượng và thời gian thu hoạch.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION C: EXPECTED HARVEST SUPPLY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Nguồn Cung Thu Hoạch Sắp Tới
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Các lô nông sản đặc sản Nam Bộ dự kiến thu hoạch trong 15–40 ngày tới
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" className="font-semibold text-sm">
              Xem tất cả nguồn cung →
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featuredSupplies.map((item) => (
            <Card key={item.id} className="flex flex-col h-full hover:shadow-md transition-shadow border-[var(--color-border-default)]">
              {/* Priority 1 & 2: Product / Variety + Status Badge */}
              <div className="p-4 border-b border-[var(--color-border-subtle)] bg-stone-50/70">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-bold text-base text-[var(--color-text-primary)] leading-snug truncate">
                      {item.cropName}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">
                      {item.variety}
                    </p>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    <ListingStatusBadge status={item.status} size="sm" />
                  </div>
                </div>
              </div>

              {/* Priority 3 to 6: Location, Harvest Date, Quantity, Reference Price */}
              <CardContent className="p-4 flex-1 space-y-3.5 text-sm">
                <div className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
                  {/* Priority 3: Location */}
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="line-clamp-2">
                      {item.locationText} <span className="text-[10px] text-emerald-700 font-semibold">(🛡️ Vị trí gần đúng)</span>
                    </span>
                  </div>

                  {/* Priority 4: Harvest Date */}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
                    <span>Dự kiến: <strong className="text-[var(--color-text-primary)]">{item.harvestDateText}</strong> (còn {item.daysUntilHarvest} ngày)</span>
                  </div>
                </div>

                {/* Priority 5: Quantity */}
                <div className="pt-2 border-t border-[var(--color-border-subtle)]">
                  <QuantityStatus
                    state="available"
                    remainingText={item.remainingQuantity}
                    compact
                  />
                </div>

                {/* Priority 6: Reference Price */}
                <div className="text-xs pt-0.5">
                  <span className="text-[var(--color-text-muted)]">Giá tham khảo: </span>
                  <span className="font-semibold text-[var(--color-brand-primary)]">Liên hệ / Thỏa thuận</span>
                </div>
              </CardContent>

              {/* Priority 7: Detail CTA */}
              <CardFooter className="p-3 bg-stone-50/50 border-t border-[var(--color-border-subtle)]">
                <Link to={`/marketplace/${item.id}`} className="w-full">
                  <Button variant="secondary" size="sm" className="w-full justify-center text-xs font-semibold">
                    Xem chi tiết lô này
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION D: AGRICULTURAL MAP PREVIEW (Placeholder for 10C.3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="p-6 sm:p-8 rounded-[var(--radius-lg,12px)] bg-stone-900 text-white border border-stone-800 shadow-[var(--shadow-subtle)] space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>Bản đồ nông sản Nam Bộ (Preview)</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Bản Đồ Nguồn Cung Vùng Nguyên Liệu
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Trực quan hóa vị trí các điểm nguồn cung nông sản theo tọa độ gần đúng cấp xã trên khắp Đông Nam Bộ và Đồng bằng sông Cửu Long, giúp bên mua lập hành trình thu mua tối ưu mà vẫn bảo vệ quyền riêng tư nhà vườn.
            </p>
          </div>

          {/* Map Preview Mock Container */}
          <div className="relative rounded-[var(--radius-md,8px)] border border-stone-700/80 bg-stone-950 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
              <div className="px-3.5 py-2 rounded-md bg-stone-900/90 border border-emerald-500/40 text-xs text-stone-200 text-left flex items-center justify-between">
                <span>📍 T. Đồng Tháp (Xã Mỹ Đức Tây)</span>
                <span className="text-emerald-400 font-semibold">5.0 tấn Sầu riêng</span>
              </div>
              <div className="px-3.5 py-2 rounded-md bg-stone-900/90 border border-emerald-500/40 text-xs text-stone-200 text-left flex items-center justify-between">
                <span>📍 T. Đồng Tháp (Xã An Hữu)</span>
                <span className="text-emerald-400 font-semibold">3.5 tấn Xoài cát</span>
              </div>
              <div className="px-3.5 py-2 rounded-md bg-stone-900/90 border border-emerald-500/40 text-xs text-stone-200 text-left flex items-center justify-between">
                <span>📍 T. Vĩnh Long (Xã Chợ Lách)</span>
                <span className="text-emerald-400 font-semibold">8.0 tấn Bưởi da xanh</span>
              </div>
              <div className="px-3.5 py-2 rounded-md bg-stone-900/90 border border-emerald-500/40 text-xs text-stone-200 text-left flex items-center justify-between">
                <span>📍 T. Vĩnh Long (Xã Chợ Lách)</span>
                <span className="text-emerald-400 font-semibold">12.0 tấn Mít ruột đỏ</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 max-w-lg">
              *Mọi tọa độ trên bản đồ công khai đều là vị trí gần đúng cấp xã. Tọa độ chính xác được giữ kín theo quy định bảo mật.
            </p>
            <div className="pt-1">
              <Link to="/marketplace">
                <Button variant="primary" size="md" className="font-semibold text-sm">
                  Mở Chợ & Bản đồ nông sản →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: TRUST & TRACEABILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="bg-white border border-[var(--color-border-default)] rounded-[var(--radius-lg,12px)] p-6 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)]">
              Minh Bạch & Trách Nhiệm Thông Tin Nông Sản
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Nguyên tắc trung thực làm nền tảng cho mọi thỏa thuận thu mua nông nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2.5 p-4 rounded-[var(--radius-md,8px)] bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)] font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Nhật ký canh tác điện tử</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Thông tin tưới nước, bón phân, xử lý và bao trái do chính nông hộ ghi chép thực tế tại vườn, có mốc thời gian và hình ảnh đối chiếu.
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-[var(--radius-md,8px)] bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)] font-semibold text-sm">
                <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Bảo vệ quyền riêng tư GPS</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Tọa độ chính xác vùng trồng được bảo vệ mặc định. Hai bên thỏa thuận vị trí giao nhận thực tế qua điện thoại/Zalo để đảm bảo an ninh nhà vườn.
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-[var(--radius-md,8px)] bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)] font-semibold text-sm">
                <Users2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Thỏa thuận thu mua minh bạch</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Thỏa thuận thu mua được hai bên xác nhận trên hệ thống nhằm ghi nhận kế hoạch giao dịch. Nền tảng không thay thế hợp đồng công chứng và không cam kết bao tiêu giá.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]">
            <span>Bạn muốn kiểm tra mẫu hồ sơ minh bạch của một lô nông sản?</span>
            <Link to="/trace/sample">
              <Button variant="ghost" size="sm" className="font-semibold text-xs">
                Xem thử Hồ sơ truy xuất nguồn gốc (T-04) →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
