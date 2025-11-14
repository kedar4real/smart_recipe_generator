import recipes from '@/data/recipes.json'

export function getAllRecipes() {
  return recipes
}

export function getRecipeById(id) {
  if (!id) return undefined
  return recipes.find((recipe) => recipe.id === id)
}

export function getRecipesByIds(ids = []) {
  const idSet = new Set(ids)
  return recipes.filter((recipe) => idSet.has(recipe.id))
}

export function getRelatedRecipes(recipe, limit = 4) {
  if (!recipe) return []

  const ingredientSet = new Set(
    (recipe.coreIngredients && recipe.coreIngredients.length > 0
      ? recipe.coreIngredients
      : recipe.ingredients.map((ingredient) => ingredient.name)
    ).map((name) => name.toLowerCase())
  )

  return recipes
    .filter((candidate) => candidate.id !== recipe.id)
    .map((candidate) => {
      const candidateIngredients = candidate.coreIngredients?.length
        ? candidate.coreIngredients
        : candidate.ingredients.map((ingredient) => ingredient.name)

      const overlap = candidateIngredients.filter((name) =>
        ingredientSet.has(name.toLowerCase())
      ).length

      const sameCuisine = candidate.cuisine === recipe.cuisine
      const score = overlap + (sameCuisine ? 2 : 0)

      return { candidate, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
