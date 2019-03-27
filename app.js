const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { auth } = require('./controllers/auth')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');
const uri = "mongodb+srv://tengmaoqing:Hp@cluster0-lfhai.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, {
  useNewUrlParser: true,
  connectTimeoutMS: 3000,
  socketTimeoutMS: 3000
});
const db = mongoose.connection;
db.on('error', err => {
//   const collection = client.db("test").collection("devices");
  console.log('连接失败', err);
  // perform actions on the collection object
//   client.close();
});

db.on('open', () => {
  console.log('连接失败')
})

const app = express();

app.set('superSecret', config.jwtsecret);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', auth)

app.use('/', indexRouter);
app.use('/user', usersRouter);

module.exports = app;
