import { useMemo, useState } from 'react'
import { DIETARY_OPTIONS } from '@/constants/dietaryOptions'

const quickAddIngredients = [
  'tomato',
  'garlic',
  'spinach',
  'avocado',
  'chickpeas',
  'salmon',
  'quinoa',
  'basil',
]

export function IngredientInput({
  ingredients = [],
  onChange = () => {},
  dietary = [],
  onDietaryChange = () => {},
  label = 'Ingredients on hand',
  placeholder = 'Type ingredients and press Enter…',
}) {
  const [inputValue, setInputValue] = useState('')

  const availableQuickAdds = useMemo(
    () => quickAddIngredients.filter((item) => !ingredients.includes(item)),
    [ingredients]
  )

  const handleAddIngredient = (value) => {
    const normalized = value.trim().toLowerCase()
    if (!normalized || ingredients.includes(normalized)) return
    onChange([...ingredients, normalized])
    setInputValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      handleAddIngredient(inputValue)
    }
  }

  const handleRemove = (ingredient) => {
    onChange(ingredients.filter((item) => item !== ingredient))
  }

  const handleClear = () => {
    onChange([])
    setInputValue('')
  }

  const toggleDietary = (option) => {
    const next = dietary.includes(option)
      ? dietary.filter((id) => id !== option)
      : [...dietary, option]
    onDietaryChange(next)
  }

  return (
    <div className="retro-card border border-white/50 px-6 py-6 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
            Pantry wizard
          </p>
          <h3 className="text-xl font-semibold text-secondary-900">{label}</h3>
        </div>
        {ingredients.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-semibold text-primary-600 underline-offset-4 hover:text-primary-700"
          >
            Clear list
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-3 rounded-3xl border border-secondary-100 bg-white px-4 py-3 shadow-inner sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3">
            <span className="text-lg" aria-hidden="true">
              ✍️
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-none bg-transparent text-secondary-900 placeholder:text-secondary-400 focus:outline-none"
              placeholder={placeholder}
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddIngredient(inputValue)}
            className="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-600"
          >
            Add
          </button>
        </div>

        {availableQuickAdds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {availableQuickAdds.slice(0, 6).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddIngredient(item)}
                className="retro-pill px-4 py-1 text-xs uppercase tracking-wider"
              >
                + {item}
              </button>
            ))}
          </div>
        )}

        {ingredients.length > 0 && (
          <div className="rounded-3xl border border-secondary-100 bg-secondary-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
              Your basket
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-secondary-800 shadow-sm"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemove(ingredient)}
                    className="rounded-full bg-primary-100 px-2 text-xs text-primary-700 transition group-hover:bg-primary-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
          Dietary mood
        </p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.slice(0, 4).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleDietary(option.id)}
              className={`rounded-full border px-4 py-1 text-sm font-semibold transition ${
                dietary.includes(option.id)
                  ? 'border-primary-500 bg-primary-500 text-white shadow'
                  : 'border-secondary-200 bg-white text-secondary-600 hover:border-primary-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
