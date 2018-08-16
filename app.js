var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lookforRemains = require('./routes/lookforRemains');
var activity = require('./routes/activity');
var peopleStory = require('./routes/peopleStory');
var aboutus = require('./routes/aboutus');
var historicalSnapshots = require('./routes/historicalSnapshots');
var showRemains = require('./routes/showRemains');
var jiangZhongzheng = require('./routes/jiangZhongzheng');
var yanJiayu = require('./routes/yanJiayu');
var zhengYongxi = require('./routes/zhengYongxi');

var app = express();







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lookforRemains', lookforRemains);
app.use('/activity', activity);
app.use('/peopleStory', peopleStory);
app.use('/historicalSnapshots', historicalSnapshots);
app.use('/aboutus', aboutus);
app.use('/showRemains', showRemains);
app.use('/jiangZhongzheng', jiangZhongzheng);
app.use('/yanJiayu', yanJiayu);
app.use('/zhengYongxi', zhengYongxi);
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
