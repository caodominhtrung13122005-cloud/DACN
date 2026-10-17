# 📐 Business Rules — MEKAGREEN

## Purpose
This document captures all business rules, constraints, and domain logic that must be enforced by the application.

---

## Authentication & Authorization
| Rule ID | Rule                                           | Enforced By     |
|---------|-------------------------------------------------|-----------------|
| BR-001  | **(PO-001) Định danh tài khoản & Đăng ký:** Số điện thoại là trường định danh bắt buộc và duy nhất (`phone` required & unique). Email là tùy chọn (`email` optional). Không tuyên bố xác minh số điện thoại trên hệ thống khi chưa có cổng SMS OTP thực tế. **Giới hạn khôi phục mật khẩu trong MVP:** Đối với tài khoản đăng ký chỉ bằng SĐT mà không có email hoặc OTP xác thực, chức năng tự khôi phục mật khẩu (automated password recovery) không khả dụng; không tự phát minh quy trình khôi phục thủ công chưa được kiểm chứng qua Admin. | Backend + Frontend |
| BR-002  | **(PO-002) Quyền Kiểm duyệt Quản trị viên:** Admin rà soát nội dung và thực hiện ẩn/khôi phục thông qua trường `moderation_status` (`APPROVED`, `FLAGGED`, `HIDDEN`). Thao tác kiểm duyệt của Admin độc lập, tuyệt đối KHÔNG được thay đổi 5 trạng thái nghiệp vụ chuẩn của bài đăng và tuyệt đối KHÔNG sửa đổi các Thỏa thuận thu mua đã `CONFIRMED`. | Backend (Laravel) |
| BR-003  | Khách vãng lai và công chúng chỉ có quyền đọc các thông tin công khai (bài đăng, mùa vụ, nhật ký, truy xuất). **Phản hồi Guest/Public API tuyệt đối KHÔNG bao giờ để lộ SĐT/Zalo hay tọa độ GPS riêng tư.** Quyền mở xem thông tin liên hệ nhà vườn trên bài đăng của người khác chỉ dành riêng cho tài khoản `BUYER` đã đăng nhập; chủ sở hữu (Owner) luôn xem được thông tin của chính mình. | Backend + Frontend |
| BR-004  | Auth roles (MVP): `FARMER`, `BUYER`, `ADMIN`. **Cooperative is not a separate role.** | Backend |
| BR-004a | `BUYER` represents various business types (individual trader, agricultural intermediary, purchasing company, wholesaler, processor, exporter, cooperative buyer, agricultural purchasing unit). These are business profiles, NOT separate authentication roles. | Backend + Frontend |
| BR-005  | A `FARMER` account has `accountType` = `INDIVIDUAL` \| `COOPERATIVE`. Both types have the same capabilities: Production Areas, Crop Seasons, Farming Logs, Harvest Listings. | Backend |
| BR-006  | Advanced cooperative member management is out of MVP scope. | Product scope |

## Data Validation
| Rule ID | Rule                                           | Enforced By     |
|---------|-------------------------------------------------|-----------------|
| BR-010  | TBD                                             | TBD             |

## Business Logic
| Rule ID | Rule                                           | Enforced By     |
|---------|-------------------------------------------------|-----------------|
| BR-020  | TBD                                             | TBD             |

## Supply Discovery (Search, Filter, List & Map)
| Rule ID | Rule | Enforced By |
|---------|------|-------------|
| BR-030  | Search results only include supply listings that are published and not expired/closed. | Backend |
| BR-031  | Supported filters (MVP): product, location (Tỉnh/Thành phố trực thuộc TW → Đơn vị hành chính cơ sở theo danh mục chính thức hiện hành năm 2026, không bắt buộc cấp huyện; phân biệt rõ tên hành chính chính thức 2026 và địa danh lịch sử / vùng canh tác quen thuộc, ví dụ: Tiền Giang không còn là tỉnh độc lập, xã Mỹ Đức Đông thuộc xã Mỹ Đức Tây, tỉnh Đồng Tháp), available quantity, expected harvest date range (bộ lọc ngày linh hoạt, không giới hạn cứng 15–30 ngày). Bộ lọc theo giá số (numeric price filtering) tạm hoãn sau MVP. | Backend + Frontend |
| BR-031a | Expected Harvest Listings are encouraged to be published ~15–30 days before harvest where appropriate. This is a recommendation/guideline, NOT a hard universal rule. The platform must NOT block publishing if outside 15–30 days. | Product scope + UX |
| BR-032  | List view and map view show the **same result set** for the same filters. | Backend + Frontend |
| BR-033  | A ProductionArea location (MVP) is a **point** (`latitude`, `longitude`) the Farmer selects on the map. Area size is entered manually. No polygon / GeoJSON / spatial queries in MVP. | Backend + Frontend |
| BR-033a | If exact coordinates are missing, the UI must **not** imply an approximate marker is the real farm location. Either show the administrative location as text with no marker, or show an administrative-area marker clearly labelled **"Vị trí gần đúng"**. | Frontend |
| BR-033b | **Bảo vệ tọa độ GPS chính xác của nhà vườn (Quy tắc chính thức đã phê duyệt):** <br>• Tọa độ chính xác của Vùng sản xuất (`ProductionArea`) được bảo mật mặc định (`isGpsPublic = false`). <br>• Trên Chợ (`T-02`), Chi tiết nguồn cung (`T-03`) và Bản đồ nông nghiệp, hệ thống chỉ hiển thị vị trí gần đúng với nhãn **"Vị trí gần đúng"**. <br>• Tọa độ chính xác chỉ được công khai nếu Nông dân chủ động chọn công khai. <br>• Hệ thống **tuyệt đối KHÔNG tự động tiết lộ** tọa độ GPS chính xác sau khi Thỏa thuận thu mua đạt `CONFIRMED`. Nếu tọa độ được bảo mật, Nông dân và Bên mua tự thỏa thuận địa điểm giao nhận hàng cụ thể ngoài hệ thống (qua SĐT / Zalo / Facebook). <br>• Nếu không có tọa độ GPS chính xác, tuyệt đối không tạo điểm ghim giả mạo, chỉ hiển thị thông tin địa giới hành chính dạng văn bản. | Backend + Frontend |
| BR-034  | The supply detail page shows production-area, crop-season, farming-log and traceability information when available. Missing sections are shown as "not provided", never invented. | Frontend |

## Farmer Contact (Off-Platform)
| Rule ID | Rule | Enforced By |
|---------|------|-------------|
| BR-035  | Only contact methods the farmer explicitly provided are shown (phone, Zalo, Facebook, other links). | Backend + Frontend |
| BR-036  | Contact methods open the external channel (e.g. `tel:`, Zalo link, Facebook URL). MEKAGREEN does not record or mediate those conversations. | Frontend |
| BR-037  | **Quyền truy cập thông tin liên hệ Nông dân:** Chỉ tài khoản `BUYER` đã đăng nhập mới được xem thông tin liên hệ trực tiếp (SĐT, Zalo, Facebook) trên bài đăng của Nông dân khác. Chủ sở hữu bài đăng (`Owner`) được xem thông tin của chính mình. Phản hồi Guest/Public API tuyệt đối KHÔNG bao giờ để lộ SĐT/Zalo. | Backend + Frontend |
| BR-038  | Đề nghị thu mua (`Purchase Proposal`) **không** phải là điều kiện tiên quyết để mở thông tin liên hệ. Chỉ cần đăng nhập bằng tài khoản `BUYER` là đủ trong MVP. | Backend |
| BR-039  | Hệ thống ghi nhận dấu vết người dùng `BUYER` nào đã mở khóa thông tin liên hệ vào `contact_access_logs`. | Backend |

## Purchase Proposals & Procurement Agreements
| Rule ID | Rule | Enforced By |
|---------|------|-------------|
| BR-040  | Only an authenticated buyer-side user can submit a purchase proposal, and only on a published listing. A farmer cannot submit a proposal on their own listing. | Backend |
| BR-041  | A Purchase Proposal includes: related listing, buyer, farmer/seller, proposed quantity, proposed price, optional note, proposal date, status. | Backend + Frontend |
| BR-042  | **Simplified proposal model (MVP):** No negotiation rounds or versioned counter-offers. The farmer reviews and can accept or reject the proposal; buyer may withdraw; proposals may expire. | Backend |
| BR-043  | Purchase Proposal statuses: `PENDING`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`, `EXPIRED`. | Backend |
| BR-043a | **Điều kiện hết hạn đề nghị & Xử lý thiếu sản lượng tạm thời (Quy tắc 3A tinh chỉnh):** <br>• MVP **không tự động hết hạn theo số ngày cố định**. Khi còn `PENDING`, Bên mua có quyền rút (`WITHDRAWN`), Nông dân có quyền từ chối (`REJECTED`). <br>• Đề nghị ở trạng thái `PENDING` **chỉ chuyển sang `EXPIRED` vĩnh viễn** khi: (1) Bài đăng bị đóng (`CLOSED`), (2) Bài đăng bị hủy (`CANCELLED`), hoặc (3) Sản lượng thực tế còn lại không thể đáp ứng ngay cả khi giải phóng hết giữ chỗ: $\text{expectedQuantity} - \text{committedQuantity} < \text{proposedQuantity}$. Đề nghị đã `EXPIRED` **không tự động khôi phục**. <br>• **Trường hợp thiếu sản lượng tạm thời do giữ chỗ:** Khi $\text{availableQuantity} < \text{proposedQuantity} \le \text{expectedQuantity} - \text{committedQuantity}$, đề nghị **vẫn giữ trạng thái `PENDING`**, không bị hết hạn vĩnh viễn. Nút `[Chấp nhận]` trên `T-17` bị tạm khóa (disabled) kèm cảnh báo: *"Tạm thời chưa đủ sản lượng khả dụng do đang giữ chỗ cho thỏa thuận khác"*. Nếu thỏa thuận giữ chỗ bị hủy, nút `[Chấp nhận]` mở lại. Nếu thỏa thuận giữ chỗ được `CONFIRMED` và bài đăng hết sản lượng, lúc đó đề nghị mới chuyển sang `EXPIRED`. | Backend + Frontend |
| BR-044  | **Quy trình 2 bước riêng biệt (Quy tắc 2A):** Khi Nông dân chấp nhận đề nghị tại `T-17`, đề nghị chuyển sang `ACCEPTED`. Hệ thống khởi tạo bản ghi Thỏa thuận thu mua (`T-19`) với các điều khoản đóng băng. Thao tác chấp nhận đề nghị **KHÔNG tự động ghi nhận xác nhận thỏa thuận** (`farmerConfirmedAt` không tự điền ngầm). | Backend |
| BR-045  | Thỏa thuận thu mua chỉ chính thức chuyển sang trạng thái `CONFIRMED` khi **CẢ HAI BÊN** độc lập đọc và thực hiện thao tác bấm `[Xác nhận thỏa thuận]` trên cùng một snapshot điều khoản bất biến (`farmerConfirmedAt IS NOT NULL` và `buyerConfirmedAt IS NOT NULL`). | Backend |
| BR-046  | Thỏa thuận thu mua có các trạng thái: `PENDING_CONFIRMATION` → `CONFIRMED` hoặc `CANCELLED`. Thỏa thuận đã `CONFIRMED` không thể xóa/sửa và **tuyệt đối không thể hủy qua quy trình hủy thỏa thuận chưa hoàn tất**. Việc hủy/xử lý tranh chấp đối với thỏa thuận đã `CONFIRMED` là nghiệp vụ riêng ngoài phạm vi MVP. | Backend |
| BR-046a | **Quy tắc Hủy thỏa thuận chưa hoàn tất & Giải phóng giữ chỗ (Đã phê duyệt):** <br>1. Cả Farmer và Buyer đều có quyền hủy thỏa thuận khi trạng thái là `PENDING_CONFIRMATION`. <br>2. Cho phép hủy ngay cả khi một bên đã xác nhận (vd: Farmer đã xác nhận nhưng Buyer chưa xác nhận, hoặc ngược lại), miễn là thỏa thuận chưa đạt `CONFIRMED`. <br>3. Khi hủy, chuyển trạng thái sang `CANCELLED` và giải phóng `reservedQuantity` đúng một lần bằng Database Transaction an toàn nguyên tử. <br>4. Bắt buộc lưu đầy đủ `cancelledBy` (`FARMER` \| `BUYER`), `cancellationReason`, `cancelledAt` và **giữ nguyên lịch sử/dấu thời gian xác nhận trước đó** (`farmerConfirmedAt`, `buyerConfirmedAt`) để phục vụ truy vết, không được xóa/reset. <br>5. Tuyệt đối không cho phép hủy thỏa thuận `CONFIRMED` thông qua chức năng này. <br>6. Khi giải phóng sản lượng, chỉ cập nhật trạng thái sản lượng đối với bài đăng vẫn đang hoạt động (`AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`). **Tuyệt đối không tự động mở lại bài đăng đã `CLOSED` hoặc `CANCELLED`**. | Backend + Frontend |
| BR-047  | **Not a legal signature:** The agreement is a record of mutual confirmation on the platform. UI, emails and exports must **not** call it a "digital signature", "electronic signature", "e-contract", "chữ ký số" or "hợp đồng điện tử", or imply legal validity. | Frontend + Content |
| BR-048  | Every agreement view/export uses the term **"Thỏa thuận thu mua"** and shows a disclaimer, e.g.: _"Thỏa thuận thu mua được hai bên xác nhận trên hệ thống MEKAGREEN. Đây không phải chữ ký số hay hợp đồng điện tử có giá trị pháp lý."_ | Frontend |
| BR-049  | Supply discovery, Purchase Proposals and two-party Procurement Agreement confirmation happen **inside** MEKAGREEN. **Payment, logistics, invoicing and physical fulfillment happen outside** the platform in the MVP. | Product scope |

## Traceability & Certifications
| Rule ID | Rule | Enforced By |
|---------|------|-------------|
| BR-060  | MEKAGREEN does **NOT** legally certify VietGAP, organic status, planting-area-code validity, or export eligibility. The platform only stores and displays submitted information or reviewed documents. | Content + Frontend |
| BR-061  | **(PO-004) Định danh Truy xuất Nguồn gốc:** Mỗi bài đăng nguồn cung (`harvest_listings`) được cấp một mã truy xuất ngẫu nhiên, không đoán trước được (`trace_code`). Mã QR in trên tem nhãn chứa liên kết web trực tiếp đến trang truy xuất công khai `T-04` (`/trace/:trace_code`). Không tạo thực thể bảng riêng `harvest_batches` trong phạm vi MVP. Dữ liệu truy xuất đọc trực tiếp từ chuỗi liên kết: Mùa vụ (`crop_seasons`), Vùng sản xuất (`production_areas`), và Nhật ký (`farming_logs`). | Backend + Frontend |

## Harvest Listing Quantity & Commitments (Soft Reserve Model)
> Confirmed business requirement (Phương án 1A - D2) & Database ERD V1 (Locked).

| Rule ID | Rule | Enforced By |
|---------|------|-------------|
| BR-050  | One Harvest Listing may be committed to **multiple Buyers**, each for part of the expected quantity. | Backend |
| BR-051  | **Bốn đại lượng sản lượng (Quy tắc 1A):** <br>• `expectedQuantity`: Sản lượng dự kiến ban đầu của đợt thu hoạch (kg). <br>• `committedQuantity`: Tổng sản lượng của các thỏa thuận đã hoàn tất xác nhận 2 bên (`CONFIRMED`). <br>• `reservedQuantity`: Tổng sản lượng đang giữ chỗ tạm thời cho các thỏa thuận đã được tạo nhưng đang chờ 2 bên xác nhận (`PENDING_CONFIRMATION`). <br>• `availableQuantity = expectedQuantity − committedQuantity − reservedQuantity`. | Backend |
| BR-051a | **Cơ chế chuyển đổi sản lượng (Soft Reserve):** <br>• Đề nghị ở trạng thái `PENDING`: Không giữ chỗ (`reservedQuantity = 0`). <br>• Khi Farmer chấp nhận đề nghị: Chuyển lượng tương ứng vào `reservedQuantity`, lập tức trừ vào `availableQuantity`. <br>• Khi Thỏa thuận chính thức `CONFIRMED`: Chuyển lượng từ `reservedQuantity` sang `committedQuantity`. <br>• Khi Thỏa thuận chưa hoàn tất bị hủy: Giải phóng `reservedQuantity` đúng một lần, hoàn trả lại cho `availableQuantity` của bài đăng còn hoạt động. | Backend |
| BR-052  | **Transaction & Concurrency Safety (Bảo toàn nguyên tử, Chống xung đột đồng thời & Idempotency):** <br>• **Thứ tự khóa dòng cố định (Fixed Lock Ordering):** `harvest_listings` $\rightarrow$ `procurement_agreements` $\rightarrow$ `purchase_proposals`. Mọi giao dịch chạm tới nhiều thực thể bắt buộc khóa theo thứ tự này bằng `SELECT ... FOR UPDATE` để giảm thiểu nguy cơ Deadlock. <br>• **Cơ chế thử lại (Retry Loop):** Áp dụng `DB::transaction(..., 3)` để tự động thử lại khi có xung đột khóa. <br>• **Phòng thủ chiều sâu (Defense-in-Depth):** Ràng buộc toán học `(committed + reserved <= expected)` và `(available >= 0)` được khai báo tại CSDL và bắt buộc phải được thẩm tra ở tầng ứng dụng (Laravel Service/FormRequest). <br>• **Tranh chấp thao tác đồng thời (Buyer Xác nhận vs Farmer Hủy):** Giao dịch giành lock trước quyết định trạng thái cuối (`CONFIRMED` hoặc `CANCELLED`); giao dịch đến sau đọc lại thấy trạng thái không còn là `PENDING_CONFIRMATION` và bị từ chối ngay lập tức (Rollback, HTTP 409 Conflict). <br>• Tuyệt đối không cho phép xác nhận thỏa thuận đã bị hủy, và không cho phép hủy thỏa thuận đã `CONFIRMED`. | Backend |
| BR-053  | **5 Trạng thái Database của bài đăng & Trạng thái UX phái sinh (Derived State):** <br>• **5 Trạng thái Database chuẩn:** `AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED` (không thêm enum mới vào cơ sở dữ liệu). <br>• `AVAILABLE`: Chưa có cam kết nào (`committedQuantity = 0`). <br>• `PARTIALLY_COMMITTED`: Đã có cam kết một phần (`committedQuantity > 0` và `committedQuantity < expectedQuantity`). <br>• `FULLY_COMMITTED`: Đã cam kết đủ 100% sản lượng bằng các thỏa thuận `CONFIRMED` (`committedQuantity == expectedQuantity`). <br>• `CLOSED` & `CANCELLED`: Trạng thái kết thúc của bài đăng. Khi thỏa thuận liên quan bị hủy, hệ thống giải phóng `reservedQuantity` đúng một lần trên sổ kế toán, **tuyệt đối giữ nguyên trạng thái `CLOSED` hoặc `CANCELLED`**, không bao giờ tự động mở lại bài đăng. <br>• **Trạng thái hiển thị UX phái sinh ("Tạm hết sản lượng khả dụng"):** Khi $\text{availableQuantity} = 0$ nhưng $\text{committedQuantity} < \text{expectedQuantity}$ (tức $\text{reservedQuantity} > 0$, đang giữ chỗ tạm thời toàn bộ phần sản lượng còn lại): Trạng thái trong Database vẫn giữ nguyên (`AVAILABLE` hoặc `PARTIALLY_COMMITTED`), **tuyệt đối không ghi `FULLY_COMMITTED` vào DB**. Trên giao diện (UX), hiển thị nhãn tính toán: *"Tạm hết sản lượng khả dụng (Đang giữ chỗ chờ xác nhận)"* và tạm khóa nút gửi đề nghị mới. Khi thỏa thuận giữ chỗ bị hủy, $\text{availableQuantity} > 0$, UI tự động mở lại mà không cần cập nhật database. | Backend + Frontend |
| BR-053a | **(PO-003) Chặn Đóng/Hủy Bài đăng khi còn Thỏa thuận Chờ Xác nhận:** Hệ thống tuyệt đối chặn thao tác Đóng (`CLOSED`) hoặc Hủy (`CANCELLED`) bài đăng nếu còn bất kỳ Thỏa thuận thu mua nào liên quan đang ở trạng thái `PENDING_CONFIRMATION` (đang giữ chỗ sản lượng). Nông dân hoặc Bên mua phải chủ động hủy thỏa thuận chưa hoàn tất (giải phóng giữ chỗ theo BR-046a) hoặc chờ hoàn tất xác nhận trước khi có thể đóng bài đăng. | Backend (Laravel) |

## Constraints
<!-- List any hard constraints: regulatory, performance, security -->
- **Require MySQL >= 8.0.16 for MVP**: Bắt buộc MySQL phiên bản tối thiểu 8.0.16 để thực thi ràng buộc `CHECK` và `STORED GENERATED` columns. Mọi invariant nghiệp vụ và toán học sản lượng bắt buộc được kiểm soát độc lập ở cả tầng ứng dụng Laravel lẫn tầng CSDL.
- **Flexible Text-Based Pricing**: Giữ nguyên định dạng giá dạng văn bản linh hoạt (`VARCHAR`) trong MVP cho giá tham khảo, giá đề xuất và giá chốt hợp đồng. Đóng băng snapshot điều khoản và mức giá giống hệt nhau khi hai bên xác nhận thỏa thuận. Bộ lọc theo giá số (numeric price filtering) tạm hoãn sau MVP.
- **No payment, logistics, invoicing, physical fulfillment or legally qualified digital signatures in the MVP** (see ADR-004, ADR-005).
- Legally qualified e-signatures may only be offered later by integrating a licensed provider. Until then BR-047 / BR-048 apply.
- Farmer contact data is personal data: show it only as BR-035 / BR-037 allow (chỉ tài khoản BUYER đã đăng nhập hoặc Owner; không bao giờ trả về trên Guest/Public API).

---
> _Fill in rules as they are defined during development._
> _Last updated: 2026-10-14 (Integrated PO-001 through PO-004 & Final PO Clarifications)_
