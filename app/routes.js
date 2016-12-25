module.exports = function (app, path, database, passport) {

    app.get('/login', function (req, res) {
        if (req.isAuthenticated()) res.redirect('/');
        else res.sendFile(path.resolve(__dirname + '/../views/login.html'));
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return console.error(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return console.error(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.post('/request', function (req, res) {
        //if (!req.isAuthenticated()) res.sendFile(path.resolve(__dirname + '/../views/forbidden.html'), 403);
        database.request(req.body.request.replace(/[^a-zA-Z0-9]/g,' ').trim().split(" "), function (err, data) {
            if (!err) {
                var plugin;
                if (data.length == 0) {
                    plugin = require(path.resolve(__dirname + '/../plugins/notFound'));
                    plugin.action(req, function (response) {
                        res.json(response);
                    });
                } else {
                    var actionSelected = Math.floor((Math.random() * data.length));
                    /* Charger le plugin */
                    plugin = require(path.resolve(__dirname + '/../plugins/' + data[actionSelected].action_name));
                    /* rediger la reponse */
                    plugin.action(req, function (response) {
                        // validate response
                        res.json(response);
                    });
                }
            } else console.error(err);
        });
    });

    app.get('/', function (req, res) {
        if (req.isAuthenticated()) res.sendFile(path.resolve(__dirname + '/../views/index.html'));
        else res.redirect('/login');
    });

    app.get('/admin', function (req, res) {
        if (req.isAuthenticated()) res.sendFile(path.resolve(__dirname + '/../views/admin.html'));
        else res.redirect('/login');
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
        database.responseActionSearch(req.body.actionSelected, req.body.responseLibelle, function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });

    app.get('/user/search', function (req, res) {
        database.userSearch(req.query.userName, function (err, data) {
            if (!err) res.json(data);
            else console.error(err);
        });
    });



    app.get('*', function (req, res) {
        //if (!req.isAuthenticated()) res.sendFile(path.resolve(__dirname + '/../views/forbidden.html'), 403);
        res.redirect('/');
        //res.send('You shall not pass !', 404);
    });
};