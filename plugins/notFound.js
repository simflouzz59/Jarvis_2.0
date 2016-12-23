var responses = new Map();

responses.set("en", ["Sorry I don't understand ...", "What ?"]);

module.exports.action = function (req, callback) {
    var lang = "en";
    values = responses.get(lang);
    var valueText = [values[Math.floor((Math.random() * values.length))]];
    var response = [{
        type: 'text',
        values: valueText
    }];
    if (valueText[0] == "What ?" && Math.floor((Math.random() * 3)) != 0) {
        response.push({
            type: 'img',
            values: ["../public/img/wat.jpg"]
        });
    }
    callback(response);
};