import { useState } from 'react'
import { useRatings } from '@/hooks/useRatings'

interface RatingStarsProps {
  recipeId: string
  readonly?: boolean
  size?: 'sm' | 'md'
}

export function RatingStars({ recipeId, readonly = false, size = 'md' }: RatingStarsProps) {
  const { getRating, setRating } = useRatings()
  const currentRating = getRating(recipeId)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const displayRating = hoverRating || currentRating || 0

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }

  const handleClick = (rating: number) => {
    if (!readonly) {
      setRating(recipeId, rating)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(null)}
          disabled={readonly}
          className={`${sizeClasses[size]} transition-colors ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          {star <= displayRating ? (
            <svg className="w-full h-full text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg className="w-full h-full text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

