const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

function emailValidator(str) {
  return validator.isEmail(str, {
    allow_utf8_local_part: false,
  });
}

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password') // здесь принудительно получаем пароль из базы
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Нет такого юзера по емейлу *врем')); // ОСЛЕ ПЕРЕПИСАТЬ ЕРРОР
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('пароль усюзера не тот *врем')); // ОСЛЕ ПЕРЕПИСАТЬ ЕРРОР
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
