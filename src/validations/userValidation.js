import Joi from 'joi';

const userSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required().min(6).strict(),
});

export default userSchema;
