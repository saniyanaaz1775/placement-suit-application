# Vercel deployment checklist

Use **one** of the two configurations below. Your screenshot shows **Root Directory: `apps/web`**, so follow **Option A** first.

---

## Option A: Root Directory = `apps/web` (your current choice)

1. **Root Directory:** Keep as **`apps/web`**.
2. Click **"> Build and Output Settings"** to expand.
3. Set:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`  
     (Vite writes to `dist` inside `apps/web`, so relative to this root it is `dist`.)
4. **Install Command:** leave default **`npm install`** (runs inside `apps/web`).
5. Click **Deploy**.

If the build fails with "cannot find module" for something in `packages/`, use Option B instead.

---

## Option B: Build from repo root (recommended for this monorepo)

The repo root has a `vercel.json` that sets `outputDirectory: "apps/web/dist"` and `framework: null`. For that to apply, Vercel must use the repo root.

1. **Root Directory:** Click **Edit** and **clear** it (leave empty so the repo root is used).
2. Expand **"> Build and Output Settings"**.
3. Set:
   - **Build Command:** `npm run build`
   - **Output Directory:** `apps/web/dist`
   - **Install Command:** `npm install`
4. Click **Deploy**.

This runs `npm install` and `npm run build` from the repo root, so all workspaces (`packages/ui`, `packages/state`, `packages/data`) are installed and the build output is in `apps/web/dist`.

---

## If you still see "No Output Directory named 'dist'"

- **Redeploy without cache:** Deployments → … on the latest deployment → **Redeploy** → enable **Clear build cache** → Redeploy.
- Ensure the latest code (including root `vercel.json` with `"framework": null` and `"outputDirectory": "apps/web/dist"`) is pushed to the `master` branch before deploying.
