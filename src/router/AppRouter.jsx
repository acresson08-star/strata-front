import { BrowserRouter, Routes, Route } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import adminRoutes from './adminRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Routes admin (protégées) */}
        {adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
