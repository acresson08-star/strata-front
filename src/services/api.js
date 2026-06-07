// ============================================
// API SERVICE — Instance de base
// Remplace BASE_URL par l'URL de ton backend
// ============================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Ajouter le token JWT si présent
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `HTTP error ${response.status}`)
  }

  return response.json()
}

export const api = {
  get:    (endpoint, options = {}) => request(endpoint, { method: 'GET', ...options }),
  post:   (endpoint, body, options = {}) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put:    (endpoint, body, options = {}) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch:  (endpoint, body, options = {}) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options = {}) => request(endpoint, { method: 'DELETE', ...options }),
}
