# Product Requirements — RepoForge

## 1. Vision

A commercial catalog that turns verified open-source repositories into actionable business opportunities. One product covers **every industry field and niche** where open-source software can become a sellable product — from AI chatbots and end-to-end automation to CRM, lead generation, social media management, banking tools, healthcare systems, security, and creator platforms (YouTube, Instagram, Facebook).

**Positioning:** $49 one-time premium bundle. Sells time compression (50–100 hours of research saved per niche) and legal risk mitigation (license analysis for every repo).

## 2. Goals

1. Cover **533 mapped niches across 24 industry fields** with at least one verified repo each.
2. Every repo ships a step-by-step "from scratch to money" guide at a 10th-grade reading level — every tool explained, every command given.
3. Zero fluff: real star counts verified on GitHub, exact SPDX licenses, real install commands, production caveats.
4. The website must be: static (no backend), zero-dependency (vanilla HTML/CSS/JS), deployable on GitHub Pages for free.

## 3. Core Entities

### Repo record (data/repos.json)
| Field | Type | Notes |
|---|---|---|
| `name` | string | `owner/repo` |
| `github_url` | string | Direct link |
| `field` | string | One of 24 industry fields |
| `category` | string | The niche (maps to taxonomy) |
| `description` | string | Plain English, what it does |
| `stars` | number | Verified on GitHub, not estimated |
| `license` | string | Exact SPDX name |
| `license_safe` | boolean | 🟢 MIT/Apache/ISC/BSD/MPL/PostgreSQL vs 🔴 AGPL/GPL/BSL/FSL/commercial |
| `difficulty` | string | Beginner / Intermediate / Advanced |
| `buyer_idea` | string | 3 SPECIFIC ideas: product + target customer + price |
| `first_idea` | string | Top idea, short form for cards |
| `monetization_path` | string | Pricing tiers for the business built on it |
| `production_caveat` | string | What breaks at scale, license traps |
| `how_to_use` | string | Install commands + key setup |
| `step_by_step_guide` | string | Full guide (~7,500 chars): what → code → install → setup → money features → deploy → sell → maintain |

### Niche taxonomy (data/taxonomy.json)
24 fields → 533 niches. Each niche: name + seed repo. Coverage status is computed by matching niches to repo categories.

## 4. Website Requirements

- **Catalog grid:** responsive cards (name, stars, license badge, field, difficulty, description), sorted by stars by default.
- **Search:** full-text across name, field, category, description, and business ideas.
- **Filters:** field (24), license safety, difficulty. Sort: stars / name.
- **Detail modal:** full record + rendered guide (headings, lists, code blocks, tables) + GitHub link.
- **Niche Map section:** all 24 fields with per-niche coverage status (covered vs. researching next).
- **Pricing section:** $49 one-time, feature list, CTA.
- **Stats:** repo count, niche count, field count, business-idea count — computed from data, never hardcoded.
- **No build step, no CDN dependencies, no backend.** Must work on GitHub Pages exactly as committed.

## 5. Data Quality Rules

1. Star counts and licenses are **verified directly on GitHub** — never estimated.
2. Repos must be **actively maintained** (commits in 2025–2026).
3. `buyer_idea` must be **specific**: actual product, actual target customer, actual price point — never "build a SaaS on it".
4. Copyleft (AGPL/GPL) repos are **included**, not excluded — the license analysis is part of the product value.
5. If a niche has no viable open-source project, it stays in the taxonomy flagged "researching" — never filled with a weak repo.

## 6. Non-Goals

- Not a code marketplace — we sell analysis and guides, not the software itself.
- Not an automated scraper — research is agent-verified per repo.
- Not paywalled content on the site — the catalog is the storefront; the bundle is the product.

## 7. Success Metrics

- ≥ 300 verified repos across all 24 fields (Phase 1)
- 100% of 533 niches either covered or explicitly flagged researching
- Every guide ≥ 4,000 chars with all 7 steps present
- Site loads < 3s on GitHub Pages (data file kept under 5 MB)
