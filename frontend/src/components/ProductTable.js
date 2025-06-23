import React, { useState, useEffect } from 'react';
import { fetchProducts, parseProducts } from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField, Slider, Button, Box } from '@mui/material';

const columns = [
  { id: 'name', label: 'Название товара' },
  { id: 'price', label: 'Цена' },
  { id: 'sale_price', label: 'Цена со скидкой' },
  { id: 'rating', label: 'Рейтинг' },
  { id: 'reviews', label: 'Количество отзывов' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function ProductTable({ setProducts }) {
  const [products, setProductsState] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', minRating: '', minReviews: '' });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    const params = {
      "query": query,
      "page": 1,
      "limit": 50,
      "resultset": "catalog",
      "dest": "-1257786",
      "spp": "0",
      "sort": "popular"
    };
    const data = await fetchProducts(params);
    setProductsState(data);
    setProducts(data);
    setLoading(false);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleParse = async () => {
    if (!query) return;
    setLoading(true);
    await parseProducts(query);
    await loadProducts();
    setLoading(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Поиск на Wildberries" value={query} onChange={e => setQuery(e.target.value)} />
        <Button variant="contained" onClick={handleParse} disabled={loading}>Парсить</Button>
        <TextField label="Мин. цена" type="number" value={filters.minPrice} onChange={e => handleFilterChange('minPrice', e.target.value)} />
        <TextField label="Макс. цена" type="number" value={filters.maxPrice} onChange={e => handleFilterChange('maxPrice', e.target.value)} />
        <TextField label="Мин. рейтинг" type="number" value={filters.minRating} onChange={e => handleFilterChange('minRating', e.target.value)} />
        <TextField label="Мин. отзывов" type="number" value={filters.minReviews} onChange={e => handleFilterChange('minReviews', e.target.value)} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.sort(getComparator(order, orderBy)).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.sale_price}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.reviews}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 