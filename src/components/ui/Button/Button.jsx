import styles from './Button.module.css'

/**
 * @param {'primary'|'secondary'|'ghost'|'arrow'} variant
 */
export default function Button({ children, variant = 'primary', onClick, type = 'button', ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
      {variant === 'arrow' && (
        <span className={styles.arrow}>→</span>
      )}
    </button>
  )
}
