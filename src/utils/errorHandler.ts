export class RecipeError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'RecipeError'
  }
}

export function handleError(error: unknown): string {
  if (error instanceof RecipeError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof RecipeError) {
    return error.code === 'NETWORK_ERROR' || error.statusCode === 0
  }

  return false
}

