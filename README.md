# MŠ Na Korábě — webové stránky

Moderní webové stránky [Mateřské školy Na Korábě](http://www.msnakorabe.cz/), Praha 8 – Libeň.

Statický web postavený na [Astro](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/). Kompiluje se do čistého HTML/CSS bez JavaScriptu.

## Struktura projektu

```
src/
├── components/        # Znovupoužitelné komponenty (Header, Footer, FeatureCard, ...)
├── content/
│   └── announcements/ # Aktuality jako Markdown soubory
├── layouts/           # BaseLayout
├── pages/             # Stránky webu (index, o-nas, program, tridy, pro-rodice, kontakt, 404)
└── styles/            # Globální styly a barevná paleta
public/
├── documents/         # PDF dokumenty ke stažení
└── images/            # Obrázky
```

## Aktuality

Aktuality se spravují jako Markdown soubory v `src/content/announcements/`. Každý soubor má frontmatter:

```markdown
---
title: "Název aktuality"
date: 2026-01-20
type: "aktualita" | "dulezite"
active: true
---

Text aktuality v Markdownu.
```

- Nastavení `active: false` aktualitu skryje
- Na hlavní stránce se zobrazují 3 nejnovější
- Kompletní seznam je na stránce Pro rodiče

## Vývoj

```bash
npm install          # Instalace závislostí
npm run dev          # Vývojový server na localhost:4321
npm run build        # Produkční build do ./dist/
npm run preview      # Náhled produkčního buildu
```

## Nasazení

Web se automaticky builduje a nasazuje na GitHub Pages přes GitHub Actions při každém pushnutí do `main`.

Pro nasazení na vlastní hosting (FORPSI apod.) stačí nahrát obsah složky `dist/` přes FTP.
