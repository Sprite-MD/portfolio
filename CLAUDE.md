# Portfolio — CLAUDE.md

## Project Overview

Personal portfolio site for **Wasin Ponkaew**, Software Engineer based in Chicago, IL.
This is an ongoing project that grows as new projects are completed.

GitHub repo: `portfolio` (github.com/Sprite-MD/portfolio)

---

## File Structure

```
portfolio/
├── index.html    # All markup — nav, home, projects, skills, contact sections, footer
├── style.css     # All styles — organized by section with comment headers
├── main.js       # Theme toggle, scroll navigation, scroll-spy, contact form stub
└── CLAUDE.md     # This file
```

No build step. No dependencies. Plain HTML, CSS, and JS — open `index.html` directly in a browser.

---

## Layout

Single-page scroll layout. All four sections (`#page-home`, `#page-projects`, `#page-skills`, `#page-contact`) are always visible and stacked vertically. The nav bar is sticky (`position: sticky; top: 0`).

- **Nav buttons** call `scrollToSection(name)` → `scrollIntoView({ behavior: 'smooth' })`
- **Active nav highlight** is driven by an `IntersectionObserver` in `main.js` (rootMargin `-10% 0px -85% 0px`), not by click handlers
- **`scroll-margin-top: 52px`** on `.page` prevents the sticky nav from overlapping section headings when scrolled into view
- **`html { scroll-behavior: smooth }`** in `style.css` provides a CSS-level fallback

There is no tab-switching or `display: none/block` toggling. Do not reintroduce that pattern.

---

## Design System

### Theme
Terminal / GitHub dark — dark mode is the default. A light mode is also supported via a toggle button in the nav bar. Do not remove the theme toggle or change the default without explicit instruction.

- `data-theme="dark"` is set on `<html>` and is the default
- `data-theme="light"` is applied by `toggleTheme()` in `main.js` and persisted to `localStorage`
- Light mode overrides live in the `[data-theme="light"]` block at the bottom of `style.css`
- The theme IIFE at the top of `main.js` restores saved preference on load (only if a value is set — the HTML default is used otherwise)

### Colors (CSS variables in `style.css`)

Dark mode defaults (`:root`):

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0d1117` | Page background |
| `--surface` | `#161b22` | Cards, nav |
| `--surface2` | `#1c2330` | Inputs, skill bar tracks, secondary surfaces |
| `--border` | `#30363d` | All borders |
| `--accent` | `#58a6ff` | Blue — primary accent, links |
| `--accent2` | `#3fb950` | Green — active states, "open to work" |
| `--text` | `#e6edf3` | Body text |
| `--muted` | `#8b949e` | Labels, secondary text |

Light mode overrides are defined in `[data-theme="light"]` in `style.css`. Card elevation in light mode is achieved with `box-shadow` rather than border changes.

### Chip / Tag Category Colors (fixed — used across Home, Projects, Skills)
| Category | Color | CSS prefix |
|---|---|---|
| Languages | Blue `#58a6ff` | `lang` |
| Data | Green `#3fb950` | `data` |
| ML & AI | Purple `#a78bfa` | `ml` |
| Tools | Gray `#8b949e` | `infra` |

**Rule:** Do not add new color categories without updating Home (tech stack chips),
Projects (project tags), and Skills (skill bars and section titles) consistently.

### Typography
- Font: `Courier New`, monospace — everywhere, no exceptions
- Do not introduce a second typeface

---

## Locked Design Rules

1. **Terminal theme stays** — monospace font, CLI-style prompt lines on each page; dark is the default but light mode is supported
2. **No CSS frameworks** — no Tailwind, Bootstrap, etc.
3. **No JS frameworks** — no React, Vue, etc.
4. **No build tools** — no Webpack, Vite, etc. (unless explicitly decided with the user)
5. **Monospace font only** — `Courier New` is part of the identity
6. **No fake metrics** — star counts were removed because fake data hurts credibility; don't re-add unless pulling live from the GitHub API
7. **Color system is fixed** — 4 categories, 4 colors; don't invent new ones unilaterally
8. **Single-page scroll layout is locked** — do not reintroduce tab-switching or `showPage()`

---

## Categorizing New Technologies

When the user provides a new library, framework, language, or tool to add to the site,
use this decision tree to assign it to the correct category:

### Decision tree

```
Is it a programming language (including markup/query languages)?
  YES → lang (blue)   e.g. Python, TypeScript, SQL, HTML, CSS, Rust, Go

Is it primarily for data wrangling, analysis, or visualization?
  YES → data (green)  e.g. Pandas, NumPy, Spark, dbt, Tableau, Power BI

Is it primarily for machine learning, AI, or statistics?
  YES → ml (purple)   e.g. TensorFlow, Scikit-learn, PyTorch, HuggingFace, LangChain

Everything else (frameworks, runtimes, infra, DevOps, databases, cloud, editors)?
  → infra (gray)      e.g. React, Node.js, Docker, Git, AWS, PostgreSQL, Express, Vite
```

### Ambiguous cases
- **Full-stack frameworks** (Next.js, Django, FastAPI) → `infra`
- **Databases** (PostgreSQL, MongoDB, Redis) → `infra`
- **Cloud platforms** (AWS, GCP, Azure) → `infra`
- **ORMs / query builders** (Prisma, SQLAlchemy) → `infra`
- **Notebook environments** (Jupyter) → `data` if used for analysis, `infra` otherwise
- **Something that genuinely doesn't fit** → ask the user before creating a new category

### Adding to all three places
When a new technology is added, update it consistently across:
1. Home page tech stack table (`#page-home`)
2. Projects page — tag any relevant project cards
3. Skills page — add a skill bar entry (ask the user for the proficiency level)

---

## Adding a New Project

Edit the `#page-projects` section in `index.html` directly. Copy this card template:

```html
<a class="proj-card" href="GITHUB_URL" target="_blank">
  <div class="proj-header">
    <span class="proj-name">repo-name</span>
  </div>
  <div class="proj-desc">
    One or two sentences describing what the project does.
  </div>
  <div class="proj-tags">
    <span class="proj-tag lang">TypeScript</span>
    <span class="proj-tag infra">Node.js</span>
  </div>
</a>
```

Tag classes: `lang`, `data`, `ml`, `infra` — match the category color system above.

**After adding a project:** Update the `projects built` stat card value on the Home page.

### Migration threshold
The project count is currently **4**. When it reaches **6 or more**, consider migrating to a `projects.json` data file rendered by a JS function, so adding a project only requires a new JSON entry rather than editing HTML markup. Ask the user before doing this.

---

## Updating the Stats (Home Page)

Two stat cards are tied to real data — keep them accurate:

| Card | How to update |
|---|---|
| `projects built` | Count of `<a class="proj-card">` elements in `#page-projects` |
| `languages` | Count of `<span class="chip lang">` elements in the Home tech stack table |

---

## Pending TODOs

- [ ] Confirm exact GitHub username URL slug (`Sprite-MD` is assumed — verify)
- [ ] Add profile photo (swap `<span>WP</span>` for `<img>` tag, file: `photo.jpg`)
- [ ] Add resume PDF (file: `resume.pdf` in project root, nav link already wired)
- [ ] Write a real bio (currently a one-liner placeholder)
- [ ] Fill in skill proficiency percentages (all bars are placeholder `80%`)
- [ ] Wire up contact form (Formspree or EmailJS — stub is in `main.js`)
- [ ] Add favicon (`<link rel="icon">` in `<head>`)
- [ ] Add OG meta tags for link previews (LinkedIn, iMessage, etc.)
- [ ] Decide on deployment target (GitHub Pages, Netlify, Vercel, or custom)
- [ ] Get a custom domain

---

## Known Gaps / Design Debt

- Skill bar percentages are all `80%` — need real values from the user
- Contact form submits nothing — needs Formspree/EmailJS integration
- No hash routing for sections — refreshing the page always returns to the top
- GitHub project links use placeholder URLs — update when repos are public
