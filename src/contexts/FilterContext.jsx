import { createContext, useContext, useMemo, useState } from 'react'

const defaultFilters = {
  dietaryTags: [],
  cuisines: [],
  difficulty: '',
  maxTime: undefined,
}

const FilterContext = createContext({
  filters: defaultFilters,
  sort: 'best',
  updateFilters: () => {},
  toggleDietary: () => {},
  setSort: () => {},
  resetFilters: () => {},
})

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters)
  const [sort, setSort] = useState('best')

  const value = useMemo(
    () => ({
      filters,
      sort,
      updateFilters: (next) => {
        setFilters((prev) => ({
          ...prev,
          ...next,
        }))
      },
      toggleDietary: (option) => {
        setFilters((prev) => {
          const exists = prev.dietaryTags.includes(option)
          return {
            ...prev,
            dietaryTags: exists
              ? prev.dietaryTags.filter((tag) => tag !== option)
              : [...prev.dietaryTags, option],
          }
        })
      },
      setSort,
      resetFilters: () => {
        setFilters(defaultFilters)
        setSort('best')
      },
    }),
    [filters, sort]
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  return useContext(FilterContext)
}
