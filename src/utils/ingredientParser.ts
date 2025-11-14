export function parseIngredientInput(input: string): string[] {
  return input
    .split(/[,;]|\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => item.toLowerCase())
}

export function formatIngredientList(ingredients: string[]): string {
  return ingredients.join(', ')
}

