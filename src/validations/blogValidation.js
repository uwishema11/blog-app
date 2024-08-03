import joi from 'joi';

const blogSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  image: joi.string(),
  userId: joi.number(),
  expireDate: joi.date(),
});
export default blogSchema;
