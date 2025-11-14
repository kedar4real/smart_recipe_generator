import { useState, useEffect } from 'react'
import { favoritesService } from '@/services/storageService'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => favoritesService.get())

  useEffect(() => {
    setFavorites(favoritesService.get())
  }, [])

  const addFavorite = (recipeId: string) => {
    favoritesService.add(recipeId)
    setFavorites(favoritesService.get())
  }

  const removeFavorite = (recipeId: string) => {
    favoritesService.remove(recipeId)
    setFavorites(favoritesService.get())
  }

  const toggleFavorite = (recipeId: string) => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  const isFavorite = (recipeId: string): boolean => {
    return favorites.includes(recipeId)
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
}

