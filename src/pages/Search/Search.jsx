import { useState } from 'react'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Card from '../../components/ui/Card/Card'
import { articlesService } from '../../services/articles.service'
import styles from './Search.module.css'

export default function Search() {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setIsLoading(true)
    setHasSearched(true)
    try {
      const data = await articlesService.search(query)
      setResults(data)
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Recherche</h1>

          <div className={styles.searchBar}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Rechercher un article…"
              className={styles.input}
              autoFocus
            />
            <button onClick={handleSearch} className={styles.btn}>
              Chercher
            </button>
          </div>

          {isLoading && <p className={styles.state}>Recherche en cours…</p>}
          {!isLoading && hasSearched && results.length === 0 && (
            <p className={styles.state}>Aucun résultat pour « {query} ».</p>
          )}
          {!isLoading && results.length > 0 && (
            <div className="grid-articles">
              {results.map((article) => (
                <Card key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
