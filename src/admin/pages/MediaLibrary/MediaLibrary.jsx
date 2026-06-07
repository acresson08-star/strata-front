import styles from './MediaLibrary.module.css'

export default function MediaLibrary() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Médiathèque</h1>
        <button className={styles.uploadBtn}>
          + Ajouter des médias
        </button>
      </header>

      {/* TODO: grille de médias + uploader */}
      <div className={styles.empty}>
        <p>Aucun média pour l'instant.</p>
      </div>
    </div>
  )
}
