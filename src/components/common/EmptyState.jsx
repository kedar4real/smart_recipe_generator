export function EmptyState({ icon = '/images/icons/empty-bowl.svg', title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-[32px] border border-dashed border-secondary-200 bg-white/95 p-12 text-center shadow-inner animate-fade-in">
      <img src={icon} alt="" className="mx-auto mb-4 h-16 w-16" />
      <h3 className="text-xl font-semibold text-secondary-900">{title}</h3>
      {message && <p className="mt-2 text-secondary-600">{message}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-primary-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
