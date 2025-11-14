import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card } from '@/components/common/Card'
import { INGREDIENT_PRESETS } from '@/constants/presets'
import { parseIngredientInput } from '@/utils/ingredientParser'

export function HomePage() {
  const [ingredients, setIngredients] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const parsed = parseIngredientInput(ingredients)
    if (parsed.length > 0) {
      navigate('/search', { state: { ingredients: parsed } })
    }
  }

  const handlePreset = (presetIngredients: readonly string[]) => {
    const ingredientsArray = [...presetIngredients]
    setIngredients(ingredientsArray.join(', '))
    navigate('/search', { state: { ingredients: ingredientsArray } })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          What can I cook with what I have?
        </h1>
        <p className="text-lg text-secondary-600">
          Enter your ingredients and discover delicious recipes
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <Input
            placeholder="e.g., chicken, rice, onion, garlic"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} className="w-full">
            Find Recipes
          </Button>
        </div>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INGREDIENT_PRESETS.map((preset) => (
            <Card
              key={preset.id}
              hover
              onClick={() => handlePreset(preset.ingredients)}
              className="p-4 cursor-pointer"
            >
              <h3 className="font-semibold text-secondary-900 mb-2">{preset.name}</h3>
              <p className="text-sm text-secondary-600">
                {preset.ingredients.slice(0, 4).join(', ')}
                {preset.ingredients.length > 4 && '...'}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

