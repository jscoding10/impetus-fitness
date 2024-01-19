// Verify User 
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
 
// Check token to see if user token is correct with cookie and verify
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // If no token for user return unauthorized
  if (!token) return next(errorHandler(401, 'Unauthorized'));
  // Verify token - if no error, send to next function to update user in user route
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    // Save user data in request as req.user
    req.user = user;
    next();
  });
};