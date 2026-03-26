import React, { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (keyword: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(keyword)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="搜索影视标题..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        搜索
      </button>
    </form>
  )
}

export default SearchBar