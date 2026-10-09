const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p'

async function request(path, params, signal) {
  if (!API_KEY) {
    throw new Error('مفتاح TMDB غير موجود. ضيفه بملف .env باسم VITE_TMDB_KEY وأعد تشغيل السيرفر.')
  }

  const query = new URLSearchParams({ api_key: API_KEY, language: 'ar', ...params })
  const response = await fetch(`${BASE_URL}${path}?${query}`, { signal })

  if (!response.ok) {
    throw new Error(`فشل الطلب من TMDB (${response.status})`)
  }
  return response.json()
}

export async function searchMovies(query, signal) {
  const data = await request('/search/movie', { query }, signal)
  return data.results
}

export async function getPopularMovies(signal) {
  const data = await request('/movie/popular', {}, signal)
  return data.results
}

export function getMovie(id, signal) {
  return request(`/movie/${id}`, {}, signal)
}

export function posterUrl(path, size = 'w342') {
  return path ? `${IMAGE_URL}/${size}${path}` : null
}
