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
    var tRow = $("<tr>");
    //create complete button
    var $buttonComplete = $("<button>");
    $buttonComplete.attr("data-id", res.todos[i].id);
    $buttonComplete.attr("class", "todoComplete").text("Complete");
    tRow.append($buttonComplete);
    //creates list item
    var $td = $("<td>");
    var $data = $("<p>");
    $data.text("Item " + (i + 1) + ": " + res.todos[i].data);
    //$data.attr("id", "itemId" + i);
    if (res.todos[i].complete) {
      $data.css("text-decoration", "line-through");
      $data.attr("data-newComplete", "false");
    } else {
      $data.attr("data-newComplete", "true");
    }
    $td.append($data);
    tRow.append($td);
    //creates a delete button
    var $buttonDelete = $("<button>");
    $buttonDelete.attr("data-id", res.todos[i].id);
    $buttonDelete.attr("class", "todoDelete").text("ｘ");
    tRow.append($buttonDelete);

    $todoTable.append(tRow);
  }
  $("#todos").prepend($todoTable);

  var $errTable = $("<table>");
  $errTable.attr("id", "errandsTable");
  for (var i = 0; i < res.errands.length; i++) {
    var tRow = $("<tr>");
    //creates complete button
    var $buttonComplete = $("<button>");
    //$buttonComplete.attr("id", "complete" + i).text("Complete");
    $buttonComplete.attr("data-id", res.errands[i].id);
    $buttonComplete.attr("class", "errandComplete").text("Complete");
    tRow.append($buttonComplete);
    //creates list item
    var $td = $("<td>");
    var $data = $("<p>");
    $data.text("Item " + (i + 1) + ": " + res.errands[i].data);
    //$data.attr("id", "itemId" + i);
    if (res.errands[i].complete) {
      $data.css("text-decoration", "line-through");
      $data.attr("data-newComplete", "false");
    } else {
      $data.attr("data-newComplete", "true");
    }
    $td.append($data);
    tRow.append($td);
    //create delete button
    var $buttonDelete = $("<button>");
    //$buttonDelete.attr("id", "close" + i).text("ｘ");
    $buttonDelete.attr("data-id", res.errands[i].id);
    $buttonDelete.attr("class", "errandDelete").text("ｘ");
    tRow.append($buttonDelete);
    $errTable.append(tRow);
  }
  $("#errands").prepend($errTable);

  var $corrTable = $("<table>");
  $corrTable.attr("id", "CorrTable");
  for (var i = 0; i < res.correspondence.length; i++) {
    var tRow = $("<tr>");
    //creates complete button
    var $buttonComplete = $("<button>");
    //$buttonComplete.attr("id", "complete" + i).text("Complete");
    $buttonComplete.attr("data-id", res.correspondence[i].id);
    $buttonComplete.attr("class", "corrComplete").text("Complete");
    tRow.append($buttonComplete);
    //creates list item
    var $td = $("<td>");
    var $data = $("<p>");
    $data.text("Item " + (i + 1) + ": " + res.correspondence[i].data);
    //$data.attr("id", "itemId" + i);
    if (res.correspondence[i].complete) {
      $data.css("text-decoration", "line-through");
      $data.attr("data-newComplete", "false");
    } else {
      $data.attr("data-newComplete", "true");
    }
    $td.append($data);
    tRow.append($td);
    //create delete button
    var $buttonDelete = $("<button>");
    //$buttonDelete.attr("id", "close" + i).text("ｘ");
    $buttonDelete.attr("data-id", res.correspondence[i].id);
    $buttonDelete.attr("class", "corrDelete").text("ｘ");
    tRow.append($buttonDelete);
    $corrTable.append(tRow);
  }
  $("#correspondences").prepend($corrTable);
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
