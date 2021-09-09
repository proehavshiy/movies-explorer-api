const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// ПОТОМ ВЫНЕТСИ ОТСЮДА
const { PORT = 3000 } = process.env;
const { DATABASE = 'mmongodb://localhost:27017' } = process.env;

// подключаемся к серверу mongo
mongoose.connect(`${DATABASE}/bitfilmsdb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());
// подключаем парсер кук как мидлвэр
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
