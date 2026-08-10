# Impeccable Arm Rationale

## Experiment contract

This is the Impeccable experimental arm for the FunCS beta comparison. The control remains `Ch2 4 Authoring Flow.html` and `Ch1 Branching Scope.html`. This arm changes only the visual world and responsive presentation. Lesson copy, source programs, fixtures, five-stage order, chapter destinations, progress gates, feedback, and browser-only runtime behavior remain the control.

The two page wrappers still call `window.FlowLessonSequence` with the same lesson objects as their controls. The four shared sources used by these pages hash byte-for-byte against the frozen workspace control:

- `flow-ch2-4-authoring.jsx`: `8fe74d6ec00d1535b9f287caa570021a1b65356ae25983551defee345ee5bde3`
- `tb-ch1-branching.jsx`: `216522a7dbafb06b1acfb490a27cf15615d838dd30069f98ec7e87364bed78f9`
- `tb-cycle-components.jsx`: `857c330005c9ba31b319b2501c8f2d1be18b3ff7362280bc3d3f0f13adc54708`
- `lesson-kit/concept-lesson-kit.jsx`: `05e77134c369b240630b38c7009b5947b58445431ebf3d0a682e0e201423bff7`

The yellow notes visible in the Goal stage are existing fixture copy. Live verification found them visible at full opacity on both redesigned pages; the arm neither adds nor hides them. Every CSS `content:` declaration is an empty decorative route mark.

## Command sequence

The arm followed Impeccable v4.0.4 in this order:

1. `/impeccable init` — ran `context.mjs` once for `beta/Funcs/Ch2 4 Authoring Flow.html` and recorded the static-product contract in isolated `PRODUCT.md`.
2. `/impeccable critique` — ran two independent critique agents, persisted the combined control assessment, and ran the deterministic detector.
3. `/impeccable shape` — ran the grounded concept seed and committed the `Trace Atlas` surface brief.
4. `/impeccable typeset` — established Archivo for interface copy and Azeret Mono for code, status, and route labels; raised microtype to readable sizes.
5. `/impeccable layout` — made code and state parallel timetable platforms and consolidated stage progress, status, and actions into one route footer.
6. `/impeccable colorize` — moved to cool mineral paper, charcoal enamel, and signal orange; restored readable contrast to the rigorous-quiz reference code.
7. `/impeccable distill` — removed generic rounded-card emphasis and blur from locked content while retaining every gate and destination.
8. `/impeccable adapt` — stacked code/state at mobile, kept all five chapters and stages visible, preserved meaningful status, and set controls to 44px.
9. `/impeccable polish` — added coherent focus, hover, pressed, disabled, safe-area, and reduced-motion treatments; fixed desktop status truncation.
10. `/impeccable audit` — checked both pages, both target viewports, interaction progress, source integrity, and the final detector.
11. `/impeccable document` — carbonized the implemented world into isolated `DESIGN.md` and `.impeccable/design.json` for the workflow record.

Underlying reproducible commands included:

```bash
node /Users/markholcomb/.agents/skills/impeccable/scripts/context.mjs --target 'beta/Funcs/Ch2 4 Authoring Flow.html'
node /Users/markholcomb/.agents/skills/impeccable/scripts/detect.mjs --json 'beta/Funcs/Ch2 4 Authoring Flow.html'
node /Users/markholcomb/.agents/skills/impeccable/scripts/concept-seed.mjs --scope direction --mode read
node /Users/markholcomb/.agents/skills/impeccable/scripts/concept-seed.mjs --scope direction --mode read --from e871c328 --candidate-count 7
node /Users/markholcomb/.agents/skills/impeccable/scripts/critique-storage.mjs latest 'beta/Funcs/Ch2 4 Authoring Flow.html'
node /Users/markholcomb/.agents/skills/impeccable/scripts/detect.mjs --json 'beta/Funcs/Ch2 4 Impeccable.html' 'beta/Funcs/Ch1 Branching Scope Impeccable.html'
```

## Control critique

Two independent agents produced the persisted control assessment: **26/40 (Acceptable), 0 P0, 2 P1**. The deterministic scan returned `[]`, while browser inspection exposed issues outside its static rules.

Material presentation findings were:

- the rigorous-quiz reference program was rendered at 48% opacity;
- 26–43px mobile targets and over-wide navigation rails hid context;
- blurred locked prose advertised unreadable content;
- 8.5–10px microtype and generic dashboard chrome suppressed the goal/subgoal grammar;
- the disabled terminal state did not read as a resolved ending.

The redesign preserves the control's strongest behavior: code/state causality, explicit progress, recoverable feedback, and gated sequence logic.

## Chosen direction

The grounded shape seed was `e871c328`, assigned form 4. Seven viable readings were considered: Debugger Rail, Instructor Registration Sheet, Architectural Section, Transit Trace Timetable, Lab Notebook, Score and Cue, and Conservation Map. The assigned transit-timetable reading became **Trace Atlas**.

Trace Atlas treats execution as a route with stops rather than as an LMS card grid. One orange datum connects chapter position, code/state causality, and the five lesson stages. Square-edged paper surfaces, charcoal route infrastructure, compact monospaced status, and restrained orange signaling make the instructional grammar—not generic dashboard chrome—the identity. Hand-drawn zine and cyclorama challengers were rejected because their expressive value competed with exact program-state identification or depended too heavily on color and illustration.

## QA evidence

The final pages were served over HTTP and visually inspected in the in-app browser at **1280×720** and **390×844**.

- Ch2 desktop: body client/scroll `1280/1280`; footer status client/scroll `180/180`; Goal Continue advanced to Goal A `1/12`.
- Ch2 mobile: body client/scroll `390/390`; Back and Continue both measured 44px high.
- Ch1 desktop: body client/scroll `1280/1280`; footer status client/scroll `180/180`.
- Ch1 mobile: body client/scroll `390/390`; Back and Continue both measured 44px high; Continue advanced to Goal A.
- Both frozen Goal notes were `display:block`, `visibility:visible`, `opacity:1`, and in the desktop viewport.
- The final deterministic detector returned `[]` for both candidate HTML files.
- Browser logs contained no application error; the static prototype retains its existing React development/Babel-in-browser warnings.

Screenshots are retained in the isolated work area under `.impeccable/screenshots/` for the finish review; they are not experiment deliverables.

## Final audit

An independent finish reviewer initially found one arm-owned contrast cluster. A single bounded color correction changed faint ink to `#59665f`, signal orange to `#cf4325`, and the enabled final-CTA hover to deep signal orange. Fresh browser captures and a second independent review then returned **Verdict: PASS — 18/20 (Excellent), with no material findings**.

| Dimension | Score | Result |
|---|---:|---|
| Accessibility | 3/4 | Arm-owned contrast passes AA; inherited shared-renderer semantics remain. |
| Performance | 4/4 | Lean static CSS with bounded transitions and reduced-motion handling. |
| Theming | 3/4 | Coherent token system; frozen inline-style adaptation is intentionally brittle. |
| Responsive design | 4/4 | Clean 1280px and 390px compositions with 44px controls. |
| Implementation integrity | 4/4 | Content, fixtures, renderers, navigation, gates, and behavior are frozen. |
| **Total** | **18/20** | **Excellent** |

Final measured contrast pairs are 4.95:1 for faint ink on deep paper, 5.39:1 on paper, 4.68:1 for the enabled CTA at rest, and 6.81:1 on hover.

Known shared-source limitations retained by the experiment contract are the selector's absence of a dedicated visible close control, generic semantic structure inside the shared renderer, external development-script warnings, and immutable terminal-button behavior. The arm improves their presentation where CSS permits without changing them.

## Files

- `beta/Funcs/lesson-kit/flow-impeccable.css`
- `beta/Funcs/Ch2 4 Impeccable.html`
- `beta/Funcs/Ch1 Branching Scope Impeccable.html`
- `beta/Funcs/Impeccable Arm Rationale.md`
