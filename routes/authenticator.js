const {secretKey} = require('../config')
const jwt= require('jsonwebtoken')

// Middleware for token authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ data: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ data: 'Invalid token' });
      }
  
      // Attach the user data to the request object
      req.user = user;
  
      // Continue to the next middleware or route
      next();
    });
  }

module.exports={
    authenticateToken,
}