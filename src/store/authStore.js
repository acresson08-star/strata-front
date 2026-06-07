import { create } from 'zustand'
import { authService } from '../services/auth.service'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  init: async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const user = await authService.me()
      set({ user, isAuthenticated: true })
    } catch {
      localStorage.removeItem('token')
    }
  },

  login: async (credentials) => {
    const data = await authService.login(credentials)
    set({ user: data.user, isAuthenticated: true })
  },

  logout: () => {
    authService.logout()
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },
}))