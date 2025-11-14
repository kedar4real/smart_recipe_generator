import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { Tabs } from '@/components/common/Tabs.jsx'
import { RecipeCard } from '@/components/recipe/RecipeCard.jsx'
import { useFavorites } from '@/hooks/useFavorites.js'
import { useRatings } from '@/hooks/useRatings.js'
import { getRecipeById, getRelatedRecipes } from '@/services/recipeService.js'
import { getSubstitutionMessage } from '@/utils/substitutionEngine.js'

function scaleIngredients(ingredients, originalServings, newServings) {
  const ratio = newServings / originalServings
  return ingredients.map((ingredient) => ({
    ...ingredient,
    amount: Math.round(ingredient.amount * ratio * 100) / 100,
  }))
}

function scaleNutrition(nutrition, originalServings, newServings) {
  const ratio = newServings / originalServings
  return {
    calories: Math.round(nutrition.calories * ratio),
    protein: Math.round(nutrition.protein * ratio * 10) / 10,
    carbs: Math.round(nutrition.carbs * ratio * 10) / 10,
    fat: Math.round(nutrition.fat * ratio * 10) / 10,
    fiber: nutrition.fiber ? Math.round(nutrition.fiber * ratio * 10) / 10 : undefined,
    sodium: nutrition.sodium ? Math.round(nutrition.sodium * ratio) : undefined,
  }
}

export default function RecipeDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const availableIngredients = (location.state?.ingredients || []).map((item) =>
    item.toLowerCase()
  )
  const recipe = getRecipeById(id)
  const { favorites, toggleFavorite } = useFavorites()
  const { getRating, setRating } = useRatings()
  const [servings, setServings] = useState(recipe?.servings ?? 4)
  const [activeTab, setActiveTab] = useState('ingredients')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const scaledIngredients = useMemo(() => {
    if (!recipe) return []
    return scaleIngredients(recipe.ingredients, recipe.servings, servings)
  }, [recipe, servings])

  const nutritionPerServing = useMemo(() => {
    if (!recipe) return null
    return scaleNutrition(recipe.nutrition, recipe.servings, servings)
  }, [recipe, servings])

  const missingIngredients = useMemo(() => {
    if (!recipe || availableIngredients.length === 0) return []
    const availableSet = new Set(availableIngredients)
    return scaledIngredients
      .filter((ingredient) => !availableSet.has(ingredient.name.toLowerCase()))
      .map((ingredient) => ingredient.name)
  }, [recipe, scaledIngredients, availableIngredients])

  const relatedRecipes = useMemo(
    () => (recipe ? getRelatedRecipes(recipe, 4) : []),
    [recipe]
  )

  const savedRating = recipe ? getRating(recipe.id) : 0

  if (!hydrated) {
    return <RecipeDetailSkeleton />
  }

  if (!recipe) {
    return (
      <div className="rounded-3xl border border-dashed border-secondary-200 bg-white/95 p-16 text-center shadow-inner">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-3xl font-semibold text-secondary-900 mb-3">Recipe not found</h1>
        <p className="text-secondary-600 mb-8">
          We couldn&apos;t find the recipe you were looking for. Try exploring other dishes instead.
        </p>
        <Link
          to="/search"
          className="rounded-full bg-primary-500 px-8 py-3 text-white font-semibold shadow hover:bg-primary-600"
        >
          Back to search
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-secondary-900 text-white shadow-retro">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-[420px] w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/85 via-secondary-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 py-8 sm:px-12">
          <Link
            to="/search"
            className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/30"
          >
            ← Back to results
          </Link>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {recipe.title}
              </h1>
              <p className="max-w-3xl text-lg text-white/80">{recipe.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <RatingBar
                  value={savedRating || recipe.rating || 4.7}
                  onChange={(value) => setRating(recipe.id, value)}
                />
                <span>{recipe.cuisine}</span>
                <span className="capitalize">{recipe.difficulty}</span>
              </div>
            </div>
            <FavoriteButton recipeId={recipe.id} size="md" />
          </div>
        </div>
      </div>

      <section className="grid gap-6 rounded-3xl bg-white/95 p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Prep time" value={`${recipe.prepTime} mins`} />
        <Stat label="Cook time" value={`${recipe.cookTime} mins`} />
        <Stat label="Total time" value={`${recipe.totalTime} mins`} />
        <ServingSizeAdjuster servings={servings} onChange={setServings} />
      </section>

      <section className="space-y-6">
        <Tabs
          tabs={[
            { value: 'ingredients', label: 'Ingredients' },
            { value: 'instructions', label: 'Instructions' },
            { value: 'nutrition', label: 'Nutrition' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'ingredients' && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <IngredientList
              ingredients={scaledIngredients}
              missingIngredients={missingIngredients}
            />
            <SubstitutionSuggester
              missingIngredients={missingIngredients}
              availableIngredients={availableIngredients}
            />
          </div>
        )}

        {activeTab === 'instructions' && (
          <InstructionList instructions={recipe.instructions} />
        )}

        {activeTab === 'nutrition' && nutritionPerServing && (
          <NutritionCard nutrition={nutritionPerServing} servings={servings} />
        )}
      </section>

      {relatedRecipes.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-900">Related recipes</h2>
            <p className="text-secondary-600">
              Similar flavors and techniques you might also enjoy.
            </p>
          </div>
          <div className="retro-grid">
            {relatedRecipes.map((related) => (
              <RecipeCard
                key={related.id}
                recipe={related}
                isFavorite={favorites.includes(related.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function RatingBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange?.(rating)}
          className={`text-lg transition ${
            rating <= value ? 'text-primary-200' : 'text-white/50'
          } hover:scale-110`}
        >
          ★
        </button>
      ))}
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        {Number(value).toFixed(1)}
      </span>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-secondary-50 bg-secondary-50/70 px-4 py-5 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-secondary-900">{value}</p>
    </div>
  )
}

function ServingSizeAdjuster({ servings, onChange }) {
  return (
    <div className="rounded-2xl border border-secondary-50 bg-secondary-50/70 px-4 py-5 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">Servings</p>
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, servings - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-secondary-600 shadow hover:bg-primary-50"
        >
          −
        </button>
        <span className="text-2xl font-semibold text-secondary-900">{servings}</span>
        <button
          type="button"
          onClick={() => onChange(servings + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-secondary-600 shadow hover:bg-primary-50"
        >
          +
        </button>
      </div>
    </div>
  )
}

function IngredientList({ ingredients, missingIngredients }) {
  const missingSet = new Set(missingIngredients.map((name) => name.toLowerCase()))

  return (
    <div className="rounded-3xl border border-secondary-100 bg-white/95 p-6 shadow-card">
      <h3 className="text-xl font-semibold text-secondary-900">Ingredient checklist</h3>
      <ul className="mt-4 space-y-3">
        {ingredients.map((ingredient, index) => {
          const isMissing = missingSet.has(ingredient.name.toLowerCase())
          return (
            <li
              key={`${ingredient.name}-${index}`}
              className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${
                isMissing
                  ? 'border-rose-200 bg-rose-50/60 text-rose-700'
                  : 'border-secondary-100 bg-secondary-50/70'
              }`}
            >
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-secondary-300" />
              <div>
                <p className="font-medium text-secondary-900">
                  <span className="text-primary-600">
                    {ingredient.amount} {ingredient.unit}
                  </span>{' '}
                  {ingredient.name}
                </p>
                {ingredient.notes && (
                  <p className="text-sm text-secondary-500">{ingredient.notes}</p>
                )}
                {isMissing && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                    Missing ingredient
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SubstitutionSuggester({ missingIngredients, availableIngredients }) {
  if (missingIngredients.length === 0) {
    return (
      <div className="rounded-3xl border border-secondary-100 bg-mint-100/70 p-6 shadow-card">
        <h3 className="text-lg font-semibold text-secondary-900">You&apos;re all set</h3>
        <p className="mt-2 text-sm text-secondary-700">
          You have everything needed for this recipe. Time to cook!
        </p>
      </div>
    )
  }

  const suggestions = missingIngredients
    .map((ingredient) => ({
      ingredient,
      message: getSubstitutionMessage(ingredient, availableIngredients),
    }))
    .filter((item) => item.message)

  return (
    <div className="space-y-4 rounded-3xl border border-secondary-100 bg-white/95 p-6 shadow-card">
      <div>
        <h3 className="text-lg font-semibold text-secondary-900">Need a swap?</h3>
        <p className="text-sm text-secondary-600">
          Try these substitution ideas for ingredients you might be missing.
        </p>
      </div>
      {suggestions.length === 0 ? (
        <p className="text-sm text-secondary-600">
          No substitution tips available for the missing items, but feel free to experiment!
        </p>
      ) : (
        <ul className="space-y-3 text-sm text-secondary-700">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.ingredient}
              className="rounded-2xl border border-primary-100 bg-primary-50/60 px-4 py-3"
            >
              <p className="font-semibold text-primary-700">{suggestion.ingredient}</p>
              <p className="text-primary-600">{suggestion.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function InstructionList({ instructions }) {
  return (
    <ol className="space-y-4">
      {instructions.map((instruction, index) => (
        <li
          key={instruction}
          className="flex gap-4 rounded-3xl border border-secondary-100 bg-white/95 p-4 shadow-sm"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
            {index + 1}
          </span>
          <p className="text-secondary-700">{instruction}</p>
        </li>
      ))}
    </ol>
  )
}

function NutritionCard({ nutrition, servings }) {
  const entries = [
    { label: 'Calories', value: `${nutrition.calories} kcal` },
    { label: 'Protein', value: `${nutrition.protein} g` },
    { label: 'Carbs', value: `${nutrition.carbs} g` },
    { label: 'Fat', value: `${nutrition.fat} g` },
    nutrition.fiber ? { label: 'Fiber', value: `${nutrition.fiber} g` } : null,
    nutrition.sodium ? { label: 'Sodium', value: `${nutrition.sodium} mg` } : null,
  ].filter(Boolean)

  return (
    <div className="rounded-3xl border border-secondary-100 bg-white/95 p-6 shadow-card">
      <h3 className="text-xl font-semibold text-secondary-900">Per serving</h3>
      <p className="text-sm text-secondary-600">Based on {servings} servings</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry.label}
            className="rounded-2xl border border-secondary-100 bg-secondary-50 px-4 py-3 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
              {entry.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-secondary-900">{entry.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecipeDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-96 rounded-3xl bg-secondary-100" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-24 rounded-2xl bg-secondary-100" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="h-80 rounded-3xl bg-secondary-100" />
        <div className="h-80 rounded-3xl bg-secondary-100" />
      </div>
    </div>
  )
}
