# Smart Recipe Generator – Technical Specification

## 1. Product Overview
- **Purpose**: Help home cooks discover recipes that match the ingredients they already have, optionally aided by image-based ingredient recognition.
- **Stack**: React 18 + Vite, TypeScript, Tailwind CSS, React Router, React Context/hooks, local JSON data (recipes, substitutions). No backend dependency.
- **Principles**: Fast perceived performance (skeletons, optimistic toggles), accessible UI, modular architecture so future data sources or ML services can be swapped in.

## 2. Goals & Non-Goals
### Goals
- Allow users to enter ingredients (chips with add/remove/clear) and immediately search matching recipes.
- Support optional image upload that returns detected ingredients (stubbed client-side for now).
- Provide filtering (dietary, preparation time, difficulty, cuisine) and best-match sorting.
- Offer detailed recipe view with servings adjuster, ingredients, steps, nutrition, related recipes.
- Persist favorites and user preferences locally.
### Non-Goals
- Real backend integration, nutrition APIs, or actual ML for image recognition (stubs acceptable).
- Multi-user auth, collaborative features, or server-side persistence.

## 3. Personas & Scenarios
- **Busy Home Cook (Alex)**: Wants dinner ideas using fridge ingredients, filters for vegetarian, sees prep time quickly.
- **Health-Conscious Planner (Maya)**: Tracks nutrition per serving, wants gluten-free meals, saves favorites for weekly rotation.
- **Experimental Foodie (Leo)**: Uploads pantry photo, tests substitution suggestions, browses related cuisines.

## 4. Core Workflows
1. **Ingredient Search**
   - Land on Home → type ingredients separated by commas → chips render under input (add/remove).
   - Optionally pick preset combos (from constants) or upload image (stub returns mock list).
   - Click “Find Recipes” or press Enter → navigate to `/search` with parsed ingredients in state.
2. **Filtering & Sorting**
   - On search page, adjust dietary checkboxes, select difficulty/cuisine, set max time.
   - Results auto-refresh (debounced or triggered by button). Recipes sorted by `matchScore`.
   - Empty states show emoji + helpful text.
3. **Recipe Detail**
   - Click card → `/recipe/:id`. See hero image, badges, rating stars, time breakdown, ingredients with checkbox per item.
   - Serving adjuster recalculates ingredient amounts and nutrition (per serving).
   - Related recipes displayed (same cuisine or shared ingredients) near footer of detail page.
4. **Favorites**
   - Heart icon toggles favorite. Stored via `useLocalStorage` under `favorites`.
   - `/favorites` lists cards with description `“Your favorite recipe”`.

## 5. Functional Requirements
### Ingredient Input
- Chips show each normalized ingredient; removal updates input and active list.
- Clear-all button resets state.
- Validation: ignore duplicates/blank tokens (`parseIngredientInput`).

### Image → Ingredient (Optional Stub)
- Component accepts image file, “Detect” button triggers stub hook/service.
- Stub returns curated ingredient list after delay; errors surface toast/modal.

### Recipe Matching & Filters
- Source data: `src/data/recipes.json`. Each recipe contains metadata (ingredients, instructions, nutrition, tags).
- Matching algorithm (see `recipeMatching.ts`):
  - Base score from ingredient overlap ratio.
  - Deductions for missing required ingredients or exceeding `maxTime`.
  - Explanation strings (e.g., “Missing onion, but close match”).
- Filter order: dietary → difficulty → cuisine → time; short-circuit to avoid unnecessary computation.

### Recipe Listing
- `RecipeGrid` handles loading skeletons (`Skeleton` component) and empty states.
- Cards show match score badge, heart toggle, time, difficulty, optional explanation snippet.
- Sorting by `matchScore` descending; ties resolved by shorter total time.

### Recipe Detail Page
- Sections: hero (image + favorite), metadata badges, time stats, ingredients checklist, instructions list, nutrition summary (per serving), related recipes.
- Serving adjuster updates ingredient scaling (`scaleIngredients`) and nutrition ratio.
- Related recipes derived from `recipeService.getRelated(recipe.id)` (to implement using cuisine and overlapping tags).

### Favorites & Persistence
- `useFavorites` exposes `favorites`, `isFavorite`, `toggleFavorite`.
- Data persisted with `useLocalStorage('favorites', string[])`.
- Favorites page reuses `RecipeGrid`; match score forced to 100.

### Related Recipes
- Determine by matching cuisine first, then shared ingredients. Limit to 3 cards, exclude current recipe.
- Display within detail page card grid; fallback copy if none.

### Loading & Empty States
- Each asynchronous hook (recipe search, image detection) toggles `loading` boolean.
- Use `Skeleton` placeholders (cards, text rows) during simulated delays.
- Empty result copy should encourage adjusting filters.

## 6. Architecture Overview
- **Entry**: `App.tsx` sets up `BrowserRouter`, wraps pages in `PageLayout`.
- **Pages**: Home, Search, Detail, Favorites, NotFound.
- **Components**:
  - `components/common`: UI primitives (Button, Input, Card, Modal, Badge, Skeleton).
  - `components/recipe`: higher-level recipe UI (RecipeCard, RecipeGrid, RecipeDetail sections, Filter sidebar).
  - `components/ingredient`: IngredientInput, ChipList, ImageUpload; responsible for parsing and invoking callbacks.
  - `components/user`: FavoriteButton, RatingStars, maybe `PreferencesForm`.
- **Contexts**:
  - `RecipeContext`: provides recipe data cache, search methods, substitution helpers.
  - `UserContext`: manages favorites, dietary defaults, last-used filters.
- **Hooks**:
  - `useRecipeSearch`: orchestrates filters + `matchRecipes`, exposes `recipes`, `loading`, `searchRecipes`.
  - `useFavorites`: wraps context/local storage.
  - `useLocalStorage`: typed helper for get/set/remove.
  - Optional `useImageRecognition` stub returning mocked ingredients with progress state.
- **Services**:
  - `recipeService`: CRUD-like access to local JSON, `getAll`, `getById`, `getByIds`, `getRelated`.
  - `imageRecognitionService`: stub for uploading image + returning recognized ingredients (promisified timeout).
  - `storageService`: wrapper over `localStorage` with JSON parse/stringify and namespacing.
- **Utils**: `ingredientParser`, `recipeMatching`, `nutritionCalculator`, `unitConverter`, `substitutionEngine`, `validation`, `formatting`, `errorHandler`.

## 7. Data & File Organization
- `src/data/recipes.json`: curated recipes with ids, metadata, nested nutrition, steps, ingredient objects.
- `src/data/substitutions.json`: map ingredient → replacements with notes and suitability tags.
- `src/constants/`: Presets, dietary options, difficulty levels, cuisine types, measurement lists.
- `src/types/`: `Recipe`, `Ingredient`, `Nutrition`, `RecipeMatch`, `Filters`, `UserPreferences`.
- `src/services/`: logic for accessing JSON, bridging optional stubs.

## 8. Data Flow
1. User input (Home/Search) updates React state → `useRecipeSearch`.
2. Hook pulls recipe dataset once via `recipeService.getAll()` (memoized).
3. Filtering/matching returns `RecipeMatch[]` sorted with explanation.
4. Components render, handing `recipe.id` to `FavoriteButton` which reads/writes `localStorage`.
5. Detail page uses `recipeService.getById` + derived data; scaling and nutrition calculations done client-side.
6. Related recipes query runs on detail load; results shown as cards linking to other detail pages.

## 9. Context & State Considerations
- Wrap `App` with `<RecipeProvider>` and `<UserProvider>` to avoid prop drilling.
- Store heavy datasets in context to prevent repeated JSON parsing.
- Keep filter state local to `RecipeSearchPage`; persist last-used filters optionally via context/local storage.
- Use React Query-style patterns only if necessary; otherwise memoization suffices.

## 10. Error Handling & UX
- Global error boundary (optional) logs to console and shows friendly message.
- `errorHandler` utility standardizes user-facing text vs. console detail.
- Forms validate input before triggering search; display inline helper text for invalid image uploads or empty ingredient lists.
- Accessible focus states for buttons/inputs; modals trap focus.

## 11. Testing & Validation
- Unit tests for utilities (`ingredientParser`, `recipeMatching`, `substitutionEngine`) ensure deterministic scoring.
- Component tests for IngredientInput chip behavior and RecipeCard rendering.
- Hooks tested with React Testing Library (useRecipeSearch filtering logic).

## 12. Future Enhancements
1. Integrate real image-recognition API (Clarifai, Google Vision) behind `imageRecognitionService`.
2. Sync favorites across devices via backend or cloud storage.
3. Add shopping list generation and pantry inventory tracking.
4. Support multilingual UI and localized ingredient names.
5. Introduce seasonal recommendations and push notifications (PWA).

---
This spec captures the current architecture and the roadmap for finishing missing pieces without rewriting functioning code. It should guide incremental implementation aligned with the existing naming, styling, and modular structure.
