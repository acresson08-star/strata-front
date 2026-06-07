import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const NAV_RUBRIQUES = [
  { label: 'Actus',      href: '/categorie/actus' },
  { label: 'Chroniques', href: '/categorie/chroniques' },
  { label: 'Interviews', href: '/categorie/interviews' },
  { label: 'Playlists',  href: '/categorie/playlists' },
  { label: 'Dossiers',   href: '/categorie/dossiers' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>STRATA</Link>
          <p className={styles.tagline}>Le goût de la musique,<br />l'esprit libre.</p>
          <div className={styles.socials}>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* X */}
            <a href="#" aria-label="X (Twitter)" className={styles.socialLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Spotify */}
            <a href="#" aria-label="Spotify" className={styles.socialLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navCol}>
            <p className={styles.navTitle}>Rubriques</p>
            {NAV_RUBRIQUES.map(({ label, href }) => (
              <Link key={href} to={href} className={styles.navLink}>{label}</Link>
            ))}
          </div>
          <div className={styles.navCol}>
            <p className={styles.navTitle}>À propos</p>
            <Link to="/a-propos" className={styles.navLink}>L'équipe</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
            <Link to="/mentions-legales" className={styles.navLink}>Mentions légales</Link>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>© {year} STRATA. Tous droits réservés.</p>
        <p className={styles.baseline}>Le goût de la musique, l'esprit libre.</p>
      </div>
    </footer>
  )
}
