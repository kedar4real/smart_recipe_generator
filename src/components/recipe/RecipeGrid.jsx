import { RecipeCard } from './RecipeCard.jsx'
import { EmptyState } from '@/components/common/EmptyState.jsx'

export function RecipeGrid({
  results = [],
  favorites = [],
  loading = false,
  onToggleFavorite = () => {},
  onClearFilters,
}) {
  if (loading) {
    return (
      <div className="retro-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon="/images/icons/empty-bowl.svg"
        title="No recipes found"
        message="Try updating filters, add more pantry items, or let the salad bowl inspire you."
        actionLabel={onClearFilters ? 'Clear filters' : undefined}
        onAction={onClearFilters}
      />
    )
  }

  return (
    <div className="retro-grid">
      {results.map((result) => (
        <RecipeCard
          key={result.recipe.id}
          recipe={result.recipe}
          matchScore={result.score}
          isFavorite={favorites.includes(result.recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="h-80 rounded-[28px] border border-white/40 bg-white/70 shadow-inner animate-pulse" />
  )
}
