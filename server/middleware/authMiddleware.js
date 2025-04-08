// // server/middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token failed', error: err.message });
//   }
// };

// export const isAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied: Admins only' });
//   }
//   next();
// };
//-----------------------------
// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        console.log('📦 Raw token received:', token); // Check if this matches frontend
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🔓 Decoded token:', decoded);
  
        req.user = await User.findById(decoded.id).select('-password');
        console.log('👤 User found:', req.user);
  
        if (!req.user) {
          return res.status(401).json({ message: 'User not found' });
        }
  
        next();
      } catch (error) {
        console.error('❌ Token verification failed:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  });
  

export default protect;
