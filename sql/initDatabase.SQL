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
    name VARCHAR(99) NOT NULL UNIQUE,
    libelle VARCHAR(999) NOT NULL,
    type INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

/*CREATE TABLE IF NOT EXISTS RESPONSE (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libelle VARCHAR(99) NOT NULL UNIQUE,
    lang_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (lang_id) REFERENCES LANG(id),
    PRIMARY KEY (id)
);*/

CREATE TABLE IF NOT EXISTS WORD_ACTION (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    word_id INT UNSIGNED NOT NULL,
    action_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (word_id) REFERENCES WORD(id) ON DELETE CASCADE,
    FOREIGN KEY (action_id) REFERENCES ACTION(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS USER (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(99) NOT NULL UNIQUE,
    password VARCHAR(99) NOT NULL,
    name VARCHAR(99),
    admin INT UNSIGNED NOT NULL DEFAULT 1,
    lang_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (lang_id) REFERENCES LANG(id),
    PRIMARY KEY (id)
);

/*CREATE TABLE IF NOT EXISTS ACTION_RESPONSE (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    action_id INT UNSIGNED NOT NULL,
    response_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (action_id) REFERENCES ACTION(id),
    FOREIGN KEY (response_id) REFERENCES RESPONSE(id),
    PRIMARY KEY (id)
);*/

/* Request for get the action id and the response libelle since a word array and a ISO langage code */
SELECT action_name, matching_count
FROM (
    SELECT a.name AS action_name, count(*) AS matching_count
    FROM action a INNER JOIN WORD_ACTION wa
    ON wa.action_id = a.id
    INNER JOIN word w
    ON wa.word_id = w.id
    INNER JOIN LANG l
    ON w.lang_id = l.id
    WHERE w.libelle IN ('White', 'Daddy', 's', 'home')
    AND l.code = 'en'
    GROUP BY a.id
    ORDER BY count(*) desc, a.name asc
) req
HAVING matching_count = MAX(matching_count); -- Ne recuperer que les lignes avec le max de mots

/* SELECT all action */
SELECT a.id AS action_id, a.name AS action_name, a.libelle AS action_libelle, count(DISTINCT wa.id) AS word_count 
FROM action a
INNER JOIN WORD_ACTION wa
ON a.id = wa.action_id
WHERE lower(a.name) LIKE lower('%' 's' '%')
GROUP by a.id;

/* SELECT word by action */
SELECT w.id AS word_id, w.libelle AS word_libelle, l.code AS lang_code
FROM WORD w 
INNER JOIN LANG l
ON w.lang_id = l.id
INNER JOIN WORD_ACTION wa
ON wa.word_id = w.id
WHERE wa.action_id = ?
AND lower(w.libelle) LIKE lower('%' ? '%');

/* SELECT user by userName */
SELECT u.id AS user_id, u.username AS user_username, u.name AS user_name, u.admin AS user_admin,  l.code AS lang_code
FROM user u
INNER JOIN LANG l
ON u.lang_id = l.id
WHERE lower(u.username) LIKE lower('%' ? '%');

/* Code */
INSERT INTO LANG(code) VALUES ('fr'); -- lang_id = 1
INSERT INTO LANG(code) VALUES ('en'); -- lang_id = 2

/* Hello World action */
INSERT INTO WORD(libelle, lang_id) VALUES ('hello', 2); -- word_id = 1
INSERT INTO WORD(libelle, lang_id) VALUES ('hi', 2); -- word_id = 2

INSERT INTO ACTION(name, libelle, type) VALUES ('sayHello', 'Say Hello or Hi', 1); -- action_id = 1 
INSERT INTO ACTION(name, libelle, type) VALUES ('sayHelloWithName', 'Say Hello or Hi with userName', 2); -- action_id = 2

INSERT INTO WORD_ACTION(word_id, action_id) VALUES (1, 1);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (1, 2);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (2, 1);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (2, 2);


/* Jarvis */
INSERT INTO WORD(libelle, lang_id) VALUES ('wake', 2); -- word_id = 3
INSERT INTO WORD(libelle, lang_id) VALUES ('up', 2); -- word_id = 4
INSERT INTO WORD(libelle, lang_id) VALUES ('dad', 2); -- word_id = 5
INSERT INTO WORD(libelle, lang_id) VALUES ('home', 2); -- word_id = 6

INSERT INTO ACTION(name, libelle) VALUES ('jarvis', 'Sould I stay or should I go Iron man 2 scene'); -- action_id = 2

INSERT INTO WORD_ACTION(word_id, action_id) VALUES (11, 3);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (12, 3);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (13, 3);
INSERT INTO WORD_ACTION(word_id, action_id) VALUES (14, 3);

INSERT INTO USER (userName, password, name, lang_id, admin) VALUES ('simflouzz59', 'test1234', 'Tony', 1, 0);