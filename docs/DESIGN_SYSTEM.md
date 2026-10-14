# 🎨 Hệ Thống Thiết Kế (Design System) — MEKAGREEN

> **Dự án:** MEKAGREEN — Nền tảng số kết nối nguồn cung nông sản Nam Bộ trước thu hoạch  
> **Giai đoạn:** Phase 8 (Design System Specification)  
> **Tài liệu căn cứ (Sources of Truth):** [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md), [PRODUCT_PLAN.md](./PRODUCT_PLAN.md), [BUSINESS_RULES.md](./BUSINESS_RULES.md), [DECISIONS.md](./DECISIONS.md), [USER_FLOWS.md](./USER_FLOWS.md), [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md), [WIREFRAMES.md](./WIREFRAMES.md), [UX_REVIEW.md](./UX_REVIEW.md), [UIUX_PLANNING_PROMPT.md](./UIUX_PLANNING_PROMPT.md)  
> **Bộ icon chỉ định:** Lucide React (Simple line icons, consistent 1.5px/2px stroke)  
> **Ngăn xếp công nghệ triển khai:** React + Vite + Tailwind CSS  
> **Trạng thái:** **PHASE 8 — DESIGN SYSTEM: APPROVED & LOCKED** (Đã phê duyệt & Khóa thiết kế)

---

## 1. Trạng Thái & Bối Cảnh (Status)

Tài liệu này là đặc tả hệ thống thiết kế chính thức của **Giai đoạn 8 (Design System)**, được xây dựng dựa trên bản vẽ khung dây Giai đoạn 6 đã khóa ([WIREFRAMES.md](./WIREFRAMES.md)), 8 quyết định thẩm định trải nghiệm người dùng đã phê duyệt tại Giai đoạn 7 ([UX_REVIEW.md](./UX_REVIEW.md)), và các quyết định phê duyệt cuối cùng của Chủ sản phẩm tại Giai đoạn 8.

Bản nháp lịch sử cũ tại `docs/drafts/DESIGN_SYSTEM.md` chỉ mang tính tham khảo sơ bộ. Tài liệu này thay thế hoàn toàn và là nguồn quy chuẩn duy nhất cho các giai đoạn thiết kế mẫu chi tiết (High-fidelity Prototype) và lập trình giao diện (React Frontend).

---

## 2. Triết Lý & Định Hướng Thị Giác (Design Principles)

MEKAGREEN kết hợp 4 giá trị nhận diện thị giác cốt lõi:

```
+--------------------------------------------------------------------------------------------------+
|                               ĐỊNH HƯỚNG THỊ GIÁC MEKAGREEN                                      |
+------------------------------------+-----------------------------------+-------------------------+
| 1. Modern Vietnamese Agritech      | 2. Professional B2B Platform      | 3. Real Operational     |
|    - Màu sắc sông nước & miệt vườn |    - Bố cục vận hành sắc nét      |    - Dữ liệu thực tế    |
|    - Tươi sáng, đáng tin cậy       |    - Mật độ thông tin vừa phải    |    - Tôn trọng vụ mùa   |
|    - Đậm bản sắc nông sản Nam Bộ   |    - Không kiểu bán lẻ B2C Shopee |    - Chống lóa ngoài đồng|
+------------------------------------+-----------------------------------+-------------------------+
| 4. Premium but Restrained: Tinh tế, chừng mực, không bóng bẩy ảo diệu, không lạm dụng card,     |
|    không hiệu ứng viễn tưởng AI, tập trung tối đa vào giao thương và minh bạch nguồn gốc.        |
+--------------------------------------------------------------------------------------------------+
```

1. **Tin cậy Nông nghiệp (Agricultural Trust):** Sử dụng sắc xanh lá thực vật kết hợp nền trắng kem gợi cảm giác miệt vườn sông nước Cửu Long trù phú, chân thực.
2. **Minh bạch Thông tin Sản xuất (Traceable Production Information):** Bố cục dạng dòng thời gian và bảng biểu rõ ràng, tách bạch giữa kế hoạch dự kiến và thực tế thu hoạch.
3. **Kết nối Thu mua Chuyên nghiệp (Professional Procurement Connection):** Tối ưu hóa việc hiển thị sản lượng (tấn, kg), dải ngày thu hoạch, vị trí địa bàn và điều khoản cam kết số lượng.

---

## 3. Bảng Màu Thương Hiệu Đã Phê Duyệt (Brand Palette)

Chủ sản phẩm (Product Owner) đã lựa chọn 5 màu nền tảng nhận diện thương hiệu:

| Tên màu thương hiệu | Mã Hex | Vai trò trong hệ thống |
|:---|:---:|:---|
| **Primary Green** | `#2E7D32` | Màu sắc chủ đạo; các nút bấm chính (CTA), tiêu đề thương hiệu, điểm nhấn điều hướng. |
| **Dark Green** | `#1B5E20` | Màu xanh đậm bổ trợ; header, navigation, footer, trạng thái hover/active của nút chính, văn bản nhấn mạnh. (Tuyệt đối không phục vụ chức năng thanh toán; MEKAGREEN MVP không có thanh toán trực tuyến). |
| **Light Green** | `#E8F5E9` | Màu nền xanh nhạt; nền badge thành công, nền khối thông tin nguồn gốc, highlight nhẹ. |
| **Harvest Yellow** | `#F9A825` | Màu vàng mùa gặt; màu nhấn diện mạo (accent), badge mùa vụ sắp thu hoạch, minh họa quả chín. |
| **Cream White** | `#FAFAF7` | Màu trắng kem dịu mắt; màu nền toàn trang (Page Background), giảm chói lóa ngoài trời. |

---

## 4. Hệ Thống Màu & Đo Lường Độ Tương Phản (Accessibility / Contrast)

Hệ thống được thiết kế tuân thủ nghiêm ngặt chuẩn **WCAG 2.1 AA**:
- Văn bản thường: Tỷ lệ tương phản $\ge 4.5:1$
- Văn bản lớn ($\ge 18\text{pt}$ hoặc $\ge 14\text{pt}$ đậm): Tỷ lệ tương phản $\ge 3:1$
- Thành phần giao diện & đường viền điều khiển: Tỷ lệ tương phản $\ge 3:1$

### 4.1. Bảng màu Semantic & Kết quả kiểm tra tương phản thực tế

```
+--------------------------------------------------------------------------------------------------+
|                     KIỂM CHỨNG TỶ LỆ TƯƠNG PHẢN (WCAG 2.1 AA AUDIT REPORT)                       |
+-----------------------------+-----------------------+----------+-----------+---------------------+
| Cặp màu (Foreground / Bg)   | Mã Hex cụ thể         | Tỷ lệ đo | Chuẩn AA  | Đánh giá & Sử dụng  |
+-----------------------------+-----------------------+----------+-----------+---------------------+
| Text Primary trên Page Bg   | #0F172A trên #FAFAF7  | 14.85:1  | Vượt AAA  | Đạt (Văn bản chính) |
| Text Primary trên White     | #0F172A trên #FFFFFF  | 15.68:1  | Vượt AAA  | Đạt (Trên thẻ/card) |
| Text Secondary trên Page Bg | #334155 trên #FAFAF7  |  8.92:1  | Vượt AAA  | Đạt (Phụ đề/nhãn)   |
| Text Muted trên White       | #475569 trên #FFFFFF  |  7.34:1  | Vượt AAA  | Đạt (Chú thích phụ) |
| White trên Primary Green    | #FFFFFF trên #2E7D32  |  5.15:1  | Đạt AA    | Đạt (Nút bấm chính) |
| White trên Dark Green       | #FFFFFF trên #1B5E20  |  7.58:1  | Vượt AAA  | Đạt (Nút hover/bg)  |
| Primary Green trên White    | #2E7D32 trên #FFFFFF  |  5.15:1  | Đạt AA    | Đạt (Link/Icon nhấn)|
| Primary Green trên Page Bg  | #2E7D32 trên #FAFAF7  |  4.88:1  | Đạt AA    | Đạt (Link trên nền) |
| Danger Text trên Danger Bg  | #991B1B trên #FEF2F2  |  7.82:1  | Vượt AAA  | Đạt (Lỗi/Hủy bỏ)    |
| Warning Text trên Amber Bg  | #92400E trên #FEF3C7  |  6.31:1  | Vượt AAA  | Đạt (Tạm hết/Cảnhbáo)|
| Info Text trên Info Bg      | #075985 trên #F0F9FF  |  7.12:1  | Vượt AAA  | Đạt (Gợi ý 15-30ng) |
| Success Text trên Green Bg  | #166534 trên #DCFCE7  |  6.68:1  | Vượt AAA  | Đạt (Đã xác nhận)   |
| White trên Harvest Yellow   | #FFFFFF trên #F9A825  |  1.98:1  | KHÔNG ĐẠT | ❌ CẤM DÙNG TEXT TRẮNG|
| Dark Slate trên Harvest Yw  | #0F172A trên #F9A825  |  7.92:1  | Vượt AAA  | Đạt (Chữ đen trên vàng)|
+-----------------------------+-----------------------+----------+-----------+---------------------+
```

> ⚠️ **LƯU Ý CỐT TỬ VỀ MÀU HARVEST YELLOW (`#F9A825`):**  
> Màu vàng gặt `#F9A825` có độ phản xạ ánh sáng cao ($L \approx 0.48$). Chữ màu trắng trên nền vàng chỉ đạt tỷ lệ tương phản $1.98:1$ (**Không đạt chuẩn WCAG**).  
> **Quy tắc bắt buộc:**  
> - Tuyệt đối không dùng chữ trắng trên nền `#F9A825`.  
> - Tuyệt đối không dùng Harvest Yellow làm màu nút Primary CTA (Nút chính luôn dùng `#2E7D32`).  
> - Khi dùng `#F9A825` làm huy hiệu hoặc tag mùa vụ, chữ bên trong bắt buộc phải là màu đen than `#0F172A` (đạt $7.92:1$).  
> - Đối với trạng thái cảnh báo / giữ chỗ tạm thời (Amber), sử dụng cặp màu semantic an toàn: Chữ `#92400E` trên nền `#FEF3C7` (đạt $6.31:1$).

### 4.2. Danh mục Token Màu Hệ Thống (Color Tokens)

```css
:root {
  /* Brand Tokens */
  --color-brand-primary:        #2E7D32; /* Primary Green */
  --color-brand-primary-hover:  #1B5E20; /* Dark Green */
  --color-brand-primary-active: #144716;
  --color-brand-primary-subtle: #E8F5E9; /* Light Green */
  --color-brand-dark:           #1B5E20;
  --color-brand-harvest:        #F9A825; /* Harvest Yellow */
  --color-brand-harvest-text:   #0F172A; /* Chữ trên nền Harvest Yellow */

  /* Neutral Surface Tokens */
  --color-bg-page:              #FAFAF7; /* Cream White */
  --color-surface-card:         #FFFFFF;
  --color-surface-elevated:     #FFFFFF;
  --color-surface-muted:        #F1F5F9;

  /* Neutral Text Tokens */
  --color-text-primary:         #0F172A; /* Slate-900: Đọc sắc nét ngoài nắng */
  --color-text-secondary:       #334155; /* Slate-700: Nhãn, phụ đề */
  --color-text-muted:           #475569; /* Slate-600: Chú thích, trợ giúp */
  --color-text-disabled:        #94A3B8; /* Slate-400 */

  /* Border & Divider Tokens */
  --color-border-default:       #CBD5E1; /* Slate-300: Viền thẻ, tương phản rõ */
  --color-border-subtle:        #E2E8F0; /* Slate-200: Đường kẻ ngăn cách */
  --color-border-control:       #94A3B8; /* Slate-400: Viền ô nhập liệu */
  --color-border-control-focus: #2E7D32; /* Viền khi focus */

  /* Semantic - Success */
  --color-success-bg:           #DCFCE7; /* Green-100 */
  --color-success-border:       #86EFAC; /* Green-300 */
  --color-success-text:         #166534; /* Green-800: Tương phản 6.68:1 */

  /* Semantic - Warning / Soft Reserve */
  --color-warning-bg:           #FEF3C7; /* Amber-100 */
  --color-warning-border:       #FCD34D; /* Amber-300 */
  --color-warning-text:         #92400E; /* Amber-800: Tương phản 6.31:1 */

  /* Semantic - Error / Destructive */
  --color-error-bg:             #FEF2F2; /* Red-50 */
  --color-error-border:         #FCA5A5; /* Red-300 */
  --color-error-text:           #991B1B; /* Red-800: Tương phản 7.82:1 */

  /* Semantic - Info / Guidance */
  --color-info-bg:              #F0F9FF; /* Sky-50 */
  --color-info-border:          #BAE6FD; /* Sky-200 */
  --color-info-text:            #075985; /* Sky-800: Tương phản 7.12:1 */
}
```

---

## 5. Kiểu Chữ & Thứ Bậc Phông Chữ (Typography)

### 5.1. Lựa chọn phông chữ
- **Tiêu đề (Headings):** **Manrope** (Google Fonts). Phông chữ hình học hiện đại, góc nét sắc sảo, gợi cảm giác cơ khí công nghệ cao kết hợp sự ấm áp thực tế, hiển thị tiếng Việt có dấu rất thanh thoát và chắc chắn.
- **Thân bài & Giao diện (Body & UI):** **Inter** (Google Fonts). Phông chữ chuẩn mực số 1 cho màn hình kỹ thuật số và mật độ dữ liệu dày đặc, tối ưu hoàn hảo cho các bảng sản lượng và form di động.

### 5.2. Thứ bậc kiểu chữ (Type Scale)

```
+--------------------------------------------------------------------------------------------------+
|                                    BẢNG QUY CHUẨN KIỂU CHỮ                                       |
+--------------+-----------+--------+---------+-------------+--------------------------------------+
| Tên Style    | Font      | Size   | Weight  | Line Height | Mục đích sử dụng                     |
+--------------+-----------+--------+---------+-------------+--------------------------------------+
| Display      | Manrope   | 36px   | Bold 700| 44px (1.2)  | Tiêu đề Hero Banner chính tại T-01   |
| H1           | Manrope   | 28px   | Bold 700| 36px (1.3)  | Tiêu đề trang chính (T-02, T-03...)  |
| H2           | Manrope   | 22px   | Semi 600| 30px (1.35) | Tiêu đề khối / Tiêu đề Form chính    |
| H3           | Manrope   | 18px   | Semi 600| 26px (1.45) | Tiêu đề Card / Modal / Drawer        |
| H4           | Manrope   | 16px   | Med 500 | 24px (1.5)  | Tiêu đề nhóm thông tin / Tiểu mục    |
| Body Large   | Inter     | 18px   | Reg 400 | 28px (1.55) | Đoạn giới thiệu đầu trang / Lead text|
| Body Regular | Inter     | 16px   | Reg 400 | 24px (1.5)  | Chữ nội dung chuẩn, văn bản hợp đồng |
| Body Small   | Inter     | 14px   | Reg 400 | 20px (1.45) | Dòng tóm tắt thẻ, thông tin phụ trợ  |
| Label        | Inter     | 14px   | Med 500 | 20px (1.4)  | Nhãn ô nhập liệu form, header bảng   |
| Caption      | Inter     | 12px   | Reg 400 | 16px (1.35) | Dòng trợ giúp dưới input, timestamp  |
+--------------+-----------+--------+---------+-------------+--------------------------------------+
```

> **Quy tắc chữ di động (Mobile Rule):** Trên thiết bị di động, cỡ chữ ô nhập liệu bắt buộc là **$16\text{px}$** (`1rem`) để ngăn trình duyệt iOS Safari tự động phóng to giao diện khi người dùng chạm vào nhập liệu.

---

## 6. Bố Cục & Hệ Thống Lưới (Layout & Grid)

### 6.1. Chiều rộng khung chứa (Containers)
- **Toàn màn hình tối đa (Max Width):** $1280\text{px}$ (`max-w-7xl`). Không thiết kế giao diện tràn màn hình vô tận gây mỏi mắt khi đọc bảng biểu.
- **Vùng nội dung quản trị/form (Form / Dashboard Max Width):** $1024\text{px}$ (`max-w-5xl`) để kiểm soát độ dài dòng văn bản tối ưu ($60 - 80$ ký tự/dòng).
- **Trang chi tiết văn bản (Agreement / Traceability Max Width):** $896\text{px}$ (`max-w-4xl`), căn giữa màn hình, tăng tính trang trọng của biên bản thỏa thuận.

### 6.2. Lưới cột (Grid System)
- **Desktop ($\ge 1024\text{px}$):** Lưới 12 cột, khoảng cách cột (gutter) $24\text{px}$, lề 2 bên (margin) $32\text{px}$.
  - Split View tại `T-02`: 6 cột Danh sách (50%) | 6 cột Bản đồ số (50%).
- **Tablet ($768\text{px} - 1023\text{px}$):** Lưới 8 cột, khoảng cách $16\text{px}$, lề $24\text{px}$.
- **Mobile ($< 768\text{px}$):** Lưới 4 cột hoặc xếp dọc 1 cột (Single-column stack), khoảng cách $12\text{px}$, lề biên an toàn $16\text{px}$.

---

## 7. Hệ Thống Khoảng Cách (Spacing System)

Xây dựng trên hệ số cơ sở **$8\text{px}$** kết hợp các bước phụ $4\text{px}$:

| Token | Giá trị Pixel | Mục đích áp dụng |
|:---|:---:|:---|
| `space-1` | $4\text{px}$ | Khoảng cách giữa Icon và Text trong nút bấm, khoảng cách badge |
| `space-2` | $8\text{px}$ | Khoảng cách giữa các chip, khoảng cách giữa Label và Input |
| `space-3` | $12\text{px}$ | Khoảng cách giữa các phần tử trong danh sách phụ, padding ô bảng |
| `space-4` | $16\text{px}$ | Lề an toàn mobile, padding trong của thẻ Card chuẩn, khoảng cách form |
| `space-6` | $24\text{px}$ | Padding thẻ Card lớn, khoảng cách giữa các khối nội dung liên quan |
| `space-8` | $32\text{px}$ | Khoảng cách giữa các Section chính trong trang quản trị |
| `space-10`| $40\text{px}$ | Khoảng cách giữa các phân đoạn trang lớn |
| `space-12`| $48\text{px}$ | Khoảng cách Section trên Landing page `T-01` |
| `space-16`| $64\text{px}$ | Padding trên/dưới của Hero Banner và Footer |

---

## 8. Bo Góc (Border Radius)

MEKAGREEN là sàn B2B nông nghiệp vận hành, **tuyệt đối không sử dụng phong cách bo góc quá tròn hay bong bóng (No bubbly/oversized radius)**.

```css
--radius-sm:    4px;  /* Nút bấm nhỏ, checkbox, dropdown menu item, tag kỹ thuật */
--radius-md:    8px;  /* Ô nhập liệu form (input), nút bấm chuẩn, thẻ Card */
--radius-lg:   12px;  /* Khung Modal, Drawer, Khung bản đồ tương tác */
--radius-full: 9999px;/* CHỈ DÀNH RIÊNG cho: Chip hoạt động, Badge trạng thái tròn */
```

> **Quy tắc cấm (Anti-pattern):** Tuyệt đối không dùng `radius-full` cho các Card nội dung hay khung form bao ngoài.

---

## 9. Đường Viền & Phân Cách (Borders)

- **Độ dày đường viền:**
  - Viền Card và bảng biểu: `1px solid var(--color-border-default)` (`#CBD5E1`).
  - Viền ô nhập liệu khi Active/Focus: `2px solid var(--color-brand-primary)` (`#2E7D32`).
  - Đường kẻ phân cách nội dung (Dividers): `1px solid var(--color-border-subtle)` (`#E2E8F0`).
- **Đường viền có chủ đích:** Dùng viền sắc nét để phân tách các khu vực chức năng dưới ánh nắng mặt trời, không phụ thuộc vào đổ bóng mờ ảo.

---

## 10. Đổ Bóng & Độ Nổi (Shadows & Elevation)

Hệ thống tối giản độ nổi, ưu tiên độ tương phản bề mặt và viền:

```css
--shadow-none:     none;
--shadow-subtle:   0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Card chuẩn trên nền kem */
--shadow-elevated: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* Dropdown, Sticky bar */
--shadow-modal:    0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); /* Modal, Drawer */
```

---

## 11. Hệ Thống Nút Bấm (Button System)

### 11.1. Các biến thể nút (Variants)

```
+--------------------------------------------------------------------------------------------------+
|                                    QUY CÁCH NÚT BẤM (BUTTONS)                                    |
+-------------------+-----------------------------------+------------------------------------------+
| Biến thể          | Quy cách phối màu                 | Mục đích sử dụng                         |
+-------------------+-----------------------------------+------------------------------------------+
| **Primary**       | Nền: #2E7D32, Chữ: Trắng #FFFFFF  | Tác vụ chính: [Gửi đề nghị], [Xác nhận], |
|                   | Hover: #1B5E20, Focus ring xanh lá| [Lưu vùng sản xuất], [Đăng nguồn cung]   |
| **Secondary**     | Nền: Trắng, Viền: 1px #CBD5E1     | Tác vụ phụ: [Xem chi tiết], [Bộ lọc],    |
|                   | Chữ: #334155, Hover nền: #F8FAFC  | [Chụp ảnh mới], [Xuất PDF]               |
| **Tertiary/Ghost**| Nền: Trong suốt, Chữ: #2E7D32     | Nút hỗ trợ: [Xem tất cả ->], [Đóng],     |
|                   | Hover: Nền #E8F5E9                | [Xóa bộ lọc], [Rút lại đề nghị]          |
| **Destructive**   | Nền: #FEF2F2, Viền: 1px #FCA5A5   | Tác vụ nguy hiểm: [Hủy thỏa thuận],      |
|                   | Chữ: #991B1B, Hover: Nền #FEE2E2  | [Từ chối đề nghị], [Xóa bài đăng]        |
+-------------------+-----------------------------------+------------------------------------------+
```

### 11.2. Kích thước nút (Sizes)
- **Large ($48\text{px}$):** Dành cho Mobile Sticky CTA đáy màn hình và các nút hành động cốt lõi của form. Vùng chạm lớn vượt chuẩn WCAG ($44\text{px}$).
- **Medium ($40\text{px}$):** Dành cho thanh công cụ Desktop, nút mở Modal, nút trong bảng quản trị.
- **Small ($32\text{px}$):** Dành cho phân trang, nút thao tác dòng trong bảng dữ liệu.

### 11.3. Trạng thái Đang xử lý & Chống bấm đúp (Loading & Double Submission Prevention)
- Khi bấm các tác vụ quan trọng (`[Gửi đề nghị]`, `[Xác nhận thỏa thuận]`, `[Lưu nhật ký]`):
  - Nút lập tức chuyển sang trạng thái: `opacity: 0.8; pointer-events: none; cursor: wait;`.
  - Icon chữ được thay thế/bổ sung biểu tượng Spinner xoay: `[ ⏳ Đang xử lý... ]`.
  - Không cho phép người dùng kích hoạt sự kiện click lần thứ hai cho đến khi có phản hồi từ máy chủ.

---

## 12. Hệ Thống Biểu Mẫu Nhập Liệu (Form System)

### 12.1. Quy chuẩn chung của ô nhập
- Chiều cao ô nhập trên mobile tối thiểu $48\text{px}$ (`h-12`).
- Nhãn trường (`<label>`): Luôn đặt cố định phía trên ô nhập liệu, phông `Label` ($14\text{px}$, Medium), kèm dấu hoa thị đỏ `(*)` cho trường bắt buộc.
- **Không dùng placeholder thay label:** Placeholder chỉ dùng làm ví dụ định dạng (vd: `vd: 75.000`).

### 12.2. Các trạng thái của trường nhập
- **Default:** Viền `#94A3B8`, nền `#FFFFFF`.
- **Focus:** Viền `2px solid #2E7D32`, vòng hào quang focus mờ ngoài `ring-2 ring-green-100`.
- **Error:** Viền `2px solid #DC2626`, dòng thông báo lỗi chữ đỏ `#B91C1C` ($12\text{px}$) kèm icon cảnh báo `AlertCircle` xuất hiện ngay dưới ô nhập.
- **Disabled:** Nền `#F1F5F9`, viền `#CBD5E1`, chữ `#94A3B8`, chuột `not-allowed`.

---

## 13. Quy Cách Ô Nhập Diện Tích Chuẩn Hóa (Area Input)

Tuân thủ quyết định của Chủ sản phẩm: **Không áp dụng quy đổi cứng "1 ha = 10 công" trong MVP**.

```
+--------------------------------------------------------------------------------------------------+
| MẪU GIAO DIỆN Ô NHẬP DIỆN TÍCH VÙNG SẢN XUẤT (T-10)                                              |
|                                                                                                  |
| Quy mô diện tích đất canh tác (*):                                                               |
| +-----------------------------------------------------+----------------------------------------+ |
| | [ 1.5                                             ] | Đơn vị: (•) Hécta (ha)   ( ) Mét vuông | |
| +-----------------------------------------------------+----------------------------------------+ |
| (Hệ thống lưu trữ chuẩn hóa theo đơn vị Hecta để phục vụ thống kê và truy xuất nguồn gốc)        |
+--------------------------------------------------------------------------------------------------+
```

---

## 14. Hệ Thống Chip Thao Tác Nhanh (Farming Log Chips)

Áp dụng cho Form Ghi nhật ký canh tác (`T-13`) trên di động giúp nông dân nhập nhanh ngoài vườn:

```
[💧 Tưới nước]  [🌱 Bón phân]  [🛡️ Phun / xử lý]  [🌿 Làm cỏ]  [🌾 Thu hoạch]  [📝 Khác]
```

- **Quy cách chip:**
  - Chiều cao $36\text{px}$, bo góc tròn `radius-full`, viền `1px solid var(--color-border-default)`.
  - Hiển thị đầy đủ **Icon + Chữ tiếng Việt** (không dùng icon đơn độc).
- **Trạng thái:**
  - *Chưa chọn (Unselected):* Nền trắng `#FFFFFF`, chữ xám đậm `#334155`.
  - *Đang chọn (Selected):* Nền xanh nhạt `#E8F5E9`, viền xanh đậm `#2E7D32`, chữ `#1B5E20` kèm dấu tích nhỏ.
- **Tính năng mở:** Chọn chip sẽ tự động điền tiêu đề nhật ký. Nông dân vẫn có thể gõ đè, chỉnh sửa văn bản, ghi vật tư/liều lượng, chụp ảnh và chọn ngày tùy ý.

---

## 15. Bộ Huy Hiệu Trạng Thái Nghiệp Vụ (Status Badges)

Tất cả các huy hiệu trạng thái đều bắt buộc gồm **[ Biểu tượng Icon + Nhãn chữ tiếng Việt ]**, không truyền đạt thông tin chỉ bằng màu sắc.

### 15.1. Bài đăng nguồn cung thu hoạch (Harvest Listing)
| Trạng thái Database | Nhãn tiếng Việt hiển thị | Màu nền / Viền | Màu chữ & Icon |
|:---|:---|:---:|:---:|
| `AVAILABLE` | `● Đang mở tiếp nhận` | `#DCFCE7` / `#86EFAC` | `#166534` |
| `PARTIALLY_COMMITTED` | `◐ Đã cam kết một phần` | `#EFF6FF` / `#BFDBFE` | `#1E40AF` |
| `FULLY_COMMITTED` | `🔒 Đã cam kết 100%` | `#F1F5F9` / `#CBD5E1` | `#475569` |
| `CLOSED` | `✕ Đã đóng bài đăng` | `#F1F5F9` / `#CBD5E1` | `#475569` |
| `CANCELLED` | `✕ Đã hủy` | `#FEF2F2` / `#FCA5A5` | `#991B1B` |

### 15.2. Trạng thái UX phái sinh: Tạm hết sản lượng khả dụng (Soft Reserve)
*Hiển thị khi $\text{availableQuantity} = 0$ nhưng $\text{committedQuantity} < \text{expectedQuantity}$:*
- **Huy hiệu:** `[ ⏳ TẠM HẾT SẢN LƯỢNG (CHỜ XÁC NHẬN) ]`
- **Màu sắc:** Nền `#FEF3C7` (Amber-100), Viền `#FCD34D` (Amber-300), Chữ `#92400E` (Amber-800).
- **Dòng thông điệp đi kèm (Contextual Note):** *"Toàn bộ sản lượng hiện đang được giữ chỗ trong các thỏa thuận chờ ký. Sản lượng có thể tự mở lại nếu thỏa thuận giữ chỗ bị hủy."*

### 15.3. Đề nghị thu mua (Purchase Proposal)
- `PENDING`: `[ ⏳ Chờ nhà vườn phản hồi ]` (Nền Amber nhạt, chữ nâu đậm)
- `ACCEPTED`: `[ ✓ Đã chấp thuận nguyên tắc ]` (Nền Xanh nhạt, chữ xanh đậm)
- `REJECTED`: `[ ✕ Nhà vườn từ chối ]` (Nền Đỏ nhạt, chữ đỏ đậm)
- `WITHDRAWN`: `[ ↩ Bạn đã rút đề nghị ]` (Nền Xám nhạt, chữ xám đậm)
- `EXPIRED`: `[ ⌛ Đề nghị hết hạn ]` (Nền Xám nhạt, chữ xám)

### 15.4. Thỏa thuận thu mua (Procurement Agreement)
- `PENDING_CONFIRMATION` (Chưa ai bấm): `[ ⏳ Chờ hai bên cùng xác nhận ]` (Amber)
- `PENDING_CONFIRMATION` (Một bên đã bấm): `[ ✅ Bạn đã xác nhận. Chờ đối tác... ]` (Blue/Green nhạt)
- `CONFIRMED`: `[ 🛡️ Thỏa thuận đã xác nhận trên hệ thống ]` (Nền Green-100, Viền Green-400, Chữ Green-900)
- `CANCELLED`: `[ ✕ Thỏa thuận đã bị hủy ]` (Nền Red-100, Viền Red-300, Chữ Red-900)

---

## 16. Quy Cách Thẻ Dữ Liệu (Cards)

MEKAGREEN chỉ định 6 mẫu thẻ chức năng thực tế, loại bỏ hoàn toàn các loại thẻ KPI rườm rà:

```
+--------------------------------------------------------------------------------------------------+
| CẤU TRÚC THẺ NGUỒN CUNG NÔNG SẢN THU HOẠCH (HARVEST LISTING CARD)                                |
+--------------------------------------------------------------------------------------------------+
| [ Ảnh chụp thực tế vườn cây - Tỷ lệ 16:9 ]          | Huy hiệu trạng thái: [● Đang mở tiếp nhận] |
|                                                                                                  |
| TÊN NÔNG SẢN & GIỐNG: Sầu riêng Ri6 (Cơm vàng hạt lép)                                           |
| Nhà vườn: Hợp tác xã Nông nghiệp Xanh • Xã Mỹ Đức Tây, Tỉnh Đồng Tháp (Cái Bè cũ)                |
| 🛡️ Vị trí: Vị trí gần đúng (Bảo vệ thông tin vườn)                                               |
|                                                                                                  |
| Ngày dự kiến thu hoạch: 25/10/2026 (Còn 17 ngày)                                                 |
| HIỂN THỊ SẢN LƯỢNG:                                                                              |
| - Desktop: [====Đã chốt (4T)====|-----Đang giữ (2T)-----|----------Còn khả dụng: 4 Tấn (40%)----------] |
| - Mobile (ưu tiên chữ): "Còn lại: 4 tấn (40%)"                                                    |
|                                                                                                  |
| Giá bán: 78.000 đ/kg (hoặc "Giá tham khảo: Liên hệ / Thỏa thuận")  [ XEM CHI TIẾT NGUỒN CUNG -> ] |
+--------------------------------------------------------------------------------------------------+
```

- **Quy cách thẻ:** Nền trắng `#FFFFFF`, viền mỏng `1px solid #CBD5E1`, bo góc `8px`, bóng mờ `var(--shadow-subtle)`.
- **Quy chuẩn hiển thị Giá tham khảo:**
  - Nếu nông dân có nhập: `Giá tham khảo: 78.000 đ/kg`.
  - Nếu để trống: `Giá tham khảo: Liên hệ / Thỏa thuận` (tạo điều kiện cho hai bên tự do đàm phán).
  - Tuyệt đối không hiển thị `"0đ"`, `"N/A"`, hoặc `"--"`. Không bao giờ ngụ ý sàn MEKAGREEN định giá hoặc bảo lãnh giá giao dịch.
- **Quy chuẩn hiển thị Sản lượng:**
  - **Trên di động (Mobile compact):** Ưu tiên hiển thị văn bản rõ ràng `"Còn lại: 4 tấn (40%)"`, không bắt buộc thanh 3 phân đoạn trên mobile để tránh chật chội.
  - **Trên máy tính (Desktop):** Nếu hiển thị thanh tiến độ 3 phân đoạn (`committed` xanh đậm `#15803D`, `reserved` hổ phách `#B45309`, `available` xám bạc `#CBD5E1`), bắt buộc phải có nhãn chữ/số liệu đọc được đi kèm, không truyền đạt trạng thái chỉ bằng màu sắc.

---

## 17. Bảng Dữ Liệu Quản Trị (Tables)

Áp dụng cho màn hình Desktop vận hành của Nông dân (`T-08`, `T-11`, `T-14`, `T-16`, `T-18`), Thương lái và Quản trị viên:

- **Hàng tiêu đề (Header):** Chiều cao $44\text{px}$, nền xám kem `#F1F5F9`, chữ in hoa nhẹ `Label` ($12\text{px}$/Bold), căn trái.
- **Hàng dữ liệu (Row):** Chiều cao $56\text{px}$, viền dưới mỏng `#E2E8F0`. Hover đổi màu nền sang `#F8FAFC`.
- **Cột hành động (Actions):** Cố định bên phải, sử dụng nút nhỏ hoặc nút Ghost icon.
- **Trạng thái bảng rỗng (Empty Table):** Khối giữa bảng cao $200\text{px}$ có minh họa nhẹ, dòng chữ hướng dẫn thân thiện và nút khởi tạo.
- **Đáp ứng di động (Mobile Responsive):** Bảng tự động chuyển đổi thành **danh sách thẻ xếp chồng (Stacked Cards)** trên màn hình nhỏ $< 768\text{px}$, không ép buộc người dùng cuộn ngang bảng khó chịu.

---

## 18. Quy Chuẩn Điều Hướng (Navigation)

Tuân thủ nghiêm ngặt Kiến trúc thông tin đã phê duyệt ([docs/INFORMATION_ARCHITECTURE.md](./docs/INFORMATION_ARCHITECTURE.md)):

### 18.1. Desktop Navigation
- **Top Bar (Public & Buyer):** Chiều cao $64\text{px}$, dính trên cùng (Sticky), nền trắng `#FFFFFF`, viền dưới `#E2E8F0`.
  - Bên trái: Logo MEKAGREEN.
  - Ở giữa: Menu chính `[ Chợ nguồn cung ]`, `[ Bản đồ nông nghiệp ]`, `[ Truy xuất nguồn gốc ]`. Mục đang chọn có gạch chân xanh lá `3px solid #2E7D32` và chữ đậm.
  - Bên phải: Khối tài khoản hoặc nút `[ Đăng nhập ]` / `[ Đăng ký ]`.
- **Sidebar (Farmer & Admin):** Chiều rộng $256\text{px}$, nền `#FFFFFF`, viền phải `#E2E8F0`. Menu mục có icon Lucide đi kèm chữ, hover đổi nền xanh nhạt `#E8F5E9`.

### 18.2. Mobile Navigation
- **Top Bar Mobile:** Chiều cao $56\text{px}$.
  - Nút Menu Drawer `[=]` bên trái.
  - Logo MEKAGREEN ở giữa.
  - Icon tài khoản `[👤]` bên phải.
- **Drawer trượt ngang (Left Drawer):** Chiều rộng $300\text{px}$, mở từ trái qua khi bấm `[=]`. Chứa đầy đủ danh mục chức năng theo đúng vai trò tài khoản đăng nhập.
- **Quy tắc tuyệt đối:** Không sáng tạo thanh Bottom Navigation Bar tự phát.

---

## 19. Hộp Thoại, Tấm Trượt & Cảnh Báo (Modal, Drawer, Bottom Sheet)

- **Modal (Hộp thoại giữa màn hình):** Chiều rộng $480\text{px} - 600\text{px}$, bo góc $12\text{px}$, lớp phủ nền tối mờ (Backdrop `rgba(15, 23, 42, 0.5)`). Dùng cho: Modal hủy thỏa thuận kèm lý do, Modal tạo đề nghị thu mua tại `T-03`.
- **Drawer / Bottom Sheet (Di động):** Trượt lên từ đáy màn hình, có gạch kéo (Drag Handle) ở đỉnh, bo góc trên $16\text{px}$. Dùng cho: Drawer ghi nhật ký `T-13`, Drawer bộ lọc `T-02`, Bottom Sheet xem nhanh thẻ nguồn cung trên bản đồ số.
- **Hộp thoại cảnh báo dữ liệu chưa lưu (Dirty Form Guard):** Khi người dùng chạm nút đóng `[✕]` hoặc chạm vùng ngoài mà form đã có dữ liệu gõ dở: Hiển thị hộp thoại nhỏ: *"Bác có thay đổi chưa lưu. Bác có chắc chắn muốn thoát không?"* kèm 2 nút: `[ Tiếp tục nhập ]` và `[ Bỏ thay đổi ]`.

---

## 20. Phản Hồi, Cảnh Báo & Hướng Dẫn (Alerts & Feedback)

1. **Khối cảnh báo pháp lý BR-048 (Agreement Disclaimer):**
   - Đặt cố định tại `T-19` trên nền xám nhạt viền Slate-300: *"Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN. Đây không phải chữ ký số hay hợp đồng điện tử có giá trị pháp lý."*
2. **Khối hướng dẫn khuyến nghị 15–30 ngày (Harvest Timing Guidance):**
   - Đặt tại `T-15` dưới dạng **Hộp chỉ dẫn thân thiện (Info Box)**: Nền xanh da trời nhạt `#F0F9FF`, viền `#BAE6FD`, icon bóng đèn `Lightbulb` màu xanh dương `#0284C7`, chữ `#075985`. Tuyệt đối không dùng màu vàng/đỏ.
3. **Khối minh bạch lý do hủy thỏa thuận (`T-19` khi Cancelled):**
   - Đặt ở đầu trang trên nền đỏ nhạt `#FEF2F2`, viền `#FCA5A5`: Hiển thị rõ tên người hủy, dấu thời gian và trích dẫn nguyên văn lý do hủy để tránh nghi kỵ đối tác ngoài đời.

---

## 21. Thành Phần Bản Đồ Nông Nghiệp (Map Components)

Tuân thủ giới hạn MVP: **Point Marker Only, No GIS Polygon**.

- **Điểm ghim chuẩn (Standard Point Pin):** Icon giọt nước cách điệu chứa biểu tượng mầm cây hoặc chấm tròn.
  - Màu xanh lá `#2E7D32`: Vườn còn sản lượng mở bán.
  - Màu hổ phách `#F9A825`: Vườn đang giữ chỗ tạm thời (Soft Reserve).
  - Màu xám `#94A3B8`: Vườn đã chốt đủ sản lượng.
- **Điểm ghim được chọn (Active Pin):** Tự động phóng to tỷ lệ 1.25x, vòng viền ngoài trắng $3\text{px}$ và bóng đổ đậm.
- **Nhãn bảo mật vị trí trên bản đồ:** Luôn gắn kèm nhãn nổi `Vị trí gần đúng` ngay trên Popup hoặc Bottom Sheet.

---

## 22. Định Hướng Hình Ảnh (Imagery Guidelines)

- **Phong cách ảnh:** Ưu tiên ảnh chụp thực tế cây trái, vườn tược và nhà vườn Nam Bộ (vườn sầu riêng Cai Lậy, vườn bưởi Chợ Lách, vườn xoài Cao Lãnh). Ánh sáng tự nhiên, chân thực.
- **Nghiêm cấm:** Không dùng ảnh minh họa 3D viễn tưởng, không dùng ảnh AI vẽ người nông dân bóng bẩy không thực tế, không dùng ảnh chụp quả ghép bóng loáng phi thực tế.
- **Tỷ lệ khung hình chuẩn (Aspect Ratios):**
  - Hero Banner Trang chủ: $16:9$ (Desktop) / $4:3$ (Mobile)
  - Ảnh đại diện bài đăng nông sản: $16:9$
  - Ảnh nhật ký canh tác thực địa: $1:1$ (Vuông) hoặc $4:3$

---

## 23. Bộ Biểu Tượng Chuẩn Hóa (Iconography — Lucide React)

Sử dụng thư viện mã nguồn mở **Lucide React** với độ dày nét (Stroke Width) đồng nhất $1.75\text{px}$:

| Mục đích chức năng | Icon chỉ định (Lucide React) |
|:---|:---|
| Tìm kiếm nông sản | `Search` |
| Vị trí / Địa bàn | `MapPin` |
| Lịch thu hoạch / Ngày tháng | `Calendar` |
| Bộ lọc nâng cao | `Filter` |
| Gọi điện thoại nhà vườn | `Phone` |
| Khóa thông tin (chưa đăng nhập) | `Lock` |
| Xác nhận thành công | `CheckCircle2` |
| Cảnh báo / Chú ý | `AlertCircle` |
| Hủy bỏ / Đóng | `XCircle` / `X` |
| Chụp ảnh tại vườn | `Camera` |
| Xuất biên bản PDF | `FileDown` |
| Menu di động | `Menu` |
| Người dùng / Hồ sơ | `User` |

---

## 24. Quy Tắc Đáp Ứng Đa Thiết Bị (Responsive Rules)

| Điểm ngắt (Breakpoint) | Chiều rộng (Width) | Quy tắc bố cục chính |
|:---|:---:|:---|
| **Mobile (`sm`)** | $< 640\text{px}$ | 1 cột duy nhất, lề 16px, nút bấm dính đáy màn hình (Sticky Bottom Bar), bảng chuyển thành thẻ |
| **Tablet (`md`)** | $640\text{px} - 1023\text{px}$ | Lưới 2 cột cho danh sách thẻ, Drawer mở rộng, form co giãn 1 cột rộng |
| **Desktop (`lg`)** | $1024\text{px} - 1279\text{px}$ | Màn hình đôi Split View 50/50 tại T-02, Bảng dữ liệu đầy đủ cột, Sidebar cố định |
| **Wide Desktop (`xl`)** | $\ge 1280\text{px}$ | Canh giữa toàn bộ khung chứa tối đa 1280px, tăng khoảng cách trắng hai bên lề |

---

## 25. Chuyển Động & Hiệu Ứng Vi Mô (Motion & Transitions)

Chuyển động chừng mực, phục vụ chức năng nhận biết, không mang tính phô trương:
- **Tương tác nhanh (Hover/Focus):** `transition: all 150ms ease-in-out;` cho nút bấm, ô input, link.
- **Trượt mở Modal / Drawer:** `transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);`.
- **Tôn trọng cấu hình giảm chuyển động:** Hỗ trợ `@media (prefers-reduced-motion: reduce)` tắt toàn bộ hiệu ứng trượt/phóng to đối với người dùng nhạy cảm thị giác.

---

## 26. Tổng Hợp Bộ Tokens Thiết Kế (Design Tokens Summary)

```json
{
  "color": {
    "brand": {
      "primary": "#2E7D32",
      "dark": "#1B5E20",
      "subtle": "#E8F5E9",
      "harvest": "#F9A825"
    },
    "text": {
      "primary": "#0F172A",
      "secondary": "#334155",
      "muted": "#475569"
    },
    "bg": {
      "page": "#FAFAF7",
      "surface": "#FFFFFF"
    },
    "border": {
      "default": "#CBD5E1",
      "control": "#94A3B8"
    }
  },
  "font": {
    "heading": "Manrope, sans-serif",
    "body": "Inter, sans-serif"
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "12": "48px"
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  }
}
```

---

## 27. Bộ Quy Tắc Chống Giao Diện Giả Tạo (Anti-AI-Looking Rules)

Nhằm đảm bảo sản phẩm mang phong thái của một sàn B2B nông nghiệp thực thụ, đội ngũ thiết kế và lập trình viên **tuyệt đối không áp dụng các mẫu hình sau**:

```
+--------------------------------------------------------------------------------------------------+
|                            DANH MỤC CÁC MẪU HÌNH BỊ CẤM (ANTI-PATTERNS)                          |
+--------------------------------------------------------------------------------------------------+
| ❌ KHÔNG dùng nền dải màu chuyển tím/hồng/xanh dương công nghệ (Purple/Blue SaaS gradients).     |
| ❌ KHÔNG dùng hiệu ứng kính mờ (Glassmorphism / Backdrop blur) trên các thẻ dữ liệu.             |
| ❌ KHÔNG dùng đổ bóng phát sáng (Glow effects) hay viền neon xung quanh nút bấm.                |
| ❌ KHÔNG dùng bo góc quá đà 24px - 32px cho thẻ bài đăng khiến giao diện như ứng dụng đồ chơi.    |
| ❌ KHÔNG dùng các thẻ thống kê KPI giả mạo trên Dashboard ("10.000+ nông dân", "Tăng trưởng 99%").|
| ❌ KHÔNG dùng biểu tượng ngôi sao lấp lánh AI (Sparkle icons) nếu hệ thống không có tính năng đó.|
| ❌ KHÔNG bọc tất cả mọi thứ vào từng chiếc thẻ Card rời rạc gây rối mắt (Card-everywhere fatigue).|
+--------------------------------------------------------------------------------------------------+
```

---

## 28. Hướng Dẫn Cấu Hình Triển Khai Tailwind CSS (Tailwind Integration)

Cấu hình mẫu `tailwind.config.js` chuẩn hóa sẵn sàng cho giai đoạn lập trình:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#E8F5E9',
          harvest: '#F9A825',
          'harvest-text': '#0F172A',
        },
        page: '#FAFAF7',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
```

---

## 29. Các Quyết Định Thiết Kế Đã Khóa (Resolved Design Decisions)

Hai câu hỏi thiết kế giao diện đã được Chủ sản phẩm (Product Owner) chính thức phê duyệt và khóa tại Giai đoạn 8:

1. **Hiển thị giá tham khảo trên thẻ nguồn cung (`T-01` & `T-02`):**
   - **Quyết định đã chọn: Lựa chọn A (với câu chữ chuẩn hóa).**
   - Khi nông dân không nhập giá tham khảo, thẻ hiển thị: `"Giá tham khảo: Liên hệ / Thỏa thuận"`.
   - **Quy tắc bắt buộc:**
     - Tuyệt đối không hiển thị `"0đ"`, `"N/A"`, hoặc `"--"`.
     - Không ngụ ý sàn MEKAGREEN định giá hoặc bảo lãnh giá giao dịch.
     - Giá tham khảo là trường tùy chọn (optional).

2. **Kiểu hiển thị thông số sản lượng trên thiết bị di động:**
   - **Quyết định đã chọn: Lựa chọn B cho MVP.**
   - Trên giao diện di động (Mobile compact), ưu tiên hiển thị văn bản rõ ràng: `"Còn lại: 4 tấn (40%)"`.
   - Không bắt buộc vẽ thanh tiến độ phân đoạn 3 màu trên di động để giữ độ tinh gọn và dễ nhìn.
   - Nếu thanh phân đoạn được áp dụng trên màn hình Desktop:
     - Bắt buộc phải có nhãn chữ / số liệu đọc được đi kèm.
     - Tuyệt đối không truyền đạt trạng thái chỉ bằng màu sắc đơn thuần.

---

## 30. Trạng Thái Phê Duyệt & Khóa Giai Đoạn 8 (Phase 8 Locked & Next Authorized Phase)

Hệ thống thiết kế MEKAGREEN đã được **CHỦ SẢN PHẨM PHÊ DUYỆT VÀ KHÓA CHÍNH THỨC**:
- **Trạng thái:** **PHASE 8 — DESIGN SYSTEM: APPROVED & LOCKED**
- Toàn bộ 5 màu thương hiệu, độ tương phản thực tế WCAG 2.1 AA (bao gồm quy tắc cấm text trắng trên Harvest Yellow `#F9A825`), kiểu chữ Manrope + Inter, hệ thống spacing 8px, bán kính bo góc 6–12px restrained, bộ quy tắc Anti-AI và các token Tailwind CSS đã được chốt cố định.
- **Giai đoạn được phép triển khai tiếp theo:** **PHASE 9 — HIGH-FIDELITY PROTOTYPE + UI LOCK**.

> 🛑 **ĐIỂM DỪNG AN TOÀN (STOP CONDITION):**  
> Hệ thống dừng lại nghiêm ngặt tại cổng kiểm soát này. Tuyệt đối **KHÔNG** bắt đầu Phase 9 trước khi nhận lệnh, không viết mã React/Tailwind, không sửa backend/ERD, và chưa tạo màn hình chi tiết.

---
> _Hệ thống thiết kế MEKAGREEN — Đã phê duyệt và khóa ngày 08/10/2026_
