var mysql = require('mysql');

var connection;

const sql = "SELECT sysdate() sysdate;";
const getPossibleResponse = "SELECT a.id, a.type, r.libelle, count(*) FROM action a INNER JOIN word w ON a.word_id = w.id INNER JOIN ACTION_RESPONSE ar ON ar.action_id = a.id INNER JOIN RESPONSE r ON ar.response_id = r.id INNER JOIN LANG l ON r.lang_id = l.id WHERE w.libelle IN (?) AND l.code = 'en' AND w.lang_id = l.id GROUP BY a.id, r.id ORDER BY count(*) desc;";

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

module.exports.request = function (data, callback) {
    connection.query(getPossibleResponse, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
};

module.exports.close = function () {
    connection.close();
};