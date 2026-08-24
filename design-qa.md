# Option 3 Edition Bridge — Design QA

## Comparison target

- Source visual truth: `/Users/markholcomb/.codex/generated_images/019ff43e-6b63-76b0-ada4-2e5bdaf8f2b4/exec-032db34c-9567-4a55-b0af-ebeab551ca1e.png`
- Stable desktop implementation: `/private/tmp/funcs-option3-stable-desktop-final.png`
- Stable mobile implementation: `/private/tmp/funcs-option3-stable-mobile-final.png`
- Beta desktop implementation: `/private/tmp/funcs-option3-beta-desktop-final.png`
- Beta mobile implementation: `/private/tmp/funcs-option3-beta-mobile-final.png`
- Combined comparison: `/private/tmp/funcs-option3-comparison-final.png`

The source is a 1487 × 1058 concept board containing desktop and mobile views. The stable implementation was captured in the in-app browser at a 1488 × 1094 CSS viewport and produced a 1473 × 1083 screenshot after excluding browser scrollbars. The mobile stable implementation was captured at a 390 × 844 CSS viewport and produced a 375 × 812 screenshot after excluding browser scrollbars. Density is effectively 1 CSS pixel per captured pixel. The combined comparison normalizes the source, stable desktop, and stable mobile images to 800 pixels high while preserving their aspect ratios.

State: light theme, stable C1.1 at the top of the page. The reciprocal beta captures show the Full Example before execution.

## Full-view comparison evidence

The selected hierarchy is preserved: one quiet edition bar, a separate contextual lesson row only on mapped pages, Chapter 0–4 Explorer navigation, and a single-column mobile reading view. The implementation retains the established Quartz desktop shell rather than moving the existing title/search/theme utilities into a new full-width header. This keeps the edition bar inside the central reading column on desktop; the control remains global in behavior because it is rendered on every stable page.

The reciprocal beta page uses the same rust accent and divider treatment. Its edition bar occupies the first 40–42 pixels, and the interactive lesson fills the entire remaining viewport without page-level horizontal or vertical overflow.

## Focused region evidence

No additional crop was required. The source board and the final mobile capture render the title, edition bar, breadcrumbs, title metadata, contextual beta link, and first lesson headings at readable size in the combined comparison. The separate beta screenshots make the full-viewport boundary and code-panel behavior directly inspectable.

## Required fidelity surfaces

- Fonts and typography: the implementation retains the product’s Montserrat headings and Newsreader body face. The mobile site title now wraps only between words and uses an optical size that matches the selected compact header.
- Spacing and layout rhythm: the global and contextual rows use quiet horizontal rules and restrained padding. Mobile spacing preserves the selected order without overlap. Desktop keeps the existing symmetric Quartz shell.
- Colors and tokens: navy structure, warm off-white surfaces, gray dividers, and rust edition actions match the reference direction. Dark-mode overrides provide an accessible lighter rust.
- Image quality and assets: the target contains no required imagery. Existing Quartz search and theme icons are reused; no replacement illustrations or synthetic assets were introduced.
- Copy and content: `Reading: Primary`, `Switch to Beta`, `Interactive version available`, `Open beta lesson`, `Reading: Beta`, and `Switch to Primary` match the selected design.
- Responsiveness and accessibility: stable and beta pages have no page-level overflow at 390 pixels. Links use semantic navigation/aside landmarks and visible focus outlines. The Explorer is hidden at the existing mobile breakpoint.

## Comparison history

### Pass 1 — blocked

- P2, stable desktop root: Quartz’s `html { width: 100vw; }` extended beneath the vertical scrollbar, producing document-level horizontal overflow. Evidence: `/private/tmp/funcs-option3-stable-desktop-current.png`.
- P2, mobile utility row: the site title broke inside “Fundamentals,” the full search label consumed horizontal space, and the edition bar was pushed to 173 pixels from the top. Evidence: `/private/tmp/funcs-option3-stable-mobile-pass1.png`.

Fixes:

- Added a higher-specificity automatic root width so the document uses the scrollbar-excluding content width.
- Kept the mobile title at a compact optical size, disabled mid-word wrapping, and changed the existing search control to icon-only at the mobile breakpoint.

### Pass 2 — passed

- Desktop document width equals client width with no horizontal overflow.
- Mobile document width equals client width; the title wraps to two lines, search is icon-only, and the edition bar begins at 88.5 pixels.
- The stable C1.1 contextual link opens the standalone beta page in one navigation with rendered content immediately visible.
- The beta page fills 390 × 844 and 1488 × 1094 viewports below its edition bar without page overflow.
- Browser console: no application errors. The standalone prototype emits only its documented in-browser Babel development warning.

## Findings

No actionable P0, P1, or P2 differences remain.

P3 follow-up: the desktop reference shows a full-bleed site header and edition bar, while the implementation preserves the current Quartz left-sidebar utility layout and constrains the edition bar to the reading column. A future site-shell redesign could make that bar full bleed, but doing so is not required for the selected navigation behavior and would exceed this implementation’s approved preservation boundary.

## Implementation checklist

- [x] Global stable edition switch with `/beta/` fallback.
- [x] C1.1 contextual beta link only on the mapped stable page.
- [x] Reciprocal C1.1 beta-to-primary switch.
- [x] Stable Explorer limited to Chapters 0–4.
- [x] Desktop and 390-pixel responsive verification.
- [x] Two-way route verification without blank intermediate state.
- [x] Browser console and overflow checks.

final result: passed
