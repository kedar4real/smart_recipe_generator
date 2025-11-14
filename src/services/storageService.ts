import { CONFIG } from '@/constants/config'

export const storageService = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item) as T
    } catch {
      return defaultValue
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  },
}

export const favoritesService = {
  get(): string[] {
    return storageService.get(CONFIG.storage.favoritesKey, [])
  },

  add(recipeId: string): void {
    const favorites = this.get()
    if (!favorites.includes(recipeId)) {
      storageService.set(CONFIG.storage.favoritesKey, [...favorites, recipeId])
    }
  },

  remove(recipeId: string): void {
    const favorites = this.get()
    storageService.set(
      CONFIG.storage.favoritesKey,
      favorites.filter((id) => id !== recipeId)
    )
  },

  has(recipeId: string): boolean {
    return this.get().includes(recipeId)
  },
}

export const ratingsService = {
  get(): Record<string, number> {
    return storageService.get(CONFIG.storage.ratingsKey, {})
  },

  set(recipeId: string, rating: number): void {
    const ratings = this.get()
    ratings[recipeId] = rating
    storageService.set(CONFIG.storage.ratingsKey, ratings)
  },

  getRating(recipeId: string): number | null {
    const ratings = this.get()
    return ratings[recipeId] || null
  },
}

export const historyService = {
  get(): string[] {
    return storageService.get(CONFIG.storage.historyKey, [])
  },

  add(recipeId: string): void {
    const history = this.get()
    const filtered = history.filter((id) => id !== recipeId)
    const updated = [recipeId, ...filtered].slice(0, CONFIG.recipe.maxHistoryItems)
    storageService.set(CONFIG.storage.historyKey, updated)
  },
}

