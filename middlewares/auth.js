const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/UnautorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authToken } = req.cookies;
  if (!authToken) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    let payload;
    try {
      payload = jwt.verify(authToken, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
}

module.exports = auth;
