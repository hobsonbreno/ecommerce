import express from 'express';
import { logger } from './middlewares/logger.js';
import productRouter from './routes/product.router.js';
import categoryRouter from './routes/category.router.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend E-commerce rodando com Express e TypeScript!');
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em: http://localhost:${PORT}`);
});
