import TipTapEditor from '../../components/TipTapEditor/TipTapEditor'
import TagManager from '../../components/TagManager/TagManager'
import Button from '../../../components/ui/Button/Button'
import { useArticleEditor } from './ArticleEditor.hooks'
import styles from './ArticleEditor.module.css'

export default function ArticleEditor() {
  const {
    isEditing,
    title, content, excerpt, coverImage, tags, category, status, isDirty,
    setTitle, setContent, setExcerpt, setCoverImage, setTags, setCategory, setStatus,
    handleSave,
  } = useArticleEditor()

  return (
    <div className={styles.page}>
      <header className={styles.toolbar}>
        <h1 className={styles.pageTitle}>
          {isEditing ? "Modifier l'article" : 'Nouvel article'}
        </h1>
        <div className={styles.toolbarActions}>
          {isDirty && <span className={styles.dirty}>Modifications non sauvegardées</span>}
          <Button variant="secondary" onClick={() => handleSave('draft')}>
            Sauvegarder
          </Button>
          <Button onClick={() => handleSave('published')}>
            {status === 'published' ? 'Mettre à jour' : 'Publier'}
          </Button>
        </div>
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            className={styles.titleInput}
          />
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Résumé / chapeau (optionnel)"
            className={styles.excerptInput}
            rows={2}
          />
          <TipTapEditor content={content} onChange={setContent} />
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Image de couverture</h3>
            <input
              type="text"
              value={coverImage || ''}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="URL de l'image"
              className={styles.input}
            />
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Catégorie</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="">— Choisir —</option>
              <option value="actus">Actus</option>
              <option value="chroniques">Chroniques</option>
              <option value="interviews">Interviews</option>
              <option value="playlists">Playlists</option>
              <option value="dossiers">Dossiers</option>
            </select>
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Tags</h3>
            <TagManager tags={tags} onChange={setTags} />
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Statut</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
        </aside>
      </div>
    </div>
  )
}