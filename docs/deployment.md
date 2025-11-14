# Deployment Guide (Vercel / Netlify)

1. **Install dependencies**
   ```
   npm install
   ```

2. **Build the production bundle**
   ```
   npm run build
   ```
   The compiled assets live in `dist/`.

3. **Environment variables**
   - `VITE_API_URL` *(optional)*: URL of the backend that exposes `/api/recognize-ingredients`. Leave unset to use the local stub.

4. **Vercel**
   - Create a new Vercel project, choose the repo, and keep the default `npm run build` / `dist` settings.
   - Add `VITE_API_URL` under Project Settings → Environment Variables.
   - Trigger a deploy; Vercel serves the static dist folder automatically.

5. **Netlify**
   - `netlify init` or connect the repo in the Netlify UI.
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables under Site settings → Build & deploy → Environment.

6. **Local preview of the production build**
   ```
   npm run build
   npm run preview -- --host
   ```

The site is a static Vite build, so any static host (GitHub Pages, Render static, etc.) can serve the `dist` directory once the build completes.
