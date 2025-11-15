import { useEffect, useState } from 'react'

export function useScrollParallax(speed = 0.08, clamp = 65) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const handleScroll = () => {
      const value = window.scrollY * speed
      setOffset(value > clamp ? clamp : value)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, clamp])

  return {
    transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
  }
}
