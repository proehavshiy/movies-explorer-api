require('dotenv').config();

// express & mongo
const express = require('express');
const mongoose = require('mongoose');

// парсеры
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// защита
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { isCelebrateError } = require('celebrate');
const setCors = require('./middlewares/cors');

// logger
const { errorLogger, requestLogger } = require('./middlewares/logger/logger');

// router
const mainRouter = require('./routes/index');
const IncorrectDataError = require('./middlewares/errors/IncorrectDataError');

// ПОТОМ ВЫНЕТСИ ОТСЮДА
const { PORT = 3000 } = process.env;
const { DATABASE = 'mmongodb://localhost:27017' } = process.env;

// express & mongo
const app = express();
mongoose.connect(`${DATABASE}/bitfilmsdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// лимитер запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(requestLogger);
// security
app.use(limiter);
app.use(helmet());
// мидлвара управления CORS
app.use(setCors);

// парсеры
app.use(bodyParser.json());
app.use(cookieParser());

app.use(mainRouter);

app.use(errorLogger);

// обработчик ошибок celebrate
app.use((error, req, res, next) => {
  console.log('celebrate:', error);
  if (isCelebrateError(error)) {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  } else {
    next(error);
  }
});

// централизованный обработчик ошибок
app.use((error, req, res, next) => {
  console.log('central:', error);
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
