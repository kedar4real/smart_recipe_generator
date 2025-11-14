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
The goal was to build a lightweight yet delightful pantry assistant that honors the original requirements: ingredient chips, optional photo recognition, recipe matching, filters, substitutions, nutrition, and favorites. I started by defining a clear data contract (`recipes.json`, `substitutions.json`) and services (`recipeService`, `imageRecognitionService`) so UI features remain decoupled. Using a shared `FilterContext` keeps dietary/time filters in sync between the navbar, Home, and Search, ensuring the experience feels cohesive. Smart suggestions analyze overlap between the user’s pantry and the dataset to recommend the next best ingredient, while the substitution engine surfaces meaningful swap hints in the detail page. The retro visual language is handled through Tailwind utilities plus reusable primitives (`retro-card`, `EmptyState`, `SmartSuggestions`). Favorites, ratings, and ingredient recognition all rely on encapsulated hooks (localStorage) so state persists without extra dependencies. Documentation (`docs/image-api.md`, `docs/deployment.md`, README) explains how to extend the stubbed Clarifai endpoint and deploy the Vite build. The bundle intentionally excludes `node_modules`, `.env`, and `dist/` to stay submission-ready.

## Additional Docs
- `docs/image-api.md` – API contract for the image recognition endpoint.
- `docs/deployment.md` – Vercel/Netlify instructions.

## License
Open-source for assignment/review purposes.
