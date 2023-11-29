const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via headers
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You have no token!');
    }

    try {
      // verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error('Invalid token:', err);
      throw new Error('Invalid token!');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
