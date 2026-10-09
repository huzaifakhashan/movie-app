import { useEffect, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'

const STORAGE_KEY = 'favorites'

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function isFavorite(id) {
    return favorites.some((movie) => movie.id === id)
  }

  function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      setFavorites(favorites.filter((item) => item.id !== movie.id))
    } else {
      // بنخزّن بس الحقول اللي بتحتاجها البطاقة
      const { id, title, poster_path, release_date, vote_average } = movie
      setFavorites([...favorites, { id, title, poster_path, release_date, vote_average }])
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
