import React from 'react'
import './TypeFilter.css'

interface TypeFilterProps {
  selectedType: string
  onTypeChange: (type: string) => void
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeChange }) => {
  const types = [
    { value: '', label: '全部' },
    { value: 'movie', label: '电影' },
    { value: 'tv', label: '电视剧' },
    { value: 'anime', label: '动漫' }
  ]

  return (
    <div className="type-filter">
      {types.map(type => (
        <button
          key={type.value}
          className={`filter-button ${selectedType === type.value ? 'active' : ''}`}
          onClick={() => onTypeChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter