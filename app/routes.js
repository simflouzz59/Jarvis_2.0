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

    app.post('/request', function (req, res) {
        database.request(req.body.request.split(" "), function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../views/index.html'));
    });

    app.get('/admin', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../views/admin.html'));
    });

    app.post('/action/search', function (req, res) {
        database.actionSearch(req.body.actionName, function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.post('/action/search/word', function (req, res) {
        database.wordActionSearch(req.body.actionSelected, req.body.wordLibelle, function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.post('/action/search/response', function (req, res) {
        console.log(req.body.actionSelected + " " + req.body.reponseLibelle);
        database.responseActionSearch(req.body.actionSelected, req.body.responseLibelle, function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.get('*', function (req, res) {
        res.redirect('/');
        //res.send('You shall not pass !', 404);
    });
};