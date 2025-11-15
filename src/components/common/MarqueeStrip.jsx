const messages = [
  'Recommended by the best chefs',
  'AI-powered pantry insights',
  'Smart substitutions in seconds',
  'Fast & intuitive cooking',
  'Flavour-first recipe ideas',
]

export function MarqueeStrip() {
  return (
    <div className="marquee my-10 rounded-full border border-white/10 bg-[#0b2219] py-4">
      <div className="marquee-track">
        {[...messages, ...messages].map((message, index) => (
          <span key={`${message}-${index}`} className="text-sm tracking-[0.4em]">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
