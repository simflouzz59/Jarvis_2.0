var mysql = require('mysql');

var connection;

const sql = "SELECT sysdate() sysdate;";

const requestSQL = "SELECT action_name, matching_count FROM ( SELECT a.name AS action_name, count(*) AS matching_count FROM action a INNER JOIN WORD_ACTION wa ON wa.action_id = a.id INNER JOIN word w ON wa.word_id = w.id INNER JOIN LANG l ON w.lang_id = l.id WHERE w.libelle IN (?) AND l.code = 'en' GROUP BY a.id ORDER BY count(*) desc, a.name asc ) req HAVING matching_count = MAX(matching_count);";

const actionSearchSQL = "SELECT a.id AS action_id, a.name AS action_name, a.libelle AS action_libelle, count(DISTINCT wa.id) AS word_count FROM action a LEFT JOIN WORD_ACTION wa ON a.id = wa.action_id WHERE lower(a.name) LIKE lower('%' ? '%') GROUP by a.id;";

const userSearchSQL = "SELECT u.id AS user_id, u.username AS user_username, u.name AS user_name, u.admin AS user_admin, l.code AS lang_code FROM user u INNER JOIN LANG l ON u.lang_id = l.id WHERE lower(u.username) LIKE lower('%' ? '%');";

const wordActionSearchSQL = "SELECT w.id AS word_id, w.libelle AS word_libelle, l.code AS lang_code FROM WORD w INNER JOIN LANG l ON w.lang_id = l.id INNER JOIN WORD_ACTION wa ON wa.word_id = w.id WHERE wa.action_id = ? AND lower(w.libelle) LIKE lower('%' ? '%') ORDER BY w.libelle ASC, l.code ASC;";

const getAllLangSQL = "SELECT id AS lang_id, code AS lang_code FROM LANG ORDER BY code ASC;";

const loginSQL = "SELECT * FROM USER WHERE lower(userName) = lower(?);";

const getUserByIdSQL = "SELECT * FROM USER WHERE id = ?;";

const createActionSQL = "INSERT INTO ACTION(name, libelle) VALUES (?, ?);";

const deleteActionSQL = "DELETE FROM ACTION WHERE id = ?;";

const deleteWordActionSQL = "DELETE FROM WORD_ACTION WHERE id = ?;";

const deleteWordSQL = "DELETE FRON WORD WHERE id = ?;";

const addWordActionSQL = "INSERT INTO WORD_ACTION(word_id, action_id) VALUES (?, ?)";

const getAllWordsSQL = "SELECT w.id AS word_id, w.libelle AS word_libelle, l.code AS lang_code FROM WORD w INNER JOIN LANG l ON w.lang_id = l.id INNER JOIN WORD_ACTION wa ON wa.word_id = w.id ORDER BY w.libelle ASC, l.code ASC";

const updateActionSQL = "UPDATE action SET name = ?, libelle = ? WHERE id = ?;";

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
    connection.query(requestSQL, [words], function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
};

module.exports.actionSearch = function (actionName, callback) {
    connection.query(actionSearchSQL, actionName, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.wordActionSearch = function (actionId, wordLibelle, callback) {
    connection.query(wordActionSearchSQL, [actionId, wordLibelle], function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.userSearch = function (userName, callback) {
    connection.query(userSearchSQL, userName, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.getAllLang = function (callback) {
    connection.query(getAllLangSQL, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.login = function (data, callback) {
    connection.query(loginSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.getUserById = function (data, callback) {
    connection.query(getUserByIdSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.deleteWordAction = function (data, callback) {
    connection.query(deleteWordActionSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.deleteWord = function (data, callback) {
    connection.query(deleteWordSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.deleteAction = function (data, callback) {
    connection.query(deleteActionSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.updateAction = function (data, callback) {
    connection.query(updateActionSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.createAction = function (data, callback) {
    connection.query(createActionSQL, data, function (err, rows, fields) {
        if (err) callback(err, false);
        else callback(false, rows);
    });
}

module.exports.close = function () {
    connection.close();
};