import { useState } from 'react'
import styles from './TagManager.module.css'

export default function TagManager({ tags = [], onChange }) {
  const [input, setInput] = useState('')

  function addTag() {
    const tag = input.trim().toLowerCase()
    if (!tag || tags.includes(tag)) return
    onChange([...tags, tag])
    setInput('')
  }

  function removeTag(tag) {
    onChange(tags.filter((t) => t !== tag))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={styles.remove}
              aria-label={`Retirer ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? 'Ajouter des tags…' : ''}
          className={styles.input}
        />
      </div>
      <p className={styles.hint}>Entrée ou virgule pour valider</p>
    </div>
  )
}
