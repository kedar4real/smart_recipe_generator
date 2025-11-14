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
  const favoriteIcon = isFavorite ? '/images/icons/heart-filled.svg' : '/images/icons/heart-outline.svg'

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/50 bg-white/95 p-4 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-retro">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
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
          onClick={() => onToggleFavorite?.(recipe.id)}
          className="absolute right-4 top-4 rounded-full bg-white/95 p-2 shadow hover:bg-primary-50"
        >
          <img src={favoriteIcon} alt="" className="h-7 w-7" />
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

        <div className="grid grid-cols-3 gap-2 text-xs font-medium text-secondary-600">
          <InfoChip iconSrc="/images/icons/clock.svg" label={`${recipe.totalTime}m`} />
          <InfoChip iconSrc="/images/icons/servings.svg" label={`${recipe.servings} servings`} />
          <InfoChip iconSrc="/images/icons/spoon.svg" label={recipe.cuisine} />
        </div>

        <div>
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
