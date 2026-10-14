# 🔬 Nghiên cứu Tham chiếu UI/UX (UI/UX References & Design Benchmark) — MEKAGREEN

> **Vị trí quy trình:** Bước 3 trong Quy trình UI/UX (sau *Product Definition* & *UI/UX Direction*) — tuân thủ nghiêm ngặt [UIUX_PLANNING_PROMPT.md](../UIUX_PLANNING_PROMPT.md).  
> **Mục tiêu:** Khảo sát đa chiều các nền tảng Agritech, B2B Marketplace và Map Discovery quốc tế & Việt Nam; chắt lọc các UI/UX patterns tối ưu cho bối cảnh nông nghiệp Nam Bộ; xác lập ngôn ngữ thiết kế độc lập, thực tế và chuyên nghiệp cho MEKAGREEN.  
> **Nguyên tắc cốt lõi:** Tuyệt đối không sao chép giao diện, bố cục hay nhận diện của bất kỳ nền tảng nào.

---

## 1. Tổng quan Khảo sát Nền tảng (Platform Benchmarks)

Chúng tôi tiến hành phân tích 8 nền tảng tiêu biểu thuộc 3 nhóm chức năng trọng tâm:

| Nhóm nền tảng | Tên nền tảng | Xuất xứ / Phạm vi | Điểm mạnh cốt lõi | Lý do khảo sát |
|---------------|--------------|-------------------|-------------------|----------------|
| **Agritech & Farm Management** | **Farmforce / SourceTrace** | Quốc tế (thị trường đang phát triển) | Quản lý nông hộ nhỏ, nhật ký canh tác mobile, truy xuất lô hàng | Phù hợp với đặc thù nông hộ & HTX tại Việt Nam |
| | **Climate FieldView / John Deere Ops** | Bắc Mỹ / Toàn cầu | Bản đồ vận hành nông nghiệp, trực quan hóa dữ liệu thực địa | Tham chiếu cách hiển thị thông tin vùng trồng khúc chiết, chuẩn mực |
| | **TraceVerified / VinaTrace** | Việt Nam | Truy xuất nguồn gốc nông sản, chứng thư điện tử, mã QR | Bối cảnh kiểm định, công bố hồ sơ canh tác tại Việt Nam |
| | **Farming.vn** | Việt Nam | Bản đồ nông sản, liên kết chuỗi nguyên liệu | *Chỉ tham chiếu nghiệp vụ bản đồ & lọc địa giới hành chính VN* |
| **B2B Agricultural Marketplace** | **Indigo Ag / FarmLead** | Mỹ / Bắc Mỹ | Sàn giao dịch nông sản trước thu hoạch, cơ chế đặt giá & chào mua | Tham chiếu cách thể hiện nguồn cung dự kiến và đề nghị thu mua |
| | **Tridge** | Toàn cầu | Danh bạ nhà cung cấp nông sản, hồ sơ năng lực, kết nối B2B | Tham chiếu cách phân loại hồ sơ doanh nghiệp & huy hiệu uy tín |
| **Bản đồ & Khám phá nguồn cung** | **Airbnb / Zillow Map-Split** | Toàn cầu | Giao diện chia đôi màn hình (Map + List song hành), bộ lọc tức thì | Chuẩn mực vàng cho trải nghiệm tìm kiếm kết hợp bản đồ |
| | **Leaflet & OpenStreetMap Directories** | Mã nguồn mở / Toàn cầu | Tối ưu hóa tải bản đồ nhẹ, cụm ghim (clustering), độ phản hồi cao | Giải pháp kỹ thuật & UX nhẹ nhàng cho hạ tầng mạng 4G/nông thôn |

---

## 2. Phân tích Chi tiết từng Nền tảng & Bài học Chắt lọc

### 2.1. Nhóm Agritech & Quản lý Sản xuất Nông nghiệp

#### A. Farmforce & SourceTrace (Hệ thống Nông hộ & HTX)
- **Đặc điểm UI/UX:**
  - Thiết kế ưu tiên Mobile tối đa: Nút bấm lớn (touch target $\ge 48\text{px}$), tương phản cao để nhìn rõ ngoài trời nắng.
  - Form nhập nhật ký canh tác (Farming Log) tối giản: Chọn nhanh nhóm công việc (Làm đất, Gieo cấy, Bón phân, Xịt thuốc, Thu hoạch) qua icon + text to rõ.
  - Phân cấp quản lý thực tế: Nông hộ cá thể tập hợp trong Hợp tác xã (Cooperative), tạo danh sách xã viên minh bạch.
- **Áp dụng cho MEKAGREEN:**
  - Thiết kế màn hình tạo *Nhật ký canh tác* cho nông dân/HTX trên điện thoại theo dạng dòng thời gian (vertical timeline) gọn nhẹ, tránh bảng biểu phức tạp khi nhập liệu ngoài đồng.
  - Hỗ trợ chọn nhanh loại hoạt động canh tác định sẵn thay vì bắt gõ văn bản dài.
- **Điểm MEKAGREEN KHÔNG sao chép:**
  - Không ôm đồm các luồng quản lý vi mô như: chấm công nhân công, quản lý kho vật tư chi tiết, định vị GPS biên giới từng thửa đất (MVP chỉ cần tọa độ điểm).

#### B. Climate FieldView & John Deere Ops Center
- **Đặc điểm UI/UX:**
  - Màu sắc công nghiệp, tối giản: Sử dụng các sắc thái xám, trắng ấm và xanh lá đậm chuyên nghiệp, tránh các màu sắc quá sặc sỡ.
  - Tách bạch rõ ràng giữa *Dữ liệu tĩnh* (diện tích, giống cây trồng, vị trí) và *Dữ liệu biến động* (thời gian thu hoạch dự kiến, nhật ký theo ngày).
- **Áp dụng cho MEKAGREEN:**
  - Tông màu chuyên nghiệp, đáng tin cậy: Tách biệt rõ ràng thẻ thông tin vùng sản xuất và tiến độ mùa vụ.
  - Thẻ thông số (metric pills) rõ ràng: Diện tích, sản lượng dự kiến, ngày thu hoạch hiển thị với đơn vị tính chuẩn mực Việt Nam (tấn, kg, ha, công đất).

#### C. TraceVerified / VinaTrace (Truy xuất nguồn gốc tại VN)
- **Đặc điểm UI/UX:**
  - Trang xem công khai qua mã QR trên điện thoại: Tải nhanh, hiển thị chứng nhận đính kèm (VietGAP, GlobalGAP, Mã số vùng trồng).
  - Trình bày thông tin theo dạng "Chứng từ minh bạch": Người xem có thể bấm vào xem ảnh scan giấy chứng nhận gốc.
- **Áp dụng cho MEKAGREEN:**
  - Trang *Truy xuất thông tin sản xuất (Traceability Public Page)* thiết kế theo dạng thẻ thông tin dọc, load cực nhanh trên trình duyệt di động khi quét mã QR.
  - Hiển thị văn bản/chứng nhận dưới dạng file đính kèm thực tế do nhà vườn tải lên, kèm **dòng cảnh báo bắt buộc (BR-060)**: *"Thông tin do nông hộ/HTX tự công bố và chịu trách nhiệm, MEKAGREEN lưu trữ và hiển thị hồ sơ, không thay thế cơ quan cấp chứng nhận pháp lý."*

#### D. Farming.vn (*Tham chiếu chức năng độc lập — Không sao chép blueprint*)
- **Phân tích đối chiếu:**
  - *Farming.vn:* Tập trung hiển thị vùng nguyên liệu với các polygon ranh giới, dữ liệu địa lý nhiều cấp.
  - *MEKAGREEN:* Lựa chọn tọa độ điểm (**Point only**) cho MVP để loại bỏ rào cản thao tác vẽ bản đồ phức tạp cho nông dân. Bộ lọc hành chính thiết kế theo cấu trúc phân cấp của Việt Nam (Tỉnh/Thành phố $\rightarrow$ Đơn vị cơ sở Xã/Phường theo cơ cấu hành chính hiện hành năm 2026, kèm ghi chú địa danh quen thuộc).
- **Quy tắc tuyệt đối:** Không sao chép logo, màu sắc, cấu trúc trang, icon hay văn bản của Farming.vn.

---

### 2.2. Nhóm B2B Agricultural Marketplace

#### A. Indigo Ag & FarmLead (Sàn Nông sản & Cam kết Sản lượng)
- **Đặc điểm UI/UX:**
  - Khái niệm "Nguồn cung dự kiến" (Expected Supply / Future Harvest): Cho phép người mua đặt trước theo mùa vụ (pre-harvest bids).
  - Thanh tiến độ cam kết sản lượng (Commitment Progress Bar): Thể hiện trực quan tổng sản lượng dự kiến, lượng đã chốt mua, lượng còn trống.
  - Đề xuất mua hàng (B2B Purchase Proposal): Điền số lượng muốn mua, mức giá đề xuất (VNĐ/kg), ghi chú yêu cầu phân loại phẩm cấp (loại 1, xô, xuất khẩu).
- **Áp dụng cho MEKAGREEN:**
  - Màn hình chi tiết bài đăng thu hoạch có **Thanh trực quan hóa sản lượng**:
    $$\text{Sản lượng khả dụng} = \text{Sản lượng dự kiến} - \text{Sản lượng đã xác nhận}$$
  - Form gửi *Đề nghị thu mua* (Purchase Proposal) tinh gọn, không rườm rà:
    - Số lượng đề nghị (tấn/kg)
    - Giá đề nghị (VNĐ/kg)
    - Thời gian mong muốn nhận hàng
    - Ghi chú chất lượng / tiêu chuẩn đóng gói
  - Quy trình xác nhận 2 bên rõ ràng: Khi cả 2 bên bấm "Đồng ý", hệ thống chuyển thành *Thỏa thuận thu mua* (Procurement Agreement).

#### B. Tridge & Sàn B2B Quốc tế (Alibaba RFQ / Indiamart)
- **Đặc điểm UI/UX:**
  - Phân loại rõ ràng hồ sơ nhà vườn: Nông hộ cá thể (`INDIVIDUAL`) vs Hợp tác xã (`COOPERATIVE`).
  - Phân loại hồ sơ bên mua: Thương lái cá nhân, Doanh nghiệp thu mua, Nhà máy chế biến, Đơn vị xuất khẩu.
  - Bảo vệ thông tin liên hệ: Người dùng chưa đăng nhập thấy nút `[Đăng nhập để xem SĐT / Zalo / Facebook]` $\rightarrow$ giúp hạn chế bot cào dữ liệu và khuyến khích đăng ký tài khoản.
- **Áp dụng cho MEKAGREEN:**
  - Khóa thông tin liên hệ trực tiếp đối với khách vãng lai (BR-037), nhưng **không bắt buộc** phải gửi đề nghị mua mới được xem. Chỉ cần đăng nhập là xem được số điện thoại/Zalo để gọi thương lượng trực tiếp.
  - Huy hiệu hồ sơ (Profile Badges) tinh tế: "Hợp tác xã", "Nông hộ", "Doanh nghiệp thu mua", "Thương lái".

---

### 2.3. Nhóm Bản đồ & Khám phá Nguồn cung (Map & Directory UX)

#### A. Mô hình Map-Split View (Airbnb / Commercial Real Estate B2B)
- **Đặc điểm UI/UX:**
  - **Trên Desktop ($\ge 1200\text{px}$):**
    - Bên trái: Danh sách bài đăng có ảnh chụp thực tế, tên nông sản, giống, vị trí, sản lượng còn lại, ngày dự kiến thu hoạch.
    - Bên phải: Bản đồ tương tác ghim các điểm nông trại. Khi rê chuột (hover) vào thẻ bên trái, ghim tương ứng trên bản đồ nổi bật (highlight) và ngược lại.
    - *Lưu ý về tỷ lệ:* Tỷ lệ chia màn hình (như 50/50 hoặc 60/40) chỉ là đề xuất tham chiếu ban đầu, không phải quy tắc cố định. Tỷ lệ tối ưu thực tế sẽ được đánh giá và quyết định linh hoạt ở bước Wireframe.
  - **Trên Mobile ($< 768\text{px}$):**
    - Mặc định hiển thị danh sách dạng thẻ/dòng để dễ cuộn.
    - Có nút bấm nổi cố định dưới chân màn hình (Floating Action Button): `[🗺️ Xem Bản đồ]` $\leftrightarrow$ `[📋 Xem Danh sách]`.
- **Áp dụng cho MEKAGREEN:**
  - Áp dụng mô hình này cho trang *Chợ nguồn cung & Bản đồ nông nghiệp* (Template #2 trong kế hoạch). Đây là trải nghiệm trực quan nhất, giúp thương lái vừa xem được vị trí địa lý vùng trồng (thuận tiện lộ trình xe tải gom hàng), vừa so sánh được giá và sản lượng.

#### B. Trải nghiệm Ghim Bản đồ (Map Pin & Clustering)
- **Nguyên tắc áp dụng:**
  - Ghim bản đồ hiển thị rõ icon/màu theo nhóm nông sản chính (Trái cây, Lúa gạo, Rau củ, Cây công nghiệp).
  - Khi thu nhỏ bản đồ (zoom out), các ghim tự động gom cụm số lượng (cluster) có số đếm.
  - Nếu bài đăng thiếu tọa độ GPS chính xác: Hiển thị marker vị trí trung tâm hành chính và gắn nhãn bắt buộc **"Vị trí gần đúng"** (BR-033a).

---

### 2.4. Tham chiếu Bố cục Hero Banner Trang chủ (Full-Bleed Panoramic Visual)

Từ mẫu giao diện nông nghiệp toàn cảnh (Full-bleed nature photography), chúng tôi phân tích các yếu tố kế thừa và các cải tiến độc lập bắt buộc cho MEKAGREEN:

```
┌────────────────────────────────────────────────────────────────────────┐
│             SO SÁNH MẪU THAM CHIẾU VỚI THIẾT KẾ MEKAGREEN              │
├───────────────────────────────────┬────────────────────────────────────┤
│ MẪU THAM CHIẾU (ẢNH MẪU)          │ THIẾT KẾ MEKAGREEN (ĐÃ CHỐT)       │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Ruộng bậc thang vùng cao Tây Bắc│ • Vùng nông nghiệp phù sa Nam Bộ   │
│ • Tiêu đề tiếng Anh chung chung   │ • Tiêu đề: "Kết nối nguồn cung     │
│                                   │   nông sản – Chủ động trước mùa    │
│                                   │   thu hoạch"                       │
│ • 1 nút CTA đơn lẻ: "Get Started" │ • 2 nút CTA phân luồng 2 chiều:    │
│                                   │   [Khám phá nguồn cung] &          │
│                                   │   [Đăng nguồn cung]                │
│ • 3 thẻ thống kê giả (1M+, 4.9...)│ • LOẠI BỎ THỐNG KÊ GIẢ. Thay bằng: │
│ • Hiệu ứng kính mờ Glassmorphism  │   Thanh tìm kiếm nông sản nổi      │
│                                   │   (Sourcing Dock) nối Marketplace  │
└───────────────────────────────────┴────────────────────────────────────┘
```

- **Điểm kế thừa phù hợp:**
  1. *Ấn tượng thị giác bao quát (Visual Scale):* Ảnh chụp toàn cảnh góc rộng trải tràn 100% chiều ngang tạo cảm giác thiên nhiên khoáng đạt, trù phú và chuyên nghiệp.
  2. *Vị trí tiêu đề trung tâm:* Dòng tiêu đề và mô tả đặt ở nửa trên, có khoảng thở thị giác rộng rãi, tạo sự trang trọng và định vị thương hiệu mạnh mẽ.
- **Điểm MEKAGREEN cải tiến & loại bỏ dứt khoát:**
  1. **Hình ảnh đúng địa bàn Nam Bộ:** Không dùng ruộng bậc thang (địa hình miền núi phía Bắc). Thay thế bằng ảnh chất lượng cao chụp vườn cây ăn trái (sầu riêng, xoài, bưởi), vùng lúa đồng bằng sông Cửu Long hoặc cánh đồng công nghệ cao Đông Nam Bộ.
  2. **Nói KHÔNG với số liệu thống kê giả:** Bỏ hoàn toàn các card ghi "1M+ khách hàng", "4.9 sao", "20+ năm kinh nghiệm". MEKAGREEN là đồ án đại học và sản phẩm B2B thực chất; không đưa số liệu giả mạo làm mất uy tín.
  3. **Thay bằng Thanh tìm kiếm nông sản thực tế:** Chân banner đè một thanh tra cứu nhanh (Sourcing Dock: chọn nông sản, chọn tỉnh thành Nam Bộ, nút Tìm kiếm) liên kết thẳng với Chợ nguồn cung (`T-02`).
  4. **Phân luồng 2 CTA rõ ràng:** Cung cấp 2 lựa chọn cho 2 nhóm người dùng: `[Khám phá nguồn cung]` (cho Thương lái/Doanh nghiệp) và `[Đăng nguồn cung]` (cho Nông hộ/HTX).
  5. **Bảo vệ khả năng tiếp cận (WCAG 2.1 AA):** Phủ lớp gradient chuyển màu được tính toán kỹ lưỡng để chữ trắng/vàng cát luôn đạt tỷ lệ tương phản $\ge 4.5:1$ trên mọi nền ảnh.

---

## 3. Hệ thống Patterns UI/UX Đề xuất cho MEKAGREEN

Dưới đây là 6 Patterns thiết kế cốt lõi được tổng hợp và tinh chỉnh chuyên biệt cho MEKAGREEN:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      HỆ THỐNG PATTERNS MEKAGREEN                        │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Dual-Pane Discovery        │ 2. Mobile-First Farm Diary             │
│    Bản đồ & Danh sách đồng bộ │    Nhật ký canh tác dạng timeline      │
├───────────────────────────────┼────────────────────────────────────────┤
│ 3. Quantity Commitment Bar    │ 4. Protected Contact & Profile Badges  │
│    Trực quan hóa cam kết sản  │    Khóa liên hệ khách, badge hồ sơ     │
│    lượng theo thời gian thực  │    minh bạch                           │
├───────────────────────────────┼────────────────────────────────────────┤
│ 5. 1-Page Proposal & Terms    │ 6. QR Traceability Timeline            │
│    Đề nghị thu mua & xác nhận │    Trang công khai minh bạch nguồn gốc │
│    thỏa thuận 2 bên gọn gàng  │    hồ sơ canh tác                      │
└────────────────────────────────────────────────────────────────────────┘
```

### Pattern 1: Tìm kiếm & Khám phá Đồng bộ (Dual-Pane Discovery)
- **Mục tiêu:** Giúp thương lái/doanh nghiệp tìm nhanh nguồn hàng trong bán kính vận chuyển.
- **Thành phần:**
  - Thanh bộ lọc nhanh phía trên: [Tỉnh/Thành phố $\nabla$] [Loại nông sản $\nabla$] [Thời gian thu hoạch $\nabla$] [Sản lượng tối thiểu $\nabla$].
  - Thẻ nguồn cung (Supply Card) hiển thị thông tin trọng tâm:
    - Ảnh thật sản phẩm & nông trại.
    - Tên nông sản & Giống (vd: *Sầu riêng Ri6*, *Xoài cát Hòa Lộc*).
    - Vị trí: Xã/Phường, Tỉnh/TP (kèm tham chiếu lịch sử nếu có, và khoảng cách nếu công khai GPS).
    - Sản lượng khả dụng / Sản lượng dự kiến.
    - Thời gian dự kiến thu hoạch (khoảng ngày).
    - Huy hiệu: Nông hộ hoặc HTX.

### Pattern 2: Nhật ký Canh tác Di động (Mobile-First Farming Log)
- **Mục tiêu:** Tối ưu hóa trải nghiệm giúp nông dân thao tác ghi chép nhanh chóng, thuận tiện ngay tại vườn (mục tiêu UX lý tưởng là hoàn tất nhanh gọn, không đặt nặng yêu cầu thời gian bắt buộc).
- **Thành phần:**
  - Dòng thời gian cuộn dọc (Vertical Timeline).
  - Mỗi bản ghi gồm: Ngày thực hiện $\rightarrow$ Thẻ phân loại hoạt động (vd: *Bón phân*, *Tưới nước*, *Cắt tỉa*, *Phun thuốc vi sinh*, *Thu hoạch*) $\rightarrow$ Tên vật tư/ghi chú vắn tắt $\rightarrow$ Ảnh chụp thực tế (nếu có).
  - Không bắt buộc nông dân nhập thông số kỹ thuật phức tạp nếu không có.

### Pattern 3: Thanh Cam kết Sản lượng (Harvest Commitment Progress)
- **Mục tiêu:** Giải quyết bài toán một vườn thu hoạch 30 tấn bán cho nhiều thương lái khác nhau (Quy tắc D2). Luôn dùng thuật ngữ "Cam kết sản lượng" (Commitment), tuyệt đối không dùng "đặt cọc" vì MVP không có tính năng đặt cọc hay thanh toán.
- **Thành phần:**
  - Thanh tiến độ ngang (Segmented Progress Bar):
    - Phần màu xanh đậm: Đã xác nhận thỏa thuận thu mua ($X$ tấn).
    - Phần màu vàng nhạt: Đang có đề nghị chờ duyệt ($Y$ tấn).
    - Phần màu xám/trắng: Còn khả dụng chào bán ($Z$ tấn).
  - Nhãn trạng thái rõ ràng: `Đang mở`, `Đã cam kết một phần`, `Đã cam kết đủ sản lượng`.

### Pattern 4: Khối Liên hệ Được bảo vệ (Protected Contact Card)
- **Mục tiêu:** Bảo vệ quyền riêng tư cho nông dân, khuyến khích tạo tài khoản, chống thu thập dữ liệu rác (Quy tắc D1).
- **Thành phần:**
  - Khi chưa đăng nhập: Các nút số điện thoại, Zalo bị làm mờ nhẹ (blur) kèm nút gọi hành động rõ ràng: `[🔒 Đăng nhập để xem liên hệ nhà vườn]`.
  - Khi đã đăng nhập: Hiển thị nút bấm trực tiếp:
    - `[📞 Gọi 0912.xxx.xxx]` (kích hoạt giao thức `tel:`)
    - `[💬 Nhắn Zalo]` (mở link Zalo chat trực tiếp)
    - `[🌐 Facebook / Khác]`

### Pattern 5: Đề nghị Thu mua & Thỏa thuận 2 Bên (Purchase Proposal & Agreement Sheet)
- **Mục tiêu:** Giao dịch minh bạch, giảm tranh cãi về thỏa thuận ban đầu mà không phức tạp hóa quy trình pháp lý.
- **Thành phần:**
  - Form đề nghị thu mua: Popup/Drawer hiển thị ngữ cảnh bài đăng $\rightarrow$ ô nhập số lượng $\rightarrow$ ô nhập giá đề xuất $\rightarrow$ ghi chú phương thức thu gom $\rightarrow$ nút `[Gửi đề nghị]`.
  - Màn hình *Thỏa thuận thu mua (Procurement Agreement)*:
    - Bảng tóm tắt các điều khoản cơ bản: Sản lượng, đơn giá, thời gian thu hoạch, địa điểm giao nhận, ghi chú phương thức thanh toán ngoài hệ thống.
    - Trạng thái xác nhận của 2 bên:
      - Bên bán (Nông dân/HTX): [Đã xác nhận lúc hh:mm dd/mm/yyyy]
      - Bên mua (Thương lái/Doanh nghiệp): [Đã xác nhận lúc hh:mm dd/mm/yyyy]
    - Hộp cảnh báo pháp lý bắt buộc:
      > *"Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN. Đây không phải chữ ký số hay hợp đồng điện tử có giá trị pháp lý."*

### Pattern 6: Trang Truy xuất Thông tin Công khai (Public Traceability Page)
- **Mục tiêu:** Người tiêu dùng hoặc đối tác quét mã QR có thể xem toàn bộ hành trình sản xuất minh bạch.
- **Thành phần:**
  - Phần đầu: Tên nông sản, giống, tên vùng sản xuất, chứng nhận đính kèm (nếu có).
  - Phần thân: Lịch sử mùa vụ và trích xuất các nhật ký canh tác quan trọng.
  - Phần chân: Đơn vị sở hữu vùng trồng, mã truy xuất nguồn gốc.
  - Tối ưu hiển thị hoàn hảo trên màn hình điện thoại từ 360px trở lên.

---

## 4. Đề xuất Ngôn ngữ Thiết kế Độc lập cho MEKAGREEN (Visual Direction)

Dựa trên nguyên tắc: **Hiện đại — Đáng tin cậy — Nông nghiệp Nam Bộ — Thực dụng B2B**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                  HỆ MÀU CHỦ ĐẠO (PROPOSED COLOR PALETTE)                │
├────────────────────────────────────────────────────────────────────────┤
│ 🟩 Mekong Primary Green    #1B4D3E (Xanh đậm đồn điền, tin cậy, vững chãi)│
│ 🌿 Leaf Accent Green       #2E7D32 (Xanh lá sinh trưởng, trạng thái tốt)  │
│ 🌾 Alluvial Warm Sand      #F8F6F0 (Màu phù sa/nền ấm, dịu mắt, sạch sẽ)  │
│ 🪵 Earth Neutral Surface   #FFFFFF (Màu thẻ nội dung, tương phản cao)     │
│ 🚜 Slate Charcoal Text     #1E293B (Chữ đen than đá, dễ đọc, độ tương phản)│
│ 🥭 Harvest Amber / Alert   #D97706 (Vàng chín thu hoạch, cảnh báo/chờ)   │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1. Đặc trưng Thị giác (Aesthetic Hallmarks)
1. **Không theo phong trào AI Dashboard hào nhoáng:**
   - Tránh triệt để: Glassmorphism (kính mờ), viền gradient 7 màu phát sáng, hiệu ứng bóng đổ (box-shadow) quá dày hoặc card bo góc khổng lồ kiểu đồ chơi.
   - Ưu tiên: Đường viền mảnh tinh tế (`1px solid #E2E8F0`), bo góc nhẹ nhàng chuẩn B2B (`rounded-lg` 8px, tối đa 12px cho modal), nền ấm dịu mắt cho người làm việc nhiều giờ.
2. **Typography rõ ràng, chuẩn tiếng Việt:**
   - Đề xuất font: **Inter** hoặc **Be Vietnam Pro** (font chữ được thiết kế tối ưu tuyệt đối cho dấu thanh tiếng Việt, hiển thị sắc nét trên cả màn hình điện thoại giá rẻ của nông dân).
   - Phân cấp kích thước (Type Scale): Body text tối thiểu 15-16px, nút bấm tối thiểu 16px để người lớn tuổi và nông dân dễ bấm mà không bấm nhầm.
3. **Hình ảnh & Dữ liệu Thực tế:**
   - Hình ảnh minh họa sử dụng đúng các loại cây trồng Nam Bộ (sầu riêng, xoài cát, bưởi da xanh, thanh long, v.v.).
   - Trình bày dạng bảng (Table) hoặc danh sách có cấu trúc (Dense List) đối với màn hình quản trị, tránh ép mọi thứ vào dạng lưới card gây lãng phí không gian màn hình.

---

## 5. Bảng So sánh & Cam kết Độc lập Thiết kế (Non-Copying Matrix)

| Nền tảng tham chiếu | Yếu tố học hỏi (Pattern) | Yếu tố MEKAGREEN thiết kế hoàn toàn khác biệt |
|---------------------|--------------------------|------------------------------------------------|
| **Farming.vn** | Cách tổ chức dữ liệu theo đơn vị hành chính VN (Tỉnh/TP → Xã/Phường, ghi chú địa danh quen thuộc). | **Khác biệt hoàn toàn:** MEKAGREEN dùng tọa độ điểm đơn giản cho MVP; không dùng polygon; luồng tập trung vào kết nối giao dịch nông sản trước thu hoạch & thỏa thuận 2 bên (Farming.vn không có luồng Purchase Proposal / Procurement Agreement này); phong cách đồ họa, CSS và cấu trúc trang tự thiết kế 100%. |
| **Airbnb / Zillow** | Trải nghiệm màn hình đôi Map + List đồng bộ khi tìm kiếm. | Dành riêng cho nông sản: Thẻ hiển thị sản lượng (tấn/kg), ngày dự kiến thu hoạch, loại nông hộ/HTX, giống cây trồng; bộ lọc nông nghiệp đặc thù. |
| **Indigo Ag** | Mô hình thỏa thuận sản lượng trước thu hoạch. | Tinh giản không làm sàn đấu giá tài chính phức tạp; chỉ làm bản ghi xác nhận thỏa thuận 2 bên không có cổng thanh toán/escrow để phù hợp 2 tháng MVP. |
| **TraceVerified** | Trình bày nhật ký và chứng chỉ minh bạch cho người xem. | Tích hợp trực tiếp vào bài đăng thu hoạch và thỏa thuận mua hàng; tuyên bố miễn trừ trách nhiệm pháp lý rõ ràng. |

---

## 6. Kết luận & Khuyến nghị cho Bước tiếp theo

Tài liệu tham chiếu này xác nhận rằng MEKAGREEN có thể tận dụng những ưu điểm thực dụng nhất của các nền tảng hàng đầu mà vẫn giữ trọn vẹn:
- Sự đơn giản, thân thiện với nông dân Nam Bộ.
- Tính thực dụng, minh bạch cho doanh nghiệp và thương lái.
- Tính khả thi cao để hoàn thành trong 2 tháng (loại bỏ toàn bộ các tính năng phức tạp như polygon GIS, cổng thanh toán, chữ ký số).

> ⚠️ **Điểm dừng phê duyệt:**  
> Kính mời bạn xem xét và duyệt tài liệu nghiên cứu tham chiếu này.  
> Sau khi bạn đồng ý, chúng ta sẽ bước sang bước tiếp theo: **Information Architecture (Kiến trúc thông tin & Hoàn thiện danh mục 23 trang)**.
