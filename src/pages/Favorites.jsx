import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <>
      <h2>المفضلة</h2>
      {favorites.length === 0 ? (
        <p className="status">
          لسا ما ضفت أي فيلم. <Link to="/">ابحث عن أفلام</Link>
        </p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </>
  )
}
