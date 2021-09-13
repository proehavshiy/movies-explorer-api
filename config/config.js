require('dotenv').config();

const {
  DATABASE = 'mmongodb://localhost:27017/testbase',
  PORT,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  DATABASE: NODE_ENV === 'production' ? DATABASE : 'mmongodb://localhost:27017/testbase',
  PORT: NODE_ENV === 'production' ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
};
