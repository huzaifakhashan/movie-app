import MovieCard from './MovieCard'

export default function MovieGrid({ movies }) {
  return (
    <ul className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}
