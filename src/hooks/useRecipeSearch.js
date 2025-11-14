import { useEffect, useMemo, useState } from 'react'
import { getMatchedRecipes } from '@/utils/recipeMatching.js'

const difficultyOrder = ['easy', 'medium', 'hard']

function difficultyIndex(value) {
  const index = difficultyOrder.indexOf(value)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

function sortResults(results, sort) {
  if (sort === 'time') {
    return [...results].sort((a, b) => a.recipe.totalTime - b.recipe.totalTime)
  }

  if (sort === 'rating') {
    return [...results].sort(
      (a, b) => (b.recipe.rating || 0) - (a.recipe.rating || 0)
    )
  }

  if (sort === 'difficulty') {
    return [...results].sort(
      (a, b) => difficultyIndex(a.recipe.difficulty) - difficultyIndex(b.recipe.difficulty)
    )
  }

  return results
}

export function useRecipeSearch(ingredients = [], filters = {}, sort = 'best') {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const normalizedIngredients = useMemo(
    () =>
      ingredients
        .map((ingredient) => ingredient.trim().toLowerCase())
        .filter(Boolean),
    [ingredients]
  )

  useEffect(() => {
    let cancelled = false

    if (normalizedIngredients.length === 0) {
      setResults([])
      setLoading(false)
      setError(null)
      return () => {
        cancelled = true
      }
    }

    setLoading(true)
    setError(null)
    const timer = setTimeout(() => {
      try {
        const matches = getMatchedRecipes(normalizedIngredients, filters)
        if (!cancelled) {
          setResults(sortResults(matches, sort))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setResults([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [normalizedIngredients, filters, sort])

  return {
    results,
    loading,
    error,
  }
}
