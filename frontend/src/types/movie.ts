export interface MovieItem {
  id: number
  title: string
  type: 'movie' | 'tv' | 'anime'
  poster: string
  year: number
  genres: string
  summary: string
  rating?: number
  source: string
  source_id: string
  updated_at: string
}

export interface MovieListResponse {
  items: MovieItem[]
  total: number
}