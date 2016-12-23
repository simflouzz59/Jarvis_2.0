var responses1 = new Map();
var responses2 = new Map();

responses1.set("en", ["Hello !", "Hi !"]);
responses2.set("en", ["How are you ?", "How you're doing ?"]);

module.exports.action = function (req, callback) {
    var lang = "en";
    var values = [];
    var text1 = responses1.get(lang);
    values.push(text1[Math.floor((Math.random() * text1.length))]);
    if(Math.floor((Math.random() * 2)) == 0) {
        var text2 = responses2.get(lang);
        values.push(text2[Math.floor((Math.random() * text2.length))]);
    }
    var response = [{
        type: 'text',
        values: values
    }];
    callback(response);
};