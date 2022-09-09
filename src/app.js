require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('ioredis');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { sequelize } = require('./models');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

async function isDBConnected() {
    try {
      console.log('Connection DB...');
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }
  }

function isRedisConnected() {
    const client = redis.createClient({
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost',
    });

    client.on('connect', function () {
        console.log('Redis Connection has been established successfully.');
    });
}

isRedisConnected();

isDBConnected()


module.exports = app;
