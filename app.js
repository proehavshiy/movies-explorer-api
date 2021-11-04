// express & mongo
const express = require('express');
const mongoose = require('mongoose');

// парсеры
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// защита
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const setCors = require('./middlewares/cors');

// env
const { PORT, DATABASE } = require('./config/config');

// logger
const { errorLogger, requestLogger } = require('./middlewares/logger/logger');

// router
const mainRouter = require('./routes/index');

// error handlers
const celebrateErrorHandler = require('./middlewares/errors/celebrateErrorHandler');
const centralErrorHandler = require('./middlewares/errors/centralErrorHandler');

// express & mongo
const app = express();
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
app.use(celebrateErrorHandler);

// централизованный обработчик ошибок
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
