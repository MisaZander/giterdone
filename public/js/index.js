var userId = $("#container").data("userId") || 1;

// The API object contains methods for each kind of request we'll make
var API = {
  saveToDo: function(toDoObject) {
    console.log(toDoObject);
    $.ajax({
      type: "POST",
      url: "/api/todos",
      data: toDoObject
    });
  },
  saveErrand: function(errandObject) {
    $.ajax({
      type: "POST",
      url: "/api/errands",
      data: errandObject
    });
  },
  saveCorr: function(corrObject) {
    $.ajax({
      type: "POST",
      url: "/api/corrs",
      data: corrObject
    });
  },
  getTasks: function() {
    $.ajax({
      url: "api/all/" + userId,
      type: "GET"
    }).then(function(res) {
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
    $buttonComplete.attr("data-id", res.errands[i].id);
    $buttonComplete.attr("class", "errandComplete").text("Complete");
    tRow.append($buttonComplete);
    //creates list item
    var $td = $("<td>");
    var $data = $("<p>");
    $data.text("Item " + (i + 1) + ": " + res.errands[i].data);
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
function FormSubmitTodo(event) {
  event.preventDefault();
  var todoObject = {
    data: $("#inputTodoData")
      .val()
      .trim(),
    priority: parseInt($("#inputTodoPriority").val()),
    userId: userId
  };

  if (!(todoObject.data && todoObject.priority)) {
    alert("You must enter a To-Do item and Priority!");
    return;
  }

  $("#inputTodoData").val("");
  $("#inputToDoPriority").val("");
  console.log(todoObject);
  API.saveToDo(todoObject);
}

$("#inputTodoSubmit").on("click", function(event) {
  FormSubmitTodo(event);
});

function FormSubmitErrand(event) {
  event.preventDefault();
  var errandObject = {
    data: $("#inputErrandData")
      .val()
      .trim(),
    where: "WE NEED A FORM",
    priority: parseInt($("#inputErrandPriority").val()),
    userId: userId
  };

  if (!(errandObject.data && errandObject.priority)) {
    alert("You must enter an Errand and Priority!");
    return;
  }

  $("#inputErrandData").val("");
  $("#inputErrandPriority").val("");
  console.log(errandObject);
  API.saveErrand(errandObject);
}

$("#inputErrandSubmit").on("click", function(event) {
  FormSubmitErrand(event);
});

function FormSubmitCorr(event) {
  event.preventDefault();
  var corrObject = {
    data: $("#inputCorrData")
      .val()
      .trim(),
    who: "WE NEED A FORM",
    priority: parseInt($("#inputCorrPriority").val()),
    userId: userId
  };

  if (!(corrObject.data && corrObject.priority)) {
    alert("You must enter a Correspondence, Person and Priority!");
    return;
  }

  $("#inputCorrData").val("");
  $("#inputCorrPriority").val("");
  console.log(corrObject);
  API.saveCorr(corrObject);
}

$("#inputCorrSubmit").on("click", function(event) {
  FormSubmitCorr(event);
});

$(".close-modal").on("click", function(event) {
  event.preventDefault();
  location.reload();
});

$(document).ready(function() {
  API.getTasks();
});

//THIS IS A CODE BANK; STICK EM UP
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