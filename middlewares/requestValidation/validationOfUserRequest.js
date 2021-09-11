const { celebrate, Joi } = require('celebrate');

function validateRequestOfRegister() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).trim(),
    }),
  });
}

function validateRequestOfLogin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
}

function validateRequestOfUserUpdation() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).trim(),
    }),
  });
}

module.exports = {
  validateRequestOfRegister,
  validateRequestOfLogin,
  validateRequestOfUserUpdation,
};
