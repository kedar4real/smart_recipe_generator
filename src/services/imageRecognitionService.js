const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const API_URL = import.meta.env.VITE_API_URL

export async function recognizeIngredientsFromImage(file) {
  if (!file) {
    throw new Error('Please choose an image to analyze.')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Image is too large. Please select a file under 5MB.')
  }

  if (API_URL) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/api/recognize-ingredients`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const message =
        response.status === 413
          ? 'Upload is too large for the server.'
          : 'Unable to analyze image right now.'
      throw new Error(message)
    }

    const data = await response.json()
    return data.ingredients || []
  }

  const response = await fetch('/api/mock-ingredients.json')
  if (!response.ok) {
    throw new Error('Unable to analyze image right now.')
  }
  const data = await response.json()
  return data.ingredients || []
}
