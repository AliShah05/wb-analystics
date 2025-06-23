import React, { useState } from 'react';
import ProductTable from './components/ProductTable';
import Charts from './components/Charts';
import { Container, Typography } from '@mui/material';

function App() {
  const [products, setProducts] = useState([]);

  // Прокидываем setProducts в таблицу для обновления данных и передачи их в графики
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>WB Analytics</Typography>
      <ProductTable setProducts={setProducts} />
      <Charts products={products} />
    </Container>
  );
}

export default App;
