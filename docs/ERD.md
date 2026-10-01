# 🗄️ Entity Relationship Diagram — MEKAGREEN

## Overview
This document describes the database schema and entity relationships for the MEKAGREEN platform.

## ER Diagram

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email UK
        string password
        string role
        timestamp email_verified_at
        timestamp created_at
        timestamp updated_at
    }

    %% Add more entities as the schema evolves
    %% Example:
    %% PRODUCTS {
    %%     int id PK
    %%     string name
    %%     text description
    %%     decimal price
    %%     int user_id FK
    %%     timestamp created_at
    %%     timestamp updated_at
    %% }
    %%
    %% USERS ||--o{ PRODUCTS : "creates"
```

## Entity Descriptions

### Users
- Stores all registered users.
- `role` can be: `admin`, `user` (extend as needed).
- Email must be unique and verified.

### [Future Entities]
<!-- Add entity descriptions here as the schema grows -->

## Notes
- All tables follow Laravel conventions (auto-incrementing `id`, `created_at`, `updated_at`).
- Foreign keys are enforced at the database level.
- Update this document whenever a migration is created or modified.

---
> _Last updated: 2026-10-01_
