var mysql = require('mysql');

var connection;

const sql = "SELECT sysdate() sysdate;";
const getPossibleResponse = "SELECT a.name AS action_name, a.type AS action_type, r.libelle AS response_libelle, count(*) AS matching_count FROM action a INNER JOIN WORD_ACTION wa ON wa.action_id = a.id INNER JOIN word w ON wa.word_id = w.id INNER JOIN ACTION_RESPONSE ar ON ar.action_id = a.id INNER JOIN RESPONSE r ON ar.response_id = r.id INNER JOIN LANG l ON r.lang_id = l.id WHERE w.libelle IN (?) AND l.code = 'en' AND w.lang_id = l.id GROUP BY a.id, r.id ORDER BY count(*) desc, a.name asc;";
const getActionsByName = "SELECT a.id, a.name, a.libelle, a.type, count(DISTINCT wa.id) AS word_count, count(DISTINCT ar.id) AS response_count FROM action a INNER JOIN ACTION_RESPONSE ar on a.id = ar.action_id INNER JOIN WORD_ACTION wa ON a.id = wa.action_id WHERE lower(name) LIKE lower('%' ? '%') GROUP by a.id;";
const getWordActionByActionAndLibelle = "SELECT w.id AS word_id, w.libelle AS word_libelle, l.code AS lang_code FROM WORD w INNER JOIN LANG l ON w.lang_id = l.id INNER JOIN WORD_ACTION wa ON wa.word_id = w.id WHERE wa.action_id = ? AND lower(w.libelle) LIKE lower('%' ? '%');";

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

module.exports.request = function (words, callback) {
    connection.query(getPossibleResponse, words, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
};

module.exports.actionSearch = function (actionName, callback) {
    connection.query(getActionsByName, actionName, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.wordActionSearch = function (actionId, wordLibelle, callback) {
    connection.query(getWordActionByActionAndLibelle, [actionId, wordLibelle], function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.close = function () {
    connection.close();
};