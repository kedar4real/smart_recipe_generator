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
    <header className="sticky top-0 z-40 w-full border-b border-[#3d2519] bg-[#1b120c]/95 text-amber-50 shadow-[0_10px_30px_rgba(17,10,6,0.45)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-[220px] items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="Kedar Mashalkar logo"
            className="h-10 w-10 rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg"
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-200/80">
              Retro flair · Smart pantry magic
            </p>
            <p className="text-lg font-semibold leading-tight text-white">
              Kedar Mashalkar&apos;s Smart Gourmet Kitchen
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-amber-100">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-[#f7a654] text-[#1d120a] shadow-lg'
                    : 'text-amber-50/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full border border-white/15 bg-[#2b1a13]/90 px-4 py-2 text-sm shadow-inner focus-within:border-amber-200"
        >
          <img src="/images/icons/sparkle.svg" alt="" className="h-5 w-5 opacity-80" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="flex-1 border-none bg-transparent text-amber-50 placeholder:text-amber-100/50 focus:outline-none"
            placeholder="Drop pantry items, press Enter..."
          />
          <button
            type="submit"
            className="rounded-full bg-[#f7a654] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#2d1405] transition hover:bg-[#ffb46c]"
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
                className={`flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                  isActive
                    ? 'border-white/50 bg-white/90 text-[#1f1209]'
                    : 'border-white/10 text-amber-50/80 hover:border-white/40 hover:bg-white/10'
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
