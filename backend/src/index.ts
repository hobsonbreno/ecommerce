import express from 'express';
import { logger } from './middlewares/logger.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend E-commerce rodando com Express e TypeScript!');
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em: http://localhost:${PORT}`);
});
