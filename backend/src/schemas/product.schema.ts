import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'O nome do produto deve ter no mínimo 3 caracteres' }),
    price: z.number().positive({ message: 'O preço deve ser um valor positivo' }),
    categoryId: z.string().uuid({ message: 'O categoryId deve ser um UUID válido' }),
  }),
});

export const productParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'O ID do produto deve ser um UUID válido' }),
  }),
});

export const productQuerySchema = z.object({
  query: z.object({
    category: z.string().uuid().optional(),
  }),
});
