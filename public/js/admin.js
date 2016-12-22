$(document).ready(function () {
    console.log("ready!");
    actionSearch();
});

/*$('#actionSearchForm').submit(function (event) {
    event.preventDefault();
    if ($('#actionName').val().trim() != "") {
        $.post("/action/search", $("#actionSearchForm").serialize(), function (resp) {
            //alert('ok');
            $('#actionName').val("");
        });
    }
});*/

function actionSearch() {
    $.post("/action/search", $("#actionSearchForm").serialize(), function (resp) {
        //alert('ok');
        var htmlString = "";
        $.each(resp, function (i, item) {
            htmlString += "<tr onclick=\"showAction(" + item.id + ", '" + item.name + "', '" + item.libelle + "')\">";
            htmlString += "<td>" + item.name + "</td>";
            htmlString += "<td>" + item.libelle + "</td>";
            htmlString += "<td>" + item.type + "</td>";
            htmlString += "<td>" + item.word_count + "</td>";
            htmlString += "<td>" + item.response_count + "</td>";
            htmlString += "</tr>";
        });
        $('#actionSearchResult').html(htmlString);
    });
}

function showAction(actionId, actionName, actionLibelle) {
    $('#listActionContainer').removeClass("visible");
    $('#actionContainer').addClass("visible");
    $('input[name="actionSelected"]').val(actionId);
    $('#actionName').val(actionName);
    $('#actionLibelle').val(actionLibelle);
    wordActionSearch();
}

function wordActionSearch() {
    $.post("/action/search/word", $("#wordActionSearchForm").serialize(), function (resp) {
        //alert('ok');
        var htmlString = "";
        $.each(resp, function (i, item) {
            htmlString += "<tr onclick='alert(" + item.word_id + ")'>";
            htmlString += "<td>" + item.word_libelle + "</td>";
            htmlString += "<td>" + item.lang_code + "</td>";
            htmlString += "</tr>";
        });
        $('#wordActionSearchResult').html(htmlString);
    });
}

function responseActionSearch() {
    $.post("/action/search/response", $("#responseActionSearchForm").serialize(), function (resp) {
        //alert('ok');
        var htmlString = "";
        $.each(resp, function (i, item) {
            htmlString += "<tr>";
            htmlString += "<td>" + item.libelle + "</td>";
            htmlString += "<td>" + item.code + "</td>";
            htmlString += "</tr>";
        });
        $('#responseActionSearchResult').html(htmlString);
    });
}