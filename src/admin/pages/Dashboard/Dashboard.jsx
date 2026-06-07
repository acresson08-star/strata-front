import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'

const STATS = [
  { value: '24', label: 'Articles publiés', delta: '+3 ce mois' },
  { value: '6',  label: 'Brouillons',       delta: '2 en attente' },
  { value: '—',  label: 'Vues ce mois',     delta: 'API non connectée' },
]

const RECENT_ARTICLES = [
  { id: 1, title: 'MJ Lenderman, le spleen et la guitare',    category: 'Interview', status: 'Publié',    date: '23 mai 2026' },
  { id: 2, title: 'Le retour surprise de The National',       category: 'Actus',     status: 'Publié',    date: '20 mai 2026' },
  { id: 3, title: 'La country aujourd\'hui',                  category: 'Dossier',   status: 'Brouillon', date: '18 mai 2026' },
  { id: 4, title: 'Explorer : 10 titres à découvrir',         category: 'Playlist',  status: 'Publié',    date: '15 mai 2026' },
  { id: 5, title: 'Sharon Van Etten — J\'écris pour comprendre', category: 'Interview', status: 'Brouillon', date: '12 mai 2026' },
]

export default function Dashboard() {
  return (
    <div className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administration</p>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <Link to="/admin/articles/new" className={styles.newBtn}>
          + Nouvel article
        </Link>
      </header>

      {/* Stats */}
      <div className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statDelta}>{s.delta}</span>
          </div>
        ))}
      </div>

      {/* Derniers articles */}
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
            {RECENT_ARTICLES.map((art) => (
              <tr key={art.id} className={styles.tr}>
                <td className={styles.tdTitle}>{art.title}</td>
                <td className={styles.td}>
                  <span className={styles.catBadge}>{art.category}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.status} ${art.status === 'Publié' ? styles.statusPublished : styles.statusDraft}`}>
                    {art.status}
                  </span>
                </td>
                <td className={styles.tdMuted}>{art.date}</td>
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
