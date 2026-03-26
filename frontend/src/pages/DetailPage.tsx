import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { movieService } from '../services/movieService'
import { MovieItem } from '../types/movie'
import './DetailPage.css'

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<MovieItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await movieService.getItemById(parseInt(id))
        setItem(data)
      } catch (error) {
        console.error('加载详情失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadItem()
  }, [id])

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!item) {
    return <div className="error">未找到该影视内容</div>
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <Link to="/" className="back-button">
          ← 返回列表
        </Link>
      </header>

      <div className="detail-content">
        <div className="detail-poster">
          <img 
            src={item.poster} 
            alt={item.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop'
            }}
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{item.title}</h1>
          
          <div className="detail-meta">
            <span className="detail-type">{getTypeLabel(item.type)}</span>
            <span className="detail-year">{item.year}</span>
            {item.rating && (
              <span className="detail-rating">评分: {item.rating.toFixed(1)}</span>
            )}
          </div>

          <div className="detail-genres">
            <strong>类型:</strong> {item.genres}
          </div>

          <div className="detail-summary">
            <strong>简介:</strong>
            <p>{item.summary}</p>
          </div>

          <div className="detail-footer">
            <small>更新时间: {new Date(item.updated_at).toLocaleString()}</small>
          </div>
        </div>
      </div>
    </div>
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

export default DetailPage