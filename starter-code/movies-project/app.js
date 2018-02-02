const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const index = require('./routes/index');
const users = require('./routes/users');
const celebrities = require('./routes/celebrities');

const app = express();

// -- database

mongoose.connect('mongodb://localhost/mongoose-movies-development', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- view engine

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// -- middlewares

app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -- routes

app.use('/', index);
app.use('/users', users);
app.use('/celebrities', celebrities);

// -- error handlers

app.use(function (req, res, next) {
  res.status(404);
  res.render('not-found');
});

app.use(function (err, req, res, next) {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
