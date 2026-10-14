# 📱 Đặc Tả Giao Diện Chi Tiết (High-Fidelity UI Specification) — MEKAGREEN

> **Dự án:** MEKAGREEN — Nền tảng số kết nối nguồn cung nông sản Nam Bộ trước thu hoạch  
> **Giai đoạn:** Phase 9 (High-Fidelity Prototype & UI Specification)  
> **Tài liệu nguồn căn cứ (Sources of Truth):**  
> - [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)  
> - [PRODUCT_PLAN.md](./PRODUCT_PLAN.md)  
> - [BUSINESS_RULES.md](./BUSINESS_RULES.md) (BR-001 đến BR-049, ADR-001 đến ADR-009)  
> - [USER_FLOWS.md](./USER_FLOWS.md)  
> - [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md) (23 Mẫu trang T-01 đến T-23)  
> - [WIREFRAMES.md](./WIREFRAMES.md) (Khung dây chi tiết đã khóa)  
> - [UX_REVIEW.md](./UX_REVIEW.md) (8 quyết định UX đã khóa)  
> - [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (Đặc tả thiết kế đã phê duyệt & khóa)  
> **Trạng thái:** **PHASE 9 — HIGH-FIDELITY PROTOTYPE + UI LOCK: APPROVED & LOCKED**  
> **Cam kết:** Tài liệu này là **đặc tả thiết kế chi tiết đã khóa**, TUYỆT ĐỐI KHÔNG chứa mã nguồn lập trình frontend/backend, không thay đổi luồng nghiệp vụ hay cơ sở dữ liệu. Mọi thay đổi sau khi khóa bắt buộc phải có Change Request được Chủ sản phẩm phê duyệt.

---

## 1. Nguyên Tắc Trình Bày & Quy Chuẩn Chung (Global Rules)

1. **Định hướng thị giác:** Modern Vietnamese Agritech + B2B Platform + Thực tế vận hành + Tinh tế chừng mực.
2. **Bảng màu chuẩn hóa:**
   - **Primary Green:** `#2E7D32` (CTA chính, điểm nhấn điều hướng, viền focus).
   - **Dark Green:** `#1B5E20` (Header, navigation, footer, hover/active của nút chính). *Không ngụ ý chức năng thanh toán*.
   - **Light Green:** `#E8F5E9` (Nền khối truy xuất nguồn gốc, badge thành công nhẹ).
   - **Harvest Yellow:** `#F9A825` (Badge mùa vụ sắp thu hoạch, minh họa quả chín; **Bắt buộc dùng chữ đen than `#0F172A`**, cấm chữ trắng).
   - **Cream White:** `#FAFAF7` (Màu nền toàn trang, chống chói ngoài vườn ruộng).
   - **Surfaces:** `#FFFFFF` cho bề mặt thẻ và bảng biểu; viền phân tách mỏng `1px solid #CBD5E1`.
3. **Typography:** Tiêu đề `Manrope`, Nội dung & Bảng biểu `Inter`.
4. **Bộ icon:** Lucide React (Đường nét mảnh 1.5px/2px, luôn đi kèm nhãn chữ tiếng Việt cho hành động chính).
5. **Đơn vị diện tích:** Chỉ sử dụng `ha` và `m²` (không dùng quy đổi "công" cứng trong MVP).
6. **Địa danh hành chính:** Áp dụng danh mục hành chính chính thức 2026 (VD: Xã Mỹ Đức Tây, Tỉnh Đồng Tháp; Xã Chợ Lách, Tỉnh Vĩnh Long). Tên quen thuộc cũ được hiển thị phụ trong ngoặc đơn để tăng độ nhận diện thương mại.
7. **Quyền riêng tư GPS:** Tọa độ chính xác mặc định ẩn. Bản đồ và thẻ hiển thị nhãn `"🛡️ Vị trí gần đúng"`. Không tự động mở tọa độ sau khi thỏa thuận được xác nhận; hai bên trao đổi điểm lấy hàng thực tế qua điện thoại/Zalo.

---

## PHẦN A: MÀN HÌNH CÔNG KHAI & KHÁM PHÁ (PUBLIC / SHARED)

### Màn hình 1: Trang Chủ (Homepage — `T-01`)
- **A. Screen ID / Name:** `T-01` — Trang chủ MEKAGREEN (Landing Page & Sourcing Discovery)
- **B. User / Role:** Tất cả người dùng (Khách vãng lai, Bên mua, Nông dân, HTX)
- **C. Purpose:** Giới thiệu nền tảng, định vị giải pháp kết nối thu mua trước thu hoạch vùng Nam Bộ, cung cấp công cụ tìm kiếm nông sản nhanh và điều hướng vào Chợ nguồn cung.
- **D. Desktop composition (1440px):**
  - **Top Navigation (64px, Sticky):** Logo MEKAGREEN (trái), Menu liên kết `[Chợ nguồn cung]` `[Bản đồ nông sản]` `[Truy xuất]` (giữa), Nút `[Đăng nhập]` (Ghost) và `[Đăng ký]` (Primary Green) (phải).
  - **Hero Section (Full-Bleed Panoramic, 520px):** Ảnh góc rộng miệt vườn sông nước Cửu Long thực tế chất lượng cao. Lớp phủ gradient chuyển mờ `#0F172A/60%` bên trái sang trong suốt bên phải. Khối nội dung nổi bên trái:
    - Tiêu đề Display (Manrope Bold, 40px, Trắng `#FFFFFF`): *"Kết nối nguồn cung nông sản – Chủ động trước mùa thu hoạch"*.
    - Nội dung phụ (Inter, 16px, Xám bạc `#E2E8F0`): *"Nền tảng số giúp thương lái và doanh nghiệp liên kết trực tiếp với nhà vườn Nam Bộ từ 15–30 ngày trước ngày thu hoạch."*
    - Nhóm 2 nút CTA: Nút chính `[ Khám phá nguồn cung -> ]` (Primary Green `#2E7D32`), Nút phụ `[ Dành cho Nhà vườn / HTX ]` (Outline trắng, nền trong suốt).
  - **Sourcing Search Dock (Nổi chồng 50% đáy Hero, 88px, bo góc 12px, nền `#FFFFFF`, viền `#CBD5E1`):**
    - 4 ô tìm kiếm nhanh: [Tìm tên nông sản (Sầu riêng, Xoài...)] | [Tỉnh/Thành phố (Đồng Tháp, Vĩnh Long...)] | [Khoảng thời gian thu hoạch] | Nút `[ Tìm kiếm ]` (Green).
  - **3 Trụ cột cốt lõi (3 Core Pillars, 320px):** 3 cột thẻ tối giản:
    1. *Hồ sơ sản xuất số hóa:* Vùng trồng, mùa vụ và nhật ký canh tác minh bạch.
    2. *Chợ nguồn cung trước thu hoạch:* Nắm bắt sản lượng dự kiến và thời điểm cắt trái trước 15–30 ngày.
    3. *Cam kết thỏa thuận 2 bên:* Chốt kế hoạch thu mua, ghi nhận thỏa thuận điện tử không rủi ro pháp lý ảo.
  - **Nguồn cung nổi bật sắp thu hoạch (Featured Harvest Listings, lưới 4 cột):** 4 Thẻ nguồn cung thực tế (Sầu riêng Ri6, Xoài cát Hòa Lộc, Bưởi da xanh, Cam sành).
  - **Khối xem trước Bản đồ nông nghiệp (Map Preview Section):** Bản đồ thu nhỏ vùng Đông Nam Bộ & ĐBSCL, hiển thị mật độ các điểm nguồn cung kèm nút `[ Xem toàn bộ bản đồ -> ]`.
  - **Khối Minh bạch & Truy xuất (Trust Section):** Giải thích quy trình nhật ký canh tác và trách nhiệm thông tin nông hộ.
  - **Footer (Dark Green `#1B5E20`, chữ `#E2E8F0`):** Thông tin đơn vị, danh mục liên kết, liên hệ hỗ trợ nông nghiệp.
- **E. Mobile composition (375px):**
  - Top Navigation (56px): Menu Hamburger `[=]`, Logo MEKAGREEN, Nút `[Đăng nhập]`.
  - Hero thu nhỏ: Ảnh tỷ lệ 16:9, tiêu đề 26px, nút xếp chồng dọc (Primary Green trên, Secondary dưới).
  - Search Dock chuyển thành 1 ô tìm kiếm từ khóa kèm nút bấm mở Drawer bộ lọc.
  - 3 Trụ cột hiển thị dạng danh sách trượt ngang hoặc 3 khối xếp dọc ngắn gọn.
  - Nguồn cung nổi bật: Danh sách thẻ cuộn dọc (1 cột).
- **F. Main content hierarchy:** Hero Headline $\rightarrow$ Search Dock $\rightarrow$ Nguồn cung sắp thu hoạch $\rightarrow$ 3 Trụ cột $\rightarrow$ Bản đồ xem trước $\rightarrow$ Footer.
- **G. Primary CTA:** `[ Khám phá nguồn cung -> ]` (Điều hướng trực tiếp sang `T-02`).
- **H. Secondary actions:** `[ Dành cho Nhà vườn / HTX ]` (Điều hướng sang `T-06` đăng ký).
- **I. Components used:** Top Navigation, Hero Banner, Search Dock, Harvest Listing Card, Section Header, Footer.
- **J. States:** Mặc định (Normal), Đang tải ảnh nền (Skeleton mờ), Đã đăng nhập (Thay nút Đăng nhập bằng Menu Avatar).
- **K. Responsive behavior:** Từ 4 cột thẻ trên Desktop $\rightarrow$ 2 cột trên Tablet ($768\text{px}$) $\rightarrow$ 1 cột trên Mobile ($375\text{px}$).
- **L. Accessibility notes:** Tương phản chữ trên ảnh Hero đạt $> 7:1$ nhờ lớp gradient tối. Nút CTA đạt $44\text{px}$ chiều cao.
- **M. Important copy / labels:** *"Kết nối nguồn cung nông sản – Chủ động trước mùa thu hoạch"*; *"Giá tham khảo: Liên hệ / Thỏa thuận"*.
- **N. Visual notes:** Ảnh chụp thật vườn cây sum suê, quả chín trĩu cành, không dùng ảnh minh họa 3D hoạt họa.
- **O. Things explicitly NOT allowed:** Cấm số liệu KPI giả định phóng đại ("1 triệu tấn đã bán"), cấm chữ ký số cam kết, cấm hiệu ứng bong bóng glassmorphism.

---

### Màn hình 2: Chợ Nguồn Cung — Dạng Danh Sách (Marketplace List View — `T-02` List)
- **A. Screen ID / Name:** `T-02` (List View) — Chợ Nguồn cung Nông sản trước Thu hoạch
- **B. User / Role:** Bên mua / Thương lái, Khách vãng lai
- **C. Purpose:** Tìm kiếm, lọc và đối chiếu các lô nông sản sắp thu hoạch theo địa bàn, chủng loại, sản lượng và dải ngày thu hoạch.
- **D. Desktop composition (1440px):**
  - **Thanh tiêu đề trang:** Tiêu đề H1 (Manrope, 28px): *"Nguồn cung nông sản sắp thu hoạch"*; Nút chuyển chế độ `[ (•) Danh sách | ( ) Bản đồ ]` (Button Group).
  - **Bố cục 2 cột (Sidebar lọc 280px + Lưới kết quả 880px):**
    - **Sidebar Bộ lọc (Trái, 280px, bo góc 8px, viền `#CBD5E1`, nền `#FFFFFF`):**
      - Ô tìm kiếm từ khóa (Sầu riêng, Xoài...).
      - Lọc Địa bàn: Tỉnh/Thành phố (Dropdown) $\rightarrow$ Quận/Huyện $\rightarrow$ Xã/Phường (Cơ cấu 2026).
      - Lọc Nhóm nông sản (Trái cây, Rau củ, Cây có múi...).
      - Lọc Khoảng thời gian thu hoạch (Date Range Picker).
      - Lọc Sản lượng khả dụng tối thiểu (Numeric Input: [ 5 ] Tấn).
      - Nút `[ Áp dụng bộ lọc ]` (Primary) và `[ Đặt lại ]` (Ghost).
    - **Khu vực Kết quả (Phải):**
      - Thanh trạng thái: Hiển thị số lượng kết quả (VD: *"Tìm thấy 24 nguồn cung đang mở tiếp nhận"*), Dropdown sắp xếp `[ Ngày thu hoạch gần nhất (mặc định) | Sản lượng giảm dần ]`.
      - Lưới Thẻ nguồn cung (Lưới 3 cột): Mỗi thẻ hiển thị ảnh thật 16:9, Tên giống, Huy hiệu trạng thái, Vị trí gần đúng, Ngày thu hoạch dự kiến, Thanh tiến độ sản lượng có nhãn rõ ràng, Giá tham khảo và Nút `[ Xem chi tiết ]`.
      - Phân trang chuẩn: `[ Trang trước ]` `[ 1 ]` `[ 2 ]` `[ 3 ]` `[ Trang sau ]`.
- **E. Mobile composition (375px):**
  - Thanh trên cùng: Ô tìm kiếm + Nút `[ Bộ lọc (3) ]` (mở Bottom Sheet lọc) + Nút icon `[ Bản đồ ]`.
  - Danh sách thẻ 1 cột cuộn dọc: Thẻ thu gọn, hiển thị text trực tiếp: `"Còn lại: 4 tấn (40%)"`, không bắt buộc thanh 3 phân đoạn trên mobile.
- **F. Main content hierarchy:** Bộ lọc $\rightarrow$ Số lượng kết quả $\rightarrow$ Danh sách thẻ nông sản $\rightarrow$ Phân trang.
- **G. Primary CTA:** `[ Xem chi tiết nguồn cung -> ]` trên từng thẻ.
- **H. Secondary actions:** `[ Lọc kết quả ]`, `[ Chuyển sang Bản đồ ]`.
- **I. Components used:** Breadcrumbs, Filter Panel, Harvest Listing Card, Segmented Control, Pagination, Dropdown.
- **J. States:**
  - *Mặc định:* Hiển thị danh sách thẻ.
  - *Đang tải:* Lưới Skeleton 6 thẻ xám mờ nhấp nháy nhẹ.
  - *Không có kết quả:* Khối Empty State cao 240px: Minh họa giỏ hàng rỗng nhẹ nhàng, dòng chữ *"Không tìm thấy nguồn cung phù hợp với tiêu chí lọc"*, nút `[ Xóa bộ lọc ]`.
- **K. Responsive behavior:** Sidebar cố định trên Desktop $\rightarrow$ Thu vào Bottom Sheet trên Mobile.
- **L. Accessibility notes:** Nút chuyển Danh sách/Bản đồ có `aria-pressed`; bộ lọc hỗ trợ phím Tab và Enter.
- **M. Important copy / labels:** *"Vị trí gần đúng"*; *"Giá tham khảo: Liên hệ / Thỏa thuận"*; *"Đang mở tiếp nhận"*.
- **N. Visual notes:** Thẻ nền trắng sắc nét trên nền trang `#FAFAF7`, viền `1px solid #CBD5E1`.
- **O. Things explicitly NOT allowed:** Cấm hiển thị giá "0đ" hoặc "N/A" khi nông dân chưa nhập giá; cấm bỏ nhãn trạng thái chỉ dựa vào chấm màu.

---

### Màn hình 3: Chợ Nguồn Cung — Dạng Bản Đồ (Marketplace Map View — `T-02` Map)
- **A. Screen ID / Name:** `T-02` (Map View) — Bản đồ Nông sản Nam Bộ
- **B. User / Role:** Bên mua / Thương lái, Khách vãng lai
- **C. Purpose:** Trực quan hóa vị trí địa lý của các nguồn cung sắp thu hoạch trên bản đồ vùng Đông Nam Bộ và ĐBSCL để tối ưu cung đường thu mua.
- **D. Desktop composition (1440px):**
  - **Bố cục chia đôi (Split View):**
    - **Cột Danh sách kết quả & Lọc (Trái, 420px):** Thu gọn từ danh sách đầy đủ, hiển thị thanh tìm kiếm nhanh, bộ lọc gọn và danh sách thẻ tóm tắt dạng hàng dọc (Horizontal Card).
    - **Khung Bản đồ tương tác (Phải, 780px, chiều cao 100% viewport - 64px header):**
      - Bản đồ nền trung tính (màu kem - xám nhạt, viền sông rạch Nam Bộ rõ nét).
      - Các điểm đánh dấu (Markers): Biểu tượng quả/cây trong vòng tròn xanh `#2E7D32` kèm nhãn sản lượng (VD: `[ 🥭 5T ]`).
      - Điểm được chọn (Selected Marker): Vòng tròn phóng to, viền vàng hổ phách `#F9A825`, đổ bóng nổi.
      - Thẻ xem trước (Popup Preview Card) ghim phía trên Marker: Ảnh 80x60px, Tên giống, Sản lượng còn lại, Huy hiệu `"🛡️ Vị trí gần đúng"`, nút `[ Xem chi tiết lô này ]`.
- **E. Mobile composition (375px):**
  - Bản đồ chiếm 100% diện tích màn hình.
  - Nút chuyển `[ Danh sách ]` dính góc trên bên phải.
  - Khi bấm vào 1 Marker trên bản đồ: Hiện **Bottom Sheet** trượt lên từ đáy màn hình chứa thông tin tóm tắt lô nông sản và nút xem chi tiết.
- **F. Main content hierarchy:** Bộ lọc nhanh $\rightarrow$ Điểm đánh dấu trên bản đồ $\rightarrow$ Thẻ xem trước của điểm được chọn.
- **G. Primary CTA:** `[ Xem chi tiết nguồn cung ]` trong Popup/Bottom Sheet.
- **H. Secondary actions:** `[ Thu phóng bản đồ ]`, `[ Chuyển về Danh sách ]`.
- **I. Components used:** Map Container, Custom Map Marker, Map Preview Popup, Mobile Bottom Sheet, Toggle View.
- **J. States:**
  - *Mặc định:* Bản đồ tải toàn vùng Nam Bộ với các cụm điểm đánh dấu.
  - *Điểm không có tọa độ GPS:* Không vẽ điểm giả mạo giữa biển hoặc tọa độ (0,0); hiển thị thông báo trong danh sách: *"Nguồn cung tại Xã... (Chưa có tọa độ bản đồ)"*.
  - *Bảo mật GPS:* Mọi điểm Marker trên bản đồ công khai đều là **tọa độ gần đúng cấp xã** kèm nhãn `"Vị trí gần đúng"`.
- **K. Responsive behavior:** Desktop chia cột song song $\rightarrow$ Mobile bản đồ toàn màn hình + Bottom Sheet.
- **L. Accessibility notes:** Danh sách bên trái hỗ trợ duyệt bàn phím qua từng điểm tương ứng trên bản đồ.
- **M. Important copy / labels:** *"🛡️ Vị trí gần đúng: Tọa độ đã được làm mờ để bảo vệ vườn trồng của nông hộ."*
- **N. Visual notes:** Marker thiết kế hình giọt nước bo tròn thanh thoát, màu xanh lá đậm rõ nét.
- **O. Things explicitly NOT allowed:** Tuyệt đối không hiển thị tọa độ GPS chính xác; không vẽ ranh giới đa giác (Polygon/GIS phức tạp) trong MVP.

---

### Màn hình 4: Chi Tiết Nguồn Cung Thu Hoạch (Harvest Listing Detail — `T-03`)
- **A. Screen ID / Name:** `T-03` — Chi tiết Nguồn cung & Kế hoạch Thu hoạch
- **B. User / Role:** Khách vãng lai, Bên mua (đã đăng nhập), Nông dân chủ bài đăng
- **C. Purpose:** Cung cấp thông tin đầy đủ nhất về một lô nông sản sắp thu hoạch: thông tin giống, sản lượng cam kết, vùng trồng, trích lục nhật ký canh tác, giấy tờ đính kèm, thông tin liên hệ và nút gửi Đề nghị thu mua.
- **D. Desktop composition (1440px):**
  - **Breadcrumbs:** `Trang chủ > Chợ nguồn cung > Sầu riêng Ri6 (Đồng Tháp)`
  - **Khối Tiêu đề & Trạng thái:** Tiêu đề H1 *"Sầu riêng Ri6 (Cơm vàng hạt lép)"*, Huy hiệu trạng thái lớn `[● Đang mở tiếp nhận]`, Mã nguồn cung `#HL-2026-0891`.
  - **Bố cục 2 cột (Cột chính 780px + Khối hành động dính bên phải 380px):**
    - **Cột Nội dung chính (Trái, 780px):**
      - Thư viện ảnh vườn cây thật (1 ảnh lớn 600x400px + 3 ảnh nhỏ bên dưới).
      - Bảng Thông số thu hoạch: Ngày bắt đầu thu hoạch (25/10/2026), Thời gian thu hoạch dự kiến (7 ngày), Quy cách đóng gói dự kiến (Thùng carton 18kg / sọt tre).
      - Khối Phân bổ sản lượng: Tổng dự kiến (10 Tấn), Đã cam kết (4 Tấn), Đang giữ chỗ tạm thời (2 Tấn), Còn lại khả dụng (4 Tấn - 40%).
      - Khối Bối cảnh Vùng trồng & Mùa vụ: Tên vùng sản xuất (Vườn Sầu riêng Cái Bè), Địa chỉ hành chính (Xã Mỹ Đức Tây, Tỉnh Đồng Tháp), Diện tích (1.5 ha), Bản đồ vị trí gần đúng.
      - Khối Nhật ký canh tác gần đây: Hiển thị 3 mốc nhật ký gần nhất (Tưới nước, Bón phân hữu cơ, Bao trái).
      - Giấy tờ / Chứng nhận đính kèm: Ảnh chụp giấy chứng nhận VietGAP do nông dân tự tải lên kèm dòng cảnh báo: *"Tài liệu do nhà vườn cung cấp, MEKAGREEN không trực tiếp thẩm định pháp lý"*.
    - **Khối Hành động Thu mua (Phải, 380px, Sticky Sidebar):**
      - Hộp thông tin giá: `Giá tham khảo: 78.000 đ/kg` (hoặc `Giá tham khảo: Liên hệ / Thỏa thuận`).
      - Khối Thông tin Nhà vườn: Tên nông hộ/HTX, Loại tài khoản `[Hợp tác xã]`.
      - **Khu vực Liên hệ ngoại sàn (Off-platform Contact):** Nút gọi trực tiếp `[ 📞 0912.xxx.xxx ]`, Nút `[ Nhắn Zalo ]` (Chỉ mở số điện thoại khi Bên mua đã đăng nhập; nếu chưa đăng nhập hiện nút `[ 🔒 Đăng nhập để xem SĐT/Zalo ]`).
      - **Hành động Thu mua trên sàn:** Nút Primary Green lớn: `[ GỬI ĐỀ NGHỊ THU MUA -> ]` (Mở Drawer lập đề nghị).
- **E. Mobile composition (375px):**
  - Toàn bộ nội dung xếp thành 1 cột dọc liên tục.
  - Thư viện ảnh dạng Carousel vuốt ngang.
  - Hiển thị sản lượng: Dòng text trực tiếp `"Sản lượng còn lại: 4 tấn (40%)"`.
  - **Thanh Bottom Bar dính đáy màn hình (Sticky Bottom Bar, 64px):** Hiển thị phân biệt rõ ràng 2 hành động: Nút phụ `[ 📞 Gọi / Zalo ]` (Secondary Outline/Ghost) và Nút chính `[ Gửi đề nghị thu mua ]` (Primary Green). Bên mua có thể liên hệ trực tiếp với nhà vườn ngoài sàn bất cứ lúc nào mà không bắt buộc phải gửi Đề nghị thu mua trước.
- **F. Main content hierarchy:** Tên nông sản & Trạng thái $\rightarrow$ Thông số sản lượng & Ngày thu hoạch $\rightarrow$ Khối liên hệ/Đề nghị $\rightarrow$ Vùng trồng $\rightarrow$ Nhật ký $\rightarrow$ Chứng nhận.
- **G. Primary CTA:** `[ Gửi đề nghị thu mua ]` (Mở Drawer tạo Purchase Proposal).
- **H. Secondary actions:** `[ Gọi / Zalo trực tiếp ]`, `[ Chia sẻ bài đăng ]`.
- **I. Components used:** Image Gallery, Badge, Progress Bar, Sticky Action Box, Tabs, Document Preview, Map Snippet.
- **J. States:**
  - *Còn hàng khả dụng:* Nút Gửi đề nghị thu mua kích hoạt bình thường.
  - *Tạm hết sản lượng (Soft Reserve):* Huy hiệu màu Amber `[ ⏳ TẠM HẾT SẢN LƯỢNG ]`, dòng giải thích: *"Toàn bộ sản lượng hiện đang nằm trong các thỏa thuận chờ ký. Sản lượng có thể tự mở lại nếu thỏa thuận bị hủy."*, Nút Gửi đề nghị thu mua bị Disable tạm thời.
  - *Đã chốt đủ 100%:* Huy hiệu xám `[ 🔒 ĐÃ CHỐT ĐỦ SẢN LƯỢNG ]`, nút Gửi đề nghị thu mua ẩn.
  - *Chưa đăng nhập:* Khối SĐT/Zalo che dấu 3 số cuối kèm nút `[ Đăng nhập để xem liên hệ ]`.
- **K. Responsive behavior:** Khối hành động chuyển từ Sticky Sidebar sang Sticky Bottom Bar trên thiết bị di động.
- **L. Accessibility notes:** Nút gọi điện và gửi đề nghị trên mobile có kích thước chạm $> 48\text{px}$, khoảng cách an toàn tránh bấm nhầm.
- **M. Important copy / labels:** *"Vị trí gần đúng"*; *"Giá tham khảo: Liên hệ / Thỏa thuận"*; *"Sản lượng khả dụng: 4 Tấn"*.
- **N. Visual notes:** Tách bạch rõ ràng giữa hành động liên hệ ngoại sàn (gọi điện/Zalo) và hành động gửi đề nghị trên nền tảng.
- **O. Things explicitly NOT allowed:** Tuyệt đối không bắt buộc Bên mua phải gửi đề nghị mới được xem số điện thoại; không cam kết bảo lãnh giá giao dịch.

---

### Màn hình 5: Trang Truy Xuất Nguồn Gốc Công Khai (Public Traceability Page — `T-04`)
- **A. Screen ID / Name:** `T-04` — Trang Truy Xuất Nguồn Gốc Công Khai (Public Traceability Page)
- **B. User / Role:** Người tiêu dùng, Bên mua, Quản trị viên (truy cập qua URL hoặc qua việc quét mã QR in trên tem nhãn lô hàng bằng ứng dụng máy ảnh tiêu chuẩn)
- **C. Purpose:** Trang web công khai hiển thị chuỗi thông tin sản xuất thực tế (Vùng trồng, Mùa vụ, Nhật ký chăm sóc có ảnh thật, Thời điểm thu hoạch) giúp minh bạch nguồn gốc nông sản Nam Bộ. *(Lưu ý: Mã QR chỉ là điểm dẫn liên kết mở trang web này; MEKAGREEN MVP không xây dựng tính năng máy ảnh/camera scanner nội bộ trong ứng dụng).*
- **D. Desktop composition (1440px):**
  - Khung nội dung tập trung giữa màn hình (Max width 840px) mang phong cách hồ sơ minh bạch:
  - Header: Huy hiệu `[ 🛡️ HỒ SƠ NGUỒN GỐC SỐ HÓA MEKAGREEN ]`, Mã truy xuất `#TR-2026-RI6-0042`.
  - Tên nông sản lớn: Sầu riêng Ri6 — Niên vụ 2026.
  - Thông tin Nhà vườn: Hợp tác xã Nông nghiệp Xanh (Xã Mỹ Đức Tây, Tỉnh Đồng Tháp).
  - Dòng thời gian sản xuất (Vertical Production Timeline):
    - Mốc 1: Khởi đầu mùa vụ (01/05/2026) — Làm đất, cắt tỉa cành.
    - Mốc 2: Xử lý ra hoa (15/06/2026) — Phun chế phẩm sinh học vi sinh.
    - Mốc 3: Nuôi trái & Bón phân (20/07/2026) — Bón phân hữu cơ sinh học 50kg.
    - Mốc 4: Bao trái chống côn trùng (10/08/2026) — Kèm ảnh chụp thật tại vườn.
    - Mốc 5: Thu hoạch dự kiến (25/10/2026) — Sản lượng 10 tấn.
  - Khối Chứng nhận đính kèm: Giấy chứng nhận VietGAP số hiệu 1234/CN-TT (Ảnh chụp có thể phóng to).
  - Hộp Tuyên bố trách nhiệm (Disclaimer Box, Nền xám nhạt `#F1F5F9`, viền `#CBD5E1`, chữ 13px): *"Hồ sơ truy xuất được tổng hợp từ nhật ký canh tác điện tử do Hợp tác xã Nông nghiệp Xanh tự kê khai trên MEKAGREEN. MEKAGREEN đóng vai trò cung cấp công cụ lưu trữ số hóa, không đóng vai trò cơ quan cấp chứng chỉ nhà nước."*
- **E. Mobile composition (375px):**
  - Trang web di động tải cực nhanh khi người dùng quét mã tem nhãn bằng trình duyệt điện thoại.
  - Timeline co hẹp lề, ảnh nhật ký thu nhỏ có thể chạm để xem toàn màn hình. Không yêu cầu quyền truy cập camera của thiết bị.
- **F. Main content hierarchy:** Mã truy xuất & Nông sản $\rightarrow$ Nhà vườn $\rightarrow$ Dòng thời gian nhật ký $\rightarrow$ Chứng nhận $\rightarrow$ Miễn trừ trách nhiệm.
- **G. Primary CTA:** `[ Tải chứng thực PDF ]` hoặc `[ Xem bài đăng nguồn cung liên quan ]`.
- **H. Secondary actions:** `[ Chia sẻ liên kết ]`, `[ Báo cáo thông tin sai lệch ]`.
- **I. Components used:** Timeline Component, Verification Badge, Document Viewer Modal, Disclaimer Box.
- **J. States:**
  - *Mã hợp lệ:* Hiển thị đầy đủ cây tiến trình nhật ký.
  - *Mã không tồn tại / Sai mã:* Thông báo lỗi: *"Không tìm thấy thông tin nông sản cho mã truy xuất này. Vui lòng kiểm tra lại tem nhãn."*
- **K. Responsive behavior:** Chiều rộng cố định gọn gàng trên cả Mobile và Desktop.
- **L. Accessibility notes:** Timeline có đường nối dọc với độ tương phản viền $4.5:1$, biểu tượng từng mốc có nhãn phân biệt.
- **M. Important copy / labels:** *"Hồ sơ minh bạch nguồn gốc"*; *"Tài liệu do nhà vườn tự cung cấp"*.
- **N. Visual notes:** Nền trắng sáng, viền xanh lá nhẹ tạo cảm giác sạch sẽ, trung thực, nông sản an toàn.
- **O. Things explicitly NOT allowed:** Tuyệt đối không ghi các câu thổi phồng: *"MEKAGREEN chứng nhận chất lượng"*, *"Đạt chuẩn xuất khẩu 100%"*.

---

### Màn hình 6: Đăng Nhập (Login — `T-05`)
- **A. Screen ID / Name:** `T-05` — Đăng nhập hệ thống MEKAGREEN
- **B. User / Role:** Tất cả người dùng có tài khoản (Nông dân, Bên mua, Quản trị viên)
- **C. Purpose:** Xác thực danh tính người dùng bằng Số điện thoại hoặc Email, hỗ trợ điều hướng quay lại đúng trang nguồn cung đang xem dở (Redirect Back).
- **D. Desktop composition (1440px):**
  - Bố cục 2 phần đối xứng (Split Screen 50/50):
    - Cột trái (720px): Ảnh phong cảnh miệt vườn Nam Bộ phủ lớp kính mờ màu xanh lá đậm `#1B5E20/85%`, châm ngôn thương hiệu và 3 cam kết của nền tảng.
    - Cột phải (720px): Khung đăng nhập căn giữa (Max width 420px):
      - Logo MEKAGREEN + Tiêu đề H2 *"Đăng nhập tài khoản"*.
      - Ô nhập Tài khoản: Label rõ ràng *"Số điện thoại hoặc Email (*)"*, placeholder `"Nhập SĐT hoặc email..."`.
      - Ô nhập Mật khẩu: Label *"Mật khẩu (*)"*, icon ẩn/hiện mật khẩu, link *"Quên mật khẩu?"*.
      - Checkbox *"Ghi nhớ đăng nhập trên thiết bị này"*.
      - Nút Primary Green: `[ ĐĂNG NHẬP VÀO HỆ THỐNG ]`.
      - Dòng chuyển hướng: *"Chưa có tài khoản? Đăng ký làm Nhà vườn hoặc Bên mua"*.
- **E. Mobile composition (375px):**
  - Ẩn cột ảnh bên trái, hiển thị trực tiếp form đăng nhập toàn màn hình. Nút Đăng nhập mở rộng 100% chiều ngang, cao $48\text{px}$.
- **F. Main content hierarchy:** Tiêu đề $\rightarrow$ Form đăng nhập $\rightarrow$ Nút Đăng nhập $\rightarrow$ Đăng ký tài khoản mới.
- **G. Primary CTA:** `[ Đăng nhập ]`.
- **H. Secondary actions:** `[ Quên mật khẩu ]`, `[ Đăng ký ngay ]`.
- **I. Components used:** Text Input, Password Input, Checkbox, Primary Button, Alert Inline (khi sai mật khẩu).
- **J. States:**
  - *Mặc định:* Các ô trống, nút sẵn sàng.
  - *Đang xử lý (Loading):* Nút đổi sang trạng thái Disabled kèm Spinner và chữ *"Đang xác thực..."*.
  - *Lỗi đăng nhập:* Khung Alert màu đỏ nhạt `#FEF2F2` hiện trên form: *"Số điện thoại hoặc mật khẩu không chính xác. Vui lòng thử lại."*.
- **K. Responsive behavior:** Cột hình ảnh tự động ẩn trên màn hình $< 1024\text{px}$.
- **L. Accessibility notes:** Label nằm cố định phía trên ô nhập (không dùng floating label hay placeholder thay label); báo lỗi bằng chữ kèm icon tam giác cảnh báo.
- **M. Important copy / labels:** *"Số điện thoại hoặc Email"*; *"Mật khẩu"*.
- **N. Visual notes:** Form sắc nét, viền input rõ ràng `1px solid #CBD5E1`, focus có viền xanh `#2E7D32` $2\text{px}$.
- **O. Things explicitly NOT allowed:** Cấm đăng nhập qua mạng xã hội phức tạp chưa được phê duyệt; cấm ẩn label khi người dùng bắt đầu gõ.

---

### Màn hình 7: Đăng Ký & Chọn Vai Trò (Registration / Role Choice — `T-06`)
- **A. Screen ID / Name:** `T-06` — Đăng ký tài khoản mới & Thiết lập vai trò
- **B. User / Role:** Người dùng mới (Nông dân cá thể, Đại diện HTX, Thương lái, Doanh nghiệp thu mua)
- **C. Purpose:** Hướng dẫn người dùng chọn đúng vai trò (`FARMER` hoặc `BUYER`) và loại hình hoạt động để cấu hình giao diện vận hành phù hợp.
- **D. Desktop composition (1440px):**
  - Thanh tiến trình 2 bước trên đỉnh: `[ Bước 1: Chọn vai trò (Hiện tại) ] -------- [ Bước 2: Thông tin tài khoản ]`.
  - **Khối Bước 1 — Chọn vai trò (2 Thẻ lựa chọn lớn 360x280px):**
    - Thẻ 1: **NHÀ VƯỜN / HỢP TÁC XÃ (FARMER)**
      - Icon: Mầm cây & Nông trại.
      - Mô tả: *"Dành cho nông hộ cá thể hoặc hợp tác xã muốn số hóa vùng trồng, ghi nhật ký canh tác và đăng bán nông sản trước thu hoạch."*
      - Tùy chọn loại hình: Radio `(•) Nông hộ cá thể` | `( ) Hợp tác xã nông nghiệp`.
    - Thẻ 2: **THƯƠNG LÁI / ĐƠN VỊ THU MUA (BUYER)**
      - Icon: Xe tải thu mua & Bắt tay hợp tác.
      - Mô tả: *"Dành cho thương lái thu mua, nhà vựa, công ty chế biến hoặc doanh nghiệp xuất khẩu tìm kiếm nguồn nguyên liệu ổn định."*
      - Tùy chọn hồ sơ: Dropdown `[ Thương lái tự do | Doanh nghiệp thu mua / Xuất khẩu ]`.
  - **Khối Bước 2 — Điền thông tin cơ bản:**
    - Họ và tên đại diện, Số điện thoại (dùng làm kênh liên hệ chính), Tỉnh/Thành phố hoạt động, Mật khẩu & Nhập lại mật khẩu.
    - Checkbox đồng ý điều khoản dịch vụ và nguyên tắc minh bạch nông sản.
    - Nút Primary Green: `[ HOÀN TẤT ĐĂNG KÝ ]`.
- **E. Mobile composition (375px):**
  - 2 Thẻ chọn vai trò xếp chồng dọc, chạm vào thẻ sẽ viền xanh đậm `#2E7D32` và hiện dấu tích chọn. Các bước cuộn trang mượt mà.
- **F. Main content hierarchy:** Bước chọn vai trò $\rightarrow$ Bước nhập thông tin $\rightarrow$ Điều khoản $\rightarrow$ Nút Đăng ký.
- **G. Primary CTA:** `[ Hoàn tất đăng ký ]`.
- **H. Secondary actions:** `[ Đã có tài khoản? Đăng nhập ]`.
- **I. Components used:** Stepper, Selection Card, Radio Group, Input Fields, Checkbox, Primary Button.
- **J. States:** Mặc định, Đã chọn vai trò, Báo lỗi thiếu trường bắt buộc, Đang tải tạo tài khoản.
- **K. Responsive behavior:** 2 thẻ vai trò chuyển từ nằm ngang sang xếp chồng trên màn hình nhỏ.
- **L. Accessibility notes:** Thẻ vai trò có thuộc tính `role="radio"` và `aria-checked` rõ ràng.
- **M. Important copy / labels:** *"Chọn vai trò của bạn trên MEKAGREEN"*; *"Nông hộ cá thể"*; *"Hợp tác xã"*; *"Đơn vị thu mua"*.
- **N. Visual notes:** Thẻ được chọn có viền `2px solid #2E7D32` và nền xanh nhạt `#E8F5E9`.
- **O. Things explicitly NOT allowed:** Không tạo vai trò trung gian thanh toán hoặc tài khoản giao dịch tài chính.

---

## PHẦN B: MÀN HÌNH TÁC VỤ DÀNH CHO NÔNG DÂN & HTX (FARMER)

### Màn hình 8: Bảng Điều Khiển Nông Dân (Farmer Dashboard — `T-07` Farmer)
- **A. Screen ID / Name:** `T-07` (Farmer) — Bảng điều khiển Quản trị Nhà vườn
- **B. User / Role:** Nông dân, Ban quản lý Hợp tác xã (`FARMER`)
- **C. Purpose:** Trung tâm vận hành vụ mùa: Cảnh báo việc cần xử lý ngay, theo dõi các bài đăng thu hoạch sắp đến ngày cắt trái, duyệt đề nghị thu mua mới đến và lối tắt ghi nhật ký canh tác.
- **D. Desktop composition (1440px):**
  - **Bố cục khung Quản trị:** Sidebar trái (256px) + Khung nội dung chính (1120px) trên nền `#FAFAF7`.
  - **Khối "Việc cần xử lý ngay" (Action Required Banner — Đặt trên cùng, 100px):**
    - Cảnh báo màu Amber nhạt: *"Bạn có 2 Đề nghị thu mua mới từ Thương lái đang chờ phản hồi"* kèm nút `[ Xem ngay -> ]`.
    - Cảnh báo màu Xanh nhạt: *"Thỏa thuận #AG-0021 đang chờ bạn xác nhận lần cuối"* kèm nút `[ Xem thỏa thuận ]`.
  - **Lối tắt thao tác nhanh (Quick Action Bar, 64px):**
    - Nút `[ + Ghi nhật ký hôm nay ]` (Primary Green) | `[ + Đăng nguồn cung mới ]` | `[ + Tạo mùa vụ mới ]`.
  - **Khu vực Mùa vụ & Thu hoạch đang diễn ra (Lưới 2 cột 540px + 540px):**
    - Cột 1: *Mùa vụ đang chăm sóc:* Thẻ mùa vụ Sầu riêng Ri6 (Giai đoạn nuôi trái, ngày thu hoạch dự kiến 25/10/2026).
    - Cột 2: *Bài đăng nguồn cung đang mở:* Thẻ nguồn cung hiển thị thanh tiến độ sản lượng: 4 Tấn đã chốt, 2 Tấn đang giữ chỗ, 4 Tấn còn khả dụng.
  - **Bảng Đề nghị thu mua mới nhận gần đây (Bảng dữ liệu 4 hàng):**
    - Mã đề nghị, Tên thương lái/Đơn vị thu mua, Sản lượng đề xuất, Giá đề xuất, Trạng thái `[ ⏳ Chờ phản hồi ]`, Nút xem chi tiết.
- **E. Mobile composition (375px):**
  - Thanh Menu rút vào Drawer. Nút `[ + Ghi nhật ký ]` làm nổi bật ở vị trí dễ bấm nhất.
  - Các khối cảnh báo xếp chồng dọc, thẻ mùa vụ hiển thị tóm tắt, bảng đề nghị chuyển thành danh sách thẻ xếp chồng.
- **F. Main content hierarchy:** Việc cần xử lý ngay $\rightarrow$ Lối tắt thao tác $\rightarrow$ Mùa vụ & Nguồn cung đang mở $\rightarrow$ Đề nghị mới nhận.
- **G. Primary CTA:** `[ Ghi nhật ký hôm nay ]` và `[ Phản hồi đề nghị thu mua ]`.
- **H. Secondary actions:** `[ Đăng bài thu hoạch mới ]`, `[ Xem toàn bộ mùa vụ ]`.
- **I. Components used:** Operational Notice Banner, Metric Card (tối giản, không số liệu ảo), Data Table, Action Buttons.
- **J. States:**
  - *Có việc cần làm:* Banner hiển thị số lượng đề nghị chờ xử lý.
  - *Không có việc tồn đọng:* Banner xanh nhạt: *"Tất cả đề nghị và thỏa thuận đã được xử lý xong. Chúc bà con một vụ mùa bội thu!"*.
- **K. Responsive behavior:** Chuyển từ 2 cột sang 1 cột, bảng dữ liệu chuyển thành Card List trên mobile.
- **L. Accessibility notes:** Màu cảnh báo có tỷ lệ tương phản $> 6:1$ kèm icon đồng hồ cát rõ ràng.
- **M. Important copy / labels:** *"Cần xử lý ngay"*; *"Ghi nhật ký nhanh"*; *"Nguồn cung đang mở bán"*.
- **N. Visual notes:** Giao diện đậm tính vận hành, sắc nét, thực tế, tuyệt đối không có biểu đồ dạng sóng hay KPI tài chính giả lập.
- **O. Things explicitly NOT allowed:** Cấm biểu đồ phân tích doanh thu hay số dư tài khoản (MEKAGREEN không có ví tiền).

---

### Màn hình 9: Danh Sách Vùng Sản Xuất (Production Area List — `T-08`)
- **A. Screen ID / Name:** `T-08` — Quản lý Danh sách Vùng sản xuất
- **B. User / Role:** Nông dân, Ban quản lý Hợp tác xã (`FARMER`)
- **C. Purpose:** Quản lý toàn bộ danh mục các mảnh vườn, vùng nguyên liệu trực thuộc nông hộ hoặc các tổ đội thành viên trong HTX.
- **D. Desktop composition (1440px):**
  - Tiêu đề H1 *"Vùng sản xuất của tôi"*, nút Primary `[ + Thêm vùng sản xuất mới ]`.
  - Bảng dữ liệu quản lý (Table):
    - Cột 1: Tên vùng sản xuất (VD: Vườn Sầu riêng Cái Bè 1, Vườn Xoài Cát Hòa Lộc).
    - Cột 2: Địa bàn hành chính (Xã Mỹ Đức Tây, Tỉnh Đồng Tháp).
    - Cột 3: Diện tích đất chuẩn hóa (1.5 ha / 15.000 m²).
    - Cột 4: Trạng thái tọa độ (`[ Đã ghim vị trí gần đúng ]`).
    - Cột 5: Mùa vụ đang canh tác (Vụ Thu Đông 2026).
    - Cột 6: Thao tác: `[ Sửa ]` `[ Xem chi tiết ]` `[ Tạo mùa vụ ]`.
- **E. Mobile composition (375px):**
  - Chuyển thành danh sách thẻ xếp chồng: Mỗi thẻ thể hiện Tên vườn, Diện tích (ha), Địa chỉ xã/tỉnh và nút bấm `[ Xem chi tiết / Sửa ]`. Nút thêm mới gắn cố định góc trên.
- **F. Main content hierarchy:** Tiêu đề & Nút thêm mới $\rightarrow$ Bảng danh sách vùng sản xuất $\rightarrow$ Phân trang.
- **G. Primary CTA:** `[ + Thêm vùng sản xuất mới ]`.
- **H. Secondary actions:** `[ Chỉnh sửa ]`, `[ Xem chi tiết mùa vụ ]`.
- **I. Components used:** Operational Table, Action Dropdown, Status Pill, Primary Button.
- **J. States:** Mặc định (có danh sách), Rỗng (chưa có vùng nào $\rightarrow$ hướng dẫn tạo vùng đầu tiên), Đang tải.
- **K. Responsive behavior:** Table Desktop $\rightarrow$ Stacked Cards Mobile.
- **L. Accessibility notes:** Bảng có tiêu đề cột `<th scope="col">` chuẩn hóa, dòng hover rõ nét `#F8FAFC`.
- **M. Important copy / labels:** *"Vùng sản xuất"*; *"Quy mô diện tích"*; *"Địa bàn hành chính"*.
- **N. Visual notes:** Bảng có viền ngang `#E2E8F0`, màu nền trắng sạch sẽ.
- **O. Things explicitly NOT allowed:** Không tạo chức năng đo vẽ đa giác hay đo đạc bản đồ địa chính phức tạp.

---

### Màn hình 10: Form Tạo / Sửa Vùng Sản Xuất (Production Area Form — `T-10`)
- **A. Screen ID / Name:** `T-10` — Thiết lập Thông tin Vùng sản xuất
- **B. User / Role:** Nông dân, Hợp tác xã (`FARMER`)
- **C. Purpose:** Nhập và lưu trữ thông tin địa giới, quy mô diện tích và tọa độ điểm của vùng trồng để làm cơ sở liên kết mùa vụ.
- **D. Desktop composition (1440px):**
  - Form tập trung giữa màn hình (Max width 760px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Tiêu đề H2 *"Thêm mới vùng sản xuất"*.
  - Nhóm 1 — Thông tin định danh:
    - Tên vùng sản xuất (*): Ô nhập văn bản `"VD: Vườn sầu riêng Ri6 Cái Bè"`.
    - Chọn địa bàn hành chính: Tỉnh/Thành phố $\rightarrow$ Quận/Huyện $\rightarrow$ Xã/Phường (Cơ cấu 2026).
  - Nhóm 2 — Quy mô diện tích chuẩn hóa (Area Input):
    - Số lượng (*): Ô nhập số `[ 1.5 ]`.
    - Đơn vị (*): Radio lựa chọn `(•) Hécta (ha)   ( ) Mét vuông (m²)`.
    - *(Dòng chú thích: Hệ thống chuẩn hóa lưu trữ theo Hécta để phục vụ truy xuất nguồn gốc).*
  - Nhóm 3 — Tọa độ & Quyền riêng tư vị trí (GPS Control):
    - Bản đồ chọn điểm: Bấm ghim tọa độ điểm đại diện cho vườn.
    - Checkbox quyền riêng tư: `[x] Công khai vị trí gần đúng cấp xã (Khuyến nghị để bảo vệ thông tin vườn)` (Mặc định được chọn).
  - Nhóm 4 — Ảnh chụp & Giấy tờ chứng nhận (nếu có):
    - Khung tải lên ảnh chụp vườn và ảnh giấy chứng nhận VietGAP/GlobalGAP (File đính kèm).
  - Nhóm nút bấm cuối form: Nút `[ Lưu vùng sản xuất ]` (Primary Green) và `[ Hủy bỏ ]` (Ghost).
- **E. Mobile composition (375px):**
  - Form chiếm toàn màn hình, các trường xếp dọc. Bản đồ chọn điểm thu nhỏ có nút bấm `[ Lấy vị trí hiện tại ]` qua GPS thiết bị.
  - Tích hợp **Dirty Form Guard**: Nếu người dùng nhấn nút quay lại khi đang nhập dở, hiển thị hộp thoại xác nhận: *"Thông tin chưa được lưu. Bạn có chắc chắn muốn thoát?"*.
- **F. Main content hierarchy:** Thông tin tên/địa bàn $\rightarrow$ Quy mô diện tích $\rightarrow$ Tọa độ GPS $\rightarrow$ Giấy tờ đính kèm $\rightarrow$ Nút Lưu.
- **G. Primary CTA:** `[ Lưu vùng sản xuất ]`.
- **H. Secondary actions:** `[ Hủy bỏ ]`.
- **I. Components used:** Text Input, Radio Button, Area Selector, Mini Map Picker, File Upload Dropzone, Confirmation Modal.
- **J. States:** Mặc định, Đang lưu (Disabled nút + Spinner), Báo lỗi bỏ trống trường bắt buộc, Cảnh báo thoát khi chưa lưu (Dirty State).
- **K. Responsive behavior:** Bản đồ chọn điểm co giãn tự động theo chiều ngang màn hình.
- **L. Accessibility notes:** Mọi ô nhập có label cố định; thông báo lỗi có icon và text màu đỏ đậm `#991B1B`.
- **M. Important copy / labels:** *"Quy mô diện tích (ha hoặc m²)"*; *"Vị trí gần đúng"*; *"Lưu vùng sản xuất"*.
- **N. Visual notes:** Khung upload ảnh có viền nét đứt `2px dashed #94A3B8`, icon đám mây tải lên rõ ràng.
- **O. Things explicitly NOT allowed:** Tuyệt đối không cho phép nhập đơn vị "công" tự do mà không quy đổi chuẩn; không lưu bản vẽ polygon.

---

### Màn hình 11: Chi Tiết Mùa Vụ & Dòng Thời Gian Nhật Ký (Crop Season & Log Timeline — `T-11`)
- **A. Screen ID / Name:** `T-11` — Hồ sơ Mùa vụ & Dòng thời gian Nhật ký canh tác
- **B. User / Role:** Nông dân (`FARMER`), Quản trị viên, Khách xem công khai
- **C. Purpose:** Theo dõi toàn bộ quá trình sinh trưởng của một mùa vụ từ ngày xuống giống đến ngày thu hoạch; xem dòng thời gian nhật ký chăm sóc.
- **D. Desktop composition (1440px):**
  - Thẻ thông tin tổng quan mùa vụ trên đỉnh:
    - Tên mùa vụ: *"Vụ Thu Đông 2026 — Sầu riêng Ri6"*.
    - Vùng sản xuất trực thuộc: *"Vườn Sầu riêng Cái Bè (1.5 ha)"*.
    - Dải ngày mùa vụ: Bắt đầu 01/05/2026 $\rightarrow$ Thu hoạch dự kiến 25/10/2026.
    - Sản lượng dự kiến: 10 Tấn.
    - Liên kết bài đăng bán: `[ Xem bài đăng nguồn cung #HL-2026-0891 ]`.
  - Thanh thao tác: Nút Primary `[ + Ghi nhật ký canh tác mới ]`.
  - Dòng thời gian nhật ký (Vertical Timeline Component):
    - Từng mốc nhật ký gồm: Ngày ghi, Icon hoạt động (Tưới nước, Bón phân...), Tiêu đề, Vật tư/Liều lượng sử dụng, Ghi chú kỹ thuật, Ảnh chụp thực tế đính kèm.
- **E. Mobile composition (375px):**
  - Timeline thu gọn lề trái, nút `[ + Ghi nhật ký ]` ghim nổi ở góc dưới bên phải màn hình (Floating Action Button dạng dẹt) để nông dân thao tác nhanh ngay tại vườn.
- **F. Main content hierarchy:** Tổng quan mùa vụ $\rightarrow$ Nút thêm nhật ký $\rightarrow$ Dòng thời gian các hoạt động canh tác.
- **G. Primary CTA:** `[ + Ghi nhật ký canh tác mới ]`.
- **H. Secondary actions:** `[ Chỉnh sửa mùa vụ ]`, `[ Đăng bán nguồn cung ]`.
- **I. Components used:** Summary Card, Timeline, Activity Icon, Photo Thumbnail, Action Buttons.
- **J. States:** Có nhật ký (hiển thị mốc), Chưa có nhật ký (Khối rỗng hướng dẫn: *"Chưa có hoạt động canh tác nào được ghi. Hãy bấm ghi nhật ký đầu tiên"*).
- **K. Responsive behavior:** Timeline tự co giãn lề trên điện thoại thông minh.
- **L. Accessibility notes:** Các mốc thời gian sắp xếp theo thứ tự thời gian rõ ràng, ảnh có thuộc tính `alt` mô tả hoạt động.
- **M. Important copy / labels:** *"Dòng thời gian canh tác"*; *"Ghi nhật ký mới"*; *"Thu hoạch dự kiến"*.
- **N. Visual notes:** Đường nối timeline màu xanh nhạt `#86EFAC`, mốc điểm tròn xanh đậm `#2E7D32`.
- **O. Things explicitly NOT allowed:** Không đưa các thao tác kế toán chi phí vật tư phức tạp vào giao diện này.

---

### Màn hình 12: Form Tạo / Sửa Mùa Vụ (Crop Season Form — `T-12`)
- **A. Screen ID / Name:** `T-12` — Thiết lập Mùa vụ canh tác
- **B. User / Role:** Nông dân, Hợp tác xã (`FARMER`)
- **C. Purpose:** Khởi tạo chu kỳ canh tác mới gắn liền với một vùng sản xuất cụ thể; xác định giống cây trồng, thời điểm xuống giống và dải ngày dự kiến thu hoạch.
- **D. Desktop composition (1440px):**
  - Khung form căn giữa (Max width 760px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Tiêu đề H2 *"Khởi tạo mùa vụ canh tác mới"*.
  - Các trường thông tin liên kết:
    - Chọn Vùng sản xuất trực thuộc (*): Dropdown danh sách các vùng đất đã tạo ở `T-08`.
    - Tên mùa vụ (*): Ô nhập văn bản `"VD: Vụ Sầu riêng Ri6 Thu Đông 2026"`.
    - Cây trồng & Giống (*): Dropdown chọn nông sản (Sầu riêng, Xoài...) và ô nhập giống cụ thể (Ri6, Monthong, Cát Hòa Lộc...).
    - Ngày bắt đầu chu kỳ / Xuống giống (*): Date Picker.
    - Khoảng thời gian dự kiến thu hoạch (*): Date Range Picker (Từ ngày ... đến ngày ...).
    - Sản lượng dự kiến ước tính (Tùy chọn): [ 10 ] [ Tấn / Tạ / Kg ].
    - Ghi chú mùa vụ: Textarea ghi chép chế độ canh tác (Hữu cơ sinh học, tiêu chuẩn VietGAP...).
  - Nhóm nút bấm: `[ Lưu mùa vụ ]` (Primary Green) | `[ Hủy bỏ ]`.
- **E. Mobile composition (375px):**
  - Toàn bộ form hiển thị dọc trên màn hình di động. Hỗ trợ Dirty Form Guard cảnh báo nếu thoát khi chưa bấm Lưu.
- **F. Main content hierarchy:** Chọn vùng sản xuất $\rightarrow$ Thông tin giống cây $\rightarrow$ Dải ngày thu hoạch $\rightarrow$ Nút Lưu.
- **G. Primary CTA:** `[ Lưu mùa vụ ]`.
- **H. Secondary actions:** `[ Hủy bỏ ]`.
- **I. Components used:** Select Dropdown, Date Range Picker, Numeric Input, Unit Selector, Textarea.
- **J. States:** Mặc định, Đang lưu, Lỗi ngày thu hoạch trước ngày xuống giống (Validation Inline Alert).
- **K. Responsive behavior:** Form co giãn linh hoạt, bộ chọn ngày mở dạng popup thân thiện di động.
- **L. Accessibility notes:** Các trường bắt buộc có dấu hoa thị đỏ `(*)` và thuộc tính `aria-required="true"`.
- **M. Important copy / labels:** *"Vùng sản xuất trực thuộc"*; *"Thời gian dự kiến thu hoạch"*; *"Lưu mùa vụ"*.
- **N. Visual notes:** Giao diện giản dị, thân thiện với người làm vườn, không tạo cảm giác biểu mẫu hành chính rườm rà.
- **O. Things explicitly NOT allowed:** Không ép buộc nông dân phải có giấy chứng nhận mới được tạo mùa vụ.

---

### Màn hình 13: Form Ghi Nhật Ký Canh Tác (Farming Log Entry Form — `T-13`)
- **A. Screen ID / Name:** `T-13` — Ghi chép Nhật ký Canh tác Nhanh (Ưu tiên thao tác ngoài vườn)
- **B. User / Role:** Nông dân, Kỹ thuật viên HTX (`FARMER`)
- **C. Purpose:** Hỗ trợ nông dân thao tác cực nhanh bằng 1 tay trên điện thoại khi đang đứng ngoài vườn để ghi lại hoạt động tưới tiêu, bón phân, xịt thuốc, làm cỏ hoặc thu hoạch.
- **D. Desktop / Modal composition:**
  - Mở dạng Modal hộp thoại (trên Desktop) hoặc Bottom Sheet toàn phần (trên Mobile), độ rộng 520px.
  - Tiêu đề: *"Ghi nhật ký canh tác hôm nay"*.
  - **Hệ thống Chip hoạt động định sẵn (Farming Log Chips):**
    - Hàng chip có sẵn nhãn chữ + icon:
      `[ 💧 Tưới nước ]` `[ 🌱 Bón phân ]` `[ 🛡️ Phun / xử lý ]` `[ 🌿 Làm cỏ ]` `[ 🌾 Thu hoạch ]` `[ 📝 Khác ]`.
    - Khi bấm chọn một chip (VD: `[ 🌱 Bón phân ]`): Tiêu đề nhật ký tự động điền *"Bón phân cho vườn"*. Nông dân có thể gõ đè tùy ý.
  - **Ngày thực hiện:** Mặc định lấy ngày hôm nay (hỗ trợ chọn ngày đã qua nếu ghi bù).
  - **Vật tư & Liều lượng (Tùy chọn):** Ô nhập văn bản `"VD: Phân hữu cơ vi sinh 50kg, tưới ẩm gốc"`.
  - **Ghi chú thêm:** Textarea ngắn.
  - **Chụp ảnh thực tế tại vườn:** Nút bấm `[ 📷 Chụp ảnh / Chọn từ thư viện ]` cho phép đính kèm 1-3 ảnh thực tế.
  - Nhóm nút: Nút lớn `[ LƯU NHẬT KÝ CANH TÁC ]` (Primary Green) và `[ Đóng ]`.
- **E. Mobile composition (375px):**
  - Mở dạng Drawer trượt từ đáy lên (Bottom Sheet), các chip hoạt động xếp 2 hàng bấm rất vừa ngón tay cái.
  - Nút lưu nhật ký dính ở cạnh dưới, có cơ chế chống bấm trùng 2 lần (Double-submission prevention).
  - Tích hợp **Dirty Form Guard**: Cảnh báo nếu vô tình vuốt đóng khi đã nhập nội dung.
- **F. Main content hierarchy:** Chọn chip hoạt động $\rightarrow$ Ngày thực hiện $\rightarrow$ Vật tư/Ghi chú $\rightarrow$ Chụp ảnh $\rightarrow$ Nút Lưu.
- **G. Primary CTA:** `[ Lưu nhật ký canh tác ]` (Primary Green, chiều cao 48px).
- **H. Secondary actions:** `[ Chụp ảnh thực tế ]`, `[ Đóng / Hủy ]`.
- **I. Components used:** Quick Activity Chips, Date Picker, Auto-fill Input, Camera Uploader, Dirty Form Guard Modal.
- **J. States:** Mặc định (chưa chọn chip), Đã chọn chip, Đang tải ảnh, Đang lưu (Loading spinner + nút Disable).
- **K. Responsive behavior:** Modal Desktop $\rightarrow$ Fullscreen/Bottom Sheet Mobile.
- **L. Accessibility notes:** Mọi chip đều hiển thị chữ rõ nét (không chỉ dùng icon đơn độc); chiều cao chạm $> 44\text{px}$.
- **M. Important copy / labels:** *"Ghi nhật ký canh tác"*; *"Lưu nhật ký canh tác"*; *"Chụp ảnh tại vườn"*.
- **N. Visual notes:** Chip được chọn có nền xanh nhạt `#E8F5E9` và viền xanh đậm `#2E7D32` rất bắt mắt.
- **O. Things explicitly NOT allowed:** Không bắt buộc nông dân phải điền tất cả các trường chi tiết mới cho lưu; cho phép ghi nhật ký ngắn gọn.

---

### Màn hình 14: Quản Lý Nguồn Cung Của Tôi (My Harvest Listings — `T-14`)
- **A. Screen ID / Name:** `T-14` — Danh sách Bài đăng Nguồn cung Thu hoạch của Nhà vườn
- **B. User / Role:** Nông dân, Ban quản lý HTX (`FARMER`)
- **C. Purpose:** Theo dõi tất cả các bài đăng bán trước thu hoạch do mình phát hành; giám sát mức độ cam kết sản lượng và tiếp nhận đề nghị thu mua.
- **D. Desktop composition (1440px):**
  - Tiêu đề H1 *"Nguồn cung thu hoạch của tôi"*, nút Primary `[ + Đăng nguồn cung mới ]`.
  - Bộ lọc trạng thái bài đăng dạng Tabs: `[ Tất cả (5) ]` `[ Đang mở (3) ]` `[ Đã cam kết 100% (1) ]` `[ Đã đóng (1) ]`.
  - Bảng dữ liệu quản lý nguồn cung:
    - Cột 1: Mã bài đăng & Ảnh đại diện (`#HL-2026-0891`).
    - Cột 2: Nông sản & Mùa vụ (Sầu riêng Ri6 — Vụ Thu Đông 2026).
    - Cột 3: Ngày bắt đầu thu hoạch (25/10/2026 - Còn 17 ngày).
    - Cột 4: Phân bổ sản lượng (Tổng: 10T | Đã chốt: 4T | Đang giữ: 2T | Còn lại: 4T).
    - Cột 5: Trạng thái bài đăng (`[● Đang mở tiếp nhận]` hoặc `[⏳ Tạm hết sản lượng]`).
    - Cột 6: Đề nghị thu mua (Hiển thị badge `[ 2 Đề nghị mới ]`).
    - Cột 7: Thao tác: `[ Xem đề nghị ]` `[ Chỉnh sửa ]` `[ Đóng bài ]`.
- **E. Mobile composition (375px):**
  - Chuyển thành danh sách thẻ xếp chồng: Mỗi thẻ có ảnh nhỏ, Tên giống, dòng sản lượng rõ ràng `"Còn lại: 4 tấn (40%)"`, badge số lượng đề nghị mới và nút chuyển sang màn hình duyệt đề nghị.
- **F. Main content hierarchy:** Bộ lọc Tabs $\rightarrow$ Bảng danh sách bài đăng $\rightarrow$ Nút Đăng mới.
- **G. Primary CTA:** `[ + Đăng nguồn cung mới ]`.
- **H. Secondary actions:** `[ Xem đề nghị thu mua ]`, `[ Đóng bài đăng ]`.
- **I. Components used:** Tabs Navigation, Data Table, Status Badges, Progress Indicators, Action Buttons.
- **J. States:** Có bài đăng, Rỗng (chưa đăng bài nào), Bài đăng tạm hết sản lượng do giữ chỗ.
- **K. Responsive behavior:** Bảng Desktop $\rightarrow$ Thẻ xếp chồng Mobile.
- **L. Accessibility notes:** Cột số liệu căn phải chuẩn kế toán, nhãn trạng thái có icon đi kèm chữ.
- **M. Important copy / labels:** *"Nguồn cung của tôi"*; *"Đang mở tiếp nhận"*; *"Đề nghị mới"*.
- **N. Visual notes:** Thẻ bài đăng có số đề nghị mới được tô viền xanh nổi bật để thu hút chú ý.
- **O. Things explicitly NOT allowed:** Không tự ý xóa vĩnh viễn bài đăng khi đã có thỏa thuận xác nhận liên quan.

---

### Màn hình 15: Form Đăng Nguồn Cung Thu Hoạch (Harvest Listing Form — `T-15`)
- **A. Screen ID / Name:** `T-15` — Đăng bài Nguồn cung Nông sản trước Thu hoạch
- **B. User / Role:** Nông dân, Đại diện HTX (`FARMER`)
- **C. Purpose:** Đưa thông tin lô nông sản sắp thu hoạch lên Chợ và Bản đồ nông nghiệp để mời gọi các thương lái và doanh nghiệp thu mua kết nối.
- **D. Desktop composition (1440px):**
  - Khung form (Max width 800px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Tiêu đề H2 *"Đăng bài nguồn cung nông sản trước thu hoạch"*.
  - **Khối Hướng dẫn khuyến nghị (Informational Banner — Thân thiện, không chặn đăng):**
    - Khối nền xanh thông tin `#F0F9FF`, viền `#BAE6FD`, chữ `#075985`:  
      *"💡 Gợi ý hiệu quả: Bà con nên đăng bài trước ngày thu hoạch từ 15 đến 30 ngày để thương lái và doanh nghiệp kịp sắp xếp nhân công, phương tiện và kho bãi thu mua."*
  - **Nhóm 1 — Liên kết mùa vụ:**
    - Chọn Mùa vụ canh tác (*): Dropdown danh sách các mùa vụ đang diễn ra (Hệ thống tự động điền Tên nông sản, Giống cây, Vùng trồng và Vị trí).
  - **Nhóm 2 — Thông số thu hoạch:**
    - Ngày dự kiến bắt đầu thu hoạch (*): Date Picker.
    - Thời gian thu hoạch dự kiến (*): [ 7 ] Ngày.
    - Sản lượng dự kiến mở bán (*): [ 10 ] [ Tấn / Tạ / Kg ].
    - Sản lượng nhận đề nghị tối thiểu: [ 1 ] Tấn (tránh các đơn lẻ tẻ nếu không muốn).
  - **Nhóm 3 — Giá tham khảo (Tùy chọn):**
    - Mức giá tham khảo: Ô nhập số `[ 78.000 ] VNĐ / kg`.
    - Dòng hướng dẫn: *"Để trống nếu bà con muốn thương lượng trực tiếp với bên mua. Nếu để trống, hệ thống sẽ hiển thị 'Giá tham khảo: Liên hệ / Thỏa thuận'."*
  - **Nhóm 4 — Quy cách & Ảnh chụp:**
    - Quy cách đóng gói & thu hoạch: Textarea ghi chú (tiêu chuẩn độ già, đóng thùng carton, sọt, giao xô...).
    - Tải ảnh vườn cây và nông sản sắp thu hoạch (1-5 ảnh thực tế).
  - Nhóm nút bấm: Nút Primary Green `[ ĐĂNG BÀI LÊN CHỢ NGUỒN CUNG ]` và `[ Lưu nháp ]`.
- **E. Mobile composition (375px):**
  - Toàn bộ form hiển thị dọc, các ô nhập số có bàn phím ảo kiểu số (`inputmode="decimal"`). Tích hợp Dirty Form Guard khi rời trang.
- **F. Main content hierarchy:** Gợi ý 15–30 ngày $\rightarrow$ Chọn mùa vụ $\rightarrow$ Sản lượng & Ngày thu hoạch $\rightarrow$ Giá tham khảo $\rightarrow$ Quy cách $\rightarrow$ Nút Đăng.
- **G. Primary CTA:** `[ Đăng bài lên chợ nguồn cung ]`.
- **H. Secondary actions:** `[ Lưu nháp ]`, `[ Hủy bỏ ]`.
- **I. Components used:** Information Banner, Select, Date Picker, Numeric Input, Textarea, File Uploader, Form Actions.
- **J. States:** Mặc định, Đang đăng bài, Báo lỗi thiếu mùa vụ hoặc thiếu sản lượng, Cảnh báo ngày thu hoạch đã qua.
- **K. Responsive behavior:** Form co giãn linh hoạt, bộ chọn ngày mở popover tối ưu trên màn hình nhỏ.
- **L. Accessibility notes:** Banner khuyến nghị dùng màu Info chuẩn WCAG ($7.12:1$), không dùng màu cảnh báo Warning gây hoang mang.
- **M. Important copy / labels:** *"Khuyến nghị đăng trước 15–30 ngày"*; *"Giá tham khảo: Liên hệ / Thỏa thuận"*; *"Sản lượng mở bán"*.
- **N. Visual notes:** Banner hướng dẫn hiển thị biểu tượng bóng đèn nhẹ nhàng, không có viền đỏ hay vàng rực.
- **O. Things explicitly NOT allowed:** Tuyệt đối không chặn đăng nếu ngày thu hoạch nằm ngoài khoảng 15–30 ngày; không bắt buộc phải nhập giá tham khảo.

---

### Màn hình 16: Hộp Thư Đề Nghị Thu Mua Nhận Được (Purchase Proposal Inbox — `T-16` Farmer)
- **A. Screen ID / Name:** `T-16` (Farmer) — Danh sách Đề nghị Thu mua nhận được từ Bên mua
- **B. User / Role:** Nông dân, Ban quản trị HTX (`FARMER`)
- **C. Purpose:** Xem, lọc và xử lý các đề nghị thu mua do thương lái và doanh nghiệp gửi đến cho các lô nông sản sắp thu hoạch của mình.
- **D. Desktop composition (1440px):**
  - Tiêu đề H1 *"Đề nghị thu mua nhận được"*.
  - Bộ lọc trạng thái dạng Tab: `[ Tất cả ]` `[ ⏳ Chờ phản hồi (2) ]` `[ ✓ Đã chấp thuận ]` `[ ✕ Đã từ chối ]` `[ ⌛ Hết hạn / Đã rút ]`.
  - Bảng danh sách đề nghị (Table):
    - Cột 1: Mã đề nghị (`#PP-2026-0142`) & Ngày gửi.
    - Cột 2: Bên gửi đề nghị (Tên đơn vị thu mua / Thương lái, SĐT, Loại hình: Doanh nghiệp XK).
    - Cột 3: Nguồn cung áp dụng (Sầu riêng Ri6 — Lô #HL-0891).
    - Cột 4: Sản lượng đề xuất (3 Tấn).
    - Cột 5: Giá đề xuất mua (76.000 đ/kg).
    - Cột 6: Trạng thái đề nghị (`[ ⏳ Chờ phản hồi ]`).
    - Cột 7: Thao tác nhanh: Nút `[ Xem chi tiết & Phản hồi -> ]` (Primary).
- **E. Mobile composition (375px):**
  - Bảng chuyển thành danh sách thẻ đề nghị: Mỗi thẻ hiển thị rõ Tên thương lái, Sản lượng đề xuất, Giá mua và nút `[ Phản hồi đề nghị ]`.
- **F. Main content hierarchy:** Bộ lọc Tabs $\rightarrow$ Bảng danh sách đề nghị $\rightarrow$ Phân trang.
- **G. Primary CTA:** `[ Xem chi tiết & Phản hồi ]` trên từng đề nghị chờ xử lý.
- **H. Secondary actions:** `[ Lọc theo nguồn cung ]`.
- **I. Components used:** Tabs, Status Pills, Operational Table, Action Buttons.
- **J. States:** Có đề nghị chờ phản hồi, Không có đề nghị nào (Empty State), Đề nghị đã quá hạn phản hồi.
- **K. Responsive behavior:** Table Desktop $\rightarrow$ Stacked Card List Mobile.
- **L. Accessibility notes:** Đề nghị mới có nhãn chấm đỏ thông báo đi kèm chữ *"Mới"*.
- **M. Important copy / labels:** *"Chờ phản hồi"*; *"Sản lượng đề xuất"*; *"Giá đề xuất"*.
- **N. Visual notes:** Dòng đề nghị chờ phản hồi có nền trắng kem nhẹ `#FAFAF7` để phân biệt với các đề nghị đã xử lý xong.
- **O. Things explicitly NOT allowed:** Không tạo chức năng thương lượng trả giá qua lại nhiều vòng phức tạp trên sàn (nông dân đồng ý hoặc từ chối; trao đổi chi tiết diễn ra qua SĐT/Zalo).

---

### Màn hình 17: Chi Tiết Đề Nghị Thu Mua (Purchase Proposal Detail — `T-17` Farmer)
- **A. Screen ID / Name:** `T-17` (Farmer) — Chi tiết Đề nghị & Phản hồi Chấp thuận / Từ chối
- **B. User / Role:** Nông dân (`FARMER`)
- **C. Purpose:** Xem chi tiết các điều khoản đề xuất của thương lái; thực hiện hành động **Đồng ý** (tự động chuyển sang tạo Thỏa thuận thu mua và tạm giữ sản lượng Soft Reserve) hoặc **Từ chối đề nghị**.
- **D. Desktop composition (1440px):**
  - Khung chi tiết dạng văn kiện (Max width 840px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Header: Tiêu đề H2 *"Chi tiết đề nghị thu mua #PP-2026-0142"*, Huy hiệu trạng thái `[ ⏳ Chờ phản hồi ]`.
  - Khối Thông tin Bên mua:
    - Đơn vị gửi: Công ty TNHH Nông sản Xuất khẩu Miền Tây.
    - Người đại diện: Trần Văn B (SĐT: 0988.xxx.xxx | Zalo đã kết nối).
  - Bảng Tóm tắt Điều khoản đề xuất:
    - Nông sản: Sầu riêng Ri6 (Thu hoạch dự kiến 25/10/2026).
    - Sản lượng đề xuất mua: **3 Tấn** (Trên tổng số 4 Tấn còn khả dụng của lô).
    - Mức giá đề xuất: **76.000 VNĐ / kg**.
    - Phương thức lấy hàng đề xuất: *"Đưa xe tải thùng lạnh đến lấy trực tiếp tại địa bàn xã"*.
    - Ghi chú điều khoản của bên mua: *"Cam kết đặt cọc 20% khi chốt thỏa thuận, thu hoạch giao nhận trong 2 ngày"*.
  - **Khối Cảnh báo Tác vụ (Action Warning Box):**
    - Dòng chữ hướng dẫn: *"Khi bấm 'Đồng ý', hệ thống sẽ tự động tạo bản Thỏa thuận thu mua và tạm giữ 3 Tấn sản lượng cho bên mua này. Hai bên sẽ cần cùng bấm 'Xác nhận' trên bản Thỏa thuận để chốt chính thức."*
  - **Nhóm nút Hành động Phản hồi:**
    - Nút Primary Green lớn: `[ ✓ ĐỒNG Ý ĐỀ NGHỊ (TẠO THỎA THUẬN) ]`.
    - Nút Outline Đỏ: `[ ✕ TỪ CHỐI ĐỀ NGHỊ NÀY ]` (Mở popup hỏi lý do từ chối ngắn gọn).
    - Nút `[ 📞 Gọi trao đổi trước khi bấm ]` (Secondary).
- **E. Mobile composition (375px):**
  - Bố cục dọc toàn màn hình. 2 nút bấm chính dính ở thanh đáy (Sticky Bottom Bar) giúp nông dân thao tác thuận tiện: Nút Đồng ý chiếm 70% chiều ngang, nút Từ chối chiếm 30%.
- **F. Main content hierarchy:** Trạng thái đề nghị $\rightarrow$ Thông tin bên mua $\rightarrow$ Điều khoản đề xuất $\rightarrow$ Hướng dẫn $\rightarrow$ Nút Đồng ý / Từ chối.
- **G. Primary CTA:** `[ Đồng ý đề nghị (Tạo thỏa thuận) ]`.
- **H. Secondary actions:** `[ Từ chối đề nghị ]`, `[ Gọi điện thoại cho thương lái ]`.
- **I. Components used:** Detailed Key-Value Grid, Status Badge, Warning Callout, Action Buttons, Reason Modal.
- **J. States:**
  - *Chờ phản hồi (Pending):* Các nút hành động kích hoạt.
  - *Đã chấp thuận (Accepted):* Nút đổi thành liên kết: `[ Xem Thỏa thuận thu mua đã tạo -> ]`.
  - *Đã từ chối (Rejected):* Hiển thị dòng lý do từ chối và dấu thời gian.
  - *Bên mua đã rút / Hết hạn:* Nút bị vô hiệu hóa kèm thông báo phù hợp.
- **K. Responsive behavior:** Nhóm nút phản hồi chuyển từ chân form sang Sticky Bottom Bar trên thiết bị di động.
- **L. Accessibility notes:** Nút Đồng ý (Xanh) và Từ chối (Đỏ) có độ tương phản văn bản đạt chuẩn WCAG AAA; có hộp thoại xác nhận thứ hai trước khi thực hiện hành động từ chối.
- **M. Important copy / labels:** *"Đồng ý đề nghị"*; *"Từ chối đề nghị"*; *"Tạo Thỏa thuận thu mua"*.
- **N. Visual notes:** Thiết kế sạch sẽ, rõ ràng như một phiếu giao dịch thương mại nông sản nghiêm túc.
- **O. Things explicitly NOT allowed:** Không tạo chức năng sửa số lượng hay sửa giá trực tiếp tại bước này (nếu muốn thay đổi, hai bên gọi điện trao đổi để bên mua gửi đề nghị mới hoặc từ chối đề nghị cũ).

---

### Màn hình 18: Chi Tiết Thỏa Thuận Thu Mua (Procurement Agreement Detail — `T-19` Farmer & Buyer View)
- **A. Screen ID / Name:** `T-19` — Chi tiết & Xác nhận Thỏa thuận Thu mua Hai bên
- **B. User / Role:** Nông dân (`FARMER`), Bên mua (`BUYER`), Quản trị viên (`ADMIN`)
- **C. Purpose:** Văn bản ghi nhận cam kết giao thương chính thức trên nền tảng: Thể hiện tiến trình xác nhận độc lập của 2 bên (Two distinct confirmations), quản lý trạng thái giữ chỗ sản lượng (Soft Reserve) và cơ chế hủy thỏa thuận minh bạch kèm lịch sử ghi vết (Audit Trail).
- **D. Desktop composition (1440px):**
  - Khung văn bản thỏa thuận trang trọng (Max width 880px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - **Header Thỏa thuận:**
    - Tiêu đề H2 *"THỎA THUẬN THU MUA NÔNG SẢN"* (Số hiệu: `#AG-2026-0089`).
    - Huy hiệu trạng thái lớn ở góc:
      - Khi chưa đủ 2 bên: `[ ⏳ CHỜ XÁC NHẬN HAI BÊN ]` (Màu Hổ phách/Amber).
      - Khi đã đủ 2 bên: `[ 🛡️ THỎA THUẬN ĐÃ XÁC NHẬN TRÊN HỆ THỐNG ]` (Màu Xanh lá cây).
      - Khi bị hủy: `[ ✕ THỎA THUẬN ĐÃ BỊ HỦY ]` (Màu Đỏ).
  - **Hộp Miễn trừ Pháp lý bắt buộc (Legal Clarity Notice Box, Nền `#F8FAFC`, viền `#CBD5E1`):**
    - Dòng chữ quy chuẩn: *"Lưu ý: Đây là biên bản ghi nhận cam kết giao dịch trên nền tảng MEKAGREEN nhằm xác lập số lượng và thời gian thu hoạch giữa hai bên. Bản ghi nhận này KHÔNG PHẢI là hợp đồng điện tử có chữ ký số theo quy định chứng thực pháp lý nhà nước."*
  - **Khối Thông tin Chủ thể (2 cột đối xứng):**
    - Bên Bán (Nhà vườn / HTX): Tên chủ vườn, Địa chỉ, Số điện thoại.
    - Bên Mua (Thương lái / Doanh nghiệp): Tên công ty/Thương lái, Địa chỉ, Số điện thoại.
  - **Khối Điều khoản Thỏa thuận (Bảng tóm tắt):**
    - Nông sản: Sầu riêng Ri6 (Vụ Thu Đông 2026 — Vườn Cái Bè).
    - Sản lượng cam kết chốt: **3 Tấn** (3.000 kg).
    - Mức giá thỏa thuận: **76.000 VNĐ / kg** (Tổng giá trị ước tính: 228.000.000 VNĐ - Để hai bên tự thanh toán ngoài sàn).
    - Thời gian thu hoạch & giao nhận dự kiến: Từ ngày 25/10/2026 đến 30/10/2026.
    - Địa điểm lấy hàng: Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Địa điểm cụ thể do 2 bên trao đổi qua điện thoại).
  - **Khối Tiến Trình Xác Nhận 2 Bên (Two-Party Confirmation Tracker):**
    - Hộp 1: **Phía Nhà vườn:**  
      - Nếu chưa bấm: `[ ⏳ Chưa xác nhận ]`.
      - Nếu đã bấm: `[ ✓ ĐÃ XÁC NHẬN ]` lúc 14:30 08/10/2026 bởi Nông dân Nguyễn Văn A.
    - Hộp 2: **Phía Bên mua:**  
      - Nếu chưa bấm: `[ ⏳ Chưa xác nhận ]`.
      - Nếu đã bấm: `[ ✓ ĐÃ XÁC NHẬN ]` lúc 15:10 08/10/2026 bởi Thương lái Trần Văn B.
  - **Khối Hành động Người dùng:**
    - Trường hợp người xem chưa bấm xác nhận: Nút Primary Green lớn `[ XÁC NHẬN THỎA THUẬN THU MUA ]` (Kèm hộp thoại cảnh báo: *"Khi xác nhận, bạn cam kết thực hiện đúng sản lượng và thời gian đã thỏa thuận"*).
    - Trường hợp người xem đã bấm xác nhận, đang chờ đối tác: Hiển thị dòng trạng thái xanh nhạt *"Bạn đã xác nhận thành công. Đang chờ đối tác xác nhận..."*.
    - **Hành động Hủy thỏa thuận (Unconfirmed Cancellation):** Nút Ghost Đỏ `[ Hủy thỏa thuận này ]` (Chỉ hiển thị khi thỏa thuận CHƯA được cả 2 bên xác nhận xong).
    - Nút `[ Tải bản in PDF / Lưu trữ ]` (Secondary).
- **E. Mobile composition (375px):**
  - Toàn bộ khối văn bản xếp thành 1 cột dọc rõ ràng.
  - Tiến trình xác nhận 2 bên hiển thị dạng 2 thẻ ngang liên tiếp.
  - Nút Xác nhận thỏa thuận hiển thị nổi bật ở đáy màn hình (cao $48\text{px}$).
- **F. Main content hierarchy:** Mã số & Trạng thái $\rightarrow$ Miễn trừ pháp lý $\rightarrow$ Thông tin 2 bên $\rightarrow$ Điều khoản sản lượng & giá $\rightarrow$ Tiến trình xác nhận $\rightarrow$ Nút Xác nhận / Hủy.
- **G. Primary CTA:** `[ Xác nhận thỏa thuận thu mua ]` (khi chưa xác nhận).
- **H. Secondary actions:** `[ Hủy thỏa thuận này ]`, `[ Tải bản in PDF ]`, `[ Gọi điện thoại cho đối tác ]`.
- **I. Components used:** Legal Notice Box, Two-column Entity Grid, Terms Table, Confirmation Progress Card, Cancellation Modal, Action Buttons.
- **J. States:**
  - *Chờ cả hai bên xác nhận (PENDING_CONFIRMATION):* Cả 2 hộp trạng thái hiện đồng hồ cát, sản lượng 3 Tấn ở trạng thái Soft Reserve.
  - *Một bên đã bấm xác nhận:* Hộp của bên đó đổi sang màu xanh có dấu tích và timestamp; hộp bên kia hiện đồng hồ cát.
  - *Cả hai bên đã xác nhận (CONFIRMED):* Huy hiệu chuyển sang màu Xanh lá chính thức `[ 🛡️ ĐÃ XÁC NHẬN ]`, sản lượng 3 Tấn chuyển thành `committedQuantity`, nút Hủy tự động ẩn.
  - *Bị hủy trước khi hoàn tất (CANCELLED — Tuân thủ Quyết định Giai đoạn 7):*  
    - Huy hiệu chuyển sang màu Đỏ `[ ✕ THỎA THUẬN ĐÃ BỊ HỦY ]`.
    - **Khối Lịch sử vết hủy (Cancellation Audit Trail):** Hiển thị rõ:
      - Người thực hiện hủy: Thương lái Trần Văn B (hoặc Nhà vườn).
      - Thời điểm hủy: 16:45 ngày 08/10/2026.
      - Lý do hủy chính thức: `[ Thay đổi kế hoạch vận chuyển / xe cộ ]`.
      - Ghi chú thêm: *"Xe tải lạnh 5 tấn bị hỏng đột xuất không kịp về Cái Bè trong dải ngày này"*.
    - Sản lượng 3 Tấn tự động được giải phóng trả về `availableQuantity` của bài đăng nguồn cung.
- **K. Responsive behavior:** Form co giãn vừa vặn trên điện thoại, đảm bảo người nông dân đọc rõ từng con số sản lượng và đơn giá ngoài đồng ruộng.
- **L. Accessibility notes:** Nút Xác nhận có trạng thái Loading chống bấm đúp; nút Hủy yêu cầu bắt buộc chọn lý do từ danh mục định sẵn trước khi cho phép bấm xác nhận hủy.
- **M. Important copy / labels:** *"Thỏa thuận thu mua nông sản"*; *"Tiến trình xác nhận 2 bên"*; *"Biên bản ghi nhận cam kết (Không phải chữ ký số)"*; *"Hủy thỏa thuận"*.
- **N. Visual notes:** Văn phong chững chạc, uy tín, nghiêm túc; các con số sản lượng và đơn giá in đậm to rõ ràng.
- **O. Things explicitly NOT allowed:** Tuyệt đối không dùng các từ: *"Hợp đồng điện tử có giá trị pháp lý"*, *"Chữ ký số hợp chuẩn"*, *"Bảo lãnh thanh toán"*; không tạo quy trình tranh chấp khiếu nại phức tạp trên sàn.

---

### Màn hình 19: Hồ Sơ Cá Nhân & Cài Đặt Nhà Vườn (Farmer Profile — `T-20` Farmer)
- **A. Screen ID / Name:** `T-20` (Farmer) — Hồ sơ Nhà vườn & Thiết lập Liên hệ Công khai
- **B. User / Role:** Nông dân, Đại diện HTX (`FARMER`)
- **C. Purpose:** Quản lý thông tin giới thiệu nhà vườn, số điện thoại hotline, đường link Zalo/Facebook để người mua liên hệ trực tiếp ngoài sàn.
- **D. Desktop composition (1440px):**
  - Khung quản lý (Max width 760px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Tiêu đề H2 *"Hồ sơ nhà vườn & Thông tin liên hệ"*.
  - Khối định danh: Ảnh đại diện / Logo vườn, Tên nông hộ/HTX, Huy hiệu loại tài khoản `[ Hợp tác xã Nông nghiệp ]`.
  - Các trường thông tin công khai:
    - Số điện thoại liên hệ chính (*): Ô nhập SĐT (hiển thị cho Bên mua đã đăng nhập).
    - Đường dẫn / Số Zalo kết nối: Ô nhập link Zalo hoặc SĐT Zalo.
    - Trang Facebook / Fanpage nhà vườn: Ô nhập link (tùy chọn).
    - Địa chỉ thường trú / Trụ sở HTX: Địa danh hành chính 2026.
    - Giới thiệu chung về năng lực canh tác: Textarea mô tả các loại trái cây thế mạnh, kinh nghiệm trồng trọt.
  - Nút Primary Green `[ Lưu thay đổi hồ sơ ]`.
- **E. Mobile composition (375px):** Giao diện 1 cột cuộn dọc, nút Lưu dính ở cạnh dưới.
- **F. Main content hierarchy:** Thông tin định danh $\rightarrow$ Kênh liên hệ công khai $\rightarrow$ Giới thiệu $\rightarrow$ Nút Lưu.
- **G. Primary CTA:** `[ Lưu thay đổi hồ sơ ]`.
- **H. Secondary actions:** `[ Đổi mật khẩu ]`, `[ Đăng xuất ]`.
- **I. Components used:** Avatar Uploader, Input Fields, Textarea, Badge, Primary Button.
- **J. States:** Mặc định, Đang lưu thông tin, Báo lỗi sai định dạng SĐT.
- **K. Responsive behavior:** Form co giãn toàn chiều ngang trên mobile.
- **L. Accessibility notes:** Nhãn điện thoại và Zalo có giải thích rõ về quyền hiển thị cho người mua đăng nhập.
- **M. Important copy / labels:** *"Thông tin liên hệ công khai"*; *"Kênh Zalo kết nối"*; *"Lưu thay đổi"*.
- **N. Visual notes:** Đơn giản, rõ ràng, tập trung vào kênh kết nối thực tế của bà con nông dân.
- **O. Things explicitly NOT allowed:** Không tạo chức năng cài đặt thanh toán ngân hàng hay ví điện tử.

---

## PHẦN C: MÀN HÌNH TÁC VỤ DÀNH CHO BÊN MUA & THƯƠNG LÁI (BUYER)

### Màn hình 20: Bảng Điều Khiển Bên Mua (Buyer Dashboard — `T-07` Buyer)
- **A. Screen ID / Name:** `T-07` (Buyer) — Bảng điều khiển Thu mua Nông sản
- **B. User / Role:** Thương lái, Doanh nghiệp thu mua, Nhà máy chế biến (`BUYER`)
- **C. Purpose:** Trung tâm quản lý nguồn cung đã liên kết: Giám sát các đề nghị thu mua đang chờ nhà vườn phản hồi, theo dõi các thỏa thuận thu mua đã chốt và thời gian thu hoạch dự kiến.
- **D. Desktop composition (1440px):**
  - **Khối Cảnh báo Vận hành (Action Banner, 80px):**
    - Cảnh báo màu Xanh dương: *"Bạn có 1 Thỏa thuận thu mua mới được Nhà vườn chấp thuận, đang chờ bạn bấm xác nhận"* kèm nút `[ Xác nhận ngay -> ]`.
  - **3 Thẻ Thống kê Vận hành tóm tắt:**
    - Thẻ 1: *Đề nghị đang chờ phản hồi (3 đề nghị — 12 Tấn)*.
    - Thẻ 2: *Thỏa thuận đã chốt thành công (4 thỏa thuận — 25 Tấn)*.
    - Thẻ 3: *Đợt thu hoạch sắp diễn ra trong 7 ngày tới (1 đợt — Sầu riêng Ri6 Cái Bè)*.
  - **Khu vực Lịch thu hoạch sắp tới (Harvest Schedule Timeline):** Danh sách các lô đã chốt kèm ngày bắt đầu thu hoạch dự kiến và số điện thoại nhà vườn để chuẩn bị phương tiện xe cộ.
  - **Bảng Đề nghị thu mua đã gửi gần đây (Table 4 hàng):** Mã đề nghị, Tên nhà vườn/HTX, Nông sản, Sản lượng đề xuất, Giá, Trạng thái `[ ⏳ Chờ phản hồi ]` hoặc `[ ✓ Chấp thuận ]`.
- **E. Mobile composition (375px):**
  - Khối cảnh báo xếp trên cùng, 3 thẻ thống kê trượt ngang, danh sách lịch thu hoạch hiển thị dạng thẻ xếp chồng.
- **F. Main content hierarchy:** Cảnh báo thỏa thuận chờ ký $\rightarrow$ 3 Thẻ tiến độ thu mua $\rightarrow$ Lịch thu hoạch sắp tới $\rightarrow$ Đề nghị đã gửi.
- **G. Primary CTA:** `[ Khám phá thêm nguồn cung mới ]` (Dẫn sang `T-02`).
- **H. Secondary actions:** `[ Quản lý thỏa thuận ]`, `[ Xem chi tiết đề nghị ]`.
- **I. Components used:** Operational Banner, Metric Tiles, Schedule List, Data Table, Action Buttons.
- **J. States:** Có thỏa thuận chờ xác nhận, Chưa có giao dịch nào (Empty State dẫn sang Chợ nguồn cung).
- **K. Responsive behavior:** 3 thẻ thống kê chuyển thành dạng cuộn ngang (Swipeable Cards) trên mobile.
- **L. Accessibility notes:** Các con số sản lượng có đơn vị (Tấn, Kg) đi kèm, không viết tắt mơ hồ.
- **M. Important copy / labels:** *"Lịch thu hoạch sắp tới"*; *"Đề nghị đang chờ phản hồi"*; *"Thỏa thuận đã chốt"*.
- **N. Visual notes:** Sắc nét, mang phong cách giao diện điều phối vận tải/kho vận chuyên nghiệp.
- **O. Things explicitly NOT allowed:** Không có chức năng thanh toán trực tuyến tiền cọc trên sàn.

---

### Màn hình 21: Drawer Gửi Đề Nghị Thu Mua (Submit Purchase Proposal Drawer — Tích hợp từ `T-03`)
- **A. Screen ID / Name:** `T-03-Drawer` — Biểu mẫu Lập Đề nghị Thu mua Nông sản
- **B. User / Role:** Bên mua đã đăng nhập (`BUYER`)
- **C. Purpose:** Cho phép Bên mua gửi đề xuất chính thức về sản lượng, giá mua và thời gian thu hoạch đến Nông dân chủ bài đăng.
- **D. Desktop / Drawer composition:**
  - Mở dạng Drawer trượt từ cạnh phải màn hình (Right Slide-over Drawer, độ rộng 460px).
  - Tiêu đề: *"Gửi đề nghị thu mua nông sản"*.
  - Khối Tóm tắt nguồn cung: Sầu riêng Ri6 (Mã #HL-0891) — Còn khả dụng: **4 Tấn**.
  - Các trường biểu mẫu:
    - Sản lượng đề xuất mua (*): Ô nhập số `[ 3 ]` [ Tấn ]  
      *(Cảnh báo validation nếu nhập vượt quá 4 Tấn: "Sản lượng đề xuất không được vượt quá 4 Tấn còn khả dụng")*.
    - Mức giá đề xuất mua (*): Ô nhập số `[ 76.000 ]` [ VNĐ / kg ]  
      *(Dòng gợi ý: Giá tham khảo của nhà vườn là 78.000 đ/kg)*.
    - Ngày dự kiến đến lấy hàng (*): Date Picker trong dải ngày thu hoạch của nhà vườn.
    - Phương thức lấy hàng dự kiến: Radio `(•) Đến tận vườn cắt trái   ( ) Nhận tại điểm tập kết xã`.
    - Ghi chú & Điều khoản thương lượng: Textarea ghi chép thêm (tiêu chuẩn phân loại trái, cọc...).
  - Nhóm nút bấm: Nút Primary Green lớn `[ GỬI ĐỀ NGHỊ THU MUA ]` và `[ Đóng ]`.
- **E. Mobile composition (375px):**
  - Mở dạng Bottom Sheet trượt từ đáy màn hình chiếm 90% chiều cao màn hình. Nút Gửi đề nghị dính ở cạnh dưới. Có Dirty Form Guard nếu người dùng lỡ tay vuốt đóng.
- **F. Main content hierarchy:** Tóm tắt nguồn cung $\rightarrow$ Sản lượng đề xuất $\rightarrow$ Giá đề xuất $\rightarrow$ Ngày lấy hàng $\rightarrow$ Nút Gửi.
- **G. Primary CTA:** `[ Gửi đề nghị thu mua ]`.
- **H. Secondary actions:** `[ Đóng ]`.
- **I. Components used:** Slide-over Drawer, Numeric Input, Unit Label, Date Picker, Validation Message, Primary Button.
- **J. States:**
  - *Mặc định:* Các trường trống, hiển thị sản lượng khả dụng tối đa.
  - *Lỗi quá sản lượng:* Viền ô nhập đỏ rực, hiện chữ: *"Sản lượng vượt quá 4 Tấn còn khả dụng của bài đăng"*.
  - *Đang gửi:* Nút chuyển sang Disabled kèm spinner *"Đang gửi đề nghị..."* để chống bấm đúp (Double submission).
  - *Gửi thành công:* Toast thông báo màu xanh: *"Đề nghị thu mua đã được gửi đến nhà vườn thành công!"*.
- **K. Responsive behavior:** Slide-over Drawer Desktop $\rightarrow$ Fullscreen Bottom Sheet Mobile.
- **L. Accessibility notes:** Focus tự động di chuyển vào ô nhập đầu tiên khi mở Drawer; bấm phím Escape để đóng.
- **M. Important copy / labels:** *"Sản lượng đề xuất (Tấn)"*; *"Mức giá đề xuất (VNĐ/kg)"*; *"Gửi đề nghị thu mua"*.
- **N. Visual notes:** Nền trắng sạch sẽ, viền input rõ ràng, độ tương phản văn bản cao.
- **O. Things explicitly NOT allowed:** Không yêu cầu thanh toán ký quỹ hay nhập thông tin thẻ tín dụng/ngân hàng.

---

### Màn hình 22: Danh Sách Đề Nghị Đã Gửi Của Bên Mua (My Purchase Proposals — `T-16` Buyer)
- **A. Screen ID / Name:** `T-16` (Buyer) — Quản lý Đề nghị Thu mua Đã gửi
- **B. User / Role:** Bên mua / Thương lái (`BUYER`)
- **C. Purpose:** Theo dõi trạng thái phản hồi của các nhà vườn đối với những đề nghị mình đã gửi; cho phép rút lại đề nghị nếu chưa được nhà vườn chấp thuận.
- **D. Desktop composition (1440px):**
  - Tiêu đề H1 *"Đề nghị thu mua đã gửi"*.
  - Bộ lọc trạng thái Tabs: `[ Tất cả ]` `[ ⏳ Đang chờ phản hồi (3) ]` `[ ✓ Nhà vườn đã đồng ý (1) ]` `[ ✕ Bị từ chối ]` `[ ↩ Đã rút ]`.
  - Bảng dữ liệu quản lý đề nghị:
    - Cột 1: Mã đề nghị (`#PP-2026-0142`) & Ngày gửi.
    - Cột 2: Nhà vườn nhận đề nghị (HTX Nông nghiệp Xanh, SĐT, Xã Mỹ Đức Tây).
    - Cột 3: Nông sản & Sản lượng đề xuất (Sầu riêng Ri6 — 3 Tấn).
    - Cột 4: Mức giá đề xuất (76.000 đ/kg).
    - Cột 5: Trạng thái đề nghị (`[ ⏳ Chờ phản hồi ]` hoặc `[ ✓ Đã chấp thuận ]`).
    - Cột 6: Thao tác:
      - Nếu trạng thái là `PENDING`: Nút `[ Rút đề nghị ]` (Ghost Đỏ) và `[ Xem chi tiết ]`.
      - Nếu trạng thái là `ACCEPTED`: Nút Primary Green `[ Đi đến Thỏa thuận để xác nhận -> ]`.
- **E. Mobile composition (375px):**
  - Bảng chuyển thành danh sách thẻ xếp chồng: Thể hiện tên nhà vườn, nông sản, giá đề xuất và các nút hành động tương ứng.
- **F. Main content hierarchy:** Bộ lọc Tabs $\rightarrow$ Bảng danh sách đề nghị $\rightarrow$ Phân trang.
- **G. Primary CTA:** `[ Đi đến Thỏa thuận để xác nhận ]` (đối với đề nghị đã được chấp thuận).
- **H. Secondary actions:** `[ Rút đề nghị ]` (đối với đề nghị đang chờ phản hồi).
- **I. Components used:** Tabs, Status Pills, Operational Table, Confirmation Modal for Withdrawal.
- **J. States:** Có đề nghị đang chờ, Đề nghị được chấp thuận, Không có đề nghị nào.
- **K. Responsive behavior:** Table Desktop $\rightarrow$ Stacked Card List Mobile.
- **L. Accessibility notes:** Thao tác "Rút đề nghị" có hộp thoại xác nhận thứ hai: *"Bạn có chắc chắn muốn rút đề nghị thu mua này? Thao tác này không thể hoàn tác."*.
- **M. Important copy / labels:** *"Đề nghị đã gửi"*; *"Chờ nhà vườn phản hồi"*; *"Rút đề nghị"*.
- **N. Visual notes:** Đề nghị được chấp thuận có viền xanh lá nổi bật để Bên mua nhận biết và vào xác nhận thỏa thuận ngay.
- **O. Things explicitly NOT allowed:** Không cho phép rút đề nghị sau khi Nhà vườn đã bấm Chấp thuận (khi đó phải thực hiện qua luồng Hủy thỏa thuận ở `T-19`).

---

### Màn hình 23: Hồ Sơ Doanh Nghiệp Thu Mua (Buyer Profile — `T-20` Buyer)
- **A. Screen ID / Name:** `T-20` (Buyer) — Hồ sơ Đơn vị Thu mua & Thiết lập Liên hệ
- **B. User / Role:** Thương lái, Doanh nghiệp thu mua (`BUYER`)
- **C. Purpose:** Thiết lập thông tin định danh và kênh liên hệ của đơn vị thu mua để nhà vườn an tâm kết nối và trao đổi ngoài sàn.
- **D. Desktop composition (1440px):**
  - Khung form quản lý (Max width 760px), nền trắng `#FFFFFF`, viền `#CBD5E1`, bo góc 8px.
  - Tiêu đề H2 *"Hồ sơ đơn vị thu mua"*.
  - Khối thông tin chuẩn hóa MVP:
    - Tên đơn vị / Tên thương lái (*): Ô nhập văn bản.
    - Số điện thoại liên hệ chính (*): Ô nhập SĐT (hiển thị khi tương tác với nhà vườn).
    - Địa chỉ liên hệ / giao dịch (*): Ô nhập địa chỉ hoặc địa bàn hoạt động chính.
    - Loại hình thu mua (Tùy chọn): Dropdown chọn `[ Thương lái cá thể | Công ty thu mua / Chế biến / Xuất khẩu ]`.
    - *(Các trường thông tin mở rộng — Không bắt buộc trong MVP):* Mã số thuế, Điểm tập kết/Kho hàng, Nông sản quan tâm (Người dùng có thể bổ sung tùy chọn, hệ thống không bắt buộc nhập để hoàn tất hồ sơ).
  - Nút Primary Green `[ Lưu thay đổi hồ sơ ]`.
- **E. Mobile composition (375px):** Form 1 cột cuộn dọc, nút Lưu dính ở cạnh dưới.
- **F. Main content hierarchy:** Thông tin đơn vị $\rightarrow$ Kênh liên hệ $\rightarrow$ Địa chỉ $\rightarrow$ Nút Lưu.
- **G. Primary CTA:** `[ Lưu thay đổi hồ sơ ]`.
- **H. Secondary actions:** `[ Đổi mật khẩu ]`, `[ Đăng xuất ]`.
- **I. Components used:** Text Input, Dropdown, Primary Button.
- **J. States:** Mặc định, Đang lưu, Báo lỗi thiếu SĐT hoặc tên đơn vị.
- **K. Responsive behavior:** Form co giãn toàn chiều ngang trên mobile.
- **L. Accessibility notes:** Các trường bắt buộc có dấu `(*)` và nhãn rõ ràng.
- **M. Important copy / labels:** *"Hồ sơ đơn vị thu mua"*; *"Số điện thoại liên hệ"*; *"Lưu thay đổi"*.
- **N. Visual notes:** Tối giản, trang nhã, tạo dựng sự tin cậy trong giao thương nông nghiệp.
- **O. Things explicitly NOT allowed:** Không tạo các trường bắt buộc mới chưa có trong Product Plan; không tạo chức năng chấm điểm tín dụng hay đánh giá sao trong MVP.

---

## PHẦN D: MÀN HÌNH QUẢN TRỊ VIÊN HỆ THỐNG (ADMIN)

### Màn hình 24: Bảng Điều Khiển Quản Trị Hệ Thống (Admin Dashboard — `T-07` Admin)
- **A. Screen ID / Name:** `T-07` (Admin) — Tổng quan Kiểm duyệt & Vận hành Sàn
- **B. User / Role:** Quản trị viên hệ thống (`ADMIN`)
- **C. Purpose:** Nắm bắt khối lượng bài đăng mới cần rà soát thông tin, kiểm tra giấy tờ do người dùng tải lên và tài khoản cần xem xét; không xây dựng dashboard KPI trang trí hào nhoáng.
- **D. Desktop composition (1440px):**
  - **Bố cục Quản trị:** Sidebar Admin (256px) + Khung nội dung (1120px).
  - **Khối Tóm tắt Vận hành Tinh gọn (Compact Operational Summaries — 3 khối):**
    - Khối 1: *Bài đăng cần xử lý* (Số bài đăng mới đăng tải cần rà soát nội dung).
    - Khối 2: *Giấy tờ cần rà soát* (Số tài liệu/chứng nhận do nông dân tải lên chờ xem xét).
    - Khối 3: *Tài khoản cần xem xét* (Số tài khoản mới đăng ký hoặc cần hỗ trợ).
  - **Danh sách Bài đăng Nguồn cung mới cần rà soát (Bảng 5 hàng):** Mã bài đăng, Tên nhà vườn, Nông sản, Sản lượng mở bán, Địa bàn, Nút `[ Xem chi tiết & Rà soát ]`.
  - **Danh sách Hồ sơ Giấy tờ đính kèm chờ xem xét (Bảng 5 hàng):** Tên tài liệu, Nhà vườn tải lên, Ngày gửi, Nút `[ Xem file ]` và `[ Đánh dấu đã kiểm tra ]`.
- **E. Mobile composition (375px):** Sidebar thu vào Drawer, các khối tóm tắt xếp chồng, bảng chuyển thành danh sách thẻ tóm tắt.
- **F. Main content hierarchy:** 3 Khối tóm tắt công việc $\rightarrow$ Danh sách bài đăng cần rà soát $\rightarrow$ Hồ sơ giấy tờ cần kiểm tra.
- **G. Primary CTA:** `[ Rà soát bài đăng mới ]`.
- **H. Secondary actions:** `[ Quản lý tài khoản ]`, `[ Xem danh sách thỏa thuận ]`.
- **I. Components used:** Operational Summary Card, Data Tables, Moderation Action Buttons, Status Badges.
- **J. States:** Có mục cần rà soát, Không có mục tồn đọng.
- **K. Responsive behavior:** Grid 3 cột $\rightarrow$ 1 cột trên di động.
- **L. Accessibility notes:** Các nút thao tác quản trị có nhãn rõ ràng, không dùng icon đơn độc thiếu chú thích.
- **M. Important copy / labels:** *"Bài đăng cần xử lý"*; *"Giấy tờ cần rà soát"*; *"Tài khoản cần xem xét"*.
- **N. Visual notes:** Gọn gàng, độ tương phản cao, tối ưu cho năng suất làm việc của cán bộ quản trị, tuyệt đối không có biểu đồ sóng hay KPI tài chính ảo.
- **O. Things explicitly NOT allowed:** Không tạo chức năng quản lý tài chính doanh thu, kế toán, hóa đơn hay quản lý kho vận ERP.

---

### Màn hình 25: Trung Tâm Quản Trị Dữ Liệu & Kiểm Duyệt (Admin Records Management — `T-21`)
- **A. Screen ID / Name:** `T-21` — Quản trị Người Dùng, Bài Đăng & Giấy Tờ
- **B. User / Role:** Quản trị viên (`ADMIN`)
- **C. Purpose:** Trung tâm tra cứu, tìm kiếm, lọc và thực hiện các tác vụ kiểm duyệt tài khoản, bài đăng nguồn cung, tọa độ vườn trồng và tài liệu đính kèm trên toàn sàn.
- **D. Desktop composition (1440px):**
  - Tiêu đề H1 *"Trung tâm kiểm duyệt & Quản trị dữ liệu"*.
  - **Hệ thống 4 Tabs chuyển đổi dữ liệu:**
    - `[ Tab 1: Người dùng (Nông dân & Bên mua) ]`
    - `[ Tab 2: Rà soát bài đăng nguồn cung ]`
    - `[ Tab 3: Rà soát Vùng sản xuất & Tọa độ ]`
    - `[ Tab 4: Giấy tờ / Chứng nhận đính kèm ]`
  - **Thanh Công cụ Lọc & Tìm kiếm:** Ô tìm kiếm theo tên/SĐT/mã số, Dropdown lọc theo Tỉnh/Thành phố, Dropdown lọc trạng thái (`Đang mở`, `Đã khóa`, `Chờ rà soát`).
  - **Bảng Dữ liệu Quản trị Toàn diện:**
    - Cột 1: Mã định danh & Tên thực thể.
    - Cột 2: Chủ tài khoản & Kênh liên hệ (SĐT).
    - Cột 3: Địa bàn hành chính (2026).
    - Cột 4: Ngày tạo / Cập nhật.
    - Cột 5: Trạng thái kiểm duyệt.
    - Cột 6: Thao tác quản trị: Nút `[ Xem chi tiết ]`, Nút `[ Ẩn bài đăng ]`, Nút `[ Khóa tài khoản ]` (Destructive).
    - *(Quy tắc kiểm duyệt bài đăng Tab 2: Sử dụng quy trình trung tính gồm: Xem chi tiết bài đăng, rà soát nội dung, ẩn / khôi phục theo quyền hạn, xem trạng thái; tuyệt đối không tạo cơ chế tự động phát hiện bất thường bằng AI).*
    - *(Quy tắc rà soát vùng sản xuất Tab 3: Xem Vùng sản xuất, rà soát thông tin hành chính, rà soát dữ liệu vị trí / tọa độ khi cần; tuyệt đối không tạo quy trình xử lý tranh chấp địa bàn).*
- **E. Mobile composition (375px):**
  - Tabs cuộn ngang, bảng dữ liệu tự động chuyển thành danh sách thẻ tóm tắt với menu hành động 3 chấm `[...]`.
- **F. Main content hierarchy:** 4 Tabs $\rightarrow$ Bộ lọc & Tìm kiếm $\rightarrow$ Bảng dữ liệu $\rightarrow$ Phân trang.
- **G. Primary CTA:** `[ Áp dụng bộ lọc ]`.
- **H. Secondary actions:** `[ Xem chi tiết ]`, `[ Ẩn bài đăng ]`, `[ Khóa tài khoản ]`.
- **I. Components used:** Tabs, Advanced Filter Bar, Admin Data Table, Destructive Action Modal, Status Pills.
- **J. States:** Hiển thị dữ liệu, Đang tìm kiếm, Rỗng, Khóa tài khoản thành công.
- **K. Responsive behavior:** Table Desktop $\rightarrow$ Compact Card List Mobile.
- **L. Accessibility notes:** Hành động khóa bài đăng hoặc khóa tài khoản bắt buộc phải có hộp thoại xác nhận thứ hai (Modal Confirm) và yêu cầu nhập lý do xử lý.
- **M. Important copy / labels:** *"Ẩn bài đăng khỏi Chợ"*; *"Khóa tài khoản"*; *"Lý do xử lý"*.
- **N. Visual notes:** Thao tác nhạy cảm (Khóa/Ẩn) sử dụng màu đỏ viền `#991B1B` để tránh bấm nhầm.
- **O. Things explicitly NOT allowed:** Không tạo chức năng cấp chứng chỉ hay đóng dấu điện tử của MEKAGREEN lên tài liệu người dùng.

---

### Màn hình 26: Chi Tiết Rà Soát & Xử Lý Vi Phạm (Admin Moderation Detail — `T-22`)
- **A. Screen ID / Name:** `T-22` — Xem Xét Chi Tiết & Xử Lý Vi Phạm
- **B. User / Role:** Quản trị viên (`ADMIN`)
- **C. Purpose:** Xem xét tường tận một bài đăng hoặc tài khoản bị báo cáo thông tin sai lệch (VD: khai khống sản lượng, tọa độ sai lệch nghiêm trọng, đăng bán trái mùa vụ); thực hiện ẩn bài đăng hoặc gửi thông báo nhắc nhở cho chủ tài khoản.
- **D. Desktop composition (1440px):**
  - Bố cục 2 cột (Cột nội dung bài đăng 760px + Cột thao tác kiểm duyệt 380px):
    - **Cột Nội dung bài đăng (Trái):** Hiển thị toàn bộ thông tin như người mua nhìn thấy (Ảnh, Tên giống, Sản lượng, Vùng trồng, Giấy tờ đính kèm).
    - **Cột Thao tác Kiểm duyệt (Phải, Sticky):**
      - Thông tin tài khoản chủ bài đăng & Lịch sử đăng tin.
      - Nội dung phản ánh / Báo cáo vi phạm từ người dùng (nếu có).
      - **Các hành động xử lý:**
        - Tùy chọn 1: `[ Đánh dấu hợp lệ / Bỏ qua báo cáo ]` (Secondary).
        - Tùy chọn 2: `[ Ẩn bài đăng khỏi Chợ & Bản đồ ]` (Nút màu Cam Đỏ, yêu cầu chọn lý do: *Thông tin sản lượng không có cơ sở / Tọa độ sai lệch / Nông sản cấm*).
        - Tùy chọn 3: `[ Khóa tài khoản người dùng ]` (Destructive Đỏ).
      - Ô ghi chú nội bộ của Quản trị viên (Admin Notes).
      - Nút `[ XÁC NHẬN XỬ LÝ ]`.
- **E. Mobile composition (375px):** 2 cột xếp dọc, khối xử lý kiểm duyệt nằm dưới cùng.
- **F. Main content hierarchy:** Chi tiết bài đăng $\rightarrow$ Nội dung phản ánh $\rightarrow$ Lựa chọn hành động xử lý $\rightarrow$ Ghi chú $\rightarrow$ Xác nhận.
- **G. Primary CTA:** `[ Xác nhận xử lý vi phạm ]`.
- **H. Secondary actions:** `[ Bỏ qua báo cáo ]`, `[ Liên hệ trực tiếp với người đăng ]`.
- **I. Components used:** Moderation Form, Radio Action Group, Textarea, Confirmation Dialog.
- **J. States:** Mặc định, Đã xử lý ẩn bài đăng (Bài đăng đổi trạng thái sang `CANCELLED` hoặc `CLOSED` do Admin).
- **K. Responsive behavior:** Chuyển 2 cột sang 1 cột trên màn hình nhỏ.
- **L. Accessibility notes:** Hành động ẩn bài đăng hiển thị thông báo rõ ràng về việc bài sẽ không còn xuất hiện trên `T-02`.
- **M. Important copy / labels:** *"Ẩn bài đăng khỏi Chợ"*; *"Lý do xử lý vi phạm"*; *"Ghi chú quản trị nội bộ"*.
- **N. Visual notes:** Tách biệt rõ khu vực thông tin đối tượng và khu vực quyền lực của quản trị viên.
- **O. Things explicitly NOT allowed:** Không tạo chức năng xử phạt tiền hay phong tỏa tài chính.

---

## 2. Bảng Đối Chiếu Ma Trận 33 Màn Hình / Trạng Thái Chi Tiết

| STT | Tên màn hình / Tác vụ cụ thể | Mã Mẫu Trang IA | Vai trò chính | Trạng thái hiển thị trọng tâm |
|:---:|:---|:---:|:---:|:---|
| 1 | Trang chủ (Homepage) | `T-01` | Public | Panoramic Hero, Search Dock, 3 Trụ cột, Nguồn cung nổi bật |
| 2 | Chợ nguồn cung — Dạng Danh sách | `T-02` | Public / Buyer | Lọc đa cấp, Thẻ 3 cột, Hiển thị giá tham khảo / thỏa thuận |
| 3 | Chợ nguồn cung — Dạng Bản đồ | `T-02` | Public / Buyer | Marker gần đúng, Popup preview, Split View Desktop / Mobile Bottom Sheet |
| 4 | Chi tiết nguồn cung thu hoạch | `T-03` | Public / Buyer | Thư viện ảnh, Bối cảnh mùa vụ, Khối liên hệ SĐT/Zalo, CTA Gửi đề nghị |
| 5 | Trang truy xuất nguồn gốc công khai | `T-04` | Public | Truy xuất qua Web / QR Link, Vertical Timeline nhật ký, Disclaimer pháp lý |
| 6 | Đăng nhập hệ thống | `T-05` | Public / All | SĐT/Email + Mật khẩu, Redirect Back sau đăng nhập |
| 7 | Đăng ký & Chọn vai trò | `T-06` | Public | Stepper 2 bước, Chọn Farmer (Nông hộ/HTX) hoặc Buyer (Thương lái/DN) |
| 8 | Bảng điều khiển Nông dân | `T-07` | Farmer | Việc cần xử lý ngay, Lối tắt ghi nhật ký, Mùa vụ & Nguồn cung đang mở |
| 9 | Danh sách Vùng sản xuất | `T-08` | Farmer | Bảng quản lý đất vườn, Diện tích ha/m², Tọa độ điểm |
| 10 | Tạo / Sửa Vùng sản xuất | `T-10` | Farmer | Form nhập diện tích, Ghim điểm bản đồ, Checkbox vị trí gần đúng, Dirty Guard |
| 11 | Danh sách & Chi tiết Mùa vụ | `T-11` | Farmer | Tổng quan mùa vụ, Dải ngày thu hoạch, Vertical Log Timeline |
| 12 | Tạo / Sửa Mùa vụ canh tác | `T-12` | Farmer | Chọn vùng sản xuất, Giống cây, Ngày xuống giống, Thời gian thu hoạch dự kiến |
| 13 | Dòng thời gian Nhật ký canh tác | `T-11` | Farmer | Timeline trực quan các hoạt động chăm sóc cây trồng ngoài vườn |
| 14 | Thêm mới Nhật ký canh tác nhanh | `T-13` | Farmer | Quick Activity Chips (Tưới, Bón, Phun...), Chụp ảnh thật, Mobile-first |
| 15 | Quản lý Nguồn cung của tôi | `T-14` | Farmer | Bảng theo dõi bài đăng, Phân bổ sản lượng, Số lượng đề nghị mới đến |
| 16 | Tạo / Sửa Bài đăng Nguồn cung | `T-15` | Farmer | Banner gợi ý 15–30 ngày, Sản lượng mở bán, Giá tham khảo tùy chọn |
| 17 | Hộp thư Đề nghị thu mua nhận được | `T-16` | Farmer | Tabs trạng thái, Bảng đề nghị từ thương lái, Giá & Sản lượng đề xuất |
| 18 | Chi tiết Đề nghị & Phản hồi | `T-17` | Farmer | Xem điều khoản bên mua, Nút Đồng ý (Tạo thỏa thuận) / Từ chối (Lý do) |
| 19 | Chi tiết Thỏa thuận thu mua (Farmer) | `T-19` | Farmer | Tiến trình xác nhận 2 bên, Soft Reserve, Hộp miễn trừ chữ ký số |
| 20 | Hồ sơ Nhà vườn & Kênh liên hệ | `T-20` | Farmer | Hotline, Số Zalo, Facebook, Địa chỉ hành chính 2026, Giới thiệu vườn |
| 21 | Bảng điều khiển Bên mua | `T-07` | Buyer | Cảnh báo thỏa thuận chờ xác nhận, 3 thẻ số liệu, Lịch thu hoạch sắp tới |
| 22 | Chợ nguồn cung — Góc nhìn Bên mua | `T-02` | Buyer | Tìm kiếm, lọc và xem bản đồ theo phiên làm việc (Session-only, không lưu bộ lọc) |
| 23 | Chi tiết nguồn cung từ góc độ Bên mua| `T-03` | Buyer | Mở khóa đầy đủ SĐT/Zalo nhà vườn, Nút mở Drawer lập Đề nghị thu mua |
| 24 | Drawer Lập Đề nghị thu mua | `T-03` (Drawer)| Buyer | Nhập sản lượng đề xuất (<= available), Giá mua, Ngày lấy hàng, Ghi chú |
| 25 | Quản lý Đề nghị đã gửi của Bên mua | `T-16` | Buyer | Tabs trạng thái, Nút Rút đề nghị (khi Pending), Đi đến Thỏa thuận |
| 26 | Chi tiết Đề nghị từ góc độ Bên mua | `T-17` | Buyer | Xem tiến độ phản hồi của nhà vườn, Rút đề nghị nếu nhà vườn chưa duyệt |
| 27 | Chi tiết Thỏa thuận thu mua (Buyer) | `T-19` | Buyer | Tiến trình xác nhận 2 bên, Nút Xác nhận thỏa thuận, Hủy thỏa thuận chưa ký |
| 28 | Hồ sơ Đơn vị thu mua / Doanh nghiệp | `T-20` | Buyer | Tên thương lái/DN, SĐT liên hệ, Địa chỉ giao dịch (Các trường mở rộng: Tùy chọn) |
| 29 | Bảng điều khiển Quản trị viên | `T-07` | Admin | 3 khối tóm tắt việc cần xử lý: bài đăng, giấy tờ, tài khoản (không dùng KPI ảo) |
| 30 | Quản lý Người dùng hệ thống | `T-21` (Tab 1)| Admin | Bảng tài khoản Farmer & Buyer, Tìm theo SĐT, Tác vụ khóa tài khoản |
| 31 | Rà soát Bài đăng Nguồn cung | `T-21` (Tab 2)| Admin | Bảng bài đăng toàn sàn, Rà soát nội dung trung tính, Ẩn/khôi phục theo quyền |
| 32 | Rà soát Vùng sản xuất & Tọa độ | `T-21` (Tab 3)| Admin | Xem Vùng sản xuất, Rà soát thông tin hành chính & dữ liệu tọa độ khi cần |
| 33 | Rà soát Giấy tờ / Chứng nhận | `T-21` (Tab 4)| Admin | Xem file ảnh VietGAP/GlobalGAP tải lên, Đánh dấu đã kiểm tra |

---

## 3. Quy Chuẩn Xử Lý Trạng Thái Nghiệp Vụ Đặc Thù (Special States Spec)

### 3.1. Trạng thái Sản lượng: "Tạm hết sản lượng khả dụng (Soft Reserve)"
- **Hoàn cảnh xảy ra:** $\text{availableQuantity} = 0$ nhưng $\text{committedQuantity} < \text{expectedQuantity}$ (tức phần sản lượng còn lại đang bị giữ chỗ trong các thỏa thuận chờ 2 bên xác nhận).
- **Quy chuẩn thị giác:**
  - Nền khối cảnh báo: Màu Amber nhạt `#FEF3C7`, Viền `#FCD34D`, Chữ `#92400E` ($6.31:1$, đạt chuẩn WCAG AA).
  - Huy hiệu trạng thái: `[ ⏳ TẠM HẾT SẢN LƯỢNG (CHỜ XÁC NHẬN) ]`.
  - Dòng thông điệp ngữ cảnh bắt buộc: *"Toàn bộ sản lượng của bài đăng này hiện đang được giữ chỗ trong các thỏa thuận chờ ký. Sản lượng có thể tự mở lại trên Chợ nếu thỏa thuận giữ chỗ bị hủy."*
  - Nút `[ Gửi đề nghị thu mua ]`: Ở trạng thái Disabled có tooltip giải thích lý do.
  - Phân biệt với trạng thái `[ 🔒 ĐÃ CHỐT ĐỦ 100% ]` (màu xám bạc `#F1F5F9`, toàn bộ sản lượng đã chốt xong, không thể mở lại).

### 3.2. Trạng thái Thỏa thuận bị hủy (Cancelled Agreement Audit Trail)
- **Hoàn cảnh xảy ra:** Một trong 2 bên bấm hủy thỏa thuận khi thỏa thuận chưa được cả 2 bên cùng xác nhận xong (`PENDING_CONFIRMATION`).
- **Quy chuẩn thị giác:**
  - Huy hiệu thỏa thuận: `[ ✕ THỎA THUẬN ĐÃ BỊ HỦY ]` (Nền `#FEF2F2`, Viền `#FCA5A5`, Chữ `#991B1B`).
  - Khối Lịch sử hủy thỏa thuận (Audit Box): Hiển thị cố định đầu trang:
    - *"Hủy bởi: [Tên người hủy] ([Vai trò: Bên mua / Nhà vườn])"*
    - *"Thời điểm: [Giờ, Ngày/Tháng/Năm]"*
    - *"Lý do hủy: [Lý do chọn từ danh mục định sẵn]"*
    - *"Ghi chú thêm: [Nội dung giải thích tùy chọn]"*
  - Toàn bộ nút hành động xác nhận bị ẩn hoàn toàn. Sản lượng giữ chỗ tự động được hoàn trả về bài đăng nguồn cung.

### 3.3. Trạng thái Bảo vệ Form Chưa Lưu (Dirty Form Guard)
- **Áp dụng cho:** Form Ghi nhật ký (`T-13`), Form Vùng sản xuất (`T-10`), Form Mùa vụ (`T-12`), Form Đăng nguồn cung (`T-15`).
- **Quy chuẩn tương tác:**
  - Khi người dùng đã nhập ít nhất 1 trường dữ liệu mà thực hiện hành động: Bấm nút quay lại trình duyệt, Bấm nút Đóng (X), hoặc Chạm ra ngoài màn hình modal:
  - Hệ thống chặn hành động ngay lập tức và bật Modal xác nhận:
    - Tiêu đề: *"Thông tin chưa được lưu"*
    - Nội dung: *"Bạn có các thay đổi chưa được lưu trên biểu mẫu này. Nếu thoát bây giờ, toàn bộ nội dung vừa nhập sẽ bị mất."*
    - Nút 1: `[ Tiếp tục chỉnh sửa ]` (Primary Green - Khuyến nghị).
    - Nút 2: `[ Rời khỏi & Hủy thay đổi ]` (Destructive Ghost).

---

## 4. Trạng Thái Phê Duyệt & Khóa Thiết Kế (Approved & Locked Status)

Tài liệu này đã đặc tả đầy đủ và chi tiết toàn bộ 33 màn hình và trạng thái nghiệp vụ ưu tiên của MEKAGREEN theo đúng quy chuẩn Hệ thống thiết kế đã khóa và các điều chỉnh phạm vi cuối cùng của Chủ sản phẩm.

- **Trạng thái chính thức:** **PHASE 9 — HIGH-FIDELITY PROTOTYPE + UI LOCK: APPROVED & LOCKED**
- **Quy tắc bất biến sau khi khóa:** Mọi thay đổi giao diện hoặc trải nghiệm người dùng sau khi khóa (UI Lock) **BẮT BUỘC** phải có Yêu cầu Thay đổi (Change Request) được Chủ sản phẩm (Product Owner) chấp thuận bằng văn bản.
- **Điểm dừng an toàn (Safe Stop Condition):** Tuyệt đối **KHÔNG** bắt đầu viết mã lập trình frontend (React, Tailwind), backend (Laravel) hay sửa ERD/migration cho đến khi nhận được lệnh khởi động giai đoạn kỹ thuật tiếp theo.
