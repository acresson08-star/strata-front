import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Actus',      href: '/categorie/actus' },
  { label: 'Chroniques', href: '/categorie/chroniques' },
  { label: 'Interviews', href: '/categorie/interviews' },
  { label: 'Playlists',  href: '/categorie/playlists' },
  { label: 'Dossiers',   href: '/categorie/dossiers' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="STRATA — accueil">
          <span className={styles.logoText}>STRATA</span>
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/recherche" className={styles.iconBtn} aria-label="Rechercher">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </Link>
          <button
            className={`${styles.iconBtn} ${styles.burger}`}
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Navigation mobile">
          {NAV_LINKS.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/recherche" onClick={() => setMenuOpen(false)} className={styles.mobileLink}>
            Recherche
          </Link>
        </nav>
      )}
    </header>
  )
}