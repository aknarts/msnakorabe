---
date: 2026-02-18
topic: "MŠ Na Korábě - Feedback Redesign: Content Fidelity, Visual Spirit, Parametrization"
design: "thoughts/shared/designs/2026-02-18-kindergarten-feedback-redesign.md"
status: ready
---

# Implementation Plan: Kindergarten Feedback Redesign

This plan addresses three feedback areas: (1) restore original texts from archive, (2) make the visual design more playful/warm, (3) parametrize all content for non-technical editing.

**Execution order:** Data structures → Content population → Visual theme → Page refactoring → New pages → Verification

---

## Phase 1: Data Structures & Content Collections

### Step 1.1: Create src/data/ directory and YAML data files

Create the directory `src/data/` and the following YAML files with proper structure:

**File: `src/data/site.yaml`**
An array with a single entry (id: "main") containing:
- `name`: "Mateřská škola, Praha 8, Na Korábě 2"
- `short_name`: "MŠ Na Korábě"
- `ico`: "70919747"
- `data_box`: "z7ikxu2"
- `founder`: { name: "Městská část Praha 8", url: "https://www.praha8.cz" }
- `motto`: "Jak si loďku postavíme, tak si na ní zajezdíme."
- `philosophy`: The FULL original text from archive/default.html: "Uspokojovat potřeby dětí, nabízet podněty pro rozvoj individuálního potenciálu, intelektuálních, citových a sociálních schopností. Umožnit dítěti prostřednictvím prožitků získávat zkušenost, probouzet zájem o hodnoty, vést dítě k osvojení postojů a dovedností, které budou dobrým základem do života, které pomohou dosáhnout cíle = stát se zdravou, autentickou, vnitřně integrovanou a socializovanou osobností."
- `goal`: "MÍT ZDRAVÍ, DUŠEVNÍ POHODU A PŘÍZNIVOU ŽIVOTNÍ PERSPEKTIVU"
- `intro`: "Naše mateřská škola je loďka, kterou stavíme z pevných, ale pružných základů. Tak, jak si na její stavbě dáme záležet, tak nám bude sloužit. Krásně nás poveze v klidném proudu, ale vydrží i v bouři a bezpečně nás doveze k našemu cíli."
- `school_type`: Original text from archive/o_nas: "Naše mateřské školy jsou školou rodinného typu, mezi naše hlavní oblasti zájmů patří mravní, citová a tělesná výchova. Snažíme se v dětech posilovat vlastní sebedůvěru, samostatnost a schopnost rozhodování se, vše maximálně hravou formou."
- `program_name`: "NA JEDNÉ LODI – KORÁBU"
- `program_description`: "Pro sjednocení těchto aktivit a dosažení našich cílů jsme vytvořili vlastní vzdělávací program „NA JEDNÉ LODI – KORÁBU", který děti provází po celý rok."
- `garden`: Original from archive: "Školka nabízí prostornou zahradu parkového typu, jejíž členitost umožňuje využití k funkčním, estetickým a prožitkovým variantám výchovných činností a je vybavena moderními herními prvky a nově také záhonky s plodinami, o které se děti samy starají."
- `kitchen_description`: Original from archive: "Stravování dětí zajišťují školní jídelny. Snažíme se dětem poskytovat pestrou a vyváženou stravu, k čemuž dopomáhají špičkové paní kuchařky."
- `kitchen_awards`: Array of strings — each award verbatim from archive
- `hours`: "6:30 / 7:00 – 17:00"
- `hours_note`: "Děti splňující povinnou předškolní docházku přichází do MŠ od 7:00 do 9:00 hodin. Doporučujeme příchod do 8:30."
- `absence_email`: "skolkanakorabeomluvydeti@seznam.cz"
- `moodle_url`: "http://dlk.cuni.cz/course/view.php?id=98"
- `moodle_description`: Original from archive FAQ Q12 about what Moodle is
- `virtual_tour_url`: "http://www.virtualni-skoly.cz/skola/90-ms-na-korabe"
- `buildings`: Array of two objects, each with: name, address, phone, email, cafeteria_phone, image

**File: `src/data/personnel.yaml`**
An array of entries, each with an `id` field. Group by role:
- Management entries (id: "director", "deputy", "cafeteria_manager"): name, title, phone, email, section: "management"
- Class entries (id: "lvicatka", "hrosici", etc.): class_name, emoji, building, teachers array (name, role), section: "classes"
- Kitchen entries (id: "kitchen-korab", "kitchen-lindnerova"): building, staff array (name, role), section: "kitchen"
- Other staff entries (id: "other-staff"): staff array (name, role), section: "other"

Use the exact names from archive/zazemi/default.html and archive/tridy/default.html.

**File: `src/data/documents.yaml`**
An array of entries, each with `id` (slug), `filename`, `title`, `category` (enum: enrollment, rules, nature-school, gdpr, budget), `active` (boolean). List ALL 28 PDFs currently in public/documents/. Use the exact display titles from the current pro-rodice.astro page.

### Step 1.2: Create FAQ content collection

Create directory `src/content/faq/` and 13 markdown files, one per FAQ item from the archive.

Each file format:
```markdown
---
question: "The full question text from archive"
order: 1
active: true
---

The full answer text from archive, in markdown.
```

**Files to create (with EXACT original texts from archive/dotazy/default.html):**

1. `01-provozni-doba.md` — Q: "Jaká je provozní doba? Kdo a kdy může dítě do MŠ přivádět? Kdo a kdy může dítě z MŠ odvádět?" — Full original answer about hours, authorized persons, ID checks, health responsibility
2. `02-co-potrebuje-dite.md` — Q: "Co vše potřebuje dítě do MŠ?" — Full bulleted list including kelímek, vlhčené ubrousky, látkový pytel
3. `03-adaptace.md` — Q: "Jak probíhá adaptace dětí v MŠ?" — Full original about gradual entry
4. `04-spanek.md` — Q: "Musí mé dítě ve školce spát?" — Full original about relaxation, fantasy development
5. `05-predavani-na-chodbe.md` — Q: "Mohu nechat dítě na chodbě MŠ s tím, že do třídy už dojde samo?" — **THIS WAS DROPPED — RESTORE FROM ARCHIVE**: "Ne, VŽDY je potřeba předat dítě paní učitelce..."
6. `06-omlouvani.md` — Q: "Jak omluvit dítě v MŠ?" — Original wording
7. `07-stravovani.md` — Q: "Co dítě ve školce jí a pije?" — Full original with times, drink regime, dietary info
8. `08-krouzky.md` — Q: "Jaké nadstandardní aktivity MŠ nabízí?" — Full original with paid/free split and specific items to bring
9. `09-krouzky-male-deti.md` — Q: "Je vhodné, aby 3-4leté dítě chodilo do kroužků?" — Original about individual readiness
10. `10-nemoc.md` — Q: "Musím si přijít pro dítě, když pí. učitelka zavolá, že dítě jeví známky choroby?" — Original wording
11. `11-akce.md` — Q: "Kde se dozvím o akcích v MŠ?" — Original wording
12. `12-moodle.md` — Q: "Co je MOODLE?" — **THIS WAS DROPPED — RESTORE FROM ARCHIVE**: Full explanation of the portal
13. `13-konzultace.md` — Q: "Kdy mohu diskutovat o problémech (záležitostech) svého dítěte s pí. učitelkou nebo vedením školy?" — **THIS WAS MERGED — RESTORE FULL ORIGINAL** about scheduling consultations

### Step 1.3: Create useful links data file

**File: `src/data/useful-links.yaml`**
An array of entries, each with `id`, `title`, `url`, `description` (optional), `category` (enum: portal, municipality, budget, regulation), `order`, `active`.

Populate from archive/odkazy/default.html:
- Moodle (portal)
- Rajče photo gallery (portal)
- Praha 8 (municipality)
- All budget documents with URLs to PDFs in /documents/ (budget)
- School district regulations (regulation)

### Step 1.4: Update content.config.ts

Update `src/content.config.ts` to register all new collections:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    priority: z.enum(['normal', 'high', 'urgent']).default('normal'),
    active: z.boolean().default(true),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
    active: z.boolean().default(true),
  }),
});

const site = defineCollection({
  loader: file('src/data/site.yaml'),
  schema: z.object({
    // all fields from site.yaml with proper Zod types
    name: z.string(),
    short_name: z.string(),
    ico: z.string(),
    data_box: z.string(),
    founder: z.object({ name: z.string(), url: z.string() }),
    motto: z.string(),
    philosophy: z.string(),
    goal: z.string(),
    intro: z.string(),
    school_type: z.string(),
    program_name: z.string(),
    program_description: z.string(),
    garden: z.string(),
    kitchen_description: z.string(),
    kitchen_awards: z.array(z.string()),
    hours: z.string(),
    hours_note: z.string(),
    absence_email: z.string(),
    moodle_url: z.string(),
    moodle_description: z.string(),
    virtual_tour_url: z.string(),
    buildings: z.array(z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string().optional(),
      cafeteria_phone: z.string(),
      image: z.string(),
    })),
  }),
});

const personnel = defineCollection({
  loader: file('src/data/personnel.yaml'),
  schema: z.object({
    section: z.enum(['management', 'classes', 'kitchen', 'other']),
    // Flexible schema — different sections have different fields
    name: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    class_name: z.string().optional(),
    emoji: z.string().optional(),
    building: z.string().optional(),
    teachers: z.array(z.object({ name: z.string(), role: z.string().nullable() })).optional(),
    staff: z.array(z.object({ name: z.string(), role: z.string() })).optional(),
  }),
});

const documents = defineCollection({
  loader: file('src/data/documents.yaml'),
  schema: z.object({
    filename: z.string(),
    title: z.string(),
    category: z.enum(['enrollment', 'rules', 'nature-school', 'gdpr', 'budget']),
    active: z.boolean().default(true),
  }),
});

const links = defineCollection({
  loader: file('src/data/useful-links.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string().optional(),
    category: z.enum(['portal', 'municipality', 'budget', 'regulation']),
    order: z.number(),
    active: z.boolean().default(true),
  }),
});

export const collections = { announcements, faq, site, personnel, documents, links };
```

### Step 1.5: Verify build passes

Run `npm run build` to ensure all new content collections and data files validate against schemas. Fix any schema/data mismatches.

---

## Phase 2: Visual Theme Update

### Step 2.1: Add playful heading font

Update `src/layouts/BaseLayout.astro`:
- Add Google Fonts link for **Nunito** (weights 600, 700, 800) alongside Inter
- Nunito is rounded, friendly, and highly legible — perfect middle ground between playful and professional

### Step 2.2: Update color palette and typography in global.css

Update `src/styles/global.css`:

**New color palette — warmer, more playful:**
- Primary shifts from cold navy to a warmer blue-green (still authoritative but friendlier)
  - Consider: `--color-primary-500: #2563eb` (brighter blue) or keep existing but warm it
- Accent stays amber/sunshine — this is the kindergarten's warmth
- Add new semantic colors:
  - `--color-fun-green`: A soft, leafy green for nature/garden sections
  - `--color-fun-coral`: A warm coral/pink for highlights
  - `--color-fun-sky`: Keep the existing sky blue
- Background: Change `body` bg from pure white to `warm-50` (#fdf8f0) — subtle cream
- Add `--font-heading: 'Nunito', system-ui, sans-serif` to the theme

**Typography update:**
- h1, h2, h3, h4 use `font-heading` (Nunito) instead of default sans
- Slightly larger heading sizes for warmth
- Keep body text as Inter

### Step 2.3: Add decorative CSS elements

Add to `global.css`:
- A `.wave-divider` class using an inline SVG background for wavy section separators (CSS only, no JS)
- A `.section-decorated` class that adds subtle background patterns (dots or waves at very low opacity)
- Ensure these are pure CSS — no JavaScript

### Step 2.4: Create WaveDivider component

Create `src/components/WaveDivider.astro`:
- A simple component that renders an SVG wave shape between sections
- Accepts a `color` prop for the wave fill color
- Pure HTML/CSS, no JS

---

## Phase 3: Page Refactoring — Data-Driven Templates

### Step 3.1: Refactor index.astro (Homepage)

Update `src/pages/index.astro` to:
1. Import and load `site` collection: `const siteData = (await getCollection('site'))[0].data`
2. Replace hardcoded motto with `siteData.motto`
3. Replace hardcoded intro text with `siteData.intro`
4. Replace hardcoded philosophy snippet with `siteData.philosophy` (the FULL original text, not the marketing summary)
5. Replace hardcoded contact info with data from `siteData` and personnel collection
6. Add the `siteData.goal` text prominently (was missing from current site)
7. Replace emoji FeatureCards with photo-based ones (use existing images: img5A.jpg for sauna, img5F.jpg for salt cave, img54.jpg for garden, img56.jpg for kitchen)
8. Add sun decorative elements: `<img src={url('/images/sun1a.gif')}` in appropriate spots (hero section corners or between sections)
9. Use `obloha1.jpg` as hero background with warm overlay instead of the gradient
10. Add WaveDivider between sections

### Step 3.2: Refactor o-nas.astro (About page)

Update `src/pages/o-nas.astro` to:
1. Load `site` and `personnel` collections
2. Replace all hardcoded text with data from `siteData`:
   - Philosophy: `siteData.school_type` + `siteData.philosophy` (the FULL original)
   - Program: `siteData.program_name` + `siteData.program_description`
   - Garden: `siteData.garden` (original text)
   - Kitchen: `siteData.kitchen_description` + `siteData.kitchen_awards`
3. Replace hardcoded staff info with personnel collection data (filter by section: 'kitchen', 'other')
4. Add Moodle description from `siteData.moodle_description`
5. Use WaveDivider between sections
6. Add sun decorative elements

### Step 3.3: Refactor tridy.astro (Classes page)

Update `src/pages/tridy.astro` to:
1. Load `personnel` collection
2. Filter management entries (section: 'management') for the management section
3. Filter class entries (section: 'classes') for the class grid
4. Remove the hardcoded `classes` array from the frontmatter
5. Load `site` collection for virtual tour URL
6. Add WaveDivider between sections

### Step 3.4: Refactor pro-rodice.astro (Parents page)

Update `src/pages/pro-rodice.astro` to:
1. Load `faq` collection, sort by `order`, filter by `active`
2. Replace the hardcoded FAQ section with a loop over faq entries:
   ```
   faqItems.map(item => <FaqItem question={item.data.question}><Content /></FaqItem>)
   ```
   Each FAQ item renders its markdown body as the answer
3. Load `documents` collection, group by `category`
4. Replace the hardcoded document lists with loops over document entries per category
5. Remove the useful links section from this page (moves to dedicated /odkazy page)
6. Keep the quick nav but update it (remove #odkazy, or point to /odkazy)
7. Add WaveDivider between sections

### Step 3.5: Refactor kontakt.astro (Contact page)

Update `src/pages/kontakt.astro` to:
1. Load `site` and `personnel` collections
2. Replace hardcoded hours with `siteData.hours` and `siteData.hours_note`
3. Replace hardcoded building info with `siteData.buildings` array
4. Replace hardcoded management section with personnel collection (section: 'management')
5. Replace hardcoded IČO, datová schránka, zřizovatel with `siteData` fields
6. Maps can stay hardcoded (coordinates don't change)

### Step 3.6: Refactor program.astro (Program page)

This page has less frequently changing content, but for consistency:
1. The activity descriptions and club descriptions can stay in the page for now (they're pedagogical content, not administrative data that changes)
2. Replace emoji icons with photos where available (already partially done)
3. Add WaveDivider between sections
4. Add sun decorative elements

---

## Phase 4: New Pages & Components

### Step 4.1: Create odkazy.astro (Useful Links page)

Create `src/pages/odkazy.astro`:
1. Load `links` collection, sort by `order`, filter by `active`
2. Load `documents` collection, filter by category 'budget'
3. Group links by `category`
4. Render sections: Portály (portal), Městská část (municipality), Rozpočtové dokumenty (budget), Předpisy (regulation)
5. Each link renders as a card with title, description, and external link icon
6. Budget documents render as PDF download links
7. Use the same page header pattern as other pages
8. Add to navigation in Header.astro? Or keep it as a sub-page linked from pro-rodice

### Step 4.2: Update Header.astro navigation

Update `src/components/Header.astro`:
- Add "Odkazy" to the navigation (either as main nav item or as sub-item under "Pro rodiče")
- Decision: I recommend keeping it as a separate nav item for easy council verification. If nav gets too crowded, it can be a sub-link.

### Step 4.3: Update Footer.astro

Update `src/components/Footer.astro`:
- Load `site` collection for contact info
- Replace any hardcoded text with data from collections
- Add link to /odkazy page

### Step 4.4: Update FeatureCard component

Update `src/components/FeatureCard.astro`:
- Ensure it works well with both image and icon props (already does)
- Add slightly warmer styling (colored border or subtle background tint)
- Ensure rounded corners and shadows match the new playful theme

---

## Phase 5: Decorative Polish

### Step 5.1: Add sun decorative elements to pages

Add `sun1a.gif` and `sun2a.gif` as decorative elements:
- Hero section of index.astro (corners, partially hidden/overlapping)
- Section headers on other pages
- Use CSS `position: absolute` with low z-index, partial opacity if needed
- These are the original kid paintings — they're the soul of the site

### Step 5.2: Use real photos in homepage highlights

Replace the 4 emoji FeatureCards on the homepage with photo-based cards:
- Sauna → img5A.jpg
- Solná jeskyně → img5F.jpg
- Parková zahrada → img54.jpg
- Oceňovaná jídelna → img56.jpg

### Step 5.3: Warm up page headers

Update the page header gradient on all pages:
- Current: `from-primary-50 to-sky-50` (cold)
- New: warmer gradient using accent-50, warm-50, or a sunshine yellow tint
- Consider adding a subtle sun or cloud illustration

---

## Phase 6: Verification & Cleanup

### Step 6.1: Content accuracy check

For each restored text, verify 1:1 match with archive:
- [ ] FAQ: All 13 items match archive/dotazy/default.html
- [ ] Homepage philosophy matches archive/default.html
- [ ] School type description matches archive/o_nas/default.html
- [ ] Garden description matches archive/o_nas/default.html
- [ ] Kitchen description and awards match archive/o_nas/default.html
- [ ] Useful links match archive/odkazy/default.html
- [ ] Personnel names match archive/zazemi/default.html and archive/tridy/default.html

### Step 6.2: Build and test

- Run `npm run build` — must succeed with zero errors
- Run `npm run preview` — visually check all pages
- Check mobile responsiveness on all pages
- Verify all PDF document links work
- Verify all external links work

### Step 6.3: Update README.md

Update the project README to document:
- New content management approach (FAQ as markdown, personnel/documents/links as YAML)
- How to add a new FAQ item
- How to update personnel
- How to add a new document
- How to modify useful links
- Include examples of each operation

This is critical — the README is the documentation for the non-technical editor.

### Step 6.4: Editability verification

Simulate a non-technical edit:
- Add a test FAQ item (create a new .md file)
- Change a teacher name in personnel.yaml
- Add a new document to documents.yaml
- Verify the build succeeds and changes appear correctly
- Remove test changes

---

## File Change Summary

**New files:**
- `src/data/site.yaml`
- `src/data/personnel.yaml`
- `src/data/documents.yaml`
- `src/data/useful-links.yaml`
- `src/content/faq/01-provozni-doba.md` through `13-konzultace.md` (13 files)
- `src/pages/odkazy.astro`
- `src/components/WaveDivider.astro`

**Modified files:**
- `src/content.config.ts` — Add faq, site, personnel, documents, links collections
- `src/styles/global.css` — New color palette, heading font, decorative CSS
- `src/layouts/BaseLayout.astro` — Add Nunito font import
- `src/pages/index.astro` — Data-driven, photos, decorative elements
- `src/pages/o-nas.astro` — Data-driven, original texts
- `src/pages/tridy.astro` — Data-driven from personnel.yaml
- `src/pages/pro-rodice.astro` — Data-driven FAQ + documents, remove links section
- `src/pages/kontakt.astro` — Data-driven from site.yaml + personnel.yaml
- `src/pages/program.astro` — Visual polish, wave dividers
- `src/components/Header.astro` — Add odkazy nav item
- `src/components/Footer.astro` — Data-driven contact info
- `src/components/FeatureCard.astro` — Warmer styling
- `README.md` — Content management documentation

**Unchanged files:**
- `src/components/AnnouncementCard.astro` — Already works well
- `src/components/FaqItem.astro` — Already works well (just receives different data source)
- `src/content/announcements/*` — Already parametrized, no changes needed
- `src/utils.ts` — No changes needed
- `public/documents/*` — PDFs stay as-is
- `public/images/*` — Images stay as-is (sun GIFs already present)
