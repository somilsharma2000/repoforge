# 🔥 RepoForge — Turn Open-Source Into Income

**The catalog of verified open-source GitHub repositories with step-by-step money-making guides.**

Every field. Every niche. Every industry — AI, automation, chatbots, CRM, social media, lead generation, banking, healthcare, security, YouTube/Instagram tools, and 20+ more. Each repo is hand-verified and paired with a complete **"from scratch to money"** guide written for a beginner.

## 📊 What's Inside

| | |
|---|---|
| **Verified repos** | 96 (growing weekly — 500+ niches mapped) |
| **Industry fields** | 24 |
| **Niches mapped** | 535 |
| **Business ideas** | 3 per repo (288+ total) with target customers & pricing |
| **Guides** | Step-by-step, 10th-grade reading level, every tool explained |
| **License analysis** | Every repo flagged 🟢 safe-to-sell or 🔴 check-first |

## 🚀 Live Site

The website is a **zero-dependency static site** — plain HTML/CSS/JS, no build step, no frameworks. It deploys to GitHub Pages for free.

**Deploy it in 3 clicks:**
1. Push this repo to GitHub
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)` → Save

The site goes live at `https://<your-username>.github.io/repoforge/`.

**Run locally:**
```bash
cd repoforge
python3 -m http.server 8000
# open http://localhost:8000
```
(Any static server works. Don't open index.html directly from disk — browsers block fetch of local JSON files.)

## 📁 Project Structure

```
repoforge/
├── index.html              # The catalog site (GitHub Pages entry point)
├── app.js                  # Search, filters, cards, modal, guide renderer (vanilla JS)
├── style.css               # Dark-theme design system
├── data/
│   ├── repos.json          # 96 verified repos — full data + step-by-step guides
│   └── taxonomy.json       # The 533-niche map across 24 industry fields
├── docs/
│   ├── REQUIREMENTS.md     # Product requirements & specification
│   ├── TAXONOMY.md         # Human-readable niche map (all 24 fields)
│   └── DATA_PIPELINE.md    # How repos are researched & verified
└── README.md               # This file
```

## 🎯 Who This Is For

- **Students & beginners** — find a niche, copy the guide, launch your first product
- **Freelancers & agencies** — pick a vertical (CRM, booking, analytics…) and sell implementations
- **Founders** — de-risk your next SaaS: use verified open-source instead of building from scratch
- **Developers** — the license analysis alone saves you from accidentally shipping AGPL code

## 💰 The Product

The full bundle sells for **$49 one-time**: every guide, every business idea, every license analysis, plus lifetime updates as new niches get researched. The catalog site is the storefront.

## 🗺️ Roadmap

- [x] Niche taxonomy — 533 niches across 24 fields
- [x] 96 verified repos with full money guides
- [ ] Wave 2 research: Security, DevOps extras, Productivity, Real Estate, Travel, Food, Legal, Agriculture, Science, Web3, Maps, Sports (~180 more niches)
- [ ] 300+ repos: full coverage of all 533 niches
- [ ] Combo playbooks: multi-repo stacks for specific businesses
- [ ] Decision tree: "answer 5 questions → get your perfect niche"

## 📄 Data

Every repo record contains: name, GitHub URL, field, niche category, description, star count (verified on GitHub), exact SPDX license, license-safety flag, difficulty, 3 buyer-ready business ideas, monetization path, production caveats, install commands, and a full step-by-step guide (~7,500 chars) covering: what it is → get the code → install → set up → money-making features → deploy → sell → maintain.

See [docs/DATA_PIPELINE.md](docs/DATA_PIPELINE.md) for how research and verification works, and [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) for the product spec.

## ⚖️ License

Site code: proprietary — © 2026 RepoForge. Third-party repositories listed in the catalog each carry their own licenses (documented per-repo); RepoForge does not redistribute their source, only analysis and guides.
