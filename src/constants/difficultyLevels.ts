export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
] as const

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number]['id']

