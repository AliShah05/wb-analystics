import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

function getPriceHistogramData(products) {
  // Диапазоны цен (пример: 0-1000, 1000-2000, ...)
  const bins = [0, 1000, 2000, 3000, 5000, 10000, 20000];
  const data = bins.map((min, i) => {
    const max = bins[i + 1] || Infinity;
    const count = products.filter(p => p.price >= min && p.price < max).length;
    return { name: `${min} - ${max === Infinity ? '∞' : max}`, count };
  });
  return data;
}

function getDiscountVsRatingData(products) {
  return products.map(p => ({
    rating: p.rating,
    discount: p.price - p.sale_price
  }));
}

export default function Charts({ products }) {
  const histData = getPriceHistogramData(products);
  const lineData = getDiscountVsRatingData(products);

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 4, flexWrap: 'wrap' }}>
      <Paper sx={{ p: 2, flex: 1, minWidth: 350 }}>
        <Typography variant="h6">Гистограмма цен</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={histData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper sx={{ p: 2, flex: 1, minWidth: 350 }}>
        <Typography variant="h6">Скидка vs Рейтинг</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="discount" stroke="#d32f2f" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
} 