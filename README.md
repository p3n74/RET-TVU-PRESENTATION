# ESPF-SR — Conference Presentation

A modern web-app presentation of the thesis **“Evolutionary Simulation and Prediction of Superbugs’ Generational Resistance Trajectories”** (Pazon & Montero, June 2026) and its IEEE conference manuscript, *Schedule-Aware PK/PD–Wright–Fisher Simulation of* Stenotrophomonas maltophilia *Resistance Under Cyclical and Alternating Therapy*.

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

## Deployment (Docker / Coolify)

The repo ships a multi-stage `Dockerfile` (Bun 1.3.2) that builds the static site and serves `dist/` with a tiny dependency-free Bun server (`serve.ts`).

- It listens on `0.0.0.0:$PORT` (Coolify/Cloud Run inject `PORT`; defaults to `3002`).
- The production image contains only `dist/` + `serve.ts` — no `node_modules` (the server uses Bun built-ins only).
- A Docker `HEALTHCHECK` polls the server root.

**Coolify:** create a resource from this Git repo, choose **Dockerfile** as the build pack, and expose port **3002** (or set `PORT` and match it). No environment variables are required.

Local Docker test:

```bash
docker build -t ret-presentation .
docker run --rm -p 3002:3002 ret-presentation
# open http://localhost:3002
```

Or run the production server without Docker:

```bash
bun install
bun run build
bun run start      # serves dist/ on PORT (default 3002)
```

## Content & figures

All copy is drawn verbatim-in-spirit (not pasted) from the thesis and manuscript; **every number is real** (463 isolates, 27 loci, 1000 generations, 10 seeds, Table I values). Figures in `public/figures/` are copied from `PAPER/figures/simulation/`. To refresh them, re-run the analysis scripts in the repo root and re-copy the PNGs.
