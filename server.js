var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    bodyParser = require('body-parser');

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var database = require('./app/database'),
    routes = require('./app/routes')(app, path, database);

server.on('close', function () {
    console.log('Bye bye !');
})

server.listen(8080, function () {
    console.log('Hello Mr STARK !');
});