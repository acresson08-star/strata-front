import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useArticles } from '../../../hooks/useArticles'
import { articlesService } from '../../../services/articles.service'
import { formatDate } from '../../../utils/formatDate'
import Button from '../../../components/ui/Button/Button'
import styles from './ArticleList.module.css'

const CATEGORIES = ['', 'actus', 'chroniques', 'interviews', 'playlists', 'dossiers']

export default function ArticleList() {
  const [searchParams] = useSearchParams()
  const [toast, setToast]         = useState(null)
  const [statusFilter, setStatus] = useState('')
  const [catFilter, setCat]       = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const { articles, isLoading, error, refetch } = useArticles({
    status:   statusFilter || undefined,
    category: catFilter    || undefined,
  })

  useEffect(() => {
    const success = searchParams.get('success')
    if (success === 'published') setToast('Article publié avec succès ✓')
    if (success === 'updated')   setToast('Article mis à jour ✓')
    if (success) {
      const t = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(t)
    }
  }, [])

  async function handleDelete(id) {
    try {
      await articlesService.delete(id)
      setToast('Article supprimé ✓')
      setConfirmId(null)
      setTimeout(() => setToast(null), 4000)
      refetch()
    } catch {
      setToast('Erreur lors de la suppression')
    }
  }

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      {confirmId && (
        <div className={styles.overlay}>
          <div className={styles.confirm}>
            <p className={styles.confirmText}>Supprimer cet article définitivement ?</p>
            <div className={styles.confirmActions}>
              <Button variant="secondary" onClick={() => setConfirmId(null)}>Annuler</Button>
              <Button onClick={() => handleDelete(confirmId)}>Supprimer</Button>
            </div>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administration</p>
          <h1 className={styles.title}>Articles</h1>
        </div>
        <Link to="/admin/articles/new">
          <Button>+ Nouvel article</Button>
        </Link>
      </header>

      <div className={styles.filters}>
        <select value={statusFilter} onChange={(e) => setStatus(e.target.value)} className={styles.filter}>
          <option value="">Tous les statuts</option>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
        <select value={catFilter} onChange={(e) => setCat(e.target.value)} className={styles.filter}>
          <option value="">Toutes les catégories</option>
          {CATEGORIES.filter(Boolean).map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {isLoading && <p className={styles.state}>Chargement…</p>}
      {error     && <p className={styles.state}>Erreur de chargement.</p>}
      {!isLoading && !error && articles.length === 0 && (
        <p className={styles.state}>Aucun article trouvé.</p>
      )}

      {!isLoading && !error && articles.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Titre</th>
                <th className={styles.th}>Catégorie</th>
                <th className={styles.th}>Statut</th>
                <th className={styles.th}>Vues</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className={styles.row}>
                  <td className={styles.titleCell}>
                    <Link to={`/admin/articles/${article.id}/edit`} className={styles.titleLink}>
                      {article.title}
                    </Link>
                  </td>
                  <td className={styles.td}>
                    {article.category ? (
                      <span className={styles.catBadge}>{article.category.name}</span>
                    ) : '—'}
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.status} ${styles[article.status.toLowerCase()]}`}>
                      {article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className={styles.tdViews}>
                    {article.views ?? 0}
                  </td>
                  <td className={styles.tdDate}>
                    {article.publishedAt ? formatDate(article.publishedAt) : '—'}
                  </td>
                  <td className={styles.tdActions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => setConfirmId(article.id)}
                      aria-label="Supprimer"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}