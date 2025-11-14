import { useEffect, useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const readValue = () => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : defaultValue
    } catch (error) {
      console.warn(`useLocalStorage: failed to parse key "${key}"`, error)
      return defaultValue
    }
  }

  const [value, setValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, error)
    }
  }, [key, value])

  return [value, setValue]
}
