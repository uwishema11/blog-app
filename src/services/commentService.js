import models from '../database/models/index';

const addComment = async (createdComment) => {
  const comment = await models.Comment.create(createdComment);
  return comment;
};
const findAllComments = async () => {
  const allComments = await models.Comment.findAll({
    include: [
      {
        model: models.User,
        attributes: ['firstName'],
        as: 'author',
      },
      {
        model: models.Blog,
        as: 'blog',
      },
    ],
  });
  return allComments;
};

const findCommentById = async (id) => {
  const comment = await models.Comment.findOne({
    where: { id },
  });
  return comment;
};

const updateComment = async (id, commnetInfo) =>
  models.Comment.update(commnetInfo, {
    where: id,
    returning: true,
    raw: true,
  });

const deleteComment = async (commentId, blogId) =>
  models.Comment.destroy({
    where: {
      id: commentId,
      blogId, // Ensuring the comment belongs to the specified blog
    },
  });

export { addComment, findAllComments, findCommentById, updateComment, deleteComment };
