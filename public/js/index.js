// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveToDo: function(toDoObject) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/todos",
      data: toDoObject
    }).then(function() {
      location.reload();
    });
  },
  saveErrand: function(errandObject) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/errands",
      data: errandObject
    }).then(function() {
      location.reload();
    });
  },
  saveCorr: function(corrObject) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/correspondence",
      data: corrObject
    }).then(function() {
      location.reload();
    });
  },
  getTasks: function() {
    return $.ajax({
      url: "api/",
      type: "GET"
    });
  },
  deleteTask: function(table, task) {
    return $.ajax({
      url: "api/" + table + "/" + task,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshTasks = function() {
  API.getTasks().then(function(res) {
    var $todoPopulate = res.todos(function() {
      //this would populate the ToDo Table and then the following lines will create the list items
      var $table = $("<table>");
      for (var i = 0; i < res.todos.length; i++){
        var $li = $("<li>");
        $li.attr()
      }

      var $buttonComplete = $("<button>");
        $("<button>").attr("id", "")
        .text("ｘ");

      $li.append($button);
        
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var taskObject = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(taskObject.text && taskObject.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshTasks();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
