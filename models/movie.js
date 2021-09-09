const mongoose = require('mongoose');
const validator = require('validator');

function validateUrl(link) {
  return validator.isURL(link);
}

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url); // ПРИВЕСТИ К ОБЩЕМУ ВИДУ/ ТЕСТИРУЕМ
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validateUrl(url); // ПРИВЕСТИ К ОБЩЕМУ ВИДУ/ ТЕСТИРУЕМ
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: validateUrl, // ПРИВЕСТИ К ОБЩЕМУ ВИДУ/ ТЕСТИРУЕМ
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
