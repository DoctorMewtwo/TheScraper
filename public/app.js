$.getJSON("/articles" , function(data) {

    for(var i = 0; i <data.length; i++) 
    {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click" , "p" , function() {
    $("#notes").empty();

    var artID = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + artID
    }).then(function(data) {
        $("#notes").append("<h2>" + data[0].title + "</h2>");

        $("#notes").append("<input id = 'titleinput' name = 'title");

        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

        $("#notes").append("<button data-id='" + data[0]._id + "' id='savenote'>Save Note</button>");

        if (data[0].note) {
            // Place the title of the note in the title input
            $("#titleinput").val(data[0].note.title);
            // Place the body of the note in the body textarea
            $("#bodyinput").val(data[0].note.body);
          }
    });

});

$(document).on("click" , "#savenote" , function() {
    var noteID = $(this).attr("data-id");

    $.ajax({
        method : "POST",
        url: "/articles/" + noteID,
        data: {
            title: $("titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(function(data) {

        $("#notes").empty();
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});