// middleware/jwt.js
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(createError(403, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.userId = user.id;
    next();
  });
};
