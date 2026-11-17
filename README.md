# Lolacat>< — Japanese Sushi & Noodles Digital Menu

**Lolacat><** is a bilingual (English & Arabic) digital restaurant menu and menu management studio designed for a modern Japanese sushi, ramen, and noodles kitchen with a playful Kawaii cat-inspired identity.

Guests scan a table QR code to launch an animated **Lolacat><** noodle bowl splash screen and explore categories, featured dishes, bilingual search, dietary & spice indicators, and full dish details. Restaurant owners manage dishes, categories, availability, restaurant settings, and printable table QR codes from the built-in admin studio.

---

## Brand Identity & Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| **Deep Burgundy** | `#6E142D` | Primary actions, brand mark, headings, QR foreground |
| **Soft Blush Pink** | `#FCE3EB` | Splash screen canvas, secondary buttons, badges, surfaces |
| **Warm Cream** | `#FFFBF9` | Primary page background, card surfaces |
| **Espresso Ink** | `#2B1119` | Primary readable typography |

- **Brand Name**: Always rendered as `Lolacat><` with rounded display typography (`Fredoka`, `Plus Jakarta Sans`, and `Cairo` for Arabic).
- **Splash Screen**: Full-viewport `#FCE3EB` animated experience featuring a custom `Lolacat><` cat-ear ceramic ramen bowl, CSS-keyframe rising steam, floating kawaii accents, and `prefers-reduced-motion` support.

---

## Key Features

### Customer Experience (`/`, `/menu/category/:categoryId`, `/menu/item/:itemId`)
- **Noodle Bowl Splash Screen**: Branded loading reveal transitioning smoothly into the menu.
- **Hero & Category Discovery**: 7 curated Japanese categories (*Sushi Rolls, Nigiri & Sashimi, Ramen & Noodles, Rice Bowls, Appetizers, Desserts, Drinks*) with horizontal scrolling on mobile and responsive grids on desktop.
- **Meow-velous Favorites**: Highlighted signature dishes with EGP pricing and discount comparison.
- **Bilingual Search & Filtering**: Instant search across English & Arabic dish names, descriptions, categories, and ingredients (with Arabic diacritic & alef/teh-marbuta normalization), plus dietary (`Vegetarian`, `Vegan`, `Gluten-Free`), spice level, popularity, availability, and price sorting.
- **Dish Details**: Full photography, ingredients, allergens, prep time, calories, portion size, and related dishes.

### Admin Dashboard (`/admin`, `/admin/items`, `/admin/categories`, `/admin/qr-code`, `/admin/settings`)
- **Live Overview**: Dynamic metrics computed from stored menu items and categories, recent updates, popular dishes, and one-click demo data reset.
- **Menu Item CRUD**: Create, edit, delete (with confirmation), upload/compress food images, and toggle availability, featured, and popular flags with instant sync to the public menu.
- **Category CRUD**: Reorder, toggle visibility, and safely delete categories (with dish reassignment or explicit cascade confirmation).
- **Restaurant Settings**: Edit business profile, bilingual tagline/description, contact info, 7-day opening hours, social links, currency, and default language.
- **QR Code Generator**: Real-time `qrcode.react` generation pointing to the live origin URL, custom colors/size, optional centered `Lolacat><` emblem, PNG & SVG downloads, copy URL, and printable bilingual table stand layout.

---

## Technology Stack

- **Core**: React 18, TypeScript (`strict: true`), Vite 6, React Router DOM 6
- **Styling & Motion**: Tailwind CSS v3, Framer Motion, Lucide React, Radix UI Dialog
- **Internationalization**: `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **QR Generation**: `qrcode.react`
- **Testing & Quality**: Vitest, React Testing Library, Playwright, ESLint, Prettier

---

## Installation & Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Type-check, lint, and format check
pnpm run typecheck
pnpm run lint
pnpm run format:check

# Run unit & integration tests
pnpm test

# Build for production
pnpm run build

# Run end-to-end Playwright tests (requires Playwright Chromium installed)
pnpm run test:e2e
```

---

## Folder Structure

```text
src/
├── app/                 # App shell, router, AppProvider state sync
├── assets/              # Brand illustrations (noodle-bowl.jpg)
├── components/          # Reusable UI primitives, layouts, feedback dialogs
├── config/              # Brand tokens, storage keys, default restaurant config
├── data/                # Realistic bilingual seed data (7 categories, 32 dishes)
├── features/            # Feature modules (splash, menu, categories, items, admin, qr)
├── i18n/                # i18next config & EN/AR JSON dictionaries
├── lib/                 # Storage helpers, formatters, Arabic search normalizer
├── repositories/        # LocalStorage repositories with Zod schema validation
├── schemas/             # Zod validation schemas
├── services/            # Filtering/sorting, QR export, image compression services
├── styles/              # Design tokens & Tailwind v3 globals
└── types/               # Strict modular TypeScript definitions
```

---

## Bilingual Support (EN / AR & RTL/LTR)

- Switching between **EN** and **AR** updates `i18next`, persists `lolacat_language_v1` in LocalStorage, and dynamically sets `document.documentElement.lang` and `dir` (`ltr` / `rtl`).
- Layout spacing uses CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`) so navigation, icons, breadcrumbs, and tables mirror cleanly in Arabic.
- Search normalizes Arabic characters (`أ/إ/آ -> ا`, `ة -> ه`, `ى -> ي`, and removes diacritics) and matches across both languages simultaneously.

---

## QR Code Usage

1. Navigate to `/admin/qr-code`.
2. Verify or customize the target menu URL (defaults to `window.location.origin + "/"`).
3. Adjust QR size, foreground/background colors, and center `Lolacat><` emblem.
4. Download **PNG** or **SVG**, or click **Print Table Stand** for a bilingual table tent layout.

---

## LocalStorage Limitations & Future Backend Integration

This project is a **frontend-only demonstration**:
- All menu items, categories, restaurant settings, and uploaded images are stored in browser `localStorage` (`lolacat_menu_items_v1`, `lolacat_categories_v1`, `lolacat_settings_v1`, `lolacat_language_v1`).
- Changes immediately reflect across customer and admin views within the browser, but are **not shared across different devices or users** and can be cleared if browser storage is wiped.
- The admin route is an unauthenticated demo interface.

**Recommended Production Architecture**:
- **Backend API & Database**: REST/GraphQL API backed by PostgreSQL (categories, localized items, restaurant settings, audit logs).
- **Authentication & RBAC**: JWT/session auth protecting `/admin` endpoints.
- **Media Storage**: S3 / Cloudflare R2 / Cloudinary for optimized dish photography instead of Data URLs.
- **Multi-branch / Table QR**: Per-branch and per-table URL parameters (`/?table=12`) with real-time cache invalidation.
