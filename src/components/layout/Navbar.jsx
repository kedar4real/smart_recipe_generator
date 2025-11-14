import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFilters } from '@/contexts/FilterContext.jsx'
import { parseIngredientInput } from '@/utils/ingredientParser'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Recipes' },
  { to: '/favorites', label: 'Favorites' },
]

const dietaryQuickToggles = [
  { id: 'vegetarian', label: 'Veg', color: '#65A30D' },
  { id: 'vegan', label: 'Vegan', color: '#0EA5E9' },
  { id: 'gluten-free', label: 'GF', color: '#F97316' },
]

export function Navbar() {
  const { filters, toggleDietary } = useFilters()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const parsed = parseIngredientInput(searchValue)
    if (parsed.length === 0) return
    navigate('/search', { state: { ingredients: parsed } })
    setSearchValue('')
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-primary-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Kedar Mashalkar logo" className="h-12 w-12 rounded-2xl shadow-lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-secondary-400">
              Curated pantry studio
            </p>
            <p className="text-xl font-bold text-secondary-900">Kedar Mashalkar&apos;s Smart Gourmet Kitchen</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-secondary-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                      : 'hover:bg-primary-50 hover:text-primary-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden flex-1 items-center gap-3 rounded-full border border-secondary-100 bg-white/95 px-4 py-2 text-sm shadow-inner sm:flex"
          >
            <img src="/images/icons/sparkle.svg" alt="" className="h-6 w-6" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="flex-1 border-none bg-transparent text-secondary-900 placeholder:text-secondary-400 focus:outline-none"
              placeholder="Quick add ingredients (comma separated)..."
            />
            <button
              type="submit"
              className="rounded-full bg-secondary-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white"
            >
              Go
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {dietaryQuickToggles.map((toggle) => {
            const isActive = filters.dietaryTags.includes(toggle.id)
            return (
              <button
                key={toggle.id}
                type="button"
                onClick={() => toggleDietary(toggle.id)}
                className={`group flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? 'border-primary-500 bg-primary-500 text-white shadow'
                    : 'border-secondary-200 text-secondary-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: toggle.color }}
                  aria-hidden="true"
                />
                {toggle.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
