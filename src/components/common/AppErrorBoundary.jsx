import { Component } from 'react'

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50">
          <div className="retro-card px-8 py-10 text-center">
            <p className="text-6xl mb-4">😵‍💫</p>
            <h1 className="text-2xl font-semibold text-secondary-900">Something went wrong</h1>
            <p className="mt-2 text-secondary-600">
              Please refresh the page or try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-primary-500 px-6 py-2 text-white font-semibold shadow hover:bg-primary-600"
            >
              Reload app
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
