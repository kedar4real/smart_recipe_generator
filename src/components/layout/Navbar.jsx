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
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-gradient-to-r from-purple-600/90 via-purple-700/95 to-purple-900/95 text-white shadow-[0_18px_45px_rgba(35,0,70,0.35)] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-[220px] items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Kedar Mashalkar logo"
            className="h-10 w-10 rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg"
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-100/80">
              Recommended by the best chefs.
            </p>
            <p className="text-lg font-semibold leading-tight">
              Kedar Mashalkar&apos;s Smart Gourmet Kitchen
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/80">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-white text-purple-800 shadow-lg'
                    : 'hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-inner transition focus-within:border-white/60"
        >
          <img src="/images/icons/sparkle.svg" alt="" className="h-5 w-5 opacity-80" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="flex-1 border-none bg-transparent text-white placeholder:text-white/70 focus:outline-none"
            placeholder="Drop pantry items, press Enter..."
          />
          <button
            type="submit"
            className="rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800 transition hover:bg-white"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
          {dietaryQuickToggles.map((toggle) => {
            const isActive = filters.dietaryTags.includes(toggle.id)
            return (
              <button
                key={toggle.id}
                type="button"
                onClick={() => toggleDietary(toggle.id)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 transition-all duration-200 ${
                  isActive
                    ? 'border-white/60 bg-white/90 text-purple-900'
                    : 'border-white/20 text-white/80 hover:border-white/50 hover:bg-white/10'
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
