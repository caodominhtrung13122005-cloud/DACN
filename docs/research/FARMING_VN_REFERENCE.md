# 🔬 Functional Reference: Farming.vn
**Purpose**: External research reference for MEKAGREEN project understanding.
**Date**: 2026-10-01
**Status**: Research only — NOT the source of truth for Mekagreen.

> [!WARNING]
> This document is a **functional reference**, not a specification for Mekagreen.
> Do not treat anything here as a confirmed Mekagreen requirement.
> No UI, source code, or content has been copied from Farming.vn.

---

## 1. VERIFIED FROM PUBLIC FARMING.VN SOURCES

The following facts are confirmed from Farming.vn's public website metadata, published descriptions, and Vietnamese press coverage.

### What Farming.vn publicly states it does:
- **Platform description** (from og:description): "Farming.vn kết nối dữ liệu cây trồng, vùng nguyên liệu, mã số vùng trồng, sản lượng, giá cả và truy xuất nguồn gốc phục vụ nông hộ, HTX, doanh nghiệp và đơn vị thu mua."
- **Target users**: Nông hộ (farmers), HTX (cooperatives), doanh nghiệp (enterprises), đơn vị thu mua (procurement agencies).
- **Data types mentioned**: Crop data, raw material zones, planting zone codes (mã số vùng trồng), production volume, pricing, traceability.

### Confirmed from press coverage (vnbusiness.vn):
- Farming.vn supports **production management per lot and per household**.
- Provides **standardized input management** (vật tư đầu vào).
- Offers **electronic farming diary** (nhật ký canh tác điện tử).
- Supports **QR code-based traceability** for origin tracking.
- Helps products meet certification standards (GAP, ISO, BRC, Halal mentioned).
- Used in real deployment contexts (e.g., agricultural value chain in Ea Súp).

### Confirmed technical facts:
- Farming.vn is a **Single Page Application** (SPA) — confirmed by inspecting the public HTML (Vite-built, `<div id="root">`, JS bundle).
- Frontend framework: Likely React or Vue (SPA with Vite bundler — exact framework not confirmed).
- Hosted behind Cloudflare (Cloudflare insights beacon detected).

---

## 2. INFERRED / NOT CONFIRMED

The following items are **reasonable assumptions** based on the platform's described features and common patterns in Vietnamese agricultural platforms. They are NOT verified.

> [!CAUTION]
> These are educated guesses. Do not treat as facts about Farming.vn's implementation.

### Inferred features:
- Interactive map with polygon-based zone boundaries (common in agricultural mapping, but exact implementation not visible without login).
- Hierarchical geographic filtering (Province → District → Commune → Zone) — standard in Vietnam administrative systems, not confirmed as Farming.vn's exact structure.
- Role-based access control with differentiated permissions per user type — inferred from the fact that they serve multiple user types.
- Market price monitoring and trend charts — "giá cả" is mentioned in their description but exact feature scope is unknown.
- Batch/lot tracking from planting to distribution — inferred from "truy xuất nguồn gốc" but internal data model is unknown.

### NOT known:
- Farming.vn's exact database technology (MySQL, PostgreSQL, MongoDB, etc.)
- Their API structure or endpoint design
- Their exact data schema or entity relationships
- Their map technology (Leaflet, Mapbox, Google Maps, or custom)
- Whether they use spatial database features (e.g., PostGIS, MySQL Spatial)
- Their authentication/authorization implementation
- Their backend framework (Laravel, Django, Express, etc.)
- Internal user role definitions and permission matrices
- Whether the platform is open to public registration or invite-only

---

## 3. IDEAS THAT MAY BE ADAPTED FOR MEKAGREEN

The following are **general functional patterns** observed in Farming.vn and similar agricultural platforms. These are ideas to consider during Mekagreen product definition — not decisions.

> [!NOTE]
> Each idea needs evaluation against Mekagreen's actual requirements before adoption.

### Potentially relevant patterns:
1. **Zone-based data organization** — Organizing agricultural data around geographic production zones rather than just individual products.
2. **Farming diary / activity logging** — Recording cultivation activities for compliance and traceability purposes.
3. **QR-based traceability** — Generating scannable codes that link consumers to production history.
4. **Multi-stakeholder platform** — Serving different user types (producers, buyers, administrators) with different data views.
5. **Geographic search & filtering** — Allowing users to find data by location hierarchy.
6. **Certification compliance tracking** — Tracking whether production zones or products meet specific standards.
7. **Input material management** — Tracking what fertilizers, pesticides, etc. are used and whether they are approved.
8. **Production volume aggregation** — Summarizing yields across zones, regions, or crop types.

### Questions to answer before adapting any of these:
- Does Mekagreen serve the same user types as Farming.vn?
- What is Mekagreen's specific focus area? (All agriculture? Specific crops? Specific region?)
- Does Mekagreen need a map at all? If yes, what should it show?
- What compliance standards (if any) must Mekagreen support?
- Is traceability a core requirement or a nice-to-have?
- What data does Mekagreen actually need to manage?

---

## 4. TECHNICAL RECOMMENDATIONS FOR MEKAGREEN

The following are **general technical suggestions** based on standard practices for platforms with similar functional requirements. These are NOT architecture decisions — just options to evaluate.

> [!IMPORTANT]
> No technical decisions should be made until Mekagreen's product requirements are defined.

### If Mekagreen needs an interactive map:
- **Option A**: Leaflet.js (open source, free, well-documented)
- **Option B**: Mapbox GL JS (more features, free tier available, requires API key)
- **Option C**: Google Maps API (most familiar, usage-based pricing)
- Map tiles: OpenStreetMap (free) or commercial providers

### If Mekagreen needs QR-based traceability:
- Frontend: qrcode.js or react-qr-code
- Backend: endroid/qr-code (PHP/Laravel) or similar library

### If Mekagreen needs geographic data for Vietnam:
- Vietnam administrative boundary data is available as open data (GeoJSON)
- Standard hierarchy in legacy datasets: Tỉnh/TP → Quận/Huyện → Phường/Xã (Note: MEKAGREEN follows current 2-tier official restructuring: Tỉnh/TP → Xã/Phường, no mandatory district level; e.g. NQ 202/2025/QH15).

### If Mekagreen needs data visualization:
- Chart.js (lightweight, good for simple charts)
- Recharts (React-native, good integration)
- Apache ECharts (more advanced, better for complex dashboards)

### Independent Decisions Made for MEKAGREEN (Do not infer from Farming.vn):
- ✅ **Location model (MVP)**: Simple point coordinates (`latitude`, `longitude`) only — ADR-006. Polygons and GIS spatial database features are explicitly deferred.
- ✅ **User roles & profiles**: `FARMER` (with `accountType` = `INDIVIDUAL` | `COOPERATIVE`), `BUYER` (with business profiles), `ADMIN` — ADR-007.
- ✅ **Procurement Agreement**: Platform confirmation record ("Thỏa thuận thu mua"), NOT an electronic signature or legal contract — ADR-005.
- ✅ **Strict separation rule**: Farming.vn must **NEVER** become the product blueprint for MEKAGREEN. Do not copy UI, branding, layout, content, source code, architecture, roles, database design, or API design.

### Decisions Still Deferred (Future Implementation Phase):
- ❌ Specific map tile provider (Leaflet vs Mapbox vs Google Maps)
- ❌ Database schema / migrations (`ERD.md` on hold)
- ❌ API endpoint structure

---

## Sources

| Source | Type | URL |
|--------|------|-----|
| Farming.vn homepage | Public website | https://farming.vn |
| Farming.vn meta description | Public HTML metadata | (inspected directly) |
| VNBusiness article on Farming.vn | Press coverage | vnbusiness.vn |
| Vietnam agricultural map context | General research | Various gov.vn sources |

---

> _This document is an external research reference only. MEKAGREEN is designed independently._
> _Last updated: 2026-10-08_
