import { useMemo, useRef, useState } from 'react'
import { IngredientInput } from '@/components/ingredient/IngredientInput.jsx'
import { ImageUpload } from '@/components/ingredient/ImageUpload.jsx'
import { RecipeGrid } from '@/components/recipe/RecipeGrid.jsx'
import { useRecipeSearch } from '@/hooks/useRecipeSearch.js'
import { useFavorites } from '@/hooks/useFavorites.js'
import { useRatings } from '@/hooks/useRatings.js'
import { useFilters } from '@/contexts/FilterContext.jsx'
import { getAllRecipes, getRelatedRecipes } from '@/services/recipeService.js'
import { SmartSuggestions } from '@/components/search/SmartSuggestions.jsx'
import { MarqueeStrip } from '@/components/common/MarqueeStrip.jsx'
import { useScrollParallax } from '@/hooks/useScrollParallax.js'

const defaultFilters = {
  dietaryTags: [],
  cuisines: [],
  difficulty: '',
  maxTime: undefined,
}

const allRecipes = getAllRecipes()

export default function HomePage() {
  const ingredientSectionRef = useRef(null)
  const [ingredients, setIngredients] = useState([])
  const { favorites, toggleFavorite } = useFavorites()
  const { ratings } = useRatings()
  const { filters: globalFilters, updateFilters } = useFilters()
  const heroParallax = useScrollParallax(0.05, 50)

  const searchFilters = useMemo(
    () => ({
      ...defaultFilters,
      ...globalFilters,
    }),
    [globalFilters]
  )

  const { results, loading } = useRecipeSearch(ingredients, searchFilters, 'best')
  const topResults = useMemo(() => results.slice(0, 6), [results])

  const suggestions = useMemo(() => {
    const ratedEntries = Object.entries(ratings).sort((a, b) => b[1] - a[1])
    if (ratedEntries.length === 0) {
      return allRecipes.slice(0, 4).map((recipe, index) => ({
        recipe,
        score: 80 - index * 5,
      }))
    }

    const [topId] = ratedEntries[0]
    const anchor = allRecipes.find((recipe) => recipe.id === topId) || allRecipes[0]
    const related = anchor ? getRelatedRecipes(anchor, 4) : []
    const uniqueRecipes = [anchor, ...related].filter(Boolean)

    return uniqueRecipes.slice(0, 4).map((recipe, index) => ({
      recipe,
      score: 95 - index * 5,
    }))
  }, [ratings])

  const handleScrollToIngredients = () => {
    ingredientSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDetectedIngredients = (detected) => {
    if (!detected || detected.length === 0) return
    setIngredients((prev) => {
      const merged = new Set([...prev, ...detected.map((item) => item.toLowerCase())])
      return Array.from(merged)
    })
  }

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[48px] border border-forest-800/60 bg-gradient-to-br from-[#081a14] via-[#07150f] to-[#030d09] px-6 py-20 text-white shadow-[0_45px_80px_rgba(3,9,7,0.8)] sm:px-12">
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-brandAccent-200">
              Chef-caliber pantry intelligence
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Smart recipes from the ingredients you already have.
            </h1>
            <p className="text-lg text-white/80">
              Give us your pantry staples or upload a quick counter photo. We&apos;ll return
              restaurant-level ideas, timing, and nutrition with handcrafted substitutions.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              {[
                'Personalized scoring + nutrition callouts',
                'Photo-to-pantry detection in seconds',
                'Smart suggestions when you are missing staples',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-brandAccent-300" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleScrollToIngredients}
                className="rounded-full bg-brandAccent-400 px-8 py-3 text-base font-semibold text-[#0b0603] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:bg-brandAccent-300"
              >
                Find recipes now
              </button>
              <a
                href="#recipe-feed"
                className="rounded-full border border-white/25 px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-brandAccent-200"
              >
                Browse inspirations
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 shadow-[0_35px_70px_rgba(0,0,0,0.5)]"
              style={heroParallax}
            >
              <img
                src="/images/hero/salad-bowl.jpg"
                alt="Signature bowl"
                className="h-full w-full rounded-[32px] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-black/70 px-4 py-3 text-sm shadow-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-brandAccent-200">Live stats</p>
                <p className="mt-1 text-2xl font-semibold text-white">92% pantry match</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section ref={ingredientSectionRef} className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <IngredientInput
          ingredients={ingredients}
          onChange={setIngredients}
          dietary={globalFilters.dietaryTags}
          onDietaryChange={(tags) => updateFilters({ dietaryTags: tags })}
          label="Pantry ingredients"
        />
        <ImageUpload onIngredientsDetected={handleDetectedIngredients} />
      </section>

      <section id="recipe-feed" className="space-y-6">
        <div className="flex flex-col gap-2 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            AI picks
          </p>
          <h2 className="text-3xl font-semibold">Recommended recipes</h2>
          <p className="text-white/70">
            Tailored suggestions based on what&apos;s already in your kitchen.
          </p>
        </div>

        {ingredients.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-secondary-200 bg-white/90 p-10 text-center text-secondary-600 shadow-inner">
            Add a few ingredients or upload a fridge snapshot to see your matches.
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIngredients(['tomato', 'basil', 'garlic'])
                  updateFilters({ dietaryTags: [] })
                }}
                className="rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:bg-primary-600"
              >
                Try a sample basket
              </button>
            </div>
          </div>
        ) : (
          <>
            <RecipeGrid
              results={topResults}
              favorites={favorites}
              loading={loading}
              onToggleFavorite={toggleFavorite}
            />
            <SmartSuggestions
              userIngredients={ingredients}
              onAddIngredient={(ingredient) => {
                setIngredients((prev) =>
                  prev.includes(ingredient) ? prev : [...prev, ingredient]
                )
              }}
            />
          </>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Because you loved
          </p>
          <h2 className="text-3xl font-semibold">Personal suggestions</h2>
          <p className="text-white/70">
            Recipes inspired by your ratings and favorites.
          </p>
        </div>
        <RecipeGrid
          results={suggestions}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </section>
    </div>
  )
}
