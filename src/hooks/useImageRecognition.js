import { useCallback, useState } from 'react'
import { recognizeIngredientsFromImage } from '@/services/imageRecognitionService.js'

export function useImageRecognition() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (file) => {
    try {
      setError(null)
      setLoading(true)
      setResults([])
      const detected = await recognizeIngredientsFromImage(file)
      setResults(detected)
      return detected
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to analyze the image.'
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, analyze }
}
