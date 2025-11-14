import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <img src="/images/icons/empty-bowl.svg" alt="" className="h-16 w-16 mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-secondary-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}

