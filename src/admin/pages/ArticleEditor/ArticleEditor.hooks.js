import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditorStore } from '../../../store/editorStore'
import { articlesService } from '../../../services/articles.service'

export function useArticleEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const {
    title, content, excerpt, coverImage, tags, category, status, isDirty,
    setTitle, setContent, setExcerpt, setCoverImage, setTags, setCategory, setStatus,
    loadArticle, reset,
  } = useEditorStore()

  useEffect(() => {
    if (isEditing) {
      articlesService.getById(id).then(loadArticle).catch(console.error)
    }
    return () => reset()
  }, [id])

  async function handleSave(saveStatus = 'draft') {
  const payload = {
    title,
    content,
    excerpt,
    coverImage,
    tags,
    category,
    status: saveStatus,
  }

  try {
    if (isEditing) {
      await articlesService.update(id, payload)
      if (saveStatus === 'published') {
        navigate('/admin/articles?success=updated')
      }
    } else {
      const created = await articlesService.create(payload)
      if (saveStatus === 'published') {
        navigate('/admin/articles?success=published')
      } else {
        navigate(`/admin/articles/${created.id}/edit`)
      }
    }
  } catch (err) {
    console.error('Erreur de sauvegarde :', err)
  }
}

  return {
    isEditing,
    title, content, excerpt, coverImage, tags, category, status, isDirty,
    setTitle, setContent, setExcerpt, setCoverImage, setTags, setCategory, setStatus,
    handleSave,
  }
}