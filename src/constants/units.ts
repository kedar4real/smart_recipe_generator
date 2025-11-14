export const UNITS = {
  volume: ['cup', 'tbsp', 'tsp', 'fl oz', 'ml', 'l'],
  weight: ['oz', 'lb', 'g', 'kg'],
  count: ['piece', 'clove', 'head', 'bunch', 'stalk'],
  length: ['inch', 'cm'],
} as const

export type UnitType = keyof typeof UNITS

export const UNIT_CONVERSIONS: Record<string, number> = {
  'tsp': 1,
  'tbsp': 3,
  'fl oz': 6,
  'cup': 48,
  'ml': 0.202884,
  'l': 202.884,
  'oz': 1,
  'lb': 16,
  'g': 0.035274,
  'kg': 35.274,
}

