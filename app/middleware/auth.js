const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app');

module.exports = (req, res, next) => {
  // const authHeader = req.get('Authorization');
  // if (!authHeader) {
  //   res.status(401).json({ message: 'Token not provided!' });
  // }

  // const token = authHeader.replace('Bearer ', '');
  const { token } = req.session;
  try {
    jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  next();
};
