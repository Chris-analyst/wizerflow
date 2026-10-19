---
name: Wizerflow
description: Precision introductions backed by research — an opened movement under bright bench light.
colors:
  canvas: "#e8e9ec"
  surface: "#f3f4f6"
  well: "#dcdee3"
  ink: "#1b1f2b"
  ink-soft: "#565e6e"
  accent: "#2447c9"
  accent-ink: "#f2f4fb"
  ruby: "#c22b45"
  hairline: "color-mix(in oklab, var(--sc-ink) 18%, transparent)"
  hairline-strong: "color-mix(in oklab, var(--sc-ink) 34%, transparent)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2.4vw, 3.4rem)"
    fontWeight: 640
    lineHeight: 0.94
    letterSpacing: "-0.028em"
    fontVariation: "wdth 111"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.22vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.14em"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
    fontVariation: "wdth 106"
rounded:
  sm: "3px"
  md: "4px"
  lg: "6px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  "10": "8rem"
  "11": "12rem"
  section: "clamp(4.5rem, 9vw, 11rem)"
  gutter: "clamp(1.25rem, 5vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.72em 1.35em"
  button-primary-hover:
    backgroundColor: "color-mix(in oklab, var(--sc-accent) 88%, var(--sc-ink))"
    textColor: "{colors.accent-ink}"
  button-nav:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.55em 1.1em"
  button-large:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.95em 1.9em"
  link-quiet:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  cert-plate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "clamp(2.4rem, 5vw, 4.5rem) clamp(1.6rem, 5vw, 4rem)"
  email-plate-generic:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "clamp(1.4rem, 2.6vw, 2.2rem)"
  email-plate-featured:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "clamp(1.4rem, 2.6vw, 2.2rem)"
  bridge-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1.5rem 1.5rem 2rem"
  hallmark-label:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
---

# Design System: Wizerflow

## Overview

**Creative North Star: "The Opened Movement"**

Wizerflow's homepage is built like a watchmaker's movement opened under bright bench light: a pale rhodium ground, blued-steel ink, plates raised and recessed in a base metal, one heat-blued accent reserved for the promoted element, and ruby used only where a real movement uses jewels — as tiny functional bearings and hallmark marks. Structure comes from calibrated tick rules, hairlines, and registry marks rather than heavy borders or filled blocks. The page is light, exact, and quiet; density is low and every mark earns its place.

The signature interaction carries the product thesis: many candidates are present, most are checked and declined one tick at a time, and the single right introduction is struck forward in accent blue. Typography is applied-index Archivo (variable, cut at weight 640 / width 111% for display) with Fragment Mono as the engraving face for labels, meta grids, and hallmarks — uppercase with wide tracking, like stamping on a plate.

Motion is scroll-scrubbed choreography, never looping: strokes draw themselves, ticks strike, sections drift subtly in ground color as the light moves. Reduced motion degrades to fades with all strokes drawn and every tick struck (`--hit` forced to 1); with JavaScript off, a guard reveals all cued content.

**Key Characteristics:**
- Pale bench-light ground (canvas #e8e9ec) with recessed wells and raised plates; no dark surfaces on this world's pages
- One heat-blued accent (#2447c9) owning action and promotion; ruby (#c22b45) as functional micro-markers only
- Near-sharp milled corners (3/4/6px), hairlines instead of opaque borders
- Calibrated tick rules and registry marks as structural ornament
- Self-hosted variable fonts (Archivo + Fragment Mono); no hosted font services
- Scroll-scrubbed Escapement choreography with full reduced-motion and no-JS degradation

## Colors

A rhodium-and-steel palette under even bench light: three metal grounds (canvas, surface, well), two blued inks, one heat-blued accent, one jewel ruby.

### Primary
- **Heat-Blued Steel** (#2447c9): the single accent. It owns promoted and action elements only — the primary CTA, the chosen tick struck forward, the step spine, nav and link hovers, the 2px scroll-progress bar. Applied like blued screws: rare, precise, load-bearing.
- **Ink on Accent** (#f2f4fb): text that sits on the accent; a blue-tinted white, never pure white.

### Secondary
- **Jewel Ruby** (#c22b45): functional micro-markers only — jewel bearings in the drawn movements, decline strikes on the candidate rail, hallmark dots, and the decline (X) verdict marks. Never fills an area, never sets body text.

### Neutral
- **Rhodium Bench** (#e8e9ec): the page ground; per-section ground drift interpolates around it.
- **Raised Plate** (#f3f4f6): cards, cert plate, featured email — anything lifted off the base plate.
- **Recessed Well** (#dcdee3): sinks in the base plate — the generic email, footer ground mixes.
- **Blued Steel Ink** (#1b1f2b): primary text; near-black with a blue cast, never #000.
- **Tinted Soft Ink** (#565e6e): secondary text and mono labels.
- **Hairlines** (ink at 18% / 34% via `color-mix`): rules, borders, dividers. Opaque borders are not part of this world.

### Named Rules
**The Jewel Bearing Rule.** Ruby marks function, never decoration. A ruby dot must mean something — a jewel bearing, a decline, a hallmark. If it is filling space or adding color, it comes out.

**The One Blued Voice Rule.** Exactly one accent. Anything promoted, actionable, or struck forward is #2447c9; there is no second accent hue anywhere in the world.

**The Bench-Light Rule.** The ground is pale and even; depth is made by raising plates and sinking wells, not by darkening the canvas or adding colored washes.

## Typography

**Display Font:** Archivo (variable, self-hosted; weights 100–900, width 62–125%; fallback system-ui, sans-serif)
**Body Font:** Archivo (same variable file; fallback system-ui, sans-serif)
**Label/Mono Font:** Fragment Mono (self-hosted, 400 + italic; fallback ui-monospace, monospace)

**Character:** A single industrial variable face carries both display and prose — display is cut heavy and wide (640 / 111%) like an applied index, prose stays neutral — while Fragment Mono does all the engraving: labels, meta grids, step numbers, hallmarks, legal lines.

### Hierarchy
- **Display** (Archivo 640, width 111%, tracking −0.028em, line-height 0.94): hero and section headings. Hero tops out at clamp(2.9rem, 3.2rem + 4.6vw, 6rem) with a 15ch measure; section headings at clamp(2rem, 1.5rem + 2.4vw, 3.4rem). Headings balance-wrap.
- **Lede** (400, clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem), line-height 1.45): section openers and the hero deck; measures 34–44ch.
- **Body** (400, clamp(1rem, 0.96rem + 0.22vw, 1.125rem), line-height 1.62): prose; measures capped at 62ch.
- **Label** (Fragment Mono 400, 0.72rem, uppercase, tracking 0.14em): engraved labels, hallmark signatures, footer legal. Meta grids use 0.06em tracking. Italic Fragment Mono is reserved for annotation notes and the lede's em voice.
- **Emphasis** is italic (never weight-jumps in prose).

### Named Rules
**The Engraved Label Rule.** Anything stamped rather than spoken — labels, meta, hallmarks, step indices, legal — is Fragment Mono uppercase with wide tracking. It is a plate stamp, not a substitute for a heading, and never sets running prose.

**The Applied Index Rule.** Promoted text is Archivo at 640 / 111% with tight negative tracking. Weight-and-width moves together; a weight jump at default width is not this world's promotion.

## Layout

Content sits in an 82rem max-width column (var `--sc-maxw`), centered, with a fluid gutter (clamp(1.25rem, 5vw, 5.5rem)) and fluid section rhythm (clamp(4.5rem, 9vw, 11rem) block padding). The spacing scale is 4px-based: 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 / 12rem (`--sc-1`…`--sc-11`).

Signature grids: the value bridges sit on an asymmetric 6-column grid with spans 4/2/2/4/3/3 — plates of deliberately unequal width, like bridges on a base plate. The FAQ is a 0.8fr/1.2fr split with a sticky aside. The email comparison is a 1fr/1fr two-face diptych. The hero is a full-viewport (100svh) grid with the drawn movement anchored bottom-right.

The How-it-works act pins for three viewport spans (scroll-craft `data-sc-act="pin" data-sc-span="3"`); short viewports (max-height 640px) degrade it to normal flow before the engine reads it.

Breakpoints: 1180px (movement drawing shrinks), 991px (nav collapses to menu button; diptychs, FAQ, and bridges collapse — bridges to 2 columns, spans flatten), 640px (single column; hero movement hidden). The vendor floor adds an 860px copy/scrim step.

Each section drifts its ground a few points off canvas (`data-sc-drift` values in the #e4–#ee range): the bench light moves as you scroll, and no two adjacent sections share a ground.

## Elevation & Depth

Hybrid and light-ground: every shadow is a cool, faint, offset pair (tinted toward ink hue, alphas 0.07–0.20), and every raised surface pairs its shadow with `--sc-edge`, a 1px inset white top edge (rgba(255,255,255,0.85) on the page) that sells the raised lip. Depth also comes tonally — raised plate vs. recessed well vs. canvas — and from the guilloché interference ground (two offset repeating-radial gradients under a radial mask, hero only).

### Shadow Vocabulary
- **E1 — plate at rest** (`0 1px 2px hsl(228 28% 22% / 0.10), 0 2px 6px -2px hsl(228 28% 22% / 0.07)`): resting bridge cards, scrolled header, primary button.
- **E2 — lifted plate** (`0 2px 4px hsl(228 28% 22% / 0.08), 0 10px 22px -6px hsl(228 28% 22% / 0.14)`): hover states, the cert plate.
- **E3 — featured piece** (`0 4px 10px hsl(228 28% 22% / 0.09), 0 22px 48px -10px hsl(228 28% 22% / 0.20), 0 56px 110px -30px hsl(228 28% 22% / 0.16)`): the Wizerflow email plate only.
- **Edge light** (`inset 0 1px 0 rgba(255,255,255,0.85)`): on every raised surface, alongside E1–E3.

### Named Rules
**The Edge-Light Rule.** A raised plate always catches light on its lip: pair every shadow with the inset 1px top edge. A shadow without the edge reads as a sticker, not a plate.

**The No-Halo Rule.** Shadows are offset and cool-tinted on the light ground. Zero-offset colored glows do not exist in this world.

## Shapes

Near-sharp, milled corners: one radius scale of 3px (default, `--wf-r-sm`), 4px, and 6px — nothing rounder, no pills. Containment is drawn with 1px hairlines (ink at 18%, or 34% where a rule must read stronger) rather than opaque strokes; the cert plate doubles this with a 1px outline offset 6px outside its border, like an inspection stamp. Functional round forms are jewelry-scale only: 6–7px jewel dots with a soft ruby ring, 13px step nodes. Line-art movements are authored inline SVG strokes (1.4–2px outline weights, wide dashed strokes for gear teeth), never fills or raster art.

## Components

### Buttons
- **Shape:** near-sharp milled corner (3px)
- **Primary ("applied index"):** heat-blued accent ground with accent-ink text, Archivo 600 at width 106%, padding 0.72em 1.35em, E1 shadow plus a white inset top edge — raised metal set into the page
- **Hover:** ground mixes 12% ink into the accent, shadow lifts to E2, translates up 1px; **active** settles back to 0. Eased with the engine ease-out over 240ms
- **Sizes:** nav 0.55em 1.1em at 0.88rem; large 0.95em 1.9em at 1.05rem
- **Quiet link:** ink text, hairline-strong underline that heats to accent on hover — the secondary path
- **Focus:** 2px accent outline, 3px offset, 3px radius (global `:focus-visible`)
- Primary CTAs on hero surfaces carry `data-sc-magnet` (0.14–0.2) for a subtle pointer lean

### Cards / Containers
- **Bridge plates:** raised-plate ground, hairline border, 3px radius, E1 + edge light (E2 on hover), ruby jewel dot set in the top-right corner, inline stroke icon at ink. Padding 1.5rem/2rem, icon beside title, prose on its own grid track.
- **Cert plate (inspection plate):** raised plate with double keyline (border + offset outline at 6px), E2 + edge light, centered, generous fluid padding, flanking hairline dashes around its mono sublabel, ruby-dot hallmark beneath.
- **Email plates (two faces):** the generic email sits recessed in the well with a hairline border and soft ink; the Wizerflow email is a raised plate with a 1.5px accent-tinted border (accent at 42%), E3 + edge light. Both carry a Fragment Mono meta grid (From/To/Subject) between hairline rules, and a verdict list with ruby X / accent check marks.
- **Hallmark:** a mono label preceded by a 6px ruby dot with an 18% ruby ring — a maker's stamp, used at cert foot and FAQ aside.

### Inputs / Fields
No text inputs exist in this world (sole conversion path is the cal.com link). Keyboard interaction is limited to buttons, accordion toggles, and the menu — all carry the 2px accent focus ring.

### Navigation
Fixed header on an 86% canvas mix with a 10px backdrop blur; scrolled state adds E1. The header closes with a calibrated tick rule (two repeating-linear-gradient scales — coarse ticks every 12.5%, fine every 2.5% — masked at both ends) rather than a border. Links are ink text with a 1px underline that draws in from the left on hover; the nav CTA is the primary button at nav size. Below 991px the nav collapses to a three-line menu button (1.5px ink strokes animating to an X) opening a full-screen canvas overlay. Scroll progress is a fixed 2px accent bar at the very top.

### The Escapement (signature)
The pipeline as a movement: a pinned three-span stage. Left, four numbered steps (mono indices, accent nodes on an accent-fading spine). Right, an authored stroke drawing of the train (mainspring, center wheel, escapement, anchor) whose strokes draw via `data-draw` dashoffset choreography driven by scroll progress, with one accent circle struck around the chosen jewel. Beneath it, the candidate rail: nine ticks whose opacity is driven by a per-tick `--hit` CSS variable computed from scroll progress — candidates present but backgrounded, declined ticks taking a rotated ruby strike, the chosen tick struck forward as a 5px accent bar with an 18% accent ring and a slight scale. Mono captions read Researched / Vetted / Introduced. Under reduced motion, `--hit` is forced to 1 and every stroke is drawn; the stage degrades to flow on short viewports.

### FAQ accordion
Hairline-separated items; toggle is an unset full-width button (ink, 500) whose plus sign (two 1.5px bars) rotates to a minus. Panels open via `grid-template-rows: 0fr → 1fr` driven by `:has(.wf-faq__toggle[aria-expanded="true"])`, 420ms engine ease-out.

## Do's and Don'ts

### Do:
- **Do** draw structure with hairlines (ink at 18% / 34% in `color-mix`) and calibrated tick rules; this world's borders are measuring scales, not boxes.
- **Do** pair every raised surface with the inset white top edge (`--sc-edge`) alongside its shadow.
- **Do** drift each section's ground a few points off canvas with `data-sc-drift` so the bench light moves across the page.
- **Do** set promoted text as Archivo 640 / 111% with −0.028em tracking, and stamped text as Fragment Mono uppercase at 0.14em.
- **Do** author movement art as inline SVG strokes with `data-draw` and a `--d` delay; animate by scroll progress with `pathLength="1"`.
- **Do** degrade every motion device: reduced motion becomes fades with strokes drawn and `--hit: 1`; the no-JS guard (`html:not(.sc-ready)`) must reveal all cued content.

### Don't:
- **Don't** introduce a second accent hue, a gradient wash, or dark hero surfaces — the category default this world refuses.
- **Don't** fill any area with ruby or use it for text; ruby is a micro-marker (jewel dots, decline strikes, hallmarks).
- **Don't** exceed 6px radius, use pill shapes, or use pure black (#000) or pure white (#fff) anywhere.
- **Don't** load hosted font services; Archivo and Fragment Mono are self-hosted variable/woff2 files.
- **Don't** ship looping or ambient auto-playing motion; everything scrubs from scroll or fires once on entry.
- **Don't** add a second conversion action — the sole CTA is the primary "Book alignment call" button to cal.com.
