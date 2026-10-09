import { NavLink, Route, Routes } from 'react-router-dom'
import { useFavorites } from './context/FavoritesContext'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'

function App() {
  const { favorites } = useFavorites()

  return (
    <div className="app">
      <nav className="navbar">
        <span className="logo">🎬 أفلامي</span>
        <NavLink to="/">الرئيسية</NavLink>
        <NavLink to="/favorites">المفضلة ({favorites.length})</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<p className="status">الصفحة غير موجودة.</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
