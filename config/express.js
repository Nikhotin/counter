const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

module.exports = (app) => {
  app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));
  app.use(express.urlencoded({ extended: true }));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  // error handler
  app.use((err, req, res, next) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
