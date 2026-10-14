import type { ListingStatus, QuantityDisplayState } from '../../types/status'

export interface FarmingLogEntry {
  date: string
  title: string
  description: string
}

export interface HarvestListing {
  id: string
  code: string
  cropName: string
  variety: string
  category: string
  status: ListingStatus
  quantityState: QuantityDisplayState
  
  // Quantities
  totalQuantityKg: number
  committedQuantityKg: number
  softReserveQuantityKg: number
  availableQuantityKg: number
  totalQuantityText: string
  committedQuantityText: string
  remainingQuantityText: string
  
  // Harvest Timeline
  expectedHarvestDate: string
  harvestDateText: string
  harvestWindowDays: number
  daysUntilHarvest: number
  packagingSpec: string
  
  // Location
  provinceCode: string
  provinceName: string
  locationText: string
  approximateCoordinates?: [number, number] | null
  areaHa: number
  season: string
  areaName: string
  productionUnitCode: string
  
  // Farmer / Cooperative Profile
  farmerName: string
  farmerType: 'INDIVIDUAL' | 'COOPERATIVE'
  farmerTypeText: string
  contactPerson: string
  phoneDisplay: string
  phoneHidden: string
  zaloPhone: string
  
  // Price
  referencePrice: string
  
  // Farming Standards & Logs
  farmingStandard: string
  farmingLogs: FarmingLogEntry[]
}

export const MOCK_HARVEST_LISTINGS: HarvestListing[] = [
  {
    id: 'SPL-2026-001',
    code: 'HL-2026-001',
    cropName: 'Sầu riêng',
    variety: 'Ri6 cơm vàng hạt lép',
    category: 'Trái cây',
    status: 'AVAILABLE',
    quantityState: 'available',
    totalQuantityKg: 10000,
    committedQuantityKg: 5000,
    softReserveQuantityKg: 0,
    availableQuantityKg: 5000,
    totalQuantityText: '10.0 tấn',
    committedQuantityText: '5.0 tấn',
    remainingQuantityText: 'Còn lại: 5.0 tấn (50%)',
    expectedHarvestDate: '2026-10-25',
    harvestDateText: '25/10/2026',
    harvestWindowDays: 7,
    daysUntilHarvest: 17,
    packagingSpec: 'Thùng carton 18kg / Sọt tre chuyên dụng lót rơm',
    provinceCode: 'DT',
    provinceName: 'Đồng Tháp',
    locationText: 'Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Cái Bè, Tiền Giang cũ)',
    approximateCoordinates: [10.4285, 105.9520],
    areaHa: 1.8,
    season: 'Vụ mùa 2026',
    areaName: 'Vùng chuyên canh sầu riêng Mỹ Đức Tây',
    productionUnitCode: 'MDT-SR-01 (Khai báo nội bộ)',
    farmerName: 'Nhà vườn Út Được',
    farmerType: 'INDIVIDUAL',
    farmerTypeText: 'Nông hộ cá thể (FARMER)',
    contactPerson: 'Nguyễn Văn Được',
    phoneDisplay: '0901 234 567',
    phoneHidden: '0901 *** ***',
    zaloPhone: '0901234567',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Quy trình an toàn / VietGAP nội bộ',
    farmingLogs: [
      {
        date: '15/09/2026',
        title: 'Bao trái chống ruồi đục quả',
        description: 'Tiến hành bao trái toàn bộ cây đạt đường kính 12–15cm bằng túi chuyên dụng 2 lớp.',
      },
      {
        date: '02/08/2026',
        title: 'Bón phân hữu cơ vi sinh đợt 3',
        description: 'Bón 5kg/gốc phân hữu cơ hoai mục kết hợp nấm Trichoderma phòng nấm rễ.',
      },
      {
        date: '20/06/2026',
        title: 'Tỉa cành, tỉa bớt hoa',
        description: 'Cắt tỉa cành tăm, giữ lại cuống hoa khỏe mạnh giữa thân để tập trung nuôi trái.',
      },
    ],
  },
  {
    id: 'SPL-2026-002',
    code: 'HL-2026-002',
    cropName: 'Xoài cát',
    variety: 'Xoài cát Hòa Lộc xuất khẩu',
    category: 'Trái cây',
    status: 'PARTIALLY_COMMITTED',
    quantityState: 'partially_committed',
    totalQuantityKg: 5000,
    committedQuantityKg: 1500,
    softReserveQuantityKg: 0,
    availableQuantityKg: 3500,
    totalQuantityText: '5.0 tấn',
    committedQuantityText: '1.5 tấn',
    remainingQuantityText: 'Còn lại: 3.5 tấn (70%)',
    expectedHarvestDate: '2026-11-10',
    harvestDateText: '10/11/2026',
    harvestWindowDays: 6,
    daysUntilHarvest: 33,
    packagingSpec: 'Thùng carton định lượng 10kg có lót xốp lưới từng trái',
    provinceCode: 'DT',
    provinceName: 'Đồng Tháp',
    locationText: 'Xã An Hữu, Tỉnh Đồng Tháp (Hòa Hưng / Cái Bè cũ)',
    approximateCoordinates: [10.3850, 105.8980],
    areaHa: 2.5,
    season: 'Vụ mùa 2026',
    areaName: 'Vùng trồng xoài cát xuất khẩu An Hữu',
    productionUnitCode: 'AH-XC-02 (Khai báo nội bộ)',
    farmerName: 'HTX Nông nghiệp Xanh',
    farmerType: 'COOPERATIVE',
    farmerTypeText: 'Hợp tác xã nông nghiệp (FARMER)',
    contactPerson: 'Trần Minh Tuấn (Giám đốc HTX)',
    phoneDisplay: '0918 765 432',
    phoneHidden: '0918 *** ***',
    zaloPhone: '0918765432',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Canh tác theo hướng VietGAP có chứng nhận xã viên',
    farmingLogs: [
      {
        date: '25/09/2026',
        title: 'Bao trái bảo vệ vỏ xoài',
        description: 'Bao trái bằng bao vàng 2 lớp chống rám nắng và rệp sáp, đảm bảo vỏ trái sáng đẹp.',
      },
      {
        date: '10/08/2026',
        title: 'Tưới giữ ẩm gốc mùa nắng',
        description: 'Vận hành hệ thống tưới phun sương tiết kiệm nước định kỳ 2 ngày/lần.',
      },
      {
        date: '05/07/2026',
        title: 'Bón bổ sung Kali hữu cơ',
        description: 'Bón bổ sung Kali hữu cơ qua lá để nâng cao độ ngọt và hương thơm đặc trưng.',
      },
    ],
  },
  {
    id: 'SPL-2026-003',
    code: 'HL-2026-003',
    cropName: 'Bưởi da xanh',
    variety: 'Bưởi da xanh ruột hồng',
    category: 'Cây có múi',
    status: 'AVAILABLE',
    quantityState: 'available',
    totalQuantityKg: 10000,
    committedQuantityKg: 2000,
    softReserveQuantityKg: 0,
    availableQuantityKg: 8000,
    totalQuantityText: '10.0 tấn',
    committedQuantityText: '2.0 tấn',
    remainingQuantityText: 'Còn lại: 8.0 tấn (80%)',
    expectedHarvestDate: '2026-11-05',
    harvestDateText: '05/11/2026',
    harvestWindowDays: 10,
    daysUntilHarvest: 28,
    packagingSpec: 'Sọt nhựa 30kg hoặc quấn màng bảo vệ từng trái',
    provinceCode: 'VL',
    provinceName: 'Vĩnh Long',
    locationText: 'Xã Chợ Lách, Tỉnh Vĩnh Long (Bến Tre cũ)',
    approximateCoordinates: [10.2520, 106.1480],
    areaHa: 3.0,
    season: 'Vụ mùa 2026',
    areaName: 'Vựa bưởi da xanh Chợ Lách ven sông Cổ Chiên',
    productionUnitCode: 'CL-BDX-03 (Khai báo nội bộ)',
    farmerName: 'HTX Bưởi Da Xanh Chợ Lách',
    farmerType: 'COOPERATIVE',
    farmerTypeText: 'Hợp tác xã nông nghiệp (FARMER)',
    contactPerson: 'Lê Hoàng Phong',
    phoneDisplay: '0939 123 890',
    phoneHidden: '0939 *** ***',
    zaloPhone: '0939123890',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Canh tác sinh học an toàn',
    farmingLogs: [
      {
        date: '28/09/2026',
        title: 'Kiểm tra độ đường và vỏ bưởi',
        description: 'Kiểm tra mẫu vỏ bưởi đạt chuẩn màu xanh bóng, tép bưởi mọng nước không the.',
      },
      {
        date: '15/08/2026',
        title: 'Bón phân hữu cơ khoáng',
        description: 'Bón phân hữu cơ giàu đạm cá ủ men sinh học quanh tán cây.',
      },
      {
        date: '10/06/2026',
        title: 'Phun phòng trừ nhện đỏ vi sinh',
        description: 'Dùng dầu khoáng sinh học xịt phòng bọ trĩ và nhện đỏ trong giai đoạn trái non.',
      },
    ],
  },
  {
    id: 'SPL-2026-004',
    code: 'HL-2026-004',
    cropName: 'Mít ruột đỏ',
    variety: 'Mít ruột đỏ Indo mọng nước',
    category: 'Trái cây',
    status: 'AVAILABLE',
    quantityState: 'available',
    totalQuantityKg: 12000,
    committedQuantityKg: 0,
    softReserveQuantityKg: 0,
    availableQuantityKg: 12000,
    totalQuantityText: '12.0 tấn',
    committedQuantityText: '0.0 tấn',
    remainingQuantityText: 'Còn lại: 12.0 tấn (100%)',
    expectedHarvestDate: '2026-11-15',
    harvestDateText: '15/11/2026',
    harvestWindowDays: 8,
    daysUntilHarvest: 38,
    packagingSpec: 'Cắt cuống dán keo, xếp xe tải lót rơm theo quy cách thương lái',
    provinceCode: 'VL',
    provinceName: 'Vĩnh Long',
    locationText: 'Xã Chợ Lách, Tỉnh Vĩnh Long (Bến Tre cũ)',
    approximateCoordinates: null,
    areaHa: 2.2,
    season: 'Vụ mùa 2026',
    areaName: 'Vườn mít giống mới Chợ Lách',
    productionUnitCode: '',
    farmerName: 'HTX Nông nghiệp Chợ Lách',
    farmerType: 'COOPERATIVE',
    farmerTypeText: 'Hợp tác xã nông nghiệp (FARMER)',
    contactPerson: 'Võ Văn Hùng',
    phoneDisplay: '0977 445 678',
    phoneHidden: '0977 *** ***',
    zaloPhone: '0977445678',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Quy trình phòng trừ sinh học an toàn',
    farmingLogs: [
      {
        date: '02/10/2026',
        title: 'Đo kiểm độ phát triển múi mít',
        description: 'Trái đạt trọng lượng trung bình 9–12kg/trái, gai nở đều chuẩn bị cắt trái.',
      },
      {
        date: '20/08/2026',
        title: 'Bọc lưới chống sâu đục thân',
        description: 'Bọc lưới mùng cước từng trái từ lúc đường kính đạt 20cm.',
      },
    ],
  },
  {
    id: 'SPL-2026-005',
    code: 'HL-2026-005',
    cropName: 'Cam sành',
    variety: 'Cam sành Tam Bình mọng nước',
    category: 'Cây có múi',
    status: 'PARTIALLY_COMMITTED',
    quantityState: 'partially_committed',
    totalQuantityKg: 15000,
    committedQuantityKg: 10500,
    softReserveQuantityKg: 0,
    availableQuantityKg: 4500,
    totalQuantityText: '15.0 tấn',
    committedQuantityText: '10.5 tấn',
    remainingQuantityText: 'Còn lại: 4.5 tấn (30%)',
    expectedHarvestDate: '2026-10-28',
    harvestDateText: '28/10/2026',
    harvestWindowDays: 5,
    daysUntilHarvest: 20,
    packagingSpec: 'Sọt tre lót lá chuối 50kg/sọt vận chuyển trong ngày',
    provinceCode: 'VL',
    provinceName: 'Vĩnh Long',
    locationText: 'Xã Chợ Lách, Tỉnh Vĩnh Long',
    approximateCoordinates: [10.2680, 106.1200],
    areaHa: 2.0,
    season: 'Vụ mùa 2026',
    areaName: 'Vùng cam sành ngọt đất bãi bồi Vĩnh Long',
    productionUnitCode: 'TB-CS-05 (Khai báo nội bộ)',
    farmerName: 'Nhà vườn Bảy Thắng',
    farmerType: 'INDIVIDUAL',
    farmerTypeText: 'Nông hộ cá thể (FARMER)',
    contactPerson: 'Nguyễn Văn Thắng',
    phoneDisplay: '0913 889 001',
    phoneHidden: '0913 *** ***',
    zaloPhone: '0913889001',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Canh tác an toàn hạn chế thuốc BVTV',
    farmingLogs: [
      {
        date: '28/09/2026',
        title: 'Ngưng phun xịt phân bón lá',
        description: 'Bước vào thời gian cách ly tuyệt đối 30 ngày trước ngày thu hoạch.',
      },
      {
        date: '10/08/2026',
        title: 'Tưới nước điều tiết độ ngọt',
        description: 'Xiết nước nhẹ trong mương vườn để kích thích trái lên màu vỏ và đọng đường.',
      },
    ],
  },
  {
    id: 'SPL-2026-006',
    code: 'HL-2026-006',
    cropName: 'Thanh long',
    variety: 'Thanh long ruột đỏ ngọt thanh',
    category: 'Trái cây',
    status: 'AVAILABLE',
    quantityState: 'available',
    totalQuantityKg: 8000,
    committedQuantityKg: 2000,
    softReserveQuantityKg: 0,
    availableQuantityKg: 6000,
    totalQuantityText: '8.0 tấn',
    committedQuantityText: '2.0 tấn',
    remainingQuantityText: 'Còn lại: 6.0 tấn (75%)',
    expectedHarvestDate: '2026-11-02',
    harvestDateText: '02/11/2026',
    harvestWindowDays: 4,
    daysUntilHarvest: 25,
    packagingSpec: 'Thùng carton 9kg chuyên dùng đóng hàng xuất khẩu',
    provinceCode: 'DT',
    provinceName: 'Đồng Tháp',
    locationText: 'Xã Mỹ Đức Tây, Tỉnh Đồng Tháp',
    approximateCoordinates: [10.4420, 105.9680],
    areaHa: 1.5,
    season: 'Vụ mùa 2026',
    areaName: 'Vườn thanh long đèn Mỹ Đức Tây',
    productionUnitCode: 'MDT-TL-06 (Khai báo nội bộ)',
    farmerName: 'Vườn Thanh Long Chú Tư',
    farmerType: 'INDIVIDUAL',
    farmerTypeText: 'Nông hộ cá thể (FARMER)',
    contactPerson: 'Huỳnh Văn Tư',
    phoneDisplay: '0908 654 321',
    phoneHidden: '0908 *** ***',
    zaloPhone: '0908654321',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Canh tác an toàn vi sinh',
    farmingLogs: [
      {
        date: '25/09/2026',
        title: 'Tỉa tai thanh long và vệ sinh cành',
        description: 'Tỉa tai cành tạo độ thoáng giúp vỏ quả đỏ tươi tự nhiên.',
      },
      {
        date: '01/09/2026',
        title: 'Bón phân trùn quế gốc',
        description: 'Bón lót phân trùn quế hữu cơ cải tạo độ phì nhiêu đất mặt.',
      },
    ],
  },
  {
    id: 'SPL-2026-007',
    code: 'HL-2026-007',
    cropName: 'Nhãn Xuồng',
    variety: 'Nhãn Xuồng cơm vàng hạt tiêu',
    category: 'Trái cây',
    status: 'FULLY_COMMITTED',
    quantityState: 'fully_committed',
    totalQuantityKg: 6000,
    committedQuantityKg: 6000,
    softReserveQuantityKg: 0,
    availableQuantityKg: 0,
    totalQuantityText: '6.0 tấn',
    committedQuantityText: '6.0 tấn',
    remainingQuantityText: 'Đã chốt toàn bộ sản lượng',
    expectedHarvestDate: '2026-10-20',
    harvestDateText: '20/10/2026',
    harvestWindowDays: 5,
    daysUntilHarvest: 12,
    packagingSpec: 'Rổ nhựa 20kg lót lá nhãn bảo vệ cuống trái',
    provinceCode: 'DN',
    provinceName: 'Đồng Nai',
    locationText: 'Xã Long Phước, Tỉnh Đồng Nai',
    approximateCoordinates: [10.6650, 107.0150],
    areaHa: 2.0,
    season: 'Vụ mùa 2026',
    areaName: 'Vùng nhãn xuồng thổ nhưỡng đất đỏ Đồng Nai',
    productionUnitCode: 'LP-NX-07 (Khai báo nội bộ)',
    farmerName: 'HTX Nông nghiệp Đồng Nai',
    farmerType: 'COOPERATIVE',
    farmerTypeText: 'Hợp tác xã nông nghiệp (FARMER)',
    contactPerson: 'Đặng Quốc Bảo',
    phoneDisplay: '0982 112 233',
    phoneHidden: '0982 *** ***',
    zaloPhone: '0982112233',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Tiêu chuẩn nông sản an toàn Đồng Nai',
    farmingLogs: [
      {
        date: '10/09/2026',
        title: 'Chốt toàn bộ sản lượng theo thỏa thuận',
        description: 'Đã hoàn tất xác nhận thỏa thuận thu mua toàn bộ 6 tấn cho đơn vị bao tiêu.',
      },
    ],
  },
  {
    id: 'SPL-2026-008',
    code: 'HL-2026-008',
    cropName: 'Chuối già Nam Mỹ',
    variety: 'Chuối cấy mô xuất khẩu buồng đều',
    category: 'Trái cây',
    status: 'AVAILABLE',
    quantityState: 'available',
    totalQuantityKg: 20000,
    committedQuantityKg: 5000,
    softReserveQuantityKg: 0,
    availableQuantityKg: 15000,
    totalQuantityText: '20.0 tấn',
    committedQuantityText: '5.0 tấn',
    remainingQuantityText: 'Còn lại: 15.0 tấn (75%)',
    expectedHarvestDate: '2026-11-18',
    harvestDateText: '18/11/2026',
    harvestWindowDays: 12,
    daysUntilHarvest: 41,
    packagingSpec: 'Thùng carton 13.5kg lót túi PE chân không chuyên xuất khẩu',
    provinceCode: 'DN',
    provinceName: 'Đồng Nai',
    locationText: 'Xã Trị An, Tỉnh Đồng Nai',
    approximateCoordinates: [11.1350, 107.0250],
    areaHa: 5.0,
    season: 'Vụ mùa 2026',
    areaName: 'Trang trại chuối công nghệ cao Sông Mây',
    productionUnitCode: 'SM-CG-08 (Khai báo nội bộ)',
    farmerName: 'Nông trường Chuối Sông Mây',
    farmerType: 'COOPERATIVE',
    farmerTypeText: 'Hợp tác xã nông nghiệp (FARMER)',
    contactPerson: 'Phạm Đức Long',
    phoneDisplay: '0938 990 011',
    phoneHidden: '0938 *** ***',
    zaloPhone: '0938990011',
    referencePrice: 'Giá tham khảo: Liên hệ / Thỏa thuận',
    farmingStandard: 'Quy trình VietGAP GlobalGAP nội bộ',
    farmingLogs: [
      {
        date: '05/10/2026',
        title: 'Chống ngã đổ buồng chuối mùa mưa bão',
        description: 'Cố định dây néo chống gãy đổ toàn bộ các cây mang buồng trên 8 nải.',
      },
      {
        date: '15/08/2026',
        title: 'Bao buồng túi xanh cản côn trùng',
        description: 'Trùm túi bảo vệ buồng chuối chuyên dụng để vỏ trái nhẵn bóng không tì vết.',
      },
    ],
  },
]
