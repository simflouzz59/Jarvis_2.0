$(document).ready(function () {
    console.log("ready!");
    actionSearch();
    getLanguages();
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
            htmlString += "<tr onclick=\"showAction(" + item.action_id + ", '" + item.action_name + "', '" + item.action_libelle + "')\">";
            htmlString += "<td>" + item.action_name + "</td>";
            htmlString += "<td>" + item.action_libelle + "</td>";
            htmlString += "<td>" + item.word_count + "</td>";
            htmlString += "</tr>";
        });
        $('#actionSearchResult').html(htmlString);
    });
}

function userSearch() {
    $.get("/user/search", $("#userSearchForm").serialize(), function (resp) {
        //alert('ok');
        console.log(resp);
        var htmlString = "";
        $.each(resp, function (i, item) {
            htmlString += "<tr onclick=\"alert(" + item.user_id + "')\">";
            htmlString += "<td>" + item.user_username + "</td>";
            htmlString += "<td>" + item.user_name + "</td>";
            htmlString += "<td>" + item.user_admin + "</td>";
            htmlString += "<td>" + item.lang_code + "</td>";
            htmlString += "</tr>";
        });
        $('#userSearchResult').html(htmlString);
    });
}

function showAction(actionId, actionName, actionLibelle) {
    $('#listActionContainer').removeClass("visible");
    $('#actionContainer').addClass("visible");
    $('input[name="actionId"]').val(actionId);
    $('#actionName').val(actionName);
    $('#actionLibelle').val(actionLibelle);
    wordActionSearch();
}

function wordActionSearch() {
    $.post("/action/search/word", $("#wordActionSearchForm").serialize(), function (resp) {
        var htmlString = "";
        $.each(resp, function (i, item) {
            htmlString += "<tr data-toggle=\"context\" data-target=\"#contextMenuWord\">";
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

function createAction() {
    $.ajax({
        url: "/action/create",
        method: "POST",
        data: $("#actionCreateForm").serialize(),
        success: function (resp) {
            actionSearch();
            $("#actionCreateForm input").val("");
            $("#actionCreateModal").modal('hide');
        }
    });
}

function updateAction() {
    $.ajax({
        url: "/action/update",
        method: "PUT",
        data: $("#actionUpdateForm").serialize(),
        success: function (resp) {
            alert('ok');
        }
    });
}

function deleteAction() {
    if (confirm("Are you sure to delete this action ?")) {
        $.ajax({
            url: "/action/delete",
            method: "DELETE",
            data: $("#actionUpdateForm").serialize(),
            success: function (resp) {
                actionSearch();
                showActionSearch();
            }
        });
    }
}

function getLanguages() {
    $.get("/lang", $("#userSearchForm").serialize(), function (resp) {
        var htmlString = "<option value=''>All</option>";
        $.each(resp, function (i, item) {
            htmlString += "<option value='" + item.lang_id + "'>" + item.lang_code + "</option>";
        });
        $('.lang-select').html(htmlString);
    });
}

function showActionSearch() {
    $('.visible').removeClass("visible");
    $('#listActionContainer').addClass("visible");
    $('.active').removeClass("active");
    $('#navAction').addClass("active");
    actionSearch();
}

function showUserSearch() {
    $('.visible').removeClass("visible");
    $('#userContainer').addClass("visible");
    $('.active').removeClass("active");
    $('#navUser').addClass("active");
    userSearch();
}