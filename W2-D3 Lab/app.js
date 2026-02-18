const express = require('express');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;
