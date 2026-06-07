import { create } from 'zustand'

export const useEditorStore = create((set) => ({
  // Contenu de l'article en cours d'édition
  title: '',
  content: '',       // HTML généré par TipTap
  excerpt: '',
  coverImage: null,
  tags: [],
  category: '',
  status: 'draft',   // 'draft' | 'published'
  isDirty: false,    // true si des changements non sauvegardés

  setTitle:      (title)       => set({ title, isDirty: true }),
  setContent:    (content)     => set({ content, isDirty: true }),
  setExcerpt:    (excerpt)     => set({ excerpt, isDirty: true }),
  setCoverImage: (coverImage)  => set({ coverImage, isDirty: true }),
  setTags:       (tags)        => set({ tags, isDirty: true }),
  setCategory:   (category)    => set({ category, isDirty: true }),
  setStatus:     (status)      => set({ status }),

  // Charger un article existant dans l'éditeur
  loadArticle: (article) => set({ ...article, isDirty: false }),

  // Réinitialiser l'éditeur
  reset: () => set({
    title: '',
    content: '',
    excerpt: '',
    coverImage: null,
    tags: [],
    category: '',
    status: 'draft',
    isDirty: false,
  }),
}))
