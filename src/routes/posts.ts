import { Router } from 'express';
import * as postController from '../controllers/postController';
import auth from '../middlewares/auth';
import checkRole from '../middlewares/checkRole';
import validate from '../middlewares/validate';
import { createPostSchema } from '../validators/postValidator';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, validate(createPostSchema), postController.createPost);
router.patch('/:id', auth, postController.updatePost);
router.delete('/:id', auth, checkRole('admin'), postController.deletePost);

export default router;