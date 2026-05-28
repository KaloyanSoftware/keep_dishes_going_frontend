# Keep Dishes Going — Frontend

> A modern food delivery web application built with **React 19**, **TypeScript**, and **Material UI**. Dual-role interface for restaurant owners and customers, featuring real-time menu synchronisation, live order tracking, and a secure Keycloak-authenticated owner dashboard.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Engineering Highlights](#engineering-highlights)
- [Tech Stack](#tech-stack)
- [Application Structure](#application-structure)
- [Pages & Routing](#pages--routing)
- [Key Components](#key-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Authentication & Security](#authentication--security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Challenges & Accomplishments](#challenges--accomplishments)
- [Roadmap](#roadmap)

---

## Project Overview

Keep Dishes Going is the frontend for a full-stack food delivery platform. It presents two completely different experiences under one codebase:

| Role | Experience |
|------|-----------|
| **Customer** | Browse open restaurants, explore live menus with real-time stock status, add items to a basket (restricted to one restaurant), fill in delivery details at checkout, and track the order status to delivery |
| **Restaurant Owner** | Authenticated management dashboard — create a restaurant, author dish drafts, publish/unpublish dishes, control stock, open/close the restaurant, and process incoming orders in real time |

All customer-facing data (restaurant status, dish availability) auto-refreshes every 5 seconds so customers always see the live state without requiring a page reload.

---

## Engineering Highlights

- **TanStack Query (React Query)** — All server state is managed through React Query. Smart cache invalidation, optimistic updates on order status changes, and background refetch intervals replace any need for Redux or manual data-fetching boilerplate.
- **Keycloak OIDC Integration** — Owners authenticate via Keycloak SSO. JWT tokens are automatically injected into Axios request headers. Unauthenticated customers have full read and basket access without logging in.
- **Protected Routes** — `RouteGuard` wraps all owner pages and verifies Keycloak authentication before rendering.
- **Optimistic UI** — Order status mutations update the UI immediately and roll back on error, giving owners a snappy experience with no perceived latency.
- **Session-Based Basket** — `withCredentials: true` on Axios ensures basket session cookies are sent on every request, maintaining a consistent basket across page refreshes without requiring user accounts.
- **Real-Time Stock & Status Sync** — Dish cards disable the "Add to Basket" button automatically when `stockStatus === OUT_OF_STOCK`, driven by 5-second polling rather than WebSockets.
- **Component-per-role architecture** — Customer and owner components are fully separated under `components/customer/` and `components/owner/`, preventing accidental cross-contamination.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript 5.8.3 |
| UI Framework | React 19.1.1 |
| Build Tool | Vite 7.1.7 |
| Routing | React Router 7.9.4 |
| UI Library | Material UI (MUI) 7.3.4 + Emotion |
| Data Fetching / State | TanStack React Query 5.90.3 |
| Forms | React Hook Form 7.64.0 |
| HTTP Client | Axios 1.12.2 |
| Authentication | Keycloak 26.0.0 + @react-keycloak/web 3.4.0 |
| Linting | ESLint 9.36.0 |

---

## Application Structure

```
src/
├── components/
│   ├── context/
│   │   └── BasketDrawerContext.tsx      # Basket drawer open state + item count
│   ├── customer/
│   │   ├── CustomerHeader.tsx           # Header with basket icon and logout
│   │   ├── BasketIcon.tsx               # Badge icon triggering the basket drawer
│   │   ├── BasketDrawer.tsx             # Side drawer with items, quantities, subtotal
│   │   ├── DishProjectionCard.tsx       # Dish card with add-to-basket logic
│   │   └── RestaurantCard.tsx           # Restaurant card for the explore page
│   └── owner/
│       ├── OwnerHeader.tsx              # Navigation header for the owner dashboard
│       ├── DishCard.tsx                 # Dish card with publish/stock/edit/delete controls
│       ├── DishDraftCard.tsx            # Draft card with publish and delete buttons
│       ├── DishDraftForm.tsx            # Form for creating and editing dish drafts
│       ├── RestaurantForm.tsx           # Restaurant creation/edit form
│       └── OrderView.tsx               # Order card with status badge and action buttons
│
├── hooks/                              # TanStack Query wrappers (one per domain entity)
│   ├── useRestaurant.ts
│   ├── useDish.ts
│   ├── useDishDrafts.ts
│   ├── useBasket.ts
│   ├── useOrder.ts
│   ├── useOrderProjection.ts
│   └── useDishProjection.ts
│
├── model/
│   ├── customer/                       # TypeScript types: Basket, Order, DishProjection, ...
│   └── owner/                          # TypeScript types: Restaurant, Dish, DishDraft, ...
│
├── pages/
│   ├── customer/
│   │   ├── CustomerExplore.tsx         # Customer welcome / role selection
│   │   ├── RestaurantsExplore.tsx      # Auto-refreshing restaurant listing
│   │   ├── Menu.tsx                    # Live restaurant menu with add-to-basket
│   │   └── Checkout.tsx               # Customer details form + order confirmation
│   └── owner/
│       ├── Restaurant.tsx              # Owner dashboard (info + open/close toggle)
│       ├── Dishes.tsx                  # Live menu management (publish, stock, delete)
│       ├── Drafts.tsx                  # Draft management (create, publish, delete)
│       └── Orders.tsx                 # Incoming orders with accept/reject/ready controls
│
├── security/
│   ├── SecurityContextProvider.tsx     # Keycloak initialisation + token management
│   ├── SecurityContext.tsx             # React context exposing Keycloak instance
│   ├── RouteGuard.tsx                  # Protects owner routes; redirects if unauthenticated
│   └── useSecurity.ts                 # Hook to consume SecurityContext
│
├── services/
│   ├── dataService.ts                  # Centralised API layer — all 27+ endpoint calls
│   └── auth.ts                         # Axios interceptor injecting Bearer token
│
├── App.tsx                             # Root routing configuration
├── main.tsx                            # React DOM entry point
└── theme.ts                            # Global Material UI theme
```

---

## Pages & Routing

### Landing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Redirect | Redirects to `/landing` |
| `/landing` | `Landing.tsx` | Role selection — enter as Customer or Owner |

### Customer Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/customer/explore` | `CustomerExplore.tsx` | Customer welcome page with navigation |
| `/customer/explore/restaurants` | `RestaurantsExplore.tsx` | Browse all restaurants (auto-refreshes every 5s) |
| `/customer/explore/restaurants/:id/menu/dishes` | `Menu.tsx` | View live menu for a restaurant |
| `/customer/explore/baskets/:id/checkout` | `Checkout.tsx` | Delivery details form + order placement |

### Owner Routes (protected by `RouteGuard`)

| Route | Component | Purpose |
|-------|-----------|---------|
| `/owner/restaurant` | `Restaurant.tsx` | Restaurant info, open/close toggle |
| `/owner/restaurant/:id/drafts` | `Drafts.tsx` | Draft creation and publishing |
| `/owner/restaurant/:id/menu/dishes` | `Dishes.tsx` | Live menu control (publish, stock, delete) |
| `/owner/restaurant/:id/orders` | `Orders.tsx` | Incoming order management dashboard |

---

## Key Components

### Customer-Facing

**`RestaurantsExplore.tsx`** — Polls the backend every 5 seconds to show live open/close status for all restaurants. Renders `RestaurantCard` for each result, which navigates to that restaurant's menu.

**`Menu.tsx`** — Displays a restaurant's published dishes, also polling every 5 seconds. Dishes marked `OUT_OF_STOCK` render with a disabled "Add to Basket" button. Adding an item from a different restaurant than what is already in the basket is prevented with a clear error message.

**`BasketDrawer.tsx`** — Slide-out drawer (MUI `Drawer`) showing current basket contents: dish names, quantity controls, prices, a subtotal, and a "Checkout" button. Basket item count is surfaced via `BasketDrawerContext` to the header icon badge.

**`Checkout.tsx`** — Two-step checkout: a form collecting the customer's name, email, phone, and delivery address (React Hook Form + MUI), followed by an `OrderConfirmation` screen showing the order ID and a link to track status.

### Owner-Facing

**`Orders.tsx`** — The owner's live order dashboard. Polls active orders every 5 seconds. Each `OrderView` shows the full order (items, customer info, total) with action buttons whose availability depends on the current `OrderStatus` state machine.

**`Dishes.tsx`** — Lists all published dishes. Each `DishCard` offers one-click publish/unpublish toggle, in-stock/out-of-stock toggle, an edit flow via `DishDraftForm` dialog, and delete with confirmation.

**`Drafts.tsx`** — Lists dish drafts. Owners create a draft via `DishDraftForm`, review it, then publish it to the live menu — or delete it without ever affecting customers.

---

## State Management

All server state is managed by **TanStack React Query**. There is no Redux, Zustand, or custom global store.

| Concern | Approach |
|---------|---------|
| Server data (restaurants, dishes, orders) | React Query queries with structured cache keys |
| Mutations (add to basket, place order, update status) | React Query `useMutation` with `onSuccess` cache invalidation |
| Optimistic updates | Order status changes update the cache immediately, roll back on error |
| Real-time refresh | `refetchInterval: 5000` on restaurant and dish queries |
| Basket drawer state | `BasketDrawerContext` (local React context) |
| Auth state | `SecurityContext` exposing the Keycloak instance |
| Form state | React Hook Form (local to each form component) |

**Query key conventions (examples):**

```typescript
["restaurant", ownerId]              // Owner's restaurant
["dishes", restaurantId]             // Live menu for a restaurant
["activeOrders", restaurantId]       // Incoming orders for owner dashboard
["dishProjections", restaurantId]    // Customer-facing dish list
```

---

## API Integration

All backend calls are centralised in `src/services/dataService.ts`. The base URL is configured via the `VITE_BACKEND_URL` environment variable (default: `http://localhost:8080/api`).

```
Customer endpoints
GET    /customer/restaurants                       → restaurant projections
GET    /customer/restaurants/:id/menu/dishes       → dish projections (live stock)
POST   /customer/baskets/basketLines               → add item to basket
PATCH  /customer/baskets/:id/basketLines/:dishId   → decrease item quantity
POST   /customer/baskets/:id/orders                → place order
GET    /customer/orders/:id                        → get order + status

Owner endpoints
GET    /owners/:ownerId/restaurant                 → fetch owner's restaurant
POST   /restaurants                                → create restaurant
PATCH  /owners/restaurants/:id/opened              → open restaurant
PATCH  /owners/restaurants/:id/closed              → close restaurant
GET    /restaurant/:id/menu/dishes                 → list published dishes
PATCH  /restaurant/:id/menu/dishes/published       → publish dish
PATCH  /restaurant/:id/menu/dishes/unpublished     → unpublish dish
PATCH  /restaurant/:id/menu/dishes/outOfStock      → mark out of stock
PATCH  /restaurant/:id/menu/dishes/backInStock     → mark back in stock
DELETE /restaurant/:id/menu/dishes/:dishId         → delete dish
POST   /drafts                                     → create draft
GET    /owner/restaurant/:id/drafts                → list drafts
POST   /restaurant/:id/menu/dishes                 → publish draft to menu
DELETE /drafts/:draftId                            → delete draft
GET    /owner/restaurant/:id/activeOrders          → active orders
PATCH  /owner/orders/:orderId                      → update order status
GET    /enums/food-tags                            → food tag enum values
GET    /enums/dish-types                           → dish type enum values
```

---

## Authentication & Security

**Keycloak** handles all authentication. The frontend uses the Authorization Code Flow via `@react-keycloak/web`.

**Initialisation (`SecurityContextProvider.tsx`):**
- On app load, `keycloak.init()` is called with `{ onLoad: 'check-sso' }`.
- If the user is already authenticated (e.g. returning owner), the token is loaded silently from the Keycloak session.
- The Keycloak instance is stored in `SecurityContext` and accessible via `useSecurity()` throughout the app.

**Token injection (`auth.ts`):**
- An Axios request interceptor reads `keycloak.token` and sets the `Authorization: Bearer <token>` header on every outgoing request.
- Unauthenticated requests (customer browsing) simply send no header — the backend permits them for public endpoints.

**Protected routes (`RouteGuard.tsx`):**
- All `/owner/*` routes are wrapped in `RouteGuard`, which redirects unauthenticated users to the landing page.

**Session continuity:**
- Axios is configured with `withCredentials: true` to send session cookies. This ensures the basket state persists across page refreshes for unauthenticated customers without requiring them to log in.

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- A running instance of the [Keep Dishes Going Backend](../keep_dishes_going_backend) (includes Keycloak and all infrastructure via Docker Compose)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Runs the TypeScript compiler and Vite bundler. Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env.development` (or `.env.production`) file in the project root:

```env
VITE_BACKEND_URL=http://localhost:8080
VITE_KC_URL=http://localhost:8180
VITE_KC_REALM=keepdishesgoing
VITE_KC_CLIENT_ID=frontend-client
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_KC_URL` | Keycloak server URL | `http://localhost:8180` |
| `VITE_KC_REALM` | Keycloak realm name | `keepdishesgoing` |
| `VITE_KC_CLIENT_ID` | Keycloak client ID | `frontend-client` |

Variables are accessed via `import.meta.env.VITE_*` and must be set at build time.

---

## Challenges & Accomplishments

### Challenges

- **TanStack Query learning curve** — Understanding query invalidation strategies, when to use `staleTime` vs `refetchInterval`, and how to structure cache keys for efficient updates required significant iteration.
- **Keycloak integration** — Handling the SSO silent check, token refresh lifecycle, and injecting tokens into Axios without race conditions on app startup was non-trivial.
- **Optimistic UI correctness** — Getting order status mutation rollbacks right when the server rejected a transition required careful handling of the `onMutate`, `onError`, and `onSettled` callbacks.
- **Basket session consistency** — Ensuring cookie-based basket sessions work reliably across page refreshes and navigations without user accounts required coordinating `withCredentials` on the client and CORS configuration on the backend.

### Accomplishments

- Delivered a **dual-role application in a single codebase** with clear separation between customer and owner components and pages.
- Implemented **real-time UI updates** without WebSockets — smart polling intervals give a live feel with minimal complexity.
- Built a **complete checkout flow** — from adding items to a basket through to placing an order and seeing a live status tracker.
- Achieved a **fully typesafe API layer** — all backend responses are typed via models in `src/model/`, eliminating runtime shape surprises.
- Applied **optimistic updates** on owner order management actions, making the dashboard feel instant even over slower connections.

---

## Roadmap

| Feature | Status |
|---------|--------|
| Customer restaurant browsing | Done |
| Live menu with stock status | Done |
| Basket (single restaurant constraint) | Done |
| Checkout + order placement | Done |
| Order status tracking | Done |
| Owner authentication (Keycloak) | Done |
| Restaurant creation and management | Done |
| Draft-based dish editing | Done |
| Dish stock management | Done |
| Restaurant open/close toggle | Done |
| Incoming order dashboard | Done |
| Prevent checkout when restaurant is closed | Planned |
| Basket change notifications | Planned |
| Restaurant filtering (cuisine, price, distance) | Planned |
| Dish sorting (by price, type) | Planned |
| Order rejection reason display | Planned |
| Map-based restaurant exploration | Planned |

---

## Related Repository

**Backend:** [keep_dishes_going_backend](../keep_dishes_going_backend) — Java 21 + Spring Boot 3 API with Hexagonal Architecture, DDD, RabbitMQ, and Keycloak.
