// ============================================
// UTILITAIRE — Formatage des dates
// ============================================

export function formatDate(dateString, options = {}) {
  const date = new Date(dateString)
  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }
  return date.toLocaleDateString('fr-FR', defaultOptions)
}

export function formatDateShort(dateString) {
  return formatDate(dateString, { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date

  const minutes = Math.floor(diff / 60000)
  const hours   = Math.floor(diff / 3600000)
  const days    = Math.floor(diff / 86400000)

  if (minutes < 1)  return "À l'instant"
  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24)   return `Il y a ${hours}h`
  if (days < 7)     return `Il y a ${days} jour${days > 1 ? 's' : ''}`

  return formatDateShort(dateString)
}
