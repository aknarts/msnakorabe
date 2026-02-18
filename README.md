# MŠ Na Korábě — webové stránky

Moderní webové stránky [Mateřské školy Na Korábě](http://www.msnakorabe.cz/), Praha 8 – Libeň.

Statický web postavený na [Astro](https://astro.build/) + [Tailwind CSS 4](https://tailwindcss.com/). Kompiluje se do čistého HTML/CSS bez JavaScriptu.

## Struktura projektu

```
src/
├── components/        # Znovupoužitelné komponenty (Header, Footer, FaqItem, ...)
├── content/
│   ├── announcements/ # Aktuality jako Markdown soubory
│   └── faq/           # Často kladené otázky — jeden soubor = jedna otázka
├── data/              # YAML konfigurační soubory
│   ├── site.yaml      # Globální nastavení (motto, filosofie, kontakty, budovy)
│   ├── personnel.yaml # Zaměstnanci (vedení, třídy, kuchyně, provoz)
│   ├── documents.yaml # Seznam dokumentů ke stažení
│   └── useful-links.yaml # Užitečné odkazy
├── layouts/           # BaseLayout
├── pages/             # Stránky webu (index, o-nas, program, tridy, pro-rodice, kontakt, odkazy, 404)
└── styles/            # Globální styly a barevná paleta
public/
├── documents/         # PDF dokumenty ke stažení
└── images/            # Obrázky
```

## Správa obsahu

Veškerý obsah je v Markdown nebo YAML souborech. Stránky (.astro) jsou šablony, které obsah pouze zobrazují.

### Aktuality

Markdown soubory v `src/content/announcements/`. Každý soubor má frontmatter:

```markdown
---
title: "Název aktuality"
date: 2026-01-20
priority: "normal" | "high" | "urgent"
active: true
---

Text aktuality v Markdownu.
```

- `active: false` aktualitu skryje
- Na hlavní stránce se zobrazují 3 nejnovější

### Často kladené otázky (FAQ)

Markdown soubory v `src/content/faq/`. Každý soubor = jedna otázka:

```markdown
---
question: "Text otázky"
order: 1
active: true
---

Text odpovědi v Markdownu.
```

- Pořadí se řídí polem `order`
- `active: false` otázku skryje
- Novou otázku přidáte vytvořením nového .md souboru

### Zaměstnanci

Soubor `src/data/personnel.yaml`. Každá položka má `id` a `section`:

- `section: management` — vedení školy (jméno, funkce, telefon, email)
- `section: classes` — třídy (název, emoji, učitelky)
- `section: kitchen` — kuchyně (budova, seznam kuchařek)
- `section: other` — ostatní (školnice, uklízečky)

Změna učitelky = úprava jednoho řádku v YAML souboru.

### Dokumenty

Soubor `src/data/documents.yaml`. Každý dokument má:

```yaml
- id: nazev-dokumentu
  filename: "nazev-souboru.pdf"
  title: "Zobrazovaný název"
  category: enrollment | rules | nature-school | gdpr | budget
  active: true
```

Nový dokument: 1) nahrajte PDF do `public/documents/`, 2) přidejte záznam do YAML.

### Užitečné odkazy

Soubor `src/data/useful-links.yaml`. Zobrazují se na stránce /odkazy.

### Globální nastavení

Soubor `src/data/site.yaml` — motto, filosofie, kontakty, adresy budov, ocenění kuchyně, provozní doba atd.

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
