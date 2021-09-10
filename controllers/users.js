const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../middlewares/errors/NotFoundError');
const ConflictError = require('../middlewares/errors/ConflictError');
const IncorrectDataError = require('../middlewares/errors/IncorrectDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

function registerUser(req, res, next) {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashed) => User.create({
      name,
      email,
      password: hashed,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error.name === 'MongoError' && error.code === 11000) { // регистрация по уже существующему email
        next(new ConflictError('Данный пользователь уже зарегистрирован'));
      } else if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('authToken', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({
        message: 'authToken записан в cookie',
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function logoutUser(req, res, next) {
  res
    .clearCookie('authToken')
    .send({
      message: 'Вы успешно разлогинены',
    });
  next();
}

function getUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(new NotFoundError('Фильм или пользователь не найдены')) // отлавливаем ошибку с null значением
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function updateUser(req, res, next) {
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail(new NotFoundError('Фильм или пользователь не найдены')) // отлавливаем ошибку с null значением
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
};
