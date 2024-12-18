/* eslint-disable prefer-destructuring */
import { verifyAccessToken } from '../helpers/generateToken';
import * as userService from '../services/userService';

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.token) {
      token = req.headers.token;
    } else if (req.cookies) {
       token = req.cookies['next-auth.session-token'];
      // token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.headers.jwt;
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not loged in! Please log in to get access',
      });
    }
    const result = await verifyAccessToken(token);
    if (!result.success) {
      return res.status(403).json({
        success: false,
        error: 'Login first before applying this action',
      });
    }


    const freshUser = await userService.findUserById(result.data.id);
    if (!freshUser) {
      return res.status(401).json({ success: false, message: 'The user no longer exists.' });
    }
  
    req.user = result.data;
    next();
  } catch (error) {
    return {
      success: false,
      error: 'Invalid token. Please login again',
    };
  }
};

export default protect;
