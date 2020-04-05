
var topics = ["Dolphins", "Mountain Lion",
  "Dogs", "Cats", "Tiger King", "Owls",
  "Trees", "Wolves", "Fish", "Dragons"];

var removeNewTopicBtn = function () {

  $("#removeTopic").on("click", function () {
    topics.pop(topics);
    displayTopicBtns();
    return false;
  });
}

var displayTopicBtns = function () {
  $("#topicBtnDisplay").empty();
  for (var i = 0; i < topics.length; i++) {
    var topicBtn = $("<button>");
    topicBtn.addClass("topics");
    topicBtn.addClass("btn btn-primary btn-block");
    topicBtn.attr("data-name", topics[i]);
    topicBtn.text(topics[i]);
    $("#topicBtnDisplay").append(topicBtn);
  }
}


var addNewTopicBtn = function () {

  $("#addTopic").on("click", function () {

    var topic = $("#topic-input").val().trim();

    if (topic == "") {
      alert("You must input a new topic to add button");
      return false;
    }
    topics.push(topic);
    displayTopicBtns();
    $('input[type="text"]').val('');

    return false;
  });
}


var resetTopicBtn = function () {

  $("resetTopic").on("click", function () {
    displayTopicBtns();
  });
}


var displayTopicGifs = function () {

  var topic = $(this).attr("data-name");


  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=svYaesnli61hUnmOrtZNbTlftlsBzErW&limit=10";
  $.ajax({
    url: queryURL,
    method: 'GET'
  })


    .done(function (response) {
      console.log(response);
      $("#topicsView").empty();
      var results = response.data;

      if (results == "") {
        alert("There isn't a gif to be shown for this selected button");
      }


      for (var i = 0; i < results.length; i++) {
        var topicsDiv = $("<div>");
        topicsDiv.addClass("topicsDiv");

        var topicRating = $("<p>").text("Rating: " + results[i].rating);
        topicsDiv.append(topicRating);

        var topicImage = $("<img>");
        topicImage.attr("src", results[i].images.fixed_height_small_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
        topicImage.attr("data-state", "still");
        topicImage.addClass("image");
        topicsDiv.append(topicImage);

        $("#topicsView").prepend(topicsDiv);
      }
    });
}
displayTopicBtns();
addNewTopicBtn();
removeNewTopicBtn();
$(document).on("click", ".topics", displayTopicGifs);


$(document).on("click", ".image", function () {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
});