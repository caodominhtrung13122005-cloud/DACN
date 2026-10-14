# 🤖 AI Handoff Context — MEKAGREEN

## Purpose
This document ensures continuity when switching between AI assistants (Antigravity, ChatGPT, etc.) or starting new sessions. Update this after every significant AI-assisted work session.

---

## Current State of the Project
- **Date**: 2026-10-08
- **Phase**: Phase 9 — High-Fidelity Prototype + UI Lock: APPROVED & LOCKED. Ready for Technical Planning & Implementation.
- **What was done**:
  - Authored and locked official `docs/HIGH_FIDELITY_UI.md` (33 priority screens) and `docs/UI_LOCK.md` (12-dimension UI lock).
  - Product Owner reviewed and approved Phase 9 with 9 specific scope corrections applied:
    1. Mobile contact bar on T-03: Secondary "Gọi / Zalo", Primary "Gửi đề nghị thu mua", direct contact always available without requiring proposal first.
    2. Agreement cancellation UX: audit trail with required reason, optional note, cancelledBy, cancelledAt; no dispute workflow.
    3. Removed saved filter/search/watchlist features: T-02 Buyer is strictly session-only search & filter.
    4. Traceability QR: T-04 is a public web page accessed via URL/QR link; no in-app camera/QR scanner feature.
    5. Admin dashboard: compact operational summaries (Bài đăng cần xử lý, Giấy tờ cần rà soát, Tài khoản cần xem xét), no decorative KPI tiles.
    6. Admin listing moderation: neutral moderation process (view details, review content, hide/restore, view status), removed automated anomaly detection.
    7. Admin production area review: view production areas, review admin data and coordinates; removed dispute workflow.
    8. Buyer profile: mandatory fields limited to basic identity/contact (Tên, SĐT, Địa chỉ); extended fields marked optional, no new mandatory business data.
    9. Crop season terminology: replaced orchard-specific "Ngày cắt trái" with generic "Thời gian thu hoạch dự kiến" / "Ngày bắt đầu thu hoạch dự kiến".
  - Embedded binding rule: "Any UI/UX change after this lock requires explicit Product Owner approval."
  - Synchronized status across `docs/TODO.md`, `docs/UIUX_PLANNING_PROMPT.md`, `docs/PROJECT_CONTEXT.md`.
  - Strictly paused at Phase 9 completion gate awaiting execution command for technical phase.

## What Has NOT Been Done Yet
- [ ] Technical Architecture / Database Setup (ERD finalization, migrations)
- [ ] Backend (Laravel) scaffolding & API implementation
- [ ] Frontend (React + Vite) scaffolding & component implementation
- [ ] Testing & Deployment
- [ ] `.gitignore`, `README.md` at root level
- [ ] GitHub repo creation & first push
- [ ] CI/CD pipeline setup
- [ ] Environment variable configuration (`.env`)

## Session Log
- **2026-10-08**: Defined the MVP buyer journey (search → filter → list/map → supply detail with production context → off-platform contact and/or purchase proposal → two-party confirmed procurement agreement). Updated `PRODUCT_PLAN.md`, `BUSINESS_RULES.md` (BR-030 – BR-049), `DECISIONS.md` (ADR-004, ADR-005), `TODO.md`. ERD not yet designed.
- **2026-10-08 (session 2)**: Recorded confirmed decisions D1–D5. Created canonical `docs/UIUX_PLANNING_PROMPT.md`, updated `PROJECT_CONTEXT.md`, and resolved document contradictions across all planning files.
- **2026-10-08 (session 3)**: User approved UI/UX direction. Completed step 3 **References** (`docs/research/UIUX_REFERENCES.md`).
- **2026-10-08 (session 4)**: User approved References with 3 adjustments (commitment terminology, flexible split ratio, aspirational log time). Updated `docs/research/UIUX_REFERENCES.md`. Completed step 4 **Information Architecture** per UIUX_PLANNING_PROMPT: created canonical `docs/INFORMATION_ARCHITECTURE.md` with exact 23-page template inventory, navigation structure for 4 roles, public vs gated access, shared templates, and scope safeguards.
- **2026-10-08 (session 5)**: User selected Option 2 (Full-Bleed Panoramic Immersive) for Home Hero Banner (`T-01`) with 6 adjustments. Updated `UIUX_REFERENCES.md`, `INFORMATION_ARCHITECTURE.md`, `UIUX_PLANNING_PROMPT.md`, `TODO.md`.
- **2026-10-08 (session 6)**: User approved Information Architecture. Completed step 5 **User Flows** per UIUX_PLANNING_PROMPT: created canonical `docs/USER_FLOWS.md` detailing 4 roles (Guest, Farmer, Buyer, Admin) with Mermaid flowcharts, Mermaid sequence diagram for core procurement flow, edge case handling, and complete state/permission matrices.
- **2026-10-08 (session 7)**: User decided on 3 core procurement business rules: **1A Soft Reserve**, **2A Two Distinct Steps**, and **3A Non-Fixed Expiration**. Synchronized across planning files.
- **2026-10-08 (session 8)**: User approved unconfirmed agreement cancellation mechanism with 6 constraints. Refined Rule 3A to avoid premature expiration.
- **2026-10-08 (session 9)**: User officially approved Step 5 – User Flows. Commenced Step 6 – Low-fidelity Wireframes.
- **2026-10-08 (session 10)**: Completed Step 6 **Low-fidelity Wireframes** in `docs/WIREFRAMES.md` incorporating all 8 user refinements.
- **2026-10-08 (session 11)**: Created `UX_REVIEW.md` prematurely without Phase 6 approval.
- **2026-10-08 (session 12)**: Created `DESIGN_SYSTEM.md` prematurely without Phase 6/7 approval; TODO briefly falsely marked UX Review approved.
- **2026-10-08 (session 13)**: Conducted review for Step 6 Wireframes (Gemini), proposed BR-033b with automatic GPS disclosure on CONFIRMED, and introduced draft files prematurely into canonical docs.
- **2026-10-08 (session 14)**: Phase 6 Cleanup & Alignment (Safe Mode). User approved final GPS privacy rule (explicitly removing automatic GPS disclosure on CONFIRMED; off-platform pickup exchange; approximate location labelled "Vị trí gần đúng"; point coordinates only; no fabricated markers). Moved premature files `UX_REVIEW.md` and `DESIGN_SYSTEM.md` to `docs/drafts/` with explicit `STATUS: DRAFT – NOT APPROVED` banner. Fixed duplicated footer and lines in `T-01`. Removed unapproved mobile bottom navigation. Updated verified administrative names (NQ 202/2025/QH15, NQ 1663, NQ 1687: Xã An Hữu, Xã Mỹ Đức Tây, Xã Chợ Lách). Corrected `availableQuantity` formula in `PROJECT_CONTEXT.md`. Synchronized rules across `BUSINESS_RULES.md`, `PRODUCT_PLAN.md`, `DECISIONS.md` (ADR-009), `USER_FLOWS.md`, `INFORMATION_ARCHITECTURE.md`, `UIUX_PLANNING_PROMPT.md`, `research/UIUX_REFERENCES.md`, and `research/FARMING_VN_REFERENCE.md`. Strictly paused at Phase 6 completion gate awaiting final approval.
- **2026-10-08 (session 15)**: User approved and locked Phase 6 (Low-fidelity Wireframes). Commenced Phase 7 (UX Review). Conducted rigorous independent evaluation of approved wireframes and authored official `docs/UX_REVIEW.md` containing all 16 sections. Documented prioritized issues (ISS-01 to ISS-06), small corrections, accessibility risks, and 2 PO approval items. Strictly paused at Phase 7 gate.
- **2026-10-08 (session 16)**: Product Owner approved Phase 7 UX Review with 8 concrete decisions. Synchronized `docs/UX_REVIEW.md` with locked decisions. Phase 7 officially APPROVED & LOCKED. Phase 8 (Design System) is authorized as next phase, strictly paused awaiting execution command.
- **2026-10-08 (session 17)**: Started and completed Phase 8 (Design System). Authored official `docs/DESIGN_SYSTEM.md` with 30 sections, verified WCAG 2.1 AA contrast values, restrained radii, compact 8px spacing, Manrope/Inter typography, operational card/table tokens, and anti-AI aesthetic guidelines. Status set to `IN REVIEW`, strictly paused awaiting Product Owner review.
- **2026-10-08 (session 18)**: Product Owner reviewed and approved Phase 8 Design System with final decisions (Reference price: `"Giá tham khảo: Liên hệ / Thỏa thuận"`; Mobile quantity: explicit text `"Còn lại: 4 tấn (40%)"`; Dark Green: removed payment wording; Brand palette, WCAG rules, Typography, Spacing, Anti-AI approved). Updated `docs/DESIGN_SYSTEM.md`. Synchronized `docs/TODO.md`, `docs/UIUX_PLANNING_PROMPT.md`, `docs/PROJECT_CONTEXT.md`. Phase 8 officially APPROVED & LOCKED. Next authorized phase: Phase 9 (High-fidelity Prototype + UI Lock), strictly paused awaiting execution command.
- **2026-10-08 (session 19)**: Commenced Phase 9 (High-Fidelity Prototype + UI Lock). Authored official `docs/HIGH_FIDELITY_UI.md` detailing 33 priority screens across Public, Farmer, Buyer, Admin with operational hierarchy, responsive behavior, special states (Soft Reserve, Cancelled Agreement audit trail, Dirty Form Guard), and strict anti-AI constraints. Authored official `docs/UI_LOCK.md` summarizing the proposed UI/UX lock across all design dimensions. Synchronized status across `docs/TODO.md`, `docs/UIUX_PLANNING_PROMPT.md`, `docs/PROJECT_CONTEXT.md` to `PHASE 9 — HIGH-FIDELITY PROTOTYPE + UI LOCK: IN REVIEW`. Strictly paused awaiting Product Owner review.
- **2026-10-08 (session 20)**: Product Owner conducted final review of Phase 9 and approved with 9 scope corrections (T-03 mobile contact bar, agreement cancellation audit trail without dispute flow, removed saved filters/searches, T-04 traceability as web page without in-app QR scanner, admin dashboard compact summaries without KPI cards, neutral admin moderation without AI anomaly detection, production area review without dispute flow, buyer profile extended fields marked optional, universal crop season harvest terminology). Updated `docs/HIGH_FIDELITY_UI.md` and `docs/UI_LOCK.md`. Synchronized status across all metadata files to `PHASE 9 — HIGH-FIDELITY PROTOTYPE + UI LOCK: APPROVED & LOCKED`. Strictly paused awaiting technical implementation instructions.

## Key Decisions Made
- See [DECISIONS.md](./DECISIONS.md) for full list (ADR-001 through ADR-009).
- Monorepo structure: `frontend/` + `backend/` + `docs/`
- Laragon for local dev environment
- AI handoff documentation maintained for session continuity
- No payment / logistics / invoicing / legal e-signature in MVP (ADR-004)
- Procurement agreement is a platform confirmation record, **never** presented as a legal e-signature (ADR-005, BR-047, BR-048)
- Soft Reserve (1A), Two Distinct Steps (2A), Non-Premature Proposal Expiration (3A), Unconfirmed Agreement Cancellation (ADR-006)
- GPS Privacy Default: Private by default, "Vị trí gần đúng" badge, no auto-reveal after CONFIRMED, off-platform pickup exchange (ADR-009, BR-033b)

## Important Constraints
- **Do NOT recreate** existing `frontend/` or `backend/` folders.
- **Do NOT reinstall** dependencies unless something is confirmed broken.
- **Preserve** existing project structure at all times.
- **Do NOT start Phase 8 (Design System)** until Phase 7 is explicitly approved.

## Files & Folders Overview
```
MEKAGREEN/
├── frontend/    # React + Vite (empty — awaiting scaffolding)
├── backend/     # Laravel API (empty — awaiting scaffolding)
└── docs/
    ├── drafts/  # Premature drafts (NOT approved)
    │   ├── UX_REVIEW.md
    │   └── DESIGN_SYSTEM.md
    ├── research/
    │   ├── UIUX_REFERENCES.md
    │   └── FARMING_VN_REFERENCE.md
    ├── PROJECT_CONTEXT.md
    ├── PRODUCT_PLAN.md
    ├── BUSINESS_RULES.md
    ├── ERD.md (ON HOLD)
    ├── DECISIONS.md
    ├── INFORMATION_ARCHITECTURE.md
    ├── USER_FLOWS.md
    ├── WIREFRAMES.md (Phase 6 — Approved & Locked)
    ├── UX_REVIEW.md (Phase 7 — Official report, awaiting approval)
    ├── UIUX_PLANNING_PROMPT.md
    ├── AI_HANDOFF.md      ← You are here
    └── TODO.md
```

## How to Use This File
1. **Before starting work**: Read this file to understand current state.
2. **After finishing work**: Update the "Current State" and "What Has NOT Been Done Yet" sections.
3. **When switching AI tools**: Copy this file's contents into the new AI's context.

---
> _Last updated: 2026-10-08_
