import express from 'express';
import * as commentController from '../controllers/commentController';
import protect from '../middleware/auth';

const commentRouter = express.Router();

commentRouter.post('/:blogId', protect, commentController.createComment);
commentRouter.get('/', protect, commentController.findAllComments);
commentRouter.delete('/:blogId/comments/:commentId', protect, commentController.deleteComment);

commentRouter.patch('/:blogId/comments/:commentId', protect, commentController.updateComment);

export default commentRouter;
