import * as Services from '../services/blogService';
import blogSchema from '../validations/blogValidation';
import catchAsync from '../utils/catchAsync';
import { handleError, successResponse } from '../utils/response';

// adding a new blog
const addBlog = catchAsync(async (req, res,next) => {
  //  data validations
  const validations = blogSchema.validate(req.body);
  const { error } = validations;
  if (error) {
        console.log(error.message);
    return handleError(res, 400, error.message);
    console.log(error.message)
  }
  const result = {
    ...req.body,
    userId: 1,
  };
  const newBlog = await Services.createBlog(result);
  return successResponse(res, 201, 'Blog added succesfully', newBlog);
});

// Fetching all blogs

const getAllBlogs = catchAsync(async (req, res) => {
  const data = await Services.findAllBlogs();
  const { error } = data;
  if (error) {
   return handleError(res, 404, 'Error while fetching data ! Please try again.');
  }

  return successResponse(res, 200, 'All Blogs', data);
});



const getSingleBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;

  const singleBlog = await Services.findBlogById(blog);
  if (!singleBlog) {
   return handleError(res, 404, 'A blog not found! Please try again.');
  }
  return successResponse(res, 200, 'Blog successfully found', singleBlog);
});

// Deleting a blog

const deleteSingleBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;
  if (!blog) {
    return handleError(res, 404, 'Please  select a blog to be deleted');
  }
  const isBlogExist = await Services.findBlogById(blog);
  if (!isBlogExist) {
     return handleError(res, 404, 'Blog not found');
  }
  await Services.deleteBlog(blog);
  return successResponse(res, 200, 'Blog succfully deleted');
});

// updating a blog
const updateBlog = catchAsync(async (req, res) => {
  const blog = req.params.blogId;
  if (!blog) {
   return handleError(res, 404, 'Please  select a blog to be updated');
  }
  const isBlogExist = await Services.findBlogById(blog);
  if (!isBlogExist) {
    return handleError(res, 404, 'A blog not found! Please try again');
  }
  const updatedBlog = await Services.updateBlog(blog, req.body);
  return successResponse(res, 200, 'Blog succfully updated', updatedBlog);
});
export { addBlog, updateBlog, getAllBlogs, getSingleBlog, deleteSingleBlog };
