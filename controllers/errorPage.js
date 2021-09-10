const NotFoundError = require('../middlewares/errors/NotFoundError');

function errorPage(req, res, next) {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
}

module.exports = errorPage;
