import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-semibold text-secondary-900 mb-4">Page not found</h1>
      <p className="text-secondary-600 mb-6">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s head back home.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-primary-600"
      >
        Go Home
      </Link>
    </section>
  )
}
