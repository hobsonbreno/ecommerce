import type { Request, Response } from 'express';

export class ProductController {
  static create(req: Request, res: Response) {
    const { name, price, categoryId } = req.body;
    res.status(201).json({
      message: 'Produto criado com sucesso',
      product: { name, price, categoryId }
    });
  }

  static getAll(req: Request, res: Response) {
    const { category } = req.query;
    if (category) {
      return res.json({
        message: `Listando produtos da categoria ${category}`,
        filter: { category }
      });
    }
    res.json({ message: 'Listando todos os produtos' });
  }

  static delete(req: Request, res: Response) {
    res.status(204).send();
  }
}
