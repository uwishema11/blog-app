import models from '../database/models/index';

const addUser = async (newUser) => {
  const registereduser = await models.User.create(newUser);
  return registereduser;
};

const getAllUsers = async () => {
  const users = await models.User.find();
  return users;
};

const findUserByEmail = async (email) => {
  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const findUserById = async (userId) => {
  const user = await models.User.findOne({
    where: { id: userId },
  });
  return user;
};

const updateMe = async (id, body) => {
  const user = await models.User.update(body, {
    where: { id },
    returning: true,
    raw: true,
  });
  return user;
};
export { addUser, updateMe, getAllUsers, findUserById, findUserByEmail };
