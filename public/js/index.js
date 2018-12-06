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

// refreshTasks takes the response from the db and creates our tables, then it fills them in
var refreshTasks = function() {
  API.getTasks().then(function(res) {
    res.todos(function() {
      //creates a table for the to do section
      var $table = $("<table>");
      $table.attr("id", "todoTable");
      for (var i = 0; i < res.todos.length; i++) {
        //creates delete button
        var tRow = $("<tr>");
        var $buttonDelete = $("<button>");
        $buttonDelete.attr("id", "close" + i).text("ｘ");
        tRow.append($buttonDelete);
        //creates list item
        var $li = $("<li>");
        $li.html("Item " + i + ": " + res.todos[i]);
        $li.attr("id", "itemId" + i);
        tRow.append($li);
        //create complete button
        var $buttonComplete = $("<button>");
        $buttonComplete.attr("id", "complete" + i).text("Complete");
        tRow.append($buttonComplete);
        $table.append(tRow);
      }
      $("#inputTodo").prepend($table);
    });
    res.errands(function() {
      //creates a table for the errands section
      var $table = $("<table>");
      $table.attr("id", "errandsTable");
      for (var i = 0; i < res.errands.length; i++) {
        //creates delete button
        var tRow = $("<tr>");
        var $buttonDelete = $("<button>");
        $buttonDelete.attr("id", "close" + i).text("ｘ");
        tRow.append($buttonDelete);
        //creates list item
        var $li = $("<li>");
        $li.html("Item " + i + ": " + res.errands[i]);
        $li.attr("id", "itemId" + i);
        tRow.append($li);
        //create complete button
        var $buttonComplete = $("<button>");
        $buttonComplete.attr("id", "complete" + i).text("Complete");
        tRow.append($buttonComplete);
        $table.append(tRow);
      }
      $("#inputErrands").prepend($table);
    });
    res.correspondence(function() {
      //creates a table for the correspondence section
      var $table = $("<table>");
      $table.attr("id", "CorrTable");
      for (var i = 0; i < res.correspondence.length; i++) {
        //creates delete button
        var tRow = $("<tr>");
        var $buttonDelete = $("<button>");
        $buttonDelete.attr("id", "close" + i).text("ｘ");
        tRow.append($buttonDelete);
        //creates list item
        var $li = $("<li>");
        $li.html("Item " + i + ": " + res.correspondence[i]);
        $li.attr("id", "itemId" + i);
        tRow.append($li);
        //create complete button
        var $buttonComplete = $("<button>");
        $buttonComplete.attr("id", "complete" + i).text("Complete");
        tRow.append($buttonComplete);
        $table.append(tRow);
      }
      $("#inputCorr").prepend($table);
    });
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
