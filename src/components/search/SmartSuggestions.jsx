import { useMemo } from 'react'
import { getAllRecipes } from '@/services/recipeService.js'

const recipeDataset = getAllRecipes()

export function SmartSuggestions({ userIngredients = [], onAddIngredient }) {
  const suggestions = useMemo(() => {
    if (!userIngredients || userIngredients.length === 0) return []

    const normalizedSet = new Set(userIngredients.map((item) => item.trim().toLowerCase()).filter(Boolean))
    if (normalizedSet.size === 0) return []

    const candidateMap = new Map()

    recipeDataset.forEach((recipe) => {
      const recipeIngredients = (recipe.coreIngredients && recipe.coreIngredients.length > 0
        ? recipe.coreIngredients
        : recipe.ingredients.map((ingredient) => ingredient.name)
      ).map((name) => name.trim().toLowerCase())

      const overlap = recipeIngredients.filter((name) => normalizedSet.has(name)).length
      if (overlap === 0) return

      recipeIngredients.forEach((name) => {
        if (normalizedSet.has(name)) return
        if (!candidateMap.has(name)) {
          candidateMap.set(name, {
            count: 0,
            examples: new Set(),
          })
        }
        const entry = candidateMap.get(name)
        entry.count += 1
        if (entry.examples.size < 2) {
          entry.examples.add(recipe.title)
        }
      })
    })

    return Array.from(candidateMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        examples: Array.from(data.examples),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
  }, [userIngredients])

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="rounded-3xl border border-secondary-100 bg-white/95 px-5 py-4 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
            Smart suggestions
          </p>
          <p className="text-sm text-secondary-600">
            Add one of these ingredients to unlock more recipes instantly.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.name}
            className="flex flex-col rounded-2xl border border-secondary-100 bg-secondary-50/60 px-4 py-2 text-left text-secondary-800 shadow-inner"
          >
            <div className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span className="capitalize">{suggestion.name}</span>
              <span className="text-xs text-secondary-500">{suggestion.count} recipes</span>
            </div>
            {suggestion.examples.length > 0 && (
              <p className="mt-1 text-xs text-secondary-500">
                e.g. {suggestion.examples.join(', ')}
              </p>
            )}
            {onAddIngredient && (
              <button
                type="button"
                className="mt-2 self-start rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white hover:bg-primary-600"
                onClick={() => onAddIngredient(suggestion.name)}
              >
                Add to pantry
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
