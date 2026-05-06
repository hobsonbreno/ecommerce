import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validateData = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
};
