import recipesData from '@/data/recipes.json'
import type { Recipe } from '@/types'

export const recipeService = {
  getAll(): Recipe[] {
    return recipesData as Recipe[]
  },

  getById(id: string): Recipe | undefined {
    return recipesData.find((recipe) => recipe.id === id) as Recipe | undefined
  },

  getByIds(ids: string[]): Recipe[] {
    return recipesData.filter((recipe) => ids.includes(recipe.id)) as Recipe[]
  },

  getByCuisine(cuisine: string): Recipe[] {
    return recipesData.filter((recipe) => recipe.cuisine === cuisine) as Recipe[]
  },

  search(query: string): Recipe[] {
    const lowerQuery = query.toLowerCase()
    return recipesData.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        recipe.description.toLowerCase().includes(lowerQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(lowerQuery))
    ) as Recipe[]
  },
}

