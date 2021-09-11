const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validateRequestOfUserUpdation,
} = require('../middlewares/requestValidation/validationOfUserRequest');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validateRequestOfUserUpdation(), updateUser);

module.exports = usersRouter;
