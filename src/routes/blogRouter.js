import express from 'express';
import * as blogController from '../controllers/blogController';
import protect from '../middleware/auth';

const blogRouter = express.Router();

blogRouter.post('/create',blogController.addBlog);
blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:blogId',blogController.getSingleBlog);
blogRouter.delete('/delete/:blogId', blogController.deleteSingleBlog);
blogRouter.patch('/update/:blogId', blogController.updateBlog);

export default blogRouter;
