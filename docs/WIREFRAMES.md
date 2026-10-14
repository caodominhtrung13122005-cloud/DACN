# 📐 Low-Fidelity Wireframes — MEKAGREEN (Giai đoạn 6)

## 1. Mục Đích & Nguyên Tắc Thiết Kế

Tài liệu này xác lập cấu trúc bố cục khung dây (Low-fidelity Wireframes) cho các màn hình trọng tâm của hệ thống **MEKAGREEN**, làm nền tảng cho việc rà soát trải nghiệm (UX Review) trước khi tiến hành xây dựng Design System và High-fidelity Prototype.

### Nguyên tắc thiết kế cốt lõi:
1. **Phong cách Premium Agritech & Trải nghiệm thực tế:**
   - Bố cục gọn gàng, trực quan, phân cấp thông tin rõ nét, tối ưu khả năng quét nhanh (scannability).
   - Tôn trọng người dùng nông nghiệp Nam Bộ: Ngôn ngữ tiếng Việt tự nhiên, trực quan, không dùng thuật ngữ kỹ thuật phức tạp hay từ ngữ tiếng Anh xa lạ.
   - **Tuyệt đối trung thực với dữ liệu (No Fake Data):** Phân biệt rõ giữa dữ liệu dự kiến và dữ liệu thực tế. Thiếu thông tin nào hiển thị rõ là "Chưa cung cấp", tuyệt đối không tạo dữ liệu giả, không tạo số liệu thống kê ảo.
2. **Thể hiện bố cục Đa nền tảng (Responsive Layout):**
   - **Desktop (1200px – 1440px):** Tối ưu không gian hiển thị thông tin 2 cột (split view), bảng dữ liệu chi tiết, bản đồ tương tác song song danh sách.
   - **Mobile (375px – 414px):** Tối ưu thao tác một tay, chạm bấm dễ dàng (touch target $\ge 44 \times 44\text{px}$), ưu tiên Drawer/Modal trượt lên, thanh tác vụ ghim dưới đáy (Sticky Bottom Bar).
3. **Tuân thủ nghiêm ngặt Quy tắc nghiệp vụ (Business Rules) & Luồng người dùng (User Flows):**
   - Duy trì đúng **5 trạng thái Database nghiệp vụ** của bài đăng: `AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED`.
   - Trường hợp hết sản lượng do giữ chỗ mềm được xử lý bằng **Trạng thái hiển thị UX phái sinh**: Huy hiệu *"Tạm hết sản lượng khả dụng (Chờ xác nhận)"*.
   - Khối liên hệ hiển thị có kiểm soát: Khách vãng lai thấy lời nhắc *"Đăng nhập để xem thông tin liên hệ"* (BR-037); Người dùng đã đăng nhập mới xem được SĐT/Zalo trực tiếp. Trên mobile, nút gọi nhanh `[📞]` tuân thủ nghiêm ngặt phân quyền đăng nhập.
   - Quyền thao tác tại `T-03`: Nút "Gửi đề nghị thu mua" mở **Modal/Drawer Form Tạo Đề nghị thu mua** (chưa phải trang chi tiết `T-17`). Phân quyền chặt chẽ giữa Guest, Buyer, Farmer (chủ bài đăng), Farmer khác và Admin.
   - Bảo vệ quyền riêng tư tọa độ GPS: Tọa độ chính xác được bảo mật mặc định. Hệ thống chỉ hiển thị vị trí gần đúng với nhãn "Vị trí gần đúng" trên Chợ và Bản đồ. Tọa độ chính xác chỉ công khai nếu Nông dân chủ động chọn công khai; tuyệt đối không tự động tiết lộ sau khi thỏa thuận đạt CONFIRMED; hai bên tự trao đổi địa điểm giao nhận hàng cụ thể ngoài hệ thống (qua SĐT / Zalo / Facebook) nếu tọa độ được bảo mật (BR-033b). Không tạo ghim ảo nếu thiếu tọa độ.
   - Cảnh báo pháp lý thỏa thuận bắt buộc tại `T-19` theo đúng BR-048: *"Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN. Đây không phải chữ ký số hay hợp đồng điện tử có giá trị pháp lý."*
   - Chặn xác nhận kép trên `T-19`: Bên đã xác nhận không được bấm xác nhận lại; vẫn cho phép hủy khi còn `PENDING_CONFIRMATION`. Xuất PDF là tính năng tùy chọn trong MVP.
   - Cập nhật địa giới hành chính theo cơ cấu chính thức năm 2026: Không dùng cấp huyện như trường lựa chọn hành chính bắt buộc.
   - Bộ lọc tìm kiếm ngày thu hoạch linh hoạt theo dải ngày, không xem 15–30 ngày là giới hạn cứng (BR-031a).

---

## 2. Danh Sách Màn Hình Ưu Tiên Triển Khai

| Mã trang | Tên màn hình Wireframe | Vai trò chính | Trọng tâm thẩm định |
|:---|:---|:---|:---|
| `T-01` | **Trang chủ MEKAGREEN (Home / Landing)** | Khách, Tất cả | Hero Banner Full-Bleed Panoramic Nam Bộ, 2 CTA, Thanh tìm kiếm nông sản nổi, Bộ lọc ngày linh hoạt |
| `T-02` | **Chợ Nguồn Cung & Bản Đồ (Marketplace)** | Khách, Mua, Bán | Bộ lọc linh hoạt không ép 15-30 ngày, Danh sách thẻ, Bản đồ ghim điểm/vị trí gần đúng, Split view |
| `T-03` | **Chi tiết Nguồn Cung Thu Hoạch (Supply Detail)** | Khách, Mua, Bán, Admin | Tiến độ sản lượng 3 màu, Phân quyền thao tác 4 vai trò, Nút mở Modal Form gửi đề nghị, Bảo vệ liên hệ & GPS |
| `T-04` | **Truy Xuất Nguồn Gốc Công Khai (Traceability)** | Khách, Quét QR | Mobile-first, Phân biệt dự kiến vs thực tế, Trung thực dữ liệu (không tạo ngày thu hoạch/giấy tờ giả) |
| `T-17` | **Chi tiết Đề Nghị Thu Mua (Proposal Detail)** | Nông dân, Bên mua | Giao diện thích ứng theo vai trò, nút Chấp nhận/Từ chối/Rút, khóa khi thiếu lượng tạm thời |
| `T-19` | **Chi tiết Thỏa Thuận Thu Mua (Agreement Detail)** | Nông dân, Bên mua | Snapshot điều khoản đóng băng, 2 dấu thời gian xác nhận, chặn xác nhận kép, cho phép hủy khi còn PENDING_CONFIRMATION, cảnh báo pháp lý chuẩn BR-048, xuất PDF tùy chọn |
| `T-10` | **Form Vùng Sản Xuất (Production Area Form)** | Nông dân | Địa giới hành chính hiện hành 2026 (không bắt buộc cấp huyện), Nhập diện tích thủ công, Tùy chọn bảo mật tọa độ GPS |
| `T-12` | **Form Mùa Vụ (Crop Season Form)** | Nông dân | Liên kết vùng trồng, loại cây & giống cây, mốc ngày dự kiến |
| `T-13` | **Form Ghi Nhật Ký Canh Tác (Farming Log Form)** | Nông dân (Mobile) | Thao tác nhanh tại vườn, Thẻ hoạt động, Chụp ảnh thực tế |
| `T-15` | **Form Đăng Nguồn Cung Thu Hoạch (Harvest Listing)** | Nông dân | Nhập sản lượng, ngày thu hoạch, giá tham khảo, dòng gợi ý khuyến nghị 15–30 ngày (không chặn) |

---

## 3. Khung Dây Chi Tiết Từng Màn Hình Ưu Tiên

```
====================================================================================================
MÀN HÌNH T-01: TRANG CHỦ MEKAGREEN (HOME / LANDING PAGE)
====================================================================================================
```

### A. Bố cục Desktop (Desktop Layout — 1440px)
```
+--------------------------------------------------------------------------------------------------+
| [LOGO MEKAGREEN]        Trang chủ   Chợ Nguồn Cung   Bản Đồ   Về Dự Án     [Đăng ký] [Đăng nhập] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [HERO BANNER FULL-BLEED PANORAMIC — ẢNH NÔNG NGHIỆP NAM BỘ RỘNG TRÀN TOÀN MÀN HÌNH]               |
|                                                                                                  |
|       KẾT NỐI NGUỒN CUNG NÔNG SẢN – CHỦ ĐỘNG TRƯỚC MÙA THU HOẠCH                                  |
|       Nền tảng kết nối trực tiếp Nhà vườn Nam Bộ và Thương lái trước ngày thu hoạch.            |
|       Minh bạch nhật ký sản xuất, chủ động sản lượng, thỏa thuận cam kết rõ ràng.                 |
|                                                                                                  |
|             [ Khám phá nguồn cung ]              [ Đăng nguồn cung (Dành cho Nhà vườn) ]         |
|                     (Primary CTA)                                (Secondary CTA)                 |
|                                                                                                  |
|   +------------------------------------------------------------------------------------------+   |
|   | [THANH TÌM KIẾM NÔNG SẢN NỔI ĐÈ PHÍA DƯỚI BANNER (FLOATING SEARCH BAR)]                  |   |
|   | [🔍 Tên nông sản / Giống cây] | [📍 Địa bàn / Tỉnh thành ▼] | [📅 Khoảng ngày thu hoạch] | [TÌM KIẾM] |   |
|   +------------------------------------------------------------------------------------------+   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [KHỐI 1: 3 TRỤ CỘT CỐT LÕI (CORE PILLARS)]                                                       |
|                                                                                                  |
|  [ VÙNG TRỒNG & NHẬT KÝ ]       [ CHỢ NÔNG SẢN SẮP THU HOẠCH ]      [ THỎA THUẬN CAM KẾT 2 BÊN ] |
|  Theo dõi trực tiếp quá trình   Tìm kiếm nguồn cung trước mùa vụ,   Xác nhận điều khoản sản lượng|
|  canh tác, phân bón, thu hoạch   định vị nhà vườn trên bản đồ,      minh bạch, chống cam kết     |
|  thực tế từ nhà vườn Nam Bộ.    phân tách sản lượng rõ ràng.        vượt mức bằng Soft Reserve.  |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [KHỐI 2: NGUỒN CUNG NỔI BẬT SẮP THU HOẠCH]                                   [Xem tất cả Chợ ->] |
|                                                                                                  |
|  +------------------------+  +------------------------+  +------------------------+              |
|  | [ẢNH VƯỜN SẦU RIÊNG]   |  | [ẢNH VƯỜN XOÀI CÁT]    |  | [ẢNH VƯỜN BƯỞI DA XANH]|              |
|  | Sầu riêng Ri6          |  | Xoài Cát Hòa Lộc       |  | Bưởi da xanh           |              |
|  | Đơn vị: Đồng Tháp      |  | Đơn vị: Đồng Tháp      |  | Đơn vị: Vĩnh Long      |              |
|  | (Vùng Cái Bè cũ)       |  | (Vùng Cao Lãnh)        |  | (Chợ Lách, Bến Tre cũ) |              |
|  | Thu hoạch: 20/10/2026   |  | Thu hoạch: 05/11/2026   |  | Thu hoạch: 12/11/2026  |              |
|  | Dự kiến: 10 Tấn        |  | Dự kiến: 5 Tấn         |  | Dự kiến: 8 Tấn         |              |
|  | [===Tiến độ sản lượng=]|  | [===Tiến độ sản lượng=]|  | [===Tiến độ sản lượng=]|              |
|  | Còn lại: 6 Tấn (60%)   |  | Tạm hết sản lượng (Chờ)|  | Còn lại: 8 Tấn (100%)  |              |
|  | Giá: 75.000 đ/kg       |  | Giá: 60.000 đ/kg       |  | Giá: 45.000 đ/kg       |              |
|  | [ Xem chi tiết ]       |  | [ Xem chi tiết ]       |  | [ Xem chi tiết ]       |              |
|  +------------------------+  +------------------------+  +------------------------+              |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [KHỐI 3: BẢN ĐỒ VÙNG TRỒNG NÔNG NGHIỆP NAM BỘ (MINI MAP PREVIEW)]                                |
|                                                                                                  |
|  +----------------------------------------------+  +------------------------------------------+  |
|  | [BẢN ĐỒ SỐ ĐỒNG BẰNG SÔNG CỬU LONG]          |  | TRẢI NGHIỆM TÌM NGUỒN HÀNG TRỰC QUAN     |  |
|  |  • Ghim điểm nhà vườn (vị trí gần đúng)      |  | Khoanh vùng các vựa trái cây và vùng lúa |  |
|  |  • Lọc trực tiếp theo địa bàn gom hàng        |  | xuất khẩu trọng điểm miền Tây và miền    |  |
|  |  • Hiển thị nhãn "Vị trí gần đúng" minh bạch  |  | Đông Nam Bộ dễ dàng.                     |  |
|  |                                              |  | [ Mở Bản Đồ Nông Sản Toàn Màn Hình ]     |  |
|  +----------------------------------------------+  +------------------------------------------+  |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| FOOTER: MEKAGREEN — Dự án chuyên đề phát triển chuỗi cung ứng nông sản Nam Bộ                    |
| Hotline hỗ trợ / Email liên hệ | Điều khoản sử dụng | Chính sách bảo vệ thông tin cá nhân        |
+--------------------------------------------------------------------------------------------------+
```

### B. Bố cục Mobile (Mobile Layout — 375px)
```
+------------------------------------------+
| [=] MENU      [LOGO MEKAGREEN]       [👤]|
+------------------------------------------+
| [HERO BANNER PANORAMIC ẢNH NAM BỘ 4:3]   |
|                                          |
| KẾT NỐI NGUỒN CUNG NÔNG SẢN              |
| CHỦ ĐỘNG TRƯỚC MÙA THU HOẠCH             |
|                                          |
| [ Khám phá nguồn cung ] (Primary Full)   |
| [ Đăng nguồn cung ]     (Secondary Full) |
+------------------------------------------+
| [THANH TÌM KIẾM NỔI - XẾP DỌC]           |
| [🔍 Tên nông sản / Giống cây           ] |
| [📍 Chọn Địa bàn / Tỉnh thành         ▼] |
| [📅 Khoảng ngày thu hoạch (Linh hoạt) ▼] |
| [        🔍 TÌM KIẾM NGUỒN HÀNG       ] |
+------------------------------------------+
| 3 TRỤ CỘT CỐT LÕI (VUỐT NGANG)           |
| • Vùng trồng & Nhật ký minh bạch         |
| • Chợ nông sản sắp thu hoạch             |
| • Thỏa thuận cam kết 2 bên               |
+------------------------------------------+
| NGUỒN CUNG NỔI BẬT (CUỘN DỌC)            |
| +--------------------------------------+ |
| | [ẢNH] SẦU RIÊNG RI6 (Đồng Tháp)      | |
| | Đơn vị: Xã Mỹ Đức Tây (Cái Bè cũ)    | |
| | Thu hoạch: 20/10/2026 | Còn: 6 Tấn   | |
| | Giá: 75.000 đ/kg | [Xem chi tiết]    | |
| +--------------------------------------+ |
| +--------------------------------------+ |
| | [ẢNH] XOÀI CÁT HÒA LỘC (Đồng Tháp)   | |
| | Badge: [TẠM HẾT SẢN LƯỢNG (CHỜ XN)]  | |
| | Giá: 60.000 đ/kg | [Xem chi tiết]    | |
| +--------------------------------------+ |
+------------------------------------------+
| FOOTER RÚT GỌN                           |
+------------------------------------------+
```

---

```
====================================================================================================
MÀN HÌNH T-02: CHỢ NGUỒN CUNG & BẢN ĐỒ (MARKETPLACE - LIST / MAP / SPLIT VIEW)
====================================================================================================
```

### A. Bố cục Desktop Split View (Danh sách & Bản đồ song song — 1440px)
```
+--------------------------------------------------------------------------------------------------+
| [LOGO] Chợ Nguồn Cung   Bản Đồ   Nhật Ký           [🔍 Nhập loại nông sản...]   [👤 Tài khoản]   |
+--------------------------------------------------------------------------------------------------+
| THANH BỘ LỌC ĐA TẦNG LINH HOẠT (KHÔNG ÉP BUỘC CẤP HUYỆN & KHÔNG ÉP CỨNG 15-30 NGÀY):              |
| [Tỉnh/TP trực thuộc TW: Đồng Tháp ▼]  [Khu vực cơ sở: Xã Mỹ Đức Tây (Cái Bè cũ) ▼]                |
| [Khoảng ngày thu hoạch: [ 10/10/2026 ] đến [ 20/11/2026 ] 📅 ▼]  [Sản lượng khả dụng: >= 1 Tấn ▼]|
| [Sắp xếp: Ngày thu hoạch gần nhất ▼]                                                             |
| Chế độ hiển thị: [ (•) Chia đôi màn hình (Split) | ( ) Chỉ danh sách | ( ) Chỉ bản đồ ]          |
+------------------------------------------------------+-------------------------------------------+
| CỘT DANH SÁCH NGUỒN CUNG (Scrollable List - 50%)    | KHUNG BẢN ĐỒ TƯƠNG TÁC (Map Panel - 50%)  |
| Tìm thấy: 24 đợt thu hoạch dự kiến                    |                                           |
|                                                      |  +-------------------------------------+  |
| +--------------------------------------------------+ |  | [Bản đồ Leaflet / OpenStreetMap]    |  |
| | [ẢNH THỰC TẾ] SẦU RIÊNG RI6                      | |  |                                     |  |
| | Nhà vườn: Nguyễn Văn A                           | |  |        (•) Ghim Đồng Tháp (12)      |  |
| | Đơn vị chính thức: Xã Mỹ Đức Tây, Tỉnh Đồng Tháp  | |  |            (Mỹ Đức Tây / Cái Bè cũ) |  |
| | (Địa danh lịch sử / quen gọi: Mỹ Đức Đông)       | |  |                                     |  |
| | Vị trí: Vị trí gần đúng (Bảo vệ thông tin vườn)  | |  |              (•) Ghim Vĩnh Long (8) |  |
| | Ngày thu hoạch: 25/10/2026 (Còn 17 ngày)         | |  |              (Chợ Lách, Bến Tre cũ) |  |
| | ------------------------------------------------ | |  |   (•) Ghim Cần Thơ (4)              |  |
| | Thanh sản lượng: [====Đã chốt====|--Giữ chỗ--|Còn]| |  |                                     |  |
| | Dự kiến: 10 Tấn | Đã chốt: 4 Tấn | Còn lại: 4 Tấn| |  |  +-------------------------------+  |  |
| | Giá tham khảo: 78.000 đ/kg                       | |  |  | POPUP KHI CHỌN ĐIỂM GHIM:     |  |  |
| | Huy hiệu: [ĐÃ CAM KẾT MỘT PHẦN]                  | |  |  | Sầu riêng Ri6 - Vườn Bác A     |  |  |
| | [ Xem chi tiết nguồn cung -> ]                   | |  |  | Còn lại: 4 Tấn | 78.000 đ/kg   |  |  |
| +--------------------------------------------------+ |  |  | Đơn vị: Xã Mỹ Đức Tây, Đ.Tháp   |  |  |
|                                                      |  |  | Vị trí: Vị trí gần đúng         |  |  |
| +--------------------------------------------------+ |  |  | [Xem chi tiết]                |  |  |
| | [ẢNH THỰC TẾ] XOÀI CÁT HÒA LỘC                   | |  |  +-------------------------------+  |  |
| | HTX Nông nghiệp Xanh • Xã An Hữu, T. Đồng Tháp   | |  |                                     |  |
| | (Địa danh lịch sử: Hòa Hưng, Cái Bè cũ)          | |  |  Chú giải bản đồ:                   |  |
| | Vị trí: Vị trí gần đúng (Bảo vệ thông tin vườn)  | |  |  🟢 Còn sản lượng   🟠 Giữ chỗ hết |  |
| | Ngày thu hoạch: 02/11/2026 (Còn 25 ngày)         | |  |  📍 Tọa độ thực     📍 Vị trí gần |  |
| | ------------------------------------------------ | |  |     (khi công khai)   (mặc định)    |  |
| | Dự kiến: 5 Tấn | Đã chốt: 0 Tấn | Giữ chỗ: 5 Tấn | |  +-------------------------------------+  |
| | Huy hiệu: [TẠM HẾT SẢN LƯỢNG KHẢ DỤNG] (Cam)    | |                                           |
| | Giá tham khảo: 65.000 đ/kg                       | |                                           |
| | [ Xem chi tiết nguồn cung -> ]                   | |                                           |
| +--------------------------------------------------+ |                                           |
+------------------------------------------------------+-------------------------------------------+
```

### B. Bố cục Mobile T-02 Trực Quan (Mobile Layout — 375px)

#### B1. Chế độ Danh Sách Nguồn Cung (Mobile List Mode — 375px)
```
+------------------------------------------+
| [=] MENU      [LOGO MEKAGREEN]       [👤]|
+------------------------------------------+
| [🔍 Tìm sầu riêng, xoài, bưởi...       ] |
|                                          |
| SEGMENTED CONTROL (CHUYỂN ĐỔI CHẾ ĐỘ):   |
| +--------------------+-------------------+
| | [•] DANH SÁCH (24) | [ ] BẢN ĐỒ (24)   |
| +--------------------+-------------------+
| [ Lọc nhanh: Đồng Tháp ▼ ] [ 15-30 ngày ]|
+------------------------------------------+
| THẺ NGUỒN CUNG 1:                        |
| +--------------------------------------+ |
| | [ẢNH THỰC ĐỊA TẠI VƯỜN - TỶ LỆ 16:9] | |
| | SẦU RIÊNG RI6 (Đợt thu hoạch 25/10)  | |
| | Nhà vườn: Nguyễn Văn A               | |
| | 📍 Đơn vị: Xã Mỹ Đức Tây, T.Đồng Tháp| |
| |    (Địa danh quen gọi: Mỹ Đức Đông)  | |
| | 🛡️ Vị trí: Vị trí gần đúng           | |
| | Thu hoạch: 25/10/2026 (Còn 17 ngày)  | |
| |                                      | |
| | TIẾN ĐỘ SẢN LƯỢNG (SOFT RESERVE):    | |
| | [====Đã chốt (4T)===|--Giữ 2T--|Còn]| |
| | • Khả dụng: 4 Tấn (40%) / Tổng 10 Tấn| |
| |                                      | |
| | Giá chào: 78.000 đ/kg                | |
| | Badge: [ 🔵 ĐÃ CAM KẾT MỘT PHẦN ]    | |
| |                                      | |
| | [    XEM CHI TIẾT NGUỒN CUNG ->    ] | |
| +--------------------------------------+ |
|                                          |
| THẺ NGUỒN CUNG 2:                        |
| +--------------------------------------+ |
| | [ẢNH THỰC ĐỊA XOÀI CÁT HÒA LỘC]      | |
| | XOÀI CÁT HÒA LỘC (Đợt thu hoạch 02/11)| |
| | HTX Nông nghiệp Xanh                 | |
| | 📍 Đơn vị: Xã An Hữu, T.Đồng Tháp    | |
| |    (Địa danh quen gọi: Hòa Hưng cũ)  | |
| | 🛡️ Vị trí: Vị trí gần đúng           | |
| | Thu hoạch: 02/11/2026 (Còn 25 ngày)  | |
| |                                      | |
| | TIẾN ĐỘ SẢN LƯỢNG:                   | |
| | [----------------Giữ chỗ 5T----------]| |
| | • Khả dụng: 0 Tấn / Đang giữ chỗ 5 Tấn| |
| |                                      | |
| | Giá chào: 65.000 đ/kg                | |
| | Badge: [ ⏳ TẠM HẾT SẢN LƯỢNG (CHỜ) ]| |
| |                                      | |
| | [    XEM CHI TIẾT NGUỒN CUNG ->    ] | |
| +--------------------------------------+ |
|                                          |
| (Nút nổi chuyển bản đồ góc dưới phải):   |
|                            [ 🗺️ Bản đồ ]|
+------------------------------------------+
```

#### B2. Chế độ Bản Đồ & Bottom Sheet Xem Nhanh (Mobile Map & Bottom Sheet Mode — 375px)
```
+------------------------------------------+
| [=] MENU      [LOGO MEKAGREEN]       [👤]|
+------------------------------------------+
| SEGMENTED CONTROL:                       |
| +--------------------+-------------------+
| | [ ] DANH SÁCH (24) | [•] BẢN ĐỒ (24)   |
| +--------------------+-------------------+
| [KHUNG BẢN ĐỒ TOÀN MÀN HÌNH - LEAFLET]   |
|                                          |
|       📍 [Đồng Tháp - Mỹ Đức Tây (12)]   |
|                  ▲                       |
|          (Người dùng chạm ghim này)      |
|                                          |
|             📍 [Vĩnh Long - Chợ Lách (8)]|
|                                          |
|         📍 [Cần Thơ (4)]                 |
|                                          |
|                                          |
+------------------------------------------+
| [BOTTOM SHEET TRƯỢT LÊN TỪ ĐÁY KHI CHẠM] |
| +--------------------------------------+ |
| | [ — GẠCH KÉO TRƯỢT ]             [✕] | |
| | SẦU RIÊNG RI6 — VƯỜN NGUYỄN VĂN A    | |
| | 📍 Xã Mỹ Đức Tây, Tỉnh Đồng Tháp     | |
| |    (Địa danh quen gọi: Mỹ Đức Đông)  | |
| | 🛡️ Vị trí: Vị trí gần đúng           | |
| | Thu hoạch: 25/10/2026 | Giá: 78.000đ | |
| | Sản lượng khả dụng: 4 Tấn (40%)      | |
| | [====Đã chốt (4T)===|--Giữ 2T--|Còn] | |
| | [      MỞ XEM CHI TIẾT BÀI ĐĂNG     ]| |
| +--------------------------------------+ |
+------------------------------------------+
```

#### B3. Drawer Bộ Lọc Tìm Kiếm Mobile (Filter Drawer — Trượt từ dưới lên khi bấm [Bộ lọc])
```
+------------------------------------------+
| [ — GẠCH KÉO TRƯỢT DRAWER BỘ LỌC — ]  [✕]|
| 🔍 BỘ LỌC TÌM KIẾM NÔNG SẢN              |
+------------------------------------------+
| 1. Danh mục nông sản:                    |
|    [ Tất cả loại cây trồng             ▼]|
|                                          |
| 2. Địa giới hành chính (Cơ cấu 2026):    |
|    Tỉnh / Thành phố trực thuộc TW:       |
|    [ Tỉnh Đồng Tháp                    ▼]|
|    Đơn vị cơ sở / Khu vực:               |
|    [ Xã Mỹ Đức Tây (Mỹ Đức Đông cũ)    ▼]|
|    *(Không bắt buộc cấp huyện riêng)*    |
|                                          |
| 3. Khoảng ngày thu hoạch (Linh hoạt):    |
|    Từ ngày: [ 10/10/2026 📅 ]            |
|    Đến ngày: [ 20/11/2026 📅 ]           |
|    [Chip: 15–30 ngày tới] [Tháng này]    |
|                                          |
| 4. Sản lượng khả dụng tối thiểu:         |
|    [ >= 1.000 kg (1 Tấn)               ▼]|
+------------------------------------------+
| [ THIẾT LẬP LẠI ]    [ ÁP DỤNG BỘ LỌC ]  |
+------------------------------------------+
```

---

```
====================================================================================================
MÀN HÌNH T-03: CHI TIẾT NGUỒN CUNG THU HOẠCH (HARVEST LISTING DETAIL)
====================================================================================================
```

### A. Bố cục Desktop (1200px) — Thể hiện Phân Quyền Thao Tác Đầy Đủ
```
+--------------------------------------------------------------------------------------------------+
| Điều hướng: Trang chủ > Chợ nguồn cung > Đồng Tháp > Sầu riêng Ri6 (Mã: NL-2026-089)            |
+--------------------------------------------------------------------------------------------------+
| [THANH CÔNG CỤ DÀNH CHO ADMIN / CHỦ BÀI ĐĂNG (NẾU ĐĂNG NHẬP PHÙ HỢP)]:                           |
| • Nông dân chủ bài đăng: [ ✏️ Chỉnh sửa bài đăng ]  [ 📋 Xem các đề nghị đã nhận (T-16) ]          |
| • Admin quản trị: [ 🚩 Gắn cờ cảnh báo ]  [ 👁️ Ẩn bài đăng khỏi Chợ ]  [ Xem xét vi phạm (T-22) ]|
+------------------------------------------------------------------+-------------------------------+
| CỘT TRÁI: THÔNG TIN NGUỒN CUNG & BỐI CẢNH CANH TÁC (70%)         | CỘT PHẢI: HỘP ĐẶT MUA (30%)   |
|                                                                  |                               |
| 1. TIÊU ĐỀ & HÌNH ẢNH THỰC TẾ:                                   | +---------------------------+ |
| [ẢNH LỚN VƯỜN CÂY] [Ảnh 2] [Ảnh 3] [Ảnh 4]                       | | THÔNG TIN THƯƠNG MẠI      | |
| Tiêu đề: Đợt thu hoạch Sầu riêng Ri6 – Vườn 5 năm tuổi           | | Giá tham khảo:            | |
| Loại cây: Sầu riêng | Giống: Ri6 cơm vàng hạt lép                | |   78.000 VNĐ / kg         | |
| Đơn vị hành chính chính thức (2026):                             | |                           | |
|   Xã Mỹ Đức Tây, Tỉnh Đồng Tháp                                  | | SẢN LƯỢNG KHẢ DỤNG:       | |
| (Địa danh lịch sử / quen gọi: Xã Mỹ Đức Đông, Cái Bè)            | |   4.000 kg (4 Tấn)        | |
| Vị trí: Vị trí gần đúng (Bảo vệ thông tin vườn theo mặc định;    | | (Tổng dự kiến: 10 Tấn)    | |
|         Chỉ hiện tọa độ chính xác nếu nhà vườn chủ động bật)     | |                           | |
|                                                                  | | Thời gian bắt đầu thu hái:| |
| 2. THANH TIẾN ĐỘ SẢN LƯỢNG TRỰC QUAN (SOFT RESERVE MODEL):       | | 25/10/2026 – 30/10/2026   | |
| [======== Đã cam kết (4T) =======|--- Giữ chỗ (2T) ---| Còn 4T ] | |                           | |
| • Sản lượng dự kiến: 10.000 kg                                    | | ------------------------- | |
| • Đã cam kết (2 thỏa thuận đã chốt): 4.000 kg                    | | [KHU VỰC THAO TÁC THEO    | |
| • Đang giữ chỗ tạm thời (1 thỏa thuận chờ xác nhận): 2.000 kg    | |  TỪNG VAI TRÒ NGƯỜI DÙNG]:| |
| • Sản lượng còn có thể đặt mua: 4.000 kg                         | |                           | |
|                                                                  | | 1. BÊN MUA (BUYER):       | |
| 3. BỐI CẢNH CANH TÁC & VÙNG TRỒNG TRỰC THUỘC:                    | | [ GỬI ĐỀ NGHỊ THU MUA ]   | |
| • Vùng sản xuất: Vùng chuyên canh sầu riêng Mỹ Đức Tây           | | (Bấm mở Modal Form tạo    | |
|   (Khu vực Cái Bè / Mỹ Đức Đông cũ)                              | |  Purchase Proposal)       | |
| • Diện tích: 1,5 Hécta | Đất phù sa ngọt | Nước ngọt tự nhiên    | |                           | |
| • Mùa vụ: Vụ nghịch mùa 2026 (Xuống giống: 15/05/2026)           | | 2. KHÁCH (GUEST):         | |
| • Giấy chứng nhận: Giấy kiểm nghiệm đất & nước (Nông hộ gửi)     | | [ ĐĂNG NHẬP ĐỂ GỬI ĐỀ NGHỊ| |
|   *(Nếu chưa có: Hiển thị "Chưa cung cấp", không tạo giả)*       | |  THU MUA ]                | |
|                                                                  | |                           | |
| 4. DÒNG THỜI GIAN NHẬT KÝ CANH TÁC (FARMING LOG TIMELINE):       | | 3. NÔNG DÂN CHỦ BÀI:      | |
|  (o) 02/10/2026: Tỉa cành, bao trái lứa cuối (Kèm 2 ảnh)         | | (Ẩn nút gửi đề nghị       | |
|  (o) 15/09/2026: Bón phân hữu cơ sinh học đợt 3                  | |  theo BR-040)             | |
|  (o) 20/08/2026: Bắt đầu thời gian cách ly thuốc an toàn         | |                           | |
|  *(Nếu chưa có: Hiển thị "Chưa có nhật ký nào ghi nhận")*        | | 4. KHI HẾT HÀNG:          | |
|                                                                  | | Nút bị khóa (Disabled) +  | |
| 5. TRUY XUẤT THÔNG TIN:                                          | | Badge "Tạm hết sản lượng" | |
| Mã đợt hàng: MKG-DT-2026-SR01 | [Xem trang truy xuất công khai]  | |                           | |
|                                                                  | +---------------------------+ |
|                                                                  |                               |
|                                                                  | +---------------------------+ |
|                                                                  | | THÔNG TIN LIÊN HỆ NHÀ VƯỜN| |
|                                                                  | | Chủ vườn: Nguyễn Văn A    | |
|                                                                  | | ------------------------- | |
|                                                                  | | [NẾU ĐÃ ĐĂNG NHẬP]:       | |
|                                                                  | | 📞 SĐT: 0918.xxx.789      | |
|                                                                  | | 💬 Zalo: Bấm nhắn Zalo    | |
|                                                                  | | ------------------------- | |
|                                                                  | | [NẾU LÀ GUEST (BR-037)]:  | |
|                                                                  | | 🔒 Đăng nhập để xem       | |
|                                                                  | |    thông tin liên hệ      | |
|                                                                  | |    [ Đăng nhập ngay ]     | |
|                                                                  | +---------------------------+ |
+------------------------------------------------------------------+-------------------------------+
```

### B. Modal Form Tạo Purchase Proposal (Bật lên khi Buyer bấm nút [Gửi đề nghị thu mua])
```
+------------------------------------------------------------------+
| [X] ĐÓNG             GỬI ĐỀ NGHỊ THU MUA NÔNG SẢN                |
+------------------------------------------------------------------+
| Đợt thu hoạch: Sầu riêng Ri6 (NL-2026-089) - Vườn Nguyễn Văn A    |
| Địa bàn: Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Mỹ Đức Đông, Cái Bè cũ)   |
| Sản lượng khả dụng hiện tại: 4.000 kg | Giá tham khảo: 78.000 đ/kg |
+------------------------------------------------------------------+
| 1. Sản lượng muốn mua (*) (kg):                                  |
|    [ 2000                     ]  (Tối đa: 4.000 kg)              |
|                                                                  |
| 2. Đơn giá đề xuất (*) (VNĐ / kg):                               |
|    [ 76000                    ]  (Tổng tiền: 152.000.000 VNĐ)    |
|                                                                  |
| 3. Ngày nhận hàng mong muốn (*):                                 |
|    [ 26/10/2026 📅            ]                                  |
|                                                                  |
| 4. Phương thức giao nhận & Ghi chú đóng gói:                     |
|    [ Nhận tại cửa vườn, thương lái tự bố trí xe thùng lạnh...  ] |
+------------------------------------------------------------------+
| 💡 Lưu ý: Đề nghị ở trạng thái PENDING chưa giữ chỗ sản lượng.    |
|    Bạn có thể rút đề nghị bất kỳ lúc nào trước khi Nông dân duyệt.|
+------------------------------------------------------------------+
|               [ HỦY BỎ ]          [ GỬI ĐỀ NGHỊ ]                |
+------------------------------------------------------------------+
```

### C. Bố cục Mobile — Kiểm soát Phân Quyền Nút Gọi & Nút Gửi Đề Nghị (375px)
```
+------------------------------------------+
| [<] Quay lại           [LOGO]         [🔗]|
+------------------------------------------+
| [ẢNH VƯỜN THỰC TẾ TRÀN CHIỀU NGANG]      |
| SẦU RIÊNG RI6 – VƯỜN 5 NĂM TUỔI          |
| 📍 Đơn vị: Xã Mỹ Đức Tây, T. Đồng Tháp   |
|    (Địa danh quen gọi: Mỹ Đức Đông)      |
| 🛡️ Vị trí: Vị trí gần đúng (Bảo vệ vườn)|
|                                          |
| THANH TIẾN ĐỘ SẢN LƯỢNG 3 MÀU:           |
| [====Cam kết (4T)===|--Giữ (2T)--|Còn 4T]|
| • Khả dụng: 4.000 kg / Tổng: 10.000 kg   |
| (Nội dung cuộn dài tự nhiên)             |
+------------------------------------------+
| STICKY BOTTOM BAR (GHIM DƯỚI ĐÁY):       |
|                                          |
| [TRƯỜNG HỢP BUYER ĐÃ ĐĂNG NHẬP]:         |
| 78.000 đ/kg | [📞 Gọi] [Gửi Đề Nghị Mua] |
|                                          |
| [TRƯỜNG HỢP KHÁCH VÃNG LAI (BR-037)]:     |
| 78.000 đ/kg | [🔒 Đăng nhập để liên hệ]  |
|             | [ Đăng Nhập Để Mua ]       |
| (Bấm nút sẽ mở Drawer yêu cầu đăng nhập) |
|                                          |
| [TRƯỜNG HỢP NÔNG DÂN CHỦ BÀI]:           |
| Còn 4 Tấn   | [ ✏️ Chỉnh sửa bài đăng ]   |
+------------------------------------------+
```

---

```
====================================================================================================
MÀN HÌNH T-04: TRANG TRUY XUẤT NGUỒN GỐC CÔNG KHAI (QUÉT QR CODE)
====================================================================================================
```

### A. Mobile-First Layout (375px) — Phân Biệt Dự Kiến vs Thực Tế & Trung Thực Tuyệt Đối
```
+------------------------------------------------------------------+
| [LOGO MEKAGREEN]                 TRUY XUẤT THÔNG TIN NÔNG SẢN    |
+------------------------------------------------------------------+
| 📦 THÔNG TIN LÔ NÔNG SẢN:                                        |
| Mã truy xuất: MKG-DT-2026-SR01                                   |
| Tên sản phẩm: Sầu riêng Ri6                                      |
| Nhà vườn sản xuất: Nông hộ Nguyễn Văn A                          |
| Đơn vị hành chính: Xã Mỹ Đức Tây, Tỉnh Đồng Tháp                 |
| (Địa danh lịch sử / quen gọi: Xã Mỹ Đức Đông, Cái Bè)            |
|                                                                  |
| 📅 TÌNH TRẠNG THU HOẠCH (PHÂN BIỆT DỰ KIẾN VS THỰC TẾ):          |
| • Kế hoạch ban đầu: Dự kiến thu hoạch từ 25/10/2026 (10 Tấn)     |
|                                                                  |
| [TRƯỜNG HỢP 1: VƯỜN ĐANG CANH TÁC, CHƯA THU HOẠCH]:              |
| • Trạng thái thực tế: ⏳ Đang nuôi trái – Chưa thu hoạch thực tế  |
| • Sản lượng thực tế đã thu: Chưa có dữ liệu thu hoạch            |
| *(Tuyệt đối không hiển thị kết quả thu hoạch khi chưa diễn ra)*   |
|                                                                  |
| [TRƯỜNG HỢP 2: ĐÃ THU HOẠCH THỰC TẾ]:                            |
| • Trạng thái thực tế: ✅ Đã thu hoạch đợt 1 ngày 25/10/2026      |
| • Sản lượng thực tế cắt: 2.000 kg                                |
+------------------------------------------------------------------+
| 📍 VỊ TRÍ VÙNG TRỒNG (BẢO VỆ THÔNG TIN NHÀ VƯỜN):                |
| +--------------------------------------------------------------+ |
| | [Bản đồ Leaflet: Mặc định hiển thị "Vị trí gần đúng".        | |
| |  (Chỉ hiển thị tọa độ chính xác nếu Nhà vườn chọn công khai; | |
| |  Nếu thiếu GPS, chỉ hiện địa chỉ văn bản, không ghim ảo)    | |
| | Nhãn hiển thị: "Vị trí gần đúng" (hoặc "Tọa độ thực tế")      | |
| +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
| 📜 HỒ SƠ & GIẤY TỜ CHỨNG NHẬN (TRUNG THỰC DỮ LIỆU):              |
| [NẾU NÔNG HỘ ĐÃ TẢI LÊN CHỨNG NHẬN]:                             |
| • Giấy chứng nhận: VietGAP (Do nông hộ cung cấp) [Xem ảnh chụp]  |
|                                                                  |
| [NẾU NÔNG HỘ CHƯA CUNG CẤP]:                                     |
| • Trạng thái: "Nông hộ chưa cung cấp tài liệu chứng nhận"        |
| *(Tuyệt đối không tự bịa số hiệu chứng nhận hay gán mác đạt)*    |
|                                                                  |
| ⚠️ LƯU Ý BẮT BUỘC (BR-060):                                      |
| "Thông tin giấy tờ do nông hộ tự tải lên và đối chiếu nội bộ.     |
|  MEKAGREEN không đóng vai trò cơ quan cấp chứng nhận pháp lý."   |
+------------------------------------------------------------------+
| 📝 DÒNG THỜI GIAN NHẬT KÝ CANH TÁC (CHỈ HIỆN SỰ KIỆN ĐÃ CÓ):     |
| [NẾU ĐÃ CÓ NHẬT KÝ GHI NHẬN]:                                    |
| (o) 02/10/2026: Bao trái lứa cuối [Kèm 2 ảnh thực tế tại vườn]   |
| (o) 15/09/2026: Bón phân hữu cơ vi sinh                          |
|                                                                  |
| [NẾU CHƯA CÓ NHẬT KÝ GHI NHẬN]:                                  |
| "Chưa có nhật ký canh tác nào được ghi nhận cho mùa vụ này."      |
+------------------------------------------------------------------+
| [ Nền tảng Nông nghiệp MEKAGREEN — Chuỗi Cung Ứng Nam Bộ ]       |
+------------------------------------------------------------------+
```

---

```
====================================================================================================
MÀN HÌNH T-17: CHI TIẾT ĐỀ NGHỊ THU MUA (PURCHASE PROPOSAL DETAIL)
====================================================================================================
```

### A. Giao diện Phía Nông Dân Xem Đề Nghị (Farmer View)
```
+--------------------------------------------------------------------------------------------------+
| Điều hướng: Đề nghị thu mua nhận được > Đề nghị #PROP-2026-042                                   |
+--------------------------------------------------------------------------------------------------+
| TIÊU ĐỀ: ĐỀ NGHỊ THU MUA TỪ [CÔNG TY TNHH XUẤT NHẬP KHẨU NÔNG SẢN MIỀN TÂY]                      |
| Trạng thái hiện tại: [ CHỜ PHẢN HỒI (PENDING) ]                                                   |
| Ngày gửi: 08/10/2026 09:30 | Nguồn cung: Sầu riêng Ri6 (Đợt thu hoạch 25/10/2026)                |
+--------------------------------------------------------------------------------------------------+
| THÔNG TIN CHI TIẾT ĐỀ XUẤT THU MUA:                                                              |
| • Sản lượng chào mua:   2.000 kg (2 Tấn)                                                         |
| • Đơn giá đề xuất:      76.000 VNĐ / kg (Giá tham khảo của vườn: 78.000 đ/kg)                   |
| • Tổng giá trị tham chiếu: 152.000.000 VNĐ                                                       |
| • Ngày nhận hàng dự kiến: 26/10/2026                                                             |
| • Địa điểm nhận hàng:   Tại cửa vườn (Thương lái tự bố trí xe tải)                              |
| • Ghi chú / Quy cách:   "Hàng loại 1 (trái 2.2kg - 3.8kg), cắt già đúng độ, bao trái sạch."      |
| • Thông tin bên mua:    Trần Văn B (SĐT: 0903.xxx.112) • Đơn vị thu mua nông sản                 |
+--------------------------------------------------------------------------------------------------+
| KIỂM TRA SẢN LƯỢNG KHẢ DỤNG (SOFT RESERVE CHECK):                                                |
| • Sản lượng khả dụng hiện tại: 4.000 kg (Đủ đáp ứng 2.000 kg của đề nghị này)                     |
| • Lưu ý: Bấm [Chấp nhận] sẽ giữ chỗ mềm 2.000 kg và tạo Thỏa thuận thu mua T-19.                |
|   Thao tác này CHƯA PHẢI là xác nhận thỏa thuận (Quy trình 2 bước riêng biệt theo BR-044).       |
+--------------------------------------------------------------------------------------------------+
| HÀNH ĐỘNG CỦA NÔNG DÂN:                                                                          |
|   [ TỪ CHỐI ĐỀ NGHỊ ]                        [ CHẤP NHẬN ĐỀ NGHỊ NÀY ]                           |
|   (Mở modal nhập lý do từ chối)             (Kích hoạt Soft Reserve -> Chuyển sang T-19)         |
|                                                                                                  |
| * TRƯỜNG HỢP THIẾU SẢN LƯỢNG TẠM THỜI DO ĐANG GIỮ CHỖ (BR-043a):                                 |
|   Nút [Chấp nhận đề nghị này] bị KHÓA (Disabled) kèm cảnh báo:                                   |
|   ⏳ "Tạm thời chưa đủ sản lượng khả dụng do đang giữ chỗ cho thỏa thuận khác. Nút sẽ tự mở lại   |
|      nếu thỏa thuận giữ chỗ bị hủy."                                                             |
+--------------------------------------------------------------------------------------------------+
```

### B. Giao diện Phía Bên Mua Xem Đề Nghị (Buyer View)
```
+--------------------------------------------------------------------------------------------------+
| Điều hướng: Đề nghị thu mua của tôi > Đề nghị #PROP-2026-042                                     |
+--------------------------------------------------------------------------------------------------+
| TIÊU ĐỀ: ĐỀ NGHỊ THU MUA ĐÃ GỬI TỚI [NHÀ VƯỜN NGUYỄN VĂN A]                                      |
| Trạng thái hiện tại: [ CHỜ PHẢN HỒI (PENDING) ]                                                   |
+--------------------------------------------------------------------------------------------------+
| (Nội dung đề xuất: Sản lượng 2.000 kg, Giá 76.000 đ/kg, Ngày nhận: 26/10/2026)                  |
| Thông tin nhà vườn: Nguyễn Văn A (SĐT: 0918.xxx.789)                                             |
+--------------------------------------------------------------------------------------------------+
| HÀNH ĐỘNG CỦA BÊN MUA:                                                                           |
|   [ 🗑️ RÚT ĐỀ NGHỊ NÀY ]                      [ 📞 GỌI ĐIỆN CHO NHÀ VƯỜN ]                       |
|   (Mở modal xác nhận rút đề nghị)             (Mở tel:0918xxx789 để trao đổi nhanh)              |
+--------------------------------------------------------------------------------------------------+
```

### C. Bố cục Mobile T-17 Trực Quan (Mobile Layout — 375px)

#### C1. Phía Nông Dân Xem & Xử Lý Đề Nghị (Farmer Mobile View — 375px)
```
+------------------------------------------+
| [< Quay lại]    Đề nghị #PROP-042    [🔔]|
+------------------------------------------+
| TIÊU ĐỀ: ĐỀ NGHỊ THU MUA NÔNG SẢN        |
| Người gửi: Cty TNHH XNK Nông sản Miền Tây|
| Trạng thái: [ 🟡 CHỜ PHẢN HỒI (PENDING) ]|
| Ngày gửi: 08/10/2026 09:30               |
+------------------------------------------+
| THÔNG TIN NGUỒN CUNG LIÊN KẾT:           |
| • Nông sản: Sầu riêng Ri6 (Đợt 25/10/26) |
| • Đơn vị: Xã Mỹ Đức Tây, T. Đồng Tháp    |
|   (Địa danh quen gọi: Mỹ Đức Đông)       |
+------------------------------------------+
| ĐIỀU KHOẢN ĐỀ XUẤT THU MUA:              |
| • Sản lượng chào mua: 2.000 kg (2 Tấn)   |
| • Đơn giá đề xuất:    76.000 VNĐ / kg    |
|   (Giá tham khảo của vườn: 78.000 đ/kg)  |
| • Tổng giá trị:       152.000.000 VNĐ    |
| • Ngày nhận dự kiến:  26/10/2026         |
| • Địa điểm nhận hàng: Tại cửa vườn       |
| • Ghi chú: "Hàng loại 1 (2.2kg - 3.8kg), |
|   cắt già đúng độ, bao trái sạch."       |
+------------------------------------------+
| ĐỐI TÁC THU MUA:                         |
| Trần Văn B (SĐT: 0903.xxx.112)           |
+------------------------------------------+
| KIỂM TRA SẢN LƯỢNG KHẢ DỤNG (BR-044):    |
| • Khả dụng hiện tại: 4.000 kg            |
| • Đủ đáp ứng 2.000 kg cho đề nghị này    |
| (Bấm Chấp nhận sẽ giữ chỗ mềm 2.000 kg   |
|  và tạo bản ghi Thỏa thuận T-19)         |
+------------------------------------------+
| [NẾU THIẾU SẢN LƯỢNG TẠM THỜI (BR-043a)]:|
| ⏳ Cảnh báo: Tạm hết sản lượng khả dụng do|
|    đang giữ chỗ thỏa thuận khác.         |
+------------------------------------------+
| STICKY BOTTOM BAR (GHIM DƯỚI ĐÁY):       |
| +--------------------------------------+ |
| | [ ❌ TỪ CHỐI ]   [ ✅ CHẤP NHẬN ĐỀ NGHỊ] | |
| | (Mở lý do)     (Kích hoạt Soft Reserve| |
| |                 chuyển sang T-19)     | |
| +--------------------------------------+ |
| *(Nếu thiếu lượng: Nút Chấp nhận bị khóa)|
+------------------------------------------+
```

#### C2. Phía Bên Mua Xem Đề Nghị Đã Gửi (Buyer Mobile View — 375px)
```
+------------------------------------------+
| [< Quay lại]    Đề nghị của tôi      [🔗]|
+------------------------------------------+
| ĐỀ NGHỊ GỬI TỚI: NHÀ VƯỜN NGUYỄN VĂN A   |
| Trạng thái: [ 🟡 CHỜ PHẢN HỒI (PENDING) ]|
| Ngày gửi: 08/10/2026 09:30               |
+------------------------------------------+
| NỘI DUNG ĐỀ NGHỊ CỦA BẠN:                |
| • Nông sản: Sầu riêng Ri6 (NL-2026-089)  |
| • Đơn vị: Xã Mỹ Đức Tây, T. Đồng Tháp    |
| • Sản lượng chào mua: 2.000 kg           |
| • Đơn giá đề xuất:    76.000 đ/kg        |
| • Tổng giá trị:       152.000.000 VNĐ    |
| • Ngày nhận mong muốn: 26/10/2026        |
+------------------------------------------+
| THÔNG TIN NHÀ VƯỜN:                      |
| Nguyễn Văn A (SĐT: 0918.xxx.789)         |
+------------------------------------------+
| STICKY BOTTOM BAR (GHIM DƯỚI ĐÁY):       |
| +--------------------------------------+ |
| | [ 🗑️ Rút đề nghị ]  [ 📞 Gọi nhà vườn ]| |
| | (Hủy đề nghị PENDING) (Mở cuộc gọi/Zalo| |
| +--------------------------------------+ |
+------------------------------------------+
```

---

```
====================================================================================================
MÀN HÌNH T-19: CHI TIẾT THỎA THUẬN THU MUA (PROCUREMENT AGREEMENT DETAIL)
====================================================================================================
```

### A. Bố cục Desktop (1440px) — Chuẩn Xác Từng Chữ Cảnh Báo BR-048 & Chặn Xác Nhận Kép
```
+--------------------------------------------------------------------------------------------------+
| [LOGO MEKAGREEN]           THỎA THUẬN THU MUA NÔNG SẢN                Mã: AGR-2026-10-0089       |
|                            (BẢN GHI XÁC NHẬN NỘI BỘ NỀN TẢNG)                                    |
+--------------------------------------------------------------------------------------------------+
| ⚠️ CẢNH BÁO PHÁP LÝ BẮT BUỘC (CHUẨN TỪNG CHỮ THEO BR-048):                                       |
| "Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN.                                |
|  Đây không phải chữ ký số hay hợp đồng điện tử có giá trị pháp lý."                              |
+--------------------------------------------------------------------------------------------------+
| TRẠNG THÁI HIỆN TẠI: [ CHỜ XÁC NHẬN (PENDING_CONFIRMATION) ]                                     |
|                                                                                                  |
| BẢNG THEO DÕI TIẾN ĐỘ XÁC NHẬN HAI BÊN:                                                          |
| +-----------------------------------------------+----------------------------------------------+ |
| | BÊN BÁN (NÔNG DÂN / HTX):                     | BÊN MUA (DOANH NGHIỆP / THƯƠNG LÁI):          | |
| | Họ tên: Nguyễn Văn A                          | Đơn vị: Công ty TNHH XNK Nông sản Miền Tây   | |
| | SĐT: 0918.xxx.789                             | Đại diện: Trần Văn B (SĐT: 0903.xxx.112)     | |
| | Trạng thái: ✅ ĐÃ BẤM XÁC NHẬN                | Trạng thái: ⏳ CHƯA BẤM XÁC NHẬN              | |
| | Thời gian: 08/10/2026 10:15:20                | Thời gian: ---                               | |
| +-----------------------------------------------+----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
| ĐIỀU KHOẢN ĐÓNG BĂNG BẤT BIẾN (IMMUTABLE SNAPSHOT):                                              |
| 1. Nông sản: Sầu riêng Ri6 (Đợt thu hoạch mã NL-2026-089)                                        |
| 2. Sản lượng thỏa thuận: 2.000 kg (2 Tấn) [Đang nằm trong trạng thái Giữ Chỗ Mềm]                |
| 3. Đơn giá thống nhất: 76.000 VNĐ / kg                                                           |
| 4. Tổng giá trị tham chiếu: 152.000.000 VNĐ                                                      |
| 5. Khoảng thời gian thu hoạch dự kiến: 25/10/2026 đến 30/10/2026                                 |
| 6. Địa điểm giao nhận: Vườn Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Địa danh lịch sử: Mỹ Đức Đông, Cái Bè)|
| 7. Ghi chú quy cách: Hàng loại 1 (trọng lượng 2.2kg - 3.8kg), cắt già đúng độ                     |
+--------------------------------------------------------------------------------------------------+
| [KỊCH BẢN 1: GIAO DIỆN PHÍA NÔNG DÂN (NGƯỜI ĐÃ BẤM XÁC NHẬN TRƯỚC ĐÓ)]:                           |
| • Nút [Xác nhận thỏa thuận] BỊ KHÓA / ẨN HOÀN TOÀN (CHỐNG XÁC NHẬN KÉP):                         |
|   "✅ Bạn đã xác nhận thỏa thuận này lúc 08/10/2026 10:15:20. Đang chờ Bên mua xác nhận."        |
| • Nút [HỦY THỎA THUẬN CHƯA CHỐT] VẪN KHẢ DỤNG:                                                   |
|   [ HỦY THỎA THUẬN CHƯA CHỐT ] (Mở modal nhập lý do hủy để giải phóng 2.000 kg giữ chỗ)          |
|                                                                                                  |
| [KỊCH BẢN 2: GIAO DIỆN PHÍA BÊN MUA (NGƯỜI CHƯA BẤM XÁC NHẬN)]:                                   |
| • Hiển thị thông báo: "⚠️ Nông dân đã bấm xác nhận lúc 10:15:20. Mời bạn đọc kỹ và phản hồi:"    |
| • Có đủ 2 nút hành động:                                                                         |
|   [ HỦY THỎA THUẬN CHƯA CHỐT ]                 [ XÁC NHẬN THỎA THUẬN THU MUA ]                  |
|   (Mở Modal nhập lý do hủy)                   (Ghi nhận buyerConfirmedAt = NOW -> CONFIRMED)    |
|                                                                                                  |
| [KỊCH BẢN 3: CẢ HAI BÊN ĐÃ CÙNG XÁC NHẬN -> TRẠNG THÁI: CONFIRMED]:                              |
| • Cả 2 nút Xác nhận và nút Hủy BIẾN MẤT HOÀN TOÀN (Khóa bất biến).                               |
| • Hiển thị biểu tượng: "🎉 Thỏa thuận thu mua đã được hai bên hoàn tất xác nhận!"                |
| • Tiện ích tùy chọn trong MVP: [ 🖨️ In bản thỏa thuận / Xuất PDF (Tính năng tùy chọn) ]          |
+--------------------------------------------------------------------------------------------------+
```

### B. Bố cục Mobile T-19 Trực Quan (Mobile Layout — 375px)
```
+------------------------------------------+
| [< Quay lại]  Thỏa thuận #AGR-0089   [🔗]|
+------------------------------------------+
| ⚠️ CẢNH BÁO PHÁP LÝ BẮT BUỘC (BR-048):   |
| "Thỏa thuận thu mua được hai bên xác nhận|
|  trên hệ thống MEKAGREEN. Đây không phải |
|  chữ ký số hay hợp đồng điện tử có giá   |
|  trị pháp lý."                           |
+------------------------------------------+
| TRẠNG THÁI: [ ⏳ CHỜ HAI BÊN XÁC NHẬN ]  |
|                                          |
| BẢNG TIẾN ĐỘ XÁC NHẬN:                   |
| +--------------------------------------+ |
| | BÊN BÁN (NÔNG DÂN): NGUYỄN VĂN A     | |
| | Trạng thái: ✅ ĐÃ BẤM XÁC NHẬN        | |
| | Thời gian:  08/10/2026 10:15:20      | |
| +--------------------------------------+ |
| | BÊN MUA: CTY TNHH XNK NÔNG SẢN MIỀN TÂY|
| | Đại diện:   Trần Văn B (0903.xxx.112)| |
| | Trạng thái: ⏳ CHƯA BẤM XÁC NHẬN      | |
| | Thời gian:  ---                      | |
| +--------------------------------------+ |
+------------------------------------------+
| ĐIỀU KHOẢN ĐÓNG BĂNG BẤT BIẾN:           |
| 1. Nông sản: Sầu riêng Ri6 (NL-2026-089) |
| 2. Sản lượng thỏa thuận: 2.000 kg        |
|    [Đang giữ chỗ mềm trên hệ thống]      |
| 3. Đơn giá thống nhất: 76.000 VNĐ / kg   |
| 4. Tổng giá trị: 152.000.000 VNĐ         |
| 5. Dự kiến thu hoạch: 25/10 - 30/10/2026 |
| 6. Địa điểm: Vườn Xã Mỹ Đức Tây, Đ.Tháp  |
|    (Địa danh lịch sử: Mỹ Đức Đông,Cái Bè)|
| 7. Quy cách: Hàng loại 1 (2.2kg - 3.8kg) |
+------------------------------------------+
| STICKY BOTTOM BAR (GHIM DƯỚI ĐÁY):       |
|                                          |
| [KỊCH BẢN 1: NÔNG DÂN ĐÃ BẤM XÁC NHẬN]:  |
| "✅ Bạn đã xác nhận. Đang chờ bên mua"    |
| [      🚫 HỦY THỎA THUẬN CHƯA CHỐT     ] |
| (Mở modal nhập lý do để giải phóng lượng)|
|                                          |
| [KỊCH BẢN 2: BÊN MUA CHƯA BẤM XÁC NHẬN]: |
| "⚠️ Nông dân đã bấm xác nhận lúc 10:15"  |
| [ 🚫 HỦY ]   [ ✅ XÁC NHẬN THỎA THUẬN ]  |
| (Mở lý do)   (Hoàn tất xác nhận 2 bên)   |
|                                          |
| [KỊCH BẢN 3: CẢ 2 BÊN ĐÃ XÁC NHẬN CONFIRMED|
| "🎉 Thỏa thuận đã xác nhận hoàn tất!"     |
| [  🖨️ Xuất PDF thỏa thuận (Tùy chọn)  ]  |
|                                          |
| [KỊCH BẢN 4: THỎA THUẬN BỊ HỦY CANCELLED]:|
| "🚫 Thỏa thuận đã bị hủy bởi Bên mua"    |
| "Lý do: Thay đổi kế hoạch điều xe tải"   |
| "Sản lượng 2.000 kg đã được giải phóng"  |
+------------------------------------------+
```

---

```
====================================================================================================
NHÓM MÀN HÌNH NHẬP LIỆU CỐT LÕI DÀNH CHO NÔNG DÂN (FARMER INPUT FORMS)
====================================================================================================
```

### A. Màn hình T-10: Form Vùng Sản Xuất (Cơ cấu hành chính 2026 & Mặc Định Bảo Vệ GPS)
```
+--------------------------------------------------------------------------------------------------+
| THIẾT LẬP VÙNG SẢN XUẤT NÔNG NGHIỆP                                                              |
+--------------------------------------------------------------------------------------------------+
| [CỘT TRÁI: THÔNG TIN VĂN BẢN (50%)]            | [CỘT PHẢI: CHỌN ĐIỂM TỌA ĐỘ BẢN ĐỒ (50%)]       |
|                                                |                                                 |
| 1. Tên vùng sản xuất (*):                       | TỌA ĐỘ VÙNG TRỒNG (CHỌN ĐIỂM MAP POINT - MVP):   |
|    [Vùng sầu riêng Mỹ Đức Tây (Cái Bè cũ)    ] | [Khung bản đồ tương tác vệ tinh / bản đồ số]    |
|                                                |  (Hướng dẫn: Click để chấm điểm vị trí vườn)     |
| 2. ĐỊA GIỚI HÀNH CHÍNH (CƠ CẤU 2026) (*):      |                                                 |
|    Tỉnh / Thành phố trực thuộc TW (*):         |        📍 [Điểm ghim màu xanh đã chọn]           |
|    [ Tỉnh Đồng Tháp                        ▼ ] |                                                 |
|    Đơn vị hành chính cơ sở / Khu vực (*):      | Tọa độ tự động cập nhật:                        |
|    [ Xã Mỹ Đức Tây                          ▼] | Latitude: [10.33415]  Longitude: [105.98124]    |
|    *(Không bắt buộc trường cấp huyện riêng)    |                                                 |
|    Địa danh lịch sử / quen gọi:                | BẢO MẬT TỌA ĐỘ NHÀ VƯỜN (QUY TẮC MẶC ĐỊNH):     |
|    [ Cái Bè, Xã Mỹ Đức Đông, Tiền Giang cũ   ] | [x] Bảo vệ tọa độ chính xác (MẶC ĐỊNH BẬT):      |
|    Địa chỉ chi tiết: [Ấp 2, Xã Mỹ Đức Tây    ] |     • Hệ thống chỉ hiển thị ghim cấp xã với nhãn |
|                                                |       "Vị trí gần đúng" trên Chợ và Bản đồ.      |
| 3. Quy mô diện tích (*):                       |     • Không tự động lộ tọa độ sau CONFIRMED.     |
|    [ 1.5 ] Đơn vị: (•) Hécta (ha)  ( ) Mét vuông|     • Điểm nhận hàng trao đổi ngoài hệ thống     |
|                                                |       (qua SĐT / Zalo).                          |
| 4. Loại hình đất / Nguồn nước:                 | [ ] Bỏ chọn nếu muốn công khai tọa độ thực tế.   |
|    [Đất phù sa ngọt ven sông Tiền            ] | 5. TẢI ẢNH GIẤY TỜ / CHỨNG NHẬN (TÙY CHỌN):      |
|                                                | [ + Bấm chọn ảnh giấy VietGAP/Mã số vùng trồng] |
|                                                | (Để trống nếu chưa có, không bắt buộc)          |
+------------------------------------------------+-------------------------------------------------+
|                               [ HỦY BỎ ]          [ LƯU VÙNG SẢN XUẤT ]                          |
+--------------------------------------------------------------------------------------------------+
```

### B. Màn hình T-12: Form Mùa Vụ Canh Tác (Crop Season Form - Bảo Toàn Đầy Đủ)
```
+--------------------------------------------------------------------------------------------------+
| KHỞI TẠO MÙA VỤ CANH TÁC MỚI                                                                     |
+--------------------------------------------------------------------------------------------------+
| 1. Vùng sản xuất trực thuộc (*):                                                                 |
|    [ Vùng sầu riêng Mỹ Đức Tây (1.5 ha - Đồng Tháp / Cái Bè cũ)                                ▼] |
|                                                                                                  |
| 2. Loại cây trồng & Tên giống (*):                                                               |
|    Loại cây trồng: [ Sầu riêng                                                                ▼] |
|    Tên giống cây:  [ Ri6 (cơm vàng hạt lép)                                                    ] |
|                                                                                                  |
| 3. Tên định danh mùa vụ:                                                                         |
|    [ Vụ nghịch mùa cuối năm 2026                                                               ] |
|                                                                                                  |
| 4. Thời gian mùa vụ (*):                                                                         |
|    Ngày bắt đầu canh tác / làm bông:   [ 15/05/2026 📅 ]                                         |
|    Khoảng thời gian dự kiến thu hoạch: [ 20/10/2026 📅 ] đến [ 05/11/2026 📅 ]                   |
|                                                                                                  |
| 5. Mục tiêu canh tác / Tiêu chuẩn hướng tới:                                                     |
|    [ Hướng hữu cơ vi sinh, liên kết thu mua xuất khẩu chính ngạch                              ] |
+--------------------------------------------------------------------------------------------------+
|                               [ HỦY BỎ ]          [ TẠO MÙA VỤ MỚI ]                             |
+--------------------------------------------------------------------------------------------------+
```

### C. Màn hình T-13: Form Ghi Nhật Ký Canh Tác (Mobile-First Drawer)
```
+------------------------------------------------------------------+
| [— GẠCH KÉO TRƯỢT DRAWER TRÊN ĐIỆN THOẠI —]                      |
| ✍️ GHI NHẬT KÝ CANH TÁC TẠI VƯỜN                                 |
+------------------------------------------------------------------+
| Mùa vụ: [Vụ nghịch mùa cuối năm 2026 - Sầu riêng Ri6           ▼]|
| Ngày thực hiện: [ Hôm nay: 08/10/2026 📅 ]                       |
|                                                                  |
| CHỌN NHANH LOẠI HOẠT ĐỘNG (*):                                   |
| [ Làm đất ]  [ Bón phân ]  [ Tưới nước ]  [ Phun xịt ]  [ Cắt tỉa ] |
| [ Thu hoạch thử ]          [ Cách ly an toàn ]                   |
|                                                                  |
| Tên vật tư / Phân bón / Chế phẩm sinh học sử dụng:               |
| [ Phân hữu cơ khoáng vi sinh Trichoderma                       ] |
| Liều lượng: [ 50 kg / cả vườn                                  ] |
|                                                                  |
| Ghi chú thực địa: [ Đã bón đợt cuối, tưới ẩm nhẹ. Cây khỏe.    ] |
|                                                                  |
| CHỤP ẢNH TẠI VƯỜN: [ 📷 Bấm chụp ảnh mới ] [ Ảnh_0810.jpg ]     |
+------------------------------------------------------------------+
|           [ LƯU NHẬT KÝ VÀO DÒNG THỜI GIAN ]                     |
+------------------------------------------------------------------+
```

### D. Màn hình T-15: Form Đăng Nguồn Cung Thu Hoạch (Gợi Ý 15–30 Ngày Không Chặn)
```
+--------------------------------------------------------------------------------------------------+
| ĐĂNG NGUỒN CUNG NÔNG SẢN DỰ KIẾN THU HOẠCH                                                       |
+--------------------------------------------------------------------------------------------------+
| 1. Chọn mùa vụ cung ứng (*):                                                                     |
|    [ Vụ nghịch mùa cuối năm 2026 (Sầu riêng Ri6 - Đồng Tháp / Cái Bè cũ)                       ▼] |
|                                                                                                  |
| 2. Sản lượng dự kiến cung ứng (*):                                                               |
|    Khối lượng: [ 10.000 ] Đơn vị tính: (•) Kilôgam (kg)   ( ) Tấn                                |
|                                                                                                  |
| 3. Thời gian bắt đầu thu hoạch (*):                                                              |
|    [ 25/10/2026 📅 ] (Dự kiến thu hoạch kéo dài trong 5 - 7 ngày)                                |
|                                                                                                  |
| 💡 HƯỚNG DẪN KHUYẾN NGHỊ THỜI ĐIỂM ĐĂNG TIN (BR-031a):                                           |
| "Khuyến nghị nhà vườn nên đăng nguồn cung trước ngày thu hoạch khoảng 15 – 30 ngày để thương lái |
|  chủ động lên lịch gom hàng và có thời gian thỏa thuận mức giá tốt nhất."                         |
|                                                                                                  |
| 4. Mức giá bán tham khảo:                                                                        |
|    [ 78.000 ] VNĐ / kg  (Để trống nếu muốn thương lượng trực tiếp ngoài sàn)                     |
|                                                                                                  |
| 5. Ảnh chụp thực tế đợt trái hiện tại (Tối đa 5 ảnh thực địa):                                   |
|    [ + Tải ảnh trái tại vườn ] [Ảnh1.jpg] [Ảnh2.jpg]                                             |
+--------------------------------------------------------------------------------------------------+
|                               [ HỦY ]          [ ĐĂNG LÊN CHỢ NÔNG SẢN ]                         |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Đặc Tả Chi Tiết Các Trạng Thái Theo Từng Màn Hình Ưu Tiên

### 4.1. Màn hình T-02 (Chợ Nguồn Cung & Bản Đồ)
* **📭 Empty State:** Khi không có đợt thu hoạch nào khớp bộ lọc $\to$ Biểu tượng giỏ nông sản rỗng, nhãn: *"Không tìm thấy đợt thu hoạch nào phù hợp với bộ lọc hiện tại."*, nút `[ Đặt lại toàn bộ bộ lọc ]`.
* **⏳ Loading State:** Skeleton loader dạng shimmer card cho cột danh sách và overlay mờ trên bản đồ với thông báo: *"Đang tải dữ liệu vị trí các nhà vườn..."*.
* **❌ Error State:** Mất mạng hoặc API lỗi $\to$ Banner cảnh báo: *"Không thể tải danh sách nguồn cung. [ 🔄 Thử lại ]"*.
* **🔒 Disabled State:** Nút phân trang bị disabled khi ở trang đầu/cuối.

### 4.2. Màn hình T-03 (Chi Tiết Nguồn Cung Thu Hoạch)
* **📭 Empty State:**
  * Mục chứng nhận khi chưa có: *"Nông hộ chưa cung cấp tài liệu chứng nhận"*.
  * Dòng thời gian khi chưa có: *"Chưa có nhật ký canh tác nào được ghi nhận cho mùa vụ này"*.
* **⏳ Loading State:** Khung xương Skeleton cho ảnh lớn, thanh tiến độ 3 màu và thông tin nhà vườn.
* **❌ Error State:** Bài đăng không tồn tại hoặc đã bị ẩn do vi phạm $\to$ Màn hình thông báo lỗi: *"Nguồn cung không tồn tại hoặc đã ngừng hiển thị"*.
* **🔒 Disabled State:** Nút `[Gửi đề nghị thu mua]` bị disabled (màu xám nhạt, tooltip giải thích) khi sản lượng khả dụng bằng 0.
* **⛔ Permission Denied State:**
  * Khách vãng lai xem liên hệ: Khối SĐT/Zalo bị ẩn $\to$ Box có ổ khóa 🔒 *"Vui lòng đăng nhập để xem thông tin liên hệ của nhà vườn"* kèm nút `[ Đăng nhập ]`.
  * Trên Mobile Sticky Bar: Nút `[📞]` đổi thành `[🔒 Đăng nhập để liên hệ]`.
  * Nông dân chủ bài đăng: Nút gửi đề nghị bị ẩn (BR-040).

### 4.3. Màn hình T-04 (Truy Xuất Nguồn Gốc Công Khai)
* **📭 Empty State:** Nếu quét mã khi vụ mùa mới bắt đầu $\to$ Thông báo: *"Đợt thu hoạch đang trong giai đoạn canh tác, chưa có dữ liệu thu hái thực tế"*.
* **⏳ Loading State:** Shimmer dọc theo dòng thời gian timeline.
* **❌ Error State:** Mã QR hoặc mã lô hàng sai $\to$ Cảnh báo: *"Mã truy xuất nguồn gốc không hợp lệ hoặc chưa được kích hoạt"*.

### 4.4. Màn hình T-17 (Chi Tiết Đề Nghị Thu Mua)
* **🔒 Disabled State:** Nút `[Chấp nhận đề nghị]` bị disabled khi sản lượng khả dụng tạm thời không đủ do thỏa thuận khác đang giữ chỗ (BR-043a), kèm nhãn: *"Tạm thời chưa đủ sản lượng khả dụng do đang giữ chỗ cho thỏa thuận khác"*.
* **⛔ Permission Denied State:** Người dùng không liên quan cố tình truy cập ID đề nghị $\to$ Thông báo chặn quyền: *"Bạn không có quyền truy cập đề nghị này"*.

### 4.5. Màn hình T-19 (Chi Tiết Thỏa Thuận Thu Mua)
* **🔒 Disabled State:**
  * Khi một bên đã bấm xác nhận $\to$ Nút `[Xác nhận thỏa thuận]` của chính bên đó bị khóa/ẩn vĩnh viễn (chống xác nhận kép).
  * Khi cả hai bên đã xác nhận (`CONFIRMED`) $\to$ Toàn bộ nút Xác nhận và Hủy bị ẩn (khóa bất biến).
* **❌ Error State / Xung đột đồng thời:** Nếu thao tác xác nhận hoặc hủy bị chậm chân (do bên kia vừa hủy hoặc vừa xác nhận hoàn tất) $\to$ Banner thông báo lỗi 409 Conflict: *"Thỏa thuận đã được cập nhật bởi đối tác. Hệ thống đang tải lại trạng thái mới nhất"*.

---

## 5. Bảng Tổng Hợp Tiêu Chí UI/UX Sau Khi Hoàn Thiện

| Tiêu chí thẩm định | T-01 | T-02 | T-03 | T-04 | T-17 | T-19 | Form Farmer |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Hero Panoramic Nam Bộ đã duyệt** | ✅ | N/A | N/A | N/A | N/A | N/A | N/A |
| **Thanh tiến độ sản lượng 3 màu** | ✅ Thẻ | ✅ Cột list | ✅ Chi tiết | N/A | ✅ Check kho | ✅ Snapshot | N/A |
| **Badge "Tạm hết sản lượng khả dụng"** | ✅ | ✅ | ✅ | N/A | ✅ Disabled | N/A | N/A |
| **Nút mở Modal Form tạo đề nghị** | N/A | N/A | ✅ Modal riêng | N/A | N/A | N/A | N/A |
| **Phân quyền 4 vai trò rõ ràng** | N/A | N/A | ✅ G, B, F, A | N/A | ✅ F, B | ✅ F, B | ✅ Farmer |
| **Bảo vệ tọa độ GPS & Liên hệ** | N/A | ✅ Mặc định bảo mật | ✅ Gated contact | ✅ Vị trí gần đúng | N/A | N/A | ✅ T-10 mặc định bật |
| **Phân biệt dự kiến vs thực tế** | N/A | N/A | ✅ | ✅ Chuẩn 100% | N/A | N/A | N/A |
| **Cảnh báo pháp lý chuẩn BR-048** | N/A | N/A | N/A | ✅ Miễn trừ | N/A | ✅ Chuẩn từng chữ | N/A |
| **Chặn xác nhận kép & Cho phép hủy** | N/A | N/A | N/A | N/A | N/A | ✅ Chuẩn | N/A |
| **Xuất PDF là tính năng tùy chọn** | N/A | N/A | N/A | N/A | N/A | ✅ Tùy chọn | N/A |
| **Cơ cấu hành chính hiện hành 2026** | N/A | ✅ Chuẩn | ✅ Chuẩn | ✅ Chuẩn | N/A | ✅ Chuẩn | ✅ T-10 chuẩn |
| **Bộ lọc ngày linh hoạt (không ép 15-30)** | ✅ | ✅ Chuẩn | N/A | N/A | N/A | N/A | ✅ Box gợi ý T-15 |
| **Đầy đủ 5 trạng thái toàn cục** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 6. Điểm Dừng Phê Duyệt

* Tài liệu [docs/WIREFRAMES.md](file:///d:/laragon/www/MEKAGREEN/docs/WIREFRAMES.md) đã được hoàn thiện đầy đủ theo toàn bộ các yêu cầu của bạn.
* **Cam kết:** Giữ nguyên quy trình, không tự ý chuyển sang Giai đoạn 7 (UX Review), Design System hay code Frontend.

> 🛑 **ĐIỂM DỪNG THẨM ĐỊNH:**  
> Kính mời bạn xem xét bản cập nhật Wireframes chi tiết này. Khi bạn chính thức phê duyệt Giai đoạn 6, chúng ta sẽ bắt đầu bước tiếp theo: **Giai đoạn 7 – UX Review**.
