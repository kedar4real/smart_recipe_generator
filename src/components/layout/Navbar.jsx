import { NavLink } from 'react-router-dom'
import { useFilters } from '@/contexts/FilterContext.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Recipes' },
  { to: '/favorites', label: 'Favorites' },
]

const dietaryQuickToggles = [
  { id: 'vegetarian', label: 'Veg', icon: '🥕' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'gluten-free', label: 'GF', icon: '🌾' },
]

export function Navbar() {
  const { filters, toggleDietary } = useFilters()

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-primary-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-200 text-2xl shadow-lg">
            🥗
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-secondary-400">
              Curated AI kitchen
            </p>
            <p className="text-xl font-bold text-secondary-900">Kedar's Smart Gourmet Kitchen</p>
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

          <div className="hidden flex-1 items-center gap-2 rounded-full border border-secondary-100 bg-white px-4 py-2 text-sm text-secondary-500 shadow-inner sm:flex">
            <span role="img" aria-hidden="true">
              🔍
            </span>
            Search dishes, cuisines, or pantry staples
          </div>
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
                <span className="text-base" aria-hidden="true">
                  {toggle.icon}
                </span>
                {toggle.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
