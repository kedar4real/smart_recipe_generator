import { useMemo, useState } from 'react'
import { IngredientInput } from '@/components/ingredient/IngredientInput.jsx'
import { ImageUpload } from '@/components/ingredient/ImageUpload.jsx'
import { RecipeFilters } from '@/components/search/RecipeFilters.jsx'
import { RecipeSort } from '@/components/search/RecipeSort.jsx'
import { RecipeGrid } from '@/components/recipe/RecipeGrid.jsx'
import { ActiveFiltersBar } from '@/components/search/ActiveFiltersBar.jsx'
import { SmartSuggestions } from '@/components/search/SmartSuggestions.jsx'
import { useRecipeSearch } from '@/hooks/useRecipeSearch.js'
import { useFavorites } from '@/hooks/useFavorites.js'
import { useFilters } from '@/contexts/FilterContext.jsx'

export default function RecipeSearchPage() {
  const [ingredients, setIngredients] = useState([])
  const { filters, sort, updateFilters, setSort, resetFilters } = useFilters()
  const { favorites, toggleFavorite } = useFavorites()

  const { results, loading, error } = useRecipeSearch(ingredients, filters, sort)
  const highlightedResults = useMemo(() => results.slice(0, 24), [results])

  const handleDetectedIngredients = (detected) => {
    if (!detected || detected.length === 0) return
    setIngredients((prev) => {
      const merged = new Set([...prev, ...detected.map((item) => item.toLowerCase())])
      return Array.from(merged)
    })
  }

  const showNoResults = ingredients.length > 0 && !loading && highlightedResults.length === 0

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="space-y-6">
        <RecipeFilters filters={filters} onChange={updateFilters} />
        <ImageUpload onIngredientsDetected={handleDetectedIngredients} />
        <button
          type="button"
          onClick={resetFilters}
          className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-secondary-600 transition hover:border-primary-200 hover:text-primary-600"
        >
          Reset filters
        </button>
      </div>

      <div className="space-y-8">
        <IngredientInput
          ingredients={ingredients}
          onChange={setIngredients}
          dietary={filters.dietaryTags}
          onDietaryChange={(dietaryTags) => updateFilters({ dietaryTags })}
          label="Fine-tune your pantry"
        />

        <RecipeSort value={sort} onChange={setSort} />

        <ActiveFiltersBar
          filters={filters}
          onRemoveFilter={(type, value) => handleRemoveFilter(type, value)}
          onClear={resetFilters}
        />

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.message || 'Failed to load recipes.'}
          </div>
        )}

        {showNoResults ? (
          <>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <div className="text-6xl mb-4">🥄</div>
              <h3 className="text-xl font-semibold text-secondary-900">No recipes found</h3>
              <p className="mt-2 text-secondary-600">
                Try adjusting your filters or add more ingredients to broaden the match.
              </p>
            </div>
            <SmartSuggestions
              userIngredients={ingredients}
              onAddIngredient={(ingredient) =>
                setIngredients((prev) => (prev.includes(ingredient) ? prev : [...prev, ingredient]))
              }
            />
          </>
        ) : (
          <>
            <RecipeGrid
              results={highlightedResults}
              favorites={favorites}
              loading={loading}
              onToggleFavorite={toggleFavorite}
              onClearFilters={resetFilters}
            />
            <SmartSuggestions
              userIngredients={ingredients}
              onAddIngredient={(ingredient) =>
                setIngredients((prev) => (prev.includes(ingredient) ? prev : [...prev, ingredient]))
              }
            />
          </>
        )}
      </div>
    </div>
  )

  function handleRemoveFilter(type, value) {
    if (type === 'dietary') {
      updateFilters({
        dietaryTags: filters.dietaryTags.filter((tag) => tag !== value),
      })
    } else if (type === 'cuisine') {
      updateFilters({
        cuisines: filters.cuisines.filter((cuisine) => cuisine !== value),
      })
    } else if (type === 'difficulty') {
      updateFilters({ difficulty: '' })
    } else if (type === 'time') {
      updateFilters({ maxTime: undefined })
    }
  }
}
