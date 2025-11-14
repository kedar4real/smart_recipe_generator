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
      <section className="retro-card relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-6 py-16 text-center sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-secondary-400">
          Kedar Mashalkar's Smart Gourmet Kitchen
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-secondary-900 sm:text-5xl">
          Pantry staples, chef-level ideas.
        </h1>
        <p className="mt-4 text-lg text-secondary-600">
          Start with what you already own, add a quick photo if you like, and let the kitchen companion do the menu planning.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={handleScrollToIngredients}
            className="rounded-full bg-primary-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-600"
          >
            Start with your ingredients
          </button>
          <a
            href="#recipe-feed"
            className="rounded-full border border-secondary-200 px-8 py-3 text-base font-semibold text-secondary-700 transition hover:border-primary-200 hover:text-primary-600"
          >
            Browse inspirations
          </a>
        </div>
      </section>

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
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
            AI picks
          </p>
          <h2 className="text-3xl font-semibold text-secondary-900">Recommended recipes</h2>
          <p className="text-secondary-600">
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
                className="rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-primary-600"
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
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
            Because you loved
          </p>
          <h2 className="text-3xl font-semibold text-secondary-900">Personal suggestions</h2>
          <p className="text-secondary-600">
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
