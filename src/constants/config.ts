export const CONFIG = {
  clarifai: {
    apiKey: import.meta.env.VITE_CLARIFAI_API_KEY || '',
    modelId: 'food-item-recognition',
  },
  storage: {
    favoritesKey: 'recipe_favorites',
    ratingsKey: 'recipe_ratings',
    historyKey: 'recipe_history',
    preferencesKey: 'user_preferences',
  },
  recipe: {
    defaultServings: 4,
    maxHistoryItems: 20,
    matchScoreThreshold: 20,
  },
  imageRecognition: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    minConfidence: 0.5,
  },
} as const

