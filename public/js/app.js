$(document).ready(function() {
    console.log( "ready!" );
});

$('form').submit(function (event) {
    event.preventDefault();
    $.post('/hello', $("form").serialize(), function (resp) {
        $('#value').text(resp);
    });
});