const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { authUser, injectUser } = require('./controllers/auth')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/todolist?gssapiServiceName=mongodb';
mongoose.connect(uri, {
  useNewUrlParser: true
});

const app = express();

// app.set('superSecret', config.jwtsecret);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', injectUser)
app.use('/user', authUser)

app.use('/', indexRouter);
app.use('/user', usersRouter);

module.exports = app;
