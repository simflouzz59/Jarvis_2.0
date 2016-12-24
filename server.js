var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

app.use('/public', express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    /* Cookie ? */
    secret: 'pliloin',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var database = require('./app/database'),
    passportConfig = require('./app/passport')(passport, database, localStrategy),
    routes = require('./app/routes')(app, path, database, passport);

server.on('close', function () {
    console.log('Bye bye !');
})

server.listen(8080, function () {
    console.log('Hello Mr STARK !');
});