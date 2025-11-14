import substitutionsData from '@/data/substitutions.json'

export function findSubstitutions(ingredientName, availableIngredients = []) {
  const normalized = ingredientName.toLowerCase().trim()
  const entry = substitutionsData.find(
    (sub) => sub.ingredient.toLowerCase() === normalized
  )

  if (!entry) {
    return []
  }

  return entry.substitutes.map((sub) => {
    const isAvailable = availableIngredients.some((available) =>
      available.toLowerCase().includes(sub.name.toLowerCase())
    )
    return { ...sub, isAvailable }
  })
}

export function getSubstitutionMessage(ingredientName, availableIngredients = []) {
  const substitutions = findSubstitutions(ingredientName, availableIngredients)
  if (substitutions.length === 0) return null
  const bestMatch = substitutions.find((sub) => sub.isAvailable) || substitutions[0]
  return `No ${ingredientName}? Try ${bestMatch.name} instead (${bestMatch.notes})`
}
