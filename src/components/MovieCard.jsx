import { Link } from 'react-router-dom'
import { posterUrl } from '../api/tmdb'
import FavoriteButton from './FavoriteButton'

export default function MovieCard({ movie }) {
  const poster = posterUrl(movie.poster_path)
  const year = movie.release_date?.slice(0, 4)

  return (
    <li className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        {poster ? (
          <img src={poster} alt={movie.title} loading="lazy" />
        ) : (
          <div className="no-poster">بدون صورة</div>
        )}
        <h3>{movie.title}</h3>
      </Link>
      <p className="meta">
        {year && <span>{year}</span>}
        {movie.vote_average > 0 && <span>★ {movie.vote_average.toFixed(1)}</span>}
      </p>
      <FavoriteButton movie={movie} />
    </li>
  )
}
