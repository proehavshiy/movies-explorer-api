const responseMessages = {
  DEFAULT_ERROR: 'На сервере произошла ошибка',
  UNAUTHORIZED_ERROR: 'Необходима авторизация',
  NOT_FOUND_SOURCE_ERROR: 'Запрашиваемый ресурс не найден',
  NOT_FOUND_DATA_ERROR: 'Фильм или пользователь не найдены',
  DELETION_ERROR: 'Удаление чужого фильма невозможно',
  USER_DUPLICATE_ERROR: 'Данный пользователь уже зарегистрирован',
  INCORRECT_DATA_ERROR: 'Переданы некорректные данные.',
  AUTHTOKEN_SENT: 'authToken записан в cookie',
  LOGOUT: 'Вы успешно разлогинены',
  SUCCESSFUL_DELETION: 'Фильм успешно удален',

};

module.exports = responseMessages;
