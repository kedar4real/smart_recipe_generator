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
  { id: 'vegetarian', label: 'Veg', color: '#84cc16' },
  { id: 'vegan', label: 'Vegan', color: '#22d3ee' },
  { id: 'gluten-free', label: 'GF', color: '#fb923c' },
  { id: 'dairy-free', label: 'Dairy', color: '#facc15' },
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
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#06140f]/95 text-white shadow-[0_20px_40px_rgba(5,12,10,0.45)] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-8 lg:grid lg:grid-cols-[auto,1fr,auto] lg:items-center">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Kedar Mashalkar logo"
            className="h-11 w-11 rounded-2xl border border-white/20 bg-white/5 p-2 shadow-lg"
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

        <nav className="order-3 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white/80 lg:order-none lg:justify-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-white text-forest-700 shadow-lg'
                    : 'hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="order-2 flex flex-col gap-3 text-xs font-semibold text-white lg:order-none lg:items-end">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full flex-wrap items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm shadow-inner transition focus-within:border-brandAccent-200 lg:w-[320px]"
          >
            <img src="/images/icons/sparkle.svg" alt="" className="h-5 w-5 opacity-80" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="min-w-0 flex-1 border-none bg-transparent text-white placeholder:text-white/60 focus:outline-none"
              placeholder="Drop pantry items, press Enter..."
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brandAccent-400 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#150a04] transition hover:-translate-y-0.5 hover:bg-brandAccent-300"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap items-center justify-start gap-2 text-white/80 lg:justify-end">
            {dietaryQuickToggles.map((toggle) => {
              const isActive = filters.dietaryTags.includes(toggle.id)
              return (
                <button
                  key={toggle.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleDietary(toggle.id)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 transition-all duration-200 ${
                    isActive
                      ? 'border-white/60 bg-white/90 text-forest-900'
                      : 'border-white/20 text-white/80 hover:border-white/45 hover:bg-white/10'
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
      </div>
    </header>
  )
}
