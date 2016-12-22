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
            var idx = Math.floor((Math.random() * resp.length));
            if(resp[idx] != undefined){
                var leftComment = "<div class=\"left-comment\"><div class=\"comment\">" + resp[idx].response_libelle + "</div></div>";
                $('.chat').html($('.chat').html() + leftComment);
                $(".chat").scrollTop($(".chat")[0].scrollHeight);
            } 
        });
    }
});