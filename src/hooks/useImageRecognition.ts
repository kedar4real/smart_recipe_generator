import { useState } from 'react'
import { recognizeIngredients, recognizeIngredientsMock } from '@/services/imageRecognitionService'
import { validateImageFile } from '@/utils/validation'
import { handleError } from '@/utils/errorHandler'
import { CONFIG } from '@/constants/config'

interface DetectedIngredient {
  name: string
  confidence: number
}

export function useImageRecognition() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([])

  const recognize = async (file: File) => {
    setError(null)
    setLoading(true)
    setDetectedIngredients([])

    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid image file')
      setLoading(false)
      return
    }

    try {
      let ingredients: DetectedIngredient[]
      
      if (CONFIG.clarifai.apiKey) {
        ingredients = await recognizeIngredients(file)
      } else {
        ingredients = await recognizeIngredientsMock(file)
      }

      setDetectedIngredients(ingredients)
    } catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setDetectedIngredients([])
  }

  return {
    loading,
    error,
    detectedIngredients,
    recognize,
    reset,
  }
}

