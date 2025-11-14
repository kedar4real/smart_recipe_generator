import { RecipeGrid } from '@/components/recipe/RecipeGrid.jsx'
import { useFavorites } from '@/hooks/useFavorites.js'
import { getRecipesByIds } from '@/services/recipeService.js'
import { EmptyState } from '@/components/common/EmptyState.jsx'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const favoriteRecipes = getRecipesByIds(favorites)
  const gridData = favoriteRecipes.map((recipe) => ({
    recipe,
    score: 100,
  }))

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon="/images/icons/heart-filled.svg"
        title="No favorites yet"
        message="Tap the heart on any recipe to save it here for quick access."
      />
    )
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
          Saved recipes
        </p>
        <h1 className="text-3xl font-semibold text-secondary-900">Your favorites</h1>
      </div>
      <RecipeGrid
        results={gridData}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </section>
  )
}
