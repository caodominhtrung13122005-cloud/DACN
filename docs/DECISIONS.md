# 🧭 Architecture Decision Records — MEKAGREEN

## Purpose
This document tracks key technical and design decisions made during the project, along with their rationale.

---

## ADR-001: Monorepo with Separate Frontend & Backend
- **Date**: 2026-10-01
- **Status**: Accepted
- **Context**: The project needs a clear separation between frontend (React/Vite) and backend (Laravel).
- **Decision**: Use a single repository with `frontend/` and `backend/` directories.
- **Rationale**: Simplifies collaboration, keeps docs centralized, and allows shared CI/CD pipeline.
- **Consequences**: Developers must be aware of which directory they are working in.

---

## ADR-002: Laragon for Local Development
- **Date**: 2026-10-01
- **Status**: Accepted
- **Context**: Team develops on Windows.
- **Decision**: Use Laragon as the local development server.
- **Rationale**: Laragon provides an all-in-one Apache/Nginx + MySQL + PHP stack on Windows with zero-config.
- **Consequences**: Dev setup instructions should reference Laragon.

---

## ADR-003: AI-Assisted Development
- **Date**: 2026-10-01
- **Status**: Accepted
- **Context**: Multiple AI tools (Antigravity, ChatGPT) are used during development.
- **Decision**: Document AI handoff context in `AI_HANDOFF.md` to maintain continuity between sessions.
- **Rationale**: Prevents context loss and duplicated work when switching between AI assistants.
- **Consequences**: Team must update `AI_HANDOFF.md` after significant AI-assisted sessions.

---

## ADR-004: Platform Scope — Discovery, Proposals & Agreement Confirmation In; Payment & Fulfillment Out
- **Date**: 2026-10-08 (revised 2026-10-08)
- **Status**: Accepted
- **Context**: The MVP buyer journey goes from searching supply → reviewing production context → contacting the farmer and/or submitting a Purchase Proposal → agreeing on basic terms → both parties confirming a Procurement Agreement.
- **Decision**: MEKAGREEN supports supply discovery, Purchase Proposals and two-party Procurement Agreement confirmation inside the platform. Payment, logistics, invoicing and physical fulfillment occur outside the platform in the MVP.
- **Rationale**: Keeps the MVP focused on matching, transparency and a shared record of commitment. Avoids payment/financial licensing and logistics complexity.
- **Consequences**: No payment, shipping or invoice entities in the MVP. Payment terms are captured only as free-text notes. Purchase Proposal and Procurement Agreement **are** platform features.

---

## ADR-005: Procurement Agreement = Platform Confirmation Record, Not an E-Signature
- **Date**: 2026-10-08
- **Status**: Accepted
- **Context**: Buyers and farmers need a shared, trusted record of agreed terms, but the MVP will not integrate a licensed digital-signature / e-contract provider.
- **Decision**: Implement a basic two-party agreement. Both parties confirm the same terms version inside MEKAGREEN and the system stores an immutable snapshot. It is presented **only** as a record of mutual confirmation on the platform.
- **Rationale**: Gives users a useful record without making legal claims the platform cannot back.
- **Consequences**: UI and content must follow BR-047 / BR-048 (UI term "Thỏa thuận thu mua"; no "chữ ký số" / "hợp đồng điện tử có giá trị pháp lý" wording; disclaimer always shown). A licensed e-signature provider may be integrated later through a new ADR.

---

## ADR-006: Production Area Location = Point Only (MVP)
- **Date**: 2026-10-08
- **Status**: Accepted
- **Context**: Production areas must appear on the agricultural map. Polygon boundaries add GIS complexity that a 2-month MVP cannot absorb.
- **Decision**: A ProductionArea has a single point location (latitude, longitude) picked by the Farmer on the map. Area size is entered manually.
- **Rationale**: Enough for discovery and map search. Simple for farmers to enter.
- **Consequences**: Polygon / GeoJSON, MySQL Spatial, boundary drawing and automatic area calculation are future work. Missing coordinates must never be shown as an exact location (BR-033a, label "Vị trí gần đúng").

---

## ADR-007: Cooperative Is an Account Type, Not an Auth Role
- **Date**: 2026-10-08
- **Status**: Accepted
- **Context**: Both individual farmers and cooperatives (HTX) publish supply.
- **Decision**: Keep auth roles `FARMER`, `BUYER`, `ADMIN`. A `FARMER` has `accountType` = `INDIVIDUAL` | `COOPERATIVE`.
- **Rationale**: Both types have the same MVP capabilities, so a separate role would duplicate permissions and screens.
- **Consequences**: Cooperative member management is deferred. The UI may show the account type as a profile badge.

---

## ADR-008: Procurement Lifecycle — Soft Reserve, Two-Step Confirmation & Non-Fixed Expiration
- **Date**: 2026-10-08
- **Status**: Accepted
- **Context**: Resolving concurrency and business edge cases for the procurement lifecycle: multiple buyers proposing for the same listing, ensuring explicit confirmation by both parties, and proposal validity.
- **Decision**: 
  1. **Soft Reserve (1A) & Unconfirmed Agreement Cancellation**:
     - A proposal in `PENDING` does not hold quantity.
     - When the Farmer accepts a proposal, quantity is held in `reservedQuantity`, instantly reducing `availableQuantity = expectedQuantity - committedQuantity - reservedQuantity`.
     - **5 Database States & Derived UX Display State**: Keep strictly 5 core Database States for `HarvestListing` (`AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED`) to prevent database schema pollution. When `availableQuantity == 0` but `committedQuantity < expectedQuantity` (due to `reservedQuantity > 0`), the database status remains `AVAILABLE` or `PARTIALLY_COMMITTED`, while the frontend/API dynamically computes and renders a **Derived UX Display State ("Tạm hết sản lượng khả dụng")** with a clear explanation badge ("Đang giữ chỗ chờ các bên xác nhận"). `FULLY_COMMITTED` is only set in DB when `committedQuantity == expectedQuantity`.
     - Upon mutual confirmation, quantity moves from `reservedQuantity` to `committedQuantity`.
     - **Approved Cancellation Rules (PENDING_CONFIRMATION)**:
       - Either Farmer or Buyer can cancel an agreement while in `PENDING_CONFIRMATION`, even if one party already confirmed (e.g. Farmer confirmed but Buyer cancels, or vice versa).
       - Cancellation sets status to `CANCELLED` and releases `reservedQuantity` back to `availableQuantity` exactly once via an atomic Database Transaction.
       - Cancellation audit trail (`cancelledBy`, `cancellationReason`, `cancelledAt`) is recorded while preserving previous confirmation timestamps (`farmerConfirmedAt`, `buyerConfirmedAt`).
       - Strictly no cancellation of `CONFIRMED` agreements via this mechanism (post-confirmation dispute is out of MVP scope).
       - Released inventory only updates active listings (`AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`). If the listing is already `CLOSED` or `CANCELLED`, the reserve is cleared on the ledger but the listing status **remains strictly `CLOSED` or `CANCELLED`**, never auto-reopened.
     - **Atomic Concurrency (Confirm vs Cancel Race Condition)**: Pessimistic row locking (`SELECT ... FOR UPDATE`) guarantees serialization. If Buyer confirms at the exact millisecond Farmer cancels, only the transaction acquiring the lock first succeeds; the second transaction fails condition checks (`status == PENDING_CONFIRMATION`) and is aborted with HTTP 409 Conflict.
  2. **Two Distinct Confirmation Steps (2A)**: Accepting a proposal (`T-17`) only sets proposal status to `ACCEPTED` and initializes a `ProcurementAgreement` record (`T-19`). The Farmer does NOT automatically confirm the agreement; both Farmer and Buyer must independently review the immutable terms snapshot and explicitly trigger `[Xác nhận thỏa thuận]` (`farmerConfirmedAt`, `buyerConfirmedAt`). Only when both have confirmed does it become `CONFIRMED`.
  3. **Non-Premature Proposal Expiration (3A Refined)**:
     - In the MVP, proposals do NOT auto-expire based on a fixed day count. Buyer can withdraw (`WITHDRAWN`), Farmer can reject (`REJECTED`).
     - A proposal in `PENDING` only permanently transitions to `EXPIRED` when: (1) listing is closed (`CLOSED`), (2) listing is cancelled (`CANCELLED`), or (3) true remaining listing capacity is insufficient even if all soft reserves are released: `expectedQuantity - committedQuantity < proposedQuantity`. Expired proposals are never auto-restored.
     - **Temporary capacity shortage due to active reserves**: When `availableQuantity < proposedQuantity <= expectedQuantity - committedQuantity`, the proposal remains in `PENDING` with the accept button disabled and a visual notice. If the active reserve agreement is cancelled, the accept button re-enables; if confirmed and remaining capacity becomes truly insufficient, the proposal permanently becomes `EXPIRED`.
- **Rationale**: Prevents overcommitment while allowing competitive discovery; prevents premature killing of proposals when capacity is only temporarily soft-reserved; prevents accidental contractual obligations by making confirmation explicit and deliberate; eliminates background worker complexity in MVP while keeping parties empowered to cancel uncompleted agreements cleanly and safely.
- **Consequences**: Data model must support `reservedQuantity`, cancellation audit columns, and preservation of prior confirmation timestamps; UI must present clear waiting/disabled states without destroying pending proposals; listing transitions must enforce idempotency and never reopen closed listings.

---

## ADR-009: GPS Privacy Default and Off-Platform Precise Location Exchange
- **Date**: 2026-10-08
- **Status**: Accepted
- **Context**: Protection of farm/production area location privacy. Exact coordinates can be sensitive for farmers, while public marketplace and map views need to display general supply areas without compromising farmer security or fabricating false locations.
- **Decision**:
  1. Exact `ProductionArea` coordinates are private by default (`isGpsPublic = false`).
  2. Public marketplace and agricultural map views display approximate location only, labelled with the UI badge "Vị trí gần đúng".
  3. Exact coordinates are public only if the Farmer explicitly opts in.
  4. Exact GPS coordinates must NOT be automatically revealed after `ProcurementAgreement = CONFIRMED`.
  5. When exact GPS is private, Farmer and Buyer exchange the precise pickup location outside MEKAGREEN through direct communication (phone / Zalo / Facebook).
  6. If no exact GPS coordinates exist, do NOT fabricate a marker; display administrative location text only.
  7. MVP remains point-based only (latitude, longitude); no polygon, GeoJSON, or MySQL Spatial.
- **Rationale**: Balances transparency and farmer privacy without introducing complex spatial access control mechanisms or misleading location representations.
- **Consequences**: `ProductionArea` data model supports `isGpsPublic` boolean (default `false`); map UI strictly respects privacy flag and does not auto-disclose coordinates upon agreement confirmation.

---

## ADR-010: Database Architecture, Relational Schema (14 Tables) & PO Decisions (PO-001 to PO-004)
- **Date**: 2026-10-14
- **Status**: Accepted (Approved by Product Owner)
- **Context**: Architecture audit and database schema finalization needed for the relational database model, authentication identifiers, admin moderation independence, listing closure integrity with active reserves, and QR traceability anchoring.
- **Decision**:
  1. **PO-001 Phone-Centric Registration**: Phone number (`phone`) is the required, unique identifier for account registration. Email is optional (`nullable`, unique if provided). No claim of phone verification on the platform in MVP until an SMS OTP gateway is integrated.
  2. **PO-002 Independent Admin Moderation**: Add an independent `moderation_status` (`APPROVED`, `FLAGGED`, `HIDDEN`) to `harvest_listings`. Admin moderation never overwrites the 5 locked business states (`AVAILABLE`, `PARTIALLY_COMMITTED`, `FULLY_COMMITTED`, `CLOSED`, `CANCELLED`) and never modifies confirmed agreements. Public marketplace and map queries filter by `status IN ('AVAILABLE', 'PARTIALLY_COMMITTED') AND moderation_status = 'APPROVED'`.
  3. **PO-003 Listing Closure Constraint with Active Reserves**: Prevent closing (`CLOSED`) or cancelling (`CANCELLED`) a harvest listing while any related procurement agreement is `PENDING_CONFIRMATION`. Farmers or buyers must explicitly cancel unconfirmed agreements according to BR-046a (releasing soft reserves) or wait for confirmation before the listing can be closed.
  4. **PO-004 QR Traceability Anchoring**: Each `harvest_listing` has a unique, non-sequential `trace_code` used by the public QR traceability page `T-04` (`/trace/:trace_code`). No separate `harvest_batches` table in MVP; traceability reads directly through the linked `crop_seasons`, `production_areas`, and `farming_logs`.
  5. **14 Normalized Tables**: Exactly 14 tables in schema: `users`, `farmer_profiles`, `buyer_profiles`, `administrative_units`, `production_areas`, `production_area_documents`, `crop_seasons`, `farming_logs`, `farming_log_photos`, `harvest_listings`, `purchase_proposals`, `procurement_agreements`, `contact_access_logs`, `moderation_logs`.
  6. **Fixed Lock Ordering & Concurrency**: Strict lock hierarchy: `harvest_listings` $\rightarrow$ `procurement_agreements` $\rightarrow$ `purchase_proposals` using pessimistic `SELECT ... FOR UPDATE` and retry loop `DB::transaction(fn, 3)`. Quantity invariants enforced with defense-in-depth at both DB (`CHECK`, `STORED GENERATED`) and application service layer.
  7. **Foreign Key Integrity**: `ON DELETE RESTRICT` for agreements, proposals, listings, and production areas to prevent accidental deletion of transaction history and audit trails.
  8. **Authenticated BUYER-Only Contact Access & Guest Privacy**: Only authenticated `BUYER` accounts may access farmer contact information on other users' listings, without requiring a purchase proposal. Listing owners may view their own contact information. Public/guest API responses must never expose phone/Zalo or private GPS.
  9. **MySQL >= 8.0.16 Requirement & Defense-in-Depth**: Require MySQL >= 8.0.16 for the MVP to guarantee database-level enforcement of `CHECK` constraints and `STORED GENERATED` columns. Business invariants and quantity conservation must be enforced in Laravel service layer as well as database constraints.
  10. **Phone-Only Account Recovery Limitations**: For phone-only registration without SMS OTP gateway or verified email, automated self-service password recovery is unavailable in MVP. Do not invent an unverified manual password recovery process through Admin.
  11. **Flexible Text-Based Price Snapshots**: Keep flexible text-based prices (`VARCHAR`) for MVP to reflect agricultural reality (reference price, proposed price, agreed price). Preserve identical price and terms snapshots for dual-confirmed agreements. Numeric price filtering is deferred.
- **Rationale**: Reconciles the database design with locked UI forms and Vietnamese agricultural business realities; guarantees data integrity, mathematical preservation of inventory, and tamper-proof audit trails.
- **Consequences**: `ERD.md` is locked as canonical specification for Laravel migrations; Laravel `ProcurementService` must enforce lock hierarchy and defense-in-depth quantity validation. MySQL environment must be 8.0.16 or higher.

---

> _Last updated: 2026-10-14_

