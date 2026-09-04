# Data Pipeline — How Repos Are Researched & Verified

## Research method

Each research wave assigns niche lists to parallel research agents. For every niche:

1. **Find the best repo.** Start from the seed repo if the taxonomy has one; otherwise search GitHub and Google for the strongest project in that niche.
2. **Verify on GitHub directly** (never from memory or third-party lists):
   - Exact star count at time of research
   - Exact SPDX license from the LICENSE file
   - Last commit date (must be actively maintained — commits in 2025–2026)
   - README read in full
3. **Write the commercial analysis:**
   - `description` — plain English, what it actually does
   - `buyer_idea` — 3 SPECIFIC business ideas: product + target customer + price point
   - `monetization_path` — pricing tiers for a business built on the repo
   - `production_caveat` — what breaks at scale, license traps, operational costs
   - `how_to_use` — install commands and key setup steps
4. **Generate the step-by-step guide** from the analysis using the standard template:
   what it is → get the code → install → set up → money-making features → deploy (Vercel/Coolify/Railway) → sell (Stripe/Gumroad/customers) → maintain.

## License safety rules

| Verdict | Licenses | Meaning |
|---|---|---|
| 🟢 Safe | MIT, Apache-2.0, ISC, BSD-2/3-Clause, MPL-2.0, PostgreSQL | Build, modify, and sell products commercially |
| 🔴 Caution | AGPL-3.0, GPL-3.0, LGPL, BSL/FSL, Sustainable Use, commercial | Restrictions apply: open-source obligations, SaaS limits, or embedding clauses — read the LICENSE before selling |

Copyleft repos are intentionally included — knowing *why* a license is risky is half the product's value.

## Data flow

```
research agents (per field)
        │  research-<field>.json
        ▼
merge + dedupe + field assignment
        │  master-repos-final.json
        ▼
guide generation (standard template, ~7,500 chars each)
        │
        ▼
data/repos.json  ──►  GitHub Pages site (this repo)
```

## Update cadence

- Wave-based research: each wave covers multiple fields in parallel.
- After each wave: merge, regenerate guides, rebuild `data/repos.json`, commit, and the live site updates automatically on the next push.
- Niches still missing a repo stay visible in the Niche Map as *(researching)* — never filled with a weak candidate.
