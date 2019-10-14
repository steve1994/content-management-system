var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var datasRouter = require('./routes/datas');
var datadatesRouter = require('./routes/datadates');
var mapsRouter = require('./routes/maps');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cmsdb', {useNewUrlParser: true});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/data',datasRouter);
app.use('/api/datadate',datadatesRouter);
app.use('/api/map',mapsRouter);

module.exports = app;
