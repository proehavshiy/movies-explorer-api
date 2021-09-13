const { isCelebrateError } = require('celebrate');
const IncorrectDataError = require('./IncorrectDataError');

const {
  INCORRECT_DATA_ERROR,
} = require('../../config/responseMessages');

function celebrateErrorHandler(error, req, res, next) {
  if (isCelebrateError(error)) {
    return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
  }
  return next(error);
}

module.exports = celebrateErrorHandler;
