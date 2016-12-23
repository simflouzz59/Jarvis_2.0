$(document).ready(function () {
    console.log("ready!");
});

$('form').submit(function (event) {
    event.preventDefault();
    if ($('input[type="text"]').val().trim() != "") {
        var rightComment = "<div class=\"right-comment\"><div class=\"comment\">" + $('input[type="text"]').val() + "</div></div>";
        $('.chat').html($('.chat').html() + rightComment);
        $(".chat").scrollTop($(".chat")[0].scrollHeight);
        $.post("/request", $("form").serialize(), function (resp) {
            $('input[type="text"]').val("");
            $.each(resp, function (i, response) {
                $.each(response.values, function (i2, value) {
                    mapping.get(response.type)(value);
                    $(".chat").scrollTop($(".chat")[0].scrollHeight);
                });
            });
        });
    }
});