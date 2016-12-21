module.exports = function (app, path, database) {

    app.get('/ping', function (req, res) {
        database.ping(function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.get('/hello', function (req, res) {
        res.json("Hello Wold !");
    });

    app.post('/hello', function (req, res) {
        res.json(req.body.name);
    });

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../views/index.html'));
    });

    app.get('*', function (req, res) {
        res.redirect('/');
        //res.send('You shall not pass !', 404);
    });
};