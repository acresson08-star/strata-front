import { useParams } from 'react-router-dom'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import { formatDate } from '../../utils/formatDate'
import styles from './Article.module.css'
import { useEffect, useState } from 'react'
import { useArticle, useArticles, useIncrementViews } from '../../hooks/useArticles'

function SimilarArticles({ categorySlug, currentId }) {
  const { articles, isLoading } = useArticles({ category: categorySlug, status: 'published' })
  const filtered = articles.filter((a) => a.id !== currentId).slice(0, 3)

  if (isLoading || filtered.length === 0) return null

  return (
    <div className={styles.similar}>
      <p className={styles.similarTitle}>Dans la même catégorie</p>
      <ul className={styles.similarList}>
        {filtered.map((a) => (
          <li key={a.id} className={styles.similarItem}>
            <a href={`/article/${a.slug}`} className={styles.similarLink}>
              {a.coverImage && (
                <img src={a.coverImage} alt={a.title} className={styles.similarImg} />
              )}
              <span className={styles.similarName}>{a.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
  let ticking = false

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const el = document.documentElement
        const scrolled = el.scrollTop
        const total = el.scrollHeight - el.clientHeight
        setProgress(total > 0 ? (scrolled / total) * 100 : 0)
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
    </div>
  )
}

function estimateReadingTime(content) {
  const text = content.replace(/<[^>]+>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function Article() {
  const { slug } = useParams()
  const { article, isLoading, error } = useArticle(slug)
  useIncrementViews(article?.id)

  if (isLoading) return <><Header /><p className={styles.state}>Chargement…</p><Footer /></>
  if (error || !article) return <><Header /><p className={styles.state}>Article introuvable.</p><Footer /></>

  return (
    <>
      <Header />
      <ReadingProgress />
      <main className={styles.main}>
        <div className="container">
          <div className="layout-article">

            <article className={styles.article}>
              <header className={styles.header}>
                {article.category && (
                  <span className={styles.category}>{article.category.name}</span>
                )}
                <h1 className={styles.title}>{article.title}</h1>
                {article.excerpt && (
                  <p className={styles.excerpt}>{article.excerpt}</p>
                )}
                <div className={styles.meta}>
                  {article.author && <span>{article.author.name}</span>}
                  {article.publishedAt && <time>{formatDate(article.publishedAt)}</time>}
                    <span>{estimateReadingTime(article.content)} min de lecture</span>
                </div>
              </header>

              {article.coverImage && (
                <figure className={styles.cover}>
                  <img src={article.coverImage} alt={article.title} />
                </figure>
              )}

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            <aside className={styles.sidebar}>
              {article.category && (
                <SimilarArticles categorySlug={article.category.slug} currentId={article.id} />
              )}
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}