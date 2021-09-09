const mainRouter = require('express').Router();

const moviesRouter = require('./movies');
const usersRouter = require('./users');
const errorRouter = require('./error');

const {
  registerUser,
} = require('../controllers/users');

mainRouter.post('/signup', registerUser);

mainRouter.use('/movies', moviesRouter);
mainRouter.use('/users', usersRouter);
// роут 404
mainRouter.use('*', errorRouter);

module.exports = mainRouter;
