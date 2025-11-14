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
    <div className="surface-panel px-6 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-600">
            Pantry wizard
          </p>
          <h3 className="text-2xl font-semibold text-secondary-900">{label}</h3>
        </div>
        {ingredients.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-semibold text-purple-700 underline-offset-4 hover:text-purple-800"
          >
            Clear list
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="rounded-[28px] border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <img src="/images/icons/sparkle.svg" alt="" className="h-8 w-8" />
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-none bg-transparent text-secondary-900 placeholder:text-secondary-500 focus:outline-none"
              placeholder={placeholder}
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddIngredient(inputValue)}
            className="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:bg-primary-600"
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
          <div className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-600">
              Your basket
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-secondary-800 shadow-sm"
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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-600">
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
                  : 'border-stone-200 bg-white text-secondary-600 hover:border-primary-200'
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
