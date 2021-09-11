const { celebrate, Joi } = require('celebrate');

function validateRequestOfrecordMovie() {
  return celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required().min(1).trim(),
      nameEN: Joi.string().required().min(1).trim(),
      description: Joi.string().required().min(1).trim(),
      director: Joi.string().required().min(1).trim(),
      country: Joi.string().required().min(1).trim(),
      year: Joi.string().required().length(4).trim(),
      duration: Joi.number().required().min(1),
      image: Joi.string().required().uri(),
      trailer: Joi.string().required().uri(),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.number().required().min(1),
    }),
  });
}

function validateRequestWithMovieId() {
  return celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  });
}

module.exports = {
  validateRequestOfrecordMovie,
  validateRequestWithMovieId,
};
