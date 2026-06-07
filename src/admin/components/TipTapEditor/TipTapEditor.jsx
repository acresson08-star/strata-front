import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from './TipTapEditor.module.css'

// Barre d'outils de l'éditeur
function Toolbar({ editor }) {
  if (!editor) return null

  const tools = [
    { label: 'G',   title: 'Gras',        action: () => editor.chain().focus().toggleBold().run(),        isActive: editor.isActive('bold') },
    { label: 'I',   title: 'Italique',     action: () => editor.chain().focus().toggleItalic().run(),      isActive: editor.isActive('italic') },
    { label: 'H2',  title: 'Titre 2',      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { label: 'H3',  title: 'Titre 3',      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }) },
    { label: '❝',   title: 'Citation',     action: () => editor.chain().focus().toggleBlockquote().run(),  isActive: editor.isActive('blockquote') },
    { label: '≡',   title: 'Liste',        action: () => editor.chain().focus().toggleBulletList().run(),  isActive: editor.isActive('bulletList') },
    { label: '1.',  title: 'Liste numérotée', action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
    { label: '—',   title: 'Séparateur',   action: () => editor.chain().focus().setHorizontalRule().run(), isActive: false },
  ]

  return (
    <div className={styles.toolbar}>
      {tools.map(({ label, title, action, isActive }) => (
        <button
          key={title}
          type="button"
          title={title}
          onClick={action}
          className={`${styles.tool} ${isActive ? styles.toolActive : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function TipTapEditor({ content = '', onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  return (
    <div className={styles.wrapper}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  )
}
