import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id/posts', categoryController.getPostsByCategory);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;