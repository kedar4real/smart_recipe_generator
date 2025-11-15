import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'
import { AboutSection } from './AboutSection.jsx'

export function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 w-full px-4 py-10 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-12">{children}</div>
        </main>
        <AboutSection />
      </div>
      <Footer />
    </div>
  )
}
