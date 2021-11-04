const Movie = require('../models/movie');

const NotFoundError = require('../middlewares/errors/NotFoundError');
const ForbiddenError = require('../middlewares/errors/ForbiddenError');
const IncorrectDataError = require('../middlewares/errors/IncorrectDataError');
const {
  INCORRECT_DATA_ERROR,
  NOT_FOUND_DATA_ERROR,
  DELETION_ERROR,
  SUCCESSFUL_DELETION,
} = require('../config/responseMessages');

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
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
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
    .orFail(new NotFoundError(NOT_FOUND_DATA_ERROR)) // отлавливаем ошибку с null значением
    .then((movie) => {
      if (_id !== movie.owner.toString()) {
        return next(new ForbiddenError(DELETION_ERROR)); // ошибка удаления чужой карточки
      }
      return Movie.findByIdAndDelete({ _id: movieId })
        .orFail(new NotFoundError(NOT_FOUND_DATA_ERROR)) // отлавливаем ошибку с null значением
        .then((deletedMovie) => res.send({
          message: SUCCESSFUL_DELETION,
          deletedMovie,
        }));
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
    });
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
