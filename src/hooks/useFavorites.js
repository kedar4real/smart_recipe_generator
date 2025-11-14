import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const STORAGE_KEY = 'sr-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEY, [])

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  )

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        if (prev.includes(id)) {
          return prev.filter((favId) => favId !== id)
        }
        return [...prev, id]
      })
    },
    [setFavorites]
  )

  return useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite]
  )
}
