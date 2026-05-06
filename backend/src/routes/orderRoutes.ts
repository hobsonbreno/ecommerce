import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Corpo vazio',
      message: 'O corpo da requisição não pode estar vazio.'
    });
  }

  const { customerName, productIds } = req.body;

  res.status(201).json({
    message: 'Pedido criado com sucesso!',
    receivedData: { customerName, productIds }
  });
});
router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  res.json({
    message: `Status do pedido ${id} atualizado para: ${status}`,
    orderId: id,
    newStatus: status
  });
});

router.delete('/:id', (_req: Request, res: Response) => {

  res.status(204).send();
});

export default router;
