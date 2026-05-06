import type { Request, Response } from 'express';

export class CategoryController {
  static getAll(req: Request, res: Response) {
    const { page, size } = req.query;
    res.json({
      message: 'Listando categorias com paginação',
      pagination: { page, size }
    });
  }

  static getById(req: Request, res: Response) {
    const { id } = req.params;
    res.json({
      message: `Consultando categoria ${id}`,
      id
    });
  }

  static create(req: Request, res: Response) {
    const { name } = req.body;
    res.status(201).json({
      message: 'Categoria criada com sucesso',
      category: { name }
    });
  }

  static update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    res.json({
      message: `Categoria ${id} atualizada`,
      data: { name }
    });
  }

  static delete(req: Request, res: Response) {
    res.status(204).send();
  }
}
