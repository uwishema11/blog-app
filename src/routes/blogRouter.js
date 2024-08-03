import express from 'express';
import * as blogController from '../controllers/blogController';
import protect from '../middleware/auth';

const blogRouter = express.Router();

blogRouter.post('/create', protect,blogController.addBlog);
blogRouter.get('/',protect, blogController.getAllBlogs);
blogRouter.get('/:blogId', protect,blogController.getSingleBlog);
blogRouter.delete('/delete/:blogId', protect, blogController.deleteSingleBlog);
blogRouter.patch('/update/:blogId', protect, blogController.updateBlog);

export default blogRouter;
