import * as Services from '../services/commentService';
import * as Blogervices from '../services/blogService';
import commentSchema from '../validations/commentSchema';
import { successResponse, handleError } from '../utils/response';
import catchAsync from '../utils/catchAsync';

// adding a new comment

export const createComment = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    userId: req.user.id,
    blogId: req.params.blogId,
  };
  const { error } = commentSchema.validate(body);
  if (error) {
    handleError(res, 400, error.details[0].message);
  }

  const newComment = await Services.addComment(body);
  successResponse(res, 201, 'Comment successfully created', newComment);
});

// deleting a Comment
export const deleteComment = catchAsync(async (req, res, next) => {
  const { blogId, commentId } = req.params;

  const result = await Services.deleteComment(commentId, blogId);

  if (result === 0) {
    handleError(res, 404, 'Comment not found or does not belong to the specified blog');
  }
  successResponse(res, 200, 'Comment deleted successfully');
});

// Getting all comments

export const findAllComments = catchAsync(async (req, res, next) => {
  const data = Services.findAllComments();
  const { error } = data;
  if (error) {
    handleError(res, 404, 'Error while fetching data ! Please try again.');
  }
  successResponse(res, 200, 'Fetched data', data);
});

// updating a commnent
export const updateComment = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blogervices.findBlogById(blogId);
  // check wether blog still exists in our database
  if (!blog) {
    handleError(res, 404, 'Blog not found');
  }

  const comment = await Services.findCommentById(req.params.id);

  // check wether the comment to be updated exists
  if (!comment) {
    handleError(res, 404, 'comment not not exits! check if it not deleted');
  }
  await Services.updateComment(req.params.id, req.body);

  successResponse(res, 201, 'comment updated successfully');
});
