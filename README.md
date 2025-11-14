# Kedar's Smart Gourmet Kitchen

Retro-inspired recipe discovery app that matches whatever is in your pantry with curated dishes, ingredient recognition, and smart substitution tips.

## 1. Working Application URL
| Environment | URL | Notes |
|-------------|-----|-------|
| Local Dev | http://localhost:5173 | Run `npm install` then `npm run dev -- --host` to access from your browser. |

> The project is framework-agnostic and can be hosted on any static provider (Vercel/Netlify). Instructions for hosting are in `docs/deployment.md`.

## 2. Source Code
Public GitHub repository (branch `main`): https://github.com/kedar4real/smart_recipe_generator

### Running Locally
```bash
git clone https://github.com/kedar4real/smart_recipe_generator.git
cd smart_recipe_generator
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview -- --host
```

## 3. Approach Summary (≈180 words)
I treated this like a scrappy kitchen companion: keep it friendly, fast, and honest about what’s in the pantry. First step was outlining the data sources (`recipes.json`, substitutions, presets) so every feature—chips, filters, detail view—talks to the same recipe service. From there I wired a shared `FilterContext` so quick toggles in the navbar immediately influence Home and Search, which keeps the whole experience feeling intentional. Photo recognition is stubbed but lives behind a service hook, so flipping to a real endpoint later is painless. The “smart suggestions” section was important; it nudges people toward the one ingredient that unlocks more dishes, which mirrors how I actually cook. Visual polish leans on Tailwind with a few helper classes (`retro-card`, `EmptyState`) to stay consistent. LocalStorage hooks handle favorites and ratings so there’s no backend dependency, and the detail page has proper substitutions, nutrition, and loading states. Update the docs when something changes, run `npm run build`, and keep `node_modules`/`dist` out of git—that’s the whole workflow.

## Additional Docs
- `docs/image-api.md` – API contract for the image recognition endpoint.
- `docs/deployment.md` – Vercel/Netlify instructions.

## License
Open-source for assignment/review purposes.
