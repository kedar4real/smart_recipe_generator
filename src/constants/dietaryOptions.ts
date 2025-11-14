export const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'nut-free', label: 'Nut-Free' },
  { id: 'low-carb', label: 'Low-Carb' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
] as const

export type DietaryOption = (typeof DIETARY_OPTIONS)[number]['id']

