const sortOptions = [
  { value: 'best', label: 'Best match' },
  { value: 'time', label: 'Shortest time' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'difficulty', label: 'Easiest first' },
]

export function RecipeSort({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-sm font-medium text-secondary-600">Sort by</span>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-1 text-sm transition ${
              value === option.value
                ? 'bg-primary-500 text-white shadow'
                : 'bg-slate-100 text-secondary-600 hover:bg-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
