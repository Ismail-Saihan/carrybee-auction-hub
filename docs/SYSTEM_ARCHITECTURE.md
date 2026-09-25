---
title: CarryBee Auction Hub — System Architecture
version: 1.0
status: Implementation baseline
audience: Engineering, QA, IT Operations, Product / Admin
current_ui_state: Design system complete; Home page implemented and currently mostly static
primary_objective: Convert the approved UI into a secure, realtime, transaction-safe auction platform
---

# CarryBee Auction Hub

System Architecture & Engineering Specification

Internal employee auction platform — architecture baseline for implementation

| Document | Value |
| --- | --- |
| Version | 1.0 |
| Status | Implementation baseline |
| Audience | Engineering, QA, IT Operations, Product / Admin |
| Current UI state | Design system complete; Home page implemented and currently mostly static |
| Primary objective | Convert the approved UI into a secure, realtime, transaction-safe auction platform |

| Architecture posture — Use a modular monolith first. Keep Next.js, NestJS, PostgreSQL, Redis, and workers clearly separated. Avoid microservices until there is a concrete operational reason. |
| --- |

## Contents

1. Executive Summary

2. Current Project Status

3. Goals and Non-Goals

4. Architecture Principles

5. Reference Architecture

6. Application / Monorepo Structure

7. Frontend Architecture

8. Backend Architecture

9. Realtime Auction Architecture

10. Auction State Machine

11. Bid Processing and Concurrency

12. Data Architecture

13. Authentication and RBAC

14. Payments and Settlement

15. Background Jobs and Notifications

16. File and Media Storage

17. API and Event Contracts

18. Security Architecture

19. Observability and Operations

20. Reliability and Scalability

21. Testing Strategy

22. Deployment Architecture

23. Implementation Sequence

24. Architecture Decisions and Constraints

25. Acceptance Criteria

## 1. Executive Summary

CarryBee Auction Hub is an internal employee auction platform for approved logistics-disposal and related inventory items. Its central engineering requirement is trustworthy, low-latency, server-authoritative bidding across multiple connected users.

The system uses Next.js for the web experience, NestJS for business APIs and WebSocket gateways, PostgreSQL as the authoritative datastore, Redis for realtime distribution and queue infrastructure, BullMQ for asynchronous work, Clerk for authentication, and S3-compatible storage for media. Refine may accelerate administrative CRUD screens, while shadcn/ui and Tailwind remain the visual source of truth.

- Every accepted bid is decided and persisted by the backend; the browser never decides the winning bid.

- PostgreSQL is authoritative for auctions, accepted bids, winners, payments, settlements, and audit history.

- Socket.IO distributes committed state changes to connected clients; it is transport, not the source of truth.

- Client timers are display-only and must be derived from server timestamps.

- Business authorization is enforced in NestJS, not only in the UI.

- The initial architecture is a modular monolith designed to scale horizontally without prematurely splitting services.

## 2. Current Project Status

| Area | Current state | Architecture implication |
| --- | --- | --- |
| Design system | Complete | Centralize tokens/components and reuse them everywhere. |
| Home page | Implemented, mostly static | Keep visual structure; replace mock/static values with API-backed data incrementally. |
| Core backend | To be implemented | Build before making live auction UI authoritative. |
| Realtime bidding | To be implemented | Must be designed with transaction-safe ordering and reconnect recovery. |
| Admin / RBAC | Designed conceptually | Implement server-side permissions and role-aware navigation. |
| Payments / settlement | Designed conceptually | Implement as a separate post-auction state workflow. |

| Important — The home page should not be rewritten merely because it is static. Its present layout is the approved UI shell; the next task is to create real contracts and data adapters behind it. |
| --- |

## 3. Goals and Non-Goals

### Goals

- Provide employees with a fast, transparent internal live-auction experience.

- Guarantee deterministic, concurrency-safe bid acceptance.

- Provide administrators with auction, user, permission, finance, settlement, and audit controls.

- Provide immediate realtime updates without requiring page refreshes.

- Preserve an auditable history of important operational and financial actions.

- Keep the application maintainable for an internal IT/engineering team.

### Non-Goals

- Public marketplace, public seller accounts, or public buyer accounts.

- Consumer shopping cart or general e-commerce checkout.

- Microservice decomposition without a demonstrated need.

- Client-side authority over bids, auction time, financial state, or authorization.

- Invented regulatory/compliance claims or hard-coded operational policies not approved by CarryBee.

## 4. Architecture Principles

| Principle | Rule |
| --- | --- |
| Server authority | The backend is the authority for auction status, bid acceptance, end time, winner, payment state, and permissions. |
| Database integrity | Critical state changes happen in ACID transactions with explicit constraints and indexes. |
| Realtime after commit | Publish realtime events after authoritative database commit; never announce an uncommitted bid as accepted. |
| Least privilege | Authorize every sensitive API and WebSocket action based on authenticated identity and application permissions. |
| Explicit state machines | Auction and settlement states use validated transitions instead of arbitrary status mutations. |
| Idempotency | Retryable client requests and background jobs must not create duplicate business outcomes. |
| Observability | Critical paths expose structured logs, metrics, traces, and health indicators. |
| Design consistency | The approved CarryBee design system is the source of truth for UI components and visual tokens. |

## 5. Reference Architecture

The following logical architecture describes the preferred production boundary. Exact hosting vendors may vary, but the responsibilities must remain consistent.

Request flow: browser → Next.js / NestJS → authoritative persistence → realtime event distribution → connected clients. Asynchronous work leaves the immediate request path and is handled by workers.

## 6. Application / Monorepo Structure

```text
apps/
  web/                  # Next.js App Router application
  api/                  # NestJS modular monolith

packages/
  ui/                   # shared UI primitives and design tokens
  types/                # shared transport/domain types
  validation/           # Zod schemas shared across boundaries
  config/               # non-secret shared configuration

infrastructure/
  docker/
  scripts/

docs/
  architecture.md
  database.md
  auction-engine.md
  realtime.md
  rbac.md
  api.md
```

- Keep server-only dependencies out of the browser bundle.

- Keep shared packages free of secrets and server-only side effects.

- Prefer domain modules over a large unstructured utilities folder.

- Place migrations and database tooling with the API/data layer.

## 7. Frontend Architecture

### Technology

- Next.js App Router

- TypeScript

- Tailwind CSS

- shadcn/ui

- Lucide React

- TanStack Query

- TanStack Table

- React Hook Form

- Zod

### Responsibilities

- Render the approved CarryBee design system and page hierarchy.

- Fetch durable server state through the API.

- Maintain cache state through TanStack Query.

- Subscribe to auction-scoped Socket.IO events for live updates.

- Present optimistic loading states only; never treat optimistic values as authoritative.

- Handle reconnect by requesting a fresh authoritative snapshot.

### Home page integration

```text
GET /api/dashboard/summary
GET /api/auctions?status=LIVE
GET /api/auctions/ending-soon
GET /api/me/bids?status=ACTIVE
WS  /realtime/auctions
```

## 8. Backend Architecture

| Module | Owns |
| --- | --- |
| Auth & Identity | Clerk verification, user mapping, authenticated context. |
| RBAC | Roles, permissions, policies, protected operations. |
| Auction | Auction lifecycle, configuration, eligibility, end-time logic. |
| Bid | Bid validation, idempotency, concurrency, bid history. |
| Realtime | Socket.IO gateways, rooms, snapshots, event delivery. |
| Finance | Payments and settlement lifecycle. |
| Notification | In-app and email notifications. |
| Audit | Append-oriented audit events and actor context. |
| Files | Object storage uploads, metadata, access controls. |
| Jobs | BullMQ queues and scheduled background work. |
| Reports | Read-optimized aggregates and exports. |

| Modular-monolith rule — Modules may call each other through explicit services/events. Avoid direct cross-module repository access that bypasses business rules. |
| --- |

## 9. Realtime Auction Architecture

### Connection model

- Authenticate the WebSocket connection using the application session.

- Join clients to an auction-specific room only after verifying that they may view that auction.

- Emit an authoritative snapshot when a client joins or reconnects.

- Broadcast accepted state only after the corresponding database transaction commits.

- Never broadcast raw internal records containing sensitive fields that the client is not entitled to see.

### Reconnect model

1. Client detects disconnection.

1. Client reconnects and re-authenticates.

1. Client requests/receives `auction.snapshot` for each active auction view.

1. Client replaces stale cached auction state with the snapshot.

1. Client resumes event consumption from the current session.

## 10. Auction State Machine

```text
DRAFT
  -> SCHEDULED
  -> LIVE
  -> ENDED
  -> SETTLEMENT_PENDING
  -> PAYMENT_PENDING
  -> PAYMENT_VERIFIED
  -> READY_FOR_COLLECTION
  -> COMPLETED

Additional terminal / exception state: CANCELLED
Optional operational state: SUSPENDED
```

| Transition | Required authority / condition |
| --- | --- |
| DRAFT → SCHEDULED | Auction admin; configuration passes validation. |
| SCHEDULED → LIVE | System clock reaches start time or approved manual start. |
| LIVE → ENDED | Authoritative end boundary reached and closing rules complete. |
| LIVE → LIVE (extension) | Server applies configured anti-sniping extension. |
| ENDED → SETTLEMENT_PENDING | Winner/final state is determined. |
| SETTLEMENT_PENDING → PAYMENT_PENDING | Settlement record created. |
| PAYMENT_PENDING → PAYMENT_VERIFIED | Authorized finance action after payment validation. |
| PAYMENT_VERIFIED → READY_FOR_COLLECTION | Operational requirements satisfied. |
| READY_FOR_COLLECTION → COMPLETED | Collection/delivery completion recorded. |

| State integrity — Invalid transitions must return a deterministic domain error and must not partially mutate related records. |
| --- |

## 11. Bid Processing and Concurrency

This is the highest-risk business-critical path. The implementation must optimize for correctness first and latency second.

```text
PLACE BID
1. Authenticate request
2. Resolve application user + permissions
3. Validate request schema
4. Begin database transaction
5. Lock/read auction state
6. Verify status == LIVE
7. Verify server time < authoritative end time
8. Verify amount >= minimum valid bid
9. Verify idempotency/request key is unused
10. Insert accepted bid
11. Update authoritative auction current bid / sequence
12. Write audit event when required
13. Commit transaction
14. Publish realtime accepted event
15. Return authoritative bid result
```

### Concurrency requirements

- Concurrent bid requests for the same auction must serialize through a database-safe mechanism.

- The current bid update and bid insertion must preserve one consistent transaction boundary.

- The accepted bid sequence must be monotonic within an auction.

- An idempotency key/request identifier must prevent duplicate accepted bids on transport retries.

- A stale or losing bid should return the latest authoritative auction state where practical.

## 12. Data Architecture

| Entity | Key responsibilities |
| --- | --- |
| User / Employee | Identity mapping, employee ID, department, status, eligibility metadata. |
| Role / Permission | RBAC model and fine-grained application authorization. |
| Auction Item | Physical product identity, condition, description, category, media references. |
| Auction | Timing, state, pricing, bid rules, extension policy, collection/payment configuration. |
| Bid | Accepted bid ledger and bidder relationship, amount, sequence, timestamp, request key. |
| Payment | Payment submission and verification state. |
| Settlement | Post-auction financial and operational completion workflow. |
| Notification | User-facing event records and delivery state. |
| Audit Log | Append-oriented security and business activity record. |
| Attachment | Object-storage reference and upload metadata. |

### Key indexes

- Auctions: `(status, endsAt)` for live/ending views.

- Bids: `(auctionId, sequence)` and `(auctionId, placedAt)`.

- Bids: `(userId, placedAt)` for My Bids.

- Payments/settlements: status/time indexes for finance queues.

- Audit logs: `(actorId, createdAt)` and `(targetType, targetId, createdAt)`.

- Unique constraints for employee ID, auction number, and idempotency/request identifiers as appropriate.

## 13. Authentication and RBAC

### Authentication

- Clerk is the authentication/identity provider.

- No custom password store is permitted.

- The application maps the authenticated Clerk identity to an internal employee/user record.

- Secret keys remain server-only.

### Authorization

```text
can(user, 'auction:view')
can(user, 'auction:create')
can(user, 'auction:cancel')
can(user, 'bid:create')
can(user, 'bid:view_all')
can(user, 'payment:verify')
can(user, 'audit:view')
```

- Permission checks occur in the backend on every protected operation.

- Frontend guards improve UX but never provide security by themselves.

- WebSocket subscriptions are also subject to authorization.

- Role and permission changes should be auditable.

## 14. Payments and Settlement

```text
Auction ENDED
      ↓
Winner Finalized
      ↓
Settlement Created
      ↓
PAYMENT_PENDING
      ↓
Payment Submitted
      ↓
PAYMENT_VERIFIED
      ↓
READY_FOR_COLLECTION
      ↓
COMPLETED
```

- Payment methods are configuration-driven and must not be hard-coded to one channel.

- Finance verification is permission-controlled and audited.

- Winning bid amount is copied into settlement context as an immutable business fact, not recalculated from the UI.

- Payment/reference documents belong in object storage when applicable.

- Settlement actions must be idempotent and safe under retries.

## 15. Background Jobs and Notifications

| Job | Execution model | Notes |
| --- | --- | --- |
| Auction activation | Scheduled | Transition scheduled auctions when authoritative time is reached. |
| Auction closing/finalization | Scheduled / event-driven | Must be idempotent and concurrency-safe. |
| Ending-soon notification | Scheduled | Use authoritative auction end time. |
| Outbid notification | Event-driven | Created after accepted bid is committed. |
| Email delivery | Queued | Never block bid acceptance on email provider latency. |
| Payment reminders | Scheduled | Respect settlement/payment state. |
| Report generation | Queued | Use worker when data aggregation is expensive. |

- BullMQ jobs must have deterministic identifiers where duplicate scheduling is possible.

- Retries must not create duplicate notifications, settlements, or auction transitions.

- Failed jobs must be visible to operators.

## 16. File and Media Storage

- Use S3-compatible object storage such as MinIO or another approved provider.

- Store media metadata and logical ownership in PostgreSQL.

- Use signed upload/download URLs where direct client transfer is appropriate.

- Validate file type, size, ownership, and authorization server-side.

- Do not store large binary images or documents directly in PostgreSQL.

## 17. API and Event Contracts

### Representative REST API surface

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | /auctions | List auctions with filters and pagination. |
| GET | /auctions/:id | Return authoritative auction detail. |
| POST | /auctions | Create auction; admin permission required. |
| PATCH | /auctions/:id | Edit allowed auction configuration. |
| POST | /auctions/:id/publish | Publish/schedule auction. |
| POST | /auctions/:id/bids | Place a bid. |
| GET | /auctions/:id/bids | Read permitted bid history. |
| GET | /me/bids | Read current employee bidding history. |
| GET | /settlements | Finance/ops settlement list. |
| POST | /payments/:id/verify | Verify payment; finance permission required. |
| GET | /audit-logs | Read audit records; audit permission required. |

### Representative realtime events

| Event | Payload intent |
| --- | --- |
| auction.snapshot | Full authorized auction state for the current viewer. |
| auction.bid.accepted | New authoritative accepted bid and visible derived state. |
| auction.bid.rejected | Reason + latest authoritative state where appropriate. |
| auction.updated | Non-bid auction state/configuration change that clients may see. |
| auction.extended | New authoritative end time and extension metadata visible to the client. |
| auction.ended | Auction no longer accepts bids. |
| auction.winner.finalized | Post-auction outcome visible according to permissions. |
| notification.created | New in-app notification. |

## 18. Security Architecture

- Validate all external input with Zod/DTO validation.

- Apply authentication and authorization to every sensitive API and WebSocket operation.

- Rate-limit bid endpoints and other abuse-sensitive operations.

- Use server-side secret management; no credentials in source control.

- Protect uploads with MIME/type/size checks and authorization.

- Use security headers and secure cookie/session configuration provided by the chosen auth/web platform.

- Log security-sensitive actions without storing unnecessary secrets or sensitive tokens.

- Preserve auditability of critical admin, financial, and auction actions.

- Use dependency and vulnerability scanning in CI.

| Threat focus — The principal threats are unauthorized bidding, bid tampering, race-condition errors, replayed requests, privilege escalation, and leakage of bidder/payment information. |
| --- |

## 19. Observability and Operations

| Signal | Examples |
| --- | --- |
| Logs | request ID, user ID, auction ID, bid ID, event name, outcome, latency |
| Metrics | bid acceptance latency, bid rejection rate, WebSocket connections, event delivery errors, queue depth, job failures |
| Database | query latency, connection saturation, lock contention, replication/backup health where applicable |
| Realtime | connected clients, room membership, reconnects, event failures |
| Jobs | queued/running/failed jobs, retry counts, oldest queued job |
| Health | API readiness, database connectivity, Redis connectivity, object storage reachability |

Never display hard-coded or fake operational telemetry in production UI. Dashboard values must come from actual instrumentation or be explicitly labeled as static configuration.

## 20. Reliability and Scalability

- Run multiple stateless NestJS instances behind a load balancer when required.

- Use Redis adapter/pub-sub so WebSocket events can reach clients connected to different API instances.

- Keep PostgreSQL authoritative and protect it with connection pooling, proper indexes, backups, and tested restore procedures.

- Keep workers separate from request-serving processes when background load grows.

- Use pagination for all large admin/history lists.

- Use database-level constraints in addition to application validation.

- Introduce read replicas only when measured read load justifies them; never route the bid-write authority to a lagging replica.

- Prefer horizontal scaling of stateless API/web nodes before introducing distributed business services.

## 21. Testing Strategy

| Level | Required coverage |
| --- | --- |
| Unit | Bid rules, state transitions, permission policies, extension calculations, validation. |
| Integration | PostgreSQL transactions, Prisma repositories, RBAC, payment state, audit writes. |
| Realtime | Accepted/rejected events, reconnect snapshot, room authorization, duplicate/out-of-order client messages. |
| E2E | Login, live auction, bidding, outbid, auction close, win, payment, settlement, admin workflows. |
| Concurrency | Parallel bid requests against one auction; verify deterministic accepted state and no lost updates. |
| Security | Protected routes, forbidden actions, WebSocket authorization, input validation, rate limits. |

```text
Concurrency acceptance example:

100 concurrent bid attempts → one auction
Expected:
- no duplicate accepted request identifiers
- no lost accepted bids
- monotonic bid sequence
- currentBid == final accepted bid amount
- audit trail consistent with accepted operations
```

## 22. Deployment Architecture

| Component | Reference deployment role |
| --- | --- |
| Next.js | Web hosting / CDN or Node runtime according to chosen deployment model. |
| NestJS | Containerized API runtime behind TLS and health checks. |
| PostgreSQL | Managed or dedicated primary database with automated backups. |
| Redis | Managed or dedicated Redis instance with appropriate persistence/availability settings. |
| BullMQ | Worker runtime separate from latency-sensitive API processes. |
| Object storage | S3-compatible service or internal MinIO. |
| Observability | Centralized logging/metrics/tracing platform. |

- Production secrets are provided by the runtime secret store or environment configuration, not committed files.

- Run database migrations as a controlled deployment step.

- Health checks must distinguish readiness from liveness where possible.

- Backups are only useful if restore procedures are periodically tested.

## 23. Implementation Sequence

1. Freeze architecture and domain contracts.

1. Initialize monorepo and CI.

1. Provision local PostgreSQL, Redis, and object storage with Docker.

1. Implement Clerk identity mapping and base RBAC.

1. Implement Prisma schema and migrations.

1. Implement Auction module and explicit state machine.

1. Implement Bid module with transaction-safe concurrency and idempotency.

1. Implement realtime gateway and authoritative snapshot/reconnect behavior.

1. Connect existing Home page to real API data without changing approved visual structure.

1. Implement Live Auction detail and bidding console.

1. Implement administration and CRUD surfaces.

1. Implement payments/settlement and finance permissions.

1. Implement notifications and background jobs.

1. Implement audit, observability, security hardening, and reports.

1. Run concurrency, E2E, and deployment acceptance testing.

## 24. Architecture Decisions and Constraints

| Decision | Status | Rationale |
| --- | --- | --- |
| Next.js App Router | Approved | Primary web application and UI architecture. |
| NestJS modular monolith | Approved | Strong domain separation without premature microservices. |
| PostgreSQL authority | Approved | Transactional integrity and relational reporting. |
| Socket.IO realtime | Approved | Straightforward bidirectional realtime transport with NestJS. |
| Redis | Approved | Cross-instance realtime/event support and queue infrastructure. |
| BullMQ | Approved | Durable asynchronous jobs and scheduled processing. |
| Clerk | Approved | Managed authentication/identity rather than custom auth. |
| Refine for admin CRUD where useful | Approved conditionally | Reduce repetitive admin plumbing while preserving custom UI and backend rules. |
| shadcn/ui + Tailwind | Approved | Match and centralize the CarryBee design system. |
| No auction SaaS dependency in core bidding | Constraint | Core bid integrity must remain under project control and PostgreSQL authority. |

| Package discipline — Do not add a second ORM, authentication system, backend framework, or realtime transport without a documented architecture decision. |
| --- |

## 25. Acceptance Criteria

1. An authenticated employee can view live auctions using real API data.

1. A valid bid is accepted only by the backend and persisted transactionally.

1. Concurrent bids on one auction produce a correct authoritative sequence with no lost updates.

1. Connected clients receive accepted bid updates without page refresh.

1. A reconnecting client receives an authoritative auction snapshot.

1. Auction closing is based on server time and configured extension rules.

1. Invalid or late bids are rejected with a deterministic reason and current state.

1. Only authorized users can perform administrative, financial, audit, or bidder-identity actions.

1. Winning auctions enter the settlement workflow without manual database manipulation.

1. Important auction/payment/admin events appear in the audit trail.

1. Background jobs are retry-safe and do not duplicate business outcomes.

1. The existing CarryBee visual design remains intact while static home-page data is replaced by real data.

1. Production telemetry reflects actual infrastructure state.

1. CI passes type checking, linting, tests, and builds appropriate to the change.

## Implementation Note for the Coding Agent

Use this document together with AGENTS.md as the architecture baseline. When a requested feature conflicts with this design, stop before coding and surface the smallest specific architecture decision required. Do not silently replace PostgreSQL authority, server-side authorization, transaction-safe bidding, or the approved UI system.
