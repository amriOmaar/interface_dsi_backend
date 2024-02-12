var createError = require('http-errors');
var express = require('express');
var app = express();

var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


app.set('view engine', 'ejs');

const bodyParser = require('body-parser');

var usersRouter = require('./routes/users');

var server = require('http').createServer(app);

const mongodbConnection=require('./config/DBConnexion');


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);


app.get('/', (req, res) => {
  res.send('API is running...');
});



app.use(function(req, res, next) {
  next(createError(404));
});


// server.listen(4000);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running in IP:${PORT}`);
});