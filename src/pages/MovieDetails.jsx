import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie, posterUrl } from '../api/tmdb'
import FavoriteButton from '../components/FavoriteButton'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState({ id: null, movie: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    getMovie(id, controller.signal)
      .then((movie) => setResult({ id, movie, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ id, movie: null, error })
        }
      })

    return () => controller.abort()
  }, [id])

  if (result.id !== id) return <p className="status">جاري التحميل...</p>
  if (result.error) return <p className="status error">{result.error.message}</p>

  const { movie } = result
  const poster = posterUrl(movie.poster_path, 'w500')

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        → رجوع
      </button>
      <article className="movie-details">
        {poster ? (
          <img src={poster} alt={movie.title} />
        ) : (
          <div className="no-poster">بدون صورة</div>
        )}
        <div>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p className="meta">
            {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
            {movie.runtime > 0 && <span>{movie.runtime} دقيقة</span>}
            {movie.vote_average > 0 && <span>★ {movie.vote_average.toFixed(1)}</span>}
          </p>
          <ul className="genres">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{movie.overview || 'لا يوجد وصف لهذا الفيلم.'}</p>
          <FavoriteButton movie={movie} />
        </div>
      </article>
    </>
  )
}
