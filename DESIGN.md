---
name: MŠ Na Korábě
description: A warm, playful kindergarten website built on nautical metaphor and trustworthy clarity
colors:
  deep-ocean: "#005da3"
  ocean-medium: "#0071c5"
  clear-sky-blue: "#38a8fa"
  ocean-light: "#7ac4ff"
  ocean-mist: "#b8ddff"
  ocean-whisper: "#e0efff"
  golden-sun: "#f59e0b"
  golden-warm: "#fcd34d"
  golden-glow: "#fde68a"
  morning-sand: "#fdf8f0"
  warm-linen: "#faebd7"
  garden-green: "#4ade80"
  coral-bloom: "#fb7185"
  bright-marigold: "#facc15"
  sky-pale: "#f0f9ff"
  sky-soft: "#bae6fd"
  navy-deep: "#0a3f6e"
  navy-rich: "#054d87"
typography:
  display:
    fontFamily: "Nunito, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Nunito, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Nunito, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.golden-sun}"
    textColor: "{colors.navy-rich}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#d97706"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.15)"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.25)"
  card-feature:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "24px"
  nav-item:
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-item-active:
    backgroundColor: "rgba(255, 255, 255, 0.2)"
    textColor: "#ffffff"
---

# Design System: MŠ Na Korábě

## 1. Overview

**Creative North Star: "The Living Deck"**

The site mirrors the school's garden deck: colorful, alive, things growing in every direction, sunlight breaking through leaves, sturdy planks underfoot but playful surprises at every turn. It is not a brochure. It is a place you visit and feel something.

The system rejects three things without negotiation: the generic school template (clip-art, stock children, Comic Sans energy), the sterile institutional page (gray walls, text deserts, municipal authority), and the over-designed startup (gratuitous animation, gradient-soaked surfaces, tech aesthetics that signal software, not kindergarten). If it looks assembled from a kit, it's wrong.

The design leans into boldness and clarity. Generous whitespace lets each element breathe. Colors are committed, not timid. Typography is confident and friendly. The nautical metaphor (boat, waves, horizon, crew) runs through structure and rhythm as identity, not decoration.

**Key Characteristics:**
- Warm background tones (Morning Sand) with deep ocean blue anchoring structure
- Golden sun accents for calls-to-action, drawing the eye like sunlight on water
- Playful shapes (generous radii, wave dividers, illustrated scenes) balanced by clear information hierarchy
- Bold, confident Nunito headings paired with clean Inter body text
- Animated ocean waves and floating decorative elements that bring life without overwhelming
- Zero JavaScript dependency; all interaction via CSS (hover states, checkbox toggles, details/summary)

## 2. Colors

The palette lives between ocean and sunlight: deep blues carry trust and structure, golden ambers drive action, and the warm sand background wraps everything in approachability.

### Primary

- **Deep Ocean** (#005da3): The anchor. Header backgrounds, heading text, the school's identity color. Conveys authority without coldness because it's always paired with warmth.
- **Clear Sky Blue** (#38a8fa): Interactive highlights, gradient endpoints, link hovers. The lighter face of the ocean on a bright day.
- **Ocean Mist** (#b8ddff) / **Ocean Whisper** (#e0efff): Subtle tinted backgrounds for highlighted sections, info panels, soft emphasis zones.

### Secondary

- **Golden Sun** (#f59e0b): The primary call-to-action color. Buttons that need to be found use this. Enrollment links, the main CTA. It's sunlight cutting through the blue.
- **Golden Warm** (#fcd34d) / **Golden Glow** (#fde68a): Supporting tones for highlighted cards, badge backgrounds, warm accents in sections.

### Tertiary

- **Garden Green** (#4ade80): Success states, nature references, garden-related content.
- **Coral Bloom** (#fb7185): Urgent announcements, important notices, gentle warnings.
- **Bright Marigold** (#facc15): Decorative highlights, playful accents, child-energy moments.

### Neutral

- **Morning Sand** (#fdf8f0): The page background. Not white (never white). A warm, barely-there cream that makes everything feel welcoming.
- **Warm Linen** (#faebd7): Card hover states, section alternation, subtle container backgrounds.
- **Navy Deep** (#0a3f6e) / **Navy Rich** (#054d87): Footer, dark containers, the deep water beneath the ship.

### Named Rules

**The Sunlight Rule.** Golden Sun appears only on primary CTAs and high-priority interactive elements. Its power comes from scarcity. If everything is gold, nothing is.

**The Never-White Rule.** No surface uses pure white (#fff) or pure black (#000). Morning Sand (#fdf8f0) is the lightest surface. Navy Deep (#0a3f6e) is the darkest. The warmth is always present.

## 3. Typography

**Display Font:** Nunito (with system-ui, -apple-system, sans-serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)

**Character:** Nunito's rounded terminals give headings a friendly, approachable warmth without sliding into childishness. Inter's clean geometry and excellent legibility at small sizes keeps body text professional and readable for parents scanning on mobile. The pairing says "trustworthy adults who genuinely love children."

### Hierarchy

- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.1): Hero headlines only. The ship's name on the bow. Always Deep Ocean or white on dark.
- **Headline** (700, 1.5rem, 1.3): Section headers ("Aktuality", "Co nabizime", "Třídy"). Deep Ocean blue. The structural rhythm of each page.
- **Title** (700, 1.125rem, 1.4): Card titles, announcement headlines, sub-section markers. Deep Ocean blue.
- **Body** (400, 1rem, 1.6): Paragraph text. Gray-800. Maximum line length 65-75ch for comfortable reading. Parents read this at 11pm on their phones; respect their eyes.
- **Label** (500, 0.875rem, 1.4): Metadata, dates, captions, navigation items. Smaller but never compressed or light-gray-on-white.

### Named Rules

**The Nunito-Only Rule.** Headings always use Nunito. Body always uses Inter. Never mix. Never override. The pairing is the voice.

## 4. Elevation

The system uses ambient shadows for depth signaling, not structural layering. Most surfaces are flat at rest. Shadow intensity responds to interaction state.

### Shadow Vocabulary

- **Card resting** (`0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`): Feature cards, announcement cards at rest. Present but gentle.
- **Card hover** (`0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`): Cards on hover lift slightly. The only motion feedback most elements get.
- **Header** (`0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`): Sticky header casts a subtle shadow over content below.
- **Button CTA** (`0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`): Primary CTA buttons carry a visible shadow for prominence.

### Named Rules

**The Flat-Until-Touched Rule.** Surfaces are flat by default. Shadows appear as response to hover or as structural markers (header, CTAs). Never decorative shadow on a static element that doesn't interact.

## 5. Components

### Buttons

**Character:** Bold and clear. Buttons are confident, easy to find, impossible to mistake for anything else.

- **Shape:** Gently curved edges (12px radius)
- **Primary (Golden Sun):** #f59e0b background, Navy Rich (#054d87) text, semibold weight, 12px 24px padding, shadow-lg. Reserved for the single most important action on any screen.
- **Hover / Focus:** Darkens to #d97706. No scale transform, no bounce.
- **Ghost:** rgba(255,255,255,0.15) background, white text, 1px white/25 border, backdrop-blur. Used on dark (hero) sections for secondary actions.
- **Ghost Hover:** Background brightens to rgba(255,255,255,0.25).

### Cards / Containers

**Character:** Clean stages for content. The card recedes; the content speaks.

- **Feature Card:** White background, generous rounded corners (16px), shadow-md at rest, shadow-lg on hover. Image bleeds to top edge. Internal padding 24px.
- **Announcement Card:** Tinted background (priority-dependent: red-50, accent-50, primary-50). Left border accent (4px) colored by priority. Rounded right corners only (12px). Shadow-sm.
- **Info Panel:** Primary-50 background, 16px rounded corners, 24-32px padding. Used for quick-contact and call-to-action blocks.

### Navigation

- **Header:** Sticky, primary-700 blue background, shadow-lg beneath. Logo + text left, nav items right (desktop). Hamburger toggle on mobile (CSS-only, no JS).
- **Nav items:** 8px radius, 8px 12px padding. Active state: white/20 background. Hover: white/10 background. Text: primary-100 default, white on active/hover.
- **Mobile menu:** Slides in below header (CSS checkbox toggle). Primary-800 background, full-width items.

### FAQ Accordion

- **Container:** 1px gray-200 border, rounded-xl (12px), overflow hidden.
- **Summary row:** Gray-50 background, hover gray-100. Chevron rotates on open (CSS group-open:rotate-180).
- **Content area:** White background, border-t gray-100, relaxed padding.

### Wave Dividers

- **Purpose:** Section transitions. SVG sine-wave paths that visually connect sections like water flowing between spaces.
- **Variants:** Single-color fill (Morning Sand default), animated multi-layer (footer transition with 3 wave layers at different speeds: 20s, 27s, 35s).
- **Flip option:** rotate(180deg) for top-of-section placement.

### Decorative Elements

- **Hero clouds:** CSS-only shapes (border-radius: 50px with pseudo-elements). Randomly positioned, varied scale/blur/opacity. Tinted from a palette of white, sky, warm-yellow, lavender.
- **Floating suns:** Animated GIF overlays at hero edges. Varied opacity (50-70%), pointer-events none, decorative only.
- **Palm tree islands:** SVG + PNG composites at bottom corners of hero. Low opacity (50-55%), hidden below lg breakpoint.

## 6. Do's and Don'ts

### Do:

- **Do** use Morning Sand (#fdf8f0) as the base page background. Every surface starts warm.
- **Do** use Deep Ocean (#005da3) for all heading text. Consistency builds recognition.
- **Do** reserve Golden Sun (#f59e0b) for the primary CTA per screen. One gold button maximum.
- **Do** use wave dividers to transition between major sections. They are the visual rhythm of the ship.
- **Do** keep body text at 65-75ch maximum line length. Parents read on phones at night.
- **Do** use CSS-only interactions (hover, focus, checkbox toggles, details/summary). Zero client JS.
- **Do** include generous whitespace between sections (py-10 to py-12). Let each section breathe.
- **Do** maintain WCAG 2.1 AA contrast on all text. Deep Ocean on Morning Sand passes; verify every combination.

### Don't:

- **Don't** use pure white (#fff) or pure black (#000) anywhere. Not backgrounds, not text, not borders.
- **Don't** use clip-art, generic stock photos, or Comic Sans-adjacent fonts. We are not a template. (From PRODUCT.md: "Generic school templates")
- **Don't** make text-heavy walls without visual breaks. We are not a bureaucracy. (From PRODUCT.md: "Sterile institutional sites")
- **Don't** add gratuitous gradient overlays, excessive animations, or SaaS-style design patterns. We are not a startup. (From PRODUCT.md: "Over-designed startups")
- **Don't** nest cards inside cards. One level of containment maximum.
- **Don't** use gradient text (background-clip: text). Emphasis through weight and size only.
- **Don't** add JavaScript for interactions that CSS can handle. The site compiles to pure HTML/CSS.
- **Don't** use glassmorphism (blur + transparency) as a default surface treatment. The hero ghost button's backdrop-blur is the exception, not the rule.
- **Don't** animate CSS layout properties (width, height, margin, padding). Transforms and opacity only.
