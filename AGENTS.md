# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **CarryBee Auction Hub**, a production-grade internal employee auction platform for **CarryBee Express Ltd.**

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

---

# 1. What you are building

CarryBee Auction Hub is an internal auction and settlement platform for CarryBee employees. Eligible products arising from approved courier/logistics disposal, return, recovery, unclaimed, or similar internal processes are listed for controlled employee auctions.

Employees can browse eligible auction lots and place bids in real time. Administrators manage products, auctions, participants, bidding rules, settlements, permissions, and audit records.

The defining feature is **server-authoritative real-time bidding**. When one employee places a valid bid, the accepted bid and current auction state must propagate to every connected bidder without requiring a page refresh.

You will build the employee portal, authentication and authorization, live auction experience, auction lifecycle management, real-time bid engine, auction administration, user and role management, payment and settlement workflows, notifications, audit trail, reporting, product/media management, background jobs, and the supporting API/realtime infrastructure.

Build nothing beyond that. Do not overbuild.

---

# 2. How to work

Follow this loop for every request:

1. Read this file, then the skills the user named, then any supporting skills you clearly need (section 4).
2. Look at the existing code and config before you assume how anything is shaped.
3. Ask one focused question only if the task is genuinely ambiguous.
4. Write an implementation prompt in `prompts/` covering the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps.
5. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:
   - `What I did`: a few one line bullets.
   - `Test`: numbered steps to run or see.
   - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
     Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion), so it opens the native prompt for whatever agent you are. Use plain text only if you have no such panel.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

---

# 3. UI work

The user provides the CarryBee Auction Hub design system and page references as the visual source of truth.

Reproduce the approved design exactly: layout, spacing, typography, colors, component states, density, interaction hierarchy, and responsive behavior. Do not independently redesign or "improve" a referenced interface.

The approved CarryBee visual identity is authoritative:

- Use the approved CarryBee logo asset supplied for the project.
- Preserve the official CarryBee visual language and brand proportions.
- Use the established warm yellow brand accent, dark charcoal/black typography, neutral surfaces, borders, and approved semantic/status colors from the project design system.
- Use the approved typography and type scale from the design-system reference.
- Do not copy CarryBee website marketing copy, taglines, promotional text, or unrelated website sections.
- Do not invent a new logo, mascot, slogan, brand mark, or decorative identity.
- Do not substitute a generic marketplace aesthetic.

The application is an operational internal system, not a public e-commerce marketplace.

For desktop references, make pages responsive down to mobile by adapting layout sensibly while preserving the intended desktop hierarchy. Use the existing components and Tailwind patterns before adding new ones. When a reference image exists, it is the source of truth.

The primary user experience priorities are:

1. Clear auction state.
2. Highly visible current bid and minimum next valid bid.
3. Accurate remaining time.
4. Immediate acknowledgement of accepted/rejected bids.
5. Clear outbid feedback.
6. Strong visual distinction between live, ending, ended, won, lost, payment, and settlement states.
7. Fast, low-friction bidding.

---

# 4. Skills to lean on

Reach for existing project skills instead of guessing. Do not invent new ones when a suitable installed skill exists.

Use the relevant package and framework documentation available in the project for:

- `node_modules/next/dist/docs/`, for Next.js routing, Server/Client Components, middleware, caching, and current framework conventions.
- Clerk documentation and existing project patterns, for authentication, session handling, organizations, and authorization integration.
- NestJS documentation and existing project patterns, for modules, controllers, guards, providers, WebSocket gateways, and server-side business logic.
- Prisma documentation and existing project patterns, for PostgreSQL schema, migrations, transactions, indexes, and concurrency-sensitive database operations.
- Socket.IO/NestJS WebSocket patterns, for real-time auction event delivery.
- Redis and BullMQ documentation, for distributed realtime support, queues, retries, scheduled jobs, and worker behavior.
- Refine documentation when working in the administrative CRUD surface.
- shadcn/ui and Tailwind patterns already established in the repository, for reusable UI primitives.
- TanStack Query and TanStack Table patterns, for server state, caching, filtering, pagination, and data-heavy tables.
- Zod and React Hook Form patterns, for shared validation and forms.
- Playwright and the project's unit/integration test tools, for end-to-end verification.

Do not replace the approved stack with another framework simply because an AI-generated example uses it.

---

# 5. How the app is structured

Keep the responsibilities of the application clearly separated.

The recommended structure is a Next.js web application plus a standalone NestJS backend and shared infrastructure.

- The `web` workspace holds the Next.js employee portal, authenticated admin UI, pages, client components, server-side UI integration, and browser-facing application behavior.
- The `api` or backend workspace holds NestJS modules, REST APIs, WebSocket gateways, business rules, auction state transitions, bid processing, authorization enforcement, notifications, settlement workflows, and audit logging.
- A shared package may hold types, Zod schemas, DTO contracts, constants, and event contracts only when doing so keeps server/client contracts consistent without leaking server-only implementation.
- PostgreSQL is the authoritative persistent datastore.
- Redis is for realtime/distributed coordination and transient infrastructure needs. It is not the authoritative bid ledger.
- BullMQ workers handle asynchronous and scheduled jobs outside the request path.
- Object storage holds auction product images and other uploaded files; PostgreSQL stores metadata and references.
- Clerk owns authentication and identity/session primitives. Application-specific authorization and business permissions remain enforced by the backend and database.

Inside the web application:

- Employee pages display current application state and call approved APIs.
- Admin pages use the same design system and may use Refine for CRUD/resource plumbing where appropriate.
- Live auction pages use Socket.IO for realtime updates and TanStack Query for durable server state/caching.
- The browser never becomes the authority for auction state, bid ordering, settlement state, permissions, or financial values.

Inside the backend:

- Controllers handle transport concerns.
- Services contain business logic.
- Guards/policies enforce authentication and authorization.
- Auction services own auction lifecycle and bid rules.
- Realtime gateways broadcast accepted state changes.
- Database transactions are used for concurrency-sensitive bid operations.
- Background workers handle non-critical asynchronous work.
- Audit events are emitted for security-sensitive and business-significant actions.

Never cross these boundaries casually. A client must never be trusted to calculate or decide the winning bid.

---

# 6. Tech stack

Use the approved stack unless the user explicitly changes it.

Frontend:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- TanStack Query
- TanStack Table
- React Hook Form
- Zod

Authentication and authorization:

- Clerk for authentication and identity
- Application-level RBAC and fine-grained permissions enforced by the backend and database

Backend:

- NestJS
- TypeScript
- REST API
- Socket.IO through NestJS WebSocket gateways

Data and infrastructure:

- PostgreSQL
- Prisma
- Redis
- BullMQ
- S3-compatible object storage such as MinIO or another approved provider

Admin:

- Refine may be used for admin resource/table CRUD infrastructure
- The CarryBee design system remains the visual source of truth
- Do not allow a default Refine theme to replace the approved UI

Supporting libraries:

- Recharts for operational analytics where required
- Resend or the project's approved email provider for email delivery
- Playwright for end-to-end tests
- Vitest/Jest as appropriate for unit and integration tests
- Docker for reproducible local/runtime infrastructure where applicable

Do not introduce a second backend framework, second ORM, second authentication system, or duplicate realtime mechanism without an explicit architectural decision.

Do not use the browser as a trusted source for current bid, auction end time, winner, payment state, permissions, or financial calculations.

---

# 7. Decisions already made for you

Build to these unless the user changes them. They exist because auction integrity and security depend on them.

- This is an internal employee platform. There is no public self-registration flow unless explicitly requested.
- Authentication is handled by Clerk. Do not build custom password authentication or store passwords in the application database.
- Clerk identity is mapped to an application employee/user record. The application database remains authoritative for company-specific profile, role, department, employment status, eligibility, and business permissions.
- Authorization is enforced server-side. Hiding a button in the UI is not authorization.
- PostgreSQL is the authoritative source of truth for auctions, bids, winners, payments, settlements, and audit history.
- Redis is not the authoritative source of bid history or auction outcome.
- Socket.IO is the realtime delivery mechanism. Realtime events inform clients of state changes; they do not bypass backend validation.
- Every bid is accepted or rejected by the server.
- Bid acceptance is concurrency-safe. The backend must use an atomic transaction/locking strategy so concurrent bids cannot overwrite each other incorrectly.
- A bid must satisfy the configured auction rules before it can be accepted.
- The browser must not calculate a winning bid and must not be allowed to set the current bid directly.
- Current bid, accepted bid count, winner, and auction status are derived from authoritative server state.
- Auction time is server-authoritative. Client clocks must never decide whether an auction is still open.
- A bid arriving after the authoritative closing boundary is rejected unless the auction's configured extension logic changes the closing time before the bid is evaluated.
- Minimum bid increment is configurable per auction.
- Recommended Selling Price (RSP) is a reference value, not automatically the starting bid and not automatically the current bid.
- Starting Bid is a separate configured value.
- Anti-sniping/dynamic extension behavior is configurable per auction. Do not hard-code a single extension policy globally.
- If anti-sniping is enabled, all closing-time extensions are performed and persisted by the server.
- Race-condition failures must produce a useful user message and refresh the user to the latest authoritative auction state.
- Duplicate bid submissions should be safely handled. Where needed, accept an idempotency key or equivalent request identifier so retries do not create duplicate accepted bids.
- Every significant state change must produce an audit record with actor, action, target, timestamp, and relevant metadata.
- Bidder privacy is role-sensitive. Normal employees should see only the information permitted by company policy; authorized administrative roles may see more detail.
- Employees can see their own bidding and settlement history subject to permissions.
- Finance/settlement workflows are separate from auction bidding.
- Payment methods are configurable and should not be assumed to be a single fixed method.
- Product collection/delivery location must be configurable per auction rather than permanently hard-coded to one hub.
- Compliance or regulatory text must only be displayed when supplied by the business. Do not invent legal claims, certifications, or regulatory requirements.
- Infrastructure telemetry displayed in the UI must come from real metrics. Never ship fake latency, replica lag, connection counts, NTP status, or operational figures as if they were live values.
- The application should be production-oriented, but do not build unnecessary microservices or generalized platform abstractions before they are justified.

---

# 8. The data you are modeling

The core application data model should include the following concepts. Relationships and business identifiers described here are fixed unless the user changes them. Choose field types, indexes, constraints, naming, and normalization sensibly.

- A user represents the authenticated application identity and is linked to an employee record. Store the external Clerk user identifier, application status, and relevant profile metadata.
- An employee contains company-specific identity information such as employee ID, display name, department, designation, email, employment status, and eligibility-related fields required by approved business rules.
- A role defines a named application authorization role.
- A permission defines a granular capability such as viewing auctions, creating auctions, managing bids, verifying payments, or reading audit logs.
- Role-permission assignments determine the capabilities of each role.
- A product or auction item represents the physical item being offered. It should contain identifying metadata, category, condition, description, images, reference values, and operational notes as required.
- An auction represents the lifecycle of a sale event. It contains the auction ID, item reference, status, start time, authoritative end time, starting bid, current bid, minimum increment, RSP, anti-sniping configuration, payment/collection configuration, and relevant timestamps.
- A bid belongs to an auction and a bidder. It contains the submitted amount, accepted/rejected status where needed, authoritative timestamp, request/idempotency identifier where supported, and metadata required for auditability.
- The winning state is derived from authoritative accepted bids and finalized by the auction lifecycle.
- A payment represents a financial submission associated with a winning auction.
- A settlement represents the operational/financial completion workflow after an auction is won.
- A notification represents an in-app or outbound event such as an outbid alert, auction ending reminder, win notification, payment verification, or collection readiness.
- An audit log records security-sensitive and business-significant operations across auctions, bids, users, roles, payments, settlements, and administrative actions.
- An attachment/file record stores object-storage metadata and references for product photos, inspection documents, or other approved files.
- An auction category defines reusable classification for auction items.
- A system or policy settings layer may hold approved configurable defaults such as allowed payment methods, default bid increment rules, notification settings, or other administrative configuration.

Indexes and constraints must reflect the workload, especially:

- auction lookup by status and closing time
- bids by auction and authoritative sequence/time
- user bids by bidder
- settlement/payment status
- audit logs by target, actor, and time
- unique employee IDs
- unique auction IDs
- unique request/idempotency identifiers where used

Do not denormalize financial or bid state casually. If duplicated state is necessary for performance, define the synchronization invariant explicitly and keep one authoritative source.

---

# 9. How realtime bidding and background processing work

The live auction path is latency-sensitive and must stay small.

A valid bid follows this logical flow:

1. Employee opens a live auction.
2. Next.js fetches the authoritative auction state from the backend.
3. The browser establishes a Socket.IO connection for the relevant realtime events.
4. Employee submits a bid to the backend.
5. NestJS authenticates the session and resolves the application user.
6. Authorization and auction eligibility checks run.
7. The backend reads/locks the relevant auction state inside a database transaction.
8. The backend validates auction status, authoritative time, bid amount, minimum increment, and other configured rules.
9. The backend records the accepted bid and updates authoritative auction state within the same transaction.
10. The transaction commits.
11. The backend publishes a realtime event describing the new authoritative state.
12. All connected clients update their visible current bid, bid count, timer/state where applicable, and bid history.
13. The bidder who submitted the bid receives an explicit accepted/rejected result.

When a bid is rejected because another bid was accepted first, the user must see the current authoritative state rather than stale client state.

Realtime event contracts should be explicit and versionable. Examples may include:

- `auction.snapshot`
- `auction.bid.accepted`
- `auction.bid.rejected`
- `auction.updated`
- `auction.extended`
- `auction.ended`
- `auction.cancelled`
- `auction.winner.finalized`
- `notification.created`

Do not broadcast sensitive bidder or financial information to clients that are not authorized to receive it.

Background jobs using BullMQ should handle work that does not need to block the immediate bid request, such as:

- scheduled auction activation
- auction closing/finalization workflows when appropriate
- ending-soon reminders
- notification fan-out
- email delivery
- payment deadline reminders
- settlement follow-up
- cleanup/retention tasks
- report generation if it becomes expensive

Background jobs must be idempotent, retryable, and observable.

Never move the actual bid acceptance decision into an asynchronous job. A bid request must be synchronously accepted or rejected against authoritative state.

---

# 10. The auction configuration and administration model

The auction administration interface is the operational control surface.

Auction creation should be a guided workflow covering:

1. Product Information
2. Images & Condition
3. Pricing & Bid Rules
4. Schedule & Timing
5. Payment & Collection
6. Review & Publish

The system should clearly separate:

- Recommended Selling Price
- Starting Bid
- Current Bid
- Minimum Bid Increment

An administrator should be able to configure approved auction properties such as:

- auction identifier
- product/item
- category
- condition
- description
- images/documents
- RSP
- starting bid
- minimum increment
- start date/time
- end date/time
- anti-sniping/extension policy
- payment deadline
- allowed payment methods
- collection/delivery method
- collection location
- participant eligibility
- internal notes
- status

Auction lifecycle states should be explicit and validated. A typical lifecycle is:

`DRAFT → SCHEDULED → LIVE → ENDED → SETTLEMENT_PENDING → PAYMENT_PENDING → PAYMENT_VERIFIED → READY_FOR_COLLECTION → COMPLETED`

Additional states such as `CANCELLED` or `SUSPENDED` may exist when required.

Invalid state transitions must be rejected server-side.

Administrative actions such as cancel, end, extend, or change critical financial fields must use proper authorization and confirmation.

The admin dashboard should include only metrics derived from actual application data. Examples:

- total auctions
- live auctions
- upcoming auctions
- completed auctions
- total accepted bids
- total recovery/sales value
- pending settlements
- payment status
- category breakdown
- auction activity trends

Do not fake metrics for screenshots or demos in production code.

---

# 11. How bidding must behave

The live auction experience must behave as a true realtime auction.

For example:

Current Bid: ৳5,000

Employee A submits ৳5,001.

If accepted:

- The server records ৳5,001.
- The current bid becomes ৳5,001.
- Connected clients receive the update immediately.
- Bid count and bid history update.
- Employee A receives a successful bid response.

Employee B then submits ৳5,002.

If accepted:

- The server records ৳5,002.
- All connected clients immediately see ৳5,002.
- Employee A is now shown as outbid.
- Employee B is shown as currently winning, subject to auction rules.

The UI must not wait for a manual page refresh.

The bidding interface should show:

- current bid
- next minimum valid bid
- bid increment
- time remaining
- live connection state
- accepted/rejected state
- current user's bidding status where permitted

When a user submits an invalid bid:

- do not silently fail
- explain the reason
- refresh/update to the authoritative auction state

Examples:

`Bid must be higher than the current bid.`

`Minimum valid bid is ৳5,002.`

`This auction has already ended.`

`Your bid was not accepted because a newer higher bid was recorded.`

Concurrent bids are expected. Treat PostgreSQL transaction ordering/locking or an equally strong concurrency strategy as the authoritative ordering mechanism.

Never rely on:

- client timestamps
- browser local state
- JavaScript mutexes
- React state
- Redis alone
- optimistic UI without later server confirmation

for determining the winning bid.

The browser may optimistically show loading/pending state, but only the server decides the accepted outcome.

Auction countdowns must be based on server-provided authoritative timestamps. Client-side countdown is display logic only.

If anti-sniping is enabled:

- the server determines whether the bid qualifies for an extension
- the server persists the new end time
- the realtime event communicates the extension
- all clients recalculate their display against the new authoritative end time

---

# 12. Things that will trip you up

You cannot infer these safely from the UI alone, so keep them in mind.

- A beautiful auction UI is not an auction engine. The backend must enforce every important rule.
- Never trust the browser to provide the current bid, auction status, winner, payment state, employee role, or authorization decision.
- Never update an auction's current bid outside the same transaction that records the accepted bid unless there is a documented consistency strategy.
- Do not use Redis as the permanent bid history.
- Do not broadcast admin-only or bidder-sensitive information to every connected client.
- Do not expose Clerk secret keys or backend service credentials to the browser.
- Do not expose database credentials, Redis credentials, object-storage secrets, email API secrets, or signing secrets to client bundles.
- Only explicitly client-safe configuration may be exposed to the browser.
- Keep environment variables documented in a committed `.env.example`.
- Never place secrets directly in source code or committed config.
- Refine is an admin UI aid, not the business logic layer. Critical authorization and validation belongs in NestJS/backend services.
- Do not duplicate auction rules separately in Next.js and NestJS in ways that can drift. Shared schemas/constants may be used, but the backend remains authoritative.
- Do not use local browser time to decide whether a bid is late.
- Do not assume realtime delivery means reliable persistence. A WebSocket message is not a database transaction.
- Realtime clients must recover from reconnects by obtaining an authoritative snapshot rather than assuming no events were missed.
- Socket.IO event handlers must be safe when a client reconnects or receives duplicate updates.
- Background jobs may run more than once. Jobs must be idempotent.
- Auction closing/finalization must be safe under retries and concurrent execution.
- Financial state changes require auditability.
- Never silently overwrite payment or settlement state.
- Never delete accepted bids simply because an auction was edited.
- Historical bid/audit records should be append-oriented and preserved according to the project's retention requirements.
- Product images and documents belong in object storage, not as large binary blobs in PostgreSQL.
- Do not hard-code a single branch, hub, payment method, or internal department unless the user explicitly defines it as a permanent business rule.
- Do not invent regulatory/compliance claims.
- Do not ship fake live telemetry values.
- Do not add public marketplace features, seller accounts, merchant storefronts, carts, reviews, unrelated e-commerce functionality, or consumer checkout unless explicitly requested.
- Do not create microservices merely to make the architecture diagram look impressive.
- Prefer a modular monolith backend first. Split services only when there is a demonstrated operational requirement.
- Keep the design system centralized. Do not allow each feature to invent its own colors, radii, typography, spacing, button styles, or status semantics.
- Preserve the official CarryBee logo. Do not replace it with a text-only imitation.
- Do not copy CarryBee's public website tagline or marketing content into the application UI.
- Never claim an automated test, build, migration, deployment, or infrastructure check passed unless it actually ran successfully.

---

# 13. Checks to run

Run checks from the correct workspace and report the real output. Never claim a check passed without running it.

At minimum:

- In web: type check, lint, production build when routes/config/server integration changes, and the development server.
- In backend: type check, lint, unit/integration tests, and production build when backend modules/configuration change.
- Database: validate Prisma schema, generate the client, and run migrations against an appropriate test/development database as required.
- Realtime: test bid acceptance, rejection, concurrent bids, reconnect behavior, stale-state recovery, auction ending, and auction extension.
- End-to-end: use Playwright for critical employee and admin workflows.
- Authentication: verify protected routes and backend authorization for every sensitive operation.
- Security-sensitive changes: run the project's applicable dependency/security checks.
- Background jobs: verify retries, idempotency, scheduling, and failure handling.
- Deployment/runtime: verify environment validation and startup health checks when infrastructure/configuration changes.

Critical end-to-end manual scenarios should include:

1. Employee signs in.
2. Employee opens a live auction.
3. Two or more browser sessions observe the same current bid.
4. One session places a valid bid.
5. The other session sees the new bid without refresh.
6. A concurrent lower/stale bid is rejected correctly.
7. An outbid user receives the correct state.
8. The auction reaches its authoritative end time and bidding closes.
9. An eligible final bid extends the auction when the configured anti-sniping rule applies.
10. The winner moves into the approved settlement flow.
11. Finance can verify payment only with the required permission.
12. Audit records exist for important actions.

After implementation, run the relevant type checks and lint at minimum. Add builds, tests, and migration verification whenever the changed code requires them.

---

# 14. When in doubt

Keep it small.

Use the relevant skill. Inspect the existing repository before introducing new patterns. Preserve the separation between Next.js, NestJS, PostgreSQL, Redis, and background workers.

Treat PostgreSQL as the authoritative record for auction and financial state.

Treat Socket.IO as transport for realtime state changes, not as the source of truth.

Treat Clerk as the identity provider, not as the entire application authorization model.

Treat the approved CarryBee design system as the visual source of truth.

Get specifics from the repository, environment configuration, existing components, schema, and project documentation instead of hardcoding assumptions.

Never invent business rules, compliance claims, financial rules, or operational locations.

Save an implementation prompt and get approval before coding unless the user explicitly tells you to skip that step.

Run the checks.

Report exact test steps and real results.
