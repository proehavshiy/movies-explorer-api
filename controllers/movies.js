const Movie = require('../models/movie');

const NotFoundError = require('../middlewares/errors/NotFoundError');
const ForbiddenError = require('../middlewares/errors/ForbiddenError');
const IncorrectDataError = require('../middlewares/errors/IncorrectDataError');

function createMovie(req, res, next) {
  const { _id } = req.user;
  const {
    nameRU,
    nameEN,
    description,
    director,
    country,
    year,
    duration,
    image,
    trailer,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    nameRU,
    nameEN,
    description,
    director,
    country,
    year,
    duration,
    image,
    trailer,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function getMovies(req, res, next) {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById({ _id: movieId })
    .orFail(new NotFoundError('Фильм или пользователь не найдены')) // отлавливаем ошибку с null значением
    .then((movie) => {
      if (_id !== movie.owner.toString()) {
        throw new ForbiddenError('Удаление чужого фильма невозможно'); // ошибка удаления чужой карточки
      } else {
        Movie.findByIdAndDelete({ _id: movieId })
          .orFail(new NotFoundError('Фильм или пользователь не найдены')) // отлавливаем ошибку с null значением
          .then((deletedMovie) => res.send({
            message: 'Фильм успешно удален',
            deletedMovie,
          }));
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
