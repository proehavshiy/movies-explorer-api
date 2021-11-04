const errorRouter = require('express').Router();
const errorPage = require('../controllers/errorPage');

errorRouter.all('/', errorPage);

module.exports = errorRouter;
