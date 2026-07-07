# nopCommerce Custom Theme Specification
## Furniture Store (UK Launch) — Mobile-First GUI Theme

**Scope:** This is a presentation-layer (theme) specification only. No changes to nopCommerce's controllers, services, plugins, or database schema are required. All work targets `Nop.Web/Themes/{YourTheme}/` — cloned from the built-in **Responsive** theme to preserve existing RTL, accessibility, and localization support.

**Platform:** nopCommerce 4.90.x / .NET 9

---

## 1. Design Direction

**Style:** Warm Modern — minimal-luxury structure (whitespace, restrained palette, strong typography) combined with lifestyle-driven photography (products shown in real rooms/settings, not just white-background product shots). This applies uniformly across furniture categories (sofas, chairs, tables, storage, decor, etc.) rather than being tailored to one product type.

**Why:** Furniture is a high-consideration, emotional purchase. Lifestyle imagery sells the feeling of a finished room; clean structure keeps it from feeling cluttered. This visual language is also genre-flexible, so it extends cleanly when new categories (rugs, lighting, decor) are added later without a redesign.

### Color & Typography System
| Element | Direction |
|---|---|
| Primary palette | 1 neutral base (warm off-white / stone), 1 deep accent (charcoal, forest, or terracotta — TBD from brand), 1 CTA accent color used sparingly |
| Typography | Serif or high-contrast display face for headings (warmth/editorial feel), clean sans-serif for body/UI text |
| Imagery | Full-bleed lifestyle hero shots; consistent aspect ratios across product grid; room-scene + isolated product image pairing on PDP |

*(Exact hex/type values to be finalized once brand assets or reference sites are chosen — flagged as an open item below.)*

---

## 2. Page-by-Page Layout

### 2.1 Homepage
- Full-bleed hero (lifestyle image + single clear CTA)
- Category navigation band (visual tiles, e.g. Living Room, Dining, Storage, Decor — driven by store category data so tiles can be added/reordered without a template change)
- Featured/bestseller collection carousel
- Trust/USP band: delivery info, 14-day returns, fire safety compliance, Trustpilot score
- Editorial content block (styling guide / "shop the room") — optional, supports the lifestyle positioning
- Newsletter signup

### 2.2 Category / Listing Page
- Left-hand filter panel (desktop) / bottom sheet filter drawer (mobile) — filter by size, material/fabric, color, price, and category-specific attributes (e.g. seating capacity for sofas, storage capacity for wardrobes) driven by nopCommerce's product specification attributes so new categories add filters automatically
- Sort control (price, popularity, newest)
- Product card: image (room-scene or isolated, toggle on hover for desktop), name, price (VAT-inclusive), swatch preview dots, "from £X" if variants vary in price
- Pagination or infinite scroll (recommend pagination for SEO)

### 2.3 Product Detail Page (PDP)
- Multi-angle gallery (5–6 images minimum) with room-scene images interspersed with studio shots; swipeable on mobile
- Price block: VAT-inclusive price, "Pay in 3 with Klarna/Clearpay" badge slot, delivery estimate ("Delivery from £X · arrives in Y weeks")
- Material/color **swatch selector** (chip-based, not dropdown) — maps to nopCommerce product attributes/variants; works for fabric, wood finish, or any variant type
- Dimension/scale block: dimensions table + "will it fit through your door/room?" guide graphic — generic to any furniture item, not sofa-specific
- Compliance content block: fire safety labelling where applicable (upholstered items), plus general material/care/certification info for other categories
- Sticky mobile bar: price + Add to Basket, persistent while scrolling
- Cross-sell / "complete the room" module (uses existing related-products data)
- Reviews section (Trustpilot integration slot)

### 2.4 Cart & Checkout
- Structurally unchanged (kept as nopCommerce's existing flow) — restyled only
- UK address/postcode field styling
- Delivery date estimator visible in cart
- 14-day cancellation notice link visible pre-payment
- GDPR cookie consent banner styled to match theme

### 2.5 Global Elements
- Header: logo, category nav, search, account, basket icon with item count; collapses to hamburger + bottom nav on mobile
- Footer: company registration number, VAT number, returns policy, fire safety certification links, social, newsletter
- Cookie consent banner (GDPR)

---

## 3. Furniture-Specific UX Components (reusable, data-driven)

These should be built as **generic components fed by product attributes**, not category-specific templates, so any furniture category (seating, tables, storage, lighting, decor) reuses them without rebuilding:

1. Dimension/scale comparison graphic
2. Swatch-based variant selector
3. Delivery & assembly info block
4. Spec table (dimensions, materials, care instructions) — driven by product attribute data, not hardcoded fields
5. Multi-angle gallery component

---

## 4. UK Launch Requirements (baked into templates, not bolted on)

| Requirement | Theme Implication |
|---|---|
| VAT-inclusive pricing | Price components always render "inc. VAT" label; matches nopCommerce tax display settings |
| 14-day cancellation right | Persistent trust badge + footer/checkout link |
| Fire safety labelling (upholstered furniture where applicable) | Dedicated PDP content block for certification/labels, shown conditionally by product type |
| GDPR cookie consent | Themed consent banner in header/layout |
| Company details in footer | Registration number, VAT number fields |
| GBP formatting, UK address/postcode | Checkout form styling only (data handling already native to nopCommerce) |
| Klarna/Clearpay badge | Reserved UI slot near price (plugin wiring is separate, later work) |
| Trustpilot reviews | Reserved slot on homepage + PDP |

---

## 5. Multi-Region Extensibility (for post-UK expansion)

- Currency symbol, VAT/tax display, and delivery messaging built as **theme-level config/variables**, not hardcoded GBP/UK text — this aligns with nopCommerce's existing multi-currency/multi-store support, so expansion becomes a configuration change rather than a redesign.
- Category page templates stay fully data-driven (generic spec-table and filter components) so adding any new category later — furniture or otherwise — doesn't require new templates, only new product data and attribute sets.

---

## 6. Mobile-First Breakpoint Rules

| Breakpoint | Target | Key Behavior |
|---|---|---|
| < 576px | Mobile (primary design target) | Single-column layout, bottom-sheet filters, sticky Add-to-Basket bar, hamburger nav |
| 576–991px | Tablet | 2-column product grid, filter drawer retained |
| ≥ 992px | Desktop | Sidebar filters, multi-column grid, hover-based gallery previews |

All components are designed mobile-first and scaled up, not the reverse.

---

## 7. Technical Notes (still GUI-layer, no architecture change)

- Clone nopCommerce's **Responsive** theme as the base (`theme.json`, `_ViewImports.cshtml`, view overrides) rather than starting from a blank theme — preserves built-in RTL/accessibility/localization plumbing.
- Image pipeline: responsive `srcset`/WebP output, lazy-loading — critical for furniture given large image counts per product.
- Add Schema.org `Product` structured data (price, availability, reviews) at the template level for SEO.
- Swatch/variant UI maps to nopCommerce's existing product attribute/combination system — no new data model needed.

---

## 8. Open Items / Decisions Needed Before Build

- [ ] Finalize color palette + typography choices (or select 2–3 reference sites to anchor direction — e.g., Article, Made.com, Loaf)
- [ ] Confirm which payment/BNPL plugins will actually be installed (affects badge placement only, not layout logic)
- [ ] Confirm whether reviews will use Trustpilot or nopCommerce's native review system (affects PDP slot design)
- [ ] Confirm brand name/logo assets

---

## 9. Suggested Build Path

1. Approve/adjust this spec
2. Reference-site pass (optional) to lock exact visual direction
3. Build theme files (Razor views, SCSS, JS) — either generated here for manual integration, or via Claude Code directly against your repo
4. Integrate into a cloned Responsive theme structure, test across breakpoints
5. QA against UK compliance checklist (Section 4) before launch

---

## 10. How to Use Claude to Build This

Two different Claude surfaces are useful here, for two different jobs:

### A. Claude.ai (this chat) — planning, design, and content
Good for: refining this spec, generating copy/content blocks, producing individual Razor/CSS snippets to paste in yourself, reasoning through UX decisions, generating reference images for design direction. Not ideal for large multi-file changes against a real repo, since it can't directly browse or execute inside your project folder session-to-session.

### B. Claude Code — actual implementation against your repository
This is the better tool for the real build, because it can read your actual nopCommerce solution, create/edit multiple files (Razor views, `theme.json`, SCSS, JS) directly in place, and run builds/tests. Recommended workflow:

1. **Clone your nopCommerce repo locally** and open it wherever you run Claude Code (terminal, VS Code extension, JetBrains, or the desktop app).
2. **Give Claude Code this spec as context** — literally point it at this markdown file first: *"Read nopCommerce-Furniture-Theme-Spec.md, then clone the Responsive theme into a new theme folder called X and scaffold the file structure per the spec."*
3. **Work in small, reviewable increments**, not one giant prompt:
   - Step 1: scaffold the new theme folder + `theme.json` + register it
   - Step 2: homepage layout
   - Step 3: category/listing page
   - Step 4: PDP components (gallery, swatch selector, spec table, dimension guide)
   - Step 5: cart/checkout restyle
   - Step 6: UK compliance elements (VAT display, cookie consent, footer)
   - Step 7: responsive/mobile QA pass
4. **Ask it to explain, not just generate** — e.g. "show me which files you changed and why" — so you can confirm it touched only theme/view files and nothing in `Nop.Services`, `Nop.Core`, or the data layer.
5. **Use version control aggressively** — commit after each step so you can diff exactly what Claude Code changed and roll back cleanly if something drifts from "theme-only."
6. **Test locally after each increment** (`dotnet build` / run the site) rather than after the whole theme is built, so problems are caught early and stay small.

### Practical tip
Keep this spec file in your repo (e.g. `/docs/theme-spec.md`) and reference it in every Claude Code session — it acts as a persistent shared context so you don't have to re-explain the design intent each time, and it keeps the "no architecture change" constraint explicit and enforced across sessions.
