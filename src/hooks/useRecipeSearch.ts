import { useState, useMemo, useCallback } from 'react'
import { recipeService } from '@/services/recipeService'
import { matchRecipes } from '@/utils/recipeMatching'
import type { RecipeMatch } from '@/types'
import type { DietaryOption } from '@/constants/dietaryOptions'

interface SearchFilters {
  dietary: DietaryOption[]
  difficulty?: string
  maxTime?: number
  cuisine?: string
}

export function useRecipeSearch(userIngredients: string[], filters: SearchFilters) {
  const [recipes, setRecipes] = useState<RecipeMatch[]>([])
  const [loading, setLoading] = useState(false)

  const allRecipes = useMemo(() => recipeService.getAll(), [])

  const searchRecipes = useCallback(() => {
    setLoading(true)

    setTimeout(() => {
      let filtered = allRecipes

      if (filters.dietary.length > 0) {
        filtered = filtered.filter((recipe) =>
          filters.dietary.every((diet) => recipe.dietary.includes(diet))
        )
      }

      if (filters.difficulty) {
        filtered = filtered.filter((recipe) => recipe.difficulty === filters.difficulty)
      }

      if (filters.cuisine) {
        filtered = filtered.filter((recipe) => recipe.cuisine === filters.cuisine)
      }

      const matches = matchRecipes(filtered, {
        userIngredients,
        maxTime: filters.maxTime,
        dietaryFilters: filters.dietary,
      })

      setRecipes(matches)
      setLoading(false)
    }, 100)
  }, [userIngredients, filters, allRecipes])

  return {
    recipes,
    loading,
    searchRecipes,
  }
}

