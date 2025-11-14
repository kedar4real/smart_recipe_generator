import recipes from '@/data/recipes.json'

const difficultyRank = {
  easy: 1,
  medium: 2,
  hard: 3,
}

function normalizeList(list = []) {
  return list
    .map((item) => (typeof item === 'string' ? item.trim().toLowerCase() : ''))
    .filter(Boolean)
}

export function scoreRecipeMatch(recipe, availableIngredients = [], options = {}) {
  const normalizedIngredients = new Set(normalizeList(availableIngredients))
  const recipeIngredients = (recipe.ingredients || []).map((ingredient) =>
    ingredient.name.trim().toLowerCase()
  )

  const matchedIngredients = recipeIngredients.filter((name) => normalizedIngredients.has(name))
  const missingIngredients = recipeIngredients.filter((name) => !normalizedIngredients.has(name))

  const overlapRatio =
    recipeIngredients.length > 0 ? matchedIngredients.length / recipeIngredients.length : 0
  let score = overlapRatio * 60
  const explanationParts = []

  if (overlapRatio > 0) {
    explanationParts.push(`Matched ${matchedIngredients.length} ingredients`)
  } else {
    explanationParts.push('No direct ingredient matches')
  }

  if (options.maxTime && recipe.totalTime <= options.maxTime) {
    score += 10
    explanationParts.push('Fits within your time goal')
  }

  const dietaryTags = normalizeList(options.dietaryTags)
  if (dietaryTags.length > 0) {
    const satisfiesDiet =
      dietaryTags.every((tag) => recipe.dietary?.map((d) => d.toLowerCase()).includes(tag)) ||
      dietaryTags.every((tag) => recipe.tags?.map((t) => t.toLowerCase()).includes(tag))
    if (satisfiesDiet) {
      score += 10
      explanationParts.push('Meets dietary preferences')
    } else {
      explanationParts.push('Does not meet all dietary filters')
    }
  }

  const cuisines = normalizeList(options.cuisines)
  if (cuisines.length > 0) {
    if (cuisines.includes(recipe.cuisine.toLowerCase())) {
      score += 5
      explanationParts.push('Preferred cuisine')
    }
  }

  const preferredDifficulty = options.preferredDifficulty || options.difficulty
  if (preferredDifficulty && recipe.difficulty === preferredDifficulty) {
    score += 5
    explanationParts.push(`Difficulty: ${recipe.difficulty}`)
  }

  score = Math.max(0, Math.min(100, Math.round(score)))

  return {
    score,
    matchedIngredients,
    missingIngredients,
    explanation: explanationParts.join(' · '),
  }
}

export function getMatchedRecipes(availableIngredients = [], options = {}) {
  return recipes
    .map((recipe) => {
      const match = scoreRecipeMatch(recipe, availableIngredients, options)
      return {
        recipe,
        ...match,
      }
    })
    .filter((entry) => entry.score >= 20)
    .sort((a, b) => {
      if (a.score === b.score) {
        return (difficultyRank[a.recipe.difficulty] || 99) - (difficultyRank[b.recipe.difficulty] || 99)
      }
      return b.score - a.score
    })
}
