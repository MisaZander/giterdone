var userId = $("#container").data("userId") || 1;

// The API object contains methods for each kind of request we'll make
var API = {
  saveToDo: function(toDoObject) {
    this.toDoObject.userId = userId;
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
    this.errandObject.userId = userId;
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
    this.corrObject.userId = userId;
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
    $.ajax({
      url: "api/all/" + userId,
      type: "GET"
    }).then(function(res) {
      //console.log(res);
      refreshTasks(res);
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
var refreshTasks = function(res) {
  var $todoTable = $("<table>");
  $todoTable.attr("id", "todoTable");
  for (var i = 0; i < res.todos.length; i++) {
    //creates delete button
    var tRow = $("<tr>");
    var $buttonDelete = $("<button>");
    $buttonDelete.attr("class", "todoDelete").text("ｘ");
    tRow.append($buttonDelete);
    //creates list item
    var $td = $("<td>");
    $td.text("Item " + (i + 1) + ": " + res.todos[i].data);
    $td.attr("id", "itemId" + i);
    tRow.append($td);
    //create complete button
    var $buttonComplete = $("<button>");
    $buttonComplete.attr("class", "todoComplete").text("Complete");
    tRow.append($buttonComplete);
    $todoTable.append(tRow);
  }
  $("#todos").prepend($todoTable);

  var $errTable = $("<table>");
  $errTable.attr("id", "errandsTable");
  for (var i = 0; i < res.errands.length; i++) {
    //creates delete button
    var tRow = $("<tr>");
    var $buttonDelete = $("<button>");
    $buttonDelete.attr("id", "close" + i).text("ｘ");
    tRow.append($buttonDelete);
    //creates list item
    var $td = $("<td>");
    $td.html("Item " + i + ": " + res.errands[i]);
    $td.attr("id", "itemId" + i);
    tRow.append($td);
    //create complete button
    var $buttonComplete = $("<button>");
    $buttonComplete.attr("id", "complete" + i).text("Complete");
    tRow.append($buttonComplete);
    $errTable.append(tRow);
  }
  $("#inputErrands").prepend($errTable);

  var $corrTable = $("<table>");
  $corrTable.attr("id", "CorrTable");
  for (var i = 0; i < res.correspondence.length; i++) {
    //creates delete button
    var tRow = $("<tr>");
    var $buttonDelete = $("<button>");
    $buttonDelete.attr("id", "close" + i).text("ｘ");
    tRow.append($buttonDelete);
    //creates list item
    var $td = $("<td>");
    $td.html("Item " + i + ": " + res.correspondence[i]);
    $td.attr("id", "itemId" + i);
    tRow.append($td);
    //create complete button
    var $buttonComplete = $("<button>");
    $buttonComplete.attr("id", "complete" + i).text("Complete");
    tRow.append($buttonComplete);
    $corrTable.append(tRow);
  }
  $("#inputCorr").prepend($corrTable);
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var taskObject = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(taskObject.text && taskObject.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshTasks();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function() {
  API.getTasks();
});
