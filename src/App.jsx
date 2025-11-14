import { RecipeProvider } from '@/contexts/RecipeContext.jsx'
import { UserProvider } from '@/contexts/UserContext.jsx'
import { PageLayout } from '@/components/layout/PageLayout.jsx'
import { AppRouter } from '@/router.jsx'
import { FilterProvider } from '@/contexts/FilterContext.jsx'
import { AppErrorBoundary } from '@/components/common/AppErrorBoundary.jsx'

export default function App() {
  return (
    <RecipeProvider>
      <UserProvider>
        <FilterProvider>
          <AppErrorBoundary>
            <PageLayout>
              <AppRouter />
            </PageLayout>
          </AppErrorBoundary>
        </FilterProvider>
      </UserProvider>
    </RecipeProvider>
  )
}
