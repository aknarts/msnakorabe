---
date: 2026-02-13
topic: "MŠ Na Korábě - Website Redesign"
status: validated
---

# MŠ Na Korábě — Website Redesign

## Problem Statement

The kindergarten MŠ Na Korábě (Praha 8) has an outdated website built with early-2000s technology (FrontPage templates, table-based layout, Comic Sans, neon colors, no responsive design). The content is actually good — the school has impressive offerings (sauna, salt cave, award-winning cafeteria, nature trips) — but the presentation buries it. Parents checking on their phones get an unusable experience.

We're building a modern, clean replacement that reorganizes the existing content into a logical structure, looks professional on all devices, and is easy to update with yearly announcements.

## Constraints

- **KISS** — this is a kindergarten site, not a web app. Minimal tooling, minimal complexity.
- **Czech language only** — all content stays in Czech.
- **Static output** — must produce plain HTML/CSS that can be hosted anywhere (Netlify, GitHub Pages, any cheap hosting).
- **Content separation** — announcements and yearly-changing content must be easy to update without touching templates.
- **Archive original** — all content and images from the original site must be archived locally as reference material, since the original hosting is unreliable.
- **No backend, no database, no CMS** — just static files.

## Approach

**Astro + Tailwind CSS** static site with content in Markdown files.

Why Astro:
- Purpose-built for content-heavy static sites
- Markdown content collections are a first-class feature
- Zero JavaScript shipped to the browser by default
- Simple mental model: pages + layouts + content files

Why not alternatives:
- **Plain HTML/CSS** — too tedious to maintain, no templating, announcement updates require editing HTML
- **Next.js/Nuxt** — massive overkill, ships JS runtime for no reason
- **Hugo/Jekyll** — viable but Astro's content collections are more ergonomic and Tailwind integration is smoother
- **WordPress/CMS** — overkill, hosting complexity, security surface, the school updates content ~3 times/year

Content in Markdown because:
- Clean separation of content from presentation
- Trivial to update (edit a text file, push)
- Future-proof: can bolt on Decap CMS later if a web UI is ever needed
- Git-tracked: every change is versioned

## Architecture

### Project Structure

```
skolkanakorabe/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Main layout (nav, footer, meta)
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── o-nas.astro               # About page
│   │   ├── program.astro             # Activities + clubs
│   │   ├── tridy.astro               # Classes & teachers
│   │   ├── pro-rodice.astro          # For parents (docs, FAQ, announcements)
│   │   └── kontakt.astro             # Contact info
│   ├── components/
│   │   ├── Header.astro              # Navigation
│   │   ├── Footer.astro              # Footer
│   │   ├── AnnouncementCard.astro    # Announcement display component
│   │   ├── ClassCard.astro           # Teacher/class card
│   │   ├── ActivityCard.astro        # Activity/club card
│   │   └── FaqItem.astro             # Collapsible FAQ item
│   └── styles/
│       └── global.css                # Tailwind imports + custom styles
├── content/
│   ├── announcements/                # Yearly-changing content
│   │   ├── 2026-zapis.md
│   │   └── 2026-otevrene-dvere.md
│   ├── documents/                    # Document links/metadata
│   │   └── enrollment.md
│   └── config.ts                     # Astro content collection schemas
├── public/
│   ├── images/                       # Site images
│   ├── documents/                    # Downloadable PDFs
│   └── favicon.svg
├── archive/                          # Archived original site (reference only)
│   ├── html/                         # Original HTML pages
│   ├── images/                       # Original images
│   ├── documents/                    # Original PDFs
│   └── README.md                     # Notes about the archive
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

### Content Collections

Two Astro content collections:

**announcements** — the stuff that changes:
- Fields: title, date, priority (normal/high/urgent), active (boolean), body
- Sorted by date descending
- Homepage shows active announcements, "pro-rodice" page shows all
- High/urgent priority gets visual emphasis on homepage

**documents** — downloadable files metadata:
- Fields: title, category (enrollment/rules/forms/other), file path, date
- Rendered as organized download lists on the "pro-rodice" page

Stable content (about, FAQ, classes, activities, contact) lives directly in `.astro` page files since it changes rarely. If it ever needs to become dynamic, extracting to markdown is trivial.

## Components

### BaseLayout
- Responsive navigation (hamburger on mobile)
- Footer with contact summary and quick links
- Meta tags for SEO (Czech language, description, Open Graph basics)
- Consistent page wrapper with max-width

### Header/Navigation
- School logo/name
- 6 nav items: Domů, O nás, Program, Třídy, Pro rodiče, Kontakt
- Mobile: hamburger menu with slide-out nav
- Active page highlighting

### Homepage (index.astro)
- Hero section: school name, motto, inviting photo
- Pinned announcements section (pulled from content/announcements where active=true)
- Quick highlights: 3-4 cards showcasing key features (sauna, salt cave, garden, cafeteria awards)
- Quick contact info strip
- Links to key sections

### AnnouncementCard
- Displays a single announcement with date, title, body
- Visual priority levels (urgent = red accent, high = yellow, normal = standard)
- Links to referenced PDFs

### FaqItem
- Collapsible question/answer using HTML `<details>/<summary>` (zero JS needed)
- Clean typography for readability

## Data Flow

Simple and linear:

1. **Content authors** (realistically: you) edit `.md` files in `content/announcements/`
2. **Astro build** reads markdown, applies layouts, generates static HTML
3. **Static HTML** gets deployed to hosting (Netlify/GitHub Pages/whatever)
4. **Parents** visit the site, get fast static pages

For yearly updates:
1. Create new `.md` file in `content/announcements/` with the new info
2. Set old announcements to `active: false` (they stay archived)
3. Push to git → auto-deploy

## Page Content Mapping (from original site)

### Homepage
- Motto from original homepage
- Active announcements (enrollment, open days — currently the neon blocks)
- Feature highlights extracted from "Aktivity" page

### O nás (About)
- Content from original "O nás" page (philosophy, two locations, garden, cafeteria)
- Staff overview merged from "Zázemí" page (kitchen staff, support staff)
- School photos

### Program (Activities + Clubs)
- Full activity list from original "Aktivity" page (sauna, salt cave, nature trips, tech, etc.)
- Club list from original "Kroužky" page (English, ceramics, swimming, flute, yoga, kung-fu, preschool prep)
- Activity photos

### Třídy (Classes)
- 5 classes with teachers from original "Třídy" page
- Virtual tour link
- Class photos if available

### Pro rodiče (For Parents)
- FAQ content from original "Dotazy" page (operating hours, what to bring, adaptation, meals, etc.)
- Document downloads from original "Dokumenty" page (enrollment forms, school rules, etc.)
- Announcements archive
- Useful links from original "Odkazy" page (Moodle, photo gallery, municipal links)
- Budget documents from "Odkazy"

### Kontakt (Contact)
- All contact info from original "Kontakt" page
- Embedded map for both locations (Na Korábě 2 and Lindnerova 1)
- Operating hours from FAQ

## Design Direction

### Visual Style
- **Warm and inviting** — soft color palette inspired by the boat/koráb theme
- **Primary colors:** Deep blue (navy/boat theme) + warm accent (amber/orange)
- **Background:** Clean white/light gray, no sky backgrounds
- **Typography:** Modern, readable sans-serif (Inter or similar). NOT Comic Sans.
- **Rounded corners, soft shadows** — friendly, approachable feel
- **Playful touches:** Subtle boat/wave motifs in headers or dividers, but tasteful

### Responsive Design
- **Mobile-first** — parents check this on phones
- Navigation collapses to hamburger on mobile
- Content reflows naturally
- Touch-friendly tap targets
- Images scale appropriately

### Accessibility
- Semantic HTML (proper headings, landmarks, lists)
- Sufficient color contrast
- Alt text on all images
- Keyboard navigable

## Error Handling Strategy

This is a static site — there's very little that can go wrong at runtime:
- **404 page** — custom Astro 404 page with navigation back to home
- **Missing images** — alt text covers it; archive ensures we have originals
- **Broken PDF links** — PDFs hosted locally in `public/documents/`, not linked to external site

## Testing Strategy

- **Visual review** — check all pages on mobile, tablet, desktop
- **Content accuracy** — verify all text matches original site content
- **Link checking** — ensure all internal links and PDF downloads work
- **Lighthouse audit** — aim for 90+ on performance, accessibility, SEO
- **Browser testing** — Chrome, Firefox, Safari (the parents' likely browsers)

## Archive Strategy (Original Site)

Before building anything, archive the entire original site:
- Download all HTML pages
- Download all images (`images/` directory)
- Download all linked PDFs and documents
- Store in `archive/` directory with a README explaining the source
- This serves as both reference material and backup if the original goes down

## Open Questions

None — scope is clear, content is inventoried, tech is decided. Ready to build.
