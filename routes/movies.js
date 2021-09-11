const moviesRouter = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateRequestOfrecordMovie,
  validateRequestWithMovieId,
} = require('../middlewares/requestValidation/validationOfMovieRequest');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateRequestOfrecordMovie(), createMovie);
moviesRouter.delete('/:movieId', validateRequestWithMovieId(), deleteMovie);

module.exports = moviesRouter;
