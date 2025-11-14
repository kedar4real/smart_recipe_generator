import substitutionsData from '@/data/substitutions.json'

export interface Substitution {
  name: string
  ratio: string
  notes: string
  isAvailable?: boolean
}

export function findSubstitutions(
  ingredientName: string,
  availableIngredients: string[] = []
): Substitution[] {
  const normalizedIngredient = ingredientName.toLowerCase().trim()

  const substitution = substitutionsData.find(
    (sub) => sub.ingredient.toLowerCase() === normalizedIngredient
  )

  if (!substitution) {
    return []
  }

  return substitution.substitutes.map((sub) => {
    const isAvailable = availableIngredients.some(
      (avail) => avail.toLowerCase().includes(sub.name.toLowerCase())
    )

    return {
      ...sub,
      isAvailable,
    }
  })
}

export function getSubstitutionMessage(
  ingredientName: string,
  availableIngredients: string[] = []
): string | null {
  const substitutions = findSubstitutions(ingredientName, availableIngredients)

  if (substitutions.length === 0) {
    return null
  }

  const bestSub = substitutions.find((sub) => sub.isAvailable) || substitutions[0]

  return `No ${ingredientName}? Try ${bestSub.name} instead (${bestSub.notes})`
}

