import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  FileCheck2,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  Sprout,
} from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  Drawer,
  EmptyState,
  ListingStatusBadge,
  Pagination,
  QuantityStatus,
  Select,
} from '../../components/ui'
import {
  MOCK_HARVEST_LISTINGS,
} from '../../features/marketplace/mockData'
import type { ListingStatus } from '../../types/status'

const ITEMS_PER_PAGE = 8

export function MarketplacePage() {
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedHarvestWindow, setSelectedHarvestWindow] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState<ListingStatus | 'ALL'>('ALL')
  const [sortBy, setSortBy] = useState<'EARLIEST_HARVEST' | 'QUANTITY_DESC' | 'QUANTITY_ASC'>('EARLIEST_HARVEST')

  // Mobile Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)

  // Filter Logic
  const filteredListings = useMemo(() => {
    return MOCK_HARVEST_LISTINGS.filter((item) => {
      // Keyword filter
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase().trim()
        const matchName = item.cropName.toLowerCase().includes(query)
        const matchVariety = item.variety.toLowerCase().includes(query)
        const matchFarmer = item.farmerName.toLowerCase().includes(query)
        if (!matchName && !matchVariety && !matchFarmer) return false
      }

      // Province filter
      if (selectedProvince && item.provinceCode !== selectedProvince) {
        return false
      }

      // Harvest window filter
      if (selectedHarvestWindow === '15' && item.daysUntilHarvest > 15) return false
      if (selectedHarvestWindow === '30' && item.daysUntilHarvest > 30) return false
      if (selectedHarvestWindow === '45' && item.daysUntilHarvest > 45) return false

      // Status filter
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'EARLIEST_HARVEST') {
        return a.daysUntilHarvest - b.daysUntilHarvest
      }
      if (sortBy === 'QUANTITY_DESC') {
        return b.availableQuantityKg - a.availableQuantityKg
      }
      if (sortBy === 'QUANTITY_ASC') {
        return a.availableQuantityKg - b.availableQuantityKg
      }
      return 0
    })
  }, [searchKeyword, selectedProvince, selectedHarvestWindow, selectedStatus, sortBy])

  // Pagination Slice
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE) || 1
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredListings.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredListings, currentPage])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchKeyword.trim()) count++
    if (selectedProvince) count++
    if (selectedHarvestWindow !== 'ALL') count++
    if (selectedStatus !== 'ALL') count++
    return count
  }, [searchKeyword, selectedProvince, selectedHarvestWindow, selectedStatus])

  const handleResetFilters = () => {
    setSearchKeyword('')
    setSelectedProvince('')
    setSelectedHarvestWindow('ALL')
    setSelectedStatus('ALL')
    setCurrentPage(1)
  }

  return (
    <div className="bg-[var(--color-bg-page,#FAFAF7)] min-h-screen">
      {/* SECTION A: REFINED MARKETPLACE HEADER BAND */}
      <div className="bg-[#F5F7F4] border-b border-[var(--color-border-subtle)] py-6 sm:py-8">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumbs */}
          <nav aria-label="Đường dẫn điều hướng" className="text-xs text-stone-500 flex items-center gap-1.5">
            <Link to="/" className="hover:text-[var(--color-brand-primary)] hover:underline">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">Chợ nguồn cung</span>
          </nav>

          {/* Main header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              {/* Subtle agricultural/market accent badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300/80">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nguồn cung nông sản Nam Bộ trực tiếp từ vườn</span>
              </div>

              <h1 className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl text-[var(--color-text-primary)] tracking-tight leading-snug">
                Chợ Nguồn Cung Nông Sản Sắp Thu Hoạch
              </h1>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Khám phá và liên kết trực tiếp với nhà vườn Nam Bộ trước mùa thu hoạch 15–30 ngày. Minh bạch sản lượng, chủ động kế hoạch vận chuyển và tiêu thụ.
              </p>

              {/* Operational summary (static, no realtime implication) */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-600 pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" aria-hidden="true" />
                  Danh mục gồm <strong className="text-stone-900 font-bold">{MOCK_HARVEST_LISTINGS.length}</strong> nguồn cung nông sản mẫu
                </span>
                <span className="text-stone-300 hidden sm:inline" aria-hidden="true">•</span>
                <span className="text-stone-500">Khu vực Nam Bộ (Đông Nam Bộ & ĐBSCL)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* DESKTOP FILTER SIDEBAR (lg:col-span-3, compact density) */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 min-[1440px]:col-span-3 2xl:col-span-2.5 sticky top-24 space-y-4">
            <Card className="border-[var(--color-border-default)] shadow-xs bg-white">
              <div className="p-3.5 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--color-text-primary)]">
                    Bộ Lọc Nguồn Cung
                  </h2>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] font-medium text-[var(--color-brand-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Đặt lại ({activeFiltersCount})</span>
                  </button>
                )}
              </div>

              <CardContent className="p-3.5 space-y-3.5">
                {/* Filter 1: Search Keyword */}
                <div className="space-y-1">
                  <label htmlFor="desktop-search-input" className="text-[11px] font-semibold text-stone-700 block">
                    Từ khóa nông sản / nhà vườn
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="desktop-search-input"
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => {
                        setSearchKeyword(e.target.value)
                        setCurrentPage(1)
                      }}
                      placeholder="Sầu riêng, Xoài, Út Được..."
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-[var(--radius-md,8px)] border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Filter 2: Province */}
                <div className="space-y-1">
                  <label htmlFor="desktop-province-select" className="text-[11px] font-semibold text-stone-700 block">
                    Tỉnh / Thành phố (Nam Bộ)
                  </label>
                  <Select
                    id="desktop-province-select"
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full text-xs min-h-[34px]"
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

                {/* Filter 3: Harvest Window */}
                <div className="space-y-1">
                  <label htmlFor="desktop-harvest-window" className="text-[11px] font-semibold text-stone-700 block">
                    Thời điểm thu hoạch dự kiến
                  </label>
                  <Select
                    id="desktop-harvest-window"
                    value={selectedHarvestWindow}
                    onChange={(e) => {
                      setSelectedHarvestWindow(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full text-xs min-h-[34px]"
                  >
                    <option value="ALL">Tất cả khoảng thời gian</option>
                    <option value="15">Trong vòng 15 ngày tới</option>
                    <option value="30">Trong vòng 30 ngày tới</option>
                    <option value="45">Trong vòng 45 ngày tới</option>
                  </Select>
                </div>

                {/* Filter 4: Listing Status */}
                <div className="space-y-1">
                  <label htmlFor="desktop-status-filter" className="text-[11px] font-semibold text-stone-700 block">
                    Trạng thái nguồn cung
                  </label>
                  <Select
                    id="desktop-status-filter"
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value as ListingStatus | 'ALL')
                      setCurrentPage(1)
                    }}
                    className="w-full text-xs min-h-[34px]"
                  >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="AVAILABLE">Đang mở tiếp nhận</option>
                    <option value="PARTIALLY_COMMITTED">Đã cam kết một phần</option>
                    <option value="FULLY_COMMITTED">Đã chốt toàn bộ</option>
                  </Select>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="pt-1.5 border-t border-stone-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResetFilters}
                      className="w-full justify-center text-xs text-stone-600 hover:text-stone-900"
                      icon={<RotateCcw className="w-3 h-3" />}
                    >
                      Xóa tất cả bộ lọc
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* RESULTS AREA */}
          <main className="lg:col-span-9 xl:col-span-9 min-[1440px]:col-span-9 2xl:col-span-9.5 space-y-5">
            {/* Top Bar for Results: Mobile Filter Trigger + Result Counts + Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white px-3.5 sm:px-4 py-2.5 rounded-[var(--radius-md,8px)] border border-stone-200/90 shadow-xs">
              {/* Mobile Filter Button (visible < lg) + Result Count */}
              <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-md,8px)] border border-[var(--color-border-control)] bg-white text-xs font-semibold text-[var(--color-text-primary)] hover:bg-slate-50 cursor-pointer shrink-0"
                >
                  <Filter className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
                  <span>Bộ lọc {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </button>

                <span className="text-xs text-stone-600 font-medium truncate">
                  Tìm thấy <strong className="text-emerald-900 font-bold">{filteredListings.length}</strong> nguồn cung phù hợp
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <label htmlFor="sort-select" className="text-xs text-stone-500 shrink-0 font-medium">
                  Sắp xếp:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs py-1.5 pl-2.5 pr-7 rounded-[var(--radius-sm,4px)] border border-stone-300 bg-white text-stone-800 font-medium focus:border-[var(--color-brand-primary)] focus:outline-none cursor-pointer flex-1 sm:flex-none max-w-full"
                >
                  <option value="EARLIEST_HARVEST">Ngày thu hoạch gần nhất</option>
                  <option value="QUANTITY_DESC">Sản lượng: Nhiều đến ít</option>
                  <option value="QUANTITY_ASC">Sản lượng: Ít đến nhiều</option>
                </select>
              </div>
            </div>

            {/* LISTINGS GRID: 4 columns wide desktop (>=1440px), 3 columns normal desktop, 2 columns tablet, 1 column mobile */}
            {paginatedListings.length === 0 ? (
              <EmptyState
                title="Không tìm thấy nguồn cung phù hợp"
                description="Hãy thử thay đổi từ khóa hoặc đặt lại bộ lọc khu vực để tìm thấy thêm các nguồn nông sản sắp thu hoạch."
                action={
                  <Button variant="primary" size="sm" onClick={handleResetFilters} icon={<RotateCcw className="w-3.5 h-3.5" />}>
                    Đặt lại toàn bộ bộ lọc
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 wide:grid-cols-4 marketplace-grid-4col gap-3.5 xl:gap-4">
                {paginatedListings.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col h-full bg-white rounded-[var(--radius-md,8px)] border border-stone-200 hover:border-emerald-500/70 hover:shadow-xs transition-all overflow-hidden"
                  >
                    {/* Header: Code + Compact Status Badge + Product Title */}
                    <div className="p-3 sm:p-3.5 border-b border-stone-100 bg-stone-50/80">
                      {/* Top row: Code + Status Badge */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5 min-w-0">
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-stone-500 tracking-tight whitespace-nowrap shrink-0">
                          #{item.code}
                        </span>
                        <div className="shrink-0">
                          <ListingStatusBadge
                            status={item.status}
                            size="sm"
                            className="text-[10px] px-1.5 py-0.5 whitespace-nowrap"
                          />
                        </div>
                      </div>

                      {/* Main product title + Variety */}
                      <div>
                        <h3 className="font-heading font-bold text-sm sm:text-[15px] text-stone-900 leading-snug line-clamp-1 group-hover:text-[var(--color-brand-primary)] transition-colors">
                          {item.cropName}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-stone-600 line-clamp-1 mt-0.5" title={item.variety}>
                          {item.variety}
                        </p>
                      </div>
                    </div>

                    {/* Card Body: Metadata + Quantity + Price */}
                    <div className="p-3 sm:p-3.5 flex-1 space-y-2.5 text-xs">
                      {/* Location & Harvest Timing */}
                      <div className="space-y-1 text-stone-600">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="line-clamp-1 text-[11px] sm:text-xs text-stone-700">
                            {item.provinceName} • <span className="text-stone-500">{item.locationText.split(',')[0]}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                          <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                          <span className="truncate">
                            Thu hoạch: <strong className="text-stone-900 font-semibold">{item.harvestDateText}</strong>
                            <span className="text-stone-500 ml-1 text-[10px] sm:text-[11px]">(còn {item.daysUntilHarvest}d)</span>
                          </span>
                        </div>
                      </div>

                      {/* Quantity section */}
                      <div className="pt-2 border-t border-stone-100">
                        <QuantityStatus
                          state={item.quantityState}
                          remainingText={item.status === 'FULLY_COMMITTED' ? undefined : item.remainingQuantityText}
                          totalText={`Tổng: ${item.totalQuantityText}`}
                          compact
                        />
                      </div>

                      {/* Reference price & Trust badge */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-[10px] text-stone-400 block leading-tight">Giá tham khảo:</span>
                          <span className="font-semibold text-emerald-800 text-xs">
                            {item.referencePrice.replace('Giá tham khảo: ', '')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 block truncate max-w-[95px]" title={item.farmerName}>
                            {item.farmerName}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-medium">
                            <FileCheck2 className="w-2.5 h-2.5" />
                            <span>Nhật ký số</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Compact CTA (Desktop 32px, Mobile >= 44px touch target) */}
                    <div className="p-2.5 sm:p-3 bg-stone-50/50 border-t border-stone-100">
                      <Link to={`/marketplace/${item.id}`} className="block w-full">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-center text-xs font-semibold h-11 sm:h-8 min-h-[44px] sm:min-h-0 border-stone-300 text-stone-700 hover:text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50/50 transition-colors"
                        >
                          <span>Xem chi tiết</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-stone-400 group-hover:text-emerald-700" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Bộ Lọc Nguồn Cung"
        description="Lọc nguồn nông sản Nam Bộ sắp thu hoạch"
        position="right"
        size="md"
        footer={
          <div className="flex items-center gap-2 w-full">
            <Button
              variant="secondary"
              size="md"
              onClick={handleResetFilters}
              className="flex-1 justify-center text-xs"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Đặt lại
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsFilterDrawerOpen(false)}
              className="flex-1 justify-center text-xs"
            >
              Áp dụng ({filteredListings.length})
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs py-2">
          {/* Mobile Search */}
          <div className="space-y-1.5">
            <label htmlFor="mobile-search-input" className="font-semibold text-stone-700 block">
              Từ khóa nông sản / nhà vườn
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="mobile-search-input"
                type="text"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="vd: Sầu riêng, Xoài, Út Được..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-[var(--radius-md,8px)] border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Province */}
          <div className="space-y-1.5">
            <label htmlFor="mobile-province-select" className="font-semibold text-stone-700 block">
              Tỉnh / Thành phố (Nam Bộ)
            </label>
            <Select
              id="mobile-province-select"
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full text-xs min-h-[38px]"
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

          {/* Mobile Harvest Window */}
          <div className="space-y-1.5">
            <label htmlFor="mobile-harvest-window" className="font-semibold text-stone-700 block">
              Thời điểm thu hoạch dự kiến
            </label>
            <Select
              id="mobile-harvest-window"
              value={selectedHarvestWindow}
              onChange={(e) => {
                setSelectedHarvestWindow(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full text-xs min-h-[38px]"
            >
              <option value="ALL">Tất cả khoảng thời gian</option>
              <option value="15">Trong vòng 15 ngày tới</option>
              <option value="30">Trong vòng 30 ngày tới</option>
              <option value="45">Trong vòng 45 ngày tới</option>
            </Select>
          </div>

          {/* Mobile Status */}
          <div className="space-y-1.5">
            <label htmlFor="mobile-status-filter" className="font-semibold text-stone-700 block">
              Trạng thái nguồn cung
            </label>
            <Select
              id="mobile-status-filter"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as ListingStatus | 'ALL')
                setCurrentPage(1)
              }}
              className="w-full text-xs min-h-[38px]"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="AVAILABLE">Đang mở tiếp nhận</option>
              <option value="PARTIALLY_COMMITTED">Đã cam kết một phần</option>
              <option value="FULLY_COMMITTED">Đã chốt toàn bộ</option>
            </Select>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default MarketplacePage
