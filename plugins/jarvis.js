var valuesText = new Map();

valuesText.set("en", ["Happy to see you again Sir"]);

module.exports.action = function (req, callback) {
    var lang = "en";
    var valueText = valuesText.get(lang);
    var response = [{
        type: 'text',
        values: valueText
    }, {
        type: 'iframe',
        values: ["http://www.youtube.com/embed/BN1WwnEDWAM?autoplay=1"]
    }];
    callback(response);
};