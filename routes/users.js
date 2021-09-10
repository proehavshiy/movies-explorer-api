const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUser);

module.exports = usersRouter;
