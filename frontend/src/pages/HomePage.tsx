import React, { useState, useEffect } from 'react'
import { movieService } from '../services/movieService'
import { MovieItem } from '../types/movie'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [items, setItems] = useState<MovieItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const loadItems = async () => {
    try {
      setLoading(true)
      const response = await movieService.getItems(selectedType, searchKeyword)
      setItems(response.items)
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [selectedType, searchKeyword])

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="site-title">影视库</h1>
        <div className="controls">
          <SearchBar onSearch={setSearchKeyword} />
          <TypeFilter 
            selectedType={selectedType} 
            onTypeChange={setSelectedType} 
          />
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">加载中...</div>
        ) : items.length === 0 ? (
          <div className="empty">没有找到相关影视内容</div>
        ) : (
          <div className="movie-grid">
            {items.map(item => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage