import { api } from './api'

export const articlesService = {
  // Récupérer tous les articles (avec pagination optionnelle)
  getAll: ({ page = 1, limit = 10, category, status } = {}) => {
    const params = new URLSearchParams({ page, limit })
    if (category) params.append('category', category)
    if (status)   params.append('status', status)
    return api.get(`/articles?${params}`).then(data => data.articles)
  },

  // Récupérer un article par son slug (vue publique)
  getBySlug: (slug) => {
    return api.get(`/articles/${slug}`)
  },

  // Récupérer un article par son id (vue admin)
  getById: (id) => {
    return api.get(`/articles/id/${id}`)
  },

  // Créer un article
  create: (articleData) => {
    return api.post('/articles', articleData)
  },

  // Mettre à jour un article
  update: (id, articleData) => {
    return api.put(`/articles/${id}`, articleData)
  },

  // Supprimer un article
  delete: (id) => {
    return api.delete(`/articles/${id}`)
  },

  // Publier / dépublier
  togglePublish: (id, status) => {
    return api.patch(`/articles/${id}/status`, { status })
  },

  // Recherche
  search: (query) => {
    return api.get(`/articles/search?q=${encodeURIComponent(query)}`)
  },
}
