# Placement Suite

Monorepo that unifies Job Notification Tracker, Placement Readiness Platform, and AI Resume Builder.

Structure:
- apps/web — main SPA
- packages/ui — shared design system
- packages/state — Zustand store and persistence
- packages/data — curated datasets

Run locally:
1. Install dependencies in the repo root: `npm install`
2. Start dev server for the web app:
   - `npm run dev` (this runs the apps/web dev script)

Notes:
- Vite is used for the `apps/web` frontend. The repo includes basic Vite and Tailwind configs under `apps/web/`.
- Before using Tailwind directives, install dev dependencies (tailwindcss, postcss, autoprefixer).
- To build for production: `npm run build`

Suggested next steps:
1. Install dependencies locally.
2. Commit the repository and push to GitHub.
3. Connect the repository to Vercel and point the root build command to use the workspace (or set `apps/web` as the project root).

This repository was scaffolded by an automated plan.

