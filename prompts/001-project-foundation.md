# 001 · Project Foundation — CarryBee Auction Hub

## 1. Implementation Goal

Establish the complete **Project Foundation** for **CarryBee Auction Hub** strictly following `AGENTS.md` and `docs/SYSTEM_ARCHITECTURE.md`. 

This sets up:
1. The **NestJS modular monolith backend** (`api/`) with bootstrap, environment validation, health check, global exception filtering, CORS, request correlation, and domain module boundaries.
2. The **PostgreSQL + Prisma database foundation** (`api/prisma/schema.prisma`) modeling all core entities (`User`, `Employee`, `Role`, `Permission`, `RolePermission`, `AuctionCategory`, `AuctionItem`, `Auction`, `Bid`, `Payment`, `Settlement`, `Notification`, `AuditLog`, `Attachment`, `SystemSetting`) with required constraints and indexes.
3. The **Clerk authentication foundation** across frontend (Next.js provider & middleware) and backend (NestJS JWT validation guard & identity resolver).
4. The **Application-level RBAC foundation** with permission-based authorization (`@RequirePermissions(...)`), roles, and database-backed permission mapping.
5. The **Frontend data layer foundation** in Next.js (TanStack Query client, type-safe API client abstraction, Zod schemas, typed response handling, and clean UI adapters) **without altering the approved visual design of the Home page**.
6. The **Local development infrastructure** with Docker Compose (`infrastructure/docker/docker-compose.yml` for PostgreSQL 16, Redis 7, and MinIO) and documented `.env.example`.
7. **CI & Code Quality** scripts for root-orchestrated type checking, linting, testing, and building.

**Out of Scope for this Foundation Phase**:
- Live WebSocket bidding rooms and broadcasting (reserved for Realtime Auction phase).
- Concurrency-safe bid transaction engine (reserved for Auction Engine phase).
- Auction closing / anti-sniping dynamic extension engine (reserved for Auction Engine phase).
- Post-auction payment / settlement state machines and workflows.
- Full Admin Refine CRUD screens.

---

## 2. Repository Findings (Assessment)

### What Already Exists:
- **Frontend App**: Next.js 16.3.6 (App Router, React 19.2.8) located at root `src/`.
- **Design System & Tokens**: Tailwind CSS v4 in `src/app/globals.css` with `@theme` block defining CarryBee brand colors (`cb-yellow: #FFC107`, dark charcoal neutrals `#111827`, `#1F2937`, `#374151`, semantic status colors, and typography scale).
- **Approved Home Page**: `src/app/page.tsx` accurately replicating `design/Home.png` with:
  - `TopNav` (`src/components/layout/top-nav.tsx`): CarryBee logo, search input with Ctrl+K, Live Sync pill, notification bell, user profile pill (Arif Hossain EMP001).
  - `Sidebar` (`src/components/layout/sidebar.tsx`): Navigation with Dashboard, Live Auctions, Upcoming Auctions, My Bids, Won Auctions, Payments, Notifications, Profile, Help.
  - `HeroBanner` (`src/components/home/hero-banner.tsx`): Yellow banner with logistics graphics and metrics.
  - `CategoryBar` (`src/components/home/category-bar.tsx`): Category filter pills.
  - `LiveAuctionCard` (`src/components/home/live-auction-card.tsx`): 4 live auction cards with countdown timers.
  - `EndingSoonWidget` (`src/components/home/ending-soon-widget.tsx`): Urgency countdown widget.
  - `MyAuctionsTable` (`src/components/home/my-auctions-table.tsx`): User bidding summary with tabs.
  - `QuickStatsWidget` (`src/components/home/quick-stats-widget.tsx`): 2x2 grid of metrics and Important Notice banner.
  - Place Bid interactive modal dialog.
- **UI Component Library**: 13 reusable primitives in `src/components/ui/` (`alert`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `input`, `pagination`, `radio`, `select`, `switch`, `tabs`, `textarea`).
- **Brand Assets**: Official logo component (`src/components/brand/carrybee-logo.tsx`), official favicon (`src/app/favicon.ico`), sample auction images in `public/auction/`.

### What Can Be Reused:
- 100% of the UI components, layout, tokens, typography, brand assets, and page structure.
- Existing Next.js configuration and build pipeline.

### What Must Be Added:
- NestJS modular monolith in `api/` with its own `package.json`, `tsconfig.json`, `nest-cli.json`, modules, controllers, guards, and services.
- Prisma ORM setup in `api/prisma/` with comprehensive schema.
- Data fetching layer in Next.js: `@tanstack/react-query`, API client (`src/lib/api-client.ts`), and typed adapters.
- Form and validation tools: `zod`, `react-hook-form`, `@hookform/resolvers`.
- Authentication packages: `@clerk/nextjs` (web) and `@clerk/backend` / `jsonwebtoken` / `jwks-rsa` (api).
- Docker Compose configuration in `infrastructure/docker/docker-compose.yml`.
- `.env.example` in root and `api/.env.example`.
- Root orchestration scripts for linting, building, and running both web and api.

### What Must NOT Be Changed:
- Visual design, layout, spacing, typography, colors, cards, and interactions of the Home page.
- Do not replace the existing working Next.js structure by churning 50+ files into an unnecessary directory restructure.
- Do not fake operational metrics (such as fake replica lag or fake NTP telemetry).

---

## 3. Architecture Decisions

### Decision 1: Monorepo vs. Clean Sibling Separation (Smallest Safe Architectural Change)
- **Context**: `SYSTEM_ARCHITECTURE.md` describes an `apps/web` and `apps/api` monorepo baseline. However, the user explicitly instructed: *"DO NOT force a monorepo migration blindly... preserve existing working code... make the smallest safe architectural change... Do not move dozens of files simply for aesthetics."*
- **Decision**: Keep the existing Next.js web application at the root (`src/`), and place the NestJS backend modular monolith in `api/`. Add `packages/types/` (or shared contracts in `src/types/` and `api/src/types/`) with clear type synchronization.
- **Rationale**: Moving 50+ existing, tested Next.js files into `apps/web/` risks breaking imports, path aliases (`@/*`), public asset resolutions, and git tracking for pure aesthetics. By creating `api/` as a sibling workspace, both frontend and backend maintain isolated dependencies, tsconfig options (NestJS requires decorators and CommonJS/ESM specifics; Next.js uses React 19 Turbopack), and build targets, while root scripts (`npm run dev`, `npm run dev:api`, `npm run build:all`) orchestrate them seamlessly.

### Decision 2: Frontend Data Layer & Adapter Pattern
- **Decision**: Introduce TanStack Query (`QueryClientProvider`) wrapped in a client-side provider in `src/app/providers.tsx`. Provide an API client in `src/lib/api-client.ts` with typed methods.
- **Adapter Strategy**: Create typed adapters in `src/lib/adapters/dashboard-adapter.ts` that transform API DTO responses into the exact types expected by `LiveAuctionCard`, `MyAuctionsTable`, `EndingSoonWidget`, and `QuickStatsWidget`. When the backend returns data, the adapters format currency, timestamps, and status strings; if the API is offline or returns empty during development, the adapters safely provide fallback mock data so the Home page remains 100% pixel-perfect and testable at all times.

### Decision 3: Backend Modular Monolith Structure
- **Decision**: The NestJS application in `api/src/` will establish explicit module boundaries:
  - `core/`: Config, logging, global filters, middleware, health check.
  - `database/`: PrismaModule and PrismaService managing connection lifecycle.
  - `redis/`: RedisModule and RedisService for connection and caching.
  - `auth/`: Clerk authentication strategy and `@CurrentUser()` decorator.
  - `rbac/`: Permission enum, Roles enum, `@RequirePermissions(...)`, and `PermissionsGuard`.
  - Domain Module Stubs: `auction/`, `bid/`, `realtime/`, `finance/`, `notification/`, `audit/`, `files/`, `jobs/`, `reports/`. Each contains its foundational controller/service/DTO interfaces ready for subsequent phases.

---

## 4. Technology Decisions

| Layer | Approved Technology | Version / Specification |
| --- | --- | --- |
| **Frontend Framework** | Next.js (App Router) | 16.3.6 (Turbopack) |
| **Frontend UI / React** | React / React DOM | 19.2.8 |
| **Styling & Tokens** | Tailwind CSS v4 | `@tailwindcss/postcss ^4` |
| **Server State Management** | TanStack Query | `@tanstack/react-query ^5` |
| **Form Validation** | Zod + React Hook Form | `zod ^3`, `react-hook-form ^7` |
| **Frontend Auth** | Clerk Next.js SDK | `@clerk/nextjs ^6` |
| **Backend Framework** | NestJS | `@nestjs/core ^11`, `@nestjs/common ^11`, `@nestjs/platform-express ^11` |
| **Backend Runtime** | Node.js | v24 LTS |
| **Database ORM** | Prisma | `@prisma/client ^6`, `prisma ^6` |
| **Authoritative Datastore** | PostgreSQL | 16-Alpine |
| **Cache & Realtime Transport** | Redis / ioredis | Redis 7-Alpine / `ioredis ^5` |
| **Backend Auth Validation** | `@clerk/backend` & JWKS | Clerk Bearer Token verification |
| **Local Infrastructure** | Docker Compose | PostgreSQL 16, Redis 7, MinIO S3 |
| **Code Quality** | ESLint v9, TypeScript 5.8 | Strict type checking |

---

## 5. Files Expected to Change

- `package.json`: Add TanStack Query, Zod, React Hook Form, Clerk, and root orchestration scripts (`dev:api`, `build:api`, `lint:api`, `db:generate`, etc.).
- `src/app/layout.tsx`: Wrap children with `AppProviders` (TanStack Query provider, Clerk provider if configured).
- `src/app/page.tsx`: Wire adapters to consume query hooks while preserving existing layout and mock fallbacks.
- `.gitignore`: Add `.env`, `.env.local`, `api/dist`, `api/node_modules`, `api/.env`.

---

## 6. Files Expected to Be Created

### Frontend Foundation (`src/`):
- `src/app/providers.tsx`: Client component providing `QueryClientProvider` and `ClerkProvider`.
- `src/lib/api-client.ts`: Type-safe HTTP fetch client with base URL, headers (`x-request-id`, auth token), timeout, and error handling.
- `src/lib/adapters/dashboard-adapter.ts`: Pure mapping functions between API response contracts and Home page UI card types.
- `src/hooks/use-dashboard.ts`: TanStack Query hooks for `dashboard/summary`, `auctions?status=LIVE`, `auctions/ending-soon`, `me/bids`.
- `src/types/api.ts`: Shared API response contracts, error envelope types, and DTO interfaces.
- `src/middleware.ts`: Clerk route middleware configuration (protecting admin/dashboard routes, allowing public assets).

### Backend Foundation (`api/`):
- `api/package.json`: NestJS dependencies, scripts (`start:dev`, `build`, `test`, `prisma:generate`, `prisma:migrate`).
- `api/tsconfig.json` & `api/tsconfig.build.json`: NestJS TypeScript compiler configuration with experimental decorators.
- `api/nest-cli.json`: Nest CLI configuration.
- `api/src/main.ts`: Application bootstrap with `/api/v1` prefix, validation pipe, CORS, structured logger, and global filters.
- `api/src/app.module.ts`: Root module importing core, auth, rbac, database, redis, and domain stubs.
- `api/src/core/`:
  - `config/env.validation.ts`: Zod/class-validator schema for environment variables (`PORT`, `DATABASE_URL`, `REDIS_URL`, `CLERK_SECRET_KEY`, etc.).
  - `filters/http-exception.filter.ts`: RFC-7807 compatible global exception filter.
  - `middleware/request-id.middleware.ts`: Middleware attaching `x-request-id` to requests and responses.
  - `health/health.controller.ts` & `health.service.ts`: Readiness & liveness probe (`/api/v1/health`) checking database and redis.
- `api/src/database/`:
  - `prisma.service.ts`: PrismaClient lifecycle manager with connection handling and graceful shutdown.
  - `prisma.module.ts`: Global Prisma module.
- `api/src/redis/`:
  - `redis.service.ts`: Redis connection manager using `ioredis` with health ping.
  - `redis.module.ts`: Global Redis module.
- `api/src/auth/`:
  - `clerk-auth.guard.ts`: Guard verifying Clerk session tokens.
  - `current-user.decorator.ts`: Param decorator extracting the resolved authenticated employee/user.
  - `auth.module.ts`: Auth module.
- `api/src/rbac/`:
  - `roles.enum.ts`: `SUPER_ADMIN`, `AUCTION_ADMIN`, `AUCTION_MANAGER`, `FINANCE`, `AUDITOR`, `EMPLOYEE`.
  - `permissions.enum.ts`: Granular permissions (`auction:view`, `auction:create`, `bid:create`, etc.).
  - `require-permissions.decorator.ts`: Decorator defining required permissions on endpoints.
  - `permissions.guard.ts`: Guard enforcing user permissions against database roles.
  - `rbac.module.ts`: RBAC module.
- `api/src/domain/`:
  - Domain module stubs (`auction/`, `bid/`, `realtime/`, `finance/`, `notification/`, `audit/`, `files/`, `jobs/`, `reports/`) with module definitions, controller stubs, and interfaces.
- `api/prisma/schema.prisma`: Comprehensive Prisma schema modeling all 14 core entities.
- `api/prisma/seed.ts`: Seed script provisioning default roles, permissions, and role-permission associations.

### Infrastructure & Configuration:
- `infrastructure/docker/docker-compose.yml`: Local Docker Compose for PostgreSQL 16, Redis 7, MinIO.
- `.env.example`: Root template separating CLIENT-SAFE and SERVER-ONLY variables.
- `api/.env.example`: Backend specific environment template.

---

## 7. Environment Variables Strategy

### Client-Safe Variables (`.env.local` for Next.js):
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder_key
```

### Server-Only Secrets (`api/.env` for NestJS):
```env
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Database (PostgreSQL)
DATABASE_URL=postgresql://carrybee_admin:carrybee_secret_2026@localhost:5432/carrybee_auction?schema=public

# Redis
REDIS_URL=redis://localhost:6379

# Clerk Authentication (Server-only)
CLERK_SECRET_KEY=sk_test_placeholder_secret_key
CLERK_WEBHOOK_SECRET=whsec_placeholder

# MinIO / S3 Object Storage
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=carrybee_minio_admin
S3_SECRET_KEY=carrybee_minio_secret_2026
S3_BUCKET_NAME=carrybee-auctions
```

---

## 8. Database Strategy (Prisma + PostgreSQL)

The schema in `api/prisma/schema.prisma` strictly implements the data architecture in `SYSTEM_ARCHITECTURE.md` section 12:

1. **User**: Maps external Clerk identity (`clerkId` unique) to application record, linked to `Employee`, role, and active status.
2. **Employee**: Company identity (`employeeId` unique, `displayName`, `department`, `designation`, `email` unique, `employmentStatus`, `eligibilityStatus`).
3. **Role & Permission**:
   - `Role`: `id`, `name` unique (`SUPER_ADMIN`, `AUCTION_ADMIN`, `AUCTION_MANAGER`, `FINANCE`, `AUDITOR`, `EMPLOYEE`), `description`.
   - `Permission`: `id`, `name` unique (`auction:view`, `auction:create`, `bid:create`, etc.), `category`, `description`.
   - `RolePermission`: Compound unique `(roleId, permissionId)`.
4. **AuctionCategory**: `id`, `code` unique, `name`, `description`, `icon`.
5. **AuctionItem**: `id`, `lotNumber` unique, `title`, `description`, `categoryId`, `condition`, `recommendedPrice` (Decimal), `status`, `metadata`.
6. **Auction**:
   - `id`, `auctionNumber` unique, `itemId`, `status` enum (`DRAFT`, `SCHEDULED`, `LIVE`, `ENDED`, `SETTLEMENT_PENDING`, `PAYMENT_PENDING`, `PAYMENT_VERIFIED`, `READY_FOR_COLLECTION`, `COMPLETED`, `CANCELLED`, `SUSPENDED`).
   - `startsAt`, `endsAt` (authoritative closing boundary).
   - `startingBid`, `currentBid`, `minIncrement` (Decimals).
   - Anti-sniping: `antiSnipingEnabled` (Boolean), `antiSnipingWindowSec` (Int), `antiSnipingExtendSec` (Int).
   - Payment/Collection: `paymentDeadlineHours` (Int), `allowedPaymentMethods` (String[]), `collectionLocation` (String).
   - Indexes: `@@index([status, endsAt])`.
7. **Bid**:
   - `id`, `auctionId`, `bidderId`, `amount` (Decimal), `sequence` (Int), `placedAt` (DateTime), `status` (`ACCEPTED`, `REJECTED`), `rejectionReason`, `idempotencyKey` (unique String).
   - Indexes: `@@index([auctionId, sequence])`, `@@index([auctionId, placedAt])`, `@@index([bidderId, placedAt])`.
8. **Payment**: `id`, `auctionId`, `settlementId`, `payerId`, `amount`, `paymentMethod`, `transactionRef`, `status`, `verifiedById`, `verifiedAt`.
9. **Settlement**: `id`, `auctionId` unique, `winningBidId`, `winnerId`, `finalAmount`, `status`, `paymentDeadline`, `collectionLocation`.
10. **Notification**: `id`, `userId`, `title`, `message`, `type`, `isRead`, `metadata`, `createdAt`.
11. **AuditLog**: `id`, `actorId`, `actorEmail`, `action`, `targetType`, `targetId`, `metadata`, `ipAddress`, `createdAt`. Indexes: `@@index([actorId, createdAt])`, `@@index([targetType, targetId, createdAt])`.
12. **Attachment**: `id`, `filename`, `originalName`, `mimeType`, `size`, `storageKey`, `url`, `uploaderId`, `targetType`, `targetId`.
13. **SystemSetting**: `id`, `key` unique, `value` (JSON), `description`, `updatedById`.

---

## 9. Authentication & RBAC Foundation

### Clerk Integration:
- Client-side: `ClerkProvider` wraps Next.js application in `src/app/providers.tsx`.
- Server-side (NestJS): `ClerkAuthGuard` inspects the `Authorization: Bearer <token>` header, verifies the JWT using Clerk's SDK / JWKS, extracts `sub` (`clerkId`), and queries `prisma.user.findUnique({ where: { clerkId }, include: { employee: true, role: { include: { permissions: { include: { permission: true } } } } } })`.
- Custom Parameter Decorator: `@CurrentUser()` injects the resolved user context directly into controller handler arguments.

### RBAC Enforcement:
- Permissions are represented as strongly-typed strings / enums:
  - `auction:view`, `auction:create`, `auction:edit`, `auction:publish`, `auction:cancel`, `auction:end`, `auction:extend`
  - `bid:create`, `bid:view_own`, `bid:view_all`
  - `payment:view`, `payment:verify`
  - `settlement:view`, `settlement:manage`
  - `user:view`, `user:manage`, `role:view`, `role:manage`
  - `audit:view`, `report:view`
- `@RequirePermissions('auction:create')` decorator metadata is read by `PermissionsGuard`.
- If user lacks any required permission, a `403 Forbidden` response is returned with explicit message and request ID.

---

## 10. Local Development Infrastructure

### Docker Compose (`infrastructure/docker/docker-compose.yml`):
- **PostgreSQL 16**: Port 5432, healthcheck (`pg_isready`), persistent volume `postgres_data`.
- **Redis 7**: Port 6379, healthcheck (`redis-cli ping`), persistent volume `redis_data`.
- **MinIO**: Port 9000 (API), Port 9001 (Console), persistent volume `minio_data`.

### Fallback Instructions (when Docker is not installed on host):
- Provide clear setup instructions for connecting to standard local PostgreSQL/Redis installations or hosted development instances (Neon, Supabase, Upstash) using `.env` variables.

---

## 11. Testing & Verification Strategy

### Frontend Checks:
1. `npm run lint` — ESLint flat config verification.
2. `npx tsc --noEmit` — TypeScript compilation verification with 0 errors.
3. `npm run build` — Next.js Turbopack production build verification.
4. Visual verification that the Home page remains pixel-perfect matching `design/Home.png`.

### Backend Checks:
1. `cd api && npm run lint` — NestJS ESLint verification.
2. `cd api && npx tsc --noEmit` — NestJS TypeScript compilation.
3. `cd api && npm run build` — NestJS compilation into `dist/`.
4. `cd api && npx prisma validate` — Validation of Prisma schema syntax and relation integrity.
5. `cd api && npx prisma generate` — Generation of Prisma client types.
6. Backend health controller unit test (`health.controller.spec.ts`).
7. RBAC permissions guard unit test (`permissions.guard.spec.ts`).

---

## 12. Manual Test Steps

1. **Verify Home Page Preservation**: Run `npm run dev` and navigate to `http://localhost:3000`. Confirm all components (TopNav, Sidebar, HeroBanner, CategoryBar, LiveAuctionCards, EndingSoonWidget, MyAuctionsTable, QuickStatsWidget) render identically without styling regressions.
2. **Verify Backend Bootstrap & Health**: Start the NestJS backend (`npm run dev:api`), query `GET http://localhost:3001/api/v1/health`, and confirm status `200 OK` with JSON `{ "status": "ok", "uptime": ..., "timestamp": ..., "services": { ... } }`.
3. **Verify Prisma Schema**: Run `npm run db:validate` from root. Confirm `The schema is valid`.
4. **Verify RBAC Rejection**: Send a request to a protected endpoint without proper token or permissions and confirm `401 Unauthorized` / `403 Forbidden` response containing `x-request-id`.

---

## 13. Security Considerations

- **No Secrets in Code**: All API keys, database URLs, and Clerk secrets live exclusively in `.env` / environment files.
- **Client/Server Separation**: Clerk secret key, database credentials, and Redis URLs are never exposed to Next.js client bundles.
- **CORS**: Backend restricts allowed origins to `CORS_ORIGIN` (default `http://localhost:3000`).
- **Global Validation**: Backend uses `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` to prevent mass assignment vulnerabilities.
- **Structured Error Envelope**: Internal stack traces and raw database errors are suppressed in production mode to prevent information disclosure.

---

## 14. Assumptions

1. The existing Home page visual design and components in `src/` are authoritative and will NOT be redesigned or modified in layout.
2. In the foundation phase, API hooks provide clean fallback mock data so the Home page operates seamlessly both with and without an active backend.
3. Live bid broadcasting and database transaction locks will be built in the subsequent Auction Engine phase, leaving the domain modules cleanly structured for that work.

---

## 15. User Approval

In accordance with `AGENTS.md` Rule #2, approval must be granted before executing this foundation plan.
