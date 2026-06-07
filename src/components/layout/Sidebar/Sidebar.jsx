import styles from './Sidebar.module.css'

export default function Sidebar({ children }) {
  return (
    <aside className={styles.sidebar}>
      {children}
    </aside>
  )
}
