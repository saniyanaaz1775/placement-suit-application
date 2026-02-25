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

### Deploy to Vercel

The app builds from the **repo root** and outputs to `apps/web/dist`. Use one of these:

**Option A – Deploy from Git (recommended)**  
1. Push this repo to GitHub and connect it in [Vercel](https://vercel.com) (Import Project).  
2. In the project **Settings → General → Build & Development Settings**:  
   - **Root Directory:** leave empty (repo root).  
   - **Build Command:** `npm run build` (or leave default; `vercel.json` sets it).  
   - **Output Directory:** `apps/web/dist`.  
3. Save and redeploy. If you still see “No Output Directory”, redeploy **without cache** (Deployments → … → Redeploy → clear cache).

**Option B – Deploy from your machine**  
1. Log in: `npx vercel login`  
2. From the repo root: `npx vercel --prod`  
3. Follow the prompts to link the project (or create a new one).

`vercel.json` in the repo root already sets `outputDirectory` and `framework: null` so Vercel uses the monorepo output path.

---

This repository was scaffolded by an automated plan.

