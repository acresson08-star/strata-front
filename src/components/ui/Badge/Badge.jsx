import styles from './Badge.module.css'

/**
 * @param {'default'|'accent'|'blue'|'kaki'|'dark'} variant
 */
export default function Badge({ children, variant = 'default' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  )
}
