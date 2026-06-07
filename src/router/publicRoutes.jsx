import Home from '../pages/Home/Home'
import Article from '../pages/Article/Article'
import Category from '../pages/Category/Category'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'

const publicRoutes = [
  { path: '/',                   element: <Home /> },
  { path: '/article/:slug',      element: <Article /> },
  { path: '/categorie/:slug',    element: <Category /> },
  { path: '/recherche',          element: <Search /> },
  { path: '/login', element: <Login /> },
]

export default publicRoutes
