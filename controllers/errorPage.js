const NotFoundError = require('../middlewares/errors/NotFoundError');
const { NOT_FOUND_SOURCE_ERROR } = require('../config/responseMessages');

function errorPage(req, res, next) {
  return next(new NotFoundError(NOT_FOUND_SOURCE_ERROR));
}

module.exports = errorPage;
