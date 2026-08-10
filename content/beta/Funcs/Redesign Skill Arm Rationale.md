# Redesign skill arm: audit and rationale

This document belongs to the `redesign-existing-projects` experimental arm. The control is `Ch2 4 Authoring Flow.html` plus `Ch1 Branching Scope Authoring Flow.html`; those pages, their fixtures, and the shared lesson renderers remain unchanged.

## Pre-change scan and diagnosis

Recorded before visual fixes were selected.

### Stack and existing patterns

- The prototype is static HTML served over HTTP. Each page loads React 18 UMD, React DOM, in-browser Babel, shared JSX renderers, and one lesson fixture.
- Presentation is vanilla CSS plus extensive React inline styles. There is no Tailwind or component styling dependency to migrate.
- `FlowLessonSequence` delegates the five stages to `TBPageSequence`. The control already has useful class hooks for the sequence, footer, stage layouts, and stage body, but most interior presentation is inline.
- The two controls use the same shell and renderer. A shared, scoped stylesheet can therefore treat both lessons without touching fixture data or shared JSX.

### Typography

- Source Sans 3 and JetBrains Mono are intentional fonts, not browser defaults; code and numeric state already use the correct monospace face.
- Hierarchy is compressed. Most interface text sits between 8.5px and 14.5px, while many unrelated labels use weights of 800 or 900. The 20px main-lesson title does not carry enough presence to anchor a long instructional page.
- Uppercase micro-labels repeat across navigation, stage kickers, panes, cards, and code/memory sections. They help scanning in a few places but become visual noise when nearly every label uses the same treatment.
- Main prose widths are appropriately constrained, but line-height and vertical separation are tight in dense quiz and exercise surfaces.
- Large headings do not use tracking or balancing, while small labels do. The result is stronger emphasis on metadata than on the lesson itself.

### Color and surfaces

- The inner application uses cool white/slate/blue while the outer shell is warm beige. The abrupt palette boundary makes the frame feel embedded rather than integrated.
- Blue is the default accent, but amber, green, red, purple, cyan, and multicolor memory references all compete for attention. Some secondary colors are semantically necessary for feedback and memory identity; the non-semantic chrome does not need to add more.
- Repeated white cards with pale borders are the dominant component treatment. Active tabs, questions, code blocks, memory rows, exercises, and status chips use small variations of the same bordered-card recipe.
- The control is mostly flat. Its only significant shadow is a generic outer-frame shadow; interior hierarchy relies on more borders rather than surface depth or spacing.
- The dark console is a purposeful visualization surface and should stay dark. It is not an accidental dark marketing section.

### Layout and spacing

- The desktop frame stretches to the viewport with only 18px of outer padding and no readable maximum width. On wide displays, instructional relationships spread apart.
- The goal and rigorous-quiz split views are pedagogically useful and should remain. Their 55/45 and 40/60 grids already collapse to one column below 760px.
- The top chapter strip and bottom sequence footer both pack substantial navigation into shallow bands. On narrow screens the footer correctly stacks and the tabs scroll, but controls remain visually cramped.
- Main-lesson and exercise pages have sensible content widths, yet their sections use repetitive, nearly symmetrical padding. Major stage changes do not receive enough whitespace.
- Card groups, pricing layouts, dashboards, and marketing feature rows are not present; those audit checks do not apply.

### Interactivity and states

- The lesson already implements active navigation, disabled gating, answer feedback, quiz success/error surfaces, selector expansion, walkthrough stepping, and locked-content states.
- Buttons and links have almost no hover or pressed feedback. Most style changes happen only after a click.
- A focus ring exists only for buttons inside `.flow-stage-frame`. Chapter links, the current-chapter selector, sequence tabs, and footer controls do not receive a consistent arm-level focus treatment.
- Transitions are absent from most controls. Existing locked-content transitions correctly use filter and opacity.
- Loading, network error, and empty-dashboard states do not apply: lessons load from local static fixtures and do not fetch mutable data.
- There are no dead `#` links in the lesson flow. Back/next and current-page indications already exist.

### Content

- The instructional writing is specific to the lesson and contains no lorem ipsum, generic people or companies, marketing clichés, artificial metrics, or repetitive blog metadata.
- Success and error feedback is direct and restrained. Content changes would confound the design comparison, so this arm will preserve all copy exactly.

### Component patterns and iconography

- The strongest applicable generic pattern is card repetition: borders, white backgrounds, small radii, and pills carry nearly every hierarchy level.
- Filled/ghost button pairing is used for required back/next navigation, where the hierarchy is meaningful. It needs refinement, not replacement.
- Status, type, and stage labels frequently use pill shapes. They can be squared into editorial tabs or compact tags without changing meaning.
- The interface uses a few functional Unicode symbols, not a generic icon library. There are no stock photos, avatars, testimonial carousels, pricing towers, or marketing accordions.
- The page has no favicon or social image, but this experiment does not own global product branding assets. Adding invented branding would weaken the comparison.

### Code quality and strategic omissions

- Shared JSX mixes semantic elements (`nav`, `section`, `article`) with many presentational `div`s and hardcoded pixel styles. Refactoring it would contaminate the control and is outside this arm's ownership.
- The variant therefore needs carefully scoped overrides. Any `!important` declarations are containment tools for inherited inline styles, not a new global styling convention.
- CDN imports exist in both controls and must remain identical. No new runtime or library is warranted.
- The control provides viewport and title metadata but no description. A variant-specific description is safe page metadata.
- Back navigation exists at both chapter and stage levels. Legal links, cookie consent, a custom 404, and form validation are site-level or form-specific concerns and do not apply to these isolated lesson pages.
- A skip link would require extra page content beyond the wrapper-only treatment. This arm instead gives every existing interactive element a visible keyboard focus state and keeps the main lesson as the first substantive region after chapter navigation.

## Selected design direction

The arm uses a warm editorial/technical direction. It should still read as the same FunCS lesson, but the lesson—not the navigation chrome—now carries the strongest presence.

- Keep Source Sans 3 for readable instructional copy and JetBrains Mono for code, state, and numeric status. Use system Georgia only for lesson and act headings to create a clearer editorial anchor without adding a dependency.
- Unite the shell around warm paper, stone, and ink neutrals. Use muted rust as the one non-semantic accent across the current chapter, active stage, required question, focus ring, and forward action.
- Preserve semantic success, error, warning, code-syntax, memory-reference, and console colors. Those colors encode feedback or program state rather than decoration.
- Constrain the application to 90rem, integrate the warm outer and inner surfaces, and add a light paper texture through CSS gradients. Use one warm shadow direction for the outer frame and active work.
- Increase the smallest type, give headings a stronger scale and tighter tracking, keep prose near 65 characters, and expand vertical rhythm in lesson, quiz, and exercise stages.
- Replace footer tab cards with a quieter editorial rail. Active location is expressed through a rust underline and wash; inactive stages rely on spacing rather than five equal bordered boxes.
- Remove borders from active questions and exercise cards where spacing, a left rule, and a subtle warm shadow can communicate hierarchy. Keep borders for code, memory, and answer controls where containment carries meaning.
- Add 180–220ms hover transitions, a one-pixel lift, pressed compression, a high-contrast rust focus outline, and reduced-motion handling. Disabled controls retain their existing gating logic and gain a non-interactive cursor plus reduced saturation.
- Retain the useful split views at desktop and the shared one-column collapse below 760px. At 390px the footer remains stacked, stage tabs remain horizontally scrollable, and long code stays inside its existing scroll containers.

Implementation is deliberately additive: `flow-redesign-skill.css` is scoped under `.redesign-skill-arm`; each variant HTML page differs from its control only by page metadata, that stylesheet link, and the wrapper class. Script order, fixture selection, and `FlowLessonSequence` calls are identical.

## QA record

Bounded validation was run from the isolated snapshot over `python3 -m http.server 8765`.

- HTTP: both variant HTML pages and the shared arm stylesheet returned `200 OK`.
- Desktop: Ch2.4 and Ch1.4 rendered at 1280×720. All five stage tabs loaded the expected shared stage surfaces. Goal, Main Lesson, Rigorous Quiz, and Exercises received visual inspection; Pre-Quiz state and gate text were inspected in the DOM.
- Mobile: Ch2.4 Main Lesson and Goal Introduction plus Ch1.4 Exercises were inspected at 390×844. Root, body, sequence content, and the tested cards reported zero horizontal overflow. The split goal layout collapsed to one column and the sequence footer entered its existing stacked mode.
- Navigation and walkthrough: stage tabs changed stages; `Continue — start running` advanced the Ch2.4 walkthrough to `Goal A · 1/12`, enabled Back, and changed the forward label to `Run next line`.
- Gating and feedback: the first Ch2.4 Main Lesson check began with `0/3 checks answered`; choosing its correct answer produced the existing correct explanation, changed status to `1/3`, revealed the second act, kept the third act locked, and kept `Next: Rigorous Quiz` disabled. Ch1.4 Pre-Quiz began at `0/5 placed` with Next disabled. The rigorous quiz began at `question 1 of 5` with Next disabled. Exercises retained a disabled end-of-lesson action.
- Accessibility and states: keyboard Tab focus produced a visible 3px rust outline, offset from the focused stage button, with a paper separation ring. The loaded stylesheet contains scoped hover, active, focus-visible, disabled, and reduced-motion rules; normal pointer clicks were exercised during stage, walkthrough, and answer testing.
- Browser console: no application errors were reported. The only messages were Babel's expected development-mode warning already inherent to this in-browser-Babel prototype.
- Static checks: the browser loaded and parsed the scoped stylesheet (including the interaction-state rules); HTML diff inspection confirmed that each variant preserves the exact control script and fixture list and the same `window.FlowLessonSequence` architecture. No shared fixture, renderer, control page, index, or main-workspace file was changed.

Limitations: the bounded pass did not answer every branch of every assessment, execute a full Quartz build, or test an offline CDN failure. The parent integration task should run its normal repository build and combined comparison-page checks after copying this arm into the main workspace.
