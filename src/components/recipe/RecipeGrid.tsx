import { RecipeCard } from './RecipeCard'
import { Skeleton } from '@/components/common/Skeleton'
import type { RecipeMatch } from '@/types'

interface RecipeGridProps {
  recipes: RecipeMatch[]
  loading?: boolean
}

export function RecipeGrid({ recipes, loading }: RecipeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={400} />
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <img src="/images/icons/empty-bowl.svg" alt="" className="h-16 w-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">No recipes found</h3>
        <p className="text-secondary-600">
          Try adjusting your ingredients or filters to find more recipes.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

