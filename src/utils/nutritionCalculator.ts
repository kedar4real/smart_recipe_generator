import type { Ingredient, Nutrition } from '@/types'

export function calculateNutritionForServings(
  nutrition: Nutrition,
  originalServings: number,
  newServings: number
): Nutrition {
  const ratio = newServings / originalServings

  return {
    calories: Math.round(nutrition.calories * ratio),
    protein: Math.round(nutrition.protein * ratio * 10) / 10,
    carbs: Math.round(nutrition.carbs * ratio * 10) / 10,
    fat: Math.round(nutrition.fat * ratio * 10) / 10,
    fiber: nutrition.fiber ? Math.round(nutrition.fiber * ratio * 10) / 10 : undefined,
    sugar: nutrition.sugar ? Math.round(nutrition.sugar * ratio * 10) / 10 : undefined,
    sodium: nutrition.sodium ? Math.round(nutrition.sodium * ratio) : undefined,
  }
}

export function scaleIngredients(
  ingredients: Ingredient[],
  originalServings: number,
  newServings: number
): Ingredient[] {
  const ratio = newServings / originalServings

  return ingredients.map((ingredient) => ({
    ...ingredient,
    amount: Math.round((ingredient.amount * ratio) * 100) / 100,
  }))
}

