import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPopularMovies, searchMovies } from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import { useDebounce } from '../hooks/useDebounce'

export default function Home() {
  // كلمة البحث محفوظة بالرابط (?q=...) لتضل موجودة بعد الرجوع أو إعادة التحميل
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const debouncedQuery = useDebounce(query.trim())

  const [result, setResult] = useState({ query: null, movies: [], error: null })

  useEffect(() => {
    const controller = new AbortController()
    const request = debouncedQuery
      ? searchMovies(debouncedQuery, controller.signal)
      : getPopularMovies(controller.signal)

    request
      .then((movies) => setResult({ query: debouncedQuery, movies, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ query: debouncedQuery, movies: [], error })
        }
      })

    // إلغاء الطلب القديم لما تتغير كلمة البحث
    return () => controller.abort()
  }, [debouncedQuery])

  // النتيجة المخزّنة لسا تبع بحث قديم = الطلب الجديد لسا ما خلص
  const loading = result.query !== debouncedQuery

  function handleChange(e) {
    const value = e.target.value
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  return (
    <>
      <input
        className="search-input"
        type="search"
        placeholder="ابحث عن فيلم..."
        value={query}
        onChange={handleChange}
      />
      <h2>{debouncedQuery ? `نتائج البحث عن "${debouncedQuery}"` : 'الأفلام الرائجة'}</h2>

      {loading ? (
        <p className="status">جاري التحميل...</p>
      ) : result.error ? (
        <p className="status error">{result.error.message}</p>
      ) : result.movies.length === 0 ? (
        <p className="status">ما في نتائج.</p>
      ) : (
        <MovieGrid movies={result.movies} />
      )}
    </>
  )
}
