import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRatings } from '@/hooks/useRatings.js'

const matchBadgeStyles = (score = 0) => {
  if (score >= 90) return 'bg-mint-300 text-cocoa-900'
  if (score >= 70) return 'bg-primary-200 text-cocoa-900'
  return 'bg-secondary-100 text-secondary-700'
}

export function RecipeCard({ recipe, matchScore, isFavorite, onToggleFavorite }) {
  const { getRating, setRating } = useRatings()
  const userRating = getRating(recipe.id)
  const baseRating = recipe.rating || 4.5
  const displayRating = userRating || baseRating
  const [imageSrc, setImageSrc] = useState(recipe.image)
  const calories = recipe.nutrition?.calories

  const handleFavoriteClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleFavorite?.(recipe.id)
  }

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/50 bg-white/95 p-4 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-retro">
      <Link
        to={`/recipes/${recipe.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
      >
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={imageSrc}
            alt={recipe.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImageSrc('/images/recipes/fallback.jpg')}
          />
          {typeof matchScore === 'number' && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${matchBadgeStyles(
                matchScore
              )}`}
            >
              {matchScore}% match
            </span>
          )}
          <button
            type="button"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={handleFavoriteClick}
            className={`absolute right-4 top-4 rounded-full border px-3 py-2 shadow-lg transition hover:-translate-y-0.5 ${
              isFavorite
                ? 'border-[#fca5a5]/70 bg-[#fff1f1]/90 text-[#b91c1c]'
                : 'border-white/40 bg-[#1b120c]/70 text-white'
            }`}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        <div className="space-y-4 px-1 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-secondary-400">
                {recipe.cuisine}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-secondary-900">{recipe.title}</h3>
            </div>
            <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
              {recipe.difficulty}
            </span>
          </div>

          <p className="text-sm text-secondary-600 line-clamp-2">{recipe.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-secondary-600 sm:grid-cols-4">
            <InfoChip iconSrc="/images/icons/clock.svg" label={`${recipe.totalTime}m`} />
            <InfoChip iconSrc="/images/icons/servings.svg" label={`${recipe.servings} servings`} />
            <InfoChip
              iconSrc="/images/icons/flame.svg"
              label={calories ? `${calories} cal` : 'Cal info'}
            />
            <InfoChip iconSrc="/images/icons/spoon.svg" label={recipe.cuisine} />
          </div>
        </div>
      </Link>

      <div className="border-t border-secondary-100 px-1 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
          Rate this dish
        </p>
        <div className="mt-2 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(recipe.id, value)}
              className={`text-lg transition ${
                value <= displayRating ? 'text-primary-500' : 'text-secondary-300'
              } hover:scale-110`}
              aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
          <span className="text-xs font-semibold text-secondary-500">
            {displayRating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  )
}

function InfoChip({ iconSrc, label }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary-50 px-3 py-1 capitalize">
      <img src={iconSrc} alt="" className="h-4 w-4" />
      {label}
    </div>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5s-7.5-4.3-7.5-10.1a4.25 4.25 0 0 1 7-3.2l0.5 0.5 0.5-0.5a4.25 4.25 0 0 1 7 3.2c0 5.8-7.5 10.1-7.5 10.1z" />
    </svg>
  )
}
