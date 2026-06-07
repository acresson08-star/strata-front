import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/auth.service'

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, login, logout, setUser } = useAuthStore()

  // Vérifier l'authentification au montage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !isAuthenticated) {
      authService
        .me()
        .then(setUser)
        .catch(() => logout())
    }
  }, [])

  return { user, isAuthenticated, isLoading, error, login, logout }
}
