var mysql = require('mysql');

var connection;

const sql = "SELECT sysdate() sysdate;";

connection = mysql.createConnection({
    host: 'localhost',
    user: 'jarvis_app',
    password: 'mark42f',
    database: 'jarvis'
});

connection.connect();

module.exports.ping = function (callback) {
    connection.query(sql, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
};

module.exports.close = function () {
    connection.close();
};