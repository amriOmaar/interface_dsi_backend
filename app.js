var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Chat = require("./models/schema");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chatRoute');

var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);

const mongodbConnection=require('./config/DBConnexion');
// const logging = require('./middelwares/logging');


io.on('connection', socket => {
  //console.log('connected.');
  socket.broadcast.emit('user connected');

  socket.on('disconnect', () => {
      //console.log('disconnected.');
      socket.broadcast.emit('user disconnected');
    });

    
  socket.on("chat message", async data => {
    const message = new Chat({ pseudo: data.pseudo, message: data.message });
    socket.broadcast.emit("chat message", { data: message });
    await message.save();
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', { author: data.author });
  });

 
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.get('/messages', async function(req, res, next) {
try {
  const messages = await Chat.find({});
  res.json(messages);
} catch (err) {
  next(err);
}
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


// app.use(logging)
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/chat', chatRouter);

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


io.on('connection', socket => {
  //console.log('connected.');
  socket.broadcast.emit('user connected');

  socket.on('disconnect', () => {
      //console.log('disconnected.');
      socket.broadcast.emit('user disconnected');
    });
});


server.listen(3000);

