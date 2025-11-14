export const CUISINE_TYPES = [
  'Italian',
  'Asian',
  'Mexican',
  'Mediterranean',
  'American',
  'French',
  'Indian',
  'Thai',
  'Japanese',
  'Chinese',
  'Greek',
  'Spanish',
  'Middle Eastern',
  'Caribbean',
  'Other',
] as const

export type CuisineType = (typeof CUISINE_TYPES)[number]

