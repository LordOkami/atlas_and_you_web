# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas&You is an e-commerce site for handmade polymer clay and resin jewelry. The site is in Spanish (UI, routes, variable names). It has two main areas: a public storefront and an admin panel at `/admin`.

## Commands

- `npm run dev` — Start dev server at http://localhost:4321
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `stripe listen --forward-to localhost:4321/api/stripe/webhook` — Forward Stripe webhooks in development

No test framework is configured.

## Architecture

**Framework:** Astro 6 in full SSR mode (`output: 'server'`) with Netlify adapter. Tailwind CSS v4 via Vite plugin.

**Auth:** Firebase Auth for admin login. Client SDK (`src/lib/firebase.ts`) handles sign-in on the frontend; Admin SDK (`src/lib/firebase-admin.ts`) verifies session cookies server-side via `src/lib/auth.ts`. Both SDKs support a `IS_MOCK` mode that activates when Firebase credentials are missing/placeholder — this lets development work without a Firebase project.

**Data:** Supabase (PostgreSQL) for products, orders, customers, shipping, taxes, and discounts. Two clients in `src/lib/supabase.ts`: `supabase` (anon key, frontend-safe) and `supabaseAdmin` (service role, server-only API routes). Also supports `IS_MOCK` mode, falling back to `src/lib/mock-data.ts`.

**Payments:** Stripe checkout sessions created via `src/pages/api/stripe/checkout.ts`, with webhook handler at `src/pages/api/stripe/webhook.ts`.

**Emails:** Resend (`src/lib/email.ts`) for transactional emails (order confirmation, shipping notifications).

**Images:** Cloudinary for product image hosting.

**Cart:** Client-side via `localStorage` (key: `atlas_cart`). Updates broadcast via `window.dispatchEvent(new Event('cart-updated'))`.

## Key Conventions

- **Route language:** All routes use Spanish (`/tienda`, `/carrito`, `/checkout`, `/admin/pedidos`, `/admin/productos`, etc.)
- **API routes:** Under `src/pages/api/`. Public: `stripe/`, `shipping/`, `discount/`. Admin: `api/admin/` (session-protected).
- **Layouts:** `StoreLayout.astro` (storefront with nav, footer, cart UI) and `AdminLayout.astro` (admin sidebar).
- **Components:** Split into `src/components/storefront/` and `src/components/admin/`.
- **Typography:** Playfair Display (headings) + Nunito (body), loaded via Google Fonts.
- **Brand color:** Teal `#2B8080` / dark teal `#1F6666`.
- **Database schema:** Defined in `supabase/schema.sql`, seed data in `supabase/seeds.sql`.
- **Env vars:** See `.env.example`. Public vars prefixed with `PUBLIC_`. Firebase vars are separate for client (PUBLIC_FIREBASE_*) and server (FIREBASE_*).
- **Node:** Requires >=22.12.0.

## Atlas Backend (Phoenix — proyecto hermano)

Proyecto hermano en `/mnt/c/gitlocal/xabe/atlas_backend`. Backend API + admin dashboard que reemplaza Firebase/Supabase.

### Stack
- **Phoenix 1.8** + LiveView, Elixir 1.18, OTP 27
- **PostgreSQL** con UUIDs (`binary_id`) en todas las tablas
- **stripity_stripe** para pagos, **Swoosh + Resend** para emails
- **DaisyUI** (via Tailwind) para UI del admin
- **Fly.io** para deploy (región Madrid)

### Comandos
```bash
cd /mnt/c/gitlocal/xabe/atlas_backend
mix ecto.setup          # Crea BD, migraciones, seeds
mix phx.server          # http://localhost:4000
mix test                # Tests
fly deploy              # Deploy a Fly.io
stripe listen --forward-to localhost:4000/webhooks/stripe
```

### Estructura de contextos
| Contexto | Módulo | Descripción |
|---|---|---|
| Catálogo | `AtlasBackend.Catalog` | Productos y categorías CRUD, filtros, búsqueda |
| Pedidos | `AtlasBackend.Orders` | Pedidos, items, stats, revenue mensual |
| Envíos | `AtlasBackend.Shipping` | Zonas, tarifas, cálculo por país/peso/total |
| Descuentos | `AtlasBackend.Promotions` | Validación, uso, códigos CRUD |
| Impuestos | `AtlasBackend.Taxes` | Tasas por país (21% ES default) |
| Inventario | `AtlasBackend.Inventory` | Movimientos de stock (Ecto.Multi) |
| Pagos | `AtlasBackend.Payments` | Checkout Stripe + webhook handler |
| Emails | `AtlasBackend.Notifications` | 4 tipos: confirmación, admin, envío, stock bajo |
| Config | `AtlasBackend.Settings` | Key-value store para ajustes |
| Auth | `AtlasBackend.Accounts` | phx.gen.auth (AdminUser) |

### Rutas principales
- **API pública:** `GET /api/v1/products`, `GET /api/v1/products/:slug`, `GET /api/v1/categories`, `GET /api/v1/shipping/calculate`, `GET /api/v1/discounts/validate`, `POST /api/v1/checkout`
- **Webhook:** `POST /webhooks/stripe` (raw body para verificación de firma)
- **Admin LiveView:** `/admin` (dashboard), `/admin/productos`, `/admin/pedidos`, `/admin/descuentos`, `/admin/envios`, `/admin/impuestos`, `/admin/configuracion`
- **Auth:** `/admin_users/register`, `/admin_users/log-in`

### Migraciones (10 tablas)
categories, products, orders, order_items, shipping_zones, shipping_rates, discount_codes, tax_rates, settings, stock_movements + admin_users_auth_tables (phx.gen.auth)

### Config clave
- `config/runtime.exs` — Stripe keys, Resend API key, SITE_URL, ADMIN_EMAIL desde env vars
- `fly.toml` — Fly.io config (app: atlas-backend, región: mad)
- `.env.example` — Todas las variables necesarias
