const testimonials = [
  {
    name: 'Kedar Sharma',
    quote:
      'I wanted a playful kitchen companion that respected my pantry and my heritage. This is the sous-chef I never knew I needed.',
  },
  {
    name: 'Priya Rao',
    quote:
      'The retro look brings nostalgia, but the ingredient intelligence is seriously futuristic.',
  },
  {
    name: 'Aarav Patel',
    quote:
      'Smart Gourmet Kitchen rescued my weeknight dinners with clever swaps and instant photo recognition.',
  },
]

export function AboutSection() {
  return (
    <section className="mx-auto mt-12 max-w-6xl rounded-[32px] border border-white/60 bg-white/90 px-6 py-10 text-center shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-400">
        About Kedar&apos;s Smart Gourmet Kitchen
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-secondary-900">Crafted with love and leftovers</h2>
      <p className="mx-auto mt-3 max-w-3xl text-secondary-600">
        We blend AI-powered ingredient recognition, curated substitution science, and a dash of retro charm
        to help every pantry turn into a five-star kitchen. Built by Kedar for food lovers everywhere.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="rounded-2xl border border-secondary-100 bg-secondary-50/60 p-4 text-left shadow-inner"
          >
            <blockquote className="text-secondary-700">&ldquo;{item.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-secondary-900">— {item.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
