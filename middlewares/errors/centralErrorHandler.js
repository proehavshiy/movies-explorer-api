const {
  DEFAULT_ERROR,
} = require('../../config/responseMessages');

function centralErrorHandler(error, req, res, next) {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? DEFAULT_ERROR : message,
  });
  return next();
}

module.exports = centralErrorHandler;
