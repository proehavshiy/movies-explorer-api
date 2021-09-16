// Массив разешённых доменов
const allowedCors = [
  'localhost:3000',
  'filmsexplorer.nomoredomains.club',
  'api.filmsexplorer.nomoredomains.club',
  'https://filmsexplorer.nomoredomains.club',
  'https://api.filmsexplorer.nomoredomains.club',
];
const METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function setCors(req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
}

module.exports = setCors;
