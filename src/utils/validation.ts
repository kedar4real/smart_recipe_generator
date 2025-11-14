import { CONFIG } from '@/constants/config'

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = CONFIG.imageRecognition.allowedTypes as readonly string[]
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not supported. Please use ${CONFIG.imageRecognition.allowedTypes.join(', ')}`,
    }
  }

  if (file.size > CONFIG.imageRecognition.maxFileSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${CONFIG.imageRecognition.maxFileSize / 1024 / 1024}MB`,
    }
  }

  return { valid: true }
}

export function validateIngredientsInput(input: string): {
  valid: boolean
  ingredients: string[]
  error?: string
} {
  const ingredients = input
    .split(/[,;]|\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  if (ingredients.length === 0) {
    return {
      valid: false,
      ingredients: [],
      error: 'Please enter at least one ingredient',
    }
  }

  if (ingredients.length > 50) {
    return {
      valid: false,
      ingredients,
      error: 'Too many ingredients. Please limit to 50',
    }
  }

  return { valid: true, ingredients }
}

