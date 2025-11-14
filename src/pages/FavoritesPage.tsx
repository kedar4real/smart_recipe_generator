import { useFavorites } from '@/hooks/useFavorites'
import { recipeService } from '@/services/recipeService'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { matchRecipes } from '@/utils/recipeMatching'

export function FavoritesPage() {
  const { favorites } = useFavorites()
  const favoriteRecipes = recipeService.getByIds(favorites)

  const recipes = matchRecipes(favoriteRecipes, { userIngredients: [] }).map((match) => ({
    ...match,
    matchScore: 100,
    matchExplanation: 'Your favorite recipe',
  }))

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-2">No favorites yet</h2>
          <p className="text-secondary-600">
            Start adding recipes to your favorites to see them here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Your Favorites</h1>
      <RecipeGrid recipes={recipes} />
    </div>
  )
}

