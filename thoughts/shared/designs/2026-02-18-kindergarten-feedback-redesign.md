---
date: 2026-02-18
topic: "Kindergarten Website Feedback — Content Fidelity, Visual Spirit, Content Parametrization"
status: validated
depends_on: "2026-02-13-kindergarten-site-redesign.md"
---

# Kindergarten Website Feedback Redesign

## Problem Statement

The kindergarten staff reviewed the new website and raised three concerns:

1. **Content drift** — Texts were rewritten/condensed during the redesign. The FAQ lost 2 items and detail. The philosophy, kitchen descriptions, and school information were paraphrased away from the original voice.
2. **Missing spirit** — The old site had kid-painted suns, sky backgrounds, and a warm feel. The new site is too corporate/sterile for a kindergarten. Target audience is parents with young children — the site needs to communicate "fun" and stand out from competitors.
3. **Content is not manageable** — FAQ items, personnel, documents, and useful links are hardcoded in `.astro` files. A non-technical staff member cannot update content without developer help.

## Constraints

- Zero JavaScript — site must remain pure static HTML/CSS (current strength)
- Astro + Tailwind CSS stack — no framework changes
- GitHub Pages deployment via GitHub Actions — no infrastructure changes
- Content must be editable by someone with limited technical knowledge (markdown/YAML files only)
- Original Czech texts from the archive are the source of truth
- Useful links section must be easily verifiable by city council (Praha 8)
- No external CMS — files in the repo are the content store

## Approach

Three parallel workstreams that reinforce each other:

### Workstream 1: Content Restoration
Go back to the archive HTML files and restore original texts **verbatim**. Stop paraphrasing — the kindergarten's authentic voice already exists.

### Workstream 2: Visual Warmth
Keep the modern Tailwind foundation but shift the palette, typography, and decorative layer from "corporate" to "warm & playful." Use existing assets (sun paintings, sky background, real photos).

### Workstream 3: Content Parametrization
Extend the announcements pattern (markdown + frontmatter) to FAQ, documents, personnel, and links. All human-readable content moves out of `.astro` files into `content/` or `data/`.

## Architecture

### Directory Structure (Target State)

```
src/
├── content/                    # Astro Content Collections (markdown)
│   ├── announcements/          # ✅ Already exists — no changes
│   │   ├── 2024-skolne.md
│   │   └── ...
│   ├── faq/                    # 🆕 One .md per Q&A item
│   │   ├── 01-provozni-doba.md
│   │   ├── 02-co-potrebuje-dite.md
│   │   ├── 03-adaptace.md
│   │   ├── 04-spanek.md
│   │   ├── 05-predavani-na-chodbe.md
│   │   ├── 06-omlouvani.md
│   │   ├── 07-stravovani.md
│   │   ├── 08-krouzky.md
│   │   ├── 09-krouzky-male-deti.md
│   │   ├── 10-nemoc.md
│   │   ├── 11-akce.md
│   │   ├── 12-moodle.md
│   │   └── 13-konzultace.md
│   └── links/                  # 🆕 One .md per useful link (or YAML)
│       ├── moodle.md
│       ├── fotogalerie.md
│       ├── praha8.md
│       └── ...
├── data/                       # 🆕 Structured YAML config files
│   ├── site.yaml               # Global config: name, motto, contacts, hours, addresses
│   ├── personnel.yaml          # All staff: management, classes, kitchen, other
│   └── documents.yaml          # Document manifest: filename → title + category + active
├── pages/                      # Astro pages — become pure templates
│   ├── index.astro
│   ├── o-nas.astro
│   ├── program.astro
│   ├── tridy.astro
│   ├── pro-rodice.astro
│   ├── kontakt.astro
│   └── odkazy.astro            # 🆕 Dedicated useful links page
├── components/                 # UI components — no hardcoded text
│   ├── Header.astro
│   ├── Footer.astro
│   ├── FaqItem.astro
│   ├── AnnouncementCard.astro
│   ├── FeatureCard.astro
│   └── DocumentList.astro      # 🆕 Renders documents from manifest
├── layouts/
│   └── BaseLayout.astro
└── styles/
    └── global.css              # Updated theme: playful palette + friendly font
```

## Components

### Content Collections (Markdown)

**FAQ Collection** (`src/content/faq/`)
- Schema: `question` (string), `order` (number), `active` (boolean, default true)
- Body: The answer in markdown
- Sorted by `order` field, filtered by `active`
- Each file = one Q&A pair, editable independently

**Links Collection** (`src/content/links/`)
- Schema: `title` (string), `url` (string), `description` (string, optional), `category` (enum: 'portal', 'municipality', 'budget', 'regulation'), `order` (number), `active` (boolean)
- Grouped by category on the odkazy page
- City council can verify by looking at one page

### Data Files (YAML)

**site.yaml** — Global configuration
- School name, motto, philosophy text (the full original paragraph)
- Contact info: director name/phone/email, deputy name/phone/email
- Building addresses (Na Korábě, Lindnerova)
- Opening hours
- Data box ID
- Absence email address

**personnel.yaml** — All staff organized by role
- Management section: director, deputy (name, title, phone, email)
- Classes section: array of classes, each with name, emoji, building, teachers array (name, role, qualifications)
- Kitchen section: cafeteria manager, cooks per building (name, role)
- Other staff section: janitor, cleaners (name, role)

**documents.yaml** — Document manifest
- Array of entries: filename (in public/documents/), display title, category (enrollment, rules, nature-school, gdpr, budget), active flag
- Pages render document lists by filtering this manifest by category
- Adding a new document = upload PDF + add one YAML entry

### Pages (Templates)

All pages become **data-driven templates** that read from content collections and data files:

- `index.astro` — reads site.yaml for motto/philosophy, announcements collection for news, site.yaml for contact
- `o-nas.astro` — reads site.yaml for philosophy/school description, personnel.yaml for kitchen staff, site.yaml for building info
- `tridy.astro` — reads personnel.yaml for all class/teacher data
- `pro-rodice.astro` — reads announcements collection, faq collection, documents.yaml
- `kontakt.astro` — reads site.yaml for all contact info, personnel.yaml for management
- `odkazy.astro` — reads links collection, documents.yaml for budget documents

### Visual Theme Changes

**Color Palette (global.css update):**
- Primary shifts from navy to a warmer palette — sunshine yellow/amber as hero color
- Navy becomes secondary (still used for text and anchoring elements)
- Add soft green, coral pink, sky blue as section accent colors
- Backgrounds shift from white to warm cream/beige tones
- Cards get subtle colored borders or backgrounds per section

**Typography:**
- Headings: Switch to a rounded/friendly font family (Nunito, Quicksand, or Fredoka One) — this is the single biggest "feel" change
- Body: Keep Inter for readability
- Import the heading font via Google Fonts in BaseLayout

**Decorative Layer:**
- Restore sun1a.gif and sun2a.gif as decorative elements (header area or section dividers)
- Use obloha1.jpg as hero section background with warm overlay
- Add CSS-only wavy dividers between page sections (SVG wave shapes in CSS)
- Replace emoji icons in feature cards with the actual photos (img5A.jpg for sauna, img5F.jpg for salt cave, etc.)
- Add subtle background patterns at low opacity (dots, waves, or clouds)

## Data Flow

1. **Non-technical editor** creates/edits a `.md` or `.yaml` file
   - Via GitHub web UI (click file → edit → commit)
   - Or via local text editor + git push
   - Or via any git-compatible tool
2. **Push to main** triggers GitHub Actions build
3. **Astro build** reads all content collections and data files
   - Validates schemas with Zod (catches errors at build time)
   - Renders markdown to HTML
   - Assembles pages from templates + data
4. **Static HTML/CSS** deployed to GitHub Pages
5. **Site is live** — no runtime, no database, no server

## Error Handling

- **Schema validation:** Astro Content Collections use Zod schemas. Missing required fields or wrong types cause build failure with clear error messages pointing to the offending file
- **Missing documents:** Build-time check can verify that filenames in documents.yaml exist in public/documents/
- **Empty collections:** Pages handle zero-item collections gracefully (hide section or show "no items" message)
- **Broken links in useful-links:** URL format validation in schema
- **Build failure notification:** GitHub Actions reports build status — failed deploys don't affect the live site

## Testing Strategy

- **Content validation:** Zod schemas catch malformed content at build time
- **Content accuracy:** Side-by-side comparison of every restored text against the archive HTML originals — must be 1:1
- **Visual review:** Screenshot comparison of key pages before/after the visual changes
- **Responsiveness:** Check mobile, tablet, desktop for all pages after theme changes
- **Link verification:** Build-time or CI check that document manifest entries resolve to actual files
- **Editability test:** Have a non-technical person add a new FAQ item and a new document to verify the workflow is manageable

## Content Restoration Specifics

### FAQ — All 13 Items to Restore from Archive

1. Provozní doba a předávání dětí (full original with all detail about authorized persons, ID checks, etc.)
2. Co potřebuje dítě do MŠ (full list including "kelímek s kartáčkem a pastou", "vlhčené ubrousky")
3. Adaptace dětí (full original about gradual entry)
4. Spaní (full original about relaxation and fantasy development)
5. **Předávání na chodbě** (RESTORE — was dropped: "Ne, VŽDY je potřeba předat dítě paní učitelce...")
6. Omlouvání absence (original wording)
7. Stravování (full original with times 11:30-12:15, drink regime details)
8. Nadstandardní aktivity (full list with specific items to bring for each)
9. Kroužky pro 3-4leté (original about individual readiness)
10. Nemoc dítěte (original wording)
11. Akce v MŠ (original wording)
12. **Co je Moodle** (RESTORE — was dropped: full explanation of the portal)
13. **Konzultace s učitelkou/vedením** (RESTORE — was merged: full original about scheduling)

### Homepage — Restore Philosophy

Replace the marketing tagline with the full original philosophy text from the archive:
"Uspokojovat potřeby dětí, nabízet podněty pro rozvoj individuálního potenciálu, intelektuálních, citových a sociálních schopností..."

Keep the motto "Jak si loďku postavíme, tak si na ní zajezdíme." and the ship metaphor paragraph.

### O Nás — Restore Original Descriptions

- School type: "školou rodinného typu" paragraph verbatim
- Educational program: "NA JEDNÉ LODI – KORÁBU" paragraph verbatim
- Garden: "prostornou zahradu parkového typu" paragraph verbatim
- Kitchen: "špičkové paní kuchařky" paragraph with full award history verbatim

### Useful Links — Dedicated Page

Restore all links from the archive odkazy page:
- Moodle portal
- Rajče photo gallery
- Praha 8 municipality
- All budget documents (current year)
- School district regulations (vyhlášky)

## Open Questions

1. **Photo refresh** — Existing photos are from ~2017. If newer photos are available, they should replace the old ones. Not blocking for this iteration.
2. **Content editing UX** — GitHub web UI works for YAML/MD edits. If it proves too complex, a lightweight CMS layer (Tina CMS, Decap CMS) can be added later without architectural changes.
3. **Odkazy page vs section** — Design assumes dedicated `/odkazy` page for easy council verification. Could be changed to a section on `/pro-rodice` if preferred.
