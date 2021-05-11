require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
var app = express()


const http = require('http');
app.server = http.createServer(app);
const expressWs = require('express-ws')(app, app.server);

var app = expressWs.app

const {Message} = require('./models')

app.use(cors())
app.use(express.static('public'));

const aWss = expressWs.getWss('/');


app.ws('/', function (ws, req, socket) {
    ws.onclose = async function () {
        console.log('@@@', "USER DISCONNECTED");
    }

    ws.onmessage = async function (msg) {
        const {message, name, userId} = JSON.parse(msg.data)
        const result = await Message.create({
            message: message,
            userName: name,
            userId: userId
        })
        const allResult = await Message.findAll()

        aWss.clients.forEach(function (client) {
            client.send(JSON.stringify(allResult));
        });
    };
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

