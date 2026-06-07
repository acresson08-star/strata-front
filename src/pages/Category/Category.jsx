import { useParams, Link } from 'react-router-dom'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Card from '../../components/ui/Card/Card'
import { useArticles } from '../../hooks/useArticles'
import styles from './Category.module.css'

const CAT_LABELS = {
  actus:      'Actualités',
  chroniques: 'Chroniques',
  interviews: 'Interviews',
  playlists:  'Playlists',
  dossiers:   'Dossiers',
}

const CATEGORIES = Object.keys(CAT_LABELS)

export default function Category() {
  const { slug } = useParams()
  const { articles, isLoading, error } = useArticles({ category: slug, status: 'published' })
  const heading = CAT_LABELS[slug] || slug

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">


          <header className={styles.header}>
            <p className={styles.label}>Rubrique</p>
            <h1 className={styles.heading}>{heading}</h1>
          </header>

          {isLoading && <p className={styles.state}>Chargement…</p>}
          {error     && <p className={styles.state}>Erreur de chargement.</p>}

          {!isLoading && !error && articles.length === 0 && (
            <p className={styles.state}>Aucun article dans cette rubrique.</p>
          )}

          {!isLoading && !error && articles.length > 0 && (
            <div className="grid-articles">
              {articles.map((article) => (
                <Card key={article.id} article={article} variant="default" />
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}