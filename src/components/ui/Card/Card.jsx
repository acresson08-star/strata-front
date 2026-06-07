import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/formatDate'
import styles from './Card.module.css'

const CATEGORY_VARIANTS = {
  actus:      'accent',
  chroniques: 'default',
  interviews: 'accent',
  playlists:  'blue',
  dossiers:   'kaki',
}

/**
 * @param {'default'|'featured'|'hero'|'horizontal'} variant
 */
export default function Card({ article, variant = 'default' }) {
  if (!article) return null

  const { title, slug, excerpt, coverImage, category, author, publishedAt } = article
  const catVariant = category ? (CATEGORY_VARIANTS[category.slug] || 'default') : 'default'

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      {coverImage && (
        <Link to={`/article/${slug}`} className={styles.imageWrapper}>
          <img
            src={coverImage}
            alt={title}
            className={`${styles.image} img-strata`}
            loading="lazy"
          />
        </Link>
      )}

      <div className={styles.body}>
        {category && (
          <Link
            to={`/categorie/${category.slug}`}
            className={`${styles.category} ${styles[`category--${catVariant}`]}`}
          >
            {category.name}
          </Link>
        )}

        <Link to={`/article/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>

        {excerpt && variant !== 'default' && (
          <p className={styles.excerpt}>{excerpt}</p>
        )}

        {variant === 'default' && excerpt && (
          <p className={styles.excerptSmall}>{excerpt}</p>
        )}

        <footer className={styles.meta}>
          {publishedAt && (
            <time className={styles.date}>{formatDate(publishedAt)}</time>
          )}
        </footer>
      </div>
    </article>
  )
}
