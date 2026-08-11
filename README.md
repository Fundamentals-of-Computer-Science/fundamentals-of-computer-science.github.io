# Fundamentals of Computer Science

This repository contains the Quartz site for the FunCS book.

## Content Tracks

- `content/` is the live book source. The GitHub Pages workflow builds this
  directory with the default `npx quartz build` command.
- `content-next/` is the beta/vNext book source. Use it for rewrites and
  structural experiments that should not appear on the live site yet.
- `content/beta/Funcs/` is the active interactive beta prototype area. It holds
  browser-loadable concept-lesson HTML/JSX prototypes and the local lesson kit.
  This is still static-site work, not a backend app.
- `content/beta/Funcs/archive/` holds older mockups, wireframes, design-canvas
  experiments, sketches, and uploaded design assets. Treat those files as
  historical reference; the active lesson/chapter/book flow stays directly
  under `content/beta/Funcs/`.

Keep both tracks in the same repository. Do not use `draft: true` to hide the
whole beta book; use drafts only for scratch pages inside either content tree.

## Local Preview

Preview the live book:

```bash
npm run preview:live
```

Preview the beta book:

```bash
npm run preview:beta
```

Preview the interactive beta prototype:

```bash
cd content
python3 -m http.server 8123
```

Then open:

- `http://127.0.0.1:8123/beta/Funcs/Ch0%201%20Programs%20Input%20Output%20Tour.html`
- `http://127.0.0.1:8123/beta/Funcs/Ch1%20Data%20Memory%20Sequence.html`
- `http://127.0.0.1:8123/beta/Funcs/Ch1%20Boolean%20Expressions%20Sequence.html`
- `http://127.0.0.1:8123/beta/Funcs/Ch2%20Numeric%20Data%20Memory%20Sequence.html`

Use another local port if `8123` is already occupied.

Chapter 0 is the approved exception to the five-stage lesson flow. Its fixture
defines a nine-page `flow.sequence`: the five canonical stages, each used once
in canonical order, plus four fixture-driven `intro` pages. Chapter 1 and later
lessons keep the five-stage default unless a later chapter plan approves a
different sequence. Author the sequence through the shared
`lesson-kit/flow-lesson-stages.jsx` contract and run `flowValidateLesson` after
the fixture loads.

The underlying commands are:

```bash
npx quartz build --serve
npx quartz build -d content-next -o public-next --serve --port 8081 --wsPort 3002
```

`public/` and `public-next/` are generated build outputs and should not be
committed.

## Promoting Beta Changes

Do Quartz beta rewriting in `content-next/`. Build interactive lesson sequence
prototypes in `content/beta/Funcs/` until the component and authoring contract
are stable. When a section or component is ready for publication, copy or patch
that specific source into the publishable track, then run the live build before
publishing.

Interactive visualizers should follow the shared visualizer grammar exported as
`FUNCS_VISUALIZER_GRAMMAR`:

- Use `reduction` / `evalDetail` when the question is "what value does this
  term become?"
- Use `controlFlow` / `loopTrace` when the question is "which source row runs
  next?"
- Use `memory` when the question is "what bindings, values, or frames exist
  now?" Arrays, object fields, linked nodes, and call frames are memory shapes
  inside this category, not separate visualizer families.

Source annotations, console output, hover links, quiz blanks, compact/full
layouts, and syntax badges are overlays or modes on those core tools.

Do not create chapter-specific visualizer shapes until this grammar has been
checked first and the shared lesson-kit contract has proven insufficient.
