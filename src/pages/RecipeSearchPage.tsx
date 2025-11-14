import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card } from '@/components/common/Card'
import { useRecipeSearch } from '@/hooks/useRecipeSearch'
import { parseIngredientInput } from '@/utils/ingredientParser'
import { DIETARY_OPTIONS } from '@/constants/dietaryOptions'
import { DIFFICULTY_LEVELS } from '@/constants/difficultyLevels'
import { CUISINE_TYPES } from '@/constants/cuisineTypes'
import type { DietaryOption } from '@/constants/dietaryOptions'

export function RecipeSearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialIngredients = (location.state?.ingredients as string[]) || []

  const [ingredients, setIngredients] = useState(initialIngredients.join(', '))
  const [activeIngredients, setActiveIngredients] = useState(initialIngredients)
  const [dietaryFilters, setDietaryFilters] = useState<DietaryOption[]>([])
  const [difficultyFilter, setDifficultyFilter] = useState<string>('')
  const [cuisineFilter, setCuisineFilter] = useState<string>('')
  const [maxTime, setMaxTime] = useState<number | undefined>()

  const { recipes, loading, searchRecipes } = useRecipeSearch(activeIngredients, {
    dietary: dietaryFilters,
    difficulty: difficultyFilter || undefined,
    cuisine: cuisineFilter || undefined,
    maxTime,
  })

  useEffect(() => {
    if (activeIngredients.length > 0) {
      searchRecipes()
    }
  }, [activeIngredients, dietaryFilters, difficultyFilter, cuisineFilter, maxTime, searchRecipes])

  const handleSearch = () => {
    const parsed = parseIngredientInput(ingredients)
    if (parsed.length > 0) {
      setActiveIngredients(parsed)
      navigate('/search', { state: { ingredients: parsed }, replace: true })
    }
  }

  const toggleDietary = (option: DietaryOption) => {
    setDietaryFilters((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="p-4">
              <h2 className="font-semibold text-secondary-900 mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Dietary
                  </label>
                  <div className="space-y-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dietaryFilters.includes(option.id)}
                          onChange={() => toggleDietary(option.id)}
                          className="mr-2"
                        />
                        <span className="text-sm text-secondary-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
                  >
                    <option value="">All</option>
                    {DIFFICULTY_LEVELS.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Cuisine
                  </label>
                  <select
                    value={cuisineFilter}
                    onChange={(e) => setCuisineFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
                  >
                    <option value="">All</option>
                    {CUISINE_TYPES.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Max Time (minutes)
                  </label>
                  <Input
                    type="number"
                    value={maxTime || ''}
                    onChange={(e) =>
                      setMaxTime(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    placeholder="Any"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter ingredients..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <RecipeGrid recipes={recipes} loading={loading} />
        </div>
      </div>
    </div>
  )
}

