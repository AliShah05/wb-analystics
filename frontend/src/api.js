import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchProducts = async (filters) => {
  const params = {};
  if (filters.minPrice) params.min_price = filters.minPrice;
  if (filters.maxPrice) params.max_price = filters.maxPrice;
  if (filters.minRating) params.min_rating = filters.minRating;
  if (filters.minReviews) params.min_reviews = filters.minReviews;
  const res = await axios.get(`${API_URL}/products/`, { params });
  return res.data;
};

export const parseProducts = async (query) => {
  const res = await axios.post(`${API_URL}/parse/`, null, { params: { query } });
  return res.data;
}; 