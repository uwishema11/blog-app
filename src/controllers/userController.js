import bcrypt from 'bcrypt';
import * as userService from '../services/userService';
import { createSendToken } from '../helpers/generateToken';
import { userSchema } from '../validations/userValidation';
import filterObj from '../utils/filterObject';
import { successResponse, handleError } from '../utils/response';
import catchAsync from '../utils/catchAsync';

const registerUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = await userSchema.validate(req.body);
  if (error) {
    handleError(res, 400, error.details[0].message);
  }
  // check if a user exists in our database

  const isUser = await userService.findUserByEmail(email);
  if (isUser) {
    handleError(res, 400, 'User already exists');
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const body = {
    ...req.body,
    password: hashedPassword,
  };
  const newUser = await userService.addUser(body);
  // remove password from the result
  newUser.password = undefined;
  successResponse(res, 201, 'User registerd successfully');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    handleError(res, 400, 'Fill the missing field');
  }

  const user = await userService.findUserByEmail(email);

  if (!user) {
    handleError(
      res,
      401,
      'Invalid email or password. Please try again with the correct credentials.',
    );
  }
  // hash and compare passwords
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    handleError(
      res,
      401,
      'Invalid email or password. Please try again with the correct credentials.',
    );
  }

  await createSendToken(user, 200, 'LoggedIn successfully', res);
});

// logging out a user
const logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'Loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  successResponse(res, 201, 'User Logged out successfully');
});

const updateMe = async (req, res) => {
  try {
    // create an error if a user tries to update password
    if (req.body.password || req.body.confirm_password) {
      return res.status(400).json({
        success: false,
        message: 'The routr is not for password updates.Please use /updatePassword',
      });
    }
    // Update user document
    const user = await userService.findUserById(req.user.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User does not exists',
      });
    }
    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'émail', 'image');
    const { error } = filteredBody;
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.message,
      });
    }
    const updatedUser = await userService.updateMe(req.user.id, filteredBody);
    return res.status(200).json({
      success: true,
      message: 'user profile updated successfully',
      result: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, updateMe, login, logout };
