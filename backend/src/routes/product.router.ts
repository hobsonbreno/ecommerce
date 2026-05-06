import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validateData } from '../middlewares/validateData.js';
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
} from '../schemas/product.schema.js';

const router = Router();

router.post('/', validateData(createProductSchema), ProductController.create);
router.get('/', validateData(productQuerySchema), ProductController.getAll);
router.delete('/:id', validateData(productParamsSchema), ProductController.delete);

export default router;
