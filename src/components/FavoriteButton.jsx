import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.id)

  return (
    <button
      className={active ? 'favorite-button active' : 'favorite-button'}
      onClick={() => toggleFavorite(movie)}
    >
      {active ? '♥ إزالة من المفضلة' : '♡ إضافة للمفضلة'}
    </button>
  )
}
