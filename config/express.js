const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('mongoose').connection;

module.exports = (app) => {
  app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));
  app.use(express.urlencoded({ extended: true }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(session({
    secret: 'Testovoe zadanie',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  }));

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
