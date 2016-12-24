module.exports = function (passport, database, localStrategy) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        database.getUserById([id], function (err, data) {
            return done(null, data);
        });
    });

    passport.use(new localStrategy({},
        function (username, password, done) {
            database.login([username, password], function (err, data) {
                if(data.length == 0) {
                    return done(null, false, "Wrong username/password");
                }
                if (password == data[0].password) {
                    return done(null, data[0]);
                }
                return done(null, false, "Wrong password");
            });
        }));

};