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

<!-- Template for new decisions:
## ADR-XXX: [Title]
- **Date**: YYYY-MM-DD
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: [What is the situation?]
- **Decision**: [What was decided?]
- **Rationale**: [Why?]
- **Consequences**: [What are the trade-offs?]
-->

> _Last updated: 2026-10-01_
