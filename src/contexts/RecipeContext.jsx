import { createContext, useContext, useMemo, useState } from 'react'
import recipesData from '@/data/recipes.json'

const RecipeContext = createContext({
  recipes: [],
  refreshRecipes: () => {},
})

export function RecipeProvider({ children }) {
  const [recipes] = useState(recipesData)

  const value = useMemo(
    () => ({
      recipes,
      refreshRecipes: () => {
        // placeholder for future data refreshing logic
      },
    }),
    [recipes]
  )

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

export function useRecipeContext() {
  return useContext(RecipeContext)
}
