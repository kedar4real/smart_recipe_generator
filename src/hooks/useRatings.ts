import { useState, useEffect } from 'react'
import { ratingsService } from '@/services/storageService'

export function useRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>(() => ratingsService.get())

  useEffect(() => {
    setRatings(ratingsService.get())
  }, [])

  const setRating = (recipeId: string, rating: number) => {
    ratingsService.set(recipeId, rating)
    setRatings(ratingsService.get())
  }

  const getRating = (recipeId: string): number | null => {
    return ratings[recipeId] || null
  }

  return {
    ratings,
    setRating,
    getRating,
  }
}

