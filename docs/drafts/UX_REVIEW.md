STATUS: DRAFT – NOT APPROVED
This document was created prematurely before Phase 6 approval.
It must not be treated as a source of truth until explicitly reviewed and approved.

# 🔍 Báo Cáo Thẩm Định Trải Nghiệm Người Dùng (UX Review) — MEKAGREEN

> **Dự án:** MEKAGREEN — Nền tảng kết nối nguồn cung nông sản Nam Bộ trước thu hoạch  
> **Giai đoạn:** 7 (UX Review & Heuristic Evaluation)  
> **Tài liệu đối chiếu:** [WIREFRAMES.md](./WIREFRAMES.md), [USER_FLOWS.md](./USER_FLOWS.md), [BUSINESS_RULES.md](./BUSINESS_RULES.md), [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md), [UIUX_PLANNING_PROMPT.md](./UIUX_PLANNING_PROMPT.md)  
> **Thời gian thẩm định:** 10/2026  
> **Trạng thái:** Chờ phê duyệt (Gate Approval) trước khi chuyển sang Giai đoạn 8 (Design System)

---

## 1. Mục Đích & Khung Thẩm Định (Evaluation Framework)

Báo cáo này thẩm định toàn diện các bản vẽ khung dây (Low-fidelity Wireframes) đã hoàn thành tại Giai đoạn 6, nhằm phát hiện sớm các rào cản thao tác, điểm nghẽn nhận thức và rủi ro nghiệp vụ trước khi tiến hành chuẩn hóa hệ thống thiết kế (Design System) và thiết kế chi tiết (High-fidelity Prototype).

```
+--------------------------------------------------------------------------------------------------+
|                                    KHUNG THẨM ĐỊNH UX MEKAGREEN                                   |
+------------------------------------+-----------------------------------+-------------------------+
| 1. 10 Jakob Nielsen Heuristics    | 2. Chuẩn Tiếp Cận WCAG 2.1 AA     | 3. Thực Tế Nam Bộ       |
|    - Trạng thái trực quan          |    - Tương phản màu >= 4.5:1      |    - Nắng gắt ngoài đồng|
|    - Khớp với đời thực vụ mùa      |    - Vùng chạm >= 44x44px         |    - Thao tác 1 tay     |
|    - Tự do & kiểm soát hủy/rút     |    - Không báo lỗi chỉ bằng màu   |    - 3G/4G chập chờn    |
|    - Phòng ngừa lỗi cam kết vượt   |    - Cỡ chữ >= 16px, đủ dấu tiếng |    - Trình độ số đa dạng|
+------------------------------------+-----------------------------------+-------------------------+
```

---

## 2. Thẩm Định Chi Tiết Theo 10 Nguyên Tắc Jakob Nielsen

### H1. Khả Năng Nhận Biết Trạng Thái Hệ Thống (Visibility of System Status)
- **Điểm sáng đã đạt:**
  - `T-03`: Thanh tiến độ sản lượng trực quan 3 màu (Đã cam kết / Đang giữ chỗ tạm thời / Còn khả dụng) phản ánh chính xác trạng thái kho ảo (Soft Reserve) mà không làm biến dạng dữ liệu gốc.
  - `T-19`: Sau khi một bên bấm xác nhận, hệ thống lập tức thay thế nút bấm bằng huy hiệu tĩnh kèm dấu thời gian: `[✅ Bạn đã xác nhận vào 08:35 21/10/2026. Đang chờ đối tác xác nhận]`, xóa bỏ hoàn toàn trạng thái mông lung "không biết mình đã bấm chưa".
- **Vấn đề phát hiện (Issue):**
  - Khi xem bài đăng ở trạng thái *"Tạm hết sản lượng khả dụng (Chờ xác nhận)"*, Buyer có thể không hiểu rõ tại sao bài đăng vẫn hiển thị nút xem mà không gửi được đề nghị.
- **Giải pháp khắc phục (Fix):**
  - Bổ sung thanh thông báo ngữ cảnh (Contextual Banner) trên đầu `T-03`: *"Toàn bộ sản lượng của bài đăng này hiện đang được giữ chỗ trong các thỏa thuận chờ ký. Nếu có thỏa thuận bị hủy hoặc hết hạn, sản lượng sẽ tự động mở lại."*

### H2. Sự Tương Đồng Giữa Hệ Thống Và Thực Tế (Match Between System and Real World)
- **Điểm sáng đã đạt:**
  - Sử dụng ngôn ngữ giao thương nông nghiệp Nam Bộ chuẩn xác: *Vùng sản xuất*, *Mùa vụ*, *Nhật ký canh tác*, *Thỏa thuận thu mua*, *Nguồn cung dự kiến*.
  - Tuyệt đối không dùng các từ ngữ ngoại lai hoặc từ ngữ pháp lý nặng nề gây hoang mang cho nông dân như: "E-contract", "Digital Signature", "Smart Contract", "Escrow".
  - Đơn vị tính luôn hiển thị rõ ràng: `kg`, `tấn`, `VNĐ/kg`, `công/ha`.
- **Vấn đề phát hiện (Issue):**
  - Tại một số khu vực miền Tây, nông dân vẫn quen dùng đơn vị diện tích là "Công" (công tầm cắt $1.000\text{ m}^2$ hoặc công tầm cấy $1.296\text{ m}^2$) thay vì chỉ dùng Hecta ($\text{ha}$).
- **Giải pháp khắc phục (Fix):**
  - Tại form `T-10` (Vùng sản xuất), bên cạnh trường nhập diện tích bằng $\text{ha}$, bổ sung ô gợi ý quy đổi đơn vị hoặc cho phép chọn nhanh: `[ Hecta (ha) | Công / Sào ($1.000\text{ m}^2$) ]` và hệ thống tự động quy đổi chuẩn hóa lưu trữ.

### H3. Quyền Kiểm Soát Và Sự Tự Do Của Người Dùng (User Control and Freedom)
- **Điểm sáng đã đạt:**
  - Quy trình hủy thỏa thuận chưa hoàn tất (`PENDING_CONFIRMATION`): Cả Nông dân và Thương lái đều có quyền bấm `[ Hủy thỏa thuận chưa chốt ]` bất kỳ lúc nào trước khi cả hai cùng xác nhận, kèm modal bắt buộc nhập lý do hủy minh bạch.
  - Thương lái có nút `[ Rút lại đề nghị ]` khi đề nghị thu mua còn ở trạng thái `PENDING`.
  - Drawer ghi nhật ký `T-13` và Modal tạo đề nghị tại `T-03` đều có nút đóng `[✕]` rõ ràng và cho phép chạm vùng ngoài (backdrop click) để đóng mà không làm mất trang hiện tại.
- **Vấn đề phát hiện (Issue):**
  - Nếu nông dân đang nhập dở nhật ký trên `T-13` (đã chụp ảnh, gõ ghi chú) mà lỡ tay quẹt đóng drawer, dữ liệu có thể bị mất trắng.
- **Giải pháp khắc phục (Fix):**
  - Bổ sung cơ chế phát hiện form bẩn (Dirty Form Detection): Hiển thị cảnh báo xác nhận *"Bạn có thay đổi chưa lưu. Bạn có chắc muốn đóng?"* nếu người dùng đã nhập liệu vào form trước khi thoát.

### H4. Tính Nhất Quán Và Tiêu Chuẩn Hóa (Consistency and Standards)
- **Điểm sáng đã đạt:**
  - Hệ thống tuân thủ chặt chẽ 5 trạng thái Database nghiệp vụ của bài đăng (`AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED`).
  - Danh sách bài đăng và Bản đồ trên `T-02` dùng chung một nguồn dữ liệu (Data Source) và bộ lọc; nhấp vào thẻ ở danh sách thì pin trên bản đồ nhấp nháy/phóng to tương ứng.
- **Vấn đề phát hiện (Issue):**
  - Nhãn hiển thị trạng thái đề nghị và thỏa thuận cần nhất quán giữa bảng danh sách (T-14, T-16, T-18) và trang chi tiết (T-17, T-19).
- **Giải pháp khắc phục (Fix):**
  - Chuẩn hóa bộ Badge trạng thái trong Design System (Tokens), quy định nhãn tiếng Việt duy nhất, không dùng từ đồng nghĩa lẫn lộn.

### H5. Phòng Ngừa Lỗi (Error Prevention)
- **Điểm sáng đã đạt:**
  - Chặn xác nhận kép trên `T-19`: Bên đã xác nhận bị vô hiệu hóa nút bấm, tránh việc bấm gửi request trùng lặp (Idempotent UI).
  - Khóa số lượng nhập tại Modal tạo đề nghị trên `T-03`: Trường số lượng đề xuất có giới hạn trên `max = availableQuantity`, ngăn chặn đề xuất vượt mức ngay từ client-side.
  - Cảnh báo pháp lý BR-048 xuất hiện cố định với màu nền cảnh báo nhẹ, ngăn chặn việc người dùng ngộ nhận đây là hợp đồng kinh tế đã công chứng.
- **Vấn đề phát hiện (Issue):**
  - Trên form `T-15` (Đăng nguồn cung), nông dân có thể vô tình nhập ngày thu hoạch dự kiến trong quá khứ hoặc sản lượng dự kiến vượt quá diện tích mùa vụ quy định.
- **Giải pháp khắc phục (Fix):**
  - Validation client-side: Ngày thu hoạch bắt buộc $\ge \text{Ngày hiện tại} + 1\text{ ngày}$.
  - Hộp trợ giúp (Helper Box) nhắc nhở khuyến nghị thu hoạch trong 15–30 ngày hiển thị dạng gợi ý màu xanh nhẹ (Info Box), không chặn việc đăng ngoài khoảng này nhưng cảnh báo nếu chọn ngày quá xa (> 90 ngày).

### H6. Nhận Biết Thay Vì Bắt Ghi Nhớ (Recognition Rather Than Recall)
- **Điểm sáng đã đạt:**
  - Form `T-12` (Mùa vụ) tự động hiển thị tên Vùng sản xuất tương ứng ở đầu form.
  - Modal tạo đề nghị thu mua tại `T-03` gắn kèm thẻ tóm tắt nguồn cung (Tên sản phẩm, giống cây, giá tham khảo của nhà vườn) ngay trên các trường nhập liệu, giúp thương lái không cần nhớ hay lội ngược lại xem bài đăng.
- **Vấn đề phát hiện (Issue):**
  - Trên `T-19` (Thỏa thuận thu mua), nếu hai bên thỏa thuận giá và sản lượng khác với bài đăng gốc, người xem có thể bối rối không nhớ giá chào ban đầu là bao nhiêu.
- **Giải pháp khắc phục (Fix):**
  - Trong khối "Điều khoản thỏa thuận", hiển thị thêm dòng tham chiếu mờ (Reference note): `(Giá chào ban đầu của bài đăng: 75.000 đ/kg | Sản lượng chào: 10 tấn)`.

### H7. Tính Linh Hoạt Và Hiệu Quả Thao Tác (Flexibility and Efficiency of Use)
- **Điểm sáng đã đạt:**
  - Khách vãng lai và Thương lái có thể lọc nguồn cung trên `T-01` và `T-02` theo nhiều tiêu chí linh hoạt (Tên quả, Tỉnh thành, Dải ngày tự chọn) mà không bị ép buộc theo một quy trình cứng nhắc.
  - Mobile Split View trên `T-02`: Thanh chuyển đổi phân đoạn (Segmented Control `[ Danh sách (24) | Bản đồ ]`) và nút ghim `[📍 Xem bản đồ]` cho phép chuyển đổi chế độ xem chỉ với 1 chạm.
- **Vấn đề phát hiện (Issue):**
  - Nông dân thường ghi nhật ký canh tác (`T-13`) liên tục với các hoạt động giống nhau (ví dụ: tưới nước hàng ngày, bón phân định kỳ). Việc phải gõ lại từng chữ mỗi ngày gây mất thời gian.
- **Giải pháp khắc phục (Fix):**
  - Bổ sung thanh chọn nhanh loại hoạt động bằng chip bấm (Action Chips): `[💧 Tưới nước]` `[🌱 Bón phân]` `[🛡️ Phun thuốc BVTV]` `[✂️ Cắt tỉa cành]` `[🌾 Thu hoạch]` giúp điền tiêu đề chỉ với 1 chạm.

### H8. Thiết Kế Thẩm Mỹ Và Tinh Giản (Aesthetic and Minimalist Design)
- **Điểm sáng đã đạt:**
  - Bố cục wireframe tối ưu mật độ thông tin: Loại bỏ hoàn toàn các biểu đồ trang trí rườm rà, các thẻ KPI vô nghĩa, không dùng số liệu thống kê ảo ("10.000+ nông dân tin dùng").
  - Hero Banner `T-01` lựa chọn phương án Full-Bleed Panoramic: Tạo cảm giác không gian nông nghiệp Nam Bộ khoáng đạt, hiện đại, uy tín nhưng chân thực.
- **Vấn đề phát hiện (Issue):**
  - Trang `T-03` có nhiều thông tin (Tiến độ sản lượng, Vùng trồng, Giống, Mùa vụ, Nhật ký rút gọn, Liên hệ, Cảnh báo). Nếu không phân nhóm tốt sẽ gây cảm giác "ngợp".
- **Giải pháp khắc phục (Fix):**
  - Phân vùng thẻ theo cấu trúc Thẻ thông tin độc lập (Card Surfaces) có viền mảnh (`border: 1px solid var(--border-color)`), nền trắng kem sạch sẽ, khoảng cách (gap) tiêu chuẩn 16px/24px.

### H9. Giúp Người Dùng Nhận Diện, Chẩn Đoán Và Khắc Phục Lỗi (Error Recovery)
- **Điểm sáng đã đạt:**
  - Mỗi form đều có trạng thái lỗi (Error State) chi tiết đến từng trường: Thông báo lỗi bằng tiếng Việt đặt ngay dưới ô nhập liệu, viền đỏ cảnh báo.
  - Màn hình toàn cục (Global States) được định nghĩa đầy đủ trong cùng template: Trạng thái Trống (Empty), Đang tải (Loading), Lỗi máy chủ (Error 500) kèm nút `[ Thử tải lại ]`.
- **Vấn đề phát hiện (Issue):**
  - Khi một thỏa thuận bị đối tác hủy, người dùng chỉ thấy trạng thái `CANCELLED` mà có thể không biết lý do tại sao đối tác hủy.
- **Giải pháp khắc phục (Fix):**
  - Tại `T-19` khi ở trạng thái `CANCELLED`, khối cảnh báo đầu trang phải làm nổi bật thông tin: `Hủy bởi: [Bên mua/Nông dân] vào [Thời gian] | Lý do hủy: "[Nội dung lý do do người hủy nhập]"`.

### H10. Trợ Giúp Và Tài Liệu Hướng Dẫn (Help and Documentation)
- **Điểm sáng đã đạt:**
  - Chú thích giải nghĩa cơ chế Soft Reserve trên `T-03`: `(?) Sản lượng giữ chỗ là gì?`.
  - Hộp khuyến nghị 15–30 ngày trên `T-15` định hướng nông dân đăng bài đúng thời điểm mà không tạo cảm giác ép buộc.
- **Vấn đề phát hiện (Issue):**
  - Khách vãng lai quét mã QR vào xem `T-04` (Truy xuất) có thể thắc mắc tại sao không thấy con dấu VietGAP được cấp bởi MEKAGREEN.
- **Giải pháp khắc phục (Fix):**
  - Tại `T-04`, khối chứng nhận có dòng giải thích minh bạch: *"MEKAGREEN đóng vai trò số hóa và lưu trữ nhật ký canh tác thực tế do nhà vườn tự ghi nhận. Các giấy chứng nhận (nếu có) được nhà vườn cung cấp và đối chiếu hồ sơ."*

---

## 3. Thẩm Định Khả Năng Tiếp Cận (WCAG 2.1 AA Audit)

| Tiêu chuẩn WCAG 2.1 AA | Yêu cầu kỹ thuật | Hiện trạng Wireframe MEKAGREEN | Đánh giá & Khắc phục |
|:---|:---|:---|:---|
| **1.4.3 Contrast (Minimum)** | Độ tương phản chữ/nền $\ge 4.5:1$ (chữ thường), $\ge 3:1$ (chữ lớn $\ge 18\text{pt}$ / đậm) | Các khối văn bản dùng màu than đậm (Charcoal `#1E293B`) trên nền kem/trắng (`#F8FAFC` / `#FFFFFF`). Màu xanh lá thương hiệu Deep Green (`#1B4D3E` hoặc `#166534`). | **Đạt chuẩn.** Cần khóa mã màu Hex chính xác trong Design System để đảm bảo tỷ lệ tương phản đạt $> 7:1$ cho văn bản chính. |
| **1.4.11 Non-text Contrast** | Độ tương phản các thành phần UI, viền nút, thanh tiến độ $\ge 3:1$ so với nền | Thanh tiến độ 3 màu: Cam kết (Xanh đậm), Giữ chỗ (Vàng đất hổ phách Amber-600), Khả dụng (Xám sáng). | **Cần lưu ý:** Màu vàng hổ phách phải dùng tông đậm (`#D97706` hoặc `#B45309`) trên nền sáng để đạt $\ge 3:1$. Tuyệt đối không dùng màu vàng chanh sáng. |
| **2.5.5 Target Size** | Kích thước vùng chạm tối thiểu $44 \times 44\text{px}$ trên thiết bị cảm ứng | Tất cả các nút bấm, ô input, thẻ chuyển đổi danh mục đều thiết kế chiều cao tối thiểu $48\text{px}$ (vượt chuẩn $44\text{px}$). Khoảng cách giữa 2 nút cạnh nhau $\ge 12\text{px}$. | **Đạt chuẩn.** Tối ưu tuyệt vời cho nông dân đeo găng tay hoặc thao tác ngón cái ngoài đồng ruộng. |
| **1.4.1 Use of Color** | Không truyền tải trạng thái hoặc cảnh báo chỉ bằng màu sắc đơn thuần | Tất cả các badge trạng thái, tiến độ, cảnh báo đều đi kèm **Icon + Nhãn tiếng Việt đầy đủ** (ví dụ: `[🔒 Đang giữ chỗ tạm thời]`, `[✅ Đã cam kết]`, `[⚠️ Cảnh báo]`). | **Đạt chuẩn 100%.** Người khiếm thị màu (Color blind) vẫn nhận biết chính xác thông qua biểu tượng và chữ. |
| **1.4.4 Resize Text** | Giao diện không bị vỡ khi phóng to chữ lên 200% | Sử dụng bố cục linh hoạt Flexbox / CSS Grid, chiều cao ô nhập liệu thích ứng theo dòng chữ, hạn chế `height` cố định, dùng `min-height`. | **Đạt chuẩn.** Cần kiểm tra kỹ trong giai đoạn Prototype và Code. |
| **2.1.1 Keyboard Navigation** | Toàn bộ chức năng thao tác được bằng bàn phím (Tab, Enter, Space, Esc) | Bản đồ trên `T-02` luôn có danh sách thẻ tương ứng bên cạnh để duyệt bàn phím. Modal và Drawer có thể đóng bằng phím `Escape`. | **Đạt chuẩn.** Bổ sung thuộc tính `aria-modal="true"` và bẫy focus (focus trap) khi mở modal trong frontend. |
| **3.3.2 Labels or Instructions** | Mọi ô nhập liệu đều có nhãn hiển thị rõ ràng và hướng dẫn đi kèm | Không dùng placeholder thay thế cho thẻ nhãn (Label). Tất cả các ô form đều có `<label>` nổi phía trên kèm dấu hoa thị đỏ `(*)` cho trường bắt buộc. | **Đạt chuẩn.** Giúp người dùng không bị quên trường mình đang nhập là gì khi đã gõ chữ. |

---

## 4. Thử Nghiệm Bối Cảnh Thực Địa Nam Bộ (Field Context Stress-Test)

### 4.1. Bối cảnh 1: Nông dân thao tác ngoài vườn dưới trời nắng gắt (High Glare & Sunlight)
- **Thực tế:** Màn hình điện thoại bị chói nắng, giảm độ sáng tự động do quá nhiệt; tay nông dân dính đất hoặc ẩm ướt; mắt người lớn tuổi bị mỏi.
- **Rủi ro:** Các nút bấm mờ nhạt, viền xám nhạt (`#E2E8F0`) sẽ biến mất hoàn toàn dưới ánh sáng mặt trời; chữ cỡ $12\text{px} - 14\text{px}$ không thể đọc được.
- **Giải pháp thiết kế:**
  1. Cỡ chữ nội dung chính trên mobile tối thiểu **$16\text{px}$**, tiêu đề tối thiểu **$20\text{px}$**.
  2. Viền các ô form và thẻ thông tin phải có độ tương phản tối thiểu `3:1` so với nền (sử dụng Slate-300 `#CBD5E1` thay vì xám nhạt).
  3. Thanh tác vụ dưới đáy (Sticky Action Bar) trên `T-03`, `T-17`, `T-19` phải có nền trắng đục $100\%$ kèm đổ bóng đậm để tách biệt hoàn toàn với nội dung cuộn bên dưới.

### 4.2. Bối cảnh 2: Kết nối mạng 3G/4G chập chờn dọc bờ kênh / vùng sâu
- **Thực tế:** Tốc độ tải trang chậm, ảnh chụp vườn cây nặng hàng MB tải mãi không xong; người dùng bấm nút nhiều lần vì tưởng bị đơ.
- **Rủi ro:** Tạo đề nghị trùng lặp, gửi form 2 lần, hoặc màn hình trắng xóa gây nản lòng.
- **Giải pháp thiết kế:**
  1. Tất cả nút bấm gửi form (`[ Gửi đề nghị ]`, `[ Xác nhận thỏa thuận ]`, `[ Lưu nhật ký ]`) lập tức chuyển sang trạng thái Loading có spinner xoay và vô hiệu hóa (`disabled`) ngay sau cú chạm đầu tiên.
  2. Hình ảnh nông sản và nhật ký canh tác phải hỗ trợ hiển thị khung xương mờ (Skeleton loader) và nén ảnh tự động trước khi tải lên.
  3. Trang tra cứu `T-04` tối ưu tải cực nhẹ: Không tải bản đồ nặng, không tải thư viện đồ họa thừa; chỉ tải dữ liệu nhật ký và ảnh nén nhẹ để quét QR là hiện ngay lập tức trong vòng $< 1.5$ giây.

### 4.3. Bối cảnh 3: Thương lái đang di chuyển, tra cứu nguồn cung trên xe
- **Thực tế:** Thương lái cần lướt nhanh danh sách vườn sắp thu hoạch theo trục đường giao thông (Quốc lộ 1A, Cao tốc Trung Lương - Mỹ Thuận, Quốc lộ 50).
- **Rủi ro:** Tìm kiếm địa chỉ quá vụn vặt gây khó thao tác.
- **Giải pháp thiết kế:**
  1. Bộ lọc tỉnh thành trên `T-01` và `T-02` đặt các tỉnh trọng điểm vựa trái cây Nam Bộ lên đầu: Tiền Giang, Bến Tre, Vĩnh Long, Đồng Tháp, Cần Thơ, Hậu Giang, Sóc Trăng, Đồng Nai, Bình Phước.
  2. Thẻ kết quả hiển thị thông tin mấu chốt ở dạng bảng tóm tắt 3 dòng: **Sản phẩm & Giống** | **Ngày thu hoạch & Sản lượng khả dụng** | **Địa bàn & Giá chào**.

---

## 5. Danh Mục Vấn Đề UX (Issues List & Phân Hạng Nghiêm Trọng)

Dưới đây là danh sách toàn bộ các vấn đề phát hiện được qua đợt thẩm định khung dây, phân loại theo thang mức độ ưu tiên từ P0 đến P3:

| Mã vấn đề | Màn hình | Mô tả chi tiết vấn đề | Mức độ | Rủi ro nếu không sửa |
|:---|:---|:---|:---:|:---|
| **ISSUE-01** | `T-19` | Trạng thái thỏa thuận bị hủy (`CANCELLED`) chưa làm nổi bật bên hủy và lý do hủy, dễ gây tranh cãi giữa 2 bên | **P0 (Critical)** | Đối tác không hiểu vì sao thỏa thuận bị hủy, nghi ngờ hệ thống bị lỗi hoặc đối tác lật kèo |
| **ISSUE-02** | `T-03`, `T-17` | Thiếu thông báo giải thích rõ khi sản lượng khả dụng về 0 do giữ chỗ tạm thời (Soft Reserve) | **P1 (High)** | Thương lái tưởng bài đăng đã bán hết hoàn toàn, bỏ đi không theo dõi lại |
| **ISSUE-03** | `T-13` | Nông dân thoát Drawer ghi nhật ký vô tình làm mất dữ liệu đã nhập | **P1 (High)** | Ức chế cho nông dân, làm giảm tỷ lệ ghi nhật ký thực tế |
| **ISSUE-04** | `T-03` | Người dùng là Nông dân khác (không phải chủ bài) vẫn thấy giao diện giống Khách vãng lai, cần giải thích vì sao không gửi đề nghị thu mua được | **P2 (Medium)** | Nông dân hiểu lầm hệ thống lỗi khi không thấy nút hành động |
| **ISSUE-05** | `T-10` | Đơn vị diện tích vùng trồng chỉ có Hecta ($\text{ha}$) gây khó khăn cho nông dân quen tính theo "Công" | **P2 (Medium)** | Nhập sai diện tích (nhầm 1 công = 1 ha khiến số liệu vọt lên gấp 10 lần) |
| **ISSUE-06** | `T-04` | Trang truy xuất công khai trên mobile có thể bị người dùng nhầm là trang mua bán nếu có quá nhiều nút điều hướng | **P2 (Medium)** | Làm loãng mục tiêu minh bạch thông tin nguồn gốc sản xuất |
| **ISSUE-07** | `T-02` | Chế độ bản đồ trên mobile (Split view chuyển đổi) cần nút quay lại danh sách dễ với tới bằng ngón cái | **P3 (Low)** | Thao tác chuyển đổi qua lại giữa bản đồ và danh sách bị chậm |
| **ISSUE-08** | `T-15` | Hộp gợi ý 15–30 ngày nếu thiết kế giống thông báo lỗi sẽ khiến nông dân nghĩ họ bị phạt hoặc bị cấm đăng | **P3 (Low)** | Nông dân e ngại không dám đăng bài thu hoạch trước thời vụ dài |

---

## 6. Kế Hoạch Giải Pháp & Khắc Phục Cụ Thể (Actionable Fixes)

```
====================================================================================================
CHI TIẾT CÁC GIẢI PHÁP ĐIỀU CHỈNH CHO GIAI ĐOẠN TIẾP THEO (DESIGN SYSTEM & HI-FI PROTOTYPE)
====================================================================================================
```

### Giải pháp cho ISSUE-01 (P0): Thẻ thông tin Hủy Thỏa Thuận minh bạch trên `T-19`
- **Thiết kế UI:** Khi `status == CANCELLED`, đặt một khối cảnh báo màu xám viền đỏ đất (`#FEE2E2` / `#DC2626`) ngay đầu trang:
  ```
  +------------------------------------------------------------------------------------+
  | 🚫 THỎA THUẬN ĐÃ ĐƯỢC HỦY                                                         |
  | Người thực hiện: [Bên Mua: Công ty TNHH Nông sản Miền Tây]                         |
  | Thời điểm hủy: 14:20 ngày 22/10/2026                                              |
  | Lý do hủy: "Thay đổi kế hoạch vận chuyển do thời tiết, không thể điều xe tải đến."|
  | Hệ thống đã tự động giải phóng 5.000 kg sản lượng giữ chỗ về bài đăng gốc.       |
  +------------------------------------------------------------------------------------+
  ```
- **Tác động:** Xóa bỏ nghi ngờ, bảo đảm tính minh bạch tuyệt đối theo BR-046.

### Giải pháp cho ISSUE-02 (P1): Banner giải thích Soft Reserve trên `T-03` & `T-17`
- **Thiết kế UI:** Khi `availableQuantity == 0` nhưng `reservedQuantity > 0`, hiển thị Banner màu hổ phách dịu (Amber-50 `#FFFBEB`, viền Amber-300 `#FCD34D`):
  ```
  +------------------------------------------------------------------------------------+
  | ⏳ TẠM HẾT SẢN LƯỢNG KHẢ DỤNG DO ĐANG GIỮ CHỖ THỎA THUẬN                           |
  | Hiện tại toàn bộ 10 tấn đã được đưa vào thỏa thuận thu mua chờ hai bên xác nhận.   |
  | Bạn chưa thể gửi thêm đề nghị thu mua lúc này. Nếu có thỏa thuận bị hủy, sản lượng |
  | còn trống sẽ tự động mở lại cho thương lái khác.                                   |
  +------------------------------------------------------------------------------------+
  ```
- Nút `[ Gửi đề nghị thu mua ]` chuyển sang dạng vô hiệu hóa có tooltip giải thích: *"Tạm hết sản lượng khả dụng"*.

### Giải pháp cho ISSUE-03 (P1): Cơ chế bảo vệ dữ liệu nhập dở trên `T-13`
- Khi người dùng bấm nút `[✕]`, quẹt xuống hoặc chạm nền mờ khi form đã có dữ liệu, hiển thị hộp thoại xác nhận (Confirm Dialog):
  - Tiêu đề: *"Hủy bỏ nội dung nhật ký?"*
  - Nội dung: *"Các thông tin và ảnh bạn vừa nhập sẽ không được lưu. Bạn có chắc chắn muốn thoát?"*
  - 2 nút bấm: `[ Tiếp tục ghi ]` (Primary) và `[ Rời khỏi & Hủy ]` (Secondary).

### Giải pháp cho ISSUE-04 (P2): Làm rõ trạng thái cho Nông Dân khác trên `T-03`
- Đối với tài khoản Nông dân nhưng **không phải chủ bài đăng**:
  - Không hiển thị nút "Gửi đề nghị thu mua" (do BR-040 quy định chỉ Buyer mới được gửi đề nghị).
  - Thay bằng hộp thông tin lịch sự:
    ```
    [ℹ️ Tài khoản của bạn là Nông Dân. Chỉ tài khoản Thương Lái / Doanh Nghiệp Mua mới có thể gửi đề nghị thu mua.]
    ```

### Giải pháp cho ISSUE-05 (P2): Hỗ trợ quy đổi đơn vị "Công" trên `T-10`
- Tại ô nhập Diện tích:
  ```
  Diện tích canh tác (*):
  [   1.5   ] [ Hecta (ha) ▼ ]   ≈ 15 Công tầm cắt (15.000 m²)
  ```
  Cho phép chọn đơn vị: `Hecta (ha)`, `Công tầm cắt (1.000 m²)`, `Công tầm cấy (1.296 m²)`. Hệ thống hiển thị dòng quy đổi tương đương ngay bên dưới để nông dân đối chiếu tức thì.

### Giải pháp cho ISSUE-06 (P2): Thiết kế T-04 thuần túy cho mục đích Minh Bạch
- `T-04` là trang truy xuất mở cho người tiêu dùng và chuỗi cung ứng quét QR.
- Header chỉ hiển thị Logo MEKAGREEN và tiêu đề *"Hồ sơ truy xuất nguồn gốc nông sản"*.
- Không hiển thị các nút mua bán phức tạp; chỉ có nút chia sẻ trang `[🔗 Chia sẻ]` và nút xem vị trí trên bản đồ.

### Giải pháp cho ISSUE-07 (P3): Tối ưu nút chuyển đổi Map / List trên `T-02` Mobile
- Đặt nút tròn nổi (Floating Action Button - FAB) cố định ở góc dưới bên phải màn hình mobile:
  - Khi đang ở danh sách: Nút hiển thị `[ 🗺️ Bản đồ ]` (kèm số lượng pin).
  - Khi đang ở bản đồ: Nút hiển thị `[ 📋 Danh sách ]`.
- Giúp ngón tay cái tiếp cận tức thì mà không cần phải với tay lên đầu trang.

### Giải pháp cho ISSUE-08 (P3): Điều chỉnh tông giọng gợi ý 15–30 ngày trên `T-15`
- Sử dụng màu xanh ngọc nhạt (Teal/Emerald-50) kèm icon bóng đèn `[💡 Gợi ý thời điểm vàng]`:
  - Nội dung: *"Kinh nghiệm từ các nhà vườn: Đăng nguồn cung trước ngày thu hoạch từ 15 đến 30 ngày giúp thương lái dễ dàng bố trí phương tiện và đạt được giá thỏa thuận tốt nhất."*
  - Tuyệt đối không dùng icon cảnh báo tam giác vàng hay chữ đỏ.

---

## 7. Khuyến Nghị Trực Tiếp Cho Giai Đoạn 8: Design System

Từ các kết quả thẩm định trên, Giai đoạn 8 (Design System) cần xây dựng các thành phần và Token thiết kế chuyên biệt sau:

1. **Bảng màu Token (Color Tokens):**
   - `primary-dark`: `#1B4D3E` (Deep Agricultural Green — Đạt tương phản $> 7:1$ trên nền trắng).
   - `surface-warm`: `#FBFBF9` (Nền kem sáng, giảm lóa mắt khi xem ngoài trời nắng).
   - `text-main`: `#1E293B` (Slate-800 — Màu than đậm, dễ đọc, không dùng đen tuyệt đối `#000000`).
   - `status-reserve`: `#D97706` (Amber-600 — Đậm đà, đạt tương phản $> 3:1$ cho thanh tiến độ).
   - `border-field`: `#CBD5E1` (Slate-300 — Viền rõ nét, không bị chìm khi nắng gắt).

2. **Kích thước vùng chạm & Typography Tokens:**
   - Chiều cao nút bấm cơ bản: `48px` (Mobile) / `44px` (Desktop).
   - Chiều cao ô Input: `48px` với cỡ chữ bên trong `16px` (tránh trình duyệt iOS tự động zoom in).
   - Font chữ: Hỗ trợ 100% tiếng Việt có dấu hoàn hảo, đường nét rõ ràng (ví dụ: `Inter` hoặc `Plus Jakarta Sans`).

3. **Thành phần dùng chung cốt lõi (Core Components):**
   - `ThreeTierProgressBar`: Thanh tiến độ 3 màu chuẩn hóa (Cam kết / Giữ chỗ / Khả dụng).
   - `StatusBadge`: Huy hiệu trạng thái kèm icon + nhãn tiếng Việt cố định.
   - `LegalDisclaimerBox`: Hộp cảnh báo pháp lý BR-048 chuẩn hóa.
   - `DirtyFormGuard`: Hộp thoại bảo vệ dữ liệu khi đóng drawer/modal.
   - `ContextualInfoBanner`: Khối thông báo trạng thái kho giữ chỗ mềm.

---

## 8. Kết Luận & Đề Xuất Phê Duyệt (Gate Review Conclusion)

### Đánh giá tổng thể:
Bản vẽ khung dây tại [WIREFRAMES.md](./WIREFRAMES.md) đã thể hiện xuất sắc toàn bộ các yêu cầu nghiệp vụ khắt khe của MEKAGREEN:
- Đã giải quyết triệt để bài toán Soft Reserve và chống cam kết vượt mức.
- Đã phân quyền nghiêm ngặt 4 vai trò trên `T-03` mà không làm vỡ bố cục chung.
- Đã tuân thủ cơ cấu địa giới hành chính hiện hành 2026 và bảo vệ quyền riêng tư tọa độ GPS.
- Đã thiết lập cơ chế xác nhận 2 bên và hủy thỏa thuận minh bạch trên `T-19`.

Các vấn đề phát hiện trong tài liệu UX Review này chủ yếu tập trung vào việc **tinh chỉnh trải nghiệm thực địa, tăng cường thông báo ngữ cảnh và tối ưu khả năng tiếp cận ngoài trời**. Tất cả đều có giải pháp khắc phục cụ thể và sẽ được áp dụng ngay vào **Giai đoạn 8 (Design System)**.

---
> **Đề xuất bước tiếp theo:** Kính trình duyệt báo cáo UX Review để chính thức hoàn tất Giai đoạn 7 và mở cổng chuyển sang **Giai đoạn 8 – Xây dựng Design System**.
