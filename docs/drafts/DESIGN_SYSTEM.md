STATUS: DRAFT – NOT APPROVED
This document was created prematurely before Phase 6 approval.
It must not be treated as a source of truth until explicitly reviewed and approved.

# 🎨 Hệ Thống Thiết Kế (Design System) — MEKAGREEN

> **Dự án:** MEKAGREEN — Nền tảng kết nối nguồn cung nông sản Nam Bộ trước thu hoạch  
> **Giai đoạn:** 8 (Design System Specification)  
> **Tài liệu đối chiếu:** [UIUX_PLANNING_PROMPT.md](./UIUX_PLANNING_PROMPT.md), [UX_REVIEW.md](./UX_REVIEW.md), [WIREFRAMES.md](./WIREFRAMES.md), [BUSINESS_RULES.md](./BUSINESS_RULES.md)  
> **Tiêu chuẩn tuân thủ:** WCAG 2.1 AA | Thiết kế thực địa Nam Bộ (Outdoor-proof, Mobile-first for Farmer)  
> **Trạng thái:** Hoàn tất thông số kỹ thuật (Chờ phê duyệt trước khi lập High-fidelity Prototype)

---

## 1. Triết Lý & Nguyên Tắc Thiết Kế Cốt Lõi

Hệ thống thiết kế MEKAGREEN được xây dựng dựa trên 4 trụ cột nhận diện:
1. **Modern Vietnamese Agritech (Nông nghiệp công nghệ cao Nam Bộ):**
   - Màu sắc chủ đạo lấy cảm hứng từ sông nước Cửu Long và màu xanh bạt ngàn của miệt vườn cây trái (Tiền Giang, Bến Tre, Vĩnh Long, Đồng Nai).
   - Tươi sáng, sạch sẽ, đáng tin cậy; xóa bỏ định kiến ứng dụng nông nghiệp là giao diện hành chính khô cứng hoặc thô sơ.
2. **Professional B2B Platform (Sàn giao dịch nông sản chuyên nghiệp):**
   - Cung cấp dữ liệu vận hành sắc nét, mật độ thông tin vừa phải, phân tầng trực quan cao (High Scannability).
   - Không thiết kế theo phong cách thương mại điện tử tiêu dùng đại trà (B2C) hay mạng xã hội; tập trung vào sản lượng, ngày thu hoạch, vị trí địa lý và điều khoản thỏa thuận.
3. **Thực Địa & Chống Lóa Ngoài Trời (Outdoor-proof & Field Usability):**
   - Tối ưu cho người dùng nông dân thao tác trực tiếp tại vườn cây ăn trái dưới ánh sáng mặt trời gay gắt.
   - Viền thẻ và ô nhập liệu rõ nét, chữ to dễ đọc ($\ge 16\text{px}$), vùng chạm bấm ngón tay rộng rãi ($\ge 48\text{px}$).
4. **Tuyệt Đối Trung Thực Dữ Liệu (Radical Data Honesty):**
   - Không sử dụng màu sắc gây ngộ nhận; phân biệt rạch ròi giữa dữ liệu thực tế và dự kiến.
   - Trạng thái hệ thống luôn đi kèm văn bản tiếng Việt rõ nghĩa và biểu tượng nhận diện, không bao giờ chỉ dùng màu sắc đơn thuần.

---

## 2. Hệ Thống Biến Thiết Kế (Design Tokens)

### 2.1. Bảng Màu (Color Tokens)

#### A. Màu Thương Hiệu & Bề Mặt (Brand & Surfaces)
| Token Name | Hex Code | Tỷ lệ tương phản (so với nền) | Mục đích sử dụng |
|:---|:---:|:---:|:---|
| `--color-primary-dark` | `#1B4D3E` | $8.2 : 1$ (trên trắng) | Màu thương hiệu chính, Header, Nút Primary, Tiêu đề chính |
| `--color-primary-hover` | `#143D31` | $9.8 : 1$ (trên trắng) | Trạng thái hover/active của nút Primary |
| `--color-primary-light` | `#E8F5E9` | N/A (Màu nền phụ) | Nền chip, thẻ đang chọn, thanh tiến độ khả dụng |
| `--color-surface-bg` | `#FBFBF9` | N/A (Nền ứng dụng) | Nền ấm ngả kem tự nhiên, chống mỏi mắt và giảm chói dưới trời nắng |
| `--color-surface-card` | `#FFFFFF` | N/A (Bề mặt thẻ) | Nền thẻ nội dung, nền Modal, Drawer, ô nhập liệu |
| `--color-surface-muted` | `#F1F5F9` | N/A (Nền phụ) | Nền bảng số liệu, khối tóm tắt thông tin |

#### B. Màu Chữ & Văn Bản (Typography Colors)
| Token Name | Hex Code | Độ tương phản WCAG 2.1 | Mục đích sử dụng |
|:---|:---:|:---:|:---|
| `--color-text-main` | `#1E293B` | $11.5 : 1$ (trên kem/trắng) | Chữ nội dung chính, tiêu đề bài đăng, số liệu quan trọng |
| `--color-text-secondary` | `#475569` | $6.8 : 1$ (Đạt chuẩn AA) | Chữ mô tả phụ, nhãn thông tin, địa chỉ vùng trồng |
| `--color-text-muted` | `#64748B` | $4.8 : 1$ (Đạt chuẩn AA) | Thời gian cập nhật, chú thích mờ, placeholder |
| `--color-text-inverse` | `#FFFFFF` | $8.2 : 1$ (trên `#1B4D3E`) | Chữ trên nền nút đậm |

#### C. Màu Trạng Thái Nghiệp Vụ (Semantic & Status Colors)
> **Quy tắc WCAG:** Mọi màu trạng thái chữ đều phải đạt độ tương phản tối thiểu $4.5 : 1$ trên nền sáng tương ứng.

| Trạng thái | Token Chữ & Viền | Token Nền | Ý nghĩa nghiệp vụ |
|:---|:---:|:---:|:---|
| **Khả dụng (Available)** | `--color-success: #047857` | `--color-success-bg: #D1FAE5` | Bài đăng còn sản lượng, Đề nghị được chấp nhận |
| **Cam kết (Committed)** | `--color-committed: #166534` | `--color-committed-bg: #DCFCE7` | Thỏa thuận đã xác nhận, Sản lượng đã cam kết |
| **Giữ chỗ mềm (Soft Reserve)** | `--color-reserve: #B45309` | `--color-reserve-bg: #FEF3C7` | Đang giữ chỗ tạm thời chờ xác nhận, Chờ phản hồi |
| **Cảnh báo (Warning)** | `--color-warning: #D97706` | `--color-warning-bg: #FFFBEB` | Nhắc nhở thời vụ 15–30 ngày, cảnh báo sắp hết hạn |
| **Hủy / Từ chối (Danger)** | `--color-danger: #B91C1C` | `--color-danger-bg: #FEE2E2` | Thỏa thuận đã hủy, Đề nghị bị từ chối, Bài đăng hủy |
| **Đóng / Muted (Closed)** | `--color-neutral: #475569` | `--color-neutral-bg: #F1F5F9` | Bài đăng đã đóng, Đề nghị đã rút |

#### D. Viền & Đường Phân Cách (Borders & Dividers)
- `--color-border-field: #CBD5E1` (Slate-300 — Viền rõ nét cho ô nhập liệu ngoài trời nắng, đạt tương phản $3:1$).
- `--color-border-card: #E2E8F0` (Slate-200 — Viền phân tách các khối thẻ nội dung).
- `--color-focus-ring: #1B4D3E` (Vòng sáng viền khi focus bàn phím, rộng $2\text{px}$, khoảng đệm $2\text{px}$).

---

### 2.2. Hệ Thống Kiểu Chữ (Typography Tokens)

- **Phông chữ chỉ định:** `Plus Jakarta Sans` hoặc `Inter` (Fallback: `Be Vietnam Pro, system-ui, -apple-system, sans-serif`).
- Đảm bảo hiển thị hoàn hảo 100% tiếng Việt có dấu, không bị lỗi dính dấu thanh hay méo khoảng cách ký tự.

| Cấp bậc (Level) | Kích thước (Desktop) | Kích thước (Mobile) | Line Height | Font Weight | Áp dụng cho |
|:---|:---:|:---:|:---:|:---:|:---|
| **Display (Hero)** | $36\text{px}$ | $28\text{px}$ | $125\%$ | $700$ (Bold) | Tiêu đề Hero Banner `T-01` |
| **Heading 1 (H1)** | $28\text{px}$ | $24\text{px}$ | $130\%$ | $700$ (Bold) | Tiêu đề trang chi tiết, Trang Chợ nguồn cung |
| **Heading 2 (H2)** | $22\text{px}$ | $20\text{px}$ | $135\%$ | $600$ (SemiBold)| Tiêu đề khối nội dung, Tên nhà vườn |
| **Heading 3 (H3)** | $18\text{px}$ | $17\text{px}$ | $140\%$ | $600$ (SemiBold)| Tiêu đề thẻ sản phẩm, Tiêu đề Modal/Drawer |
| **Body Large** | $16\text{px}$ | $16\text{px}$ | $150\%$ | $500$ (Medium)  | Nội dung chính, Văn bản trong ô nhập liệu |
| **Body Regular** | $15\text{px}$ | $15\text{px}$ | $150\%$ | $400$ (Regular) | Mô tả chi tiết, Điều khoản thỏa thuận |
| **Caption / Meta** | $13\text{px}$ | $13\text{px}$ | $140\%$ | $500$ (Medium)  | Thời gian cập nhật, Đơn vị tính, Nhãn phụ |
| **Badge / Micro** | $12\text{px}$ | $12\text{px}$ | $130\%$ | $600$ (SemiBold)| Huy hiệu trạng thái, Mã số bài đăng |

---

### 2.3. Khoảng Cách & Lưới Bố Cục (Spacing & Layout Tokens)

Hệ thống lưới dựa trên hệ số nhân cơ bản $4\text{px}$:
- `--space-1`: $4\text{px}$ | `--space-2`: $8\text{px}$ | `--space-3`: $12\text{px}$ | `--space-4`: $16\text{px}$
- `--space-5`: $20\text{px}$ | `--space-6`: $24\text{px}$ | `--space-8`: $32\text{px}$ | `--space-10`: $40\text{px}$
- `--space-12`: $48\text{px}$ | `--space-16`: $64\text{px}$

**Quy chuẩn chiều rộng Container:**
- Max Container Desktop: $1280\text{px}$ (Căn giữa màn hình, lề $24\text{px}$).
- Hero Panoramic Full-Bleed: $100\%$ chiều rộng màn hình (Full viewport width).
- Lề an toàn di động (Mobile Padding): $16\text{px}$.

---

### 2.4. Độ Bo Góc (Border Radius Tokens)

Kiểm soát chặt chẽ độ bo góc để giữ phong cách chuyên nghiệp B2B, tránh bo tròn quá đà dạng "bong bóng":
- `--radius-sm`: $4\text{px}$ (Ô checkbox, tag kỹ thuật, ảnh thumbnail nhỏ).
- `--radius-md`: $8\text{px}$ (Nút bấm tiêu chuẩn, ô input, menu dropdown, thẻ tóm tắt).
- `--radius-lg`: $12\text{px}$ (Thẻ sản phẩm, Modal Dialog, Drawer trượt mobile).
- `--radius-full`: $9999\text{px}$ (Huy hiệu trạng thái dạng pill, nút tròn nổi FAB).

---

### 2.5. Đổ Bóng & Phân Tầng Độ Sâu (Elevation & Shadows)

- `--shadow-subtle`: `0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)` (Thẻ sản phẩm tĩnh).
- `--shadow-card-hover`: `0 6px 16px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)` (Thẻ khi hover).
- `--shadow-floating`: `0 12px 28px -4px rgba(27, 77, 62, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.05)` (Thanh tìm kiếm nổi `T-01`).
- `--shadow-bottom-bar`: `0 -4px 16px rgba(0, 0, 0, 0.08)` (Thanh tác vụ ghim đáy mobile `StickyActionBar`).

---

### 2.6. Điểm Gãy Thích Ứng (Responsive Breakpoints)

- **Mobile:** `< 768px` (Thao tác 1 tay, danh sách đơn cột, Drawer trượt lên, thanh tác vụ đáy).
- **Tablet:** `768px – 1199px` (Lưới 2 cột, hỗ trợ xoay ngang máy tính bảng).
- **Desktop:** `≥ 1200px` (Lưới 3–4 cột, Split View Chợ & Bản đồ song song).

---

## 3. Đặc Tả Thành Phần Giao Diện Cốt Lõi (Core Components)

### 3.1. Nút Bấm (Button Components)

> **Nguyên tắc ngón tay thực địa:** Chiều cao nút bấm trên di động bắt buộc đạt tối thiểu **$48\text{px}$** để đảm bảo chuẩn chạm ngoài vườn ($> 44\text{px}$). Trên desktop chuẩn $44\text{px}$.

```
+--------------------------------------------------------------------------------------------------+
| CÁC BIẾN THỂ NÚT BẤM (BUTTON VARIANTS)                                                           |
+--------------------+-----------------------------------------------------+-----------------------+
| Biến thể           | Quy cách trực quan (Style & Tokens)                 | Trường hợp sử dụng    |
+--------------------+-----------------------------------------------------+-----------------------+
| Primary            | Nền: #1B4D3E, Chữ: Trắng, Bo góc: 8px               | Xác nhận, Tạo đề nghị |
| Secondary          | Nền: #E8F5E9, Chữ: #1B4D3E, Viền: #1B4D3E (1px)     | Đăng nguồn cung, Lọc  |
| Danger / Cancel    | Nền: #FEE2E2, Chữ: #B91C1C, Viền: #FCA5A5 (1px)     | Hủy thỏa thuận, Rút   |
| Outline Muted      | Nền: Trắng, Chữ: #475569, Viền: #CBD5E1 (1px)       | Đóng, Xem lại, Quay về|
| Call / Zalo Native | Nền: #0284C7, Chữ: Trắng (Zalo) / #16A34A (Gọi điện)| Thao tác liên hệ nhanh|
+--------------------+-----------------------------------------------------+-----------------------+
```

#### Trạng thái nút bấm (Button States):
1. **Default:** Tương phản cao, chữ đậm vừa phải ($500$).
2. **Hover / Focus:** Đổi màu nền dịu $10\%$, hiển thị vòng sáng `ring-2 ring-primary ring-offset-2`.
3. **Loading:** Vô hiệu hóa ngay lập tức sau 1 chạm, hiển thị vòng xoay spinner kèm chữ *"Đang xử lý..."*, ngăn chặn bấm đúp ngoài thực địa.
4. **Disabled:** Nền `#F1F5F9`, chữ `#94A3B8`, viền `#E2E8F0`, chuột `not-allowed`. Đi kèm tooltip giải thích nguyên nhân vô hiệu hóa.

---

### 3.2. Ô Nhập Liệu & Biểu Mẫu (Form Controls)

Mọi ô nhập liệu đều tuân thủ cấu trúc 3 phần cố định:
```
[ Nhãn trường (Label) ] (*) Bắt buộc
+----------------------------------------------------------------------+
| [Icon phụ]  Giá trị nhập liệu ...                [Đơn vị đo: kg ▼]  |
+----------------------------------------------------------------------+
[ Dòng trợ giúp / Thông báo lỗi tiếng Việt màu đỏ ]
```

- **Quy cách ô nhập:** Chiều cao $48\text{px}$ trên di động, viền `1px solid var(--color-border-field)` (`#CBD5E1`), bo góc $8\text{px}$. Chữ bên trong cỡ $16\text{px}$ để tránh iOS tự phóng to màn hình.
- **Ô chọn đơn vị hành chính 2026 (Administrative Selector):**
  - Cấp 1: `Tỉnh / Thành phố trực thuộc TW` (Dropdown danh mục tỉnh/thành phố hiện hành, ưu tiên các tỉnh Nam Bộ lên đầu).
  - Cấp 2: `Địa bàn cơ sở / Phường / Xã` (Dropdown hoặc ô tự nhập có gợi ý). Không bắt buộc trường "Cấp Huyện" theo đúng tinh thần cải cách 2026.
- **Ô quy đổi diện tích (Land Area Input):**
  - Hỗ trợ chọn đơn vị: `Hecta (ha)` hoặc `Công tầm cắt (1.000 m²)`.
  - Hiển thị dòng quy đổi tức thì mờ bên dưới: *"Tương đương: 15.000 m² (1,5 ha)"* để nông dân đối chiếu chính xác.
- **Ô tải ảnh canh tác / mùa vụ (Mobile Camera Capture):**
  - Nút bấm lớn $48\text{px}$ có biểu tượng máy ảnh: `[ 📷 Chụp ảnh thực tế tại vườn / Tải ảnh lên ]`.
  - Xem trước dạng thẻ vuông $80 \times 80\text{px}$ kèm nút xóa `[✕]` góc trên.

---

### 3.3. Bộ Huy Hiệu Trạng Thái Nghiệp Vụ (Status Badges)

> **Quy tắc tuyệt đối:** Không bao giờ dùng màu sắc đơn thuần. Tất cả các huy hiệu trạng thái đều bao gồm: **Biểu tượng (Icon) + Nhãn tiếng Việt chính xác + Màu nền/chữ chuẩn tương phản**.

#### A. Trạng thái Bài Đăng Nguồn Cung (Harvest Listing)
| Trạng thái Database | Nhãn tiếng Việt hiển thị | Màu nền / Màu chữ | Icon |
|:---|:---|:---:|:---:|
| `AVAILABLE` | `Đang mở` | `#D1FAE5` / `#047857` | 🟢 |
| `PARTIALLY_COMMITTED` | `Đã cam kết một phần` | `#DCFCE7` / `#166534` | 🔵 |
| `FULLY_COMMITTED` | `Đã cam kết đủ sản lượng`| `#F3E8FF` / `#6B21A8` | 🟣 |
| `CLOSED` | `Đã đóng` | `#F1F5F9` / `#475569` | ⚪ |
| `CANCELLED` | `Đã hủy` | `#FEE2E2` / `#B91C1C` | 🔴 |
| *(Trạng thái hiển thị UX)* | `Tạm hết sản lượng (Chờ xác nhận)` | `#FEF3C7` / `#B45309` | ⏳ |

#### B. Trạng thái Đề Nghị Thu Mua (Purchase Proposal)
| Trạng thái | Nhãn tiếng Việt hiển thị | Màu nền / Màu chữ | Icon |
|:---|:---|:---:|:---:|
| `PENDING` | `Chờ phản hồi` | `#FEF3C7` / `#B45309` | 🟡 |
| `ACCEPTED` | `Đã chấp nhận` | `#D1FAE5` / `#047857` | 🟢 |
| `REJECTED` | `Đã từ chối` | `#FEE2E2` / `#B91C1C` | 🔴 |
| `WITHDRAWN` | `Đã rút` | `#F1F5F9` / `#475569` | ⚪ |
| `EXPIRED` | `Hết hạn` | `#FEE2E2` / `#991B1B` | ⏰ |

#### C. Trạng thái Thỏa Thuận Thu Mua (Procurement Agreement)
| Trạng thái | Nhãn tiếng Việt hiển thị | Màu nền / Màu chữ | Icon |
|:---|:---|:---:|:---:|
| `PENDING_CONFIRMATION` | `Chờ hai bên xác nhận` | `#FEF3C7` / `#B45309` | ⏳ |
| `CONFIRMED` | `Đã xác nhận hai bên` | `#DCFCE7` / `#166534` | ✅ |
| `CANCELLED` | `Đã hủy` | `#FEE2E2` / `#B91C1C` | 🚫 |

#### D. Huy hiệu Xác Nhận 2 Bên (Two-party Confirmation Badges tại T-19)
- **Khi phía mình đã bấm xác nhận:**  
  `[ ✅ Bạn đã xác nhận vào {Thời gian}. Đang chờ đối tác xác nhận ]`  
  *(Nền xanh ngọc nhạt `#DCFCE7`, chữ xanh đậm `#166534`, viền `#86EFAC`, nút xác nhận biến mất hoàn toàn để chặn xác nhận kép).*
- **Khi đối tác đã xác nhận trước:**  
  `[ 🔔 Đối tác đã xác nhận vào {Thời gian}. Vui lòng kiểm tra và xác nhận ]`  
  *(Nền vàng cam nhạt `#FEF3C7`, chữ `#B45309`, viền `#FCD34D`).*

---

### 3.4. Thanh Tiến Độ Sản Lượng 3 Phân Tầng (ThreeTierProgressBar)

Thành phần trực quan quan trọng nhất để giải thích cơ chế **Soft Reserve**:
```
+--------------------------------------------------------------------------------------------------+
| THANH TIẾN ĐỘ SẢN LƯỢNG 3 PHÂN TẦNG (THREETIERPROGRESSBAR)                                       |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [=========================][===================][==============================================] |
|   Đã cam kết: 4 Tấn (40%)    Giữ chỗ: 3 Tấn (30%)         Còn khả dụng: 3 Tấn (30%)             |
|   Màu: #166534 (Xanh rêu)    Màu: #D97706 (Hổ phách)      Màu: #A7F3D0 (Xanh lá nhạt)            |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
```
- **Chiều cao thanh:** $14\text{px}$ trên Desktop, $16\text{px}$ trên Mobile; bo góc tròn trơn $8\text{px}$.
- **Quy chuẩn tỷ lệ:** $\text{Tỷ lệ } \% = (\text{Sản lượng từng phần} / \text{Tổng sản lượng dự kiến}) \times 100\%$.
- **Chú thích số liệu (Legend):** Luôn đi kèm 3 chấm tròn màu chỉ định kèm số lượng bằng tấn/kg và phần trăm tương ứng ngay bên dưới thanh.

---

### 3.5. Hộp Cảnh Báo & Thông Báo Ngữ Cảnh (Alert Banners)

#### A. Cảnh Báo Pháp Lý Thỏa Thuận Bắt Buộc (BR-048 Legal Disclaimer)
Đặt cố định tại đầu trang chi tiết thỏa thuận `T-19`:
```
+--------------------------------------------------------------------------------------------------+
| ⚠️ CẢNH BÁO PHÁP LÝ HỆ THỐNG:                                                                    |
| "Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN. Đây không phải chữ ký số hay  |
| hợp đồng điện tử có giá trị pháp lý."                                                            |
+--------------------------------------------------------------------------------------------------+
* Quy cách: Nền vàng kem ấm (#FFFBEB), viền vàng đất (#FDE68A 1px), chữ than đậm (#1E293B).
```

#### B. Thông Báo Hủy Thỏa Thuận Minh Bạch (Issue-01 Resolution)
Hiển thị khi thỏa thuận chuyển sang `CANCELLED`:
```
+--------------------------------------------------------------------------------------------------+
| 🚫 THỎA THUẬN ĐÃ ĐƯỢC HỦY BỞI [TÊN BÊN HỦY]                                                      |
| Thời điểm: [14:20 ngày 22/10/2026]                                                               |
| Lý do hủy: "[Nội dung lý do]"                                                                    |
| Hệ thống đã giải phóng toàn bộ [X kg] sản lượng giữ chỗ về bài đăng nguồn cung ban đầu.          |
+--------------------------------------------------------------------------------------------------+
* Quy cách: Nền đỏ đất nhạt (#FEE2E2), viền đỏ (#FCA5A5 1px), chữ đỏ đậm (#991B1B).
```

#### C. Thông Báo Tạm Hết Sản Lượng Giữ Chỗ Mềm (Issue-02 Resolution)
Hiển thị trên `T-03` khi `availableQuantity == 0` nhưng `reservedQuantity > 0`:
```
+--------------------------------------------------------------------------------------------------+
| ⏳ TẠM HẾT SẢN LƯỢNG KHẢ DỤNG DO ĐANG GIỮ CHỖ THỎA THUẬN                                         |
| Toàn bộ sản lượng của bài đăng này hiện đang nằm trong các thỏa thuận chờ xác nhận. Bạn chưa thể |
| gửi đề nghị mới lúc này. Nếu có thỏa thuận bị hủy hoặc hết hạn, sản lượng sẽ tự động mở lại.     |
+--------------------------------------------------------------------------------------------------+
* Quy cách: Nền hổ phách dịu (#FEF3C7), viền (#FCD34D 1px), chữ (#92400E).
```

#### D. Hộp Thoại Bảo Vệ Dữ Liệu Khi Thoát Dở (Dirty Form Guard — Issue-03 Resolution)
Hiển thị khi người dùng bấm thoát Drawer `T-13` khi đã nhập thông tin:
- Modal giữa màn hình, nền mờ đen $50\%$ (`rgba(0, 0, 0, 0.5)`).
- Tiêu đề: *"Hủy bỏ nội dung nhật ký?"*
- Nội dung: *"Các thông tin và ảnh bạn vừa nhập sẽ không được lưu lại. Bạn có chắc chắn muốn thoát?"*
- Nút bấm: `[ Tiếp tục ghi ]` (Primary Green) và `[ Thoát & Xóa ]` (Danger Outline).

#### E. Hộp Gợi Ý Thời Điểm Vàng 15–30 Ngày (Issue-08 Resolution)
Hiển thị trên form `T-15`:
```
+--------------------------------------------------------------------------------------------------+
| 💡 GỢI Ý THỜI ĐIỂM VÀNG ĐĂNG BÀI:                                                                |
| Đăng nguồn cung trước ngày thu hoạch từ 15 đến 30 ngày giúp thương lái dễ dàng bố trí phương tiện|
| vận chuyển và bạn có thể đạt được giá thỏa thuận tốt nhất.                                       |
+--------------------------------------------------------------------------------------------------+
* Quy cách: Nền xanh ngọc nhẹ (#ECFDF5), viền (#A7F3D0 1px), chữ xanh rừng (#065F46), icon bóng đèn.
```

---

### 3.6. Thẻ Sản Phẩm & Điều Hướng Di Động (Card & Navigation)

#### A. Thẻ Nguồn Cung Thu Hoạch (`SupplyCard`)
- Kích thước thẻ trên Desktop: Chiều rộng cố định hoặc linh hoạt theo lưới 3 cột ($360\text{px} - 380\text{px}$).
- Tỷ lệ khung ảnh nông sản: $16 : 9$ hoặc $4 : 3$, ảnh chụp thật thực địa miệt vườn.
- Cấu trúc thẻ:
  1. Ảnh đại diện + Huy hiệu trạng thái góc trên phải.
  2. Tên cây trồng & Giống cây (H3 Bold).
  3. Dòng địa phương: `[📍 Tiền Giang - Vị trí gần đúng]`.
  4. Bảng thông số: Ngày thu hoạch | Tổng sản lượng | Giá tham khảo.
  5. Thanh tiến độ 3 màu mini.
  6. Nút hành động: `[ Xem chi tiết ]`.

#### B. Thanh Tác Vụ Ghim Đáy Mobile (`StickyActionBar`)
- Ghim cố định ở sát đáy màn hình (`bottom: 0; left: 0; right: 0; z-index: 100`).
- Chiều cao: $68\text{px}$ (kèm khoảng đệm an toàn iOS Home bar).
- Nền trắng đục $100\%$ (`#FFFFFF`), viền trên `1px solid #E2E8F0`, đổ bóng ngược `--shadow-bottom-bar`.
- Chứa nút gọi điện nhanh `[📞]` (tuân thủ phân quyền) và nút Primary lớn $48\text{px}$ `[ Gửi đề nghị thu mua ]` hoặc `[ Xác nhận thỏa thuận ]`.

#### C. Nút Tròn Nổi Chuyển Đổi Bản Đồ / Danh Sách (`MapListFAB` — Issue-07 Resolution)
- Vị trí: Ghim cố định cách góc dưới phải $80\text{px}$ (nằm trên thanh tác vụ đáy).
- Kích thước: Tròn hoặc Pill bo tròn toàn phần, cao $48\text{px}$, nền `#1B4D3E`, chữ trắng, đổ bóng nổi `--shadow-floating`.
- Nhãn: `[ 🗺️ Bản đồ (24) ]` (khi đang ở danh sách) hoặc `[ 📋 Danh sách ]` (khi đang ở bản đồ).

---

## 4. Hướng Dẫn Áp Dụng Cho Lập Trình Giao Diện (Implementation Notes)

Khi triển khai mã nguồn tại các giai đoạn sau:
1. **Toàn bộ Tokens** sẽ được đưa vào tệp CSS trung tâm `frontend/src/index.css` dưới dạng CSS Custom Properties (`:root { ... }`).
2. **Không cài đặt TailwindCSS hay framework styling cồng kềnh** trừ khi có chỉ đạo riêng; ưu tiên Vanilla CSS theo cấu trúc module gọn gàng và tải nhanh.
3. **Mọi icon** sử dụng bộ icon SVG tiêu chuẩn, đồng nhất nét vẽ (stroke $1.5\text{px} - 2\text{px}$) hoặc Unicode emoji có kiểm soát.
4. **Hiệu suất di động:** Không tải ảnh độ phân giải quá cao chưa nén; ưu tiên hiển thị khung xương (Skeleton loader) khi đang nạp dữ liệu từ API.

---

> **Đề xuất cổng phê duyệt:** Kính trình phê duyệt tài liệu **Design System** làm chuẩn mực đóng băng các quy cách thiết kế, mở đường chuyển sang **Giai đoạn 9 – High-Fidelity Prototype (Bản mẫu giao diện chi tiết)**.
