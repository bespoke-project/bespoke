import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  // console.log('Cookies:', req.cookies);
  const token = req.cookies.token;

  if (!token) {
    // console.log('No token found in cookies');
    throw new ErrorResponse('Please login', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    throw new ErrorResponse('Invalid token', 403);
  }
});

export default verifyToken;
