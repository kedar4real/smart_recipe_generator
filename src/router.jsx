import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage.jsx'
import RecipeSearchPage from '@/pages/RecipeSearchPage.jsx'
import RecipeDetailPage from '@/pages/RecipeDetailPage.jsx'
import FavoritesPage from '@/pages/FavoritesPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<RecipeSearchPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
