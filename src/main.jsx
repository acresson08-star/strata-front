import { createRoot } from 'react-dom/client'
import './assets/styles/base.css'
import './assets/styles/layout.css'
import AppRouter from './router/AppRouter'
import { useAuthStore } from './store/authStore'

const init = useAuthStore.getState().init

init().finally(() => {
  createRoot(document.getElementById('root')).render(
    <AppRouter />
  )
})