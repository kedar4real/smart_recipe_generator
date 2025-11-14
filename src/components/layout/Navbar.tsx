import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Kedar Mashalkar logo" className="h-10 w-10 rounded-xl" />
            <span className="text-xl font-bold text-secondary-900">Kedar Mashalkar&apos;s Kitchen</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

