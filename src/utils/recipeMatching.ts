import type { Recipe, RecipeMatch } from '@/types'
import type { DietaryOption } from '@/constants/dietaryOptions'
import { CONFIG } from '@/constants/config'

interface MatchOptions {
  userIngredients: string[]
  maxTime?: number
  dietaryFilters?: DietaryOption[]
}

export function matchRecipes(
  recipes: Recipe[],
  options: MatchOptions
): RecipeMatch[] {
  const { userIngredients, maxTime, dietaryFilters = [] } = options

  if (userIngredients.length === 0) {
    return recipes.map((recipe) => ({
      ...recipe,
      matchScore: 0,
      matchExplanation: 'No ingredients provided',
      matchedIngredients: [],
      missingIngredients: recipe.ingredients.map((i) => i.name),
    }))
  }

  const normalizedUserIngredients = userIngredients.map((ing) =>
    normalizeIngredient(ing)
  )

  const matches: RecipeMatch[] = recipes
    .map((recipe) => {
      const recipeIngredientNames = recipe.ingredients.map((i) =>
        normalizeIngredient(i.name)
      )
      const coreIngredientNames = recipe.coreIngredients.map((ing) =>
        normalizeIngredient(ing)
      )

      let matchedIngredients: string[] = []
      let missingIngredients: string[] = []

      recipeIngredientNames.forEach((recipeIng, index) => {
        const normalizedRecipeIng = normalizeIngredient(recipeIng)
        const matched = normalizedUserIngredients.some((userIng) =>
          ingredientsMatch(userIng, normalizedRecipeIng)
        )

        if (matched) {
          matchedIngredients.push(recipe.ingredients[index].name)
        } else {
          missingIngredients.push(recipe.ingredients[index].name)
        }
      })

      let matchScore = 0

      const overlapRatio = matchedIngredients.length / recipeIngredientNames.length
      matchScore += overlapRatio * 60

      const coreIngredientsMatched = coreIngredientNames.filter((coreIng) =>
        normalizedUserIngredients.some((userIng) =>
          ingredientsMatch(userIng, normalizeIngredient(coreIng))
        )
      ).length

      const coreIngredientsRatio = coreIngredientsMatched / coreIngredientNames.length
      if (coreIngredientsRatio < 0.5) {
        matchScore -= 20
      } else if (coreIngredientsRatio < 0.75) {
        matchScore -= 10
      }

      if (coreIngredientsRatio === 1) {
        matchScore += 15
      }

      if (maxTime && recipe.totalTime <= maxTime) {
        matchScore += 15
      } else if (maxTime && recipe.totalTime > maxTime) {
        matchScore -= 10
      }

      const dietaryMatches = dietaryFilters.filter((filter) =>
        recipe.dietary.includes(filter)
      )

      if (dietaryFilters.length > 0 && dietaryMatches.length === dietaryFilters.length) {
        matchScore += 10
      } else if (dietaryFilters.length > 0 && dietaryMatches.length === 0) {
        matchScore -= 30
      }

      matchScore = Math.max(0, Math.min(100, Math.round(matchScore)))

      const explanationParts: string[] = []
      if (matchedIngredients.length > 0) {
        explanationParts.push(
          `Matched ${matchedIngredients.length}/${recipeIngredientNames.length} ingredients`
        )
      }
      if (recipe.totalTime <= 30) {
        explanationParts.push(`Ready in ${recipe.totalTime} min`)
      } else {
        explanationParts.push(`Takes ${recipe.totalTime} min`)
      }
      if (recipe.dietary.length > 0) {
        explanationParts.push(`${recipe.dietary[0]}-friendly`)
      }

      const matchExplanation = explanationParts.join(' · ')

      return {
        ...recipe,
        matchScore,
        matchExplanation,
        matchedIngredients,
        missingIngredients,
      }
    })
    .filter((match) => match.matchScore >= CONFIG.recipe.matchScoreThreshold)
    .sort((a, b) => b.matchScore - a.matchScore)

  return matches
}

function normalizeIngredient(ingredient: string): string {
  return ingredient.toLowerCase().trim().replace(/\s+/g, ' ')
}

function ingredientsMatch(userIng: string, recipeIng: string): boolean {
  if (userIng === recipeIng) return true
  if (recipeIng.includes(userIng)) return true
  if (userIng.includes(recipeIng)) return true

  const userWords = userIng.split(' ')
  const recipeWords = recipeIng.split(' ')

  const commonWords = userWords.filter((word) => recipeWords.includes(word))
  return commonWords.length >= Math.min(userWords.length, recipeWords.length) * 0.6
}

