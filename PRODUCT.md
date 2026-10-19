# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

B2B providers (productized-service, agency, and technical-capability sellers) who want qualified buyer conversations without running volume outreach themselves. Secondary audience on the same domain: government-contracting buyers and contractors using the GovCon consultation line (out of scope for this redesign round). Visitor mode on the redesigned surface: **Persuade** — the visitor decides whether to book an alignment call. [Inferred from site copy; user delegated product capture to this session.]

## Product Purpose

Wizerflow is a research-driven matchmaking service. It researches a market, vets actors on both sides for "genuine need, authority, and timing," and makes warm, pre-aligned introductions between buyers and providers. Success means the visitor books an alignment call; the first introduction typically lands within 3–4 weeks after engagement.

## Positioning

"We stand between two worlds." Not an SDR ("An SDR sells"), not a volume agency ("An agency runs capacity"): "Agencies sell capacity. We deliver precision." The claim a neighbor could not copy truthfully: introductions are earned from documented, buyer-specific research before a single name reaches the client — quality over quantity, always.

## Operating Context

Sales development for considered B2B services; buyers evaluate claims of "qualified meetings" skeptically after exposure to template outreach. Bookings go directly into the client's calendar; Wizerflow works with HubSpot/Salesforce. Entity: Wizerflow Inc., California; wizerflow.com; info@wizerflow.com.

## Capabilities and Constraints

- Static site (vanilla HTML/CSS/JS, no framework, no build step). Keep it static and dependency-light; Lenis smooth-scroll is the only runtime library in current use.
- Sole conversion path: `https://cal.com/wizerflow/partner-alignment-call` — one goal, one button. No forms, no dead buttons.
- Scope of this round: the main-site homepage (`index.html`) and its design world. `case-studies.html`, `policy.html`, `govcon/`, `gc-consultation/` keep existing behavior and links but are not redesigned this round.
- Copy on index.html (guarantee, 4-step pipeline, the generic-vs-Wizerflow email comparison, 6 values, 9 FAQs) is confirmed product voice and reuses verbatim unless a redesign necessity forces an edit.
- No invented proof: do not fabricate stats, client names, reviews, or pricing. Legacy case-studies metrics are hotlinked/legacy and stay off the homepage.

## Brand Commitments

- Name and wordmark: "Wizerflow"; logo marks `images/purple-removebg.png` (header) and `images/white-removebg.png` (footer).
- Taglines held as voice, not necessarily as final on-page strings: "We See Both Sides. We Make the Introduction." / "Quality over quantity. Always."
- User-pinned process guidance for this redesign (WeAreNoCode $10k kit): premium editorial feel, one exact-CTA discipline, palette derived from brand identity with one accent reserved for action, subtle (never looping/hijacking) motion, slick image/section reveals, reduced-motion support, no filler footer lines, design system unified across the whole page.
- User-pinned tooling: scroll-craft (github.com/nateherk/scroll-craft) techniques to be leveraged where they serve the design. [Details pending research agent report.]

## Evidence on Hand

- Full homepage copy inventory captured this session (hero, guarantee, 4-step pipeline, email comparison artifact, values, 10 FAQ answers with verbatim text).
- Logo assets and favicon in `images/`; value icons in `images/Tool Stack/`; FAQ icon `updates/faq.svg`.
- No photography exists for the main site. Absences future work must not fabricate: customer logos, testimonials, metrics, team photos.

## Product Principles

1. Precision over volume — every design decision demonstrates selectivity, not abundance.
2. Proof through specificity — the strongest artifact on the page is the concrete, evidence-citing email; surface specificity beats claims.
3. One goal — every section leads to the alignment call.
4. Two-sided honesty — the brand speaks from the center, never as a pitchman for either side.
5. Craft as signal — the site itself must read as researched and deliberate, like the work it sells.

## Accessibility & Inclusion

Keyboard focus and reduced-motion support required (motion must be an enhancement, never a gate). Current `particles.js` lacks a reduced-motion guard — the redesign must not ship unguarded ambient motion.
