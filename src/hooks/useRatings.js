import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const STORAGE_KEY = 'sr-ratings'

export function useRatings() {
  const [ratings, setRatings] = useLocalStorage(STORAGE_KEY, {})

  const setRating = (recipeId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [recipeId]: rating,
    }))
  }

  const value = useMemo(
    () => ({
      ratings,
      getRating: (recipeId) => ratings[recipeId] || 0,
      setRating,
      clearRatings: () => setRatings({}),
    }),
    [ratings, setRatings]
  )

  return value
}
