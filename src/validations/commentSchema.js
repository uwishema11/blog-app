import Joi from 'joi';

const commentSchema = Joi.object({
  content: Joi.string().min(5).required(),
  userId: Joi.number().integer(),
  blogId: Joi.number().integer(),
});

export default commentSchema;
