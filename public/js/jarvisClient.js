var mapping = new Map();

var functionText = function (text) {
    var leftComment = "<div class=\"left-comment\"><div class=\"comment\">" + text + "</div></div>";
    $('.chat').append(leftComment);
};

mapping.set("text", functionText);

var functionImg = function (path) {
    var leftComment = "<div class=\"left-comment\"><img src=\"" + path + "\"></div>";
    $('.chat').append(leftComment);
};

mapping.set("img", functionImg);

var functionIframe = function (url) {
    var leftComment = "<div class=\"left-comment\"><iframe src=\"" + url + "\" frameborder=\"0\"></iframe></div>";
    $('.chat').append(leftComment);
}

mapping.set("iframe", functionIframe);