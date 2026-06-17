# ESPF-SR — Conference Presentation

A modern web-app presentation of the thesis **“Evolutionary Simulation and Prediction of Superbugs’ Generational Resistance Trajectories”** (Pazon & Montero, June 2025) and its IEEE conference manuscript, *Schedule-Aware PK/PD–Wright–Fisher Simulation of* Stenotrophomonas maltophilia *Resistance Under Cyclical and Alternating Therapy*.

The site is a single scrollable narrative built for a research-conference audience: it walks the pipeline (genome → PK/PD pressure → Wright–Fisher evolution → outcomes) as numbered stages, surfaces the real result figures, and closes with the discussion, limitations, and citation colophon.

## Stack

- **Vite + React + TypeScript** — no UI framework; token-disciplined plain CSS.
- Fonts via Google Fonts: **Newsreader** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (numerals / equations / labels).
- Scroll-spy section index and reveal-on-scroll via `IntersectionObserver` (reduced-motion safe).

## Design

Built with the **Hallmark** design skill.

- Genre: editorial · Macrostructure: Narrative Workflow · Theme: Almanac
- Nav: N3 side-rail · Footer: Ft4 dense colophon · Enrichment: none (real paper figures)
- Tokens live in [`tokens.css`](./tokens.css); the build log is in `.hallmark/log.json`.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Content & figures

All copy is drawn verbatim-in-spirit (not pasted) from the thesis and manuscript; **every number is real** (463 isolates, 27 loci, 1000 generations, 10 seeds, Table I values). Figures in `public/figures/` are copied from `PAPER/figures/simulation/`. To refresh them, re-run the analysis scripts in the repo root and re-copy the PNGs.
