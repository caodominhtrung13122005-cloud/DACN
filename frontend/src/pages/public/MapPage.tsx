import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Compass,
  Filter,
  List,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  Drawer,
  EmptyState,
  ListingStatusBadge,
  Select,
} from '../../components/ui'
import {
  MOCK_HARVEST_LISTINGS,
  type HarvestListing,
} from '../../features/marketplace/mockData'
import { filterHarvestListings } from '../../features/marketplace/filterUtils'
import type { ListingStatus } from '../../types/status'

// Southern Vietnam default center & bounds
const SOUTHERN_VN_CENTER: [number, number] = [10.45, 106.35]
const DEFAULT_ZOOM = 8

export function MapPage() {
  // Filter States (Same parameters as Marketplace)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedHarvestWindow, setSelectedHarvestWindow] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState<ListingStatus | 'ALL'>('ALL')

  // Selection & UI States
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isListDrawerOpen, setIsListDrawerOpen] = useState(false)
  const [hasTileError, setHasTileError] = useState(false)

  // Leaflet Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map())
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Filtered dataset using pure shared logic
  const filteredListings = useMemo(() => {
    return filterHarvestListings(MOCK_HARVEST_LISTINGS, {
      searchKeyword,
      selectedProvince,
      selectedHarvestWindow,
      selectedStatus,
      sortBy: 'EARLIEST_HARVEST',
    })
  }, [searchKeyword, selectedProvince, selectedHarvestWindow, selectedStatus])

  // Split into mappable and unmappable records per BR-033b
  const mappableListings = useMemo(() => {
    return filteredListings.filter(
      (item): item is HarvestListing & { approximateCoordinates: [number, number] } =>
        Array.isArray(item.approximateCoordinates) && item.approximateCoordinates.length === 2
    )
  }, [filteredListings])

  const unmappableListings = useMemo(() => {
    return filteredListings.filter((item) => !item.approximateCoordinates)
  }, [filteredListings])

  const selectedListing = useMemo(() => {
    return filteredListings.find((item) => item.id === selectedListingId) || null
  }, [filteredListings, selectedListingId])

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
  }

  // Create custom Leaflet divIcon with MEKAGREEN brand aesthetics
  const createMarkerIcon = (listing: HarvestListing, isSelected: boolean) => {
    let pinBg = 'bg-[#2E7D32]' // Available: Primary Green
    if (listing.status === 'FULLY_COMMITTED') {
      pinBg = 'bg-[#D97706]' // Amber / Harvest
    } else if (listing.status === 'PARTIALLY_COMMITTED') {
      pinBg = 'bg-[#0284C7]' // Sky / Committed part
    }

    const ringEffect = isSelected
      ? 'ring-4 ring-[#F9A825] ring-offset-2 scale-125 z-[1000]'
      : 'hover:scale-110 shadow-md'

    const html = `
      <div class="relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${ringEffect}" style="width: 38px; height: 44px;">
        <div class="w-9 h-9 rounded-full ${pinBg} text-white flex items-center justify-center border-2 border-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 20h10"/>
            <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
          </svg>
        </div>
        <div class="w-2.5 h-2.5 bg-stone-800 rotate-45 -mt-1.5 border-r border-b border-stone-700 shadow-xs"></div>
      </div>
    `

    return L.divIcon({
      html,
      className: 'mekagreen-map-marker',
      iconSize: [38, 44],
      iconAnchor: [19, 42],
      popupAnchor: [0, -38],
    })
  }

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: SOUTHERN_VN_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 6,
      maxZoom: 16,
      zoomControl: false, // We use custom accessible controls
    })

    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    })

    let tileErrorCount = 0
    tileLayer.on('tileerror', () => {
      tileErrorCount++
      if (tileErrorCount >= 6) {
        setHasTileError(true)
      }
    })

    tileLayer.addTo(map)
    mapInstanceRef.current = map

    // Invalidate size once DOM is settled
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Handle selecting a listing from marker or list
  const handleSelectListing = (id: string) => {
    setSelectedListingId(id)

    const listing = filteredListings.find((item) => item.id === id)
    if (listing && listing.approximateCoordinates && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(listing.approximateCoordinates, {
        animate: true,
        duration: 0.6,
      })
    }

    // Scroll card into view on desktop
    const el = itemRefs.current.get(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const handleSelectListingRef = useRef(handleSelectListing)
  useEffect(() => {
    handleSelectListingRef.current = handleSelectListing
  })

  // Sync Markers when mappableListings change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear old markers
    markersMapRef.current.forEach((marker) => marker.remove())
    markersMapRef.current.clear()

    if (mappableListings.length === 0) {
      map.setView(SOUTHERN_VN_CENTER, DEFAULT_ZOOM)
      return
    }

    // Add new markers
    const bounds = L.latLngBounds([])

    mappableListings.forEach((listing) => {
      const coords = listing.approximateCoordinates
      bounds.extend(coords)

      const isSelected = listing.id === selectedListingId
      const icon = createMarkerIcon(listing, isSelected)

      const marker = L.marker(coords, {
        icon,
        title: `${listing.cropName} - ${listing.variety} (${listing.locationText})`,
        alt: `${listing.cropName} tại ${listing.locationText}`,
      }).addTo(map)

      marker.bindTooltip(
        `<div class="text-xs font-semibold px-1 py-0.5 text-stone-900">${listing.cropName} • ${listing.variety}</div><div class="text-[10px] text-emerald-800 font-medium">🛡️ Vị trí gần đúng</div>`,
        { direction: 'top', offset: [0, -40], opacity: 0.95 }
      )

      marker.on('click', () => {
        handleSelectListingRef.current(listing.id)
      })

      markersMapRef.current.set(listing.id, marker)
    })

    // Conservative fit bounds: avoid over-zooming
    if (mappableListings.length > 0) {
      map.fitBounds(bounds, {
        padding: [45, 45],
        maxZoom: 11,
      })
    }
  }, [mappableListings]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker icons when selectedListingId changes
  useEffect(() => {
    markersMapRef.current.forEach((marker, id) => {
      const listing = mappableListings.find((item) => item.id === id)
      if (listing) {
        const isSelected = id === selectedListingId
        marker.setIcon(createMarkerIcon(listing, isSelected))
        if (isSelected) {
          marker.setZIndexOffset(1000)
        } else {
          marker.setZIndexOffset(0)
        }
      }
    })
  }, [selectedListingId, mappableListings])

  // Reset to Southern Vietnam overview
  const handleResetView = () => {
    if (!mapInstanceRef.current) return
    if (mappableListings.length > 0) {
      const bounds = L.latLngBounds(
        mappableListings.map((item) => item.approximateCoordinates)
      )
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [45, 45],
        maxZoom: 11,
      })
    } else {
      mapInstanceRef.current.setView(SOUTHERN_VN_CENTER, DEFAULT_ZOOM)
    }
  }

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn()
  }

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut()
  }

  return (
    <div className="bg-[var(--color-bg-page,#FAFAF7)] min-h-[calc(100vh-64px)] flex flex-col text-[var(--color-text-primary)]">
      {/* SECTION 1: TOP CONTEXT & FILTER BAR */}
      <div className="bg-white border-b border-[var(--color-border-subtle)] py-4 sm:py-5 shadow-xs">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <nav aria-label="Breadcrumb" className="text-stone-500 flex items-center gap-1.5">
              <Link to="/" className="hover:text-[var(--color-brand-primary)] hover:underline">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-stone-900 font-semibold">Bản đồ nông sản</span>
            </nav>

            {/* GPS Privacy Rule Chip per BR-033b */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>Bảo vệ tọa độ GPS chính xác • Hiển thị vị trí gần đúng cấp xã</span>
            </div>
          </div>

          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--color-text-primary)] tracking-tight">
                Bản Đồ Nguồn Cung Nông Sản Nam Bộ
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
                Trực quan hóa vùng trồng trước thu hoạch 15–30 ngày. Kết nối trực tiếp giữa thương lái và nhà vườn.
              </p>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsFilterDrawerOpen(true)}
                icon={<Filter className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Bộ lọc {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsListDrawerOpen(true)}
                icon={<List className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Danh sách ({filteredListings.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tile loading warning banner (if OSM tile error occurs, dismissible) */}
      {hasTileError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Một số lát gạch bản đồ OpenStreetMap tải chậm. Mọi dữ liệu nguồn cung vẫn hiển thị đầy đủ và chính xác trong danh sách.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHasTileError(false)}
            aria-label="Đóng thông báo tải bản đồ"
            className="p-1 text-amber-700 hover:bg-amber-100 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SECTION 2: MAIN WORKSPACE (Desktop Split / Mobile Stack) */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 w-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
          
          {/* DESKTOP LEFT COLUMN: FILTERS & SCROLLABLE SOURCE LIST (lg:col-span-4 xl:col-span-4 2xl:col-span-3.5) */}
          <aside className="hidden lg:flex flex-col lg:col-span-5 xl:col-span-4 2xl:col-span-3.5 space-y-4 max-h-[calc(100vh-210px)]">
            
            {/* Desktop Filters Card */}
            <Card className="border-[var(--color-border-default)] shadow-xs bg-white shrink-0">
              <div className="p-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-900">
                    Bộ Lọc Bản Đồ
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

              <CardContent className="p-3 space-y-2.5">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm sầu riêng, xoài, nhà vườn..."
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-[var(--radius-md,8px)] border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Province */}
                  <div>
                    <label htmlFor="desktop-province" className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                      Tỉnh / Thành
                    </label>
                    <Select
                      id="desktop-province"
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full text-xs min-h-[32px] py-1"
                    >
                      <option value="">Tất cả</option>
                      <option value="DT">Đồng Tháp</option>
                      <option value="VL">Vĩnh Long</option>
                      <option value="DN">Đồng Nai</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                      <option value="TN">Tây Ninh</option>
                      <option value="CT">Cần Thơ</option>
                      <option value="AG">An Giang</option>
                      <option value="CM">Cà Mau</option>
                    </Select>
                  </div>

                  {/* Harvest Window */}
                  <div>
                    <label htmlFor="desktop-window" className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                      Thời điểm thu hoạch
                    </label>
                    <Select
                      id="desktop-window"
                      value={selectedHarvestWindow}
                      onChange={(e) => setSelectedHarvestWindow(e.target.value)}
                      className="w-full text-xs min-h-[32px] py-1"
                    >
                      <option value="ALL">Tất cả thời gian</option>
                      <option value="15">Trong 15 ngày</option>
                      <option value="30">Trong 30 ngày</option>
                      <option value="45">Trong 45 ngày</option>
                    </Select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="desktop-status" className="text-[10px] font-semibold text-stone-600 block mb-0.5">
                    Trạng thái nguồn cung
                  </label>
                  <Select
                    id="desktop-status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as ListingStatus | 'ALL')}
                    className="w-full text-xs min-h-[32px] py-1"
                  >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="AVAILABLE">Đang mở tiếp nhận</option>
                    <option value="PARTIALLY_COMMITTED">Đã cam kết một phần</option>
                    <option value="FULLY_COMMITTED">Đã cam kết 100%</option>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* List Header Count */}
            <div className="flex items-center justify-between px-1 text-xs text-stone-600 shrink-0">
              <span className="font-medium">
                Tìm thấy <strong className="text-stone-900">{filteredListings.length}</strong> nguồn cung
              </span>
              <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {mappableListings.length} điểm ghim trên bản đồ
              </span>
            </div>

            {/* Scrollable Listings List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 focus:outline-none">
              {filteredListings.length === 0 ? (
                <Card className="border-[var(--color-border-default)] p-6 bg-white">
                  <EmptyState
                    title="Không có nguồn cung phù hợp"
                    description="Thử thay đổi từ khóa hoặc bộ lọc để hiển thị kết quả."
                    action={
                      <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                        Xóa tất cả bộ lọc
                      </Button>
                    }
                  />
                </Card>
              ) : (
                filteredListings.map((item) => {
                  const isSelected = item.id === selectedListingId
                  const isMappable = Boolean(item.approximateCoordinates)

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        if (el) itemRefs.current.set(item.id, el)
                      }}
                      onClick={() => handleSelectListing(item.id)}
                      className={`p-3 rounded-[var(--radius-md,8px)] border transition-all cursor-pointer bg-white ${
                        isSelected
                          ? 'border-[var(--color-brand-primary)] ring-2 ring-emerald-500/30 bg-emerald-50/40 shadow-xs'
                          : 'border-[var(--color-border-default)] hover:border-emerald-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="font-heading font-bold text-sm text-[var(--color-text-primary)] leading-tight">
                            {item.cropName}
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-1">{item.variety}</p>
                        </div>
                        <ListingStatusBadge status={item.status} />
                      </div>

                      <div className="space-y-1 text-xs text-stone-600 mb-2">
                        <div className="flex items-center gap-1.5 text-stone-700">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                          <span className="line-clamp-1">{item.locationText}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                          <Calendar className="w-3 h-3 text-stone-400 shrink-0" aria-hidden="true" />
                          <span>Thu hoạch: <strong>{item.harvestDateText}</strong> (còn {item.daysUntilHarvest}d)</span>
                        </div>
                      </div>

                      {/* Locality badge & map pin status */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-emerald-800">
                          {item.remainingQuantityText}
                        </span>

                        {isMappable ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Vị trí gần đúng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                            Không ghim (bảo mật GPS)
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Unmappable note per BR-033b */}
            {unmappableListings.length > 0 && (
              <div className="p-2.5 rounded-[var(--radius-sm,4px)] bg-stone-100/90 border border-stone-200 text-[11px] text-stone-600 shrink-0 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  Có <strong>{unmappableListings.length}</strong> bài đăng chưa có tọa độ công khai (chỉ hiển thị vị trí hành chính dạng chữ, không ghim điểm giả mạo).
                </span>
              </div>
            )}
          </aside>

          {/* RIGHT COLUMN: INTERACTIVE LEAFLET MAP (lg:col-span-7 xl:col-span-8 2xl:col-span-8.5) */}
          <section
            aria-label="Bản đồ tương tác nguồn cung nông sản"
            className="lg:col-span-7 xl:col-span-8 2xl:col-span-8.5 flex flex-col relative h-[520px] sm:h-[620px] lg:h-[calc(100vh-210px)] min-h-[480px] rounded-[var(--radius-lg,12px)] overflow-hidden border border-[var(--color-border-default)] shadow-xs bg-stone-100"
          >
            {/* The Actual Leaflet Map Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-full z-10"
              style={{ minHeight: '100%' }}
            />

            {/* Floating Top Control Bar (Legend & Reset View) */}
            <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetView}
                icon={<Compass className="w-3.5 h-3.5 text-emerald-700" />}
                className="bg-white/95 backdrop-blur-xs text-xs font-semibold shadow-sm border-stone-300 text-stone-800 hover:bg-white h-8"
              >
                Góc nhìn Nam Bộ
              </Button>

              {/* Map Legend */}
              <div className="hidden sm:inline-flex items-center gap-3 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-[var(--radius-md,8px)] border border-stone-300 text-[11px] font-medium text-stone-700 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                  <span>Mở tiếp nhận</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                  <span>Cam kết 1 phần</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                  <span>Chốt 100%</span>
                </div>
              </div>
            </div>

            {/* Floating Custom Zoom Controls (Top Right, safe from mobile preview card) */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Phóng to bản đồ"
                className="w-8 h-8 rounded-[var(--radius-sm,4px)] bg-white text-stone-800 shadow-sm border border-stone-300 flex items-center justify-center hover:bg-stone-50 active:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Thu nhỏ bản đồ"
                className="w-8 h-8 rounded-[var(--radius-sm,4px)] bg-white text-stone-800 shadow-sm border border-stone-300 flex items-center justify-center hover:bg-stone-50 active:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Zero Results Overlay Notice on Map */}
            {filteredListings.length === 0 && (
              <div className="absolute inset-0 z-25 bg-white/70 backdrop-blur-xs flex items-center justify-center p-4">
                <Card className="max-w-md p-6 text-center border-stone-300 shadow-md bg-white">
                  <EmptyState
                    title="Không có điểm ghim phù hợp"
                    description="Hiện không có nguồn cung nào phù hợp với bộ lọc đã chọn. Bạn có thể xóa bộ lọc để xem toàn bộ nguồn cung Nam Bộ."
                    action={
                      <Button variant="primary" size="sm" onClick={handleResetFilters}>
                        Xóa tất cả bộ lọc
                      </Button>
                    }
                  />
                </Card>
              </div>
            )}

            {/* Floating Selected Listing Preview Card (Desktop & Mobile) */}
            {selectedListing && (
              <div
                className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:bottom-3 sm:max-w-sm z-30 pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <Card className="border-[var(--color-brand-primary)] shadow-lg bg-white overflow-hidden">
                  <div className="p-3.5 space-y-2.5">
                    {/* Top Row: Title, status & close */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-heading font-extrabold text-sm sm:text-base text-stone-900 leading-tight">
                            {selectedListing.cropName}
                          </h3>
                          <span className="text-xs text-stone-500 font-medium">• {selectedListing.variety}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          {selectedListing.farmerName} ({selectedListing.farmerTypeText})
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <ListingStatusBadge status={selectedListing.status} />
                        <button
                          type="button"
                          onClick={() => setSelectedListingId(null)}
                          aria-label="Đóng bảng xem trước"
                          className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-1 border-y border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Sản lượng khả dụng:</span>
                        <span className="font-bold text-emerald-800 text-xs">
                          {selectedListing.remainingQuantityText}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Dự kiến thu hoạch:</span>
                        <span className="font-semibold text-stone-800 text-xs">
                          {selectedListing.harvestDateText} (còn {selectedListing.daysUntilHarvest} ngày)
                        </span>
                      </div>
                    </div>

                    {/* Locality with approximate GPS disclosure */}
                    <div className="flex items-start gap-1.5 text-xs text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="line-clamp-1">{selectedListing.locationText}</span>
                        {selectedListing.approximateCoordinates ? (
                          <span className="text-[10px] text-emerald-800 font-semibold inline-flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-700" />
                            Vị trí gần đúng (Bảo mật GPS chính xác theo BR-033b)
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-600 font-semibold inline-flex items-center gap-1 bg-stone-100 px-1.5 py-0.5 rounded mt-0.5">
                            <ShieldCheck className="w-3 h-3 text-stone-500" />
                            Chưa có tọa độ công khai (Bảo mật GPS chính xác theo BR-033b)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button Link to Marketplace Detail */}
                    <div className="pt-1">
                      <Link to={`/marketplace/${selectedListing.id}`} className="block">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<ArrowRight className="w-4 h-4" />}
                          className="w-full justify-center min-h-[40px] text-xs font-semibold"
                        >
                          Xem chi tiết nguồn cung
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE DRAWER 1: FILTER DRAWER */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Bộ lọc Bản đồ nông sản"
        position="right"
        size="sm"
      >
        <div className="flex flex-col gap-4 py-2">
          {/* Keyword Search */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Từ khóa nông sản / nhà vườn</label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Sầu riêng, Xoài, Út Được..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-[var(--radius-md,8px)] border border-stone-300 text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Province */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Tỉnh / Thành phố (Nam Bộ)</label>
            <Select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full text-sm min-h-[40px]"
            >
              <option value="">Tất cả Tỉnh / Thành phố</option>
              <option value="DT">Đồng Tháp</option>
              <option value="VL">Vĩnh Long</option>
              <option value="DN">Đồng Nai</option>
              <option value="HCM">TP. Hồ Chí Minh</option>
              <option value="TN">Tây Ninh</option>
              <option value="CT">Cần Thơ</option>
              <option value="AG">An Giang</option>
              <option value="CM">Cà Mau</option>
            </Select>
          </div>

          {/* Harvest Window */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Thời điểm thu hoạch dự kiến</label>
            <Select
              value={selectedHarvestWindow}
              onChange={(e) => setSelectedHarvestWindow(e.target.value)}
              className="w-full text-sm min-h-[40px]"
            >
              <option value="ALL">Tất cả khoảng thời gian</option>
              <option value="15">Trong vòng 15 ngày tới</option>
              <option value="30">Trong vòng 30 ngày tới</option>
              <option value="45">Trong vòng 45 ngày tới</option>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Trạng thái nguồn cung</label>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ListingStatus | 'ALL')}
              className="w-full text-sm min-h-[40px]"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="AVAILABLE">Đang mở tiếp nhận</option>
              <option value="PARTIALLY_COMMITTED">Đã cam kết một phần</option>
              <option value="FULLY_COMMITTED">Đã cam kết 100%</option>
            </Select>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleResetFilters}
              className="w-1/2 justify-center"
            >
              Đặt lại
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-1/2 justify-center"
            >
              Áp dụng ({filteredListings.length})
            </Button>
          </div>
        </div>
      </Drawer>

      {/* MOBILE DRAWER 2: SOURCE LIST DRAWER */}
      <Drawer
        isOpen={isListDrawerOpen}
        onClose={() => setIsListDrawerOpen(false)}
        title={`Danh sách nguồn cung (${filteredListings.length})`}
        position="right"
        size="md"
      >
        <div className="flex flex-col gap-3 py-2">
          <p className="text-xs text-stone-500">
            Chạm vào nguồn cung để phóng to vị trí gần đúng trên bản đồ:
          </p>

          <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {filteredListings.length === 0 ? (
              <EmptyState
                title="Không có nguồn cung phù hợp"
                description="Thử thay đổi bộ lọc để hiển thị kết quả."
              />
            ) : (
              filteredListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleSelectListing(item.id)
                    setIsListDrawerOpen(false)
                  }}
                  className={`p-3 rounded-[var(--radius-md,8px)] border transition-all cursor-pointer bg-white ${
                    selectedListingId === item.id
                      ? 'border-[var(--color-brand-primary)] bg-emerald-50/50'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-heading font-bold text-sm text-stone-900">{item.cropName}</h4>
                    <ListingStatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-1">{item.variety}</p>
                  <p className="text-xs text-stone-500 mt-1">📍 {item.locationText}</p>
                  <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800">{item.remainingQuantityText}</span>
                    <span className="text-[11px] text-stone-500">Thu hoạch: {item.harvestDateText}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default MapPage
