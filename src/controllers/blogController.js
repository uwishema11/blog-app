import * as Services from '../services/blogService';
import blogSchema from '../validations/blogValidation';
import catchAsync from '../utils/catchAsync';
import { handleError, successResponse } from '../utils/response';

// adding a new blog
const addBlog = catchAsync(async (req, res) => {
  //  data validations
  const validations = blogSchema.validate(req.body);
  const { error } = validations;
  if (error) {
    handleError(res, 400, error.message);
  }
  const result = {
    ...req.body,
    userId: req.user.id,
  };
  const newBlog = await Services.createBlog(result);
  successResponse(res, 201, 'Blog added succesfully', newBlog);
});

// Fetching all blogs

const getAllBlogs = catchAsync(async (req, res) => {
  const data = await Services.findAllBlogs();
  const { error } = data;
  if (error) {
    handleError(res, 404, 'Error while fetching data ! Please try again.');
  }

  successResponse(res, 200, 'All Blogs', data);
});

// Fetching a single blog

const getSingleBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;

  const singleBlog = await Services.findBlogById(blog);
  if (!singleBlog) {
    handleError(res, 404, 'A blog not found! Please try again.');
  }
  successResponse(res, 200, 'Blog successfully found', singleBlog);
});

// Deleting a blog

const deleteSingleBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;
  if (!blog) {
    handleError(res, 404, 'Please  select a blog to be deleted');
  }
  const isBlogExist = await Services.findBlogById(blog);
  if (!isBlogExist) {
    handleError(res, 404, 'Blog not found');
  }
  await Services.deleteBlog(blog);
  successResponse(res, 200, 'Blog succfully deleted');
});

// updating a blog
const updateBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;
  if (!blog) {
    handleError(res, 404, 'Please  select a blog to be updated');
  }
  const isBlogExist = await Services.findBlogById(blog);
  if (!isBlogExist) {
    handleError(res, 404, 'A blog not found! Please try again');
  }
  const updatedBlog = await Services.updateBlog(blog, req.body);
  successResponse(res, 200, 'Blog succfully updated', updatedBlog);
});
export { addBlog, updateBlog, getAllBlogs, getSingleBlog, deleteSingleBlog };
