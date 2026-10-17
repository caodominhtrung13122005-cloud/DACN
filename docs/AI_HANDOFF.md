# 🤖 AI Handoff Context — MEKAGREEN

## Purpose
This document ensures continuity when switching between AI assistants (Antigravity, ChatGPT, etc.) or starting new sessions. Update this after every significant AI-assisted work session.

---

## Current State of the Project
- **Date**: 2026-10-17
- **Phase**: Phase S0.4 — Full Relational Database Schema (14 Tables) Completed, Migrated & Verified. Ready for Phase S1 (User Authentication API via Sanctum with Phone & SPA sessions).
- **What was done**:
  - Independent Technical Architecture Audit completed and documented.
  - Checkpoint commit `c1083d2` created and pushed to GitHub `main` branch preserving all UI/UX specs and React frontend code.
  - Phase S0.3: Laravel 10.50.3 project scaffolded, `.env` configured, MySQL `mekagreen` connected.
  - Phase S0.4A: Foundation migrations (`users`, `administrative_units`, `farmer_profiles`, `buyer_profiles`, `production_areas`) with PO-001 phone-centric auth and GPS privacy defaults.
  - Phase S0.4B: Crop seasons & farming logs migrations (`production_area_documents`, `crop_seasons`, `farming_logs`, `farming_log_photos`) with season dates validation and cascade protections.
  - Phase S0.4C1: Harvest listings migration (`harvest_listings`) with 4 quantity metrics, STORED GENERATED `available_quantity_kg`, PO-002 independent moderation, PO-004 QR `trace_code`.
  - Phase S0.4C2: Procurement completion migrations (`purchase_proposals`, `procurement_agreements`, `contact_access_logs`, `moderation_logs`) with 1:1 proposal-agreement enforcement, terms snapshot, dual independent confirmations, cancellation metadata, and audit logs.
  - Automated isolated testing: Dedicated `mekagreen_testing` database created, full regression test suite (35 tests, 67 assertions) passed 100%.

## What Has NOT Been Done Yet
- [ ] User model & Sanctum authentication API (Phase S1)
- [ ] Frontend API integration (connecting React to Laravel API)
- [ ] Farmer, Buyer, Admin portal implementations
- [ ] Production Deployment & CI/CD pipeline setup

## Session Log
- **2026-10-08**: Sessions 1–20 completed Phase 1 through Phase 9 (UI/UX lock, 23 templates, wireframes, UX review, design system, high-fidelity prototypes).
- **2026-10-14 (session 21)**: Performed comprehensive project progress audit and senior software architect review (Claude Opus). Identified key gaps: backend empty, mock data violating BR-053, OSM tile URL bug, uncommitted git state. Saved audit report in artifact.
- **2026-10-14 (session 22)**: Executed Phase S0.1 Git Safety Checkpoint. Staged all safe source files and locked specs, created commit `c1083d2` (`checkpoint: baseline locked UI/UX specs and scaffolded React frontend`), and pushed to GitHub `main` branch.
- **2026-10-14 (session 23)**: Executed Phase S0.2B Database ERD V1 Correction & Documentation Lock. Applied approved Product Owner decisions PO-001 through PO-004. Finalized and locked canonical `docs/ERD.md` with 14 normalized tables, invariants, transaction lock ordering, defense-in-depth, and privacy rules. Updated `docs/BUSINESS_RULES.md`, `docs/DECISIONS.md` (ADR-010), `docs/TODO.md`, and `docs/AI_HANDOFF.md`. Strictly paused at technical gate awaiting backend implementation command.
- **2026-10-14 (session 24)**: Executed S0.2 Final Check & S0.3 Environment Audit. Applied PO clarifications: Authenticated BUYER-only contact access (owners see own info, guest API never exposes phone/GPS); MySQL >= 8.0.16 mandatory with application-layer invariant checks; phone-only password recovery limitations; flexible text-based price snapshots (numeric filtering deferred). Completed read-only Laragon environment audit.
- **2026-10-17 (session 25)**: Executed Phase S0.3 (Laravel 10.50.3 foundation scaffolding, local Laragon config, `mekagreen` database connection) and full Phase S0.4 (S0.4A, S0.4B, S0.4C1, S0.4C2). Fully implemented all 14 canonical database tables per ERD V1 with strict MySQL 8.0.30 constraints, stored generated columns, and foreign keys. Configured isolated testing environment (`mekagreen_testing`) and built 35 comprehensive automated PHPUnit Feature Tests (100% pass). Standing by for Product Owner review.

## Key Decisions Made
- See [DECISIONS.md](./DECISIONS.md) for full list (ADR-001 through ADR-010).
- Monorepo structure: `frontend/` + `backend/` + `docs/`
- Laragon for local dev environment (PHP 8.1.10, MySQL 8.0.30, Composer 2.4.1 detected)
- AI handoff documentation maintained for session continuity
- No payment / logistics / invoicing / legal e-signature in MVP (ADR-004)
- Procurement agreement is a platform confirmation record, **never** presented as a legal e-signature (ADR-005, BR-047, BR-048)
- Soft Reserve (1A), Two Distinct Steps (2A), Non-Premature Proposal Expiration (3A), Unconfirmed Agreement Cancellation (ADR-008)
- GPS Privacy Default: Private by default, "Vị trí gần đúng" badge, no auto-reveal after CONFIRMED, off-platform pickup exchange (ADR-009, BR-033b)
- Database ERD V1: 14 normalized tables, PO-001 to PO-004, fixed lock ordering, defense-in-depth invariants, MySQL >= 8.0.16 (ADR-010)
- Authenticated BUYER-only contact access, Guest/Public API strict privacy protection (BR-037)
- Flexible text-based pricing snapshots preserved, numeric filtering deferred (ADR-010)

## Important Constraints
- **Do NOT recreate** existing `frontend/` or `backend/` folders.
- **Do NOT reinstall** dependencies unless something is confirmed broken.
- **Preserve** existing project structure at all times.
- **Strictly follow Scope Guard**: No payment, shipping, or legal e-signatures in MVP.

## Files & Folders Overview
```
MEKAGREEN/
├── frontend/    # React 18 + Vite + TypeScript + Tailwind (Scaffolded, running dev server)
├── backend/     # Laravel API (empty — awaiting Phase S1 scaffolding)
└── docs/
    ├── research/
    │   ├── UIUX_REFERENCES.md
    │   └── FARMING_VN_REFERENCE.md
    ├── PROJECT_CONTEXT.md
    ├── PRODUCT_PLAN.md
    ├── BUSINESS_RULES.md (Updated with PO-001 to PO-004)
    ├── ERD.md (Phase S0.2B: APPROVED & LOCKED — 14 Normalized Tables)
    ├── DECISIONS.md (ADR-001 through ADR-010)
    ├── INFORMATION_ARCHITECTURE.md (23-page template inventory)
    ├── USER_FLOWS.md (4 roles, soft reserve, lock hierarchy)
    ├── WIREFRAMES.md (Approved & Locked)
    ├── UX_REVIEW.md (Approved & Locked)
    ├── DESIGN_SYSTEM.md (Approved & Locked)
    ├── HIGH_FIDELITY_UI.md (Approved & Locked)
    ├── UI_LOCK.md (Approved & Locked)
    ├── UIUX_PLANNING_PROMPT.md
    ├── AI_HANDOFF.md      ← You are here
    └── TODO.md
```

## How to Use This File
1. **Before starting work**: Read this file to understand current state.
2. **After finishing work**: Update the "Current State" and "What Has NOT Been Done Yet" sections.
3. **When switching AI tools**: Copy this file's contents into the new AI's context.

---
> _Last updated: 2026-10-14 (Phase S0.2B Locked)_
