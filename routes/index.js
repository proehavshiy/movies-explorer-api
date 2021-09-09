const express = require('express');
const mainRouter = require('express').Router;

const moviesRouter = require('./movies');
const usersRouter = require('./users');
const errorRouter = require('./error');

const app = express();

app.use('/movies', moviesRouter);
app.use('users', usersRouter);
// роут 404
app.use('*', errorRouter);

module.exports = mainRouter;
