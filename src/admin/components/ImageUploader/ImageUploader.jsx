import styles from './ImageUploader.module.css'

export default function ImageUploader({ onUpload }) {
  function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    // TODO: envoyer le fichier à ton API ou un service de stockage (S3, Cloudinary…)
    // puis appeler onUpload(url) avec l'URL retournée
  }

  return (
    <label className={styles.zone}>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.input}
      />
      <span className={styles.label}>Glisser une image ou cliquer</span>
    </label>
  )
}
