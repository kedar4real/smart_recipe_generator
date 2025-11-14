import type { DietaryOption } from '@/constants/dietaryOptions'
import type { CuisineType } from '@/constants/cuisineTypes'
import type { DifficultyLevel } from '@/constants/difficultyLevels'

export interface Ingredient {
  name: string
  amount: number
  unit: string
  notes?: string
}

export interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
}

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cuisine: CuisineType
  difficulty: DifficultyLevel
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  ingredients: Ingredient[]
  instructions: string[]
  nutrition: Nutrition
  dietary: DietaryOption[]
  tags: string[]
  coreIngredients: string[]
  createdAt: string
}

export interface RecipeMatch extends Recipe {
  matchScore: number
  matchExplanation: string
  matchedIngredients: string[]
  missingIngredients: string[]
}

