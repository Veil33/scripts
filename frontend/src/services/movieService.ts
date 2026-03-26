import axios from 'axios'
import { MovieItem, MovieListResponse } from '../types/movie'

const API_BASE_URL = '/api'

export const movieService = {
  async getItems(type?: string, keyword?: string): Promise<MovieListResponse> {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (keyword) params.append('keyword', keyword)
    
    const response = await axios.get(`${API_BASE_URL}/items?${params}`)
    return response.data
  },

  async getItemById(id: number): Promise<MovieItem> {
    const response = await axios.get(`${API_BASE_URL}/items/${id}`)
    return response.data
  }
}