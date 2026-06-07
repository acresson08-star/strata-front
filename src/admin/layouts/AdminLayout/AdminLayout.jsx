import { NavLink, Link } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import styles from './AdminLayout.module.css'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    label: 'Articles',
    href: '/admin/articles',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h10"/>
      </svg>
    ),
  },
  {
    label: 'Médias',
    href: '/admin/medias',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
    ),
  },
]

export default function AdminLayout({ children }) {
  const { user, logout } = useAuthStore()

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link to="/" className={styles.logo}>STRATA</Link>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/admin'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          {user && <span className={styles.userEmail}>{user.email}</span>}
          <button onClick={logout} className={styles.logoutBtn}>
            Déconnexion
          </button>
          <Link to="/" className={styles.viewSite}>← Voir le site</Link>
        </div>
      </aside>

      {/* Contenu */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
