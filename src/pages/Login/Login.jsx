import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await login({ email, password })
      navigate('/admin')
    } catch {
      setError('Identifiants invalides')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.logo}>STRATA</h1>
        <p className={styles.sub}>Espace administration</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@strata.media"
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={styles.btn}
          >
            {isLoading ? 'Connexion…' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  )
}