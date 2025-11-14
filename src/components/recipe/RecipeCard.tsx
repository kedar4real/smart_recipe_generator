import { Link } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { formatTime } from '@/utils/formatting'
import type { RecipeMatch } from '@/types'

interface RecipeCardProps {
  recipe: RecipeMatch
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card hover>
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton recipeId={recipe.id} />
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="primary">{recipe.matchScore}% match</Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-sm text-secondary-600 mb-3 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <span>{formatTime(recipe.totalTime)}</span>
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
          {recipe.matchExplanation && (
            <p className="text-xs text-secondary-500 mt-2">{recipe.matchExplanation}</p>
          )}
        </div>
      </Link>
    </Card>
  )
}

