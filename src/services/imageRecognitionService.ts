import { CONFIG } from '@/constants/config'
import { RecipeError } from '@/utils/errorHandler'

interface ClarifaiResponse {
  outputs: Array<{
    data: {
      concepts: Array<{
        name: string
        value: number
      }>
    }
  }>
}

interface DetectedIngredient {
  name: string
  confidence: number
}

export async function recognizeIngredients(imageFile: File): Promise<DetectedIngredient[]> {
  if (!CONFIG.clarifai.apiKey) {
    throw new RecipeError(
      'Image recognition is not configured. Please set VITE_CLARIFAI_API_KEY environment variable.',
      'CONFIG_ERROR'
    )
  }

  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${CONFIG.clarifai.modelId}/outputs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Key ${CONFIG.clarifai.apiKey}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new RecipeError(
          'Invalid API key. Please check your Clarifai API key.',
          'AUTH_ERROR',
          response.status
        )
      }

      if (response.status === 429) {
        throw new RecipeError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT_ERROR',
          response.status
        )
      }

      throw new RecipeError(
        `API request failed: ${response.statusText}`,
        'API_ERROR',
        response.status
      )
    }

    const data: ClarifaiResponse = await response.json()

    if (!data.outputs || data.outputs.length === 0) {
      return []
    }

    const concepts = data.outputs[0].data.concepts || []

    return concepts
      .filter((concept) => concept.value >= CONFIG.imageRecognition.minConfidence)
      .map((concept) => ({
        name: concept.name,
        confidence: concept.value,
      }))
      .slice(0, 10)
  } catch (error) {
    if (error instanceof RecipeError) {
      throw error
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new RecipeError(
        'Network error. Please check your internet connection.',
        'NETWORK_ERROR'
      )
    }

    throw new RecipeError('Failed to recognize ingredients. Please try again.', 'UNKNOWN_ERROR')
  }
}

export async function recognizeIngredientsMock(_imageFile: File): Promise<DetectedIngredient[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockIngredients = [
    { name: 'chicken', confidence: 0.95 },
    { name: 'rice', confidence: 0.87 },
    { name: 'onion', confidence: 0.82 },
    { name: 'garlic', confidence: 0.78 },
    { name: 'bell pepper', confidence: 0.75 },
  ]

  return mockIngredients
}

