# 🔒 Khóa Thiết Kế Giao Diện & Trải Nghiệm (UI/UX Lock Specification) — MEKAGREEN

> **Dự án:** MEKAGREEN — Nền tảng số kết nối nguồn cung nông sản Nam Bộ trước thu hoạch  
> **Trạng thái:** **UI/UX STATUS: APPROVED & LOCKED** (Đã thẩm định, phê duyệt & Khóa chính thức)  
> **Tài liệu nguồn căn cứ (Sources of Truth):**  
> - [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)  
> - [PRODUCT_PLAN.md](./PRODUCT_PLAN.md)  
> - [BUSINESS_RULES.md](./BUSINESS_RULES.md) (BR-001 đến BR-049, ADR-001 đến ADR-009)  
> - [USER_FLOWS.md](./USER_FLOWS.md)  
> - [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md) (23 Mẫu trang T-01 đến T-23)  
> - [WIREFRAMES.md](./WIREFRAMES.md) (Khung dây chi tiết đã khóa)  
> - [UX_REVIEW.md](./UX_REVIEW.md) (8 quyết định thẩm định UX đã khóa)  
> - [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (Hệ thống thiết kế đã phê duyệt & khóa)  
> - [HIGH_FIDELITY_UI.md](./HIGH_FIDELITY_UI.md) (Đặc tả chi tiết 33 màn hình & trạng thái nghiệp vụ)  
>
> ⚠️ **QUY TẮC BẤT BIẾN SAU KHI KHÓA (LOCK PRINCIPLE):**  
> **Mọi thay đổi đối với hệ thống màn hình, token thiết kế hoặc luồng thao tác sau khi tài liệu UI_LOCK này được phê duyệt BẮT BUỘC phải có Yêu cầu Thay đổi (Change Request) được Chủ sản phẩm (Product Owner) chấp thuận bằng văn bản.** Các phiên làm việc kỹ thuật tiếp theo tuyệt đối không được tự ý "cải tiến", làm đẹp hoặc thay đổi cấu trúc giao diện đã khóa.

---

## 1. Mục Đích & Phạm Vi Khóa Thiết Kế (Purpose & Scope of UI Lock)

Tài liệu này tổng hợp toàn bộ các quyết định thiết kế giao diện (UI) và trải nghiệm người dùng (UX) đã được rà soát và phê duyệt qua 9 giai đoạn quy hoạch nền tảng. Đây là **bộ khung bất biến** để đội ngũ kỹ thuật triển khai trực tiếp sang mã nguồn giao diện (React + Vite + Tailwind CSS) mà không cần phải phỏng đoán thị giác hay sáng tác thêm tính năng ngoài phạm vi MVP.

---

## 2. Tóm Tắt Các Thành Phần Giao Diện Đã Khóa (Locked Components & Rules)

### 2.1. Định hướng Thị giác & Triết lý Thiết kế (Visual Direction)
- **4 Trụ cột nhận diện:** Modern Vietnamese Agritech + Professional B2B Platform + Real Operational + Premium but Restrained.
- Tinh thần chủ đạo: Chân thực, gắn liền với miệt vườn sông nước Cửu Long, thực tế ngoài đồng ruộng, phục vụ thương mại nông nghiệp nghiêm túc, không chạy theo phong cách hào nhoáng ảo diệu của các ứng dụng bán lẻ B2C hay SaaS công nghệ chung chung.

### 2.2. Bảng Màu Thương Hiệu & Ngữ Nghĩa Đã Đo Lường Tương Phản (Brand Palette)
- **Primary Green:** `#2E7D32` (Màu chủ đạo, nút CTA chính, viền focus, điểm nhấn liên kết — Đạt chuẩn WCAG 2.1 AA với chữ trắng $5.15:1$).
- **Dark Green:** `#1B5E20` (Header, navigation, footer, trạng thái hover/active của nút chính. *Tuyệt đối không dùng cho chức năng thanh toán trực tuyến vì MVP không có thanh toán*).
- **Light Green:** `#E8F5E9` (Nền khối truy xuất nguồn gốc, badge thành công nhẹ, nền mục menu đang chọn).
- **Harvest Yellow:** `#F9A825` (Màu vàng mùa gặt, badge mùa vụ sắp thu hoạch. **Quy tắc bắt buộc: Chữ bên trong bắt buộc dùng màu đen than `#0F172A` đạt $7.92:1$; cấm tuyệt đối chữ trắng trên nền vàng vì chỉ đạt $1.98:1$ vi phạm WCAG AA; không dùng làm màu nút Primary CTA**).
- **Cream White:** `#FAFAF7` (Màu nền toàn trang dịu mắt, giảm lóa mắt khi người nông dân xem điện thoại ngoài trời nắng).
- **Surfaces:** Thẻ, bảng biểu và khối form sử dụng màu trắng `#FFFFFF` trên nền trang `#FAFAF7`, viền phân tách mỏng `1px solid #CBD5E1`.
- **Hệ thống Semantic:** Success (`#166534` / `#DCFCE7`), Warning / Soft Reserve (`#92400E` / `#FEF3C7`), Danger (`#991B1B` / `#FEF2F2`), Info (`#075985` / `#F0F9FF`).

### 2.3. Kiểu Chữ (Typography)
- **Tiêu đề (Headings):** `Manrope` (Dày dặn, hiện đại, hỗ trợ tiếng Việt có dấu hoàn hảo).
- **Nội dung & Bảng biểu (Body/UI):** `Inter` (Rõ nét, số liệu dễ đối chiếu ngoài vườn ruộng).
- **Thang kích thước:** Display ($36\text{px}$–$40\text{px}$), H1 ($28\text{px}$–$32\text{px}$), H2 ($22\text{px}$–$24\text{px}$), H3 ($18\text{px}$–$20\text{px}$), Body ($14\text{px}$–$16\text{px}$), Caption/Label ($12\text{px}$–$13\text{px}$).

### 2.4. Khoảng Cách, Bo Góc & Đổ Bóng (Spacing, Radius & Shadows)
- **Hệ thống khoảng cách:** Chuẩn 8px restrained (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px).
- **Bán kính bo góc (Restrained Radius):** Thẻ và bảng bo `8px` (`md`), Khối bao lớn `12px` (`lg`), Nút và ô nhập `6px`–`8px`. Hình dạng Pill (`9999px`) **chỉ dành riêng cho Chip và Badge trạng thái**, cấm dùng pill cho thẻ Card thông thường.
- **Đổ bóng (Minimal Elevation):** Phân tách thành phần bằng đường viền `1px solid #CBD5E1` và màu nền tương phản, chỉ dùng bóng mờ nhẹ `0 1px 3px rgba(0,0,0,0.06)` cho thẻ và `0 10px 25px rgba(0,0,0,0.15)` cho modal/drawer.

### 2.5. Điều Hướng & Cấu Trúc Khung Trang (Navigation & Page Shell)
- **Desktop:** Top Navigation dính trên cùng ($64\text{px}$) cho Khách vãng lai và Bên mua; Sidebar bên trái ($256\text{px}$) cho Nông dân và Quản trị viên.
- **Mobile:** Top Navigation ($56\text{px}$) kết hợp Menu Drawer trượt ngang. **Tuyệt đối không sử dụng thanh điều hướng đáy (Bottom Navigation) chưa được phê duyệt.**

### 2.6. Biểu Mẫu, Nhập Liệu & Thao Tác (Forms & Interaction)
- **Label cố định:** Nhãn trường luôn hiển thị cố định phía trên ô nhập, không dùng placeholder thay thế cho label.
- **Quy chuẩn Diện tích (Area Input):** Chỉ hỗ trợ 2 đơn vị chuẩn hóa `ha` và `m²`. Không đưa quy đổi cứng "1 ha = 10 công" vào hệ thống MVP.
- **Chip Nhật ký nhanh:** 6 chip chuẩn: `[ Tưới nước ]`, `[ Bón phân ]`, `[ Phun / xử lý ]`, `[ Làm cỏ ]`, `[ Thu hoạch ]`, `[ Khác ]`. Luôn hiển thị chữ tiếng Việt kèm icon.
- **Dirty Form Guard:** Bắt buộc cảnh báo trước khi thoát khỏi các form đang nhập dở (Nhật ký, Vùng trồng, Mùa vụ, Nguồn cung).
- **Chống bấm đúp (Double Submission Prevention):** Mọi nút nộp đơn (Gửi đề nghị, Xác nhận thỏa thuận, Lưu nhật ký) đều tự động chuyển sang Disabled kèm spinner ngay sau khi bấm.

### 2.7. Bảng Dữ Liệu Quản Trị (Tables)
- Chiều cao dòng chuẩn $56\text{px}$, hover đổi màu nền sang `#F8FAFC`, số liệu căn phải.
- **Đáp ứng di động:** Tự động chuyển đổi thành danh sách thẻ xếp chồng (Stacked Cards) trên màn hình $< 768\text{px}$, không ép buộc cuộn ngang bảng.

### 2.8. Chợ Nguồn Cung & Bản Đồ Nông Nghiệp (Marketplace & Map)
- **Thẻ Nguồn cung (Harvest Listing Card):**
  - Hiển thị đầy đủ: Ảnh thật 16:9, Tên giống, Ngày thu hoạch dự kiến, Vị trí gần đúng, Sản lượng khả dụng, Giá tham khảo và Nút chi tiết.
  - **Giá tham khảo khi để trống:** Hiển thị thống nhất `"Giá tham khảo: Liên hệ / Thỏa thuận"`. Tuyệt đối không hiển thị `"0đ"`, `"N/A"`, `"--"`. Sàn không định giá hay bảo lãnh giá.
  - **Hiển thị sản lượng di động:** Ưu tiên hiển thị chữ trực tiếp `"Còn lại: 4 tấn (40%)"`, không bắt buộc vẽ thanh 3 phân đoạn trên mobile.
  - **Tương tác lọc theo phiên làm việc (Session-only):** Người mua có thể tìm kiếm, lọc và chuyển đổi List/Map trong phiên; **tuyệt đối không có tính năng lưu bộ lọc (saved filters), lưu tìm kiếm (saved searches), danh sách theo dõi (watchlist) hay đăng ký thông báo**.
- **Bản đồ tương tác (Map):**
  - Mọi điểm ghim nguồn cung trên bản đồ đều là **tọa độ gần đúng cấp xã** kèm nhãn `"🛡️ Vị trí gần đúng"`.
  - Không vẽ điểm giả mạo nếu bài đăng chưa có tọa độ. Không vẽ đa giác (polygon/GIS phức tạp) trong MVP.

### 2.9. Bảng Điều Khiển Nông Dân, Bên Mua & Admin (Dashboards)
- Tập trung vào tính vận hành thực tế: "Việc cần xử lý ngay", mùa vụ đang chăm sóc, lịch thu hoạch dự kiến, đề nghị chờ phản hồi.
- **Admin Dashboard:** Hiển thị 3 khối tóm tắt vận hành tinh gọn (*Bài đăng cần xử lý*, *Giấy tờ cần rà soát*, *Tài khoản cần xem xét*). Loại bỏ hoàn toàn các loại thẻ KPI rườm rà, biểu đồ hình sóng hay các chỉ số tài chính/phân tích tự động.

### 2.10. Chuỗi Đề Nghị Thu Mua & Thỏa Thuận Hai Bên (Proposal & Agreement Flow)
- **Quy trình 2 bước tách biệt:** Bước 1: Gửi/Duyệt đề nghị thu mua $\rightarrow$ Bước 2: Hai bên độc lập bấm Xác nhận Thỏa thuận thu mua trên hệ thống.
- **Liên hệ di động trên Chi tiết nguồn cung (T-03 Mobile):** Thanh Bottom Bar dính đáy hiển thị phân biệt rõ ràng 2 hành động: Nút phụ `[ 📞 Gọi / Zalo ]` và Nút chính `[ Gửi đề nghị thu mua ]`. Bên mua có thể liên hệ trực tiếp ngoài sàn bất cứ lúc nào mà không bắt buộc phải gửi đề nghị trước.
- **Cơ chế giữ chỗ tạm thời (Soft Reserve):** Khi nhà vườn chấp thuận đề nghị, sản lượng được tạm giữ; hiển thị trạng thái riêng biệt: `[ ⏳ TẠM HẾT SẢN LƯỢNG (CHỜ XÁC NHẬN) ]` kèm giải thích sản lượng có thể mở lại nếu thỏa thuận bị hủy.
- **Thỏa thuận thu mua (T-19):**
  - Biên bản ghi nhận cam kết song phương, **không phải là hợp đồng điện tử có chữ ký số pháp lý**.
  - **Lịch sử hủy thỏa thuận (Audit Trail):** Nếu bị hủy trước khi hoàn tất, ghi nhận đầy đủ người hủy, thời điểm, lý do bắt buộc từ danh mục và ghi chú thêm tùy chọn. Tuyệt đối không tạo luồng xử lý tranh chấp/khiếu nại trên sàn.

### 2.11. Truy Xuất Nguồn Gốc (Traceability)
- **Trang truy xuất nguồn gốc công khai (T-04):** Mở trực tiếp qua liên kết web hoặc qua việc quét mã QR in trên tem nhãn lô hàng bằng ứng dụng máy ảnh tiêu chuẩn của thiết bị. **Tuyệt đối không xây dựng tính năng camera quét mã QR nội bộ trong ứng dụng.**
- Trình bày chuỗi thông tin thực tế: Vùng trồng, Mùa vụ, Nhật ký chăm sóc có ảnh thật, Thời điểm thu hoạch.
- Tài liệu/Chứng nhận đính kèm được ghi rõ là tài liệu do nhà vườn tự cung cấp. Tuyệt đối không dùng các tuyên bố sai sự thật: *"MEKAGREEN chứng nhận"*, *"Bảo đảm chuẩn VietGAP 100%"*.

### 2.12. Hồ Sơ Bên Mua & Rà Soát Quản Trị Viên (Profiles & Moderation)
- **Hồ sơ Bên mua (T-20 Buyer):** Chỉ yêu cầu bắt buộc các thông tin định danh và liên hệ cơ bản (Tên đơn vị, SĐT liên hệ, Địa chỉ giao dịch). Các trường mở rộng (Mã số thuế, Điểm tập kết/Kho lạnh, Nông sản quan tâm) là tùy chọn, không bắt buộc trong MVP.
- **Quy trình kiểm duyệt trung tính (Admin Moderation):** Xem chi tiết bài đăng, rà soát nội dung, ẩn / khôi phục theo thẩm quyền, xem thông tin hành chính và dữ liệu tọa độ vùng sản xuất khi cần. Tuyệt đối không tạo cơ chế AI phát hiện bất thường tự động và không có quy trình xử lý tranh chấp địa bàn trên sàn.

### 2.13. Bộ Quy Tắc Chống Thiết Kế Giả Lập AI (Anti-AI Rules — Locked)
Hệ thống MEKAGREEN kiên quyết **LOẠI BỎ HOÀN TOÀN**:
- Hiệu ứng kính mờ (glassmorphism), viền phát sáng (glowing borders).
- Gradient màu tím/xanh phong cách SaaS quốc tế.
- Thẻ bo góc khổng lồ 24px–32px.
- Các biểu tượng ngôi sao lấp lánh AI (sparkle icons).
- Dashboard chứa đầy thẻ KPI vô nghĩa không gắn với việc làm thực tế.
- Các hình vẽ minh họa hoạt họa siêu thực hoặc nông trại viễn tưởng.

---

## 3. Danh Mục 33 Màn Hình & Trạng Thái Đã Khóa Chính Thức

Toàn bộ 33 màn hình và trạng thái nghiệp vụ chi tiết đã được chuẩn hóa và khóa tại [HIGH_FIDELITY_UI.md](./HIGH_FIDELITY_UI.md) bao gồm:
1. `T-01`: Trang chủ (Landing Page)
2. `T-02-List`: Chợ nguồn cung — Dạng Danh sách
3. `T-02-Map`: Chợ nguồn cung — Dạng Bản đồ
4. `T-03`: Chi tiết nguồn cung thu hoạch
5. `T-04`: Trang truy xuất nguồn gốc công khai (Web / QR Link)
6. `T-05`: Đăng nhập hệ thống
7. `T-06`: Đăng ký & Chọn vai trò
8. `T-07-Farmer`: Bảng điều khiển Nông dân
9. `T-08`: Danh sách Vùng sản xuất
10. `T-10`: Tạo / Sửa Vùng sản xuất
11. `T-11`: Chi tiết Mùa vụ & Dòng thời gian Nhật ký
12. `T-12`: Tạo / Sửa Mùa vụ canh tác
13. `T-11-Timeline`: Dòng thời gian Nhật ký canh tác
14. `T-13`: Form Ghi nhật ký canh tác nhanh
15. `T-14`: Quản lý Nguồn cung của tôi
16. `T-15`: Form Đăng nguồn cung thu hoạch
17. `T-16-Farmer`: Hộp thư Đề nghị thu mua nhận được
18. `T-17-Farmer`: Chi tiết Đề nghị & Phản hồi Chấp thuận / Từ chối
19. `T-19-Farmer`: Chi tiết Thỏa thuận thu mua (Góc nhìn Nông dân)
20. `T-20-Farmer`: Hồ sơ Nhà vườn & Kênh liên hệ công khai
21. `T-07-Buyer`: Bảng điều khiển Bên mua
22. `T-02-Buyer`: Chợ nguồn cung — Góc nhìn Bên mua (Tìm kiếm & Lọc theo phiên, không lưu bộ lọc)
23. `T-03-Buyer`: Chi tiết nguồn cung từ góc độ Bên mua
24. `T-03-Drawer`: Drawer Lập Đề nghị thu mua
25. `T-16-Buyer`: Quản lý Đề nghị đã gửi của Bên mua
26. `T-17-Buyer`: Chi tiết Đề nghị từ góc độ Bên mua
27. `T-19-Buyer`: Chi tiết Thỏa thuận thu mua (Góc nhìn Bên mua)
28. `T-20-Buyer`: Hồ sơ Doanh nghiệp thu mua (Trường mở rộng tùy chọn)
29. `T-07-Admin`: Bảng điều khiển Quản trị viên (3 khối tóm tắt vận hành)
30. `T-21-Tab1`: Quản lý Người dùng hệ thống
31. `T-21-Tab2`: Rà soát Bài đăng Nguồn cung (Quy trình trung tính)
32. `T-21-Tab3`: Rà soát Vùng sản xuất & Tọa độ
33. `T-21-Tab4`: Rà soát Giấy tờ / Chứng nhận đính kèm

---

## 4. Trạng Thái Khóa & Điều Khoản Chuyển Giai Đoạn (Lock Confirmation)

- **Trạng thái chính thức:** **UI/UX STATUS: APPROVED & LOCKED**.
- **Quy tắc bất biến:** Mọi thay đổi giao diện hoặc trải nghiệm người dùng sau thời điểm này **BẮT BUỘC** phải có Yêu cầu Thay đổi (Change Request) được Chủ sản phẩm (Product Owner) chấp thuận bằng văn bản.
- **Giai đoạn tiếp theo:** Chuyển sang giai đoạn chuẩn bị kỹ thuật (Technical Planning / Project Setup), tuyệt đối không tự ý viết mã React/Tailwind trước khi có chỉ đạo.

