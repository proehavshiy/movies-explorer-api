const bcrypt = require('bcryptjs');

const User = require('../models/user');

function registerUser(req, res, next) {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashed) => User.create({
      name,
      email,
      password: hashed,
    }))
    .then((user) => {
      console.log('user:', user);
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: err,
      });
    });
}

function loginUser() {

}

module.exports = {
  registerUser,
  loginUser,
};
