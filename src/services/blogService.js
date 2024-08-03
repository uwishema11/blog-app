import models from '../database/models/index';

const createBlog = async (blogInformation) => {
  const createdItem = await models.Blog.create(blogInformation);
  return createdItem;
};
const findAllBlogs = async () => {
  const allBlogs = await models.Blog.findAll();
  return allBlogs;
};
const findBlogById = async (id) => {
  const blog = await models.Blog.findOne({
    where: { id },
    include: [
      {
        model: models.User,
        attributes: ['firstName'],
        as: 'user',
      },
      {
        model: models.Comment,
        as: 'comments',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: models.User,
            attributes: ['firstName'],
            as: 'user',
          },
        ],
      },
    ],
    attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
  });
  return blog;
};

const deleteBlog = async (id) =>
  models.Blog.destroy({
    where: { id },
  });

const updateBlog = async (id, blogInfo) =>
  models.Blog.update(blogInfo, {
    where: { id },
    returning: true,
    row: true,
  });

export { createBlog, deleteBlog, findAllBlogs, findBlogById, updateBlog };
