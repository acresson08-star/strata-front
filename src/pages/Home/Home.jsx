import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Card from '../../components/ui/Card/Card'
import { useArticles } from '../../hooks/useArticles'
import styles from './Home.module.css'

const CAT_BG = {
  actus:      '#E4572E',
  chroniques: '#6D7D8B',
  interviews: '#8B6F5E',
  playlists:  '#A3A66A',
  dossiers:   '#E8E4DC',
}

const CAT_TEXT = {
  actus:      '#ffffff',
  chroniques: '#ffffff',
  interviews: '#ffffff',
  playlists:  '#111111',
  dossiers:   '#111111',
}

function sortNoConsecutiveColors(articles) {
  const result = []
  const remaining = [...articles]

  while (remaining.length > 0) {
    const lastSlug = result[result.length - 1]?.category?.slug
    const idx = remaining.findIndex(a => a.category?.slug !== lastSlug)
    if (idx === -1) {
      result.push(...remaining.splice(0))
    } else {
      result.push(remaining.splice(idx, 1)[0])
    }
  }
  return result
}

function CarouselCard({ article }) {
  const bg   = CAT_BG[article.category?.slug]   || '#6D7D8B'
  const text = CAT_TEXT[article.category?.slug] || '#ffffff'

  return (
    <Link to={`/article/${article.slug}`} className={styles.carouselCard} style={{ background: bg, color: text }}>
      {article.coverImage && (
        <div className={styles.carouselImg}>
          <img src={article.coverImage} alt={article.title} className={`${styles.carouselPhoto} img-strata`} />
        </div>
      )}
      <div className={styles.carouselBody}>
        {article.category && (
          <span className={styles.carouselCat} style={{ color: text, opacity: 0.7 }}>
            {article.category.name}
          </span>
        )}
        <p className={styles.carouselTitle}>{article.title}</p>
        {article.excerpt && (
          <p className={styles.carouselExcerpt}>{article.excerpt}</p>
        )}
        <span className={styles.carouselLink} style={{ color: text }}>
          Lire →
        </span>
      </div>
    </Link>
  )
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0)
  const carouselRef = useRef(null)

  const { articles: alaune,    isLoading: loadingAlaune }    = useArticles({ status: 'published', limit: 4 })
  const { articles: caroussel, isLoading: loadingCaroussel } = useArticles({ status: 'published', limit: 8 })

  const hero   = alaune[heroIndex] || null
  const sorted = sortNoConsecutiveColors(caroussel)

  function scrollCarousel(dir) {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main className={styles.main}>

        {/* ── HERO ── */}
        <section className={styles.heroSection}>
          {loadingAlaune || !hero ? (
            <div className={styles.heroPlaceholder}>Chargement…</div>
          ) : (
            <div className={styles.heroInner}>
              <div className={styles.heroImage}>
                <img src={hero.coverImage} alt={hero.title} className={styles.heroImg} />
              </div>
              <div className={styles.heroContent}>
                {hero.category && (
                  <Link
                    to={`/categorie/${hero.category.slug}`}
                    className={`${styles.heroCategory} ${styles[`cat${hero.category.slug.charAt(0).toUpperCase() + hero.category.slug.slice(1)}`] || styles.catAccent}`}
                  >
                    {hero.category.name}
                  </Link>
                )}
                <h1 className={styles.heroTitle}>{hero.title}</h1>
                {hero.excerpt && <p className={styles.heroExcerpt}>{hero.excerpt}</p>}
                <Link to={`/article/${hero.slug}`} className={styles.heroLink}>
                  Lire l'article →
                </Link>
                <div className={styles.heroPagination}>
                  {alaune.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIndex(i)}
                      className={`${styles.heroDot} ${i === heroIndex ? styles.heroDotActive : ''}`}
                      aria-label={`Slide ${i + 1}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── À LA UNE ── */}
        <section className={styles.alaune}>
          <div className="container">
            <p className={`section-label ${styles.sectionLabel}`}>À la une</p>
            {loadingAlaune ? (
              <p>Chargement…</p>
            ) : (
              <div className={styles.alauneGrid}>
                {alaune.map((article) => (
                  <div key={article.id} className={styles.alauneItem}>
                    <Card article={article} variant="default" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CARROUSEL ── */}
        <section className={styles.carousel}>
          <div className="container">
            <div className={styles.carouselHeader}>
              <p className={`section-label ${styles.sectionLabel}`}>À explorer</p>
              <div className={styles.carouselNav}>
                <button onClick={() => scrollCarousel(-1)} className={styles.carouselBtn} aria-label="Précédent">←</button>
                <button onClick={() => scrollCarousel(1)}  className={styles.carouselBtn} aria-label="Suivant">→</button>
              </div>
            </div>
          </div>
          {loadingCaroussel ? null : (
            <div className={styles.carouselTrack} ref={carouselRef}>
              {sorted.map((article) => (
                <CarouselCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  )
}