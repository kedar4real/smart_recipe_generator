import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { HomePage } from '@/pages/HomePage'
import { RecipeSearchPage } from '@/pages/RecipeSearchPage'
import { RecipeDetailPage } from '@/pages/RecipeDetailPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<RecipeSearchPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App

