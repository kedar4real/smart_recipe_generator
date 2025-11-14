import { createContext, useContext, useMemo, useState } from 'react'

const UserContext = createContext({
  favorites: [],
  dietaryPreferences: [],
  toggleFavorite: () => {},
})

export function UserProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [dietaryPreferences] = useState([])

  const value = useMemo(
    () => ({
      favorites,
      dietaryPreferences,
      toggleFavorite: (id) => {
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        )
      },
    }),
    [favorites, dietaryPreferences]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
