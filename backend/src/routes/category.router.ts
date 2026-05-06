import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { validateData } from '../middlewares/validateData.js';
import {
  createCategorySchema,
  categoryParamsSchema,
  categoryQueryPaginationSchema,
} from '../schemas/category.schema.js';

const router = Router();

router.get('/', validateData(categoryQueryPaginationSchema), CategoryController.getAll);
router.get('/:id', validateData(categoryParamsSchema), CategoryController.getById);
router.post('/', validateData(createCategorySchema), CategoryController.create);
router.put('/:id', validateData(categoryParamsSchema), CategoryController.update);
router.delete('/:id', validateData(categoryParamsSchema), CategoryController.delete);

export default router;
