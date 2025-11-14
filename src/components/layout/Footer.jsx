const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-secondary-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-secondary-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} Kedar Mashalkar · Crafted with love and leftovers.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="underline-offset-2 hover:text-primary-600">
            Privacy
          </a>
          <a href="#" className="underline-offset-2 hover:text-primary-600">
            Terms
          </a>
          <a href="#" className="underline-offset-2 hover:text-primary-600">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
