var recognizing = false;

$(document).ready(function () {
    console.log("ready!");

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onstart = function () {
        recognizing = true;
    };

    recognition.onerror = function (event) {
        alert(event.error);
    };

    recognition.onend = function () {
        recognizing = false;
    };

    recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                $('input[type="text"]').val($('input[type="text"]').val() + " " + event.results[i][0].transcript);
            } else {
                //$('input[type="text"]').val($('input[type="text"]').val() + " " + event.results[i][0].transcript);
            }
        }
    };
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

function voiceButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.start();
    $('#voice').text("Stop");
    start_timestamp = event.timeStamp;
}