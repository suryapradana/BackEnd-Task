let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/testing";
mongoose.connect(mongoUrl, { useNewUrlParser: true })
mongoose.connection.on('error', err => debug('MongoDB connection error: ${err}'));

// let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
// let homeRouter = require('./routes/home');
let pictureRouter = require('./routes/pictures');

let app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/home', homeRouter);
app.use('/pictures', pictureRouter);

module.exports = app;
