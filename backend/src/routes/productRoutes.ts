import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;

  if (category) {
    return res.json({
      message: `Listando produtos da categoria: ${category}`,
      category
    });
  }

  res.json({
    message: 'Listando todos os produtos'
  });
});
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id as string);

  if (idNumber < 0) {
    return res.status(400).json({
      error: 'ID inválido',
      message: 'O ID do produto não pode ser um número negativo.'
    });
  }

  res.json({
    message: `Visualizando detalhes do produto ${id}`,
    productId: id
  });
});

export default router;
