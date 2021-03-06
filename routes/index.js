const mainRouter = require('express').Router();

const moviesRouter = require('./movies');
const usersRouter = require('./users');
const errorRouter = require('./error');

const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/users');

const {
  validateRequestOfRegister,
  validateRequestOfLogin,
} = require('../middlewares/requestValidation/validationOfUserRequest');

const auth = require('../middlewares/auth');

mainRouter.post('/signup', validateRequestOfRegister(), registerUser);
mainRouter.post('/signin', validateRequestOfLogin(), loginUser);

mainRouter.use(auth);
mainRouter.post('/signout', logoutUser);
mainRouter.use('/movies', moviesRouter);
mainRouter.use('/users', usersRouter);
// ัะพัั 404
mainRouter.use('*', errorRouter);

module.exports = mainRouter;
