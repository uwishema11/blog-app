import bcrypt from 'bcrypt';
import * as userService from '../services/userService';
import { createSendToken } from '../helpers/generateToken';
import userSchema from '../validations/userValidation';
import filterObj from '../utils/filterObject';
import { successResponse, handleError } from '../utils/response';
import catchAsync from '../utils/catchAsync';

const registerUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate(req.body);
  if (error) {
    return handleError(res, 400, error.details[0].message);
  }

  const isUser = await userService.findUserByEmail(email);
  if (isUser) {
    return handleError(res, 400, 'User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const body = {
    ...req.body,
    password: hashedPassword,
  };

  const newUser = await userService.addUser(body);

  newUser.password = undefined;

  successResponse(res, 201, 'User registered successfully', newUser);
});


export const fetchAllUsers = catchAsync(async (req, res) => {
  const data = await userService.getAllUsers();
    const { error } = data;
    if (error) {
       return handleError(res, 404, 'Error while fetching data ! Please try again.');
    }

    return successResponse(res, 200, 'All Users', data);
});

const checkUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return handleError(res, 400, 'Please fill in the missing fields');
  }
  const user = await userService.findUserByEmail(email);
  if (!user) {
    return handleError(res, 401, 'user does not exists. Please register and try again later.');
  } else {
    successResponse(res, 200, 'successfully', user);
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, 400, 'Please fill in the missing fields');
  }

  const user = await userService.findUserByEmail(email);
  if (!user) {
    return handleError(
      res,
      401,
      'user with the provided email doesnt not exists! please register ',
    );
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return handleError(
      res,
      401,
      'Invalid email or password. Please try again with the correct credentials.',
    );
  }

  await createSendToken(user, 200, 'Logged in successfully', res);
});

const logout = catchAsync(async (req, res) => {
  res.cookie('jwt', 'Loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  successResponse(res, 201, 'User logged out successfully');
});

const updateMe = catchAsync(async (req, res) => {
  if (req.body.password || req.body.confirm_password) {
    return handleError(
      res,
      400,
      'This route is not for password updates. Please use /updatePassword',
    );
  }

  const user = await userService.findUserById(req.user.id);
  if (!user) {
    return handleError(res, 401, 'User does not exist');
  }

  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'image');

  const updatedUser = await userService.updateMe(req.user.id, filteredBody);

  successResponse(res, 200, 'User profile updated successfully', updatedUser);
});

export { registerUser, updateMe, checkUser, login, logout };
