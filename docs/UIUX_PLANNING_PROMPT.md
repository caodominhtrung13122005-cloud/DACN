# 🎨 UI/UX Planning Prompt — MEKAGREEN

> **Canonical source of truth for the MEKAGREEN UI/UX planning phase.**
> Every AI session or team member doing UI/UX work must read and follow this file.
> If this file conflicts with another document, report the conflict. Do not silently pick one.

| Item | Value |
|------|-------|
| Status | Active: Phase 7 — UX Review (APPROVED & LOCKED) → Ready for Phase 8 |
| Created | 2026-10-08 |
| Related | [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) · [PRODUCT_PLAN.md](./PRODUCT_PLAN.md) · [BUSINESS_RULES.md](./BUSINESS_RULES.md) · [DECISIONS.md](./DECISIONS.md) · [UX_REVIEW.md](./UX_REVIEW.md) |

> [!IMPORTANT]
> Phase 6 (Low-fidelity Wireframes) and Phase 7 (UX Review) are **APPROVED & LOCKED**. The next authorized phase is **Phase 8 (Design System)**. Do **NOT** start high-fidelity designs, UI code, frontend/backend scaffolding, ERD changes, migrations, or API design until explicitly instructed.
> Each step of the UI/UX workflow (§15) needs explicit approval before the next one starts.

---

## 1. Project Context

**MEKAGREEN** is a digital agricultural platform that connects **agricultural producers** (individual farmers / households and cooperatives) with **traders, intermediaries, purchasing companies, processors, wholesalers, exporters and other agricultural buyers**.

- Project type: **2-month university specialization project**
- Core flow:

```
Production Area → Crop Season → Farming Log → Expected Harvest Listing
→ Marketplace / Agricultural Map → Buyer discovers supply
→ External Contact and/or Purchase Proposal → Procurement Agreement
→ Both Parties Confirm → Traceability
```

- **Inside the platform**: supply discovery, Purchase Proposals, two-party Procurement Agreement confirmation.
- **Outside the platform (MVP)**: payment, invoicing, logistics, shipping, physical fulfillment, legally qualified digital signatures.

---

## 2. Product Pillars

| # | Pillar | Contents |
|---|--------|----------|
| 1 | **Digital Production Record** | Production Area · Crop Season · Farming Log · Agricultural documents / certifications |
| 2 | **Expected Harvest Marketplace** | Farmers publish expected harvest supply before harvest · Buyers discover supply early · Search, filters, marketplace and map connect supply with demand |
| 3 | **Procurement Commitment** | Buyer submits a Purchase Proposal · Both parties agree on basic terms · Both confirm the agreement in MEKAGREEN · The platform stores agreement history for reference and accountability |

> [!WARNING]
> The agreement is a **platform-confirmed procurement agreement**: "Thỏa thuận thu mua được hai bên xác nhận trên hệ thống".
> Never describe it as a legally qualified digital signature, a legally certified electronic contract, or a replacement for formal legal contracts,
> unless a legally compliant digital-signature service is integrated in the future.

### Expected Harvest timing (recommendation)
- Expected Harvest Listings are **encouraged** to be published about **15–30 days before harvest** where appropriate.
- This is a **recommended workflow, NOT a hard rule**. Lead times differ by product.
- UX: show it as guidance (hint text / soft notice). **Never block** publishing because the harvest date is outside 15–30 days.

---

## 3. Geographical Scope

- MVP: **Southern Vietnam**: **Southeast (Đông Nam Bộ)** and **Mekong Delta (Đồng bằng sông Cửu Long)**.
- Architecture, content and location pickers must stay expandable to all of Vietnam (do not hard-code a region in UI structure).
- Administrative locations must follow the **current official administrative structure** (verified under NQ 202/2025/QH15, NQ 1663/NQ-UBTVQH15, NQ 1687/NQ-UBTVQH15: 34 provinces/cities, 2-tier local administration Tỉnh/TP → Xã/Phường, no mandatory district level; e.g. Tiền Giang merged into Đồng Tháp, Bến Tre & Trà Vinh merged into Vĩnh Long, Sóc Trăng & Hậu Giang merged into Cần Thơ City).

---

## 4. User Model

| Auth Role | Notes |
|-----------|-------|
| `FARMER` | `accountType` = `INDIVIDUAL` \| `COOPERATIVE`. **Cooperative is NOT a separate role.** Both types have the same MVP capabilities. No advanced cooperative member management in MVP. |
| `BUYER` | Business profile (not a role): individual trader · agricultural intermediary · purchasing company · wholesaler · processor · exporter · cooperative buyer · agricultural purchasing unit. |
| `ADMIN` | Moderation and review. **Not** a legal certification authority. |
| Guest | Can view listings, production information, general location and public traceability pages. **Cannot** see direct contact information. |

UX implications:
- Show account type / business profile as a **profile badge**, not as different navigation structures.
- Registration: choose role (Farmer / Buyer), then account type (Farmer) or business profile (Buyer).

---

## 5. Core MVP Modules

| # | Module | Vietnamese UI | Domain term |
|---|--------|---------------|-------------|
| 1 | Production Area | Vùng sản xuất | `ProductionArea` |
| 2 | Crop Season | Mùa vụ | `CropSeason` |
| 3 | Farming Log | Nhật ký canh tác | `FarmingLog` |
| 4 | Expected Harvest Listing | Nguồn cung dự kiến / Bài đăng thu hoạch dự kiến | `HarvestListing` |
| 5 | Agricultural Supply Marketplace | Chợ nguồn cung nông sản | — |
| 6 | Agricultural Digital Map | Bản đồ nông nghiệp | — |
| 7 | External Contact | Liên hệ nhà cung cấp | — |
| 8 | Purchase Proposal | Đề nghị thu mua | `PurchaseProposal` |
| 9 | Procurement Agreement | Thỏa thuận thu mua | `ProcurementAgreement` |
| 10 | Traceability | Truy xuất thông tin sản xuất / Truy xuất nguồn gốc | `TraceabilityRecord` |
| 11 | Admin | Quản trị | — |

### Module notes for UX

**Production Area**: point location (lat/lng) picked on a map; area size entered manually; no polygon drawing. Exact GPS coordinates are **private by default**; public marketplace and map show approximate location labelled **"Vị trí gần đúng"**. Exact coordinates are public only if the farmer explicitly opts in, and are **not** automatically revealed after CONFIRMED (pickup location exchanged off-platform via phone/Zalo). Missing coordinates → text location only, never fabricate a marker.

**Crop Season**: belongs to a Production Area; product, variety, start date, expected harvest window.

**Farming Log**: dated activity entries under a Crop Season (e.g. sowing, fertilizing, spraying, irrigation, harvest). Must be fast to enter on mobile.

**Expected Harvest Listing**: linked to a Crop Season; product, variety, expected quantity, expected harvest date, location. Shows `expectedQuantity`, `committedQuantity`, `availableQuantity`. States: `AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED`.

**Marketplace + Map**: one search experience. Filters: product, location, quantity, harvest date, etc. List and map show the same result set.

**External Contact**: phone, Zalo, Facebook, other links. **Login required.** A Purchase Proposal is **not** required before viewing contacts. External contact and platform proposals can coexist.

**Purchase Proposal**: related listing · buyer · farmer · proposed quantity · proposed price · optional note · proposal date · status.
Statuses: `PENDING` · `ACCEPTED` · `REJECTED` · `WITHDRAWN` · `EXPIRED`. **No negotiation rounds / counter-offers in MVP.**

**Procurement Agreement**: agreement code · related listing · product · variety · production area · seller · buyer · agreed quantity · agreed price · expected harvest / collection period · basic terms · farmer confirmation + timestamp · buyer confirmation + timestamp · status · optional PDF export.
Fully confirmed **only** when both parties confirm the same terms. Always shows the non-legal disclaimer.

**Traceability**: may include Production Area, Crop Season, product, variety, selected Farming Log entries, Harvest Listing, submitted documents, related agreement where appropriate. Public traceability page + traceability code + QR if feasible.
- QR **contains or resolves to a URL / traceability code**. Never put all traceability data in the QR.
- Never claim MEKAGREEN certifies VietGAP, organic status, planting-area-code validity or export eligibility. Show documents as **submitted** or **reviewed by admin**, never "certified by MEKAGREEN".

**Admin**: manage users · production areas · harvest listings · review submitted documents · moderate incorrect/abusive listings · review proposals/agreements when necessary · manage basic reference data. **No payment or logistics management.**

---

## 6. Farming.vn Reference Rules

> [!CAUTION]
> **Farming.vn must NEVER become the product blueprint for MEKAGREEN.**

- Farming.vn is a **functional reference only** ([research/FARMING_VN_REFERENCE.md](./research/FARMING_VN_REFERENCE.md)).
- It may only inspire selected **functional patterns**: agricultural map, production-area discovery, location-based agricultural information, map/search interaction ideas.
- **Do NOT copy**: UI, layout, branding, content, source code, product architecture, user roles, database design, API design.
- MEKAGREEN independently defines its **product logic, UX flows, visual identity, information architecture, data model, technical architecture and business rules**.
- References for the "References" step (§15) must include **several** sources (agritech, B2B procurement, map products), not Farming.vn alone.

---

## 7. Visual Direction

**Modern Vietnamese Agritech + Professional B2B Platform + Real Operational Product + Premium but Restrained**

The UI must communicate:
1. **Agricultural Trust**
2. **Traceable Production Information**
3. **Professional Procurement Connection**

It must feel credible to **farmers, cooperatives, traders and purchasing businesses** alike.

**It must NOT feel like:** a government administrative portal · Shopee-style e-commerce · a generic SaaS/startup template · a social network · a generic CRUD dashboard.

**Preferred direction** (indicative only; tokens are finalized in the Design System step):
- Deep agricultural green as the primary brand color
- Warm neutral / cream surfaces
- Dark charcoal text
- Restrained accent colors (e.g. a muted harvest/earth tone), with status colors used only for meaning
- Real agricultural photography where appropriate (Southern Vietnam context), never stock clichés
- Clear hierarchy, moderate information density
- Minimal shadow, subtle borders, controlled border radius
- Typography with full Vietnamese diacritic support

**Qualities:** practical · trustworthy · data-oriented · realistic · restrained · usable.

### Avoid (generic AI-style UI)
Excessive gradients · glassmorphism · giant rounded cards · decorative blobs · random floating badges · excessive KPI cards · huge dashboard hero sections · decorative icons without purpose · fake marketing metrics · excessive whitespace in operational screens · card grids for everything.

---

## 8. UI Realism Rules

- Design screens as a **real operational product**, not a marketing demo.
- Use **tables / dense lists** for operational data (listings, proposals, agreements, admin records). Cards only where scanning visuals helps (e.g. marketplace results with photos).
- Every status shown must map to a defined conceptual status (§5). Do not invent statuses.
- Show **real constraints** in the UI: available quantity, "login to see contact", "Vị trí gần đúng", non-legal agreement disclaimer, recommendation hint for 15–30 days.
- Design **empty, loading, error and permission-denied states** inside the same template. Do not create separate screens for them.
- Actions must reflect role and state (e.g. only the Farmer sees Accept / Reject on a PENDING proposal).
- No fake features: no chat, payment, shipping or rating widgets unless approved.

## 9. Content Realism

- UI language: **Vietnamese** (primary). Domain terms follow the terminology table (§16).
- Use realistic Southern Vietnam sample content: real crop names and common varieties (e.g. sầu riêng Ri6 / Monthong, xoài cát Hòa Lộc, bưởi da xanh, lúa ST25, thanh long ruột đỏ, chôm chôm, cà phê Robusta, hồ tiêu) and current official administrative names.
- Formats: dates `dd/mm/yyyy`; currency `VND` (e.g. `45.000 đ/kg`); quantities in `kg` / `tấn` with units always shown.
- **No** fake metrics ("10.000+ nông dân tin dùng"), fake testimonials, fake certifications or fake partner logos.
- Document labels must not exaggerate: "Giấy chứng nhận VietGAP (do nông hộ cung cấp)", not "Đã chứng nhận VietGAP bởi MEKAGREEN".

---

## 10. Information Architecture Principles

- MVP page inventory: **about 20–24 reusable route/page templates maximum**.
- **Do not** create separate screens for every minor status. Use **state-aware, role-aware** templates.
- **One** Purchase Proposal Detail page; actions change by role and status.
- **One** Procurement Agreement Detail page for both Farmer and Buyer.
- Role-based list templates are shared where the structure matches (e.g. "Received Purchase Proposals" for Farmer and "My Purchase Proposals" for Buyer use the same template).

### Draft page-template inventory (for review, not final)

| # | Template | Access | Notes |
|---|----------|--------|-------|
| 1 | Home / Landing | Public | Hero Banner Full-Bleed Panoramic Nam Bộ; tiêu đề: *"Kết nối nguồn cung nông sản – Chủ động trước mùa thu hoạch"*; 2 CTA: `[Khám phá nguồn cung]` & `[Đăng nguồn cung]`; Thanh tìm kiếm nông sản nổi đè phía dưới liên kết Marketplace; không dùng số liệu thống kê giả mạo. |
| 2 | Marketplace (List / Map / Split view) | Public | Single template for search, filters, list and map |
| 3 | Harvest Listing Detail | Public (contacts: login) | Production context, quantities, contact block, "Gửi đề nghị thu mua" |
| 4 | Public Traceability Page | Public | Reached via traceability code / QR |
| 5 | Login | Public | |
| 6 | Register (role → account type / business profile) | Public | |
| 7 | Dashboard (role-based) | Farmer / Buyer / Admin | One template, role-specific widgets (restrained, no KPI spam) |
| 8 | Production Area List | Farmer | |
| 9 | Production Area Detail | Farmer (+ public view via listing) | Crop seasons, documents, map point |
| 10 | Production Area Form | Farmer | Create / edit; map point picker |
| 11 | Crop Season Detail | Farmer | Farming log timeline, linked listing |
| 12 | Crop Season Form | Farmer | |
| 13 | Farming Log Entry Form | Farmer | Mobile-first; may be drawer/modal |
| 14 | My Harvest Listings | Farmer | Quantities and state columns |
| 15 | Harvest Listing Form | Farmer | 15–30-day recommendation hint, never blocking |
| 16 | Purchase Proposal List (role-based) | Farmer: "Đề nghị nhận được" / Buyer: "Đề nghị của tôi" | |
| 17 | Purchase Proposal Detail (role/state-aware) | Farmer / Buyer | Accept / Reject (Farmer), Withdraw (Buyer) |
| 18 | Procurement Agreement List (role-based) | Farmer / Buyer | |
| 19 | Procurement Agreement Detail (role/state-aware) | Farmer / Buyer (+ Admin read) | Confirm action, timestamps, disclaimer, PDF export (optional) |
| 20 | Profile & Settings | All roles | Contact methods, account type / business profile, documents |
| 21 | Admin Records List (generic) | Admin | Users, areas, listings, documents, proposals, agreements |
| 22 | Admin Record Review Detail | Admin | Moderate / review actions |
| 23 | Error / Not found / Access denied | All | |

---

## 11. User Flow Principles

### Farmer Flow
```
Login → Dashboard → Create Production Area → Create Crop Season → Add Farming Log
→ Publish Expected Harvest Listing → Listing appears in Marketplace / Map
→ Receive Buyer interest → Receive Purchase Proposal → Review Proposal → Accept / Reject
→ (if basic terms agreed) Procurement Agreement → Farmer confirms → Wait for Buyer confirmation
→ Agreement confirmed when both confirm → Traceability information remains available
```
External contact (phone / Zalo / Facebook) may happen at any appropriate stage.

### Buyer Flow
```
Marketplace / Map → Search / Filter → View Supply Detail
→ Review Production Area / Crop Season / Farming Log context
→ Contact Farmer directly (login required)  AND/OR  Submit Purchase Proposal
→ Farmer reviews → (if accepted / terms agreed) Procurement Agreement
→ Buyer confirms → Wait for Farmer confirmation → Agreement confirmed when both confirm
→ View traceability information
```

### Admin Flow
```
Dashboard → Review users / production areas / listings / documents
→ Moderate inappropriate or incorrect content → Inspect platform records where necessary
```
No payment or logistics management in Admin.

### Principles
- Each flow must show **where the user is waiting on the other party** (e.g. "Chờ người mua xác nhận").
- Guests who hit a login-protected action (view contact, send proposal) must be returned to the same listing after login.
- Never let a flow imply that a payment, shipment or legal contract happens on the platform.

### UX Priority Screens (first in wireframe review)
1. Marketplace (List / Map)
2. Harvest Listing Detail
3. Purchase Proposal Detail
4. Procurement Agreement Detail
5. Traceability Detail / Public Traceability Page
6. Production Area / Crop Season / Farming Log entry (farmer data-entry path)

Use state-aware reusable pages. Do **not** design every state as a separate screen.

---

## 12. Responsive Strategy

- **Farmer data entry is mobile-first**: Production Area, Crop Season, Farming Log and Harvest Listing forms must work well on a phone (often used in the field).
- **Buyer discovery is desktop-first but fully mobile-capable**: the Marketplace offers split list + map on desktop and a **list / map toggle** on mobile.
- **Admin is desktop-first**. Mobile only needs basic read access.
- Indicative breakpoints: mobile < 768px, tablet 768–1199px, desktop ≥ 1200px (final in Design System).
- Tables collapse to stacked rows on mobile. Primary actions stay reachable (sticky bottom action bar on mobile detail pages).
- Contact actions on mobile use native links (`tel:`, Zalo app link, Facebook URL).

## 13. Accessibility Principles

- Target **WCAG 2.1 AA**: text contrast ≥ 4.5:1, UI components ≥ 3:1.
- Body text ≥ 16px, and fonts must render all Vietnamese diacritics clearly.
- Touch targets ≥ 44 × 44px.
- **Never convey status by color alone**: always text label (+ optional icon).
- All form fields have visible labels, helpful Vietnamese error messages and units shown.
- Full keyboard navigation and visible focus states. Map features also need a list alternative.
- Images have meaningful `alt` text. Decorative images are hidden from assistive tech.
- Plain, simple Vietnamese for users with varying digital literacy. Avoid jargon and English-only labels in farmer flows.

---

## 14. Scope Restrictions (2-month MVP)

**MVP focus:**
```
Production Area → Crop Season → Farming Log → Expected Harvest Listing → Marketplace / Map
→ Purchase Proposal → Basic Procurement Agreement → Two-party Confirmation → Traceability
```

**NOT in core scope:** payment gateway · integrated logistics · shipping management · invoicing · legally qualified digital signatures · blockchain · AI/ML matching · realtime chat · IoT · advanced GIS · advanced dispute management · full inspection workflow · enterprise analytics.

**Future / Nice-to-Have only:** delivery management · quality inspection workflow · dispute workflow · advanced negotiation rounds · realtime messaging · payment integration · logistics integration · polygon/GeoJSON production-area drawing · MySQL spatial queries · nationwide rollout · AI matching · legal digital signatures.

Treat **optional within MVP** (do only if time permits): QR code generation, PDF export of agreements.

---

## 15. UI/UX Workflow & UI Lock

```
Product Definition → UI/UX Direction → References → Information Architecture → User Flows
→ Low-fi Wireframes → UX Review → Design System → High-fidelity Prototype
→ UI_LOCK.md → UI implementation → UI testing
```

| Step | Output | Gate |
|------|--------|------|
| Product Definition | PROJECT_CONTEXT, PRODUCT_PLAN, BUSINESS_RULES | User approval |
| UI/UX Direction | This file | User approval |
| References | Curated reference board (multiple sources, not Farming.vn alone) with notes on *what* pattern is borrowed and *why* | User approval |
| Information Architecture | Final page-template inventory + navigation per role | User approval |
| User Flows | Flow diagrams per role, incl. states | User approval |
| Low-fi Wireframes | Priority screens first (§11) | UX Review |
| UX Review | Issues list + fixes | User approval |
| Design System | Tokens (color, type, spacing, radius), core components, status badges | User approval |
| High-fidelity Prototype | Priority screens in hi-fi | User approval |
| **UI_LOCK.md** | List of locked screens, tokens, components, version/date | **Locked** |
| UI implementation | React UI following UI_LOCK.md | Review |
| UI testing | Responsive, accessibility, state coverage | Review |

**UI Lock rules:**
- After `UI_LOCK.md` exists, UI implementation must follow it exactly.
- Any change to locked screens, tokens or components needs a recorded change request (in `UI_LOCK.md` or `DECISIONS.md`) approved by the user.
- AI sessions must not "improve" or restyle locked UI on their own.

**Current position:** Phase 9 — High-Fidelity Prototype + UI Lock: APPROVED & LOCKED ([HIGH_FIDELITY_UI.md](./HIGH_FIDELITY_UI.md), [UI_LOCK.md](./UI_LOCK.md)). UI/UX planning is complete and fully locked. Strictly paused awaiting technical implementation command.

---

## 16. Terminology Rules

| English domain term | Vietnamese UI wording |
|---------------------|----------------------|
| ProductionArea | Vùng sản xuất |
| CropSeason | Mùa vụ |
| FarmingLog | Nhật ký canh tác |
| HarvestListing | Nguồn cung dự kiến / Bài đăng thu hoạch dự kiến |
| PurchaseProposal | Đề nghị thu mua |
| ProcurementAgreement | Thỏa thuận thu mua |
| TraceabilityRecord | Truy xuất thông tin sản xuất / Truy xuất nguồn gốc (where appropriate) |
| Approximate location | Vị trí gần đúng |

**Proposed status labels** (pending approval):

| Status | Vietnamese label |
|--------|------------------|
| Proposal `PENDING` | Chờ phản hồi |
| Proposal `ACCEPTED` | Đã chấp nhận |
| Proposal `REJECTED` | Đã từ chối |
| Proposal `WITHDRAWN` | Đã rút |
| Proposal `EXPIRED` | Hết hạn |
| Listing `AVAILABLE` | Đang mở |
| Listing `PARTIALLY_COMMITTED` | Đã cam kết một phần |
| Listing `FULLY_COMMITTED` | Đã cam kết đủ sản lượng |
| Listing `CLOSED` | Đã đóng |
| Listing `CANCELLED` | Đã hủy |

**Forbidden / exaggerated wording:** "Hợp đồng điện tử có giá trị pháp lý", "chữ ký số", "ký hợp đồng", "MEKAGREEN chứng nhận …", "đạt chuẩn VietGAP (xác nhận bởi MEKAGREEN)", "đủ điều kiện xuất khẩu".

---
> _Last updated: 2026-10-08_
