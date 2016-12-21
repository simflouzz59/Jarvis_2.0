-- mysql -u root -p

CREATE DATABASE jarvis CHARACTER SET 'utf8';

GRANT SELECT, 
      UPDATE,
      INSERT,
      DELETE
ON jarvis.*
TO 'jarvis_app'@'localhost' IDENTIFIED BY 'mark42f';

USE jarvis;

CREATE TABLE IF NOT EXISTS LANG (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    code VARCHAR(2) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS WORD (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libelle VARCHAR(99) NOT NULL,
    lang_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (lang_id) REFERENCES LANG(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ACTION (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    type INT UNSIGNED NOT NULL,
    word_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (word_id) REFERENCES WORD(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS RESPONSE (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libelle VARCHAR(99) NOT NULL UNIQUE,
    lang_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (lang_id) REFERENCES LANG(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ACTION_RESPONSE (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    action_id INT UNSIGNED NOT NULL,
    response_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (action_id) REFERENCES ACTION(id),
    FOREIGN KEY (response_id) REFERENCES RESPONSE(id),
    PRIMARY KEY (id)
);

/* Request for get the action id and the response libelle since a word array and a ISO langage code */
SELECT a.id, a.type, r.libelle, count(*)
FROM action a INNER JOIN word w
ON a.word_id = w.id
INNER JOIN ACTION_RESPONSE ar 
ON ar.action_id = a.id
INNER JOIN RESPONSE r
ON ar.response_id = r.id
INNER JOIN LANG l
ON r.lang_id = l.id
WHERE w.libelle IN ('hello')
AND l.code = 'en'
AND w.lang_id = l.id
GROUP BY a.id, r.id
ORDER BY count(*) desc; -- Ne recuperer que les lignes avec le max de mots

/* Code */
INSERT INTO LANG(code) VALUES ('fr'); -- lang_id = 1
INSERT INTO LANG(code) VALUES ('en'); -- lang_id = 2

/* Hello World action */
INSERT INTO WORD(libelle, lang_id) VALUES ('hello', 2); -- word_id = 1
INSERT INTO WORD(libelle, lang_id) VALUES ('hi', 2); -- word_id = 2

INSERT INTO ACTION(type, word_id) VALUES (1, 1); -- action_id = 1 
INSERT INTO ACTION(type, word_id) VALUES (1, 2); -- action_id = 2
INSERT INTO ACTION(type, word_id) VALUES (2, 2); -- action_id = 3

INSERT INTO RESPONSE(libelle, lang_id) VALUES ('Hello !', 2); -- response_id = 1
INSERT INTO RESPONSE(libelle, lang_id) VALUES ('How are you ?', 2); -- response_id = 2
INSERT INTO RESPONSE(libelle, lang_id) VALUES ('Hi !', 2); -- response_id = 3
INSERT INTO RESPONSE(libelle, lang_id) VALUES ('Hi bro :)', 2); -- response_id = 4
INSERT INTO RESPONSE(libelle, lang_id) VALUES ('Hi ? !', 2); -- response_id = 5

INSERT INTO ACTION_RESPONSE(action_id, response_id) VALUES (1, 1);
INSERT INTO ACTION_RESPONSE(action_id, response_id) VALUES (1, 2);
INSERT INTO ACTION_RESPONSE(action_id, response_id) VALUES (2, 3);
INSERT INTO ACTION_RESPONSE(action_id, response_id) VALUES (2, 4);
INSERT INTO ACTION_RESPONSE(action_id, response_id) VALUES (3, 5);
