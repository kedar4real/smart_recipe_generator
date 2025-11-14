export function ActiveFiltersBar({ filters, onRemoveFilter, onClear }) {
  const activeChips = [
    ...filters.dietaryTags.map((tag) => ({ type: 'dietary', label: tag })),
    ...filters.cuisines.map((cuisine) => ({ type: 'cuisine', label: cuisine })),
  ]

  if (filters.difficulty) {
    activeChips.push({ type: 'difficulty', label: filters.difficulty })
  }

  if (filters.maxTime) {
    activeChips.push({ type: 'time', label: `${filters.maxTime} min max` })
  }

  if (activeChips.length === 0) {
    return null
  }

  return (
    <div className="rounded-3xl border border-secondary-100 bg-white/90 px-4 py-3 shadow-inner animate-fade-in">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
          Active filters
        </p>
        {activeChips.map((chip) => (
          <button
            key={`${chip.type}-${chip.label}`}
            type="button"
            onClick={() => onRemoveFilter?.(chip.type, chip.label.replace(' min max', ''))}
            className="group inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700"
          >
            {chip.label}
            <span className="rounded-full bg-secondary-200 px-1 text-secondary-600 group-hover:bg-secondary-300">
              ×
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-primary-600 underline-offset-4 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>
    </div>
  )
}
