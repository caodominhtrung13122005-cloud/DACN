# 📋 Project Context — MEKAGREEN

## Overview
**MEKAGREEN** is a digital agricultural platform that helps connect **agricultural producers** (individual farmers / households and cooperatives)
with **traders, intermediaries, purchasing companies, processors, wholesalers and other agricultural buyers**.

| Item | Value |
|------|-------|
| Project name | MEKAGREEN |
| Project type | 2-month university specialization project |
| Current phase | **Phase 9 — High-Fidelity Prototype + UI Lock: APPROVED & LOCKED** ([docs/HIGH_FIDELITY_UI.md](./HIGH_FIDELITY_UI.md), [docs/UI_LOCK.md](./UI_LOCK.md)) |
| Geographical MVP scope | **Southern Vietnam**: Southeast (Đông Nam Bộ) and Mekong Delta (Đồng bằng sông Cửu Long) |
| Future scope | Architecture must stay expandable to all of Vietnam |
| UI/UX source of truth | [UIUX_PLANNING_PROMPT.md](./UIUX_PLANNING_PROMPT.md) |

## Product Pillars

### 1. Digital Production Record
- Production Area (Vùng sản xuất)
- Crop Season (Mùa vụ)
- Farming Log (Nhật ký canh tác)
- Agricultural documents / certifications (stored and displayed as **submitted** information, not certified by MEKAGREEN)

### 2. Expected Harvest Marketplace
- Farmers publish expected harvest supply **before harvest** (recommended about 15–30 days before; a recommendation, not a hard rule)
- Buyers discover supply early
- Search, filters, marketplace and the agricultural map support discovery

### 3. Procurement Commitment
- A Buyer may submit a Purchase Proposal (Đề nghị thu mua)
- Farmer and Buyer agree on basic procurement terms
- Both parties confirm a Procurement Agreement (Thỏa thuận thu mua) inside MEKAGREEN
- MEKAGREEN stores the confirmation history for reference and accountability

## Core Product Flow (MVP)
```
Production Area
→ Crop Season
→ Farming Log
→ Expected Harvest Listing
→ Marketplace / Agricultural Map
→ Buyer discovers supply
→ External Contact (phone / Zalo / Facebook) and/or Purchase Proposal
→ Procurement Agreement
→ Both Parties Confirm
→ Traceability
```

## What the MVP Does NOT Handle
- Payment
- Invoicing
- Physical logistics / shipping / fulfillment
- Legally qualified digital signatures

These happen **outside** MEKAGREEN in the MVP. Supply discovery, Purchase Proposals and two-party Procurement Agreement confirmation happen **inside** the platform (ADR-004).

> ⚠️ The Procurement Agreement is **"Thỏa thuận thu mua được hai bên xác nhận trên hệ thống"**.
> It must **NOT** be described or marketed as a legally qualified digital signature or a legally certified electronic contract
> ("Hợp đồng điện tử có giá trị pháp lý"), unless a legally compliant digital-signature service is integrated in the future.

## User Model
| Auth Role | Description |
|-----------|-------------|
| `FARMER` | Supply side. `accountType` = `INDIVIDUAL` (farmer / household) or `COOPERATIVE` (HTX). **Cooperative is NOT a separate role.** |
| `BUYER` | Demand side. Business profile may be: individual trader, agricultural intermediary, purchasing company, wholesaler, processor, exporter, cooperative buyer, agricultural purchasing unit. **These are business profiles, not separate auth roles.** |
| `ADMIN` | Platform operator: moderation, document review, reference data. **Not** a legal certification authority. |

## Key Confirmed Product Rules (summary)
- **Contact visibility**: direct farmer contact (phone, Zalo, Facebook, other links) requires login. Guests can see listings, production information and general location.
- **Multiple buyers per listing**: `availableQuantity = expectedQuantity − committedQuantity − reservedQuantity`. Confirmed commitments and active reservations never exceed the expected quantity.
- **Map & GPS Privacy**: ProductionArea uses a **point** (latitude, longitude). No polygons in MVP. Exact coordinates are private by default; public marketplace/map views show approximate location labelled **"Vị trí gần đúng"**. Exact coordinates are only public if the farmer explicitly opts in. Do not automatically reveal exact coordinates after CONFIRMED (precise pickup location is exchanged outside MEKAGREEN via phone/Zalo/Facebook). If no exact GPS exists, show administrative text only (never fabricate a marker).
- **Farming.vn** is a **functional reference only**, never the blueprint (see [research/FARMING_VN_REFERENCE.md](./research/FARMING_VN_REFERENCE.md)).

Full rules: [BUSINESS_RULES.md](./BUSINESS_RULES.md) · Decisions: [DECISIONS.md](./DECISIONS.md) · Plan: [PRODUCT_PLAN.md](./PRODUCT_PLAN.md)

## Tech Stack
| Layer       | Technology              |
|-------------|-------------------------|
| Frontend    | React + Vite            |
| Backend     | Laravel (PHP)           |
| Database    | MySQL (via Laragon)     |
| Dev Server  | Laragon (localhost)     |
| Hosting     | TBD                     |

## Repository Structure
```
MEKAGREEN/
├── frontend/    # React + Vite application (not yet scaffolded)
├── backend/     # Laravel API application (not yet scaffolded)
└── docs/        # Project documentation
```

## Development Environment
- **Local Server**: Laragon (Windows)
- **Node.js**: Required for frontend
- **PHP/Composer**: Required for backend
- **Database**: MySQL via Laragon

## Team & Collaboration
- Repository is prepared for GitHub collaboration.
- AI assistants (Antigravity, ChatGPT, etc.) may be used during development — see `AI_HANDOFF.md`.
- UI/UX work by any AI session must follow [UIUX_PLANNING_PROMPT.md](./UIUX_PLANNING_PROMPT.md).

---
> _Last updated: 2026-10-08_
