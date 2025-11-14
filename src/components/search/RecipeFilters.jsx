import { DIETARY_OPTIONS } from '@/constants/dietaryOptions'
import { DIFFICULTY_LEVELS } from '@/constants/difficultyLevels'
import { CUISINE_TYPES } from '@/constants/cuisineTypes'

const cuisineOptions = CUISINE_TYPES.slice(0, 12)

export function RecipeFilters({ filters, onChange }) {
  const toggleDietary = (option) => {
    const dietaryTags = filters.dietaryTags.includes(option)
      ? filters.dietaryTags.filter((tag) => tag !== option)
      : [...filters.dietaryTags, option]
    onChange({ dietaryTags })
  }

  const toggleCuisine = (cuisine) => {
    const cuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter((item) => item !== cuisine)
      : [...filters.cuisines, cuisine]
    onChange({ cuisines })
  }

  return (
    <aside className="space-y-6 surface-panel p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-500">
          Dietary preferences
        </h3>
        <div className="mt-4 space-y-2">
          {DIETARY_OPTIONS.map((option) => (
            <label key={option.id} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                checked={filters.dietaryTags.includes(option.id)}
                onChange={() => toggleDietary(option.id)}
              />
              <span className="text-secondary-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-500">Cuisine</h3>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cuisineOptions.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              onClick={() => toggleCuisine(cuisine)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                filters.cuisines.includes(cuisine)
                  ? 'border-primary-500 bg-primary-500/10 text-primary-700'
                  : 'border-slate-200 text-secondary-600 hover:border-primary-200 hover:text-primary-600'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-500">
          Difficulty
        </h3>
        <select
          value={filters.difficulty}
          onChange={(event) => onChange({ difficulty: event.target.value })}
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-secondary-700 focus:border-primary-400 focus:outline-none"
        >
          <option value="">Any difficulty</option>
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary-500">Max time</h3>
        <input
          type="number"
          min="10"
          step="5"
          placeholder="Minutes"
          value={filters.maxTime ?? ''}
          onChange={(event) =>
            onChange({ maxTime: event.target.value ? Number(event.target.value) : undefined })
          }
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-secondary-700 focus:border-primary-400 focus:outline-none"
        />
        <p className="mt-2 text-xs text-secondary-500">Leave blank for no time limit.</p>
      </div>
    </aside>
  )
}
