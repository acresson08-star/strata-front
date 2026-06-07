import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminLayout from '../admin/layouts/AdminLayout/AdminLayout'
import Dashboard from '../admin/pages/Dashboard/Dashboard'
import ArticleList from '../admin/pages/ArticleList/ArticleList'
import ArticleEditor from '../admin/pages/ArticleEditor/ArticleEditor'
import MediaLibrary from '../admin/pages/MediaLibrary/MediaLibrary'

// Composant de protection de route
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />
}

const adminRoutes = [
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/articles',
    element: (
      <PrivateRoute>
        <AdminLayout>
          <ArticleList />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/articles/new',
    element: (
      <PrivateRoute>
        <AdminLayout>
          <ArticleEditor />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/articles/:id/edit',
    element: (
      <PrivateRoute>
        <AdminLayout>
          <ArticleEditor />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/medias',
    element: (
      <PrivateRoute>
        <AdminLayout>
          <MediaLibrary />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
]

export default adminRoutes
