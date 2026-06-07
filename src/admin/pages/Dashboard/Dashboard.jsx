import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { articlesService } from '../../../services/articles.service'
import { formatDate } from '../../../utils/formatDate'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [stats, setStats]       = useState(null)
  const [recents, setRecents]   = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/articles/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(r => r.json()),
      articlesService.getAll({ limit: 5 }),
    ])
      .then(([statsData, articles]) => {
        setStats(statsData)
        setRecents(articles)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administration</p>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <Link to="/admin/articles/new" className={styles.newBtn}>
          + Nouvel article
        </Link>
      </header>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{isLoading ? '—' : stats?.published ?? '—'}</span>
          <span className={styles.statLabel}>Articles publiés</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{isLoading ? '—' : stats?.drafts ?? '—'}</span>
          <span className={styles.statLabel}>Brouillons</span>
          {!isLoading && stats?.drafts > 0 && (
            <span className={styles.statDelta}>{stats.drafts} en attente</span>
          )}
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{isLoading ? '—' : stats?.totalViews ?? '—'}</span>
          <span className={styles.statLabel}>Vues totales</span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Derniers articles</h2>
          <Link to="/admin/articles" className={styles.sectionLink}>Voir tout →</Link>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Titre</th>
              <th className={styles.th}>Rubrique</th>
              <th className={styles.th}>Statut</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {recents.map((art) => (
              <tr key={art.id} className={styles.tr}>
                <td className={styles.tdTitle}>{art.title}</td>
                <td className={styles.td}>
                  <span className={styles.catBadge}>{art.category?.name || '—'}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${art.status === 'PUBLISHED' ? styles.statusPublished : styles.statusDraft}`}>
                    {art.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className={styles.tdMuted}>
                  {art.publishedAt ? formatDate(art.publishedAt) : '—'}
                </td>
                <td className={styles.tdAction}>
                  <Link to={`/admin/articles/${art.id}/edit`} className={styles.editLink}>
                    Éditer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}