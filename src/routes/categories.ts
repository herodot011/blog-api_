import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id/posts', categoryController.getPostsByCategory);
export default router;