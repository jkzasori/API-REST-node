var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var petRouter = require('./routes/petRouter');
var providerRouter = require('./routes/providerRouter');

const mongoose = require('mongoose');

// const Pets = require('./models/pets');
// const Providers = require('./models/Providers');

const url = 'mongodb://tamara:tamara321@ds125578.mlab.com:25578/test1';
const connect = mongoose.connect(url, {useNewUrlParser: true});

connect.then(() => {
	const db = mongoose.connection;
	console.log('Connection correctly to server')
}, (err) => {console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pets', petRouter);
app.use('/providers', providerRouter);
// app.use('/providers', providerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
