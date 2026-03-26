import React from 'react'
import { Link } from 'react-router-dom'
import { MovieItem } from '../types/movie'
import './MovieCard.css'

interface MovieCardProps {
  item: MovieItem
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className="movie-card">
      <div className="movie-poster">
        <img 
          src={item.poster} 
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop'
          }}
        />
        <div className="movie-type">{getTypeLabel(item.type)}</div>
        {item.rating && (
          <div className="movie-rating">{item.rating.toFixed(1)}</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{item.title}</h3>
        <p className="movie-year">{item.year}</p>
        <p className="movie-genres">{item.genres}</p>
        <p className="movie-summary">{truncateText(item.summary, 50)}</p>
      </div>
    </Link>
  )
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'movie': return '电影'
    case 'tv': return '电视剧'
    case 'anime': return '动漫'
    default: return type
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export default MovieCard