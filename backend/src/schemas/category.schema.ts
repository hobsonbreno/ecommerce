import { z } from 'zod';

export const categoryQueryPaginationSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    size: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  }),
});

export const categoryParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'O ID deve ser um UUID válido' }),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  }),
});
