import { useState, useEffect, useCallback } from 'react'
import { articlesService } from '../services/articles.service'

export function useArticles({ page, category, status } = {}) {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(() => {
    setIsLoading(true)
    articlesService
      .getAll({ page, category, status })
      .then(setArticles)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [page, category, status])

  useEffect(() => { fetch() }, [fetch])

  return { articles, isLoading, error, refetch: fetch }
}

export function useArticle(slug) {
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    articlesService
      .getBySlug(slug)
      .then(setArticle)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [slug])

  return { article, isLoading, error }
}

export function useIncrementViews(articleId) {
  useEffect(() => {
    if (!articleId) return
    const key = `viewed_${articleId}`
    if (sessionStorage.getItem(key)) return
    
    fetch(`${import.meta.env.VITE_API_URL}/articles/id/${articleId}/views`, {
      method: 'POST',
    }).then(() => {
      sessionStorage.setItem(key, '1')
    }).catch(() => {})
  }, [articleId])
}