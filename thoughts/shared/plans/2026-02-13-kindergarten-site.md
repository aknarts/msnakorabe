---
date: 2026-02-13
topic: "MŠ Na Korábě - Website Implementation Plan"
design: "thoughts/shared/designs/2026-02-13-kindergarten-site-redesign.md"
status: ready
---

# Implementation Plan: MŠ Na Korábě Website

## Phase 1: Project Scaffolding

### Step 1.1: Initialize Astro project
- Run `npm create astro@latest` in the repo root (empty template, no TypeScript for KISS)
- Install Tailwind: `npx astro add tailwind`
- Verify dev server runs with `npm run dev`

### Step 1.2: Copy assets from archive
- Copy images from `archive/images/` to `public/images/`
- Copy all PDFs/documents from `archive/dokumenty/`, `archive/odkazy/`, `archive/dotazy/`, and root-level PDFs to `public/documents/` (flatten with clean filenames)
- Copy `archive/images/logo_korab.png` and `archive/images/logo.png` — these are the school logos we'll reuse

### Step 1.3: Configure Tailwind theme
- Set up color palette in tailwind.config.mjs:
  - Primary: deep navy blue (boat theme)
  - Secondary: warm amber/orange
  - Accent: soft teal/sky blue
  - Backgrounds: warm white, light gray
- Set up font family: Inter (via Google Fonts or Fontsource)
- Set up border-radius defaults (rounded-lg, rounded-xl for cards)

### Step 1.4: Set up Astro content collections
- Create `src/content/config.ts` with announcement schema:
  - title (string)
  - date (date)
  - priority ('normal' | 'high' | 'urgent')
  - active (boolean)
  - description (string, optional)
- Create `src/content/announcements/` directory
- Add current announcements as .md files:
  - `2026-zapis.md` — enrollment for 2026/2027 (March 17-18)
  - `2026-otevrene-dvere.md` — open days (Feb 11 cancelled at Lindnerova, Feb 18 still on)
  - `2025-skolne.md` — tuition fee resolution (1500 CZK)
  - `2025-potravinova-pomoc.md` — food assistance project
  - `2025-sablony.md` — OP JAK templates project

## Phase 2: Layout & Components

### Step 2.1: BaseLayout.astro
- HTML boilerplate with Czech lang attribute
- Meta tags (description, viewport, charset, Open Graph basics)
- Google Fonts link for Inter
- Tailwind global styles import
- Slot for page content
- Includes Header and Footer components

### Step 2.2: Header.astro
- School logo (logo_korab.png) linked to home
- Navigation: Domů, O nás, Program, Třídy, Pro rodiče, Kontakt
- Mobile hamburger menu (use CSS checkbox hack or minimal JS for toggle)
- Active page highlighting via Astro.url
- Sticky/fixed on scroll optional — keep it simple first

### Step 2.3: Footer.astro
- School name and address (both locations)
- Phone number and email
- Quick nav links
- Copyright notice
- Muted color scheme, compact

### Step 2.4: Reusable components
- **AnnouncementCard.astro** — card with date badge, title, body text, priority color accent (urgent=red, high=amber, normal=blue)
- **FaqItem.astro** — wraps HTML `<details><summary>` with styled question/answer
- **FeatureCard.astro** — icon/image + title + short description for homepage highlights
- **DocumentLink.astro** — PDF icon + title + file link, grouped by category

## Phase 3: Pages

### Step 3.1: Homepage (src/pages/index.astro)
- **Hero section:** School name, motto ("Jak si loďku postavíme, tak si na ní zajezdíme"), school photo (img4D.jpg or img4E.jpg), CTA button to enrollment info
- **Announcements section:** Query active announcements from content collection, render with AnnouncementCard, sorted by date desc
- **Highlights section:** 3-4 FeatureCards showcasing: vlastní sauna, solná jeskyně, oceňovaná jídelna, parková zahrada
- **Quick contact strip:** Address, phone, email — one line

### Step 3.2: O nás (src/pages/o-nas.astro)
- School philosophy and mission (from original o_nas page)
- Two locations described (Na Korábě 2 + Lindnerova 1) with photos
- Educational program "Na jedné lodi — Korábu" description
- Garden section with photos (img54.jpg, img55.jpg)
- Award-winning cafeteria section with photos (img56.jpg, kitchen photos)
- Moodle information portal mention
- PPP cooperation note
- Staff overview (from zázemí page): kitchen staff, janitor, cleaners — in a simple list/table

### Step 3.3: Program (src/pages/program.astro)
- **Activities section** (from aktivity page):
  - Zdravá ABECEDA health project
  - Own sauna (Asociace saunujících školek ČR) — photo img5A.jpg
  - Own salt cave — photo img5F.jpg
  - Nature school trips (2x/year, Šumava + Jizerské hory) — photo img5C.jpg
  - Modern tech (interactive boards, digital microscopes) — photo img5E.jpg
  - "Celé Česko čte dětem" project
  - Monthly theater performances
  - Parent events (ceramic workshops, bonfires, Christmas workshops)
  - Environmental education, gardening
  - Prevention programs
- **Clubs section** (from kroužky page):
  - Angličtina hrou
  - Keramický kroužek — photo img52.jpg
  - Plavecký kurz — photo img51.jpg
  - Hra na flétnu
  - Kroužek šikovného předškoláka
  - Kung-fu
  - Jóga

### Step 3.4: Třídy (src/pages/tridy.astro)
- Virtual tour link (http://www.virtualni-skoly.cz/skola/90-ms-na-korabe)
- 5 class cards, each with:
  - Class name (Lvíčatka, Hrošíci, Opičky, Sluníčka, Berušky)
  - Teachers listed
  - Could use animal emoji or simple icon per class for visual appeal
- Simple grid layout, 2-3 columns on desktop

### Step 3.5: Pro rodiče (src/pages/pro-rodice.astro)
- **Announcements section** — all announcements (active and archived)
- **FAQ section** — all questions from dotazy page rendered as FaqItem components:
  - Provozní doba (6:30/7:00–17:00)
  - Co potřebuje dítě do MŠ
  - Adaptace dětí
  - Spánek/odpočinek
  - Předávání dětí
  - Omlouvání
  - Stravování a pitný režim
  - Nadstandardní aktivity
  - Kroužky pro 3-4leté
  - Nemocné dítě
  - Kde se dozvím o akcích
  - Co je Moodle
  - Konzultace s učitelkou/vedením
- **Documents section** — organized by category:
  - Přijímací řízení (enrollment): žádost, evidenční list, kritéria, možnosti podání
  - Školní řád a formuláře: školní řád, dodatek Covid, pozdní příchody, zastupování, léky, nezletilý sourozenec, zdravotní posudek, prominutí školného
  - Školní vzdělávací program (SVP)
  - Školka v přírodě: bezinfekčnost, přihláška Kitty, přihláška Čestice, seznam věcí, zdravotní dotazník
  - GDPR: směrnice, doplňující dokumenty
- **Useful links section** (from odkazy):
  - Moodle portal
  - Photo gallery (Rajče)
  - Praha 8 municipality
  - Budget documents (grouped)
  - School district ordinance

### Step 3.6: Kontakt (src/pages/kontakt.astro)
- **MŠ Na Korábě** contact block:
  - Address: Na Korábě 2/čp. 350, 180 00 Praha 8 – Libeň
  - Phone: +420 283 842 809
  - Absence reporting email: skolkanakorabeomluvydeti@seznam.cz
- **MŠ Lindnerova** contact block:
  - Address: Lindnerova 1/čp. 575, 180 00 Praha 8 – Libeň
  - Phone: +420 284 842 026
  - Email: mslindnerova@seznam.cz
- **Management:**
  - Ředitelka: Mgr. Hana Francová, +420 728 125 539, reditelka@msnakorabe.cz
  - Zástupkyně: Jana Paříková, +420 739 643 387, zastupkyne@msnakorabe.cz
- **Školní jídelna:**
  - Vedoucí: Mgr. Lucie Francová, hospodarka@msnakorabe.cz
  - Jídelna Koráb: +420 283 843 286
  - Jídelna Lindnerova: +420 284 840 029
- **Data box:** z7ikxu2
- **IČO:** 70919747
- **Embedded map** — iframe with Google Maps or Mapy.cz showing both locations
- Operating hours summary (from FAQ): 6:30/7:00 – 17:00

### Step 3.7: 404 page (src/pages/404.astro)
- Friendly "page not found" message in Czech
- Navigation back to homepage
- Playful boat-themed message ("Tato loďka zabloudila...")

## Phase 4: Polish & Deploy Setup

### Step 4.1: Responsive testing
- Test all pages at mobile (375px), tablet (768px), desktop (1280px)
- Verify hamburger menu works
- Verify images scale properly
- Verify PDF download links work

### Step 4.2: SEO & meta
- Page titles: "MŠ Na Korábě | [Page Name]"
- Meta descriptions per page
- Open Graph image (use school photo)
- Favicon (ship/boat icon)

### Step 4.3: Performance
- Optimize images (convert large JPGs, set proper dimensions)
- Verify Lighthouse score 90+ on performance, accessibility, SEO

### Step 4.4: Deploy configuration
- Add netlify.toml or similar for static hosting
- Configure build command: `npm run build`
- Output directory: `dist/`

## Execution Order

1. Phase 1 (scaffolding) — must be first
2. Phase 2 (layout + components) — depends on Phase 1
3. Phase 3 (pages) — can be done in any order within phase, depends on Phase 2
4. Phase 4 (polish) — after all pages are built

Total estimated effort: ~4-6 hours of implementation time.
