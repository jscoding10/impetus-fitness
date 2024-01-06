// Verify User
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Check token to see if user token is correct with cookie and verify
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));
  // Verify token - if no error, send to next function to update user in user route
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    // Save user data in request
    req.user = user;
    next();
  });
};