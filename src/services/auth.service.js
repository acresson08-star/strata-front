import { api } from './api'

export const authService = {
  login: async ({ email, password }) => {
    const data = await api.post('/auth/login', { email, password })
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    return api.post('/auth/logout')
  },

  // Vérifier si le token actuel est toujours valide
  me: () => {
    return api.get('/auth/me')
  },

  // Rafraîchir le token
  refresh: () => {
    return api.post('/auth/refresh')
  },
}
