import { useParams, Link, Navigate } from 'react-router-dom'
import { recipeService } from '@/services/recipeService'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { RatingStars } from '@/components/user/RatingStars'
import { formatTime, formatDate } from '@/utils/formatting'
import { scaleIngredients } from '@/utils/nutritionCalculator'
import { useState } from 'react'

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const recipe = id ? recipeService.getById(id) : undefined

  const [servings, setServings] = useState(recipe?.servings || 4)

  if (!recipe) {
    return <Navigate to="/" replace />
  }

  const scaledIngredients = scaleIngredients(recipe.ingredients, recipe.servings, servings)
  const nutritionRatio = servings / recipe.servings

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/search" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Back to search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton recipeId={recipe.id} />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">{recipe.title}</h1>
            <p className="text-lg text-secondary-600 mb-4">{recipe.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <RatingStars recipeId={recipe.id} />
              <span className="text-sm text-secondary-500">
                {formatDate(recipe.createdAt)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{recipe.cuisine}</Badge>
              <Badge variant="primary">{recipe.difficulty}</Badge>
              {recipe.dietary.map((diet) => (
                <Badge key={diet} variant="success">
                  {diet}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div>
                <p className="text-sm text-secondary-500">Prep</p>
                <p className="font-semibold text-secondary-900">{formatTime(recipe.prepTime)}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Cook</p>
                <p className="font-semibold text-secondary-900">{formatTime(recipe.cookTime)}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Total</p>
                <p className="font-semibold text-secondary-900">{formatTime(recipe.totalTime)}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Servings</p>
                <p className="font-semibold text-secondary-900">{servings}</p>
              </div>
            </div>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-secondary-900">Ingredients</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                >
                  −
                </Button>
                <span className="w-12 text-center font-medium">{servings}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(servings + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <ul className="space-y-2">
              {scaledIngredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <span className="text-secondary-700">
                    <span className="font-medium">{ingredient.amount}</span> {ingredient.unit}{' '}
                    {ingredient.name}
                    {ingredient.notes && (
                      <span className="text-secondary-500 text-sm"> ({ingredient.notes})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold mr-4">
                    {index + 1}
                  </span>
                  <span className="text-secondary-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Nutrition (per serving)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-secondary-500">Calories</p>
                <p className="text-lg font-semibold text-secondary-900">
                  {Math.round(recipe.nutrition.calories * nutritionRatio)}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Protein</p>
                <p className="text-lg font-semibold text-secondary-900">
                  {Math.round(recipe.nutrition.protein * nutritionRatio * 10) / 10}g
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Carbs</p>
                <p className="text-lg font-semibold text-secondary-900">
                  {Math.round(recipe.nutrition.carbs * nutritionRatio * 10) / 10}g
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-500">Fat</p>
                <p className="text-lg font-semibold text-secondary-900">
                  {Math.round(recipe.nutrition.fat * nutritionRatio * 10) / 10}g
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

