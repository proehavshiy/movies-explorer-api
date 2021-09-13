const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escapeHTML = require('escape-html');

const User = require('../models/user');

const NotFoundError = require('../middlewares/errors/NotFoundError');
const ConflictError = require('../middlewares/errors/ConflictError');
const IncorrectDataError = require('../middlewares/errors/IncorrectDataError');

const { JWT_SECRET } = require('../config/config');
const {
  USER_DUPLICATE_ERROR,
  INCORRECT_DATA_ERROR,
  NOT_FOUND_DATA_ERROR,
  AUTHTOKEN_SENT,
  LOGOUT,
} = require('../config/responseMessages');

function registerUser(req, res, next) {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashed) => User.create({
      name: escapeHTML(name),
      email: escapeHTML(email),
      password: hashed,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error.code === 11000) { // регистрация по уже существующему email
        return next(new ConflictError(USER_DUPLICATE_ERROR));
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(escapeHTML(email), escapeHTML(password))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('authToken', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({
        message: AUTHTOKEN_SENT,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
    });
}

function logoutUser(req, res, next) {
  res
    .clearCookie('authToken')
    .send({
      message: LOGOUT,
    });
  return next();
}

function getUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(new NotFoundError(NOT_FOUND_DATA_ERROR)) // отлавливаем ошибку с null значением
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
    });
}

function updateUser(req, res, next) {
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id,
    {
      email: escapeHTML(email),
      name: escapeHTML(name),
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail(new NotFoundError(NOT_FOUND_DATA_ERROR)) // отлавливаем ошибку с null значением
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      if (error.code === 11000) { // регистрация по уже существующему email
        return next(new ConflictError(USER_DUPLICATE_ERROR));
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        return next(new IncorrectDataError(INCORRECT_DATA_ERROR));
      }
      return next(error);
    });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
};
