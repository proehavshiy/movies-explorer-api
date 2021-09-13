const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/UnautorizedError');
const { UNAUTHORIZED_ERROR } = require('../config/responseMessages');

const { JWT_SECRET } = require('../config/config');

function auth(req, res, next) {
  const { authToken } = req.cookies;
  if (!authToken) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  let payload;
  try {
    payload = jwt.verify(authToken, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  req.user = payload;
  return next();
}

module.exports = auth;
